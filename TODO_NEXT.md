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

- [ ] **~20 missing Prisma models** → whole features 500 (gamification, consultant, notices,
      worksheets, wall-of-achievers, self_evaluations, **parent dashboard `tests`**, work_tracking,
      pending_conversions). Add models + migrate, or noindex/disable those features.
- [ ] **~133 creates omit `id`, ~65 omit `updatedAt`** (incl. `/api/enrollment/route.ts:62` — enrollment
      throws). One-shot fix: add `@default(cuid())` + `@updatedAt` to the relevant schema columns.
- [x] **Type `prisma` as `PrismaClient`** — DONE (bd3dd4f4). Surfaced **1,205** real drift errors
      (tsc clean baseline was 5). Cleared 32 so far (isActive staff-query bugs + dead migrate route,
      477d5a75). **~1,173 remain**, split:
      - **~187 errors = ~20 MISSING Prisma models** → DECISION NEEDED: build the model+migrate, or
        delete/disable the feature. Affected features: gamification (xp/badges/streaks/goals ~87 errs),
        consultant/commissions/referrals, notices, worksheets, wall-of-achievers, self-evaluations,
        **parent dashboard `tests`**, work_tracking, pending_conversions. (Deleting unused ones erases
        their errors + dead code in one move — far cheaper than field-by-field.)
      - **~986 errors = field/relation-name drift** across ~140 files (e.g. `course`→`courses`,
        `lead`→`leads`, non-existent columns). Mechanical but laborious; mostly low-traffic areas
        (LMS bot, analytics dashboard, teacher/parent panels). Work in prioritized batches.
      - NOTE: id/updatedAt omissions do NOT surface in tsc (Prisma marks them optional) — lower
        severity than the audit estimated.
- [ ] **Counselor money features lost** — migrate feePlanService.ts + counselor/whatsapp.ts off the
      InstantDB mock (`@/lib/db`) to Prisma (fee plans/offers/payments/WhatsApp not persisting).
- [ ] **Payment masking** — payments/verify:265 + cashfree/webhook:169 return 200 on DB failure
      (paid-not-enrolled, no retry); payment/verify:52 add idempotency guard.
- [ ] **2 stored-XSS sinks** — sanitize free-resources AnnouncementBanner + [id]/page with the existing
      `sanitizeHtml()`. Redact PII in logs (phone/email/payment objects).
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
      never processed. Add GET handlers (with `CRON_SECRET` check). *(I offered to do this next.)*
- [ ] **Merge the 5 existing duplicate leads** — no tool exists. Write a small admin dedup
      endpoint/script (group by last-10 phone, keep oldest, move activities/tasks/notes, delete rest).
- [ ] **Admin CRM UI wiring** (APIs exist, buttons don't): assign/reassign button → `/api/admin/leads/assign`;
      convert button + flow → `/api/admin/leads/convert`; an **admin lead-detail page** (none exists);
      list **pager** (stuck on page-1/limit-20). *(from the crm-ui audit)*
- [ ] **Counselor lead-detail activity timeline** currently synthesizes from comms+tasks and never
      reads the real `activities` table — point it at `activities`.
- [ ] **`counselor/whatsapp/send`** writes via the InstantDB mock (`@/lib/db`), not Prisma → throws.
      Repoint to the real Prisma `crm_communications` + Interakt send.
- [ ] **Lead scoring**: wire `updateLeadScore(leadId)` into capture/demo/payment hooks (today 0 leads
      are ever scored; the "top leads" view is empty), or accept it as an on-demand admin tool.
- [ ] **Auto-advance stage** on demo-completed and on payment (only demo-*scheduled* auto-advances now).
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
