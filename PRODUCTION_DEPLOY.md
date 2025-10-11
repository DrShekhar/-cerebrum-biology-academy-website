# 🚀 Production Deployment Guide

**Generated:** October 12, 2025
**Target:** Vercel Production
**Domain:** cerebrumbiologyacademy.com

---

## 🔐 Step 1: Production Secrets (GENERATED)

**⚠️ IMPORTANT: Keep these secrets secure! Never commit to git.**

### 1. Authentication Secret

```bash
AUTH_SECRET=IW03Hs3GFkHeMpaWqq1GCd1b9eJP/1uZ+qopea7+Ph4=
NEXTAUTH_SECRET=IW03Hs3GFkHeMpaWqq1GCd1b9eJP/1uZ+qopea7+Ph4=
```

### 2. Admin Credentials

```bash
ADMIN_EMAIL=admin@cerebrumbiologyacademy.com
ADMIN_PASSWORD_HASH=$2b$12$8TmsGTu9iPkNwCSHkw8QSegvhSfQr3cZlImDjw9/QX6wD.6SiuHG6

# Admin Login Credentials:
# Email: admin@cerebrumbiologyacademy.com
# Password: StrongPass2024!
# ⚠️ CHANGE THIS AFTER FIRST LOGIN!
```

### 3. Webhook Secret (for future use)

```bash
WHATSAPP_WEBHOOK_SECRET=e57094cf63bd42f90d34a6b3fd772a6aa2ed9e71c191353511b7470ab9575ecd
```

---

## 📋 Step 2: Complete Environment Variables for Vercel

Copy these to **Vercel Dashboard → Settings → Environment Variables**

### **Critical - Required for LMS:**

```bash
# Application URLs (Update with your domain)
NEXT_PUBLIC_SITE_URL=https://cerebrumbiologyacademy.com
NEXT_PUBLIC_API_URL=https://cerebrumbiologyacademy.com/api
AUTH_URL=https://cerebrumbiologyacademy.com
NEXTAUTH_URL=https://cerebrumbiologyacademy.com
NODE_ENV=production

# Database (Supabase)
DATABASE_URL=postgresql://postgres:Tv6C%2AVjtf7L%40vcs@db.auhvqhytfunmzdnccgtz.supabase.co:5432/postgres

# Supabase Public URL
NEXT_PUBLIC_SUPABASE_URL=https://auhvqhytfunmzdnccgtz.supabase.co
SUPABASE_KEY=your-supabase-anon-key-here
# TODO: Get from https://supabase.com/dashboard → Settings → API → anon public key

# Authentication (Generated above)
AUTH_SECRET=IW03Hs3GFkHeMpaWqq1GCd1b9eJP/1uZ+qopea7+Ph4=
NEXTAUTH_SECRET=IW03Hs3GFkHeMpaWqq1GCd1b9eJP/1uZ+qopea7+Ph4=
AUTH_TRUST_HOST=true

# Admin Credentials (Generated above)
ADMIN_EMAIL=admin@cerebrumbiologyacademy.com
ADMIN_PASSWORD_HASH=$2b$12$8TmsGTu9iPkNwCSHkw8QSegvhSfQr3cZlImDjw9/QX6wD.6SiuHG6
BCRYPT_ROUNDS=12

# File Storage (Vercel Blob)
BLOB_READ_WRITE_TOKEN=vercel_blob_rw_fmfuCkYSPjBOswAq_aDFuhzLkESnw2PlYD9kbZiUynV7Nj0

# Contact Info
CONTACT_EMAIL=info@cerebrumbiologyacademy.com
SUPPORT_PHONE=+918826444334
```

### **Optional - Can Add Later:**

```bash
# Analytics (Optional)
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX

# Payment Gateway (Add when ready)
RAZORPAY_KEY_ID=rzp_live_XXXXXXXXXXXX
RAZORPAY_KEY_SECRET=XXXXXXXXXXXX
RAZORPAY_WEBHOOK_SECRET=XXXXXXXXXXXX

# WhatsApp Business API (Add when ready)
WHATSAPP_PHONE_NUMBER_ID=XXXXXXXXXXXX
WHATSAPP_ACCESS_TOKEN=XXXXXXXXXXXX
WHATSAPP_BUSINESS_ACCOUNT_ID=XXXXXXXXXXXX
WHATSAPP_VERIFY_TOKEN=cerebrum_webhook_verify_2024_secure
WHATSAPP_WEBHOOK_SECRET=e57094cf63bd42f90d34a6b3fd772a6aa2ed9e71c191353511b7470ab9575ecd
WHATSAPP_API_URL=https://graph.facebook.com/v18.0
WHATSAPP_TEST_PHONE=+919876543210

# Email SMTP (Add when ready)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
SMTP_FROM=noreply@cerebrumbiologyacademy.com

# AI Services (Already configured)
OPENAI_API_KEY=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
ANTHROPIC_API_KEY=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
GOOGLE_AI_API_KEY=AIzaSyCiybcK3b32jzRfm9NY0jCHjINY8i0rGXA
GOOGLE_CLOUD_PROJECT_ID=62970530347
```

