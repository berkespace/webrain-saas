import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

// GET /api/users - list users (ADMIN only)
export async function GET() {
  const session = await getServerSession(authOptions)
  if (!session?.user || (session.user as any).role !== 'ADMIN') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const users = await prisma.users.findMany({
    orderBy: { createdAt: 'desc' },
    select: {
      id: true,
      firstName: true,
      lastName: true,
      email: true,
      contactEmail: true,
      phone: true,
      role: true,
      gender: true,
      birthDate: true,
      createdAt: true,
      updatedAt: true,
      lastLoginAt: true,
      lastLogoutAt: true,
    },
  })
  return NextResponse.json(users)
}

// POST /api/users - create user (ADMIN only)
export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session?.user || (session.user as any).role !== 'ADMIN') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const body = await req.json()
  const {
    firstName,
    lastName,
    email,
    password,
    role,
    contactEmail,
    phone,
    gender,
    birthDate,
  } = body

  if (!firstName || !lastName || !email || !password || !role) {
    return NextResponse.json({ error: 'Eksik alanlar' }, { status: 400 })
  }

  // Basit hash placeholder: üretimde gerçek hashing kullanılmalı (bcrypt)
  const hashed = password

  try {
    const user = await prisma.users.create({
      data: {
        id: `user-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`,
        firstName,
        lastName,
        email,
        password: hashed,
        role,
        contactEmail: contactEmail ?? null,
        phone: phone ?? null,
        gender: gender ?? null,
        birthDate: birthDate ? new Date(birthDate) : null,
      },
      select: {
        id: true,
      },
    })
    // Aktivite logu
    await prisma.user_activity_logs.create({
      data: {
        userId: user.id,
        action: 'USER_CREATE',
        metadata: {
          firstName,
          lastName,
          email,
          role,
        } as any,
      },
    })
    return NextResponse.json({ id: user.id }, { status: 201 })
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}


