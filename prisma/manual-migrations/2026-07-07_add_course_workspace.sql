-- Course workspace fields (Jul 7 2026, additive only).
-- Adds the columns the admin course forms were already collecting but the
-- model could not store (instructor, capacity, start date, schedule), plus a
-- publish lifecycle and a thumbnail. Existing rows default to PUBLISHED so no
-- live course disappears from any public or student query.

ALTER TABLE "courses" ADD COLUMN IF NOT EXISTS "status" TEXT NOT NULL DEFAULT 'PUBLISHED';
ALTER TABLE "courses" ADD COLUMN IF NOT EXISTS "thumbnailUrl" TEXT;
ALTER TABLE "courses" ADD COLUMN IF NOT EXISTS "instructorId" TEXT;
ALTER TABLE "courses" ADD COLUMN IF NOT EXISTS "startDate" TIMESTAMP(3);
ALTER TABLE "courses" ADD COLUMN IF NOT EXISTS "scheduleInfo" TEXT;
ALTER TABLE "courses" ADD COLUMN IF NOT EXISTS "maxCapacity" INTEGER;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'courses_instructorId_fkey') THEN
    ALTER TABLE "courses"
      ADD CONSTRAINT "courses_instructorId_fkey"
      FOREIGN KEY ("instructorId") REFERENCES "users"("id")
      ON DELETE SET NULL ON UPDATE CASCADE;
  END IF;
END $$;

CREATE INDEX IF NOT EXISTS "courses_status_idx" ON "courses"("status");
