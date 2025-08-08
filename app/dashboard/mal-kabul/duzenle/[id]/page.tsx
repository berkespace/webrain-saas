'use client'

import { useSession } from 'next-auth/react'
import { useRouter, useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { DashboardLayout } from '@/components/layout/dashboard-layout'
import { ArrowLeft, Save, Loader2, Package, User, Building, Truck, Calendar, FileText, Scale, DollarSign } from 'lucide-react'
import { useToast } from '@/components/ui/use-toast'
import Link from 'next/link'

interface MalKabulRecord {
  id: string
  fisNo: string
  tarih: string
  saticiTipi: 'OZEL_FIRMA' | 'KOMISYONCU' | 'MUSTAHSIL'
  komisyoncuId?: string
  ureticiId?: string
  ozelFirmaId?: string
  mustahsilId?: string
  urunId: string
  paletId?: string
  ambalajId?: string
  paletSayisi: number
  kasaSayisi: number
  brutKg: number
  daraKg: number
  girisKg: number
  cikmaFireKg: number
  netKg: number
  birimFiyat?: number
  toplamFiyat?: number
  status: 'FATURA_BEKLIYOR' | 'FATURALANDI' | 'TAMAMLANDI' | 'IPTAL'
  notlar?: string
  komisyoncu?: {
    id: string
    dukkanAdi: string
    sehir: string
  }
  uretici?: {
    id: string
    ad: string
    soyad: string
    sehir: string
  }
  ozelFirma?: {
    id: string
    firmaAdi: string
    sehir: string
  }
  mustahsil?: {
    id: string
    ad: string
    soyad: string
  }
  urun: {
    id: string
    ad: string
    kategori: string
  }
  ambalaj?: {
    id: string
    ad: string
    tipi: string
    daraKg: number
  }
  palet?: {
    id: string
    ad: string
    tipi: string
    daraKg: number
  }
  malKabulcu: {
    id: string
    firstName: string
    lastName: string
  }
  createdAt: string
  updatedAt: string
}

interface Komisyoncu {
  id: string
  dukkanAdi: string
  sehir: string
}

interface Uretici {
  id: string
  ad: string
  soyad: string
  sehir: string
}

interface OzelFirma {
  id: string
  firmaAdi: string
  sehir: string
}

interface Ambalaj {
  id: string
  ad: string
  tipi: string
  daraKg: number
}

interface Urun {
  id: string
  ad: string
  kategori: string
  birim: string
}

export default function MalKabulDuzenle() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const params = useParams()
  const id = params.id as string
  const { toast } = useToast()

  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [record, setRecord] = useState<MalKabulRecord | null>(null)
  const [komisyoncular, setKomisyoncular] = useState<Komisyoncu[]>([])
  const [ureticiler, setUreticiler] = useState<Uretici[]>([])
  const [ozelFirmalar, setOzelFirmalar] = useState<OzelFirma[]>([])
  const [ambalajlar, setAmbalajlar] = useState<Ambalaj[]>([])
  const [urunler, setUrunler] = useState<Urun[]>([])

  // Form data
  const [formData, setFormData] = useState({
    fisNo: '',
    tarih: '',
    saticiTipi: 'OZEL_FIRMA' as 'OZEL_FIRMA' | 'KOMISYONCU' | 'MUSTAHSIL',
    komisyoncuId: '',
    ureticiId: '',
    ozelFirmaId: '',
    mustahsilId: '',
    urunId: '',
    paletId: '',
    ambalajId: '',
    paletSayisi: '',
    kasaSayisi: '',
    brutKg: '',
    daraKg: '',
    girisKg: '',
    cikmaFireKg: '',
    netKg: '',
    birimFiyat: '',
    toplamFiyat: '',
    status: 'FATURA_BEKLIYOR' as 'FATURA_BEKLIYOR' | 'FATURALANDI' | 'TAMAMLANDI' | 'IPTAL',
    notlar: ''
  })

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login')
    }
  }, [status, router])

  useEffect(() => {
    if (id) {
      fetchRecord()
      fetchData()
    }
  }, [id])

  useEffect(() => {
    // Calculate daraKg
    const selectedPalet = ambalajlar.find(a => a.id === formData.paletId);
    const selectedAmbalaj = ambalajlar.find(a => a.id === formData.ambalajId);
    
    const paletSayisiNum = parseInt(formData.paletSayisi) || 0;
    const kasaSayisiNum = parseInt(formData.kasaSayisi) || 0;
    
    let toplamDara = 0;
    if (selectedPalet) toplamDara += paletSayisiNum * selectedPalet.daraKg;
    if (selectedAmbalaj) toplamDara += kasaSayisiNum * selectedAmbalaj.daraKg;
    
    // Calculate girisKg
    const brutKgNum = parseFloat(formData.brutKg) || 0;
    const girisKgNum = brutKgNum - toplamDara;
    
    // Calculate netKg
    const cikmaFireKgNum = parseFloat(formData.cikmaFireKg) || 0;
    const netKgNum = girisKgNum - cikmaFireKgNum;
    
    // Calculate toplamFiyat if birimFiyat exists
    const birimFiyatNum = parseFloat(formData.birimFiyat) || 0;
    const toplamFiyatNum = birimFiyatNum * netKgNum;
    
    setFormData(prev => ({
      ...prev,
      daraKg: toplamDara.toString(),
      girisKg: girisKgNum.toString(),
      netKg: netKgNum.toString(),
      toplamFiyat: toplamFiyatNum > 0 ? toplamFiyatNum.toString() : prev.toplamFiyat
    }));
  }, [
    formData.paletId,
    formData.ambalajId,
    formData.paletSayisi,
    formData.kasaSayisi,
    formData.brutKg,
    formData.cikmaFireKg,
    formData.birimFiyat,
    ambalajlar
  ]);

  const fetchRecord = async () => {
    try {
      const response = await fetch(`/api/mal-kabul/${id}`)
      if (!response.ok) {
        throw new Error('Kayıt bulunamadı')
      }
      const data = await response.json()
      setRecord(data)
      
      // Form data'yı doldur
      setFormData({
        fisNo: data.fisNo || '',
        tarih: data.tarih ? new Date(data.tarih).toISOString().split('T')[0] : '',
        saticiTipi: data.saticiTipi || 'OZEL_FIRMA',
        komisyoncuId: data.komisyoncuId || '',
        ureticiId: data.ureticiId || '',
        ozelFirmaId: data.ozelFirmaId || '',
        mustahsilId: data.mustahsilId || '',
        urunId: data.urunId || '',
        paletId: data.paletId || '',
        ambalajId: data.ambalajId || '',
        paletSayisi: data.paletSayisi?.toString() || '',
        kasaSayisi: data.kasaSayisi?.toString() || '',
        brutKg: data.brutKg?.toString() || '',
        daraKg: data.daraKg?.toString() || '',
        girisKg: data.girisKg?.toString() || '',
        cikmaFireKg: data.cikmaFireKg?.toString() || '',
        netKg: data.netKg?.toString() || '',
        birimFiyat: data.birimFiyat?.toString() || '',
        toplamFiyat: data.toplamFiyat?.toString() || '',
        status: data.status || 'FATURA_BEKLIYOR',
        notlar: data.notlar || ''
      })
    } catch (error) {
      console.error('Kayıt getirme hatası:', error)
      toast({
        title: "Hata",
        description: "Kayıt getirilirken hata oluştu",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const fetchData = async () => {
    try {
      // Komisyoncular
      const komisyoncuResponse = await fetch('/api/komisyoncular')
      if (komisyoncuResponse.ok) {
        const komisyoncuData = await komisyoncuResponse.json()
        setKomisyoncular(komisyoncuData)
      }

      // Üreticiler
      const ureticiResponse = await fetch('/api/ureticiler')
      if (ureticiResponse.ok) {
        const ureticiData = await ureticiResponse.json()
        setUreticiler(ureticiData)
      }

      // Özel firmalar
      const ozelFirmaResponse = await fetch('/api/ozel-firmalar')
      if (ozelFirmaResponse.ok) {
        const ozelFirmaData = await ozelFirmaResponse.json()
        setOzelFirmalar(ozelFirmaData)
      }

      // Ambalajlar
      const ambalajResponse = await fetch('/api/ambalajlar')
      if (ambalajResponse.ok) {
        const ambalajData = await ambalajResponse.json()
        setAmbalajlar(ambalajData)
      }

      // Ürünler
      const urunResponse = await fetch('/api/urunler')
      if (urunResponse.ok) {
        const urunData = await urunResponse.json()
        setUrunler(urunData)
      }
    } catch (error) {
      console.error('Veri getirme hatası:', error)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)

    try {
      const response = await fetch(`/api/mal-kabul/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Güncelleme başarısız')
      }

      toast({
        title: "Başarılı",
        description: "Mal kabul kaydı başarıyla güncellendi",
        variant: "success",
      })
      router.push('/dashboard/mal-kabul')
    } catch (error) {
      console.error('Güncelleme hatası:', error)
      toast({
        title: "Hata",
        description: error instanceof Error ? error.message : 'Güncelleme sırasında hata oluştu',
        variant: "destructive",
      })
    } finally {
      setSaving(false)
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  if (status === 'loading' || loading) {
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

  if (!record) {
    return (
      <DashboardLayout>
        <div className="p-6">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-foreground">Kayıt Bulunamadı</h1>
            <p className="text-muted-foreground mt-2">Aradığınız mal kabul kaydı bulunamadı.</p>
            <Link href="/dashboard/mal-kabul">
              <Button className="mt-4">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Geri Dön
              </Button>
            </Link>
          </div>
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout>
      <div className="p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-4">
            <Link href="/dashboard/mal-kabul">
              <Button variant="outline" size="sm">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Geri Dön
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-foreground">Mal Kabul Düzenle</h1>
              <p className="text-muted-foreground">Mal kabul kaydını düzenleyin</p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Temel Bilgiler */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Temel Bilgiler
                </CardTitle>
                <CardDescription>Fatura ve tarih bilgileri</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="fisNo">Fiş No *</Label>
                    <Input
                      id="fisNo"
                      value={formData.fisNo}
                      onChange={(e) => handleInputChange('fisNo', e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="tarih">Tarih *</Label>
                    <Input
                      id="tarih"
                      type="date"
                      value={formData.tarih}
                      onChange={(e) => handleInputChange('tarih', e.target.value)}
                      required
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

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
                  <Select value={formData.saticiTipi || "OZEL_FIRMA"} onValueChange={(value) => handleInputChange('saticiTipi', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="OZEL_FIRMA">Özel Firma</SelectItem>
                      <SelectItem value="KOMISYONCU">Komisyoncu</SelectItem>
                      <SelectItem value="MUSTAHSIL">Müstahsil</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {formData.saticiTipi === 'OZEL_FIRMA' && (
                  <div className="space-y-2">
                    <Label htmlFor="ozelFirmaId">Özel Firma *</Label>
                    <Select value={formData.ozelFirmaId || ""} onValueChange={(value) => handleInputChange('ozelFirmaId', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Özel firma seçin" />
                      </SelectTrigger>
                      <SelectContent>
                        {ozelFirmalar.map((firma) => (
                          <SelectItem key={firma.id} value={firma.id}>
                            {firma.firmaAdi} - {firma.sehir}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}

                {formData.saticiTipi === 'KOMISYONCU' && (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="komisyoncuId">Komisyoncu *</Label>
                      <Select value={formData.komisyoncuId || ""} onValueChange={(value) => handleInputChange('komisyoncuId', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Komisyoncu seçin" />
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
                      <Label htmlFor="ureticiId">Üretici *</Label>
                      <Select value={formData.ureticiId || ""} onValueChange={(value) => handleInputChange('ureticiId', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Üretici seçin" />
                        </SelectTrigger>
                        <SelectContent>
                          {ureticiler.map((uretici) => (
                            <SelectItem key={uretici.id} value={uretici.id}>
                              {uretici.ad} {uretici.soyad} - {uretici.sehir}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>

            {/* Ürün ve Ambalaj */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Package className="h-5 w-5" />
                  Ürün ve Ambalaj
                </CardTitle>
                <CardDescription>Ürün ve ambalaj bilgileri</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="urunId">Ürün *</Label>
                  <Select value={formData.urunId || ""} onValueChange={(value) => handleInputChange('urunId', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Ürün seçin" />
                    </SelectTrigger>
                    <SelectContent>
                      {urunler.map((urun) => (
                        <SelectItem key={urun.id} value={urun.id}>
                          {urun.ad} - {urun.kategori}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="paletId">Palet</Label>
                    <Select value={formData.paletId || "none"} onValueChange={(value) => handleInputChange('paletId', value === "none" ? "" : value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Palet seçin" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="none">Palet Yok</SelectItem>
                        {ambalajlar.filter(a => a.tipi === 'PALET').map((palet) => (
                          <SelectItem key={palet.id} value={palet.id}>
                            {palet.ad} ({palet.daraKg} kg)
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="ambalajId">Ambalaj *</Label>
                    <Select value={formData.ambalajId || ""} onValueChange={(value) => handleInputChange('ambalajId', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Ambalaj seçin" />
                      </SelectTrigger>
                      <SelectContent>
                        {ambalajlar.filter(a => a.tipi !== 'PALET').map((ambalaj) => (
                          <SelectItem key={ambalaj.id} value={ambalaj.id}>
                            {ambalaj.ad} ({ambalaj.daraKg} kg)
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="paletSayisi">Palet Sayısı</Label>
                    <Input
                      id="paletSayisi"
                      type="number"
                      step="1"
                      min="0"
                      value={formData.paletSayisi}
                      onChange={(e) => handleInputChange('paletSayisi', e.target.value)}
                      placeholder="0"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="kasaSayisi">Kasa Sayısı *</Label>
                    <Input
                      id="kasaSayisi"
                      type="number"
                      step="1"
                      min="1"
                      value={formData.kasaSayisi}
                      onChange={(e) => handleInputChange('kasaSayisi', e.target.value)}
                      placeholder="1"
                      required
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Ağırlık ve Fiyat */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Scale className="h-5 w-5" />
                  Ağırlık ve Fiyat
                </CardTitle>
                <CardDescription>Ağırlık ve fiyat bilgileri</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="brutKg">Brüt KG *</Label>
                    <Input
                      id="brutKg"
                      type="number"
                      step="0.01"
                      min="0"
                      value={formData.brutKg}
                      onChange={(e) => handleInputChange('brutKg', e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="daraKg">Dara KG</Label>
                    <Input
                      id="daraKg"
                      type="number"
                      step="0.01"
                      min="0"
                      value={formData.daraKg}
                      onChange={(e) => handleInputChange('daraKg', e.target.value)}
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
                      min="0"
                      value={formData.girisKg}
                      onChange={(e) => handleInputChange('girisKg', e.target.value)}
                      readOnly
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cikmaFireKg">Çıkma/Fire KG</Label>
                    <Input
                      id="cikmaFireKg"
                      type="number"
                      step="0.01"
                      min="0"
                      value={formData.cikmaFireKg}
                      onChange={(e) => handleInputChange('cikmaFireKg', e.target.value)}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="netKg">Net KG</Label>
                    <Input
                      id="netKg"
                      type="number"
                      step="0.01"
                      min="0"
                      value={formData.netKg}
                      onChange={(e) => handleInputChange('netKg', e.target.value)}
                      readOnly
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="birimFiyat">Birim Fiyat</Label>
                    <Input
                      id="birimFiyat"
                      type="number"
                      step="0.01"
                      min="0"
                      value={formData.birimFiyat}
                      onChange={(e) => handleInputChange('birimFiyat', e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="toplamFiyat">Toplam Fiyat</Label>
                  <Input
                    id="toplamFiyat"
                    type="number"
                    step="0.01"
                    min="0"
                    value={formData.toplamFiyat}
                    onChange={(e) => handleInputChange('toplamFiyat', e.target.value)}
                    readOnly
                  />
                </div>
              </CardContent>
            </Card>

            {/* Durum ve Notlar */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5" />
                  Durum ve Notlar
                </CardTitle>
                <CardDescription>Durum ve ek notlar</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="status">Durum</Label>
                  <Select value={formData.status || "FATURA_BEKLIYOR"} onValueChange={(value) => handleInputChange('status', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="FATURA_BEKLIYOR">Fatura Bekliyor</SelectItem>
                      <SelectItem value="FATURALANDI">Faturalandı</SelectItem>
                      <SelectItem value="TAMAMLANDI">Tamamlandı</SelectItem>
                      <SelectItem value="IPTAL">İptal</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="notlar">Notlar</Label>
                  <Textarea
                    id="notlar"
                    value={formData.notlar}
                    onChange={(e) => handleInputChange('notlar', e.target.value)}
                    placeholder="Ek notlar..."
                    rows={4}
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-4 mt-6">
            <Link href="/dashboard/mal-kabul">
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
    </DashboardLayout>
  )
}
