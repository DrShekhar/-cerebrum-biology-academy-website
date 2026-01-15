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

#### Brand-Specific Colors (Custom)
| Name | Tailwind | Hex |
|------|----------|-----|
| Cerebrum Green | `bg-[#4a5d4a]` | `#4a5d4a` |
| Cerebrum Dark | `bg-[#3d4d3d]` | `#3d4d3d` |
| Cerebrum Light | `bg-[#5a6d5a]` | `#5a6d5a` |
| Cerebrum V.Light | `bg-[#e8ede8]` | `#e8ede8` |
| Google Blue | `bg-[#4285f4]` | `#4285f4` |
| Google Green | `bg-[#34a853]` | `#34a853` |
| Google Red | `bg-[#ea4335]` | `#ea4335` |
| Google Yellow | `bg-[#fbbc04]` | `#fbbc04` |

> **Full palette reference**: Visit `/color-palette` page for all 64 approved colors with visual swatches.

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
5. **ALWAYS check responsiveness** on 3 screen sizes:
   - **Mobile**: 375px (iPhone SE/small phones)
   - **iPad/Tablet**: 768px (iPad portrait)
   - **Desktop**: 1280px+ (standard desktop)

### Responsive Design Checklist

Before committing any UI changes, verify:
- [ ] Mobile (375px): Content readable, no horizontal scroll, touch-friendly buttons
- [ ] iPad (768px): Grid layouts appropriate (not too cramped or sparse)
- [ ] Desktop (1280px+): Full layout displays correctly

**Common Responsive Patterns:**
```tsx
// Grids: Mobile → Tablet → Desktop
grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3     // 1 → 2 → 3 columns
grid grid-cols-2 md:grid-cols-4                     // 2 → 4 columns (stats)

// Padding: Smaller on mobile
p-4 md:p-6 lg:p-8                                   // Progressive padding

// Text: Scale up on larger screens
text-lg md:text-xl lg:text-2xl                      // Progressive text size

// Flex direction: Stack on mobile
flex flex-col md:flex-row                           // Vertical → Horizontal
```

### Deployment

1. Run `npm run deploy:pre-check`
2. Verify staging preview first
3. Deploy to production: `npm run deploy:production`
4. Verify: `npm run verify:production`

## Common Patterns

- **API Routes**: See `src/app/api/` for examples. Use `auth()`, try/catch, return `{ success, data?, error? }`
- **Components**: See `src/components/ui/` for patterns. Use `'use client'`, `cn()` for classes

## Reference Pages

| Page          | URL              | Purpose                                                  |
| ------------- | ---------------- | -------------------------------------------------------- |
| Color Palette | `/color-palette` | All colors, gradients, combinations used across the site |

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
