# Phase 1: Revenue Restoration - Critical Fixes

## Status: IN PROGRESS

### 1. Razorpay Payment Gateway Configuration ⚠️ REQUIRES USER ACTION

**Status:** Awaiting Production Credentials

**Current Issue:**

- Environment variables using placeholder values
- Payment flow will fail without real Razorpay API keys

**Required Environment Variables:**

```env
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_test_XXXXXXXXXXXX  # or rzp_live_XXXXXXXXXXXX for production
RAZORPAY_KEY_SECRET=your_actual_secret_key
RAZORPAY_WEBHOOK_SECRET=your_webhook_secret
```

**Steps to Complete:**

1. **Get Razorpay Credentials:**
   - Login to [Razorpay Dashboard](https://dashboard.razorpay.com)
   - Go to Settings → API Keys
   - Generate Test Mode keys (for testing) or Live Mode keys (for production)
   - Copy Key ID and Key Secret

2. **Update Vercel Environment Variables:**

   ```bash
   # Option 1: Via Vercel Dashboard
   # Go to: Project Settings → Environment Variables
   # Add the three variables above

   # Option 2: Via Vercel CLI
   vercel env add NEXT_PUBLIC_RAZORPAY_KEY_ID
   vercel env add RAZORPAY_KEY_SECRET
   vercel env add RAZORPAY_WEBHOOK_SECRET
   ```

3. **Set Webhook URL in Razorpay:**
   - Go to Razorpay Dashboard → Webhooks
   - Add webhook URL: `https://cerebrumbiologyacademy.com/api/webhooks/payments`
   - Select events: `payment.captured`, `payment.failed`, `order.paid`
   - Copy webhook secret to `RAZORPAY_WEBHOOK_SECRET`

4. **Redeploy:**
   ```bash
   vercel --prod
   ```

**Files Configured:**

- ✅ `src/lib/payments/razorpay.ts` - Payment service ready
- ✅ `src/app/api/payments/create-order/route.ts` - Order creation API ready
- ✅ `src/app/api/payments/verify/route.ts` - Payment verification ready
- ✅ `src/app/api/webhooks/payments/route.ts` - Webhook handler ready
- ✅ `src/components/payment/RazorpayPayment.tsx` - Frontend integration ready

---

### 2. Database Connectivity Issues 🔧 IN PROGRESS

**Status:** Investigating

**Current Issues:**

- InstantDB environment variables missing
- Some pages using mock data instead of real database

**Files to Check:**

- `NEXT_PUBLIC_INSTANT_APP_ID`
- `INSTANT_APP_ADMIN_TOKEN`

---

### 3. Zoom Integration Mock API 🔧 TODO

**Status:** Pending

**Current Issue:**

- Using mock Zoom API instead of real integration

**Required:**

- Real Zoom OAuth credentials
- Zoom SDK integration

---

### 4. 404 Error Handling 🔧 TODO

**Status:** Pending

**Current Issue:**

- 404 pages returning 200 status codes

**Fix Required:**

- Update `src/app/not-found.tsx` to return proper 404 status

---

### 5. Authentication Guards 🔧 TODO

**Status:** Pending

**Current Issue:**

- Critical pages accessible without authentication

**Fix Required:**

- Add middleware to protect routes
- Implement auth guards on sensitive pages

---

## Quick Command Reference

```bash
# Check current environment variables
cat .env.local

# Test payment flow locally
npm run dev
# Navigate to: http://localhost:3000/purchase/course-1

# Build for production
npm run build

# Deploy to production
vercel --prod

# Check deployment logs
vercel logs cerebrumbiologyacademy.com --prod
```

---

## Next Steps

1. **YOU**: Get Razorpay credentials and update environment variables
2. **ME**: Fix database connectivity issues
3. **ME**: Fix 404 error handling
4. **ME**: Add authentication guards
5. **YOU/ME**: Replace Zoom mock with real integration
6. **ME**: Build and deploy all fixes

---

## Success Criteria

- ✅ Users can make successful payments
- ✅ Database operations work without mock data
- ✅ 404 errors return proper status codes
- ✅ Protected routes require authentication
- ✅ All Phase 1 fixes deployed to production

---

**Last Updated:** 2025-11-06
**Next Review:** After Razorpay credentials added
