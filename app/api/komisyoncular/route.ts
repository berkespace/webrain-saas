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
    const { dukkanAdi, sehir, komisyonNo, vkn, yetkiliAdi, yetkiliTelefon } = body

    // Validasyon
    if (!dukkanAdi || !sehir || !komisyonNo) {
      return NextResponse.json(
        { error: "Dükkan adı, şehir ve komisyon no alanları zorunludur" },
        { status: 400 }
      )
    }

    // Komisyon numarası kontrolü
    if (komisyonNo) {
      // Aynı komisyon no ile kayıt var mı kontrol et
      const existingKomisyoncu = await prisma.komisyoncu.findFirst({
        where: { komisyonNo }
      })

      if (existingKomisyoncu) {
        return NextResponse.json(
          { error: "Bu komisyon no zaten kullanılıyor" },
          { status: 400 }
        )
      }
    }

    // Otomatik komisyon kodu üret
    const lastKomisyoncu = await prisma.komisyoncu.findFirst({
      orderBy: { komisyonKodu: 'desc' }
    })

    let nextKomisyonKodu = 'KOM001'
    if (lastKomisyoncu && lastKomisyoncu.komisyonKodu) {
      if (lastKomisyoncu.komisyonKodu.startsWith('KOM')) {
        const lastNumber = parseInt(lastKomisyoncu.komisyonKodu.substring(3))
        if (!isNaN(lastNumber)) {
          nextKomisyonKodu = `KOM${(lastNumber + 1).toString().padStart(3, '0')}`
        }
      }
    }

    const komisyoncu = await prisma.komisyoncu.create({
      data: {
        dukkanAdi,
        sehir,
        komisyonNo,
        komisyonKodu: nextKomisyonKodu,
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
