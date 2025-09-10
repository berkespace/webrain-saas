'use client'

import { useEffect, useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Calendar, FileSpreadsheet, FileText, Download, Eye } from 'lucide-react'

export default function FaturaListesi() {
  const [rows, setRows] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [qSatici, setQSatici] = useState('')
  const [qUrun, setQUrun] = useState('')
  const [start, setStart] = useState('')
  const [end, setEnd] = useState('')
  const [selectedFis, setSelectedFis] = useState<any>(null)
  const [fisModalOpen, setFisModalOpen] = useState(false)

  const load = async () => {
    setLoading(true)
    const params = new URLSearchParams()
    if (qSatici) params.set('satici', qSatici)
    if (qUrun) params.set('urun', qUrun)
    if (start) params.set('start', start)
    if (end) params.set('end', end)
    const res = await fetch('/api/faturalar?'+params.toString(), { cache: 'no-store' })
    if (res.ok) {
      const json = await res.json()
      setRows(json.rows)
    }
    setLoading(false)
  }

  useEffect(() => { load() }, [])

  const fmtCurrency = (v:number) => v.toLocaleString('tr-TR', { style:'currency', currency:'TRY' })

  const handleFisClick = async (fisNo: string) => {
    const res = await fetch(`/api/mal-kabul/fis/${fisNo}`, { cache: 'no-store' })
    if (res.ok) {
      const fis = await res.json()
      setSelectedFis(fis)
      setFisModalOpen(true)
    }
  }

  const exportToExcel = () => {
    const headers = ['Fiş No', 'Fatura No', 'Fatura Tarihi', 'Satıcı', 'Ürün', 'Net Miktar', 'Birim Fiyat', 'KDV Hariç', 'Her Şey Dahil', 'Onaylayan', 'Onay Tarihi']
    const csvContent = [
      headers.join(','),
      ...rows.map(r => [
        r.fisNo,
        r.faturaSeriNo,
        r.faturaTarihi ? new Date(r.faturaTarihi).toLocaleDateString('tr-TR') : '',
        `"${r.saticiAdi}"`,
        `"${r.urun}"`,
        r.netMiktar,
        r.birimFiyat,
        r.kdvHaricTutar,
        r.herseyDahilTutar,
        `"${r.onaylayan}"`,
        r.onayTarihi ? new Date(r.onayTarihi).toLocaleDateString('tr-TR') : ''
      ].join(','))
    ].join('\n')
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.download = `fatura-listesi-${new Date().toISOString().split('T')[0]}.csv`
    link.click()
  }

  return (
    <div className="mt-10 ml-10 mr-10 space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Fatura Listesi</h1>
        <p className="text-muted-foreground">Onaylanan satın alma kalemleri</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Filtreler</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div>
              <label className="text-sm">Satıcı</label>
              <Input value={qSatici} onChange={(e)=>setQSatici(e.target.value)} placeholder="Satıcı ara" />
            </div>
            <div>
              <label className="text-sm">Ürün</label>
              <Input value={qUrun} onChange={(e)=>setQUrun(e.target.value)} placeholder="Ürün ara" />
            </div>
            <div>
              <label className="text-sm">Başlangıç</label>
              <Input type="date" value={start} onChange={(e)=>setStart(e.target.value)} />
            </div>
            <div>
              <label className="text-sm">Bitiş</label>
              <Input type="date" value={end} onChange={(e)=>setEnd(e.target.value)} />
            </div>
          </div>
          <div className="mt-3 flex gap-2">
            <Button onClick={load}>Uygula</Button>
            <Button variant="outline" onClick={()=>{ setQSatici(''); setQUrun(''); setStart(''); setEnd(''); load() }}>Temizle</Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Faturalar</CardTitle>
              <CardDescription>{rows.length} kayıt</CardDescription>
            </div>
            <Button onClick={exportToExcel} variant="outline" className="flex items-center gap-2">
              <Download className="h-4 w-4" />
              Excel'e Aktar
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-3">Fiş No</th>
                  <th className="text-left p-3">Fatura No/Tarih</th>
                  <th className="text-left p-3">Satıcı</th>
                  <th className="text-left p-3">Ürün</th>
                  <th className="text-left p-3">Net</th>
                  <th className="text-left p-3">Birim Fiyat</th>
                  <th className="text-left p-3">KDV Hariç</th>
                  <th className="text-left p-3">Hersey Dahil</th>
                  <th className="text-left p-3">Onaylayan</th>
                  <th className="text-left p-3">Onay Tarihi</th>
                </tr>
              </thead>
              <tbody>
                {rows.map(r => (
                  <tr key={r.id} className="border-b">
                    <td className="p-3 font-mono text-sm underline cursor-pointer hover:text-blue-600" title="Fişi görüntüle" onClick={() => handleFisClick(r.fisNo)}>{r.fisNo}</td>
                    <td className="p-3 text-sm">
                      <div>{r.faturaSeriNo}</div>
                      <div className="text-muted-foreground flex gap-1 items-center"><Calendar className="h-3 w-3" /> {r.faturaTarihi ? new Date(r.faturaTarihi).toLocaleDateString('tr-TR') : '-'}</div>
                    </td>
                    <td className="p-3 text-sm">{r.saticiAdi}</td>
                    <td className="p-3 text-sm">{r.urun}</td>
                    <td className="p-3 text-sm">{r.netMiktar.toLocaleString('tr-TR')}</td>
                    <td className="p-3 text-sm">{fmtCurrency(r.birimFiyat)}</td>
                    <td className="p-3 text-sm">{fmtCurrency(r.kdvHaricTutar)}</td>
                    <td className="p-3 text-sm font-medium">{fmtCurrency(r.herseyDahilTutar)}</td>
                    <td className="p-3 text-sm">{r.onaylayan}</td>
                    <td className="p-3 text-sm">{r.onayTarihi ? new Date(r.onayTarihi).toLocaleDateString('tr-TR') : '-'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Fiş Detay Modal */}
      <Dialog open={fisModalOpen} onOpenChange={setFisModalOpen}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Mal Kabul Fişi - {selectedFis?.fisNo}</DialogTitle>
          </DialogHeader>
          {selectedFis && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">Fiş No</label>
                  <p className="text-lg font-mono">{selectedFis.fisNo}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Tarih</label>
                  <p>{new Date(selectedFis.createdAt).toLocaleDateString('tr-TR')}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Satıcı</label>
                  <p>{selectedFis.saticiAdi}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Ürün</label>
                  <p>{selectedFis.urunAd}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Net Miktar</label>
                  <p>{selectedFis.netMiktar.toLocaleString('tr-TR')} {selectedFis.birim}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Birim Fiyat</label>
                  <p>{fmtCurrency(selectedFis.birimFiyat)}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">KDV Hariç Tutar</label>
                  <p>{fmtCurrency(selectedFis.kdvHaricTutar)}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Her Şey Dahil Tutar</label>
                  <p className="font-semibold">{fmtCurrency(selectedFis.herseyDahilTutar)}</p>
                </div>
              </div>
              
              {selectedFis.faturaSeriNo && (
                <div className="border-t pt-4">
                  <h3 className="font-semibold mb-2">Fatura Bilgileri</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-500">Fatura Seri No</label>
                      <p>{selectedFis.faturaSeriNo}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">Fatura Tarihi</label>
                      <p>{selectedFis.faturaTarihi ? new Date(selectedFis.faturaTarihi).toLocaleDateString('tr-TR') : '-'}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">Fatura Yöntemi</label>
                      <p>{selectedFis.faturaYontemi}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">Onaylayan</label>
                      <p>{selectedFis.onaylayan}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}


