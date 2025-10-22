# WhatsApp AI Bot Setup Guide

Complete setup guide for Cerebrum Biology Academy's WhatsApp AI Bot - 24/7 automated student support system.

## Table of Contents

1. [Overview](#overview)
2. [Prerequisites](#prerequisites)
3. [WhatsApp Business API Setup](#whatsapp-business-api-setup)
4. [Environment Configuration](#environment-configuration)
5. [Webhook Configuration](#webhook-configuration)
6. [Database Setup](#database-setup)
7. [Deployment](#deployment)
8. [Testing](#testing)
9. [Troubleshooting](#troubleshooting)
10. [Monitoring & Analytics](#monitoring--analytics)

---

## Overview

### Features Implemented

✅ **24/7 AI-Powered Support**

- Automatic biology question answering
- NCERT reference integration
- Context-aware conversations
- Session management (30-minute timeout)

✅ **Command System**

- `HELP/MENU` - Show available commands
- `DEMO` - Automated demo booking flow
- `TEST` - Practice test links
- `STATUS` - Enrollment status check
- `SUPPORT` - Human support contact

✅ **Demo Booking Automation**

- Multi-step conversation flow
- Class selection (11th/12th/Dropper)
- Time slot booking
- Database integration
- Confirmation messages

✅ **Security & Performance**

- Rate limiting (10 messages/minute per user)
- Webhook signature validation
- Duplicate message prevention
- Error handling with graceful fallbacks

✅ **Analytics & Logging**

- Message interaction tracking
- AI response metrics
- Demo booking conversion tracking
- Session analytics

---

## Prerequisites

### Required Accounts

1. **Meta Business Account** (for WhatsApp Business API)
   - Go to: https://business.facebook.com
   - Create business account
   - Verify business

2. **WhatsApp Business API Access**
   - Apply at: https://developers.facebook.com/docs/whatsapp/cloud-api/get-started
   - Or use providers like:
     - Twilio WhatsApp API
     - MessageBird
     - 360dialog
     - Gupshup

3. **Anthropic API Key** (for AI responses)
   - Sign up at: https://console.anthropic.com
   - Generate API key
   - Claude Sonnet 4 recommended

### System Requirements

- Node.js 18+
- PostgreSQL database
- HTTPS-enabled domain (required for webhooks)
- Vercel/production deployment

---

## WhatsApp Business API Setup

### Step 1: Create WhatsApp Business App

1. Go to [Meta for Developers](https://developers.facebook.com)
2. Click **Create App** → Select **Business**
3. Fill in app details:
   - **App Name:** Cerebrum Biology Bot
   - **Contact Email:** Your email
   - **Business Account:** Select your business

4. Add **WhatsApp** product to your app

### Step 2: Get API Credentials

After setting up WhatsApp product:

1. **Phone Number ID:**

   ```
   WhatsApp → API Setup → Phone Number ID
   Copy this ID
   ```

2. **Access Token:**

   ```
   WhatsApp → API Setup → Temporary Access Token
   Generate permanent token for production
   ```

3. **Business Account ID:**

   ```
   Settings → WhatsApp → Business Account ID
   ```

4. **App Secret:**
   ```
   Settings → Basic → App Secret
   ```

### Step 3: Configure Phone Number

1. **Add Phone Number:**
   - WhatsApp → API Setup → Add Phone Number
   - Verify via SMS/Voice call
   - This will be your bot's number

2. **Display Name:**

   ```
   Set to: "Cerebrum Biology Academy"
   ```

3. **Profile Picture:**
   - Upload your academy logo
   - 640x640 px recommended

---

## Environment Configuration

### `.env.local` Setup

Create/update `.env.local` in your project root:

```bash
# WhatsApp Business API Configuration
WHATSAPP_API_URL=https://graph.facebook.com/v21.0
WHATSAPP_PHONE_NUMBER_ID=your_phone_number_id_here
WHATSAPP_ACCESS_TOKEN=your_permanent_access_token_here
WHATSAPP_BUSINESS_ACCOUNT_ID=your_business_account_id_here
WHATSAPP_APP_SECRET=your_app_secret_here
WHATSAPP_VERIFY_TOKEN=your_custom_verify_token_here

# AI Configuration
ANTHROPIC_API_KEY=sk-ant-your-api-key-here

# Database
DATABASE_URL=postgresql://user:password@localhost:5432/cerebrum_db

# Site Configuration
NEXT_PUBLIC_SITE_URL=https://cerebrumbiologyacademy.com

# Optional: For development
NODE_ENV=development
```

### Important Notes

- **WHATSAPP_VERIFY_TOKEN:** Create a random string (e.g., `cerebrum_webhook_2024_secure_token`)
- Keep this secret and use it for webhook verification
- **Never commit** `.env.local` to git
- Use different tokens for development and production

---

## Webhook Configuration

### Step 1: Deploy Your Application

Deploy to Vercel or your hosting platform:

```bash
# Deploy to Vercel
vercel --prod

# Or build for production
npm run build
npm run start
```

Your webhook URL will be:

```
https://your-domain.com/api/whatsapp/ai-bot
```

### Step 2: Configure Webhook in Meta

1. Go to **WhatsApp → Configuration** in Meta dashboard

2. **Webhook URL:**

   ```
   https://cerebrumbiologyacademy.com/api/whatsapp/ai-bot
   ```

3. **Verify Token:**

   ```
   (Use the same token you set in WHATSAPP_VERIFY_TOKEN)
   ```

4. Click **Verify and Save**

5. **Subscribe to webhook fields:**
   - ✅ messages
   - ✅ message_status (optional)
   - ✅ messaging_deliveries (optional)

### Step 3: Test Webhook

1. Send a test message to your WhatsApp number
2. Check webhook logs in Vercel dashboard
3. Verify message appears in console

---

## Database Setup

### Prisma Migration

The bot uses the existing Prisma schema. Ensure your database has these models:

- `User` - Student/user data
- `DemoBooking` - Demo class bookings
- `Enrollment` - Course enrollments
- `CommunicationLog` - WhatsApp interaction logs

Run migrations:

```bash
# Generate Prisma client
npx prisma generate

# Run migrations
npx prisma migrate dev --name add_whatsapp_bot_support

# Or push schema (for development)
npx prisma db push
```

### Verify Database

```bash
# Check database connection
npx prisma studio

# Run health check
curl http://localhost:3000/api/health
```

---

## Deployment

### Production Checklist

- [ ] Environment variables set in Vercel
- [ ] Webhook URL configured in Meta
- [ ] Database connected and migrated
- [ ] AI API key valid and has credits
- [ ] Phone number verified
- [ ] Test messages working

### Vercel Deployment

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel --prod
```

### Environment Variables in Vercel

1. Go to Vercel dashboard → Your project → Settings → Environment Variables

2. Add all variables from `.env.local`:

   ```
   WHATSAPP_API_URL
   WHATSAPP_PHONE_NUMBER_ID
   WHATSAPP_ACCESS_TOKEN
   WHATSAPP_BUSINESS_ACCOUNT_ID
   WHATSAPP_APP_SECRET
   WHATSAPP_VERIFY_TOKEN
   ANTHROPIC_API_KEY
   DATABASE_URL
   NEXT_PUBLIC_SITE_URL
   ```

3. Save and redeploy

---

## Testing

### Manual Testing

1. **Send Test Message:**

   ```
   Send "Hi" to your WhatsApp bot number
   Expected: Welcome message with menu
   ```

2. **Test Commands:**

   ```
   HELP → Should show menu
   DEMO → Should start booking flow
   TEST → Should show practice test link
   STATUS → Should check enrollment
   SUPPORT → Should show contact info
   ```

3. **Test AI Question:**
   ```
   "What is photosynthesis?"
   Expected: Detailed answer with NCERT references
   ```

### Automated Testing

Run the test script:

```bash
# Make sure your dev server is running
npm run dev

# In another terminal
npx ts-node scripts/test-whatsapp-bot.ts
```

Expected output:

```
🧪 Starting WhatsApp Bot Tests...
============================================================

📝 Testing: Webhook Verification (GET)
   ✅ PASS: Webhook verification successful
   ✅ PASS: Incorrect token rejected

📝 Testing: Message Processing (POST)
   ✅ PASS: Message accepted for processing

📝 Testing: Command Handling
   ✅ PASS: HELP command
   ✅ PASS: MENU command
   ✅ PASS: DEMO command
   ...

============================================================

📊 TEST RESULTS SUMMARY

Total Tests: 15
✅ Passed: 15
❌ Failed: 0
📈 Success Rate: 100.0%

🎉 ALL TESTS PASSED! WhatsApp Bot is ready for production!
```

### Load Testing

Test rate limiting:

```bash
# Send 15 rapid messages (should limit after 10)
for i in {1..15}; do
  curl -X POST http://localhost:3000/api/whatsapp/ai-bot \
    -H "Content-Type: application/json" \
    -d '{"entry":[{"changes":[{"value":{"messages":[{"from":"919876543210","id":"test_'$i'","timestamp":"'$(date +%s)'","type":"text","text":{"body":"Test '$i'"}}]}}]}]}'
  echo ""
done
```

---

## Troubleshooting

### Common Issues

#### 1. Webhook Verification Fails

**Symptom:** Meta shows "Webhook verification failed"

**Solutions:**

- ✅ Check WHATSAPP_VERIFY_TOKEN matches in both places
- ✅ Ensure webhook URL is HTTPS (not HTTP)
- ✅ Verify application is deployed and running
- ✅ Check webhook endpoint returns 200 status

**Debug:**

```bash
# Test webhook locally
curl "http://localhost:3000/api/whatsapp/ai-bot?hub.mode=subscribe&hub.verify_token=YOUR_TOKEN&hub.challenge=test"

# Should return: test
```

#### 2. Messages Not Received

**Symptom:** Sending message to bot, but no response

**Solutions:**

- ✅ Check webhook is subscribed to "messages" field
- ✅ Verify WHATSAPP_ACCESS_TOKEN is valid
- ✅ Check Vercel logs for errors
- ✅ Ensure phone number is verified

**Debug:**

```bash
# Check webhook logs
vercel logs

# Test message processing
curl -X POST https://your-domain.com/api/whatsapp/ai-bot \
  -H "Content-Type: application/json" \
  -d @test-message.json
```

#### 3. AI Responses Not Working

**Symptom:** Bot receives message but doesn't send AI response

**Solutions:**

- ✅ Verify ANTHROPIC_API_KEY is valid
- ✅ Check API credits/quota
- ✅ Review AI Tutor API at `/api/ai/tutor`
- ✅ Check error logs

**Debug:**

```bash
# Test AI Tutor API directly
curl -X POST http://localhost:3000/api/ai/tutor \
  -H "Content-Type: application/json" \
  -d '{"question":"What is DNA?","studentId":"test123"}'
```

#### 4. Rate Limiting Too Aggressive

**Symptom:** Legitimate users getting rate limited

**Solutions:**

- Increase limit in `/api/whatsapp/ai-bot/route.ts`:
  ```typescript
  if (userLimit.count >= 20) { // Changed from 10 to 20
  ```
- Or increase time window:
  ```typescript
  resetAt: now + 120000 // 2 minutes instead of 1
  ```

#### 5. Database Connection Errors

**Symptom:** Error logs show Prisma connection failures

**Solutions:**

- ✅ Verify DATABASE_URL is correct
- ✅ Check database is running
- ✅ Run `npx prisma migrate deploy`
- ✅ Check connection pooling limits

**Debug:**

```bash
# Test database connection
npx prisma studio

# Check database health
curl http://localhost:3000/api/health
```

---

## Monitoring & Analytics

### Real-Time Monitoring

1. **Vercel Logs:**

   ```bash
   vercel logs --follow
   ```

2. **Database Queries:**

   ```sql
   -- Check recent interactions
   SELECT * FROM communication_logs
   WHERE channel = 'WHATSAPP'
   ORDER BY created_at DESC
   LIMIT 10;

   -- Check demo bookings
   SELECT * FROM demo_bookings
   WHERE source = 'whatsapp_bot'
   ORDER BY created_at DESC;
   ```

### Key Metrics to Track

1. **Message Volume:**
   - Total messages received
   - Messages per hour/day
   - Peak usage times

2. **AI Performance:**
   - Average response time
   - Token usage
   - Confidence scores

3. **Conversion Metrics:**
   - Demo booking rate
   - Command usage distribution
   - Support escalation rate

4. **User Engagement:**
   - Active sessions
   - Average conversation length
   - Repeat users

### Sample Analytics Query

```sql
-- Daily WhatsApp bot usage
SELECT
  DATE(created_at) as date,
  COUNT(*) as total_messages,
  COUNT(DISTINCT user_id) as unique_users,
  AVG(CASE WHEN template_data->>'confidence' IS NOT NULL
      THEN (template_data->>'confidence')::float
      ELSE NULL END) as avg_confidence
FROM communication_logs
WHERE channel = 'WHATSAPP'
  AND created_at >= NOW() - INTERVAL '30 days'
GROUP BY DATE(created_at)
ORDER BY date DESC;
```

---

## Maintenance

### Regular Tasks

**Daily:**

- Monitor error logs
- Check AI API usage/credits
- Review demo bookings

**Weekly:**

- Analyze user metrics
- Update AI prompts if needed
- Review common questions for FAQ

**Monthly:**

- Update WhatsApp access token (if temporary)
- Review and optimize rate limits
- Database cleanup (old sessions)

### Backup Strategy

1. **Database Backups:**

   ```bash
   # Daily automated backup
   pg_dump $DATABASE_URL > backup_$(date +%Y%m%d).sql
   ```

2. **Configuration Backup:**
   - Keep `.env.example` updated
   - Document all Meta configuration changes

---

## Support & Resources

### Documentation

- [WhatsApp Business API Docs](https://developers.facebook.com/docs/whatsapp/cloud-api)
- [Anthropic Claude API](https://docs.anthropic.com/)
- [Next.js API Routes](https://nextjs.org/docs/api-routes/introduction)
- [Prisma Documentation](https://www.prisma.io/docs)

### Internal Support

- **Technical Issues:** development@cerebrumbiologyacademy.com
- **WhatsApp API:** Check Meta Business Support
- **AI/Claude Issues:** Anthropic Support Portal

### Emergency Contacts

If bot goes down:

1. Check Vercel status
2. Verify WhatsApp API status
3. Fallback: Manual support at +91 88264 44334

---

## Feature Roadmap

### Coming Soon

🔜 **Voice Note Support**

- Transcribe student questions
- Voice-to-text processing

🔜 **Image Recognition**

- Biology diagram analysis
- Handwritten question recognition

🔜 **Smart Notifications**

- Daily study tips
- Exam reminders
- Motivational messages

🔜 **Advanced Analytics**

- Student engagement dashboard
- Topic popularity tracking
- Conversion funnel analysis

🔜 **Multi-Language Support**

- Hindi, Tamil, Telugu support
- Regional language translations

---

## Appendix

### Sample Webhook Payload

```json
{
  "object": "whatsapp_business_account",
  "entry": [
    {
      "id": "BUSINESS_ACCOUNT_ID",
      "changes": [
        {
          "value": {
            "messaging_product": "whatsapp",
            "metadata": {
              "display_phone_number": "919876543210",
              "phone_number_id": "PHONE_NUMBER_ID"
            },
            "contacts": [
              {
                "profile": {
                  "name": "Student Name"
                },
                "wa_id": "919876543210"
              }
            ],
            "messages": [
              {
                "from": "919876543210",
                "id": "wamid.XXX",
                "timestamp": "1234567890",
                "type": "text",
                "text": {
                  "body": "What is photosynthesis?"
                }
              }
            ]
          },
          "field": "messages"
        }
      ]
    }
  ]
}
```

### Environment Variables Reference

| Variable                       | Required | Description                           | Example                              |
| ------------------------------ | -------- | ------------------------------------- | ------------------------------------ |
| `WHATSAPP_API_URL`             | Yes      | WhatsApp API base URL                 | `https://graph.facebook.com/v21.0`   |
| `WHATSAPP_PHONE_NUMBER_ID`     | Yes      | Your WhatsApp Business phone ID       | `123456789012345`                    |
| `WHATSAPP_ACCESS_TOKEN`        | Yes      | Permanent access token                | `EAAxxxxx...`                        |
| `WHATSAPP_BUSINESS_ACCOUNT_ID` | Yes      | Business account ID                   | `123456789012345`                    |
| `WHATSAPP_APP_SECRET`          | Yes      | App secret for signature validation   | `abc123def456...`                    |
| `WHATSAPP_VERIFY_TOKEN`        | Yes      | Custom token for webhook verification | `cerebrum_2024_token`                |
| `ANTHROPIC_API_KEY`            | Yes      | Claude API key                        | `sk-ant-xxx...`                      |
| `DATABASE_URL`                 | Yes      | PostgreSQL connection string          | `postgresql://user:pass@host/db`     |
| `NEXT_PUBLIC_SITE_URL`         | Yes      | Your website URL                      | `https://cerebrumbiologyacademy.com` |

---

**Last Updated:** October 18, 2025
**Version:** 1.0.0
**Maintainer:** Cerebrum Biology Academy Dev Team

For questions or issues, contact: info@cerebrumbiologyacademy.com
