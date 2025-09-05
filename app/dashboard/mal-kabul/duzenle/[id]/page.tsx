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
import QRCode from 'qrcode'
import JsBarcode from 'jsbarcode'
import { useToast } from '@/components/ui/use-toast'
import Link from 'next/link'

interface MalKabulRecord {
  id: string
  fisNo: string
  tarih: string
  saticiTipi: 'OZEL_FIRMA' | 'KOMISYONCU' | 'MUSTAHSIL' | 'URETICI'
  komisyoncuId?: string
  ureticiId?: string
  ozelFirmaId?: string
  mustahsilId?: string
  urunId: string
  paletId?: string
  ambalajId?: string
  paletSayisi: number
  kasaSayisi: number
  adetSayisi: number
  brutKg: number
  daraKg: number
  girisKg: number
  cikmaKg: number
  fireKg: number
  cikmaFireKg: number
  netKg: number
  netAdet: number
  status: 'BEKLEMEDE' | 'NETLENDI' | 'IADE'
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
  urunler: {
    id: string
    ad: string
    kategori: string
    birim: string
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
  const [userRole, setUserRole] = useState<string>('')
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
    adetSayisi: '',
    brutKg: '',
    daraKg: '',
    girisKg: '',
    cikmaFireKg: '',
    cikmaAdet: '',
    fireAdet: '',
    netKg: '',
    netAdet: '',
    status: 'BEKLEMEDE' as 'BEKLEMEDE' | 'NETLENDI' | 'IADE',
    notlar: ''
  })

  // Ürün birimini kontrol et
  const isAdetBased = record?.urunler?.birim?.toLowerCase() === 'adet'

  // Kullanıcı rolünü al
  useEffect(() => {
    if (session?.user?.email) {
      // Kullanıcı rolünü API'den al
      fetch('/api/users/me')
        .then(res => res.json())
        .then(data => {
          if (data.user?.role) {
            setUserRole(data.user.role)
          }
        })
        .catch(err => console.error('Kullanıcı rolü alınamadı:', err))
    }
  }, [session])

  // Rol bazlı erişim kontrolü
  const canEdit = userRole === 'MAL_KABULCU' || userRole === 'SATIN_ALMACI' || userRole === 'MUHASEBECI' || userRole === 'ADMIN'
  const canChangeStatus = userRole === 'MAL_KABULCU' || userRole === 'ADMIN'
  const canEditBasicInfo = userRole === 'MAL_KABULCU' || userRole === 'ADMIN'
  const canEditIadeRecords = userRole === 'MUHASEBECI' || userRole === 'ADMIN'
  
  // İade kayıtları için özel kontrol
  const isIadeRecord = record?.status === 'IADE'
  const canEditThisRecord = isIadeRecord ? canEditIadeRecords : canEdit

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login')
    } else if (status === 'authenticated' && userRole && !canEditThisRecord) {
      if (isIadeRecord) {
        toast({
          title: "Erişim Reddedildi",
          description: "İade edilen kayıtlar sadece muhasebeci tarafından güncellenebilir",
          variant: "destructive",
        })
      } else {
        toast({
          title: "Erişim Reddedildi",
          description: "Bu sayfaya erişim yetkiniz bulunmamaktadır",
          variant: "destructive",
        })
      }
      router.push('/dashboard')
    }
  }, [status, router, canEditThisRecord, isIadeRecord, userRole, toast])

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

  // Giriş KG hesaplama (Brüt KG - Dara KG) - sadece KG ürünler için
  useEffect(() => {
    if (!isAdetBased) {
      const brutKgNum = parseFloat(formData.brutKg) || 0;
      const daraKgNum = parseFloat(formData.daraKg) || 0;
      const girisKgNum = brutKgNum - daraKgNum;
      
      setFormData(prev => ({
        ...prev,
        girisKg: girisKgNum.toString()
      }));
    }
  }, [formData.brutKg, formData.daraKg, isAdetBased]);

  // Net KG hesaplama (çıkma ve fire KG değiştiğinde) - sadece KG ürünler için
  useEffect(() => {
    if (!isAdetBased) {
      const girisKgNum = parseFloat(formData.girisKg) || 0;
      const cikmaKgNum = parseFloat(formData.cikmaAdet) || 0;
      const fireKgNum = parseFloat(formData.fireAdet) || 0;
      const netKgNum = girisKgNum - cikmaKgNum - fireKgNum;
      
      setFormData(prev => ({
        ...prev,
        netKg: netKgNum.toString()
      }));
    }
  }, [formData.girisKg, formData.cikmaAdet, formData.fireAdet, isAdetBased]);

  // Net Adet hesaplama (Adet Sayısı - Çıkma Adet - Fire Adet) - sadece adet ürünler için
  useEffect(() => {
    if (isAdetBased) {
      const adetSayisiNum = parseFloat(formData.adetSayisi) || 0;
      const cikmaAdetNum = parseFloat(formData.cikmaAdet) || 0;
      const fireAdetNum = parseFloat(formData.fireAdet) || 0;
      const netAdetNum = adetSayisiNum - cikmaAdetNum - fireAdetNum;
      
      setFormData(prev => ({
        ...prev,
        netAdet: netAdetNum.toString()
      }));
    }
  }, [formData.adetSayisi, formData.cikmaAdet, formData.fireAdet, isAdetBased]);

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
      console.log('Adet değerleri:', {
        cikmaKg: data.cikmaKg,
        fireKg: data.fireKg,
        netAdet: data.netAdet,
        adetSayisi: data.adetSayisi
      })
      
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
        adetSayisi: data.adetSayisi?.toString() || '',
        brutKg: data.brutKg?.toString() || '',
        daraKg: data.daraKg?.toString() || '',
        girisKg: data.girisKg?.toString() || '',
        cikmaFireKg: (data.cikmaKg + data.fireKg)?.toString() || '',
        cikmaAdet: data.cikmaKg?.toString() || '',
        fireAdet: data.fireKg?.toString() || '',
        netKg: data.netKg?.toString() || '',
        netAdet: data.netAdet?.toString() || '',
        status: data.status || 'NETLENDI',
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
      // Debug: Gönderilecek verileri logla
      console.log('handleSubmit - Gönderilecek formData:', {
        formData,
        cikmaAdet: formData.cikmaAdet,
        fireAdet: formData.fireAdet,
        adetSayisi: formData.adetSayisi,
        isAdetBased
      })

      // Form verilerini API'ye uygun formatta hazırla
      const submitData = {
        ...formData,
        // KG birimi için çıkma ve fire değerlerini cikmaAdet ve fireAdet'ten al
        cikmaKg: isAdetBased ? formData.cikmaAdet : formData.cikmaAdet,
        fireKg: isAdetBased ? formData.fireAdet : formData.fireAdet,
      }

      const response = await fetch(`/api/mal-kabul/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submitData),
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
        // Mal Kabulcu her durumda mal kabul sayfasına yönlendirilir
        router.push('/dashboard/mal-kabul')
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

  // Fiş yazdırma fonksiyonu (test sayfasındaki ile aynı)
  const printReceipt = async (fişTipi: 'ILK_KAYIT' | 'SON_DURUM') => {
    try {
      if (!record) return

      // Fiş verilerini hazırla
      const receiptData = {
        fisNo: record.fisNo,
        tarih: record.tarih,
        saticiTipi: record.saticiTipi,
        saticiAdi: getSaticiAdi(),
        urunAdi: record.urunler?.ad || '',
        brutKg: parseFloat(formData.brutKg) || 0,
        daraKg: parseFloat(formData.daraKg) || 0,
        girisKg: parseFloat(formData.girisKg) || 0,
        cikmaFireKg: isAdetBased ? (parseFloat(formData.cikmaAdet) || 0) : (parseFloat(formData.cikmaFireKg) || 0),
        netKg: isAdetBased ? (parseFloat(formData.netAdet) || 0) : (parseFloat(formData.netKg) || 0),
        cikmaKg: parseFloat(formData.cikmaAdet) || 0,
        fireKg: parseFloat(formData.fireAdet) || 0,
        cikmaAdet: parseInt(formData.cikmaAdet) || 0,
        fireAdet: parseInt(formData.fireAdet) || 0,
        adetSayisi: parseInt(formData.adetSayisi) || 0,
        netAdet: parseInt(formData.netAdet) || 0,
        birim: record.urunler?.birim || 'KG',
        ambalajAdi: 'Kasa',
        kasaSayisi: parseInt(formData.kasaSayisi) || 0,
        paletAdi: null,
        paletSayisi: 0,
        notlar: formData.notlar || '',
        malKabulcuAdi: record.malKabulcu?.name || `${record.malKabulcu?.firstName || ''} ${record.malKabulcu?.lastName || ''}`.trim() || 'Mal Kabulcu'
      }
      
      // QR kod ve barkod resimlerini oluştur
      const qrValue = `${receiptData.fisNo}|${receiptData.tarih}|${receiptData.saticiTipi}|${receiptData.urunAdi}`
      
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
      JsBarcode.default(canvas, receiptData.fisNo, {
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
        const fişBaşlığı = fişTipi === 'ILK_KAYIT' ? 'BİLGİ FİŞİ' : 'SON DURUM FİŞİ'
        
        printWindow.document.write(`
          <!DOCTYPE html>
          <html>
            <head>
              <title>${fişBaşlığı} - ${receiptData.fisNo}</title>
              <style>
                body { 
                  font-family: 'Courier New', monospace; 
                  font-size: 12px; 
                  width: 80mm; 
                  max-width: 80mm; 
                  margin: 0; 
                  padding: 2px;
                  box-sizing: border-box;
                  overflow-x: hidden;
                  line-height: 1.3;
                  color: #000;
                  background: #fff;
                }
                .header { text-align: center; font-weight: bold; font-size: 16px; margin-bottom: 6px; border-bottom: 2px solid #000; padding-bottom: 4px; color: #000; }
                .section { margin-bottom: 6px; border-bottom: 1px solid #000; padding-bottom: 4px; }
                .section-title { font-weight: bold; font-size: 13px; margin-bottom: 4px; text-align: center; background: #000; color: #fff; padding: 3px; border-radius: 2px; }
                .row { display: flex; justify-content: space-between; margin-bottom: 3px; font-size: 11px; font-weight: bold; color: #000; }
                .label { font-weight: bold; color: #000; }
                .value { text-align: right; font-weight: bold; color: #000; }
                .copy-info {
                  text-align: center;
                  font-size: 10px;
                  color: #000;
                  margin-top: 6px;
                  padding: 3px;
                  background: #fff;
                  border: 1px solid #000;
                  border-radius: 2px;
                  font-weight: bold;
                }
                .page-break { page-break-after: always; }
                .copy-label { 
                  text-align: center; 
                  font-size: 13px; 
                  font-weight: bold; 
                  margin: 6px 0; 
                  padding: 4px; 
                  background: #000; 
                  color: #fff; 
                  border-radius: 3px; 
                  border: 2px solid #000;
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
                  font-size: 13px;
                  font-weight: bold;
                  margin-top: 15px;
                  padding: 8px;
                  background: #000;
                  color: #fff;
                  border-radius: 4px;
                  border: 2px solid #000;
                }
                
                @media print {
                  body { 
                    width: 80mm !important; 
                    max-width: 80mm !important; 
                    margin: 0 !important; 
                    padding: 2px !important; 
                    font-size: 12px !important;
                    color: #000 !important;
                    background: #fff !important;
                  }
                  @page { 
                    size: 80mm 210mm; 
                    margin: 0; 
                  }
                  .qr-code img, .barcode img { 
                    display: block !important; 
                    max-width: 55mm !important;
                  }
                  * {
                    -webkit-print-color-adjust: exact !important;
                    color-adjust: exact !important;
                  }
                }
              </style>
            </head>
            <body>
              <div class="logo">
                <img src="${window.location.origin}/hnr-lgoo.png" alt="Webrain Logo" />
              </div>
              <div class="header">${fişBaşlığı}</div>
              
              <div class="section">
                <div class="section-title">FİŞ BİLGİLERİ</div>
                <div class="row">
                  <span class="label">Fiş No:</span>
                  <span class="value">${receiptData.fisNo}</span>
                </div>
                <div class="row">
                  <span class="label">Tarih:</span>
                  <span class="value">${new Date(receiptData.tarih).toLocaleDateString('tr-TR')}</span>
                </div>
                <div class="row">
                  <span class="label">Mal Kabulcu:</span>
                  <span class="value">${receiptData.malKabulcuAdi}</span>
                </div>
              </div>
              
              <div class="section">
                <div class="section-title">SATICI BİLGİLERİ</div>
                <div class="row">
                  <span class="label">Satıcı Tipi:</span>
                  <span class="value">${receiptData.saticiTipi}</span>
                </div>
                <div class="row">
                  <span class="label">Satıcı Adı:</span>
                  <span class="value">${receiptData.saticiAdi}</span>
                </div>
              </div>
              
              <div class="section">
                <div class="section-title">ÜRÜN BİLGİLERİ</div>
                <div class="row">
                  <span class="label">Ürün:</span>
                  <span class="value">${receiptData.urunAdi}</span>
                </div>
                <div class="row">
                  <span class="label">Kasa Sayısı:</span>
                  <span class="value">${receiptData.kasaSayisi}</span>
                </div>
                ${receiptData.paletAdi ? `
                <div class="row">
                  <span class="label">Palet:</span>
                  <span class="value">${receiptData.paletAdi} (${receiptData.paletSayisi})</span>
                </div>
                ` : ''}
              </div>
              
              <div class="section">
                <div class="section-title">${receiptData.birim?.toLowerCase() === 'adet' ? 'ADET BİLGİLERİ' : 'KİLOGRAM BİLGİLERİ'}</div>
                ${receiptData.birim?.toLowerCase() === 'adet' ? `
                <div class="row">
                  <span class="label">Kasa Sayısı:</span>
                  <span class="value">${receiptData.kasaSayisi} kasa</span>
                </div>
                <div class="row">
                  <span class="label">Adet Sayısı:</span>
                  <span class="value">${receiptData.adetSayisi} adet</span>
                </div>
                <div class="row">
                  <span class="label">Giriş Adet:</span>
                  <span class="value">${receiptData.adetSayisi} adet</span>
                </div>
                ${fişTipi === 'SON_DURUM' ? `
                <div class="row">
                  <span class="label">Çıkma Adet:</span>
                  <span class="value">${receiptData.cikmaAdet} adet</span>
                </div>
                <div class="row">
                  <span class="label">Fire Adet:</span>
                  <span class="value">${receiptData.fireAdet} adet</span>
                </div>
                <div class="row">
                  <span class="label">Net Adet:</span>
                  <span class="value">${receiptData.netAdet} adet</span>
                </div>
                ` : ''}
                ` : `
                <div class="row">
                  <span class="label">Brüt KG:</span>
                  <span class="value">${receiptData.brutKg.toFixed(2)}</span>
                </div>
                <div class="row">
                  <span class="label">Dara KG:</span>
                  <span class="value">${receiptData.daraKg.toFixed(2)}</span>
                </div>
                <div class="row">
                  <span class="label">Giriş KG:</span>
                  <span class="value">${receiptData.girisKg.toFixed(2)}</span>
                </div>
                ${fişTipi === 'SON_DURUM' ? `
                <div class="row">
                  <span class="label">Çıkma KG:</span>
                  <span class="value">${receiptData.cikmaKg.toFixed(2)}</span>
                </div>
                <div class="row">
                  <span class="label">Fire KG:</span>
                  <span class="value">${receiptData.fireKg.toFixed(2)}</span>
                </div>
                <div class="row">
                  <span class="label">Net KG:</span>
                  <span class="value">${receiptData.netKg.toFixed(2)}</span>
                </div>
                ` : ''}
                `}
              </div>
              
              ${receiptData.notlar ? `
              <div class="section">
                <div class="section-title">NOTLAR</div>
                <div class="row">
                  <span class="value">${receiptData.notlar}</span>
                </div>
              </div>
              ` : ''}
              
              <div class="copy-info">
                Bu fiş ${fişTipi === 'ILK_KAYIT' ? 'ilk kayıt' : 'son durum'} için yazdırılmıştır
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
                <img src="${window.location.origin}/hnr-lgoo.png" alt="Webrain Logo" />
              </div>
              <div class="header">${fişBaşlığı}</div>
              
              <div class="section">
                <div class="section-title">FİŞ BİLGİLERİ</div>
                <div class="row">
                  <span class="label">Fiş No:</span>
                  <span class="value">${receiptData.fisNo}</span>
                </div>
                <div class="row">
                  <span class="label">Tarih:</span>
                  <span class="value">${new Date(receiptData.tarih).toLocaleDateString('tr-TR')}</span>
                </div>
                <div class="row">
                  <span class="label">Mal Kabulcu:</span>
                  <span class="value">${receiptData.malKabulcuAdi}</span>
                </div>
              </div>
              
              <div class="section">
                <div class="section-title">SATICI BİLGİLERİ</div>
                <div class="row">
                  <span class="label">Satıcı Tipi:</span>
                  <span class="value">${receiptData.saticiTipi}</span>
                </div>
                <div class="row">
                  <span class="label">Satıcı Adı:</span>
                  <span class="value">${receiptData.saticiAdi}</span>
                </div>
              </div>
              
              <div class="section">
                <div class="section-title">ÜRÜN BİLGİLERİ</div>
                <div class="row">
                  <span class="label">Ürün:</span>
                  <span class="value">${receiptData.urunAdi}</span>
                </div>
                <div class="row">
                  <span class="label">Kasa Sayısı:</span>
                  <span class="value">${receiptData.kasaSayisi}</span>
                </div>
                ${receiptData.paletAdi ? `
                <div class="row">
                  <span class="label">Palet:</span>
                  <span class="value">${receiptData.paletAdi} (${receiptData.paletSayisi})</span>
                </div>
                ` : ''}
              </div>
              
              <div class="section">
                <div class="section-title">${receiptData.birim?.toLowerCase() === 'adet' ? 'ADET BİLGİLERİ' : 'KİLOGRAM BİLGİLERİ'}</div>
                ${receiptData.birim?.toLowerCase() === 'adet' ? `
                <div class="row">
                  <span class="label">Kasa Sayısı:</span>
                  <span class="value">${receiptData.kasaSayisi} kasa</span>
                </div>
                <div class="row">
                  <span class="label">Adet Sayısı:</span>
                  <span class="value">${receiptData.adetSayisi} adet</span>
                </div>
                <div class="row">
                  <span class="label">Giriş Adet:</span>
                  <span class="value">${receiptData.adetSayisi} adet</span>
                </div>
                ${fişTipi === 'SON_DURUM' ? `
                <div class="row">
                  <span class="label">Çıkma Adet:</span>
                  <span class="value">${receiptData.cikmaAdet} adet</span>
                </div>
                <div class="row">
                  <span class="label">Fire Adet:</span>
                  <span class="value">${receiptData.fireAdet} adet</span>
                </div>
                <div class="row">
                  <span class="label">Net Adet:</span>
                  <span class="value">${receiptData.netAdet} adet</span>
                </div>
                ` : ''}
                ` : `
                <div class="row">
                  <span class="label">Brüt KG:</span>
                  <span class="value">${receiptData.brutKg.toFixed(2)}</span>
                </div>
                <div class="row">
                  <span class="label">Dara KG:</span>
                  <span class="value">${receiptData.daraKg.toFixed(2)}</span>
                </div>
                <div class="row">
                  <span class="label">Giriş KG:</span>
                  <span class="value">${receiptData.girisKg.toFixed(2)}</span>
                </div>
                ${fişTipi === 'SON_DURUM' ? `
                <div class="row">
                  <span class="label">Çıkma KG:</span>
                  <span class="value">${receiptData.cikmaKg.toFixed(2)}</span>
                </div>
                <div class="row">
                  <span class="label">Fire KG:</span>
                  <span class="value">${receiptData.fireKg.toFixed(2)}</span>
                </div>
                <div class="row">
                  <span class="label">Net KG:</span>
                  <span class="value">${receiptData.netKg.toFixed(2)}</span>
                </div>
                ` : ''}
                `}
              </div>
              
              ${receiptData.notlar ? `
              <div class="section">
                <div class="section-title">NOTLAR</div>
                <div class="row">
                  <span class="value">${receiptData.notlar}</span>
                </div>
              </div>
              ` : ''}
              
              <div class="copy-info">
                Bu fiş ${fişTipi === 'ILK_KAYIT' ? 'ilk kayıt' : 'son durum'} için yazdırılmıştır
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
            description: `${fişBaşlığı} başarıyla yazdırıldı`,
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
      const qrValue = `${record.fisNo}|${record.tarih}|${record.saticiTipi}|${record.urunler.ad}`
      
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

        {/* İade kayıtları için uyarı */}
        {isIadeRecord && (
          <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-yellow-600" />
              <div>
                <h3 className="font-semibold text-yellow-800">İade Edilen Kayıt</h3>
                <p className="text-yellow-700 text-sm">
                  Bu kayıt iade edilmiştir. Sadece muhasebeci rolü bu kaydı güncelleyebilir.
                </p>
              </div>
            </div>
          </div>
        )}

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
                    disabled={!canEditThisRecord}
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
                      disabled={!canEditThisRecord}
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
                        disabled={!canEditThisRecord}
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
                        disabled={!canEditThisRecord}
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
                      disabled={!canEditThisRecord}
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
                    disabled={!canEditThisRecord}
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

            {/* Ağırlık/Adet Bilgileri */}
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
                    : "Ağırlık hesaplamaları"
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
                          onChange={(e) => handleInputChange('kasaSayisi', e.target.value)}
                          placeholder="0"
                          required
                          readOnly={!canEditBasicInfo}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="adetSayisi">Adet Sayısı *</Label>
                        <Input
                          id="adetSayisi"
                          type="number"
                          value={formData.adetSayisi || record?.adetSayisi || ''}
                          onChange={(e) => handleInputChange('adetSayisi', e.target.value)}
                          placeholder="0"
                          required
                          readOnly={!canEditBasicInfo}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="cikmaAdet">Çıkma Adet</Label>
                        <Input
                          id="cikmaAdet"
                          type="number"
                          value={formData.cikmaAdet || record?.cikmaKg || ''}
                          onChange={(e) => handleInputChange('cikmaAdet', e.target.value)}
                          placeholder="0"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="fireAdet">Fire Adet</Label>
                        <Input
                          id="fireAdet"
                          type="number"
                          value={formData.fireAdet || record?.fireKg || ''}
                          onChange={(e) => handleInputChange('fireAdet', e.target.value)}
                          placeholder="0"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="netAdet">Net Adet (Ürün Son Durumu)</Label>
                      <Input
                        id="netAdet"
                        type="number"
                        value={formData.netAdet || record?.netAdet || ''}
                        onChange={(e) => handleInputChange('netAdet', e.target.value)}
                        readOnly
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

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="cikmaKg">Çıkma KG</Label>
                        <Input
                          id="cikmaKg"
                          type="number"
                          step="0.01"
                          min="0"
                          value={formData.cikmaAdet || record?.cikmaKg || ''}
                          onChange={(e) => handleInputChange('cikmaAdet', e.target.value)}
                          placeholder="0.00"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="fireKg">Fire KG</Label>
                        <Input
                          id="fireKg"
                          type="number"
                          step="0.01"
                          min="0"
                          value={formData.fireAdet || record?.fireKg || ''}
                          onChange={(e) => handleInputChange('fireAdet', e.target.value)}
                          placeholder="0.00"
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
                  </>
                )}
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
                    value={formData.status || "NETLENDI"} 
                    onValueChange={(value) => handleInputChange('status', value)}
                    disabled={!canChangeStatus}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="BEKLEMEDE">
                        <div className="flex items-center gap-2">
                          <AlertTriangle className="h-4 w-4 text-yellow-500" />
                          Beklemede (Depoda Bekliyor)
                        </div>
                      </SelectItem>
                      <SelectItem value="NETLENDI">
                        <div className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          Netlendi (Son Fiş Yazdırıldı)
                        </div>
                      </SelectItem>
                      <SelectItem value="IADE">
                        <div className="flex items-center gap-2">
                          <X className="h-4 w-4 text-red-500" />
                          İade (Ürün İade Edildi)
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  {formData.status === 'BEKLEMEDE' && (
                    <p className="text-xs text-yellow-600 bg-yellow-50 p-2 rounded">
                      ⚠️ Ürün depoda bekliyor. Çıkma/fire belirtilirse Netlendi durumuna geçer.
                    </p>
                  )}
                  {formData.status === 'NETLENDI' && (
                    <p className="text-xs text-green-600 bg-green-50 p-2 rounded">
                      ✓ Bu ürün netlendi. Son fiş yazdırılacak ve işlem tamamlanacak.
                    </p>
                  )}
                  {formData.status === 'IADE' && (
                    <p className="text-xs text-red-600 bg-red-50 p-2 rounded">
                      ❌ Bu ürün iade edildi. Sistemde stok olarak sayılmayacak ve tekrar güncellenemeyecek.
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
          <div className="flex justify-between items-center mt-6">
            <div className="flex gap-2">
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => printReceipt('ILK_KAYIT')}
                disabled={!record?.fisNo}
              >
                <Printer className="mr-2 h-4 w-4" />
                İlk Kayıt Fişi
              </Button>
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => printReceipt('SON_DURUM')}
                disabled={formData.status !== 'NETLENDI' || (!isAdetBased && parseFloat(formData.netKg) <= 0) || (isAdetBased && parseFloat(formData.netAdet) <= 0)}
              >
                <Printer className="mr-2 h-4 w-4" />
                Son Durum Fişi
              </Button>
            </div>
            <div className="flex gap-4">
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
          </div>
        </form>

        {/* Son Fiş Yazdırma Modal */}
        {showFinalReceipt && record && (
        <div className="fixed inset-0 bg-black/50 dark:bg-black/70 flex items-center justify-center z-50">
          <div className="bg-background border border-border rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-foreground">Son Fiş Yazdır</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowFinalReceipt(false)}
                className="h-8 w-8 p-0 hover:bg-muted"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="mb-4">
              <p className="text-sm text-muted-foreground mb-2">
                Ürün netlendi! Bu fiş ürünün son evrakıdır:
              </p>
              <ul className="text-sm text-muted-foreground list-disc list-inside space-y-1">
                <li>Net KG: {formData.netKg} kg</li>
                <li>Çıkma KG: {formData.cikmaAdet || record.cikmaKg} kg</li>
                <li>Fire KG: {formData.fireAdet || record.fireKg} kg</li>
                <li>Durum: Netlendi (Ürün Son Durumu)</li>
              </ul>
            </div>

            {/* Son Fiş Önizleme */}
            <div className="mb-4 bg-muted/50 p-4 rounded-lg border border-border">
              <h4 className="font-bold text-center mb-3 text-foreground">Son Fiş Önizleme</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="font-medium text-foreground"><strong>Fiş No:</strong></span>
                  <span className="text-foreground">{record.fisNo}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium text-foreground"><strong>Tarih:</strong></span>
                  <span className="text-foreground">{new Date(record.tarih).toLocaleDateString('tr-TR')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium text-foreground"><strong>Satıcı:</strong></span>
                  <span className="text-foreground">
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
                  <span className="font-medium text-foreground"><strong>Ürün:</strong></span>
                  <span className="text-foreground">{record.urunler.ad}</span>
                </div>
                
                {isAdetBased ? (
                  // ADET birimi için adet bilgileri
                  <>
                    <div className="flex justify-between">
                      <span className="font-medium text-foreground"><strong>Adet Sayısı:</strong></span>
                      <span className="text-foreground">{formData.adetSayisi} adet</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium text-foreground"><strong>Çıkma Adet:</strong></span>
                      <span className="text-foreground">{formData.cikmaAdet || record.cikmaKg} adet</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium text-foreground"><strong>Fire Adet:</strong></span>
                      <span className="text-foreground">{formData.fireAdet || record.fireKg} adet</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium text-foreground"><strong>Net Adet:</strong></span>
                      <span className="text-foreground font-bold">{formData.netAdet} adet</span>
                    </div>
                  </>
                ) : (
                  // KG birimi için ağırlık bilgileri
                  <>
                    <div className="flex justify-between">
                      <span className="font-medium text-foreground"><strong>Brüt KG:</strong></span>
                      <span className="text-foreground">{formData.brutKg} kg</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium text-foreground"><strong>Dara KG:</strong></span>
                      <span className="text-foreground">{formData.daraKg} kg</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium text-foreground"><strong>Giriş KG:</strong></span>
                      <span className="text-foreground">{formData.girisKg} kg</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium text-foreground"><strong>Çıkma KG:</strong></span>
                      <span className="text-foreground">{formData.cikmaAdet || record.cikmaKg} kg</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium text-foreground"><strong>Fire KG:</strong></span>
                      <span className="text-foreground">{formData.fireAdet || record.fireKg} kg</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium text-foreground"><strong>Net KG:</strong></span>
                      <span className="text-foreground font-bold">{formData.netKg} kg</span>
                    </div>
                  </>
                )}
              </div>
              
              {/* QR Kod ve Barkod Önizleme */}
              <div className="mt-4 pt-4 border-t border-border">
                <h5 className="font-bold text-center mb-3 text-foreground">QR Kod ve Barkod</h5>
                <div className="flex flex-col items-center gap-3">
                  <div className="text-center">
                    <div className="text-xs text-muted-foreground mb-2">QR Kod</div>
                    {qrDataUrl ? (
                      <img src={qrDataUrl} alt="QR Kod" className="w-16 h-16 mx-auto border border-border rounded" />
                    ) : (
                      <div className="w-16 h-16 mx-auto border border-border rounded bg-muted flex items-center justify-center text-xs text-muted-foreground">
                        QR Kod
                      </div>
                    )}
                  </div>
                  <div className="text-center">
                    <div className="text-xs text-muted-foreground mb-2">Barkod</div>
                    {barcodeDataUrl ? (
                      <img src={barcodeDataUrl} alt="Barkod" className="w-24 h-12 mx-auto border border-border rounded" />
                    ) : (
                      <div className="w-24 h-12 mx-auto border border-border rounded bg-muted flex items-center justify-center text-xs text-muted-foreground">
                        Barkod
                      </div>
                    )}
                  </div>
                </div>
                <div className="text-center text-xs text-muted-foreground mt-3">
                  Bu fiş ürünün son evrakıdır
                </div>
              </div>
            </div>

            {/* Yazdırma Butonu */}
            <div className="flex justify-center gap-4">
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
                  urunAdi: record.urunler.ad,
                  birim: record.urunler.birim,
                  brutKg: parseFloat(formData.brutKg) || 0,
                  daraKg: parseFloat(formData.daraKg) || 0,
                  girisKg: parseFloat(record.girisKg.toString()) || 0,
                  cikmaKg: parseFloat(record.cikmaKg.toString()) || 0,
                  fireKg: parseFloat(record.fireKg.toString()) || 0,
                  netKg: parseFloat(record.netKg.toString()) || 0,
                  cikmaAdet: parseInt(record.cikmaAdet.toString()) || 0,
                  fireAdet: parseInt(record.fireAdet.toString()) || 0,
                  adetSayisi: parseInt(formData.adetSayisi) || 0,
                  netAdet: parseInt(record.netAdet.toString()) || 0,
                  ambalajAdi: record.ambalaj?.ad,
                  kasaSayisi: record.kasaSayisi,
                  paletAdi: record.palet?.ad,
                  paletSayisi: record.paletSayisi,
                  notlar: formData.notlar,
                  malKabulcuAdi: record.malKabulcu?.name || `${record.malKabulcu?.firstName || ''} ${record.malKabulcu?.lastName || ''}`.trim() || 'Mal Kabulcu'
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
                  const fişBaşlığı = 'SON FİŞ'
                  
                  printWindow.document.write(`
                  <!DOCTYPE html>
                  <html>
                    <head>
                      <title>${fişBaşlığı} - ${finalReceiptData.fisNo}</title>
                      <style>
                        body { 
                          font-family: 'Courier New', monospace; 
                          font-size: 12px; 
                          width: 80mm; 
                          max-width: 80mm; 
                          margin: 0; 
                          padding: 2px;
                          box-sizing: border-box;
                          overflow-x: hidden;
                          line-height: 1.3;
                          min-height: 210mm;
                          color: #000;
                          background: #fff;
                        }
                        .header { 
                          text-align: center;
                          font-weight: bold; 
                          font-size: 16px; 
                          margin-bottom: 6px; 
                          border-bottom: 2px solid #000;
                          padding-bottom: 4px;
                          color: #000;
                        }
                        .section { 
                          margin-bottom: 6px; 
                          border-bottom: 1px solid #000; 
                          padding-bottom: 4px; 
                        }
                        .section-title { 
                          font-weight: bold; 
                          font-size: 13px; 
                          margin-bottom: 4px; 
                          text-align: center; 
                          background: #000; 
                          color: #fff;
                          padding: 3px; 
                          border-radius: 2px; 
                        }
                        .row { 
                          display: flex; 
                          justify-content: space-between; 
                          margin-bottom: 3px; 
                          font-size: 11px;
                          font-weight: bold;
                          align-items: center;
                          color: #000;
                        }
                        .label { 
                          font-weight: bold; 
                          min-width: 32mm;
                          max-width: 32mm;
                          color: #000;
                        }
                        .value { 
                          text-align: right; 
                          font-weight: bold; 
                          max-width: 45mm;
                          word-wrap: break-word;
                          text-overflow: ellipsis;
                          overflow: hidden;
                          color: #000;
                        }
                        .copy-info {
                          text-align: center;
                          font-size: 10px;
                          color: #000;
                          margin-top: 6px;
                          padding: 3px;
                          background: #fff;
                          border: 1px solid #000;
                          border-radius: 2px;
                          font-weight: bold;
                        }
                        .page-break { page-break-after: always; }
                        .copy-label { 
                          text-align: center; 
                          font-size: 13px; 
                          font-weight: bold; 
                          margin: 6px 0; 
                          padding: 4px; 
                          background: #000; 
                          color: #fff; 
                          border-radius: 3px; 
                          border: 2px solid #000;
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
                          font-size: 13px;
                          font-weight: bold;
                          margin-top: 15px;
                          padding: 8px;
                          background: #000;
                          color: #fff;
                          border-radius: 4px;
                          border: 2px solid #000;
                        }
                          max-width: 60mm;
                          height: auto;
                        }
                        .thank-you {
                          text-align: center;
                          font-size: 13px;
                          font-weight: bold;
                          margin-top: 15px;
                          padding: 8px;
                          background: #000;
                          color: #fff;
                          border-radius: 4px;
                          border: 2px solid #000;
                        }
                        .final-status { 
                          background: #4ade80; 
                          color: white; 
                          padding: 5px; 
                          text-align: center; 
                          font-weight: bold;
                          margin: 10px 0;
                          border-radius: 3px;
                        }
                        
                        @media print {
                          body { 
                            width: 80mm !important; 
                            max-width: 80mm !important; 
                            margin: 0 !important; 
                            padding: 2px !important; 
                            font-size: 12px !important;
                            min-height: 210mm !important;
                            color: #000 !important;
                            background: #fff !important;
                          }
                          @page { 
                            size: 80mm 210mm; 
                            margin: 0; 
                          }
                          .qr-code img, .barcode img { 
                            display: block !important; 
                            max-width: 55mm !important;
                          }
                          * {
                            -webkit-print-color-adjust: exact !important;
                            color-adjust: exact !important;
                          }
                        }
                      </style>
                    </head>
                    <body>
                        <div class="logo">
                          <img src="${window.location.origin}/hnr-lgoo.png" alt="Webrain Logo" />
                        </div>
                        <div class="header">${fişBaşlığı}</div>
                      
                      <div class="section">
                          <div class="section-title">FİŞ BİLGİLERİ</div>
                        <div class="row">
                            <span class="label">Fiş No:</span>
                            <span class="value">${finalReceiptData.fisNo}</span>
                        </div>
                        <div class="row">
                            <span class="label">Tarih:</span>
                            <span class="value">${new Date(finalReceiptData.tarih).toLocaleDateString('tr-TR')}</span>
                        </div>
                        <div class="row">
                            <span class="label">Mal Kabulcu:</span>
                            <span class="value">${finalReceiptData.malKabulcuAdi}</span>
                        </div>
                      </div>
                      
                      <div class="section">
                        <div class="section-title">SATICI BİLGİLERİ</div>
                        <div class="row">
                          <span class="label">Satıcı Tipi:</span>
                          <span class="value">${finalReceiptData.saticiTipi}</span>
                        </div>
                        <div class="row">
                          <span class="label">Satıcı Adı:</span>
                          <span class="value">${finalReceiptData.saticiAdi}</span>
                        </div>
                      </div>
                      
                      <div class="section">
                        <div class="section-title">ÜRÜN BİLGİLERİ</div>
                        <div class="row">
                          <span class="label">Ürün:</span>
                          <span class="value">${finalReceiptData.urunAdi}</span>
                        </div>
                        <div class="row">
                          <span class="label">Kasa Sayısı:</span>
                          <span class="value">${finalReceiptData.kasaSayisi}</span>
                        </div>
                        ${finalReceiptData.paletAdi ? `
                        <div class="row">
                          <span class="label">Palet:</span>
                          <span class="value">${finalReceiptData.paletAdi} (${finalReceiptData.paletSayisi})</span>
                        </div>
                        ` : ''}
                      </div>
                      
                      <div class="section">
                        <div class="section-title">${finalReceiptData.birim?.toLowerCase() === 'adet' ? 'ADET BİLGİLERİ' : 'KİLOGRAM BİLGİLERİ'}</div>
                        ${finalReceiptData.birim?.toLowerCase() === 'adet' ? `
                          <div class="row"><span class="label">Kasa Sayısı:</span><span class="value">${finalReceiptData.kasaSayisi} kasa</span></div>
                          <div class="row"><span class="label">Adet Sayısı:</span><span class="value">${finalReceiptData.adetSayisi} adet</span></div>
                          <div class="row"><span class="label">Giriş Adet:</span><span class="value">${finalReceiptData.adetSayisi} adet</span></div>
                          ${finalReceiptData.cikmaAdet > 0 ? `<div class="row"><span class="label">Çıkma Adet:</span><span class="value">${finalReceiptData.cikmaAdet} adet</span></div>` : ''}
                          ${finalReceiptData.fireAdet > 0 ? `<div class="row"><span class="label">Fire Adet:</span><span class="value">${finalReceiptData.fireAdet} adet</span></div>` : ''}
                          ${finalReceiptData.netAdet > 0 ? `<div class="row"><span class="label">Net Adet:</span><span class="value">${finalReceiptData.netAdet} adet</span></div>` : ''}
                        ` : `
                          <div class="row"><span class="label">Brüt KG:</span><span class="value">${finalReceiptData.brutKg.toFixed(2)}</span></div>
                          <div class="row"><span class="label">Dara KG:</span><span class="value">${finalReceiptData.daraKg.toFixed(2)}</span></div>
                          <div class="row"><span class="label">Giriş KG:</span><span class="value">${finalReceiptData.girisKg.toFixed(2)}</span></div>
                          ${finalReceiptData.cikmaKg > 0 ? `<div class="row"><span class="label">Çıkma KG:</span><span class="value">${finalReceiptData.cikmaKg.toFixed(2)}</span></div>` : ''}
                          ${finalReceiptData.fireKg > 0 ? `<div class="row"><span class="label">Fire KG:</span><span class="value">${finalReceiptData.fireKg.toFixed(2)}</span></div>` : ''}
                          ${finalReceiptData.netKg > 0 ? `<div class="row"><span class="label">Net KG:</span><span class="value">${finalReceiptData.netKg.toFixed(2)}</span></div>` : ''}
                        `}
                      </div>
                      
                      ${finalReceiptData.notlar ? `
                      <div class="section">
                        <div class="section-title">NOTLAR</div>
                        <div class="row"><span class="value">${finalReceiptData.notlar}</span></div>
                      </div>` : ''}
                      
                      <div class="copy-info">
                        Bu fiş son durum için yazdırılmıştır
                      </div>
                      
                      <div class="copy-label">ORİJİNAL - MAL KABULCU İÇİN</div>
                      
                      <div class="qr-code">
                        <img src="${qrDataUrl}" alt="QR Code" style="width: 80px; height: 80px; display: block; margin: 10px auto;" />
                      </div>
                      
                      <div class="barcode">
                        <img src="${barcodeDataUrl}" alt="Barcode" style="width: 100%; height: 50px; display: block; margin: 10px auto;" />
                      </div>
                      
                      <div class="page-break"></div>
                      
                      <div class="header">${fişBaşlığı}</div>
                      
                      <div class="section">
                        <div class="section-title">FİŞ BİLGİLERİ</div>
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
                        <div class="row">
                          <span class="label">Mal Kabulcu:</span>
                          <span class="value">${finalReceiptData.malKabulcuAdi}</span>
                        </div>
                      </div>
                      
                      <div class="section">
                        <div class="section-title">SATICI BİLGİLERİ</div>
                        <div class="row">
                          <span class="label">Satıcı Tipi:</span>
                          <span class="value">${finalReceiptData.saticiTipi}</span>
                        </div>
                        <div class="row">
                          <span class="label">Satıcı Adı:</span>
                          <span class="value">${finalReceiptData.saticiAdi}</span>
                        </div>
                      </div>
                      
                      <div class="section">
                        <div class="section-title">ÜRÜN BİLGİLERİ</div>
                        <div class="row">
                          <span class="label">Ürün:</span>
                          <span class="value">${finalReceiptData.urunAdi}</span>
                        </div>
                        <div class="row">
                          <span class="label">Kasa Sayısı:</span>
                          <span class="value">${finalReceiptData.kasaSayisi}</span>
                        </div>
                        ${finalReceiptData.paletAdi ? `
                        <div class="row">
                          <span class="label">Palet:</span>
                          <span class="value">${finalReceiptData.paletAdi} (${finalReceiptData.paletSayisi})</span>
                        </div>
                        ` : ''}
                      </div>
                      
                      <div class="section">
                        <div class="section-title">${finalReceiptData.birim?.toLowerCase() === 'adet' ? 'ADET BİLGİLERİ' : 'KİLOGRAM BİLGİLERİ'}</div>
                        ${finalReceiptData.birim?.toLowerCase() === 'adet' ? `
                          <div class="row"><span class="label">Kasa Sayısı:</span><span class="value">${finalReceiptData.kasaSayisi} kasa</span></div>
                          <div class="row"><span class="label">Adet Sayısı:</span><span class="value">${finalReceiptData.adetSayisi} adet</span></div>
                          <div class="row"><span class="label">Giriş Adet:</span><span class="value">${finalReceiptData.adetSayisi} adet</span></div>
                          ${finalReceiptData.cikmaAdet > 0 ? `<div class="row"><span class="label">Çıkma Adet:</span><span class="value">${finalReceiptData.cikmaAdet} adet</span></div>` : ''}
                          ${finalReceiptData.fireAdet > 0 ? `<div class="row"><span class="label">Fire Adet:</span><span class="value">${finalReceiptData.fireAdet} adet</span></div>` : ''}
                          ${finalReceiptData.netAdet > 0 ? `<div class="row"><span class="label">Net Adet:</span><span class="value">${finalReceiptData.netAdet} adet</span></div>` : ''}
                        ` : `
                          <div class="row"><span class="label">Brüt KG:</span><span class="value">${finalReceiptData.brutKg.toFixed(2)}</span></div>
                          <div class="row"><span class="label">Dara KG:</span><span class="value">${finalReceiptData.daraKg.toFixed(2)}</span></div>
                          <div class="row"><span class="label">Giriş KG:</span><span class="value">${finalReceiptData.girisKg.toFixed(2)}</span></div>
                          ${finalReceiptData.cikmaKg > 0 ? `<div class="row"><span class="label">Çıkma KG:</span><span class="value">${finalReceiptData.cikmaKg.toFixed(2)}</span></div>` : ''}
                          ${finalReceiptData.fireKg > 0 ? `<div class="row"><span class="label">Fire KG:</span><span class="value">${finalReceiptData.fireKg.toFixed(2)}</span></div>` : ''}
                          ${finalReceiptData.netKg > 0 ? `<div class="row"><span class="label">Net KG:</span><span class="value">${finalReceiptData.netKg.toFixed(2)}</span></div>` : ''}
                        `}
                      </div>
                      
                      ${finalReceiptData.notlar ? `
                      <div class="section">
                        <div class="section-title">NOTLAR</div>
                        <div class="row"><span class="value">${finalReceiptData.notlar}</span></div>
                      </div>` : ''}
                      
                      <div class="copy-info">
                        Bu fiş son durum için yazdırılmıştır
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
          }} className="px-6">
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

