'use client'

import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { TrendingUp, TrendingDown, Scale, DollarSign, Clock } from 'lucide-react'

export default function AdminLiveAnalytics() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState<any>(null)

  const fetchData = async () => {
    setLoading(true)
    const res = await fetch('/api/admin/analytics', { cache: 'no-store' })
    if (res.ok) {
      const json = await res.json()
      setData(json)
    }
    setLoading(false)
  }

  useEffect(() => {
    if (status === 'unauthenticated') router.push('/login')
    if (status === 'authenticated' && (session?.user as any)?.role !== 'ADMIN') router.push('/dashboard')
    if (status === 'authenticated') {
      fetchData()
      const t = setInterval(fetchData, 15000)
      return () => clearInterval(t)
    }
  }, [status, session])

  if (loading || status === 'loading') {
    return <div className="p-6">Yükleniyor...</div>
  }

  if (!data) return <div className="p-6">Veri yok</div>

  const fmtCurrency = (v:number) => v.toLocaleString('tr-TR', { style:'currency', currency:'TRY' })
  const fmtNumber = (v:number) => v.toLocaleString('tr-TR')

  const change = data.weeklyComparison.changeRatio
  const ChangeIcon = change === null ? Clock : (change >= 0 ? TrendingUp : TrendingDown)
  const changeColor = change === null ? 'text-muted-foreground' : (change >= 0 ? 'text-green-600' : 'text-red-600')

  return (
    <div className="p-6 grid gap-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Scale className="h-5 w-5"/> Bugün Net Miktar</CardTitle>
          </CardHeader>
          <CardContent className="text-3xl font-bold">{fmtNumber(data.today.totalNetKg)} KG</CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><DollarSign className="h-5 w-5"/> Bugün Toplam Tutar</CardTitle>
          </CardHeader>
          <CardContent className="text-3xl font-bold">{fmtCurrency(data.today.totalAmount)}</CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><ChangeIcon className={`h-5 w-5 ${changeColor}`}/> Haftalık Karşılaştırma</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-muted-foreground">Son 7 gün: {fmtCurrency(data.weeklyComparison.last7Amount)}</div>
            <div className="text-sm text-muted-foreground">Önceki 7 gün: {fmtCurrency(data.weeklyComparison.prev7Amount)}</div>
            <div className={`text-xl font-semibold ${changeColor}`}>
              {change === null ? 'Kıyaslama için veri yetersiz' : `${(change*100).toFixed(1)}%`}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader><CardTitle>Ortalama Fiyat (Günlük)</CardTitle></CardHeader>
          <CardContent className="text-2xl font-bold">{fmtCurrency(data.averages.daily)}</CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Ortalama Fiyat (Haftalık)</CardTitle></CardHeader>
          <CardContent className="text-2xl font-bold">{fmtCurrency(data.averages.weekly)}</CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Ortalama Fiyat (Aylık)</CardTitle></CardHeader>
          <CardContent className="text-2xl font-bold">{fmtCurrency(data.averages.monthly)}</CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader><CardTitle>Vadesi 40 Günü Geçmiş Bakiyeler</CardTitle></CardHeader>
        <CardContent>
          {data.agingOver40Days.length === 0 ? (
            <div className="text-sm text-muted-foreground">Gecikmiş bakiye yok.</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b bg-muted/50">
                    <th className="text-left py-2 px-2 text-sm">Cari</th>
                    <th className="text-left py-2 px-2 text-sm">Bekleyen Bakiye</th>
                  </tr>
                </thead>
                <tbody>
                  {data.agingOver40Days.map((row:any) => (
                    <tr key={row.saticiId} className="border-b">
                      <td className="py-2 px-2 text-sm">{row.saticiAdi}</td>
                      <td className="py-2 px-2 text-sm">{fmtCurrency(row.totalOutstanding)}</td>
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


