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
  faturaSeriNo?: string
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

interface SaticiOption {
  id: string
  name: string
  type: string
}

export default function CariHesaplar() {
  const [records, setRecords] = useState<CariHesapRecord[]>([])
  const [loading, setLoading] = useState(true)
  const [saticilar, setSaticilar] = useState<SaticiOption[]>([])
  const [selectedSatici, setSelectedSatici] = useState<string>('')
  const [searchTerm, setSearchTerm] = useState('')
  const [saticiTipiFilter, setSaticiTipiFilter] = useState<string>('ALL')
  const [sortBy, setSortBy] = useState<'alisTarihi' | 'fisNo' | 'cariBakiyesi'>('alisTarihi')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc')
  const [exportLoading, setExportLoading] = useState(false)
  const [selectedRecord, setSelectedRecord] = useState<CariHesapRecord | null>(null)
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false)
  const [isReceiptModalOpen, setIsReceiptModalOpen] = useState(false)
  
  const { toast } = useToast()

  useEffect(() => {
    fetchSaticilar()
    // İlk yükleme için loading'i 2 saniye sonra false yap (fallback)
    const timeout = setTimeout(() => {
      setLoading(false)
    }, 2000)
    
    return () => clearTimeout(timeout)
  }, [])

  useEffect(() => {
    if (selectedSatici) {
      fetchRecords(selectedSatici)
    } else {
      setRecords([])
    }
  }, [selectedSatici])

  const fetchSaticilar = async () => {
    try {
      console.log('Satıcılar yükleniyor...')
      const response = await fetch('/api/cari-hesaplar?action=saticilar')
      const data = await response.json()
      
      console.log('Satıcı response:', response.ok, data)
      
      if (response.ok) {
        setSaticilar(data.saticilar || [])
        console.log('Satıcılar yüklendi:', data.saticilar)
      } else {
        console.error('Satıcılar alınamadı:', data.error)
      }
    } catch (error) {
      console.error('Satıcılar fetch hatası:', error)
    } finally {
      // İlk yükleme bittiğinde loading'i false yap
      setLoading(false)
    }
  }

  const fetchRecords = async (saticiId: string) => {
    try {
      setLoading(true)
      const response = await fetch(`/api/cari-hesaplar?saticiId=${saticiId}`)
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

  const openReceiptModal = (record: CariHesapRecord) => {
    setSelectedRecord(record)
    setIsReceiptModalOpen(true)
  }

  const closeReceiptModal = () => {
    setIsReceiptModalOpen(false)
    setSelectedRecord(null)
  }

  const printReceipt = () => {
    if (!selectedRecord) return

    const malKabulRecord = selectedRecord.malKabulRecord
    const logoPath = `${window.location.origin}/logo-dark.png`
    
    // Satıcı adını al
    const getSaticiAdi = () => {
      switch (malKabulRecord.saticiTipi) {
        case 'KOMISYONCU':
          return malKabulRecord.komisyoncular?.dukkanAdi || 'Bilinmeyen Komisyoncu'
        case 'URETICI':
          return malKabulRecord.ureticiler ? 
            `${malKabulRecord.ureticiler.ad} ${malKabulRecord.ureticiler.soyad}` : 
            'Bilinmeyen Üretici'
        case 'OZEL_FIRMA':
          return malKabulRecord.ozel_firmalar?.firmaAdi || 'Bilinmeyen Firma'
        case 'MUSTAHSIL':
          return malKabulRecord.mustahsil ? 
            `${malKabulRecord.mustahsil.ad} ${malKabulRecord.mustahsil.soyad}` : 
            'Bilinmeyen Müstahsil'
        default:
          return 'Bilinmeyen Satıcı'
      }
    }

    const receiptContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <title>Mal Kabul Fişi - ${malKabulRecord.fisNo}</title>
        <style>
          @media print {
            body { margin: 0; padding: 20px; }
            .no-print { display: none; }
          }
          body {
            font-family: 'Courier New', monospace;
            font-size: 14px;
            line-height: 1.4;
            color: #000;
            max-width: 400px;
            margin: 0 auto;
            padding: 20px;
          }
          .logo {
            text-align: center;
            margin-bottom: 20px;
          }
          .logo img {
            max-width: 200px;
            height: auto;
          }
          .header {
            text-align: center;
            border-bottom: 2px solid #000;
            padding-bottom: 10px;
            margin-bottom: 15px;
          }
          .title {
            font-size: 18px;
            font-weight: bold;
            margin-bottom: 5px;
          }
          .section {
            margin-bottom: 15px;
            border-bottom: 1px solid #333;
            padding-bottom: 10px;
          }
          .section-title {
            font-weight: bold;
            font-size: 16px;
            margin-bottom: 8px;
          }
          .row {
            display: flex;
            justify-content: space-between;
            margin-bottom: 3px;
          }
          .label {
            font-weight: bold;
            width: 60%;
          }
          .value {
            width: 40%;
            text-align: right;
          }
          .total {
            font-weight: bold;
            font-size: 16px;
            border-top: 2px solid #000;
            padding-top: 8px;
            margin-top: 8px;
          }
          .footer {
            text-align: center;
            margin-top: 20px;
            border-top: 2px solid #000;
            padding-top: 15px;
          }
          .thank-you {
            font-weight: bold;
            font-size: 14px;
          }
        </style>
      </head>
      <body>
        <div class="logo">
          <img src="${logoPath}" alt="WEBRAIN Logo" />
        </div>
        
        <div class="header">
          <div class="title">MAL KABUL FİŞİ</div>
          <div>Fiş No: ${malKabulRecord.fisNo}</div>
          <div>Tarih: ${new Date(malKabulRecord.tarih).toLocaleDateString('tr-TR')}</div>
        </div>

        <div class="section">
          <div class="section-title">Genel Bilgiler</div>
          <div class="row">
            <span class="label">Mal Kabulcu:</span>
            <span class="value">${malKabulRecord.users.firstName} ${malKabulRecord.users.lastName}</span>
          </div>
          <div class="row">
            <span class="label">Satıcı Tipi:</span>
            <span class="value">${malKabulRecord.saticiTipi}</span>
          </div>
          <div class="row">
            <span class="label">Satıcı Adı:</span>
            <span class="value">${getSaticiAdi()}</span>
          </div>
          <div class="row">
            <span class="label">Ürün:</span>
            <span class="value">${malKabulRecord.urunler.ad}</span>
          </div>
          <div class="row">
            <span class="label">Kategori:</span>
            <span class="value">${malKabulRecord.urunler.kategori}</span>
          </div>
        </div>

        ${malKabulRecord.urunler.birim?.toLowerCase() === 'kg' ? `
        <div class="section">
          <div class="section-title">Ağırlık Bilgileri (KG)</div>
          <div class="row">
            <span class="label">Brüt KG:</span>
            <span class="value">${malKabulRecord.brutKg || 0}</span>
          </div>
          <div class="row">
            <span class="label">Dara KG:</span>
            <span class="value">${malKabulRecord.daraKg || 0}</span>
          </div>
          <div class="row">
            <span class="label">Giriş KG:</span>
            <span class="value">${malKabulRecord.girisKg || 0}</span>
          </div>
          <div class="row">
            <span class="label">Çıkma KG:</span>
            <span class="value">${malKabulRecord.cikmaKg || 0}</span>
          </div>
          <div class="row">
            <span class="label">Fire KG:</span>
            <span class="value">${malKabulRecord.fireKg || 0}</span>
          </div>
          <div class="row total">
            <span class="label">Net KG:</span>
            <span class="value">${malKabulRecord.netKg || 0}</span>
          </div>
        </div>
        ` : `
        <div class="section">
          <div class="section-title">Adet Bilgileri</div>
          <div class="row">
            <span class="label">Kasa Sayısı:</span>
            <span class="value">${malKabulRecord.kasaSayisi || 0}</span>
          </div>
          <div class="row">
            <span class="label">Giriş Adet:</span>
            <span class="value">${malKabulRecord.adetSayisi || 0}</span>
          </div>
          <div class="row">
            <span class="label">Çıkma Adet:</span>
            <span class="value">0</span>
          </div>
          <div class="row">
            <span class="label">Fire Adet:</span>
            <span class="value">0</span>
          </div>
          <div class="row total">
            <span class="label">Net Adet:</span>
            <span class="value">${malKabulRecord.netAdet || 0}</span>
          </div>
        </div>
        `}

        <div class="section">
          <div class="section-title">Fiyat Bilgileri</div>
          <div class="row">
            <span class="label">Birim Fiyat:</span>
            <span class="value">${malKabulRecord.birimFiyat ? malKabulRecord.birimFiyat.toLocaleString('tr-TR', { style: 'currency', currency: 'TRY' }) : '-'}</span>
          </div>
          <div class="row">
            <span class="label">KDV Hariç:</span>
            <span class="value">${selectedRecord.kdvHaricTutar.toLocaleString('tr-TR', { style: 'currency', currency: 'TRY' })}</span>
          </div>
          <div class="row total">
            <span class="label">Toplam Tutar:</span>
            <span class="value">${selectedRecord.herseyDahilTutar.toLocaleString('tr-TR', { style: 'currency', currency: 'TRY' })}</span>
          </div>
        </div>

        <div class="section">
          <div class="section-title">Durum Bilgileri</div>
          <div class="row">
            <span class="label">Durum:</span>
            <span class="value">${malKabulRecord.status}</span>
          </div>
          <div class="row">
            <span class="label">Onay Durumu:</span>
            <span class="value">${malKabulRecord.onayDurumu || 'BEKLEMEDE'}</span>
          </div>
        </div>

        ${malKabulRecord.notlar ? `
        <div class="section">
          <div class="section-title">Notlar</div>
          <div>${malKabulRecord.notlar}</div>
        </div>
        ` : ''}

        <div class="footer">
          <div class="thank-you">Bizi tercih ettiğiniz için teşekkür ederiz!</div>
        </div>
      </body>
      </html>
    `

    const printWindow = window.open('', '_blank')
    if (printWindow) {
      printWindow.document.write(receiptContent)
      printWindow.document.close()
      printWindow.focus()
      printWindow.print()
    }
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
              <label className="text-sm font-medium">Cari Seçimi</label>
              <Select value={selectedSatici} onValueChange={setSelectedSatici}>
                <SelectTrigger>
                  <SelectValue placeholder="Cari hesap seçin" />
                </SelectTrigger>
                <SelectContent>
                  {saticilar.map((satici) => (
                    <SelectItem key={satici.id} value={satici.id}>
                      {satici.name} ({satici.type})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Arama</label>
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Fiş no, fatura no ara..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                  disabled={!selectedSatici}
                />
              </div>
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
                    <th className="text-left p-3 font-medium">Fatura No</th>
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
                      <Button
                        variant="link"
                        className="p-0 h-auto font-mono text-sm text-blue-600 hover:text-blue-800"
                        onClick={() => openReceiptModal(record)}
                        title="Mal kabul fişini görüntüle"
                      >
                        {record.fisNo}
                        <ExternalLink className="h-3 w-3 ml-1" />
                      </Button>
                    </td>
                    <td className="p-3">
                      {record.faturaSeriNo ? (
                        <Button
                          variant="link"
                          className="p-0 h-auto text-sm text-blue-600 hover:text-blue-800"
                          onClick={() => openDetailModal(record)}
                          title="Fatura detaylarını görüntüle"
                        >
                          {record.faturaSeriNo}
                          <ExternalLink className="h-3 w-3 ml-1" />
                        </Button>
                      ) : (
                        <span className="text-sm text-muted-foreground">-</span>
                      )}
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

          {!selectedSatici && (
            <div className="text-center py-8">
              <CreditCard className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">Cari hesap seçin</h3>
              <p className="text-muted-foreground">
                Lütfen yukarıdan görüntülemek istediğiniz cari hesabı seçin.
              </p>
            </div>
          )}

          {selectedSatici && sortedRecords.length === 0 && !loading && (
            <div className="text-center py-8">
              <CreditCard className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">Kayıt bulunamadı</h3>
              <p className="text-muted-foreground">
                Bu cari hesap için kayıt bulunmuyor.
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

      {/* Mal Kabul Fişi Modal */}
      <Dialog open={isReceiptModalOpen} onOpenChange={setIsReceiptModalOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Mal Kabul Fişi - {selectedRecord?.fisNo}
            </DialogTitle>
            <DialogDescription>
              {selectedRecord?.malKabulRecord.urunler.ad} için mal kabul fiş detayları
            </DialogDescription>
          </DialogHeader>

          {selectedRecord && (
            <div className="space-y-6">
              {/* Genel Bilgiler */}
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Genel Bilgiler</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Fiş No:</span>
                        <span className="font-mono">{selectedRecord.malKabulRecord.fisNo}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Tarih:</span>
                        <span>{new Date(selectedRecord.malKabulRecord.tarih).toLocaleDateString('tr-TR')}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Mal Kabulcu:</span>
                        <span>{selectedRecord.malKabulRecord.users.firstName} {selectedRecord.malKabulRecord.users.lastName}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Satıcı:</span>
                        <span>{selectedRecord.saticiAdi}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Satıcı Tipi:</span>
                        <Badge variant="outline">{selectedRecord.saticiTipi}</Badge>
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
                        <span>{selectedRecord.malKabulRecord.urunler.kategori}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Birim:</span>
                        <span>{selectedRecord.malKabulRecord.urunler.birim}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Durum:</span>
                        <Badge variant={selectedRecord.malKabulRecord.status === 'NETLENDI' ? 'default' : 'secondary'}>
                          {selectedRecord.malKabulRecord.status}
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="space-y-4">
                  {/* Ağırlık/Adet Bilgileri */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">
                        {selectedRecord.malKabulRecord.urunler.birim?.toLowerCase() === 'kg' 
                          ? 'Ağırlık Bilgileri (KG)' 
                          : 'Adet Bilgileri'
                        }
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {selectedRecord.malKabulRecord.urunler.birim?.toLowerCase() === 'kg' ? (
                        <>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Brüt KG:</span>
                            <span>{selectedRecord.malKabulRecord.brutKg || 0}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Dara KG:</span>
                            <span>{selectedRecord.malKabulRecord.daraKg || 0}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Giriş KG:</span>
                            <span>{selectedRecord.malKabulRecord.girisKg || 0}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Çıkma KG:</span>
                            <span>{selectedRecord.malKabulRecord.cikmaKg || 0}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Fire KG:</span>
                            <span>{selectedRecord.malKabulRecord.fireKg || 0}</span>
                          </div>
                          <div className="flex justify-between border-t pt-2">
                            <span className="font-medium">Net KG:</span>
                            <span className="font-bold text-lg">{selectedRecord.malKabulRecord.netKg || 0}</span>
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Kasa Sayısı:</span>
                            <span>{selectedRecord.malKabulRecord.kasaSayisi || 0}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Giriş Adet:</span>
                            <span>{selectedRecord.malKabulRecord.adetSayisi || 0}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Çıkma Adet:</span>
                            <span>0</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Fire Adet:</span>
                            <span>0</span>
                          </div>
                          <div className="flex justify-between border-t pt-2">
                            <span className="font-medium">Net Adet:</span>
                            <span className="font-bold text-lg">{selectedRecord.malKabulRecord.netAdet || 0}</span>
                          </div>
                        </>
                      )}
                    </CardContent>
                  </Card>

                  {/* Fiyat Bilgileri */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Fiyat Bilgileri</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Birim Fiyat:</span>
                        <span className="font-medium">
                          {selectedRecord.birimFiyat ? 
                            selectedRecord.birimFiyat.toLocaleString('tr-TR', { style: 'currency', currency: 'TRY' }) : 
                            '-'
                          }
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Net Miktar:</span>
                        <span>
                          {selectedRecord.toplamAlisMiktari} {selectedRecord.malKabulRecord.urunler.birim}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">KDV Hariç:</span>
                        <span>
                          {selectedRecord.kdvHaricTutar.toLocaleString('tr-TR', { style: 'currency', currency: 'TRY' })}
                        </span>
                      </div>
                      <div className="flex justify-between border-t pt-2">
                        <span className="font-medium">Toplam Tutar:</span>
                        <span className="font-bold text-lg text-green-600">
                          {selectedRecord.herseyDahilTutar.toLocaleString('tr-TR', { style: 'currency', currency: 'TRY' })}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Fatura Bilgileri */}
              {selectedRecord.malKabulRecord.faturaYontemi === 'MANUEL' && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Fatura Bilgileri</CardTitle>
                  </CardHeader>
                  <CardContent className="grid grid-cols-2 gap-4">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Fatura Yöntemi:</span>
                      <Badge variant="default">Manuel</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Onay Durumu:</span>
                      <Badge variant={
                        selectedRecord.malKabulRecord.onayDurumu === 'ONAYLANDI' ? 'default' :
                        selectedRecord.malKabulRecord.onayDurumu === 'REDDEDILDI' ? 'destructive' : 'secondary'
                      }>
                        {selectedRecord.malKabulRecord.onayDurumu || 'BEKLEMEDE'}
                      </Badge>
                    </div>
                    {selectedRecord.malKabulRecord.faturaSeriNo && (
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Fatura Seri No:</span>
                        <span>{selectedRecord.malKabulRecord.faturaSeriNo}</span>
                      </div>
                    )}
                    {selectedRecord.malKabulRecord.faturaTarihi && (
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Fatura Tarihi:</span>
                        <span>{new Date(selectedRecord.malKabulRecord.faturaTarihi).toLocaleDateString('tr-TR')}</span>
                      </div>
                    )}
                    {selectedRecord.malKabulRecord.faturaAciklamasi && (
                      <div className="col-span-2">
                        <span className="text-muted-foreground">Açıklama:</span>
                        <div className="bg-muted p-2 rounded mt-1">
                          {selectedRecord.malKabulRecord.faturaAciklamasi}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}

              {/* Notlar */}
              {selectedRecord.malKabulRecord.notlar && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Notlar</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-muted p-3 rounded">
                      {selectedRecord.malKabulRecord.notlar}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          )}

          <div className="flex justify-end gap-2 pt-4 border-t">
            <Button variant="outline" onClick={closeReceiptModal}>
              Kapat
            </Button>
            <Button onClick={printReceipt} className="bg-blue-600 hover:bg-blue-700">
              <FileText className="h-4 w-4 mr-2" />
              Fiş Yazdır
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
