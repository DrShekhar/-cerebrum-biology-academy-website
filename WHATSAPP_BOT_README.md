# WhatsApp AI Bot - Quick Start Guide

> 24/7 Automated Student Support for Cerebrum Biology Academy

## 🚀 Quick Start

### 1. Environment Setup

Copy and configure environment variables:

```bash
cp .env.example .env.local
```

Add these to `.env.local`:

```bash
# WhatsApp Configuration
WHATSAPP_API_URL=https://graph.facebook.com/v21.0
WHATSAPP_PHONE_NUMBER_ID=your_phone_number_id
WHATSAPP_ACCESS_TOKEN=your_access_token
WHATSAPP_BUSINESS_ACCOUNT_ID=your_account_id
WHATSAPP_APP_SECRET=your_app_secret
WHATSAPP_VERIFY_TOKEN=your_custom_verify_token

# AI Configuration
ANTHROPIC_API_KEY=sk-ant-your-key

# Database
DATABASE_URL=postgresql://user:password@localhost:5432/cerebrum

# Site URL
NEXT_PUBLIC_SITE_URL=https://cerebrumbiologyacademy.com
```

### 2. Install & Run

```bash
# Install dependencies
npm install

# Run database migrations
npx prisma generate
npx prisma db push

# Start development server
npm run dev
```

### 3. Test the Bot

```bash
# Run test suite
npx ts-node scripts/test-whatsapp-bot.ts
```

### 4. Deploy

```bash
# Deploy to Vercel
vercel --prod

# Configure webhook in Meta Dashboard:
# URL: https://your-domain.com/api/whatsapp/ai-bot
# Verify Token: (use your WHATSAPP_VERIFY_TOKEN)
```

---

## 📁 File Structure

```
src/
├── app/api/whatsapp/ai-bot/
│   └── route.ts              # Webhook handler (GET/POST)
├── lib/whatsapp/
│   ├── aiMessageHandler.ts   # Main AI processing logic
│   ├── sessionManager.ts     # Conversation context tracking
│   ├── demoBooking.ts        # Demo booking automation
│   └── templates.ts          # Message templates
scripts/
└── test-whatsapp-bot.ts      # Automated testing
WHATSAPP_BOT_SETUP.md         # Detailed setup guide
```

---

## 🎯 Features

### ✅ Implemented

- **AI-Powered Responses:** Uses Claude Sonnet 4 for biology questions
- **Command System:** HELP, DEMO, TEST, STATUS, SUPPORT
- **Demo Booking:** Automated multi-step booking flow
- **Rate Limiting:** 10 messages/minute per user
- **Session Management:** 30-minute conversation context
- **Security:** Webhook signature validation
- **Analytics:** Full interaction logging

### 🔜 Coming Soon

- Voice note support
- Image/diagram recognition
- Daily study reminders
- Multi-language support

---

## 🛠️ Commands

Students can use these commands with the bot:

| Command         | Description               | Example Response          |
| --------------- | ------------------------- | ------------------------- |
| `HELP` / `MENU` | Show available commands   | Welcome message with menu |
| `DEMO`          | Book a free demo class    | Starts booking flow       |
| `TEST`          | Get practice test link    | Practice test URL         |
| `STATUS`        | Check enrollment status   | Course & payment status   |
| `SUPPORT`       | Get human support contact | Contact information       |

Any other message is treated as a biology question and sent to the AI.

---

## 🧪 Testing Checklist

Before going to production, verify:

- [ ] Webhook verification works (GET request)
- [ ] Messages are received (POST request)
- [ ] AI responses formatted correctly
- [ ] NCERT references displayed
- [ ] All commands work (HELP, DEMO, TEST, STATUS, SUPPORT)
- [ ] Rate limiting prevents spam
- [ ] Demo booking flow completes
- [ ] Analytics logged correctly
- [ ] Error handling is graceful
- [ ] 4096 char limit respected

Run automated tests:

```bash
npm run test:whatsapp-bot
```

---

## 📊 Monitoring

### Check Logs

```bash
# Vercel logs
vercel logs --follow

# Local development
npm run dev
# Check console output
```

### Database Queries

```sql
-- Recent WhatsApp interactions
SELECT * FROM communication_logs
WHERE channel = 'WHATSAPP'
ORDER BY created_at DESC
LIMIT 20;

-- Demo bookings from WhatsApp
SELECT * FROM demo_bookings
WHERE source = 'whatsapp_bot'
ORDER BY created_at DESC;
```

