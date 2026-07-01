# Campbell Question Bank + Q-Bank Tool — Audit Findings & To-Do

**Audited:** 30 Jun 2026 (2 Explore agents — data audit + tool code audit). Nothing fixed yet; this is the backlog.

## What exists
- **Campbell bank (data):** 6,031 questions, 83 JSON files under `src/data/mcq-batches/olympiad/` (+ root `olympiad-campbell-batch1.json`). Seeded into the `questions` table via `prisma/seed-mcq-batches.ts` (recurses whole tree; requires `batch.name` — all files have it).
- **Q-Bank tool (code):** `src/app/neet-biology-mcq/page.tsx` (1,370-line client SPA) is the real engine. Reads from DB (not JSON). Public, no login. Has a Campbell/Olympiad tab + Campbell Unit→Chapter filters + API params (`campbellChapter`/`campbellUnit`/`olympiadLevel`). Grades server-side via `/api/mcq/submit`.
- Separate formal-test engine: `/tests` + `/api/test/*` (NOT the MCQ tool).

## STATUS (updated 30 Jun 2026)
- **#1 (a) MTF — DONE.** Dry-run reversed the assumption: of 734 MTF, 392 are genuine (TF-pattern answer + statement options, graded fine), and **342 were single-answer MCQs mislabeled MTF** (answer = a letter or comma-TF text; options were the TF-strings). Reclassified those 342 → `MCQ` across 45 files (fixes rendering via QuestionCard + grading). 392 genuine MTF left as-is. **Needs re-seed to hit the DB.**
- **#3 (c) test-submit 500 — DONE.** Replaced the invalid `user_question_responses.testAttemptId` lookup with a match on `test_attempts` by `freeUserId` (+ template); guarded so a miss still completes the session. Also cleared 2 pre-existing TS errors.
- **#4 (d) hygiene — DONE.** Removed 2 dup stems (ch18 #47, ch50 #48, totals decremented); resolved ch26 to Unit 4 everywhere (the lone MCQ file tagged Unit 5 was the outlier vs chapter metadata + the ch22–26 wave file — retagged 93 Qs + moved file to unit4-evolution/).
- **#5 (e) AP/USABO enabler — PARTIAL.** Added a `curriculum` filter to `/api/mcq/questions` + `/api/mcq/counts` (the backend enabler). STILL TODO: a visible exam/curriculum toggle in the UI; a fixed-length scored "diagnostic" mode (depends on #2 for the email-gated report); verify AP/Campbell Qs are seeded **and `isVerified:true`** in the live DB.
- **#2 (b) wire lead modal — WON'T DO (by design).** Owner confirmed (30 Jun 2026): the lead modal should ONLY offer "Message us on WhatsApp" — NO email form, NO /api/free-users capture. The audit's "dead-wired" finding is intended behaviour, not a bug. Do not add an email gate. Side effect (accepted): anonymous users never get a freeUserId, so gamification/weak-topic report stays off for them.

## OPEN — ClaudeChat copy/paste issue (reported 30 Jun 2026, UNRESOLVED)
- Symptom (owner): "unable to copy text and paste back in the chat" / "not working the same way."
- Code pass found NO paste blocker anywhere: all 4 chat inputs (`/claudechat` page `inputMessage`, `EnhancedClaudeChatBoard` `inputText`, site `ChatInput.tsx` textarea, Ceri `IntelligentChatbot` `inputValue`) are standard controlled fields; no onPaste/preventDefault-on-paste, no document clipboard listener, no `user-select:none` on messages.
- **Most likely cause:** `/claudechat` page + Ceri widget use single-line `<input type="text">` (Ceri has `maxLength={500}`) → pasting multi-line/long text gets stripped/truncated. Likely fix: swap `<input>` → `<textarea>` + raise/remove the cap.
- **Blocked on owner answer:** (1) which surface — `/claudechat` page or the floating Ceri bubble? (2) which direction — pasting INTO the box, or copying the AI reply OUT? desktop or phone? Fix differs by answer.

## TO-DO (priority order)

