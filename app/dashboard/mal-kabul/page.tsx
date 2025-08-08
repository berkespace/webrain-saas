'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { 
  Plus, 
  FileText, 
  Clock, 
  CheckCircle, 
  AlertTriangle, 
  TrendingUp, 
  Users, 
  Package,
  Search,
  Filter,
  Download,
  Eye,
  Edit,
  Trash2,
  Loader2
} from 'lucide-react'
import { DashboardLayout } from '@/components/layout/dashboard-layout'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { useToast } from '@/components/ui/use-toast'
import Link from 'next/link'

interface MalKabulRecord {
  id: string
  fisNo: string
  tarih: string
  saticiTipi: 'OZEL_FIRMA' | 'KOMISYONCU' | 'MUSTAHSIL'
  komisyoncu?: {
    id: string
    dukkanAdi: string
    sehir: string
  }
  uretici?: {
    id: string
    ad: string
    soyad: string
    sehir: string
  }
  ozelFirma?: {
    id: string
    firmaAdi: string
    sehir: string
  }
  mustahsil?: {
    id: string
    ad: string
    soyad: string
  }
  urun: {
    id: string
    ad: string
    kategori: string
  }
  ambalaj?: {
    id: string
    ad: string
    tipi: string
    daraKg: number
  }
  paletSayisi: number
  kasaSayisi: number
  brutKg: number
  daraKg: number
  girisKg: number
  cikmaFireKg: number
  netKg: number
  birimFiyat?: number
  toplamFiyat?: number
  status: 'FATURA_BEKLIYOR' | 'FATURALANDI' | 'TAMAMLANDI' | 'IPTAL'
  notlar?: string
  malKabulcu: {
    id: string
    firstName: string
    lastName: string
  }
  createdAt: string
  updatedAt: string
}

