'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useToast } from '@/components/ui/use-toast'
import { ArrowLeft, Save, Loader2 } from 'lucide-react'
import Link from 'next/link'

interface Urun {
  id: string
  ad: string
  stokKodu: string
  kategori: string
  birim: string
  durum: 'AKTIF' | 'PASIF'
  createdAt: string
  updatedAt: string
}

export default function UrunDuzenlePage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const { toast } = useToast()
  const [urun, setUrun] = useState<Urun | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [formData, setFormData] = useState({
    ad: '',
    kategori: '',
    birim: 'kg',
    durum: 'AKTIF' as 'AKTIF' | 'PASIF'
  })

  // Kategori seçenekleri
  const kategoriSecenekleri = [
    { value: 'Sebze', label: 'Sebze' },
    { value: 'Meyve', label: 'Meyve' },
    { value: 'Yeşillik', label: 'Yeşillik' }
  ]

  // Ürün bilgilerini getir
  useEffect(() => {
    const fetchUrun = async () => {
      try {
        const response = await fetch(`/api/urunler/${params.id}`)
        if (response.ok) {
          const urunData = await response.json()
          setUrun(urunData)
          setFormData({
            ad: urunData.ad,
            kategori: urunData.kategori || '',
            birim: urunData.birim,
            durum: urunData.durum
          })
        } else {
          toast({
            title: "Hata",
            description: "Ürün bulunamadı",
            variant: "destructive"
          })
          router.push('/dashboard/urunler')
        }
      } catch (error) {
        toast({
          title: "Hata",
          description: "Ürün yüklenirken hata oluştu",
          variant: "destructive"
        })
        router.push('/dashboard/urunler')
      } finally {
        setIsLoading(false)
      }
    }

    fetchUrun()
  }, [params.id, router, toast])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)

    try {
      const response = await fetch(`/api/urunler/${params.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })

      if (response.ok) {
        toast({
          title: "Başarılı",
          description: "Ürün başarıyla güncellendi"
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
        variant: "destructive"
      })
    } finally {
      setIsSaving(false)
    }
  }

  if (isLoading) {
    return (
      <div className="container mx-auto p-6">
        <div className="flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin" />
          <span className="ml-2">Yükleniyor...</span>
        </div>
      </div>
    )
  }

  if (!urun) {
    return (
      <div className="container mx-auto p-6">
        <div className="text-center">Ürün bulunamadı</div>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-4 lg:p-6 space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <Link href="/dashboard/urunler">
          <Button variant="outline" size="sm" className="w-full sm:w-auto">
            <ArrowLeft className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">Geri</span>
            <span className="sm:hidden">←</span>
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold">Ürün Düzenle</h1>
          <p className="text-sm lg:text-base text-muted-foreground">
            Ürün bilgilerini güncelleyin
          </p>
        </div>
      </div>

      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-lg lg:text-xl">Ürün Bilgileri</CardTitle>
          <div className="text-sm text-muted-foreground">
            Stok Kodu: <span className="font-mono">{urun.stokKodu}</span>
          </div>
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
                    {kategoriSecenekleri.map((secim) => (
                      <SelectItem key={secim.value} value={secim.value}>
                        {secim.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
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
              </div>
            </div>

            <div className="bg-yellow-50 dark:bg-yellow-950 p-4 rounded-lg">
              <h4 className="font-semibold text-yellow-900 dark:text-yellow-100 mb-2">
                ⚠️ Dikkat
              </h4>
              <p className="text-sm text-yellow-800 dark:text-yellow-200">
                Stok kodu <strong>{urun.stokKodu}</strong> değiştirilemez. 
                Bu kod global klavye dinleyicisinde ürün seçimi için kullanılmaktadır.
                URN*** formatındaki kodlar otomatik olarak atanır ve değiştirilemez.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <Button type="submit" disabled={isSaving} className="flex-1 order-2 sm:order-1">
                {isSaving ? 'Güncelleniyor...' : 'Güncelle'}
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
