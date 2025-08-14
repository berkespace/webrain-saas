'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  Users,
  Building2,
  Phone,
  MapPin,
  AlertTriangle
} from 'lucide-react'

import Link from 'next/link'
import { useToast } from '@/components/ui/use-toast'

interface Komisyoncu {
  id: string
  vkn: string | null
  komisyonNo: string
  komisyonKodu: string
  dukkanAdi: string
  yetkiliAdi: string | null
  yetkiliTelefon: string | null
  sehir: string
  durum: 'AKTIF' | 'PASIF'
  createdAt: string
  updatedAt: string
}

export default function KomisyoncuListesi() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState('')
  const [komisyoncular, setKomisyoncular] = useState<Komisyoncu[]>([])
  const [filteredKomisyoncular, setFilteredKomisyoncular] = useState<Komisyoncu[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isDeleting, setIsDeleting] = useState<string | null>(null)
  const { toast } = useToast()

  // Komisyoncuları getir
  const fetchKomisyoncular = async () => {
    try {
      const response = await fetch('/api/komisyoncular')
      if (response.ok) {
        const data = await response.json()
        setKomisyoncular(data)
        setFilteredKomisyoncular(data)
      } else {
        toast({
          title: "Hata",
          description: "Komisyoncular yüklenirken hata oluştu",
          variant: "destructive"
        })
      }
    } catch (error) {
      console.error('Komisyoncular getirilemedi:', error)
      toast({
        title: "Hata",
        description: "Komisyoncular yüklenirken hata oluştu",
        variant: "destructive"
      })
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login')
    } else if (status === 'authenticated') {
      fetchKomisyoncular()
    }
  }, [status, router])

  // Arama filtreleme
  useEffect(() => {
    if (searchTerm) {
      const filtered = komisyoncular.filter(komisyoncu =>
        komisyoncu.dukkanAdi.toLowerCase().includes(searchTerm.toLowerCase()) ||
        komisyoncu.komisyonNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        komisyoncu.komisyonKodu.toLowerCase().includes(searchTerm.toLowerCase()) ||
        komisyoncu.sehir.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (komisyoncu.yetkiliAdi && komisyoncu.yetkiliAdi.toLowerCase().includes(searchTerm.toLowerCase()))
      )
      setFilteredKomisyoncular(filtered)
    } else {
      setFilteredKomisyoncular(komisyoncular)
    }
  }, [searchTerm, komisyoncular])

  if (status === 'loading' || isLoading) {
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



  const handleDelete = async (id: string) => {
    if (!confirm('Bu komisyoncuyu silmek istediğinizden emin misiniz?')) return

    setIsDeleting(id)
    try {
      const response = await fetch(`/api/komisyoncular/${id}`, {
        method: 'DELETE'
      })

      if (response.ok) {
        toast({
          title: "Başarılı",
          description: "Komisyoncu başarıyla silindi"
        })
        fetchKomisyoncular()
      } else {
        const error = await response.json()
        if (error.details) {
          toast({
            title: "Silinemez",
            description: error.details,
            variant: "destructive"
          })
        } else {
          toast({
            title: "Hata",
            description: error.error || "Komisyoncu silinirken hata oluştu",
            variant: "destructive"
          })
        }
      }
    } catch (error) {
      toast({
        title: "Hata",
        description: "Komisyoncu silinirken hata oluştu",
        variant: "destructive"
      })
    } finally {
      setIsDeleting(null)
    }
  }

  return (
    
      <div className="p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Komisyoncu Yönetimi</h1>
            <p className="text-muted-foreground">Komisyoncu listesi ve yönetimi</p>
          </div>
          <Link href="/dashboard/komisyoncular/yeni">
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Yeni Komisyoncu
            </Button>
          </Link>
        </div>

        {/* Search */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Komisyoncu ara..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardContent>
        </Card>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Toplam Komisyoncu</p>
                  <p className="text-2xl font-bold">{komisyoncular.length}</p>
                </div>
                <Building2 className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Aktif Komisyoncu</p>
                  <p className="text-2xl font-bold text-green-500">
                    {komisyoncular.filter(k => k.durum === 'AKTIF').length}
                  </p>
                </div>
                <Users className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Pasif Komisyoncu</p>
                  <p className="text-2xl font-bold text-red-500">
                    {komisyoncular.filter(k => k.durum === 'PASIF').length}
                  </p>
                </div>
                <Users className="h-8 w-8 text-red-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Komisyoncular Table */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building2 className="h-5 w-5" />
              Komisyoncu Listesi
            </CardTitle>
            <CardDescription>Toplam {filteredKomisyoncular.length} komisyoncu</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b bg-muted/50">
                    <th className="text-left py-3 px-2 font-medium">Komisyon No</th>
                    <th className="text-left py-3 px-2 font-medium">
                      <div className="flex items-center gap-2">
                        Komisyon Kodu
                        <span className="text-xs text-muted-foreground font-normal">(Otomatik)</span>
                      </div>
                    </th>
                    <th className="text-left py-3 px-2 font-medium">Dükkan Adı</th>
                    <th className="text-left py-3 px-2 font-medium">Yetkili</th>
                    <th className="text-left py-3 px-2 font-medium">Telefon</th>
                    <th className="text-left py-3 px-2 font-medium">Şehir</th>
                    <th className="text-left py-3 px-2 font-medium">VKN</th>
                    <th className="text-left py-3 px-2 font-medium">Durum</th>
                    <th className="text-left py-3 px-2 font-medium">İşlemler</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredKomisyoncular.map((komisyoncu) => (
                    <tr key={komisyoncu.id} className="border-b hover:bg-muted/50">
                      <td className="py-3 px-2 font-medium">{komisyoncu.komisyonNo}</td>
                      <td className="py-3 px-2">
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded text-sm">
                            {komisyoncu.komisyonKodu}
                          </span>
                          <span className="text-xs text-muted-foreground">(Otomatik)</span>
                        </div>
                      </td>
                      <td className="py-3 px-2">{komisyoncu.dukkanAdi}</td>
                      <td className="py-3 px-2">{komisyoncu.yetkiliAdi || '-'}</td>
                      <td className="py-3 px-2">
                        {komisyoncu.yetkiliTelefon ? (
                          <div className="flex items-center gap-1">
                            <Phone className="h-3 w-3 text-muted-foreground" />
                            {komisyoncu.yetkiliTelefon}
                          </div>
                        ) : '-'}
                      </td>
                      <td className="py-3 px-2">
                        <div className="flex items-center gap-1">
                          <MapPin className="h-3 w-3 text-muted-foreground" />
                          {komisyoncu.sehir}
                        </div>
                      </td>
                      <td className="py-3 px-2">{komisyoncu.vkn || '-'}</td>
                      <td className="py-3 px-2">
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                          komisyoncu.durum === 'AKTIF' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {komisyoncu.durum === 'AKTIF' ? 'Aktif' : 'Pasif'}
                        </span>
                      </td>
                      <td className="py-3 px-2">
                        <div className="flex items-center gap-1">
                          <Link href={`/dashboard/komisyoncular/duzenle/${komisyoncu.id}`}>
                            <Button variant="ghost" size="sm">
                              <Edit className="h-4 w-4" />
                            </Button>
                          </Link>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={() => handleDelete(komisyoncu.id)}
                            disabled={isDeleting === komisyoncu.id}
                          >
                            {isDeleting === komisyoncu.id ? (
                              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
                            ) : (
                              <Trash2 className="h-4 w-4" />
                            )}
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
    
  )
}
