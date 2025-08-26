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
  dbId?: string // Gerçek veritabanı ID'si
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
      dbId: undefined, // Başlangıç satırı için dbId yok
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
  const [filterType, setFilterType] = useState<'contains' | 'exact' | 'starts' | 'ends'>('contains')
  
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
      loadExistingRecords() // Mevcut kayıtları da yükle
    }
  }, [status])





  const fetchData = async () => {
    try {

      
      // Gerçek API'lerden veri çek
      const [ozelFirmalarRes, komisyoncularRes, mustahsilRes, ureticilerRes, urunlerRes] = await Promise.all([
        fetch('/api/ozel-firmalar?status=AKTIF'),
        fetch('/api/komisyoncular?status=AKTIF'),
        fetch('/api/mustahsil?status=AKTIF'),
        fetch('/api/ureticiler?status=AKTIF'),
        fetch('/api/urunler?status=AKTIF')
      ])
      
      if (ozelFirmalarRes.ok) {
        const data = await ozelFirmalarRes.json()
        // API array döndürüyor, records field'ı yok
        setOzelFirmalar(Array.isArray(data) ? data : [])

      }
      
      if (komisyoncularRes.ok) {
        const data = await komisyoncularRes.json()
        // API array döndürüyor, records field'ı yok
        setKomisyoncular(Array.isArray(data) ? data : [])

      }
      
      if (mustahsilRes.ok) {
        const data = await mustahsilRes.json()
        // API array döndürüyor, records field'ı yok
        setMustahsil(Array.isArray(data) ? data : [])

      }
      
      if (ureticilerRes.ok) {
        const data = await ureticilerRes.json()
        // API array döndürüyor, records field'ı yok
        setUreticiler(Array.isArray(data) ? data : [])

      }
      
      if (urunlerRes.ok) {
        const data = await urunlerRes.json()
        // API array döndürüyor, records field'ı yok
        setUrunler(Array.isArray(data) ? data : [])

      }
      

    } catch (error) {
      console.error('❌ Veri getirme hatası:', error)
    }
  }

  // Mevcut kayıtları yükle ve tabloya ekle
  const loadExistingRecords = async () => {
    try {
      const response = await fetch('/api/mal-kabul?limit=1000')
      if (response.ok) {
        const data = await response.json()
        const existingRows = data.records || []
        
        const convertedRows = existingRows.map((record: any, index: number) => {
          // Debug: İlk kaydın tüm alanlarını ve değerlerini detaylı logla
          if (index === 0) {
            console.log('🔍 İlk kayıt tüm alanları:', Object.keys(record))
            console.log('🔍 İlk kayıt cikmaKg:', record.cikmaKg)
            console.log('🔍 İlk kayıt cikmaFireKg:', record.cikmaFireKg)
            console.log('🔍 İlk kayıt fireKg:', record.fireKg)
            console.log('🔍 İlk kayıt tüm değerler:', record)
          }
          
          return {
            id: `existing-${record.id}`,
            dbId: record.id, // Gerçek veritabanı ID'si
            fisNo: record.fisNo,
            tarih: record.tarih,
            saticiTipi: record.saticiTipi, // API'den gelen değeri kullan
            komisyoncuId: record.komisyoncuId || '',
            ureticiId: record.ureticId || '',
            mustahsilId: record.mustahsilId || '',
            ozelFirmaId: record.ozelFirmaId || '',
            urunId: record.urunId,
            kasaSayisi: record.kasaSayisi?.toString() || '',
            brutKg: record.brutKg?.toString() || '',
            daraKg: record.daraKg?.toString() || '',
            girisKg: record.girisKg?.toString() || '',
            fireKg: record.cikmaFireKg?.toString() || '',
            cikmaKg: record.cikmaFireKg?.toString() || '0',
            netKg: record.netKg?.toString() || '',
            notlar: record.notlar || '',
            urunDurumu: record.status === 'TAMAMLANDI' ? 'NETLENDI' : 'BEKLEMEDE', // Default Beklemede
            fisYazdirildi: true, // Mevcut kayıtlar zaten yazdırılmış
            status: 'SAVED' as const,
            createdAt: record.createdAt,
            updatedAt: record.updatedAt
          }
        })
        
        // Mevcut kayıtları tabloya ekle
        setRows(prevRows => {
          // Sadece yeni satırları tut, mevcut kayıtları ekle
          const newRows = prevRows.filter(row => !row.id.startsWith('existing-'))
          return [...convertedRows, ...newRows]
        })
        
        setExistingRecords(existingRows)
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
      dbId: undefined, // Yeni satırlar için dbId yok
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
      urunDurumu: 'BEKLEMEDE', // Default olarak Beklemede
      fisYazdirildi: false,
      status: 'NEW'
    }
    setRows([...rows, newRow])
  }

  const removeRow = async (rowId: string) => {
    console.log('removeRow çağrıldı:', rowId)
    console.log('Mevcut satırlar:', rows)
    console.log('Silinecek satır ID:', rowId)
    
    if (rows.length > 1) {
      const rowToDelete = rows.find(row => row.id === rowId)
      
      // Eğer satır veritabanından yüklenmişse (dbId varsa), veritabanından da sil
      if (rowToDelete?.dbId) {
        try {
          console.log('Veritabanından siliniyor:', rowToDelete.dbId)
          
          const response = await fetch(`/api/mal-kabul/${rowToDelete.dbId}`, {
            method: 'DELETE',
          })
          
          if (response.ok) {
            console.log('Veritabanından başarıyla silindi')
            
            // Frontend'den de sil
            const newRows = rows.filter(row => row.id !== rowId)
            setRows(newRows)
            
            toast({
              title: "Kayıt Silindi",
              description: "Satır hem ekrandan hem veritabanından silindi",
              variant: "success",
            })
          } else {
            console.error('Veritabanından silme hatası:', response.status)
            toast({
              title: "Hata",
              description: "Veritabanından silinirken hata oluştu",
              variant: "destructive",
            })
          }
        } catch (error) {
          console.error('Veritabanı silme hatası:', error)
          toast({
            title: "Hata",
            description: "Veritabanından silinirken hata oluştu",
            variant: "destructive",
          })
        }
      } else {
        // Sadece frontend'den sil (henüz kaydedilmemiş satır)
        console.log('Sadece frontend\'den siliniyor (henüz kaydedilmemiş)')
        const newRows = rows.filter(row => row.id !== rowId)
        setRows(newRows)
        
        toast({
          title: "Satır Silindi",
          description: "Henüz kaydedilmemiş satır silindi",
          variant: "success",
        })
      }
    } else {
      toast({
        title: "Uyarı",
        description: "En az bir satır kalmalıdır",
        variant: "destructive",
      })
    }
  }

  const updateCell = (rowId: string, field: keyof MalKabulRow, value: any) => {
    setRows(prevRows => {
      const newRows = prevRows.map(row => {
        if (row.id === rowId) {
          const updatedRow = { ...row, [field]: value }
          
          // Otomatik hesaplama - Giriş KG
          if (field === 'brutKg' || field === 'daraKg') {
            const brutKg = parseFloat(updatedRow.brutKg) || 0
            const daraKg = parseFloat(updatedRow.daraKg) || 0
            updatedRow.girisKg = (brutKg - daraKg).toFixed(2)
          }
          
          // Net KG hesaplama: Giriş KG - Çıkma KG - Fire KG (Otomatik)
          if (field === 'cikmaKg' || field === 'fireKg' || field === 'girisKg') {
            const cikmaKg = parseFloat(updatedRow.cikmaKg) || 0
            const fireKg = parseFloat(updatedRow.fireKg) || 0
            const girisKg = parseFloat(updatedRow.girisKg) || 0
            
            const netKg = girisKg - cikmaKg - fireKg
            updatedRow.netKg = netKg.toFixed(2)
            
            // Çıkma KG girildiğinde otomatik olarak Netlendi durumuna çek
            if (field === 'cikmaKg' && cikmaKg > 0 && updatedRow.urunDurumu === 'BEKLEMEDE') {
              updatedRow.urunDurumu = 'NETLENDI'
              
              // Son durum fişi yazdırma önerisi
              setTimeout(() => {
                toast({
                  title: "Son Durum Fişi",
                  description: "Net KG hesaplandı. Son durum fişi yazdırmak için Fiş Yazdır butonuna tıklayın.",
                  variant: "default",
                })
              }, 1000)
            }
          }
          
          return updatedRow
        }
        return row
      })
      
      return newRows
    })
  }

  const handleSaticiTipiChange = (rowId: string, value: string) => {
    updateCell(rowId, 'saticiTipi', value)
    // Diğer alanları sıfırla
    updateCell(rowId, 'komisyoncuId', '')
    updateCell(rowId, 'ureticiId', '')
    updateCell(rowId, 'mustahsilId', '')
    updateCell(rowId, 'ozelFirmaId', '')
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
          // Mevcut kayıt mı yoksa yeni kayıt mı kontrol et
          const isExistingRecord = row.id.startsWith('existing-')
          const actualId = isExistingRecord ? row.id.replace('existing-', '') : null
          
          let response
          if (isExistingRecord) {
            // Mevcut kaydı güncelle
            response = await fetch(`/api/mal-kabul/${actualId}`, {
              method: 'PUT',
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
                paletSayisi: 0,
                kasaSayisi: parseInt(row.kasaSayisi) || 0,
                brutKg: parseFloat(row.brutKg) || 0,
                daraKg: parseFloat(row.daraKg) || 0,
                girisKg: parseFloat(row.girisKg) || 0,
                cikmaKg: parseFloat(row.cikmaKg) || 0,
                cikmaFireKg: parseFloat(row.fireKg) || 0,
                netKg: parseFloat(row.netKg) || 0,
                notlar: row.notlar,
                status: row.urunDurumu === 'NETLENDI' ? 'TAMAMLANDI' : 'FATURA_BEKLIYOR'
              }),
            })
          } else {
            // Yeni kayıt oluştur
            response = await fetch('/api/mal-kabul', {
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
                cikmaKg: row.cikmaKg,
                cikmaFireKg: row.fireKg,
                netKg: row.netKg,
                notlar: row.notlar
              }),
            })
          }

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
            
            // Başarılı kayıt sonrası satır durumunu güncelle (Excel mantığı - sıfırlama yok)
            updateCell(row.id, 'status', 'SAVED')
            
            if (!isExistingRecord) {
              // Yeni kayıt için fiş bilgilerini güncelle
              updateCell(row.id, 'fisNo', result.malKabulRecord.fisNo)
              updateCell(row.id, 'tarih', result.malKabulRecord.tarih)
              updateCell(row.id, 'fisYazdirildi', true)
            }
            
            toast({
              title: "Başarılı",
              description: isExistingRecord 
                ? `Satır ${row.id} başarıyla güncellendi` 
                : `Satır ${row.id} başarıyla kaydedildi ve veritabanında saklandı`,
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

  // Fiş numarası oluşturma
  const generateFisNo = () => {
    const now = new Date()
    const year = now.getFullYear()
    const month = String(now.getMonth() + 1).padStart(2, '0')
    const day = String(now.getDate()).padStart(2, '0')
    const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0')
    return `${year}${month}${day}${random}`
  }

  // Fiş yazdırma fonksiyonu (yeni sayfadaki ile aynı tasarım)
  const printReceipt = async (row: MalKabulRow, fişTipi: 'ILK_KAYIT' | 'SON_DURUM') => {
    try {
      // Fiş verilerini hazırla
      const receiptData = {
        fisNo: row.fisNo || generateFisNo(),
        tarih: row.tarih || new Date().toISOString(),
        saticiTipi: row.saticiTipi,
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
                
                @media print {
                  body { 
                    width: 80mm !important; 
                    max-width: 80mm !important; 
                    margin: 0 !important; 
                    padding: 8px !important; 
                    font-size: 12px !important;
                  }
                  @page { 
                    size: 80mm auto; 
                    margin: 0; 
                  }
                  .qr-code img, .barcode img { 
                    display: block !important; 
                  }
                }
              </style>
            </head>
            <body>
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
                <div class="section-title">KİLOGRAM BİLGİLERİ</div>
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
                  <span class="label">Çıkma Fire KG:</span>
                  <span class="value">${receiptData.cikmaFireKg.toFixed(2)}</span>
                </div>
                <div class="row">
                  <span class="label">Net KG:</span>
                  <span class="value">${receiptData.netKg.toFixed(2)}</span>
                </div>
                ` : ''}
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
                <div class="section-title">KİLOGRAM BİLGİLERİ</div>
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
                  <span class="label">Çıkma Fire KG:</span>
                  <span class="value">${receiptData.cikmaFireKg.toFixed(2)}</span>
                </div>
                <div class="row">
                  <span class="label">Net KG:</span>
                  <span class="value">${receiptData.netKg.toFixed(2)}</span>
                </div>
                ` : ''}
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
      case 'BEKLEMEDE': return 'bg-yellow-600 text-white border-yellow-600' // Koyu sarı
      case 'NETLENDI': return 'bg-green-600 text-white border-green-600' // Yeşil
      case 'IPTAL': return 'bg-red-600 text-white border-red-600' // Kırmızı
      default: return 'bg-gray-50 text-gray-700 border-gray-200'
    }
  }

  // İptal edilmiş satırlar için stil sınıfı
  const getRowStyle = (row: MalKabulRow) => {
    if (row.urunDurumu === 'IPTAL') {
      return 'opacity-50 bg-gray-100 cursor-not-allowed'
    }
    return ''
  }

  // İptal edilmiş satırlar için input alanlarını devre dışı bırak
  const isRowDisabled = (row: MalKabulRow) => {
    return row.urunDurumu === 'IPTAL'
  }

  // Kullanıcının iptal işlemini geri alabilme yetkisi var mı?
  const canReactivateRow = () => {
    const userRole = session?.user?.role
    return userRole === 'MUHASEBECI' || userRole === 'YONETICI'
  }

  // İptal edilmiş satırı tekrar aktif hale getir
  const reactivateRow = (rowId: string) => {
    if (!canReactivateRow()) {
      toast({
        title: "Yetki Hatası",
        description: "Bu işlemi yapmaya yetkiniz yok",
        variant: "destructive",
      })
      return
    }

    if (confirm('Bu satırı tekrar aktif hale getirmek istediğinizden emin misiniz?')) {
      updateCell(rowId, 'urunDurumu', 'BEKLEMEDE')
      toast({
        title: "Başarılı",
        description: "Satır tekrar aktif hale getirildi",
        variant: "success",
      })
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
    switch (saticiTipi) {
      case 'KOMISYONCU':
        return komisyoncular.map(k => (
          <SelectItem key={k.id} value={k.id} className="text-green-700 bg-green-50 hover:bg-green-100">
            🏪 {k.dukkanAdi} - {k.sehir}
          </SelectItem>
        ))
      case 'MUSTAHSIL':
        return mustahsil.map(m => (
          <SelectItem key={m.id} value={m.id} className="text-red-700 bg-red-50 hover:bg-red-100">
            👨‍🌾 {m.ad} {m.soyad} - {m.mustahsilNo}
          </SelectItem>
        ))
      case 'OZEL_FIRMA':
        return ozelFirmalar.map(f => (
          <SelectItem key={f.id} value={f.id} className="text-blue-700 bg-blue-50 hover:bg-blue-100">
            🏢 {f.firmaAdi} - {f.sehir}
          </SelectItem>
        ))
      case '':
      case undefined:
      case null:
        return ozelFirmalar.map(f => (
          <SelectItem key={f.id} value={f.id} className="text-blue-700 bg-blue-50 hover:bg-blue-100">
            🏢 {f.firmaAdi} - {f.sehir}
          </SelectItem>
        ))
      default:
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
        switch (column) {
          case 'startDate':
            filtered = filtered.filter(row => {
              if (!row.tarih) return false
              const rowDate = new Date(row.tarih)
              const filterDate = new Date(filterValue)
              return rowDate >= filterDate
            })
            break
          case 'endDate':
            filtered = filtered.filter(row => {
              if (!row.tarih) return false
              const rowDate = new Date(row.tarih)
              const filterDate = new Date(filterValue)
              return rowDate <= filterDate
            })
            break
          case 'saticiTipi':
          case 'urunDurumu':
          case 'status':
            // "all" değeri için filtreleme yapma
            if (filterValue === 'all') break
            // Exact match için
            filtered = filtered.filter(row => row[column as keyof MalKabulRow] === filterValue)
            break
          default:
            // "all" değeri için filtreleme yapma
            if (filterValue === 'all') break
            // Diğer alanlar için filterType'a göre arama
            filtered = filtered.filter(row => {
              const rowValue = String(row[column as keyof MalKabulRow]).toLowerCase()
              const searchValue = filterValue.toLowerCase()
              
              switch (filterType) {
                case 'exact':
                  return rowValue === searchValue
                case 'starts':
                  return rowValue.startsWith(searchValue)
                case 'ends':
                  return rowValue.endsWith(searchValue)
                case 'contains':
                default:
                  return rowValue.includes(searchValue)
              }
            })
        }
      }
    })
    
    return filtered
  }

  const clearFilters = () => {
    setFilterText('')
    setColumnFilters({})
    setSortColumn(null)
    setSortDirection('asc')
    setFilterType('contains')
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
            title="Mevcut kayıtları yeniden yükle"
          >
            🔄 Kayıtları Yenile
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
          

        </CardHeader>
        
                  {/* Filtreleme Paneli */}
        {showFilters && (
          <div className="px-6 py-3 bg-gray-50 border-b border-gray-200">
            {/* Filtre İstatistikleri */}
            <div className="flex items-center justify-between mb-3 text-xs text-gray-600">
              <div>
                Toplam: <span className="font-medium">{rows.length}</span> satır | 
                Filtrelenmiş: <span className="font-medium">{getFilteredRows().length}</span> satır
              </div>
              {Object.values(columnFilters).some(v => v && v !== 'all') && (
                <div className="flex items-center gap-2">
                  <span className="text-xs">Aktif Filtreler:</span>
                  {Object.entries(columnFilters).map(([key, value]) => value && value !== 'all' && (
                    <span key={key} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                      {key === 'saticiTipi' ? 'Satıcı Tipi' : 
                       key === 'urunId' ? 'Ürün' : 
                       key === 'urunDurumu' ? 'Durum' : 
                       key === 'status' ? 'Kayıt Durumu' : 
                       key === 'startDate' ? 'Başlangıç Tarihi' : 
                       key === 'endDate' ? 'Bitiş Tarihi' : 
                       key === 'fisNo' ? 'Fiş No' : key}: {value}
                    </span>
                  ))}
                </div>
              )}
            </div>
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
              
              {/* Hızlı Filtreler */}
              <div className="flex items-center gap-2">
                <Button 
                  onClick={() => setColumnFilters(prev => ({ ...prev, urunDurumu: 'BEKLEMEDE' }))} 
                  variant="outline" 
                  size="sm"
                  className="text-yellow-700 border-yellow-300 hover:bg-yellow-50"
                >
                  🟡 Beklemede
                </Button>
                <Button 
                  onClick={() => setColumnFilters(prev => ({ ...prev, urunDurumu: 'NETLENDI' }))} 
                  variant="outline" 
                  size="sm"
                  className="text-green-700 border-green-300 hover:bg-green-50"
                >
                  🟢 Netlendi
                </Button>
                <Button 
                  onClick={() => setColumnFilters(prev => ({ ...prev, status: 'SAVED' }))} 
                  variant="outline" 
                  size="sm"
                  className="text-blue-700 border-blue-300 hover:bg-blue-50"
                >
                  ✅ Kaydedildi
                </Button>
                <Button 
                  onClick={() => setColumnFilters(prev => ({ ...prev, status: 'NEW' }))} 
                  variant="outline" 
                  size="sm"
                  className="text-orange-700 border-orange-300 hover:bg-orange-50"
                >
                  🆕 Yeni
                </Button>
              </div>
              
              {/* Satıcı Tipi Hızlı Filtreleri */}
              <div className="flex items-center gap-2">
                <Button 
                  onClick={() => setColumnFilters(prev => ({ ...prev, saticiTipi: 'OZEL_FIRMA' }))} 
                  variant="outline" 
                  size="sm"
                  className="text-blue-700 border-blue-300 hover:bg-blue-50"
                >
                  🏢 Özel Firma
                </Button>
                <Button 
                  onClick={() => setColumnFilters(prev => ({ ...prev, saticiTipi: 'KOMISYONCU' }))} 
                  variant="outline" 
                  size="sm"
                  className="text-green-700 border-green-300 hover:bg-green-50"
                >
                  🏪 Komisyoncu
                </Button>
                <Button 
                  onClick={() => setColumnFilters(prev => ({ ...prev, saticiTipi: 'MUSTAHSIL' }))} 
                  variant="outline" 
                  size="sm"
                  className="text-red-700 border-red-300 hover:bg-red-50"
                >
                  👨‍🌾 Müstahsil
                </Button>
              </div>
              
              <div className="flex items-center gap-2">
                <Button onClick={clearFilters} variant="outline" size="sm">
                  Filtreleri Temizle
                </Button>
                {Object.values(columnFilters).some(v => v && v !== 'all') && (
                  <div className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                    {Object.values(columnFilters).filter(v => v && v !== 'all').length} Filtre Aktif
                  </div>
                )}
              </div>
            </div>
            
            <div className="grid grid-cols-6 gap-3">
              <div>
                <Label className="text-xs font-medium">Satıcı Tipi</Label>
                <Select
                  value={columnFilters.saticiTipi || ''}
                  onValueChange={(value) => setColumnFilters(prev => ({ ...prev, saticiTipi: value }))}
                >
                  <SelectTrigger className="h-7 text-xs">
                    <SelectValue placeholder="Tümü" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tümü</SelectItem>
                    <SelectItem value="OZEL_FIRMA" className="text-blue-700 bg-blue-50">🏢 Özel Firma</SelectItem>
                    <SelectItem value="KOMISYONCU" className="text-green-700 bg-green-50">🏪 Komisyoncu</SelectItem>
                    <SelectItem value="MUSTAHSIL" className="text-red-700 bg-red-50">👨‍🌾 Müstahsil</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-xs font-medium">Ürün</Label>
                <Select
                  value={columnFilters.urunId || ''}
                  onValueChange={(value) => setColumnFilters(prev => ({ ...prev, urunId: value }))}
                >
                  <SelectTrigger className="h-7 text-xs">
                    <SelectValue placeholder="Tümü" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tümü</SelectItem>
                    {urunler.map(urun => (
                      <SelectItem key={urun.id} value={urun.id}>
                        {urun.ad} - {urun.kategori}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-xs font-medium">Durum</Label>
                <Select
                  value={columnFilters.urunDurumu || ''}
                  onValueChange={(value) => setColumnFilters(prev => ({ ...prev, urunDurumu: value }))}
                >
                  <SelectTrigger className="h-7 text-xs">
                    <SelectValue placeholder="Tümü" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tümü</SelectItem>
                    <SelectItem value="BEKLEMEDE" className="text-yellow-700 bg-yellow-50">🟡 Beklemede</SelectItem>
                    <SelectItem value="NETLENDI" className="text-green-700 bg-green-50">🟢 Netlendi</SelectItem>
                    <SelectItem value="IPTAL" className="text-red-700 bg-red-50">🔴 İptal</SelectItem>
                  </SelectContent>
                </Select>
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
              <div>
                <Label className="text-xs font-medium">Kayıt Durumu</Label>
                <Select
                  value={columnFilters.status || ''}
                  onValueChange={(value) => setColumnFilters(prev => ({ ...prev, status: value }))}
                >
                  <SelectTrigger className="h-7 text-xs">
                    <SelectValue placeholder="Tümü" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tümü</SelectItem>
                    <SelectItem value="NEW" className="text-blue-700 bg-blue-50">🆕 Yeni</SelectItem>
                    <SelectItem value="SAVED" className="text-green-700 bg-green-50">✅ Kaydedildi</SelectItem>
                    <SelectItem value="ERROR" className="text-red-700 bg-red-50">❌ Hata</SelectItem>
                    <SelectItem value="LOADING" className="text-yellow-700 bg-yellow-50">⏳ Yükleniyor</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-xs font-medium">Tarih Aralığı</Label>
                <div className="flex gap-1">
                  <Input
                    type="date"
                    value={columnFilters.startDate || ''}
                    onChange={(e) => setColumnFilters(prev => ({ ...prev, startDate: e.target.value }))}
                    className="h-7 text-xs w-24"
                    placeholder="Başlangıç"
                  />
                  <Input
                    type="date"
                    value={columnFilters.endDate || ''}
                    onChange={(e) => setColumnFilters(prev => ({ ...prev, endDate: e.target.value }))}
                    className="h-7 text-xs w-24"
                    placeholder="Bitiş"
                  />
                </div>
              </div>
            </div>
            
            {/* Gelişmiş Filtre Seçenekleri */}
            <div className="mt-3 pt-3 border-t border-gray-200">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Label className="text-xs font-medium">Filtre Tipi:</Label>
                  <Select
                    value={filterType}
                    onValueChange={(value: 'contains' | 'exact' | 'starts' | 'ends') => setFilterType(value)}
                  >
                    <SelectTrigger className="h-6 text-xs w-24">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="contains">İçerir</SelectItem>
                      <SelectItem value="exact">Tam Eşleşir</SelectItem>
                      <SelectItem value="starts">Başlar</SelectItem>
                      <SelectItem value="ends">Biter</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="flex items-center gap-2">
                  <Label className="text-xs font-medium">Sıralama:</Label>
                                    <Select
                    value={sortColumn || 'none'}
                    onValueChange={(value) => setSortColumn(value === 'none' ? null : (value as keyof MalKabulRow))}
                  >
                    <SelectTrigger className="h-6 text-xs w-32">
                      <SelectValue placeholder="Sıralama yok" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">Sıralama yok</SelectItem>
                      <SelectItem value="tarih">Tarih</SelectItem>
                      <SelectItem value="fisNo">Fiş No</SelectItem>
                      <SelectItem value="saticiTipi">Satıcı Tipi</SelectItem>
                      <SelectItem value="urunId">Ürün</SelectItem>
                      <SelectItem value="kasaSayisi">Kasa Sayısı</SelectItem>
                      <SelectItem value="brutKg">Brüt KG</SelectItem>
                      <SelectItem value="netKg">Net KG</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  {sortColumn && (
                    <Button
                      onClick={() => setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc')}
                      variant="outline"
                      size="sm"
                      className="h-6 w-6 p-0"
                    >
                      {sortDirection === 'asc' ? '↑' : '↓'}
                    </Button>
                  )}
                </div>
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
                  <tr key={row.id} className={`hover:bg-gray-50 ${selectedRowId === row.id ? 'bg-blue-50 border-blue-300' : ''} ${getRowStyle(row)}`}>
                    {/* Seçim */}
                    <td className="border border-gray-300 px-1 py-1 text-center">
                      <input
                        type="radio"
                        name="selectedRow"
                        checked={selectedRowId === row.id}
                        onChange={() => setSelectedRowId(row.id)}
                        className="w-4 h-4 text-blue-600"
                        disabled={isRowDisabled(row)}
                      />
                    </td>
                    {/* Satıcı Tipi */}
                    <td className="border border-gray-300 px-1 py-1">
                      <Select
                        value={row.saticiTipi}
                        onValueChange={(value) => handleSaticiTipiChange(row.id, value)}
                        disabled={isRowDisabled(row)}
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
                        disabled={!row.saticiTipi || isRowDisabled(row)}
                      >
                        <SelectTrigger className="h-7 text-xs border-0 p-0">
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
                        disabled={!row.komisyoncuId || row.saticiTipi !== 'KOMISYONCU' || isRowDisabled(row)}
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
                        disabled={isRowDisabled(row)}
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
                        disabled={isRowDisabled(row)}
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
                        disabled={isRowDisabled(row)}
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
                        disabled={isRowDisabled(row)}
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
                        disabled={isRowDisabled(row)}
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
                        disabled={isRowDisabled(row)}
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
                        disabled={isRowDisabled(row)}
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
                        disabled={isRowDisabled(row)}
                      />
                    </td>

                    {/* Ürün Durumu */}
                    <td className="border border-gray-300 px-1 py-1">
                      <div className="flex flex-col gap-1">
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
                          disabled={(row.urunDurumu === 'NETLENDI' && !row.cikmaKg) || isRowDisabled(row)}
                        >
                          <SelectTrigger className={`h-7 text-xs border-0 p-1 ${getUrunDurumuColor(row.urunDurumu)}`}>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="BEKLEMEDE">Beklemede</SelectItem>
                            <SelectItem value="NETLENDI" disabled={!row.cikmaKg || parseFloat(row.cikmaKg) <= 0}>
                              Netlendi {(!row.cikmaKg || parseFloat(row.cikmaKg) <= 0) && '(Çıkma KG > 0 gerekli)'}
                            </SelectItem>
                            <SelectItem value="IPTAL">İptal</SelectItem>
                          </SelectContent>
                        </Select>
                        
                        {/* Aktif Et Butonu - Sadece iptal edilmiş satırlarda ve yetkili kullanıcılarda görünür */}
                        {row.urunDurumu === 'IPTAL' && canReactivateRow() && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => reactivateRow(row.id)}
                            className="h-6 w-6 p-0 text-green-600 hover:text-green-700 border-green-300"
                            title="Satırı tekrar aktif hale getir"
                          >
                            🔄
                          </Button>
                        )}
                      </div>
                    </td>

                    {/* Fiş Yazdırma */}
                    <td className="border border-gray-300 px-1 py-1 text-center">
                      <div className="flex flex-col gap-1">
                        {/* İlk Kayıt Fişi */}
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => printReceipt(row, 'ILK_KAYIT')}
                          className="h-6 w-6 p-0 text-blue-600 hover:text-blue-700"
                          title="İlk Kayıt Fişi Yazdır"
                          disabled={!row.fisNo || isRowDisabled(row)}
                        >
                          📄
                        </Button>
                        
                        {/* Son Durum Fişi */}
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => printReceipt(row, 'SON_DURUM')}
                          className="h-6 w-6 p-0 text-green-600 hover:text-green-700"
                          title="Son Durum Fişi Yazdır"
                          disabled={row.urunDurumu !== 'NETLENDI' || !row.netKg || parseFloat(row.netKg) <= 0 || isRowDisabled(row)}
                        >
                          🧾
                        </Button>
                      </div>
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
                        disabled={rows.length === 1 || isRowDisabled(row)}
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
