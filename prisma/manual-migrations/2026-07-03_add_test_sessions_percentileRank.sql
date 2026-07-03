-- Additive: test_sessions.percentileRank (Float) — snapshot percentile at submit
-- so the CBT attempts history can show a real percentile per attempt.
-- Idempotent; no DROPs. Apply with: prisma db push (or run directly).

ALTER TABLE "test_sessions" ADD COLUMN IF NOT EXISTS "percentileRank" DOUBLE PRECISION;
