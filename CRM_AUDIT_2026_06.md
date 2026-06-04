# CRM Audit — 12 features

**Date:** 2026-06-04
**Scope:** Map each feature on the handwritten CRM spec against existing code, identify gaps, and rate operational status.
**Companion doc:** [CRM_WORLD_CLASS_PLAN.md](./CRM_WORLD_CLASS_PLAN.md) — what to build next.

---

## Status legend

- ✅ **Working** — code exists, integrated, no obvious gap
- ⚠️ **Partial** — core exists but a key piece is missing or disconnected
- ❌ **Missing** — no implementation

---

## Feature-by-feature

### 1. WhatsApp Business (shared) — ⚠️ Partial

**Exists:**
- `src/lib/integrations/whatsappBusinessService.ts` — Meta WhatsApp Business API client
- `src/lib/integrations/whatsappAutomationService.ts` — automation layer
- `src/lib/integrations/whatsapp-integration.ts` — wrapper
- `src/lib/whatsapp/` — 15 helper modules (templates, session manager, image analysis, voice transcription, AI handler, NCERT reference, etc.)
- `notificationService` wired into `/api/counselor/communications/send`
- `.env.example` has `WHATSAPP_PHONE_NUMBER_ID`, `WHATSAPP_ACCESS_TOKEN`, `WHATSAPP_BUSINESS_ACCOUNT_ID`
- Shared sender: `COUNSELOR_WHATSAPP_NUMBER=918826444334` in `.env.local` (all counselors send from this number)
- Interakt (3rd-party WhatsApp aggregator) also wired as fallback — `src/lib/interakt.ts`

**Gaps:**
- Meta WhatsApp Business API env keys are blank in `.env.local`
- Two competing providers (Meta direct + Interakt) — should consolidate
- Inbound message webhook (`/api/whatsapp/webhook/...`) needs end-to-end verification

---

### 2. Leads assignment — ✅ Working

