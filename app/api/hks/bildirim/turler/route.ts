import 'server-only';
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

import { buildSoapEnvelope, soapAction, parseSoap } from '@/app/lib/hks-soap';

export async function GET() {
  try {
    const HKS = {
      bildirimUrl: 'https://hks.hal.gov.tr/WebServices/BildirimService.svc',
      u: process.env.HKS_USERNAME ?? '',
      p: process.env.HKS_PASSWORD ?? '',
      sp: process.env.HKS_SERVICE_PASSWORD ?? '',
    };

    if (!HKS.u || !HKS.p || !HKS.sp) {
      return Response.json({ ok:false, error:'ENV_MISSING' }, { status: 500 });
    }

    const method = 'BildirimServisBildirimTurleri';
    const soapBodyElement = 'BaseRequestMessageOf_BildirimTurleriIstek';
    const envelope = await buildSoapEnvelope(soapBodyElement, {
      Istek: {},
      Password: HKS.p,
      ServicePassword: HKS.sp,
      UserName: HKS.u,
    });

    const r = await fetch(HKS.bildirimUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'text/xml; charset=utf-8',
        'SOAPAction': await soapAction('IBildirimService', method),
      },
      body: envelope,
    });

    const txt = await r.text();
    if (!r.ok) return Response.json({ ok:false, status:r.status, raw:txt.slice(0,2000) }, { status:500 });

    const ps = await parseSoap(txt, method);
    if (!ps.ok) return Response.json({ ok:false, error:ps.error, raw:ps.raw.slice(0,2000) }, { status:500 });

    // WCF şekli: IslemKodu / Sonuc / HataKodlari
    if (ps.type === 'WCF') {
      // Check if there are any errors in hataKodlari
      if (ps.hataKodlari && !ps.hataKodlari['@_i:nil']) {
        return Response.json({ ok:false, islemKodu:ps.islemKodu, hataKodlari:ps.hataKodlari, raw:ps.raw.slice(0,2000) }, { status:500 });
      }

      const sonuc = ps.sonuc;
      const hataKodu = sonuc?.['a:HataKodu'] ?? sonuc?.HataKodu ?? -1;
      if (Number(hataKodu) !== 0) {
        return Response.json({ ok:false, hataKodu, mesaj:sonuc?.Mesaj, raw:ps.raw.slice(0,2000) }, { status:500 });
      }

      // Handle the actual HKS response structure
      const turlerData = sonuc?.['a:BildirimTurleri']?.['b:BildirimTuruDTO'] ?? sonuc?.Turler ?? sonuc?.BildirimTurleri ?? [];
      const items = Array.isArray(turlerData) ? turlerData : (turlerData ? [turlerData] : []);
      return Response.json({ ok:true, count: items.length, items, sonuc });
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