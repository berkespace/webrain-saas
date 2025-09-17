import 'server-only';
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

import { NextRequest } from 'next/server';
import { callBildirimcininYaptigiBildirimListesi } from '@/lib/hks-call';
import { mapBildirimciyeYapilan } from '@/lib/hks-mappers';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { KunyeNo = 0, baslangic, bitis, KalanMiktariSifirdanBuyukOlanlar = true, Sifat } = body;
    
    // Frontend'den gelen parametreleri backend formatına çevir
    const BaslangicTarihi = baslangic;
    const BitisTarihi = bitis;

    const startDate = new Date(`${BaslangicTarihi}T00:00:00`);
    const endDate = new Date(`${BitisTarihi}T23:59:59`);

    // lib/hks-call.ts'deki fonksiyonu kullan
    const xml = await callBildirimcininYaptigiBildirimListesi({
      BaslangicTarihi: startDate,
      BitisTarihi: endDate,
      KunyeNo: KunyeNo,
      KunyeTuru: 1,
      KalanMiktariSifirdanBuyukOlanlar: KalanMiktariSifirdanBuyukOlanlar,
      Sifat: Sifat === undefined ? undefined : Sifat,
    });

    const data = await mapBildirimciyeYapilan(xml);
    
    // Bildirimci TC/Vergi No'larını topla
    const bildirimciTcKimlikVergiNolar = [...new Set(
      data.items
        .map((item: any) => item.bildirimciTc)
        .filter((tc: string) => tc && tc.trim() !== '')
    )];

    // Geçici olarak bildirimci ünvanı devre dışı (timeout sorunu nedeniyle)
    const bildirimciUnvanlari: { [key: string]: string } = {};
    
    // Bildirimlere boş ünvan ekle
    const itemsWithUnvan = data.items.map((item: any) => ({
      ...item,
      bildirimciUnvan: ''
    }));

    return Response.json({ 
      ok: true, 
      count: itemsWithUnvan.length, 
      islemKodu: data.islemKodu, 
      items: itemsWithUnvan
    });
  } catch (e:any) {
    return Response.json({ ok:false, error: String(e?.message||e) }, { status: 500 });
  }
}