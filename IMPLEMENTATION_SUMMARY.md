# COUNSELOR DASHBOARD - IMPLEMENTATION SUMMARY

Quick reference guide for the 7-day implementation plan.

## Overview

**Project:** Counselor Dashboard for Cerebrum Biology Academy  
**Timeline:** 7 days  
**Goal:** Build HubSpot-quality CRM with WhatsApp-first communication

## Key Components

### 1. Database (8 New Models)

- Lead - Core lead management
- Communication - WhatsApp/Email/Call tracking
- FeePlan - Payment plans with installments
- Offer - Discount offers with expiry
- Task - Manual & auto-generated tasks
- Note - Internal counselor notes
- Activity - Audit log
- Installment - Payment tracking

### 2. API Routes (18 Endpoints)

- Lead CRUD + stage management
- Communication (send/receive via WhatsApp)
- Fee plan creation & installments
- Offer generation & delivery
- Task management
- Admin analytics
- WhatsApp webhook
- Cron jobs (reminders, inactive leads)

### 3. UI Components

- LeadPipelineBoard (Kanban with drag-drop)
- CommunicationHub (WhatsApp-style inbox)
- FeePlanCreator (installment calculator)
- OfferGenerator (with image generation)
- TaskList (filtered by priority/due date)
- LeadDetailPage (full history & actions)
- AdminDashboard (performance metrics)

### 4. Automation

- Task Auto-Generation
  - Demo completed → Follow up (2 hours)
  - Offer sent → Check status (2 days)
  - Payment overdue → Urgent call
  - 7 days inactive → Re-engagement
- Payment Reminders
  - 7 days before due
  - 3 days before due
  - 1 day before due
  - On due date
  - Overdue (every 3 days)

## Daily Schedule

| Day | Morning                     | Afternoon                  |
| --- | --------------------------- | -------------------------- |
| 1   | Database schema + migration | Auth & RBAC setup          |
| 2   | Lead CRUD APIs              | Pipeline board UI          |
| 3   | WhatsApp integration        | Communication hub          |
| 4   | Fee plan APIs               | Offer generator            |
| 5   | Task system                 | Activity log & lead detail |
| 6   | Admin dashboard             | Automation (cron jobs)     |
| 7   | Testing                     | Polish & deploy            |

## Technology Stack

- **Database:** PostgreSQL + Prisma ORM
- **Backend:** Next.js 15 App Router API routes
- **Frontend:** React + TypeScript + Tailwind CSS
- **Validation:** Zod schemas
- **WhatsApp:** Interakt API
- **Payments:** Razorpay (already integrated)
- **Hosting:** Vercel
- **Cron Jobs:** Vercel Cron
- **Drag & Drop:** @dnd-kit

## Critical Success Factors

1. **No Breaking Changes**
   - Only add new models/routes
   - Don't modify existing code
   - Test existing features after migration

2. **WhatsApp-First**
   - All communication via WhatsApp
   - Delivery status tracking
   - Message templates
   - Media support (images, PDFs)

3. **Automation**
   - Smart task generation (8 triggers)
   - Payment reminders (5 schedules)
   - Lead scoring
   - Inactivity detection

4. **Performance**
   - All queries use indexes
   - Pagination on all lists
   - <500ms API response time
   - Optimistic UI updates

5. **Security**
   - RBAC (counselors see only assigned leads)
   - Webhook signature verification
   - Input validation with Zod
   - Rate limiting

## Environment Variables Needed

```env
INTERAKT_API_KEY=...
INTERAKT_WEBHOOK_SECRET=...
INTERAKT_PHONE_NUMBER_ID=...
CRON_SECRET=...
```

## Testing Priorities

1. Database migration (rollback test)
2. WhatsApp message delivery
3. Payment reminder cron job
4. Task auto-generation triggers
5. Lead stage transitions
6. Admin performance metrics
7. Mobile responsiveness

## Risk Mitigation

| Risk                       | Mitigation                       |
| -------------------------- | -------------------------------- |
| Breaking existing features | Separate routes, test thoroughly |
| WhatsApp rate limits       | Retry logic, message queue       |
| Database performance       | Indexes, pagination, monitoring  |
| Cron jobs fail             | Manual triggers, logging, alerts |
| Timeline slippage          | MVP focus, scope reduction plan  |

## Deployment Checklist

Pre-deployment:

- [ ] Environment variables set
- [ ] Database backup
- [ ] Migration tested on staging
- [ ] All APIs tested
- [ ] Mobile responsive verified

Post-deployment:

- [ ] Send test WhatsApp messages
- [ ] Verify cron jobs scheduled
- [ ] Monitor error logs (first hour)
- [ ] Train counselors
- [ ] Collect feedback

## Success Metrics (Week 1)

- API uptime: > 99.9%
- Error rate: < 1%
- WhatsApp delivery rate: > 95%
- Counselor satisfaction: > 4/5
- Leads managed per counselor: > 30

## Quick Commands

```bash
# Database
npx prisma migrate dev --name add_counselor_crm
npx prisma migrate deploy
npx prisma studio

# Development
npm run dev
npm run build
npx tsc --noEmit

# Deployment
vercel --prod
vercel logs
vercel rollback
```

## Important Files

**Backend:**

- `prisma/schema.prisma` - Database models
- `src/app/api/counselor/*` - API routes
- `src/lib/counselor/whatsapp.ts` - WhatsApp service

**Frontend:**

- `src/app/counselor/*` - Pages
- `src/components/counselor/*` - Components
- `src/contexts/CounselorContext.tsx` - State

**Config:**

- `.env.local` - Environment variables
- `vercel.json` - Cron configuration

## Next Steps

1. Review full technical plan (TECHNICAL_IMPLEMENTATION_PLAN.md)
2. Get business owner approval
3. Set up Interakt account
4. Create counselor test user
5. Begin Day 1 implementation

## Support

For detailed specifications, see:

- Full plan: `TECHNICAL_IMPLEMENTATION_PLAN.md`
- Project context: `.ai-memory/COUNSELOR_DASHBOARD_PROJECT.md`
- Database schema: Section 1 of technical plan
- API specs: Section 2 of technical plan
- Component architecture: Section 3 of technical plan

---

**Ready to build!** Start with Day 1: Database migration.
