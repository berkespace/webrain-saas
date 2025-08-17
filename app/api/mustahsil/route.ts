import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

// POST - Yeni müstahsil ekle
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { ad, soyad, tcKimlikNo, dogumTarihi, cinsiyet, iletisim, bankaAdi, ibanAdresi, adres } = body

    // Zorunlu alanları kontrol et
    if (!ad || !soyad || !tcKimlikNo || !dogumTarihi || !cinsiyet) {
      return NextResponse.json(
        { error: "Ad, soyad, TC kimlik no, doğum tarihi ve cinsiyet zorunludur" },
        { status: 400 }
      )
    }

    // TC kimlik no benzersizliğini kontrol et
    const existingMustahsil = await prisma.mustahsil.findUnique({
      where: { tcKimlikNo }
    })

    if (existingMustahsil) {
      return NextResponse.json(
        { error: "Bu TC kimlik numarası ile kayıtlı müstahsil bulunmaktadır" },
        { status: 400 }
      )
    }

    // Son müstahsil numarasını bul ve bir sonraki numarayı oluştur
    const lastMustahsil = await prisma.mustahsil.findFirst({
      orderBy: { mustahsilNo: 'desc' }
    })

    let nextMustahsilNo = 'MÜS001'
    if (lastMustahsil && lastMustahsil.mustahsilNo) {
      if (lastMustahsil.mustahsilNo.startsWith('MÜS')) {
        const lastNumber = parseInt(lastMustahsil.mustahsilNo.substring(3))
        if (!isNaN(lastNumber)) {
          nextMustahsilNo = `MÜS${(lastNumber + 1).toString().padStart(3, '0')}`
        }
      }
    }

    // Yeni müstahsil oluştur
    const newMustahsil = await prisma.mustahsil.create({
      data: {
        ad,
        soyad,
        tcKimlikNo,
        mustahsilNo: nextMustahsilNo,
        dogumTarihi: new Date(dogumTarihi),
        cinsiyet,
        iletisim,
        bankaAdi,
        ibanAdresi,
        adres,
        durum: 'AKTIF'
      }
    })

    return NextResponse.json(newMustahsil, { status: 201 })
  } catch (error) {
    console.error("Müstahsil ekleme hatası:", error)
    return NextResponse.json(
      { error: "Müstahsil eklenirken hata oluştu" },
      { status: 500 }
      )
  }
}

// GET - Tüm müstahsil verilerini listele
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status')
    const search = searchParams.get('search')

    // Filtreleme koşulları
    const where: any = {}

    // Status filtresi geçici olarak devre dışı
    // if (status && status !== 'all') {
    //   where.durum = status
    // }

    if (search) {
      where.OR = [
        { ad: { contains: search, mode: 'insensitive' } },
        { soyad: { contains: search, mode: 'insensitive' } },
        { tcKimlikNo: { contains: search, mode: 'insensitive' } }
      ]
    }

    const mustahsilList = await prisma.mustahsil.findMany({
      where,
      orderBy: { ad: 'asc' }
    })

    return NextResponse.json(mustahsilList)
  } catch (error) {
    console.error("Müstahsil listesi hatası:", error)
    return NextResponse.json(
      { error: "Müstahsil listesi alınırken hata oluştu" },
      { status: 500 }
    )
  }
}
