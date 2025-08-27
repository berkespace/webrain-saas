import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

// GET - Tüm özel firmaları listele
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const search = searchParams.get('search')
    const status = searchParams.get('status')

    // Filtreleme koşulları
    const where: any = {}

    if (search) {
      where.OR = [
        { firmaAdi: { contains: search, mode: 'insensitive' } },
        { sehir: { contains: search, mode: 'insensitive' } },
        { vkn: { contains: search } }
      ]
    }

    // Status filtresi geçici olarak devre dışı
    // if (status && status !== 'all') {
    //   where.durum = status
    // }

    const ozelFirmalar = await prisma.ozel_firmalar.findMany({
      where,
      orderBy: {
        createdAt: 'desc'
      }
    })

    return NextResponse.json(ozelFirmalar)
  } catch (error) {
    console.error("Özel firma listesi hatası:", error)
    return NextResponse.json(
      { error: "Özel firma listesi alınırken hata oluştu" },
      { status: 500 }
    )
  }
}

// POST - Yeni özel firma oluştur
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { firmaAdi, vkn, vergiDairesi, yetkiliAdi, yetkiliTelefon, sehir, adres, durum } = body

    // Validasyon
    if (!firmaAdi || !vkn || !vergiDairesi || !yetkiliAdi) {
      return NextResponse.json(
        { error: "Firma adı, VKN, vergi dairesi ve yetkili adı alanları zorunludur" },
        { status: 400 }
      )
    }

    // VKN kontrolü (VKN zorunlu olduğu için her zaman kontrol et)
    const existingFirma = await prisma.ozel_firmalar.findFirst({
      where: { vkn }
    })
    if (existingFirma) {
      return NextResponse.json(
        { error: "Bu VKN numarası zaten kayıtlı" },
        { status: 400 }
      )
    }

    // Son özel firmayı bul ve firma numarasını üret
    const lastFirma = await prisma.ozel_firmalar.findFirst({
      orderBy: { firmaNo: 'desc' }
    })

    let nextFirmaNo = 'FRM001'
    if (lastFirma && lastFirma.firmaNo) {
      if (lastFirma.firmaNo.startsWith('FRM')) {
        const lastNumber = parseInt(lastFirma.firmaNo.substring(3))
        if (!isNaN(lastNumber)) {
          nextFirmaNo = `FRM${(lastNumber + 1).toString().padStart(3, '0')}`
        }
      }
    }

    const ozelFirma = await prisma.ozel_firmalar.create({
      data: {
        id: `ozel-firma-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        firmaAdi,
        firmaNo: nextFirmaNo,
        vkn,
        vergiDairesi,
        yetkiliAdi,
        yetkiliTelefon: yetkiliTelefon || null,
        sehir: sehir || null,
        adres: adres || null,
        durum: durum || 'AKTIF'
      }
    })

    return NextResponse.json(
      { message: "Özel firma başarıyla oluşturuldu", ozelFirma },
      { status: 201 }
    )
  } catch (error) {
    console.error("Özel firma oluşturma hatası:", error)
    return NextResponse.json(
      { error: "Özel firma oluşturulurken hata oluştu" },
      { status: 500 }
    )
  }
}
