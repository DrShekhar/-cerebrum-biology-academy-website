# Cerebrum LMS Roadmap — 2026

_Synthesis of a 4-agent LMS audit (content delivery, assessment, engagement, CBT) + competitor
research (ALLEN, PW, Unacademy, Udemy) and creator-LMS research (LearnWorlds, Kajabi, Thinkific,
SCORM/xAPI). Authored Jul 3 2026._

---

## 1. Executive summary — where we are

Cerebrum is **not a coaching marketing site with a login — it is a genuine LMS.** The audit found a
large, mostly-real feature surface. The standout finding: our **assessment engine is best-in-class**
(it beats the big exam-prep apps on adaptive testing + spaced repetition), while our gaps are
concentrated in **live classes, the exam-day CBT simulator, offline, content-authoring UX, an AI
doubt solver, and a native app.**

**Strong today (LIVE):** secure video (Cloudflare Stream + DRM + watermark + resume), ~10k MCQ bank
across 15 question types, SM-2 spaced repetition, adaptive testing (IRT + CAT), full/sectional mocks,
DPP + PYQ, deep analytics (weak-area, rank/percentile, score prediction), gamification (XP / streaks /
badges / levels / leaderboard), student + parent + teacher dashboards, attendance, certificates
(with QR verification), notices, worksheets, self-evaluation, doubt forum, AI question screening,
AI-assisted teacher test builder, PWA.

**Where we're behind competitors:** interactive live classes (only Zoom demo bookings today),
production CBT exam simulator, offline downloads, drag-drop course authoring (API-only today),
AI photo-to-answer doubt solver, native mobile app, polished community / study groups, push
notifications.

**Overall maturity:** roughly **70% LIVE, 15% partial, 15% missing** across the LMS.

---

## 2. Current-state scorecard

| Dimension | Status | Notes |
| --- | --- | --- |
| Video delivery | **LIVE** | Cloudflare Stream, signed-URL DRM, watermark, resume, speed/quality, progress |
| Study materials / notes / PDFs | **LIVE** | Vercel Blob, access-gated (FREE/ENROLLED/PREMIUM) |
| Assessment (MCQ, mocks, DPP, PYQ) | **LIVE** | 15 question types, ~10k bank, timed/chapter/topic/custom modes |
| Spaced repetition (SM-2) | **LIVE** | `/api/mcq/review`, review-schedule model |
| Adaptive testing (IRT + CAT) | **LIVE** | Full engine + UI; exceeds most competitors |
| Analytics (weak-area, rank, prediction, peer) | **LIVE** | `performanceService`, `rankCalculator`, `weakAreasAnalyzer`, `predictionEngine` |
| Gamification (XP/streaks/badges/levels/leaderboard) | **LIVE** | Wired to real actions; streak-freeze supported |
| Dashboards (student / parent / teacher) | **LIVE** | Real Prisma data; parent portal is a genuine strength |
| Attendance (mark / self-check-in / reports) | **LIVE** | Auto-mark, geolocation/QR option |
| Certificates (issue / template / verify / download) | **LIVE** | QR verification, revocation |
| Notices / worksheets / self-evaluation / work-tracking | **LIVE** | — |
| Doubt forum (submit + teacher answer) | **LIVE** | AI *screening* for community Qs is live |
| Notifications (email / WhatsApp / SMS / in-app) | **LIVE** | Multi-channel |
| **Live interactive classes** | **PARTIAL** | Zoom = demo bookings only; no recurring classroom, no in-class chat |
| **CBT exam simulator** | **PARTIAL (~60%)** | Palette, timer, mark-for-review, results exist; no sections / candidate gate / anti-cheat enforce / server resume / real 180-Q papers |
| **AI doubt solver (photo → answer)** | **STUB** | ARIA/CERI + Claude plumbing exist; not wired as an instant doubt solver |
| Teacher course-authoring UI | **STUB** | Course/chapter/material CRUD is API-only; no builder UI |
| Interactive video (in-video quizzes) | **MISSING** | Secure playback yes; interactive layer no |
| Push notifications (FCM/web push) | **STUB** | Schema-ready, no SDK |
| Offline downloads (video/notes) | **MISSING** | PWA shell only |
| Native mobile app | **MISSING** | Installable PWA only |
| Study groups / cohorts + community 2.0 | **MISSING / PARTIAL** | Forum backend live, UI thin; no groups |
| OMR scan, proctoring enforcement | **MISSING / PARTIAL** | Proctoring flags exist, not enforced |

