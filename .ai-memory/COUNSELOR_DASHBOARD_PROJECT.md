# 🎯 COUNSELOR DASHBOARD PROJECT - AI MEMORY FILE

**Project Code:** CRM-CDA-2025
**Start Date:** November 10, 2025
**Status:** Planning & Research Phase
**Priority:** HIGH - Business Critical

---

## 📌 PROJECT CONTEXT (DO NOT FORGET)

### Business Owner Requirements:

1. **Customization:** Built specifically for Cerebrum Biology Academy (not generic)
2. **WhatsApp-First:** All communication flows through WhatsApp (primary channel)
3. **HubSpot-Inspired UI/UX:** Modern, clean, professional interface
4. **Zero Breaking Changes:** Existing website must continue working perfectly
5. **Future-Proof:** Build advanced system ahead of competitors
6. **Conversion Focus:** Every feature must help convert leads to customers

### Critical Success Factors:

- ✅ Counselor efficiency: Manage 50+ leads easily
- ✅ Zero leads lost: Automated follow-ups prevent ghosting
- ✅ Payment collection: 95%+ on-time payment rate
- ✅ Admin visibility: Real-time oversight of all activities
- ✅ WhatsApp integration: Seamless communication
- ✅ Beautiful UI: HubSpot-level design quality

---

## 🏢 BUSINESS CONTEXT

### About Cerebrum Biology Academy:

- **Focus:** NEET Biology coaching (Class 11, 12, Droppers)
- **USP:** AIIMS expert faculty, 98% success rate
- **Student Base:** 2000+ students mentored
- **Locations:** 50+ countries (online + offline)
- **Phone:** +91 93119 46297
- **Domain:** cerebrumbiologyacademy.com

### Current Tech Stack:

- **Framework:** Next.js 15.5.3 (App Router)
- **Database:** PostgreSQL + Prisma ORM
- **Styling:** Tailwind CSS
- **Payments:** Razorpay
- **WhatsApp:** Interakt API (to be integrated)
- **Email:** Resend API (already integrated)
- **Hosting:** Vercel

### Existing Features (DO NOT BREAK):

- Demo booking system ✅
- Course pages (Class 11, 12, Dropper) ✅
- Payment integration ✅
- Admin dashboard (basic) ✅
- Student portal ✅
- SEO-optimized pages ✅

---

## 🎯 PROJECT GOALS

### Primary Objective:

Build a world-class Education Counselor Dashboard that transforms lead management and increases enrollment conversion by 40%.

### Key Features to Build:

#### Phase 1: MVP (7 days)

1. **Lead Pipeline Management**
   - Visual Kanban board (New → Demo → Offer → Payment → Enrolled)
   - Drag-and-drop functionality
   - Priority tagging (Hot/Warm/Cold)
   - Lead detail page with full history

2. **WhatsApp Communication Hub**
   - Send messages from dashboard
   - Message templates library
   - Delivery status tracking
   - Communication timeline
   - Media/offer image sending

3. **Fee Plan Creator**
   - Custom installment plans
   - Auto-generated payment schedules
   - Automated reminders (WhatsApp)
   - Payment tracking

4. **Offer Generator**
   - Personalized discount creation
   - WhatsApp-ready offer cards
   - Expiry tracking
   - Acceptance analytics

5. **Task Automation**
   - Auto-generated follow-up tasks
   - Payment reminder tasks
   - Task prioritization
   - Completion tracking

6. **Admin Dashboard**
   - Counselor performance metrics
   - Lead distribution
   - Revenue tracking
   - Activity feed

---

## 🎨 DESIGN REQUIREMENTS

### UI/UX Inspiration: HubSpot CRM

**Why HubSpot:**

- Clean, modern interface
- Excellent information hierarchy
- Intuitive workflows
- Professional appearance
- Mobile-responsive
- Fast, snappy interactions

### Design Principles:

1. **WhatsApp-First:** Green accents, chat-like interfaces
2. **Data Density:** Show a lot without overwhelming
3. **Quick Actions:** Everything accessible in 1-2 clicks
4. **Visual Clarity:** Use colors to indicate status/priority
5. **Mobile-Friendly:** Counselors work on phones

