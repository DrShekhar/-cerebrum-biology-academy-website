# COUNSELOR DASHBOARD - TECHNICAL IMPLEMENTATION PLAN

**Project:** CRM-CDA-2025  
**Timeline:** 7 Days  
**Priority:** HIGH - Business Critical  
**Created:** November 10, 2025

---

## TABLE OF CONTENTS

1. [Database Migration Plan](#1-database-migration-plan)
2. [API Endpoint Specifications](#2-api-endpoint-specifications)
3. [Component Architecture](#3-component-architecture)
4. [WhatsApp Integration Technical Spec](#4-whatsapp-integration-technical-spec)
5. [Payment Reminder Automation](#5-payment-reminder-automation)
6. [Task Auto-Generation Logic](#6-task-auto-generation-logic)
7. [Testing Strategy](#7-testing-strategy)
8. [Day-by-Day Development Schedule](#8-day-by-day-development-schedule)
9. [Risk Mitigation](#9-risk-mitigation)
10. [Deployment Checklist](#10-deployment-checklist)

---

## 1. DATABASE MIGRATION PLAN

### 1.1 New Models to Add

All new models will be added to `prisma/schema.prisma` without modifying existing models.

#### Lead Model

```prisma
model Lead {
  id                String      @id @default(cuid())

  // Student Information
  studentName       String
  email             String?
  phone             String
  courseInterest    String      // "Class 11", "Class 12", "Dropper"
  studentClass      StudentClass?

  // Lead Management
  stage             LeadStage   @default(NEW)
  priority          LeadPriority @default(WARM)
  source            String?     // "website", "whatsapp", "referral", "demo"
  assignedToId      String

  // Tracking
  createdAt         DateTime    @default(now())
  lastContactedAt   DateTime?
  nextFollowUpAt    DateTime?
  convertedAt       DateTime?
  enrollmentId      String?     // Link to Enrollment if converted

  // Lead Scoring
  leadScore         Int         @default(0)  // 0-100
  engagementScore   Int         @default(0)  // Based on interactions

  // Marketing Attribution
  utmSource         String?
  utmMedium         String?
  utmCampaign       String?
  referrerUrl       String?

  // Relations
  assignedTo        User        @relation("CounselorLeads", fields: [assignedToId], references: [id])
  communications    Communication[]
  offers            Offer[]
  feePlans          FeePlan[]
  tasks             Task[]
  notes             Note[]
  activities        Activity[]

  @@index([assignedToId, stage])
  @@index([stage, priority])
  @@index([nextFollowUpAt])
  @@index([phone])
  @@index([email])
  @@index([createdAt])
  @@map("leads")
}

enum LeadStage {
  NEW           // Just created
  CONTACTED     // First contact made
  DEMO_BOOKED   // Demo scheduled
  DEMO_DONE     // Demo completed
  OFFER_SENT    // Discount offer sent
  NEGOTIATION   // Price discussion
  PAYMENT_PENDING // Waiting for payment
  ENROLLED      // Successfully enrolled
  COLD          // Not responding
  LOST          // Lost to competitor or not interested
}

enum LeadPriority {
  HOT    // Respond within 1 hour
  WARM   // Respond within 4 hours
  COLD   // Respond within 24 hours
}
```

#### Communication Model

```prisma
model Communication {
  id              String        @id @default(cuid())
  leadId          String

  // Communication Details
  type            CommType
  direction       CommDirection
  channel         CommChannel   @default(WHATSAPP)

  // Content
  subject         String?
  message         String        @db.Text
  templateId      String?       // WhatsApp template ID

  // Delivery Tracking
  status          MessageStatus @default(PENDING)
  sentAt          DateTime      @default(now())
  deliveredAt     DateTime?
  readAt          DateTime?
  repliedAt       DateTime?

  // WhatsApp Specific
  whatsappMsgId   String?       @unique
  mediaUrl        String?       // For images/PDFs
  interaktStatus  String?       // Interakt API status

  // Metadata
  sentBy          String        // User ID of counselor
  deviceInfo      Json?         // Device/browser info

  // Relations
  lead            Lead          @relation(fields: [leadId], references: [id], onDelete: Cascade)

  @@index([leadId, sentAt])
  @@index([status, sentAt])
  @@index([channel, sentAt])
  @@map("communications")
}

enum CommType {
  FIRST_CONTACT
  FOLLOW_UP
  DEMO_CONFIRMATION
  DEMO_REMINDER
  OFFER_SENT
  PAYMENT_REMINDER
  ENROLLMENT_CONFIRMATION
  GENERAL_INQUIRY
  CUSTOM
}

enum CommDirection {
  INBOUND   // From student to us
  OUTBOUND  // From us to student
}

enum CommChannel {
  WHATSAPP
  EMAIL
  PHONE_CALL
  SMS
}
```

#### FeePlan Model

```prisma
model FeePlan {
  id              String        @id @default(cuid())
  leadId          String

  // Plan Details
  planName        String        // "Full Payment", "Quarterly", "Custom"
  courseId        String?
  totalFee        Decimal       @db.Decimal(10, 2)
  discount        Decimal       @db.Decimal(10, 2) @default(0)
  finalAmount     Decimal       @db.Decimal(10, 2)

  // Status
  status          FeePlanStatus @default(DRAFT)
  approvedBy      String?       // Admin user ID
  approvedAt      DateTime?

  // Tracking
  createdAt       DateTime      @default(now())
  updatedAt       DateTime      @updatedAt
  createdBy       String        // Counselor user ID

  // Relations
  lead            Lead          @relation(fields: [leadId], references: [id], onDelete: Cascade)
  installments    Installment[]

  @@index([leadId, status])
  @@index([status, createdAt])
  @@map("fee_plans")
}

model Installment {
  id              String        @id @default(cuid())
  feePlanId       String

  // Installment Details
  installmentNumber Int         // 1, 2, 3...
  amount          Decimal       @db.Decimal(10, 2)
  dueDate         DateTime

  // Payment Status
  status          InstallmentStatus @default(PENDING)
  paidAmount      Decimal       @db.Decimal(10, 2) @default(0)
  paidAt          DateTime?
  paymentId       String?       // Razorpay payment ID

  // Reminders
  remindersSent   Int           @default(0)
  lastReminderAt  DateTime?
  nextReminderAt  DateTime?

  // Relations
  feePlan         FeePlan       @relation(fields: [feePlanId], references: [id], onDelete: Cascade)

  @@index([feePlanId, dueDate])
  @@index([status, dueDate])
  @@index([nextReminderAt])
  @@map("installments")
}

enum FeePlanStatus {
  DRAFT         // Being created
  SENT          // Sent to student
  ACCEPTED      // Student agreed
  ACTIVE        // Payment started
  COMPLETED     // All paid
  CANCELLED     // Plan cancelled
}

enum InstallmentStatus {
  PENDING       // Not yet due
  DUE           // Due now
  OVERDUE       // Past due date
  PAID          // Fully paid
  PARTIAL       // Partially paid
  WAIVED        // Admin waived
}
```

#### Offer Model

```prisma
model Offer {
  id              String        @id @default(cuid())
  leadId          String

  // Offer Details
  offerCode       String        @unique
  offerName       String        // "Early Bird 20%", "Demo Day Special"
  discountType    DiscountType
  discountValue   Decimal       @db.Decimal(10, 2)

  // Course Details
  courseId        String?
  originalPrice   Decimal       @db.Decimal(10, 2)
  finalPrice      Decimal       @db.Decimal(10, 2)

  // Validity
  validFrom       DateTime      @default(now())
  validUntil      DateTime
  usageLimit      Int           @default(1)
  usageCount      Int           @default(0)

  // Status & Tracking
  status          OfferStatus   @default(ACTIVE)
  sentAt          DateTime?
  viewedAt        DateTime?
  acceptedAt      DateTime?

  // Offer Card
  offerImageUrl   String?       // Generated offer card image
  whatsappMsgId   String?

  // Metadata
  createdBy       String        // Counselor user ID
  createdAt       DateTime      @default(now())

  // Relations
  lead            Lead          @relation(fields: [leadId], references: [id], onDelete: Cascade)

  @@index([leadId, status])
  @@index([offerCode])
  @@index([validUntil, status])
  @@map("offers")
}

enum DiscountType {
  PERCENTAGE    // e.g., 20%
  FLAT_AMOUNT   // e.g., ₹5000
}

enum OfferStatus {
  DRAFT         // Being created
  ACTIVE        // Live and usable
  SENT          // Sent to student
  VIEWED        // Student viewed
  ACCEPTED      // Student accepted
  USED          // Discount applied
  EXPIRED       // Past validity
  CANCELLED     // Manually cancelled
}
```

#### Task Model

```prisma
model Task {
  id              String        @id @default(cuid())
  leadId          String?       // Null for general tasks

  // Task Details
  title           String
  description     String?       @db.Text
  type            TaskType
  priority        TaskPriority  @default(MEDIUM)

  // Assignment
  assignedToId    String
  createdBy       String        // User ID who created

  // Scheduling
  dueDate         DateTime
  reminderAt      DateTime?

  // Status
  status          TaskStatus    @default(TODO)
  completedAt     DateTime?
  completedBy     String?

  // Auto-generation
  isAutoGenerated Boolean       @default(false)
  triggerType     String?       // "demo_completed", "offer_sent", etc.

  // Timestamps
  createdAt       DateTime      @default(now())
  updatedAt       DateTime      @updatedAt

  // Relations
  lead            Lead?         @relation(fields: [leadId], references: [id], onDelete: Cascade)
  assignedTo      User          @relation("AssignedTasks", fields: [assignedToId], references: [id])

  @@index([assignedToId, status])
  @@index([dueDate, status])
  @@index([leadId, status])
  @@index([priority, dueDate])
  @@map("tasks")
}

enum TaskType {
  CALL              // Make a phone call
  FOLLOW_UP         // General follow-up
  DEMO_FOLLOW_UP    // After demo class
  SEND_OFFER        // Send discount offer
  PAYMENT_REMINDER  // Remind about payment
  ENROLLMENT        // Complete enrollment
  DOCUMENT_COLLECTION // Get required documents
  CUSTOM            // Custom task
}

enum TaskPriority {
  URGENT    // Do immediately
  HIGH      // Do today
  MEDIUM    // Do this week
  LOW       // Do when possible
}

enum TaskStatus {
  TODO          // Not started
  IN_PROGRESS   // Working on it
  COMPLETED     // Done
  CANCELLED     // No longer needed
  OVERDUE       // Missed deadline
}
```

#### Note Model

```prisma
model Note {
  id              String        @id @default(cuid())
  leadId          String

  // Note Content
  title           String?
  content         String        @db.Text

  // Categorization
  category        NoteCategory  @default(GENERAL)
  isImportant     Boolean       @default(false)
  isPinned        Boolean       @default(false)

  // Metadata
  createdBy       String        // User ID
  createdAt       DateTime      @default(now())
  updatedAt       DateTime      @updatedAt

  // Relations
  lead            Lead          @relation(fields: [leadId], references: [id], onDelete: Cascade)

  @@index([leadId, createdAt])
  @@index([category, isImportant])
  @@map("notes")
}

enum NoteCategory {
  GENERAL
  PARENT_DISCUSSION
  STUDENT_BACKGROUND
  OBJECTIONS
  FOLLOW_UP_PLAN
  COMPETITOR_INFO
  SPECIAL_REQUIREMENTS
}
```

#### Activity Model (Audit Log)

```prisma
model Activity {
  id              String        @id @default(cuid())
  leadId          String?
  userId          String

  // Activity Details
  action          ActivityAction
  description     String
  metadata        Json?         // Additional data

  // Context
  ipAddress       String?
  userAgent       String?

  // Timestamp
  createdAt       DateTime      @default(now())

  // Relations
  lead            Lead?         @relation(fields: [leadId], references: [id])
  user            User          @relation("UserActivities", fields: [userId], references: [id])

  @@index([leadId, createdAt])
  @@index([userId, createdAt])
  @@index([action, createdAt])
  @@map("activities")
}

enum ActivityAction {
  LEAD_CREATED
  LEAD_UPDATED
  STAGE_CHANGED
  PRIORITY_CHANGED
  COMMUNICATION_SENT
  OFFER_CREATED
  FEE_PLAN_CREATED
  TASK_CREATED
  TASK_COMPLETED
  NOTE_ADDED
  LEAD_ASSIGNED
  DEMO_SCHEDULED
  PAYMENT_RECEIVED
  ENROLLMENT_COMPLETED
}
```

### 1.2 Update Existing User Model

Add relation fields to existing User model (non-breaking):

```prisma
model User {
  // ... existing fields ...

  // New relations for CRM (add at end)
  assignedLeads     Lead[]        @relation("CounselorLeads")
  assignedTasks     Task[]        @relation("AssignedTasks")
  activities        Activity[]    @relation("UserActivities")

  // Add new role enum value
  // Change: role UserRole @default(STUDENT)
  // To support: COUNSELOR role
}

enum UserRole {
  STUDENT
  PARENT
  TEACHER
  ADMIN
  COUNSELOR  // NEW - Add this
}
```

### 1.3 Migration Strategy

#### Step 1: Create Migration File

```bash
npx prisma migrate dev --name add_counselor_dashboard_models --create-only
```

#### Step 2: Review Generated Migration

Check `prisma/migrations/TIMESTAMP_add_counselor_dashboard_models/migration.sql`

#### Step 3: Test Migration in Development

```bash
# Backup database first
pg_dump DATABASE_URL > backup_before_crm.sql

# Run migration
npx prisma migrate dev

# Verify tables created
psql DATABASE_URL -c "\dt"
```

#### Step 4: Seed Initial Data (Optional)

Create `prisma/seed-crm.ts`:

```typescript
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function seedCRM() {
  // Create a counselor user
  const counselor = await prisma.user.upsert({
    where: { email: 'counselor@cerebrumacademy.com' },
    update: {},
    create: {
      email: 'counselor@cerebrumacademy.com',
      name: 'Rajesh Kumar',
      role: 'COUNSELOR',
      passwordHash: '...', // Use hashed password
    },
  })

  console.log('CRM seed data created:', { counselor })
}

seedCRM()
  .catch((e) => console.error(e))
  .finally(() => prisma.$disconnect())
```

### 1.4 Indexes for Performance

All indexes are already included in the models above. Key indexes:

- **Lead searches**: `[assignedToId, stage]`, `[stage, priority]`, `[nextFollowUpAt]`
- **Communication tracking**: `[leadId, sentAt]`, `[status, sentAt]`
- **Task management**: `[assignedToId, status]`, `[dueDate, status]`
- **Payment reminders**: `[nextReminderAt]`, `[status, dueDate]`

### 1.5 Rollback Plan

If migration fails:

```bash
# Rollback to previous migration
npx prisma migrate resolve --rolled-back MIGRATION_NAME

# Restore from backup
psql DATABASE_URL < backup_before_crm.sql

# Alternative: Drop only new tables
DROP TABLE IF EXISTS activities CASCADE;
DROP TABLE IF EXISTS notes CASCADE;
DROP TABLE IF EXISTS tasks CASCADE;
DROP TABLE IF EXISTS offers CASCADE;
DROP TABLE IF EXISTS installments CASCADE;
DROP TABLE IF EXISTS fee_plans CASCADE;
DROP TABLE IF EXISTS communications CASCADE;
DROP TABLE IF EXISTS leads CASCADE;
```

### 1.6 Migration Verification Checklist

- [ ] All new tables created
- [ ] All indexes created
- [ ] Foreign keys established
- [ ] Enums defined correctly
- [ ] No existing tables modified
- [ ] Existing queries still work
- [ ] Prisma Client regenerated (`npx prisma generate`)

---

## 2. API ENDPOINT SPECIFICATIONS

### 2.1 Lead Management APIs

#### GET /api/counselor/leads

**Purpose:** Fetch leads assigned to counselor

**Query Parameters:**

```typescript
{
  stage?: LeadStage
  priority?: LeadPriority
  search?: string          // Search by name, phone, email
  page?: number            // Default: 1
  limit?: number           // Default: 20
  sortBy?: 'createdAt' | 'lastContactedAt' | 'nextFollowUpAt' | 'leadScore'
  sortOrder?: 'asc' | 'desc'
  dateFrom?: string        // ISO date
  dateTo?: string
}
```

**Response:**

```typescript
{
  success: boolean
  data: {
    leads: Array<{
      id: string
      studentName: string
      phone: string
      email?: string
      stage: LeadStage
      priority: LeadPriority
      courseInterest: string
      leadScore: number
      nextFollowUpAt?: string
      lastContactedAt?: string
      createdAt: string
      communicationsCount: number
      tasksCount: number
      unreadMessagesCount: number
    }>
    pagination: {
      total: number
      page: number
      limit: number
      totalPages: number
    }
  }
}
```

**Validation Schema (Zod):**

```typescript
import { z } from 'zod'

const getLeadsSchema = z.object({
  stage: z
    .enum([
      'NEW',
      'CONTACTED',
      'DEMO_BOOKED',
      'DEMO_DONE',
      'OFFER_SENT',
      'NEGOTIATION',
      'PAYMENT_PENDING',
      'ENROLLED',
      'COLD',
      'LOST',
    ])
    .optional(),
  priority: z.enum(['HOT', 'WARM', 'COLD']).optional(),
  search: z.string().optional(),
  page: z.coerce.number().min(1).default(1),
  limit: z.coerce.number().min(1).max(100).default(20),
  sortBy: z
    .enum(['createdAt', 'lastContactedAt', 'nextFollowUpAt', 'leadScore'])
    .default('createdAt'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
  dateFrom: z.string().datetime().optional(),
  dateTo: z.string().datetime().optional(),
})
```

**Error Handling:**

- 401: Unauthorized (not authenticated)
- 403: Forbidden (not a counselor)
- 400: Validation error
- 500: Server error

**Rate Limiting:** 100 requests per minute per user

**Implementation Skeleton:**

```typescript
// src/app/api/counselor/leads/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { requireAuth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { getLeadsSchema } from './schema'

export async function GET(request: NextRequest) {
  try {
    const session = await requireAuth(['COUNSELOR', 'ADMIN'])

    const { searchParams } = new URL(request.url)
    const params = Object.fromEntries(searchParams)

    const validated = getLeadsSchema.parse(params)

    const where = {
      assignedToId: session.user.role === 'COUNSELOR' ? session.user.id : undefined,
      ...(validated.stage && { stage: validated.stage }),
      ...(validated.priority && { priority: validated.priority }),
      ...(validated.search && {
        OR: [
          { studentName: { contains: validated.search, mode: 'insensitive' } },
          { phone: { contains: validated.search } },
          { email: { contains: validated.search, mode: 'insensitive' } },
        ],
      }),
      ...(validated.dateFrom &&
        validated.dateTo && {
          createdAt: {
            gte: new Date(validated.dateFrom),
            lte: new Date(validated.dateTo),
          },
        }),
    }

    const [leads, total] = await Promise.all([
      prisma.lead.findMany({
        where,
        include: {
          _count: {
            select: {
              communications: true,
              tasks: { where: { status: { in: ['TODO', 'IN_PROGRESS'] } } },
            },
          },
        },
        orderBy: { [validated.sortBy]: validated.sortOrder },
        skip: (validated.page - 1) * validated.limit,
        take: validated.limit,
      }),
      prisma.lead.count({ where }),
    ])

    return NextResponse.json({
      success: true,
      data: {
        leads,
        pagination: {
          total,
          page: validated.page,
          limit: validated.limit,
          totalPages: Math.ceil(total / validated.limit),
        },
      },
    })
  } catch (error) {
    // Error handling logic
  }
}
```

#### POST /api/counselor/leads

**Purpose:** Create new lead

**Request Body:**

```typescript
{
  studentName: string
  phone: string
  email?: string
  courseInterest: string
  studentClass?: StudentClass
  source?: string
  priority?: LeadPriority
  utmSource?: string
  utmMedium?: string
  utmCampaign?: string
}
```

**Validation:**

```typescript
const createLeadSchema = z.object({
  studentName: z.string().min(2).max(100),
  phone: z.string().regex(/^\+?[1-9]\d{9,14}$/),
  email: z.string().email().optional(),
  courseInterest: z.string().min(1),
  studentClass: z.enum(['CLASS_9', 'CLASS_10', 'CLASS_11', 'CLASS_12', 'DROPPER']).optional(),
  source: z.string().optional(),
  priority: z.enum(['HOT', 'WARM', 'COLD']).default('WARM'),
  utmSource: z.string().optional(),
  utmMedium: z.string().optional(),
  utmCampaign: z.string().optional(),
})
```

**Response:** 201 Created with lead object

#### GET /api/counselor/leads/[id]

**Purpose:** Get detailed lead information

**Response:**

```typescript
{
  success: boolean
  data: {
    lead: {
      ...allLeadFields
      communications: Array<Communication>
      tasks: Array<Task>
      offers: Array<Offer>
      feePlans: Array<FeePlan>
      notes: Array<Note>
      activities: Array<Activity>
    }
  }
}
```

#### PATCH /api/counselor/leads/[id]

**Purpose:** Update lead details

**Request Body:**

```typescript
{
  studentName?: string
  email?: string
  priority?: LeadPriority
  nextFollowUpAt?: string
  // ... other updatable fields
}
```

#### POST /api/counselor/leads/[id]/stage

**Purpose:** Move lead to different stage

**Request Body:**

```typescript
{
  stage: LeadStage
  reason?: string  // Why moving to this stage
}
```

**Auto-triggers:**

- Create activity log
- Generate follow-up task (if applicable)
- Send WhatsApp notification (if stage = ENROLLED)

### 2.2 Communication APIs

#### GET /api/counselor/communications

**Purpose:** Fetch all communications for counselor's leads

**Query Parameters:**

```typescript
{
  leadId?: string
  channel?: CommChannel
  dateFrom?: string
  dateTo?: string
  page?: number
  limit?: number
}
```

#### POST /api/counselor/communications

**Purpose:** Send message to lead

**Request Body:**

```typescript
{
  leadId: string
  channel: CommChannel
  type: CommType
  message: string
  templateId?: string     // For WhatsApp templates
  mediaUrl?: string       // For images/PDFs
  scheduleAt?: string     // For scheduled messages
}
```

**Validation:**

```typescript
const sendMessageSchema = z.object({
  leadId: z.string().cuid(),
  channel: z.enum(['WHATSAPP', 'EMAIL', 'PHONE_CALL', 'SMS']),
  type: z.enum([
    'FIRST_CONTACT',
    'FOLLOW_UP',
    'DEMO_CONFIRMATION',
    'DEMO_REMINDER',
    'OFFER_SENT',
    'PAYMENT_REMINDER',
    'ENROLLMENT_CONFIRMATION',
    'GENERAL_INQUIRY',
    'CUSTOM',
  ]),
  message: z.string().min(1).max(4096),
  templateId: z.string().optional(),
  mediaUrl: z.string().url().optional(),
  scheduleAt: z.string().datetime().optional(),
})
```

**Processing Flow:**

1. Validate request
2. Check lead exists and assigned to counselor
3. If channel = WHATSAPP:
   - Call Interakt API
   - Store whatsappMsgId
4. If channel = EMAIL:
   - Call Resend API
5. Create Communication record with status=SENT
6. Update lead.lastContactedAt
7. Create activity log
8. Return response immediately

**Response:**

```typescript
{
  success: boolean
  data: {
    communicationId: string
    status: 'SENT' | 'PENDING'
    sentAt: string
  }
}
```

#### GET /api/counselor/communications/[id]/status

**Purpose:** Check delivery status of message

**Response:**

```typescript
{
  success: boolean
  data: {
    status: MessageStatus
    sentAt: string
    deliveredAt?: string
    readAt?: string
  }
}
```

### 2.3 Fee Plan APIs

#### POST /api/counselor/fee-plans

**Purpose:** Create fee plan for lead

**Request Body:**

```typescript
{
  leadId: string
  planName: string
  courseId?: string
  totalFee: number
  discount: number
  installments: Array<{
    installmentNumber: number
    amount: number
    dueDate: string
  }>
}
```

**Validation:**

```typescript
const createFeePlanSchema = z
  .object({
    leadId: z.string().cuid(),
    planName: z.string().min(1).max(100),
    courseId: z.string().cuid().optional(),
    totalFee: z.number().positive(),
    discount: z.number().min(0),
    installments: z
      .array(
        z.object({
          installmentNumber: z.number().int().positive(),
          amount: z.number().positive(),
          dueDate: z.string().datetime(),
        })
      )
      .min(1)
      .max(12),
  })
  .refine(
    (data) => {
      const totalInstallments = data.installments.reduce((sum, i) => sum + i.amount, 0)
      const finalAmount = data.totalFee - data.discount
      return Math.abs(totalInstallments - finalAmount) < 0.01
    },
    {
      message: 'Installment amounts must equal (totalFee - discount)',
    }
  )
```

**Processing:**

1. Create FeePlan with status=DRAFT
2. Create all Installment records
3. Calculate nextReminderAt for each installment (7 days before due)
4. Create activity log
5. Return fee plan ID

#### GET /api/counselor/fee-plans/[id]

**Purpose:** Get fee plan details with payment status

#### PATCH /api/counselor/fee-plans/[id]

**Purpose:** Update fee plan (only if status=DRAFT)

#### POST /api/counselor/fee-plans/[id]/send

**Purpose:** Send fee plan to student via WhatsApp

**Processing:**

1. Generate fee plan PDF
2. Upload to cloud storage (S3/Cloudinary)
3. Send via WhatsApp with media URL
4. Update status to SENT
5. Create communication record

### 2.4 Offer APIs

#### POST /api/counselor/offers

**Purpose:** Create discount offer for lead

**Request Body:**

```typescript
{
  leadId: string
  offerName: string
  discountType: 'PERCENTAGE' | 'FLAT_AMOUNT'
  discountValue: number
  courseId?: string
  originalPrice: number
  validUntil: string
  autoSend?: boolean  // Send immediately via WhatsApp
}
```

**Processing:**

1. Generate unique offerCode
2. Calculate finalPrice
3. Create Offer record
4. If autoSend:
   - Generate offer card image (using Canvas API or external service)
   - Upload image
   - Send via WhatsApp
5. Create activity log

#### GET /api/counselor/offers/[id]

**Purpose:** Get offer details and usage stats

#### POST /api/counselor/offers/[id]/send

**Purpose:** Send offer via WhatsApp

**Processing:**

1. Generate offer card with:
   - Student name
   - Course details
   - Original price (strikethrough)
   - Discount amount
   - Final price (prominent)
   - Offer code
   - Validity date
   - CTA button
2. Upload image to CDN
3. Send via WhatsApp
4. Update offer.sentAt and offer.status to SENT

### 2.5 Task APIs

#### GET /api/counselor/tasks

**Purpose:** Get all tasks for counselor

**Query Parameters:**

```typescript
{
  status?: TaskStatus
  priority?: TaskPriority
  leadId?: string
  dueDateFrom?: string
  dueDateTo?: string
  page?: number
  limit?: number
}
```

#### POST /api/counselor/tasks

**Purpose:** Create manual task

**Request Body:**

```typescript
{
  leadId?: string
  title: string
  description?: string
  type: TaskType
  priority: TaskPriority
  dueDate: string
  reminderAt?: string
}
```

#### PATCH /api/counselor/tasks/[id]

**Purpose:** Update task (title, dueDate, priority)

#### POST /api/counselor/tasks/[id]/complete

**Purpose:** Mark task as completed

**Processing:**

1. Update status to COMPLETED
2. Set completedAt and completedBy
3. Create activity log
4. If type=DEMO_FOLLOW_UP and task marked complete:
   - Check if lead stage should advance
   - Generate next task (if applicable)

#### DELETE /api/counselor/tasks/[id]

**Purpose:** Delete task (or mark as CANCELLED)

### 2.6 Admin Analytics APIs

#### GET /api/admin/counselor-performance

**Purpose:** Get performance metrics for all counselors

**Query Parameters:**

```typescript
{
  counselorId?: string
  dateFrom?: string
  dateTo?: string
}
```

**Response:**

```typescript
{
  success: boolean
  data: {
    counselors: Array<{
      counselorId: string
      counselorName: string
      metrics: {
        totalLeads: number
        leadsConverted: number
        conversionRate: number
        totalRevenue: number
        avgResponseTime: number // In minutes
        tasksCompleted: number
        tasksOverdue: number
        communicationsSent: number
        demoConversionRate: number
      }
    }>
  }
}
```

#### GET /api/admin/lead-distribution

**Purpose:** See lead distribution across counselors

#### POST /api/admin/lead-assignment

**Purpose:** Assign/reassign lead to counselor

**Request Body:**

```typescript
{
  leadId: string
  counselorId: string
  reason?: string
}
```

### 2.7 WhatsApp Webhook

#### POST /api/webhooks/interakt

**Purpose:** Receive WhatsApp message delivery status and incoming messages

**Request Headers:**

```
X-Interakt-Signature: <HMAC signature>
```

**Request Body (Status Update):**

```typescript
{
  type: 'message_status',
  messageId: string,
  status: 'sent' | 'delivered' | 'read' | 'failed',
  timestamp: number
}
```

**Request Body (Incoming Message):**

```typescript
{
  type: 'message',
  from: string,          // Phone number
  messageId: string,
  message: string,
  timestamp: number,
  mediaUrl?: string
}
```

**Processing:**

1. Verify signature (HMAC-SHA256)
2. If status update:
   - Find Communication by whatsappMsgId
   - Update status and timestamps
3. If incoming message:
   - Find Lead by phone number
   - Create Communication with direction=INBOUND
   - Notify assigned counselor (real-time via WebSocket if possible)
4. Return 200 OK immediately

**Security:**

```typescript
import crypto from 'crypto'

function verifyInteraktSignature(payload: string, signature: string): boolean {
  const expectedSignature = crypto
    .createHmac('sha256', process.env.INTERAKT_WEBHOOK_SECRET!)
    .update(payload)
    .digest('hex')

  return crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expectedSignature))
}
```

---

## 3. COMPONENT ARCHITECTURE

### 3.1 Page-Level Components

#### `/counselor` - Main Dashboard

**File:** `src/app/counselor/page.tsx`

**Layout:**

```
┌─────────────────────────────────────────┐
│  Header (Name, Notifications, Logout)  │
├───────┬─────────────────────────────────┤
│       │  Overview Cards                 │
│       │  ┌────┬────┬────┬────┐         │
│ Side  │  │New │Hot │Due │Conv│         │
│ Nav   │  └────┴────┴────┴────┘         │
│       │                                 │
│ ├─ Pipeline │  Today's Tasks          │
│ ├─ Leads    │  ┌──────────────────┐   │
│ ├─ Tasks    │  │ □ Call Ram Kumar │   │
│ ├─ Comms    │  └──────────────────┘   │
│ └─ Analytics│                          │
│       │  Quick Actions                 │
│       │  [Add Lead] [Send Message]    │
└───────┴─────────────────────────────────┘
```

**Components Used:**

- `<DashboardLayout>` (wrapper)
- `<MetricCard>` (overview stats)
- `<TaskList>` (today's tasks)
- `<QuickActions>` (buttons)

#### `/counselor/leads` - Pipeline Board

**File:** `src/app/counselor/leads/page.tsx`

**Layout (Kanban):**

```
┌──────────┬──────────┬──────────┬──────────┐
│   NEW    │ CONTACTED│DEMO DONE │ ENROLLED │
├──────────┼──────────┼──────────┼──────────┤
│┌────────┐│┌────────┐│┌────────┐│┌────────┐│
││Ram K.  ││││Priya S.│││Amit P. │││Neha G. ││
││🔴 HOT  ││││🟡 WARM││││🟢 WARM│││         ││
││Class 12│││Class 11│││Dropper ││││Enrolled ││
│└────────┘│└────────┘│└────────┘│└────────┘│
│          │          │          │          │
│   Drag →  │  Drag →  │  Drag →  │          │
└──────────┴──────────┴──────────┴──────────┘
```

**Features:**

- Drag-and-drop between stages
- Color-coded priority (🔴 Hot, 🟡 Warm, 🔵 Cold)
- Click card to open lead detail modal
- Filter by priority, date range
- Search by name/phone

**Components:**

- `<LeadPipelineBoard>` (main container)
- `<PipelineColumn>` (each stage column)
- `<LeadCard>` (draggable card)
- `<LeadDetailModal>` (popup)

#### `/counselor/leads/[id]` - Lead Detail Page

**File:** `src/app/counselor/leads/[id]/page.tsx`

**Layout (3-column):**

```
┌────────────┬─────────────────────┬────────────┐
│ Lead Info  │  Timeline           │  Actions   │
├────────────┼─────────────────────┼────────────┤
│ Ram Kumar  │ Today, 2:30 PM     │ [Send Msg] │
│ 9876543210 │ • Sent offer via    │ [Call]     │
│ Class 12   │   WhatsApp          │ [Add Note] │
│ 🔴 HOT     │ ✓ Read at 2:35 PM  │ [Create    │
│            │                     │  Offer]    │
│ Stage:     │ Yesterday, 4:00 PM  │ [Fee Plan] │
│ [Dropdown] │ • Demo completed    │            │
│            │ • Rating: 5⭐       │ Tasks:     │
│ Follow-up: │                     │ □ Follow   │
│ [Date]     │ 2 days ago          │   up call  │
│            │ • Demo booked       │            │
│ Lead Score:│                     │ Notes (3)  │
│ ███████░ 75│                     │ Offers (1) │
└────────────┴─────────────────────┴────────────┘
```

**Tabs:**

- **Timeline:** All communications, activities, stage changes
- **Communications:** WhatsApp, Email, Calls history
- **Offers:** All offers sent
- **Fee Plans:** Payment plans
- **Notes:** Internal notes
- **Tasks:** Related tasks

**Components:**

- `<LeadHeader>` (top info)
- `<LeadTimeline>` (activity feed)
- `<CommunicationPanel>` (send message UI)
- `<OfferCreator>` (create offer form)
- `<FeePlanCreator>` (payment plan builder)
- `<NoteEditor>` (add/edit notes)

#### `/counselor/communications` - Message Center

**File:** `src/app/counselor/communications/page.tsx`

**Layout (Inbox style):**

```
┌───────────────┬──────────────────────────────┐
│ Conversations │  Chat Window                 │
├───────────────┼──────────────────────────────┤
│ 🟢 Ram Kumar  │ Ram Kumar - Class 12         │
│ "Thanks..."   │ ┌────────────────────────────┤
│ 2:30 PM       │ │ You: Here's the offer...  ││
│               │ │ 2:30 PM ✓✓ Read           ││
│ 🟡 Priya S.   │ │                           ││
│ "When is..."  │ │ Ram: Thanks! I'll discuss ││
│ Yesterday     │ │ with parents              ││
│               │ │ 2:35 PM                   ││
│ 🔵 Amit P.    │ └────────────────────────────┤
│ "..."         │ [Type message...] [Templates]│
│ 3 days ago    │ [📎 Attach] [Send]           │
└───────────────┴──────────────────────────────┘
```

**Features:**

- WhatsApp-like interface
- Message templates (quick replies)
- Delivery status indicators (✓ Sent, ✓✓ Delivered, ✓✓ Read)
- Search conversations
- Filter by unread, date
- Send media (images, PDFs)

**Components:**

- `<CommunicationHub>` (main container)
- `<ConversationList>` (left sidebar)
- `<ChatWindow>` (right panel)
- `<MessageBubble>` (individual message)
- `<TemplateSelector>` (dropdown)
- `<MessageComposer>` (input area)

#### `/counselor/tasks` - Task Management

**File:** `src/app/counselor/tasks/page.tsx`

**Layout (List view with filters):**

```
┌─────────────────────────────────────────────┐
│ Filters: [All][Urgent][Today][This Week]   │
├─────────────────────────────────────────────┤
│ URGENT (2)                                  │
│ ☐ 🔴 Call Ram Kumar - Payment reminder     │
│   Due: Today 5:00 PM                        │
│   Lead: Ram Kumar • Class 12                │
│                                             │
│ ☐ 🔴 Follow up - Priya Shah                │
│   Due: Today 6:00 PM                        │
│   Lead: Priya Shah • Class 11               │
│                                             │
│ TODAY (5)                                   │
│ ☐ Send fee plan - Amit Patel               │
│   Due: Today 11:59 PM                       │
│                                             │
│ OVERDUE (1) ⚠️                              │
│ ☐ Demo follow-up - Neha                    │
│   Due: Yesterday                            │
└─────────────────────────────────────────────┘
```

**Features:**

- Sort by due date, priority
- Filter by status, type, date range
- Bulk actions (complete multiple, reschedule)
- Quick complete (checkbox)
- Click to see full details

**Components:**

- `<TaskList>` (main list)
- `<TaskItem>` (individual task)
- `<TaskFilters>` (filter bar)
- `<TaskDetailModal>` (popup on click)

#### `/admin/counselor-overview` - Admin Dashboard

**File:** `src/app/admin/counselor-overview/page.tsx`

**Layout:**

```
┌─────────────────────────────────────────────┐
│ Performance Overview                        │
├───────────┬─────────────────────────────────┤
│ Counselor │ Leads │ Conv% │ Revenue │ Resp. │
├───────────┼───────┼───────┼─────────┼───────┤
│ Rajesh K. │  52   │ 28%   │ ₹4.2L   │ 1.5h  │
│ Priya S.  │  48   │ 31%   │ ₹5.1L   │ 2.1h  │
│ Amit T.   │  45   │ 25%   │ ₹3.8L   │ 3.2h  │
└───────────┴───────┴───────┴─────────┴───────┘

Lead Distribution Chart
Revenue Trend (Line chart)
Stage Funnel (Sankey diagram)
```

**Components:**

- `<PerformanceTable>` (counselor stats)
- `<LeadDistributionChart>` (pie chart)
- `<RevenueTrendChart>` (line chart)
- `<StageFunnelChart>` (funnel/sankey)

### 3.2 Feature Components

#### LeadPipelineBoard

**File:** `src/components/counselor/LeadPipelineBoard.tsx`

**Props:**

```typescript
interface LeadPipelineBoardProps {
  initialLeads: Lead[]
  onStageChange: (leadId: string, newStage: LeadStage) => Promise<void>
  onLeadClick: (leadId: string) => void
}
```

**Libraries:**

- `@dnd-kit/core` (drag and drop)
- `@dnd-kit/sortable`

**State Management:**

```typescript
const [leads, setLeads] = useState<Lead[]>(initialLeads)
const [selectedStage, setSelectedStage] = useState<LeadStage | null>(null)
const [searchQuery, setSearchQuery] = useState('')
```

**Key Features:**

- Drag lead card from one column to another
- Auto-save on drop (API call to update stage)
- Optimistic UI update (update immediately, rollback on error)
- Real-time updates (via polling or WebSocket)

#### CommunicationHub

**File:** `src/components/counselor/CommunicationHub.tsx`

**Props:**

```typescript
interface CommunicationHubProps {
  leadId?: string // Optional: focus on specific lead
  onMessageSent: (communication: Communication) => void
}
```

**State:**

```typescript
const [conversations, setConversations] = useState<Conversation[]>([])
const [selectedLeadId, setSelectedLeadId] = useState<string | null>(null)
const [messages, setMessages] = useState<Communication[]>([])
const [messageInput, setMessageInput] = useState('')
const [templates, setTemplates] = useState<MessageTemplate[]>([])
```

**Features:**

- Real-time message updates (polling every 10s or WebSocket)
- Message templates (pre-written messages)
- Media upload (images, PDFs)
- Delivery status tracking
- Emoji support
- Reply to specific message

#### FeePlanCreator

**File:** `src/components/counselor/FeePlanCreator.tsx`

**Props:**

```typescript
interface FeePlanCreatorProps {
  leadId: string
  courseId?: string
  onPlanCreated: (feePlan: FeePlan) => void
}
```

**Form Fields:**

- Plan Name (text input)
- Course (dropdown)
- Total Fee (number input with ₹ symbol)
- Discount (number input or percentage)
- Final Amount (calculated, read-only)
- Number of Installments (dropdown: 1, 2, 3, 4, 6, 12)
- Auto-generate dates (checkbox)
- Manual installment editor (table)

**Calculation Logic:**

```typescript
function calculateInstallments(totalFee: number, discount: number, count: number) {
  const finalAmount = totalFee - discount
  const perInstallment = finalAmount / count

  const installments = Array.from({ length: count }, (_, i) => ({
    installmentNumber: i + 1,
    amount: Math.round(perInstallment * 100) / 100,
    dueDate: addMonths(new Date(), i),
  }))

  // Adjust last installment for rounding differences
  const total = installments.reduce((sum, i) => sum + i.amount, 0)
  installments[count - 1].amount += finalAmount - total

  return installments
}
```

**Preview:**

- Show table of installments with dates
- Show total amount
- Show payment reminders schedule

#### OfferGenerator

**File:** `src/components/counselor/OfferGenerator.tsx`

**Props:**

```typescript
interface OfferGeneratorProps {
  leadId: string
  onOfferCreated: (offer: Offer) => void
}
```

**Form Fields:**

- Offer Name (text: "Early Bird 20%")
- Discount Type (radio: Percentage / Flat Amount)
- Discount Value (number)
- Course (dropdown)
- Original Price (number, auto-filled from course)
- Valid Until (date picker, default: 7 days from now)
- Auto Send WhatsApp (checkbox)

**Offer Card Generator:**

```typescript
async function generateOfferCard(offer: Offer, lead: Lead) {
  // Use HTML Canvas API or external service (like Cloudinary)
  const canvas = document.createElement('canvas')
  canvas.width = 800
  canvas.height = 600
  const ctx = canvas.getContext('2d')!

  // Design offer card
  ctx.fillStyle = '#8B5CF6' // Purple gradient
  ctx.fillRect(0, 0, 800, 600)

  ctx.fillStyle = 'white'
  ctx.font = 'bold 48px Arial'
  ctx.fillText(`Special Offer for ${lead.studentName}`, 50, 100)

  ctx.font = '36px Arial'
  ctx.fillText(`${offer.discountValue}% OFF`, 50, 200)

  // ... add more details

  // Convert to blob and upload
  const blob = await new Promise<Blob>((resolve) => canvas.toBlob(resolve, 'image/png'))
  const formData = new FormData()
  formData.append('file', blob, 'offer.png')

  const response = await fetch('/api/upload', { method: 'POST', body: formData })
  const { url } = await response.json()

  return url
}
```

#### TaskList

**File:** `src/components/counselor/TaskList.tsx`

**Props:**

```typescript
interface TaskListProps {
  tasks: Task[]
  onTaskComplete: (taskId: string) => void
  onTaskUpdate: (taskId: string, updates: Partial<Task>) => void
  onTaskDelete: (taskId: string) => void
}
```

**Grouping:**

- Group by: Priority (Urgent > High > Medium > Low)
- Then by: Due date (Overdue > Today > Tomorrow > This week > Later)

**Filters:**

```typescript
const [filters, setFilters] = useState({
  status: 'all' | 'TODO' | 'IN_PROGRESS' | 'COMPLETED',
  priority: 'all' | 'URGENT' | 'HIGH' | 'MEDIUM' | 'LOW',
  dateRange: 'all' | 'today' | 'this_week' | 'overdue',
})
```

### 3.3 Shared UI Components

All shared components should follow existing patterns in `src/components/ui/`:

#### Button

```typescript
// Already exists in src/components/ui/Button.tsx
<Button variant="primary" size="md" onClick={handleClick}>
  Send Message
</Button>
```

#### Card

```typescript
// src/components/ui/Card.tsx
<Card>
  <CardHeader>
    <CardTitle>Lead Details</CardTitle>
  </CardHeader>
  <CardContent>
    {/* content */}
  </CardContent>
</Card>
```

#### Modal

```typescript
// src/components/ui/Modal.tsx
<Modal open={isOpen} onClose={() => setIsOpen(false)}>
  <ModalHeader>Create Offer</ModalHeader>
  <ModalBody>
    {/* form */}
  </ModalBody>
  <ModalFooter>
    <Button variant="secondary" onClick={onClose}>Cancel</Button>
    <Button variant="primary" onClick={onSave}>Create</Button>
  </ModalFooter>
</Modal>
```

#### Select

```typescript
// src/components/ui/Select.tsx (already exists)
<Select value={stage} onValueChange={setStage}>
  <SelectTrigger>
    <SelectValue placeholder="Select stage" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="NEW">New</SelectItem>
    <SelectItem value="CONTACTED">Contacted</SelectItem>
  </SelectContent>
</Select>
```

### 3.4 State Management

**Approach:** Use React Context API for global state (no need for Redux/Zustand for this scope)

#### CounselorContext

**File:** `src/contexts/CounselorContext.tsx`

```typescript
interface CounselorContextValue {
  // Current user
  counselor: User | null

  // Leads
  leads: Lead[]
  selectedLead: Lead | null
  setSelectedLead: (lead: Lead | null) => void
  refreshLeads: () => Promise<void>

  // Tasks
  tasks: Task[]
  refreshTasks: () => Promise<void>

  // Notifications
  unreadMessagesCount: number
  dueTasks Count: number
}

export function CounselorProvider({ children }: { children: React.ReactNode }) {
  const [leads, setLeads] = useState<Lead[]>([])
  const [tasks, setTasks] = useState<Task[]>([])

  // Fetch data on mount
  useEffect(() => {
    fetchLeads()
    fetchTasks()
  }, [])

  // Poll for updates every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      fetchLeads()
      fetchTasks()
    }, 30000)

    return () => clearInterval(interval)
  }, [])

  return (
    <CounselorContext.Provider value={{ leads, tasks, ... }}>
      {children}
    </CounselorContext.Provider>
  )
}
```

**Usage:**

```typescript
function LeadsList() {
  const { leads, refreshLeads } = useCounselor()

  return (
    <div>
      {leads.map(lead => <LeadCard key={lead.id} lead={lead} />)}
    </div>
  )
}
```

---

## 4. WHATSAPP INTEGRATION TECHNICAL SPEC

### 4.1 Interakt API Setup

**Base URL:** `https://api.interakt.ai/v1/`

**Authentication:** API Key in header

```
Authorization: Bearer <INTERAKT_API_KEY>
```

**Environment Variables:**

```env
INTERAKT_API_KEY=your_api_key_here
INTERAKT_WEBHOOK_SECRET=your_webhook_secret
INTERAKT_PHONE_NUMBER_ID=your_phone_number_id
```

### 4.2 Send Message API

#### Endpoint

```
POST https://api.interakt.ai/v1/messages
```

#### Text Message

```typescript
interface SendTextMessageRequest {
  countryCode: string // "+91"
  phoneNumber: string // "9876543210"
  type: 'Text'
  message: string
  callbackData?: string // Custom data to receive in webhook
}

async function sendWhatsAppMessage(phone: string, message: string) {
  const response = await fetch('https://api.interakt.ai/v1/messages', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.INTERAKT_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      countryCode: '+91',
      phoneNumber: phone.replace(/^\+91/, ''),
      type: 'Text',
      message: message,
      callbackData: JSON.stringify({ source: 'counselor_dashboard' }),
    }),
  })

  const data = await response.json()

  if (!response.ok) {
    throw new Error(`WhatsApp API error: ${data.message}`)
  }

  return {
    messageId: data.result.messageId,
    status: data.result.status,
  }
}
```

#### Template Message

```typescript
interface SendTemplateMessageRequest {
  countryCode: string
  phoneNumber: string
  type: 'Template'
  template: {
    name: string // Template name from Interakt
    languageCode: string // "en"
    bodyValues: string[] // Variables for template
    headerValues?: string[]
  }
}

// Example: Send demo confirmation template
async function sendDemoConfirmation(
  phone: string,
  studentName: string,
  demoDate: string,
  demoTime: string
) {
  const response = await fetch('https://api.interakt.ai/v1/messages', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.INTERAKT_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      countryCode: '+91',
      phoneNumber: phone.replace(/^\+91/, ''),
      type: 'Template',
      template: {
        name: 'demo_confirmation',
        languageCode: 'en',
        bodyValues: [studentName, demoDate, demoTime],
      },
    }),
  })

  return response.json()
}
```

#### Media Message (Image)

```typescript
interface SendMediaMessageRequest {
  countryCode: string
  phoneNumber: string
  type: 'Image'
  media: {
    url: string // Public URL of image
    caption?: string
  }
}

// Example: Send offer card
async function sendOfferCard(phone: string, imageUrl: string, offerText: string) {
  const response = await fetch('https://api.interakt.ai/v1/messages', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.INTERAKT_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      countryCode: '+91',
      phoneNumber: phone.replace(/^\+91/, ''),
      type: 'Image',
      media: {
        url: imageUrl,
        caption: offerText,
      },
    }),
  })

  return response.json()
}
```

#### Document (PDF)

```typescript
interface SendDocumentRequest {
  countryCode: string
  phoneNumber: string
  type: 'Document'
  media: {
    url: string
    filename: string
  }
}

// Example: Send fee plan PDF
async function sendFeePlanPDF(phone: string, pdfUrl: string) {
  const response = await fetch('https://api.interakt.ai/v1/messages', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.INTERAKT_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      countryCode: '+91',
      phoneNumber: phone.replace(/^\+91/, ''),
      type: 'Document',
      media: {
        url: pdfUrl,
        filename: 'Fee_Plan.pdf',
      },
    }),
  })

  return response.json()
}
```

### 4.3 WhatsApp Service Layer

**File:** `src/lib/counselor/whatsapp.ts`

```typescript
export class InteraktWhatsAppService {
  private apiKey: string
  private baseUrl: string

  constructor() {
    this.apiKey = process.env.INTERAKT_API_KEY!
    this.baseUrl = 'https://api.interakt.ai/v1'
  }

  async sendText(phone: string, message: string, metadata?: any): Promise<string> {
    const response = await fetch(`${this.baseUrl}/messages`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        countryCode: '+91',
        phoneNumber: phone.replace(/^\+91/, ''),
        type: 'Text',
        message,
        callbackData: JSON.stringify(metadata || {}),
      }),
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(`WhatsApp send failed: ${error.message}`)
    }

    const data = await response.json()
    return data.result.messageId
  }

  async sendTemplate(phone: string, templateName: string, bodyValues: string[]): Promise<string> {
    // Similar implementation
  }

  async sendImage(phone: string, imageUrl: string, caption?: string): Promise<string> {
    // Similar implementation
  }

  async sendDocument(phone: string, documentUrl: string, filename: string): Promise<string> {
    // Similar implementation
  }

  async getMessageStatus(messageId: string): Promise<MessageStatus> {
    const response = await fetch(`${this.baseUrl}/messages/${messageId}`, {
      headers: {
        Authorization: `Bearer ${this.apiKey}`,
      },
    })

    const data = await response.json()
    return data.status
  }
}

export const whatsappService = new InteraktWhatsAppService()
```

### 4.4 Message Templates

Create templates in Interakt dashboard, then use them in code:

**Template 1: Demo Confirmation**

```
Name: demo_confirmation
Content: Hi {{1}}, your NEET Biology demo class is confirmed for {{2}} at {{3}}. Join link will be sent 30 minutes before class. Get ready with your biology doubts! 📚
```

**Template 2: Offer Alert**

```
Name: special_offer
Content: 🎉 Great news {{1}}! Special offer just for you: {{2}}% discount on {{3}} course. Valid till {{4}}. Reply YES to claim this offer!
```

**Template 3: Payment Reminder**

```
Name: payment_reminder
Content: Hi {{1}}, this is a friendly reminder that your installment of ₹{{2}} is due on {{3}}. Pay now to continue your NEET preparation smoothly: {{4}}
```

### 4.5 Webhook Handler

**File:** `src/app/api/webhooks/interakt/route.ts`

```typescript
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import crypto from 'crypto'

export async function POST(request: NextRequest) {
  try {
    const signature = request.headers.get('x-interakt-signature')
    const body = await request.text()

    // Verify signature
    if (!verifySignature(body, signature)) {
      return NextResponse.json({ error: 'Invalid signature' }, { status: 401 })
    }

    const event = JSON.parse(body)

    // Handle different event types
    if (event.type === 'message_status') {
      await handleStatusUpdate(event)
    } else if (event.type === 'message') {
      await handleIncomingMessage(event)
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Webhook error:', error)
    return NextResponse.json({ error: 'Webhook processing failed' }, { status: 500 })
  }
}

function verifySignature(payload: string, signature: string | null): boolean {
  if (!signature) return false

  const expectedSignature = crypto
    .createHmac('sha256', process.env.INTERAKT_WEBHOOK_SECRET!)
    .update(payload)
    .digest('hex')

  return crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expectedSignature))
}

async function handleStatusUpdate(event: any) {
  const { messageId, status, timestamp } = event

  await prisma.communication.updateMany({
    where: { whatsappMsgId: messageId },
    data: {
      status: mapInteraktStatusToOurStatus(status),
      ...(status === 'delivered' && { deliveredAt: new Date(timestamp * 1000) }),
      ...(status === 'read' && { readAt: new Date(timestamp * 1000) }),
    },
  })
}

async function handleIncomingMessage(event: any) {
  const { from, message, messageId, timestamp } = event

  // Find lead by phone number
  const lead = await prisma.lead.findFirst({
    where: { phone: { contains: from } },
  })

  if (lead) {
    // Create communication record
    await prisma.communication.create({
      data: {
        leadId: lead.id,
        type: 'GENERAL_INQUIRY',
        direction: 'INBOUND',
        channel: 'WHATSAPP',
        message: message,
        status: 'DELIVERED',
        whatsappMsgId: messageId,
        sentAt: new Date(timestamp * 1000),
        sentBy: 'system',
      },
    })

    // Update lead last contacted
    await prisma.lead.update({
      where: { id: lead.id },
      data: { lastContactedAt: new Date() },
    })

    // TODO: Notify assigned counselor via real-time channel
  }
}

function mapInteraktStatusToOurStatus(interaktStatus: string): string {
  const map: Record<string, string> = {
    sent: 'SENT',
    delivered: 'DELIVERED',
    read: 'READ',
    failed: 'FAILED',
  }
  return map[interaktStatus] || 'PENDING'
}
```

### 4.6 Rate Limiting & Error Handling

**Rate Limits (Interakt):**

- 100 messages per second
- 10,000 messages per hour

**Retry Logic:**

```typescript
async function sendWithRetry(sendFn: () => Promise<any>, maxRetries = 3): Promise<any> {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await sendFn()
    } catch (error: any) {
      if (attempt === maxRetries) throw error

      // Exponential backoff
      const delay = Math.pow(2, attempt) * 1000
      await new Promise((resolve) => setTimeout(resolve, delay))
    }
  }
}

// Usage
const messageId = await sendWithRetry(() => whatsappService.sendText(phone, message))
```

**Error Handling:**

```typescript
try {
  const messageId = await whatsappService.sendText(phone, message)

  await prisma.communication.create({
    data: {
      leadId: lead.id,
      message,
      status: 'SENT',
      whatsappMsgId: messageId,
    },
  })
} catch (error: any) {
  console.error('WhatsApp send failed:', error)

  // Log failure
  await prisma.communication.create({
    data: {
      leadId: lead.id,
      message,
      status: 'FAILED',
      error: error.message,
    },
  })

  // Notify counselor
  // TODO: Show error toast in UI
}
```

---

## 5. PAYMENT REMINDER AUTOMATION

### 5.1 Architecture

**Approach:** Serverless cron job using Vercel Cron Jobs

**File:** `src/app/api/cron/payment-reminders/route.ts`

**Vercel Configuration:**

```json
// vercel.json
{
  "crons": [
    {
      "path": "/api/cron/payment-reminders",
      "schedule": "0 9 * * *"
    }
  ]
}
```

### 5.2 Reminder Logic

**Schedule:**

- 7 days before due date → First reminder
- 3 days before due date → Second reminder
- 1 day before due date → Third reminder
- On due date → Final reminder
- 3 days after due date → Overdue notice

**Implementation:**

```typescript
// src/app/api/cron/payment-reminders/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { whatsappService } from '@/lib/counselor/whatsapp'
import { addDays, isToday, isPast } from 'date-fns'

export async function GET(request: NextRequest) {
  // Verify cron secret (security)
  const authHeader = request.headers.get('authorization')
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const results = await processPaymentReminders()
    return NextResponse.json({ success: true, ...results })
  } catch (error) {
    console.error('Payment reminders cron failed:', error)
    return NextResponse.json({ error: 'Cron job failed' }, { status: 500 })
  }
}

async function processPaymentReminders() {
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  // Find all pending/due installments that need reminders
  const installments = await prisma.installment.findMany({
    where: {
      status: { in: ['PENDING', 'DUE', 'OVERDUE'] },
      OR: [
        // Next reminder is today or past
        { nextReminderAt: { lte: today } },
        // No next reminder set (first time)
        { nextReminderAt: null },
      ],
    },
    include: {
      feePlan: {
        include: {
          lead: true,
        },
      },
    },
  })

  const results = {
    processed: 0,
    sent: 0,
    failed: 0,
    skipped: 0,
  }

  for (const installment of installments) {
    results.processed++

    const daysUntilDue = Math.ceil(
      (installment.dueDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
    )

    // Determine reminder type
    let reminderType: string
    if (daysUntilDue === 7) {
      reminderType = '7_days_before'
    } else if (daysUntilDue === 3) {
      reminderType = '3_days_before'
    } else if (daysUntilDue === 1) {
      reminderType = '1_day_before'
    } else if (daysUntilDue === 0) {
      reminderType = 'due_today'
    } else if (daysUntilDue < 0) {
      reminderType = 'overdue'
    } else {
      // Not a reminder day, skip
      results.skipped++
      continue
    }

    // Send reminder
    try {
      const lead = installment.feePlan.lead

      const message = generateReminderMessage(
        lead.studentName,
        installment.amount,
        installment.dueDate,
        reminderType
      )

      const messageId = await whatsappService.sendText(lead.phone, message)

      // Update installment
      await prisma.installment.update({
        where: { id: installment.id },
        data: {
          remindersSent: installment.remindersSent + 1,
          lastReminderAt: new Date(),
          nextReminderAt: calculateNextReminderDate(installment.dueDate, reminderType),
        },
      })

      // Create communication record
      await prisma.communication.create({
        data: {
          leadId: lead.id,
          type: 'PAYMENT_REMINDER',
          direction: 'OUTBOUND',
          channel: 'WHATSAPP',
          message,
          status: 'SENT',
          whatsappMsgId: messageId,
          sentBy: 'system',
        },
      })

      // Create task for counselor if overdue
      if (reminderType === 'overdue') {
        await prisma.task.create({
          data: {
            leadId: lead.id,
            assignedToId: lead.assignedToId,
            title: `Follow up: Overdue payment - ${lead.studentName}`,
            description: `Installment #${installment.installmentNumber} of ₹${installment.amount} is overdue by ${Math.abs(daysUntilDue)} days`,
            type: 'PAYMENT_REMINDER',
            priority: 'URGENT',
            dueDate: new Date(),
            isAutoGenerated: true,
            triggerType: 'payment_overdue',
          },
        })
      }

      results.sent++
    } catch (error) {
      console.error(`Failed to send reminder for installment ${installment.id}:`, error)
      results.failed++
    }
  }

  return results
}

function generateReminderMessage(
  studentName: string,
  amount: number,
  dueDate: Date,
  reminderType: string
): string {
  const formattedAmount = `₹${amount.toLocaleString('en-IN')}`
  const formattedDate = dueDate.toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })

  const messages: Record<string, string> = {
    '7_days_before': `📅 Payment Reminder - Cerebrum Biology Academy

Hi ${studentName}! This is a friendly reminder that your next installment of ${formattedAmount} is due on ${formattedDate} (7 days from now).

💳 Pay early: cerebrumbiologyacademy.com/payments
📞 Need help? Call: +91 93119 46297

Keep your NEET prep on track! 🎯`,

    '3_days_before': `⏰ Payment Due Soon - Cerebrum Biology Academy

Hi ${studentName}! Your installment of ${formattedAmount} is due in 3 days (${formattedDate}).

💳 Pay now: cerebrumbiologyacademy.com/payments
📞 Questions? Call: +91 93119 46297

Don't miss your classes! 🩺`,

    '1_day_before': `🚨 Payment Due Tomorrow - Cerebrum Biology Academy

Hi ${studentName}! Reminder: Your installment of ${formattedAmount} is due tomorrow (${formattedDate}).

💳 Pay today: cerebrumbiologyacademy.com/payments
📞 Urgent help? Call: +91 93119 46297

Keep learning without interruption! 📚`,

    due_today: `📌 Payment Due Today - Cerebrum Biology Academy

Hi ${studentName}! Your installment of ${formattedAmount} is due TODAY (${formattedDate}).

💳 Pay immediately: cerebrumbiologyacademy.com/payments
📞 Call now: +91 93119 46297

Complete payment to continue your NEET preparation! ⚡`,

    overdue: `⚠️ Overdue Payment - Cerebrum Biology Academy

Hi ${studentName}, your installment of ${formattedAmount} was due on ${formattedDate} and is now overdue.

Your access to study materials may be suspended if payment is not received soon.

💳 Pay now: cerebrumbiologyacademy.com/payments
📞 Call immediately: +91 93119 46297

We're here to help! Let us know if you're facing any issues. 🤝`,
  }

  return messages[reminderType]
}

function calculateNextReminderDate(dueDate: Date, currentReminderType: string): Date | null {
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const daysUntilDue = Math.ceil((dueDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))

  // Schedule next reminder based on current type
  if (currentReminderType === '7_days_before' && daysUntilDue > 3) {
    return addDays(dueDate, -3) // Next: 3 days before
  } else if (currentReminderType === '3_days_before' && daysUntilDue > 1) {
    return addDays(dueDate, -1) // Next: 1 day before
  } else if (currentReminderType === '1_day_before' && daysUntilDue > 0) {
    return dueDate // Next: due date
  } else if (currentReminderType === 'due_today') {
    return addDays(dueDate, 3) // Next: overdue reminder
  } else if (currentReminderType === 'overdue') {
    // For overdue, send reminder every 3 days
    return addDays(today, 3)
  }

  return null // No more reminders
}
```

### 5.3 Manual Trigger (for testing)

**File:** `src/app/api/counselor/installments/[id]/remind/route.ts`

```typescript
import { NextRequest, NextResponse } from 'next/server'
import { requireAuth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { whatsappService } from '@/lib/counselor/whatsapp'

export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    await requireAuth(['COUNSELOR', 'ADMIN'])

    const installment = await prisma.installment.findUnique({
      where: { id: params.id },
      include: {
        feePlan: {
          include: { lead: true },
        },
      },
    })

    if (!installment) {
      return NextResponse.json({ error: 'Installment not found' }, { status: 404 })
    }

    // Send immediate reminder
    const lead = installment.feePlan.lead
    const message = `Payment reminder for ${lead.studentName}...`

    await whatsappService.sendText(lead.phone, message)

    return NextResponse.json({ success: true, message: 'Reminder sent' })
  } catch (error) {
    console.error('Manual reminder failed:', error)
    return NextResponse.json({ error: 'Failed to send reminder' }, { status: 500 })
  }
}
```

### 5.4 Payment Confirmation Webhook

**File:** `src/app/api/webhooks/razorpay/route.ts`

```typescript
export async function POST(request: NextRequest) {
  // Verify Razorpay signature
  // ...

  const { event, payload } = await request.json()

  if (event === 'payment.captured') {
    const paymentId = payload.payment.entity.id
    const orderId = payload.payment.entity.order_id
    const amount = payload.payment.entity.amount / 100 // Convert paise to rupees

    // Find installment by orderId
    const installment = await prisma.installment.findFirst({
      where: { paymentId: orderId },
      include: { feePlan: { include: { lead: true } } },
    })

    if (installment) {
      // Update installment status
      await prisma.installment.update({
        where: { id: installment.id },
        data: {
          status: 'PAID',
          paidAmount: amount,
          paidAt: new Date(),
        },
      })

      // Send confirmation WhatsApp
      const lead = installment.feePlan.lead
      const message = `✅ Payment Received - Cerebrum Biology Academy

Hi ${lead.studentName}! We've received your payment of ₹${amount.toLocaleString('en-IN')}.

📄 Receipt: cerebrumbiologyacademy.com/receipt/${paymentId}
📚 Continue learning: cerebrumbiologyacademy.com/student

Thank you for your trust! 🙏`

      await whatsappService.sendText(lead.phone, message)

      // Create activity log
      await prisma.activity.create({
        data: {
          leadId: lead.id,
          userId: lead.assignedToId,
          action: 'PAYMENT_RECEIVED',
          description: `Payment of ₹${amount} received for installment #${installment.installmentNumber}`,
        },
      })
    }
  }

  return NextResponse.json({ success: true })
}
```

---

## 6. TASK AUTO-GENERATION LOGIC

### 6.1 Trigger Points

**File:** `src/lib/counselor/task-generator.ts`

```typescript
interface TaskGenerationRule {
  triggerEvent: string
  taskTemplate: {
    type: TaskType
    title: string
    description: string
    priority: TaskPriority
    dueInHours: number
  }
}

const TASK_RULES: TaskGenerationRule[] = [
  // Demo completed → Follow up within 2 hours
  {
    triggerEvent: 'demo_completed',
    taskTemplate: {
      type: 'DEMO_FOLLOW_UP',
      title: 'Follow up after demo - {studentName}',
      description: 'Call student to get feedback on demo class and discuss enrollment',
      priority: 'HIGH',
      dueInHours: 2,
    },
  },

  // Offer sent → Reminder after 2 days
  {
    triggerEvent: 'offer_sent',
    taskTemplate: {
      type: 'FOLLOW_UP',
      title: 'Check offer status - {studentName}',
      description: 'Check if student viewed the offer and answer any questions',
      priority: 'MEDIUM',
      dueInHours: 48,
    },
  },

  // Lead created → First contact within 1 hour
  {
    triggerEvent: 'lead_created',
    taskTemplate: {
      type: 'CALL',
      title: 'First contact - {studentName}',
      description: 'Make first call to introduce Cerebrum and understand student needs',
      priority: 'HIGH',
      dueInHours: 1,
    },
  },

  // Payment overdue → Urgent follow up
  {
    triggerEvent: 'payment_overdue',
    taskTemplate: {
      type: 'PAYMENT_REMINDER',
      title: 'Urgent: Overdue payment - {studentName}',
      description: 'Payment is overdue. Call immediately to understand issue and help resolve',
      priority: 'URGENT',
      dueInHours: 0,
    },
  },

  // No response in 7 days → Re-engagement
  {
    triggerEvent: 'lead_inactive',
    taskTemplate: {
      type: 'FOLLOW_UP',
      title: 'Re-engage cold lead - {studentName}',
      description: 'No response in 7 days. Send special offer or new information to re-engage',
      priority: 'LOW',
      dueInHours: 24,
    },
  },

  // Fee plan sent → Follow up after 1 day
  {
    triggerEvent: 'fee_plan_sent',
    taskTemplate: {
      type: 'FOLLOW_UP',
      title: 'Discuss fee plan - {studentName}',
      description: 'Check if student reviewed the fee plan and address any concerns',
      priority: 'MEDIUM',
      dueInHours: 24,
    },
  },
]

export async function generateTask(
  triggerEvent: string,
  leadId: string,
  assignedToId: string,
  variables: Record<string, string> = {}
) {
  const rule = TASK_RULES.find((r) => r.triggerEvent === triggerEvent)

  if (!rule) {
    console.warn(`No task rule found for event: ${triggerEvent}`)
    return null
  }

  const lead = await prisma.lead.findUnique({
    where: { id: leadId },
    select: { studentName: true },
  })

  if (!lead) return null

  // Replace variables in template
  const title = rule.taskTemplate.title.replace('{studentName}', lead.studentName)
  const description = rule.taskTemplate.description.replace('{studentName}', lead.studentName)

  // Calculate due date
  const dueDate = new Date()
  dueDate.setHours(dueDate.getHours() + rule.taskTemplate.dueInHours)

  // Create task
  const task = await prisma.task.create({
    data: {
      leadId,
      assignedToId,
      title,
      description,
      type: rule.taskTemplate.type,
      priority: rule.taskTemplate.priority,
      dueDate,
      isAutoGenerated: true,
      triggerType: triggerEvent,
    },
  })

  return task
}
```

### 6.2 Integration with Stage Changes

**File:** `src/app/api/counselor/leads/[id]/stage/route.ts`

```typescript
export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  const session = await requireAuth(['COUNSELOR', 'ADMIN'])
  const { stage } = await request.json()

  // Update lead stage
  const lead = await prisma.lead.update({
    where: { id: params.id },
    data: { stage },
  })

  // Trigger task generation based on new stage
  const eventMap: Record<string, string> = {
    DEMO_DONE: 'demo_completed',
    OFFER_SENT: 'offer_sent',
    PAYMENT_PENDING: 'fee_plan_sent',
  }

  const triggerEvent = eventMap[stage]
  if (triggerEvent) {
    await generateTask(triggerEvent, lead.id, lead.assignedToId)
  }

  return NextResponse.json({ success: true, data: lead })
}
```

### 6.3 Automatic Lead Inactivity Detection

**Cron Job:** `src/app/api/cron/inactive-leads/route.ts`

```typescript
export async function GET(request: NextRequest) {
  // Run daily at 10 AM

  const sevenDaysAgo = new Date()
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)

  // Find leads with no activity in 7 days
  const inactiveLeads = await prisma.lead.findMany({
    where: {
      stage: { notIn: ['ENROLLED', 'LOST'] },
      lastContactedAt: { lt: sevenDaysAgo },
      tasks: {
        none: {
          triggerType: 'lead_inactive',
          createdAt: { gte: sevenDaysAgo },
        },
      },
    },
  })

  for (const lead of inactiveLeads) {
    await generateTask('lead_inactive', lead.id, lead.assignedToId)

    // Also update priority to COLD
    await prisma.lead.update({
      where: { id: lead.id },
      data: { priority: 'COLD' },
    })
  }

  return NextResponse.json({
    success: true,
    tasksGenerated: inactiveLeads.length,
  })
}
```

---

## 7. TESTING STRATEGY

### 7.1 Unit Tests

**Priority Tests:**

1. **Database Queries**
   - Test Prisma queries with mock data
   - Ensure indexes are being used
   - Test complex joins and aggregations

2. **Business Logic**
   - Fee plan calculation accuracy
   - Lead scoring algorithm
   - Task generation rules
   - Reminder scheduling logic

**Example Test:**

```typescript
// __tests__/lib/fee-plan-calculator.test.ts
import { describe, it, expect } from '@jest/globals'
import { calculateInstallments } from '@/lib/counselor/fee-plan'

