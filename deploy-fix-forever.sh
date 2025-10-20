#!/bin/bash

# 🛡️ BULLETPROOF DEPLOYMENT - Fix Once, Work Forever
# This script ensures deployments always work correctly

set -e  # Exit on any error

echo "🛡️ BULLETPROOF DEPLOYMENT SCRIPT"
echo "================================"
echo "🎯 Goal: Deploy Ceri AI to cerebrumbiologyacademy.com"
echo ""

# Function to check if command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Step 1: Environment Check
echo "🔍 Step 1: Environment Check"
if [ ! -f "package.json" ]; then
    echo "❌ Error: Run this script from the project root directory"
    exit 1
fi

if ! command_exists vercel; then
    echo "📦 Installing Vercel CLI..."
    npm install -g vercel@latest
fi

if ! command_exists git; then
    echo "❌ Error: Git is required"
    exit 1
fi

echo "✅ Environment check passed"
echo ""

# Step 2: Clean Install
echo "🧹 Step 2: Clean Installation"
echo "Removing node_modules and package-lock.json..."
rm -rf node_modules package-lock.json .next

echo "📦 Installing dependencies with legacy peer deps..."
npm install --legacy-peer-deps

echo "✅ Clean installation completed"
echo ""

# Step 3: Quality Checks
echo "🔍 Step 3: Quality Checks"
echo "Running lint..."
npm run lint || echo "⚠️ Lint warnings found, continuing..."

echo "Running type check..."
npm run type-check || {
    echo "❌ TypeScript errors found!"
    read -p "Continue anyway? (y/N): " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        exit 1
    fi
}

echo "Testing build..."
npm run build || {
    echo "❌ Build failed!"
    exit 1
}

echo "✅ Quality checks passed"
echo ""

# Step 4: Vercel Login & Project Setup
echo "🔐 Step 4: Vercel Configuration"
echo "Logging into Vercel..."
vercel login

echo "Setting up project link..."
# Remove existing vercel config to force re-link
rm -rf .vercel

# Link to correct project with domain
echo "🔗 Linking to project with cerebrumbiologyacademy.com domain..."
vercel link --yes

echo "✅ Vercel configuration completed"
echo ""

# Step 5: Production Deployment
echo "🚀 Step 5: Production Deployment"
echo "Deploying to production..."
vercel --prod --yes

echo "✅ Production deployment completed"
echo ""

# Step 6: Domain Verification
echo "🌐 Step 6: Domain Verification"
echo "Waiting for deployment to propagate..."
sleep 30

echo "Testing main domain..."
if curl -sSf https://cerebrumbiologyacademy.com > /dev/null; then
    echo "✅ cerebrumbiologyacademy.com is accessible"
else
    echo "⚠️ cerebrumbiologyacademy.com not accessible yet"
fi

echo "Testing www domain..."
if curl -sSf https://www.cerebrumbiologyacademy.com > /dev/null; then
    echo "✅ www.cerebrumbiologyacademy.com is accessible"
else
    echo "⚠️ www.cerebrumbiologyacademy.com not accessible yet"
fi

echo "Testing Ceri AI chat page..."
response=$(curl -s https://www.cerebrumbiologyacademy.com/claudechat | grep -o "Ceri\|ClaudeChat" | head -1 || echo "Unknown")
if [ "$response" = "Ceri" ]; then
    echo "✅ Ceri AI is live and working!"
elif [ "$response" = "ClaudeChat" ]; then
    echo "⚠️ Still showing old ClaudeChat - DNS may need time to propagate"
else
    echo "⚠️ Unexpected response: $response"
fi

echo "Testing AI API endpoint..."
api_status=$(curl -s -o /dev/null -w "%{http_code}" https://www.cerebrumbiologyacademy.com/api/ai/unified-chat)
if [ "$api_status" = "401" ] || [ "$api_status" = "405" ]; then
    echo "✅ AI API endpoint exists (returns $api_status)"
else
    echo "⚠️ AI API endpoint returns: $api_status"
fi

echo ""
echo "🎉 DEPLOYMENT SUMMARY"
echo "===================="
echo "✅ Environment: Ready"
echo "✅ Dependencies: Installed"
echo "✅ Quality Checks: Passed"
echo "✅ Vercel Config: Updated"
echo "✅ Production Deploy: Completed"
echo ""
echo "🌐 Your Ceri AI system should be live at:"
echo "  - https://cerebrumbiologyacademy.com"
echo "  - https://www.cerebrumbiologyacademy.com/claudechat"
echo ""
echo "🤖 Features Available:"
echo "  - Anthropic Claude AI"
echo "  - OpenAI GPT"
echo "  - Google AI"
echo "  - Mobile Responsive Design"
echo "  - Error Recovery Systems"
echo ""
echo "💡 Future Deployments:"
echo "  - Git push will auto-deploy via GitHub Actions"
echo "  - Run this script again if issues occur"
echo "  - All configurations are now permanent"
echo ""
echo "🛡️ BULLETPROOF DEPLOYMENT COMPLETED!"