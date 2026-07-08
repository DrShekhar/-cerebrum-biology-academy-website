# Platform Vision — Extraordinary Biology Coaching Platform + Lead & Enrollment Machine

**Date:** Jul 8, 2026. Synthesis of: this week's code audits (CRM / admin / teacher / counselor / student), 6 research briefs (Kajabi, Thinkific, LearnWorlds 2026 launches; WhatsApp Business Calling API India; WhatsApp team-inbox vendor patterns; Indian edtech mechanics incl. PW DRHP data). All vendor conversion stats flagged as such; DRHP numbers are audited-adjacent.

---

## 1. The thesis

We are NOT behind on product — we are behind on **packaging and activation**. The audits show Cerebrum already owns features LearnWorlds/Thinkific charge enterprise prices for (in-video quiz checkpoints, AI quiz/outline generation, server-side timed CBT, SM-2 flashcards, course-grounded AI tutor, drip, tier gating). What's missing is:

1. **The growth machine** — the funnels that turn our CBT engine + 19,619-question bank into leads (scholarship test, diagnostic test, test-series SKU).
2. **The WhatsApp command center** — the counselor workspace where marketing works prospects uninterrupted: inbox polish, **calls with recording**, AI call intelligence.
3. **The onboarding machine** — payment → automated WhatsApp welcome → parent capture → behavioral lifecycle nudges.
4. **The student experience layer** — the north-star dashboard redesign + daily-loop mechanics that make retention feel inevitable.

PW's DRHP proves the model we should copy at our scale: **95% of their offline students first engaged online; 70% were repeat app/YouTube users; marketing spend only ~9% of revenue.** Free online value → identified lead → counselor conversion → offline/hybrid ARPU (their offline ARPU ₹40k+ vs online ₹3.7k). Our SEO/AEO footprint is the equivalent top-of-funnel; the middle of the funnel is what we now build.

---

## 2. Where we stand (honest audit, Jul 2026)

