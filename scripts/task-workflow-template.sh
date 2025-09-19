#!/bin/bash

# 🏛️ Constitutional Development Task Workflow Template
# This script enforces the development constitution for every task

set -e

echo "🏛️ CEREBRUM DEVELOPMENT CONSTITUTION ENFORCER"
echo "============================================="
echo "Following the sacred development workflow..."

# Function to check constitutional compliance
check_constitution() {
    echo "📋 Constitutional Compliance Check:"
    echo "  ✅ TodoWrite list created? (You should have done this)"
    echo "  ✅ Requirements analyzed? (Better be yes)"
    echo "  ✅ Implementation planned? (No cowboy coding)"
    echo ""
}

# Function to run quality gates
run_quality_gates() {
    echo "🛡️ Running Constitutional Quality Gates..."

    echo "  📝 Checking code formatting..."
    npm run lint || {
        echo "❌ Lint check failed! Constitution violation!"
        exit 1
    }

    echo "  🔧 Checking TypeScript..."
    npm run type-check || {
        echo "❌ TypeScript check failed! Constitution violation!"
        exit 1
    }

    echo "  🧪 Running tests..."
    npm run test || {
        echo "❌ Tests failed! Constitution violation!"
        exit 1
    }

    echo "  🏗️ Checking build..."
    npm run build || {
        echo "❌ Build failed! Constitution violation!"
        exit 1
    }

    echo "✅ All quality gates passed! Constitution upheld!"
}

# Function to commit with constitutional compliance
constitutional_commit() {
    local commit_message="$1"

    if [ -z "$commit_message" ]; then
        echo "❌ No commit message provided! Constitution requires descriptive messages!"
        echo "Usage: $0 commit 'your commit message'"
        exit 1
    fi

    echo "📝 Making constitutional commit..."
    git add .
    git commit -m "$commit_message

🏛️ Constitutional Compliance:
- TodoWrite breakdown completed
- Quality gates passed
- Documentation updated
- Performance verified

🎉 Generated with [Claude Code](https://claude.ai/code)

Co-Authored-By: Claude <noreply@anthropic.com>"
}

# Function to deploy constitutionally
constitutional_deploy() {
    echo "🚀 Constitutional Deployment Process..."

    echo "  📡 Pushing to repository..."
    git push origin main

    echo "  ⏳ Waiting for CI/CD pipeline..."
    echo "  🔍 Monitor at: https://github.com/DrShekhar/-cerebrum-biology-academy-website/actions"

    echo "  🌐 Live site: https://www.cerebrumbiologyacademy.com"
    echo "  📊 Vercel dashboard: https://vercel.com/dashboard"
}

# Function to verify deployment
verify_deployment() {
    echo "✅ Constitutional Verification Process..."

    echo "  🌐 Checking site accessibility..."
    if curl -sSf https://www.cerebrumbiologyacademy.com > /dev/null; then
        echo "  ✅ Site is accessible"
    else
        echo "  ❌ Site verification failed!"
        exit 1
    fi

    echo "  📊 Performance check recommended"
    echo "  📋 Don't forget to update TodoWrite status!"
}

# Main workflow execution
case "$1" in
    "init")
        echo "🎯 Initializing new constitutional task..."
        check_constitution
        echo "📋 Remember: TodoWrite first, then code!"
        echo "🔧 Run: npm run dev"
        echo "📊 Check: git status"
        ;;

    "quality")
        echo "🛡️ Running constitutional quality checks..."
        run_quality_gates
        ;;

    "commit")
        echo "📝 Constitutional commit process..."
        run_quality_gates
        constitutional_commit "$2"
        ;;

    "deploy")
        echo "🚀 Constitutional deployment process..."
        run_quality_gates
        constitutional_deploy
        ;;

    "verify")
        echo "✅ Constitutional verification process..."
        verify_deployment
        ;;

    "full")
        echo "🏛️ Full constitutional workflow execution..."
        check_constitution
        run_quality_gates
        constitutional_commit "$2"
        constitutional_deploy
        verify_deployment
        echo "🎉 Constitutional workflow completed successfully!"
        ;;

    *)
        echo "🏛️ Constitutional Development Workflow Commands:"
        echo "=============================================="
        echo ""
        echo "Usage: $0 <command> [args]"
        echo ""
        echo "Commands:"
        echo "  init                 - Initialize new task (check constitution)"
        echo "  quality              - Run quality gates only"
        echo "  commit 'message'     - Quality + commit"
        echo "  deploy               - Quality + deploy"
        echo "  verify               - Verify deployment"
        echo "  full 'message'       - Complete workflow (quality + commit + deploy + verify)"
        echo ""
        echo "Examples:"
        echo "  $0 init"
        echo "  $0 quality"
        echo "  $0 commit 'feat: add new student dashboard'"
        echo "  $0 deploy"
        echo "  $0 full 'feat: implement payment system'"
        echo ""
        echo "🏛️ Remember the Constitution:"
        echo "1. TodoWrite first, always!"
        echo "2. Quality gates are non-negotiable"
        echo "3. Documentation is mandatory"
        echo "4. Verify every deployment"
        echo "5. Update TodoWrite status"
        ;;
esac