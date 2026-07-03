-- Additive: leads.phoneNormalized = last-10 digits of phone (canonical dedup key).
-- Backfills existing rows and adds a NON-unique index. Safe to run with dupes.
-- The unique index (which fully closes the concurrent-duplicate race via atomic
-- upsert) is a SEPARATE migration to run AFTER de-duplicating:
--   2026-07-03_add_leads_phoneNormalized_unique.sql
-- Idempotent; no DROPs. Apply with: prisma db push (or run directly).

ALTER TABLE "leads" ADD COLUMN IF NOT EXISTS "phoneNormalized" TEXT;

-- Backfill: strip non-digits, take the last 10.
UPDATE "leads"
SET "phoneNormalized" = RIGHT(REGEXP_REPLACE("phone", '\D', '', 'g'), 10)
WHERE "phoneNormalized" IS NULL
  AND LENGTH(REGEXP_REPLACE("phone", '\D', '', 'g')) >= 10;

CREATE INDEX IF NOT EXISTS "leads_phoneNormalized_idx"
  ON "leads" ("phoneNormalized");
