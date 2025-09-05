'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { 
  CreditCard, 
  Search, 
  Filter, 
  Download, 
  Eye,
  Calendar,
  Scale,
  DollarSign,
  TrendingUp,
  AlertCircle,
  FileText,
  CheckCircle,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  FileSpreadsheet,
  FileText as PdfIcon,
  Calculator,
  ExternalLink
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { useToast } from '@/components/ui/use-toast'

interface CariHesapRecord {
  id: string
  saticiTipi: string
  saticiId: string
  saticiAdi: string
  alisTarihi: string
  fisNo: string
  malKabulRecordId: string
  toplamAlisMiktari: number
  birimFiyat: number
  kdvHaricTutar: number
  herseyDahilTutar: number
  cariBakiyesi: number
  malKabulRecord: {
    id: string
    fisNo: string
    tarih: string
    urunler: {
      id: string
      ad: string
      kategori: string
      birim: string
    }
    users: {
      id: string
      firstName: string
      lastName: string
    }
    komisyoncular?: {
      id: string
      dukkanAdi: string
      komisyonNo: string
    }
    ureticiler?: {
      id: string
      ad: string
      soyad: string
    }
    mustahsil?: {
      id: string
      ad: string
      soyad: string
    }
    ozel_firmalar?: {
      id: string
      firmaAdi: string
    }
  }
}

