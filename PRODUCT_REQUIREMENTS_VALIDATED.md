# PRODUCT REQUIREMENTS VALIDATION

**Cerebrum Biology Academy - Counselor Dashboard**
**Date:** November 10, 2025
**Version:** 1.0 - Product Validation
**Status:** Source of Truth for Product Requirements

---

## 1. USER STORIES WITH ACCEPTANCE CRITERIA

### 1.1 Lead Pipeline Management

#### Story 1.1.1: Visual Lead Pipeline

**As a counselor,**
**I want to** see all my leads in a visual pipeline organized by stage,
**So that** I can quickly identify where each lead is in the enrollment journey and prioritize my outreach.

**Acceptance Criteria:**

- [ ] Pipeline displays 7 stages: New Lead → Demo Scheduled → Demo Completed → Offer Sent → Negotiating → Payment Plan Created → Enrolled
- [ ] Each lead appears as a card showing: name, course interest, days in stage, priority badge
- [ ] Leads can be dragged and dropped between stages
- [ ] Stage change triggers automatic task creation (e.g., demo completed → create "follow-up call" task)
- [ ] Pipeline shows lead count per stage in column header
- [ ] Color coding: Hot leads (red border), Warm (yellow), Cold (gray)
- [ ] Clicking lead card opens detailed view in side panel or new page
- [ ] Pipeline loads within 2 seconds for up to 100 leads

**Success Metrics:**

- Time to find specific lead: < 5 seconds (baseline: 30+ seconds in spreadsheet)
- Counselor daily pipeline checks: 10+ times per day
- Lead stage update frequency: 80%+ of leads updated within 24 hours
- Adoption rate: 100% of counselors using pipeline as primary tool within 1 week

---

#### Story 1.1.2: Lead Detail Page

**As a counselor,**
**I want to** access complete lead information and history in one place,
**So that** I can have contextual conversations without switching between multiple tools.

**Acceptance Criteria:**

- [ ] Displays student profile: name, phone, email, course interest, location, source
- [ ] Shows current stage with visual progress indicator
- [ ] Communication timeline shows all WhatsApp, email, call interactions chronologically
- [ ] Notes section for private counselor observations (not visible to student)
- [ ] Activity log shows all system actions (stage changes, tasks created, offers sent)
- [ ] Quick action buttons: Send WhatsApp, Send Email, Create Offer, Create Fee Plan, Schedule Callback
- [ ] Related items section: active offers, fee plans, pending tasks
- [ ] Last contacted timestamp and next follow-up date prominently displayed

**Success Metrics:**

- Information lookup time: < 10 seconds (baseline: 2+ minutes across tools)
- Notes added per lead: Average 3+ notes
- Quick actions usage: 80%+ of communications sent via quick actions
- Context switches during call: 0 (all info on one page)

---

### 1.2 WhatsApp Communication Hub

#### Story 1.2.1: Template-Based Messaging

**As a counselor,**
**I want to** send WhatsApp messages using pre-approved templates,
**So that** I can communicate quickly while maintaining brand voice and compliance.

**Acceptance Criteria:**

- [ ] Template library accessible from lead detail page and pipeline card
- [ ] Templates categorized: Welcome, Post-Demo, Offer, Payment Reminder, Course Start
- [ ] Template preview shows personalized message before sending
- [ ] Variables auto-populate: {{studentName}}, {{courseName}}, {{demoDate}}, {{counselorName}}
- [ ] One-click send with delivery status tracking
- [ ] Templates display WhatsApp approval status (approved/pending/rejected)
- [ ] Fallback to text message if template fails
- [ ] Message history logs template name and content

**Success Metrics:**

- Message send time: < 30 seconds from decision to send (baseline: 2+ minutes)
- Template usage rate: 70%+ of messages use templates
- Message delivery rate: 95%+ successfully delivered
- Counselor satisfaction: 4.5/5 stars on ease of use

---

#### Story 1.2.2: Custom Message & Media Sending

**As a counselor,**
**I want to** send custom WhatsApp messages with images and documents,
**So that** I can personalize communication and share offers/brochures.

**Acceptance Criteria:**

- [ ] Custom message composer with character count (WhatsApp limit: 4096 chars)
- [ ] Image upload support (offer cards, course materials)
- [ ] PDF attachment support (brochures, fee receipts)
- [ ] Preview before send for all media
- [ ] Media auto-stored in lead's communication history
- [ ] Send status tracking: Sent → Delivered → Read with timestamps
- [ ] Retry mechanism for failed messages (up to 3 attempts)
- [ ] Rate limit handling (queue messages if API limit reached)

**Success Metrics:**

- Media attachment usage: 40%+ of offers sent as WhatsApp images
- Custom message usage: 30%+ of communications
- Failed message rate: < 5%
- Read rate: 80%+ messages read within 24 hours

---

### 1.3 Fee Plan Creation & Management

#### Story 1.3.1: Custom Fee Plan Creator

**As a counselor,**
**I want to** create custom payment plans with flexible installments,
**So that** I can accommodate different student financial situations and increase enrollment.

**Acceptance Criteria:**

- [ ] Input fields: Course name, base fee, discount (% or fixed), number of installments
- [ ] Discount types: Early bird (pay full upfront), installment plan (3/6/12 months), custom
- [ ] Auto-calculate final fee, installment amounts, due dates
- [ ] Manual override for custom installment amounts and dates
- [ ] Visual payment schedule with timeline
- [ ] Template plans: Full Payment (5% off), 3-Month EMI, 6-Month EMI, 12-Month EMI
- [ ] Terms & conditions section (auto-populated, editable)
- [ ] Preview before sending to student

**Success Metrics:**

- Fee plan creation time: < 2 minutes (baseline: 10+ minutes manual calculation)
- Plan acceptance rate: 60%+ of plans accepted within 48 hours
- Installment plan adoption: 70%+ students choose installments over full payment
- Calculation errors: 0 (automated calculation vs. manual errors)

---

#### Story 1.3.2: Automated Payment Reminders

**As a counselor,**
**I want to** automatically send payment reminders before due dates,
**So that** I can ensure on-time payments without manual tracking.

**Acceptance Criteria:**

- [ ] Auto-reminders scheduled: 7 days before, 1 day before, on due date
- [ ] WhatsApp reminder with payment link and amount due
- [ ] Reminder sends only if installment status is "Pending"
- [ ] Reminder marked as sent in system with timestamp
- [ ] Escalation task created if payment overdue by 3 days
- [ ] Admin alert if payment overdue by 5 days
- [ ] Payment receipt auto-sent via WhatsApp when payment confirmed
- [ ] System updates installment status to "Paid" on successful payment

**Success Metrics:**

- On-time payment rate: 95%+ (baseline: 75%)
- Manual reminder calls reduced by: 80%
- Overdue payments: < 5% of total installments
- Payment collection time: Average 0 days past due (baseline: 5+ days)

---

### 1.4 Offer Generation & Tracking

#### Story 1.4.1: Personalized Offer Creator

**As a counselor,**
**I want to** create time-limited discount offers for individual students,
**So that** I can incentivize enrollment and create urgency.

**Acceptance Criteria:**

- [ ] Quick offer form: Course, original price, discount type (% or fixed), discount value
- [ ] Auto-generate unique offer code (or custom input)
- [ ] Expiry period selector: 24 hours, 3 days, 7 days, custom date
- [ ] Offer templates: Early Bird 20%, Referral ₹5000, Limited Slots 15%, Festival Offer
- [ ] Auto-generate WhatsApp-ready offer card image with branding
- [ ] One-click send offer via WhatsApp
- [ ] Terms & conditions customizable per offer
- [ ] Maximum uses setting (single-use or multiple)

**Success Metrics:**

- Offer creation time: < 1 minute
- Offer acceptance rate: 40%+ of sent offers accepted
- Time to acceptance: < 48 hours average
- Urgency effectiveness: 60%+ offers accepted within 24 hours of expiry

---

#### Story 1.4.2: Offer Tracking & Analytics

**As a counselor,**
**I want to** track which offers are sent, viewed, and accepted,
**So that** I can understand what works and optimize my conversion strategy.

**Acceptance Criteria:**

- [ ] Offer dashboard showing: Total sent, Viewed, Accepted, Expired, Active
- [ ] Per-lead offer history visible in lead detail page
- [ ] Expiry alerts 24 hours before offer expires
- [ ] Auto-mark offers as "Expired" after validity period
- [ ] Acceptance triggers automatic fee plan creation workflow
- [ ] Analytics: Best-performing offer types, average discount value, conversion by course
- [ ] Admin view: Offer approval workflow for discounts > 25%
- [ ] Prevent offer reuse (unless max uses > 1)

