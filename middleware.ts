import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Simple in-memory rate limiter (per IP, per path)
// For production, replace with Redis or a durable store
const RATE_LIMIT_WINDOW_MS = 60_000
const RATE_LIMIT_MAX = 120
const ipStore = new Map<string, { count: number; resetAt: number }>()

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (pathname.startsWith('/api')) {
    const ip = request.ip || request.headers.get('x-forwarded-for') || '127.0.0.1'
    const key = `${ip}:${pathname}`
    const now = Date.now()
    const entry = ipStore.get(key)

    if (!entry || now > entry.resetAt) {
      ipStore.set(key, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS })
    } else {
      entry.count += 1
      if (entry.count > RATE_LIMIT_MAX) {
        const res = NextResponse.json({ error: 'Rate limit aşıldı. Lütfen daha sonra tekrar deneyin.' }, { status: 429 })
        res.headers.set('Retry-After', Math.ceil((entry.resetAt - now) / 1000).toString())
        return res
      }
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/api/:path*'],
}