export default function CariHesaplar() {
  const [records, setRecords] = useState<CariHesapRecord[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [saticiTipiFilter, setSaticiTipiFilter] = useState<string>('ALL')
  const [sortBy, setSortBy] = useState<'alisTarihi' | 'fisNo' | 'cariBakiyesi'>('alisTarihi')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc')
  const [exportLoading, setExportLoading] = useState(false)
  const [selectedRecord, setSelectedRecord] = useState<CariHesapRecord | null>(null)
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false)
  
  const { toast } = useToast()

  useEffect(() => {
    fetchRecords()
  }, [])

  const fetchRecords = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/cari-hesaplar')
      const data = await response.json()
      
      if (response.ok) {
        setRecords(data.records || [])
      } else {
        console.error('Cari hesaplar alınamadı:', data.error)
        toast({
          title: "Hata",
          description: "Cari hesaplar yüklenemedi.",
          variant: "destructive"
        })
      }
    } catch (error) {
      console.error('Cari hesaplar fetch hatası:', error)
      toast({
        title: "Hata",
        description: "Cari hesaplar yüklenemedi.",
        variant: "destructive"
      })
    } finally {
      setLoading(false)
    }
  }

  const filteredRecords = records.filter(record => {
    const matchesSearch = 
      record.fisNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.saticiAdi.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.malKabulRecord.urunler.ad.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesSaticiTipi = saticiTipiFilter === 'ALL' || record.saticiTipi === saticiTipiFilter
    
    return matchesSearch && matchesSaticiTipi
  })

  // Sıralama fonksiyonu
  const sortedRecords = [...filteredRecords].sort((a, b) => {
    let aValue: string | number = ''
    let bValue: string | number = ''
    
    switch (sortBy) {
      case 'alisTarihi':
        aValue = new Date(a.alisTarihi).getTime()
        bValue = new Date(b.alisTarihi).getTime()
        return sortOrder === 'asc' ? aValue - bValue : bValue - aValue
      case 'fisNo':
        aValue = a.fisNo
        bValue = b.fisNo
        return sortOrder === 'asc' ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue)
      case 'cariBakiyesi':
        aValue = a.cariBakiyesi
        bValue = b.cariBakiyesi
        return sortOrder === 'asc' ? aValue - bValue : bValue - aValue
      default:
        return 0
    }
  })

  const totalRecords = filteredRecords.length
  const totalKdvHaric = filteredRecords.reduce((sum, record) => sum + record.kdvHaricTutar, 0)
  const totalHerseyDahil = filteredRecords.reduce((sum, record) => sum + record.herseyDahilTutar, 0)
  const totalBakiye = filteredRecords.reduce((sum, record) => sum + record.cariBakiyesi, 0)

  const openDetailModal = (record: CariHesapRecord) => {
    setSelectedRecord(record)
    setIsDetailModalOpen(true)
  }

  const closeDetailModal = () => {
    setIsDetailModalOpen(false)
    setSelectedRecord(null)
  }

  // Export fonksiyonları
  const exportToExcel = async () => {
    setExportLoading(true)
    try {
      const data = sortedRecords.map(record => ({
        'Alış Tarihi': new Date(record.alisTarihi).toLocaleDateString('tr-TR'),
        'Fiş No': record.fisNo,
        'Satıcı': record.saticiAdi,
        'Satıcı Tipi': record.saticiTipi,
        'Ürün': record.malKabulRecord.urunler.ad,
        'Toplam Alış Miktarı': record.toplamAlisMiktari,
        'Birim Fiyat': record.birimFiyat,
        'KDV Vergi Hariç': record.kdvHaricTutar,
        'Herşey Dahil Tutar': record.herseyDahilTutar,
        'Cari Bakiyesi': record.cariBakiyesi
      }))

      const csvContent = [
        Object.keys(data[0]).join(','),
        ...data.map(row => Object.values(row).map(val => `"${val}"`).join(','))
      ].join('\n')

      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
      const link = document.createElement('a')
      const url = URL.createObjectURL(blob)
      link.setAttribute('href', url)
      link.setAttribute('download', `cari-hesaplar-${new Date().toISOString().split('T')[0]}.csv`)
      link.style.visibility = 'hidden'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    } catch (error) {
      console.error('Excel export hatası:', error)
    } finally {
      setExportLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <CreditCard className="h-8 w-8 animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Cari hesaplar yükleniyor...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="mt-10 ml-10 mr-10 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Cari Hesaplar</h1>
          <p className="text-muted-foreground">
            Satıcıların alış kayıtları ve cari bakiyeleri
          </p>
        </div>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={exportToExcel}
            disabled={exportLoading || sortedRecords.length === 0}
          >
            <FileSpreadsheet className="h-4 w-4 mr-2" />
            {exportLoading ? 'İndiriliyor...' : 'Excel İndir'}
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Toplam Kayıt</CardTitle>
            <CreditCard className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalRecords}</div>
            <p className="text-xs text-muted-foreground">
              Cari hesap kayıtları
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">KDV Hariç Toplam</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {totalKdvHaric.toLocaleString('tr-TR', { style: 'currency', currency: 'TRY' })}
            </div>
            <p className="text-xs text-muted-foreground">
              Vergi hariç tutar
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Herşey Dahil Toplam</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {totalHerseyDahil.toLocaleString('tr-TR', { style: 'currency', currency: 'TRY' })}
            </div>
            <p className="text-xs text-muted-foreground">
              Vergi dahil tutar
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Toplam Bakiye</CardTitle>
            <Scale className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {totalBakiye.toLocaleString('tr-TR', { style: 'currency', currency: 'TRY' })}
            </div>
            <p className="text-xs text-muted-foreground">
              Cari bakiyeler toplamı
            </p>
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
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Arama</label>
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Fiş no, satıcı, ürün ara..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Satıcı Tipi</label>
              <Select value={saticiTipiFilter} onValueChange={setSaticiTipiFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Satıcı tipi seçin" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ALL">Tümü</SelectItem>
                  <SelectItem value="KOMISYONCU">Komisyoncu</SelectItem>
                  <SelectItem value="OZEL_FIRMA">Özel Firma</SelectItem>
                  <SelectItem value="MUSTAHSIL">Müstahsil</SelectItem>
                  <SelectItem value="URETICI">Üretici</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Sıralama</label>
              <Select value={sortBy} onValueChange={(value: 'alisTarihi' | 'fisNo' | 'cariBakiyesi') => setSortBy(value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Sıralama kriteri" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="alisTarihi">Alış Tarihi</SelectItem>
                  <SelectItem value="fisNo">Fiş No</SelectItem>
                  <SelectItem value="cariBakiyesi">Cari Bakiyesi</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Sıralama Yönü</label>
              <div className="flex gap-2">
                <Button
                  variant={sortOrder === 'asc' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSortOrder('asc')}
                  className="flex-1"
                >
                  <ArrowUp className="h-4 w-4 mr-1" />
                  Küçükten Büyüğe
                </Button>
                <Button
                  variant={sortOrder === 'desc' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSortOrder('desc')}
                  className="flex-1"
                >
                  <ArrowDown className="h-4 w-4 mr-1" />
                  Büyükten Küçüğe
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="h-5 w-5 text-blue-600" />
            Cari Hesaplar
          </CardTitle>
          <CardDescription>
            {sortedRecords.length} cari hesap kaydı gösteriliyor
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-3 font-medium">Alış Tarihi</th>
                  <th className="text-left p-3 font-medium">Fiş No</th>
                  <th className="text-left p-3 font-medium">Satıcı</th>
                  <th className="text-left p-3 font-medium">Ürün</th>
                  <th className="text-left p-3 font-medium">Toplam Alış Miktarı</th>
                  <th className="text-left p-3 font-medium">KDV Vergi Hariç</th>
                  <th className="text-left p-3 font-medium">Herşey Dahil Tutar</th>
                  <th className="text-left p-3 font-medium">Cari Bakiyesi</th>
                  <th className="text-left p-3 font-medium">İşlemler</th>
                </tr>
              </thead>
              <tbody>
                {sortedRecords.map((record) => (
                  <tr key={record.id} className="border-b hover:bg-muted/50">
                    <td className="p-3">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">
                          {new Date(record.alisTarihi).toLocaleDateString('tr-TR')}
                        </span>
                      </div>
                    </td>
                    <td className="p-3">
                      <div className="font-mono text-sm">{record.fisNo}</div>
                    </td>
                    <td className="p-3">
                      <div>
                        <div className="font-medium">{record.saticiAdi}</div>
                        <div className="text-sm text-muted-foreground">
                          {record.saticiTipi}
                        </div>
                      </div>
                    </td>
                    <td className="p-3">
                      <div>
                        <div className="font-medium">{record.malKabulRecord.urunler.ad}</div>
                        <div className="text-sm text-muted-foreground">
                          {record.malKabulRecord.urunler.kategori} • {record.malKabulRecord.urunler.birim}
                        </div>
                      </div>
                    </td>
                    <td className="p-3">
                      <div className="text-sm font-medium">
                        {record.toplamAlisMiktari} {record.malKabulRecord.urunler.birim}
                      </div>
                    </td>
                    <td className="p-3">
                      <div className="text-sm font-medium">
                        {record.kdvHaricTutar.toLocaleString('tr-TR', { 
                          style: 'currency', 
                          currency: 'TRY' 
                        })}
                      </div>
                    </td>
                    <td className="p-3">
                      <div className="text-sm font-medium">
                        {record.herseyDahilTutar.toLocaleString('tr-TR', { 
                          style: 'currency', 
                          currency: 'TRY' 
                        })}
                      </div>
                    </td>
                    <td className="p-3">
                      <div className="text-sm font-bold text-green-600">
                        {record.cariBakiyesi.toLocaleString('tr-TR', { 
                          style: 'currency', 
                          currency: 'TRY' 
                        })}
                      </div>
                    </td>
                    <td className="p-3">
                      <div className="flex gap-1">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => openDetailModal(record)}
                          title="Fiş Detayları"
                        >
                          <Eye className="h-3 w-3" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {sortedRecords.length === 0 && (
            <div className="text-center py-8">
              <CreditCard className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">Cari hesap bulunamadı</h3>
              <p className="text-muted-foreground">
                Şu anda cari hesap kaydı bulunmuyor.
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Fiş Detayları Modal */}
      <Dialog open={isDetailModalOpen} onOpenChange={setIsDetailModalOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Fiş Detayları - {selectedRecord?.fisNo}
            </DialogTitle>
            <DialogDescription>
              {selectedRecord?.malKabulRecord.urunler.ad} için detaylı bilgiler
            </DialogDescription>
          </DialogHeader>

          {selectedRecord && (
            <div className="grid gap-6 md:grid-cols-2">
              {/* Sol Kolon - Genel Bilgiler */}
              <div className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Genel Bilgiler</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Fiş No:</span>
                      <span className="font-medium">{selectedRecord.fisNo}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Alış Tarihi:</span>
                      <span className="font-medium">
                        {new Date(selectedRecord.alisTarihi).toLocaleDateString('tr-TR')}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Satıcı:</span>
                      <span className="font-medium">{selectedRecord.saticiAdi}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Satıcı Tipi:</span>
                      <Badge variant="outline">{selectedRecord.saticiTipi}</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Mal Kabulcu:</span>
                      <span className="font-medium">
                        {selectedRecord.malKabulRecord.users.firstName} {selectedRecord.malKabulRecord.users.lastName}
                      </span>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Ürün Bilgileri</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Ürün:</span>
                      <span className="font-medium">{selectedRecord.malKabulRecord.urunler.ad}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Kategori:</span>
                      <span className="font-medium">{selectedRecord.malKabulRecord.urunler.kategori}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Birim:</span>
                      <span className="font-medium">{selectedRecord.malKabulRecord.urunler.birim}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Toplam Miktar:</span>
                      <span className="font-medium">
                        {selectedRecord.toplamAlisMiktari} {selectedRecord.malKabulRecord.urunler.birim}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Sağ Kolon - Fiyat Bilgileri */}
              <div className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Fiyat Bilgileri</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Birim Fiyat:</span>
                      <span className="font-medium">
                        {selectedRecord.birimFiyat.toLocaleString('tr-TR', { 
                          style: 'currency', 
                          currency: 'TRY' 
                        })}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">KDV Vergi Hariç:</span>
                      <span className="font-medium">
                        {selectedRecord.kdvHaricTutar.toLocaleString('tr-TR', { 
                          style: 'currency', 
                          currency: 'TRY' 
                        })}
                      </span>
                    </div>
                    <div className="flex justify-between border-t pt-2">
                      <span className="text-muted-foreground">Herşey Dahil Tutar:</span>
                      <span className="font-bold text-lg">
                        {selectedRecord.herseyDahilTutar.toLocaleString('tr-TR', { 
                          style: 'currency', 
                          currency: 'TRY' 
                        })}
                      </span>
                    </div>
                    <div className="flex justify-between border-t pt-2">
                      <span className="text-muted-foreground">Cari Bakiyesi:</span>
                      <span className="font-bold text-lg text-green-600">
                        {selectedRecord.cariBakiyesi.toLocaleString('tr-TR', { 
                          style: 'currency', 
                          currency: 'TRY' 
                        })}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          <div className="flex justify-end gap-2 pt-4 border-t">
            <Button variant="outline" onClick={closeDetailModal}>
              Kapat
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
