# Google Analytics 4 Setup Guide for Cerebrum Biology Academy

## 🎯 Overview

This guide will help you set up Google Analytics 4 (GA4) properly for the Cerebrum Biology Academy website with education-specific tracking, conversion goals, and audience segmentation.

## 📋 Step-by-Step Setup Instructions

### 1. Create Google Analytics Account

1. Go to [Google Analytics](https://analytics.google.com/)
2. Click "Start measuring" or sign in with your Google account
3. Create Account:
   - **Account Name**: `Cerebrum Biology Academy`
   - **Country**: India
   - **Currency**: Indian Rupee (INR)
   - **Industry Category**: Education
   - **Business Size**: Small business (1-100 employees)

### 2. Create GA4 Property

1. **Property Name**: `Cerebrum Biology Academy - Main Website`
2. **Reporting Time Zone**: `(GMT+05:30) Asia/Kolkata`
3. **Currency**: `Indian Rupee (₹)`
4. **Industry Category**: `Education`
5. **Business Size**: `Small business`

### 3. Set up Data Stream

1. Choose **Web** platform
2. **Website URL**: `https://cerebrumbiologyacademy.com`
3. **Stream Name**: `Cerebrum Biology Academy Website`
4. **Enhanced Measurement**: Enable all options:
   - ✅ Page views
   - ✅ Scrolls
   - ✅ Outbound clicks
   - ✅ Site search
   - ✅ Video engagement
   - ✅ File downloads

### 4. Configure Custom Dimensions

Navigate to **Configure > Custom Definitions > Custom Dimensions** and create:

| Dimension Name  | Scope | Event Parameter | Description                          |
| --------------- | ----- | --------------- | ------------------------------------ |
| Student Class   | Event | student_class   | Class 11, 12, or Dropper             |
| Course Interest | Event | course_interest | NEET Biology, Medical Entrance, etc. |
| Traffic Source  | Event | traffic_source  | Organic, Paid, Social, etc.          |
| Device Type     | Event | device_type     | Mobile, Desktop, Tablet              |
| Location City   | Event | location_city   | Mumbai, Delhi, Bangalore, etc.       |
| User Type       | Event | user_type       | Student, Parent, Teacher             |
| Payment Method  | Event | payment_method  | Razorpay, UPI, Card, etc.            |
| Course Bundle   | Event | course_bundle   | Basic, Premium, Ultimate             |

### 5. Set up Conversion Events

Navigate to **Configure > Events** and mark these as conversions:

1. **course_enrollment** - When student enrolls in a course
2. **demo_booking** - When user books a demo class
3. **contact_form_submit** - Contact form submissions
4. **newsletter_signup** - Newsletter subscriptions
5. **brochure_download** - When user downloads course brochure
6. **phone_call_click** - Phone number clicks
7. **whatsapp_click** - WhatsApp button clicks
8. **video_completion** - Demo video completions

### 6. Create Audiences

Navigate to **Configure > Audiences** and create:

#### High-Intent Audiences:

- **NEET Aspirants Class 11**: student_class = "11" AND course_interest contains "NEET"
- **NEET Aspirants Class 12**: student_class = "12" AND course_interest contains "NEET"
- **Droppers**: student_class = "Dropper"
- **Parents**: user_type = "Parent"

#### Behavioral Audiences:

- **High Engagement**: session_duration > 3 minutes AND pages_per_session > 5
- **Demo Attendees**: demo_booking event in last 30 days
- **Course Viewers**: course_view event in last 7 days
- **Pricing Page Visitors**: page_location contains "/pricing"

### 7. Configure Goals and Funnels

#### Education Funnel:

1. **Landing Page** → 2. **Course Pages** → 3. **Pricing/Demo** → 4. **Enrollment**

#### Conversion Goals:

- **Primary**: Course Enrollment (₹15,000+ value)
- **Secondary**: Demo Booking (₹500 estimated value)
- **Tertiary**: Contact Form (₹200 estimated value)

### 8. Google Ads Integration

1. Link GA4 to Google Ads account
2. Import conversions from GA4
3. Set up Enhanced Conversions
4. Create remarketing audiences

## 🔧 Implementation Code

After completing the setup, you'll get a **Measurement ID** (format: G-XXXXXXXXXX).

Update your `.env.local` file:

```bash
# Replace with your actual GA4 Measurement ID
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX

# Google Tag Manager (optional but recommended)
NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX

# API Secret for server-side events (from GA4 Admin > Data Streams)
GA_API_SECRET=your-measurement-protocol-secret
```

## 📊 Education-Specific Tracking Events

Our current implementation automatically tracks:

### Course-Related Events:

```javascript
// Course page views
gtag('event', 'course_view', {
  course_id: 'neet-biology-class-11',
  course_name: 'NEET Biology Class 11',
  course_price: 15000,
  student_class: '11',
})

// Demo booking
gtag('event', 'demo_booking', {
  subject: 'Biology',
  student_class: '12',
  preferred_time: 'evening',
  value: 500,
})

// Course enrollment
gtag('event', 'course_enrollment', {
  transaction_id: 'enroll_1234567890',
  value: 15000,
  currency: 'INR',
  items: [
    {
      item_id: 'neet-biology-premium',
      item_name: 'NEET Biology Premium Course',
      item_category: 'Online Course',
      price: 15000,
      quantity: 1,
    },
  ],
})
```

### Content Engagement:

```javascript
// Video engagement
gtag('event', 'video_progress', {
  video_title: 'Cell Biology Introduction',
  video_duration: 300,
  progress_percentage: 50,
})

// Resource downloads
gtag('event', 'file_download', {
  file_name: 'NEET Biology Syllabus 2024.pdf',
  file_type: 'PDF',
  link_text: 'Download Syllabus',
})
```

## 🎯 Google Ads Campaign Setup

### Search Campaigns:

**Budget**: ₹500/day (₹15,000/month)
**Target CPA**: ₹2,000 per enrollment

**Keywords**:

- NEET biology coaching
- Online biology classes
- Medical entrance coaching
- NEET preparation online
- Biology coaching institute
- AIIMS coaching biology

### Display Campaigns:

**Budget**: ₹300/day (₹9,000/month)
**Target CPM**: ₹100 per 1000 impressions

**Audiences**:

- NEET aspirants
- Medical entrance students
- Education seekers
- Similar to existing customers

## 📈 Expected Results

### Month 1-3 Targets:

- **Traffic**: 10,000+ monthly visitors
- **Demo Bookings**: 100+ per month
- **Course Enrollments**: 20+ per month
- **Conversion Rate**: 2-5%
- **Cost per Enrollment**: ₹1,500-2,500

### Success Metrics:

- **ROAS (Return on Ad Spend)**: 5:1 minimum
- **Student Lifetime Value**: ₹75,000+
- **Retention Rate**: 90%+
- **Demo-to-Enrollment**: 20%+

## 🔒 Privacy & Compliance

### GDPR/Privacy Compliance:

- Cookie consent banner implemented
- Data retention set to 26 months
- IP anonymization enabled
- User deletion requests handled

### Data Sharing:

- Google Ads: Enabled for remarketing
- Other Google services: Disabled
- Benchmark data: Enabled (anonymous)

## 📞 Next Steps

1. **Complete GA4 Setup** (30 minutes)
2. **Test tracking with real data** (1 day)
3. **Set up Google Ads account** (1 hour)
4. **Create first ad campaigns** (2 hours)
5. **Monitor and optimize** (ongoing)

## 🆘 Support

If you need help with the setup:

- **Google Analytics Support**: support.google.com/analytics
- **Our Implementation**: Already configured and ready to use
- **Testing**: Use GA4 DebugView to verify events

---

**Remember**: The tracking code is already implemented. You just need to:

1. Create the GA4 property
2. Get your Measurement ID
3. Update the environment variable
4. Deploy the changes

The education-specific tracking, conversion goals, and audience segmentation will work automatically once the real Measurement ID is configured!
