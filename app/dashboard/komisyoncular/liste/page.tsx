'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  Users,
  Building2,
  Phone,
  MapPin
} from 'lucide-react'
import { DashboardLayout } from '@/components/layout/dashboard-layout'
import Link from 'next/link'

// Mock komisyoncu verileri
const mockKomisyoncular = [
  {
    id: 1,
    vkn: '1234567890',
    komisyonNo: 'KOM001',
    dukkanAdi: 'CİHAN TARIM',
    yetkiliAdi: 'Cihan Yılmaz',
    yetkiliTelefon: '0532 123 45 67',
    sehir: 'Antalya',
    durum: 'AKTIF',
    createdAt: '2024-01-01'
  },
  {
    id: 2,
    vkn: '0987654321',
    komisyonNo: 'KOM002',
    dukkanAdi: 'ÇALDIR KOM',
    yetkiliAdi: 'Mehmet Çaldır',
    yetkiliTelefon: '0533 987 65 43',
    sehir: 'Mersin',
    durum: 'AKTIF',
    createdAt: '2024-01-02'
  },
  {
    id: 3,
    vkn: null,
    komisyonNo: 'KOM003',
    dukkanAdi: 'DURDAŞLAR',
    yetkiliAdi: null,
    yetkiliTelefon: null,
    sehir: 'Adana',
    durum: 'AKTIF',
    createdAt: '2024-01-03'
  }
]

export default function KomisyoncuListesi() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login')
    }
  }, [status, router])

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Yükleniyor...</p>
        </div>
      </div>
    )
  }

  if (!session) {
    return null
  }

  const filteredKomisyoncular = mockKomisyoncular.filter(komisyoncu => 
    komisyoncu.dukkanAdi.toLowerCase().includes(searchTerm.toLowerCase()) ||
    komisyoncu.komisyonNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
    komisyoncu.sehir.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (komisyoncu.yetkiliAdi && komisyoncu.yetkiliAdi.toLowerCase().includes(searchTerm.toLowerCase()))
  )

  const handleDelete = (id: number) => {
    if (confirm('Bu komisyoncuyu silmek istediğinizden emin misiniz?')) {
      console.log('Delete komisyoncu:', id)
    }
  }

  return (
    <DashboardLayout>
      <div className="p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Komisyoncu Yönetimi</h1>
            <p className="text-muted-foreground">Komisyoncu listesi ve yönetimi</p>
          </div>
          <Link href="/dashboard/komisyoncular/yeni">
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Yeni Komisyoncu
            </Button>
          </Link>
        </div>

        {/* Search */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Komisyoncu ara..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardContent>
        </Card>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Toplam Komisyoncu</p>
                  <p className="text-2xl font-bold">{mockKomisyoncular.length}</p>
                </div>
                <Building2 className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Aktif Komisyoncu</p>
                  <p className="text-2xl font-bold text-green-500">
                    {mockKomisyoncular.filter(k => k.durum === 'AKTIF').length}
                  </p>
                </div>
                <Users className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Pasif Komisyoncu</p>
                  <p className="text-2xl font-bold text-red-500">
                    {mockKomisyoncular.filter(k => k.durum === 'PASIF').length}
                  </p>
                </div>
                <Users className="h-8 w-8 text-red-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Komisyoncular Table */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building2 className="h-5 w-5" />
              Komisyoncu Listesi
            </CardTitle>
            <CardDescription>Toplam {filteredKomisyoncular.length} komisyoncu</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b bg-muted/50">
                    <th className="text-left py-3 px-2 font-medium">Komisyon No</th>
                    <th className="text-left py-3 px-2 font-medium">Dükkan Adı</th>
                    <th className="text-left py-3 px-2 font-medium">Yetkili</th>
                    <th className="text-left py-3 px-2 font-medium">Telefon</th>
                    <th className="text-left py-3 px-2 font-medium">Şehir</th>
                    <th className="text-left py-3 px-2 font-medium">VKN</th>
                    <th className="text-left py-3 px-2 font-medium">Durum</th>
                    <th className="text-left py-3 px-2 font-medium">İşlemler</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredKomisyoncular.map((komisyoncu) => (
                    <tr key={komisyoncu.id} className="border-b hover:bg-muted/50">
                      <td className="py-3 px-2 font-medium">{komisyoncu.komisyonNo}</td>
                      <td className="py-3 px-2">{komisyoncu.dukkanAdi}</td>
                      <td className="py-3 px-2">{komisyoncu.yetkiliAdi || '-'}</td>
                      <td className="py-3 px-2">
                        {komisyoncu.yetkiliTelefon ? (
                          <div className="flex items-center gap-1">
                            <Phone className="h-3 w-3 text-muted-foreground" />
                            {komisyoncu.yetkiliTelefon}
                          </div>
                        ) : '-'}
                      </td>
                      <td className="py-3 px-2">
                        <div className="flex items-center gap-1">
                          <MapPin className="h-3 w-3 text-muted-foreground" />
                          {komisyoncu.sehir}
                        </div>
                      </td>
                      <td className="py-3 px-2">{komisyoncu.vkn || '-'}</td>
                      <td className="py-3 px-2">
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                          komisyoncu.durum === 'AKTIF' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {komisyoncu.durum === 'AKTIF' ? 'Aktif' : 'Pasif'}
                        </span>
                      </td>
                      <td className="py-3 px-2">
                        <div className="flex items-center gap-1">
                          <Link href={`/dashboard/komisyoncular/duzenle/${komisyoncu.id}`}>
                            <Button variant="ghost" size="sm">
                              <Edit className="h-4 w-4" />
                            </Button>
                          </Link>
                          <Button variant="ghost" size="sm" onClick={() => handleDelete(komisyoncu.id)}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
