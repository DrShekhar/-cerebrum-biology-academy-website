# Database Password Rotation Guide

## Overview

This guide provides step-by-step instructions for rotating the database password for the Cerebrum Biology Academy Supabase database.

**Total Time Required:** ~20-25 minutes

**Database:** Supabase (Project: cerebrum-biology-academy)

---

## 1. Why Rotate Database Passwords?

Rotating your database password is a critical security practice for several important reasons:

### Security Rationale

- **Local Environment Risk**: The password is stored in `.env.local` which is not committed to git, but may have been viewed by multiple team members or exposed during development
- **Industry Best Practice**: Security standards recommend rotating database credentials every 90 days
- **Pre-Production Security**: Before deploying to production, establishing fresh credentials ensures a clean security baseline
- **Team Access Management**: Multiple developers may have seen the password during local development
- **Compliance Preparation**: Many security frameworks require regular credential rotation
- **Breach Prevention**: Regular rotation limits the window of opportunity if credentials are compromised
- **Production Readiness**: Fresh credentials for production deployment separate dev and prod environments

### When to Rotate

- Every 90 days (recommended)
- Before production deployment
- After team member departure
- If credentials may have been exposed
- After security incidents
- Before major releases

---

## 2. Pre-Rotation Checklist

Complete this checklist before starting the rotation process:

- [ ] **Database backup taken** (see Step 1)
- [ ] **Connection verified working** (test current connection)
- [ ] **No active deployments running** (check Vercel dashboard)
- [ ] **Team notified of rotation** (if applicable)
- [ ] **New password ready to generate** (see Step 2)
- [ ] **Supabase dashboard access confirmed** (verify login)
- [ ] **Vercel dashboard access confirmed** (verify login)
- [ ] **Password manager ready** (to store new password)
- [ ] **Scheduled maintenance window** (if needed)
- [ ] **Rollback plan understood** (section 8)

---

## 3. Step-by-Step Rotation for Supabase

### Step 1: Take Database Backup (5 minutes)

**Before making any changes, always create a backup.**

#### Option 1: Supabase Dashboard (Recommended)

```text
1. Go to https://app.supabase.com
2. Select your project: cerebrum-biology-academy
3. Navigate to: Database → Backups
4. Click "Create Backup"
5. Add description: "Pre-password-rotation backup - [DATE]"
6. Wait for backup to complete
7. Verify backup appears in list
```

#### Option 2: Manual pg_dump Command

```bash
# Replace OLD_PASSWORD with your current password
pg_dump "postgresql://postgres:OLD_PASSWORD@db.auhvqhytfunmzdnccgtz.supabase.co:5432/postgres" > backup_$(date +%Y%m%d_%H%M%S).sql

# Verify backup file was created
ls -lh backup_*.sql
```

**Important:** Keep this backup file secure and do not commit it to git.

---

### Step 2: Generate New Password (1 minute)

Generate a strong, random password using one of these methods:

#### Option 1: OpenSSL (Recommended)

```bash
# Generate 32-character random password
openssl rand -base64 32

# Example output: xK9mPqR7sN2wL4tY8vF6bH3jC5dE1gA9zX0cM7nW
```

#### Option 2: Use Supabase's Generator

Supabase can generate a password for you in Step 3.

#### Option 3: Password Manager

Use your password manager's built-in generator with these settings:

- Length: 32+ characters
- Include: uppercase, lowercase, numbers, symbols
- Exclude ambiguous characters if desired

**Important:** Save this password immediately in your password manager.

---

### Step 3: Update in Supabase Dashboard (3 minutes)

```text
1. Go to https://app.supabase.com
2. Select your project: cerebrum-biology-academy
3. Navigate to: Settings → Database
4. Scroll down to "Database Password" section
5. Click "Generate a new password" OR click "Reset Database Password"
   - If generating: Click "Generate Password" and copy it immediately
   - If using your own: Paste the password from Step 2
6. Copy the new password (you won't see it again!)
7. Save to password manager immediately
8. Click "Confirm" or "Update Password"
9. Wait for confirmation message
```

**Critical:** Copy the password before closing the dialog. You cannot retrieve it later.

---

### Step 4: Update Connection String (2 minutes)

Your database connection string needs to be updated with the new password.

#### Current Connection String Format

```
postgresql://postgres:Tv6C*Vjtf7L@vcs@db.auhvqhytfunmzdnccgtz.supabase.co:5432/postgres
```

#### New Connection String Format

