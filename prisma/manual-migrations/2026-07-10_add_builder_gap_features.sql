-- Builder gap features: audio + assignment lesson types, assignment-lesson
-- link, and mentor 1:1 booking. All additive.

-- 1. New lesson types
ALTER TYPE "MaterialType" ADD VALUE IF NOT EXISTS 'AUDIO';
ALTER TYPE "MaterialType" ADD VALUE IF NOT EXISTS 'ASSIGNMENT';

-- 2. Link an ASSIGNMENT lesson to its assignments row
ALTER TABLE "study_materials" ADD COLUMN IF NOT EXISTS "assignmentId" TEXT;
ALTER TABLE "study_materials"
  ADD CONSTRAINT "study_materials_assignmentId_fkey"
  FOREIGN KEY ("assignmentId") REFERENCES "assignments"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- 3. Mentor 1:1 / small-group booking
CREATE TABLE IF NOT EXISTS "mentor_slots" (
  "id" TEXT NOT NULL,
  "teacherId" TEXT NOT NULL,
  "teacherName" TEXT,
  "dayOfWeek" INTEGER NOT NULL,
  "startTime" TEXT NOT NULL,
  "durationMins" INTEGER NOT NULL DEFAULT 30,
  "capacity" INTEGER NOT NULL DEFAULT 1,
  "mode" TEXT NOT NULL DEFAULT 'online',
  "meetingUrl" TEXT,
  "topic" TEXT,
  "courseId" TEXT,
  "isActive" BOOLEAN NOT NULL DEFAULT true,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "mentor_slots_pkey" PRIMARY KEY ("id")
);
CREATE INDEX IF NOT EXISTS "mentor_slots_teacherId_isActive_idx" ON "mentor_slots"("teacherId", "isActive");
CREATE INDEX IF NOT EXISTS "mentor_slots_dayOfWeek_isActive_idx" ON "mentor_slots"("dayOfWeek", "isActive");

CREATE TABLE IF NOT EXISTS "mentor_bookings" (
  "id" TEXT NOT NULL,
  "slotId" TEXT NOT NULL,
  "studentId" TEXT NOT NULL,
  "teacherId" TEXT NOT NULL,
  "date" TEXT NOT NULL,
  "startTime" TEXT NOT NULL,
  "status" TEXT NOT NULL DEFAULT 'BOOKED',
  "studentNote" TEXT,
  "meetingUrl" TEXT,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "mentor_bookings_pkey" PRIMARY KEY ("id")
);
CREATE UNIQUE INDEX IF NOT EXISTS "mentor_bookings_slotId_date_startTime_studentId_key" ON "mentor_bookings"("slotId", "date", "startTime", "studentId");
CREATE INDEX IF NOT EXISTS "mentor_bookings_studentId_status_idx" ON "mentor_bookings"("studentId", "status");
CREATE INDEX IF NOT EXISTS "mentor_bookings_teacherId_date_idx" ON "mentor_bookings"("teacherId", "date");
CREATE INDEX IF NOT EXISTS "mentor_bookings_slotId_date_idx" ON "mentor_bookings"("slotId", "date");
ALTER TABLE "mentor_bookings"
  ADD CONSTRAINT "mentor_bookings_slotId_fkey"
  FOREIGN KEY ("slotId") REFERENCES "mentor_slots"("id") ON DELETE CASCADE ON UPDATE CASCADE;
