import { NextRequest, NextResponse } from 'next/server';
import { parseSoap } from '@/app/lib/hks-soap';

const HKS_ENDPOINT = process.env.HKS_ENDPOINT || 'https://hks.hal.gov.tr/WebServices/BildirimService.svc';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { tcKimlikVergiNolar } = body;

    if (!tcKimlikVergiNolar || !Array.isArray(tcKimlikVergiNolar) || tcKimlikVergiNolar.length === 0) {
      return NextResponse.json({ 
        ok: false, 
        error: 'TcKimlikVergiNolar array olarak gönderilmelidir' 
      }, { status: 400 });
    }

    const soapEnvelope = `<?xml version="1.0" encoding="utf-8"?>
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
  <soap:Body>
    <BaseRequestMessageOf_KayitliKisiSorguIstek xmlns="http://www.gtb.gov.tr//WebServices" xmlns:a="http://schemas.datacontract.org/2004/07/GTB.HKS.Bildirim.ServiceContract">
      <Istek>
        <a:TcKimlikVergiNolar>
          ${tcKimlikVergiNolar.map(tc => `<a:string>${tc}</a:string>`).join('')}
        </a:TcKimlikVergiNolar>
      </Istek>
      <Password>${process.env.HKS_PASSWORD || ''}</Password>
      <ServicePassword>${process.env.HKS_SERVICE_PASSWORD || ''}</ServicePassword>
      <UserName>${process.env.HKS_USERNAME || ''}</UserName>
    </BaseRequestMessageOf_KayitliKisiSorguIstek>
  </soap:Body>
</soap:Envelope>`;

    const response = await fetch(HKS_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'text/xml; charset=utf-8',
        'SOAPAction': 'http://www.gtb.gov.tr//WebServices/IBildirimService/BildirimServisKayitliKisiSorgu'
      },
      body: soapEnvelope
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const xmlText = await response.text();
    const parsedData = await parseSoap(xmlText, 'BildirimServisKayitliKisiSorgu');

    if (!parsedData.ok) {
      throw new Error(parsedData.error || 'SOAP parsing failed');
    }

    // Hata kontrolü - WSDL'e göre HataKodlari ErrorModel[] array'i var
    const hataKodlari = parsedData.hataKodlari;
    
    if (hataKodlari && !hataKodlari['@_i:nil']) {
      // Hata var, ErrorModel array'ini kontrol et
      const hatalar = Array.isArray(hataKodlari) ? hataKodlari : [hataKodlari];
      const hataMesaji = hatalar.map((hata: any) => 
        `Hata Kodu: ${hata.HataKodu || hata['a:HataKodu']}, Mesaj: ${hata.Mesaj || hata['a:Mesaj']}`
      ).join('; ');
      
      throw new Error(`HKS servisi hata döndü: ${hataMesaji}`);
    }

    // WSDL'e göre dönüş tipi BaseResponseMessageOf_BildirimSorguCevap
    // ve veri yapısı: sonuc.TcKimlikVergiNolar.KayitliKisiSorguDTO[]
    const kayitliKisiler = parsedData.sonuc?.["a:TcKimlikVergiNolar"]?.["b:KayitliKisiSorguDTO"] || [];

    if (kayitliKisiler.length === 0) {
      // HKS'den boş döndüyse, bu TC/Vergi No kayıtlı değil demektir
      // Fallback olarak kayıtlı olmadığını belirten response döndür
      const fallbackKisiler = tcKimlikVergiNolar.map(tcNo => ({
        tcKimlikVergiNo: tcNo,
        kayitliKisiMi: false,
        sifatlari: []
      }));

      return NextResponse.json({
        ok: true,
        count: fallbackKisiler.length,
        items: fallbackKisiler,
        message: 'TC/Vergi No HKS sisteminde kayıtlı değil'
      });
    }

    const mappedKisiler = kayitliKisiler.map((kisi: any) => ({
      tcKimlikVergiNo: kisi["b:TcKimlikVergiNo"] || kisi.TcKimlikVergiNo || kisi.tcKimlikVergiNo || '',
      kayitliKisiMi: kisi["b:KayitliKisiMi"] || kisi.KayitliKisiMi || kisi.kayitliKisiMi || false,
      sifatlari: kisi["b:Sifatlari"] || kisi.Sifatlari || kisi.sifatlari || []
    }));

    return NextResponse.json({
      ok: true,
      count: mappedKisiler.length,
      items: mappedKisiler,
      note: 'HKS servisinden alındı'
    });

  } catch (error: any) {
    console.error('HKS Manuel Kişi Sorgu servisi hatası:', error);
    return NextResponse.json({ 
      ok: false, 
      error: String(error?.message || error), 
      items: [] 
    }, { status: 500 });
  }
}