```
postgresql://postgres:NEW_PASSWORD@db.auhvqhytfunmzdnccgtz.supabase.co:5432/postgres
```

#### URL Encoding Special Characters

If your password contains special characters, they must be URL-encoded:

| Character | Encoded | Character   | Encoded |
| --------- | ------- | ----------- | ------- |
| `@`       | `%40`   | `:`         | `%3A`   |
| `/`       | `%2F`   | `%`         | `%25`   |
| `#`       | `%23`   | `?`         | `%3F`   |
| `&`       | `%26`   | `=`         | `%3D`   |
| `+`       | `%2B`   | ` ` (space) | `%20`   |
| `!`       | `%21`   | `$`         | `%24`   |
| `*`       | `%2A`   | `(`         | `%28`   |
| `)`       | `%29`   | `,`         | `%2C`   |

**Example:**

```
Password: abc#123@def
Encoded:  abc%23123%40def
```

#### Quick URL Encoding in Bash

```bash
# Use this command to URL encode your password
PASSWORD="your-new-password"
echo "$PASSWORD" | jq -sRr @uri
```

---

### Step 5: Test Connection Locally (2 minutes)

Update your local environment and test the connection before updating production.

#### Update .env.local

```bash
# Edit .env.local
# Update this line:
DATABASE_URL="postgresql://postgres:NEW_PASSWORD@db.auhvqhytfunmzdnccgtz.supabase.co:5432/postgres"
```

#### Test Connection - Method 1: Prisma

```bash
# Simple connection test
npx prisma db execute --stdin <<< "SELECT 1"

# Expected output: Successfully executed SQL
```

#### Test Connection - Method 2: Prisma Studio

```bash
# Launch Prisma Studio
npx prisma studio

# Opens browser at http://localhost:5555
# Verify you can see tables and data
```

#### Test Connection - Method 3: Direct psql

```bash
# Direct connection test
psql "postgresql://postgres:NEW_PASSWORD@db.auhvqhytfunmzdnccgtz.supabase.co:5432/postgres" -c "SELECT version();"

# Should display PostgreSQL version
```

**If connection fails, see Troubleshooting section (Section 6).**

---

### Step 6: Update Vercel Environment Variables (5 minutes)

Update the production environment variables in Vercel.

```text
1. Go to https://vercel.com/dashboard
2. Select your project: cerebrum-biology-academy-website
3. Navigate to: Settings → Environment Variables
4. Find "DATABASE_URL" variable
5. Click "Edit" (three dots menu)
6. Paste the new connection string
7. Select environments to update:
   ✅ Production
   ✅ Preview
   ✅ Development
8. Click "Save"
9. Confirm changes
```

**Important:** The changes won't take effect until you redeploy.

#### Trigger Redeployment

```text
Option 1: Vercel Dashboard
1. Go to "Deployments" tab
2. Click three dots on latest deployment
3. Click "Redeploy"
4. Confirm

Option 2: Git Push
1. Make a trivial commit
2. Push to main branch
3. Vercel will auto-deploy
```

#### Wait for Deployment

```text
1. Monitor deployment progress in Vercel dashboard
2. Wait for "Ready" status
3. Check deployment logs for errors
4. Look for database connection confirmations
```

---

### Step 7: Verify Production Connection (5 minutes)

After deployment completes, verify everything works.

#### 1. Visit Your Production Site

```text
1. Navigate to your production URL
2. Browse different pages
3. Look for any error messages
4. Check browser console for errors
```

#### 2. Test Database-Dependent Features

Test features that require database access:

- [ ] Homepage loads
- [ ] Courses page displays courses
- [ ] Individual course pages work
- [ ] Contact form submission (if applicable)
- [ ] Any dynamic content renders
- [ ] User authentication (if applicable)

#### 3. Check Vercel Logs

```text
1. Go to Vercel Dashboard → Deployments
2. Click on latest deployment
3. View "Functions" logs
4. Look for:
   ✅ Successful database connections
   ❌ Connection errors
   ❌ Authentication failures
   ❌ Timeout errors
```

#### 4. Monitor for 15 Minutes

```text
1. Keep Vercel logs open
2. Navigate your site actively
3. Watch for connection errors
4. Test edge cases
5. Verify no degraded performance
```

---

## 4. Connection String Formats

Supabase provides different connection strings for different use cases.

### Direct Connection (Port 5432)

**Use for:** Local development, migrations, Prisma commands

```
postgresql://postgres:PASSWORD@db.PROJECT_ID.supabase.co:5432/postgres
```

**Example:**

