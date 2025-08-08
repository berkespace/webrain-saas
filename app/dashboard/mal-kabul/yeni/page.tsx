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
  const [formData, setFormData] = useState({
    saticiTipi: 'OZEL_FIRMA',
    komisyoncuId: '',
    ureticiId: '',
    mustahsilId: '',
    ozelFirmaId: '',
    urunId: '',
    kasaSayisi: '',
    brutKg: '',
    dara: '',
    girisKg: '',
    cikmaFire: '',
    netKg: '',
    fiyat: '',
    notlar: ''
  })
  const [filteredUreticiler, setFilteredUreticiler] = useState<Uretici[]>(mockUreticiler)
  const [isBagimsizUretici, setIsBagimsizUretici] = useState(false)
  const [ozelFirmalar, setOzelFirmalar] = useState<OzelFirma[]>(mockOzelFirmalar)
  const [komisyoncular, setKomisyoncular] = useState<Komisyoncu[]>(mockKomisyoncular)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login')
    } else if (status === 'authenticated') {
      fetchOzelFirmalar()
      fetchKomisyoncular()
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
      ozelFirmaId: ''
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

  const calculateNetKg = () => {
    const girisKg = parseFloat(formData.girisKg) || 0
    const cikmaFire = parseFloat(formData.cikmaFire) || 0
    const netKg = girisKg - cikmaFire
    setFormData({ ...formData, netKg: netKg.toString() })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validation
    if (formData.saticiTipi === 'OZEL_FIRMA' && !formData.ozelFirmaId) {
      alert('Özel firma seçimi zorunludur')
      return
    }
    
    if (formData.saticiTipi === 'KOMISYONCU' && (!formData.komisyoncuId || !formData.ureticiId)) {
      alert('Komisyoncu ve üretici seçimi zorunludur')
      return
    }
    
    if (formData.saticiTipi === 'MUSTAHSIL' && !formData.mustahsilId) {
      alert('Müstahsil seçimi zorunludur')
      return
    }
    
    if (!formData.urunId) {
      alert('Ürün seçimi zorunludur')
      return
    }
    
    if (formData.saticiTipi === 'MUSTAHSIL' && !formData.fiyat) {
      alert('Müstahsil için fiyat zorunludur')
      return
    }
    
    if (!formData.kasaSayisi || !formData.brutKg || !formData.dara || !formData.girisKg) {
      alert('Ağırlık bilgileri zorunludur')
      return
    }
    
    setLoading(true)
    
    try {
      // TODO: API call to create mal kabul record
      console.log('Form data:', formData)
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Redirect to list page
      router.push('/dashboard/mal-kabul')
    } catch (error) {
      console.error('Mal kabul kaydetme hatası:', error)
      alert('Mal kabul kaydedilirken hata oluştu')
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
                              <SelectItem value="" disabled>
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
                            <SelectItem value="" disabled>
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
                    Ürün Bilgileri
                  </CardTitle>
                  <CardDescription>Ürün ve miktar bilgileri</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="urun">Ürün</Label>
                    <Select
                      value={formData.urunId}
                      onValueChange={(value) => setFormData({...formData, urunId: value})}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Ürün seçin" />
                      </SelectTrigger>
                      <SelectContent>
                        {mockUrunler.map((urun) => (
                          <SelectItem key={urun.id} value={urun.id.toString()}>
                            {urun.ad}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="kasaSayisi">Kasa Sayısı</Label>
                      <Input
                        id="kasaSayisi"
                        type="number"
                        step="0.01"
                        value={formData.kasaSayisi}
                        onChange={(e) => setFormData({...formData, kasaSayisi: e.target.value})}
                        placeholder="0.00"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="brutKg">Brüt KG</Label>
                      <Input
                        id="brutKg"
                        type="number"
                        step="0.01"
                        value={formData.brutKg}
                        onChange={(e) => setFormData({...formData, brutKg: e.target.value})}
                        placeholder="0.00"
                      />
                    </div>
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
                  <CardDescription>Dara, giriş ve fire bilgileri</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="dara">Dara</Label>
                      <Input
                        id="dara"
                        type="number"
                        step="0.01"
                        value={formData.dara}
                        onChange={(e) => setFormData({...formData, dara: e.target.value})}
                        placeholder="0.00"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="girisKg">Giriş KG</Label>
                      <Input
                        id="girisKg"
                        type="number"
                        step="0.01"
                        value={formData.girisKg}
                        onChange={(e) => {
                          setFormData({...formData, girisKg: e.target.value})
                          calculateNetKg()
                        }}
                        placeholder="0.00"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="cikmaFire">Çıkma/Fire</Label>
                      <Input
                        id="cikmaFire"
                        type="number"
                        step="0.01"
                        value={formData.cikmaFire}
                        onChange={(e) => {
                          setFormData({...formData, cikmaFire: e.target.value})
                          calculateNetKg()
                        }}
                        placeholder="0.00"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="netKg">Net KG</Label>
                      <Input
                        id="netKg"
                        type="number"
                        step="0.01"
                        value={formData.netKg}
                        readOnly
                        className="bg-muted"
                        placeholder="0.00"
                      />
                    </div>
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
                      <Label htmlFor="fiyat">Fiyat (₺/kg) *</Label>
                      <Input
                        id="fiyat"
                        type="number"
                        step="0.01"
                        value={formData.fiyat}
                        onChange={(e) => setFormData({...formData, fiyat: e.target.value})}
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
