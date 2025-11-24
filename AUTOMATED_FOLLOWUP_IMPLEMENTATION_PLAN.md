# Automated Follow-up System Implementation Plan

## Overview

The Automated Follow-up System is a comprehensive feature that enables counselors to automate lead follow-up tasks based on configurable rules and triggers. This system will significantly reduce manual work and ensure no leads fall through the cracks.

## Architecture

### Database Schema (4 New Tables + 2 Enums)

#### 1. `followup_rules` Table

```prisma
model followup_rules {
  id                String          @id
  name              String          // e.g., "Follow up 3 days after demo"
  description       String?
  isActive          Boolean         @default(true)
  triggerType       FollowupTrigger // STAGE_CHANGE, TIME_BASED, SCORE_THRESHOLD, INACTIVITY
  triggerConditions Json            // Specific conditions for trigger
  delayMinutes      Int             // Delay before follow-up (in minutes)
  actionType        FollowupAction  // EMAIL, WHATSAPP, CALL_TASK, SMS, NOTIFICATION
  templateId        String?
  priority          Priority        @default(WARM)
  assignToCounselor Boolean         @default(true)
  createdBy         String
  updatedBy         String?
  createdAt         DateTime        @default(now())
  updatedAt         DateTime

  template          followup_templates? @relation(fields: [templateId], references: [id])
  user              users               @relation(fields: [createdBy], references: [id])
  followup_queue    followup_queue[]

  @@index([isActive, triggerType])
}

enum FollowupTrigger {
  STAGE_CHANGE       // When lead moves to specific stage
  TIME_BASED         // After X days/hours
  SCORE_THRESHOLD    // When score reaches threshold
  INACTIVITY         // No contact for X days
  DEMO_NO_SHOW       // Demo scheduled but not attended
  DEMO_COMPLETED     // After demo completion
  OFFER_SENT         // After offer is sent
  CUSTOM             // Custom condition
}

enum FollowupAction {
  EMAIL              // Send automated email
  WHATSAPP           // Send WhatsApp message
  CALL_TASK          // Create task for call
  SMS                // Send SMS
  NOTIFICATION       // In-app notification
  TASK               // Generic task creation
}
```

#### 2. `followup_templates` Table

```prisma
model followup_templates {
  id            String   @id
  name          String
  description   String?
  channel       FollowupAction
  subject       String?  // For emails
  content       String   // Template with placeholders
  variables     Json     // Available variables
  isActive      Boolean  @default(true)
  createdBy     String
  createdAt     DateTime @default(now())
  updatedAt     DateTime

  user          users            @relation(fields: [createdBy], references: [id])
  rules         followup_rules[]

  @@index([channel, isActive])
}
```

#### 3. `followup_queue` Table

```prisma
model followup_queue {
  id                String         @id
  leadId            String
  ruleId            String
  scheduledFor      DateTime       // When to execute
  status            QueueStatus    @default(PENDING)
  attempt           Int            @default(0)
  maxAttempts       Int            @default(3)
  lastAttemptAt     DateTime?
  completedAt       DateTime?
  errorMessage      String?
  metadata          Json?          // Additional context
  createdAt         DateTime       @default(now())
  updatedAt         DateTime

  lead              leads          @relation(fields: [leadId], references: [id], onDelete: Cascade)
  rule              followup_rules @relation(fields: [ruleId], references: [id])

  @@index([scheduledFor, status])
  @@index([leadId])
  @@index([status])
}

enum QueueStatus {
  PENDING
  PROCESSING
  COMPLETED
  FAILED
  SKIPPED
  CANCELLED
}
```

#### 4. `followup_history` Table

```prisma
model followup_history {
  id            String   @id
  leadId        String
  ruleId        String?
  action        FollowupAction
  channel       String?  // EMAIL, WHATSAPP, etc.
  content       String?
  sentAt        DateTime @default(now())
  status        String   // SENT, DELIVERED, FAILED, OPENED, CLICKED
  metadata      Json?
  createdBy     String?  // If manual
  isAutomated   Boolean  @default(true)

  lead          leads    @relation(fields: [leadId], references: [id], onDelete: Cascade)
  user          users?   @relation(fields: [createdBy], references: [id])

  @@index([leadId, sentAt])
  @@index([status])
}
```

---

## API Endpoints (7 New)

### 1. Follow-up Rules Management

**GET /api/counselor/followup/rules**

- List all follow-up rules
- Filters: isActive, triggerType
- Returns: Rules with template info and usage stats

**POST /api/counselor/followup/rules**

- Create new follow-up rule
- Body: Rule configuration
- Validates: Trigger conditions, template ID

**PUT /api/counselor/followup/rules/[id]**

- Update existing rule
- Allows: Pause/activate, update conditions

**DELETE /api/counselor/followup/rules/[id]**

- Delete rule (soft delete if has history)

### 2. Templates Management

