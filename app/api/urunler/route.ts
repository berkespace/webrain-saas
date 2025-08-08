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

    if (status && status !== 'all') {
      where.durum = status
    }

    if (kategori && kategori !== 'all') {
      where.kategori = kategori
    }

    const urunler = await prisma.urun.findMany({
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

    const urun = await prisma.urun.create({
      data: {
        ad,
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
