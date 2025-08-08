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
  Printer, 
  ArrowLeft,
  Package,
  User,
  Scale,
  Calendar,
  Building,
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
import { useToast } from '@/components/ui/use-toast'
import Link from 'next/link'

interface OzelFirma {
  id: string
  firmaAdi: string
  sehir: string
  vkn?: string
  yetkiliAdi?: string
  yetkiliTelefon?: string
  adres?: string
  durum: 'AKTIF' | 'PASIF'
}

interface Komisyoncu {
  id: string
  dukkanAdi: string
  sehir: string
  komisyonNo: string
  durum: 'AKTIF' | 'PASIF'
}

interface Uretici {
  id: string
  ad: string
  soyad: string
  komisyoncuId?: string
  sehir: string
  durum: 'AKTIF' | 'PASIF'
}

interface Ambalaj {
  id: string
  ad: string
  tipi: 'PALET' | 'PLASTIK_KASA' | 'KARTON_KASA' | 'DİĞER'
  daraKg: number
  aciklama?: string
  durum: 'AKTIF' | 'PASIF'
}

// Mock data
const mockKomisyoncular: Komisyoncu[] = [
  { id: '1', dukkanAdi: 'CİHAN TARIM', sehir: 'Antalya', komisyonNo: 'K001', durum: 'AKTIF' },
  { id: '2', dukkanAdi: 'ÇALDIR KOM', sehir: 'Mersin', komisyonNo: 'K002', durum: 'AKTIF' },
  { id: '3', dukkanAdi: 'DURDAŞLAR', sehir: 'İzmir', komisyonNo: 'K003', durum: 'AKTIF' },
  { id: '4', dukkanAdi: 'AHMET TORUN KOM', sehir: 'Bursa', komisyonNo: 'K004', durum: 'AKTIF' },
  { id: '5', dukkanAdi: 'ATAYIK', sehir: 'Adana', komisyonNo: 'K005', durum: 'AKTIF' }
]

const mockOzelFirmalar = [
  { id: '1', firmaAdi: 'CİHAN TARIM', sehir: 'Antalya', durum: 'AKTIF' as const },
  { id: '2', firmaAdi: 'AKDENİZ TARIM', sehir: 'Mersin', durum: 'AKTIF' as const },
  { id: '3', firmaAdi: 'EGE TARIM', sehir: 'İzmir', durum: 'AKTIF' as const },
  { id: '4', firmaAdi: 'MARMARA TARIM', sehir: 'Bursa', durum: 'AKTIF' as const }
]

const mockUreticiler: Uretici[] = [
  { id: '1', ad: 'ABBAS', soyad: 'KAYMAZ', komisyoncuId: '1', sehir: 'Antalya', durum: 'AKTIF' },
  { id: '2', ad: 'BEKİR', soyad: 'YUSUFCA', komisyoncuId: '2', sehir: 'Mersin', durum: 'AKTIF' },
  { id: '3', ad: 'HÜSEYİN', soyad: 'URAL', komisyoncuId: '3', sehir: 'İzmir', durum: 'AKTIF' },
  { id: '4', ad: 'ÖZKARADAĞ', soyad: '', komisyoncuId: '4', sehir: 'Bursa', durum: 'AKTIF' },
  { id: '5', ad: 'RAMAZAN', soyad: 'KESKİN', komisyoncuId: '5', sehir: 'Adana', durum: 'AKTIF' }
]

const mockMustahsil = [
  { id: 1, ad: 'AHMET YILMAZ', soyad: 'KAYA' },
  { id: 2, ad: 'FATMA', soyad: 'DEMİR' },
  { id: 3, ad: 'MEHMET', soyad: 'ÖZ' },
  { id: 4, ad: 'AYŞE', soyad: 'ÇELİK' }
]

