# CRM Smart Features & Automations Plan — vs Meritto / LeadSquared / ExtraaEdge

**Date:** July 7, 2026
**Basis:** 3-agent audit — Meritto deep-dive, education-CRM landscape (LeadSquared, ExtraaEdge, Salesforce/HubSpot, WhatsApp-CRM hybrids, 2025-26 AI trends), and a precise inventory of our own automation layer (alive / blocked / dead / missing).

---

## 1. The headline finding

**We have already built most of Meritto's core automation engine — it is switched off.** The audit found a complete, cron-scheduled automation stack (scoring, follow-up rules engine, multi-channel queue, welcome series, drip service, campaign broadcast, 12-endpoint AI agent suite with auto-qualification on every new lead, demo reminders) that is blocked almost entirely on **provider keys**, not code:

| Blocker | What lights up when set |
|---|---|
| `WHATSAPP_ACCESS_TOKEN` + `WHATSAPP_PHONE_NUMBER_ID` (Meta) or `INTERAKT_API_KEY` | Welcome series (day 0/1/3/7), drip nurture, demo reminders (WA channel), admin new-lead alerts, counselor pager, campaign broadcasts, inbound auto-replies |
| `ANTHROPIC_API_KEY` (prod) | Counselor AI Copilot (qualify/call-prep/nurture/recommend/summarize/extract), auto-qualification agents already enqueued on every new lead |
| `OPENAI_API_KEY` | Call transcription (Whisper) |
| Inngest keys | Enrollment onboarding orchestration, payment-link reminders |
| Resend / SMS keys | Follow-up queue email + SMS channels |

**Wave 0 of this plan is therefore activation, not development.**

## 2. What the market sells (distilled)