**Success Metrics:**

- Offer view rate: 90%+ of sent offers viewed by students
- Offer acceptance rate: 35%+ of viewed offers accepted
- Expired without view: < 10% of offers
- High-value offer approvals: 100% approved/rejected within 4 hours

---

### 1.5 Task Management & Automation

#### Story 1.5.1: Auto-Generated Follow-Up Tasks

**As a counselor,**
**I want to** receive automatic task reminders for follow-ups,
**So that** no lead falls through the cracks.

**Acceptance Criteria:**

- [ ] Auto-task triggers:
  - Demo booked → "Send welcome message" (immediately)
  - Demo completed → "Follow-up call" (next day 10 AM)
  - Offer sent → "Check acceptance" (2 days later)
  - Payment due in 7 days → "Send payment reminder" (7 days before)
  - Payment overdue → "Urgent follow-up call" (high priority)
  - No contact for 7 days → "Re-engagement message" (cold lead)
- [ ] Tasks display: Lead name, task type, due date/time, priority
- [ ] Task actions: Complete, Snooze (1 day/3 days/custom), Delegate
- [ ] Completion marks task as done with timestamp
- [ ] Snooze reschedules task to new date/time
- [ ] High-priority tasks highlighted in red

**Success Metrics:**

- Task completion rate: 95%+ tasks completed on time
- Lead response time: < 2 hours average (baseline: 6+ hours)
- Cold lead re-engagement: 30%+ cold leads respond to automated task
- Missed follow-ups: < 5% (baseline: 30%+)

---

#### Story 1.5.2: Manual Task Creation

**As a counselor,**
**I want to** create custom tasks for specific leads,
**So that** I can track unique follow-up requirements.

**Acceptance Criteria:**

- [ ] Create task form: Title, Description, Lead (optional), Due date, Due time, Priority
- [ ] Task types: Follow-up Call, Send WhatsApp, Send Email, Custom
- [ ] Priority levels: High (red), Medium (yellow), Low (gray)
- [ ] Tasks appear in "My Tasks" dashboard
- [ ] Task detail page shows: Lead context, creation reason, notes
- [ ] Add notes to task during completion
- [ ] Create follow-up task from completed task
- [ ] Delegate tasks to other counselors (with notification)

**Success Metrics:**

- Custom task usage: 20%+ of all tasks manually created
- Task delegation: 10%+ tasks delegated to specialist counselors
- Custom task completion: 90%+ completed on time
- Notes added: 60%+ tasks have completion notes

---

### 1.6 Admin Oversight & Analytics

#### Story 1.6.1: Real-Time Counselor Performance Dashboard

**As an admin,**
**I want to** monitor all counselor activities and performance in real-time,
**So that** I can identify issues, support struggling counselors, and recognize top performers.

**Acceptance Criteria:**

- [ ] Counselor grid showing: Name, Active leads, Leads assigned (month), Leads converted (month), Conversion %, Revenue generated, Avg response time, Task completion %
- [ ] Color coding: Green (meeting targets), Yellow (needs attention), Red (underperforming)
- [ ] Real-time activity feed: "Rashmi sent offer to Priya Sharma", "Amit created fee plan for Rohan"
- [ ] Drill-down to counselor detail: See all their leads, tasks, communications
- [ ] Comparison view: Side-by-side counselor metrics
- [ ] Export to Excel for monthly reviews
- [ ] Filters: Date range, counselor, lead source, course type

**Success Metrics:**

- Admin daily dashboard checks: 5+ times per day
- Issue identification time: < 1 hour (baseline: discovered in weekly meetings)
- Performance review efficiency: 80% faster monthly reviews
- Data-driven coaching: 100% performance conversations backed by metrics

---

#### Story 1.6.2: Lead Distribution & Assignment

**As an admin,**
**I want to** assign new leads to counselors based on workload,
**So that** leads are distributed fairly and no counselor is overwhelmed.

**Acceptance Criteria:**

- [ ] New lead notification appears in admin dashboard
- [ ] Auto-assignment options:
  - Round-robin: Rotate between counselors
  - Load-based: Assign to counselor with fewest active leads
  - Course-based: Assign based on counselor specialization
  - Manual: Admin selects counselor
- [ ] Max lead capacity per counselor (default: 50 active leads)
- [ ] Warning if assigning to counselor near capacity
- [ ] Re-assignment capability if counselor unresponsive (> 24 hours no contact)
- [ ] Lead source tracking: Organic, Referral, Facebook Ad, Google Ad
- [ ] Assignment notification sent to counselor via WhatsApp/email

**Success Metrics:**

- Lead assignment time: < 5 minutes from lead creation
- Fair distribution: Max 20% variance in active leads per counselor
- Unassigned leads: 0 leads unassigned for > 1 hour
- Re-assignment frequency: < 5% of leads re-assigned due to non-response

---

#### Story 1.6.3: Revenue Tracking & Forecasting

**As an admin,**
**I want to** track revenue collection and forecast future revenue,
**So that** I can make informed business decisions.

**Acceptance Criteria:**

- [ ] Revenue dashboard: Today, This week, This month, Quarter, Year
- [ ] Revenue breakdown: By counselor, by course, by lead source
- [ ] Payment collection metrics: Total due, Collected, Pending, Overdue
- [ ] Overdue payment alerts with counselor and student details
- [ ] Revenue forecast based on active payment plans
- [ ] Conversion funnel: Leads → Demos → Offers → Enrollments (with drop-off %)
- [ ] Charts: Revenue trend over time, conversion rate trend, payment collection rate
- [ ] Export reports to PDF with charts and tables

**Success Metrics:**

- Revenue forecast accuracy: 90%+ accurate within ±10%
- Overdue identification: 100% overdue payments flagged within 1 day
- Collection improvement: 95%+ on-time collection (baseline: 75%)
- Business insight generation: 10+ actionable insights per month

---

## 2. BUSINESS LOGIC VALIDATION

### 2.1 Lead Management Logic

#### Scenario: New Lead Arrives

**Flow:**

1. Lead submits demo booking form on website
2. System creates Lead record with stage "NEW_LEAD"
3. Auto-assignment logic runs:
   - Check counselor max capacity (default: 50)
   - Find counselor with lowest active lead count
   - Assign lead to counselor
   - Update counselor's currentLeadsCount
4. Send notification to assigned counselor (WhatsApp + in-app)
5. Create auto-task: "Send welcome message" (due: immediately, priority: high)
6. Log activity: "New lead assigned to [Counselor Name]"

**Expected Outcome:** Lead assigned within 1 minute, counselor notified within 2 minutes, no leads left unassigned.

---

#### Scenario: Lead Doesn't Respond for 7 Days

**Flow:**

1. Cron job runs daily at 9 AM
2. Query leads where: lastContactedAt < 7 days ago AND stage != "ENROLLED"
3. For each lead:
   - Update priority to "COLD"
   - Create task: "Re-engagement message" (priority: medium, due: today)
   - Log activity: "Lead marked as COLD due to no response"
4. Send digest to counselor: "You have 3 cold leads requiring re-engagement"

**Expected Outcome:** 100% of 7-day-old leads flagged and re-engagement task created.

---

#### Scenario: Lead Completes Demo

**Flow:**

1. Counselor marks demo as "Attended" in system
2. Lead stage auto-updates to "DEMO_COMPLETED"
3. Priority auto-updated to "HOT" (recent engagement)
4. Create auto-task: "Follow-up call within 24 hours" (priority: high, due: tomorrow 10 AM)
5. Update lastContactedAt to demo date
6. Send notification: "Demo completed for [Student Name] - Follow up within 24 hours"
7. Log activity: "Demo completed, follow-up task created"

**Expected Outcome:** Follow-up task created immediately, counselor reminded next day if not completed.

---

#### Scenario: Lead Enrolls

**Flow:**

1. Counselor moves lead to "ENROLLED" stage
2. System checks: Fee plan created? Payment plan active?
3. If yes:
   - Update lead convertedAt timestamp
   - Update counselor totalConverted count
   - Add fee plan total to counselor totalRevenue
   - Create activity: "Lead converted to student"
   - Send admin notification: "[Counselor] converted [Student] - ₹[Amount]"
   - Create task: "Send welcome package" (due: today)
   - Archive completed tasks for this lead
4. If no:
   - Show warning: "Please create fee plan before marking as enrolled"
   - Block stage change until fee plan created

**Expected Outcome:** Enrollment only allowed with fee plan, revenue attribution accurate, admin notified.

