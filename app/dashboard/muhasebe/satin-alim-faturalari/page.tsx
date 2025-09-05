'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { useToast } from '@/components/ui/use-toast'
import { 
  FileText, 
  Eye, 
  Check, 
  X, 
  Calendar, 
  User, 
  Package,
  TrendingUp,
  Clock,
  Filter,
  Search
} from 'lucide-react'

interface MalKabulRecord {
  id: string
  fisNo: string
  tarih: string
  urunler: {
    ad: string
    kategori: string
    birim: string
  }
  netKg: number
  netAdet: number
  birimFiyat: number
  toplamFiyat: number
  kdvHaricTutar: number
  kdvOrani: number
  belediyeRusumOrani: number
  faturaYontemi: string
  faturaSeriNo?: string
  faturaTarihi?: string
  faturaAciklamasi?: string
  onayDurumu: string
  fiyatGirenKullanici?: string
  komisyoncular?: { dukkanAdi: string }
  ureticiler?: { ad: string; soyad: string }
  ozel_firmalar?: { firmaAdi: string }
  mustahsil?: { ad: string; soyad: string }
  saticiTipi: string
}

const statusColors = {
  'BEKLEMEDE': 'bg-yellow-100 text-yellow-800',
  'ONAYLANDI': 'bg-green-100 text-green-800',
  'REDDEDILDI': 'bg-red-100 text-red-800'
}

const statusTexts = {
  'BEKLEMEDE': 'Onay Bekliyor',
  'ONAYLANDI': 'Onaylandı',
  'REDDEDILDI': 'Reddedildi'
}

