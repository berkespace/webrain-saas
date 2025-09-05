import webpush from 'web-push'
import { prisma } from './prisma'

// Web Push Configuration
if (process.env.VAPID_PUBLIC_KEY && process.env.VAPID_PRIVATE_KEY) {
  const vapidEmail = process.env.VAPID_EMAIL || 'admin@webrain.com'
  const formattedEmail = vapidEmail.startsWith('mailto:') ? vapidEmail : `mailto:${vapidEmail}`
  
  webpush.setVapidDetails(
    formattedEmail,
    process.env.VAPID_PUBLIC_KEY,
    process.env.VAPID_PRIVATE_KEY
  )
}

// Email transporter - conditionally import
let emailTransporter: any = null
async function getEmailTransporter() {
  if (!emailTransporter && process.env.EMAIL_USER && process.env.EMAIL_PASSWORD) {
    try {
      const nodemailer = await import('nodemailer')
      emailTransporter = nodemailer.default.createTransport({
        host: process.env.EMAIL_SMTP_HOST || 'smtp.gmail.com',
        port: parseInt(process.env.EMAIL_SMTP_PORT || '587'),
        secure: false,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASSWORD,
        },
      })
    } catch (error) {
      console.warn('Email service not available:', error.message)
      return null
    }
  }
  return emailTransporter
}

export interface NotificationData {
  userId: string
  title: string
  message: string
  type: 'INFO' | 'WARNING' | 'SUCCESS' | 'ERROR' | 'WORKFLOW'
  category: 'MAL_KABUL' | 'SATIN_ALMA' | 'MUHASEBE' | 'SYSTEM'
  priority?: 'LOW' | 'NORMAL' | 'HIGH' | 'URGENT'
  relatedId?: string
  relatedModel?: string
  actionUrl?: string
  metadata?: any
  sendEmail?: boolean
  sendPush?: boolean
}

export class NotificationService {
  // Ana bildirim oluşturma fonksiyonu
  static async createNotification(data: NotificationData) {
    try {
      // Database'e bildirim kaydet
      const notification = await prisma.notifications.create({
        data: {
          userId: data.userId,
          title: data.title,
          message: data.message,
          type: data.type,
          category: data.category,
          priority: data.priority || 'NORMAL',
          relatedId: data.relatedId,
          relatedModel: data.relatedModel,
          actionUrl: data.actionUrl,
          metadata: data.metadata,
        },
        include: {
          user: true,
        },
      })

      // Email gönder
      if (data.sendEmail !== false) {
        await this.sendEmail(notification)
      }

      // Push notification gönder
      if (data.sendPush !== false) {
        await this.sendPushNotification(notification)
      }

      return notification
    } catch (error) {
      console.error('Notification creation error:', error)
      throw error
    }
  }

  // Email gönderme
  private static async sendEmail(notification: any) {
    try {
      if (!process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD) {
        console.warn('Email credentials not configured')
        return
      }

      const transporter = await getEmailTransporter()
      if (!transporter) {
        console.warn('📧 Email transporter not available, skipping email')
        // Database'de email'i skip edildi olarak işaretle ama hata verme
        await prisma.notifications.update({
          where: { id: notification.id },
          data: { isEmailSent: false },
        })
        return
      }

      const mailOptions = {
        from: {
          name: process.env.EMAIL_FROM_NAME || 'Webrain SaaS',
          address: process.env.EMAIL_FROM_EMAIL || process.env.EMAIL_USER,
        },
        to: notification.user.email,
        subject: `🔔 ${notification.title}`,
        html: this.generateEmailTemplate(notification),
      }

      await transporter.sendMail(mailOptions)

      // Database'de email gönderim durumunu güncelle
      await prisma.notifications.update({
        where: { id: notification.id },
        data: { isEmailSent: true },
      })

      console.log(`✅ Email sent to ${notification.user.email}`)
    } catch (error) {
      console.error('❌ Email sending error:', error)
    }
  }

  // Push notification gönderme
  private static async sendPushNotification(notification: any) {
    try {
      if (!process.env.VAPID_PUBLIC_KEY || !process.env.VAPID_PRIVATE_KEY) {
        console.warn('VAPID keys not configured')
        return
      }

      // Kullanıcının push subscription'larını al
      const subscriptions = await prisma.push_subscriptions.findMany({
        where: { 
          userId: notification.userId,
          isActive: true,
        },
      })

      const pushPromises = subscriptions.map(async (subscription) => {
        try {
          const pushPayload = {
            title: notification.title,
            body: notification.message,
            icon: '/logo-dark.png',
            badge: '/logo-dark.png',
            data: {
              url: notification.actionUrl || '/dashboard',
              notificationId: notification.id,
            },
          }

          await webpush.sendNotification(
            {
              endpoint: subscription.endpoint,
              keys: {
                p256dh: subscription.p256dhKey,
                auth: subscription.authKey,
              },
            },
            JSON.stringify(pushPayload)
          )

          console.log(`Push notification sent to ${notification.user.email}`)
        } catch (error) {
          console.error('Push notification error:', error)
          
          // Geçersiz subscription'ı deaktif et
          if (error.statusCode === 410) {
            await prisma.push_subscriptions.update({
              where: { id: subscription.id },
              data: { isActive: false },
            })
          }
        }
      })

      await Promise.allSettled(pushPromises)

      // Database'de push gönderim durumunu güncelle
      await prisma.notifications.update({
        where: { id: notification.id },
        data: { isPushSent: true },
      })
    } catch (error) {
      console.error('Push notification service error:', error)
    }
  }

