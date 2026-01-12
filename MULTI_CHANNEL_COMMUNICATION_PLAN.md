# Multi-Channel Communication System - Implementation Plan

## Executive Summary

This document outlines the complete implementation of a **unified multi-channel notification system** for Cerebrum Biology Academy CRM, enabling automatic delivery of critical updates via **Email, WhatsApp, and SMS** with intelligent failover mechanisms.

---

## 1. Current State Analysis

### ✅ Already Implemented

- **Email Service**: SendGrid (primary) → Resend (fallback)
  - Dual-provider failover system
  - 4 professional email templates (leadWelcome, demoConfirmation, courseOffer, paymentReminder)
  - Integrated into webhook receiver and demo booking

- **WhatsApp Service**: Interakt API
  - Template-based messaging
  - WhatsApp Business API integration
  - Currently used for demo bookings

- **Packages Installed**: Twilio, MSG91 (not currently in use)

### Missing Components

1. ❌ SMS Service (Twilio/MSG91)
2. ❌ Unified multi-channel notification service
3. ❌ Additional email/WhatsApp templates
4. ❌ Manual lead creation form in counselor dashboard
5. ❌ Flexible payment reminder automation
6. ❌ Multi-channel integration for all student touch

points

---

## 2. Architecture Design

### Multi-Channel Notification Flow

```
Student Event (Demo Booking / Payment Due)
           ↓
Unified Notification Service
           ↓
    ┌──────┼──────┐
    ↓      ↓      ↓
  Email  WhatsApp SMS
    ↓      ↓      ↓
SendGrid Interakt Twilio
    ↓      ↓      ↓
 Resend    -    MSG91
(Fallback)     (Fallback)
```

### Provider Strategy

| Channel      | Primary  | Fallback | Use Case                               |
| ------------ | -------- | -------- | -------------------------------------- |
| **Email**    | SendGrid | Resend   | All communications                     |
| **WhatsApp** | Interakt | -        | Rich, template-based messages          |
| **SMS**      | Twilio   | MSG91    | Critical notifications (payment, demo) |

### When to Use Each Channel

#### Email (Always)

- Welcome emails for new leads
- Demo confirmations
- Course offers
- Payment reminders
- Fee receipts

#### WhatsApp (Primary for engagement)

- Demo booking confirmations
- Payment reminders (with payment link)
- Course offer notifications
- Study reminders
- Motivational messages

#### SMS (Critical only)

- **Fallback** when WhatsApp delivery fails
- **Time-sensitive** notifications (demo starting in 30 min)
- **Payment overdue** alerts
- OTP and verification codes

---

## 3. Features to Implement

### Feature 1: Unified Multi-Channel Notification Service

**File**: `src/lib/notifications/notificationService.ts`

**Capabilities**:

- Single API to send via Email + WhatsApp + SMS
- Intelligent channel selection based on priority
- Automatic failover if primary provider fails
- Delivery tracking and logging
- Non-blocking async execution

**API**:

```typescript
notificationService.send({
  type: 'demo_confirmation',
  recipient: {
    name: 'Student Name',
    email: 'student@example.com',
    phone: '+918826444334',
  },
  data: {
    demoDate: '2025-02-15',
    demoTime: '6:00 PM',
    meetingLink: 'https://zoom.us/...',
    counselorName: 'Priya Sharma',
  },
  channels: ['email', 'whatsapp'], // Optional: specify channels
  priority: 'high', // high = include SMS
})
```

---

### Feature 2: SMS Service with Dual Provider

**File**: `src/lib/sms/smsService.ts`

**Providers**:

1. **Twilio** (Primary)
   - Global coverage
   - 99% delivery rate
   - SMS + Voice
   - Cost: ~₹0.50/SMS in India

2. **MSG91** (Fallback)
   - India-focused
   - Cheaper rates (~₹0.20/SMS)
   - Excellent delivery in India
   - DLT registration supported

**Key Features**:

- Automatic failover
- Delivery status tracking
- Template support for transactional SMS
- Rate limiting to prevent abuse

---

### Feature 3: Additional Communication Templates

#### Email Templates (Add to `templates.ts`)

1. **Payment Received Confirmation**

   ```typescript
   paymentReceived({
     studentName: string
     amount: number
     installmentNumber: number
     receiptUrl: string
     nextDueDate?: string
   })
   ```