const mockUrunler = [
  { id: 1, ad: 'SİLÖR', kategori: 'Sebze' },
  { id: 2, ad: 'SALATALIK', kategori: 'Sebze' },
  { id: 3, ad: 'DOMATES', kategori: 'Sebze' },
  { id: 4, ad: 'SİVRİ', kategori: 'Sebze' },
  { id: 5, ad: 'DOLMA', kategori: 'Sebze' },
  { id: 6, ad: 'ÜÇBURUN', kategori: 'Sebze' },
  { id: 7, ad: 'ÇARLİ', kategori: 'Sebze' },
  { id: 8, ad: 'SALKIM KOK', kategori: 'Sebze' }
]

export default function YeniMalKabul() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    saticiTipi: 'OZEL_FIRMA',
    komisyoncuId: '',
    ureticiId: '',
    mustahsilId: '',
    ozelFirmaId: '',
    urunId: '',
    paletId: '', // Yeni: Palet seçimi
    ambalajId: '', // Yeni: Ambalaj seçimi (kasa vb.)
    paletSayisi: '',
    kasaSayisi: '',
    brutKg: '',
    daraKg: '',
    girisKg: '',
    cikmaFireKg: '',
    netKg: '',
    birimFiyat: '',
    notlar: ''
  })
  const [filteredUreticiler, setFilteredUreticiler] = useState<Uretici[]>(mockUreticiler)
  const [isBagimsizUretici, setIsBagimsizUretici] = useState(false)
  const [ozelFirmalar, setOzelFirmalar] = useState<OzelFirma[]>(mockOzelFirmalar)
  const [komisyoncular, setKomisyoncular] = useState<Komisyoncu[]>(mockKomisyoncular)
  const [ambalajlar, setAmbalajlar] = useState<Ambalaj[]>([])
  const [urunler, setUrunler] = useState<{ id: string; ad: string; kategori?: string; birim: string }[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login')
    } else if (status === 'authenticated') {
      fetchOzelFirmalar()
      fetchKomisyoncular()
      fetchAmbalajlar()
      fetchUrunler()
    }
  }, [status, router])

  const fetchOzelFirmalar = async () => {
    try {
      const response = await fetch('/api/ozel-firmalar?status=AKTIF')
      if (response.ok) {
        const data = await response.json()
        setOzelFirmalar(data)
      } else {
        console.error('Özel firma listesi alınamadı')
      }
    } catch (error) {
      console.error('Özel firma listesi hatası:', error)
    }
  }

  const fetchKomisyoncular = async () => {
    try {
      const response = await fetch('/api/komisyoncular?status=AKTIF')
      if (response.ok) {
        const data = await response.json()
        setKomisyoncular(data)
      } else {
        console.error('Komisyoncu listesi alınamadı')
      }
    } catch (error) {
      console.error('Komisyoncu listesi hatası:', error)
    }
  }

  const fetchAmbalajlar = async () => {
    try {
      const response = await fetch('/api/ambalajlar?status=AKTIF')
      if (response.ok) {
        const data = await response.json()
        setAmbalajlar(data)
      } else {
        console.error('Ambalaj listesi alınamadı')
      }
    } catch (error) {
      console.error('Ambalaj listesi hatası:', error)
    }
  }

  const fetchUrunler = async () => {
    try {
      const response = await fetch('/api/urunler?status=AKTIF')
      if (response.ok) {
        const data = await response.json()
        setUrunler(data)
      } else {
        console.error('Ürün listesi alınamadı')
      }
    } catch (error) {
      console.error('Ürün listesi hatası:', error)
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

  const handleSaticiTipiChange = (saticiTipi: string) => {
    setFormData({ 
      ...formData, 
      saticiTipi, 
      komisyoncuId: '', 
      ureticiId: '', 
      mustahsilId: '',
      ozelFirmaId: '',
      paletId: '', // Reset palet
      ambalajId: '', // Reset ambalaj
      paletSayisi: '',
      kasaSayisi: '',
      brutKg: '',
      daraKg: '',
      girisKg: '',
      cikmaFireKg: '',
      netKg: '',
      birimFiyat: '',
      notlar: ''
    })
    setIsBagimsizUretici(saticiTipi === 'MUSTAHSIL')
  }

  const handleKomisyoncuChange = async (komisyoncuId: string) => {
    setFormData({ ...formData, komisyoncuId, ureticiId: '' })
    if (komisyoncuId) {
      try {
        // Komisyoncuya bağlı üreticileri getir
        const response = await fetch(`/api/ureticiler?komisyoncuId=${komisyoncuId}`)
        if (response.ok) {
          const data = await response.json()
          setFilteredUreticiler(data)
        } else {
          console.error('Üretici listesi alınamadı')
          setFilteredUreticiler([])
        }
      } catch (error) {
        console.error('Üretici listesi hatası:', error)
        setFilteredUreticiler([])
      }
    } else {
      setFilteredUreticiler([])
    }
  }

  const handleUreticiChange = (ureticiId: string) => {
    setFormData({ ...formData, ureticiId })
  }

  const handlePaletChange = (paletId: string) => {
    setFormData(prev => {
      const newFormData = { ...prev, paletId, paletSayisi: '', daraKg: '', girisKg: '' }
      
      if (paletId) {
        // Calculate dara with updated values
        const palet = ambalajlar.find(a => a.id === paletId)
        const ambalaj = ambalajlar.find(a => a.id === newFormData.ambalajId)
        
        let toplamDara = 0
        
        // Palet dara'sı
        if (palet) {
          const paletSayisi = parseInt(newFormData.paletSayisi) || 0
          toplamDara += paletSayisi * palet.daraKg
        }
        
        // Ambalaj dara'sı
        if (ambalaj) {
          const kasaSayisi = parseInt(newFormData.kasaSayisi) || 0
          toplamDara += kasaSayisi * ambalaj.daraKg
        }
        
        newFormData.daraKg = toplamDara.toString()
        
        // Giriş KG'yi da hesapla
        if (newFormData.brutKg) {
          const brutKg = parseFloat(newFormData.brutKg) || 0
          const girisKg = brutKg - toplamDara
          newFormData.girisKg = girisKg.toString()
        }
      }
      
      return newFormData
    })
  }

  const handleAmbalajChange = (ambalajId: string) => {
    setFormData(prev => {
      const newFormData = { ...prev, ambalajId, kasaSayisi: '', daraKg: '', girisKg: '' }
      
      if (ambalajId) {
        // Calculate dara with updated values
        const palet = ambalajlar.find(a => a.id === newFormData.paletId)
        const ambalaj = ambalajlar.find(a => a.id === ambalajId)
        
        let toplamDara = 0
        
        // Palet dara'sı
        if (palet) {
          const paletSayisi = parseInt(newFormData.paletSayisi) || 0
          toplamDara += paletSayisi * palet.daraKg
        }
        
        // Ambalaj dara'sı
        if (ambalaj) {
          const kasaSayisi = parseInt(newFormData.kasaSayisi) || 0
          toplamDara += kasaSayisi * ambalaj.daraKg
        }
        
        newFormData.daraKg = toplamDara.toString()
        
        // Giriş KG'yi da hesapla
        if (newFormData.brutKg) {
          const brutKg = parseFloat(newFormData.brutKg) || 0
          const girisKg = brutKg - toplamDara
          newFormData.girisKg = girisKg.toString()
        }
      }
      
      return newFormData
    })
  }

  const handleKasaSayisiChange = (kasaSayisi: string) => {
    setFormData(prev => {
      const newFormData = { ...prev, kasaSayisi }
      // Calculate dara with updated values
      const palet = ambalajlar.find(a => a.id === newFormData.paletId)
      const ambalaj = ambalajlar.find(a => a.id === newFormData.ambalajId)
      
      let toplamDara = 0
      
      // Palet dara'sı
      if (palet) {
        const paletSayisiNum = parseInt(newFormData.paletSayisi) || 0
        toplamDara += paletSayisiNum * palet.daraKg
      }
      
      // Ambalaj dara'sı
      if (ambalaj) {
        const kasaSayisiNum = parseInt(kasaSayisi) || 0
        toplamDara += kasaSayisiNum * ambalaj.daraKg
      }
      
      const updatedFormData = { ...newFormData, daraKg: toplamDara.toString() }
      
      // Giriş KG'yi da hesapla
      if (newFormData.brutKg) {
        const brutKg = parseFloat(newFormData.brutKg) || 0
        const girisKg = brutKg - toplamDara
        updatedFormData.girisKg = girisKg.toString()
      }
      
      return updatedFormData
    })
  }

  const handlePaletSayisiChange = (paletSayisi: string) => {
    setFormData(prev => {
      const newFormData = { ...prev, paletSayisi }
      // Calculate dara with updated values
      const palet = ambalajlar.find(a => a.id === newFormData.paletId)
      const ambalaj = ambalajlar.find(a => a.id === newFormData.ambalajId)
      
      let toplamDara = 0
      
      // Palet dara'sı
      if (palet) {
        const paletSayisiNum = parseInt(paletSayisi) || 0
        toplamDara += paletSayisiNum * palet.daraKg
      }
      
      // Ambalaj dara'sı
      if (ambalaj) {
        const kasaSayisi = parseInt(newFormData.kasaSayisi) || 0
        toplamDara += kasaSayisi * ambalaj.daraKg
      }
      
      const updatedFormData = { ...newFormData, daraKg: toplamDara.toString() }
      
      // Giriş KG'yi da hesapla
      if (newFormData.brutKg) {
        const brutKg = parseFloat(newFormData.brutKg) || 0
        const girisKg = brutKg - toplamDara
        updatedFormData.girisKg = girisKg.toString()
      }
      
      return updatedFormData
    })
  }

  const handleBrutKgChange = (brutKg: string) => {
    setFormData(prev => {
      const newFormData = { ...prev, brutKg }
      
      // Recalculate dara
      const palet = ambalajlar.find(a => a.id === newFormData.paletId)
      const ambalaj = ambalajlar.find(a => a.id === newFormData.ambalajId)
      
      let toplamDara = 0
      
      // Palet dara'sı
      if (palet) {
        const paletSayisi = parseInt(newFormData.paletSayisi) || 0
        toplamDara += paletSayisi * palet.daraKg
      }
      
      // Ambalaj dara'sı
      if (ambalaj) {
        const kasaSayisi = parseInt(newFormData.kasaSayisi) || 0
        toplamDara += kasaSayisi * ambalaj.daraKg
      }
      
      newFormData.daraKg = toplamDara.toString()
      
      // Giriş KG'yi hesapla
      const brutKgNum = parseFloat(brutKg) || 0
      const girisKg = brutKgNum - toplamDara
      newFormData.girisKg = girisKg.toString()
      
      return newFormData
    })
  }

  const handleCikmaFireChange = (cikmaFireKg: string) => {
    setFormData(prev => ({ ...prev, cikmaFireKg }))
    if (formData.girisKg) {
      const girisKg = parseFloat(formData.girisKg) || 0
      const cikmaFireKgNum = parseFloat(cikmaFireKg) || 0
      const netKg = girisKg - cikmaFireKgNum
      setFormData(prev => ({ ...prev, netKg: netKg.toString() }))
    }
  }

  const calculateGirisKg = () => {
    const brutKg = parseFloat(formData.brutKg) || 0
    const daraKg = parseFloat(formData.daraKg) || 0
    const girisKg = brutKg - daraKg
    setFormData(prev => ({ ...prev, girisKg: girisKg.toString() }))
  }

  const calculateNetKg = () => {
    const girisKg = parseFloat(formData.girisKg) || 0
    const cikmaFire = parseFloat(formData.cikmaFireKg) || 0
    const netKg = girisKg - cikmaFire
    setFormData(prev => ({ ...prev, netKg: netKg.toString() }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validation
    if (formData.saticiTipi === 'OZEL_FIRMA' && !formData.ozelFirmaId) {
      toast({
        title: "Hata",
        description: "Özel firma seçimi zorunludur",
        variant: "destructive",
      })
      return
    }
    
    if (formData.saticiTipi === 'KOMISYONCU' && (!formData.komisyoncuId || !formData.ureticiId)) {
      toast({
        title: "Hata",
        description: "Komisyoncu ve üretici seçimi zorunludur",
        variant: "destructive",
      })
      return
    }
    
    if (formData.saticiTipi === 'MUSTAHSIL' && !formData.mustahsilId) {
      toast({
        title: "Hata",
        description: "Müstahsil seçimi zorunludur",
        variant: "destructive",
      })
      return
    }
    
    if (!formData.urunId) {
      toast({
        title: "Hata",
        description: "Ürün seçimi zorunludur",
        variant: "destructive",
      })
      return
    }
    
    if (!formData.paletId && !formData.ambalajId) {
      toast({
        title: "Hata",
        description: "Palet veya Ambalaj seçimi zorunludur",
        variant: "destructive",
      })
      return
    }
    
    // Palet sayısı 0 olabilir, ama kasa sayısı 0 olmamalıdır
    if (formData.paletId && formData.paletSayisi === '') {
      toast({
        title: "Hata",
        description: "Palet seçildiğinde palet sayısı zorunludur",
        variant: "destructive",
      })
      return
    }
    
    if (formData.ambalajId && (!formData.kasaSayisi || parseInt(formData.kasaSayisi) === 0)) {
      toast({
        title: "Hata",
        description: "Ambalaj seçildiğinde kasa sayısı 0'dan büyük olmalıdır",
        variant: "destructive",
      })
      return
    }
    
    if (!formData.brutKg) {
      toast({
        title: "Hata",
        description: "Brüt KG alanı zorunludur",
        variant: "destructive",
      })
      return
    }
    
    if (formData.saticiTipi === 'MUSTAHSIL' && !formData.birimFiyat) {
      toast({
        title: "Hata",
        description: "Müstahsil için fiyat zorunludur",
        variant: "destructive",
      })
      return
    }
    
    setLoading(true)
    
    try {
      const response = await fetch('/api/mal-kabul', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          saticiTipi: formData.saticiTipi,
          komisyoncuId: formData.komisyoncuId || null,
          ureticiId: formData.ureticiId || null,
          mustahsilId: formData.mustahsilId || null,
          ozelFirmaId: formData.ozelFirmaId || null,
          urunId: formData.urunId,
          paletId: formData.paletId || null,
          ambalajId: formData.ambalajId || null,
          paletSayisi: formData.paletSayisi,
          kasaSayisi: formData.kasaSayisi,
          brutKg: formData.brutKg,
          daraKg: formData.daraKg,
          girisKg: formData.girisKg,
          cikmaFireKg: formData.cikmaFireKg,
          netKg: formData.netKg,
          birimFiyat: formData.birimFiyat,
          notlar: formData.notlar
        }),
      })

      if (response.ok) {
        const result = await response.json()
        toast({
          title: "Başarılı",
          description: "Mal kabul kaydı başarıyla oluşturuldu!",
          variant: "success",
        })
        router.push('/dashboard/mal-kabul')
      } else {
        const error = await response.json()
        toast({
          title: "Hata",
          description: error.error || 'Mal kabul kaydı oluşturulurken hata oluştu',
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error('Mal kabul kaydetme hatası:', error)
      toast({
        title: "Hata",
        description: "Mal kabul kaydedilirken hata oluştu",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handlePrint = () => {
    // TODO: Print functionality
    console.log('Printing...')
  }

  return (
    <DashboardLayout>
      <div className="p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-4">
            <Link href="/dashboard/mal-kabul">
              <Button variant="outline" size="sm">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Geri
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-foreground">Yeni Mal Kabul</h1>
              <p className="text-muted-foreground">Yeni mal kabul kaydı oluşturun</p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Sol Kolon */}
            <div className="space-y-6">
              {/* Satıcı Bilgileri */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5" />
                    Satıcı Bilgileri
                  </CardTitle>
                  <CardDescription>Satıcı tipi ve bilgileri</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="saticiTipi">Satıcı Tipi *</Label>
                    <Select
                      value={formData.saticiTipi}
                      onValueChange={handleSaticiTipiChange}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="OZEL_FIRMA">Özel Firma</SelectItem>
                        <SelectItem value="MUSTAHSIL">Müstahsil</SelectItem>
                        <SelectItem value="KOMISYONCU">Komisyoncu</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {formData.saticiTipi === 'KOMISYONCU' && (
                    <>
                      <div className="space-y-2">
                        <Label htmlFor="komisyoncu">Komisyoncu *</Label>
                        <Select
                          value={formData.komisyoncuId}
                          onValueChange={handleKomisyoncuChange}
                          required
                          disabled={loading}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder={loading ? "Yükleniyor..." : "Komisyoncu seçin"} />
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

                      <div className="space-y-2">
                        <Label htmlFor="uretici">Üretici *</Label>
                        <Select
                          value={formData.ureticiId}
                          onValueChange={handleUreticiChange}
                          disabled={!formData.komisyoncuId || loading}
                          required
                        >
                          <SelectTrigger>
                            <SelectValue placeholder={!formData.komisyoncuId ? "Önce komisyoncu seçin" : "Üretici seçin"} />
                          </SelectTrigger>
                          <SelectContent>
                            {filteredUreticiler.length === 0 ? (
                              <SelectItem value="no-uretici" disabled>
                                {formData.komisyoncuId ? "Bu komisyoncuya bağlı üretici bulunamadı" : "Üretici seçmek için önce komisyoncu seçin"}
                              </SelectItem>
                            ) : (
                              filteredUreticiler.map((uretici) => (
                                <SelectItem key={uretici.id} value={uretici.id}>
                                  {uretici.ad} {uretici.soyad}
                                </SelectItem>
                              ))
                            )}
                          </SelectContent>
                        </Select>
                        {formData.komisyoncuId && filteredUreticiler.length === 0 && (
                          <p className="text-xs text-muted-foreground">
                            Bu komisyoncuya bağlı üretici bulunmuyor. <Link href="/dashboard/ureticiler/yeni" className="text-primary hover:underline">Yeni üretici ekleyin</Link>
                          </p>
                        )}
                      </div>
                    </>
                  )}

                  {formData.saticiTipi === 'OZEL_FIRMA' && (
                    <div className="space-y-2">
                      <Label htmlFor="ozelFirma">Özel Firma *</Label>
                      <Select
                        value={formData.ozelFirmaId}
                        onValueChange={(value) => setFormData({...formData, ozelFirmaId: value})}
                        required
                        disabled={loading}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder={loading ? "Yükleniyor..." : "Özel firma seçin"} />
                        </SelectTrigger>
                        <SelectContent>
                          {ozelFirmalar.length === 0 ? (
                            <SelectItem value="no-ozel-firma" disabled>
                              Özel firma bulunamadı
                            </SelectItem>
                          ) : (
                            ozelFirmalar.map((firma) => (
                              <SelectItem key={firma.id} value={firma.id}>
                                {firma.firmaAdi} - {firma.sehir}
                              </SelectItem>
                            ))
                          )}
                        </SelectContent>
                      </Select>
                      {ozelFirmalar.length === 0 && !loading && (
                        <p className="text-xs text-muted-foreground">
                          Henüz özel firma kaydı bulunmuyor. <Link href="/dashboard/ozel-firmalar/yeni" className="text-primary hover:underline">Yeni özel firma ekleyin</Link>
                        </p>
                      )}
                    </div>
                  )}

                  {formData.saticiTipi === 'MUSTAHSIL' && (
                    <div className="space-y-2">
                      <Label htmlFor="mustahsil">Müstahsil</Label>
                      <Select
                        value={formData.mustahsilId}
                        onValueChange={(value) => setFormData({...formData, mustahsilId: value})}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Müstahsil seçin" />
                        </SelectTrigger>
                        <SelectContent>
                          {mockMustahsil.map((mustahsil) => (
                            <SelectItem key={mustahsil.id} value={mustahsil.id.toString()}>
                              {mustahsil.ad} {mustahsil.soyad}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Ürün Bilgileri */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Package className="h-5 w-5" />
                    Ürün ve Ambalaj Bilgileri
                  </CardTitle>
                  <CardDescription>Ürün, ambalaj ve miktar bilgileri</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="urun">Ürün *</Label>
                    <Select
                      value={formData.urunId}
                      onValueChange={(value) => setFormData({...formData, urunId: value})}
                      required
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Ürün seçin" />
                      </SelectTrigger>
                      <SelectContent>
                        {urunler.length === 0 ? (
                          <SelectItem value="no-urun" disabled>
                            Ürün bulunamadı
                          </SelectItem>
                        ) : (
                          urunler.map((urun) => (
                            <SelectItem key={urun.id} value={urun.id.toString()}>
                              {urun.ad}
                            </SelectItem>
                          ))
                        )}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="palet">Palet</Label>
                    <Select
                      value={formData.paletId}
                      onValueChange={handlePaletChange}
                      disabled={loading}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder={loading ? "Yükleniyor..." : "Palet seçin"} />
                      </SelectTrigger>
                      <SelectContent>
                        {ambalajlar.filter(a => a.tipi === 'PALET').length === 0 ? (
                          <SelectItem value="no-palet" disabled>
                            Palet bulunamadı
                          </SelectItem>
                        ) : (
                          ambalajlar.filter(a => a.tipi === 'PALET').map((palet) => (
                            <SelectItem key={palet.id} value={palet.id}>
                              {palet.ad} - {palet.daraKg}kg
                            </SelectItem>
                          ))
                        )}
                      </SelectContent>
                    </Select>
                    {formData.paletId && (
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="paletSayisi">Palet Sayısı</Label>
                          <Input
                            id="paletSayisi"
                            type="number"
                            step="1"
                            value={formData.paletSayisi}
                            onChange={(e) => handlePaletSayisiChange(e.target.value)}
                            placeholder="0"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="paletDaraKg">Palet Dara KG</Label>
                          <Input
                            id="paletDaraKg"
                            type="number"
                            step="0.01"
                            value={formData.paletId ? (ambalajlar.find(a => a.id === formData.paletId)?.daraKg || 0) * (parseInt(formData.paletSayisi) || 0) : '0'}
                            placeholder="0.00"
                            readOnly
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="ambalaj">Ambalaj</Label>
                    <Select
                      value={formData.ambalajId}
                      onValueChange={handleAmbalajChange}
                      disabled={loading}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder={loading ? "Yükleniyor..." : "Ambalaj seçin"} />
                      </SelectTrigger>
                      <SelectContent>
                        {ambalajlar.filter(a => a.tipi !== 'PALET').length === 0 ? (
                          <SelectItem value="no-ambalaj" disabled>
                            Ambalaj bulunamadı
                          </SelectItem>
                        ) : (
                          ambalajlar.filter(a => a.tipi !== 'PALET').map((ambalaj) => (
                            <SelectItem key={ambalaj.id} value={ambalaj.id}>
                              {ambalaj.ad} - {ambalaj.daraKg}kg
                            </SelectItem>
                          ))
                        )}
                      </SelectContent>
                    </Select>
                    {formData.ambalajId && (
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="kasaSayisi">Kasa Sayısı *</Label>
                          <Input
                            id="kasaSayisi"
                            type="number"
                            step="1"
                            min="1"
                            value={formData.kasaSayisi}
                            onChange={(e) => handleKasaSayisiChange(e.target.value)}
                            placeholder="1"
                            required
                          />
                          <p className="text-xs text-muted-foreground">
                            Kasa sayısı 0&apos;dan büyük olmalıdır
                          </p>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="ambalajDaraKg">Ambalaj Dara KG</Label>
                          <Input
                            id="ambalajDaraKg"
                            type="number"
                            step="0.01"
                            value={formData.ambalajId ? (ambalajlar.find(a => a.id === formData.ambalajId)?.daraKg || 0) * (parseInt(formData.kasaSayisi) || 0) : '0'}
                            placeholder="0.00"
                            readOnly
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sağ Kolon */}
            <div className="space-y-6">
              {/* Ağırlık Bilgileri */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Scale className="h-5 w-5" />
                    Ağırlık Bilgileri
                  </CardTitle>
                  <CardDescription>Brüt, dara, giriş ve fire bilgileri</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="brutKg">Brüt KG *</Label>
                      <Input
                        id="brutKg"
                        type="number"
                        step="0.01"
                        value={formData.brutKg}
                        onChange={(e) => handleBrutKgChange(e.target.value)}
                        placeholder="0.00"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="daraKg">Dara KG</Label>
                      <Input
                        id="daraKg"
                        type="number"
                        step="0.01"
                        value={formData.daraKg}
                        onChange={(e) => setFormData({...formData, daraKg: e.target.value})}
                        placeholder="0.00"
                        readOnly
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="girisKg">Giriş KG</Label>
                      <Input
                        id="girisKg"
                        type="number"
                        step="0.01"
                        value={formData.girisKg}
                        onChange={(e) => setFormData({...formData, girisKg: e.target.value})}
                        placeholder="0.00"
                        readOnly
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cikmaFireKg">Çıkma/Fire KG</Label>
                      <Input
                        id="cikmaFireKg"
                        type="number"
                        step="0.01"
                        value={formData.cikmaFireKg}
                        onChange={(e) => handleCikmaFireChange(e.target.value)}
                        placeholder="0.00"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="netKg">Net KG</Label>
                    <Input
                      id="netKg"
                      type="number"
                      step="0.01"
                      value={formData.netKg}
                      onChange={(e) => setFormData({...formData, netKg: e.target.value})}
                      placeholder="0.00"
                      readOnly
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Fiyat ve Notlar */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5" />
                    Ek Bilgiler
                  </CardTitle>
                  <CardDescription>Fiyat ve notlar</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {isBagimsizUretici && (
                    <div className="space-y-2">
                      <Label htmlFor="birimFiyat">Fiyat (₺/kg) *</Label>
                      <Input
                        id="birimFiyat"
                        type="number"
                        step="0.01"
                        value={formData.birimFiyat}
                        onChange={(e) => setFormData({...formData, birimFiyat: e.target.value})}
                        placeholder="0.00"
                        required={isBagimsizUretici}
                      />
                      <p className="text-xs text-muted-foreground">
                        * Müstahsil için fiyat zorunludur
                      </p>
                    </div>
                  )}

                  <div className="space-y-2">
                    <Label htmlFor="notlar">Notlar</Label>
                    <textarea
                      id="notlar"
                      value={formData.notlar}
                      onChange={(e) => setFormData({...formData, notlar: e.target.value})}
                      placeholder="Ek notlar..."
                      rows={3}
                      className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-4 mt-6">
            <Button type="button" variant="outline" onClick={handlePrint}>
              <Printer className="mr-2 h-4 w-4" />
              Fiş Yazdır
            </Button>
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
