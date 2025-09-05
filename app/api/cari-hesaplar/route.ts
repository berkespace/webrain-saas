import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Kullanıcının rolünü kontrol et
    if (!['MUHASEBECI', 'MUHASEBE', 'SATIN_ALMACI', 'ADMIN'].includes(session.user.role)) {
      return NextResponse.json({ error: 'Bu işlem için yetkiniz yok' }, { status: 403 })
    }

    const { searchParams } = new URL(request.url)
    const action = searchParams.get('action')
    const saticiId = searchParams.get('saticiId')

    // Satıcıları getir
    if (action === 'saticilar') {
      // Cari hesaplarda bulunan tüm satıcıları al
      const saticilar = await prisma.cari_hesaplar.findMany({
        distinct: ['saticiId'],
        select: {
          saticiId: true,
          saticiAdi: true,
          saticiTipi: true
        }
      })

      const saticiOptions = saticilar.map(satici => ({
        id: satici.saticiId,
        name: satici.saticiAdi,
        type: satici.saticiTipi
      }))

      return NextResponse.json({
        success: true,
        saticilar: saticiOptions
      })
    }

    // Belirli bir satıcının cari hesaplarını getir
    if (saticiId) {
      const records = await prisma.cari_hesaplar.findMany({
        where: {
          saticiId: saticiId
        },
        orderBy: {
          alisTarihi: 'desc'
        },
        include: {
          malKabulRecord: {
            include: {
              urunler: true,
              users: true,
              komisyoncular: true,
              ureticiler: true,
              mustahsil: true,
              ozel_firmalar: true
            }
          }
        }
      })

      // faturaSeriNo'yu mal_kabul_records'dan ana objeye taşı
      const formattedRecords = records.map(record => ({
        ...record,
        faturaSeriNo: record.malKabulRecord.faturaSeriNo
      }))

      return NextResponse.json({
        success: true,
        records: formattedRecords
      })
    }

    // Hiçbir parametre yoksa boş döndür
    return NextResponse.json({
      success: true,
      records: []
    })

  } catch (error) {
    console.error('Cari hesaplar fetch hatası:', error)
    return NextResponse.json(
      { error: 'Cari hesaplar alınamadı' },
      { status: 500 }
    )
  }
}
