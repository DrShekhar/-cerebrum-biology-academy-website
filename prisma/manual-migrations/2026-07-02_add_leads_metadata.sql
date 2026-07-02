-- Additive migration: leads.metadata (Json, nullable)
-- Purpose: persist welcome-series state (and future per-lead flags) that the
-- WhatsApp welcome-series scheduler needs; without it the day-1/3/7 messages
-- are never sent (state cannot be tracked between cron runs).
-- Safe: single nullable column, no defaults backfilled, 0 DROPs.
-- Apply with: prisma db push  (or run this SQL directly)

ALTER TABLE "leads" ADD COLUMN IF NOT EXISTS "metadata" JSONB;
