'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowLeft, User, Save } from 'lucide-react'
import { useToast } from '@/components/ui/use-toast'

export default function YeniMustahsilPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)

  const [formData, setFormData] = useState({
    ad: '',
    soyad: '',
    tcKimlikNo: '',
    dogumTarihi: '',
    cinsiyet: '',
    iletisim: '',
    adres: ''
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch('/api/mustahsil', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        const data = await response.json()
        toast({
          title: "Müstahsil Eklendi",
          description: `${data.ad} ${data.soyad} (${data.mustahsilNo}) başarıyla eklendi`,
          variant: "success",
        })
        router.push('/dashboard/mustahsil/liste')
      } else {
        const errorData = await response.json()
        toast({
          title: "Hata",
          description: errorData.error || "Müstahsil eklenirken hata oluştu",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error('Müstahsil ekleme hatası:', error)
      toast({
        title: "Hata",
        description: "Müstahsil eklenirken hata oluştu",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-4">
          <Link href="/dashboard/mustahsil">
            <Button variant="outline" size="sm">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Geri
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-foreground">Yeni Müstahsil</h1>
            <p className="text-muted-foreground">Yeni müstahsil kaydı ekleyin</p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="max-w-2xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Müstahsil Bilgileri
              </CardTitle>
              <CardDescription>Müstahsil kişisel ve iletişim bilgileri</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="ad">Ad *</Label>
                  <Input
                    id="ad"
                    value={formData.ad}
                    onChange={(e) => setFormData({...formData, ad: e.target.value})}
                    placeholder="Ad"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="soyad">Soyad *</Label>
                  <Input
                    id="soyad"
                    value={formData.soyad}
                    onChange={(e) => setFormData({...formData, soyad: e.target.value})}
                    placeholder="Soyad"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="tcKimlikNo">TC Kimlik No *</Label>
                  <Input
                    id="tcKimlikNo"
                    value={formData.tcKimlikNo}
                    onChange={(e) => setFormData({...formData, tcKimlikNo: e.target.value})}
                    placeholder="12345678901"
                    maxLength={11}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dogumTarihi">Doğum Tarihi *</Label>
                  <Input
                    id="dogumTarihi"
                    type="date"
                    value={formData.dogumTarihi}
                    onChange={(e) => setFormData({...formData, dogumTarihi: e.target.value})}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="cinsiyet">Cinsiyet *</Label>
                  <Select
                    value={formData.cinsiyet}
                    onValueChange={(value) => setFormData({...formData, cinsiyet: value})}
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Cinsiyet seçin" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ERKEK">Erkek</SelectItem>
                      <SelectItem value="KADIN">Kadın</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="iletisim">İletişim</Label>
                  <Input
                    id="iletisim"
                    value={formData.iletisim}
                    onChange={(e) => setFormData({...formData, iletisim: e.target.value})}
                    placeholder="Telefon numarası"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="adres">Adres</Label>
                <Input
                  id="adres"
                  value={formData.adres}
                  onChange={(e) => setFormData({...formData, adres: e.target.value})}
                  placeholder="Adres bilgisi"
                />
              </div>

              <div className="pt-4">
                <Button type="submit" className="w-full" disabled={loading}>
                  <Save className="mr-2 h-4 w-4" />
                  {loading ? "Ekleniyor..." : "Müstahsil Ekle"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </form>
    </div>
  )
}
