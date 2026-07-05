#!/bin/bash
# Owner access, one shot:
#  1. Points the primary ADMIN account at bobbyaiims@gmail.com (so Google
#     login = full admin) while keeping phone 9999744334 and the password.
#  2. Elevates the empty duplicate phone account (+919999744334, created by
#     a phone-OTP login test in Jan 2026: 0 enrollments/payments/sessions)
#     to ADMIN, so phone-OTP login lands on an admin account no matter
#     which of the two rows the last-10-digit matcher picks.
# Usage:  bash scripts/fix-owner-access.sh
set -euo pipefail
cd "$(dirname "$0")/.."

echo "Step 1/2: pointing primary admin at bobbyaiims@gmail.com ..."
ADMIN_EMAIL=bobbyaiims@gmail.com npx tsx scripts/seed-admin.ts

echo "Step 2/2: elevating the duplicate phone account to ADMIN ..."
URL="$(grep '^DIRECT_DATABASE_URL' .env.local | cut -d= -f2- | tr -d '"' | tr -d "'")"
echo 'UPDATE "public"."users" SET role = '"'"'ADMIN'"'"' WHERE phone = '"'"'+919999744334'"'"' AND email LIKE '"'"'%@phone.cerebrum.local'"'"';' | npx prisma db execute --stdin --url "$URL"

echo ""
echo "✅ Owner access configured:"
echo "   • Google login with bobbyaiims@gmail.com → full ADMIN"
echo "   • Phone OTP with 9999744334 → ADMIN (both matching rows are admin now)"
