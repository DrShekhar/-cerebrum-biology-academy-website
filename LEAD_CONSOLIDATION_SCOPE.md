# Lead-Table Consolidation — Scope & Plan (Jun 12, 2026)

Status: **SCOPING ONLY — not executed.** Awaiting decision on approach.

## The problem

Four code paths write "a lead" into **three unrelated tables** with no shared key, no
dedup, and only a partial, manual bridge between them. The same prospect who fills the
contact form, then downloads a guide, then gets entered by a counselor exists as **three
separate records nobody can reconcile**.

### The three tables (verified against prisma/schema.prisma)

| Table                   | Role                                                                                                                                                                                        | Writers                                                                                                                                                                                           | Readers                                                                        | Key fields                                                                            |
| ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------- |
| **`leads`**             | The real CRM. 15 relations (activities, tasks, fee_plans, offers, communications, followup_queue, payment_links, whatsapp_conversations…). Has stage pipeline, priority, score, assignment. | **10 routes**: admin/leads, counselor/leads, aria/lead-capture, seo/leads/capture, catalog/download, webhooks/leads, admission-application, leads/blog-query, admin/students, admin/leads/migrate | counselor/_ + admin/_ + demo-booking + payments/webhook                        | `studentName, email?, phone, stage, priority, assignedToId (REQUIRED), source, score` |
| **`contact_inquiries`** | Support/contact buffer. No pipeline, no relations.                                                                                                                                          | **1 route**: `contact/inquiry` (ARIA widget, CERI chatbot, contact form, olympiad form, careers)                                                                                                  | **only** `admin/inquiries` (the read-only view built this session)             | `name, email, phone, supportType, status`                                             |
| **`content_leads`**     | Lead-magnet / SEO capture. Has its own mini-pipeline (leadStage, leadScore, convertedToPaid).                                                                                               | **6 routes**: enquiry (city pages + book-free-demo), whatsapp-gate, exit-intent, blog/capture-lead, catalog/download, seo/leads/capture                                                           | lead-magnet flows + admin/inquiries + admin/leads/migrate + admin/leads/export | `name?, email?, whatsappNumber?, leadStage, leadScore`                                |

### Confirmed gaps

1. **No phone/email uniqueness on ANY lead table.** (`@unique phone` at schema line 3038 is on `users`, not leads.) Every submission = a new row, even repeat submissions to the _same_ table.
2. **`contact_inquiries` has ZERO promotion path to `leads`.** Every ARIA chat lead, contact-form message, olympiad enquiry, and careers application is invisible to the counselor CRM unless re-keyed by hand.
3. **`content_leads → leads` bridge exists but is manual + one-directional.** `api/admin/leads/migrate` promotes qualified content_leads, dedups by email/phone against `leads`, but a human must trigger it.
4. **Lead conversion mints placeholder emails** (`{phone}@placeholder.cerebrum.app`, convert/route.ts:68) → converted students can't receive email. Small, separate fix.

## Options

### Option A — Read-time unification only (lightest)

Keep all three tables. Extend the new `/admin/inquiries` view to also pull `leads`, and
add a phone-match indicator so staff _see_ the same person across tables.

- **Effort**: ~half day. **Risk**: none (read-only, additive).
- **Limit**: silos remain; no dedup; counselor CRM still never auto-receives ARIA/contact/content leads. Cosmetic.

### Option B — Canonical `leads` + auto-promotion + dedup ★ RECOMMENDED

Designate `leads` as the single system of record. Keep `contact_inquiries` and
`content_leads` as **raw capture logs** (untouched), but on every write also **upsert a
`leads` row keyed on normalized phone**: create if new, else attach an activity/touchpoint
to the existing lead. Dedup within `leads` by normalized phone too.

- **Effort**: moderate, phased (below). **Risk**: medium-low, fully additive — no capture
  path is removed, so no lead is lost mid-transition (honors the no-prospect-loss rule).
- **Payoff**: one record per person in the CRM, with full cross-channel history; counselors
  finally see ARIA/contact/olympiad leads.

### Option C — Full schema merge (not recommended)

Collapse all three into one table.

- **Effort**: large. **Risk**: high — `leads` has 15 relations and a required `assignedToId`;
  every reader/writer + the InstantDB marketing path must be rewritten. Little extra benefit
  over B for far more risk. Reject.

## Recommended plan (Option B, phased — each phase shippable + reversible)

**B0 — Shared helper (foundation).** Create `src/lib/leads/upsertLead.ts`:
`upsertLead({ name, phone, email?, source, sourceDetail?, utm…, score? })` that
(a) normalizes phone via the same logic now in `/api/enquiry` + `/api/contact/inquiry`,
(b) `findFirst` on normalized phone in `leads`, (c) creates with round-robin/default
`assignedToId` if absent (resolve the required-FK constraint up front — pick a default
"unassigned" counselor or the existing round-robin used by the migrate route), else
(d) updates `lastContactedAt` + appends an `activities` row recording the new touchpoint.
Idempotent; never throws into the caller's response path (fire-and-forget like the current
notification calls).

**B1 — Wire the highest-value writers first** (so ARIA/contact/olympiad leads reach the CRM):
`contact/inquiry`, `enquiry`, `aria/lead-capture`. Source tables keep getting their raw row;
`upsertLead()` runs alongside. Ship + watch one week.

**B2 — Backfill** existing `contact_inquiries` + `content_leads` into `leads` by extending
the proven `admin/leads/migrate` dedup pattern to cover contact_inquiries (it already handles
content_leads). One-time admin-triggered run.

**B3 — Wire remaining writers** (whatsapp-gate, exit-intent, blog/capture-lead,
catalog/download, seo/leads/\*).

**B4 — `/admin/inquiries`**: add the unified `leads` column + a "seen across N channels"
dedup badge keyed on phone.

**B5 (separate, small)** — fix the placeholder-email in `convert/route.ts`: require email at
conversion or collect it, so converted students are reachable.

## Decision needed from you

1. **Approach**: A (cosmetic), **B (recommended)**, or C (reject)?
2. If B: **default lead assignment** — is there an "unassigned"/pool counselor user to set as
   the `assignedToId` for auto-created leads, or should auto-created leads round-robin across
   active counselors (the pattern `admin/leads/migrate` already uses)?
3. **Scope of first pass**: just B0+B1 (get ARIA/contact/olympiad into the CRM — the highest-
   value slice), or the full B0–B4 in one project?

Nothing here is executed yet.
