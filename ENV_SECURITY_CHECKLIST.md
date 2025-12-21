# Environment Variables Security Checklist

## 🔴 CRITICAL - Required for Production

These MUST be set before deploying. App will crash without them.

### Authentication Secrets

```bash
# JWT tokens for user sessions
JWT_SECRET=649deeaf4026ffdcacaa909e2c6620701bec278ffea3a94a2243975bd17f1db1
JWT_REFRESH_SECRET=c73638c9745ac34a5cb3e04ff92ae0dcd6fa3693d671d70a5349ee5e1e0a6ae9

# NextAuth.js secret
NEXTAUTH_SECRET=b6a2fdd6ab49e3007040c70870d0a60adf2cdd14b395eee2706d00e8a0231433
AUTH_SECRET=b6a2fdd6ab49e3007040c70870d0a60adf2cdd14b395eee2706d00e8a0231433
```

### Admin Access

```bash
# Free resources admin panel
FREE_RESOURCES_ADMIN_PASSWORD=gxSyLWZEQi2qThqYKVSgk9xhQtBhP

# Primary admin account (for database seeding)
ADMIN_PHONE=9999744334
ADMIN_EMAIL=bobbyaiims@gmail.com
ADMIN_NAME=Dr. Shekhar Singh
```

---

## 🟡 Already Configured (Verified)

These are already in your `.env`:

### Twilio (OTP Authentication)

- [x] `TWILIO_ACCOUNT_SID` ✅
- [x] `TWILIO_AUTH_TOKEN` ✅
- [x] `TWILIO_VERIFY_SERVICE_SID` ✅

### Interakt (WhatsApp)

- [x] `INTERAKT_API_KEY` ✅

---

## 🟢 Payment Secrets (Need to verify)

Check these are set correctly:

```bash
# Razorpay
RAZORPAY_KEY_ID=rzp_live_xxxxx        # Your live key
RAZORPAY_KEY_SECRET=xxxxx              # Your secret key
RAZORPAY_WEBHOOK_SECRET=xxxxx          # From Razorpay dashboard

# Stripe (if using)
STRIPE_SECRET_KEY=sk_live_xxxxx
STRIPE_WEBHOOK_SECRET=whsec_xxxxx
```

---

## 📋 Vercel Setup Instructions

### Step 1: Go to Vercel Dashboard

1. Open https://vercel.com/dashboard
2. Select your project
3. Go to Settings → Environment Variables

### Step 2: Add Each Variable

Add these one by one:

| Variable                        | Value                     | Environment                      |
| ------------------------------- | ------------------------- | -------------------------------- |
| `JWT_SECRET`                    | (from above)              | Production, Preview, Development |
| `JWT_REFRESH_SECRET`            | (from above)              | Production, Preview, Development |
| `NEXTAUTH_SECRET`               | (from above)              | Production, Preview, Development |
| `AUTH_SECRET`                   | (same as NEXTAUTH_SECRET) | Production, Preview, Development |
| `FREE_RESOURCES_ADMIN_PASSWORD` | (from above)              | Production, Preview, Development |

### Step 3: Redeploy

After adding all variables, trigger a new deployment.

---

## 🔒 Security Notes

1. **Never commit these to git** - They're in `.gitignore`
2. **Rotate secrets periodically** - Every 90 days recommended
3. **Use different secrets per environment** - Don't share between dev/staging/prod
4. **Delete this file after setup** - Don't keep secrets in markdown files

---

## ✅ Verification Commands

After deploying, verify secrets are loaded:

```bash
# Check if app starts without errors
curl https://cerebrumbiologyacademy.com/api/health

# Test OTP endpoint
curl -X POST https://cerebrumbiologyacademy.com/api/auth/otp/send \
  -H "Content-Type: application/json" \
  -d '{"to": "9876543210", "channel": "sms", "purpose": "verify"}'
```

---

## 🚨 After Setup - Delete This File!

```bash
rm ENV_SECURITY_CHECKLIST.md
```

The secrets in this file should be copied to Vercel, then this file should be deleted.
