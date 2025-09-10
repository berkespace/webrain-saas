-- AlterTable
ALTER TABLE "public"."users" ADD COLUMN     "birthDate" TIMESTAMP(6),
ADD COLUMN     "contactEmail" TEXT,
ADD COLUMN     "gender" TEXT,
ADD COLUMN     "lastLoginAt" TIMESTAMP(6),
ADD COLUMN     "lastLogoutAt" TIMESTAMP(6),
ADD COLUMN     "phone" TEXT;

-- CreateTable
CREATE TABLE "public"."user_activity_logs" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "action" TEXT NOT NULL,
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "user_activity_logs_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "user_activity_logs_userId_createdAt_idx" ON "public"."user_activity_logs"("userId", "createdAt");

-- AddForeignKey
ALTER TABLE "public"."user_activity_logs" ADD CONSTRAINT "user_activity_logs_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
