# Counselor/Booking Agent Dashboard - Complete Feature Plan

**Cerebrum Biology Academy**
**Date:** November 10, 2025
**Version:** 1.0 - Comprehensive Plan

---

## 📋 Executive Summary

This document outlines a comprehensive Education Counselor Dashboard system designed to transform the student enrollment process at Cerebrum Biology Academy. The system will empower counselors to manage the entire student lifecycle from lead to enrollment, with powerful communication tools, payment plan management, and complete visibility for administrators.

### Key Objectives:

- **Increase Conversion:** 25-40% improvement in demo-to-enrollment conversion
- **Reduce Manual Work:** 60% reduction in manual follow-up tasks
- **Improve Revenue Collection:** 95%+ on-time payment rate through automated reminders
- **Enable Data-Driven Decisions:** Real-time analytics for admin oversight

---

## 🎯 Target Users

### Primary User: Education Counselor/Booking Agent

**Role:** Convert leads into enrolled students and ensure payment collection

**Daily Activities:**

- Handle incoming demo booking requests
- Conduct follow-up calls with leads
- Create personalized course offers
- Set up custom fee payment plans
- Send WhatsApp messages and offers
- Track student enrollment progress
- Manage payment reminders

### Secondary User: Admin/Management

**Role:** Monitor counselor performance and business metrics

**Daily Activities:**

- Review counselor performance dashboards
- Monitor lead conversion rates
- Track revenue collection
- Assign leads to counselors
- Review pending tasks and follow-ups

---

## 📊 Industry Best Practices Analysis

### Standard Education CRM Features:

1. **Lead Pipeline Management** - Visual funnel from lead → demo → enrollment
2. **Multi-Channel Communication** - WhatsApp, Email, SMS, Calls
3. **Payment Plan Flexibility** - Installments, EMI, early-bird discounts
4. **Automated Reminders** - Payment due dates, follow-ups, demo schedules
5. **Performance Analytics** - Conversion rates, revenue per counselor
6. **Document Management** - Fee receipts, agreements, ID proofs

### Pain Points in Education Enrollment (Solved by This System):

- ❌ **Manual follow-ups** → ✅ Automated reminders
- ❌ **Lost leads** → ✅ Pipeline tracking with alerts
- ❌ **Payment delays** → ✅ Automated payment reminders
- ❌ **No counselor accountability** → ✅ Admin dashboard with metrics
- ❌ **Generic offers** → ✅ Personalized discounts and plans
- ❌ **Communication scattered** → ✅ Centralized communication hub

---

## 🏗️ System Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                    COUNSELOR DASHBOARD                       │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │   Lead       │  │ Communication │  │  Fee Plan    │     │
│  │   Pipeline   │  │     Hub       │  │  Manager     │     │
│  └──────────────┘  └──────────────┘  └──────────────┘     │
│                                                              │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │   Offer      │  │    Tasks &    │  │  Performance │     │
│  │  Generator   │  │   Reminders   │  │   Metrics    │     │
│  └──────────────┘  └──────────────┘  └──────────────┘     │
│                                                              │
└─────────────────────────────────────────────────────────────┘
                            ↕
