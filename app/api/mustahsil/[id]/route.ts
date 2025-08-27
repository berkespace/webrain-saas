import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

// GET - Tekil müstahsil getir
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const mustahsil = await prisma.mustahsil.findUnique({
      where: { id }
    })

    if (!mustahsil) {
      return NextResponse.json(
        { error: "Müstahsil bulunamadı" },
        { status: 404 }
      )
    }

    return NextResponse.json(mustahsil)
  } catch (error) {
    console.error("Müstahsil getirme hatası:", error)
    return NextResponse.json(
      { error: "Müstahsil getirilirken hata oluştu" },
      { status: 500 }
    )
  }
}

// PUT - Müstahsil güncelle
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()
    const { ad, soyad, tcKimlikNo, dogumTarihi, cinsiyet, iletisim, bankaAdi, ibanAdresi, adres, durum } = body

    // Validasyon
    if (!ad || !soyad || !tcKimlikNo || !dogumTarihi || !cinsiyet) {
      return NextResponse.json(
        { error: "Ad, soyad, TC kimlik no, doğum tarihi ve cinsiyet alanları zorunludur" },
        { status: 400 }
      )
    }

    // TC kimlik no benzersizliğini kontrol et (eğer değişmişse)
    const existingMustahsil = await prisma.mustahsil.findUnique({
      where: { id }
    })

    if (!existingMustahsil) {
      return NextResponse.json(
        { error: "Müstahsil bulunamadı" },
        { status: 404 }
      )
    }

    if (tcKimlikNo !== existingMustahsil.tcKimlikNo) {
      const duplicateMustahsil = await prisma.mustahsil.findFirst({
        where: { 
          tcKimlikNo,
          id: { not: id }
        }
      })
      if (duplicateMustahsil) {
        return NextResponse.json(
          { error: "Bu TC kimlik numarası zaten kayıtlı" },
          { status: 400 }
        )
      }
    }

    const updatedMustahsil = await prisma.mustahsil.update({
      where: { id },
      data: {
        ad,
        soyad,
        tcKimlikNo,
        dogumTarihi: new Date(dogumTarihi),
        cinsiyet,
        iletisim: iletisim || null,
        bankaAdi: bankaAdi || null,
        ibanAdresi: ibanAdresi || null,
        adres: adres || null,
        durum: durum || 'AKTIF'
      }
    })

    return NextResponse.json(
      { message: "Müstahsil başarıyla güncellendi", mustahsil: updatedMustahsil }
    )
  } catch (error) {
    console.error("Müstahsil güncelleme hatası:", error)
    return NextResponse.json(
      { error: "Müstahsil güncellenirken hata oluştu" },
      { status: 500 }
    )
  }
}

// DELETE - Müstahsil sil
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    // Müstahsilin var olup olmadığını kontrol et
    const existingMustahsil = await prisma.mustahsil.findUnique({
      where: { id }
    })

    if (!existingMustahsil) {
      return NextResponse.json(
        { error: "Müstahsil bulunamadı" },
        { status: 404 }
      )
    }

    // Mal kabul kayıtlarını kontrol et
    const malKabulCount = await prisma.mal_kabul_records.count({
      where: { mustahsilId: id }
    })

    if (malKabulCount > 0) {
      return NextResponse.json(
        { 
          error: "Bu müstahsil silinemez",
          details: `${malKabulCount} adet mal kabul kaydına bağlı. Bu kayıtlar silinmeden müstahsil silinemez.`
        },
        { status: 400 }
      )
    }

    await prisma.mustahsil.delete({
      where: { id }
    })

    return NextResponse.json(
      { message: "Müstahsil başarıyla silindi" }
    )
  } catch (error) {
    console.error("Müstahsil silme hatası:", error)
    return NextResponse.json(
      { error: "Müstahsil silinirken hata oluştu" },
      { status: 500 }
    )
  }
}
