#!/usr/bin/env bash
# One-shot: apply the Jul 7 2026 site_settings table to prod.
#   bash scripts/apply-site-settings.sh
# Creates: site_settings (global admin config: General Settings page,
# autoAssignLeads toggle, system-wide notification routing). Idempotent —
# safe to re-run.
set -euo pipefail
cd "$(dirname "$0")/.."

echo "Applying prisma/manual-migrations/2026-07-07_add_site_settings.sql to the database in .env…"
npx prisma db execute --file prisma/manual-migrations/2026-07-07_add_site_settings.sql --schema prisma/schema.prisma
echo "✅ Done. /admin/settings/general saves are now persistent."
