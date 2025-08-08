'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { 
  Package, 
  Users, 
  FileText, 
  Settings, 
  ArrowRight, 
  Plus, 
  Search, 
  Clock, 
  CheckCircle, 
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Calendar,
  BarChart3,
  Activity
} from 'lucide-react'
import Link from 'next/link'
import { DashboardLayout } from '@/components/layout/dashboard-layout'

interface DashboardStats {
  totalRecords: number
  pendingRecords: number
  completedRecords: number
  todayRecords: number
  totalKg: number
  totalValue: number
  monthlyGrowth: number
  weeklyGrowth: number
}

interface RecentActivity {
  id: string
  type: 'MAL_KABUL' | 'FATURA' | 'ODEME'
  title: string
  description: string
  timestamp: string
  status: 'SUCCESS' | 'PENDING' | 'ERROR'
}

export default function DashboardPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [stats, setStats] = useState<DashboardStats>({
    totalRecords: 0,
    pendingRecords: 0,
    completedRecords: 0,
    todayRecords: 0,
    totalKg: 0,
    totalValue: 0,
    monthlyGrowth: 0,
    weeklyGrowth: 0
  })
  const [recentActivity, setRecentActivity] = useState<RecentActivity[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login')
    }
  }, [status, router])

  useEffect(() => {
    if (session?.user) {
      fetchDashboardData()
    }
  }, [session])

  const fetchDashboardData = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/mal-kabul?limit=1000')
      if (response.ok) {
        const data = await response.json()
        const records = data.records || []
        
        const today = new Date().toISOString().split('T')[0]
        const lastMonth = new Date()
        lastMonth.setMonth(lastMonth.getMonth() - 1)
        const lastWeek = new Date()
        lastWeek.setDate(lastWeek.getDate() - 7)
        
        const todayRecords = records.filter((r: any) => r.tarih === today)
        const lastMonthRecords = records.filter((r: any) => new Date(r.tarih) >= lastMonth)
        const lastWeekRecords = records.filter((r: any) => new Date(r.tarih) >= lastWeek)
        
        const totalKg = records.reduce((sum: number, r: any) => sum + (r.netKg || 0), 0)
        const totalValue = records.reduce((sum: number, r: any) => sum + (r.toplamFiyat || 0), 0)
        
        setStats({
          totalRecords: records.length,
          pendingRecords: records.filter((r: any) => r.status === 'FATURA_BEKLIYOR').length,
          completedRecords: records.filter((r: any) => r.status === 'TAMAMLANDI').length,
          todayRecords: todayRecords.length,
          totalKg: Math.round(totalKg),
          totalValue: Math.round(totalValue),
          monthlyGrowth: lastMonthRecords.length > 0 ? ((todayRecords.length - lastMonthRecords.length) / lastMonthRecords.length) * 100 : 0,
          weeklyGrowth: lastWeekRecords.length > 0 ? ((todayRecords.length - lastWeekRecords.length) / lastWeekRecords.length) * 100 : 0
        })

        // Mock recent activity
        setRecentActivity([
          {
            id: '1',
            type: 'MAL_KABUL',
            title: 'Yeni Mal Kabul Kaydı',
            description: 'SİLÖR ürünü için yeni kayıt oluşturuldu',
            timestamp: new Date().toISOString(),
            status: 'SUCCESS'
          },
          {
            id: '2',
            type: 'FATURA',
            title: 'Fatura Oluşturuldu',
            description: 'CİHAN TARIM için fatura oluşturuldu',
            timestamp: new Date(Date.now() - 3600000).toISOString(),
            status: 'PENDING'
          },
          {
            id: '3',
            type: 'ODEME',
            title: 'Ödeme Alındı',
            description: 'DURDAŞLAR komisyoncusundan ödeme alındı',
            timestamp: new Date(Date.now() - 7200000).toISOString(),
            status: 'SUCCESS'
          }
        ])
      }
    } catch (error) {
      console.error('Dashboard veri getirme hatası:', error)
    } finally {
      setLoading(false)
    }
  }

  if (status === 'loading' || loading) {
    return (
      <DashboardLayout>
        <div className="min-h-screen bg-background flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-muted-foreground">Dashboard yükleniyor...</p>
          </div>
        </div>
      </DashboardLayout>
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
            <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
            <p className="text-muted-foreground">
              Hoş geldiniz, {session.user?.name}! Bugün nasıl gidiyor?
            </p>
          </div>
          <div className="flex gap-3">
            <Button asChild>
              <Link href="/dashboard/mal-kabul/yeni">
                <Plus className="mr-2 h-4 w-4" />
                Yeni Mal Kabul
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/dashboard/raporlar">
                <BarChart3 className="mr-2 h-4 w-4" />
                Raporlar
              </Link>
            </Button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Toplam Kayıt</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalRecords.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                {stats.monthlyGrowth > 0 ? '+' : ''}{stats.monthlyGrowth.toFixed(1)}% geçen aya göre
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Bekleyen İşlemler</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">{stats.pendingRecords}</div>
              <p className="text-xs text-muted-foreground">
                Faturalandırılmayı bekleyen kayıtlar
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Toplam KG</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalKg.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                {stats.weeklyGrowth > 0 ? '+' : ''}{stats.weeklyGrowth.toFixed(1)}% geçen haftaya göre
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Toplam Değer</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₺{stats.totalValue.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                Tüm işlemlerin toplam değeri
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <Link href="/dashboard/mal-kabul">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Package className="h-5 w-5" />
                  Mal Kabul Yönetimi
                </CardTitle>
                <CardDescription>
                  Mal kabul kayıtlarını görüntüle ve yönet
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold">{stats.totalRecords}</span>
                  <ArrowRight className="h-4 w-4 text-muted-foreground" />
                </div>
              </CardContent>
            </Link>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <Link href="/dashboard/raporlar">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Raporlar
                </CardTitle>
                <CardDescription>
                  Detaylı analiz ve raporları görüntüle
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold">4</span>
                  <ArrowRight className="h-4 w-4 text-muted-foreground" />
                </div>
              </CardContent>
            </Link>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <Link href="/dashboard/satin-alma">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Satın Alma
                </CardTitle>
                <CardDescription>
                  Fiyat girişi ve fatura işlemleri
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold">{stats.pendingRecords}</span>
                  <ArrowRight className="h-4 w-4 text-muted-foreground" />
                </div>
              </CardContent>
            </Link>
          </Card>
        </div>

        {/* Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5" />
                Son Aktiviteler
              </CardTitle>
              <CardDescription>
                Sistemdeki son işlemler
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-center gap-4">
                    <div className={`w-2 h-2 rounded-full ${
                      activity.status === 'SUCCESS' ? 'bg-green-500' :
                      activity.status === 'PENDING' ? 'bg-orange-500' : 'bg-red-500'
                    }`} />
                    <div className="flex-1">
                      <p className="text-sm font-medium">{activity.title}</p>
                      <p className="text-xs text-muted-foreground">{activity.description}</p>
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {new Date(activity.timestamp).toLocaleTimeString('tr-TR', {
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Bugünkü İşlemler
              </CardTitle>
              <CardDescription>
                Bugün tamamlanan işlemler
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Yeni Mal Kabul</span>
                  <span className="text-sm font-medium">{stats.todayRecords}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Tamamlanan İşlemler</span>
                  <span className="text-sm font-medium">{stats.completedRecords}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Bekleyen İşlemler</span>
                  <span className="text-sm font-medium text-orange-600">{stats.pendingRecords}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
}
