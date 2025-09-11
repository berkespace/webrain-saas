import 'server-only';
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

import { NextRequest } from 'next/server';
import { HKS, buildSoapEnvelope, soapAction, parseSoap } from '@/app/lib/hks-soap';

export async function POST(req: NextRequest) {
  try {
    const { KunyeNo = 0, BaslangicTarihi, BitisTarihi, KalanMiktariSifirdanBuyukOlanlar = true } = await req.json();

    const method = 'BildirimServisBildirimcininYaptigiBildirimListesi';
    const envelope = buildSoapEnvelope(method, {
      Istek: {
        KunyeTuru: 1,
        KunyeNo,
        BaslangicTarihi: `${BaslangicTarihi}T00:00:00`,
        BitisTarihi: `${BitisTarihi}T00:00:00`,
        KalanMiktariSifirdanBuyukOlanlar: !!KalanMiktariSifirdanBuyukOlanlar
      },
      Password: HKS.p,
      ServicePassword: HKS.sp,
      UserName: HKS.u,
    });

    const res = await fetch(HKS.bildirimUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'text/xml; charset=utf-8',
        'SOAPAction': soapAction('IBildirimService', method),
      },
      body: envelope,
    });

    const text = await res.text();
    if (!res.ok) return Response.json({ ok:false, status:res.status, raw:text.slice(0,2000) }, { status:500 });

    const { resp, raw } = parseSoap(text, method);
    const result = resp?.[`${method}Result`];
    if (!result) return Response.json({ ok:false, error:'NO_RESULT', raw:raw.slice(0,2000) }, { status:500 });

    if (String(result?.IslemKodu) !== '1')
      return Response.json({ ok:false, islemKodu:result?.IslemKodu, hata:result?.HataKodlari ?? result?.Mesaj, raw:raw.slice(0,2000) }, { status:500 });

    const sonuc = result?.Sonuc ?? result; // bazen direkt dönebiliyor
    if (Number(sonuc?.HataKodu) !== 0)
      return Response.json({ ok:false, hataKodu:sonuc?.HataKodu, mesaj:sonuc?.Mesaj, raw:raw.slice(0,2000) }, { status:500 });

    const arr = sonuc?.Bildirimler ?? [];
    const bildirimler = Array.isArray(arr) ? arr : (arr ? [arr] : []);

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

    return Response.json({ ok:true, count: mapped.length, items: mapped });
  } catch (e:any) {
    return Response.json({ ok:false, error:String(e?.message ?? e) }, { status:500 });
  }
}