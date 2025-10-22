# 🔧 Supabase Database Fix Guide

**Issue:** Cannot reach database server at `db.hrgvsbhkyuuvjojnhpqb.supabase.co:5432`

**Likely Cause:** Supabase project is paused (free tier) or deleted

---

## ✅ Solution 1: Resume Existing Project (If Paused)

### Step 1: Check Supabase Dashboard

1. Go to: **https://supabase.com/dashboard**
2. Login with your account
3. Look for project ID: `hrgvsbhkyuuvjojnhpqb`

### Step 2: Resume Project

If you see the project and it shows "Paused":

- Click on the project
- Click **"Resume Project"** or **"Restore Project"**
- Wait 2-3 minutes for database to start
- Test connection:
  ```bash
  npx prisma db push --skip-generate
  ```

---

## ✅ Solution 2: Create New Supabase Project (If Deleted)

### Step 1: Create New Project

1. Go to: **https://supabase.com/dashboard**
2. Click **"New Project"**
3. Fill in:
   - **Name:** `cerebrum-biology-academy`
   - **Database Password:** Create a strong password (SAVE THIS!)
   - **Region:** Choose closest to India (e.g., Singapore, Mumbai if available)
4. Click **"Create New Project"**
5. Wait 2-3 minutes for provisioning

### Step 2: Get Connection String

1. After project is created, go to **Settings** (gear icon)
2. Click **"Database"** in left sidebar
3. Scroll to **"Connection String"** section
4. Select **"URI"** tab
5. Copy the connection string (looks like):
   ```
   postgresql://postgres:[YOUR-PASSWORD]@db.xxxxxxxxxxxxx.supabase.co:5432/postgres
   ```

### Step 3: Update .env.local

Replace the DATABASE_URL in `.env.local`:

```bash
DATABASE_URL="postgresql://postgres:[YOUR-PASSWORD]@db.xxxxxxxxxxxxx.supabase.co:5432/postgres"
```

**Important:** Replace `[YOUR-PASSWORD]` with the password you created in Step 1

### Step 4: Update Supabase URL

Also update the public URL in `.env.local`:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxxxxxxx.supabase.co
```

---

## ✅ Solution 3: Use Alternative Database (Neon, Railway, etc.)

If you don't want to use Supabase, you can use other PostgreSQL providers:

### Option A: Neon (Recommended - Free Tier)

1. Go to: **https://neon.tech**
2. Sign up / Login
3. Create new project
4. Copy connection string
5. Update DATABASE_URL in `.env.local`

### Option B: Railway

1. Go to: **https://railway.app**
2. Create new project → Add PostgreSQL
3. Copy connection string from variables
4. Update DATABASE_URL in `.env.local`

### Option C: Local PostgreSQL

If you have PostgreSQL installed locally:

```bash
# Install PostgreSQL (macOS)
brew install postgresql@15

# Start PostgreSQL
brew services start postgresql@15

# Create database
createdb cerebrum_bio_academy

# Update .env.local
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/cerebrum_bio_academy"
```

---

## 🧪 Testing the Connection

After updating the DATABASE_URL, test it:

```bash
# Test 1: Check if Prisma can connect
npx prisma db push --skip-generate

# Test 2: If successful, run migration
npx prisma migrate dev --name add_lms_system

# Test 3: Generate Prisma Client
npx prisma generate

# Test 4: Open Prisma Studio to view database
npx prisma studio
```

---

## 🔍 Troubleshooting

### Error: "P1001: Can't reach database server"

**Check:**

1. Is the Supabase project resumed/active?
2. Is the DATABASE_URL correct?
3. Is your internet connection working?
4. Is there a firewall blocking port 5432?

**Try:**

```bash
# Ping the database server
ping db.hrgvsbhkyuuvjojnhpqb.supabase.co

# If ping fails, project is deleted or DNS issue
```

### Error: "Authentication failed"

**Check:**

1. Is the password correct in DATABASE_URL?
2. Special characters in password need URL encoding:
   - `@` → `%40`
   - `:` → `%3A`
   - `#` → `%23`
   - `*` → `%2A`

**Fix:**

```bash
# If password is: MyPass@123
# Encoded: MyPass%40123
DATABASE_URL="postgresql://postgres:MyPass%40123@db.xxx.supabase.co:5432/postgres"
```

### Error: "SSL connection required"

Add `?sslmode=require` to the end of DATABASE_URL:

```bash
DATABASE_URL="postgresql://postgres:password@db.xxx.supabase.co:5432/postgres?sslmode=require"
```

---

## 📝 Quick Reference Commands

```bash
# Test database connection
npx prisma db push --skip-generate

# Run all migrations
npx prisma migrate dev

# Reset database (WARNING: Deletes all data)
npx prisma migrate reset

# Generate Prisma Client
npx prisma generate

# Open database browser
npx prisma studio

# Check migration status
npx prisma migrate status
```

---

## ✅ After Supabase is Fixed

Once the database connection is working:

1. **Run Migration:**

   ```bash
   npx prisma migrate dev --name add_lms_system
   ```

2. **Verify Tables Created:**

   ```bash
   npx prisma studio
   # Should see: StudyMaterial, Chapter, Topic, etc.
   ```

3. **Test LMS Upload:**
   - Go to: http://localhost:3000/admin/lms/materials/upload
   - Upload a PDF
   - Should save to database

4. **Next: Configure Vercel Blob**
   - Get token from Vercel dashboard
   - Add to .env.local: `BLOB_READ_WRITE_TOKEN=xxx`
   - Restart server

---

**Current Status:** PostgreSQL schema restored, waiting for Supabase connection

**Next Step:** Choose one of the solutions above and update DATABASE_URL
