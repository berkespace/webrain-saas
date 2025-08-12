/*
  Warnings:

  - A unique constraint covering the columns `[komisyonKodu]` on the table `komisyoncular` will be added. If there are existing duplicate values, this will fail.
*/

-- AlterTable
ALTER TABLE "public"."komisyoncular" ADD COLUMN "komisyonKodu" TEXT;

-- Update existing records with a default komisyonKodu
UPDATE "public"."komisyoncular" 
SET "komisyonKodu" = 'KOM001'
WHERE "komisyonKodu" IS NULL;

-- Make the column NOT NULL after updating existing data
ALTER TABLE "public"."komisyoncular" ALTER COLUMN "komisyonKodu" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "komisyoncular_komisyonKodu_key" ON "public"."komisyoncular"("komisyonKodu");
