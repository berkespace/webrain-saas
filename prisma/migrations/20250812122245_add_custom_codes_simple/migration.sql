/*
  Warnings:

  - The values [DİĞER] on the enum `AmbalajTipi` will be removed. If these variants are still used in the database, this will fail.
  - A unique constraint covering the columns `[mustahsilNo]` on the table `mustahsil` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[firmaNo]` on the table `ozel_firmalar` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[stokKodu]` on the table `urunler` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `mustahsilNo` to the `mustahsil` table without a default value. This is not possible if the table is not empty.
  - Added the required column `firmaNo` to the `ozel_firmalar` table without a default value. This is not possible if the table is not empty.
  - Added the required column `stokKodu` to the `urunler` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "public"."AmbalajTipi_new" AS ENUM ('PALET', 'PLASTIK_KASA', 'KARTON_KASA');
ALTER TABLE "public"."ambalajlar" ALTER COLUMN "tipi" TYPE "public"."AmbalajTipi_new" USING ("tipi"::text::"public"."AmbalajTipi_new");
ALTER TYPE "public"."AmbalajTipi" RENAME TO "AmbalajTipi_old";
ALTER TYPE "public"."AmbalajTipi_new" RENAME TO "AmbalajTipi";
DROP TYPE "public"."AmbalajTipi_old";
COMMIT;

-- AlterTable
ALTER TABLE "public"."mustahsil" ADD COLUMN     "mustahsilNo" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "public"."ozel_firmalar" ADD COLUMN     "firmaNo" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "public"."urunler" ADD COLUMN     "stokKodu" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "mustahsil_mustahsilNo_key" ON "public"."mustahsil"("mustahsilNo");

-- CreateIndex
CREATE UNIQUE INDEX "ozel_firmalar_firmaNo_key" ON "public"."ozel_firmalar"("firmaNo");

-- CreateIndex
CREATE UNIQUE INDEX "urunler_stokKodu_key" ON "public"."urunler"("stokKodu");