  // Email template oluşturma
  private static generateEmailTemplate(notification: any): string {
    const priorityColor = {
      LOW: '#6b7280',
      NORMAL: '#3b82f6',
      HIGH: '#f59e0b',
      URGENT: '#ef4444',
    }[notification.priority] || '#3b82f6'

    const categoryEmoji = {
      MAL_KABUL: '📦',
      SATIN_ALMA: '🛒',
      MUHASEBE: '💰',
      SYSTEM: '⚙️',
    }[notification.category] || '🔔'

    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <title>${notification.title}</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 0; padding: 20px; background-color: #f5f5f5; }
          .container { max-width: 600px; margin: 0 auto; background: white; border-radius: 8px; padding: 30px; }
          .header { text-align: center; margin-bottom: 30px; }
          .logo { max-width: 150px; margin-bottom: 20px; }
          .title { color: ${priorityColor}; font-size: 24px; font-weight: bold; margin: 0; }
          .category { background: ${priorityColor}; color: white; padding: 4px 12px; border-radius: 20px; font-size: 12px; display: inline-block; margin-top: 10px; }
          .message { font-size: 16px; line-height: 1.6; color: #333; margin: 20px 0; }
          .action-button { display: inline-block; background: ${priorityColor}; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin: 20px 0; }
          .footer { text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; color: #666; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <img src="${process.env.NOTIFICATION_BASE_URL || 'http://localhost:3000'}/logo-dark.png" alt="Webrain" class="logo">
            <h1 class="title">${categoryEmoji} ${notification.title}</h1>
            <span class="category">${notification.category} - ${notification.priority}</span>
          </div>
          
          <div class="message">
            <p>Merhaba ${notification.user.firstName} ${notification.user.lastName},</p>
            <p>${notification.message}</p>
          </div>
          
          ${notification.actionUrl ? `
            <div style="text-align: center;">
              <a href="${process.env.NOTIFICATION_BASE_URL || 'http://localhost:3000'}${notification.actionUrl}" class="action-button">
                İşlemi Görüntüle
              </a>
            </div>
          ` : ''}
          
          <div class="footer">
            <p>Bu e-posta Webrain SaaS sistemi tarafından otomatik olarak gönderilmiştir.</p>
            <p>Tarih: ${new Date(notification.createdAt).toLocaleString('tr-TR')}</p>
          </div>
        </div>
      </body>
      </html>
    `
  }

  // Workflow tetikleyicileri
  static async notifyProductNetlendi(malKabulRecordId: string, malKabulcuName: string, productName: string) {
    // Satın alma rolündeki kullanıcıları bul
    const satinAlmaUsers = await prisma.users.findMany({
      where: { role: { in: ['SATIN_ALMACI', 'ADMIN'] } },
    })

    const notifications = satinAlmaUsers.map(user => 
      this.createNotification({
        userId: user.id,
        title: 'Yeni Ürün Fiyat Girişi Bekliyor! 🟢',
        message: `${malKabulcuName} tarafından "${productName}" ürünü netlendi. Fiyat girişi ve evrak yükleme bekleniyor.`,
        type: 'WORKFLOW',
        category: 'SATIN_ALMA',
        priority: 'HIGH',
        relatedId: malKabulRecordId,
        relatedModel: 'mal_kabul_records',
        actionUrl: `/dashboard/satin-alma/fatura-bekleyen-urunler`,
        sendEmail: true,
        sendPush: true,
      })
    )

    await Promise.allSettled(notifications)
  }

  static async notifyInvoiceNeedsApproval(malKabulRecordId: string, satinAlmaciName: string, productName: string, isManual: boolean = false) {
    // Muhasebe rolündeki kullanıcıları bul
    const muhasebeUsers = await prisma.users.findMany({
      where: { role: { in: ['MUHASEBE', 'MUHASEBECI', 'ADMIN'] } },
    })

    const fatureType = isManual ? 'Manuel fatura' : 'Evrak'
    
    const notifications = muhasebeUsers.map(user => 
      this.createNotification({
        userId: user.id,
        title: 'Fatura Onay Bekliyor! 📄',
        message: `${satinAlmaciName} tarafından "${productName}" için ${fatureType} bilgileri girildi. Onay bekleniyor.`,
        type: 'WORKFLOW',
        category: 'MUHASEBE',
        priority: 'HIGH',
        relatedId: malKabulRecordId,
        relatedModel: 'mal_kabul_records',
        actionUrl: `/dashboard/muhasebe/satin-alim-faturalari`,
        sendEmail: true,
        sendPush: true,
      })
    )

    await Promise.allSettled(notifications)
  }

  static async notifyInvoiceApproved(malKabulRecordId: string, muhasebeciName: string, productName: string, isApproved: boolean) {
    // İlgili mal kabul kaydını ve satın almacı bilgisini al
    const record = await prisma.mal_kabul_records.findUnique({
      where: { id: malKabulRecordId },
      include: { users: true },
    })

    if (!record?.fiyatGirenKullanici) return

    const status = isApproved ? 'onaylandı ✅' : 'reddedildi ❌'
    const priority = isApproved ? 'SUCCESS' : 'ERROR'
    
    await this.createNotification({
      userId: record.fiyatGirenKullanici,
      title: `Fatura ${status}`,
      message: `${muhasebeciName} tarafından "${productName}" faturası ${status}. ${isApproved ? 'Cari hesaplara kayıt edildi.' : 'Tekrar düzenleme gerekli.'}`,
      type: priority,
      category: 'SATIN_ALMA',
      priority: isApproved ? 'NORMAL' : 'HIGH',
      relatedId: malKabulRecordId,
      relatedModel: 'mal_kabul_records',
      actionUrl: isApproved ? `/dashboard/muhasebe/cari-hesaplar` : `/dashboard/satin-alma/fatura-bekleyen-urunler`,
      sendEmail: true,
      sendPush: true,
    })
  }
}
