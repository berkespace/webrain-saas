'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Save,
  ArrowLeft,
  User,
  MapPin,
  Phone,
  Calendar,
  Building,
  UserCheck,
  Loader2
} from 'lucide-react'
import { DashboardLayout } from '@/components/layout/dashboard-layout'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import Link from 'next/link'

interface Komisyoncu {
  id: string
  dukkanAdi: string
  sehir: string
}

export default function YeniUretici() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [komisyoncular, setKomisyoncular] = useState<Komisyoncu[]>([])
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    ad: '',
    soyad: '',
    tcNo: '',
    dogumTarihi: '',
    iletisim: '',
    sehir: '',
    cinsiyet: '',
    durum: 'AKTIF',
    komisyoncuId: '',
    notlar: ''
  })

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login')
    } else if (status === 'authenticated') {
      fetchKomisyoncular()
    }
  }, [status, router])

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
    
    // Validation
    if (!formData.komisyoncuId) {
      alert('Komisyoncu seçimi zorunludur')
      return
    }
    
    if (!formData.ad || !formData.soyad) {
      alert('Ad ve soyad alanları zorunludur')
      return
    }
    
    if (!formData.sehir) {
      alert('Şehir alanı zorunludur')
      return
    }
    
    if (!formData.cinsiyet) {
      alert('Cinsiyet seçimi zorunludur')
      return
    }
    
    setLoading(true)
    
    try {
      const response = await fetch('/api/ureticiler', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        // Redirect to list page
        router.push('/dashboard/ureticiler/liste')
      } else {
        const error = await response.json()
        alert(error.error || 'Üretici oluşturulurken hata oluştu')
      }
    } catch (error) {
      console.error('Üretici oluşturma hatası:', error)
      alert('Üretici oluşturulurken hata oluştu')
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  return (
    <DashboardLayout>
      <div className="p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-4">
            <Link href="/dashboard/ureticiler/liste">
              <Button variant="outline" size="sm">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Geri
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-foreground">Yeni Üretici</h1>
              <p className="text-muted-foreground">Yeni üretici bilgilerini girin</p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Sol Kolon */}
            <div className="space-y-6">
              {/* Kişisel Bilgiler */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5" />
                    Kişisel Bilgiler
                  </CardTitle>
                  <CardDescription>Üreticinin kişisel bilgileri</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="ad">Ad *</Label>
                      <Input
                        id="ad"
                        value={formData.ad}
                        onChange={(e) => handleInputChange('ad', e.target.value)}
                        required
                        placeholder="Üretici adı"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="soyad">Soyad *</Label>
                      <Input
                        id="soyad"
                        value={formData.soyad}
                        onChange={(e) => handleInputChange('soyad', e.target.value)}
                        required
                        placeholder="Üretici soyadı"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="tcNo">T.C. Kimlik No</Label>
                      <Input
                        id="tcNo"
                        value={formData.tcNo}
                        onChange={(e) => handleInputChange('tcNo', e.target.value)}
                        maxLength={11}
                        placeholder="12345678901"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="dogumTarihi">Doğum Tarihi</Label>
                      <Input
                        id="dogumTarihi"
                        type="date"
                        value={formData.dogumTarihi}
                        onChange={(e) => handleInputChange('dogumTarihi', e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="cinsiyet">Cinsiyet *</Label>
                      <Select
                        value={formData.cinsiyet}
                        onValueChange={(value) => handleInputChange('cinsiyet', value)}
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
                        onValueChange={(value) => handleInputChange('durum', value)}
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
                </CardContent>
              </Card>

              {/* İletişim Bilgileri */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Phone className="h-5 w-5" />
                    İletişim Bilgileri
                  </CardTitle>
                  <CardDescription>İletişim ve adres bilgileri</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="iletisim">Telefon Numarası</Label>
                    <Input
                      id="iletisim"
                      value={formData.iletisim}
                      onChange={(e) => handleInputChange('iletisim', e.target.value)}
                      placeholder="0555 123 4567"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="sehir">Şehir *</Label>
                    <Input
                      id="sehir"
                      value={formData.sehir}
                      onChange={(e) => handleInputChange('sehir', e.target.value)}
                      required
                      placeholder="Antalya"
                    />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sağ Kolon */}
            <div className="space-y-6">
              {/* Komisyoncu Bilgileri */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Building className="h-5 w-5" />
                    Komisyoncu Bilgileri
                  </CardTitle>
                  <CardDescription>Bağlı olduğu komisyoncu (zorunlu)</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="komisyoncuId">Komisyoncu *</Label>
                    <Select
                      value={formData.komisyoncuId}
                      onValueChange={(value) => handleInputChange('komisyoncuId', value)}
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
                      * Üreticiler mutlaka bir komisyoncuya bağlı olmalıdır. Bağımsız üreticiler için &quot;Müstahsil&quot; modülünü kullanın.
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Ek Bilgiler */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <UserCheck className="h-5 w-5" />
                    Ek Bilgiler
                  </CardTitle>
                  <CardDescription>Ek notlar ve bilgiler</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="notlar">Notlar</Label>
                    <Textarea
                      id="notlar"
                      value={formData.notlar}
                      onChange={(e) => handleInputChange('notlar', e.target.value)}
                      placeholder="Üretici hakkında ek notlar..."
                      rows={4}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Önizleme */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5" />
                    Önizleme
                  </CardTitle>
                  <CardDescription>Girilen bilgilerin önizlemesi</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <span className="font-medium">Ad Soyad:</span>
                      <p className="text-muted-foreground">
                        {formData.ad} {formData.soyad}
                      </p>
                    </div>
                    <div>
                      <span className="font-medium">T.C. No:</span>
                      <p className="text-muted-foreground">
                        {formData.tcNo || 'Belirtilmemiş'}
                      </p>
                    </div>
                    <div>
                      <span className="font-medium">Şehir:</span>
                      <p className="text-muted-foreground">
                        {formData.sehir || 'Belirtilmemiş'}
                      </p>
                    </div>
                    <div>
                      <span className="font-medium">Cinsiyet:</span>
                      <p className="text-muted-foreground">
                        {formData.cinsiyet === 'ERKEK' ? 'Erkek' : formData.cinsiyet === 'KADIN' ? 'Kadın' : 'Belirtilmemiş'}
                      </p>
                    </div>
                    <div>
                      <span className="font-medium">İletişim:</span>
                      <p className="text-muted-foreground">
                        {formData.iletisim || 'Belirtilmemiş'}
                      </p>
                    </div>
                    <div>
                      <span className="font-medium">Komisyoncu:</span>
                      <p className="text-muted-foreground">
                        {formData.komisyoncuId 
                          ? komisyoncular.find(k => k.id === formData.komisyoncuId)?.dukkanAdi 
                          : 'Belirtilmemiş'}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-4 mt-6">
            <Link href="/dashboard/ureticiler/liste">
              <Button type="button" variant="outline">
                İptal
              </Button>
            </Link>
            <Button type="submit" disabled={loading}>
              {loading ? (
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
    </DashboardLayout>
  )
}
