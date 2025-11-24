# Automated Follow-up System - Integration Documentation

## System Overview

The automated follow-up system is a comprehensive lead engagement automation platform that automatically triggers follow-up communications based on configurable rules and lead behaviors.

## Architecture Components

### 1. Core Processing Engine (`src/lib/`)

#### followupEngine.ts - Rule Evaluation Engine

Evaluates trigger conditions and determines when follow-ups should be sent.

**Key Functions:**

- `evaluateRule(leadId, ruleId)` - Evaluates if a specific rule should trigger for a lead
- `processLeadRules(leadId)` - Processes all active rules for a specific lead
- `processTimeTriggers()` - Evaluates time-based triggers for all leads (cron job)

**Supported Trigger Types (8 total):**

1. **STAGE_CHANGE**: Triggers when lead moves to a specific stage
2. **TIME_BASED**: Triggers after N days since lead creation
3. **SCORE_THRESHOLD**: Triggers when lead score reaches threshold
4. **INACTIVITY**: Triggers after N days of no contact
5. **DEMO_NO_SHOW**: Triggers when demo is scheduled but not attended
6. **DEMO_COMPLETED**: Triggers after demo completion
7. **OFFER_SENT**: Triggers after offer is sent
8. **CUSTOM**: Triggers based on custom conditions

#### followupProcessor.ts - Queue Processor

Executes queued follow-up actions with retry logic.

**Key Functions:**

- `processQueue()` - Processes up to 50 pending queue items (cron job)
- `executeFollowup(queueItem)` - Executes a specific follow-up action
- `cancelQueueItem(queueItemId, reason)` - Cancels a queued follow-up
- `skipQueueItem(queueItemId, reason)` - Skips a queued follow-up

**Supported Action Types (6 total):**

1. **EMAIL**: Sends automated email (stub implementation)
2. **WHATSAPP**: Sends WhatsApp message (stub implementation)
3. **SMS**: Sends SMS message (stub implementation)
4. **CALL_TASK**: Creates a call task for counselor
5. **NOTIFICATION**: Creates in-app notification (stub implementation)
6. **TASK**: Creates a generic follow-up task for counselor

**Retry Mechanism:**

- Max attempts: 3 (configurable per queue item)
- Retry delay: 30 minutes
- Status flow: PENDING → PROCESSING → COMPLETED/FAILED
- Failed items automatically rescheduled until max attempts reached

#### templateRenderer.ts - Template Renderer

Renders message templates with lead data substitution.

**Key Functions:**

- `renderTemplate(template, lead)` - Renders template with lead data
- `validateTemplate(content)` - Validates template placeholders
- `previewTemplate(content)` - Generates preview with sample data

**Available Template Variables (36 total):**

- Lead Info: `studentName`, `email`, `phone`, `courseInterest`
- Status: `stage`, `priority`, `score`
- Counselor: `assignedCounselor`, `counselorEmail`, `counselorPhone`
- Source: `source`
- Dates: `createdDate`, `lastContactDate`, `nextFollowUpDate`, `demoDate`
- Metrics: `offerAmount`, `communicationCount`, `taskCount`, `daysSinceCreation`, `daysSinceContact`

**Template Syntax:**

- Variables: `{{variableName}}`
- Conditionals: `{{#if variableName}}content{{/if}}`

### 2. API Endpoints (`src/app/api/counselor/followup/`)

#### Rules Management

- `GET/POST /api/counselor/followup/rules` - List/create rules
- `GET/PUT/DELETE /api/counselor/followup/rules/[id]` - View/update/delete rule

**Features:**

- Template validation against action type
- Smart deletion (soft delete if used, hard delete otherwise)
- Usage statistics with queue status breakdown
- Activity logging

#### Templates Management

- `GET/POST /api/counselor/followup/templates` - List/create templates
- `GET/PUT/DELETE /api/counselor/followup/templates/[id]` - View/update/delete template

**Features:**

- Template placeholder validation
- Invalid placeholder detection
- Subject requirement for EMAIL templates
- Usage count tracking

#### Queue Management

- `GET /api/counselor/followup/queue` - List queued follow-ups
- `GET/POST /api/counselor/followup/queue/[id]` - View/execute queue item

**Actions Available:**

- `execute` - Manually trigger immediate execution
- `cancel` - Cancel scheduled follow-up
- `skip` - Skip follow-up without sending
- `retry` - Manually retry failed execution

#### History & Analytics

- `GET /api/counselor/followup/history` - View sent follow-ups
- `GET /api/counselor/followup/analytics` - Performance metrics

