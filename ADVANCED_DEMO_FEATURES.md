# Advanced Demo Booking Features - Implementation Guide

This document provides a comprehensive overview of the 5 advanced Level 3 features implemented for the demo-booking system.

## Table of Contents

1. [Google Calendar Integration (.ics file)](#1-google-calendar-integration)
2. [SMS Confirmations via Twilio](#2-sms-confirmations-via-twilio)
3. [Referral System](#3-referral-system)
4. [Payment for Premium Demos](#4-payment-for-premium-demos)
5. [Rescheduling Portal](#5-rescheduling-portal)
6. [Environment Configuration](#environment-configuration)
7. [Database Schema Updates](#database-schema-updates)
8. [Testing Guide](#testing-guide)

---

## 1. Google Calendar Integration

### Overview

Users can download their demo booking as a calendar file (.ics) that works with Google Calendar, Apple Calendar, Outlook, and all standard calendar apps.

### Implementation Files

**Service Layer:**

- `/src/lib/calendar/calendarService.ts` - Calendar event generation and sharing

**UI Component:**

- `/src/components/booking/CalendarActions.tsx` - Calendar download and share buttons

### Features

- **Download .ics file**: Works with all major calendar applications
- **Google Calendar direct link**: Opens Google Calendar with pre-filled event
- **WhatsApp sharing**: Share booking details via WhatsApp
- **Email sharing**: Share via default email client
- **Automatic reminders**: 30 minutes and 1 hour before the demo
- **Premium/Free support**: Different durations (90 min vs 60 min)

### Usage Example

```typescript
import { downloadCalendarEvent, addToGoogleCalendar } from '@/lib/calendar/calendarService'

// Download .ics file
downloadCalendarEvent({
  studentName: 'John Doe',
  email: 'john@example.com',
  phone: '+919876543210',
  preferredDate: '2025-02-01',
  preferredTime: '10:00 AM - 11:00 AM',
  zoomJoinUrl: 'https://zoom.us/j/123456789',
  zoomPassword: 'abc123',
  demoType: 'PREMIUM',
})

// Open Google Calendar
const googleUrl = addToGoogleCalendar(bookingData)
window.open(googleUrl, '_blank')
```

### API Endpoints

None required - pure client-side implementation using the `ics` library.

---

## 2. SMS Confirmations via Twilio

### Overview

Automatic SMS notifications sent after successful demo booking.

### Implementation Files

**API Route:**

- `/src/app/api/notifications/sms/route.ts` - SMS sending endpoint

### Features

- **Instant confirmation**: SMS sent immediately after booking
- **Personalized messages**: Includes student name, date, time
- **Zoom link inclusion**: If available, includes join URL
- **Status tracking**: Check delivery status via API
- **Fallback handling**: Falls back to WhatsApp if SMS fails
- **160 character optimization**: Efficient message format

### Usage Example

```typescript
// Send SMS confirmation
const response = await fetch('/api/notifications/sms', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    phone: '+919876543210',
    name: 'John Doe',
    date: '2025-02-01',
    time: '10:00 AM - 11:00 AM',
    zoomUrl: 'https://zoom.us/j/123456789',
    demoType: 'PREMIUM',
  }),
})

// Check SMS status
const statusResponse = await fetch(`/api/notifications/sms?messageId=SM123`)
```

### API Endpoints

#### POST `/api/notifications/sms`

Send SMS notification.

**Request Body:**

```json
{
  "phone": "+919876543210",
  "name": "John Doe",
  "date": "2025-02-01",
  "time": "10:00 AM - 11:00 AM",
  "zoomUrl": "https://zoom.us/j/123456789",
  "demoType": "PREMIUM"
}
```

**Response:**

```json
{
  "success": true,
  "messageId": "SM123456789",
  "status": "sent"
}
```

#### GET `/api/notifications/sms?messageId=SM123`

Check SMS delivery status.

---

## 3. Referral System

### Overview

Users can generate referral codes, share with friends, and both receive ₹500 discounts.

### Implementation Files

**API Routes:**

- `/src/app/api/referral/generate/route.ts` - Generate referral codes
- `/src/app/api/referral/validate/route.ts` - Validate and redeem codes

**UI Components:**

- `/src/components/booking/ReferralInput.tsx` - Input field for applying codes
- `/src/components/booking/ReferralShare.tsx` - Share referral code UI

**Database Models:**

- `ReferralCode` - Stores referral codes
- `ReferralRedemption` - Tracks code usage

### Features

- **Auto-generation**: Unique codes based on user name + random string
- **Validation**: Real-time code verification
- **Usage limits**: Maximum 10 uses per code
- **Expiration support**: Optional expiry dates
- **Discount tracking**: Records discount amounts
- **One-time use per user**: Prevents abuse
- **WhatsApp sharing**: Direct share functionality

### Usage Example

```typescript
// Generate referral code
const response = await fetch('/api/referral/generate', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    userId: 'user_123',
    email: 'john@example.com',
    name: 'John Doe',
  }),
})
// Returns: { code: "JOHN1A2B", discount: 500, maxUses: 10 }

// Validate referral code
const validationResponse = await fetch('/api/referral/validate', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    code: 'JOHN1A2B',
  }),
})
// Returns: { valid: true, discount: 500, message: "You'll get ₹500 off!" }

// Redeem code (on booking)
await fetch('/api/referral/validate', {
  method: 'PUT',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    code: 'JOHN1A2B',
    redeemedBy: 'Jane Doe',
    redeemedByEmail: 'jane@example.com',
    bookingId: 'booking_123',
  }),
})
```

### API Endpoints

#### POST `/api/referral/generate`

Generate a new referral code.

#### GET `/api/referral/generate?email=user@example.com`

Retrieve existing referral code.

#### POST `/api/referral/validate`

Validate a referral code before use.

#### PUT `/api/referral/validate`

Redeem a referral code (mark as used).

---

## 4. Payment for Premium Demos

### Overview

Razorpay integration for paid premium demo bookings with enhanced features.

### Implementation Files

**API Routes:**

- `/src/app/api/payment/create-order/route.ts` - Create Razorpay order
- `/src/app/api/payment/verify/route.ts` - Verify payment completion

**UI Component:**

- `/src/components/booking/PremiumDemoCard.tsx` - Premium vs Free selection

**Database Updates:**

- Added payment fields to `DemoBooking` model
- New enums: `DemoType`, `DemoPaymentStatus`

### Features

- **Free vs Premium selection**: Visual comparison cards
- **Razorpay integration**: Secure payment processing
- **Referral discount support**: Applied automatically to premium price
- **Payment verification**: SHA256 signature validation
- **Order tracking**: Razorpay order and payment IDs stored
- **Auto-confirmation**: Booking status updated on payment success
- **90-minute sessions**: Extended time for premium demos
- **Additional benefits**: Mock test access, recordings, study materials

### Pricing

| Feature    | Free Demo  | Premium Demo                |
| ---------- | ---------- | --------------------------- |
| Duration   | 45 minutes | 90 minutes                  |
| Topics     | Basic      | Advanced                    |
| Study Plan | ❌         | ✅ Personalized             |
| Mock Test  | ❌         | ✅ Free access (₹500 value) |
| Recording  | ❌         | ✅ Provided                 |
| Materials  | Basic      | Premium pack                |
| **Price**  | ₹0         | ₹99 (or ₹0 with referral)   |

### Usage Example

```typescript
// Create payment order
const orderResponse = await fetch('/api/payment/create-order', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    amount: 99,
    bookingId: 'booking_123',
    currency: 'INR',
  }),
})
const { orderId, key } = await orderResponse.json()

// Initialize Razorpay
const options = {
  key: key,
  amount: 9900,
  currency: 'INR',
  name: 'Cerebrum Biology Academy',
  description: 'Premium Demo Class',
  order_id: orderId,
  handler: async (response) => {
    // Verify payment
    const verifyResponse = await fetch('/api/payment/verify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        razorpay_order_id: response.razorpay_order_id,
        razorpay_payment_id: response.razorpay_payment_id,
        razorpay_signature: response.razorpay_signature,
      }),
    })

    if (verifyResponse.ok) {
      // Payment successful
      setBookingComplete(true)
    }
  },
  prefill: {
    name: bookingData.studentName,
    email: bookingData.email,
    contact: bookingData.phone,
  },
  theme: {
    color: '#0ea5e9',
  },
}

const razorpay = new window.Razorpay(options)
razorpay.open()
```

### API Endpoints

#### POST `/api/payment/create-order`

Create a Razorpay payment order.

**Request Body:**

```json
{
  "amount": 99,
  "bookingId": "booking_123",
  "currency": "INR"
}
```

**Response:**

```json
{
  "success": true,
  "orderId": "order_abc123",
  "amount": 9900,
  "currency": "INR",
  "key": "rzp_test_123"
}
```

#### POST `/api/payment/verify`

Verify payment signature and update booking.

**Request Body:**

```json
{
  "razorpay_order_id": "order_abc123",
  "razorpay_payment_id": "pay_xyz789",
  "razorpay_signature": "sha256_signature"
}
```

#### GET `/api/payment/verify?bookingId=booking_123`

Check payment status for a booking.

---

## 5. Rescheduling Portal

### Overview

Secure self-service portal for users to reschedule their demo classes.

### Implementation Files

**API Route:**

- `/src/app/api/demo-booking/reschedule/route.ts` - Reschedule logic and token management

**Page:**

- `/src/app/demo-booking/reschedule/page.tsx` - Reschedule UI

**Database Model:**

- `RescheduleToken` - Secure tokens with expiration

### Features

- **Secure tokens**: 32-byte random tokens with 7-day expiration
- **Token validation**: Prevents unauthorized access
- **One-time use**: Tokens marked as used after rescheduling
- **Current booking display**: Shows existing details
- **Date/time selection**: Same UI as original booking
- **Automatic notifications**: Sends updates via email/SMS
- **Status tracking**: Updates booking status to RESCHEDULED

### Usage Flow

1. Admin/System generates reschedule link
2. User clicks link (sent via email/SMS)
3. Token validated against database
4. User selects new date/time
5. Booking updated, token marked as used
6. Notifications sent to student and admin

### Usage Example

```typescript
// Generate reschedule link
const response = await fetch('/api/demo-booking/reschedule', {
  method: 'PUT',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    bookingId: 'booking_123'
  })
})
const { rescheduleUrl, expiresAt } = await response.json()
// rescheduleUrl: "https://site.com/demo-booking/reschedule?id=booking_123&token=abc..."

// User visits URL and submits new date/time
// POST /api/demo-booking/reschedule
{
  "bookingId": "booking_123",
  "token": "secure_token_here",
  "newDate": "2025-02-05",
  "newTime": "02:00 PM - 03:00 PM"
}
```

### API Endpoints

#### PUT `/api/demo-booking/reschedule`

Generate a secure reschedule link.

**Request Body:**

```json
{
  "bookingId": "booking_123"
}
```

**Response:**

```json
{
  "success": true,
  "rescheduleUrl": "https://site.com/demo-booking/reschedule?id=booking_123&token=abc...",
  "expiresAt": "2025-02-08T10:00:00Z"
}
```

#### GET `/api/demo-booking/reschedule?id=booking_123&token=abc...`

Fetch booking details for rescheduling (validates token).

#### POST `/api/demo-booking/reschedule`

Submit new date/time to reschedule booking.

**Request Body:**

```json
{
  "bookingId": "booking_123",
  "token": "secure_token_here",
  "newDate": "2025-02-05",
  "newTime": "02:00 PM - 03:00 PM"
}
```

---

## Environment Configuration

Add these variables to `.env.local`:

```bash
# Twilio SMS Configuration
TWILIO_ACCOUNT_SID="AC..."
TWILIO_AUTH_TOKEN="your_auth_token"
TWILIO_PHONE_NUMBER="+1234567890"

# Razorpay Payment Configuration
NEXT_PUBLIC_RAZORPAY_KEY_ID="rzp_test_..."
RAZORPAY_KEY_SECRET="your_secret_key"
RAZORPAY_WEBHOOK_SECRET="whsec_..."

# Site Configuration (for reschedule links)
NEXT_PUBLIC_SITE_URL="https://cerebrumbiologyacademy.com"
```

### Production Setup

1. **Twilio Account**:
   - Sign up at https://twilio.com
   - Verify phone number
   - Get Account SID and Auth Token
   - Purchase a phone number

2. **Razorpay Account**:
   - Sign up at https://razorpay.com
   - Complete KYC verification
   - Get Test/Live API keys
   - Configure webhook URL

3. **Database Migration**:
   ```bash
   npx prisma migrate deploy
   ```

---

## Database Schema Updates

### New Models

#### ReferralCode

```prisma
model ReferralCode {
  id          String   @id @default(cuid())
  code        String   @unique
  userId      String?
  userEmail   String
  uses        Int      @default(0)
  maxUses     Int      @default(10)
  discount    Int
  expiresAt   DateTime?
  createdAt   DateTime @default(now())
  redemptions ReferralRedemption[]
}
```

#### ReferralRedemption

```prisma
model ReferralRedemption {
  id             String   @id @default(cuid())
  referralCodeId String
  redeemedBy     String
  redeemedByEmail String
  discountGiven  Int
  bookingId      String?
  createdAt      DateTime @default(now())
  referralCode   ReferralCode @relation(...)
}
```

#### RescheduleToken

```prisma
model RescheduleToken {
  id          String   @id @default(cuid())
  bookingId   String   @unique
  token       String   @unique
  expiresAt   DateTime
  used        Boolean  @default(false)
  createdAt   DateTime @default(now())
}
```

### Updated Models

#### DemoBooking (additions)

```prisma
model DemoBooking {
  // ... existing fields

  demoType        DemoType            @default(FREE)
  paymentStatus   DemoPaymentStatus   @default(NOT_REQUIRED)
  paymentAmount   Int?
  razorpayOrderId String?             @unique
  razorpayPaymentId String?           @unique
  paymentCompletedAt DateTime?
  referralCodeUsed String?
  referralDiscount Int?
}
```

### New Enums

```prisma
enum DemoType {
  FREE
  PREMIUM
}

enum DemoPaymentStatus {
  NOT_REQUIRED
  PENDING
  COMPLETED
  FAILED
  REFUNDED
}

enum DemoBookingStatus {
  // ... existing values
  RESCHEDULED  // Added
}
```

---

## Testing Guide

### 1. Calendar Integration Testing

**Test Download .ics:**

1. Book a demo (free or premium)
2. Click "Download .ics" on success screen
3. Verify file downloads
4. Open in calendar app
5. Check all details appear correctly

**Test Google Calendar:**

1. Click "Google Calendar" button
2. Verify redirects to Google Calendar
3. Check event pre-filled with correct data

### 2. SMS Testing

**Test SMS Sending:**

```bash
curl -X POST http://localhost:3000/api/notifications/sms \
  -H "Content-Type: application/json" \
  -d '{
    "phone": "+919876543210",
    "name": "Test User",
    "date": "2025-02-01",
    "time": "10:00 AM - 11:00 AM",
    "demoType": "PREMIUM"
  }'
```

**Verify:**

- SMS received on phone
- Correct formatting
- All details included

### 3. Referral System Testing

**Test Code Generation:**

```bash
curl -X POST http://localhost:3000/api/referral/generate \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "name": "Test User"
  }'
```

**Test Validation:**

```bash
curl -X POST http://localhost:3000/api/referral/validate \
  -H "Content-Type: application/json" \
  -d '{"code": "TEST1A2B"}'
```

**Test Usage Scenarios:**

1. Apply valid code → Should show discount
2. Apply invalid code → Should show error
3. Apply expired code → Should show error
4. Apply same code twice → Should block second use
5. Apply code at max uses → Should show limit reached

### 4. Payment Testing

**Razorpay Test Cards:**

- Success: `4111 1111 1111 1111`
- Failure: `4111 1111 1111 1112`
- CVV: Any 3 digits
- Expiry: Any future date

**Test Flow:**

1. Select Premium Demo
2. Apply referral code (optional)
3. Verify price updates
4. Enter details and pay
5. Check payment success
6. Verify booking status updated

### 5. Reschedule Testing

**Test Link Generation:**

```bash
curl -X PUT http://localhost:3000/api/demo-booking/reschedule \
  -H "Content-Type: application/json" \
  -d '{"bookingId": "booking_123"}'
```

**Test Reschedule Flow:**

1. Generate link via API
2. Visit link in browser
3. Verify booking details shown
4. Select new date/time
5. Submit reschedule
6. Check booking updated
7. Verify notifications sent

**Test Security:**

1. Invalid token → Should show error
2. Expired token → Should show error
3. Used token → Should show error
4. Wrong booking ID → Should show error

---

## Success Metrics

Track these KPIs after deployment:

1. **Calendar Adoption**: 60% of users download calendar file
2. **Premium Conversion**: 15% opt for premium demos
3. **Referral Usage**: 20% use referral codes
4. **Self-Service Rescheduling**: 10% reschedule online (vs calling)
5. **SMS Delivery Rate**: >95% successful delivery
6. **Payment Success Rate**: >98% successful transactions

---

## Maintenance & Monitoring

### Error Monitoring

Monitor these endpoints for errors:

- `/api/notifications/sms` - SMS delivery failures
- `/api/payment/verify` - Payment verification failures
- `/api/referral/validate` - Referral validation issues
- `/api/demo-booking/reschedule` - Rescheduling errors

### Regular Tasks

**Daily:**

- Check SMS delivery logs
- Monitor payment transactions
- Review referral code usage

**Weekly:**

- Analyze premium demo conversion rate
- Review reschedule statistics
- Check for referral abuse patterns

**Monthly:**

- Generate referral earnings reports
- Analyze feature adoption rates
- Review and optimize pricing

---

## Support & Troubleshooting

### Common Issues

**SMS not received:**

- Check Twilio account balance
- Verify phone number format (+91...)
- Check delivery status via API

**Payment fails:**

- Verify Razorpay credentials
- Check test/live mode mismatch
- Review webhook configuration

**Referral code invalid:**

- Check code exists in database
- Verify not expired
- Check usage limits not exceeded

**Reschedule link not working:**

- Verify token not expired (7 days)
- Check token not already used
- Confirm booking ID matches

---

## Future Enhancements

1. **Email Confirmations**: Add email notifications alongside SMS
2. **WhatsApp Integration**: Send confirmations via WhatsApp Business API
3. **Multiple Reschedules**: Allow users to reschedule up to 2 times
4. **Referral Leaderboard**: Show top referrers with rewards
5. **Payment Plans**: Offer EMI for premium demos
6. **Review System**: Collect feedback after demo completion
7. **Auto-Reminders**: Send automated reminders 24h and 1h before demo
8. **Smart Scheduling**: AI-powered optimal time slot suggestions

---

## Credits

Implemented by: Claude (Anthropic AI Assistant)
Date: 2025-10-30
Version: 1.0.0

For questions or support, contact: support@cerebrumbiologyacademy.com
