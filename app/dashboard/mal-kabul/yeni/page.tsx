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
  Loader2,
  X
} from 'lucide-react'
import { QRCode } from '@/components/ui/qr-code'
import { Barcode } from '@/components/ui/barcode'
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
  firmaNo: string
}

interface Komisyoncu {
  id: string
  dukkanAdi: string
  sehir: string
  komisyonNo: string
  komisyonKodu: string
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



export default function YeniMalKabul() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    cariKodu: '', // Yeni: Hızlı cari kodu (Kom001, M001, O001)
    cariId: '', // Yeni: Seçilen cari ID'si
    cariTipi: '', // Yeni: Otomatik belirlenen cari tipi
    urunKodu: '', // Yeni: Hızlı ürün kodu (U001, U002)
    urunId: '', // Yeni: Seçilen ürün ID'si
    paletId: '',
    ambalajId: '',
    paletSayisi: '',
    kasaSayisi: '',
    brutKg: '',
    daraKg: '', // Manuel giriş
    girisKg: '',
    cikmaFireKg: '',
    netKg: '',
    notlar: '',
    // Eski alanlar (geriye uyumluluk için)
    saticiTipi: '',
    komisyoncuId: '',
    ureticiId: '',
    mustahsilId: '',
    ozelFirmaId: ''
  })
  const [filteredUreticiler, setFilteredUreticiler] = useState<Uretici[]>([])

  const [ozelFirmalar, setOzelFirmalar] = useState<OzelFirma[]>([])
  const [komisyoncular, setKomisyoncular] = useState<Komisyoncu[]>([])
  const [mustahsil, setMustahsil] = useState<{ id: string; ad: string; soyad: string; tcKimlikNo: string; mustahsilNo: string }[]>([])
  const [ambalajlar, setAmbalajlar] = useState<Ambalaj[]>([])
  const [urunler, setUrunler] = useState<{ id: string; ad: string; kategori?: string; birim: string; stokKodu: string }[]>([])
  const [loading, setLoading] = useState(false)
  const [showReceipt, setShowReceipt] = useState(false)
  const [receiptData, setReceiptData] = useState<any>(null)
  
  // Yeni: Hızlı kod sistemi için state'ler
  const [cariSuggestions, setCariSuggestions] = useState<any[]>([])
  const [urunSuggestions, setUrunSuggestions] = useState<any[]>([])
  const [showCariSuggestions, setShowCariSuggestions] = useState(false)
  const [showUrunSuggestions, setShowUrunSuggestions] = useState(false)

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login')
    } else if (status === 'authenticated') {
      fetchOzelFirmalar()
      fetchKomisyoncular()
      fetchMustahsil()
      fetchAmbalajlar()
      fetchUrunler()
    }
  }, [status, router])

  // Global keyboard listener için state
  const [globalInput, setGlobalInput] = useState('')
  const [showGlobalSuggestions, setShowGlobalSuggestions] = useState(false)
  const [globalSuggestions, setGlobalSuggestions] = useState<any[]>([])

  // Global keyboard listener
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      console.log('🔍 Global KeyPress:', e.key, 'Active Element:', document.activeElement?.tagName)
      
      // Eğer herhangi bir input aktifse, global listener'ı devre dışı bırak
      if (document.activeElement?.tagName === 'INPUT' || document.activeElement?.tagName === 'TEXTAREA' || document.activeElement?.tagName === 'SELECT') {
        console.log('❌ Input aktif, global listener devre dışı')
        return
      }

      // Sadece sayı ve harf tuşlarına tepki ver
      if (e.key.length === 1 && /[a-zA-Z0-9]/.test(e.key)) {
        console.log('✅ Geçerli tuş:', e.key)
        setGlobalInput(prev => {
          const newInput = prev + e.key
          console.log('📝 Global Input güncellendi:', newInput)
          return newInput
        })
        setShowGlobalSuggestions(true)
        
        // 5 saniye sonra input'u temizle
        setTimeout(() => {
          setGlobalInput('')
          setShowGlobalSuggestions(false)
          setGlobalSuggestions([])
          console.log('⏰ Global input temizlendi')
        }, 5000)
      }
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      // Backspace ile son karakteri sil
      if (e.key === 'Backspace' && !document.activeElement?.tagName) {
        setGlobalInput(prev => prev.slice(0, -1))
      }
      
      // Enter ile seçim yap
      if (e.key === 'Enter' && globalSuggestions.length > 0) {
        if (globalSuggestions[0]) {
          handleGlobalSelect(globalSuggestions[0])
        }
      }
      
      // Escape ile kapat
      if (e.key === 'Escape') {
        setGlobalInput('')
        setShowGlobalSuggestions(false)
        setGlobalSuggestions([])
      }
    }

    window.addEventListener('keypress', handleKeyPress)
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keypress', handleKeyPress)
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [globalSuggestions])

  // Global input değiştiğinde önerileri güncelle
  useEffect(() => {
    console.log('🔄 Global Input değişti:', globalInput, 'Uzunluk:', globalInput.length)
    
    if (globalInput.length >= 2) {
      const suggestions: any[] = []
      console.log('🔍 Öneriler aranıyor...')
      
      // Komisyoncu arama (kom0001, kom0002...)
      if (globalInput.toLowerCase().startsWith('kom')) {
        console.log('🏪 Komisyoncu aranıyor:', globalInput)
        komisyoncular.forEach(kom => {
          console.log('🔍 Kontrol edilen:', kom.komisyonKodu, 'ID:', kom.id)
          if (kom.komisyonKodu.toLowerCase().includes(globalInput.toLowerCase()) || 
              kom.dukkanAdi.toLowerCase().includes(globalInput.toLowerCase().substring(3))) {
            suggestions.push({
              id: kom.id,
              kod: kom.komisyonKodu,
              ad: kom.dukkanAdi,
              tip: 'KOMISYONCU',
              data: kom,
              type: 'cari'
            })
            console.log('✅ Komisyoncu bulundu:', kom.dukkanAdi)
          }
        })
      }
      
      // Müstahsil arama (MÜS001, MÜS002...)
      if (globalInput.toLowerCase().startsWith('müs')) {
        mustahsil.forEach(mus => {
          if (mus.mustahsilNo.toLowerCase().includes(globalInput.toLowerCase()) || 
              mus.ad.toLowerCase().includes(globalInput.toLowerCase().substring(3))) {
            suggestions.push({
              id: mus.id,
              kod: mus.mustahsilNo,
              ad: `${mus.ad} ${mus.soyad}`,
              tip: 'MUSTAHSIL',
              data: mus,
              type: 'cari'
            })
          }
        })
      }
      
      // Özel firma arama (FRM001, FRM002...)
      if (globalInput.toLowerCase().startsWith('frm')) {
        ozelFirmalar.forEach(firma => {
          if (firma.firmaNo.toLowerCase().includes(globalInput.toLowerCase()) || 
              firma.firmaAdi.toLowerCase().includes(globalInput.toLowerCase().substring(3))) {
            suggestions.push({
              id: firma.id,
              kod: firma.firmaNo,
              ad: firma.firmaAdi,
              tip: 'OZEL_FIRMA',
              data: firma,
              type: 'cari'
            })
          }
        })
      }
      
      // Ürün arama (URN001, URN002...)
      if (globalInput.toLowerCase().startsWith('urn')) {
        console.log('🍅 Ürün aranıyor:', globalInput)
        urunler.forEach(urun => {
          console.log('🔍 Kontrol edilen:', urun.stokKodu, urun.ad, 'ID:', urun.id)
          if (urun.stokKodu.toLowerCase().includes(globalInput.toLowerCase()) || 
              urun.ad.toLowerCase().includes(globalInput.toLowerCase().substring(3))) {
            suggestions.push({
              id: urun.id,
              kod: urun.stokKodu,
              ad: urun.ad,
              tip: 'URUN',
              data: urun,
              type: 'urun'
            })
          }
        })
      }
      
      console.log('📋 Bulunan öneriler:', suggestions)
      setGlobalSuggestions(suggestions)
      setShowGlobalSuggestions(suggestions.length > 0)
      console.log('👁️ Öneriler gösteriliyor:', suggestions.length > 0)
    } else {
      setShowGlobalSuggestions(false)
      setGlobalSuggestions([])
      console.log('❌ Öneriler gizlendi')
    }
  }, [globalInput, komisyoncular, mustahsil, ozelFirmalar, urunler])

  // Global seçim işlemi
  const handleGlobalSelect = async (item: any) => {
    if (item.type === 'cari') {
      // Cari tipine göre form alanlarını güncelle
      if (item.tip === 'KOMISYONCU') {
        setFormData(prev => ({
          ...prev,
          cariKodu: item.kod,
          cariId: item.id,
          cariTipi: 'KOMISYONCU',
          saticiTipi: 'KOMISYONCU',
          komisyoncuId: item.id,
          ureticiId: '',
          mustahsilId: '',
          ozelFirmaId: ''
        }))
        
        // Komisyoncu seçildiğinde üreticileri getir
        if (item.id) {
          try {
            const response = await fetch(`/api/ureticiler?komisyoncuId=${item.id}`)
            if (response.ok) {
              const data = await response.json()
              setFilteredUreticiler(data)
              console.log('Komisyoncuya bağlı üreticiler:', data)
            } else {
              console.error('Üretici listesi alınamadı')
              setFilteredUreticiler([])
            }
          } catch (error) {
            console.error('Üretici listesi hatası:', error)
            setFilteredUreticiler([])
          }
        }
      } else if (item.tip === 'MUSTAHSIL') {
        setFormData(prev => ({
          ...prev,
          cariKodu: item.kod,
          cariId: item.id,
          cariTipi: 'MUSTAHSIL',
          saticiTipi: 'MUSTAHSIL',
          mustahsilId: item.id,
          komisyoncuId: '',
          ureticiId: '',
          ozelFirmaId: ''
        }))
      } else if (item.tip === 'OZEL_FIRMA') {
        setFormData(prev => ({
          ...prev,
          cariKodu: item.kod,
          cariId: item.id,
          cariTipi: 'OZEL_FIRMA',
          saticiTipi: 'OZEL_FIRMA',
          ozelFirmaId: item.id,
          komisyoncuId: '',
          ureticiId: '',
          mustahsilId: ''
        }))
      }
      
      toast({
        title: "Cari Seçildi",
        description: `${item.ad} (${item.tip}) seçildi`,
        variant: "success",
      })
    } else if (item.type === 'urun') {
      setFormData(prev => ({
        ...prev,
        urunKodu: item.kod,
        urunId: item.id
      }))
      
      toast({
        title: "Ürün Seçildi",
        description: `${item.ad} seçildi`,
        variant: "success",
      })
    }
    
    setGlobalInput('')
    setShowGlobalSuggestions(false)
    setGlobalSuggestions([])
  }

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

  const fetchMustahsil = async () => {
    try {
      const response = await fetch('/api/mustahsil?status=AKTIF')
      if (response.ok) {
        const data = await response.json()
        setMustahsil(data)
      } else {
        console.error('Müstahsil listesi alınamadı')
      }
    } catch (error) {
      console.error('Müstahsil listesi hatası:', error)
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

  // Yeni: Hızlı cari kod sistemi
  const handleCariKoduChange = (value: string) => {
    setFormData(prev => ({ ...prev, cariKodu: value }))
    
    if (value.length >= 2) {
      const suggestions: any[] = []
      
      // Komisyoncu arama (kom0001, kom0002...)
      if (value.toLowerCase().startsWith('kom')) {
        komisyoncular.forEach(kom => {
          if (kom.komisyonKodu.toLowerCase().includes(value.toLowerCase()) || 
              kom.dukkanAdi.toLowerCase().includes(value.toLowerCase().substring(3)) || 
              kom.id.toLowerCase().includes(value.toLowerCase())) {
            suggestions.push({
              id: kom.id,
              kod: kom.komisyonKodu,
              ad: kom.dukkanAdi,
              tip: 'KOMISYONCU',
              data: kom
            })
          }
        })
      }
      
      // Müstahsil arama (M001, M002...)
      if (value.toLowerCase().startsWith('m')) {
        mustahsil.forEach(mus => {
          if (mus.ad.toLowerCase().includes(value.toLowerCase().substring(1)) || 
              mus.id.toLowerCase().includes(value.toLowerCase())) {
            suggestions.push({
              id: mus.id,
              kod: `M${mus.id}`,
              ad: `${mus.ad} ${mus.soyad}`,
              tip: 'MUSTAHSIL',
              data: mus
            })
          }
        })
      }
      
      // Özel firma arama (O001, O002...)
      if (value.toLowerCase().startsWith('o')) {
        ozelFirmalar.forEach(firma => {
          if (firma.firmaAdi.toLowerCase().includes(value.toLowerCase().substring(1)) || 
              firma.id.toLowerCase().includes(value.toLowerCase())) {
            suggestions.push({
              id: firma.id,
              kod: `O${firma.id}`,
              ad: firma.firmaAdi,
              tip: 'OZEL_FIRMA',
              data: firma
            })
          }
        })
      }
      
      setCariSuggestions(suggestions)
      setShowCariSuggestions(suggestions.length > 0)
    } else {
      setShowCariSuggestions(false)
      setCariSuggestions([])
    }
  }

  // Cari seçimi
  const handleCariSelect = (cari: any) => {
    setFormData(prev => ({
      ...prev,
      cariKodu: cari.kod,
      cariId: cari.id,
      cariTipi: cari.tip
    }))
    setShowCariSuggestions(false)
    setCariSuggestions([])
    
    toast({
      title: "Cari Seçildi",
      description: `${cari.ad} (${cari.tip}) seçildi`,
      variant: "success",
    })
  }

  // Hızlı ürün kodu sistemi
  const handleUrunKoduChange = (value: string) => {
    setFormData(prev => ({ ...prev, urunKodu: value }))
    
    if (value.length >= 2) {
      const suggestions: any[] = urunler.map(urun => {
        let urunKodu = ''
        
        // Ürün adına göre kod oluştur
        if (urun.ad.toLowerCase().includes('domates')) {
          urunKodu = `DOM${urun.id.slice(-3)}`
        } else if (urun.ad.toLowerCase().includes('salatalık') || urun.ad.toLowerCase().includes('salatalik')) {
          urunKodu = `SAL${urun.id.slice(-3)}`
        } else if (urun.ad.toLowerCase().includes('patlıcan') || urun.ad.toLowerCase().includes('patlican')) {
          urunKodu = `PAT${urun.id.slice(-3)}`
        } else if (urun.ad.toLowerCase().includes('biber')) {
          urunKodu = `BIB${urun.id.slice(-3)}`
        } else if (urun.ad.toLowerCase().includes('hıyar') || urun.ad.toLowerCase().includes('hiyar')) {
          urunKodu = `HIY${urun.id.slice(-3)}`
        } else {
          urunKodu = `URN${urun.id.slice(-3)}`
        }
        
        return {
          id: urun.id,
          kod: urunKodu,
          ad: urun.ad,
          data: urun
        }
      }).filter(urun => 
        urun.kod.toLowerCase().includes(value.toLowerCase()) ||
        urun.ad.toLowerCase().includes(value.toLowerCase())
      )
      
      setUrunSuggestions(suggestions)
      setShowUrunSuggestions(suggestions.length > 0)
    } else {
      setShowUrunSuggestions(false)
      setUrunSuggestions([])
    }
  }

  // Ürün seçimi
  const handleUrunSelect = (urun: any) => {
    setFormData(prev => ({
      ...prev,
      urunKodu: urun.kod,
      urunId: urun.id
    }))
    setShowUrunSuggestions(false)
    setUrunSuggestions([])
    
    toast({
      title: "Ürün Seçildi",
      description: `${urun.ad} seçildi`,
      variant: "success",
    })
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
      notlar: ''
    })

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
    
    // Yeni validation sistemi
    if (!formData.cariId) {
      toast({
        title: "Hata",
        description: "Cari seçimi zorunludur",
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
    
    if (!formData.brutKg) {
      toast({
        title: "Hata",
        description: "Brüt KG alanı zorunludur",
        variant: "destructive",
      })
      return
    }
    
    if (!formData.daraKg) {
      toast({
        title: "Hata",
        description: "Dara KG alanı zorunludur",
        variant: "destructive",
      })
      return
    }
    
    if (!formData.girisKg) {
      toast({
        title: "Hata",
        description: "Giriş KG alanı zorunludur",
        variant: "destructive",
      })
      return
    }
    
    if (!formData.kasaSayisi || parseInt(formData.kasaSayisi) <= 0) {
      toast({
        title: "Hata",
        description: "Kasa sayısı 0'dan büyük olmalıdır",
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
          saticiTipi: formData.cariTipi,
          komisyoncuId: formData.cariTipi === 'KOMISYONCU' ? formData.cariId : null,
          ureticiId: null, // Şimdilik null
          mustahsilId: formData.cariTipi === 'MUSTAHSIL' ? formData.cariId : null,
          ozelFirmaId: formData.cariTipi === 'OZEL_FIRMA' ? formData.cariId : null,
          urunId: formData.urunId,
          paletId: null, // Şimdilik null
          ambalajId: null, // Şimdilik null
          paletSayisi: '0',
                      kasaSayisi: formData.kasaSayisi || '0',
          brutKg: formData.brutKg,
          daraKg: formData.daraKg,
          girisKg: formData.girisKg,
          cikmaFireKg: formData.cikmaFireKg,
          netKg: formData.netKg,

          notlar: formData.notlar
        }),
      })

      if (response.ok) {
        const result = await response.json()
        
        // Fiş verilerini hazırla
        const receiptData = {
          fisNo: result.malKabulRecord.fisNo,
          tarih: result.malKabulRecord.tarih,
          saticiTipi: formData.saticiTipi,
          saticiAdi: getSaticiAdi(result.malKabulRecord),
          urunAdi: urunler.find(u => u.id === formData.urunId)?.ad || '',
          brutKg: parseFloat(formData.brutKg) || 0,
          daraKg: parseFloat(formData.daraKg) || 0,
          girisKg: parseFloat(formData.girisKg) || 0,
          ambalajAdi: 'Kasa', // Sabit ambalaj adı
          kasaSayisi: parseInt(formData.kasaSayisi) || 0,
          paletAdi: ambalajlar.find(a => a.id === formData.paletId)?.ad,
          paletSayisi: parseInt(formData.paletSayisi) || 0,
          notlar: formData.notlar,
          malKabulcuAdi: session.user?.name || ''
        }
        
        setReceiptData(receiptData)
        setShowReceipt(true)
        
        toast({
          title: "Başarılı",
          description: "Mal kabul kaydı başarıyla oluşturuldu! Bilgi fişi yazdırılıyor...",
          variant: "success",
        })
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

  const getSaticiAdi = (data: any) => {
    if (data.saticiTipi === 'OZEL_FIRMA') {
      return ozelFirmalar.find(f => f.id === data.ozelFirmaId)?.firmaAdi || ''
    } else if (data.saticiTipi === 'KOMISYONCU') {
      const komisyoncu = komisyoncular.find(k => k.id === data.komisyoncuId)
      return komisyoncu?.dukkanAdi || ''
    } else if (data.saticiTipi === 'MUSTAHSIL') {
      const selectedMustahsil = mustahsil.find(m => m.id === data.mustahsilId)
      return selectedMustahsil ? `${selectedMustahsil.ad} ${selectedMustahsil.soyad}` : ''
    }
    return ''
  }

  const handlePrint = () => {
    if (!receiptData) return
    
    const printWindow = window.open('', '_blank')
    if (printWindow) {
      printWindow.document.write(`
        <!DOCTYPE html>
        <html>
          <head>
            <title>Bilgi Fişi - ${receiptData.fisNo}</title>
            <style>
              body { 
                font-family: monospace; 
                font-size: 12px; 
                width: 80mm; 
                max-width: 80mm; 
                margin: 0; 
                padding: 8px;
                box-sizing: border-box;
                overflow-x: hidden;
              }
              .header { text-align: center; font-weight: bold; font-size: 16px; margin-bottom: 10px; }
              .section { margin-bottom: 12px; border-bottom: 1px solid #000; padding-bottom: 8px; }
              .section-title { font-weight: bold; font-size: 12px; margin-bottom: 8px; text-align: center; background: #f0f0f0; padding: 3px; border-radius: 3px; }
              .row { display: flex; justify-content: space-between; margin-bottom: 6px; font-size: 11px; }
              .label { font-weight: bold; }
              .value { text-align: right; font-weight: 500; }
              .copy-info {
                text-align: center;
                font-size: 10px;
                color: #666;
                margin-top: 10px;
                padding: 5px;
                background: #f0f0f0;
                border-radius: 3px;
                font-weight: bold;
              }
              .page-break { page-break-after: always; }
              .copy-label { 
                text-align: center; 
                font-size: 14px; 
                font-weight: bold; 
                margin: 15px 0; 
                padding: 8px; 
                background: #000; 
                color: #fff; 
                border-radius: 5px; 
              }
            </style>
          </head>
          <body>
            <!-- 1. Fiş - Mal Kabulcu İçin -->
            <div class="copy-label">MAL KABULCU İÇİN - FİZİKSEL OLARAK SAKLANACAK</div>
            
            <div class="header">WEBRAIN TARIM</div>
            <div class="header">BİLGİ FİŞİ</div>
            
            <div class="section">
              <div class="section-title">TEMEL BİLGİLER</div>
              <div class="row">
                <span>Fiş No:</span>
                <span class="value">${receiptData.fisNo}</span>
              </div>
              <div class="row">
                <span>Tarih:</span>
                <span class="value">${new Date(receiptData.tarih).toLocaleDateString('tr-TR')}</span>
              </div>
              <div class="row">
                <span>Saat:</span>
                <span class="value">${new Date(receiptData.tarih).toLocaleTimeString('tr-TR')}</span>
              </div>
            </div>
            
            <div class="section">
              <div class="section-title">SATICI BİLGİLERİ</div>
              <div class="row">
                <span>Tip:</span>
                <span class="value">${receiptData.saticiTipi === 'OZEL_FIRMA' ? 'ÖZEL FİRMA' : receiptData.saticiTipi === 'KOMISYONCU' ? 'KOMİSYONCU' : 'MÜSTAHHİL'}</span>
              </div>
              <div class="row">
                <span>Ad:</span>
                <span class="value">${receiptData.saticiAdi}</span>
              </div>
            </div>
            
            <div class="section">
              <div class="section-title">ÜRÜN BİLGİLERİ</div>
              <div class="row">
                <span>Ürün:</span>
                <span class="value">${receiptData.urunAdi}</span>
              </div>
              ${receiptData.ambalajAdi ? `
              <div class="row">
                <span>Ambalaj:</span>
                <span class="value">${receiptData.ambalajAdi} x ${receiptData.kasaSayisi}</span>
              </div>
              ` : ''}
              ${receiptData.paletAdi ? `
              <div class="row">
                <span>Palet:</span>
                <span class="value">${receiptData.paletAdi} x ${receiptData.paletSayisi}</span>
              </div>
              ` : ''}
            </div>
            
            <div class="section">
              <div class="section-title">AĞIRLIK BİLGİLERİ</div>
              <div class="row">
                <span>Brüt KG:</span>
                <span class="value">${receiptData.brutKg.toFixed(2)} kg</span>
              </div>
              <div class="row">
                <span>Dara KG:</span>
                <span class="value">${receiptData.daraKg.toFixed(2)} kg</span>
              </div>
              <div class="row">
                <span>Giriş KG:</span>
                <span class="value">${receiptData.girisKg.toFixed(2)} kg</span>
              </div>
              <div class="row">
                <span>Çıkma/Fire KG:</span>
                <span class="value">${(receiptData.brutKg - receiptData.girisKg).toFixed(2)} kg</span>
              </div>
            </div>
            
            ${receiptData.notlar ? `
            <div class="section">
              <div class="section-title">NOTLAR</div>
              <div style="text-align: center; font-size: 11px; padding: 5px; background: #f9f9f9; border-radius: 3px;">${receiptData.notlar}</div>
            </div>
            ` : ''}
            
            <div class="section">
              <div class="section-title">MAL KABUL BİLGİLERİ</div>
              <div class="row">
                <span>Mal Kabulcu:</span>
                <span class="value">${receiptData.malKabulcuAdi}</span>
              </div>
              <div class="row">
                <span>İşlem Tarihi:</span>
                <span class="value">${new Date().toLocaleDateString('tr-TR')}</span>
              </div>
              <div class="row">
                <span>İşlem Saati:</span>
                <span class="value">${new Date().toLocaleTimeString('tr-TR')}</span>
              </div>
            </div>
            
            <div class="section">
              <div class="section-title">QR KOD VE BARKOD</div>
              <div style="text-align: center; margin: 8px 0;">
                <div style="font-size: 9px; color: #666; margin-bottom: 6px;">
                  <strong>QR Kod:</strong> ${receiptData.fisNo}|${receiptData.tarih}|${receiptData.saticiTipi}|${receiptData.urunAdi}
                </div>
                <div style="font-size: 8px; color: #888; line-height: 1.2; margin-bottom: 8px;">
                  Ürün işlendiğinde bu QR kod ile düzenleme ekranına gidin
                </div>
                <div style="margin-top: 8px; padding: 6px; background: #f0f0f0; border-radius: 3px;">
                  <div style="font-size: 7px; color: #666; margin-bottom: 4px;">QR Kod</div>
                  <div style="width: 40px; height: 40px; background: #000; margin: 0 auto; display: flex; align-items: center; justify-content: center;">
                    <div style="color: #fff; font-size: 5px; text-align: center; line-height: 1.2;">
                      QR<br>KOD
                    </div>
                  </div>
                  <div style="font-size: 7px; color: #666; margin-top: 4px;">Barkod</div>
                  <div style="width: 60px; height: 15px; background: #000; margin: 0 auto; display: flex; align-items: center; justify-content: center;">
                    <div style="color: #fff; font-size: 5px;">BARKOD</div>
                  </div>
                </div>
              </div>
            </div>
          
          <div style="text-align: center; margin-top: 20px; padding: 10px; background: #f9f9f9; border-radius: 5px;">
            <div style="font-size: 10px; color: #666; font-weight: bold; margin-bottom: 5px;">
              ⚠️ BU FİŞİ SAKLAYIN - ÜRÜN İŞLENDİĞİNDE GEREKLİ OLACAK
            </div>
            <div style="font-size: 9px; color: #888; line-height: 1.3;">
              <div>Fiş Yazdırma Tarihi: ${new Date().toLocaleDateString('tr-TR')}</div>
              <div>Fiş Yazdırma Saati: ${new Date().toLocaleTimeString('tr-TR')}</div>
              <div style="margin-top: 5px; font-weight: bold;">WEBRAIN TARIM SİSTEMİ</div>
            </div>
          </div>
          
          <div class="page-break"></div>
          
          <!-- 2. Fiş - Üretici İçin -->
          <div class="copy-label">ÜRETİCİ İÇİN - ÜRETİCİYE VERİLECEK</div>
          
          <div class="header">WEBRAIN TARIM</div>
          <div class="header">BİLGİ FİŞİ</div>
          
          <div class="section">
            <div class="section-title">TEMEL BİLGİLER</div>
            <div class="row">
              <span>Fiş No:</span>
              <span class="value">${receiptData.fisNo}</span>
            </div>
            <div class="row">
              <span>Tarih:</span>
              <span class="value">${new Date(receiptData.tarih).toLocaleDateString('tr-TR')}</span>
            </div>
            <div class="row">
              <span>Saat:</span>
              <span class="value">${new Date(receiptData.tarih).toLocaleTimeString('tr-TR')}</span>
            </div>
          </div>
          
          <div class="section">
            <div class="section-title">SATICI BİLGİLERİ</div>
            <div class="row">
              <span>Tip:</span>
              <span class="value">${receiptData.saticiTipi === 'OZEL_FIRMA' ? 'ÖZEL FİRMA' : receiptData.saticiTipi === 'KOMISYONCU' ? 'KOMİSYONCU' : 'MÜSTAHHİL'}</span>
            </div>
            <div class="row">
              <span>Ad:</span>
              <span class="value">${receiptData.saticiAdi}</span>
            </div>
          </div>
          
          <div class="section">
            <div class="section-title">ÜRÜN BİLGİLERİ</div>
            <div class="row">
              <span>Ürün:</span>
              <span class="value">${receiptData.urunAdi}</span>
            </div>
            ${receiptData.ambalajAdi ? `
            <div class="row">
              <span>Ambalaj:</span>
              <span class="value">${receiptData.ambalajAdi} x ${receiptData.kasaSayisi}</span>
            </div>
            ` : ''}
            ${receiptData.paletAdi ? `
            <div class="row">
              <span>Palet:</span>
              <span class="value">${receiptData.paletAdi} x ${receiptData.paletSayisi}</span>
            </div>
            ` : ''}
          </div>
          
          <div class="section">
            <div class="section-title">AĞIRLIK BİLGİLERİ</div>
            <div class="row">
              <span>Brüt KG:</span>
              <span class="value">${receiptData.brutKg.toFixed(2)} kg</span>
            </div>
            <div class="row">
              <span>Dara KG:</span>
              <span class="value">${receiptData.daraKg.toFixed(2)} kg</span>
            </div>
            <div class="row">
              <span>Giriş KG:</span>
              <span class="value">${receiptData.girisKg.toFixed(2)} kg</span>
            </div>
            <div class="row">
              <span>Çıkma/Fire KG:</span>
              <span class="value">${(receiptData.brutKg - receiptData.girisKg).toFixed(2)} kg</span>
            </div>
          </div>
          
          ${receiptData.notlar ? `
          <div class="section">
            <div class="section-title">NOTLAR</div>
            <div style="text-align: center; font-size: 11px; padding: 5px; background: #f9f9f9; border-radius: 3px;">${receiptData.notlar}</div>
          </div>
          ` : ''}
          
          <div class="section">
            <div class="section-title">MAL KABUL BİLGİLERİ</div>
            <div class="row">
              <span>Mal Kabulcu:</span>
              <span class="value">${receiptData.malKabulcuAdi}</span>
            </div>
            <div class="row">
              <span>İşlem Tarihi:</span>
              <span class="value">${new Date().toLocaleDateString('tr-TR')}</span>
            </div>
            <div class="row">
              <span>İşlem Saati:</span>
              <span class="value">${new Date().toLocaleTimeString('tr-TR')}</span>
            </div>
          </div>
          
          <div class="section">
            <div class="section-title">QR KOD VE BARKOD</div>
            <div style="text-align: center; margin: 8px 0;">
              <div style="font-size: 9px; color: #666; margin-bottom: 6px;">
                <strong>QR Kod:</strong> ${receiptData.fisNo}|${receiptData.fisNo}|${receiptData.tarih}|${receiptData.saticiTipi}|${receiptData.urunAdi}
              </div>
              <div style="font-size: 8px; color: #888; line-height: 1.2; margin-bottom: 8px;">
                Ürün işlendiğinde bu QR kod ile düzenleme ekranına gidin
              </div>
              <div style="margin-top: 8px; padding: 6px; background: #f0f0f0; border-radius: 3px;">
                <div style="font-size: 7px; color: #666; margin-bottom: 4px;">QR Kod</div>
                <div style="width: 40px; height: 40px; background: #000; margin: 0 auto; display: flex; align-items: center; justify-content: center;">
                  <div style="color: #fff; font-size: 5px; text-align: center; line-height: 1.2;">
                    QR<br>KOD
                  </div>
                </div>
                <div style="font-size: 7px; color: #666; margin-top: 4px;">Barkod</div>
                <div style="width: 60px; height: 15px; background: #000; margin: 0 auto; display: flex; align-items: center; justify-content: center;">
                  <div style="color: #fff; font-size: 5px;">BARKOD</div>
                </div>
              </div>
            </div>
          </div>
        
        <div style="text-align: center; margin-top: 20px; padding: 10px; background: #f9f9f9; border-radius: 5px;">
          <div style="font-size: 10px; color: #666; font-weight: bold; margin-bottom: 5px;">
            ⚠️ BU FİŞİ SAKLAYIN - ÜRÜN İŞLENDİĞİNDE GEREKLİ OLACAK
          </div>
          <div style="font-size: 9px; color: #888; line-height: 1.3;">
            <div>Fiş Yazdırma Tarihi: ${new Date().toLocaleDateString('tr-TR')}</div>
            <div>Fiş Yazdırma Saati: ${new Date().toLocaleTimeString('tr-TR')}</div>
            <div style="margin-top: 5px; font-weight: bold;">WEBRAIN TARIM SİSTEMİ</div>
          </div>
        </div>
        </body>
      </html>
    `)
      printWindow.document.close()
      printWindow.focus()
      
      // Tek seferde yazdır
      setTimeout(() => {
        printWindow.print()
      }, 500)
    }
    
    toast({
      title: "Fişler Yazdırılıyor",
      description: "2 adet fiş tek seferde yazdırılıyor",
      variant: "success",
    })
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
                        <SelectValue placeholder="Satıcı tipi seçin" />
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
                                                  {mustahsil.length === 0 ? (
                          <SelectItem value="no-mustahsil" disabled>
                            Müstahsil bulunamadı
                            </SelectItem>
                        ) : (
                          mustahsil.map((mustahsil) => (
                            <SelectItem key={mustahsil.id} value={mustahsil.id}>
                              {mustahsil.ad} {mustahsil.soyad} - {mustahsil.tcKimlikNo}
                            </SelectItem>
                          ))
                        )}
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
                    <Label htmlFor="urunKodu">Ürün Kodu *</Label>
                    <div className="relative">
                      <Input
                        id="urunKodu"
                        placeholder="U001, U002..."
                        value={formData.urunKodu}
                        onChange={(e) => handleUrunKoduChange(e.target.value)}
                        className="pr-10"
                      />
                      {showUrunSuggestions && (
                        <div className="absolute z-50 w-full mt-1 bg-background border border-border rounded-md shadow-lg max-h-60 overflow-auto">
                          {urunSuggestions.map((urun: any) => (
                            <div
                              key={urun.id}
                              className="px-3 py-2 hover:bg-muted cursor-pointer border-b border-border last:border-b-0"
                              onClick={() => handleUrunSelect(urun)}
                            >
                              <div className="font-medium">{urun.kod}</div>
                              <div className="text-sm text-muted-foreground">{urun.ad}</div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      DOM001: Domates, SAL001: Salatalık, PAT001: Patlıcan vb.
                    </div>
                  </div>

                  {formData.urunId && (
                    <div className="p-3 bg-muted/50 rounded-lg border border-border">
                      <div className="text-sm font-medium">Seçilen Ürün:</div>
                      <div className="text-sm text-muted-foreground">
                        {formData.urunKodu} - {urunler.find(u => u.id === formData.urunId)?.ad}
                      </div>
                      {formData.urunKodu && (
                        <div className="text-xs text-primary mt-1">
                          Hızlı seçim: <span className="font-medium">{formData.urunKodu}</span>
                        </div>
                      )}
                    </div>
                  )}

                  <div className="space-y-2">
                    <Label htmlFor="palet">Palet (Pasif)</Label>
                    <Select
                      value={formData.paletId}
                      onValueChange={handlePaletChange}
                      disabled={true}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Şimdilik pasif" />
                      </SelectTrigger>
                      <SelectContent>
                          <SelectItem value="no-palet" disabled>
                          Palet seçimi şimdilik pasif
                          </SelectItem>
                      </SelectContent>
                    </Select>
                    <div className="text-xs text-muted-foreground">
                      Palet ve kasa seçimi şimdilik pasif, dara KG manuel girilecek
                        </div>
                  </div>

                        <div className="space-y-2">
                          <Label htmlFor="kasaSayisi">Kasa Sayısı *</Label>
                          <Input
                            id="kasaSayisi"
                            type="number"
                            step="1"
                            min="1"
                            value={formData.kasaSayisi}
                      onChange={(e) => setFormData({...formData, kasaSayisi: e.target.value})}
                            placeholder="1"
                            required
                          />
                    <div className="text-xs text-muted-foreground">
                      Kasa sayısını manuel olarak girin
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
                        onChange={(e) => {
                          const brutKg = e.target.value
                          const daraKg = parseFloat(formData.daraKg) || 0
                          const girisKg = parseFloat(brutKg) - daraKg
                          
                          setFormData({
                            ...formData, 
                            brutKg: brutKg,
                            girisKg: girisKg > 0 ? girisKg.toFixed(2) : '0'
                          })
                        }}
                        placeholder="0.00"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="daraKg">Dara KG (Manuel) *</Label>
                      <Input
                        id="daraKg"
                        type="number"
                        step="0.01"
                        value={formData.daraKg}
                        onChange={(e) => {
                          const daraKg = e.target.value
                          const brutKg = parseFloat(formData.brutKg) || 0
                          const girisKg = brutKg - parseFloat(daraKg)
                          
                          setFormData({
                            ...formData, 
                            daraKg: daraKg,
                            girisKg: girisKg > 0 ? girisKg.toFixed(2) : '0'
                          })
                        }}
                        placeholder="0.00"
                        required
                      />

                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="girisKg">Giriş KG (Otomatik) *</Label>
                      <Input
                        id="girisKg"
                        type="number"
                        step="0.01"
                        value={formData.girisKg}
                        placeholder="0.00"
                        readOnly
                        className="bg-muted"
                      />

                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cikmaFireKg">Çıkma/Fire KG</Label>
                      <Input
                        id="cikmaFireKg"
                        type="number"
                        step="0.01"
                        value={formData.cikmaFireKg}
                        onChange={(e) => setFormData({...formData, cikmaFireKg: e.target.value})}
                        placeholder="0.00"
                      />

                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="netKg">Net KG (Otomatik)</Label>
                    <Input
                      id="netKg"
                      type="number"
                      step="0.01"
                      value={(() => {
                        const girisKg = parseFloat(formData.girisKg) || 0
                        return girisKg.toFixed(2)
                      })()}
                      placeholder="0.00"
                      readOnly
                      className="bg-muted"
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

      {/* Fiş Yazdırma Modal */}
      {showReceipt && receiptData && (
        <div className="fixed inset-0 bg-black/50 dark:bg-black/70 flex items-center justify-center z-50">
          <div className="bg-background border border-border rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-foreground">Bilgi Fişi Yazdır</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowReceipt(false)}
                className="h-8 w-8 p-0 hover:bg-muted"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="mb-4">
              <p className="text-sm text-gray-600 mb-2">
                Bu fiş 2 adet yazdırılacak:
              </p>
              <ul className="text-sm text-gray-600 list-disc list-inside space-y-1">
                <li>1 adet mal kabulcu için (fiziksel olarak saklanacak)</li>
                <li>1 adet üretici için (üreticiye verilecek)</li>
              </ul>
            </div>

            {/* Fiş Önizleme */}
            <div className="mb-4 bg-muted/50 p-4 rounded-lg border border-border">
              <h4 className="font-bold text-center mb-3 text-foreground">Bilgi Fişi Önizleme</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="font-medium text-foreground"><strong>Fiş No:</strong></span>
                  <span className="text-foreground">{receiptData.fisNo}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium text-foreground"><strong>Tarih:</strong></span>
                  <span className="text-foreground">{new Date(receiptData.tarih).toLocaleDateString('tr-TR')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium text-foreground"><strong>Satıcı:</strong></span>
                  <span className="text-foreground">{receiptData.saticiAdi}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium text-foreground"><strong>Ürün:</strong></span>
                  <span className="text-foreground">{receiptData.urunAdi}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium text-foreground"><strong>Brüt KG:</strong></span>
                  <span className="text-foreground">{receiptData.brutKg} kg</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium text-foreground"><strong>Net KG:</strong></span>
                  <span className="text-foreground">{receiptData.girisKg} kg</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium text-foreground"><strong>Kasa Sayısı:</strong></span>
                  <span className="text-foreground">{receiptData.kasaSayisi} adet</span>
                </div>
                {receiptData.paletAdi && (
                  <div className="flex justify-between">
                    <span className="font-medium text-foreground"><strong>Palet:</strong></span>
                    <span className="text-foreground">{receiptData.paletAdi} x {receiptData.paletSayisi}</span>
                  </div>
                )}
              </div>
              
              {/* QR Kod ve Barkod Önizleme */}
              <div className="mt-4 pt-4 border-t border-border">
                <h5 className="font-bold text-center mb-3 text-foreground">QR Kod ve Barkod</h5>
                <div className="flex flex-col items-center gap-3">
                  <div className="text-center">
                    <div className="text-xs text-muted-foreground mb-2">QR Kod</div>
                    <QRCode 
                      value={`${receiptData.fisNo}|${receiptData.tarih}|${receiptData.saticiTipi}|${receiptData.urunAdi}`} 
                      size={80} 
                      className="border border-border rounded"
                    />
                  </div>
                  <div className="text-center">
                    <div className="text-xs text-muted-foreground mb-2">Barkod</div>
                    <Barcode 
                      value={receiptData.fisNo} 
                      width={160} 
                      height={40} 
                      className="border border-border rounded"
                    />
                  </div>
                </div>
                <div className="text-center text-xs text-muted-foreground mt-3">
                  Ürün işlendiğinde bu kodlar ile düzenleme ekranına gidin
                </div>
              </div>
            </div>

            {/* Yazdırma Butonu */}
            <div className="flex justify-center">
              <Button onClick={handlePrint} className="px-8">
                <Printer className="mr-2 h-4 w-4" />
                2 Adet Fiş Yazdır
              </Button>
            </div>

            <div className="mt-4 text-center">
              <Button 
                onClick={() => {
                  setShowReceipt(false)
                  router.push('/dashboard')
                }}
                variant="outline"
                className="hover:bg-muted"
              >
                Dashboard'a Dön
              </Button>
            </div>
          </div>
        </div>
      )}
      
      {/* Global Suggestions */}
      {showGlobalSuggestions && globalSuggestions.length > 0 && (
        <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50 bg-background border border-border rounded-lg shadow-lg p-4 max-w-md w-full">
          <div className="text-sm font-medium mb-2">
            🔍 Hızlı Seçim: <span className="text-primary font-bold">{globalInput}</span>
          </div>
          <div className="space-y-2 max-h-60 overflow-y-auto">
            {globalSuggestions.map((item, index) => (
              <button
                key={index}
                onClick={() => handleGlobalSelect(item)}
                className="w-full text-left p-2 hover:bg-accent rounded-md transition-colors border border-transparent hover:border-border"
              >
                <div className="font-medium text-primary">{item.kod}</div>
                <div className="text-sm text-muted-foreground">{item.ad}</div>
                <div className="text-xs text-muted-foreground capitalize">{item.tip?.toLowerCase().replace('_', ' ')}</div>
              </button>
            ))}
          </div>
          <div className="text-xs text-muted-foreground mt-2 text-center">
            Enter: Enter: Seç | Escape: İptal | Backspace: Sil
          </div>
        </div>
      )}
      
      {/* Global Input Debug */}
      {globalInput && (
        <div className="fixed bottom-4 right-4 z-50 bg-primary text-primary-foreground px-3 py-2 rounded-lg text-sm font-mono">
          Global Input: {globalInput}
        </div>
      )}
    </DashboardLayout>
  )
}
