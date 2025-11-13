# 🚀 Twilio WhatsApp Authentication Setup Guide

## Step 1: Sign Up for Twilio (5 minutes)

1. Go to https://www.twilio.com/try-twilio
2. Click **"Sign up"**
3. Fill in your details:
   - Email
   - Password
   - Phone number (for verification)
4. Verify your email and phone number
5. You'll get **$15 free credit** (enough for ~1,900 WhatsApp messages!)

## Step 2: Get Your Twilio Credentials (3 minutes)

### A. Get Account SID and Auth Token

1. After logging in, you'll be on the **Dashboard**
2. Look for the **"Account Info"** section
3. Copy these values:
   ```
   Account SID: ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
   Auth Token: [click to reveal and copy]
   ```

### B. Create a Verify Service

1. In the left sidebar, click **"Explore Products"**
2. Click **"Verify"** → **"Services"**
3. Click **"Create new Service"**
4. Enter:
   - **Friendly Name:** "Cerebrum Biology Academy OTP"
   - **Channel:** Select "WhatsApp"
5. Click **"Create"**
6. Copy the **Service SID**: `VAxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`

## Step 3: Update Your .env.local File (2 minutes)

Open your `.env.local` file and update these lines:

```bash
TWILIO_ACCOUNT_SID="ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
TWILIO_AUTH_TOKEN="your_auth_token_from_twilio"
TWILIO_VERIFY_SERVICE_SID="VAxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
```

## Step 4: Test WhatsApp Authentication (5 minutes)

1. Restart your development server:

   ```bash
   # Stop the current server (Ctrl+C)
   npm run dev
   ```

2. Open your browser and go to:

   ```
   http://localhost:3000/auth/whatsapp
   ```

3. Enter your WhatsApp number (e.g., +919876543210)
4. Click **"Send OTP via WhatsApp"**
5. Check your WhatsApp - you should receive an OTP
6. Enter the OTP and click **"Verify & Login"**

## Important Notes

### Phone Number Format

The system auto-formats phone numbers, but you can enter:

- `9876543210` (10 digits - adds +91 automatically)
- `+919876543210` (with country code)
- `919876543210` (with country code, no +)

### Testing with Trial Account

**Twilio Trial Limitations:**

- Can only send OTPs to **verified phone numbers**
- To verify a number for testing:
  1. Go to https://console.twilio.com/us1/develop/phone-numbers/manage/verified
  2. Click **"Add a new number"**
  3. Enter your WhatsApp number
  4. Complete verification

### Going to Production

To remove trial limitations:

1. Add credit card to Twilio account
2. Upgrade to paid account (pay-as-you-go)
3. Cost: $0.0079 per WhatsApp message (~₹0.65)

## Troubleshooting

### Issue: "Failed to send OTP"

**Solution:** Check that:

- Your Twilio credentials are correct in `.env.local`
- You've created a Verify Service with WhatsApp enabled
- Your phone number is verified (if using trial account)

### Issue: "Invalid OTP"

**Solution:**

- Make sure you're entering the correct 6-digit code
- OTP expires after 10 minutes
- Request a new OTP if expired

### Issue: "Server configuration error"

**Solution:**

- Restart your dev server after updating `.env.local`
- Check that all 3 Twilio env variables are set

## Features Included

✅ WhatsApp OTP authentication
✅ Automatic user creation on first login
✅ JWT token-based sessions
✅ Beautiful UI with loading states
✅ Phone number auto-formatting
✅ Error handling and validation
✅ Success redirect to dashboard

## Next Steps

Once WhatsApp login is working:

1. **Add WhatsApp login button to existing pages**
   - Add to `/auth/signin`
   - Add to homepage
   - Add to enrollment forms

2. **Integrate with existing auth system**
   - Connect with NextAuth
   - Sync with student records
   - Add to CRM

3. **Enable for all user types**
   - Students
   - Parents
   - Teachers
   - Counselors

## Cost Estimation

| Users/Month | Messages/User | Total Messages | Cost (USD) | Cost (INR) |
| ----------- | ------------- | -------------- | ---------- | ---------- |
| 100         | 2             | 200            | $1.58      | ₹130       |
| 500         | 2             | 1,000          | $7.90      | ₹655       |
| 1,000       | 2             | 2,000          | $15.80     | ₹1,310     |
| 5,000       | 2             | 10,000         | $79.00     | ₹6,550     |

_Assuming 2 messages per user (1 for OTP, 1 for retry/resend)_

## Support

Need help? Contact:

- **Twilio Support:** https://support.twilio.com
- **Documentation:** https://www.twilio.com/docs/verify/api

---

**Time to Go Live:** ~15 minutes
**Free Credits:** $15 (test with 1,900+ users!)
**Production Ready:** Yes ✅
