import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

// GET - Tüm ambalajları listele
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const search = searchParams.get('search')
    const status = searchParams.get('status')
    const tipi = searchParams.get('tipi')

    // Filtreleme koşulları
    const where: any = {}

    if (search) {
      where.OR = [
        { ad: { contains: search, mode: 'insensitive' } },
        { aciklama: { contains: search, mode: 'insensitive' } }
      ]
    }

    if (status && status !== 'all') {
      where.durum = status
    }

    if (tipi && tipi !== 'all') {
      where.tipi = tipi
    }

    const ambalajlar = await prisma.ambalaj.findMany({
      where,
      orderBy: {
        createdAt: 'desc'
      }
    })

    return NextResponse.json(ambalajlar)
  } catch (error) {
    console.error("Ambalaj listesi hatası:", error)
    return NextResponse.json(
      { error: "Ambalaj listesi alınırken hata oluştu" },
      { status: 500 }
    )
  }
}

// POST - Yeni ambalaj oluştur
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { ad, tipi, daraKg, aciklama, durum } = body

    // Validasyon
    if (!ad || !tipi || daraKg === undefined || daraKg === null) {
      return NextResponse.json(
        { error: "Ad, tipi ve dara kg alanları zorunludur" },
        { status: 400 }
      )
    }

    if (daraKg <= 0) {
      return NextResponse.json(
        { error: "Dara kg değeri 0'dan büyük olmalıdır" },
        { status: 400 }
      )
    }

    const ambalaj = await prisma.ambalaj.create({
      data: {
        ad,
        tipi,
        daraKg: parseFloat(daraKg),
        aciklama: aciklama || null,
        durum: durum || 'AKTIF'
      }
    })

    return NextResponse.json(
      { message: "Ambalaj başarıyla oluşturuldu", ambalaj },
      { status: 201 }
    )
  } catch (error) {
    console.error("Ambalaj oluşturma hatası:", error)
    return NextResponse.json(
      { error: "Ambalaj oluşturulurken hata oluştu" },
      { status: 500 }
    )
  }
}
