import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '../../../prisma/generated/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

export async function POST(request: NextRequest) {
  try {
    console.log('🌱 Neon veritabanı seed API çağrıldı')
    
    // Veritabanı bağlantısını test et
    await prisma.$connect()
    console.log('✅ Veritabanı bağlantısı başarılı')
    
    // Mevcut verileri temizle
    console.log('🧹 Mevcut veriler temizleniyor...')
    await prisma.malKabulRecord.deleteMany()
    await prisma.uretici.deleteMany()
    await prisma.mustahsil.deleteMany()
    await prisma.urun.deleteMany()
    await prisma.ambalaj.deleteMany()
    await prisma.komisyoncu.deleteMany()
    await prisma.ozelFirma.deleteMany()
    await prisma.user.deleteMany()
    console.log('✅ Veriler temizlendi')
    
    // Admin kullanıcısı oluştur
    console.log('👤 Admin kullanıcısı oluşturuluyor...')
    const hashedPassword = await bcrypt.hash('admin123', 12)
    
    const adminUser = await prisma.user.create({
      data: {
        firstName: 'Admin',
        lastName: 'User',
        email: 'admin@webrain.com',
        password: hashedPassword,
        role: 'ADMIN',
      },
    })
    console.log('✅ Admin kullanıcısı oluşturuldu:', adminUser.email)
    
    // Test kullanıcıları oluştur
    console.log('👥 Test kullanıcıları oluşturuluyor...')
    const testUsers = [
      {
        firstName: 'Mal',
        lastName: 'Kabulcü',
        email: 'mal@webrain.com',
        password: 'mal123',
        role: 'MAL_KABULCU' as const,
      },
      {
        firstName: 'Muhasebe',
        lastName: 'Kullanıcı',
        email: 'muhasebe@webrain.com',
        password: 'muhasebe123',
        role: 'MUHASEBE' as const,
      },
      {
        firstName: 'Satın',
        lastName: 'Almacı',
        email: 'satin@webrain.com',
        password: 'satin123',
        role: 'SATIN_ALMACI' as const,
      },
    ]

    for (const userData of testUsers) {
      const hashedPassword = await bcrypt.hash(userData.password, 12)
      
      await prisma.user.create({
        data: {
          firstName: userData.firstName,
          lastName: userData.lastName,
          email: userData.email,
          password: hashedPassword,
          role: userData.role,
        },
      })
      console.log(`✅ ${userData.role} kullanıcısı oluşturuldu:`, userData.email)
    }

    // Komisyoncu verileri oluştur
    console.log('🏪 Komisyoncular oluşturuluyor...')
    const komisyoncular = [
      {
        dukkanAdi: 'CİHAN TARIM',
        sehir: 'Antalya',
        komisyonNo: 'K109',
        komisyonKodu: 'KOM001',
        vkn: '1234567890',
        yetkiliAdi: 'Cihan Yılmaz',
        yetkiliTelefon: '0555 123 4567',
        durum: 'AKTIF' as const,
      },
      {
        dukkanAdi: 'ÇALDIR KOM',
        sehir: 'Mersin',
        komisyonNo: 'K110',
        komisyonKodu: 'KOM002',
        vkn: '1234567891',
        yetkiliAdi: 'Ahmet Çaldır',
        yetkiliTelefon: '0555 123 4568',
        durum: 'AKTIF' as const,
      },
      {
        dukkanAdi: 'DURDAŞLAR',
        sehir: 'İzmir',
        komisyonNo: 'K111',
        komisyonKodu: 'KOM003',
        vkn: '1234567892',
        yetkiliAdi: 'Mehmet Durdaş',
        yetkiliTelefon: '0555 123 4569',
        durum: 'AKTIF' as const,
      },
      {
        dukkanAdi: 'AHMET TORUN KOM',
        sehir: 'Bursa',
        komisyonNo: 'K112',
        komisyonKodu: 'KOM004',
        vkn: '1234567893',
        yetkiliAdi: 'Ahmet Torun',
        yetkiliTelefon: '0555 123 4570',
        durum: 'AKTIF' as const,
      },
      {
        dukkanAdi: 'ATAYIK',
        sehir: 'Adana',
        komisyonNo: 'K005',
        komisyonKodu: 'KOM005',
        vkn: '1234567894',
        yetkiliAdi: 'Ali Atayık',
        yetkiliTelefon: '0555 123 4571',
        durum: 'AKTIF' as const,
      },
    ]

    const createdKomisyoncular = []
    for (const komisyoncuData of komisyoncular) {
      const komisyoncu = await prisma.komisyoncu.create({
        data: komisyoncuData
      })
      createdKomisyoncular.push(komisyoncu)
      console.log(`✅ Komisyoncu oluşturuldu: ${komisyoncuData.dukkanAdi} (Kod: ${komisyoncu.komisyonKodu})`)
    }

    // Özel Firma verileri oluştur
    console.log('🏢 Özel Firmalar oluşturuluyor...')
    const ozelFirmalar = [
      {
        firmaAdi: 'WEBRAIN TARIM A.Ş.',
        firmaNo: 'OF001',
        vkn: '9876543210',
        vergiDairesi: 'Antalya Vergi Dairesi',
        yetkiliAdi: 'Berk Yılmaz',
        yetkiliTelefon: '0555 987 6543',
        sehir: 'Antalya',
        adres: 'Antalya Organize Sanayi Bölgesi No:123',
        durum: 'AKTIF' as const,
      },
      {
        firmaAdi: 'GREEN FARM LTD.',
        firmaNo: 'OF002',
        vkn: '9876543211',
        vergiDairesi: 'Mersin Vergi Dairesi',
        yetkiliAdi: 'Fatma Demir',
        yetkiliTelefon: '0555 987 6544',
        sehir: 'Mersin',
        adres: 'Mersin Serbest Bölge No:456',
        durum: 'AKTIF' as const,
      },
    ]

    for (const firmaData of ozelFirmalar) {
      await prisma.ozelFirma.create({
        data: firmaData
      })
      console.log(`✅ Özel Firma oluşturuldu:`, firmaData.firmaAdi)
    }

    // Ürün verileri oluştur
    console.log('🥬 Ürünler oluşturuluyor...')
    const urunler = [
      {
        ad: 'SİLÖR',
        stokKodu: 'BIB001',
        kategori: 'Sebze',
        birim: 'kg',
        durum: 'AKTIF' as const,
      },
      {
        ad: 'SALATALIK',
        stokKodu: 'SAL001',
        kategori: 'Sebze',
        birim: 'kg',
        durum: 'AKTIF' as const,
      },
      {
        ad: 'DOMATES',
        stokKodu: 'DOM001',
        kategori: 'Sebze',
        birim: 'kg',
        durum: 'AKTIF' as const,
      },
      {
        ad: 'SİVRİ',
        stokKodu: 'BIB002',
        kategori: 'Sebze',
        birim: 'kg',
        durum: 'AKTIF' as const,
      },
      {
        ad: 'DOLMA',
        stokKodu: 'URN001',
        kategori: 'Sebze',
        birim: 'kg',
        durum: 'AKTIF' as const,
      },
      {
        ad: 'ÜÇBURUN',
        stokKodu: 'URN002',
        kategori: 'Sebze',
        birim: 'kg',
        durum: 'AKTIF' as const,
      },
      {
        ad: 'ÇARLİ',
        stokKodu: 'URN003',
        kategori: 'Sebze',
        birim: 'kg',
        durum: 'AKTIF' as const,
      },
      {
        ad: 'SALKIM KOK',
        stokKodu: 'URN004',
        kategori: 'Sebze',
        birim: 'kg',
        durum: 'AKTIF' as const,
      },
    ]

    for (const urunData of urunler) {
      await prisma.urun.create({
        data: urunData,
      })
      console.log(`✅ Ürün oluşturuldu:`, urunData.ad)
    }

    // Müstahsil verileri oluştur
    console.log('👨‍🌾 Müstahsiller oluşturuluyor...')
    const mustahsiller = [
      {
        ad: 'ALİ',
        soyad: 'YILMAZ',
        tcKimlikNo: '12345678901',
        mustahsilNo: 'M001',
        dogumTarihi: new Date('1985-03-15'),
        cinsiyet: 'ERKEK' as const,
        sehir: 'Antalya',
        iletisim: '0555 123 4570',
        bankaAdi: 'Ziraat Bankası',
        ibanAdresi: 'TR12 0001 0002 3456 7890 1234 56',
        adres: 'Antalya Merkez Mah. No:123',
        durum: 'AKTIF' as const,
      },
      {
        ad: 'FATMA',
        soyad: 'KAYA',
        tcKimlikNo: '12345678902',
        mustahsilNo: 'M002',
        dogumTarihi: new Date('1988-07-22'),
        cinsiyet: 'KADIN' as const,
        sehir: 'Mersin',
        iletisim: '0555 123 4571',
        bankaAdi: 'İş Bankası',
        ibanAdresi: 'TR64 0006 4000 0011 2233 4455 66',
        adres: 'Mersin Merkez Mah. No:456',
        durum: 'AKTIF' as const,
      },
      {
        ad: 'MEHMET',
        soyad: 'DEMİR',
        tcKimlikNo: '12345678903',
        mustahsilNo: 'M003',
        dogumTarihi: new Date('1990-11-08'),
        cinsiyet: 'ERKEK' as const,
        sehir: 'İzmir',
        iletisim: '0555 123 4572',
        bankaAdi: 'Garanti BBVA',
        ibanAdresi: 'TR62 0006 2000 0000 1234 5678 90',
        adres: 'İzmir Merkez Mah. No:789',
        durum: 'AKTIF' as const,
      },
    ]

    for (const mustahsilData of mustahsiller) {
      await prisma.mustahsil.create({
        data: mustahsilData,
      })
      console.log(`✅ Müstahsil oluşturuldu:`, `${mustahsilData.ad} ${mustahsilData.soyad}`)
    }

    // Üretici verileri oluştur
    console.log('👨‍🌾 Üreticiler oluşturuluyor...')
    const ureticiler = [
      {
        ad: 'ALİ',
        soyad: 'YILMAZ',
        tcNo: '12345678905',
        dogumTarihi: new Date('1985-03-15'),
        cinsiyet: 'ERKEK' as const,
        sehir: 'Antalya',
        iletisim: '0555 123 4570',
        durum: 'AKTIF' as const,
        komisyoncuId: createdKomisyoncular[0].id, // CİHAN TARIM
      },
      {
        ad: 'FATMA',
        soyad: 'KAYA',
        tcNo: '12345678906',
        dogumTarihi: new Date('1988-07-22'),
        cinsiyet: 'KADIN' as const,
        sehir: 'Mersin',
        iletisim: '0555 123 4571',
        durum: 'AKTIF' as const,
        komisyoncuId: createdKomisyoncular[1].id, // ÇALDIR KOM
      },
      {
        ad: 'MEHMET',
        soyad: 'DEMİR',
        tcNo: '12345678907',
        dogumTarihi: new Date('1990-11-08'),
        cinsiyet: 'ERKEK' as const,
        sehir: 'İzmir',
        iletisim: '0555 123 4572',
        durum: 'AKTIF' as const,
        komisyoncuId: createdKomisyoncular[2].id, // DURDAŞLAR
      },
      {
        ad: 'AYŞE',
        soyad: 'ÖZ',
        tcNo: '12345678908',
        dogumTarihi: new Date('1987-04-12'),
        cinsiyet: 'KADIN' as const,
        sehir: 'Bursa',
        iletisim: '0555 123 4573',
        durum: 'AKTIF' as const,
        komisyoncuId: createdKomisyoncular[3].id, // AHMET TORUN KOM
      },
    ]

    for (const ureticiData of ureticiler) {
      await prisma.uretici.create({
        data: ureticiData,
      })
      console.log(`✅ Üretici oluşturuldu:`, `${ureticiData.ad} ${ureticiData.soyad}`)
    }

    // Ambalaj verileri oluştur
    console.log('📦 Ambalajlar oluşturuluyor...')
    const ambalajlar = [
      {
        ad: 'Standart Palet',
        tipi: 'PALET' as const,
        daraKg: 15.0,
        aciklama: 'Standart ahşap palet',
        durum: 'AKTIF' as const,
      },
      {
        ad: 'Müstahsil Kasası',
        tipi: 'PLASTIK_KASA' as const,
        daraKg: 1.5,
        aciklama: 'Müstahsil için özel plastik kasa',
        durum: 'AKTIF' as const,
      },
      {
        ad: 'Plastik Kasa',
        tipi: 'PLASTIK_KASA' as const,
        daraKg: 0.5,
        aciklama: 'Standart plastik kasa',
        durum: 'AKTIF' as const,
      },
      {
        ad: 'Karton Kasa',
        tipi: 'KARTON_KASA' as const,
        daraKg: 0.3,
        aciklama: 'Standart karton kasa',
        durum: 'AKTIF' as const,
      },
    ]

    for (const ambalajData of ambalajlar) {
      await prisma.ambalaj.create({
        data: ambalajData,
      })
      console.log(`✅ Ambalaj oluşturuldu:`, ambalajData.ad)
    }

    // Test Mal Kabul kaydı oluştur
    console.log('📝 Test Mal Kabul kaydı oluşturuluyor...')
    const testMalKabul = await prisma.malKabulRecord.create({
      data: {
        fisNo: 'TEST001',
        tarih: new Date(),
        saticiTipi: 'KOMISYONCU',
        saticiId: createdKomisyoncular[0].id,
        urunId: (await prisma.urun.findFirst({ where: { ad: 'SİLÖR' } }))!.id,
        ureticiId: (await prisma.uretici.findFirst({ where: { ad: 'ALİ' } }))!.id,
        ambalajId: (await prisma.ambalaj.findFirst({ where: { ad: 'Plastik Kasa' } }))!.id,
        brutKg: 100.0,
        daraKg: 2.0,
        girisKg: 98.0,
        cikmaKg: 0,
        fireKg: 0,
        netKg: 98.0,
        urunDurumu: 'BEKLEMEDE',
        userId: adminUser.id,
      },
    })
    console.log(`✅ Test Mal Kabul kaydı oluşturuldu: Fiş No ${testMalKabul.fisNo}`)

    // Sonuç istatistikleri
    const stats = {
      users: await prisma.user.count(),
      komisyoncular: await prisma.komisyoncu.count(),
      ozelFirmalar: await prisma.ozelFirma.count(),
      urunler: await prisma.urun.count(),
      mustahsiller: await prisma.mustahsil.count(),
      ureticiler: await prisma.uretici.count(),
      ambalajlar: await prisma.ambalaj.count(),
      malKabulRecords: await prisma.malKabulRecord.count(),
    }

    console.log('🎉 Neon veritabanı seed işlemi tamamlandı!')
    console.log('📊 Oluşturulan Veriler:', stats)

    return NextResponse.json({
      success: true,
      message: 'Neon veritabanı başarıyla seed edildi!',
      stats,
      timestamp: new Date().toISOString()
    })

  } catch (error) {
    console.error('❌ Neon seed API hatası:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Veritabanı seed işlemi başarısız',
        details: error instanceof Error ? error.message : 'Bilinmeyen hata',
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    )
  } finally {
    await prisma.$disconnect()
    console.log('🔌 Veritabanı bağlantısı kapatıldı')
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'Neon Database Seed API',
    usage: 'POST /api/neon-script to seed the database',
    endpoints: {
      POST: 'Seed the database with initial data',
      GET: 'Get API information'
    }
  })
}
