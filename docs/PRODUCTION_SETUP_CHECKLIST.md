# Production API Credentials Setup Checklist

**Last Updated:** October 23, 2025
**Status:** Week 1 - Critical Integrations
**Purpose:** Enable all production features with real API credentials

---

## ⚡ Quick Status Overview

| Service            | Status            | Priority    | Est. Time | Impact                      |
| ------------------ | ----------------- | ----------- | --------- | --------------------------- |
| Razorpay Payment   | ❌ Not Configured | 🔴 Critical | 2 hours   | Payment processing disabled |
| WhatsApp Business  | ❌ Not Configured | 🔴 Critical | 4-6 hours | Notifications in demo mode  |
| Google Analytics 4 | ❌ Not Configured | 🟠 High     | 1 hour    | No conversion tracking      |
| Zoom API           | ❌ Not Configured | 🟡 Medium   | 2 hours   | Demo classes in simulation  |
| Email Service      | ❌ Not Configured | 🟠 High     | 4 hours   | No automated emails         |
| Redis Cache        | ❌ Not Configured | 🟢 Low      | 2 hours   | Performance not optimized   |

**Overall Readiness:** 20% configured (secrets exist but placeholders)

---

## 1. RAZORPAY PAYMENT GATEWAY (Priority: CRITICAL)

### 📋 Current Status

- **Implementation:** ✅ Complete (511-line service class)
- **API Routes:** ✅ All endpoints working
- **Environment Variables:** ❌ Placeholder values

### 🔑 Required Environment Variables

```bash
# In Vercel Dashboard > Settings > Environment Variables
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_live_XXXXXXXXXXXXXX
RAZORPAY_KEY_SECRET=XXXXXXXXXXXXXXXXXXXXXXXX
RAZORPAY_WEBHOOK_SECRET=whsec_XXXXXXXXXXXXXXXX
```

### 📝 Setup Steps

#### Step 1: Get Production API Keys (30 min)

