-- Article (rich-text) lessons — LW-parity item 1. Additive + idempotent.

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_enum e
    JOIN pg_type t ON t.oid = e.enumtypid
    WHERE t.typname = 'MaterialType' AND e.enumlabel = 'ARTICLE'
  ) THEN
    ALTER TYPE "MaterialType" ADD VALUE 'ARTICLE';
  END IF;
END $$;

ALTER TABLE "study_materials" ADD COLUMN IF NOT EXISTS "contentBody" TEXT;
