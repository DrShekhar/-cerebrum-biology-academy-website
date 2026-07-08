#!/usr/bin/env bash
# One-shot: apply the Jul 8 2026 shared_tasks board table to prod.
#   bash scripts/apply-shared-tasks.sh
# Idempotent (CREATE TABLE/INDEX IF NOT EXISTS).
set -euo pipefail
cd "$(dirname "$0")/.."
echo "Applying prisma/manual-migrations/2026-07-08_add_shared_tasks.sql…"
npx prisma db execute --file prisma/manual-migrations/2026-07-08_add_shared_tasks.sql --schema prisma/schema.prisma
echo "✅ Done. shared_tasks board is live."
