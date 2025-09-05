'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { 
  Package, 
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
  FileText as PdfIcon
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface MalKabulRecord {
  id: string
  fisNo: string
  tarih: string
  status: 'BEKLEMEDE' | 'NETLENDI' | 'IADE'
  urunler: {
    id: string
    ad: string
    kategori: string
    birim: string
  }
  komisyoncular?: {
    id: string
    dukkanAdi: string
    komisyonNo: string
    sehir: string
  }
  ureticiler?: {
    id: string
    ad: string
    soyad: string
    sehir: string
  }
  ozel_firmalar?: {
    id: string
    firmaAdi: string
    sehir: string
  }
  mustahsil?: {
    id: string
    ad: string
    soyad: string
  }
  users: {
    id: string
    firstName: string
    lastName: string
  }
  miktar: number
  birimFiyat?: number
  toplamFiyat?: number
  brutKg?: number
  daraKg?: number
  girisKg?: number
  cikmaKg?: number
  fireKg?: number
  netKg?: number
  adetSayisi?: number
  netAdet?: number
  saticiTipi: string
  notlar?: string
}

export default function FaturaBekleyenUrunler() {
  const [records, setRecords] = useState<MalKabulRecord[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [saticiTipiFilter, setSaticiTipiFilter] = useState<string>('ALL')
  const [sortBy, setSortBy] = useState<'komisyonNo' | 'tarih' | 'fisNo'>('komisyonNo')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc')
  const [exportLoading, setExportLoading] = useState(false)

  useEffect(() => {
    fetchRecords()
  }, [])

  const fetchRecords = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/mal-kabul?limit=1000')
      const data = await response.json()
      
      if (response.ok) {
        // Sadece NETLENDI durumundaki kayıtları filtrele
        const netlenenRecords = (data.records || []).filter((record: MalKabulRecord) => 
          record.status === 'NETLENDI'
        )
        setRecords(netlenenRecords)
      } else {
        console.error('Mal kabul kayıtları alınamadı:', data.error)
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
        return record.komisyoncular ? `${record.komisyoncular.dukkanAdi} - ${record.ureticiler?.ad} ${record.ureticiler?.soyad}` : 'Bilinmeyen Komisyoncu'
      case 'OZEL_FIRMA':
        return record.ozel_firmalar?.firmaAdi || 'Bilinmeyen Firma'
      case 'MUSTAHSIL':
        return record.mustahsil ? `${record.mustahsil.ad} ${record.mustahsil.soyad}` : 'Bilinmeyen Müstahsil'
      default:
        return 'Bilinmeyen'
    }
  }

  const filteredRecords = records.filter(record => {
    const matchesSearch = 
      record.fisNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.urunler.ad.toLowerCase().includes(searchTerm.toLowerCase()) ||
      getSaticiAdi(record).toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.users.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.users.lastName.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesSaticiTipi = saticiTipiFilter === 'ALL' || record.saticiTipi === saticiTipiFilter

    return matchesSearch && matchesSaticiTipi
  })

  // Sıralama fonksiyonu
  const sortedRecords = [...filteredRecords].sort((a, b) => {
    let aValue: string | number = ''
    let bValue: string | number = ''
    
    switch (sortBy) {
      case 'komisyonNo':
        // Sadece komisyoncular için komisyon no'ya göre sırala
        if (a.saticiTipi === 'KOMISYONCU' && b.saticiTipi === 'KOMISYONCU') {
          aValue = a.komisyoncular?.komisyonNo || ''
          bValue = b.komisyoncular?.komisyonNo || ''
          const aNum = parseInt(aValue.toString()) || 0
          const bNum = parseInt(bValue.toString()) || 0
          return sortOrder === 'asc' ? aNum - bNum : bNum - aNum
        } else if (a.saticiTipi === 'KOMISYONCU') {
          return sortOrder === 'asc' ? -1 : 1 // Komisyoncular önce
        } else if (b.saticiTipi === 'KOMISYONCU') {
          return sortOrder === 'asc' ? 1 : -1 // Komisyoncular önce
        } else {
          return 0 // İkisi de komisyoncu değilse sıralama yapma
        }
      case 'tarih':
        aValue = new Date(a.tarih).getTime()
        bValue = new Date(b.tarih).getTime()
        return sortOrder === 'asc' ? aValue - bValue : bValue - aValue
      case 'fisNo':
        aValue = a.fisNo
        bValue = b.fisNo
        return sortOrder === 'asc' ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue)
      default:
        return 0
    }
  })

  const totalRecords = filteredRecords.length
  const totalValue = filteredRecords.reduce((sum, record) => sum + (record.toplamFiyat || 0), 0)
  const totalWeight = filteredRecords.reduce((sum, record) => sum + (record.netKg || 0), 0)
  const totalQuantity = filteredRecords.reduce((sum, record) => sum + (record.netAdet || 0), 0)

  // Export fonksiyonları
  const exportToExcel = async () => {
    setExportLoading(true)
    try {
      const data = sortedRecords.map(record => ({
        'Fiş No': record.fisNo,
        'Tarih': new Date(record.tarih).toLocaleDateString('tr-TR'),
        'Ürün': record.urunler.ad,
        'Kategori': record.urunler.kategori,
        'Birim': record.urunler.birim,
        'Satıcı': getSaticiAdi(record),
        'Komisyon No': record.saticiTipi === 'KOMISYONCU' 
          ? record.komisyoncular?.komisyonNo || '-'
          : '-',
        'Mal Kabulcu': `${record.users.firstName} ${record.users.lastName}`,
        'Giriş KG': record.girisKg || 0,
        'Dara KG': record.daraKg || 0,
        'Çıkma KG': record.cikmaKg || 0,
        'Fire KG': record.fireKg || 0,
        'Net KG': record.netKg || 0,
        'Giriş Adet': record.adetSayisi || 0,
        'Çıkma Adet': record.cikmaAdet || 0,
        'Fire Adet': record.fireAdet || 0,
        'Net Adet': record.netAdet || 0,
        'Birim Fiyat': record.birimFiyat || 0,
        'Toplam': record.toplamFiyat || 0,
        'Durum': record.status,
        'Notlar': record.notlar || ''
      }))

      // CSV formatında indirme
      const csvContent = [
        Object.keys(data[0]).join(','),
        ...data.map(row => Object.values(row).map(val => `"${val}"`).join(','))
      ].join('\n')

      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
      const link = document.createElement('a')
      const url = URL.createObjectURL(blob)
      link.setAttribute('href', url)
      link.setAttribute('download', `fatura-bekleyen-urunler-${new Date().toISOString().split('T')[0]}.csv`)
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

  const exportToPDF = async () => {
    setExportLoading(true)
    try {
      // PDF için HTML template oluştur
      const htmlContent = `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <title>Fatura Bekleyen Ürünler</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 20px; }
            .header { text-align: center; margin-bottom: 30px; }
            .header h1 { color: #2563eb; margin-bottom: 10px; }
            .summary { display: flex; justify-content: space-around; margin-bottom: 30px; }
            .summary-item { text-align: center; padding: 15px; border: 1px solid #ddd; border-radius: 8px; }
            .summary-item h3 { margin: 0; color: #2563eb; }
            .summary-item p { margin: 5px 0; color: #666; }
            table { width: 100%; border-collapse: collapse; margin-top: 20px; }
            th, td { border: 1px solid #ddd; padding: 8px; text-align: left; font-size: 12px; }
            th { background-color: #f5f5f5; font-weight: bold; }
            .net-values { background-color: #e8f5e8; font-weight: bold; }
            .footer { margin-top: 30px; text-align: center; color: #666; }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>Fatura Bekleyen Ürünler Raporu</h1>
            <p>Tarih: ${new Date().toLocaleDateString('tr-TR')}</p>
          </div>
          
          <div class="summary">
            <div class="summary-item">
              <h3>${totalRecords}</h3>
              <p>Toplam Kayıt</p>
            </div>
            <div class="summary-item">
              <h3>₺${totalValue.toLocaleString('tr-TR')}</h3>
              <p>Toplam Değer</p>
            </div>
            <div class="summary-item">
              <h3>${totalWeight.toFixed(2)} kg</h3>
              <p>Toplam Ağırlık</p>
            </div>
            <div class="summary-item">
              <h3>${totalQuantity}</h3>
              <p>Toplam Adet</p>
            </div>
          </div>

          <table>
            <thead>
              <tr>
                <th>Fiş No</th>
                <th>Tarih</th>
                <th>Ürün</th>
                <th>Satıcı</th>
                <th>Komisyon No</th>
                <th>Mal Kabulcu</th>
                <th>Giriş KG</th>
                <th>Dara KG</th>
                <th>Çıkma KG</th>
                <th>Fire KG</th>
                <th class="net-values">Net KG</th>
                <th>Giriş Adet</th>
                <th>Çıkma Adet</th>
                <th>Fire Adet</th>
                <th class="net-values">Net Adet</th>
                <th>Birim Fiyat</th>
                <th>Toplam</th>
              </tr>
            </thead>
            <tbody>
              ${sortedRecords.map(record => `
                <tr>
                  <td>${record.fisNo}</td>
                  <td>${new Date(record.tarih).toLocaleDateString('tr-TR')}</td>
                  <td>${record.urunler.ad}</td>
                  <td>${getSaticiAdi(record)}</td>
                  <td>${record.saticiTipi === 'KOMISYONCU' 
                    ? record.komisyoncular?.komisyonNo || '-'
                    : '-'
                  }</td>
                  <td>${record.users.firstName} ${record.users.lastName}</td>
                  <td>${record.girisKg || 0}</td>
                  <td>${record.daraKg || 0}</td>
                  <td>${record.cikmaKg || 0}</td>
                  <td>${record.fireKg || 0}</td>
                  <td class="net-values">${record.netKg || 0}</td>
                  <td>${record.adetSayisi || 0}</td>
                  <td>${record.cikmaAdet || 0}</td>
                  <td>${record.fireAdet || 0}</td>
                  <td class="net-values">${record.netAdet || 0}</td>
                  <td>₺${record.birimFiyat || 0}</td>
                  <td>₺${record.toplamFiyat || 0}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
          
          <div class="footer">
            <p>Bu rapor ${new Date().toLocaleString('tr-TR')} tarihinde oluşturulmuştur.</p>
          </div>
        </body>
        </html>
      `

      const printWindow = window.open('', '_blank')
      if (printWindow) {
        printWindow.document.write(htmlContent)
        printWindow.document.close()
        printWindow.focus()
        printWindow.print()
        printWindow.close()
      }
    } catch (error) {
      console.error('PDF export hatası:', error)
    } finally {
      setExportLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <Package className="h-8 w-8 animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Fatura bekleyen ürünler yükleniyor...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="mt-10 ml-10 mr-10 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Fatura Bekleyen Ürünler</h1>
          <p className="text-muted-foreground">
            Netlenen durumdaki ürünler - Faturalandırılmayı bekleyen kayıtlar
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
          <Button 
            variant="outline" 
            size="sm" 
            onClick={exportToPDF}
            disabled={exportLoading || sortedRecords.length === 0}
          >
            <PdfIcon className="h-4 w-4 mr-2" />
            {exportLoading ? 'Hazırlanıyor...' : 'PDF Yazdır'}
          </Button>
          <Button size="sm">
            <FileText className="h-4 w-4 mr-2" />
            Fatura Oluştur
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Fatura Bekleyen</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalRecords}</div>
            <p className="text-xs text-muted-foreground">
              Netlenen kayıtlar
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Toplam Değer</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {totalValue.toLocaleString('tr-TR', { style: 'currency', currency: 'TRY' })}
            </div>
            <p className="text-xs text-muted-foreground">
              Faturalandırılacak tutar
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Toplam Ağırlık</CardTitle>
            <Scale className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalWeight.toFixed(2)} kg</div>
            <p className="text-xs text-muted-foreground">
              Net ağırlık toplamı
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Toplam Adet</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalQuantity}</div>
            <p className="text-xs text-muted-foreground">
              Net adet toplamı
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
                  placeholder="Fiş no, ürün, satıcı ara..."
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
                  <SelectItem value="KOMISYONCU">Sadece Komisyoncular</SelectItem>
                  <SelectItem value="OZEL_FIRMA">Özel Firma</SelectItem>
                  <SelectItem value="MUSTAHSIL">Müstahsil</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Sıralama</label>
              <Select value={sortBy} onValueChange={(value: 'komisyonNo' | 'tarih' | 'fisNo') => setSortBy(value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Sıralama kriteri" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="komisyonNo">Komisyon No</SelectItem>
                  <SelectItem value="tarih">Tarih</SelectItem>
                  <SelectItem value="fisNo">Fiş No</SelectItem>
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
            <CheckCircle className="h-5 w-5 text-green-600" />
            Fatura Bekleyen Ürünler
          </CardTitle>
          <CardDescription>
            {sortedRecords.length} netlenen kayıt gösteriliyor
            {sortBy === 'komisyonNo' && (
              <span className="ml-2 text-blue-600">
                • Komisyon No'ya göre {sortOrder === 'asc' ? 'küçükten büyüğe' : 'büyükten küçüğe'} sıralandı
              </span>
            )}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-3 font-medium">Fiş No</th>
                  <th className="text-left p-3 font-medium">Tarih</th>
                  <th className="text-left p-3 font-medium">Ürün</th>
                  <th className="text-left p-3 font-medium">Satıcı</th>
                  <th className="text-left p-3 font-medium">Komisyon No</th>
                  <th className="text-left p-3 font-medium">Mal Kabulcu</th>
                  <th className="text-left p-3 font-medium">Ağırlık Bilgileri</th>
                  <th className="text-left p-3 font-medium">Adet Bilgileri</th>
                  <th className="text-left p-3 font-medium">Birim Fiyat</th>
                  <th className="text-left p-3 font-medium">Toplam</th>
                  <th className="text-left p-3 font-medium">İşlemler</th>
                </tr>
              </thead>
              <tbody>
                {sortedRecords.map((record) => (
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
                      <div>
                        <div className="font-medium">{getSaticiAdi(record)}</div>
                        <div className="text-sm text-muted-foreground">
                          {record.saticiTipi}
                        </div>
                      </div>
                    </td>
                    <td className="p-3">
                      <div className="font-mono text-sm">
                        {record.saticiTipi === 'KOMISYONCU' 
                          ? record.komisyoncular?.komisyonNo || '-'
                          : '-'
                        }
                      </div>
                    </td>
                    <td className="p-3">
                      <div className="text-sm">
                        {record.users.firstName} {record.users.lastName}
                      </div>
                    </td>
                    <td className="p-3">
                      <div className="text-sm space-y-1">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Giriş:</span>
                          <span className="font-medium">{record.girisKg || 0} kg</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Dara:</span>
                          <span className="font-medium">{record.daraKg || 0} kg</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Çıkma:</span>
                          <span className="font-medium">{record.cikmaKg || 0} kg</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Fire:</span>
                          <span className="font-medium">{record.fireKg || 0} kg</span>
                        </div>
                        <div className="flex justify-between border-t pt-1">
                          <span className="font-medium">Net:</span>
                          <span className="font-bold text-green-600">{record.netKg || 0} kg</span>
                        </div>
                      </div>
                    </td>
                    <td className="p-3">
                      <div className="text-sm space-y-1">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Giriş:</span>
                          <span className="font-medium">{record.adetSayisi || 0} adet</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Çıkma:</span>
                          <span className="font-medium">{record.cikmaKg || 0} adet</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Fire:</span>
                          <span className="font-medium">{record.fireKg || 0} adet</span>
                        </div>
                        <div className="flex justify-between border-t pt-1">
                          <span className="font-medium">Net:</span>
                          <span className="font-bold text-green-600">{record.netAdet || 0} adet</span>
                        </div>
                      </div>
                    </td>
                    <td className="p-3">
                      <div className="text-sm">
                        {record.birimFiyat ? (
                          record.birimFiyat.toLocaleString('tr-TR', { 
                            style: 'currency', 
                            currency: 'TRY' 
                          })
                        ) : (
                          <span className="text-muted-foreground">-</span>
                        )}
                      </div>
                    </td>
                    <td className="p-3">
                      <div className="text-sm font-medium">
                        {record.toplamFiyat ? (
                          record.toplamFiyat.toLocaleString('tr-TR', { 
                            style: 'currency', 
                            currency: 'TRY' 
                          })
                        ) : (
                          <span className="text-muted-foreground">-</span>
                        )}
                      </div>
                    </td>
                    <td className="p-3">
                      <div className="flex gap-1">
                        <Button variant="outline" size="sm">
                          <Eye className="h-3 w-3" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <FileText className="h-3 w-3" />
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
              <CheckCircle className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">Fatura bekleyen ürün bulunamadı</h3>
              <p className="text-muted-foreground">
                Şu anda netlenen durumda fatura bekleyen ürün bulunmuyor.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
