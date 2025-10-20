# Task 04: Replace Placeholder Environment Variables Implementation Plan

## Current Status Analysis (As of 2025-10-01)

### 🔴 Critical Issues Identified

Found **19 placeholder environment variables** across multiple services that need real credentials:

**Analytics (3 placeholders):**
1. `NEXT_PUBLIC_GA_MEASUREMENT_ID=G-TEMP-DEV-CONFIG` ❌
2. `NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX` ❌ (duplicate)
3. `NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX` ❌

**Payment Gateway (3 placeholders):**
4. `RAZORPAY_KEY_ID=your-razorpay-key-id` ❌
5. `RAZORPAY_KEY_SECRET=your-razorpay-key-secret` ❌
6. `RAZORPAY_WEBHOOK_SECRET=your-razorpay-webhook-secret` ❌

**WhatsApp Business API (3 placeholders):**
7. `WHATSAPP_PHONE_NUMBER_ID=your-whatsapp-phone-number-id` ❌
8. `WHATSAPP_ACCESS_TOKEN=your-whatsapp-access-token` ❌
9. `WHATSAPP_BUSINESS_ACCOUNT_ID=your-business-account-id` ❌

**Zoom Integration (4 placeholders):**
10. `ZOOM_JWT_TOKEN=your-zoom-jwt-token-here` ❌
11. `ZOOM_USER_ID=your-zoom-user-id-or-email` ❌
12. `ZOOM_API_KEY=your-zoom-api-key` ❌
13. `ZOOM_API_SECRET=your-zoom-api-secret` ❌

**InstantDB (3 placeholders - NOT NEEDED):**
14. `NEXT_PUBLIC_INSTANT_APP_ID=your-instant-db-app-id` ❌
15. `INSTANT_APP_SECRET=your-instant-db-secret` ❌
16. `INSTANT_APP_ADMIN_TOKEN=dev-token-placeholder` ❌

**Database (1 placeholder):**
17. `SUPABASE_KEY=your-supabase-anon-key-here` ❌

**Email (2 commented placeholders):**
18. `# SMTP_USER=your-email@gmail.com` ❌
19. `# SMTP_PASS=your-app-password` ❌

**Social Media:**
20. `NEXT_PUBLIC_FB_PIXEL_ID=your-facebook-pixel-id` ❌

---

## Implementation Strategy

### **Priority Levels**

**P0 (Critical - Breaks Core Features):**
- Database: Supabase Key
- Analytics: Google Analytics (for tracking)

**P1 (High - Breaks Important Features):**
- Payment: Razorpay (for enrollments)
- WhatsApp: Business API (for lead nurturing)

**P2 (Medium - Nice to Have):**
- Zoom: Video integration
- Email: SMTP for notifications
- Facebook Pixel: Ads tracking

**P3 (Low - Can be removed):**
- InstantDB: Not used (using PostgreSQL instead)

---

## Step-by-Step Implementation

### Step 1: Remove InstantDB Variables (5 minutes)

**Action**: Delete unused InstantDB configuration

**Files to Update**:
- `.env.local`

**Changes**:
```bash
# BEFORE
NEXT_PUBLIC_INSTANT_APP_ID=your-instant-db-app-id
INSTANT_APP_SECRET=your-instant-db-secret
INSTANT_APP_ADMIN_TOKEN=dev-token-placeholder

# AFTER (delete these lines)
# InstantDB not used - removed (using PostgreSQL/Prisma instead)
```

**Rationale**: We're using PostgreSQL via Prisma, not InstantDB

---

### Step 2: Configure Google Analytics (10 minutes)

**Priority**: P0 (Critical)

**What You Need**:
- Google Analytics account (free)
- Create property for "Cerebrum Biology Academy"
- Get Measurement ID (format: `G-XXXXXXXXXX`)

**Setup Instructions**:
1. Go to: https://analytics.google.com/
2. Click: "Admin" → "Create Property"
3. Name: "Cerebrum Biology Academy"
4. Website URL: `https://cerebrumbiologyacademy.com`
5. Copy: Measurement ID (e.g., `G-ABC123XYZ`)

**Update `.env.local`**:
```bash
# BEFORE
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-TEMP-DEV-CONFIG
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX  # Remove duplicate
NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX

# AFTER
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-ABC123XYZ  # Your real measurement ID
# Remove duplicate and GTM if not using Google Tag Manager
```

**Verification**:
```bash
# Check if analytics is loading
curl http://localhost:3001 | grep "G-ABC123XYZ"
```

---

### Step 3: Configure Supabase Anon Key (5 minutes)

**Priority**: P0 (Critical)

**What You Need**:
- Supabase project already exists ✅ (from DATABASE_URL)
- Get anon/public key

