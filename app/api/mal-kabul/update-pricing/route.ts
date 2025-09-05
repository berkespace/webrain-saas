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
    if (!['SATIN_ALMACI', 'MUHASEBECI', 'ADMIN'].includes(session.user.role)) {
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

    // Toplam fiyatı hesapla
    let toplamFiyat = alisFiyati
    if (kdvHesapla) {
      toplamFiyat += (alisFiyati * kdvOrani) / 100
    }
    if (belediyeRusumHesapla) {
      toplamFiyat += (alisFiyati * belediyeRusumOrani) / 100
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

    // Veritabanını güncelle
    const updatedRecord = await prisma.malKabulRecord.update({
      where: { id: recordId },
      data: {
        birimFiyat: alisFiyati,
        toplamFiyat: toplamFiyat,
        kdvOrani: kdvOrani,
        belediyeRusumOrani: belediyeRusumOrani,
        kdvHesapla: kdvHesapla,
        belediyeRusumHesapla: belediyeRusumHesapla,
        notlar: notlar,
        evraklar: uploadedFiles.length > 0 ? uploadedFiles : undefined,
        fiyatGirildi: true,
        fiyatGirenKullanici: session.user.id,
        fiyatGirilmeTarihi: new Date()
      }
    })

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
