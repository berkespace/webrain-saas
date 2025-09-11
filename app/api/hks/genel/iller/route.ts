import 'server-only';
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

import { HKS, buildSoapEnvelope, soapAction, parseSoap } from '@/app/lib/hks-soap';

export async function GET() {
  try {
    if (!HKS.u || !HKS.p || !HKS.sp) {
      return Response.json({ ok:false, error:'ENV_MISSING' }, { status: 500 });
    }

    const method = 'GenelServisIller';
    const envelope = buildSoapEnvelope(method, {
      UserName: HKS.u,
      Password: HKS.p,
      ServicePassword: HKS.sp,
      Istek: {},
    });

    const res = await fetch(HKS.genelUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'text/xml; charset=utf-8',
        'SOAPAction': soapAction('IGenelService', method),
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

    const list = result?.Iller ?? result?.IlListesi ?? [];
    const items = Array.isArray(list) ? list : (list ? [list] : []);
    return Response.json({ ok:true, count: items.length, items });
  } catch (e:any) {
    return Response.json({ ok:false, error:String(e?.message ?? e) }, { status:500 });
  }
}