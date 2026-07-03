-- Additive: test_sessions.answerState (Json) — CBT exam simulator attempt state
-- ({ questionIds, answers, marked, visited }) for server-side autosave + resume.
-- Idempotent; no DROPs. Apply with: prisma db push (or run directly).

ALTER TABLE "test_sessions" ADD COLUMN IF NOT EXISTS "answerState" JSONB;
