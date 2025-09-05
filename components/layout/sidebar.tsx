'use client'

import { useState, useEffect } from 'react'
import { useSession, signOut } from 'next-auth/react'
import { useRouter, usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { NotificationCenter } from '@/components/ui/notification-center'
import { 
  Package, 
  FileText, 
  Users, 
  Settings, 
  BarChart3, 
  Plus, 
  Search, 
  Filter,
  Download,
  Upload,
  Calendar,
  AlertTriangle,
  Home,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Building,
  Apple,
  CreditCard
} from 'lucide-react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { useTheme } from 'next-themes'
import Image from 'next/image'

interface SidebarItem {
  title: string
  href: string
  icon: React.ReactNode
  badge?: number
  children?: SidebarItem[]
}

export function Sidebar() {
  const { data: session } = useSession()
  const router = useRouter()
  const pathname = usePathname()
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [expandedItems, setExpandedItems] = useState<string[]>([])
  const { theme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const userRole = (session?.user as any)?.role

  // Tema değişikliğine göre logo seçimi
  const logoSrc = mounted && (resolvedTheme === 'dark' || theme === 'dark') ? '/logo.png' : '/logo-dark.png'

  // Rol bazlı menü yapısı
  const getSidebarItems = (): SidebarItem[] => {
    const baseItems: SidebarItem[] = [
      {
        title: 'Ana Sayfa',
        href: '/dashboard',
        icon: <Home className="h-4 w-4" />
      }
    ]

    // Mal kabulcü için sadece mal kabul menüleri
    if (userRole === 'MAL_KABULCU') {
      return [
        ...baseItems,
        {
          title: 'Mal Kabul İşlemleri',
          href: '#',
          icon: <Package className="h-4 w-4" />,
          children: [
            {
              title: 'Mal Kabul',
              href: '/dashboard/mal-kabul',
              icon: <Package className="h-4 w-4" />,
              badge: 12,
              children: [
                {
                  title: 'Yeni Mal Kabul',
                  href: '/dashboard/mal-kabul/yeni',
                  icon: <Plus className="h-4 w-4" />
                },
                {
                  title: 'Mal Kabul Listesi',
                  href: '/dashboard/mal-kabul/liste',
                  icon: <FileText className="h-4 w-4" />
                },
                {
                  title: 'Fiş Yazdır',
                  href: '/dashboard/mal-kabul/fis',
                  icon: <Download className="h-4 w-4" />
                }
              ]
            },
            {
              title: 'Komisyoncular',
              href: '/dashboard/komisyoncular/liste',
              icon: <Users className="h-4 w-4" />,
              children: [
                {
                  title: 'Komisyoncu Listesi',
                  href: '/dashboard/komisyoncular/liste',
                  icon: <Users className="h-4 w-4" />
                },
                {
                  title: 'Yeni Komisyoncu',
                  href: '/dashboard/komisyoncular/yeni',
                  icon: <Plus className="h-4 w-4" />
                }
              ]
            },
            {
              title: 'Üreticiler',
              href: '/dashboard/ureticiler/liste',
              icon: <Users className="h-4 w-4" />,
              children: [
                {
                  title: 'Üretici Listesi',
                  href: '/dashboard/ureticiler/liste',
                  icon: <Users className="h-4 w-4" />
                },
                {
                  title: 'Yeni Üretici',
                  href: '/dashboard/ureticiler/yeni',
                  icon: <Plus className="h-4 w-4" />
                }
              ]
            },
            {
              title: 'Müstahsil',
              href: '/dashboard/mustahsil/',
              icon: <Users className="h-4 w-4" />,
              children: [
                {
                  title: 'Müstahsil Listesi',
                  href: '/dashboard/mustahsil/',
                  icon: <Users className="h-4 w-4" />
                },
                {
                  title: 'Yeni Müstahsil',
                  href: '/dashboard/mustahsil/yeni',
                  icon: <Plus className="h-4 w-4" />
                }
              ]
            },
            {
              title: 'Özel Firmalar',
              href: '/dashboard/ozel-firmalar/liste',
              icon: <Building className="h-4 w-4" />,
              children: [
                {
                  title: 'Özel Firma Listesi',
                  href: '/dashboard/ozel-firmalar/liste',
                  icon: <Building className="h-4 w-4" />
                },
                {
                  title: 'Yeni Özel Firma',
                  href: '/dashboard/ozel-firmalar/yeni',
                  icon: <Plus className="h-4 w-4" />
                }
              ]
            },
            {
              title: 'Ambalajlar',
              href: '/dashboard/ambalajlar/liste',
              icon: <Package className="h-4 w-4" />,
              children: [
                {
                  title: 'Ambalaj Listesi',
                  href: '/dashboard/ambalajlar/liste',
                  icon: <Package className="h-4 w-4" />
                },
                {
                  title: 'Yeni Ambalaj',
                  href: '/dashboard/ambalajlar/yeni',
                  icon: <Plus className="h-4 w-4" />
                }
              ]
            },
            {
              title: 'Ürünler',
              href: '/dashboard/urunler',
              icon: <Apple className="h-4 w-4" />,
              children: [
                {
                  title: 'Ürün Listesi',
                  href: '/dashboard/urunler/liste',
                  icon: <Apple className="h-4 w-4" />
                },
                {
                  title: 'Yeni Ürün',
                  href: '/dashboard/urunler/yeni',
                  icon: <Plus className="h-4 w-4" />
                }
              ]
            }
          ]
        }
      ]
    }





    // Admin/Yönetici için tüm menüler
    if (userRole === 'ADMIN') {
      return [
        ...baseItems,
        {
          title: 'Mal Kabul İşlemleri',
          href: '#',
          icon: <Package className="h-4 w-4" />,
          children: [
            {
              title: 'Mal Kabul',
              href: '/dashboard/mal-kabul',
              icon: <Package className="h-4 w-4" />,
              badge: 12,
              children: [
                {
                  title: 'Yeni Mal Kabul',
                  href: '/dashboard/mal-kabul/yeni',
                  icon: <Plus className="h-4 w-4" />
                },
                {
                  title: 'Mal Kabul Listesi',
                  href: '/dashboard/mal-kabul/liste',
                  icon: <FileText className="h-4 w-4" />
                },
                {
                  title: 'Bekleyen Faturalar',
                  href: '/dashboard/mal-kabul/bekleyen',
                  icon: <AlertTriangle className="h-4 w-4" />,
                  badge: 8
                },
                {
                  title: 'Fiş Yazdır',
                  href: '/dashboard/mal-kabul/fis',
                  icon: <Download className="h-4 w-4" />
                }
              ]
            },
            {
              title: 'Komisyoncular',
              href: '/dashboard/komisyoncular',
              icon: <Users className="h-4 w-4" />,
              children: [
                {
                  title: 'Komisyoncu Listesi',
                  href: '/dashboard/komisyoncular/liste',
                  icon: <Users className="h-4 w-4" />
                },
                {
                  title: 'Yeni Komisyoncu',
                  href: '/dashboard/komisyoncular/yeni',
                  icon: <Plus className="h-4 w-4" />
                }
              ]
            },
            {
              title: 'Üreticiler',
              href: '/dashboard/ureticiler/liste',
              icon: <Users className="h-4 w-4" />,
              children: [
                {
                  title: 'Üretici Listesi',
                  href: '/dashboard/ureticiler/liste',
                  icon: <Users className="h-4 w-4" />
                },
                {
                  title: 'Yeni Üretici',
                  href: '/dashboard/ureticiler/yeni',
                  icon: <Plus className="h-4 w-4" />
                }
              ]
            },
            {
              title: 'Müstahsil',
              href: '/dashboard/mustahsil/liste',
              icon: <Users className="h-4 w-4" />,
              children: [
                {
                  title: 'Müstahsil Listesi',
                  href: '/dashboard/mustahsil/liste',
                  icon: <Users className="h-4 w-4" />
                },
                {
                  title: 'Yeni Müstahsil',
                  href: '/dashboard/mustahsil/yeni',
                  icon: <Plus className="h-4 w-4" />
                }
              ]
            },
            {
              title: 'Özel Firmalar',
              href: '/dashboard/ozel-firmalar',
              icon: <Building className="h-4 w-4" />,
              children: [
                {
                  title: 'Özel Firma Listesi',
                  href: '/dashboard/ozel-firmalar/liste',
                  icon: <Building className="h-4 w-4" />
                },
                {
                  title: 'Yeni Özel Firma',
                  href: '/dashboard/ozel-firmalar/yeni',
                  icon: <Plus className="h-4 w-4" />
                }
              ]
            },
            {
              title: 'Ambalajlar',
              href: '/dashboard/ambalajlar',
              icon: <Package className="h-4 w-4" />,
              children: [
                {
                  title: 'Ambalaj Listesi',
                  href: '/dashboard/ambalajlar/liste',
                  icon: <Package className="h-4 w-4" />
                },
                {
                  title: 'Yeni Ambalaj',
                  href: '/dashboard/ambalajlar/yeni',
                  icon: <Plus className="h-4 w-4" />
                }
              ]
            },
            {
              title: 'Ürünler',
              href: '/dashboard/urunler',
              icon: <Apple className="h-4 w-4" />,
              children: [
                {
                  title: 'Ürün Listesi',
                  href: '/dashboard/urunler/liste',
                  icon: <Apple className="h-4 w-4" />
                },
                {
                  title: 'Yeni Ürün',
                  href: '/dashboard/urunler/yeni',
                  icon: <Plus className="h-4 w-4" />
                }
              ]
            }
          ]
        },
        {
          title: 'Satın Alma İşlemleri',
          href: '#',
          icon: <FileText className="h-4 w-4" />,
          children: [
            {
              title: 'Genel Ürün Tablosu',
              href: '/dashboard/satin-alma/genel-urun-tablosu',
              icon: <FileText className="h-4 w-4" />
            },
            {
              title: 'Fatura Bekleyen Ürünler',
              href: '/dashboard/satin-alma/fatura-bekleyen-urunler',
              icon: <FileText className="h-4 w-4" />
            },
            {
              title: 'Raporlar',
              href: '/dashboard/satin-alma/raporlar',
              icon: <BarChart3 className="h-4 w-4" />,
              children: [
                {
                  title: 'Günlük Rapor',
                  href: '/dashboard/satin-alma/raporlar/gunluk',
                  icon: <Calendar className="h-4 w-4" />
                },
                {
                  title: 'Aylık Rapor',
                  href: '/dashboard/satin-alma/raporlar/aylik',
                  icon: <BarChart3 className="h-4 w-4" />
                },
                {
                  title: 'Ürün Raporu',
                  href: '/dashboard/satin-alma/raporlar/urun',
                  icon: <Package className="h-4 w-4" />
                }
              ]
            },
            {
              title: 'Fiyat Girişi',
              href: '/dashboard/satin-alma/fiyat',
              icon: <Plus className="h-4 w-4" />
            },
            {
              title: 'Fatura Oluştur',
              href: '/dashboard/satin-alma/fatura',
              icon: <FileText className="h-4 w-4" />
            },
            {
              title: 'Fatura Listesi',
              href: '/dashboard/satin-alma/faturalar',
              icon: <FileText className="h-4 w-4" />
            }
          ]
        },
        {
          title: 'Muhasebe İşlemleri',
          href: '#',
          icon: <BarChart3 className="h-4 w-4" />,
          children: [
            {
              title: 'Cari Hesaplar',
              href: '/dashboard/muhasebe/cari-hesaplar',
              icon: <CreditCard className="h-4 w-4" />
            },
            {
              title: 'Satın Alım Faturaları',
              href: '/dashboard/muhasebe/satin-alim-faturalari',
              icon: <FileText className="h-4 w-4" />
            },
            {
              title: 'Genel Ürün Tablosu',
              href: '/dashboard/muhasebe/genel-urun-tablosu',
              icon: <FileText className="h-4 w-4" />
            },
            {
              title: 'Finansal Raporlar',
              href: '/dashboard/muhasebe/raporlar',
              icon: <BarChart3 className="h-4 w-4" />
            },
            {
              title: 'Ödeme Takibi',
              href: '/dashboard/muhasebe/odemeler',
              icon: <FileText className="h-4 w-4" />
            }
          ]
        },
        {
          title: 'Sistem Yönetimi',
          href: '#',
          icon: <Settings className="h-4 w-4" />,
          children: [
            {
              title: 'Kullanıcı Yönetimi',
              href: '/dashboard/admin/kullanicilar',
              icon: <Users className="h-4 w-4" />
            },
            {
              title: 'Sistem Ayarları',
              href: '/dashboard/admin/ayarlar',
              icon: <Settings className="h-4 w-4" />
            },
            {
              title: 'Gelişmiş Raporlar',
              href: '/dashboard/admin/gelismis-raporlar',
              icon: <BarChart3 className="h-4 w-4" />
            }
          ]
        }
      ]
    }

    // Satın almacı için sadece satın alma ve cari hesaplar menüleri
    if (userRole === 'SATIN_ALMACI') {
      return [
        ...baseItems,
        {
          title: 'Satın Alma İşlemleri',
          href: '#',
          icon: <FileText className="h-4 w-4" />,
          children: [
            {
              title: 'Genel Ürün Tablosu',
              href: '/dashboard/satin-alma/genel-urun-tablosu',
              icon: <FileText className="h-4 w-4" />
            },
            {
              title: 'Fatura Bekleyen Ürünler',
              href: '/dashboard/satin-alma/fatura-bekleyen-urunler',
              icon: <FileText className="h-4 w-4" />
            },
            {
              title: 'Raporlar',
              href: '/dashboard/satin-alma/raporlar',
              icon: <BarChart3 className="h-4 w-4" />,
              children: [
                {
                  title: 'Günlük Rapor',
                  href: '/dashboard/satin-alma/raporlar/gunluk',
                  icon: <Calendar className="h-4 w-4" />
                },
                {
                  title: 'Aylık Rapor',
                  href: '/dashboard/satin-alma/raporlar/aylik',
                  icon: <BarChart3 className="h-4 w-4" />
                },
                {
                  title: 'Ürün Raporu',
                  href: '/dashboard/satin-alma/raporlar/urun',
                  icon: <Package className="h-4 w-4" />
                }
              ]
            },
            {
              title: 'Fiyat Girişi',
              href: '/dashboard/satin-alma/fiyat',
              icon: <Plus className="h-4 w-4" />
            },
            {
              title: 'Fatura Oluştur',
              href: '/dashboard/satin-alma/fatura',
              icon: <FileText className="h-4 w-4" />
            },
            {
              title: 'Fatura Listesi',
              href: '/dashboard/satin-alma/faturalar',
              icon: <FileText className="h-4 w-4" />
            },
            {
              title: 'Cari Hesaplar',
              href: '/dashboard/muhasebe/cari-hesaplar',
              icon: <CreditCard className="h-4 w-4" />
            }
          ]
        }
      ]
    }

    // Muhasebeci için hem mal kabul hem satın alma menüleri
    if (userRole === 'MUHASEBECI' || userRole === 'MUHASEBE') {
      return [
        ...baseItems,
        {
          title: 'Mal Kabul İşlemleri',
          href: '#',
          icon: <Package className="h-4 w-4" />,
          children: [
            {
              title: 'Mal Kabul',
              href: '/dashboard/mal-kabul',
              icon: <Package className="h-4 w-4" />,
              badge: 12,
              children: [
                {
                  title: 'Yeni Mal Kabul',
                  href: '/dashboard/mal-kabul/yeni',
                  icon: <Plus className="h-4 w-4" />
                },
                {
                  title: 'Mal Kabul Listesi',
                  href: '/dashboard/mal-kabul/liste',
                  icon: <FileText className="h-4 w-4" />
                },
                {
                  title: 'Fiş Yazdır',
                  href: '/dashboard/mal-kabul/fis',
                  icon: <Download className="h-4 w-4" />
                }
              ]
            },
            {
              title: 'Komisyoncular',
              href: '/dashboard/komisyoncular/liste',
              icon: <Users className="h-4 w-4" />,
              children: [
                {
                  title: 'Komisyoncu Listesi',
                  href: '/dashboard/komisyoncular/liste',
                  icon: <Users className="h-4 w-4" />
                },
                {
                  title: 'Yeni Komisyoncu',
                  href: '/dashboard/komisyoncular/yeni',
                  icon: <Plus className="h-4 w-4" />
                }
              ]
            },
            {
              title: 'Üreticiler',
              href: '/dashboard/ureticiler/liste',
              icon: <Users className="h-4 w-4" />,
              children: [
                {
                  title: 'Üretici Listesi',
                  href: '/dashboard/ureticiler/liste',
                  icon: <Users className="h-4 w-4" />
                },
                {
                  title: 'Yeni Üretici',
                  href: '/dashboard/ureticiler/yeni',
                  icon: <Plus className="h-4 w-4" />
                }
              ]
            },
            {
              title: 'Müstahsil',
              href: '/dashboard/mustahsil/',
              icon: <Users className="h-4 w-4" />,
              children: [
                {
                  title: 'Müstahsil Listesi',
                  href: '/dashboard/mustahsil/',
                  icon: <Users className="h-4 w-4" />
                },
                {
                  title: 'Yeni Müstahsil',
                  href: '/dashboard/mustahsil/yeni',
                  icon: <Plus className="h-4 w-4" />
                }
              ]
            },
            {
              title: 'Özel Firmalar',
              href: '/dashboard/ozel-firmalar/liste',
              icon: <Building className="h-4 w-4" />,
              children: [
                {
                  title: 'Özel Firma Listesi',
                  href: '/dashboard/ozel-firmalar/liste',
                  icon: <Building className="h-4 w-4" />
                },
                {
                  title: 'Yeni Özel Firma',
                  href: '/dashboard/ozel-firmalar/yeni',
                  icon: <Plus className="h-4 w-4" />
                }
              ]
            },
            {
              title: 'Ambalajlar',
              href: '/dashboard/ambalajlar/liste',
              icon: <Package className="h-4 w-4" />,
              children: [
                {
                  title: 'Ambalaj Listesi',
                  href: '/dashboard/ambalajlar/liste',
                  icon: <Package className="h-4 w-4" />
                },
                {
                  title: 'Yeni Ambalaj',
                  href: '/dashboard/ambalajlar/yeni',
                  icon: <Plus className="h-4 w-4" />
                }
              ]
            },
            {
              title: 'Ürünler',
              href: '/dashboard/urunler',
              icon: <Apple className="h-4 w-4" />,
              children: [
                {
                  title: 'Ürün Listesi',
                  href: '/dashboard/urunler/liste',
                  icon: <Apple className="h-4 w-4" />
                },
                {
                  title: 'Yeni Ürün',
                  href: '/dashboard/urunler/yeni',
                  icon: <Plus className="h-4 w-4" />
                }
              ]
            }
          ]
        },
        {
          title: 'Satın Alma İşlemleri',
          href: '#',
          icon: <FileText className="h-4 w-4" />,
          children: [
            {
              title: 'Genel Ürün Tablosu',
              href: '/dashboard/satin-alma/genel-urun-tablosu',
              icon: <FileText className="h-4 w-4" />
            },
            {
              title: 'Fatura Bekleyen Ürünler',
              href: '/dashboard/satin-alma/fatura-bekleyen-urunler',
              icon: <FileText className="h-4 w-4" />
            },
            {
              title: 'Raporlar',
              href: '/dashboard/satin-alma/raporlar',
              icon: <BarChart3 className="h-4 w-4" />,
              children: [
                {
                  title: 'Günlük Rapor',
                  href: '/dashboard/satin-alma/raporlar/gunluk',
                  icon: <Calendar className="h-4 w-4" />
                },
                {
                  title: 'Aylık Rapor',
                  href: '/dashboard/satin-alma/raporlar/aylik',
                  icon: <BarChart3 className="h-4 w-4" />
                },
                {
                  title: 'Ürün Raporu',
                  href: '/dashboard/satin-alma/raporlar/urun',
                  icon: <Package className="h-4 w-4" />
                }
              ]
            },
            {
              title: 'Fiyat Girişi',
              href: '/dashboard/satin-alma/fiyat',
              icon: <Plus className="h-4 w-4" />
            },
            {
              title: 'Fatura Oluştur',
              href: '/dashboard/satin-alma/fatura',
              icon: <FileText className="h-4 w-4" />
            },
            {
              title: 'Fatura Listesi',
              href: '/dashboard/satin-alma/faturalar',
              icon: <FileText className="h-4 w-4" />
            }
          ]
        },
        {
          title: 'Muhasebe İşlemleri',
          href: '#',
          icon: <BarChart3 className="h-4 w-4" />,
          children: [
            {
              title: 'Cari Hesaplar',
              href: '/dashboard/muhasebe/cari-hesaplar',
              icon: <CreditCard className="h-4 w-4" />
            },
            {
              title: 'Satın Alım Faturaları',
              href: '/dashboard/muhasebe/satin-alim-faturalari',
              icon: <FileText className="h-4 w-4" />
            },
            {
              title: 'Genel Ürün Tablosu',
              href: '/dashboard/muhasebe/genel-urun-tablosu',
              icon: <FileText className="h-4 w-4" />
            },
            {
              title: 'Finansal Raporlar',
              href: '/dashboard/muhasebe/raporlar',
              icon: <BarChart3 className="h-4 w-4" />
            },
            {
              title: 'Ödeme Takibi',
              href: '/dashboard/muhasebe/odemeler',
              icon: <FileText className="h-4 w-4" />
            }
          ]
        }
      ]
    }

    // Varsayılan menü
    return baseItems
  }

  const sidebarItems = getSidebarItems()

  const toggleExpanded = (title: string) => {
    setExpandedItems(prev => 
      prev.includes(title) 
        ? prev.filter(item => item !== title)
        : [...prev, title]
    )
  }

  const isActive = (href: string) => {
    // Ana sayfa için özel kontrol
    if (href === '/dashboard') {
      return pathname === '/dashboard'
    }
    // Diğer sayfalar için exact match veya alt sayfa kontrolü
    return pathname === href || pathname.startsWith(href + '/')
  }

  const renderSidebarItem = (item: SidebarItem, level = 0) => {
    const hasChildren = item.children && item.children.length > 0
    const isExpanded = expandedItems.includes(item.title)
    const active = isActive(item.href)
    const isCategoryHeader = item.href === '#'

    return (
      <div key={item.title}>
        <div className="flex items-center">
          {isCategoryHeader ? (
            <div className="flex-1">
              <Button
                variant="ghost"
                onClick={() => toggleExpanded(item.title)}
                className={cn(
                  "w-full justify-start h-11 px-3 py-2",
                  "text-sm font-semibold text-foreground tracking-wide",
                  "border-b-2 border-primary/20 mb-3 hover:bg-primary/5",
                  "transition-all duration-200"
                )}
              >
                {item.icon}
                {!isCollapsed && (
                  <>
                    <span className="ml-2 flex-1 text-left">{item.title}</span>
                    <ChevronRight 
                      className={cn(
                        "h-4 w-4 transition-transform",
                        isExpanded && "rotate-90"
                      )} 
                    />
                  </>
                )}
              </Button>
            </div>
          ) : (
            <Link href={item.href} className="flex-1">
              <Button
                variant={active ? "secondary" : "ghost"}
                className={cn(
                  "w-full justify-start h-9",
                  level > 0 && "ml-2 text-sm",
                  level > 1 && "ml-4 text-xs",
                  active && "bg-primary/10 text-primary",
                  "hover:bg-muted/50 transition-colors"
                )}
              >
                {item.icon}
                {!isCollapsed && (
                  <>
                    <span className="ml-2 flex-1 text-left">{item.title}</span>
                    {item.badge && (
                      <span className="ml-auto bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full">
                        {item.badge}
                      </span>
                    )}
                  </>
                )}
              </Button>
            </Link>
          )}
          {hasChildren && !isCollapsed && !isCategoryHeader && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => toggleExpanded(item.title)}
              className="ml-1 h-8 w-8 p-0"
            >
              <ChevronRight 
                className={cn(
                  "h-4 w-4 transition-transform",
                  isExpanded && "rotate-90"
                )} 
              />
            </Button>
          )}
        </div>
        
        {hasChildren && isExpanded && !isCollapsed && (
          <div className={cn(
            "mt-1 ml-2 border-l-2 border-border/30 pl-2",
            "bg-muted/20 rounded-r-md py-1"
          )}>
            {item.children!.map(child => renderSidebarItem(child, level + 1))}
          </div>
        )}
      </div>
    )
  }

  return (
    <div className={cn(
      "flex flex-col bg-card border-r border-border transition-all duration-300",
      isCollapsed ? "w-16" : "w-64"
    )}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        {!isCollapsed && (
          <div className="flex items-center gap-2">
            {mounted && (
              <Image 
                src={logoSrc} 
                alt="WEBRAIN Logo" 
                width={350} 
                height={100} 
                className="h-35 -mb-15 -mt-10 w-auto"
                priority
              />
            )}
          </div>
        )}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="ml-auto"
        >
          {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </Button>
      </div>

      {/* User Info */}
      {!isCollapsed && session && (
        <div className="p-4 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
              <span className="text-primary-foreground text-sm font-medium">
                {session.user?.name?.charAt(0)}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{session.user?.name}</p>
              <p className="text-xs text-muted-foreground capitalize">
                {userRole?.toLowerCase().replace('_', ' ')}
              </p>
            </div>
            <NotificationCenter />
          </div>
        </div>
      )}

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto p-2">
        <nav className="space-y-1">
          {sidebarItems.map(item => renderSidebarItem(item))}
        </nav>
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-border">
        <Button
          variant="ghost"
          className="w-full justify-start"
          onClick={() => signOut({ callbackUrl: '/login' })}
        >
          <LogOut className="h-4 w-4" />
          {!isCollapsed && <span className="ml-2">Çıkış Yap</span>}
        </Button>
      </div>
    </div>
  )
}