### Color Palette (Cerebrum + WhatsApp):

- **Primary:** Blue/Purple gradient (existing brand)
- **WhatsApp:** #25D366 (green for communication)
- **Success:** Green for completed tasks
- **Warning:** Orange for pending actions
- **Danger:** Red for overdue/critical
- **Neutral:** Gray scale for backgrounds

---

## 🔧 TECHNICAL ARCHITECTURE

### Database Schema (New Models):

```prisma
// Core CRM Models
model Lead {
  id                String      @id @default(cuid())
  studentName       String
  email             String
  phone             String
  courseInterest    String
  stage             LeadStage
  priority          Priority
  assignedToId      String
  assignedTo        User        @relation("CounselorLeads")

  // Timestamps
  createdAt         DateTime    @default(now())
  lastContactedAt   DateTime?
  nextFollowUpAt    DateTime?
  convertedAt       DateTime?

  // Relations
  communications    Communication[]
  offers            Offer[]
  feePlans          FeePlan[]
  tasks             Task[]
  notes             Note[]
  activities        Activity[]
}

model Communication {
  id              String        @id @default(cuid())
  leadId          String
  type            CommType      // WHATSAPP, EMAIL, CALL
  direction       Direction     // INBOUND, OUTBOUND
  message         String        @db.Text
  status          MessageStatus
  sentAt          DateTime      @default(now())
}

model FeePlan {
  id              String        @id @default(cuid())
  leadId          String
  totalFee        Decimal       @db.Decimal(10, 2)
  discount        Decimal       @db.Decimal(10, 2)
  amountDue       Decimal       @db.Decimal(10, 2)
  installments    Installment[]
  status          FeeStatus
}

model Installment {
  id              String        @id @default(cuid())
  feePlanId       String
  amount          Decimal       @db.Decimal(10, 2)
  dueDate         DateTime
  status          PaymentStatus
  remindersSent   Json?
}

model Offer {
  id              String        @id @default(cuid())
  leadId          String
  offerCode       String        @unique
  discountValue   Decimal       @db.Decimal(10, 2)
  validUntil      DateTime
  status          OfferStatus
}

model Task {
  id              String        @id @default(cuid())
  leadId          String?
  title           String
  type            TaskType
  priority        TaskPriority
  dueDate         DateTime
  status          TaskStatus
  assignedToId    String
}

model Activity {
  id              String        @id @default(cuid())
  userId          String
  leadId          String?
  action          String
  description     String
  createdAt       DateTime      @default(now())
}
```

### API Routes to Create:

- `/api/counselor/leads` - Lead CRUD
- `/api/counselor/communications` - WhatsApp/Email/Call
- `/api/counselor/fee-plans` - Payment plans
- `/api/counselor/offers` - Discount offers
- `/api/counselor/tasks` - Task management
- `/api/admin/counselor-performance` - Analytics
- `/api/admin/lead-distribution` - Lead assignment

### Frontend Routes:

- `/counselor` - Main dashboard
- `/counselor/leads` - Pipeline board
- `/counselor/leads/[id]` - Lead detail page
- `/counselor/communications` - Message center
- `/counselor/tasks` - Task list
- `/counselor/analytics` - Personal metrics
- `/admin/counselor-overview` - Admin oversight

---

## 🔌 INTEGRATIONS

### WhatsApp (Interakt API)

**Base URL:** https://api.interakt.ai/v1/public/

**Key Endpoints:**

- `POST /message/` - Send template message
- `POST /message/send-text` - Send text message
- `POST /media/` - Upload and send media
- `GET /message/{id}` - Message status

**Authentication:** Basic Auth (API Key in header)

**Environment Variables Needed:**

```bash
INTERAKT_API_KEY="your_key_here"
INTERAKT_BASE_URL="https://api.interakt.ai/v1/public"
```

### Razorpay (Already Integrated)

- Generate payment links for installments
- Webhook for payment confirmation
- Auto-update fee plan status

