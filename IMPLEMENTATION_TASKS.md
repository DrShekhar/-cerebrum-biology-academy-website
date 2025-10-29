# Student Dashboard - Implementation Tasks

**Format:** Copy-paste ready for GitHub Issues or Jira

---

## Week 1-2: Critical Foundation

### TASK-001: Create Student Dashboard Root Page

**Labels:** `priority:critical`, `effort:small`, `week-1`
**Assignee:** [Developer Name]
**Sprint:** Week 1

**Description:**
Create the main student dashboard page that unifies analytics, study sessions, and quick access features.

**File to Create:**

- `/src/app/student/dashboard/page.tsx`

**Requirements:**

- [ ] Display user name and welcome message
- [ ] Show enrolled courses count
- [ ] Display recent test scores (last 5)
- [ ] Show upcoming classes (next 3)
- [ ] Quick action buttons: Take Test, View Materials, AI Tutor
- [ ] Responsive layout (mobile, tablet, desktop)
- [ ] Loading skeleton during data fetch
- [ ] Error boundary with retry button

**Implementation Notes:**

```typescript
// Combine features from:
// - /app/dashboard/student/page.tsx (analytics)
// - /components/dashboard/PersonalizedStudentDashboard.tsx (sessions)

export default function StudentDashboard() {
  const { user } = useAuth()
  const { data, isLoading, error } = useStudentData(user?.id)

  return (
    <div className="dashboard">
      <Header user={user} />
      <Tabs>
        <Tab name="Overview">{/* Combined view */}</Tab>
        <Tab name="Analytics">{/* Charts */}</Tab>
        <Tab name="Study">{/* Timer, goals */}</Tab>
      </Tabs>
    </div>
  )
}
```

**Testing:**

- [ ] Load page with authenticated user
- [ ] Load page with unauthenticated user (should redirect)
- [ ] Load page with no enrollments (show empty state)
- [ ] Simulate API failure (show error state)
- [ ] Test on mobile (320px width)

**Acceptance Criteria:**

- Page accessible at `/student/dashboard`
- All data loads within 2 seconds
- No console errors
- Passes accessibility audit (aXe)

---

### TASK-002: Implement Student Navigation

**Labels:** `priority:critical`, `effort:medium`, `week-1`
**Assignee:** [Developer Name]
**Sprint:** Week 1

**Description:**
Create a unified navigation system for all student pages with responsive mobile menu.

**Files:**

- Update: `/src/app/student/layout.tsx`
- Create: `/src/components/student/StudentNav.tsx`

**Nav Items:**

```
Dashboard (/)
My Courses (/courses)
Study Materials (/materials)
Practice Tests (/tests)
Live Classes (/classes)
AI Tutor (/ai-tutor)
Community (/community)
Notifications (/notifications)
Settings (/settings)
```

**Features:**

- [ ] Highlight active route
- [ ] Mobile hamburger menu
- [ ] User avatar dropdown (profile, logout)
- [ ] Notification bell with badge count
- [ ] Search bar (global)
- [ ] Breadcrumbs on sub-pages

**Mobile Menu:**

- Slide-in from left
- Overlay backdrop
- Close on route change
- Swipe to close

**Desktop:**

- Sidebar (fixed on left)
- Collapsible with icons-only mode
- Keyboard navigation (Tab, Arrow keys)

**Acceptance Criteria:**

- Navigation works on all screen sizes
- Active route highlighted correctly
- Keyboard accessible
- Smooth animations (<300ms)

---

### TASK-003: Fix Authentication System

**Labels:** `priority:critical`, `effort:medium`, `week-1`, `security`
**Assignee:** [Developer Name]
**Sprint:** Week 1

**Description:**
Remove demo mode fallback and implement production-ready authentication.

**Files to Modify:**

- `/src/hooks/useAuth.ts`
- `/src/middleware.ts` (create if missing)
- `/src/app/api/auth/*`

**Current Issues:**

1. Demo mode allows bypassing real auth
2. No session persistence
3. No token refresh logic
4. No protected route middleware

**Implementation:**

**Step 1: Fix useAuth Hook**

```typescript
export function useAuth() {
  const { user, isLoading, error } = db.useAuth()

  // Remove demo mode fallback completely

  return {
    user,
    isLoading,
    error,
    isAuthenticated: !!user,
    signInWithEmail: db.auth.sendMagicCode,
    signOut: db.auth.signOut,
  }
}
```

