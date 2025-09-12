import 'server-only';
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET() {
  const mask = (v?: string) => (v ? v.slice(0,2)+'***' : 'EMPTY');

  try {
    const u = process.env.HKS_USERNAME;
    const p = process.env.HKS_PASSWORD;
    const sp = process.env.HKS_SERVICE_PASSWORD;

    const endpoints = [
      'https://hks.hal.gov.tr/WebServices/GenelService.svc?singleWsdl',
      'https://hks.hal.gov.tr/WebServices/BildirimService.svc?singleWsdl',
    ];

    const checks = [];
    for (const url of endpoints) {
      try {
        const r = await fetch(url, { method: 'GET', cache: 'no-store' });
        const txt = await r.text();
        checks.push({ url, ok: r.ok, status: r.status, preview: txt.slice(0,300) });
      } catch (e:any) {
        checks.push({ url, ok:false, error: String(e?.message ?? e) });
      }
    }

    return Response.json({
      ok:true,
      node: process.versions.node,
      env: { HKS_USERNAME: mask(u), HKS_PASSWORD: mask(p), HKS_SERVICE_PASSWORD: mask(sp) },
      checks
    });
  } catch (e:any) {
    return Response.json({ ok:false, error:String(e?.message ?? e) }, { status:500 });
  }
}