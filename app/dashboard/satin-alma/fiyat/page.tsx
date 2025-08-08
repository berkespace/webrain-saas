'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { 
  Search, 
  Filter,
  AlertTriangle,
  DollarSign,
  Package,
  Calendar,
  User,
  Save
} from 'lucide-react'
import { DashboardLayout } from '@/components/layout/dashboard-layout'
import { useToast } from '@/components/ui/use-toast'

// Mock faturalandırılmamış ürünler
const mockBekleyenUrunler = [
  {
    id: 1,
    fisNo: 15066,
    tarih: '15.07.2025',
    mustahsil: 'Bölge',
    unvan: 'CİHAN TARIM',
    uretici: 'ABBAS KAYMAZ',
    urun: 'SİLÖR',
    kasaSayisi: 115.00,
    brutKg: 2.402,
    dara: 230.00,
    girisKg: 2172.00,
    cikmaFire: 274.00,
    netKg: 957.00,
    durum: 'BEKLEM...',
    fiyat: ''
  },
  {
    id: 2,
    fisNo: 15072,
    tarih: '16.07.2025',
    mustahsil: 'Müstahsil',
    unvan: 'DURDAŞLAR',
    uretici: 'HÜSEYİN URAL',
    urun: 'DOMATES',
    kasaSayisi: 15.00,
    brutKg: 217,
    dara: 29.00,
    girisKg: 188.00,
    cikmaFire: 0.00,
    netKg: 1006.00,
    durum: 'BEKLEM...',
    fiyat: ''
  },
  {
    id: 3,
    fisNo: 15073,
    tarih: '16.07.2025',
    mustahsil: 'Müstahsil',
    unvan: 'AHMET TORUN KOM',
    uretici: 'ÖZKARADAĞ',
    urun: 'SALATALIK',
    kasaSayisi: 25.00,
    brutKg: 450,
    dara: 50.00,
    girisKg: 400.00,
    cikmaFire: 50.00,
    netKg: 350.00,
    durum: 'BEKLEM...',
    fiyat: ''
  }
]

