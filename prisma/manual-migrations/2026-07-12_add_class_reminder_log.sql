-- Dedup ledger for the class-reminders cron. A separate table (not a column on
-- class_sessions) so it can be deployed independently without risking existing
-- class_sessions reads. Safe/idempotent.

CREATE TABLE IF NOT EXISTS "class_reminder_log" (
  "id"        TEXT NOT NULL,
  "sessionId" TEXT NOT NULL,
  "offset"    INTEGER NOT NULL,
  "sentAt"    TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "class_reminder_log_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX IF NOT EXISTS "class_reminder_log_sessionId_offset_key"
  ON "class_reminder_log" ("sessionId", "offset");

CREATE INDEX IF NOT EXISTS "class_reminder_log_sessionId_idx"
  ON "class_reminder_log" ("sessionId");
