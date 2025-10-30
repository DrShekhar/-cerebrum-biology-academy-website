# Quick Integration Guide - Advanced Demo Features

This guide shows how to integrate the 5 advanced features into your existing `DemoBookingSystem.tsx` component.

## Step 1: Update DemoBookingSystem.tsx

### Import New Components

```typescript
import { PremiumDemoCard } from '@/components/booking/PremiumDemoCard'
import { ReferralInput } from '@/components/booking/ReferralInput'
import { CalendarActions } from '@/components/booking/CalendarActions'
import { ReferralShare } from '@/components/booking/ReferralShare'
```

### Add State Variables

```typescript
// Add to existing state
const [selectedDemoType, setSelectedDemoType] = useState<'FREE' | 'PREMIUM'>('FREE')
const [referralCode, setReferralCode] = useState('')
const [referralDiscount, setReferralDiscount] = useState(0)
const [paymentInProgress, setPaymentInProgress] = useState(false)
```

### Modify Step 1: Add Premium Demo Selection

Replace the existing course selection step with:

```typescript
{currentStep === 1 && (
  <div>
    <h2 className="text-2xl font-bold text-gray-900 mb-6">
      Choose Your Demo Experience
    </h2>

    <PremiumDemoCard
      selected={selectedDemoType}
      onSelect={setSelectedDemoType}
      referralDiscount={referralDiscount}
    />

    <ReferralInput
      onReferralApplied={(code, discount) => {
        setReferralCode(code)
        setReferralDiscount(discount)
      }}
      onReferralRemoved={() => {
        setReferralCode('')
        setReferralDiscount(0)
      }}
    />

    <button
      onClick={() => {
        setCurrentStep(2)
        trackFormInteraction('demo_type_selected', { type: selectedDemoType })
      }}
      className="w-full mt-6 bg-gradient-to-r from-blue-600 to-cyan-600..."
    >
      Continue
    </button>
  </div>
)}
```

### Update handleSubmit Function

```typescript
const handleSubmit = async () => {
  setIsSubmitting(true)
  setError('')

  try {
    // Step 1: Create booking
    const bookingResponse = await fetch('/api/demo-booking', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...bookingData,
        demoType: selectedDemoType,
        referralCodeUsed: referralCode || null,
        referralDiscount: referralDiscount || null,
      }),
    })

    if (!bookingResponse.ok) throw new Error('Booking failed')

    const { bookingId } = await bookingResponse.json()

    // Step 2: Handle Payment (if premium)
    if (selectedDemoType === 'PREMIUM') {
      const finalPrice = 99 - referralDiscount

      if (finalPrice > 0) {
        setPaymentInProgress(true)
        await handlePayment(bookingId, finalPrice)
      } else {
        // Free with referral discount
        await confirmBooking(bookingId)
      }
    }

    // Step 3: Send SMS Confirmation
    await sendSMSConfirmation(bookingData)

    // Step 4: Mark as complete
    setBookingComplete(true)
    setCurrentStep(5) // Success screen
  } catch (err) {
    setError(err instanceof Error ? err.message : 'Booking failed')
  } finally {
    setIsSubmitting(false)
    setPaymentInProgress(false)
  }
}
```

### Add Payment Handler

```typescript
const handlePayment = async (bookingId: string, amount: number) => {
  return new Promise(async (resolve, reject) => {
    try {
      // Create Razorpay order
      const orderResponse = await fetch('/api/payment/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount, bookingId }),
      })

      const { orderId, key } = await orderResponse.json()

      // Initialize Razorpay
      const options = {
        key,
        amount: amount * 100,
        currency: 'INR',
        name: 'Cerebrum Biology Academy',
        description: 'Premium Demo Class',
        order_id: orderId,
        handler: async (response: any) => {
          try {
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
              resolve(true)
            } else {
              reject(new Error('Payment verification failed'))
            }
          } catch (error) {
            reject(error)
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
        modal: {
          ondismiss: () => reject(new Error('Payment cancelled')),
        },
      }

      const razorpay = new (window as any).Razorpay(options)
      razorpay.open()
    } catch (error) {
      reject(error)
    }
  })
}
```

