import 'server-only';
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

import { callBildirimciyeYapilanBildirimListesi } from '@/lib/hks-call';
import { mapBildirimciyeYapilan } from '@/lib/hks-mappers';

// Bildirimci firma ünvanını almak için yardımcı fonksiyon
async function getBildirimciUnvan(tcKimlikVergiNo: string): Promise<string> {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/hks/genel/hal-ici-isyeri`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ tcKimlikVergiNo })
    });
    
    const data = await response.json();
    if (data.ok && data.items && data.items.length > 0) {
      return data.items[0].ad || '';
    }
    return '';
  } catch (error) {
    console.error('Bildirimci ünvan alınamadı:', error);
    return '';
  }
}

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
