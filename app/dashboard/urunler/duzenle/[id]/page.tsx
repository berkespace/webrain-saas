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
    durum: 'AKTIF' as const
  })

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
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/dashboard/urunler">
          <Button variant="outline" size="sm">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Geri
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold">Ürün Düzenle</h1>
          <p className="text-muted-foreground">Ürün bilgilerini güncelleyin</p>
        </div>
      </div>

      <Card className="max-w-2xl">
        <CardHeader>
          <CardTitle>Ürün Bilgileri</CardTitle>
          <div className="text-sm text-muted-foreground">
            Stok Kodu: <span className="font-mono">{urun.stokKodu}</span>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="ad">Ürün Adı *</Label>
              <Input
                id="ad"
                value={formData.ad}
                onChange={(e) => setFormData({...formData, ad: e.target.value})}
                placeholder="Örn: Domates, Salatalık, Patlıcan..."
                required
              />
            </div>

            <div>
              <Label htmlFor="kategori">Kategori</Label>
              <Input
                id="kategori"
                value={formData.kategori}
                onChange={(e) => setFormData({...formData, kategori: e.target.value})}
                placeholder="Örn: Sebze, Meyve, Bakliyat..."
              />
            </div>

            <div>
              <Label htmlFor="birim">Birim *</Label>
              <Select
                value={formData.birim}
                onValueChange={(value) => setFormData({...formData, birim: value})}
              >
                <SelectTrigger>
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

            <div>
              <Label htmlFor="durum">Durum</Label>
              <Select
                value={formData.durum}
                onValueChange={(value: 'AKTIF' | 'PASIF') => setFormData({...formData, durum: value})}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="AKTIF">Aktif</SelectItem>
                  <SelectItem value="PASIF">Pasif</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="bg-yellow-50 dark:bg-yellow-950 p-4 rounded-lg">
              <h4 className="font-semibold text-yellow-900 dark:text-yellow-100 mb-2">
                ⚠️ Dikkat
              </h4>
              <p className="text-sm text-yellow-800 dark:text-yellow-200">
                Stok kodu <strong>{urun.stokKodu}</strong> değiştirilemez. 
                Bu kod global klavye dinleyicisinde ürün seçimi için kullanılmaktadır.
              </p>
            </div>

            <div className="flex gap-3 pt-4">
              <Button type="submit" disabled={isSaving} className="flex-1">
                {isSaving ? 'Güncelleniyor...' : 'Güncelle'}
                <Save className="h-4 w-4 ml-2" />
              </Button>
              <Link href="/dashboard/urunler">
                <Button type="button" variant="outline">
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
