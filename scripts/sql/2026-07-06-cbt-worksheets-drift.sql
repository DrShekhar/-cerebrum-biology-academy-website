-- Additive schema-drift fix (Jul 6, 2026) — verified against live prod via
-- read-only inspection. NEVER run blanket `prisma db push` on this DB.
--
-- 1) test_sessions is missing answerState + percentileRank → EVERY CBT mock
--    test start 500s in prod (POST /api/cbt/session), and the new AI-feedback
--    endpoint fails on the same column.
-- 2) worksheets + worksheet_submissions tables were never created → the
--    student worksheets feature 500s.
-- All statements are idempotent (IF NOT EXISTS) and purely additive.

ALTER TABLE "test_sessions" ADD COLUMN IF NOT EXISTS "answerState" JSONB;
ALTER TABLE "test_sessions" ADD COLUMN IF NOT EXISTS "percentileRank" DOUBLE PRECISION;

CREATE TABLE IF NOT EXISTS "worksheets" (
  "id"                  TEXT PRIMARY KEY,
  "title"               TEXT NOT NULL,
  "description"         TEXT,
  "courseId"            TEXT,
  "chapterId"           TEXT,
  "topicId"             TEXT,
  "content"             JSONB,
  "instructions"        TEXT,
  "maxMarks"            INTEGER,
  "duration"            INTEGER,
  "difficulty"          "DifficultyLevel",
  "status"              TEXT NOT NULL DEFAULT 'DRAFT',
  "dueDate"             TIMESTAMP(3),
  "allowLateSubmission" BOOLEAN NOT NULL DEFAULT false,
  "publishedAt"         TIMESTAMP(3),
  "attachments"         JSONB,
  "tags"                TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[],
  "downloadCount"       INTEGER NOT NULL DEFAULT 0,
  "createdAt"           TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt"           TIMESTAMP(3) NOT NULL
);

CREATE INDEX IF NOT EXISTS "worksheets_status_publishedAt_idx" ON "worksheets"("status", "publishedAt");
CREATE INDEX IF NOT EXISTS "worksheets_courseId_idx" ON "worksheets"("courseId");
CREATE INDEX IF NOT EXISTS "worksheets_difficulty_idx" ON "worksheets"("difficulty");
CREATE INDEX IF NOT EXISTS "worksheets_dueDate_idx" ON "worksheets"("dueDate");

CREATE TABLE IF NOT EXISTS "worksheet_submissions" (
  "id"          TEXT PRIMARY KEY,
  "worksheetId" TEXT NOT NULL REFERENCES "worksheets"("id") ON DELETE CASCADE,
  "studentId"   TEXT NOT NULL REFERENCES "users"("id") ON DELETE CASCADE,
  "status"      TEXT NOT NULL DEFAULT 'NOT_STARTED',
  "answers"     JSONB,
  "attachments" JSONB,
  "grade"       DOUBLE PRECISION,
  "feedback"    TEXT,
  "isLate"      BOOLEAN NOT NULL DEFAULT false,
  "timeSpent"   INTEGER,
  "startedAt"   TIMESTAMP(3),
  "submittedAt" TIMESTAMP(3),
  "gradedAt"    TIMESTAMP(3),
  "createdAt"   TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt"   TIMESTAMP(3) NOT NULL
);

CREATE UNIQUE INDEX IF NOT EXISTS "worksheet_submissions_worksheetId_studentId_key" ON "worksheet_submissions"("worksheetId", "studentId");
CREATE INDEX IF NOT EXISTS "worksheet_submissions_studentId_idx" ON "worksheet_submissions"("studentId");
CREATE INDEX IF NOT EXISTS "worksheet_submissions_worksheetId_idx" ON "worksheet_submissions"("worksheetId");
CREATE INDEX IF NOT EXISTS "worksheet_submissions_status_idx" ON "worksheet_submissions"("status");