describe('Fee Plan Calculator', () => {
  it('should divide total fee equally into installments', () => {
    const result = calculateInstallments(100000, 10000, 4)

    expect(result).toHaveLength(4)
    expect(result[0].amount).toBe(22500)
    expect(result[1].amount).toBe(22500)
    expect(result[2].amount).toBe(22500)
    expect(result[3].amount).toBe(22500)

    const total = result.reduce((sum, i) => sum + i.amount, 0)
    expect(total).toBe(90000) // 100000 - 10000 discount
  })

  it('should handle rounding differences in last installment', () => {
    const result = calculateInstallments(100000, 0, 3)

    const total = result.reduce((sum, i) => sum + i.amount, 0)
    expect(total).toBe(100000)
  })
})
```

### 7.2 API Endpoint Testing

**Manual Testing Checklist:**

**Lead APIs:**

- [ ] Create lead with valid data
- [ ] Create lead with missing required fields (should fail)
- [ ] Get leads with filters (stage, priority, search)
- [ ] Update lead details
- [ ] Move lead to different stage
- [ ] Verify activity log created on stage change

**Communication APIs:**

- [ ] Send WhatsApp message to lead
- [ ] Send message with invalid phone (should fail)
- [ ] Check message status after sending
- [ ] Verify communication record created in database
- [ ] Send message with media (image/PDF)

**Fee Plan APIs:**

- [ ] Create fee plan with 1 installment
- [ ] Create fee plan with 4 installments
- [ ] Verify installment dates auto-generated
- [ ] Send fee plan to lead via WhatsApp
- [ ] Update fee plan (should only work if status=DRAFT)

**Offer APIs:**

- [ ] Create percentage discount offer
- [ ] Create flat amount discount offer
- [ ] Generate offer card image
- [ ] Send offer via WhatsApp
- [ ] Verify offer expiry check

**Task APIs:**

- [ ] Create manual task
- [ ] Get tasks filtered by status, priority
- [ ] Mark task as completed
- [ ] Auto-generate task on demo completion
- [ ] Auto-generate task on lead inactivity

**Admin APIs:**

- [ ] Get counselor performance metrics
- [ ] Get lead distribution stats
- [ ] Assign lead to different counselor

### 7.3 Database Migration Testing

**Pre-migration Checklist:**

- [ ] Backup production database
- [ ] Test migration on copy of production data
- [ ] Verify existing queries still work
- [ ] Check migration rollback works

**Post-migration Verification:**

```sql
-- Verify all tables created
SELECT table_name FROM information_schema.tables
WHERE table_schema = 'public' AND table_name LIKE '%leads%';

