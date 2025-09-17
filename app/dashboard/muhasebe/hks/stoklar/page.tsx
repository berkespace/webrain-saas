'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RefreshCw, Package, TrendingUp, TrendingDown, AlertCircle } from 'lucide-react';
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

interface StokOzeti {
  urunAdi: string;
  miktar: number;
  birim: string;
  toplamKayit: number;
  sonGuncelleme: string;
  ortalamaFiyat?: number;
  toplamRusumBorcu?: number;
}

interface Sifat {
  id: number;
  ad: string;
  aciklama: string;
}

export default function HKSStoklarPage() {
  const [stoklar, setStoklar] = useState<StokOzeti[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedMonth, setSelectedMonth] = useState('2025-01')
  const [selectedSifat, setSelectedSifat] = useState<string>('all')
  const [sifatlar, setSifatlar] = useState<Sifat[]>([])
  const [connectionStatus, setConnectionStatus] = useState<'checking' | 'connected' | 'disconnected'>('checking')

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
      // Önce resmi sıfat listesi API'sini dene
      const sifatData = await safeFetch('/api/hks/bildirim/sifatlar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({})
      })

      if (sifatData.ok && sifatData.items && sifatData.items.length > 0) {
        setSifatlar(sifatData.items)
      } else {
        // Fallback: Künye verilerinden sıfatları çıkar
        const kunyeData = await safeFetch('/api/hks/bildirimciye', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            baslangic: '2025-01-01',
            bitis: '2025-01-31',
            kunyeNo: 0
          })
        })

        if (kunyeData.ok && kunyeData.items) {
          const uniqueSifatlar = new Map<number, Sifat>()
          
          kunyeData.items.forEach((item: any) => {
            const sifati = item.sifati
            if (sifati && !uniqueSifatlar.has(parseInt(sifati))) {
              // Sıfat ID'sine göre doğru adı belirle
              let sifatAdi = `Sıfat ${sifati}`
              if (sifati === '2') sifatAdi = 'İhracat'
              else if (sifati === '6') sifatAdi = 'Tüccar (Hal İçi)'
              
              uniqueSifatlar.set(parseInt(sifati), {
                id: parseInt(sifati),
                ad: sifatAdi,
                aciklama: `${sifatAdi} açıklaması`
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

  const loadStoklar = async () => {
    setLoading(true)
    setError(null)
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
          kunyeNo: 0,
          sifat: selectedSifat === 'all' ? undefined : selectedSifat
        })
      })
      
      // Stok özeti hesapla
      const stokMap = new Map<string, { 
        miktar: number, 
        birim: string, 
        urunAdi: string, 
        toplamKayit: number,
        sonGuncelleme: string,
        fiyatlar: number[],
        rusumBorclari: number[]
      }>()
      
      data.items?.forEach((item: any) => {
        const urunAdi = item.urunAdi || item.hayvanTuru || 'Bilinmeyen Ürün'
        const miktar = parseFloat(item.kalanMiktar || '0')
        const birim = item.birimAd || 'Kg'
        const bildirimTarihi = item.bildirimTarihi || ''
        const fiyat = parseFloat(item.fiyat || item.malinSatisFiyati || '0')
        const rusumBorcu = parseFloat(item.rusumBorcu || item.rusumMiktari || '0')
        
        // Debug: İlk birkaç item'ı logla
        if (data.items.indexOf(item) < 3) {
          console.log('Stok Item Debug:', {
            urunAdi,
            fiyat,
            rusumBorcu,
            rusumMiktari: item.rusumMiktari,
            malinSatisFiyati: item.malinSatisFiyati
          })
        }
        
        if (miktar > 0) {
          const key = `${urunAdi}_${birim}`
          if (stokMap.has(key)) {
            const existing = stokMap.get(key)!
            existing.miktar += miktar
            existing.toplamKayit += 1
            if (fiyat > 0) existing.fiyatlar.push(fiyat)
            if (rusumBorcu > 0) existing.rusumBorclari.push(rusumBorcu)
            // En son tarihi al
            if (bildirimTarihi > existing.sonGuncelleme) {
              existing.sonGuncelleme = bildirimTarihi
            }
          } else {
            stokMap.set(key, { 
              miktar, 
              birim, 
              urunAdi, 
              toplamKayit: 1,
              sonGuncelleme: bildirimTarihi,
              fiyatlar: fiyat > 0 ? [fiyat] : [],
              rusumBorclari: rusumBorcu > 0 ? [rusumBorcu] : []
            })
          }
        }
      })
      
      const stokOzeti = Array.from(stokMap.values())
        .sort((a, b) => b.miktar - a.miktar)
        .map(stok => ({
          urunAdi: stok.urunAdi,
          miktar: stok.miktar,
          birim: stok.birim,
          toplamKayit: stok.toplamKayit,
          sonGuncelleme: stok.sonGuncelleme ? new Date(stok.sonGuncelleme).toLocaleDateString('tr-TR') : '-',
          ortalamaFiyat: stok.fiyatlar.length > 0 ? stok.fiyatlar.reduce((a, b) => a + b, 0) / stok.fiyatlar.length : undefined,
          toplamRusumBorcu: stok.rusumBorclari.length > 0 ? stok.rusumBorclari.reduce((a, b) => a + b, 0) : undefined
        }))
      
      setStoklar(stokOzeti)
    } catch (error: any) {
      console.error('Stok verileri yüklenemedi:', error?.message)
      setError(error?.message || 'Stok verileri yüklenemedi')
      toast.error(error?.message || 'Stok verileri yüklenemedi')
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

  useEffect(() => {
    loadSifatlar()
    loadStoklar()
    testConnection()
  }, [])

  useEffect(() => {
    loadStoklar()
  }, [selectedMonth, selectedSifat])

  const formatDate = (dateString: string) => {
    if (!dateString) return '-'
    try {
      const date = new Date(dateString)
      return date.toLocaleDateString('tr-TR')
    } catch {
      return dateString
    }
  }

  const getToplamStok = () => {
    return stoklar.reduce((total, stok) => total + stok.miktar, 0)
  }

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('tr-TR').format(num)
  }

  const getToplamUrunCesidi = () => {
    return stoklar.length
  }

  const getEnCokStok = () => {
    return stoklar.length > 0 ? stoklar[0] : null
  }

  return (
    <div className="mt-10 ml-10 mr-10 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">HKS - Stoklarımız</h1>
          <p className="text-muted-foreground mt-2">Güncel stok durumu ve ürün bazlı özet</p>
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
          <Button onClick={loadStoklar} disabled={loading}>
            {loading ? <RefreshCw className="h-4 w-4 animate-spin" /> : 'Yenile'}
          </Button>
        </div>
      </div>

      {/* Filtreler */}
      <div className="flex items-center gap-4">
        <div>
          <label className="text-sm font-medium mb-2 block">Ay Seçimi</label>
          <Select value={selectedMonth} onValueChange={setSelectedMonth}>
            <SelectTrigger className="w-48">
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
        
        <div>
          <label className="text-sm font-medium mb-2 block">Sıfat Filtresi</label>
          <Select value={selectedSifat} onValueChange={setSelectedSifat}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Tüm sıfatlar" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tüm sıfatlar</SelectItem>
              {sifatlar.map((sifat) => (
                <SelectItem key={sifat.id} value={sifat.id.toString()}>
                  {sifat.ad}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Özet Kartları */}
      <div className="grid grid-cols-1 md:grid-cols-6 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Toplam Stok</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatNumber(getToplamStok())}</div>
            <p className="text-xs text-muted-foreground">Toplam miktar</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ürün Çeşidi</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{getToplamUrunCesidi()}</div>
            <p className="text-xs text-muted-foreground">Farklı ürün</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">En Çok Stok</CardTitle>
            <TrendingDown className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {getEnCokStok() ? formatNumber(getEnCokStok()!.miktar) : '0'}
            </div>
            <p className="text-xs text-muted-foreground">
              {getEnCokStok()?.urunAdi || 'Ürün yok'}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Toplam Kayıt</CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatNumber(stoklar.reduce((total, stok) => total + stok.toplamKayit, 0))}
            </div>
            <p className="text-xs text-muted-foreground">Bildirim kaydı</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ortalama Fiyat</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {(() => {
                const fiyatliStoklar = stoklar.filter(s => s.ortalamaFiyat);
                return fiyatliStoklar.length > 0 
                  ? (fiyatliStoklar.reduce((sum, s) => sum + s.ortalamaFiyat!, 0) / fiyatliStoklar.length).toFixed(2)
                  : '0.00';
              })()} ₺
            </div>
            <p className="text-xs text-muted-foreground">Genel ortalama</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Toplam Rüsum Borcu</CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatNumber(stoklar.reduce((total, stok) => total + (stok.toplamRusumBorcu || 0), 0))} ₺
            </div>
            <p className="text-xs text-muted-foreground">Toplam borç</p>
          </CardContent>
        </Card>
      </div>

      {/* Stok Listesi */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Package className="h-5 w-5" />
            Stok Detayları
          </CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-center py-8">
              <RefreshCw className="h-8 w-8 animate-spin mx-auto mb-4" />
              <p className="text-muted-foreground">Stok verileri yükleniyor...</p>
            </div>
          ) : error ? (
            <div className="text-center py-8">
              <AlertCircle className="h-8 w-8 text-red-500 mx-auto mb-4" />
              <p className="text-red-600 dark:text-red-400">{error}</p>
              <Button onClick={loadStoklar} className="mt-4">
                Tekrar Dene
              </Button>
            </div>
          ) : stoklar.length === 0 ? (
            <div className="text-center py-12">
              <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-lg font-medium text-muted-foreground">Stokta ürün bulunmuyor</p>
              <p className="text-sm text-muted-foreground mt-2">
                Seçilen ay için stok verisi bulunamadı
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {stoklar.map((stok, index) => (
                <div key={index} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                          <span className="text-sm font-bold text-blue-600 dark:text-blue-400">
                            {index + 1}
                          </span>
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900 dark:text-white">
                            {stok.urunAdi}
                          </h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {stok.toplamKayit} kayıt • Son güncelleme: {stok.sonGuncelleme}
                          </p>
                          <div className="flex gap-4 mt-1">
                            {stok.ortalamaFiyat && (
                              <span className="text-xs bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-2 py-1 rounded">
                                Ort. Fiyat: {formatNumber(stok.ortalamaFiyat)} ₺
                              </span>
                            )}
                            {stok.toplamRusumBorcu && (
                              <span className="text-xs bg-orange-100 dark:bg-orange-900 text-orange-800 dark:text-orange-200 px-2 py-1 rounded">
                                Rüsum Borcu: {formatNumber(stok.toplamRusumBorcu)} ₺
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-gray-900 dark:text-white">
                        {formatNumber(stok.miktar)}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        {stok.birim}
                      </div>
                    </div>
                  </div>
                  
                  {/* Progress bar */}
                  <div className="mt-3">
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div 
                        className="bg-blue-500 dark:bg-blue-400 h-2 rounded-full transition-all duration-300"
                        style={{ 
                          width: `${Math.min((stok.miktar / Math.max(...stoklar.map(s => s.miktar))) * 100, 100)}%` 
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