---

## 3. Competitive positioning

**Exam-prep apps (our real competitors):**

- **PW** — live + recorded, DPP, test series, doubt solving, **offline downloads**, 15M students.
- **ALLEN Digital** — live + recorded, national test series with **all-India rank**, **AI 24×7 doubt
  solver**, 2 lakh+ Q bank, 1 lakh+ PYQ, flashcards / interactive notes / improvement booklets.
- **Unacademy** — live classes with chat, **Ask-a-Doubt (photo → video solution)**, PYQ banks.
- **Udemy** — course player (resume, progress, notes, AI assistant, Q&A), certificates, offline.

**Creator LMS platforms (different category — course-selling tooling, not exam prep):**

- **LearnWorlds** — best-in-class **interactive video**, SCORM 1.2/2004, quizzes/exams/assignments,
  **drip + prerequisites**, white-label mobile app, AI assistant.
- **Thinkific** — many lesson types, SCORM, assignments with manual review, communities, memberships.
- **Kajabi** — marketing-first all-in-one (email + funnels + **Community 2.0** with challenges/
  leaderboards + coaching); only quizzes, **no SCORM**, no prerequisites.

**SCORM / xAPI / cmi5 verdict:** SCORM is a B2B / corporate-training / content-interop standard.
Relevant only if we (a) import third-party course packages, (b) license/white-label our content into
other institutions' LMSs, or (c) let non-developers author with tools like Articulate. Our native
React content (video + interactive MCQs + adaptive tests) is already richer than SCORM can express.
**Not a priority — revisit only if we pursue B2B content distribution.**

**Net position:** we **exceed** every competitor on assessment depth, adaptive testing, spaced
repetition, and analytics; we **trail** on live classes, offline, AI doubt solving, native app, and
content-authoring UX. Notably, **no competitor above ships a CBT exam simulator** — it's whitespace.

---

## 4. The roadmap (prioritized)

Effort key: **S** ≈ days · **M** ≈ 1–2 weeks · **L** ≈ 3–4 weeks · **XL** ≈ 6+ weeks.

### PHASE 0 — CBT exam simulator (NOW) · effort **L**

**Why first:** (1) explicitly requested; (2) **NEET 2027 is confirmed moving to CBT mode** — this is
becoming exam-critical, not optional; (3) it's whitespace no competitor fills; (4) it's an
*extension* of an already-~60%-built engine, not greenfield.

Build order (each a shippable slice):

1. **Section navigation** — Botany / Zoology / Physics / Chemistry tabs driven by `test_templates.sections`.
2. **Instructions + candidate-details gate** — read-and-agree checkbox before start.
3. **Server-side answer persistence + resume** — periodic save; "resume from Qn"; survive refresh.
4. **Anti-cheat enforcement** — tab-switch / visibility detection, fullscreen lock, disable copy/
   right-click; populate `tabSwitchCount` / `suspiciousActivity`.
5. **Real 180-Q / 720-mark NEET template** + +4/−1 scoring at scale; real percentile from DB.

_Already done (reuse):_ colour-coded palette, whole-paper timer + auto-submit, mark-for-review,
submit → summary → results with score / rank / solutions / subject analysis, full test data models.

### PHASE 1 — cheap, high-signal wins · effort **S–M each**

- **AI doubt solver (photo → instant answer)** — reuse the existing Anthropic plumbing; upload a
  question image → step-by-step solution; log to the doubt system with a "escalate to teacher"
  fallback. Closes a heavily-marketed ALLEN/Unacademy gap. **M.**
- **Flashcards UI** on top of the existing SM-2 engine — a genuine revision surface competitors tout;
  the algorithm already exists. **S–M.**
