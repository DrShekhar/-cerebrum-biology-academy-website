#!/usr/bin/env bash
# One-shot: apply the Jul 7 2026 session<->recording link column to prod.
#   bash scripts/apply-session-recording-link.sh
# Adds class_sessions.videoLectureId (+ index) for the Zoom -> Cloudflare
# recordings pipeline. Idempotent — safe to re-run.
set -euo pipefail
cd "$(dirname "$0")/.."

echo "Applying scripts/sql/2026-07-07-session-recording-link.sql to the database in .env…"
npx prisma db execute --file scripts/sql/2026-07-07-session-recording-link.sql --schema prisma/schema.prisma
echo "✅ Done. class_sessions.videoLectureId is live; recordings can now link to sessions."