---

### 2.2 Fee Plan Logic

#### Scenario: Student Wants 6-Month EMI

**Flow:**

1. Counselor selects "6-Month EMI" template
2. Inputs: Base fee ₹60,000, Discount 0%
3. System calculates:
   - Total fee: ₹60,000
   - Installment amount: ₹10,000 (60,000 / 6)
   - Due dates: 1st of each month for 6 months starting next month
4. Creates FeePlan record with status "PENDING"
5. Creates 6 Installment records:
   - Installment 1: ₹10,000, Due: Dec 1, Status: PENDING
   - Installment 2: ₹10,000, Due: Jan 1, Status: PENDING
   - ... (total 6)
6. Generates Razorpay payment links for each installment
7. Schedules reminders: 7 days before, 1 day before, on due date
8. Displays payment schedule to counselor for review
9. On approval: Send payment schedule to student via WhatsApp

**Expected Outcome:** Equal installments, correct dates, reminders scheduled, payment links generated.

---

#### Scenario: Student Gets Early-Bird Discount (Pay Full Upfront)

**Flow:**

1. Counselor selects "Full Payment" template
2. Inputs: Base fee ₹60,000, Discount 5% (early bird)
3. System calculates:
   - Discount amount: ₹3,000 (5% of 60,000)
   - Total fee: ₹57,000
   - Number of installments: 1
   - Due date: Immediately (or custom date)
4. Creates FeePlan with discountType "PERCENTAGE", discount 5
5. Creates 1 Installment: ₹57,000, Due: [Today or custom]
6. Generates Razorpay payment link
7. Sends offer card: "Save ₹3,000 - Pay ₹57,000 today!"
8. On payment: Auto-update status to "COMPLETED"

**Expected Outcome:** Discount correctly applied, single payment link, immediate payment encouraged.

---

#### Scenario: Payment Overdue by 3 Days

**Flow:**

1. Cron job runs daily at 10 AM
2. Query installments where: dueDate < 3 days ago AND status = "PENDING"
3. For each overdue installment:
   - Update status to "OVERDUE"
   - Get associated FeePlan and Lead
   - Create high-priority task: "Urgent: Follow up on overdue payment - [Student Name]" (assigned to counselor)
   - Send WhatsApp to student: "Payment overdue. Please pay immediately to avoid late fees."
   - Log activity: "Payment overdue, escalation task created"
4. If overdue > 5 days:
   - Send admin alert: "Payment overdue 5+ days - [Student Name] - [Counselor Name]"
   - Apply late fee (if configured): Add 2% to next installment

**Expected Outcome:** Immediate escalation, counselor notified, admin alerted if severe.

---

#### Scenario: Partial Payment Received

**Flow:**

1. Razorpay webhook triggers on payment success
2. System receives: razorpayPaymentId, amount paid, installmentId
3. Find installment by ID
4. If amount = installment amount:
   - Update installment status to "PAID"
   - Update paidAt timestamp
   - Update feePlan amountPaid += installment amount
   - Update feePlan amountDue -= installment amount
   - Check if all installments paid → Update feePlan status to "COMPLETED"
   - Send receipt to student via WhatsApp
   - Log activity: "Payment received - Installment [X] of [Y]"
5. If amount < installment amount (partial):
   - Update installment paidAmount = amount paid
   - Update installment amount = remaining amount
   - Send notification to counselor: "Partial payment received - [Amount]"
   - Create task: "Collect remaining ₹[Amount] from [Student]"
6. If amount > installment amount (overpaid):
   - Mark installment as "PAID"
   - Credit excess to next installment
   - Send notification: "Overpayment credited to next installment"

**Expected Outcome:** Accurate payment tracking, partial payments handled, overpayments credited.

---

### 2.3 Offer Logic

#### Scenario: Offer Expires

**Flow:**

1. Cron job runs hourly
2. Query offers where: validUntil < now() AND status = "SENT" or "VIEWED"
3. For each expired offer:
   - Update status to "EXPIRED"
   - Cannot be applied to new fee plans
   - Log activity: "Offer expired - [Offer Code]"
4. Send notification to counselor: "Offer expired for [Student Name] - Create new offer if needed"

**Expected Outcome:** Expired offers cannot be reused, counselor notified to follow up.

---

#### Scenario: Offer Used (Single-Use)

**Flow:**

1. Counselor creates fee plan and applies offer code
2. System validates:
   - Offer exists? (check by offerCode)
   - Offer active? (status = "SENT" or "VIEWED")
   - Offer not expired? (validUntil > now())
   - Offer within usage limit? (usesCount < maxUses)
3. If all valid:
   - Apply discount to fee plan
   - Update offer status to "ACCEPTED"
   - Update offer acceptedAt timestamp
   - Increment offer usesCount
   - If usesCount >= maxUses: Mark offer as "USED" (cannot be reused)
   - Log activity: "Offer accepted and applied to fee plan"
4. If invalid:
   - Show error: "Offer expired/invalid"
   - Block fee plan creation until valid offer or no offer selected

**Expected Outcome:** Single-use offers cannot be reused, multi-use offers track count, expired offers rejected.

---

#### Scenario: Multiple Offers on Same Lead

**Flow:**

1. Counselor tries to apply 2nd offer to same lead
2. System checks: Does lead have active fee plan with offer applied?
3. If yes:
   - Show error: "Student already has an active offer. Cancel previous fee plan to apply new offer."
   - Block second offer application
4. If no:
   - Allow new offer creation
   - Mark previous offers as "SUPERSEDED" (if any)
   - Log: "New offer created, previous offer superseded"

**Expected Outcome:** Only one active offer per student at a time, clear audit trail.

---

### 2.4 Communication Logic

#### Scenario: Message Sent via WhatsApp

**Flow:**

1. Counselor clicks "Send WhatsApp" with template or custom message
2. System calls Interakt API:
   - POST /v1/public/message/
   - Body: { phone: "+918826444334", template: "post_demo_followup", variables: {...} }
3. API response: { messageId: "msg_123", status: "sent" }
4. System creates Communication record:
   - type: "WHATSAPP"
   - direction: "OUTBOUND"
   - status: "SENT"
   - whatsappMessageId: "msg_123"
   - message: [rendered template]
5. Update lead lastContactedAt to now()
6. Display success notification: "WhatsApp sent to [Student Name]"
7. Background job polls Interakt API every 5 minutes to check delivery status
8. On delivery: Update Communication status to "DELIVERED"
9. On read: Update Communication status to "READ"

**Expected Outcome:** Message logged, delivery tracked, lead contacted timestamp updated.

---

#### Scenario: Message Fails to Deliver

**Flow:**

1. Interakt API returns error: { status: "failed", reason: "Invalid phone number" }
2. System creates Communication record with status "FAILED"
3. Retry mechanism:
   - Retry 1: After 5 minutes
   - Retry 2: After 15 minutes
   - Retry 3: After 1 hour
4. If all retries fail:
   - Update Communication status to "FAILED"
   - Create high-priority task: "Manual follow-up required - WhatsApp failed for [Student Name]"
   - Send notification to counselor: "WhatsApp delivery failed - Use alternate contact method"
   - Log activity: "WhatsApp failed after 3 retries - Manual intervention required"

**Expected Outcome:** 3 retry attempts, then escalate to manual follow-up.

---

#### Scenario: Student Replies (Webhook)

**Flow:**

1. Interakt webhook triggers: POST /api/webhooks/whatsapp
2. Webhook payload: { from: "+918826444334", message: "Yes, I'm interested", timestamp: "..." }
3. System finds Lead by phone number
4. Creates Communication record:
   - type: "WHATSAPP"
   - direction: "INBOUND"
   - status: "RECEIVED"
   - message: "Yes, I'm interested"
5. Update lead lastContactedAt (student initiated contact)
6. Update lead priority to "HOT" (recent engagement)
7. Send in-app notification to assigned counselor: "New message from [Student Name]"
8. Display message in lead's communication timeline

**Expected Outcome:** Inbound messages logged, counselor notified, lead re-engaged.

---

#### Scenario: Template Rejected by WhatsApp

**Flow:**

1. Counselor tries to send template "festival_offer"
2. System checks template status in database: status = "REJECTED"
3. Show error: "Template not approved by WhatsApp. Use text message instead."
4. Offer fallback: "Send as text message?" (Yes/No)
5. If yes:
   - Convert template to plain text
   - Send via Interakt text API: POST /v1/public/message/send-text
   - Create Communication record with templateName = null
   - Log: "Template unavailable, sent as text message"

