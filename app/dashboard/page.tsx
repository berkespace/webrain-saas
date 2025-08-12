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
  Activity,
  Bell,
  UserCheck,
  Building,
  Truck,
  Scale,
  Receipt,
  Calculator,
  Shield,
  Database,
  QrCode
} from 'lucide-react'
import Link from 'next/link'
import { DashboardLayout } from '@/components/layout/dashboard-layout'
import { useToast } from '@/components/ui/use-toast'
import { QRScanner } from '@/components/ui/qr-scanner'

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
  const { toast } = useToast()
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
  const [showQRScanner, setShowQRScanner] = useState(false)

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login')
    }
  }, [status, router])

  useEffect(() => {
    if (status === 'authenticated' && session?.user) {
      fetchDashboardData()
    }
  }, [status, session])

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

        // TODO: Gerçek recent activity verisi API'den gelecek
        setRecentActivity([])
      }
    } catch (error) {
      console.error('Dashboard veri getirme hatası:', error)
    } finally {
      setLoading(false)
    }
  }

  const testToast = () => {
    toast({
      title: "Test Bildirimi",
      description: "Toast notification sistemi başarıyla çalışıyor!",
      variant: "success",
    })
  }

  const handleQRScan = async (data: string) => {
    try {
      // QR kod verisini parse et
      const parts = data.split('|')
      let fisNo = data
      
      if (parts.length >= 4) {
        fisNo = parts[0]
      }
      
      // Fiş numarası ile mal kabul kaydını bul
      const response = await fetch(`/api/mal-kabul?fisNo=${fisNo}`)
      if (!response.ok) {
        throw new Error('API yanıt vermedi')
      }
      
      const result = await response.json()
      const records = result.records || []
      
      if (records.length === 0) {
        toast({
          title: "Kayıt Bulunamadı",
          description: `Fiş numarası ${fisNo} ile kayıt bulunamadı. Lütfen fiş numarasını kontrol edin.`,
          variant: "destructive",
        })
        return
      }
      
      // İlk kaydı al (fiş numarası unique olmalı)
      const record = records[0]
      
      // ID ile düzenleme ekranına git
      router.push(`/dashboard/mal-kabul/duzenle/${record.id}`)
      setShowQRScanner(false)
      
      toast({
        title: "Kayıt Bulundu",
        description: `${fisNo} fiş numaralı kayıt düzenleme ekranına yönlendiriliyorsunuz.`,
        variant: "success",
      })
      
    } catch (error) {
      console.error('QR kod tarama hatası:', error)
      toast({
        title: "Hata",
        description: "QR kod verisi işlenirken hata oluştu. Lütfen tekrar deneyin.",
        variant: "destructive",
      })
    }
  }

  if (status === 'loading') {
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

  if (loading) {
    return (
      <DashboardLayout>
        <div className="min-h-screen bg-background flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-muted-foreground">Veriler yükleniyor...</p>
          </div>
        </div>
      </DashboardLayout>
    )
  }

  if (!session) {
    return null
  }

  const userRole = (session.user as any)?.role

  // Role-based dashboard content
  const getRoleBasedContent = () => {
    switch (userRole) {
      case 'ADMIN':
        return getAdminDashboard()
      case 'MAL_KABULCU':
        return getMalKabulcuDashboard()
      case 'MUHASEBE':
        return getMuhasebeDashboard()
      case 'SATIN_ALMACI':
        return getSatinAlmaDashboard()
      default:
        return getDefaultDashboard()
    }
  }

  const getAdminDashboard = () => (
    <>
      {/* Admin Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Toplam Kullanıcı</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">Aktif kullanıcılar</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Sistem Durumu</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">100%</div>
            <p className="text-xs text-muted-foreground">Tüm sistemler çalışıyor</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Toplam Kayıt</CardTitle>
            <Database className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalRecords}</div>
            <p className="text-xs text-muted-foreground">Tüm veriler</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Günlük İşlem</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.todayRecords}</div>
            <p className="text-xs text-muted-foreground">Bugünkü işlemler</p>
          </CardContent>
        </Card>
      </div>

      {/* Admin Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <Link href="/dashboard/admin/kullanicilar">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <UserCheck className="h-5 w-5" />
                Kullanıcı Yönetimi
              </CardTitle>
              <CardDescription>
                Sistem kullanıcılarını yönet
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold">24</span>
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
                Sistem Raporları
              </CardTitle>
              <CardDescription>
                Detaylı sistem analizleri
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold">12</span>
                <ArrowRight className="h-4 w-4 text-muted-foreground" />
              </div>
            </CardContent>
          </Link>
        </Card>

        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <Link href="/dashboard/sistem-yonetimi">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Sistem Ayarları
              </CardTitle>
              <CardDescription>
                Konfigürasyon ve ayarlar
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold">8</span>
                <ArrowRight className="h-4 w-4 text-muted-foreground" />
              </div>
            </CardContent>
          </Link>
        </Card>
      </div>
    </>
  )

  const getMalKabulcuDashboard = () => (
    <>
      {/* Mal Kabulcu Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Bugünkü Kabul</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.todayRecords}</div>
            <p className="text-xs text-muted-foreground">Yeni kayıtlar</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Bekleyen İşlem</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{stats.pendingRecords}</div>
            <p className="text-xs text-muted-foreground">Fatura bekleyen</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Toplam KG</CardTitle>
            <Scale className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalKg.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Toplam ağırlık</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tamamlanan</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{stats.completedRecords}</div>
            <p className="text-xs text-muted-foreground">Tamamlanan işlemler</p>
          </CardContent>
        </Card>
          </div>

      {/* Mal Kabulcu Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <Link href="/dashboard/mal-kabul/yeni">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Plus className="h-5 w-5" />
                Yeni Mal Kabul
              </CardTitle>
              <CardDescription>
                Yeni mal kabul kaydı oluştur
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold">+</span>
                <ArrowRight className="h-4 w-4 text-muted-foreground" />
              </div>
            </CardContent>
          </Link>
        </Card>

        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <Link href="/dashboard/mal-kabul">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="h-5 w-5" />
                Mal Kabul Listesi
              </CardTitle>
              <CardDescription>
                Tüm kayıtları görüntüle
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
                Performans Raporu
              </CardTitle>
              <CardDescription>
                Kişisel performans analizi
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold">📊</span>
                <ArrowRight className="h-4 w-4 text-muted-foreground" />
              </div>
            </CardContent>
          </Link>
        </Card>
      </div>
    </>
  )

  const getMuhasebeDashboard = () => (
    <>
      {/* Muhasebe Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Toplam Ciro</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₺{stats.totalValue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Genel toplam</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Bekleyen Faturalar</CardTitle>
            <Receipt className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{stats.pendingRecords}</div>
            <p className="text-xs text-muted-foreground">Faturalanacak</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Günlük İşlem</CardTitle>
            <Calculator className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.todayRecords}</div>
            <p className="text-xs text-muted-foreground">Bugünkü işlemler</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Aylık Büyüme</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.monthlyGrowth > 0 ? '+' : ''}{stats.monthlyGrowth.toFixed(1)}%</div>
            <p className="text-xs text-muted-foreground">Geçen aya göre</p>
          </CardContent>
        </Card>
      </div>

      {/* Muhasebe Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <Link href="/dashboard/muhasebe/faturalar">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Receipt className="h-5 w-5" />
                Fatura Yönetimi
              </CardTitle>
              <CardDescription>
                Fatura oluştur ve yönet
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

        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <Link href="/dashboard/muhasebe/raporlar">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Finansal Raporlar
              </CardTitle>
              <CardDescription>
                Detaylı finansal analizler
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold">💰</span>
                <ArrowRight className="h-4 w-4 text-muted-foreground" />
              </div>
            </CardContent>
          </Link>
        </Card>

        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <Link href="/dashboard/muhasebe/odeme">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5" />
                Ödeme Takibi
              </CardTitle>
              <CardDescription>
                Ödemeleri takip et
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold">💳</span>
                <ArrowRight className="h-4 w-4 text-muted-foreground" />
              </div>
            </CardContent>
              </Link>
        </Card>
          </div>
    </>
  )

  const getSatinAlmaDashboard = () => (
    <>
      {/* Satın Alma Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Bekleyen Fiyat</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{stats.pendingRecords}</div>
            <p className="text-xs text-muted-foreground">Fiyat girilecek</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Toplam Değer</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₺{stats.totalValue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Toplam satın alma</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Günlük İşlem</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.todayRecords}</div>
            <p className="text-xs text-muted-foreground">Bugünkü işlemler</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Haftalık Büyüme</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.weeklyGrowth > 0 ? '+' : ''}{stats.weeklyGrowth.toFixed(1)}%</div>
            <p className="text-xs text-muted-foreground">Geçen haftaya göre</p>
          </CardContent>
        </Card>
        </div>

      {/* Satın Alma Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <Link href="/dashboard/satin-alma/fiyat">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Fiyat Girişi
              </CardTitle>
              <CardDescription>
                Bekleyen ürünlere fiyat gir
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

        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <Link href="/dashboard/satin-alma/tedarikci">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building className="h-5 w-5" />
                Tedarikçi Yönetimi
              </CardTitle>
              <CardDescription>
                Tedarikçileri yönet
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold">🏢</span>
                <ArrowRight className="h-4 w-4 text-muted-foreground" />
              </div>
            </CardContent>
          </Link>
        </Card>

        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <Link href="/dashboard/satin-alma/raporlar">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Satın Alma Raporu
              </CardTitle>
              <CardDescription>
                Satın alma analizleri
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold">📈</span>
                <ArrowRight className="h-4 w-4 text-muted-foreground" />
              </div>
            </CardContent>
          </Link>
        </Card>
      </div>
    </>
  )

  const getDefaultDashboard = () => (
    <>
      {/* Default Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Toplam Kayıt</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
            <div className="text-2xl font-bold">{stats.totalRecords}</div>
            <p className="text-xs text-muted-foreground">Genel toplam</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Bekleyen İşlem</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">{stats.pendingRecords}</div>
            <p className="text-xs text-muted-foreground">Bekleyen işlemler</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Toplam KG</CardTitle>
            <Scale className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalKg.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Toplam ağırlık</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Toplam Değer</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₺{stats.totalValue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Genel toplam</p>
            </CardContent>
          </Card>
        </div>

      {/* Default Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <Link href="/dashboard/mal-kabul">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Package className="h-5 w-5" />
                Mal Kabul
                </CardTitle>
                <CardDescription>
                Mal kabul işlemleri
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
                Sistem raporları
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                <span className="text-2xl font-bold">📊</span>
                  <ArrowRight className="h-4 w-4 text-muted-foreground" />
                </div>
              </CardContent>
            </Link>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <Link href="/dashboard/profil">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                <UserCheck className="h-5 w-5" />
                Profil
                </CardTitle>
                <CardDescription>
                Kullanıcı profili
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                <span className="text-2xl font-bold">👤</span>
                  <ArrowRight className="h-4 w-4 text-muted-foreground" />
                </div>
              </CardContent>
            </Link>
          </Card>
        </div>
    </>
  )

  return (
    <DashboardLayout>
      <div className="p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
            <p className="text-muted-foreground">
              Hoş geldiniz, {session.user?.name}! ({userRole})
            </p>
          </div>
          <div className="flex gap-3">
            <Button onClick={() => setShowQRScanner(true)} variant="outline">
              <QrCode className="mr-2 h-4 w-4" />
              QR Kod Tara
            </Button>
            <Button onClick={testToast} variant="outline">
              <Bell className="mr-2 h-4 w-4" />
              Toast Test
            </Button>
            <Button asChild>
              <Link href="/dashboard/mal-kabul/yeni">
                <Plus className="mr-2 h-4 w-4" />
                Yeni Mal Kabul
              </Link>
            </Button>
          </div>
        </div>

        {/* Role-based Content */}
        {getRoleBasedContent()}

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

      {/* QR Scanner Modal */}
      <QRScanner
        isOpen={showQRScanner}
        onClose={() => setShowQRScanner(false)}
        onScan={handleQRScan}
      />
    </DashboardLayout>
  )
}
