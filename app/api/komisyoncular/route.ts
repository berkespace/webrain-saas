import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

// GET - Tüm komisyoncuları listele
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const search = searchParams.get('search')
    const status = searchParams.get('status')

    // Filtreleme koşulları
    const where: any = {}

    if (search) {
      where.OR = [
        { dukkanAdi: { contains: search, mode: 'insensitive' } },
        { sehir: { contains: search, mode: 'insensitive' } },
        { komisyonNo: { contains: search } }
      ]
    }

    if (status && status !== 'all') {
      where.durum = status
    }

    const komisyoncular = await prisma.komisyoncu.findMany({
      where,
      orderBy: {
        createdAt: 'desc'
      }
    })

    return NextResponse.json(komisyoncular)
  } catch (error) {
    console.error("Komisyoncu listesi hatası:", error)
    return NextResponse.json(
      { error: "Komisyoncu listesi alınırken hata oluştu" },
      { status: 500 }
    )
  }
}