**Analytics Metrics:**

- Overview: total, sent, failed, success rate, avg delivery time
- Rule performance: effectiveness by rule
- Channel performance: effectiveness by channel
- Daily trends: visualization data
- Queue statistics: status breakdown
- Top engaged leads: highest follow-up counts

### 3. Cron Job Endpoints (`src/app/api/cron/`)

#### Queue Processing Cron

**Endpoint:** `POST /api/cron/followup-queue`

- **Schedule:** Every 5-10 minutes
- **Function:** Processes pending queue items
- **Auth:** Bearer token using `CRON_SECRET` env variable
- **Batch Size:** 50 items per run

#### Trigger Processing Cron

**Endpoint:** `POST /api/cron/followup-triggers`

- **Schedule:** Every hour or daily
- **Function:** Evaluates time-based triggers
- **Auth:** Bearer token using `CRON_SECRET` env variable

**Setup Instructions:**

```env
# Add to .env
CRON_SECRET=your-secret-token-here
```

**Example Cron Configuration (Vercel):**

```json
{
  "crons": [
    {
      "path": "/api/cron/followup-queue",
      "schedule": "*/5 * * * *"
    },
    {
      "path": "/api/cron/followup-triggers",
      "schedule": "0 * * * *"
    }
  ]
}
```

### 4. UI Components (`src/app/counselor/followup/`)

#### Rules Management Page

**Path:** `/counselor/followup/rules`

- Statistics dashboard (total, active, pending, completed)
- Advanced filtering (trigger type, action type, status)
- Search functionality
- Activate/deactivate toggle
- Edit and delete actions

#### Templates Management Page

**Path:** `/counselor/followup/templates`

- Statistics dashboard (total, active, in-use, validation issues)
- Channel-based filtering
- Template validation display
- Activate/deactivate toggle
- Smart deletion with usage checking

#### Queue Viewing Page

**Path:** `/counselor/followup/queue`

- Statistics dashboard (total, pending, completed, failed)
- Status-based filtering
- Action buttons (execute, cancel, skip, retry)
- Pagination support

#### History Viewing Page

**Path:** `/counselor/followup/history`

- Statistics dashboard (total, sent, failed, success rate)
- Channel breakdown visualization
- Advanced filtering (status, channel, date range)
- Content preview

#### Analytics Dashboard

**Path:** `/counselor/followup/analytics`

- Period selection (week, month, quarter, year)
- Overview metrics
- Rule performance analysis
- Channel performance breakdown
- Queue statistics
- Top engaged leads
- Daily trends visualization

## Integration Flow

### 1. Rule Creation Flow

```
Counselor creates rule via UI
  ↓
POST /api/counselor/followup/rules
  ↓
Validates template compatibility
  ↓
Creates followup_rule record
  ↓
Rule is now active (if isActive=true)
```

### 2. Automatic Trigger Flow

```
Lead data changes (stage, score, etc.)
  ↓
evaluateRule() checks all active rules
  ↓
Rule condition matches
  ↓
Creates followup_queue item
  ↓
Scheduled based on rule.delayMinutes
```

### 3. Queue Processing Flow

```
Cron job calls processQueue() every 5-10min
  ↓
Fetches up to 50 due items (scheduledFor <= now, status=PENDING)
  ↓
For each item:
  - Updates status to PROCESSING
  - Executes action (email, whatsapp, task, etc.)
  - On success: status=COMPLETED, creates history record
  - On failure: retries or status=FAILED
```

### 4. Template Rendering Flow

```
Queue item ready for execution
  ↓
Load template from rule.templateId
  ↓
renderTemplate(template, lead)
  ↓
Extract variables from lead data
  ↓
Replace {{placeholders}} in template.content
  ↓
Handle {{#if}}conditional{{/if}} blocks
  ↓
Return rendered content
```

## Database Schema

### followup_rules

```prisma
- id: String (cuid)
- name: String
- description: String?
- triggerType: FollowupTrigger
- triggerConditions: Json
- actionType: FollowupAction
- templateId: String?
- priority: LeadPriority
- isActive: Boolean
- delayMinutes: Int (default: 0)
- createdById: String
- createdAt, updatedAt: DateTime
```

### followup_templates

```prisma
- id: String (cuid)
- name: String
- description: String?
- channel: String (EMAIL, WHATSAPP, SMS, etc.)
- subject: String? (required for EMAIL)
- content: String @db.Text
- isActive: Boolean
- createdById: String
- createdAt, updatedAt: DateTime
```

