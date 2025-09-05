-- AlterTable
ALTER TABLE "public"."mal_kabul_records" ADD COLUMN     "belediyeRusumHesapla" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "belediyeRusumOrani" REAL DEFAULT 0,
ADD COLUMN     "evraklar" TEXT[] DEFAULT ARRAY[]::TEXT[],
ADD COLUMN     "fiyatGirenKullanici" TEXT,
ADD COLUMN     "fiyatGirildi" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "fiyatGirilmeTarihi" TIMESTAMP(6),
ADD COLUMN     "kdvHesapla" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "kdvOrani" REAL DEFAULT 0;
