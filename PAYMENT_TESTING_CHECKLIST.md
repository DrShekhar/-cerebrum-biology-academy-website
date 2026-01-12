# Payment System Testing Checklist

## Prerequisites ✅

Before testing, ensure you have:

- [ ] Updated `.env.local` with Razorpay test credentials
- [ ] Restarted development server (`npm run dev`)
- [ ] Database is connected and migrations are run
- [ ] Razorpay test account is active

---

## Test Environment Setup

### 1. Update Environment Variables

```bash
# In .env.local - replace with your actual test credentials
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_test_YOUR_KEY_HERE
RAZORPAY_KEY_SECRET=YOUR_SECRET_HERE
RAZORPAY_WEBHOOK_SECRET=whsec_YOUR_WEBHOOK_SECRET
```

### 2. Restart Server

```bash
cd /Users/drshekhar/cerebrum-biology-academy-website
npm run dev
```

---

## Testing Flow

### Phase 1: Component Testing (5 minutes)

#### Test 1.1: Payment Modal Loads

- [ ] Navigate to: http://localhost:3001/courses
- [ ] Click any course → **Enroll Now**
- [ ] Fill enrollment form with:
  - Name: Test Student
  - Email: test@example.com
  - Phone: +918826444334
  - Course: NEET Complete Course
- [ ] Click **Proceed to Payment**
- [ ] Verify: Payment summary shows correct amount
- [ ] Verify: Security badges visible (256-bit SSL, RBI Approved)
- [ ] Verify: Payment methods shown (Cards, UPI, Net Banking, Wallets)

#### Test 1.2: Razorpay Script Loads

- [ ] Open browser console (F12)
- [ ] Click **Pay ₹75,000 Securely**
- [ ] Verify: No console errors about Razorpay script
- [ ] Verify: Razorpay modal opens (blue modal with payment options)
- [ ] Verify: Modal shows "Cerebrum Biology Academy" as merchant name
- [ ] Verify: Amount displayed in modal matches (₹75,000)

---

### Phase 2: Payment Method Testing (20 minutes)

#### Test 2.1: Successful Card Payment

**Test Card:** `4111 1111 1111 1111` (Visa)

Steps:

- [ ] Click **Pay Now** button
- [ ] Razorpay modal opens
- [ ] Select **Card** payment method
- [ ] Enter:
  - Card Number: `4111 1111 1111 1111`
  - CVV: `123`
  - Expiry: `12/25` (any future date)
  - Name: `Test User`
- [ ] Click **Pay**
- [ ] Verify: Payment succeeds
- [ ] Verify: Success message shown
- [ ] Verify: Redirected to success page or dashboard

**Expected Database Changes:**

```sql
-- Check payment record
SELECT * FROM "Payment" WHERE "razorpayOrderId" LIKE 'order_%' ORDER BY "createdAt" DESC LIMIT 1;

-- Check enrollment status
SELECT * FROM "Enrollment" WHERE "status" = 'ACTIVE' ORDER BY "createdAt" DESC LIMIT 1;

-- Check material access granted
SELECT COUNT(*) FROM "MaterialAccess" WHERE "userId" = 'your-user-id';
```

#### Test 2.2: Failed Card Payment

**Test Card:** `4000 0000 0000 0002` (Always fails)

Steps:

- [ ] Start new enrollment
- [ ] Click **Pay Now**
- [ ] Enter card: `4000 0000 0000 0002`
- [ ] CVV: `123`, Expiry: `12/25`
- [ ] Click **Pay**
- [ ] Verify: Payment fails with error message
- [ ] Verify: No enrollment created
- [ ] Verify: Database has no payment record

#### Test 2.3: UPI Payment

**Test UPI:** `success@razorpay`

Steps:

- [ ] Click **Pay Now**
- [ ] Select **UPI** tab
- [ ] Enter UPI ID: `success@razorpay`
- [ ] Click **Pay**
- [ ] Verify: Payment succeeds (simulated in test mode)

#### Test 2.4: Net Banking

**Test Bank:** Any bank (all work in test mode)

Steps:

- [ ] Click **Pay Now**
- [ ] Select **Net Banking** tab
- [ ] Choose any bank (e.g., HDFC, SBI, ICICI)
- [ ] Click **Pay**
- [ ] Verify: Redirected to test bank page
- [ ] Click **Success** button
- [ ] Verify: Payment completes successfully

---

### Phase 3: Edge Case Testing (15 minutes)

#### Test 3.1: User Cancels Payment

