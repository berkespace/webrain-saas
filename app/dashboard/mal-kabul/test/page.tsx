'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { 
  Save, 
  ArrowLeft,
  Plus,
  Trash2,
  FileSpreadsheet,
  Printer,
  CheckCircle,
  XCircle,
  Clock,
  AlertCircle
} from 'lucide-react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useToast } from '@/components/ui/use-toast'
import Link from 'next/link'
import { QRCode } from '@/components/ui/qr-code'
import { Barcode } from '@/components/ui/barcode'

interface MalKabulRow {
  id: string
  fisNo?: string
  tarih?: string
  saticiTipi: string
  komisyoncuId: string
  ureticiId: string
  mustahsilId: string
  ozelFirmaId: string
  urunId: string
  kasaSayisi: string
  brutKg: string
  daraKg: string
  girisKg: string
  fireKg: string
  cikmaKg: string
  netKg: string
  notlar: string
  urunDurumu: 'BEKLEMEDE' | 'NETLENDI' | 'IPTAL'
  fisYazdirildi: boolean
  status: 'NEW' | 'SAVED' | 'ERROR' | 'LOADING'
  createdAt?: string
  updatedAt?: string
}

interface OzelFirma {
  id: string
  firmaAdi: string
  sehir: string
  firmaNo: string
}

interface Komisyoncu {
  id: string
  dukkanAdi: string
  sehir: string
  komisyonKodu: string
}

interface Uretici {
  id: string
  ad: string
  soyad: string
  komisyoncuId?: string
}

interface Mustahsil {
  id: string
  ad: string
  soyad: string
  mustahsilNo: string
  sehir: string
}

interface Urun {
  id: string
  ad: string
  kategori?: string
  stokKodu: string
}

