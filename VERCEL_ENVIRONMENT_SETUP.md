# Vercel Environment Variables Setup Guide

**CRITICAL SETUP DOCUMENTATION**
**Last Updated:** October 28, 2025
**Status:** Payment system currently BROKEN due to missing environment variables

---

## Table of Contents

1. [Critical Overview](#critical-overview)
2. [Security Best Practices](#security-best-practices)
3. [Step-by-Step Vercel Setup](#step-by-step-vercel-setup)
4. [Environment Variables by Category](#environment-variables-by-category)
5. [Generating Secure Secrets](#generating-secure-secrets)
6. [Understanding NEXT*PUBLIC* Prefix](#understanding-next_public_-prefix)
7. [Production vs Preview Environments](#production-vs-preview-environments)
8. [Verification Steps](#verification-steps)
9. [Troubleshooting](#troubleshooting)

---

## Critical Overview

### Why This Matters

The production deployment on Vercel is currently missing critical environment variables, causing:

- **Payment System**: Completely broken - Razorpay keys not configured
- **Database**: Connection may be using old credentials
- **Authentication**: Using development secrets (MAJOR SECURITY RISK)
- **WhatsApp**: Notifications disabled
- **InstantDB**: Operating in demo mode

### Impact

- ❌ **NO PAYMENTS CAN BE PROCESSED** - Revenue generation completely blocked
- ❌ **SECURITY RISK** - Development secrets exposed in production
- ❌ **NO AUTOMATED NOTIFICATIONS** - Manual follow-up required
- ❌ **POTENTIAL DATA BREACH** - Old database credentials may be compromised

### What Needs to Be Done

1. **IMMEDIATELY** rotate all exposed secrets (database, JWT, auth)
2. **CRITICAL** add Razorpay production keys to enable payments
3. **HIGH PRIORITY** configure authentication secrets properly
4. **RECOMMENDED** set up WhatsApp and other integrations

---

## Security Best Practices

### Before You Begin

⚠️ **CRITICAL SECURITY WARNINGS:**

1. **NEVER use development secrets in production**
2. **NEVER commit secrets to git** (they are exposed forever in history)
3. **ALWAYS generate new secrets for production**
4. **ROTATE secrets immediately** if you suspect they were exposed
5. **USE DIFFERENT KEYS** for test/live environments (especially Razorpay)

### Current Security Issues

The `.env.local` file in this repository contains:

- ✅ Proper structure (good for reference)
- ❌ Real development database password (NEEDS ROTATION)
- ❌ Real API keys (OpenAI, Anthropic, Google AI) - NEEDS ROTATION
- ❌ Weak development secrets

**ACTION REQUIRED:** All secrets in `.env.local` must be treated as compromised and rotated before production use.

---

## Step-by-Step Vercel Setup

### Prerequisites

1. Access to Vercel dashboard: https://vercel.com/dashboard
2. Admin access to the `cerebrum-biology-academy-website` project
3. Access to all third-party service dashboards (Razorpay, Supabase, etc.)

### Navigation

1. Log into Vercel: https://vercel.com
2. Select project: `cerebrum-biology-academy-website`
3. Navigate to: **Settings** → **Environment Variables**
4. You should see a list of all configured variables

### Adding/Editing Variables

For each environment variable below:

1. Click **"Add New"** or click on existing variable to edit
2. Enter **Key** (variable name)
3. Enter **Value** (the actual secret/configuration)
4. Select environments:
   - ✅ **Production** - for live site (cerebrumbiologyacademy.com)
   - ✅ **Preview** - for pull request preview deployments
   - ⬜ **Development** - usually not needed (use .env.local instead)
5. Click **Save**

### Redeployment

After adding/changing environment variables:

1. Go to **Deployments** tab
2. Click on the latest deployment
3. Click **"Redeploy"** button
4. OR: Push a new commit to trigger auto-deployment

Variables are only loaded at build time, so redeployment is required!

---

## Environment Variables by Category

### 1. 🔴 CRITICAL - Payment System (Razorpay)

**Status:** BROKEN - Must be configured immediately for revenue generation

#### NEXT_PUBLIC_RAZORPAY_KEY_ID

```
Environment: Production, Preview
Description: Public-facing Razorpay key ID (visible in frontend code)
```

**How to get:**

1. Log into Razorpay Dashboard: https://dashboard.razorpay.com
2. Navigate to: **Settings** → **API Keys**
3. Switch to **Live Mode** (top-right toggle)
4. Click **"Generate Live Key"** if none exists
5. Copy the **Key ID** (starts with `rzp_live_`)

**For Preview/Testing:**

- Use Test Mode key: starts with `rzp_test_`
- Get from: Same location, but in Test Mode

**Format:** `rzp_live_XXXXXXXXXXXXXXXXX` or `rzp_test_XXXXXXXXXXXXXXXXX`

**Vercel Setup:**

```
Key: NEXT_PUBLIC_RAZORPAY_KEY_ID
Value (Production): rzp_live_XXXXXXXXXXXXXXXXX
Value (Preview): rzp_test_XXXXXXXXXXXXXXXXX
```

#### RAZORPAY_KEY_SECRET

```
Environment: Production, Preview
Description: Secret key for server-side Razorpay API calls
Security: NEVER expose to frontend - no NEXT_PUBLIC_ prefix
```

**How to get:**

1. Same location as Key ID above
2. Copy the **Key Secret** (shown only once!)
3. ⚠️ **CRITICAL:** Save this immediately - cannot be retrieved later

**Format:** Long alphanumeric string (32+ characters)

**Vercel Setup:**

```
Key: RAZORPAY_KEY_SECRET
Value (Production): [Production Secret]
Value (Preview): [Test Mode Secret]
```

#### RAZORPAY_WEBHOOK_SECRET

```
Environment: Production, Preview
Description: Secret for verifying webhook authenticity
Security: Prevents fake payment confirmations
```

**How to get:**

1. Razorpay Dashboard → **Settings** → **Webhooks**
2. Click **"Create New Webhook"** or edit existing
3. Set Webhook URL: `https://cerebrumbiologyacademy.com/api/webhooks/payments`
4. Select events to listen for:
   - ✅ payment.authorized
   - ✅ payment.captured
   - ✅ payment.failed
   - ✅ order.paid
   - ✅ refund.created
5. Set as **Active**
6. Copy **Webhook Secret** (starts with `whsec_`)

**Format:** `whsec_XXXXXXXXXXXXXXXX`

**Vercel Setup:**

```
Key: RAZORPAY_WEBHOOK_SECRET
Value (Production): whsec_[production_secret]
Value (Preview): whsec_[test_secret]
```

**Testing:**
After setup, test with a ₹1 payment and verify in Razorpay Dashboard → Webhooks → Logs

---

### 2. 🔴 CRITICAL - Database (PostgreSQL via Supabase)

**Status:** NEEDS ROTATION - Current password is in committed .env.local

#### DATABASE_URL

```
Environment: Production, Preview
Description: PostgreSQL connection string
Security: Contains password - MUST rotate before production use
```

**Current Issue:**
The `.env.local` file contains:

```
DATABASE_URL="postgresql://postgres:Tv6C%2AVjtf7L%40vcs@db.auhvqhytfunmzdnccgtz.supabase.co:5432/postgres"
Password: Tv6C*Vjtf7L@vcs (URL encoded in connection string)
```

**⚠️ THIS PASSWORD MUST BE CHANGED IMMEDIATELY**

**How to rotate:**

1. Log into Supabase: https://supabase.com/dashboard
2. Select project: `auhvqhytfunmzdnccgtz`
3. Navigate to: **Settings** → **Database**
4. Under **Database Settings**, find **Reset Database Password**
5. Click **"Generate a new password"**
6. Copy the new password immediately
7. Update your connection string with the new password

**Format:**

```
postgresql://postgres:[URL_ENCODED_PASSWORD]@db.auhvqhytfunmzdnccgtz.supabase.co:5432/postgres
```

**URL Encoding:**
Special characters must be URL encoded:

- `@` → `%40`
- `*` → `%2A`
- `/` → `%2F`
- `?` → `%3F`
- `=` → `%3D`

Use an online URL encoder: https://www.urlencoder.org/

**Vercel Setup:**

```
Key: DATABASE_URL
Value: postgresql://postgres:[NEW_ENCODED_PASSWORD]@db.auhvqhytfunmzdnccgtz.supabase.co:5432/postgres
Environments: Production, Preview
```

#### NEXT_PUBLIC_SUPABASE_URL

```
Environment: Production, Preview
Description: Supabase project URL (safe to expose publicly)
```

**How to get:**

1. Supabase Dashboard → Your project
2. **Settings** → **API**
3. Copy **Project URL**

**Current Value:**

```
https://auhvqhytfunmzdnccgtz.supabase.co
```

**Vercel Setup:**

```
Key: NEXT_PUBLIC_SUPABASE_URL
Value: https://auhvqhytfunmzdnccgtz.supabase.co
Environments: Production, Preview
```

#### SUPABASE_KEY

```
Environment: Production, Preview
Description: Supabase anonymous key (for client-side operations)
```

**How to get:**

1. Supabase Dashboard → Your project
2. **Settings** → **API**
3. Copy **anon public** key (not the service_role key!)

**Security Note:**

- Use `anon` key (safe for frontend)
- DO NOT use `service_role` key (bypass RLS - dangerous!)

**Vercel Setup:**

```
Key: SUPABASE_KEY
Value: [Your anon key from Supabase]
Environments: Production, Preview
```

---

### 3. 🔴 CRITICAL - Authentication & Security

**Status:** COMPROMISED - Development secrets in committed .env.local

#### AUTH_SECRET

```
Environment: Production, Preview
Description: NextAuth.js encryption secret
Security: CRITICAL - Used for session token encryption
```

**Current Issue:**
Development secret exposed: `cerebrum-biology-academy-super-secret-key-2024-dev-only`

**MUST GENERATE NEW SECRET FOR PRODUCTION**

**How to generate:**

```bash
openssl rand -base64 32
```

This will output something like:

```
K8Xn2Wp9YmF5Tv3BqR7Zs4Jh6Lk1Mg8Np0Vx=
```

**Vercel Setup:**

```
Key: AUTH_SECRET
Value: [Output from openssl command above]
Environments: Production, Preview (use different values)
```

#### NEXTAUTH_SECRET

```
Environment: Production, Preview
Description: Same as AUTH_SECRET (legacy compatibility)
```

**Use the same value as AUTH_SECRET**

**Vercel Setup:**

```
Key: NEXTAUTH_SECRET
Value: [Same as AUTH_SECRET]
Environments: Production, Preview
```

#### NEXTAUTH_URL

```
Environment: Production, Preview
Description: Base URL of your application
```

**Vercel Setup:**

```
Key: NEXTAUTH_URL
Value (Production): https://cerebrumbiologyacademy.com
Value (Preview): https://cerebrum-biology-academy-website-git-[branch]-[username].vercel.app
```

**Note:** For Preview, you can use the automatic Vercel URL format or leave it unset (Vercel sets it automatically)

#### AUTH_TRUST_HOST

```
Environment: Production, Preview
Description: Trust the host header (required for Vercel)
```

**Vercel Setup:**

```
Key: AUTH_TRUST_HOST
Value: true
Environments: Production, Preview
```

#### JWT_SECRET

```
Environment: Production, Preview
Description: Secret for JWT token signing
Security: CRITICAL - Must be unique and secure
```

**Current Issue:**
Weak development secret exposed in .env.local

**How to generate:**

```bash
openssl rand -base64 64
```

**Vercel Setup:**

```
Key: JWT_SECRET
Value: [Output from openssl command - 64 bytes]
Environments: Production, Preview (use different values)
```

#### JWT_REFRESH_SECRET

```
Environment: Production, Preview
Description: Secret for refresh token signing (must be different from JWT_SECRET)
```

**How to generate:**

```bash
openssl rand -base64 64
```

**Vercel Setup:**

```
Key: JWT_REFRESH_SECRET
Value: [Different output from openssl command]
Environments: Production, Preview
```

---

### 4. 🟠 HIGH PRIORITY - Application Settings

#### NEXT_PUBLIC_ENV

```
Environment: Production, Preview
Description: Application environment identifier
```

**Vercel Setup:**

```
Key: NEXT_PUBLIC_ENV
Value (Production): production
Value (Preview): preview
```

#### NEXT_PUBLIC_SITE_URL

```
Environment: Production, Preview
Description: Full base URL of the site
```

**Vercel Setup:**

```
Key: NEXT_PUBLIC_SITE_URL
Value (Production): https://cerebrumbiologyacademy.com
Value (Preview): https://preview.cerebrumbiologyacademy.com
```

**Note:** Update your domain in Vercel → Settings → Domains

#### NEXT_PUBLIC_API_URL

```
Environment: Production, Preview
Description: API endpoint base URL
```

**Vercel Setup:**

```
Key: NEXT_PUBLIC_API_URL
Value (Production): https://cerebrumbiologyacademy.com/api
Value (Preview): https://preview.cerebrumbiologyacademy.com/api
```

#### NODE_ENV

```
Environment: Production, Preview
Description: Node.js environment
```

**Vercel Setup:**

```
Key: NODE_ENV
Value (Production): production
Value (Preview): production
```

**Note:** Vercel typically sets this automatically, but explicit configuration is safer.

---

### 5. 🟡 RECOMMENDED - InstantDB (Real-time Features)

**Status:** OPTIONAL - Application will work without it, but some real-time features disabled

#### NEXT_PUBLIC_INSTANT_APP_ID

```
Environment: Production, Preview
Description: InstantDB application ID
```

**How to get:**

1. Sign up at https://instantdb.com
2. Create new application
3. Copy **App ID** from dashboard

**Current Status:**

- Build logs show: "Using demo mode"
- Real-time features degraded to polling

**Vercel Setup:**

```
Key: NEXT_PUBLIC_INSTANT_APP_ID
Value: [Your InstantDB App ID]
Environments: Production, Preview
```

#### INSTANT_APP_ADMIN_TOKEN

```
Environment: Production, Preview
Description: InstantDB admin token for server-side operations
```

**How to get:**

1. InstantDB Dashboard
2. Settings → Admin Tokens
3. Generate new token

**Vercel Setup:**

```
Key: INSTANT_APP_ADMIN_TOKEN
Value: [Your admin token]
Environments: Production, Preview
```

---

### 6. 🟡 RECOMMENDED - WhatsApp Business API

**Status:** IMPORTANT - Enables automated customer notifications

#### WHATSAPP_PHONE_NUMBER_ID

```
Environment: Production, Preview
Description: WhatsApp Business phone number ID
```

**How to get:**

1. Log into Meta Business Suite: https://business.facebook.com
2. Navigate to **WhatsApp** → **API Setup**
3. Copy **Phone Number ID**

**Vercel Setup:**

```
Key: WHATSAPP_PHONE_NUMBER_ID
Value: [Your phone number ID]
Environments: Production, Preview
```

#### WHATSAPP_ACCESS_TOKEN

```
Environment: Production, Preview
Description: Permanent access token for WhatsApp API
Security: MUST be permanent token (not 24-hour temporary token)
```

**How to get PERMANENT token:**

1. Meta Business Suite → **System Users**
2. Create new System User (or use existing)
3. Assign **WhatsApp Business Management** permission
4. Generate token with permissions:
   - whatsapp_business_management
   - whatsapp_business_messaging
5. Copy token (this won't expire)

**⚠️ DO NOT use the temporary token from API Setup page (expires in 24 hours)**

**Vercel Setup:**

```
Key: WHATSAPP_ACCESS_TOKEN
Value: [Permanent access token]
Environments: Production, Preview
```

#### WHATSAPP_BUSINESS_ACCOUNT_ID

```
Environment: Production
Description: WhatsApp Business Account ID
```

**How to get:**

1. Meta Business Suite
2. Business Settings → Accounts → WhatsApp Accounts
3. Copy the account ID

**Vercel Setup:**

```
Key: WHATSAPP_BUSINESS_ACCOUNT_ID
Value: [Your business account ID]
Environments: Production, Preview
```

#### WHATSAPP_API_URL

```
Environment: Production, Preview
Description: WhatsApp Graph API base URL
```

**Vercel Setup:**

```
Key: WHATSAPP_API_URL
Value: https://graph.facebook.com/v18.0
Environments: Production, Preview
```

**Note:** Check for latest API version at https://developers.facebook.com/docs/graph-api/changelog

#### WHATSAPP_VERIFY_TOKEN

```
Environment: Production, Preview
Description: Webhook verification token (you create this)
```

**How to set:**

1. Generate a random string:
   ```bash
   openssl rand -hex 32
   ```
2. Add to Vercel
3. Use same value when configuring webhook in Meta Business Suite

**Vercel Setup:**

```
Key: WHATSAPP_VERIFY_TOKEN
Value: [Your random token]
Environments: Production, Preview
```

#### WHATSAPP_WEBHOOK_SECRET

```
Environment: Production, Preview
Description: Secret for verifying webhook signatures
```

**How to generate:**

```bash
openssl rand -hex 32
```

**Vercel Setup:**

```
Key: WHATSAPP_WEBHOOK_SECRET
Value: [Output from command above]
Environments: Production, Preview
```

---

### 7. 🟢 OPTIONAL - Analytics & Tracking

#### NEXT_PUBLIC_GA_MEASUREMENT_ID

```
Environment: Production, Preview
Description: Google Analytics 4 Measurement ID
```

**How to get:**

1. Google Analytics: https://analytics.google.com
2. Admin → Data Streams
3. Select your web stream
4. Copy **Measurement ID** (format: G-XXXXXXXXXX)

**Vercel Setup:**

```
Key: NEXT_PUBLIC_GA_MEASUREMENT_ID
Value: G-XXXXXXXXXX
Environments: Production (use different ID for Preview if desired)
```

#### NEXT_PUBLIC_GTM_ID

```
Environment: Production, Preview
Description: Google Tag Manager Container ID
```

**How to get:**

1. Google Tag Manager: https://tagmanager.google.com
2. Select your container
3. Copy **Container ID** (format: GTM-XXXXXXX)

**Vercel Setup:**

```
Key: NEXT_PUBLIC_GTM_ID
Value: GTM-XXXXXXX
Environments: Production, Preview
```

#### NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_ID

```
Environment: Production
Description: Google Ads conversion tracking ID
```

**How to get:**

1. Google Ads: https://ads.google.com
2. Tools → Conversions
3. Copy **Conversion ID** (format: AW-XXXXXXXXX)

**Vercel Setup:**

```
Key: NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_ID
Value: AW-XXXXXXXXX
Environments: Production
```

#### NEXT_PUBLIC_FB_PIXEL_ID

```
Environment: Production, Preview
Description: Facebook Pixel ID for conversion tracking
```

**How to get:**

1. Meta Events Manager: https://business.facebook.com/events_manager
2. Select your pixel or create new
3. Copy **Pixel ID** (numeric)

**Vercel Setup:**

```
Key: NEXT_PUBLIC_FB_PIXEL_ID
Value: [Your pixel ID]
Environments: Production, Preview
```

#### NEXT_PUBLIC_SENTRY_DSN

```
Environment: Production, Preview
Description: Sentry error tracking DSN
```

**How to get:**

1. Sentry.io: https://sentry.io
2. Create project or select existing
3. Copy **DSN** from Project Settings

**Vercel Setup:**

```
Key: NEXT_PUBLIC_SENTRY_DSN
Value: https://xxx@xxx.ingest.sentry.io/xxx
Environments: Production, Preview
```

---

### 8. 🟢 OPTIONAL - Redis Cache

**Status:** OPTIONAL - Application works without it, but improves performance

#### REDIS_URL

```
Environment: Production, Preview
Description: Redis connection URL
```

**How to set up:**

**Option 1: Upstash (Recommended - Serverless)**

1. Sign up: https://upstash.com
2. Create Redis database
3. Copy **Redis URL**

**Option 2: Redis Cloud**

1. Sign up: https://redis.com/try-free
2. Create database
3. Copy connection string

**Vercel Setup:**

```
Key: REDIS_URL
Value: redis://default:[password]@[host]:[port]
Environments: Production, Preview
```

**Note:** Use different Redis instances for Production and Preview

#### REDIS_PRIMARY_URL

```
Environment: Production, Preview
Description: Primary Redis URL (same as REDIS_URL for single instance)
```

**Vercel Setup:**

```
Key: REDIS_PRIMARY_URL
Value: [Same as REDIS_URL]
Environments: Production, Preview
```

#### REDIS_CLUSTER_MODE

```
Environment: Production, Preview
Description: Enable Redis cluster mode (false for single instance)
```

**Vercel Setup:**

```
Key: REDIS_CLUSTER_MODE
Value: false
Environments: Production, Preview
```

---

### 9. 🟢 OPTIONAL - AI Services

**⚠️ SECURITY ALERT:** The .env.local file contains REAL API keys that are now compromised:

- OpenAI API key
- Anthropic API key
- Google AI API key

**MUST ROTATE THESE KEYS BEFORE PRODUCTION USE**

#### OPENAI_API_KEY

```
Environment: Production, Preview
Description: OpenAI API key for GPT models
Security: COMPROMISED - Rotate immediately
```

**How to rotate:**

1. Log into OpenAI: https://platform.openai.com
2. Navigate to **API Keys**
3. Find the old key (starts with `sk-proj-rnn6FS...`)
4. Click **Revoke** to disable it
5. Click **Create new secret key**
6. Copy new key immediately (shown only once)

**Vercel Setup:**

```
Key: OPENAI_API_KEY
Value: sk-proj-[NEW_KEY]
Environments: Production, Preview
```

#### ANTHROPIC_API_KEY

```
Environment: Production, Preview
Description: Anthropic Claude API key
Security: COMPROMISED - Rotate immediately
```

**How to rotate:**

1. Log into Anthropic Console: https://console.anthropic.com
2. Navigate to **API Keys**
3. Revoke old key (starts with `sk-ant-api03-YR1V...`)
4. Create new key
5. Copy immediately

**Vercel Setup:**

```
Key: ANTHROPIC_API_KEY
Value: sk-ant-[NEW_KEY]
Environments: Production, Preview
```

#### GOOGLE_AI_API_KEY

```
Environment: Production, Preview
Description: Google AI (Gemini) API key
Security: COMPROMISED - Rotate immediately
```

**How to rotate:**

1. Google Cloud Console: https://console.cloud.google.com
2. APIs & Services → Credentials
3. Find old key (`AIzaSyBmqoTxBZQGnIf...`)
4. Delete it
5. Create new API key
6. Restrict it to Generative Language API only

**Vercel Setup:**

```
Key: GOOGLE_AI_API_KEY
Value: AIzaSy[NEW_KEY]
Environments: Production, Preview
```

#### GOOGLE_CLOUD_PROJECT_ID

```
Environment: Production, Preview
Description: Google Cloud project ID
```

**Vercel Setup:**

```
Key: GOOGLE_CLOUD_PROJECT_ID
Value: 62970530347
Environments: Production, Preview
```

#### AI_MODEL_PREFERENCE

```
Environment: Production, Preview
Description: Default AI model to use
```

**Options:**

- `claude-3.5-sonnet` (recommended - best quality)
- `gpt-4` (expensive but high quality)
- `gpt-3.5-turbo` (cheaper, faster)
- `gemini-pro` (Google's model)

**Vercel Setup:**

```
Key: AI_MODEL_PREFERENCE
Value: claude-3.5-sonnet
Environments: Production, Preview
```

#### AI_CACHE_ENABLED

```
Environment: Production, Preview
Description: Enable AI response caching
```

**Vercel Setup:**

```
Key: AI_CACHE_ENABLED
Value: true
Environments: Production, Preview
```

#### AI_MAX_TOKENS

```
Environment: Production, Preview
Description: Maximum tokens per AI request
```

**Vercel Setup:**

```
Key: AI_MAX_TOKENS
Value: 4096
Environments: Production, Preview
```

---

### 10. 🟢 OPTIONAL - Email (SMTP)

#### SMTP_HOST

```
Environment: Production, Preview
Description: SMTP server hostname
```

**Gmail Example:**

```
Key: SMTP_HOST
Value: smtp.gmail.com
```

**SendGrid Example:**

```
Key: SMTP_HOST
Value: smtp.sendgrid.net
```

#### SMTP_PORT

```
Environment: Production, Preview
Description: SMTP server port
```

**Standard ports:**

- `587` - TLS (recommended)
- `465` - SSL
- `25` - Plain (not recommended)

**Vercel Setup:**

```
Key: SMTP_PORT
Value: 587
Environments: Production, Preview
```

#### SMTP_USER

```
Environment: Production, Preview
Description: SMTP authentication username
```

**For Gmail:**

- Your Gmail address

**For SendGrid:**

- `apikey` (literal string)

**Vercel Setup:**

```
Key: SMTP_USER
Value: [Your email or 'apikey' for SendGrid]
Environments: Production, Preview
```

#### SMTP_PASS

```
Environment: Production, Preview
Description: SMTP authentication password
Security: Use app-specific password, not account password
```

**For Gmail:**

1. Enable 2-Step Verification: https://myaccount.google.com/security
2. Generate App Password: https://myaccount.google.com/apppasswords
3. Select **Mail** and your device
4. Copy the 16-character password

**For SendGrid:**

1. Create API Key: https://app.sendgrid.com/settings/api_keys
2. Copy the API key

**Vercel Setup:**

```
Key: SMTP_PASS
Value: [App password or API key]
Environments: Production, Preview
```

#### SMTP_FROM

```
Environment: Production, Preview
Description: Default sender email address
```

**Vercel Setup:**

```
Key: SMTP_FROM
Value: noreply@cerebrumbiologyacademy.com
Environments: Production, Preview
```

**Note:** Must be verified in your email service

---

### 11. 🟢 OPTIONAL - Zoom Integration

#### ZOOM_ACCOUNT_ID

```
Environment: Production, Preview
Description: Zoom account ID for Server-to-Server OAuth
```

**How to get:**

1. Zoom Marketplace: https://marketplace.zoom.us
2. Develop → Build App
3. Choose **Server-to-Server OAuth**
4. Copy **Account ID**

**Vercel Setup:**

```
Key: ZOOM_ACCOUNT_ID
Value: [Your Zoom account ID]
Environments: Production, Preview
```

#### ZOOM_CLIENT_ID

```
Environment: Production, Preview
Description: Zoom OAuth client ID
```

**Vercel Setup:**

```
Key: ZOOM_CLIENT_ID
Value: [Your client ID from Zoom app]
Environments: Production, Preview
```

#### ZOOM_CLIENT_SECRET

```
Environment: Production, Preview
Description: Zoom OAuth client secret
```

**Vercel Setup:**

```
Key: ZOOM_CLIENT_SECRET
Value: [Your client secret from Zoom app]
Environments: Production, Preview
```

#### ZOOM_API_URL

```
Environment: Production, Preview
Description: Zoom API base URL
```

**Vercel Setup:**

```
Key: ZOOM_API_URL
Value: https://api.zoom.us/v2
Environments: Production, Preview
```

---

### 12. 🟢 OPTIONAL - File Storage (Vercel Blob)

#### BLOB_READ_WRITE_TOKEN

```
Environment: Production, Preview
Description: Vercel Blob storage token
```

**How to get:**

1. Vercel Dashboard → Storage → Blob
2. Create Blob store if not exists
3. Copy Read/Write token

**Current token in .env.local:**

```
vercel_blob_rw_fmfuCkYSPjBOswAq_aDFuhzLkESnw2PlYD9kbZiUynV7Nj0
```

**⚠️ Treat as potentially compromised - consider rotating**

**Vercel Setup:**

```
Key: BLOB_READ_WRITE_TOKEN
Value: vercel_blob_rw_[YOUR_TOKEN]
Environments: Production, Preview (use different tokens)
```

---

### 13. 🟢 OPTIONAL - Admin Credentials

#### ADMIN_EMAIL

```
Environment: Production
Description: Default admin email for system access
```

**Vercel Setup:**

```
Key: ADMIN_EMAIL
Value: admin@cerebrumbiologyacademy.com
Environments: Production
```

#### ADMIN_PASSWORD_HASH

```
Environment: Production
Description: Bcrypt hash of admin password
Security: NEVER store plain password
```

**How to generate:**

```bash
# Using Node.js
node -e "const bcrypt = require('bcryptjs'); console.log(bcrypt.hashSync('YOUR_SECURE_PASSWORD', 12))"
```

**Vercel Setup:**

```
Key: ADMIN_PASSWORD_HASH
Value: $2a$12$[HASH_FROM_COMMAND]
Environments: Production
```

**⚠️ Use a strong, unique password**

#### BCRYPT_ROUNDS

```
Environment: Production, Preview
Description: Number of bcrypt hashing rounds
```

**Vercel Setup:**

```
Key: BCRYPT_ROUNDS
Value: 12
Environments: Production, Preview
```

**Note:** Higher = more secure but slower (12 is good balance)

---

### 14. 🟢 OPTIONAL - Contact Information

#### CONTACT_EMAIL

```
Environment: Production, Preview
Description: Public contact email displayed on site
```

**Vercel Setup:**

```
Key: CONTACT_EMAIL
Value: info@cerebrumbiologyacademy.com
Environments: Production, Preview
```

#### SUPPORT_PHONE

```
Environment: Production, Preview
Description: Public support phone number
```

**Vercel Setup:**

```
Key: SUPPORT_PHONE
Value: +918826444334
Environments: Production, Preview
```

---

## Generating Secure Secrets

### Using OpenSSL (Recommended)

**For 32-byte secrets (most auth tokens):**

```bash
openssl rand -base64 32
```

**For 64-byte secrets (JWT tokens):**

```bash
openssl rand -base64 64
```

**For hex secrets (webhooks):**

```bash
openssl rand -hex 32
```

### Using Node.js

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

### Using Python

```bash
python3 -c "import secrets; print(secrets.token_urlsafe(32))"
```

### Requirements for Strong Secrets

- Minimum 32 bytes (256 bits)
- Use cryptographically secure random generation
- Different secret for each purpose
- Different secrets for production vs preview
- Never reuse secrets across environments

---

## Understanding NEXT*PUBLIC* Prefix

### What is NEXT*PUBLIC*?

Next.js has special handling for environment variables:

**WITHOUT NEXT*PUBLIC*:**

- Available ONLY in server-side code
- API routes, getServerSideProps, etc.
- NEVER exposed to browser
- Used for secrets (API keys, database passwords)

**WITH NEXT*PUBLIC*:**

- Available in BOTH server and client code
- Embedded in browser JavaScript bundle
- Visible to anyone who views page source
- Used for public configuration (IDs, URLs)

### When to Use NEXT*PUBLIC*

✅ **USE NEXT*PUBLIC* for:**

- API endpoint URLs (NEXT_PUBLIC_API_URL)
- Public API keys (NEXT_PUBLIC_RAZORPAY_KEY_ID)
- Analytics IDs (NEXT_PUBLIC_GA_MEASUREMENT_ID)
- Application IDs (NEXT_PUBLIC_INSTANT_APP_ID)
- Site URLs and public configuration

❌ **NEVER use NEXT*PUBLIC* for:**

- Secret API keys (RAZORPAY_KEY_SECRET)
- Database credentials (DATABASE_URL)
- Authentication secrets (AUTH_SECRET, JWT_SECRET)
- Admin tokens (INSTANT_APP_ADMIN_TOKEN)
- Private keys or passwords

### Example from Codebase

**File: `/src/components/payment/RazorpayPayment.tsx` (Line 126)**

```typescript
const razorpayKey = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID
```

✅ Correct - Uses NEXT*PUBLIC* because frontend needs it to initialize Razorpay

**File: `/src/app/api/payments/create-order/route.ts` (Line 15)**

```typescript
const razorpayKeySecret = process.env.RAZORPAY_KEY_SECRET
```

✅ Correct - NO NEXT*PUBLIC* because secret must stay on server

### Security Implications

If you accidentally use NEXT*PUBLIC* for a secret:

1. It will be visible in browser JavaScript
2. Anyone can extract it from page source
3. They can use it to access your services
4. You must rotate the secret immediately
5. Review billing for unauthorized usage

---

## Production vs Preview Environments

### Environment Types in Vercel

**Production:**

- Triggered by: Push to main/master branch
- URL: Your custom domain (cerebrumbiologyacademy.com)
- Purpose: Live site serving real users
- Security: Must use production keys and secrets

**Preview:**

- Triggered by: Pull requests and other branches
- URL: Auto-generated (cerebrum-biology-academy-website-git-[branch]-[username].vercel.app)
- Purpose: Testing before merge to production
- Security: Can use test/sandbox keys

**Development:**

- Environment: Local machine only
- Configuration: .env.local file
- Purpose: Active development
- Security: Use dummy/test keys, never production

### Which Variables Need Different Values?

**MUST be different:**

- ✅ RAZORPAY_KEY_ID (use test key for Preview)
- ✅ RAZORPAY_KEY_SECRET (test secret for Preview)
- ✅ DATABASE_URL (use staging DB for Preview)
- ✅ AUTH_SECRET (different secret for Preview)
- ✅ JWT_SECRET (different secret for Preview)
- ✅ WHATSAPP_ACCESS_TOKEN (test account for Preview)

**Can be same:**

- NEXT_PUBLIC_SITE_URL (but update to Preview URL)
- NEXT_PUBLIC_API_URL (but update to Preview URL)
- Analytics IDs (or use separate test properties)
- Email configuration (can share)

**Should be same:**

- NODE_ENV (production for both Production and Preview)
- Feature flags and public configuration

### Setting Environment-Specific Values

In Vercel dashboard, when adding a variable:

1. Enter Key and Value
2. Check which environments need it:
   - ✅ Production - for main branch deployments
   - ✅ Preview - for PR and branch deployments
   - ⬜ Development - usually leave unchecked
3. If values differ, add variable twice:
   - First time: Check only "Production", enter production value
   - Second time: Edit variable, check only "Preview", enter preview value

### Example: Razorpay Key Setup

**Add variable (Production):**

```
Key: NEXT_PUBLIC_RAZORPAY_KEY_ID
Value: rzp_live_XXXXXXXXXXXXX
Environments: ✅ Production only
```

**Edit same variable (Preview):**

```
Key: NEXT_PUBLIC_RAZORPAY_KEY_ID
Value: rzp_test_XXXXXXXXXXXXX
Environments: ✅ Preview only
```

Now:

- Production deployments use live key
- Preview deployments use test key
- Payments in Preview are safe to test

---

## Verification Steps

### After Adding All Variables

**1. Verify Variables Are Set**

In Vercel dashboard:

1. Go to Settings → Environment Variables
2. Verify all critical variables are present:
   - NEXT_PUBLIC_RAZORPAY_KEY_ID
   - RAZORPAY_KEY_SECRET
   - DATABASE_URL
   - AUTH_SECRET
   - NEXTAUTH_SECRET
   - JWT_SECRET
   - JWT_REFRESH_SECRET
3. Check that Production/Preview scopes are correct

**2. Trigger Redeployment**

Variables are only loaded at build time:

1. Go to Deployments tab
2. Find latest deployment
3. Click three dots → Redeploy
4. OR: Push a new commit to trigger auto-deploy

**3. Check Build Logs**

After redeployment starts:

1. Click on the building deployment
2. Click "View Deployment Logs"
3. Look for:
   - ✅ No warnings about missing environment variables
   - ✅ Database connection successful
   - ✅ No "Using demo mode" messages
   - ❌ Any errors about credentials

**4. Verify Payment System**

Once deployed:

1. Visit: https://cerebrumbiologyacademy.com/enrollment
2. Fill enrollment form with test data
3. Select a course
4. Click "Proceed to Payment"
5. Razorpay checkout should open
6. Process a ₹1 test payment
7. Verify in Razorpay Dashboard → Transactions

**5. Check Database Connectivity**

Test that database is working:

1. Visit site
2. Check that dynamic content loads (courses, etc.)
3. Try user registration or login
4. Verify data is being saved

Look in Vercel logs for any Prisma errors:

```
Deployments → Latest → Runtime Logs
```

**6. Verify Authentication**

Test NextAuth.js:

1. Try to log in (if you have auth pages)
2. Check that sessions persist
3. No errors about AUTH_SECRET

**7. Test WhatsApp Integration**

If configured:

1. Complete an enrollment
2. Check that WhatsApp notification is sent
3. Verify in Meta Business Suite → WhatsApp → Message Logs

**8. Analytics Check**

If analytics configured:

1. Visit site
2. Open browser console (F12)
3. Look for analytics initialization logs
4. Check Google Analytics Real-Time view
5. Verify events are being tracked

**9. Error Monitoring**

Check Vercel logs for any errors:

1. Deployments → Latest → Runtime Logs
2. Look for any 500 errors or exceptions
3. Check specific API routes:
   - /api/payments/create-order
   - /api/purchase
   - /api/demo-booking

**10. Health Check**

If your app has a health endpoint:

```bash
curl https://cerebrumbiologyacademy.com/api/health
```

Should return 200 OK with system status.

### Verification Checklist

```
□ All critical variables added to Vercel
□ Production and Preview scopes set correctly
□ Different secrets for Production vs Preview
□ Deployment completed without build errors
□ No environment variable warnings in logs
□ Payment system working (₹1 test successful)
□ Database connectivity confirmed
□ Authentication working
□ WhatsApp notifications sending (if configured)
□ Analytics tracking events
□ No runtime errors in logs
□ Site loads without 500 errors
```

---

## Troubleshooting

### Common Issues

#### Issue: Razorpay "Key not configured" Error

**Symptoms:**

- Payment button shows error
- Browser console: "Razorpay key not configured"
- Payment modal doesn't open

**Diagnosis:**
Check if `NEXT_PUBLIC_RAZORPAY_KEY_ID` is set and has NEXT*PUBLIC* prefix.

**Fix:**

1. Verify variable name is exactly: `NEXT_PUBLIC_RAZORPAY_KEY_ID` (not `RAZORPAY_KEY_ID`)
2. Confirm it's set for Production environment
3. Redeploy after adding
4. Check browser console for actual value:
   ```javascript
   console.log(process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID)
   ```
5. Should show: `rzp_live_XXXXX` or `rzp_test_XXXXX`
6. If shows `undefined`, variable isn't set correctly

#### Issue: Database Connection Failed

**Symptoms:**

- 500 errors on pages that need database
- Logs show: "Can't reach database server"
- Prisma client errors

**Diagnosis:**
Check DATABASE_URL format and credentials.

**Fix:**

1. Verify DATABASE_URL is set in Vercel
2. Check format:
   ```
   postgresql://postgres:PASSWORD@db.PROJECT_ID.supabase.co:5432/postgres
   ```
3. Ensure password is URL-encoded
4. Test connection from Supabase dashboard
5. Check if database is paused (Supabase free tier)
6. Verify Prisma schema is migrated:
   ```bash
   npx prisma migrate deploy
   ```

#### Issue: Authentication Errors

**Symptoms:**

- Can't log in
- Session doesn't persist
- "Invalid CSRF token" errors
- Redirects don't work

**Diagnosis:**
Check AUTH_SECRET, NEXTAUTH_SECRET, and NEXTAUTH_URL.

**Fix:**

1. Verify both AUTH_SECRET and NEXTAUTH_SECRET are set
2. Confirm they have the same value
3. Check NEXTAUTH_URL matches your domain exactly:
   ```
   https://cerebrumbiologyacademy.com
   ```
   (no trailing slash)
4. Ensure AUTH_TRUST_HOST=true
5. Clear browser cookies and retry
6. Check Vercel logs for NextAuth errors

#### Issue: "Using Demo Mode" in Logs

**Symptoms:**

- Build logs show "NEXT_PUBLIC_INSTANT_APP_ID environment variable is not set"
- Some features degraded

**Diagnosis:**
InstantDB not configured.

**Impact:**

- Not critical - app will work
- Real-time features will fall back to polling
- Performance slightly degraded

**Fix (Optional):**

1. Sign up for InstantDB
2. Add NEXT_PUBLIC_INSTANT_APP_ID
3. Add INSTANT_APP_ADMIN_TOKEN
4. Redeploy

#### Issue: Payments Complete but Order Not Created

**Symptoms:**

- Razorpay shows successful payment
- But order doesn't appear in database
- User sees success but admin sees nothing

**Diagnosis:**
Webhook not configured or failing.

**Fix:**

1. Check RAZORPAY_WEBHOOK_SECRET is set
2. Verify webhook URL in Razorpay Dashboard:
   ```
   https://cerebrumbiologyacademy.com/api/webhooks/payments
   ```
3. Check webhook logs in Razorpay Dashboard
4. Look for:
   - Delivery failures
   - Signature verification errors
5. Verify webhook route is deployed:
   ```bash
   curl https://cerebrumbiologyacademy.com/api/webhooks/payments
   ```
6. Check Vercel logs during payment for webhook errors

#### Issue: WhatsApp Messages Not Sending

**Symptoms:**

- Enrollment completes but no WhatsApp notification
- Logs show WhatsApp API errors

**Diagnosis:**
WhatsApp token or configuration issue.

**Fix:**

1. Verify WHATSAPP_ACCESS_TOKEN is permanent (not 24-hour)
2. Check token hasn't expired in Meta Business Suite
3. Verify phone number is verified and not limited
4. Check WHATSAPP_PHONE_NUMBER_ID is correct
5. Test with WhatsApp API directly:
   ```bash
   curl -X POST "https://graph.facebook.com/v18.0/PHONE_NUMBER_ID/messages" \
     -H "Authorization: Bearer YOUR_TOKEN" \
     -H "Content-Type: application/json" \
     -d '{
       "messaging_product": "whatsapp",
       "to": "YOUR_TEST_NUMBER",
       "type": "text",
       "text": {"body": "Test message"}
     }'
   ```

#### Issue: Build Succeeds but Runtime Errors

**Symptoms:**

- Build passes without errors
- Site deploys successfully
- But features don't work at runtime
- 500 errors when using certain features

**Diagnosis:**
Environment variables missing or incorrect at runtime.

**Fix:**

1. Remember: Environment variables are embedded at BUILD time
2. After adding variables, MUST redeploy
3. Check Vercel Runtime Logs (not Build Logs)
4. Look for specific errors about missing variables
5. Verify variable scopes (Production vs Preview)

#### Issue: Variables Not Loading

**Symptoms:**

- Added variables in Vercel
- Redeployed
- Still seeing errors about missing variables

**Diagnosis:**
Variable name mismatch or scope issue.

**Fix:**

1. Check exact spelling (case-sensitive):
   - ✅ NEXT_PUBLIC_RAZORPAY_KEY_ID
   - ❌ NEXT_PUBLIC_RAZORPAY_KEY_id
   - ❌ RAZORPAY*KEY_ID (missing NEXT_PUBLIC*)
2. Verify environment scope:
   - Production deployment needs Production scope
   - Preview deployment needs Preview scope
3. Check which deployment you're testing:

   ```bash
   # Production
   https://cerebrumbiologyacademy.com

   # Preview (different URL)
   https://cerebrum-biology-academy-website-git-branch-user.vercel.app
   ```

4. Ensure variable is saved (click Save after adding)

### Getting Help

If issues persist:

**1. Check Vercel Documentation**
https://vercel.com/docs/projects/environment-variables

**2. Review Service-Specific Docs**

- Razorpay: https://razorpay.com/docs/payments
- Supabase: https://supabase.com/docs
- WhatsApp: https://developers.facebook.com/docs/whatsapp

**3. Examine Logs**

- Vercel: Deployments → Latest → Runtime Logs
- Razorpay: Dashboard → Webhooks → Logs
- Supabase: Dashboard → Logs
- WhatsApp: Meta Business Suite → WhatsApp → Logs

**4. Contact Support**

- Vercel Support: https://vercel.com/support
- Razorpay Support: https://razorpay.com/support
- Include:
  - Error messages (redact sensitive data)
  - Deployment logs
  - Steps to reproduce
  - Expected vs actual behavior

---

## Security Checklist

Before going live with production environment variables:

### Immediate Actions (Do First)

```
□ Rotate Supabase database password
□ Generate new AUTH_SECRET for production
□ Generate new NEXTAUTH_SECRET (same as AUTH_SECRET)
□ Generate new JWT_SECRET (different from AUTH_SECRET)
□ Generate new JWT_REFRESH_SECRET (different from JWT_SECRET)
□ Revoke and regenerate OpenAI API key
□ Revoke and regenerate Anthropic API key
□ Revoke and regenerate Google AI API key
□ Get Razorpay LIVE keys (not test keys)
□ Set up permanent WhatsApp access token (not 24-hour)
```

### Verification Steps

```
□ Confirmed no secrets committed to git
□ .env.local is in .gitignore
□ All production secrets are unique (not from .env.local)
□ Test keys used for Preview environment
□ Live keys used for Production environment
□ No NEXT_PUBLIC_ prefix on secrets
□ All secrets are cryptographically random
□ Secrets are minimum 32 bytes (256 bits)
□ Different secrets for each service
□ Webhook secrets configured in third-party dashboards
```

### Access Control

```
□ Limit Vercel project access to authorized team members
□ Enable 2FA on Vercel account
□ Enable 2FA on all third-party services (Razorpay, Supabase, etc.)
□ Regularly audit who has access to environment variables
□ Use Vercel Teams for proper access management
□ Document which team members have access to which services
```

### Ongoing Security

```
□ Rotate all secrets every 90 days
□ Monitor API key usage for anomalies
□ Set up billing alerts on all services
□ Review Vercel audit logs monthly
□ Keep dependencies updated (npm audit)
□ Monitor security advisories
□ Have incident response plan for compromised keys
```

---

## Quick Reference

### Priority-Ordered Setup Sequence

**1. CRITICAL (Do First - Enables Payments)**

```
NEXT_PUBLIC_RAZORPAY_KEY_ID
RAZORPAY_KEY_SECRET
RAZORPAY_WEBHOOK_SECRET
DATABASE_URL (rotate password first!)
AUTH_SECRET (generate new)
NEXTAUTH_SECRET (same as AUTH_SECRET)
JWT_SECRET (generate new)
JWT_REFRESH_SECRET (generate new)
```

**2. HIGH PRIORITY (Do Soon - Core Functionality)**

```
NEXT_PUBLIC_SUPABASE_URL
SUPABASE_KEY
NEXT_PUBLIC_SITE_URL
NEXT_PUBLIC_API_URL
NEXT_PUBLIC_ENV
NODE_ENV
AUTH_TRUST_HOST
NEXTAUTH_URL
```

**3. RECOMMENDED (Do This Week - Automation)**

```
WHATSAPP_PHONE_NUMBER_ID
WHATSAPP_ACCESS_TOKEN
WHATSAPP_BUSINESS_ACCOUNT_ID
WHATSAPP_API_URL
WHATSAPP_VERIFY_TOKEN
WHATSAPP_WEBHOOK_SECRET
```

**4. ANALYTICS (Do Soon - Tracking)**

```
NEXT_PUBLIC_GA_MEASUREMENT_ID
NEXT_PUBLIC_GTM_ID
NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_ID
NEXT_PUBLIC_FB_PIXEL_ID
```

**5. OPTIONAL (As Needed - Enhancement)**

```
NEXT_PUBLIC_INSTANT_APP_ID
INSTANT_APP_ADMIN_TOKEN
REDIS_URL
REDIS_PRIMARY_URL
OPENAI_API_KEY (rotate first!)
ANTHROPIC_API_KEY (rotate first!)
GOOGLE_AI_API_KEY (rotate first!)
SMTP_* (email configuration)
ZOOM_* (video integration)
```

### Command Quick Reference

```bash
# Generate 32-byte secret (auth tokens)
openssl rand -base64 32

# Generate 64-byte secret (JWT tokens)
openssl rand -base64 64

# Generate hex secret (webhooks)
openssl rand -hex 32

# Hash password with bcrypt
node -e "const bcrypt = require('bcryptjs'); console.log(bcrypt.hashSync('PASSWORD', 12))"

# Test API endpoint
curl https://cerebrumbiologyacademy.com/api/health

# Check environment in browser console
console.log(process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID)
```

### Important URLs

- **Vercel Dashboard:** https://vercel.com/dashboard
- **Razorpay Dashboard:** https://dashboard.razorpay.com
- **Supabase Dashboard:** https://supabase.com/dashboard
- **Meta Business Suite:** https://business.facebook.com
- **Google Analytics:** https://analytics.google.com
- **OpenAI Platform:** https://platform.openai.com
- **Anthropic Console:** https://console.anthropic.com

---

## Summary

This guide covers all environment variables needed for the Cerebrum Biology Academy website deployment on Vercel.

**Critical Path to Enable Payments:**

1. Rotate database password (security)
2. Generate new auth secrets (security)
3. Add Razorpay production keys (revenue)
4. Configure webhooks (order tracking)
5. Verify with ₹1 test payment

**Estimated Time:**

- Critical setup: 2-3 hours
- Full setup with all integrations: 1-2 days

**Revenue Impact:**

- Without Razorpay: ₹0 (payments broken)
- With Razorpay: Immediate revenue generation

**Next Steps:**

1. Follow security checklist above
2. Add variables in priority order
3. Test thoroughly in Preview before Production
4. Monitor logs and analytics after deployment

---

**Last Updated:** October 28, 2025
**Maintained By:** Development Team
**Questions:** Refer to troubleshooting section or contact Vercel support
