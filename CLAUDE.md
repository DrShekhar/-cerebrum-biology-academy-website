# Cerebrum Biology Academy - Claude Code Configuration

## Project Overview

Full-stack educational platform for NEET Biology preparation built with Next.js 15, Supabase, Prisma, and Vercel.

---

## 🎨 CEREBRUM DESIGN STYLE (SPECIAL MENTION)

### Brand Identity
**Premium, Modern, Achievement-Focused** - A sophisticated SaaS-style design targeting aspirational NEET students. High contrast between dark gradients and bright accent colors creates visual hierarchy emphasizing exclusivity and success.

### ⭐ FAVORITE ACCENT COLORS (Primary Palette)

These 6 colors are the **preferred accent colors** for CTAs, badges, highlights, and visual emphasis:

| Color | Tailwind | Hex | Usage |
|-------|----------|-----|-------|
| **Green 500** | `bg-green-500` | `#22c55e` | Success, NEET strategy, positive actions |
| **Google Red** | `bg-[#ea4335]` | `#ea4335` | Hearts, alerts, urgent notifications |
| **Teal 600** | `bg-teal-600` | `#0d9488` | Biology-themed buttons, medical feel |
| **Blue 600** | `bg-blue-600` | `#2563eb` | Links, info buttons, trust signals |
| **Purple 700** | `bg-purple-700` | `#7c3aed` | Premium features, VIP badges |
| **Yellow 800** | `bg-yellow-800` | `#854d0e` | **Prominent buttons**, earthy CTAs, gold accents |

### Warning & Alert Colors

| Color | Tailwind | Hex | Usage |
|-------|----------|-----|-------|
| **Red 100** | `bg-red-100` | `#fee2e2` | Warning message backgrounds |
| **Red 200** | `bg-red-200` | `#fecaca` | Warning borders, light alerts |
| **Red 500** | `bg-red-500` | `#ef4444` | Warning text on light backgrounds |

### Typography Style
- **Font**: Geist Sans with system fallbacks
- **Hierarchy**: Large display text (2xl-6xl) for heroes, semibold/bold for emphasis
- **Line Height**: 1.5 for body text, tighter for headings

### Visual Effects
- **Cards**: Rounded corners (0.5rem), white backgrounds, shadow-xl
- **Buttons**: Rounded-lg, hover scale (1.02x), shadow-lg on primary
- **Animations**: Fade-in-up transitions (0.4s ease-out)
- **Shadows**: shadow-lg for prominent elements, shadow-xl for cards
- **Gradients**: Dark blue-900 heroes, light pastel backgrounds for sections

