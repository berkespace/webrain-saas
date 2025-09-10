import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

function startOfDay(d = new Date()) {
  const x = new Date(d)
  x.setHours(0,0,0,0)
  return x
}

function endOfDay(d = new Date()) {
  const x = new Date(d)
  x.setHours(23,59,59,999)
  return x
}

function daysAgo(n: number) {
  const d = new Date()
  d.setDate(d.getDate() - n)
  return d
}

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session?.user || (session.user as any).role !== 'ADMIN') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const todayStart = startOfDay()
  const todayEnd = endOfDay()

  const last7Start = startOfDay(daysAgo(6))
  const prev7Start = startOfDay(daysAgo(13))
  const prev7End = endOfDay(daysAgo(7))

  const last30Start = startOfDay(daysAgo(29))

  // Today net kg from mal_kabul_records
  const todayNet = await prisma.mal_kabul_records.aggregate({
    _sum: { netKg: true },
    where: { tarih: { gte: todayStart, lte: todayEnd } },
  })

  // Today amount from cari_hesaplar (herseyDahilTutar)
  const todayAmount = await prisma.cari_hesaplar.aggregate({
    _sum: { herseyDahilTutar: true },
    where: { alisTarihi: { gte: todayStart, lte: todayEnd } },
  })

  // Average price (TRY per unit) overall for 1d/7d/30d using cari_hesaplar
  async function avgPrice(rangeStart: Date, rangeEnd: Date) {
    const agg = await prisma.cari_hesaplar.aggregate({
      _sum: { herseyDahilTutar: true, toplamAlisMiktari: true },
      where: { alisTarihi: { gte: rangeStart, lte: rangeEnd } },
    })
    const sumAmt = agg._sum.herseyDahilTutar ?? 0
    const sumQty = agg._sum.toplamAlisMiktari ?? 0
    return sumQty > 0 ? sumAmt / sumQty : 0
  }

  const avgDaily = await avgPrice(todayStart, todayEnd)
  const avgWeekly = await avgPrice(last7Start, todayEnd)
  const avgMonthly = await avgPrice(last30Start, todayEnd)

  // Weekly comparison (amount)
  const last7 = await prisma.cari_hesaplar.aggregate({
    _sum: { herseyDahilTutar: true },
    where: { alisTarihi: { gte: last7Start, lte: todayEnd } },
  })
  const prev7 = await prisma.cari_hesaplar.aggregate({
    _sum: { herseyDahilTutar: true },
    where: { alisTarihi: { gte: prev7Start, lte: prev7End } },
  })

  const last7Amt = last7._sum.herseyDahilTutar ?? 0
  const prev7Amt = prev7._sum.herseyDahilTutar ?? 0
  const weeklyChange = prev7Amt === 0 ? null : ((last7Amt - prev7Amt) / prev7Amt)

  // Aging: cariBakiyesi by satici where age>40 days
  const fortyDaysAgo = startOfDay(daysAgo(40))
  const aging = await prisma.cari_hesaplar.groupBy({
    by: ['saticiId', 'saticiAdi'],
    _sum: { cariBakiyesi: true },
    where: {
      alisTarihi: { lt: fortyDaysAgo },
      cariBakiyesi: { gt: 0 },
    },
  })

  return NextResponse.json({
    today: {
      totalNetKg: todayNet._sum.netKg ?? 0,
      totalAmount: todayAmount._sum.herseyDahilTutar ?? 0,
    },
    averages: {
      daily: avgDaily,
      weekly: avgWeekly,
      monthly: avgMonthly,
    },
    weeklyComparison: {
      last7Amount: last7Amt,
      prev7Amount: prev7Amt,
      changeRatio: weeklyChange,
    },
    agingOver40Days: aging.map(a => ({
      saticiId: a.saticiId,
      saticiAdi: (a as any).saticiAdi,
      totalOutstanding: a._sum.cariBakiyesi ?? 0,
    })),
  })
}


