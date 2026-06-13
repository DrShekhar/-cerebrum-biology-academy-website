# Remaining Work — picking up tomorrow (as of Jun 12, 2026)

Branch is **~66 commits ahead of origin/main, all unpushed.** Everything below assumes that
work ships first. Full detail lives in `CRM_AUDIT_2026_06_12.md`, `AEO_GEO_SEO_GAP_AUDIT_2026_06.md`,
and `LEAD_CONSOLIDATION_SCOPE.md`.

---

## A. DEPLOY & CONFIG — owner only (nothing works in prod until these are set)

- [ ] **Push the branch**: `git push origin main` (~66 commits — funnel fixes, /global, fake-review
      strip, sitemap, links, AEO rebuild, local SEO, dashboard, CRM auto-capture + CRM code fixes).
- [ ] **Payment credentials** (real, in Vercel): `RAZORPAY_KEY_ID`, `RAZORPAY_KEY_SECRET`,
      `RAZORPAY_WEBHOOK_SECRET` (point the Razorpay dashboard webhook at `/api/payments/webhook`).
      Cashfree keys if used. Until set, no payment can be taken.
- [ ] **CRM notification keys**: `INTERAKT_API_KEY`, `WHATSAPP_ACCESS_TOKEN`,
      `WHATSAPP_PHONE_NUMBER_ID`. Without them a lead lands in the CRM but **no admin alert fires**.
- [ ] **`CRON_SECRET`** + **Upstash Redis** (`UPSTASH_REDIS_REST_URL`/`_TOKEN`) — for follow-up
      crons, webhook idempotency, and real rate limiting.
- [ ] **Facebook Pixel ID** (real value; either env var name now works) + verify GA4/GTM live.
- [ ] **Run the lead backfill once**: `POST /api/admin/leads/backfill` (admin) — pulls the 37
      stranded content_leads into the CRM. Try `{ "dryRun": true }` first.
- [ ] **Request GSC re-indexing** after deploy: homepage, `/global`, `/neet-coaching-delhi`,
      regional hubs; resubmit sitemap. Then wait 2–4 weeks.

## A2. FROM FULL AUDIT (Jun 12) — see FULL_AUDIT_2026_06_12.md — several CRITICAL

- [x] **~20 missing Prisma models** → BUILT (commits 9188fb53, ea6acb83, e2019f80). 18 new models
      (gamification ×5, consultant/referral/commission/pending_conversion ×5, notices ×2, worksheets ×2,
      wall_of_achievers ×2, self_evaluations, work_tracking) + payment_links. mcq_user_stats gained the
      11 gamification columns. Counselor money + WhatsApp services migrated off the InstantDB mock to
      Prisma. Parent dashboard `tests` → `test_assignments`. New-model feature code now type-clean.
      **DEPLOY-CRITICAL**: tables don't exist in the live DB yet — apply
      `prisma/manual-migrations/2026-06-12_add_feature_models.sql` (additive, 0 DROPs) via `prisma db push`
      BEFORE these features work at runtime. Parent dashboard still has DEEPER pre-existing relation drift
      (child user has no `test_attempts` relation; `student_attendance` aliased) — that's a feature-rebuild
      in the drift batches below, NOT done.
- [ ] **~133 creates omit `id`, ~65 omit `updatedAt`** (incl. `/api/enrollment/route.ts:62` — enrollment
      throws). One-shot fix: add `@default(cuid())` + `@updatedAt` to the relevant schema columns.
