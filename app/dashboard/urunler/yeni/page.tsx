'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useToast } from '@/components/ui/use-toast'
import { ArrowLeft, Save } from 'lucide-react'
import Link from 'next/link'

export default function YeniUrunPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    ad: '',
    kategori: '',
    birim: 'kg',
    durum: 'AKTIF' as const
  })

  // Kategori seçenekleri
  const kategoriSecenekleri = [
    { value: 'Sebze', label: 'Sebze' },
    { value: 'Meyve', label: 'Meyve' },
    { value: 'Yeşillik', label: 'Yeşillik' }
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await fetch('/api/urunler', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })

      if (response.ok) {
        const result = await response.json()
        toast({
          title: "Başarılı",
          description: `Ürün başarıyla eklendi. Stok Kodu: ${result.urun.stokKodu}`
        })
        router.push('/dashboard/urunler')
      } else {
        const error = await response.json()
        throw new Error(error.error || 'Bir hata oluştu')
      }
    } catch (error: any) {
      toast({
        title: "Hata",
        description: error.message || "İşlem sırasında hata oluştu",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container mx-auto p-4 lg:p-6 space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <Link href="/dashboard/urunler">
          <Button variant="outline" size="sm" className="w-full sm:w-auto">
            <span className="hidden sm:inline">Geri</span>
            <span className="sm:hidden">←</span>
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold">Yeni Ürün Ekle</h1>
          <p className="text-sm lg:text-base text-muted-foreground">
            Sisteme yeni ürün ekleyin
          </p>
        </div>
      </div>

      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-lg lg:text-xl">Ürün Bilgileri</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Ürün Adı */}
              <div className="lg:col-span-2">
                <Label htmlFor="ad">Ürün Adı *</Label>
                <Input
                  id="ad"
                  value={formData.ad}
                  onChange={(e) => setFormData({...formData, ad: e.target.value})}
                  placeholder="Örn: Domates, Salatalık, Patlıcan..."
                  required
                  className="mt-1"
                />
                <div className="text-xs text-muted-foreground mt-1">
                  Ürünün tam adını girin
                </div>
              </div>

              {/* Kategori */}
              <div>
                <Label htmlFor="kategori">Kategori</Label>
                <Select
                  value={formData.kategori}
                  onValueChange={(value) => setFormData({...formData, kategori: value})}
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Kategori seçin" />
                  </SelectTrigger>
                  <SelectContent>
                    {kategoriSecenekleri.map((secenek) => (
                      <SelectItem key={secenek.value} value={secenek.value}>
                        {secenek.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <div className="text-xs text-muted-foreground mt-1">
                  Ürünün kategorisini belirtin
                </div>
              </div>

              {/* Birim */}
              <div>
                <Label htmlFor="birim">Birim *</Label>
                <Select
                  value={formData.birim}
                  onValueChange={(value) => setFormData({...formData, birim: value})}
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="kg">Kilogram (kg)</SelectItem>
                    <SelectItem value="adet">Adet</SelectItem>
                    <SelectItem value="litre">Litre (L)</SelectItem>
                    <SelectItem value="metre">Metre (m)</SelectItem>
                    <SelectItem value="ton">Ton</SelectItem>
                    <SelectItem value="gram">Gram (g)</SelectItem>
                  </SelectContent>
                </Select>
                <div className="text-xs text-muted-foreground mt-1">
                  Ürünün ölçü birimini seçin
                </div>
              </div>

              {/* Durum */}
              <div className="lg:col-span-2">
                <Label htmlFor="durum">Durum</Label>
                <Select
                  value={formData.durum}
                  onValueChange={(value: 'AKTIF' | 'PASIF') => setFormData({...formData, durum: value})}
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="AKTIF">Aktif</SelectItem>
                    <SelectItem value="PASIF">Pasif</SelectItem>
                  </SelectContent>
                </Select>
                <div className="text-xs text-muted-foreground mt-1">
                  Ürünün sistemdeki durumunu belirleyin
                </div>
              </div>
            </div>

            <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg">
              <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">
                💡 Bilgi
              </h4>
              <p className="text-sm text-blue-800 dark:text-blue-200">
                Ürün kaydedildikten sonra otomatik olarak <strong>URN001, URN002, URN003...</strong> 
                formatında stok kodu atanacaktır. Bu kod global klavye dinleyicisinde 
                ürün seçimi için kullanılabilir.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <Button type="submit" disabled={isLoading} className="flex-1 order-2 sm:order-1">
                {isLoading ? 'Kaydediliyor...' : 'Ürün Ekle'}
                <Save className="h-4 w-4 ml-2" />
              </Button>
              <Link href="/dashboard/urunler" className="order-1 sm:order-2">
                <Button type="button" variant="outline" className="w-full sm:w-auto">
                  İptal
                </Button>
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
