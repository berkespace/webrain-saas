import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Oturum açmanız gerekiyor" }, { status: 401 })
    }

    // Sadece muhasebeci ve admin onay verebilir
    const userRole = (session.user as any)?.role
    if (!['MUHASEBECI', 'ADMIN'].includes(userRole)) {
      return NextResponse.json({ error: "Bu işlem için yetkiniz yok" }, { status: 403 })
    }

    const { recordId, action, rejectReason } = await request.json()

    if (!recordId || !action) {
      return NextResponse.json({ error: "Gerekli parametreler eksik" }, { status: 400 })
    }

    if (action === 'reject' && !rejectReason?.trim()) {
      return NextResponse.json({ error: "Red nedeni gereklidir" }, { status: 400 })
    }

    // Kaydı güncelle
    const updatedRecord = await prisma.mal_kabul_records.update({
      where: { id: recordId },
      data: {
        onayDurumu: action === 'approve' ? 'ONAYLANDI' : 'REDDEDILDI',
        onaylayanKullanici: session.user.id,
        onayTarihi: new Date(),
        redDetayi: action === 'reject' ? rejectReason : null
      }
    })

    // Eğer onaylandıysa, cari hesaba ekle/güncelle
    if (action === 'approve') {
      // Kaydın tüm detaylarını al
      const record = await prisma.mal_kabul_records.findUnique({
        where: { id: recordId },
        include: {
          urunler: true,
          komisyoncular: true,
          ureticiler: true,
          ozel_firmalar: true,
          mustahsil: true
        }
      })

      if (record) {
        // Satıcı bilgilerini belirle
        let saticiId = ''
        let saticiAdi = ''

        if (record.saticiTipi === 'KOMISYONCU' && record.komisyoncuId) {
          saticiId = record.komisyoncuId
          saticiAdi = record.komisyoncular?.dukkanAdi || 'Bilinmeyen Komisyoncu'
        } else if (record.saticiTipi === 'URETICI' && record.ureticiId) {
          saticiId = record.ureticiId
          saticiAdi = record.ureticiler ? `${record.ureticiler.ad} ${record.ureticiler.soyad}` : 'Bilinmeyen Üretici'
        } else if (record.saticiTipi === 'OZEL_FIRMA' && record.ozelFirmaId) {
          saticiId = record.ozelFirmaId
          saticiAdi = record.ozel_firmalar?.firmaAdi || 'Bilinmeyen Firma'
        } else if (record.saticiTipi === 'MUSTAHSIL' && record.mustahsilId) {
          saticiId = record.mustahsilId
          saticiAdi = record.mustahsil ? `${record.mustahsil.ad} ${record.mustahsil.soyad}` : 'Bilinmeyen Müstahsil'
        }

        // Net miktarı hesapla
        const netMiktar = record.urunler.birim?.toLowerCase() === 'kg' 
          ? (record.netKg || 0) 
          : (record.netAdet || 0)

        // Cari hesap kaydı oluştur/güncelle
        await prisma.cari_hesaplar.upsert({
          where: { malKabulRecordId: recordId },
          update: {
            saticiTipi: record.saticiTipi,
            saticiId: saticiId,
            saticiAdi: saticiAdi,
            alisTarihi: record.tarih || new Date(),
            fisNo: record.fisNo,
            toplamAlisMiktari: netMiktar,
            birimFiyat: record.birimFiyat || 0,
            kdvHaricTutar: record.kdvHaricTutar || 0,
            herseyDahilTutar: record.toplamFiyat || 0,
            cariBakiyesi: record.toplamFiyat || 0,
            updatedAt: new Date()
          },
          create: {
            id: `cari-${recordId}-${Date.now()}`,
            saticiTipi: record.saticiTipi,
            saticiId: saticiId,
            saticiAdi: saticiAdi,
            alisTarihi: record.tarih || new Date(),
            fisNo: record.fisNo,
            malKabulRecordId: recordId,
            toplamAlisMiktari: netMiktar,
            birimFiyat: record.birimFiyat || 0,
            kdvHaricTutar: record.kdvHaricTutar || 0,
            herseyDahilTutar: record.toplamFiyat || 0,
            cariBakiyesi: record.toplamFiyat || 0,
            createdAt: new Date(),
            updatedAt: new Date()
          }
        })
      }
    }

    return NextResponse.json({ 
      success: true, 
      message: action === 'approve' ? 'Fatura onaylandı' : 'Fatura reddedildi'
    })

  } catch (error) {
    console.error("Fatura onay hatası:", error)
    return NextResponse.json(
      { error: "Sunucu hatası oluştu" },
      { status: 500 }
    )
  }
}
