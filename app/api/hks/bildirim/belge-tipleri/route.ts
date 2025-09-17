import { NextRequest, NextResponse } from 'next/server';
import { parseSoap } from '@/app/lib/hks-soap';

const HKS_ENDPOINT = process.env.HKS_ENDPOINT || 'https://hks.hal.gov.tr/WebServices/BildirimService.svc';

export async function POST(request: NextRequest) {
  try {
    // HKS BildirimServisBelgeTipleriListesi servisini çağır
    const soapEnvelope = `<?xml version="1.0" encoding="utf-8"?>
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
  <soap:Body>
    <BildirimServisBelgeTipleriListesi xmlns="http://tempuri.org/">
      <request>
        <Password>${process.env.HKS_PASSWORD || ''}</Password>
        <ServicePassword>${process.env.HKS_SERVICE_PASSWORD || ''}</ServicePassword>
        <UserName>${process.env.HKS_USERNAME || ''}</UserName>
      </request>
    </BildirimServisBelgeTipleriListesi>
  </soap:Body>
</soap:Envelope>`;

    const response = await fetch(HKS_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'text/xml; charset=utf-8',
        'SOAPAction': 'http://www.gtb.gov.tr//WebServices/IBildirimService/BildirimServisBelgeTipleriListesi'
      },
      body: soapEnvelope
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const xmlText = await response.text();
    
    // Debug: HKS response'unu logla
    console.log('HKS Belge Tipleri Response:', xmlText.substring(0, 1000));
    
    const parsedData = await parseSoap(xmlText);

    if (!parsedData.ok) {
      throw new Error(parsedData.error || 'SOAP parsing failed');
    }

    // Belge tiplerini map et
    const belgeTipleri = parsedData.data?.BelgeTipleri?.BelgeTipiDTO || [];
    
    const mappedBelgeTipleri = belgeTipleri.map((tip: any) => ({
      id: tip.Id || tip.id || '',
      ad: tip.Ad || tip.ad || tip.Adi || tip.adi || '',
      aciklama: tip.Aciklama || tip.aciklama || ''
    }));

    return NextResponse.json({
      ok: true,
      count: mappedBelgeTipleri.length,
      items: mappedBelgeTipleri,
      note: 'HKS servisinden alındı'
    });

  } catch (error: any) {
    console.error('HKS Belge Tipleri servisi çağrılamadı:', error);
    
    // Fallback: Mevcut künye verilerinden belge tiplerini çıkar
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
        const uniqueBelgeTipleri = [...new Set(bildirimciyeData.items.map((item: any) => item.belgeTipi))];

        // Gerçek belge tiplerini map et
        const belgeTipleriMap: Record<string, { ad: string; aciklama: string }> = {
          '0': { ad: 'Belge Yok', aciklama: 'Belge bulunmuyor' },
          '207': { ad: 'Fatura', aciklama: 'Satış faturası' },
          '208': { ad: 'İrsaliye', aciklama: 'Mal irsaliyesi' },
          '209': { ad: 'Gümrük Beyannamesi', aciklama: 'Gümrük beyannamesi' },
          '210': { ad: 'İrsaliyeli Fatura', aciklama: 'İrsaliyeli fatura' }
        };

        const mappedBelgeTipleri = uniqueBelgeTipleri.map((id: string) => ({
          id,
          ad: belgeTipleriMap[id]?.ad || `Belge Tipi ${id}`,
          aciklama: belgeTipleriMap[id]?.aciklama || ''
        }));

        return NextResponse.json({
          ok: true,
          count: mappedBelgeTipleri.length,
          items: mappedBelgeTipleri,
          note: 'Mevcut verilerden çıkarıldı (HKS servisi erişilemedi)'
        });
      }
    } catch (fallbackError) {
      console.error('Fallback de başarısız:', fallbackError);
    }
    
    // Son fallback: Tüm bilinen belge tipleri
    const fallbackBelgeTipleri = [
      { id: '0', ad: 'Belge Yok', aciklama: 'Belge bulunmuyor' },
      { id: '207', ad: 'Fatura', aciklama: 'Satış faturası' },
      { id: '208', ad: 'İrsaliye', aciklama: 'Mal irsaliyesi' },
      { id: '209', ad: 'Gümrük Beyannamesi', aciklama: 'Gümrük beyannamesi' },
      { id: '210', ad: 'İrsaliyeli Fatura', aciklama: 'İrsaliyeli fatura' }
    ];

    return NextResponse.json({
      ok: true,
      count: fallbackBelgeTipleri.length,
      items: fallbackBelgeTipleri,
      note: 'Fallback data kullanıldı'
    });
  }
}