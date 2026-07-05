-- Demo/faculty booking calendar: recurring slots + blocks.
-- Additive-only (two new tables, no existing table touched).
-- Apply with:
--   npx prisma db execute --file scripts/sql/2026-07-05-demo-slots.sql --url "$DIRECT_DATABASE_URL"

CREATE TABLE IF NOT EXISTS "public"."demo_slots" (
    "id"           TEXT NOT NULL,
    "dayOfWeek"    INTEGER NOT NULL,
    "startTime"    TEXT NOT NULL,
    "durationMins" INTEGER NOT NULL DEFAULT 45,
    "teacherId"    TEXT,
    "teacherName"  TEXT,
    "capacity"     INTEGER NOT NULL DEFAULT 15,
    "zoomJoinUrl"  TEXT,
    "track"        TEXT,
    "isActive"     BOOLEAN NOT NULL DEFAULT true,
    "createdAt"    TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt"    TIMESTAMP(3) NOT NULL,
    CONSTRAINT "demo_slots_pkey" PRIMARY KEY ("id")
);
CREATE INDEX IF NOT EXISTS "demo_slots_dayOfWeek_isActive_idx" ON "public"."demo_slots"("dayOfWeek", "isActive");

CREATE TABLE IF NOT EXISTS "public"."demo_slot_blocks" (
    "id"        TEXT NOT NULL,
    "startDate" TEXT NOT NULL,
    "endDate"   TEXT NOT NULL,
    "slotId"    TEXT,
    "startTime" TEXT,
    "reason"    TEXT,
    "createdBy" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "demo_slot_blocks_pkey" PRIMARY KEY ("id")
);
CREATE INDEX IF NOT EXISTS "demo_slot_blocks_startDate_endDate_idx" ON "public"."demo_slot_blocks"("startDate", "endDate");
