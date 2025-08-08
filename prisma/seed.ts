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
      komisyonNo: 'K001',
      vkn: '1234567890',
      yetkiliAdi: 'Cihan Yılmaz',
      yetkiliTelefon: '0555 123 4567',
      durum: 'AKTIF' as const,
    },
    {
      dukkanAdi: 'ÇALDIR KOM',
      sehir: 'Mersin',
      komisyonNo: 'K002',
      vkn: '1234567891',
      yetkiliAdi: 'Ahmet Çaldır',
      yetkiliTelefon: '0555 123 4568',
      durum: 'AKTIF' as const,
    },
    {
      dukkanAdi: 'DURDAŞLAR',
      sehir: 'İzmir',
      komisyonNo: 'K003',
      vkn: '1234567892',
      yetkiliAdi: 'Mehmet Durdaş',
      yetkiliTelefon: '0555 123 4569',
      durum: 'AKTIF' as const,
    },
    {
      dukkanAdi: 'AHMET TORUN KOM',
      sehir: 'Bursa',
      komisyonNo: 'K004',
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

  for (const komisyoncuData of komisyoncular) {
    await prisma.komisyoncu.upsert({
      where: { komisyonNo: komisyoncuData.komisyonNo },
      update: {},
      create: komisyoncuData,
    })
    
    console.log(`Komisyoncu oluşturuldu:`, komisyoncuData.dukkanAdi)
  }

  // Ürün verileri oluştur
  const urunler = [
    {
      ad: 'SİLÖR',
      kategori: 'Sebze',
      birim: 'kg',
      durum: 'AKTIF' as const,
    },
    {
      ad: 'SALATALIK',
      kategori: 'Sebze',
      birim: 'kg',
      durum: 'AKTIF' as const,
    },
    {
      ad: 'DOMATES',
      kategori: 'Sebze',
      birim: 'kg',
      durum: 'AKTIF' as const,
    },
    {
      ad: 'SİVRİ',
      kategori: 'Sebze',
      birim: 'kg',
      durum: 'AKTIF' as const,
    },
    {
      ad: 'DOLMA',
      kategori: 'Sebze',
      birim: 'kg',
      durum: 'AKTIF' as const,
    },
    {
      ad: 'ÜÇBURUN',
      kategori: 'Sebze',
      birim: 'kg',
      durum: 'AKTIF' as const,
    },
    {
      ad: 'ÇARLİ',
      kategori: 'Sebze',
      birim: 'kg',
      durum: 'AKTIF' as const,
    },
    {
      ad: 'SALKIM KOK',
      kategori: 'Sebze',
      birim: 'kg',
      durum: 'AKTIF' as const,
    },
  ]

  for (const urunData of urunler) {
    try {
      await prisma.urun.create({
        data: urunData,
      })
      console.log(`Ürün oluşturuldu:`, urunData.ad)
    } catch (error) {
      console.log(`Ürün zaten mevcut:`, urunData.ad)
    }
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
    try {
      await prisma.ambalaj.create({
        data: ambalajData,
      })
      console.log(`Ambalaj oluşturuldu:`, ambalajData.ad)
    } catch (error) {
      console.log(`Ambalaj zaten mevcut:`, ambalajData.ad)
    }
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
