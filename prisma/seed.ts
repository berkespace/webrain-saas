import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  // Admin kullanıcısı oluştur
  const hashedPassword = await bcrypt.hash('admin123', 12)
  
  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@webrain.com' },
    update: {},
    create: {
      firstName: 'Admin',
      lastName: 'User',
      email: 'admin@webrain.com',
      password: hashedPassword,
      role: 'ADMIN',
    },
  })

  console.log('Admin kullanıcısı oluşturuldu:', adminUser.email)
  
  // Test kullanıcıları oluştur
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
    
    await prisma.user.upsert({
      where: { email: userData.email },
      update: {},
      create: {
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email,
        password: hashedPassword,
        role: userData.role,
      },
    })
    
    console.log(`${userData.role} kullanıcısı oluşturuldu:`, userData.email)
  }

  // Komisyoncu verileri oluştur
  const komisyoncular = [
    {
      dukkanAdi: 'CİHAN TARIM',
      sehir: 'Antalya',
      komisyonNo: 'K109',
      vkn: '1234567890',
      yetkiliAdi: 'Cihan Yılmaz',
      yetkiliTelefon: '0555 123 4567',
      durum: 'AKTIF' as const,
    },
    {
      dukkanAdi: 'ÇALDIR KOM',
      sehir: 'Mersin',
      komisyonNo: 'K110',
      vkn: '1234567891',
      yetkiliAdi: 'Ahmet Çaldır',
      yetkiliTelefon: '0555 123 4568',
      durum: 'AKTIF' as const,
    },
    {
      dukkanAdi: 'DURDAŞLAR',
      sehir: 'İzmir',
      komisyonNo: 'K111',
      vkn: '1234567892',
      yetkiliAdi: 'Mehmet Durdaş',
      yetkiliTelefon: '0555 123 4569',
      durum: 'AKTIF' as const,
    },
    {
      dukkanAdi: 'AHMET TORUN KOM',
      sehir: 'Bursa',
      komisyonNo: 'K112',
      vkn: '1234567893',
      yetkiliAdi: 'Ahmet Torun',
      yetkiliTelefon: '0555 123 4570',
      durum: 'AKTIF' as const,
    },
    {
      dukkanAdi: 'ATAYIK',
      sehir: 'Adana',
      komisyonNo: 'K005',
      vkn: '1234567894',
      yetkiliAdi: 'Ali Atayık',
      yetkiliTelefon: '0555 123 4571',
      durum: 'AKTIF' as const,
    },
  ]

  // Komisyoncuları oluştur (komisyonKodu manuel üretilir)
  for (let i = 0; i < komisyoncular.length; i++) {
    const komisyoncuData = komisyoncular[i]
    const komisyonKodu = `KOM${(i + 1).toString().padStart(3, '0')}` // KOM001, KOM002, etc.
    
    try {
      // Önce mevcut komisyoncu var mı kontrol et
      const existingKomisyoncu = await prisma.komisyoncu.findUnique({
        where: { komisyonNo: komisyoncuData.komisyonNo }
      })

      if (!existingKomisyoncu) {
        // Yeni komisyoncu oluştur
        const newKomisyoncu = await prisma.komisyoncu.create({
          data: {
            ...komisyoncuData,
            komisyonKodu
          }
        })
        console.log(`Komisyoncu oluşturuldu: ${komisyoncuData.dukkanAdi} (Kod: ${newKomisyoncu.komisyonKodu})`)
      } else {
        console.log(`Komisyoncu zaten mevcut: ${komisyoncuData.dukkanAdi}`)
      }
    } catch (error) {
      console.error(`Komisyoncu oluşturulurken hata: ${komisyoncuData.dukkanAdi}`, error)
    }
  }

  // Ürün verileri oluştur
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
    console.log(`Ürün oluşturuldu:`, urunData.ad)
  }

  // Müstahsil verisi sistemden eklenir, otomatik kod alır (M001, M002...)
  console.log('Müstahsil verisi sistemden eklenir, otomatik kod alır')

  // Üretici verileri oluştur
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
      komisyoncuId: null, // CİHAN TARIM'a bağlı olacak
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
      komisyoncuId: null, // ÇALDIR KOM'a bağlı olacak
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
      komisyoncuId: null, // DURDAŞLAR'a bağlı olacak
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
      komisyoncuId: null, // AHMET TORUN KOM'a bağlı olacak
    },
  ]

  // Önce üreticileri oluştur
  for (const ureticiData of ureticiler) {
    await prisma.uretici.create({
      data: ureticiData,
    })
    console.log(`Üretici oluşturuldu:`, `${ureticiData.ad} ${ureticiData.soyad}`)
  }

  // Sonra üreticileri komisyonculara bağla
  const komisyoncuIds = await prisma.komisyoncu.findMany({
    select: { id: true },
    orderBy: { createdAt: 'asc' }
  })

  if (komisyoncuIds.length >= 4) {
    // ALİ YILMAZ -> CİHAN TARIM (1. komisyoncu)
    await prisma.uretici.updateMany({
      where: { ad: 'ALİ', soyad: 'YILMAZ' },
      data: { komisyoncuId: komisyoncuIds[0].id }
    })
    console.log('ALİ YILMAZ -> CİHAN TARIM komisyoncusuna bağlandı')

    // FATMA KAYA -> ÇALDIR KOM (2. komisyoncu)
    await prisma.uretici.updateMany({
      where: { ad: 'FATMA', soyad: 'KAYA' },
      data: { komisyoncuId: komisyoncuIds[1].id }
    })
    console.log('FATMA KAYA -> ÇALDIR KOM komisyoncusuna bağlandı')

    // MEHMET DEMİR -> DURDAŞLAR (3. komisyoncu)
    await prisma.uretici.updateMany({
      where: { ad: 'MEHMET', soyad: 'DEMİR' },
      data: { komisyoncuId: komisyoncuIds[2].id }
    })
    console.log('MEHMET DEMİR -> DURDAŞLAR komisyoncusuna bağlandı')

    // AYŞE ÖZ -> AHMET TORUN KOM (4. komisyoncu)
    await prisma.uretici.updateMany({
      where: { ad: 'AYŞE', soyad: 'ÖZ' },
      data: { komisyoncuId: komisyoncuIds[3].id }
    })
    console.log('AYŞE ÖZ -> AHMET TORUN KOM komisyoncusuna bağlandı')
  }

  // Ambalaj verileri oluştur
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
    console.log(`Ambalaj oluşturuldu:`, ambalajData.ad)
  }
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
