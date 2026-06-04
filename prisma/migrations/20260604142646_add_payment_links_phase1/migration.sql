-- CreateEnum
CREATE TYPE "public"."PaymentLinkProvider" AS ENUM ('RAZORPAY', 'CASHFREE');

-- CreateEnum
CREATE TYPE "public"."PaymentLinkStatus" AS ENUM ('ACTIVE', 'PAID', 'PARTIALLY_PAID', 'EXPIRED', 'CANCELLED');

-- CreateTable
CREATE TABLE "public"."payment_links" (
    "id" TEXT NOT NULL,
    "leadId" TEXT NOT NULL,
    "createdById" TEXT NOT NULL,
    "amount" DECIMAL(10,2) NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'INR',
    "description" TEXT NOT NULL,
    "provider" "public"."PaymentLinkProvider" NOT NULL,
    "providerLinkId" TEXT NOT NULL,
    "shortUrl" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "status" "public"."PaymentLinkStatus" NOT NULL DEFAULT 'ACTIVE',
    "paidAt" TIMESTAMP(3),
    "paidAmount" DECIMAL(10,2),
    "remindersSent" INTEGER NOT NULL DEFAULT 0,
    "lastReminderAt" TIMESTAMP(3),
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "payment_links_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "payment_links_providerLinkId_key" ON "public"."payment_links"("providerLinkId");

-- CreateIndex
CREATE INDEX "payment_links_leadId_status_idx" ON "public"."payment_links"("leadId", "status");

-- CreateIndex
CREATE INDEX "payment_links_createdById_idx" ON "public"."payment_links"("createdById");

-- CreateIndex
CREATE INDEX "payment_links_status_expiresAt_idx" ON "public"."payment_links"("status", "expiresAt");

-- AddForeignKey
ALTER TABLE "public"."payment_links" ADD CONSTRAINT "payment_links_leadId_fkey" FOREIGN KEY ("leadId") REFERENCES "public"."leads"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."payment_links" ADD CONSTRAINT "payment_links_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "public"."users"("id") ON DELETE NO ACTION ON UPDATE CASCADE;
