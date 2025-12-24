# Cerebrum Biology Academy - Claude Code Configuration

## Project Overview

Full-stack educational platform for NEET Biology preparation built with Next.js 15, Supabase, Prisma, and Vercel.

## Tech Stack

- **Framework**: Next.js 15 (App Router) + TypeScript
- **Database**: Supabase PostgreSQL + Prisma ORM
- **Auth**: NextAuth v5 (next-auth@beta)
- **Payments**: Razorpay
- **Styling**: Tailwind CSS + Radix UI
- **Testing**: Jest + Playwright
- **Monitoring**: Sentry + OpenTelemetry
- **Deployment**: Vercel
- **Cache**: Upstash Redis

## Critical Rules

### Code Quality

- **NEVER** use literal `\n` in code - use template literals or actual newlines
- **ALWAYS** run `npx tsc --noEmit` after TypeScript changes
- **ALWAYS** run `npx prettier --write <file>` before commits
- Follow existing patterns in `src/` - check similar files first
- Prisma client is at `src/generated/prisma` - import from there

### Database Operations

- Use Prisma transactions for multi-table operations
- Always include proper error handling with try/catch
- Run `npx prisma generate` after schema changes
- Test queries against Supabase connection pooler

### API Routes

- Location: `src/app/api/`
- Use NextAuth session validation for protected routes
- Include rate limiting for public endpoints
- Return consistent JSON responses: `{ success, data?, error? }`

### Component Patterns

- Client components: `'use client'` at top
- Server components: default (no directive)
- Use `cn()` from `src/lib/utils` for class merging
- Follow existing component structure in `src/components/`

### Color Guidelines

**AVOID these colors** (unless absolutely necessary):

| Color       | Tailwind Class | Hex       |
|-------------|----------------|-----------|
| Yellow 500  | yellow-500     | `#eab308` |
| Cyan 600    | cyan-600       | `#0891b2` |
| Pink 600    | pink-600       | `#db2777` |
| Pink 500    | pink-500       | `#ec4899` |
| Emerald 600 | emerald-600    | `#059669` |
| Emerald 500 | emerald-500    | `#10b981` |
| Red 100     | red-100        | `#fee2e2` |
| Teal 600    | teal-600       | `#0d9488` |
| Teal 500    | teal-500       | `#14b8a6` |
| Teal 400    | teal-400       | `#2dd4bf` |

**Preferred alternatives:**
- Use **Green scale** (green-500, green-600) instead of Emerald/Teal
- Use **Blue scale** instead of Cyan
- Use **Indigo/Purple** instead of Pink
- Use **Yellow 400** or **Orange** instead of Yellow 500
- Use **Red 50** instead of Red 100 for error backgrounds

### Authentication

- NextAuth config: `src/lib/auth/config.ts`
- Use `auth()` server-side, `useSession()` client-side
- Check roles: `session.user.role` (admin, counselor, student)

### Testing

- Unit tests: `src/__tests__/` with Jest
- E2E tests: `tests/` with Playwright
- Run `npm test` before major commits
- Run `npm run test:e2e` for critical flows

## Quick Commands

```bash
# Development
npm run dev              # Start dev server
npm run build            # Production build
npm run type-check       # TypeScript validation

# Database
npm run db:generate      # Generate Prisma client
npm run db:migrate:dev   # Run migrations (dev)
npm run db:studio        # Open Prisma Studio

# Testing
npm test                 # Jest tests
npm run test:e2e         # Playwright E2E
npm run test:coverage    # Coverage report

# Deployment
npm run deploy:pre-check # Pre-deploy validation
npm run deploy:production # Full production deploy
```

## File Structure

```
src/
├── app/                 # Next.js App Router pages
│   ├── api/            # API routes
│   ├── (auth)/         # Auth pages (login, register)
│   ├── (dashboard)/    # Protected dashboard routes
│   └── (marketing)/    # Public marketing pages
├── components/         # React components
│   ├── ui/            # Base UI components (shadcn)
│   ├── forms/         # Form components
│   └── dashboard/     # Dashboard-specific
├── lib/               # Utilities and configs
│   ├── auth/          # NextAuth configuration
│   ├── db/            # Database utilities
│   ├── mcp/           # MCP server implementations
│   └── utils/         # General utilities
├── generated/         # Generated code (Prisma)
└── __tests__/         # Jest test files
```

## Environment Variables

Required in `.env.local`:

- `DATABASE_URL` - Supabase connection string
- `DIRECT_DATABASE_URL` - Direct Supabase connection
- `NEXTAUTH_SECRET` - Auth encryption key
- `NEXTAUTH_URL` - App URL
- `RAZORPAY_KEY_ID` / `RAZORPAY_KEY_SECRET` - Payment keys
- `OPENAI_API_KEY` - AI features
- `SENTRY_DSN` - Error tracking

## Agent Selection Guide

| Task                 | Agent                             |
| -------------------- | --------------------------------- |
| Backend architecture | backend-architecture-guide        |
| Security review      | code-security-tester              |
| DevOps/CI/CD         | devops-pipeline-architect         |
| Biology content      | neet-biology-content-writer       |
| Product decisions    | product-strategy-lead             |
| Frontend/UI          | silicon-valley-frontend-architect |
| Design system        | ui-design-expert                  |

## Skills Available

- **api-key-security-manager** - Rotate and secure API keys
- **database-migration-manager** - Safe Prisma migrations
- **deployment-fixer** - Debug Vercel deployments
- **pre-deploy-validator** - Pre-deployment checks
- **production-health-checker** - Health monitoring
- **security-hardening-edge** - Edge security
- **session-context-preserver** - Context management

## Workflow Best Practices

### Before Making Changes

1. Read related files first using Serena's `find_symbol`
2. Check existing patterns in similar files
3. Understand the data flow

### During Development

1. Make incremental changes
2. Run `npm run type-check` frequently
3. Test in browser after UI changes

### Before Committing

1. Run full type check: `npm run type-check`
2. Run linter: `npm run lint`
3. Run tests: `npm test`
4. Format code: `npm run format`

### Deployment

1. Run `npm run deploy:pre-check`
2. Verify staging preview first
3. Deploy to production: `npm run deploy:production`
4. Verify: `npm run verify:production`

## Common Patterns

### API Route Template

```typescript
import { auth } from '@/lib/auth/config'
import { prisma } from '@/lib/db'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const session = await auth()
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const data = await prisma.tableName.findMany()
    return NextResponse.json({ success: true, data })
  } catch (error) {
    console.error('API Error:', error)
    return NextResponse.json({ error: 'Internal error' }, { status: 500 })
  }
}
```

### Component Template

```typescript
'use client'

import { cn } from '@/lib/utils'

interface Props {
  className?: string
}

export function ComponentName({ className }: Props) {
  return (
    <div className={cn('base-styles', className)}>
      {/* content */}
    </div>
  )
}
```

## Reference Pages

| Page          | URL              | Purpose                                                  |
| ------------- | ---------------- | -------------------------------------------------------- |
| Color Palette | `/color-palette` | All colors, gradients, combinations used across the site |

## MCP Servers

- **interakt** - WhatsApp automation (project-specific)
- **biology-content** - Biology content generation
- **postgres** - Direct database queries
- **github** - Repository management

## Performance Tips

- Use Serena for code navigation (saves context)
- Use Explore agent for codebase questions
- Prefer `find_symbol` over reading full files
- Use `@` mentions sparingly for large files
- Compact conversation after 50+ messages

## Security Checklist

- Never commit `.env` files
- Always validate user input
- Use prepared statements (Prisma handles this)
- Check authentication on all protected routes
- Sanitize data before rendering
