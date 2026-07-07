-- Phase 2 builder features (Jul 7 2026, additive only).
-- 1. Drip by days-after-enrollment (Thinkific/LearnWorlds evergreen drip):
--    chapters.dripDaysAfterEnroll — NULL = no enrollment-relative drip;
--    combines with the existing fixed-date releaseAt (locked if EITHER gate
--    is still in the future).
-- 2. Quiz-as-lesson: study_materials can point at a test template so
--    assessments live inside the curriculum flow.

ALTER TABLE "chapters" ADD COLUMN IF NOT EXISTS "dripDaysAfterEnroll" INTEGER;

ALTER TABLE "study_materials" ADD COLUMN IF NOT EXISTS "testTemplateId" TEXT;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'study_materials_testTemplateId_fkey') THEN
    ALTER TABLE "study_materials"
      ADD CONSTRAINT "study_materials_testTemplateId_fkey"
      FOREIGN KEY ("testTemplateId") REFERENCES "test_templates"("id")
      ON DELETE SET NULL ON UPDATE CASCADE;
  END IF;
END $$;

-- MaterialType gains TEST (enum ADD VALUE is additive and irreversible-safe).
DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_enum e
    JOIN pg_type t ON t.oid = e.enumtypid
    WHERE t.typname = 'MaterialType' AND e.enumlabel = 'TEST'
  ) THEN
    ALTER TYPE "MaterialType" ADD VALUE 'TEST';
  END IF;
END $$;