**Step 2: Create Middleware**

```typescript
// src/middleware.ts
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Protected routes
  if (pathname.startsWith('/student')) {
    const session = getSession(request)
    if (!session) {
      return NextResponse.redirect('/auth/signin')
    }
  }

  return NextResponse.next()
}
```

**Step 3: Session Management**

- Store JWT in httpOnly cookie
- Refresh token rotation
- Expire sessions after 7 days of inactivity
- Automatic refresh before expiry

**Testing:**

- [ ] Unauthenticated user redirected to login
- [ ] Session persists across page reloads
- [ ] Session expires after 7 days
- [ ] Token refreshes automatically
- [ ] Logout clears all session data

**Security Checklist:**

- [ ] Passwords hashed with bcrypt (if applicable)
- [ ] JWT secret is strong and in env variables
- [ ] HTTPS enforced in production
- [ ] CSRF protection enabled
- [ ] Rate limiting on auth endpoints

**Acceptance Criteria:**

- No demo mode code remains
- All protected routes require auth
- Session management works correctly
- Security best practices followed

---

### TASK-004: Implement Data Fetching with React Query

**Labels:** `priority:high`, `effort:medium`, `week-2`
**Assignee:** [Developer Name]
**Sprint:** Week 2

**Description:**
Replace manual fetch calls with React Query for better caching, error handling, and loading states.

**Install:**

```bash
npm install @tanstack/react-query
```

**Setup:**

```typescript
// src/app/layout.tsx
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      retry: 3,
      refetchOnWindowFocus: true
    }
  }
})

export default function RootLayout({ children }) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  )
}
```

**Create Hooks:**

```typescript
// src/hooks/useStudentData.ts
export function useStudentData(userId: string) {
  return useQuery({
    queryKey: ['student', userId],
    queryFn: () => fetch(`/api/student/${userId}`).then((r) => r.json()),
    enabled: !!userId,
  })
}

// src/hooks/usePerformanceData.ts
export function usePerformanceData(userId: string, period: string) {
  return useQuery({
    queryKey: ['performance', userId, period],
    queryFn: () =>
      fetch(`/api/analytics/performance?userId=${userId}&period=${period}`).then((r) => r.json()),
  })
}
```

**Refactor Components:**

- `/src/app/dashboard/student/page.tsx`
- `/src/components/dashboard/PersonalizedStudentDashboard.tsx`

**Before:**

```typescript
const [data, setData] = useState(null)
const [loading, setLoading] = useState(true)

useEffect(() => {
  fetch('/api/data')
    .then((r) => r.json())
    .then(setData)
}, [])
```

**After:**

```typescript
const { data, isLoading, error, refetch } = useStudentData(user.id)
```

**Testing:**

- [ ] Data loads correctly
- [ ] Loading states show skeleton
- [ ] Errors show retry button
- [ ] Cache works (second load instant)
- [ ] Background refetch on window focus

**Acceptance Criteria:**

- All fetch calls use React Query
- Consistent loading/error states
- Data cached appropriately
- No unnecessary re-fetches

---

### TASK-005: Verify Database Setup

**Labels:** `priority:critical`, `effort:medium`, `week-1`, `infrastructure`
**Assignee:** [DevOps/Developer]
**Sprint:** Week 1

**Description:**
Ensure Prisma is properly connected to PostgreSQL and all migrations are applied.

**Checklist:**

**Step 1: Environment Variables**

```bash
# .env
DATABASE_URL="postgresql://user:password@localhost:5432/cerebrum_db?schema=public"
DIRECT_DATABASE_URL="..." # For migrations
```

**Step 2: Test Connection**

```bash
npx prisma db pull
npx prisma generate
```

**Step 3: Run Migrations**

```bash
npx prisma migrate dev --name init
```

**Step 4: Seed Data**

```bash
npx prisma db seed
```

**Step 5: Verify**

```bash
# Test API endpoint
curl http://localhost:3000/api/student/1
# Should return real data, not mock
```

**Create Seed Script:**

```typescript
// prisma/seed.ts
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  // Create test users
  await prisma.user.createMany({
    data: [
      { email: 'student1@test.com', name: 'Test Student', role: 'STUDENT' },
      { email: 'admin@test.com', name: 'Admin User', role: 'ADMIN' },
    ],
  })

  // Create courses
  await prisma.course.create({
    data: {
      name: 'NEET Biology Class 12',
      type: 'CLASS_12',
      class: 'CLASS_12',
      duration: 12,
      totalFees: 50000 * 100, // in paise
    },
  })
}

main()
```

