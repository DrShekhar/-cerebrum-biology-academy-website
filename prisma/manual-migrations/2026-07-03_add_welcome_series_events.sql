-- Additive: atomic claim ledger for WhatsApp welcome-series sends.
-- @@unique(leadId, day) makes concurrent cron runs race-safe (no double-send).
-- Idempotent; no DROPs. Apply with: prisma db push (or run directly).

CREATE TABLE IF NOT EXISTS "welcome_series_events" (
  "id"     TEXT NOT NULL,
  "leadId" TEXT NOT NULL,
  "day"    INTEGER NOT NULL,
  "sentAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "welcome_series_events_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX IF NOT EXISTS "welcome_series_events_leadId_day_key"
  ON "welcome_series_events" ("leadId", "day");
CREATE INDEX IF NOT EXISTS "welcome_series_events_leadId_idx"
  ON "welcome_series_events" ("leadId");
