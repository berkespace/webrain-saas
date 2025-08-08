'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Plus,
  Search,
  Edit,
  Trash2,
  Package,
  Scale,
  Loader2
} from 'lucide-react'
import { DashboardLayout } from '@/components/layout/dashboard-layout'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useToast } from '@/components/ui/use-toast'

interface Ambalaj {
  id: string
  ad: string
  tipi: 'PALET' | 'PLASTIK_KASA' | 'KARTON_KASA' | 'DİĞER'
  daraKg: number
  aciklama?: string
  durum: 'AKTIF' | 'PASIF'
  createdAt: string
  updatedAt: string
}

export default function AmbalajListesi() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const { toast } = useToast()
  const [ambalajlar, setAmbalajlar] = useState<Ambalaj[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [filterTipi, setFilterTipi] = useState('all')
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingAmbalaj, setEditingAmbalaj] = useState<Ambalaj | null>(null)
  const [formData, setFormData] = useState({
    ad: '',
    tipi: 'PLASTIK_KASA',
    daraKg: '',
    aciklama: '',
    durum: 'AKTIF'
  })
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login')
    } else if (status === 'authenticated') {
      fetchAmbalajlar()
    }
  }, [status, router])

  const fetchAmbalajlar = async () => {
    try {
      setLoading(true)
      const params = new URLSearchParams()
      if (searchTerm) params.append('search', searchTerm)
      if (filterStatus !== 'all') params.append('status', filterStatus)
      if (filterTipi !== 'all') params.append('tipi', filterTipi)

      const response = await fetch(`/api/ambalajlar?${params.toString()}`)
      if (response.ok) {
        const data = await response.json()
        setAmbalajlar(data)
      } else {
        console.error('Ambalaj listesi alınamadı')
      }
    } catch (error) {
      console.error('Ambalaj listesi hatası:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (status === 'authenticated') {
      fetchAmbalajlar()
    }
  }, [searchTerm, filterStatus, filterTipi])

  if (status === 'loading') {
    return (
      <DashboardLayout>
        <div className="min-h-screen bg-background flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-muted-foreground">Yükleniyor...</p>
          </div>
        </div>
      </DashboardLayout>
    )
  }

  if (!session) {
    return null
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    
    try {
      const url = editingAmbalaj 
        ? `/api/ambalajlar/${editingAmbalaj.id}`
        : '/api/ambalajlar'
      
      const method = editingAmbalaj ? 'PUT' : 'POST'
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setIsDialogOpen(false)
        setEditingAmbalaj(null)
        setFormData({
          ad: '',
          tipi: 'PLASTIK_KASA',
          daraKg: '',
          aciklama: '',
          durum: 'AKTIF'
        })
        fetchAmbalajlar()
        toast({
          title: "Başarılı",
          description: editingAmbalaj ? "Ambalaj başarıyla güncellendi" : "Ambalaj başarıyla oluşturuldu",
          variant: "success",
        })
      } else {
        const error = await response.json()
        toast({
          title: "Hata",
          description: error.error || 'Bir hata oluştu',
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error('Ambalaj kaydetme hatası:', error)
      toast({
        title: "Hata",
        description: "Bir hata oluştu",
        variant: "destructive",
      })
    } finally {
      setSubmitting(false)
    }
  }

  const handleEdit = (ambalaj: Ambalaj) => {
    setEditingAmbalaj(ambalaj)
    setFormData({
      ad: ambalaj.ad,
      tipi: ambalaj.tipi,
      daraKg: ambalaj.daraKg.toString(),
      aciklama: ambalaj.aciklama || '',
      durum: ambalaj.durum
    })
    setIsDialogOpen(true)
  }

  const handleDelete = async (ambalajId: string) => {
    if (confirm('Bu ambalajı silmek istediğinizden emin misiniz?')) {
      try {
        const response = await fetch(`/api/ambalajlar/${ambalajId}`, {
          method: 'DELETE',
        })

        if (response.ok) {
          fetchAmbalajlar()
          toast({
            title: "Başarılı",
            description: "Ambalaj başarıyla silindi",
            variant: "success",
          })
        } else {
          const error = await response.json()
          toast({
            title: "Hata",
            description: error.error || 'Silme işlemi başarısız',
            variant: "destructive",
          })
        }
      } catch (error) {
        console.error('Ambalaj silme hatası:', error)
        toast({
          title: "Hata",
          description: "Silme işlemi sırasında hata oluştu",
          variant: "destructive",
        })
      }
    }
  }

  const getStatusColor = (status: string) => {
    return status === 'AKTIF' 
      ? 'bg-green-100 text-green-800' 
      : 'bg-red-100 text-red-800'
  }

  const getTipiLabel = (tipi: string) => {
    switch (tipi) {
      case 'PALET': return 'Palet'
      case 'PLASTIK_KASA': return 'Plastik Kasa'
      case 'KARTON_KASA': return 'Karton Kasa'
      case 'DİĞER': return 'Diğer'
      default: return tipi
    }
  }

  const getTipiColor = (tipi: string) => {
    switch (tipi) {
      case 'PALET': return 'bg-blue-100 text-blue-800'
      case 'PLASTIK_KASA': return 'bg-green-100 text-green-800'
      case 'KARTON_KASA': return 'bg-yellow-100 text-yellow-800'
      case 'DİĞER': return 'bg-gray-100 text-gray-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <DashboardLayout>
      <div className="p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Ambalaj Yönetimi</h1>
            <p className="text-muted-foreground">Ambalaj bilgilerini yönetin</p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Yeni Ambalaj
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>
                  {editingAmbalaj ? 'Ambalaj Düzenle' : 'Yeni Ambalaj Ekle'}
                </DialogTitle>
                <DialogDescription>
                  {editingAmbalaj ? 'Ambalaj bilgilerini güncelleyin' : 'Yeni ambalaj bilgilerini girin'}
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmit}>
                <div className="grid gap-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="ad">Ambalaj Adı *</Label>
                    <Input 
                      id="ad" 
                      value={formData.ad} 
                      onChange={(e) => setFormData({...formData, ad: e.target.value})} 
                      required 
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="tipi">Ambalaj Tipi *</Label>
                    <Select 
                      value={formData.tipi} 
                      onValueChange={(value) => setFormData({...formData, tipi: value})}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="PALET">Palet</SelectItem>
                        <SelectItem value="PLASTIK_KASA">Plastik Kasa</SelectItem>
                        <SelectItem value="KARTON_KASA">Karton Kasa</SelectItem>
                        <SelectItem value="DİĞER">Diğer</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="daraKg">Dara KG *</Label>
                    <Input 
                      id="daraKg" 
                      type="number"
                      step="0.01"
                      value={formData.daraKg} 
                      onChange={(e) => setFormData({...formData, daraKg: e.target.value})} 
                      required 
                      placeholder="0.00"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="aciklama">Açıklama</Label>
                    <textarea
                      id="aciklama"
                      value={formData.aciklama}
                      onChange={(e) => setFormData({...formData, aciklama: e.target.value})}
                      placeholder="Ambalaj açıklaması..."
                      rows={3}
                      className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="durum">Durum</Label>
                    <Select 
                      value={formData.durum} 
                      onValueChange={(value) => setFormData({...formData, durum: value})}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="AKTIF">Aktif</SelectItem>
                        <SelectItem value="PASIF">Pasif</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <DialogFooter>
                  <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                    İptal
                  </Button>
                  <Button type="submit" disabled={submitting}>
                    {submitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        {editingAmbalaj ? 'Güncelleniyor...' : 'Oluşturuluyor...'}
                      </>
                    ) : (
                      editingAmbalaj ? 'Güncelle' : 'Oluştur'
                    )}
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Toplam Ambalaj</p>
                  <p className="text-2xl font-bold">{ambalajlar.length}</p>
                </div>
                <Package className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Palet</p>
                  <p className="text-2xl font-bold text-blue-500">
                    {ambalajlar.filter(a => a.tipi === 'PALET').length}
                  </p>
                </div>
                <Package className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Plastik Kasa</p>
                  <p className="text-2xl font-bold text-green-500">
                    {ambalajlar.filter(a => a.tipi === 'PLASTIK_KASA').length}
                  </p>
                </div>
                <Package className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Karton Kasa</p>
                  <p className="text-2xl font-bold text-yellow-500">
                    {ambalajlar.filter(a => a.tipi === 'KARTON_KASA').length}
                  </p>
                </div>
                <Package className="h-8 w-8 text-yellow-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Ambalaj adı veya açıklama ara..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div>
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                >
                  <option value="all">Tüm Durumlar</option>
                  <option value="AKTIF">Aktif</option>
                  <option value="PASIF">Pasif</option>
                </select>
              </div>
              <div>
                <select
                  value={filterTipi}
                  onChange={(e) => setFilterTipi(e.target.value)}
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                >
                  <option value="all">Tüm Tipler</option>
                  <option value="PALET">Palet</option>
                  <option value="PLASTIK_KASA">Plastik Kasa</option>
                  <option value="KARTON_KASA">Karton Kasa</option>
                  <option value="DİĞER">Diğer</option>
                </select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Ambalajlar Table */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="h-5 w-5" />
              Ambalaj Listesi
            </CardTitle>
            <CardDescription>Toplam {ambalajlar.length} ambalaj</CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                <span className="ml-2 text-muted-foreground">Yükleniyor...</span>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b bg-muted/50">
                      <th className="text-left py-3 px-2 font-medium">Ambalaj Adı</th>
                      <th className="text-left py-3 px-2 font-medium">Tipi</th>
                      <th className="text-left py-3 px-2 font-medium">Dara KG</th>
                      <th className="text-left py-3 px-2 font-medium">Açıklama</th>
                      <th className="text-left py-3 px-2 font-medium">Durum</th>
                      <th className="text-left py-3 px-2 font-medium">Kayıt Tarihi</th>
                      <th className="text-left py-3 px-2 font-medium">İşlemler</th>
                    </tr>
                  </thead>
                  <tbody>
                    {ambalajlar.map((ambalaj) => (
                      <tr key={ambalaj.id} className="border-b hover:bg-muted/50">
                        <td className="py-3 px-2 font-medium">
                          {ambalaj.ad}
                        </td>
                        <td className="py-3 px-2">
                          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getTipiColor(ambalaj.tipi)}`}>
                            {getTipiLabel(ambalaj.tipi)}
                          </span>
                        </td>
                        <td className="py-3 px-2">
                          <div className="flex items-center gap-2">
                            <Scale className="h-3 w-3 text-muted-foreground" />
                            {ambalaj.daraKg} kg
                          </div>
                        </td>
                        <td className="py-3 px-2 text-sm">
                          {ambalaj.aciklama || '-'}
                        </td>
                        <td className="py-3 px-2">
                          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(ambalaj.durum)}`}>
                            {ambalaj.durum === 'AKTIF' ? 'Aktif' : 'Pasif'}
                          </span>
                        </td>
                        <td className="py-3 px-2 text-sm text-muted-foreground">
                          {new Date(ambalaj.createdAt).toLocaleDateString('tr-TR')}
                        </td>
                        <td className="py-3 px-2">
                          <div className="flex items-center gap-1">
                            <Button variant="ghost" size="sm" onClick={() => handleEdit(ambalaj)}>
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm" onClick={() => handleDelete(ambalaj.id)}>
                              <Trash2 className="h-4 w-4" />
                            </Button>
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
      </div>
    </DashboardLayout>
  )
}
