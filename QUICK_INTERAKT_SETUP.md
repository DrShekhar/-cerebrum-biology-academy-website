# Quick Interakt Setup - Cerebrum Biology Academy

## ✅ API Key Added

Your Interakt API key has been added to `.env.local`. Dev server is restarting.

## 🚨 Main Issue: Phone Number Not Registered

The error "Customer is not available for the organization" means the phone number you're testing with isn't in your Interakt contacts.

## Quick Fix (2 Minutes)

### Step 1: Login to Interakt

Go to: https://app.interakt.ai/

### Step 2: Add Your Phone Number

1. Click **Contacts** or **Customers** in the left menu
2. Click **Add Contact** or **Import Contacts**
3. Add your details:
   - **Phone**: Your 10-digit WhatsApp number
   - **Country Code**: +91
   - **Name**: Your name (for testing)
4. Click **Save**

### Step 3: Test Again

```bash
# Clear any rate limits
curl -X POST http://localhost:3000/api/auth/whatsapp/clear-rate-limit

# Test with YOUR phone number
curl -X POST http://localhost:3000/api/auth/whatsapp/send-otp \
  -H "Content-Type: application/json" \
  -d '{"phoneNumber": "+91YOUR_10_DIGIT_NUMBER"}'
```

### Step 4: Check Your WhatsApp

You should receive: "Your Cerebrum Biology Academy verification code is: _XXXXXX_"

## Common Issues

### "Customer is not available"

- ❌ Phone number not in Interakt contacts
- ✅ Add it to Interakt dashboard first

### "Unauthorized"

- ✅ Already fixed! API key is now configured

### No message received

- Check Interakt dashboard → Messages → Sent
- Ensure phone has WhatsApp installed
- Wait 30 seconds, might be network delay

## Test Via Browser

1. Go to: http://localhost:3000/auth/whatsapp
2. Enter your registered phone number
3. Click "Send OTP via WhatsApp"
4. Check your WhatsApp
5. Enter the 6-digit OTP
6. Click "Verify & Login"

## Need to Add Multiple Test Numbers?

In Interakt Dashboard:

1. **Contacts** → **Import Contacts**
2. Upload CSV with format:
   ```
   phone,name,email
   9876543210,Test User 1,test1@example.com
   9876543211,Test User 2,test2@example.com
   ```
3. Click **Import**

## Production Note

For production (sending to ANY WhatsApp number):

- You need WhatsApp Business API approval
- Create and get approved a message template
- This is NOT needed for testing with registered contacts

## Next Steps

1. ✅ API Key configured
2. ⏳ Add your phone to Interakt contacts (2 mins)
3. ⏳ Test the OTP flow
4. 🎉 Done!

---

**Your Interakt Dashboard**: https://app.interakt.ai/
**Need Help?**: Check Interakt documentation or contact support@interakt.ai
