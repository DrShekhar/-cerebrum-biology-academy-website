# Cerebrum CRM — World-Class Build Plan

**Date:** 2026-06-04
**Companion doc:** [CRM_AUDIT_2026_06.md](./CRM_AUDIT_2026_06.md) — current state of the 12 features.
**Owner:** Dr. Shekhar / engineering
**Target:** 16-week build (4 phases × 4 weeks) to take CRM from "works for daily ops" to "world-class for NEET coaching"

---

## 1. North-star definition — what "world-class" means here

Specific to a NEET biology coaching business with ~5–20 counselors handling 200–1,000 leads/month, distributed across India + NRI markets, sold primarily via WhatsApp + phone:

1. **One screen, one workflow** — a counselor opens a lead and never leaves the page: call, WhatsApp, email, send PDF, generate payment link, schedule demo, book follow-up. No copy-paste across tools.
2. **Every interaction logged + AI-enriched** — every call recorded, transcribed, summarized; every WhatsApp message archived; sentiment + next-action suggested.
3. **Admin sees everything live** — real-time dashboard: who's on a call now, who has hot leads going cold, today's pipeline movement, today's revenue.
4. **Lead → student is a conveyor belt, not a cliff** — converted leads flow through structured onboarding automatically; no manual coordination.
5. **Counselors work from phone** — PWA-optimized, push notifications, voice-to-text notes, one-tap actions.
6. **Data-driven everything** — every funnel stage has a baseline, target, and weekly trend. Counselor-level KPIs visible to all (leaderboard culture).

**Anti-goals:** building features nobody uses, chasing enterprise checklist parity (Salesforce/HubSpot are not the bar), adding ML before the data justifies it.

---

## 2. Architectural pillars (decisions that span features)

### 2.1 Unified communications hub
- **Single API surface** for all outbound: `POST /api/comms/send` with `{ leadId, channel: 'whatsapp'|'sms'|'email'|'call', body, attachments?, templateId? }`
- Channel adapters internally: WhatsApp via Meta Business API direct (drop Interakt), SMS via Twilio, email via Resend (drop Gmail SMTP), voice via Knowlarity
- All routes write to `crm_communications` table for unified history

### 2.2 Event-driven backbone
- Every CRM action emits an event: `lead.assigned`, `lead.contacted`, `lead.stage_changed`, `offer.sent`, `payment.received`, `call.completed`, etc.
- Events drive: real-time dashboard updates, automation triggers, analytics aggregations, drip sequences

