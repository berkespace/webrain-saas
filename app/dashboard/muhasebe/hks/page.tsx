'use client'

import { useEffect, useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { RefreshCw, Wifi, WifiOff, Calendar, AlertCircle, Package, FileText, Settings } from 'lucide-react'
import { toast } from 'sonner'

interface Kunye {
  kunyeNo: string
  hayvanTuru: string // Ürün Adı
  irk: string // Ürün Cinsi
  cinsiyet: string
  dogumTarihi: string // Üretim Tarihi
  sahipAdi: string // Malın Sahibi
  sahipTc: string
  kayitTarihi: string // Bildirim Tarihi
  durum: string
  notlar: string
  geçmişİşlemler: Array<{
    tarih: string
    işlem: string
    açıklama: string
  }>
  // HKS specific fields
  urunTuru: string
  miktar: string
  kalanMiktar: string
  birimAd: string
  fiyat: string
  bildirimTuru: string
  bildirimciTc: string
  ureticiTc: string
  aracPlaka: string
  belgeNo: string
  belgeTipi: string
  sifati: string
  gidecekIsyeriId: string
  gidecekYerTuruId: string
  analizStatus: string
  rusumMiktari: string
  uniqueId: string
  malinKodNo: string
  malinCinsKodNo: string
  malinTuruKodNo: string
}

// Safe fetch helper with better error handling
async function safeFetch(input: RequestInfo, init?: RequestInit) {
  const res = await fetch(input, init);
  const j = await res.json().catch(() => ({}));
  if (!res.ok || j?.ok === false) {
    const msg = j?.mesaj || j?.Mesaj || j?.hata || j?.error || j?.raw || `HTTP ${res.status}`;
    throw new Error(typeof msg === 'string' ? msg : JSON.stringify(msg));
  }
  return j;
}

export default function HKSPage() {
  const [bizeYapilanKunyeler, setBizeYapilanKunyeler] = useState<Kunye[]>([])
  const [bizimYaptigimizKunyeler, setBizimYaptigimizKunyeler] = useState<Kunye[]>([])
  const [connectionStatus, setConnectionStatus] = useState<'checking' | 'connected' | 'disconnected'>('checking')
  const [error, setError] = useState<string | null>(null)
  const [selectedMonth, setSelectedMonth] = useState<string>('2025-01') // YYYY-MM format


  const loadBizeYapilanKunyeler = async () => {
    try {
      // Seçilen aya göre tarih aralığı hesapla
      const [year, month] = selectedMonth.split('-')
      const startDate = `${year}-${month}-01`
      const endDate = `${year}-${month}-${new Date(parseInt(year), parseInt(month), 0).getDate()}`
      
      const data = await safeFetch('/api/hks/bildirimciye', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          baslangic: startDate,
          bitis: endDate,
          kunyeNo: 0
        })
      })
      
      // Map HKS API data to KunyeDetay format
      const mappedKunyeler = (data.items || []).map((item: any) => ({
        kunyeNo: item.kunyeNo || '',
        hayvanTuru: item.urunAdi || '', // Ürün Adı
        irk: item.urunCinsi || '', // Ürün Cinsi
        cinsiyet: '', // Not available in HKS data
        dogumTarihi: item.bildirimTarihi || '', // Use bildirimTarihi as dogumTarihi
        dogumYeri: '', // Not available in HKS data
        sahipAdi: item.malinSahibiTc || '', // Use TC as name for now
        sahipTc: item.malinSahibiTc || '',
        sahipAdres: '', // Not available in HKS data
        kayitTarihi: item.bildirimTarihi || '', // Bildirim Tarihi
        durum: 'Aktif', // Default status
        notlar: `Miktar: ${item.miktar} ${item.birimAd || ''}`,
        geçmişİşlemler: [],
        // HKS specific fields
        urunTuru: item.urunTuru || '',
        miktar: item.miktar || '',
        kalanMiktar: item.kalanMiktar || '',
        birimAd: item.birimAd || '',
        fiyat: item.fiyat || '',
        bildirimTuru: item.bildirimTuru || '',
        bildirimciTc: item.bildirimciTc || '',
        ureticiTc: item.ureticiTc || '',
        aracPlaka: item.aracPlaka || '',
        belgeNo: item.belgeNo || '',
        belgeTipi: item.belgeTipi || '',
        sifati: item.sifati || '',
        gidecekIsyeriId: item.gidecekIsyeriId || '',
        gidecekYerTuruId: item.gidecekYerTuruId || '',
        analizStatus: item.analizStatus || '',
        rusumMiktari: item.rusumMiktari || '',
        uniqueId: item.uniqueId || '',
        malinKodNo: item.malinKodNo || '',
        malinCinsKodNo: item.malinCinsKodNo || '',
        malinTuruKodNo: item.malinTuruKodNo || ''
      }))

      // Sort by bildirimTarihi (newest first)
      const sortedKunyeler = [...mappedKunyeler].sort((a, b) => {
        const dateA = new Date(a.kayitTarihi || 0)
        const dateB = new Date(b.kayitTarihi || 0)
        return dateB.getTime() - dateA.getTime() // Newest first
      })
      
      setBizeYapilanKunyeler(sortedKunyeler)
    } catch (error: any) {
      console.error('HKS ERROR:', error?.message);
      setError(error?.message || 'Künye listesi yüklenemedi');
      toast.error(error?.message || 'Künye listesi yüklenemedi');
    }
  }

  const testConnection = async () => {
    setConnectionStatus('checking')
    setError(null)
    try {
      // Test both working endpoints
      const [illerData, bildirimTurleriData] = await Promise.all([
        safeFetch('/api/hks/genel/iller', { cache: 'no-store' }).catch(() => ({ ok: false })),
        safeFetch('/api/hks/bildirim/turler', { cache: 'no-store' }).catch(() => ({ ok: false }))
      ])
      
      if (illerData.ok && bildirimTurleriData.ok) {
        setConnectionStatus('connected')
        toast.success('HKS bağlantısı başarılı!')
      } else {
        setConnectionStatus('disconnected')
        toast.error('HKS servislerine erişilemiyor')
      }
    } catch (error: any) {
      console.error('Bağlantı testi hatası:', error)
      setConnectionStatus('disconnected')
      setError(error?.message || 'Bağlantı testi başarısız')
      toast.error(error?.message || 'Bağlantı testi başarısız')
    }
  }

  const loadBizimYaptigimizKunyeler = async () => {
    try {
      // Seçilen aya göre tarih aralığı hesapla
      const [year, month] = selectedMonth.split('-')
      const startDate = `${year}-${month}-01`
      const endDate = `${year}-${month}-${new Date(parseInt(year), parseInt(month), 0).getDate()}`
      
      const data = await safeFetch('/api/hks/bildirim/sorgu', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          BaslangicTarihi: startDate,
          BitisTarihi: endDate,
          KunyeNo: 0,
          KalanMiktariSifirdanBuyukOlanlar: true
        })
      })
      
      // Map HKS API data to KunyeDetay format
      const mappedKunyeler = (data.items || []).map((item: any) => ({
        kunyeNo: item.kunyeNo || '',
        hayvanTuru: item.urunAdi || '', // Ürün Adı
        irk: item.urunCinsi || '', // Ürün Cinsi
        cinsiyet: '', // Not available in HKS data
        dogumTarihi: item.bildirimTarihi || '', // Use bildirimTarihi as dogumTarihi
        dogumYeri: '', // Not available in HKS data
        sahipAdi: item.malinSahibiTc || '', // Use TC as name for now
        sahipTc: item.malinSahibiTc || '',
        sahipAdres: '', // Not available in HKS data
        kayitTarihi: item.bildirimTarihi || '', // Bildirim Tarihi
        durum: 'Aktif', // Default status
        notlar: `Miktar: ${item.miktar} ${item.birimAd || ''}`,
        geçmişİşlemler: [],
        // HKS specific fields
        urunTuru: item.urunTuru || '',
        miktar: item.miktar || '',
        kalanMiktar: item.kalanMiktar || '',
        birimAd: item.birimAd || '',
        fiyat: item.fiyat || '',
        bildirimTuru: item.bildirimTuru || '',
        bildirimciTc: item.bildirimciTc || '',
        ureticiTc: item.ureticiTc || '',
        aracPlaka: item.aracPlaka || '',
        belgeNo: item.belgeNo || '',
        belgeTipi: item.belgeTipi || '',
        sifati: item.sifati || '',
        gidecekIsyeriId: item.gidecekIsyeriId || '',
        gidecekYerTuruId: item.gidecekYerTuruId || '',
        analizStatus: item.analizStatus || '',
        rusumMiktari: item.rusumMiktari || '',
        uniqueId: item.uniqueId || '',
        malinKodNo: item.malinKodNo || '',
        malinCinsKodNo: item.malinCinsKodNo || '',
        malinTuruKodNo: item.malinTuruKodNo || ''
      }))

      // Tarihe göre sırala (en yeni önce)
      const sortedKunyeler = [...mappedKunyeler].sort((a, b) => {
        const dateA = new Date(a.kayitTarihi || 0)
        const dateB = new Date(b.kayitTarihi || 0)
        return dateB.getTime() - dateA.getTime() // Newest first
      })
      
      setBizimYaptigimizKunyeler(sortedKunyeler)
    } catch (error: any) {
      console.error('HKS ERROR:', error?.message);
      setError(error?.message || 'Künye listesi yüklenemedi');
      toast.error(error?.message || 'Künye listesi yüklenemedi');
    }
  }

  useEffect(() => {
    loadBizeYapilanKunyeler()
    loadBizimYaptigimizKunyeler()
    testConnection()
  }, [])

  useEffect(() => {
    loadBizeYapilanKunyeler()
    loadBizimYaptigimizKunyeler()
  }, [selectedMonth])


  const getConnectionIcon = () => {
    switch (connectionStatus) {
      case 'connected':
        return <Wifi className="h-4 w-4 text-green-500" />
      case 'disconnected':
        return <WifiOff className="h-4 w-4 text-red-500" />
      default:
        return <RefreshCw className="h-4 w-4 text-yellow-500 animate-spin" />
    }
  }

  // Dashboard istatistikleri hesapla
  const getDashboardStats = () => {
    const totalBildirimler = bizeYapilanKunyeler.length + bizimYaptigimizKunyeler.length
    const toplamStokMiktari = bizeYapilanKunyeler.reduce((total, kunye) => {
      return total + parseFloat(kunye.kalanMiktar || '0')
    }, 0)
    const farkliUrunCesidi = new Set(bizeYapilanKunyeler.map(k => k.hayvanTuru || k.urunTuru)).size
    const bugunBildirimler = bizeYapilanKunyeler.filter(kunye => {
      const today = new Date().toDateString()
      const kunyeDate = new Date(kunye.kayitTarihi || 0).toDateString()
      return today === kunyeDate
    }).length

    return {
      totalBildirimler,
      toplamStokMiktari,
      farkliUrunCesidi,
      bugunBildirimler
    }
  }

  const stats = getDashboardStats()

  return (
    <div className="mt-10 ml-10 mr-10 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">HKS - Hal Kayıt Sistemi</h1>
          <p className="text-muted-foreground mt-2">Ana Sayfa - Ticaret Bakanlığı HKS web servisleri entegrasyonu</p>
        </div>
        <div className="flex items-center gap-2">
          {getConnectionIcon()}
          <span className="text-sm text-muted-foreground">
            {connectionStatus === 'connected' ? 'Bağlantı Aktif' : 
             connectionStatus === 'disconnected' ? 'Bağlantı Kesildi' : 'Bağlantı Kontrol Ediliyor'}
          </span>
          <Button onClick={testConnection} variant="outline" size="sm">
            <RefreshCw className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Dashboard İstatistikleri */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Toplam Bildirim</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalBildirimler}</div>
            <p className="text-xs text-muted-foreground">
              Bu ay: {stats.bugunBildirimler} bugün
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Toplam Stok</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.toplamStokMiktari.toFixed(1)}</div>
            <p className="text-xs text-muted-foreground">Kg stokta</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ürün Çeşidi</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.farkliUrunCesidi}</div>
            <p className="text-xs text-muted-foreground">Farklı ürün</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">HKS Durumu</CardTitle>
            {getConnectionIcon()}
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {connectionStatus === 'connected' ? 'Aktif' : 'Pasif'}
            </div>
            <p className="text-xs text-muted-foreground">
              {connectionStatus === 'connected' ? 'Bağlantı sağlandı' : 'Bağlantı sorunu'}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Hızlı Erişim Kartları */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => window.location.href = '/dashboard/muhasebe/hks/stoklar'}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="h-5 w-5 text-blue-600" />
              Stoklarımız
            </CardTitle>
            <CardDescription>Güncel stok durumu ve ürün bazlı özet</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Toplam Stok:</span>
                <span className="font-medium">{stats.toplamStokMiktari.toFixed(1)} Kg</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Ürün Çeşidi:</span>
                <span className="font-medium">{stats.farkliUrunCesidi}</span>
              </div>
            </div>
            <Button variant="outline" size="sm" className="w-full mt-4">
              Stokları Görüntüle →
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => window.location.href = '/dashboard/muhasebe/hks/bildirim-gecmisi'}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-green-600" />
              Bildirim Geçmişi
            </CardTitle>
            <CardDescription>Detaylı bildirim raporları ve filtreleme</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Toplam Bildirim:</span>
                <span className="font-medium">{stats.totalBildirimler}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Bugün:</span>
                <span className="font-medium">{stats.bugunBildirimler}</span>
              </div>
            </div>
            <Button variant="outline" size="sm" className="w-full mt-4">
              Geçmişi Görüntüle →
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Hata Gösterimi */}
      {error && (
        <Card className="border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-900/20">
          <CardContent className="pt-6">
            <div className="flex items-center gap-2 text-red-700 dark:text-red-400">
              <AlertCircle className="h-4 w-4" />
              <span className="font-medium">Hata:</span>
              <span className="text-sm">{error}</span>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Sistem Bilgileri */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* HKS Servis Durumu */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Wifi className="h-5 w-5" />
              HKS Servis Durumu
            </CardTitle>
            <CardDescription>Ticaret Bakanlığı HKS web servisleri</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full ${connectionStatus === 'connected' ? 'bg-green-500' : 'bg-red-500'}`} />
                  <span className="text-sm font-medium">BildirimService</span>
                </div>
                <Badge variant={connectionStatus === 'connected' ? 'default' : 'destructive'}>
                  {connectionStatus === 'connected' ? 'Aktif' : 'Pasif'}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full ${connectionStatus === 'connected' ? 'bg-green-500' : 'bg-red-500'}`} />
                  <span className="text-sm font-medium">GenelService</span>
                </div>
                <Badge variant={connectionStatus === 'connected' ? 'default' : 'destructive'}>
                  {connectionStatus === 'connected' ? 'Aktif' : 'Pasif'}
                </Badge>
              </div>
              <div className="text-xs text-muted-foreground mt-2">
                Endpoint: hks.hal.gov.tr
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Sistem Özellikleri */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              Sistem Özellikleri
            </CardTitle>
            <CardDescription>Mevcut HKS entegrasyon özellikleri</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <div className="w-2 h-2 bg-green-500 rounded-full" />
                <span>İl listesi sorgulama</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <div className="w-2 h-2 bg-green-500 rounded-full" />
                <span>Bildirim türleri listesi</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <div className="w-2 h-2 bg-green-500 rounded-full" />
                <span>Bildirim sorgulama</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <div className="w-2 h-2 bg-green-500 rounded-full" />
                <span>Aylık tarih filtreleme</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <div className="w-2 h-2 bg-green-500 rounded-full" />
                <span>Gerçek zamanlı arama</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Son Bildirimler Özeti */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Son Bildirimler Özeti
          </CardTitle>
          <CardDescription>Bu ayki bildirim aktivitesi</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h4 className="font-medium text-blue-600">Bize Yapılan Bildirimler</h4>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Toplam Bildirim:</span>
                  <span className="font-medium">{bizeYapilanKunyeler.length}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Bugün:</span>
                  <span className="font-medium">{stats.bugunBildirimler}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Toplam Stok:</span>
                  <span className="font-medium">{stats.toplamStokMiktari.toFixed(1)} Kg</span>
                </div>
              </div>
            </div>
            <div className="space-y-3">
              <h4 className="font-medium text-green-600">Bizim Yaptığımız Bildirimler</h4>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Toplam Bildirim:</span>
                  <span className="font-medium">{bizimYaptigimizKunyeler.length}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Farklı Ürün:</span>
                  <span className="font-medium">{stats.farkliUrunCesidi}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Son Güncelleme:</span>
                  <span className="font-medium">{new Date().toLocaleDateString('tr-TR')}</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

    </div>
  )
}