```
postgresql://postgres:xK9mPqR7sN2wL4tY8vF6bH3jC5dE1gA9zX0cM7nW@db.auhvqhytfunmzdnccgtz.supabase.co:5432/postgres
```

**Characteristics:**

- Direct connection to database
- No connection pooling
- Suitable for migrations
- Lower concurrent connection limit

---

### Pooling Connection (Port 6543)

**Use for:** Production deployments, serverless functions

```
postgresql://postgres:PASSWORD@db.PROJECT_ID.supabase.co:6543/postgres?pgbouncer=true
```

**Example:**

```
postgresql://postgres:xK9mPqR7sN2wL4tY8vF6bH3jC5dE1gA9zX0cM7nW@db.auhvqhytfunmzdnccgtz.supabase.co:6543/postgres?pgbouncer=true
```

**Characteristics:**

- Connection pooling via PgBouncer
- Higher concurrent connection limit
- Better for serverless environments
- Recommended for production

---

### Transaction Pooling

**Use for:** High-traffic production, maximum concurrency

```
postgresql://postgres.PROJECT_ID:PASSWORD@aws-0-region.pooler.supabase.com:6543/postgres
```

**Characteristics:**

- Transaction-level pooling
- Maximum concurrent connections
- Advanced use case
- Check Supabase dashboard for exact URL

---

### Which Connection String to Use?

| Environment       | Recommended Connection Type | Port |
| ----------------- | --------------------------- | ---- |
| Local Development | Direct                      | 5432 |
| Prisma Migrations | Direct                      | 5432 |
| Prisma Studio     | Direct                      | 5432 |
| Vercel Production | Pooling                     | 6543 |
| Vercel Preview    | Pooling                     | 6543 |
| CI/CD             | Direct                      | 5432 |

---

## 5. Update All Locations

Ensure the password is updated in every location where it's stored.

### Checklist

- [ ] **Local .env.local**
  - Update DATABASE_URL
  - Test connection locally
  - Verify Prisma works

- [ ] **Vercel Production Environment**
  - Update DATABASE_URL variable
  - Redeploy
  - Verify production works

- [ ] **Vercel Preview Environment**
  - Update DATABASE_URL variable
  - Test on next PR deployment
  - Verify preview works

- [ ] **Vercel Development Environment**
  - Update DATABASE_URL variable
  - Ensures dev deployments work

- [ ] **Team Member .env.local Files**
  - Notify team members
  - Share new connection string securely
  - Verify everyone can connect

- [ ] **CI/CD Secrets** (if applicable)
  - GitHub Actions secrets
  - GitLab CI/CD variables
  - Other automation tools

- [ ] **Documentation**
  - Remove old connection string examples
  - Update setup guides
  - Update README if applicable

- [ ] **Password Manager**
  - Save new password
  - Label with date
  - Mark old password as expired

---

## 6. Troubleshooting

### Error: "Connection refused"

**Possible Causes:**

- Special characters in password not URL-encoded
- Wrong port number
- Network/firewall issues

**Solutions:**

```bash
# 1. URL encode special characters
# If password is: abc#123@def
# Encode to: abc%23123%40def

# 2. Verify port number
# Direct: port 5432
# Pooling: port 6543

# 3. Test basic connectivity
ping db.auhvqhytfunmzdnccgtz.supabase.co

# 4. Check if Supabase project is paused
# Go to Supabase dashboard → Project settings
```

---

### Error: "Authentication failed" or "Password authentication failed"

**Possible Causes:**

- Password copied incorrectly
- Trailing spaces in password
- Using old password
- URL encoding issues

**Solutions:**

```bash
# 1. Verify password was copied exactly
# - No leading/trailing spaces
# - No line breaks
# - Check password manager vs .env.local

# 2. Test password directly with psql
psql "postgresql://postgres:YOUR_PASSWORD@db.auhvqhytfunmzdnccgtz.supabase.co:5432/postgres" -c "SELECT 1"

# 3. Check URL encoding
# Manually encode special characters
# Example: @ becomes %40, # becomes %23

# 4. Regenerate password
# Go to Supabase dashboard
# Generate a new password (simpler, fewer special chars)
# Try again

# 5. Verify in Supabase dashboard
# Settings → Database → Database Password section
# Ensure password was actually changed
```

---

### Error: "Could not connect to database"

**Possible Causes:**

- Supabase project paused
- Network issues
- Wrong database URL
- Wrong port

**Solutions:**

