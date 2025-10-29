# Student Dashboard - Quick Start Guide

**For Developers Starting Work on the Student Dashboard**

---

## 🚀 Getting Started (5 minutes)

### 1. Clone & Setup

```bash
cd /Users/drshekhar/cerebrum-biology-academy-website
npm install
```

### 2. Environment Setup

Create `.env.local`:

```bash
DATABASE_URL="postgresql://..."
DIRECT_DATABASE_URL="postgresql://..."
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

### 3. Database Setup

```bash
# Generate Prisma client
npx prisma generate

# Run migrations
npx prisma migrate dev

# Seed test data
npx prisma db seed

# Open Prisma Studio to verify
npx prisma studio
```

### 4. Start Dev Server

```bash
npm run dev
# Open http://localhost:3000
```

---

## 📁 Key Files to Know

### Student Dashboard Files

```
/src/app/
├── student/
│   ├── dashboard/
│   │   └── page.tsx          ❌ DOESN'T EXIST - Create this first!
│   ├── ai-tutor/
│   │   └── page.tsx          ✅ Exists
│   └── layout.tsx            ⚠️  Needs update
│
├── dashboard/
│   └── student/
│       └── page.tsx          ✅ Analytics dashboard (70% done)
│
└── api/
    ├── student/
    │   └── materials/
    │       └── route.ts      ✅ Exists
    └── analytics/            ✅ 15+ endpoints exist
```

### Components

```
/src/components/
├── student/
│   ├── MyEnrollments.tsx     ✅ Exists
│   └── StudentCommunity.tsx  ✅ Exists
│
├── dashboard/
│   └── PersonalizedStudentDashboard.tsx  ✅ Exists
│
└── analytics/                ✅ 15+ components exist
    ├── PerformanceChart.tsx
    ├── LeaderboardWidget.tsx
    └── ...
```

### Hooks

```
/src/hooks/
├── useAuth.ts               ⚠️  Has demo mode - needs fix
├── useEnrollment.ts         ✅ Works
├── useAnalytics.ts          ✅ Works
└── useNotifications.ts      ❌ Doesn't exist - create this
```

---

## ✅ What Works Right Now

Test these URLs:

- `http://localhost:3000/dashboard/student` - Analytics dashboard
- `http://localhost:3000/student/ai-tutor` - AI tutor chat
- `http://localhost:3000/test-platform` - Test taking interface

### Working API Endpoints

```bash
# Get analytics
curl http://localhost:3000/api/analytics/performance?userId=USER_ID

# Get test attempts
curl http://localhost:3000/api/test-attempts?freeUserId=USER_ID

# Get study materials
curl http://localhost:3000/api/student/materials?userId=USER_ID
```

---

## 🔧 First Task: Create Student Dashboard

**Goal:** Create `/src/app/student/dashboard/page.tsx`

### Step 1: Create the File

```typescript
// /src/app/student/dashboard/page.tsx
'use client'

import { useAuth } from '@/hooks/useAuth'
import { Card } from '@/components/ui/Card'

export default function StudentDashboard() {
  const { user, isLoading } = useAuth()

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (!user) {
    return <div>Please log in</div>
  }

  return (
    <div className="p-6">
      <h1>Welcome, {user.name}!</h1>

      <div className="grid gap-6 mt-6">
        {/* Quick Stats */}
        <Card>
          <h2>Quick Stats</h2>
          {/* TODO: Add stats */}
        </Card>

        {/* Recent Activity */}
        <Card>
          <h2>Recent Activity</h2>
          {/* TODO: Add activity */}
        </Card>
      </div>
    </div>
  )
}
```

### Step 2: Test It

```bash
# Visit
http://localhost:3000/student/dashboard
```

### Step 3: Add Data Fetching

```typescript
'use client'

import { useQuery } from '@tanstack/react-query'

function useStudentData(userId: string) {
  return useQuery({
    queryKey: ['student', userId],
    queryFn: async () => {
      const res = await fetch(`/api/student/${userId}`)
      return res.json()
    },
  })
}

export default function StudentDashboard() {
  const { user } = useAuth()
  const { data, isLoading } = useStudentData(user?.id)

  // ... rest of component
}
```