**GET /api/counselor/followup/templates**

- List all templates by channel
- Returns: Templates with variable placeholders

**POST /api/counselor/followup/templates**

- Create new template
- Validates: Required variables, content format

**PUT /api/counselor/followup/templates/[id]**

- Update template content

### 3. Queue Management

**GET /api/counselor/followup/queue**

- View queued follow-ups
- Filters: status, leadId, scheduledFor
- Returns: Paginated queue with lead info

**POST /api/counselor/followup/queue/[id]/execute**

- Manually trigger queued item
- Forces immediate execution

**PUT /api/counselor/followup/queue/[id]/skip**

- Skip queued follow-up
- Reason: Manual override

### 4. History & Analytics

**GET /api/counselor/followup/history**

- View follow-up history
- Filters: leadId, dateRange, channel
- Returns: History with delivery stats

**GET /api/counselor/followup/analytics**

- Analytics dashboard data
- Metrics: Success rate, response rate, conversion rate
- Grouped by: Rule, channel, time period

---

## Core Logic & Helper Functions

### 1. Rule Evaluation Engine (`src/lib/followupEngine.ts`)

```typescript
// Evaluate if rule should trigger for a lead
export async function evaluateRule(leadId: string, ruleId: string): Promise<boolean> {
  // 1. Fetch lead and rule data
  // 2. Check trigger conditions
  // 3. Validate prerequisites
  // 4. Return true if should trigger
}

// Process all active rules for a lead
export async function processLeadRules(leadId: string): Promise<void> {
  // 1. Get all active rules
  // 2. Evaluate each rule
  // 3. Create queue items for triggered rules
  // 4. Log activity
}

// Check for time-based triggers (cron job)
export async function processTimeTriggers(): Promise<void> {
  // 1. Find leads matching time conditions
  // 2. Evaluate applicable rules
  // 3. Queue follow-ups
}
```

### 2. Queue Processor (`src/lib/followupProcessor.ts`)

```typescript
// Process pending queue items
export async function processQueue(): Promise<void> {
  // 1. Get due items (scheduledFor <= now, status=PENDING)
  // 2. For each item:
  //    - Update status to PROCESSING
  //    - Execute action
  //    - Update status (COMPLETED/FAILED)
  //    - Create history record
}

// Execute specific action
export async function executeFollowup(
  queueItem: FollowupQueue
): Promise<{ success: boolean; message: string }> {
  // Switch on action type:
  // - EMAIL: Send via email service
  // - WHATSAPP: Send via WhatsApp API
  // - CALL_TASK: Create task in tasks table
  // - NOTIFICATION: Create in-app notification
}
```

### 3. Template Renderer (`src/lib/templateRenderer.ts`)

```typescript
// Render template with lead data
export function renderTemplate(template: FollowupTemplate, lead: Lead): string {
  // Replace placeholders like {{studentName}}, {{courseInterest}}
  // Support conditional content
  // Handle missing data gracefully
}

// Available variables
export const TEMPLATE_VARIABLES = {
  studentName: 'Student name',
  email: 'Email address',
  phone: 'Phone number',
  courseInterest: 'Interested course',
  stage: 'Current lead stage',
  assignedCounselor: 'Counselor name',
  score: 'Lead score',
  // ... more
}
```

---

## UI Components (5 New)

### 1. Rules Management Page (`/counselor/followup/rules`)

**Features:**

- List of all rules with status badges
- Create/Edit rule modal
- Trigger type selector
- Condition builder UI
- Template selector
- Enable/disable toggle
- Usage statistics

**Components:**

- `RuleListTable` - Table with rules
- `RuleFormModal` - Create/edit form
- `ConditionBuilder` - Visual rule builder
- `RuleStatsCard` - Performance metrics

### 2. Templates Management (`/counselor/followup/templates`)

**Features:**

- Template cards by channel
- Template editor with preview
- Variable insertion helper
- Test template functionality
- Duplicate/clone templates

**Components:**

- `TemplateGrid` - Grid of templates
- `TemplateEditor` - Rich text editor
- `VariableInserter` - Dropdown for variables
- `TemplatePreview` - Live preview

### 3. Queue Dashboard (`/counselor/followup/queue`)

**Features:**

- Upcoming follow-ups timeline
- Status filters
- Manual execution
- Skip/cancel actions
- Bulk operations

**Components:**

- `QueueTimeline` - Visual timeline
- `QueueTable` - Detailed table view
- `QuickActions` - Execute/skip buttons

### 4. Follow-up History (`/counselor/followup/history`)

**Features:**

- Filterable history list
- Delivery status badges
- Response tracking
- Export functionality

**Components:**

- `HistoryList` - Paginated history
- `StatusBadge` - Color-coded status
- `FilterPanel` - Advanced filters

### 5. Analytics Dashboard Widget

**Features:**

