# CRM Fix Plan — 2026-07-23

Source: five-agent end-to-end code audit (counselor app, admin CRM, lead capture, follow-up/messaging, auth + data model) run 2026-07-23. Every item below is backed by a verified `file:line` finding — no items carried over from older docs.

Legend: **P0** = losing leads/revenue today · **P1** = broken UI or misleading features staff touch daily · **P2** = security/robustness · **P3** = data model + dead code cleanup.

---

## ✅ STATUS — updated 2026-07-23 (end of day)

All code phases (1–4) are **implemented and committed** on branch `fix/crm-phase1-followups` (4 commits, based on origin/main). `npx tsc --noEmit` is fully green (was 2 errors); followupEngine tests 44/44.

| Item | Status | Commit |
|---|---|---|
| 1.1 Demo form → API | **SKIPPED by owner decision** — WhatsApp-direct flow kept so owner keeps getting direct messages | — |
| 1.2 Event-driven follow-up rules | ✅ Done — rules fire on lead create/touchpoint (`upsertLead`) + stage change (`updateLeadFields`); cron sweep rewritten as all-rule-types backstop; dedup hardened (event rules once-per-lead-per-rule; TIME_BASED/INACTIVITY cooldown) | `0403d70` |
| 1.3 trial/contact → CRM | ✅ Done — HOT lead + counselor task; analytics kept | `0403d70` |
| 1.4 Silent-failure visibility | ✅ Done — Sentry on upsertLead failure + daily `/api/cron/leads-reconcile` (3:15 AM IST) | `0403d70` |
| 2.1 Merge Duplicates endpoint | ✅ Done — transactional per-group merge, 13 child relations re-parented, mergedFrom audit, dry-run default | `ce0681d` |
| 2.2 Consultant Load more | ✅ Done — real offset pagination | `ce0681d` |
| 2.3 Lead-scoring honesty | ✅ Done — rescore now uses the live engine (was a 3rd divergent algorithm); rules API mirrors real engine (categories now render — they previously rendered EMPTY); fake preview diff removed; rescore hidden for non-admin | `ce0681d` |
| 2.4 Source filter + Hot tile server-side | ✅ Done — also removed bogus "direct" source option | `ce0681d` |
| 2.5 Bulk assign UI | ✅ Done — checkboxes + assign bar + Rebalance button wired to the orphaned assign API | `ce0681d` |
| 2.6 Button.tsx casing | ✅ Done — BOTH casings were git-tracked; lowercase duplicate removed; also fixed MarkdownWithDiagrams TS error → tsc fully green | `ce0681d` |
| 3.1 /consultant server-side auth | ✅ Done — middleware protection + server-component layout gate (consultants row OR admin — same rule as the APIs; the old client-only gate admitted ONLY admins) | `0e25faf` |
| 3.2 Auth hygiene | ✅ Done — 13 routes' role checks normalized; unauth mock endpoint deleted (demo page now uses static data); crons on shared requireCronAuth | `0e25faf` |
| 3.3 Consultant commissions | ✅ Conservative fix — honest "pending admin confirmation" note; box renders only with real data. Auto-creating commissions on ENROLLED = **open owner decision** | `0e25faf` |
| 4.1 contact_inquiries backfill | ✅ Done — backfill route + nightly reconcile scan both capture logs | `f91e1d9` |
| 4.2 Email-only captures | ✅ Done — email-match → touchpoint on existing lead (no phoneless lead creation) | `f91e1d9` |
| 4.3 Drip sequences | ✅ Done — **correction: sending was ALREADY wired** (dbDripProcessor, hourly nurturing cron; the CRUD route's note was stale). Fixed: triggerStage enum validation, hours-input dropped on save, stats from real execution markers | `f91e1d9` |
| 4.4 Dead endpoints | ✅ Done — seo/leads/capture + leads/whatsapp-gate deleted; blog-query honest 500. Interakt template workaround stays until `seo_content_approval` template is approved | `f91e1d9` |
| 4.5 Phone normalizer | ✅ Done — utils/phone delegates to canonical @/lib/leads/phone | `f91e1d9` |
| 4.6 leadId FK consolidation | ⏳ DEFERRED — needs Prisma schema migration against prod DB; schedule separately | — |

### Still needs the owner (nothing else blocks)

1. **Push the branch**: `git push -u origin fix/crm-phase1-followups` (no GitHub credentials in the agent session).
2. **Phase 0 env verification** in Vercel prod: WhatsApp (`WHATSAPP_ACCESS_TOKEN`+`WHATSAPP_PHONE_NUMBER_ID` or `INTERAKT_API_KEY`), `RESEND_API_KEY`, Twilio/MSG91, `WEBHOOK_SECRET_*` (**unset = prod rejects ALL partner leads**), `CRON_SECRET`. Then one live smoke test per channel.
3. **Activation**: create ≥1 active rule in `/counselor/followup/rules`; toggle authored drip sequences to Active.
4. **Open decisions**: (a) auto-create commission on consultant ENROLLED, or keep admin-side? (b) keep or remove the `ADMIN_ACCESS_KEY` side door (`src/lib/auth/admin-auth.ts`)?
5. ~~Remove stale `SMTP_*` lines from `.env.example`~~ ✅ done in the status-update commit.

---

## Phase 0 — Production config verification (½ day, no code)

The send pipeline and partner webhooks are code-complete but silently no-op or fail closed without env keys. Before any code fix, confirm in Vercel production env:

| Purpose | Vars | Failure mode if missing |
|---|---|---|
| WhatsApp outbound | `WHATSAPP_ACCESS_TOKEN` + `WHATSAPP_PHONE_NUMBER_ID` (Meta) or `INTERAKT_API_KEY` | follow-ups return `success:false`, logged only |
| WhatsApp inbound | `WHATSAPP_VERIFY_TOKEN`, `WHATSAPP_WEBHOOK_SECRET`, `INTERAKT_WEBHOOK_SECRET` | inbox goes dark |
| Email | `RESEND_API_KEY`, `RESEND_FROM_EMAIL` (fallback `SENDGRID_*`) | email follow-ups no-op |
| SMS | `TWILIO_ACCOUNT_SID/AUTH_TOKEN/PHONE_NUMBER`, `MSG91_AUTH_KEY` | SMS follow-ups no-op |
| Partner lead webhooks | `WEBHOOK_SECRET_*` per source | **prod rejects ALL JustDial/Sulekha/ads leads** (`api/webhooks/leads/route.ts:390,409`) |
| Crons | `CRON_SECRET` | all 19 crons return 401/500 |

Deliverable: checklist of set/unset vars + one live smoke test per channel (send one WhatsApp, one email, one SMS via `/counselor/followup/queue` execute).

Also remove stale `SMTP_HOST/SMTP_USER/SMTP_PASS` from `.env.example:96-102` (dead per `emailService.ts:13-16`).

---

## Phase 1 — P0: Stop losing leads (2–3 days)

### 1.1 Wire the public demo-booking form to an API
**Finding:** `src/components/demo/DemoBookingForm.tsx:33` only opens WhatsApp; all four demo endpoints have zero public callers. Demo bookings never reach `demo_bookings`/`leads`.

- Pick **`/api/demo-booking` (POST)** as canonical — it already has honeypot (`route.ts:214`), time-trap (`:226`), serializable slot-conflict txn (`:326`), lead creation + referral redemption.
- Change `DemoBookingForm` to POST there first; on success, optionally continue the WhatsApp handoff (keep it as confirmation channel, not the capture channel).
- Fix the known edge inside the endpoint: when no COUNSELOR/ADMIN user exists it skips the `leads` write (`demo-booking/route.ts:455`) — alert instead of silently skipping.
- Deprecate the other three: delete `/api/leads/demo-booking` and `/api/demo-slots/book` (no callers), keep `/api/demo/book` only for the PWA offline replay path it still serves (`OfflineFormHandler.tsx:100`) until PWA is migrated.
- **Verify:** Playwright test — submit public form → row in `demo_bookings` + `leads` + counselor sees it in Kanban.

### 1.2 Fire follow-up rules on lead events
**Finding:** `processLeadRules()` is only called from the TIME_BASED cron sweep (`followupEngine.ts:214`); STAGE_CHANGE / DEMO_NO_SHOW / DEMO_COMPLETED / OFFER_SENT / SCORE_THRESHOLD / INACTIVITY rules never fire on the actual events.

- Call `processLeadRules(leadId, trigger)` (fire-and-forget with error logging) from:
  - `upsertLeadCore` after create (`src/lib/leads/upsertLead.ts:261`) — trigger: lead created
  - `updateLeadFields` on stage transition (`src/lib/leads/leadService.ts:198-230`) — trigger: STAGE_CHANGE (this also covers OFFER_SENT / DEMO_COMPLETED stages)
- Make the engine evaluate event rules from the event, not only inside the TIME_BASED window (`followupEngine.ts:187-217`).
- Guard against duplicate enrollment (unique on `followup_queue` per lead+rule or existence check — pattern already exists in the processor).
- **Verify:** integration test — create lead → matching STAGE_CHANGE rule inserts `followup_queue` row → cron `processQueue` sends it → `followup_history` SENT.

### 1.3 Route trial-extension requests into the CRM
**Finding:** `/api/trial/contact` writes only an `analytics_events` blob (`route.ts:16`) and returns 200 even on failure; name/phone/email are invisible to counselors.

- Add `upsertLead()` call (same pattern as `/api/enquiry`) + a HIGH-priority task for the assigned counselor; keep the analytics event.
- Return a real error status on failure.
- **Verify:** submit from `TrialExpiredModal` → lead appears in counselor pipeline with task.

### 1.4 Surface silent CRM-write failures
**Finding:** `upsertLead()` is fire-and-forget with `.catch(() => {})` at every call site; a DB failure means the lead exists only in `content_leads`/`contact_inquiries`.

- Keep fire-and-forget (correct — never block a public form), but report failures to Sentry with the source route tag, and add a daily reconciliation: extend the existing backfill (`api/admin/leads/backfill`) into a cron that promotes phone-bearing `content_leads` rows with no matching `leads` row. That makes the backfill the safety net instead of a manual button.

---

## Phase 2 — P1: Fix what staff see as broken (2–3 days)

### 2.1 Merge Duplicates — implement the missing endpoint
`admin/students/leads/page.tsx:159-196` calls `/api/admin/leads/merge-duplicates` which doesn't exist; every click errors.
- Implement it: group `leads` by `phoneNormalized` last-10, keep oldest-with-most-activity as survivor, re-parent relations (notes, tasks, crm_communications, fee_plans, activities, followup_queue/history) in a `$transaction`, mark losers merged/deleted, log an `activities` audit row. Honor the existing dry-run → confirm UI contract.
- This is the riskiest data mutation in the plan — ship behind dry-run default, test on a DB copy first.

### 2.2 Consultant "Load more"
`consultant/leads/page.tsx:392-395` empty onClick; API already supports `offset`/`hasMore`. Implement append-pagination. (30 min.)

### 2.3 Lead-scoring page honesty pass
- Hide "Rescore All Leads" for non-ADMIN (`lead-scoring/page.tsx:503`; API 403s at `rescore/route.ts:13`) or show a disabled state with tooltip.
- Fix preview (`preview/route.ts:40-41` returns stored score as both current and calculated): either run the real engine in simulate mode or relabel the UI to "current scores" and drop the fake was→now diff (`page.tsx:697`).
- Remove the 17 cosmetic `DEFAULT_RULES` (`page.tsx:47-217`) — render the 7 real engine rules from the API only, and unify the THIRD rule set inside `rescore/route.ts:42-160` with the engine rules so score and rescore agree.
- Fix `preview/route.ts:56` returning empty-success on error.

### 2.4 Admin leads table correctness
- Make `source` a server-side filter (add to `buildLeadListWhere`, `leadService.ts:39`) — currently client-only (`page.tsx:295-304`).
- Make "Hot Leads" tile use server stats like the other tiles (`page.tsx:347` counts current page only).

### 2.5 Bulk assign — give the orphaned API its UI
`/api/admin/leads/assign` (single/bulk/rebalance/workload, fully implemented, transactional, notifies via WhatsApp) has zero callers. Add row-checkbox multi-select + "Assign to counselor" + "Rebalance" actions on the admin leads table. This is free functionality already built and tested at the API layer.

### 2.6 Button.tsx casing fix (do first, 15 min)
`src/components/ui/Button.tsx` vs `button.tsx` TS1261 conflict sits on an import path used by several CRM pages — breaks case-sensitive (Linux/CI) builds. Consolidate to one casing, fix imports. Also fix the unrelated `MarkdownWithDiagrams.tsx:77` TS2322 to get `tsc --noEmit` fully green.

---

## Phase 3 — P2: Auth & robustness (2 days)

### 3.1 Server-side protection for /consultant
- Add `/consultant` to `isProtectedRoute` (`middleware.ts:180-200`) and add an `/api/consultant/` gate branch (mirror the counselor branch at `:736-753`).
- Resolve the guard mismatch: pages admit only ADMIN (`ConsultantLayoutClient.tsx:24-31`) while APIs admit any authenticated user with a `consultants` row. Decide the model — recommended: "authenticated + consultants row" everywhere (that's the API semantic), with ADMIN override; apply the same check in the layout server-side.
- Longer term (Phase 4 candidate): add `CONSULTANT` to the `UserRole` enum instead of table-existence checks.

### 3.2 Auth hygiene (contained scope — don't boil the ocean)
- Normalize role comparisons: leaderboard/kpis/goals/lead-scoring routes compare exact-case strings; route them through `authenticateCounselor()` (`counselor-auth.ts:20`) which upper-cases.
- Delete `api/counselor/leads/demo/route.ts` (mock data, unauthenticated, unused) rather than keep the `ALLOW_DEMO_ENDPOINTS` guard.
- Unify the two inline cron-auth copies onto `verifyCronAuth()` (`lib/auth/cron-auth.ts`).
- Document/decide on the `ADMIN_ACCESS_KEY` side door (`admin-auth.ts:171-210`): if it's needed for ops scripts, restrict to specific routes; otherwise remove. Full NextAuth/legacy-JWT unification stays in `AUTH_UNIFICATION_PLAN.md` — out of scope here.

### 3.3 Consultant ENROLLED completeness
PATCH→ENROLLED only flips status (`consultant/leads/[id]/route.ts:222`) — no `commissions` row, no `enrollments` link, while the detail page renders commission fields (`[id]/page.tsx:546-587`). Either create the commission record on ENROLLED (against `consultants.commissionRate`) or hide the commission UI until the admin process writes it. Decide with business logic owner before coding.

---

## Phase 4 — P3: Data model + dead code (3–4 days, lower urgency)

1. **`contact_inquiries` backfill** — one-off script promoting phone-bearing historical rows into `leads` via `upsertLeadCore` (backfill currently covers `content_leads` only, `api/admin/leads/backfill/route.ts:33`).
2. **Email-only captures** — newsletter signups never reach the CRM (phone-based dedupe). Add email-based dedupe fallback in `upsertLeadCore` or an explicit email-lead lane.
3. **Drip sequences** — authored sequences persist but never send (`drip-sequences/route.ts:8-12`); wire `leadNurturing`/`whatsappDripService` to read active persisted sequences instead of their hardcoded series, then allow `isActive:true`.
4. **Delete confirmed-dead surface:** `seo/leads/capture`, `leads/whatsapp-gate` (orphans), `leads/blog-query`'s silent-success on DB failure, the no-op `transformLead` line (`admin leads page.tsx:110`), `sendSEOContentApproval` template workaround (`interakt.ts:758-818`) once the template is approved.
5. **Phone normalizer unification** — `@/lib/leads/phone` vs `@/lib/utils/phone`; keep one.
6. **Longer-term consolidation** (separate scoped project, don't bundle): four lead silos (`leads`/`content_leads`/`contact_inquiries`/`referrals`) and four communication tables (`crm_communications`/`communication_logs`/`whatsapp_messages`/`call_logs`). Minimum first step: add nullable `leadId` FK on `content_leads` and `contact_inquiries` stamped by `upsertLead`, so every capture row links to its CRM lead.

---

## Sequencing & effort

| Order | Work | Est. |
|---|---|---|
| 0 | Env verification + channel smoke tests | 0.5 d |
| 1 | 2.6 Button casing (unblocks CI safety) | 0.25 d |
| 2 | 1.1 Demo form wiring | 1 d |
| 3 | 1.2 Event-driven follow-up rules | 1 d |
| 4 | 1.3 trial/contact + 1.4 Sentry/reconciliation cron | 0.5–1 d |
| 5 | 2.1 Merge duplicates endpoint | 1 d |
| 6 | 2.2–2.5 UI fixes + bulk assign UI | 1–1.5 d |
| 7 | 3.1–3.3 Auth phase | 2 d |
| 8 | Phase 4 items, individually scheduled | 3–4 d |

Total: ~10–12 focused days. Phases 1–2 (≈5 days) remove every "losing leads today" and "staff-visible broken" item.

## Verification gates (each phase)

- `npx tsc --noEmit` green (fully green after 2.6).
- Playwright: public form → lead in counselor Kanban (1.1, 1.3); rule → queue → send → history (1.2).
- Dry-run-only rollout for merge-duplicates until validated on a prod DB copy.
- Post-deploy: watch Sentry for `upsertLead` failure events (new in 1.4) for one week.