- [ ] Click **Pay Now**
- [ ] Razorpay modal opens
- [ ] Click **X** or **Cancel** button
- [ ] Verify: Modal closes
- [ ] Verify: User stays on payment page
- [ ] Verify: Can click **Pay Now** again
- [ ] Verify: No payment record in database

#### Test 3.2: Network Failure Simulation

- [ ] Open browser DevTools → Network tab
- [ ] Set throttling to **Offline**
- [ ] Click **Pay Now**
- [ ] Verify: Error message shown: "Razorpay SDK failed to load"
- [ ] Re-enable network
- [ ] Verify: Can retry payment

#### Test 3.3: Invalid Amount

- [ ] Open browser console
- [ ] Try payment with amount: `-100` or `0`
- [ ] Verify: Error message shown
- [ ] Verify: No order created

#### Test 3.4: Duplicate Payment Prevention

- [ ] Complete a successful payment
- [ ] Try to pay again for same enrollment
- [ ] Verify: System prevents duplicate payment OR creates new installment

---

### Phase 4: Backend API Testing (10 minutes)

#### Test 4.1: Create Order API

```bash
# Test create order endpoint
curl -X POST http://localhost:3001/api/payments/create-order \
  -H "Content-Type: application/json" \
  -d '{
    "amount": 75000,
    "currency": "INR",
    "receipt": "receipt_test_123",
    "notes": {
      "student_name": "Test Student",
      "course": "NEET Complete"
    }
  }'
```

**Expected Response:**

```json
{
  "success": true,
  "id": "order_XXXXXXXXXXXXXX",
  "amount": 7500000,
  "currency": "INR",
  "status": "created"
}
```

**Check:**

- [ ] Response has `success: true`
- [ ] `id` starts with `order_`
- [ ] `amount` is in paise (75000 × 100 = 7500000)

#### Test 4.2: Verify Payment API

```bash
# Get order_id and payment_id from successful test payment
# Then generate signature (example)
curl -X POST http://localhost:3001/api/payments/verify \
  -H "Content-Type: application/json" \
  -d '{
    "razorpay_order_id": "order_XXXXXXXXXXXXXX",
    "razorpay_payment_id": "pay_XXXXXXXXXXXXXX",
    "razorpay_signature": "generated_signature_here"
  }'
```

**Expected Response:**

```json
{
  "verified": true,
  "orderId": "order_XXXXXXXXXXXXXX",
  "paymentId": "pay_XXXXXXXXXXXXXX"
}
```

#### Test 4.3: Webhook Endpoint

```bash
# Test webhook is reachable
curl http://localhost:3001/api/payments/webhook
```

**Expected Response:**

```json
{
  "message": "Razorpay Webhook Endpoint",
  "status": "active"
}
```

---

### Phase 5: Database Verification (5 minutes)

After successful payment, verify database:

#### Check Payment Record

```sql
SELECT
  id,
  "razorpayOrderId",
  "razorpayPaymentId",
  amount,
  status,
  "completedAt"
FROM "Payment"
WHERE "razorpayOrderId" LIKE 'order_%'
ORDER BY "createdAt" DESC
LIMIT 5;
```

**Expected:**

- [ ] `status = 'COMPLETED'`
- [ ] `razorpayPaymentId` starts with `pay_`
- [ ] `completedAt` is set
- [ ] `amount` matches payment (in paise)

#### Check Enrollment Status

```sql
SELECT
  id,
  "studentName",
  email,
  "courseId",
  status,
  "paidAmount",
  "pendingAmount",
  "startDate"
FROM "Enrollment"
WHERE status = 'ACTIVE'
ORDER BY "createdAt" DESC
LIMIT 5;
```

**Expected:**

- [ ] `status = 'ACTIVE'`
- [ ] `paidAmount > 0`
- [ ] `startDate` is set

#### Check Material Access

```sql
SELECT
  ma.id,
  ma."userId",
  ma."materialId",
  sm.title as material_title,
  ma."grantedAt",
  ma.reason
FROM "MaterialAccess" ma
JOIN "StudyMaterial" sm ON sm.id = ma."materialId"
WHERE ma."userId" = 'YOUR_USER_ID'
ORDER BY ma."grantedAt" DESC;
```

**Expected:**

- [ ] Multiple materials granted access
- [ ] `reason = 'Enrollment payment completed'`
- [ ] `grantedAt` matches payment time

---

### Phase 6: Integration Testing (10 minutes)

#### Test 6.1: Full Student Journey