### Add SMS Sender

```typescript
const sendSMSConfirmation = async (data: BookingData) => {
  try {
    await fetch('/api/notifications/sms', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        phone: data.phone,
        name: data.studentName,
        date: data.preferredDate,
        time: data.preferredTime,
        zoomUrl: data.zoomJoinUrl,
        demoType: selectedDemoType,
      }),
    })
  } catch (error) {
    console.error('SMS failed:', error)
    // Don't fail booking if SMS fails
  }
}
```

### Update Success Screen (Step 5)

```typescript
{currentStep === 5 && bookingComplete && (
  <div>
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
    >
      <CheckCircle className="w-12 h-12 text-green-600" />
    </motion.div>

    <h2 className="text-3xl font-bold text-gray-900 mb-4 text-center">
      Booking Confirmed! 🎉
    </h2>

    {/* Booking Details Card */}
    <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-6 mb-6">
      <h3 className="font-semibold text-gray-900 mb-4">Your Demo Details</h3>
      <div className="space-y-2 text-gray-700">
        <p><strong>Type:</strong> {selectedDemoType === 'PREMIUM' ? 'Premium' : 'Free'} Demo</p>
        <p><strong>Date:</strong> {bookingData.preferredDate}</p>
        <p><strong>Time:</strong> {bookingData.preferredTime}</p>
        <p><strong>Instructor:</strong> {bookingData.instructor || 'Will be assigned'}</p>
        {bookingData.zoomJoinUrl && (
          <p><strong>Zoom:</strong> Link sent to your email</p>
        )}
      </div>
    </div>

    {/* Calendar Actions */}
    <CalendarActions
      bookingData={{
        studentName: bookingData.studentName,
        email: bookingData.email,
        phone: bookingData.phone,
        preferredDate: bookingData.preferredDate,
        preferredTime: bookingData.preferredTime,
        zoomJoinUrl: bookingData.zoomJoinUrl,
        zoomPassword: bookingData.zoomPassword,
        demoType: selectedDemoType,
      }}
    />

    {/* Referral Share */}
    <div className="mt-6">
      <ReferralShare
        userName={bookingData.studentName}
        userEmail={bookingData.email}
      />
    </div>

    {/* What's Next */}
    <div className="mt-6 bg-blue-50 rounded-xl p-6">
      <h3 className="font-semibold text-gray-900 mb-3">What Happens Next?</h3>
      <ul className="space-y-2 text-gray-700 text-sm">
        <li className="flex items-start gap-2">
          <span className="text-blue-600 font-bold">1.</span>
          <span>Confirmation SMS sent to {bookingData.phone}</span>
        </li>
        <li className="flex items-start gap-2">
          <span className="text-blue-600 font-bold">2.</span>
          <span>Zoom link will be sent 30 minutes before the demo</span>
        </li>
        <li className="flex items-start gap-2">
          <span className="text-blue-600 font-bold">3.</span>
          <span>Our team will call you to confirm details</span>
        </li>
        <li className="flex items-start gap-2">
          <span className="text-blue-600 font-bold">4.</span>
          <span>Prepare your questions and be ready to learn!</span>
        </li>
      </ul>
    </div>

    {/* Need to Reschedule? */}
    <div className="mt-6 text-center">
      <p className="text-gray-600 text-sm mb-2">
        Need to reschedule? Check your email for the reschedule link.
      </p>
      <p className="text-gray-500 text-xs">
        Or call us at{' '}
        <a href="tel:+918826444334" className="text-blue-600 hover:underline">
          +91 88264 44334
        </a>
      </p>
    </div>
  </div>
)}
```

## Step 2: Update \_app.tsx or layout.tsx

Add Razorpay script to your document:

