# MSG91 Setup Guide for Cerebrum Biology Academy

Complete step-by-step guide to set up MSG91 for SMS, WhatsApp, and Email OTP authentication.

## 📋 Table of Contents

1. [Overview](#overview)
2. [Prerequisites](#prerequisites)
3. [Step 1: Create MSG91 Account](#step-1-create-msg91-account)
4. [Step 2: Complete KYC Verification](#step-2-complete-kyc-verification)
5. [Step 3: DLT Registration (Mandatory for India)](#step-3-dlt-registration)
6. [Step 4: Create SMS OTP Template](#step-4-create-sms-otp-template)
7. [Step 5: Setup WhatsApp Business API](#step-5-setup-whatsapp-business-api)
8. [Step 6: Get Environment Variables](#step-6-get-environment-variables)
9. [Step 7: Add Variables to Vercel](#step-7-add-variables-to-vercel)
10. [Step 8: Test Authentication Flow](#step-8-test-authentication-flow)
11. [Troubleshooting](#troubleshooting)

---

## Overview

MSG91 provides all-in-one communication services:

- ✅ SMS OTP (₹0.14-0.28 per SMS)
- ✅ WhatsApp OTP (~1/3 cost of SMS)
- ✅ Email Authentication (98.5% delivery rate)
- ✅ 25,000 free credits for startups

**Estimated cost for 10,000 students/month:** ₹3,750-6,000

---

## Prerequisites

Before starting, gather:

- [ ] Business PAN card (for KYC)
- [ ] Business address proof
- [ ] GST number (optional but recommended)
- [ ] WhatsApp Business account (for WhatsApp OTP)
- [ ] Facebook Business Manager access (for WhatsApp)

---

## Step 1: Create MSG91 Account

### 1.1 Sign Up

1. Visit [msg91.com](https://msg91.com)
2. Click **"Sign Up"** or **"Get Started"**
3. Fill in your details:
   - Business Name: **Cerebrum Biology Academy**
   - Email: Your business email
   - Mobile: Your registered mobile number
   - Password: Create a strong password

### 1.2 Verify Email and Mobile

1. Check your email for verification link
2. Enter OTP sent to your mobile number
3. Login to your MSG91 dashboard

### 1.3 Claim Startup Credits

1. Navigate to **"Billing"** → **"Promotions"**
2. If eligible, claim **25,000 free credits** for startups
3. You can start testing immediately with free credits

---

## Step 2: Complete KYC Verification

KYC is mandatory for production use in India.

### 2.1 Submit KYC Documents

1. Go to **"Settings"** → **"KYC Verification"**
2. Upload required documents:
   - **PAN Card** (Business or Individual)
   - **Address Proof** (Aadhaar/Passport/Business registration)
   - **GST Certificate** (if available)
3. Fill in business details:
   - Business Name: Cerebrum Biology Academy
   - Business Type: Education/Ed-Tech
   - Address: Your registered address

### 2.2 Wait for Approval

- **Timeline:** 24-48 hours
- **Status:** Check dashboard for approval notification
- **Support:** If delayed, contact teamcrm@msg91.com

---

## Step 3: DLT Registration

DLT (Distributed Ledger Technology) registration is **mandatory** under TRAI regulations for SMS in India.

### 3.1 Register Entity on DLT Platform

1. Visit your chosen operator's DLT portal:
   - **Jio:** [trueconnect.jio.com](https://trueconnect.jio.com)
   - **Airtel:** [smartping.live](https://smartping.live)
   - **Vodafone:** [vilpower.in](https://www.vilpower.in)
2. Create account and register your entity
3. Note down your **Entity ID**

### 3.2 Register Sender ID

1. Register sender ID: **CRBMBIO** (or custom 6-character ID)
2. Select category: **Service Explicit**
3. Wait for approval (24-48 hours)

### 3.3 Register Content Templates

Register this template for OTP:

```
Your OTP for Cerebrum Biology Academy is {#var#}. Valid for 10 minutes. Do not share with anyone.
```

**Template Variables:**

- `{#var#}` - OTP value (will be replaced dynamically)

### 3.4 Get MSG91 DLT Support (Optional)

If DLT process is complex:

1. Contact [email protected]
2. Request **Premium DLT Support**
3. MSG91 expert will handle registration (priority service)
4. Cost: Check with MSG91 sales team

---

## Step 4: Create SMS OTP Template

### 4.1 Navigate to Templates

1. Login to MSG91 dashboard
2. Go to **"SMS"** → **"Templates"**
3. Click **"Create Template"**

### 4.2 Create OTP Template

Fill in template details:

- **Template Name:** `cerebrum_otp_auth`
- **DLT Template ID:** Your approved DLT template ID
- **Sender ID:** `CRBMBIO`
- **Template Content:**
  ```
  Your OTP for Cerebrum Biology Academy is ##OTP##. Valid for 10 minutes. Do not share. - Team Cerebrum
  ```
- **Variables:** `##OTP##`
- **Category:** Transactional

### 4.3 Save Template ID

1. After creation, copy the **Template ID**
2. Save it as: `MSG91_SMS_TEMPLATE_ID`
3. You'll need this for environment variables

---

## Step 5: Setup WhatsApp Business API

### 5.1 Prerequisites

- **WhatsApp Business Account** (separate from personal WhatsApp)
- **Facebook Business Manager** account
- **Phone number** dedicated for WhatsApp Business

### 5.2 Connect WhatsApp to MSG91

1. In MSG91 dashboard, go to **"WhatsApp"**
2. Click **"Connect WhatsApp Business"**
3. Follow Facebook verification process:
   - Login to Facebook Business Manager
   - Authorize MSG91 app
   - Verify your business
   - Select WhatsApp Business number

### 5.3 Create WhatsApp OTP Template

1. Go to **"WhatsApp"** → **"Templates"**
2. Click **"Create Template"**
3. Fill details:
   - **Template Name:** `otp_verification`
   - **Category:** Authentication
   - **Language:** English
   - **Template Content:**

     ```
     Hi {{1}}! 👋

     Your OTP for Cerebrum Biology Academy is: *{{2}}*

     🔒 Valid for 10 minutes
     🚫 Don't share with anyone

     Best of luck with your NEET preparation! 🎯
     - Team Cerebrum
     ```

   - **Variables:**
     - `{{1}}` - Student name
     - `{{2}}` - OTP value

### 5.4 Submit for Facebook Approval

1. Click **"Submit for Approval"**
2. **Wait time:** 24-48 hours
3. **Check status:** Dashboard shows approval notification
4. **Get Template ID:** Copy the approved template ID

### 5.5 Get WhatsApp Integration Number

1. After template approval, go to **"WhatsApp"** → **"Settings"**
2. Copy your **WhatsApp Integration Number** (format: `+91XXXXXXXXXX`)
3. Save it as: `MSG91_WHATSAPP_NUMBER`

---

## Step 6: Get Environment Variables

Collect these values from MSG91 dashboard:

### 6.1 AUTH KEY

1. Go to **"Settings"** → **"API Keys"**
2. Copy your **Primary Auth Key**
3. Save as: `MSG91_AUTH_KEY`

### 6.2 SMS Template ID

- Already copied in Step 4.3
- Save as: `MSG91_SMS_TEMPLATE_ID`

### 6.3 WhatsApp Template ID

- Already copied in Step 5.4
- Format: Usually template name like `otp_verification`
- Save as: `MSG91_WHATSAPP_TEMPLATE_ID`

### 6.4 WhatsApp Number

- Already copied in Step 5.5
- Format: `+91XXXXXXXXXX`
- Save as: `MSG91_WHATSAPP_NUMBER`

### 6.5 Sender ID

- Your approved DLT sender ID (Step 3.2)
- Default: `CRBMBIO`
- Save as: `MSG91_SENDER_ID`

---

## Step 7: Add Variables to Vercel

### 7.1 Add via Vercel CLI

```bash
# Navigate to your project directory
cd /path/to/cerebrum-biology-academy-website

# Add MSG91 Auth Key
vercel env add MSG91_AUTH_KEY production

# When prompted, paste your auth key
# Example: 1234567890ABCDEFxxxxxxxx

# Add SMS Template ID
vercel env add MSG91_SMS_TEMPLATE_ID production

# When prompted, paste your SMS template ID

# Add WhatsApp Template ID
vercel env add MSG91_WHATSAPP_TEMPLATE_ID production

# When prompted, paste your WhatsApp template name
# Example: otp_verification

# Add WhatsApp Number
vercel env add MSG91_WHATSAPP_NUMBER production

# When prompted, paste your WhatsApp integrated number
# Example: +918826444334

# Add Sender ID (optional)
vercel env add MSG91_SENDER_ID production

# When prompted, enter: CRBMBIO
```

### 7.2 Add via Vercel Dashboard (Alternative)

1. Visit [vercel.com/dashboard](https://vercel.com/dashboard)
2. Select your project: **cerebrum-biology-academy-website**
3. Go to **"Settings"** → **"Environment Variables"**
4. Add each variable:

| Variable Name                | Value                    | Environment |
| ---------------------------- | ------------------------ | ----------- |
| `MSG91_AUTH_KEY`             | Your auth key from MSG91 | Production  |
| `MSG91_SMS_TEMPLATE_ID`      | Your SMS template ID     | Production  |
| `MSG91_WHATSAPP_TEMPLATE_ID` | `otp_verification`       | Production  |
| `MSG91_WHATSAPP_NUMBER`      | `+91XXXXXXXXXX`          | Production  |
| `MSG91_SENDER_ID`            | `CRBMBIO`                | Production  |

### 7.3 Redeploy

After adding variables:

```bash
# Trigger new deployment
vercel --prod

# Or via git push (auto-deploy)
git push origin main
```

---

## Step 8: Test Authentication Flow

### 8.1 Test SMS OTP

1. Visit: https://www.cerebrumbiologyacademy.com/auth/signin
2. Enter mobile number (use your registered test number)
3. Click **"Send OTP"**
4. **Expected:**
   - SMS arrives within 10 seconds
   - OTP is 6 digits
   - Message includes "Cerebrum Biology Academy"
5. Enter OTP and verify login works

### 8.2 Test WhatsApp OTP

1. During registration, provide WhatsApp number
2. Check WhatsApp for OTP message
3. **Expected:**
   - Message arrives from MSG91 WhatsApp Business
   - Template format matches your approved template
   - OTP is visible and correct

### 8.3 Test Rate Limiting

1. Try sending 3 OTPs quickly
2. **Expected:**
   - First 2 succeed
   - 3rd attempt shows: "Please wait 5 minutes"
3. After hour, try 6 OTPs
4. **Expected:**
   - First 5 succeed
   - 6th shows: "Too many attempts, wait 1 hour"

### 8.4 Test Error Handling

1. Enter wrong OTP 3 times
2. **Expected:** "Too many invalid attempts"
3. Try expired OTP (after 10 minutes)
4. **Expected:** "OTP has expired"

---

## Troubleshooting

### Problem: SMS not received

**Solutions:**

1. Check DLT registration is approved
2. Verify template ID is correct
3. Check sender ID is approved
4. Verify phone number format: `91XXXXXXXXXX` (no spaces/+)
5. Check MSG91 dashboard for delivery status
6. Contact MSG91 support: [email protected]

### Problem: WhatsApp template not approved

**Solutions:**

1. Ensure template follows Facebook guidelines:
   - No promotional content in authentication templates
   - Clear purpose for OTP
   - No links or URLs
2. Check template variables are correctly placed
3. Resubmit template with corrections
4. Contact MSG91 WhatsApp support

### Problem: "MSG91 credentials not configured" in logs

**Solutions:**

1. Verify environment variables are added to Vercel
2. Check variable names are exactly:
   - `MSG91_AUTH_KEY` (not `MSG_91_AUTH_KEY`)
   - `MSG91_SMS_TEMPLATE_ID`
   - `MSG91_WHATSAPP_TEMPLATE_ID`
   - `MSG91_WHATSAPP_NUMBER`
3. Redeploy after adding variables
4. Check Vercel deployment logs for errors

### Problem: Rate limit errors

**Solutions:**

1. Current limits: 5 OTPs/hour, 2 per 5 minutes
2. If testing, wait between requests
3. For production, limits are appropriate to prevent abuse
4. Can request limit increase from MSG91 if needed

### Problem: DLT registration complex

**Solutions:**

1. Use MSG91 Premium DLT Support
2. Contact: [email protected]
3. Mention: "Need help with DLT registration"
4. MSG91 has helped 20,000+ clients with DLT

### Problem: Cost concerns

**Solutions:**

1. Start with 25,000 free credits
2. Monitor usage in MSG91 dashboard
3. Pricing for 10,000 students/month: ~₹4,000
4. Compare with Twilio: Saving ₹70,000-90,000/year
5. Contact MSG91 sales for volume discounts

---

## Support Contacts

### MSG91 Support

- **General:** [email protected]
- **DLT Support:** [email protected]
- **Sales:** teamcrm@msg91.com
- **Documentation:** [docs.msg91.com](https://docs.msg91.com)

### Developer Support

- **Issues:** Check deployment logs in Vercel
- **Code:** `/src/app/api/auth/send-otp/route.ts`
- **Local testing:** System falls back to mock mode if credentials not set

---

## Estimated Timeline

| Step                        | Time Required                      |
| --------------------------- | ---------------------------------- |
| MSG91 Account Setup         | 15 minutes                         |
| KYC Verification            | 24-48 hours                        |
| DLT Registration            | 24-72 hours                        |
| SMS Template Creation       | 30 minutes                         |
| WhatsApp Business Setup     | 2-3 hours                          |
| WhatsApp Template Approval  | 24-48 hours                        |
| Environment Variables Setup | 15 minutes                         |
| Testing                     | 1 hour                             |
| **Total**                   | **5-7 days** (with approval waits) |

---

## Next Steps After Setup

1. ✅ **Monitor Usage:**
   - Check MSG91 dashboard daily for first week
   - Review delivery rates and failures
   - Monitor costs and credit usage

2. ✅ **Setup Alerts:**
   - Enable low-balance alerts in MSG91
   - Get delivery failure notifications
   - Set up usage threshold alerts

3. ✅ **Email Authentication:**
   - MSG91 also provides Email API
   - Setup email verification for students who provide email
   - 98.5% delivery rate, better than competitors

4. ✅ **Chatbot Integration:**
   - MSG91 offers unlimited chatbots
   - Create chatbot for common student queries
   - Integrate with WhatsApp for 24/7 support

5. ✅ **Payment Integration:**
   - Use MSG91's Razorpay integration
   - Send course payment links via WhatsApp
   - Students can pay directly in WhatsApp

---

## Cost Optimization Tips

1. **Use WhatsApp for Repeat Users:**
   - WhatsApp is 1/3 cost of SMS
   - For returning students, prefer WhatsApp OTP
   - Fallback to SMS if WhatsApp fails

2. **Template Optimization:**
   - Keep SMS templates under 160 characters
   - Reduces cost per message
   - Current template is 98 characters (optimal)

3. **Rate Limiting:**
   - Already implemented in code
   - Prevents abuse and unnecessary costs
   - 5 OTPs/hour per user is sufficient

4. **Monitor Failed Deliveries:**
   - Check dashboard for DND numbers
   - These don't count against credits
   - Remove or re-verify undeliverable numbers

---

**Setup Complete!** 🎉

Your Cerebrum Biology Academy authentication system is now powered by MSG91, offering reliable, cost-effective SMS, WhatsApp, and Email OTP services optimized for the Indian education market.

For any issues, contact MSG91 support or check deployment logs in Vercel.
