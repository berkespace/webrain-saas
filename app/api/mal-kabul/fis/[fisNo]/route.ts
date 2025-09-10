import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET(
  req: NextRequest,
  { params }: { params: { fisNo: string } }
) {
  const session = await getServerSession(authOptions)
  if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { fisNo } = params

  try {
    const record = await prisma.mal_kabul_records.findFirst({
      where: { fisNo },
      include: {
        urunler: { select: { ad: true, birim: true } },
        satici: { select: { ad: true } },
        onaylayanKullanici: { select: { firstName: true, lastName: true } }
      }
    })

    if (!record) {
      return NextResponse.json({ error: 'Fiş bulunamadı' }, { status: 404 })
    }

    const cariHesap = await prisma.cari_hesaplar.findFirst({
      where: { malKabulRecordId: record.id }
    })

    const result = {
      fisNo: record.fisNo,
      createdAt: record.createdAt,
      saticiAdi: record.satici?.ad || '-',
      urunAd: record.urunler?.ad || '-',
      birim: record.urunler?.birim || '-',
      netMiktar: record.netMiktar || 0,
      birimFiyat: cariHesap?.birimFiyat || 0,
      kdvHaricTutar: cariHesap?.kdvHaricTutar || 0,
      herseyDahilTutar: cariHesap?.herseyDahilTutar || 0,
      faturaSeriNo: record.faturaSeriNo,
      faturaTarihi: record.faturaTarihi,
      faturaYontemi: record.faturaYontemi,
      onaylayan: record.onaylayanKullanici ? 
        `${record.onaylayanKullanici.firstName} ${record.onaylayanKullanici.lastName}` : '-'
    }

    return NextResponse.json(result)
  } catch (error) {
    console.error('Fiş detayı getirme hatası:', error)
    return NextResponse.json({ error: 'Sunucu hatası' }, { status: 500 })
  }
}
