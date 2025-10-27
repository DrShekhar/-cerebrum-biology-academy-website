# Razorpay Payment Integration - Complete Setup Guide

## Quick Start Checklist

- [ ] Create Razorpay account
- [ ] Complete KYC verification (1-2 business days)
- [ ] Get API credentials (Test & Live)
- [ ] Update environment variables
- [ ] Test payment flow with ₹1
- [ ] Switch to live mode for production

---

## Step 1: Create Razorpay Account (15 minutes)

### 1.1 Sign Up

1. Go to: https://dashboard.razorpay.com/signup
2. Use your business email: `info@cerebrumbiologyacademy.com`
3. Enter business phone: `+91-88264-44334`
4. Create a strong password

### 1.2 Business Information

During signup, provide:

- **Business Name:** Cerebrum Biology Academy
- **Business Type:** Educational Services
- **Category:** Coaching Classes / Test Preparation
- **Website:** https://cerebrumbiologyacademy.com
- **Expected Monthly Volume:** ₹20-50 Lakhs (depending on enrollments)

---

## Step 2: KYC Verification (1-2 Business Days)

### Required Documents

**For Proprietorship/Individual:**

- PAN Card (Business owner)
- Aadhaar Card
- Bank account details (cancelled cheque or bank statement)
- GST Certificate (if registered)

**For Company/LLP:**

- Certificate of Incorporation
- PAN Card (Company)
- GST Certificate
- Bank account proof
- Director/Partner KYC documents

### KYC Submission Process

1. Login to Razorpay Dashboard
2. Go to: **Settings** → **Account & Settings** → **Business Details**
3. Upload required documents
4. Fill in bank account details for settlements
5. Submit for verification

**Timeline:** Usually 1-2 business days (can take up to 5 days)

**Status Check:** Dashboard will show "Under Review" → "Approved"

---

## Step 3: Get API Credentials

### 3.1 Test Mode Credentials (For Development)

1. Login to: https://dashboard.razorpay.com
2. Go to: **Settings** → **API Keys**
3. Click **Generate Test Key** (if not already generated)
4. You'll get:
   ```
   Key ID: rzp_test_XXXXXXXXXXXXX
   Key Secret: XXXXXXXXXXXXXXXXXXXXXXXX
   ```

**IMPORTANT:** Test keys start with `rzp_test_`

### 3.2 Live Mode Credentials (For Production)

⚠️ **Only available after KYC approval**

1. Switch to **Live Mode** toggle (top right)
2. Go to: **Settings** → **API Keys**
3. Click **Generate Live Key**
4. You'll get:
   ```
   Key ID: rzp_live_XXXXXXXXXXXXX
   Key Secret: XXXXXXXXXXXXXXXXXXXXXXXX
   ```

**IMPORTANT:**

- Live keys start with `rzp_live_`
- Keep these secret - never commit to git
- Rotate keys every 90 days for security

---

## Step 4: Update Environment Variables

### 4.1 For Development (Local Testing)

Edit `/cerebrum-biology-academy-website/.env.local`:

```bash
# ============================================
# PAYMENT GATEWAY (Razorpay) - DEVELOPMENT
# ============================================
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_test_YOUR_TEST_KEY_HERE
RAZORPAY_KEY_SECRET=YOUR_TEST_SECRET_HERE
RAZORPAY_WEBHOOK_SECRET=your_webhook_secret_here
```

**Example:**

```bash
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_test_AbC123XyZ456
RAZORPAY_KEY_SECRET=a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6
RAZORPAY_WEBHOOK_SECRET=whsec_AbC123XyZ456789
```

### 4.2 For Production (Vercel)

1. Go to: https://vercel.com/your-username/cerebrum-biology-academy-website
2. Click: **Settings** → **Environment Variables**
3. Add these variables for **Production** environment:

```bash
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_live_YOUR_LIVE_KEY_HERE
RAZORPAY_KEY_SECRET=YOUR_LIVE_SECRET_HERE
RAZORPAY_WEBHOOK_SECRET=whsec_YOUR_WEBHOOK_SECRET_HERE
```

⚠️ **CRITICAL:** Always use:

- `rzp_test_*` for Development/Preview
- `rzp_live_*` for Production only

---

## Step 5: Set Up Webhook (For Payment Confirmation)

Webhooks notify your server when payment status changes.

### 5.1 Create Webhook Endpoint

Your webhook URL (already implemented):

```
https://cerebrumbiologyacademy.com/api/payments/webhook
```

### 5.2 Configure Webhook in Razorpay

1. Go to: **Settings** → **Webhooks**
2. Click **Create New Webhook**
3. Enter details:
   - **Webhook URL:** `https://cerebrumbiologyacademy.com/api/payments/webhook`
   - **Secret:** Generate a random secret (e.g., `whsec_abc123xyz789`)
   - **Alert Email:** `info@cerebrumbiologyacademy.com`

4. Select events to listen for:
   - ✅ `payment.authorized`
   - ✅ `payment.captured`
   - ✅ `payment.failed`
   - ✅ `order.paid`
   - ✅ `refund.created`

5. Click **Create Webhook**

### 5.3 Update Webhook Secret

