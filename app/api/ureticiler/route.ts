import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

// GET - Tüm üreticileri listele
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const search = searchParams.get('search')
    const status = searchParams.get('status')
    const cinsiyet = searchParams.get('cinsiyet')
    const komisyoncuId = searchParams.get('komisyoncuId')

    // Filtreleme koşulları
    const where: any = {}

    if (search) {
      where.OR = [
        { ad: { contains: search, mode: 'insensitive' } },
        { soyad: { contains: search, mode: 'insensitive' } },
        { tcNo: { contains: search } },
        { sehir: { contains: search, mode: 'insensitive' } }
      ]
    }

    if (status && status !== 'all') {
      where.durum = status
    }

    if (cinsiyet && cinsiyet !== 'all') {
      where.cinsiyet = cinsiyet
    }

    if (komisyoncuId && komisyoncuId !== 'all') {
      where.komisyoncuId = komisyoncuId
    }

    const ureticiler = await prisma.uretici.findMany({
      where,
      include: {
        komisyoncu: {
          select: {
            id: true,
            dukkanAdi: true,
            sehir: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    return NextResponse.json(ureticiler)
  } catch (error) {
    console.error("Üretici listesi hatası:", error)
    return NextResponse.json(
      { error: "Üretici listesi alınırken hata oluştu" },
      { status: 500 }
    )
  }
}

// POST - Yeni üretici oluştur
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { ad, soyad, tcNo, dogumTarihi, iletisim, sehir, cinsiyet, durum, komisyoncuId, notlar } = body

    // Validasyon
    if (!ad || !soyad || !sehir || !cinsiyet) {
      return NextResponse.json(
        { error: "Ad, soyad, şehir ve cinsiyet alanları zorunludur" },
        { status: 400 }
      )
    }

    // T.C. No kontrolü (eğer girilmişse)
    if (tcNo) {
      const existingUretici = await prisma.uretici.findFirst({
        where: { tcNo }
      })
      if (existingUretici) {
        return NextResponse.json(
          { error: "Bu T.C. kimlik numarası zaten kayıtlı" },
          { status: 400 }
        )
      }
    }

    // Komisyoncu kontrolü (eğer seçilmişse)
    if (komisyoncuId) {
      const komisyoncu = await prisma.komisyoncu.findUnique({
        where: { id: komisyoncuId }
      })
      if (!komisyoncu) {
        return NextResponse.json(
          { error: "Seçilen komisyoncu bulunamadı" },
          { status: 400 }
        )
      }
    }

    const uretici = await prisma.uretici.create({
      data: {
        ad,
        soyad,
        tcNo: tcNo || null,
        dogumTarihi: dogumTarihi ? new Date(dogumTarihi) : null,
        iletisim: iletisim || null,
        sehir,
        cinsiyet,
        durum: durum || 'AKTIF',
        komisyoncuId: komisyoncuId || null
      },
      include: {
        komisyoncu: {
          select: {
            id: true,
            dukkanAdi: true,
            sehir: true
          }
        }
      }
    })

    return NextResponse.json(
      { message: "Üretici başarıyla oluşturuldu", uretici },
      { status: 201 }
    )
  } catch (error) {
    console.error("Üretici oluşturma hatası:", error)
    return NextResponse.json(
      { error: "Üretici oluşturulurken hata oluştu" },
      { status: 500 }
    )
  }
}