**Testing:**

- [ ] Can connect to database
- [ ] All migrations applied
- [ ] Seed data loads
- [ ] API returns real data
- [ ] Prisma Studio works

**Acceptance Criteria:**

- Database connected successfully
- Schema matches Prisma models
- Seed data present
- No mock data in API responses

---

## Week 3-4: Core Features

### TASK-006: Build Study Materials System

**Labels:** `priority:high`, `effort:large`, `week-3`, `week-4`
**Assignee:** [Developer Name]
**Sprint:** Week 3-4

**Description:**
Create a complete study materials library with PDF viewer, downloads, and progress tracking.

**Pages to Create:**

- `/src/app/student/materials/page.tsx` - Materials library
- `/src/app/student/materials/[courseId]/page.tsx` - Course materials
- `/src/app/student/materials/[courseId]/[id]/page.tsx` - Material viewer

**Components:**

- `/src/components/student/MaterialsLibrary.tsx`
- `/src/components/student/MaterialCard.tsx`
- `/src/components/student/MaterialViewer.tsx`
- `/src/components/student/PDFViewer.tsx`

**Features:**

**1. Materials Library**

```typescript
interface MaterialsLibraryProps {
  courseId?: string
}

function MaterialsLibrary({ courseId }) {
  const [filters, setFilters] = useState({
    type: 'all', // notes, assignments, references
    chapter: 'all',
    search: ''
  })

  const { data: materials } = useMaterials(courseId, filters)

  return (
    <div>
      <SearchBar />
      <Filters />
      <MaterialGrid materials={materials} />
    </div>
  )
}
```

**2. PDF Viewer**
Use library: `react-pdf` or `@react-pdf-viewer/core`

```typescript
import { Viewer, Worker } from '@react-pdf-viewer/core'

function PDFViewer({ fileUrl, materialId, userId }) {
  const [currentPage, setCurrentPage] = useState(1)

  // Save progress
  useEffect(() => {
    const timer = setTimeout(() => {
      saveProgress(materialId, userId, currentPage)
    }, 2000)
    return () => clearTimeout(timer)
  }, [currentPage])

  return (
    <Worker workerUrl="...">
      <Viewer
        fileUrl={fileUrl}
        initialPage={currentPage}
        onPageChange={setCurrentPage}
      />
    </Worker>
  )
}
```

**3. Download Tracking**

```typescript
async function handleDownload(materialId: string) {
  // Track download
  await fetch(`/api/student/materials/${materialId}/download`, {
    method: 'POST',
  })

  // Increment download count
  // Log to MaterialProgress table

  // Trigger browser download
  window.location.href = `/api/student/materials/${materialId}/download`
}
```

**API Routes:**

**GET /api/student/materials**

```typescript
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const userId = searchParams.get('userId')
  const courseId = searchParams.get('courseId')
  const type = searchParams.get('type')

  // Get user enrollments
  const enrollments = await prisma.enrollment.findMany({
    where: { userId, status: 'ACTIVE' },
  })

  // Get materials for enrolled courses
  const materials = await prisma.studyMaterial.findMany({
    where: {
      courseId: { in: enrollments.map((e) => e.courseId) },
      isPublished: true,
      materialType: type || undefined,
    },
    include: {
      course: true,
      chapter: true,
      topic: true,
    },
  })

  // Get user progress for each material
  const progress = await prisma.materialProgress.findMany({
    where: { userId, materialId: { in: materials.map((m) => m.id) } },
  })

  return Response.json({
    success: true,
    data: materials.map((m) => ({
      ...m,
      progress: progress.find((p) => p.materialId === m.id),
    })),
  })
}
```

**POST /api/student/materials/[id]/download**

