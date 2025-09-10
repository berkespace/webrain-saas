import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    // Basit veritabanı bağlantı testi
    await prisma.$queryRaw`SELECT 1`
    
    // Kullanıcı sayısını kontrol et
    const userCount = await prisma.users.count()
    
    return NextResponse.json({
      status: 'success',
      message: 'Veritabanı bağlantısı başarılı',
      userCount,
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    console.error('Database test error:', error)
    return NextResponse.json({
      status: 'error',
      message: `Veritabanı hatası: ${(error as Error).message}`,
      timestamp: new Date().toISOString()
    }, { status: 500 })
  }
}
