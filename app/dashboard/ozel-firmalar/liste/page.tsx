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
  Building,
  Eye,
  MapPin,
  Phone,
  User,
  Loader2
} from 'lucide-react'
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

interface OzelFirma {
  id: string
  firmaAdi: string
  vkn?: string
  vergiDairesi?: string
  yetkiliAdi?: string
  yetkiliTelefon?: string
  sehir: string
  adres?: string
  durum: 'AKTIF' | 'PASIF'
  createdAt: string
  updatedAt: string
}

export default function OzelFirmaListesi() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const { toast } = useToast()
  const [ozelFirmalar, setOzelFirmalar] = useState<OzelFirma[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingFirma, setEditingFirma] = useState<OzelFirma | null>(null)
  const [formData, setFormData] = useState({
    firmaAdi: '',
    vkn: '',
    vergiDairesi: '',
    yetkiliAdi: '',
    yetkiliTelefon: '',
    sehir: '',
    adres: '',
    durum: 'AKTIF' as 'AKTIF' | 'PASIF'
  })
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login')
    } else if (status === 'authenticated') {
      fetchOzelFirmalar()
    }
  }, [status, router])

  const fetchOzelFirmalar = async () => {
    try {
      setLoading(true)
      const params = new URLSearchParams()
      if (searchTerm) params.append('search', searchTerm)
      if (filterStatus !== 'all') params.append('status', filterStatus)

      const response = await fetch(`/api/ozel-firmalar?${params.toString()}`)
      if (response.ok) {
        const data = await response.json()
        setOzelFirmalar(data)
      } else {
        console.error('Özel firma listesi alınamadı')
      }
    } catch (error) {
      console.error('Özel firma listesi hatası:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (status === 'authenticated') {
      fetchOzelFirmalar()
    }
  }, [searchTerm, filterStatus])

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    
    try {
      const url = editingFirma 
        ? `/api/ozel-firmalar/${editingFirma.id}`
        : '/api/ozel-firmalar'
      
      const method = editingFirma ? 'PUT' : 'POST'
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setIsDialogOpen(false)
        setEditingFirma(null)
        setFormData({
          firmaAdi: '',
          vkn: '',
          yetkiliAdi: '',
          yetkiliTelefon: '',
          sehir: '',
          adres: '',
          durum: 'AKTIF' as 'AKTIF' | 'PASIF'
        })
        fetchOzelFirmalar()
        toast({
          title: "Başarılı",
          description: editingFirma ? "Özel firma başarıyla güncellendi" : "Özel firma başarıyla oluşturuldu",
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
      console.error('Özel firma kaydetme hatası:', error)
      toast({
        title: "Hata",
        description: "Bir hata oluştu",
        variant: "destructive",
      })
    } finally {
      setSubmitting(false)
    }
  }

  const handleEdit = (firma: OzelFirma) => {
    setEditingFirma(firma)
    setFormData({
      firmaAdi: firma.firmaAdi,
      vkn: firma.vkn || '',
      vergiDairesi: firma.vergiDairesi || '',
      yetkiliAdi: firma.yetkiliAdi || '',
      yetkiliTelefon: firma.yetkiliTelefon || '',
      sehir: firma.sehir,
      adres: firma.adres || '',
      durum: firma.durum as 'AKTIF' | 'PASIF'
    })
    setIsDialogOpen(true)
  }

  const handleDelete = async (firmaId: string) => {
    if (confirm('Bu özel firmayı silmek istediğinizden emin misiniz?')) {
      try {
        const response = await fetch(`/api/ozel-firmalar/${firmaId}`, {
          method: 'DELETE',
        })

        if (response.ok) {
          fetchOzelFirmalar()
          toast({
            title: "Başarılı",
            description: "Özel firma başarıyla silindi",
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
        console.error('Özel firma silme hatası:', error)
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

  return (
    
      <div className="p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Özel Firma Yönetimi</h1>
            <p className="text-muted-foreground">Özel firma bilgilerini yönetin</p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Yeni Özel Firma
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>
                  {editingFirma ? 'Özel Firma Düzenle' : 'Yeni Özel Firma Ekle'}
                </DialogTitle>
                <DialogDescription>
                  {editingFirma ? 'Özel firma bilgilerini güncelleyin' : 'Yeni özel firma bilgilerini girin'}
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmit}>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firmaAdi">Firma Adı *</Label>
                      <Input 
                        id="firmaAdi" 
                        value={formData.firmaAdi} 
                        onChange={(e) => setFormData({...formData, firmaAdi: e.target.value})} 
                        required 
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="vkn">VKN</Label>
                      <Input 
                        id="vkn" 
                        value={formData.vkn} 
                        onChange={(e) => setFormData({...formData, vkn: e.target.value})} 
                        placeholder="Vergi kimlik numarası"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="vergiDairesi">Vergi Dairesi</Label>
                      <Input 
                        id="vergiDairesi" 
                        value={formData.vergiDairesi} 
                        onChange={(e) => setFormData({...formData, vergiDairesi: e.target.value})} 
                        placeholder="Vergi dairesi adı"
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="yetkiliAdi">Yetkili Adı</Label>
                      <Input 
                        id="yetkiliAdi" 
                        value={formData.yetkiliAdi} 
                        onChange={(e) => setFormData({...formData, yetkiliAdi: e.target.value})} 
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="yetkiliTelefon">Yetkili Telefon</Label>
                      <Input 
                        id="yetkiliTelefon" 
                        value={formData.yetkiliTelefon} 
                        onChange={(e) => setFormData({...formData, yetkiliTelefon: e.target.value})} 
                        placeholder="Telefon numarası"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="sehir">Şehir *</Label>
                      <Input 
                        id="sehir" 
                        value={formData.sehir} 
                        onChange={(e) => setFormData({...formData, sehir: e.target.value})} 
                        required 
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="durum">Durum</Label>
                      <Select 
                        value={formData.durum} 
                        onValueChange={(value: 'AKTIF' | 'PASIF') => setFormData({...formData, durum: value})}
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
                    <Label htmlFor="adres">Adres</Label>
                    <textarea
                      id="adres"
                      value={formData.adres}
                      onChange={(e) => setFormData({...formData, adres: e.target.value})}
                      placeholder="Firma adresi..."
                      rows={3}
                      className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    />
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
                        {editingFirma ? 'Güncelleniyor...' : 'Oluşturuluyor...'}
                      </>
                    ) : (
                      editingFirma ? 'Güncelle' : 'Oluştur'
                    )}
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Toplam Firma</p>
                  <p className="text-2xl font-bold">{ozelFirmalar.length}</p>
                </div>
                <Building className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Aktif Firma</p>
                  <p className="text-2xl font-bold text-green-500">
                    {ozelFirmalar.filter(f => f.durum === 'AKTIF').length}
                  </p>
                </div>
                <Building className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Pasif Firma</p>
                  <p className="text-2xl font-bold text-red-500">
                    {ozelFirmalar.filter(f => f.durum === 'PASIF').length}
                  </p>
                </div>
                <Building className="h-8 w-8 text-red-500" />
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
                  placeholder="Firma adı, şehir veya VKN ara..."
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
            </div>
          </CardContent>
        </Card>

        {/* Özel Firmalar Table */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building className="h-5 w-5" />
              Özel Firma Listesi
            </CardTitle>
            <CardDescription>Toplam {ozelFirmalar.length} özel firma</CardDescription>
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
                      <th className="text-left py-3 px-2 font-medium">Firma Adı</th>
                      <th className="text-left py-3 px-2 font-medium">VKN</th>
                    <th className="text-left py-3 px-2 font-medium">Vergi Dairesi</th>
                      <th className="text-left py-3 px-2 font-medium">Yetkili</th>
                      <th className="text-left py-3 px-2 font-medium">İletişim</th>
                      <th className="text-left py-3 px-2 font-medium">Şehir</th>
                      <th className="text-left py-3 px-2 font-medium">Durum</th>
                      <th className="text-left py-3 px-2 font-medium">Kayıt Tarihi</th>
                      <th className="text-left py-3 px-2 font-medium">İşlemler</th>
                    </tr>
                  </thead>
                  <tbody>
                    {ozelFirmalar.map((firma) => (
                      <tr key={firma.id} className="border-b hover:bg-muted/50">
                        <td className="py-3 px-2 font-medium">
                          {firma.firmaAdi}
                        </td>
                        <td className="py-3 px-2 text-sm">
                          {firma.vkn || '-'}
                        </td>
                        <td className="py-3 px-2 text-sm">
                          {firma.vergiDairesi || '-'}
                        </td>
                        <td className="py-3 px-2">
                          {firma.yetkiliAdi || '-'}
                        </td>
                        <td className="py-3 px-2">
                          {firma.yetkiliTelefon ? (
                            <div className="flex items-center gap-2">
                              <Phone className="h-3 w-3 text-muted-foreground" />
                              {firma.yetkiliTelefon}
                            </div>
                          ) : '-'}
                        </td>
                        <td className="py-3 px-2">
                          <div className="flex items-center gap-2">
                            <MapPin className="h-3 w-3 text-muted-foreground" />
                            {firma.sehir}
                          </div>
                        </td>
                        <td className="py-3 px-2">
                          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(firma.durum)}`}>
                            {firma.durum === 'AKTIF' ? 'Aktif' : 'Pasif'}
                          </span>
                        </td>
                        <td className="py-3 px-2 text-sm text-muted-foreground">
                          {new Date(firma.createdAt).toLocaleDateString('tr-TR')}
                        </td>
                        <td className="py-3 px-2">
                          <div className="flex items-center gap-1">
                            <Button variant="ghost" size="sm" onClick={() => handleEdit(firma)}>
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm" onClick={() => handleDelete(firma.id)}>
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
