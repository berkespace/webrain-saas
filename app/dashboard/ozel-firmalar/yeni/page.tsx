'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { DashboardLayout } from '@/components/layout/dashboard-layout'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { ArrowLeft, Building, Save } from 'lucide-react'
import Link from 'next/link'
import { useToast } from '@/components/ui/use-toast'

interface OzelFirmaFormData {
  firmaAdi: string
  vkn: string
  yetkiliAdi: string
  yetkiliTelefon: string
  sehir: string
  adres: string
  durum: 'AKTIF' | 'PASIF'
}

export default function YeniOzelFirma() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState<OzelFirmaFormData>({
    firmaAdi: '',
    vkn: '',
    yetkiliAdi: '',
    yetkiliTelefon: '',
    sehir: '',
    adres: '',
    durum: 'AKTIF'
  })

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login')
    }
  }, [status, router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.firmaAdi || !formData.vkn || !formData.yetkiliAdi) {
      toast({
        title: "Hata",
        description: "Firma adı, VKN ve yetkili adı zorunludur",
        variant: "destructive",
      })
      return
    }

    try {
      setLoading(true)
      
      const response = await fetch('/api/ozel-firmalar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        toast({
          title: "Başarılı",
          description: "Özel firma başarıyla oluşturuldu",
          variant: "success",
        })
        router.push('/dashboard/ozel-firmalar/liste')
      } else {
        const error = await response.json()
        toast({
          title: "Hata",
          description: error.error || 'Özel firma oluşturulurken hata oluştu',
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error('Özel firma oluşturma hatası:', error)
      toast({
        title: "Hata",
        description: "Özel firma oluşturulurken hata oluştu",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
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

  return (
    <DashboardLayout>
      <div className="p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-4">
            <Link href="/dashboard/ozel-firmalar">
              <Button variant="outline" size="sm">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Geri
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold">Yeni Özel Firma</h1>
              <p className="text-muted-foreground">Yeni özel firma bilgilerini girin</p>
            </div>
          </div>
        </div>

        {/* Form */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building className="h-5 w-5" />
              Firma Bilgileri
            </CardTitle>
            <CardDescription>Özel firma için gerekli tüm bilgileri doldurun</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="firmaAdi">Firma Adı *</Label>
                  <Input
                    id="firmaAdi"
                    value={formData.firmaAdi}
                    onChange={(e) => setFormData({...formData, firmaAdi: e.target.value})}
                    placeholder="Firma adını girin"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="vkn">VKN *</Label>
                  <Input
                    id="vkn"
                    value={formData.vkn}
                    onChange={(e) => setFormData({...formData, vkn: e.target.value})}
                    placeholder="Vergi kimlik numarası"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="yetkiliAdi">Yetkili Adı *</Label>
                  <Input
                    id="yetkiliAdi"
                    value={formData.yetkiliAdi}
                    onChange={(e) => setFormData({...formData, yetkiliAdi: e.target.value})}
                    placeholder="Yetkili kişi adı"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="yetkiliTelefon">Yetkili Telefon</Label>
                  <Input
                    id="yetkiliTelefon"
                    value={formData.yetkiliTelefon}
                    onChange={(e) => setFormData({...formData, yetkiliTelefon: e.target.value})}
                    placeholder="0555 123 4567"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="sehir">Şehir</Label>
                  <Input
                    id="sehir"
                    value={formData.sehir}
                    onChange={(e) => setFormData({...formData, sehir: e.target.value})}
                    placeholder="Şehir adı"
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
              </div>

              <div className="space-y-2">
                <Label htmlFor="adres">Adres</Label>
                <Textarea
                  id="adres"
                  value={formData.adres}
                  onChange={(e) => setFormData({...formData, adres: e.target.value})}
                  placeholder="Firma adresini girin"
                  rows={3}
                />
              </div>

              <div className="flex justify-end gap-3">
                <Link href="/dashboard/ozel-firmalar/liste">
                  <Button variant="outline" type="button">
                    İptal
                  </Button>
                </Link>
                <Button type="submit" disabled={loading}>
                  {loading ? (
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  ) : (
                    <Save className="mr-2 h-4 w-4" />
                  )}
                  Kaydet
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
