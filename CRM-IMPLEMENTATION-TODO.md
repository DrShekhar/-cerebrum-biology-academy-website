# CRM Implementation TODO - Final Action Plan

**Analysis Date:** 2025-11-10
**Current Status:** 70% Complete - Strong foundation, critical gaps identified
**Estimated Total Effort:** 60-75 hours (2-3 weeks)

---

## ALREADY IMPLEMENTED ✅ (Can Use Immediately)

### 1. WhatsApp Business API Integration

**Status:** ✅ **100% Complete - Production Ready**

- Location: `/src/lib/integrations/whatsappBusinessService.ts`
- Counselor Service: `/src/lib/counselor/whatsapp.ts`
- **Capabilities:**
  - Send text, templates, interactive messages, documents
  - 6 pre-built message templates for counselors
  - Stage-based automated follow-ups
  - Webhook handler for incoming messages
  - Communication history tracking
- **Environment Variables:**
  ```
  WHATSAPP_PHONE_NUMBER_ID=existing
  WHATSAPP_ACCESS_TOKEN=existing
  WHATSAPP_BUSINESS_ACCOUNT_ID=existing
  WHATSAPP_VERIFY_TOKEN=existing
  ```
- **Can be shared:** Website + CRM use same WhatsApp number
- **Action Required:** ✅ None - already working

### 2. CRM Lead Management System

**Status:** ✅ **100% Complete**

- Location: `/src/app/api/counselor/leads/route.ts`
- **Features:**
  - Full CRUD operations
  - 9-stage pipeline tracking
  - Priority levels (HOT, WARM, COLD)
  - Source tracking
  - Counselor assignment
  - Follow-up scheduling
  - Activity logging
- **Action Required:** ✅ None - fully functional

### 3. Demo Booking System

**Status:** ✅ **100% Complete**

- Location: `/src/app/api/demo/book/route.ts`
- **Features:**
  - Form submission from website
  - Payment tracking
  - UTM parameter capture
  - Source attribution
  - Counselor assignment
  - WhatsApp confirmation (working)
  - Zoom meeting integration