export default function MalKabulTest() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const { toast } = useToast()
  
  // State'ler
  const [rows, setRows] = useState<MalKabulRow[]>([
    {
      id: '1',
      saticiTipi: '',
      komisyoncuId: '',
      ureticiId: '',
      mustahsilId: '',
      ozelFirmaId: '',
      urunId: '',
      kasaSayisi: '',
      brutKg: '',
      daraKg: '',
      girisKg: '',
      fireKg: '',
      cikmaKg: '',
      netKg: '',
      notlar: '',
      urunDurumu: 'BEKLEMEDE',
      fisYazdirildi: false,
      status: 'NEW'
    }
  ])
  
  const [selectedRowId, setSelectedRowId] = useState<string | null>(null)
  
  // Global listener için state'ler
  const [globalInput, setGlobalInput] = useState('')
  const [showGlobalSuggestions, setShowGlobalSuggestions] = useState(false)
  const [globalSuggestions, setGlobalSuggestions] = useState<any[]>([])
  
  const [ozelFirmalar, setOzelFirmalar] = useState<OzelFirma[]>([])
  const [komisyoncular, setKomisyoncular] = useState<Komisyoncu[]>([])
  const [mustahsil, setMustahsil] = useState<Mustahsil[]>([])
  const [ureticiler, setUreticiler] = useState<Uretici[]>([])
  const [urunler, setUrunler] = useState<Urun[]>([])
  const [loading, setLoading] = useState(false)
  
  // Excel tarzı filtreleme ve sıralama
  const [filterText, setFilterText] = useState('')
  const [sortColumn, setSortColumn] = useState<keyof MalKabulRow | null>(null)
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc')
  const [showFilters, setShowFilters] = useState(false)
  const [columnFilters, setColumnFilters] = useState<Record<string, string>>({})
  
  // Fiş yazdırma
  const [receiptData, setReceiptData] = useState<any>(null)
  const [showReceipt, setShowReceipt] = useState(false)
  
  // Mevcut kayıtları yükleme
  const [existingRecords, setExistingRecords] = useState<MalKabulRow[]>([])
  const [showExistingRecords, setShowExistingRecords] = useState(false)

  // Data fetching
  useEffect(() => {
    if (status === 'authenticated') {
      fetchData()
    }
  }, [status])



  const fetchData = async () => {
    try {
      console.log('🔄 Veri getiriliyor...')
      
      // Test verisi ekle (API'ler çalışmıyorsa)
      const testData = {
        ozelFirmalar: [
          { id: '1', firmaAdi: 'Test Firma 1', sehir: 'İstanbul', firmaNo: 'TF001' },
          { id: '2', firmaAdi: 'Test Firma 2', sehir: 'Ankara', firmaNo: 'TF002' }
        ],
        komisyoncular: [
          { id: '1', dukkanAdi: 'Test Komisyoncu 1', sehir: 'İzmir', komisyonKodu: 'TK001' },
          { id: '2', dukkanAdi: 'Test Komisyoncu 2', sehir: 'Bursa', komisyonKodu: 'TK002' }
        ],
        mustahsil: [
          { id: '1', ad: 'Test', soyad: 'Müstahsil 1', mustahsilNo: 'M001', sehir: 'İzmir' },
          { id: '2', ad: 'Test', soyad: 'Müstahsil 2', mustahsilNo: 'M002', sehir: 'Bursa' }
        ],
        ureticiler: [
          { id: '1', ad: 'Test', soyad: 'Üretici 1', komisyoncuId: '1', sehir: 'İzmir' },
          { id: '2', ad: 'Test', soyad: 'Üretici 2', komisyoncuId: '1', sehir: 'İzmir' }
        ],
        urunler: [
          { id: '1', ad: 'Test Ürün 1', kategori: 'Sebze', stokKodu: 'TU001' },
          { id: '2', ad: 'Test Ürün 2', kategori: 'Meyve', stokKodu: 'TU002' }
        ]
      }
      
      // Test verilerini set et
      setOzelFirmalar(testData.ozelFirmalar)
      setKomisyoncular(testData.komisyoncular)
      setMustahsil(testData.mustahsil)
      setUreticiler(testData.ureticiler)
      setUrunler(testData.urunler)
      
      console.log('✅ Test verileri yüklendi:', {
        ozelFirmalar: testData.ozelFirmalar.length,
        komisyoncular: testData.komisyoncular.length,
        mustahsil: testData.mustahsil.length,
        ureticiler: testData.ureticiler.length,
        urunler: testData.urunler.length
      })
      
      // Gerçek API çağrıları (opsiyonel)
      try {
        const [ozelFirmalarRes, komisyoncularRes, mustahsilRes, ureticilerRes, urunlerRes] = await Promise.all([
          fetch('/api/ozel-firmalar'),
          fetch('/api/komisyoncular'),
          fetch('/api/mustahsil'),
          fetch('/api/ureticiler'),
          fetch('/api/urunler')
        ])

        console.log('📊 API yanıtları:', {
          ozelFirmalar: ozelFirmalarRes.status,
          komisyoncular: komisyoncularRes.status,
          mustahsil: mustahsilRes.status,
          ureticiler: ureticilerRes.status,
          urunler: urunlerRes.status
        })

        if (ozelFirmalarRes.ok) {
          const ozelFirmalarData = await ozelFirmalarRes.json()
          if (ozelFirmalarData.length > 0) {
            setOzelFirmalar(ozelFirmalarData)
            console.log('🏢 Gerçek özel firmalar yüklendi:', ozelFirmalarData.length)
          }
        }
        
        if (komisyoncularRes.ok) {
          const komisyoncularData = await komisyoncularRes.json()
          if (komisyoncularData.length > 0) {
            setKomisyoncular(komisyoncularData)
            console.log('🏪 Gerçek komisyoncular yüklendi:', komisyoncularData.length)
          }
        }
        
        if (mustahsilRes.ok) {
          const mustahsilData = await mustahsilRes.json()
          if (mustahsilData.length > 0) {
            setMustahsil(mustahsilData)
            console.log('👨‍🌾 Gerçek müstahsil yüklendi:', mustahsilData.length)
          }
        }
        
        if (ureticilerRes.ok) {
          const ureticilerData = await ureticilerRes.json()
          if (ureticilerData.length > 0) {
            setUreticiler(ureticilerData)
            console.log('👨‍🌾 Gerçek üreticiler yüklendi:', ureticilerData.length)
          }
        }
        
        if (urunlerRes.ok) {
          const urunlerData = await urunlerRes.json()
          if (urunlerData.length > 0) {
            setUrunler(urunlerData)
            console.log('📦 Gerçek ürünler yüklendi:', urunlerData.length)
          }
        }
      } catch (apiError) {
        console.log('⚠️ API çağrıları başarısız, test verileri kullanılıyor')
      }
    } catch (error) {
      console.error('❌ Veri getirme hatası:', error)
    }
  }

  // Mevcut kayıtları yükle
  const loadExistingRecords = async () => {
    try {
      const response = await fetch('/api/mal-kabul')
      if (response.ok) {
        const data = await response.json()
        setExistingRecords(data)
        console.log('✅ Mevcut kayıtlar yüklendi:', data.length)
      }
    } catch (error) {
      console.error('❌ Mevcut kayıtlar yüklenemedi:', error)
    }
  }



  if (status === 'loading') {
    return <div className="flex items-center justify-center h-screen">Yükleniyor...</div>
  }

  if (status === 'unauthenticated') {
    router.push('/login')
    return null
  }

  const addRow = () => {
    const newRow: MalKabulRow = {
      id: Date.now().toString(),
      saticiTipi: '',
      komisyoncuId: '',
      ureticiId: '',
      mustahsilId: '',
      ozelFirmaId: '',
      urunId: '',
      kasaSayisi: '',
      brutKg: '',
      daraKg: '',
      girisKg: '',
      fireKg: '',
      cikmaKg: '',
      netKg: '',
      notlar: '',
      urunDurumu: 'BEKLEMEDE',
      fisYazdirildi: false,
      status: 'NEW'
    }
    setRows([...rows, newRow])
  }

  const removeRow = (rowId: string) => {
    if (rows.length > 1) {
      setRows(rows.filter(row => row.id !== rowId))
    }
  }

  const updateCell = (rowId: string, field: keyof MalKabulRow, value: any) => {
    console.log('🔄 updateCell çağrıldı:', { rowId, field, value, currentRows: rows.length })
    
    setRows(prevRows => {
      const newRows = prevRows.map(row => {
        if (row.id === rowId) {
          const updatedRow = { ...row, [field]: value }
          console.log('✅ Satır güncellendi:', { rowId, field, oldValue: row[field], newValue: value })
          
          // Otomatik hesaplama
          if (field === 'brutKg' || field === 'daraKg') {
            const brutKg = parseFloat(updatedRow.brutKg) || 0
            const daraKg = parseFloat(updatedRow.daraKg) || 0
            updatedRow.girisKg = (brutKg - daraKg).toFixed(2)
            console.log('🧮 Giriş KG hesaplandı:', updatedRow.girisKg)
          }
          
          // Fire KG hesaplama (varsayılan %2)
          if (field === 'girisKg') {
            const girisKg = parseFloat(updatedRow.girisKg) || 0
            updatedRow.fireKg = (girisKg * 0.02).toFixed(2)
            console.log('🔥 Fire KG hesaplandı:', updatedRow.fireKg)
          }
          
          // Çıkma KG girildiğinde ürün durumunu kontrol et
          if (field === 'cikmaKg') {
            const cikmaKg = parseFloat(updatedRow.cikmaKg) || 0
            if (cikmaKg > 0 && updatedRow.urunDurumu === 'BEKLEMEDE') {
              // Çıkma KG girildi, Netlendi seçilebilir hale geldi
              console.log('✅ Çıkma KG girildi, Netlendi seçilebilir')
            }
          }
          
          // Net KG hesaplama: Çıkma KG + Fire KG - Giriş KG
          if (field === 'cikmaKg' || field === 'fireKg' || field === 'girisKg') {
            const cikmaKg = parseFloat(updatedRow.cikmaKg) || 0
            const fireKg = parseFloat(updatedRow.fireKg) || 0
            const girisKg = parseFloat(updatedRow.girisKg) || 0
            
            const netKg = cikmaKg + fireKg - girisKg
            updatedRow.netKg = netKg.toFixed(2)
            console.log('🧮 Net KG hesaplandı:', updatedRow.netKg, '(Çıkma:', cikmaKg, '+ Fire:', fireKg, '- Giriş:', girisKg, ')')
          }
          
          return updatedRow
        }
        return row
      })
      
      console.log('📊 Yeni rows state:', newRows)
      return newRows
    })
  }

  const handleSaticiTipiChange = (rowId: string, value: string) => {
    console.log('🔄 Satıcı tipi değişti:', { rowId, value })
    updateCell(rowId, 'saticiTipi', value)
    // Diğer alanları sıfırla
    updateCell(rowId, 'komisyoncuId', '')
    updateCell(rowId, 'ureticiId', '')
    updateCell(rowId, 'mustahsilId', '')
    updateCell(rowId, 'ozelFirmaId', '')
    console.log('✅ Satıcı tipi güncellendi ve diğer alanlar sıfırlandı')
  }

  const handleKomisyoncuChange = (rowId: string, value: string) => {
    updateCell(rowId, 'komisyoncuId', value)
    updateCell(rowId, 'ureticiId', '')
  }

  const toggleFisYazdirildi = (rowId: string) => {
    setRows(rows.map(row => 
      row.id === rowId 
        ? { ...row, fisYazdirildi: !row.fisYazdirildi }
        : row
    ))
  }

  const saveAllRows = async () => {
    setLoading(true)
    
    // Netlendi olan satırlarda çıkma KG kontrolü
    const netlendiRows = rows.filter(row => row.urunDurumu === 'NETLENDI')
    const invalidNetlendiRows = netlendiRows.filter(row => !row.cikmaKg || parseFloat(row.cikmaKg) <= 0)
    
    if (invalidNetlendiRows.length > 0) {
      toast({
        title: "Hata",
        description: `${invalidNetlendiRows.length} satırda Netlendi seçilmiş ama Çıkma KG girilmemiş`,
        variant: "destructive",
      })
      setLoading(false)
      return
    }
    
    const validRows = rows.filter(row => 
      row.saticiTipi && row.urunId && row.kasaSayisi && row.brutKg
    )

    if (validRows.length === 0) {
      toast({
        title: "Hata",
        description: "Kaydedilecek geçerli satır bulunamadı",
        variant: "destructive",
      })
      setLoading(false)
      return
    }

    try {
      for (const row of validRows) {
        updateCell(row.id, 'status', 'LOADING')
        
        try {
          // Veritabanına kaydet
          const response = await fetch('/api/mal-kabul', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              saticiTipi: row.saticiTipi,
              komisyoncuId: row.saticiTipi === 'KOMISYONCU' ? row.komisyoncuId : null,
              ureticiId: row.saticiTipi === 'KOMISYONCU' ? row.ureticiId : null,
              mustahsilId: row.saticiTipi === 'MUSTAHSIL' ? row.mustahsilId : null,
              ozelFirmaId: row.saticiTipi === 'OZEL_FIRMA' ? row.ozelFirmaId : null,
              urunId: row.urunId,
              paletId: null,
              ambalajId: null,
              paletSayisi: '0',
              kasaSayisi: row.kasaSayisi,
              brutKg: row.brutKg,
              daraKg: row.daraKg,
              girisKg: row.girisKg,
              cikmaFireKg: row.fireKg,
              netKg: row.netKg,
              notlar: row.notlar
            }),
          })

          if (response.ok) {
            const result = await response.json()
            
            // Fiş verilerini hazırla
            const receiptData = {
              fisNo: result.malKabulRecord.fisNo,
              tarih: result.malKabulRecord.tarih,
              saticiTipi: result.malKabulRecord.saticiTipi,
              saticiAdi: getSaticiAdi(row),
              urunAdi: urunler.find(u => u.id === row.urunId)?.ad || '',
              brutKg: parseFloat(row.brutKg) || 0,
              daraKg: parseFloat(row.daraKg) || 0,
              girisKg: parseFloat(row.girisKg) || 0,
              cikmaFireKg: parseFloat(row.fireKg) || 0,
              netKg: parseFloat(row.netKg) || 0,
              ambalajAdi: 'Kasa',
              kasaSayisi: parseInt(row.kasaSayisi) || 0,
              paletAdi: null,
              paletSayisi: 0,
              notlar: row.notlar,
              malKabulcuAdi: session?.user?.name || ''
            }
            
            // Fiş yazdırma modal'ını göster
            setReceiptData(receiptData)
            setShowReceipt(true)
            
            updateCell(row.id, 'status', 'SAVED')
            updateCell(row.id, 'fisNo', result.malKabulRecord.fisNo)
            updateCell(row.id, 'tarih', result.malKabulRecord.tarih)
            
            toast({
              title: "Başarılı",
              description: `Satır ${row.id} başarıyla kaydedildi ve fiş yazdırılıyor`,
              variant: "default",
            })
          } else {
            updateCell(row.id, 'status', 'ERROR')
            toast({
              title: "Hata",
              description: `Satır ${row.id} kaydedilemedi`,
              variant: "destructive",
            })
          }
        } catch (error) {
          console.error(`Satır ${row.id} kayıt hatası:`, error)
          updateCell(row.id, 'status', 'ERROR')
        }
      }

      // Mevcut kayıtları güncelle
      await loadExistingRecords()
      
    } catch (error) {
      console.error('Toplu kayıt hatası:', error)
      toast({
        title: "Hata",
        description: "Kayıt sırasında hata oluştu",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const getSaticiAdi = (row: MalKabulRow) => {
    if (row.saticiTipi === 'OZEL_FIRMA') {
      const firma = ozelFirmalar.find(f => f.id === row.ozelFirmaId)
      return firma ? firma.firmaAdi : ''
    } else if (row.saticiTipi === 'KOMISYONCU') {
      const komisyoncu = komisyoncular.find(k => k.id === row.komisyoncuId)
      return komisyoncu ? komisyoncu.dukkanAdi : ''
    } else if (row.saticiTipi === 'MUSTAHSIL') {
      const mustahsilData = mustahsil.find(m => m.id === row.mustahsilId)
      return mustahsilData ? `${mustahsilData.ad} ${mustahsilData.soyad}` : ''
    }
    return ''
  }

  // QR kod ve barkod oluşturma
  const generateQRCode = (data: any) => {
    const qrValue = `${data.fisNo}|${data.tarih}|${data.saticiTipi}|${data.urunAdi}|${data.netKg}`
    return qrValue
  }

  const generateBarcode = (data: any) => {
    return data.fisNo || '0000000000'
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'SAVED': return <CheckCircle className="h-4 w-4 text-green-500" />
      case 'ERROR': return <XCircle className="h-4 w-4 text-red-500" />
      case 'LOADING': return <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
      default: return null
    }
  }

  const getUrunDurumuIcon = (durum: string) => {
    switch (durum) {
      case 'BEKLEMEDE': return <Clock className="h-4 w-4 text-yellow-500" />
      case 'NETLENDI': return <CheckCircle className="h-4 w-4 text-green-500" />
      case 'IPTAL': return <XCircle className="h-4 w-4 text-red-500" />
      default: return <Clock className="h-4 w-4 text-gray-400" />
    }
  }

  const getUrunDurumuColor = (durum: string) => {
    switch (durum) {
      case 'BEKLEMEDE': return 'bg-yellow-50 text-yellow-700 border-yellow-200'
      case 'NETLENDI': return 'bg-green-50 text-green-700 border-green-200'
      case 'IPTAL': return 'bg-red-50 text-red-700 border-red-200'
      default: return 'bg-gray-50 text-gray-700 border-gray-200'
    }
  }

  const getColumnTitle = (saticiTipi: string) => {
    switch (saticiTipi) {
      case 'KOMISYONCU': return 'Komisyoncu'
      case 'MUSTAHSIL': return 'Müstahsil'
      case 'OZEL_FIRMA': return 'Özel Firma'
      default: return 'Seçim'
    }
  }

  const getColumnOptions = (saticiTipi: string) => {
    console.log('🔍 getColumnOptions çağrıldı:', { 
      saticiTipi, 
      komisyoncular: komisyoncular.length, 
      mustahsil: mustahsil.length, 
      ozelFirmalar: ozelFirmalar.length 
    })
    
    switch (saticiTipi) {
      case 'KOMISYONCU':
        console.log('🏪 Komisyoncu seçenekleri:', komisyoncular)
        return komisyoncular.map(k => (
          <SelectItem key={k.id} value={k.id}>
            {k.dukkanAdi} - {k.sehir}
          </SelectItem>
        ))
      case 'MUSTAHSIL':
        console.log('👨‍🌾 Müstahsil seçenekleri:', mustahsil)
        console.log('👨‍🌾 Müstahsil verisi:', mustahsil)
        if (mustahsil.length === 0) {
          console.log('⚠️ Müstahsil verisi boş!')
        }
        return mustahsil.map(m => (
          <SelectItem key={m.id} value={m.id}>
            {m.ad} {m.soyad} - {m.mustahsilNo}
          </SelectItem>
        ))
      case 'OZEL_FIRMA':
        console.log('🏢 Özel firma seçenekleri:', ozelFirmalar)
        return ozelFirmalar.map(f => (
          <SelectItem key={f.id} value={f.id}>
            {f.firmaAdi} - {f.sehir}
          </SelectItem>
        ))
      default:
        console.log('❓ Bilinmeyen satıcı tipi:', saticiTipi)
        return []
    }
  }



  const handleGlobalSuggestionClick = (suggestion: any) => {
    if (!selectedRowId) {
      toast({
        title: "Hata",
        description: "Lütfen önce bir satır seçin",
        variant: "destructive",
      })
      return
    }

    const row = rows.find(r => r.id === selectedRowId)
    if (!row) return

    switch (suggestion.type) {
      case 'KOMISYONCU':
        if (row.saticiTipi === 'KOMISYONCU') {
          updateCell(selectedRowId, 'komisyoncuId', suggestion.id)
          toast({
            title: "Komisyoncu Seçildi",
            description: `${suggestion.title} - ${suggestion.description}`,
          })
        } else {
          toast({
            title: "Hata",
            description: "Bu satırda komisyoncu seçilemez",
            variant: "destructive",
          })
        }
        break
      case 'URUN':
        updateCell(selectedRowId, 'urunId', suggestion.id)
        toast({
          title: "Ürün Seçildi",
          description: `${suggestion.title} - ${suggestion.description}`,
        })
        break
      case 'OZEL_FIRMA':
        if (row.saticiTipi === 'OZEL_FIRMA') {
          updateCell(selectedRowId, 'ozelFirmaId', suggestion.id)
          toast({
            title: "Özel Firma Seçildi",
            description: `${suggestion.title} - ${suggestion.description}`,
          })
        }
        break
      case 'MUSTAHSIL':
        if (row.saticiTipi === 'MUSTAHSIL') {
          updateCell(selectedRowId, 'mustahsilId', suggestion.id)
          toast({
            title: "Müstahsil Seçildi",
            description: `${suggestion.title} - ${suggestion.description}`,
          })
        } else {
          toast({
            title: "Hata",
            description: "Bu satırda müstahsil seçilemez",
            variant: "destructive",
          })
        }
        break
    }

    setGlobalInput('')
    setShowGlobalSuggestions(false)
    setGlobalSuggestions([])
  }

  // Excel tarzı filtreleme ve sıralama
  const handleSort = (column: keyof MalKabulRow) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortColumn(column)
      setSortDirection('asc')
    }
  }

  const getSortedRows = () => {
    if (!sortColumn) return rows

    return [...rows].sort((a, b) => {
      const aVal = a[sortColumn] || ''
      const bVal = b[sortColumn] || ''
      
      if (aVal < bVal) return sortDirection === 'asc' ? -1 : 1
      if (aVal > bVal) return sortDirection === 'asc' ? 1 : -1
      return 0
    })
  }

  const getFilteredRows = () => {
    let filtered = getSortedRows()
    
    // Genel filtre
    if (filterText) {
      filtered = filtered.filter(row => 
        Object.values(row).some(value => 
          String(value).toLowerCase().includes(filterText.toLowerCase())
        )
      )
    }
    
    // Sütun filtreleri
    Object.entries(columnFilters).forEach(([column, filterValue]) => {
      if (filterValue) {
        filtered = filtered.filter(row => 
          String(row[column as keyof MalKabulRow]).toLowerCase().includes(filterValue.toLowerCase())
        )
      }
    })
    
    return filtered
  }

  const clearFilters = () => {
    setFilterText('')
    setColumnFilters({})
    setSortColumn(null)
    setSortDirection('asc')
  }

  // Global suggestions işleme
  useEffect(() => {
    if (!globalInput.trim()) {
      setGlobalSuggestions([])
      return
    }

    const suggestions: any[] = []
    const searchTerm = globalInput.toLowerCase()

    // Komisyoncu arama
    komisyoncular.forEach(k => {
      if (k.dukkanAdi.toLowerCase().includes(searchTerm) || k.komisyonKodu.toLowerCase().includes(searchTerm)) {
        suggestions.push({
          type: 'KOMISYONCU',
          id: k.id,
          title: k.dukkanAdi,
          subtitle: k.komisyonKodu,
          description: k.sehir
        })
      }
    })

    // Ürün arama
    urunler.forEach(u => {
      if (u.ad.toLowerCase().includes(searchTerm) || u.stokKodu.toLowerCase().includes(searchTerm)) {
        suggestions.push({
          type: 'URUN',
          id: u.id,
          title: u.ad,
          subtitle: u.stokKodu,
          description: u.kategori
        })
      }
    })

    // Özel firma arama
    ozelFirmalar.forEach(f => {
      if (f.firmaAdi.toLowerCase().includes(searchTerm) || f.firmaNo.toLowerCase().includes(searchTerm)) {
        suggestions.push({
          type: 'OZEL_FIRMA',
          id: f.id,
          title: f.firmaAdi,
          subtitle: f.firmaNo,
          description: f.sehir
        })
      }
    })

    // Müstahsil arama
    mustahsil.forEach(m => {
      if (m.mustahsilNo.toLowerCase().includes(searchTerm) || m.ad.toLowerCase().includes(searchTerm)) {
        suggestions.push({
          type: 'MUSTAHSIL',
          id: m.id,
          title: m.ad + ' ' + m.soyad,
          subtitle: m.mustahsilNo,
          description: m.sehir
        })
      }
    })

    setGlobalSuggestions(suggestions.slice(0, 8))
  }, [globalInput, komisyoncular, mustahsil, urunler, ozelFirmalar])

  // Global keyboard listener
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      // Eğer herhangi bir input aktifse, global listener'ı devre dışı bırak
      if (document.activeElement?.tagName === 'INPUT' || document.activeElement?.tagName === 'TEXTAREA' || document.activeElement?.tagName === 'SELECT') {
        return
      }

      // Sadece sayı ve harf tuşlarına tepki ver (Türkçe karakterler dahil)
      if (e.key.length === 1 && /[a-zA-Z0-9üÜğĞşŞıİöÖçÇ]/.test(e.key)) {
        setGlobalInput(prev => {
          const newInput = prev + e.key
          console.log('🔍 Global Input:', newInput)
          return newInput
        })
        setShowGlobalSuggestions(true)
        
        // 5 saniye sonra input'u temizle
        setTimeout(() => {
          setGlobalInput('')
          setShowGlobalSuggestions(false)
          setGlobalSuggestions([])
        }, 5000)
      }
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      // Backspace ile son karakteri sil
      if (e.key === 'Backspace' && !document.activeElement?.tagName) {
        setGlobalInput(prev => prev.slice(0, -1))
      }
      
      // Ctrl+S ve Ctrl+N kısayolları
      if (e.ctrlKey && e.key === 's') {
        e.preventDefault()
        saveAllRows()
      }
      
      if (e.ctrlKey && e.key === 'n') {
        e.preventDefault()
        addRow()
      }
    }

    window.addEventListener('keypress', handleKeyPress)
    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('keypress', handleKeyPress)
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [rows, addRow, saveAllRows])



  return (
    <div className="p-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-3">
          <Link href="/dashboard/mal-kabul/yeni">
            <Button variant="outline" size="sm">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Geri
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-foreground">Excel Tarzı Mal Kabul Test</h1>
            <p className="text-sm text-muted-foreground">Dropdown seçimli hızlı veri girişi tablosu</p>
          </div>
        </div>
        
        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <Button onClick={addRow} variant="outline" size="sm" title="Ctrl+N">
            <Plus className="mr-2 h-4 w-4" />
            Yeni Satır
          </Button>
          <Button onClick={saveAllRows} disabled={loading} size="sm" title="Ctrl+S">
            {loading ? <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" /> : <Save className="mr-2 h-4 w-4" />}
            Kaydet
          </Button>
          <Button 
            onClick={() => setShowFilters(!showFilters)}
            variant="outline"
            size="sm"
            title="Filtreleri göster/gizle"
          >
            🔍 Filtreler
          </Button>
          <Button 
            onClick={loadExistingRecords}
            variant="outline"
            size="sm"
            title="Mevcut kayıtları yükle"
          >
            📊 Mevcut Kayıtlar
          </Button>
          <Button 
            onClick={() => {
              if (!selectedRowId) {
                toast({
                  title: "Hata",
                  description: "Lütfen aktarılacak satırı seçin",
                  variant: "destructive",
                })
                return
              }
              
              const selectedRow = rows.find(row => row.id === selectedRowId)
              if (selectedRow && selectedRow.saticiTipi && selectedRow.urunId && selectedRow.kasaSayisi && selectedRow.brutKg) {
                // Netlendi kontrolü
                if (selectedRow.urunDurumu === 'NETLENDI' && (!selectedRow.cikmaKg || parseFloat(selectedRow.cikmaKg) <= 0)) {
                  toast({
                    title: "Hata",
                    description: "Netlendi satırında Çıkma KG girilmesi gerekli",
                    variant: "destructive",
                  })
                  return
                }
                
                // LocalStorage'a veri kaydet
                localStorage.setItem('excelToMainData', JSON.stringify(selectedRow))
                // Ana sayfaya yönlendir
                window.location.href = '/dashboard/mal-kabul/yeni'
              } else {
                toast({
                  title: "Hata",
                  description: "Seçili satırda eksik veri var",
                  variant: "destructive",
                })
              }
            }}
            variant="default"
            size="sm"
            disabled={!selectedRowId}
            title="Seçili veriyi ana mal kabul sayfasına aktar"
          >
            📤 Ana Sayfaya Aktar
          </Button>
        </div>
      </div>

      {/* Excel Tarzı Tablo */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-lg">
            <FileSpreadsheet className="h-5 w-5" />
            Mal Kabul Hızlı Giriş Tablosu
          </CardTitle>
          <CardDescription className="text-sm">
            Dropdown seçimleri, otomatik hesaplama, durum takibi, Excel tarzı filtreleme
          </CardDescription>
          
          {/* Debug Panel */}
          <div className="text-xs text-gray-600 space-y-1">
            <div>📊 Veri Durumu:</div>
            <div>• Özel Firmalar: {ozelFirmalar.length} | Komisyoncular: {komisyoncular.length}</div>
            <div>• Müstahsil: {mustahsil.length} | Üreticiler: {ureticiler.length}</div>
            <div>• Ürünler: {urunler.length} | Seçili Satır: {selectedRowId || 'Yok'}</div>
            <div>• Global Input: {globalInput || 'Boş'}</div>
            <div>💡 Dropdown seçimleri aktif - Excel tarzı tek satır girişi!</div>
          </div>
        </CardHeader>
        
        {/* Filtreleme Paneli */}
        {showFilters && (
          <div className="px-6 py-3 bg-gray-50 border-b border-gray-200">
            <div className="flex items-center gap-4 mb-3">
              <div className="flex items-center gap-2">
                <Label className="text-sm font-medium">Genel Filtre:</Label>
                <Input
                  value={filterText}
                  onChange={(e) => setFilterText(e.target.value)}
                  placeholder="Tüm alanlarda ara..."
                  className="w-64 h-8 text-sm"
                />
              </div>
              <Button onClick={clearFilters} variant="outline" size="sm">
                Filtreleri Temizle
              </Button>
            </div>
            
            <div className="grid grid-cols-4 gap-4">
              <div>
                <Label className="text-xs font-medium">Satıcı Tipi</Label>
                <Input
                  value={columnFilters.saticiTipi || ''}
                  onChange={(e) => setColumnFilters(prev => ({ ...prev, saticiTipi: e.target.value }))}
                  placeholder="Filtrele..."
                  className="h-7 text-xs"
                />
              </div>
              <div>
                <Label className="text-xs font-medium">Ürün</Label>
                <Input
                  value={columnFilters.urunId || ''}
                  onChange={(e) => setColumnFilters(prev => ({ ...prev, urunId: e.target.value }))}
                  placeholder="Filtrele..."
                  className="h-7 text-xs"
                />
              </div>
              <div>
                <Label className="text-xs font-medium">Durum</Label>
                <Input
                  value={columnFilters.urunDurumu || ''}
                  onChange={(e) => setColumnFilters(prev => ({ ...prev, urunDurumu: e.target.value }))}
                  placeholder="Filtrele..."
                  className="h-7 text-xs"
                />
              </div>
              <div>
                <Label className="text-xs font-medium">Fiş No</Label>
                <Input
                  value={columnFilters.fisNo || ''}
                  onChange={(e) => setColumnFilters(prev => ({ ...prev, fisNo: e.target.value }))}
                  placeholder="Filtrele..."
                  className="h-7 text-xs"
                />
              </div>
            </div>
          </div>
        )}
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300 text-xs">
              {/* Tablo Başlığı */}
              <thead>
                <tr className="bg-gray-50">
                  <th className="border border-gray-300 px-2 py-2 text-center font-medium text-gray-700 w-16">
                    Seç
                  </th>
                  <th 
                    className="border border-gray-300 px-2 py-2 text-left font-medium text-gray-700 w-28 cursor-pointer hover:bg-gray-100"
                    onClick={() => handleSort('saticiTipi')}
                  >
                    Satıcı Tipi {sortColumn === 'saticiTipi' && (sortDirection === 'asc' ? '↑' : '↓')}
                  </th>
                  <th className="border border-gray-300 px-2 py-2 text-left font-medium text-gray-700 w-36">
                    Seçim
                  </th>
                  <th className={`border border-gray-300 px-2 py-2 text-left font-medium text-gray-700 w-36 ${rows.some(row => row.saticiTipi === 'KOMISYONCU') ? '' : 'hidden'}`}>
                    Üretici
                  </th>
                  <th 
                    className="border border-gray-300 px-2 py-2 text-left font-medium text-gray-700 w-32 cursor-pointer hover:bg-gray-100"
                    onClick={() => handleSort('urunId')}
                  >
                    Ürün {sortColumn === 'urunId' && (sortDirection === 'asc' ? '↑' : '↓')}
                  </th>
                  <th 
                    className="border border-gray-300 px-2 py-2 text-left font-medium text-gray-700 w-20 cursor-pointer hover:bg-gray-100"
                    onClick={() => handleSort('kasaSayisi')}
                  >
                    Kasa {sortColumn === 'kasaSayisi' && (sortDirection === 'asc' ? '↑' : '↓')}
                  </th>
                  <th 
                    className="border border-gray-300 px-2 py-2 text-left font-medium text-gray-700 w-20 cursor-pointer hover:bg-gray-100"
                    onClick={() => handleSort('brutKg')}
                  >
                    Brüt KG {sortColumn === 'brutKg' && (sortDirection === 'asc' ? '↑' : '↓')}
                  </th>
                  <th 
                    className="border border-gray-300 px-2 py-2 text-left font-medium text-gray-700 w-20 cursor-pointer hover:bg-gray-100"
                    onClick={() => handleSort('daraKg')}
                  >
                    Dara KG {sortDirection === 'asc' ? '↑' : '↓'}
                  </th>
                  <th 
                    className="border border-gray-300 px-2 py-2 text-left font-medium text-gray-700 w-20 cursor-pointer hover:bg-gray-100"
                    onClick={() => handleSort('girisKg')}
                  >
                    Giriş KG {sortColumn === 'girisKg' && (sortDirection === 'asc' ? '↑' : '↓')}
                  </th>
                  <th 
                    className="border border-gray-300 px-2 py-2 text-left font-medium text-gray-700 w-20 cursor-pointer hover:bg-gray-100"
                    onClick={() => handleSort('fireKg')}
                  >
                    Fire KG {sortColumn === 'fireKg' && (sortDirection === 'asc' ? '↑' : '↓')}
                  </th>
                  <th 
                    className="border border-gray-300 px-2 py-2 text-left font-medium text-gray-700 w-20 cursor-pointer hover:bg-gray-100"
                    onClick={() => handleSort('cikmaKg')}
                  >
                    Çıkma KG {sortColumn === 'cikmaKg' && (sortDirection === 'asc' ? '↑' : '↓')}
                  </th>
                  <th 
                    className="border border-gray-300 px-2 py-2 text-left font-medium text-gray-700 w-20 cursor-pointer hover:bg-gray-100"
                    onClick={() => handleSort('netKg')}
                  >
                    Net KG {sortColumn === 'netKg' && (sortDirection === 'asc' ? '↑' : '↓')}
                  </th>
                  <th 
                    className="border border-gray-300 px-2 py-2 text-left font-medium text-gray-700 w-24 cursor-pointer hover:bg-gray-100"
                    onClick={() => handleSort('urunDurumu')}
                  >
                    Ürün Durumu {sortColumn === 'urunDurumu' && (sortDirection === 'asc' ? '↑' : '↓')}
                  </th>
                  <th className="border border-gray-300 px-2 py-2 text-left font-medium text-gray-700 w-20">
                    Fiş
                  </th>
                  <th className="border border-gray-300 px-2 py-2 text-left font-medium text-gray-700 w-16">
                    Durum
                  </th>
                  <th className="border border-gray-300 px-2 py-2 text-left font-medium text-gray-700 w-16">
                    İşlem
                  </th>
                </tr>
              </thead>
              
              {/* Tablo Gövdesi */}
              <tbody>
                {getFilteredRows().map((row) => (
                  <tr key={row.id} className={`hover:bg-gray-50 ${selectedRowId === row.id ? 'bg-blue-50 border-blue-300' : ''}`}>
                    {/* Seçim */}
                    <td className="border border-gray-300 px-1 py-1 text-center">
                      <input
                        type="radio"
                        name="selectedRow"
                        checked={selectedRowId === row.id}
                        onChange={() => setSelectedRowId(row.id)}
                        className="w-4 h-4 text-blue-600"
                      />
                    </td>
                    {/* Satıcı Tipi */}
                    <td className="border border-gray-300 px-1 py-1">
                      <Select
                        value={row.saticiTipi}
                        onValueChange={(value) => handleSaticiTipiChange(row.id, value)}
                      >
                        <SelectTrigger className="h-7 text-xs border-0 p-1">
                          <SelectValue placeholder="Seç" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="OZEL_FIRMA">Özel Firma</SelectItem>
                          <SelectItem value="MUSTAHSIL">Müstahsil</SelectItem>
                          <SelectItem value="KOMISYONCU">Komisyoncu</SelectItem>
                        </SelectContent>
                      </Select>
                    </td>

                    {/* Dinamik 2. Sütun */}
                    <td className="border border-gray-300 px-1 py-1">
                      <Select
                        value={row.komisyoncuId || row.mustahsilId || row.ozelFirmaId}
                        onValueChange={(value) => {
                          if (row.saticiTipi === 'KOMISYONCU') {
                            handleKomisyoncuChange(row.id, value)
                          } else if (row.saticiTipi === 'MUSTAHSIL') {
                            updateCell(row.id, 'mustahsilId', value)
                          } else if (row.saticiTipi === 'OZEL_FIRMA') {
                            updateCell(row.id, 'ozelFirmaId', value)
                          }
                        }}
                        disabled={!row.saticiTipi}
                      >
                        <SelectTrigger className="h-7 text-xs border-0 p-1">
                          <SelectValue placeholder={getColumnTitle(row.saticiTipi)} />
                        </SelectTrigger>
                        <SelectContent>
                          {getColumnOptions(row.saticiTipi)}
                        </SelectContent>
                      </Select>
                    </td>

                    {/* Üretici (Sadece Komisyoncu için) */}
                    <td className={`border border-gray-300 px-1 py-1 ${row.saticiTipi === 'KOMISYONCU' ? '' : 'hidden'}`}>
                      <Select
                        value={row.ureticiId}
                        onValueChange={(value) => updateCell(row.id, 'ureticiId', value)}
                        disabled={!row.komisyoncuId || row.saticiTipi !== 'KOMISYONCU'}
                      >
                        <SelectTrigger className="h-7 text-xs border-0 p-1">
                          <SelectValue placeholder="Üretici" />
                        </SelectTrigger>
                        <SelectContent>
                          {ureticiler
                            .filter(u => u.komisyoncuId === row.komisyoncuId)
                            .map((u) => (
                              <SelectItem key={u.id} value={u.id}>
                                {u.ad} {u.soyad}
                              </SelectItem>
                            ))}
                        </SelectContent>
                      </Select>
                    </td>

                    {/* Ürün */}
                    <td className="border border-gray-300 px-1 py-1">
                      <Select
                        value={row.urunId}
                        onValueChange={(value) => updateCell(row.id, 'urunId', value)}
                      >
                        <SelectTrigger className="h-7 text-xs border-0 p-1">
                          <SelectValue placeholder="Ürün" />
                        </SelectTrigger>
                        <SelectContent>
                          {urunler.map((u) => (
                            <SelectItem key={u.id} value={u.id}>
                              {u.ad}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </td>

                    {/* Kasa Sayısı */}
                    <td className="border border-gray-300 px-1 py-1">
                      <Input
                        type="number"
                        value={row.kasaSayisi}
                        onChange={(e) => updateCell(row.id, 'kasaSayisi', e.target.value)}
                        className="h-7 text-xs border-0 p-1"
                        placeholder="0"
                      />
                    </td>

                    {/* Brüt KG */}
                    <td className="border border-gray-300 px-1 py-1">
                      <Input
                        type="number"
                        step="0.01"
                        value={row.brutKg}
                        onChange={(e) => updateCell(row.id, 'brutKg', e.target.value)}
                        className="h-7 text-xs border-0 p-1"
                        placeholder="0.00"
                      />
                    </td>

                    {/* Dara KG */}
                    <td className="border border-gray-300 px-1 py-1">
                      <Input
                        type="number"
                        step="0.01"
                        value={row.daraKg}
                        onChange={(e) => updateCell(row.id, 'daraKg', e.target.value)}
                        className="h-7 text-xs border-0 p-1"
                        placeholder="0.00"
                      />
                    </td>

                    {/* Giriş KG */}
                    <td className="border border-gray-300 px-1 py-1">
                      <Input
                        type="number"
                        step="0.01"
                        value={row.girisKg}
                        onChange={(e) => updateCell(row.id, 'girisKg', e.target.value)}
                        className="h-7 text-xs border-0 p-1 bg-gray-50"
                        placeholder="0.00"
                        readOnly
                      />
                    </td>

                    {/* Fire KG */}
                    <td className="border border-gray-300 px-1 py-1">
                      <Input
                        type="number"
                        step="0.01"
                        value={row.fireKg}
                        onChange={(e) => updateCell(row.id, 'fireKg', e.target.value)}
                        className="h-7 text-xs border-0 p-1"
                        placeholder="0.00"
                      />
                    </td>

                    {/* Çıkma KG */}
                    <td className="border border-gray-300 px-1 py-1">
                      <Input
                        type="number"
                        step="0.01"
                        value={row.cikmaKg}
                        onChange={(e) => updateCell(row.id, 'cikmaKg', e.target.value)}
                        className="h-7 text-xs border-0 p-1"
                        placeholder="0.00"
                      />
                    </td>

                    {/* Net KG */}
                    <td className="border border-gray-300 px-1 py-1">
                      <Input
                        type="number"
                        step="0.01"
                        value={row.netKg}
                        onChange={(e) => updateCell(row.id, 'netKg', e.target.value)}
                        className="h-7 text-xs border-0 p-1 bg-gray-50"
                        placeholder="0.00"
                        readOnly
                      />
                    </td>

                    {/* Ürün Durumu */}
                    <td className="border border-gray-300 px-1 py-1">
                      <Select
                        value={row.urunDurumu}
                        onValueChange={(value: 'BEKLEMEDE' | 'NETLENDI' | 'IPTAL') => {
                          if (value === 'NETLENDI' && !row.cikmaKg) {
                            toast({
                              title: "Hata",
                              description: "Netlendi seçmek için önce Çıkma KG girmelisiniz",
                              variant: "destructive",
                            })
                            return
                          }
                          
                          if (value === 'NETLENDI' && !row.fisYazdirildi) {
                            if (confirm('Fiş yazdırılmamış. Fiş yazdırmak istiyor musunuz?')) {
                              toggleFisYazdirildi(row.id)
                            } else {
                              return
                            }
                          }
                          
                          updateCell(row.id, 'urunDurumu', value)
                        }}
                        disabled={row.urunDurumu === 'NETLENDI' && !row.cikmaKg}
                      >
                        <SelectTrigger className={`h-7 text-xs border-0 p-1 ${getUrunDurumuColor(row.urunDurumu)}`}>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="BEKLEMEDE">Beklemede</SelectItem>
                          <SelectItem value="NETLENDI" disabled={!row.cikmaKg}>
                            Netlendi {!row.cikmaKg && '(Çıkma KG gerekli)'}
                          </SelectItem>
                          <SelectItem value="IPTAL">İptal</SelectItem>
                        </SelectContent>
                      </Select>
                    </td>

                    {/* Fiş Yazdırma */}
                    <td className="border border-gray-300 px-1 py-1 text-center">
                      <Button
                        size="sm"
                        variant={row.fisYazdirildi ? "default" : "outline"}
                        onClick={() => toggleFisYazdirildi(row.id)}
                        className={`h-7 w-7 p-0 ${row.fisYazdirildi ? 'bg-green-500 hover:bg-green-600' : ''}`}
                        title={row.fisYazdirildi ? "Fiş yazdırıldı" : "Fiş yazdırılmadı"}
                      >
                        <Printer className="h-4 w-4" />
                      </Button>
                    </td>

                    {/* Durum */}
                    <td className="border border-gray-300 px-1 py-1 text-center">
                      {getStatusIcon(row.status)}
                    </td>

                    {/* İşlem */}
                    <td className="border border-gray-300 px-1 py-1 text-center">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => removeRow(row.id)}
                        disabled={rows.length === 1}
                        className="h-6 w-6 p-0 text-red-500 hover:text-red-700"
                        title="Satırı sil"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Kısayol Bilgileri */}
          <div className="p-3 bg-gray-50 border-t border-gray-200">
            <div className="text-xs font-medium text-gray-700 mb-2">💡 Kısayollar ve Özellikler:</div>
            <div className="text-xs text-gray-600 space-y-1">
              <div>• <strong>Tab</strong> - Sütunlar arası geçiş • <strong>Ctrl+S</strong> - Kaydet • <strong>Ctrl+N</strong> - Yeni satır</div>
              <div>• <strong>Dropdown seçimleri</strong> - Satıcı tipi, ürün ve diğer alanlar dropdown'dan seçilir</div>
              <div>• <strong>Otomatik hesaplama</strong> - Giriş KG = Brüt KG - Dara KG • <strong>Fire KG</strong> - Varsayılan %2</div>
              <div>• <strong>Net KG hesaplama</strong> - Net KG = Çıkma KG + Fire KG - Giriş KG (Fatura için)</div>
              <div>• <strong>Netlendi kontrolü</strong> - Sadece Çıkma KG girildikten sonra seçilebilir</div>
              <div>• <strong>Filtreleme & Sıralama</strong> - Sütun başlıklarına tıklayarak sıralayın, filtreleri kullanın</div>
              <div>• <strong>Veritabanı entegrasyonu</strong> - Kayıtlar direkt veritabanına kaydedilir ve fiş yazdırılır</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Global Suggestions Modal */}
      {showGlobalSuggestions && globalSuggestions.length > 0 && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-96 overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">
                🔍 Global Arama: &quot;{globalInput}&quot;
              </h3>
              <button
                onClick={() => {
                  setShowGlobalSuggestions(false)
                  setGlobalInput('')
                  setGlobalSuggestions([])
                }}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            
            <div className="space-y-2">
              {globalSuggestions.map((suggestion, index) => (
                <div
                  key={index}
                  onClick={() => handleGlobalSuggestionClick(suggestion)}
                  className="p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">{suggestion.title}</div>
                      <div className="text-sm text-gray-600">{suggestion.subtitle}</div>
                      <div className="text-xs text-gray-500">{suggestion.description}</div>
                    </div>
                    <div className="text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-700">
                      {suggestion.type}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-4 text-xs text-gray-500 text-center">
              💡 Önce bir satır seçin, sonra global arama ile hızlı veri girişi yapın
            </div>
          </div>
        </div>
      )}

      {/* Fiş Yazdırma Modal */}
      {showReceipt && receiptData && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">
                🧾 Fiş Yazdırma: {receiptData.fisNo}
              </h3>
              <button
                onClick={() => setShowReceipt(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            
            {/* Fiş Önizleme */}
            <div className="bg-white border-2 border-gray-300 p-6 rounded-lg mb-4 receipt-print">
              <style jsx>{`
                @media print {
                  .receipt-print {
                    border: none !important;
                    padding: 10px !important;
                    margin: 0 !important;
                    max-width: 80mm !important;
                    width: 100% !important;
                  }
                  
                  .receipt-print h2 {
                    font-size: 16px !important;
                    margin-bottom: 8px !important;
                  }
                  
                  .receipt-print .text-sm {
                    font-size: 10px !important;
                  }
                  
                  .receipt-print .grid {
                    gap: 2px !important;
                  }
                  
                  .receipt-print .w-32 {
                    width: 60px !important;
                    height: 60px !important;
                  }
                  
                  .receipt-print .w-40 {
                    width: 80px !important;
                    height: 40px !important;
                  }
                }
              `}</style>
              <div className="text-center mb-4">
                <h2 className="text-xl font-bold">MAL KABUL FİŞİ</h2>
                <div className="text-sm text-gray-600">WebRain SaaS</div>
              </div>
              
              {/* QR Kod ve Barkod */}
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <div className="grid grid-cols-1 gap-1 text-sm">
                    <div className="flex justify-between">
                      <span className="font-medium">Fiş No:</span>
                      <span className="ml-2">{receiptData.fisNo}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Tarih:</span>
                      <span className="ml-2">{receiptData.tarih}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Satıcı:</span>
                      <span className="ml-2">{receiptData.saticiAdi}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Ürün:</span>
                      <span className="ml-2">{receiptData.urunAdi}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col items-center gap-2">
                  {/* QR Kod */}
                  <div className="text-center">
                    <div className="w-32 h-32 bg-white border border-gray-300 rounded flex items-center justify-center">
                      <QRCode 
                        value={generateQRCode(receiptData)}
                        size={120}
                      />
                    </div>
                    <div className="text-xs text-gray-600 mt-1">QR Kod</div>
                  </div>
                  
                  {/* Barkod */}
                  <div className="text-center">
                    <div className="w-40 h-20 bg-white border border-gray-300 rounded flex items-center justify-center">
                      <Barcode 
                        value={generateBarcode(receiptData)}
                        width={200}
                        height={60}
                      />
                    </div>
                    <div className="text-xs text-gray-600 mt-1">Barkod</div>
                  </div>
                </div>
              </div>
              
              {/* KG Bilgileri */}
              <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                <div className="flex justify-between">
                  <span className="font-medium">Brüt KG:</span>
                  <span className="ml-2">{receiptData.brutKg} kg</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Dara KG:</span>
                  <span className="ml-2">{receiptData.daraKg} kg</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Giriş KG:</span>
                  <span className="ml-2">{receiptData.girisKg} kg</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Çıkma KG:</span>
                  <span className="ml-2">{receiptData.cikmaFireKg} kg</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Net KG:</span>
                  <span className="ml-2 font-bold">{receiptData.netKg} kg</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Kasa Sayısı:</span>
                  <span className="ml-2">{receiptData.kasaSayisi} adet</span>
                </div>
              </div>
              
              {/* Alt Bilgiler */}
              <div className="text-center text-xs text-gray-600">
                <div>Mal Kabulcu: {receiptData.malKabulcuAdi}</div>
                <div className="mt-2">Bu fiş bilgisayar tarafından otomatik oluşturulmuştur.</div>
              </div>
            </div>
            
            <div className="flex gap-2">
              <Button 
                onClick={() => {
                  // QR kod ve barkod ile fiş yazdır
                  window.print()
                }}
                className="flex-1"
              >
                🖨️ Fiş Yazdır
              </Button>
              <Button 
                onClick={() => setShowReceipt(false)}
                variant="outline"
              >
                Kapat
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
