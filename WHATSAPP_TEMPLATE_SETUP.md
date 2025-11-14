# WhatsApp Template Setup for OTP Authentication

## Problem: "Customer has not messaged within last 24 hours"

This error means WhatsApp is blocking your message because of the 24-hour window rule. You need to use **WhatsApp Message Templates** instead.

## Solution: Create an Approved OTP Template

### Step 1: Create Template in Interakt

1. **Login to Interakt Dashboard**
   - Go to https://app.interakt.ai/
   - Navigate to **Templates** section (left sidebar)

2. **Create New Template**
   - Click **"Create Template"** or **"New Template"**
   - Fill in the details:

**Template Details:**

```
Template Name: cerebrum_otp_verification
Category: AUTHENTICATION
Language: English

Header: None (or add your logo)

Body Message:
Your Cerebrum Biology Academy verification code is *{{1}}*

This code will expire in 10 minutes.

Do not share this code with anyone.

Footer: Cerebrum Biology Academy
(optional)

Buttons: None
```

3. **Submit for WhatsApp Approval**
   - Click **"Submit for Approval"**
   - Approval usually takes 24-48 hours
   - You'll get email notification when approved

### Step 2: Update Code to Use Template

Once approved, update `src/lib/interakt.ts`:

```typescript
// Current implementation (line 104-116)
export async function sendWhatsAppOTP(params: SendOTPParams): Promise<{
  success: boolean
  error?: string
}> {
  const { phone, otp } = params

  // OLD: Using plain text message (blocked by 24-hour rule)
  // const message = `Your Cerebrum Biology Academy verification code is: *${otp}*...`

  // NEW: Using approved template (works anytime)
  return sendWhatsAppMessage({
    phone,
    message: '', // Not used with templates
    templateName: 'cerebrum_otp_verification', // Your approved template name
    templateParams: {
      '1': otp, // OTP goes in placeholder {{1}}
    },
  })
}
```

### Step 3: Verify Template in Interakt

After approval, check:

1. Go to **Templates** section
2. Find "cerebrum_otp_verification"
3. Status should be **"Approved"** (green)
4. Copy the exact template name (case-sensitive!)

## Alternative: Quick Testing Solution

While waiting for template approval, you can test by:

### Option A: Message Your Business First (Quick Workaround)

1. **Save Your Interakt Business Number**
   - Find your WhatsApp Business number in Interakt dashboard
   - Usually shown in Settings → WhatsApp

2. **Send a Test Message**
   - Open WhatsApp on your phone (9999744334)
   - Send ANY message to your Interakt business number
   - Example: "Hi, testing OTP"

3. **Test OTP Within 24 Hours**
   - Now visit http://localhost:3000/auth/whatsapp
   - Enter 9999744334
   - Click "Send OTP"
   - Should work now! ✅

### Option B: Use Twilio for Testing (Temporary)

If you need to test immediately, we can temporarily switch to Twilio which doesn't have this restriction.

## Production Recommendation

**For Production:** You MUST use WhatsApp Templates for:

- ✅ OTP/Authentication messages
- ✅ Transactional notifications
- ✅ Any automated messages

**Why?**

- Can send to ANY user, anytime
- No 24-hour window restriction
- Higher delivery rates
- Professional appearance
- WhatsApp approved

## Template Examples for Your Academy

You might want to create these templates too:

**1. OTP Verification** (Priority - For Login)

```
Template: cerebrum_otp_verification
Message: Your verification code is *{{1}}*. Valid for 10 minutes.
```

**2. Welcome Message** (For New Students)

```
Template: cerebrum_welcome
Message: Welcome to Cerebrum Biology Academy, {{1}}! Your enrollment is confirmed.
```

**3. Class Reminder** (For Scheduled Classes)

```
Template: cerebrum_class_reminder
Message: Hi {{1}}, your {{2}} class starts in 30 minutes. Join now: {{3}}
```

**4. Payment Confirmation**

```
Template: cerebrum_payment_received
Message: Payment of ₹{{1}} received successfully. Receipt: {{2}}
```

## Quick Action Checklist

**Immediate (Next 5 minutes):**

- [ ] Message your Interakt business number from 9999744334
- [ ] Test OTP login within 24 hours
- [ ] It will work temporarily ✅

**This Week:**

- [ ] Create OTP template in Interakt
- [ ] Submit for WhatsApp approval
- [ ] Wait 24-48 hours for approval
- [ ] Update code to use template

**Before Production Launch:**

- [ ] Ensure OTP template is approved
- [ ] Test with multiple numbers
- [ ] Update code to use templates
- [ ] Test production flow end-to-end

## Need Help?

**Can't find your Interakt business number?**

- Go to Interakt → Settings → WhatsApp
- Or contact Interakt support: support@interakt.ai

**Template not getting approved?**

- Check WhatsApp template guidelines
- Ensure you're using approved category (AUTHENTICATION)
- Remove promotional language
- Keep it simple and transactional

**Want to test NOW without waiting?**

- Let me know, I can help you switch to Twilio temporarily
- Or help you implement a fallback system

---

**Status:**

- ✅ API Key configured
- ✅ Phone number in contacts
- ❌ Template approval pending (need to create)
- ⏳ Temporary: Message business first to test

Would you like me to create the template for you, or help with the temporary workaround?