-- Verify indexes created
SELECT indexname, indexdef FROM pg_indexes
WHERE tablename = 'leads';

-- Verify foreign keys
SELECT constraint_name, table_name, constraint_type
FROM information_schema.table_constraints
WHERE constraint_schema = 'public';

-- Test sample query
SELECT l.*, COUNT(c.id) as comm_count
FROM leads l
LEFT JOIN communications c ON c."leadId" = l.id
GROUP BY l.id
LIMIT 10;
```

### 7.4 WhatsApp Integration Testing

**Test Cases:**

1. **Send Text Message**
   - [ ] Send message to valid Indian number
   - [ ] Send message to invalid number (should fail gracefully)
   - [ ] Verify message appears in Communication table
   - [ ] Check messageId stored correctly

2. **Send Template Message**
   - [ ] Send demo confirmation template
   - [ ] Send offer template
   - [ ] Verify variables replaced correctly

3. **Send Media**
   - [ ] Send image (offer card)
   - [ ] Send PDF (fee plan)
   - [ ] Verify URL is publicly accessible
   - [ ] Check file size < 5MB (WhatsApp limit)

4. **Webhook Processing**
   - [ ] Send test webhook for message delivery
   - [ ] Verify Communication status updated
   - [ ] Send test webhook for incoming message
   - [ ] Verify new Communication record created
   - [ ] Test webhook signature verification

**Mock Interakt API:**

```typescript
// __tests__/mocks/interakt-mock.ts
export function mockInteraktAPI() {
  return {
    sendMessage: jest.fn().mockResolvedValue({
      result: {
        messageId: 'mock_msg_123',
        status: 'sent',
      },
    }),

    getMessageStatus: jest.fn().mockResolvedValue({
      status: 'delivered',
      timestamp: Date.now(),
    }),
  }
}
```

### 7.5 User Flow Testing

**Counselor Workflow:**

**Scenario 1: New Lead → Enrollment**

1. [ ] Create new lead from website inquiry
2. [ ] Verify lead appears in "NEW" column
3. [ ] Verify auto-generated "First contact" task created
4. [ ] Send WhatsApp message to lead
5. [ ] Move lead to "CONTACTED" stage
6. [ ] Create demo booking
7. [ ] Move lead to "DEMO_BOOKED" stage
8. [ ] Complete demo (mark task as done)
9. [ ] Move lead to "DEMO_DONE" stage
10. [ ] Verify auto-generated "Follow up" task created
11. [ ] Create discount offer
12. [ ] Send offer via WhatsApp
13. [ ] Move lead to "OFFER_SENT" stage
14. [ ] Create fee plan
15. [ ] Send fee plan via WhatsApp
16. [ ] Move lead to "PAYMENT_PENDING" stage
17. [ ] Simulate payment received
18. [ ] Move lead to "ENROLLED" stage
19. [ ] Verify enrollment confirmation sent

**Scenario 2: Cold Lead Recovery**

1. [ ] Create lead
2. [ ] Don't contact for 7 days
3. [ ] Verify cron job creates "Re-engage" task
4. [ ] Verify lead priority changed to COLD
5. [ ] Send special offer
6. [ ] If no response in 3 days, move to LOST

### 7.6 Performance Testing

**Database Query Performance:**

```typescript
// Test lead list query with 1000+ leads
const start = Date.now()
const leads = await prisma.lead.findMany({
  where: { assignedToId: counselorId },
  include: {
    _count: {
      select: { communications: true, tasks: true },
    },
  },
  take: 20,
})
const duration = Date.now() - start

