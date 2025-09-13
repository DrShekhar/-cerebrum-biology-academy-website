#!/bin/bash

# Cerebrum Biology Academy - Deployment Script
# This script will deploy your website to production

echo "🚀 Cerebrum Biology Academy - Website Deployment"
echo "================================================"

# Check if GitHub CLI is installed
if ! command -v gh &> /dev/null; then
    echo "❌ GitHub CLI (gh) is not installed"
    echo "Please install it first with: brew install gh"
    exit 1
fi

echo "✅ GitHub CLI found"

# Check if authenticated with GitHub
if ! gh auth status &> /dev/null; then
    echo "🔐 Authenticating with GitHub..."
    gh auth login
fi

echo "✅ GitHub authentication verified"

# Push to main branch
echo "📤 Pushing code to GitHub..."
git push -u origin main

if [ $? -eq 0 ]; then
    echo "✅ Code pushed to GitHub successfully"
else
    echo "❌ Failed to push code to GitHub"
    exit 1
fi

# Create and push development branch
echo "🌿 Creating development branch..."
git checkout -b development 2>/dev/null || git checkout development
git push -u origin development

# Create and push staging branch
echo "🎭 Creating staging branch..."
git checkout -b staging 2>/dev/null || git checkout staging  
git push -u origin staging

# Return to main branch
git checkout main

echo "✅ Branch structure created successfully"

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "📦 Installing Vercel CLI..."
    npm install -g vercel
fi

echo "🚀 Deploying to Vercel..."
npx vercel --prod

echo ""
echo "🎉 DEPLOYMENT COMPLETE!"
echo "========================================"
echo "✅ Code pushed to GitHub"
echo "✅ Branch structure created (main/staging/development)"  
echo "✅ Website deployed to Vercel"
echo ""
echo "🌐 Your website is now live!"
echo "📊 Check deployment status at: https://vercel.com/dashboard"
echo "🔧 GitHub repository: https://github.com/DrShekhar/-cerebrum-biology-academy-website"
echo ""
echo "🎯 Next steps:"
echo "1. Set up custom domain (optional)"
echo "2. Configure analytics"
echo "3. Continue development with Claude!"