2. **Course Welcome** (First Day)

   ```typescript
   courseWelcome({
     studentName: string
     courseName: string
     startDate: string
     classSchedule: string
     portalLink: string
     counselorName: string
   })
   ```

3. **Demo Reminder** (30 min before)
   ```typescript
   demoReminder({
     studentName: string
     demoTime: string
     meetingLink: string
     meetingPassword: string
   })
   ```

#### WhatsApp Templates (Interakt Dashboard)

Create these templates in your Interakt account:

1. **demo_confirmation** (Already exists)
2. **payment_reminder**
3. **payment_received**
4. **demo_reminder_30min**
5. **course_welcome**
6. **offer_expiring_soon**

---

### Feature 4: Manual Lead Creation Form

**Location**: `/counselor/leads` page

**UI Components**:

- Modal form with Headless UI
- Real-time validation with Zod
- Auto-populate counselor assignment
- Source tracking

**Fields**:

```typescript
{
  studentName: string (required)
  email: string (required, validated)
  phone: string (required, Indian format)
  courseInterest: string (dropdown)
  city: string
  grade: '11th' | '12th' | 'Dropper'
  source: 'Phone Call' | 'Walk-in' | 'Referral' | 'Other'
  priority: 'HOT' | 'WARM' | 'COLD'
  notes: string (optional)
}
```

**Workflow**:

1. Counselor fills form
2. Lead created with stage = 'NEW_LEAD'
3. Automatic task created: "Initial Follow-up Call" (due in 2 hours)
4. Welcome email + WhatsApp sent to student
5. Activity logged
6. Lead appears in pipeline

---

### Feature 5: Flexible Payment Reminder Automation

#### Option A: Counselor-Defined Schedule

**UI**: Payment Schedule Builder in Fee Plan Modal

```typescript
{
  scheduleType: 'custom' | 'monthly' | 'alternate_month' | 'quarterly'
  installments: [
    {
      number: 1,
      amount: 15000,
      dueDate: '2025-02-01', // Counselor sets
      reminderDays: [5, 3, 1, 0], // Days before due date
      status: 'PENDING',
    },
  ]
}
```

#### Option B: System-Calculated Schedule

**Auto-calculate from admission date with intelligent scheduling**:

**Payment Schedule Logic:**

1. **3 Installments**: Day 1 (admission), Day 31, Day 61

2. **Alternate Month**: 5th of alternate months (starting from admission month)

3. **Quarterly/Dynamic** (Academic Year: April 1 - March 31):

   **If joining between March 1 - April 10** (session start period):
   - Pay **quarterly** (every 3 months)
   - Example: Join March 15, 2026 → Installments: March 15, June 5, Sept 5, Dec 5

   **If joining after April 10**:
   - **More than 8 months left** in academic year → Pay **alternate months** (5th of every alternate month)
   - **Less than 8 months left** in academic year → Pay in **4 monthly installments** starting from Day 1

**Examples:**

```typescript
// Example 1: Join on March 15, 2026 (2026-2027 session)
// Between March 1 - April 10 → Quarterly
Installments: [
  { date: '2026-03-15', amount: 25000, type: 'quarterly' }, // First installment on admission day
  { date: '2026-06-05', amount: 25000, type: 'quarterly' },
  { date: '2026-09-05', amount: 25000, type: 'quarterly' },
  { date: '2026-12-05', amount: 25000, type: 'quarterly' },
]

// Example 2: Join on May 1, 2026 (11 months left > 8 months)
// After April 10 + >8 months left → Alternate months
Installments: [
  { date: '2026-07-05', amount: 16666, type: 'alternate_month' },
  { date: '2026-09-05', amount: 16666, type: 'alternate_month' },
  { date: '2026-11-05', amount: 16667, type: 'alternate_month' },
  { date: '2027-01-05', amount: 16667, type: 'alternate_month' },
  { date: '2027-03-05', amount: 16667, type: 'alternate_month' },
]

// Example 3: Join on December 1, 2026 (4 months left < 8 months)
// After April 10 + <8 months left → 4 monthly installments
Installments: [
  { date: '2026-12-01', amount: 25000, type: 'monthly' }, // Day 1
  { date: '2026-12-31', amount: 25000, type: 'monthly' }, // Day 31
  { date: '2027-01-30', amount: 25000, type: 'monthly' }, // Day 61
  { date: '2027-03-01', amount: 25000, type: 'monthly' }, // Day 91
]
```