---

## 🚀 Step 3: Deployment Commands

### **Option A: Automatic Deployment (Recommended)**

If your Vercel project is connected to GitHub:

```bash
# 1. Commit and push
git add .
git commit -m "Production ready: LMS with database, auth, and student portal"
git push origin main

# 2. Vercel will auto-deploy
# Check: https://vercel.com/your-project/deployments
```

### **Option B: Manual Deployment with Vercel CLI**

```bash
# 1. Install Vercel CLI (if not installed)
npm i -g vercel

# 2. Login to Vercel
vercel login

# 3. Link project (first time only)
vercel link

# 4. Deploy to production
vercel --prod

# 5. The CLI will give you the production URL
```

### **After Deployment: Run Database Migration**

```bash
# If you have Vercel CLI:
vercel env pull .env.production
npx prisma migrate deploy

# Or manually in Vercel dashboard:
# 1. Go to Vercel Dashboard → Project → Settings → Functions
# 2. Add a one-time function to run: npx prisma migrate deploy
```

---

## 📋 Step 4: Vercel Dashboard Configuration

### **A. Add Environment Variables**

1. Go to: **https://vercel.com/dashboard**
2. Select your project: **cerebrum-biology-academy-website**
3. Go to: **Settings → Environment Variables**
4. Click: **Add New**

**For each variable above:**

- Name: `DATABASE_URL`
- Value: `postgresql://postgres:Tv6C%2AVjtf7L%40vcs@db.auhvqhytfunmzdnccgtz.supabase.co:5432/postgres`
- Environment: ✓ Production, ✓ Preview, ✓ Development
- Click: **Save**

**Repeat for all variables listed in Step 2.**

### **B. Configure Custom Domain**

1. Go to: **Settings → Domains**
2. Add domain: **cerebrumbiologyacademy.com**
3. Add domain: **www.cerebrumbiologyacademy.com** (redirect to main)
4. Update DNS records as shown by Vercel
5. Wait for SSL certificate (auto-generated)

### **C. Configure Build Settings**

Should already be correct, but verify:

- **Framework Preset:** Next.js
- **Build Command:** `npm run build`
- **Output Directory:** `.next`
- **Install Command:** `npm install`
- **Node Version:** 18.x or 20.x

---

## ✅ Step 5: Post-Deployment Checklist

### **Immediate Verification:**

```bash
# 1. Check deployment status
curl -I https://cerebrumbiologyacademy.com

# 2. Test homepage
curl https://cerebrumbiologyacademy.com

# 3. Test API health
curl https://cerebrumbiologyacademy.com/api/health

# 4. Test admin login
# Visit: https://cerebrumbiologyacademy.com/admin/login
# Login: admin@cerebrumbiologyacademy.com / StrongPass2024!
```

### **Functional Testing:**

1. **Admin Panel:**
   - [ ] Login at `/admin/login`
   - [ ] Upload a test PDF at `/admin/lms/materials/upload`
   - [ ] View materials at `/admin/lms/materials`
   - [ ] Delete test material

2. **Student Portal:**
   - [ ] Create test student account (or login)
   - [ ] Browse materials at `/student/materials`
   - [ ] Download a PDF
   - [ ] Verify download tracking in Prisma Studio

3. **Database:**
   - [ ] Check Supabase dashboard for new records
   - [ ] Verify MaterialProgress table updates
   - [ ] Check StudyMaterial table for uploaded files

4. **File Storage:**
   - [ ] Check Vercel Blob dashboard
   - [ ] Verify files are accessible via CDN URLs
   - [ ] Test file download speed

### **Security Verification:**

