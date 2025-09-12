import 'server-only';
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

import { callBildirimciyeYapilanBildirimListesi } from '@/lib/hks-call';
import { mapBildirimciyeYapilan } from '@/lib/hks-mappers';

export async function POST(req: Request) {
  try {
    const { baslangic, bitis, kunyeNo, sifat } = await req.json();

    const start = baslangic ? new Date(baslangic) : new Date(Date.now() - 30*24*60*60*1000);
    const end   = bitis      ? new Date(bitis)    : new Date();

    const xml = await callBildirimciyeYapilanBildirimListesi({
      BaslangicTarihi: start,
      BitisTarihi: end,
      KunyeNo: kunyeNo ?? 0,
      Sifat: sifat,
    });

    const data = await mapBildirimciyeYapilan(xml);
    return Response.json({ 
      ok: true, 
      count: data.items.length, 
      islemKodu: data.islemKodu, 
      items: data.items
    });
  } catch (e:any) {
    return Response.json({ ok:false, error: String(e?.message||e) }, { status: 500 });
  }
}
