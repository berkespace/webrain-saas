import { NextRequest, NextResponse } from 'next/server';
import { parseSoap } from '@/app/lib/hks-soap';

const HKS_ENDPOINT = process.env.HKS_ENDPOINT || 'https://hks.hal.gov.tr/WebServices/UrunService.svc';

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { urunId } = body;
  
  try {

    if (!urunId) {
      return NextResponse.json({ 
        ok: false, 
        error: 'urunId parametresi gereklidir' 
      }, { status: 400 });
    }

    const soapEnvelope = `<?xml version="1.0" encoding="utf-8"?>
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
  <soap:Body>
    <BaseRequestMessageOf_UrunCinsleriIstek xmlns="http://www.gtb.gov.tr//WebServices" xmlns:a="http://schemas.datacontract.org/2004/07/GTB.HKS.Urun.ServiceContract">
      <Istek>
        <a:UrunId>${urunId}</a:UrunId>
      </Istek>
      <Password>${process.env.HKS_PASSWORD || ''}</Password>
      <ServicePassword>${process.env.HKS_SERVICE_PASSWORD || ''}</ServicePassword>
      <UserName>${process.env.HKS_USERNAME || ''}</UserName>
    </BaseRequestMessageOf_UrunCinsleriIstek>
  </soap:Body>
</soap:Envelope>`;

    const response = await fetch(HKS_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'text/xml; charset=utf-8',
        'SOAPAction': 'http://www.gtb.gov.tr//WebServices/IUrunService/UrunServiceUrunCinsleri'
      },
      body: soapEnvelope
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const xmlText = await response.text();
    const parsedData = await parseSoap(xmlText, 'UrunServiceUrunCinsleri');

    if (!parsedData.ok) {
      throw new Error(parsedData.error || 'SOAP parsing failed');
    }

    const urunCinsleri = parsedData.sonuc?.["a:UrunCinsleri"]?.["b:UrunCinsiDTO"] || [];

    if (urunCinsleri.length === 0) {
      throw new Error('HKS servisi boş array döndü - fallback kullanılacak');
    }

    const mappedCinsler = urunCinsleri.map((cins: any) => ({
      id: cins["b:Id"] || cins.Id || cins.id || '',
      ad: cins["b:UrunCinsiAdi"] || cins.UrunCinsiAdi || cins.urunCinsiAdi || '',
      uretimSekliId: cins["b:UretimSekliId"] || cins.UretimSekliId || cins.uretimSekliId || '',
      urunId: cins["b:UrunId"] || cins.UrunId || cins.urunId || '',
      urunKodu: cins["b:UrunKodu"] || cins.UrunKodu || cins.urunKodu || '',
      ithalmi: cins["b:Ithalmi"] || cins.Ithalmi || cins.ithalmi || false
    }));

    return NextResponse.json({
      ok: true,
      count: mappedCinsler.length,
      items: mappedCinsler,
      note: 'HKS servisinden alındı'
    });

  } catch (error: any) {
    console.error('HKS Ürün Cinsleri servisi hatası:', error);
    return NextResponse.json({ 
      ok: false, 
      error: String(error?.message || error), 
      items: [] 
    }, { status: 500 });
  }
}
