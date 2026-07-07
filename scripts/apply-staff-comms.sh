#!/usr/bin/env bash
# One-shot: apply the Jul 7 2026 staff-comms schema to prod.
#   bash scripts/apply-staff-comms.sh
# Creates: staff_channels, staff_channel_members, staff_messages,
# staff_notifications + adds notes.parentId/mentionedUserIds (threaded lead
# comments with @mentions + the staff notification bell). Idempotent.
set -euo pipefail
cd "$(dirname "$0")/.."

echo "Applying prisma/manual-migrations/2026-07-07_add_staff_comms.sql to the database in .env…"
npx prisma db execute --file prisma/manual-migrations/2026-07-07_add_staff_comms.sql --schema prisma/schema.prisma
echo "✅ Done. Staff comms tables are live — bell + lead comments now persist."
