'use client'

import { useEffect, useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Search, Eye, RefreshCw, Wifi, WifiOff, Calendar, User, MapPin } from 'lucide-react'

interface Kunye {
  id: string
  kunyeNo: string
  hayvanTuru: string
  irk: string
  cinsiyet: string
  dogumTarihi: string
  sahipAdi: string
  sahipTc: string
  kayitTarihi: string
  durum: string
}

interface KunyeDetay {
  kunyeNo: string
  hayvanTuru: string
  irk: string
  cinsiyet: string
  dogumTarihi: string
  dogumYeri: string
  sahipAdi: string
  sahipTc: string
  sahipAdres: string
  kayitTarihi: string
  durum: string
  notlar: string
  geçmişİşlemler: Array<{
    tarih: string
    işlem: string
    açıklama: string
  }>
}

export default function HKSPage() {
  const [kunyeler, setKunyeler] = useState<Kunye[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedKunye, setSelectedKunye] = useState<KunyeDetay | null>(null)
  const [detailModalOpen, setDetailModalOpen] = useState(false)
  const [connectionStatus, setConnectionStatus] = useState<'checking' | 'connected' | 'disconnected'>('checking')

  const loadKunyeler = async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams()
      params.set('action', 'künyeler')
      if (searchTerm) params.set('search', searchTerm)
      
      const response = await fetch(`/api/hks?${params.toString()}`, { cache: 'no-store' })
      const data = await response.json()
      
      if (data.success) {
        setKunyeler(data.data.kunyeler || [])
      } else {
        console.error('Künye listesi yüklenemedi:', data.error)
      }
    } catch (error) {
      console.error('Künye listesi yükleme hatası:', error)
    }
    setLoading(false)
  }

  const testConnection = async () => {
    setConnectionStatus('checking')
    try {
      const response = await fetch('/api/hks?action=test-bağlantı', { cache: 'no-store' })
      const data = await response.json()
      
      if (data.success) {
        setConnectionStatus('connected')
      } else {
        setConnectionStatus('disconnected')
      }
    } catch (error) {
      console.error('Bağlantı testi hatası:', error)
      setConnectionStatus('disconnected')
    }
  }

  const loadKunyeDetay = async (kunyeNo: string) => {
    try {
      const response = await fetch(`/api/hks?action=künye-detay&kunyeNo=${kunyeNo}`, { cache: 'no-store' })
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
                  <th className="text-left p-3">Hayvan Türü</th>
                  <th className="text-left p-3">Irk</th>
                  <th className="text-left p-3">Cinsiyet</th>
                  <th className="text-left p-3">Doğum Tarihi</th>
                  <th className="text-left p-3">Sahip</th>
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
                    <td className="p-3 text-sm">{kunye.cinsiyet}</td>
                    <td className="p-3 text-sm">{formatDate(kunye.dogumTarihi)}</td>
                    <td className="p-3 text-sm">
                      <div>
                        <div className="font-medium">{kunye.sahipAdi}</div>
                        <div className="text-xs text-muted-foreground">{kunye.sahipTc}</div>
                      </div>
                    </td>
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
                    <label className="text-sm font-medium text-gray-500">Hayvan Türü</label>
                    <p>{selectedKunye.hayvanTuru}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Irk</label>
                    <p>{selectedKunye.irk}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Cinsiyet</label>
                    <p>{selectedKunye.cinsiyet}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Doğum Tarihi</label>
                    <p>{formatDate(selectedKunye.dogumTarihi)}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Doğum Yeri</label>
                    <p>{selectedKunye.dogumYeri}</p>
                  </div>
                </div>
              </div>

              {/* Sahip Bilgileri */}
              <div>
                <h3 className="font-semibold mb-3">Sahip Bilgileri</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-500">Sahip Adı</label>
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
