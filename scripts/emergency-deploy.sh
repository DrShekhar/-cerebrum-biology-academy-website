#!/bin/bash

# 🚨 EMERGENCY DEPLOYMENT SCRIPT
# For use when GitHub Actions are failing or unavailable
# Deploys directly to Vercel using local credentials

set -e

echo "🚨 EMERGENCY DEPLOYMENT SCRIPT"
echo "================================="
echo ""

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: Not in project root directory"
    echo "Please run this script from the project root"
    exit 1
fi

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "📦 Installing Vercel CLI..."
    npm install -g vercel@latest
fi

echo "🔧 Building project..."
npm run build

echo "🚀 Deploying to Vercel production..."

# Use the token from environment or .vercel-token file
if [ -n "$VERCEL_TOKEN" ]; then
    echo "Using VERCEL_TOKEN from environment"
    vercel deploy --prod --token $VERCEL_TOKEN
elif [ -f ".vercel-token" ]; then
    echo "Using token from .vercel-token file"
    TOKEN=$(cat .vercel-token | grep VERCEL_TOKEN | cut -d'=' -f2)
    vercel deploy --prod --token $TOKEN
else
    echo "⚠️  No Vercel token found. Using saved login..."
    vercel deploy --prod
fi

echo ""
echo "✅ Emergency deployment completed!"
echo "🌐 Check status at: https://cerebrum-biology-academy-website.vercel.app"
echo "🔗 Admin panel: https://cerebrum-biology-academy-website.vercel.app/admin"
echo ""
echo "💡 To set up automated deployments, configure these GitHub secrets:"
echo "   - VERCEL_TOKEN: Your Vercel personal access token"
echo "   - VERCEL_ORG_ID: team_FxVj0KASvdUa6pdoYXjdgFtS"
echo "   - VERCEL_PROJECT_ID: prj_HrqhTPtRvYA9VmxqcqqjkznaBZ7O"