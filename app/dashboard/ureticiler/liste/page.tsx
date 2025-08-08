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
  Users,
  Eye,
  User,
  MapPin,
  Phone,
  Calendar,
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
import Link from 'next/link'
import { useToast } from '@/components/ui/use-toast'
import { FormValidation, validateRequired } from '@/components/ui/form-validation'

interface Uretici {
  id: string
  ad: string
  soyad: string
  tcNo?: string
  dogumTarihi?: string
  iletisim?: string
  sehir: string
  cinsiyet: 'ERKEK' | 'KADIN'
  durum: 'AKTIF' | 'PASIF'
  komisyoncuId?: string
  komisyoncu?: {
    id: string
    dukkanAdi: string
    sehir: string
  }
  createdAt: string
  updatedAt: string
}

interface Komisyoncu {
  id: string
  dukkanAdi: string
  sehir: string
  komisyonNo: string
  durum: 'AKTIF' | 'PASIF'
}

export default function UreticiListesi() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const { toast } = useToast()
  const [ureticiler, setUreticiler] = useState<Uretici[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [filterCinsiyet, setFilterCinsiyet] = useState('all')
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingUretici, setEditingUretici] = useState<Uretici | null>(null)
  const [formData, setFormData] = useState({
    ad: '',
    soyad: '',
    tcNo: '',
    dogumTarihi: '',
    iletisim: '',
    sehir: '',
    cinsiyet: '',
    durum: 'AKTIF',
    komisyoncuId: ''
  })
  const [submitting, setSubmitting] = useState(false)
  const [komisyoncular, setKomisyoncular] = useState<Komisyoncu[]>([])
  const [errors, setErrors] = useState<{ field: string; message: string; type: 'error' | 'warning' | 'info'}[]>([])

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login')
    } else if (status === 'authenticated') {
      fetchUreticiler()
      fetchKomisyoncular()
    }
  }, [status, router])

  const fetchUreticiler = async () => {
    try {
      setLoading(true)
      const params = new URLSearchParams()
      if (searchTerm) params.append('search', searchTerm)
      if (filterStatus !== 'all') params.append('status', filterStatus)
      if (filterCinsiyet !== 'all') params.append('cinsiyet', filterCinsiyet)

      const response = await fetch(`/api/ureticiler?${params.toString()}`)
      if (response.ok) {
        const data = await response.json()
        setUreticiler(data)
      } else {
        console.error('Üretici listesi alınamadı')
      }
    } catch (error) {
      console.error('Üretici listesi hatası:', error)
    } finally {
      setLoading(false)
    }
  }

  const fetchKomisyoncular = async () => {
    try {
      const response = await fetch('/api/komisyoncular?status=AKTIF')
      if (response.ok) {
        const data = await response.json()
        setKomisyoncular(data)
      } else {
        console.error('Komisyoncu listesi alınamadı:', response.status)
      }
    } catch (error) {
      console.error('Komisyoncu listesi hatası:', error)
    }
  }

  useEffect(() => {
    if (status === 'authenticated') {
      fetchUreticiler()
    }
  }, [searchTerm, filterStatus, filterCinsiyet])

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
    
    const localErrors: any[] = []
    if (!formData.komisyoncuId) localErrors.push({ field: 'Komisyoncu', message: 'Komisyoncu seçimi zorunludur', type: 'error' })
    if (!formData.ad || !formData.soyad) localErrors.push({ field: 'Ad Soyad', message: 'Ad ve soyad alanları zorunludur', type: 'error' })
    if (!formData.sehir) localErrors.push({ field: 'Şehir', message: 'Şehir alanı zorunludur', type: 'error' })
    if (!formData.cinsiyet) localErrors.push({ field: 'Cinsiyet', message: 'Cinsiyet seçimi zorunludur', type: 'error' })
    if (localErrors.length) { setErrors(localErrors); return }
    setErrors([])
    
    setSubmitting(true)
    
    try {
      const url = editingUretici 
        ? `/api/ureticiler/${editingUretici.id}`
        : '/api/ureticiler'
      
      const method = editingUretici ? 'PUT' : 'POST'
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setIsDialogOpen(false)
        setEditingUretici(null)
        setFormData({
          ad: '',
          soyad: '',
          tcNo: '',
          dogumTarihi: '',
          iletisim: '',
          sehir: '',
          cinsiyet: '',
          durum: 'AKTIF',
          komisyoncuId: ''
        })
        fetchUreticiler()
        toast({
          title: "Başarılı",
          description: editingUretici ? "Üretici başarıyla güncellendi" : "Üretici başarıyla oluşturuldu",
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
      console.error('Üretici kaydetme hatası:', error)
      toast({
        title: "Hata",
        description: "Bir hata oluştu",
        variant: "destructive",
      })
    } finally {
      setSubmitting(false)
    }
  }

  const handleEdit = (uretici: Uretici) => {
    setEditingUretici(uretici)
    setFormData({
      ad: uretici.ad,
      soyad: uretici.soyad,
      tcNo: uretici.tcNo || '',
      dogumTarihi: uretici.dogumTarihi ? uretici.dogumTarihi.split('T')[0] : '',
      iletisim: uretici.iletisim || '',
      sehir: uretici.sehir,
      cinsiyet: uretici.cinsiyet,
      durum: uretici.durum,
      komisyoncuId: uretici.komisyoncuId || ''
    })
    setIsDialogOpen(true)
  }

  const handleDelete = async (ureticiId: string) => {
    if (confirm('Bu üreticiyi silmek istediğinizden emin misiniz?')) {
      try {
        const response = await fetch(`/api/ureticiler/${ureticiId}`, {
          method: 'DELETE',
        })

        if (response.ok) {
          fetchUreticiler()
          toast({
            title: "Başarılı",
            description: "Üretici başarıyla silindi",
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
        console.error('Üretici silme hatası:', error)
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

  const getCinsiyetColor = (cinsiyet: string) => {
    return cinsiyet === 'ERKEK' 
      ? 'bg-blue-100 text-blue-800' 
      : 'bg-pink-100 text-pink-800'
  }

  return (
    <DashboardLayout>
      <div className="p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Üretici Yönetimi</h1>
            <p className="text-muted-foreground">Üretici bilgilerini yönetin</p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Yeni Üretici
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>
                  {editingUretici ? 'Üretici Düzenle' : 'Yeni Üretici Ekle'}
                </DialogTitle>
                <DialogDescription>
                  {editingUretici ? 'Üretici bilgilerini güncelleyin' : 'Yeni üretici bilgilerini girin'}
                </DialogDescription>
              </DialogHeader>
              {errors.length > 0 && (
                <div className="mb-4"><FormValidation errors={errors} /></div>
              )}
              <form onSubmit={handleSubmit}>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="ad">Ad *</Label>
                      <Input 
                        id="ad" 
                        value={formData.ad} 
                        onChange={(e) => setFormData({...formData, ad: e.target.value})} 
                        required 
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="soyad">Soyad *</Label>
                      <Input 
                        id="soyad" 
                        value={formData.soyad} 
                        onChange={(e) => setFormData({...formData, soyad: e.target.value})} 
                        required 
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="tcNo">T.C. Kimlik No</Label>
                      <Input 
                        id="tcNo" 
                        value={formData.tcNo} 
                        onChange={(e) => setFormData({...formData, tcNo: e.target.value})} 
                        maxLength={11}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="dogumTarihi">Doğum Tarihi</Label>
                      <Input 
                        id="dogumTarihi" 
                        type="date" 
                        value={formData.dogumTarihi} 
                        onChange={(e) => setFormData({...formData, dogumTarihi: e.target.value})} 
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="iletisim">İletişim</Label>
                      <Input 
                        id="iletisim" 
                        value={formData.iletisim} 
                        onChange={(e) => setFormData({...formData, iletisim: e.target.value})} 
                        placeholder="Telefon numarası"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="sehir">Şehir *</Label>
                      <Input 
                        id="sehir" 
                        value={formData.sehir} 
                        onChange={(e) => setFormData({...formData, sehir: e.target.value})} 
                        required 
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="cinsiyet">Cinsiyet *</Label>
                      <Select 
                        value={formData.cinsiyet} 
                        onValueChange={(value) => setFormData({...formData, cinsiyet: value})}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Cinsiyet seçin" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="ERKEK">Erkek</SelectItem>
                          <SelectItem value="KADIN">Kadın</SelectItem>
                        </SelectContent>
                      </Select>
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

                  <div className="space-y-2">
                    <Label htmlFor="komisyoncuId">Komisyoncu *</Label>
                    <Select
                      value={formData.komisyoncuId}
                      onValueChange={(value) => setFormData({...formData, komisyoncuId: value})}
                      required
                    >
                      <SelectTrigger>
                        <SelectValue placeholder={komisyoncular.length === 0 ? "Yükleniyor..." : "Komisyoncu seçin"} />
                      </SelectTrigger>
                      <SelectContent>
                        {komisyoncular.length === 0 ? (
                          <SelectItem value="no-komisyoncu" disabled>
                            Komisyoncu bulunamadı
                          </SelectItem>
                        ) : (
                          komisyoncular.map((komisyoncu) => (
                            <SelectItem key={komisyoncu.id} value={komisyoncu.id}>
                              {komisyoncu.dukkanAdi} - {komisyoncu.sehir}
                            </SelectItem>
                          ))
                        )}
                      </SelectContent>
                    </Select>
                    <p className="text-xs text-muted-foreground">
                      * Üreticiler mutlaka bir komisyoncuya bağlı olmalıdır.
                    </p>
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
                        {editingUretici ? 'Güncelleniyor...' : 'Oluşturuluyor...'}
                      </>
                    ) : (
                      editingUretici ? 'Güncelle' : 'Oluştur'
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
                  <p className="text-sm text-muted-foreground">Toplam Üretici</p>
                  <p className="text-2xl font-bold">{ureticiler.length}</p>
                </div>
                <Users className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Aktif Üretici</p>
                  <p className="text-2xl font-bold text-green-500">
                    {ureticiler.filter(u => u.durum === 'AKTIF').length}
                  </p>
                </div>
                <User className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Erkek</p>
                  <p className="text-2xl font-bold text-blue-500">
                    {ureticiler.filter(u => u.cinsiyet === 'ERKEK').length}
                  </p>
                </div>
                <User className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Kadın</p>
                  <p className="text-2xl font-bold text-pink-500">
                    {ureticiler.filter(u => u.cinsiyet === 'KADIN').length}
                  </p>
                </div>
                <User className="h-8 w-8 text-pink-500" />
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
                  placeholder="Ad, soyad, T.C. no veya şehir ara..."
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
                  value={filterCinsiyet}
                  onChange={(e) => setFilterCinsiyet(e.target.value)}
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                >
                  <option value="all">Tüm Cinsiyetler</option>
                  <option value="ERKEK">Erkek</option>
                  <option value="KADIN">Kadın</option>
                </select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Üreticiler Table */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Üretici Listesi
            </CardTitle>
            <CardDescription>Toplam {ureticiler.length} üretici</CardDescription>
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
                      <th className="text-left py-3 px-2 font-medium">Ad Soyad</th>
                      <th className="text-left py-3 px-2 font-medium">T.C. No</th>
                      <th className="text-left py-3 px-2 font-medium">İletişim</th>
                      <th className="text-left py-3 px-2 font-medium">Şehir</th>
                      <th className="text-left py-3 px-2 font-medium">Cinsiyet</th>
                      <th className="text-left py-3 px-2 font-medium">Komisyoncu</th>
                      <th className="text-left py-3 px-2 font-medium">Durum</th>
                      <th className="text-left py-3 px-2 font-medium">Kayıt Tarihi</th>
                      <th className="text-left py-3 px-2 font-medium">İşlemler</th>
                    </tr>
                  </thead>
                  <tbody>
                    {ureticiler.map((uretici) => (
                      <tr key={uretici.id} className="border-b hover:bg-muted/50">
                        <td className="py-3 px-2 font-medium">
                          {uretici.ad} {uretici.soyad}
                        </td>
                        <td className="py-3 px-2 text-sm">
                          {uretici.tcNo || '-'}
                        </td>
                        <td className="py-3 px-2">
                          {uretici.iletisim ? (
                            <div className="flex items-center gap-2">
                              <Phone className="h-3 w-3 text-muted-foreground" />
                              {uretici.iletisim}
                            </div>
                          ) : '-'}
                        </td>
                        <td className="py-3 px-2">
                          <div className="flex items-center gap-2">
                            <MapPin className="h-3 w-3 text-muted-foreground" />
                            {uretici.sehir}
                          </div>
                        </td>
                        <td className="py-3 px-2">
                          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getCinsiyetColor(uretici.cinsiyet)}`}>
                            {uretici.cinsiyet === 'ERKEK' ? 'Erkek' : 'Kadın'}
                          </span>
                        </td>
                        <td className="py-3 px-2">
                          {uretici.komisyoncu?.dukkanAdi || 'Bağımsız'}
                        </td>
                        <td className="py-3 px-2">
                          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(uretici.durum)}`}>
                            {uretici.durum === 'AKTIF' ? 'Aktif' : 'Pasif'}
                          </span>
                        </td>
                        <td className="py-3 px-2 text-sm text-muted-foreground">
                          {new Date(uretici.createdAt).toLocaleDateString('tr-TR')}
                        </td>
                        <td className="py-3 px-2">
                          <div className="flex items-center gap-1">
                            <Button variant="ghost" size="sm" onClick={() => handleEdit(uretici)}>
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm" onClick={() => handleDelete(uretici.id)}>
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
