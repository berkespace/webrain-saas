import { PrismaClient } from '../prisma/generated/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Basit seed script başlatılıyor...')

  // Komisyoncu ekle
  const komisyoncu = await prisma.komisyoncular.upsert({
    where: { id: 'kom-001' },
    update: {},
    create: {
      id: 'kom-001',
      dukkanAdi: 'Test Komisyoncu',
      komisyonNo: 'K001',
      komisyonKodu: 'K001',
      sehir: 'İstanbul',
      durum: 'AKTIF'
    }
  })
  console.log('✅ Komisyoncu oluşturuldu:', komisyoncu.dukkanAdi)

  // Üretici ekle
  const uretici = await prisma.ureticiler.upsert({
    where: { id: 'ur-001' },
    update: {},
    create: {
      id: 'ur-001',
      ad: 'Test',
      soyad: 'Üretici',
      cinsiyet: 'ERKEK',
      dogumTarihi: new Date('1990-01-01'),
      sehir: 'İstanbul',
      durum: 'AKTIF'
    }
  })
  console.log('✅ Üretici oluşturuldu:', uretici.ad + ' ' + uretici.soyad)

  // Özel firma ekle
  const ozelFirma = await prisma.ozel_firmalar.upsert({
    where: { id: 'of-001' },
    update: {},
    create: {
      id: 'of-001',
      firmaAdi: 'Test Özel Firma',
      firmaNo: 'OF001',
      sehir: 'İstanbul',
      durum: 'AKTIF'
    }
  })
  console.log('✅ Özel firma oluşturuldu:', ozelFirma.firmaAdi)

  // Ürün ekle
  const urun = await prisma.urunler.upsert({
    where: { id: 'urun-001' },
    update: {},
    create: {
      id: 'urun-001',
      ad: 'Test Ürün',
      stokKodu: 'TU001',
      birim: 'KG',
      durum: 'AKTIF'
    }
  })
  console.log('✅ Ürün oluşturuldu:', urun.ad)

  // Ambalaj ekle
  const ambalaj = await prisma.ambalajlar.upsert({
    where: { id: 'amb-001' },
    update: {},
    create: {
      id: 'amb-001',
      ad: 'Test Ambalaj',
      tipi: 'KASA',
      daraKg: 5,
      aciklama: 'Test ambalaj açıklaması',
      durum: 'AKTIF'
    }
  })
  console.log('✅ Ambalaj oluşturuldu:', ambalaj.ad)

  console.log('🎉 Tüm test verileri başarıyla oluşturuldu!')
}

main()
  .catch((e) => {
    console.error('❌ Seed hatası:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
