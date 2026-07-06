-- study_materials.requiredTier missing in prod (P2022 on seed + any query
-- selecting it). CoachingTier enum already exists (users.coachingTier).
ALTER TABLE "study_materials" ADD COLUMN IF NOT EXISTS "requiredTier" "CoachingTier";
