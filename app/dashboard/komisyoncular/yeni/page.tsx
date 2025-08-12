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
  User,
  Phone,
  MapPin,
  Hash,
  Users,
  Loader2
} from 'lucide-react'
import { DashboardLayout } from '@/components/layout/dashboard-layout'
import { useToast } from '@/components/ui/use-toast'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import Link from 'next/link'

export default function YeniKomisyoncu() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    vkn: '',
    komisyonNo: '',
    komisyonKodu: '',
    dukkanAdi: '',
    yetkiliAdi: '',
    yetkiliTelefon: '',
    sehir: '',
    durum: 'AKTIF'
  })

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validation
    if (!formData.dukkanAdi || !formData.komisyonNo || !formData.komisyonKodu || !formData.sehir) {
      toast({
        title: "Hata",
        description: "Lütfen zorunlu alanları doldurun",
        variant: "destructive",
      })
      return
    }
    
    setLoading(true)
    
    try {
      const response = await fetch('/api/komisyoncular', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        toast({
          title: "Başarılı",
          description: "Komisyoncu başarıyla oluşturuldu!",
          variant: "success",
        })
        router.push('/dashboard/komisyoncular/liste')
      } else {
        const error = await response.json()
        toast({
          title: "Hata",
          description: error.error || 'Komisyoncu oluşturulurken hata oluştu',
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error('Komisyoncu oluşturma hatası:', error)
      toast({
        title: "Hata",
        description: "Komisyoncu oluşturulurken hata oluştu",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  return (
    <DashboardLayout>
      <div className="p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-4">
            <Link href="/dashboard/komisyoncular/liste">
              <Button variant="outline" size="sm">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Geri
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-foreground">Yeni Komisyoncu</h1>
              <p className="text-muted-foreground">Yeni komisyoncu bilgilerini girin</p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Sol Kolon */}
            <div className="space-y-6">
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
                    <Label htmlFor="komisyonNo">Komisyon Numarası *</Label>
                    <Input
                      id="komisyonNo"
                      value={formData.komisyonNo}
                      onChange={(e) => handleInputChange('komisyonNo', e.target.value)}
                      placeholder="KOM001"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="dukkanAdi">Dükkan Adı *</Label>
                    <Input
                      id="dukkanAdi"
                      value={formData.dukkanAdi}
                      onChange={(e) => handleInputChange('dukkanAdi', e.target.value)}
                      placeholder="CİHAN TARIM"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="vkn">VKN (Vergi Numarası)</Label>
                    <Input
                      id="vkn"
                      value={formData.vkn}
                      onChange={(e) => handleInputChange('vkn', e.target.value)}
                      placeholder="1234567890"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* İletişim Bilgileri */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Phone className="h-5 w-5" />
                    İletişim Bilgileri
                  </CardTitle>
                  <CardDescription>Yetkili kişi bilgileri</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="yetkiliAdi">Yetkili Adı</Label>
                    <Input
                      id="yetkiliAdi"
                      value={formData.yetkiliAdi}
                      onChange={(e) => handleInputChange('yetkiliAdi', e.target.value)}
                      placeholder="Cihan Yılmaz"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="yetkiliTelefon">Yetkili Telefon</Label>
                    <Input
                      id="yetkiliTelefon"
                      value={formData.yetkiliTelefon}
                      onChange={(e) => handleInputChange('yetkiliTelefon', e.target.value)}
                      placeholder="0532 123 45 67"
                    />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sağ Kolon */}
            <div className="space-y-6">
              {/* Konum ve Durum */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="h-5 w-5" />
                    Konum ve Durum
                  </CardTitle>
                  <CardDescription>Şehir ve durum bilgileri</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="sehir">Şehir *</Label>
                    <Select value={formData.sehir} onValueChange={(value) => handleInputChange('sehir', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Şehir seçin" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Adana">Adana</SelectItem>
                        <SelectItem value="Adıyaman">Adıyaman</SelectItem>
                        <SelectItem value="Afyonkarahisar">Afyonkarahisar</SelectItem>
                        <SelectItem value="Ağrı">Ağrı</SelectItem>
                        <SelectItem value="Amasya">Amasya</SelectItem>
                        <SelectItem value="Ankara">Ankara</SelectItem>
                        <SelectItem value="Antalya">Antalya</SelectItem>
                        <SelectItem value="Artvin">Artvin</SelectItem>
                        <SelectItem value="Aydın">Aydın</SelectItem>
                        <SelectItem value="Balıkesir">Balıkesir</SelectItem>
                        <SelectItem value="Bilecik">Bilecik</SelectItem>
                        <SelectItem value="Bingöl">Bingöl</SelectItem>
                        <SelectItem value="Bitlis">Bitlis</SelectItem>
                        <SelectItem value="Bolu">Bolu</SelectItem>
                        <SelectItem value="Burdur">Burdur</SelectItem>
                        <SelectItem value="Bursa">Bursa</SelectItem>
                        <SelectItem value="Çanakkale">Çanakkale</SelectItem>
                        <SelectItem value="Çankırı">Çankırı</SelectItem>
                        <SelectItem value="Çorum">Çorum</SelectItem>
                        <SelectItem value="Denizli">Denizli</SelectItem>
                        <SelectItem value="Diyarbakır">Diyarbakır</SelectItem>
                        <SelectItem value="Edirne">Edirne</SelectItem>
                        <SelectItem value="Elazığ">Elazığ</SelectItem>
                        <SelectItem value="Erzincan">Erzincan</SelectItem>
                        <SelectItem value="Erzurum">Erzurum</SelectItem>
                        <SelectItem value="Eskişehir">Eskişehir</SelectItem>
                        <SelectItem value="Gaziantep">Gaziantep</SelectItem>
                        <SelectItem value="Giresun">Giresun</SelectItem>
                        <SelectItem value="Gümüşhane">Gümüşhane</SelectItem>
                        <SelectItem value="Hakkari">Hakkari</SelectItem>
                        <SelectItem value="Hatay">Hatay</SelectItem>
                        <SelectItem value="Isparta">Isparta</SelectItem>
                        <SelectItem value="Mersin">Mersin</SelectItem>
                        <SelectItem value="İstanbul">İstanbul</SelectItem>
                        <SelectItem value="İzmir">İzmir</SelectItem>
                        <SelectItem value="Kars">Kars</SelectItem>
                        <SelectItem value="Kastamonu">Kastamonu</SelectItem>
                        <SelectItem value="Kayseri">Kayseri</SelectItem>
                        <SelectItem value="Kırklareli">Kırklareli</SelectItem>
                        <SelectItem value="Kırşehir">Kırşehir</SelectItem>
                        <SelectItem value="Kocaeli">Kocaeli</SelectItem>
                        <SelectItem value="Konya">Konya</SelectItem>
                        <SelectItem value="Kütahya">Kütahya</SelectItem>
                        <SelectItem value="Malatya">Malatya</SelectItem>
                        <SelectItem value="Manisa">Manisa</SelectItem>
                        <SelectItem value="Kahramanmaraş">Kahramanmaraş</SelectItem>
                        <SelectItem value="Mardin">Mardin</SelectItem>
                        <SelectItem value="Muğla">Muğla</SelectItem>
                        <SelectItem value="Muş">Muş</SelectItem>
                        <SelectItem value="Nevşehir">Nevşehir</SelectItem>
                        <SelectItem value="Niğde">Niğde</SelectItem>
                        <SelectItem value="Ordu">Ordu</SelectItem>
                        <SelectItem value="Rize">Rize</SelectItem>
                        <SelectItem value="Sakarya">Sakarya</SelectItem>
                        <SelectItem value="Samsun">Samsun</SelectItem>
                        <SelectItem value="Siirt">Siirt</SelectItem>
                        <SelectItem value="Sinop">Sinop</SelectItem>
                        <SelectItem value="Sivas">Sivas</SelectItem>
                        <SelectItem value="Tekirdağ">Tekirdağ</SelectItem>
                        <SelectItem value="Tokat">Tokat</SelectItem>
                        <SelectItem value="Trabzon">Trabzon</SelectItem>
                        <SelectItem value="Tunceli">Tunceli</SelectItem>
                        <SelectItem value="Şanlıurfa">Şanlıurfa</SelectItem>
                        <SelectItem value="Uşak">Uşak</SelectItem>
                        <SelectItem value="Van">Van</SelectItem>
                        <SelectItem value="Yozgat">Yozgat</SelectItem>
                        <SelectItem value="Zonguldak">Zonguldak</SelectItem>
                        <SelectItem value="Aksaray">Aksaray</SelectItem>
                        <SelectItem value="Bayburt">Bayburt</SelectItem>
                        <SelectItem value="Karaman">Karaman</SelectItem>
                        <SelectItem value="Kırıkkale">Kırıkkale</SelectItem>
                        <SelectItem value="Batman">Batman</SelectItem>
                        <SelectItem value="Şırnak">Şırnak</SelectItem>
                        <SelectItem value="Bartın">Bartın</SelectItem>
                        <SelectItem value="Ardahan">Ardahan</SelectItem>
                        <SelectItem value="Iğdır">Iğdır</SelectItem>
                        <SelectItem value="Yalova">Yalova</SelectItem>
                        <SelectItem value="Karabük">Karabük</SelectItem>
                        <SelectItem value="Kilis">Kilis</SelectItem>
                        <SelectItem value="Osmaniye">Osmaniye</SelectItem>
                        <SelectItem value="Düzce">Düzce</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="durum">Durum</Label>
                    <Select value={formData.durum} onValueChange={(value) => handleInputChange('durum', value)}>
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
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-4 mt-6">
            <Link href="/dashboard/komisyoncular/liste">
              <Button type="button" variant="outline">
                İptal
              </Button>
            </Link>
            <Button type="submit" disabled={loading}>
              {loading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Save className="mr-2 h-4 w-4" />
              )}
              {loading ? "Kaydediliyor..." : "Kaydet"}
            </Button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  )
}
