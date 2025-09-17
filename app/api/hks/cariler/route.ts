import { NextRequest, NextResponse } from 'next/server';
import { callBildirimciyeYapilanBildirimListesi } from '@/lib/hks-call';
import { mapBildirimciyeYapilan } from '@/lib/hks-mappers';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { baslangic, bitis } = body;

    const startDate = new Date(`${baslangic}T00:00:00`);
    const endDate = new Date(`${bitis}T23:59:59`);

    const xml = await callBildirimciyeYapilanBildirimListesi({
      BaslangicTarihi: startDate,
      BitisTarihi: endDate,
      KunyeNo: 0,
      KunyeTuru: 1,
      KalanMiktariSifirdanBuyukOlanlar: true,
    });

    const data = await mapBildirimciyeYapilan(xml);

    // Unique carileri çıkar
    const uniqueCariler = new Map();
    
    data.items.forEach((item: any) => {
      const tcKimlikVergiNo = item.bildirimciTcKimlikVergiNo;
      const unvan = item.bildirimciUnvan;
      
      if (tcKimlikVergiNo && !uniqueCariler.has(tcKimlikVergiNo)) {
        uniqueCariler.set(tcKimlikVergiNo, {
          tcKimlikVergiNo,
          unvan: unvan || 'Bilinmeyen',
          sifat: item.sifat || '6'
        });
      }
    });

    const cariler = Array.from(uniqueCariler.values());

    return NextResponse.json({
      ok: true,
      count: cariler.length,
      items: cariler,
      note: 'Kayıtlı cariler'
    });
  } catch (e: any) {
    console.error('HKS Cariler API hatası:', e);
    return NextResponse.json({ ok: false, error: String(e?.message || e) }, { status: 500 });
  }
}
