#!/bin/bash

# Manual Deployment Script for Ceri AI
# Use this if GitHub Actions fails

echo "🚀 Manual Ceri AI Deployment Script"
echo "=================================="

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: Run this script from the project root directory"
    exit 1
fi

# Install dependencies
echo "📦 Installing dependencies..."
npm ci --legacy-peer-deps

# Run quality checks
echo "🔍 Running quality checks..."
echo "  - Linting..."
npm run lint || echo "⚠️ Lint warnings found, continuing..."

echo "  - Type checking..."
npm run type-check || {
    echo "❌ TypeScript errors found!"
    read -p "Continue anyway? (y/N): " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        exit 1
    fi
}

# Build project
echo "🏗️ Building project..."
npm run build || {
    echo "❌ Build failed!"
    exit 1
}

# Deploy to Vercel
echo "🚀 Deploying to Vercel..."
if command -v vercel &> /dev/null; then
    vercel --prod
else
    echo "❌ Vercel CLI not installed. Install with:"
    echo "npm install -g vercel"
    exit 1
fi

echo "✅ Manual deployment completed!"
echo "🌐 Check: https://cerebrumbiologyacademy.com/claudechat"