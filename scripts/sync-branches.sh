#!/bin/bash

echo "🔄 Syncing all branches with main..."
echo ""

# Get latest main
git checkout main
git pull origin main

# Sync staging
echo "1️⃣  Syncing staging branch..."
git checkout staging
git merge main -m "sync: merge main into staging"
git push origin staging

# Sync cowork
echo "2️⃣  Syncing cowork branch..."
git checkout cowork  
git merge main -m "sync: merge main into cowork"
git push origin cowork

# Back to staging
git checkout staging

echo ""
echo "✅ All branches synced with production!"
echo ""
echo "Branch status:"
echo "  - main: $(git log main -1 --format=%s)"
echo "  - staging: $(git log staging -1 --format=%s)"
echo "  - cowork: $(git log cowork -1 --format=%s)"
