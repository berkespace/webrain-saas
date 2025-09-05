-- AlterTable
ALTER TABLE "public"."mal_kabul_records" ADD COLUMN     "kdvHaricTutar" REAL DEFAULT 0;

-- CreateTable
CREATE TABLE "public"."cari_hesaplar" (
    "id" TEXT NOT NULL,
    "saticiTipi" TEXT NOT NULL,
    "saticiId" TEXT NOT NULL,
    "saticiAdi" TEXT NOT NULL,
    "alisTarihi" TIMESTAMP(6) NOT NULL,
    "fisNo" TEXT NOT NULL,
    "malKabulRecordId" TEXT NOT NULL,
    "toplamAlisMiktari" REAL NOT NULL,
    "birimFiyat" REAL NOT NULL,
    "kdvHaricTutar" REAL NOT NULL,
    "herseyDahilTutar" REAL NOT NULL,
    "cariBakiyesi" REAL NOT NULL,
    "createdAt" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "cari_hesaplar_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "cari_hesaplar_malKabulRecordId_key" ON "public"."cari_hesaplar"("malKabulRecordId");

-- AddForeignKey
ALTER TABLE "public"."cari_hesaplar" ADD CONSTRAINT "cari_hesaplar_malKabulRecordId_fkey" FOREIGN KEY ("malKabulRecordId") REFERENCES "public"."mal_kabul_records"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
