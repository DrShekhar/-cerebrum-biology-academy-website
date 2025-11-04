# 🚀 Trial System Quick Start Guide

## ⚡ Get Up and Running in 10 Minutes

This guide will get your trial system working FAST. For detailed information, see `TRIAL_SYSTEM_IMPLEMENTATION.md`.

---

## Step 1: Apply Database Migration (2 minutes)

```bash
# Generate Prisma client with new schema
npx prisma generate

# Create and apply migration
npx prisma migrate dev --name add_trial_fields_to_free_user

# Verify migration succeeded
npx prisma studio  # Check FreeUser table has new fields
```

---

## Step 2: Environment Variables (1 minute)

Add to your `.env` file:

```bash
# Trial Configuration
TRIAL_DURATION_DAYS=15
MAX_TRIAL_TESTS=50

# Admin secret for extending trials
ADMIN_SECRET_KEY=your-super-secret-admin-key-change-this
```

---

## Step 3: Migrate Existing Users (Optional - 2 minutes)

If you have existing `FreeUser` records:

```bash
# Test migration first (dry run)
npx ts-node scripts/migrate-existing-free-users.ts --dry-run

# Apply migration
npx ts-node scripts/migrate-existing-free-users.ts
```

---

## Step 4: Integrate Into Dashboard (5 minutes)

### Add imports to your `PersonalizedStudentDashboard.tsx`:

```typescript
import { useTrialIntegration } from '@/lib/trial/useTrialIntegration'
import { TrialBanner } from '@/components/trial/TrialBanner'
import { TrialExpiredModal } from '@/components/trial/TrialExpiredModal'
```

### Add trial hook:

```typescript
export function PersonalizedStudentDashboard() {
  const { user, isAuthenticated } = useAuth()

  // Add this hook
  const {
    freeUserId,
    trialStatus,
    isLoading,
    showTrialExpiredModal,
    handleUpgrade,
    handleModalClose,
  } = useTrialIntegration(isAuthenticated)

  // Update userId usage
  const effectiveUserId = user?.id || freeUserId

  // ... rest of your component
}
```

### Add UI components:

```typescript
return (
  <div className="min-h-screen">
    {/* Add banner at top */}
    {!isAuthenticated && trialStatus && (
      <TrialBanner
        trialStatus={trialStatus}
        onUpgradeClick={handleUpgrade}
      />
    )}

    {/* Your existing dashboard content */}
    <div>
      {/* ... */}
    </div>

    {/* Add modal at bottom */}
    {!isAuthenticated && trialStatus && (
      <TrialExpiredModal
        isOpen={showTrialExpiredModal}
        trialStatus={trialStatus}
        onClose={handleModalClose}
        onUpgrade={handleUpgrade}
      />
    )}
  </div>
)
```

---

## Step 5: Test It Works! (5 minutes)

### Test Guest User Creation:

1. Clear localStorage: `localStorage.clear()`
2. Visit `/dashboard` without authentication
3. Check localStorage: Should have `freeUserId`
4. Check console: Should see API calls to `/api/auth/guest/create`

### Test Banner Display:

1. Verify banner shows at top
2. Check it shows correct days remaining (15)
3. Try dismissing - should disappear
4. Wait 24h or clear localStorage - should return

### Test Trial Expiration:

1. In database, set `trialExpiryDate` to yesterday
2. Refresh dashboard
3. Should see blocking modal
4. Try to close - should not close (expired state)

### Test Test Limits:

1. Take a test
2. Check database: `testsTakenCount` should increment
3. Manually set `testsTakenCount = 50`
4. Try to take another test - should be blocked

---

## 🎯 That's It! You're Live!

Your trial system is now running. Users can:

- ✅ Access dashboard for 15 days without signup
- ✅ Take up to 50 tests
- ✅ See countdown banner
- ✅ Get prompted to upgrade when expired
- ✅ Request trial extensions

---

## 📊 Monitor Your Trials

### Quick Dashboard Query:

```sql
-- Active trials right now
SELECT
  COUNT(*) as active_trials,
  AVG(15 - EXTRACT(DAY FROM (NOW() - "trialStartDate"))) as avg_days_remaining,
  SUM("testsTakenCount") as total_tests_taken
FROM free_users
WHERE "isTrialExpired" = false;
```

### Conversion Rate:

