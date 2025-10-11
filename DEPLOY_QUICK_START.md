# ⚡ Quick Deploy - Cerebrum Biology Academy LMS

**Time Required:** 30-45 minutes
**Difficulty:** Easy

---

## 🎯 Quick Steps (Copy-Paste Ready)

### **Step 1: Commit & Push (2 minutes)**

```bash
git add .
git commit -m "🚀 Production ready: Complete LMS with database, auth, and student portal"
git push origin main
```

### **Step 2: Vercel Environment Variables (10 minutes)**

Go to: **https://vercel.com/dashboard → Your Project → Settings → Environment Variables**

**Copy-paste these (update YOUR_DOMAIN.com):**

```env
# URLs (CRITICAL - Update domain!)
NEXT_PUBLIC_SITE_URL=https://YOUR_DOMAIN.com
NEXT_PUBLIC_API_URL=https://YOUR_DOMAIN.com/api
AUTH_URL=https://YOUR_DOMAIN.com
NEXTAUTH_URL=https://YOUR_DOMAIN.com
NODE_ENV=production

# Database (Ready to use)
DATABASE_URL=postgresql://postgres:Tv6C%2AVjtf7L%40vcs@db.auhvqhytfunmzdnccgtz.supabase.co:5432/postgres
NEXT_PUBLIC_SUPABASE_URL=https://auhvqhytfunmzdnccgtz.supabase.co

# Authentication (Production secrets)
AUTH_SECRET=IW03Hs3GFkHeMpaWqq1GCd1b9eJP/1uZ+qopea7+Ph4=
NEXTAUTH_SECRET=IW03Hs3GFkHeMpaWqq1GCd1b9eJP/1uZ+qopea7+Ph4=
AUTH_TRUST_HOST=true

# Admin Login (CHANGE PASSWORD AFTER FIRST LOGIN!)
ADMIN_EMAIL=admin@cerebrumbiologyacademy.com
ADMIN_PASSWORD_HASH=$2b$12$8TmsGTu9iPkNwCSHkw8QSegvhSfQr3cZlImDjw9/QX6wD.6SiuHG6
BCRYPT_ROUNDS=12

# File Storage (Ready to use)
BLOB_READ_WRITE_TOKEN=vercel_blob_rw_fmfuCkYSPjBOswAq_aDFuhzLkESnw2PlYD9kbZiUynV7Nj0

# Contact
CONTACT_EMAIL=info@cerebrumbiologyacademy.com
SUPPORT_PHONE=+918826444334
```

**For each variable:**

1. Click "Add New"
2. Paste name and value
3. Check: ✓ Production ✓ Preview ✓ Development
4. Click "Save"

### **Step 3: Deploy (5 minutes)**

**If GitHub connected (Automatic):**

- Vercel auto-deploys after push
- Check: https://vercel.com/dashboard → Deployments

**If Manual Deploy:**

```bash
npm i -g vercel
vercel login
vercel --prod
```

### **Step 4: Run Database Migration (3 minutes)**

```bash
npx prisma migrate deploy
```

Or in Vercel dashboard, run as serverless function.

### **Step 5: Test (10 minutes)**

1. **Visit:** https://YOUR_DOMAIN.com
2. **Admin Login:** https://YOUR_DOMAIN.com/admin/login
   - Email: `admin@cerebrumbiologyacademy.com`
   - Password: `StrongPass2024!`
3. **Upload PDF:** https://YOUR_DOMAIN.com/admin/lms/materials/upload
4. **Student Portal:** https://YOUR_DOMAIN.com/student/materials

---

## 🔑 Admin Credentials (First Time)

```
Email: admin@cerebrumbiologyacademy.com
Password: StrongPass2024!

⚠️ CHANGE THIS IMMEDIATELY AFTER FIRST LOGIN!
```

---

## ✅ Success Check

Your deployment works if:

- [ ] Homepage loads (no errors)
- [ ] Admin can login
- [ ] Admin can upload PDF
- [ ] Students can see materials
- [ ] Download tracking works

---

## 🐛 Quick Troubleshooting

**Build Failed?**

- Check TypeScript: `npm run type-check`
- Check logs in Vercel dashboard

**Database Error?**

- Verify `DATABASE_URL` is set correctly
- Check Supabase is active: https://supabase.com/dashboard

**Auth Not Working?**

- Verify `AUTH_URL` matches your domain
- Check `AUTH_SECRET` is set

**File Upload Fails?**

- Check `BLOB_READ_WRITE_TOKEN` is set
- Verify Vercel Blob storage is active

---

## 📞 Need Help?

**Full Guide:** See `PRODUCTION_DEPLOY.md` for detailed instructions

**Quick Support:**

- Vercel: https://vercel.com/support
- Supabase: https://supabase.com/support
- Your Phone: +91 88264 44334

---

## 🎉 That's It!

Your LMS is now live and ready for students!

**Next Steps:**

1. Change admin password
2. Upload real study materials
3. Invite students
4. Monitor usage

**Want to add more features?** See `DEPLOYMENT_READY.md` for roadmap.
