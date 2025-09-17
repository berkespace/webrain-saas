import { NextRequest, NextResponse } from 'next/server';
import { parseSoap } from '@/app/lib/hks-soap';

const HKS_ENDPOINT = process.env.HKS_ENDPOINT || 'https://hks.hal.gov.tr/WebServices/GenelService.svc';

export async function POST(request: NextRequest) {
  try {
    // HKS GenelServisIsletmeTurleri servisini çağır
    const soapEnvelope = `<?xml version="1.0" encoding="utf-8"?>
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
  <soap:Body>
    <BaseRequestMessageOf_IsletmeTurleriIstek xmlns="http://www.gtb.gov.tr//WebServices" xmlns:a="http://schemas.datacontract.org/2004/07/GTB.HKS.Genel.ServiceContract">
      <Istek xmlns="http://schemas.datacontract.org/2004/07/GTB.HKS.Genel.ServiceContract">
        <!-- İşletme türleri listesi için boş istek -->
      </Istek>
      <Password>${process.env.HKS_PASSWORD || '0538224Hnr+'}</Password>
      <ServicePassword>${process.env.HKS_SERVICE_PASSWORD || '1RT3Y259'}</ServicePassword>
      <UserName>${process.env.HKS_USERNAME || '4640538224'}</UserName>
    </BaseRequestMessageOf_IsletmeTurleriIstek>
  </soap:Body>
</soap:Envelope>`;

    const response = await fetch(HKS_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'text/xml; charset=utf-8',
        'SOAPAction': 'http://www.gtb.gov.tr//WebServices/IGenelService/GenelServisIsletmeTurleri'
      },
      body: soapEnvelope
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const xmlText = await response.text();
    
    // Debug: HKS response'unu logla
    console.log('HKS İşletme Türleri Response:', xmlText.substring(0, 1000));
    
    const parsedData = await parseSoap(xmlText);

    if (!parsedData.ok) {
      throw new Error(parsedData.error || 'SOAP parsing failed');
    }

    // İşletme türlerini map et
    const isletmeTurleri = parsedData.data?.IsletmeTurleri?.IsletmeTuruDTO || [];
    
    if (isletmeTurleri.length === 0) {
      // HKS servisi boş döndü, fallback'e geç
      throw new Error('HKS servisi boş array döndü - fallback kullanılacak');
    }
    
    const mappedIsletmeTurleri = isletmeTurleri.map((tur: any) => ({
      id: tur.Id || tur.id || '',
      ad: tur.IsletmeTuruAdi || tur.isletmeTuruAdi || tur.Ad || tur.ad || ''
    }));

    return NextResponse.json({
      ok: true,
      count: mappedIsletmeTurleri.length,
      items: mappedIsletmeTurleri,
      note: 'HKS servisinden alındı'
    });

  } catch (error: any) {
    console.error('HKS İşletme Türleri servisi çağrılamadı:', error);
    
    // Fallback: Mevcut künye verilerinden işletme türlerini çıkar
    try {
      const bildirimciyeResponse = await fetch('http://localhost:3000/api/hks/bildirimciye', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          baslangic: '2025-09-01',
          bitis: '2025-09-30',
          kunyeNo: 0
        })
      });

      if (bildirimciyeResponse.ok) {
        const bildirimciyeData = await bildirimciyeResponse.json();
        const uniqueGidecekYerTuruIds = [...new Set(bildirimciyeData.items.map((item: any) => item.gidecekYerTuruId))];

        // Gerçek işletme türlerini map et
        const isletmeTurleriMap: Record<string, string> = {
          '4': 'Tasnifleme ve Ambalajlama',
          '5': 'Hal İçi Deposu',
          '7': 'Hal İçi İşyeri',
          '8': 'Hal Dışı İşyeri',
          '12': 'Dağıtım Merkezi'
        };

        const mappedIsletmeTurleri = uniqueGidecekYerTuruIds.map((id: string) => ({
          id,
          ad: isletmeTurleriMap[id] || `İşletme Türü ${id}`
        }));

        return NextResponse.json({
          ok: true,
          count: mappedIsletmeTurleri.length,
          items: mappedIsletmeTurleri,
          note: 'Mevcut verilerden çıkarıldı (HKS servisi erişilemedi)'
        });
      }
    } catch (fallbackError) {
      console.error('Fallback de başarısız:', fallbackError);
    }
    
    // Son fallback: Tüm bilinen işletme türleri
    const fallbackIsletmeTurleri = [
      { id: '4', ad: 'Tasnifleme ve Ambalajlama' },
      { id: '5', ad: 'Hal İçi Deposu' },
      { id: '7', ad: 'Hal İçi İşyeri' },
      { id: '8', ad: 'Hal Dışı İşyeri' },
      { id: '12', ad: 'Dağıtım Merkezi' }
    ];

    return NextResponse.json({
      ok: true,
      count: fallbackIsletmeTurleri.length,
      items: fallbackIsletmeTurleri,
      note: 'Fallback data kullanıldı'
    });
  }
}