```bash
# 1. Verify HTTPS is working
curl -I https://cerebrumbiologyacademy.com | grep -i "strict-transport"

# 2. Check authentication
curl https://cerebrumbiologyacademy.com/api/admin/lms/materials
# Should return: {"error":"Unauthorized. Admin access required."}

# 3. Test rate limiting
# Try login 6 times with wrong password - should block after 5 attempts
```

---

## 🔄 Step 6: Update DNS Records

**Your Current Setup:**

- **Registrar:** Hostinger
- **Domain:** cerebrumbiologyacademy.com

**DNS Records to Add/Update:**

```
Type    Name    Value                           TTL
A       @       76.76.21.21 (Vercel IP)        Auto
CNAME   www     cname.vercel-dns.com.          Auto
```

**Vercel will provide the exact records in Dashboard → Domains**

---

## 📊 Step 7: Monitor Deployment

### **Vercel Dashboard:**

- **Deployments:** https://vercel.com/your-project/deployments
- **Analytics:** https://vercel.com/your-project/analytics
- **Logs:** https://vercel.com/your-project/logs

### **Database Monitoring:**

- **Supabase:** https://supabase.com/dashboard/project/auhvqhytfunmzdnccgtz
- **Query Performance:** Check in Supabase → Logs
- **Connection Pool:** Monitor active connections

### **File Storage:**

- **Vercel Blob:** https://vercel.com/dashboard/stores
- **Usage:** Check bandwidth and storage
- **Limits:** Free tier: 500GB/month bandwidth

---

## 🐛 Troubleshooting

### **Issue: Build fails**

```bash
# Check build logs in Vercel dashboard
# Common fixes:
1. Verify all dependencies in package.json
2. Check TypeScript errors: npm run type-check
3. Ensure DATABASE_URL is set correctly
```

### **Issue: Database connection fails**

```bash
# Verify connection string
# Make sure special characters are URL-encoded:
# @ → %40
# * → %2A
# Check Supabase project is active
```

### **Issue: File uploads fail**

```bash
# Check BLOB_READ_WRITE_TOKEN is set
# Verify token has write permissions
# Check Vercel Blob dashboard for errors
```

### **Issue: Authentication not working**

```bash
# Verify AUTH_URL and NEXTAUTH_URL match your domain
# Check AUTH_SECRET is set
# Ensure AUTH_TRUST_HOST=true in production
```

---

## 🎉 Success Criteria

Your deployment is successful when:

- [x] Homepage loads at https://cerebrumbiologyacademy.com
- [x] Admin can login and upload PDFs
- [x] Students can browse and download materials
- [x] Download tracking works (check Prisma Studio)
- [x] HTTPS certificate is active
- [x] No console errors in browser
- [x] Database queries are fast (<100ms)

---

## 📞 Support Resources

**Vercel:**

- Dashboard: https://vercel.com/dashboard
- Docs: https://vercel.com/docs
- Support: https://vercel.com/support

**Supabase:**

- Dashboard: https://supabase.com/dashboard
- Docs: https://supabase.com/docs
- Support: https://supabase.com/support

**Your Project:**

- Repository: GitHub (private)
- Domain: cerebrumbiologyacademy.com (Hostinger)
- Contact: +91 88264 44334

---

## 🔒 Security Notes

**After First Deployment:**

1. ✅ Change admin password immediately
2. ✅ Rotate all API keys every 90 days
3. ✅ Enable Vercel protection (DDoS, rate limiting)
4. ✅ Setup monitoring alerts
5. ✅ Enable Vercel WAF (Web Application Firewall)
6. ✅ Configure CORS for API routes
7. ✅ Setup error tracking (Sentry)

**Regular Maintenance:**

- Weekly: Check logs for errors
- Monthly: Review database performance
- Quarterly: Rotate secrets and API keys
- Annually: Security audit

---

## 📈 Next Steps After Deployment

**Week 1:**

- [ ] Monitor for errors
- [ ] Test with real users
- [ ] Collect feedback
- [ ] Fix any bugs

**Week 2-4:**

- [ ] Add analytics dashboard
- [ ] Setup email notifications
- [ ] Add payment gateway (Razorpay)
- [ ] Configure WhatsApp notifications

**Month 2-3:**

- [ ] Scale based on usage
- [ ] Optimize database queries
- [ ] Add caching (Redis)
- [ ] Mobile app development

---

**Last Updated:** October 12, 2025
**Deployment Status:** Ready ✅
**Estimated Deployment Time:** 30-45 minutes

**Ready to deploy?** Follow the steps above in order!
