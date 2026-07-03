-- Additive: chapter drip scheduling + prerequisite progression (course builder).
-- releaseAt: chapter locked for students until this timestamp (null = immediate).
-- requiresPrevious: chapter locked until the previous chapter is completed.
-- Idempotent; no DROPs. Apply with: prisma db push (or run directly).

ALTER TABLE "chapters" ADD COLUMN IF NOT EXISTS "releaseAt" TIMESTAMP(3);
ALTER TABLE "chapters" ADD COLUMN IF NOT EXISTS "requiresPrevious" BOOLEAN NOT NULL DEFAULT false;
