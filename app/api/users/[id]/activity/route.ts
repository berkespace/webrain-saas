import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

// GET /api/users/[id]/activity - list recent activity logs (ADMIN only)
export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions)
  if (!session?.user || (session.user as any).role !== 'ADMIN') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const id = params.id
  const logs = await prisma.user_activity_logs.findMany({
    where: { userId: id },
    orderBy: { createdAt: 'desc' },
    take: 50,
  })
  return NextResponse.json(logs)
}