expect(duration).toBeLessThan(500) // Should complete in < 500ms
```

**Load Testing:**

- Use Apache Bench or Artillery
- Simulate 50 concurrent counselors
- 100 requests per minute per counselor
- Measure response times, error rates

```bash
# Example Artillery test
artillery quick --count 50 --num 100 https://your-app.vercel.app/api/counselor/leads
```

### 7.7 Manual Testing Checklist (Before Launch)

**Day 6 Testing:**

- [ ] Create 10 sample leads with different stages
- [ ] Test drag-and-drop on pipeline board
- [ ] Send 10 WhatsApp messages
- [ ] Create 5 offers with images
- [ ] Create 5 fee plans with different installment counts
- [ ] Test all filters and search
- [ ] Test on mobile (iOS Safari, Android Chrome)
- [ ] Test with slow 3G connection
- [ ] Verify email confirmations sent
- [ ] Test admin dashboard metrics
- [ ] Verify cron jobs running (check logs)
- [ ] Test webhook processing (send test events)
- [ ] Check database indexes used (EXPLAIN ANALYZE)
- [ ] Verify no console errors in browser
- [ ] Test with real phone numbers (small batch)

---

## 8. DAY-BY-DAY DEVELOPMENT SCHEDULE

### Day 1: Foundation (Database + Auth)

**Morning (4 hours):**

- [ ] Create new Git branch: `feature/counselor-dashboard`
- [ ] Update Prisma schema with all new models
- [ ] Review schema for any issues
- [ ] Create migration: `npx prisma migrate dev --name add_counselor_crm`
- [ ] Verify migration in development database
- [ ] Test rollback procedure
- [ ] Regenerate Prisma Client: `npx prisma generate`
- [ ] Create seed data for testing (10 sample leads)

**Afternoon (4 hours):**

- [ ] Add COUNSELOR role to User enum
- [ ] Create counselor test user in database
- [ ] Test authentication with counselor role
- [ ] Update RBAC middleware to support counselor role
- [ ] Create `/counselor` route layout component
- [ ] Add sidebar navigation
- [ ] Test authentication flow (login → redirect to /counselor)

**Deliverable:** Working database schema + counselor authentication

---

### Day 2: Lead APIs + Basic UI

**Morning (4 hours):**

- [ ] Create `/api/counselor/leads` route (GET, POST)
- [ ] Implement Zod validation schemas
- [ ] Add pagination and filtering logic
- [ ] Create `/api/counselor/leads/[id]` route (GET, PATCH)
- [ ] Create `/api/counselor/leads/[id]/stage` route (POST)
- [ ] Test all APIs with Postman/Thunder Client
- [ ] Verify database queries use indexes (check logs)

**Afternoon (4 hours):**

- [ ] Create `LeadPipelineBoard` component
- [ ] Implement 7 stage columns (NEW → ENROLLED)
- [ ] Create `LeadCard` component with priority colors
- [ ] Add drag-and-drop functionality (`@dnd-kit`)
- [ ] Connect API to update stage on drop
- [ ] Add loading states and error handling
- [ ] Test on mobile (responsive design)

**Deliverable:** Working lead pipeline board with drag-and-drop

---

### Day 3: WhatsApp Integration + Communication

**Morning (4 hours):**

- [ ] Set up Interakt account and get API keys
- [ ] Add environment variables (INTERAKT_API_KEY, etc.)
- [ ] Create WhatsApp service layer (`src/lib/counselor/whatsapp.ts`)
- [ ] Implement `sendText`, `sendImage`, `sendDocument` methods
- [ ] Test sending messages to real phone numbers
- [ ] Create `/api/counselor/communications` routes (GET, POST)
- [ ] Implement webhook handler: `/api/webhooks/interakt`
- [ ] Test webhook with Interakt test events

**Afternoon (4 hours):**

- [ ] Create `CommunicationHub` component (inbox style)
- [ ] Create `ConversationList` (left sidebar)
- [ ] Create `ChatWindow` (right panel)
- [ ] Create `MessageBubble` component
- [ ] Add message input with send button
- [ ] Implement message templates dropdown
- [ ] Add media upload functionality
- [ ] Test sending messages from UI
- [ ] Verify delivery status updates

**Deliverable:** Working WhatsApp integration with UI

---

### Day 4: Fee Plans + Offers

**Morning (4 hours):**

- [ ] Create `/api/counselor/fee-plans` routes (GET, POST)
- [ ] Create `/api/counselor/fee-plans/[id]` routes (GET, PATCH)
- [ ] Implement installment calculation logic
- [ ] Create `FeePlanCreator` component
- [ ] Add installment table with auto-calculation
- [ ] Test creating plans with 1, 2, 4, 6, 12 installments
- [ ] Generate fee plan PDF (use library or HTML → PDF)
- [ ] Implement send via WhatsApp functionality

**Afternoon (4 hours):**

- [ ] Create `/api/counselor/offers` routes (GET, POST)
- [ ] Implement offer code generation (unique)
- [ ] Create `OfferGenerator` component
- [ ] Implement offer card image generation (Canvas API or Cloudinary)
- [ ] Add preview of offer card
- [ ] Test sending offer via WhatsApp
- [ ] Verify offer expiry logic
- [ ] Create `/api/counselor/offers/[id]/send` route

**Deliverable:** Fee plans and offers fully functional

---

### Day 5: Tasks + Activity Log

**Morning (4 hours):**

- [ ] Create `/api/counselor/tasks` routes (GET, POST)
- [ ] Create `/api/counselor/tasks/[id]` routes (PATCH, DELETE)
- [ ] Create `/api/counselor/tasks/[id]/complete` route
- [ ] Implement task auto-generation logic
- [ ] Create triggers for demo_completed, offer_sent, etc.
- [ ] Test task generation on stage changes
- [ ] Create `TaskList` component
- [ ] Add filters (status, priority, date range)

**Afternoon (4 hours):**

- [ ] Create `LeadDetailPage` component
- [ ] Add tabbed interface (Timeline, Communications, Offers, etc.)
- [ ] Create `LeadTimeline` component (activity feed)
- [ ] Display all activities in chronological order
- [ ] Add icons for different activity types
- [ ] Implement `NoteEditor` for adding notes
- [ ] Test lead detail page with sample data
- [ ] Add quick actions sidebar

**Deliverable:** Task management + detailed lead view

---

### Day 6: Admin Dashboard + Automation

**Morning (4 hours):**

- [ ] Create `/api/admin/counselor-performance` route
- [ ] Implement metrics calculation (conversion rate, revenue, etc.)
- [ ] Create `/api/admin/lead-distribution` route
- [ ] Create `AdminDashboardPage` component
- [ ] Add performance table with sorting
- [ ] Create charts (revenue trend, lead distribution)
- [ ] Test with multiple counselors
- [ ] Add date range filter

**Afternoon (4 hours):**

- [ ] Create payment reminder cron job: `/api/cron/payment-reminders`
- [ ] Add to vercel.json cron configuration
- [ ] Test cron job manually (call endpoint directly)
- [ ] Create inactive leads cron job: `/api/cron/inactive-leads`
- [ ] Implement payment webhook handler (Razorpay)
- [ ] Test full payment flow (create plan → pay → confirm)
- [ ] Verify WhatsApp confirmations sent
- [ ] Test all auto-generated tasks

**Deliverable:** Admin dashboard + automated reminders

---

### Day 7: Testing + Polish + Deployment

**Morning (4 hours):**

- [ ] Run full manual testing checklist (see Section 7.7)
- [ ] Create 20 test leads with different scenarios
- [ ] Test all user flows (new lead → enrollment)
- [ ] Test error handling (network failures, API errors)
- [ ] Verify mobile responsiveness on real devices
- [ ] Check loading states and empty states
- [ ] Test with slow network (throttle in DevTools)
- [ ] Fix critical bugs found

**Afternoon (4 hours):**

- [ ] UI polish: colors, spacing, typography
- [ ] Add success/error toast notifications
- [ ] Implement optimistic UI updates where missing
- [ ] Add helpful empty states ("No leads yet")
- [ ] Write README documentation
- [ ] Create admin user guide (PDF or docs page)
- [ ] Set environment variables in Vercel
- [ ] Deploy to production
- [ ] Verify cron jobs scheduled in Vercel
- [ ] Send test WhatsApp messages from production
- [ ] Monitor error logs for first hour

**Deliverable:** Production-ready counselor dashboard

---

## 9. RISK MITIGATION

### 9.1 Potential Risks

#### Risk 1: Breaking Existing Features

**Impact:** HIGH  
**Probability:** MEDIUM

**Mitigation:**

- Only add new tables/models, never modify existing ones
- Use separate `/counselor` routes, don't touch existing routes
- Test existing features after migration (demo booking, payments, etc.)
- Keep rollback SQL ready
- Deploy to staging first, test for 24 hours

**Rollback Plan:**

```sql
-- Drop only new tables
DROP TABLE IF EXISTS activities CASCADE;
DROP TABLE IF EXISTS notes CASCADE;
DROP TABLE IF EXISTS tasks CASCADE;
DROP TABLE IF EXISTS offers CASCADE;
DROP TABLE IF EXISTS installments CASCADE;
DROP TABLE IF EXISTS fee_plans CASCADE;
DROP TABLE IF EXISTS communications CASCADE;
DROP TABLE IF EXISTS leads CASCADE;

