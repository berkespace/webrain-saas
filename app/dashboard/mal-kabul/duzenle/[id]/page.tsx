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
import { ArrowLeft, Save, Loader2, Package, User, Building, Truck, Calendar, FileText, Scale, CheckCircle, AlertTriangle, Printer, X } from 'lucide-react'
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
  status: 'FATURA_BEKLIYOR' | 'FATURALANDI' | 'NETLENDI' | 'TAMAMLANDI' | 'IPTAL'
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

interface Mustahsil {
  id: string
  ad: string
  soyad: string
}

export default function MalKabulDuzenle() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const params = useParams()
  const id = params.id as string
  const { toast } = useToast()

  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [showFinalReceipt, setShowFinalReceipt] = useState(false)
  const [qrDataUrl, setQrDataUrl] = useState<string>('')
  const [barcodeDataUrl, setBarcodeDataUrl] = useState<string>('')
  const [record, setRecord] = useState<MalKabulRecord | null>(null)
  const [komisyoncular, setKomisyoncular] = useState<Komisyoncu[]>([])
  const [ureticiler, setUreticiler] = useState<Uretici[]>([])
  const [ozelFirmalar, setOzelFirmalar] = useState<OzelFirma[]>([])
  const [ambalajlar, setAmbalajlar] = useState<Ambalaj[]>([])
  const [urunler, setUrunler] = useState<Urun[]>([])
  const [mustahsil, setMustahsil] = useState<Mustahsil[]>([])

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
    kasaSayisi: '',
    brutKg: '',
    daraKg: '',
    girisKg: '',
    cikmaFireKg: '',
    netKg: '',
    status: 'FATURA_BEKLIYOR' as 'FATURA_BEKLIYOR' | 'FATURALANDI' | 'NETLENDI' | 'TAMAMLANDI' | 'IPTAL',
    notlar: ''
  })

  const userRole = (session?.user as any)?.role

  // Rol bazlı erişim kontrolü
  const canEdit = userRole === 'MAL_KABULCU' || userRole === 'SATIN_ALMACI' || userRole === 'MUHASEBE' || userRole === 'ADMIN'
  const canChangeStatus = userRole === 'MAL_KABULCU' || userRole === 'ADMIN'
  const canEditBasicInfo = userRole === 'MAL_KABULCU' || userRole === 'ADMIN'

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login')
    } else if (status === 'authenticated' && !canEdit) {
      toast({
        title: "Erişim Reddedildi",
        description: "Bu sayfaya erişim yetkiniz bulunmamaktadır",
        variant: "destructive",
      })
      router.push('/dashboard')
    }
  }, [status, router, canEdit, toast])

  useEffect(() => {
    if (id) {
      // Önce tüm verileri yükle, sonra kayıt getir
      const loadData = async () => {
        await fetchData()
        await fetchRecord()
      }
      loadData()
    }
  }, [id])

  // Giriş KG hesaplama (Brüt KG - Dara KG)
  useEffect(() => {
    const brutKgNum = parseFloat(formData.brutKg) || 0;
    const daraKgNum = parseFloat(formData.daraKg) || 0;
    const girisKgNum = brutKgNum - daraKgNum;
    
    setFormData(prev => ({
      ...prev,
      girisKg: girisKgNum.toString()
    }));
  }, [formData.brutKg, formData.daraKg]);

  // Net KG hesaplama (sadece çıkma/fire KG değiştiğinde)
  useEffect(() => {
    const girisKgNum = parseFloat(formData.girisKg) || 0;
    const cikmaFireKgNum = parseFloat(formData.cikmaFireKg) || 0;
    const netKgNum = girisKgNum - cikmaFireKgNum;
    
    setFormData(prev => ({
      ...prev,
      netKg: netKgNum.toString()
    }));
  }, [formData.girisKg, formData.cikmaFireKg]);

  const fetchRecord = async () => {
    try {
      const response = await fetch(`/api/mal-kabul/${id}`)
      if (!response.ok) {
        throw new Error('Kayıt bulunamadı')
      }
      const data = await response.json()
      setRecord(data)
      
      console.log('Record data loaded:', data)
      console.log('Mustahsil data in record:', data.mustahsil)
      console.log('Mustahsil ID in record:', data.mustahsilId)
      console.log('Satici tipi in record:', data.saticiTipi)
      
      // Form data'yı doldur
      const newFormData = {
        fisNo: data.fisNo || '',
        tarih: data.tarih ? new Date(data.tarih).toISOString().split('T')[0] : '',
        saticiTipi: data.saticiTipi || 'OZEL_FIRMA',
        komisyoncuId: data.komisyoncuId || '',
        ureticiId: data.ureticiId || '',
        ozelFirmaId: data.ozelFirmaId || '',
        mustahsilId: data.mustahsilId || '',
        urunId: data.urunId || '',
        kasaSayisi: data.kasaSayisi?.toString() || '',
        brutKg: data.brutKg?.toString() || '',
        daraKg: data.daraKg?.toString() || '',
        girisKg: data.girisKg?.toString() || '',
        cikmaFireKg: data.cikmaFireKg?.toString() || '',
        netKg: data.netKg?.toString() || '',
        status: data.status || 'FATURA_BEKLIYOR',
        notlar: data.notlar || ''
      }
      
      console.log('New form data to be set:', newFormData)
      setFormData(newFormData)
      
      console.log('Form data set:', {
        saticiTipi: newFormData.saticiTipi,
        mustahsilId: newFormData.mustahsilId
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
        console.log('Komisyoncular loaded:', komisyoncuData.length)
      }

      // Üreticiler
      const ureticiResponse = await fetch('/api/ureticiler')
      if (ureticiResponse.ok) {
        const ureticiData = await ureticiResponse.json()
        setUreticiler(ureticiData)
        console.log('Üreticiler loaded:', ureticiData.length)
      }

      // Özel firmalar
      const ozelFirmaResponse = await fetch('/api/ozel-firmalar')
      if (ozelFirmaResponse.ok) {
        const ozelFirmaData = await ozelFirmaResponse.json()
        setOzelFirmalar(ozelFirmaData)
        console.log('Özel firmalar loaded:', ozelFirmaData.length)
      }

      // Müstahsil
      const mustahsilResponse = await fetch('/api/mustahsil')
      if (mustahsilResponse.ok) {
        const mustahsilData = await mustahsilResponse.json()
        setMustahsil(mustahsilData)
        console.log('Müstahsil loaded:', mustahsilData.length, mustahsilData)
      } else {
        console.error('Müstahsil API error:', mustahsilResponse.status, mustahsilResponse.statusText)
      }

      // Ambalajlar
      const ambalajResponse = await fetch('/api/ambalajlar')
      if (ambalajResponse.ok) {
        const ambalajData = await ambalajResponse.json()
        setAmbalajlar(ambalajData)
        console.log('Ambalajlar loaded:', ambalajData.length)
      }

      // Ürünler
      const urunResponse = await fetch('/api/urunler')
      if (urunResponse.ok) {
        const urunData = await urunResponse.json()
        setUrunler(urunData)
        console.log('Ürünler loaded:', urunData.length)
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

      // Eğer durum NETLENDI olarak değiştirildiyse, son fiş yazdır
      if (formData.status === 'NETLENDI') {
        setShowFinalReceipt(true)
      } else {
        // Eğer durum NETLENDI değilse, normal yönlendirme yap
        if (userRole === 'MAL_KABULCU') {
          router.push('/dashboard/satin-alma')
        } else {
          router.push('/dashboard/mal-kabul')
        }
      }
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

  const getSaticiAdi = () => {
    console.log('getSaticiAdi called with:', {
      saticiTipi: formData.saticiTipi,
      mustahsilId: formData.mustahsilId,
      mustahsil: mustahsil,
      mustahsilLength: mustahsil.length,
      record: record
    })
    
    if (formData.saticiTipi === 'OZEL_FIRMA') {
      return ozelFirmalar.find(f => f.id === formData.ozelFirmaId)?.firmaAdi || ''
    } else if (formData.saticiTipi === 'KOMISYONCU') {
      const komisyoncu = komisyoncular.find(k => k.id === formData.komisyoncuId)
      const uretici = ureticiler.find(u => u.id === formData.ureticiId)
      if (komisyoncu && uretici) {
        return `${komisyoncu.dukkanAdi} - ${uretici.ad} ${uretici.soyad}`
      }
      return komisyoncu?.dukkanAdi || ''
    } else if (formData.saticiTipi === 'MUSTAHSIL') {
      console.log('Looking for mustahsil with ID:', formData.mustahsilId)
      console.log('Available mustahsil:', mustahsil)
      
      // Önce form data'dan bul
      let mustahsilItem = mustahsil.find(m => m.id === formData.mustahsilId)
      
      // Eğer bulunamazsa, record'dan al
      if (!mustahsilItem && record?.mustahsil) {
        mustahsilItem = record.mustahsil
        console.log('Using mustahsil from record:', mustahsilItem)
      }
      
      console.log('Final mustahsil item:', mustahsilItem)
      if (mustahsilItem) {
        return `${mustahsilItem.ad} ${mustahsilItem.soyad}`
      }
      return 'Bilinmeyen Müstahsil'
    }
    return ''
  }

  // QR kod ve barkod oluştur
  const generateQrAndBarcode = async () => {
    if (!record) return
    
    try {
      const qrValue = `${record.fisNo}|${record.tarih}|${record.saticiTipi}|${record.urun.ad}`
      
      // QR kod oluştur
      const QRCodeLib = await import('qrcode')
      const qrDataUrl = await QRCodeLib.toDataURL(qrValue, {
        width: 40,
        margin: 1,
        color: {
          dark: '#000000',
          light: '#FFFFFF'
        }
      })
      
      // Barkod oluştur
      const JsBarcode = await import('jsbarcode')
      const canvas = document.createElement('canvas')
      JsBarcode.default(canvas, record.fisNo, {
        format: 'CODE128',
        width: 1.5,
        height: 30,
        displayValue: true,
        fontSize: 10,
        margin: 3
      })
      const barcodeDataUrl = canvas.toDataURL('image/png')
      
      setQrDataUrl(qrDataUrl)
      setBarcodeDataUrl(barcodeDataUrl)
    } catch (error) {
      console.error('QR kod ve barkod oluşturma hatası:', error)
    }
  }

  // Final receipt modal açıldığında QR kod ve barkod oluştur
  useEffect(() => {
    if (showFinalReceipt && record) {
      generateQrAndBarcode()
    }
  }, [showFinalReceipt, record])

  // Debug: Component state logging
  useEffect(() => {
    console.log('Component state updated:', {
      record,
      formData,
      mustahsil,
      mustahsilLength: mustahsil.length,
      saticiTipi: formData.saticiTipi,
      mustahsilId: formData.mustahsilId
    })
  }, [record, formData, mustahsil])

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

  if (!canEdit) {
    return (
      <div className="p-6">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-foreground">Erişim Reddedildi</h1>
            <p className="text-muted-foreground mt-2">Bu sayfaya erişim yetkiniz bulunmamaktadır.</p>
            <Link href="/dashboard">
              <Button className="mt-4">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Dashboard'a Dön
              </Button>
            </Link>
          </div>
        </div>
      
    )
  }

  if (!record) {
    return (
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
      
    )
  }

  return (
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
              <p className="text-muted-foreground">
                Mal kabul kaydını düzenleyin - {userRole} olarak giriş yapıldı
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
                      readOnly={!canEditBasicInfo}
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
                      readOnly={!canEditBasicInfo}
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
                  <Select 
                    value={formData.saticiTipi || "OZEL_FIRMA"} 
                    onValueChange={(value) => handleInputChange('saticiTipi', value)}
                    disabled={!canEditBasicInfo}
                  >
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
                    <Select 
                      value={formData.ozelFirmaId || ""} 
                      onValueChange={(value) => handleInputChange('ozelFirmaId', value)}
                      disabled={!canEditBasicInfo}
                    >
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
                      <Select 
                        value={formData.komisyoncuId || ""} 
                        onValueChange={(value) => handleInputChange('komisyoncuId', value)}
                        disabled={!canEditBasicInfo}
                      >
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
                      <Select 
                        value={formData.ureticiId || ""} 
                        onValueChange={(value) => handleInputChange('ureticiId', value)}
                        disabled={!canEditBasicInfo}
                      >
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
                {formData.saticiTipi === 'MUSTAHSIL' && (
                  <div className="space-y-2">
                    <Label htmlFor="mustahsilId">Müstahsil *</Label>
                    <Select 
                      value={formData.mustahsilId || ""} 
                      onValueChange={(value) => handleInputChange('mustahsilId', value)}
                      disabled={!canEditBasicInfo}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Müstahsil seçin" />
                      </SelectTrigger>
                      <SelectContent>
                        {mustahsil.map((m) => (
                          <SelectItem key={m.id} value={m.id}>
                            {m.ad} {m.soyad}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
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
                  <Select 
                    value={formData.urunId || ""} 
                    onValueChange={(value) => handleInputChange('urunId', value)}
                    disabled={!canEditBasicInfo}
                  >
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
                    readOnly={!canEditBasicInfo}
                  />
                  <div className="text-xs text-muted-foreground">
                    İlk mal kabul yapılırken verilen kasa sayısı
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Ağırlık Bilgileri */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Scale className="h-5 w-5" />
                  Ağırlık Bilgileri
                </CardTitle>
                <CardDescription>Ağırlık hesaplamaları</CardDescription>
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
                      readOnly={!canEditBasicInfo}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="daraKg">Dara KG *</Label>
                    <Input
                      id="daraKg"
                      type="number"
                      step="0.01"
                      min="0"
                      value={formData.daraKg}
                      onChange={(e) => handleInputChange('daraKg', e.target.value)}
                      placeholder="0.00"
                      required
                      readOnly={!canEditBasicInfo}
                    />
                    <div className="text-xs text-muted-foreground">
                      Kasa ve ambalaj ağırlığı toplamı
                    </div>
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

                <div className="space-y-2">
                  <Label htmlFor="netKg">Net KG (Ürün Son Durumu)</Label>
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
              </CardContent>
            </Card>

            {/* Durum ve Notlar */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5" />
                  Durum ve Notlar
                </CardTitle>
                <CardDescription>Durum güncellemesi ve ek notlar</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="status">Durum</Label>
                  <Select 
                    value={formData.status || "FATURA_BEKLIYOR"} 
                    onValueChange={(value) => handleInputChange('status', value)}
                    disabled={!canChangeStatus}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="FATURA_BEKLIYOR">
                        <div className="flex items-center gap-2">
                          <AlertTriangle className="h-4 w-4 text-yellow-500" />
                          Fatura Bekliyor
                        </div>
                      </SelectItem>
                      <SelectItem value="FATURALANDI">
                        <div className="flex items-center gap-2">
                          <FileText className="h-4 w-4 text-blue-500" />
                          Faturalandı
                        </div>
                      </SelectItem>
                      <SelectItem value="NETLENDI">
                        <div className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          Netlendi (Ürün Son Durumu)
                        </div>
                      </SelectItem>
                      <SelectItem value="TAMAMLANDI">
                        <div className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-600" />
                          Tamamlandı
                        </div>
                      </SelectItem>
                      <SelectItem value="IPTAL">
                        <div className="flex items-center gap-2">
                          <AlertTriangle className="h-4 w-4 text-red-500" />
                          İptal
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  {formData.status === 'NETLENDI' && (
                    <p className="text-xs text-green-600 bg-green-50 p-2 rounded">
                      ✓ Bu ürün netlendi. Satın almacı paneline anında düşecek.
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="notlar">Notlar</Label>
                  <Textarea
                    id="notlar"
                    value={formData.notlar}
                    onChange={(e) => handleInputChange('notlar', e.target.value)}
                    placeholder="Ek notlar, düzenleme bilgileri..."
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

        {/* Son Fiş Yazdırma Modal */}
        {showFinalReceipt && record && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold">Son Fiş Yazdır</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowFinalReceipt(false)}
                className="h-8 w-8 p-0"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="mb-4">
              <p className="text-sm text-gray-600 mb-2">
                Ürün netlendi! Bu fiş ürünün son evrakıdır:
              </p>
              <ul className="text-sm text-gray-600 list-disc list-inside space-y-1">
                <li>Net KG: {formData.netKg} kg</li>
                <li>Çıkma/Fire KG: {formData.cikmaFireKg} kg</li>
                <li>Durum: Netlendi (Ürün Son Durumu)</li>
              </ul>
            </div>

            {/* Son Fiş Önizleme */}
            <div className="mb-4">
              <div className="bg-white border rounded-lg p-6 max-w-sm mx-auto">
                <div className="text-center mb-4">
                  <h3 className="text-lg font-bold">SON FİŞ ÖNİZLEME</h3>
                  <p className="text-sm text-gray-600">80mm Termal Yazıcı</p>
                </div>
                
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="font-semibold">Fiş No:</span>
                    <span>{record.fisNo}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold">Tarih:</span>
                    <span>{new Date(record.tarih).toLocaleDateString('tr-TR')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold">Satıcı:</span>
                    <span>
                      {record.saticiTipi === 'MUSTAHSIL' && record.mustahsil 
                        ? `${record.mustahsil.ad} ${record.mustahsil.soyad}`
                        : record.saticiTipi === 'KOMISYONCU' && record.komisyoncu && record.uretici
                        ? `${record.komisyoncu.dukkanAdi} - ${record.uretici.ad} ${record.uretici.soyad}`
                        : record.saticiTipi === 'OZEL_FIRMA' && record.ozelFirma
                        ? record.ozelFirma.firmaAdi
                        : 'Bilinmeyen'
                      }
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold">Ürün:</span>
                    <span>{record.urun.ad}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold">Net KG:</span>
                    <span className="font-bold">{formData.netKg} kg</span>
                  </div>
                  
                  {qrDataUrl && barcodeDataUrl && (
                    <div className="mt-4 p-3 bg-gray-50 rounded">
                      <div className="text-center text-xs text-gray-600 mb-2">QR Kod ve Barkod</div>
                      <div className="flex justify-center items-center space-x-4">
                        <div className="text-center">
                          <img src={qrDataUrl} alt="QR Kod" className="w-16 h-16 mx-auto" />
                          <div className="text-xs text-gray-500 mt-1">QR Kod</div>
                        </div>
                        <div className="text-center">
                          <img src={barcodeDataUrl} alt="Barkod" className="w-24 h-12 mx-auto" />
                          <div className="text-xs text-gray-500 mt-1">Barkod</div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Yazdırma Butonu */}
            <div className="flex gap-3 justify-center">
                          <Button onClick={async () => {
              try {
                // Son fiş yazdırma işlemi
                const finalReceiptData = {
                  fisNo: record.fisNo,
                  tarih: record.tarih,
                  saticiTipi: record.saticiTipi,
                  saticiAdi: record.saticiTipi === 'MUSTAHSIL' && record.mustahsil 
                    ? `${record.mustahsil.ad} ${record.mustahsil.soyad}`
                    : record.saticiTipi === 'KOMISYONCU' && record.komisyoncu && record.uretici
                    ? `${record.komisyoncu.dukkanAdi} - ${record.uretici.ad} ${record.uretici.soyad}`
                    : record.saticiTipi === 'OZEL_FIRMA' && record.ozelFirma
                    ? record.ozelFirma.firmaAdi
                    : 'Bilinmeyen',
                  urunAdi: record.urun.ad,
                  brutKg: record.brutKg,
                  daraKg: record.daraKg,
                  girisKg: record.girisKg,
                  cikmaFireKg: parseFloat(formData.cikmaFireKg) || 0,
                  netKg: parseFloat(formData.netKg) || 0,
                  ambalajAdi: record.ambalaj?.ad,
                  kasaSayisi: record.kasaSayisi,
                  paletAdi: record.palet?.ad,
                  paletSayisi: record.paletSayisi,
                  notlar: formData.notlar,
                  malKabulcuAdi: record.malKabulcu.firstName + ' ' + record.malKabulcu.lastName
                }
                
                // QR kod ve barkod resimlerini oluştur
                const qrValue = `${finalReceiptData.fisNo}|${finalReceiptData.tarih}|${finalReceiptData.saticiTipi}|${finalReceiptData.urunAdi}`
                
                // QR kod oluştur
                const QRCodeLib = await import('qrcode')
                const qrDataUrl = await QRCodeLib.toDataURL(qrValue, {
                  width: 40,
                  margin: 1,
                  color: {
                    dark: '#000000',
                    light: '#FFFFFF'
                  }
                })
                
                // Barkod oluştur
                const JsBarcode = await import('jsbarcode')
                const canvas = document.createElement('canvas')
                JsBarcode.default(canvas, finalReceiptData.fisNo, {
                  format: 'CODE128',
                  width: 1.5,
                  height: 30,
                  displayValue: true,
                  fontSize: 10,
                  margin: 3
                })
                const barcodeDataUrl = canvas.toDataURL('image/png')
                
                // Fiş verilerini localStorage'a kaydet
                localStorage.setItem('printFinalReceipt', JSON.stringify({
                  ...finalReceiptData,
                  type: 'SON_FIS'
                }))
                
                // Yazdırma penceresini aç
                const printWindow = window.open('', '_blank')
                if (printWindow) {
                  printWindow.document.write(`
                  <!DOCTYPE html>
                  <html>
                    <head>
                      <title>Son Fiş Yazdır</title>
                      <style>
                        body { 
                          font-family: monospace; 
                          font-size: 12px; 
                          width: 80mm; 
                          margin: 0; 
                          padding: 10px;
                        }
                        .header { text-align: center; font-weight: bold; font-size: 16px; margin-bottom: 10px; }
                        .section { margin-bottom: 10px; border-bottom: 1px solid #000; padding-bottom: 5px; }
                        .row { display: flex; justify-content: space-between; margin-bottom: 5px; }
                        .label { font-weight: bold; }
                        .value { text-align: right; }
                        .qr-placeholder { 
                          text-align: center; 
                          margin: 10px 0; 
                          padding: 20px; 
                          border: 2px dashed #ccc;
                          color: #666;
                        }
                        .final-status { 
                          background: #4ade80; 
                          color: white; 
                          padding: 5px; 
                          text-align: center; 
                          font-weight: bold;
                          margin: 10px 0;
                        }
                      </style>
                    </head>
                    <body>
                      <div class="header">WEBRAIN</div>
                      <div class="header">Tarım Ürünleri Yönetim Sistemi</div>
                      <div class="header"></div>
                      
                      <div class="section">
                        <div class="header">SON FİŞ</div>
                        <div class="final-status">ÜRÜN SON EVRAKI</div>
                        <div class="row">
                          <span class="label">Fiş No:</span>
                          <span class="value">${finalReceiptData.fisNo}</span>
                        </div>
                        <div class="row">
                          <span class="label">Tarih:</span>
                          <span class="value">${new Date(finalReceiptData.tarih).toLocaleDateString('tr-TR')}</span>
                        </div>
                        <div class="row">
                          <span class="label">Saat:</span>
                          <span class="value">${new Date(finalReceiptData.tarih).toLocaleTimeString('tr-TR')}</span>
                        </div>
                      </div>
                      
                      <div class="section">
                        <div class="label">SATICI BİLGİLERİ</div>
                        <div>Tip: ${finalReceiptData.saticiTipi}</div>
                        <div class="label">${finalReceiptData.saticiAdi}</div>
                      </div>
                      
                      <div class="section">
                        <div class="label">ÜRÜN BİLGİLERİ</div>
                        <div class="label">${finalReceiptData.urunAdi}</div>
                        ${finalReceiptData.ambalajAdi ? `<div>Ambalaj: ${finalReceiptData.ambalajAdi} x ${finalReceiptData.kasaSayisi}</div>` : ''}
                        ${finalReceiptData.paletAdi && finalReceiptData.paletSayisi ? `<div>Palet: ${finalReceiptData.paletAdi} x ${finalReceiptData.paletSayisi}</div>` : ''}
                      </div>
                      
                      <div class="section">
                        <div class="label">AĞIRLIK BİLGİLERİ</div>
                        <div class="row">
                          <span>Brüt KG:</span>
                          <span class="value">${finalReceiptData.brutKg.toFixed(2)} kg</span>
                        </div>
                        <div class="row">
                          <span>Dara KG:</span>
                          <span>${finalReceiptData.daraKg.toFixed(2)} kg</span>
                        </div>
                        <div class="row">
                          <span>Giriş KG:</span>
                          <span>${finalReceiptData.girisKg.toFixed(2)} kg</span>
                        </div>
                        <div class="row">
                          <span>Çıkma/Fire KG:</span>
                          <span>${finalReceiptData.cikmaFireKg.toFixed(2)} kg</span>
                        </div>
                        <div class="row">
                          <span>Net KG:</span>
                          <span class="value" style="font-size: 16px; font-weight: bold;">${finalReceiptData.netKg.toFixed(2)} kg</span>
                        </div>
                      </div>
                      
                      ${finalReceiptData.notlar ? `
                      <div class="section">
                        <div class="label">NOTLAR</div>
                        <div>${finalReceiptData.notlar}</div>
                      </div>
                      ` : ''}
                      
                      <div class="section">
                        <div>Mal Kabulcu:</div>
                        <div class="label">${finalReceiptData.malKabulcuAdi}</div>
                      </div>
                      
                      <div class="section">
                        <div class="label">QR KOD VE BARKOD</div>
                        <div style="text-align: center; margin: 8px 0;">
                          <div style="font-size: 8px; color: #888; line-height: 1.2; margin-bottom: 8px;">
                            Bu fiş ürünün son evrakıdır
                          </div>
                          <div style="margin-top: 8px; padding: 6px; background: #f0f0f0; border-radius: 3px;">
                            <div style="font-size: 7px; color: #666; margin-bottom: 4px;">QR Kod</div>
                            <img src="${qrDataUrl}" alt="QR Kod" style="width: 40px; height: 40px; margin: 0 auto; display: block;" />
                            <div style="font-size: 7px; color: #666; margin-top: 4px;">Barkod</div>
                            <img src="${barcodeDataUrl}" alt="Barkod" style="width: 60px; height: 30px; margin: 0 auto; display: block;" />
                          </div>
                        </div>
                      </div>
                      
                      <div style="text-align: center; margin-top: 20px;">
                        <div style="font-size: 10px; color: #666;">
                          Ürün işlemi tamamlandı
                        </div>
                        <div style="font-size: 10px; margin-top: 5px;">
                          ${new Date().toLocaleDateString('tr-TR')} - ${new Date().toLocaleTimeString('tr-TR')}
                        </div>
                      </div>
                    </body>
                  </html>
                `)
                
                printWindow.document.close()
                
                // Yazdırma işlemini başlat
                setTimeout(() => {
                  printWindow.print()
                  printWindow.close()
                }, 100)
              }
              
              toast({
                title: "Son Fiş Yazdırılıyor",
                description: "Son fiş yazdırma penceresi açıldı",
                variant: "success",
              })
            } catch (error) {
              console.error('Son fiş yazdırma hatası:', error)
              toast({
                title: "Hata",
                description: "Son fiş yazdırılırken hata oluştu",
                variant: "destructive",
              })
            }
          }} className="flex-1 max-w-xs">
                <Printer className="mr-2 h-4 w-4" />
                Son Fiş Yazdır
              </Button>
            </div>

            <div className="mt-4 text-center">
              <Button 
                onClick={() => {
                  setShowFinalReceipt(false)
                  router.push('/dashboard')
                }}
                variant="outline"
              >
                Tamamlandı
              </Button>
            </div>
          </div>
        </div>
        )}
      </div>
    )
  }
