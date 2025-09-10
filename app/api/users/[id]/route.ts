import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

// PATCH /api/users/[id] - update user (ADMIN only)
export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions)
  if (!session?.user || (session.user as any).role !== 'ADMIN') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  const id = params.id
  const body = await req.json()
  const data: any = {}
  const allowed = ['firstName','lastName','email','password','role','contactEmail','phone','gender','birthDate']
  for (const key of allowed) {
    if (key in body) {
      data[key] = key === 'birthDate' && body[key] ? new Date(body[key]) : body[key]
    }
  }
  if (data.password) {
    // Placeholder hashing (use bcrypt in production)
    data.password = data.password
  }
  data.updatedAt = new Date()
  try {
    await prisma.users.update({ where: { id }, data })
    await prisma.user_activity_logs.create({
      data: {
        userId: id,
        action: 'USER_UPDATE',
        metadata: data as any,
      },
    })
    return NextResponse.json({ ok: true })
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}

// DELETE /api/users/[id] - delete user (ADMIN only)
export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions)
  if (!session?.user || (session.user as any).role !== 'ADMIN') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  const id = params.id
  try {
    await prisma.users.delete({ where: { id } })
    await prisma.user_activity_logs.create({
      data: {
        userId: id,
        action: 'USER_DELETE',
      },
    })
    return NextResponse.json({ ok: true })
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}


