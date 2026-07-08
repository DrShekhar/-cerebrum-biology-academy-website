-- Per-user permission overrides on top of role defaults.
-- Idempotent: safe to run more than once.

CREATE TABLE IF NOT EXISTS "user_permission_overrides" (
  "id"          TEXT NOT NULL,
  "userId"      TEXT NOT NULL,
  "permission"  TEXT NOT NULL,
  "effect"      TEXT NOT NULL,
  "reason"      TEXT,
  "grantedById" TEXT,
  "expiresAt"   TIMESTAMP(3),
  "createdAt"   TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt"   TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "user_permission_overrides_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX IF NOT EXISTS "user_permission_overrides_userId_permission_key"
  ON "user_permission_overrides" ("userId", "permission");

CREATE INDEX IF NOT EXISTS "user_permission_overrides_userId_idx"
  ON "user_permission_overrides" ("userId");

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'user_permission_overrides_userId_fkey'
  ) THEN
    ALTER TABLE "user_permission_overrides"
      ADD CONSTRAINT "user_permission_overrides_userId_fkey"
      FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE CASCADE;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'user_permission_overrides_grantedById_fkey'
  ) THEN
    ALTER TABLE "user_permission_overrides"
      ADD CONSTRAINT "user_permission_overrides_grantedById_fkey"
      FOREIGN KEY ("grantedById") REFERENCES "users" ("id") ON DELETE SET NULL ON UPDATE CASCADE;
  END IF;
END $$;
