#!/usr/bin/env bash
# One-shot: apply the Jul 6 2026 student-groups (batches) schema to prod.
#   bash scripts/apply-student-groups.sh
# Creates: student_groups, student_group_members, group_content + adds
# class_sessions.groupId / notices.groupId. Idempotent — safe to re-run.
set -euo pipefail
cd "$(dirname "$0")/.."

echo "Applying scripts/sql/2026-07-06-student-groups.sql to the database in .env…"
npx prisma db execute --file scripts/sql/2026-07-06-student-groups.sql --schema prisma/schema.prisma
echo "✅ Done. Groups/batches tables are live; group content assignment now works."
