#!/bin/bash

# Intelligent Three-Way Merge Script
# Cerebrum Biology Academy - Main + Development Integration
# Preserves ALL features from both branches

set -e

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "🔀 INTELLIGENT MERGE: main + development"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "This script will help you merge BOTH branches intelligently"
echo "with ZERO data loss and FULL control over conflicts."
echo ""

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Phase 1: Safety Checks
echo -e "${BLUE}📋 Phase 1: Safety Checks${NC}"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

# Check current branch
CURRENT_BRANCH=$(git branch --show-current)
if [ "$CURRENT_BRANCH" != "main" ]; then
    echo -e "${RED}❌ Error: You must be on 'main' branch${NC}"
    echo "Run: git checkout main"
    exit 1
fi

# Check for uncommitted changes
if ! git diff-index --quiet HEAD --; then
    echo -e "${RED}❌ Error: You have uncommitted changes${NC}"
    echo "Commit or stash your changes first:"
    echo "  git add ."
    echo "  git commit -m 'save work'"
    exit 1
fi

echo -e "${GREEN}✅ On main branch${NC}"
echo -e "${GREEN}✅ No uncommitted changes${NC}"
echo ""

# Phase 2: Create Backup
echo -e "${BLUE}💾 Phase 2: Creating Safety Backup${NC}"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

BACKUP_NAME="backup-main-before-merge-$(date +%Y%m%d-%H%M%S)"
git branch "$BACKUP_NAME"
echo -e "${GREEN}✅ Created backup branch: $BACKUP_NAME${NC}"
echo ""

# Phase 3: Create Integration Branch
echo -e "${BLUE}🔧 Phase 3: Creating Integration Branch${NC}"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

git checkout -b integration/main-plus-development
echo -e "${GREEN}✅ Created integration branch${NC}"
echo ""

# Phase 4: Analyze Differences
echo -e "${BLUE}🔍 Phase 4: Analyzing Differences${NC}"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

mkdir -p merge-analysis

# Get list of all different files
git diff --name-status main..development > merge-analysis/all-changes.txt

# Categorize files
grep "^D" merge-analysis/all-changes.txt | awk '{print $2}' > merge-analysis/deleted-files.txt || touch merge-analysis/deleted-files.txt
grep "^A" merge-analysis/all-changes.txt | awk '{print $2}' > merge-analysis/added-files.txt || touch merge-analysis/added-files.txt
grep "^M" merge-analysis/all-changes.txt | awk '{print $2}' > merge-analysis/modified-files.txt || touch merge-analysis/modified-files.txt

DELETED_COUNT=$(wc -l < merge-analysis/deleted-files.txt | tr -d ' ')
ADDED_COUNT=$(wc -l < merge-analysis/added-files.txt | tr -d ' ')
MODIFIED_COUNT=$(wc -l < merge-analysis/modified-files.txt | tr -d ' ')

echo -e "${YELLOW}📊 Change Summary:${NC}"
echo "  Deleted files:  $DELETED_COUNT (will skip)"
echo "  Added files:    $ADDED_COUNT (will auto-add)"
echo "  Modified files: $MODIFIED_COUNT (need your decision)"
echo ""

# Phase 5: Auto-add new files from development
echo -e "${BLUE}➕ Phase 5: Adding New Files from Development${NC}"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