-- Restore COUNSELOR enum if needed
ALTER TYPE "UserRole" DROP VALUE IF EXISTS 'COUNSELOR';
```

#### Risk 2: WhatsApp API Rate Limits

**Impact:** MEDIUM  
**Probability:** MEDIUM

**Mitigation:**

- Implement exponential backoff retry logic
- Queue messages if rate limit hit (use database as queue)
- Monitor daily message count
- Set up alerts for rate limit errors
- Have backup SMS service ready (Twilio)

**Queue Implementation:**

```typescript
// Create a message queue table
model MessageQueue {
  id          String   @id @default(cuid())
  leadId      String
  message     String
  channel     String
  status      String   // PENDING, PROCESSING, SENT, FAILED
  retryCount  Int      @default(0)
  scheduledAt DateTime @default(now())
  sentAt      DateTime?
  error       String?
  createdAt   DateTime @default(now())
}

// Process queue every minute
async function processMessageQueue() {
  const messages = await prisma.messageQueue.findMany({
    where: { status: 'PENDING', scheduledAt: { lte: new Date() } },
    take: 20, // Batch size
  })

  for (const msg of messages) {
    try {
      await whatsappService.sendText(msg.leadId, msg.message)
      await prisma.messageQueue.update({
        where: { id: msg.id },
        data: { status: 'SENT', sentAt: new Date() }
      })
    } catch (error) {
      await prisma.messageQueue.update({
        where: { id: msg.id },
        data: {
          status: msg.retryCount >= 3 ? 'FAILED' : 'PENDING',
          retryCount: msg.retryCount + 1,
          error: error.message,
        }
      })
    }
  }
}
```

#### Risk 3: Database Performance Issues

**Impact:** HIGH  
**Probability:** LOW

**Mitigation:**

- All queries use indexes (verify with EXPLAIN ANALYZE)
- Pagination on all list endpoints (max 100 per page)
- Use database connection pooling (already configured)
- Cache frequently accessed data (Redis if needed)
- Monitor slow queries with Prisma metrics

**Query Optimization:**

```typescript
// BAD: N+1 query problem
const leads = await prisma.lead.findMany()
for (const lead of leads) {
  const commCount = await prisma.communication.count({ where: { leadId: lead.id } })
}

