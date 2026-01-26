# Deployment Checklist - Advanced Demo Features

Use this checklist to deploy the 5 advanced demo booking features to production.

## Pre-Deployment (Development Environment)

### 1. Dependencies Installation ✅

- [x] Installed `ics` package
- [x] Installed `twilio` package
- [x] Razorpay package already present
- [ ] Run `npm install` to verify all dependencies

### 2. Database Setup ✅

- [x] Updated Prisma schema with new models
- [x] Generated Prisma client
- [ ] Review schema changes in `/prisma/schema.prisma`
- [ ] Run `npx prisma generate` if needed
- [ ] Run `npx prisma db push` to sync database (DEVELOPMENT ONLY)

### 3. Code Review ✅

- [x] Created calendar service (`/src/lib/calendar/calendarService.ts`)
- [x] Created SMS API route (`/src/app/api/notifications/sms/route.ts`)
- [x] Created referral API routes (generate, validate)
- [x] Created payment API routes (create-order, verify)
- [x] Created reschedule API route + page
- [x] Created UI components (4 total)
- [x] Formatted all files with Prettier
- [ ] Review all new files in your IDE

### 4. Environment Variables (Development) ⚠️

- [ ] Add Twilio credentials to `.env.local`:
  ```
  TWILIO_ACCOUNT_SID="AC..."
  TWILIO_AUTH_TOKEN="..."
  TWILIO_PHONE_NUMBER="+1234567890"
  ```
- [ ] Add Razorpay credentials to `.env.local`:
  ```
  NEXT_PUBLIC_RAZORPAY_KEY_ID="rzp_test_..."
  RAZORPAY_KEY_SECRET="..."
  ```
- [ ] Verify `NEXT_PUBLIC_SITE_URL` is set

---

## Testing (Development Environment)

### 5. Feature Testing

#### Calendar Integration

- [ ] Book a demo (any type)
- [ ] Click "Download .ics" on success screen
- [ ] Verify file downloads
- [ ] Open file in calendar app
- [ ] Verify all details correct (date, time, title)
- [ ] Click "Google Calendar" button
- [ ] Verify redirects to Google Calendar with pre-filled data

#### SMS Notifications

- [ ] Book a demo with YOUR phone number
- [ ] Verify SMS received within 30 seconds
- [ ] Check SMS formatting is correct
- [ ] Verify name, date, time appear correctly
- [ ] Test with invalid phone number → Should fail gracefully

#### Referral System

- [ ] On success screen, verify referral code generated
- [ ] Copy referral code
- [ ] Start new booking, apply referral code
- [ ] Verify "₹500 discount applied" message
- [ ] Complete booking with referral
- [ ] Try using same code with same email → Should fail
- [ ] Try invalid code → Should show error
- [ ] Click WhatsApp share → Verify message pre-filled

#### Payment Integration

- [ ] Select "Premium Demo" option
- [ ] Verify price shows ₹99
- [ ] Apply referral code
- [ ] Verify price updates (₹99 - ₹500 = FREE or partial)
- [ ] Submit booking
- [ ] Verify Razorpay payment modal opens
- [ ] Use test card: `4111 1111 1111 1111`
- [ ] Complete payment
- [ ] Verify success screen appears
- [ ] Check database: `paymentStatus = 'COMPLETED'`

**Test Cards:**

- Success: `4111 1111 1111 1111`
- Failure: `4111 1111 1111 1112`
- CVV: Any 3 digits
- Expiry: Any future date

#### Rescheduling Portal

- [ ] Book a demo
- [ ] Call API to generate reschedule link:
  ```bash
  curl -X PUT http://localhost:3000/api/demo-booking/reschedule \
    -H "Content-Type: application/json" \
    -d '{"bookingId": "YOUR_BOOKING_ID"}'
  ```
- [ ] Copy `rescheduleUrl` from response
- [ ] Open URL in browser
- [ ] Verify booking details shown correctly
- [ ] Select new date and time
- [ ] Submit reschedule
- [ ] Verify success message
- [ ] Check database: `status = 'RESCHEDULED'`
- [ ] Try using same link again → Should fail (one-time use)

### 6. Integration Testing

- [ ] Book free demo → Calendar + SMS + Referral code
- [ ] Book premium demo → Payment + Calendar + SMS + Referral code
- [ ] Book with referral code → Discount applies + Redemption tracked
- [ ] Complete flow from start to finish without errors

