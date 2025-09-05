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
  QrCode,
  Store,
  MapPin,
  Phone,
  User
} from 'lucide-react'
import Link from 'next/link'

import { useToast } from '@/components/ui/use-toast'
import { QRScanner } from '@/components/ui/qr-scanner'

interface DashboardStats {
  totalRecords: number
  pendingRecords: number
  completedRecords: number
  todayRecords: number
  totalGirisKg: number
  totalNetKg: number
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

interface Komisyoncu {
  id: string
  dukkanAdi: string
  komisyonKodu: string
  komisyonNo: string
  sehir: string
  vkn?: string
  yetkiliAdi?: string
  yetkiliTelefon?: string
  durum: string
}

interface Urun {
  id: string
  ad: string
  stokKodu: string
  kategori?: string
  birim: string
  durum: string
}

interface Mustahsil {
  id: string
  ad: string
  soyad: string
  mustahsilNo: string
  tcKimlikNo: string
  cinsiyet: string
  durum: string
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
    totalGirisKg: 0,
    totalNetKg: 0,
    totalValue: 0,
    monthlyGrowth: 0,
    weeklyGrowth: 0
  })
  const [recentActivity, setRecentActivity] = useState<RecentActivity[]>([])
  const [loading, setLoading] = useState(true)
  const [showQRScanner, setShowQRScanner] = useState(false)
  const [aktifKomisyoncular, setAktifKomisyoncular] = useState<Komisyoncu[]>([])
  const [komisyoncuLoading, setKomisyoncuLoading] = useState(false)
  const [aktifUrunler, setAktifUrunler] = useState<Urun[]>([])
  const [urunLoading, setUrunLoading] = useState(false)
  const [aktifMustahsil, setAktifMustahsil] = useState<Mustahsil[]>([])
  const [mustahsilLoading, setMustahsilLoading] = useState(false)

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login')
    }
  }, [status, router])

  useEffect(() => {
    if (status === 'authenticated' && session?.user) {
      fetchDashboardData()
      fetchAktifKomisyoncular()
      fetchAktifUrunler()
      fetchAktifMustahsil()
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
        
        const totalGirisKg = records.reduce((sum: number, r: any) => sum + (r.girisKg || 0), 0)
        const totalNetKg = records.reduce((sum: number, r: any) => sum + (r.netKg || 0), 0)
        const totalValue = records.reduce((sum: number, r: any) => sum + (r.toplamFiyat || 0), 0)
        
        setStats({
          totalRecords: records.length,
          pendingRecords: records.filter((r: any) => r.status === 'FATURA_BEKLIYOR').length,
          completedRecords: records.filter((r: any) => r.status === 'TAMAMLANDI').length,
          todayRecords: todayRecords.length,
          totalGirisKg: Math.round(totalGirisKg),
          totalNetKg: Math.round(totalNetKg),
          totalValue: Math.round(totalValue),
          monthlyGrowth: lastMonthRecords.length > 0 ? ((todayRecords.length - lastMonthRecords.length) / lastMonthRecords.length) * 100 : 0,
          weeklyGrowth: lastWeekRecords.length > 0 ? ((todayRecords.length - lastWeekRecords.length) / lastWeekRecords.length) * 100 : 0
        })

        // Gerçek recent activity verisi
        const recentActivities = records
          .slice(0, 5)
          .map((record: any) => ({
            id: record.id,
            type: 'MAL_KABUL' as const,
            title: `Mal Kabul - ${record.fisNo}`,
            description: `${record.urun?.ad || 'Ürün'} - ${record.netKg}kg`,
            timestamp: record.createdAt,
            status: record.status === 'TAMAMLANDI' ? 'SUCCESS' as const : 
                   record.status === 'FATURA_BEKLIYOR' ? 'PENDING' as const : 'ERROR' as const
          }))
        
        setRecentActivity(recentActivities)
      }
    } catch (error) {
      console.error('Dashboard veri getirme hatası:', error)
    } finally {
      setLoading(false)
    }
  }

  const fetchAktifKomisyoncular = async () => {
    try {
      setKomisyoncuLoading(true)
      const response = await fetch('/api/komisyoncular?status=AKTIF')
      if (response.ok) {
        const data = await response.json()
        setAktifKomisyoncular(data)
      }
    } catch (error) {
      console.error('Aktif komisyoncu getirme hatası:', error)
    } finally {
      setKomisyoncuLoading(false)
    }
  }

  const fetchAktifUrunler = async () => {
    try {
      setUrunLoading(true)
      const response = await fetch('/api/urunler?status=AKTIF')
      if (response.ok) {
        const data = await response.json()
        setAktifUrunler(data)
      }
    } catch (error) {
      console.error('Aktif ürün getirme hatası:', error)
    } finally {
      setUrunLoading(false)
    }
  }

  const fetchAktifMustahsil = async () => {
    try {
      setMustahsilLoading(true)
      const response = await fetch('/api/mustahsil?status=AKTIF')
      if (response.ok) {
        const data = await response.json()
        setAktifMustahsil(data)
      }
    } catch (error) {
      console.error('Aktif müstahsil getirme hatası:', error)
    } finally {
      setMustahsilLoading(false)
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
      
      // HNR prefix kontrolü
      if (!fisNo.startsWith('HNR')) {
        toast({
          title: "Geçersiz QR Kod",
          description: "Bu QR kod mal kabul sistemi için değil",
          variant: "destructive",
        })
        return
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
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Dashboard yükleniyor...</p>
        </div>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Veriler yükleniyor...</p>
        </div>
      </div>
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
            <CardTitle className="text-sm font-medium">Giriş KG</CardTitle>
            <Scale className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalGirisKg.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Toplam giriş ağırlığı</p>
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



      {/* Hızlı Erişim Listeleri */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Aktif Komisyoncu Listesi */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Store className="h-5 w-5" />
              Komisyoncular
            </CardTitle>
            <CardDescription>
              Hızlı arama için kodlar
            </CardDescription>
          </CardHeader>
          <CardContent>
            {komisyoncuLoading ? (
              <div className="flex items-center justify-center py-4">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
              </div>
            ) : aktifKomisyoncular.length > 0 ? (
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {aktifKomisyoncular.slice(0, 8).map((komisyoncu) => (
                  <div key={komisyoncu.id} className="flex items-center justify-between p-2 rounded-lg hover:bg-muted/50 transition-colors">
                    <div className="flex items-center gap-2 min-w-0 flex-1">
                      <Store className="h-3 w-3 text-primary flex-shrink-0" />
                      <span className="text-sm truncate">{komisyoncu.dukkanAdi}</span>
                    </div>
                    <span className="bg-primary text-primary-foreground text-xs px-2 py-1 rounded font-mono flex-shrink-0">
                      {komisyoncu.komisyonKodu}
                    </span>
                  </div>
                ))}
                {aktifKomisyoncular.length > 8 && (
                  <div className="text-center pt-2">
                    <Link href="/dashboard/komisyoncular/liste">
                      <Button variant="ghost" size="sm" className="text-xs">
                        +{aktifKomisyoncular.length - 8} daha
                      </Button>
                    </Link>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-4 text-muted-foreground text-sm">
                <Store className="h-8 w-8 mx-auto mb-2 opacity-50" />
                <p>Komisyoncu bulunamadı</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Aktif Ürün Listesi */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="h-5 w-5" />
              Ürünler
            </CardTitle>
            <CardDescription>
              Stok kodları ile hızlı erişim
            </CardDescription>
          </CardHeader>
          <CardContent>
            {urunLoading ? (
              <div className="flex items-center justify-center py-4">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
              </div>
            ) : aktifUrunler.length > 0 ? (
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {aktifUrunler.slice(0, 8).map((urun) => (
                  <div key={urun.id} className="flex items-center justify-between p-2 rounded-lg hover:bg-muted/50 transition-colors">
                    <div className="flex items-center gap-2 min-w-0 flex-1">
                      <Package className="h-3 w-3 text-blue-500 flex-shrink-0" />
                      <div className="min-w-0 flex-1">
                        <span className="text-sm truncate block">{urun.ad}</span>
                        {urun.kategori && (
                          <span className="text-xs text-muted-foreground truncate block">{urun.kategori}</span>
                        )}
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-1 flex-shrink-0">
                      <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded font-mono">
                        {urun.stokKodu}
                      </span>
                      <span className="text-xs text-muted-foreground">{urun.birim}</span>
                    </div>
                  </div>
                ))}
                {aktifUrunler.length > 8 && (
                  <div className="text-center pt-2">
                    <Link href="/dashboard/urunler">
                      <Button variant="ghost" size="sm" className="text-xs">
                        +{aktifUrunler.length - 8} daha
                      </Button>
                    </Link>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-4 text-muted-foreground text-sm">
                <Package className="h-8 w-8 mx-auto mb-2 opacity-50" />
                <p>Ürün bulunamadı</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Aktif Müstahsil Listesi */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Müstahsiller
            </CardTitle>
            <CardDescription>
              Müstahsil numaraları
            </CardDescription>
          </CardHeader>
          <CardContent>
            {mustahsilLoading ? (
              <div className="flex items-center justify-center py-4">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
              </div>
            ) : aktifMustahsil.length > 0 ? (
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {aktifMustahsil.slice(0, 8).map((mustahsil) => (
                  <div key={mustahsil.id} className="flex items-center justify-between p-2 rounded-lg hover:bg-muted/50 transition-colors">
                    <div className="flex items-center gap-2 min-w-0 flex-1">
                      <Users className="h-3 w-3 text-green-500 flex-shrink-0" />
                      <div className="min-w-0 flex-1">
                        <span className="text-sm truncate block">{mustahsil.ad} {mustahsil.soyad}</span>
                        <span className="text-xs text-muted-foreground truncate block">{mustahsil.tcKimlikNo}</span>
                      </div>
                    </div>
                    <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded font-mono flex-shrink-0">
                      {mustahsil.mustahsilNo}
                    </span>
                  </div>
                ))}
                {aktifMustahsil.length > 8 && (
                  <div className="text-center pt-2">
                    <Link href="/dashboard/mustahsil/liste">
                      <Button variant="ghost" size="sm" className="text-xs">
                        +{aktifMustahsil.length - 8} daha
                      </Button>
                    </Link>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-4 text-muted-foreground text-sm">
                <Users className="h-8 w-8 mx-auto mb-2 opacity-50" />
                <p>Müstahsil bulunamadı</p>
              </div>
            )}
          </CardContent>
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
              <CardTitle className="text-sm font-medium">Net KG</CardTitle>
            <Scale className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalNetKg.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Toplam net ağırlık</p>
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
                Son mal kabul işlemleri
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.length > 0 ? (
                  recentActivity.map((activity) => (
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
                  ))
                ) : (
                  <div className="text-center py-4 text-muted-foreground text-sm">
                    <Activity className="h-8 w-8 mx-auto mb-2 opacity-50" />
                    <p>Henüz aktivite bulunmuyor</p>
                  </div>
                )}
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
                <div className="flex items-center justify-between">
                  <span className="text-sm">Giriş KG</span>
                  <span className="text-sm font-medium">{stats.totalGirisKg.toLocaleString()} kg</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Net KG</span>
                  <span className="text-sm font-medium">{stats.totalNetKg.toLocaleString()} kg</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Toplam Değer</span>
                  <span className="text-sm font-medium">₺{stats.totalValue.toLocaleString()}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* QR Scanner Modal */}
        <QRScanner
          isOpen={showQRScanner}
          onClose={() => setShowQRScanner(false)}
          onScan={handleQRScan}
        />
      </div>
    )
}