- **Database:** DemoBooking table with all fields
- **Action Required:** ⚠️ Auto-convert to Lead (see Task #2)

### 4. Payment Webhook System

**Status:** ✅ **100% Complete**

- Location: `/src/app/api/webhooks/payments/route.ts`
- **Supports:** Razorpay, Stripe, PayPal
- **Action Required:** ✅ None - working

### 5. Google Ads Conversion Tracking

**Status:** ✅ **100% Complete**

- Location: `/src/lib/ads/googleAdsIntegration.ts`
- **Action Required:** ✅ None - tracking active

### 6. Database Models

**Status:** ✅ **100% Complete**

- Lead, DemoBooking, Communication, FeePlan, Task, Offer models
- All relationships defined
- UTM tracking fields present
- **Action Required:** ✅ None - schema is solid

---

## CRITICAL GAPS ❌ (Must Implement - High Priority)

### Phase 1: Essential Infrastructure (Week 1) - 25 hours

#### Task #1: Email Service Integration ❌

**Priority:** 🔴 **CRITICAL** (Blocking lead nurturing)
**Status:** Templates ready, no sender implementation
**Effort:** 6 hours

**What Exists:**

- ✅ Email templates (4 nurture sequences) at `/src/lib/email/followUpSequence.ts`
- ✅ Personalization engine
- ✅ Template renderer
- ✅ Demo booking confirmation template

**What's Missing:**

- ❌ SendGrid/Resend integration
- ❌ Email queue (BullMQ setup)
- ❌ Delivery webhook handler
- ❌ Bounce/complaint handling

**Implementation Steps:**

1. Install SendGrid SDK (or use Resend)
2. Create `/src/lib/integrations/emailService.ts`
3. Set up BullMQ queue for email sending
4. Add webhook handler at `/src/app/api/webhooks/email/status/route.ts`
5. Test with demo booking confirmation
6. Deploy email templates

**Environment Variables Needed:**

```env
SENDGRID_API_KEY=to_be_created
SENDGRID_FROM_EMAIL=noreply@cerebrumbiologyacademy.com
SENDGRID_FROM_NAME=Cerebrum Biology Academy

# OR use Resend (simpler, better for India)
RESEND_API_KEY=to_be_created
```

**Files to Create:**

- `/src/lib/integrations/emailService.ts` (200 lines)
- `/src/lib/email/emailQueue.ts` (150 lines)
- `/src/app/api/webhooks/email/status/route.ts` (100 lines)
- `/src/app/api/counselor/email/send/route.ts` (280 lines) [Already specified in Phase 1 doc]

**Testing:**

- Send demo booking confirmation
- Send follow-up sequence (Day 1, 3, 7)
- Verify delivery status updates

**Success Criteria:**

- [ ] Demo booking sends confirmation email automatically
- [ ] Counselors can send emails from CRM
- [ ] Email delivery tracked in Communication table
- [ ] Bounce/spam complaints logged

---

#### Task #2: Demo Booking → Lead Auto-Conversion ❌

**Priority:** 🔴 **CRITICAL** (Close the gap between website and CRM)
**Status:** Manual linking only
**Effort:** 3 hours

**What Exists:**

- ✅ DemoBooking model with all fields
- ✅ Lead model with demoBookingId link
- ✅ Demo booking API creates records

**What's Missing:**

- ❌ Automatic Lead creation on demo booking
- ❌ UTM parameter copying
- ❌ Source attribution forwarding
- ❌ Counselor assignment logic

**Implementation Steps:**

1. Modify `/src/app/api/demo/book/route.ts`
2. After creating DemoBooking, automatically create Lead
3. Copy all UTM parameters and source data
4. Assign to counselor (round-robin or manual)
5. Create initial follow-up task
6. Send WhatsApp to counselor (notification)
7. Link Lead.demoBookingId to DemoBooking.id

**Pseudo-code:**

```typescript
// In /src/app/api/demo/book/route.ts

// After creating demo booking:
const demoBooking = await createDemoBooking(data)

// Auto-create Lead
const lead = await prisma.lead.create({
  data: {
    studentName: demoBooking.studentName,
    email: demoBooking.email,
    phone: demoBooking.phone,
    grade: demoBooking.studentClass,
    courseInterest: demoBooking.course?.name || 'Unknown',
    source: demoBooking.source || 'Website Demo Form',
    stage: 'NEW_LEAD',
    priority: determinePriority(demoBooking), // Logic based on course, date, etc.
    assignedToId: await assignToCounselor(), // Round-robin or manual
    demoBookingId: demoBooking.id,
    // Copy UTM parameters
    utmSource: demoBooking.utmSource,
    utmMedium: demoBooking.utmMedium,
    utmCampaign: demoBooking.utmCampaign,
  },
})

// Create initial task for counselor
await createTask({
  leadId: lead.id,
  title: 'Initial Follow-up Call',
  dueDate: addDays(new Date(), 1),
  priority: 'HIGH',
  type: 'FOLLOW_UP',
})

// Notify counselor via WhatsApp
await sendWhatsApp({
  to: counselor.phone,
  message: `New lead assigned: ${lead.studentName} - ${lead.phone}`,
})

return { demoBooking, lead }
```

**Database Changes Needed:**

- ⚠️ Add UTM fields to Lead model (currently only in DemoBooking)

**Migration:**

```prisma
// Add to Lead model in schema.prisma
model Lead {
  // ... existing fields ...
  utmSource     String?
  utmMedium     String?
  utmCampaign   String?
  utmContent    String?
  utmTerm       String?
}
```

**Files to Modify:**

- `/src/app/api/demo/book/route.ts` (add auto-conversion logic)
- `/prisma/schema.prisma` (add UTM fields to Lead)

**Testing:**

- Submit demo form from website
- Verify Lead is auto-created
- Check counselor receives WhatsApp notification
- Verify UTM parameters are copied

**Success Criteria:**

- [ ] Every demo booking creates a Lead automatically
- [ ] UTM parameters preserved
- [ ] Counselor assigned and notified
- [ ] Initial follow-up task created
- [ ] No duplicate leads (deduplication by phone/email)

---

#### Task #3: Generic Webhook Receiver for External Leads ❌

**Priority:** 🔴 **CRITICAL** (Enable Sulekha, JustDial, etc.)
**Status:** Does not exist
**Effort:** 8 hours (base framework)

**What's Missing:**

- ❌ Webhook receiver endpoint
- ❌ Authentication/signature verification
- ❌ Lead deduplication logic
- ❌ Source-specific parsers

**Implementation Steps:**

1. Create `/src/app/api/webhooks/leads/route.ts`
2. Implement signature verification
3. Add lead deduplication (check phone/email)
4. Create source-specific parsers
5. Auto-assign to counselor
6. Send notifications
7. Log all webhook attempts

**Endpoint Design:**

```typescript
// POST /api/webhooks/leads
// Headers:
//   X-Webhook-Source: sulekha | justdial | google-ads | meta-ads
//   X-Webhook-Signature: HMAC-SHA256 signature
//   X-Webhook-Timestamp: Unix timestamp

export async function POST(request: Request) {
  // 1. Verify signature
  const source = request.headers.get('X-Webhook-Source')
  const signature = request.headers.get('X-Webhook-Signature')
  const timestamp = request.headers.get('X-Webhook-Timestamp')

  if (!verifyWebhookSignature(source, signature, timestamp, body)) {
    return Response.json({ error: 'Invalid signature' }, { status: 401 })
  }

  // 2. Parse based on source
  const leadData = parseWebhookData(source, body)

  // 3. Check for duplicates
  const existingLead = await findLeadByPhoneOrEmail(leadData.phone, leadData.email)

  if (existingLead) {
    // Update existing lead instead of creating duplicate
    await updateLeadFromWebhook(existingLead.id, leadData)
    return Response.json({
      success: true,
      action: 'updated',
      leadId: existingLead.id,
    })
  }

  // 4. Create new lead
  const lead = await prisma.lead.create({
    data: {
      studentName: leadData.name,
      email: leadData.email,
      phone: leadData.phone,
      source: source, // 'sulekha', 'justdial', etc.
      stage: 'NEW_LEAD',
      priority: 'HOT', // External leads are usually hot
      assignedToId: await assignToCounselor(),
      // Store raw webhook data for debugging
      metadata: { rawData: body },
    },
  })

  // 5. Create follow-up task
  await createTask({
    leadId: lead.id,
    title: `Follow up on ${source} lead`,
    dueDate: addHours(new Date(), 2), // Urgent: 2 hours
    priority: 'URGENT',
  })

  // 6. Notify counselor
  await sendWhatsApp({
    to: counselor.phone,
    message: `🔥 NEW HOT LEAD from ${source}\nName: ${lead.studentName}\nPhone: ${lead.phone}`,
  })

  return Response.json({
    success: true,
    action: 'created',
    leadId: lead.id,
  })
}
```

**Source-Specific Parsers:**

```typescript
// /src/lib/webhooks/leadParsers.ts

function parseSulekhaLead(data: any) {
  return {
    name: data.customer_name,
    email: data.email,
    phone: data.mobile,
    message: data.message,
    courseInterest: data.category,
  }
}

function parseJustDialLead(data: any) {
  return {
    name: data.name,
    email: data.email_id,
    phone: data.phone_no,
    message: data.requirements,
    city: data.city,
  }
}

function parseGoogleAdsLead(data: any) {
  // Google Ads Lead Form Extensions format
  return {
    name: data.user_column_data?.find((f) => f.column_id === 'FULL_NAME')?.string_value,
    email: data.user_column_data?.find((f) => f.column_id === 'EMAIL')?.string_value,
    phone: data.user_column_data?.find((f) => f.column_id === 'PHONE_NUMBER')?.string_value,
    courseInterest: data.form_headline,
  }
}

function parseMetaAdsLead(data: any) {
  // Facebook/Instagram Lead Ads format
  return {
    name: data.field_data?.find((f) => f.name === 'full_name')?.values[0],
    email: data.field_data?.find((f) => f.name === 'email')?.values[0],
    phone: data.field_data?.find((f) => f.name === 'phone_number')?.values[0],
    courseInterest: data.ad_name,
  }
}

export function parseWebhookData(source: string, data: any) {
  switch (source) {
    case 'sulekha':
      return parseSulekhaLead(data)
    case 'justdial':
      return parseJustDialLead(data)
    case 'google-ads':
      return parseGoogleAdsLead(data)
    case 'meta-ads':
      return parseMetaAdsLead(data)
    default:
      throw new Error(`Unknown webhook source: ${source}`)
  }
}
```

**Deduplication Logic:**

```typescript
// /src/lib/crm/deduplication.ts

export async function findLeadByPhoneOrEmail(phone: string, email?: string) {
  // Normalize phone (remove +91, spaces, dashes)
  const normalizedPhone = phone.replace(/[\s\-\+]/g, '').slice(-10)

  const lead = await prisma.lead.findFirst({
    where: {
      OR: [{ phone: { endsWith: normalizedPhone } }, email ? { email: email.toLowerCase() } : {}],
    },
    orderBy: { createdAt: 'desc' },
  })

  return lead
}
```

**Files to Create:**

- `/src/app/api/webhooks/leads/route.ts` (300 lines)
- `/src/lib/webhooks/leadParsers.ts` (200 lines)
- `/src/lib/webhooks/signatureVerification.ts` (100 lines)
- `/src/lib/crm/deduplication.ts` (150 lines)

**Environment Variables:**

```env
WEBHOOK_SECRET_SULEKHA=to_be_provided_by_sulekha
WEBHOOK_SECRET_JUSTDIAL=to_be_provided_by_justdial
WEBHOOK_SECRET_GOOGLE_ADS=to_be_generated
WEBHOOK_SECRET_META_ADS=to_be_provided_by_meta
```

**Testing:**

- Test with sample payloads from each source
- Verify deduplication works (no duplicate leads)
- Check counselor notifications
- Verify signature validation rejects invalid requests

**Success Criteria:**

- [ ] Webhook receiver accepts leads from all sources
- [ ] No duplicate leads created
- [ ] Counselors notified within 30 seconds
- [ ] All webhook attempts logged (success + failures)
- [ ] Invalid signatures rejected

---

#### Task #4: Google Ads Lead Form Integration ❌

**Priority:** 🔴 **CRITICAL**
**Status:** Does not exist
**Effort:** 4 hours (uses Task #3 webhook)

**What Exists:**

- ✅ Google Ads conversion tracking

**What's Missing:**

- ❌ Lead Form Extension webhook handler
- ❌ Integration with Google Ads API

**Implementation:**

- Use webhook from Task #3
- Configure Google Ads to send lead form submissions to:
  `https://cerebrumbiologyacademy.com/api/webhooks/leads`
  with header: `X-Webhook-Source: google-ads`

**Google Ads Setup Steps:**

1. Create Lead Form Extension in Google Ads
2. Add webhook URL in Lead Form settings
3. Generate webhook secret key
4. Test with sample submission

**Success Criteria:**

- [ ] Google Ads lead forms create Leads in CRM
- [ ] UTM parameters captured from ad click
- [ ] Counselor notified immediately

---

#### Task #5: Meta Ads Lead Form Integration ❌

**Priority:** 🔴 **CRITICAL**
**Status:** Does not exist
**Effort:** 6 hours (uses Task #3 webhook + Meta API setup)

**What's Missing:**

- ❌ Facebook/Instagram Lead Ads webhook
- ❌ Meta Business Manager integration

**Implementation:**

1. Create Meta App in Meta Business Manager
2. Subscribe to `leadgen` webhook events
3. Configure webhook URL: `https://cerebrumbiologyacademy.com/api/webhooks/leads`
4. Add Meta-specific parser (already in Task #3)

**Meta Setup:**

- App ID: To be created
- App Secret: To be generated
- Webhook Verify Token: Generate random string
- Page ID: Cerebrum Biology Academy Facebook Page

**Success Criteria:**

- [ ] Facebook/Instagram lead forms create Leads
- [ ] Lead data retrieved via Graph API
- [ ] Counselor notified within 1 minute

---

### Phase 2: Automation & Enhancement (Week 2) - 20 hours

#### Task #6: Automated Lead Assignment (Round-Robin) ❌

**Priority:** 🟠 **HIGH**
**Status:** Manual assignment only
**Effort:** 6 hours

**Implementation:**

- Create `/src/lib/crm/leadAssignment.ts`
- Implement round-robin algorithm
- Consider counselor availability
- Load balancing by active lead count
- Geographic assignment (optional)

**Logic:**

```typescript
export async function assignToCounselor(leadSource?: string, city?: string): Promise<string> {
  // Get all active counselors
  const counselors = await prisma.user.findMany({
    where: {
      role: 'COUNSELOR',
      isActive: true,
    },
    include: {
      _count: {
        select: {
          assignedLeads: {
            where: {
              stage: {
                notIn: ['ENROLLED', 'LOST'],
              },
            },
          },
        },
      },
    },
  })

  // Find counselor with least active leads (load balancing)
  const leastLoaded = counselors.reduce((min, counselor) =>
    counselor._count.assignedLeads < min._count.assignedLeads ? counselor : min
  )

  return leastLoaded.id
}
```

**Success Criteria:**

- [ ] New leads assigned automatically
- [ ] Even distribution among counselors
- [ ] Manual override possible

---

#### Task #7: Content Lead Magnet Capture System ❌

**Priority:** 🟠 **HIGH**
**Status:** Data model ready, no capture API
**Effort:** 8 hours

**What Exists:**

- ✅ `ContentLead` model in database
- ✅ `BiologyTopic` pages (SEO content)
- ✅ `LeadMagnet` model

**What's Missing:**

- ❌ Lead capture API endpoint
- ❌ PDF download gating
- ❌ Email verification flow
- ❌ Lead magnet delivery

**Implementation:**

1. Create `/src/app/api/seo/leads/capture/route.ts`
2. Add email verification (OTP or magic link)
3. Gate PDF downloads behind email capture
4. Send lead magnet via email
5. Auto-qualify and convert to main Lead after engagement

**Files to Create:**

- `/src/app/api/seo/leads/capture/route.ts` (200 lines)
- `/src/app/api/seo/leads/verify/route.ts` (150 lines)
- `/src/components/LeadMagnetForm.tsx` (180 lines)

**Success Criteria:**

- [ ] Users can't download without email
- [ ] Email verification works
- [ ] Lead magnet delivered automatically
- [ ] High-engagement leads converted to main CRM

---

#### Task #8: SMS Service Implementation ❌

**Priority:** 🟡 **MEDIUM**
**Status:** Packages installed, no code
**Effort:** 4 hours

**What Exists:**

- ✅ Twilio package installed
- ✅ MSG91 package installed

**Implementation:**

- Create `/src/lib/integrations/smsService.ts`
- Support both Twilio and MSG91
- Template management
- Delivery tracking

**Success Criteria:**

- [ ] Counselors can send SMS from CRM
- [ ] OTP verification works
- [ ] Delivery status tracked

---

#### Task #9: Lead Scoring System ❌

**Priority:** 🟡 **MEDIUM**
**Status:** Field exists, no calculation
**Effort:** 8 hours

**What Exists:**

- ✅ `leadScore` field in ContentLead model

**Implementation:**

- Create scoring algorithm
- Factors:
  - Course interest (NEET > Class 12 > Class 11)
  - Demo booking (yes = +20 points)
  - Communication frequency (engaged = +10)
  - Time since first contact (< 7 days = +15)
  - Source quality (referral = +25, paid ads = +15, organic = +10)
  - Payment intent (premium demo = +30)
- Auto-recalculate on events

**Success Criteria:**

- [ ] All leads have score 0-100
- [ ] Hot leads (80+) prioritized
- [ ] Score updates automatically

---

### Phase 3: Polish & Integration (Week 3) - 15 hours

#### Task #10: ContentLead → Lead Integration ❌

**Priority:** 🟡 **MEDIUM**
**Status:** Separate models, no bridge
**Effort:** 3 hours

**Implementation:**

- Create qualification workflow
- Auto-convert ContentLead to Lead when:
  - Lead score > 60
  - Email verified
  - Downloaded 2+ resources
  - Engaged with 3+ pages

**Success Criteria:**

- [ ] Qualified content leads become CRM leads
- [ ] No duplicate leads created
- [ ] Data preserved during migration

---

#### Task #11: Sulekha Lead Integration ❌

**Priority:** 🟡 **MEDIUM**
**Status:** Depends on Task #3
**Effort:** 2 hours (parser already in Task #3)

**Sulekha Setup:**

1. Contact Sulekha to get webhook credentials
2. Configure webhook URL
3. Test with sample leads
4. Monitor lead quality

**Success Criteria:**

- [ ] Sulekha leads arrive in CRM
- [ ] Lead quality tracked
- [ ] ROI measured

---

#### Task #12: JustDial Lead Integration ❌

**Priority:** 🟡 **MEDIUM**
**Status:** Depends on Task #3
**Effort:** 2 hours (parser already in Task #3)

**JustDial Setup:**

1. Contact JustDial for API access
2. Configure webhook URL
3. Test with sample leads

**Success Criteria:**

- [ ] JustDial leads arrive in CRM
- [ ] Response time tracked

---

## LOWER PRIORITY ENHANCEMENTS 🟢 (Can Be Done Later)

### Task #13: LinkedIn Lead Gen Integration ❌

**Priority:** 🟢 **LOW**
**Effort:** 6 hours
**Rationale:** Lower volume, can add later

### Task #14: Push Notifications ❌

**Priority:** 🟢 **LOW**
**Effort:** 8 hours
**Rationale:** WhatsApp covers most needs

### Task #15: Advanced Lead Scoring ML Model ❌

**Priority:** 🟢 **LOW**
**Effort:** 20 hours
**Rationale:** Rule-based scoring sufficient initially

---

## IMPLEMENTATION SEQUENCE

### Week 1: Critical Infrastructure (25 hours)

**Goal:** Enable basic multi-channel lead capture

```
Day 1-2: Task #1 - Email Service (6h)
Day 2-3: Task #2 - Demo → Lead Auto-conversion (3h)
Day 3-5: Task #3 - Generic Webhook Receiver (8h)
Day 5: Task #4 - Google Ads Integration (4h)
Day 5: Task #5 - Meta Ads Integration (4h) [parallel with #4]
```

**Deliverables:**

- [ ] Email confirmations working
- [ ] Demo bookings create Leads automatically
- [ ] Webhook receiver accepting external leads
- [ ] Google Ads and Meta Ads leads flowing into CRM

### Week 2: Automation & Enhancement (20 hours)

**Goal:** Improve efficiency and capture more leads

```
Day 6-7: Task #6 - Automated Lead Assignment (6h)
Day 7-9: Task #7 - Content Lead Magnet System (8h)
Day 9-10: Task #8 - SMS Service (4h)
Day 10: Task #11 - Sulekha Integration (2h) [setup only]
```

**Deliverables:**

- [ ] Leads assigned automatically
- [ ] Lead magnets capturing emails
- [ ] SMS working for OTP and notifications
- [ ] Sulekha leads flowing in

### Week 3: Integration & Polish (15 hours)

**Goal:** Connect all systems seamlessly

```
Day 11: Task #10 - ContentLead Integration (3h)
Day 11: Task #12 - JustDial Integration (2h)
Day 12-13: Task #9 - Lead Scoring (8h)
Day 14: Testing, bug fixes, documentation (2h)
```

**Deliverables:**

- [ ] All lead sources integrated
- [ ] Lead scoring active
- [ ] System tested end-to-end
- [ ] Documentation updated

---

## SUCCESS METRICS

### Week 1 Success Criteria

- [ ] 100% of demo bookings create Leads
- [ ] Email confirmations sent within 30 seconds
- [ ] External leads (Google Ads, Meta Ads) flowing into CRM
- [ ] Zero duplicate leads created

### Week 2 Success Criteria

- [ ] Leads assigned within 2 minutes of creation
- [ ] Content lead magnets capturing 10+ emails/day
- [ ] SMS OTP working with 99% delivery
- [ ] Sulekha leads arriving (if partnership active)

### Week 3 Success Criteria

- [ ] Lead scoring calculating correctly
- [ ] ContentLeads converting to main Leads
- [ ] All lead sources integrated
- [ ] System running stable for 7 days

---

## RISK MITIGATION

### Technical Risks

1. **Email deliverability issues**
   - Mitigation: Use SendGrid (better IP reputation)
   - Warm up sender domain gradually
   - Monitor spam complaints

2. **Webhook failures**
   - Mitigation: Log all attempts
   - Implement retry logic (exponential backoff)
   - Alert on repeated failures

3. **Duplicate leads**
   - Mitigation: Deduplication by phone+email
   - Manual merge tool for counselors
   - Alert on potential duplicates

### Vendor Risks

1. **Sulekha/JustDial API changes**
   - Mitigation: Version webhook parsers
   - Keep raw payloads for debugging
   - Monitor for parsing errors

2. **Meta/Google policy changes**
   - Mitigation: Follow official SDKs
   - Stay updated on platform changes
   - Have fallback to direct forms

---

## ENVIRONMENT SETUP CHECKLIST

### Required Accounts & API Keys

#### Email Service (Pick one)

- [ ] **SendGrid** (Recommended for India)
  - Sign up: https://sendgrid.com/
  - Free tier: 100 emails/day
  - Paid: $15/month for 40k emails
  - Get API key
  - Verify sender domain (cerebrumbiologyacademy.com)

- [ ] **Resend** (Alternative, simpler)
  - Sign up: https://resend.com/
  - Free tier: 100 emails/day, 3k/month
  - Get API key

#### SMS Service (Pick one)

- [ ] **MSG91** (Recommended for India)
  - Sign up: https://msg91.com/
  - Cost: ₹0.20-0.40 per SMS
  - Get Auth Key
  - Get Sender ID approved

- [ ] **Twilio** (Alternative, global)
  - Already have account (packages installed)
  - More expensive for India

#### External Lead Sources

- [ ] **Sulekha**
  - Contact: partnerships@sulekha.com
  - Request webhook setup
  - Get credentials

- [ ] **JustDial**
  - Contact: corporate@justdial.com
  - Request API access
  - Get credentials

- [ ] **Google Ads**
  - Already have account (tracking active)
  - Set up Lead Form Extensions
  - Configure webhook URL

- [ ] **Meta Business Manager**
  - Create Meta App
  - Add cerebrumbiologyacademy.com domain
  - Set up Lead Ads webhook

---

## COST ESTIMATE

### Monthly Operational Costs

| Service        | Free Tier | Paid Cost       | Estimated Usage    | Monthly Cost          |
| -------------- | --------- | --------------- | ------------------ | --------------------- |
| **SendGrid**   | 100/day   | $15/month (40k) | 20k emails         | $15                   |
| **MSG91**      | -         | ₹0.25/SMS       | 10k SMS            | ₹2,500 ($30)          |
| **WhatsApp**   | 1k free   | ₹0.50-2/conv    | 2k conversations   | ₹1,000-4,000 ($12-48) |
| **Vercel Pro** | -         | $20/month       | Hosting            | $20                   |
| **Database**   | -         | $0 (included)   | Supabase free tier | $0                    |
| **Sulekha**    | -         | Per lead        | 50 leads           | ₹10,000 ($120)        |
| **JustDial**   | -         | Per lead        | 30 leads           | ₹7,500 ($90)          |

**Total Monthly:** ₹21,000-24,000 ($250-290/month)

### One-Time Costs

| Item                                  | Cost                            |
| ------------------------------------- | ------------------------------- |
| Development (60-75 hours @ ₹2,000/hr) | ₹120,000-150,000 ($1,500-1,800) |
| Sender domain verification            | ₹0 (free with SendGrid)         |
| Meta App setup                        | ₹0 (free)                       |
| Google Ads Lead Forms                 | ₹0 (included in Ads spend)      |

---

## TESTING CHECKLIST

### Week 1 Testing

- [ ] Send test email (demo confirmation)
- [ ] Submit demo form from website
- [ ] Verify Lead created automatically
- [ ] Check counselor WhatsApp notification
- [ ] Test webhook with sample Sulekha payload
- [ ] Test webhook with sample Google Ads payload
- [ ] Verify deduplication (submit same phone twice)

### Week 2 Testing

- [ ] Create 5 leads, verify even distribution
- [ ] Download lead magnet, verify email capture
- [ ] Send SMS OTP, verify delivery
- [ ] Check lead assignment algorithm
- [ ] Test content lead qualification

### Week 3 Testing

- [ ] Verify lead scoring calculations
- [ ] Test all webhook sources end-to-end
- [ ] Load test (100 concurrent webhooks)
- [ ] Verify no memory leaks (monitor for 24h)
- [ ] Cross-browser testing (Chrome, Safari, Firefox)

---

## NEXT STEPS

1. **Review this TODO list** with your team
2. **Prioritize tasks** based on business needs
3. **Set up required accounts** (SendGrid, MSG91, etc.)
4. **Assign developers** to each task
5. **Start with Week 1 tasks** (critical infrastructure)
6. **Use specialized development agents** for each task

---

**Ready to Start?**

Let me know which tasks you want to implement first, and I'll launch specialized development agents to build them with production-ready code!

**Recommended Start:** Task #1 (Email Service) → Task #2 (Demo Auto-conversion) → Task #3 (Webhook Receiver)
