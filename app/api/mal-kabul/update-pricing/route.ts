import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { writeFile, mkdir } from 'fs/promises'
import { join } from 'path'

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Kullanıcının rolünü kontrol et
    if (!['SATIN_ALMACI', 'MUHASEBECI', 'MUHASEBE', 'ADMIN'].includes(session.user.role)) {
      return NextResponse.json({ error: 'Bu işlem için yetkiniz yok' }, { status: 403 })
    }

    const formData = await request.formData()
    const recordId = formData.get('recordId') as string
    const alisFiyati = parseFloat(formData.get('alisFiyati') as string) || 0
    const kdvOrani = parseFloat(formData.get('kdvOrani') as string) || 0
    const belediyeRusumOrani = parseFloat(formData.get('belediyeRusumOrani') as string) || 0
    const kdvHesapla = formData.get('kdvHesapla') === 'true'
    const belediyeRusumHesapla = formData.get('belediyeRusumHesapla') === 'true'
    const notlar = formData.get('notlar') as string
    
    // Manuel fatura bilgileri
    const faturaYontemi = formData.get('faturaYontemi') as string
    const faturaSeriNo = formData.get('faturaSeriNo') as string
    const faturaTarihi = formData.get('faturaTarihi') as string
    const faturaAciklamasi = formData.get('faturaAciklamasi') as string

    // Önce kaydı al ki Net KG/Adet bilgisine erişelim
    const record = await prisma.mal_kabul_records.findUnique({
      where: { id: recordId },
      include: {
        urunler: true
      }
    })

    if (!record) {
      return NextResponse.json({ error: 'Kayıt bulunamadı' }, { status: 404 })
    }

    // Net miktarı hesapla (KG veya Adet) - case-insensitive kontrol
    const netMiktar = record.urunler.birim?.toLowerCase() === 'kg' 
      ? (record.netKg || 0) 
      : (record.netAdet || 0)

    // Toplam fiyatı hesapla: Net Miktar * Alış Fiyatı
    let toplamFiyat = netMiktar * alisFiyati
    let kdvHaricTutar = toplamFiyat // KDV ve vergi hariç tutar
    
    if (kdvHesapla) {
      toplamFiyat += (toplamFiyat * kdvOrani) / 100
    }
    if (belediyeRusumHesapla) {
      toplamFiyat += (toplamFiyat * belediyeRusumOrani) / 100
    }

    // Dosyaları kaydet
    const uploadedFiles: string[] = []
    const uploadDir = join(process.cwd(), 'public', 'uploads', 'evraklar')
    
    try {
      await mkdir(uploadDir, { recursive: true })
    } catch (error) {
      // Klasör zaten varsa hata vermez
    }

    // FormData'dan dosyaları al
    for (let i = 0; i < 10; i++) { // Maksimum 10 dosya
      const file = formData.get(`file_${i}`) as File
      if (file) {
        const bytes = await file.arrayBuffer()
        const buffer = Buffer.from(bytes)
        
        const fileName = `${recordId}_${Date.now()}_${i}_${file.name}`
        const filePath = join(uploadDir, fileName)
        
        await writeFile(filePath, buffer)
        uploadedFiles.push(`/uploads/evraklar/${fileName}`)
      }
    }

    // Satıcı bilgilerini al
    let saticiId = ''
    let saticiAdi = ''
    
    if (record.saticiTipi === 'KOMISYONCU' && record.komisyoncuId) {
      saticiId = record.komisyoncuId
      const komisyoncu = await prisma.komisyoncular.findUnique({
        where: { id: record.komisyoncuId }
      })
      saticiAdi = komisyoncu?.dukkanAdi || 'Bilinmeyen Komisyoncu'
    } else if (record.saticiTipi === 'MUSTAHSIL' && record.mustahsilId) {
      saticiId = record.mustahsilId
      const mustahsil = await prisma.mustahsil.findUnique({
        where: { id: record.mustahsilId }
      })
      saticiAdi = mustahsil ? `${mustahsil.ad} ${mustahsil.soyad}` : 'Bilinmeyen Müstahsil'
    } else if (record.saticiTipi === 'OZEL_FIRMA' && record.ozelFirmaId) {
      saticiId = record.ozelFirmaId
      const ozelFirma = await prisma.ozel_firmalar.findUnique({
        where: { id: record.ozelFirmaId }
      })
      saticiAdi = ozelFirma?.firmaAdi || 'Bilinmeyen Firma'
    } else if (record.saticiTipi === 'URETICI' && record.ureticiId) {
      saticiId = record.ureticiId
      const uretici = await prisma.ureticiler.findUnique({
        where: { id: record.ureticiId }
      })
      saticiAdi = uretici ? `${uretici.ad} ${uretici.soyad}` : 'Bilinmeyen Üretici'
    }

    // Veritabanını güncelle
    const updatedRecord = await prisma.mal_kabul_records.update({
      where: { id: recordId },
      data: {
        birimFiyat: alisFiyati,
        toplamFiyat: toplamFiyat,
        kdvHaricTutar: kdvHaricTutar,
        kdvOrani: kdvOrani,
        belediyeRusumOrani: belediyeRusumOrani,
        kdvHesapla: kdvHesapla,
        belediyeRusumHesapla: belediyeRusumHesapla,
        notlar: notlar,
        evraklar: uploadedFiles.length > 0 ? uploadedFiles : undefined,
        fiyatGirildi: true,
        fiyatGirenKullanici: session.user.id,
        fiyatGirilmeTarihi: new Date(),
        faturaYontemi: faturaYontemi,
        faturaSeriNo: faturaSeriNo || null,
        faturaTarihi: faturaTarihi ? new Date(faturaTarihi) : null,
        faturaAciklamasi: faturaAciklamasi || null,
        onayDurumu: faturaYontemi === 'MANUEL' ? 'BEKLEMEDE' : 'ONAYLANDI'
      }
    })

    // Cari hesap kaydı sadece evrak yükleme durumunda veya onaylanan manuel faturalar için oluştur
    if (faturaYontemi === 'EVRAK') {
      const cariHesapId = `cari-${recordId}-${Date.now()}`
      
      await prisma.cari_hesaplar.upsert({
        where: { malKabulRecordId: recordId },
        update: {
          saticiTipi: record.saticiTipi,
          saticiId: saticiId,
          saticiAdi: saticiAdi,
          alisTarihi: record.tarih || new Date(),
          fisNo: record.fisNo,
          toplamAlisMiktari: netMiktar,
          birimFiyat: alisFiyati,
          kdvHaricTutar: kdvHaricTutar,
          herseyDahilTutar: toplamFiyat,
          cariBakiyesi: toplamFiyat, // Şimdilik toplam tutar = bakiye
          updatedAt: new Date()
        },
        create: {
          id: cariHesapId,
          saticiTipi: record.saticiTipi,
          saticiId: saticiId,
          saticiAdi: saticiAdi,
          alisTarihi: record.tarih || new Date(),
          fisNo: record.fisNo,
          malKabulRecordId: recordId,
          toplamAlisMiktari: netMiktar,
          birimFiyat: alisFiyati,
          kdvHaricTutar: kdvHaricTutar,
          herseyDahilTutar: toplamFiyat,
          cariBakiyesi: toplamFiyat // Şimdilik toplam tutar = bakiye
        }
      })
    }

    return NextResponse.json({
      success: true,
      record: updatedRecord,
      message: 'Fiyat bilgileri ve evraklar başarıyla kaydedildi'
    })

  } catch (error) {
    console.error('Fiyat güncelleme hatası:', error)
    return NextResponse.json(
      { error: 'Fiyat bilgileri kaydedilemedi' },
      { status: 500 }
    )
  }
}