**Expected Outcome:** Rejected templates cannot be sent, fallback to text, communication continues.

---

### 2.5 Task Automation Logic

#### Scenario: Payment Due in 7 Days

**Flow:**

1. Cron job runs daily at 8 AM
2. Query installments where: dueDate = 7 days from now AND status = "PENDING"
3. For each installment:
   - Get associated FeePlan and Lead
   - Create task: "Send payment reminder - [Student Name] - ₹[Amount] due on [Date]"
   - Task type: "PAYMENT_REMINDER"
   - Priority: MEDIUM
   - Due date: Today
   - Assigned to: Counselor
4. Task details include: Payment link, amount due, due date
5. Counselor completes task by sending WhatsApp reminder
6. Mark installment remindersSent.7_days = true

**Expected Outcome:** Reminders created 7 days before due date, counselor prompted to send.

---

#### Scenario: Payment Overdue

**Flow:**

1. Cron job runs daily at 10 AM
2. Query installments where: dueDate < today AND status = "PENDING"
3. For each overdue installment:
   - Create high-priority task: "URGENT: Collect overdue payment - [Student Name] - ₹[Amount]"
   - Priority: HIGH
   - Due: Today
   - Type: "PAYMENT_REMINDER"
4. If overdue > 3 days: Send WhatsApp reminder automatically
5. If overdue > 5 days: Notify admin
6. If overdue > 10 days: Mark fee plan as "AT_RISK"

**Expected Outcome:** Escalating urgency, automatic reminders, admin oversight.

---

#### Scenario: Demo Scheduled

**Flow:**

1. Counselor marks demo as scheduled with date/time
2. Lead stage updates to "DEMO_SCHEDULED"
3. Calculate demo prep time: 1 hour before demo
4. Create task: "Demo prep - [Student Name]" (due: [demo time - 1 hour])
5. Create task: "Conduct demo - [Student Name]" (due: [demo time])
6. Schedule WhatsApp reminder to student: 24 hours before, 1 hour before
7. Log activity: "Demo scheduled for [Date Time]"

**Expected Outcome:** Prep task created, student reminded, counselor has time to prepare.

---

#### Scenario: Offer Sent

**Flow:**

1. Counselor sends offer via WhatsApp
2. Offer status updates to "SENT"
3. Calculate follow-up time: 2 days after sent
4. Create task: "Check if offer accepted - [Student Name]" (due: 2 days from now)
5. Priority: MEDIUM
6. If offer not accepted after 2 days: Task triggers counselor to call
7. Log activity: "Offer sent, follow-up task created"

**Expected Outcome:** Follow-up ensures no offer is ignored, improves conversion.

---

## 3. EDGE CASE IDENTIFICATION

### 3.1 Personnel Changes

**Edge Case: Counselor Leaves Company**

- **Challenge:** Active leads need immediate re-assignment
- **Solution:**
  - Admin marks counselor as "inactive" (isActive = false)
  - System queries all leads where assignedToId = [departed counselor] AND stage != "ENROLLED"
  - Admin bulk re-assigns leads via UI:
    - Select new counselor(s)
    - Distribute evenly or manually assign
  - All pending tasks re-assigned to new counselor
  - Send notification to new counselor: "You've been assigned [X] leads from [Departed Counselor]"
  - Log activity on each lead: "Re-assigned from [Old] to [New] due to departure"
- **Acceptance Criteria:**
  - Re-assignment completes within 1 hour
  - All tasks transferred without loss
  - Communication history preserved
  - New counselor receives onboarding notes

---

**Edge Case: Counselor on Leave (Temporary)**

- **Challenge:** Leads need temporary coverage
- **Solution:**
  - Admin marks counselor as "on leave" with return date
  - Auto-assignment skips counselor on leave
  - Existing leads remain assigned but high-priority tasks delegated
  - Urgent tasks (payment overdue, hot leads) auto-delegated to backup counselor
  - On return: Tasks return to original counselor
- **Acceptance Criteria:**
  - Leave mode prevents new assignments
  - Urgent tasks delegated within 4 hours
  - No leads lost during leave period

---

### 3.2 Fee Plan Changes

**Edge Case: Student Wants to Change Fee Plan Mid-Course**

- **Challenge:** Recalculate remaining payments, handle partial payments
- **Solution:**
  - Counselor initiates "Modify Fee Plan"
  - System calculates:
    - Total paid so far
    - Remaining balance
    - New installment schedule based on remaining months
  - Create new FeePlan version (mark old as "SUPERSEDED")
  - Copy payment history to new plan
  - Recalculate future installments
  - Send updated payment schedule to student
  - Log: "Fee plan modified, new schedule sent"
- **Acceptance Criteria:**
  - Paid amount carried forward accurately
  - No duplicate payments
  - Old plan archived, not deleted
  - Audit trail shows reason for change

---

**Edge Case: Student Pays Lump Sum to Close EMI Early**

- **Challenge:** Cancel future installments, recalculate discount
- **Solution:**
  - Student pays remaining balance in full
  - System checks: Total due = sum of pending installments
  - If early closure discount configured: Apply discount to remaining balance
  - Mark all future installments as "CANCELLED"
  - Update FeePlan status to "COMPLETED"
  - Send receipt for full payment
  - Log: "EMI closed early, discount applied"
- **Acceptance Criteria:**
  - Discount calculated correctly
  - Future reminders cancelled
  - Final receipt shows all payments

---

### 3.3 Payment Gateway Issues

**Edge Case: Payment Gateway Fails (Razorpay Down)**

- **Challenge:** Student tries to pay but gateway unavailable
- **Solution:**
  - System detects Razorpay API error
  - Retry payment link generation 3 times (exponential backoff: 5s, 30s, 2m)
  - If all fail: Show error to student: "Payment system temporarily unavailable. Try again in 10 minutes."
  - Create task for counselor: "Payment gateway issue - Follow up with [Student Name]"
  - Log error with timestamp for debugging
  - Admin alert if gateway down for > 15 minutes
- **Acceptance Criteria:**
  - Retry mechanism prevents false failures
  - Students not blamed for system issues
  - Admin alerted for systemic problems
  - Alternative payment collection (manual) documented

---

**Edge Case: Payment Webhook Missed/Delayed**

- **Challenge:** Student paid but system didn't receive webhook
- **Solution:**
  - Scheduled job runs every 30 minutes
  - Query Razorpay API for recent payments
  - Match payments to pending installments by orderId
  - If payment found but not in system:
    - Process payment manually
    - Update installment status to "PAID"
    - Send delayed receipt to student with apology
    - Log: "Payment processed via reconciliation job"
  - Alert admin if reconciliation finds > 5 missed webhooks
- **Acceptance Criteria:**
  - 100% payments eventually processed
  - Students receive receipts within 1 hour max
  - System self-heals without manual intervention

---

### 3.4 Communication API Rate Limits

**Edge Case: WhatsApp API Rate Limit Hit (Interakt)**

- **Challenge:** Too many messages sent, API blocks further requests
- **Solution:**
  - Implement message queue with rate limiting
  - Queue messages if API returns 429 error
  - Process queue at safe rate (e.g., 10 messages/minute)
  - Priority queue: High-priority messages first (payment reminders, urgent tasks)
  - Show counselor: "Message queued, will send in [X] minutes"
  - Admin dashboard shows queue length
  - If queue > 100 messages: Alert admin to upgrade plan
- **Acceptance Criteria:**
  - No messages lost due to rate limiting
  - High-priority messages sent first
  - Queue cleared within 2 hours max
  - Admin visibility into queue status

---

**Edge Case: WhatsApp Number Blocked by Student**

- **Challenge:** Student blocks business WhatsApp, messages fail
- **Solution:**
  - Interakt API returns error: "User blocked"
  - Update lead metadata: whatsappBlocked = true
  - Show warning to counselor: "WhatsApp blocked by student"
  - Auto-switch primary communication to email
  - Create task: "Call student to understand communication preference"
  - Respect student preference, don't spam
- **Acceptance Criteria:**
  - No retry attempts on blocked numbers
  - Fallback to email automatic
  - Respectful communication practices

---

### 3.5 Database & Performance Issues

**Edge Case: Database Connection Fails**

- **Challenge:** Sudden database outage during operation
- **Solution:**
  - All database queries wrapped in try-catch blocks
  - On connection error:
    - Retry connection 3 times (exponential backoff)
    - If all fail: Show user-friendly error: "System temporarily unavailable. Please try again."
    - Log error to monitoring service (e.g., Sentry)
    - Send critical alert to tech team
  - Graceful degradation: Read-only mode if write fails
  - Cache critical data (counselor names, templates) in memory
