'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowLeft, User, Save } from 'lucide-react'
import { useToast } from '@/components/ui/use-toast'

interface Mustahsil {
  id: string
  ad: string
  soyad: string
  tcKimlikNo: string
  dogumTarihi: string
  mustahsilNo: string
  cinsiyet: string
  iletisim: string
  adres: string
  bankaAdi: string
  ibanAdresi: string
  durum: 'AKTIF' | 'PASIF'
  createdAt: string
  updatedAt: string
}

export default function MustahsilDuzenlePage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [mustahsil, setMustahsil] = useState<Mustahsil | null>(null)

  const [formData, setFormData] = useState({
    ad: '',
    soyad: '',
    tcKimlikNo: '',
    dogumTarihi: '',
    cinsiyet: '',
    iletisim: '',
    adres: '',
    bankaAdi: '',
    ibanAdresi: '',
    durum: 'AKTIF' as 'AKTIF' | 'PASIF'
  })

  // Müstahsil bilgilerini getir
  const fetchMustahsil = async () => {
    try {
      const response = await fetch(`/api/mustahsil/${params.id}`)
      if (response.ok) {
        const data = await response.json()
        setMustahsil(data)
        setFormData({
          ad: data.ad,
          soyad: data.soyad,
          tcKimlikNo: data.tcKimlikNo,
          dogumTarihi: data.dogumTarihi,
          cinsiyet: data.cinsiyet,
          iletisim: data.iletisim || '',
          adres: data.adres || '',
          bankaAdi: data.bankaAdi || '',
          ibanAdresi: data.ibanAdresi || '',
          durum: data.durum
        })
      } else {
        toast({
          title: "Hata",
          description: "Müstahsil bilgileri getirilemedi",
          variant: "destructive"
        })
        router.push('/dashboard/mustahsil')
      }
    } catch (error) {
      console.error('Müstahsil getirme hatası:', error)
      toast({
        title: "Hata",
        description: "Müstahsil bilgileri getirilemedi",
        variant: "destructive"
      })
      router.push('/dashboard/mustahsil')
    }
  }

  useEffect(() => {
    fetchMustahsil()
  }, [params.id])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch(`/api/mustahsil/${params.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        toast({
          title: "Başarılı",
          description: "Müstahsil bilgileri başarıyla güncellendi"
        })
        router.push('/dashboard/mustahsil')
      } else {
        const errorData = await response.json()
        toast({
          title: "Hata",
          description: errorData.error || "Müstahsil güncellenirken hata oluştu",
          variant: "destructive"
        })
      }
    } catch (error) {
      console.error('Müstahsil güncelleme hatası:', error)
      toast({
        title: "Hata",
        description: "Müstahsil güncellenirken hata oluştu",
        variant: "destructive"
      })
    } finally {
      setLoading(false)
    }
  }

  if (!mustahsil) {
    return (
      <div className="p-6">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <User className="h-12 w-12 mx-auto mb-4 animate-pulse text-muted-foreground" />
            <p>Müstahsil bilgileri yükleniyor...</p>
          </div>
        </div>
      </div>
    )
  }

  // Kategori seçenekleri
  const kategoriSecenekleri = [
    { value: 'Sebze', label: 'Sebze' },
    { value: 'Meyve', label: 'Meyve' },
    { value: 'Yeşillik', label: 'Yeşillik' }
  ]

  // Türkiye Bankaları ve Şubeleri
  const bankaSecenekleri = [
    { value: 'ZIRAAT_BANKASI', label: 'Ziraat Bankası' },
    { value: 'IS_BANKASI', label: 'İş Bankası' },
    { value: 'GARANTI_BBVA', label: 'Garanti BBVA' },
    { value: 'AKBANK', label: 'Akbank' },
    { value: 'YAPI_KREDI', label: 'Yapı Kredi Bankası' },
    { value: 'VAKIFBANK', label: 'VakıfBank' },
    { value: 'HALKBANK', label: 'Türkiye Halk Bankası' },
    { value: 'DENIZBANK', label: 'Denizbank' },
    { value: 'ING_BANK', label: 'ING Bank' },
    { value: 'QNB_FINANSBANK', label: 'QNB Finansbank' },
    { value: 'KUVEYT_TURK', label: 'Kuveyt Türk Katılım Bankası' },
    { value: 'ALBARAKA_TURK', label: 'Albaraka Türk Katılım Bankası' },
    { value: 'TURKIYE_FINANS', label: 'Türkiye Finans Katılım Bankası' },
    { value: 'VAKIF_KATILIM', label: 'Vakıf Katılım Bankası' },
    { value: 'ZIRAAT_KATILIM', label: 'Ziraat Katılım Bankası' },
    { value: 'EMLAK_KATILIM', label: 'Emlak Katılım Bankası' },
    { value: 'TURKISH_BANK', label: 'Turkish Bank' },
    { value: 'ADABANK', label: 'Adabank' },
    { value: 'ANADOLUBANK', label: 'Anadolubank' },
    { value: 'BURGAN_BANK', label: 'Burgan Bank' },
    { value: 'CITIBANK', label: 'Citibank' },
    { value: 'DEUTSCHE_BANK', label: 'Deutsche Bank' },
    { value: 'HSBC', label: 'HSBC Bank' },
    { value: 'JP_MORGAN', label: 'JP Morgan Chase Bank' },
    { value: 'MORGAN_STANLEY', label: 'Morgan Stanley Bank' },
    { value: 'NOMURA', label: 'Nomura Bank' },
    { value: 'PROCREDIT_BANK', label: 'ProCredit Bank' },
    { value: 'RABOBANK', label: 'Rabobank' },
    { value: 'SHINHAN_BANK', label: 'Shinhan Bank' },
    { value: 'SOCIETE_GENERALE', label: 'Société Générale' },
    { value: 'STANDARD_CHARTERED', label: 'Standard Chartered Bank' },
    { value: 'UBS', label: 'UBS Bank' },
    { value: 'WESTPAC', label: 'Westpac Bank' }
  ]

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <Link href="/dashboard/mustahsil">
          <Button variant="outline" size="sm" className="w-full sm:w-auto">
            <ArrowLeft className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">Geri</span>
            <span className="sm:hidden">←</span>
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold">Müstahsil Düzenle</h1>
          <p className="text-sm lg:text-base text-muted-foreground">
            Müstahsil bilgilerini güncelleyin
          </p>
        </div>
      </div>

      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-lg lg:text-xl">Müstahsil Bilgileri</CardTitle>
          <div className="text-sm text-muted-foreground">
            Müstahsil No: <span className="font-mono">{mustahsil.mustahsilNo}</span>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Ad */}
              <div>
                <Label htmlFor="ad">Ad *</Label>
                <Input
                  id="ad"
                  value={formData.ad}
                  onChange={(e) => setFormData({...formData, ad: e.target.value})}
                  placeholder="Ad"
                  required
                  className="mt-1"
                />
              </div>

              {/* Soyad */}
              <div>
                <Label htmlFor="soyad">Soyad *</Label>
                <Input
                  id="soyad"
                  value={formData.soyad}
                  onChange={(e) => setFormData({...formData, soyad: e.target.value})}
                  placeholder="Soyad"
                  required
                  className="mt-1"
                />
              </div>

              {/* TC Kimlik No */}
              <div>
                <Label htmlFor="tcKimlikNo">TC Kimlik No *</Label>
                <Input
                  id="tcKimlikNo"
                  value={formData.tcKimlikNo}
                  onChange={(e) => setFormData({...formData, tcKimlikNo: e.target.value})}
                  placeholder="12345678901"
                  maxLength={11}
                  required
                  className="mt-1"
                />
              </div>

              {/* Doğum Tarihi */}
              <div>
                <Label htmlFor="dogumTarihi">Doğum Tarihi *</Label>
                <Input
                  id="dogumTarihi"
                  type="date"
                  value={formData.dogumTarihi}
                  onChange={(e) => setFormData({...formData, dogumTarihi: e.target.value})}
                  required
                  className="mt-1"
                />
              </div>

              {/* Cinsiyet */}
              <div>
                <Label htmlFor="cinsiyet">Cinsiyet *</Label>
                <Select
                  value={formData.cinsiyet}
                  onValueChange={(value) => setFormData({...formData, cinsiyet: value})}
                  required
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Cinsiyet seçin" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ERKEK">Erkek</SelectItem>
                    <SelectItem value="KADIN">Kadın</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* İletişim */}
              <div>
                <Label htmlFor="iletisim">İletişim</Label>
                <Input
                  id="iletisim"
                  value={formData.iletisim}
                  onChange={(e) => setFormData({...formData, iletisim: e.target.value})}
                  placeholder="Telefon numarası"
                  className="mt-1"
                />
              </div>

              {/* Adres */}
              <div className="lg:col-span-2">
                <Label htmlFor="adres">Adres</Label>
                <Input
                  id="adres"
                  value={formData.adres}
                  onChange={(e) => setFormData({...formData, adres: e.target.value})}
                  placeholder="Adres bilgisi"
                  className="mt-1"
                />
              </div>

              {/* Banka Adı */}
              <div>
                <Label htmlFor="bankaAdi">Banka Adı</Label>
                <Select
                  value={formData.bankaAdi}
                  onValueChange={(value) => setFormData({...formData, bankaAdi: value})}
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Banka seçin" />
                  </SelectTrigger>
                  <SelectContent>
                    {bankaSecenekleri.map((banka) => (
                      <SelectItem key={banka.value} value={banka.value}>
                        {banka.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* IBAN Adresi */}
              <div>
                <Label htmlFor="ibanAdresi">IBAN Adresi</Label>
                <Input
                  id="ibanAdresi"
                  value={formData.ibanAdresi}
                  onChange={(e) => setFormData({...formData, ibanAdresi: e.target.value})}
                  placeholder="TR00 0000 0000 0000 0000 0000 00"
                  className="mt-1"
                />
              </div>

              {/* Durum */}
              <div className="lg:col-span-2">
                <Label htmlFor="durum">Durum</Label>
                <Select
                  value={formData.durum}
                  onValueChange={(value: 'AKTIF' | 'PASIF') => setFormData({...formData, durum: value})}
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="AKTIF">Aktif</SelectItem>
                    <SelectItem value="PASIF">Pasif</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="bg-yellow-50 dark:bg-yellow-950 p-4 rounded-lg">
              <h4 className="font-semibold text-yellow-900 dark:text-yellow-100 mb-2">
                ⚠️ Dikkat
              </h4>
              <p className="text-sm text-yellow-800 dark:text-yellow-200">
                Müstahsil No <strong>{mustahsil.mustahsilNo}</strong> değiştirilemez. 
                Bu kod global klavye dinleyicisinde müstahsil seçimi için kullanılmaktadır.
                MÜS*** formatındaki kodlar otomatik olarak atanır ve değiştirilemez.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <Button type="submit" disabled={loading} className="flex-1 order-2 sm:order-1">
                {loading ? 'Güncelleniyor...' : 'Güncelle'}
                <Save className="h-4 w-4 ml-2" />
              </Button>
              <Link href="/dashboard/mustahsil" className="order-1 sm:order-2">
                <Button type="button" variant="outline" className="w-full sm:w-auto">
                  İptal
                </Button>
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
