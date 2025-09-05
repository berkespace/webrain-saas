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
    
    // Debug: Gelen verileri logla
    console.log('PUT /api/mal-kabul/[id] - Gelen veriler:', {
      id,
      body,
      cikmaAdet: body.cikmaAdet,
      fireAdet: body.fireAdet,
      adetSayisi: body.adetSayisi,
      urunId: body.urunId
    })
    
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
      cikmaAdet,
      fireAdet,
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

    // Debug: Ürün bilgisini logla
    console.log('Ürün bilgisi:', {
      id: urunId,
      birim: urun.birim
    })

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

    // Birime göre NET değerleri hesapla
    let calculatedNetKg = 0
    let calculatedNetAdet = 0
    let calculatedStatus = status || 'BEKLEMEDE'
    let calculatedGirisKg = 0
    let calculatedMiktar = 0

    if (urun.birim === 'ADET') {
      // ADET ürünler için
      calculatedGirisKg = parseInt(adetSayisi) || 0  // Adet ürünler için girisKg = adetSayisi
      calculatedMiktar = parseInt(adetSayisi) || 0   // Adet ürünler için miktar = adetSayisi
      // Adet ürünler için çıkma ve fire değerlerini cikmaAdet ve fireAdet'ten al
      const cikmaAdetValue = parseFloat(cikmaAdet) || 0
      const fireAdetValue = parseFloat(fireAdet) || 0
      calculatedNetAdet = (parseInt(adetSayisi) || 0) - cikmaAdetValue - fireAdetValue
      
      // Debug: ADET hesaplamalarını logla
      console.log('ADET hesaplamaları:', {
        adetSayisi: parseInt(adetSayisi) || 0,
        cikmaAdet: cikmaAdet,
        cikmaAdetValue,
        fireAdet: fireAdet,
        fireAdetValue,
        calculatedNetAdet,
        calculatedGirisKg,
        calculatedMiktar
      })
      
      // ADET ürünler için: Çıkma veya fire varsa NETLENDI, yoksa BEKLEMEDE
      if (cikmaAdetValue > 0 || fireAdetValue > 0) {
        calculatedStatus = 'NETLENDI'
      } else {
        calculatedStatus = 'BEKLEMEDE'
      }
    } else {
      // KG ürünler için
      calculatedGirisKg = parseFloat(girisKg) || 0
      calculatedMiktar = parseFloat(girisKg) || 0
      calculatedNetKg = (parseFloat(girisKg) || 0) - (parseFloat(cikmaKg) || 0) - (parseFloat(fireKg) || 0)
      // KG ürünler için: Çıkma veya fire varsa NETLENDI, yoksa BEKLEMEDE
      if (parseFloat(cikmaKg) > 0 || parseFloat(fireKg) > 0) {
        calculatedStatus = 'NETLENDI'
      } else {
        calculatedStatus = 'BEKLEMEDE'
      }
    }

    // Debug: Güncellenecek verileri logla
    console.log('Güncellenecek veriler:', {
      id,
      urunBirim: urun.birim,
      cikmaKg: urun.birim === 'ADET' ? (parseFloat(cikmaAdet) || 0) : (parseFloat(cikmaKg) || 0),
      fireKg: urun.birim === 'ADET' ? (parseFloat(fireAdet) || 0) : (parseFloat(fireKg) || 0),
      netAdet: calculatedNetAdet,
      calculatedGirisKg,
      calculatedMiktar
    })

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
        girisKg: calculatedGirisKg,
        cikmaKg: urun.birim === 'ADET' ? (parseFloat(cikmaAdet) || 0) : (parseFloat(cikmaKg) || 0),
        fireKg: urun.birim === 'ADET' ? (parseFloat(fireAdet) || 0) : (parseFloat(fireKg) || 0),
        cikmaFireKg: parseFloat(cikmaFireKg) || 0,
        netKg: calculatedNetKg,
        netAdet: calculatedNetAdet,
        status: calculatedStatus,
        notlar: notlar || null,
        miktar: calculatedMiktar,
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

    // Debug: Güncellenmiş kaydı logla
    console.log('Güncellenmiş kayıt:', {
      id: updatedRecord.id,
      cikmaKg: updatedRecord.cikmaKg,
      fireKg: updatedRecord.fireKg,
      netAdet: updatedRecord.netAdet,
      girisKg: updatedRecord.girisKg,
      miktar: updatedRecord.miktar
    })

    // Cache'i temizle (ana API'deki cache'i temizlemek için)
    // Bu basit bir çözüm, production'da Redis kullanılmalı
    
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
