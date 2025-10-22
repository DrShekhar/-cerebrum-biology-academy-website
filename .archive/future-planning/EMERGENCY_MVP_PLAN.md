# 🚨 EMERGENCY REVENUE MVP - WEEK 1 PLAN

## Current Status

- ✅ Deleted 5 unnecessary feature branches
- ✅ Removed bloat: collaborative learning, A/B testing, heatmap, Redis clustering
- ✅ Created clean `emergency-revenue-mvp` branch from main
- ✅ Database already configured (Supabase PostgreSQL)

## CRITICAL: What's Missing (Blocks Revenue)

### 1. Razorpay Payment Integration ❌

**Current:** Placeholder keys in `.env.local`

```bash
RAZORPAY_KEY_ID=your-razorpay-key-id  # NEEDS REAL KEY
RAZORPAY_KEY_SECRET=your-razorpay-key-secret  # NEEDS REAL KEY
```

**Action Required (30 mins):**

1. Go to https://dashboard.razorpay.com
2. Settings → API Keys
3. Generate TEST keys (starts with `rzp_test_`)
4. Update `.env.local` with real keys

### 2. WhatsApp Business API ❌

**Current:** Not configured

```bash
WHATSAPP_ACCESS_TOKEN=your-whatsapp-access-token  # EMPTY
```

**Action Required (30 mins):**

- Option A: Get WhatsApp Business API token from Meta
- Option B (FASTER): Use simple form + email for now

### 3. Zoom Integration ❌

**Current:** Empty config

```bash
ZOOM_ACCOUNT_ID=  # EMPTY
```

**Action Required:** Not critical for MVP - use manual demo booking for now

## MONDAY (TODAY) - 2 Hours

### Task 1: Get Real Razorpay Keys (30 mins)

```bash
# 1. Login to Razorpay Dashboard
open https://dashboard.razorpay.com

# 2. Go to Settings → API Keys
# 3. Create TEST MODE keys

# 4. Update .env.local with REAL keys:
nano .env.local
# Replace:
# RAZORPAY_KEY_ID=rzp_test_XXXXXXXXXXXXXXXX
# RAZORPAY_KEY_SECRET=YYYYYYYYYYYYYYYY
```

### Task 2: Test Payment Flow (1 hour)

```bash
# 1. Start dev server
npm run dev

# 2. Go to enrollment page
open http://localhost:3001/enrollment

# 3. Test payment with Razorpay test card:
# Card: 4111 1111 1111 1111
# CVV: Any 3 digits
# Expiry: Any future date

# 4. Verify payment success
```

### Task 3: Fix Demo Booking (30 mins)

```bash
# Simple fallback: Form → Your email
# Create /api/demo-booking/route.ts with email notification
```

## TUESDAY - Fix Core Revenue Flow

### Morning: Payment Integration

- [ ] Verify Razorpay test payment works end-to-end
- [ ] Test error handling (failed payment, timeout)
- [ ] Confirm payment confirmation page works

### Afternoon: Lead Capture

- [ ] Test demo booking form
- [ ] Ensure email notifications work
- [ ] Create simple Google Sheets integration (backup)

## WEDNESDAY - Deploy & Test

### Morning: Deploy to Production

```bash
# 1. Commit changes
git add .
git commit -m "feat: Working payment & demo booking MVP"

# 2. Push to main
git push origin emergency-revenue-mvp
git checkout main
git merge emergency-revenue-mvp
git push origin main

# 3. Verify Vercel deployment
# Add production Razorpay keys to Vercel dashboard
```

### Afternoon: Production Testing

- [ ] Test payment flow in production
- [ ] Test demo booking in production
- [ ] Fix any production-only issues

## THURSDAY - First Ad Campaign

### Setup Google Ads (₹500/day)

```bash
# Campaign: "NEET Biology Coaching - Demo Booking"
# Budget: ₹500/day
# Target: Delhi, Kota, Hyderabad
# Keywords: "neet biology coaching", "neet repeater"
```

### Success Metrics:

- Get 1 demo booking
- Book 1 counseling call
- Close 1 enrollment = ₹75,000

## FRIDAY - First Revenue 🎉

### Goal: ₹75,000 in Bank

- [ ] Close 1 enrollment from demo
- [ ] Collect payment via Razorpay
- [ ] Verify money in bank account
- [ ] Celebrate! 🎉

## The Revenue Test Rule

Before coding ANYTHING, ask:
**"Does this directly lead to ₹75,000 from a student?"**

- ❌ NO → Don't build it
- ✅ YES → Build simplest version

## What NOT to Build This Week

- ❌ AI features
- ❌ Real-time collaboration
- ❌ Analytics dashboards
- ❌ Mobile app
- ❌ Advanced automation
- ❌ A/B testing
- ❌ Heatmaps
- ❌ Redis caching

## Your Actual MVP (6 Steps)

1. ✅ Landing page with course info (EXISTS)
2. ✅ "Book Demo" button → Form (EXISTS)
3. ⚠️ Form → Email notification (NEEDS FIX)
4. 👤 Demo → Student enrolls (MANUAL)
5. ⚠️ Razorpay payment (NEEDS REAL KEYS)
6. 💰 Money in bank (BLOCKED BY #3, #5)

## Next Steps RIGHT NOW

```bash
# 1. Get Razorpay test keys
open https://dashboard.razorpay.com

# 2. Update .env.local with real keys

# 3. Test payment flow
npm run dev
open http://localhost:3001/enrollment

# 4. If payment works → Deploy to production
# 5. If payment fails → Debug and fix

# 6. Run ₹500 Google Ads
# 7. Get first enrollment
# 8. Collect ₹75,000
```

## Contact for Issues

- **Phone:** +91 88264 44334
- **Focus:** Revenue flow (payment + booking)
- **Ignore:** Everything else

---

**Remember:** You're building a bicycle, not a spaceship. Ship it! 🚀