```bash
# 1. Check Supabase project status
# Go to https://app.supabase.com
# Verify project is active (not paused)

# 2. Verify database URL format
# Should be: postgresql://postgres:PASSWORD@db.PROJECT_ID.supabase.co:PORT/postgres

# 3. Check internet connection
ping db.auhvqhytfunmzdnccgtz.supabase.co

# 4. Verify correct port
# Direct connection: 5432
# Pooling connection: 6543

# 5. Test with Supabase's connection strings
# Go to Project Settings → Database
# Copy connection string from there
# Test with that exact string
```

---

### Error: "Too many connections" or "FATAL: remaining connection slots reserved"

**Possible Causes:**

- Exceeded connection limit
- Not using connection pooling
- Connection leak in application

**Solutions:**

```bash
# 1. Switch to pooling URL (port 6543)
# From: postgresql://postgres:PASSWORD@db.PROJECT_ID.supabase.co:5432/postgres
# To:   postgresql://postgres:PASSWORD@db.PROJECT_ID.supabase.co:6543/postgres?pgbouncer=true

# 2. Configure Prisma connection limits
# Add to schema.prisma:
# datasource db {
#   provider = "postgresql"
#   url      = env("DATABASE_URL")
#   directUrl = env("DIRECT_URL")  # Use direct connection for migrations
# }

# 3. Set connection pool size in Prisma
# Add to .env.local:
# DATABASE_URL="postgresql://...?connection_limit=5&pool_timeout=10"

# 4. Check active connections
psql "postgresql://..." -c "SELECT count(*) FROM pg_stat_activity WHERE datname = 'postgres';"

# 5. Close idle connections in Supabase
# Go to Database → Query Editor
# Run: SELECT pg_terminate_backend(pid) FROM pg_stat_activity WHERE state = 'idle';
```

---

### Error: "Prisma Migrate failed" after password change

**Solutions:**

```bash
# 1. Ensure using direct connection for migrations (port 5432)
# Migrations don't work with pooling

# 2. Update .env with direct connection
DATABASE_URL="postgresql://postgres:NEW_PASSWORD@db.auhvqhytfunmzdnccgtz.supabase.co:5432/postgres"

# 3. Generate Prisma client
npx prisma generate

# 4. Try migration again
npx prisma migrate deploy
```

---

### Error: Vercel deployment fails after password change

**Solutions:**

```text
1. Verify environment variable was saved
   - Go to Vercel → Settings → Environment Variables
   - Check DATABASE_URL is updated
   - Verify it's enabled for Production

2. Redeploy
   - Go to Deployments
   - Click "Redeploy" on latest
   - Watch deployment logs

3. Check deployment logs
   - Look for connection errors
   - Verify password wasn't truncated
   - Check for URL encoding issues

4. Test connection string locally first
   - Copy exact string from Vercel env vars
   - Test in local .env.local
   - Ensure it works before using in Vercel
```

---

## 7. Best Practices

### Password Security

- **Use strong passwords**: 32+ characters, random, include all character types
- **Never commit to git**: Always use .env files that are .gitignored
- **Use password manager**: Store securely in 1Password, LastPass, Bitwarden, etc.
- **URL encode properly**: Always encode special characters in connection strings
- **Rotate regularly**: Set calendar reminder for every 90 days
- **Limit access**: Only share with team members who need it

### Rotation Process

- **Document rotation dates**: Keep log of when passwords were changed
- **Test before production**: Always test locally before updating production
- **Keep old password temporarily**: Store old password for 24 hours for rollback
- **Monitor after change**: Watch logs for 15-30 minutes after production update
- **Notify team**: Inform team members before rotating
- **Schedule appropriately**: Rotate during low-traffic periods

### Production Environment

- **Use connection pooling**: Always use port 6543 with pgbouncer=true in production
- **Set up monitoring**: Configure alerts for connection failures
- **Configure connection limits**: Prevent "too many connections" errors
- **Use separate credentials**: Different passwords for dev/staging/prod (future)
- **Implement secrets management**: Consider tools like Vault, AWS Secrets Manager

### Deployment

- **Staged rollout**: Test in preview environment first
- **Health checks**: Verify database connectivity in health check endpoints
- **Graceful degradation**: Handle database connection failures gracefully
- **Automated testing**: Include database connection tests in CI/CD

---

## 8. Rollback Plan

If issues occur after password rotation, follow this rollback procedure.

### Immediate Rollback (Critical Issues)

**When to use:** Production is down, users cannot access the site, critical errors

