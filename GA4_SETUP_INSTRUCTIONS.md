# 📊 Google Analytics 4 Setup Instructions

## Step-by-Step GA4 Configuration

### 1. Create Google Analytics Account

1. Go to [Google Analytics](https://analytics.google.com)
2. Sign in with your Google account
3. Click "Start measuring"
4. Create Account name: `Cerebrum Biology Academy`

### 2. Set Up Property

1. Property name: `Cerebrum Biology Academy Website`
2. Reporting time zone: `India Standard Time (GMT+05:30)`
3. Currency: `Indian Rupee (₹)`

### 3. Configure Business Information

- Industry: `Education`
- Business size: `Small business (1-100 employees)`
- Goals: Select all that apply:
  - ✅ `Get baseline reports`
  - ✅ `Measure customer engagement`
  - ✅ `Drive online sales`
  - ✅ `Raise brand awareness`

### 4. Set Up Data Stream

1. Choose `Web` platform
2. Website URL: `https://cerebrumbiologyacademy.com`
3. Stream name: `Cerebrum Biology Academy - Main Site`
4. **IMPORTANT:** Copy the Measurement ID (format: `G-XXXXXXXXXX`)

### 5. Configure Enhanced Measurement

Enable these tracking features:

- ✅ Page views
- ✅ Scrolls
- ✅ Outbound clicks
- ✅ Site search
- ✅ Video engagement
- ✅ File downloads

### 6. Set Up Conversion Goals

Create these conversion events:

1. **Demo Booking**: `demo_booking_submit`
2. **Course Enrollment**: `course_enrollment_start`
3. **Contact Form**: `contact_form_submit`
4. **Brochure Download**: `brochure_download`
5. **Newsletter Signup**: `newsletter_signup`

### 7. Configure Audience

Set up audiences for:

- Students (ages 16-20)
- Parents (ages 35-55)
- Location: India
- Interest: Education, NEET, Medical entrance

## 🔧 Technical Implementation

### Environment Variable Setup

Once you get your Measurement ID, update the environment variable:

**For Development (.env.local):**

```bash
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-YOUR-ACTUAL-ID
```

**For Production (Vercel Dashboard):**

```bash
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-YOUR-ACTUAL-ID
```

### Verification Steps

1. Deploy the updated environment variable
2. Visit your website
3. Check Google Analytics Real-time reports
4. Verify page views are being tracked
5. Test demo booking form submission

## 📋 Example Measurement IDs Format

- Development: `G-TEMP-DEV-CONFIG` (current placeholder)
- Production: `G-XXXXXXXXXX` (replace with your actual ID)

Example real IDs look like:

- `G-1A2B3C4D5E`
- `G-ABCD123456`
- `G-XYZ9876543`

## ✅ Completion Checklist

- [ ] Google Analytics account created
- [ ] Property configured for cerebrumbiologyacademy.com
- [ ] Measurement ID obtained (G-XXXXXXXXXX format)
- [ ] Enhanced measurement enabled
- [ ] Conversion goals set up
- [ ] Environment variable updated in Vercel
- [ ] Tracking verified in Real-time reports

## 🎯 Expected Results

After setup, you should see:

- Real-time visitor tracking
- Page view analytics
- Demo booking conversion tracking
- Geographic data (primarily India)
- Device breakdown (mobile/desktop)
- Traffic sources (organic, direct, referral)

**Estimated Setup Time: 5-10 minutes**