- [x] **Type `prisma` as `PrismaClient` + clear ALL drift** — ✅ COMPLETE. `tsc --noEmit` now **0 errors**
      (was 1,205 when the typing fix first surfaced the backlog). Cleared across many commits: 18 missing
      models built, counselor money/WhatsApp remap, then field/relation drift reconciled across ~200 files
      (auth, enrollments, parent/teacher/student/counselor portals, analytics, quiz/mcq/omr/test, payments,
      whatsapp/automation, certificates, webhooks…). Most done by parallel sub-agents under a shared
      schema cheat sheet, verified centrally. parent/dashboard rebuilt (child relation aliased; test_attempts
      is empty since a users row has no such relation). **The prisma client is now type-checked end to end —
      future schema drift fails compilation instead of 500ing at runtime.** - ⚠️ **Runtime follow-ups flagged during the sweep** (compiled via stopgaps, but will FAIL at runtime
      until modelled — owner decisions): - **student-notes routes** (`/api/student/notes*`) target a student-notepad model that doesn't exist;
      only a CRM lead-note `notes` model exists. Cast `as any` to compile. Needs a real `student_notes`
      model + migration, or the feature disabled. - **offers / fee-plan input schemas** don't collect required columns (offerName/courseName/
      originalPrice/finalPrice) → those routes persist placeholder/empty values. Fix the input schemas. - **welcome-series & webhook-retry** state has no column to persist to (`leads.metadata`,
      `webhook_deliveries.nextRetryAt/metadata`) → those background loops effectively no-op. - **free_users has no `phone`**, **users has no avatar/`currentClass`** → phone/avatar/class now
      null or body-sourced in several routes. - **followupProcessor** writes `rule.priority` (Priority enum) into `tasks.priority` (TaskPriority) —
      latent invalid-enum write (not a tsc error; `rule` is `any`). Map HOT/WARM/COLD→HIGH/MEDIUM/LOW. - A few `'system'` placeholder FKs in fire-and-forget activity/comm writes — need a real system user
      or to be dropped. - NOTE: id/updatedAt omissions did NOT surface in tsc (Prisma marks them optional) — supplied where a
      create errored for other reasons; the broad set is benign (DB defaults / app-level).
- [x] **Counselor money features lost** — DONE (ea6acb83). feePlanService.ts + counselor/whatsapp.ts
      migrated off the InstantDB mock to Prisma (fee_plans/installments/offers/fee_payments/activities/
      crm_communications). Type-clean. Needs the migration applied (above) to persist at runtime.
- [x] **Payment masking** — DONE (196d1b33). Cashfree webhook now returns 500 on processing failure
      (so Cashfree retries instead of dropping a captured payment); Razorpay payments/verify fires an
      admin reconciliation alert + flags enrollmentPending on post-signature DB failure (webhook backstops
      activation); demo payment/verify got an idempotency guard.
- [x] **2 stored-XSS sinks** — DONE (196d1b33). free-resources AnnouncementBanner + [id]/page now pipe
      DB/admin HTML through createSafeHtml(). _(PII-in-logs redaction still TODO — see below.)_
- [x] **PII in logs** — DONE (6095d97e). Wrapped the error-level logs that carried real PII (MSG91/Twilio
      provider responses echoing the phone; Resend error data; welcome-email address) with the existing
      redactObject/redactPII. removeConsole strips console.log in prod; only these error/warn sites leaked.
      No full-request-body logs found elsewhere.
- [x] **251 broken internal links** — DONE (f472204e). 218 dead city-hub `url:` links now redirect to
      real city/region hubs via `cityHubBrokenLinkRedirects` (audit: 0 conflicts/chains/shadows).
      Detector: `scripts/find-broken-cityhub-links.mjs`. _(Remaining ~30 from the audit were seo-landing
      `/resources//tools/` namespace + hard-coded JSX — separate, not city-hub data.)_
- [x] **LeadCaptureForm** — DONE (298828a5). Enter-to-submit + real ref-based double-submit guard.
- [ ] **251 broken internal links remain** — mostly `city-hub-data.ts` `url:` fields (190) +
      seo-landing `/resources//tools/` namespace mismatch (25) + hard-coded JSX (22, incl.
      BreadcrumbSchema `/glossary` in JSON-LD). 6 dead board-page WhatsApp CTAs (`<Button href>` no-op).
- [ ] **Content**: rating contradiction (5.0/38 vs 4.5–4.8 + 847/1247 reviews); "100% Selection"/
      "Guaranteed admission" claims; "XYZ Coaching" placeholder in metrics.ts:365; AIIMS 67 vs 65 vs 85;
      "NEET 2025" stale labels; identical testimonials on 11 pages; legal pages "last updated = today".
