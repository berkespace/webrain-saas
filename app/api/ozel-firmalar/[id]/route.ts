import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

// GET - Tek bir özel firmayı getir
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    const ozelFirma = await prisma.ozelFirma.findUnique({
      where: { id },
      include: {
        malKabulRecords: {
          select: {
            id: true,
            fisNo: true,
            tarih: true,
            miktar: true,
            status: true
          },
          orderBy: {
            tarih: 'desc'
          },
          take: 10
        }
      }
    })

    if (!ozelFirma) {
      return NextResponse.json(
        { error: "Özel firma bulunamadı" },
        { status: 404 }
      )
    }

    return NextResponse.json(ozelFirma)
  } catch (error) {
    console.error("Özel firma getirme hatası:", error)
    return NextResponse.json(
      { error: "Özel firma getirilirken hata oluştu" },
      { status: 500 }
    )
  }
}

// PUT - Özel firma güncelle
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()
    const { firmaAdi, vkn, vergiDairesi, yetkiliAdi, yetkiliTelefon, sehir, adres, durum } = body

    // Özel firmanın var olup olmadığını kontrol et
    const existingFirma = await prisma.ozelFirma.findUnique({
      where: { id }
    })

    if (!existingFirma) {
      return NextResponse.json(
        { error: "Özel firma bulunamadı" },
        { status: 404 }
      )
    }

    // Validasyon
    if (!firmaAdi || !sehir) {
      return NextResponse.json(
        { error: "Firma adı ve şehir alanları zorunludur" },
        { status: 400 }
      )
    }

    // VKN kontrolü (eğer girilmişse ve değişmişse)
    if (vkn && vkn !== existingFirma.vkn) {
      const duplicateFirma = await prisma.ozelFirma.findFirst({
        where: { 
          vkn,
          id: { not: id }
        }
      })
      if (duplicateFirma) {
        return NextResponse.json(
          { error: "Bu VKN numarası zaten kayıtlı" },
          { status: 400 }
        )
      }
    }

    const updatedFirma = await prisma.ozelFirma.update({
      where: { id },
      data: {
        firmaAdi,
        vkn: vkn || null,
        vergiDairesi: vergiDairesi || null,
        yetkiliAdi: yetkiliAdi || null,
        yetkiliTelefon: yetkiliTelefon || null,
        sehir,
        adres: adres || null,
        durum: durum || 'AKTIF'
      }
    })

    return NextResponse.json(
      { message: "Özel firma başarıyla güncellendi", ozelFirma: updatedFirma }
    )
  } catch (error) {
    console.error("Özel firma güncelleme hatası:", error)
    return NextResponse.json(
      { error: "Özel firma güncellenirken hata oluştu" },
      { status: 500 }
    )
  }
}

// DELETE - Özel firma sil
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    // Özel firmanın var olup olmadığını kontrol et
    const existingFirma = await prisma.ozelFirma.findUnique({
      where: { id },
      include: {
        malKabulRecords: {
          select: { id: true }
        }
      }
    })

    if (!existingFirma) {
      return NextResponse.json(
        { error: "Özel firma bulunamadı" },
        { status: 404 }
      )
    }

    // Özel firmanın mal kabul kayıtları varsa silmeyi engelle
    if (existingFirma.malKabulRecords.length > 0) {
      return NextResponse.json(
        { error: "Bu özel firmanın mal kabul kayıtları bulunduğu için silinemez" },
        { status: 400 }
      )
    }

    await prisma.ozelFirma.delete({
      where: { id }
    })

    return NextResponse.json(
      { message: "Özel firma başarıyla silindi" }
    )
  } catch (error) {
    console.error("Özel firma silme hatası:", error)
    return NextResponse.json(
      { error: "Özel firma silinirken hata oluştu" },
      { status: 500 }
    )
  }
}