┌─────────────────────────────────────────────────────────────┐
│                     ADMIN DASHBOARD                          │
├─────────────────────────────────────────────────────────────┤
│  • Counselor Performance Monitoring                          │
│  • Lead Distribution & Assignment                            │
│  • Revenue Tracking & Analytics                              │
│  • Task Oversight & Alerts                                   │
└─────────────────────────────────────────────────────────────┘
```

---

## 🎨 Complete Feature List (Organized by Priority)

### ✅ PHASE 1: MVP (Must Have) - 3 Weeks

#### 1. Student Lead Pipeline Management

**User Story:** "As a counselor, I want to see all my leads in different stages so I can prioritize my follow-ups"

**Features:**

- **Visual Pipeline Board** (Kanban-style)
  - Stages: New Lead → Demo Scheduled → Demo Completed → Offer Sent → Payment Plan Created → Enrolled → Active Student
  - Drag-and-drop to move students between stages
  - Color-coded by priority (hot, warm, cold)
  - Quick view cards showing student name, course interest, days in stage

- **Lead Details Page**
  - Student profile (name, phone, email, course interest, location)
  - Communication history (all WhatsApp, calls, emails in timeline)
  - Demo booking details (date, attended/no-show)
  - Notes section (counselor can add private notes)
  - Activity log (all actions taken on this lead)

- **Quick Actions**
  - Send WhatsApp message
  - Create offer
  - Set up fee plan
  - Schedule callback
  - Mark as won/lost

**Database Schema:**

```prisma
model Lead {
  id                String   @id @default(cuid())
  studentName       String
  email             String
  phone             String
  courseInterest    String
  stage             LeadStage @default(NEW_LEAD)
  priority          Priority  @default(WARM)
  source            String?   // organic, referral, ad campaign
  assignedTo        User      @relation("CounselorLeads")
  assignedToId      String
  lastContactedAt   DateTime?
  nextFollowUpAt    DateTime?
  demoBookingId     String?   @unique
  demoBooking       DemoBooking? @relation(fields: [demoBookingId])

  // Tracking
  createdAt         DateTime  @default(now())
  updatedAt         DateTime  @updatedAt
  convertedAt       DateTime? // When they enrolled
  lostAt            DateTime? // If lead was lost
  lostReason        String?

  // Relations
  communications    Communication[]
  offers            Offer[]
  feePlans          FeePlan[]
  tasks             Task[]
  notes             Note[]
  activities        Activity[]

  @@index([assignedToId, stage])
  @@index([nextFollowUpAt])
}

enum LeadStage {
  NEW_LEAD
  DEMO_SCHEDULED
  DEMO_COMPLETED
  OFFER_SENT
  NEGOTIATING
  PAYMENT_PLAN_CREATED
  ENROLLED
  ACTIVE_STUDENT
  LOST
}

enum Priority {
  HOT      // Responded recently, high interest
  WARM     // Moderate engagement
  COLD     // No response, low engagement
}
```

---

#### 2. Communication Hub (WhatsApp Integration)

**User Story:** "As a counselor, I want to send WhatsApp messages, offers, and payment links to students directly from the dashboard"

**Features:**

- **WhatsApp Message Center**
  - Send quick messages using pre-defined templates
  - Send custom messages
  - Attach course brochures (PDF)
  - Send offer cards (image with discount details)
  - Send payment links
  - View message delivery status (sent, delivered, read)

- **Message Templates Library**
  - Welcome message after demo booking
  - Post-demo follow-up
  - Offer announcement
  - Payment reminder
  - Course start reminder
  - Custom templates (counselor can create)

- **Communication History Timeline**
  - All WhatsApp messages in chronological order
  - All emails sent/received
  - Call logs (with notes)
  - Automatic logging of all interactions

**Database Schema:**

```prisma
model Communication {
  id              String   @id @default(cuid())
  leadId          String
  lead            Lead     @relation(fields: [leadId])
  type            CommType // WHATSAPP, EMAIL, CALL, SMS
  direction       Direction // INBOUND, OUTBOUND
  subject         String?
  message         String   @db.Text
  status          MessageStatus // SENT, DELIVERED, READ, FAILED
  sentBy          User     @relation("SentMessages")
  sentById        String
  sentAt          DateTime @default(now())

  // WhatsApp specific
  whatsappMessageId String?
  templateName      String?

  // Call specific
  callDuration      Int?    // seconds
  callRecordingUrl  String?

  // Attachments
  attachments       String[] // URLs to files

  @@index([leadId, sentAt])
}

enum CommType {
  WHATSAPP
  EMAIL
  CALL
  SMS
}

enum Direction {
  INBOUND
  OUTBOUND
}

enum MessageStatus {
  PENDING
  SENT
  DELIVERED
  READ
  FAILED
}

