'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { 
  ArrowLeft, 
  Search, 
  Printer, 
  FileText, 
  CheckCircle, 
  AlertTriangle,
  Eye,
  Download,
  Filter,
  Calendar
} from 'lucide-react'
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
  kasaSayisi: number
  adetSayisi: number
  brutKg: number
  daraKg: number
  girisKg: number
  cikmaKg: number
  fireKg: number
  cikmaFireKg?: number
  netKg?: number
  netAdet?: number
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
  }
  paletSayisi?: number
  users: {
    id: string
    firstName: string
    lastName: string
  }
  createdAt: string
  updatedAt: string
}

export default function MalKabulFisArsivi() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const { toast } = useToast()

  const [loading, setLoading] = useState(true)
  const [malKabulRecords, setMalKabulRecords] = useState<MalKabulRecord[]>([])
  const [filteredRecords, setFilteredRecords] = useState<MalKabulRecord[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [filterSaticiTipi, setFilterSaticiTipi] = useState('all')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')


  const userRole = (session?.user as any)?.role

  // Rol bazlı erişim kontrolü
  const canAccess = userRole === 'MAL_KABULCU' || userRole === 'SATIN_ALMACI' || userRole === 'MUHASEBE' || userRole === 'ADMIN'

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login')
    } else if (status === 'authenticated' && !canAccess) {
      toast({
        title: "Erişim Reddedildi",
        description: "Bu sayfaya erişim yetkiniz bulunmamaktadır",
        variant: "destructive",
      })
      router.push('/dashboard')
    }
  }, [status, router, canAccess, toast])

  useEffect(() => {
    if (status === 'authenticated' && canAccess) {
      fetchMalKabulRecords()
    }
  }, [status, canAccess])

  const fetchMalKabulRecords = async () => {
    try {
      setLoading(true)
      console.log('🔍 Mal kabul kayıtları getiriliyor...')
      const response = await fetch('/api/mal-kabul?limit=1000')
      console.log('📡 API Response:', response.status, response.ok)
      
      if (response.ok) {
        const data = await response.json()
        console.log('📊 API Data:', data)
        console.log('📊 Records:', data.records)
        console.log('📊 Records Type:', typeof data.records)
        console.log('📊 Records Is Array:', Array.isArray(data.records))
        console.log('📊 Records Length:', data.records?.length)
        
        setMalKabulRecords(data.records || [])
        setFilteredRecords(data.records || [])
        
        console.log('✅ State güncellendi')
        console.log('📊 malKabulRecords:', data.records)
        console.log('📊 filteredRecords:', data.records)
      } else {
        console.error('❌ Mal kabul kayıtları alınamadı')
        const errorText = await response.text()
        console.error('❌ Error Response:', errorText)
        toast({
          title: "Hata",
          description: "Mal kabul kayıtları yüklenirken hata oluştu",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error('❌ Mal kabul kayıtları hatası:', error)
      toast({
        title: "Hata",
        description: "Mal kabul kayıtları yüklenirken hata oluştu",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
      console.log('🏁 Loading tamamlandı')
    }
  }

  // Arama ve filtreleme
  useEffect(() => {
    console.log('🔄 Filtreleme useEffect çalıştı')
    console.log('📊 malKabulRecords:', malKabulRecords)
    console.log('📊 searchTerm:', searchTerm)
    console.log('📊 filterStatus:', filterStatus)
    console.log('📊 filterSaticiTipi:', filterSaticiTipi)
    console.log('📊 startDate:', startDate)
    console.log('📊 endDate:', endDate)
    
    if (!malKabulRecords || !Array.isArray(malKabulRecords)) {
      console.log('❌ malKabulRecords geçersiz, filteredRecords temizleniyor')
      setFilteredRecords([])
      return
    }

    let filtered = malKabulRecords
    console.log('🔍 Başlangıç kayıt sayısı:', filtered.length)

    // Arama
    if (searchTerm) {
      filtered = filtered.filter(record =>
        record.fisNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        getSaticiAdi(record).toLowerCase().includes(searchTerm.toLowerCase()) ||
        record.urunler.ad.toLowerCase().includes(searchTerm.toLowerCase()) ||
        record.notlar?.toLowerCase().includes(searchTerm.toLowerCase())
      )
      console.log('🔍 Arama sonrası kayıt sayısı:', filtered.length)
    }

    // Durum filtresi
    if (filterStatus !== 'all') {
      filtered = filtered.filter(record => record.status === filterStatus)
      console.log('🔍 Durum filtresi sonrası kayıt sayısı:', filtered.length)
    }

    // Satıcı tipi filtresi
    if (filterSaticiTipi !== 'all') {
      filtered = filtered.filter(record => record.saticiTipi === filterSaticiTipi)
      console.log('🔍 Satıcı tipi filtresi sonrası kayıt sayısı:', filtered.length)
    }

    // Tarih filtresi
    if (startDate && endDate) {
      filtered = filtered.filter(record => {
        const recordDate = new Date(record.tarih)
        const start = new Date(startDate)
        const end = new Date(endDate)
        return recordDate >= start && recordDate <= end
      })
      console.log('🔍 Tarih filtresi sonrası kayıt sayısı:', filtered.length)
    }

    console.log('✅ Final filtered kayıt sayısı:', filtered.length)
    setFilteredRecords(filtered)
  }, [malKabulRecords, searchTerm, filterStatus, filterSaticiTipi, startDate, endDate])

  const getSaticiAdi = (record: MalKabulRecord) => {
    if (record.saticiTipi === 'OZEL_FIRMA') {
      return record.ozelFirma?.firmaAdi || 'Bilinmeyen Firma'
    } else if (record.saticiTipi === 'KOMISYONCU') {
      const komisyoncu = record.komisyoncu?.dukkanAdi || 'Bilinmeyen Komisyoncu'
      // Eğer üretici bilgisi varsa göster, yoksa sadece komisyoncu adını göster
      if (record.uretici) {
        return `${komisyoncu} - ${record.uretici.ad} ${record.uretici.soyad}`
      } else {
        return komisyoncu
      }
    } else if (record.saticiTipi === 'MUSTAHSIL') {
      return record.mustahsil ? `${record.mustahsil.ad} ${record.mustahsil.soyad}` : 'Bilinmeyen Müstahsil'
    }
    return 'Bilinmeyen'
  }

  const getUreticiAdi = (record: MalKabulRecord) => {
    if (record.uretici) {
      return `${record.uretici.ad} ${record.uretici.soyad}`
    }
    return null
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'FATURA_BEKLIYOR':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'FATURALANDI':
        return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'NETLENDI':
        return 'bg-green-100 text-green-800 border-green-200'
      case 'TAMAMLANDI':
        return 'bg-green-100 text-green-800 border-green-200'
      case 'IPTAL':
        return 'bg-red-100 text-red-800 border-red-200'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'FATURA_BEKLIYOR':
        return 'Fatura Bekliyor'
      case 'FATURALANDI':
        return 'Faturalandı'
      case 'NETLENDI':
        return 'Netlendi'
      case 'TAMAMLANDI':
        return 'Tamamlandı'
      case 'IPTAL':
        return 'İptal'
      default:
        return status
    }
  }

  const handlePrintReceipt = async (record: MalKabulRecord, type: 'BILGI_FISI' | 'SON_FIS') => {
    try {
      // Fiş verilerini hazırla
      const receiptData = {
        fisNo: record.fisNo,
        tarih: record.tarih,
        saticiTipi: record.saticiTipi,
        saticiAdi: getSaticiAdi(record),
        urunAdi: record.urunler.ad,
        birim: record.urunler.birim,
        brutKg: record.brutKg,
        daraKg: record.daraKg,
        girisKg: record.girisKg,
        cikmaKg: record.cikmaKg || 0,
        fireKg: record.fireKg || 0,
        cikmaFireKg: record.cikmaFireKg || 0,
        netKg: record.netKg || 0,
        adetSayisi: record.adetSayisi || 0,
        netAdet: record.netAdet || 0,
        ambalajAdi: record.ambalaj?.ad,
        kasaSayisi: record.kasaSayisi,
        paletAdi: record.palet?.ad,
        paletSayisi: record.paletSayisi,
        notlar: record.notlar,
        ureticiAdi: getUreticiAdi(record),
        malKabulcuAdi: record.users.firstName + ' ' + record.users.lastName
      }
      
      // QR kod ve barkod resimlerini oluştur
      const qrValue = `${receiptData.fisNo}|${receiptData.tarih}|${receiptData.saticiTipi}|${receiptData.urunAdi}`
      
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
      JsBarcode.default(canvas, receiptData.fisNo, {
        format: 'CODE128',
        width: 1.5,
        height: 30,
        displayValue: true,
        fontSize: 10,
        margin: 3
      })
      const barcodeDataUrl = canvas.toDataURL('image/png')
      
      // Yazdırma penceresini aç
      const printWindow = window.open('', '_blank')
      if (printWindow) {
        printWindow.document.write(`
          <!DOCTYPE html>
          <html>
            <head>
              <title>${type === 'BILGI_FISI' ? 'Bilgi Fişi' : 'Son Fiş'} Yazdır</title>
              <style>
                body { 
                  font-family: 'Courier New', monospace; 
                  font-size: 10px; 
                  width: 80mm; 
                  max-width: 80mm;
                  margin: 0; 
                  padding: 5px;
                  box-sizing: border-box;
                }
                .header { 
                  text-align: center; 
                  font-weight: bold; 
                  font-size: 14px; 
                  margin-bottom: 8px; 
                  border-bottom: 1px solid #000;
                  padding-bottom: 5px;
                }
                .subtitle {
                  text-align: center;
                  font-size: 10px;
                  margin-bottom: 8px;
                  color: #666;
                }
                .section { 
                  margin-bottom: 8px; 
                  border-bottom: 1px solid #000; 
                  padding-bottom: 5px; 
                }
                .section-title {
                  font-weight: bold;
                  font-size: 10px;
                  margin-bottom: 3px;
                }
                .row { 
                  display: flex; 
                  justify-content: space-between; 
                  margin-bottom: 3px; 
                  font-size: 9px;
                }
                .label { font-weight: bold; }
                .value { text-align: right; }
                .qr-code, .barcode { 
                  text-align: center; 
                  margin: 6px 0; 
                }
                .qr-code img, .barcode img {
                  max-width: 60px;
                  height: auto;
                  display: block;
                  margin: 0 auto;
                }
                .qr-code img {
                  max-width: 40px;
                  width: 40px;
                }
                .final-status { 
                  background: #4ade80; 
                  color: white; 
                  padding: 5px; 
                  text-align: center; 
                  font-weight: bold;
                  margin: 8px 0;
                  font-size: 10px;
                }
                .footer {
                  text-align: center;
                  margin-top: 10px;
                  font-size: 8px;
                  color: #666;
                  border-top: 1px solid #000;
                  padding-top: 5px;
                }
                @media print {
                  body { 
                    width: 80mm !important;
                    max-width: 80mm !important;
                    margin: 0 !important;
                    padding: 5px !important;
                  }
                  @page {
                    size: 80mm auto;
                    margin: 0;
                  }
                  .qr-code img, .barcode img {
                    max-width: 60px !important;
                    width: 60px !important;
                    height: auto !important;
                  }
                  .qr-code img {
                    max-width: 40px !important;
                    width: 40px !important;
                  }
                }
              </style>
            </head>
            <body>
              <div class="header">WEBRAIN</div>
              <div class="subtitle">Tarım Ürünleri Yönetim Sistemi</div>
              <div class="subtitle"></div>
              
              <div class="section">
                <div class="section-title">${type === 'BILGI_FISI' ? 'BİLGİ FİŞİ' : 'SON FİŞ'}</div>
                <div class="subtitle">${type === 'BILGI_FISI' ? 'Üretici için kopya' : 'Ürün son evrakı'}</div>
              </div>
              
              <div class="section">
                <div class="row">
                  <span class="label">Fiş No:</span>
                  <span class="value">${receiptData.fisNo}</span>
                </div>
                <div class="row">
                  <span class="label">Tarih:</span>
                  <span class="value">${new Date(receiptData.tarih).toLocaleDateString('tr-TR')}</span>
                </div>
                <div class="row">
                  <span class="label">Saat:</span>
                  <span class="value">${new Date(receiptData.tarih).toLocaleTimeString('tr-TR')}</span>
                </div>
              </div>
              
              <div class="section">
                <div class="section-title">SATICI BİLGİLERİ</div>
                <div class="row">
                  <span class="label">Tip:</span>
                  <span class="value">${receiptData.saticiTipi}</span>
                </div>
                <div class="row">
                  <span class="label">Ad:</span>
                  <span class="value">${receiptData.saticiAdi}</span>
                </div>
                ${receiptData.ureticiAdi ? `
                <div class="row">
                  <span class="label">Üretici:</span>
                  <span class="value">${receiptData.ureticiAdi}</span>
                </div>
                ` : ''}
              </div>
              
              <div class="section">
                <div class="section-title">ÜRÜN BİLGİLERİ</div>
                <div class="row">
                  <span class="label">Ürün:</span>
                  <span class="value">${receiptData.urunAdi}</span>
                </div>
                ${receiptData.ambalajAdi ? `
                <div class="row">
                  <span class="label">Ambalaj:</span>
                  <span class="value">${receiptData.ambalajAdi} x ${receiptData.kasaSayisi}</span>
                </div>
                ` : ''}
                ${receiptData.paletAdi ? `
                <div class="row">
                  <span class="label">Palet:</span>
                  <span class="value">${receiptData.paletAdi} x ${receiptData.paletSayisi}</span>
                </div>
                ` : ''}
              </div>
              
              <div class="section">
                <div class="section-title">${receiptData.birim?.toLowerCase() === 'adet' ? 'ADET BİLGİLERİ' : 'AĞIRLIK BİLGİLERİ'}</div>
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
                ${type === 'SON_FIS' ? `
                <div class="row">
                  <span class="label">Çıkma Adet:</span>
                  <span class="value">${receiptData.cikmaKg} adet</span>
                </div>
                <div class="row">
                  <span class="label">Fire Adet:</span>
                  <span class="value">${receiptData.fireKg} adet</span>
                </div>
                <div class="row">
                  <span class="label">Net Adet:</span>
                  <span class="value">${receiptData.netAdet} adet</span>
                </div>
                ` : ''}
                ` : `
                <div class="row">
                  <span class="label">Brüt KG:</span>
                  <span class="value">${receiptData.brutKg.toFixed(2)} kg</span>
                </div>
                <div class="row">
                  <span class="label">Dara KG:</span>
                  <span class="value">${receiptData.daraKg.toFixed(2)} kg</span>
                </div>
                <div class="row">
                  <span class="label">Giriş KG:</span>
                  <span class="value">${receiptData.girisKg.toFixed(2)} kg</span>
                </div>
                ${type === 'SON_FIS' ? `
                <div class="row">
                  <span class="label">Çıkma/Fire KG:</span>
                  <span class="value">${receiptData.cikmaFireKg.toFixed(2)} kg</span>
                </div>
                <div class="row">
                  <span class="label">Net KG:</span>
                  <span class="value">${receiptData.netKg.toFixed(2)} kg</span>
                </div>
                ` : ''}
                `}
              </div>
              
              ${receiptData.notlar ? `
              <div class="section">
                <div class="section-title">NOTLAR</div>
                <div class="row">
                  <span class="label">Not:</span>
                  <span class="value">${receiptData.notlar}</span>
                </div>
              </div>
              ` : ''}
              
              <div class="section">
                <div class="row">
                  <span class="label">Mal Kabulcu:</span>
                  <span class="value">${receiptData.malKabulcuAdi}</span>
                </div>
              </div>
              
              <div class="section">
                <div class="section-title">BARKOD</div>
                <div class="barcode">
                  <img src="${barcodeDataUrl}" alt="Barkod" />
                </div>
              </div>
              
              <div class="section">
                <div class="section-title">QR KOD</div>
                <div class="qr-code">
                  <img src="${qrDataUrl}" alt="QR Kod" />
                </div>
              </div>
              
              ${type === 'SON_FIS' ? `
              <div class="final-status">ÜRÜN NETLENDİ</div>
              ` : ''}
              
              <div class="footer">
                ${type === 'BILGI_FISI' 
                  ? 'Bu fişi saklayın, ürün işlendiğinde gerekli olacak'
                  : 'Ürün işlemi tamamlandı'
                }
                <br>
                ${new Date().toLocaleDateString('tr-TR')} - ${new Date().toLocaleTimeString('tr-TR')}
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
    } catch (error) {
      console.error('Fiş yazdırma hatası:', error)
      toast({
        title: "Hata",
        description: "Fiş yazdırılırken hata oluştu",
        variant: "destructive",
      })
    }
  }

  const handleDownloadReceipt = (record: MalKabulRecord, type: 'BILGI_FISI' | 'SON_FIS') => {
    // PDF indirme işlemi (gelecekte implement edilebilir)
    toast({
      title: "Bilgi",
      description: "PDF indirme özelliği yakında eklenecek",
      variant: "default",
    })
  }

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

  if (!canAccess) {
    return null
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
            <h1 className="text-3xl font-bold text-foreground">Mal Kabul Fiş Arşivi</h1>
            <p className="text-muted-foreground">
              Tüm mal kabul fişlerini görüntüleyin ve tekrar yazdırın
            </p>
          </div>
        </div>
      </div>

      {/* İstatistikler */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Toplam Fiş</p>
                <p className="text-2xl font-bold">{Array.isArray(malKabulRecords) ? malKabulRecords.length : 0}</p>
              </div>
              <FileText className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Bekleyen</p>
                <p className="text-2xl font-bold text-yellow-500">
                  {Array.isArray(malKabulRecords) ? malKabulRecords.filter(r => r.status === 'FATURA_BEKLIYOR').length : 0}
                </p>
              </div>
              <AlertTriangle className="h-8 w-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Netlenen</p>
                <p className="text-2xl font-bold text-green-500">
                  {Array.isArray(malKabulRecords) ? malKabulRecords.filter(r => r.status === 'NETLENDI').length : 0}
                </p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Tamamlanan</p>
                <p className="text-2xl font-bold text-green-500">
                  {Array.isArray(malKabulRecords) ? malKabulRecords.filter(r => r.status === 'TAMAMLANDI').length : 0}
                </p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filtreler */}
      <Card className="mb-6">
        <CardContent className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Fiş no, satıcı, ürün ara..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <div>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
              >
                <option value="all">Tüm Durumlar</option>
                <option value="FATURA_BEKLIYOR">Fatura Bekliyor</option>
                <option value="FATURALANDI">Faturalandı</option>
                <option value="NETLENDI">Netlendi</option>
                <option value="TAMAMLANDI">Tamamlandı</option>
                <option value="IPTAL">İptal</option>
              </select>
            </div>

            <div>
              <select
                value={filterSaticiTipi}
                onChange={(e) => setFilterSaticiTipi(e.target.value)}
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
              >
                <option value="all">Tüm Satıcılar</option>
                <option value="OZEL_FIRMA">Özel Firma</option>
                <option value="KOMISYONCU">Komisyoncu</option>
                <option value="MUSTAHSIL">Müstahsil</option>
              </select>
            </div>

            <div>
              <Input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                placeholder="Başlangıç"
                className="text-sm"
              />
            </div>

            <div>
              <Input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                placeholder="Bitiş"
                className="text-sm"
              />
            </div>

            <Button
              variant="outline"
              onClick={() => {
                setSearchTerm('')
                setFilterStatus('all')
                setFilterSaticiTipi('all')
                setStartDate('')
                setEndDate('')
              }}
              className="flex items-center gap-2"
            >
              <Filter className="h-4 w-4" />
              Temizle
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Fiş Listesi */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Fiş Listesi ({Array.isArray(filteredRecords) ? filteredRecords.length : 0} kayıt)
          </CardTitle>
          <CardDescription>
            Tüm mal kabul fişlerini görüntüleyin ve işlem yapın
          </CardDescription>
        </CardHeader>
        <CardContent>
          {!Array.isArray(filteredRecords) || filteredRecords.length === 0 ? (
            <div className="text-center py-8">
              <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">Henüz fiş bulunamadı</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-2 font-medium">Fiş No</th>
                    <th className="text-left py-3 px-2 font-medium">Tarih</th>
                    <th className="text-left py-3 px-2 font-medium">Satıcı</th>
                    <th className="text-left py-3 px-2 font-medium">Ürün</th>
                    <th className="text-left py-3 px-2 font-medium">Brüt KG</th>
                    <th className="text-left py-3 px-2 font-medium">Net KG</th>
                    <th className="text-left py-3 px-2 font-medium">Durum</th>
                    <th className="text-left py-3 px-2 font-medium">İşlemler</th>
                  </tr>
                </thead>
                <tbody>
                  {Array.isArray(filteredRecords) && filteredRecords.map((record) => (
                    <tr key={record.id} className="border-b border-border hover:bg-muted/50">
                      <td className="py-3 px-2 font-mono font-medium">
                        {record.fisNo}
                      </td>
                      <td className="py-3 px-2">
                        {new Date(record.tarih).toLocaleDateString('tr-TR')}
                      </td>
                      <td className="py-3 px-2">
                        <div className="max-w-xs truncate" title={getSaticiAdi(record)}>
                          {getSaticiAdi(record)}
                        </div>
                      </td>
                      <td className="py-3 px-2">
                        <div className="max-w-xs truncate" title={record.urunler.ad}>
                          {record.urunler.ad}
                        </div>
                      </td>
                      <td className="py-3 px-2">
                        {record.brutKg.toFixed(2)} kg
                      </td>
                      <td className="py-3 px-2">
                        {record.netKg ? `${record.netKg.toFixed(2)} kg` : '-'}
                      </td>
                      <td className="py-3 px-2">
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(record.status)}`}>
                          {getStatusText(record.status)}
                        </span>
                      </td>
                      <td className="py-3 px-2">
                        <div className="flex items-center gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handlePrintReceipt(record, 'BILGI_FISI')}
                            title="Bilgi Fişi Yazdır"
                          >
                            <Printer className="h-4 w-4" />
                          </Button>
                          
                          {record.status === 'NETLENDI' && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handlePrintReceipt(record, 'SON_FIS')}
                              title="Son Fiş Yazdır"
                            >
                              <CheckCircle className="h-4 w-4" />
                            </Button>
                          )}
                          
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDownloadReceipt(record, 'BILGI_FISI')}
                            title="PDF İndir"
                          >
                            <Download className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>


    </div>
  )
}