```text
1. Revert password in Supabase Dashboard
   - Go to Settings → Database
   - Reset password to OLD_PASSWORD
   - Confirm change

2. Update Vercel environment variables
   - Settings → Environment Variables
   - Edit DATABASE_URL
   - Paste old connection string
   - Save

3. Redeploy Vercel
   - Go to Deployments
   - Click "Redeploy"
   - Wait for deployment to complete

4. Verify production works
   - Test site functionality
   - Check Vercel logs
   - Monitor for errors

5. Update local .env.local
   - Revert to old password
   - Test local connection
```

**Total time:** ~5 minutes

---

### Planned Rollback (Non-Critical Issues)

**When to use:** Minor issues, need time to investigate, scheduled maintenance

```text
1. Investigate the issue
   - Review error logs
   - Identify root cause
   - Document findings

2. Schedule rollback window
   - Notify team
   - Choose low-traffic period
   - Prepare rollback steps

3. Revert as needed
   - Follow immediate rollback steps
   - Take time to investigate
   - Plan next rotation attempt

4. Fix underlying issue
   - Address root cause
   - Test fix in dev environment
   - Schedule new rotation
```

---

### After Rollback

- [ ] Document what went wrong
- [ ] Identify root cause
- [ ] Test fix in development
- [ ] Update this guide if needed
- [ ] Schedule new rotation attempt
- [ ] Review and improve process

---

### Old Password Retention

**Keep old password for 24 hours after rotation:**

```text
1. Store in password manager
   - Label as "OLD - [DATE]"
   - Mark as expired
   - Keep for 24 hours

2. After 24 hours
   - Delete old password
   - Confirm new password works
   - Update team

3. Exception: Keep longer if
   - Issues detected
   - Debugging needed
   - Rollback planned
```

---

## 9. Verification Commands

Use these commands to verify the password rotation was successful.

### Test Database Connection

```bash
# Test connection and get PostgreSQL version
psql "postgresql://postgres:NEW_PASSWORD@db.auhvqhytfunmzdnccgtz.supabase.co:5432/postgres" \
  -c "SELECT version();"

# Expected output: PostgreSQL version information
```

---

### Check Active Connections

```bash
# See how many connections are active
psql "postgresql://postgres:NEW_PASSWORD@db.auhvqhytfunmzdnccgtz.supabase.co:5432/postgres" \
  -c "SELECT count(*) FROM pg_stat_activity WHERE datname = 'postgres';"

# See detailed connection info
psql "postgresql://postgres:NEW_PASSWORD@db.auhvqhytfunmzdnccgtz.supabase.co:5432/postgres" \
  -c "SELECT pid, usename, application_name, client_addr, state, query_start FROM pg_stat_activity WHERE datname = 'postgres';"
```

---

### Test Prisma Connection

```bash
# Simple query test
npx prisma db execute --stdin <<< "SELECT current_database();"

# Check Prisma can read tables
npx prisma db execute --stdin <<< "SELECT COUNT(*) FROM information_schema.tables WHERE table_schema = 'public';"

# List all tables
npx prisma db execute --stdin <<< "SELECT table_name FROM information_schema.tables WHERE table_schema = 'public';"
```

---

### Verify Database Content

```bash
# Test reading from a table (replace 'Course' with your table)
npx prisma db execute --stdin <<< "SELECT COUNT(*) FROM \"Course\";"

# Test a simple SELECT query
npx prisma db execute --stdin <<< "SELECT * FROM \"Course\" LIMIT 1;"
```

---

### Test Connection Pooling

```bash
# Test pooled connection (port 6543)
psql "postgresql://postgres:NEW_PASSWORD@db.auhvqhytfunmzdnccgtz.supabase.co:6543/postgres?pgbouncer=true" \
  -c "SHOW pool_mode;"

# Expected output: pool_mode = transaction or session
```

---

### Monitor Connection Health

```bash
# Check for idle connections
psql "postgresql://postgres:NEW_PASSWORD@db.auhvqhytfunmzdnccgtz.supabase.co:5432/postgres" \
  -c "SELECT state, count(*) FROM pg_stat_activity WHERE datname = 'postgres' GROUP BY state;"

# Check for long-running queries
psql "postgresql://postgres:NEW_PASSWORD@db.auhvqhytfunmzdnccgtz.supabase.co:5432/postgres" \
  -c "SELECT pid, now() - query_start as duration, query FROM pg_stat_activity WHERE state = 'active' AND query NOT LIKE '%pg_stat_activity%' ORDER BY duration DESC;"
```

---

### End-to-End Application Test