**Setup Instructions**:
1. Go to: https://supabase.com/dashboard
2. Select: Your project
3. Go to: Settings → API
4. Copy: "anon/public" key (not the service_role key!)

**Update `.env.local`**:
```bash
# BEFORE
SUPABASE_KEY=your-supabase-anon-key-here

# AFTER
SUPABASE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...  # Your real anon key
```

**Important**: Don't confuse with `service_role` key (that's secret!)

---

### Step 4: Configure Razorpay (15 minutes)

**Priority**: P1 (High - Required for Payments)

**What You Need**:
- Razorpay account (already have? Check cerebrumbiologyacademy.com)
- Test Mode keys for development
- Live Mode keys for production

**Setup Instructions**:
1. Go to: https://dashboard.razorpay.com/
2. Go to: Settings → API Keys
3. **For Development**: Use "Test Mode" keys
4. **For Production**: Use "Live Mode" keys

**Update `.env.local`** (Development):
```bash
# BEFORE
RAZORPAY_KEY_ID=your-razorpay-key-id
RAZORPAY_KEY_SECRET=your-razorpay-key-secret
RAZORPAY_WEBHOOK_SECRET=your-razorpay-webhook-secret

# AFTER (Test Mode)
RAZORPAY_KEY_ID=rzp_test_ABC123XYZ
RAZORPAY_KEY_SECRET=test_secret_key_123
RAZORPAY_WEBHOOK_SECRET=whsec_test_123  # From Webhooks section
```

**Webhook Setup**:
1. Go to: Settings → Webhooks
2. Add webhook: `https://yourdomain.com/api/razorpay/webhook`
3. Copy webhook secret

**Testing**:
```bash
# Test Razorpay initialization
curl http://localhost:3001/api/payments/init \
  -H "Content-Type: application/json" \
  -d '{"amount": 100, "currency": "INR"}'
```

---

### Step 5: Configure WhatsApp Business API (20 minutes)

**Priority**: P1 (High - Lead Nurturing)

**What You Need**:
- Facebook Business Manager account
- WhatsApp Business account
- Phone number for WhatsApp Business

**Setup Instructions**:
1. Go to: https://business.facebook.com/
2. Go to: WhatsApp → Getting Started
3. Create WhatsApp Business account
4. Get permanent access token (not 24-hour token!)
5. Get Phone Number ID from Dashboard

**Update `.env.local`**:
```bash
# BEFORE
WHATSAPP_PHONE_NUMBER_ID=your-whatsapp-phone-number-id
WHATSAPP_ACCESS_TOKEN=your-whatsapp-access-token
WHATSAPP_BUSINESS_ACCOUNT_ID=your-business-account-id

# AFTER
WHATSAPP_PHONE_NUMBER_ID=123456789012345
WHATSAPP_ACCESS_TOKEN=EAAxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
WHATSAPP_BUSINESS_ACCOUNT_ID=987654321098765
```

**Important Notes**:
- Use **permanent token** (System User token), not temporary
- Verify phone number in WhatsApp Business Manager
- Add webhook URL for incoming messages

**Testing**:
```bash
# Test WhatsApp message send
curl -X POST http://localhost:3001/api/whatsapp/send-test \
  -H "Content-Type: application/json" \
  -d '{"to": "+919876543210", "message": "Test from API"}'
```

---

### Step 6: Configure Zoom Integration (15 minutes) - Optional

**Priority**: P2 (Medium)

**What You Need**:
- Zoom account (Pro or higher for API access)
- Create Server-to-Server OAuth app

**Setup Instructions**:
1. Go to: https://marketplace.zoom.us/
2. Click: "Develop" → "Build App"
3. Choose: "Server-to-Server OAuth"
4. Get: Account ID, Client ID, Client Secret

**Update `.env.local`**:
```bash
# BEFORE
ZOOM_JWT_TOKEN=your-zoom-jwt-token-here  # JWT is deprecated!
ZOOM_USER_ID=your-zoom-user-id-or-email
ZOOM_API_KEY=your-zoom-api-key
ZOOM_API_SECRET=your-zoom-api-secret

# AFTER (Server-to-Server OAuth)
ZOOM_ACCOUNT_ID=account_id_here
ZOOM_CLIENT_ID=client_id_here
ZOOM_CLIENT_SECRET=client_secret_here
# Remove JWT_TOKEN (deprecated)
```

**Note**: Zoom deprecated JWT in June 2023. Use Server-to-Server OAuth instead.

---

### Step 7: Configure Email SMTP (10 minutes) - Optional

**Priority**: P2 (Medium)

**What You Need**:
- Gmail account (or any SMTP provider)
- App-specific password (not regular password!)

