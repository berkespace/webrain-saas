'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { RefreshCw, Search, Download, Filter, Eye, Calendar, Truck, FileText } from 'lucide-react';
import { toast } from 'sonner';

interface Kunye {
  // Temel bilgiler
  id: string;
  kunyeNo: string;
  
  // Ürün bilgileri
  malinKodNo: string;
  malinAdi: string;
  malinCinsKodNo: string;
  malinCinsi: string;
  malinMiktari: string;
  malinSatisFiyati: string;
  malinTuruKodNo: string;
  malinTuru: string;
  
  // Miktar ve birim bilgileri
  miktarBirimId: string;
  miktarBirimiAd: string;
  kalanMiktar: string;
  
  // Bildirim bilgileri
  bildirimTarihi: string;
  bildirimTuru: string;
  bildirimciTcKimlikVergiNo: string;
  
  // Kişi bilgileri
  malinSahibiTcKimlikVergiNo: string;
  ureticiTcKimlikVergiNo: string;
  
  // Araç ve belge bilgileri
  aracPlakaNo: string;
  belgeNo: string;
  belgeTipi: string;
  
  // Sıfat ve yer bilgileri
  sifat: string;
  gidecekYerTuruId: string;
  gidecekIsyeriId: string;
  
  // Diğer bilgiler
  uniqueId: string;
  analizStatus: string;
  rusumMiktari: string;
  
  // Geriye uyumluluk için eski alanlar (deprecated)
  hayvanTuru: string;
  urunTuru: string;
  miktar: string;
  birimAd: string;
  fiyat: string;
  malinSahibiTc: string;
  sifati: string;
  aracPlaka: string;
  ureticiTc: string;
  bildirimciTc: string;
  bildirimciUnvan: string;
  gidecekYerTuruId: string;
  malinKodNo: string;
  malinCinsKodNo: string;
  malinTuruKodNo: string;
  durum: string;
}

interface Sifat {
  id: number;
  ad: string;
  aciklama: string;
}

interface BelgeTipi {
  id: string;
  ad: string;
  aciklama: string;
}

interface IsletmeTuru {
  id: string;
  ad: string;
}

