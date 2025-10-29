# Comprehensive Testing Checklist for Critical User Journeys

**Cerebrum Biology Academy Website - Manual QA Testing Guide**

Version: 1.0
Last Updated: 2025-10-29

---

## Table of Contents

1. [Testing Setup](#testing-setup)
2. [Critical Path 1: Homepage → Course Selection](#critical-path-1-homepage--course-selection)
3. [Critical Path 2: Course Selection → Purchase Page](#critical-path-2-course-selection--purchase-page)
4. [Critical Path 3: Purchase → Payment](#critical-path-3-purchase--payment)
5. [Critical Path 4: Payment → Enrollment](#critical-path-4-payment--enrollment)
6. [Critical Path 5: Authentication Flow](#critical-path-5-authentication-flow)
7. [Database Verification](#database-verification)
8. [Test Results Documentation](#test-results-documentation)

---

## Testing Setup

### Prerequisites

Before starting any testing, ensure:

- [ ] Local development server running (`npm run dev`) on port 3001 or 3000
- [ ] Database connection active (check with `npm run db:studio`)
- [ ] Environment variables configured in `.env.local`:
  ```
  DATABASE_URL=<your-database-url>
  NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_test_XXXX
  RAZORPAY_KEY_SECRET=<your-secret>
  ```
- [ ] Browser DevTools ready (F12)
- [ ] Test data prepared (see Test Data Reference section)

### Testing Environments

| Environment | URL                                    | Purpose                               |
| ----------- | -------------------------------------- | ------------------------------------- |
| Development | http://localhost:3001                  | Local testing with test Razorpay keys |
| Staging     | https://staging.cerebrumbioacademy.com | Pre-production testing                |
| Production  | https://www.cerebrumbioacademy.com     | Final smoke tests only                |

### Test Data Reference

**Test Student Information:**

- Name: Test Student
- Email: test.student@example.com
- Phone: +91 9876543210

**Test Payment Cards (Razorpay Test Mode):**

- Success: `4111 1111 1111 1111` (CVV: 123, Any future expiry)
- Failure: `4000 0000 0000 0002` (CVV: 123, Any future expiry)
- 3D Secure: `4000 0027 6000 3184` (Triggers OTP flow)

**Test UPI IDs:**

- Success: `success@razorpay`
- Failure: `failure@razorpay`

---

## Critical Path 1: Homepage → Course Selection

### Test Case 1.1: Homepage Loads Successfully

**Priority:** P0 (Critical)
**Estimated Time:** 2 minutes

**Steps:**

1. Navigate to homepage: `http://localhost:3001/`
2. Wait for page to fully load
3. Check browser console for errors

**Expected Results:**

- [ ] Page loads within 3 seconds
- [ ] No JavaScript errors in console
- [ ] No 404 errors for assets
- [ ] Hero section visible with main CTA
- [ ] Images load correctly (check for broken images)

**What to Verify:**

```bash
# Open browser console and check:
- No red errors
- All font files loaded
- All images loaded (no broken image icons)
```

**Screenshots/Evidence:**

- [ ] Take screenshot of homepage
- [ ] Save console output (no errors)

**Actual Results:**

```
Date Tested: __________
Tester: __________
Status: PASS / FAIL
Notes:
```

---

### Test Case 1.2: Course Cards Display Correctly

**Priority:** P0 (Critical)
**Estimated Time:** 3 minutes

**Steps:**

1. From homepage, scroll to "Our Courses" section
2. Verify all course cards are visible
3. Check course information displayed

**Expected Results:**

- [ ] At least 2-3 course cards visible (Class 11, Class 12, Dropper)
- [ ] Each card shows:
  - Course title
  - Course description
  - Pricing information
  - "Enroll Now" or "View Details" button
- [ ] Cards are responsive (test mobile view)

**What to Check:**

- Class 11th Biology Course
- Class 12th Biology Course
- Dropper Batch Course

**Mobile Testing:**

- [ ] Switch to mobile view (375px width)
- [ ] Cards stack vertically
- [ ] Text remains readable
- [ ] Buttons remain clickable (44px minimum touch target)

**Actual Results:**

```
Date Tested: __________
Tester: __________
Status: PASS / FAIL
Notes:
```

---

### Test Case 1.3: Navigation to Course Page

**Priority:** P0 (Critical)
**Estimated Time:** 2 minutes

**Steps:**

1. Click "View Details" or "Enroll Now" on Class 11 course card
2. Verify redirect to course details page
3. Check URL changes correctly

**Expected Results:**

- [ ] Redirects to `/courses` or course-specific page
- [ ] URL changes to correct path
- [ ] Page loads without errors
- [ ] Course details visible

**URLs to Verify:**

- Course listing: `/courses`
- Individual course pages exist

**Browser Console Check:**

```javascript
// No errors should appear
// Check Network tab for failed requests
```

**Actual Results:**

```
Date Tested: __________
Tester: __________
Status: PASS / FAIL
Notes:
```

---

### Test Case 1.4: Course Details Page Content

**Priority:** P1 (High)
**Estimated Time:** 3 minutes

**Steps:**

1. On course details page, verify all content sections
2. Scroll through entire page
3. Check all interactive elements

**Expected Results:**

- [ ] Course title and description visible
- [ ] Course features listed
- [ ] Pricing information displayed
- [ ] Faculty information (if applicable)
- [ ] Syllabus/curriculum section
- [ ] "Enroll Now" CTA button prominent
- [ ] Testimonials section (if present)

**Interactive Elements to Test:**

- [ ] All accordions expand/collapse
- [ ] Tab navigation works
- [ ] "Enroll Now" button functional

**Actual Results:**

```
Date Tested: __________
Tester: __________
Status: PASS / FAIL
Notes:
```

---

## Critical Path 2: Course Selection → Purchase Page

### Test Case 2.1: Navigate to Purchase Page

**Priority:** P0 (Critical)
**Estimated Time:** 2 minutes

**Steps:**

1. From course details page, click "Enroll Now"
2. Verify redirect to purchase page
3. Check URL contains course ID

**Expected Results:**

- [ ] Redirects to `/purchase/[courseId]`
- [ ] Page loads without errors
- [ ] Course ID in URL matches selected course
- [ ] Purchase page displays correct course information

**URL Format:**

```
Expected: /purchase/class-11
         /purchase/class-12
         /purchase/dropper
```

**Console Check:**

- [ ] No JavaScript errors
- [ ] No 404s for API calls

**Actual Results:**

```
Date Tested: __________
Tester: __________
Status: PASS / FAIL
Notes:
```

---

### Test Case 2.2: Pricing Plans Display

**Priority:** P0 (Critical)
**Estimated Time:** 3 minutes

**Steps:**

1. On purchase page, locate pricing section
2. Verify all pricing plans are visible
3. Check pricing details

**Expected Results:**

- [ ] 3 pricing plans visible:
  - Monthly Plan
  - Quarterly Plan (marked as "Popular")
  - Annual/Full Year Plan
- [ ] Each plan shows:
  - Plan name
  - Price in ₹
  - Duration
  - Features list
  - Selection radio button or checkbox
- [ ] Savings badge on quarterly/annual plans
- [ ] Original price shown (strikethrough) for discounted plans

**Pricing Verification (Class 11):**

- [ ] Monthly: ₹3,500
- [ ] Quarterly: ₹9,999 (Save ₹501)
- [ ] Annual: ₹35,000 (Save ₹7,000)

**Pricing Verification (Class 12):**

- [ ] Monthly: ₹5,000
- [ ] Quarterly: ₹14,499 (Save ₹501)
- [ ] Annual: ₹50,000 (Save ₹10,000)

**Actual Results:**

```
Date Tested: __________
Course Tested: __________
Status: PASS / FAIL
Notes:
```

---

### Test Case 2.3: Plan Selection Interaction

**Priority:** P0 (Critical)
**Estimated Time:** 2 minutes

**Steps:**

1. Click to select Monthly plan
2. Verify visual feedback
3. Select different plan (Quarterly)
4. Verify only one plan selected at a time

**Expected Results:**

- [ ] Plan highlights when selected (border/background change)
- [ ] Previously selected plan deselects
- [ ] "Proceed to Payment" button updates with selected plan price
- [ ] Selection persists when scrolling

**Visual Indicators:**

- [ ] Selected plan has distinct visual style
- [ ] Hover state works on all plans
- [ ] Selection is keyboard accessible (Tab + Enter/Space)

**Actual Results:**

```
Date Tested: __________
Status: PASS / FAIL
Notes:
```

---

### Test Case 2.4: Guest Checkout Form

**Priority:** P0 (Critical)
**Estimated Time:** 3 minutes

**Steps:**

1. Select a pricing plan
2. Click "Proceed to Payment" button
3. Verify guest checkout form appears (modal or inline)
4. Check form fields

**Expected Results:**

- [ ] Guest form modal/section appears
- [ ] Form contains fields:
  - Full Name (text input)
  - Email Address (email input)
  - Phone Number (tel input)
- [ ] All fields marked as required
- [ ] "Cancel" and "Continue" buttons present
- [ ] Helper text about login credentials being sent

**Form Validation to Test:**

- [ ] Empty fields show error on submit
- [ ] Invalid email format rejected
- [ ] Phone number accepts 10 digits
- [ ] Name must be at least 2 characters

**Actual Results:**

```
Date Tested: __________
Status: PASS / FAIL
Notes:
```

---

## Critical Path 3: Purchase → Payment

### Test Case 3.1: Create Order API Call

**Priority:** P0 (Critical)
**Estimated Time:** 3 minutes

**Steps:**

1. Fill guest checkout form:
   - Name: Test Student
   - Email: test.student@example.com
   - Phone: 9876543210
2. Click "Continue" to payment
3. Monitor Network tab in DevTools

**Expected Results:**

- [ ] POST request to `/api/purchase` sent
- [ ] Request body contains:
  ```json
  {
    "courseId": "class-11",
    "planType": "FULL",
    "amount": 35000,
    "email": "test.student@example.com",
    "phone": "9876543210",
    "name": "Test Student"
  }
  ```
- [ ] Response status: 200 OK
- [ ] Response contains:
  - `success: true`
  - `order.id` starting with `order_`
  - `enrollmentId`
  - `paymentId`

**Network Tab Verification:**

```
Request URL: http://localhost:3001/api/purchase
Method: POST
Status: 200
Response:
{
  "success": true,
  "enrollmentId": "clxxx...",
  "paymentId": "clyyy...",
  "order": {
    "id": "order_XXXXX",
    "amount": 3500000,
    "currency": "INR"
  }
}
```

**Error Handling:**

- [ ] Test with missing email (should get 400 error)
- [ ] Test with invalid courseId (should get 404 error)
- [ ] Verify error messages are user-friendly

**Actual Results:**

```
Date Tested: __________
Status: PASS / FAIL
API Response:
Notes:
```

---

### Test Case 3.2: Razorpay SDK Loading

**Priority:** P0 (Critical)
**Estimated Time:** 2 minutes

**Steps:**

1. After API call succeeds, wait for Razorpay modal
2. Check console for Razorpay script loading
3. Verify modal appearance

**Expected Results:**

- [ ] Razorpay script loads from CDN:
      `https://checkout.razorpay.com/v1/checkout.js`
- [ ] No console errors about Razorpay
- [ ] `window.Razorpay` object exists
- [ ] Razorpay modal opens within 2-3 seconds

**Console Check:**

```javascript
// In browser console, verify:
typeof window.Razorpay !== 'undefined' // Should be true
```

**Common Issues to Check:**

- [ ] Ad blocker not blocking Razorpay script
- [ ] No CORS errors
- [ ] Script loaded before trying to open modal

**Actual Results:**

```
Date Tested: __________
Status: PASS / FAIL
Notes:
```

---

### Test Case 3.3: Razorpay Modal Display

**Priority:** P0 (Critical)
**Estimated Time:** 2 minutes

**Steps:**

1. Verify Razorpay payment modal opens
2. Check modal content
3. Verify prefilled information

**Expected Results:**

- [ ] Modal has Razorpay branding (blue theme)
- [ ] Merchant name: "Cerebrum Biology Academy"
- [ ] Amount shown matches selected plan (e.g., ₹35,000.00)
- [ ] Prefilled information:
  - Name: Test Student
  - Email: test.student@example.com
  - Contact: 9876543210
- [ ] Payment methods visible:
  - Card
  - UPI
  - Net Banking
  - Wallets

**Visual Verification:**

- [ ] Modal is centered on screen
- [ ] Background overlay present (dims page)
- [ ] Close button (X) visible
- [ ] All text is readable

**Actual Results:**

```
Date Tested: __________
Status: PASS / FAIL
Screenshot: Attached? Y/N
Notes:
```

---

### Test Case 3.4: Successful Card Payment

**Priority:** P0 (Critical)
**Estimated Time:** 4 minutes

**Steps:**

1. In Razorpay modal, select "Card" payment method
2. Enter test card details:
   - Card Number: `4111 1111 1111 1111`
   - CVV: `123`
   - Expiry: `12/26`
   - Cardholder Name: `Test User`
3. Click "Pay" button
4. Wait for payment processing

**Expected Results:**

- [ ] Card form accepts all details
- [ ] "Pay" button enabled after entering all info
- [ ] Processing indicator shown
- [ ] Payment succeeds (test mode)
- [ ] Modal closes automatically
- [ ] Success message or redirect occurs

**Network Activity:**

- [ ] POST to Razorpay payment endpoint
- [ ] POST to `/api/payments/verify` (your backend)

**Console Logs to Check:**

```
Payment successful
Verification initiated
Enrollment activated
```

**Actual Results:**

```
Date Tested: __________
Status: PASS / FAIL
Order ID: __________
Payment ID: __________
Notes:
```

---

### Test Case 3.5: Failed Payment Handling

**Priority:** P1 (High)
**Estimated Time:** 3 minutes

**Steps:**

1. Start new purchase flow
2. In Razorpay modal, use failing test card:
   - Card Number: `4000 0000 0000 0002`
   - CVV: `123`
   - Expiry: `12/26`
3. Click "Pay"
4. Observe error handling

**Expected Results:**

- [ ] Payment fails with error message
- [ ] Error message is user-friendly (not technical)
- [ ] Modal remains open or closes gracefully
- [ ] User can retry payment
- [ ] No enrollment created in database

**Error Message Examples:**

- "Payment failed. Please try again."
- "Your card was declined. Please use a different payment method."

**What NOT to Show:**

- Stack traces
- Database errors
- API error codes

**Actual Results:**

```
Date Tested: __________
Status: PASS / FAIL
Error Message: __________
Notes:
```

---

### Test Case 3.6: UPI Payment

**Priority:** P1 (High)
**Estimated Time:** 3 minutes

**Steps:**

1. Start purchase flow
2. In Razorpay modal, select "UPI" tab
3. Enter test UPI ID: `success@razorpay`
4. Click "Pay"

**Expected Results:**

- [ ] UPI tab accessible
- [ ] Input field for UPI ID visible
- [ ] Test UPI ID accepted
- [ ] Payment succeeds (test mode)
- [ ] Verification flow triggers

**UPI Flow:**

- [ ] UPI ID validation (format check)
- [ ] "Verify" button appears
- [ ] Payment processing indicator
- [ ] Success confirmation

**Actual Results:**

```
Date Tested: __________
Status: PASS / FAIL
Notes:
```

---

### Test Case 3.7: Payment Cancellation

**Priority:** P1 (High)
**Estimated Time:** 2 minutes

**Steps:**

1. Open Razorpay payment modal
2. Click "X" or "Cancel" button
3. Verify behavior

**Expected Results:**

- [ ] Modal closes
- [ ] User returns to purchase page
- [ ] Payment page state preserved
- [ ] Selected plan still selected
- [ ] "Proceed to Payment" button clickable again
- [ ] No payment record in database
- [ ] Enrollment remains in PENDING status

**User Experience:**

- [ ] Can retry payment immediately
- [ ] No error messages shown (cancellation is intentional)

**Actual Results:**

```
Date Tested: __________
Status: PASS / FAIL
Notes:
```

---

## Critical Path 4: Payment → Enrollment

### Test Case 4.1: Payment Verification API

**Priority:** P0 (Critical)
**Estimated Time:** 3 minutes

**Steps:**

1. After successful payment, monitor Network tab
2. Check for verification API call
3. Verify request and response

**Expected Results:**

- [ ] POST to `/api/payments/verify` occurs automatically
- [ ] Request body contains:
  ```json
  {
    "razorpay_order_id": "order_XXXXX",
    "razorpay_payment_id": "pay_XXXXX",
    "razorpay_signature": "signature_hash"
  }
  ```
- [ ] Response status: 200 OK
- [ ] Response contains:
  ```json
  {
    "verified": true,
    "orderId": "order_XXXXX",
    "paymentId": "pay_XXXXX"
  }
  ```

**Verification Logic:**

- [ ] Signature validated server-side
- [ ] Payment record updated in database
- [ ] Enrollment status changed to ACTIVE

**Actual Results:**

```
Date Tested: __________
Status: PASS / FAIL
API Response:
Notes:
```

---

### Test Case 4.2: Enrollment Activation

**Priority:** P0 (Critical)
**Estimated Time:** 3 minutes

**Steps:**

1. After payment verification succeeds
2. Check database for enrollment status
3. Verify enrollment details

**Database Query:**

```sql
SELECT
  id,
  "userId",
  "courseId",
  status,
  "paidAmount",
  "pendingAmount",
  "startDate"
FROM "Enrollment"
WHERE "userId" = '<test-user-id>'
ORDER BY "createdAt" DESC
LIMIT 1;
```

**Expected Results:**

- [ ] Enrollment record exists
- [ ] status = 'ACTIVE'
- [ ] paidAmount = amount paid (in paise)
- [ ] pendingAmount updated (reduced or 0)
- [ ] startDate is set to current date
- [ ] enrollmentDate is set

**Run via Prisma Studio:**

1. Open Prisma Studio: `npm run db:studio`
2. Navigate to Enrollment model
3. Filter by userId or recent createdAt
4. Verify fields match expected values

**Actual Results:**

```
Date Tested: __________
Enrollment ID: __________
Status: __________
Paid Amount: __________
Notes:
```

---

### Test Case 4.3: Material Access Granting

**Priority:** P0 (Critical)
**Estimated Time:** 3 minutes

**Steps:**

1. After enrollment activation
2. Check MaterialAccess table
3. Verify study materials are accessible

**Database Query:**

```sql
SELECT
  ma.id,
  ma."userId",
  ma."materialId",
  sm.title as "materialTitle",
  ma."grantedAt",
  ma.reason
FROM "MaterialAccess" ma
JOIN "StudyMaterial" sm ON sm.id = ma."materialId"
WHERE ma."userId" = '<test-user-id>'
ORDER BY ma."grantedAt" DESC;
```

**Expected Results:**

- [ ] Multiple MaterialAccess records created
- [ ] One record per published study material for the course
- [ ] reason = 'Enrollment payment completed'
- [ ] grantedAt timestamp matches payment time
- [ ] grantedBy = 'system'

**Verify Count:**

```sql
SELECT COUNT(*)
FROM "MaterialAccess"
WHERE "userId" = '<test-user-id>';
```

- [ ] Count > 0 (at least some materials granted)

**Actual Results:**

```
Date Tested: __________
Materials Granted: __________
Status: PASS / FAIL
Notes:
```

---

### Test Case 4.4: Payment Record Creation

**Priority:** P0 (Critical)
**Estimated Time:** 2 minutes

**Steps:**

1. Verify Payment table has complete record
2. Check payment details

**Database Query:**

```sql
SELECT
  id,
  "razorpayOrderId",
  "razorpayPaymentId",
  "razorpaySignature",
  amount,
  currency,
  status,
  "completedAt",
  "createdAt"
FROM "Payment"
WHERE "razorpayOrderId" = 'order_XXXXX'
LIMIT 1;
```

**Expected Results:**

- [ ] Payment record exists
- [ ] status = 'COMPLETED'
- [ ] razorpayOrderId starts with 'order\_'
- [ ] razorpayPaymentId starts with 'pay\_'
- [ ] razorpaySignature is present (hash string)
- [ ] amount matches paid amount (in paise)
- [ ] currency = 'INR'
- [ ] completedAt timestamp is set
- [ ] completedAt is after createdAt

**Actual Results:**

```
Date Tested: __________
Payment ID: __________
Status: __________
Amount: __________
Notes:
```

---

### Test Case 4.5: Redirect to Success Page

**Priority:** P1 (High)
**Estimated Time:** 2 minutes

**Steps:**

1. After payment verification
2. Verify redirect occurs
3. Check success page content

**Expected Results:**

- [ ] Automatic redirect to success page
- [ ] URL format: `/purchase/success?orderId=XXX&paymentId=XXX&courseId=XXX`
- [ ] Success page displays:
  - Success message/icon
  - Order ID
  - Payment ID
  - Course name
  - Amount paid
  - Receipt download link (optional)
  - "Go to Dashboard" button
  - "Download Invoice" button (if implemented)

**Page Elements:**

- [ ] Clear success indicator (checkmark, success icon)
- [ ] Enrollment confirmation message
- [ ] Next steps instructions
- [ ] Link to course materials or dashboard

**Actual Results:**

```
Date Tested: __________
Status: PASS / FAIL
URL: __________
Notes:
```

---

### Test Case 4.6: Notification Triggering

**Priority:** P2 (Medium)
**Estimated Time:** 2 minutes

**Steps:**

1. After payment verification
2. Check server console logs
3. Verify notification triggers

**Expected Console Logs:**

```
Triggered WhatsApp and Email notifications
WhatsApp notification sent for enrollment: <enrollment-id>
Email notification sent to: test.student@example.com
```

**Expected Results:**

- [ ] Console log shows WhatsApp notification triggered
- [ ] Console log shows Email notification triggered
- [ ] No errors in notification sending
- [ ] Notifications are fire-and-forget (don't block payment verification)

**Note:** In test environment, notifications may not actually send (if WhatsApp/Email not configured), but triggers should be logged.

**API Calls to Check (Network Tab):**

- [ ] POST to `/api/notifications/whatsapp`
- [ ] POST to `/api/notifications/email`

**Actual Results:**

```
Date Tested: __________
WhatsApp Triggered: Y/N
Email Triggered: Y/N
Notes:
```

---

## Critical Path 5: Authentication Flow

### Test Case 5.1: Login Page Access

**Priority:** P1 (High)
**Estimated Time:** 2 minutes

**Steps:**

1. Navigate to `/auth/signin`
2. Verify page loads
3. Check form elements

**Expected Results:**

- [ ] Page loads without errors
- [ ] Login form visible
- [ ] Two auth methods available:
  - Mobile OTP
  - Email/Password
- [ ] Toggle between methods works
- [ ] Form fields appropriate to selected method

**Mobile OTP Method:**

- [ ] Mobile number input field
- [ ] WhatsApp number field (optional)
- [ ] "Send OTP" button

**Email/Password Method:**

- [ ] Email input field
- [ ] Password input field
- [ ] Show/hide password toggle
- [ ] "Sign In" button

**Additional Elements:**

- [ ] "Don't have an account? Sign up" link
- [ ] Logo and branding
- [ ] Terms and Privacy Policy links

**Actual Results:**

```
Date Tested: __________
Status: PASS / FAIL
Notes:
```

---

### Test Case 5.2: Mobile OTP Login Flow

**Priority:** P1 (High)
**Estimated Time:** 4 minutes

**Steps:**

1. Select "Mobile OTP" method
2. Enter mobile number: 9876543210
3. Click "Send OTP"
4. Wait for OTP screen
5. Enter OTP (check console logs for test OTP if in dev mode)
6. Click "Verify & Sign In"

**Expected Results:**

- [ ] Mobile number validation works (10 digits, starts with 6-9)
- [ ] "Send OTP" button triggers API call
- [ ] POST to `/api/auth/send-otp` succeeds
- [ ] OTP verification screen appears
- [ ] Shows masked mobile number (+91 98**\*\***10)
- [ ] OTP input field (6 digits)
- [ ] "Resend OTP" link available
- [ ] OTP verification triggers POST to `/api/auth/verify-otp`
- [ ] Successful verification redirects to dashboard

**Rate Limiting:**

- [ ] Multiple OTP requests show "Wait X seconds" message
- [ ] Countdown timer updates correctly

**Actual Results:**

```
Date Tested: __________
Status: PASS / FAIL
Notes:
```

---

### Test Case 5.3: Email/Password Login

**Priority:** P1 (High)
**Estimated Time:** 3 minutes

**Steps:**

1. Select "Email" method
2. Enter email: test.student@example.com
3. Enter password: (use test account password)
4. Click "Sign In"

**Expected Results:**

- [ ] Email validation works (valid email format)
- [ ] Password field is hidden by default
- [ ] Show/hide password toggle works
- [ ] POST to `/api/auth/signin` sent
- [ ] Successful login redirects to dashboard
- [ ] Failed login shows error message

**Error Cases to Test:**

- [ ] Incorrect password: "Invalid credentials"
- [ ] Non-existent email: "User not found"
- [ ] Empty fields: "Please fill in all fields"

**Actual Results:**

```
Date Tested: __________
Status: PASS / FAIL
Notes:
```

---

### Test Case 5.4: Registration Flow

**Priority:** P1 (High)
**Estimated Time:** 4 minutes

**Steps:**

1. Navigate to `/auth/signup`
2. Fill registration form:
   - Name: New Test User
   - Email: newuser@example.com
   - Phone: 9123456789
   - Password: TestPassword123!
3. Submit form

**Expected Results:**

- [ ] Registration page loads
- [ ] Form contains all required fields
- [ ] Password strength indicator shown
- [ ] Terms acceptance checkbox (if present)
- [ ] POST to `/api/auth/register` or `/api/auth/signup`
- [ ] Success message or redirect to login/dashboard
- [ ] User account created in database

**Validation to Test:**

- [ ] Email uniqueness check
- [ ] Phone uniqueness check
- [ ] Password minimum requirements
- [ ] Name minimum length

**Database Verification:**

```sql
SELECT id, email, phone, name, role
FROM "User"
WHERE email = 'newuser@example.com';
```

**Expected:**

- [ ] User record exists
- [ ] role = 'STUDENT'
- [ ] passwordHash is set (not plain text)

**Actual Results:**

```
Date Tested: __________
Status: PASS / FAIL
User ID Created: __________
Notes:
```

---

### Test Case 5.5: Session Management

**Priority:** P1 (High)
**Estimated Time:** 3 minutes

**Steps:**

1. Log in successfully
2. Verify session created
3. Navigate to protected routes
4. Check session persistence

**Expected Results:**

- [ ] Session cookie set after login
- [ ] Session stored in database
- [ ] Protected routes accessible
- [ ] User info available in client (useAuth hook)

**Database Check:**

```sql
SELECT
  id,
  "sessionToken",
  "userId",
  expires
FROM "Session"
WHERE "userId" = '<logged-in-user-id>'
ORDER BY expires DESC
LIMIT 1;
```

**Expected:**

- [ ] Active session exists
- [ ] expires date is in future
- [ ] sessionToken is unique

**Browser Check:**

- [ ] Cookie named `next-auth.session-token` or similar exists
- [ ] Cookie is HttpOnly and Secure

**Protected Routes to Test:**

- [ ] `/dashboard` - should load
- [ ] `/dashboard/student` - should load
- [ ] `/settings` - should load

**Actual Results:**

```
Date Tested: __________
Status: PASS / FAIL
Session Token: __________
Notes:
```

---

### Test Case 5.6: Logout Functionality

**Priority:** P2 (Medium)
**Estimated Time:** 2 minutes

**Steps:**

1. While logged in, find logout button
2. Click logout
3. Verify session cleared

**Expected Results:**

- [ ] Logout button accessible (header, profile menu, etc.)
- [ ] Click triggers logout
- [ ] Redirect to homepage or login page
- [ ] Session cookie removed
- [ ] Session record deleted or invalidated in database
- [ ] Protected routes redirect to login

**After Logout:**

- [ ] Try accessing `/dashboard` → should redirect to `/auth/signin`
- [ ] Cookie should be gone (check DevTools → Application → Cookies)

**Actual Results:**

```
Date Tested: __________
Status: PASS / FAIL
Notes:
```

---

### Test Case 5.7: Protected Route Redirect

**Priority:** P1 (High)
**Estimated Time:** 2 minutes

**Steps:**

1. Ensure logged out
2. Try to access `/dashboard` directly
3. Verify redirect behavior

**Expected Results:**

- [ ] Automatic redirect to `/auth/signin`
- [ ] Redirect preserves intended destination (optional)
- [ ] After login, redirects back to originally requested page

**URLs to Test:**

- `/dashboard`
- `/dashboard/student`
- `/settings`
- `/enrollments`

**Middleware Check:**

- [ ] Middleware.ts handles authentication
- [ ] Unauthenticated requests redirected properly

**Actual Results:**

```
Date Tested: __________
Status: PASS / FAIL
Notes:
```

---

## Database Verification

### Test Case 6.1: Complete User Journey Data Integrity

**Priority:** P0 (Critical)
**Estimated Time:** 5 minutes

**Steps:**

1. After completing a full purchase journey
2. Run comprehensive database queries
3. Verify all related records

**Query 1: User Record**

```sql
SELECT * FROM "User"
WHERE email = 'test.student@example.com';
```

**Verify:**

- [ ] User exists
- [ ] Phone number set
- [ ] Name correct
- [ ] Role is STUDENT

**Query 2: Enrollment Record**

```sql
SELECT e.*, c.name as course_name
FROM "Enrollment" e
JOIN "Course" c ON c.id = e."courseId"
WHERE e."userId" = '<user-id>'
ORDER BY e."createdAt" DESC
LIMIT 1;
```

**Verify:**

- [ ] status = 'ACTIVE'
- [ ] Course matches selected course
- [ ] totalFees correct
- [ ] paidAmount = amount paid
- [ ] pendingAmount = totalFees - paidAmount
- [ ] startDate is set

**Query 3: Payment Record**

```sql
SELECT * FROM "Payment"
WHERE "enrollmentId" = '<enrollment-id>'
ORDER BY "createdAt" DESC;
```

**Verify:**

- [ ] status = 'COMPLETED'
- [ ] razorpayOrderId present
- [ ] razorpayPaymentId present
- [ ] amount matches enrollment paidAmount
- [ ] completedAt is set

**Query 4: Material Access**

```sql
SELECT COUNT(*) as material_count
FROM "MaterialAccess"
WHERE "userId" = '<user-id>';
```

**Verify:**

- [ ] Count > 0
- [ ] Materials granted for enrolled course

**Query 5: Session (if logged in)**

```sql
SELECT * FROM "Session"
WHERE "userId" = '<user-id>'
AND expires > NOW()
ORDER BY expires DESC;
```

**Verify:**

- [ ] Active session exists

**Actual Results:**

```
Date Tested: __________
All Queries Passed: Y/N
Notes:
```

---

### Test Case 6.2: Data Consistency Checks

**Priority:** P1 (High)
**Estimated Time:** 3 minutes

**Consistency Query 1: Enrollment vs Payment**

```sql
SELECT
  e.id as enrollment_id,
  e."paidAmount" as enrollment_paid,
  COALESCE(SUM(p.amount), 0) as total_payments
FROM "Enrollment" e
LEFT JOIN "Payment" p ON p."enrollmentId" = e.id
  AND p.status = 'COMPLETED'
WHERE e."userId" = '<user-id>'
GROUP BY e.id, e."paidAmount";
```

**Verify:**

- [ ] enrollment_paid = total_payments

**Consistency Query 2: Course Materials vs Access**

```sql
SELECT
  c.id as course_id,
  c.name as course_name,
  COUNT(DISTINCT sm.id) as total_materials,
  COUNT(DISTINCT ma.id) as accessible_materials
FROM "Course" c
LEFT JOIN "StudyMaterial" sm ON sm."courseId" = c.id AND sm."isPublished" = true
LEFT JOIN "Enrollment" e ON e."courseId" = c.id AND e."userId" = '<user-id>' AND e.status = 'ACTIVE'
LEFT JOIN "MaterialAccess" ma ON ma."materialId" = sm.id AND ma."userId" = '<user-id>'
WHERE c.id IN (SELECT "courseId" FROM "Enrollment" WHERE "userId" = '<user-id>')
GROUP BY c.id, c.name;
```

**Verify:**

- [ ] accessible_materials = total_materials (or close, if some materials are restricted)

**Actual Results:**

```
Date Tested: __________
Status: PASS / FAIL
Notes:
```

---

## Test Results Documentation

### Test Execution Summary

**Test Cycle:** ****\_\_****
**Date:** ****\_\_****
**Tester:** ****\_\_****
**Environment:** Development / Staging / Production

### Overall Results

| Test Section                | Total Tests | Passed | Failed | Blocked | Pass Rate |
| --------------------------- | ----------- | ------ | ------ | ------- | --------- |
| Homepage → Course Selection |             |        |        |         |           |
| Course Selection → Purchase |             |        |        |         |           |
| Purchase → Payment          |             |        |        |         |           |
| Payment → Enrollment        |             |        |        |         |           |
| Authentication Flow         |             |        |        |         |           |
| Database Verification       |             |        |        |         |           |
| **TOTAL**                   |             |        |        |         |           |

### Critical Issues Found

| Issue ID | Severity | Description | Steps to Reproduce | Status |
| -------- | -------- | ----------- | ------------------ | ------ |
|          |          |             |                    |        |
|          |          |             |                    |        |

**Severity Levels:**

- **P0 (Blocker):** Prevents critical functionality, must fix before release
- **P1 (Critical):** Major feature broken, fix required
- **P2 (High):** Important feature impaired, fix recommended
- **P3 (Medium):** Minor issue, fix if time permits
- **P4 (Low):** Cosmetic or minor inconvenience

### Test Environment Details

```
Operating System: __________
Browser: __________ (Version: _____)
Screen Resolution: __________
Database: PostgreSQL __________
Node.js Version: __________
Next.js Version: __________
```

### Notes and Observations

```
[Add any general observations, patterns noticed, or recommendations here]
```

### Sign-off

**QA Tester:** ********\_\_\_\_********
**Date:** ****\_\_****

**Release Approval:** ********\_\_\_\_********
**Date:** ****\_\_****

---

## Appendix: Quick Reference Commands

### Start Development Server

```bash
cd /Users/drshekhar/cerebrum-biology-academy-website
npm run dev
```

### Open Database Studio

```bash
npm run db:studio
```

### Check Environment Variables

```bash
cat .env.local | grep RAZORPAY
```

### View Server Logs

```bash
# Logs are shown in terminal where npm run dev is running
# Look for console.log statements related to payments
```

### Test API Endpoints Directly

**Create Order:**

```bash
curl -X POST http://localhost:3001/api/purchase \
  -H "Content-Type: application/json" \
  -d '{
    "courseId": "class-11",
    "planType": "FULL",
    "amount": 35000,
    "email": "test@example.com",
    "phone": "9876543210",
    "name": "Test Student"
  }'
```

**Check Payment Status:**

```bash
curl http://localhost:3001/api/payments/verify?order_id=order_XXXXX
```

---

## Change Log

| Version | Date       | Changes                                 | Author |
| ------- | ---------- | --------------------------------------- | ------ |
| 1.0     | 2025-10-29 | Initial comprehensive testing checklist | Claude |

---

**End of Testing Checklist**
