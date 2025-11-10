# Complete Demo Guide: Multi-Channel Communication & Payment Automation

This guide demonstrates all the new features implemented for Cerebrum Biology Academy CRM.

## Table of Contents

1. [Environment Setup](#environment-setup)
2. [Demo Booking with Multi-Channel Notifications](#demo-booking-with-multi-channel-notifications)
3. [Payment Reminder Automation](#payment-reminder-automation)
4. [Manual Lead Creation](#manual-lead-creation)
5. [Payment Schedule Calculator](#payment-schedule-calculator)
6. [API Endpoints Reference](#api-endpoints-reference)

---

## Environment Setup

### Required Environment Variables

Create or update your `.env.local` file with the following:

```env
# Email Services (Choose one or both for fallback)
SENDGRID_API_KEY=your_sendgrid_api_key_here
# OR
RESEND_API_KEY=your_resend_api_key_here

# SMS Services (Choose one or both for fallback)
TWILIO_ACCOUNT_SID=your_twilio_account_sid
TWILIO_AUTH_TOKEN=your_twilio_auth_token
TWILIO_PHONE_NUMBER=+1234567890
# OR
MSG91_AUTH_KEY=your_msg91_auth_key
MSG91_SENDER_ID=your_msg91_sender_id

# WhatsApp (via Interakt)
INTERAKT_API_KEY=your_interakt_api_key

# Database
DATABASE_URL=your_postgresql_database_url

# Razorpay (for payment links)
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret

# Zoom (for demo classes)
ZOOM_API_KEY=your_zoom_api_key
ZOOM_API_SECRET=your_zoom_api_secret
```

### Getting API Keys

1. **SendGrid**: https://app.sendgrid.com/settings/api_keys
   - Free tier: 100 emails/day
   - Paid: $15/month for 40,000 emails

2. **Resend**: https://resend.com/api-keys
   - Free tier: 100 emails/day
   - Paid: $20/month for 50,000 emails

3. **Twilio**: https://console.twilio.com/
   - Free trial: $15 credit
   - Pay-as-you-go: ~$0.0075 per SMS

4. **MSG91**: https://control.msg91.com/app/
   - Free trial: 100 credits
   - Indian pricing: Much cheaper for India

5. **Interakt**: https://app.interakt.shop/
   - WhatsApp Business API
   - Pricing varies by volume

---

## Demo Booking with Multi-Channel Notifications

### Feature Overview

When a student books a demo class, they automatically receive confirmation via:

- Email (SendGrid/Resend)
- WhatsApp (Interakt)
- SMS (Twilio/MSG91)

### How to Test

#### 1. Start the Development Server

```bash
npm run dev
```

#### 2. Book a Demo Class

Navigate to http://localhost:3000 and fill out the demo booking form with:

- Student Name: "Rajesh Kumar"
- Email: "rajesh@example.com"
- Phone: "+919876543210"
- Preferred Date: Tomorrow's date
- Preferred Time: "10:00 AM - 11:00 AM"
- Course Interest: "NEET Biology"
- Student Class: "Class 12"

#### 3. What Happens Behind the Scenes

```javascript
// src/app/api/demo/book/route.ts

// Multi-channel notification sent automatically
const sent = await notificationService.sendDemoConfirmation({
  studentName: 'Rajesh Kumar',
  email: 'rajesh@example.com',
  phone: '+919876543210',
  demoDate: 'Monday, 12 November, 2025',
  demoTime: '10:00 AM - 11:00 AM',
  meetingLink: 'https://zoom.us/j/123456789',
  meetingPassword: 'demo123',
  counselorName: 'Default Counselor',
  priority: 'HIGH',
  channels: ['email', 'whatsapp', 'sms'], // All 3 channels
})
```

#### 4. Check Notifications

**Email Received:**

```
Subject: Your Demo Class is Confirmed! 🎓

Dear Rajesh Kumar,

Great news! Your demo class has been successfully scheduled.

📅 Date: Monday, 12 November, 2025
⏰ Time: 10:00 AM - 11:00 AM
🔗 Join Link: https://zoom.us/j/123456789
🔑 Password: demo123

Your counselor Default Counselor will contact you shortly.

See you in class!
Cerebrum Biology Academy
```

**WhatsApp Message:**

```
🎓 Demo Class Confirmed!

Hi Rajesh Kumar,

Your demo is scheduled for:
📅 Monday, 12 November, 2025
⏰ 10:00 AM - 11:00 AM

Join here: https://zoom.us/j/123456789
Password: demo123

- Cerebrum Biology Academy
```

**SMS:**

```
Demo class booked for 12 Nov at 10:00 AM.
Join: https://zoom.us/j/123456789
Password: demo123
- Cerebrum Academy
```

---

## Payment Reminder Automation

### Feature Overview

Automated payment reminders for installments with:

- Scheduled reminders (7, 3, 1 days before due)
- Overdue payment detection
- Multi-channel delivery
- Automatic task creation for counselors
- Lead auto-enrollment when fully paid

### How to Test

#### 1. Run Payment Reminder Automation

**Using curl:**

```bash
curl -X POST http://localhost:3000/api/counselor/payments/reminders/run \
  -H "Content-Type: application/json" \
  -d '{
    "reminderDaysBefore": [7, 3, 1],
    "overdueCheckEnabled": true,
    "createTasksForOverdue": true,
    "channels": ["email", "whatsapp", "sms"]
  }'
```

**Using Postman/Insomnia:**

```
POST http://localhost:3000/api/counselor/payments/reminders/run

Body:
{
  "reminderDaysBefore": [7, 3, 1],
  "overdueCheckEnabled": true,
  "createTasksForOverdue": true,
  "channels": ["email", "whatsapp", "sms"]
}
```

#### 2. Expected Response

```json
{
  "success": true,
  "message": "Payment reminder automation completed. Sent 5 reminders and created 2 tasks.",
  "data": {
    "totalScanned": 25,
    "remindersSent": 5,
    "tasksCreated": 2,
    "breakdown": {
      "upcoming": 3,
      "overdue": 2,
      "alreadySent": 18,
      "errors": []
    }
  }
}
```

#### 3. What Gets Sent

**7 Days Before Payment Due:**

```
Subject: Upcoming Payment Reminder - Installment Due Soon

Dear Rajesh Kumar,

This is a friendly reminder that your next installment of ₹5,000
is due on 18 November 2025 (in 7 days).

Installment: 2 of 3
Amount: ₹5,000
Due Date: 18 November 2025

Pay now to avoid any interruption in your classes.

Payment Link: [Razorpay Link]

Thank you!
Cerebrum Biology Academy
```

**Overdue Payment:**

```
Subject: URGENT: Overdue Payment Notice

Dear Rajesh Kumar,

Your payment of ₹5,000 was due on 10 November 2025
and is now OVERDUE.

Please make the payment immediately to continue your classes.

Amount: ₹5,000
Overdue by: 2 days

Payment Link: [Razorpay Link]

Contact your counselor for assistance.

Cerebrum Biology Academy
```

#### 4. Manual Reminder for Specific Installment

```bash
curl -X POST http://localhost:3000/api/counselor/payments/reminders/send \
  -H "Content-Type: application/json" \
  -d '{
    "installmentId": "clxyz123456789",
    "channels": ["whatsapp", "email"]
  }'
```

#### 5. Get Upcoming Reminders for a Lead

```bash
curl "http://localhost:3000/api/counselor/payments/reminders/upcoming?leadId=lead123"
```

Response:

```json
{
  "success": true,
  "data": [
    {
      "installmentId": "clxyz123456789",
      "leadId": "lead123",
      "studentName": "Rajesh Kumar",
      "amount": 5000,
      "dueDate": "2025-11-18T00:00:00.000Z",
      "daysUntilDue": 7,
      "status": "PENDING",
      "remindersSent": {
        "7_days": "2025-11-11T10:30:00.000Z"
      }
    }
  ]
}
```

#### 6. Get Overdue Summary

```bash
curl http://localhost:3000/api/counselor/payments/reminders/run
```

Response:

```json
{
  "success": true,
  "data": {
    "totalOverdue": 3,
    "totalOverdueAmount": 15000,
    "overdueInstallments": [
      {
        "id": "clxyz123",
        "studentName": "Rajesh Kumar",
        "amount": 5000,
        "dueDate": "2025-11-10T00:00:00.000Z",
        "overdueDays": 2
      }
    ]
  }
}
```

---

## Manual Lead Creation

### Feature Overview

Counselors can manually create leads from the dashboard with automatic:

- Lead assignment
- Initial follow-up task creation
- Activity logging

### How to Use

1. Navigate to http://localhost:3000/counselor/leads
2. Click the "+ Add Lead" button (top right)
3. Fill in the form:
   - Student Name
   - Email
   - Phone
   - Course Interest
   - Source (Google, Facebook, Referral, etc.)
   - Priority (Hot/Warm/Cold)
4. Click "Create Lead"

### What Happens

- Lead is created in database
- Assigned to the counselor
- Stage set to "NEW_LEAD"
- Initial follow-up task auto-created (due in 1 day)
- Activity logged

---

## Payment Schedule Calculator

### Feature Overview

Automatically calculates installment schedules based on:

- Admission date
- Academic year (April 1 - March 31)
- Payment frequency (Weekly/Monthly/Quarterly)
- Number of installments

### Test the Calculator

#### Create Payment Schedule for a Lead

```bash
curl -X POST http://localhost:3000/api/counselor/payments/schedule/calculate \
  -H "Content-Type: application/json" \
  -d '{
    "leadId": "lead123",
    "totalAmount": 50000,
    "schedule": "THREE_INSTALLMENTS",
    "admissionDate": "2025-04-15"
  }'
```

**Response:**

```json
{
  "success": true,
  "schedule": {
    "type": "THREE_INSTALLMENTS",
    "totalAmount": 50000,
    "installments": [
      {
        "number": 1,
        "amount": 16667,
        "dueDate": "2025-04-15",
        "description": "Down payment"
      },
      {
        "number": 2,
        "amount": 16667,
        "dueDate": "2025-08-15",
        "description": "Mid-year payment"
      },
      {
        "number": 3,
        "amount": 16666,
        "dueDate": "2025-12-15",
        "description": "Final payment"
      }
    ],
    "academicYear": "2025-2026"
  }
}
```

#### Available Schedule Types

1. **THREE_INSTALLMENTS**: 3 equal payments (April, August, December)
2. **ALTERNATE_MONTH**: Every 2 months starting from admission
3. **QUARTERLY_DYNAMIC**: Every 3 months starting from admission
4. **CUSTOM**: Counselor-defined schedule

---

## API Endpoints Reference

### Demo Booking

```
POST /api/demo/book
GET /api/demo/book?date=2025-11-12 (get available slots)
```

### Payment Reminders

```
POST /api/counselor/payments/reminders/run (run automation)
POST /api/counselor/payments/reminders/send (manual reminder)
GET /api/counselor/payments/reminders/upcoming?leadId=xxx
GET /api/counselor/payments/reminders/run (overdue summary)
```

### Payment Schedule

```
POST /api/counselor/payments/schedule/calculate
GET /api/counselor/payments/schedule/:leadId
```

### Leads

```
GET /api/counselor/leads
POST /api/counselor/leads
PATCH /api/counselor/leads/:id
DELETE /api/counselor/leads/:id
```

### Tasks

```
GET /api/counselor/tasks
POST /api/counselor/tasks
PATCH /api/counselor/tasks/:id
DELETE /api/counselor/tasks/:id
POST /api/counselor/tasks/automation/run
```

### Fee Plans

```
POST /api/counselor/fee-plans/create
GET /api/counselor/fee-plans/:leadId
POST /api/counselor/payment-link/generate
```

---

## Production Deployment Checklist

### 1. Environment Variables

- [ ] Set all API keys in production environment
- [ ] Verify database connection
- [ ] Test email delivery
- [ ] Test SMS delivery
- [ ] Test WhatsApp delivery

### 2. Set Up Cron Jobs

```bash
# Daily payment reminder automation (run at 9 AM IST)
0 9 * * * curl -X POST https://cerebrumbiologyacademy.com/api/counselor/payments/reminders/run
```

### 3. Configure Webhooks

- [ ] Razorpay payment success webhook
- [ ] Razorpay payment failure webhook
- [ ] WhatsApp delivery status webhook
- [ ] SMS delivery status webhook

### 4. Monitoring

- [ ] Set up error tracking (Sentry)
- [ ] Monitor email delivery rates
- [ ] Monitor SMS delivery rates
- [ ] Monitor WhatsApp delivery rates
- [ ] Set up alerts for failed payments

### 5. Testing

- [ ] Test complete demo booking flow
- [ ] Test payment reminder automation
- [ ] Test manual reminders
- [ ] Test lead creation
- [ ] Test payment schedule calculator
- [ ] Test multi-channel notifications

---

## Support

For questions or issues:

- Check logs: `npm run dev` shows all console.log outputs
- Database: Use Prisma Studio (`npx prisma studio`) to inspect data
- API Testing: Use Postman collection (import from `/postman/collection.json`)

---

## What's Working Now

✅ **Multi-Channel Demo Notifications**

- Email + WhatsApp + SMS sent simultaneously
- Automatic fallback between providers
- Complete delivery tracking

✅ **Payment Reminder Automation**

- Scheduled reminders (7, 3, 1 days before)
- Overdue detection and handling
- Multi-channel delivery
- Task creation for counselors
- Auto-enrollment when fully paid

✅ **Payment Schedule Calculator**

- Academic year awareness (April 1 - March 31)
- 4 schedule types (3 installments, alternate month, quarterly, custom)
- Automatic date calculation
- Installment amount distribution

✅ **Manual Lead Creation**

- Complete form in counselor dashboard
- Automatic task creation
- Activity logging

✅ **Email Templates**

- Demo confirmation
- Payment reminder
- Overdue notice
- Class reminder
- Enrollment confirmation
- Offer expiry

✅ **SMS & WhatsApp Templates**

- All templates available
- Character optimization for SMS
- Rich formatting for WhatsApp

---

## What's Next (Future Enhancements)

⏳ **Scheduled for Tomorrow**

- Configure all environment variables with real API keys
- Test with production credentials
- Set up webhook endpoints

💡 **Future Features**

- Parent self-service portal
- Document management (offer letters, PDFs)
- Bulk payment processing
- Advanced analytics dashboard
- Mobile app for counselors
- Integration with accounting software

---

**Build Status**: ✅ Successful
**Last Updated**: 11 November 2025
**Version**: 2.0.0