model MessageTemplate {
  id          String   @id @default(cuid())
  name        String   // "Post Demo Follow-up"
  category    String   // "Follow-up", "Offer", "Reminder"
  type        CommType
  subject     String?  // For emails
  message     String   @db.Text
  variables   String[] // ["studentName", "courseName", "discount"]
  isActive    Boolean  @default(true)
  createdBy   User     @relation("CreatedTemplates")
  createdById String
  createdAt   DateTime @default(now())
  usageCount  Int      @default(0)
}
```

---

#### 3. Fee Plan Manager

**User Story:** "As a counselor, I want to create custom payment plans with installment dates so students can pay in parts"

**Features:**

- **Create Custom Fee Plans**
  - Total course fee input
  - Discount application (percentage or fixed amount)
  - Number of installments selector (1-12 months)
  - Custom installment dates or auto-generate
  - Early bird discount (pay in full upfront)
  - Late payment penalty settings

- **Fee Plan Templates**
  - Standard plan: Full payment upfront (5% discount)
  - 3-Month EMI: Pay in 3 equal parts
  - 6-Month EMI: Pay in 6 equal parts
  - Custom: Counselor creates unique plan

- **Payment Plan Details Page**
  - Visual timeline of payment due dates
  - Payment status (pending, paid, overdue)
  - Payment history
  - Payment links for each installment
  - Reminder schedule

- **Payment Reminder Automation**
  - WhatsApp reminder 7 days before due date
  - WhatsApp reminder 1 day before due date
  - WhatsApp reminder on due date
  - Follow-up call task if 3 days overdue

**Database Schema:**

```prisma
model FeePlan {
  id                String      @id @default(cuid())
  leadId            String
  lead              Lead        @relation(fields: [leadId])
  courseId          String
  courseName        String

  // Pricing
  baseFee           Decimal     @db.Decimal(10, 2)
  discount          Decimal     @default(0) @db.Decimal(10, 2)
  discountType      DiscountType @default(PERCENTAGE)
  totalFee          Decimal     @db.Decimal(10, 2)
  amountPaid        Decimal     @default(0) @db.Decimal(10, 2)
  amountDue         Decimal     @db.Decimal(10, 2)

  // Plan details
  planType          String      // "Full Payment", "3-Month EMI", "Custom"
  numberOfInstallments Int

  // Status
  status            FeeStatus   @default(PENDING)
  createdBy         User        @relation("CreatedFeePlans")
  createdById       String
  createdAt         DateTime    @default(now())
  updatedAt         DateTime    @updatedAt

  // Relations
  installments      Installment[]
  payments          Payment[]

  @@index([leadId, status])
}

model Installment {
  id              String      @id @default(cuid())
  feePlanId       String
  feePlan         FeePlan     @relation(fields: [feePlanId])
  installmentNumber Int       // 1, 2, 3...

  amount          Decimal     @db.Decimal(10, 2)
  dueDate         DateTime
  status          PaymentStatus @default(PENDING)
  paidAt          DateTime?
  paidAmount      Decimal?    @db.Decimal(10, 2)

  // Payment gateway
  razorpayOrderId String?
  razorpayPaymentId String?
  paymentLink     String?

  // Reminders
  remindersSent   Json?       @default("{\"7_days\": false, \"1_day\": false, \"due_date\": false}")

  @@index([feePlanId, dueDate])
  @@index([status, dueDate])
}

enum DiscountType {
  PERCENTAGE
  FIXED_AMOUNT
}

enum FeeStatus {
  PENDING
  PARTIAL
  COMPLETED
  CANCELLED
}

enum PaymentStatus {
  PENDING
  PAID
  OVERDUE
  FAILED
}

