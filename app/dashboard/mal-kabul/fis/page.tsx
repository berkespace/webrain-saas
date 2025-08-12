'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { DashboardLayout } from '@/components/layout/dashboard-layout'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Search, 
  Filter, 
  Eye, 
  Printer,
  FileText,
  Package,
  Calendar,
  Scale,
  User,
  Download,
  CheckCircle,
  XCircle,
  Clock
} from 'lucide-react'
import { toast } from '@/components/ui/use-toast'
import { QRCode } from '@/components/ui/qr-code'
import { Barcode } from '@/components/ui/barcode'

interface MalKabulRecord {
  id: string
  fisNo: string
  tarih: string
  saticiTipi: string
  urun: { ad: string }
  brutKg: number
  girisKg: number
  status: string
  malKabulcu: { firstName: string; lastName: string }
  komisyoncu?: { dukkanAdi: string }
  uretici?: { ad: string; soyad: string }
  ozelFirma?: { firmaAdi: string }
  ambalaj?: { ad: string }
  palet?: { ad: string }
  kasaSayisi: number
  paletSayisi: number
  notlar?: string
  fisYazdirildi?: boolean
  fisYazdirmaTarihi?: string
}

export default function FisYazdirPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [records, setRecords] = useState<MalKabulRecord[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [fisFilter, setFisFilter] = useState('')
  const [selectedTab, setSelectedTab] = useState('tum')

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
        console.log('Fiş Yazdır API Response:', data)
        console.log('Fiş Yazdır Records:', data.records)
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
    if (record.komisyoncu) return record.komisyoncu.dukkanAdi
    if (record.uretici) return `${record.uretici.ad} ${record.uretici.soyad}`
    if (record.ozelFirma) return record.ozelFirma.firmaAdi
    return 'Bilinmiyor'
  }

  const handleView = (id: string) => {
    router.push(`/dashboard/mal-kabul/duzenle/${id}`)
  }

  const handlePrint = (record: MalKabulRecord, type: 'BILGI_FISI' | 'SON_FIS' = 'BILGI_FISI') => {
    const receiptData = {
      fisNo: record.fisNo,
      tarih: record.tarih,
      saticiTipi: record.saticiTipi,
      saticiAdi: getSaticiAdi(record),
      urunAdi: record.urun.ad,
      brutKg: record.brutKg,
      daraKg: 0,
      girisKg: record.girisKg,
      ambalajAdi: record.ambalaj?.ad,
      kasaSayisi: record.kasaSayisi,
      paletAdi: record.palet?.ad,
      paletSayisi: record.paletSayisi,
      notlar: record.notlar,
      malKabulcuAdi: `${record.malKabulcu.firstName} ${record.malKabulcu.lastName}`
    }
    
    // Fiş yazdırma modal'ını aç
    localStorage.setItem('printReceipt', JSON.stringify({
      ...receiptData,
      type
    }))
    
    // Yazdırma penceresini aç
    const printWindow = window.open('', '_blank')
    if (printWindow) {
      const title = type === 'BILGI_FISI' ? 'Bilgi Fişi' : 'Son Fiş'
      printWindow.document.write(`
        <!DOCTYPE html>
        <html>
          <head>
            <title>${title} Yazdır - ${record.fisNo}</title>
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
            <div class="header">80mm Termal Yazıcı</div>
            
            <div class="section">
              <div class="header">${title.toUpperCase()}</div>
              ${type === 'SON_FIS' ? '<div class="final-status">ÜRÜN SON EVRAKI</div>' : ''}
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
              <div class="label">QR KOD VE BARKOD</div>
              <div class="qr-placeholder">
                QR Kod Buraya Gelecek<br>
                ${receiptData.fisNo}|${receiptData.tarih}|${receiptData.saticiTipi}|${receiptData.urunAdi}
              </div>
              <div style="text-align: center; font-size: 10px; color: #666;">
                ${type === 'BILGI_FISI' ? 'Ürün işlendiğinde bu QR kod ile düzenleme ekranına gidin' : 'Bu fiş ürünün son evrakıdır'}
              </div>
            </div>
            
            <div style="text-align: center; margin-top: 20px;">
              <div style="font-size: 10px; color: #666;">
                ${type === 'BILGI_FISI' ? 'Bu fişi saklayın, ürün işlendiğinde gerekli olacak' : 'Ürün işlemi tamamlandı'}
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
      title: `${title} Yazdırılıyor`,
      description: `${title} yazdırma penceresi açıldı`,
      variant: "success",
    })
  }

  const getFilteredRecords = () => {
    let filtered = records.filter(record => {
      const matchesSearch = record.fisNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           record.urun.ad.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           getSaticiAdi(record).toLowerCase().includes(searchTerm.toLowerCase())
      
      const matchesStatus = !statusFilter || record.status === statusFilter
      const matchesFis = !fisFilter || 
                        (fisFilter === 'yazdirildi' && record.fisYazdirildi) ||
                        (fisFilter === 'yazdirilmadi' && !record.fisYazdirildi)
      
      return matchesSearch && matchesStatus && matchesFis
    })

    // Tab bazlı filtreleme
    if (selectedTab === 'yazdirilmamis') {
      filtered = filtered.filter(record => !record.fisYazdirildi)
    } else if (selectedTab === 'yazdirilmis') {
      filtered = filtered.filter(record => record.fisYazdirildi)
    }

    return filtered
  }

  const filteredRecords = getFilteredRecords()

  if (loading) {
    return (
      <DashboardLayout>
        <div className="p-6">
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
          </div>
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold">Fiş Yazdır</h1>
            <p className="text-gray-600 mt-2">Mal kabul kayıtları için fiş yazdırma işlemleri</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" onClick={() => router.push('/dashboard/mal-kabul/liste')}>
              <FileText className="mr-2 h-4 w-4" />
              Tüm Kayıtlar
            </Button>
            <Button onClick={() => router.push('/dashboard/mal-kabul/yeni')}>
              <Package className="mr-2 h-4 w-4" />
              Yeni Mal Kabul
            </Button>
          </div>
        </div>

        {/* Özet Kartları */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Toplam Kayıt</p>
                  <p className="text-2xl font-bold">{records.length}</p>
                </div>
                <FileText className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Fiş Yazdırıldı</p>
                  <p className="text-2xl font-bold text-green-600">
                    {records.filter(r => r.fisYazdirildi).length}
                  </p>
                </div>
                <CheckCircle className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Fiş Yazdırılmadı</p>
                  <p className="text-2xl font-bold text-orange-600">
                    {records.filter(r => !r.fisYazdirildi).length}
                  </p>
                </div>
                <XCircle className="h-8 w-8 text-orange-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Bugün Yazdırılan</p>
                  <p className="text-2xl font-bold text-purple-600">
                    {records.filter(r => {
                      if (!r.fisYazdirmaTarihi) return false
                      const today = new Date().toDateString()
                      const printDate = new Date(r.fisYazdirmaTarihi).toDateString()
                      return today === printDate
                    }).length}
                  </p>
                </div>
                <Printer className="h-8 w-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="mb-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="tum">Tüm Kayıtlar</TabsTrigger>
            <TabsTrigger value="yazdirilmamis">Fiş Yazdırılmamış</TabsTrigger>
            <TabsTrigger value="yazdirilmis">Fiş Yazdırılmış</TabsTrigger>
          </TabsList>
        </Tabs>

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
                    <SelectItem value="">Tüm durumlar</SelectItem>
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
                    <SelectItem value="">Tüm fişler</SelectItem>
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
                    setStatusFilter('')
                    setFisFilter('')
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
                      {record.fisYazdirildi ? (
                        <Badge variant="outline" className="text-green-600 border-green-600">
                          <CheckCircle className="mr-1 h-3 w-3" />
                          Fiş Yazdırıldı
                          {record.fisYazdirmaTarihi && (
                            <span className="ml-1 text-xs">
                              ({new Date(record.fisYazdirmaTarihi).toLocaleDateString('tr-TR')})
                            </span>
                          )}
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="text-orange-600 border-orange-600">
                          <XCircle className="mr-1 h-3 w-3" />
                          Fiş Yazdırılmadı
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
                    <Button variant="outline" size="sm" onClick={() => handlePrint(record, 'BILGI_FISI')}>
                      <Printer className="mr-1 h-4 w-4" />
                      Bilgi Fişi
                    </Button>
                    {record.status === 'NETLENDI' && (
                      <Button variant="outline" size="sm" onClick={() => handlePrint(record, 'SON_FIS')}>
                        <Download className="mr-1 h-4 w-4" />
                        Son Fiş
                      </Button>
                    )}
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex items-center gap-2">
                    <Package className="h-4 w-4 text-gray-500" />
                    <span className="font-medium">{record.urun.ad}</span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-gray-500" />
                    <span>{getSaticiAdi(record)}</span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Scale className="h-4 w-4 text-gray-500" />
                    <span>{record.girisKg.toFixed(2)} kg</span>
                  </div>
                </div>
                
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
    </DashboardLayout>
  )
}
