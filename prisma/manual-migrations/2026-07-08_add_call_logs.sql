-- Click-to-call logs (Exotel bridge calls). Additive + idempotent.

CREATE TABLE IF NOT EXISTS "call_logs" (
  "id"              TEXT NOT NULL,
  "leadId"          TEXT NOT NULL,
  "counselorId"     TEXT NOT NULL,
  "provider"        TEXT NOT NULL DEFAULT 'exotel',
  "providerCallSid" TEXT,
  "fromNumber"      TEXT NOT NULL,
  "toNumber"        TEXT NOT NULL,
  "status"          TEXT NOT NULL DEFAULT 'initiated',
  "durationSec"     INTEGER,
  "recordingUrl"    TEXT,
  "startedAt"       TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "endedAt"         TIMESTAMP(3),
  "createdAt"       TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt"       TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "call_logs_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX IF NOT EXISTS "call_logs_providerCallSid_key" ON "call_logs" ("providerCallSid");
CREATE INDEX IF NOT EXISTS "call_logs_leadId_createdAt_idx" ON "call_logs" ("leadId", "createdAt");
CREATE INDEX IF NOT EXISTS "call_logs_counselorId_createdAt_idx" ON "call_logs" ("counselorId", "createdAt");

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'call_logs_leadId_fkey') THEN
    ALTER TABLE "call_logs"
      ADD CONSTRAINT "call_logs_leadId_fkey"
      FOREIGN KEY ("leadId") REFERENCES "leads" ("id") ON DELETE CASCADE ON UPDATE CASCADE;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'call_logs_counselorId_fkey') THEN
    ALTER TABLE "call_logs"
      ADD CONSTRAINT "call_logs_counselorId_fkey"
      FOREIGN KEY ("counselorId") REFERENCES "users" ("id") ON UPDATE CASCADE;
  END IF;
END $$;
