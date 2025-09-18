#!/bin/bash

# 🚀 Cerebrum Biology Academy - Smart Git Workflow Setup
# This script sets up Git aliases that automatically guide you through the proper workflow

echo "🚀 Setting up Smart Workflow Git Aliases..."

# Core workflow aliases
git config alias.start-feature '!f() {
  echo "🔄 Starting new feature: $1";
  echo "📋 Workflow Step 1/7: Switching to develop branch";
  git checkout develop;
  git pull origin develop;
  echo "📋 Workflow Step 2/7: Creating feature branch";
  git checkout -b feature/$1;
  echo "✅ Ready to start development!";
  echo "📝 Next steps:";
  echo "   - Use: npm run create:component ComponentName";
  echo "   - Use: npm run dev:safe";
  echo "   - Follow DEVELOPMENT_WORKFLOW.md";
}; f'

git config alias.safe-commit '!f() {
  echo "🔍 Running pre-commit checks...";
  echo "📋 Workflow Step 6/7: Safe commit with checks";
  echo "🧪 Running tests first...";
  npm test -- --passWithNoTests;
  if [ $? -eq 0 ]; then
    echo "✅ Tests passed, proceeding with commit";
    git add .;
    git commit -m "$1";
    echo "📋 Next step: git push -u origin $(git branch --show-current)";
  else
    echo "❌ Tests failed. Please fix tests before committing.";
    exit 1;
  fi
}; f'

git config alias.finish-feature '!f() {
  current_branch=$(git branch --show-current);
  echo "🔄 Finishing feature: $current_branch";
  echo "📋 Workflow Step 7/7: Push and create PR";
  git push -u origin $current_branch;
  echo "✅ Feature branch pushed!";
  echo "📝 Next steps:";
  echo "   1. Go to GitHub and create Pull Request";
  echo "   2. Set base branch to: develop";
  echo "   3. Wait for staging deployment";
  echo "   4. Test in staging before merging";
}; f'

git config alias.workflow-status '!f() {
  echo "📊 Current Workflow Status:";
  current_branch=$(git branch --show-current);
  echo "   Current branch: $current_branch";

  if [ "$current_branch" = "main" ]; then
    echo "   ⚠️  WARNING: You are on main branch!";
    echo "   🔧 Fix: git checkout develop";
  elif [ "$current_branch" = "develop" ]; then
    echo "   ✅ Good: On develop branch";
    echo "   📝 Next: git start-feature your-feature-name";
  elif [[ "$current_branch" == feature/* ]]; then
    echo "   ✅ Good: On feature branch";
    echo "   📝 Next: Make changes, then git safe-commit \"your message\"";
  else
    echo "   ❓ Unknown branch type";
  fi

  echo "";
  echo "📚 Quick Commands:";
  echo "   git start-feature name    - Start new feature";
  echo "   git safe-commit \"msg\"     - Commit with checks";
  echo "   git finish-feature        - Push and create PR";
  echo "   git workflow-status       - Show this status";
}; f'

# Workflow helpers
git config alias.quick-start '!f() {
  echo "🚀 Quick Start Workflow:";
  echo "1. git start-feature feature-name";
  echo "2. npm run create:component ComponentName";
  echo "3. npm run dev:safe";
  echo "4. Make your changes";
  echo "5. git safe-commit \"feat: your changes\"";
  echo "6. git finish-feature";
}; f'

echo "✅ Git aliases configured successfully!"
echo ""
echo "🎯 Your new workflow commands:"
echo "   git quick-start           - Show quick workflow"
echo "   git workflow-status       - Check current status"
echo "   git start-feature name    - Start new feature (Steps 1-2)"
echo "   git safe-commit \"msg\"     - Safe commit (Step 6)"
echo "   git finish-feature        - Push and PR (Step 7)"
echo ""
echo "📚 Try: git workflow-status"