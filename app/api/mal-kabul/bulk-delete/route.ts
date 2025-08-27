import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Oturum açmanız gerekiyor" }, { status: 401 })
    }

    const { ids } = await request.json()
    if (!Array.isArray(ids) || ids.length === 0) {
      return NextResponse.json({ error: "Geçerli id listesi gönderin" }, { status: 400 })
    }

    await prisma.mal_kabul_records.deleteMany({ where: { id: { in: ids } } })

    return NextResponse.json({ message: "Seçili kayıtlar silindi" })
  } catch (error) {
    console.error("Toplu silme hatası:", error)
    return NextResponse.json({ error: "Toplu silme sırasında hata oluştu" }, { status: 500 })
  }
}
