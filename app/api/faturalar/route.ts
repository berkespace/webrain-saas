import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { searchParams } = new URL(req.url)
  const search = searchParams.get('search') || ''
  const start = searchParams.get('start')
  const end = searchParams.get('end')
  const satici = searchParams.get('satici')
  const urun = searchParams.get('urun')

  const where: any = {}
  if (start || end) where.alisTarihi = { gte: start ? new Date(start) : undefined, lte: end ? new Date(end) : undefined }
  if (satici) where.saticiAdi = { contains: satici, mode: 'insensitive' }

  const cari = await prisma.cari_hesaplar.findMany({
    where,
    orderBy: { alisTarihi: 'desc' },
  })

  // ürün isimleri ve kayıt bilgileri
  const mkIds = cari.map(c => c.malKabulRecordId)
  const mk = await prisma.mal_kabul_records.findMany({
    where: { id: { in: mkIds } },
    select: { id: true, fisNo: true, urunId: true, onaylayanKullanici: true, onayTarihi: true, faturaSeriNo: true, faturaTarihi: true }
  })
  const urunIds = Array.from(new Set(mk.map(m => m.urunId)))
  const urunler = await prisma.urunler.findMany({ where: { id: { in: urunIds } }, select: { id: true, ad: true } })
  const users = await prisma.users.findMany({ select: { id: true, firstName: true, lastName: true } })

  const urunAd: Record<string,string> = Object.fromEntries(urunler.map(u=>[u.id,u.ad]))
  const userName: Record<string,string> = Object.fromEntries(users.map(u=>[u.id, `${u.firstName} ${u.lastName}`]))
  const mkById: Record<string, any> = Object.fromEntries(mk.map(m=>[m.id, m]))

  const rows = cari
    .filter(c => !urun || (urunAd[ mkById[c.malKabulRecordId]?.urunId ]||'').toLowerCase().includes(urun.toLowerCase()))
    .map(c => ({
      id: c.id,
      fisNo: c.fisNo,
      alisTarihi: c.alisTarihi,
      saticiAdi: c.saticiAdi,
      urun: urunAd[ mkById[c.malKabulRecordId]?.urunId ] || '-',
      netMiktar: c.toplamAlisMiktari,
      birimFiyat: c.birimFiyat,
      kdvHaricTutar: c.kdvHaricTutar,
      herseyDahilTutar: c.herseyDahilTutar,
      onaylayan: userName[ mkById[c.malKabulRecordId]?.onaylayanKullanici || '' ] || '-',
      onayTarihi: mkById[c.malKabulRecordId]?.onayTarihi || null,
      faturaSeriNo: mkById[c.malKabulRecordId]?.faturaSeriNo || '-',
      faturaTarihi: mkById[c.malKabulRecordId]?.faturaTarihi || null,
      malKabulRecordId: c.malKabulRecordId,
    }))

  return NextResponse.json({ rows })
}