export default function MalKabulDashboard() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const { toast } = useToast()
  const [malKabulRecords, setMalKabulRecords] = useState<MalKabulRecord[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [filterSaticiTipi, setFilterSaticiTipi] = useState('all')
  const [selectedRecord, setSelectedRecord] = useState<MalKabulRecord | null>(null)
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login')
    } else if (status === 'authenticated') {
      fetchMalKabulRecords()
    }
  }, [status, router])

  const fetchMalKabulRecords = async () => {
    try {
      setLoading(true)
      const params = new URLSearchParams()
      if (searchTerm) params.append('search', searchTerm)
      if (filterStatus !== 'all') params.append('status', filterStatus)
      if (filterSaticiTipi !== 'all') params.append('saticiTipi', filterSaticiTipi)

      const response = await fetch(`/api/mal-kabul?${params.toString()}`)
      if (response.ok) {
        const data = await response.json()
        setMalKabulRecords(data)
      } else {
        console.error('Mal kabul listesi alınamadı')
      }
    } catch (error) {
      console.error('Mal kabul listesi hatası:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (status === 'authenticated') {
      fetchMalKabulRecords()
    }
  }, [searchTerm, filterStatus, filterSaticiTipi])

  const handleDelete = async (recordId: string) => {
    if (confirm('Bu mal kabul kaydını silmek istediğinizden emin misiniz?')) {
      try {
        const response = await fetch(`/api/mal-kabul/${recordId}`, {
          method: 'DELETE',
        })

        if (response.ok) {
          toast({
            title: "Başarılı",
            description: "Mal kabul kaydı başarıyla silindi",
            variant: "success",
          })
          fetchMalKabulRecords()
        } else {
          const error = await response.json()
          toast({
            title: "Hata",
            description: error.error || 'Silme işlemi başarısız',
            variant: "destructive",
          })
        }
      } catch (error) {
        console.error('Mal kabul silme hatası:', error)
        toast({
          title: "Hata",
          description: "Silme işlemi sırasında hata oluştu",
          variant: "destructive",
        })
      }
    }
  }

  const handleView = (record: MalKabulRecord) => {
    setSelectedRecord(record)
    setIsViewDialogOpen(true)
  }

  const getSaticiAdi = (record: MalKabulRecord) => {
    switch (record.saticiTipi) {
      case 'OZEL_FIRMA':
        return record.ozelFirma?.firmaAdi || 'Bilinmiyor'
      case 'KOMISYONCU':
        return record.komisyoncu?.dukkanAdi || 'Bilinmiyor'
      case 'MUSTAHSIL':
        return record.mustahsil ? `${record.mustahsil.ad} ${record.mustahsil.soyad}` : 'Bilinmiyor'
      default:
        return 'Bilinmiyor'
    }
  }

  const getSaticiTipiLabel = (tipi: string) => {
    switch (tipi) {
      case 'OZEL_FIRMA':
        return 'Özel Firma'
      case 'KOMISYONCU':
        return 'Komisyoncu'
      case 'MUSTAHSIL':
        return 'Müstahsil'
      default:
        return tipi
    }
  }

  const getSaticiTipiColor = (tipi: string) => {
    switch (tipi) {
      case 'OZEL_FIRMA':
        return 'bg-blue-100 text-blue-800'
      case 'KOMISYONCU':
        return 'bg-green-100 text-green-800'
      case 'MUSTAHSIL':
        return 'bg-orange-100 text-orange-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'FATURA_BEKLIYOR':
        return 'bg-orange-100 text-orange-800'
      case 'FATURALANDI':
        return 'bg-blue-100 text-blue-800'
      case 'TAMAMLANDI':
        return 'bg-green-100 text-green-800'
      case 'IPTAL':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'FATURA_BEKLIYOR':
        return 'Fatura Bekliyor'
      case 'FATURALANDI':
        return 'Faturalandı'
      case 'TAMAMLANDI':
        return 'Tamamlandı'
      case 'IPTAL':
        return 'İptal'
      default:
        return status
    }
  }

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Yükleniyor...</p>
        </div>
      </div>
    )
  }

  if (!session) {
    return null
  }

  const filteredData = malKabulRecords.filter(item => {
    const matchesSearch = 
      getSaticiAdi(item).toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.urun.ad.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.fisNo.toLowerCase().includes(searchTerm)

    const matchesStatus = filterStatus === 'all' || item.status === filterStatus
    const matchesSaticiTipi = filterSaticiTipi === 'all' || item.saticiTipi === filterSaticiTipi

    return matchesSearch && matchesStatus && matchesSaticiTipi
  })

  return (
    <DashboardLayout>
      <div className="p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Mal Kabul Yönetimi</h1>
            <p className="text-muted-foreground">Tarım ürünlerinin mal kabul süreçlerini yönetin</p>
          </div>
          <div className="flex items-center gap-3">
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Yeni Mal Kabul
            </Button>
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Excel İndir
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Toplam Kayıt</p>
                  <p className="text-2xl font-bold">{malKabulRecords.length}</p>
                </div>
                <Package className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Bekleyen</p>
                  <p className="text-2xl font-bold text-orange-500">
                    {malKabulRecords.filter(item => item.status === 'FATURA_BEKLIYOR').length}
                  </p>
                </div>
                <Clock className="h-8 w-8 text-orange-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Tamamlandı</p>
                  <p className="text-2xl font-bold text-green-500">
                    {malKabulRecords.filter(item => item.status === 'TAMAMLANDI').length}
                  </p>
                </div>
                <CheckCircle className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Toplam KG</p>
                  <p className="text-2xl font-bold">
                    {malKabulRecords.reduce((sum, item) => sum + (item.netKg || 0), 0).toLocaleString()}
                  </p>
                </div>
                <TrendingUp className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Search */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Satıcı, ürün veya fiş no ile ara..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  variant={filterStatus === 'all' ? 'default' : 'outline'}
                  onClick={() => setFilterStatus('all')}
                >
                  Tümü
                </Button>
                <Button
                  variant={filterStatus === 'FATURA_BEKLIYOR' ? 'default' : 'outline'}
                  onClick={() => setFilterStatus('FATURA_BEKLIYOR')}
                >
                  Fatura Bekliyor
                </Button>
                <Button
                  variant={filterStatus === 'FATURALANDI' ? 'default' : 'outline'}
                  onClick={() => setFilterStatus('FATURALANDI')}
                >
                  Faturalandı
                </Button>
                <Button
                  variant={filterStatus === 'TAMAMLANDI' ? 'default' : 'outline'}
                  onClick={() => setFilterStatus('TAMAMLANDI')}
                >
                  Tamamlandı
                </Button>
                <Button
                  variant={filterStatus === 'IPTAL' ? 'default' : 'outline'}
                  onClick={() => setFilterStatus('IPTAL')}
                >
                  İptal
                </Button>
              </div>
              <div className="flex gap-2">
                <Button
                  variant={filterSaticiTipi === 'all' ? 'default' : 'outline'}
                  onClick={() => setFilterSaticiTipi('all')}
                >
                  Tüm Satıcılar
                </Button>
                <Button
                  variant={filterSaticiTipi === 'OZEL_FIRMA' ? 'default' : 'outline'}
                  onClick={() => setFilterSaticiTipi('OZEL_FIRMA')}
                >
                  Özel Firma
                </Button>
                <Button
                  variant={filterSaticiTipi === 'KOMISYONCU' ? 'default' : 'outline'}
                  onClick={() => setFilterSaticiTipi('KOMISYONCU')}
                >
                  Komisyoncu
                </Button>
                <Button
                  variant={filterSaticiTipi === 'MUSTAHSIL' ? 'default' : 'outline'}
                  onClick={() => setFilterSaticiTipi('MUSTAHSIL')}
                >
                  Müstahsil
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Data Table */}
        <Card>
          <CardHeader>
            <CardTitle>Mal Kabul Kayıtları</CardTitle>
            <CardDescription>Excel&apos;deki verilerin dijital versiyonu</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b bg-muted/50">
                    <th className="text-left py-3 px-2 font-medium">TARİH</th>
                    <th className="text-left py-3 px-2 font-medium">SATICI</th>
                    <th className="text-left py-3 px-2 font-medium">ÜNVAN</th>
                    <th className="text-left py-3 px-2 font-medium">ÜRÜN</th>
                    <th className="text-left py-3 px-2 font-medium">KASA SAYISI</th>
                    <th className="text-left py-3 px-2 font-medium">BRÜT KG</th>
                    <th className="text-left py-3 px-2 font-medium">DARA</th>
                    <th className="text-left py-3 px-2 font-medium">GİRİŞ KG</th>
                    <th className="text-left py-3 px-2 font-medium">ÇIKMA/FİRE</th>
                    <th className="text-left py-3 px-2 font-medium">DURUM</th>
                    <th className="text-left py-3 px-2 font-medium">NET KG</th>
                    <th className="text-left py-3 px-2 font-medium">FİYAT</th>
                    <th className="text-left py-3 px-2 font-medium">FİŞ NO</th>
                    <th className="text-left py-3 px-2 font-medium">İŞLEMLER</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan={14} className="py-8 text-center">
                        <Loader2 className="h-8 w-8 animate-spin text-primary" />
                        <p className="mt-2 text-muted-foreground">Mal Kabul Kayıtları yükleniyor...</p>
                      </td>
                    </tr>
                  ) : filteredData.length === 0 ? (
                    <tr>
                      <td colSpan={14} className="py-8 text-center text-muted-foreground">
                        Aradığınız kriterlere uygun kayıt bulunamadı.
                      </td>
                    </tr>
                  ) : (
                    filteredData.map((item) => (
                      <tr key={item.id} className="border-b hover:bg-muted/50">
                        <td className="py-3 px-2 text-sm">{item.tarih}</td>
                        <td className="py-3 px-2">
                          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getSaticiTipiColor(item.saticiTipi)}`}>
                            {getSaticiTipiLabel(item.saticiTipi)}
                          </span>
                        </td>
                        <td className="py-3 px-2 font-medium">{getSaticiAdi(item)}</td>
                        <td className="py-3 px-2">{item.urun.ad}</td>
                        <td className="py-3 px-2 text-right">{item.kasaSayisi.toLocaleString()}</td>
                        <td className="py-3 px-2 text-right">{item.brutKg.toLocaleString()}</td>
                        <td className="py-3 px-2 text-right">{item.daraKg.toLocaleString()}</td>
                        <td className="py-3 px-2 text-right">{item.girisKg.toLocaleString()}</td>
                        <td className="py-3 px-2 text-right">{item.cikmaFireKg.toLocaleString()}</td>
                        <td className="py-3 px-2">
                          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(item.status)}`}>
                            {getStatusLabel(item.status)}
                          </span>
                        </td>
                        <td className="py-3 px-2 text-right font-medium">
                          {item.netKg ? item.netKg.toLocaleString() : '-'}
                        </td>
                        <td className="py-3 px-2 text-right">{item.birimFiyat ? item.birimFiyat.toLocaleString() : '-'}</td>
                        <td className="py-3 px-2 font-medium">{item.fisNo}</td>
                        <td className="py-3 px-2">
                          <div className="flex items-center gap-1">
                            <Button variant="ghost" size="sm" onClick={() => handleView(item)}>
                              <Eye className="h-4 w-4" />
                            </Button>
                                                         <Link href={`/dashboard/mal-kabul/duzenle/${item.id}`}>
                               <Button variant="ghost" size="sm">
                                 <Edit className="h-4 w-4" />
                               </Button>
                             </Link>
                                                         <Button variant="ghost" size="sm" onClick={() => handleDelete(item.id)}>
                               <Trash2 className="h-4 w-4" />
                             </Button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* View Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Mal Kabul Detayları</DialogTitle>
            <DialogDescription>
              {selectedRecord ? (
                <div className="grid gap-4">
                  <p><strong>Fatura No:</strong> {selectedRecord.fisNo}</p>
                  <p><strong>Tarih:</strong> {selectedRecord.tarih}</p>
                  <p><strong>Satıcı:</strong> {getSaticiAdi(selectedRecord)}</p>
                  <p><strong>Ürün:</strong> {selectedRecord.urun.ad}</p>
                  <p><strong>Kasa Sayısı:</strong> {selectedRecord.kasaSayisi.toLocaleString()}</p>
                  <p><strong>Brüt KG:</strong> {selectedRecord.brutKg.toLocaleString()}</p>
                  <p><strong>Dara KG:</strong> {selectedRecord.daraKg.toLocaleString()}</p>
                  <p><strong>Giriş KG:</strong> {selectedRecord.girisKg.toLocaleString()}</p>
                  <p><strong>Çıkma/Fire KG:</strong> {selectedRecord.cikmaFireKg.toLocaleString()}</p>
                  <p><strong>Net KG:</strong> {selectedRecord.netKg.toLocaleString()}</p>
                  <p><strong>Birim Fiyat:</strong> {selectedRecord.birimFiyat ? selectedRecord.birimFiyat.toLocaleString() : '-'}</p>
                  <p><strong>Toplam Fiyat:</strong> {selectedRecord.toplamFiyat ? selectedRecord.toplamFiyat.toLocaleString() : '-'}</p>
                  <p><strong>Durum:</strong> <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedRecord.status)}`}>{getStatusLabel(selectedRecord.status)}</span></p>
                  <p><strong>Notlar:</strong> {selectedRecord.notlar || '-'}</p>
                  <p><strong>Oluşturan:</strong> {selectedRecord.malKabulcu.firstName} {selectedRecord.malKabulcu.lastName}</p>
                  <p><strong>Oluşturma Tarihi:</strong> {new Date(selectedRecord.createdAt).toLocaleDateString()}</p>
                  <p><strong>Güncellenme Tarihi:</strong> {new Date(selectedRecord.updatedAt).toLocaleDateString()}</p>
                </div>
              ) : (
                <p>Seçili kayıt bulunamadı.</p>
              )}
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  )
}
