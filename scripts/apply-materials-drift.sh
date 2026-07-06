#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")/.."
npx prisma db execute --file scripts/sql/2026-07-06-materials-tier-drift.sql --schema prisma/schema.prisma
echo "✅ study_materials.requiredTier added."
