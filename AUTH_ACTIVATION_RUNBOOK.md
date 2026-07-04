# Auth Activation Runbook — 15 minutes of owner clicks

Code for ALL login methods is shipped and **verified working locally** (with
test env vars, /sign-in renders Phone OTP + Email tabs and both social buttons,
NextAuth registers whatsapp-otp/credentials/google/facebook, and clicking
Google initiates the OAuth redirect). What remains needs YOUR Google/Meta
accounts — no code changes.

## 1. Google login (≈5 min)
1. https://console.cloud.google.com/apis/credentials → select/create project.
2. "Configure consent screen" (External; app name Cerebrum Biology Academy;
   support email; publish to Production so any Google user can sign in).
3. Create Credentials → OAuth client ID → Web application:
   - Authorized JavaScript origins: `https://cerebrumbiologyacademy.com`
     (+ `https://www.cerebrumbiologyacademy.com` if www serves traffic,
     + `http://localhost:3000` for local testing)
   - Authorized redirect URIs (EXACT):
     - `https://cerebrumbiologyacademy.com/api/auth/callback/google`
     - `http://localhost:3000/api/auth/callback/google`
4. Vercel → Project → Settings → Environment Variables (Production+Preview):
   - `AUTH_GOOGLE_ID` = the client ID (…apps.googleusercontent.com)
   - `AUTH_GOOGLE_SECRET` = the client secret

## 2. Facebook login (≈7 min)
1. https://developers.facebook.com/apps → Create App → type "Consumer".
2. Add Product → Facebook Login → Web; site URL `https://cerebrumbiologyacademy.com`.
3. Facebook Login → Settings → Valid OAuth Redirect URIs (EXACT):
   - `https://cerebrumbiologyacademy.com/api/auth/callback/facebook`
4. App Review → make the app **Live** (public). Ensure `email` permission is
   enabled (default for Facebook Login).
5. Vercel env vars: `AUTH_FACEBOOK_ID` = App ID, `AUTH_FACEBOOK_SECRET` = App Secret.
6. Instagram: there is NO consumer "Login with Instagram" since Meta retired
   Basic Display (Dec 2024). Facebook Login is Meta's login. Do not buy/enable
   any "Instagram API" product for this.

## 3. Phone OTP for all countries (verify only)
- Ensure `NEXT_PUBLIC_FIREBASE_*` vars are set in Vercel (flow shows "Setup
  Required" without them). In Firebase console → Authentication → Sign-in
  method → Phone: enabled; no region restrictions if you want all countries.
- Optional SMS fallback: MSG91_AUTH_KEY / MSG91_SMS_TEMPLATE_ID / MSG91_SENDER_ID.

## 4. Database + deploy
- `npx prisma db push` (adds `accounts` + `verification_tokens`; part of the
  existing pending batch).
- Ensure `NEXTAUTH_URL=https://cerebrumbiologyacademy.com` and
  `NEXTAUTH_SECRET` are set in Production. Redeploy.

## 5. Smoke test (after deploy)
- /sign-in → "Continue with Google" → real Google consent → lands on dashboard;
  users row created with role STUDENT + accounts row linking the Google account.
- Repeat with Facebook. Phone OTP with a non-Indian number (e.g. +971…).
- Email tab → register via /auth/register → sign out → sign in with email.

Buttons appear automatically once the env vars exist — nothing else to flip.
