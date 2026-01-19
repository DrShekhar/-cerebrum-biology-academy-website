#!/bin/bash

# CERI CTO Agent Installation Script
# Cerebrum Biology Academy
# ===================================

set -e

echo "🚀 Installing CERI CTO Agent for Cerebrum Biology Academy..."
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo -e "${RED}Error: package.json not found. Please run this script from the project root.${NC}"
    exit 1
fi

# Verify this is the cerebrum project
if ! grep -q "cerebrum" package.json 2>/dev/null; then
    echo -e "${YELLOW}Warning: This may not be the Cerebrum Biology Academy project.${NC}"
fi

echo "📁 Creating CERI CTO directory structure..."

# Create .claude/cto directories
mkdir -p .claude/cto/memory
mkdir -p .claude/cto/knowledge
mkdir -p .claude/cto/playbooks

# Create MCP server directories
mkdir -p mcp-servers/cerebrum-cto/src/tools
mkdir -p mcp-servers/cerebrum-cto/src/resources

echo -e "${GREEN}✓ Directory structure created${NC}"

# Create CERI CTO configuration file
echo "📝 Creating CERI CTO configuration..."

cat > .claude/cto/config.json << 'EOF'
{
  "name": "CERI CTO Agent",
  "version": "1.0.0",
  "description": "Chief Technology Officer agent for Cerebrum Biology Academy",
  "capabilities": [
    "code-review",
    "architecture-decisions",
    "security-audit",
    "performance-optimization",
    "deployment-management",
    "tech-debt-tracking"
  ],
  "memory": {
    "path": ".claude/cto/memory",
    "retention": "persistent"
  },
  "knowledge": {
    "path": ".claude/cto/knowledge",
    "sources": [
      "CLAUDE.md",
      "docs/",
      "prisma/schema.prisma"
    ]
  },
  "playbooks": {
    "path": ".claude/cto/playbooks"
  }
}
EOF

echo -e "${GREEN}✓ Configuration created${NC}"

# Create initial memory file
echo "🧠 Initializing CERI memory..."

cat > .claude/cto/memory/context.md << 'EOF'
# CERI CTO Agent Memory

## Project Context
- **Project**: Cerebrum Biology Academy
- **Tech Stack**: Next.js 15, Supabase, Prisma, Vercel
- **Auth**: NextAuth v5 + Firebase Phone Auth

## Recent Decisions
- [Track architectural decisions here]

## Technical Debt
- [Track tech debt items here]

## Performance Benchmarks
- [Track performance metrics here]

## Security Considerations
- Firebase token re-verification implemented
- Webhook signature verification with HMAC-SHA256
- Rate limiting on auth endpoints
EOF

echo -e "${GREEN}✓ Memory initialized${NC}"

# Create knowledge base
echo "📚 Setting up knowledge base..."

cat > .claude/cto/knowledge/architecture.md << 'EOF'
# Cerebrum Biology Academy Architecture

## Overview
Full-stack educational platform for NEET Biology preparation.

## Key Components

### Frontend
- Next.js 15 App Router
- React Server Components
- Tailwind CSS + Radix UI
- PWA-enabled

### Backend
- API Routes in `src/app/api/`
- Prisma ORM with Supabase PostgreSQL
- Edge-compatible middleware

### Authentication
- NextAuth v5 (AuthJS)
- Firebase Phone OTP
- Session cookies with JWT

### External Services
- Vercel (Hosting)
- Supabase (Database)
- Firebase (Phone Auth)
- Razorpay (Payments)
- Sentry (Monitoring)

## Data Flow
1. User authenticates via Firebase Phone OTP
2. Backend verifies and creates session
3. Session cookie set for subsequent requests
4. Protected routes check session middleware
EOF

echo -e "${GREEN}✓ Knowledge base created${NC}"

# Create playbooks
echo "📋 Creating CTO playbooks..."

cat > .claude/cto/playbooks/code-review.md << 'EOF'
# Code Review Playbook

## Pre-Review Checklist
- [ ] TypeScript strict mode compliance
- [ ] No `any` types without justification
- [ ] Proper error handling
- [ ] Security considerations
- [ ] Performance implications
- [ ] Test coverage

## Security Review Points
1. Input validation on API routes
2. Authentication checks on protected routes
3. Rate limiting implementation
4. No sensitive data in client bundles
5. CSRF protection

## Performance Review Points
1. Proper use of Server/Client components
2. Image optimization
3. Bundle size impact
4. Database query efficiency
5. Caching strategy
EOF

cat > .claude/cto/playbooks/deployment.md << 'EOF'
# Deployment Playbook

## Pre-Deployment Checklist
- [ ] All tests passing
- [ ] Type check clean: `npm run type-check`
- [ ] Lint clean: `npm run lint`
- [ ] Environment variables verified
- [ ] Database migrations ready

## Deployment Commands
```bash
# Pre-check
npm run deploy:pre-check

# Production deploy
npm run deploy:production

# Verify
npm run verify:production
```

## Rollback Procedure
1. Identify failing deployment
2. Revert to previous deployment in Vercel
3. Investigate root cause
4. Fix and redeploy
EOF

echo -e "${GREEN}✓ Playbooks created${NC}"

# Create MCP server package.json
echo "📦 Setting up CERI MCP server..."

cat > mcp-servers/cerebrum-cto/package.json << 'EOF'
{
  "name": "@cerebrum/cto-mcp-server",
  "version": "1.0.0",
  "description": "MCP server for CERI CTO Agent",
  "main": "src/index.ts",
  "scripts": {
    "build": "tsc",
    "start": "node dist/index.js"
  },
  "dependencies": {
    "@modelcontextprotocol/sdk": "^1.0.0"
  },
  "devDependencies": {
    "typescript": "^5.0.0"
  }
}
EOF

# Create MCP server entry point
cat > mcp-servers/cerebrum-cto/src/index.ts << 'EOF'
/**
 * CERI CTO MCP Server
 *
 * Provides tools and resources for the CTO agent to manage
 * the Cerebrum Biology Academy codebase.
 */

export const cerebrumCTOServer = {
  name: 'cerebrum-cto',
  version: '1.0.0',

  tools: {
    // Tool definitions will be added here
  },

  resources: {
    // Resource definitions will be added here
  }
}

console.log('CERI CTO MCP Server initialized')
EOF

echo -e "${GREEN}✓ MCP server scaffolded${NC}"

# Final summary
echo ""
echo "================================================"
echo -e "${GREEN}🎉 CERI CTO Agent Installation Complete!${NC}"
echo "================================================"
echo ""
echo "Directory structure created:"
echo "  .claude/cto/"
echo "  ├── config.json"
echo "  ├── memory/"
echo "  │   └── context.md"
echo "  ├── knowledge/"
echo "  │   └── architecture.md"
echo "  └── playbooks/"
echo "      ├── code-review.md"
echo "      └── deployment.md"
echo ""
echo "  mcp-servers/cerebrum-cto/"
echo "  ├── package.json"
echo "  └── src/"
echo "      └── index.ts"
echo ""
echo "Next steps:"
echo "  1. Customize .claude/cto/config.json as needed"
echo "  2. Add project-specific knowledge to knowledge/"
echo "  3. Create custom playbooks for your workflows"
echo ""
