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

    if (status && status !== 'all') {
      where.durum = status
    }

    const ozelFirmalar = await prisma.ozelFirma.findMany({
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
    const { firmaAdi, vkn, yetkiliAdi, yetkiliTelefon, sehir, adres, durum } = body

    // Validasyon
    if (!firmaAdi || !sehir) {
      return NextResponse.json(
        { error: "Firma adı ve şehir alanları zorunludur" },
        { status: 400 }
      )
    }

    // VKN kontrolü (eğer girilmişse)
    if (vkn) {
      const existingFirma = await prisma.ozelFirma.findFirst({
        where: { vkn }
      })
      if (existingFirma) {
        return NextResponse.json(
          { error: "Bu VKN numarası zaten kayıtlı" },
          { status: 400 }
        )
      }
    }

    const ozelFirma = await prisma.ozelFirma.create({
      data: {
        firmaAdi,
        vkn: vkn || null,
        yetkiliAdi: yetkiliAdi || null,
        yetkiliTelefon: yetkiliTelefon || null,
        sehir,
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
