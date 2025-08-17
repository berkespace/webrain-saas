import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET(request: NextRequest) {
  try {
    console.log('🔍 Veritabanı bağlantısı test ediliyor...')
    
    // Veritabanı bağlantısını test et
    await prisma.$connect()
    console.log('✅ Veritabanı bağlantısı başarılı')
    
    // Basit bir sorgu test et
    const userCount = await prisma.users.count()
    console.log('✅ Users tablosu erişilebilir, kayıt sayısı:', userCount)
    
    // Komisyoncu sayısını test et
    const komisyoncuCount = await prisma.komisyoncular.count()
    console.log('✅ Komisyoncular tablosu erişilebilir, kayıt sayısı:', komisyoncuCount)
    
    // Ürün sayısını test et
    const urunCount = await prisma.urunler.count()
    console.log('✅ Ürünler tablosu erişilebilir, kayıt sayısı:', urunCount)
    
    return NextResponse.json({
      success: true,
      message: 'Veritabanı bağlantısı başarılı',
      counts: {
        users: userCount,
        komisyoncular: komisyoncuCount,
        urunler: urunCount
      }
    })
    
  } catch (error) {
    console.error('❌ Veritabanı bağlantı hatası:', error)
    return NextResponse.json(
      { 
        success: false,
        error: 'Veritabanı bağlantı hatası',
        details: error instanceof Error ? error.message : 'Bilinmeyen hata'
      },
      { status: 500 }
    )
  } finally {
    await prisma.$disconnect()
  }
}