**Reminder Logic**:

```typescript
// Send reminders at:
- 5 days before due date (Email + WhatsApp)
- 3 days before due date (Email + WhatsApp)
- 1 day before due date (Email + WhatsApp + SMS)
- On due date (Email + WhatsApp + SMS)
- 1 day overdue (Email + WhatsApp + SMS + Task for counselor)
```

#### Implementation

**Database**: Already supports via `Installment` table

- `dueDate` field
- `status` enum: PENDING | PAID | OVERDUE | CANCELLED

**Cron Job**: `/api/cron/payment-reminders` (runs daily at 9 AM)

```typescript
// Check all installments due in next 5 days
// Send appropriate reminder based on days remaining
// Log communication in Communication table
```

---

### Feature 6: Multi-Channel Integration for Key Events

#### Events to Automate

| Event                          | Email | WhatsApp | SMS | Priority |
| ------------------------------ | ----- | -------- | --- | -------- |
| **New Lead Welcome**           | ✅    | ✅       | ❌  | Medium   |
| **Demo Booking Confirmation**  | ✅    | ✅       | ❌  | Medium   |
| **Demo Reminder (30 min)**     | ✅    | ✅       | ✅  | High     |
| **Course Offer Sent**          | ✅    | ✅       | ❌  | Medium   |
| **Payment Reminder (5 days)**  | ✅    | ✅       | ❌  | Medium   |
| **Payment Reminder (1 day)**   | ✅    | ✅       | ✅  | High     |
| **Payment Overdue**            | ✅    | ✅       | ✅  | Urgent   |
| **Payment Received**           | ✅    | ✅       | ❌  | Medium   |
| **Course Welcome (First Day)** | ✅    | ✅       | ❌  | Medium   |

---

## 4. Environment Variables Required

Add to `.env`:

```bash
# Email (Already configured)
SENDGRID_API_KEY=your_sendgrid_key
SENDGRID_FROM_EMAIL=noreply@cerebrumbiologyacademy.com
RESEND_API_KEY=your_resend_key
RESEND_FROM_EMAIL=noreply@cerebrumbiologyacademy.com

# WhatsApp (Interakt)
INTERAKT_API_KEY=your_interakt_key
INTERAKT_PHONE_NUMBER_ID=your_phone_number_id

# SMS (Twilio - Primary)
TWILIO_ACCOUNT_SID=your_twilio_sid
TWILIO_AUTH_TOKEN=your_twilio_token
TWILIO_PHONE_NUMBER=+1234567890  # Your Twilio number

# SMS (MSG91 - Fallback)
MSG91_AUTH_KEY=your_msg91_key
MSG91_SENDER_ID=CERBUM  # 6-char sender ID
MSG91_ROUTE=4  # 4 = Transactional route
```

---

## 5. Implementation Roadmap

### Phase 1: Foundation (Day 1-2)

- ✅ Create SMS service with Twilio/MSG91 dual provider
- ✅ Build unified notification service (Email + WhatsApp + SMS)
- ✅ Add delivery tracking and logging
- ✅ Create additional email/WhatsApp templates

### Phase 2: CRM Integration (Day 3-4)

- ✅ Integrate notifications into webhook receiver
- ✅ Add multi-channel support to demo booking
- ✅ Build manual lead creation form in counselor dashboard
- ✅ Update payment reminder system

### Phase 3: Automation (Day 5-6)

- ✅ Implement flexible payment schedule system
- ✅ Create cron job for payment reminders
- ✅ Add demo reminder automation (30 min before)
- ✅ Integrate all events with multi-channel notifications

### Phase 4: Testing & Optimization (Day 7)

- ✅ Test all notification channels
- ✅ Verify failover mechanisms
- ✅ Check delivery tracking
- ✅ Optimize performance and rate limiting

---

## 6. Best Practices & Recommendations

### Cost Optimization

**Estimated Monthly Costs** (for 100 leads/month, 50 students):

| Service        | Volume       | Cost/Unit | Monthly Cost   |
| -------------- | ------------ | --------- | -------------- |
| **SendGrid**   | 1,000 emails | ₹0.50     | ₹500           |
| **Interakt**   | 500 WhatsApp | ₹0.30     | ₹150           |
| **Twilio SMS** | 100 SMS      | ₹0.50     | ₹50            |
| **MSG91 SMS**  | 50 SMS       | ₹0.20     | ₹10            |
| **Total**      | -            | -         | **₹710/month** |

