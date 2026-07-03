-- Additive: marketing_campaigns table (admin marketing section, real Prisma).
-- Abandoned carts are derived live from PENDING enrollments — no table needed.
-- Idempotent-ish; no DROPs. Apply with: prisma db push (or run directly).

CREATE TABLE IF NOT EXISTS "marketing_campaigns" (
  "id"                  TEXT NOT NULL,
  "name"                TEXT NOT NULL,
  "type"                TEXT NOT NULL,
  "status"              TEXT NOT NULL DEFAULT 'draft',
  "objective"           TEXT NOT NULL,
  "targetAudience"      JSONB NOT NULL,
  "contentWhatsapp"     JSONB,
  "contentSms"          JSONB,
  "contentEmail"        JSONB,
  "scheduledAt"         TIMESTAMP(3),
  "frequency"           TEXT,
  "endDate"             TIMESTAMP(3),
  "metricsSent"         INTEGER NOT NULL DEFAULT 0,
  "metricsDelivered"    INTEGER NOT NULL DEFAULT 0,
  "metricsOpened"       INTEGER NOT NULL DEFAULT 0,
  "metricsClicked"      INTEGER NOT NULL DEFAULT 0,
  "metricsConverted"    INTEGER NOT NULL DEFAULT 0,
  "metricsUnsubscribed" INTEGER NOT NULL DEFAULT 0,
  "metricsCost"         INTEGER NOT NULL DEFAULT 0,
  "createdById"         TEXT,
  "createdAt"           TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt"           TIMESTAMP(3) NOT NULL,
  CONSTRAINT "marketing_campaigns_pkey" PRIMARY KEY ("id")
);

CREATE INDEX IF NOT EXISTS "marketing_campaigns_status_createdAt_idx"
  ON "marketing_campaigns" ("status", "createdAt");
CREATE INDEX IF NOT EXISTS "marketing_campaigns_scheduledAt_status_idx"
  ON "marketing_campaigns" ("scheduledAt", "status");
CREATE INDEX IF NOT EXISTS "marketing_campaigns_type_status_idx"
  ON "marketing_campaigns" ("type", "status");

-- FK to users (created-by); non-fatal if the constraint already exists.
DO $$
BEGIN
  ALTER TABLE "marketing_campaigns"
    ADD CONSTRAINT "marketing_campaigns_createdById_fkey"
    FOREIGN KEY ("createdById") REFERENCES "users" ("id")
    ON DELETE SET NULL ON UPDATE CASCADE;
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;