- **Meritto (₹5L+/yr)**: Mio AI Voice (autonomous Hinglish qualification/reactivation calls, CRM-native), Echo (shared WhatsApp counselor inbox), Zing (real-time intent alerts), in-chat WhatsApp forms, publisher/MEI source attribution to enrollment, application→fee continuum (Collexo), counselor benchmarking.
- **LeadSquared (₹2,500+/user/mo)**: visual Automation Designer, rule-based distribution, speed-to-lead SLA timers, telephony discipline (recordings/dispositions), ACE gamification/leaderboards/incentive automation, Converse omnichannel inbox.
- **ExtraaEdge**: AI intent scoring + "who to call today, in what order" next-best-action queue, VidyaGPT (institute-trained 24×7 bot), AI calling.
- **WhatsApp hybrids (Wati/Interakt/respond.io)**: click-to-WhatsApp ad → bot qualification → hot/warm/cold tag → counselor assign; fee reminders with payment links; **CRM stage changes fired back to Meta CAPI so ads optimize on enrollments** (respond.io's killer feature); Interakt voice+chat AI agents from ₹10k/mo.
- **Top features institutes actually pay for** (ranked): WhatsApp automation in CRM · speed-to-lead · rule-based distribution · visual journey designer · CTWA-bot qualification · AI intent scoring/next-best-action · telephony+recordings · counselor mobile/geo · 24×7 institute-trained AI agent · funnel/source analytics · fee reminders with payment links · voice-AI calling · admissions-stage management · gamified leaderboards · parent-student dual contact.

## 3. Our state (from the code audit)

**ALIVE today (no keys needed):** score recompute on every lead write; FOLLOW_UP_CALL auto-task; demo stage auto-advance; auto-enqueue of qualifier+product agents per lead; all 6 CRM crons scheduled & auth-gated; ARIA web-chat lead capture; campaign/drip CRUD; KPI/leaderboard compute-on-request.

**DEAD/orphaned:** `drip_sequences`/`drip_sequence_steps` tables (UI writes rows no processor reads — real drips are hardcoded in `whatsappDripService.ts`); lead-scoring config UI (weights hardcoded, POST refuses saves); `init-scheduler` cron unregistered; CERI chatbot captures no leads.

**MISSING vs market:** inbound WhatsApp → lead capture/routing (webhook is a keyword auto-responder only); shared WhatsApp counselor inbox; speed-to-lead SLA + escalation; score-based routing; saved segments; first-class UTM columns (currently activity-metadata JSON); bulk email campaigns (send route is WhatsApp-only); KPI cron (leaderboard stale unless requested); Meta CAPI conversion feedback; parent dual-contact; best-time-to-call.

## 4. Build roadmap (ranked by conversion impact ÷ effort)

### Wave 0 — ACTIVATE (owner action, zero code)
Set: Meta WhatsApp keys (or Interakt), `ANTHROPIC_API_KEY`, `OPENAI_API_KEY`, Resend, Inngest keys. Verify `CRON_SECRET` set in Vercel. Pre-approve WA templates (welcome series + reminders) in Meta/Interakt dashboard. → Every feature in §1's table goes live. **This alone reaches ~feature-parity with a mid-tier Wati/Interakt setup.**

### Wave 1 — Inbound WhatsApp becomes a lead engine (our Echo)
1. Webhook upgrade: inbound message → `upsertLeadCore` (phone dedup is canonical) → counselor assign (existing round-robin) → staff-bell notification to the assigned counselor (staff comms infra exists) → activity on timeline.
2. **Shared WhatsApp inbox** (`/counselor/whatsapp-inbox` + admin): thread list per lead phone, reply box sending via `sendWhatsAppMessage`, unread watermark — reuse the staff-comms channel/watermark patterns wholesale. 24h-window awareness (template picker outside window).
3. AI first-touch: replace the keyword bot with a Claude-driven qualifier (course interest, class, city, target year) writing answers to the lead + hot/warm/cold tag; human-handoff keyword → counselor bell + pager. (ARIA prompt-base exists; agent runs through existing crm-agents engine.)

### Wave 2 — Speed-to-lead + smart routing (Zing/ACE lite)
1. SLA engine: new HOT lead → task due in 5 min; uncontacted at 15 min → escalate (bell + admin WhatsApp); track first-response-time per lead (stamp on first outbound comm/call log).
2. Score-based routing: HOT (≥70) leads route to top-converting counselors (conversion rate from `counselor_kpis`); config in `site_settings.leadRouting`.
3. KPI cron (hourly): populate `counselor_kpis` + leaderboard so `/counselor/leaderboard` is always live; add first-response-time + conversion columns. Weekly digest to admin.
4. Best-time-to-call heuristic: per-lead preferred window from their activity timestamps (form submits, WA replies, site visits); show on lead card + sort the follow-up queue by it.

### Wave 3 — Attribution + segments (the owner's ROI view)
1. Additive migration: `leads.utmSource/utmMedium/utmCampaign/utmTerm/utmContent/referrerUrl` + backfill from activities metadata; capture in `upsertLeadCore`.
2. Source-ROI report: source/campaign → leads → demos → enrollments → revenue (joins payments), admin dashboard page.
3. Saved segments: `lead_segments` table (name + filter JSON reusing `buildLeadListWhere` filters); audience picker in campaigns + bulk WhatsApp reuses segments.
4. **Meta CAPI feedback**: on stage transitions (DEMO_SCHEDULED, ENROLLED) fire Conversions API events with fbclid/gclid → ads optimize on enrollments, not clicks. (gclid already captured.)

### Wave 4 — Make dead things real
1. DB-driven drip processor: nurturing cron reads `drip_sequence_steps` for ACTIVE sequences (enrollment table: `drip_enrollments` additive) — the existing CRUD UI becomes fully functional; hardcoded service becomes the template library.
2. Lead-scoring weights in `site_settings.leadScoring` (engine reads config with hardcoded defaults) — makes the config page honest AND editable.
3. Bulk email campaigns: implement email branch in marketing send route via existing `emailService`; honors segments from Wave 3.
4. Fee reminders with payment links: scheduled WhatsApp reminders on `payment_links`/installments due dates through the follow-up queue (tables + Razorpay flows exist).
5. Parent dual-contact: `leads.parentName/parentPhone` (additive) + parent-channel toggle in comms sends (fee/attendance to parent, counseling to student).

### Wave 5 — AI frontier
1. Call summaries → timeline: recording upload → Whisper transcribe → CALL_SUMMARY agent → auto-logged interaction (all agents exist; wire the pipeline + UI upload).
2. Cold-lead reactivation agent: monthly Claude-personalized WhatsApp re-engagement for LOST/stale leads (guardrailed, opt-out aware).
3. **Voice AI: BUY, don't build** — Interakt/Haptik voice agents from ₹10k/mo (~₹3-5/conversation) or Caller.digital; CRM-side we only need a webhook to log outcomes into the timeline. Building telephony AI in-house is not worth it at our volume.
4. Mio-Assist-style NL analytics ("how many demos did Priya book this week?") — Claude over our own analytics APIs; low effort, high wow.

## 5. Explicitly not building
- Publisher/vendor panel (we don't buy aggregator leads at volume), application-form builder (admissions are counselor-led), field-force geo tracking (no field team), SCORM-class enterprise features, in-house voice AI/telephony stack, incentive-payout automation (team too small — leaderboard suffices).

## 6. Sequencing note
Waves 1–2 are the conversion movers (speed-to-lead + inbound capture are the two features every vendor's case studies hinge on). Wave 3 is the owner's visibility. Waves 4–5 are polish/leverage. Wave 0 gates everything — without WhatsApp + Anthropic keys, most of what's already built stays dark.
