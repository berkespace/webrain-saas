import CredentialsProvider from "next-auth/providers/credentials"
import { prisma } from "@/lib/prisma"
import bcrypt from "bcryptjs"
import { NextAuthOptions } from "next-auth"

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        try {
          const user = await prisma.users.findUnique({
            where: {
              email: credentials.email
            }
          })

          if (!user) {
            return null
          }

          const isPasswordValid = await bcrypt.compare(credentials.password, user.password)

          if (!isPasswordValid) {
            return null
          }

          return {
            id: user.id,
            email: user.email,
            name: `${user.firstName} ${user.lastName}`,
            role: user.role,
          }
        } catch (error) {
          console.error('Authorization error:', error)
          return null
        }
      }
    })
  ],
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60, // 24 saat
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user && 'role' in user) {
        token.role = user.role
      }
      return token
    },
    async session({ session, token }) {
      if (token && 'role' in token && session.user) {
        session.user.role = token.role
      }
      return session
    }
  },
  events: {
    async signIn({ user }) {
      try {
        // user can be DefaultUser or JWT; ensure id present via lookup
        const dbUser = await prisma.users.findUnique({ where: { email: (user as any).email! }, select: { id: true } })
        if (dbUser) {
          await prisma.users.update({ where: { id: dbUser.id }, data: { lastLoginAt: new Date() } })
          await prisma.user_activity_logs.create({ data: { userId: dbUser.id, action: 'LOGIN' } })
        }
      } catch (e) {
        console.warn('signIn event log failed')
      }
    },
    async signOut({ token }) {
      try {
        if (token?.email) {
          const dbUser = await prisma.users.findUnique({ where: { email: token.email as string }, select: { id: true } })
          if (dbUser) {
            await prisma.users.update({ where: { id: dbUser.id }, data: { lastLogoutAt: new Date() } })
            await prisma.user_activity_logs.create({ data: { userId: dbUser.id, action: 'LOGOUT' } })
          }
        }
      } catch (e) {
        console.warn('signOut event log failed')
      }
    },
  },
  pages: {
    signIn: '/login',
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === 'development',
  logger: {
    error(code, metadata) {
      console.error('NextAuth Error:', code, metadata)
    },
    warn(code) {
      console.warn('NextAuth Warning:', code)
    },
    debug(code, metadata) {
      if (process.env.NODE_ENV === 'development') {
        console.log('NextAuth Debug:', code, metadata)
      }
    }
  },
}
