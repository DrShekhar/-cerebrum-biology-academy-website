# 15-Day Trial System Implementation Guide

## Overview

This document provides comprehensive instructions for implementing and using the 15-day trial system for guest users in the Cerebrum Biology Academy platform.

## Table of Contents

1. [System Architecture](#system-architecture)
2. [Database Schema Changes](#database-schema-changes)
3. [File Structure](#file-structure)
4. [Implementation Steps](#implementation-steps)
5. [API Endpoints](#api-endpoints)
6. [Component Usage](#component-usage)
7. [Trial Flow Diagram](#trial-flow-diagram)
8. [Migration Instructions](#migration-instructions)
9. [Analytics Events](#analytics-events)
10. [Testing Guide](#testing-guide)

---

## System Architecture

The trial system consists of the following components:

```
┌─────────────────────────────────────────────────────────────┐
│                    Guest User Entry                          │
│  - Visits dashboard without authentication                   │
│  - System checks for existing freeUserId in localStorage     │
└────────────────────┬────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────────┐
│              Create/Retrieve FreeUser                        │
│  - Generate deviceId if new user                            │
│  - Call /api/auth/guest/create                              │
│  - Initialize 15-day trial (trialExpiryDate)                │
│  - Store freeUserId in localStorage & cookies               │
└────────────────────┬────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────────┐
│                Trial Status Monitoring                       │
│  - Check trial status on every page load                    │
│  - Poll /api/trial/status every 60 seconds                  │
│  - Calculate daysRemaining and testsRemaining               │
│  - Update isTrialExpired cache flag                         │
└────────────────────┬────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────────┐
│                  Display Trial UI                            │
│  ├─ TrialBanner (top of page)                               │
│  │   - Info: 15-8 days (blue)                               │
│  │   - Warning: 7-4 days (yellow)                           │
│  │   - Urgent: 3-1 days (orange)                            │
│  │   - Expired: 0 days (red, non-dismissible)               │
│  └─ TrialExpiredModal (on expiry)                           │
│      - Full-screen blocking modal                            │
│      - Upgrade CTA                                           │
│      - Request extension form                                │
└────────────────────┬────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────────┐
│              Access Control & Limits                         │
│  - Limit to 50 tests during trial                           │
│  - Block new tests when limit reached                       │
│  - Block premium features (advanced analytics, etc.)        │
│  - Allow viewing past data                                   │
└────────────────────┬────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────────┐
│              Conversion Actions                              │
│  ├─ Upgrade to Paid User                                    │
│  │   - Link FreeUser.upgradedToUserId to User.id           │
│  │   - Migrate all test data to User                        │
│  │   - Set isTrialExpired = false                           │
│  │   - Retain historical trial data                         │
│  └─ Request Extension                                        │
│      - Submit contact form via /api/trial/contact           │
│      - Admin reviews and can extend via /api/trial/extend   │
└─────────────────────────────────────────────────────────────┘
```

---

## Database Schema Changes

### Modified `FreeUser` Model

Added the following fields to the `FreeUser` model in `prisma/schema.prisma`:

```prisma
model FreeUser {
  // ... existing fields ...

  // Trial Management
  trialStartDate   DateTime @default(now()) // When trial started
  trialExpiryDate  DateTime // When trial expires (15 days from start)
  trialExtended    Boolean  @default(false) // Has trial been extended
  extensionCount   Int      @default(0) // Number of times trial extended
  upgradedToUserId String?  // Link to User.id if converted to paid user
  isTrialExpired   Boolean  @default(false) // Cache for quick checks
  lastTrialCheck   DateTime @default(now()) // Last time trial status was checked
  deviceId         String?  // Unique device identifier for tracking
  testsTakenCount  Int      @default(0) // Track number of tests (limit 50 during trial)

  // ... existing relations ...

  @@index([trialExpiryDate, isTrialExpired])
  @@index([upgradedToUserId])
  @@index([deviceId])
}
```

### Migration Command

Run the following commands to apply schema changes:

```bash
# Generate Prisma client with updated schema
npx prisma generate

# Create migration
npx prisma migrate dev --name add_trial_fields_to_free_user

# Apply migration to production
npx prisma migrate deploy
```

---

## File Structure

```
src/
├── lib/
│   └── trial/
│       ├── trialManager.ts          # Core trial logic
│       ├── middleware.ts             # API middleware for trial checks
│       ├── analytics.ts              # Trial event tracking
│       └── useTrialIntegration.ts    # React hook for trial integration
├── components/
│   └── trial/
│       ├── TrialBanner.tsx           # Trial status banner
│       └── TrialExpiredModal.tsx     # Trial expiration modal
└── app/
    └── api/
        ├── auth/
        │   └── guest/
        │       └── create/
        │           └── route.ts      # Create guest user with trial
        └── trial/
            ├── status/
            │   └── route.ts          # Get trial status
            ├── extend/
            │   └── route.ts          # Extend trial (admin only)
            └── contact/
                └── route.ts          # Submit extension request
```

---

## Implementation Steps

### Step 1: Apply Database Schema Changes

```bash
npx prisma generate
npx prisma migrate dev --name add_trial_fields_to_free_user
```

### Step 2: Integrate Trial System into Dashboard

In your `PersonalizedStudentDashboard.tsx` or any page component:

```typescript
import { useTrialIntegration } from '@/lib/trial/useTrialIntegration'
import { TrialBanner } from '@/components/trial/TrialBanner'
import { TrialExpiredModal } from '@/components/trial/TrialExpiredModal'

export function PersonalizedStudentDashboard() {
  const { user, isAuthenticated } = useAuth()

  const {
    freeUserId,
    trialStatus,
    isLoading,
    showTrialExpiredModal,
    setShowTrialExpiredModal,
    handleUpgrade,
    handleModalClose,
  } = useTrialIntegration(isAuthenticated)

  // Show trial banner for guest users
  if (!isAuthenticated && trialStatus) {
    return (
      <>
        <TrialBanner
          trialStatus={trialStatus}
          onUpgradeClick={handleUpgrade}
        />

        {/* Your dashboard content */}

        <TrialExpiredModal
          isOpen={showTrialExpiredModal}
          trialStatus={trialStatus}
          onClose={handleModalClose}
          onUpgrade={handleUpgrade}
        />
      </>
    )
  }

  // Regular authenticated user flow
  return <div>...</div>
}
```

### Step 3: Add Trial Check to Test Creation

When a guest user attempts to take a test:

```typescript
import { canTakeTest, incrementTestCount } from '@/lib/trial/trialManager'
import { trackTrialEvent, TrialEvents } from '@/lib/trial/analytics'

async function handleStartTest(freeUserId: string) {
  // Check if user can take test
  const access = await canTakeTest(freeUserId)

  if (!access.allowed) {
    alert(access.reason)
    return
  }

  // Increment test count
  const newCount = await incrementTestCount(freeUserId)

  // Track event
  await trackTrialEvent({
    eventName: TrialEvents.TEST_TAKEN,
    freeUserId,
    properties: { testNumber: newCount },
  })

  // Proceed with test creation
  // ...
}
```

---

## API Endpoints

### 1. Create Guest User with Trial

**Endpoint:** `POST /api/auth/guest/create`

**Request Body:**

```json
{
  "deviceId": "device_1234567890_abc123",
  "email": "optional@email.com",
  "name": "Guest User",
  "grade": "CLASS_12",
  "curriculum": "NEET"
}
```

**Response:**

```json
{
  "success": true,
  "freeUserId": "clxxx...",
  "trialStatus": {
    "freeUserId": "clxxx...",
    "startDate": "2025-11-04T00:00:00Z",
    "expiryDate": "2025-11-19T00:00:00Z",
    "daysRemaining": 15,
    "isExpired": false,
    "hasEverUpgraded": false,
    "testsTaken": 0,
    "testsRemaining": 50,
    "urgencyLevel": "info"
  }
}
```

### 2. Check Trial Status

**Endpoint:** `GET /api/trial/status?freeUserId=clxxx...`

**Response:**

```json
{
  "success": true,
  "trialStatus": {
    "freeUserId": "clxxx...",
    "startDate": "2025-11-04T00:00:00Z",
    "expiryDate": "2025-11-19T00:00:00Z",
    "daysRemaining": 12,
    "isExpired": false,
    "hasEverUpgraded": false,
    "testsTaken": 5,
    "testsRemaining": 45,
    "urgencyLevel": "info"
  }
}
```

### 3. Extend Trial (Admin Only)

**Endpoint:** `POST /api/trial/extend`

**Request Body:**

```json
{
  "freeUserId": "clxxx...",
  "days": 7,
  "adminKey": "your-admin-secret-key"
}
```

**Response:**

```json
{
  "success": true,
  "message": "Trial extended by 7 days"
}
```

### 4. Submit Extension Request

**Endpoint:** `POST /api/trial/contact`

**Request Body:**

```json
{
  "freeUserId": "clxxx...",
  "email": "user@example.com",
  "phone": "+91 98765 43210",
  "message": "I need more time to prepare...",
  "requestType": "extension"
}
```

**Response:**

```json
{
  "success": true,
  "message": "Your request has been submitted successfully"
}
```

---

## Component Usage

### TrialBanner

Displays trial status at the top of the page with appropriate urgency level.

```typescript
import { TrialBanner } from '@/components/trial/TrialBanner'

<TrialBanner
  trialStatus={trialStatus}
  onUpgradeClick={() => window.location.href = '/pricing'}
  onDismiss={() => console.log('Banner dismissed')}
/>
```

**Props:**

- `trialStatus: TrialStatus` - Current trial status object
- `onUpgradeClick?: () => void` - Callback when upgrade button clicked
- `onDismiss?: () => void` - Callback when banner dismissed

**Urgency Levels:**

- **Info (15-8 days)**: Blue banner, dismissible
- **Warning (7-4 days)**: Yellow banner, dismissible
- **Urgent (3-1 days)**: Orange banner, dismissible
- **Expired (0 days)**: Red banner, non-dismissible

### TrialExpiredModal

Full-screen blocking modal shown when trial expires.

```typescript
import { TrialExpiredModal } from '@/components/trial/TrialExpiredModal'

<TrialExpiredModal
  isOpen={showModal}
  trialStatus={trialStatus}
  onClose={() => setShowModal(false)}
  onUpgrade={() => window.location.href = '/pricing'}
  onContactUs={() => window.location.href = '/contact'}
/>
```

**Props:**

- `isOpen: boolean` - Controls modal visibility
- `trialStatus: TrialStatus` - Current trial status object
- `onClose?: () => void` - Callback when modal closed
- `onUpgrade?: () => void` - Callback when upgrade clicked
- `onContactUs?: () => void` - Callback when contact clicked

---

## Trial Flow Diagram

```
┌─────────────────┐
│  Guest Visits   │
│   Dashboard     │
└────────┬────────┘
         │
         ▼
    ┌────────────────┐
    │ Check localStorage│
    │  for freeUserId   │
    └────────┬──────────┘
             │
    ┌────────┴────────┐
    │                 │
    ▼                 ▼
  Exists          Not Exists
    │                 │
    │            ┌────▼────┐
    │            │  Create  │
    │            │ FreeUser │
    │            │ with Trial│
    │            └────┬─────┘
    │                 │
    └────────┬────────┘
             │
             ▼
    ┌────────────────┐
    │  Fetch Trial   │
    │    Status      │
    └────────┬───────┘
             │
    ┌────────┴────────┐
    │                 │
    ▼                 ▼
  Active          Expired
    │                 │
    ▼                 ▼
┌─────────┐    ┌──────────┐
│  Show   │    │   Show   │
│ Banner  │    │  Modal   │
└─────────┘    └──────────┘
    │                 │
    │            ┌────┴────┐
    │            │         │
    │            ▼         ▼
    │      ┌─────────┐ ┌───────┐
    │      │ Upgrade │ │Request│
    │      │         │ │Extension│
    │      └─────────┘ └───────┘
    │            │         │
    └────────────┴─────────┘
                 │
                 ▼
         ┌───────────────┐
         │   Continue    │
         │    Using      │
         │   Platform    │
         └───────────────┘
```

---

## Migration Instructions

### For Existing FreeUsers (Data Migration)

If you have existing `FreeUser` records without trial fields:

```typescript
// scripts/migrate-existing-free-users.ts
import { PrismaClient } from '@/generated/prisma'

const prisma = new PrismaClient()

async function migrateExistingFreeUsers() {
  const existingUsers = await prisma.freeUser.findMany({
    where: {
      trialExpiryDate: null, // Find users without trial data
    },
  })

  console.log(`Found ${existingUsers.length} users to migrate`)

  for (const user of existingUsers) {
    const startDate = user.registrationDate
    const expiryDate = new Date(startDate)
    expiryDate.setDate(expiryDate.getDate() + 15)

    await prisma.freeUser.update({
      where: { id: user.id },
      data: {
        trialStartDate: startDate,
        trialExpiryDate: expiryDate,
        isTrialExpired: new Date() > expiryDate,
        lastTrialCheck: new Date(),
      },
    })

    console.log(`Migrated user: ${user.id}`)
  }

  console.log('Migration complete!')
}

migrateExistingFreeUsers()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
```

Run with:

```bash
npx ts-node scripts/migrate-existing-free-users.ts
```

### Converting Trial User to Paid User

When a guest user signs up and pays:

```typescript
import { convertToFullUser } from '@/lib/trial/trialManager'
import { trackTrialEvent, TrialEvents } from '@/lib/trial/analytics'

async function handleUserUpgrade(freeUserId: string, newUserId: string) {
  // Convert trial user to full user
  await convertToFullUser(freeUserId, newUserId)

  // Track conversion event
  await trackTrialEvent({
    eventName: TrialEvents.TRIAL_UPGRADED,
    freeUserId,
    properties: {
      newUserId,
      conversionDate: new Date().toISOString(),
    },
  })

  // Clear localStorage
  localStorage.removeItem('freeUserId')
  localStorage.removeItem('trialExpiry')
  localStorage.removeItem('trial-expired-shown')
}
```

---

## Analytics Events

The system tracks the following events:

```typescript
export const TrialEvents = {
  TRIAL_STARTED: 'trial_started',
  TRIAL_EXPIRED: 'trial_expired',
  TRIAL_EXTENDED: 'trial_extended',
  TRIAL_UPGRADED: 'trial_upgraded',
  TRIAL_ABANDONED: 'trial_abandoned',
  TEST_TAKEN: 'trial_test_taken',
  TEST_LIMIT_REACHED: 'trial_test_limit_reached',
  UPGRADE_CTA_CLICKED: 'trial_upgrade_cta_clicked',
  EXTENSION_REQUESTED: 'trial_extension_requested',
  CONTACT_SUBMITTED: 'trial_contact_submitted',
  BANNER_DISMISSED: 'trial_banner_dismissed',
  MODAL_OPENED: 'trial_modal_opened',
  MODAL_CLOSED: 'trial_modal_closed',
}
```

### Analytics Queries

Get trial conversion rate:

```sql
SELECT
  COUNT(DISTINCT CASE WHEN upgradedToUserId IS NOT NULL THEN id END) as converted,
  COUNT(DISTINCT id) as total_trials,
  (COUNT(DISTINCT CASE WHEN upgradedToUserId IS NOT NULL THEN id END)::float /
   COUNT(DISTINCT id)::float * 100) as conversion_rate
FROM free_users
WHERE "trialStartDate" >= NOW() - INTERVAL '30 days';
```

Get daily active trial users:

```sql
SELECT
  DATE("lastActiveDate") as date,
  COUNT(DISTINCT id) as active_users
FROM free_users
WHERE
  "isTrialExpired" = false AND
  "lastActiveDate" >= NOW() - INTERVAL '7 days'
GROUP BY DATE("lastActiveDate")
ORDER BY date DESC;
```

---

## Testing Guide

### Manual Testing Checklist

- [ ] **Guest User Creation**
  - [ ] Visit dashboard without authentication
  - [ ] Verify freeUserId created in localStorage
  - [ ] Verify trial expiry date set to 15 days from now
  - [ ] Verify cookie set with freeUserId

- [ ] **Trial Banner Display**
  - [ ] Verify banner shows with correct urgency (info/warning/urgent/expired)
  - [ ] Verify days remaining and tests remaining are correct
  - [ ] Verify banner can be dismissed (except expired state)
  - [ ] Verify banner returns after 24 hours if dismissed

- [ ] **Trial Expiration**
  - [ ] Modify trialExpiryDate to past date in database
  - [ ] Refresh page and verify modal appears
  - [ ] Verify modal blocks access to dashboard
  - [ ] Verify upgrade button redirects to pricing page
  - [ ] Verify extension request form submits successfully

- [ ] **Test Limit**
  - [ ] Take 50 tests as guest user
  - [ ] Verify 51st test is blocked
  - [ ] Verify appropriate error message shown

- [ ] **Trial Extension**
  - [ ] Submit extension request via modal
  - [ ] As admin, call `/api/trial/extend` with admin key
  - [ ] Verify trial extended by specified days
  - [ ] Verify user can continue accessing features

- [ ] **Upgrade Flow**
  - [ ] Create authenticated user account
  - [ ] Call `convertToFullUser(freeUserId, userId)`
  - [ ] Verify all test data migrated to new user
  - [ ] Verify FreeUser.upgradedToUserId links to new user
  - [ ] Verify trial banner no longer shows

### Automated Testing

Create tests for core functionality:

```typescript
// __tests__/trial/trialManager.test.ts
describe('Trial Manager', () => {
  it('should initialize trial with 15-day expiry', async () => {
    const status = await initializeTrial({ deviceId: 'test-device' })
    expect(status.daysRemaining).toBe(15)
    expect(status.testsRemaining).toBe(50)
  })

  it('should calculate urgency level correctly', () => {
    expect(getUrgencyLevel(15, false)).toBe('info')
    expect(getUrgencyLevel(5, false)).toBe('warning')
    expect(getUrgencyLevel(2, false)).toBe('urgent')
    expect(getUrgencyLevel(0, true)).toBe('expired')
  })

  it('should prevent test when limit reached', async () => {
    const user = await createTestUser({ testsTakenCount: 50 })
    const access = await canTakeTest(user.id)
    expect(access.allowed).toBe(false)
  })
})
```

---

## Premium Features vs Free Trial

### Full Access During Trial

- ✅ Test taking and submissions (up to 50 tests)
- ✅ Progress tracking
- ✅ AI predictions
- ✅ Dashboard access
- ✅ Performance reports

### Locked Premium Features

- ❌ Advanced analytics (detailed breakdowns)
- ❌ Personalized study plans (AI-generated)
- ❌ Priority support (24/7 help)
- ❌ Unlimited tests (locked after 50)
- ❌ Peer comparison (leaderboards)
- ❌ Certificate generation

---

## Environment Variables

Add the following to your `.env` file:

```bash
# Trial System
TRIAL_DURATION_DAYS=15
MAX_TRIAL_TESTS=50

# Admin secret for trial extensions
ADMIN_SECRET_KEY=your-secure-admin-key-here
```

---

## Support & Maintenance

### Monitoring Trial System Health

Create a monitoring dashboard to track:

- Total active trials
- Trials expiring in next 24/48/72 hours
- Conversion rate (trial → paid)
- Average tests taken before conversion
- Extension request rate
- Abandonment rate

### Common Issues & Solutions

**Issue:** Trial banner not showing

- Check localStorage for freeUserId
- Verify API endpoint `/api/trial/status` returns data
- Check browser console for errors

**Issue:** Trial expired but modal not showing

- Check `trial-expired-shown` flag in localStorage
- Clear localStorage and reload page
- Verify `isTrialExpired` flag in database

**Issue:** Test count not incrementing

- Verify `incrementTestCount()` called after test submission
- Check database for testsTakenCount field
- Review API logs for errors

---

## Conclusion

The trial system is now fully implemented and ready for production use. Follow the testing guide to ensure all functionality works as expected before deploying to production.

For questions or issues, please contact the development team.