**Setup Instructions (Gmail)**:
1. Go to: https://myaccount.google.com/security
2. Enable: 2-Step Verification (if not already)
3. Go to: App passwords
4. Generate: App password for "Mail"
5. Copy: 16-character password

**Update `.env.local`**:
```bash
# BEFORE
# SMTP_USER=your-email@gmail.com
# SMTP_PASS=your-app-password

# AFTER
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=cerebrumbiologyacademy@gmail.com
SMTP_PASS=abcd efgh ijkl mnop  # 16-character app password
SMTP_FROM=noreply@cerebrumbiologyacademy.com
```

**Alternative**: Use SendGrid/AWS SES for production

---

### Step 8: Configure Facebook Pixel (5 minutes) - Optional

**Priority**: P2 (Medium - Ads Tracking)

**What You Need**:
- Facebook Business Manager account
- Facebook Pixel created

**Setup Instructions**:
1. Go to: https://business.facebook.com/
2. Go to: Events Manager
3. Create: Pixel for "Cerebrum Biology Academy"
4. Copy: Pixel ID (15-16 digits)

**Update `.env.local`**:
```bash
# BEFORE
NEXT_PUBLIC_FB_PIXEL_ID=your-facebook-pixel-id

# AFTER
NEXT_PUBLIC_FB_PIXEL_ID=1234567890123456
```

---

## Security Best Practices

### ✅ DO:
1. **Use different keys for dev and production**
   ```bash
   # .env.local (development)
   RAZORPAY_KEY_ID=rzp_test_ABC123

   # .env.production (production)
   RAZORPAY_KEY_ID=rzp_live_XYZ789
   ```

2. **Never commit .env.local to git**
   ```bash
   # Already in .gitignore
   .env*.local
   ```

3. **Use environment-specific configs**
   ```typescript
   const razorpayKey = process.env.NODE_ENV === 'production'
     ? process.env.RAZORPAY_LIVE_KEY
     : process.env.RAZORPAY_TEST_KEY
   ```

4. **Rotate keys periodically**
   - Every 90 days for production
   - Immediately if exposed

### ❌ DON'T:
1. **Don't use same keys for dev and prod**
2. **Don't hardcode secrets in code**
3. **Don't expose secret keys to client**
   - Use `NEXT_PUBLIC_` only for non-sensitive data
4. **Don't share keys via Slack/WhatsApp**

---

## Environment Variable Structure

### **Recommended `.env.local` Structure**:

```bash
# ============================================
# DATABASE (PostgreSQL via Supabase)
# ============================================
DATABASE_URL="postgresql://postgres:password@db.xxxxx.supabase.co:5432/postgres"
SUPABASE_URL="https://xxxxx.supabase.co"
SUPABASE_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."

# ============================================
# ANALYTICS & TRACKING
# ============================================
NEXT_PUBLIC_GA_MEASUREMENT_ID="G-ABC123XYZ"
NEXT_PUBLIC_FB_PIXEL_ID="1234567890123456"

# ============================================
# PAYMENT GATEWAY (Razorpay)
# ============================================
# Test Mode (Development)
RAZORPAY_KEY_ID="rzp_test_ABC123XYZ"
RAZORPAY_KEY_SECRET="test_secret_key_123"
RAZORPAY_WEBHOOK_SECRET="whsec_test_123"

# Live Mode (Production - add to Vercel)
# RAZORPAY_KEY_ID="rzp_live_XYZ789"
# RAZORPAY_KEY_SECRET="live_secret_key_789"

# ============================================
# WHATSAPP BUSINESS API
# ============================================
WHATSAPP_PHONE_NUMBER_ID="123456789012345"
WHATSAPP_ACCESS_TOKEN="EAAxxxxxxxxxxxx"
WHATSAPP_BUSINESS_ACCOUNT_ID="987654321098765"
WHATSAPP_API_URL="https://graph.facebook.com/v17.0"

# ============================================
# ZOOM INTEGRATION (Optional)
# ============================================
ZOOM_ACCOUNT_ID="account_id_here"
ZOOM_CLIENT_ID="client_id_here"
ZOOM_CLIENT_SECRET="client_secret_here"

# ============================================
# EMAIL (SMTP)
# ============================================
SMTP_HOST="smtp.gmail.com"
SMTP_PORT="587"
SMTP_USER="cerebrumbiologyacademy@gmail.com"
SMTP_PASS="abcd efgh ijkl mnop"
SMTP_FROM="noreply@cerebrumbiologyacademy.com"

# ============================================
# REDIS (For caching - optional for now)
# ============================================
# REDIS_URL="redis://localhost:6379"

# ============================================
# APPLICATION
# ============================================
NEXT_PUBLIC_APP_URL="http://localhost:3001"
NODE_ENV="development"
```

---

## Testing Each Service

