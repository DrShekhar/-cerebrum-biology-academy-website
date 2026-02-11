#!/bin/bash

echo "🔍 Running Pre-Deployment Checks..."
echo ""

# Color codes
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

ERRORS=0

# Check 1: TypeScript
echo "1️⃣  Checking TypeScript..."
if npm run type-check > /dev/null 2>&1; then
    echo -e "${GREEN}✅ TypeScript check passed${NC}"
else
    echo -e "${RED}❌ TypeScript errors found${NC}"
    ERRORS=$((ERRORS + 1))
fi

# Check 2: Linting
echo "2️⃣  Running linter..."
if npm run lint > /dev/null 2>&1; then
    echo -e "${GREEN}✅ Linting passed${NC}"
else
    echo -e "${RED}❌ Linting errors found${NC}"
    ERRORS=$((ERRORS + 1))
fi

# Check 3: Build
echo "3️⃣  Testing build..."
if npm run build > /dev/null 2>&1; then
    echo -e "${GREEN}✅ Build successful${NC}"
else
    echo -e "${RED}❌ Build failed${NC}"
    ERRORS=$((ERRORS + 1))
fi

# Check 4: Git status
echo "4️⃣  Checking git status..."
if [ -z "$(git status --porcelain)" ]; then
    echo -e "${GREEN}✅ No uncommitted changes${NC}"
else
    echo -e "${YELLOW}⚠️  Uncommitted changes found${NC}"
fi

# Check 5: Current branch
BRANCH=$(git branch --show-current)
echo "5️⃣  Current branch: $BRANCH"
if [ "$BRANCH" = "main" ]; then
    echo -e "${YELLOW}⚠️  You're on main branch. Make sure this is intentional.${NC}"
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

if [ $ERRORS -eq 0 ]; then
    echo -e "${GREEN}✅ All checks passed! Safe to deploy.${NC}"
    exit 0
else
    echo -e "${RED}❌ $ERRORS check(s) failed. Fix errors before deploying.${NC}"
    exit 1
fi