```typescript
export async function POST(request: Request, { params }) {
  const { id } = params
  const userId = await getUserFromSession(request)

  // Verify access
  const material = await prisma.studyMaterial.findUnique({
    where: { id },
  })

  const hasAccess = await checkUserHasAccess(userId, material.courseId)
  if (!hasAccess) {
    return Response.json({ error: 'Unauthorized' }, { status: 403 })
  }

  // Track download
  await prisma.materialProgress.upsert({
    where: { materialId_userId: { materialId: id, userId } },
    update: { downloadedAt: new Date() },
    create: {
      materialId: id,
      userId,
      status: 'DOWNLOADED',
      downloadedAt: new Date(),
    },
  })

  // Increment download count
  await prisma.studyMaterial.update({
    where: { id },
    data: { totalDownloads: { increment: 1 } },
  })

  // Return file
  return new Response(fileStream, {
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename="${material.fileName}"`,
    },
  })
}
```

**Database Schema (already exists):**

```prisma
model StudyMaterial {
  id String @id
  title String
  materialType MaterialType // PDF_NOTES, PDF_ASSIGNMENT, etc.
  fileUrl String
  courseId String
  chapterId String?
  accessLevel AccessLevel
  // ... other fields
}

model MaterialProgress {
  id String @id
  materialId String
  userId String
  status ProgressStatus // NOT_STARTED, VIEWED, DOWNLOADED, COMPLETED
  currentPage Int?
  downloadedAt DateTime?
  completedAt DateTime?
}
```

**Testing:**

- [ ] Students can view materials for enrolled courses only
- [ ] PDF viewer loads and displays correctly
- [ ] Page number tracking works
- [ ] Downloads track correctly
- [ ] Access control enforced
- [ ] Mobile PDF viewer works

**Acceptance Criteria:**

- Materials library functional
- PDF viewer smooth scrolling
- Progress saved automatically
- Downloads tracked
- Mobile responsive

---

### TASK-007: Implement Course Content Delivery

**Labels:** `priority:high`, `effort:large`, `week-3`, `week-4`
**Assignee:** [Developer Name]
**Sprint:** Week 3-4

**Description:**
Create course content pages with chapters, videos, and assignments.

**Pages:**

- `/src/app/student/course/[courseId]/page.tsx`
- `/src/app/student/course/[courseId]/chapter/[chapterId]/page.tsx`

**Components:**

- `/src/components/student/CourseOverview.tsx`
- `/src/components/student/CourseContent.tsx`
- `/src/components/student/ChapterView.tsx`
- `/src/components/student/VideoPlayer.tsx`
- `/src/components/student/AssignmentUpload.tsx`

**Course Overview Page:**

```typescript
function CourseOverviewPage({ params }: { params: { courseId: string } }) {
  const { data: course } = useCourse(params.courseId)
  const { data: progress } = useCourseProgress(params.courseId)

  return (
    <div>
      {/* Header */}
      <CourseHeader course={course} />

      {/* Progress Ring */}
      <ProgressCircle percentage={progress.overallProgress} />

      {/* Chapters List */}
      <ChaptersList chapters={course.chapters} progress={progress.chapters} />

      {/* Upcoming Classes */}
      <UpcomingClasses courseId={params.courseId} />

      {/* Study Materials */}
      <QuickMaterials courseId={params.courseId} />
    </div>
  )
}
```

**Chapter View:**

```typescript
function ChapterView({ courseId, chapterId }) {
  const { data: chapter } = useChapter(chapterId)
  const [activeTab, setActiveTab] = useState('content')

  return (
    <div>
      <ChapterHeader chapter={chapter} />

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <Tab value="content">Content</Tab>
          <Tab value="materials">Materials</Tab>
          <Tab value="assignments">Assignments</Tab>
        </TabsList>

        <TabsContent value="content">
          {chapter.topics.map(topic => (
            <TopicCard key={topic.id} topic={topic} />
          ))}
        </TabsContent>

        <TabsContent value="materials">
          <MaterialsList chapterId={chapterId} />
        </TabsContent>

        <TabsContent value="assignments">
          <AssignmentsList chapterId={chapterId} />
        </TabsContent>
      </Tabs>
    </div>
  )
}
```

**Video Player:**

```typescript
import ReactPlayer from 'react-player'

