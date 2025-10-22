# 📦 Vercel Blob Storage Setup - Step by Step

**Purpose:** Enable PDF file uploads for LMS system
**Time:** 3-5 minutes

---

## 📋 Step 1: Go to Vercel Dashboard

1. Open browser and go to: **https://vercel.com/dashboard**
2. **Login** with your account (GitHub, GitLab, Email, etc.)
3. If you don't have an account, **Sign up** (free tier is sufficient)

---

## 📋 Step 2: Navigate to Storage

From the Vercel Dashboard:

**Method A: Direct Link**

- Go to: **https://vercel.com/dashboard/stores**

**Method B: From Dashboard**

1. Look at the top navigation bar
2. Click **"Storage"**
3. Or look for **"Stores"** in the sidebar

---

## 📋 Step 3: Create Blob Store

If you don't have a Blob store yet:

1. Click **"Create Database"** or **"Create Store"**
2. Select **"Blob"** (for file storage)
3. Fill in:
   - **Name:** `lms-study-materials` (or any name you prefer)
   - **Region:** Choose closest to your users (e.g., Singapore for India)
4. Click **"Create"**
5. Wait a few seconds for provisioning

---

## 📋 Step 4: Get Read/Write Token

Once the Blob store is created:

### Option A: From Store Settings

1. Click on your Blob store name
2. Go to **"Settings"** tab
3. Scroll to **"Tokens"** section
4. You'll see **"Read-Write Token"**
5. Click **"Show"** or **"Copy"** to reveal the token

### Option B: Quick Copy

Look for a section that shows:

```
BLOB_READ_WRITE_TOKEN=vercel_blob_rw_xxxxxxxxxxxxx
```

Click the **copy icon** to copy the full token.

---

## 📋 Step 5: Token Format

Your token should look like:

```
vercel_blob_rw_XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
```

**Important:**

- Starts with: `vercel_blob_rw_`
- About 50-60 characters long
- Contains letters and numbers
- **Keep it secret!** Don't share publicly

---

## 📋 Step 6: Add to .env.local

Once you have the token, I'll add it to your `.env.local` file.

**Share your token with me** (it's safe - it's your local development environment)

Or if you prefer to add it manually:

1. Open `.env.local`
2. Find the line: `BLOB_READ_WRITE_TOKEN=your-vercel-blob-token-here`
3. Replace with: `BLOB_READ_WRITE_TOKEN=vercel_blob_rw_xxxxx` (your actual token)
4. Save the file

---

## ✅ Verification Checklist

- [ ] Vercel account created/logged in
- [ ] Storage section accessed
- [ ] Blob store created (name: lms-study-materials)
- [ ] Read-Write token copied
- [ ] Token starts with `vercel_blob_rw_`
- [ ] Token ready to add to .env.local

---

## 🆘 Troubleshooting

### Issue: Can't find "Storage" or "Stores"

**Solution 1:** Use direct link

- Go to: https://vercel.com/dashboard/stores

**Solution 2:** Create new store

- Go to: https://vercel.com/new/store
- Select "Blob"

### Issue: No "Create" button visible

**Reason:** You might already have a Blob store
**Solution:**

1. Click on existing Blob store
2. Use that token instead

### Issue: Token doesn't start with `vercel_blob_rw_`

**Problem:** Wrong token type
**Solution:**

1. Make sure you copied the **Read-Write** token (not Read-Only)
2. Look for token labeled "Read-Write" or "Full Access"

---

## 📝 What Happens Next

After you provide the token:

1. ✅ I'll add it to `.env.local`
2. ✅ Restart dev server
3. ✅ Test PDF upload
4. ✅ Verify file is stored in Vercel Blob
5. ✅ LMS system fully functional!

---

## 🔐 Security Notes

- **Never commit** `.env.local` to git (it's already in `.gitignore`)
- **Don't share** your token publicly
- **Use different tokens** for development and production
- **Rotate tokens** periodically for security

---

**Ready?** Get your token and share it with me, or let me know if you need help with any step!
