'use client'

import { useSession, signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Package, Users, FileText, Settings, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { DashboardLayout } from '@/components/layout/dashboard-layout'

export default function DashboardPage() {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login')
    }
  }, [status, router])

  // Roazlı yönlendirme
  useEffect(() => {
    if (session?.user && status === 'authenticated') {
      const userRole = (session.user as any)?.role
      
      // Mal kabulcü ise direkt mal kabul dashboard'ına yönlendir
      if (userRole === 'MAL_KABULCU') {
        router.push('/dashboard/mal-kabul')
      }
      // Diğer roller için bu sayfada kal
    }
  }, [session, status, router])

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Yükleniyor...</p>
        </div>
      </div>
    )
  }

  if (!session) {
    return null
  }

  const userRole = (session.user as any)?.role

  return (
    <DashboardLayout>
      <div className="p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">WEBRAIN Dashboard</h1>
            <p className="text-muted-foreground">Hoş geldiniz, {session.user?.name}</p>
            <p className="text-sm text-primary font-medium capitalize">
              Rol: {userRole?.toLowerCase().replace('_', ' ')}
            </p>
          </div>
        </div>

        {/* User Info Card */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Kullanıcı Bilgileri</CardTitle>
            <CardDescription>Hesap detaylarınız</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Ad Soyad</p>
                <p className="font-medium">{session.user?.name}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">E-posta</p>
                <p className="font-medium">{session.user?.email}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Rol</p>
                <p className="font-medium capitalize">{(session.user as any)?.role?.toLowerCase().replace('_', ' ')}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Role-based Navigation */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Mal Kabul Dashboard */}
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="h-5 w-5" />
                Mal Kabul
              </CardTitle>
              <CardDescription>Mal kabul işlemleri ve takibi</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Yeni mal kabul kayıtları, fiş yazdırma, komisyoncu takibi</p>
                <Link href="/dashboard/mal-kabul">
                  <Button className="w-full" size="sm">
                    Mal Kabul Dashboard
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Satın Alma Dashboard */}
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Satın Alma
              </CardTitle>
              <CardDescription>Faturalandırma ve satın alma işlemleri</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Fiyat girişi, fatura oluşturma, ödeme takibi</p>
                <Button className="w-full" size="sm" variant="outline" disabled>
                  Yakında
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Muhasebe Dashboard */}
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Muhasebe
              </CardTitle>
              <CardDescription>Finansal raporlar ve muhasebe işlemleri</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Günlük raporlar, finansal analiz, ödeme takibi</p>
                <Button className="w-full" size="sm" variant="outline" disabled>
                  Yakında
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Admin Panel */}
          {userRole === 'ADMIN' && (
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  Admin Panel
                </CardTitle>
                <CardDescription>Sistem yönetimi ve ayarlar</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">Kullanıcı yönetimi, sistem ayarları, raporlar</p>
                  <Button className="w-full" size="sm" variant="outline" disabled>
                    Yakında
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Quick Stats */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Toplam İşlem</p>
                  <p className="text-2xl font-bold">1,234</p>
                </div>
                <Package className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Bekleyen Faturalar</p>
                  <p className="text-2xl font-bold text-orange-500">12</p>
                </div>
                <FileText className="h-8 w-8 text-orange-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Aktif Kullanıcı</p>
                  <p className="text-2xl font-bold text-green-500">8</p>
                </div>
                <Users className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
}