export default function FiyatGirisi() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const { toast } = useToast()
  const [searchTerm, setSearchTerm] = useState('')
  const [filterUrun, setFilterUrun] = useState('')
  const [filterUretici, setFilterUretici] = useState('')
  const [editingId, setEditingId] = useState<number | null>(null)
  const [editingFiyat, setEditingFiyat] = useState('')

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login')
    } else if (session && (session.user as any)?.role !== 'SATIN_ALMACI') {
      router.push('/dashboard')
    }
  }, [status, session, router])

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

  if (!session || (session.user as any)?.role !== 'SATIN_ALMACI') {
    return null
  }

  const filteredUrunler = mockBekleyenUrunler.filter(item => {
    const matchesSearch = 
      item.unvan.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.uretici.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.urun.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.fisNo.toString().includes(searchTerm)
    
    const matchesUrun = !filterUrun || item.urun === filterUrun
    const matchesUretici = !filterUretici || item.uretici === filterUretici
    
    return matchesSearch && matchesUrun && matchesUretici
  })

  const handleFiyatSave = async (id: number) => {
    if (!editingFiyat || parseFloat(editingFiyat) <= 0) {
      toast({
        title: "Hata",
        description: "Lütfen geçerli bir fiyat girin",
        variant: "destructive",
      })
      return
    }

    // API call would go here
    console.log('Fiyat kaydediliyor:', { id, fiyat: editingFiyat })
    
    toast({
      title: "Başarılı",
      description: "Fiyat başarıyla kaydedildi",
      variant: "success",
    })
    
    setEditingId(null)
    setEditingFiyat('')
  }

  const handleEdit = (id: number, currentFiyat: string) => {
    setEditingId(id)
    setEditingFiyat(currentFiyat)
  }

  const uniqueUrunler = [...new Set(mockBekleyenUrunler.map(item => item.urun))]
  const uniqueUreticiler = [...new Set(mockBekleyenUrunler.map(item => item.uretici))]

  return (
    <DashboardLayout>
      <div className="p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Fiyat Girişi</h1>
            <p className="text-muted-foreground">Faturalandırılmamış ürünler için fiyat girişi</p>
          </div>
        </div>

        {/* Warning Banner */}
        {filteredUrunler.length > 10 && (
          <Card className="mb-6 border-orange-200 bg-orange-50">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <AlertTriangle className="h-5 w-5 text-orange-600" />
                <div>
                  <p className="font-medium text-orange-800">Faturalandırılmamış Ürün Uyarısı</p>
                  <p className="text-sm text-orange-700">
                    Faturalandırılmamış ürün sayısı {filteredUrunler.length}&apos;e ulaştı. Lütfen acil olarak fiyat girişi yapın.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Bekleyen Ürün</p>
                  <p className="text-2xl font-bold text-orange-500">{filteredUrunler.length}</p>
                </div>
                <Package className="h-8 w-8 text-orange-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Toplam KG</p>
                  <p className="text-2xl font-bold">
                    {filteredUrunler.reduce((sum, item) => sum + (item.netKg || 0), 0).toLocaleString()}
                  </p>
                </div>
                <DollarSign className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Toplam Değer</p>
                  <p className="text-2xl font-bold text-green-500">
                    {filteredUrunler
                      .filter(item => item.fiyat)
                      .reduce((sum, item) => sum + ((item.netKg || 0) * parseFloat(item.fiyat || '0')), 0)
                      .toLocaleString('tr-TR', { style: 'currency', currency: 'TRY' })}
                  </p>
                </div>
                <DollarSign className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Ara..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div>
                <select
                  value={filterUrun}
                  onChange={(e) => setFilterUrun(e.target.value)}
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                >
                  <option value="">Tüm Ürünler</option>
                  {uniqueUrunler.map((urun) => (
                    <option key={urun} value={urun}>{urun}</option>
                  ))}
                </select>
              </div>
              <div>
                <select
                  value={filterUretici}
                  onChange={(e) => setFilterUretici(e.target.value)}
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                >
                  <option value="">Tüm Üreticiler</option>
                  {uniqueUreticiler.map((uretici) => (
                    <option key={uretici} value={uretici}>{uretici}</option>
                  ))}
                </select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Products Table */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="h-5 w-5" />
              Faturalandırılmamış Ürünler
            </CardTitle>
            <CardDescription>Fiyat girişi bekleyen ürünler</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b bg-muted/50">
                    <th className="text-left py-3 px-2 font-medium">Fiş No</th>
                    <th className="text-left py-3 px-2 font-medium">Tarih</th>
                    <th className="text-left py-3 px-2 font-medium">Komisyoncu</th>
                    <th className="text-left py-3 px-2 font-medium">Üretici</th>
                    <th className="text-left py-3 px-2 font-medium">Ürün</th>
                    <th className="text-left py-3 px-2 font-medium">Net KG</th>
                    <th className="text-left py-3 px-2 font-medium">Fiyat (₺/kg)</th>
                    <th className="text-left py-3 px-2 font-medium">Toplam</th>
                    <th className="text-left py-3 px-2 font-medium">İşlemler</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUrunler.map((item) => (
                    <tr key={item.id} className="border-b hover:bg-muted/50">
                      <td className="py-3 px-2 font-medium">{item.fisNo}</td>
                      <td className="py-3 px-2 text-sm">{item.tarih}</td>
                      <td className="py-3 px-2">{item.unvan}</td>
                      <td className="py-3 px-2">{item.uretici}</td>
                      <td className="py-3 px-2">{item.urun}</td>
                      <td className="py-3 px-2 text-right">{item.netKg?.toLocaleString()}</td>
                      <td className="py-3 px-2">
                        {editingId === item.id ? (
                          <div className="flex items-center gap-2">
                            <Input
                              type="number"
                              step="0.01"
                              value={editingFiyat}
                              onChange={(e) => setEditingFiyat(e.target.value)}
                              className="w-20"
                              placeholder="0.00"
                            />
                            <Button size="sm" onClick={() => handleFiyatSave(item.id)}>
                              <Save className="h-3 w-3" />
                            </Button>
                          </div>
                        ) : (
                          <span className={item.fiyat ? 'font-medium' : 'text-muted-foreground'}>
                            {item.fiyat ? `${item.fiyat}₺` : '-'}
                          </span>
                        )}
                      </td>
                      <td className="py-3 px-2 text-right font-medium">
                        {item.fiyat && item.netKg 
                          ? `${((item.netKg || 0) * parseFloat(item.fiyat)).toLocaleString('tr-TR', { style: 'currency', currency: 'TRY' })}`
                          : '-'
                        }
                      </td>
                      <td className="py-3 px-2">
                        {editingId !== item.id && (
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={() => handleEdit(item.id, item.fiyat)}
                          >
                            <DollarSign className="h-4 w-4" />
                          </Button>
                        )}
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
