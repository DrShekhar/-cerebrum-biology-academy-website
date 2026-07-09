-- LW-parity items 4+5: free-preview chapters + completion next-course offer.
-- Additive + idempotent.
ALTER TABLE "chapters" ADD COLUMN IF NOT EXISTS "isFreePreview" BOOLEAN NOT NULL DEFAULT false;
ALTER TABLE "courses" ADD COLUMN IF NOT EXISTS "nextCourseId" TEXT;
ALTER TABLE "courses" ADD COLUMN IF NOT EXISTS "nextCourseOfferText" TEXT;
