-- AlterTable
ALTER TABLE "public"."mal_kabul_records" ADD COLUMN     "faturaAciklamasi" TEXT,
ADD COLUMN     "faturaSeriNo" TEXT,
ADD COLUMN     "faturaTarihi" TIMESTAMP(6),
ADD COLUMN     "faturaYontemi" TEXT DEFAULT 'EVRAK',
ADD COLUMN     "onayDurumu" TEXT DEFAULT 'BEKLEMEDE',
ADD COLUMN     "onayTarihi" TIMESTAMP(6),
ADD COLUMN     "onaylayanKullanici" TEXT,
ADD COLUMN     "redDetayi" TEXT;