**Exists:**
- `src/app/api/admin/leads/assign/route.ts` — bulk + single assignment with validated zod schemas
- Max 100 lead IDs per request, max 500 per bulk operation
- Round-robin / rebalance / assign-unassigned modes
- Notifies counselor via Interakt on assign (`notifyCounselorOfNewLead`)
- Counselor list endpoint filters by `assignedToId` (admin sees all per yesterday's fix)
- Lead detail page supports reassignment

**Gaps (minor):**
- Round-robin algorithm needs load-test verification
- No "fair-share by activity" smart routing yet (currently round-robin only)

---

### 3. Call recording — ⚠️ Partial

**Exists:**
- Excellent DB schema: `crm_communications.callRecordingUrl`, `callDuration`, `callTranscript`, `callSummary`, `keyTopics`, `sentiment`, `summarizedAt`, `transcribedAt`
- `src/lib/crm-agents/callTranscription.ts` — Whisper API transcription
- `src/lib/crm-agents/callSummary.ts` — GPT-based summary
- `src/lib/crm-agents/callPrep.ts` — pre-call AI brief

**Gaps:**
- **No telephony provider integrated.** Twilio env keys are blank.
- No Knowlarity / Exotel / MyOperator / Servetel integration (the India CRM standards)
- No webhook to receive recordings
- AI transcription service can be CALLED with a URL but nothing pushes recordings to it

---

### 4. WhatsApp + chat record — ✅ Working

**Exists:**
- `crm_communications` table logs every message with type, direction, status, attachments, sentBy, sentAt
- `/api/counselor/communications/[leadId]` returns paginated history (per-lead ownership enforced as of yesterday's fix)
- `/api/counselor/communications/route.ts` for listing across leads
- Counselor lead detail page (`src/app/counselor/leads/[id]/page.tsx`, 779 lines) renders communications inline
- `/counselor/messages` page for cross-lead message view

**Gaps:**
- Inbound message logging webhook needs verification end-to-end
- No "unread" indicator on lead detail
- Chat record is list-style; no threaded conversation view

---

### 5. Monitoring (lead work + caller) — ⚠️ Partial

**Exists (counselor-side, self-monitoring):**
- `/counselor/kpis/page.tsx` — personal KPIs with role/ownership gating
- `/counselor/analytics/page.tsx`
- `/counselor/leaderboard/page.tsx`
- `/counselor/lead-scoring/page.tsx`
- `/counselor/notifications/page.tsx`
- `/counselor/goals/route.ts` — personal goal tracking

**Gaps:**
- **No admin CRM oversight dashboard.** Only `/admin/ai-monitoring` exists (different scope).
- No real-time counselor activity feed (who is on a call right now, who has stale leads)
- No live caller monitoring (admin can't drop in on a call for QA)
- No daily auto-rollup KPI report

---

### 6. Calendar booking — ⚠️ Partial

**Exists:**
- `src/lib/calendar/calendarService.ts` — `.ics` calendar invite generator
- `/api/calendar/availability/route.ts`
- `/api/calendar/events/route.ts`
- Demo booking flow: `/api/demo-booking/{,cancel,reschedule,feedback}/route.ts`
- `/api/admin/demo-bookings/...` for admin oversight

**Gaps:**
- **No Google or Outlook Calendar OAuth** — counselor can't see their actual personal calendar from CRM
- One-way only: bookings go OUT as `.ics` attachments but don't appear in counselor's Google Calendar
- No two-way sync (counselor blocks off time in Google → CRM availability)

---

### 7. Zoom link sharing — ✅ (likely working, needs prod verification)

**Exists:**
- `src/lib/zoom/zoomService.ts` — full Zoom OAuth + meeting create API
- Server-to-Server OAuth env scaffolding (`ZOOM_ACCOUNT_ID`, `ZOOM_CLIENT_ID`, `ZOOM_CLIENT_SECRET`)
- In-browser SDK keys (`ZOOM_SDK_KEY`, `ZOOM_SDK_SECRET`)
- `ZOOM_USER_ID` for host account
- `DemoBookingData` type carries `zoomJoinUrl`, `zoomPassword`

**Gaps:**
- Need to verify env vars are populated in prod
- Need to verify demo booking flow actually calls Zoom API (vs accepting manually-entered links)

---

### 8. Document sharing — ⚠️ Partial

**Exists:**
- `src/lib/lms/blobStorage.ts` — Vercel Blob integration
- `src/lib/documents/offerLetterService.ts` — offer letter PDF generation
- `src/lib/certificates/certificateGenerator.ts`
- Upload routes: `/api/assignments/upload`, `/api/lms/upload`, `/api/admin/gallery/upload`, `/api/free-resources/admin/upload`
- `crm_communications.attachments` field is `String[]` — schema supports attachments

**Gaps:**
- **No counselor "attach brochure/PDF to lead" UI.** Counselor can't upload a syllabus PDF from inside the lead detail page and send to the lead via WhatsApp.
- Offer letter generation works (specialized), generic doc sharing doesn't (general)
- No document library (commonly-sent brochures stored as templates)

---

### 9. Email integration — ✅ Working

**Exists:**
- `src/lib/email/emailService.ts` — SMTP-based send
- `src/lib/email/followUpSequence.ts` — drip campaigns
- `/api/notifications/email/route.ts`
- `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS` env keys defined (Gmail)
- `notificationService` routes through email when channel=email
- Counselor send route includes email type

**Gaps:**
- Verify SMTP creds are populated in prod
- No transactional email provider (Resend/SendGrid) — Gmail SMTP has deliverability/scale risk
- No email templates manager UI for counselors

---

### 10. Quotation / Invoice making — ✅ Working (best-covered feature)

**Exists:**
- `/api/counselor/offers/create/route.ts` — create offer
- `/api/counselor/offers/[offerId]/generate-pdf/route.ts` — PDF generation
- `src/lib/documents/offerLetterService.ts` — offer letter rendering
- `/api/counselor/fee-plans/{,create,[leadId]}/route.ts` — installment plans
- `/api/student/payments/[id]/invoice/route.ts` — student-side invoice
- `src/lib/payments/AdvancedPaymentEngine.ts` — billing engine

**Gaps:**
- PDF branding consistency check needed
- No bulk-offer creation for batch enrollments

---

### 11. Payment link + offers — ⚠️ Partial

**Exists:**
- Offers fully covered (see #10)
- `src/lib/payments/razorpayService.ts` — `createOrder()` (checkout flow)
- `src/lib/payments/cashfreeService.ts` — `createOrder()`
- `src/lib/payments/currencyService.ts`, `internationalPayments.ts`, `paymentReminderService.ts`, `paymentScheduleService.ts`, `tierMapping.ts`, `upiIntegration.ts`

**Gaps:**
- **`createOrder` ≠ payment link.** Razorpay's `paymentLink.create()` API and Cashfree's `links` API are NOT wired.
- To send a counselor → student WhatsApp payment link (the most common conversion action), this is a blocker.
- No "Send Payment Link via WhatsApp" button on lead detail page
- No automatic reminder on link expiry

---

### 12. Onboarding — ❌ (CRM context); ⚠️ (student-facing)

**Exists:**
- `/onboarding/demo/page.tsx` — student-facing "select your prep track" form
- `/onboarding/profile/page.tsx` — student profile setup

**Gaps:**
- **No lead-to-student onboarding orchestration.** When a lead converts to ENROLLED, there is no structured flow:
  - Payment confirmed → welcome WhatsApp
  - Auto-assign to batch
  - Mentor introduction
  - First-class scheduled
  - Study material delivery (NCERT notes, MCQ access, Anki deck)
  - LMS access provisioning
- Each piece exists in isolation but the orchestration is missing
- No drop-off recovery if a step fails

---

## Summary scoreboard

| # | Feature | Status |
|---|---|---|
| 1 | WhatsApp Business (shared) | ⚠️ |
| 2 | Leads assignment | ✅ |
| 3 | Call recording | ⚠️ |
| 4 | WhatsApp + chat record | ✅ |
| 5 | Monitoring (lead work + caller) | ⚠️ |
| 6 | Calendar booking | ⚠️ |
| 7 | Zoom link sharing | ✅ |
| 8 | Document sharing | ⚠️ |
| 9 | Email integration | ✅ |
| 10 | Quotation / Invoice | ✅ |
| 11 | Payment link + offers | ⚠️ |
| 12 | Onboarding | ❌ |

**Working: 5 / 12 · Partial: 6 / 12 · Missing: 1 / 12**

---

## Is the CRM working today?

For a counselor doing day-to-day work: **yes, mostly**. They can see leads (correctly isolated, admin-overridable), add notes, send WhatsApp/email/SMS via the unified communications endpoint, create offers + PDF, set up fee plans, and track KPIs.

**Actually broken or absent:**
1. Call recording has no source (DB and AI processing wait for recordings nobody sends)
2. Payment links can't be sent via WhatsApp (the most common conversion action)
3. Calendar is one-way (no Google Calendar visibility)
4. No admin oversight dashboard for live counselor monitoring
5. No structured onboarding (converted leads fall off a cliff post-payment)

These are the items the world-class plan addresses.
