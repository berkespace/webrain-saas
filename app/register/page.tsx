'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Eye, EyeOff, Mail, Lock, User, ArrowLeft } from 'lucide-react'
import { ThemeToggle } from '@/components/theme-toggle'
import { useTheme } from 'next-themes'
import BlurText from '@/components/blocks/TextAnimations/BlurText/BlurText'
import Aurora from '@/components/blocks/Backgrounds/Aurora/Aurora'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'MAL_KABULCU'
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [mounted, setMounted] = useState(false)
  const { theme, resolvedTheme } = useTheme()
  const router = useRouter()

  useState(() => {
    setMounted(true)
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    // Validation
    if (formData.password !== formData.confirmPassword) {
      setError('Şifreler eşleşmiyor')
      setLoading(false)
      return
    }

    if (formData.password.length < 6) {
      setError('Şifre en az 6 karakter olmalıdır')
      setLoading(false)
      return
    }

    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          password: formData.password,
          role: formData.role
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.error || 'Kayıt olurken bir hata oluştu')
        setLoading(false)
        return
      }

      // Success - redirect to login
      router.push('/login?message=Kayıt başarılı! Giriş yapabilirsiniz.')
    } catch (error) {
      setError('Sunucu hatası oluştu')
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  // Tema değişikliğine göre logo seçimi
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
                    text="Kayıt Ol"
                    delay={150}
                    animateBy="words"
                    direction="top"
                    className="text-2xl mb-5"
                  />
                </div>
              </CardTitle>
              <CardDescription className="text-muted-foreground">
                WEBRAIN hesabınızı oluşturun
              </CardDescription>
            </div>
          </CardHeader>
          
          <CardContent>
            {error && (
              <div className="mb-4 p-3 bg-destructive/10 border border-destructive/20 rounded-md text-destructive text-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName" className="text-card-foreground">
                    Ad
                  </Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="firstName"
                      type="text"
                      placeholder="Adınız"
                      value={formData.firstName}
                      onChange={(e) => handleInputChange('firstName', e.target.value)}
                      className="pl-10 bg-background border-border text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-primary/20"
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="lastName" className="text-card-foreground">
                    Soyad
                  </Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="lastName"
                      type="text"
                      placeholder="Soyadınız"
                      value={formData.lastName}
                      onChange={(e) => handleInputChange('lastName', e.target.value)}
                      className="pl-10 bg-background border-border text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-primary/20"
                      required
                    />
                  </div>
                </div>
              </div>

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
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="pl-10 bg-background border-border text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-primary/20"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="role" className="text-card-foreground">
                  Kullanıcı Rolü
                </Label>
                <select
                  id="role"
                  value={formData.role}
                  onChange={(e) => handleInputChange('role', e.target.value)}
                  className="w-full px-3 py-2 bg-background border border-border text-foreground rounded-md focus:border-primary focus:ring-primary/20"
                  required
                >
                  <option value="MAL_KABULCU">Mal Kabulcü</option>
                  <option value="MUHASEBE">Muhasebe</option>
                  <option value="SATIN_ALMACI">Satın Almacı</option>
                  <option value="ADMIN">Admin</option>
                </select>
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
                    value={formData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
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

              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-card-foreground">
                  Şifre Tekrar
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    value={formData.confirmPassword}
                    onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                    className="pl-10 pr-10 bg-background border-border text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-primary/20"
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-muted text-muted-foreground hover:text-primary"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>
              
              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium py-2 shadow-lg shadow-primary/20 disabled:opacity-50"
              >
                {loading ? 'Kayıt Olunuyor...' : 'Kayıt Ol'}
              </Button>
            </form>
            
            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground">
                Zaten hesabınız var mı?{' '}
                <Link href="/login" className="text-primary hover:text-primary/80">
                  Giriş yap
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