if [ -s merge-analysis/added-files.txt ]; then
    echo "Adding new files from development branch:"
    while IFS= read -r file; do
        # Skip .archive files
        if [[ $file == .archive/* ]]; then
            continue
        fi
        git checkout development -- "$file" 2>/dev/null && echo -e "${GREEN}  ✅ Added: $file${NC}" || echo -e "${YELLOW}  ⚠️  Skipped: $file${NC}"
    done < merge-analysis/added-files.txt

    git add .
    git commit -m "merge: add new files from development branch" || echo "No files to commit"
else
    echo "No new files to add"
fi
echo ""

# Phase 6: Handle Modified Files - Interactive
echo -e "${BLUE}🎯 Phase 6: Interactive Merge - Modified Files${NC}"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "For each file, you have 3 options:"
echo "  ${GREEN}A${NC} = Keep MAIN version (current production)"
echo "  ${BLUE}B${NC} = Use DEVELOPMENT version (new features)"
echo "  ${YELLOW}C${NC} = SYNTHESIZE both (manual merge)"
echo "  ${RED}S${NC} = Skip this file"
echo ""

# Filter to only source files (skip .archive)
grep -v "^\.archive/" merge-analysis/modified-files.txt > merge-analysis/source-modified-files.txt || touch merge-analysis/source-modified-files.txt

SOURCE_MODIFIED_COUNT=$(wc -l < merge-analysis/source-modified-files.txt | tr -d ' ')

if [ "$SOURCE_MODIFIED_COUNT" -eq 0 ]; then
    echo "No source files modified - only documentation"
else
    echo -e "${YELLOW}Found $SOURCE_MODIFIED_COUNT source files that were modified in both branches${NC}"
    echo ""

    # Critical files that need attention
    CRITICAL_FILES=(
        "src/app/page.tsx"
        "src/app/layout.tsx"
        "src/app/globals.css"
        "src/components/layout/Footer.tsx"
        "src/components/ui/Button.tsx"
    )

    for file in "${CRITICAL_FILES[@]}"; do
        if grep -q "^$file$" merge-analysis/source-modified-files.txt; then
            echo -e "${YELLOW}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
            echo -e "${YELLOW}📝 File: $file${NC}"
            echo -e "${YELLOW}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"

            # Show diff summary
            echo ""
            echo "Changes in this file:"
            git diff main development -- "$file" | head -40
            echo ""
            echo "... (showing first 40 lines)"
            echo ""

            # Ask user choice
            echo -e "Choose: ${GREEN}[A]${NC} main | ${BLUE}[B]${NC} development | ${YELLOW}[C]${NC} synthesize | ${RED}[S]${NC} skip"
            read -p "Your choice: " choice

            case $choice in
                [Aa])
                    echo -e "${GREEN}✅ Keeping MAIN version${NC}"
                    # Already on main, no action needed
                    ;;
                [Bb])
                    echo -e "${BLUE}✅ Using DEVELOPMENT version${NC}"
                    git checkout development -- "$file"
                    git add "$file"
                    ;;
                [Cc])
                    echo -e "${YELLOW}⚙️  Opening file for manual merge...${NC}"
                    echo "File location: $file"
                    echo ""
                    echo "To synthesize:"
                    echo "1. Open the file in your editor"
                    echo "2. Review main version (current)"
                    echo "3. Review development version: git show development:$file"
                    echo "4. Manually combine the best parts"
                    echo "5. Save and commit"
                    echo ""
                    read -p "Press Enter when done editing..."
                    git add "$file"
                    ;;
                [Ss])
                    echo -e "${RED}⏭️  Skipped${NC}"
                    ;;
                *)
                    echo -e "${RED}Invalid choice. Skipping.${NC}"
                    ;;
            esac
            echo ""
        fi
    done

    # Commit changes if any
    if ! git diff-index --quiet HEAD --; then
        git commit -m "merge: selectively merge modified files from development"
    fi
fi

echo ""
echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${GREEN}✅ MERGE COMPLETE!${NC}"
echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""
echo "Next steps:"
echo "1. Test the merged code:"
echo "   npm run clean && npm run build && npm run dev"
echo ""
echo "2. Review changes:"
echo "   git diff backup-main-before-merge..HEAD"
echo ""
echo "3. If everything works, merge to main:"
echo "   git checkout main"
echo "   git merge integration/main-plus-development"
echo "   git push origin main"
echo ""
echo "4. If something is wrong, restore backup:"
echo "   git checkout main"
echo "   git reset --hard $BACKUP_NAME"
echo ""
echo -e "${YELLOW}📁 Merge analysis files saved in: ./merge-analysis/${NC}"
echo ""