```sql
-- Last 30 days
SELECT
  COUNT(CASE WHEN "upgradedToUserId" IS NOT NULL THEN 1 END) as converted,
  COUNT(*) as total,
  ROUND(
    COUNT(CASE WHEN "upgradedToUserId" IS NOT NULL THEN 1 END) * 100.0 / COUNT(*),
    2
  ) as conversion_rate_pct
FROM free_users
WHERE "trialStartDate" >= NOW() - INTERVAL '30 days';
```

---

## 🔧 Quick Customizations

### Change Trial Duration:

```typescript
// In .env
TRIAL_DURATION_DAYS=30  # Change to 30 days
```

### Change Test Limit:

```typescript
// In .env
MAX_TRIAL_TESTS=100  # Change to 100 tests
```

### Change Banner Colors:

```typescript
// In TrialBanner.tsx, find getBannerConfig()
case 'info':
  return {
    bgGradient: 'from-purple-600 to-blue-600',  // Your colors
    // ...
  }
```

### Change Modal Text:

```typescript
// In TrialExpiredModal.tsx
<h2>Your Custom Heading Here</h2>
<p>Your custom message about why they should upgrade...</p>
```

---

## 🚨 Common Issues & Fixes

### Issue: Banner not showing

**Fix:**

```javascript
// Check localStorage
console.log(localStorage.getItem('freeUserId'))

// Check API response
fetch('/api/trial/status?freeUserId=YOUR_ID')
  .then((r) => r.json())
  .then(console.log)
```

### Issue: Modal not blocking

**Fix:**

```typescript
// Check isExpired flag
console.log(trialStatus.isExpired) // Should be true

// Manually trigger
setShowTrialExpiredModal(true)
```

### Issue: Test count not updating

**Fix:**

```typescript
// After test submission, call:
import { incrementTestCount } from '@/lib/trial/trialManager'
await incrementTestCount(freeUserId)
```

### Issue: Database error on migration

**Fix:**

```bash
# Reset migration
npx prisma migrate reset

# Reapply
npx prisma migrate dev
```

---

## 🎨 UI Customization Examples

### Make Banner Permanently Visible:

```typescript
// In TrialBanner.tsx, remove dismissal:
const handleDismiss = () => {
  // Comment out or remove
  // setIsDismissed(true)
}
```

### Add Custom Trial Benefits:

```typescript
// In TrialExpiredModal.tsx
const benefits = [
  {
    icon: YourIcon,
    title: 'Your Custom Benefit',
    description: 'Description here',
  },
  // ... more benefits
]
```

### Change Urgency Thresholds:

```typescript
// In trialManager.ts
export function getUrgencyLevel(daysRemaining: number, isExpired: boolean) {
  if (isExpired) return 'expired'
  if (daysRemaining <= 5) return 'urgent' // Changed from 3
  if (daysRemaining <= 10) return 'warning' // Changed from 7
  return 'info'
}
```

---

## 📞 Need Help?

1. **Full Documentation**: See `TRIAL_SYSTEM_IMPLEMENTATION.md`
2. **Code Examples**: Check `DASHBOARD_INTEGRATION_EXAMPLE.tsx`
3. **File Reference**: Review `TRIAL_SYSTEM_FILES.md`
4. **Complete Summary**: Read `TRIAL_SYSTEM_SUMMARY.md`

---

## 🎉 Success Checklist

After following this guide, you should have:

- [x] Database migrated with trial fields
- [x] Environment variables configured
- [x] Existing users migrated (if applicable)
- [x] Trial banner showing on dashboard
- [x] Trial modal working on expiry
- [x] Test limits enforced
- [x] Guest user creation working
- [x] Analytics tracking events

---

## 🔥 Pro Tips

1. **Test Locally First**: Use `--dry-run` for migrations
2. **Monitor Daily**: Set up alerts for low conversion rates
3. **Iterate Quickly**: A/B test different CTAs and messaging
4. **User Feedback**: Add feedback form in modal
5. **Extend Selectively**: Be generous with extensions for engaged users

---

## 🚀 Next Level Enhancements (Optional)

Once basic system is running, consider adding:

1. **Email Reminders**: Notify at 7, 3, 1 days remaining
2. **WhatsApp Integration**: Send trial status via WhatsApp
3. **Social Proof**: "Join 500+ students who upgraded"
4. **Video Demos**: Show premium features in action
5. **Referral Bonus**: "Refer a friend, get 7 extra days"
6. **Progress Incentive**: "You're 80% to your NEET goal - upgrade to finish!"

---

**You're all set! 🎊**

Your trial system is now live and converting visitors into paying users!

---

**Time to Complete**: ~10 minutes
**Difficulty**: Easy ⭐
**Impact**: High 🚀

---

**Last Updated:** 2025-11-04
