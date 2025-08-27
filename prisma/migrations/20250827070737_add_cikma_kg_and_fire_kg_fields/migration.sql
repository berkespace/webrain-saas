/*
  Warnings:

  - You are about to alter the column `daraKg` on the `ambalajlar` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Real`.
  - The `durum` column on the `ambalajlar` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to alter the column `toplamTutar` on the `faturalar` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Real`.
  - You are about to alter the column `kdvOrani` on the `faturalar` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Real`.
  - You are about to alter the column `kdvTutari` on the `faturalar` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Real`.
  - You are about to alter the column `genelToplam` on the `faturalar` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Real`.
  - The `durum` column on the `komisyoncular` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to alter the column `miktar` on the `mal_kabul_records` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Real`.
  - You are about to alter the column `birimFiyat` on the `mal_kabul_records` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Real`.
  - You are about to alter the column `toplamFiyat` on the `mal_kabul_records` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Real`.
  - The `status` column on the `mal_kabul_records` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `saticiTipi` column on the `mal_kabul_records` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to alter the column `brutKg` on the `mal_kabul_records` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Real`.
  - You are about to alter the column `daraKg` on the `mal_kabul_records` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Real`.
  - You are about to alter the column `girisKg` on the `mal_kabul_records` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Real`.
  - You are about to alter the column `cikmaFireKg` on the `mal_kabul_records` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Real`.
  - You are about to alter the column `netKg` on the `mal_kabul_records` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Real`.
  - The `durum` column on the `mustahsil` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `durum` column on the `ozel_firmalar` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `durum` column on the `ureticiler` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `durum` column on the `urunler` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `role` column on the `users` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `tipi` on the `ambalajlar` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `cinsiyet` on the `mustahsil` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `cinsiyet` on the `ureticiler` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "public"."ambalajlar" DROP COLUMN "tipi",
ADD COLUMN     "tipi" TEXT NOT NULL,
ALTER COLUMN "daraKg" SET DATA TYPE REAL,
DROP COLUMN "durum",
ADD COLUMN     "durum" TEXT NOT NULL DEFAULT 'AKTIF',
ALTER COLUMN "createdAt" DROP NOT NULL,
ALTER COLUMN "createdAt" SET DATA TYPE TIMESTAMP(6),
ALTER COLUMN "updatedAt" DROP NOT NULL,
ALTER COLUMN "updatedAt" SET DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "updatedAt" SET DATA TYPE TIMESTAMP(6);

-- AlterTable
ALTER TABLE "public"."faturalar" ALTER COLUMN "tarih" DROP NOT NULL,
ALTER COLUMN "tarih" SET DATA TYPE TIMESTAMP(6),
ALTER COLUMN "toplamTutar" SET DATA TYPE REAL,
ALTER COLUMN "kdvOrani" DROP NOT NULL,
ALTER COLUMN "kdvOrani" SET DATA TYPE REAL,
ALTER COLUMN "kdvTutari" SET DATA TYPE REAL,
ALTER COLUMN "genelToplam" SET DATA TYPE REAL,
ALTER COLUMN "createdAt" DROP NOT NULL,
ALTER COLUMN "createdAt" SET DATA TYPE TIMESTAMP(6),
ALTER COLUMN "updatedAt" DROP NOT NULL,
ALTER COLUMN "updatedAt" SET DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "updatedAt" SET DATA TYPE TIMESTAMP(6);

-- AlterTable
ALTER TABLE "public"."komisyoncular" ALTER COLUMN "createdAt" DROP NOT NULL,
ALTER COLUMN "createdAt" SET DATA TYPE TIMESTAMP(6),
ALTER COLUMN "updatedAt" DROP NOT NULL,
ALTER COLUMN "updatedAt" SET DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "updatedAt" SET DATA TYPE TIMESTAMP(6),
DROP COLUMN "durum",
ADD COLUMN     "durum" TEXT NOT NULL DEFAULT 'AKTIF';

-- AlterTable
ALTER TABLE "public"."mal_kabul_records" ADD COLUMN     "cikmaKg" REAL DEFAULT 0,
ADD COLUMN     "fireKg" REAL DEFAULT 0,
ALTER COLUMN "tarih" DROP NOT NULL,
ALTER COLUMN "tarih" SET DATA TYPE TIMESTAMP(6),
ALTER COLUMN "miktar" SET DATA TYPE REAL,
ALTER COLUMN "birimFiyat" SET DATA TYPE REAL,
ALTER COLUMN "toplamFiyat" SET DATA TYPE REAL,
DROP COLUMN "status",
ADD COLUMN     "status" TEXT NOT NULL DEFAULT 'FATURA_BEKLIYOR',
ALTER COLUMN "createdAt" DROP NOT NULL,
ALTER COLUMN "createdAt" SET DATA TYPE TIMESTAMP(6),
ALTER COLUMN "updatedAt" DROP NOT NULL,
ALTER COLUMN "updatedAt" SET DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "updatedAt" SET DATA TYPE TIMESTAMP(6),
DROP COLUMN "saticiTipi",
ADD COLUMN     "saticiTipi" TEXT NOT NULL DEFAULT 'OZEL_FIRMA',
ALTER COLUMN "paletSayisi" DROP NOT NULL,
ALTER COLUMN "kasaSayisi" DROP NOT NULL,
ALTER COLUMN "brutKg" DROP NOT NULL,
ALTER COLUMN "brutKg" SET DATA TYPE REAL,
ALTER COLUMN "daraKg" DROP NOT NULL,
ALTER COLUMN "daraKg" SET DATA TYPE REAL,
ALTER COLUMN "girisKg" DROP NOT NULL,
ALTER COLUMN "girisKg" SET DATA TYPE REAL,
ALTER COLUMN "cikmaFireKg" DROP NOT NULL,
ALTER COLUMN "cikmaFireKg" SET DATA TYPE REAL,
ALTER COLUMN "netKg" DROP NOT NULL,
ALTER COLUMN "netKg" SET DATA TYPE REAL;

-- AlterTable
ALTER TABLE "public"."mustahsil" ALTER COLUMN "dogumTarihi" SET DATA TYPE TIMESTAMP(6),
DROP COLUMN "cinsiyet",
ADD COLUMN     "cinsiyet" TEXT NOT NULL,
DROP COLUMN "durum",
ADD COLUMN     "durum" TEXT NOT NULL DEFAULT 'AKTIF',
ALTER COLUMN "createdAt" DROP NOT NULL,
ALTER COLUMN "createdAt" SET DATA TYPE TIMESTAMP(6),
ALTER COLUMN "updatedAt" DROP NOT NULL,
ALTER COLUMN "updatedAt" SET DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "updatedAt" SET DATA TYPE TIMESTAMP(6);

-- AlterTable
ALTER TABLE "public"."ozel_firmalar" DROP COLUMN "durum",
ADD COLUMN     "durum" TEXT NOT NULL DEFAULT 'AKTIF',
ALTER COLUMN "createdAt" DROP NOT NULL,
ALTER COLUMN "createdAt" SET DATA TYPE TIMESTAMP(6),
ALTER COLUMN "updatedAt" DROP NOT NULL,
ALTER COLUMN "updatedAt" SET DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "updatedAt" SET DATA TYPE TIMESTAMP(6);

-- AlterTable
ALTER TABLE "public"."ureticiler" ALTER COLUMN "createdAt" DROP NOT NULL,
ALTER COLUMN "createdAt" SET DATA TYPE TIMESTAMP(6),
ALTER COLUMN "updatedAt" DROP NOT NULL,
ALTER COLUMN "updatedAt" SET DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "updatedAt" SET DATA TYPE TIMESTAMP(6),
DROP COLUMN "cinsiyet",
ADD COLUMN     "cinsiyet" TEXT NOT NULL,
ALTER COLUMN "dogumTarihi" SET DATA TYPE TIMESTAMP(6),
DROP COLUMN "durum",
ADD COLUMN     "durum" TEXT NOT NULL DEFAULT 'AKTIF';

-- AlterTable
ALTER TABLE "public"."urunler" ALTER COLUMN "createdAt" DROP NOT NULL,
ALTER COLUMN "createdAt" SET DATA TYPE TIMESTAMP(6),
ALTER COLUMN "updatedAt" DROP NOT NULL,
ALTER COLUMN "updatedAt" SET DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "updatedAt" SET DATA TYPE TIMESTAMP(6),
DROP COLUMN "durum",
ADD COLUMN     "durum" TEXT NOT NULL DEFAULT 'AKTIF';

-- AlterTable
ALTER TABLE "public"."users" DROP COLUMN "role",
ADD COLUMN     "role" TEXT NOT NULL DEFAULT 'MAL_KABULCU',
ALTER COLUMN "createdAt" DROP NOT NULL,
ALTER COLUMN "createdAt" SET DATA TYPE TIMESTAMP(6),
ALTER COLUMN "updatedAt" DROP NOT NULL,
ALTER COLUMN "updatedAt" SET DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "updatedAt" SET DATA TYPE TIMESTAMP(6);

-- CreateTable
CREATE TABLE "public"."malKabulRecords" (
    "id" TEXT NOT NULL,
    "fisNo" TEXT NOT NULL,
    "tarih" TIMESTAMP(6) NOT NULL,
    "saticiTipi" TEXT NOT NULL,
    "saticiId" TEXT NOT NULL,
    "urunId" TEXT NOT NULL,
    "ureticiId" TEXT NOT NULL,
    "ambalajId" TEXT NOT NULL,
    "brutKg" REAL NOT NULL,
    "daraKg" REAL NOT NULL,
    "girisKg" REAL NOT NULL,
    "cikmaKg" REAL NOT NULL DEFAULT 0,
    "fireKg" REAL NOT NULL DEFAULT 0,
    "netKg" REAL NOT NULL DEFAULT 0,
    "urunDurumu" TEXT NOT NULL DEFAULT 'BEKLEMEDE',
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "malKabulRecords_pkey" PRIMARY KEY ("id")
);