---

## Pre-Production Setup

### 7. External Service Accounts

#### Twilio Account

- [ ] Sign up at https://www.twilio.com
- [ ] Verify your phone number
- [ ] Purchase a phone number ($1/month)
- [ ] Add funds to account ($20 minimum recommended)
- [ ] Copy Account SID
- [ ] Copy Auth Token
- [ ] Copy Phone Number
- [ ] Test SMS from Twilio Console

#### Razorpay Account

- [ ] Sign up at https://razorpay.com
- [ ] Complete KYC verification (required for live mode)
- [ ] Wait for approval (1-3 business days)
- [ ] Get Test API Keys (for testing)
- [ ] Get Live API Keys (after KYC approval)
- [ ] Configure webhook URL (optional but recommended)

### 8. Production Environment Variables

#### Vercel Dashboard (or your hosting platform)

- [ ] Navigate to Project Settings → Environment Variables
- [ ] Add production Twilio credentials:
  ```
  TWILIO_ACCOUNT_SID = "AC..." (production value)
  TWILIO_AUTH_TOKEN = "..." (production value)
  TWILIO_PHONE_NUMBER = "+1..." (production value)
  ```
- [ ] Add production Razorpay credentials:
  ```
  NEXT_PUBLIC_RAZORPAY_KEY_ID = "rzp_live_..." (production value)
  RAZORPAY_KEY_SECRET = "..." (production value)
  RAZORPAY_WEBHOOK_SECRET = "whsec_..." (optional)
  ```
- [ ] Verify `NEXT_PUBLIC_SITE_URL` points to production:
  ```
  NEXT_PUBLIC_SITE_URL = "https://cerebrumbiologyacademy.com"
  ```

### 9. Database Migration (Production)

**⚠️ CRITICAL: Backup database before migrating**

- [ ] Create database backup:
  ```bash
  # If using Supabase/PostgreSQL
  pg_dump $DATABASE_URL > backup_$(date +%Y%m%d).sql
  ```
- [ ] Test migration locally first
- [ ] Review migration SQL:
  ```bash
  npx prisma migrate diff --from-schema-datamodel prisma/schema.prisma
  ```
- [ ] Apply migration to production:
  ```bash
  npx prisma migrate deploy
  ```
- [ ] Verify new tables created:
  - `referral_codes`
  - `referral_redemptions`
  - `reschedule_tokens`
- [ ] Verify `demo_bookings` table has new columns:
  - `demoType`
  - `paymentStatus`
  - `paymentAmount`
  - `razorpayOrderId`
  - `razorpayPaymentId`
  - `paymentCompletedAt`
  - `referralCodeUsed`
  - `referralDiscount`

---

## Deployment

### 10. Code Deployment

#### Via Git (Vercel auto-deploys)

- [ ] Commit all changes:

  ```bash
  git add .
  git commit -m "feat: add advanced demo booking features

  - Calendar integration (.ics download)
  - SMS confirmations via Twilio
  - Referral system (generate, validate, share)
  - Premium demo payments via Razorpay
  - Self-service rescheduling portal

  Includes 6 new API routes, 4 new components, 3 new DB models"
  ```

- [ ] Push to main/production branch:
  ```bash
  git push origin main
  ```
- [ ] Monitor Vercel deployment dashboard
- [ ] Wait for successful build
- [ ] Check deployment logs for errors

#### Or Manual Deploy

- [ ] Run `npm run build` locally
- [ ] Fix any build errors
- [ ] Deploy via your hosting platform's CLI/dashboard

### 11. Post-Deployment Verification (Production)

#### Smoke Tests

- [ ] Visit production URL
- [ ] Navigate to demo booking page
- [ ] Verify page loads without errors
- [ ] Check browser console for errors
- [ ] Test on mobile device

#### Feature Tests (Production)

- [ ] Book a REAL free demo with YOUR phone number
- [ ] Verify SMS received
- [ ] Download calendar file
- [ ] Verify referral code generated
- [ ] Share referral code via WhatsApp (check message)

- [ ] Book a REAL premium demo (₹99)
- [ ] Use test card OR real card (be prepared to pay)
- [ ] Verify payment success
- [ ] Check Razorpay dashboard for transaction

- [ ] Apply referral code in new booking
- [ ] Verify discount applied correctly
- [ ] Complete booking

- [ ] Generate reschedule link
- [ ] Open link in incognito window
- [ ] Reschedule booking
- [ ] Verify database updated

