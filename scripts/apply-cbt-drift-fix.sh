#!/usr/bin/env bash
# One-shot: apply the Jul 6 2026 additive schema-drift fix to prod.
#   bash scripts/apply-cbt-drift-fix.sh
# Fixes: CBT mock-test start 500s (test_sessions.answerState/percentileRank
# missing) + missing worksheets tables. Idempotent — safe to re-run.
set -euo pipefail
cd "$(dirname "$0")/.."

echo "Applying scripts/sql/2026-07-06-cbt-worksheets-drift.sql to the database in .env…"
npx prisma db execute --file scripts/sql/2026-07-06-cbt-worksheets-drift.sql --schema prisma/schema.prisma
echo "✅ Done. CBT sessions, AI feedback, and worksheets are now schema-complete."
