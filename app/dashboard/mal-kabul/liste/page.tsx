'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { 
  Search, 
  Filter, 
  Eye, 
  Edit, 
  Printer,
  FileText,
  Package,
  Calendar,
  Scale,
  User,
  Plus
} from 'lucide-react'
import { toast } from '@/components/ui/use-toast'

interface MalKabulRecord {
  id: string
  fisNo: string
  tarih: string
  saticiTipi: string
  urunler: { ad: string; birim: string }
  brutKg: number
  girisKg: number
  cikmaKg: number
  fireKg: number
  netKg: number
  adetSayisi: number
  netAdet: number
  status: string
  users: { firstName: string; lastName: string }
  komisyoncu?: { dukkanAdi: string; komisyonKodu: string }
  uretici?: { ad: string; soyad: string }
  mustahsil?: { ad: string; soyad: string }
  ozelFirma?: { firmaAdi: string }
  ambalaj?: { ad: string }
  palet?: { ad: string }
  kasaSayisi: number
  paletSayisi: number
  notlar?: string
  fisYazdirildi?: boolean
  fisYazdirmaTarihi?: string
}

export default function MalKabulListePage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [records, setRecords] = useState<MalKabulRecord[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [fisFilter, setFisFilter] = useState('all')

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login')
    } else if (status === 'authenticated') {
      fetchRecords()
    }
  }, [status, router])

  const fetchRecords = async () => {
    try {
      const response = await fetch('/api/mal-kabul?limit=1000')
      if (response.ok) {
        const data = await response.json()
        console.log('API Response:', data)
        console.log('Records:', data.records)
        
        // Debug: Ürün birimi kontrolü
        if (data.records && data.records.length > 0) {
          data.records.forEach((record: any, index: number) => {
            console.log(`Record ${index}:`, {
              id: record.id,
              urunAdi: record.urunler?.ad,
              urunBirim: record.urunler?.birim,
              saticiTipi: record.saticiTipi,
              isAdetBased: record.urunler?.birim?.toLowerCase() === 'adet'
            })
          })
        }
        
        setRecords(data.records || [])
      }
    } catch (error) {
      console.error('Kayıtlar yüklenirken hata:', error)
      toast({
        title: "Hata",
        description: "Kayıtlar yüklenirken hata oluştu",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      'FATURA_BEKLIYOR': { label: 'Fatura Bekliyor', variant: 'secondary' as const },
      'FATURALANDI': { label: 'Faturalandı', variant: 'default' as const },
      'NETLENDI': { label: 'Netlendi', variant: 'success' as const },
      'TAMAMLANDI': { label: 'Tamamlandı', variant: 'success' as const },
      'IPTAL': { label: 'İptal', variant: 'destructive' as const }
    }
    
    const config = statusConfig[status as keyof typeof statusConfig] || { label: status, variant: 'secondary' as const }
    return <Badge variant={config.variant}>{config.label}</Badge>
  }

  const getSaticiAdi = (record: MalKabulRecord) => {
    if (record.saticiTipi === 'KOMISYONCU' && record.komisyoncu && record.uretici) {
      // Komisyoncu olarak giriş yapılan ürünlerde: "Komisyon No - Üretici Adı" formatında
      return `${record.komisyoncu.dukkanAdi} - ${record.uretici.ad} ${record.uretici.soyad}`
    } else if (record.saticiTipi === 'MUSTAHSIL' && record.mustahsil) {
      // Müstahsil olarak giriş yapılan ürünlerde: "Ad Soyad" formatında
      return `${record.mustahsil.ad} ${record.mustahsil.soyad}`
    } else if (record.komisyoncu) {
      return record.komisyoncu.dukkanAdi
    } else if (record.uretici) {
      return `${record.uretici.ad} ${record.uretici.soyad}`
    } else if (record.ozelFirma) {
      return record.ozelFirma.firmaAdi
    }
    return 'Bilinmiyor'
  }

  const handleView = (id: string) => {
    router.push(`/dashboard/mal-kabul/duzenle/${id}`)
  }

  const handlePrint = (record: MalKabulRecord) => {
    // Fiş yazdırma işlemi
    const receiptData = {
      fisNo: record.fisNo,
      tarih: record.tarih,
      saticiTipi: record.saticiTipi,
      saticiAdi: getSaticiAdi(record),
              urunAdi: record.urunler.ad,
      brutKg: record.brutKg,
      daraKg: 0, // Bu bilgi kayıtta yok
      girisKg: record.girisKg,
      ambalajAdi: record.ambalaj?.ad,
      kasaSayisi: record.kasaSayisi,
      paletAdi: record.palet?.ad,
      paletSayisi: record.paletSayisi,
      notlar: record.notlar,
      malKabulcuAdi: `${record.users.firstName} ${record.users.lastName}`
    }
    
    // Fiş yazdırma modal'ını aç
    localStorage.setItem('printReceipt', JSON.stringify({
      ...receiptData,
      type: 'BILGI_FISI'
    }))
    
    // Yazdırma penceresini aç
    const printWindow = window.open('', '_blank')
    if (printWindow) {
      printWindow.document.write(`
        <!DOCTYPE html>
        <html>
          <head>
            <title>Bilgi Fişi Yazdır - ${record.fisNo}</title>
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
            </style>
          </head>
          <body>
            <div class="header">WEBRAIN</div>
            <div class="header">Tarım Ürünleri Yönetim Sistemi</div>
            <div class="header"></div>
            
            <div class="section">
              <div class="header">BİLGİ FİŞİ</div>
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
              <div class="label">SATICI BİLGİLERİ</div>
              <div>Tip: ${receiptData.saticiTipi}</div>
              <div class="label">${receiptData.saticiAdi}</div>
            </div>
            
            <div class="section">
              <div class="label">ÜRÜN BİLGİLERİ</div>
              <div class="label">${receiptData.urunAdi}</div>
              ${receiptData.ambalajAdi ? `<div>Ambalaj: ${receiptData.ambalajAdi} x ${receiptData.kasaSayisi}</div>` : ''}
              ${receiptData.paletAdi && receiptData.paletSayisi ? `<div>Palet: ${receiptData.paletAdi} x ${receiptData.paletSayisi}</div>` : ''}
            </div>
            
            <div class="section">
              <div class="label">AĞIRLIK BİLGİLERİ</div>
              <div class="row">
                <span>Brüt KG:</span>
                <span class="value">${receiptData.brutKg.toFixed(2)} kg</span>
              </div>
              <div class="row">
                <span>Giriş KG:</span>
                <span class="value">${receiptData.girisKg.toFixed(2)} kg</span>
              </div>
            </div>
            
            ${receiptData.notlar ? `
            <div class="section">
              <div class="label">NOTLAR</div>
              <div>${receiptData.notlar}</div>
            </div>
            ` : ''}
            
            <div class="section">
              <div>Mal Kabulcu:</div>
              <div class="label">${receiptData.malKabulcuAdi}</div>
            </div>
            
            <div class="section">
              <div class="label">QR Kod</div>
              <div class="qr-placeholder">
                QR Kod Buraya Gelecek<br>
                ${receiptData.fisNo}|${receiptData.tarih}|${receiptData.saticiTipi}|${receiptData.urunAdi}
              </div>
              <div style="text-align: center; font-size: 10px; color: #666;">
                Ürün işlendiğinde bu QR kod ile düzenleme ekranına gidin
              </div>
            </div>
            
            <div style="text-align: center; margin-top: 20px;">
              <div style="font-size: 10px; color: #666;">
                Bu fişi saklayın, ürün işlendiğinde gerekli olacak
              </div>
              <div style="font-size: 10px; margin-top: 5px;">
                ${new Date().toLocaleDateString('tr-TR')} - ${new Date().toLocaleTimeString('tr-TR')}
              </div>
            </div>
          </body>
        </html>
      `)
      printWindow.document.close()
      printWindow.focus()
      
      setTimeout(() => {
        printWindow.print()
      }, 500)
    }
    
    toast({
      title: "Fiş Yazdırılıyor",
      description: "Fiş yazdırma penceresi açıldı",
      variant: "success",
    })
  }

  const filteredRecords = records.filter(record => {
    const matchesSearch = record.fisNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         record.urunler.ad.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         getSaticiAdi(record).toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesStatus = statusFilter === 'all' || record.status === statusFilter
    const matchesFis = fisFilter === 'all' || 
                      (fisFilter === 'yazdirildi' && record.fisYazdirildi) ||
                      (fisFilter === 'yazdirilmadi' && !record.fisYazdirildi)
    
    return matchesSearch && matchesStatus && matchesFis
  })

  if (loading) {
    return (
      
        <div className="p-6">
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
          </div>
        </div>
      
    )
  }

  return (
    
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Mal Kabul Listesi</h1>
          <Button onClick={() => router.push('/dashboard/mal-kabul/yeni')}>
            <Plus className="mr-2 h-4 w-4" />
            Yeni Mal Kabul
          </Button>
        </div>

        {/* Filtreler */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Filter className="h-5 w-5" />
              Filtreler
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Arama</label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Fiş no, ürün, satıcı..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Durum</label>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Tüm durumlar" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tüm durumlar</SelectItem>
                    <SelectItem value="FATURA_BEKLIYOR">Fatura Bekliyor</SelectItem>
                    <SelectItem value="FATURALANDI">Faturalandı</SelectItem>
                    <SelectItem value="NETLENDI">Netlendi</SelectItem>
                    <SelectItem value="TAMAMLANDI">Tamamlandı</SelectItem>
                    <SelectItem value="IPTAL">İptal</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Fiş Durumu</label>
                <Select value={fisFilter} onValueChange={setFisFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Tüm fişler" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tüm fişler</SelectItem>
                    <SelectItem value="yazdirildi">Yazdırıldı</SelectItem>
                    <SelectItem value="yazdirilmadi">Yazdırılmadı</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex items-end">
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setSearchTerm('')
                    setStatusFilter('all')
                    setFisFilter('all')
                  }}
                >
                  Filtreleri Temizle
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Kayıtlar */}
        <div className="grid gap-4">
          {filteredRecords.map((record) => (
            <Card key={record.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold">{record.fisNo}</h3>
                      {getStatusBadge(record.status)}
                      {record.fisYazdirildi && (
                        <Badge variant="outline" className="text-green-600 border-green-600">
                          <Printer className="mr-1 h-3 w-3" />
                          Fiş Yazdırıldı
                        </Badge>
                      )}
                    </div>
                    <div className="text-sm text-gray-600">
                      {new Date(record.tarih).toLocaleDateString('tr-TR')} - {new Date(record.tarih).toLocaleTimeString('tr-TR')}
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={() => handleView(record.id)}>
                      <Eye className="mr-1 h-4 w-4" />
                      Görüntüle
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handlePrint(record)}>
                      <Printer className="mr-1 h-4 w-4" />
                      Fiş Yazdır
                    </Button>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex items-center gap-2">
                    <Package className="h-4 w-4 text-gray-500" />
                    <span className="font-medium">{record.urunler.ad}</span>
                    <Badge variant="outline" className="text-xs">
                      {record.urunler.birim}
                    </Badge>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-gray-500" />
                    <div className="flex flex-col">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-xs">
                          {record.saticiTipi === 'KOMISYONCU' ? 'KOMİSYONCU' : 
                           record.saticiTipi === 'MUSTAHSIL' ? 'MÜSTAHSİL' : 
                           record.saticiTipi === 'OZEL_FIRMA' ? 'ÖZEL FİRMA' : 
                           record.saticiTipi}
                        </Badge>
                        <span className="text-sm font-medium">{getSaticiAdi(record)}</span>
                      </div>
                      {record.saticiTipi === 'KOMISYONCU' && record.komisyoncu && (
                        <div className="text-xs text-gray-500">
                          Komisyon No: {record.komisyoncu.komisyonKodu || 'N/A'}
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Scale className="h-4 w-4 text-gray-500" />
                    {record.urunler.birim?.toLowerCase() === 'adet' ? (
                      <span>{record.adetSayisi || 0} adet</span>
                    ) : (
                      <span>{record.girisKg.toFixed(2)} kg</span>
                    )}
                  </div>
                </div>
                
                {/* Ürün birimine göre detay bilgileri */}
                {record.urunler.birim?.toLowerCase() === 'adet' ? (
                  <div className="mt-3 p-3 bg-blue-50 rounded-lg">
                    <div className="text-sm font-medium text-blue-700 mb-2">Adet Bilgileri:</div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <span className="text-gray-600">Kasa:</span>
                        <span className="ml-2 font-medium">{record.kasaSayisi || 0}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Giriş:</span>
                        <span className="ml-2 font-medium">{record.adetSayisi || 0} adet</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Çıkma:</span>
                        <span className="ml-2 font-medium">{record.cikmaKg || 0} adet</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Net:</span>
                        <span className="ml-2 font-medium">{record.netAdet || 0} adet</span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="mt-3 p-3 bg-green-50 rounded-lg">
                    <div className="text-sm font-medium text-green-700 mb-2">Kilogram Bilgileri:</div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <span className="text-gray-600">Brüt:</span>
                        <span className="ml-2 font-medium">{record.brutKg?.toFixed(2) || '0.00'} kg</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Giriş:</span>
                        <span className="ml-2 font-medium">{record.girisKg?.toFixed(2) || '0.00'} kg</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Çıkma:</span>
                        <span className="ml-2 font-medium">{record.cikmaKg?.toFixed(2) || '0.00'} kg</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Net:</span>
                        <span className="ml-2 font-medium">{record.netKg?.toFixed(2) || '0.00'} kg</span>
                      </div>
                    </div>
                  </div>
                )}
                
                {record.notlar && (
                  <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                    <div className="text-sm font-medium text-gray-700 mb-1">Notlar:</div>
                    <div className="text-sm text-gray-600">{record.notlar}</div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
        
        {filteredRecords.length === 0 && (
          <div className="text-center py-12">
            <FileText className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Kayıt bulunamadı</h3>
            <p className="text-gray-500">Arama kriterlerinize uygun kayıt bulunamadı.</p>
          </div>
        )}
      </div>
    
  )
}
