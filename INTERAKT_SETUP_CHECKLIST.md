# Interakt Setup Checklist - Follow Along

## ✅ Complete These Steps in Order

### Step 1: Create Account ⏱️ 2 minutes

- [ ] Go to https://app.interakt.ai/signup
- [ ] Enter Business Name: **Cerebrum Biology Academy**
- [ ] Enter your name
- [ ] Enter email: **[your business email]**
- [ ] Enter phone: **+91 [your WhatsApp Business number]**
- [ ] Create password
- [ ] Click "Sign Up"

---

### Step 2: Complete Onboarding ⏱️ 1 minute

- [ ] Select Industry: **Education / Coaching**
- [ ] Select Use Case: **Marketing & Notifications**
- [ ] Select Company Size: **[your size]**
- [ ] Click through the welcome wizard

---

### Step 3: Connect WhatsApp ⏱️ 5 minutes

- [ ] Click "Connect WhatsApp" or "Get WhatsApp Business API"
- [ ] Follow Interakt's setup wizard
- [ ] Verify your business with Facebook (if required)
- [ ] Wait for WhatsApp connection to complete
- [ ] You should see: ✅ "WhatsApp Connected"

---

### Step 4: Get API Key ⏱️ 1 minute

- [ ] Click **"Settings"** (gear icon) in left sidebar
- [ ] Click **"API & Webhooks"**
- [ ] Copy your **API Key** (looks like: abc123xyz456...)
- [ ] Save it temporarily in a note/file

**Your API Key:** `_________________________`

---

### Step 5: Get Phone Number ID ⏱️ 30 seconds

- [ ] Still in Settings, click **"WhatsApp Settings"**
- [ ] Find your **Phone Number ID** (15-digit number)
- [ ] Copy it
- [ ] Save it temporarily

**Your Phone ID:** `_________________________`

---

### Step 6: Create Template ⏱️ 5 minutes

#### A. Start Template Creation

- [ ] Click **"Templates"** in left sidebar
- [ ] Click **"+ Create Template"** or **"New Template"**

#### B. Basic Settings

- [ ] **Name:** `demo_confirmation` (EXACT - no spaces, all lowercase)
- [ ] **Category:** Select **"UTILITY"** (NOT Marketing!)
- [ ] **Language:** English

#### C. Header Section

- [ ] Select **"None"** (no header)

  OR if you want a header:

- [ ] Select "Text"
- [ ] Enter: "Demo Confirmation"

#### D. Body Text (COPY EXACTLY)

```
Hi {{1}}! Your {{2}} NEET Biology demo is confirmed for {{3}} at {{4}}. {{5}} Questions? Call +91 88264 44334. - Cerebrum Academy
```

**Copy this ☝️ and paste into the Body Text field**

#### E. Add Sample Values (For Meta Review)

Interakt will ask for sample values to show Meta:

- [ ] **Variable 1 ({{1}}):** `Rahul`
- [ ] **Variable 2 ({{2}}):** `Free`
- [ ] **Variable 3 ({{3}}):** `Mon, Oct 30, 2025`
- [ ] **Variable 4 ({{4}}):** `10:00 AM`
- [ ] **Variable 5 ({{5}}):** `We'll send the Zoom link 30 minutes before`

#### F. Footer (Optional)

- [ ] Select "None"

  OR:

- [ ] Enter: "Cerebrum Biology Academy"

#### G. Buttons (Optional but Recommended)

**Button 1:**

- [ ] Type: **Call**
- [ ] Text: `Need Help?`
- [ ] Phone: `+918826444334`

**Button 2:** (Skip for now, can add later)

#### H. Submit Template

- [ ] Review everything looks correct
- [ ] Click **"Submit"** or **"Submit for Approval"**
- [ ] You'll see status: **🟡 PENDING**

---

### Step 7: Wait for Approval ⏱️ 24-48 hours

- [ ] Check email for approval notification
- [ ] Or check Interakt dashboard under "Templates"
- [ ] Status will change to: **🟢 APPROVED**

