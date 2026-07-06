# Endpoint Usage Plan — Orphan-Route Disposition (Jul 6, 2026)

Follow-up to `DASHBOARD_ENDPOINT_AUDIT_2026_07_06.md`. Three code-reading agents audited every "no-UI-caller" route. Every endpoint now has a disposition: **LOCKED** / **DELETED** / **KEEP-AS-IS** (external/public-by-design) / **WIRE** (backlog with exact target). Phases 1–2 are EXECUTED; the WIRE backlog is the build plan.

## ✅ EXECUTED — Phase 1: Locked (15 endpoints)

| Endpoint | Was | Now |
|---|---|---|
| `/api/notifications/sms` | open — Interakt template sends to ANY number (money) | CRON_SECRET Bearer |
| `/api/whatsapp/welcome-series` | open drip trigger (money) | CRON_SECRET |
| `/api/automation/behavioral-trigger` | open drip trigger (money) | CRON_SECRET |
| `/api/leads/nurture` | open nurture sends + CRM writes | CRON_SECRET |
| `/api/lms/whatsapp` | open bot sends | CRON_SECRET |
| `/api/leads/score` | open — leaked lead names/phones/emails | COUNSELOR/ADMIN session |
| `/api/analytics/test-session` | IDOR (any attemptId) | owner-or-staff |
| `/api/analytics/topic` | IDOR (any userId) | self-or-staff |
| `/api/blog/images` | open paid AI image generation | ADMIN |
| `/api/ai/test-generation` | every logged-in user could burn OpenAI tokens | ADMIN/TEACHER |
| `/api/mcq/community/ai-screen` | rate-limit-only LLM + DB-write | ADMIN or CRON_SECRET |
| `/api/ai/test/start` + `submit` | client-controlled studentId | bound to session user |
| `/api/ai/test/[testId]` GET/PATCH | IDOR read + blind update | owner-or-staff |
| `/api/ai/test/results/[testId]` | IDOR results read | owner-or-staff |
| `/api/ai/tutor/history/load/[sessionId]` | any user read any chat | scoped to own rows |

## ✅ EXECUTED — Phase 2: Deleted (16 files)

| Route | Why |
|---|---|
| `/api/agent/cicd` | UNAUTH endpoint spending Anthropic credits; internal dev tool exposed in prod |
| `/api/ai/question-generator` | dead stub ("being upgraded" text) — superseded by agents/generate-questions |
| `/api/whatsapp/ai-bot`, `enhanced-webhook`, `process-message` | 3 redundant Meta-webhook experiments; canonical inbound = `/api/whatsapp/webhook` (documented, HMAC-timing-safe). process-message was UNAUTH |
| `/api/webhooks/firebase` (+ its test) | legacy Firebase-auth era; auth is NextAuth now |
| `/api/payment/create-order` + `verify` (singular) | dead paid-demo path; live = `/api/payments/*` + `/api/seminar/payment/*` |
| `/api/auth/counselor/send-otp` + `verify-otp` | counselors use standard `/sign-in` (stated on their own login page) |
| `/api/user/me` | legacy Firebase-token auth |
| `/api/cache/demo` | demo code, prod-blocked anyway |
| `/api/calendar/events` + `availability` | in-memory MOCK arrays (writes vanished per-invocation); events was UNAUTH |
| `/api/diagrams/ncert-chapters` | duplicate of live `/api/mcq/ncert-chapters` |

## KEEP-AS-IS — external / public-by-design (false-positive "orphans")

- `/api/whatsapp/webhook` — **canonical Meta Cloud API inbound** (HMAC timing-safe, fail-closed). This is the URL to register in Meta when direct API goes live.
- `/api/whatsapp/interakt-webhook` — Interakt inbound; **Interakt lib is still the app-wide send engine** (inert only because keys unset). Keep until the Meta migration completes, then retire together with `notifications/sms`.
- `/api/payments/webhook` (Razorpay), `/api/payments/cashfree/webhook` — gateway webhooks, signature-verified.
- `/api/inngest` — Inngest platform handler (payment reminders, lead onboarding). ⚠️ add `INNGEST_SIGNING_KEY`/`EVENT_KEY` to prod env.
- `/api/webhooks/email` — bounce/complaint suppression (Resend/SendGrid).
- `/api/lms/webhook` — Cloudflare Stream video-status (HMAC, correctly built).
- `/api/certificates/verify/[code]` — public QR verification (used by /verify-certificate page).
- `/api/demo-slots` + `/api/demo-slots/book` — WhatsApp Flow + widget (built Jul 2026, live).
- `/api/leads/whatsapp-gate`, `/api/leads/demo-booking`, `/api/seo/leads/capture` — public lead forms (rate-limited by design).
- `/api/seo/indexnow` (script-called, secret-gated), `/api/version`, `/api/placeholder/*` (dev, prod-blocked), `/api/trial/extend` (ADMIN_SECRET_KEY-gated manual tool), `/api/courses/pricing`, `/api/subscription-tiers` (public reads).
- Edge-gated admin/counselor dormants: `admin/{ai-metrics,data-retention,seed-topics,mcq/import-batch,webhooks*,fee-plans/[id]}`, `counselor/{fee-plans,payment-link/generate}`, `timetable/seed` + `diagrams/import` (in-file ADMIN guards).

## 🔧 WIRE BACKLOG — build plan (endpoints kept because they're product features)

**W1. Counselor AI copilot** (`/api/agents/*`, 10 routes — coherent, counselor-gated, cron-consumed):
- Lead detail page gets an "AI Assist" panel: **Qualify** (qualify-lead), **Prep Call** (call-prep), **Draft Nurture** (generate-nurture → WhatsApp compose), **Generate Offer** (generate-offer), **Recommend Courses** (recommend-courses).
- Comms timeline: **Summarize call** (summarize-call) → chain **Extract action items** (extract-actions → creates tasks).
- Student CRM detail: **Upsell ideas** (analyze-upsell).
- `transcribe` stays dormant until a call-recording pipeline exists.
- Cost note: each click = LLM spend (Anthropic). Consider per-counselor daily caps.

**W2. AI test engine** (`/api/ai/test/*`, now ownership-locked): wire a student test-runner (start → progress PATCH → submit → results page). Overlaps the live `/api/mcq/*` platform — decide ONE platform first; don't run both.

**W3. Admin/CRM quick wires**: `wall-of-achievers/nominate` (nominate button on the page), `gamification/xp` (XP history widget), `coupons/validate` (enrollment checkout), `demo-booking/cancel` (booking management UI), `admin/webhooks*` (build the admin Webhooks settings page or leave dormant).

**W4. Consolidations**: 3 question-generators exist (`agents/generate-questions` [keep — best gated], `ai/test-generation` [now staff-only], deleted stub) → converge on one. `ai-management` (multi-provider LLM/voice/visual subsystem, ADMIN-gated, speculative) → owner decision: build UI or delete next quarter.

**W5. Migration sequencing (WhatsApp)**: current sends all route through Interakt lib (keys unset → inert). Plan: configure Meta Cloud API creds → point sends at Meta → register `/api/whatsapp/webhook` in Meta console → then delete `interakt-webhook`, `notifications/sms`, and the Interakt lib.

## Env actions for owner
- `CRON_SECRET` — already used by crons; the 6 newly-locked service endpoints now require the same Bearer token when called internally.
- `INNGEST_SIGNING_KEY` + `INNGEST_EVENT_KEY` — set in Vercel so the Inngest handler verifies signatures.
