# ⚡ Quick Start - Supabase Setup (5 Minutes)

## 🚀 **Follow These 5 Simple Steps:**

---

### 1️⃣ **Create Project** (2 minutes)

```
🌐 Go to: https://supabase.com/dashboard
👉 Click: "New Project"
📝 Fill in:
   - Name: cerebrum-biology-academy
   - Password: [Create strong password - SAVE IT!]
   - Region: Singapore (or closest to India)
✅ Click: "Create new project"
⏳ Wait: 2-3 minutes
```

---

### 2️⃣ **Get Connection String** (1 minute)

```
⚙️  Click: Settings (gear icon)
🗄️  Click: Database
📋 Find: "Connection string" section
📝 Tab: URI
📋 Copy: The full connection string
```

**It looks like:**

```
postgresql://postgres:YOUR_PASSWORD@db.xxxxx.supabase.co:5432/postgres
```

---

### 3️⃣ **Update .env.local** (30 seconds)

```bash
# Open: .env.local
# Find line: DATABASE_URL="postgresql://..."
# Replace with: Your new connection string

DATABASE_URL="postgresql://postgres:YOUR_PASSWORD@db.xxxxx.supabase.co:5432/postgres"
```

**⚠️ Important:** If password has special characters (`@#$!*`), URL encode them:

- `@` → `%40`
- `#` → `%23`
- `$` → `%24`
- `!` → `%21`
- `*` → `%2A`

---

### 4️⃣ **Run Migration** (1 minute)

```bash
# Open terminal in your project folder
# Run this command:

npx prisma migrate dev --name init_lms_system
```

**Wait for:** "Your database is now in sync with your schema" ✅

---

### 5️⃣ **Verify** (30 seconds)

```bash
# Open database browser:
npx prisma studio

# Should see these tables:
✅ User
✅ Course
✅ Chapter
✅ Topic
✅ StudyMaterial
✅ MaterialAccess
✅ MaterialProgress
✅ ContentNotification
```

---

## ✅ **Done!**

Database is ready for LMS system!

**Next:** Configure Vercel Blob token for file uploads

---

## 🆘 **Quick Troubleshooting:**

**"Can't reach database server"**
→ Wait 2 more minutes, Supabase is still starting

**"Authentication failed"**
→ Check password in DATABASE_URL is correct

**"Migration failed"**
→ Run: `npx prisma migrate reset` and try again

---

**Need detailed guide?** See: `CREATE_SUPABASE_PROJECT.md`
