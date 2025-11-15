# Quick CRM Access Guide

## 🚀 CRM is Now Working!

All issues have been fixed. You can now access the CRM system.

---

## 🔑 Login Credentials

### Counselor Access

- **URL**: http://localhost:3005/auth/direct-login
- **Email**: `counselor@cerebrumacademy.com`
- **Password**: `demo123456`
- **Landing Page**: Lead Pipeline at `/counselor/leads`

### Admin Access

- **URL**: http://localhost:3005/auth/direct-login
- **Email**: `admin@cerebrumbiologyacademy.com`
- **Password**: `admin123`
- **Landing Page**: Admin Dashboard at `/admin`

---

## 📋 What Was Fixed

### Main Issue

The counselor dashboard was showing a blank page because:

1. ❌ No authentication wrapper in the layout
2. ❌ Session was undefined
3. ❌ Navigation wasn't working properly

### Solution Applied

1. ✅ Added NextAuth SessionProvider to counselor layout
2. ✅ Added authentication protection with automatic redirect
3. ✅ Fixed navigation to use Next.js Link components
4. ✅ Created test users in database

---

## 🎯 How to Access CRM

### Step 1: Start Server (if not running)

```bash
npm run dev
```

Server will start on http://localhost:3005

### Step 2: Login as Counselor

1. Go to: http://localhost:3005/auth/direct-login
2. Enter:
   - Email: `counselor@cerebrumacademy.com`
   - Password: `demo123456`
3. Click "Sign In"
4. You'll be redirected to the Lead Pipeline

### Step 3: Navigate the CRM

Click on any of these navigation items:

- **Pipeline** - View and manage leads in Kanban board
- **Tasks** - View and manage follow-up tasks
- **Payments** - Track payment installments
- **Analytics** - View performance metrics

---

## 🎨 CRM Features Available

### Lead Pipeline (`/counselor/leads`)

- Drag-and-drop Kanban board
- Lead stages: New Lead → Demo Scheduled → Demo Completed → Offer Sent → Enrolled
- Search and filter by priority (Hot/Warm/Cold)
- Export to CSV
- Create new leads

### Tasks (`/counselor/tasks`)

- Task management system
- Filter by status and priority
- Due date tracking
- Overdue task alerts

### Payments (`/counselor/payments`)

- Payment installment tracking
- Mark payments as paid
- Send payment reminders
- Filter by payment status

### Analytics (`/counselor/analytics`)

- Conversion rate metrics
- Lead source analysis
- Revenue tracking
- Performance indicators

---

## 🔧 Troubleshooting

### "Cannot access /counselor/leads"

- Make sure you're logged in first
- Use the direct login page: http://localhost:3005/auth/direct-login
- Check console for any errors

### "Blank page after login"

- Clear browser cookies and try again
- Check that server is running on port 3005
- Open browser DevTools (F12) and check Console for errors

### "Invalid email or password"

- Double-check credentials (copy-paste from above)
- Ensure database seed scripts ran successfully
- Users should exist with emails:
  - `counselor@cerebrumacademy.com`
  - `admin@cerebrumbiologyacademy.com`

---

## 📁 Important Files Modified

1. **Authentication Layout**
   - `/src/app/counselor/layout.tsx` - Now has SessionProvider and auth protection

2. **Page Components** (All working)
   - `/src/app/counselor/page.tsx` - Redirects to leads
   - `/src/app/counselor/leads/page.tsx` - Lead pipeline
   - `/src/app/counselor/tasks/page.tsx` - Task management
   - `/src/app/counselor/payments/page.tsx` - Payment tracking
   - `/src/app/counselor/analytics/page.tsx` - Analytics dashboard

3. **API Routes** (All functional)
   - `/api/counselor/leads` - Lead CRUD operations
   - `/api/counselor/tasks` - Task operations
   - `/api/counselor/payments` - Payment operations
   - `/api/counselor/analytics` - Analytics data

---

## ✅ System Status

- **Server**: ✅ Running on port 3005
- **Database**: ✅ Connected to Supabase PostgreSQL
- **Authentication**: ✅ NextAuth configured and working
- **Counselor Routes**: ✅ Protected and accessible
- **Admin Routes**: ✅ Protected and accessible
- **Navigation**: ✅ All links working
- **API Endpoints**: ✅ All functional

---

## 🎉 Ready to Use!

The CRM is fully functional and ready for use. Simply login with the credentials above and start managing leads!

For detailed technical information, see: `CRM_ACCESS_FIXES_SUMMARY.md`
