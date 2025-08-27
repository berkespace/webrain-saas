import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

// GET - Tekil komisyoncu getir
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const komisyoncu = await prisma.komisyoncular.findUnique({
      where: { id },
      include: {
        ureticiler: true
      }
    })

    if (!komisyoncu) {
      return NextResponse.json(
        { error: "Komisyoncu bulunamadı" },
        { status: 404 }
      )
    }

    return NextResponse.json(komisyoncu)
  } catch (error) {
    console.error("Komisyoncu getirme hatası:", error)
    return NextResponse.json(
      { error: "Komisyoncu getirilirken hata oluştu" },
      { status: 500 }
    )
  }
}

// PUT - Komisyoncu güncelle
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()
    const { dukkanAdi, sehir, komisyonNo, vkn, yetkiliAdi, yetkiliTelefon, durum } = body

    // Validasyon
    if (!dukkanAdi || !sehir || !komisyonNo) {
      return NextResponse.json(
        { error: "Dükkan adı, şehir ve komisyon no alanları zorunludur" },
        { status: 400 }
      )
    }

    const komisyoncu = await prisma.komisyoncular.update({
      where: { id },
      data: {
        dukkanAdi,
        sehir,
        komisyonNo,
        vkn: vkn || null,
        yetkiliAdi: yetkiliAdi || null,
        yetkiliTelefon: yetkiliTelefon || null,
        durum: durum || 'AKTIF'
      }
    })

    return NextResponse.json(komisyoncu)
  } catch (error) {
    console.error("Komisyoncu güncelleme hatası:", error)
    return NextResponse.json(
      { error: "Komisyoncu güncellenirken hata oluştu" },
      { status: 500 }
    )
  }
}

// DELETE - Komisyoncu sil
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    // Komisyoncuya bağlı üreticileri kontrol et
    const ureticiCount = await prisma.ureticiler.count({
      where: { komisyoncuId: id }
    })

    if (ureticiCount > 0) {
      return NextResponse.json(
        { 
          error: "Bu komisyoncu silinemez",
          details: `${ureticiCount} adet üreticiye bağlı. Önce üreticileri başka komisyonculara aktarın veya silin.`
        },
        { status: 400 }
      )
    }

    // Mal kabul kayıtlarını kontrol et
    const malKabulCount = await prisma.mal_kabul_records.count({
      where: { komisyoncuId: id }
    })

    if (malKabulCount > 0) {
      return NextResponse.json(
        { 
          error: "Bu komisyoncu silinemez",
          details: `${malKabulCount} adet mal kabul kaydına bağlı. Bu kayıtlar silinmeden komisyoncu silinemez.`
        },
        { status: 400 }
      )
    }

    await prisma.komisyoncular.delete({
      where: { id }
    })

    return NextResponse.json(
      { message: "Komisyoncu başarıyla silindi" },
      { status: 200 }
    )
  } catch (error) {
    console.error("Komisyoncu silme hatası:", error)
    return NextResponse.json(
      { error: "Komisyoncu silinirken hata oluştu" },
      { status: 500 }
    )
  }
}
