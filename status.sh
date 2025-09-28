#!/bin/bash

# 📊 INSTANT PROJECT STATUS - Run this to see current state

echo "🎯 CEREBRUM BIOLOGY ACADEMY - PROJECT STATUS"
echo "============================================"
echo ""

# Test current domain
echo "🌐 DOMAIN STATUS:"
response=$(curl -s https://www.cerebrumbiologyacademy.com/claudechat | grep -o "Ceri\|ClaudeChat" | head -1 2>/dev/null || echo "ERROR")
if [ "$response" = "Ceri" ]; then
    echo "✅ Domain shows: Ceri AI (WORKING!)"
elif [ "$response" = "ClaudeChat" ]; then
    echo "❌ Domain shows: ClaudeChat (NEEDS FIX)"
else
    echo "⚠️ Domain status: $response"
fi

# Test API endpoint
echo ""
echo "🤖 API STATUS:"
api_status=$(curl -s -o /dev/null -w "%{http_code}" https://www.cerebrumbiologyacademy.com/api/ai/unified-chat 2>/dev/null || echo "ERROR")
if [ "$api_status" = "401" ] || [ "$api_status" = "405" ]; then
    echo "✅ AI API: Exists (returns $api_status)"
elif [ "$api_status" = "404" ]; then
    echo "❌ AI API: Missing (returns 404)"
else
    echo "⚠️ AI API: Returns $api_status"
fi

# Check local environment
echo ""
echo "⚙️ LOCAL ENVIRONMENT:"
if [ -f ".env.local" ]; then
    echo "✅ Environment file: Exists"
    if grep -q "ANTHROPIC_API_KEY" .env.local && grep -q "OPENAI_API_KEY" .env.local; then
        echo "✅ AI API keys: Configured"
    else
        echo "⚠️ AI API keys: May be missing"
    fi
else
    echo "❌ Environment file: Missing"
fi

# Check deployment scripts
echo ""
echo "🚀 DEPLOYMENT TOOLS:"
if [ -f "deploy-fix-forever.sh" ]; then
    echo "✅ Bulletproof script: Available"
else
    echo "❌ Bulletproof script: Missing"
fi

if [ -f "PROJECT_STATE.md" ]; then
    echo "✅ Project state doc: Available"
else
    echo "❌ Project state doc: Missing"
fi

# Check GitHub Actions
echo ""
echo "🔧 GITHUB ACTIONS:"
active_workflows=$(find .github/workflows -name "*.yml" ! -name "*.disabled" | wc -l | tr -d ' ')
disabled_workflows=$(find .github/workflows -name "*.disabled" | wc -l | tr -d ' ')
echo "✅ Active workflows: $active_workflows"
echo "📋 Disabled workflows: $disabled_workflows"

# Quick recommendation
echo ""
echo "🎯 RECOMMENDATION:"
if [ "$response" = "ClaudeChat" ]; then
    echo "❗ Run: ./deploy-fix-forever.sh"
    echo "   This will fix the domain issue once and for all"
elif [ "$response" = "Ceri" ]; then
    echo "🎉 System is working! Ceri AI is live!"
else
    echo "🔍 Check network connection and try again"
fi

echo ""
echo "📖 For detailed info: cat PROJECT_STATE.md"
echo "🛠️ For deployment help: cat DEPLOYMENT.md"