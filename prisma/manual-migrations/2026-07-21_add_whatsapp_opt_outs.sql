-- Additive: WhatsApp opt-out / consent-withdrawal ledger (DPDP + WhatsApp
-- Commerce Policy). A row = the person texted STOP (or was manually suppressed)
-- and must receive NO automated WhatsApp marketing. Keyed by last-10 phone.
-- Idempotent; no DROPs. Apply: psql "$DIRECT_DATABASE_URL" -f <this file>
CREATE TABLE IF NOT EXISTS "whatsapp_opt_outs" (
  "id"        TEXT NOT NULL,
  "phone"     TEXT NOT NULL,
  "reason"    TEXT NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "whatsapp_opt_outs_pkey" PRIMARY KEY ("id")
);
CREATE UNIQUE INDEX IF NOT EXISTS "whatsapp_opt_outs_phone_key" ON "whatsapp_opt_outs" ("phone");
CREATE INDEX IF NOT EXISTS "whatsapp_opt_outs_phone_idx" ON "whatsapp_opt_outs" ("phone");
