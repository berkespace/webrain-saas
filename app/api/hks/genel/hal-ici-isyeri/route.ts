import { NextRequest, NextResponse } from 'next/server';
import { parseSoap } from '@/app/lib/hks-soap';

export async function POST(request: NextRequest) {
  try {
    const { tcKimlikVergiNo } = await request.json();

    if (!tcKimlikVergiNo) {
      return NextResponse.json({
        ok: false,
        error: 'TC Kimlik/Vergi No gerekli'
      }, { status: 400 });
    }

    // HKS GenelService HalIciIsyeri SOAP request
    const soapRequest = `<?xml version="1.0" encoding="utf-8"?>
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
  <soap:Body>
    <BaseRequestMessageOf_HalIciIsyeriIstek xmlns="http://www.gtb.gov.tr//WebServices" xmlns:a="http://schemas.datacontract.org/2004/07/GTB.HKS.Genel.ServiceContract">
      <Istek>
        <a:TcKimlikVergiNo>${tcKimlikVergiNo}</a:TcKimlikVergiNo>
      </Istek>
      <Password>${process.env.HKS_PASSWORD || '0538224Hnr+'}</Password>
      <ServicePassword>${process.env.HKS_SERVICE_PASSWORD || '1RT3Y259'}</ServicePassword>
      <UserName>${process.env.HKS_USERNAME || '4640538224'}</UserName>
    </BaseRequestMessageOf_HalIciIsyeriIstek>
  </soap:Body>
</soap:Envelope>`;

    const response = await fetch('https://hks.hal.gov.tr/WebServices/GenelService.svc', {
      method: 'POST',
      headers: {
        'Content-Type': 'text/xml; charset=utf-8',
        'SOAPAction': 'http://www.gtb.gov.tr//WebServices/IGenelService/GenelServisHalIciIsyeri'
      },
      body: soapRequest
    });

    if (!response.ok) {
      throw new Error(`HKS servisi HTTP ${response.status} döndü`);
    }

    const xmlText = await response.text();
    const parsedData = await parseSoap(xmlText, 'GenelServisHalIciIsyeri');

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

    // WSDL'e göre dönüş tipi BaseResponseMessageOf_HalIciIsyeriCevap
    // ve veri yapısı: sonuc.Isyerleri.HalIciIsyeriDTO[]
    const isyerleriRaw = parsedData.sonuc?.["a:Isyerleri"]?.["b:HalIciIsyeriDTO"] || [];
    
    // Tek işyeri varsa array'e çevir, zaten array ise olduğu gibi bırak
    const isyerleri = Array.isArray(isyerleriRaw) ? isyerleriRaw : [isyerleriRaw];

    if (isyerleri.length === 0 || (isyerleri.length === 1 && !isyerleri[0])) {
      // HKS'den boş döndüyse, bu TC/Vergi No'nun hal içi işyeri yok demektir
      return NextResponse.json({
        ok: true,
        count: 0,
        items: [],
        message: 'TC/Vergi No için hal içi işyeri bulunamadı'
      });
    }

    const mappedIsyerleri = isyerleri.map((isyeri: any) => ({
      id: isyeri["b:Id"] || isyeri.Id || isyeri.id || 0,
      isyeriAdi: isyeri["b:IsyeriAdi"] || isyeri.IsyeriAdi || isyeri.isyeriAdi || '',
      tcKimlikVergiNo: isyeri["b:TcKimlikVergiNo"] || isyeri.TcKimlikVergiNo || isyeri.tcKimlikVergiNo || '',
      halId: isyeri["b:HalId"] || isyeri.HalId || isyeri.halId || 0,
      halAdi: isyeri["b:HalAdi"] || isyeri.HalAdi || isyeri.halAdi || ''
    }));

    return NextResponse.json({
      ok: true,
      count: mappedIsyerleri.length,
      items: mappedIsyerleri
    });

  } catch (error) {
    console.error('HKS Hal İçi İşyeri servisi hatası:', error);
    return NextResponse.json({
      ok: false,
      error: error instanceof Error ? error.message : 'Bilinmeyen hata'
    }, { status: 500 });
  }
}