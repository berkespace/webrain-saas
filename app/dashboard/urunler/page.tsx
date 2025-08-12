'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { useToast } from '@/components/ui/use-toast'
import { Plus, Edit, Trash2, Search, Eye, Package } from 'lucide-react'
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

export default function UrunlerPage() {
  const [urunler, setUrunler] = useState<Urun[]>([])
  const [filteredUrunler, setFilteredUrunler] = useState<Urun[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const { toast } = useToast()

  // Ürünleri getir
  const fetchUrunler = async () => {
    try {
      const response = await fetch('/api/urunler')
      if (response.ok) {
        const data = await response.json()
        setUrunler(data)
        setFilteredUrunler(data)
      }
    } catch (error) {
      console.error('Ürünler getirilemedi:', error)
      toast({
        title: "Hata",
        description: "Ürünler yüklenirken hata oluştu",
        variant: "destructive"
      })
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchUrunler()
  }, [])

  // Arama filtreleme
  useEffect(() => {
    if (searchTerm) {
      const filtered = urunler.filter(urun =>
        urun.ad.toLowerCase().includes(searchTerm.toLowerCase()) ||
        urun.stokKodu.toLowerCase().includes(searchTerm.toLowerCase()) ||
        urun.kategori.toLowerCase().includes(searchTerm.toLowerCase())
      )
      setFilteredUrunler(filtered)
    } else {
      setFilteredUrunler(urunler)
    }
  }, [searchTerm, urunler])

  // Ürün sil
  const handleDelete = async (id: string) => {
    if (!confirm('Bu ürünü silmek istediğinizden emin misiniz?')) return

    try {
      const response = await fetch(`/api/urunler/${id}`, {
        method: 'DELETE'
      })

      if (response.ok) {
        toast({
          title: "Başarılı",
          description: "Ürün silindi"
        })
        fetchUrunler()
      } else {
        const error = await response.json()
        throw new Error(error.error || 'Silme işlemi başarısız')
      }
    } catch (error: any) {
      toast({
        title: "Hata",
        description: error.message || "Ürün silinirken hata oluştu",
        variant: "destructive"
      })
    }
  }

  // Durum değiştir
  const toggleDurum = async (urun: Urun) => {
    try {
      const response = await fetch(`/api/urunler/${urun.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...urun,
          durum: urun.durum === 'AKTIF' ? 'PASIF' : 'AKTIF'
        })
      })

      if (response.ok) {
        toast({
          title: "Başarılı",
          description: "Ürün durumu güncellendi"
        })
        fetchUrunler()
      }
    } catch (error) {
      toast({
        title: "Hata",
        description: "Durum güncellenirken hata oluştu",
        variant: "destructive"
      })
    }
  }

  if (isLoading) {
    return (
      <div className="container mx-auto p-6">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <Package className="h-12 w-12 mx-auto mb-4 animate-pulse text-muted-foreground" />
            <p>Ürünler yükleniyor...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Ürünler</h1>
          <p className="text-muted-foreground">Sistemdeki tüm ürünleri yönetin</p>
        </div>
        <Link href="/dashboard/urunler/yeni">
          <Button className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Yeni Ürün
          </Button>
        </Link>
      </div>

      {/* Arama */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          placeholder="Ürün adı, stok kodu veya kategori ara..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Tablo */}
      <div className="border rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted/50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Stok Kodu
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Ürün Adı
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Kategori
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Birim
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Durum
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  İşlemler
                </th>
              </tr>
            </thead>
            <tbody className="bg-background divide-y divide-border">
              {filteredUrunler.map((urun, index) => (
                <tr key={urun.id} className={index % 2 === 0 ? 'bg-background' : 'bg-muted/30'}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="font-mono text-sm bg-muted px-2 py-1 rounded">
                      {urun.stokKodu}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap font-medium">
                    {urun.ad}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground">
                    {urun.kategori || '-'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    {urun.birim}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Badge variant={urun.durum === 'AKTIF' ? 'default' : 'secondary'}>
                      {urun.durum}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => toggleDurum(urun)}
                      >
                        {urun.durum === 'AKTIF' ? 'Pasif Yap' : 'Aktif Yap'}
                      </Button>
                      <Link href={`/dashboard/urunler/duzenle/${urun.id}`}>
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </Link>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDelete(urun.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredUrunler.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            {searchTerm ? 'Arama sonucu bulunamadı' : 'Henüz ürün eklenmemiş'}
          </div>
        )}
      </div>

      {/* İstatistikler */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-muted/50 p-4 rounded-lg">
          <div className="text-2xl font-bold">{urunler.length}</div>
          <div className="text-sm text-muted-foreground">Toplam Ürün</div>
        </div>
        <div className="bg-muted/50 p-4 rounded-lg">
          <div className="text-2xl font-bold">{urunler.filter(u => u.durum === 'AKTIF').length}</div>
          <div className="text-sm text-muted-foreground">Aktif Ürün</div>
        </div>
        <div className="bg-muted/50 p-4 rounded-lg">
          <div className="text-2xl font-bold">{urunler.filter(u => u.durum === 'PASIF').length}</div>
          <div className="text-sm text-muted-foreground">Pasif Ürün</div>
        </div>
      </div>
    </div>
  )
}