function VideoPlayer({ videoUrl, materialId, userId }) {
  const [played, setPlayed] = useState(0)
  const [watching, setWatching] = useState(false)

  const handleProgress = (state) => {
    setPlayed(state.played)

    // Save progress every 10 seconds
    if (state.playedSeconds % 10 === 0) {
      saveVideoProgress(materialId, userId, state.playedSeconds)
    }
  }

  const handleEnded = () => {
    markVideoComplete(materialId, userId)
  }

  return (
    <ReactPlayer
      url={videoUrl}
      controls
      width="100%"
      height="auto"
      onProgress={handleProgress}
      onEnded={handleEnded}
      onPlay={() => setWatching(true)}
      onPause={() => setWatching(false)}
    />
  )
}
```

**API Routes:**

**GET /api/student/course/[courseId]**

```typescript
export async function GET(request, { params }) {
  const userId = await getUserFromSession(request)
  const { courseId } = params

  // Verify enrollment
  const enrollment = await prisma.enrollment.findFirst({
    where: { userId, courseId, status: 'ACTIVE' },
  })

  if (!enrollment) {
    return Response.json({ error: 'Not enrolled' }, { status: 403 })
  }

  const course = await prisma.course.findUnique({
    where: { id: courseId },
    include: {
      chapters: {
        include: {
          topics: true,
        },
        orderBy: { orderIndex: 'asc' },
      },
    },
  })

  return Response.json({ success: true, data: course })
}
```

**POST /api/student/course/[courseId]/progress**

```typescript
export async function POST(request, { params }) {
  const userId = await getUserFromSession(request)
  const { chapterId, topicId, completed } = await request.json()

  // Update progress
  await prisma.userProgress.upsert({
    where: { userId_topicId: { userId, topicId } },
    update: { completed, updatedAt: new Date() },
    create: {
      userId,
      topicId,
      chapterId,
      courseId: params.courseId,
      completed,
    },
  })

  return Response.json({ success: true })
}
```

**Testing:**

- [ ] Course content loads correctly
- [ ] Chapters in correct order
- [ ] Video playback smooth
- [ ] Progress tracking works
- [ ] Only enrolled students access

**Acceptance Criteria:**

- Course structure clear
- Videos play without buffering
- Progress saves automatically
- Mobile responsive

---

### TASK-008: Add Live Class Integration

**Labels:** `priority:high`, `effort:medium`, `week-4`
**Assignee:** [Developer Name]
**Sprint:** Week 4

**Description:**
Display scheduled classes and provide join links for live sessions.

**Pages:**

- `/src/app/student/classes/page.tsx`

**Components:**

- `/src/components/student/LiveClassWidget.tsx`
- `/src/components/student/ClassCalendar.tsx`
- `/src/components/student/UpcomingClasses.tsx`

**Database Schema (NEW):**

```prisma
model LiveClass {
  id String @id @default(cuid())
  courseId String
  batchId String?
  title String
  description String?
  scheduledAt DateTime
  duration Int // minutes
  meetingLink String? // Zoom/Google Meet URL
  meetingPassword String?
  recordingUrl String?
  isLive Boolean @default(false)
  status ClassStatus @default(SCHEDULED)

  course Course @relation(fields: [courseId], references: [id])
  batch Batch? @relation(fields: [batchId], references: [id])
  attendanceRecords ClassAttendance[]

  @@index([courseId, scheduledAt])
}

model ClassAttendance {
  id String @id @default(cuid())
  liveClassId String
  userId String
  joinedAt DateTime @default(now())
  leftAt DateTime?
  durationMinutes Int?

  liveClass LiveClass @relation(fields: [liveClassId], references: [id])
  user User @relation(fields: [userId], references: [id])

  @@unique([liveClassId, userId])
}