1. Log in to [Razorpay Dashboard](https://dashboard.razorpay.com)
2. Navigate to **Settings** → **API Keys**
3. Switch to **Live Mode** (top-right toggle)
4. Click **Generate Live API Keys**
5. Copy **Key ID** and **Key Secret**
6. **IMPORTANT:** Save Secret immediately (shown only once)

#### Step 2: Configure Webhook (15 min)

1. In Razorpay Dashboard → **Settings** → **Webhooks**
2. Click **Create New Webhook**
3. Set URL: `https://cerebrumbiologyacademy.com/api/webhooks/payments`
4. Select Events:
   - ✅ payment.authorized
   - ✅ payment.captured
   - ✅ payment.failed
   - ✅ order.paid
   - ✅ refund.created
5. Set **Active Webhook** secret
6. Copy **Webhook Secret** (starts with `whsec_`)

#### Step 3: Add to Vercel (10 min)

1. Go to [Vercel Dashboard](https://vercel.com/drshekhar/cerebrum-biology-academy-website)
2. Navigate to **Settings** → **Environment Variables**
3. Add 3 variables:
   ```
   NEXT_PUBLIC_RAZORPAY_KEY_ID = rzp_live_...
   RAZORPAY_KEY_SECRET = ...
   RAZORPAY_WEBHOOK_SECRET = whsec_...
   ```
4. Select **Production** environment
5. Click **Save**

#### Step 4: Verify Setup (30 min)

1. Redeploy the site (Vercel auto-deploys on git push)
2. Test with ₹1 payment:
   - Go to https://cerebrumbiologyacademy.com/enrollment
   - Fill enrollment form
   - Select a course
   - Process ₹1 payment
3. Verify in Razorpay Dashboard → **Transactions**
4. Check webhook delivery in **Settings** → **Webhooks** → **Logs**
5. Confirm database enrollment record created

### ⚠️ Production Checklist

- [ ] KYC completed (required for live mode)
- [ ] Business bank account linked
- [ ] Settlement account verified
- [ ] Test with ₹1 payment
- [ ] Verify webhook signature validation
- [ ] Check database enrollment creation
- [ ] Confirm WhatsApp/Email confirmation sent

### 🔒 Security Notes

- Key Secret is shown only once - save securely
- Never commit secrets to Git
- Use webhook secret to verify authenticity
- Enable 2FA on Razorpay account

---

## 2. WHATSAPP BUSINESS API (Priority: CRITICAL)

### 📋 Current Status

- **Implementation:** ✅ Complete (10 service files, 12+ templates)
- **API Routes:** ✅ All endpoints working
- **Environment Variables:** ❌ Placeholder values

### 🔑 Required Environment Variables

```bash
WHATSAPP_PHONE_NUMBER_ID=123456789012345
WHATSAPP_ACCESS_TOKEN=EAAxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
WHATSAPP_BUSINESS_ACCOUNT_ID=123456789012345
WHATSAPP_VERIFY_TOKEN=your_custom_verify_token_here
```

### 📝 Setup Steps

#### Step 1: Facebook Business Account Setup (1 hour)

1. Go to [Meta for Developers](https://developers.facebook.com)
2. Create **Meta Business Account** (if not exists)
3. Complete business verification:
   - Business name: Cerebrum Biology Academy
   - Business email: admin@cerebrumbiologyacademy.com
   - Business phone: +91 88264 44334
   - Business address
   - Tax ID/GST number

#### Step 2: Create WhatsApp Business App (30 min)

1. In Meta for Developers → **My Apps**
2. Click **Create App**
3. Select **Business** type
4. App Name: "Cerebrum Biology Academy WhatsApp"
5. Add **WhatsApp** product
6. Link to your Meta Business Account

#### Step 3: Get Phone Number & Access Token (1-2 hours)

1. In WhatsApp settings → **Phone Numbers**
2. Options:
   - **Option A:** Use Meta test number (for testing, expires in 72 hours)
   - **Option B:** Add your own phone number (+91 88264 44334)
     - Verify ownership via SMS/call
     - 2-factor authentication required
3. Copy **Phone Number ID**
4. In **API Setup**:
   - Click **Generate Access Token**
   - Select **Permanent Token** (System User)
   - Set permissions: `whatsapp_business_messaging`
   - Copy token (starts with `EAA`)

#### Step 4: Set Up Webhook (30 min)

1. In WhatsApp settings → **Configuration**
2. Click **Edit** on Webhook
3. Callback URL: `https://cerebrumbiologyacademy.com/api/whatsapp/enhanced-webhook`
4. Verify Token: Create random string (e.g., `cba_whatsapp_verify_2025`)
5. Subscribe to fields:
   - ✅ messages
   - ✅ message_status
   - ✅ message_reactions
6. Click **Verify and Save**

#### Step 5: Message Templates (1 hour)

1. In WhatsApp → **Message Templates**
2. Create required templates:
   - **Demo Booking Confirmation**
   - **Enrollment Confirmation**
   - **Payment Receipt**
   - **Payment Reminder**
   - **Study Reminder**
3. Wait for Meta approval (1-24 hours)

#### Step 6: Add to Vercel (10 min)

```bash
WHATSAPP_PHONE_NUMBER_ID=123456789012345
WHATSAPP_ACCESS_TOKEN=EAAxxxxxxxxx...
WHATSAPP_BUSINESS_ACCOUNT_ID=123456789012345
WHATSAPP_VERIFY_TOKEN=cba_whatsapp_verify_2025
```

#### Step 7: Test Integration (30 min)

1. Send test message via API:
   ```bash
   curl https://cerebrumbiologyacademy.com/api/whatsapp/send \
     -H "Content-Type: application/json" \
     -d '{"phone": "+919876543210", "template": "demo_booking_confirmation"}'
   ```
2. Verify message received on test phone
3. Check webhook logs in Meta dashboard
4. Test all templates

### ⚠️ Production Checklist

- [ ] Business verification completed
- [ ] Phone number verified and added
- [ ] Permanent access token generated
- [ ] Webhook configured and verified
- [ ] Message templates approved by Meta
- [ ] Test message sent successfully
- [ ] Webhook receiving delivery status
- [ ] Rate limits understood (80k messages/day tier 2)

### 🔒 Security Notes

- Use **System User** for permanent access token
- Enable 2FA on Meta Business Account
- Rotate access token every 90 days
- Monitor rate limits (80k msgs/day)
- Never share access token

---

## 3. GOOGLE ANALYTICS 4 (Priority: HIGH)

### 📋 Current Status

- **Implementation:** ✅ Complete (tracking functions ready)
- **Tracking Code:** ✅ Deployed
- **Measurement ID:** ❌ Placeholder (`G-TEMP-DEV-CONFIG`)

### 🔑 Required Environment Variables

```bash
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

### 📝 Setup Steps

#### Step 1: Create GA4 Property (20 min)

1. Go to [Google Analytics](https://analytics.google.com)
2. Click **Admin** (bottom-left)
3. Create **Account**:
   - Name: "Cerebrum Biology Academy"
   - Data sharing settings: Enable all
4. Create **Property**:
   - Name: "Cerebrum Biology Academy Website"
   - Timezone: Asia/Kolkata (GMT+5:30)
   - Currency: Indian Rupee (₹)
5. Select Industry: Education
6. Business size: Small (1-10 employees)

#### Step 2: Set Up Data Stream (10 min)

1. In Property settings → **Data Streams**
2. Click **Add stream** → **Web**
3. Website URL: `https://cerebrumbiologyacademy.com`
4. Stream name: "Production Website"
5. **Enhanced measurement:** Enable all:
   - ✅ Page views
   - ✅ Scrolls
   - ✅ Outbound clicks
   - ✅ Site search
   - ✅ Form interactions
   - ✅ Video engagement

#### Step 3: Get Measurement ID (5 min)

1. After creating data stream
2. Copy **Measurement ID** (format: `G-XXXXXXXXXX`)
3. Click **View tag instructions** → **Install manually**
4. Verify gtag.js code matches our implementation

#### Step 4: Configure Conversions (15 min)

1. In GA4 → **Configure** → **Events**
2. Create custom events (already tracked in code):
   - `demo_booking_submitted`
   - `enrollment_completed`
   - `payment_successful`
   - `whatsapp_lead`
3. Mark as **Conversion** events
4. Set conversion value:
   - Demo booking: ₹0 (lead)
   - Enrollment: ₹75,000 (average)

#### Step 5: Link to Google Ads (10 min)

1. In GA4 → **Admin** → **Google Ads Links**
2. Click **Link**
3. Select your Google Ads account (create if doesn't exist)
4. Enable **Personalized advertising**
5. Enable **Auto-tagging**

#### Step 6: Add to Vercel (5 min)

```bash
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

#### Step 7: Verify Tracking (10 min)

1. In GA4 → **Reports** → **Realtime**
2. Visit https://cerebrumbiologyacademy.com
3. Verify event appears in realtime report
4. Test conversion events:
   - Submit demo booking form
   - Complete enrollment flow
5. Check **DebugView** for detailed event data

### ⚠️ Production Checklist

- [ ] GA4 property created
- [ ] Data stream configured
- [ ] Measurement ID updated in Vercel
- [ ] Realtime tracking verified
- [ ] Conversion events configured
- [ ] Google Ads linked
- [ ] Audience segments created (NEET students, parents)

### 📊 Recommended Dimensions & Metrics

- **Custom Dimensions:**
  - User Class (11th/12th/Dropper)
  - City (Delhi, Kota, etc.)
  - Course Interest
- **Custom Metrics:**
  - Demo to Enrollment Conversion Rate
  - Average Payment Value
  - WhatsApp Response Rate

---

## 4. ZOOM API (Priority: MEDIUM)

### 📋 Current Status

- **Implementation:** ✅ Complete (Zoom service class)
- **API Integration:** ❌ Simulation mode (using deprecated JWT)
- **Environment Variables:** ❌ Empty placeholders

### 🔑 Required Environment Variables

```bash
ZOOM_ACCOUNT_ID=xxxxxxxxxxxx
ZOOM_CLIENT_ID=xxxxxxxxxxxx
ZOOM_CLIENT_SECRET=xxxxxxxxxxxx
```

### 📝 Setup Steps

#### Step 1: Create Server-to-Server OAuth App (20 min)

1. Go to [Zoom App Marketplace](https://marketplace.zoom.us)
2. Click **Develop** → **Build App**
3. Select **Server-to-Server OAuth**
4. App Name: "Cerebrum Biology Academy Demo Classes"
5. Company Name: Cerebrum Biology Academy
6. Developer Contact: admin@cerebrumbiologyacademy.com

#### Step 2: Get Credentials (10 min)

1. In app settings → **App Credentials**
2. Copy:
   - **Account ID**
   - **Client ID**
   - **Client Secret**
3. **IMPORTANT:** Save Client Secret (shown only once)

#### Step 3: Add Scopes (5 min)

1. In app settings → **Scopes**
2. Add required scopes:
   - ✅ `meeting:write:admin` (Create meetings)
   - ✅ `meeting:read:admin` (Read meeting details)
   - ✅ `user:read:admin` (Read user info)
   - ✅ `recording:write:admin` (Manage recordings)

#### Step 4: Activate App (5 min)

1. Complete all required fields
2. Click **Activate** your app
3. App will be activated for your account

#### Step 5: Add to Vercel (5 min)

```bash
ZOOM_ACCOUNT_ID=xxxxxxxxxxxx
ZOOM_CLIENT_ID=xxxxxxxxxxxx
ZOOM_CLIENT_SECRET=xxxxxxxxxxxx
```

#### Step 6: Update Code (20 min)

Replace `simulateZoomAPICall()` in `/src/lib/zoom/zoomService.ts`:

```typescript
// Remove simulation, use real API
async function createMeeting(params: ZoomMeetingParams) {
  const accessToken = await getAccessToken()
  const response = await fetch('https://api.zoom.us/v2/users/me/meetings', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(params),
  })
  return response.json()
}
```

#### Step 7: Test Integration (20 min)

1. Trigger demo booking
2. Verify real Zoom meeting created
3. Check meeting appears in Zoom account
4. Test join link
5. Verify recording auto-starts

### ⚠️ Production Checklist

- [ ] Server-to-Server OAuth app created
- [ ] Credentials added to Vercel
- [ ] Scopes configured correctly
- [ ] Simulation code replaced with real API
- [ ] Test meeting created successfully
- [ ] Join link working
- [ ] Host can start meeting
- [ ] Recording enabled
- [ ] Waiting room working

### 🔒 Security Notes

- JWT tokens deprecated as of June 2023
- Use Server-to-Server OAuth only
- Client Secret shown only once
- Rotate credentials every 6 months
- Monitor API rate limits

---

## 5. EMAIL SERVICE - SENDGRID (Priority: HIGH)

### 📋 Current Status

- **Implementation:** ❌ Not implemented
- **SMTP Config:** ❌ Not configured
- **Templates:** ❌ Not created

### 🔑 Required Environment Variables

```bash
SMTP_HOST=smtp.sendgrid.net
SMTP_PORT=587
SMTP_USER=apikey
SMTP_PASS=SG.xxxxxxxxxxxxxxxxxxxx
SMTP_FROM_EMAIL=noreply@cerebrumbiologyacademy.com
SMTP_FROM_NAME=Cerebrum Biology Academy
```

### 📝 Setup Steps

#### Step 1: Create SendGrid Account (15 min)

1. Go to [SendGrid](https://signup.sendgrid.com)
2. Sign up with email: admin@cerebrumbiologyacademy.com
3. Choose **Free Plan** (100 emails/day)
4. Complete email verification
5. Set up **Sender Authentication**

#### Step 2: Verify Domain (30 min)

1. In SendGrid → **Settings** → **Sender Authentication**
2. Click **Authenticate Your Domain**
3. Select **Hostinger** (your domain provider)
4. Domain: `cerebrumbiologyacademy.com`
5. Add DNS records to Hostinger:
   - CNAME record: `em1234.cerebrumbiologyacademy.com`
   - CNAME record: `s1._domainkey.cerebrumbiologyacademy.com`
   - CNAME record: `s2._domainkey.cerebrumbiologyacademy.com`
6. Wait for verification (5-60 minutes)

#### Step 3: Create API Key (5 min)

1. In SendGrid → **Settings** → **API Keys**
2. Click **Create API Key**
3. Name: "Cerebrum Biology Academy Production"
4. Permissions: **Full Access**
5. Copy API Key (starts with `SG.`)
6. **IMPORTANT:** Save key (shown only once)

#### Step 4: Create Email Templates (1-2 hours)

1. In SendGrid → **Email API** → **Dynamic Templates**
2. Create templates:

**Template 1: Enrollment Confirmation**

```html
Subject: Welcome to Cerebrum Biology Academy! 🎉 Hi {{name}}, Congratulations on joining Cerebrum
Biology Academy! **Your Enrollment Details:** - Course: {{courseName}} - Start Date: {{startDate}} -
Batch Timing: {{batchTiming}} **Next Steps:** 1. Login to your student portal:
https://cerebrumbiologyacademy.com/dashboard 2. Access study materials 3. Join WhatsApp group for
updates Payment Receipt: [Attached] Best regards, Dr. Shekhar Cerebrum Biology Academy +91 88264
44334
```

**Template 2: Demo Booking Confirmation**
**Template 3: Payment Receipt**
**Template 4: Demo Class Reminder (24hr before)**

3. Copy template IDs

#### Step 5: Install Nodemailer (15 min)

```bash
npm install nodemailer @sendgrid/mail
```

Create `/src/lib/email/emailService.ts`:

```typescript
import sgMail from '@sendgrid/mail'

sgMail.setApiKey(process.env.SMTP_PASS!)

export async function sendEnrollmentConfirmation(email: string, data: any) {
  await sgMail.send({
    to: email,
    from: {
      email: process.env.SMTP_FROM_EMAIL!,
      name: process.env.SMTP_FROM_NAME!,
    },
    templateId: 'd-xxxxxx', // SendGrid template ID
    dynamicTemplateData: data,
  })
}
```

#### Step 6: Add to Vercel (5 min)

```bash
SMTP_HOST=smtp.sendgrid.net
SMTP_PORT=587
SMTP_USER=apikey
SMTP_PASS=SG.xxxxxxxxxxxxxxxxxxxx
SMTP_FROM_EMAIL=noreply@cerebrumbiologyacademy.com
SMTP_FROM_NAME=Cerebrum Biology Academy
```

#### Step 7: Test Email Sending (20 min)

1. Trigger enrollment
2. Check email received
3. Verify formatting
4. Test all templates
5. Check spam score (should be <5)

### ⚠️ Production Checklist

- [ ] SendGrid account created
- [ ] Domain verified (DKIM/SPF)
- [ ] API key generated
- [ ] Email templates created
- [ ] Nodemailer/SendGrid SDK installed
- [ ] Environment variables configured
- [ ] Test emails sent successfully
- [ ] Deliverability >95%
- [ ] Emails not going to spam

### 📧 Recommended Templates

1. Enrollment Confirmation
2. Demo Booking Confirmation
3. Payment Receipt
4. Demo Class Reminder (24hr before)
5. Welcome Email (Day 1)
6. Study Tips Email (Weekly)
7. Payment Due Reminder
8. Course Completion Certificate

---

## 6. REDIS CACHE - UPSTASH (Priority: LOW)

### 📋 Current Status

- **Implementation:** ✅ Complete (graceful degradation working)
- **Connection:** ❌ Not configured (using mock client)
- **Environment Variables:** ❌ Empty (`REDIS_URL`, `REDIS_ENABLED=false`)

### 🔑 Required Environment Variables

```bash
REDIS_URL=redis://default:xxxxx@xxxxxx.upstash.io:6379
REDIS_ENABLED=true
```

### 📝 Setup Steps

#### Step 1: Create Upstash Account (10 min)

1. Go to [Upstash](https://console.upstash.com/login)
2. Sign up with GitHub or email
3. Verify email

#### Step 2: Create Redis Database (15 min)

1. In Upstash Console → **Create Database**
2. Name: "cerebrum-biology-academy-cache"
3. Type: **Regional** (cheaper)
4. Region: **Asia Pacific (Mumbai)** (closest to Vercel bom1)
5. Click **Create**

#### Step 3: Get Connection URL (5 min)

1. In database details page
2. Copy **REST URL** or **Redis URL**
3. Format: `redis://default:xxxxx@xxxxx.upstash.io:6379`

#### Step 4: Add to Vercel (5 min)

```bash
REDIS_URL=redis://default:xxxxx@xxxxx.upstash.io:6379
REDIS_ENABLED=true
```

#### Step 5: Verify Connection (10 min)

1. Redeploy site
2. Check `/api/health` endpoint
3. Verify Redis connection in logs
4. Test cache hit/miss

### ⚠️ Production Checklist

- [ ] Upstash account created
- [ ] Database created in Mumbai region
- [ ] Connection URL configured
- [ ] REDIS_ENABLED=true
- [ ] Health check passing
- [ ] Cache hit rate >30%

### 📊 Cache Strategy

- Session data: 15 minutes TTL
- API responses: 5 minutes TTL
- Static content: 1 hour TTL
- User profiles: 30 minutes TTL

---

## 7. GOOGLE ADS (Priority: MEDIUM)

### 📋 Current Status

- **Conversion Tracking:** ❌ Placeholder conversion ID
- **Budget:** Not active (₹500/day planned)

### 🔑 Required Environment Variables

```bash
NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_ID=AW-XXXXXXXXX
NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_LABEL_DEMO=xxxxxxxxx
NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_LABEL_ENROLLMENT=xxxxxxxxx
```

### 📝 Setup Steps

#### Step 1: Create Google Ads Account (20 min)

1. Go to [Google Ads](https://ads.google.com)
2. Sign in with Google account
3. Set up billing (credit card/bank account)
4. Billing country: India
5. Currency: INR (₹)

#### Step 2: Create Conversion Actions (30 min)

1. In Google Ads → **Tools** → **Conversions**
2. Click **+ New Conversion Action**
3. Create 2 conversions:

**Conversion 1: Demo Booking**

- Category: Lead
- Value: Use specific value (₹0)
- Count: Every conversion
- Conversion window: 30 days

**Conversion 2: Enrollment**

- Category: Purchase
- Value: Use different values for each conversion
- Count: One per click
- Conversion window: 90 days

3. Get conversion IDs and labels

#### Step 3: Set Up Campaigns (1-2 hours)

**Campaign 1: NEET Biology Coaching (Search)**

- Goal: Demo bookings
- Budget: ₹100/day (test), scale to ₹300/day
- Bid strategy: Maximize conversions
- Keywords:
  - NEET biology coaching in Delhi
  - Best biology teacher for NEET
  - NEET biology crash course
  - Biology tuition for class 12 NEET

**Campaign 2: Dropper Course (Search)**

- Goal: Enrollments
- Budget: ₹200/day
- Keywords:
  - NEET dropper course biology
  - Biology coaching for repeaters
  - NEET 2nd attempt biology

#### Step 4: Add to Vercel (5 min)

```bash
NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_ID=AW-123456789
NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_LABEL_DEMO=abc123
NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_LABEL_ENROLLMENT=def456
```

### ⚠️ Production Checklist

- [ ] Google Ads account created
- [ ] Billing configured
- [ ] Conversion tracking set up
- [ ] Campaigns created (start with ₹100/day)
- [ ] Conversion tracking verified
- [ ] First conversion recorded
- [ ] Cost per demo booking <₹500
- [ ] Cost per enrollment <₹2,000

---

## 🚀 DEPLOYMENT SEQUENCE

### Week 1 (Critical): Authentication & Payment

**Day 1-2:**

- [x] Fix authentication bug (✅ COMPLETED)
- [ ] Get Razorpay production keys
- [ ] Configure Razorpay in Vercel
- [ ] Test ₹1 payment end-to-end

**Day 3-4:**

- [ ] Set up WhatsApp Business API
- [ ] Get permanent access token
- [ ] Configure webhook
- [ ] Test message delivery

**Day 5:**

- [ ] Deploy and verify all fixes
- [ ] Monitor error logs
- [ ] Document any issues

### Week 2 (High Priority): Analytics & Email

**Day 8-9:**

- [ ] Create GA4 property
- [ ] Configure conversions
- [ ] Link Google Ads
- [ ] Verify tracking

**Day 10-11:**

- [ ] Set up SendGrid
- [ ] Create email templates
- [ ] Test email delivery
- [ ] Monitor deliverability

### Week 3 (Medium Priority): Zoom & Optimization

**Day 15-16:**

- [ ] Create Zoom S2S OAuth app
- [ ] Replace simulation code
- [ ] Test real meeting creation

**Day 17:**

- [ ] Set up Redis cache
- [ ] Monitor performance
- [ ] Optimize cache strategy

### Week 4 (Low Priority): Ads & Final Testing

**Day 22-23:**

- [ ] Create Google Ads campaigns
- [ ] Start with ₹100/day budget
- [ ] Monitor conversions

**Day 24-28:**

- [ ] Scale successful campaigns
- [ ] Comprehensive testing
- [ ] Performance optimization

---

## ⚠️ SECURITY BEST PRACTICES

### Credential Management

- [ ] Never commit secrets to Git
- [ ] Use Vercel environment variables only
- [ ] Rotate credentials every 90 days
- [ ] Use System Users for permanent tokens
- [ ] Enable 2FA on all accounts

### Monitoring

- [ ] Set up error alerts (Sentry)
- [ ] Monitor API rate limits
- [ ] Check webhook delivery status
- [ ] Review access logs weekly

### Compliance

- [ ] GDPR-ready (data encryption)
- [ ] PCI DSS compliant (via Razorpay)
- [ ] WhatsApp Business policies followed
- [ ] Privacy policy updated
- [ ] Terms of service current

---

## 📞 SUPPORT CONTACTS

| Service    | Support              | Emergency             |
| ---------- | -------------------- | --------------------- |
| Razorpay   | support@razorpay.com | +91-80-6890-7000      |
| WhatsApp   | wa-support@fb.com    | Meta Business Support |
| SendGrid   | support@sendgrid.com | SendGrid Status Page  |
| Zoom       | support@zoom.us      | Zoom Trust Center     |
| Vercel     | support@vercel.com   | Vercel Status         |
| Google Ads | Google Ads Support   | Account Manager       |

---

**Next Review:** After Week 1 deployment (October 30, 2025)
**Maintained By:** Development Team
