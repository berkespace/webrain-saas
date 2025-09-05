import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

// naive in-memory cache (replace with Redis in production)
let cacheKey = ''
let cacheData: any = null
let cacheTime = 0
const CACHE_TTL_MS = 1_000 // Cache süresini 1 saniyeye düşür

// Cache temizleme fonksiyonu
function clearCache() {
  cacheKey = ''
  cacheData = null
  cacheTime = 0
}

// GET - Tüm mal kabul kayıtlarını listele
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const search = searchParams.get('search')
    const fisNo = searchParams.get('fisNo')
    const status = searchParams.get('status')
    const saticiTipi = searchParams.get('saticiTipi')
    const startDate = searchParams.get('startDate')
    const endDate = searchParams.get('endDate')

    const key = JSON.stringify({ search, fisNo, status, saticiTipi, startDate, endDate })
    const now = Date.now()
    if (cacheData && cacheKey === key && now - cacheTime < CACHE_TTL_MS) {
      const res = NextResponse.json(cacheData)
      res.headers.set('Cache-Control', 'public, max-age=10, s-maxage=10, stale-while-revalidate=59')
      return res
    }

    // Filtreleme koşulları
    const where: any = {}

    if (fisNo) {
      where.fisNo = { equals: fisNo }
    } else if (search) {
      where.OR = [
        { fisNo: { contains: search, mode: 'insensitive' } },
        { notlar: { contains: search, mode: 'insensitive' } },
        { komisyoncular: { dukkanAdi: { contains: search, mode: 'insensitive' } } },
        { ureticiler: { ad: { contains: search, mode: 'insensitive' } } },
        { ureticiler: { soyad: { contains: search, mode: 'insensitive' } } },
        { ozel_firmalar: { firmaAdi: { contains: search, mode: 'insensitive' } } },
        { urunler: { ad: { contains: search, mode: 'insensitive' } } }
      ]
    }

    if (status && status !== 'all') {
      where.status = status
    }

    if (saticiTipi && saticiTipi !== 'all') {
      where.saticiTipi = saticiTipi
    }

    if (startDate && endDate) {
      where.tarih = {
        gte: new Date(startDate),
        lte: new Date(endDate)
      }
    }

    const malKabulRecords = await prisma.mal_kabul_records.findMany({
      where,
      include: {
        komisyoncular: { select: { id: true, dukkanAdi: true, komisyonNo: true, sehir: true } },
        ureticiler: { select: { id: true, ad: true, soyad: true, sehir: true } },
        ozel_firmalar: { select: { id: true, firmaAdi: true, sehir: true } },
        mustahsil: { select: { id: true, ad: true, soyad: true } },
        urunler: { select: { id: true, ad: true, kategori: true, birim: true } },
        ambalajlar: { select: { id: true, ad: true, tipi: true, daraKg: true } },
        users: { select: { id: true, firstName: true, lastName: true } }
      },
      orderBy: { tarih: 'desc' }
    })

    const payload = { records: malKabulRecords }

    // set cache
    cacheKey = key
    cacheData = payload
    cacheTime = now

    const res = NextResponse.json(payload)
    res.headers.set('Cache-Control', 'public, max-age=10, s-maxage=10, stale-while-revalidate=59')
    return res
  } catch (error) {
    console.error("Mal kabul listesi hatası:", error)
    return NextResponse.json(
      { error: "Mal kabul listesi alınırken hata oluştu" },
      { status: 500 }
    )
  }
}

