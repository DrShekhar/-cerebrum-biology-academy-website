#!/bin/bash

# Vercel Cache Purge Script
# Purges all cache for the Cerebrum Biology Academy production deployment

set -e

VERCEL_TOKEN="${1:-jCXhqn1xyn0hFIsvWsplATHp}"
PROJECT_NAME="cerebrum-biology-academy-website"

echo "🧹 Purging Vercel Cache..."
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Get project details
echo "📋 Fetching project information..."
PROJECT_INFO=$(curl -s -X GET \
  "https://api.vercel.com/v9/projects/$PROJECT_NAME" \
  -H "Authorization: Bearer $VERCEL_TOKEN" \
  -H "Content-Type: application/json")

PROJECT_ID=$(echo $PROJECT_INFO | grep -o '"id":"[^"]*"' | head -1 | cut -d'"' -f4)

if [ -z "$PROJECT_ID" ]; then
  echo "❌ Failed to get project ID. Check your token."
  exit 1
fi

echo "✅ Project ID: $PROJECT_ID"
echo ""

# Get latest production deployment
echo "🔍 Finding latest production deployment..."
DEPLOYMENTS=$(curl -s -X GET \
  "https://api.vercel.com/v6/deployments?projectId=$PROJECT_ID&target=production&limit=1" \
  -H "Authorization: Bearer $VERCEL_TOKEN" \
  -H "Content-Type: application/json")

DEPLOYMENT_ID=$(echo $DEPLOYMENTS | grep -o '"uid":"[^"]*"' | head -1 | cut -d'"' -f4)
DEPLOYMENT_URL=$(echo $DEPLOYMENTS | grep -o '"url":"[^"]*"' | head -1 | cut -d'"' -f4)

if [ -z "$DEPLOYMENT_ID" ]; then
  echo "❌ Failed to get deployment ID."
  exit 1
fi

echo "✅ Latest Deployment: $DEPLOYMENT_ID"
echo "🌐 URL: https://$DEPLOYMENT_URL"
echo ""

# Purge cache by redeploying
echo "🚀 Triggering cache purge (redeploy)..."
REDEPLOY=$(curl -s -X POST \
  "https://api.vercel.com/v13/deployments" \
  -H "Authorization: Bearer $VERCEL_TOKEN" \
  -H "Content-Type: application/json" \
  -d "{
    \"name\": \"$PROJECT_NAME\",
    \"deploymentId\": \"$DEPLOYMENT_ID\",
    \"target\": \"production\"
  }")

NEW_DEPLOYMENT_ID=$(echo $REDEPLOY | grep -o '"uid":"[^"]*"' | head -1 | cut -d'"' -f4)

if [ -z "$NEW_DEPLOYMENT_ID" ]; then
  echo "⚠️  Redeploy API returned unexpected response"
  echo "$REDEPLOY"
  echo ""
  echo "Trying alternative method: direct cache purge..."
  
  # Alternative: Use Vercel CLI purge (if available)
  if command -v vercel &> /dev/null; then
    vercel --prod --force --token $VERCEL_TOKEN
    echo "✅ Cache purged via Vercel CLI"
  else
    echo "❌ Vercel CLI not installed. Please install: npm i -g vercel"
    exit 1
  fi
else
  echo "✅ New deployment triggered: $NEW_DEPLOYMENT_ID"
  echo "🔗 Monitor at: https://vercel.com/dashboard"
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "✨ Cache purge initiated!"
echo ""
echo "⏱️  Wait 30-60 seconds for deployment to complete"
echo "🔄 Then refresh: https://cerebrumbiologyacademy.com"
echo ""