### Resend (Already Integrated)

- Email confirmations
- Receipt generation

---

## 🚨 CRITICAL RULES (NEVER VIOLATE)

### 1. Zero Breaking Changes

- **DO NOT** modify existing API routes without extensive testing
- **DO NOT** change existing database models (only add new ones)
- **DO NOT** remove or rename existing components
- **DO NOT** change existing page routes
- **ALWAYS** create new routes under `/counselor` and `/admin/counselor-*`

### 2. Code Quality Standards

- **TypeScript:** Strict typing, no `any` types
- **Error Handling:** Try-catch blocks, graceful failures
- **Validation:** Zod schemas for all API inputs
- **Security:** Role-based access control (RBAC)
- **Performance:** Optimize database queries, use indexes
- **Mobile-First:** Responsive design always

### 3. Testing Requirements

- **Manual Testing:** Test every feature in dev before committing
- **Database Migrations:** Always test schema changes
- **API Testing:** Verify all endpoints work
- **Cross-Browser:** Test on Chrome, Safari, mobile browsers
- **User Flow Testing:** Walk through entire counselor workflow

### 4. WhatsApp-First Approach

- **Primary Channel:** WhatsApp is #1 communication method
- **Fallback:** Email is secondary
- **Integration:** Deep Interakt integration
- **Templates:** Pre-approved WhatsApp templates
- **UI Priority:** WhatsApp actions always visible

---

## 📋 AGENT COORDINATION PLAN

### Agent Roles & Responsibilities:

#### 1. Research Agent (UX/UI)

**Mission:** Analyze HubSpot CRM UI/UX and create design guidelines
**Deliverables:**

- HubSpot design analysis document
- Component library recommendations
- Interaction pattern guidelines
- Color scheme and typography

#### 2. Planning Agent

**Mission:** Create detailed technical implementation plan
**Deliverables:**

- Database migration plan
- API endpoint specifications
- Component architecture
- Development task breakdown

#### 3. Backend Agent

**Mission:** Build all API routes and database logic
**Deliverables:**

- Prisma schema updates
- API routes for CRUD operations
- WhatsApp integration
- Payment automation logic

#### 4. Frontend Agent

**Mission:** Build React/Next.js components
**Deliverables:**

- Dashboard layouts
- Pipeline board component
- Lead detail page
- Communication hub UI
- Mobile-responsive components

#### 5. UI Agent

**Mission:** Create beautiful, HubSpot-inspired interfaces
**Deliverables:**

- Tailwind component library
- Reusable UI primitives
- Animation and transitions
- Loading states

#### 6. UX Agent

**Mission:** Optimize user workflows and interactions
**Deliverables:**

- User flow diagrams
- Interaction patterns
- Accessibility improvements
- Performance optimizations

#### 7. Product Agent

**Mission:** Ensure business requirements are met
**Deliverables:**

- Feature validation
- User story verification
- Acceptance criteria checklist
- Business logic validation

---

## 🎯 SUCCESS METRICS

### For Counselors:

- **Lead Management:** 50+ leads per counselor (currently ~20)
- **Response Time:** < 2 hours average (currently ~6 hours)
- **Task Completion:** 95%+ on-time (currently ~60%)
- **Conversion Rate:** 30%+ demo-to-enrollment (currently ~20%)

### For Business:

- **Revenue:** +25% quarterly growth
- **Payment Collection:** 95%+ on-time (currently ~75%)
- **Lead Wastage:** < 10% (currently ~30%)
- **Counselor Efficiency:** 3x productivity increase

### For Admin:

- **Visibility:** 100% real-time oversight
- **Attribution:** Clear revenue per counselor
- **Forecasting:** Accurate revenue predictions
- **Accountability:** Complete activity audit trail

---

## 📁 PROJECT FILE STRUCTURE

