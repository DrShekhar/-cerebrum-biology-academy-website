#!/usr/bin/env bash
# One-shot: apply the Jul 7 2026 course-workspace columns to prod.
#   bash scripts/apply-course-workspace.sh
# Adds courses.status/thumbnailUrl/instructorId/startDate/scheduleInfo/
# maxCapacity (all nullable or defaulted — existing rows stay PUBLISHED).
# Idempotent.
set -euo pipefail
cd "$(dirname "$0")/.."

echo "Applying prisma/manual-migrations/2026-07-07_add_course_workspace.sql to the database in .env…"
npx prisma db execute --file prisma/manual-migrations/2026-07-07_add_course_workspace.sql --schema prisma/schema.prisma
echo "✅ Done. Course workspace columns are live."
