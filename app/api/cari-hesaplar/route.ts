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
    const limit = parseInt(searchParams.get('limit') || '1000')
    const offset = parseInt(searchParams.get('offset') || '0')

    // Cari hesapları al
    const records = await prisma.cari_hesaplar.findMany({
      take: limit,
      skip: offset,
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

    return NextResponse.json({
      success: true,
      records: records,
      total: records.length
    })

  } catch (error) {
    console.error('Cari hesaplar fetch hatası:', error)
    return NextResponse.json(
      { error: 'Cari hesaplar alınamadı' },
      { status: 500 }
    )
  }
}
