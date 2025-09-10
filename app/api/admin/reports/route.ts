import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

function startOfDay(d = new Date()) { const x = new Date(d); x.setHours(0,0,0,0); return x }
function daysAgo(n: number) { const d = new Date(); d.setDate(d.getDate()-n); return d }

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session?.user || (session.user as any).role !== 'ADMIN') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const now = new Date()
  const d7 = startOfDay(daysAgo(6))
  const d14s = startOfDay(daysAgo(13))
  const d8e = startOfDay(daysAgo(7))
  const d30 = startOfDay(daysAgo(29))

  // 1) Ürün fiyat trendi (günlük/haftalık) + yüzde değişim
  const last30 = await prisma.cari_hesaplar.findMany({
    where: { alisTarihi: { gte: d30 } },
    select: { alisTarihi: true, herseyDahilTutar: true, toplamAlisMiktari: true, malKabulRecordId: true },
  })
  const mkIds = Array.from(new Set(last30.map(r => r.malKabulRecordId)))
  const mkRecords = mkIds.length ? await prisma.mal_kabul_records.findMany({
    where: { id: { in: mkIds } },
    select: { id: true, urunId: true }
  }) : []
  const urunIds = Array.from(new Set(mkRecords.map(m => m.urunId)))
  const urunler = urunIds.length ? await prisma.urunler.findMany({ where: { id: { in: urunIds } }, select: { id: true, ad: true } }) : []
  const urunNameById = Object.fromEntries(urunler.map(u => [u.id, u.ad]))
  const urunIdByMk = Object.fromEntries(mkRecords.map(m => [m.id, m.urunId]))

  // daily avg per product
  const perProductPerDay = new Map<string, Map<string, { amt: number, qty: number }>>()
  for (const r of last30) {
    const urunId = urunIdByMk[r.malKabulRecordId]
    if (!urunId) continue
    const dayKey = startOfDay(new Date(r.alisTarihi as any)).toISOString().slice(0,10)
    if (!perProductPerDay.has(urunId)) perProductPerDay.set(urunId, new Map())
    const m = perProductPerDay.get(urunId)!
    const prev = m.get(dayKey) || { amt: 0, qty: 0 }
    prev.amt += r.herseyDahilTutar
    prev.qty += r.toplamAlisMiktari
    m.set(dayKey, prev)
  }
  const priceTrend = Array.from(perProductPerDay.entries()).map(([urunId, mp]) => ({
    urunId,
    urun: urunNameById[urunId] || urunId,
    days: Array.from(mp.entries()).sort(([a],[b]) => a.localeCompare(b)).map(([day, v]) => ({ day, avgPrice: v.qty>0? v.amt/v.qty : 0 }))
  }))

  // weekly change overall (all products)
  const sumRange = (from: Date, to: Date) => {
    let amt = 0, qty = 0
    for (const r of last30) {
      const t = new Date(r.alisTarihi)
      if (t >= from && t <= to) { amt += r.herseyDahilTutar; qty += r.toplamAlisMiktari }
    }
    return { avg: qty>0? amt/qty:0 }
  }
  const last7 = sumRange(d7, now)
  const prev7 = sumRange(d14s, d8e)
  const weeklyPriceChange = prev7.avg === 0 ? null : ((last7.avg - prev7.avg)/prev7.avg)

  // 2) Tedarikçi kırılımı (hacim ve ortalama fiyat) son 30 gün
  const supplierAgg = await prisma.cari_hesaplar.groupBy({
    by: ['saticiId','saticiAdi'],
    _sum: { herseyDahilTutar: true, toplamAlisMiktari: true },
    where: { alisTarihi: { gte: d30 } },
  })
  const suppliers = supplierAgg.map(s => ({
    saticiId: s.saticiId,
    saticiAdi: (s as any).saticiAdi,
    toplamHacim: s._sum.toplamAlisMiktari ?? 0,
    ortFiyat: (s._sum.toplamAlisMiktari ?? 0) > 0 ? (s._sum.herseyDahilTutar ?? 0)/(s._sum.toplamAlisMiktari ?? 0) : 0,
    toplamTutar: s._sum.herseyDahilTutar ?? 0,
  }))

  // 3) Cari yaşlandırma (bucket)
  const allOutstanding = await prisma.cari_hesaplar.findMany({
    where: { cariBakiyesi: { gt: 0 } },
    select: { saticiId: true, saticiAdi: true, alisTarihi: true, cariBakiyesi: true }
  })
  const buckets = { b0_30: 0, b31_60: 0, b61_90: 0, b90p: 0 }
  const details: any[] = []
  for (const r of allOutstanding) {
    const days = Math.floor((now.getTime() - new Date(r.alisTarihi).getTime()) / (1000*60*60*24))
    let bucket: keyof typeof buckets = 'b0_30'
    if (days<=30) bucket='b0_30'; else if (days<=60) bucket='b31_60'; else if (days<=90) bucket='b61_90'; else bucket='b90p'
    buckets[bucket] += r.cariBakiyesi
    details.push({ saticiAdi: r.saticiAdi, days, bakiye: r.cariBakiyesi, bucket })
  }

  // 4) Fire/çıkma oranı en yüksek 10 ürün (son 30 gün)
  const mkLast30 = await prisma.mal_kabul_records.findMany({
    where: { tarih: { gte: d30 } },
    select: { urunId: true, girisKg: true, fireKg: true, cikmaKg: true }
  })
  const byProductWaste = new Map<string, { in:number, waste:number }>()
  for (const r of mkLast30) {
    const k = r.urunId
    const v = byProductWaste.get(k) || { in:0, waste:0 }
    v.in += r.girisKg || 0
    v.waste += (r.fireKg || 0) + (r.cikmaKg || 0)
    byProductWaste.set(k, v)
  }
  const wasteTop = Array.from(byProductWaste.entries()).map(([urunId, v]) => ({
    urunId,
    urun: urunNameById[urunId] || urunId,
    oran: v.in>0 ? v.waste / v.in : 0,
    giris: v.in,
    atik: v.waste,
  })).sort((a,b)=>b.oran-a.oran).slice(0,10)

  // 5) Fatura onay döngüsü metrikleri
  const approvals = await prisma.mal_kabul_records.findMany({
    where: { onayDurumu: 'ONAYLANDI', onayTarihi: { not: null }, fiyatGirilmeTarihi: { not: null } },
    select: { onayTarihi: true, fiyatGirilmeTarihi: true }
  })
  let totalMs = 0; for (const a of approvals) totalMs += (new Date(a.onayTarihi as any).getTime() - new Date(a.fiyatGirilmeTarihi as any).getTime())
  const approvalAvgHours = approvals.length ? (totalMs/approvals.length)/(1000*60*60) : 0

  return NextResponse.json({
    priceTrend: { products: priceTrend, weeklyPriceChange },
    suppliers,
    aging: { buckets, details },
    wasteTop,
    approvalCycle: { approvalAvgHours }
  })
}