### 2.3 Background job queue
- **Choice: Inngest** (https://inngest.com) — purpose-built for Vercel + Next.js, event-driven, free for ≤50k function runs/mo
- Alternative: Vercel Cron + Upstash Q (cheaper but more glue code)
- Replaces the current ad-hoc `setTimeout` patterns in followup engine

### 2.4 Real-time layer
- **Choice: Supabase Realtime** (already on Supabase — included in Pro plan)
- Powers admin dashboard "who's on a call now," live lead pipeline, counselor activity feed
- WebSocket subscription per dashboard view

### 2.5 Telephony
- **Choice: Knowlarity** for India (NEET coaching standard, ~₹2k/seat/month, includes call recording + IVR)
- Cloud number → counselor's mobile, recordings pushed via webhook
- Alternative: Exotel (cheaper, fewer features) or MyOperator (more expensive, better UI)

### 2.6 AI assistant layer
- Call transcription: OpenAI Whisper (already wired)
- Call summary + next action: GPT-4o-mini (already wired in `callSummary.ts`)
- WhatsApp message smart-reply: GPT-4o-mini, surfaces 3 suggested replies in counselor UI
- Lead score: rule-based v1 (already implemented), ML v2 in phase 4

### 2.7 Mobile-first PWA
- Counselor workspace becomes installable PWA
- Push notifications via Web Push API (built-in, no Firebase needed)
- Service worker caches lead list for offline triage

---

## 3. 16-week phased roadmap

### Phase 1: Revenue plumbing (weeks 1–4)

**Goal:** Stop leaving money on the table — every counselor → lead → payment flow works end-to-end.

| # | Item | Owner | Effort |
|---|---|---|---|
| 1.1 | **Payment Links** — wire `razorpay.paymentLinks.create()` + Cashfree links + counselor UI ("Send Payment Link" button on lead detail) | eng | 3 days |
| 1.2 | **Payment link auto-reminders** — Inngest scheduled job: nudge on day +1, +3, +7 if unpaid | eng | 1 day |
| 1.3 | **Onboarding orchestration** — Inngest flow: on `lead.stage_changed → ENROLLED`, fire welcome WhatsApp + batch assignment task + study material email + LMS access + mentor intro | eng | 3 days |
| 1.4 | **Inbound WhatsApp webhook** — verify `/api/whatsapp/webhook` end-to-end, log inbound to `crm_communications` with `direction: 'INBOUND'` | eng | 1 day |
| 1.5 | **Production env keys** — populate WhatsApp Business API, Zoom, SMTP/Resend in Vercel env | ops | 0.5 day |
| 1.6 | **Resend email migration** — replace Gmail SMTP with Resend (better deliverability + analytics) | eng | 1 day |

**Phase 1 deliverables:**
- Counselors can send payment links from lead detail page (Razorpay + Cashfree, INR + USD)
- New enrollments auto-fire 6-step onboarding sequence within 60 seconds
- All inbound WhatsApp messages logged with conversation history
- 99%+ email deliverability via Resend

### Phase 2: Counselor productivity (weeks 5–8)

**Goal:** Cut counselor admin time by 50% so they spend more time on calls.

| # | Item | Owner | Effort |
|---|---|---|---|
| 2.1 | **Knowlarity integration** — click-to-call from lead detail, recording webhook → `callRecordingUrl`, auto-transcribe via existing `CallTranscriptionService` | eng | 3 days |
| 2.2 | **AI call summary + sentiment** — auto-run on every recording, surface in lead detail timeline | eng | 1 day |
| 2.3 | **Document library + sharing** — counselor UI to upload + tag PDFs (brochure, syllabus, fee structure, demo class notes). "Attach & send via WhatsApp" from lead detail | eng | 2 days |
| 2.4 | **WhatsApp template manager** — list approved templates from Meta, counselor picks + fills variables, sends via Business API | eng | 2 days |
| 2.5 | **AI smart-replies** — on inbound message, show 3 GPT-suggested responses counselor can edit/send | eng | 1.5 days |
| 2.6 | **Voice notes in lead notes** — counselor speaks; Whisper transcribes; saved to `notes` table | eng | 1 day |

**Phase 2 deliverables:**
- Every call automatically recorded, transcribed, and summarized — searchable from lead detail
- Counselor can send brochure PDF in 2 clicks (was: 8+ steps)
- AI suggests next message based on conversation context
- Voice-dictated notes work hands-free during driving / multitasking

### Phase 3: Admin oversight (weeks 9–12)

**Goal:** Admin (Dr. Shekhar / ops head) can run the entire CRM from one screen without asking anyone for a status update.

| # | Item | Owner | Effort |
|---|---|---|---|
| 3.1 | **Admin CRM dashboard `/admin/crm`** — live pipeline (counts per stage), today's KPIs (calls, WhatsApps, revenue), counselor leaderboard, alerts (stale leads, missed callbacks) | eng | 3 days |
| 3.2 | **Real-time counselor activity feed** — Supabase Realtime subscription, shows "Counselor X is on call with Lead Y now" | eng | 1.5 days |
| 3.3 | **Daily auto-rollup report** — Inngest cron at 9 PM, sends WhatsApp to admin with: today's leads, conversions, revenue, top performer, bottom performer needing coaching | eng | 1 day |
| 3.4 | **Smart routing v1** — hot leads (score >70) → top-converting counselor; NRI → time-zone matched; INR → India-based; fail-over to round-robin | eng | 2 days |
| 3.5 | **Live call drop-in (QA mode)** — admin can listen to a live call (read-only) for quality review. Uses Knowlarity barge-in API. | eng | 2 days |
| 3.6 | **Counselor coaching tab** — per-counselor view: avg call duration, conversion rate, hot lead handling time, AI-summarized "talking points needing work" | eng | 1.5 days |

**Phase 3 deliverables:**
- Admin dashboard updates in real-time without refresh
- Daily 9 PM WhatsApp summary to Dr. Shekhar
- Hot leads automatically routed to best counselor (no manual assignment for top-priority)
- Live QA possible without disrupting the call

### Phase 4: Scale + polish (weeks 13–16)

**Goal:** Future-proof the CRM for 5x growth and make counselors love using it.

| # | Item | Owner | Effort |
|---|---|---|---|
| 4.1 | **Google Calendar two-way OAuth** — counselor connects Google; CRM reads availability + writes demo bookings | eng | 2 days |
| 4.2 | **Zoom recording auto-attach** — Zoom webhook → demo class recording uploaded to lead detail | eng | 1 day |
| 4.3 | **Counselor PWA** — installable, push notifications for hot lead assignment / missed callback / payment received | eng | 2 days |
| 4.4 | **Drip sequence builder UI** — visual flow editor (drag-drop nodes: WhatsApp/email/SMS/wait/branch). Replaces hand-coded sequences. | eng | 4 days |
| 4.5 | **Lead scoring v2 (ML)** — train on 6 months of data, predict conversion probability per lead. Surface in lead list as "🔥 78% likely" | eng | 3 days |
| 4.6 | **Bulk WhatsApp campaigns** — admin selects segment (e.g., "NRI Class 12 unconverted leads from last 30 days"), picks template, schedules | eng | 1.5 days |
| 4.7 | **Counselor mobile screen optimizations** — lead list filters, swipe-to-call, swipe-to-message | eng | 1 day |

**Phase 4 deliverables:**
- Counselors use the CRM from their phone for 80% of triage tasks
- Drip campaigns built without engineering involvement
- Lead list shows ML-predicted conversion likelihood
- Demo class Zoom recordings automatically saved to lead timeline

---

## 4. Per-feature specs (mapped to the 12 + new additions)

### F1. WhatsApp Business (shared) — final state

- Single provider: Meta WhatsApp Business API direct (retire Interakt)
- One shared number sends; webhook routes inbound to correct counselor based on lead's `assignedToId`
- Templates managed in Meta Business Manager; pulled into CRM template picker
- Conversation history rendered as threaded chat (not list) in lead detail
- Counselor sees typing indicator + read receipts (where Meta API supports)
- Admin can broadcast to segment (Phase 4)

### F2. Leads assignment — final state

- Auto-assign on lead creation: smart routing (Phase 3.4)
- Manual reassignment from admin dashboard (already works)
- Reason field required on reassign (creates audit log)
- "Vacation mode" — counselor can pause assignments while OOO
- Round-robin still available as fallback

### F3. Call recording — final state

- Knowlarity cloud number rings counselor's mobile
- Call ends → Knowlarity webhook → `/api/webhooks/calls/recording` → stores `callRecordingUrl`
- Inngest background job: pull recording → Whisper transcribe → GPT summary → sentiment → save to `crm_communications`
- Counselor sees transcript + summary in lead timeline (collapsed by default, expand on click)
- Admin can search across all transcripts: "show me every call mentioning 'fees too high'"

### F4. WhatsApp + chat record — final state

- All channels (WhatsApp, email, SMS, call summary) merged into single lead timeline, sorted by time
- Filter by channel
- Unread indicator on lead list (last counselor view vs last lead message)
- Search across messages: "find me the lead who asked about dropper batch fees"

### F5. Monitoring (lead work + caller) — final state

- **Counselor self-view**: existing KPIs + analytics + leaderboard pages
- **Admin live dashboard** (Phase 3): pipeline counts, real-time activity feed, today's stats, alerts
- **Admin per-counselor view**: drill into one counselor's performance, coaching notes, AI-suggested improvement areas
- **Daily WhatsApp summary to admin** (Phase 3.3)

### F6. Calendar booking — final state

- Counselor connects Google Calendar via OAuth (Phase 4.1)
- CRM availability uses real Google Calendar (busy/free)
- Demo bookings created in CRM also write to counselor's Google Calendar
- Two-way sync: counselor blocks time in Google → CRM marks unavailable
- Student gets calendar invite via email + WhatsApp

### F7. Zoom link sharing — final state

- Demo booking auto-creates Zoom meeting via Server-to-Server OAuth (already wired, verify in prod)
- Meeting link sent to student via email + WhatsApp + ICS attachment
- Zoom webhook on meeting end → upload recording link to lead timeline (Phase 4.2)

### F8. Document sharing — final state

- Document library (Phase 2.3): admin uploads brochures/syllabi/fee structures, tagged by audience (NEET / IB / AP / class 11 / class 12 / NRI)
- Counselor lead detail → "Send Document" button → pick from library OR upload new
- Sends via WhatsApp Business API as media message
- Logged in `crm_communications` with `attachments: [url]`

### F9. Email integration — final state

- Resend as transactional provider (Phase 1.6)
- Templates managed in code with React Email (better than HTML strings)
- Drip sequences via Inngest (replace `followUpSequence.ts` ad-hoc timers)
- Open + click tracking via Resend webhooks
- Counselor sees email open rate per lead in timeline

### F10. Quotation / Invoice making — final state (mostly done)

- Existing offer creation + PDF generation works well
- Add: bulk offer creation for batch enrollments
- Add: offer expiry auto-reminders via Inngest (similar to payment link reminders)
- Add: invoice consolidation when student has multiple courses

### F11. Payment link + offers — final state

- Razorpay Payment Links API integrated (Phase 1.1)
- Counselor lead detail → "Send Payment Link"
  1. Pick offer or custom amount
  2. Picks expiry (24h / 7d / 30d)
  3. Sends via WhatsApp + email + SMS
  4. Link tracks: viewed, attempted, paid
- Auto-reminders at +1, +3, +7 days if unpaid
- Webhook on payment success → fires `payment.received` event → onboarding sequence starts

### F12. Onboarding — final state

**Stage 1: post-payment (auto-fires within 60 sec of `payment.received`):**
- Welcome WhatsApp from counselor's number
- Email with login credentials to student dashboard
- Assignment to batch (counselor sees this as a task; if not done in 24h, escalates)
- Calendar invite for first class
- WhatsApp message with study material download links (NCERT notes, MCQ access, Anki deck)

**Stage 2: day +1 to +7:**
- Mentor introduction WhatsApp
- Student dashboard tour video
- First doubt-asking prompt
- Counselor follow-up task: "How was first class?"

**Stage 3: day +30 review:**
- NPS survey
- Batch coordinator check-in
- Auto-flag if no LMS activity in last 7 days

Implemented as Inngest workflow — visible in admin dashboard, each step shows status (pending / done / failed). Failed steps auto-retry with alert.

---

## 5. New tech stack additions

| Component | Choice | Cost | Replaces |
|---|---|---|---|
| Background jobs | **Inngest** | Free up to 50k runs/mo, $20/mo for 200k | Ad-hoc setTimeout / cron |
| Real-time | **Supabase Realtime** | Included in Pro | Polling / manual refresh |
| Telephony | **Knowlarity** | ~₹2,000/seat/mo | None (gap) |
| Email | **Resend** | Free up to 3k/mo, $20/mo for 50k | Gmail SMTP |
| File storage | **Vercel Blob** (existing) | $0.15/GB-mo | — |
| Email templates | **React Email** | Free OSS | HTML strings |
| Push notifs | **Web Push API** (native) | Free | None |
| Analytics | **PostHog Cloud** | Free up to 1M events/mo | Custom KPI rollups |

**Drop list:**
- Interakt — replaced by Meta direct
- Twilio — replaced by Knowlarity (still keep for SMS-only fallback)
- Gmail SMTP — replaced by Resend

---

## 6. Database additions needed

```prisma
model payment_links {
  id              String   @id
  leadId          String
  amount          Decimal
  currency        String   @default("INR")
  provider        String   // "RAZORPAY" | "CASHFREE"
  providerLinkId  String
  url             String
  expiresAt       DateTime
  status          String   // "ACTIVE" | "PAID" | "EXPIRED" | "CANCELLED"
  createdAt       DateTime @default(now())
  paidAt          DateTime?
  remindersSent   Int      @default(0)
  leads           leads    @relation(fields: [leadId], references: [id])
}

model onboarding_runs {
  id              String   @id
  leadId          String   @unique
  workflowId      String   // Inngest workflow ID
  startedAt       DateTime @default(now())
  completedAt     DateTime?
  status          String   // "RUNNING" | "COMPLETED" | "FAILED"
  steps           onboarding_steps[]
  leads           leads    @relation(fields: [leadId], references: [id])
}

model onboarding_steps {
  id              String   @id
  runId           String
  stepName        String   // "welcome_whatsapp" | "batch_assign" | etc.
  status          String   // "PENDING" | "DONE" | "FAILED"
  attemptCount    Int      @default(0)
  errorMessage    String?
  completedAt     DateTime?
  run             onboarding_runs @relation(fields: [runId], references: [id])
}

model counselor_activity_events {
  id              String   @id
  counselorId     String
  eventType       String   // "CALL_START" | "CALL_END" | "MESSAGE_SENT" | "LEAD_VIEWED"
  leadId          String?
  metadata        Json
  createdAt       DateTime @default(now())
  counselor       users    @relation(fields: [counselorId], references: [id])
  @@index([counselorId, createdAt])
}

model whatsapp_templates {
  id              String   @id
  metaTemplateName String  @unique  // matches Meta Business Manager
  category        String   // "MARKETING" | "UTILITY" | "AUTHENTICATION"
  language        String   @default("en_IN")
  variables       Json     // [{name, exampleValue}]
  status          String   // "APPROVED" | "PENDING" | "REJECTED"
  lastSyncedAt    DateTime
}

model document_library {
  id              String   @id
  title           String
  description     String?
  fileUrl         String
  fileType        String   // "PDF" | "IMAGE" | "VIDEO"
  tags            String[] // ["neet", "class-11", "fees", "brochure"]
  uploadedById    String
  createdAt       DateTime @default(now())
  sendCount       Int      @default(0)
  uploader        users    @relation(fields: [uploadedById], references: [id])
}
```

---

## 7. Success metrics — what we measure to know we won

| Metric | Today (estimate) | Target post-Phase 4 |
|---|---|---|
| **Lead → Demo conversion** | ~15% | 25% |
| **Demo → Enrolled conversion** | ~20% | 35% |
| **First-response time (lead → first contact)** | 2–6 hours | <15 min |
| **Counselor leads handled / day** | 30 | 60 |
| **Calls recorded / day (vs taken)** | 0% | 95%+ |
| **% leads with full timeline (call + WhatsApp + email logged)** | ~40% | 95%+ |
| **Onboarding completion (paid → first class attended)** | unknown / manual | 90%+ tracked, 80%+ completed |
| **Admin time/day on status checks** | 1–2 hours | <15 min (dashboard) |
| **Payment link → paid (within 48h)** | N/A | 40% |
| **NPS (post-enrollment, day 30)** | not measured | >70 |

---

## 8. Risks + mitigations

| Risk | Mitigation |
|---|---|
| **Knowlarity reliability** — Indian telephony providers have downtime | Twilio SMS fallback for urgent comms; daily call success rate monitor |
| **Meta WhatsApp template approval delays** | Get 10 critical templates pre-approved during Phase 1 |
| **Counselor adoption resistance** | Phase 2 productivity wins create pull; gamify with leaderboard |
| **Inngest cost overrun at scale** | Free tier covers 50k runs/mo (~16 enrollments × 6 steps × 30 days = 2.9k runs); monitor in Phase 1 |
| **Supabase Realtime connection limits** | Free Pro plan = 500 concurrent connections; sufficient for ~50 counselors + admin |
| **Resend deliverability for transactional** | Set up SPF/DKIM/DMARC properly; use dedicated subdomain (`mail.cerebrumbiologyacademy.com`) |
| **AI cost (Whisper + GPT-4o-mini)** | Cap at ~₹2 per call (Whisper: $0.006/min × 5min = $0.03; GPT: ~$0.01). 1000 calls/mo = ~₹4,000/mo. Acceptable. |

---

## 9. Total monthly run-cost projection (post-Phase 4)

| Item | Cost (₹/month) |
|---|---|
| Knowlarity (10 seats) | 20,000 |
| Resend (50k emails) | 1,700 |
| Inngest (200k runs) | 1,700 |
| WhatsApp Business API conversations | 5,000 (≈11,000 conversations @ ₹0.45) |
| AI (Whisper + GPT-4o-mini) | 4,000 |
| Zoom Pro (1 host account) | 1,500 |
| PostHog | 0 (free tier) |
| Vercel + Supabase | 0 (existing plans cover) |
| **Total incremental cost** | **~₹34,000/month** |

For context: if this CRM upgrade adds even 2 extra NEET enrollments per month (avg fee ₹80,000), monthly ROI is ~4.7x.

---

## 10. Implementation playbook

### 10.1 Code conventions
- All CRM features behind feature flag (env var `FEATURE_<NAME>=true`) for gradual rollout
- Every new API route: role check + ownership filter (as established in yesterday's CRM hardening commit)
- Every Inngest workflow: idempotent (re-run safe)
- Every counselor-facing UI change: respect mobile breakpoints first

### 10.2 Testing
- Unit tests for: payment link generation, onboarding step execution, smart routing algorithm
- Integration tests for: WhatsApp send + log, Knowlarity webhook + transcription, end-to-end onboarding flow
- E2E (Playwright) for: counselor sends payment link → student pays → onboarding fires
- Load test: smart routing under 100 concurrent lead creations

### 10.3 Rollout strategy
- **Per phase:** feature-flagged, dogfood with 1 counselor for 1 week, then rollout to all
- **Per feature:** weekly demo to counselor team during Phase 2 (productivity features need their buy-in)
- **Telemetry from day 1:** every new event logged to PostHog; weekly review of "is this feature actually being used?"

### 10.4 Rollback plan
- All feature flags can disable a feature without redeploy
- Database migrations: forward-only, never destructive in single migration
- Keep Interakt + Gmail SMTP wired for 30 days after Meta + Resend cutover

---

## 11. What we're explicitly NOT building

- ❌ Custom CRM mobile app (PWA is enough; native = 3-month distraction)
- ❌ Custom email client UI (Resend + React Email is enough)
- ❌ Custom video conferencing (Zoom is industry standard)
- ❌ ML lead scoring v1 (rule-based is sufficient until we have 6 months of clean data)
- ❌ Salesforce-style customization layer (we're not selling this to other coachings)
- ❌ Multi-currency invoicing beyond INR + USD (covers 95% of our market)
- ❌ Knowledge base / ticket system (use existing WhatsApp threads)

---

## 12. Phase 1 kickoff — what to start this week

If approved, the immediate work is Phase 1.1 (Payment Links) + Phase 1.4 (Inbound WhatsApp webhook verification). These are independent and can run in parallel. Estimated **4 days to first user-visible win** ("counselor sends payment link, student pays, you get WhatsApp notification").

Next action: confirm tech choices (Inngest, Knowlarity, Resend) and Phase 1 priority order.
