# Automated Follow-up System - Deployment Guide

## Table of Contents

1. [Overview](#overview)
2. [System Architecture](#system-architecture)
3. [Prerequisites](#prerequisites)
4. [Environment Configuration](#environment-configuration)
5. [Database Setup](#database-setup)
6. [Cron Job Configuration](#cron-job-configuration)
7. [Testing Integration](#testing-integration)
8. [Monitoring & Logging](#monitoring--logging)
9. [Troubleshooting](#troubleshooting)
10. [Performance Optimization](#performance-optimization)

---

## Overview

The Automated Follow-up System enables counselors to create intelligent follow-up rules that automatically send personalized communications to leads based on triggers like stage changes, time intervals, inactivity, and lead scores.

**Key Features:**

- Rule-based automation with 8 trigger types
- Template-driven messaging with 20+ variables
- Multi-channel support (Email, WhatsApp, SMS, Call Tasks, Notifications)
- Queue-based processing with retry logic
- Comprehensive analytics and performance tracking

**System Status:**

- Phase 1: Database Schema & Core Logic ✅
- Phase 2: API Endpoints (7/7) ✅
- Phase 3: Cron Job Endpoints & Lead Integration ✅
- Phase 4: UI Components (5/5) ✅
- Phase 5: Integration & Testing (Current)

---

## System Architecture

### Components

```
┌─────────────────────────────────────────────────────────────┐
│                     USER INTERFACES                          │
├─────────────────────────────────────────────────────────────┤
│  Rules Management  │  Templates  │  Queue  │  History       │
│  Analytics Dashboard                                         │
└─────────────────┬───────────────────────────────────────────┘
                  │
┌─────────────────▼───────────────────────────────────────────┐
│                     API LAYER                                │
├─────────────────────────────────────────────────────────────┤
│  Rules API  │  Templates API  │  Queue API  │  History API  │
│  Analytics API                                               │
└─────────────────┬───────────────────────────────────────────┘
                  │
┌─────────────────▼───────────────────────────────────────────┐
│                   CORE LOGIC                                 │
├─────────────────────────────────────────────────────────────┤
│  followupEngine.ts    │  Rule Evaluation & Triggers          │
│  followupProcessor.ts │  Queue Processing & Execution        │
│  templateRenderer.ts  │  Template Rendering                  │
└─────────────────┬───────────────────────────────────────────┘
                  │
┌─────────────────▼───────────────────────────────────────────┐
│                  CRON JOBS                                   │
├─────────────────────────────────────────────────────────────┤
│  /api/cron/followup-queue     │  Every 5-10 minutes          │
│  /api/cron/followup-triggers  │  Every hour                  │
└─────────────────┬───────────────────────────────────────────┘
                  │
┌─────────────────▼───────────────────────────────────────────┐
│                   DATABASE                                   │
├─────────────────────────────────────────────────────────────┤
│  followup_rules  │  followup_templates  │  followup_queue   │
│  followup_history  │  leads  │  users  │  tasks             │
└─────────────────────────────────────────────────────────────┘
```

### Data Flow

1. **Rule Creation**: Counselor creates rule with trigger conditions
2. **Trigger Evaluation**: System evaluates triggers (stage change, time, score, inactivity)
3. **Queue Generation**: Triggered rules create queue items
4. **Queue Processing**: Cron job processes queue every 5-10 minutes
5. **Action Execution**: System sends email/WhatsApp/SMS/creates tasks
6. **History Recording**: All actions logged in followup_history
7. **Analytics**: Performance metrics aggregated for dashboard

---

## Prerequisites

### Required Services

- PostgreSQL database (Supabase recommended)
- SMTP server for emails (Gmail, SendGrid, etc.)
- WhatsApp Business API (optional, for WhatsApp messages)
- SMS gateway (optional, for SMS messages)
- Cron service (Vercel Cron, cron-job.org, etc.)

### Required Environment Variables

- `DATABASE_URL`: PostgreSQL connection string
- `CRON_SECRET`: Secret token for cron job authentication
- `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`: Email configuration
- `WHATSAPP_ACCESS_TOKEN`, `WHATSAPP_PHONE_NUMBER_ID`: WhatsApp config (optional)

---

## Environment Configuration

### Step 1: Add CRON_SECRET to Environment

Generate a secure random token:

```bash
# Generate CRON_SECRET
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Add to `.env.local`:

```bash
CRON_SECRET=your-generated-secret-here
```

### Step 2: Configure Communication Channels

**Email (Required for EMAIL channel):**

```bash
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
SMTP_FROM=noreply@cerebrumbiologyacademy.com
```

**WhatsApp (Optional):**

```bash
WHATSAPP_ACCESS_TOKEN=your-permanent-access-token
WHATSAPP_PHONE_NUMBER_ID=your-phone-number-id
WHATSAPP_BUSINESS_ACCOUNT_ID=your-business-account-id
WHATSAPP_API_URL=https://graph.facebook.com/v18.0
```

**SMS (Optional):**

```bash
SMS_API_KEY=your-sms-api-key
SMS_API_URL=https://api.sms-provider.com
```

### Step 3: Verify Database Connection

Ensure `DATABASE_URL` is set correctly:

```bash
DATABASE_URL="postgresql://username:password@host:5432/database"
```

---

## Database Setup

### Step 1: Run Prisma Migrations

The database schema is already defined in `prisma/schema.prisma`. Run migrations:

```bash
# Generate Prisma Client
npx prisma generate

# Run migrations
npx prisma migrate deploy

# Verify schema
npx prisma db push
```

### Step 2: Verify Tables Created

Check that these tables exist:

- `followup_rules`
- `followup_templates`
- `followup_queue`
- `followup_history`

```bash
# Connect to database and list tables
npx prisma studio
```

### Step 3: Seed Initial Data (Optional)

Create sample templates and rules for testing:

```sql
-- Sample Welcome Email Template
INSERT INTO followup_templates (id, name, description, channel, subject, content, created_at, updated_at)
VALUES (
  gen_random_uuid(),
  'Welcome Email Template',
  'Automated welcome email for new leads',
  'EMAIL',
  'Welcome to Cerebrum Biology Academy',
  'Hi {{studentName}},

Thank you for your interest in Cerebrum Biology Academy! We are excited to help you achieve your academic goals.

Your counselor {{assignedCounselor}} will be in touch with you soon at {{email}}.

Best regards,
Cerebrum Biology Academy Team',
  NOW(),
  NOW()
);

-- Sample Welcome Rule
INSERT INTO followup_rules (
  id, name, description, trigger_type, trigger_conditions,
  action_type, delay_minutes, is_active, priority,
  template_id, created_by_id, created_at, updated_at
)
VALUES (
  gen_random_uuid(),
  'New Lead Welcome',
  'Send welcome email to new leads immediately',
  'STAGE_CHANGE',
  '{"stages": ["NEW_LEAD"]}',
  'EMAIL',
  0,
  true,
  'WARM',
  (SELECT id FROM followup_templates WHERE name = 'Welcome Email Template'),
  (SELECT id FROM users WHERE role = 'COUNSELOR' LIMIT 1),
  NOW(),
  NOW()
);
```

---

## Cron Job Configuration

### Option 1: Vercel Cron (Recommended for Vercel deployments)

Create `vercel.json` in project root:

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

**Schedule Explanation:**

- `*/5 * * * *`: Every 5 minutes (queue processing)
- `0 * * * *`: Every hour (trigger evaluation)

Deploy to Vercel and cron jobs will run automatically.

### Option 2: External Cron Service (cron-job.org, EasyCron, etc.)

**Queue Processing Job:**

- URL: `https://your-domain.com/api/cron/followup-queue`
- Method: POST
- Schedule: Every 5 minutes
- Headers:
  ```
  Authorization: Bearer your-cron-secret-here
  Content-Type: application/json
  ```

**Trigger Evaluation Job:**

- URL: `https://your-domain.com/api/cron/followup-triggers`
- Method: POST
- Schedule: Every 1 hour
- Headers:
  ```
  Authorization: Bearer your-cron-secret-here
  Content-Type: application/json
  ```

### Option 3: GitHub Actions (for self-hosted deployments)

Create `.github/workflows/cron-followup.yml`:

```yaml
name: Follow-up System Cron Jobs

on:
  schedule:
    - cron: '*/5 * * * *' # Every 5 minutes
    - cron: '0 * * * *' # Every hour

jobs:
  process-queue:
    runs-on: ubuntu-latest
    if: github.event.schedule == '*/5 * * * *'
    steps:
      - name: Process Follow-up Queue
        run: |
          curl -X POST https://your-domain.com/api/cron/followup-queue \
            -H "Authorization: Bearer ${{ secrets.CRON_SECRET }}" \
            -H "Content-Type: application/json"

  evaluate-triggers:
    runs-on: ubuntu-latest
    if: github.event.schedule == '0 * * * *'
    steps:
      - name: Evaluate Triggers
        run: |
          curl -X POST https://your-domain.com/api/cron/followup-triggers \
            -H "Authorization: Bearer ${{ secrets.CRON_SECRET }}" \
            -H "Content-Type: application/json"
```

---

## Testing Integration

### Step 1: Test Template Rendering

```typescript
// Test in Node.js or browser console
import { renderTemplate, validateTemplate } from '@/lib/followupEngine/templateRenderer'

const template = {
  content: 'Hi {{studentName}}, your email is {{email}}',
  subject: 'Welcome {{studentName}}',
}

const lead = {
  studentName: 'John Doe',
  email: 'john@example.com',
  phone: '+918826444334',
  stage: 'NEW_LEAD',
  priority: 'HOT',
}

const rendered = renderTemplate(template, lead)
console.log(rendered)
// Output: { subject: 'Welcome John Doe', content: 'Hi John Doe, your email is john@example.com' }

const validation = validateTemplate(template.content)
console.log(validation)
// Output: { valid: true, invalidPlaceholders: [], validPlaceholders: ['studentName', 'email'] }
```

### Step 2: Test Rule Evaluation

```typescript
// Create test lead and rule
const testLeadId = 'test-lead-id'
const testRuleId = 'test-rule-id'

// Manually trigger rule evaluation
await processLeadRules(testLeadId)

// Check queue for created items
const queueItems = await prisma.followupQueue.findMany({
  where: { leadId: testLeadId },
})

console.log('Queue items created:', queueItems.length)
```

### Step 3: Test Queue Processing

```typescript
// Manually process queue
await processQueue()

// Check history for executed items
const historyItems = await prisma.followupHistory.findMany({
  where: { leadId: testLeadId },
  orderBy: { createdAt: 'desc' },
  take: 10,
})

console.log('History items:', historyItems)
```

### Step 4: Test Cron Endpoints

```bash
# Test queue processing endpoint
curl -X POST http://localhost:3001/api/cron/followup-queue \
  -H "Authorization: Bearer your-cron-secret" \
  -H "Content-Type: application/json"

# Test trigger evaluation endpoint
curl -X POST http://localhost:3001/api/cron/followup-triggers \
  -H "Authorization: Bearer your-cron-secret" \
  -H "Content-Type: application/json"
```

### Step 5: Test Lead Update Integration

```typescript
// Update lead stage to trigger STAGE_CHANGE rules
await prisma.leads.update({
  where: { id: testLeadId },
  data: { stage: 'DEMO_SCHEDULED' },
})

// processLeadRules() should be called automatically from lead update API
// Check if queue items were created
const queueItems = await prisma.followupQueue.findMany({
  where: {
    leadId: testLeadId,
    status: 'PENDING',
  },
})

console.log('Triggered queue items:', queueItems.length)
```

---

## Monitoring & Logging

### Key Metrics to Monitor

1. **Queue Health:**
   - Pending items count
   - Processing time per item
   - Failed items rate
   - Retry attempts

2. **Rule Performance:**
   - Trigger frequency per rule
   - Success rate per rule
   - Failed executions

3. **Channel Performance:**
   - Delivery rates by channel
   - Response times
   - Error rates

4. **System Load:**
   - Queue processing duration
   - Database query performance
   - API response times

### Logging Strategy

**Console Logs:**

```typescript
console.log('[FollowupEngine] Processing lead rules:', leadId)
console.log('[FollowupProcessor] Queue item processed:', queueItemId, 'Status:', status)
console.error('[FollowupProcessor] Failed to send email:', error)
```

**Database Activity Logs:**

- All rule creations/updates/deletions logged in `activity` table
- All queue actions (execute, cancel, skip) logged
- Failed executions stored in `followup_history` with error details

**Monitoring Dashboard:**
Access at `/counselor/followup/analytics` for:

- Real-time queue statistics
- Rule performance metrics
- Channel effectiveness
- Top engaged leads

---

## Troubleshooting

### Issue: Queue Items Not Processing

**Symptoms:**

- Queue items stuck in PENDING status
- No items moving to COMPLETED

**Diagnosis:**

1. Check if cron job is running:
   ```bash
   # Check cron logs
   ```
2. Verify `CRON_SECRET` is set correctly
3. Test cron endpoint manually:
   ```bash
   curl -X POST https://your-domain.com/api/cron/followup-queue \
     -H "Authorization: Bearer your-cron-secret"
   ```

**Solutions:**

- Verify cron service is configured and running
- Check cron job schedule is correct
- Ensure `CRON_SECRET` matches in env and cron service
- Check server logs for errors during processing

### Issue: Rules Not Triggering

**Symptoms:**

- Lead updates don't create queue items
- Time-based triggers not firing

**Diagnosis:**

1. Check if `processLeadRules()` is called in lead update API
2. Verify rule conditions match lead data
3. Check if rule is active

**Solutions:**

- Confirm `processLeadRules(lead.id)` is called in `/api/counselor/leads/[id]/route.ts` after lead update (line 229)
- Review rule trigger conditions for correctness
- Verify rule `isActive` is true
- Check rule priority and delay settings

### Issue: Email/WhatsApp Not Sending

**Symptoms:**

- Queue items marked as FAILED
- Error messages in history

**Diagnosis:**

1. Check communication service credentials
2. Review error messages in `followup_history`
3. Test services directly

**Solutions:**

- Verify SMTP credentials are correct
- Check WhatsApp API token is valid
- Ensure phone numbers are in correct format
- Review rate limits for services
- Check network connectivity to external services

### Issue: Template Rendering Errors

**Symptoms:**

- Invalid placeholder warnings
- Missing data in rendered messages

**Diagnosis:**

1. Use `validateTemplate()` to check template
2. Review available template variables
3. Check lead data completeness

**Solutions:**

- Fix invalid placeholders in template
- Use only supported variables (20 available)
- Ensure lead has required data fields
- Add default values for optional fields

---

## Performance Optimization

### Database Indexing

Indexes are already defined in `schema.prisma`:

```prisma
// followup_queue indexes
@@index([status])
@@index([scheduledFor])
@@index([leadId])
@@index([ruleId])

// followup_history indexes
@@index([leadId])
@@index([status])
@@index([createdAt])

// followup_rules indexes
@@index([isActive])
@@index([triggerType])
```

### Queue Processing Optimization

**Batch Size:**

- Current: 50 items per batch
- Adjust in `followupProcessor.ts` if needed:

```typescript
const items = await prisma.followupQueue.findMany({
  take: 50, // Increase for faster processing
  where: { status: 'PENDING', scheduledFor: { lte: new Date() } },
})
```

**Retry Strategy:**

- Max retries: 3
- Retry delay: 30 minutes
- Adjust in rule creation if needed

### Template Caching

Templates are fetched per execution. For high-volume systems, implement caching:

```typescript
// Pseudo-code for template caching
const templateCache = new Map()

async function getTemplateWithCache(templateId) {
  if (templateCache.has(templateId)) {
    return templateCache.get(templateId)
  }
  const template = await prisma.followupTemplates.findUnique({ where: { id: templateId } })
  templateCache.set(templateId, template)
  return template
}
```

### Lead Update Debouncing

If a lead is updated frequently, debounce `processLeadRules()` calls:

```typescript
// Pseudo-code for debouncing
const leadProcessingQueue = new Map()

async function debouncedProcessLeadRules(leadId) {
  if (leadProcessingQueue.has(leadId)) {
    clearTimeout(leadProcessingQueue.get(leadId))
  }

  const timeoutId = setTimeout(() => {
    processLeadRules(leadId)
    leadProcessingQueue.delete(leadId)
  }, 5000) // 5 second debounce

  leadProcessingQueue.set(leadId, timeoutId)
}
```

---

## Production Checklist

### Pre-Deployment

- [ ] Environment variables configured in production
- [ ] Database migrations run successfully
- [ ] Cron jobs configured with correct schedules
- [ ] Communication services tested (email, WhatsApp, SMS)
- [ ] Sample templates and rules created
- [ ] Integration tests passed

### Post-Deployment

- [ ] Verify cron jobs are running (check logs)
- [ ] Monitor queue processing (check `/counselor/followup/queue`)
- [ ] Review first 24 hours of history (check `/counselor/followup/history`)
- [ ] Validate analytics data (check `/counselor/followup/analytics`)
- [ ] Test manual queue actions (execute, cancel, skip)
- [ ] Confirm lead update triggers work
- [ ] Review error logs for issues

### Ongoing Maintenance

- [ ] Monitor queue health weekly
- [ ] Review rule performance monthly
- [ ] Optimize underperforming rules
- [ ] Update templates based on engagement
- [ ] Clean up old history data (>6 months)
- [ ] Audit and deactivate unused rules

---

## Additional Resources

- **Core Logic Files:**
  - `src/lib/followupEngine/followupEngine.ts`: Rule evaluation
  - `src/lib/followupEngine/followupProcessor.ts`: Queue processing
  - `src/lib/followupEngine/templateRenderer.ts`: Template rendering

- **API Endpoints:**
  - Rules: `/api/counselor/followup/rules`
  - Templates: `/api/counselor/followup/templates`
  - Queue: `/api/counselor/followup/queue`
  - History: `/api/counselor/followup/history`
  - Analytics: `/api/counselor/followup/analytics`
  - Cron Jobs: `/api/cron/followup-queue`, `/api/cron/followup-triggers`

- **UI Pages:**
  - Rules Management: `/counselor/followup/rules`
  - Templates Management: `/counselor/followup/templates`
  - Queue Viewing: `/counselor/followup/queue`
  - History Viewing: `/counselor/followup/history`
  - Analytics Dashboard: `/counselor/followup/analytics`

---

## Support

For issues or questions:

1. Check troubleshooting section above
2. Review system logs for errors
3. Contact development team with:
   - Error messages
   - Steps to reproduce
   - Expected vs actual behavior
   - System configuration details

---

**Document Version:** 1.0
**Last Updated:** 2025-11-24
**Status:** Phase 5 - Integration & Testing