### Step 4: Add More Sections

- Enrollments
- Upcoming classes
- Recent tests
- Study materials

---

## 🐛 Common Issues & Fixes

### Issue 1: "Database not connected"

```bash
# Check .env has DATABASE_URL
cat .env.local | grep DATABASE_URL

# Test connection
npx prisma db pull

# If fails, check PostgreSQL is running
```

### Issue 2: "useAuth returns null"

```typescript
// Current useAuth has demo mode fallback
// For now, create a test user manually:

const testUser = {
  id: 'test-user-1',
  email: 'test@example.com',
  name: 'Test Student',
  role: 'STUDENT',
}
```

### Issue 3: "API returns 404"

```bash
# Make sure API route exists
ls src/app/api/student/

# Check route file has proper exports
cat src/app/api/student/route.ts
```

### Issue 4: "TypeScript errors"

```bash
# Regenerate Prisma types
npx prisma generate

# Restart TypeScript server in VSCode
# Cmd+Shift+P -> "TypeScript: Restart TS Server"
```

---

## 📊 Understanding the Data Flow

### User Flow

```
1. User visits /student/dashboard
2. useAuth() checks if logged in
3. If yes, fetch user data from /api/student/[userId]
4. Display enrollments, tests, materials
```

### Data Sources

```typescript
// User data
GET /api/student/[userId]
{
  id: string
  name: string
  email: string
  enrollments: Enrollment[]
}

// Performance data
GET /api/analytics/performance?userId=X
{
  totalTests: number
  averageScore: number
  improvementRate: number
}

// Materials
GET /api/student/materials?userId=X
{
  materials: Material[]
  progress: Progress[]
}
```

---

## 🎨 UI Components Available

### Already Built (Use These!)

```typescript
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { PerformanceChart } from '@/components/analytics/PerformanceChart'
import { LeaderboardWidget } from '@/components/analytics/LeaderboardWidget'
```

### Example Usage

```typescript
<Card>
  <CardHeader>
    <CardTitle>My Tests</CardTitle>
  </CardHeader>
  <CardContent>
    <PerformanceChart data={performanceData} />
  </CardContent>
</Card>
```

---

## 🔒 Auth & Permissions

### Current State (Temporary)

```typescript
// useAuth has demo mode
// For development, it returns a mock user
const { user } = useAuth()
// user = { id: 'demo', name: 'Demo Student' }
```

### Future State (Production)

```typescript
// Real authentication
// Only logged-in students can access /student/*
// Middleware redirects to /auth/signin if not logged in
```

### Checking Enrollment

```typescript
// Before showing course content, verify:
const enrollment = await prisma.enrollment.findFirst({
  where: {
    userId: user.id,
    courseId: courseId,
    status: 'ACTIVE'
  }
})

if (!enrollment) {
  return <div>Not enrolled in this course</div>
}
```

---

## 📦 Useful Prisma Queries

### Get User's Enrollments

```typescript
const enrollments = await prisma.enrollment.findMany({
  where: {
    userId: userId,
    status: 'ACTIVE',
  },
  include: {
    course: true,
    batch: true,
  },
})
```

### Get Study Materials for Enrolled Courses

```typescript
const materials = await prisma.studyMaterial.findMany({
  where: {
    courseId: {
      in: enrollments.map((e) => e.courseId),
    },
    isPublished: true,
  },
})
```

### Get Test Attempts

```typescript
const attempts = await prisma.testAttempt.findMany({
  where: {
    freeUserId: userId,
  },
  include: {
    testTemplate: true,
  },
  orderBy: {
    startedAt: 'desc',
  },
})
```

---

## 🧪 Testing Your Changes

### Manual Testing Checklist

- [ ] Page loads without errors
- [ ] Data displays correctly
- [ ] Loading states show
- [ ] Error states work
- [ ] Mobile responsive (test at 375px width)
- [ ] Works in Chrome, Safari, Firefox

### Quick Test Script

