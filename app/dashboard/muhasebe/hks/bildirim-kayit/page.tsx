'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { ArrowLeft, ArrowRight, Save, User, Package, MapPin, Calendar } from 'lucide-react';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

interface Sifat {
  id: number;
  ad: string;
  aciklama: string;
}

interface Ulke {
  id: string;
  ad: string;
}

interface Il {
  id: string;
  ad: string;
}

interface Ilce {
  id: string;
  ad: string;
}

interface Urun {
  id: string;
  ad: string;
}

interface UrunCinsi {
  id: string;
  ad: string;
  urunId: string;
  uretimSekliId: string;
  urunKodu: string;
  ithalmi: boolean;
}

interface BildirimFormData {
  // Adım 1: Bildirimciye Ait Bilgiler
  bildirimciTcKimlikVergiNo: string;
  bildirimciSifat: string;
  bildirimciAdSoyadUnvan: string;
  
  // Bildirim Genel Bilgileri
  bildirimTuru: string; // Satın Alım, Satış
  
  // Kimden veya Kime Bilgileri
  kisiTcKimlikVergiNo: string;
  kisiAdSoyadUnvan: string;
  kisiDogumTarihi: string;
  kisiGsmNumarasi: string;
  kisiEmail: string;
  kisiSifat: string;
  
  // Adım 2: Ürün Bilgileri
  urunId: string;
  urunCinsiId: string;
  miktar: string;
  birim: string;
  fiyat: string;
  
  // Adım 3: Konum Bilgileri
  ulkeId: string;
  ilId: string;
  ilceId: string;
  adres: string;
}

