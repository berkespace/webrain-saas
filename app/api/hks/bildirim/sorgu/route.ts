import 'server-only';
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

import { NextRequest } from 'next/server';
import { XMLParser } from 'fast-xml-parser';
import { HKS, buildSoapEnvelope, soapAction, pickSoapResponse } from '@/app/lib/hks-soap';

export async function POST(req: NextRequest) {
  try {
    const { KunyeNo = 0, BaslangicTarihi, BitisTarihi, KalanMiktariSifirdanBuyukOlanlar = true } = await req.json();

    const method = 'BildirimSorgulama'; // WSDL'deki GERÇEK operasyon adıyla eşleşmeli
    const payload = {
      Istek: {
        KunyeTuru: 1,
        KunyeNo,
        BaslangicTarihi,
        BitisTarihi,
        KalanMiktariSifirdanBuyukOlanlar
      }
    };

    const envelope = buildSoapEnvelope(method, payload);

    const res = await fetch(HKS.bildirimUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'text/xml; charset=utf-8',
        'SOAPAction': soapAction('IBildirimService', method),
      },
      body: envelope,
    });

    const raw = await res.text();
    if (!res.ok) return Response.json({ ok:false, status:res.status, raw: raw.slice(0,2000) }, { status: 500 });

    const parser = new XMLParser({ ignoreAttributes:false, attributeNamePrefix:'@_', textNodeName:'#text' });
    const parsed = parser.parse(raw);
    const resp = pickSoapResponse(parsed, method);
    const result = resp?.[`${method}Result`];

    if (String(result?.IslemKodu) !== '1') {
      return Response.json({ ok:false, islemKodu: result?.IslemKodu, hata: result?.HataKodlari ?? result?.Mesaj, raw: raw.slice(0,2000) }, { status: 500 });
    }

    const arr = result?.Bildirimler ?? [];
    const bildirimler = Array.isArray(arr) ? arr : [arr];

    const mapped = bildirimler.map((b:any, i:number) => ({
      id: String(b?.Id ?? i+1),
      kunyeNo: b?.KunyeNo ?? '',
      urunAdi: b?.UrunAdi ?? b?.MalAdi ?? '',
      urunCinsi: b?.UrunCinsi ?? '',
      miktar: b?.Miktar ?? '',
      birim: b?.Birim ?? '',
      bildirimTarihi: b?.BildirimTarihi ?? '',
      malinSahibiAdi: b?.MalinSahibiAdi ?? '',
      malinSahibiTc: b?.MalinSahibiTcKimlikNo ?? '',
      durum: b?.Durum ?? '',
    }));

    return Response.json({ ok:true, count: mapped.length, items: mapped }, { status: 200 });
  } catch (e:any) {
    return Response.json({ ok:false, error: e?.message ?? 'UNKNOWN' }, { status: 500 });
  }
}