```typescript
// Add to your component for debugging
useEffect(() => {
  console.log('User:', user)
  console.log('Data:', data)
  console.log('Loading:', isLoading)
  console.log('Error:', error)
}, [user, data, isLoading, error])
```

---

## 📚 Resources

### Documentation

- [Next.js Docs](https://nextjs.org/docs)
- [Prisma Docs](https://www.prisma.io/docs)
- [React Query Docs](https://tanstack.com/query/latest)

### Project Docs

- `/STUDENT_DASHBOARD_ROADMAP.md` - Full roadmap
- `/IMPLEMENTATION_TASKS.md` - Task breakdown
- `/src/docs/course-system-documentation.md` - Course system

### Code References

- `/src/app/dashboard/student/page.tsx` - Analytics example
- `/src/components/dashboard/PersonalizedStudentDashboard.tsx` - Study sessions
- `/src/components/student/MyEnrollments.tsx` - Enrollment UI

---

## 🆘 Getting Help

### Error Logs

```bash
# Server logs
npm run dev

# Browser console
# Open DevTools > Console

# Prisma logs
# Set DEBUG=* in .env for verbose logging
```

### Common Commands

```bash
# Reset database (WARNING: deletes all data)
npx prisma migrate reset

# View database
npx prisma studio

# Generate types
npx prisma generate

# Format code
npm run format

# Type check
npm run type-check
```

---

## 🎯 Your First Week Goals

### Day 1-2: Setup & Exploration

- [ ] Get dev environment running
- [ ] Explore existing code
- [ ] Run existing pages (dashboard, ai-tutor)
- [ ] Look at database schema

### Day 3-4: First Feature

- [ ] Create `/student/dashboard/page.tsx`
- [ ] Show user name
- [ ] Display enrollments count
- [ ] Add recent tests section

### Day 5: Polish

- [ ] Add loading states
- [ ] Add error handling
- [ ] Make it responsive
- [ ] Test on mobile

---

## 💡 Pro Tips

1. **Copy Existing Patterns**
   - Don't reinvent the wheel
   - Copy from `/app/dashboard/student/page.tsx`
   - Reuse components from `/components/analytics/`

2. **Use React Query**
   - Don't use raw fetch in components
   - Create custom hooks for data fetching
   - Let React Query handle caching

3. **Check Database First**
   - Open Prisma Studio
   - Verify data exists before debugging code
   - Use seed script to create test data

4. **Mobile-First**
   - Start with mobile layout
   - Use Tailwind responsive classes
   - Test at 375px width

5. **Incremental Development**
   - Start simple (just show user name)
   - Add features one at a time
   - Test after each change

---

## 🚦 Status Indicators

Legend:

- ✅ **Exists and works** - Use as-is or reference
- ⚠️ **Exists but needs work** - Fix or update
- ❌ **Doesn't exist** - Create from scratch

---

## 📞 Quick Reference

### Student Dashboard Files Status

| File/Feature                  | Status | Priority | Effort |
| ----------------------------- | ------ | -------- | ------ |
| `/student/dashboard/page.tsx` | ❌     | Critical | Small  |
| Navigation                    | ⚠️     | Critical | Medium |
| Authentication                | ⚠️     | Critical | Medium |
| Study Materials UI            | ❌     | High     | Large  |
| Course Content                | ❌     | High     | Large  |
| Live Classes                  | ❌     | High     | Medium |
| Notifications                 | ❌     | High     | Medium |
| Parent Dashboard              | ❌     | Medium   | Large  |
| Study Planner                 | ❌     | Medium   | Large  |

### API Endpoints Status

| Endpoint                     | Status | Notes   |
| ---------------------------- | ------ | ------- |
| `/api/student/materials`     | ✅     | Working |
| `/api/analytics/performance` | ✅     | Working |
| `/api/analytics/leaderboard` | ✅     | Working |
| `/api/student/notifications` | ❌     | Create  |
| `/api/student/classes`       | ❌     | Create  |
| `/api/student/course/[id]`   | ❌     | Create  |

---

**Last Updated:** 2025-10-29
**Version:** 1.0
**Maintainer:** Development Team

Happy coding! 🚀