### Rate Limiting

```typescript
// Prevent abuse and manage costs
const limits = {
  email: 100 per hour per user,
  whatsapp: 50 per hour per user,
  sms: 20 per hour per user
}
```

### Delivery Best Practices

1. **Email**:
   - Always include unsubscribe link
   - Use professional "From" name
   - Mobile-responsive templates
   - Track opens and clicks

2. **WhatsApp**:
   - Use approved templates only
   - Keep messages under 1024 characters
   - Include opt-out instructions
   - Respect 24-hour messaging window

3. **SMS**:
   - Keep under 160 characters
   - Include sender name
   - Avoid promotional content in transactional SMS
   - Register with DLT for India

### Compliance

- **GDPR**: Obtain consent before sending marketing messages
- **TRAI DLT**: Register SMS templates for Indian numbers
- **WhatsApp Business Policy**: Only send opt-in, transactional messages
- **CAN-SPAM**: Include physical address and unsubscribe link in emails

---

## 7. Success Metrics

Track these KPIs:

| Metric                   | Target  | How to Measure                       |
| ------------------------ | ------- | ------------------------------------ |
| **Email Delivery Rate**  | > 98%   | SendGrid analytics                   |
| **WhatsApp Open Rate**   | > 95%   | Interakt dashboard                   |
| **SMS Delivery Rate**    | > 99%   | Twilio/MSG91 logs                    |
| **Response Time**        | < 2 min | Time from event to notification sent |
| **Cost per Lead**        | < ₹10   | Total cost / total leads             |
| **Student Satisfaction** | > 4.5/5 | Feedback surveys                     |

---

## 8. Rollout Plan

### Week 1: Development

- Implement SMS service
- Build unified notification service
- Create additional templates
- Integrate with existing systems

### Week 2: Testing

- Test all channels independently
- Verify failover mechanisms
- Load testing (100 concurrent notifications)
- User acceptance testing with 5 leads

### Week 3: Soft Launch

- Enable for 20% of new leads
- Monitor delivery rates
- Gather feedback from counselors
- Fix any issues

### Week 4: Full Rollout

- Enable for 100% of leads
- Monitor all metrics
- Optimize based on data
- Document learnings

---

## 9. Additional Feature Suggestions

Based on your requirements, here are some valuable additions:

### 1. **Communication Timeline View**

- Show all communications with a lead in chronological order
- Filter by channel (Email/WhatsApp/SMS)
- View delivery status and timestamps
- Resend failed messages

### 2. **Smart Send Time Optimization**

- Analyze best times to send based on student engagement
- Auto-schedule messages for optimal open rates
- Avoid late-night messages (10 PM - 8 AM)

### 3. **Template Performance Analytics**

- Track open rates, click rates for each template
- A/B test different versions
- Identify best-performing templates

### 4. **Parent Communication Portal**

- Send payment reminders to both student and parent
- Separate templates for parents
- Progress reports via email

### 5. **Bulk Communication**

- Send announcements to all students
- Filter by course, batch, payment status
- Schedule bulk messages

### 6. **Two-Way WhatsApp Integration**

- Receive replies from students
- Route to assigned counselor
- Auto-respond to common queries

### 7. **Communication Preferences**

- Let students choose preferred channel
- Opt-out options per channel
- Quiet hours configuration

### 8. **Notification Queue Dashboard**

- View pending notifications
- Retry failed deliveries
- Cancel scheduled messages

---

## 10. Next Steps

1. **Review this plan** and prioritize features
2. **Configure API accounts**:
   - SendGrid ✅ (Already done)
   - Resend ✅ (Already done)
   - Interakt (Need API key)
   - Twilio (Need to sign up)
   - MSG91 (Need to sign up)

3. **Start Implementation** following Phase 1-4 roadmap
4. **Set up monitoring** for all channels
5. **Train counselors** on new features

---

## Contact & Support

For any questions or issues during implementation:

- Technical: Review this document
- API Issues: Check provider documentation
- Feature Requests: Add to todo list

**Estimated Total Development Time**: 5-7 days
**Estimated Monthly Operational Cost**: ₹700-1000
**Expected Impact**:

- 60% reduction in manual follow-ups
- 95%+ message delivery rate
- 3x faster response to leads
- Better student experience

---

**Status**: Ready for implementation
**Last Updated**: 2025-01-11
**Version**: 1.0