Add the generated secret to your `.env.local`:

```bash
RAZORPAY_WEBHOOK_SECRET=whsec_abc123xyz789
```

---

## Step 6: Test Payment Flow (30 minutes)

### 6.1 Test with Development Keys

1. Update `.env.local` with test credentials
2. Restart development server:

   ```bash
   cd /Users/drshekhar/cerebrum-biology-academy-website
   npm run dev
   ```

3. Open: http://localhost:3001/courses

### 6.2 Test Scenarios

#### Test Case 1: Successful Payment

1. Click any course → **Enroll Now**
2. Fill enrollment form
3. Click **Pay Now**
4. Use Razorpay test card:
   - **Card Number:** `4111 1111 1111 1111`
   - **CVV:** Any 3 digits (e.g., `123`)
   - **Expiry:** Any future date (e.g., `12/25`)
   - **Name:** Any name
5. Payment should succeed
6. Verify:
   - Student dashboard shows enrollment
   - Database has payment record
   - Study materials are accessible

#### Test Case 2: Failed Payment

1. Use Razorpay test failure card:
   - **Card Number:** `4000 0000 0000 0002`
   - **CVV:** Any 3 digits
   - **Expiry:** Any future date
2. Payment should fail gracefully
3. Verify:
   - Error message displayed
   - No enrollment created
   - No charge to card

#### Test Case 3: UPI Payment (Test Mode)

1. During payment, select **UPI**
2. Enter test UPI ID: `success@razorpay`
3. Payment should succeed

### 6.3 Monitor Payment in Dashboard

1. Go to: https://dashboard.razorpay.com/app/payments
2. You should see test payments listed
3. Check payment details, status, and logs

---

## Step 7: Go Live (Switch to Production)

⚠️ **Only do this after:**

- KYC approved ✅
- All tests passing ✅
- Webhook configured ✅
- Production deployment ready ✅

### 7.1 Update Vercel Environment Variables

1. Go to: https://vercel.com/your-username/cerebrum-biology-academy-website/settings/environment-variables
2. Update **Production** environment:

   ```bash
   NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_live_YOUR_LIVE_KEY
   RAZORPAY_KEY_SECRET=YOUR_LIVE_SECRET
   RAZORPAY_WEBHOOK_SECRET=whsec_YOUR_LIVE_WEBHOOK_SECRET
   ```

3. Redeploy:
   ```bash
   git push origin main
   ```

### 7.2 Activate Live Mode in Razorpay Dashboard

1. Switch to **Live Mode** (toggle in top right)
2. Go to: **Settings** → **Payment Methods**
3. Enable payment methods:
   - ✅ Credit Cards
   - ✅ Debit Cards
   - ✅ UPI
   - ✅ Net Banking
   - ✅ Wallets (Paytm, PhonePe, etc.)

### 7.3 Test First Real Payment

**IMPORTANT:** Test with small amount first!

1. Use a real card and pay ₹1
2. Verify entire flow:
   - Payment successful
   - Razorpay dashboard shows payment
   - Database updated correctly
   - Enrollment activated
   - Study materials accessible
   - Notifications sent (WhatsApp/Email)

---

## Step 8: Transaction Fees & Settlement

### 8.1 Razorpay Pricing

**Standard Pricing:**

- Domestic Cards: **2%** per transaction
- International Cards: **3%** per transaction
- UPI: **Free** for first ₹2 Lakhs/month, then 0.5%
- Net Banking: 2%
- Wallets: 2%

**Example Calculation:**

- Student pays: ₹75,000 (NEET Complete Course)
- Razorpay fee (2%): ₹1,500
- You receive: ₹73,500

**GST:** 18% GST on Razorpay fees

- Fee: ₹1,500
- GST: ₹270
- Total deduction: ₹1,770

### 8.2 Settlement Cycle

**Default:** T+3 days (Transaction + 3 working days)

**Example:**

- Student pays on Monday → Settled on Thursday
- Student pays on Friday → Settled on Wednesday (next week)

**Instant Settlement:** Available on request (additional charges apply)

### 8.3 Bank Account Configuration

1. Go to: **Settings** → **Bank Accounts**
2. Add primary bank account:
   - Account holder name
   - Account number
   - IFSC code
   - Account type (Savings/Current)
3. Razorpay will verify with small test deposit
4. Confirm amount to activate

---

## Step 9: Security Best Practices

### 9.1 Protect Your Secrets

✅ **DO:**

- Store secrets in environment variables
- Use different keys for dev/production
- Rotate keys every 90 days
- Enable webhook signature verification
- Use HTTPS only

❌ **DON'T:**

- Commit `.env.local` to git (already in `.gitignore`)
- Share keys in Slack/Email
- Use production keys in development
- Expose keys in frontend code

### 9.2 Implement Rate Limiting

Prevent abuse:

```typescript
// Already implemented in your codebase
// src/middleware/rateLimit.ts handles this
```

### 9.3 Monitor for Fraud

1. Enable **Risk Dashboard** in Razorpay:
   - Go to: **Risk & Fraud** → **Risk Dashboard**
   - Set velocity rules (e.g., max 3 attempts per card)
   - Block suspicious IPs/emails