### 1. [DONE] [HIGH — correctness] Normalize MTF answer formats (~497 questions)
- 734 `MTF` questions store `correctAnswer` in **3 incompatible formats**: ~237 as T/F patterns (`"TTTF"`), ~330 as a single letter (`"A"`), ~167 as full option text.
- Grader `calculateMTFScore` (`src/lib/mcq/gamification.ts`) does **char-by-char positional compare expecting a `TTTF` pattern**. So only the 237 pattern-format ones grade correctly; the **~497 letter/full-text ones mis-grade**.
- **Fix:** write a script to inspect the ~497 affected Qs and convert to the canonical `TTTF` pattern (DRY-RUN first). Some single-letter "MTF" are probably plain MCQs mislabeled — split those out by changing `type` to `MCQ` instead.
- Files: heaviest are ch06-07 wave, ch08-10 wave (~15 each); 28 files total. Also check seed line ~131 (`correctAnswer.toUpperCase()`).

### 2. [HIGH — lead magnet] Wire the lead-capture modal
- `src/components/mcq/LeadCaptureModal.tsx` declares an `onSubmit` prop but **never destructures or calls it**, and has **no input fields** — only WhatsApp/Call/Skip buttons. So no email/lead is ever captured from the quiz.
- The working capture fn already exists & is passed in: `handleLeadCapture` (`neet-biology-mcq/page.tsx:676`) → POST `/api/free-users` → sets `freeUserId`. It's orphaned dead code.
- **Fix:** (a) destructure `onSubmit`; (b) add an email (+name/phone) form; (c) on submit call `onSubmit(...)`; (d) also route the lead to `upsertLead`/`/api/leads` so it hits the CRM, not just `free_users`; (e) gate the weak-topic report behind the email.
- **Side benefit:** setting `freeUserId` also turns on persistent XP/streak/**weak-topic report** (anonymous users currently get none — see #5).
- For USA use: modal copy is NEET-branded ("improve your NEET Biology score") → needs an AP/USABO variant.

### 3. [HIGH — broken] Fix formal-test submit 500
- `src/app/api/test/[id]/submit/route.ts:382` queries `prisma.user_question_responses.findFirst({ select: { testAttemptId: true } })` — `user_question_responses` has **no `testAttemptId`** (it's `testSessionId`; `testAttemptId` is on `test_questions`, schema.prisma:2848). → Prisma validation error → **500 on every `/tests` submission**.
- Confirmed TS error. Does NOT affect the MCQ tool (different route).
- NOTE: the old "parent dashboard `prisma.tests` missing model" claim appears **stale** — no `prisma.tests` call exists anymore. Parent 500 is more likely a downstream effect of this bug.

### 4. [LOW — hygiene]
- Delete 2 exact duplicate stems: `campbell-ch18-gene-regulation.json` #47 (dup of #27); `campbell-ch50-sensory-motor.json` #48 (dup of `campbell-ch48-neurons-synapses.json` #41).
- Resolve ch26 unit mismatch: data tags `campbellUnit: 5` but `src/data/campbell-biology/units.ts` puts ch26 in Unit 4 (range 22–26).
- Align root `olympiad-campbell-batch1.json` schema (uses legacy `tags`/`chapter`/`ncertClass`/`campbellEdition`) with the chapter-file schema; spot-check for near-dup overlap with deep chapter files.

### 5. [MEDIUM — for AP/USABO diagnostic lead magnet]
- Anonymous users never get a `freeUserId` → no persistent stats/XP/weak-topic report (gamification dead on common path). Fixed by #2.
- No curriculum/board/exam filter: only an `isOlympiad`+Campbell bucket. To target AP/USABO, either tag content as Campbell/olympiad or add a `curriculum` filter to `/api/mcq/questions` + `/api/mcq/counts` + a UI toggle.
- Add a fixed-length, scored "diagnostic" mode (vs open-ended practice) with the weak-topic report gated behind email (#2). Topic-mastery analytics already exist server-side (`mcq_user_stats.topicMastery`).
- Verify AP/Campbell questions are actually seeded in the live DB **and `isVerified:true`** (tool only serves verified Qs) — else the Campbell tab is empty.

## Strategic context
This bank + tool is the proposed engine for a **public AP/USABO free-diagnostic lead magnet** (zero marginal cost, uses assets already built) — the on-site lead-capture play for the USA-leads push. Foundation ~80% there; #2 is the keystone blocker.
