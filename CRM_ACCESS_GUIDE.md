# CRM Access Guide - Quick Start

## Server Running

Development server: **http://localhost:3000**

## How to Access CRM

### Step 1: Direct Login Page

Navigate to: **http://localhost:3000/auth/direct-login**

### Step 2: Use These Credentials

#### For Counselor Access:

- Email: `counselor@cerebrumacademy.com`
- Password: `demo123456`

#### For Admin Access (Full Control):

- Email: `admin@cerebrumbiologyacademy.com`
- Password: `admin123`

## CRM Features You Can Access

### After Logging in as Counselor/Admin:

1. **Leads Pipeline**: http://localhost:3000/counselor/leads
   - Kanban board to manage leads
   - Add, edit, and track lead status

2. **Tasks**: http://localhost:3000/counselor/tasks
   - Create and manage follow-up tasks
   - Assign tasks to leads

3. **Payments**: http://localhost:3000/counselor/payments
   - Track payments and fee plans
   - Mark payments as received

4. **Analytics**: http://localhost:3000/counselor/analytics
   - View conversion metrics
   - Track counselor performance

5. **Communications**: Integrated WhatsApp/Email/SMS tools
   - Send messages to leads
   - View communication history

## Troubleshooting

### If Login Doesn't Work:

1. Make sure you're using the exact credentials above
2. Check browser console for errors (F12)
3. Try clearing browser cookies/cache
4. Verify server is running on port 3000

### If You See "Authentication Required" Errors:

1. Make sure you're logged in first
2. Check if session expired - login again
3. Refresh the page after logging in

## Database Status

- Connected to Supabase PostgreSQL
- Sample data loaded (10 test leads)
- Ready for production use

## Next Steps

1. Login using the direct login page
2. Explore the CRM features
3. Test adding a new lead
4. Try creating tasks and tracking payments

---

For detailed documentation, see: `CRM_AUTHENTICATION_GUIDE.md`
