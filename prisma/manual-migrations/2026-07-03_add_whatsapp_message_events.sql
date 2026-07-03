-- Additive: idempotency ledger for WhatsApp delivery/read status webhooks.
-- Prevents Interakt webhook retries from double-counting campaign metrics.
-- Idempotent; no DROPs. Apply with: prisma db push (or run directly).

CREATE TABLE IF NOT EXISTS "whatsapp_message_events" (
  "id"         TEXT NOT NULL,
  "messageId"  TEXT NOT NULL,
  "status"     TEXT NOT NULL,
  "campaignId" TEXT,
  "createdAt"  TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "whatsapp_message_events_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX IF NOT EXISTS "whatsapp_message_events_messageId_status_key"
  ON "whatsapp_message_events" ("messageId", "status");
CREATE INDEX IF NOT EXISTS "whatsapp_message_events_campaignId_idx"
  ON "whatsapp_message_events" ("campaignId");
