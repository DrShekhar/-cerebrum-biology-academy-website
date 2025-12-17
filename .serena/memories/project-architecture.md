# Cerebrum Biology Academy - Architecture Overview

## Project Type

Full-stack Next.js 15 educational platform for NEET Biology preparation.

## Tech Stack

- **Frontend**: Next.js 15 (App Router), React 19, TypeScript
- **Styling**: Tailwind CSS, Radix UI, Framer Motion
- **Backend**: Next.js API Routes, Prisma ORM
- **Database**: Supabase PostgreSQL
- **Auth**: NextAuth v5 (next-auth@beta)
- **Payments**: Razorpay
- **Cache**: Upstash Redis
- **Monitoring**: Sentry, OpenTelemetry
- **Deployment**: Vercel

## Directory Structure

```
src/
├── app/              # Next.js App Router
│   ├── api/          # API routes
│   ├── (auth)/       # Auth pages
│   ├── (dashboard)/  # Protected routes
│   └── (marketing)/  # Public pages
├── components/       # React components
│   ├── ui/           # Base UI (shadcn)
│   └── dashboard/    # Dashboard specific
├── lib/              # Utilities
│   ├── auth/         # NextAuth config
│   ├── db/           # Database utils
│   └── mcp/          # MCP servers
├── generated/        # Prisma client
└── __tests__/        # Jest tests
```

## Key Files

- `prisma/schema.prisma` - Database schema
- `src/lib/auth/config.ts` - Auth configuration
- `src/lib/db/index.ts` - Prisma client
- `middleware.ts` - Next.js middleware

## Database Models (Key)

- `users` - User accounts
- `leads` - CRM leads
- `biology_topics` - Content
- `payments` - Razorpay payments
- `courses` - Course catalog
- `enrollments` - User enrollments

## API Patterns

All API routes follow:

```typescript
import { auth } from '@/lib/auth/config'
import { prisma } from '@/lib/db'
export async function GET() {
  const session = await auth()
  // ... logic
  return NextResponse.json({ success: true, data })
}
```

## Testing

- Unit tests: Jest (`src/__tests__/`)
- E2E tests: Playwright (`tests/`)
- Coverage: `npm run test:coverage`

## Deployment

- Platform: Vercel
- Domain: cerebrumbiologyacademy.com
- Pre-deploy: `npm run deploy:pre-check`
- Deploy: `npm run deploy:production`