- **Rule-triggered notifications + web push (FCM)** — auto-alerts on attendance dip / test result /
  fee due; wire the stubbed push channel. **M.**
- **Tier-based content gating** — enforce `CoachingTier` on `/learn` + material endpoints (low effort,
  enables upsell). **S.**

### PHASE 2 — content authoring & richer lessons · effort **L each**

- **Teacher course-authoring builder** — drag-drop course/chapter/lesson UI with **drip scheduling**
  and **prerequisite/locked progression** (the LearnWorlds/Thinkific pattern). Removes the
  engineer-in-the-loop for content; biggest scaling unblock. **L.**
- **Interactive video** — in-video quizzes / checkpoints / branching on top of the secure player
  (LearnWorlds' signature feature). **L.**
- **AI course/lesson generation** — extend the existing AI test generator to draft lesson outlines/
  content for the authoring UI. **M** (rides on the builder).

### PHASE 3 — reach & retention · effort **L–XL each**

- **Offline downloads** — service worker + encrypted local cache for video/notes (table-stakes vs
  every exam-prep competitor; critical for India connectivity). **XL.**
- **Native mobile app** — React Native / Expo wrapper over existing APIs + PWA, or a white-label
  wrapper. App-store distribution + push. **XL.**
- **Live interactive classroom** — recurring class scheduling + in-class chat/Q&A (embed or a
  real-time layer). Biggest structural gap but heaviest lift; sequence after the above. **XL.**

### PHASE 4 — community & monetization · effort **L each**

- **Community 2.0** — polish the forum UI, add **study groups / cohorts** (peer accountability =
  ALLEN/Unacademy differentiator). **L.**
- **Membership / subscription + funnel tooling** — recurring plans + drip funnels (Kajabi's core),
  building on existing payments + the new marketing CRM. **L.**

### LATER / OPTIONAL

- **SCORM / xAPI / cmi5** — only if we pursue **B2B content licensing / white-label** to schools.
- **OMR scan + auto-grade** — for offline mock-hall workflows.
- **Proctoring integration** — turn the existing flags into a real proctored-exam flow (pairs well
  with the CBT simulator).

---

## 5. Sequencing rationale

- **CBT first** because it's requested, time-boxed by the NEET 2027 CBT switch, whitespace vs
  competitors, and mostly extension work — the best effort-to-value ratio on the board.
- **Phase 1** items are small and each closes a *marketed* competitor feature (doubt solver,
  flashcards, push) — fast credibility wins while the bigger builds queue.
- **Authoring + interactive video (Phase 2)** unblock content scale and lesson richness; they gate
  how fast the catalog can grow.
- **Offline / native / live (Phase 3)** are the heavy, high-reach lifts — sequenced last among the
  "must-dos" because they're XL and depend on a stable content + auth base.
- **Community + monetization (Phase 4)** deepen retention and revenue once the learning core is
  complete.

## 6. Quick wins vs big bets

| Quick wins (S–M) | Big bets (L–XL) |
| --- | --- |
| AI doubt solver | CBT exam simulator |
| Flashcards UI (on SM-2) | Course-authoring builder (drip + prerequisites) |
| Web push + rule-triggered alerts | Interactive video |
| Tier-based content gating | Offline downloads |
| — | Native app |
| — | Live interactive classroom |

---

## 7. What we are NOT doing (and why)

- **SCORM/xAPI now** — B2B interop standard; our first-party content is richer. Revisit only for
  content-licensing/B2B.
- **Building a generic course marketplace** — we're a *vertical* NEET-biology platform; our moat is
  assessment depth + subject expertise, not horizontal course-selling.
- **Chasing every Kajabi marketing feature** — the new marketing CRM already covers campaigns; a full
  funnel builder is Phase 4, not now.

---

_Owner note: all LMS models above are live in the codebase; several depend on the unpushed
`global-aeo-geo-seo-wave1` branch + pending migrations. See the CRM/marketing memory notes for the
migration checklist. The CBT build begins immediately after this roadmap ships._
