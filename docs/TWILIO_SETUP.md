# Twilio Setup Guide for Cerebrum Biology Academy

## Current Status

The Twilio credentials need to be updated. Error code 20003 indicates invalid authentication.

## Step 1: Get Twilio Credentials

1. Go to [Twilio Console](https://console.twilio.com/)
2. Log in or create an account
3. From the dashboard, copy:
   - **Account SID**: Starts with `AC...`
   - **Auth Token**: Click "Show" to reveal and copy

## Step 2: Update Environment Variables

Update these in `.env.local`:

```bash
TWILIO_ACCOUNT_SID="ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
TWILIO_AUTH_TOKEN="your_auth_token_here"
```

## Step 3: Create or Verify Verify Service

Run the setup script after updating credentials:

```bash
node scripts/create-twilio-verify-service.js
```

This will either:

- List existing Verify services (copy the SID to `.env.local`)
- Create a new service if none exists

Update in `.env.local`:

```bash
TWILIO_VERIFY_SERVICE_SID="VAxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
```

## Step 4: Optional - Get a Twilio Phone Number

For SMS sending (not needed for Verify which uses Twilio's pool):

1. Go to Phone Numbers > Manage > Buy a Number
2. Choose an Indian number or US number with SMS capability
3. Update:

```bash
TWILIO_PHONE_NUMBER="+1234567890"
```

## Step 5: Test the Integration

After updating credentials, test via:

```bash
# Test credentials
node scripts/create-twilio-verify-service.js

# Or use the API endpoint
curl -X POST http://localhost:3000/api/test/twilio \
  -H "Content-Type: application/json" \
  -d '{"phone": "+919876543210"}'
```

## Step 6: Enable WhatsApp Channel (Optional)

For WhatsApp OTP via Twilio:

1. Go to Messaging > Try it out > Send a WhatsApp message
2. Follow the sandbox setup for testing
3. For production, apply for WhatsApp Business API

## Environment Variables Summary

```bash
# Required for Twilio Verify (OTP)
TWILIO_ACCOUNT_SID="ACxxxxx..."
TWILIO_AUTH_TOKEN="xxxxx..."
TWILIO_VERIFY_SERVICE_SID="VAxxxxx..."

# Optional - for direct SMS (not needed for Verify)
TWILIO_PHONE_NUMBER="+1234567890"
```

## Pricing

- **Twilio Verify SMS**: ~$0.05 per verification (includes carrier fees)
- **Twilio Verify WhatsApp**: ~$0.005 per verification
- **Phone Number**: ~$1/month for US, ~$2/month for India

## Support

- [Twilio Verify Documentation](https://www.twilio.com/docs/verify)
- [Twilio Console](https://console.twilio.com/)
