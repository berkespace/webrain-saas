import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { HksService } from '@/lib/hks-service'

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  // Sadece MUHASEBE ve ADMIN rolleri HKS modülüne erişebilir
  if (!['MUHASEBE', 'MUHASEBECI', 'ADMIN'].includes(session.user.role)) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  const { searchParams } = new URL(req.url)
  const action = searchParams.get('action')

  try {
    switch (action) {
      case 'künyeler':
      case 'kunye-listesi':
        return await getKunyeListesi(req)
      case 'künye-detay':
      case 'kunye-detay':
        return await getKunyeDetay(req)
      case 'test-bağlantı':
      case 'test-connection':
        return await testHksBaglanti()
      default:
        return NextResponse.json({ error: 'Geçersiz işlem' }, { status: 400 })
    }
  } catch (error) {
    console.error('HKS API hatası:', error)
    return NextResponse.json({ error: 'Sunucu hatası' }, { status: 500 })
  }
}

async function getKunyeListesi(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const page = parseInt(searchParams.get('page') || '1')
  const limit = parseInt(searchParams.get('limit') || '20')
  const search = searchParams.get('search') || ''

  try {
    // HKS servisinden künye listesi çek
    const hksResponse = await HksService.getKunyeListesi({
      page,
      limit,
      search
    })

    return NextResponse.json({
      success: true,
      data: hksResponse,
      pagination: {
        page,
        limit,
        total: hksResponse.total || 0
      }
    })
  } catch (error) {
    console.error('Künye listesi hatası:', error)
    return NextResponse.json({ 
      error: 'Künye listesi alınamadı',
      details: error instanceof Error ? error.message : 'Bilinmeyen hata'
    }, { status: 500 })
  }
}

async function getKunyeDetay(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const kunyeNo = searchParams.get('kunyeNo')

  if (!kunyeNo) {
    return NextResponse.json({ error: 'Künye numarası gerekli' }, { status: 400 })
  }

  try {
    // HKS servisinden künye detayını çek
    const kunyeDetay = await HksService.getKunyeDetay(kunyeNo)

    return NextResponse.json({
      success: true,
      data: kunyeDetay
    })
  } catch (error) {
    console.error('Künye detay hatası:', error)
    return NextResponse.json({ 
      error: 'Künye detayı alınamadı',
      details: error instanceof Error ? error.message : 'Bilinmeyen hata'
    }, { status: 500 })
  }
}

async function testHksBaglanti() {
  try {
    // HKS servislerine test bağlantısı
    const testResult = await HksService.testConnection()

    return NextResponse.json({
      success: true,
      message: 'HKS bağlantısı başarılı',
      data: testResult
    })
  } catch (error) {
    console.error('HKS bağlantı testi hatası:', error)
    return NextResponse.json({ 
      error: 'HKS bağlantısı başarısız',
      details: error instanceof Error ? error.message : 'Bilinmeyen hata'
    }, { status: 500 })
  }
}

