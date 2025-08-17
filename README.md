# 🌟 WEBRAIN SaaS - Mal Kabul Yönetim Sistemi

Modern ve kullanıcı dostu mal kabul yönetim sistemi. Excel tarzı arayüz ile hızlı veri girişi, gelişmiş filtreleme ve raporlama özellikleri sunar.

## 🚀 Özellikler

### 📊 **Ana Dashboard**
- **Mal Kabul Kayıtları:** Tüm kayıtları görüntüleme ve yönetim
- **Filtreleme & Arama:** Gelişmiş filtreleme seçenekleri
- **Durum Takibi:** Beklemede, Netlendi, İptal durumları
- **Fiş Yazdırma:** QR kod ve barkod destekli fişler

### 🧪 **Test Sayfası (Excel Tarzı)**
- **Hızlı Veri Girişi:** Dropdown seçimli kolay kullanım
- **Gerçek Zamanlı Hesaplama:** Otomatik KG hesaplamaları
- **Gelişmiş Filtreleme:** Satıcı tipi, ürün, durum bazlı
- **Veri Persistence:** Excel gibi kayıtlar kalıcı olarak saklanır
- **Çift Fiş Sistemi:** İlk kayıt ve son durum fişleri

### 🏢 **Entegre Modüller**
- **Özel Firmalar:** Firma yönetimi ve takibi
- **Komisyoncular:** Komisyoncu bilgileri ve işlemleri
- **Müstahsil:** Üretici kayıtları ve yönetimi
- **Ürünler:** Ürün katalog yönetimi
- **Ambalajlar:** Ambalaj türleri ve özellikleri

### 🔐 **Güvenlik & Kimlik Doğrulama**
- **NextAuth.js:** Güvenli kullanıcı girişi
- **Role-Based Access:** Kullanıcı yetki yönetimi
- **Session Management:** Güvenli oturum yönetimi

## 🛠️ Teknoloji Stack

- **Frontend:** Next.js 15, React 18, TypeScript
- **Styling:** Tailwind CSS, Shadcn/ui
- **Database:** Neon PostgreSQL (Cloud)
- **ORM:** Prisma
- **Authentication:** NextAuth.js
- **Deployment:** Vercel

## 📋 Gereksinimler

- Node.js 18+ 
- npm, yarn veya pnpm
- PostgreSQL veritabanı (Neon önerilen)

## 🚀 Kurulum

### 1. Projeyi Klonlayın
```bash
git clone https://github.com/berkespace/webrain-saas.git
cd webrain-saas
```

### 2. Bağımlılıkları Yükleyin
```bash
npm install
# veya
yarn install
# veya
pnpm install
```

### 3. Veritabanı Kurulumu
```bash
# Prisma client'ı oluşturun
npx prisma generate

# Veritabanı migration'larını çalıştırın
npx prisma db push

# Seed verilerini yükleyin (opsiyonel)
npx prisma db seed
```

### 4. Environment Variables
`.env.local` dosyası oluşturun:
```env
# Database
DATABASE_URL="your-neon-postgresql-url"

# NextAuth
NEXTAUTH_SECRET="your-secret-key"
NEXTAUTH_URL="http://localhost:3000"

# OAuth Providers (opsiyonel)
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
```

### 5. Geliştirme Sunucusunu Başlatın
```bash
npm run dev
# veya
yarn dev
# veya
pnpm dev
```

Tarayıcınızda [http://localhost:3000](http://localhost:3000) adresini açın.

## 📱 Kullanım

### 🏠 **Ana Sayfa**
- Sistem genel bakışı
- Hızlı erişim linkleri
- Son aktiviteler

### 📊 **Dashboard**
- **Mal Kabul:** Ana yönetim paneli
- **Ürünler:** Ürün katalog yönetimi
- **Firmalar:** Özel firma ve komisyoncu yönetimi
- **Kullanıcılar:** Admin paneli

### 🧪 **Test Sayfası**
1. **Yeni Satır Ekle:** "+" butonuna tıklayın
2. **Veri Girişi:** Dropdown'lardan seçim yapın
3. **Otomatik Hesaplama:** KG değerleri otomatik hesaplanır
4. **Kaydet:** Verileri veritabanına kaydedin
5. **Fiş Yazdır:** İlk kayıt ve son durum fişleri

### 🔍 **Filtreleme Sistemi**
- **Hızlı Filtreler:** Durum ve satıcı tipi butonları
- **Dropdown Filtreler:** Detaylı seçim seçenekleri
- **Tarih Aralığı:** Başlangıç ve bitiş tarihi
- **Arama Seçenekleri:** İçerir, tam eşleşir, başlar, biter

## 🎯 Özellik Detayları

### 📈 **Otomatik Hesaplamalar**
- **Giriş KG = Brüt KG - Dara KG**
- **Net KG = Giriş KG - Çıkma KG - Fire KG**
- **Otomatik Durum Güncelleme:** Çıkma KG girildiğinde "Netlendi"

### 🖨️ **Fiş Yazdırma**
- **İlk Kayıt Fişi:** Ürün girişi sırasında
- **Son Durum Fişi:** Netlendi durumunda
- **QR Kod & Barkod:** Her fişte otomatik oluşturulur
- **Çift Kopya:** Orijinal ve kopya

### 🔄 **Veri Yönetimi**
- **Excel Tarzı Arayüz:** Satırlar kalıcı olarak saklanır
- **Gerçek Zamanlı Güncelleme:** Değişiklikler anında yansır
- **Veritabanı Senkronizasyonu:** Otomatik kayıt ve güncelleme
- **Bulk Operations:** Toplu işlemler

## 🚀 Deployment

### Vercel (Önerilen)
```bash
# Vercel CLI kurulumu
npm i -g vercel

# Deploy
vercel
```

### Manuel Deployment
```bash
# Production build
npm run build

# Start production server
npm start
```

## 🐛 Sorun Giderme

### Yaygın Sorunlar
1. **Database Connection Error:** DATABASE_URL kontrol edin
2. **Prisma Client Error:** `npx prisma generate` çalıştırın
3. **Authentication Error:** NEXTAUTH_SECRET kontrol edin

### Log Kontrolü
```bash
# Development logs
npm run dev

# Production logs
npm start
```

## 🤝 Katkıda Bulunma

1. Fork yapın
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Commit yapın (`git commit -m 'Add amazing feature'`)
4. Push yapın (`git push origin feature/amazing-feature`)
5. Pull Request oluşturun

## 📄 Lisans

Bu proje MIT lisansı altında lisanslanmıştır. Detaylar için [LICENSE](LICENSE) dosyasına bakın.

## 📞 İletişim

- **Proje:** [GitHub](https://github.com/berkespace/webrain-saas)
- **Geliştirici:** Berke Space
- **Email:** [Email adresinizi ekleyin]

## 🙏 Teşekkürler

- [Next.js](https://nextjs.org/) - React framework
- [Prisma](https://www.prisma.io/) - Database toolkit
- [Tailwind CSS](https://tailwindcss.com/) - CSS framework
- [Shadcn/ui](https://ui.shadcn.com/) - UI components
- [Neon](https://neon.tech/) - Serverless PostgreSQL

---

⭐ Bu projeyi beğendiyseniz yıldız vermeyi unutmayın!
