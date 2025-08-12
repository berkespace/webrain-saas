-- CreateEnum
CREATE TYPE "public"."UserRole" AS ENUM ('ADMIN', 'MAL_KABULCU', 'MUHASEBE', 'SATIN_ALMACI');

-- CreateEnum
CREATE TYPE "public"."ProductStatus" AS ENUM ('FATURA_BEKLIYOR', 'FATURALANDI', 'NETLENDI', 'TAMAMLANDI', 'IPTAL');

-- CreateEnum
CREATE TYPE "public"."Status" AS ENUM ('AKTIF', 'PASIF');

-- CreateEnum
CREATE TYPE "public"."Gender" AS ENUM ('ERKEK', 'KADIN');

-- CreateEnum
CREATE TYPE "public"."SaticiTipi" AS ENUM ('OZEL_FIRMA', 'MUSTAHSIL', 'KOMISYONCU');

-- CreateEnum
CREATE TYPE "public"."AmbalajTipi" AS ENUM ('PALET', 'PLASTIK_KASA', 'KARTON_KASA', 'DİĞER');

-- CreateTable
CREATE TABLE "public"."users" (
    "id" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "public"."UserRole" NOT NULL DEFAULT 'MAL_KABULCU',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."komisyoncular" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "dukkanAdi" TEXT NOT NULL,
    "durum" "public"."Status" NOT NULL DEFAULT 'AKTIF',
    "komisyonNo" TEXT NOT NULL,
    "sehir" TEXT NOT NULL,
    "vkn" TEXT,
    "yetkiliAdi" TEXT,
    "yetkiliTelefon" TEXT,

    CONSTRAINT "komisyoncular_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."ozel_firmalar" (
    "id" TEXT NOT NULL,
    "firmaAdi" TEXT NOT NULL,
    "vkn" TEXT,
    "yetkiliAdi" TEXT,
    "yetkiliTelefon" TEXT,
    "sehir" TEXT NOT NULL,
    "adres" TEXT,
    "durum" "public"."Status" NOT NULL DEFAULT 'AKTIF',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ozel_firmalar_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."ureticiler" (
    "id" TEXT NOT NULL,
    "ad" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "cinsiyet" "public"."Gender" NOT NULL,
    "dogumTarihi" TIMESTAMP(3),
    "durum" "public"."Status" NOT NULL DEFAULT 'AKTIF',
    "iletisim" TEXT,
    "komisyoncuId" TEXT,
    "sehir" TEXT NOT NULL,
    "soyad" TEXT NOT NULL,
    "tcNo" TEXT,

    CONSTRAINT "ureticiler_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."mustahsil" (
    "id" TEXT NOT NULL,
    "ad" TEXT NOT NULL,
    "soyad" TEXT NOT NULL,
    "dogumTarihi" TIMESTAMP(3) NOT NULL,
    "tcKimlikNo" TEXT NOT NULL,
    "ibanAdresi" TEXT,
    "adres" TEXT,
    "cinsiyet" "public"."Gender" NOT NULL,
    "durum" "public"."Status" NOT NULL DEFAULT 'AKTIF',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "mustahsil_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."urunler" (
    "id" TEXT NOT NULL,
    "ad" TEXT NOT NULL,
    "kategori" TEXT,
    "birim" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "durum" "public"."Status" NOT NULL DEFAULT 'AKTIF',

    CONSTRAINT "urunler_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."ambalajlar" (
    "id" TEXT NOT NULL,
    "ad" TEXT NOT NULL,
    "tipi" "public"."AmbalajTipi" NOT NULL,
    "daraKg" DOUBLE PRECISION NOT NULL,
    "aciklama" TEXT,
    "durum" "public"."Status" NOT NULL DEFAULT 'AKTIF',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ambalajlar_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."mal_kabul_records" (
    "id" TEXT NOT NULL,
    "tarih" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "miktar" DOUBLE PRECISION NOT NULL,
    "birimFiyat" DOUBLE PRECISION,
    "toplamFiyat" DOUBLE PRECISION,
    "status" "public"."ProductStatus" NOT NULL DEFAULT 'FATURA_BEKLIYOR',
    "notlar" TEXT,
    "malKabulcuId" TEXT NOT NULL,
    "komisyoncuId" TEXT,
    "ureticiId" TEXT,
    "urunId" TEXT NOT NULL,
    "faturaId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "fisNo" TEXT NOT NULL,
    "mustahsilId" TEXT,
    "ozelFirmaId" TEXT,
    "saticiTipi" "public"."SaticiTipi" NOT NULL DEFAULT 'OZEL_FIRMA',
    "ambalajId" TEXT,
    "paletSayisi" INTEGER NOT NULL DEFAULT 0,
    "kasaSayisi" INTEGER NOT NULL DEFAULT 0,
    "brutKg" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "daraKg" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "girisKg" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "cikmaFireKg" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "netKg" DOUBLE PRECISION NOT NULL DEFAULT 0,

    CONSTRAINT "mal_kabul_records_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."faturalar" (
    "id" TEXT NOT NULL,
    "faturaNo" TEXT NOT NULL,
    "tarih" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "toplamTutar" DOUBLE PRECISION NOT NULL,
    "kdvOrani" DOUBLE PRECISION NOT NULL DEFAULT 18.0,
    "kdvTutari" DOUBLE PRECISION NOT NULL,
    "genelToplam" DOUBLE PRECISION NOT NULL,
    "notlar" TEXT,
    "satinAlmaciId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "faturalar_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "public"."users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "komisyoncular_komisyonNo_key" ON "public"."komisyoncular"("komisyonNo");

-- CreateIndex
CREATE UNIQUE INDEX "mustahsil_tcKimlikNo_key" ON "public"."mustahsil"("tcKimlikNo");

-- CreateIndex
CREATE UNIQUE INDEX "mal_kabul_records_fisNo_key" ON "public"."mal_kabul_records"("fisNo");

-- CreateIndex
CREATE UNIQUE INDEX "faturalar_faturaNo_key" ON "public"."faturalar"("faturaNo");

-- AddForeignKey
ALTER TABLE "public"."ureticiler" ADD CONSTRAINT "ureticiler_komisyoncuId_fkey" FOREIGN KEY ("komisyoncuId") REFERENCES "public"."komisyoncular"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."mal_kabul_records" ADD CONSTRAINT "mal_kabul_records_faturaId_fkey" FOREIGN KEY ("faturaId") REFERENCES "public"."faturalar"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."mal_kabul_records" ADD CONSTRAINT "mal_kabul_records_komisyoncuId_fkey" FOREIGN KEY ("komisyoncuId") REFERENCES "public"."komisyoncular"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."mal_kabul_records" ADD CONSTRAINT "mal_kabul_records_malKabulcuId_fkey" FOREIGN KEY ("malKabulcuId") REFERENCES "public"."users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."mal_kabul_records" ADD CONSTRAINT "mal_kabul_records_mustahsilId_fkey" FOREIGN KEY ("mustahsilId") REFERENCES "public"."mustahsil"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."mal_kabul_records" ADD CONSTRAINT "mal_kabul_records_ureticiId_fkey" FOREIGN KEY ("ureticiId") REFERENCES "public"."ureticiler"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."mal_kabul_records" ADD CONSTRAINT "mal_kabul_records_ozelFirmaId_fkey" FOREIGN KEY ("ozelFirmaId") REFERENCES "public"."ozel_firmalar"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."mal_kabul_records" ADD CONSTRAINT "mal_kabul_records_urunId_fkey" FOREIGN KEY ("urunId") REFERENCES "public"."urunler"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."mal_kabul_records" ADD CONSTRAINT "mal_kabul_records_ambalajId_fkey" FOREIGN KEY ("ambalajId") REFERENCES "public"."ambalajlar"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."faturalar" ADD CONSTRAINT "faturalar_satinAlmaciId_fkey" FOREIGN KEY ("satinAlmaciId") REFERENCES "public"."users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
