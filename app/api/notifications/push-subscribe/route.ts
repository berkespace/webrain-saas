import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

// Push notification subscription kaydet
export async function POST(request: NextRequest) {
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

    const body = await request.json()
    const { endpoint, keys, userAgent } = body

    if (!endpoint || !keys?.p256dh || !keys?.auth) {
      return NextResponse.json({ error: 'Invalid subscription data' }, { status: 400 })
    }

    // Mevcut subscription'ı kontrol et
    const existingSubscription = await prisma.push_subscriptions.findFirst({
      where: {
        userId: user.id,
        endpoint,
      },
    })

    if (existingSubscription) {
      // Mevcut subscription'ı güncelle
      await prisma.push_subscriptions.update({
        where: { id: existingSubscription.id },
        data: {
          p256dhKey: keys.p256dh,
          authKey: keys.auth,
          userAgent,
          isActive: true,
          updatedAt: new Date(),
        },
      })
    } else {
      // Yeni subscription oluştur
      await prisma.push_subscriptions.create({
        data: {
          userId: user.id,
          endpoint,
          p256dhKey: keys.p256dh,
          authKey: keys.auth,
          userAgent,
          isActive: true,
        },
      })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Push subscription error:', error)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}

// Push notification subscription'ı kaldır
export async function DELETE(request: NextRequest) {
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

    const body = await request.json()
    const { endpoint } = body

    await prisma.push_subscriptions.updateMany({
      where: {
        userId: user.id,
        endpoint,
      },
      data: {
        isActive: false,
        updatedAt: new Date(),
      },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Push unsubscribe error:', error)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
