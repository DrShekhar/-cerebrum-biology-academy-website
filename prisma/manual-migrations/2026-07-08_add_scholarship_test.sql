-- Scholarship test funnel (PLATFORM_VISION §3.1). Additive + idempotent.

CREATE TABLE IF NOT EXISTS "scholarship_tests" (
  "id"            TEXT NOT NULL,
  "slug"          TEXT NOT NULL,
  "name"          TEXT NOT NULL,
  "isActive"      BOOLEAN NOT NULL DEFAULT true,
  "questionCount" INTEGER NOT NULL DEFAULT 45,
  "durationMin"   INTEGER NOT NULL DEFAULT 60,
  "windowStartAt" TIMESTAMP(3),
  "windowEndAt"   TIMESTAMP(3),
  "waiverBands"   JSONB NOT NULL,
  "createdAt"     TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt"     TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "scholarship_tests_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX IF NOT EXISTS "scholarship_tests_slug_key" ON "scholarship_tests" ("slug");

CREATE TABLE IF NOT EXISTS "scholarship_registrations" (
  "id"             TEXT NOT NULL,
  "testId"         TEXT NOT NULL,
  "token"          TEXT NOT NULL,
  "studentName"    TEXT NOT NULL,
  "phone"          TEXT NOT NULL,
  "email"          TEXT,
  "classLevel"     TEXT NOT NULL,
  "city"           TEXT,
  "status"         TEXT NOT NULL DEFAULT 'REGISTERED',
  "paper"          JSONB,
  "answerState"    JSONB,
  "score"          INTEGER,
  "maxScore"       INTEGER,
  "correctCount"   INTEGER,
  "incorrectCount" INTEGER,
  "percent"        DOUBLE PRECISION,
  "waiverPercent"  INTEGER,
  "suspicious"     JSONB,
  "leadId"         TEXT,
  "startedAt"      TIMESTAMP(3),
  "completedAt"    TIMESTAMP(3),
  "createdAt"      TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt"      TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "scholarship_registrations_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX IF NOT EXISTS "scholarship_registrations_token_key" ON "scholarship_registrations" ("token");
CREATE INDEX IF NOT EXISTS "scholarship_registrations_testId_createdAt_idx" ON "scholarship_registrations" ("testId", "createdAt");
CREATE INDEX IF NOT EXISTS "scholarship_registrations_phone_idx" ON "scholarship_registrations" ("phone");

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'scholarship_registrations_testId_fkey'
  ) THEN
    ALTER TABLE "scholarship_registrations"
      ADD CONSTRAINT "scholarship_registrations_testId_fkey"
      FOREIGN KEY ("testId") REFERENCES "scholarship_tests" ("id") ON DELETE CASCADE ON UPDATE CASCADE;
  END IF;
END $$;