- Success rate chart
- Channel performance
- Conversion attribution
- Trend analysis

**Components:**

- `FollowupAnalytics` - Main widget
- `PerformanceChart` - Bar/line charts
- `ChannelComparison` - Channel stats

---

## Implementation Phases

### Phase 1: Database & Core Logic (Est: 3-4 hours)

1. Add schema to Prisma
2. Run migration
3. Create core helper functions
4. Implement rule evaluation engine

### Phase 2: API Endpoints (Est: 4-5 hours)

1. Rules CRUD endpoints
2. Templates CRUD endpoints
3. Queue management endpoints
4. History and analytics endpoints

### Phase 3: Queue Processing (Est: 2-3 hours)

1. Implement processor logic
2. Add retry mechanism
3. Error handling
4. Logging

### Phase 4: UI Components (Est: 6-8 hours)

1. Rules management page
2. Templates page
3. Queue dashboard
4. History view
5. Analytics widget

### Phase 5: Integration & Testing (Est: 2-3 hours)

1. Integrate with existing lead management
2. Add automation triggers
3. Test all scenarios
4. Performance optimization

---

## Automation Triggers & Examples

### Example 1: Demo No-Show Follow-up

**Trigger:** Demo scheduled but not attended
**Delay:** 2 hours after scheduled time
**Action:** WhatsApp message
**Template:** "Hi {{studentName}}, we noticed you couldn't attend today's demo. Would you like to reschedule?"

### Example 2: Post-Demo Follow-up

**Trigger:** Demo status = COMPLETED
**Delay:** 1 day
**Action:** Email + Call task
**Template:** "Thank you for attending the demo! Here's what we discussed..."

### Example 3: Inactivity Alert

**Trigger:** No contact for 7 days
**Delay:** Immediate
**Action:** Task for counselor
**Content:** "Lead {{studentName}} hasn't been contacted in 7 days. Priority: {{priority}}"

### Example 4: Score-based Follow-up

**Trigger:** Score increases to 80+
**Delay:** Immediate
**Action:** Notification + Call task
**Content:** "Lead {{studentName}} is now HOT (score: {{score}}). Immediate action required!"

### Example 5: Stage Progression

**Trigger:** Stage changes from DEMO_COMPLETED to no action for 3 days
**Delay:** 3 days
**Action:** Email + Task
**Template:** "It's been 3 days since demo. Time to send offer to {{studentName}}."

---

## Cron Jobs / Scheduled Tasks

### 1. Queue Processor (Every 5 minutes)

```typescript
// Run via API route or external cron
POST / api / cron / process - followup - queue
// Processes all due queue items
```

### 2. Time-based Trigger Evaluator (Every hour)

```typescript
// Check for leads matching time-based rules
POST / api / cron / evaluate - time - triggers
// Creates queue items for matching leads
```

### 3. Cleanup Old Records (Daily)

```typescript
// Archive/delete old queue items and history
POST / api / cron / cleanup - followup - data
// Keeps last 90 days of history
```

---

## Integration Points

### 1. Lead Detail Page

- Show upcoming follow-ups
- Display follow-up history
- Manual trigger button

### 2. Lead Pipeline (Kanban)

- Badge for pending follow-ups
- Quick action to skip/execute

### 3. Dashboard

- Follow-up statistics widget
- Overdue follow-ups alert

### 4. Settings

- Global automation toggle
- Default templates
- Notification preferences

---

## Technical Considerations

### 1. Performance

- Index on scheduledFor and status
- Batch processing for queue
- Caching for templates

### 2. Reliability

- Retry mechanism for failures
- Idempotency for API calls
- Transaction safety

### 3. Scalability

- Queue-based architecture
- Async processing
- Rate limiting for external APIs

### 4. Security

- Role-based access (counselor only)
- Template validation
- Prevent injection attacks
- Audit logging

---

## Testing Checklist

- [ ] Rule creation and validation
- [ ] Template rendering with all variables
- [ ] Queue item creation on trigger
- [ ] Queue processor execution
- [ ] Email sending
- [ ] WhatsApp messaging
- [ ] Task creation
- [ ] Error handling and retries
- [ ] Manual override functionality
- [ ] Analytics accuracy
- [ ] Performance under load
- [ ] Cron job reliability

---

## Estimated Total Implementation Time

**18-23 hours** (2-3 full working days)

---

## Next Steps

1. Review this plan and prioritize phases
2. Set up development environment
3. Start with Phase 1 (Database & Core Logic)
4. Implement incrementally with testing
5. Deploy with feature flag for gradual rollout

---

## Success Metrics

After implementation, track:

- Follow-up completion rate
- Response rate improvement
- Time saved per counselor
- Conversion rate attribution
- System reliability (uptime, error rate)

---

_Document created: 2025-01-24_
_Project: Cerebrum Biology Academy Website_
_Feature: Automated Follow-up System_
