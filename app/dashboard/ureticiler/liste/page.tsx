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
  MapPin,
  Phone,
  Loader2
} from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
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
import { FormValidation } from '@/components/ui/form-validation'

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
      const response = await fetch('/api/ureticiler')
      if (response.ok) {
        const data = await response.json()
        setUreticiler(data)
      } else {
        toast({
          title: "Hata",
          description: "Üreticiler yüklenirken hata oluştu",
          variant: "destructive"
        })
      }
    } catch (error) {
      console.error('Üreticiler getirilemedi:', error)
      toast({
        title: "Hata",
        description: "Üreticiler yüklenirken hata oluştu",
        variant: "destructive"
      })
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
      }
    } catch (error) {
      console.error('Komisyoncular getirilemedi:', error)
    }
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
    if (!confirm('Bu üreticiyi silmek istediğinizden emin misiniz?')) return
    
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
        toast({
          title: "Hata",
          description: "Üretici silinirken hata oluştu",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error('Üretici silme hatası:', error)
      toast({
        title: "Hata",
        description: "Bir hata oluştu",
        variant: "destructive",
      })
    }
  }

  const getStatusColor = (durum: string) => {
    return durum === 'AKTIF' 
      ? 'bg-green-100 text-green-800' 
      : 'bg-red-100 text-red-800'
  }

  const getCinsiyetColor = (cinsiyet: string) => {
    return cinsiyet === 'ERKEK' 
      ? 'bg-blue-100 text-blue-800' 
      : 'bg-pink-100 text-pink-800'
  }

  if (status === 'loading' || loading) {
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

  const filteredUreticiler = ureticiler.filter(uretici => {
    const matchesSearch = searchTerm === '' || 
      uretici.ad.toLowerCase().includes(searchTerm.toLowerCase()) ||
      uretici.soyad.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (uretici.tcNo && uretici.tcNo.includes(searchTerm)) ||
      uretici.sehir.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesStatus = filterStatus === 'all' || uretici.durum === filterStatus
    const matchesCinsiyet = filterCinsiyet === 'all' || uretici.cinsiyet === filterCinsiyet
    
    return matchesSearch && matchesStatus && matchesCinsiyet
  })

  return (
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
                    <Select value={formData.cinsiyet} onValueChange={(value) => setFormData({...formData, cinsiyet: value})}>
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
                    <Label htmlFor="komisyoncuId">Komisyoncu *</Label>
                    <Select value={formData.komisyoncuId} onValueChange={(value) => setFormData({...formData, komisyoncuId: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Komisyoncu seçin" />
                      </SelectTrigger>
                      <SelectContent>
                        {komisyoncular.map((komisyoncu) => (
                          <SelectItem key={komisyoncu.id} value={komisyoncu.id}>
                            {komisyoncu.dukkanAdi} - {komisyoncu.sehir}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  İptal
                </Button>
                <Button type="submit" disabled={submitting}>
                  {submitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Kaydediliyor...
                    </>
                  ) : (
                    editingUretici ? 'Güncelle' : 'Kaydet'
                  )}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div>
          <Input
            placeholder="Ara..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full"
          />
        </div>
        <div>
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger>
              <SelectValue placeholder="Durum" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tümü</SelectItem>
              <SelectItem value="AKTIF">Aktif</SelectItem>
              <SelectItem value="PASIF">Pasif</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Select value={filterCinsiyet} onValueChange={setFilterCinsiyet}>
            <SelectTrigger>
              <SelectValue placeholder="Cinsiyet" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tümü</SelectItem>
              <SelectItem value="ERKEK">Erkek</SelectItem>
              <SelectItem value="KADIN">Kadın</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="text-right">
          <span className="text-sm text-muted-foreground">
            Toplam: {filteredUreticiler.length} üretici
          </span>
        </div>
      </div>

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
                  {filteredUreticiler.map((uretici) => (
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
  )
}
