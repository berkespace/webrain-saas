import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '../../../prisma/generated/client'

const prisma = new PrismaClient()

export async function POST(request: NextRequest) {
  try {
    console.log('🚀 Neon veritabanı migration API çağrıldı')
    
    // Veritabanı bağlantısını test et
    await prisma.$connect()
    console.log('✅ Veritabanı bağlantısı başarılı')
    
    // Migration işlemi - Gerçek Prisma migration
    console.log('📋 Database schema migration başlıyor...')
    
    // Prisma db push ile schema'yı uygula (migration olmadan)
    console.log('🏗️ Schema veritabanına uygulanıyor...')
    
    // Manuel olarak tüm tabloları oluştur
    console.log('🏗️ Manuel tablo oluşturma başlıyor...')
    
    // Users tablosu
    await prisma.$executeRaw`CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      "firstName" TEXT NOT NULL,
      "lastName" TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      role TEXT NOT NULL DEFAULT 'MAL_KABULCU',
      "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )`
    
    // Komisyoncular tablosu
    await prisma.$executeRaw`CREATE TABLE IF NOT EXISTS komisyoncular (
      id TEXT PRIMARY KEY,
      "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      "dukkanAdi" TEXT NOT NULL,
      durum TEXT NOT NULL DEFAULT 'AKTIF',
      "komisyonNo" TEXT UNIQUE NOT NULL,
      "komisyonKodu" TEXT UNIQUE NOT NULL,
      sehir TEXT NOT NULL,
      vkn TEXT,
      "yetkiliAdi" TEXT,
      "yetkiliTelefon" TEXT
    )`
    
    // Ozel firmalar tablosu
    await prisma.$executeRaw`CREATE TABLE IF NOT EXISTS ozel_firmalar (
      id TEXT PRIMARY KEY,
      "firmaAdi" TEXT NOT NULL,
      "firmaNo" TEXT UNIQUE NOT NULL,
      vkn TEXT,
      "vergiDairesi" TEXT,
      "yetkiliAdi" TEXT,
      "yetkiliTelefon" TEXT,
      sehir TEXT NOT NULL,
      adres TEXT,
      durum TEXT NOT NULL DEFAULT 'AKTIF',
      "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )`
    
    // Urunler tablosu
    await prisma.$executeRaw`CREATE TABLE IF NOT EXISTS urunler (
      id TEXT PRIMARY KEY,
      ad TEXT NOT NULL,
      "stokKodu" TEXT UNIQUE NOT NULL,
      kategori TEXT,
      birim TEXT NOT NULL,
      durum TEXT NOT NULL DEFAULT 'AKTIF',
      "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )`
    
    // Mustahsil tablosu
    await prisma.$executeRaw`CREATE TABLE IF NOT EXISTS mustahsil (
      id TEXT PRIMARY KEY,
      ad TEXT NOT NULL,
      soyad TEXT NOT NULL,
      "dogumTarihi" TIMESTAMP NOT NULL,
      "tcKimlikNo" TEXT UNIQUE NOT NULL,
      "mustahsilNo" TEXT UNIQUE NOT NULL,
      iletisim TEXT,
      "bankaAdi" TEXT,
      "ibanAdresi" TEXT,
      adres TEXT,
      cinsiyet TEXT NOT NULL,
      durum TEXT NOT NULL DEFAULT 'AKTIF',
      "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )`
    
    // Ureticiler tablosu
    await prisma.$executeRaw`CREATE TABLE IF NOT EXISTS ureticiler (
      id TEXT PRIMARY KEY,
      ad TEXT NOT NULL,
      "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      cinsiyet TEXT NOT NULL,
      "dogumTarihi" TIMESTAMP,
      iletisim TEXT,
      "komisyoncuId" TEXT,
      sehir TEXT NOT NULL,
      soyad TEXT NOT NULL,
      "tcNo" TEXT,
      durum TEXT NOT NULL DEFAULT 'AKTIF'
    )`
    
    // Ambalajlar tablosu
    await prisma.$executeRaw`CREATE TABLE IF NOT EXISTS ambalajlar (
      id TEXT PRIMARY KEY,
      ad TEXT NOT NULL,
      tipi TEXT NOT NULL,
      "daraKg" REAL NOT NULL,
      aciklama TEXT,
      durum TEXT NOT NULL DEFAULT 'AKTIF',
      "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )`
    
    // Mal kabul records tablosu
    await prisma.$executeRaw`CREATE TABLE IF NOT EXISTS "malKabulRecords" (
      id TEXT PRIMARY KEY,
      "fisNo" TEXT NOT NULL,
      tarih TIMESTAMP NOT NULL,
      "saticiTipi" TEXT NOT NULL,
      "saticiId" TEXT NOT NULL,
      "urunId" TEXT NOT NULL,
      "ureticiId" TEXT NOT NULL,
      "ambalajId" TEXT NOT NULL,
      "brutKg" REAL NOT NULL,
      "daraKg" REAL NOT NULL,
      "girisKg" REAL NOT NULL,
      "cikmaKg" REAL NOT NULL DEFAULT 0,
      "fireKg" REAL NOT NULL DEFAULT 0,
      "netKg" REAL NOT NULL DEFAULT 0,
      "urunDurumu" TEXT NOT NULL DEFAULT 'BEKLEMEDE',
      "userId" TEXT NOT NULL,
      "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )`
    
    console.log('✅ Tüm tablolar başarıyla oluşturuldu')
    
    return NextResponse.json({
      success: true,
      message: 'Database schema başarıyla oluşturuldu! Tüm tablolar hazır.',
      timestamp: new Date().toISOString()
    })

  } catch (error) {
    console.error('❌ Neon migration API hatası:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Database migration işlemi başarısız',
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
    message: 'Neon Database Migration API',
    usage: 'POST /api/neon-migrate to create database schema',
    endpoints: {
      POST: 'Create database schema and tables',
      GET: 'Get API information'
    }
  })
}
