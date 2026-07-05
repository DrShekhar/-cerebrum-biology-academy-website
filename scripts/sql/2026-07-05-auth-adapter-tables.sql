-- Auth activation: the two NextAuth adapter tables (accounts,
-- verification_tokens) + the users.subscriptionTier column, extracted from
-- the full prisma migrate diff. Additive-only; no existing data is touched.
--
-- Why each is needed (confirmed from Vercel production runtime errors):
--   * Google/Facebook login: AdapterError "table public.accounts does not
--     exist" on every OAuth callback (18 occurrences).
--   * Phone login: firebase-session crashes with "column
--     users.subscriptionTier does not exist" on prisma.users.findFirst
--     (schema expects it since commit 9188fb53; DB never got it).

ALTER TABLE "public"."users" ADD COLUMN IF NOT EXISTS "subscriptionTier" TEXT;

CREATE TABLE IF NOT EXISTS "public"."accounts" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expires_at" INTEGER,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,

    CONSTRAINT "accounts_pkey" PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "public"."verification_tokens" (
    "identifier" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL
);

CREATE INDEX IF NOT EXISTS "accounts_userId_idx" ON "public"."accounts"("userId");

CREATE UNIQUE INDEX IF NOT EXISTS "accounts_provider_providerAccountId_key" ON "public"."accounts"("provider", "providerAccountId");

CREATE UNIQUE INDEX IF NOT EXISTS "verification_tokens_identifier_token_key" ON "public"."verification_tokens"("identifier", "token");

ALTER TABLE "public"."accounts" DROP CONSTRAINT IF EXISTS "accounts_userId_fkey";
ALTER TABLE "public"."accounts" ADD CONSTRAINT "accounts_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
