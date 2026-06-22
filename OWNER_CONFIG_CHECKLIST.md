# Owner Config Checklist — env keys only YOU can set

These are the **non-code blockers**: features whose code is built + verified but
which stay dormant until the secret/credential is set in the production
environment (Vercel → Project → Settings → Environment Variables), then redeploy.
Grouped by what each unlocks, highest-impact first. Var names are exact.

> Reminder: ~38 commits are unpushed; production is still on the June 14 build.
> None of the code fixes below are live until you `git push origin main` + deploy.
> After deploy, set these and redeploy.

---

## 1. LEADS — so enquiries actually reach you (highest priority)
The funnel captures to the DB + emails you, but server-push WhatsApp/owner alerts
need these. (Also: check the **Interakt inbox** — incoming click-to-chat for
918826444334 routes there, not the phone app.)
- `INTERAKT_API_KEY=` — Interakt WhatsApp Business API key
- `INTERAKT_PHONE_NUMBER_ID=`
- `INTERAKT_WEBHOOK_SECRET=`
- `ADMIN_LEAD_EMAIL=` — where lead email backups go (defaults to support@cerebrumbiologyacademy.com)
- `OWNER_WHATSAPP_NUMBER=` / `ADMIN_WHATSAPP_NUMBER=` — owner alert numbers

## 2. PAYMENTS → ENROLLMENT (course sales don't activate without these)
The webhook activates enrollment + grants material access — but returns 401/500
and never activates if the secret is unset.
- `RAZORPAY_KEY_ID=` / `NEXT_PUBLIC_RAZORPAY_KEY_ID=`
- `RAZORPAY_KEY_SECRET=`
- `RAZORPAY_WEBHOOK_SECRET=` — **and** register the webhook URL in the Razorpay dashboard → `/api/payments/webhook`
- (Cashfree equivalents if used: `CASHFREE_*`)
- For USD/GBP checkout (US/UK market): a **Stripe account** — the routes are
  stubbed; needs `STRIPE_SECRET_KEY` + implementation (separate code task).

## 3. VIDEO LMS (so course videos actually play)
Account id + API token are already set, and the signing code now uses the
token-mint endpoint — but uploads only flip to READY (and thus become playable)
once the webhook secret is set + the webhook is registered.
- `CLOUDFLARE_STREAM_WEBHOOK_SECRET=` — **and** register the Stream webhook in the
  Cloudflare dashboard pointing to `/api/lms/webhook`
- `CLOUDFLARE_STREAM_KEY_ID=` / `CLOUDFLARE_STREAM_KEY_PEM=` — OPTIONAL now (only
  needed for the key-based signing fallback; the API-token path works without them)
- `VERCEL_BLOB_READ_WRITE_TOKEN=` — for certificate PDF storage (else falls back to
  local public/ which doesn't persist on serverless)

## 4. CRON / RATE-LIMIT / IDEMPOTENCY (reliability)
- `CRON_SECRET=` — for the follow-up/reminder crons (and fix GET-vs-POST per CRM notes)
- `UPSTASH_REDIS_REST_URL=` / `UPSTASH_REDIS_REST_TOKEN=` (or `REDIS_*`) — payment
  idempotency + rate limiting; without it, multi-instance prod risks double-charge
  fallback to in-memory

## 5. MARKETING ATTRIBUTION (optional but recommended)
- `NEXT_PUBLIC_FACEBOOK_PIXEL_ID=` / `NEXT_PUBLIC_FB_PIXEL_ID=` (the two names exist —
  standardize on one), `FACEBOOK_ACCESS_TOKEN=` for the Conversions API

---

## After setting them
1. Redeploy.
2. **Verify leads:** submit a test enquiry → confirm it lands in CRM + your email + (if Interakt set) WhatsApp.
3. **Verify payment:** test-mode Razorpay payment → confirm enrollment flips ACTIVE.
4. **Verify video:** upload a lecture → confirm it reaches READY → plays at `/learn/[lectureId]`.
5. **Run the data backfill** (`POST /api/admin/leads/backfill`) to pull stranded content_leads into the CRM.