---

## Monitoring (First 24 Hours)

### 12. Error Monitoring

- [ ] Check Vercel logs for errors
- [ ] Monitor Twilio dashboard for SMS failures
- [ ] Monitor Razorpay dashboard for payment issues
- [ ] Check database for unexpected data

### 13. Usage Tracking

- [ ] Track number of premium demo selections
- [ ] Track number of referral codes applied
- [ ] Track calendar downloads
- [ ] Track SMS delivery success rate
- [ ] Track payment success rate
- [ ] Track reschedule link clicks

### 14. User Feedback

- [ ] Monitor support emails/calls
- [ ] Check for user complaints
- [ ] Gather feedback on new features
- [ ] Document any issues

---

## Rollback Plan (If Needed)

### 15. Emergency Rollback

If critical issues occur:

1. **Immediate Actions**
   - [ ] Revert deployment to previous version
   - [ ] Disable premium demo option (if payment issues)
   - [ ] Disable referral system (if abuse detected)

2. **Code Rollback**

   ```bash
   git revert HEAD
   git push origin main
   ```

3. **Database Rollback** (if needed)

   ```bash
   # Restore from backup
   psql $DATABASE_URL < backup_YYYYMMDD.sql
   ```

4. **Notify Team**
   - [ ] Alert team about rollback
   - [ ] Document issues encountered
   - [ ] Plan fix and re-deployment

---

## Success Metrics (Track for 30 Days)

### 16. KPIs to Monitor

- [ ] **Calendar Adoption:** Target 60%
  - Formula: (Calendar downloads / Total bookings) × 100

- [ ] **Premium Conversion:** Target 15%
  - Formula: (Premium bookings / Total bookings) × 100

- [ ] **Referral Usage:** Target 20%
  - Formula: (Bookings with referral / Total bookings) × 100

- [ ] **Reschedule Rate:** Target 10%
  - Formula: (Reschedules via portal / Total bookings) × 100

- [ ] **SMS Delivery:** Target >95%
  - Formula: (Delivered SMS / Total SMS sent) × 100

- [ ] **Payment Success:** Target >98%
  - Formula: (Successful payments / Total attempts) × 100

---

## Documentation

### 17. Team Documentation

- [ ] Share `ADVANCED_DEMO_FEATURES.md` with team
- [ ] Share `INTEGRATION_GUIDE.md` with developers
- [ ] Share `FEATURE_SUMMARY.md` with stakeholders
- [ ] Update internal wiki/documentation
- [ ] Train support team on new features

### 18. User Documentation

- [ ] Update booking page with feature highlights
- [ ] Create FAQ section for premium demos
- [ ] Create help docs for rescheduling
- [ ] Add referral program page
- [ ] Update email templates with new info

---

## Maintenance Schedule

### 19. Ongoing Maintenance

**Daily (First Week)**

- [ ] Check SMS delivery logs
- [ ] Review payment transactions
- [ ] Monitor error rates

**Weekly (First Month)**

- [ ] Analyze premium conversion rate
- [ ] Review referral code usage patterns
- [ ] Check for abuse/fraud
- [ ] Optimize pricing if needed

**Monthly (Ongoing)**

- [ ] Generate performance reports
- [ ] Review and update success metrics
- [ ] Plan feature improvements
- [ ] Evaluate ROI

---

## Completion

### 20. Sign-Off

Once all checks pass:

- [ ] All features tested in production
- [ ] No critical errors in logs
- [ ] SMS sending successfully
- [ ] Payments processing correctly
- [ ] Referral system working
- [ ] Calendar downloads working
- [ ] Rescheduling functional
- [ ] Team trained
- [ ] Documentation complete

**Deployment Date:** **\*\***\_\_\_**\*\***
**Deployed By:** **\*\***\_\_\_**\*\***
**Verified By:** **\*\***\_\_\_**\*\***

---

## Support Contacts

**Technical Issues:**

- Developer: [Your Name]
- Email: dev@cerebrumbiologyacademy.com

**Third-Party Services:**

- Twilio Support: https://support.twilio.com
- Razorpay Support: https://razorpay.com/support

**Emergency Contact:**

- Phone: +91 88264 44334
- Email: support@cerebrumbiologyacademy.com

---

**Checklist Version:** 1.0.0
**Last Updated:** October 30, 2025
**Next Review:** After first production deployment
