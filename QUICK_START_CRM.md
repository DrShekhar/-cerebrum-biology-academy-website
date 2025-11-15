# Quick Start Guide - Testing CRM Features

## 🚀 Getting Started (3 Simple Steps)

### Step 1: Start the Development Server

```bash
npm run dev
```

Wait for the server to start (usually takes 10-15 seconds).

### Step 2: Access the Direct Login Page

Open your browser and navigate to:

```
http://localhost:3000/auth/direct-login
```

### Step 3: Login with Test Credentials

**For Counselor Access:**

- Email: `counselor@cerebrumacademy.com`
- Password: `demo123456`

**For Admin Access (Full System):**

- Email: `admin@cerebrumbiologyacademy.com`
- Password: `admin123`

---

## 🎯 Available CRM Features

### After Login as Counselor:

1. **Lead Pipeline (Kanban Board)**
   - URL: `http://localhost:3000/counselor/leads`
   - Features: Drag & drop leads, create new leads, view details

2. **Task Management**
   - URL: `http://localhost:3000/counselor/tasks`
   - Features: Create tasks, assign due dates, mark complete

3. **Payment Tracking**
   - URL: `http://localhost:3000/counselor/payments`
   - Features: Track payments, mark as paid, send reminders

4. **Analytics Dashboard**
   - URL: `http://localhost:3000/counselor/analytics`
   - Features: View performance metrics, conversion rates

---

## 📊 Sample Data Available

The database includes:

- 10 sample leads across different stages
- Sample fee plans with installments
- Demo tasks and communications
- Test payment records

---

## ⚡ Troubleshooting

### Issue: Page redirects to WhatsApp login

**Solution:** Make sure you're using the direct login URL:

```
http://localhost:3000/auth/direct-login
```

### Issue: "Authentication required" error

**Solution:**

1. Clear browser cookies
2. Try logging in again
3. Make sure the dev server is running

### Issue: Cannot see any leads

**Solution:** Run the seed script to add sample data:

```bash
npx ts-node --compiler-options '{"module":"commonjs"}' prisma/seed-counselor-simple.ts
```

---

## 📝 Test Workflow

### Testing Lead Management:

1. Login as counselor
2. Go to `/counselor/leads`
3. Click "Create Lead" to add a new lead
4. Drag and drop leads between stages
5. Click on a lead to view details

### Testing Tasks:

1. Go to `/counselor/tasks`
2. Click "Create Task"
3. Fill in task details and assign
4. Mark tasks as complete

### Testing Payments:

1. Go to `/counselor/payments`
2. View upcoming payments
3. Mark installments as paid
4. Send payment reminders

---

## 🔐 Important Security Note

The credentials provided are **TEST CREDENTIALS ONLY** and should be changed before any production deployment.

To change passwords:

```bash
# Generate new password hash
node -e "const bcrypt = require('bcryptjs'); bcrypt.hash('your-new-password', 12).then(console.log);"
```

Then update the database with the new hash.

---

## 📚 Additional Resources

- **Full Authentication Guide:** See `CRM_AUTHENTICATION_GUIDE.md`
- **Test Script:** Run `node test-auth.js` to verify credentials
- **API Documentation:** Check individual route files in `/src/app/api/counselor/`

---

## ✅ Success Indicators

You're ready to test when you see:

- ✅ Server running at http://localhost:3000
- ✅ Can access direct login page
- ✅ Can login with test credentials
- ✅ Can navigate to CRM pages without errors
- ✅ Can see sample leads and data

---

**Need Help?** Refer to the comprehensive guide in `CRM_AUTHENTICATION_GUIDE.md`
