'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
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
  vergiDairesi: string
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
    vergiDairesi: '',
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
    
    if (!formData.firmaAdi || !formData.vkn || !formData.vergiDairesi || !formData.yetkiliAdi) {
      toast({
        title: "Hata",
        description: "Firma adı, VKN, vergi dairesi ve yetkili adı zorunludur",
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
                  <Label htmlFor="vergiDairesi">Vergi Dairesi *</Label>
                  <Input
                    id="vergiDairesi"
                    value={formData.vergiDairesi}
                    onChange={(e) => setFormData({...formData, vergiDairesi: e.target.value})}
                    placeholder="Vergi dairesi adı"
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
                  <Label htmlFor="sehir">Şehir *</Label>
                  <Select value={formData.sehir} onValueChange={(value) => setFormData({...formData, sehir: value})}>
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
    
  )
}
