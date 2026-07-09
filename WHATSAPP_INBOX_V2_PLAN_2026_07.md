# WhatsApp Team Inbox v2 — "One Number, Whole Team"

**Date:** Jul 9, 2026. Grounded in the Jul 8 research fan-out: shared-inbox patterns from WATI / AiSensy / Interakt / DoubleTick / Zoko / Periskope / Rasayel, plus Meta Cloud API native features (Flows, CTWA referral, order_details payments, template categories, calling). Full findings in PLATFORM_VISION_2026_07.md §4.1 + the research transcripts.

## 1. The goal (owner's words)

Team communication on **one WhatsApp number**: every counselor works the same inbox, **any team member can continue any conversation**, with the smart features the paid WhatsApp CRMs sell — built into our own CRM so chats and leads live in ONE system (buying WATI/AiSensy would fragment them).

## 2. What we already have (don't rebuild)

- **Data model is right**: `whatsapp_conversations` (phone, leadId, assignedCounselorId, status, lastMessageAt) + `whatsapp_messages` (direction, content, media, status, **sentBy** — per-message agent attribution is already stored).
- **API v1** (`/api/staff/whatsapp-inbox`): role-scoped list (counselor = own + unassigned; admin = all), thread fetch, reply POST via the WhatsApp hub (Meta primary → Interakt fallback).
- **Inbound engine** (code-ready, dormant on webhook secret): auto-creates leads via upsertLeadCore, threads messages, bells the counselor.
- **UI v1**: `src/components/staff/WhatsAppInbox.tsx` — list + thread + reply box (the "very basic" page in the screenshot).
- Adjacent infra to reuse: staff bell/notifications, `counselor/templates` (message templates), SLA watchdog, lead stages/colors, threaded lead comments (@mention pattern), drip sequences.

## 3. Build plan

### Phase 1 — Team workflow core (the ask) — ~1 week

1. **Tabs + queues**: `Unassigned` / `Mine` / `All` (admin) tabs with counts. New conversations land in Unassigned; assignment = click "Take over" or assign-to dropdown (staff list). Every (re)assignment logged as an internal event in the thread.
2. **Any-member continuation, transparently**: render the **agent name chip on every outbound bubble** (sentBy is already stored) so handoffs are visible; a "Continue conversation" takeover reassigns to the replier with an inline "Priya took over" event line. Admin can reassign anyone; counselor can take from Unassigned or hand off.
3. **Internal notes + @mentions in-thread**: yellow "internal" bubbles interleaved in the chat — never sent to WhatsApp. Implemented as `whatsapp_messages` rows with `messageType: 'internal_note'` (no schema change); `@[Name]` mentions fire the existing staff bell. (Rasayel's standout feature.)
4. **24-hour window awareness**: composer computes time since last INBOUND message. Inside window → free text. Outside → composer flips to the **approved-template picker** (from `counselor/templates` + Meta template names) with a "window closed Xh ago" notice. Prevents silent send failures — the #1 confusion in shared inboxes.
5. **Quick replies**: type `/` in the composer → searchable canned replies with `{{name}}`/`{{course}}` interpolation from the linked lead. Reuses the templates table (type WHATSAPP).
6. **Resolve / reopen**: conversation status buttons (ACTIVE→CLOSED, auto-REOPEN on new inbound). Closed chats leave the working queues but stay searchable.

### Phase 2 — Smart layer — ~1 week

7. **Stage chips + saved views**: the linked lead's stage (colors from stageColors.ts) shown on each conversation row; filter tabs by stage (Hot / Demo / Payment-pending). One source of truth — lead stages ARE the labels.
8. **SLA badges**: unanswered-inbound countdown chip on each row (reuses the SLA watchdog's thresholds); sort Unassigned by wait time.
9. **Per-agent analytics**: first-response time, chats handled, resolved count per counselor (computable from message timestamps) — feeds the existing Leaderboard.
10. **Stop-on-reply drips**: inbound message from a lead pauses their active drip enrollment (one guard in the nurturing processor). Every vendor's headline automation feature.
11. **CSAT**: on resolve, send a 1-tap rating button message (interactive buttons); score lands on the conversation + agent analytics.

### Phase 3 — Meta-native power features — as keys/decisions land

12. **WhatsApp Flows**: demo-booking form INSIDE the chat (author once in Meta's free Flow Builder; our webhook handles the response → upsertLeadCore). PW-scale proof: 3× leads via WA forms (vendor-claimed).
13. **CTWA attribution**: capture the `referral` object (ctwa_clid, ad id) from inbound webhook → lead source; fire CAPI `business_messaging` conversion events so Meta optimizes ads toward enrollments.
14. **In-chat payments**: `order_details` message → UPI inside WhatsApp (Razorpay "Payments on WhatsApp") — fee collection without leaving the chat. Blocked on Razorpay creds.
15. **AI assist**: "Summarize thread" + "Suggest reply" buttons (Claude over the thread + lead context); auto intent-score on inbound.

## 4. Explicitly not building

Vendor-style no-code bot builders (author Flows in Meta's builder), a separate labels system (lead stages are the labels), read receipts/typing indicators, WhatsApp groups support (API doesn't expose it), buying WATI/AiSensy (₹2.4k–9k/mo AND fragments the CRM).

## 5. Activation dependencies (unchanged)

Inbound: `INTERAKT_WEBHOOK_SECRET` (or Meta webhook registration + `WHATSAPP_*` keys). Outbound: `WHATSAPP_ACCESS_TOKEN`+`WHATSAPP_PHONE_NUMBER_ID` (or `INTERAKT_API_KEY`). The whole v2 UI works against the existing DB regardless — it lights up fully when keys land.
