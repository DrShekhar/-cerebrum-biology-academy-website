# Vercel Deployment - Complete Step-by-Step Walkthrough

**Cerebrum Biology Academy Website**
**Total Time Estimate: 60-90 minutes**
**Last Updated: October 29, 2025**

---

## Table of Contents

1. [Pre-Deployment Checklist (5-10 min)](#1-pre-deployment-checklist-5-10-min)
2. [Project Setup on Vercel (5 min)](#2-project-setup-on-vercel-5-min)
3. [Environment Variables - Production (20-30 min)](#3-environment-variables---production-20-30-min)
4. [Domain Configuration (10-15 min)](#4-domain-configuration-10-15-min)
5. [Build Configuration (5 min)](#5-build-configuration-5-min)
6. [First Deployment (5-10 min)](#6-first-deployment-5-10-min)
7. [Post-Deployment Verification (10-15 min)](#7-post-deployment-verification-10-15-min)
8. [Payment Testing (15 min)](#8-payment-testing-15-min)
9. [Switch to LIVE Mode (5 min)](#9-switch-to-live-mode-5-min)
10. [Monitoring Setup (10 min)](#10-monitoring-setup-10-min)
11. [Team Access (5 min)](#11-team-access-5-min)
12. [Final Checks (5 min)](#12-final-checks-5-min)
13. [Troubleshooting](#troubleshooting)

---

## 1. Pre-Deployment Checklist (5-10 min)

### 1.1 Create Vercel Account

**If you already have an account, skip to 1.2**

1. Go to [https://vercel.com/signup](https://vercel.com/signup)
2. Click "Continue with GitHub"
3. Authorize Vercel to access your GitHub account
4. Complete your profile (name, optional avatar)

**What you should see:** A dashboard with "Add New Project" button

---

### 1.2 Install Vercel CLI (Optional but Recommended)

**On your local machine:**

```bash
# Install globally
npm install -g vercel

# Login to Vercel
vercel login
```

**What you should see:** Browser window opens asking you to verify login

**Why install CLI?**

- Test deployments locally before pushing
- View logs in terminal
- Quick access to environment variables

---

### 1.3 Prepare All Secrets

**Open these documents side-by-side:**

1. `/Users/drshekhar/cerebrum-biology-academy-website/.env.production.template`
2. `/Users/drshekhar/cerebrum-biology-academy-website/VERCEL_DEPLOYMENT_READY.md`

**Create a checklist document with:**

- [ ] Database credentials (from Neon/Supabase)
- [ ] Razorpay LIVE keys (from dashboard)
- [ ] Email API key (Resend or SendGrid)
- [ ] WhatsApp credentials (if using)
- [ ] Google OAuth credentials (if using)
- [ ] All other optional services you want to enable

---

### 1.4 Database Backup

**CRITICAL: Always backup before production deployment**

```bash
# If using Neon.tech
# Go to dashboard → Your Database → Backups → Create Backup

# If using Supabase
# Go to dashboard → Database → Backups → Create Manual Backup

# If using local PostgreSQL (migrate first!)
pg_dump -h localhost -U your_user -d cerebrum_academy > backup_$(date +%Y%m%d).sql
```

**What you should have:** A backup file or confirmation in dashboard

---

### 1.5 Test Build Locally

**Run this from your project directory:**

```bash
# Clean install
rm -rf .next node_modules
npm install

# Test production build
npm run build

# Test production server
npm run start
```

**What you should see:**

```
✓ Compiled successfully
✓ Ready on http://localhost:3000
```

**Visit localhost:3000 and verify:**

- [ ] Homepage loads
- [ ] Navigation works
- [ ] No console errors (check browser DevTools)

**If build fails:**

- Check the error message
- Fix any TypeScript/ESLint errors
- Re-run `npm run build`

---

## 2. Project Setup on Vercel (5 min)

### 2.1 Go to Vercel Dashboard

**Exact steps:**

1. Navigate to [https://vercel.com/dashboard](https://vercel.com/dashboard)
2. Look for the "Add New" button in the top right
3. Click "Add New" → Select "Project"

**What you should see:** A page titled "Import Git Repository"

---

### 2.2 Import from GitHub

**Step-by-step with visual cues:**

1. **You'll see three tabs at top:**
   - GitHub
   - GitLab
   - Bitbucket

2. **Click on "GitHub" tab**

3. **You'll see a list of your repositories**
   - If you don't see your repo, click "Add GitHub Account" or "Adjust GitHub App Permissions"
   - Grant access to the repository: `cerebrum-biology-academy-website`

4. **Find your repository in the list:**
   - Search for "cerebrum-biology-academy-website"
   - Click the "Import" button next to it

**What you should see:** A configuration page titled "Configure Project"

---

### 2.3 Configure Project Settings

**You'll see a form with these fields:**

**Project Name:**

- **Default value shown:** `cerebrum-biology-academy-website`
- **Leave as is** or customize (e.g., `cerebrum-biology-academy`)
- **Note:** This is just for Vercel dashboard, not your domain

**Framework Preset:**

- **Should auto-detect:** "Next.js"
- **If not detected:** Select "Next.js" from dropdown

**Root Directory:**

- **Default:** `./` (the root of your repository)
- **Leave as:** `./`
- **Only change if your Next.js app is in a subdirectory**

**Build and Output Settings:**

- **You should see these auto-detected values:**
  - Build Command: `npm run build`
  - Output Directory: `.next`
  - Install Command: `npm install`
- **Expand "Build and Development Settings" section**
- **Verify these settings, should look like:**

```
Build Command: npm run build
Output Directory: .next
Install Command: npm install
Development Command: npm run dev
```

**Important:** Do NOT click "Deploy" yet! We need to add environment variables first.

**What to do next:**

- Click the "Environment Variables" section below (it should expand)

---

## 3. Environment Variables - Production (20-30 min)

### How to Add Environment Variables

**You'll see a section titled "Environment Variables" with:**

- **Key** field (the variable name)
- **Value** field (the variable value)
- **Environment** dropdown (Production, Preview, Development)

**For each variable below:**

1. Enter the **Key** (exact name, case-sensitive)
2. Enter the **Value** (copy-paste to avoid typos)
3. Select **Environment(s)** (follow the guide below)
4. Click "Add" button
5. Repeat for all variables

---

### 3.1 CRITICAL - Database (Must Configure First)

**Time: 5 minutes**

**Where to get values:** Your database provider dashboard (Neon, Supabase, or Railway)

---

**Variable 1:**

```
Key: DATABASE_URL
Value: postgresql://[user]:[password]@[host]:5432/cerebrum_academy_prod?sslmode=require
Environment: ☑ Production  ☑ Preview
```

**How to get this:**

1. Go to your Neon.tech dashboard (or Supabase/Railway)
2. Click on your database
3. Click "Connection Details" or "Connection String"
4. Copy the "Pooled connection" string
5. Make sure it ends with `?sslmode=require`

**Example value:**

```
postgresql://neondb_owner:AbCd1234@ep-cool-sky-123456.us-east-2.aws.neon.tech/neondb?sslmode=require
```

---

**Variable 2:**

```
Key: DIRECT_URL
Value: [Same as DATABASE_URL]
Environment: ☑ Production  ☑ Preview
```

**Note:** For Neon, use the same URL. For Supabase, use the "Direct connection" string.

---

### 3.2 CRITICAL - Authentication & Security

**Time: 2 minutes**

**Good news:** These are pre-generated! Just copy-paste exactly as shown.

---

**Variable 3:**

```
Key: AUTH_SECRET
Value: /jyLZuV+o9B2fMWW/HWlyQKAu5Q/IrT9KhIAlny0oEk=
Environment: ☑ Production  ☑ Preview  ☑ Development
```

---

**Variable 4:**

```
Key: JWT_SECRET
Value: G8kMkhiYUjxpf6P7J3RktRMPtk5LfIuU2VA4AFeBXNY=
Environment: ☑ Production  ☑ Preview  ☑ Development
```

---

**Variable 5:**

```
Key: JWT_REFRESH_SECRET
Value: dwVdeu7nXZxqKYFl1v/tGmn489L50WGrXKbZ+xrCWtE=
Environment: ☑ Production  ☑ Preview  ☑ Development
```

---

**Variable 6:**

```
Key: NEXTAUTH_SECRET
Value: 56067ceeb2568d1849c118ed0a5668e5f6829f77c3e06640ca499878f9198cd2
Environment: ☑ Production  ☑ Preview  ☑ Development
```

---

**Variable 7:**

```
Key: NEXTAUTH_URL
Value: https://cerebrumbiologyacademy.com
Environment: ☑ Production ONLY
```

**Important:** Do NOT add to Preview/Development. Vercel sets this automatically for those environments.

---

**Variable 8:**

```
Key: NEXT_PUBLIC_APP_URL
Value: https://cerebrumbiologyacademy.com
Environment: ☑ Production ONLY
```

---

### 3.3 CRITICAL - Razorpay Payment Gateway

**Time: 5 minutes**

**Where to get values:** [https://dashboard.razorpay.com/app/keys](https://dashboard.razorpay.com/app/keys)

**IMPORTANT:** For production, use LIVE keys (starts with `rzp_live_`), NOT test keys!

---

**Step-by-step to get Razorpay keys:**

1. Go to [https://dashboard.razorpay.com](https://dashboard.razorpay.com)
2. Login to your account
3. Click "Settings" (gear icon) in left sidebar
4. Click "API Keys" under "Developers"
5. You'll see "Test Mode" and "Live Mode" tabs
6. **Click "Live Mode" tab** (important!)
7. If you don't have Live keys yet, click "Generate Live API Keys"
8. You'll see:
   - **Key ID** (starts with `rzp_live_`)
   - **Key Secret** (click "Show" to reveal)

---

**Variable 9:**

```
Key: RAZORPAY_KEY_ID
Value: rzp_live_YOUR_KEY_ID
Environment: ☑ Production ONLY
```

**What to paste:** Your Key ID from Razorpay Live Mode

---

**Variable 10:**

```
Key: RAZORPAY_KEY_SECRET
Value: YOUR_SECRET_KEY
Environment: ☑ Production ONLY
```

**What to paste:** Your Key Secret from Razorpay Live Mode
**Security:** Never share this or commit to git!

---

**Variable 11:**

```
Key: NEXT_PUBLIC_RAZORPAY_KEY_ID
Value: [Same as RAZORPAY_KEY_ID above]
Environment: ☑ Production ONLY
```

**What to paste:** Same value as Variable 9

---

**Variable 12:**

```
Key: RAZORPAY_WEBHOOK_SECRET
Value: [Get from Webhooks section]
Environment: ☑ Production ONLY
```

**How to get webhook secret:**

1. In Razorpay Dashboard, click "Webhooks" (under Settings → Developers)
2. Click "+ Create Webhook" (or edit existing)
3. Enter these details:
   - **Webhook URL:** `https://cerebrumbiologyacademy.com/api/webhooks/razorpay`
   - **Alert Email:** your-email@example.com
4. Select these events:
   - ☑ `payment.authorized`
   - ☑ `payment.captured`
   - ☑ `payment.failed`
   - ☑ `order.paid`
   - ☑ `subscription.activated`
   - ☑ `subscription.cancelled`
5. Click "Create Webhook"
6. You'll see a "Webhook Secret" - copy this value

**What you should see:** A string starting with `whsec_`

---

### 3.4 Application Configuration

**Time: 3 minutes**

**Good news:** All fixed values, just copy-paste!

---

**Variable 13:**

```
Key: NODE_ENV
Value: production
Environment: ☑ Production ONLY
```

---

**Variable 14:**

```
Key: NEXT_PUBLIC_ENVIRONMENT
Value: production
Environment: ☑ Production ONLY
```

---

**Variable 15:**

```
Key: RATE_LIMIT_MAX_REQUESTS
Value: 100
Environment: ☑ Production  ☑ Preview
```

---

**Variable 16:**

```
Key: RATE_LIMIT_WINDOW_MS
Value: 60000
Environment: ☑ Production  ☑ Preview
```

---

**Variable 17:**

```
Key: SESSION_MAX_AGE
Value: 604800
Environment: ☑ Production  ☑ Preview
```

---

**Variable 18:**

```
Key: REFRESH_TOKEN_MAX_AGE
Value: 2592000
Environment: ☑ Production  ☑ Preview
```

---

**Variable 19:**

```
Key: LOG_LEVEL
Value: info
Environment: ☑ Production  ☑ Preview
```

---

**Variable 20:**

```
Key: NEXT_PUBLIC_ENABLE_LOGGING
Value: true
Environment: ☑ Production  ☑ Preview
```

---

**Variable 21:**

```
Key: NEXT_PUBLIC_DEBUG_MODE
Value: false
Environment: ☑ Production ONLY
```

**Important:** Must be `false` for production security!

---

### 3.5 HIGH PRIORITY - Email Service

**Time: 5 minutes**

**Choose ONE option:** Resend (recommended) OR SendGrid

---

#### Option A: Resend (Recommended)

**Where to get values:** [https://resend.com/api-keys](https://resend.com/api-keys)

**Steps to get Resend API key:**

1. Go to [https://resend.com](https://resend.com)
2. Sign up or login
3. Click "API Keys" in left sidebar
4. Click "+ Create API Key"
5. Enter a name: "Production - Cerebrum Biology Academy"
6. Select "Full Access" or "Sending Access"
7. Click "Create"
8. Copy the API key (starts with `re_`)

**Variable 22:**

```
Key: RESEND_API_KEY
Value: re_YOUR_API_KEY
Environment: ☑ Production  ☑ Preview
```

---

**Variable 23:**

```
Key: RESEND_FROM_EMAIL
Value: noreply@cerebrumbiologyacademy.com
Environment: ☑ Production  ☑ Preview
```

**Important:** Before this works, you must verify your domain in Resend:

1. Go to Resend Dashboard → Domains
2. Click "+ Add Domain"
3. Enter: `cerebrumbiologyacademy.com`
4. You'll get DNS records to add
5. Add these to your domain provider (see section 4.5 for details)
6. Click "Verify Domain"

---

#### Option B: SendGrid (Alternative)

**If you prefer SendGrid instead:**

**Variable 22:**

```
Key: SENDGRID_API_KEY
Value: SG.YOUR_SENDGRID_API_KEY
Environment: ☑ Production  ☑ Preview
```

**Variable 23:**

```
Key: SENDGRID_FROM_EMAIL
Value: noreply@cerebrumbiologyacademy.com
Environment: ☑ Production  ☑ Preview
```

---

### 3.6 HIGH PRIORITY - WhatsApp Business API (Optional)

**Time: 10 minutes**
**Skip if not using WhatsApp notifications**

**Where to get values:** Meta Business Manager

**Prerequisites:**

- Facebook Business Account
- WhatsApp Business Account
- Verified phone number

---

**Steps to get WhatsApp credentials:**

1. Go to [https://business.facebook.com](https://business.facebook.com)
2. Click on your Business Account
3. Click "WhatsApp Accounts" in left menu
4. Select your WhatsApp Business Account
5. Click "API Setup" or "Getting Started"
6. You'll see:
   - **Phone Number ID** (a long number)
   - **WhatsApp Business Account ID** (also a long number)
   - **Access Token** (click to reveal)

---

**Variable 24:**

```
Key: WHATSAPP_BUSINESS_ACCOUNT_ID
Value: YOUR_BUSINESS_ACCOUNT_ID
Environment: ☑ Production  ☑ Preview
```

---

**Variable 25:**

```
Key: WHATSAPP_PHONE_NUMBER_ID
Value: YOUR_PHONE_NUMBER_ID
Environment: ☑ Production  ☑ Preview
```

---

**Variable 26:**

```
Key: WHATSAPP_ACCESS_TOKEN
Value: YOUR_PERMANENT_ACCESS_TOKEN
Environment: ☑ Production  ☑ Preview
```

**Important:** Use a System User Token for production (never expires)

**How to get permanent token:**

1. Meta Business Settings → System Users
2. Create new System User or select existing
3. Generate new token
4. Select permissions: `whatsapp_business_messaging`, `whatsapp_business_management`
5. Copy the token (starts with `EAA`)

---

**Variable 27:**

```
Key: WHATSAPP_API_VERSION
Value: v21.0
Environment: ☑ Production  ☑ Preview
```

---

**Variable 28:**

```
Key: WHATSAPP_VERIFY_TOKEN
Value: YOUR_CUSTOM_SECRET_STRING
Environment: ☑ Production  ☑ Preview
```

**What to use:** Create your own random string (e.g., `cerebrum_webhook_verify_2025`)
**Remember this!** You'll need it when setting up webhooks.

---

**Variable 29:**

```
Key: WHATSAPP_ADMIN_NUMBER
Value: +91YOUR_PHONE_NUMBER
Environment: ☑ Production  ☑ Preview
```

**Format:** Include country code (e.g., `+918826444334`)

---

### 3.7 Optional - Google OAuth

**Time: 5 minutes**
**Skip if not using Google Sign-In**

**Where to get values:** [https://console.cloud.google.com/apis/credentials](https://console.cloud.google.com/apis/credentials)

---

**Steps to get Google OAuth credentials:**

1. Go to Google Cloud Console
2. Create a new project or select existing: "Cerebrum Biology Academy"
3. Enable "Google+ API" or "Google Sign-In API"
4. Go to "Credentials" in left menu
5. Click "+ CREATE CREDENTIALS" → "OAuth 2.0 Client ID"
6. Application type: "Web application"
7. Name: "Cerebrum Biology Academy - Production"
8. **Authorized redirect URIs:**
   - Add: `https://cerebrumbiologyacademy.com/api/auth/callback/google`
   - Add: `https://*.vercel.app/api/auth/callback/google` (for previews)
9. Click "Create"
10. Copy Client ID and Client Secret

---

**Variable 30:**

```
Key: GOOGLE_CLIENT_ID
Value: YOUR_CLIENT_ID.apps.googleusercontent.com
Environment: ☑ Production  ☑ Preview
```

---

**Variable 31:**

```
Key: GOOGLE_CLIENT_SECRET
Value: YOUR_CLIENT_SECRET
Environment: ☑ Production  ☑ Preview
```

---

### 3.8 Optional - Analytics & Monitoring

**Time: 5 minutes**
**Recommended for production insights**

---

#### Google Analytics 4

**Where to get:** [https://analytics.google.com](https://analytics.google.com)

**Steps:**

1. Create GA4 Property for "Cerebrum Biology Academy"
2. Get Measurement ID from Admin → Data Streams
3. Copy the ID (starts with `G-`)

**Variable 32:**

```
Key: NEXT_PUBLIC_GA_MEASUREMENT_ID
Value: G-YOUR_GA4_ID
Environment: ☑ Production ONLY
```

**Why Production only?** Avoid polluting analytics with preview deployments.

---

#### Vercel Analytics (Auto-configured)

**Variable 33:**

```
Key: NEXT_PUBLIC_VERCEL_ANALYTICS_ID
Value: auto
Environment: ☑ Production  ☑ Preview
```

**Note:** Vercel handles this automatically, but adding ensures it's enabled.

---

#### Sentry Error Tracking (Optional)

**Where to get:** [https://sentry.io](https://sentry.io)

**Steps:**

1. Create account and new project
2. Select "Next.js"
3. Copy DSN (looks like `https://...@...ingest.sentry.io/...`)

**Variable 34:**

```
Key: SENTRY_DSN
Value: https://YOUR_KEY@YOUR_ORG.ingest.sentry.io/YOUR_PROJECT_ID
Environment: ☑ Production  ☑ Preview
```

**Variable 35:**

```
Key: NEXT_PUBLIC_SENTRY_DSN
Value: [Same as SENTRY_DSN]
Environment: ☑ Production  ☑ Preview
```

---

### 3.9 Optional - AI Services

**Time: 3 minutes**
**Skip if not using AI tutoring features**

---

**Where to get:** [https://platform.openai.com/api-keys](https://platform.openai.com/api-keys)

**Steps:**

1. Create OpenAI account
2. Go to API Keys
3. Click "+ Create new secret key"
4. Copy the key (starts with `sk-proj-`)

**Variable 36:**

```
Key: OPENAI_API_KEY
Value: sk-proj-YOUR_OPENAI_API_KEY
Environment: ☑ Production  ☑ Preview
```

**Variable 37:**

```
Key: NEXT_PUBLIC_ENABLE_AI_TUTOR
Value: true
Environment: ☑ Production  ☑ Preview
```

**Set to `false` to disable AI features**

---

### 3.10 Optional - Other Services

**Quick reference for other optional services:**

---

#### UploadThing (File Uploads)

```
UPLOADTHING_SECRET=sk_live_YOUR_SECRET
UPLOADTHING_APP_ID=YOUR_APP_ID
Environment: ☑ Production  ☑ Preview
```

Get from: [https://uploadthing.com/dashboard](https://uploadthing.com/dashboard)

---

#### Redis Cache (Upstash)

```
REDIS_URL=redis://default:YOUR_PASSWORD@YOUR_HOST:6379
REDIS_TOKEN=YOUR_REDIS_TOKEN
Environment: ☑ Production  ☑ Preview
```

Get from: [https://console.upstash.com](https://console.upstash.com)

---

#### Zoom (Live Classes)

```
ZOOM_ACCOUNT_ID=YOUR_ACCOUNT_ID
ZOOM_CLIENT_ID=YOUR_CLIENT_ID
ZOOM_CLIENT_SECRET=YOUR_CLIENT_SECRET
NEXT_PUBLIC_ENABLE_LIVE_CLASSES=true
Environment: ☑ Production  ☑ Preview
```

Get from: [https://marketplace.zoom.us](https://marketplace.zoom.us)

---

## 4. Domain Configuration (10-15 min)

### 4.1 Access Domain Settings

**After adding environment variables:**

1. **If you haven't deployed yet:** Click "Deploy" button now
2. Wait for first deployment to complete (3-5 minutes)
3. You'll see: "Your project has been deployed"
4. Click on your project name to go to project dashboard
5. Click "Settings" tab at top
6. Click "Domains" in left sidebar

**What you should see:** A page titled "Domains" with "Add" button

---

### 4.2 Add Your Domain

**Step-by-step:**

1. Click the "Add" button
2. You'll see a field: "What domain would you like to add?"
3. Type: `cerebrumbiologyacademy.com`
4. Click "Add"

**What you should see:** A section showing DNS configuration needed

---

### 4.3 Configure DNS Records

**You'll see instructions showing:**

- Record Type: `A` or `CNAME`
- Name/Host: `@` or `cerebrumbiologyacademy.com`
- Value: `76.76.21.21` (or a CNAME like `cname.vercel-dns.com`)

**Now go to your domain provider (GoDaddy, Namecheap, Cloudflare, etc.):**

---

#### If using GoDaddy:

1. Go to [https://dcc.godaddy.com/manage/dns](https://dcc.godaddy.com/manage/dns)
2. Find `cerebrumbiologyacademy.com` and click "DNS"
3. Scroll to "Records" section
4. Click "Add New Record"
5. **For root domain:**
   - Type: `A`
   - Name: `@`
   - Value: `76.76.21.21` (from Vercel)
   - TTL: `600` seconds
6. Click "Save"

---

#### If using Namecheap:

1. Go to Domain List → Manage → Advanced DNS
2. Click "Add New Record"
3. **For root domain:**
   - Type: `A Record`
   - Host: `@`
   - Value: `76.76.21.21`
   - TTL: `Automatic`
4. Click checkmark to save

---

#### If using Cloudflare:

1. Select your domain
2. Click "DNS" tab
3. Click "Add record"
4. **For root domain:**
   - Type: `A`
   - Name: `@`
   - IPv4 address: `76.76.21.21`
   - Proxy status: `Proxied` (orange cloud)
5. Click "Save"

**Note:** If using Cloudflare, also set SSL/TLS to "Full"

---

### 4.4 Add WWW Subdomain

**Back in Vercel:**

1. Click "Add" again in Domains section
2. Type: `www.cerebrumbiologyacademy.com`
3. Click "Add"
4. You'll see similar DNS instructions

**In your DNS provider, add another record:**

- Type: `CNAME`
- Name/Host: `www`
- Value: `cname.vercel-dns.com` (or your main domain)
- TTL: `600` seconds

**Save the record**

---

### 4.5 Configure Domain Redirect

**In Vercel Domains section:**

1. Find `www.cerebrumbiologyacademy.com` in the list
2. Click the three dots (...) next to it
3. Click "Redirect to..."
4. Select `cerebrumbiologyacademy.com` (non-www)
5. Keep "Permanent (308)" selected
6. Click "Save"

**What this does:** Redirects www to non-www (or vice versa if you prefer)

---

### 4.6 Wait for DNS Propagation

**This usually takes 5-15 minutes but can take up to 48 hours**

**Check status:**

1. In Vercel Domains section, you'll see status icons
2. ⚪ Grey = Pending configuration
3. 🟡 Yellow = Propagating
4. 🟢 Green = Active

**To check DNS propagation manually:**

```bash
# Check A record
dig cerebrumbiologyacademy.com

# Check CNAME record
dig www.cerebrumbiologyacademy.com

# Or use online tool
# https://www.whatsmydns.net/#A/cerebrumbiologyacademy.com
```

---

### 4.7 SSL Certificate (Automatic)

**Vercel automatically provisions SSL certificates**

**What you should see in Vercel:**

- "SSL Certificate: Active" or "Provisioning"

**Wait for:**

- Certificate to show as "Active" (usually 1-2 minutes)
- Both domains to have green checkmarks

**Test SSL:**

```bash
# Should return 200 OK
curl -I https://cerebrumbiologyacademy.com
```

---

### 4.8 Email DNS Records (If using Resend/SendGrid)

**For email sending to work, add these DNS records:**

#### For Resend:

**In Resend Dashboard → Domains → cerebrumbiologyacademy.com:**

You'll see DNS records like:

1. **SPF Record:**
   - Type: `TXT`
   - Name: `@`
   - Value: `v=spf1 include:resend.com ~all`

2. **DKIM Record:**
   - Type: `TXT`
   - Name: `resend._domainkey`
   - Value: `[long string provided by Resend]`

3. **DMARC Record (optional but recommended):**
   - Type: `TXT`
   - Name: `_dmarc`
   - Value: `v=DMARC1; p=none; rua=mailto:your-email@example.com`

**Add each of these to your DNS provider the same way you added domain records**

**Verify in Resend:**

- Go back to Resend Domains
- Click "Verify" next to your domain
- Should show "Verified" with green checkmark

---

## 5. Build Configuration (5 min)

### 5.1 Review Build Settings

**Go to:** Project Settings → General → Build & Development Settings

**You should see (pre-configured by Next.js detection):**

```
Framework Preset: Next.js
Build Command: npm run build
Output Directory: .next
Install Command: npm install
Development Command: npm run dev
```

**What you should see:** These fields should be auto-filled and correct.

---

### 5.2 Set Node.js Version

**Scroll down to "Node.js Version"**

**Recommended:** `20.x` (latest LTS)

**How to set:**

1. Click the dropdown
2. Select "20.x"
3. Click "Save"

**What this does:** Ensures consistent Node.js version between local and production

---

### 5.3 Environment-Specific Build Settings

**Still in Build Settings:**

**Production:**

- Build Command: `npm run build`
- ✅ This is correct, leave as is

**Preview (for PR deployments):**

- Usually same as production
- Leave as default

**Root Directory:**

- Should be: `./`
- Only change if Next.js app is in subdirectory

---

### 5.4 Function Regions

**Optional but recommended for performance:**

**Go to:** Settings → Functions

**Select region closest to your users:**

- For India: `bom1` (Mumbai)
- For Global: Leave as default (Vercel auto-selects)

**How to set:**

1. Click "Function Region"
2. Select your preferred region
3. Click "Save"

---

## 6. First Deployment (5-10 min)

### 6.1 Trigger Deployment

**Two ways to deploy:**

#### Method A: Automatic (Git Push)

**Most common way:**

```bash
# From your local project
git add .
git commit -m "feat: Initial production deployment"
git push origin main
```

**What happens:**

- Vercel detects the push
- Automatically starts building
- Deploys when build succeeds

---

#### Method B: Manual Deploy

**In Vercel Dashboard:**

1. Go to your project
2. Click "Deployments" tab
3. Click "Deploy" button (top right)
4. Select branch: `main`
5. Click "Deploy"

---

### 6.2 Watch Build Logs

**Immediately after triggering:**

1. Go to "Deployments" tab
2. Click on the latest deployment (should say "Building...")
3. You'll see real-time logs

**What you should see (typical build):**

```
Installing dependencies...
✓ Dependencies installed
Building application...
Route (app)                              Size     First Load JS
✓ /                                     142 B      87.2 kB
✓ /api/health                           0 B        0 B
...
✓ Compiled successfully
Creating optimized production build...
✓ Build completed successfully
```

**Build time:** Usually 3-5 minutes for first deployment

---

### 6.3 Common Build Errors & Solutions

**If build fails, check the logs for:**

---

#### Error: "DATABASE_URL is not defined"

**Solution:**

1. Go to Settings → Environment Variables
2. Check if `DATABASE_URL` is added
3. Verify it's enabled for "Production" environment
4. If missing, add it (see section 3.1)
5. Retry deployment

---

#### Error: "Module not found" or "Cannot find module"

**Solution:**

```bash
# Locally, clean install
rm -rf node_modules package-lock.json
npm install
npm run build

# If works locally, in Vercel:
# Settings → General → Build & Development Settings
# Install Command: npm ci
# Click Save and redeploy
```

---

#### Error: TypeScript errors during build

**Expected:** Our project has TypeScript errors suppressed for MVP.

**Check `next.config.mjs` has:**

```javascript
typescript: {
  ignoreBuildErrors: true,
}
```

**If you see TS errors in build logs but deployment still succeeds:** This is normal.

---

### 6.4 Deployment Success

**What you should see when successful:**

```
✓ Build completed successfully
Deploying...
✓ Deployment completed
🎉 Your project has been deployed

Production: https://cerebrumbiologyacademy.com
```

**Click the URL to view your deployed site!**

**What to check:**

- [ ] Page loads without errors
- [ ] Styles are applied correctly
- [ ] Images load
- [ ] No console errors (open browser DevTools)

---

## 7. Post-Deployment Verification (10-15 min)

### 7.1 Homepage Check

**Visit:** `https://cerebrumbiologyacademy.com`

**Verify:**

- [ ] Page loads (not 404 or 500)
- [ ] Logo and branding visible
- [ ] Navigation menu works
- [ ] Hero section displays
- [ ] Images load correctly
- [ ] Animations work (if any)

**Open Browser DevTools (F12) and check:**

- [ ] Console tab: No red errors
- [ ] Network tab: All resources load (200 status)

---

### 7.2 Navigation Test

**Click through each main section:**

- [ ] Home (`/`)
- [ ] Courses (`/courses` or `/courses/class-11`, `/courses/class-12`)
- [ ] About (`/about`)
- [ ] Contact (`/contact`)
- [ ] Pricing/Purchase pages

**For each page, verify:**

- Loads correctly
- No console errors
- Proper meta tags (check page `<title>`)
- Responsive on mobile (toggle device view in DevTools)

---

### 7.3 API Health Check

**Check backend connectivity:**

**Visit:** `https://cerebrumbiologyacademy.com/api/health`

**Expected response:**

```json
{
  "status": "ok",
  "timestamp": "2025-10-29T10:30:00.000Z",
  "environment": "production"
}
```

**If you see error:**

- Check environment variables are set
- Check database connection
- Review Vercel logs (Deployments → View Function Logs)

---

**Visit:** `https://cerebrumbiologyacademy.com/api/health/database`

**Expected response:**

```json
{
  "status": "ok",
  "database": "connected",
  "latency": "45ms"
}
```

**If database error:**

1. Verify `DATABASE_URL` is correct
2. Test connection string locally
3. Check database firewall allows Vercel IPs
4. For Neon: Check project is not paused
5. Check database logs in provider dashboard

---

### 7.4 Authentication Test

**Test sign-up flow:**

1. Go to: `https://cerebrumbiologyacademy.com/auth/signup`
2. Fill out registration form
3. Submit

**Expected:**

- Form submits successfully
- User is created in database
- Redirected to dashboard or homepage
- Logged in (check for user menu/avatar)

**If error:**

- Check console for specific error message
- Verify all AUTH*\* and NEXTAUTH*\* variables are set
- Check database `users` table exists (via Prisma Studio or SQL client)

---

**Test login flow:**

1. Go to: `https://cerebrumbiologyacademy.com/auth/signin`
2. Login with credentials just created
3. Submit

**Expected:**

- Login successful
- Redirected appropriately
- Session persists (refresh page, should stay logged in)

---

**Test Google OAuth (if configured):**

1. Click "Sign in with Google"
2. Select Google account
3. Authorize

**Expected:**

- Redirects back to your site
- Logged in successfully

**If error "redirect_uri_mismatch":**

1. Go to Google Cloud Console
2. Check OAuth redirect URIs include: `https://cerebrumbiologyacademy.com/api/auth/callback/google`
3. Add if missing, wait 5 minutes, retry

---

### 7.5 Error Page Check

**Test 404 page:**

Visit: `https://cerebrumbiologyacademy.com/this-page-does-not-exist`

**Expected:**

- Custom 404 page displays
- Not a generic error
- Navigation still works

---

**Test error handling:**

1. Open DevTools Console
2. Look for any unhandled errors
3. All should be caught gracefully

---

### 7.6 Performance Check

**Test loading speed:**

**Use Lighthouse (built into Chrome DevTools):**

1. Open DevTools → Lighthouse tab
2. Select:
   - ☑ Performance
   - ☑ Best Practices
   - ☑ SEO
   - Device: Mobile
3. Click "Analyze page load"

**Target scores for production:**

- Performance: >80
- Best Practices: >90
- SEO: >90

**If scores are low:**

- Check if images are optimized
- Verify caching headers
- Review Core Web Vitals in report

---

### 7.7 Mobile Responsiveness

**Test on mobile devices or DevTools device mode:**

**Chrome DevTools:**

1. Press F12
2. Click "Toggle Device Toolbar" (phone icon) or Ctrl+Shift+M
3. Select device: iPhone 12 Pro, Pixel 5, etc.

**Check:**

- [ ] Layout adapts to screen size
- [ ] Text is readable (not too small)
- [ ] Buttons are tappable
- [ ] Navigation menu works (mobile menu)
- [ ] Images scale properly
- [ ] No horizontal scrolling

**Test orientations:**

- Portrait mode
- Landscape mode

---

### 7.8 Analytics Verification

**If you configured Google Analytics:**

1. Visit your site: `https://cerebrumbiologyacademy.com`
2. Open DevTools → Network tab
3. Filter: `analytics` or `gtag`
4. Refresh page
5. Look for requests to `google-analytics.com/g/collect`

**You should see:**

- Requests being sent
- Status: 200

**In Google Analytics:**

1. Go to [https://analytics.google.com](https://analytics.google.com)
2. Select your property
3. Go to "Realtime" → "Overview"
4. You should see 1 active user (you!)

**If not tracking:**

- Check `NEXT_PUBLIC_GA_MEASUREMENT_ID` is set correctly
- Verify it starts with `G-`
- Check browser isn't blocking analytics (disable ad blocker for test)

---

## 8. Payment Testing (15 min)

**IMPORTANT:** Start with TEST mode before switching to LIVE!

### 8.1 Verify Test Mode Setup

**For Preview environment, ensure test keys are used:**

**Go to:** Settings → Environment Variables

**For Preview environment, should have:**

```
RAZORPAY_KEY_ID=rzp_test_YOUR_TEST_KEY
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_test_YOUR_TEST_KEY
(Environment: Preview)
```

**Deploy to preview to test:**

```bash
git checkout -b test-payment
git push origin test-payment
```

**Vercel will create preview deployment**

---

### 8.2 Test Purchase Flow (Guest Checkout)

**On preview or production (if using test keys):**

1. Go to a course page: `/purchase/class-11` or similar
2. Click "Enroll Now" or "Purchase" button

**You should see:**

- Enrollment form (if guest checkout)
- Fields: Name, Email, Phone
- Payment button

3. Fill out form:
   - Name: Test User
   - Email: test@example.com
   - Phone: +918826444334

4. Click "Proceed to Payment"

**What you should see:**

- Razorpay checkout modal opens
- Shows course name and price
- Payment options displayed

---

### 8.3 Test Card Payment

**In Razorpay checkout modal:**

1. Select "Card" payment method
2. Enter test card details:
   ```
   Card Number: 4111 1111 1111 1111
   Expiry: 12/26 (any future date)
   CVV: 123
   Name: Test User
   ```
3. Click "Pay Now"

**Expected:**

- Payment processes
- Success message displays
- Redirects to success page or dashboard

**Check Razorpay Dashboard:**

1. Go to: https://dashboard.razorpay.com/app/payments
2. Switch to "Test Mode"
3. You should see the test payment listed
4. Status should be "Captured" or "Authorized"

---

### 8.4 Verify Order Created in Database

**Use Prisma Studio or database client:**

```bash
# Locally (connected to production DB)
npx prisma studio
```

**Or use your database provider's interface:**

- Neon: Dashboard → Tables → Browse Data
- Supabase: Table Editor

**Check `orders` table:**

- [ ] New order exists
- [ ] Status: "COMPLETED" or "SUCCESS"
- [ ] Amount matches
- [ ] User/email recorded

**Check `enrollments` table (if applicable):**

- [ ] Enrollment record created
- [ ] Linked to correct course
- [ ] Status: "ACTIVE"

---

### 8.5 Test UPI Payment (Test Mode)

**In Razorpay checkout:**

1. Select "UPI" payment method
2. Enter test UPI ID: `success@razorpay`
3. Click "Pay"

**Expected:**

- Payment succeeds immediately (test mode auto-approves)
- Order completed

**Other test UPI IDs:**

- `success@razorpay` - Success
- `failure@razorpay` - Failure (to test error handling)

---

### 8.6 Test Webhook Delivery

**Important:** Razorpay webhooks work in production, but you can simulate locally.

**Check webhook endpoint is accessible:**

```bash
curl -X POST https://cerebrumbiologyacademy.com/api/webhooks/razorpay \
  -H "Content-Type: application/json" \
  -d '{"test": true}'
```

**Expected:**

- Status: 200 or 400 (depends on validation)
- Not 404 or 500

**In Razorpay Dashboard:**

1. Go to: Webhooks
2. Click on your webhook
3. Click "Send Test Webhook"
4. Select event: `payment.captured`
5. Click "Send"

**Check Vercel logs:**

1. Deployments → Select latest deployment
2. Click "View Function Logs"
3. Filter: `/api/webhooks/razorpay`
4. You should see webhook received and processed

---

### 8.7 Test Email Notifications

**After test payment:**

**Check email inbox** (the email you used in form):

- [ ] Received order confirmation email
- [ ] Email has correct details (amount, course name)
- [ ] Links work (if any)

**If email not received:**

1. Check spam folder
2. Verify `RESEND_API_KEY` or `SENDGRID_API_KEY` is set
3. Check email service dashboard (Resend/SendGrid) for delivery logs
4. Check Vercel function logs for email send attempts

---

### 8.8 Test WhatsApp Notifications (If Configured)

**After test payment:**

**Check WhatsApp** (the number you used):

- [ ] Received WhatsApp message
- [ ] Message has order details

**If not received:**

1. Check `WHATSAPP_*` variables are set
2. Verify WhatsApp number is verified in Meta Business
3. Check Meta Business Manager → WhatsApp → Messaging Activity
4. Check Vercel function logs for WhatsApp API calls

---

## 9. Switch to LIVE Mode (5 min)

**CRITICAL: Only do this when ready to accept real payments!**

### 9.1 Get Razorpay LIVE Keys

**Go to:** [https://dashboard.razorpay.com/app/keys](https://dashboard.razorpay.com/app/keys)

1. Click "Live Mode" tab
2. If no keys shown, click "Generate Live API Keys"
3. You may need to complete KYC (business verification)
   - Upload business documents
   - Wait for approval (1-2 days)
4. Once approved, copy:
   - **Key ID** (starts with `rzp_live_`)
   - **Key Secret**

---

### 9.2 Update Environment Variables

**Go to:** Vercel Dashboard → Settings → Environment Variables

**Update these variables for Production:**

1. Find `RAZORPAY_KEY_ID`
   - Click "Edit"
   - Replace with: `rzp_live_YOUR_LIVE_KEY_ID`
   - Save

2. Find `RAZORPAY_KEY_SECRET`
   - Click "Edit"
   - Replace with: `YOUR_LIVE_KEY_SECRET`
   - Save

3. Find `NEXT_PUBLIC_RAZORPAY_KEY_ID`
   - Click "Edit"
   - Replace with: `rzp_live_YOUR_LIVE_KEY_ID` (same as #1)
   - Save

**Important:** Only change for Production environment, keep test keys for Preview!

---

### 9.3 Update Webhook URL

**In Razorpay Dashboard:**

1. Go to: Webhooks (under Settings → Developers)
2. Create new webhook or update existing
3. **Webhook URL:** `https://cerebrumbiologyacademy.com/api/webhooks/razorpay`
4. Switch to "Live Mode" toggle
5. Copy the **Live Webhook Secret**

**Back in Vercel:**

1. Find `RAZORPAY_WEBHOOK_SECRET`
2. Edit and paste the LIVE webhook secret
3. Save

---

### 9.4 Redeploy

**Trigger new deployment to apply changes:**

**Method A: Git push**

```bash
git commit --allow-empty -m "chore: Switch to Razorpay LIVE mode"
git push origin main
```

**Method B: Manual redeploy**

1. Deployments tab → latest deployment
2. Click three dots (...) → Redeploy
3. Confirm

**Wait for deployment to complete**

---

### 9.5 Test with Real ₹1 Payment

**IMPORTANT: Test with minimum amount first!**

1. Go to a course purchase page
2. Use real email and phone number
3. Proceed to payment
4. **Use your actual credit/debit card or UPI**
5. Pay ₹1 (or minimum allowed amount)

**Verify:**

- [ ] Payment succeeds
- [ ] You receive confirmation email
- [ ] Order appears in database
- [ ] Payment shows in Razorpay Live Dashboard

---

### 9.6 Verify in Razorpay Dashboard

**Go to:** Razorpay Dashboard (ensure "Live Mode" is selected)

1. Go to: Payments
2. You should see your ₹1 test payment
3. Status: "Captured"
4. Amount: ₹1.00

---

### 9.7 Refund Test Payment

**To refund the ₹1 test:**

1. In Razorpay Dashboard → Payments
2. Click on the ₹1 payment
3. Click "Refund" button
4. Enter amount: ₹1.00
5. Reason: "Test payment"
6. Click "Refund"

**Expected:**

- Refund processed
- Amount returned to card in 5-7 business days

---

## 10. Monitoring Setup (10 min)

### 10.1 Configure Vercel Alerts

**Go to:** Project Settings → Notifications

**Enable these alerts:**

1. **Deployment Failures**
   - ☑ Email notifications
   - ☑ Slack (if using)
   - Who to notify: Your email

2. **Deployment Success** (optional)
   - For critical deployments

3. **Function Errors**
   - ☑ Email when error rate exceeds threshold
   - Threshold: 10 errors in 1 hour

**Save settings**

---

### 10.2 Set Up Uptime Monitoring

**Recommended: UptimeRobot (free tier)**

**Steps:**

1. Go to: [https://uptimerobot.com](https://uptimerobot.com)
2. Sign up for free account
3. Click "+ Add New Monitor"
4. Settings:
   - Monitor Type: HTTP(s)
   - Friendly Name: Cerebrum Biology Academy - Main
   - URL: `https://cerebrumbiologyacademy.com`
   - Monitoring Interval: 5 minutes
5. Click "Create Monitor"

**Add API health check:** 6. Click "+ Add New Monitor" again 7. Settings:

- URL: `https://cerebrumbiologyacademy.com/api/health`
- Monitoring Interval: 5 minutes

8. Create

**Configure alerts:** 9. Go to: My Settings → Alert Contacts 10. Add your email 11. For monitors, enable email alerts

**What you'll get:**

- Email if site goes down
- Weekly uptime reports
- Status page (optional, public)

---

### 10.3 Vercel Analytics Review

**Go to:** Project Dashboard → Analytics tab

**You should see:**

- Real-time visitors
- Page views
- Performance metrics (Core Web Vitals)
- Top pages

**Check regularly:**

- Response times
- Error rates
- Traffic patterns

**Set up alerts:**

- If response time > 3s
- If error rate > 5%

---

### 10.4 Configure Error Tracking (Sentry)

**If you added Sentry environment variables:**

**Go to:** [https://sentry.io](https://sentry.io) → Your Project

**Configure alerts:**

1. Click "Alerts" in left menu
2. Click "Create Alert Rule"
3. Select: "Issues"
4. Conditions:
   - When an issue is first seen
   - When an issue affects more than 10 users
5. Actions:
   - Send email to: your-email@example.com
6. Save rule

**Test Sentry is working:**

1. Trigger a test error on your site
2. Check Sentry dashboard for the error
3. Should appear within 1 minute

---

### 10.5 Razorpay Alerts

**In Razorpay Dashboard:**

1. Go to: Settings → Notifications
2. Enable:
   - ☑ Payment failures
   - ☑ Refund processed
   - ☑ Settlement reports
3. Add email: your-email@example.com
4. Save

---

### 10.6 Database Monitoring

**For Neon.tech:**

1. Go to: Neon Dashboard → Your Project
2. Click "Monitoring" tab
3. Review:
   - Connection count
   - Query performance
   - Storage usage

**Set up alerts:**

- If connection count > 80% of limit
- If storage > 80% of plan

**For Supabase:**

1. Go to: Database → Logs
2. Enable slow query logs
3. Set threshold: > 1000ms

---

### 10.7 Custom Health Checks

**Create monitoring dashboard bookmark folder:**

Add these bookmarks for quick access:

- Vercel Dashboard: `https://vercel.com/YOUR_PROJECT`
- Site Health: `https://cerebrumbiologyacademy.com/api/health`
- DB Health: `https://cerebrumbiologyacademy.com/api/health/database`
- Razorpay Dashboard: `https://dashboard.razorpay.com`
- Analytics: `https://analytics.google.com`
- Uptime Robot: `https://uptimerobot.com/dashboard`

**Daily check routine (2 minutes):**

1. Visit site health endpoints
2. Quick Vercel dashboard review
3. Check UptimeRobot status

---

## 11. Team Access (5 min)

### 11.1 Invite Team Members to Vercel

**Go to:** Vercel Dashboard → Settings → Members

**Steps:**

1. Click "Invite Member"
2. Enter email address
3. Select role:
   - **Viewer**: Can see deployments, logs (recommended for non-technical)
   - **Developer**: Can deploy, view logs
   - **Owner**: Full access (be careful!)
4. Click "Send Invite"

**Recommended roles:**

- Content managers: Viewer
- Developers: Developer
- Admin/Owner: Owner (limit to 1-2 people)

---

### 11.2 Share Access to Other Services

**Create a shared password manager entry (1Password, LastPass, etc.):**

**Share these credentials:**

- Vercel account login
- Razorpay dashboard login
- Database credentials (read-only if possible)
- Email service API keys
- Google Analytics access

**Do NOT share:**

- Production database write access (unless needed)
- API keys in plain text (use secure sharing)
- Razorpay key secrets (only share via secure method)

---

### 11.3 Document Access

**Create a team wiki or document:**

**Include:**

- Links to all dashboards
- Emergency contact procedures
- Deployment process
- Troubleshooting common issues

**Suggested location:**

- Notion, Confluence, or Google Docs
- Git repository: `/docs/team-access.md`

---

## 12. Final Checks (5 min)

### 12.1 Security Checklist

**Verify these are set correctly:**

- [ ] `NEXT_PUBLIC_DEBUG_MODE=false` (Production only)
- [ ] `NODE_ENV=production` (Production only)
- [ ] All secrets are unique (not default/example values)
- [ ] Database uses SSL (`?sslmode=require`)
- [ ] Razorpay uses LIVE keys for production
- [ ] No secrets committed to git (check `.gitignore`)

**Scan codebase for exposed secrets:**

```bash
# Check for accidental commits of secrets
git log -p | grep -i "api_key\|secret\|password"
```

**If you find exposed secrets:**

1. Rotate them immediately (generate new ones)
2. Update in Vercel environment variables
3. Contact provider if needed (e.g., Razorpay support)

---

### 12.2 SSL Certificate Verification

**Test SSL configuration:**

```bash
# Check SSL grade (should be A or A+)
# Visit: https://www.ssllabs.com/ssltest/analyze.html?d=cerebrumbiologyacademy.com
```

**Or use curl:**

```bash
curl -I https://cerebrumbiologyacademy.com
# Should return 200, not SSL error
```

**Verify:**

- [ ] HTTPS works (padlock icon in browser)
- [ ] HTTP redirects to HTTPS
- [ ] No mixed content warnings

---

### 12.3 DNS Propagation Check

**Verify DNS is fully propagated:**

**Visit:** [https://www.whatsmydns.net](https://www.whatsmydns.net)

1. Enter: `cerebrumbiologyacademy.com`
2. Select: `A` record type
3. Click "Search"

**What you should see:**

- Green checkmarks from multiple global locations
- All pointing to same IP (Vercel's)

**Repeat for:**

- `www.cerebrumbiologyacademy.com` (CNAME record)

---

### 12.4 Sitemap & Robots.txt

**Check these files exist:**

**Visit:** `https://cerebrumbiologyacademy.com/robots.txt`

**Expected:**

```
User-agent: *
Allow: /
Sitemap: https://cerebrumbiologyacademy.com/sitemap.xml
```

**Visit:** `https://cerebrumbiologyacademy.com/sitemap.xml`

**Expected:**

- Valid XML sitemap
- Lists all public pages

**If missing:**

- Add to `/public/robots.txt`
- Generate sitemap (use `next-sitemap` package or manual)

---

### 12.5 Google Search Console Setup

**Submit your site to Google:**

1. Go to: [https://search.google.com/search-console](https://search.google.com/search-console)
2. Click "Add Property"
3. Enter: `https://cerebrumbiologyacademy.com`
4. Verify ownership (use DNS TXT record or HTML file method)
5. Submit sitemap: `https://cerebrumbiologyacademy.com/sitemap.xml`

**Why:** Helps Google index your site faster

---

### 12.6 Meta Tags Verification

**Check homepage meta tags:**

**View page source** (Right-click → View Page Source):

**Verify these exist:**

```html
<title>Cerebrum Biology Academy - NEET Biology Coaching</title>
<meta name="description" content="..." />
<meta property="og:title" content="..." />
<meta property="og:description" content="..." />
<meta property="og:image" content="..." />
<meta name="twitter:card" content="..." />
```

**If missing or incorrect:**

- Update in your Next.js metadata configuration
- Redeploy

---

### 12.7 Favicon Check

**Verify favicon displays:**

1. Visit site in browser
2. Check tab shows correct icon
3. Test on mobile (add to home screen)

**If not showing:**

- Check `/public/favicon.ico` exists
- Clear browser cache
- Check console for 404 errors

---

### 12.8 Performance Final Check

**Run one more Lighthouse test:**

1. Incognito/Private window (to avoid extensions)
2. Open DevTools → Lighthouse
3. Run audit for:
   - Performance
   - Accessibility
   - Best Practices
   - SEO

**Target scores:**

- Performance: >80
- Accessibility: >90
- Best Practices: >90
- SEO: >90

**If below targets:**

- Review specific recommendations
- Common fixes:
  - Optimize images
  - Remove unused JavaScript
  - Add meta descriptions
  - Fix contrast issues

---

### 12.9 Create a Deployment Log

**Document this deployment:**

**Create file:** `/docs/deployment-log.md`

**Include:**

```markdown
# Deployment Log

## Initial Production Deployment

**Date:** 2025-10-29
**Deployed by:** [Your Name]
**Deployment URL:** https://cerebrumbiologyacademy.com
**Vercel Project:** cerebrum-biology-academy-website

### Environment Variables Configured:

- [x] Database
- [x] Authentication
- [x] Razorpay (LIVE mode)
- [x] Email (Resend)
- [x] WhatsApp
- [x] Google OAuth
- [x] Analytics

### Tests Performed:

- [x] Homepage loads
- [x] Authentication works
- [x] Payment flow (test + ₹1 live)
- [x] Email notifications
- [x] SSL certificate active
- [x] Domain resolves correctly

### Known Issues:

- None

### Next Steps:

- Monitor for 24 hours
- Set up team access
- Create marketing materials
```

---

### 12.10 Celebrate! 🎉

**You've successfully deployed to production!**

**What to do now:**

1. Share the live URL with your team
2. Post on social media (if ready)
3. Monitor for first 24 hours
4. Gather feedback
5. Plan next features

---

## Troubleshooting

### Common Issues and Solutions

---

### Issue: "Application Error" on Homepage

**Symptoms:**

- Site shows generic error page
- "Application Error" or "500 Internal Server Error"

**Solutions:**

1. **Check Vercel Function Logs:**
   - Deployments → Latest → View Function Logs
   - Look for specific error message

2. **Common causes:**
   - Missing environment variable
   - Database connection failed
   - Invalid API key

3. **Fix:**
   - Review all environment variables
   - Test database connection
   - Check Vercel logs for specifics

---

### Issue: Database Connection Failed

**Error:** `Can't reach database server` or `Connection timed out`

**Solutions:**

1. **Check connection string:**
   - Verify `DATABASE_URL` format
   - Must include `?sslmode=require`
   - No typos in password or host

2. **Test connection locally:**

```bash
# Set DATABASE_URL in terminal
export DATABASE_URL="your_production_url"

# Test Prisma connection
npx prisma db pull
```

3. **Check database status:**
   - Neon: Dashboard → Project (not paused?)
   - Supabase: Project Settings → Database (online?)

4. **Firewall/IP restrictions:**
   - Neon allows all IPs by default
   - Supabase: Check IP allowlist includes Vercel
   - Vercel doesn't have static IPs, must allow all or use connection pooling

---

### Issue: Razorpay Checkout Not Opening

**Symptoms:**

- Click payment button, nothing happens
- Console error: "Razorpay is not defined"

**Solutions:**

1. **Check Razorpay script loaded:**
   - View page source
   - Search for `checkout.razorpay.com`
   - Should be in `<script>` tag

2. **Verify key is public:**
   - `NEXT_PUBLIC_RAZORPAY_KEY_ID` must start with `NEXT_PUBLIC_`
   - Must be set for Production environment
   - Redeploy after adding

3. **Check browser console:**
   - Look for specific error
   - CSP (Content Security Policy) blocking?
   - Ad blocker interfering?

4. **Test with different browser/device:**
   - Try incognito mode
   - Disable extensions

---

### Issue: Emails Not Sending

**Symptoms:**

- Payment succeeds but no email received
- Function logs show no errors

**Solutions:**

1. **Check email provider dashboard:**
   - Resend: Dashboard → Logs
   - Look for sent emails and delivery status
   - Check for bounces or spam flags

2. **Verify environment variables:**
   - `RESEND_API_KEY` set correctly
   - `RESEND_FROM_EMAIL` domain is verified
   - Keys are for production, not test mode

3. **Check spam folder:**
   - Emails might be filtered as spam initially
   - Add sender to contacts

4. **DNS records for email:**
   - SPF, DKIM, DMARC configured
   - Domain verified in Resend

5. **Test email endpoint directly:**

```bash
curl -X POST https://cerebrumbiologyacademy.com/api/email/test \
  -H "Content-Type: application/json" \
  -d '{"to":"your-email@example.com"}'
```

---

### Issue: WhatsApp Messages Not Sending

**Symptoms:**

- Payment succeeds but no WhatsApp message
- Error in logs: "Invalid access token"

**Solutions:**

1. **Check access token expiry:**
   - User access tokens expire
   - Use System User Token for production
   - Regenerate if needed

2. **Verify phone number:**
   - Must be verified in Meta Business Manager
   - Format: +[country code][number] (e.g., +918826444334)
   - No spaces or dashes

3. **Message templates (for India):**
   - WhatsApp requires approved templates for business messages
   - Check Meta Business Manager → WhatsApp → Message Templates
   - Create and get approval for templates

4. **Test WhatsApp API:**

```bash
curl -X POST "https://graph.facebook.com/v21.0/YOUR_PHONE_NUMBER_ID/messages" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "messaging_product": "whatsapp",
    "to": "918826444334",
    "type": "text",
    "text": { "body": "Test message" }
  }'
```

---

### Issue: Domain Not Resolving

**Symptoms:**

- "This site can't be reached"
- "DNS_PROBE_FINISHED_NXDOMAIN"

**Solutions:**

1. **Check DNS propagation:**
   - Use [https://www.whatsmydns.net](https://www.whatsmydns.net)
   - May take up to 48 hours
   - Check if any locations resolved

2. **Verify DNS records:**
   - A record: `@` → `76.76.21.21`
   - CNAME record: `www` → `cname.vercel-dns.com`

3. **Check Vercel domain status:**
   - Settings → Domains
   - Look for error messages
   - "Invalid Configuration" or "Pending"

4. **Try different DNS:**
   - Temporarily use Google DNS (8.8.8.8, 8.8.4.4)
   - Flush DNS cache:

```bash
# macOS
sudo dscacheutil -flushcache

# Windows
ipconfig /flushdns

# Linux
sudo systemd-resolve --flush-caches
```

---

### Issue: Build Failing on Vercel

**Symptoms:**

- Deployment shows "Failed"
- Build logs show errors

**Solutions:**

1. **Check build logs:**
   - Read error message carefully
   - Note file and line number

2. **Test build locally:**

```bash
rm -rf .next node_modules
npm install
npm run build
```

3. **Common build errors:**

   **a) Module not found:**
   - Missing dependency in `package.json`
   - Run: `npm install [package]`
   - Commit and push

   **b) TypeScript errors:**
   - Ensure `next.config.mjs` has:
     ```javascript
     typescript: {
       ignoreBuildErrors: true
     }
     ```

   **c) Out of memory:**
   - Vercel has memory limits
   - Optimize build
   - Consider Vercel Pro plan

4. **Clear Vercel cache:**
   - Deployments → Latest deployment
   - Three dots (...) → Redeploy
   - Check "Clear cache" → Redeploy

---

### Issue: API Routes Returning 404

**Symptoms:**

- `/api/health` returns 404
- API endpoints not working

**Solutions:**

1. **Check file structure:**
   - API routes must be in `/app/api/` or `/pages/api/`
   - File must be named `route.ts` (App Router) or `[name].ts` (Pages Router)

2. **Verify export:**

```typescript
// app/api/health/route.ts
export async function GET() {
  return Response.json({ status: 'ok' })
}
```

3. **Check routing:**
   - Next.js App Router: `/app/api/health/route.ts` → `/api/health`
   - Pages Router: `/pages/api/health.ts` → `/api/health`

4. **Redeploy:**
   - Sometimes routes don't register
   - Force redeploy

---

### Issue: Environment Variables Not Working

**Symptoms:**

- `process.env.VARIABLE_NAME` is undefined
- "Environment variable not set" errors

**Solutions:**

1. **Check variable name:**
   - Must be exact, case-sensitive
   - `DATABASE_URL` ≠ `database_url`

2. **Public variables:**
   - Browser-accessible variables must start with `NEXT_PUBLIC_`
   - Example: `NEXT_PUBLIC_RAZORPAY_KEY_ID`
   - Server-only variables don't need prefix

3. **Environment selection:**
   - Verify variable is enabled for correct environment
   - Production deployment needs "Production" checked

4. **Redeploy after adding:**
   - Variables only apply to NEW deployments
   - Must redeploy after adding/changing

5. **Check in Vercel UI:**
   - Settings → Environment Variables
   - Verify variable exists and has value

---

### Issue: Payment Success But Order Not Created

**Symptoms:**

- Razorpay shows payment successful
- Database has no order record

**Solutions:**

1. **Check webhook configuration:**
   - Razorpay Dashboard → Webhooks
   - URL: `https://cerebrumbiologyacademy.com/api/webhooks/razorpay`
   - Active: ✓

2. **Test webhook endpoint:**

```bash
curl -X POST https://cerebrumbiologyacademy.com/api/webhooks/razorpay \
  -H "Content-Type: application/json" \
  -d '{"event": "payment.captured"}'
```

3. **Check Razorpay webhook logs:**
   - Webhooks → Click your webhook → Logs tab
   - Look for failed deliveries
   - Response codes (200 = success)

4. **Verify webhook secret:**
   - `RAZORPAY_WEBHOOK_SECRET` must match Razorpay
   - Must be for correct mode (Test/Live)

5. **Check Vercel function logs:**
   - Search for `/api/webhooks/razorpay`
   - Look for errors in webhook processing

---

### Issue: Slow Loading Times

**Symptoms:**

- Pages take >5 seconds to load
- Vercel shows high response times

**Solutions:**

1. **Check database location:**
   - Database should be in same region as Vercel functions
   - For India users: Mumbai (bom1)
   - High latency if database in US and function in India

2. **Optimize images:**
   - Use Next.js `<Image>` component
   - Enable image optimization
   - Convert to WebP/AVIF

3. **Review bundle size:**

```bash
npm run build

# Look for large chunks
# Optimize with code splitting
```

4. **Add caching:**
   - Review `next.config.mjs` headers
   - Add appropriate Cache-Control headers
   - Use Vercel Edge Caching

5. **Database connection pooling:**
   - Use Prisma connection pooling
   - Configure in `DATABASE_URL`

---

### Getting Help

**If stuck:**

1. **Vercel Support:**
   - Help → Support in dashboard
   - Community forum: [https://github.com/vercel/next.js/discussions](https://github.com/vercel/next.js/discussions)

2. **Provider-Specific:**
   - Razorpay: support@razorpay.com
   - Neon: [https://neon.tech/docs](https://neon.tech/docs)
   - Resend: help@resend.com

3. **Check documentation:**
   - `VERCEL_DEPLOYMENT_READY.md`
   - `VERCEL_ENVIRONMENT_SETUP.md`
   - Provider docs

---

## Quick Reference Commands

**Vercel CLI:**

```bash
# Deploy to production
vercel --prod

# Deploy to preview
vercel

# View logs
vercel logs [deployment-url]

# List environment variables
vercel env ls

# Add environment variable
vercel env add [name]

# Pull environment variables to local
vercel env pull .env.local
```

**Testing:**

```bash
# Test build locally
npm run build && npm run start

# Check health endpoints
curl https://cerebrumbiologyacademy.com/api/health
curl https://cerebrumbiologyacademy.com/api/health/database

# Test webhook
curl -X POST https://cerebrumbiologyacademy.com/api/webhooks/razorpay \
  -H "Content-Type: application/json" \
  -d '{"test": true}'
```

**Database:**

```bash
# Open Prisma Studio (local, connected to production DB)
npx prisma studio

# Generate Prisma Client
npx prisma generate

# Run migrations (careful in production!)
npx prisma migrate deploy
```

---

## Deployment Checklist Summary

**Use this as a quick reference before deploying:**

### Pre-Deployment

- [ ] Vercel account created
- [ ] All secrets prepared
- [ ] Database backup created
- [ ] Local build tested successfully
- [ ] Git repository connected to Vercel

### Vercel Configuration

- [ ] Project imported from GitHub
- [ ] Framework preset: Next.js
- [ ] Node.js version: 20.x
- [ ] Build command: `npm run build`
- [ ] Environment variables added (minimum: DB + Auth + Razorpay)

### Domain Setup

- [ ] Domain added in Vercel
- [ ] DNS A record configured
- [ ] DNS CNAME record configured (www)
- [ ] SSL certificate active
- [ ] Domain redirects configured
- [ ] Email DNS records added (if using)

### Testing

- [ ] Homepage loads
- [ ] API health checks pass
- [ ] Authentication works
- [ ] Payment flow tested (test mode)
- [ ] ₹1 payment tested (live mode)
- [ ] Email notifications working
- [ ] Mobile responsive
- [ ] Performance acceptable (Lighthouse >80)

### Go-Live

- [ ] Razorpay switched to LIVE mode
- [ ] Razorpay webhook configured for production
- [ ] Monitoring set up (UptimeRobot, Sentry, etc.)
- [ ] Team access granted
- [ ] Documentation updated
- [ ] Emergency contacts listed

### Post-Launch

- [ ] Monitor for first 24 hours
- [ ] Check error rates
- [ ] Review analytics
- [ ] Gather user feedback
- [ ] Plan next iteration

---

## Congratulations!

You've completed the Vercel deployment process. Your Cerebrum Biology Academy website is now live and accessible to students worldwide.

**Remember:**

- Monitor regularly (daily for first week)
- Keep dependencies updated
- Back up database regularly
- Rotate secrets periodically
- Document all changes

**Questions or issues?** Refer to the troubleshooting section or contact support.

---

**Document Version:** 1.0
**Created:** October 29, 2025
**For Project:** Cerebrum Biology Academy Website
**Next Review:** After first production deployment
