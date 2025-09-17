import { NextRequest, NextResponse } from 'next/server';
import { callBildirimciyeYapilanBildirimListesi } from '@/lib/hks-call';
import { mapBildirimciyeYapilan } from '@/lib/hks-mappers';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { KunyeNo = 0, baslangic, bitis, KalanMiktariSifirdanBuyukOlanlar = true, Sifat } = body;

    const BaslangicTarihi = baslangic;
    const BitisTarihi = bitis;

    const startDate = new Date(`${BaslangicTarihi}T00:00:00`);
    const endDate = new Date(`${BitisTarihi}T23:59:59`);

    const xml = await callBildirimciyeYapilanBildirimListesi({
      BaslangicTarihi: startDate,
      BitisTarihi: endDate,
      KunyeNo: KunyeNo,
      KunyeTuru: 1,
      KalanMiktariSifirdanBuyukOlanlar: KalanMiktariSifirdanBuyukOlanlar,
      Sifat: Sifat,
    });

    const data = await mapBildirimciyeYapilan(xml);

    // Sadece kalan miktarı 0'dan büyük olanları filtrele
    const stokKunyeler = data.items.filter((item: any) => 
      item.kalanMiktar && parseFloat(item.kalanMiktar) > 0
    );

    return NextResponse.json({
      ok: true,
      count: stokKunyeler.length,
      items: stokKunyeler,
      note: 'Stoktaki künyeler'
    });
  } catch (e: any) {
    console.error('HKS Stok Künyeler API hatası:', e);
    return NextResponse.json({ ok: false, error: String(e?.message || e) }, { status: 500 });
  }
}