```
src/
├── app/
│   ├── counselor/
│   │   ├── page.tsx              # Main dashboard
│   │   ├── leads/
│   │   │   ├── page.tsx          # Pipeline board
│   │   │   └── [id]/page.tsx    # Lead detail
│   │   ├── communications/
│   │   │   └── page.tsx          # Message center
│   │   ├── tasks/
│   │   │   └── page.tsx          # Task list
│   │   └── layout.tsx            # Counselor layout
│   ├── admin/
│   │   └── counselor-overview/
│   │       └── page.tsx          # Admin dashboard
│   └── api/
│       └── counselor/
│           ├── leads/route.ts
│           ├── communications/route.ts
│           ├── fee-plans/route.ts
│           ├── offers/route.ts
│           └── tasks/route.ts
├── components/
│   └── counselor/
│       ├── LeadPipelineBoard.tsx
│       ├── LeadCard.tsx
│       ├── CommunicationHub.tsx
│       ├── FeePlanCreator.tsx
│       ├── OfferGenerator.tsx
│       └── TaskList.tsx
├── lib/
│   └── counselor/
│       ├── whatsapp.ts           # Interakt integration
│       ├── payment-reminders.ts  # Automation logic
│       └── task-generator.ts     # Auto-task creation
└── prisma/
    └── schema.prisma             # Updated schema
```

---

## 🔄 DEVELOPMENT WORKFLOW

### Phase 1: Research & Planning (Day 1)

1. Research Agent: Analyze HubSpot UI/UX
2. Planning Agent: Technical architecture
3. Product Agent: Validate requirements

### Phase 2: Foundation (Day 2)

1. Backend Agent: Database schema + migrations
2. Backend Agent: Authentication & RBAC
3. UI Agent: Component library setup

### Phase 3: Core Features (Days 3-5)

1. Backend + Frontend: Lead pipeline
2. Backend + Frontend: WhatsApp hub
3. Backend + Frontend: Fee plans
4. Backend + Frontend: Offers
5. Backend + Frontend: Tasks

### Phase 4: Polish & Testing (Days 6-7)

1. UX Agent: Optimize workflows
2. UI Agent: Final design polish
3. Product Agent: Acceptance testing
4. All Agents: Bug fixes

---

## 📝 NOTES & DECISIONS

### Design Decisions:

- [ ] HubSpot analysis complete
- [ ] Color palette finalized
- [ ] Component library selected
- [ ] Typography chosen

### Technical Decisions:

- [ ] Database schema approved
- [ ] API structure finalized
- [ ] Authentication approach confirmed
- [ ] WhatsApp template designs ready

### Business Decisions:

- [ ] Number of counselors confirmed
- [ ] Course pricing templates defined
- [ ] Message tone guidelines set
- [ ] Fee plan templates approved

---

## 🚀 NEXT STEPS

### Immediate Actions:

1. ✅ Memory file created (this file)
2. ⏳ Launch Research Agent (HubSpot analysis)
3. ⏳ Launch Planning Agent (technical spec)
4. ⏳ Get owner approvals on key decisions
5. ⏳ Begin development Phase 1

### Pending Approvals:

- [ ] Overall approach approved
- [ ] HubSpot-inspired design approved
- [ ] Database schema approved
- [ ] Timeline (7 days) approved

---

## 📞 CONTACT & QUESTIONS

### Key Questions for Owner:

1. How many counselors will use the system?
2. Do you have Interakt account credentials?
3. Typical course prices for fee plan templates?
4. Any specific HubSpot features you particularly like?
5. Any existing counselor workflows we should preserve?

---

## 🎯 PROJECT MANTRAS (Remember Always)

1. **"WhatsApp First, Everything Else Second"** - All communication flows through WhatsApp
2. **"Don't Break What Works"** - Existing features must continue working perfectly
3. **"HubSpot Quality, Cerebrum Speed"** - Beautiful UI, fast performance
4. **"Every Feature Converts"** - Each feature must help close more students
5. **"Counselors Love It"** - If counselors don't love using it, we rebuild it
6. **"Admin Sees Everything"** - Complete transparency and oversight

---

**Last Updated:** November 10, 2025
**Next Review:** After Research Agent completes
**Status:** Active Development - Phase 1 Planning
