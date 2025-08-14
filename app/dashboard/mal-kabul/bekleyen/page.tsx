'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { 
  Search, 
  Filter, 
  Eye, 
  Edit, 
  AlertTriangle,
  FileText,
  Package,
  Calendar,
  Scale,
  User,
  Clock
} from 'lucide-react'
import { toast } from '@/components/ui/use-toast'

interface MalKabulRecord {
  id: string
  fisNo: string
  tarih: string
  saticiTipi: string
  urun: { ad: string }
  brutKg: number
  girisKg: number
  status: string
  malKabulcu: { firstName: string; lastName: string }
  komisyoncu?: { dukkanAdi: string }
  uretici?: { ad: string; soyad: string }
  ozelFirma?: { firmaAdi: string }
  ambalaj?: { ad: string }
  palet?: { ad: string }
  kasaSayisi: number
  paletSayisi: number
  notlar?: string
  createdAt: string
}

export default function BekleyenFaturalarPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [records, setRecords] = useState<MalKabulRecord[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [saticiFilter, setSaticiFilter] = useState('')

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login')
    } else if (status === 'authenticated') {
      fetchRecords()
    }
  }, [status, router])

  const fetchRecords = async () => {
    try {
      const response = await fetch('/api/mal-kabul?limit=1000')
      if (response.ok) {
        const data = await response.json()
        console.log('Bekleyen API Response:', data)
        console.log('Bekleyen Records:', data.records)
        // Sadece fatura bekleyen kayıtları filtrele
        const bekleyenRecords = (data.records || []).filter((record: MalKabulRecord) => 
          record.status === 'FATURA_BEKLIYOR'
        )
        console.log('Filtrelenmiş bekleyen kayıtlar:', bekleyenRecords)
        setRecords(bekleyenRecords)
      }
    } catch (error) {
      console.error('Kayıtlar yüklenirken hata:', error)
      toast({
        title: "Hata",
        description: "Kayıtlar yüklenirken hata oluştu",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const getSaticiAdi = (record: MalKabulRecord) => {
    if (record.komisyoncu) return record.komisyoncu.dukkanAdi
    if (record.uretici) return `${record.uretici.ad} ${record.uretici.soyad}`
    if (record.ozelFirma) return record.ozelFirma.firmaAdi
    return 'Bilinmiyor'
  }

  const getBeklemeSuresi = (createdAt: string) => {
    const created = new Date(createdAt)
    const now = new Date()
    const diffTime = Math.abs(now.getTime() - created.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    
    if (diffDays === 1) return '1 gün'
    if (diffDays < 7) return `${diffDays} gün`
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} hafta`
    return `${Math.floor(diffDays / 30)} ay`
  }

  const getBeklemeBadge = (createdAt: string) => {
    const created = new Date(createdAt)
    const now = new Date()
    const diffTime = Math.abs(now.getTime() - created.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    
    if (diffDays <= 3) return <Badge variant="success">Yeni</Badge>
    if (diffDays <= 7) return <Badge variant="default">Normal</Badge>
    if (diffDays <= 14) return <Badge variant="secondary">Bekliyor</Badge>
    return <Badge variant="destructive">Acil</Badge>
  }

  const handleView = (id: string) => {
    router.push(`/dashboard/mal-kabul/duzenle/${id}`)
  }

  const filteredRecords = records.filter(record => {
    const matchesSearch = record.fisNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         record.urun.ad.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         getSaticiAdi(record).toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesSatici = !saticiFilter || record.saticiTipi === saticiFilter
    
    return matchesSearch && matchesSatici
  })

  if (loading) {
    return (
      
        <div className="p-6">
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
          </div>
        </div>
      
    )
  }

  return (
    
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold">Bekleyen Faturalar</h1>
            <p className="text-gray-600 mt-2">Fatura bekleyen mal kabul kayıtları</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" onClick={() => router.push('/dashboard/mal-kabul/liste')}>
              <FileText className="mr-2 h-4 w-4" />
              Tüm Kayıtlar
            </Button>
            <Button onClick={() => router.push('/dashboard/mal-kabul/yeni')}>
              <Package className="mr-2 h-4 w-4" />
              Yeni Mal Kabul
            </Button>
          </div>
        </div>

        {/* Özet Kartları */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Toplam Bekleyen</p>
                  <p className="text-2xl font-bold">{records.length}</p>
                </div>
                <AlertTriangle className="h-8 w-8 text-orange-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Yeni (≤3 gün)</p>
                  <p className="text-2xl font-bold text-green-600">
                    {records.filter(r => {
                      const days = Math.ceil((new Date().getTime() - new Date(r.createdAt).getTime()) / (1000 * 60 * 60 * 24))
                      return days <= 3
                    }).length}
                  </p>
                </div>
                <Clock className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Normal (≤7 gün)</p>
                  <p className="text-2xl font-bold text-blue-600">
                    {records.filter(r => {
                      const days = Math.ceil((new Date().getTime() - new Date(r.createdAt).getTime()) / (1000 * 60 * 60 * 24))
                      return days > 3 && days <= 7
                    }).length}
                  </p>
                </div>
                <Clock className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Acil (&gt;14 gün)</p>
                  <p className="text-2xl font-bold text-red-600">
                    {records.filter(r => {
                      const days = Math.ceil((new Date().getTime() - new Date(r.createdAt).getTime()) / (1000 * 60 * 60 * 24))
                      return days > 14
                    }).length}
                  </p>
                </div>
                <AlertTriangle className="h-8 w-8 text-red-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filtreler */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Filter className="h-5 w-5" />
              Filtreler
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Arama</label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Fiş no, ürün, satıcı..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Satıcı Tipi</label>
                <Select value={saticiFilter} onValueChange={setSaticiFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Tüm satıcı tipleri" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Tüm satıcı tipleri</SelectItem>
                    <SelectItem value="KOMISYONCU">Komisyoncu</SelectItem>
                    <SelectItem value="URETICI">Üretici</SelectItem>
                    <SelectItem value="OZEL_FIRMA">Özel Firma</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex items-end">
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setSearchTerm('')
                    setSaticiFilter('')
                  }}
                >
                  Filtreleri Temizle
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Kayıtlar */}
        <div className="grid gap-4">
          {filteredRecords.map((record) => (
            <Card key={record.id} className="hover:shadow-md transition-shadow border-l-4 border-l-orange-500">
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold">{record.fisNo}</h3>
                      {getBeklemeBadge(record.createdAt)}
                      <Badge variant="secondary">Fatura Bekliyor</Badge>
                    </div>
                    <div className="text-sm text-gray-600">
                      {new Date(record.tarih).toLocaleDateString('tr-TR')} - {new Date(record.tarih).toLocaleTimeString('tr-TR')}
                    </div>
                    <div className="text-sm text-orange-600 mt-1">
                      <Clock className="inline mr-1 h-3 w-3" />
                      {getBeklemeSuresi(record.createdAt)} bekliyor
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={() => handleView(record.id)}>
                      <Eye className="mr-1 h-4 w-4" />
                      Görüntüle
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handleView(record.id)}>
                      <Edit className="mr-1 h-4 w-4" />
                      Düzenle
                    </Button>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex items-center gap-2">
                    <Package className="h-4 w-4 text-gray-500" />
                    <span className="font-medium">{record.urun.ad}</span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-gray-500" />
                    <span>{getSaticiAdi(record)}</span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Scale className="h-4 w-4 text-gray-500" />
                    <span>{record.girisKg.toFixed(2)} kg</span>
                  </div>
                </div>
                
                {record.notlar && (
                  <div className="mt-3 p-3 bg-orange-50 rounded-lg border border-orange-200">
                    <div className="text-sm font-medium text-orange-700 mb-1">Notlar:</div>
                    <div className="text-sm text-orange-600">{record.notlar}</div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
        
        {filteredRecords.length === 0 && (
          <div className="text-center py-12">
            <AlertTriangle className="mx-auto h-12 w-12 text-orange-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Bekleyen fatura bulunamadı</h3>
            <p className="text-gray-500">Fatura bekleyen mal kabul kaydı bulunmuyor.</p>
          </div>
        )}
      </div>
    
  )
}