export default function HKSBildirimGecmisiPage() {
  const [kunyeler, setKunyeler] = useState<Kunye[]>([])
  const [bizimKunyeler, setBizimKunyeler] = useState<Kunye[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedSifat, setSelectedSifat] = useState<string>('all')
  const [selectedMonth, setSelectedMonth] = useState(() => {
    const now = new Date()
    const year = now.getFullYear()
    const month = String(now.getMonth() + 1).padStart(2, '0')
    return `${year}-${month}`
  })
  const [activeTab, setActiveTab] = useState<'bize-yapilan' | 'bizim-yaptigimiz'>('bize-yapilan')
  const [connectionStatus, setConnectionStatus] = useState<'checking' | 'connected' | 'disconnected'>('checking')
  const [sifatlar, setSifatlar] = useState<Sifat[]>([])
  const [belgeTipleri, setBelgeTipleri] = useState<BelgeTipi[]>([])
  const [isletmeTurleri, setIsletmeTurleri] = useState<IsletmeTuru[]>([])
  const [bildirimTurleri, setBildirimTurleri] = useState<BelgeTipi[]>([])
  const [selectedKunye, setSelectedKunye] = useState<Kunye | null>(null)
  const [detailModalOpen, setDetailModalOpen] = useState(false)

  // Safe fetch wrapper
  const safeFetch = async (url: string, options?: RequestInit) => {
    try {
      console.log('API çağrısı:', url, options?.method || 'GET')
      const response = await fetch(url, options)
      if (!response.ok) {
        console.error('HTTP hatası:', response.status, response.statusText, 'URL:', url)
        throw new Error(`HTTP ${response.status}: ${response.statusText}`)
      }
      return await response.json()
    } catch (error: any) {
      console.error('Fetch error:', error, 'URL:', url)
      throw error
    }
  }

  const loadSifatlar = async () => {
    try {
      // Önce HKS'nin resmi sıfat listesi servisini dene
      const data = await safeFetch('/api/hks/bildirim/sifatlar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        }
      })
      
      if (data.ok && data.items && data.items.length > 0) {
        // HKS'den gelen sıfatları kullan
        setSifatlar(data.items)
        console.log('HKS Sıfat Listesi yüklendi:', data.items)
      } else {
        // Fallback: Künye verilerinden sıfatları çıkar
        const kunyeData = await safeFetch('/api/hks/bildirimciye', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            baslangic: '2025-01-01',
            bitis: '2025-01-31',
            kunyeNo: 0
          })
        })
        
        if (kunyeData.items && kunyeData.items.length > 0) {
          const uniqueSifatlar = new Map()
          kunyeData.items.forEach((item: any) => {
            if (item.sifati) {
              // Sıfat ID'sine göre doğru adı belirle
              let sifatAdi = `Sıfat ${item.sifati}`
              if (item.sifati === '2') sifatAdi = 'İhracat'
              else if (item.sifati === '6') sifatAdi = 'Tüccar (Hal İçi)'
              
              uniqueSifatlar.set(item.sifati, {
                id: item.sifati,
                ad: sifatAdi,
                aciklama: `${sifatAdi} sıfatı`
              })
            }
          })
          
          const sifatlar = Array.from(uniqueSifatlar.values())
          if (sifatlar.length > 0) {
            setSifatlar(sifatlar)
          } else {
            // Son fallback: HKS verilerinden tespit edilen sıfatlar
            setSifatlar([
              { id: 2, ad: 'İhracat', aciklama: 'İhracat sıfatı' },
              { id: 6, ad: 'Tüccar (Hal İçi)', aciklama: 'Hal içi tüccar sıfatı' }
            ])
          }
        } else {
          // Son fallback: HKS verilerinden tespit edilen sıfatlar
          setSifatlar([
            { id: 2, ad: 'İhracat', aciklama: 'İhracat sıfatı' },
            { id: 6, ad: 'Tüccar (Hal İçi)', aciklama: 'Hal içi tüccar sıfatı' }
          ])
        }
      }
    } catch (error: any) {
      console.error('Sıfatlar yüklenemedi:', error?.message);
      // Son fallback: HKS verilerinden tespit edilen sıfatlar
      setSifatlar([
        { id: 2, ad: 'İhracat', aciklama: 'İhracat sıfatı' },
        { id: 6, ad: 'Tüccar (Hal İçi)', aciklama: 'Hal içi tüccar sıfatı' }
      ])
    }
  }

  const loadBelgeTipleri = async () => {
    try {
      const data = await safeFetch('/api/hks/bildirim/belge-tipleri', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({})
      })
      
      if (data.ok && data.items) {
        setBelgeTipleri(data.items)
      }
    } catch (error) {
      console.error('Belge tipleri yüklenemedi:', error)
      // Hardcoded fallback
      setBelgeTipleri([
        { id: '207', ad: 'Fatura', aciklama: 'Satış faturası' },
        { id: '208', ad: 'İrsaliye', aciklama: 'Mal irsaliyesi' },
        { id: '209', ad: 'Gümrük Beyannamesi', aciklama: 'Gümrük beyannamesi' },
        { id: '210', ad: 'İrsaliyeli Fatura', aciklama: 'İrsaliyeli fatura' },
        { id: '0', ad: 'Belge Yok', aciklama: 'Belge bulunmuyor' }
      ])
    }
  }

  const loadIsletmeTurleri = async () => {
    try {
      const data = await safeFetch('/api/hks/genel/isletme-turleri', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({})
      })
      
      if (data.ok && data.items) {
        setIsletmeTurleri(data.items)
      }
    } catch (error) {
      console.error('İşletme türleri yüklenemedi:', error)
      // Hardcoded fallback
      setIsletmeTurleri([
        { id: '4', ad: 'Tasnifleme ve Ambalajlama' },
        { id: '5', ad: 'Hal İçi Deposu' },
        { id: '7', ad: 'Hal İçi İşyeri' },
        { id: '8', ad: 'Hal Dışı İşyeri' },
        { id: '12', ad: 'Dağıtım Merkezi' }
      ])
    }
  }

  const loadBildirimTurleri = async () => {
    try {
      const data = await safeFetch('/api/hks/bildirim/bildirim-turleri', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({})
      })
      
      if (data.ok && data.items) {
        setBildirimTurleri(data.items)
      }
    } catch (error) {
      console.error('Bildirim türleri yüklenemedi:', error)
      // Hardcoded fallback
      setBildirimTurleri([
        { id: '195', ad: 'Satış Bildirimi' },
        { id: '196', ad: 'Alış Bildirimi' },
        { id: '197', ad: 'Transfer Bildirimi' },
        { id: '198', ad: 'İade Bildirimi' },
        { id: '199', ad: 'Fire Bildirimi' }
      ])
    }
  }

  const loadKunyeler = async () => {
    try {
      setLoading(true)
      setError(null)
      
      // Her iki tab için de çalış
      console.log('loadKunyeler: Aktif sekme:', activeTab)
      
      const [year, month] = selectedMonth.split('-')
      const startDate = `${year}-${month}-01`
      
      // Güncel ay için bugüne kadar, geçmiş aylar için ayın sonuna kadar
      const now = new Date()
      const currentYear = now.getFullYear()
      const currentMonth = now.getMonth() + 1
      const isCurrentMonth = parseInt(year) === currentYear && parseInt(month) === currentMonth
      
      const endDate = isCurrentMonth 
        ? `${year}-${month}-${String(now.getDate()).padStart(2, '0')}` // Bugüne kadar
        : `${year}-${month}-${new Date(parseInt(year), parseInt(month), 0).getDate()}` // Ayın sonuna kadar
      
      // Tab'a göre endpoint belirle
      const endpoint = activeTab === 'bize-yapilan' 
        ? '/api/hks/bildirimciye' 
        : '/api/hks/bildirim/sorgu'
      const body: any = {
        baslangic: startDate,
        bitis: endDate,
        kunyeNo: searchTerm ? parseInt(searchTerm) : 0,
      }
      
      // Sifat sadece 'all' değilse ekle
      if (selectedSifat !== 'all') {
        body.sifat = selectedSifat
      }
      
      console.log('API çağrısı yapılıyor:', endpoint, body)
      
      const data = await safeFetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body)
      })
      
      if (!data.ok) {
        throw new Error(data.error || 'Veri yüklenemedi')
      }
      
      let items = data.items || []
      
      // Bildirimci ünvanlarını ekle
      if (data.bildirimciUnvanlari) {
        items = items.map((item: any) => ({
          ...item,
          bildirimciUnvan: data.bildirimciUnvanlari[item.bildirimciTc] || ''
        }))
      }
      
      // Filtreleme - items'ı direkt kullan
      const filteredKunyeler = items
      
      // Sıralama (en yeni tarih önce)
      const sortedKunyeler = [...filteredKunyeler].sort((a, b) => {
        const dateA = new Date(a.bildirimTarihi).getTime()
        const dateB = new Date(b.bildirimTarihi).getTime()
        return dateB - dateA
      })
      
      // Tab'a göre doğru state'e yaz
      if (activeTab === 'bize-yapilan') {
        setKunyeler(sortedKunyeler)
        console.log('Bize yapılan bildirimler yüklendi:', sortedKunyeler.length, 'kayıt')
      } else {
        setBizimKunyeler(sortedKunyeler)
        console.log('Bizim yaptığımız bildirimler yüklendi:', sortedKunyeler.length, 'kayıt')
      }
    } catch (error: any) {
      console.error('Künye verileri yüklenemedi:', error?.message)
      setError(error?.message || 'Künye verileri yüklenemedi')
      toast.error(error?.message || 'Künye verileri yüklenemedi')
    } finally {
      setLoading(false)
    }
  }

  const testConnection = async () => {
    setConnectionStatus('checking')
    setError(null)
    try {
      const data = await safeFetch('/api/hks/bildirimciye', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          baslangic: '2025-01-01',
          bitis: '2025-01-31',
          kunyeNo: 0
        })
      })
      
      if (data.ok) {
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

  const loadKunyeDetay = async (kunyeNo: string) => {
    try {
      const kunye = kunyeler.find(k => k.kunyeNo === kunyeNo)
      if (kunye) {
        setSelectedKunye(kunye)
        setDetailModalOpen(true)
      } else {
        console.error('Künye bulunamadı:', kunyeNo)
        toast.error('Künye detayı bulunamadı')
      }
    } catch (error) {
      console.error('Künye detayı yükleme hatası:', error)
      toast.error('Künye detayı yüklenemedi')
    }
  }

  const exportToCSV = () => {
    const headers = [
      'Künye No', 'Ürün Adı', 'Miktar', 'Kalan Miktar', 'Birim', 'Fiyat',
      'Bildirim Tarihi', 'Malın Sahibi TC', 'Belge No', 'Araç Plaka',
      'Üretici TC', 'Bildirimci TC', 'Sıfat', 'Durum'
    ]
    
    const csvContent = [
      headers.join(','),
      ...kunyeler.map(kunye => [
        kunye.kunyeNo,
        kunye.hayvanTuru,
        kunye.miktar,
        kunye.kalanMiktar,
        kunye.birimAd,
        kunye.fiyat,
        kunye.bildirimTarihi,
        kunye.malinSahibiTc,
        kunye.belgeNo,
        kunye.aracPlaka,
        kunye.ureticiTc,
        kunye.bildirimciTc,
        kunye.sifati,
        kunye.durum
      ].join(','))
    ].join('\n')
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    const url = URL.createObjectURL(blob)
    link.setAttribute('href', url)
    link.setAttribute('download', `hks-bildirim-gecmisi-${selectedMonth}.csv`)
    link.style.visibility = 'hidden'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    
    toast.success('CSV dosyası indirildi')
  }

  useEffect(() => {
    console.log('HKS sayfası yüklendi')
    loadKunyeler()
    testConnection()
    loadBelgeTipleri()
    loadIsletmeTurleri()
    loadBildirimTurleri()
  }, [])


  useEffect(() => {
    console.log('Tab/filter değişikliği:', { activeTab, selectedMonth, selectedSifat, searchTerm })
    const timeoutId = setTimeout(() => {
      loadKunyeler()
    }, 500)
    return () => clearTimeout(timeoutId)
  }, [searchTerm, selectedSifat, selectedMonth, activeTab])

  const formatDate = (dateString: string) => {
    if (!dateString) return '-'
    try {
      const date = new Date(dateString)
      return date.toLocaleDateString('tr-TR')
    } catch {
      return dateString
    }
  }

  const safeString = (value: any) => {
    if (value === null || value === undefined) return '-'
    if (typeof value === 'object') return '-'
    const str = String(value).replace(/@_i:nil/g, '')
    return str === '' ? '-' : str
  }

  const getBelgeTipiAdi = (belgeTipiId: string) => {
    const belgeTipi = belgeTipleri.find(bt => bt.id === belgeTipiId)
    return belgeTipi ? belgeTipi.ad : belgeTipiId
  }

  const getIsletmeTuruAdi = (isletmeTuruId: string) => {
    const isletmeTuru = isletmeTurleri.find(it => it.id === isletmeTuruId)
    return isletmeTuru ? isletmeTuru.ad : isletmeTuruId
  }

  const getBildirimTuruAdi = (bildirimTuruId: string) => {
    const bildirimTuru = bildirimTurleri.find(bt => bt.id === bildirimTuruId)
    return bildirimTuru ? bildirimTuru.ad : bildirimTuruId
  }

  const getFilteredKunyeler = () => {
    const currentKunyeler = activeTab === 'bize-yapilan' ? kunyeler : bizimKunyeler
    console.log('getFilteredKunyeler: activeTab =', activeTab, 'currentKunyeler.length =', currentKunyeler.length)
    let filtered = [...currentKunyeler]

    // Genel arama
    if (searchTerm) {
      filtered = filtered.filter(kunye => 
        kunye.kunyeNo.includes(searchTerm) ||
        kunye.malinKodNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        kunye.malinAdi.toLowerCase().includes(searchTerm.toLowerCase()) ||
        kunye.malinCinsi.toLowerCase().includes(searchTerm.toLowerCase()) ||
        kunye.malinTuru.toLowerCase().includes(searchTerm.toLowerCase()) ||
        kunye.aracPlakaNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        kunye.belgeNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        kunye.bildirimciTcKimlikVergiNo.includes(searchTerm) ||
        kunye.malinSahibiTcKimlikVergiNo.includes(searchTerm) ||
        kunye.ureticiTcKimlikVergiNo.includes(searchTerm) ||
        kunye.uniqueId.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    console.log('getFilteredKunyeler: filtered.length =', filtered.length)
    return filtered
  }

  return (
    <div className="mt-10 ml-10 mr-10 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">HKS - Bildirim Geçmişi</h1>
          <p className="text-muted-foreground mt-2">Detaylı bildirim raporları ve filtreleme</p>
        </div>
        <div className="flex items-center gap-2">
          <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm ${
            connectionStatus === 'connected' 
              ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
              : connectionStatus === 'checking'
              ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
              : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
          }`}>
            <div className={`w-2 h-2 rounded-full ${
              connectionStatus === 'connected' ? 'bg-green-500' :
              connectionStatus === 'checking' ? 'bg-yellow-500' : 'bg-red-500'
            }`} />
            {connectionStatus === 'connected' ? 'Bağlı' : 
             connectionStatus === 'checking' ? 'Bağlanıyor...' : 'Bağlantı Yok'}
          </div>
          <Button onClick={exportToCSV} variant="outline" disabled={kunyeler.length === 0}>
            <Download className="h-4 w-4 mr-2" />
            CSV İndir
          </Button>
          <Button onClick={loadKunyeler} disabled={loading}>
            {loading ? <RefreshCw className="h-4 w-4 animate-spin" /> : 'Yenile'}
          </Button>
        </div>
      </div>

      {/* Tab Sistemi */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('bize-yapilan')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'bize-yapilan'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Bize Yapılan Bildirimler ({kunyeler.length})
          </button>
          <button
            onClick={() => setActiveTab('bizim-yaptigimiz')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'bizim-yaptigimiz'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Bizim Yaptığımız Bildirimler ({bizimKunyeler.length})
          </button>
        </nav>
      </div>

      {/* Filtreler */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Ay Seçimi */}
        <div>
          <label className="text-sm font-medium mb-2 block">Ay Seçimi</label>
          <Select value={selectedMonth} onValueChange={setSelectedMonth}>
            <SelectTrigger>
              <SelectValue placeholder="Ay seçin" />
            </SelectTrigger>
            <SelectContent>
              {(() => {
                const months = [
                  'Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran',
                  'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'
                ]
                const now = new Date()
                const currentYear = now.getFullYear()
                const currentMonth = now.getMonth() + 1
                
                return months.map((month, index) => {
                  const monthValue = `${currentYear}-${String(index + 1).padStart(2, '0')}`
                  const isCurrentMonth = index + 1 === currentMonth
                  return (
                    <SelectItem key={monthValue} value={monthValue}>
                      {month} {currentYear} {isCurrentMonth ? '(Güncel)' : ''}
                    </SelectItem>
                  )
                })
              })()}
            </SelectContent>
          </Select>
        </div>

        {/* Sıfat Filtresi */}
        <div>
          <label className="text-sm font-medium mb-2 block">Sıfat</label>
          <Select value={selectedSifat.toString()} onValueChange={(value) => setSelectedSifat(value === 'all' ? '' : parseInt(value))}>
            <SelectTrigger>
              <SelectValue placeholder="Sıfat seçin" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tüm Sıfatlar</SelectItem>
              {sifatlar.map((sifat) => (
                <SelectItem key={sifat.id} value={sifat.id.toString()}>
                  {sifat.ad}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Arama */}
        <div>
          <label className="text-sm font-medium mb-2 block">Arama</label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Künye, ürün, plaka, TC, belge no..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Durum */}
        <div>
          <label className="text-sm font-medium mb-2 block">Durum</label>
          <Select defaultValue="all">
            <SelectTrigger>
              <SelectValue placeholder="Durum seçin" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tüm Durumlar</SelectItem>
              <SelectItem value="active">Aktif</SelectItem>
              <SelectItem value="inactive">Pasif</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Bildirim Listesi */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Bildirim Listesi ({getFilteredKunyeler().length} kayıt)
          </CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-center py-8">
              <RefreshCw className="h-8 w-8 animate-spin mx-auto mb-4" />
              <p className="text-muted-foreground">
                {selectedMonth === (() => {
                  const now = new Date()
                  const year = now.getFullYear()
                  const month = String(now.getMonth() + 1).padStart(2, '0')
                  return `${year}-${month}`
                })() ? 'Güncel ay verileri yükleniyor...' : 'Seçilen ay verileri yükleniyor...'}
              </p>
            </div>
          ) : error ? (
            <div className="text-center py-8">
              <p className="text-red-600 dark:text-red-400">{error}</p>
              <Button onClick={loadKunyeler} className="mt-4">
                Tekrar Dene
              </Button>
            </div>
          ) : getFilteredKunyeler().length === 0 ? (
            <div className="text-center py-12">
              <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-lg font-medium text-muted-foreground">Bildirim bulunamadı</p>
              <p className="text-sm text-muted-foreground mt-2">
                Seçilen kriterlere uygun bildirim bulunamadı
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Bildirim Tarihi</TableHead>
                    <TableHead>Künye No</TableHead>
                    <TableHead>Ürün Adı</TableHead>
                    <TableHead>Ürün Cinsi</TableHead>
                    <TableHead>Ürün Türü</TableHead>
                    <TableHead>Miktar</TableHead>
                    <TableHead>Birim</TableHead>
                    <TableHead>Kalan Miktar</TableHead>
                    <TableHead>Satış Fiyatı</TableHead>
                    <TableHead>Bildirim Türü</TableHead>
                    <TableHead>Bildirimci TC</TableHead>
                    <TableHead>Bildirimci</TableHead>
                    <TableHead>Mal Sahibi TC</TableHead>
                    <TableHead>Üretici TC</TableHead>
                    <TableHead>Araç Plaka</TableHead>
                    <TableHead>Belge No</TableHead>
                    <TableHead>Belge Tipi</TableHead>
                    <TableHead>Sıfat</TableHead>
                    <TableHead>Gidecek Yer Türü</TableHead>
                    <TableHead>Gidecek İşyeri</TableHead>
                    <TableHead>Rüsum Miktarı</TableHead>
                    <TableHead>İşlemler</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {getFilteredKunyeler().map((kunye, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{formatDate(kunye.bildirimTarihi)}</TableCell>
                      <TableCell>{safeString(kunye.kunyeNo)}</TableCell>
                      <TableCell>{safeString(kunye.malinAdi)}</TableCell>
                      <TableCell>{safeString(kunye.malinCinsi)}</TableCell>
                      <TableCell>{safeString(kunye.malinTuru)}</TableCell>
                      <TableCell>{safeString(kunye.malinMiktari)}</TableCell>
                      <TableCell>{safeString(kunye.miktarBirimiAd)}</TableCell>
                      <TableCell>{safeString(kunye.kalanMiktar)}</TableCell>
                      <TableCell>{safeString(kunye.malinSatisFiyati)} ₺</TableCell>
                      <TableCell>{getBildirimTuruAdi(safeString(kunye.bildirimTuru))}</TableCell>
                      <TableCell>{safeString(kunye.bildirimciTcKimlikVergiNo)}</TableCell>
                      <TableCell>{safeString(kunye.bildirimciUnvan)}</TableCell>
                      <TableCell>{safeString(kunye.malinSahibiTcKimlikVergiNo)}</TableCell>
                      <TableCell>{safeString(kunye.ureticiTcKimlikVergiNo)}</TableCell>
                      <TableCell>{safeString(kunye.aracPlakaNo)}</TableCell>
                      <TableCell>{safeString(kunye.belgeNo)}</TableCell>
                      <TableCell>{getBelgeTipiAdi(safeString(kunye.belgeTipi))}</TableCell>
                      <TableCell>{safeString(kunye.sifat)}</TableCell>
                      <TableCell>{getIsletmeTuruAdi(safeString(kunye.gidecekYerTuruId))}</TableCell>
                      <TableCell>{safeString(kunye.gidecekIsyeriId)}</TableCell>
                      <TableCell>{safeString(kunye.rusumMiktari)} ₺</TableCell>
                      <TableCell>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => loadKunyeDetay(kunye.kunyeNo)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Detay Modal */}
      {detailModalOpen && selectedKunye && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Künye Detayları</h3>
              <Button variant="outline" onClick={() => setDetailModalOpen(false)}>
                Kapat
              </Button>
            </div>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-600 dark:text-gray-400">Künye No</label>
                  <p className="text-sm">{safeString(selectedKunye.kunyeNo)}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600 dark:text-gray-400">Ürün Adı</label>
                  <p className="text-sm">{safeString(selectedKunye.hayvanTuru)}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600 dark:text-gray-400">Miktar</label>
                  <p className="text-sm">{safeString(selectedKunye.miktar)} {safeString(selectedKunye.birimAd)}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600 dark:text-gray-400">Kalan Miktar</label>
                  <p className="text-sm">{safeString(selectedKunye.kalanMiktar)} {safeString(selectedKunye.birimAd)}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600 dark:text-gray-400">Fiyat</label>
                  <p className="text-sm">{safeString(selectedKunye.fiyat)} ₺</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600 dark:text-gray-400">Bildirim Tarihi</label>
                  <p className="text-sm">{formatDate(selectedKunye.bildirimTarihi)}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600 dark:text-gray-400">Araç Plaka</label>
                  <p className="text-sm">{safeString(selectedKunye.aracPlaka)}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600 dark:text-gray-400">Belge No</label>
                  <p className="text-sm">{safeString(selectedKunye.belgeNo)}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600 dark:text-gray-400">Malın Sahibi TC</label>
                  <p className="text-sm">{safeString(selectedKunye.malinSahibiTc)}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600 dark:text-gray-400">Üretici TC</label>
                  <p className="text-sm">{safeString(selectedKunye.ureticiTc)}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600 dark:text-gray-400">Bildirimci TC</label>
                  <p className="text-sm">{safeString(selectedKunye.bildirimciTc)}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600 dark:text-gray-400">Sıfat</label>
                  <p className="text-sm">{safeString(selectedKunye.sifati)}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