export default function SatinAlimFaturalari() {
  const [records, setRecords] = useState<MalKabulRecord[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedRecord, setSelectedRecord] = useState<MalKabulRecord | null>(null)
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false)
  const [isApprovalModalOpen, setIsApprovalModalOpen] = useState(false)
  const [approvalAction, setApprovalAction] = useState<'approve' | 'reject' | null>(null)
  const [rejectReason, setRejectReason] = useState('')
  const [processing, setProcessing] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('ALL')
  const { toast } = useToast()

  // Türkçe sayı formatı fonksiyonu
  const formatNumber = (num: number): string => {
    return new Intl.NumberFormat('tr-TR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(num)
  }

  useEffect(() => {
    fetchRecords()
  }, [])

  const fetchRecords = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/mal-kabul?limit=1000')
      const data = await response.json()
      
      if (response.ok) {
        // Sadece fiyat girilmiş kayıtları filtrele
        const pricedRecords = (data.records || []).filter((record: MalKabulRecord) => 
          record.birimFiyat && record.birimFiyat > 0
        )
        setRecords(pricedRecords)
      } else {
        console.error('Kayıtlar alınamadı:', data.error)
      }
    } catch (error) {
      console.error('API hatası:', error)
    } finally {
      setLoading(false)
    }
  }

  const getSaticiAdi = (record: MalKabulRecord) => {
    switch (record.saticiTipi) {
      case 'KOMISYONCU':
        return record.komisyoncular?.dukkanAdi || 'Bilinmeyen Komisyoncu'
      case 'URETICI':
        return record.ureticiler ? `${record.ureticiler.ad} ${record.ureticiler.soyad}` : 'Bilinmeyen Üretici'
      case 'OZEL_FIRMA':
        return record.ozel_firmalar?.firmaAdi || 'Bilinmeyen Firma'
      case 'MUSTAHSIL':
        return record.mustahsil ? `${record.mustahsil.ad} ${record.mustahsil.soyad}` : 'Bilinmeyen Müstahsil'
      default:
        return 'Bilinmeyen Satıcı'
    }
  }

  // Filtreleme
  const filteredRecords = records.filter(record => {
    const matchesSearch = 
      record.fisNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.urunler.ad.toLowerCase().includes(searchTerm.toLowerCase()) ||
      getSaticiAdi(record).toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.faturaSeriNo?.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesStatus = statusFilter === 'ALL' || record.onayDurumu === statusFilter
    
    return matchesSearch && matchesStatus
  })

  // Özetler
  const summaryData = {
    total: filteredRecords.length,
    pending: filteredRecords.filter(r => r.onayDurumu === 'BEKLEMEDE').length,
    approved: filteredRecords.filter(r => r.onayDurumu === 'ONAYLANDI').length,
    rejected: filteredRecords.filter(r => r.onayDurumu === 'REDDEDILDI').length,
    totalAmount: filteredRecords.reduce((sum, r) => sum + (r.toplamFiyat || 0), 0)
  }

  const openDetailModal = (record: MalKabulRecord) => {
    setSelectedRecord(record)
    setIsDetailModalOpen(true)
  }

  const openApprovalModal = (record: MalKabulRecord, action: 'approve' | 'reject') => {
    setSelectedRecord(record)
    setApprovalAction(action)
    setIsApprovalModalOpen(true)
    setRejectReason('')
  }

  const handleApproval = async () => {
    if (!selectedRecord || !approvalAction) return

    setProcessing(true)
    try {
      const response = await fetch('/api/mal-kabul/approve-invoice', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          recordId: selectedRecord.id,
          action: approvalAction,
          rejectReason: approvalAction === 'reject' ? rejectReason : undefined
        })
      })

      if (response.ok) {
        toast({
          title: "Başarılı",
          description: approvalAction === 'approve' ? 'Fatura onaylandı.' : 'Fatura reddedildi.',
        })
        setIsApprovalModalOpen(false)
        fetchRecords() // Listeyi yenile
      } else {
        const data = await response.json()
        toast({
          title: "Hata",
          description: data.error || 'İşlem başarısız.',
          variant: "destructive"
        })
      }
    } catch (error) {
      toast({
        title: "Hata",
        description: 'Bir hata oluştu.',
        variant: "destructive"
      })
    } finally {
      setProcessing(false)
    }
  }

  return (
    <div className="mt-10 ml-10 mr-10 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Satın Alım Faturaları</h1>
          <p className="text-muted-foreground">
            Fiyat bilgisi girilen kayıtların onay durumunu yönetin
          </p>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Toplam Kayıt</CardTitle>
            <FileText className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{summaryData.total}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Onay Bekleyen</CardTitle>
            <Clock className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{summaryData.pending}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Onaylanan</CardTitle>
            <Check className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{summaryData.approved}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Reddedilen</CardTitle>
            <X className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{summaryData.rejected}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Toplam Tutar</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ₺{formatNumber(summaryData.totalAmount)}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filtreler
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="search">Arama</Label>
              <div className="relative">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  id="search"
                  placeholder="Fiş no, ürün, satıcı ara..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="status">Onay Durumu</Label>
              <select
                id="status"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <option value="ALL">Tümü</option>
                <option value="BEKLEMEDE">Onay Bekleyen</option>
                <option value="ONAYLANDI">Onaylanan</option>
                <option value="REDDEDILDI">Reddedilen</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Records Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-blue-600" />
            Fatura Kayıtları
          </CardTitle>
          <CardDescription>
            {filteredRecords.length} kayıt gösteriliyor
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-center py-8">Yükleniyor...</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-3 font-medium">Fiş No</th>
                    <th className="text-left p-3 font-medium">Tarih</th>
                    <th className="text-left p-3 font-medium">Ürün</th>
                    <th className="text-left p-3 font-medium">Satıcı</th>
                    <th className="text-left p-3 font-medium">Net Miktar</th>
                    <th className="text-left p-3 font-medium">Toplam Tutar</th>
                    <th className="text-left p-3 font-medium">Fatura Yöntemi</th>
                    <th className="text-left p-3 font-medium">Durum</th>
                    <th className="text-left p-3 font-medium">İşlemler</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredRecords.map((record) => (
                    <tr key={record.id} className="border-b hover:bg-muted/50">
                      <td className="p-3">
                        <div className="font-mono text-sm">{record.fisNo}</div>
                      </td>
                      <td className="p-3">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">
                            {new Date(record.tarih).toLocaleDateString('tr-TR')}
                          </span>
                        </div>
                      </td>
                      <td className="p-3">
                        <div>
                          <div className="font-medium">{record.urunler.ad}</div>
                          <div className="text-sm text-muted-foreground">
                            {record.urunler.kategori} • {record.urunler.birim}
                          </div>
                        </div>
                      </td>
                      <td className="p-3">
                        <div className="text-sm font-medium">
                          {getSaticiAdi(record)}
                        </div>
                      </td>
                      <td className="p-3">
                        <div className="text-sm font-medium">
                          {record.urunler.birim?.toLowerCase() === 'kg' 
                            ? `${record.netKg || 0} KG`
                            : `${record.netAdet || 0} Adet`
                          }
                        </div>
                      </td>
                      <td className="p-3">
                        <div className="text-sm font-medium">
                          ₺{formatNumber(record.toplamFiyat || 0)}
                        </div>
                      </td>
                      <td className="p-3">
                        <Badge variant={record.faturaYontemi === 'MANUEL' ? 'default' : 'secondary'}>
                          {record.faturaYontemi === 'MANUEL' ? 'Manuel' : 'Evrak'}
                        </Badge>
                      </td>
                      <td className="p-3">
                        <Badge className={statusColors[record.onayDurumu as keyof typeof statusColors]}>
                          {statusTexts[record.onayDurumu as keyof typeof statusTexts]}
                        </Badge>
                      </td>
                      <td className="p-3">
                        <div className="flex gap-1">
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => openDetailModal(record)}
                            title="Detayları Görüntüle"
                          >
                            <Eye className="h-3 w-3" />
                          </Button>
                          {record.onayDurumu === 'BEKLEMEDE' && (
                            <>
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => openApprovalModal(record, 'approve')}
                                title="Onayla"
                                className="text-green-600 hover:text-green-700"
                              >
                                <Check className="h-3 w-3" />
                              </Button>
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => openApprovalModal(record, 'reject')}
                                title="Reddet"
                                className="text-red-600 hover:text-red-700"
                              >
                                <X className="h-3 w-3" />
                              </Button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Detail Modal */}
      <Dialog open={isDetailModalOpen} onOpenChange={setIsDetailModalOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Fatura Detayları</DialogTitle>
            <DialogDescription>
              {selectedRecord?.fisNo} numaralı fiş detayları
            </DialogDescription>
          </DialogHeader>
          {selectedRecord && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Fiş No</Label>
                  <div className="font-mono">{selectedRecord.fisNo}</div>
                </div>
                <div>
                  <Label>Tarih</Label>
                  <div>{new Date(selectedRecord.tarih).toLocaleDateString('tr-TR')}</div>
                </div>
                <div>
                  <Label>Ürün</Label>
                  <div>{selectedRecord.urunler.ad}</div>
                </div>
                <div>
                  <Label>Satıcı</Label>
                  <div>{getSaticiAdi(selectedRecord)}</div>
                </div>
                <div>
                  <Label>Net Miktar</Label>
                  <div>
                    {selectedRecord.urunler.birim?.toLowerCase() === 'kg' 
                      ? `${selectedRecord.netKg || 0} KG`
                      : `${selectedRecord.netAdet || 0} Adet`
                    }
                  </div>
                </div>
                <div>
                  <Label>Birim Fiyat</Label>
                  <div>₺{formatNumber(selectedRecord.birimFiyat || 0)}</div>
                </div>
                <div>
                  <Label>KDV Hariç Tutar</Label>
                  <div>₺{formatNumber(selectedRecord.kdvHaricTutar || 0)}</div>
                </div>
                <div>
                  <Label>Toplam Tutar</Label>
                  <div>₺{formatNumber(selectedRecord.toplamFiyat || 0)}</div>
                </div>
              </div>

              {selectedRecord.faturaYontemi === 'MANUEL' && (
                <div className="border-t pt-4">
                  <h4 className="font-medium mb-2">Manuel Fatura Bilgileri</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Fatura Seri No</Label>
                      <div>{selectedRecord.faturaSeriNo || '-'}</div>
                    </div>
                    <div>
                      <Label>Fatura Tarihi</Label>
                      <div>
                        {selectedRecord.faturaTarihi 
                          ? new Date(selectedRecord.faturaTarihi).toLocaleDateString('tr-TR')
                          : '-'
                        }
                      </div>
                    </div>
                  </div>
                  {selectedRecord.faturaAciklamasi && (
                    <div className="mt-2">
                      <Label>Açıklama</Label>
                      <div className="text-sm bg-muted p-2 rounded">
                        {selectedRecord.faturaAciklamasi}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Approval Modal */}
      <Dialog open={isApprovalModalOpen} onOpenChange={setIsApprovalModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {approvalAction === 'approve' ? 'Faturayı Onayla' : 'Faturayı Reddet'}
            </DialogTitle>
            <DialogDescription>
              {selectedRecord?.fisNo} numaralı fişi {approvalAction === 'approve' ? 'onaylamak' : 'reddetmek'} istediğinizden emin misiniz?
            </DialogDescription>
          </DialogHeader>
          
          {approvalAction === 'reject' && (
            <div className="space-y-2">
              <Label htmlFor="rejectReason">Red Nedeni</Label>
              <Textarea
                id="rejectReason"
                value={rejectReason}
                onChange={(e) => setRejectReason(e.target.value)}
                placeholder="Red nedenini açıklayın..."
                rows={3}
              />
            </div>
          )}

          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setIsApprovalModalOpen(false)}>
              İptal
            </Button>
            <Button 
              onClick={handleApproval} 
              disabled={processing || (approvalAction === 'reject' && !rejectReason.trim())}
              variant={approvalAction === 'approve' ? 'default' : 'destructive'}
            >
              {processing ? 'İşleniyor...' : (approvalAction === 'approve' ? 'Onayla' : 'Reddet')}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
