'use client'

import { useEffect, useMemo, useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, BarChart, Bar, Legend } from 'recharts'

export default function AdvancedReports() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [selectedProduct, setSelectedProduct] = useState<string>('ALL')
  const [supplierQuery, setSupplierQuery] = useState('')
  const [range, setRange] = useState<'7'|'30'>('30')

  useEffect(() => {
    if (status === 'unauthenticated') router.push('/login')
    if (status === 'authenticated' && (session?.user as any)?.role !== 'ADMIN') router.push('/dashboard')
    if (status === 'authenticated') {
      fetch('/api/admin/reports', { cache: 'no-store' }).then(r => r.json()).then(setData).finally(()=>setLoading(false))
    }
  }, [status, session])

  if (loading || status === 'loading') return <div className="p-6">Yükleniyor...</div>
  if (!data) return <div className="p-6">Veri yok</div>

  const fmtCurrency = (v:number) => v.toLocaleString('tr-TR', { style:'currency', currency:'TRY' })
  const fmtPercent = (v:number|null) => v===null ? '-' : `${(v*100).toFixed(1)}%`

  // Grafik verileri: ilk ürün trendi örnek ve tedarikçi bar datası
  const products: any[] = data.priceTrend.products
  const currentProduct = (selectedProduct==='ALL' ? products[0] : products.find(p=>p.urunId===selectedProduct)) || products[0]
  const sliceDays = (days:any[]) => range==='7' ? days.slice(-7) : days
  const priceData = currentProduct ? sliceDays(currentProduct.days).map((d:any) => ({ day: d.day, price: d.avgPrice })) : []
  const supplierData = data.suppliers
    .filter((s:any) => s.saticiAdi.toLowerCase().includes(supplierQuery.toLowerCase()))
    .sort((a:any,b:any)=> (b.toplamTutar - a.toplamTutar))
    .slice(0,8)
    .map((s:any) => ({ name: s.saticiAdi, hacim: s.toplamHacim, tutar: s.toplamTutar }))

  return (
    <div className="p-6 grid gap-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      {/* 1) Ürün fiyat trendi (özet) */}
      <Card>
        <CardHeader><CardTitle>Ürün Fiyat Trendleri (Son 30 Gün) — Haftalık Değişim: {fmtPercent(data.priceTrend.weeklyPriceChange)}</CardTitle></CardHeader>
        <CardContent>
          <div className="text-xs text-muted-foreground mb-2">Seçili: {currentProduct?.urun || '—'} • Aralık: {range==='7'?'7 gün':'30 gün'}</div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-3">
            <div>
              <label className="text-[10px] text-muted-foreground">Ürün</label>
              <Select value={selectedProduct} onValueChange={(v)=>setSelectedProduct(v)}>
                <SelectTrigger>
                  <SelectValue placeholder="Ürün seçin" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ALL">(İlk ürün)</SelectItem>
                  {products.map(p => (
                    <SelectItem key={p.urunId} value={p.urunId}>{p.urun}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-[10px] text-muted-foreground">Aralık</label>
              <Select value={range} onValueChange={(v:any)=>setRange(v)}>
                <SelectTrigger>
                  <SelectValue placeholder="Aralık" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7">Son 7 Gün</SelectItem>
                  <SelectItem value="30">Son 30 Gün</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="w-full h-56">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={priceData} margin={{ left: 10, right: 10, top: 5, bottom: 0 }}>
                <CartesianGrid strokeDasharray="2 2" vertical={false} />
                <XAxis dataKey="day" hide/>
                <YAxis width={60} tickFormatter={(v)=>v.toLocaleString('tr-TR')} />
                <Tooltip formatter={(v:number)=>[fmtCurrency(v), 'Ortalama Fiyat']} labelFormatter={(l)=>l} />
                <Line type="monotone" dataKey="price" stroke="#10b981" dot={false} strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* 2) Tedarikçi kırılımı */}
      <Card>
        <CardHeader><CardTitle>Tedarikçi Kırılımı (Son 30 Gün)</CardTitle></CardHeader>
        <CardContent>
          <div className="mb-2 max-w-xs">
            <Input placeholder="Tedarikçi ara..." value={supplierQuery} onChange={(e)=>setSupplierQuery(e.target.value)} />
          </div>
          <div className="w-full h-56">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={supplierData} margin={{ left: 10, right: 10, top: 5, bottom: 0 }}>
                <CartesianGrid strokeDasharray="2 2" vertical={false} />
                <XAxis dataKey="name" hide/>
                <YAxis width={60} tickFormatter={(v)=>v.toLocaleString('tr-TR')} />
                <Tooltip formatter={(v:number, name:any)=> name==='hacim' ? [v.toLocaleString('tr-TR'),'Hacim'] : [fmtCurrency(v),'Tutar']} labelFormatter={(l)=>l} />
                <Legend />
                <Bar dataKey="hacim" fill="#6366f1" />
                <Bar dataKey="tutar" fill="#f59e0b" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
      </div>

      {/* 3) Cari yaşlandırma */}
      <Card>
        <CardHeader><CardTitle>Cari Yaşlandırma</CardTitle></CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="border rounded p-3 text-center">
              <div className="text-xs text-muted-foreground">0-30 Gün</div>
              <div className="text-xl font-bold">{fmtCurrency(data.aging.buckets.b0_30)}</div>
            </div>
            <div className="border rounded p-3 text-center">
              <div className="text-xs text-muted-foreground">31-60 Gün</div>
              <div className="text-xl font-bold">{fmtCurrency(data.aging.buckets.b31_60)}</div>
            </div>
            <div className="border rounded p-3 text-center">
              <div className="text-xs text-muted-foreground">61-90 Gün</div>
              <div className="text-xl font-bold">{fmtCurrency(data.aging.buckets.b61_90)}</div>
            </div>
            <div className="border rounded p-3 text-center">
              <div className="text-xs text-muted-foreground">90+ Gün</div>
              <div className="text-xl font-bold">{fmtCurrency(data.aging.buckets.b90p)}</div>
            </div>
          </div>
          <div className="overflow-x-auto mt-4">
            <table className="w-full">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="text-left py-2 px-2 text-sm">Cari</th>
                  <th className="text-left py-2 px-2 text-sm">Gün</th>
                  <th className="text-left py-2 px-2 text-sm">Bakiye</th>
                  <th className="text-left py-2 px-2 text-sm">Bucket</th>
                </tr>
              </thead>
              <tbody>
                {data.aging.details.slice(0,200).map((r:any, idx:number) => (
                  <tr key={idx} className="border-b">
                    <td className="py-2 px-2 text-sm">{r.saticiAdi}</td>
                    <td className="py-2 px-2 text-sm">{r.days}</td>
                    <td className="py-2 px-2 text-sm">{fmtCurrency(r.bakiye)}</td>
                    <td className="py-2 px-2 text-sm">{r.bucket}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* 4) Fire/Çıkma oranı en yüksek 10 ürün */}
      <Card>
        <CardHeader><CardTitle>Fire/Çıkma Oranı En Yüksek 10 Ürün</CardTitle></CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="text-left py-2 px-2 text-sm">Ürün</th>
                  <th className="text-left py-2 px-2 text-sm">Giriş (KG)</th>
                  <th className="text-left py-2 px-2 text-sm">Atık (KG)</th>
                  <th className="text-left py-2 px-2 text-sm">Oran</th>
                </tr>
              </thead>
              <tbody>
                {data.wasteTop.map((w:any) => (
                  <tr key={w.urunId} className="border-b">
                    <td className="py-2 px-2 text-sm">{w.urun}</td>
                    <td className="py-2 px-2 text-sm">{w.giris.toLocaleString('tr-TR')}</td>
                    <td className="py-2 px-2 text-sm">{w.atik.toLocaleString('tr-TR')}</td>
                    <td className="py-2 px-2 text-sm">{(w.oran*100).toFixed(1)}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* 5) Fatura onay döngüsü */}
      <Card>
        <CardHeader><CardTitle>Fatura Onay Döngüsü (Ortalama)</CardTitle></CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{data.approvalCycle.approvalAvgHours.toFixed(1)} saat</div>
          <div className="text-sm text-muted-foreground">Fiyat girişinden onaya kadar geçen ortalama süre</div>
        </CardContent>
      </Card>
    </div>
  )
}


