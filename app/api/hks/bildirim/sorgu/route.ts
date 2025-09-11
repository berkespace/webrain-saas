import 'server-only';
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

import { NextRequest } from 'next/server';
import { XMLParser } from 'fast-xml-parser';
import { HKS, buildSoapEnvelope, soapAction, pickSoapResponse } from '@/app/lib/hks-soap';

export async function POST(req: NextRequest) {
  try {
    console.log('HKS Bildirim Sorgu API başlıyor...');
    
    const { KunyeNo = 0, BaslangicTarihi, BitisTarihi, KalanMiktariSifirdanBuyukOlanlar = true } = await req.json();
    console.log('Request params:', { KunyeNo, BaslangicTarihi, BitisTarihi, KalanMiktariSifirdanBuyukOlanlar });

    const method = 'BildirimServisBildirimcininYaptigiBildirimListesi'; // C# proxy ile aynı
    const payload = {
      Istek: {
        KunyeTuru: 1,
        KunyeNo: KunyeNo ?? 0,
        // C# DateTime tipine yakın format: 'YYYY-MM-DDTHH:mm:ss'
        BaslangicTarihi: `${BaslangicTarihi}T00:00:00`,
        BitisTarihi: `${BitisTarihi}T00:00:00`,
        KalanMiktariSifirdanBuyukOlanlar: !!KalanMiktariSifirdanBuyukOlanlar
      }
    };

    console.log('Payload:', payload);
    const envelope = buildSoapEnvelope(method, payload);
    console.log('SOAP Envelope preview:', envelope.substring(0, 500));

    const soapActionHeader = soapAction('IBildirimService', method);
    console.log('SOAPAction:', soapActionHeader);
    console.log('HKS Config:', { u: HKS.u ? 'SET' : 'NOT SET', p: HKS.p ? 'SET' : 'NOT SET', sp: HKS.sp ? 'SET' : 'NOT SET' });

    const res = await fetch(HKS.bildirimUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'text/xml; charset=utf-8',
        'SOAPAction': soapActionHeader,
      },
      body: envelope,
    });

    console.log('Response status:', res.status);
    console.log('Response headers:', Object.fromEntries(res.headers.entries()));

    const raw = await res.text();
    console.log('Raw response preview:', raw.substring(0, 1000));
    
    if (!res.ok) {
      console.error('HTTP Error:', res.status, raw);
      return Response.json({ ok:false, status:res.status, raw: raw.slice(0,2000) }, { status: 500 });
    }

    const parser = new XMLParser({ ignoreAttributes:false, attributeNamePrefix:'@_', textNodeName:'#text' });
    const parsed = parser.parse(raw);
    console.log('Parsed XML:', JSON.stringify(parsed, null, 2));
    
    const resp = pickSoapResponse(parsed, method);
    console.log('Picked response:', resp);
    
    const result = resp?.[`${method}Result`];
    console.log('Method result:', result);

    if (String(result?.IslemKodu) !== '1') {
      console.error('HKS IslemKodu error:', result?.IslemKodu, result?.HataKodlari);
      return Response.json({ ok:false, islemKodu: result?.IslemKodu, hata: result?.HataKodlari ?? result?.Mesaj, raw: raw.slice(0,2000) }, { status: 500 });
    }

    const sonuc = result?.Sonuc;
    console.log('Sonuc:', sonuc);
    
    if (Number(sonuc?.HataKodu) !== 0) {
      console.error('HKS Sonuc HataKodu error:', sonuc?.HataKodu, sonuc?.Mesaj);
      return Response.json({ ok:false, hataKodu: sonuc?.HataKodu, mesaj: sonuc?.Mesaj, raw: raw.slice(0,2000) }, { status: 500 });
    }

    const bildirimler = Array.isArray(sonuc?.Bildirimler) ? sonuc.Bildirimler : (sonuc?.Bildirimler ? [sonuc.Bildirimler] : []);
    console.log('Bildirimler count:', bildirimler.length);

    const mapped = bildirimler.map((b:any, i:number) => ({
      id: String(b?.Id ?? i+1),
      kunyeNo: b?.KunyeNo ?? '',
      urunAdi: b?.UrunAdi ?? b?.MalAdi ?? '',
      urunCinsi: b?.UrunCinsi ?? '',
      miktar: b?.Miktar ?? '',
      birim: b?.Birim ?? '',
      bildirimTarihi: b?.BildirimTarihi ?? '',
      malinSahibiAdi: b?.MalinSahibiAdi ?? '',
      malinSahibiTc: b?.MalinSahibiTcKimlikNo ?? '',
      durum: b?.Durum ?? '',
    }));

    return Response.json({ ok:true, count: mapped.length, items: mapped }, { status: 200 });
  } catch (e:any) {
    return Response.json({ ok:false, error: e?.message ?? 'UNKNOWN' }, { status: 500 });
  }
}