model Payment {
  id                  String    @id @default(cuid())
  feePlanId           String
  feePlan             FeePlan   @relation(fields: [feePlanId])
  installmentId       String?

  amount              Decimal   @db.Decimal(10, 2)
  paymentMethod       String    // UPI, Card, Net Banking
  razorpayOrderId     String?
  razorpayPaymentId   String?
  razorpaySignature   String?

  status              String    // success, pending, failed
  paidAt              DateTime?

  // Metadata
  metadata            Json?
  receiptUrl          String?

  createdAt           DateTime  @default(now())

  @@index([feePlanId, createdAt])
}
```

---

#### 4. Offer Generator & Manager

**User Story:** "As a counselor, I want to create personalized discount offers and send them to students via WhatsApp"

**Features:**

- **Quick Offer Creator**
  - Select course
  - Set discount percentage or amount
  - Set offer expiry date (24 hrs, 3 days, 7 days, custom)
  - Auto-generate offer code (or custom)
  - Add terms & conditions

- **Offer Templates**
  - Early Bird: 20% off if enrolled before [date]
  - Referral Discount: ₹5,000 off for referred students
  - Limited Slots: Special discount (creates urgency)
  - Festival Offer: Diwali/New Year specials

- **Offer Card Generator**
  - Auto-generates beautiful WhatsApp-ready image
  - Shows course name, original price, discounted price
  - Displays offer code and expiry
  - One-click send to student

- **Offer Tracking**
  - View all offers sent
  - Track which offers were accepted
  - See conversion rate per offer type
  - Expiry alerts

**Database Schema:**

```prisma
model Offer {
  id              String    @id @default(cuid())
  leadId          String
  lead            Lead      @relation(fields: [leadId])

  // Offer details
  offerCode       String    @unique
  offerName       String    // "Early Bird Discount"
  courseName      String
  originalPrice   Decimal   @db.Decimal(10, 2)
  discountType    DiscountType
  discountValue   Decimal   @db.Decimal(10, 2)
  finalPrice      Decimal   @db.Decimal(10, 2)

  // Validity
  validFrom       DateTime  @default(now())
  validUntil      DateTime
  isActive        Boolean   @default(true)

  // Status
  status          OfferStatus @default(SENT)
  sentAt          DateTime  @default(now())
  viewedAt        DateTime?
  acceptedAt      DateTime?

  // Terms
  termsConditions String?   @db.Text
  maxUses         Int       @default(1)
  usesCount       Int       @default(0)

  // Tracking
  createdBy       User      @relation("CreatedOffers")
  createdById     String
  offerCardUrl    String?   // Generated image URL

  @@index([leadId, status])
  @@index([validUntil])
}

enum OfferStatus {
  DRAFT
  SENT
  VIEWED
  ACCEPTED
  EXPIRED
  CANCELLED
}
```

---

#### 5. Task & Reminder System

**User Story:** "As a counselor, I want automated reminders for follow-ups so I never miss contacting a lead"

**Features:**

- **My Tasks Dashboard**
  - Today's tasks list
  - Overdue tasks (highlighted in red)
  - This week's tasks
  - Task completion percentage

- **Auto-Generated Tasks**
  - Follow-up after demo (next day)
  - Follow-up if offer not accepted (2 days)
  - Payment reminder calls (3 days before due)
  - Payment overdue follow-up
  - Re-engagement for cold leads (7 days no contact)

- **Manual Tasks**
  - Counselor can create custom tasks
  - Set priority (high, medium, low)
  - Set due date and time
  - Add notes

- **Task Actions**
  - Mark as complete
  - Snooze to later
  - Delegate to another counselor
  - Add follow-up task

**Database Schema:**

```prisma
model Task {
  id              String      @id @default(cuid())
  leadId          String?
  lead            Lead?       @relation(fields: [leadId])

  title           String
  description     String?     @db.Text
  type            TaskType
  priority        TaskPriority @default(MEDIUM)

  dueDate         DateTime
  dueTime         String?     // "10:00 AM"

  status          TaskStatus  @default(PENDING)
  completedAt     DateTime?

  assignedTo      User        @relation("AssignedTasks")
  assignedToId    String
  createdBy       User?       @relation("CreatedTasks")
  createdById     String?

  // Automation
  isAutoGenerated Boolean     @default(false)
  triggerEvent    String?     // "demo_completed", "payment_due"

  // Snooze
  snoozedUntil    DateTime?

  createdAt       DateTime    @default(now())
  updatedAt       DateTime    @updatedAt

  @@index([assignedToId, status, dueDate])
  @@index([dueDate, status])
}

