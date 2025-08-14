'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { useToast } from '@/components/ui/use-toast'
import { Plus, Edit, Trash2, Search, User } from 'lucide-react'
import Link from 'next/link'

interface Mustahsil {
  id: string
  ad: string
  soyad: string
  tcKimlikNo: string
  dogumTarihi: string
  mustahsilNo: string
  cinsiyet: string
  iletisim: string
  adres: string
  bankaAdi: string
  ibanAdresi: string
  durum: 'AKTIF' | 'PASIF'
  createdAt: string
  updatedAt: string
}

export default function MustahsilPage() {
  const [mustahsil, setMustahsil] = useState<Mustahsil[]>([])
  const [filteredMustahsil, setFilteredMustahsil] = useState<Mustahsil[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedDurum, setSelectedDurum] = useState<string>('all')
  const [isLoading, setIsLoading] = useState(true)
  const { toast } = useToast()

  // Müstahsil listesini getir
  const fetchMustahsil = async () => {
    try {
      const response = await fetch('/api/mustahsil')
      if (response.ok) {
        const data = await response.json()
        setMustahsil(data)
        setFilteredMustahsil(data)
      }
    } catch (error) {
      console.error('Müstahsil listesi getirilemedi:', error)
      toast({
        title: "Hata",
        description: "Müstahsil listesi yüklenirken hata oluştu",
        variant: "destructive"
      })
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchMustahsil()
  }, [])

  // Arama ve filtreleme
  useEffect(() => {
    let filtered = mustahsil

    // Arama filtreleme
    if (searchTerm) {
      filtered = filtered.filter(m =>
        m.ad.toLowerCase().includes(searchTerm.toLowerCase()) ||
        m.soyad.toLowerCase().includes(searchTerm.toLowerCase()) ||
        m.tcKimlikNo.includes(searchTerm) ||
        m.mustahsilNo.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // Durum filtreleme
    if (selectedDurum !== 'all') {
      filtered = filtered.filter(m => m.durum === selectedDurum)
    }

    setFilteredMustahsil(filtered)
  }, [searchTerm, selectedDurum, mustahsil])

  // Müstahsil sil
  const handleDelete = async (id: string) => {
    if (!confirm('Bu müstahsil kaydını silmek istediğinizden emin misiniz?')) return

    try {
      const response = await fetch(`/api/mustahsil/${id}`, {
        method: 'DELETE'
      })

      if (response.ok) {
        toast({
          title: "Başarılı",
          description: "Müstahsil kaydı başarıyla silindi"
        })
        fetchMustahsil()
      } else {
        toast({
          title: "Hata",
          description: "Müstahsil kaydı silinirken hata oluştu",
          variant: "destructive"
        })
      }
    } catch (error) {
      toast({
        title: "Hata",
        description: "Müstahsil kaydı silinirken hata oluştu",
        variant: "destructive"
      })
    }
  }

  // Durum değiştir
  const toggleDurum = async (mustahsil: Mustahsil) => {
    const newStatus = mustahsil.durum === 'AKTIF' ? 'PASIF' : 'AKTIF'
    
    try {
      const response = await fetch(`/api/mustahsil/${mustahsil.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ durum: newStatus })
      })

      if (response.ok) {
        toast({
          title: "Başarılı",
          description: `Müstahsil durumu ${newStatus === 'AKTIF' ? 'aktif' : 'pasif'} yapıldı`
        })
        fetchMustahsil()
      } else {
        toast({
          title: "Hata",
          description: "Durum güncellenirken hata oluştu",
          variant: "destructive"
        })
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
      <div className="p-6">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <User className="h-12 w-12 mx-auto mb-4 animate-pulse text-muted-foreground" />
            <p>Müstahsil listesi yükleniyor...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Müstahsil Listesi</h1>
          <p className="text-muted-foreground">Sistemdeki tüm müstahsil kayıtlarını görüntüleyin</p>
        </div>
        <Link href="/dashboard/mustahsil/yeni">
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Yeni Müstahsil
          </Button>
        </Link>
      </div>

      {/* Arama */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          placeholder="Ad, soyad, TC kimlik no veya müstahsil no ara..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Filtreler */}
      <div className="flex flex-wrap gap-4">
        <div className="flex items-center gap-2">
          <label className="text-sm font-medium">Durum:</label>
          <select
            value={selectedDurum}
            onChange={(e) => setSelectedDurum(e.target.value)}
            className="px-3 py-1 text-sm border rounded-md bg-background"
          >
            <option value="all">Tümü</option>
            <option value="AKTIF">Aktif</option>
            <option value="PASIF">Pasif</option>
          </select>
        </div>

        {(selectedDurum !== 'all' || searchTerm) && (
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setSearchTerm('')
              setSelectedDurum('all')
            }}
          >
            Filtreleri Temizle
          </Button>
        )}
      </div>

      {/* Tablo */}
      <div className="border rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted/50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Müstahsil No
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Ad Soyad
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  TC Kimlik No
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Doğum Tarihi
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Cinsiyet
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
              {filteredMustahsil.map((m, index) => (
                <tr key={m.id} className={index % 2 === 0 ? 'bg-background' : 'bg-muted/30'}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="font-mono text-sm bg-muted px-2 py-1 rounded">
                      {m.mustahsilNo}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap font-medium">
                    {m.ad} {m.soyad}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    {m.tcKimlikNo}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    {new Date(m.dogumTarihi).toLocaleDateString('tr-TR')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    {m.cinsiyet}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Badge variant={m.durum === 'AKTIF' ? 'default' : 'secondary'}>
                      {m.durum}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => toggleDurum(m)}
                      >
                        {m.durum === 'AKTIF' ? 'Pasif Yap' : 'Aktif Yap'}
                      </Button>
                      <Link href={`/dashboard/mustahsil/duzenle/${m.id}`}>
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </Link>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDelete(m.id)}
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
      </div>

      {filteredMustahsil.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          {searchTerm ? 'Arama sonucu bulunamadı' : 'Henüz müstahsil kaydı eklenmemiş'}
        </div>
      )}

      {/* İstatistikler */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-muted/50 p-4 rounded-lg">
          <div className="text-2xl font-bold">{mustahsil.length}</div>
          <div className="text-sm text-muted-foreground">Toplam Müstahsil</div>
        </div>
        <div className="bg-muted/50 p-4 rounded-lg">
          <div className="text-2xl font-bold">{mustahsil.filter(m => m.durum === 'AKTIF').length}</div>
          <div className="text-sm text-muted-foreground">Aktif Müstahsil</div>
        </div>
        <div className="bg-muted/50 p-4 rounded-lg">
          <div className="text-2xl font-bold">{mustahsil.filter(m => m.durum === 'PASIF').length}</div>
          <div className="text-sm text-muted-foreground">Pasif Müstahsil</div>
        </div>
      </div>
    </div>
  )
}
