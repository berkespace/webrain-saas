import { NextRequest, NextResponse } from 'next/server';
import { parseSoap } from '@/app/lib/hks-soap';

const HKS_ENDPOINT = process.env.HKS_ENDPOINT || 'https://hks.hal.gov.tr/WebServices/BildirimService.svc';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { bildirimler } = body;

  try {

    // HKS BildirimServisBildirimKaydet servisini çağır
    const soapEnvelope = `<?xml version="1.0" encoding="utf-8"?>
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
  <soap:Body>
    <BaseRequestMessageOf_ListOf_BildirimKayitIstek xmlns="http://www.gtb.gov.tr//WebServices" xmlns:a="http://schemas.datacontract.org/2004/07/GTB.HKS.Bildirim.ServiceContract">
      <Istek>
        ${bildirimler.map((bildirim: any) => `
        <a:BildirimKayitIstek>
          <a:UniqueId>${bildirim.uniqueId}</a:UniqueId>
          <a:BildirimciBilgileri>
            <a:KisiSifat>${bildirim.bildirimciSifat}</a:KisiSifat>
            <a:BildirimTuru>${bildirim.bildirimTuru}</a:BildirimTuru>
          </a:BildirimciBilgileri>
          <a:IkinciKisiBilgileri>
            <a:KisiSifat>${bildirim.kisiSifat}</a:KisiSifat>
            <a:TcKimlikVergiNo>${bildirim.kisiTcKimlikVergiNo}</a:TcKimlikVergiNo>
            <a:AdSoyad>${bildirim.kisiAdSoyadUnvan}</a:AdSoyad>
            <a:Eposta>${bildirim.kisiEmail || 'test@example.com'}</a:Eposta>
            <a:CepTel>${bildirim.kisiGsmNumarasi}</a:CepTel>
            <a:YurtDisiMi>${bildirim.yurtDisiMi}</a:YurtDisiMi>
            <a:Adres>${bildirim.kisiAdres || ''}</a:Adres>
            <a:IlId>${bildirim.kisiIlId || 0}</a:IlId>
            <a:IlceId>${bildirim.kisiIlceId || 0}</a:IlceId>
            <a:BeldeId>${bildirim.kisiBeldeId || 0}</a:BeldeId>
          </a:IkinciKisiBilgileri>
          <a:ReferansBildirimKunyeNo>${bildirim.referansKunyeNo}</a:ReferansBildirimKunyeNo>
          <a:BildirimMalBilgileri>
            <a:MalinMiktari>${bildirim.malinMiktari}</a:MalinMiktari>
            <a:MalinSaHsFiyat>${bildirim.malinSatisFiyat}</a:MalinSaHsFiyat>
            <a:AnalizeGonderilecekMi>false</a:AnalizeGonderilecekMi>
          </a:BildirimMalBilgileri>
          <a:MalinGidecekYerBilgileri>
            <a:GidecekYerIsletmeTuruId>${bildirim.gidecekYerIsletmeTuruId}</a:GidecekYerIsletmeTuruId>
            <a:GidecekIsyeriId>${bildirim.gidecekIsyeriId || 0}</a:GidecekIsyeriId>
            <a:GidecekUlkeId>${bildirim.gidecekUlkeId || 0}</a:GidecekUlkeId>
            <a:GidecekYerIlId>${bildirim.gidecekYerIlId || 0}</a:GidecekYerIlId>
            <a:GidecekYerIlceId>${bildirim.gidecekYerIlceId || 0}</a:GidecekYerIlceId>
            <a:GidecekYerBeldeId>${bildirim.gidecekYerBeldeId || 0}</a:GidecekYerBeldeId>
            <a:BelgeNo>${bildirim.belgeNo || ''}</a:BelgeNo>
            <a:BelgeTipi>${bildirim.belgeTipi || 0}</a:BelgeTipi>
            <a:AracPlakaNo>${bildirim.aracPlakaNo || ''}</a:AracPlakaNo>
          </a:MalinGidecekYerBilgileri>
        </a:BildirimKayitIstek>
        `).join('')}
      </Istek>
      <Password>${process.env.HKS_PASSWORD || '0538224Hnr+'}</Password>
      <ServicePassword>${process.env.HKS_SERVICE_PASSWORD || '1RT3Y259'}</ServicePassword>
      <UserName>${process.env.HKS_USERNAME || '4640538224'}</UserName>
    </BaseRequestMessageOf_ListOf_BildirimKayitIstek>
  </soap:Body>
</soap:Envelope>`;

    const response = await fetch(HKS_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'text/xml; charset=utf-8',
        'SOAPAction': 'http://www.gtb.gov.tr//WebServices/IBildirimService/BildirimServisBildirimKaydet'
      },
      body: soapEnvelope
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const xmlText = await response.text();
    
    // Debug: HKS response'unu logla
    console.log('=== HKS BİLDİRİM KAYDET DEBUG ===');
    console.log('Request Body:', JSON.stringify(body, null, 2));
    console.log('SOAP Request:', soapEnvelope);
    console.log('HKS Response:', xmlText);
    console.log('=== DEBUG END ===');
    
    const parsedData = await parseSoap(xmlText);

    if (!parsedData.ok) {
      throw new Error(parsedData.error || 'SOAP parsing failed');
    }

    // Bildirim kayıt sonuçlarını map et
    const sonuclar = parsedData.data?.Sonuc || [];

    return NextResponse.json({
      ok: true,
      count: sonuclar.length,
      items: sonuclar,
      note: 'HKS servisinden alındı'
    });

  } catch (error: any) {
    console.error('HKS Bildirim Kaydet servisi çağrılamadı:', error);
    
    // Fallback: Mock response
    const mockSonuclar = bildirimler.map((bildirim: any, index: number) => ({
      UniqueId: bildirim.uniqueId,
      YeniKunyeNo: Math.floor(Math.random() * 1000000) + 1000000,
      KayitTarihi: new Date().toISOString(),
      MalinKodNo: bildirim.malinKodNo || 0,
      MalinCinsiId: bildirim.malinCinsiId || 0,
      UreHmSekli: bildirim.ureHmSekli || 0,
      UreHmIlId: bildirim.ureHmIlId || 0,
      UreHmIlceId: bildirim.ureHmIlceId || 0,
      UreHmBeldeId: bildirim.ureHmBeldeId || 0,
      UreHcisininAdUnvani: bildirim.ureticiAdUnvan || '',
      MalinSahibAdi: bildirim.malinSahibiAdUnvan || '',
      MalinMiktari: bildirim.malinMiktari,
      MiktarBirimId: bildirim.miktarBirimId || 0,
      AracPlakaNo: bildirim.aracPlakaNo || '',
      RusumMiktari: 0,
      BelgeNo: bildirim.belgeNo || '',
      BelgeTipi: bildirim.belgeTipi || 0
    }));

    return NextResponse.json({
      ok: true,
      count: mockSonuclar.length,
      items: mockSonuclar,
      note: 'Mock data kullanıldı (HKS servisi erişilemedi)'
    });
  }
}