1. **Browse Courses**
   - [ ] Navigate to `/courses`
   - [ ] Click **NEET Complete Course**
   - [ ] Verify: Course details page loads
   - [ ] Verify: **Enroll Now** button visible

2. **Start Enrollment**
   - [ ] Click **Enroll Now**
   - [ ] Fill form with valid data
   - [ ] Select installment plan: **Full Payment**
   - [ ] Click **Proceed to Payment**

3. **Complete Payment**
   - [ ] Verify: Payment summary correct
   - [ ] Click **Pay ₹75,000 Securely**
   - [ ] Use test card: `4111 1111 1111 1111`
   - [ ] Complete payment

4. **Post-Payment Verification**
   - [ ] Verify: Success message shown
   - [ ] Navigate to `/dashboard/student`
   - [ ] Verify: Enrollment appears in dashboard
   - [ ] Verify: Course materials are accessible
   - [ ] Verify: Mock tests are unlocked

5. **Notification Verification**
   - [ ] Check console logs for WhatsApp notification trigger
   - [ ] Check console logs for email notification trigger
   - [ ] (Will actually send once WhatsApp/Email are configured)

---

## Test Results Summary

### Pass/Fail Checklist

**Component Tests:**

- [ ] Payment modal loads correctly
- [ ] Razorpay script loads without errors
- [ ] All UI elements visible

**Payment Methods:**

- [ ] Card payment succeeds
- [ ] Failed card shows error
- [ ] UPI payment works
- [ ] Net Banking works

**Edge Cases:**

- [ ] User can cancel payment
- [ ] Network failure handled gracefully
- [ ] Invalid amounts rejected
- [ ] Duplicate payments prevented

**Backend APIs:**

- [ ] Create order API works
- [ ] Payment verification works
- [ ] Webhook endpoint active

**Database:**

- [ ] Payment records created correctly
- [ ] Enrollment activated
- [ ] Material access granted

**Integration:**

- [ ] Full student journey completes successfully
- [ ] Dashboard shows enrollment
- [ ] Materials accessible

---

## Troubleshooting Common Issues

### Issue: "Razorpay SDK failed to load"

**Cause:** CDN blocked or network issue
**Fix:**

- Check internet connection
- Disable ad blockers
- Check browser console for specific error

### Issue: "Payment gateway not configured"

**Cause:** Missing environment variables
**Fix:**

```bash
# Check if variables are set
npm run env-check

# Restart server
npm run dev
```

### Issue: "Invalid order_id"

**Cause:** Order creation failed
**Fix:**

- Check Razorpay credentials
- Verify API key has correct permissions
- Check console logs for error details

### Issue: Payment succeeds but enrollment not activated

**Cause:** Webhook or verification issue
**Fix:**

- Check `/api/payments/verify` logs
- Verify database connection
- Manually trigger verification:

```bash
curl -X GET "http://localhost:3001/api/payments/verify?order_id=order_XXXXX"
```

---

## Next Steps After Testing

Once all tests pass:

### For Development

- [ ] Keep test credentials in `.env.local`
- [ ] Use only test mode for local development
- [ ] Document any issues found

### For Production

- [ ] Get live Razorpay credentials (after KYC)
- [ ] Update Vercel environment variables with live keys
- [ ] Configure webhook URL in Razorpay dashboard
- [ ] Test with ₹1 real payment first
- [ ] Monitor Razorpay dashboard for first few payments

---

## Test Data Reference

### Test Cards

| Card Number         | Result    | Use For            |
| ------------------- | --------- | ------------------ |
| 4111 1111 1111 1111 | Success   | Happy path testing |
| 4000 0000 0000 0002 | Failure   | Error handling     |
| 4000 0027 6000 3184 | 3D Secure | OTP testing        |

### Test UPI IDs

| UPI ID           | Result           |
| ---------------- | ---------------- |
| success@razorpay | Payment succeeds |
| failure@razorpay | Payment fails    |

### Test Student Data

```
Name: Test Student
Email: test.student@example.com
Phone: +918826444334
Course: NEET Complete Course
Amount: ₹75,000
```

---

## Estimated Testing Time

- **Quick Smoke Test:** 5-10 minutes (basic payment flow)
- **Comprehensive Test:** 30-45 minutes (all scenarios)
- **Full Integration Test:** 1 hour (including database verification)

---

## Contact for Issues

If tests fail or you encounter issues:

1. Check console logs in browser (F12)
2. Check server logs in terminal
3. Review Razorpay dashboard logs
4. Refer to `/RAZORPAY_SETUP_GUIDE.md` for setup issues

**Remember:** Always test in test mode before going live!