### followup_queue

```prisma
- id: String (cuid)
- leadId: String
- ruleId: String
- scheduledFor: DateTime
- status: QueueStatus (PENDING, PROCESSING, COMPLETED, FAILED, SKIPPED, CANCELLED)
- attempt: Int (default: 0)
- maxAttempts: Int (default: 3)
- lastAttemptAt: DateTime?
- completedAt: DateTime?
- errorMessage: String?
- metadata: Json?
- createdAt, updatedAt: DateTime
```

### followup_history

```prisma
- id: String (cuid)
- leadId: String
- ruleId: String?
- action: FollowupAction
- channel: String?
- content: String? @db.Text
- sentAt: DateTime @default(now())
- status: String (SENT, FAILED)
- metadata: Json?
- createdById: String?
- isAutomated: Boolean @default(true)
```

## Error Handling

### Queue Processing Errors

- **Network failures**: Automatic retry with exponential backoff
- **Invalid lead data**: Skip and log error
- **Template rendering errors**: Mark as FAILED, log error
- **Max attempts reached**: Mark as FAILED, no further retries

### API Endpoint Errors

- **Authentication failures**: Return 401 Unauthorized
- **Validation errors**: Return 400 Bad Request with details
- **Not found errors**: Return 404 Not Found
- **Server errors**: Return 500 Internal Server Error with message

## Testing Recommendations

### 1. Unit Tests

- Test each trigger type evaluation logic
- Test template rendering with various lead data combinations
- Test queue processing with different statuses

### 2. Integration Tests

- Test complete flow from rule creation to execution
- Test retry mechanism with simulated failures
- Test concurrent queue processing

### 3. End-to-End Tests

- Create rule via UI
- Trigger rule with lead data change
- Verify queue item created
- Verify execution and history creation

## Performance Considerations

### Optimization Strategies

1. **Queue Processing**: Batch processing (50 items) to reduce database queries
2. **Duplicate Prevention**: Check for existing PENDING/PROCESSING items before creating queue item
3. **Index Usage**: Database indexes on leadId, ruleId, status, scheduledFor
4. **Pagination**: API endpoints use pagination to limit data transfer
5. **Caching**: Consider caching active rules to reduce database queries

### Scalability

- **Horizontal Scaling**: Multiple cron job instances can process queue concurrently
- **Rate Limiting**: Implement rate limits for external API calls (email, SMS, WhatsApp)
- **Queue Prioritization**: Process HOT leads before WARM/COLD leads

## Security Considerations

1. **Cron Job Authentication**: Bearer token authentication prevents unauthorized access
2. **Authorization**: Counselors can only access their assigned leads
3. **Input Validation**: All API endpoints validate input data
4. **SQL Injection Prevention**: Prisma ORM prevents SQL injection
5. **XSS Prevention**: Template rendering sanitizes output

## Monitoring & Logging

### Key Metrics to Monitor

- Queue processing success rate
- Average delivery time
- Failed execution rate by action type
- Rule effectiveness (conversion rate)
- Queue backlog size

### Logging Points

- Rule evaluation results
- Queue item creation
- Execution attempts (success/failure)
- Retry scheduling
- Error messages with context

## Future Enhancements

1. **Email Integration**: Implement actual email sending (currently stub)
2. **WhatsApp Integration**: Implement actual WhatsApp API integration
3. **SMS Integration**: Implement actual SMS gateway integration
4. **A/B Testing**: Support testing different templates
5. **Smart Scheduling**: ML-based optimal send time prediction
6. **Unsubscribe Management**: Handle opt-outs and preferences
7. **Multi-language Support**: Template translation system
8. **Advanced Analytics**: Conversion funnel analysis, ROI tracking

## Troubleshooting Guide

### Issue: Queue items not processing

**Check:**

1. Cron job is running (check logs)
2. CRON_SECRET is configured correctly
3. Queue items have correct scheduledFor time
4. No database connection issues

### Issue: Rules not triggering

**Check:**

1. Rule isActive=true
2. Trigger conditions are correctly configured
3. Lead data matches trigger conditions
4. No duplicate queue items exist

### Issue: Template rendering errors

**Check:**

1. Template has valid placeholders
2. Lead data contains required fields
3. Conditional syntax is correct
4. Template validation passed

## Contact & Support

For issues or questions about the automated follow-up system:

- Review this documentation
- Check system logs for error messages
- Test with sample data in development environment
- Contact development team for assistance
