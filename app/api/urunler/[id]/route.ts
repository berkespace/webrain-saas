import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

// GET - Tekil ürün getir
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  try {
    const urun = await prisma.urunler.findUnique({
      where: { id }
    })

    if (!urun) {
      return NextResponse.json(
        { error: "Ürün bulunamadı" },
        { status: 404 }
      )
    }

    return NextResponse.json(urun)
  } catch (error) {
    console.error("Ürün getirme hatası:", error)
    return NextResponse.json(
      { error: "Ürün getirilirken hata oluştu" },
      { status: 500 }
    )
  }
}

// PUT - Ürün güncelle
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
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

    const urun = await prisma.urunler.update({
      where: { id },
      data: {
        ad,
        kategori: kategori || null,
        birim,
        durum: durum || 'AKTIF'
      }
    })

    return NextResponse.json(urun)
  } catch (error) {
    console.error("Ürün güncelleme hatası:", error)
    return NextResponse.json(
      { error: "Ürün güncellenirken hata oluştu" },
      { status: 500 }
    )
  }
}

// DELETE - Ürün sil
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  try {
    // Ürünün mal kabul kayıtlarında kullanılıp kullanılmadığını kontrol et
    const malKabulCount = await prisma.mal_kabul_records.count({
      where: { urunId: id }
    })

    if (malKabulCount > 0) {
      return NextResponse.json(
        { error: "Bu ürün mal kabul kayıtlarında kullanıldığı için silinemez" },
        { status: 400 }
      )
    }

    await prisma.urunler.delete({
      where: { id }
    })

    return NextResponse.json(
      { message: "Ürün başarıyla silindi" },
      { status: 200 }
    )
  } catch (error) {
    console.error("Ürün silme hatası:", error)
    return NextResponse.json(
      { error: "Ürün silinirken hata oluştu" },
      { status: 500 }
    )
  }
}
