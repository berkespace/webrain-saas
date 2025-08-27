import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

// GET - Tek bir üreticiyi getir
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    const uretici = await prisma.ureticiler.findUnique({
      where: { id },
      include: {
        komisyoncular: {
          select: {
            id: true,
            dukkanAdi: true,
            sehir: true
          }
        },
        mal_kabul_records: {
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

    if (!uretici) {
      return NextResponse.json(
        { error: "Üretici bulunamadı" },
        { status: 404 }
      )
    }

    return NextResponse.json(uretici)
  } catch (error) {
    console.error("Üretici getirme hatası:", error)
    return NextResponse.json(
      { error: "Üretici getirilirken hata oluştu" },
      { status: 500 }
    )
  }
}

// PUT - Üretici güncelle
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()
    const { ad, soyad, tcNo, dogumTarihi, iletisim, sehir, cinsiyet, durum, komisyoncuId } = body

    // Üreticinin var olup olmadığını kontrol et
    const existingUretici = await prisma.ureticiler.findUnique({
      where: { id }
    })

    if (!existingUretici) {
      return NextResponse.json(
        { error: "Üretici bulunamadı" },
        { status: 404 }
      )
    }

    // Validasyon
    if (!ad || !soyad || !sehir || !cinsiyet) {
      return NextResponse.json(
        { error: "Ad, soyad, şehir ve cinsiyet alanları zorunludur" },
        { status: 400 }
      )
    }

    // T.C. No kontrolü (eğer girilmişse ve değişmişse)
    if (tcNo && tcNo !== existingUretici.tcNo) {
      const duplicateUretici = await prisma.ureticiler.findFirst({
        where: { 
          tcNo,
          id: { not: id }
        }
      })
      if (duplicateUretici) {
        return NextResponse.json(
          { error: "Bu T.C. kimlik numarası zaten kayıtlı" },
          { status: 400 }
        )
      }
    }

    // Komisyoncu kontrolü (eğer seçilmişse)
    if (komisyoncuId) {
      const komisyoncu = await prisma.komisyoncular.findUnique({
        where: { id: komisyoncuId }
      })
      if (!komisyoncu) {
        return NextResponse.json(
          { error: "Seçilen komisyoncu bulunamadı" },
          { status: 400 }
        )
      }
    }

    const updatedUretici = await prisma.ureticiler.update({
      where: { id },
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
          komisyoncular: {
            select: {
              id: true,
              dukkanAdi: true,
              sehir: true
            }
          }
        }
    })

    return NextResponse.json(
      { message: "Üretici başarıyla güncellendi", uretici: updatedUretici }
    )
  } catch (error) {
    console.error("Üretici güncelleme hatası:", error)
    return NextResponse.json(
      { error: "Üretici güncellenirken hata oluştu" },
      { status: 500 }
    )
  }
}

// DELETE - Üretici sil
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    // Üreticinin var olup olmadığını kontrol et
    const existingUretici = await prisma.ureticiler.findUnique({
      where: { id },
      include: {
        mal_kabul_records: {
          select: { id: true }
        }
      }
    })

    if (!existingUretici) {
      return NextResponse.json(
        { error: "Üretici bulunamadı" },
        { status: 404 }
      )
    }

    // Üreticinin mal kabul kayıtları varsa silmeyi engelle
    if (existingUretici.mal_kabul_records.length > 0) {
      return NextResponse.json(
        { error: "Bu üreticinin mal kabul kayıtları bulunduğu için silinemez" },
        { status: 400 }
      )
    }

    await prisma.ureticiler.delete({
      where: { id }
    })

    return NextResponse.json(
      { message: "Üretici başarıyla silindi" }
    )
  } catch (error) {
    console.error("Üretici silme hatası:", error)
    return NextResponse.json(
      { error: "Üretici silinirken hata oluştu" },
      { status: 500 }
    )
  }
}
