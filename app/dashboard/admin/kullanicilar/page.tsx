'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  Users,
  Eye,
  Shield
} from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface User {
  id: string
  firstName: string
  lastName: string
  email: string
  contactEmail?: string | null
  phone?: string | null
  role: string
  gender?: string | null
  birthDate?: string | null
  createdAt: string
  status: string
  lastLoginAt?: string | null
  lastLogoutAt?: string | null
}

export default function KullaniciYonetimi() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState('')
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingUser, setEditingUser] = useState<User | null>(null)
  const [users, setUsers] = useState<User[]>([])
  const [filteredUsers, setFilteredUsers] = useState<User[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isLogsOpen, setIsLogsOpen] = useState(false)
  const [logs, setLogs] = useState<any[]>([])
  const [formData, setFormData] = useState<any>({
    firstName: '',
    lastName: '',
    email: '',
    contactEmail: '',
    phone: '',
    password: '',
    role: '',
    gender: '',
    birthDate: ''
  })

  // Kullanıcıları getir
  const fetchUsers = async () => {
    try {
      const response = await fetch('/api/users')
      if (response.ok) {
        const data = await response.json()
        setUsers(data)
        setFilteredUsers(data)
      } else {
        console.error('Kullanıcılar yüklenirken hata oluştu')
      }
    } catch (error) {
      console.error('Kullanıcılar getirilemedi:', error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login')
    } else if (session && (session.user as any)?.role !== 'ADMIN') {
      router.push('/dashboard')
    } else if (status === 'authenticated') {
      fetchUsers()
    }
  }, [status, session, router])

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

  // Arama filtreleme
  useEffect(() => {
    if (searchTerm) {
      const filtered = users.filter(user =>
        user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.role.toLowerCase().includes(searchTerm.toLowerCase())
      )
      setFilteredUsers(filtered)
    } else {
      setFilteredUsers(users)
    }
  }, [searchTerm, users])

  if (status === 'loading' || isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Yükleniyor...</p>
        </div>
      </div>
    )
  }

  if (!session || (session.user as any)?.role !== 'ADMIN') {
    return null
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const method = editingUser ? 'PATCH' : 'POST'
    const url = editingUser ? `/api/users/${editingUser.id}` : '/api/users'
    const payload = { ...formData }
    if (!payload.password) delete payload.password
    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
    if (!res.ok) {
      console.error('Kullanıcı kaydetme hatası')
    }
    await fetchUsers()
    setIsDialogOpen(false)
    setFormData({ firstName: '', lastName: '', email: '', contactEmail: '', phone: '', password: '', role: '', gender: '', birthDate: '' })
    setEditingUser(null)
  }

  const handleEdit = (user: any) => {
    setEditingUser(user)
    setFormData({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      contactEmail: user.contactEmail || '',
      phone: user.phone || '',
      password: '',
      role: user.role,
      gender: user.gender || '',
      birthDate: user.birthDate ? user.birthDate.substring(0,10) : ''
    })
    setIsDialogOpen(true)
  }

  const handleDelete = async (userId: string) => {
    if (confirm('Bu kullanıcıyı silmek istediğinizden emin misiniz?')) {
      await fetch(`/api/users/${userId}`, { method: 'DELETE' })
      await fetchUsers()
    }
  }

  const openLogs = async (userId: string) => {
    const res = await fetch(`/api/users/${userId}/activity`)
    if (res.ok) {
      const data = await res.json()
      setLogs(data)
      setIsLogsOpen(true)
    }
  }

  const getRoleLabel = (role: string) => {
    const roleLabels: { [key: string]: string } = {
      'ADMIN': 'Admin',
      'MAL_KABULCU': 'Mal Kabulcu',
      'SATIN_ALMACI': 'Satın Almacı',
      'MUHASEBE': 'Muhasebe'
    }
    return roleLabels[role] || role
  }

  const getRoleColor = (role: string) => {
    const roleColors: { [key: string]: string } = {
      'ADMIN': 'bg-red-100 text-red-800',
      'MAL_KABULCU': 'bg-blue-100 text-blue-800',
      'SATIN_ALMACI': 'bg-green-100 text-green-800',
      'MUHASEBE': 'bg-purple-100 text-purple-800'
    }
    return roleColors[role] || 'bg-gray-100 text-gray-800'
  }

  return (
    
      <div className="p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Kullanıcı Yönetimi</h1>
            <p className="text-muted-foreground">Sistem kullanıcılarını yönetin</p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Yeni Kullanıcı
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>
                  {editingUser ? 'Kullanıcı Düzenle' : 'Yeni Kullanıcı Ekle'}
                </DialogTitle>
                <DialogDescription>
                  {editingUser ? 'Kullanıcı bilgilerini güncelleyin' : 'Yeni kullanıcı bilgilerini girin'}
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmit}>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">Ad</Label>
                      <Input id="firstName" value={formData.firstName} onChange={(e) => setFormData({...formData, firstName: e.target.value})} required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Soyad</Label>
                      <Input id="lastName" value={formData.lastName} onChange={(e) => setFormData({...formData, lastName: e.target.value})} required />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Giriş E-postası</Label>
                      <Input id="email" type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="contactEmail">İletişim E-postası</Label>
                      <Input id="contactEmail" type="email" value={formData.contactEmail} onChange={(e) => setFormData({...formData, contactEmail: e.target.value})} />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="phone">Telefon</Label>
                      <Input id="phone" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="gender">Cinsiyet</Label>
                      <Select value={formData.gender} onValueChange={(value) => setFormData({...formData, gender: value})}>
                        <SelectTrigger>
                          <SelectValue placeholder="Seçin" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="ERKEK">Erkek</SelectItem>
                          <SelectItem value="KADIN">Kadın</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="birthDate">Doğum Tarihi</Label>
                      <Input id="birthDate" type="date" value={formData.birthDate} onChange={(e) => setFormData({...formData, birthDate: e.target.value})} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="role">Rol</Label>
                      <Select value={formData.role} onValueChange={(value) => setFormData({...formData, role: value})}>
                        <SelectTrigger>
                          <SelectValue placeholder="Rol seçin" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="ADMIN">Admin</SelectItem>
                          <SelectItem value="MAL_KABULCU">Mal Kabulcu</SelectItem>
                          <SelectItem value="SATIN_ALMACI">Satın Almacı</SelectItem>
                          <SelectItem value="MUHASEBE">Muhasebe</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">{editingUser ? 'Yeni Şifre (boş bırakabilirsiniz)' : 'Şifre'}</Label>
                    <Input id="password" type="password" value={formData.password} onChange={(e) => setFormData({...formData, password: e.target.value})} required={!editingUser} />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                    İptal
                  </Button>
                  <Button type="submit">
                    {editingUser ? 'Güncelle' : 'Oluştur'}
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Search */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Kullanıcı ara..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardContent>
        </Card>

        {/* Users Table */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Kullanıcı Listesi
            </CardTitle>
            <CardDescription>Toplam {filteredUsers.length} kullanıcı</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b bg-muted/50">
                    <th className="text-left py-3 px-2 font-medium">Ad Soyad</th>
                    <th className="text-left py-3 px-2 font-medium">Giriş E-posta</th>
                    <th className="text-left py-3 px-2 font-medium">İletişim E-posta</th>
                    <th className="text-left py-3 px-2 font-medium">Telefon</th>
                    <th className="text-left py-3 px-2 font-medium">Rol</th>
                    <th className="text-left py-3 px-2 font-medium">Son Giriş</th>
                    <th className="text-left py-3 px-2 font-medium">İşlemler</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((user) => (
                    <tr key={user.id} className="border-b hover:bg-muted/50">
                      <td className="py-3 px-2 font-medium">{user.firstName} {user.lastName}</td>
                      <td className="py-3 px-2">{user.email}</td>
                      <td className="py-3 px-2">{user.contactEmail || '-'}</td>
                      <td className="py-3 px-2">{user.phone || '-'}</td>
                      <td className="py-3 px-2">
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getRoleColor(user.role)}`}>
                          <Shield className="mr-1 h-3 w-3" />{getRoleLabel(user.role)}
                        </span>
                      </td>
                      <td className="py-3 px-2 text-sm text-muted-foreground">{user.lastLoginAt ? new Date(user.lastLoginAt).toLocaleString('tr-TR') : '-'}</td>
                      <td className="py-3 px-2">
                        <div className="flex items-center gap-1">
                          <Button variant="ghost" size="sm" onClick={() => handleEdit(user)}>
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm" onClick={() => openLogs(user.id)}>
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm" onClick={() => handleDelete(user.id)}>
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
        <Dialog open={isLogsOpen} onOpenChange={setIsLogsOpen}>
          <DialogContent className="sm:max-w-[700px]">
            <DialogHeader>
              <DialogTitle>Kullanıcı Aktivite Logları</DialogTitle>
              <DialogDescription>Son 50 işlem</DialogDescription>
            </DialogHeader>
            <div className="max-h-[60vh] overflow-y-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b bg-muted/50">
                    <th className="text-left py-2 px-2 text-sm">Tarih</th>
                    <th className="text-left py-2 px-2 text-sm">Aksiyon</th>
                    <th className="text-left py-2 px-2 text-sm">Detay</th>
                  </tr>
                </thead>
                <tbody>
                  {logs.map((l) => (
                    <tr key={l.id} className="border-b">
                      <td className="py-2 px-2 text-sm text-muted-foreground">{new Date(l.createdAt).toLocaleString('tr-TR')}</td>
                      <td className="py-2 px-2 text-sm font-medium">{l.action}</td>
                      <td className="py-2 px-2 text-sm">{l.metadata ? JSON.stringify(l.metadata) : '-'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    
  )
}
