# 🗄️ Create New Supabase Project - Step by Step

**Time Required:** 5-10 minutes
**Current Status:** Creating new database for Cerebrum Biology Academy

---

## 📋 Step 1: Go to Supabase Dashboard

1. Open browser and go to: **https://supabase.com/dashboard**
2. **Login** or **Sign up** if you don't have an account
   - Can use GitHub, Google, or Email

---

## 📋 Step 2: Create New Project

Once logged in:

1. Click the **"New Project"** button (usually top right or center)
2. You'll see a form with these fields:

---

## 📋 Step 3: Fill in Project Details

### **Project Name:**

```
cerebrum-biology-academy
```

_Or any name you prefer - this is just for identification_

### **Database Password:**

**IMPORTANT:** Create a strong password and **SAVE IT IMMEDIATELY!**

**Example strong password:**

```
Cerebrum@2025$Bio!Academy#7890
```

**✅ Best Practice:**

- Copy it to a password manager
- Or save in a secure note
- You'll need this for DATABASE_URL

### **Region:**

Choose the closest region to your users:

- **For India:** Select **Singapore** (ap-southeast-1) or **Mumbai** if available
- **For International:** Select region closest to your main user base

### **Pricing Plan:**

- Select **"Free"** (sufficient for development and small-scale production)
- Free tier includes:
  - 500MB database
  - 1GB file storage
  - 50,000 monthly active users
  - Unlimited API requests

---

## 📋 Step 4: Create Project

1. Click **"Create new project"**
2. Wait for provisioning (usually 2-3 minutes)
3. You'll see a progress indicator
4. ☕ Grab a coffee while waiting!

---

## 📋 Step 5: Get Connection String

Once project is created:

### Method 1: Direct from Dashboard

1. Click on **"Settings"** icon (gear icon) in left sidebar
2. Click **"Database"** in the settings menu
3. Scroll down to **"Connection string"** section
4. Click on **"URI"** tab
5. You'll see something like:
   ```
   postgresql://postgres:[YOUR-PASSWORD]@db.xxxxxxxxxxxxx.supabase.co:5432/postgres
   ```
6. Click **"Copy"** button

### Method 2: Manual Construction

If you prefer to build it manually:

**Format:**

```
postgresql://postgres:[YOUR-PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres
```

**Example:**

```
postgresql://postgres:Cerebrum@2025$Bio!Academy#7890@db.abcdefghijklmno.supabase.co:5432/postgres
```

**⚠️ IMPORTANT:** You need to **URL encode** special characters in password:

| Character | URL Encoded | Example                     |
| --------- | ----------- | --------------------------- |
| `@`       | `%40`       | `Admin@123` → `Admin%40123` |
| `#`       | `%23`       | `Pass#456` → `Pass%23456`   |
| `$`       | `%24`       | `Test$789` → `Test%24789`   |
| `*`       | `%2A`       | `Key*123` → `Key%2A123`     |
| `!`       | `%21`       | `Pass!456` → `Pass%21456`   |

**Correct encoded format:**

```
postgresql://postgres:Cerebrum%402025%24Bio%21Academy%237890@db.abcdefghijklmno.supabase.co:5432/postgres
```

---

## 📋 Step 6: Update .env.local

1. Open your project in VS Code or text editor
2. Open file: `.env.local`
3. Find the line with `DATABASE_URL`
4. Replace it with your new connection string:

```bash
DATABASE_URL="postgresql://postgres:YOUR_ENCODED_PASSWORD@db.YOUR_PROJECT_REF.supabase.co:5432/postgres"
```

**Example:**

```bash
# Old (not working)
DATABASE_URL="postgresql://postgres:Tv6C%2AVjtf7L%40vcs@db.hrgvsbhkyuuvjojnhpqb.supabase.co:5432/postgres"

# New (working)
DATABASE_URL="postgresql://postgres:Cerebrum%402025%24Bio%21Academy%237890@db.abcdefghijklmno.supabase.co:5432/postgres"
```

5. **Save the file** (Cmd+S or Ctrl+S)

---

## 📋 Step 7: Also Update Supabase URL

