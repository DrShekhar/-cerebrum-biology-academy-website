-- Additive: study_materials.requiredTier (CoachingTier, nullable).
-- null = no tier restriction (existing behaviour unchanged). Gates the material
-- AND any video lecture attached via video_lectures.studyMaterialId.
-- Idempotent; no DROPs. Apply with: prisma db push (or run directly).

ALTER TABLE "study_materials"
  ADD COLUMN IF NOT EXISTS "requiredTier" "CoachingTier";