### **1. Google Analytics**
```typescript
// Check if GA is loaded
if (typeof window !== 'undefined' && window.gtag) {
  console.log('✅ Google Analytics loaded')
}
```

### **2. Razorpay**
```bash
# Test payment initialization
curl http://localhost:3001/api/payments/create-order \
  -X POST \
  -H "Content-Type: application/json" \
  -d '{"amount": 100, "currency": "INR"}'
```

### **3. WhatsApp**
```bash
# Test message send
curl http://localhost:3001/api/whatsapp/send \
  -X POST \
  -H "Content-Type: application/json" \
  -d '{"to": "+919876543210", "message": "Test"}'
```

### **4. Zoom**
```bash
# Test meeting creation
curl http://localhost:3001/api/zoom/create-meeting \
  -X POST \
  -H "Content-Type: application/json" \
  -d '{"topic": "Test Meeting", "duration": 30}'
```

---

## Deployment to Vercel

### **Add Environment Variables to Vercel**:

```bash
# Using Vercel CLI
vercel env add RAZORPAY_KEY_ID
vercel env add RAZORPAY_KEY_SECRET
vercel env add WHATSAPP_ACCESS_TOKEN
# ... add all variables

# Or via Vercel Dashboard:
# 1. Go to: https://vercel.com/your-project
# 2. Go to: Settings → Environment Variables
# 3. Add each variable with appropriate scope (Production/Preview/Development)
```

**Important**: Use **production keys** in Vercel, not test keys!

---

## Time Breakdown

| Step | Task | Est. Time | Priority |
|------|------|-----------|----------|
| 1 | Remove InstantDB variables | 5 min | P3 |
| 2 | Configure Google Analytics | 10 min | P0 |
| 3 | Configure Supabase Key | 5 min | P0 |
| 4 | Configure Razorpay | 15 min | P1 |
| 5 | Configure WhatsApp API | 20 min | P1 |
| 6 | Configure Zoom (optional) | 15 min | P2 |
| 7 | Configure SMTP (optional) | 10 min | P2 |
| 8 | Configure Facebook Pixel | 5 min | P2 |
| **TOTAL** | | **85 minutes** | |

**Minimum Viable:** Steps 1-5 (55 minutes) = P0 + P1 priorities

---

## Success Criteria

### Must Have (MVP)
- ✅ InstantDB variables removed
- ✅ Google Analytics tracking works
- ✅ Supabase connection working
- ✅ Razorpay test payments work
- ✅ WhatsApp test messages send

### Should Have
- ✅ Production Razorpay keys configured (in Vercel)
- ✅ Email notifications working
- ✅ Facebook Pixel tracking

### Nice to Have (Future)
- 🔄 Zoom integration for live classes
- 🔄 Advanced analytics setup

---

## Post-Implementation Checklist

- [ ] All P0 variables configured (Analytics, Database)
- [ ] All P1 variables configured (Razorpay, WhatsApp)
- [ ] Test payment flow end-to-end
- [ ] Test WhatsApp message sending
- [ ] Verify analytics tracking in GA dashboard
- [ ] Update `.env.example` with new structure
- [ ] Document keys location (password manager)
- [ ] Add production keys to Vercel
- [ ] Remove all placeholder values
- [ ] Restart dev server to load new variables

---

## Troubleshooting

### Issue: "Environment variable not found"
**Solution**: Restart Next.js dev server
```bash
npm run dev
```

### Issue: Razorpay "Invalid key" error
**Solution**: Check if using test key in development
```bash
echo $RAZORPAY_KEY_ID
# Should start with: rzp_test_
```

### Issue: WhatsApp "Invalid token" error
**Solution**: Generate permanent token (System User), not 24-hour token

### Issue: Google Analytics not tracking
**Solution**: Check if GA_MEASUREMENT_ID starts with "G-"
```bash
# Correct: G-ABC123XYZ
# Wrong: UA-123456789-1 (old Universal Analytics)
```

---

## Related Files

### Files to Modify
1. `.env.local` - Add all real credentials
2. `.env.example` - Update with new structure (without values)

### Files to Reference
1. CLAUDE.md - Has phone number and contact details
2. Razorpay dashboard - Payment keys
3. Supabase dashboard - Database keys
4. Facebook Business Manager - WhatsApp and Pixel

---

**Created**: 2025-10-01
**Status**: Ready for Implementation
**Assigned To**: User (Dr. Shekhar) + Claude Code
**Priority**: P1 (High - Required for MVP)
**Dependencies**: Access to service dashboards

---

## 🎯 Next Steps After This Task

Once environment variables are configured:
1. ✅ Test payment flow with real Razorpay
2. ✅ Test WhatsApp lead nurturing
3. ✅ Verify analytics tracking
4. Move to Task 5: Populate Question Bank (200+ questions)
