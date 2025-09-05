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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useToast } from '@/components/ui/use-toast'
import Link from 'next/link'
import { Autocomplete, AutocompleteItem } from "@heroui/react"

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

interface Urun {
  id: string
  ad: string
  stokKodu: string
  birim: string
  kategori?: string
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
    adetSayisi: '', // ADET birimi için
    brutKg: '',
    daraKg: '', // Manuel giriş
    girisKg: '',
    cikmaKg: '',
    fireKg: '',
    netKg: '',
    netAdet: '', // ADET birimi için net adet
    notlar: '',
    // Eski alanlar (geriye uyumluluk için)
    saticiTipi: '',
    komisyoncuId: '',
    ureticiId: '',
    mustahsilId: '',
    ozelFirmaId: ''
  })

  const [selectedUrun, setSelectedUrun] = useState<Urun | null>(null)
  const [isAdetBased, setIsAdetBased] = useState(false)
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
  const [showCariSuggestions, setShowCariSuggestions] = useState(false)

  // Template sistemi için state'ler
  const [templates, setTemplates] = useState<any[]>([])
  const [showTemplates, setShowTemplates] = useState(false)
  const [selectedTemplate, setSelectedTemplate] = useState<any>(null)

  // Hızlı kopyalama için state'ler
  const [lastRecords, setLastRecords] = useState<any[]>([])
  const [showLastRecords, setShowLastRecords] = useState(false)
  const [selectedLastRecord, setSelectedLastRecord] = useState<any>(null)

  // Otomatik kaydetme için state'ler
  const [autoSaveEnabled, setAutoSaveEnabled] = useState(true)
  const [autoSaveInterval, setAutoSaveInterval] = useState(30000) // 30 saniye
  const [lastAutoSave, setLastAutoSave] = useState<Date | null>(null)
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false)

  // Batch processing için state'ler
  const [batchMode, setBatchMode] = useState(false)
  const [batchItems, setBatchItems] = useState<any[]>([])
  const [showBatchForm, setShowBatchForm] = useState(false)

  // Form geçmişi için state'ler
  const [formHistory, setFormHistory] = useState<any[]>([])
  const [currentFormIndex, setCurrentFormIndex] = useState(-1)

  // Ürün arama için state
  const [urunSearchTerm, setUrunSearchTerm] = useState('')
  const [filteredUrunler, setFilteredUrunler] = useState<typeof urunler>([])

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login')
    } else if (status === 'authenticated') {
      fetchOzelFirmalar()
      fetchKomisyoncular()
      fetchMustahsil()
      fetchAmbalajlar()
      fetchUrunler()
      loadLastRecords()
    }
  }, [status, router])

  // Global keyboard listener için state
  const [globalInput, setGlobalInput] = useState('')
  const [showGlobalSuggestions, setShowGlobalSuggestions] = useState(false)
  const [globalSuggestions, setGlobalSuggestions] = useState<any[]>([])

  // Excel-like sayfadan veri aktarımı
  useEffect(() => {
    const excelData = localStorage.getItem('excelToMainData')
    if (excelData) {
      try {
        const data = JSON.parse(excelData)
        console.log('📥 Excel\'den gelen veri:', data)
        
        // Form verilerini güncelle
        setFormData(prev => ({
          ...prev,
          saticiTipi: data.saticiTipi,
          komisyoncuId: data.komisyoncuId || data.mustahsilId || data.ozelFirmaId,
          ureticiId: data.ureticiId,
          mustahsilId: data.saticiTipi === 'MUSTAHSIL' ? data.komisyoncuId : '',
          ozelFirmaId: data.saticiTipi === 'OZEL_FIRMA' ? data.komisyoncuId : '',
          urunId: data.urunId,
          kasaSayisi: data.kasaSayisi,
          brutKg: data.brutKg,
          daraKg: data.daraKg,
          girisKg: data.girisKg,
          cikmaKg: data.cikmaKg || '',
          fireKg: data.fireKg || '',
          notlar: data.notlar
        }))
        
        // Cari tipini belirle
        if (data.saticiTipi === 'KOMISYONCU') {
          setFormData(prev => ({ ...prev, cariTipi: 'KOMISYONCU' }))
        } else if (data.saticiTipi === 'MUSTAHSIL') {
          setFormData(prev => ({ ...prev, cariTipi: 'MUSTAHSIL' }))
        } else if (data.saticiTipi === 'OZEL_FIRMA') {
          setFormData(prev => ({ ...prev, cariTipi: 'OZEL_FIRMA' }))
        }
        
        // LocalStorage'dan temizle
        localStorage.removeItem('excelToMainData')
        
        toast({
          title: "Veri Aktarıldı",
          description: "Excel tarzı sayfadan veri başarıyla aktarıldı!",
          variant: "default",
        })
      } catch (error) {
        console.error('Excel veri aktarım hatası:', error)
        localStorage.removeItem('excelToMainData')
      }
    }
  }, [])

  // Global keyboard listener
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      console.log('🔍 Global KeyPress:', e.key, 'Active Element:', document.activeElement?.tagName)
      
      // Eğer herhangi bir input aktifse, global listener'ı devre dışı bırak
      if (document.activeElement?.tagName === 'INPUT' || document.activeElement?.tagName === 'TEXTAREA' || document.activeElement?.tagName === 'SELECT') {
        console.log('❌ Input aktif, global listener devre dışı')
        return
      }

      // Sadece sayı ve harf tuşlarına tepki ver (Türkçe karakterler dahil)
      if (e.key.length === 1 && /[a-zA-Z0-9üÜğĞşŞıİöÖçÇ]/.test(e.key)) {
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

      // Kısayol tuşları (Ctrl + Key)
      if (e.ctrlKey) {
        switch (e.key) {
          case 's':
            e.preventDefault()
            if (formData.cariId && formData.urunId && !loading) {
              // Form submit'i tetikle
              const submitEvent = new Event('submit', { bubbles: true })
              document.querySelector('form')?.dispatchEvent(submitEvent)
            }
            break
          case 'r':
            e.preventDefault()
            setShowLastRecords(true)
            break
          case 'b':
            e.preventDefault()
            setBatchMode(!batchMode)
            break
          case 'f':
            e.preventDefault()
            resetForm()
            break
          case 'a':
            e.preventDefault()
            if (batchMode) {
              addBatchItem()
            }
            break
        }
      }

      // F tuşları
      switch (e.key) {
        case 'F2':
          e.preventDefault()
          setShowLastRecords(true)
          break
        case 'F3':
          e.preventDefault()
          setBatchMode(!batchMode)
          break
        case 'F4':
          e.preventDefault()
          resetForm()
          break
        case 'F5':
          e.preventDefault()
          if (formData.cariId && formData.urunId && !loading) {
            // Form submit'i tetikle
            const submitEvent = new Event('submit', { bubbles: true })
            document.querySelector('form')?.dispatchEvent(submitEvent)
          }
          break
      }
    }

    window.addEventListener('keypress', handleKeyPress)
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keypress', handleKeyPress)
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [globalSuggestions, batchMode, formData.cariId, formData.urunId])

  // Global input değiştiğinde önerileri güncelle
  useEffect(() => {
    console.log('🔄 Global Input değişti:', globalInput, 'Uzunluk:', globalInput.length)
    
    if (globalInput.length >= 2) {
      const suggestions: any[] = []
      console.log('🔍 Öneriler aranıyor...')
      
      // Komisyoncu arama (kom0001, kom0002...)
      if (globalInput.toLowerCase().startsWith('kom') || globalInput.toLowerCase().startsWith('köm')) {
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
      if (globalInput.toLowerCase().startsWith('müs') || globalInput.toLowerCase().startsWith('mus') || globalInput.toLowerCase().startsWith('müş')) {
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
      // Ürün seçildiğinde handleUrunSelect fonksiyonunu çağır
      const selectedUrun = urunler.find(u => u.id === item.id)
      if (selectedUrun) {
        handleUrunSelect(selectedUrun)
      }
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
      cariTipi: cari.tip,
      saticiTipi: cari.tip, // saticiTipi'ni de set et
      // Cari tipine göre ilgili ID'yi set et
      komisyoncuId: cari.tip === 'KOMISYONCU' ? cari.id : '',
      mustahsilId: cari.tip === 'MUSTAHSIL' ? cari.id : '',
      ozelFirmaId: cari.tip === 'OZEL_FIRMA' ? cari.id : ''
    }))
    setShowCariSuggestions(false)
    setCariSuggestions([])
    
    toast({
      title: "Cari Seçildi",
      description: `${cari.ad} (${cari.tip}) seçildi`,
      variant: "success",
    })
  }



  // Ürün seçimi
  const handleUrunSelect = (urun: any) => {
    console.log('🔍 handleUrunSelect çağrıldı:', urun)
    console.log('🔍 Ürün birimi:', urun.birim)
    console.log('🔍 Birim tipi:', typeof urun.birim)
    
    setFormData(prev => ({
      ...prev,
      urunKodu: urun.kod,
      urunId: urun.id
    }))
    
    // Ürün birimini kontrol et ve form alanlarını ayarla
    setSelectedUrun(urun)
    const birimKontrol = urun.birim?.toLowerCase() === 'adet'
    console.log('🔍 Birim kontrol sonucu:', birimKontrol)
    
    if (birimKontrol) {
      console.log('✅ ADET birimi tespit edildi, isAdetBased = true yapılıyor')
      setIsAdetBased(true)
      // ADET birimi için KG alanlarını temizle
      setFormData(prev => ({
        ...prev,
        urunKodu: urun.kod,
        urunId: urun.id,
        brutKg: '',
        daraKg: '',
        girisKg: '',
        cikmaKg: '',
        fireKg: '',
        netKg: ''
      }))
    } else {
      console.log('❌ KG birimi tespit edildi, isAdetBased = false yapılıyor')
      setIsAdetBased(false)
      // KG birimi için adet alanlarını temizle
      setFormData(prev => ({
        ...prev,
        urunKodu: urun.kod,
        urunId: urun.id,
        adetSayisi: '',
        netAdet: ''
      }))
    }
    

    
    toast({
      title: "Ürün Seçildi",
      description: `${urun.ad} (${urun.birim}) seçildi`,
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
      cikmaKg: '',
      fireKg: '',
      netKg: '',
      notlar: ''
    })

  }

  const handleKomisyoncuChange = async (komisyoncuId: string) => {
    setFormData({ 
      ...formData, 
      komisyoncuId, 
      ureticiId: '',
      cariId: '', // Reset cariId until uretici is selected
      cariTipi: 'KOMISYONCU' // Set cariTipi for validation
    })
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
    setFormData({ 
      ...formData, 
      ureticiId,
      cariId: ureticiId, // Set cariId to uretici ID (actual seller)
      cariTipi: 'URETICI' // Set cariTipi for validation
    })
  }

  const handleMustahsilChange = (mustahsilId: string) => {
    setFormData({ 
      ...formData, 
      mustahsilId,
      cariId: mustahsilId, // Set cariId for validation
      cariTipi: 'MUSTAHSIL' // Set cariTipi for validation
    })
  }

  const handleOzelFirmaChange = (ozelFirmaId: string) => {
    setFormData({ 
      ...formData, 
      ozelFirmaId,
      cariId: ozelFirmaId, // Set cariId for validation
      cariTipi: 'OZEL_FIRMA' // Set cariTipi for validation
    })
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

  const handleCikmaKgChange = (cikmaKg: string) => {
    setFormData(prev => ({ ...prev, cikmaKg }))
    calculateNetKg()
  }

  const handleFireKgChange = (fireKg: string) => {
    setFormData(prev => ({ ...prev, fireKg }))
    calculateNetKg()
  }

  const calculateGirisKg = () => {
    const brutKg = parseFloat(formData.brutKg) || 0
    const daraKg = parseFloat(formData.daraKg) || 0
    const girisKg = brutKg - daraKg
    setFormData(prev => ({ ...prev, girisKg: girisKg.toString() }))
  }

  const calculateNetKg = () => {
    const girisKg = parseFloat(formData.girisKg) || 0
    const cikmaKg = parseFloat(formData.cikmaKg) || 0
    const fireKg = parseFloat(formData.fireKg) || 0
    const netKg = girisKg - cikmaKg - fireKg
    setFormData(prev => ({ ...prev, netKg: netKg.toString() }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Debug: Log form data for troubleshooting
    console.log('Form submission - Form data:', {
      cariId: formData.cariId,
      cariTipi: formData.cariTipi,
      saticiTipi: formData.saticiTipi,
      komisyoncuId: formData.komisyoncuId,
      ureticiId: formData.ureticiId,
      mustahsilId: formData.mustahsilId,
      ozelFirmaId: formData.ozelFirmaId
    })
    
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
    
    // Birime göre validasyon
    if (isAdetBased) {
      // ADET birimi için validasyon
      if (!formData.kasaSayisi || parseInt(formData.kasaSayisi) <= 0) {
      toast({
        title: "Hata",
          description: "Kasa sayısı 0'dan büyük olmalıdır",
        variant: "destructive",
      })
      return
    }
    
      if (!formData.adetSayisi || parseInt(formData.adetSayisi) <= 0) {
      toast({
        title: "Hata",
          description: "Adet sayısı 0'dan büyük olmalıdır",
          variant: "destructive",
        })
        return
      }
    } else {
      // KG birimi için validasyon
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
          komisyoncuId: formData.saticiTipi === 'KOMISYONCU' ? formData.komisyoncuId : null,
          ureticiId: formData.saticiTipi === 'KOMISYONCU' ? formData.ureticiId : null,
          mustahsilId: formData.saticiTipi === 'MUSTAHSIL' ? formData.mustahsilId : null,
          ozelFirmaId: formData.saticiTipi === 'OZEL_FIRMA' ? formData.ozelFirmaId : null,
          urunId: formData.urunId,
          paletId: null, // Şimdilik null
          ambalajId: null, // Şimdilik null
          paletSayisi: '0',
                      kasaSayisi: formData.kasaSayisi || '0',
          adetSayisi: formData.adetSayisi || '0',
          brutKg: isAdetBased ? '0' : (formData.brutKg || '0'),
          daraKg: isAdetBased ? '0' : (formData.daraKg || '0'),
          girisKg: isAdetBased ? '0' : (formData.girisKg || '0'),
          cikmaKg: formData.cikmaKg || '0',
          fireKg: formData.fireKg || '0',
          netKg: isAdetBased ? '0' : (formData.netKg || '0'),
          netAdet: isAdetBased ? (() => {
            const girisAdet = parseInt(formData.adetSayisi) || 0
            const cikmaAdet = parseInt(formData.cikmaKg) || 0
            const fireAdet = parseInt(formData.fireKg) || 0
            return (girisAdet - cikmaAdet - fireAdet).toString()
          })() : '0',
          notlar: formData.notlar
        }),
      })

      if (response.ok) {
        const result = await response.json()
        
        // Fiş verilerini hazırla
        const saticiDetay = getSaticiDetay(result.malKabulRecord)
        const receiptData = {
          fisNo: result.malKabulRecord.fisNo,
          tarih: result.malKabulRecord.tarih,
          saticiTipi: result.malKabulRecord.saticiTipi, // Use the actual record saticiTipi
          saticiAdi: getSaticiAdi(result.malKabulRecord),
          // Satıcı detay bilgileri
          komisyoncuAdi: saticiDetay.komisyoncuAdi,
          ureticiAdi: saticiDetay.ureticiAdi,
          sehir: saticiDetay.sehir,
          urunAdi: urunler.find(u => u.id === formData.urunId)?.ad || '',
          birim: urunler.find(u => u.id === formData.urunId)?.birim || 'KG',
          // Birime göre veri hazırlama
          isAdetBased: isAdetBased,
          // KG alanları
          brutKg: isAdetBased ? 0 : (parseFloat(formData.brutKg) || 0),
          daraKg: isAdetBased ? 0 : (parseFloat(formData.daraKg) || 0),
          girisKg: isAdetBased ? 0 : (parseFloat(formData.girisKg) || 0),
          cikmaKg: parseFloat(formData.cikmaKg) || 0,
          fireKg: parseFloat(formData.fireKg) || 0,
          netKg: isAdetBased ? 0 : (parseFloat(formData.netKg) || 0),
          // Adet alanları
          kasaSayisi: parseInt(formData.kasaSayisi) || 0,
          adetSayisi: parseInt(formData.adetSayisi) || 0,
          netAdet: isAdetBased ? (() => {
            const girisAdet = parseInt(formData.adetSayisi) || 0
            const cikmaAdet = parseInt(formData.cikmaKg) || 0
            const fireAdet = parseInt(formData.fireKg) || 0
            return girisAdet - cikmaAdet - fireAdet
          })() : 0,
          // Diğer alanlar
          ambalajAdi: 'Kasa', // Sabit ambalaj adı
          paletAdi: ambalajlar.find(a => a.id === formData.paletId)?.ad,
          paletSayisi: parseInt(formData.paletSayisi) || 0,
          notlar: formData.notlar,
          malKabulcuAdi: session.user?.name || ''
        }
        
        setReceiptData(receiptData)
        setShowReceipt(true)
        
        // Son kayıtları güncelle
        await loadLastRecords()
        
        // Form değişikliklerini sıfırla
        setHasUnsavedChanges(false)
        
        toast({
          title: "Başarılı",
          description: "Mal kabul kaydı başarıyla oluşturuldu! Bilgi fişi yazdırılıyor...",
          variant: "success",
        })

        // Başarılı kayıt sonrası form otomatik sıfırlama - süre artırıldı
        setTimeout(() => {
          resetForm()
          setShowReceipt(false)
          toast({
            title: "Form Sıfırlandı",
            description: "Form otomatik olarak sıfırlandı, yeni kayıt girebilirsiniz",
            variant: "default",
          })
        }, 30000) // 15 saniyeden 30 saniyeye çıkarıldı
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
      return ozelFirmalar.find(f => f.id === data.ozelFirmaId)?.firmaAdi || 'Bilinmeyen Firma'
    } else if (data.saticiTipi === 'KOMISYONCU') {
      const komisyoncu = komisyoncular.find(k => k.id === data.komisyoncuId)
      if (komisyoncu) {
        const uretici = filteredUreticiler.find((u: any) => u.id === data.ureticiId)
        if (uretici) {
          return `${komisyoncu.dukkanAdi} - ${uretici.ad} ${uretici.soyad}`
        } else {
          return `${komisyoncu.dukkanAdi} (Üretici Seçilmedi)`
        }
      }
      return 'Bilinmeyen Komisyoncu'
    } else if (data.saticiTipi === 'MUSTAHSIL') {
      const selectedMustahsil = mustahsil.find(m => m.id === data.mustahsilId)
      return selectedMustahsil ? `${selectedMustahsil.ad} ${selectedMustahsil.soyad}` : 'Bilinmeyen Müstahsil'
    } else if (data.saticiTipi === 'URETICI') {
      const uretici = filteredUreticiler.find((u: any) => u.id === data.ureticiId)
      return uretici ? `${uretici.ad} ${uretici.soyad}` : 'Bilinmeyen Üretici'
    }
    return 'Bilinmeyen'
  }

  const getSaticiDetay = (data: any) => {
    if (data.saticiTipi === 'KOMISYONCU') {
      const komisyoncu = komisyoncular.find(k => k.id === data.komisyoncuId)
      const uretici = filteredUreticiler.find((u: any) => u.id === data.ureticiId)
      return {
        komisyoncuAdi: komisyoncu?.dukkanAdi || '',
        ureticiAdi: uretici ? `${uretici.ad} ${uretici.soyad}` : '',
        sehir: komisyoncu?.sehir || uretici?.sehir || ''
      }
    } else if (data.saticiTipi === 'MUSTAHSIL') {
      const selectedMustahsil = mustahsil.find(m => m.id === data.mustahsilId)
      return {
        komisyoncuAdi: '',
        ureticiAdi: selectedMustahsil ? `${selectedMustahsil.ad} ${selectedMustahsil.soyad}` : '',
        sehir: '' // mustahsil modelinde sehir alanı yok
      }
    } else if (data.saticiTipi === 'OZEL_FIRMA') {
      const ozelFirma = ozelFirmalar.find(f => f.id === data.ozelFirmaId)
      return {
        komisyoncuAdi: '',
        ureticiAdi: ozelFirma?.firmaAdi || '',
        sehir: ozelFirma?.sehir || ''
      }
    }
    return {
      komisyoncuAdi: '',
      ureticiAdi: '',
      sehir: ''
    }
  }

  // Fiş numarası oluşturma
  const generateFisNo = async () => {
    try {
      // Bugünkü HNR serisi kayıtlarını say
      const response = await fetch('/api/mal-kabul')
      if (!response.ok) return 'HNR0001'
      
      const data = await response.json()
      const todayRecords = data.filter((record: any) => 
        record.fisNo && record.fisNo.startsWith('HNR')
      ).length
      
      return 'HNR' + (todayRecords + 1).toString().padStart(4, '0')
    } catch (error) {
      console.error('Fiş numarası oluşturma hatası:', error)
      return 'HNR0001'
    }
  }

  const handlePrint = async () => {
    if (!receiptData) return
    
    try {
      // Fiş verilerini hazırla
      const saticiDetay = getSaticiDetay(receiptData)
      const printData = {
        fisNo: receiptData.fisNo || await generateFisNo(),
        tarih: receiptData.tarih || new Date().toISOString(),
        saticiTipi: receiptData.saticiTipi,
        saticiAdi: getSaticiAdi(receiptData),
        urunAdi: receiptData.urunAdi || '',
        birim: receiptData.birim || 'KG',
        brutKg: parseFloat(receiptData.brutKg) || 0,
        daraKg: parseFloat(receiptData.daraKg) || 0,
        girisKg: parseFloat(receiptData.girisKg) || 0,
        cikmaKg: parseFloat(receiptData.cikmaKg) || 0,
        fireKg: parseFloat(receiptData.fireKg) || 0,
        netKg: parseFloat(receiptData.netKg) || 0,
        adetSayisi: parseInt(receiptData.adetSayisi) || 0,
        netAdet: parseInt(receiptData.netAdet) || 0,
        ambalajAdi: receiptData.ambalajAdi || 'Kasa',
        kasaSayisi: parseInt(receiptData.kasaSayisi) || 0,
        paletAdi: receiptData.paletAdi || null,
        paletSayisi: parseInt(receiptData.paletSayisi) || 0,
        notlar: receiptData.notlar || '',
        malKabulcuAdi: session?.user?.name || '',
        komisyoncuAdi: saticiDetay.komisyoncuAdi,
        ureticiAdi: saticiDetay.ureticiAdi,
        sehir: saticiDetay.sehir
      }
      
      // QR kod ve barkod resimlerini oluştur
      const qrValue = `${printData.fisNo}|${printData.tarih}|${printData.saticiTipi}|${printData.urunAdi}`
      
      // QR kod oluştur
      const QRCodeLib = await import('qrcode')
      const qrDataUrl = await QRCodeLib.toDataURL(qrValue, {
        width: 80,
        margin: 1,
        color: {
          dark: '#000000',
          light: '#FFFFFF'
        }
      })
      
      // Barkod oluştur
      const JsBarcode = await import('jsbarcode')
      const canvas = document.createElement('canvas')
      JsBarcode.default(canvas, printData.fisNo, {
        format: 'CODE128',
        width: 2,
        height: 50,
        displayValue: true,
        fontSize: 12,
        margin: 5
      })
      const barcodeDataUrl = canvas.toDataURL('image/png')
      
      // Yazdırma penceresini aç
      const printWindow = window.open('', '_blank')
      if (printWindow) {
        const fişBaşlığı = 'BİLGİ FİŞİ'
        
        printWindow.document.write(`
        <!DOCTYPE html>
        <html>
          <head>
              <title>${fişBaşlığı} - ${printData.fisNo}</title>
            <style>
              body { 
                font-family: 'Courier New', monospace; 
                font-size: 11px; 
                width: 80mm; 
                max-width: 80mm; 
                margin: 0; 
                padding: 0;
                box-sizing: border-box;
                overflow-x: hidden;
                line-height: 1.2;
                min-height: 210mm;
              }
              .header { 
                text-align: center;
                font-weight: bold; 
                font-size: 14px; 
                margin-bottom: 4px; 
                border-bottom: 1px solid #000;
                padding-bottom: 2px;
              }
              .section { 
                margin-bottom: 4px; 
                border-bottom: 1px solid #ccc; 
                padding-bottom: 2px; 
              }
              .section-title { 
                font-weight: bold; 
                font-size: 12px; 
                margin-bottom: 3px; 
                text-align: center; 
                background: #f0f0f0; 
                padding: 1px; 
                border-radius: 1px; 
              }
              .row { 
                display: flex; 
                justify-content: space-between; 
                margin-bottom: 2px; 
                font-size: 10px;
                font-weight: bold;
                align-items: center;
              }
              .label { 
                font-weight: bold; 
                min-width: 32mm;
                max-width: 32mm;
              }
              .value { 
                text-align: right; 
                font-weight: bold; 
                max-width: 45mm;
                word-wrap: break-word;
                text-overflow: ellipsis;
                overflow: hidden;
              }
              .copy-info {
                text-align: center;
                font-size: 9px;
                color: #666;
                margin-top: 4px;
                padding: 2px;
                background: #f0f0f0;
                border-radius: 1px;
                font-weight: bold;
              }
              .page-break { page-break-after: always; }
              .copy-label { 
                text-align: center; 
                font-size: 12px; 
                font-weight: bold; 
                margin: 4px 0; 
                padding: 2px; 
                background: #000; 
                color: #fff; 
                border-radius: 2px; 
              }
              .qr-code, .barcode {
                text-align: center;
                margin: 2px 0;
              }
              .qr-code img, .barcode img {
                max-width: 55mm;
                height: auto;
              }
              .logo {
                text-align: center;
                margin-bottom: 8px;
              }
              .logo img {
                max-width: 60mm;
                height: auto;
              }
              .thank-you {
                text-align: center;
                font-size: 12px;
                font-weight: bold;
                margin-top: 15px;
                padding: 8px;
                background: #f0f0f0;
                border-radius: 3px;
                border: 2px solid #333;
              }
              
              @media print {
                body { 
                  width: 80mm !important; 
                  max-width: 80mm !important; 
                  margin: 0 !important; 
                  padding: 0 !important; 
                  font-size: 11px !important;
                  min-height: 210mm !important;
                }
                @page { 
                  size: 80mm 210mm; 
                  margin: 0; 
                }
                .qr-code img, .barcode img { 
                  display: block !important; 
                  max-width: 55mm !important;
                }
              }
            </style>
          </head>
          <body>
              <div class="logo">
                <img src="/logo-dark.png" alt="Webrain Logo" />
              </div>
              <div class="header">${fişBaşlığı}</div>
            
            <div class="section">
                <div class="section-title">FİŞ BİLGİLERİ</div>
              <div class="row">
                  <span class="label">Fiş No:</span>
                  <span class="value">${printData.fisNo}</span>
              </div>
              <div class="row">
                  <span class="label">Tarih:</span>
                  <span class="value">${new Date(printData.tarih).toLocaleDateString('tr-TR')}</span>
              </div>
              <div class="row">
                  <span class="label">Mal Kabulcu:</span>
                  <span class="value">${printData.malKabulcuAdi}</span>
              </div>
            </div>
            
            <div class="section">
              <div class="section-title">SATICI BİLGİLERİ</div>
              <div class="row">
                  <span class="label">Satıcı Tipi:</span>
                  <span class="value">${printData.saticiTipi}</span>
              </div>
              <div class="row">
                  <span class="label">Satıcı Adı:</span>
                  <span class="value">${printData.saticiAdi}</span>
              </div>
              ${printData.komisyoncuAdi ? `
              <div class="row">
                  <span class="label">Komisyoncu:</span>
                  <span class="value">${printData.komisyoncuAdi}</span>
              </div>
              ` : ''}
              ${printData.ureticiAdi ? `
              <div class="row">
                  <span class="label">Üretici:</span>
                  <span class="value">${printData.ureticiAdi}</span>
              </div>
              ` : ''}
              ${printData.sehir ? `
              <div class="row">
                  <span class="label">Şehir:</span>
                  <span class="value">${printData.sehir}</span>
              </div>
              ` : ''}
            </div>
            
            <div class="section">
              <div class="section-title">ÜRÜN BİLGİLERİ</div>
              <div class="row">
                  <span class="label">Ürün:</span>
                  <span class="value">${printData.urunAdi}</span>
              </div>
              <div class="row">
                  <span class="label">Kasa Sayısı:</span>
                  <span class="value">${printData.kasaSayisi}</span>
              </div>
                ${printData.paletAdi ? `
              <div class="row">
                  <span class="label">Palet:</span>
                  <span class="value">${printData.paletAdi} (${printData.paletSayisi})</span>
              </div>
              ` : ''}
            </div>
            
            <div class="section">
                <div class="section-title">${printData.birim?.toLowerCase() === 'adet' ? 'ADET BİLGİLERİ' : 'KİLOGRAM BİLGİLERİ'}</div>
                ${printData.birim?.toLowerCase() === 'adet' ? `
                <div class="row">
                  <span class="label">Kasa Sayısı:</span>
                  <span class="value">${printData.kasaSayisi} kasa</span>
                </div>
                <div class="row">
                  <span class="label">Adet Sayısı:</span>
                  <span class="value">${printData.adetSayisi} adet</span>
                </div>
                <div class="row">
                  <span class="label">Giriş Adet:</span>
                  <span class="value">${printData.adetSayisi} adet</span>
                </div>
                ${printData.cikmaKg > 0 ? `
                <div class="row">
                  <span class="label">Çıkma Adet:</span>
                  <span class="value">${printData.cikmaKg} adet</span>
                </div>
                ` : ''}
                ${printData.fireKg > 0 ? `
                <div class="row">
                  <span class="label">Fire Adet:</span>
                  <span class="value">${printData.fireKg} adet</span>
                </div>
                ` : ''}
                ${printData.netAdet > 0 ? `
                <div class="row">
                  <span class="label">Net Adet:</span>
                  <span class="value">${printData.netAdet} adet</span>
                </div>
                ` : ''}
                ` : `
                <div class="row">
                  <span class="label">Brüt KG:</span>
                  <span class="value">${printData.brutKg.toFixed(2)}</span>
                </div>
                <div class="row">
                  <span class="label">Dara KG:</span>
                  <span class="value">${printData.daraKg.toFixed(2)}</span>
                </div>
                <div class="row">
                  <span class="label">Giriş KG:</span>
                  <span class="value">${printData.girisKg.toFixed(2)}</span>
                </div>
                ${printData.cikmaKg > 0 ? `
                <div class="row">
                  <span class="label">Çıkma KG:</span>
                  <span class="value">${printData.cikmaKg.toFixed(2)}</span>
                </div>
                ` : ''}
                ${printData.fireKg > 0 ? `
                <div class="row">
                  <span class="label">Fire KG:</span>
                  <span class="value">${printData.fireKg.toFixed(2)}</span>
                </div>
                ` : ''}
                ${printData.netKg > 0 ? `
                <div class="row">
                  <span class="label">Net KG:</span>
                  <span class="value">${printData.netKg.toFixed(2)}</span>
                </div>
                ` : ''}
                `}
            </div>
            
              ${printData.notlar ? `
            <div class="section">
              <div class="section-title">NOTLAR</div>
                <div class="row">
                  <span class="value">${printData.notlar}</span>
                </div>
            </div>
            ` : ''}
              
              <div class="copy-info">
                Bu fiş ilk kayıt için yazdırılmıştır
              </div>
              
              <div class="copy-label">ORİJİNAL - MAL KABULCU İÇİN</div>
              
              <div class="qr-code">
                <img src="${qrDataUrl}" alt="QR Code" style="width: 80px; height: 80px; display: block; margin: 10px auto;" />
              </div>
              
              <div class="barcode">
                <img src="${barcodeDataUrl}" alt="Barcode" style="width: 100%; height: 50px; display: block; margin: 10px auto;" />
              </div>
              
              <div class="page-break"></div>
              
              <div class="logo">
                <img src="/logo-dark.png" alt="Webrain Logo" />
              </div>
              <div class="header">${fişBaşlığı}</div>
            
            <div class="section">
                <div class="section-title">FİŞ BİLGİLERİ</div>
              <div class="row">
                  <span class="label">Fiş No:</span>
                  <span class="value">${printData.fisNo}</span>
              </div>
              <div class="row">
                  <span class="label">Tarih:</span>
                  <span class="value">${new Date(printData.tarih).toLocaleDateString('tr-TR')}</span>
              </div>
              <div class="row">
                  <span class="label">Mal Kabulcu:</span>
                  <span class="value">${printData.malKabulcuAdi}</span>
              </div>
            </div>
            
            <div class="section">
                <div class="section-title">SATICI BİLGİLERİ</div>
                <div class="row">
                  <span class="label">Satıcı Tipi:</span>
                  <span class="value">${printData.saticiTipi}</span>
                </div>
                <div class="row">
                  <span class="label">Satıcı Adı:</span>
                  <span class="value">${printData.saticiAdi}</span>
                </div>
              </div>
              
              <div class="section">
                <div class="section-title">ÜRÜN BİLGİLERİ</div>
                <div class="row">
                  <span class="label">Ürün:</span>
                  <span class="value">${printData.urunAdi}</span>
                </div>
                <div class="row">
                  <span class="label">Kasa Sayısı:</span>
                  <span class="value">${printData.kasaSayisi}</span>
                </div>
                ${printData.paletAdi ? `
                <div class="row">
                  <span class="label">Palet:</span>
                  <span class="value">${printData.paletAdi} (${printData.paletSayisi})</span>
                </div>
                ` : ''}
            </div>
          
              <div class="section">
                <div class="section-title">${printData.birim?.toLowerCase() === 'adet' ? 'ADET BİLGİLERİ' : 'KİLOGRAM BİLGİLERİ'}</div>
                ${printData.birim?.toLowerCase() === 'adet' ? `
                <div class="row">
                  <span class="label">Kasa Sayısı:</span>
                  <span class="value">${printData.kasaSayisi} kasa</span>
                </div>
                <div class="row">
                  <span class="label">Adet Sayısı:</span>
                  <span class="value">${printData.adetSayisi} adet</span>
                </div>
                <div class="row">
                  <span class="label">Giriş Adet:</span>
                  <span class="value">${printData.adetSayisi} adet</span>
                </div>
                ${printData.cikmaKg > 0 ? `
                <div class="row">
                  <span class="label">Çıkma Adet:</span>
                  <span class="value">${printData.cikmaKg} adet</span>
                </div>
                ` : ''}
                ${printData.fireKg > 0 ? `
                <div class="row">
                  <span class="label">Fire Adet:</span>
                  <span class="value">${printData.fireKg} adet</span>
                </div>
                ` : ''}
                ${printData.netAdet > 0 ? `
                <div class="row">
                  <span class="label">Net Adet:</span>
                  <span class="value">${printData.netAdet} adet</span>
                </div>
                ` : ''}
                ` : `
                <div class="row">
                  <span class="label">Brüt KG:</span>
                  <span class="value">${printData.brutKg.toFixed(2)}</span>
                </div>
                <div class="row">
                  <span class="label">Dara KG:</span>
                  <span class="value">${printData.daraKg.toFixed(2)}</span>
                </div>
                <div class="row">
                  <span class="label">Giriş KG:</span>
                  <span class="value">${printData.girisKg.toFixed(2)}</span>
                </div>
                ${printData.cikmaKg > 0 ? `
                <div class="row">
                  <span class="label">Çıkma KG:</span>
                  <span class="value">${printData.cikmaKg.toFixed(2)}</span>
                </div>
                ` : ''}
                ${printData.fireKg > 0 ? `
                <div class="row">
                  <span class="label">Fire KG:</span>
                  <span class="value">${printData.fireKg.toFixed(2)}</span>
                </div>
                ` : ''}
                ${printData.netKg > 0 ? `
                <div class="row">
                  <span class="label">Net KG:</span>
                  <span class="value">${printData.netKg.toFixed(2)}</span>
                </div>
                ` : ''}
                `}
          </div>
          
              ${printData.notlar ? `
              <div class="section">
                <div class="section-title">NOTLAR</div>
                <div class="row">
                  <span class="value">${printData.notlar}</span>
                </div>
              </div>
              ` : ''}
              
              <div class="copy-info">
                Bu fiş ilk kayıt için yazdırılmıştır
              </div>
              
              <div style="text-align: center; margin: 15px 0; padding: 10px; background: #ffeb3b; border: 2px solid #f57f17; border-radius: 5px;">
                <div class="section-title" style="font-size: 14px; font-weight: bold; color: black; line-height: 1.4;">
                  ⚠️ ÖNEMLİ UYARI ⚠️
                </div>
                <div class="section-title" style="font-size: 13px; font-weight: bold; color: #5d1f0a; margin-top: 5px;">
                  Bu fişi tekrar geldiğinizde getirmeniz kolaylık sağlayacaktır!
                </div>
              </div>
              
              <div class="copy-label">KOPYA - ÜRETİCİ İÇİN</div>
              
              <div class="qr-code">
                <img src="${qrDataUrl}" alt="QR Code" style="width: 80px; height: 80px; display: block; margin: 10px auto;" />
              </div>
              
              <div class="barcode">
                <img src="${barcodeDataUrl}" alt="Barcode" style="width: 100%; height: 50px; display: block; margin: 10px auto;" />
              </div>
              
              <div class="thank-you">
                Bizi tercih ettiğiniz için teşekkür ederiz!
              </div>
            </body>
          </html>
        `)
        
        printWindow.document.close()
        
        // Yazdırma işlemini başlat
        setTimeout(() => {
          printWindow.print()
          printWindow.close()
          
          toast({
            title: "Fiş Yazdırıldı",
            description: "Bilgi fişi başarıyla yazdırıldı",
            variant: "success",
          })
        }, 500)
      }
    } catch (error) {
      console.error('Fiş yazdırma hatası:', error)
      toast({
        title: "Hata",
        description: "Fiş yazdırılırken hata oluştu",
        variant: "destructive",
      })
    }
  }

  // Son fiş yazdırma fonksiyonu (ürün işlendikten sonra)
  const handlePrintFinalReceipt = async () => {
    if (!receiptData) return
    
    try {
      // Fiş verilerini hazırla
      const saticiDetay = getSaticiDetay(receiptData)
      const printData = {
        fisNo: receiptData.fisNo || await generateFisNo(),
        tarih: receiptData.tarih || new Date().toISOString(),
        saticiTipi: receiptData.saticiTipi,
        saticiAdi: getSaticiAdi(receiptData),
        urunAdi: receiptData.urunAdi || '',
        birim: receiptData.birim || 'KG',
        brutKg: parseFloat(receiptData.brutKg) || 0,
        daraKg: parseFloat(receiptData.daraKg) || 0,
        girisKg: parseFloat(receiptData.girisKg) || 0,
        cikmaKg: parseFloat(receiptData.cikmaKg) || 0,
        fireKg: parseFloat(receiptData.fireKg) || 0,
        netKg: parseFloat(receiptData.netKg) || 0,
        adetSayisi: parseInt(receiptData.adetSayisi) || 0,
        netAdet: parseInt(receiptData.netAdet) || 0,
        ambalajAdi: receiptData.ambalajAdi || 'Kasa',
        kasaSayisi: parseInt(receiptData.kasaSayisi) || 0,
        paletAdi: receiptData.paletAdi || null,
        paletSayisi: parseInt(receiptData.paletSayisi) || 0,
        notlar: receiptData.notlar || '',
        malKabulcuAdi: session?.user?.name || '',
        komisyoncuAdi: saticiDetay.komisyoncuAdi,
        ureticiAdi: saticiDetay.ureticiAdi,
        sehir: saticiDetay.sehir
      }
      
      // QR kod ve barkod resimlerini oluştur
      const qrValue = `${printData.fisNo}|${printData.tarih}|${printData.saticiTipi}|${printData.urunAdi}|SON_FIS`
      
      // QR kod oluştur
      const QRCodeLib = await import('qrcode')
      const qrDataUrl = await QRCodeLib.toDataURL(qrValue, {
        width: 80,
        margin: 1,
        color: {
          dark: '#000000',
          light: '#FFFFFF'
        }
      })
      
      // Barkod oluştur
      const JsBarcode = await import('jsbarcode')
      const canvas = document.createElement('canvas')
      JsBarcode.default(canvas, printData.fisNo, {
        format: 'CODE128',
        width: 2,
        height: 50,
        displayValue: true,
        fontSize: 12,
        margin: 5
      })
      const barcodeDataUrl = canvas.toDataURL('image/png')
      
      // Yazdırma penceresini aç
      const printWindow = window.open('', '_blank')
      if (printWindow) {
        const fişBaşlığı = 'SON DURUM FİŞİ'
        
        printWindow.document.write(`
       <!DOCTYPE html>
<html>
  <head>
    <title>${fişBaşlığı} - ${printData.fisNo}</title>
    <style>
      body {
        font-family: system-ui, sans-serif;
        font-size: 11px;
        width: 80mm;
        max-width: 80mm;
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        line-height: 1.35;
        color: #000;
      }
      .header {
        text-align: center;
        font-weight: 700;
        font-size: 16px;
        margin: 6px 0;
        border-bottom: 2px solid #000;
        padding-bottom: 4px;
      }
      .section {
        margin: 6px 0;
        padding-bottom: 4px;
        border-bottom: 1px dashed #aaa;
      }
      .section-title {
        text-align: center;
        font-weight: 600;
        font-size: 12px;
        margin-bottom: 4px;
        padding: 2px 0;
        border-bottom: 1px solid #000;
      }
      .row {
        display: flex;
        justify-content: space-between;
        margin: 2px 0;
        font-size: 11px;
      }
      .label {
        font-weight: 600;
        min-width: 30mm;
      }
      .value {
        text-align: right;
        max-width: 45mm;
        word-wrap: break-word;
      }
      .copy-info {
        text-align: center;
        font-size: 9px;
        color: #444;
        margin-top: 6px;
        padding: 2px 0;
        border-top: 1px dashed #aaa;
      }
      .copy-label {
        text-align: center;
        font-size: 11px;
        font-weight: 700;
        margin: 6px 0;
        padding: 3px;
        border: 1px solid #000;
      }
      .qr-code, .barcode {
        text-align: center;
        margin: 8px 0;
      }
      .qr-code img, .barcode img {
        max-width: 55mm;
        height: auto;
      }
      .warning-box {
        text-align: center;
        margin: 10px 0;
        padding: 8px;
        border: 1px solid #000;
        border-radius: 3px;
        font-size: 11px;
        font-weight: 600;
      }
      .page-break { page-break-after: always; }

      @media print {
        @page {
          size: 80mm 210mm;
          margin: 0;
        }
        body {
          font-size: 11px !important;
        }
      }
    </style>
  </head>
  <body>
    <!-- ORİJİNAL KOPYA -->
    <div class="header">${fişBaşlığı}</div>

    <div class="section">
      <div class="section-title">FİŞ BİLGİLERİ</div>
      <div class="row"><span class="label">Fiş No:</span><span class="value">${printData.fisNo}</span></div>
      <div class="row"><span class="label">Tarih:</span><span class="value">${new Date(printData.tarih).toLocaleDateString('tr-TR')}</span></div>
      <div class="row"><span class="label">Mal Kabulcu:</span><span class="value">${printData.malKabulcuAdi}</span></div>
    </div>

    <div class="section">
      <div class="section-title">SATICI BİLGİLERİ</div>
      <div class="row"><span class="label">Satıcı Tipi:</span><span class="value">${printData.saticiTipi}</span></div>
      <div class="row"><span class="label">Satıcı Adı:</span><span class="value">${printData.saticiAdi}</span></div>
      ${printData.komisyoncuAdi ? `
      <div class="row"><span class="label">Komisyoncu:</span><span class="value">${printData.komisyoncuAdi}</span></div>` : ''}
      ${printData.ureticiAdi ? `
      <div class="row"><span class="label">Üretici:</span><span class="value">${printData.ureticiAdi}</span></div>` : ''}
      ${printData.sehir ? `
      <div class="row"><span class="label">Şehir:</span><span class="value">${printData.sehir}</span></div>` : ''}
    </div>

    <div class="section">
      <div class="section-title">ÜRÜN BİLGİLERİ</div>
      <div class="row"><span class="label">Ürün:</span><span class="value">${printData.urunAdi}</span></div>
      <div class="row"><span class="label">Kasa Sayısı:</span><span class="value">${printData.kasaSayisi}</span></div>
      ${printData.paletAdi ? `
      <div class="row"><span class="label">Palet:</span><span class="value">${printData.paletAdi} (${printData.paletSayisi})</span></div>` : ''}
    </div>

    <div class="section">
      <div class="section-title">${printData.birim?.toLowerCase() === 'adet' ? 'ADET BİLGİLERİ' : 'KİLOGRAM BİLGİLERİ'}</div>
      ${printData.birim?.toLowerCase() === 'adet' ? `
        <div class="row"><span class="label">Kasa Sayısı:</span><span class="value">${printData.kasaSayisi} kasa</span></div>
        <div class="row"><span class="label">Adet Sayısı:</span><span class="value">${printData.adetSayisi} adet</span></div>
        <div class="row"><span class="label">Giriş Adet:</span><span class="value">${printData.adetSayisi} adet</span></div>
        ${printData.cikmaKg > 0 ? `<div class="row"><span class="label">Çıkma Adet:</span><span class="value">${printData.cikmaKg} adet</span></div>` : ''}
        ${printData.fireKg > 0 ? `<div class="row"><span class="label">Fire Adet:</span><span class="value">${printData.fireKg} adet</span></div>` : ''}
        ${printData.netAdet > 0 ? `<div class="row"><span class="label">Net Adet:</span><span class="value">${printData.netAdet} adet</span></div>` : ''}
      ` : `
        <div class="row"><span class="label">Brüt KG:</span><span class="value">${printData.brutKg.toFixed(2)}</span></div>
        <div class="row"><span class="label">Dara KG:</span><span class="value">${printData.daraKg.toFixed(2)}</span></div>
        <div class="row"><span class="label">Giriş KG:</span><span class="value">${printData.girisKg.toFixed(2)}</span></div>
        ${printData.cikmaKg > 0 ? `<div class="row"><span class="label">Çıkma KG:</span><span class="value">${printData.cikmaKg.toFixed(2)}</span></div>` : ''}
        ${printData.fireKg > 0 ? `<div class="row"><span class="label">Fire KG:</span><span class="value">${printData.fireKg.toFixed(2)}</span></div>` : ''}
        ${printData.netKg > 0 ? `<div class="row"><span class="label">Net KG:</span><span class="value">${printData.netKg.toFixed(2)}</span></div>` : ''}
      `}
    </div>

    ${printData.notlar ? `
    <div class="section">
      <div class="section-title">NOTLAR</div>
      <div class="row"><span class="value">${printData.notlar}</span></div>
    </div>` : ''}

    <div class="copy-info">Bu fiş ilk kayıt için yazdırılmıştır</div>
    <div class="copy-label">ORİJİNAL - MAL KABULCU İÇİN</div>

    <div class="qr-code"><img src="${qrDataUrl}" alt="QR Code" /></div>
    <div class="barcode"><img src="${barcodeDataUrl}" alt="Barcode" /></div>

    <div class="page-break"></div>

    <!-- ÜRETİCİ KOPYASI -->
    <div class="header">${fişBaşlığı}</div>

    <div class="section">
      <div class="section-title">FİŞ BİLGİLERİ</div>
      <div class="row"><span class="label">Fiş No:</span><span class="value">${printData.fisNo}</span></div>
      <div class="row"><span class="label">Tarih:</span><span class="value">${new Date(printData.tarih).toLocaleDateString('tr-TR')}</span></div>
      <div class="row"><span class="label">Mal Kabulcu:</span><span class="value">${printData.malKabulcuAdi}</span></div>
    </div>

    <div class="section">
      <div class="section-title">SATICI BİLGİLERİ</div>
      <div class="row"><span class="label">Satıcı Tipi:</span><span class="value">${printData.saticiTipi}</span></div>
      <div class="row"><span class="label">Satıcı Adı:</span><span class="value">${printData.saticiAdi}</span></div>
    </div>

    <div class="section">
      <div class="section-title">ÜRÜN BİLGİLERİ</div>
      <div class="row"><span class="label">Ürün:</span><span class="value">${printData.urunAdi}</span></div>
      <div class="row"><span class="label">Kasa Sayısı:</span><span class="value">${printData.kasaSayisi}</span></div>
      ${printData.paletAdi ? `<div class="row"><span class="label">Palet:</span><span class="value">${printData.paletAdi} (${printData.paletSayisi})</span></div>` : ''}
    </div>

    <div class="section">
      <div class="section-title">${printData.birim?.toLowerCase() === 'adet' ? 'ADET BİLGİLERİ' : 'KİLOGRAM BİLGİLERİ'}</div>
      ${printData.birim?.toLowerCase() === 'adet' ? `
        <div class="row"><span class="label">Kasa Sayısı:</span><span class="value">${printData.kasaSayisi} kasa</span></div>
        <div class="row"><span class="label">Adet Sayısı:</span><span class="value">${printData.adetSayisi} adet</span></div>
        <div class="row"><span class="label">Giriş Adet:</span><span class="value">${printData.adetSayisi} adet</span></div>
        ${printData.cikmaKg > 0 ? `<div class="row"><span class="label">Çıkma Adet:</span><span class="value">${printData.cikmaKg} adet</span></div>` : ''}
        ${printData.fireKg > 0 ? `<div class="row"><span class="label">Fire Adet:</span><span class="value">${printData.fireKg} adet</span></div>` : ''}
        ${printData.netAdet > 0 ? `<div class="row"><span class="label">Net Adet:</span><span class="value">${printData.netAdet} adet</span></div>` : ''}
      ` : `
        <div class="row"><span class="label">Brüt KG:</span><span class="value">${printData.brutKg.toFixed(2)}</span></div>
        <div class="row"><span class="label">Dara KG:</span><span class="value">${printData.daraKg.toFixed(2)}</span></div>
        <div class="row"><span class="label">Giriş KG:</span><span class="value">${printData.girisKg.toFixed(2)}</span></div>
        ${printData.cikmaKg > 0 ? `<div class="row"><span class="label">Çıkma KG:</span><span class="value">${printData.cikmaKg.toFixed(2)}</span></div>` : ''}
        ${printData.fireKg > 0 ? `<div class="row"><span class="label">Fire KG:</span><span class="value">${printData.fireKg.toFixed(2)}</span></div>` : ''}
        ${printData.netKg > 0 ? `<div class="row"><span class="label">Net KG:</span><span class="value">${printData.netKg.toFixed(2)}</span></div>` : ''}
      `}
    </div>

    ${printData.notlar ? `
    <div class="section">
      <div class="section-title">NOTLAR</div>
      <div class="row"><span class="value">${printData.notlar}</span></div>
    </div>` : ''}

    <div class="copy-info">Bu fiş ilk kayıt için yazdırılmıştır</div>

    <div class="warning-box">
      ⚠️ Bu fişi tekrar geldiğinizde getirmeniz kolaylık sağlayacaktır!
    </div>

    <div class="copy-label">KOPYA - ÜRETİCİ İÇİN</div>

    <div class="qr-code"><img src="${qrDataUrl}" alt="QR Code" /></div>
    <div class="barcode"><img src="${barcodeDataUrl}" alt="Barcode" /></div>
  </body>
    </html>
    `)
        
        printWindow.document.close()
        
        // Yazdırma işlemini başlat
        setTimeout(() => {
          printWindow.print()
          printWindow.close()
          
          toast({
            title: "Son Fiş Yazdırıldı",
            description: "Son durum fişi başarıyla yazdırıldı",
            variant: "success",
          })
        }, 500)
      }
    } catch (error) {
      console.error('Son fiş yazdırma hatası:', error)
      toast({
        title: "Hata",
        description: "Son fiş yazdırılırken hata oluştu",
        variant: "destructive",
      })
    }
  }

  // Template sistemi fonksiyonları
  const saveAsTemplate = () => {
    const template = {
      id: Date.now().toString(),
      name: `${formData.saticiTipi} - ${formData.urunId ? urunler.find(u => u.id === formData.urunId)?.ad : 'Ürün'}`,
      data: { ...formData },
      createdAt: new Date().toISOString(),
      usageCount: 0
    }
    
    const newTemplates = [...templates, template]
    setTemplates(newTemplates)
    localStorage.setItem('malKabulTemplates', JSON.stringify(newTemplates))
    
    toast({
      title: "Template Kaydedildi",
      description: `${template.name} adıyla template kaydedildi`,
      variant: "success",
    })
  }

  const loadTemplate = (template: any) => {
    setFormData(template.data)
    setSelectedTemplate(template)
    
    // Template kullanım sayısını artır
    const updatedTemplates = templates.map(t => 
      t.id === template.id ? { ...t, usageCount: t.usageCount + 1 } : t
    )
    setTemplates(updatedTemplates)
    localStorage.setItem('malKabulTemplates', JSON.stringify(updatedTemplates))
    
    toast({
      title: "Template Yüklendi",
      description: `${template.name} template'i uygulandı`,
      variant: "success",
    })
  }

  const deleteTemplate = (templateId: string) => {
    const newTemplates = templates.filter(t => t.id !== templateId)
    setTemplates(newTemplates)
    localStorage.setItem('malKabulTemplates', JSON.stringify(newTemplates))
    
    toast({
      title: "Template Silindi",
      description: "Template başarıyla silindi",
      variant: "success",
    })
  }

  // Hızlı kopyalama fonksiyonları
  const copyFromLastRecord = (record: any) => {
    setFormData({
      ...formData,
      saticiTipi: record.saticiTipi,
      komisyoncuId: record.komisyoncuId || '',
      ureticiId: record.ureticiId || '',
      mustahsilId: record.mustahsilId || '',
      ozelFirmaId: record.ozelFirmaId || '',
      urunId: record.urunId || '',
      kasaSayisi: record.kasaSayisi || '',
      adetSayisi: record.adetSayisi || '',
      netAdet: record.netAdet || '',
      notlar: record.notlar || ''
    })
    
    toast({
      title: "Veri Kopyalandı",
      description: "Önceki kayıttan veri kopyalandı",
      variant: "success",
    })
  }

  // Otomatik kaydetme fonksiyonları
  const autoSave = () => {
    if (hasUnsavedChanges && formData.cariId && formData.urunId) {
      const autoSaveData = {
        ...formData,
        timestamp: new Date().toISOString()
      }
      
      localStorage.setItem('malKabulAutoSave', JSON.stringify(autoSaveData))
      setLastAutoSave(new Date())
      setHasUnsavedChanges(false)
      
    }
  }

  const loadAutoSave = () => {
    const autoSaveData = localStorage.getItem('malKabulAutoSave')
    if (autoSaveData) {
      try {
        const data = JSON.parse(autoSaveData)
        setFormData(data)
        setHasUnsavedChanges(false)
        
        toast({
          title: "Otomatik Kayıt Yüklendi",
          description: "Son otomatik kayıt yüklendi",
          variant: "success",
        })
      } catch (error) {
        console.error('Otomatik kayıt yükleme hatası:', error)
      }
    }
  }

  // Batch processing fonksiyonları
  const addBatchItem = () => {
    const newItem = {
      id: Date.now().toString(),
      urunId: '',
      urunKodu: '', // Ürün arama için eklendi
      kasaSayisi: '',
      brutKg: '',
      daraKg: '',
      girisKg: '',
      notlar: ''
    }
    setBatchItems([...batchItems, newItem])
  }

  const removeBatchItem = (itemId: string) => {
    setBatchItems(batchItems.filter(item => item.id !== itemId))
  }

  const saveBatchItems = async () => {
    setLoading(true)
    try {
      for (const item of batchItems) {
        if (item.urunId && item.kasaSayisi && item.brutKg) {
          const batchFormData = {
            ...formData,
            urunId: item.urunId,
            kasaSayisi: item.kasaSayisi,
            brutKg: item.brutKg,
            daraKg: item.daraKg || '0',
            girisKg: item.girisKg || (parseFloat(item.brutKg) - parseFloat(item.daraKg || '0')).toString(),
            notlar: item.notlar
          }
          
          // Her item için ayrı kayıt oluştur
          await createMalKabulRecord(batchFormData)
        }
      }
      
      setBatchItems([])
      setBatchMode(false)
      
      toast({
        title: "Toplu Kayıt Tamamlandı",
        description: `${batchItems.length} adet kayıt başarıyla oluşturuldu`,
        variant: "success",
      })
    } catch (error) {
      console.error('Toplu kayıt hatası:', error)
      toast({
        title: "Hata",
        description: "Toplu kayıt sırasında hata oluştu",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  // Form sıfırlama fonksiyonu
  const resetForm = () => {
    setFormData({
      cariKodu: '',
      cariId: '',
      cariTipi: '',
      urunKodu: '',
      urunId: '',
      paletId: '',
      ambalajId: '',
      paletSayisi: '',
      kasaSayisi: '',
      adetSayisi: '',
      brutKg: '',
      daraKg: '',
      girisKg: '',
      cikmaKg: '',
      fireKg: '',
      netKg: '',
      netAdet: '',
      notlar: '',
      saticiTipi: '',
      komisyoncuId: '',
      ureticiId: '',
      mustahsilId: '',
      ozelFirmaId: ''
    })
    setHasUnsavedChanges(false)
    setSelectedTemplate(null)
    setSelectedLastRecord(null)
  }

  // Mal kabul kaydı oluşturma fonksiyonu (batch processing için)
  const createMalKabulRecord = async (data: any) => {
    try {
      const response = await fetch('/api/mal-kabul', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          saticiTipi: data.cariTipi, // cariTipi kullan
          komisyoncuId: data.cariTipi === 'KOMISYONCU' ? data.komisyoncuId : null,
          ureticiId: data.cariTipi === 'KOMISYONCU' ? data.ureticiId : null,
          mustahsilId: data.cariTipi === 'MUSTAHSIL' ? data.mustahsilId : null,
          ozelFirmaId: data.cariTipi === 'OZEL_FIRMA' ? data.ozelFirmaId : null,
          urunId: data.urunId,
          kasaSayisi: data.kasaSayisi,
          brutKg: data.brutKg,
          daraKg: data.daraKg,
          girisKg: data.girisKg,
          notlar: data.notlar
        }),
      })

      if (!response.ok) {
        throw new Error('Mal kabul kaydı oluşturulamadı')
      }

      return await response.json()
    } catch (error) {
      console.error('Mal kabul kaydı oluşturma hatası:', error)
      throw error
    }
  }

  // Template'leri localStorage'dan yükle
  const loadTemplatesFromStorage = () => {
    try {
      const savedTemplates = localStorage.getItem('malKabulTemplates')
      if (savedTemplates) {
        setTemplates(JSON.parse(savedTemplates))
      }
    } catch (error) {
      console.error('Template yükleme hatası:', error)
    }
  }

  // Son kayıtları getir
  const loadLastRecords = async () => {
    try {
      const response = await fetch('/api/mal-kabul?limit=10')
      if (response.ok) {
        const data = await response.json()
        setLastRecords(data.records || [])
      }
    } catch (error) {
      console.error('Son kayıtları getirme hatası:', error)
    }
  }

  // Otomatik kaydetme useEffect'i
  useEffect(() => {
    if (!autoSaveEnabled) return

    const interval = setInterval(() => {
      if (hasUnsavedChanges) {
        autoSave()
      }
    }, autoSaveInterval)

    return () => clearInterval(interval)
  }, [autoSaveEnabled, autoSaveInterval, hasUnsavedChanges])

  // Form değişikliklerini takip et
  useEffect(() => {
    if (formData.cariId || formData.urunId) {
      setHasUnsavedChanges(true)
    }
  }, [formData])

  // Ürün arama filtreleme
  useEffect(() => {
    if (urunSearchTerm.trim() === '') {
      setFilteredUrunler(urunler)
    } else {
      const filtered = urunler.filter(urun => 
        urun.ad.toLowerCase().includes(urunSearchTerm.toLowerCase()) ||
        urun.stokKodu?.toLowerCase().includes(urunSearchTerm.toLowerCase()) ||
        urun.kategori?.toLowerCase().includes(urunSearchTerm.toLowerCase())
      )
      setFilteredUrunler(filtered)
    }
  }, [urunSearchTerm, urunler])

  return (
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
            <Link href="/dashboard/mal-kabul/test">
              <Button variant="outline" size="sm">
                📊 Excel Test
              </Button>
            </Link>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => window.open('/dashboard/mal-kabul/test', '_blank')}
              title="Excel tarzı sayfada hızlı veri girişi yapın, sonra buraya aktarın"
            >
              📥 Excel'den Veri Aktar
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-foreground">Yeni Mal Kabul</h1>
              <p className="text-muted-foreground">Yeni mal kabul kaydı oluşturun</p>
            </div>
          </div>
          
          {/* Hızlı İşlem Butonları */}
          <div className="flex items-center gap-2">
            {/* Hızlı Kopyalama */}
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowLastRecords(true)}
              disabled={lastRecords.length === 0}
              title="Ctrl+R - Son kayıtlardan kopyala"
            >
              📋 Son Kayıtlar ({lastRecords.length})
            </Button>
            
            {/* Batch Processing */}
            <Button
              variant="outline"
              size="sm"
              onClick={() => setBatchMode(!batchMode)}
              title="Ctrl+B - Toplu mod aç/kapat"
            >
              📦 {batchMode ? 'Toplu Mod Kapalı' : 'Toplu Mod Açık'}
            </Button>
            
            {/* Form Sıfırlama */}
            <Button
              variant="outline"
              size="sm"
              onClick={resetForm}
              title="Ctrl+F - Formu sıfırla"
            >
              🔄 Form Sıfırla
            </Button>
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
                          <SelectContent className="max-h-48">
                            {komisyoncular.slice(0, 10).map((komisyoncu) => (
                              <SelectItem key={komisyoncu.id} value={komisyoncu.id}>
                                <div className="flex justify-between items-center">
                                  <span className="truncate">{komisyoncu.dukkanAdi}</span>
                                  <span className="text-xs text-muted-foreground ml-2 flex-shrink-0">{komisyoncu.sehir}</span>
                                </div>
                              </SelectItem>
                            ))}
                            {komisyoncular.length > 10 && (
                              <SelectItem value="more" disabled className="text-center text-muted-foreground">
                                +{komisyoncular.length - 10} komisyoncu daha...
                              </SelectItem>
                            )}
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
                          <SelectContent className="max-h-48">
                            {filteredUreticiler.length === 0 ? (
                              <SelectItem value="no-uretici" disabled>
                                {formData.komisyoncuId ? "Bu komisyoncuya bağlı üretici bulunamadı" : "Üretici seçmek için önce komisyoncu seçin"}
                              </SelectItem>
                            ) : (
                              <>
                                {filteredUreticiler.slice(0, 10).map((uretici) => (
                                <SelectItem key={uretici.id} value={uretici.id}>
                                    <div className="flex justify-between items-center">
                                      <span className="truncate">{uretici.ad} {uretici.soyad}</span>
                                      <span className="text-xs text-muted-foreground ml-2 flex-shrink-0">{uretici.sehir}</span>
                                    </div>
                                </SelectItem>
                                ))}
                                {filteredUreticiler.length > 10 && (
                                  <SelectItem value="more" disabled className="text-center text-muted-foreground">
                                    +{filteredUreticiler.length - 10} üretici daha...
                                  </SelectItem>
                                )}
                              </>
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
                        onValueChange={handleOzelFirmaChange}
                        required
                        disabled={loading}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder={loading ? "Yükleniyor..." : "Özel firma seçin"} />
                        </SelectTrigger>
                        <SelectContent className="max-h-48">
                          {ozelFirmalar.length === 0 ? (
                            <SelectItem value="no-ozel-firma" disabled>
                              Özel firma bulunamadı
                            </SelectItem>
                          ) : (
                            <>
                              {ozelFirmalar.slice(0, 10).map((firma) => (
                              <SelectItem key={firma.id} value={firma.id}>
                                  <div className="flex justify-between items-center">
                                    <span className="truncate">{firma.firmaAdi}</span>
                                    <span className="text-xs text-muted-foreground ml-2 flex-shrink-0">{firma.sehir}</span>
                                  </div>
                              </SelectItem>
                              ))}
                              {ozelFirmalar.length > 10 && (
                                <SelectItem value="more" disabled className="text-center text-muted-foreground">
                                  +{ozelFirmalar.length - 10} firma daha...
                                </SelectItem>
                              )}
                            </>
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
                        onValueChange={handleMustahsilChange}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Müstahsil seçin" />
                        </SelectTrigger>
                        <SelectContent className="max-h-48">
                                                  {mustahsil.length === 0 ? (
                          <SelectItem value="no-mustahsil" disabled>
                            Müstahsil bulunamadı
                            </SelectItem>
                        ) : (
                            <>
                              {mustahsil.slice(0, 10).map((mustahsil) => (
                            <SelectItem key={mustahsil.id} value={mustahsil.id}>
                                  <div className="flex justify-between items-center">
                                    <span className="truncate">{mustahsil.ad} {mustahsil.soyad}</span>
                                    <span className="text-xs text-muted-foreground ml-2 flex-shrink-0">{mustahsil.tcKimlikNo}</span>
                                  </div>
                            </SelectItem>
                              ))}
                              {mustahsil.length > 10 && (
                                <SelectItem value="more" disabled className="text-center text-muted-foreground">
                                  +{mustahsil.length - 10} müstahsil daha...
                                </SelectItem>
                              )}
                            </>
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


                  {/* Ürün Dropdown Seçimi - HeroUI Autocomplete */}
                  <div className="space-y-2">
                    <Label htmlFor="urunId">Ürün Seçimi *</Label>
                    <Autocomplete
                      className="w-full"
                      defaultItems={urunler}
                      placeholder="Ürün ara veya seç..."
                      selectedKey={formData.urunId}
                      onSelectionChange={(key) => {
                        const selectedUrun = urunler.find(u => u.id === key)
                        if (selectedUrun) {
                          handleUrunSelect(selectedUrun)
                        }
                      }}
                      onInputChange={(value) => setUrunSearchTerm(value)}
                      classNames={{
                        base: "w-full",
                        listbox: "bg-background border border-border rounded-md shadow-lg max-h-60",
                        listboxWrapper: "max-h-60",
                        popoverContent: "bg-background border border-border rounded-md shadow-lg"
                      }}
                    >
                      {(urun) => (
                        <AutocompleteItem key={urun.id} textValue={urun.ad}>
                          <div className="flex justify-between items-center w-full">
                            <div className="min-w-0 flex-1">
                              <div className="font-medium text-sm truncate">{urun.ad}</div>
                              <div className="text-xs text-muted-foreground truncate">
                                {urun.stokKodu || `URN${urun.id.slice(-3)}`}
                              </div>
                            </div>
                            <div className="text-xs text-muted-foreground ml-2 flex-shrink-0">
                              {urun.birim}
                            </div>
                          </div>
                        </AutocompleteItem>
                      )}
                    </Autocomplete>
                    
                    <div className="text-xs text-muted-foreground">
                      Ürün adı, kodu veya kategori ile arama yapabilirsiniz
                    </div>
                  </div>

                  {/* Seçilen Ürün Bilgisi */}
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
                    {isAdetBased ? (
                      <>
                        <Package className="h-5 w-5" />
                        Adet Bilgileri
                      </>
                    ) : (
                      <>
                    <Scale className="h-5 w-5" />
                    Ağırlık Bilgileri
                      </>
                    )}
                  </CardTitle>
                  <CardDescription>
                    {isAdetBased 
                      ? "Kasa sayısı ve adet bilgileri" 
                      : "Brüt, dara, giriş ve fire bilgileri"
                    }
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {isAdetBased ? (
                    // ADET birimi için adet alanları
                    <>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="kasaSayisi">Kasa Sayısı *</Label>
                          <Input
                            id="kasaSayisi"
                            type="number"
                            value={formData.kasaSayisi}
                            onChange={(e) => setFormData({...formData, kasaSayisi: e.target.value})}
                            placeholder="0"
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="adetSayisi">Adet Sayısı *</Label>
                          <Input
                            id="adetSayisi"
                            type="number"
                            value={formData.adetSayisi}
                            onChange={(e) => setFormData({...formData, adetSayisi: e.target.value})}
                            placeholder="0"
                            required
                          />
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="cikmaAdet">Çıkma Adet</Label>
                          <Input
                            id="cikmaAdet"
                            type="number"
                            value={formData.cikmaKg || ''} // Geçici olarak cikmaKg alanını kullan
                            onChange={(e) => setFormData({...formData, cikmaKg: e.target.value})}
                            placeholder="0"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="fireAdet">Fire Adet</Label>
                          <Input
                            id="fireAdet"
                            type="number"
                            value={formData.fireKg || ''} // Geçici olarak fireKg alanını kullan
                            onChange={(e) => setFormData({...formData, fireKg: e.target.value})}
                            placeholder="0"
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="netAdet">Net Adet (Otomatik)</Label>
                        <Input
                          id="netAdet"
                          type="number"
                          value={(() => {
                            const girisAdet = parseInt(formData.adetSayisi) || 0
                            const cikmaAdet = parseInt(formData.cikmaKg) || 0
                            const fireAdet = parseInt(formData.fireKg) || 0
                            return (girisAdet - cikmaAdet - fireAdet).toString()
                          })()}
                          placeholder="0"
                          readOnly
                          className="bg-muted"
                        />
                      </div>
                    </>
                  ) : (
                    // KG birimi için ağırlık alanları
                    <>
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
                        <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                            <Label htmlFor="cikmaKg">Çıkma KG</Label>
                      <Input
                              id="cikmaKg"
                        type="number"
                        step="0.01"
                              value={formData.cikmaKg}
                              onChange={(e) => setFormData({...formData, cikmaKg: e.target.value})}
                        placeholder="0.00"
                      />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="fireKg">Fire KG</Label>
                            <Input
                              id="fireKg"
                              type="number"
                              step="0.01"
                              value={formData.fireKg}
                              onChange={(e) => setFormData({...formData, fireKg: e.target.value})}
                              placeholder="0.00"
                            />
                          </div>
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
                            const cikmaKg = parseFloat(formData.cikmaKg) || 0
                            const fireKg = parseFloat(formData.fireKg) || 0
                            return (girisKg - cikmaKg - fireKg).toFixed(2)
                      })()}
                      placeholder="0.00"
                      readOnly
                      className="bg-muted"
                    />
                  </div>
                    </>
                  )}
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
            {/* Form Sıfırlama */}
            <Button
              type="button"
              variant="outline"
              onClick={resetForm}
              title="Ctrl+F - Formu sıfırla"
            >
              🔄 Form Sıfırla
            </Button>
            
            {/* Ana Kaydet Butonu */}
            <Button type="submit" disabled={loading} title="Ctrl+S - Hızlı kaydet">
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
                {receiptData.komisyoncuAdi && (
                  <div className="flex justify-between">
                    <span className="font-medium text-foreground"><strong>Komisyoncu:</strong></span>
                    <span className="text-foreground">{receiptData.komisyoncuAdi}</span>
                  </div>
                )}
                {receiptData.ureticiAdi && (
                  <div className="flex justify-between">
                    <span className="font-medium text-foreground"><strong>Üretici:</strong></span>
                    <span className="text-foreground">{receiptData.ureticiAdi}</span>
                  </div>
                )}
                {receiptData.sehir && (
                  <div className="flex justify-between">
                    <span className="font-medium text-foreground"><strong>Şehir:</strong></span>
                    <span className="text-foreground">{receiptData.sehir}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="font-medium text-foreground"><strong>Ürün:</strong></span>
                  <span className="text-foreground">{receiptData.urunAdi}</span>
                </div>
                
                {receiptData.isAdetBased ? (
                  // ADET birimi için adet bilgileri
                  <>
                    <div className="flex justify-between">
                      <span className="font-medium text-foreground"><strong>Kasa Sayısı:</strong></span>
                      <span className="text-foreground">{receiptData.kasaSayisi} adet</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium text-foreground"><strong>Adet Sayısı:</strong></span>
                      <span className="text-foreground">{receiptData.adetSayisi} adet</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium text-foreground"><strong>Çıkma Adet:</strong></span>
                      <span className="text-foreground">{receiptData.cikmaKg || 0} adet</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium text-foreground"><strong>Fire Adet:</strong></span>
                      <span className="text-foreground">{receiptData.fireKg || 0} adet</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium text-foreground"><strong>Net Adet:</strong></span>
                      <span className="text-foreground">{receiptData.netAdet || 0} adet</span>
                    </div>
                  </>
                ) : (
                  // KG birimi için ağırlık bilgileri
                  <>
                <div className="flex justify-between">
                  <span className="font-medium text-foreground"><strong>Brüt KG:</strong></span>
                  <span className="text-foreground">{receiptData.brutKg} kg</span>
                </div>
                <div className="flex justify-between">
                      <span className="font-medium text-foreground"><strong>Giriş KG:</strong></span>
                  <span className="text-foreground">{receiptData.girisKg} kg</span>
                </div>
                    <div className="flex justify-between">
                      <span className="font-medium text-foreground"><strong>Çıkma KG:</strong></span>
                      <span className="text-foreground">{receiptData.cikmaKg || 0} kg</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium text-foreground"><strong>Fire KG:</strong></span>
                      <span className="text-foreground">{receiptData.fireKg || 0} kg</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium text-foreground"><strong>Net KG:</strong></span>
                      <span className="text-foreground">{receiptData.netKg || 0} kg</span>
                    </div>
                <div className="flex justify-between">
                  <span className="font-medium text-foreground"><strong>Kasa Sayısı:</strong></span>
                  <span className="text-foreground">{receiptData.kasaSayisi} adet</span>
                </div>
                  </>
                )}
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

            {/* Yazdırma Butonları */}
            <div className="flex justify-center gap-4">
              <Button onClick={handlePrint} className="px-6">
                <Printer className="mr-2 h-4 w-4" />
                İlk Kayıt Fişi
              </Button>
              <Button 
                onClick={handlePrintFinalReceipt} 
                className="px-6"
                variant="secondary"
                disabled={!receiptData?.cikmaKg || parseFloat(receiptData?.cikmaKg) <= 0}
              >
                <Printer className="mr-2 h-4 w-4" />
                Son Durum Fişi
              </Button>
            </div>
            
            {(!receiptData?.cikmaKg || parseFloat(receiptData?.cikmaKg) <= 0) && (
              <div className="mt-2 text-center text-sm text-muted-foreground">
                Son durum fişi için çıkma KG bilgisi gerekli
              </div>
            )}

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
              
              {/* Test QR Kodu */}
              <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                <p className="text-sm text-yellow-800 font-medium mb-2">Test QR Kodu:</p>
                <div className="flex justify-center">
                  <QRCode 
                    value="HNR0001|2025-01-05|MUSTAHSIL|Test Ürün" 
                    size={100} 
                    className="border border-gray-300 rounded"
                  />
                </div>
                <p className="text-xs text-yellow-700 mt-2">
                  Bu QR kodu tarayarak test edebilirsiniz
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Global Suggestions */}
      {showGlobalSuggestions && globalSuggestions.length > 0 && (
        <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50 bg-background border border-border rounded-lg shadow-lg p-3 max-w-md w-full">
          <div className="text-sm font-medium mb-2">
            🔍 Hızlı Seçim: <span className="text-primary font-bold">{globalInput}</span>
          </div>
          <div className="space-y-1 max-h-40 overflow-y-auto">
            {globalSuggestions.slice(0, 8).map((item, index) => (
              <button
                key={index}
                onClick={() => handleGlobalSelect(item)}
                className="w-full text-left p-2 hover:bg-accent rounded-md transition-colors border border-transparent hover:border-border"
              >
                <div className="font-medium text-primary text-sm">{item.kod}</div>
                <div className="text-xs text-muted-foreground truncate">{item.ad}</div>
                <div className="text-xs text-muted-foreground capitalize">{item.tip?.toLowerCase().replace('_', ' ')}</div>
              </button>
            ))}
            {globalSuggestions.length > 8 && (
              <div className="text-xs text-muted-foreground text-center py-1 border-t border-border">
                +{globalSuggestions.length - 8} sonuç daha...
              </div>
            )}
          </div>
          <div className="text-xs text-muted-foreground mt-2 text-center">
            Enter: Seç | Escape: İptal | Backspace: Sil
          </div>
          <div className="text-xs text-muted-foreground mt-1 text-center border-t border-border pt-2">
            💡 Kısayollar: Ctrl+S (Kaydet), Ctrl+R (Son Kayıtlar), Ctrl+B (Toplu Mod)
          </div>
        </div>
      )}
      
      {/* Global Input Debug */}
      {globalInput && (
        <div className="fixed bottom-4 right-4 z-50 bg-primary text-primary-foreground px-3 py-2 rounded-lg text-sm font-mono">
          Global Input: {globalInput}
        </div>
      )}
    
      {/* Template Sistemi Modal */}
      {showTemplates && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-background border border-border rounded-lg p-4 max-w-2xl w-full max-h-[60vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-lg font-semibold">📋 Template Sistemi</h3>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowTemplates(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="space-y-4">
              {/* Mevcut Template'ler */}
              <div>
                <h4 className="font-medium mb-2">Mevcut Template'ler</h4>
                {templates.length === 0 ? (
                  <p className="text-muted-foreground text-sm">Henüz template kaydedilmemiş</p>
                ) : (
                  <div className="space-y-2">
                    {templates.map((template) => (
                      <div key={template.id} className="flex items-center justify-between p-3 border border-border rounded-lg">
                        <div className="flex-1">
                          <div className="font-medium">{template.name}</div>
                          <div className="text-sm text-muted-foreground">
                            Oluşturulma: {new Date(template.createdAt).toLocaleDateString('tr-TR')} | 
                            Kullanım: {template.usageCount} kez
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button
                            size="sm"
                            onClick={() => {
                              loadTemplate(template)
                              setShowTemplates(false)
                            }}
                          >
                            Yükle
                          </Button>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => deleteTemplate(template.id)}
                          >
                            Sil
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              
              {/* Yeni Template Kaydetme */}
              <div className="border-t border-border pt-4">
                <h4 className="font-medium mb-2">Mevcut Formu Template Olarak Kaydet</h4>
                <div className="flex items-center gap-2">
                  <Input
                    placeholder="Template adı (otomatik oluşturulacak)"
                    value={`${formData.saticiTipi || 'Genel'} - ${formData.urunId ? urunler.find(u => u.id === formData.urunId)?.ad || 'Ürün' : 'Ürün'}`}
                    disabled
                  />
                  <Button
                    onClick={() => {
                      saveAsTemplate()
                      setShowTemplates(false)
                    }}
                    disabled={!formData.cariId || !formData.urunId}
                  >
                    Template Kaydet
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Son Kayıtlar Modal */}
      {showLastRecords && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-background border border-border rounded-lg p-4 max-w-4xl w-full max-h-[60vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-lg font-semibold">📋 Son Kayıtlar</h3>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowLastRecords(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="space-y-2">
              {lastRecords.length === 0 ? (
                <p className="text-muted-foreground text-sm">Henüz kayıt bulunamadı</p>
              ) : (
                lastRecords.map((record) => (
                  <div key={record.id} className="flex items-center justify-between p-3 border border-border rounded-lg">
                    <div className="flex-1">
                      <div className="font-medium">
                        {record.fisNo} - {record.saticiTipi}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {record.tarih} | {record.urun?.ad || 'Ürün'} | {record.kasaSayisi} kasa
                      </div>
                    </div>
                    <Button
                      size="sm"
                      onClick={() => {
                        copyFromLastRecord(record)
                        setShowLastRecords(false)
                      }}
                    >
                      Kopyala
                    </Button>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}

      {/* Batch Processing Modal */}
      {batchMode && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-background border border-border rounded-lg p-4 max-w-5xl w-full max-h-[70vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-lg font-semibold">📦 Toplu Ürün Kaydı</h3>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setBatchMode(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="space-y-4">
              {/* Cari Bilgisi */}
              <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="text-sm font-medium text-blue-800 mb-1">📋 Toplu Kayıt Cari Bilgisi</div>
                <div className="text-xs text-blue-700">
                  <div><strong>Tip:</strong> {formData.cariTipi === 'KOMISYONCU' ? 'KOMİSYONCU' : formData.cariTipi === 'MUSTAHSIL' ? 'MÜSTAHSİL' : 'ÖZEL FİRMA'}</div>
                  <div><strong>Ad:</strong> {
                    formData.cariTipi === 'KOMISYONCU' ? 
                      komisyoncular.find(k => k.id === formData.komisyoncuId)?.dukkanAdi || 'Seçilmedi' :
                    formData.cariTipi === 'MUSTAHSIL' ? 
                      mustahsil.find(m => m.id === formData.mustahsilId)?.ad + ' ' + mustahsil.find(m => m.id === formData.mustahsilId)?.soyad || 'Seçilmedi' :
                    formData.cariTipi === 'OZEL_FIRMA' ? 
                      ozelFirmalar.find(f => f.id === formData.ozelFirmaId)?.firmaAdi || 'Seçilmedi' : 'Seçilmedi'
                  }</div>
                </div>
              </div>

              {/* Cari Seçimi Uyarısı */}
              {!formData.cariId && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                  <div className="text-sm font-medium text-red-800 mb-1">⚠️ Cari Seçimi Gerekli</div>
                  <div className="text-xs text-red-700">
                    Toplu kayıt yapabilmek için önce ana formda cari seçimi yapmalısınız.
                  </div>
                </div>
              )}

              {/* Batch Items */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <h4 className="font-medium">Ürün Listesi</h4>
                  <Button size="sm" onClick={addBatchItem}>
                    + Ürün Ekle
                  </Button>
                </div>
                
                {batchItems.length === 0 ? (
                  <p className="text-muted-foreground text-sm">Henüz ürün eklenmemiş</p>
                ) : (
                  <div className="space-y-3">
                    {batchItems.map((item, index) => (
                      <div key={item.id} className="grid grid-cols-6 gap-2 p-3 border border-border rounded-lg">
                        <div>
                          <Label className="text-xs">Ürün</Label>
                          <div className="relative">
                            <Input
                              placeholder="Ürün ara..."
                              value={item.urunKodu || ''}
                              onChange={(e) => {
                                const searchTerm = e.target.value
                                const updatedItems = [...batchItems]
                                updatedItems[index].urunKodu = searchTerm
                                
                                // Ürün arama
                                if (searchTerm.trim()) {
                                  const foundUrun = urunler.find(urun => 
                                    urun.ad.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                    urun.stokKodu?.toLowerCase().includes(searchTerm.toLowerCase())
                                  )
                                  if (foundUrun) {
                                    updatedItems[index].urunId = foundUrun.id
                                    updatedItems[index].urunKodu = foundUrun.ad
                                  }
                                } else {
                                  updatedItems[index].urunId = ''
                                  updatedItems[index].urunKodu = ''
                                }
                                
                                setBatchItems(updatedItems)
                              }}
                              className="h-8 text-xs"
                            />
                            {item.urunId && (
                              <div className="absolute -bottom-6 left-0 text-xs text-green-600 bg-green-50 px-1 rounded">
                                ✓ {urunler.find(u => u.id === item.urunId)?.ad}
                              </div>
                            )}
                          </div>
                        </div>
                        <div>
                          <Label className="text-xs">Kasa</Label>
                          <Input
                            type="number"
                            value={item.kasaSayisi}
                            onChange={(e) => {
                              const updatedItems = [...batchItems]
                              updatedItems[index].kasaSayisi = e.target.value
                              setBatchItems(updatedItems)
                            }}
                            className="h-8"
                            placeholder="0"
                          />
                        </div>
                        <div>
                          <Label className="text-xs">Brüt KG</Label>
                          <Input
                            type="number"
                            value={item.brutKg}
                            onChange={(e) => {
                              const updatedItems = [...batchItems]
                              updatedItems[index].brutKg = e.target.value
                              setBatchItems(updatedItems)
                            }}
                            className="h-8"
                            placeholder="0"
                          />
                        </div>
                        <div>
                          <Label className="text-xs">Dara KG</Label>
                          <Input
                            type="number"
                            value={item.daraKg}
                            onChange={(e) => {
                              const updatedItems = [...batchItems]
                              updatedItems[index].daraKg = e.target.value
                              setBatchItems(updatedItems)
                            }}
                            className="h-8"
                            placeholder="0"
                          />
                        </div>
                        <div>
                          <Label className="text-xs">Not</Label>
                          <Input
                            value={item.notlar}
                            onChange={(e) => {
                              const updatedItems = [...batchItems]
                              updatedItems[index].notlar = e.target.value
                              setBatchItems(updatedItems)
                            }}
                            className="h-8"
                            placeholder="Not"
                          />
                        </div>
                        <div className="flex items-end">
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => removeBatchItem(item.id)}
                            className="h-8"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              
              {/* Batch Actions */}
              <div className="flex justify-end gap-2 pt-4 border-t border-border">
                <Button
                  variant="outline"
                  onClick={() => setBatchMode(false)}
                >
                  İptal
                </Button>
                <Button
                  onClick={saveBatchItems}
                  disabled={batchItems.length === 0 || loading || !formData.cariId}
                >
                  {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                  Toplu Kaydet ({batchItems.length} ürün)
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