### Component Style Patterns
- **Hero Sections**: Dark gradient (slate-900 to slate-800) with yellow/white text
- **Cards**: White bg, rounded-xl, shadow-xl, border-slate-200
- **Primary CTAs**: Yellow (#facc15) with hover (#fde047) - high visibility
- **Badges/Pills**: Rounded-full with colored backgrounds and 20% opacity overlays
- **Headers**: Sticky with backdrop blur (8px), semi-transparent

### Reference Page
**Live Example**: https://cerebrumbiologyacademy.com/courses/intensive-neet-biology

---

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

**GRADIENTS:** Only use the 8 approved gradients listed below. No custom gradients.

**AVOID these colors** (unless absolutely necessary):
- Cyan (use Blue instead)
- Pink (use Indigo/Purple instead)
- Emerald (use Green instead)

**PREFERRED COLORS** (use these more often):
| Color | Tailwind | Hex | Use For |
|-------|----------|-----|---------|
| Cerebrum Dark | `bg-[#3d4d3d]` | `#3d4d3d` | Primary brand, headers |
| Gray 900 | `bg-gray-900` | `#111827` | Headings, dark buttons |
| Gray 700 | `bg-gray-700` | `#374151` | Subheadings |
| Gray 600 | `bg-gray-600` | `#4b5563` | Body text |
| Blue 600 | `bg-blue-600` | `#2563eb` | Links, info buttons |
| Indigo 500 | `bg-indigo-500` | `#6366f1` | Special CTAs |
| Purple 700 | `bg-purple-700` | `#7c3aed` | Premium features |
| Purple 600 | `bg-purple-600` | `#9333ea` | Badges, highlights |
| Green 600 | `bg-green-600` | `#16a34a` | Success states |
| Green 500 | `bg-green-500` | `#22c55e` | NEET strategy |
| Teal 600 | `bg-teal-600` | `#0d9488` | Bio-themed buttons |
| Google Red | `bg-[#ea4335]` | `#ea4335` | Heart icons, alerts |
| Red 600 | `bg-red-600` | `#dc2626` | Errors, warnings |
| Orange 500 | `bg-orange-500` | `#f97316` | Urgent CTAs |
| Yellow 800 | `bg-yellow-800` | `#854d0e` | Warning text |

#### Approved Color Palette (64 colors)

**Brand Colors:**
| Name | Tailwind | Hex |
|------|----------|-----|
| Cerebrum Green | `bg-[#4a5d4a]` | `#4a5d4a` |
| Cerebrum Dark | `bg-[#3d4d3d]` | `#3d4d3d` |
| Cerebrum Light | `bg-[#5a6d5a]` | `#5a6d5a` |
| Cerebrum V.Light | `bg-[#e8ede8]` | `#e8ede8` |

**Gray Scale:**
| Name | Tailwind | Hex |
|------|----------|-----|
| Gray 900 | `bg-gray-900` | `#111827` |
| Gray 800 | `bg-gray-800` | `#1f2937` |
| Gray 700 | `bg-gray-700` | `#374151` |
| Gray 600 | `bg-gray-600` | `#4b5563` |
| Gray 500 | `bg-gray-500` | `#6b7280` |
| Gray 400 | `bg-gray-400` | `#9ca3af` |
| Gray 300 | `bg-gray-300` | `#d1d5db` |
| Gray 200 | `bg-gray-200` | `#e5e7eb` |
| Gray 100 | `bg-gray-100` | `#f3f4f6` |
| Gray 50 | `bg-gray-50` | `#f9fafb` |
| Black | `bg-black` | `#000000` |
| White | `bg-white` | `#ffffff` |

**Slate Scale:**
| Name | Tailwind | Hex |
|------|----------|-----|
| Slate 900 | `bg-slate-900` | `#0f172a` |
| Slate 800 | `bg-slate-800` | `#1e293b` |
| Slate 700 | `bg-slate-700` | `#334155` |

**Blue Scale:**
| Name | Tailwind | Hex |
|------|----------|-----|
| Blue 800 | `bg-blue-800` | `#1e40af` |
| Blue 600 | `bg-blue-600` | `#2563eb` |
| Blue 500 | `bg-blue-500` | `#3b82f6` |
| Google Blue | `bg-[#4285f4]` | `#4285f4` |
| Blue 200 | `bg-blue-200` | `#bfdbfe` |
| Blue 50 | `bg-blue-50` | `#eff6ff` |

**Indigo Scale:**
| Name | Tailwind | Hex |
|------|----------|-----|
| Indigo 600 | `bg-indigo-600` | `#4f46e5` |
| Indigo 500 | `bg-indigo-500` | `#6366f1` |
| Indigo 50 | `bg-indigo-50` | `#eef2ff` |

**Purple Scale:**
| Name | Tailwind | Hex |
|------|----------|-----|
| Purple 800 | `bg-purple-800` | `#6b21a8` |
| Purple 700 | `bg-purple-700` | `#7c3aed` |
| Purple 600 | `bg-purple-600` | `#9333ea` |
| Purple 500 | `bg-purple-500` | `#a855f7` |
| Purple 200 | `bg-purple-200` | `#e9d5ff` |
| Purple 100 | `bg-purple-100` | `#f3e8ff` |
| Purple 50 | `bg-purple-50` | `#faf5ff` |

**Green Scale:**
| Name | Tailwind | Hex |
|------|----------|-----|
| Green 800 | `bg-green-800` | `#166534` |
| Green 600 | `bg-green-600` | `#16a34a` |
| Green 500 | `bg-green-500` | `#22c55e` |
| Google Green | `bg-[#34a853]` | `#34a853` |
| Green 200 | `bg-green-200` | `#bbf7d0` |
| Green 50 | `bg-green-50` | `#f0fdf4` |

**Teal Scale:**
| Name | Tailwind | Hex |
|------|----------|-----|
| Teal 700 | `bg-teal-700` | `#0f766e` |
| Teal 600 | `bg-teal-600` | `#0d9488` |

**Red Scale:**
| Name | Tailwind | Hex |
|------|----------|-----|
| Red 800 | `bg-red-800` | `#991b1b` |
| Red 700 | `bg-red-700` | `#b91c1c` |
| Red 600 | `bg-red-600` | `#dc2626` |
| Red 500 | `bg-red-500` | `#ef4444` |
| Google Red | `bg-[#ea4335]` | `#ea4335` |
| Red 200 | `bg-red-200` | `#fecaca` |
| Red 100 | `bg-red-100` | `#fee2e2` |
| Red 50 | `bg-red-50` | `#fef2f2` |

**Orange Scale:**
| Name | Tailwind | Hex |
|------|----------|-----|
| Orange 600 | `bg-orange-600` | `#ea580c` |
| Orange 500 | `bg-orange-500` | `#f97316` |
| Orange 100 | `bg-orange-100` | `#ffedd5` |
| Orange 50 | `bg-orange-50` | `#fff7ed` |

**Yellow Scale:**
| Name | Tailwind | Hex |
|------|----------|-----|
| Yellow 800 | `bg-yellow-800` | `#854d0e` |
| Yellow 600 | `bg-yellow-600` | `#ca8a04` |
| Yellow 500 | `bg-yellow-500` | `#eab308` |
| Yellow 400 | `bg-yellow-400` | `#facc15` |
| Yellow 300 | `bg-yellow-300` | `#fde047` |
| Google Yellow | `bg-[#fbbc04]` | `#fbbc04` |
| Yellow 200 | `bg-yellow-200` | `#fef08a` |
| Yellow 100 | `bg-yellow-100` | `#fef9c3` |
| Yellow 50 | `bg-yellow-50` | `#fefce8` |

#### Allowed Gradients (8 gradients)

| Name | Tailwind Classes | Usage |
|------|------------------|-------|
| Orange to Red | `bg-gradient-to-r from-orange-500 to-red-500` | Urgent CTAs |
| Orange to Yellow | `bg-gradient-to-r from-orange-500 to-yellow-500` | Highlights |
| Blue 50 to Purple 50 | `bg-gradient-to-br from-blue-50 to-purple-50` | Card BG |
| Green 50 to Teal 50 | `bg-gradient-to-br from-green-50 to-teal-50` | Bio sections |
| Purple 50 to Pink 50 | `bg-gradient-to-br from-purple-50 to-pink-50` | Premium BG |
| Gray 50 to White | `bg-gradient-to-b from-gray-50 to-white` | Page sections |
| Slate 900 to 800 | `bg-gradient-to-br from-slate-900 to-slate-800` | Dark hero |
| Blue to Purple | `bg-gradient-to-r from-blue-600 to-purple-600` | CTAs, badges |

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
