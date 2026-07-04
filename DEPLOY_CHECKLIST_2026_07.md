# Deploy Checklist — July 2026 batch (~99 unpushed commits)

Everything shipped between mid-June and Jul 4, 2026, in dependency order.
Supersedes the deploy sections of `TODO_NEXT.md` (Jun 12). What shipped:
CRM fixes + comms/automation, GSC/SEO waves, NCERT + foundation SEO pages,
**LMS roadmap Phases 0–2**: CBT exam simulator, AI doubt solver, smart
flashcards, web push, tier gating, teacher course builder (drip +
prerequisites), interactive-video checkpoints, AI course generator.

---

## 1. Push the branch

```bash
git push origin main
```

If the permission classifier blocks it again, run it yourself with `! git push origin main`.

## 2. Database migrations (before or with the deploy)

One command applies the whole batch (schema.prisma is the source of truth):

```bash
npx prisma db push
```

Or apply the SQL files in `prisma/manual-migrations/` individually (all
idempotent, all additive, no DROPs):

| File | What it adds | Feature |
|---|---|---|
| 2026-07-02_add_leads_metadata.sql | leads.metadata Json | CRM upsert |
| 2026-07-03_add_system_user.sql | canonical system user | activities/AI senders |
| 2026-07-03_add_marketing_campaigns.sql | marketing_campaigns | campaigns |
| 2026-07-03_add_whatsapp_message_events.sql | whatsapp_message_events | Interakt webhook |
| 2026-07-03_add_leads_phoneNormalized.sql | leads.phoneNormalized | dedup |
| 2026-07-03_add_leads_phoneNormalized_unique.sql | unique index | **run AFTER dedup backfill** |
| 2026-07-03_add_welcome_series_events.sql | welcome_series_events | drip emails |
| 2026-07-03_add_email_suppressions.sql | email_suppressions | bounce handling |
| 2026-07-03_add_test_sessions_answerState.sql | test_sessions.answerState | CBT resume |
| 2026-07-03_add_test_sessions_percentileRank.sql | test_sessions.percentileRank | CBT rank |
| 2026-07-04_add_push_subscriptions.sql | push_subscriptions | web push |
| 2026-07-04_add_study_materials_requiredTier.sql | study_materials.requiredTier | tier gating |
| 2026-07-04_add_chapters_drip_prerequisite.sql | chapters.releaseAt + requiresPrevious | course builder |
| 2026-07-04_add_video_checkpoints.sql | video_checkpoints | interactive video |

## 3. Environment variables (Vercel)

### New this batch
- [ ] `ANTHROPIC_API_KEY` — AI doubt solver, AI course generator (also ARIA/CERI).
      Without it these return graceful 503s.
- [ ] `VAPID_PUBLIC_KEY` + `VAPID_PRIVATE_KEY` (+ optional `VAPID_SUBJECT`) —
      web push. Generate once: `npx web-push generate-vapid-keys`.
      Without them the enable-notifications button simply doesn't render.
- [ ] `EMAIL_WEBHOOK_SECRET` — then point the Resend/SendGrid bounce webhook at
      `/api/webhooks/email`.

### Still outstanding from June (blocking revenue/CRM)
- [ ] `RAZORPAY_KEY_ID` / `RAZORPAY_KEY_SECRET` / `RAZORPAY_WEBHOOK_SECRET`
      (webhook → `/api/payments/webhook`). No payments until set.
- [ ] `INTERAKT_API_KEY` (+ `INTERAKT_WEBHOOK_SECRET`), `WHATSAPP_ACCESS_TOKEN`,
      `WHATSAPP_PHONE_NUMBER_ID` — lead alerts, demo reminders, welcome series.
- [ ] `CRON_SECRET` — followup/reminder crons 401 without it.
- [ ] `UPSTASH_REDIS_REST_URL` / `_TOKEN` — payment-webhook idempotency
      (in-memory fallback is unsafe multi-instance) + rate limits.
- [ ] Facebook Pixel ID; verify GA4/GTM.

## 4. Post-deploy, one-time

- [ ] **Backfill stranded leads**: `POST /api/admin/leads/backfill` (dryRun
      first). Then merge the 5 known dupes, then apply the phoneNormalized
      unique index.
- [ ] **Seed the CBT question bank** if prod `questions` lacks Botany/Zoology
      rows (`prisma/seed-mcq-batches.ts`; template auto-creates on first run).
- [ ] **Verify MCQ DB count** vs batch files (memory says 10,133 in JSON;
      DB count unverified).
- [ ] **GSC**: request re-indexing after the SEO waves go live.

## 5. Smoke tests after deploy

| Feature | Check |
|---|---|
| CBT | /cbt → start mock → answer few → submit → result + review; resume works mid-test |
| AI doubt solver | /doubt-solver → typed question → solution; photo → solution; escalate creates OPEN ticket |
| Flashcards | /flashcards → deck loads → grade cards → session summary |
| Push | dashboard → Enable notifications → post a notice targeted ALL → notification arrives |
| Tier gating | set requiredTier=PINNACLE on a material (admin PATCH) → FREE student gets 403 + upgrade msg |
| Course builder | /teacher/courses → builder → add/reorder/drip/prereq chapter → student course shows lock |
| Interactive video | teacher adds checkpoint → /learn video pauses at timestamp → answer → resumes |
| AI generator | builder → Generate with AI → draft → apply → chapters appear |
| Lead funnel | submit contact + enquiry forms → lead appears in CRM with counselor + task |

## 6. Known follow-ups (not blockers)

- `/api/lms/videos` has **no enrollment check** (auth + tier only) — pre-existing gap, flagged Jul 4.
- Student course page: render a lock badge for `locked` modules (API already returns `locked`/`lockReason`).
- Flashcards use guest `freeUserId` (localStorage) — cross-device continuity needs account linking.
- Doorway Tier B consolidation: wait for GSC impression data.
- GBP links / Faridabad+Gurugram pins / phone verification — owner decisions (see TODO_NEXT.md §D).
