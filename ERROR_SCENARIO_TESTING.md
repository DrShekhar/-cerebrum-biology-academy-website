# Error Scenario Testing Guide

**Cerebrum Biology Academy - Comprehensive Error Testing**

Version: 1.0
Last Updated: 2025-10-29

---

## Table of Contents

1. [Overview](#overview)
2. [Error Testing Principles](#error-testing-principles)
3. [Payment Flow Error Scenarios](#payment-flow-error-scenarios)
4. [Network Failure Scenarios](#network-failure-scenarios)
5. [Database Error Scenarios](#database-error-scenarios)
6. [Authentication Error Scenarios](#authentication-error-scenarios)
7. [Input Validation Error Scenarios](#input-validation-error-scenarios)
8. [Third-Party Service Failures](#third-party-service-failures)
9. [Error Reporting and Logging](#error-reporting-and-logging)
10. [User-Friendly Error Messages](#user-friendly-error-messages)

---

## Overview

Error scenario testing ensures the application handles failures gracefully and provides meaningful feedback to users. This guide covers all critical error scenarios and how to test them.

### Testing Goals

1. **Graceful Degradation:** System continues functioning when non-critical components fail
2. **Clear Error Messages:** Users understand what went wrong and what to do
3. **Data Integrity:** No data corruption or loss during errors
4. **Recovery Paths:** Users can retry or take alternative actions
5. **Logging:** All errors are logged for debugging

---

## Error Testing Principles

### 1. Fail Fast, Recover Gracefully

```typescript
// Good: Clear error handling with user feedback
try {
  await processPayment(data)
} catch (error) {
  console.error('Payment processing error:', error)
  showUserError('Payment failed. Please try again or contact support.')
  rollbackTransaction()
}

// Bad: Silent failure
try {
  await processPayment(data)
} catch (error) {
  // Nothing happens - user sees success but payment didn't complete
}
```

### 2. User-Friendly Error Messages

```typescript
// Good: User understands the problem and solution
'Your payment could not be processed. Please check your card details and try again. If the issue persists, contact your bank.'

// Bad: Technical jargon
'Error 500: Internal Server Error. Stack trace: TypeError at line 245...'
```

### 3. Preserve User Input

```typescript
// Good: Form data preserved after error
const [formData, setFormData] = useState({...})

async function handleSubmit() {
  try {
    await submitForm(formData)
  } catch (error) {
    // formData still available for retry
    showError(error.message)
  }
}

// Bad: Form cleared on error
async function handleSubmit() {
  try {
    await submitForm(formData)
    clearForm()  // Don't do this before success is confirmed!
  } catch (error) {
    // User has to re-enter everything
  }
}
```

### 4. Prevent Duplicate Actions

```typescript
// Good: Disable button during processing
const [isSubmitting, setIsSubmitting] = useState(false)

async function handlePayment() {
  setIsSubmitting(true)
  try {
    await processPayment()
  } catch (error) {
    showError(error.message)
  } finally {
    setIsSubmitting(false)
  }
}

// In JSX:
<button disabled={isSubmitting}>
  {isSubmitting ? 'Processing...' : 'Pay Now'}
</button>
```

---

## Payment Flow Error Scenarios

### Scenario 1: Razorpay Payment Failure

**What:** Payment declined by bank or card network

**How to Test:**

1. Navigate to purchase page
2. Select a course and pricing plan
3. Fill guest checkout form
4. In Razorpay modal, use failing test card: `4000 0000 0000 0002`
5. CVV: `123`, Expiry: any future date
6. Click "Pay"

**Expected Behavior:**

- [ ] Razorpay shows error: "Payment failed"
- [ ] Modal closes or shows retry option
- [ ] User returns to purchase page
- [ ] Form data preserved (plan selection, user info)
- [ ] User-friendly error message displayed
- [ ] No enrollment created in database
- [ ] No payment record created (or status remains PENDING)

**Database Verification:**

```sql
-- No completed payment for this attempt
SELECT * FROM "Payment"
WHERE "createdAt" > NOW() - INTERVAL '5 minutes'
AND status = 'COMPLETED';
-- Should be empty for this failed payment

-- No active enrollment
SELECT * FROM "Enrollment"
WHERE "createdAt" > NOW() - INTERVAL '5 minutes'
AND status = 'ACTIVE';
-- Should be empty
```

**Error Message Example:**

```
"Payment could not be completed. Please check your card details and try again.
If you continue to face issues, please contact your bank or try a different payment method."
```

---

### Scenario 2: Payment Verification Failure

**What:** Payment succeeds in Razorpay but signature verification fails

**How to Test:**

1. Complete payment flow with valid test card
2. Intercept the verification request (using browser DevTools → Network tab)
3. Modify the signature parameter before it reaches server

**Alternative Test (Code Modification):**

```typescript
// Temporarily modify /api/payments/verify/route.ts
// Change signature verification to always fail for testing

const verified = false // Force failure for testing
```

**Expected Behavior:**

- [ ] Payment verification fails
- [ ] User sees error: "Payment verification failed"
- [ ] Enrollment remains in PENDING status
- [ ] Payment record exists but status is PENDING
- [ ] User can contact support with order ID
- [ ] Error logged server-side

**Database State:**

```sql
-- Payment exists but not completed
SELECT * FROM "Payment"
WHERE "razorpayOrderId" = 'order_XXX'
AND status = 'PENDING';

-- Enrollment not activated
SELECT * FROM "Enrollment"
WHERE id = 'enrollment_id'
AND status = 'PENDING';
```

**Error Message Example:**

```
"Your payment was received but could not be verified automatically.
Please contact support at support@cerebrumbioacademy.com with Order ID: order_ABC123XYZ"
```

---

### Scenario 3: Razorpay SDK Failed to Load

**What:** Razorpay JavaScript library doesn't load (network issue, ad blocker, CDN down)

**How to Test:**

1. Navigate to purchase page
2. Open browser DevTools → Network tab
3. Block the Razorpay script URL: `https://checkout.razorpay.com/v1/checkout.js`
4. Attempt to proceed to payment

**Expected Behavior:**

- [ ] Error detected before payment modal opens
- [ ] User sees error: "Payment system is loading. Please wait or refresh the page."
- [ ] Retry button available
- [ ] If retry fails, suggest checking internet connection

**Code Check:**

```typescript
// In purchase page component
const [razorpayLoaded, setRazorpayLoaded] = useState(false)

// In payment handler
if (!razorpayLoaded) {
  alert('Payment system is loading. Please wait a moment.')
  return
}

if (typeof window.Razorpay === 'undefined') {
  alert('Payment gateway failed to load. Please check your internet connection and try again.')
  return
}
```

**Error Message Example:**

```
"Payment system is loading. Please wait a moment and try again.
If the issue persists, please disable any ad blockers and refresh the page."
```

---

### Scenario 4: User Cancels Payment

**What:** User clicks "X" or "Cancel" in Razorpay modal

**How to Test:**

1. Complete purchase flow
2. When Razorpay modal opens, click the X button (top-right)
3. Or click outside the modal

**Expected Behavior:**

- [ ] Modal closes
- [ ] No error message shown (cancellation is intentional)
- [ ] User returns to purchase page
- [ ] Form data preserved
- [ ] Can click "Proceed to Payment" again
- [ ] No payment record created (or status remains PENDING)
- [ ] Enrollment status remains PENDING

**Database Verification:**

```sql
-- Order created but not paid
SELECT * FROM "Payment"
WHERE "razorpayOrderId" LIKE 'order_%'
AND status = 'PENDING'
ORDER BY "createdAt" DESC
LIMIT 1;
```

**User Message Example:**

```
"Payment cancelled. You can continue when you're ready."
[Proceed to Payment] button remains clickable
```

---

### Scenario 5: Duplicate Payment Prevention

**What:** User tries to pay for course they're already enrolled in

**How to Test:**

1. Complete a successful payment for Class 11 course
2. Verify enrollment is ACTIVE
3. Try to purchase the same course again

**Expected Behavior:**

- [ ] System detects existing active enrollment
- [ ] API returns 400 error with message
- [ ] User sees error: "You are already enrolled in this course"
- [ ] Link to dashboard provided
- [ ] No new enrollment created
- [ ] No new payment initiated

**API Response:**

```json
{
  "success": false,
  "error": "You are already enrolled in this course",
  "enrollmentId": "existing-enrollment-id"
}
```

**Error Message Example:**

```
"You are already enrolled in this course!
View your enrollment in the dashboard: [Go to Dashboard]"
```

---

## Network Failure Scenarios

### Scenario 6: API Request Timeout

**What:** API call takes too long and times out

**How to Test:**

1. Use browser DevTools → Network tab
2. Set throttling to "Slow 3G" or custom (500ms delay)
3. Attempt purchase flow
4. Or use code to simulate delay:
   ```typescript
   // In API route
   await new Promise((resolve) => setTimeout(resolve, 10000)) // 10s delay
   ```

**Expected Behavior:**

- [ ] Loading indicator shows while waiting
- [ ] After timeout (e.g., 10s), error shown
- [ ] User can retry
- [ ] Form data preserved

**Error Message Example:**

```
"Request timed out. Please check your internet connection and try again."
[Retry] button
```

---

### Scenario 7: Complete Network Loss

**What:** User loses internet connection mid-flow

**How to Test:**

1. Start purchase flow
2. Fill guest checkout form
3. Go offline (browser DevTools → Network → Offline)
4. Click "Continue" to payment

**Expected Behavior:**

- [ ] Request fails immediately
- [ ] Error shown: "No internet connection"
- [ ] Form data preserved
- [ ] Retry available when back online

**Error Message Example:**

```
"You appear to be offline. Please check your internet connection.
[Retry when online]"
```

---

### Scenario 8: Server Unreachable (500 Error)

**What:** Backend server returns 500 Internal Server Error

**How to Test:**

1. Temporarily break API route to cause 500 error:
   ```typescript
   // In /api/purchase/route.ts
   export async function POST(request: NextRequest) {
     throw new Error('Simulated server error')
   }
   ```
2. Attempt purchase

**Expected Behavior:**

- [ ] User sees generic error (not technical details)
- [ ] Error logged server-side
- [ ] User can retry
- [ ] Support contact provided

**Error Message Example:**

```
"Something went wrong on our end. Please try again in a moment.
If the issue persists, contact support at support@cerebrumbioacademy.com"
```

---

## Database Error Scenarios

### Scenario 9: Database Connection Lost

**What:** Database becomes unavailable mid-request

**How to Test:**

1. Stop PostgreSQL server temporarily
2. Attempt purchase or login

**Expected Behavior:**

- [ ] Graceful error handling (not crash)
- [ ] User sees: "Service temporarily unavailable"
- [ ] Error logged
- [ ] Automatic retry (with exponential backoff)

**Error Message Example:**

```
"Our service is temporarily unavailable. We're working to restore it.
Please try again in a few moments."
```

---

### Scenario 10: Transaction Rollback

**What:** One part of a multi-step transaction fails

**How to Test:**

1. Modify code to fail after enrollment creation but before payment creation:
   ```typescript
   const enrollment = await tx.enrollment.create({...})
   throw new Error('Simulated transaction failure')
   const payment = await tx.payment.create({...})  // Never reached
   ```

**Expected Behavior:**

- [ ] Entire transaction rolled back
- [ ] No enrollment created
- [ ] No payment created
- [ ] Database remains consistent
- [ ] User sees error and can retry

**Database Verification:**

```sql
-- No orphaned enrollment
SELECT COUNT(*) FROM "Enrollment"
WHERE "createdAt" > NOW() - INTERVAL '1 minute'
AND id NOT IN (SELECT "enrollmentId" FROM "Payment");
-- Should be 0
```

---

### Scenario 11: Constraint Violation

**What:** Unique constraint violated (e.g., duplicate email)

**How to Test:**

1. Register user: test@example.com
2. Try to register again with same email

**Expected Behavior:**

- [ ] Database rejects duplicate
- [ ] User sees: "Email already in use"
- [ ] Option to login instead
- [ ] Password reset link offered

**Error Message Example:**

```
"This email is already registered.
[Login instead] or [Reset password]"
```

---

## Authentication Error Scenarios

### Scenario 12: Invalid Login Credentials

**What:** User enters wrong email or password

**How to Test:**

1. Navigate to `/auth/signin`
2. Enter email: test@example.com
3. Enter wrong password: WrongPassword123
4. Click "Sign In"

**Expected Behavior:**

- [ ] Login fails
- [ ] Generic error (for security): "Invalid email or password"
- [ ] Password field cleared
- [ ] Email field preserved
- [ ] No indication of which field was wrong

**Error Message Example:**

```
"Invalid email or password. Please try again.
[Forgot password?]"
```

---

### Scenario 13: OTP Expired

**What:** User enters OTP after it has expired

**How to Test:**

1. Request OTP
2. Wait 10 minutes (or whatever expiry time is set)
3. Enter OTP

**Expected Behavior:**

- [ ] OTP verification fails
- [ ] Error: "OTP has expired"
- [ ] "Resend OTP" button available
- [ ] User can request new OTP

**Error Message Example:**

```
"OTP has expired. Please request a new one.
[Resend OTP]"
```

---

### Scenario 14: Rate Limiting - Too Many OTP Requests

**What:** User requests OTP too many times in short period

**How to Test:**

1. Request OTP 5 times in 1 minute
2. Try to request 6th time

**Expected Behavior:**

- [ ] Request blocked
- [ ] Error shown with cooldown time
- [ ] Countdown timer displayed
- [ ] Retry automatically enabled after cooldown

**Error Message Example:**

```
"Too many OTP requests. Please wait 2 minutes before trying again.
Retry in: 1:45"
```

---

### Scenario 15: Session Expired

**What:** User's session expires while logged in

**How to Test:**

1. Log in
2. Manually delete session from database or wait for expiry
3. Try to access protected route

**Expected Behavior:**

- [ ] Redirect to login page
- [ ] Error: "Your session has expired. Please log in again."
- [ ] After login, redirect back to intended page

**Error Message Example:**

```
"Your session has expired for security reasons. Please log in again."
```

---

## Input Validation Error Scenarios

### Scenario 16: Invalid Email Format

**How to Test:**

```
Try these invalid emails:
- "notanemail"
- "missing@domain"
- "@example.com"
- "user@"
- "user @example.com" (space)
```

**Expected Behavior:**

- [ ] Validation error before API call
- [ ] Error message: "Please enter a valid email address"
- [ ] Field highlighted in red
- [ ] Form submission blocked

---

### Scenario 17: Invalid Phone Number

**How to Test:**

```
Try these invalid phone numbers:
- "12345" (too short)
- "abcd123456" (letters)
- "5123456789" (doesn't start with 6-9)
- "99999999999" (11 digits)
```

**Expected Behavior:**

- [ ] Validation error
- [ ] Error: "Please enter a valid 10-digit mobile number"
- [ ] Only digits allowed in input
- [ ] Maximum 10 digits enforced

---

### Scenario 18: SQL Injection Attempt

**How to Test:**

```
Try entering in email field:
- "'; DROP TABLE users; --"
- "admin'--"
- "1' OR '1'='1"
```

**Expected Behavior:**

- [ ] Input sanitized
- [ ] No SQL executed
- [ ] Treated as normal string
- [ ] May fail email validation

**Security Check:**
All database queries should use parameterized queries (Prisma handles this):

```typescript
// Safe (Prisma)
await prisma.user.findUnique({
  where: { email: userInput }, // Automatically sanitized
})

// Unsafe (never do this)
await prisma.$queryRaw`SELECT * FROM User WHERE email = ${userInput}`
```

---

### Scenario 19: XSS Injection Attempt

**How to Test:**

```
Try entering in name field:
- "<script>alert('XSS')</script>"
- "<img src=x onerror=alert('XSS')>"
- "javascript:alert('XSS')"
```

**Expected Behavior:**

- [ ] Input sanitized or escaped
- [ ] Script tags not executed
- [ ] Rendered as plain text
- [ ] Name field may reject special characters

**Code Check:**

```typescript
// React automatically escapes
<p>{userName}</p>  // Safe, XSS prevented

// Dangerous (avoid)
<p dangerouslySetInnerHTML={{__html: userName}} />  // Vulnerable
```

---

### Scenario 20: Negative or Zero Amount

**How to Test:**

```typescript
// Modify request to send invalid amount
{
  "amount": 0,
  "courseId": "class-11"
}

// Or
{
  "amount": -1000,
  "courseId": "class-11"
}
```

**Expected Behavior:**

- [ ] Validation error (400)
- [ ] Error: "Invalid amount"
- [ ] No order created
- [ ] No enrollment created

---

## Third-Party Service Failures

### Scenario 21: Razorpay API Down

**What:** Razorpay service is unavailable

**How to Test:**

1. Mock Razorpay API to return error:
   ```typescript
   jest.mock('razorpay', () => ({
     orders: {
       create: jest.fn().mockRejectedValue(new Error('Service unavailable')),
     },
   }))
   ```

**Expected Behavior:**

- [ ] Graceful error handling
- [ ] User sees: "Payment service temporarily unavailable"
- [ ] Retry option provided
- [ ] Alternative contact method shown

**Error Message Example:**

```
"Our payment service is temporarily unavailable.
Please try again in a few minutes or contact us directly:
Phone: +91-XXXXXXXXXX
Email: support@cerebrumbioacademy.com"
```

---

### Scenario 22: Email Service Failure

**What:** Email notification fails to send

**How to Test:**

1. Configure invalid email credentials
2. Complete purchase
3. Check email sending

**Expected Behavior:**

- [ ] Payment still completes successfully
- [ ] Email failure logged
- [ ] User not notified of email failure
- [ ] Email retry queued (background job)
- [ ] Manual email can be triggered from admin panel

**Code Pattern:**

```typescript
// Fire-and-forget email (don't block main flow)
sendEnrollmentEmail(user, course).catch((err) => {
  console.error('Email failed:', err)
  // Log to error tracking service
  // Queue for retry
})
```

---

## Error Reporting and Logging

### What to Log

**1. Client-Side Errors (Browser Console)**

```typescript
console.error('Payment processing error:', {
  orderId: order.id,
  error: error.message,
  timestamp: new Date().toISOString(),
})
```

**2. Server-Side Errors (Server Logs)**

```typescript
console.error('Purchase API error:', {
  userId: session?.user?.id,
  courseId: request.body.courseId,
  error: error.message,
  stack: error.stack,
  timestamp: new Date().toISOString(),
})
```

**3. Error Tracking Service (Sentry, Rollbar)**

```typescript
import * as Sentry from '@sentry/nextjs'

Sentry.captureException(error, {
  tags: {
    feature: 'payment',
    flow: 'purchase',
  },
  extra: {
    orderId: order.id,
    userId: user.id,
  },
})
```

### Error Log Format

**Standard Error Log:**

```json
{
  "level": "error",
  "timestamp": "2025-10-29T10:30:00.000Z",
  "message": "Payment verification failed",
  "context": {
    "userId": "user_123",
    "orderId": "order_ABC",
    "courseId": "class-11",
    "errorCode": "VERIFICATION_FAILED"
  },
  "stack": "Error: Signature mismatch\n  at verify..."
}
```

---

## User-Friendly Error Messages

### Error Message Guidelines

1. **Be Clear and Specific**
   - ✅ "Payment could not be processed. Please check your card details."
   - ❌ "Error occurred."

2. **Provide Next Steps**
   - ✅ "Your session has expired. Please log in again to continue."
   - ❌ "Session invalid."

3. **Avoid Technical Jargon**
   - ✅ "We couldn't connect to the server. Please check your internet."
   - ❌ "Network error: ERR_CONNECTION_REFUSED"

4. **Show Empathy**
   - ✅ "We're sorry, something went wrong. We're looking into it."
   - ❌ "500 Internal Server Error"

5. **Offer Support**
   - ✅ "If the problem continues, contact us at support@cerebrumbioacademy.com"
   - ❌ "Error. Good luck!"

### Error Message Template

```typescript
interface ErrorMessage {
  title: string // "Payment Failed"
  description: string // "Your card was declined"
  action: string // "Try again with a different card"
  supportContact?: string // "Contact support: ..."
}
```

### Example Implementation

```typescript
function getErrorMessage(error: Error): ErrorMessage {
  if (error.message.includes('payment_declined')) {
    return {
      title: 'Payment Declined',
      description: 'Your card was declined by the bank.',
      action: 'Please try a different payment method or contact your bank.',
      supportContact: 'Need help? Call us at +91-XXXXXXXXXX',
    }
  }

  if (error.message.includes('network')) {
    return {
      title: 'Connection Issue',
      description: "We couldn't reach the server.",
      action: 'Please check your internet connection and try again.',
    }
  }

  // Default fallback
  return {
    title: 'Something Went Wrong',
    description: 'An unexpected error occurred.',
    action: 'Please try again. If the issue persists, contact support.',
    supportContact: 'Email: support@cerebrumbioacademy.com',
  }
}
```

---

## Error Testing Checklist

### Payment Errors

- [ ] Payment declined (failing card)
- [ ] Payment verification failed
- [ ] Razorpay SDK failed to load
- [ ] User cancels payment
- [ ] Duplicate payment attempt
- [ ] Invalid payment amount
- [ ] Razorpay API unavailable

### Network Errors

- [ ] API request timeout
- [ ] Complete network loss
- [ ] Server unreachable (500)
- [ ] Slow network (3G simulation)

### Database Errors

- [ ] Database connection lost
- [ ] Transaction rollback
- [ ] Constraint violation
- [ ] Query timeout

### Authentication Errors

- [ ] Invalid login credentials
- [ ] OTP expired
- [ ] Too many OTP requests (rate limit)
- [ ] Session expired
- [ ] Invalid token

### Validation Errors

- [ ] Invalid email format
- [ ] Invalid phone number
- [ ] SQL injection attempt
- [ ] XSS injection attempt
- [ ] Negative/zero amount
- [ ] Missing required fields

### Third-Party Errors

- [ ] Razorpay service down
- [ ] Email service failure
- [ ] SMS service failure (if implemented)

---

## Error Recovery Testing

### Test: Can User Recover from Error?

For each error scenario, verify:

1. **Retry Option Available:** User can try again
2. **Data Preserved:** Form data not lost
3. **Clear Path Forward:** User knows what to do next
4. **Support Available:** Contact information provided

### Example Recovery Flow

```
[User attempts payment]
     ↓
[Payment fails]
     ↓
[Clear error message shown]
     ↓
[Form data still populated]
     ↓
[Retry button available] ← User clicks
     ↓
[Try payment again]
     ↓
[Success! Enrollment activated]
```

---

## Monitoring and Alerting

### Set Up Alerts For:

1. **High Error Rate:** > 5% of requests failing
2. **Payment Failures:** > 10 failed payments in 1 hour
3. **API Errors:** > 50 500 errors in 5 minutes
4. **Database Errors:** Any connection pool exhaustion
5. **Authentication Failures:** > 100 failed logins in 10 minutes

### Error Metrics Dashboard

Track:

- **Error Rate by Endpoint:** Which APIs fail most
- **Error Types:** Payment, auth, database, network
- **Error Recovery Rate:** % of errors that users retry and succeed
- **Time to Resolution:** How long before errors are fixed

---

**End of Error Scenario Testing Guide**
