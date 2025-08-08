import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

// GET - Tek bir ambalajı getir
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params

    const ambalaj = await prisma.ambalaj.findUnique({
      where: { id },
      include: {
        malKabulRecords: {
          select: {
            id: true,
            fisNo: true,
            tarih: true,
            brutKg: true,
            netKg: true,
            status: true
          },
          orderBy: {
            tarih: 'desc'
          },
          take: 10
        }
      }
    })

    if (!ambalaj) {
      return NextResponse.json(
        { error: "Ambalaj bulunamadı" },
        { status: 404 }
      )
    }

    return NextResponse.json(ambalaj)
  } catch (error) {
    console.error("Ambalaj getirme hatası:", error)
    return NextResponse.json(
      { error: "Ambalaj getirilirken hata oluştu" },
      { status: 500 }
    )
  }
}

// PUT - Ambalaj güncelle
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params
    const body = await request.json()
    const { ad, tipi, daraKg, aciklama, durum } = body

    // Ambalajın var olup olmadığını kontrol et
    const existingAmbalaj = await prisma.ambalaj.findUnique({
      where: { id }
    })

    if (!existingAmbalaj) {
      return NextResponse.json(
        { error: "Ambalaj bulunamadı" },
        { status: 404 }
      )
    }

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

    const updatedAmbalaj = await prisma.ambalaj.update({
      where: { id },
      data: {
        ad,
        tipi,
        daraKg: parseFloat(daraKg),
        aciklama: aciklama || null,
        durum: durum || 'AKTIF'
      }
    })

    return NextResponse.json(
      { message: "Ambalaj başarıyla güncellendi", ambalaj: updatedAmbalaj }
    )
  } catch (error) {
    console.error("Ambalaj güncelleme hatası:", error)
    return NextResponse.json(
      { error: "Ambalaj güncellenirken hata oluştu" },
      { status: 500 }
    )
  }
}

// DELETE - Ambalaj sil
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params

    // Ambalajın var olup olmadığını kontrol et
    const existingAmbalaj = await prisma.ambalaj.findUnique({
      where: { id },
      include: {
        malKabulRecords: {
          select: { id: true }
        }
      }
    })

    if (!existingAmbalaj) {
      return NextResponse.json(
        { error: "Ambalaj bulunamadı" },
        { status: 404 }
      )
    }

    // Ambalajın mal kabul kayıtları varsa silmeyi engelle
    if (existingAmbalaj.malKabulRecords.length > 0) {
      return NextResponse.json(
        { error: "Bu ambalajın mal kabul kayıtları bulunduğu için silinemez" },
        { status: 400 }
      )
    }

    await prisma.ambalaj.delete({
      where: { id }
    })

    return NextResponse.json(
      { message: "Ambalaj başarıyla silindi" }
    )
  } catch (error) {
    console.error("Ambalaj silme hatası:", error)
    return NextResponse.json(
      { error: "Ambalaj silinirken hata oluştu" },
      { status: 500 }
    )
  }
}
