#!/bin/bash

# Deployment script for Cerebrum Biology Academy
# Usage: ./scripts/deploy-to-production.sh

set -e  # Exit on error

echo "🚀 Starting Production Deployment Process..."
echo ""

# Check if we're on staging branch
CURRENT_BRANCH=$(git branch --show-current)
if [ "$CURRENT_BRANCH" != "staging" ]; then
    echo "❌ You must be on 'staging' branch to deploy"
    echo "   Current branch: $CURRENT_BRANCH"
    echo ""
    echo "   Run: git checkout staging"
    exit 1
fi

# Run pre-deployment checks
echo "Running pre-deployment checks..."
if ! ./scripts/pre-deploy-check.sh; then
    echo ""
    echo "❌ Pre-deployment checks failed. Fix errors before deploying."
    exit 1
fi

echo ""
echo "📊 Changes to be deployed:"
git log main..staging --oneline
echo ""

# Confirmation prompt
read -p "🤔 Deploy these changes to PRODUCTION? (yes/no): " CONFIRM
if [ "$CONFIRM" != "yes" ]; then
    echo "❌ Deployment cancelled"
    exit 0
fi

echo ""
echo "1️⃣  Switching to main branch..."
git checkout main

echo "2️⃣  Pulling latest from remote..."
git pull origin main

echo "3️⃣  Merging staging into main..."
git merge staging -m "deploy: production deployment $(date '+%Y-%m-%d %H:%M')"

echo "4️⃣  Pushing to production..."
git push origin main

echo "5️⃣  Switching back to staging..."
git checkout staging

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "✅ DEPLOYMENT SUCCESSFUL!"
echo ""
echo "📊 Next steps:"
echo "   1. Monitor Vercel dashboard: https://vercel.com/dashboard"
echo "   2. Check live site: https://cerebrumbiologyacademy.com"
echo "   3. Watch analytics for 15 minutes"
echo "   4. Update DEPLOYMENT.md with deployment notes"
echo ""
echo "🆘 If issues occur:"
echo "   - Rollback via Vercel Dashboard → Previous Deployment → Promote"
echo "   - Or run: git revert HEAD && git push origin main"
echo ""
