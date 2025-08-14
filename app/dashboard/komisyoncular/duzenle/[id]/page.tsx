'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { 
  Save, 
  ArrowLeft,
  Building2,
  Loader2
} from 'lucide-react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useToast } from '@/components/ui/use-toast'
import Link from 'next/link'

interface Komisyoncu {
  id: string
  dukkanAdi: string
  sehir: string
  komisyonNo: string
  komisyonKodu: string
  durum: 'AKTIF' | 'PASIF'
  vkn?: string
  yetkiliAdi?: string
  yetkiliTelefon?: string
  createdAt: string
  updatedAt: string
}

export default function KomisyoncuDuzenle({ params }: { params: { id: string } }) {
  const { data: session, status } = useSession()
  const router = useRouter()
  const { toast } = useToast()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [komisyoncu, setKomisyoncu] = useState<Komisyoncu | null>(null)
  const [formData, setFormData] = useState({
    dukkanAdi: '',
    sehir: '',
    komisyonNo: '',
    vkn: '',
    yetkiliAdi: '',
    yetkiliTelefon: '',
    durum: 'AKTIF' as const
  })

  // Komisyoncu verilerini getir
  const fetchKomisyoncu = async () => {
    try {
      const response = await fetch(`/api/komisyoncular/${params.id}`)
      if (response.ok) {
        const data = await response.json()
        setKomisyoncu(data)
        setFormData({
          dukkanAdi: data.dukkanAdi || '',
          sehir: data.sehir || '',
          komisyonNo: data.komisyonNo || '',
          vkn: data.vkn || '',
          yetkiliAdi: data.yetkiliAdi || '',
          yetkiliTelefon: data.yetkiliTelefon || '',
          durum: data.durum || 'AKTIF'
        })
      } else {
        toast({
          title: "Hata",
          description: "Komisyoncu bulunamadı",
          variant: "destructive"
        })
        router.push('/dashboard/komisyoncular/liste')
      }
    } catch (error) {
      console.error('Komisyoncu getirilemedi:', error)
      toast({
        title: "Hata",
        description: "Komisyoncu yüklenirken hata oluştu",
        variant: "destructive"
      })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login')
    } else if (status === 'authenticated') {
      fetchKomisyoncu()
    }
  }, [status, router, params.id])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)

    try {
      const response = await fetch(`/api/komisyoncular/${params.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      })

      if (response.ok) {
        toast({
          title: "Başarılı",
          description: "Komisyoncu başarıyla güncellendi"
        })
        router.push('/dashboard/komisyoncular/liste')
      } else {
        const error = await response.json()
        toast({
          title: "Hata",
          description: error.error || "Komisyoncu güncellenirken hata oluştu",
          variant: "destructive"
        })
      }
    } catch (error) {
      console.error('Güncelleme hatası:', error)
      toast({
        title: "Hata",
        description: "Komisyoncu güncellenirken hata oluştu",
        variant: "destructive"
      })
    } finally {
      setSaving(false)
    }
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

  if (!komisyoncu) {
    return (
      
        <div className="p-6">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-foreground">Komisyoncu Bulunamadı</h1>
            <p className="text-muted-foreground mt-2">Aradığınız komisyoncu bulunamadı.</p>
            <Link href="/dashboard/komisyoncular/liste">
              <Button className="mt-4">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Geri Dön
              </Button>
            </Link>
          </div>
        </div>
      
    )
  }

  return (
    
      <div className="p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-4">
            <Link href="/dashboard/komisyoncular/liste">
              <Button variant="outline" size="sm">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Geri Dön
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-foreground">Komisyoncu Düzenle</h1>
              <p className="text-muted-foreground">
                Komisyoncu bilgilerini düzenleyin
              </p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Temel Bilgiler */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building2 className="h-5 w-5" />
                  Temel Bilgiler
                </CardTitle>
                <CardDescription>Komisyoncu temel bilgileri</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="dukkanAdi">Dükkan Adı *</Label>
                  <Input
                    id="dukkanAdi"
                    value={formData.dukkanAdi}
                    onChange={(e) => setFormData({...formData, dukkanAdi: e.target.value})}
                    required
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

                <div className="space-y-2">
                  <Label htmlFor="komisyonNo">Komisyon No *</Label>
                  <Input
                    id="komisyonNo"
                    value={formData.komisyonNo}
                    onChange={(e) => setFormData({...formData, komisyonNo: e.target.value})}
                    placeholder="Örn: 109"
                    required
                  />
                </div>

                
              </CardContent>
            </Card>

            {/* İletişim Bilgileri */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building2 className="h-5 w-5" />
                  İletişim Bilgileri
                </CardTitle>
                <CardDescription>Vergi ve iletişim bilgileri</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="vkn">VKN</Label>
                  <Input
                    id="vkn"
                    value={formData.vkn}
                    onChange={(e) => setFormData({...formData, vkn: e.target.value})}
                    placeholder="Vergi Kimlik Numarası"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="yetkiliAdi">Yetkili Adı</Label>
                  <Input
                    id="yetkiliAdi"
                    value={formData.yetkiliAdi}
                    onChange={(e) => setFormData({...formData, yetkiliAdi: e.target.value})}
                    placeholder="Yetkili kişi adı"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="yetkiliTelefon">Yetkili Telefon</Label>
                  <Input
                    id="yetkiliTelefon"
                    value={formData.yetkiliTelefon}
                    onChange={(e) => setFormData({...formData, yetkiliTelefon: e.target.value})}
                    placeholder="Yetkili kişi telefonu"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="durum">Durum</Label>
                  <Select value={formData.durum} onValueChange={(value: 'AKTIF' | 'PASIF') => setFormData({...formData, durum: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="AKTIF">Aktif</SelectItem>
                      <SelectItem value="PASIF">Pasif</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Form Actions */}
          <div className="flex justify-end gap-4 mt-8">
            <Link href="/dashboard/komisyoncular/liste">
              <Button type="button" variant="outline">
                İptal
              </Button>
            </Link>
            <Button type="submit" disabled={saving}>
              {saving ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Kaydediliyor...
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  Kaydet
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    
  )
}