```typescript
// In _app.tsx (Pages Router)
import Script from 'next/script'

export default function App({ Component, pageProps }) {
  return (
    <>
      <Script
        src="https://checkout.razorpay.com/v1/checkout.js"
        strategy="lazyOnload"
      />
      <Component {...pageProps} />
    </>
  )
}

// In layout.tsx (App Router)
import Script from 'next/script'

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Script
          src="https://checkout.razorpay.com/v1/checkout.js"
          strategy="lazyOnload"
        />
      </body>
    </html>
  )
}
```

## Step 3: Update API Route

Modify `/src/app/api/demo-booking/route.ts`:

```typescript
// Add to POST handler
const data = validationResult.data as DemoBookingData

// Save demo booking with new fields
const demoBooking = await prisma.demoBooking.create({
  data: {
    // ... existing fields
    demoType: data.demoType || 'FREE',
    paymentStatus: data.demoType === 'PREMIUM' ? 'PENDING' : 'NOT_REQUIRED',
    referralCodeUsed: data.referralCodeUsed || null,
    referralDiscount: data.referralDiscount || null,
  },
})

// If referral code used, mark as redeemed
if (data.referralCodeUsed) {
  await fetch('/api/referral/validate', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      code: data.referralCodeUsed,
      redeemedBy: data.name,
      redeemedByEmail: data.email,
      bookingId: demoBooking.id,
    }),
  })
}

// Generate reschedule token
const rescheduleResponse = await fetch('/api/demo-booking/reschedule', {
  method: 'PUT',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ bookingId: demoBooking.id }),
})
const { rescheduleUrl } = await rescheduleResponse.json()

// Include in response
return NextResponse.json({
  success: true,
  bookingId: demoBooking.id,
  rescheduleUrl,
})
```

## Step 4: Database Migration

Run the migration to add new tables and fields:

```bash
npx prisma generate
npx prisma db push

# Or for production
npx prisma migrate deploy
```

## Step 5: Environment Variables

Ensure these are set in your environment:

```bash
# Twilio (for SMS)
TWILIO_ACCOUNT_SID="AC..."
TWILIO_AUTH_TOKEN="..."
TWILIO_PHONE_NUMBER="+1..."

# Razorpay (for payments)
NEXT_PUBLIC_RAZORPAY_KEY_ID="rzp_test_..."
RAZORPAY_KEY_SECRET="..."

# Site URL (for reschedule links)
NEXT_PUBLIC_SITE_URL="https://cerebrumbiologyacademy.com"
```

## Step 6: Testing Checklist

- [ ] Free demo booking works
- [ ] Premium demo selection works
- [ ] Referral code can be applied
- [ ] Discount applies correctly to premium price
- [ ] Payment flow works (test card: 4111 1111 1111 1111)
- [ ] SMS confirmation sent
- [ ] Calendar .ics file downloads
- [ ] Google Calendar link works
- [ ] Referral code generated on success
- [ ] Referral sharing works (WhatsApp, copy)
- [ ] Reschedule link generated
- [ ] Reschedule page accessible and functional

## Step 7: Production Deployment

1. Sign up for Twilio and Razorpay
2. Complete KYC verification for Razorpay
3. Update environment variables in Vercel/hosting platform
4. Deploy database migrations
5. Test with real phone number and payment
6. Monitor error logs for first 24 hours

## Common Issues & Solutions

**Issue: Razorpay script not loading**

- Solution: Check that Script component is in \_app.tsx or layout.tsx

**Issue: SMS not sending**

- Solution: Verify Twilio credentials and phone number format (+91...)

**Issue: Payment verification fails**

- Solution: Check RAZORPAY_KEY_SECRET matches the key used for orders

**Issue: Referral code not applying**

- Solution: Check database has ReferralCode and ReferralRedemption tables

**Issue: Calendar file not downloading**

- Solution: Check browser allows downloads, test on different browsers

## Support

For implementation help:

- Review ADVANCED_DEMO_FEATURES.md for detailed documentation
- Check API endpoint responses in browser console
- Test each feature independently before integration

---

**Total Integration Time:** 2-3 hours
**Lines of Code Added:** ~500
**New API Routes:** 6
**New Components:** 4
**Database Tables Added:** 3
