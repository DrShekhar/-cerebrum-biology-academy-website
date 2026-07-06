-- Additive student-groups (batches/cohorts) schema (Jul 6, 2026) — roadmap §F.
-- Admin creates groups, adds students, assigns materials/videos/tests to the
-- whole group; optional cohort scheduling via releaseAt (absolute) or
-- dayOffset (days after student_groups.startDate).
-- All statements are idempotent (IF NOT EXISTS) and purely additive.
-- NEVER run blanket `prisma db push` on this DB. Owner-run via:
--   bash scripts/apply-student-groups.sh

CREATE TABLE IF NOT EXISTS "student_groups" (
  "id"          TEXT PRIMARY KEY,
  "name"        TEXT NOT NULL,
  "description" TEXT,
  "classLevel"  "StudentClass",
  "startDate"   TIMESTAMP(3),
  "endDate"     TIMESTAMP(3),
  "createdBy"   TEXT NOT NULL,
  "createdAt"   TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS "student_groups_classLevel_idx" ON "student_groups"("classLevel");

CREATE TABLE IF NOT EXISTS "student_group_members" (
  "id"      TEXT PRIMARY KEY,
  "groupId" TEXT NOT NULL REFERENCES "student_groups"("id") ON DELETE CASCADE,
  "userId"  TEXT NOT NULL REFERENCES "users"("id") ON DELETE CASCADE,
  "addedBy" TEXT NOT NULL,
  "addedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE UNIQUE INDEX IF NOT EXISTS "student_group_members_groupId_userId_key" ON "student_group_members"("groupId", "userId");
CREATE INDEX IF NOT EXISTS "student_group_members_userId_idx" ON "student_group_members"("userId");

CREATE TABLE IF NOT EXISTS "group_content" (
  "id"             TEXT PRIMARY KEY,
  "groupId"        TEXT NOT NULL REFERENCES "student_groups"("id") ON DELETE CASCADE,
  "materialId"     TEXT REFERENCES "study_materials"("id") ON DELETE CASCADE,
  "videoLectureId" TEXT REFERENCES "video_lectures"("id") ON DELETE CASCADE,
  "testTemplateId" TEXT REFERENCES "test_templates"("id") ON DELETE CASCADE,
  "releaseAt"      TIMESTAMP(3),
  "dayOffset"      INTEGER,
  "assignedBy"     TEXT NOT NULL,
  "assignedAt"     TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS "group_content_groupId_idx" ON "group_content"("groupId");
CREATE INDEX IF NOT EXISTS "group_content_materialId_idx" ON "group_content"("materialId");
CREATE INDEX IF NOT EXISTS "group_content_videoLectureId_idx" ON "group_content"("videoLectureId");
CREATE INDEX IF NOT EXISTS "group_content_testTemplateId_idx" ON "group_content"("testTemplateId");

-- Cohort scoping on existing tables (plain nullable columns; no FK constraint
-- so the ALTER stays trivially idempotent — app code treats them as loose refs)
ALTER TABLE "class_sessions" ADD COLUMN IF NOT EXISTS "groupId" TEXT;
CREATE INDEX IF NOT EXISTS "class_sessions_groupId_idx" ON "class_sessions"("groupId");

ALTER TABLE "notices" ADD COLUMN IF NOT EXISTS "groupId" TEXT;
CREATE INDEX IF NOT EXISTS "notices_groupId_idx" ON "notices"("groupId");
