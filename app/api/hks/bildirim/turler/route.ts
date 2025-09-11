import 'server-only';
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

import { HKS, buildSoapEnvelope, soapAction, parseSoap } from '@/app/lib/hks-soap';

export async function GET() {
  try {
    if (!HKS.u || !HKS.p || !HKS.sp) {
      return Response.json({ ok:false, error:'ENV_MISSING' }, { status: 500 });
    }

    const method = 'BildirimServisBildirimTurleri';
    const envelope = buildSoapEnvelope(method, {
      Istek: {},
      Password: HKS.p,
      ServicePassword: HKS.sp,
      UserName: HKS.u,
    });

    const r = await fetch(HKS.bildirimUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'text/xml; charset=utf-8',
        'SOAPAction': soapAction('IBildirimService', method),
      },
      body: envelope,
    });

    const txt = await r.text();
    if (!r.ok) return Response.json({ ok:false, status:r.status, raw:txt.slice(0,2000) }, { status:500 });

    const ps = parseSoap(txt, method);
    if (!ps.ok) return Response.json({ ok:false, error:ps.error, raw:ps.raw.slice(0,2000) }, { status:500 });

    // WCF şekli: IslemKodu / Sonuc / HataKodlari
    if (ps.type === 'WCF') {
      if (String(ps.islemKodu) !== '1') {
        return Response.json({ ok:false, islemKodu:ps.islemKodu, hataKodlari:ps.hataKodlari, raw:ps.raw.slice(0,2000) }, { status:500 });
      }

      const sonuc = ps.sonuc;
      if (Number(sonuc?.HataKodu ?? -1) !== 0) {
        return Response.json({ ok:false, hataKodu:sonuc?.HataKodu, mesaj:sonuc?.Mesaj, raw:ps.raw.slice(0,2000) }, { status:500 });
      }

      const list = sonuc?.Turler ?? sonuc?.BildirimTurleri ?? [];
      const items = Array.isArray(list) ? list : (list ? [list] : []);
      return Response.json({ ok:true, count: items.length, items });
    }

    // Eski RESULT şekli
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