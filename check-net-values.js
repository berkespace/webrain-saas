const { PrismaClient } = require('./prisma/generated/client')

const prisma = new PrismaClient()

async function checkNetValues() {
  try {
    console.log('Mal kabul kayıtları kontrol ediliyor...')
    
    const records = await prisma.mal_kabul_records.findMany({
      where: {
        status: 'NETLENDI'
      },
      include: {
        urunler: true
      },
      take: 5
    })
    
    console.log(`Toplam ${records.length} kayıt bulundu:`)
    
    records.forEach((record, index) => {
      console.log(`\n--- Kayıt ${index + 1} ---`)
      console.log('ID:', record.id)
      console.log('Fiş No:', record.fisNo)
      console.log('Ürün:', record.urunler.adi)
      console.log('Ürün Birimi:', record.urunler.birim)
      console.log('Giriş KG:', record.girisKg)
      console.log('Giriş Adet:', record.girisAdet)
      console.log('Çıkma KG:', record.cikmaKg)
      console.log('Çıkma Adet:', record.cikmaAdet)
      console.log('Fire KG:', record.fireKg)
      console.log('Fire Adet:', record.fireAdet)
      console.log('Net KG:', record.netKg)
      console.log('Net Adet:', record.netAdet)
      console.log('Durum:', record.status)
    })
    
  } catch (error) {
    console.error('Hata:', error)
  } finally {
    await prisma.$disconnect()
  }
}

checkNetValues()
