import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

// GET - Tek bir mal kabul kaydını getir
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    const malKabulRecord = await prisma.mal_kabul_records.findUnique({
      where: { id },
      include: {
        komisyoncular: {
          select: {
            id: true,
            dukkanAdi: true,
            sehir: true
          }
        },
        ureticiler: {
          select: {
            id: true,
            ad: true,
            soyad: true,
            sehir: true
          }
        },
        ozel_firmalar: {
          select: {
            id: true,
            firmaAdi: true,
            sehir: true
          }
        },
        mustahsil: {
          select: {
            id: true,
            ad: true,
            soyad: true
          }
        },
        urunler: {
          select: {
            id: true,
            ad: true,
            kategori: true,
            birim: true
          }
        },
        ambalajlar: {
          select: {
            id: true,
            ad: true,
            tipi: true,
            daraKg: true
          }
        },
        users: {
          select: {
            id: true,
            firstName: true,
            lastName: true
          }
        }
      }
    })

    if (!malKabulRecord) {
      return NextResponse.json(
        { error: "Mal kabul kaydı bulunamadı" },
        { status: 404 }
      )
    }

    return NextResponse.json(malKabulRecord)
  } catch (error) {
    console.error("Mal kabul getirme hatası:", error)
    return NextResponse.json(
      { error: "Mal kabul kaydı getirilirken hata oluştu" },
      { status: 500 }
    )
  }
}

// PUT - Mal kabul kaydını güncelle
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.email) {
      return NextResponse.json(
        { error: "Oturum açmanız gerekiyor" },
        { status: 401 }
      )
    }

    const { id } = await params
    const body = await request.json()
    const {
      saticiTipi,
      komisyoncuId,
      ureticiId,
      ozelFirmaId,
      mustahsilId,
      urunId,
      paletId,
      ambalajId,
      paletSayisi,
      kasaSayisi,
      adetSayisi,
      brutKg,
      daraKg,
      girisKg,
      cikmaKg,
      fireKg,
      cikmaFireKg,
      netKg,
      netAdet,
      status,
      notlar
    } = body

    // Mal kabul kaydının var olup olmadığını kontrol et
    const existingRecord = await prisma.mal_kabul_records.findUnique({
      where: { id }
    })

    if (!existingRecord) {
      return NextResponse.json(
        { error: "Mal kabul kaydı bulunamadı" },
        { status: 404 }
      )
    }

    // Validasyon
    if (!urunId) {
      return NextResponse.json(
        { error: "Ürün seçimi zorunludur" },
        { status: 400 }
      )
    }


    if (paletId && (!paletSayisi || paletSayisi === '')) {
      return NextResponse.json(
        { error: "Palet seçildiğinde palet sayısı zorunludur" },
        { status: 400 }
      )
    }

    if (ambalajId && (!kasaSayisi || parseInt(kasaSayisi) === 0)) {
      return NextResponse.json(
        { error: "Ambalaj seçildiğinde kasa sayısı 0'dan büyük olmalıdır" },
        { status: 400 }
      )
    }

    // Ürün birimini kontrol et
    const urun = await prisma.urunler.findUnique({
      where: { id: urunId },
      select: { birim: true }
    })

    if (!urun) {
      return NextResponse.json(
        { error: "Ürün bulunamadı" },
        { status: 400 }
      )
    }

    // Birime göre validasyon
    if (urun.birim === 'ADET') {
      // ADET birimi için validasyon
      if (!adetSayisi || parseInt(adetSayisi) <= 0) {
        return NextResponse.json(
          { error: "Adet sayısı 0'dan büyük olmalıdır" },
          { status: 400 }
        )
      }
    } else {
      // KG birimi için validasyon
      if (!brutKg) {
        return NextResponse.json(
          { error: "Brüt KG alanı zorunludur" },
          { status: 400 }
        )
      }
    }

    // Mal kabul kaydını güncelle
    const updatedRecord = await prisma.mal_kabul_records.update({
      where: { id },
      data: {
        saticiTipi,
        komisyoncuId: komisyoncuId || null,
        ureticiId: ureticiId || null,
        ozelFirmaId: ozelFirmaId || null,
        mustahsilId: mustahsilId || null,
        urunId,
        ambalajId: ambalajId || null,
        paletSayisi: parseInt(paletSayisi) || 0,
        kasaSayisi: parseInt(kasaSayisi) || 0,
        adetSayisi: parseInt(adetSayisi) || 0,
        brutKg: parseFloat(brutKg) || 0,
        daraKg: parseFloat(daraKg) || 0,
        girisKg: parseFloat(girisKg) || 0,
        cikmaKg: parseFloat(cikmaKg) || 0,
        fireKg: parseFloat(fireKg) || 0,
        cikmaFireKg: parseFloat(cikmaFireKg) || 0,
        netKg: parseFloat(netKg) || 0,
        netAdet: parseInt(netAdet) || 0,

        status,
        notlar: notlar || null,
        // Note: miktar is set to girisKg, as in original
        miktar: parseFloat(girisKg) || 0,
      },
      include: {
        komisyoncular: {
          select: {
            id: true,
            dukkanAdi: true,
            sehir: true
          }
        },
        ureticiler: {
          select: {
            id: true,
            ad: true,
            soyad: true,
            sehir: true
          }
        },
        ozel_firmalar: {
          select: {
            id: true,
            firmaAdi: true,
            sehir: true
          }
        },
        mustahsil: {
          select: {
            id: true,
            ad: true,
            soyad: true
          }
        },
        urunler: {
          select: {
            id: true,
            ad: true,
            kategori: true,
            birim: true
          }
        },
        ambalajlar: {
          select: {
            id: true,
            ad: true,
            tipi: true,
            daraKg: true
          }
        },
        users: {
          select: {
            id: true,
            firstName: true,
            lastName: true
          }
        }
      }
    })

    return NextResponse.json(
      { message: "Mal kabul kaydı başarıyla güncellendi", malKabulRecord: updatedRecord }
    )
  } catch (error) {
    console.error("Mal kabul güncelleme hatası:", error)
    return NextResponse.json(
      { error: "Mal kabul kaydı güncellenirken hata oluştu" },
      { status: 500 }
    )
  }
}

// DELETE - Mal kabul kaydını sil
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.email) {
      return NextResponse.json(
        { error: "Oturum açmanız gerekiyor" },
        { status: 500 }
      )
    }

    const { id } = await params

    // Mal kabul kaydının var olup olmadığını kontrol et
    const existingRecord = await prisma.mal_kabul_records.findUnique({
      where: { id }
    })

    if (!existingRecord) {
      return NextResponse.json(
        { error: "Mal kabul kaydı bulunamadı" },
        { status: 404 }
      )
    }

    // Mal kabul kaydını sil
    await prisma.mal_kabul_records.delete({
      where: { id }
    })

    return NextResponse.json(
      { message: "Mal kabul kaydı başarıyla silindi" }
    )
  } catch (error) {
    console.error("Mal kabul silme hatası:", error)
    return NextResponse.json(
      { error: "Mal kabul kaydı silinirken hata oluştu" },
      { status: 500 }
    )
  }
}