**Strong / already own (don't rebuild):**

- CRM engine: canonical `upsertLeadCore` (dedup, round-robin, HOT routing), 15 capture endpoints, SLA watchdog, KPI cron, drip sequences, payment-reminder automation w/ counselor-task safety net, AI copilot on lead detail, staff comms, per-user permissions. Security hardened (IDOR cluster closed Jul 8).
- Course builder: ~LW/Thinkific parity — workspace, dnd, bulk upload, drip, quiz-as-lesson, AI outline+quiz, lifecycle, **in-video checkpoints** (LW's flagship — we have it).
- Student LMS: CBT simulator end-to-end (rank/percentile/review/proctor logging), flashcards, AI doubt solver, gradebook, mistakes book, secure video, certificates, ratings, in-player notes.
- WhatsApp: Cloud API inbound webhook + outbound (Meta primary, Interakt fallback), shared inbox v1, inbound lead engine (code-ready).

**Dormant (env keys, not code):** all outbound WA/email sending, inbound webhook secret, Meta CAPI, Razorpay live creds. **This gates almost everything below.**

**Genuinely missing:** the funnels (§3), calls + recording (§4), onboarding automation (§5), student daily-loop + parent digest (§6), conversion cockpit (funnel view, attribution dashboards in daily use).

**Competitive positioning notes:**

- LW is weak on high-stakes exam security — our CBT + question bank is the moat; add per-student randomized pools to complete it.
- Thinkific's community is severed from lessons (top third-party criticism) — inline per-lesson doubt threads beat them.
- Thinkific's Thinker AI (Plus-only, course-grounded tutor w/ answer-leak safeguards + per-learner credit limits) ≈ our CERI/ARIA; copy the safeguards + per-user AI credit caps (we now have permission overrides to hang limits on).
- Certificates: Thinkific needs paid Accredible for verification — a native `/verify/{certificateId}` page is a cheap win.

---

## 3. The Growth Machine (lead-gen + enrollment conversion, ranked)

### 3.1 Cerebrum Scholarship Test — our ANTHE/NSAT ★ single highest-ROI build

The proven #1 lead machine in Indian test-prep: Aakash ANTHE ~11.8 lakh takers/yr (₹200 fee), Allen TALLENTEX 2.5 lakh, PW NSAT free w/ ~57% show rate (all company-claimed). Mechanics that make it work: run **Oct–Dec** (admission-decision season), **everyone wins a scholarship tier** (every taker becomes a discounted-price lead), **result delivery = counseling call**, multiple phases, shareable scorecard (organic reach).
**We already own the exam engine + bank.** Build: public registration lander (name/phone/class/city → upsertLeadCore) → admit card (WA template) → scheduled CBT window (existing simulator, basic anti-cheat already logs tab-switches) → score bands → fee-waiver certificate (shareable, QR-verified) → auto counselor task with score + waiver hook. **Effort: M (1–2 wk).**

### 3.2 Free diagnostic test → study-plan report → counselor call

30-min adaptive diagnostic → instant chapter-level strength/weakness report page/PDF → "discuss your plan" booking → counselor gets the report in the lead timeline. Converts because the call becomes consultative, not cold. Mostly glue on CBT + CRM + chapter taxonomy. **Effort: S–M.**

### 3.3 Test series as a standalone SKU

₹999–₹4,999 self-serve product (anchors: PW ₹1,499–5,499, Allen ₹6,490+). Hook = **All-Cerebrum rank** leaderboard + weak-topic report + "Improvement Book" (our mistakes book, already built). Low-friction entry price laddering to full course. **Effort: M.**

### 3.4 Click-to-WhatsApp ads attribution + segmented broadcasts

Inbound messages from Meta CTWA ads carry a `referral` object (`ctwa_clid`, ad ID, creative). Capture into lead source; fire **Conversions API `business_messaging` events** on conversion so Meta's algorithm optimizes toward enrollments (reportedly ~9/10 advertisers miss this). Plus: broadcast segmentation UI (stage/class/city), WA checkout-nudges. **Effort: S–M** on existing stack.

### 3.5 Two-sided referral program

Referrer fee-credit + referee discount, in-dashboard "refer" surface, credit ledger + admin approval. We have `referral_codes`; missing the product. Coaching is word-of-mouth — formalize it. **Effort: M.**

### 3.6 Checkout conversion pack (each S–M)

- **Abandoned-checkout recovery**: capture `checkout_started` → WA+email sequence (Baymard: ~70% average abandonment; recovery reclaims 5–15%, industry benchmark).
- **Order bump**: test-series checkbox on course checkout (Thinkific vendor-claim: +20% AOV); 1-click post-purchase upsell page.
- **Batch urgency engine**: real batch dates, seat counters, fee-rise countdowns on landers + drips (honest numbers only — never fabricated).
- **Exit-intent + lead magnets**: diagnostic test / chapter-PDF offered on exit from pricing/course pages (we have the exit-intent API; broaden the interception layer).
- **Alumni proof wall**: filterable verified-selections database (year/college/score/city/video) with per-city embeds — our compliant substitute for the stripped review schema, and AEO fodder.

---

## 4. WhatsApp Command Center (the owner's ask: uninterrupted team↔prospect work + recorded calls)

### 4.1 Inbox v2 (build — we own the rails; vendors' moat is just UI)

The five highest-leverage vendor patterns to copy (from WATI/AiSensy/Interakt/DoubleTick/Zoko/Periskope analysis):

1. **Stop-on-reply drips** (sequence halts the moment the lead replies).
2. **Per-agent analytics**: first-response time, resolution time, chats handled, open-vs-resolved + 1-tap CSAT button after resolution; SLA countdown badges (watchdog already exists — surface it).
3. **@mention private notes inline** in the chat timeline (staff-bell notify; we have threaded comments — render them in-thread).
4. **Quick replies** (`/` picker, `{{name}}` interpolation) + approved-template picker with 24h-window awareness (composer auto-switches to templates outside the window).
5. **Demo-booking WhatsApp Flow** — in-chat form (name/class/city/slot) authored free in Meta's Flow Builder; response webhook → `upsertLeadCore`. Zero website hop. (PhysicsWallah drove 3× leads via WA forms — vendor-claimed.)
   Plus: stage-tabs as inbox views (lead stages ARE the labels — one source of truth), unassigned queue + my-chats.
   **Buy math:** vendors ₹1k–9k/mo but fragment the CRM (chats in WATI, leads in ours) — exactly what we don't want. **Build. Effort: M.**

### 4.2 Calls + recording — two-phase architecture

**Phase 1 (day-1, recommended): Exotel click-to-call for normal phone calls.**

- "Call" button on lead detail → our API route → Exotel bridge API (counselor's phone rings, then prospect; virtual number as caller ID).
- `Recording` flag on; Exotel's `StatusCallback` webhook returns duration + `RecordingUrl` → stored in a new `call_logs` table → rendered in the lead timeline with an audio player.
- **Compliance (India):** effectively one-party consent — a participant may record — but **DPDP Act 2023** requires notice: play/say "this call may be recorded for quality and training" up front, log the disclosure, set a retention window. No DLT for agent-to-prospect calls; prefer calling inbound leads (which is our model).
- Cost ballpark ₹5k–15k/mo at 500–1,500 calls (quote needed). **Glue effort: S (1–2 days).**

**Phase 2: WhatsApp Business Calling API** (verified GA in India):

- Business-initiated calls allowed in India (prereq: WABA messaging limit ≥2,000/24h). Consent = Call Permission Request template (7-day or permanent grant; capped 1/day, 2/week). Inbound WA calls FREE; outbound billed per-minute in 6-second pulses, answered-only.
- No native recording — but **SIP termination onto our own infrastructure is first-class**, so server-side recording is feasible and not prohibited (consent still required). Turnkey recording-ready: **Exotel** (WA calling beta inside their contact center — same vendor as Phase 1, natural upgrade) or Twilio.
- Verdict: real, but engineering-heavy (media stack / softphone). Do Phase 1 first; revisit when volume justifies.

### 4.3 AI call intelligence (build; <₹10k/mo at our volume)

Pipeline: recording webhook → STT → one Claude call → structured JSON (summary, objections, commitments, next step + follow-up date, QA rubric score) → lead timeline + auto follow-up task. Our CALL_SUMMARY agent already exists — this wires its missing recording pipeline.

- **STT for Hinglish**: Sarvam AI Saarika (built for Hindi/English code-switching, ~₹1.5/min) primary; Deepgram Nova ($0.0043/min) / Whisper fallback. A/B on 20 real calls first.
- Same LLM pass over WhatsApp threads = conversation summaries + intent scoring in the inbox.

### 4.4 In-chat fee collection (when Razorpay creds land)

Meta's India Payments: `order_details` message → prospect pays via UPI **inside WhatsApp** (Razorpay "Payments on WhatsApp" config). Pairs with installment reminders — genuine differentiator for fee collection.

---

## 5. Smart Onboarding Machine (payment → thriving student, zero manual steps)

State machine (`onboarding_steps` table + existing cron + existing senders), triggered by the Razorpay webhook:

1. **T+0** (utility template, ~₹0.12/msg): payment received + receipt + what-happens-next.
2. **T+5 min**: login magic-link (never raw passwords over WA).
3. **T+1 h** (WhatsApp Flow): profile completion — class, target year, **parent name + phone** captured in-chat straight into Prisma.
4. **T+1 day**: orientation slot booking + counselor→mentor handoff intro.
5. **Parent track**: welcome to the captured parent number; **fortnightly WA progress digest** (PW Parent App's exact stat list: attendance, lecture %, DPP %, test scores vs batch) + PTM booking.
6. **Week 1–2**: study-plan nudges; **inactivity triggers** ("no video watched in 5 days" → nudge; day-12 of trial → offer).
7. Student dashboard shows an onboarding checklist (profile ✓ orientation ✓ first test ✓ parent linked ✓).

Step 6 generalizes into the **behavioral lifecycle automations engine** (Kajabi's core): an events table + when/then rules + action executors (WA/email/task/flag) covering the whole student lifecycle — demo-no-enroll 48h → nudge; failed 2 quizzes in a chapter → doubt-solver prompt + counselor flag; absent from class → recording link + parent alert. **Effort: onboarding S–M; full rules engine M–L.**

---

## 6. Student experience & retention (the "extraordinary" layer)

1. **P1 dashboard redesign** (already specced in STUDENT_LMS_ROADMAP_2026_07.md; design locked): score ring, trajectory chart, today's-plan card, chapter-mastery heatmap, last-test analysis. The visible wow.
2. **Streaks + daily goals + DPP**: daily question set keyed to class position (bank exists), streak freeze tokens, loss-warning push/WA. Table stakes in every competitor app; Duolingo-documented retention driver.
3. **Live "DPP solving together" evening ritual** (PW's 2026 flagship mechanic): teacher solves the day's DPP live at a fixed hour on Zoom + our quiz-as-lesson for the in-class attempt. Cheapest high-touch engagement for a small academy — a scheduled ritual, not poll infra.
4. **Verified shareable certificates + scorecards**: native `/verify/{id}` page + share prompts — every shared scholarship scorecard is organic lead-gen.
5. **Inline per-lesson doubt threads** (beats Thinkific's severed community); community funnel phase 1 = operated free WA/Telegram tier (daily quiz autopost from our bank, NEET news) funneling to batches.
6. **AI video layer**: auto transcripts/captions (Cloudflare Stream supports captions), chapters, AI-suggested checkpoint placement every 3–5 min, per-lecture drop-off analytics (we log video_progress — aggregation UI missing).
7. **Per-student randomized question pools** on test templates (unique set per respondent, optional no-backtrack) — completes our exam-security moat over LW.

---

## 7. Explicitly NOT building (deliberate)

White-label native mobile app (PWA + push + WA covers re-engagement; Capacitor wrap M–L if ever), SCORM/LTI (enterprise LMS market, not ours), own RTC live-video stack (Zoom + companion layer instead), in-house voice-AI telephony, Kajabi-style AI funnel-copy generator (we generate in-house), podcasts/coaching products, in-app ads manager (use Meta Ads Manager), no-code Flow builder (author Flows in Meta's free builder).

---

## 8. Build order (impact ÷ effort, with dependencies)

| Phase                          | What                                                                                                                                     | Effort                         | Depends on                     |
| ------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------ | ------------------------------ |
| **A. ACTIVATE**                | Env keys: WhatsApp (Meta tokens + webhook secret), Razorpay live, Anthropic, CRON_SECRET, Upstash, Resend. Everything dormant lights up. | Owner action                   | —                              |
| **B. Growth cluster** ★        | Scholarship test funnel + diagnostic funnel + abandoned-checkout + urgency engine + exit-intent magnets (§3.1, 3.2, 3.6)                 | 4–6 wk total, individually S–M | B partially needs A (WA sends) |
| **C. WhatsApp Command Center** | Inbox v2 five patterns + Exotel click-to-call w/ recording + AI call intelligence + CTWA attribution (§4)                                | ~3–4 wk                        | Exotel account (owner), A      |
| **D. Onboarding machine**      | Payment→welcome state machine + parent track + inactivity triggers → grows into lifecycle rules engine (§5)                              | 1 wk, engine +2–3 wk           | A (Razorpay + WA)              |
| **E. Student experience**      | P1 dashboard redesign + streaks/DPP + certificates verify + live-DPP ritual ops (§6)                                                     | 3–4 wk                         | none (can parallel B)          |
| **F. Monetization pack**       | Test-series SKU + order bumps + referral program (§3.3, 3.5, 3.6)                                                                        | 2–3 wk                         | A (Razorpay)                   |

**Recommended start: B + the Exotel glue from C** (the calls piece is 1–2 days once the account exists) — it attacks the stated goal (leads + enrollment) with the least new surface area, reusing the engines already shipped.

## 9. Owner decisions & actions needed

1. **Env keys (Phase A)** — the single biggest unlock; most of the automation stack is code-complete and dark.
2. **Exotel account + quote** (or approve me to draft the comparison email); confirm per-minute rates.
3. **Scholarship test decisions**: brand name (e.g. "Cerebrum Scholarship Test — CST"), waiver bands (e.g. 90/75/50/25% by score), dates/phases (Oct–Dec), ₹0 vs ₹99–200 registration.
4. **Test-series pricing** (suggest ₹1,499 launch anchor vs PW).
5. **Call-recording disclosure copy** + retention window (DPDP) — I'll draft; you approve.
6. **WABA messaging-limit check** (≥2,000/24h needed for WA Calling Phase 2 later).