enum ClassStatus {
  SCHEDULED
  LIVE
  COMPLETED
  CANCELLED
}
```

**Migration:**

```bash
npx prisma migrate dev --name add_live_classes
```

**Classes Page:**

```typescript
function ClassesPage() {
  const { data: upcomingClasses } = useUpcomingClasses()
  const { data: pastClasses } = usePastClasses()

  return (
    <div>
      <h1>Live Classes</h1>

      {/* Calendar View */}
      <ClassCalendar classes={upcomingClasses} />

      {/* Upcoming Classes */}
      <div>
        <h2>Upcoming Classes</h2>
        {upcomingClasses.map(cls => (
          <ClassCard key={cls.id} class={cls} />
        ))}
      </div>

      {/* Past Recordings */}
      <div>
        <h2>Past Recordings</h2>
        {pastClasses.map(cls => (
          <RecordingCard key={cls.id} class={cls} />
        ))}
      </div>
    </div>
  )
}
```

**Class Card:**

```typescript
function ClassCard({ class: cls }) {
  const now = new Date()
  const classTime = new Date(cls.scheduledAt)
  const canJoin = classTime - now < 10 * 60 * 1000 // 10 minutes before

  const handleJoin = () => {
    // Track attendance
    fetch(`/api/student/class/${cls.id}/attend`, { method: 'POST' })

    // Open meeting link
    window.open(cls.meetingLink, '_blank')
  }

  return (
    <Card>
      <CardHeader>
        <h3>{cls.title}</h3>
        <p>{format(classTime, 'PPpp')}</p>
      </CardHeader>
      <CardContent>
        <p>{cls.description}</p>
        <p>Duration: {cls.duration} minutes</p>
      </CardContent>
      <CardFooter>
        {cls.isLive && (
          <Badge variant="live">LIVE NOW</Badge>
        )}
        {canJoin && !cls.isLive && (
          <Button onClick={handleJoin}>Join Class</Button>
        )}
        {!canJoin && (
          <p>Available to join {formatDistanceToNow(classTime)}</p>
        )}
      </CardFooter>
    </Card>
  )
}
```

**API Routes:**

**GET /api/student/classes**

```typescript
export async function GET(request: Request) {
  const userId = await getUserFromSession(request)
  const { searchParams } = new URL(request.url)
  const upcoming = searchParams.get('upcoming') === 'true'

  // Get user enrollments and batches
  const enrollments = await prisma.enrollment.findMany({
    where: { userId, status: 'ACTIVE' },
    include: { batch: true },
  })

  const courseIds = enrollments.map((e) => e.courseId)
  const batchIds = enrollments.map((e) => e.batchId).filter(Boolean)

  const classes = await prisma.liveClass.findMany({
    where: {
      OR: [{ courseId: { in: courseIds } }, { batchId: { in: batchIds } }],
      scheduledAt: upcoming ? { gte: new Date() } : { lt: new Date() },
      status: upcoming ? 'SCHEDULED' : 'COMPLETED',
    },
    orderBy: { scheduledAt: upcoming ? 'asc' : 'desc' },
    take: 10,
  })

  return Response.json({ success: true, data: classes })
}
```

**POST /api/student/class/[id]/attend**

```typescript
export async function POST(request, { params }) {
  const userId = await getUserFromSession(request)
  const { id: liveClassId } = params

  // Create attendance record
  await prisma.classAttendance.create({
    data: {
      liveClassId,
      userId,
      joinedAt: new Date(),
    },
  })

  return Response.json({ success: true })
}
```

**Acceptance Criteria:**

- Students see all scheduled classes
- Join button appears at right time
- Attendance tracked when joining
- Recordings accessible later
- Calendar view functional

---

### TASK-009: Build Notifications System

**Labels:** `priority:high`, `effort:medium`, `week-4`
**Assignee:** [Developer Name]
**Sprint:** Week 4

**Description:**
Create a real-time notification system for class reminders, new materials, announcements.

**Components:**

- `/src/app/student/notifications/page.tsx`
- `/src/components/student/NotificationBell.tsx`
- `/src/components/student/NotificationDropdown.tsx`
- `/src/components/student/NotificationList.tsx`

**Database Schema (NEW):**

```prisma
model UserNotification {
  id String @id @default(cuid())
  userId String
  type NotificationType
  title String
  message String
  link String? // Deep link to relevant page
  data Json? // Additional metadata
  isRead Boolean @default(false)
  readAt DateTime?
  createdAt DateTime @default(now())

  user User @relation(fields: [userId], references: [id])

  @@index([userId, isRead])
  @@index([userId, createdAt])
}

enum NotificationType {
  CLASS_REMINDER
  NEW_MATERIAL
  ASSIGNMENT_DUE
  TEST_PUBLISHED
  ANNOUNCEMENT
  ACHIEVEMENT
  PAYMENT_REMINDER
}
```

**Notification Bell:**

```typescript
function NotificationBell() {
  const { data: notifications } = useNotifications()
  const unreadCount = notifications?.filter(n => !n.isRead).length || 0

  return (
    <Popover>
      <PopoverTrigger>
        <Button variant="ghost" size="icon">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <Badge className="absolute -top-1 -right-1">{unreadCount}</Badge>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <NotificationDropdown notifications={notifications} />
      </PopoverContent>
    </Popover>
  )
}
```

**Real-time Updates:**
Option 1: Polling

```typescript
function useNotifications() {
  return useQuery({
    queryKey: ['notifications'],
    queryFn: fetchNotifications,
    refetchInterval: 30000, // Poll every 30 seconds
  })
}
```

Option 2: WebSockets (more efficient)

```typescript
// Use Pusher, Ably, or custom WebSocket
import { useChannel } from 'ably/react'

