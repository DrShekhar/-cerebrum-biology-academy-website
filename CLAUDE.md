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

### API Routes

- Location: `src/app/api/`
- Use NextAuth session validation for protected routes
- Include rate limiting for public endpoints
- Return consistent JSON: `{ success, data?, error? }`

### Component Patterns

- Client components: `'use client'` at top
- Server components: default (no directive)
- Use `cn()` from `src/lib/utils` for class merging

### Design & Colors

- **Full reference**: See `DESIGN_REFERENCE.md` for palettes, gradients, typography
- **Accent colors**: green-500, teal-600, blue-600, purple-700, yellow-800
- **Avoid**: Cyan (use Blue), Pink (use Purple), Emerald (use Green)
- **Only 8 approved gradients** - see `DESIGN_REFERENCE.md`
- **Color palette page**: `/color-palette`

### Authentication

- **Primary**: `import { useAuth } from '@/contexts/AuthContext'` (NOT `@/hooks/useAuth`)
- **Server**: `import { auth } from '@/lib/auth'` then `const session = await auth()`
- **Roles**: UPPERCASE only: `'STUDENT'`, `'PARENT'`, `'TEACHER'`, `'ADMIN'`, `'COUNSELOR'`
- **Key files**: `src/lib/auth.ts`, `src/lib/auth/config.ts`, `src/contexts/AuthContext.tsx`, `middleware.ts`

### Testing

- Unit tests: `src/__tests__/` with Jest
- E2E tests: `tests/` with Playwright
- Run `npm test` before major commits

## Quick Commands

```bash
npm run dev              # Start dev server
npm run build            # Production build
npm run type-check       # TypeScript validation
npm run db:generate      # Generate Prisma client
npm run db:migrate:dev   # Run migrations (dev)
npm run db:studio        # Open Prisma Studio
npm test                 # Jest tests
npm run test:e2e         # Playwright E2E
npm run deploy:pre-check # Pre-deploy validation
```

## Environment Variables

Required in `.env.local`: `DATABASE_URL`, `DIRECT_DATABASE_URL`, `NEXTAUTH_SECRET`, `NEXTAUTH_URL`, `RAZORPAY_KEY_ID`, `RAZORPAY_KEY_SECRET`, `OPENAI_API_KEY`, `SENTRY_DSN`

## Workflow

### Before Changes
1. **ALWAYS `git pull` first**
2. Read related files first, check existing patterns

### During Development
1. Make incremental changes
2. Run `npm run type-check` frequently
3. **Commit every 20-30 messages or at 60-70% context usage**
4. Break large tasks into subtasks, commit incrementally

### Before Committing
1. Run: `npm run type-check && npm run lint && npm test`
2. Format: `npm run format`
3. Check responsiveness: Mobile (375px), Tablet (768px), Desktop (1280px+)

### Deployment
1. `npm run deploy:pre-check`
2. Verify staging preview first
3. `npm run deploy:production`

## Security

- Never commit `.env` files
- Always validate user input
- Check authentication on all protected routes

## File Structure

```
src/app/          # Pages + API routes
src/components/   # React components (ui/, forms/, dashboard/)
src/lib/          # Utilities (auth/, db/, utils/)
src/generated/    # Prisma client
src/__tests__/    # Jest tests
```

## CTO Agent (Optional)

Activate with "CERI, ..." phrases. Config at `.claude/cto/CTO.md`. Only load CTO files when explicitly needed for architecture decisions or code reviews.
