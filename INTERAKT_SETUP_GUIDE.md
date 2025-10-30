# Interakt Setup Guide for Demo Booking SMS

## Quick Setup (5 minutes)

### Step 1: Sign Up for Interakt

1. Go to https://app.interakt.ai/
2. Sign up with your email
3. Complete phone verification
4. Connect your WhatsApp Business Account

### Step 2: Get API Credentials

1. Navigate to **Settings** → **API & Webhooks**
2. Copy your **API Key** (looks like: `abc123xyz...`)
3. Note your **WhatsApp Business Phone Number ID**

### Step 3: Create WhatsApp Template

1. Go to **Templates** → **Create New Template**
2. Fill in the details:

**Template Details:**

- **Template Name**: `demo_confirmation`
- **Category**: Utility
- **Language**: English
- **Header**: None (or add logo if you want)

**Body Text:**

```
Hi {{1}}! Your {{2}} NEET Biology demo is confirmed for {{3}} at {{4}}. {{5}} Questions? Call +91 88264 44334. - Cerebrum Academy
```

**Body Variables:**

- `{{1}}` = Student name (Text)
- `{{2}}` = Demo type - Free/Premium (Text)
- `{{3}}` = Date - e.g., "Mon, Oct 30, 2025" (Text)
- `{{4}}` = Time - e.g., "10:00 AM" (Text)
- `{{5}}` = Zoom link or message (Text)

**Buttons (Optional but Recommended):**

- Button 1: "Add to Calendar" → URL: `{{6}}` (dynamic calendar link)
- Button 2: "Need Help?" → Phone: +918826444334

3. **Submit for Approval** (takes 24-48 hours for Meta to approve)

### Step 4: Add to Environment Variables

Add these to your `.env.local` file:

```bash
INTERAKT_API_KEY="your_api_key_from_step_2"
INTERAKT_PHONE_NUMBER_ID="your_whatsapp_phone_id"
```

### Step 5: Test the Integration

Once the template is approved:

1. Go to http://localhost:3000/demo-booking
2. Fill out the form
3. Submit booking
4. Check your phone for WhatsApp message

---

## Sample WhatsApp Message

When a student books, they'll receive:

```
Hi Rahul! Your Free NEET Biology demo is confirmed for Mon, Oct 30, 2025 at 10:00 AM. We'll send the Zoom link 30 minutes before. Questions? Call +91 88264 44334. - Cerebrum Academy

[Add to Calendar] [Need Help?]
```

---

## Troubleshooting

### Template Not Approved?

- **Issue**: Promotional content in utility template
- **Fix**: Keep message factual, avoid promotional language
- **Resubmit**: Edit template and resubmit for approval

### API Returns 401 Unauthorized?

- **Issue**: Incorrect API key
- **Fix**: Double-check the API key in Interakt dashboard
- **Format**: Ensure no extra spaces in `.env.local`

### Message Not Delivered?

- **Issue**: Phone number format wrong
- **Fix**: Code automatically formats to +91 for Indian numbers
- **Check**: Ensure WhatsApp is installed on recipient's phone

### Template Variables Mismatch?

- **Issue**: Too many/few variables in template
- **Fix**: Ensure template has exactly 5 body variables as shown above

---

## Alternative: SMS Fallback

If you prefer SMS over WhatsApp, Interakt also supports SMS. Just change the API endpoint in the code:

```typescript
// In src/app/api/notifications/sms/route.ts
const response = await fetch('https://api.interakt.ai/v1/public/sms/', {
  // Change to /sms/
  method: 'POST',
  // ... rest of the code
})
```

---

## Cost Estimate

### Interakt Pricing (as of 2025)

- **WhatsApp Messages**: ~₹0.15 - ₹0.40 per message (depends on template type)
- **SMS Messages**: ~₹0.25 per SMS

### Monthly Cost for Demo Bookings

- 50 bookings/month × ₹0.25 = **₹12.50/month**
- Very affordable! 🎉

---

## Advanced: Multiple Templates

You can create different templates for:

1. **Demo Confirmation** (when booking is made)
2. **Demo Reminder** (24 hours before)
3. **Zoom Link** (30 minutes before)
4. **Post-Demo Follow-up** (after demo)

Just create templates with different names in Interakt and reference them in the API call.

---

## Support

**Interakt Support:**

- Email: support@interakt.ai
- Docs: https://docs.interakt.ai/
- Chat: Available in dashboard

**Our Implementation:**

- API Route: `src/app/api/notifications/sms/route.ts`
- Called from: `DemoBookingSystem.tsx` → `sendSMSConfirmation()`

---

## Ready to Go! 🚀

Once you've completed these steps:

1. ✅ API credentials added to `.env.local`
2. ✅ WhatsApp template created and approved
3. ✅ Test booking made successfully
4. ✅ Message received on phone

You're all set! Students will now receive instant WhatsApp confirmations for their demo bookings.