export default function HKSBildirimKayitPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [sifatlar, setSifatlar] = useState<Sifat[]>([]);
  const [ulkeler, setUlkeler] = useState<Ulke[]>([]);
  const [iller, setIller] = useState<Il[]>([]);
  const [ilceler, setIlceler] = useState<Ilce[]>([]);
  const [urunler, setUrunler] = useState<Urun[]>([]);
  const [urunCinsleri, setUrunCinsleri] = useState<UrunCinsi[]>([]);
  
  const [formData, setFormData] = useState<BildirimFormData>({
    bildirimciTcKimlikVergiNo: '',
    bildirimciSifat: '',
    bildirimciAdSoyadUnvan: '',
    bildirimTuru: '',
    kisiTcKimlikVergiNo: '',
    kisiAdSoyadUnvan: '',
    kisiDogumTarihi: '',
    kisiGsmNumarasi: '',
    kisiEmail: '',
    kisiSifat: '',
    urunId: '',
    urunCinsiId: '',
    miktar: '',
    birim: '',
    fiyat: '',
    ulkeId: '',
    ilId: '',
    ilceId: '',
    adres: ''
  });

  // Safe fetch wrapper
  const safeFetch = async (url: string, options?: RequestInit) => {
    try {
      const response = await fetch(url, options)
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`)
      }
      return await response.json()
    } catch (error: any) {
      console.error('Fetch error:', error)
      throw error
    }
  }

  const loadSifatlar = async () => {
    try {
      setSifatlar([
        { id: 2, ad: 'İhracat', aciklama: 'İhracat sıfatı' },
        { id: 6, ad: 'Tüccar (Hal İçi)', aciklama: 'Hal içi tüccar sıfatı' }
      ])
    } catch (error: any) {
      console.error('Sıfatlar yüklenemedi:', error?.message);
    }
  }

  const loadUlkeler = async () => {
    try {
      const data = await safeFetch('/api/hks/genel/ulkeler', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({})
      })
      
      if (data.ok && data.items) {
        setUlkeler(data.items)
      }
    } catch (error: any) {
      console.error('Ülkeler yüklenemedi:', error?.message);
    }
  }

  const loadIller = async () => {
    try {
      const data = await safeFetch('/api/hks/genel/iller', {
        method: 'GET'
      })
      
      if (data.ok && data.items) {
        setIller(data.items)
      }
    } catch (error: any) {
      console.error('İller yüklenemedi:', error?.message);
    }
  }

  const loadIlceler = async (ilId: string) => {
    if (!ilId) return;
    
    try {
      const data = await safeFetch('/api/hks/genel/ilceler', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ilId })
      })
      
      if (data.ok && data.items) {
        setIlceler(data.items)
      }
    } catch (error: any) {
      console.error('İlçeler yüklenemedi:', error?.message);
    }
  }

  const loadUrunler = async () => {
    try {
      const data = await safeFetch('/api/hks/urun/urunler', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({})
      })
      
      if (data.ok && data.items) {
        setUrunler(data.items)
      }
    } catch (error: any) {
      console.error('Ürünler yüklenemedi:', error?.message);
    }
  }

  const loadUrunCinsleri = async (urunId: string) => {
    if (!urunId) return;
    
    try {
      const data = await safeFetch('/api/hks/urun/cinsler', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ urunId })
      })
      
      if (data.ok && data.items) {
        setUrunCinsleri(data.items)
      }
    } catch (error: any) {
      console.error('Ürün cinsleri yüklenemedi:', error?.message);
    }
  }

  useEffect(() => {
    loadSifatlar()
    loadUlkeler()
    loadIller()
    loadUrunler()
  }, [])

  useEffect(() => {
    if (formData.ilId) {
      loadIlceler(formData.ilId)
    }
  }, [formData.ilId])

  useEffect(() => {
    if (formData.urunId) {
      loadUrunCinsleri(formData.urunId)
    }
  }, [formData.urunId])

  const handleInputChange = (field: keyof BildirimFormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const nextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = async () => {
    setLoading(true)
    try {
      // TODO: Bildirim kayıt API'sini implement et
      console.log('Bildirim kayıt verisi:', formData)
      toast.success('Bildirim başarıyla kaydedildi!')
      router.push('/dashboard/muhasebe/hks')
    } catch (error: any) {
      console.error('Bildirim kayıt hatası:', error)
      toast.error('Bildirim kaydedilemedi: ' + error?.message)
    } finally {
      setLoading(false)
    }
  }

  const renderStep1 = () => (
    <div className="space-y-8">
      {/* Bildirimciye Ait Bilgiler */}
      <div>
        <h3 className="text-lg font-semibold mb-4 text-blue-600">Bildirimciye Ait Bilgiler</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label htmlFor="bildirimciTcKimlikVergiNo">T.C. Kimlik / Vergi No *</Label>
            <Input
              id="bildirimciTcKimlikVergiNo"
              value={formData.bildirimciTcKimlikVergiNo}
              onChange={(e) => handleInputChange('bildirimciTcKimlikVergiNo', e.target.value)}
              placeholder="T.C. Kimlik veya Vergi No"
            />
          </div>
          
          <div>
            <Label htmlFor="bildirimciSifat">Sıfat *</Label>
            <Select value={formData.bildirimciSifat} onValueChange={(value) => handleInputChange('bildirimciSifat', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Sıfat seçin" />
              </SelectTrigger>
              <SelectContent>
                {sifatlar.map((sifat) => (
                  <SelectItem key={sifat.id} value={sifat.id.toString()}>
                    {sifat.ad}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="md:col-span-2">
            <Label htmlFor="bildirimciAdSoyadUnvan">Ad Soyadı / Unvanı *</Label>
            <Input
              id="bildirimciAdSoyadUnvan"
              value={formData.bildirimciAdSoyadUnvan}
              onChange={(e) => handleInputChange('bildirimciAdSoyadUnvan', e.target.value)}
              placeholder="Ad Soyadı veya Unvan"
            />
          </div>
        </div>
      </div>

      {/* Bildirim Genel Bilgileri */}
      <div>
        <h3 className="text-lg font-semibold mb-4 text-green-600">Bildirim Genel Bilgileri</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label htmlFor="bildirimTuru">Bildirim Türü *</Label>
            <Select value={formData.bildirimTuru} onValueChange={(value) => handleInputChange('bildirimTuru', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Bildirim türü seçin" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="satinalim">Satın Alım</SelectItem>
                <SelectItem value="satis">Satış</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Kimden veya Kime Bilgileri */}
      <div>
        <h3 className="text-lg font-semibold mb-4 text-orange-600">Kimden veya Kime Bilgileri</h3>
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
          <p className="text-yellow-800 text-sm">
            <strong>Uyarı:</strong> Sorguladığınız kişi kayıtlı değil. Lütfen kişinin bilgilerini giriniz.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label htmlFor="kisiTcKimlikVergiNo">T.C. Kimlik / Vergi No *</Label>
            <Input
              id="kisiTcKimlikVergiNo"
              value={formData.kisiTcKimlikVergiNo}
              onChange={(e) => handleInputChange('kisiTcKimlikVergiNo', e.target.value)}
              placeholder="T.C. Kimlik veya Vergi No"
            />
          </div>
          
          <div>
            <Label htmlFor="kisiAdSoyadUnvan">Ad Soyadı / Unvanı *</Label>
            <Input
              id="kisiAdSoyadUnvan"
              value={formData.kisiAdSoyadUnvan}
              onChange={(e) => handleInputChange('kisiAdSoyadUnvan', e.target.value)}
              placeholder="Ad Soyadı veya Unvan"
            />
          </div>
          
          <div>
            <Label htmlFor="kisiDogumTarihi">Doğum Tarihi *</Label>
            <Input
              id="kisiDogumTarihi"
              type="date"
              value={formData.kisiDogumTarihi}
              onChange={(e) => handleInputChange('kisiDogumTarihi', e.target.value)}
            />
          </div>
          
          <div>
            <Label htmlFor="kisiGsmNumarasi">GSM Numarası *</Label>
            <Input
              id="kisiGsmNumarasi"
              value={formData.kisiGsmNumarasi}
              onChange={(e) => handleInputChange('kisiGsmNumarasi', e.target.value)}
              placeholder="(5XX) XXX XX XX"
              className="border-red-300 focus:border-red-500"
            />
          </div>
          
          <div>
            <Label htmlFor="kisiEmail">E-posta</Label>
            <Input
              id="kisiEmail"
              type="email"
              value={formData.kisiEmail}
              onChange={(e) => handleInputChange('kisiEmail', e.target.value)}
              placeholder="email@example.com"
            />
          </div>
          
          <div>
            <Label htmlFor="kisiSifat">Sıfatı *</Label>
            <Select value={formData.kisiSifat} onValueChange={(value) => handleInputChange('kisiSifat', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Sıfat seçin" />
              </SelectTrigger>
              <SelectContent>
                {sifatlar.map((sifat) => (
                  <SelectItem key={sifat.id} value={sifat.id.toString()}>
                    {sifat.ad}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </div>
  )

  const renderStep2 = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Label htmlFor="urunId">Ürün *</Label>
          <Select value={formData.urunId} onValueChange={(value) => handleInputChange('urunId', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Ürün seçin" />
            </SelectTrigger>
            <SelectContent>
              {urunler.map((urun) => (
                <SelectItem key={urun.id} value={urun.id}>
                  {urun.ad}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <Label htmlFor="urunCinsiId">Ürün Cinsi *</Label>
          <Select 
            value={formData.urunCinsiId} 
            onValueChange={(value) => handleInputChange('urunCinsiId', value)}
            disabled={!formData.urunId}
          >
            <SelectTrigger>
              <SelectValue placeholder="Ürün cinsi seçin" />
            </SelectTrigger>
            <SelectContent>
              {urunCinsleri.map((cins) => (
                <SelectItem key={cins.id} value={cins.id}>
                  {cins.ad}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <Label htmlFor="miktar">Miktar *</Label>
          <Input
            id="miktar"
            type="number"
            value={formData.miktar}
            onChange={(e) => handleInputChange('miktar', e.target.value)}
            placeholder="Miktar"
          />
        </div>
        
        <div>
          <Label htmlFor="birim">Birim *</Label>
          <Input
            id="birim"
            value={formData.birim}
            onChange={(e) => handleInputChange('birim', e.target.value)}
            placeholder="Kg, Ton, Adet vb."
          />
        </div>
        
        <div>
          <Label htmlFor="fiyat">Birim Fiyat *</Label>
          <Input
            id="fiyat"
            type="number"
            step="0.01"
            value={formData.fiyat}
            onChange={(e) => handleInputChange('fiyat', e.target.value)}
            placeholder="0.00"
          />
        </div>
      </div>
    </div>
  )

  const renderStep3 = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Label htmlFor="ulkeId">Ülke *</Label>
          <Select value={formData.ulkeId} onValueChange={(value) => handleInputChange('ulkeId', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Ülke seçin" />
            </SelectTrigger>
            <SelectContent>
              {ulkeler.map((ulke) => (
                <SelectItem key={ulke.id} value={ulke.id}>
                  {ulke.ad}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <Label htmlFor="ilId">İl *</Label>
          <Select value={formData.ilId} onValueChange={(value) => handleInputChange('ilId', value)}>
            <SelectTrigger>
              <SelectValue placeholder="İl seçin" />
            </SelectTrigger>
            <SelectContent>
              {iller.map((il) => (
                <SelectItem key={il.id} value={il.id}>
                  {il.ad}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <Label htmlFor="ilceId">İlçe *</Label>
          <Select 
            value={formData.ilceId} 
            onValueChange={(value) => handleInputChange('ilceId', value)}
            disabled={!formData.ilId}
          >
            <SelectTrigger>
              <SelectValue placeholder="İlçe seçin" />
            </SelectTrigger>
            <SelectContent>
              {ilceler.map((ilce) => (
                <SelectItem key={ilce.id} value={ilce.id}>
                  {ilce.ad}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <Label htmlFor="adres">Adres *</Label>
          <Input
            id="adres"
            value={formData.adres}
            onChange={(e) => handleInputChange('adres', e.target.value)}
            placeholder="Detaylı adres bilgisi"
          />
        </div>
      </div>
    </div>
  )

  const getStepTitle = () => {
    switch (currentStep) {
      case 1: return 'Bildirimci ve Kişi Bilgileri'
      case 2: return 'Ürün Bilgileri'
      case 3: return 'Konum Bilgileri'
      default: return 'Bildirim Kayıt'
    }
  }

  const getStepIcon = () => {
    switch (currentStep) {
      case 1: return <User className="h-5 w-5" />
      case 2: return <Package className="h-5 w-5" />
      case 3: return <MapPin className="h-5 w-5" />
      default: return <Calendar className="h-5 w-5" />
    }
  }

  return (
    <div className="mt-10 ml-10 mr-10 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">HKS - Bildirim Kayıt</h1>
          <p className="text-muted-foreground mt-2">Yeni bildirim kaydı oluşturun</p>
        </div>
        <Button 
          variant="outline" 
          onClick={() => router.push('/dashboard/muhasebe/hks')}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Geri Dön
        </Button>
      </div>

      {/* Progress Steps */}
      <div className="flex items-center justify-center space-x-8">
        {[1, 2, 3].map((step) => (
          <div key={step} className="flex items-center">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
              currentStep >= step 
                ? 'bg-blue-500 text-white' 
                : 'bg-gray-200 text-gray-600'
            }`}>
              {step}
            </div>
            {step < 3 && (
              <div className={`w-16 h-1 mx-4 ${
                currentStep > step ? 'bg-blue-500' : 'bg-gray-200'
              }`} />
            )}
          </div>
        ))}
      </div>

      {/* Form Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            {getStepIcon()}
            {getStepTitle()}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {currentStep === 1 && renderStep1()}
          {currentStep === 2 && renderStep2()}
          {currentStep === 3 && renderStep3()}
          
          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8">
            <Button 
              variant="outline" 
              onClick={prevStep}
              disabled={currentStep === 1}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Önceki
            </Button>
            
            {currentStep < 3 ? (
              <Button onClick={nextStep}>
                Sonraki
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            ) : (
              <Button onClick={handleSubmit} disabled={loading}>
                <Save className="h-4 w-4 mr-2" />
                {loading ? 'Kaydediliyor...' : 'Kaydet'}
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
