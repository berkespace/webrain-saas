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
  kunyeNo: string;
  hayvanTuru: string;
  urunTuru: string;
  miktar: string;
  kalanMiktar: string;
  birimAd: string;
  fiyat: string;
  bildirimTarihi: string;
  malinSahibiTc: string;
  belgeNo: string;
  belgeTipi: string;
  sifati: string;
  aracPlaka: string;
  ureticiTc: string;
  bildirimciTc: string;
  bildirimTuru: string;
  gidecekIsyeriId: string;
  gidecekYerTuruId: string;
  analizStatus: string;
  rusumMiktari: string;
  uniqueId: string;
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

export default function HKSBildirimGecmisiPage() {
  const [kunyeler, setKunyeler] = useState<Kunye[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedSifat, setSelectedSifat] = useState<string>('all')
  const [selectedMonth, setSelectedMonth] = useState('2025-01')
  const [activeTab, setActiveTab] = useState<'bize-yapilan' | 'bizim-yaptigimiz'>('bize-yapilan')
  const [connectionStatus, setConnectionStatus] = useState<'checking' | 'connected' | 'disconnected'>('checking')
  const [sifatlar, setSifatlar] = useState<Sifat[]>([])
  const [selectedKunye, setSelectedKunye] = useState<Kunye | null>(null)
  const [detailModalOpen, setDetailModalOpen] = useState(false)

  // Safe fetch wrapper
  const safeFetch = async (url: string, options?: RequestInit) => {
    try {
      const response = await fetch(url, options)
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`)
      }
      return await response.json()
    } catch (error: any) {
      console.error('Fetch error:', error)
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

  const loadKunyeler = async () => {
    setLoading(true)
    setError(null)
    try {
      const [year, month] = selectedMonth.split('-')
      const startDate = `${year}-${month}-01`
      const endDate = `${year}-${month}-${new Date(parseInt(year), parseInt(month), 0).getDate()}`
      
      const endpoint = activeTab === 'bize-yapilan' ? '/api/hks/bildirimciye' : '/api/hks/bildirim/sorgu'
      const body = activeTab === 'bize-yapilan' 
        ? {
            baslangic: startDate,
            bitis: endDate,
            kunyeNo: searchTerm ? parseInt(searchTerm) : 0,
            sifat: selectedSifat === 'all' ? undefined : selectedSifat
          }
        : {
            BaslangicTarihi: startDate,
            BitisTarihi: endDate,
            KunyeNo: searchTerm ? parseInt(searchTerm) : 0,
            KalanMiktariSifirdanBuyukOlanlar: true,
            Sifat: selectedSifat || undefined
          }
      
      const data = await safeFetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body)
      })
      
      const mappedKunyeler = (data.items || []).map((item: any) => ({
        kunyeNo: item.kunyeNo || '',
        hayvanTuru: item.urunAdi || '',
        urunTuru: item.urunTuru || '',
        miktar: item.miktar || '',
        kalanMiktar: item.kalanMiktar || '',
        birimAd: item.birimAd || '',
        fiyat: item.fiyat || '',
        bildirimTarihi: item.bildirimTarihi || '',
        malinSahibiTc: item.malinSahibiTc || '',
        belgeNo: item.belgeNo || '',
        belgeTipi: item.belgeTipi || '',
        sifati: item.sifati || '',
        aracPlaka: item.aracPlaka || '',
        ureticiTc: item.ureticiTc || '',
        bildirimciTc: item.bildirimciTc || '',
        bildirimTuru: item.bildirimTuru || '',
        gidecekIsyeriId: item.gidecekIsyeriId || '',
        gidecekYerTuruId: item.gidecekYerTuruId || '',
        analizStatus: item.analizStatus || '',
        rusumMiktari: item.rusumMiktari || '',
        uniqueId: item.uniqueId || '',
        malinKodNo: item.malinKodNo || '',
        malinCinsKodNo: item.malinCinsKodNo || '',
        malinTuruKodNo: item.malinTuruKodNo || '',
        durum: item.durum || 'Aktif'
      }))

      const sortedKunyeler = [...mappedKunyeler].sort((a, b) => {
        const dateA = new Date(a.bildirimTarihi || 0)
        const dateB = new Date(b.bildirimTarihi || 0)
        return dateB.getTime() - dateA.getTime()
      })
      
      setKunyeler(sortedKunyeler)
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
    loadSifatlar()
    loadKunyeler()
    testConnection()
  }, [])

  useEffect(() => {
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
    return String(value).replace(/@_i:nil/g, '') || '-'
  }

  const getFilteredKunyeler = () => {
    let filtered = [...kunyeler]

    // Plaka arama
    if (searchTerm) {
      filtered = filtered.filter(kunye => 
        kunye.aracPlaka.toLowerCase().includes(searchTerm.toLowerCase()) ||
        kunye.kunyeNo.includes(searchTerm) ||
        kunye.belgeNo.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

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
            Bizim Yaptığımız Bildirimler ({kunyeler.length})
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
              <SelectItem value="2025-01">Ocak 2025</SelectItem>
              <SelectItem value="2025-02">Şubat 2025</SelectItem>
              <SelectItem value="2025-03">Mart 2025</SelectItem>
              <SelectItem value="2025-04">Nisan 2025</SelectItem>
              <SelectItem value="2025-05">Mayıs 2025</SelectItem>
              <SelectItem value="2025-06">Haziran 2025</SelectItem>
              <SelectItem value="2025-07">Temmuz 2025</SelectItem>
              <SelectItem value="2025-08">Ağustos 2025</SelectItem>
              <SelectItem value="2025-09">Eylül 2025</SelectItem>
              <SelectItem value="2025-10">Ekim 2025</SelectItem>
              <SelectItem value="2025-11">Kasım 2025</SelectItem>
              <SelectItem value="2025-12">Aralık 2025</SelectItem>
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
              placeholder="Plaka, künye, belge no..."
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
              <p className="text-muted-foreground">Bildirim verileri yükleniyor...</p>
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
                    <TableHead>Künye No</TableHead>
                    <TableHead>Ürün</TableHead>
                    <TableHead>Miktar</TableHead>
                    <TableHead>Kalan</TableHead>
                    <TableHead>Fiyat</TableHead>
                    <TableHead>Tarih</TableHead>
                    <TableHead>Plaka</TableHead>
                    <TableHead>Belge No</TableHead>
                    <TableHead>Sıfat</TableHead>
                    <TableHead>İşlemler</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {getFilteredKunyeler().map((kunye, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{safeString(kunye.kunyeNo)}</TableCell>
                      <TableCell>{safeString(kunye.hayvanTuru)}</TableCell>
                      <TableCell>{safeString(kunye.miktar)} {safeString(kunye.birimAd)}</TableCell>
                      <TableCell>{safeString(kunye.kalanMiktar)} {safeString(kunye.birimAd)}</TableCell>
                      <TableCell>{safeString(kunye.fiyat)} ₺</TableCell>
                      <TableCell>{formatDate(kunye.bildirimTarihi)}</TableCell>
                      <TableCell>{safeString(kunye.aracPlaka)}</TableCell>
                      <TableCell>{safeString(kunye.belgeNo)}</TableCell>
                      <TableCell>{safeString(kunye.sifati)}</TableCell>
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