enum TaskType {
  FOLLOW_UP_CALL
  SEND_WHATSAPP
  SEND_EMAIL
  PAYMENT_REMINDER
  DEMO_FOLLOWUP
  CUSTOM
}

enum TaskPriority {
  HIGH
  MEDIUM
  LOW
}

enum TaskStatus {
  PENDING
  IN_PROGRESS
  COMPLETED
  SNOOZED
  CANCELLED
}
```

---

### ⭐ PHASE 2: Enhanced Features (Should Have) - 2 Weeks

#### 6. Performance Analytics for Counselors

**Features:**

- Personal performance dashboard
- Conversion rate tracking
- Revenue generated this month
- Average time to convert lead
- Response time metrics
- Leaderboard (gamification)

#### 7. Bulk Actions & Automation

**Features:**

- Send bulk WhatsApp messages
- Bulk offer creation
- Auto-assignment of new leads (round-robin)
- Smart lead scoring (AI-powered)

#### 8. Document Management

**Features:**

- Upload student documents (ID proof, payment receipts)
- Digital fee receipt generation
- Agreement/contract signing
- Course completion certificates

---

### 🚀 PHASE 3: Advanced Features (Nice to Have) - 2 Weeks

#### 9. AI-Powered Features

**Features:**

- Smart follow-up suggestions
- Lead conversion prediction
- Optimal contact time prediction
- Automated response to common queries

#### 10. Advanced Reporting

**Features:**

- Custom report builder
- Revenue forecasting
- Cohort analysis
- Export reports to Excel/PDF

---

## 🔐 Admin Dashboard Features

### Real-Time Counselor Monitoring

**Features:**

- **Counselor Performance Grid**
  - Each counselor's stats in real-time
  - Leads assigned vs converted
  - Revenue generated
  - Response time average
  - Task completion rate

- **Lead Distribution Dashboard**
  - Assign new leads to counselors
  - Re-assign leads if counselor is unresponsive
  - Lead source analysis
  - Conversion funnel visualization

- **Revenue Tracking**
  - Total revenue this month
  - Revenue per counselor
  - Payment collection rate
  - Overdue payments alert

- **Task Oversight**
  - See all counselors' pending tasks
  - Overdue tasks alert
  - Task completion trends

- **Activity Feed**
  - Real-time log of all counselor actions
  - "Rashmi sent offer to Priya Sharma"
  - "Amit created fee plan for Rohan Kumar"
  - "Sarah marked payment received from Anjali"

**Database Schema:**

```prisma
model User {
  id                String   @id @default(cuid())
  name              String
  email             String   @unique
  phone             String?
  role              UserRole

  // Counselor specific
  isActive          Boolean  @default(true)
  maxLeadsCapacity  Int      @default(50)
  currentLeadsCount Int      @default(0)

  // Performance metrics (cached)
  totalLeadsAssigned Int     @default(0)
  totalConverted     Int     @default(0)
  totalRevenue       Decimal  @default(0) @db.Decimal(12, 2)
  conversionRate     Decimal  @default(0) @db.Decimal(5, 2)
  avgResponseTime    Int?     // in minutes

  // Relations
  leads              Lead[]   @relation("CounselorLeads")
  communications     Communication[] @relation("SentMessages")
  tasks              Task[]   @relation("AssignedTasks")
  createdTasks       Task[]   @relation("CreatedTasks")
  offers             Offer[]  @relation("CreatedOffers")
  feePlans           FeePlan[] @relation("CreatedFeePlans")
  activities         Activity[] @relation("UserActivities")

  createdAt         DateTime @default(now())
  updatedAt         DateTime @updatedAt

  @@index([role, isActive])
}

enum UserRole {
  ADMIN
  COUNSELOR
  MANAGER
}

