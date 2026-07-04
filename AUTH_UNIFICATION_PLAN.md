# Unified Auth Plan — phone (intl) + Google + Facebook + email

Goal (owner, Jul 4 2026): login via phone OTP for ALL country numbers, social
(Google/Facebook/Instagram), and email. **Instagram note:** Meta deprecated
Instagram Basic Display (Dec 2024); there is no consumer "Login with Instagram"
for web apps anymore. Facebook Login covers Meta accounts — Instagram stays a
marketing link, not a login method.

## Audit verdict (full details in session log)

- NextAuth v5 beta.29, JWT sessions, **no adapter, no accounts table**. Providers:
  email+password credentials (admin/counselor/teacher only) + an ORPHANED
  `whatsapp-otp` credentials provider (right bridge pattern, never called).
- Student login today = Firebase phone OTP (env-gated), **India-only UI**
  (+91 hardcoded, 10-digit max) though Firebase itself is intl-capable.
- **Three session systems coexist**: real NextAuth JWE; a FORGED HS256
  `authjs.session-token` minted by /api/auth/firebase-session (NextAuth cannot
  read it; three custom verifiers exist just to decode it); and a custom
  auth-token/refresh-token pair used by the MSG91 OTP flow + AuthContext.
- **Security holes**: firebase-session trusts client-supplied uid (no
  verifyIdToken — util exists at src/lib/auth/firebase-verify.ts, unused);
  middleware verifies with JWT_SECRET while firebase-session signs with
  AUTH_SECRET (aligned only by env accident).
- MSG91 send/verify-otp routes already accept E.164 international numbers.
  Interakt WhatsApp OTP plumbing exists (whatsapp_otp table + templates).
- 3 placeholder-email factories → account-fragmentation risk on email @unique.

## Phases — STATUS (Jul 4 2026): P0-P4 SHIPPED; P5 = follow-up hygiene

**P0 — one session system (prereq for everything).**
Bridge every OTP flow into REAL NextAuth via the existing `whatsapp-otp`
credentials provider: server verifies OTP (Firebase ID token via
firebase-verify / MSG91 / Interakt) → writes users.verificationToken(+expiry)
→ client calls signIn('whatsapp-otp', {phone, verificationToken}). Delete the
forged-cookie code path in firebase-session; keep custom-JWT verifiers only for
back-compat reads until sessions expire (8h). Point NextAuth pages.signIn at
/sign-in for students.

**P1 — adapter tables.** Add `accounts` + `verification_tokens` models
(additive migration; keep JWT strategy — adapter persists OAuth accounts, not
sessions). Install @auth/prisma-adapter.

**P2 — Google + Facebook providers.** AUTH_GOOGLE_ID/SECRET,
AUTH_FACEBOOK_ID/SECRET envs. signIn callback: upsert users row; LINK by
verified email when a real-email match exists; upgrade placeholder emails
(<phone>@phone.cerebrum.local etc.) when the same person adds a real email.
OAuth buttons on /sign-in + /sign-up.

**P3 — international phone UI.** Country-code selector (default +91) in
PhoneSignIn, E.164 output; Firebase phone auth (already intl) as primary,
MSG91 SMS as fallback channel; server-side verifyIdToken in firebase-session.

**P4 — email login for students.** Expose email+password on /sign-in (provider
already exists); registration via existing /api/auth/register; password reset
already at /auth/forgot-password.

**P5 — linking + hygiene (FOLLOW-UP, not blocking any login method).** Normalize phone formats (+91 vs bare-10 rows exist),
collapse the 3 placeholder-email domains to one, email-claim flow, dedupe pass.

## Owner setup needed
- Google Cloud OAuth client (web) → AUTH_GOOGLE_ID/SECRET; consent screen.
- Meta developer app with Facebook Login product → AUTH_FACEBOOK_ID/SECRET.
- Confirm Firebase envs in prod (NEXT_PUBLIC_FIREBASE_*) or MSG91 keys
  (MSG91_AUTH_KEY/MSG91_SMS_TEMPLATE_ID/MSG91_SENDER_ID) for intl SMS.
- After P1: prisma db push (accounts + verification_tokens).
