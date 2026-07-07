#!/usr/bin/env bash
# One-shot: apply the phoneNormalized UNIQUE index to prod (Stage 3 of the
# Jul 2026 CRM refactor). Run ONLY after:
#   1. POST /api/admin/leads/backfill        (promote content_leads)
#   2. POST /api/admin/leads/merge-duplicates (collapse dupes; dryRun first)
# The SQL itself aborts safely if duplicates remain.
#   bash scripts/apply-phone-unique-index.sh
set -euo pipefail
cd "$(dirname "$0")/.."

echo "Applying guarded phoneNormalized unique index…"
npx prisma db execute --file scripts/sql/2026-07-07-phone-unique-guarded.sql --schema prisma/schema.prisma
echo "✅ Done. Concurrent duplicate-lead race is now closed at the DB level."
