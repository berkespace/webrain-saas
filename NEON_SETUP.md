# 🌟 Neon Veritabanı Kurulum Rehberi

## 📋 Gereksinimler

- Neon hesabı (https://neon.tech)
- Node.js ve npm kurulu
- Proje dependencies yüklü

## 🚀 Kurulum Adımları

### 1. Neon Veritabanı Oluştur

1. [Neon Dashboard](https://console.neon.tech) aç
2. "New Project" tıkla
3. Proje adı: `webrain-saas`
4. Database name: `webrain`
5. Region: En yakın bölgeyi seç (örn: `West Europe`)
6. "Create Project" tıkla

### 2. Connection String Al

1. Dashboard'da projeye tıkla
2. "Connection Details" sekmesine git
3. "Prisma" formatını seç
4. Connection string'i kopyala

### 3. Environment Variables Güncelle

`.env` dosyasında:

```bash
# Local Development (PostgreSQL)
DATABASE_URL="postgresql://username:password@localhost:5432/webrain"

# Neon Production
DATABASE_URL="postgresql://username:password@ep-xxx-xxx-xxx.region.aws.neon.tech/webrain?sslmode=require"
```

### 4. Veritabanı Schema'sını Neon'a Uygula

```bash
# Prisma migrate'i Neon'a uygula
npx prisma migrate deploy

# Veya yeni migration oluştur
npx prisma migrate dev --name neon_setup
```

### 5. Neon Veritabanını Seed Et

```bash
# Neon seed script'ini çalıştır
npm run seed:neon
```

## 🔧 Neon Özellikleri

### ✅ Avantajlar
- **Serverless**: Otomatik ölçeklendirme
- **Branching**: Development/Production ayrımı
- **Auto-scaling**: Kullanıma göre otomatik büyüme
- **Backup**: Otomatik yedekleme
- **Monitoring**: Detaylı performans izleme

### ⚠️ Dikkat Edilecekler
- **Cold Start**: İlk bağlantı yavaş olabilir
- **Connection Limits**: Eşzamanlı bağlantı sınırları
- **Region**: En yakın bölgeyi seç

## 📊 Seed Verileri

Neon seed script'i şu verileri oluşturur:

- 👤 **Kullanıcılar**: Admin, Mal Kabulcü, Muhasebe, Satın Almacı
- 🏪 **Komisyoncular**: 5 adet (CİHAN TARIM, ÇALDIR KOM, vs.)
- 🏢 **Özel Firmalar**: 2 adet (WEBRAIN TARIM A.Ş., GREEN FARM LTD.)
- 🥬 **Ürünler**: 8 adet (SİLÖR, SALATALIK, DOMATES, vs.)
- 👨‍🌾 **Müstahsiller**: 3 adet (ALİ YILMAZ, FATMA KAYA, MEHMET DEMİR)
- 👨‍🌾 **Üreticiler**: 4 adet (komisyonculara bağlı)
- 📦 **Ambalajlar**: 4 adet (Palet, Plastik Kasa, vs.)
- 📝 **Test Mal Kabul**: 1 adet örnek kayıt

## 🧪 Test

### Local Test
```bash
# Local veritabanında test et
npm run seed

# Uygulamayı başlat
npm run dev
```

### Neon Test
```bash
# Neon'da test et
npm run seed:neon

# Production build
npm run build
```

## 🔄 Migration

### Local → Neon
```bash
# Local schema'ı Neon'a uygula
npx prisma migrate deploy

# Neon'da seed çalıştır
npm run seed:neon
```

### Neon → Local
```bash
# Neon schema'ı local'e çek
npx prisma db pull

# Local'de seed çalıştır
npm run seed
```

## 📝 Troubleshooting

### Bağlantı Hatası
```bash
# SSL mode ekle
DATABASE_URL="postgresql://...?sslmode=require"

# Connection pool ayarları
DATABASE_URL="postgresql://...?sslmode=require&connection_limit=1&pool_timeout=20"
```

### Migration Hatası
```bash
# Migration'ları sıfırla
npx prisma migrate reset

# Yeni migration oluştur
npx prisma migrate dev --name fresh_start
```

### Seed Hatası
```bash
# Veritabanı bağlantısını test et
npx prisma db seed

# Log'ları kontrol et
npm run seed:neon --verbose
```

## 🎯 Sonraki Adımlar

1. ✅ Neon veritabanı kurulumu
2. ✅ Schema migration
3. ✅ Seed verileri
4. ✅ Connection test
5. ✅ Uygulama test
6. ✅ Production deployment

## 📞 Destek

- **Neon Docs**: https://neon.tech/docs
- **Prisma Docs**: https://www.prisma.io/docs
- **Project Issues**: GitHub Issues

---

**🎉 Neon veritabanı kurulumu tamamlandı! Sistem production'a hazır!**
