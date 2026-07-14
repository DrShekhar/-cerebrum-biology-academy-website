-- Adds users.isActive — referenced by the lead round-robin assignment filters
-- (commit 801b2853) but never created, so every new-phone lead write threw
-- PrismaClientValidationError at runtime and was silently dropped. Additive,
-- defaults true so all existing users stay active. Safe/idempotent.
--
-- After applying: set the test/demo staff accounts to isActive=false so they
-- stop winning round-robin, e.g.:
--   UPDATE "users" SET "isActive" = false WHERE name ILIKE '%test%' OR name ILIKE '%demo%';

ALTER TABLE "users"
  ADD COLUMN IF NOT EXISTS "isActive" BOOLEAN NOT NULL DEFAULT true;

CREATE INDEX IF NOT EXISTS "users_role_isActive_idx" ON "users" ("role", "isActive");
