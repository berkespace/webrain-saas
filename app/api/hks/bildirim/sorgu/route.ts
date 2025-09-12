import 'server-only';
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

import { NextRequest } from 'next/server';
import { buildSoapEnvelope, soapAction, parseSoap } from '@/app/lib/hks-soap';
import { XMLParser } from 'fast-xml-parser';

export async function POST(req: NextRequest) {
  try {
    const { KunyeNo = 0, BaslangicTarihi, BitisTarihi, KalanMiktariSifirdanBuyukOlanlar = true, Sifat } = await req.json();

    const HKS = {
      bildirimUrl: 'https://hks.hal.gov.tr/WebServices/BildirimService.svc',
      username: process.env.HKS_USERNAME ?? '',
      password: process.env.HKS_PASSWORD ?? '',
      servicePassword: process.env.HKS_SERVICE_PASSWORD ?? '',
    };

    if (!HKS.username || !HKS.password || !HKS.servicePassword) {
      return Response.json({ ok:false, error:'ENV_MISSING' }, { status:500 });
    }

    // Use the correct SOAP envelope structure with proper namespaces
    const startDate = new Date(`${BaslangicTarihi}T00:00:00`);
    const endDate = new Date(`${BitisTarihi}T23:59:59`);
    
    const envelope = `<?xml version="1.0" encoding="utf-8"?>
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
  <soap:Body>
    <BaseRequestMessageOf_BildirimSorguIstek xmlns="http://www.gtb.gov.tr//WebServices" xmlns:a="http://schemas.datacontract.org/2004/07/GTB.HKS.Bildirim.ServiceContract">
      <Istek>
        <a:BaslangicTarihi>${startDate.toISOString().slice(0,19)}</a:BaslangicTarihi>
        <a:BitisTarihi>${endDate.toISOString().slice(0,19)}</a:BitisTarihi>
        <a:KalanMiktariSifirdanBuyukOlanlar>${!!KalanMiktariSifirdanBuyukOlanlar}</a:KalanMiktariSifirdanBuyukOlanlar>
        <a:KunyeNo>${KunyeNo}</a:KunyeNo>
        <a:KunyeTuru>1</a:KunyeTuru>
        ${Sifat ? `<a:Sifat>${Sifat}</a:Sifat>` : ''}
      </Istek>
      <Password>${HKS.password}</Password>
      <ServicePassword>${HKS.servicePassword}</ServicePassword>
      <UserName>${HKS.username}</UserName>
    </BaseRequestMessageOf_BildirimSorguIstek>
  </soap:Body>
</soap:Envelope>`;
    
    const r = await fetch(HKS.bildirimUrl, {
      method:'POST',
      headers:{
        'Content-Type':'text/xml; charset=utf-8',
        'SOAPAction': 'http://www.gtb.gov.tr//WebServices/IBildirimService/BildirimServisBildirimcininYaptigiBildirimListesi',
      },
      body: envelope,
    });

    const txt = await r.text();
    if (!r.ok) return Response.json({ ok:false, status:r.status, raw:txt.slice(0,2000) }, { status:500 });

    const ps = await parseSoap(txt, 'BildirimServisBildirimcininYaptigiBildirimListesi');
    if (!ps.ok) return Response.json({ ok:false, error:ps.error, raw:ps.raw.slice(0,2000) }, { status:500 });

    // WCF şekli: IslemKodu / Sonuc / HataKodlari
    if (ps.type === 'WCF') {
      // Hata kontrolü: HataKodlari i:nil="true" ise hata yok
      if (ps.hataKodlari && !ps.hataKodlari['@_i:nil']) {
        return Response.json({ ok:false, islemKodu:ps.islemKodu, hataKodlari:ps.hataKodlari, raw:ps.raw.slice(0,2000) }, { status:500 });
      }

      const sonuc = ps.sonuc;
      // Sonuc içinde HataKodu yoksa, Bildirimler var demektir
      if (sonuc?.HataKodu && Number(sonuc.HataKodu) !== 0) {
        return Response.json({ ok:false, hataKodu:sonuc.HataKodu, mesaj:sonuc.Mesaj, raw:ps.raw.slice(0,2000) }, { status:500 });
      }

      const bildirimler = sonuc?.['a:Bildirimler'] || sonuc?.Bildirimler;
      const bildirimlerArray = Array.isArray(bildirimler) ? bildirimler : (bildirimler ? [bildirimler] : []);
      
      // Parse each b:BildirimSorguDTO XML string
      const arr = [];
      for (const item of bildirimlerArray) {
        const dtoXml = item?.['b:BildirimSorguDTO'];
        if (dtoXml && typeof dtoXml === 'string') {
          // Parse the XML string to get the actual data
          const parser = new XMLParser({ 
            ignoreAttributes: false, 
            attributeNamePrefix: '@_', 
            textNodeName: '#text',
            parseAttributeValue: false,
            parseTagValue: true
          });
          const parsed = parser.parse(dtoXml);
          const dto = parsed['b:BildirimSorguDTO'] || parsed;
          arr.push(dto);
        } else if (dtoXml && typeof dtoXml === 'object') {
          // If it's already an object, use it directly
          if (Array.isArray(dtoXml)) {
            arr.push(...dtoXml);
          } else {
            arr.push(dtoXml);
          }
        }
      }
      const items = arr.map((b:any, i:number) => ({
        id: String(b?.['b:KunyeNo'] ?? b?.KunyeNo ?? i+1),
        kunyeNo: b?.['b:KunyeNo'] ?? b?.KunyeNo ?? '',
        urunAdi: b?.['b:MalinAdi'] ?? b?.MalinAdi ?? '',
        urunTuru: b?.['b:MalinTuru'] ?? b?.MalinTuru ?? '',
        urunCinsi: b?.['b:MalinCinsi'] ?? b?.MalinCinsi ?? '',
        miktar: b?.['b:MalinMiktari'] ?? b?.MalinMiktari ?? '',
        kalanMiktar: b?.['b:KalanMiktar'] ?? b?.KalanMiktar ?? '',
        birimId: b?.['b:MiktarBirimId'] ?? b?.MiktarBirimId ?? '',
        birimAd: b?.['b:MiktarBirimiAd'] ?? b?.MiktarBirimiAd ?? '',
        fiyat: b?.['b:MalinSatisFiyati'] ?? b?.MalinSatisFiyati ?? '',
        bildirimTarihi: b?.['b:BildirimTarihi'] ?? b?.BildirimTarihi ?? '',
        bildirimTuru: b?.['b:BildirimTuru'] ?? b?.BildirimTuru ?? '',
        bildirimciTc: b?.['b:BildirimciTcKimlikVergiNo'] ?? b?.BildirimciTcKimlikVergiNo ?? '',
        malinSahibiTc: b?.['b:MalinSahibiTcKimlikVergiNo'] ?? b?.MalinSahibiTcKimlikVergiNo ?? '',
        ureticiTc: b?.['b:UreticiTcKimlikVergiNo'] ?? b?.UreticiTcKimlikVergiNo ?? '',
        aracPlaka: b?.['b:AracPlakaNo'] ?? b?.AracPlakaNo ?? '',
        belgeNo: b?.['b:BelgeNo'] ?? b?.BelgeNo ?? '',
        belgeTipi: b?.['b:BelgeTipi'] ?? b?.BelgeTipi ?? '',
        sifati: b?.['b:Sifat'] ?? b?.Sifat ?? '',
        gidecekIsyeriId: b?.['b:GidecekIsyeriId'] ?? b?.GidecekIsyeriId ?? '',
        gidecekYerTuruId: b?.['b:GidecekYerTuruId'] ?? b?.GidecekYerTuruId ?? '',
        analizStatus: b?.['b:AnalizStatus'] ?? b?.AnalizStatus ?? '',
        rusumMiktari: b?.['b:RusumMiktari'] ?? b?.RusumMiktari ?? '',
        uniqueId: b?.['b:UniqueId'] ?? b?.UniqueId ?? '',
        malinKodNo: b?.['b:MalinKodNo'] ?? b?.MalinKodNo ?? '',
        malinCinsKodNo: b?.['b:MalinCinsKodNo'] ?? b?.MalinCinsKodNo ?? '',
        malinTuruKodNo: b?.['b:MalinTuruKodNo'] ?? b?.MalinTuruKodNo ?? '',
        durum: 'Aktif', // Default status
      }));

      return Response.json({ ok:true, count: items.length, items });
    }

    // Eski RESULT şekli (Genelde kullanmıyoruz ama kalsın)
    const result = (ps as any).result;
    if (!result) return Response.json({ ok:false, error:'NO_RESULT', raw:ps.raw.slice(0,2000) }, { status:500 });

    if (String(result?.IslemKodu) !== '1') {
      return Response.json({ ok:false, islemKodu:result?.IslemKodu, hata:result?.HataKodlari, raw:ps.raw.slice(0,2000) }, { status:500 });
    }

    return Response.json({ ok:true, raw:ps.raw.slice(0,2000) }); // Fallback
  } catch (e:any) {
    return Response.json({ ok:false, error:String(e?.message ?? e) }, { status:500 });
  }
}