### Analytics Dashboard

View metrics at:

- Message volume
- AI response times
- Demo booking conversion
- Popular questions

---

## 🐛 Common Issues

### Issue: Webhook Verification Fails

**Fix:**

```bash
# 1. Check verify token matches
echo $WHATSAPP_VERIFY_TOKEN

# 2. Test webhook locally
curl "http://localhost:3000/api/whatsapp/ai-bot?hub.mode=subscribe&hub.verify_token=YOUR_TOKEN&hub.challenge=test"

# Should return: test
```

### Issue: No AI Responses

**Fix:**

```bash
# 1. Test AI API directly
curl -X POST http://localhost:3000/api/ai/tutor \
  -H "Content-Type: application/json" \
  -d '{"question":"What is DNA?","studentId":"test"}'

# 2. Check API key
echo $ANTHROPIC_API_KEY | head -c 20

# 3. Verify API credits
# Visit: https://console.anthropic.com
```

### Issue: Database Errors

**Fix:**

```bash
# 1. Check connection
npx prisma studio

# 2. Run migrations
npx prisma migrate deploy

# 3. Regenerate client
npx prisma generate
```

---

## 🔐 Security Best Practices

1. **Never commit `.env.local`** to git
2. **Rotate access tokens** regularly
3. **Use strong verify tokens** (random, 32+ chars)
4. **Enable webhook signature validation** in production
5. **Monitor rate limiting** for abuse
6. **Keep dependencies updated** (`npm audit`)

---

## 📈 Performance Optimization

### Current Limits

- Rate limiting: 10 messages/minute per user
- Session timeout: 30 minutes
- Max response: 4096 characters
- Context memory: Last 5 messages

### Scaling Recommendations

**For 100+ concurrent users:**

- Use Redis for session management
- Implement message queue (Bull/BullMQ)
- Add horizontal scaling (multiple webhooks)
- Optimize database queries with indexes

**For 1000+ concurrent users:**

- Move to dedicated WhatsApp BSP
- Use CDN for media files
- Implement caching layer
- Consider AI response caching

---

## 📞 Support

### Technical Issues

- Email: info@cerebrumbiologyacademy.com
- Phone: +91 88264 44334

### Resources

- [Full Setup Guide](./WHATSAPP_BOT_SETUP.md)
- [WhatsApp API Docs](https://developers.facebook.com/docs/whatsapp)
- [Anthropic Claude Docs](https://docs.anthropic.com)

---

## 📝 Example Conversations

### Demo Booking Flow

```
Student: DEMO
Bot: Great choice! Let's book your FREE demo class.
     Which class are you preparing for?
     1️⃣ Class 11
     2️⃣ Class 12
     3️⃣ Dropper

Student: 2
Bot: Perfect! Class 12 it is!
     When would you like to attend?
     1️⃣ Today at 5:00 PM
     2️⃣ Tomorrow at 5:00 PM
     3️⃣ This Weekend

Student: 2
Bot: ✅ Demo Class Confirmed!
     Tomorrow at 5:00 PM
     Faculty: Dr. Priya Sharma
     Zoom link will be sent 30 mins before.
```

### AI Question

```
Student: What is photosynthesis?
Bot: 📚 Biology Tutor Answer:

     Photosynthesis is the process by which plants...
     [Detailed answer]

     📖 NCERT References:
     • Class 11, Chapter 13: Photosynthesis in Higher Plants

     🔗 Related Topics:
     • Light reactions
     • Calvin cycle
     • Chloroplast structure

     💡 You might also ask:
     1. What is the role of chlorophyll?
     2. Explain C3 and C4 pathways
```

---

## 🎓 Best Practices

### For Students Using the Bot

1. **Ask clear questions** - Be specific about the topic
2. **One question at a time** - Better responses
3. **Use commands** - Type HELP to see all options
4. **Provide context** - Mention chapter/topic if known

### For Administrators

1. **Monitor daily** - Check logs for errors
2. **Update templates** - Keep messages fresh
3. **Analyze metrics** - Improve based on data
4. **Test regularly** - Run test suite weekly
5. **Backup database** - Daily automated backups

---

**Version:** 1.0.0
**Last Updated:** October 18, 2025
**Status:** ✅ Production Ready

🚀 **Ready to launch your 24/7 AI-powered student support!**
