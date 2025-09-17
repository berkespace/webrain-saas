import { NextRequest, NextResponse } from 'next/server';
import { parseSoap } from '@/app/lib/hks-soap';

const HKS_ENDPOINT = process.env.HKS_ENDPOINT || 'https://hks.hal.gov.tr/WebServices/BildirimService.svc';

export async function POST(request: NextRequest) {
  try {
    // HKS BildirimServisBildirimTurleriListesi servisini çağır
    const soapEnvelope = `<?xml version="1.0" encoding="utf-8"?>
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
  <soap:Body>
    <BaseRequestMessageOf_BildirimTurleriIstek xmlns="http://www.gtb.gov.tr//WebServices" xmlns:a="http://schemas.datacontract.org/2004/07/GTB.HKS.Bildirim.ServiceContract">
      <Istek>
        <!-- Bildirim türleri listesi için özel parametreler gerekebilir -->
      </Istek>
      <Password>${process.env.HKS_PASSWORD || '0538224Hnr+'}</Password>
      <ServicePassword>${process.env.HKS_SERVICE_PASSWORD || '1RT3Y259'}</ServicePassword>
      <UserName>${process.env.HKS_USERNAME || '4640538224'}</UserName>
    </BaseRequestMessageOf_BildirimTurleriIstek>
  </soap:Body>
</soap:Envelope>`;

    const response = await fetch(HKS_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'text/xml; charset=utf-8',
        'SOAPAction': 'http://www.gtb.gov.tr//WebServices/IBildirimService/BildirimServisBildirimTurleriListesi'
      },
      body: soapEnvelope
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const xmlText = await response.text();
    
    // Debug: HKS response'unu logla
    console.log('HKS Bildirim Türleri Response:', xmlText.substring(0, 1000));
    
    const parsedData = await parseSoap(xmlText);

    if (!parsedData.ok) {
      throw new Error(parsedData.error || 'SOAP parsing failed');
    }

    // Bildirim türlerini map et
    const bildirimTurleri = parsedData.data?.BildirimTurleri?.BildirimTuruDTO || [];
    
    if (bildirimTurleri.length === 0) {
      // HKS servisi boş döndü, fallback'e geç
      throw new Error('HKS servisi boş array döndü - fallback kullanılacak');
    }
    
    const mappedBildirimTurleri = bildirimTurleri.map((tur: any) => ({
      id: tur.Id || tur.id || '',
      ad: tur.BildirimTuruAdi || tur.bildirimTuruAdi || tur.Ad || tur.ad || ''
    }));

    return NextResponse.json({
      ok: true,
      count: mappedBildirimTurleri.length,
      items: mappedBildirimTurleri,
      note: 'HKS servisinden alındı'
    });

  } catch (error: any) {
    console.error('HKS Bildirim Türleri servisi çağrılamadı:', error);
    
    // Fallback: Mevcut künye verilerinden bildirim türlerini çıkar
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
        const uniqueBildirimTurleri = [...new Set(bildirimciyeData.items.map((item: any) => item.bildirimTuru))];

        // Gerçek bildirim türlerini map et
        const bildirimTurleriMap: Record<string, string> = {
          '195': 'Satış Bildirimi',
          '196': 'Alış Bildirimi',
          '197': 'Transfer Bildirimi',
          '198': 'İade Bildirimi',
          '199': 'Fire Bildirimi'
        };

        const mappedBildirimTurleri = uniqueBildirimTurleri.map((id: string) => ({
          id,
          ad: bildirimTurleriMap[id] || `Bildirim Türü ${id}`
        }));

        return NextResponse.json({
          ok: true,
          count: mappedBildirimTurleri.length,
          items: mappedBildirimTurleri,
          note: 'Mevcut verilerden çıkarıldı (HKS servisi erişilemedi)'
        });
      }
    } catch (fallbackError) {
      console.error('Fallback de başarısız:', fallbackError);
    }
    
    // Son fallback: Tüm bilinen bildirim türleri
    const fallbackBildirimTurleri = [
      { id: '195', ad: 'Satış Bildirimi' },
      { id: '196', ad: 'Alış Bildirimi' },
      { id: '197', ad: 'Transfer Bildirimi' },
      { id: '198', ad: 'İade Bildirimi' },
      { id: '199', ad: 'Fire Bildirimi' }
    ];

    return NextResponse.json({
      ok: true,
      count: fallbackBildirimTurleri.length,
      items: fallbackBildirimTurleri,
      note: 'Fallback data kullanıldı'
    });
  }
}
