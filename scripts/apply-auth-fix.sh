#!/bin/bash
# One-shot: applies scripts/sql/2026-07-05-auth-adapter-tables.sql to the
# production DB (additive-only — creates NextAuth's accounts +
# verification_tokens tables and adds users.subscriptionTier).
# Usage:  bash scripts/apply-auth-fix.sh
set -euo pipefail
cd "$(dirname "$0")/.."

URL="$(grep '^DIRECT_DATABASE_URL' .env.local | cut -d= -f2- | tr -d '"' | tr -d "'")"
if [ -z "$URL" ]; then
  echo "ERROR: DIRECT_DATABASE_URL not found in .env.local" >&2
  exit 1
fi

npx prisma db execute --file scripts/sql/2026-07-05-auth-adapter-tables.sql --url "$URL"
echo ""
echo "✅ Auth tables applied. Google/Facebook + phone login should work now."
