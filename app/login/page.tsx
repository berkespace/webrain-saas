'use client'

import { useState, useEffect, Suspense } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Eye, EyeOff, Mail, Lock } from 'lucide-react'
import { ThemeToggle } from '@/components/theme-toggle'
import { useTheme } from 'next-themes'
import BlurText from '@/components/blocks/TextAnimations/BlurText/BlurText'
import Aurora from '@/components/blocks/Backgrounds/Aurora/Aurora'
import { signIn, getSession } from 'next-auth/react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'

function LoginContent() {
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [mounted, setMounted] = useState(false)
  const { theme, resolvedTheme } = useTheme()
  const router = useRouter()
  const searchParams = useSearchParams()
  const message = searchParams.get('message')

  useEffect(() => {
    setMounted(true)
    // Check if user is already logged in
    getSession().then((session) => {
      if (session) {
        router.push('/dashboard')
      }
    })
  }, [router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      })

      if (result?.error) {
        setError('E-posta veya şifre hatalı')
        setLoading(false)
        return
      }

      if (result?.ok) {
        router.push('/dashboard')
      }
    } catch (error) {
      setError('Giriş yapılırken bir hata oluştu')
      setLoading(false)
    }
  }

  // Tema değişikliğine göre logo seçimi - mounted kontrolü ile
  const logoSrc = mounted && (resolvedTheme === 'dark' || theme === 'dark') ? '/logo.png' : '/logo-dark.png'

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4 relative">
      {/* Aurora Background Animation */}
      <div className="absolute inset-0 z-0">
        <Aurora />
      </div>
      
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md relative z-10"
      >
        <Card className="bg-card border-border shadow-2xl shadow-primary/20 relative">
          {/* Theme Toggle Button - Formun sağ üst köşesinde */}
          <div className="absolute top-4 right-4 z-10">
            <ThemeToggle />
          </div>
          
          <CardHeader className="space-y-6 text-center">
            <div className="flex justify-center">
              <Image
                src={logoSrc}
                alt="WEBRAIN Logo"
                width={300}
                height={90}
                className="h-45 w-auto -mb-20"
                priority
              />
            </div>
            <div className="space-y-2">
              <CardTitle className="text-2xl font-bold text-card-foreground">
                <div className="flex justify-center w-full">
                  <BlurText
                    text="Hoş Geldiniz"
                    delay={150}
                    animateBy="words"
                    direction="top"
                    className="text-2xl mb-5"
                  />
                </div>
              </CardTitle>
              <CardDescription className="text-muted-foreground">
                Hesabınıza giriş yapın
              </CardDescription>
            </div>
          </CardHeader>
          
          <CardContent>
            {message && (
              <div className="mb-4 p-3 bg-green-500/10 border border-green-500/20 rounded-md text-green-500 text-sm">
                {message}
              </div>
            )}

            {error && (
              <div className="mb-4 p-3 bg-destructive/10 border border-destructive/20 rounded-md text-destructive text-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-card-foreground">
                  E-posta Adresi
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="ornek@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 bg-background border-border text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-primary/20"
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password" className="text-card-foreground">
                  Şifre
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 pr-10 bg-background border-border text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-primary/20"
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-muted text-muted-foreground hover:text-primary"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="remember"
                    className="rounded border-border bg-background text-primary focus:ring-primary"
                  />
                  <Label htmlFor="remember" className="text-sm text-muted-foreground">
                    Beni hatırla
                  </Label>
                </div>
                <Button
                  type="button"
                  variant="link"
                  className="text-sm text-primary hover:text-primary/80 p-0"
                >
                  Şifremi unuttum
                </Button>
              </div>
              
              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium py-2 shadow-lg shadow-primary/20 disabled:opacity-50"
              >
                {loading ? 'Giriş Yapılıyor...' : 'Giriş Yap'}
              </Button>
            </form>
            
            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground">
                Hesabınız yok mu?{' '}
                <Link href="/register" className="text-primary hover:text-primary/80">
                  Kayıt ol
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LoginContent />
    </Suspense>
  )
}
