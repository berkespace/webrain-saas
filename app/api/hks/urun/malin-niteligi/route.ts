import { NextRequest, NextResponse } from 'next/server';
import { parseSoap } from '@/app/lib/hks-soap';

const HKS_ENDPOINT = process.env.HKS_ENDPOINT || 'https://hks.hal.gov.tr/WebServices/UrunService.svc';

export async function POST(request: NextRequest) {
  try {
    const soapEnvelope = `<?xml version="1.0" encoding="utf-8"?>
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
  <soap:Body>
    <BaseRequestMessageOf_MalinNiteligiIstek xmlns="http://www.gtb.gov.tr//WebServices" xmlns:a="http://schemas.datacontract.org/2004/07/GTB.HKS.Urun.ServiceContract">
      <Istek>
        <!-- Malın niteliği listesi için boş istek -->
      </Istek>
      <Password>${process.env.HKS_PASSWORD || ''}</Password>
      <ServicePassword>${process.env.HKS_SERVICE_PASSWORD || ''}</ServicePassword>
      <UserName>${process.env.HKS_USERNAME || ''}</UserName>
    </BaseRequestMessageOf_MalinNiteligiIstek>
  </soap:Body>
</soap:Envelope>`;

    const response = await fetch(HKS_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'text/xml; charset=utf-8',
        'SOAPAction': 'http://www.gtb.gov.tr//WebServices/IUrunService/UrunServiceMalinNiteligi'
      },
      body: soapEnvelope
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const xmlText = await response.text();
    const parsedData = await parseSoap(xmlText, 'UrunServiceMalinNiteligi');

    if (!parsedData.ok) {
      throw new Error(parsedData.error || 'SOAP parsing failed');
    }

    const malinNitelikleri = parsedData.sonuc?.["a:MalinNitelikleri"]?.["b:MalinNiteligiDTO"] || [];

    if (malinNitelikleri.length === 0) {
      throw new Error('HKS servisi boş array döndü - fallback kullanılacak');
    }

    const mappedNitelikler = malinNitelikleri.map((nitelik: any) => ({
      id: nitelik["b:Id"] || nitelik.Id || nitelik.id || '',
      ad: nitelik["b:MalinNiteligiAdi"] || nitelik.MalinNiteligiAdi || nitelik.malinNiteligiAdi || ''
    }));

    return NextResponse.json({
      ok: true,
      count: mappedNitelikler.length,
      items: mappedNitelikler,
      note: 'HKS servisinden alındı'
    });

  } catch (error: any) {
    console.error('HKS Malın Niteliği servisi hatası:', error);
    return NextResponse.json({ 
      ok: false, 
      error: String(error?.message || error), 
      items: [] 
    }, { status: 500 });
  }
}
