-- Additive: email suppression list (hard bounces + spam complaints).
-- emailService skips suppressed addresses; fed by /api/webhooks/email.
-- Idempotent; no DROPs. Apply with: prisma db push (or run directly).

CREATE TABLE IF NOT EXISTS "email_suppressions" (
  "id"        TEXT NOT NULL,
  "email"     TEXT NOT NULL,
  "reason"    TEXT NOT NULL,
  "detail"    TEXT,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "email_suppressions_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX IF NOT EXISTS "email_suppressions_email_key"
  ON "email_suppressions" ("email");
CREATE INDEX IF NOT EXISTS "email_suppressions_reason_idx"
  ON "email_suppressions" ("reason");
