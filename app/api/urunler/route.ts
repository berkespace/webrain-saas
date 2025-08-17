import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

// GET - Tüm ürünleri listele
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const search = searchParams.get('search')
    const status = searchParams.get('status')
    const kategori = searchParams.get('kategori')

    // Filtreleme koşulları
    const where: any = {}

    if (search) {
      where.OR = [
        { ad: { contains: search, mode: 'insensitive' } },
        { kategori: { contains: search, mode: 'insensitive' } }
      ]
    }

    // Status filtresi geçici olarak devre dışı
    // if (status && status !== 'all') {
    //   where.durum = status
    // }

    if (kategori && kategori !== 'all') {
      where.kategori = kategori
    }

    const urunler = await prisma.urunler.findMany({
      where,
      orderBy: {
        ad: 'asc'
      }
    })

    return NextResponse.json(urunler)
  } catch (error) {
    console.error("Ürün listesi hatası:", error)
    return NextResponse.json(
      { error: "Ürün listesi alınırken hata oluştu" },
      { status: 500 }
    )
  }
}

// POST - Yeni ürün oluştur
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { ad, kategori, birim, durum } = body

    // Validasyon
    if (!ad || !birim) {
      return NextResponse.json(
        { error: "Ad ve birim alanları zorunludur" },
        { status: 400 }
      )
    }

    // Son ürünü bul ve stok kodunu üret
    const lastUrun = await prisma.urunler.findFirst({
      orderBy: { stokKodu: 'desc' }
    })

    console.log('🔍 Son ürün:', lastUrun)
    console.log('🔍 Son ürün stokKodu:', lastUrun?.stokKodu)

    let nextStokKodu = 'URN001'
    if (lastUrun && lastUrun.stokKodu) {
      // URN*** format kontrolü
      if (lastUrun.stokKodu.startsWith('URN')) {
        const lastNumber = parseInt(lastUrun.stokKodu.substring(3))
        if (!isNaN(lastNumber)) {
          console.log('🔍 Son numara:', lastNumber)
          console.log('🔍 Son numara + 1:', lastNumber + 1)
          nextStokKodu = `URN${(lastNumber + 1).toString().padStart(3, '0')}`
        } else {
          console.log('🔍 Eski format tespit edildi, yeni format kullanılıyor')
          nextStokKodu = 'URN001'
        }
      } else {
        console.log('🔍 Eski format tespit edildi, yeni format kullanılıyor')
        nextStokKodu = 'URN001'
      }
    }

    console.log('🔍 Üretilen stok kodu:', nextStokKodu)

    const urun = await prisma.urunler.create({
      data: {
        ad,
        stokKodu: nextStokKodu,
        kategori: kategori || null,
        birim,
        durum: durum || 'AKTIF'
      }
    })

    return NextResponse.json(
      { message: "Ürün başarıyla oluşturuldu", urun },
      { status: 201 }
    )
  } catch (error) {
    console.error("Ürün oluşturma hatası:", error)
    return NextResponse.json(
      { error: "Ürün oluşturulurken hata oluştu" },
      { status: 500 }
    )
  }
}