- **Acceptance Criteria:**
  - No data loss during outage
  - Users see clear error messages
  - System recovers automatically when DB back online
  - Tech team alerted within 1 minute

---

**Edge Case: Large Data Sets (1000+ Leads per Counselor)**

- **Challenge:** Pipeline page slow to load, poor UX
- **Solution:**
  - Implement pagination: Load 50 leads per stage initially
  - Infinite scroll or "Load More" button
  - Server-side search and filtering
  - Database indexes on: assignedToId, stage, nextFollowUpAt
  - Cache frequently accessed data (lead counts, stage summaries)
  - Optimize queries: Use SELECT only required fields, avoid N+1 queries
  - Load lead detail page data on-demand, not upfront
- **Acceptance Criteria:**
  - Pipeline loads in < 2 seconds for 100 leads
  - Smooth scrolling for 500+ leads
  - Search results in < 1 second
  - Database query time < 500ms per operation

---

**Edge Case: Concurrent Edits (Two Counselors Edit Same Lead)**

- **Challenge:** Data conflict if both save simultaneously
- **Solution:**
  - Implement optimistic locking with version field
  - On save: Check if version matches database
  - If version mismatch: Show error: "Lead updated by another user. Refresh and try again."
  - Offer "View Changes" to see what other user modified
  - Lock lead for editing when opened (show "Editing..." indicator to others)
  - Auto-release lock after 10 minutes of inactivity
- **Acceptance Criteria:**
  - No data overwritten by concurrent edits
  - Users clearly notified of conflicts
  - Locking prevents most conflicts

---

## 4. FEATURE PRIORITIZATION (MoSCoW)

### Must Have (MVP - Days 1-5) - Launch Blockers

**Lead Management:**

- ✅ Visual pipeline board with drag-and-drop
- ✅ Lead detail page with full history
- ✅ Lead creation from demo booking form
- ✅ Auto-assignment to counselors
- ✅ Priority tagging (Hot/Warm/Cold)

**Communication:**

- ✅ WhatsApp template sending via Interakt
- ✅ Communication history timeline
- ✅ Message delivery status tracking
- ✅ Template library (5 core templates minimum)

**Fee Plans:**

- ✅ Custom fee plan creation
- ✅ Installment calculation (3/6/12 months)
- ✅ Payment schedule generation
- ✅ Razorpay payment link creation

**Tasks:**

- ✅ Auto-task creation (demo follow-up, payment reminders)
- ✅ My Tasks dashboard
- ✅ Task completion/snooze
- ✅ Overdue task highlighting

**Admin:**

- ✅ Counselor performance grid (basic metrics)
- ✅ Lead distribution dashboard
- ✅ Activity feed (real-time log)

**Why These?** These features form the core workflow counselors MUST have to do their job. Without these, the system is unusable. They deliver 80% of the value.

---

### Should Have (Nice to Have - Days 6-7) - Enhance UX

**Offers:**

- ⭐ Offer creation and sending
- ⭐ Offer card image generation
- ⭐ Offer expiry tracking
- ⭐ Offer acceptance analytics

**Communication:**

- ⭐ Custom WhatsApp message sending
- ⭐ Media/PDF attachment support
- ⭐ Inbound message webhook handling

**Fee Plans:**

- ⭐ Automated payment reminders (7 days, 1 day, due date)
- ⭐ Overdue payment escalation
- ⭐ Early bird discount templates

**Tasks:**

- ⭐ Manual task creation
- ⭐ Task delegation to other counselors
- ⭐ Task notes and completion tracking

**Admin:**

- ⭐ Revenue tracking dashboard
- ⭐ Conversion funnel visualization
- ⭐ Export reports to Excel

**Why These?** These features significantly improve efficiency and conversion but counselors can work without them initially. They differentiate us from basic CRMs.

---

### Could Have (Future - Post-Launch) - Advanced Features

**Analytics:**

- 💡 AI-powered lead scoring
- 💡 Conversion prediction models
- 💡 Optimal contact time suggestions
- 💡 Cohort analysis and trends

**Automation:**

- 💡 Bulk WhatsApp campaigns
- 💡 Smart auto-responses to common queries
- 💡 Dynamic task prioritization based on conversion likelihood

**Document Management:**

- 💡 Student document uploads (ID proof, etc.)
- 💡 Digital receipt generation
- 💡 E-signature for agreements

**Advanced Reporting:**

- 💡 Custom report builder
- 💡 Revenue forecasting with ML
- 💡 A/B testing for offers and messages

**Why These?** These are competitive advantages for future growth. Not needed for MVP success. Build once we validate core assumptions.

---

### Won't Have (Out of Scope) - Explicitly Excluded

**Excluded Features:**

