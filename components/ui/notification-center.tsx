'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Bell, Check, CheckCheck, X, ExternalLink, Mail, Smartphone, AlertCircle } from 'lucide-react'
import { useToast } from '@/components/ui/use-toast'

interface Notification {
  id: string
  title: string
  message: string
  type: 'INFO' | 'WARNING' | 'SUCCESS' | 'ERROR' | 'WORKFLOW'
  category: 'MAL_KABUL' | 'SATIN_ALMA' | 'MUHASEBE' | 'SYSTEM'
  priority: 'LOW' | 'NORMAL' | 'HIGH' | 'URGENT'
  isRead: boolean
  isEmailSent: boolean
  isPushSent: boolean
  actionUrl?: string
  createdAt: string
}

export function NotificationCenter() {
  const { data: session } = useSession()
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [unreadCount, setUnreadCount] = useState(0)
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isPushSupported, setIsPushSupported] = useState(false)
  const [isPushEnabled, setIsPushEnabled] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    if (session?.user) {
      fetchNotifications()
      checkPushSupport()
      
      // Her 30 saniyede bir bildirim kontrolü
      const interval = setInterval(fetchNotifications, 30000)
      return () => clearInterval(interval)
    }
  }, [session])

  const fetchNotifications = async () => {
    try {
      const response = await fetch('/api/notifications?limit=20')
      if (response.ok) {
        const data = await response.json()
        setNotifications(data.notifications)
        setUnreadCount(data.notifications.filter((n: Notification) => !n.isRead).length)
      }
    } catch (error) {
      console.error('Failed to fetch notifications:', error)
    }
  }

  const checkPushSupport = () => {
    if ('serviceWorker' in navigator && 'PushManager' in window) {
      setIsPushSupported(true)
      
      // Mevcut push subscription kontrolü
      navigator.serviceWorker.ready.then(registration => {
        registration.pushManager.getSubscription().then(subscription => {
          setIsPushEnabled(!!subscription)
        })
      })
    }
  }

  const enablePushNotifications = async () => {
    try {
      if (!isPushSupported) {
        toast({
          title: "Desteklenmiyor",
          description: "Bu tarayıcı push notification desteklemiyor.",
          variant: "destructive",
        })
        return
      }

      const permission = await Notification.requestPermission()
      if (permission !== 'granted') {
        toast({
          title: "İzin Reddedildi",
          description: "Bildirim izni verilmedi. Tarayıcı ayarlarından etkinleştirin.",
          variant: "destructive",
        })
        return
      }

      const registration = await navigator.serviceWorker.ready
      const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY
      })

      const response = await fetch('/api/notifications/push-subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          endpoint: subscription.endpoint,
          keys: {
            p256dh: btoa(String.fromCharCode(...new Uint8Array(subscription.getKey('p256dh')!))),
            auth: btoa(String.fromCharCode(...new Uint8Array(subscription.getKey('auth')!))),
          },
          userAgent: navigator.userAgent,
        }),
      })

      if (response.ok) {
        setIsPushEnabled(true)
        toast({
          title: "Başarılı! 🔔",
          description: "Push notification'lar etkinleştirildi.",
        })
      }
    } catch (error) {
      console.error('Push notification enable error:', error)
      toast({
        title: "Hata",
        description: "Push notification etkinleştirilemedi.",
        variant: "destructive",
      })
    }
  }

  const disablePushNotifications = async () => {
    try {
      const registration = await navigator.serviceWorker.ready
      const subscription = await registration.pushManager.getSubscription()
      
      if (subscription) {
        await fetch('/api/notifications/push-subscribe', {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ endpoint: subscription.endpoint }),
        })
        
        await subscription.unsubscribe()
        setIsPushEnabled(false)
        
        toast({
          title: "Devre Dışı",
          description: "Push notification'lar kapatıldı.",
        })
      }
    } catch (error) {
      console.error('Push notification disable error:', error)
    }
  }

  const markAsRead = async (notificationId: string) => {
    try {
      const response = await fetch(`/api/notifications/${notificationId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isRead: true }),
      })

      if (response.ok) {
        setNotifications(prev => 
          prev.map(n => n.id === notificationId ? { ...n, isRead: true } : n)
        )
        setUnreadCount(prev => Math.max(0, prev - 1))
      }
    } catch (error) {
      console.error('Mark as read error:', error)
    }
  }

  const markAllAsRead = async () => {
    try {
      setIsLoading(true)
      const response = await fetch('/api/notifications/mark-all-read', {
        method: 'POST',
      })

      if (response.ok) {
        setNotifications(prev => prev.map(n => ({ ...n, isRead: true })))
        setUnreadCount(0)
        toast({
          title: "Başarılı",
          description: "Tüm bildirimler okundu olarak işaretlendi.",
        })
      }
    } catch (error) {
      console.error('Mark all as read error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const deleteNotification = async (notificationId: string) => {
    try {
      const response = await fetch(`/api/notifications/${notificationId}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        setNotifications(prev => prev.filter(n => n.id !== notificationId))
        setUnreadCount(prev => {
          const notification = notifications.find(n => n.id === notificationId)
          return notification && !notification.isRead ? prev - 1 : prev
        })
        toast({
          title: "Silindi",
          description: "Bildirim silindi.",
        })
      }
    } catch (error) {
      console.error('Delete notification error:', error)
    }
  }

  const getNotificationIcon = (type: Notification['type']) => {
    switch (type) {
      case 'SUCCESS': return '✅'
      case 'ERROR': return '❌'
      case 'WARNING': return '⚠️'
      case 'WORKFLOW': return '🔄'
      default: return '📄'
    }
  }

  const getNotificationColor = (priority: Notification['priority']) => {
    switch (priority) {
      case 'LOW': return 'bg-gray-100 border-gray-200'
      case 'HIGH': return 'bg-orange-50 border-orange-200'
      case 'URGENT': return 'bg-red-50 border-red-200'
      default: return 'bg-blue-50 border-blue-200'
    }
  }

  const getCategoryEmoji = (category: Notification['category']) => {
    switch (category) {
      case 'MAL_KABUL': return '📦'
      case 'SATIN_ALMA': return '🛒'
      case 'MUHASEBE': return '💰'
      default: return '⚙️'
    }
  }

  if (!session?.user) return null

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon" className="relative">
          <Bell className="h-4 w-4" />
          {unreadCount > 0 && (
            <Badge 
              variant="destructive" 
              className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs"
            >
              {unreadCount > 9 ? '9+' : unreadCount}
            </Badge>
          )}
        </Button>
      </DialogTrigger>
      
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Bildirimler
            {unreadCount > 0 && (
              <Badge variant="secondary">{unreadCount} okunmamış</Badge>
            )}
          </DialogTitle>
          <DialogDescription>
            Sistem bildirimleri ve iş akışı uyarıları
          </DialogDescription>
        </DialogHeader>

        {/* Bildirim Ayarları */}
        <div className="flex gap-2 mb-4 p-3 bg-muted rounded-lg">
          <div className="flex-1">
            <div className="flex items-center gap-2 text-sm">
              <Mail className="h-4 w-4" />
              <span>Email: Aktif</span>
            </div>
            <div className="flex items-center gap-2 text-sm mt-1">
              <Smartphone className="h-4 w-4" />
              <span>Push: {isPushEnabled ? 'Aktif' : 'Pasif'}</span>
            </div>
          </div>
          
          <div className="flex gap-2">
            {unreadCount > 0 && (
              <Button
                variant="outline"
                size="sm"
                onClick={markAllAsRead}
                disabled={isLoading}
              >
                <CheckCheck className="h-4 w-4 mr-1" />
                Tümünü Okundu İşaretle
              </Button>
            )}
            
            {isPushSupported && (
              <Button
                variant="outline"
                size="sm"
                onClick={isPushEnabled ? disablePushNotifications : enablePushNotifications}
              >
                <Smartphone className="h-4 w-4 mr-1" />
                Push {isPushEnabled ? 'Kapat' : 'Aç'}
              </Button>
            )}
          </div>
        </div>

        {/* Bildirim Listesi */}
        <div className="flex-1 overflow-y-auto space-y-3">
          {notifications.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <Bell className="h-12 w-12 mx-auto mb-4 opacity-30" />
              <p>Henüz bildirim yok</p>
            </div>
          ) : (
            notifications.map((notification) => (
              <Card 
                key={notification.id} 
                className={`${getNotificationColor(notification.priority)} ${
                  !notification.isRead ? 'border-l-4 border-l-blue-500' : ''
                }`}
              >
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{getCategoryEmoji(notification.category)}</span>
                      <span className="text-lg">{getNotificationIcon(notification.type)}</span>
                      <CardTitle className="text-sm font-medium">
                        {notification.title}
                      </CardTitle>
                      {!notification.isRead && (
                        <Badge variant="secondary" className="text-xs">Yeni</Badge>
                      )}
                    </div>
                    
                    <div className="flex items-center gap-1">
                      {notification.actionUrl && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            markAsRead(notification.id)
                            window.location.href = notification.actionUrl!
                          }}
                          title="İşlemi görüntüle"
                        >
                          <ExternalLink className="h-3 w-3" />
                        </Button>
                      )}
                      
                      {!notification.isRead && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => markAsRead(notification.id)}
                          title="Okundu işaretle"
                        >
                          <Check className="h-3 w-3" />
                        </Button>
                      )}
                      
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => deleteNotification(notification.id)}
                        title="Sil"
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="pt-0">
                  <CardDescription className="text-sm">
                    {notification.message}
                  </CardDescription>
                  
                  <div className="flex items-center justify-between mt-3 text-xs text-muted-foreground">
                    <div className="flex items-center gap-3">
                      <span>{new Date(notification.createdAt).toLocaleString('tr-TR')}</span>
                      <Badge variant="outline" className="text-xs">
                        {notification.priority}
                      </Badge>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      {notification.isEmailSent && (
                        <Mail className="h-3 w-3 text-green-500" title="Email gönderildi" />
                      )}
                      {notification.isPushSent && (
                        <Smartphone className="h-3 w-3 text-green-500" title="Push gönderildi" />
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}