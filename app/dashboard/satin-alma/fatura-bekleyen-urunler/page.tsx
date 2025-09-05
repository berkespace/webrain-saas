'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
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
  CheckCircle
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

  const totalRecords = filteredRecords.length
  const totalValue = filteredRecords.reduce((sum, record) => sum + (record.toplamFiyat || 0), 0)
  const totalWeight = filteredRecords.reduce((sum, record) => sum + (record.netKg || 0), 0)
  const totalQuantity = filteredRecords.reduce((sum, record) => sum + (record.netAdet || 0), 0)

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
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Fatura Bekleyen Ürünler</h1>
          <p className="text-muted-foreground">
            Netlenen durumdaki ürünler - Faturalandırılmayı bekleyen kayıtlar
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Excel İndir
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
          <div className="grid gap-4 md:grid-cols-2">
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
              <select
                value={saticiTipiFilter}
                onChange={(e) => setSaticiTipiFilter(e.target.value)}
                className="w-full p-2 border border-input bg-background rounded-md"
              >
                <option value="ALL">Tümü</option>
                <option value="KOMISYONCU">Komisyoncu</option>
                <option value="OZEL_FIRMA">Özel Firma</option>
                <option value="MUSTAHSIL">Müstahsil</option>
              </select>
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
            {filteredRecords.length} netlenen kayıt gösteriliyor
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto pl-4 pt-4">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-3 font-medium">Fiş No</th>
                  <th className="text-left p-3 font-medium">Tarih</th>
                  <th className="text-left p-3 font-medium">Ürün</th>
                  <th className="text-left p-3 font-medium">Satıcı</th>
                  <th className="text-left p-3 font-medium">Mal Kabulcu</th>
                  <th className="text-left p-3 font-medium">Ağırlık Bilgileri</th>
                  <th className="text-left p-3 font-medium">Adet Bilgileri</th>
                  <th className="text-left p-3 font-medium">Birim Fiyat</th>
                  <th className="text-left p-3 font-medium">Toplam</th>
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
                      <div>
                        <div className="font-medium">{getSaticiAdi(record)}</div>
                        <div className="text-sm text-muted-foreground">
                          {record.saticiTipi}
                        </div>
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

          {filteredRecords.length === 0 && (
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
