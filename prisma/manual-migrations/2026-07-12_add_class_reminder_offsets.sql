-- Adds reminder-offset tracking to class_sessions for the class-reminders cron.
-- Stores which "minutes-before" offsets (1440, 60, 15, 1) have already fired so
-- the cron never re-sends. Safe/idempotent to run.

ALTER TABLE "class_sessions"
  ADD COLUMN IF NOT EXISTS "reminderOffsetsSent" INTEGER[] NOT NULL DEFAULT '{}';
