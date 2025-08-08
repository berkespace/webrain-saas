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
  Trash2
} from 'lucide-react'
import { DashboardLayout } from '@/components/layout/dashboard-layout'

// Mock data based on Excel structure
const mockData = [
  {
    id: 1,
    tarih: '15.07.2025',
    saticiTipi: 'OZEL_FIRMA',
    saticiAdi: 'CİHAN TARIM',
    urun: 'SİLÖR',
    kasaSayisi: 115.00,
    brutKg: 2.402,
    dara: 230.00,
    girisKg: 2172.00,
    cikmaFire: 274.00,
    durum: 'BEKLEM...',
    netKg: 957.00,
    fiyat: '35,00₺',
    fisNo: 15066
  },
  {
    id: 2,
    tarih: '15.07.2025',
    saticiTipi: 'KOMISYONCU',
    saticiAdi: 'ÇALDIR KOM',
    urun: 'SALATALIK',
    kasaSayisi: 84.00,
    brutKg: 1.957,
    dara: 168.00,
    girisKg: 1789.00,
    cikmaFire: 820.00,
    durum: 'NETLENDİ',
    netKg: 480.00,
    fiyat: '40,00₺',
    fisNo: 15067
  },
  {
    id: 3,
    tarih: '16.07.2025',
    saticiTipi: 'MUSTAHSIL',
    saticiAdi: 'DURDAŞLAR',
    urun: 'DOMATES',
    kasaSayisi: 15.00,
    brutKg: 217,
    dara: 29.00,
    girisKg: 188.00,
    cikmaFire: 0.00,
    durum: 'BEKLEM...',
    netKg: 1006.00,
    fiyat: '',
    fisNo: 15072
  }
]

export default function MalKabulDashboard() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [filterSaticiTipi, setFilterSaticiTipi] = useState('all')

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login')
    }
  }, [status, router])

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

  const filteredData = mockData.filter(item => {
    const matchesSearch = 
      item.saticiAdi.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.urun.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.fisNo.toString().includes(searchTerm)

    const matchesStatus = filterStatus === 'all' || item.durum === filterStatus
    const matchesSaticiTipi = filterSaticiTipi === 'all' || item.saticiTipi === filterSaticiTipi

    return matchesSearch && matchesStatus && matchesSaticiTipi
  })

  const getSaticiTipiLabel = (tipi: string) => {
    switch (tipi) {
      case 'OZEL_FIRMA': return 'Özel Firma'
      case 'MUSTAHSIL': return 'Müstahsil'
      case 'KOMISYONCU': return 'Komisyoncu'
      default: return tipi
    }
  }

  const getSaticiTipiColor = (tipi: string) => {
    switch (tipi) {
      case 'OZEL_FIRMA': return 'bg-blue-100 text-blue-800'
      case 'MUSTAHSIL': return 'bg-green-100 text-green-800'
      case 'KOMISYONCU': return 'bg-purple-100 text-purple-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

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
                  <p className="text-2xl font-bold">{mockData.length}</p>
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
                    {mockData.filter(item => item.durum === 'BEKLEM...').length}
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
                  <p className="text-sm text-muted-foreground">Netlendi</p>
                  <p className="text-2xl font-bold text-green-500">
                    {mockData.filter(item => item.durum === 'NETLENDİ').length}
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
                    {mockData.reduce((sum, item) => sum + (item.netKg || 0), 0).toLocaleString()}
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
                  variant={filterStatus === 'BEKLEM...' ? 'default' : 'outline'}
                  onClick={() => setFilterStatus('BEKLEM...')}
                >
                  Bekleyen
                </Button>
                <Button
                  variant={filterStatus === 'NETLENDİ' ? 'default' : 'outline'}
                  onClick={() => setFilterStatus('NETLENDİ')}
                >
                  Netlendi
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
                  variant={filterSaticiTipi === 'MUSTAHSIL' ? 'default' : 'outline'}
                  onClick={() => setFilterSaticiTipi('MUSTAHSIL')}
                >
                  Müstahsil
                </Button>
                <Button
                  variant={filterSaticiTipi === 'KOMISYONCU' ? 'default' : 'outline'}
                  onClick={() => setFilterSaticiTipi('KOMISYONCU')}
                >
                  Komisyoncu
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Data Table */}
        <Card>
          <CardHeader>
            <CardTitle>Mal Kabul Kayıtları</CardTitle>
            <CardDescription>Excel'deki verilerin dijital versiyonu</CardDescription>
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
                  {filteredData.map((item) => (
                    <tr key={item.id} className="border-b hover:bg-muted/50">
                      <td className="py-3 px-2 text-sm">{item.tarih}</td>
                      <td className="py-3 px-2">
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getSaticiTipiColor(item.saticiTipi)}`}>
                          {getSaticiTipiLabel(item.saticiTipi)}
                        </span>
                      </td>
                      <td className="py-3 px-2 font-medium">{item.saticiAdi}</td>
                      <td className="py-3 px-2">{item.urun}</td>
                      <td className="py-3 px-2 text-right">{item.kasaSayisi.toLocaleString()}</td>
                      <td className="py-3 px-2 text-right">{item.brutKg.toLocaleString()}</td>
                      <td className="py-3 px-2 text-right">{item.dara.toLocaleString()}</td>
                      <td className="py-3 px-2 text-right">{item.girisKg.toLocaleString()}</td>
                      <td className="py-3 px-2 text-right">{item.cikmaFire.toLocaleString()}</td>
                      <td className="py-3 px-2">
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                          item.durum === 'BEKLEM...' 
                            ? 'bg-orange-100 text-orange-800' 
                            : 'bg-green-100 text-green-800'
                        }`}>
                          {item.durum}
                        </span>
                      </td>
                      <td className="py-3 px-2 text-right font-medium">
                        {item.netKg ? item.netKg.toLocaleString() : '-'}
                      </td>
                      <td className="py-3 px-2 text-right">{item.fiyat || '-'}</td>
                      <td className="py-3 px-2 font-medium">{item.fisNo}</td>
                      <td className="py-3 px-2">
                        <div className="flex items-center gap-1">
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
