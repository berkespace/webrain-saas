'use client'

import { useEffect, useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Search, Eye, RefreshCw, Wifi, WifiOff, Calendar, User, MapPin, AlertCircle } from 'lucide-react'
import { toast } from 'sonner'

interface Kunye {
  id: string
  kunyeNo: string
  hayvanTuru: string // Ürün Adı
  irk: string // Ürün Cinsi
  cinsiyet: string
  dogumTarihi: string // Üretim Tarihi
  sahipAdi: string // Malın Sahibi
  sahipTc: string
  kayitTarihi: string // Bildirim Tarihi
  durum: string
}

interface KunyeDetay {
  kunyeNo: string
  hayvanTuru: string // Ürün Adı
  irk: string // Ürün Cinsi
  cinsiyet: string
  dogumTarihi: string // Üretim Tarihi
  dogumYeri: string // Üretim Yeri
  sahipAdi: string // Malın Sahibi
  sahipTc: string
  sahipAdres: string
  kayitTarihi: string // Bildirim Tarihi
  durum: string
  notlar: string
  geçmişİşlemler: Array<{
    tarih: string
    işlem: string
    açıklama: string
  }>
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
  const [kunyeler, setKunyeler] = useState<Kunye[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedKunye, setSelectedKunye] = useState<KunyeDetay | null>(null)
  const [detailModalOpen, setDetailModalOpen] = useState(false)
  const [connectionStatus, setConnectionStatus] = useState<'checking' | 'connected' | 'disconnected'>('checking')
  const [error, setError] = useState<string | null>(null)

