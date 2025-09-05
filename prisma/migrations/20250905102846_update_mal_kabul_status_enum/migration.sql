/*
  Warnings:

  - The `status` column on the `mal_kabul_records` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "public"."MalKabulStatus" AS ENUM ('BEKLEMEDE', 'NETLENDI', 'IADE');

-- AlterTable
ALTER TABLE "public"."mal_kabul_records" DROP COLUMN "status",
ADD COLUMN     "status" "public"."MalKabulStatus" NOT NULL DEFAULT 'BEKLEMEDE';
