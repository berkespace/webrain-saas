import 'server-only';
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

import { XMLParser } from 'fast-xml-parser';
import { HKS, buildSoapEnvelope, soapAction, pickSoapResponse } from '@/app/lib/hks-soap';

export async function GET() {
  try {
    const method = 'BildirimTurleriListesi';
    const envelope = buildSoapEnvelope(method, { Istek: {} });

    const res = await fetch(HKS.bildirimUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'text/xml; charset=utf-8',
        'SOAPAction': soapAction('IBildirimService', method),
      },
      body: envelope,
    });

    const raw = await res.text();
    if (!res.ok) return Response.json({ ok:false, status:res.status, raw:raw.slice(0,2000) }, { status: 500 });

    const parser = new XMLParser({ ignoreAttributes:false, attributeNamePrefix:'@_', textNodeName:'#text' });
    const parsed = parser.parse(raw);
    const resp = pickSoapResponse(parsed, method);
    const result = resp?.[`${method}Result`];

    if (String(result?.IslemKodu) !== '1') {
      return Response.json({ ok:false, islemKodu: result?.IslemKodu, hata: result?.HataKodlari ?? result?.Mesaj, raw: raw.slice(0,2000) }, { status: 500 });
    }

    const list = result?.Turler ?? result?.BildirimTurleri ?? [];
    const items = Array.isArray(list) ? list : [list];

    return Response.json({ ok:true, count: items.length, items }, { status: 200 });
  } catch (e:any) {
    return Response.json({ ok:false, error: e?.message ?? 'UNKNOWN' }, { status: 500 });
  }
}
