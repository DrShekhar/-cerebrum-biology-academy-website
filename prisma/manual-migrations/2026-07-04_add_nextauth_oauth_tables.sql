-- Additive: NextAuth v5 OAuth adapter tables (accounts + verification_tokens).
-- Persists Google/Facebook OAuth account links; sessions stay JWT (no sessions change).
-- NOTE: email_verification_tokens is a DIFFERENT, pre-existing table — untouched here.
-- Idempotent; no DROPs. Apply with: prisma db push (or run directly).

CREATE TABLE IF NOT EXISTS "accounts" (
  "id"                TEXT NOT NULL,
  "userId"            TEXT NOT NULL,
  "type"              TEXT NOT NULL,
  "provider"          TEXT NOT NULL,
  "providerAccountId" TEXT NOT NULL,
  "refresh_token"     TEXT,
  "access_token"      TEXT,
  "expires_at"        INTEGER,
  "token_type"        TEXT,
  "scope"             TEXT,
  "id_token"          TEXT,
  "session_state"     TEXT,
  CONSTRAINT "accounts_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX IF NOT EXISTS "accounts_provider_providerAccountId_key"
  ON "accounts" ("provider", "providerAccountId");
CREATE INDEX IF NOT EXISTS "accounts_userId_idx"
  ON "accounts" ("userId");

DO $$
BEGIN
  ALTER TABLE "accounts"
    ADD CONSTRAINT "accounts_userId_fkey"
    FOREIGN KEY ("userId") REFERENCES "users" ("id")
    ON DELETE CASCADE ON UPDATE CASCADE;
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

CREATE TABLE IF NOT EXISTS "verification_tokens" (
  "identifier" TEXT NOT NULL,
  "token"      TEXT NOT NULL,
  "expires"    TIMESTAMP(3) NOT NULL
);

CREATE UNIQUE INDEX IF NOT EXISTS "verification_tokens_identifier_token_key"
  ON "verification_tokens" ("identifier", "token");
