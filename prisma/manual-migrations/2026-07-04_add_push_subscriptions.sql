-- Additive: web-push (VAPID) subscription storage.
-- Idempotent; no DROPs. Apply with: prisma db push (or run directly).

CREATE TABLE IF NOT EXISTS "push_subscriptions" (
  "id"        TEXT NOT NULL,
  "userId"    TEXT,
  "endpoint"  TEXT NOT NULL,
  "p256dh"    TEXT NOT NULL,
  "auth"      TEXT NOT NULL,
  "userAgent" TEXT,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "push_subscriptions_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX IF NOT EXISTS "push_subscriptions_endpoint_key"
  ON "push_subscriptions" ("endpoint");
CREATE INDEX IF NOT EXISTS "push_subscriptions_userId_idx"
  ON "push_subscriptions" ("userId");