- ❌ Student-facing mobile app (students use WhatsApp only)
- ❌ Video call integration (use Google Meet/Zoom separately)
- ❌ Course content delivery (LMS is separate system)
- ❌ Attendance tracking (not counselor's job)
- ❌ Certificate generation (automated post-course)
- ❌ Referral program tracking (future phase)
- ❌ Social media integration (not primary channel)
- ❌ Voice call recording (compliance complexity)

**Why Excluded?** These either duplicate existing tools, add complexity without value, or require significant compliance work. Focus on core CRM capabilities first.

---

## 5. CONVERSION FUNNEL ANALYSIS

### Ideal Counselor Workflow

```
┌─────────────────────────────────────────────────────────────┐
│  STEP 1: New Lead Arrives                                    │
│  ────────────────────────────────────────────────────────── │
│  Time Target: Instant (automated)                            │
│  Automation: Auto-assign to counselor with lowest load       │
│  Failure Handling: Alert admin if unassigned > 1 hour        │
│  Success Metric: 100% leads assigned within 5 minutes        │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│  STEP 2: Counselor Reviews Lead (< 2 hours)                  │
│  ────────────────────────────────────────────────────────── │
│  Time Target: Within 2 hours of assignment                   │
│  Automation: In-app + WhatsApp notification to counselor     │
│  Failure Handling: Escalate to manager if > 4 hours          │
│  Success Metric: 95% leads reviewed within 2 hours           │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│  STEP 3: Sends Welcome WhatsApp (from template)              │
│  ────────────────────────────────────────────────────────── │
│  Time Target: Within 3 hours of lead creation                │
│  Automation: Pre-filled template, 1-click send               │
│  Failure Handling: Auto-send if counselor doesn't in 6 hrs   │
│  Success Metric: 90% leads contacted within 3 hours          │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│  STEP 4: Books Demo (via calendar link)                      │
│  ────────────────────────────────────────────────────────── │
│  Time Target: Within 48 hours of first contact               │
│  Automation: Calendar link in welcome message                │
│  Failure Handling: Follow-up task if no demo booked in 2 days│
│  Success Metric: 60% leads book demo within 48 hours         │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│  STEP 5: Conducts Demo                                       │
│  ────────────────────────────────────────────────────────── │
│  Time Target: Demo happens as scheduled (no-show < 20%)      │
│  Automation: WhatsApp reminder 24h & 1h before               │
│  Failure Handling: Re-book task if no-show                   │
│  Success Metric: 80% demo attendance rate                    │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│  STEP 6: Sends Personalized Offer (within 24 hours)          │
│  ────────────────────────────────────────────────────────── │
│  Time Target: Within 24 hours of demo completion             │
│  Automation: Auto-task created, offer templates available    │
│  Failure Handling: Escalate if offer not sent in 48 hours    │
│  Success Metric: 90% offers sent within 24 hours             │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│  STEP 7: Creates Fee Plan (when student agrees)              │
│  ────────────────────────────────────────────────────────── │
│  Time Target: Within 48 hours of offer acceptance            │
│  Automation: Fee plan templates, auto-calculation            │
│  Failure Handling: Reminder task if not created in 3 days    │
│  Success Metric: 85% fee plans created within 48 hours       │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│  STEP 8: Collects Payment (installment 1)                    │
│  ────────────────────────────────────────────────────────── │
│  Time Target: Within 24 hours of fee plan creation           │
│  Automation: Payment link sent via WhatsApp, reminders       │
│  Failure Handling: Escalate if not paid in 3 days            │
│  Success Metric: 90% first installments paid within 24 hours │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│  STEP 9: Student Enrolled! 🎉                                │
│  ────────────────────────────────────────────────────────── │
│  Time Target: Total funnel time: < 7 days (lead to enrolled) │
│  Automation: Welcome package sent, course access activated   │
│  Failure Handling: N/A (success!)                            │
│  Success Metric: 30%+ lead-to-enrollment conversion          │
└─────────────────────────────────────────────────────────────┘
```

---

### Conversion Funnel Metrics (Expected)

| Stage                        | Conversion Target | Time Target  | Current (Baseline) |
| ---------------------------- | ----------------- | ------------ | ------------------ |
| Lead → Demo Booked           | 60%               | < 48 hours   | 40% / 72+ hours    |
| Demo Booked → Attended       | 80%               | As scheduled | 60%                |
| Demo → Offer Sent            | 90%               | < 24 hours   | 50% / 48+ hours    |
| Offer Sent → Accepted        | 40%               | < 48 hours   | 25%                |
| Accepted → Payment           | 90%               | < 24 hours   | 70% / 72+ hours    |
| **Overall: Lead → Enrolled** | **30%+**          | **< 7 days** | **15% / 14+ days** |

---

## 6. ADMIN OVERSIGHT REQUIREMENTS

### 6.1 Real-Time Dashboards

**Dashboard: Active Counselors Online Now**

- **Purpose:** Know who's working right now
- **Metrics:**
  - Counselor name with online/offline indicator (green/gray dot)
  - Last activity timestamp
  - Active leads count
  - Tasks due today count
  - Messages sent today count
- **Alerts:**
  - Counselor offline for > 2 hours during working hours (9 AM - 6 PM)
- **Actions:**
  - Click counselor to see detailed activity
  - Re-assign urgent tasks if counselor unavailable

---

**Dashboard: Leads Added Today**

- **Purpose:** Monitor lead flow and immediate action needed
- **Metrics:**
  - Total leads added today
  - Leads by source: Organic, Facebook Ad, Google Ad, Referral
  - Leads assigned vs unassigned
  - Leads contacted vs not contacted
- **Alerts:**
  - Any lead unassigned for > 1 hour (RED alert)
  - Any lead not contacted within 3 hours (YELLOW warning)
- **Actions:**
  - Manual assignment of unassigned leads
  - View lead details and assigned counselor

---

**Dashboard: Demos Scheduled Today**

- **Purpose:** Ensure demos happen and follow-ups occur
- **Metrics:**
  - Total demos scheduled today
  - Demos by time slot
  - Demo attendance status (pending/attended/no-show)
  - Counselor name for each demo
- **Alerts:**
  - Demo marked as no-show (investigate why)
  - Demo completed but no follow-up task created within 1 hour
- **Actions:**
  - Send reminder to counselor if demo starting soon
  - Check follow-up status after demo

---

**Dashboard: Revenue Collected Today**

- **Purpose:** Track daily cash flow
- **Metrics:**
  - Total payments received today (₹)
  - Payment count
  - Revenue by course type
  - Revenue by counselor
  - Payment method breakdown (UPI/Card/Net Banking)
- **Alerts:**
  - Zero payments received by 2 PM (unusual)
  - Large payment (> ₹50,000) for verification
- **Actions:**
  - Drill down to see which students paid
  - Verify payment details

---

**Dashboard: Overdue Tasks by Counselor**

- **Purpose:** Ensure accountability and no dropped balls
- **Metrics:**
  - Counselor name
  - Overdue task count
  - Oldest overdue task timestamp
  - High-priority overdue tasks highlighted
- **Alerts:**
  - Any counselor with > 5 overdue tasks (performance issue)
  - High-priority task overdue by > 24 hours (critical)
- **Actions:**
  - Message counselor: "You have [X] overdue tasks"
  - Re-assign tasks if counselor overwhelmed
  - Schedule 1-on-1 if pattern of overdue tasks

---

### 6.2 Performance Reports (Weekly/Monthly)

**Report: Conversion Rate per Counselor (Last 30 Days)**

- **Metrics:**
  - Counselor name
  - Leads assigned (month)
  - Leads converted (month)
  - Conversion rate (%)
  - Revenue generated (₹)
  - Average time to convert (days)
- **Benchmarks:**
  - Top performer: > 35% conversion
  - Meeting target: 25-35%
  - Needs improvement: < 25%
- **Actions:**
  - Recognize top performers publicly
  - Coach underperformers with specific feedback
  - Analyze: Why is conversion low? (poor demos, slow follow-up, weak offers?)

---

**Report: Average Response Time per Counselor**

- **Metrics:**
  - Counselor name
  - Average time from lead assignment to first contact (hours)
  - Leads contacted within 2 hours (%)
  - Leads contacted within 6 hours (%)
  - Leads not contacted in 24 hours (count)
- **Benchmarks:**
  - Excellent: < 1 hour average, 95%+ within 2 hours
  - Good: 1-2 hours average, 80%+ within 2 hours
  - Poor: > 3 hours average, < 70% within 2 hours
- **Actions:**
  - Address slow responders: "Students ghost if we're slow"
  - Investigate: Is workload too high? Training issue?

---

**Report: Revenue Generated per Counselor**

- **Metrics:**
  - Counselor name
  - Total revenue (month)
  - Revenue per lead (₹)
  - Number of enrollments
  - Average course fee
- **Benchmarks:**
  - Revenue target per counselor: ₹5,00,000/month (10 enrollments @ ₹50K each)
- **Actions:**
  - Incentive structure tied to revenue
  - Identify: Which counselors close high-value courses?

---

**Report: Task Completion Rate per Counselor**

- **Metrics:**
  - Counselor name
  - Total tasks assigned (month)
  - Tasks completed on time (%)
  - Tasks completed late (%)
  - Tasks never completed (%)
  - Average task completion time
- **Benchmarks:**
  - Target: 95%+ tasks completed on time
  - Warning: < 85%
- **Actions:**
  - Low completion = poor follow-up = lost leads
  - Training: Time management, task prioritization

---

### 6.3 Alerts & Notifications

**Critical Alerts (Immediate Action Required):**

1. **Lead Unassigned for > 1 Hour**
   - **Alert:** "URGENT: Lead [Name] unassigned for 62 minutes"
   - **Action:** Assign to counselor immediately
   - **Frequency:** Real-time notification + email

2. **Payment Overdue by > 5 Days**
   - **Alert:** "Payment overdue 5+ days: [Student Name] - [Counselor Name] - ₹[Amount]"
   - **Action:** Admin calls student directly or escalates
   - **Frequency:** Daily digest at 10 AM

3. **Counselor Hasn't Logged In for 2 Days**
   - **Alert:** "Counselor [Name] last seen: 2 days ago"
   - **Action:** Call counselor, re-assign urgent leads
   - **Frequency:** Daily check at 9 AM

4. **Demo No-Show Rate > 30%**
   - **Alert:** "Demo no-show rate: 35% (7 no-shows out of 20 demos this week)"
   - **Action:** Investigate: Poor reminder system? Wrong audience?
   - **Frequency:** Weekly report on Monday

5. **System Error: WhatsApp API Down**
   - **Alert:** "WhatsApp integration failing - 15 messages failed in last hour"
   - **Action:** Contact Interakt support, use backup email
   - **Frequency:** Immediate alert after 3 consecutive failures

---

**Performance Alerts (Coaching Opportunities):**

1. **Counselor Conversion < 20% for 2 Consecutive Weeks**
   - **Alert:** "[Counselor Name] conversion rate: 18% (target: 30%+)"
   - **Action:** Schedule coaching session, review demo quality
   - **Frequency:** Weekly performance review

2. **Average Response Time > 4 Hours**
   - **Alert:** "[Counselor Name] response time: 5.2 hours (target: < 2 hours)"
   - **Action:** Discuss workload, time management training
   - **Frequency:** Weekly

3. **Offer Acceptance Rate < 25%**
   - **Alert:** "[Counselor Name] offers accepted: 22% (target: 40%+)"
   - **Action:** Review offer strategy, pricing, messaging
   - **Frequency:** Bi-weekly

---

## 7. WHATSAPP-FIRST VALIDATION

### Is WhatsApp the Primary Action in the UI?

**✅ YES - Evidence:**

1. **Pipeline Board:** Each lead card has prominent "📱 WhatsApp" button
2. **Lead Detail Page:** WhatsApp quick action is FIRST button (before email)
3. **Communication Hub:** WhatsApp tab is default view (email is secondary)
4. **Task Actions:** "Send WhatsApp" is default completion method for most tasks
5. **Offer Sending:** One-click WhatsApp send (email requires extra step)
6. **Payment Reminders:** WhatsApp is auto-selected channel (email is opt-in)

---

### Are Email/SMS Clearly Secondary Options?

**✅ YES - Evidence:**

1. **Visual Hierarchy:** WhatsApp buttons are green (prominent), email is gray
2. **Button Order:** WhatsApp always appears before email in action lists
3. **Default Selection:** WhatsApp pre-selected in all communication forms
4. **Automation:** Auto-reminders default to WhatsApp, email is fallback
5. **Analytics:** WhatsApp metrics shown first in reports

---

### Can Counselors Complete Their Work Using Only WhatsApp?

**✅ YES - Core Workflow Without Email:**

1. **Welcome Lead:** Send WhatsApp welcome message ✅
2. **Book Demo:** WhatsApp with calendar link ✅
3. **Send Demo Reminder:** WhatsApp template ✅
4. **Follow-Up After Demo:** WhatsApp message ✅
5. **Send Offer:** WhatsApp offer card image ✅
6. **Create Fee Plan:** Send payment schedule via WhatsApp ✅
7. **Payment Reminders:** WhatsApp with payment link ✅
8. **Send Receipt:** WhatsApp PDF receipt ✅

**Email Only Needed For:**

- Formal documentation (agreements, contracts)
- Backup if student doesn't use WhatsApp
- Compliance/audit trail

---

### Are WhatsApp Templates Easy to Access and Use?

**✅ YES - UX Features:**

1. **Always Accessible:** Template library button on every lead page
2. **Categorized:** Welcome, Demo, Offer, Payment (easy to find right template)
3. **Search:** Type keyword to filter templates
4. **Preview:** See personalized message before sending
5. **Favorites:** Star frequently used templates for quick access
6. **One-Click Send:** No multi-step process
7. **Recent Templates:** Show last 3 used templates for repeat sending

---

## 8. MOBILE EXPERIENCE VALIDATION

### Can Counselors Do These Tasks on Mobile?

**Task 1: Review Today's Leads**

- **Mobile UX:**
  - Pipeline board in vertical scroll (not horizontal drag-drop)
  - Card view optimized for mobile screen width
  - Swipe lead card left to reveal quick actions
  - Filter by stage with dropdown (not tabs)
- **Success Criteria:**
  - Page loads in < 3 seconds on 4G
  - All lead info visible without zooming
  - Touch targets > 44px for easy tapping

---

**Task 2: Send WhatsApp Message**

- **Mobile UX:**
  - Template library opens in bottom sheet (native mobile pattern)
  - Large touch targets for template selection
  - Message preview in full-screen modal
  - One-tap send button (prominent, easy to reach)
- **Success Criteria:**
  - Send message in < 30 seconds
  - No horizontal scrolling required
  - Works offline (queues message for later send)

---

**Task 3: Create Quick Offer**

- **Mobile UX:**
  - Offer form in single-column layout
  - Large input fields for easy typing
  - Dropdown selectors for common values (discount %, duration)
  - Numeric keyboard auto-opens for price fields
  - Preview offer card in full-screen before sending
- **Success Criteria:**
  - Create and send offer in < 2 minutes on mobile
  - Form validation prevents errors
  - Offer card readable on small screen

---

**Task 4: Mark Task as Complete**

- **Mobile UX:**
  - Swipe right on task to complete (gesture-based)
  - OR tap checkbox for traditional completion
  - Completion confirmation with undo option (3 seconds)
  - Add completion note via mobile-optimized text input
- **Success Criteria:**
  - Complete task in 2 taps
  - No accidental completions
  - Undo available for mistakes

---

**Task 5: Check Payment Status**

- **Mobile UX:**
  - Lead detail page → Fee Plan section (expandable)
  - Payment timeline in vertical scroll
  - Status badges: Paid (green), Pending (yellow), Overdue (red)
  - Tap installment to see payment details
  - One-tap to send payment reminder
- **Success Criteria:**
  - Find payment status in < 10 seconds
  - All info visible without scrolling
  - Actions (remind, receipt) easily accessible

---

**Additional Mobile Features:**

- **Push Notifications:** New lead assigned, task due, payment received
- **Offline Mode:** View lead info offline, sync when back online
- **Voice Input:** Add notes via voice (speech-to-text)
- **Click-to-Call:** Tap phone number to call directly
- **WhatsApp Deep Link:** Tap WhatsApp button to open WhatsApp app

---

## 9. DATA PRIVACY & COMPLIANCE

### Student Data Protection

**GDPR-Like Principles:**

1. **Data Minimization:** Collect only necessary data (name, phone, email, course interest)
2. **Purpose Limitation:** Use data only for enrollment purposes, not marketing without consent
3. **Storage Limitation:** Archive enrolled students after 2 years, delete inactive leads after 1 year
4. **Accuracy:** Allow students to update their info (email, phone)
5. **Security:** Encrypt sensitive data (phone numbers, payment info) at rest and in transit

---

### Secure Storage of Phone Numbers and Emails

**Technical Implementation:**

- **Encryption:** AES-256 encryption for phone and email fields in database
- **Access Control:** Only counselors assigned to lead can view full phone number
- **Hashing:** One-way hash phone for duplicate detection (can't reverse to original)
- **Tokenization:** Payment data tokenized via Razorpay (PCI-DSS compliant)
- **SSL/TLS:** All API calls over HTTPS
- **Environment Variables:** API keys in environment variables, not code

---

### Audit Logs for All Counselor Actions

**What Gets Logged:**

- Every lead view (who viewed, when)
- Every message sent (type, content, timestamp)
- Every stage change (old stage → new stage, reason)
- Every offer created (amount, expiry)
- Every fee plan created (amount, installments)
- Every payment recorded (amount, method)
- Every task completed (completion time, notes)
- Every login/logout (IP address, device)

**Log Storage:**

- Immutable logs (cannot be edited or deleted)
- Stored for 3 years for audit purposes
- Admin-only access to full logs
- Counselors can see their own activity log

---

### Data Deletion Requests

**Student Right to Be Forgotten:**

1. Student submits deletion request via email
2. Admin verifies identity (email from registered email address)
3. Admin initiates deletion in system:
   - Mark lead as "DELETION_REQUESTED"
   - Archive all communications (for legal compliance, 30 days)
   - Anonymize personal data: Replace name with "Deleted User", phone with "DELETED", email with "deleted@example.com"
   - Retain transaction records (legal requirement for 7 years) but anonymized
4. Send confirmation to student: "Your data has been deleted"
5. Log deletion in audit trail

**Retention Exceptions (Legal Compliance):**

- Payment records (tax purposes): 7 years
- Signed contracts: 7 years
- Audit logs: 3 years

---

### Export Student Data

**Student Right to Data Portability:**

1. Student requests data export via email
2. Admin generates export:
   - JSON or CSV format
   - Includes: Personal info, communication history, offers, fee plans, payments
   - Excludes: Internal counselor notes, other students' data
3. Encrypt export file with password
4. Send download link via email (expires in 24 hours)
5. Log export in audit trail

---

**Compliance Checklist:**

- [ ] Privacy policy updated with data usage details
- [ ] Consent checkbox on demo booking form ("I agree to be contacted via WhatsApp/Email")
- [ ] Opt-out option in every WhatsApp message
- [ ] Data retention policy documented
- [ ] Security audit completed before launch
- [ ] Staff training on data privacy best practices

---

## 10. SUCCESS METRICS DEFINITION

### For Counselors (Individual Performance)

**Metric 1: Lead-to-Demo Conversion**

- **Definition:** % of assigned leads who book a demo
- **Target:** 60%+
- **Current Baseline:** 40%
- **How to Measure:** (Leads with stage "DEMO_SCHEDULED" or beyond) / (Total leads assigned) × 100
- **Improvement Strategy:** Faster response time, better welcome messages, WhatsApp follow-ups

---

**Metric 2: Demo-to-Enrollment Conversion**

- **Definition:** % of demo attendees who enroll and pay
- **Target:** 30%+
- **Current Baseline:** 20%
- **How to Measure:** (Leads with stage "ENROLLED") / (Leads with stage "DEMO_COMPLETED" or beyond) × 100
- **Improvement Strategy:** Personalized offers, flexible fee plans, immediate follow-ups

---

**Metric 3: Average Response Time**

- **Definition:** Average time from lead assignment to first contact
- **Target:** < 2 hours
- **Current Baseline:** 6+ hours
- **How to Measure:** Average of (firstCommunication.sentAt - lead.createdAt) for all leads
- **Improvement Strategy:** Mobile notifications, auto-reminders, easier WhatsApp sending

---

**Metric 4: Task Completion Rate**

- **Definition:** % of tasks completed on or before due date
- **Target:** 95%+
- **Current Baseline:** 60%
- **How to Measure:** (Tasks completed on time) / (Total tasks assigned) × 100
- **Improvement Strategy:** Clear priorities, realistic due dates, auto-reminders

---

**Metric 5: Revenue Per Lead**

- **Definition:** Average revenue generated per assigned lead
- **Target:** ₹15,000+
- **Current Baseline:** ₹8,000
- **How to Measure:** (Total revenue from converted leads) / (Total leads assigned)
- **Improvement Strategy:** Higher-value course selling, upsells, better conversion

---

### For Business (Organizational KPIs)

**Metric 1: Payment Collection Rate**

- **Definition:** % of due payments collected on time
- **Target:** 95%+
- **Current Baseline:** 75%
- **How to Measure:** (Installments paid on due date) / (Total installments due) × 100
- **Improvement Strategy:** Automated reminders, easy payment links, flexible plans

---

**Metric 2: Lead Wastage Rate**

- **Definition:** % of leads marked as "LOST" due to poor follow-up (excludes "not interested")
- **Target:** < 10%
- **Current Baseline:** 30%
- **How to Measure:** (Leads lost with reason "no follow-up" or "unresponsive counselor") / (Total leads) × 100
- **Improvement Strategy:** Automated task creation, manager oversight, re-assignment

---

**Metric 3: Counselor Efficiency**

- **Definition:** Average number of active leads managed per counselor
- **Target:** 50+ leads per counselor
- **Current Baseline:** 20 leads per counselor
- **How to Measure:** Average(currentLeadsCount) across all counselors
- **Improvement Strategy:** Automation reduces manual work, allowing more leads per counselor

---

**Metric 4: Monthly Revenue Growth**

- **Definition:** Month-over-month revenue increase
- **Target:** +25% quarterly growth
- **Current Baseline:** 10% quarterly growth
- **How to Measure:** ((This quarter revenue - Last quarter revenue) / Last quarter revenue) × 100
- **Improvement Strategy:** More leads, better conversion, higher-value courses

---

**Metric 5: System Adoption Rate**

- **Definition:** % of counselors using dashboard as primary tool (not spreadsheets)
- **Target:** 100% daily active usage within 1 week of launch
- **Current Baseline:** 0% (no system exists)
- **How to Measure:** (Counselors who logged in today) / (Total counselors) × 100
- **Improvement Strategy:** Training, ease of use, manager enforcement

---

### For Admin (Oversight & Control)

**Metric 1: Real-Time Visibility**

- **Definition:** Ability to see all counselor activities instantly
- **Target:** 100% activities logged and visible within 1 minute
- **How to Measure:** Activity feed latency (time from action to dashboard display)
- **Improvement Strategy:** Real-time database updates, WebSocket notifications

---

**Metric 2: Revenue Attribution Accuracy**

- **Definition:** % of revenue correctly attributed to counselor
- **Target:** 100% accuracy
- **How to Measure:** Manual audit of 20 random enrollments per month
- **Improvement Strategy:** Automated tracking, no manual overrides

---

**Metric 3: Forecast Accuracy**

- **Definition:** How close revenue forecast is to actual revenue
- **Target:** ±10% variance
- **How to Measure:** |Forecasted revenue - Actual revenue| / Actual revenue × 100
- **Improvement Strategy:** Better conversion rate tracking, payment plan adherence

---

**Metric 4: Issue Resolution Time**

- **Definition:** Time from alert to resolution (e.g., unassigned lead, overdue payment)
- **Target:** < 1 hour for critical alerts
- **How to Measure:** Average(alert.resolvedAt - alert.createdAt)
- **Improvement Strategy:** Clear alerts, one-click actions, mobile access for admins

---

### Dashboard: KPI Tracking

**Real-Time KPI Dashboard for Admin:**

```
┌──────────────────────────────────────────────────────────────┐
│  📊 KEY PERFORMANCE INDICATORS - November 2025               │
├──────────────────────────────────────────────────────────────┤
│                                                               │
│  CONVERSION METRICS                                          │
│  ┌─────────────────────┬─────────────────────┬─────────────┐│
│  │ Lead → Demo         │ Demo → Enrollment   │ Overall     ││
│  │ 68% ✅ (Target 60%) │ 32% ✅ (Target 30%) │ 22% ✅      ││
│  │ ↑ 28% from last mo  │ ↑ 12% from last mo  │ ↑ 7%        ││
│  └─────────────────────┴─────────────────────┴─────────────┘│
│                                                               │
│  EFFICIENCY METRICS                                          │
│  ┌─────────────────────┬─────────────────────┬─────────────┐│
│  │ Avg Response Time   │ Task Completion     │ Leads/Coun. ││
│  │ 1.8h ✅ (Target 2h) │ 96% ✅ (Target 95%) │ 52 ✅       ││
│  │ ↓ 4.2h improvement  │ ↑ 36% improvement   │ ↑ 32 leads  ││
│  └─────────────────────┴─────────────────────┴─────────────┘│
│                                                               │
│  FINANCIAL METRICS                                           │
│  ┌─────────────────────┬─────────────────────┬─────────────┐│
│  │ Revenue (Month)     │ Collection Rate     │ Rev/Lead    ││
│  │ ₹32L ✅ (+28%)      │ 97% ✅ (Target 95%) │ ₹16.5K ✅   ││
│  │ Target: ₹30L        │ ↑ 22% improvement   │ ↑ ₹8.5K     ││
│  └─────────────────────┴─────────────────────┴─────────────┘│
│                                                               │
│  SYSTEM ADOPTION                                             │
│  ┌─────────────────────┬─────────────────────────────────── ││
│  │ Daily Active Users  │ 6/6 counselors (100%) ✅           ││
│  │ Avg Session Time    │ 4.2 hours/day                      ││
│  │ Mobile Usage        │ 65% of sessions on mobile          ││
│  └─────────────────────┴─────────────────────────────────── ││
└──────────────────────────────────────────────────────────────┘
```

---

## CONCLUSION: PRODUCT REQUIREMENTS VALIDATED

This document serves as the **single source of truth** for what the Counselor Dashboard must accomplish. Every feature, workflow, and metric has been validated against business goals:

### ✅ Validation Checklist

**Business Value Validated:**

- [x] Every feature ties to measurable business outcome (conversion, efficiency, revenue)
- [x] Edge cases identified and solutions documented
- [x] Success metrics defined with clear targets
- [x] Failure scenarios handled gracefully

**User Experience Validated:**

- [x] Counselor workflows optimized for speed (< 2 min per action)
- [x] WhatsApp-first design confirmed (primary channel, easy access)
- [x] Mobile experience validated (all core tasks possible on phone)
- [x] Admin oversight comprehensive (100% visibility)

**Technical Feasibility Validated:**

- [x] Business logic rules documented and consistent
- [x] Data privacy and compliance addressed
- [x] Performance considerations (1000+ leads scalability)
- [x] API integration risks mitigated (rate limits, failures)

**Prioritization Validated:**

- [x] MVP features (Must Have) are launch-critical and deliver 80% value
- [x] Nice-to-have features (Should Have) enhance but don't block launch
- [x] Future features (Could Have) deferred to post-launch validation
- [x] Out-of-scope features (Won't Have) explicitly excluded

---

### 🎯 Expected Outcomes (90 Days Post-Launch)

**Counselor Productivity:**

- 3x increase in leads managed per counselor (20 → 60)
- 70% reduction in time spent on admin tasks
- 95%+ task completion rate (up from 60%)

**Conversion Improvement:**

- 40%+ increase in lead-to-enrollment conversion (15% → 30%)
- 60%+ lead-to-demo conversion (up from 40%)
- 50% reduction in lead wastage (30% → 10%)

**Revenue Impact:**

- 25%+ quarterly revenue growth
- 95%+ payment collection rate (up from 75%)
- ₹30L+ monthly recurring revenue

**System Adoption:**

- 100% counselors using daily within 1 week
- 70%+ of counselor work done on mobile
- 90%+ counselor satisfaction (NPS score)

---

### 🚀 Ready for Development

With product requirements validated, the system is ready for:

1. **Technical Planning Agent:** Database schema, API design, architecture
2. **UI/UX Agent:** Component design, interaction patterns, HubSpot-inspired mockups
3. **Backend Agent:** API implementation, business logic, integrations
4. **Frontend Agent:** React components, state management, responsive design
5. **Testing & Deployment:** User acceptance testing, training, rollout

**This document will be referenced throughout development to ensure alignment with business goals. Any feature changes must update this document first.**

---

**Document Prepared By:** Product Agent (AI)
**Date:** November 10, 2025
**Status:** Approved for Development
**Next Review:** After MVP launch (feedback-driven iteration)