model Activity {
  id          String   @id @default(cuid())
  userId      String
  user        User     @relation("UserActivities", fields: [userId])
  leadId      String?
  lead        Lead?    @relation(fields: [leadId])

  action      String   // "sent_offer", "created_fee_plan", "moved_stage"
  description String   // "Sent Early Bird offer to Priya Sharma"
  metadata    Json?    // Additional context

  createdAt   DateTime @default(now())

  @@index([userId, createdAt])
  @@index([createdAt])
}
```

---

## 🎨 UI/UX Design Mockups

### Counselor Dashboard Layout

```
┌─────────────────────────────────────────────────────────────────┐
│  🏠 Cerebrum Biology   [Search]   🔔 [Notifications]   👤 Rashmi │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  📊 TODAY'S OVERVIEW                                            │
│  ┌───────────────┬───────────────┬───────────────┬──────────┐  │
│  │  New Leads    │  Demos Today  │  Tasks Due    │ Revenue  │  │
│  │     5         │      3        │      8        │  ₹45K    │  │
│  └───────────────┴───────────────┴───────────────┴──────────┘  │
│                                                                  │
│  📋 MY TASKS (8 pending)                    [View All]          │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │ 🔴 HIGH  Follow-up: Priya Sharma (Demo yesterday)        │  │
│  │          Due: Today 11:00 AM              [Complete] [→] │  │
│  ├──────────────────────────────────────────────────────────┤  │
│  │ 🟡 MED   Payment Reminder: Rohan Kumar (Due tomorrow)    │  │
│  │          Due: Today 2:00 PM               [Complete] [→] │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                  │
│  🎯 MY LEADS PIPELINE                       [+ Add Lead]        │
│  ┌──────────┬──────────┬──────────┬──────────┬──────────────┐  │
│  │ New Lead │  Demo    │  Offer   │ Payment  │   Enrolled   │  │
│  │   (12)   │  Booked  │   Sent   │   Plan   │     (8)      │  │
│  │          │   (5)    │   (7)    │   (4)    │              │  │
│  ├──────────┼──────────┼──────────┼──────────┼──────────────┤  │
│  │ 📱 Amit  │ 📱 Priya │ 📱 Rohan │ 📱 Sarah │  📱 Anjali   │  │
│  │ Kumar    │ Sharma   │ Kumar    │ Gupta    │  Verma       │  │
│  │ 🔥 HOT   │ 🔥 HOT   │ ⚠️ WARM  │ 🔥 HOT   │  ✅ PAID     │  │
│  │ 2d ago   │ 1d ago   │ 3d ago   │ Today    │  Active      │  │
│  │ [View]   │ [View]   │ [View]   │ [View]   │  [View]      │  │
│  └──────────┴──────────┴──────────┴──────────┴──────────────┘  │
└─────────────────────────────────────────────────────────────────┘
```

### Lead Detail Page

```
┌─────────────────────────────────────────────────────────────────┐
│  ← Back to Pipeline                                              │
├─────────────────────────────────────────────────────────────────┤
│  👤 PRIYA SHARMA                                    🔥 HOT LEAD  │
│  ───────────────────────────────────────────────────────────    │
│                                                                  │
│  📞 +91 98765 43210     ✉️ priya.sharma@email.com              │
│  📚 Course Interest: NEET Dropper 2025                          │
│  📍 Location: Mumbai     🎯 Stage: Demo Completed               │
│  📅 Demo Date: Nov 9, 2025 (Attended ✅)                        │
│                                                                  │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │  QUICK ACTIONS                                             │ │
│  │  [💬 WhatsApp]  [📧 Email]  [🎁 Send Offer]  [💰 Fee Plan] │ │
│  │  [📅 Schedule Call]  [📝 Add Note]                         │ │
│  └────────────────────────────────────────────────────────────┘ │
│                                                                  │
│  📊 ACTIVITY TIMELINE                          [+ Add Note]     │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │ ⏰ Today 9:00 AM                                           │ │
│  │ 💬 You sent: "Hi Priya, thank you for attending..."       │ │
│  │    Status: Read ✓✓                                        │ │
│  ├────────────────────────────────────────────────────────────┤ │
│  │ ⏰ Yesterday 3:00 PM                                       │ │
│  │ 📞 Demo Class Completed (45 mins)                         │ │
│  │    Feedback: Excellent, very interested                    │ │
│  ├────────────────────────────────────────────────────────────┤ │
│  │ ⏰ Nov 8, 10:00 AM                                         │ │
│  │ 💬 Priya replied: "Yes, I'll join the demo"               │ │
│  └────────────────────────────────────────────────────────────┘ │
│                                                                  │
│  📝 PRIVATE NOTES                                               │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │ • Very motivated, scored 450 in first attempt              │ │
│  │ • Parent wants to speak with faculty before enrolling      │ │
│  │ • Budget: ₹60K, looking for EMI option                     │ │
│  │ [+ Add Note]                                               │ │
│  └────────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────┘
```

---

## 🔌 API Integration Requirements

### 1. WhatsApp Integration (Interakt)

**Endpoints Needed:**

- `POST /v1/public/message/` - Send template messages
- `POST /v1/public/message/send-text` - Send text messages
- `POST /v1/public/media/` - Upload and send media (offer images)
- `GET /v1/public/message/{id}` - Check message status

**Features:**

- Template message support
- Media/image attachment
- Message status webhooks
- Read receipts

### 2. Payment Gateway (Razorpay)

**Already Integrated:** ✅
**Additional Features Needed:**

- Payment links for installments
- Subscription/recurring payments for EMI
- Webhook for payment success

### 3. Email Service (Resend)

**Already Integrated:** ✅
**Features:**

- Transactional emails
- Email templates
- Attachment support

### 4. SMS Gateway (Optional - Future)

**Provider:** Twilio / MSG91
**Use Case:** Backup for payment reminders

---

## 📱 Mobile Accessibility

### Counselor Mobile App Features:

- Responsive web app (works on mobile browser)
- Quick task completion on the go
- One-tap WhatsApp sending
- Voice note recording for lead notes
- Push notifications for new leads

---

## 🚀 Implementation Plan

### Phase 1: MVP (Weeks 1-3)

**Week 1: Foundation**

- Database schema implementation
- User authentication & roles
- Basic dashboard layout

**Week 2: Core Features**

- Lead pipeline board
- Communication hub (WhatsApp)
- Task system

**Week 3: Financial Features**

- Fee plan creator
- Offer generator
- Payment tracking

**Deliverables:**

- ✅ Counselors can manage leads end-to-end
- ✅ WhatsApp integration working
- ✅ Basic admin oversight

---

### Phase 2: Enhanced Features (Weeks 4-5)

**Week 4: Analytics & Automation**

- Performance metrics
- Auto-generated tasks
- Bulk actions

**Week 5: Polish & Testing**

- UI/UX refinement
- Mobile responsiveness
- User testing with real counselors

**Deliverables:**

- ✅ Automated workflows
- ✅ Analytics dashboard
- ✅ Production-ready system

---

### Phase 3: Advanced Features (Weeks 6-7)

**Week 6: AI & Intelligence**

- Lead scoring
- Smart suggestions
- Predictive analytics

**Week 7: Advanced Reporting**

- Custom reports
- Export functionality
- Advanced admin features

**Deliverables:**

- ✅ AI-powered insights
- ✅ Comprehensive reporting

---

## 📊 Success Metrics

### For Counselors:

- **Conversion Rate:** Target 30%+ (demo → enrollment)
- **Response Time:** Average < 2 hours
- **Task Completion:** 95%+ tasks completed on time
- **Revenue per Lead:** ₹15,000+ average

### For Business:

- **Payment Collection:** 95%+ on-time payments
- **Lead Wastage:** < 10% leads lost due to poor follow-up
- **Counselor Efficiency:** Each counselor manages 50+ active leads
- **Revenue Growth:** 25%+ increase in quarterly revenue

### For Admin:

- **Visibility:** 100% real-time visibility into counselor activities
- **Accountability:** Clear attribution of revenue to counselors
- **Data-Driven Decisions:** Weekly reports on conversion trends

---

## 💰 Cost & Resource Estimates

### Development Effort:

- **Phase 1 (MVP):** 120 hours (~3 weeks)
- **Phase 2 (Enhanced):** 80 hours (~2 weeks)
- **Phase 3 (Advanced):** 80 hours (~2 weeks)
- **Total:** 280 hours (~7 weeks)

### Operational Costs:

- **Interakt (WhatsApp):** ₹5,000/month (1,000 messages)
- **Resend (Email):** Free tier (3,000 emails/month)
- **Razorpay:** 2% transaction fee
- **Database:** Included in current Vercel plan
- **Total:** ~₹5,000/month + transaction fees

### ROI Estimate:

- **Current Monthly Revenue:** ₹10,00,000 (assumed)
- **Expected Growth:** 25% (better conversion)
- **Additional Revenue:** ₹2,50,000/month
- **Annual ROI:** ₹30,00,000
- **Payback Period:** < 1 month

---

## 🔒 Security & Compliance

### Data Protection:

- Role-based access control (RBAC)
- Encrypted storage of sensitive data
- Audit logs for all counselor actions
- GDPR compliance for student data

### Privacy:

- Students can request data deletion
- Clear consent for WhatsApp communication
- Secure payment processing (PCI-DSS via Razorpay)

---

## 📚 Training & Onboarding

### Counselor Training Plan:

**Day 1: System Familiarization**

- Dashboard walkthrough
- Lead pipeline management
- Task system

**Day 2: Communication Tools**

- WhatsApp integration
- Message templates
- Offer creation

**Day 3: Financial Features**

- Fee plan creation
- Payment tracking
- Reminder automation

**Day 4: Best Practices**

- Lead conversion strategies
- Time management
- Performance metrics

### Support Documentation:

- Video tutorials for each feature
- Written SOPs (Standard Operating Procedures)
- FAQ section
- Live chat support

---

## 🎯 Next Steps After Approval

### Immediate Actions:

1. **Finalize Database Schema** - Review and approve Prisma models
2. **Set Up Development Environment** - Configure dev database
3. **Create UI Wireframes** - Detailed mockups for key screens
4. **Set Up WhatsApp API** - Get Interakt credentials and templates approved
5. **Kick-off Development** - Start Phase 1 implementation

### First Milestone (Week 1):

- ✅ Database schema implemented
- ✅ Authentication system with counselor role
- ✅ Basic dashboard with lead list view
- ✅ Demo with sample data

---

## 📞 Questions for Clarification

### Before Starting Development:

1. **How many counselors will use this system?** (affects lead distribution logic)
2. **What are the typical courses and their pricing?** (for fee plan templates)
3. **What is your preferred WhatsApp message tone?** (formal/friendly/conversational)
4. **Do you already have Interakt account?** (or should we set it up?)
5. **What existing tools are counselors using?** (to plan data migration)

---

## ✅ Approval Checklist

Please review and approve:

- [ ] Overall feature list and priorities
- [ ] Database schema design
- [ ] UI/UX approach (pipeline board + detail pages)
- [ ] WhatsApp integration plan
- [ ] Fee plan and payment reminder logic
- [ ] Admin dashboard oversight features
- [ ] Implementation timeline (7 weeks)
- [ ] Cost estimates

---

## 📝 Conclusion

This counselor dashboard will transform how Cerebrum Biology Academy manages student enrollment. By centralizing all communication, automating follow-ups, and providing complete visibility, we expect:

- **40% increase in conversion rates** (better follow-up)
- **60% reduction in manual work** (automation)
- **95%+ payment collection** (automated reminders)
- **Complete transparency** (admin oversight)

The system is designed to scale from 1 counselor to 10+ counselors without any code changes. All workflows are automated, intelligent, and user-friendly.

**Ready to start building upon your approval!** 🚀

---

**Document prepared by:** Claude (AI Assistant)
**Date:** November 10, 2025
**Contact for questions:** Please review and provide feedback