2. Set up alerts for:
   - Failed payment attempts > 5 in 1 hour
   - High-value transactions (> ₹1 lakh)
   - International cards (if not expected)

---

## Step 10: Troubleshooting

### Issue 1: "Payment gateway not configured"

**Cause:** Environment variables not set

**Fix:**

```bash
# Check if variables are loaded
echo $NEXT_PUBLIC_RAZORPAY_KEY_ID
echo $RAZORPAY_KEY_SECRET

# If empty, update .env.local and restart server
npm run dev
```

### Issue 2: Payment verification failed

**Cause:** Incorrect webhook signature

**Fix:**

1. Check `RAZORPAY_WEBHOOK_SECRET` matches Razorpay dashboard
2. Verify signature validation logic in `/api/payments/verify/route.ts`
3. Test with webhook simulator

### Issue 3: Order creation fails

**Cause:** Invalid amount or credentials

**Fix:**

```typescript
// Amount must be in paise (multiply by 100)
amount: 75000 * 100 // ₹75,000 → 7,500,000 paise
```

### Issue 4: Payment stuck in "pending"

**Cause:** Webhook not triggered or failed

**Fix:**

1. Check Razorpay webhook logs
2. Manually trigger webhook from dashboard
3. Verify database update in `/api/payments/verify`

### Issue 5: "KYC pending" error

**Cause:** KYC not approved yet

**Fix:**

- Wait for KYC approval (1-2 days)
- Use test mode meanwhile
- Contact Razorpay support if delayed > 5 days

---

## Step 11: Testing Checklist

Before going live, test ALL scenarios:

### Payment Methods

- [ ] Credit Card (Visa, Mastercard, Amex)
- [ ] Debit Card
- [ ] UPI (multiple apps: GPay, PhonePe, Paytm)
- [ ] Net Banking (SBI, HDFC, ICICI)
- [ ] Wallets (Paytm, PhonePe)

### Payment Scenarios

- [ ] Successful payment
- [ ] Failed payment (insufficient funds)
- [ ] Cancelled payment (user closes modal)
- [ ] Network failure during payment
- [ ] Duplicate payment attempt

### Enrollment Types

- [ ] Full payment (₹75,000)
- [ ] Quarterly installment (₹18,750)
- [ ] Different courses (Class 11, 12, Dropper)

### Post-Payment

- [ ] Database updated correctly
- [ ] Enrollment activated
- [ ] Study materials unlocked
- [ ] WhatsApp notification sent
- [ ] Email receipt sent
- [ ] Student dashboard shows enrollment

---

## Step 12: Support & Resources

### Razorpay Support

- **Email:** support@razorpay.com
- **Phone:** 080-46668999
- **Help Center:** https://razorpay.com/support/
- **API Docs:** https://razorpay.com/docs/api/

### Integration Docs

- **Node.js SDK:** https://razorpay.com/docs/payments/server-integration/nodejs/
- **Webhooks:** https://razorpay.com/docs/webhooks/
- **Test Cards:** https://razorpay.com/docs/payments/payments/test-card-details/

### Your Implementation Files

- **Frontend:** `/src/components/payment/RazorpayPayment.tsx`
- **Backend Service:** `/src/lib/payments/razorpay.ts`
- **Create Order API:** `/src/app/api/payments/create-order/route.ts`
- **Verify Payment API:** `/src/app/api/payments/verify/route.ts`
- **Webhook Handler:** `/src/app/api/payments/webhook/route.ts`

---

## Step 13: Quick Reference

### Test Card Numbers (Test Mode Only)

| Purpose   | Card Number         | CVV          | Expiry          | Result                  |
| --------- | ------------------- | ------------ | --------------- | ----------------------- |
| Success   | 4111 1111 1111 1111 | Any 3 digits | Any future date | Payment succeeds        |
| Failure   | 4000 0000 0000 0002 | Any 3 digits | Any future date | Payment fails           |
| 3D Secure | 4000 0027 6000 3184 | Any 3 digits | Any future date | Requires OTP (use 1234) |

### Test UPI IDs

- Success: `success@razorpay`
- Failure: `failure@razorpay`

### Course Pricing Reference

From your TODO.md:

- **NEET Complete Course:** ₹75,000/year
- **Class 11 Biology:** TBD (add to pricing page)
- **Class 12 Biology:** TBD (add to pricing page)
- **Dropper Batch:** TBD (add to pricing page)

---

## Next Steps After Payment Setup

Once payment is working:

1. ✅ Complete Week 1 Task #1 (Payment System)
2. ⏭️ Move to Week 1 Task #2 (WhatsApp Business API)
3. ⏭️ Move to Week 1 Task #3 (Create Pricing Page)
4. ⏭️ Move to Week 1 Task #4 (Test Full Student Journey)

**Estimated Time to Complete:** 2-4 hours (excluding KYC approval wait time)

---

## Contact for Help

If you encounter issues during setup:

1. Check this guide first
2. Review Razorpay documentation
3. Test in development mode before going live
4. Contact Razorpay support for credential issues

**Remember:** Always test thoroughly in test mode before switching to live mode!