  const loadKunyeler = async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await safeFetch('/api/hks/bildirim/sorgu', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          BaslangicTarihi: '2025-08-12',
          BitisTarihi: '2025-09-11',
          KunyeNo: searchTerm ? parseInt(searchTerm) : 0,
          KalanMiktariSifirdanBuyukOlanlar: true
        })
      })
      
      setKunyeler(data.items || [])
    } catch (error: any) {
      console.error('HKS ERROR:', error?.message);
      setError(error?.message || 'Künye listesi yüklenemedi');
      toast.error(error?.message || 'Künye listesi yüklenemedi');
    }
    setLoading(false)
  }

  const testConnection = async () => {
    setConnectionStatus('checking')
    setError(null)
    try {
      // Self-check API'sini test et
      const selfCheckData = await safeFetch('/api/hks/_selfcheck', { cache: 'no-store' })
      
      if (selfCheckData.ok && selfCheckData.checks.every((c: any) => c.ok)) {
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
      const response = await fetch(`/api/hks?action=kunye-detay&kunyeNo=${kunyeNo}`, { cache: 'no-store' })
      const data = await response.json()
      
      if (data.success) {
        setSelectedKunye(data.data)
        setDetailModalOpen(true)
      } else {
        console.error('Künye detayı yüklenemedi:', data.error)
      }
    } catch (error) {
      console.error('Künye detayı yükleme hatası:', error)
    }
  }

  useEffect(() => {
    loadKunyeler()
    testConnection()
  }, [])

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      loadKunyeler()
    }, 500)
    return () => clearTimeout(timeoutId)
  }, [searchTerm])

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('tr-TR')
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Aktif':
        return <Badge variant="default" className="bg-green-500">Aktif</Badge>
      case 'Pasif':
        return <Badge variant="secondary">Pasif</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

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

  return (
    <div className="mt-10 ml-10 mr-10 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">HKS - Hal Kayıt Sistemi</h1>
          <p className="text-muted-foreground mt-2">Ticaret Bakanlığı HKS web servisleri entegrasyonu</p>
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

      {/* Hata Gösterimi */}
      {error && (
        <Card className="border-red-200 bg-red-50">
          <CardContent className="pt-6">
            <div className="flex items-center gap-2 text-red-700">
              <AlertCircle className="h-4 w-4" />
              <span className="font-medium">Hata:</span>
              <span className="text-sm">{error}</span>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Bağlantı Durumu Kartı */}
      <Card>
        <CardHeader>
          <CardTitle>HKS Servis Durumu</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full ${connectionStatus === 'connected' ? 'bg-green-500' : 'bg-red-500'}`} />
              <span className="text-sm">BildirimService</span>
              <span className="text-xs text-muted-foreground">hks.hal.gov.tr</span>
            </div>
            <div className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full ${connectionStatus === 'connected' ? 'bg-green-500' : 'bg-red-500'}`} />
              <span className="text-sm">GenelService</span>
              <span className="text-xs text-muted-foreground">hks.hal.gov.tr</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Arama ve Filtreler */}
      <Card>
        <CardHeader>
          <CardTitle>Künye Arama</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Künye numarası, sahip adı veya TC ile ara..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Button onClick={loadKunyeler} disabled={loading}>
              {loading ? <RefreshCw className="h-4 w-4 animate-spin" /> : 'Yenile'}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Künye Listesi */}
      <Card>
        <CardHeader>
          <CardTitle>Künye Listesi</CardTitle>
          <CardDescription>{kunyeler.length} kayıt bulundu</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-3">Künye No</th>
                  <th className="text-left p-3">Ürün Adı</th>
                  <th className="text-left p-3">Ürün Cinsi</th>
                  <th className="text-left p-3">Üretim Tarihi</th>
                  <th className="text-left p-3">Malın Sahibi</th>
                  <th className="text-left p-3">TC Kimlik No</th>
                  <th className="text-left p-3">Bildirim Tarihi</th>
                  <th className="text-left p-3">Durum</th>
                  <th className="text-left p-3">İşlemler</th>
                </tr>
              </thead>
              <tbody>
                {kunyeler.map((kunye) => (
                  <tr key={kunye.id} className="border-b hover:bg-muted/50">
                    <td className="p-3 font-mono text-sm">{kunye.kunyeNo}</td>
                    <td className="p-3 text-sm">{kunye.hayvanTuru}</td>
                    <td className="p-3 text-sm">{kunye.irk}</td>
                    <td className="p-3 text-sm">{formatDate(kunye.dogumTarihi)}</td>
                    <td className="p-3 text-sm font-medium">{kunye.sahipAdi}</td>
                    <td className="p-3 text-sm font-mono">{kunye.sahipTc}</td>
                    <td className="p-3 text-sm">{formatDate(kunye.kayitTarihi)}</td>
                    <td className="p-3">{getStatusBadge(kunye.durum)}</td>
                    <td className="p-3">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => loadKunyeDetay(kunye.kunyeNo)}
                        className="flex items-center gap-2"
                      >
                        <Eye className="h-4 w-4" />
                        Detay
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Künye Detay Modal */}
      <Dialog open={detailModalOpen} onOpenChange={setDetailModalOpen}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Künye Detayı - {selectedKunye?.kunyeNo}</DialogTitle>
          </DialogHeader>
          {selectedKunye && (
            <div className="space-y-6">
              {/* Temel Bilgiler */}
              <div>
                <h3 className="font-semibold mb-3">Temel Bilgiler</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-500">Künye No</label>
                    <p className="font-mono">{selectedKunye.kunyeNo}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Ürün Adı</label>
                    <p>{selectedKunye.hayvanTuru}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Ürün Cinsi</label>
                    <p>{selectedKunye.irk}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Üretim Tarihi</label>
                    <p>{formatDate(selectedKunye.dogumTarihi)}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Üretim Yeri</label>
                    <p>{selectedKunye.dogumYeri}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Bildirim Tarihi</label>
                    <p>{formatDate(selectedKunye.kayitTarihi)}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Durum</label>
                    <div>{getStatusBadge(selectedKunye.durum)}</div>
                  </div>
                </div>
              </div>

              {/* Malın Sahibi Bilgileri */}
              <div>
                <h3 className="font-semibold mb-3">Malın Sahibi Bilgileri</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-500">Malın Sahibi</label>
                    <p>{selectedKunye.sahipAdi}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">TC Kimlik No</label>
                    <p className="font-mono">{selectedKunye.sahipTc}</p>
                  </div>
                  <div className="col-span-2">
                    <label className="text-sm font-medium text-gray-500">Adres</label>
                    <p>{selectedKunye.sahipAdres}</p>
                  </div>
                </div>
              </div>

              {/* Notlar */}
              {selectedKunye.notlar && (
                <div>
                  <h3 className="font-semibold mb-3">Notlar</h3>
                  <p className="text-sm text-gray-600">{selectedKunye.notlar}</p>
                </div>
              )}

              {/* Geçmiş İşlemler */}
              <div>
                <h3 className="font-semibold mb-3">Geçmiş İşlemler</h3>
                <div className="space-y-2">
                  {selectedKunye.geçmişİşlemler.map((işlem, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 border rounded-lg">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <div className="flex-1">
                        <div className="font-medium">{işlem.işlem}</div>
                        <div className="text-sm text-muted-foreground">{işlem.açıklama}</div>
                      </div>
                      <div className="text-sm text-muted-foreground">{formatDate(işlem.tarih)}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