// POST - Yeni mal kabul kaydı oluştur
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.email) {
      return NextResponse.json(
        { error: "Oturum açmanız gerekiyor" },
        { status: 401 }
      )
    }

    const body = await request.json()
    const {
      saticiTipi,
      komisyoncuId,
      ureticiId,
      mustahsilId,
      ozelFirmaId,
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
      fiyat,
      notlar
    } = body

    // Debug: Gelen verileri logla
    console.log('Gelen veriler:', {
      saticiTipi,
      komisyoncuId,
      ureticiId,
      mustahsilId,
      ozelFirmaId,
      urunId,
      paletId,
      ambalajId
    })

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

    // Mal kabulcu kullanıcısını bul
    const malKabulcu = await prisma.users.findUnique({
      where: { email: session.user.email }
    })

    if (!malKabulcu) {
      return NextResponse.json(
        { error: "Mal kabulcu kullanıcısı bulunamadı" },
        { status: 404 }
      )
    }

    // Fiş numarası oluştur (YYYYMMDD + 4 haneli sıra no)
    const today = new Date()
    const dateStr = today.getFullYear().toString() + 
                   (today.getMonth() + 1).toString().padStart(2, '0') + 
                   today.getDate().toString().padStart(2, '0')
    
    const todayRecords = await prisma.mal_kabul_records.count({
      where: {
        fisNo: {
          startsWith: dateStr
        }
      }
    })
    
    const fisNo = 'HNR' + (todayRecords + 1).toString().padStart(4, '0')

    // Birime göre NET değerleri hesapla
    let calculatedNetKg = 0
    let calculatedNetAdet = 0
    let calculatedStatus = 'FATURA_BEKLIYOR'
    let calculatedGirisKg = 0
    let calculatedMiktar = 0

    if (urun.birim === 'ADET') {
      // ADET ürünler için
      calculatedGirisKg = parseInt(adetSayisi) || 0  // Adet ürünler için girisKg = adetSayisi
      calculatedMiktar = parseInt(adetSayisi) || 0   // Adet ürünler için miktar = adetSayisi
      calculatedNetAdet = (parseInt(adetSayisi) || 0) - (parseFloat(cikmaKg) || 0) - (parseFloat(fireKg) || 0)
      calculatedNetKg = 0  // ADET ürünler için netKg = 0
      if (parseFloat(cikmaKg) > 0 || parseFloat(fireKg) > 0) {
        calculatedStatus = 'NETLENDI'
      }
    } else {
      // KG ürünler için
      calculatedGirisKg = parseFloat(girisKg) || 0
      calculatedMiktar = parseFloat(girisKg) || 0
      calculatedNetKg = (parseFloat(girisKg) || 0) - (parseFloat(cikmaKg) || 0) - (parseFloat(fireKg) || 0)
      calculatedNetAdet = 0  // KG ürünler için netAdet = 0
      if (parseFloat(cikmaKg) > 0 || parseFloat(fireKg) > 0) {
        calculatedStatus = 'NETLENDI'
      }
    }

    // Mal kabul kaydını oluştur
    const malKabulRecord = await prisma.mal_kabul_records.create({
      data: {
        id: `mal-kabul-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        fisNo,
        saticiTipi,
        komisyoncuId: komisyoncuId && komisyoncuId !== '' ? komisyoncuId : null,
        ureticiId: ureticiId && ureticiId !== '' ? ureticiId : null,
        mustahsilId: mustahsilId && mustahsilId !== '' ? mustahsilId : null,
        ozelFirmaId: ozelFirmaId && ozelFirmaId !== '' ? ozelFirmaId : null,
        urunId,
        ambalajId: ambalajId || null,
        paletSayisi: parseInt(paletSayisi) || 0,
        kasaSayisi: parseInt(kasaSayisi) || 0,
        adetSayisi: parseInt(adetSayisi) || 0,
        brutKg: parseFloat(brutKg) || 0,
        daraKg: parseFloat(daraKg) || 0,
        girisKg: calculatedGirisKg,
        cikmaKg: parseFloat(cikmaKg) || 0,
        fireKg: parseFloat(fireKg) || 0,
        cikmaFireKg: parseFloat(cikmaFireKg) || 0,
        netKg: calculatedNetKg,
        netAdet: calculatedNetAdet,
        status: calculatedStatus,
        miktar: calculatedMiktar,
        
        notlar: notlar || null,
        malKabulcuId: malKabulcu.id
      },
      include: {
        komisyoncular: {
          select: {
            id: true,
            dukkanAdi: true,
            sehir: true,
            komisyonNo: true
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

    // Cache'i temizle
    clearCache()

    return NextResponse.json(
      { message: "Mal kabul kaydı başarıyla oluşturuldu", malKabulRecord },
      { status: 201 }
    )
  } catch (error) {
    console.error("Mal kabul oluşturma hatası:", error)
    return NextResponse.json(
      { error: "Mal kabul kaydı oluşturulurken hata oluştu" },
      { status: 500 }
    )
  }
}
