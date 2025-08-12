import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

// GET - Tekil komisyoncu getir
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const komisyoncu = await prisma.komisyoncu.findUnique({
      where: { id: params.id },
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
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()
    const { dukkanAdi, sehir, komisyonNo, komisyonKodu, vkn, yetkiliAdi, yetkiliTelefon, durum } = body

    // Validasyon
    if (!dukkanAdi || !sehir || !komisyonNo || !komisyonKodu) {
      return NextResponse.json(
        { error: "Dükkan adı, şehir, komisyon no ve komisyon kodu alanları zorunludur" },
        { status: 400 }
      )
    }

    const komisyoncu = await prisma.komisyoncu.update({
      where: { id: params.id },
      data: {
        dukkanAdi,
        sehir,
        komisyonNo,
        komisyonKodu,
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
  { params }: { params: { id: string } }
) {
  try {
    // Komisyoncuya bağlı üreticileri kontrol et
    const ureticiCount = await prisma.uretici.count({
      where: { komisyoncuId: params.id }
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
    const malKabulCount = await prisma.malKabulRecord.count({
      where: { komisyoncuId: params.id }
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

    await prisma.komisyoncu.delete({
      where: { id: params.id }
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