function useNotifications() {
  const [notifications, setNotifications] = useState([])

  useChannel(`user-${userId}`, (message) => {
    if (message.name === 'new-notification') {
      setNotifications((prev) => [message.data, ...prev])
    }
  })

  return notifications
}
```

**API Routes:**

**GET /api/student/notifications**

```typescript
export async function GET(request: Request) {
  const userId = await getUserFromSession(request)
  const { searchParams } = new URL(request.url)
  const limit = parseInt(searchParams.get('limit') || '20')

  const notifications = await prisma.userNotification.findMany({
    where: { userId },
    orderBy: { createdAt: 'desc' },
    take: limit,
  })

  return Response.json({ success: true, data: notifications })
}
```

**PATCH /api/student/notifications/[id]/read**

```typescript
export async function PATCH(request, { params }) {
  await prisma.userNotification.update({
    where: { id: params.id },
    data: {
      isRead: true,
      readAt: new Date(),
    },
  })

  return Response.json({ success: true })
}
```

**POST /api/student/notifications/mark-all-read**

```typescript
export async function POST(request: Request) {
  const userId = await getUserFromSession(request)

  await prisma.userNotification.updateMany({
    where: { userId, isRead: false },
    data: { isRead: true, readAt: new Date() },
  })

  return Response.json({ success: true })
}
```

**Background Job: Class Reminders**

```typescript
// Use cron job or Vercel Cron
// Runs every 15 minutes

async function sendClassReminders() {
  const upcomingClasses = await prisma.liveClass.findMany({
    where: {
      scheduledAt: {
        gte: new Date(),
        lte: new Date(Date.now() + 60 * 60 * 1000), // Next hour
      },
      isLive: false,
    },
  })

  for (const cls of upcomingClasses) {
    // Get enrolled students
    const students = await getEnrolledStudents(cls.courseId, cls.batchId)

    // Create notifications
    await prisma.userNotification.createMany({
      data: students.map((student) => ({
        userId: student.id,
        type: 'CLASS_REMINDER',
        title: 'Class starting soon!',
        message: `${cls.title} starts in 1 hour`,
        link: `/student/classes`,
      })),
    })
  }
}
```

**Acceptance Criteria:**

- Bell icon shows unread count
- Notifications load in real-time
- Mark as read works
- Deep links navigate correctly
- Background jobs create reminders

---

## Week 5-6: Enhancements

### TASK-010: Create Study Planner

**Labels:** `priority:medium`, `effort:large`, `week-5`, `week-6`

[Content similar to above, formatted as GitHub issue...]

---

### TASK-011: Build Parent Dashboard

**Labels:** `priority:medium`, `effort:large`, `week-5`, `week-6`

[Content similar to above, formatted as GitHub issue...]

---

## Week 7-8: Polish & Launch

### TASK-012: Mobile Optimization

**Labels:** `priority:critical`, `effort:medium`, `week-7`

[Content similar to above, formatted as GitHub issue...]

---

### TASK-013: Performance Optimization

**Labels:** `priority:high`, `effort:medium`, `week-7`

[Content similar to above, formatted as GitHub issue...]

---

### TASK-014: Testing Suite Implementation

**Labels:** `priority:high`, `effort:large`, `week-8`, `testing`

[Content similar to above, formatted as GitHub issue...]

---

### TASK-015: Security Audit & Hardening

**Labels:** `priority:critical`, `effort:medium`, `week-8`, `security`

[Content similar to above, formatted as GitHub issue...]

---

### TASK-016: Production Deployment

**Labels:** `priority:critical`, `effort:medium`, `week-8`, `devops`

[Content similar to above, formatted as GitHub issue...]

---

**Total Tasks:** 16 major tasks + multiple subtasks
**Estimated Effort:** 200-250 developer hours
**Timeline:** 8 weeks (1 full-time developer) or 16 weeks (part-time)

---

**Labels Reference:**

- `priority:critical` - Blocking for MVP
- `priority:high` - Important but not blocking
- `priority:medium` - Nice to have
- `priority:low` - Future enhancement
- `effort:small` - 1-4 hours
- `effort:medium` - 1-2 days
- `effort:large` - 3-5 days
- `week-1` through `week-8` - Sprint assignment