**While Waiting:** You can continue testing the booking system. SMS just won't work until template is approved.

---

### Step 8: Add Credentials to .env.local ⏱️ 1 minute

Once approved, add these to your `.env.local` file:

```bash
# Add these two lines:
INTERAKT_API_KEY="paste_your_api_key_from_step_4"
INTERAKT_PHONE_NUMBER_ID="paste_your_phone_id_from_step_5"
```

**Open file:**

```bash
code .env.local
# or
nano .env.local
# or
open -e .env.local  # On Mac
```

**Add the lines, then save the file.**

---

### Step 9: Restart Dev Server ⏱️ 10 seconds

In your terminal:

```bash
# Press Ctrl+C to stop the server
# Then restart:
npm run dev
```

Or just refresh if using hot reload.

---

### Step 10: Test SMS! ⏱️ 2 minutes

- [ ] Go to http://localhost:3000/demo-booking
- [ ] Fill out form with YOUR phone number
- [ ] Submit booking
- [ ] Wait 10-30 seconds
- [ ] **Check your WhatsApp!** 📱
- [ ] You should receive the confirmation message

**Message should look like:**

```
Hi [Your Name]! Your Free NEET Biology demo is confirmed for [Date] at [Time]. We'll send the Zoom link 30 minutes before. Questions? Call +91 88264 44334. - Cerebrum Academy

[Need Help?]
```

---

## 🎉 Success Criteria

You're done when:

- ✅ Template status shows: **APPROVED**
- ✅ Credentials added to `.env.local`
- ✅ Test booking sends WhatsApp message
- ✅ Message arrives on your phone
- ✅ Message looks professional

---

## 🆘 Troubleshooting

### Template Rejected?

**Most common reasons:**

1. Category set to "Marketing" instead of "Utility" → Change and resubmit
2. Promotional language detected → Remove words like "offer", "discount", "free trial"
3. Too many variables → Our template is fine, this shouldn't happen

**Fix:** Edit template, change what Meta flagged, resubmit

### Can't Find API Key?

**Location:** Settings → API & Webhooks → Copy API Key

### WhatsApp Not Connected?

**Fix:** Go to Settings → WhatsApp Settings → "Connect WhatsApp Business API"
Follow Interakt's wizard - it's very simple

### Message Not Arriving?

**Check:**

1. Is template approved? (Status = 🟢 APPROVED)
2. Are credentials in `.env.local`?
3. Did you restart the dev server after adding credentials?
4. Is the phone number correct? (+91 prefix for India)
5. Check browser console for errors (F12 → Console tab)
6. Check terminal for errors

### Need More Help?

- Interakt Support: support@interakt.ai (very responsive!)
- Interakt Docs: https://docs.interakt.ai/
- Or ask me - I'm here to help! 😊

---

## ⏭️ After Setup Complete

Once everything works:

1. **Deploy to Production:**

   ```bash
   git add .env.local
   git commit -m "feat: Add Interakt SMS integration"
   git push origin main
   ```

2. **Add Credentials to Vercel:**
   - Go to Vercel dashboard
   - Project Settings → Environment Variables
   - Add `INTERAKT_API_KEY` and `INTERAKT_PHONE_NUMBER_ID`
   - Redeploy

3. **Test in Production:**
   - Make a booking on live site
   - Verify SMS arrives
   - Monitor for 24 hours

4. **Celebrate!** 🎉 Your demo booking system is fully operational!

---

## 📊 Current Progress

Track your progress:

- [ ] Account created
- [ ] WhatsApp connected
- [ ] API credentials obtained
- [ ] Template created
- [ ] Template submitted
- [ ] Template approved
- [ ] Credentials added to .env.local
- [ ] Dev server restarted
- [ ] Test SMS sent successfully
- [ ] Deployed to production

**Current Step:** ********\_********
**Stuck on:** ********\_********
**Need help with:** ********\_********