// GOOD: Use include with _count
const leads = await prisma.lead.findMany({
  include: {
    _count: {
      select: { communications: true, tasks: true },
    },
  },
})
```

#### Risk 4: Cron Jobs Not Running

**Impact:** HIGH  
**Probability:** LOW

**Mitigation:**

- Verify cron configuration in Vercel dashboard
- Add monitoring/alerts for cron job failures
- Implement manual trigger endpoints for testing
- Log every cron job execution
- Set up dead man's switch (alert if cron doesn't run)

**Monitoring:**

```typescript
// Log cron executions to database
model CronLog {
  id          String   @id @default(cuid())
  cronName    String
  status      String   // SUCCESS, FAILED
  duration    Int      // milliseconds
  results     Json?
  error       String?
  executedAt  DateTime @default(now())
}

// In cron handler
const startTime = Date.now()
try {
  const results = await processPaymentReminders()
  await prisma.cronLog.create({
    data: {
      cronName: 'payment_reminders',
      status: 'SUCCESS',
      duration: Date.now() - startTime,
      results,
    }
  })
} catch (error) {
  await prisma.cronLog.create({
    data: {
      cronName: 'payment_reminders',
      status: 'FAILED',
      duration: Date.now() - startTime,
      error: error.message,
    }
  })
}
```

#### Risk 5: Data Privacy / Security

**Impact:** HIGH  
**Probability:** LOW

**Mitigation:**

- All API routes protected by authentication
- RBAC: Counselors can only see their assigned leads
- Never expose PII in error messages
- Sanitize all user inputs (Zod validation)
- Use parameterized queries (Prisma does this)
- HTTPS only (Vercel default)
- Webhook signature verification

**Security Checklist:**

- [ ] No hardcoded API keys (use environment variables)
- [ ] All counselor routes require authentication
- [ ] Webhook endpoints verify signatures
- [ ] Rate limiting on sensitive endpoints
- [ ] Input validation with Zod schemas
- [ ] SQL injection protected (Prisma ORM)
- [ ] XSS protection (React escapes by default)
- [ ] CSRF protection (SameSite cookies)

#### Risk 6: Timeline Slippage

**Impact:** MEDIUM  
**Probability:** MEDIUM

**Mitigation:**

- Prioritize ruthlessly: MVP features only
- Cut scope if needed (e.g., defer admin analytics to Day 8)
- Work in parallel where possible (backend + frontend)
- Use existing UI components (don't reinvent)
- Set daily goals and track progress
- Have "must-have" vs "nice-to-have" list

**Scope Reduction Plan (if needed):**

1. **Day 1 fallback:** Skip seed data, use existing demo bookings
2. **Day 2 fallback:** Simple list view instead of Kanban (add drag-drop later)
3. **Day 3 fallback:** Basic send only, defer templates to later
4. **Day 4 fallback:** Manual installment entry (skip auto-calculation)
5. **Day 5 fallback:** Manual tasks only (defer auto-generation)
6. **Day 6 fallback:** Skip admin dashboard (counselors are priority)
7. **Day 7 fallback:** Deploy with known minor bugs, fix post-launch

---

## 10. DEPLOYMENT CHECKLIST

### 10.1 Pre-Deployment

**Environment Variables (Vercel):**

```env
# Database
DATABASE_URL=postgresql://...
DIRECT_DATABASE_URL=postgresql://...