In the same `.env.local` file, update:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT_REF.supabase.co
```

**Example:**

```bash
NEXT_PUBLIC_SUPABASE_URL=https://abcdefghijklmno.supabase.co
```

You can find this URL in Supabase Dashboard → Settings → API

---

## 📋 Step 8: Test Connection

Open terminal and run:

```bash
npx prisma db push --skip-generate
```

**Expected Output:**

```
Environment variables loaded from .env
Prisma schema loaded from prisma/schema.prisma
Datasource "db": PostgreSQL database "postgres"

✅ Database connection successful
🚀 Your database is now in sync with your Prisma schema.
```

**If you see an error:**

- Check password encoding is correct
- Verify project is fully provisioned (wait another minute)
- Check you copied the full connection string

---

## 📋 Step 9: Run Database Migration

Now create all the LMS tables:

```bash
npx prisma migrate dev --name init_lms_system
```

**Expected Output:**

```
Environment variables loaded from .env
Prisma schema loaded from prisma/schema.prisma
Datasource "db": PostgreSQL database "postgres"

Applying migration `20250107000000_init_lms_system`

The following migration(s) have been created and applied from new schema changes:

migrations/
  └─ 20250107000000_init_lms_system/
    └─ migration.sql

Your database is now in sync with your schema.

✔ Generated Prisma Client
```

---

## 📋 Step 10: Verify Tables Created

Open Prisma Studio to see your database:

```bash
npx prisma studio
```

This will open a browser window showing all your tables:

- ✅ User
- ✅ Course
- ✅ Chapter
- ✅ Topic
- ✅ StudyMaterial
- ✅ MaterialAccess
- ✅ MaterialProgress
- ✅ ContentNotification

---

## ✅ Success Checklist

Mark each when complete:

- [ ] Supabase project created
- [ ] Database password saved securely
- [ ] Connection string copied
- [ ] Special characters URL encoded
- [ ] DATABASE_URL updated in .env.local
- [ ] NEXT_PUBLIC_SUPABASE_URL updated
- [ ] Connection test passed (`npx prisma db push`)
- [ ] Migration successful (`npx prisma migrate dev`)
- [ ] Tables verified in Prisma Studio
- [ ] Dev server restarted

---

## 🔄 Final Step: Restart Dev Server

Kill existing server and restart:

```bash
# Kill the server (Ctrl+C in terminal)
# Or use:
pkill -f "next dev"

# Start fresh
npm run dev
```

---

## 🎉 You're Done!

Your Supabase database is now ready for the LMS system!

**Next Steps:**

1. ✅ Database is ready
2. ⏳ Configure Vercel Blob token (next task)
3. ⏳ Test LMS upload functionality
4. ⏳ Deploy to production

---

## 🆘 Troubleshooting

### Issue: "P1001: Can't reach database server"

**Solution 1:** Wait longer

- New Supabase projects take 2-3 minutes to fully provision
- Wait another 2 minutes and try again

**Solution 2:** Check URL encoding

```bash
# Test if password has special characters
# Use this tool: https://www.urlencoder.org
```

**Solution 3:** Regenerate password

- Go to Supabase Dashboard → Settings → Database
- Click "Reset database password"
- Use simple password without special characters: `Cerebrum2025Bio`

### Issue: "P1000: Authentication failed"

**Fix:** Password is wrong or not properly encoded

```bash
# Double-check:
# 1. Password matches what you set in Supabase
# 2. Special characters are URL encoded
# 3. No extra spaces in DATABASE_URL
```

### Issue: Migration fails with "relation already exists"

**Fix:** Reset database and try again

```bash
npx prisma migrate reset
npx prisma migrate dev --name init_lms_system
```

---

## 📝 Save These Details

Create a secure note with:

```
SUPABASE PROJECT DETAILS
========================
Project Name: cerebrum-biology-academy
Project ID: [your-project-id]
Region: Singapore (or your chosen region)
Database Password: [your-password]
Connection String: postgresql://postgres:[password]@db.[ref].supabase.co:5432/postgres
Dashboard URL: https://supabase.com/dashboard/project/[project-id]
Created Date: [today's date]
```

---

**Ready to proceed?** Let me know once you've completed these steps, and I'll help with the next task (Vercel Blob configuration)!