```bash
# If you have a test script
npm run test:db

# Or test API endpoints (if applicable)
curl https://your-site.vercel.app/api/health

# Test with Prisma Studio
npx prisma studio
# Then manually browse tables and data
```

---

## 10. Security Checklist After Rotation

Complete this checklist to ensure the rotation was successful and secure.

### Immediate Post-Rotation (Day 0)

- [ ] **Old password removed from all locations**
  - Removed from local .env.local (if not keeping for rollback)
  - Removed from sticky notes, documents
  - Removed from chat history
  - Removed from browser autofill

- [ ] **New password in password manager**
  - Saved with clear label
  - Tagged with rotation date
  - Set to secure (not shared externally)
  - Added to shared team vault (if applicable)

- [ ] **Vercel redeployed successfully**
  - Deployment status: ✅ Ready
  - No errors in build logs
  - Functions deployed successfully
  - Environment variables applied

- [ ] **Production site working**
  - Homepage loads correctly
  - No error pages
  - All routes accessible
  - No console errors

- [ ] **Database queries working**
  - Courses load correctly
  - Dynamic content renders
  - Forms submit successfully
  - Data can be read and written

- [ ] **No connection errors in logs**
  - Vercel function logs clean
  - No authentication failures
  - No timeout errors
  - No connection pool exhaustion

- [ ] **Team notified of rotation**
  - Sent notification email/message
  - Shared new connection string securely
  - Documented rotation in team logs
  - Updated team documentation

- [ ] **Rotation date documented**
  - Added to password manager notes
  - Logged in security documentation
  - Calendar reminder set for next rotation (90 days)
  - Team knowledge base updated

---

### 24 Hours After Rotation (Day 1)

- [ ] **No production issues reported**
  - Check error monitoring
  - Review user feedback
  - Check support tickets
  - Verify analytics normal

- [ ] **Connection metrics normal**
  - Check Supabase dashboard
  - Review connection count
  - Verify no connection spikes
  - Check query performance

- [ ] **Delete old password**
  - Remove from password manager
  - Delete from temporary storage
  - Clear from team chat history
  - Verify no documentation references

- [ ] **Update team .env.local files**
  - Confirm all team members updated
  - Test team member connections
  - Resolve any issues
  - Document any problems

---

### One Week After Rotation (Day 7)

- [ ] **No degraded performance**
  - Review application metrics
  - Check database performance
  - Verify no connection issues
  - Confirm user experience normal

- [ ] **Logs reviewed**
  - Check Vercel logs for patterns
  - Review Supabase logs
  - Verify no authentication retries
  - Confirm clean connection logs

- [ ] **Documentation updated**
  - README updated if needed
  - Setup guides current
  - No old connection strings in docs
  - Team wiki updated

- [ ] **Backup retention verified**
  - Pre-rotation backup still accessible
  - Backup can be restored if needed
  - Backup documented and labeled
  - Backup retention policy followed

---

### Next Rotation Scheduled (Day 90)

- [ ] **Calendar reminder set**
  - 90 days from rotation date
  - Reminder 1 week before
  - Team notification scheduled
  - Maintenance window planned

- [ ] **Rotation process reviewed**
  - Update this guide if needed
  - Document any issues encountered
  - Improve process for next time
  - Share learnings with team

---

## Additional Resources

### Supabase Documentation

- [Database Management](https://supabase.com/docs/guides/database)
- [Connection Pooling](https://supabase.com/docs/guides/database/connecting-to-postgres#connection-pooler)
- [Password Reset](https://supabase.com/docs/guides/database/managing-passwords)

### Prisma Documentation

- [Connection Management](https://www.prisma.io/docs/concepts/components/prisma-client/working-with-prismaclient/connection-management)
- [Database Connection](https://www.prisma.io/docs/concepts/database-connectors/postgresql)

### Security Best Practices

- [OWASP Password Storage](https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html)
- [Database Security Checklist](https://www.postgresql.org/docs/current/auth-methods.html)

---

## Revision History

| Date       | Version | Changes               | Author      |
| ---------- | ------- | --------------------- | ----------- |
| 2025-10-29 | 1.0     | Initial guide created | Claude Code |

---

## Support

If you encounter issues not covered in this guide:

1. Check Supabase status page: https://status.supabase.com
2. Review Vercel status: https://www.vercel-status.com
3. Consult Supabase documentation
4. Contact Supabase support (for urgent issues)
5. Review Prisma troubleshooting docs

---

**Remember:** Always test in development before updating production. When in doubt, take a backup and proceed cautiously.