# Authentication
NEXTAUTH_SECRET=...
NEXTAUTH_URL=https://cerebrumbiologyacademy.com

# WhatsApp (Interakt)
INTERAKT_API_KEY=...
INTERAKT_WEBHOOK_SECRET=...
INTERAKT_PHONE_NUMBER_ID=...

# Cron Job Security
CRON_SECRET=...

# Admin
ADMIN_EMAIL=admin@cerebrumacademy.com
ADMIN_PASSWORD_HASH=...

# Razorpay (already exists)
RAZORPAY_KEY_ID=...
RAZORPAY_KEY_SECRET=...

# Resend (already exists)
RESEND_API_KEY=...
```

**Code Review:**

- [ ] No console.log in production code
- [ ] All environment variables used with fallbacks
- [ ] Error boundaries added to all major components
- [ ] Loading states on all async operations
- [ ] Mobile responsive (test on real devices)
- [ ] Accessibility: keyboard navigation, ARIA labels
- [ ] SEO: meta tags, OpenGraph for counselor pages

**Database:**

- [ ] Backup production database
- [ ] Run migration on staging first
- [ ] Verify existing data intact after migration
- [ ] Test rollback procedure on staging
- [ ] Check connection pool settings
- [ ] Verify indexes created (EXPLAIN ANALYZE queries)

**Dependencies:**

- [ ] Run `npm audit` and fix vulnerabilities
- [ ] Update dependencies to latest stable versions
- [ ] Test build locally: `npm run build`
- [ ] Verify bundle size acceptable (<500KB main JS)

### 10.2 Deployment Steps

**Step 1: Staging Deployment**

```bash
# Create staging branch
git checkout -b staging/counselor-dashboard

