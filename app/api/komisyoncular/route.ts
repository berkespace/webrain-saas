import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

// GET - Tüm komisyoncuları listele
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const search = searchParams.get('search')
    const status = searchParams.get('status')

    // Filtreleme koşulları
    const where: any = {}

    if (search) {
      where.OR = [
        { dukkanAdi: { contains: search, mode: 'insensitive' } },
        { sehir: { contains: search, mode: 'insensitive' } },
        { komisyonNo: { contains: search } },
        { komisyonKodu: { contains: search, mode: 'insensitive' } }
      ]
    }

    if (status && status !== 'all') {
      where.durum = status
    }

    const komisyoncular = await prisma.komisyoncu.findMany({
      where,
      orderBy: {
        createdAt: 'desc'
      }
    })

    return NextResponse.json(komisyoncular)
  } catch (error) {
    console.error("Komisyoncu listesi hatası:", error)
    return NextResponse.json(
      { error: "Komisyoncu listesi alınırken hata oluştu" },
      { status: 500 }
    )
  }
}

// POST - Yeni komisyoncu oluştur
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { dukkanAdi, sehir, komisyonNo, komisyonKodu, vkn, yetkiliAdi, yetkiliTelefon } = body

    // Validasyon
    if (!dukkanAdi || !sehir || !komisyonNo || !komisyonKodu) {
      return NextResponse.json(
        { error: "Dükkan adı, şehir, komisyon no ve komisyon kodu alanları zorunludur" },
        { status: 400 }
      )
    }

    // Komisyon kodu ve numarası kontrolü
    if (komisyonNo && komisyonKodu) {
      // Aynı komisyon no veya kodu ile kayıt var mı kontrol et
      const existingKomisyoncu = await prisma.komisyoncu.findFirst({
        where: {
          OR: [
            { komisyonNo },
            { komisyonKodu }
          ]
        }
      })

      if (existingKomisyoncu) {
        return NextResponse.json(
          { error: "Bu komisyon no veya kodu zaten kullanılıyor" },
          { status: 400 }
        )
      }
    }

    const komisyoncu = await prisma.komisyoncu.create({
      data: {
        dukkanAdi,
        sehir,
        komisyonNo,
        komisyonKodu,
        vkn: vkn || null,
        yetkiliAdi: yetkiliAdi || null,
        yetkiliTelefon: yetkiliTelefon || null,
        durum: 'AKTIF'
      }
    })

    return NextResponse.json(
      { message: "Komisyoncu başarıyla oluşturuldu", komisyoncu },
      { status: 201 }
    )
  } catch (error) {
    console.error("Komisyoncu oluşturma hatası:", error)
    return NextResponse.json(
      { error: "Komisyoncu oluşturulurken hata oluştu" },
      { status: 500 }
    )
  }
}
