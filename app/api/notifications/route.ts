import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

// Kullanıcının bildirimlerini getir
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // User ID'yi email'den al
    const user = await prisma.users.findUnique({
      where: { email: session.user.email! },
      select: { id: true }
    })

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '20')
    const isRead = searchParams.get('isRead')
    const category = searchParams.get('category')

    const skip = (page - 1) * limit

    const where: any = {
      userId: user.id,
    }

    if (isRead !== null) {
      where.isRead = isRead === 'true'
    }

    if (category) {
      where.category = category
    }

    const [notifications, total] = await Promise.all([
      prisma.notifications.findMany({
        where,
        orderBy: {
          createdAt: 'desc',
        },
        skip,
        take: limit,
      }),
      prisma.notifications.count({ where }),
    ])

    return NextResponse.json({
      notifications,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error('Notifications fetch error:', error)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}

// Yeni bildirim oluştur (admin only)
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user || (session.user as any).role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const {
      userId,
      title,
      message,
      type,
      category,
      priority,
      relatedId,
      relatedModel,
      actionUrl,
      metadata,
    } = body

    const notification = await prisma.notifications.create({
      data: {
        userId,
        title,
        message,
        type,
        category,
        priority: priority || 'NORMAL',
        relatedId,
        relatedModel,
        actionUrl,
        metadata,
      },
      include: {
        user: true,
      },
    })

    return NextResponse.json(notification)
  } catch (error) {
    console.error('Notification creation error:', error)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