# Merge feature branch
git merge feature/counselor-dashboard

# Push to staging
git push origin staging/counselor-dashboard

# Deploy to Vercel staging
vercel --prod=false
```

**Step 2: Staging Testing (24 hours)**

- [ ] Test all user flows end-to-end
- [ ] Send real WhatsApp messages
- [ ] Test cron jobs (trigger manually)
- [ ] Monitor error logs (Vercel dashboard)
- [ ] Test on multiple devices
- [ ] Load test with 50 concurrent users
- [ ] Check database query performance

**Step 3: Production Migration**

```bash
# SSH to database or use Prisma Studio
DATABASE_URL="production_url" npx prisma migrate deploy

# Verify migration success
DATABASE_URL="production_url" npx prisma studio
# Check tables: leads, communications, etc.
```

**Step 4: Production Deployment**

```bash
# Merge to main
git checkout main
git merge staging/counselor-dashboard

# Tag release
git tag -a v2.0.0-counselor-dashboard -m "Counselor Dashboard Release"
git push origin main --tags

# Deploy to Vercel (automatic on push to main)
# Or manual: vercel --prod
```

### 10.3 Post-Deployment

**Immediate Verification (0-1 hour):**

- [ ] Visit /counselor route (should load)
- [ ] Test login with counselor credentials
- [ ] Create test lead
- [ ] Send test WhatsApp message
- [ ] Check database: verify record created
- [ ] Monitor Vercel logs for errors
- [ ] Verify cron jobs scheduled (Vercel dashboard)
- [ ] Test API endpoints with Postman

**Smoke Tests:**

```bash
# Test API health
curl https://cerebrumbiologyacademy.com/api/health

# Test counselor leads API (with auth token)
curl -H "Authorization: Bearer <token>" \
  https://cerebrumbiologyacademy.com/api/counselor/leads

# Test webhook (with valid signature)
curl -X POST https://cerebrumbiologyacademy.com/api/webhooks/interakt \
  -H "x-interakt-signature: <signature>" \
  -d '{"type":"test"}'
```

**Monitoring Setup (Day 1):**

- [ ] Set up error alerts (Sentry or Vercel)
- [ ] Monitor database CPU/memory (Vercel Postgres)
- [ ] Track API response times
- [ ] Monitor WhatsApp API usage (Interakt dashboard)
- [ ] Set up uptime monitoring (UptimeRobot)
- [ ] Create Slack/email alerts for critical errors

**User Training (Day 1-2):**

- [ ] Create user guide for counselors (PDF)
- [ ] Record video tutorial (Loom)
- [ ] Train 1-2 counselors as "champions"
- [ ] Collect feedback after 3 days
- [ ] Fix high-priority bugs within 24 hours

### 10.4 Rollback Procedure

**If critical issues found:**

**Step 1: Immediate Rollback (< 5 minutes)**

```bash
# Revert to previous Vercel deployment
vercel rollback

# Or redeploy previous version
git checkout v1.9.0
vercel --prod
```

**Step 2: Database Rollback (if needed)**

```sql
-- Revert migration (only if data corrupted)
-- WARNING: This will delete all CRM data
BEGIN;

DROP TABLE IF EXISTS activities CASCADE;
DROP TABLE IF EXISTS notes CASCADE;
DROP TABLE IF EXISTS tasks CASCADE;
DROP TABLE IF EXISTS offers CASCADE;
DROP TABLE IF EXISTS installments CASCADE;
DROP TABLE IF EXISTS fee_plans CASCADE;
DROP TABLE IF EXISTS communications CASCADE;
DROP TABLE IF EXISTS leads CASCADE;

-- Restore from backup
-- psql $DATABASE_URL < backup_before_crm.sql

COMMIT;
```

**Step 3: Communicate**

- [ ] Notify team of rollback
- [ ] Post status update (if public-facing)
- [ ] Document issue in postmortem
- [ ] Create fix branch
- [ ] Test fix on staging
- [ ] Redeploy when ready

### 10.5 Success Metrics (Track for 7 days)

**Technical Metrics:**

- API response times (avg < 500ms)
- Error rate (< 1%)
- WhatsApp delivery rate (> 95%)
- Database query performance (95th percentile < 1s)
- Cron job success rate (100%)

**Business Metrics:**

- Number of leads created
- Number of communications sent
- Conversion rate (demo → enrollment)
- Average response time (counselor → lead)
- Task completion rate

**User Feedback:**

- Counselor satisfaction score (1-5)
- Feature usage stats (which features used most)
- Bug reports count
- Feature requests

---

## APPENDIX A: QUICK REFERENCE

### Useful Commands

**Database:**

```bash
# Create migration
npx prisma migrate dev --name <name>

# Deploy migration (production)
npx prisma migrate deploy

# Rollback last migration
npx prisma migrate resolve --rolled-back <migration_name>

# Open Prisma Studio
npx prisma studio

# Generate Prisma Client
npx prisma generate
```

**Development:**

```bash
# Start dev server
npm run dev

# Build for production
npm run build

# Type check
npx tsc --noEmit

# Format code
npx prettier --write .

# Run tests
npm test
```

**Deployment:**

```bash
# Deploy to staging
vercel

# Deploy to production
vercel --prod

# View logs
vercel logs

# Rollback
vercel rollback
```

### Important File Paths

**Backend:**

- Models: `prisma/schema.prisma`
- API Routes: `src/app/api/counselor/*`
- Services: `src/lib/counselor/*`
- WhatsApp: `src/lib/counselor/whatsapp.ts`

**Frontend:**

- Pages: `src/app/counselor/*`
- Components: `src/components/counselor/*`
- Layouts: `src/app/counselor/layout.tsx`
- Context: `src/contexts/CounselorContext.tsx`

**Config:**

- Environment: `.env.local`
- Vercel: `vercel.json`
- TypeScript: `tsconfig.json`

### API Endpoint Summary

| Endpoint                             | Method | Description            |
| ------------------------------------ | ------ | ---------------------- |
| `/api/counselor/leads`               | GET    | List leads             |
| `/api/counselor/leads`               | POST   | Create lead            |
| `/api/counselor/leads/[id]`          | GET    | Get lead details       |
| `/api/counselor/leads/[id]`          | PATCH  | Update lead            |
| `/api/counselor/leads/[id]/stage`    | POST   | Change stage           |
| `/api/counselor/communications`      | GET    | List messages          |
| `/api/counselor/communications`      | POST   | Send message           |
| `/api/counselor/fee-plans`           | POST   | Create fee plan        |
| `/api/counselor/fee-plans/[id]`      | GET    | Get fee plan           |
| `/api/counselor/offers`              | POST   | Create offer           |
| `/api/counselor/offers/[id]/send`    | POST   | Send offer             |
| `/api/counselor/tasks`               | GET    | List tasks             |
| `/api/counselor/tasks`               | POST   | Create task            |
| `/api/counselor/tasks/[id]/complete` | POST   | Complete task          |
| `/api/admin/counselor-performance`   | GET    | Get metrics            |
| `/api/webhooks/interakt`             | POST   | WhatsApp webhook       |
| `/api/cron/payment-reminders`        | GET    | Payment reminders cron |
| `/api/cron/inactive-leads`           | GET    | Inactive leads cron    |

---

## CONCLUSION

This technical plan provides a complete roadmap for building the Counselor Dashboard in 7 days. The plan prioritizes:

1. **Zero Breaking Changes:** All new models and routes, no modifications to existing code
2. **WhatsApp-First:** Deep integration with Interakt API for seamless communication
3. **Automation:** Smart task generation and payment reminders reduce manual work
4. **Scalability:** Proper indexing, pagination, and error handling for growth
5. **Speed:** Aggressive timeline with daily deliverables

**Next Steps:**

1. Review this plan with the team
2. Get approval from business owner
3. Set up Interakt account and get API keys
4. Create counselor test user
5. Start Day 1 implementation

**Remember:**

- Test extensively before deploying
- Keep rollback plan ready
- Monitor closely post-launch
- Collect user feedback immediately
- Iterate based on real usage

Good luck! 🚀

---

**Document Version:** 1.0  
**Last Updated:** November 10, 2025  
**Author:** Technical Planning Agent  
**Status:** Ready for Implementation