- [ ] **UI/UX**: two overlapping mobile bottom bars; LeadCaptureForm Enter+double-submit; EnrollmentForm
      a11y; mobile nav has no Menu entry; blog double-h1; carousel buttons no aria-label; parent/ portal
      no loading/error boundary.

## B. CRM — finish making it fully usable (code; mostly small)

- [ ] **Fix the follow-up crons** (`/api/cron/followup-queue` + `/api/cron/followup-triggers`):
      they only export POST, but Vercel Cron sends GET → 405 → `followup_queue` is written but
      never processed. Add GET handlers (with `CRON_SECRET` check). _(I offered to do this next.)_
- [ ] **Merge the 5 existing duplicate leads** — no tool exists. Write a small admin dedup
      endpoint/script (group by last-10 phone, keep oldest, move activities/tasks/notes, delete rest).
- [ ] **Admin CRM UI wiring** (APIs exist, buttons don't): assign/reassign button → `/api/admin/leads/assign`;
      convert button + flow → `/api/admin/leads/convert`; an **admin lead-detail page** (none exists);
      list **pager** (stuck on page-1/limit-20). _(from the crm-ui audit)_
- [ ] **Counselor lead-detail activity timeline** currently synthesizes from comms+tasks and never
      reads the real `activities` table — point it at `activities`.
- [ ] **`counselor/whatsapp/send`** writes via the InstantDB mock (`@/lib/db`), not Prisma → throws.
      Repoint to the real Prisma `crm_communications` + Interakt send.
- [ ] **Lead scoring**: wire `updateLeadScore(leadId)` into capture/demo/payment hooks (today 0 leads
      are ever scored; the "top leads" view is empty), or accept it as an on-demand admin tool.
- [ ] **Auto-advance stage** on demo-completed and on payment (only demo-_scheduled_ auto-advances now).
- [ ] **Placeholder-email fix** in `/api/admin/leads/convert` (`{phone}@placeholder.cerebrum.app`) —
      require/collect a real email at conversion so converted students are reachable.

## C. Other code follow-ups (from the wider audits)

- [ ] **Lead consolidation B4**: add a "seen across N channels" dedup badge to `/admin/inquiries`
      (it's read-only today). B0–B2 + backfill are done.
- [ ] **Doorway Tier B** (deferred, needs GSC data): once 4–6 weeks of post-deploy impression data
      is in, merge the 57-city × 5-intent matrix to 1 page/city with anchors + 301s. (Tier C noindex
      already shipped.)
- [ ] **git-derived sitemap `lastModified`** (currently a blanket date) — only worth it for the
      file-backed routes; documented as a dedicated pass.
- [ ] **Rate limits**: move `enquiry` + `blog/capture-lead` off in-memory onto the shared Redis
      `rateLimit`, and loosen the tight `exit-intent` (3/hr/IP) so shared/NAT IPs aren't dropped in
      an ad burst.

## D. DECISIONS NEEDED FROM OWNER (then I implement)

- [ ] **Real Google Business Profile share links** for each centre (all 6 `g.page` links are dead) —
      single biggest local-SEO lever left. Also the **true Faridabad/Gurugram map pins** (2 conflicting
      values each in code).
- [ ] **Verify +91 99536 43938** is an answered line (it's the call CTA on ~150 Noida/Ghaziabad
      landing pages, not in CONTACT_INFO). If dead, replace with the primary number.
- [ ] **Pricing relativities** AI engines now quote side-by-side: GAMSAT has no USD tier; IB
      ($6,000/yr) vs A-Level ($6,500 Pinnacle) — confirm intentional.
- [ ] **Missing advertised tools** (rank predictor, college predictor, study-plan generator) are in
      the tools registry but routes don't exist — build, or remove from the registry?

---

### Done this session (for reference — do NOT redo)

Funnel fixes · /global two-homepage · fake-review schema strip · 17 un-shadowed pages · sitemap
(0 redirect/404) · 50+ broken links · AEO rebuild (llms.txt 6.5KB + fact block + crawler tokens) ·
local SEO (hours/coords/NAP/Noida) · student dashboard real data · CRM auto-capture (all forms) ·
CRM code fixes #1–#3+#5 (dedup, 8 writers, task subsystem, backfill). Dead stub payment webhook deleted.
