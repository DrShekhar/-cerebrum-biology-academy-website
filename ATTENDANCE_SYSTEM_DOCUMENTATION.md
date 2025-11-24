# Attendance Tracking System Documentation

## Overview

The Attendance Tracking System is a comprehensive module for tracking student attendance in class sessions. It provides detailed statistics, attendance records, and upcoming session management for students, with teacher and admin interfaces for marking and managing attendance.

---

## Features

### Student Features

- ✅ **Attendance Dashboard** - View attendance records, statistics, and insights
- ✅ **Attendance Statistics** - Comprehensive metrics including percentage, streaks, trends
- ✅ **Upcoming Sessions** - View scheduled class sessions with meeting links
- ✅ **Attendance History** - Detailed records with filters and search
- ✅ **Monthly Breakdown** - Month-wise attendance summary
- ✅ **Warning System** - Automatic warnings for low attendance
- ✅ **Participation Tracking** - Teacher-rated participation scores

### Admin/Teacher Features (Foundation Ready)

- 📋 **Class Session Management** - Create, schedule, and manage sessions
- 📋 **Attendance Marking** - Mark attendance with multiple statuses
- 📋 **Bulk Operations** - Mark attendance for entire class
- 📋 **Reports** - Generate attendance reports and analytics
- 📋 **Settings** - Configure attendance rules and thresholds

---

## Database Schema

### Tables Created

#### 1. `class_sessions`

Stores information about scheduled class sessions.

**Key Fields:**

- `id` - Unique session identifier
- `courseId` - Associated course
- `enrollmentId` - Optional specific enrollment
- `title` - Session title
- `sessionType` - Type: REGULAR, DOUBT_CLEARING, REVISION, TEST, etc.
- `scheduledDate` - Session date
- `startTime`, `endTime` - Session timing
- `duration` - Duration in minutes
- `teacherId` - Teacher conducting the session
- `meetingLink` - Online meeting link (for virtual classes)
- `status` - SCHEDULED, ONGOING, COMPLETED, CANCELLED, RESCHEDULED
- `attendanceMarked` - Whether attendance has been marked
- `totalStudents`, `presentCount`, `absentCount`, `lateCount` - Statistics
- `recordingUrl` - Link to session recording
- `topic`, `chapter` - Session content details

**Indexes:**

- `courseId, scheduledDate`
- `teacherId, scheduledDate`
- `status, scheduledDate`

#### 2. `student_attendance`

Stores individual student attendance records.

**Key Fields:**

- `id` - Unique attendance record ID
- `sessionId` - Related class session
- `studentId` - Student user ID
- `enrollmentId` - Related enrollment
- `status` - PRESENT, ABSENT, LATE, EXCUSED, HALF_DAY
- `markedAt` - When attendance was marked
- `markedBy` - Who marked the attendance (teacher/admin)
- `checkInTime`, `checkOutTime` - Actual attendance time
- `duration` - Minutes attended
- `isLate`, `lateBy` - Late arrival tracking
- `notes` - Teacher notes (e.g., "sick", "excused")
- `isExcused` - Whether absence is excused
- `participationScore` - 0-10 rating of participation
- `deviceInfo`, `ipAddress`, `location` - Check-in metadata

**Constraints:**

- Unique constraint on `[sessionId, studentId]` (one record per session per student)

**Indexes:**

- `sessionId, status`
- `studentId, status`
- `status, markedAt`

#### 3. `attendance_settings`

Configuration for attendance rules and policies.

**Key Fields:**

- `courseId` OR `enrollmentId` - Settings scope
- `autoMarkAbsent` - Auto-mark students as absent
- `autoMarkAfterMinutes` - Minutes after which to auto-mark
- `lateThresholdMinutes` - Minutes late before marking as LATE
- `minAttendancePercentage` - Minimum required attendance (default: 75%)
- `allowSelfCheckIn` - Students can check in themselves
- `requireLocation` - Require location for check-in
- `allowedLocations` - Geofencing coordinates (JSON)
- `sendAbsentNotifications` - Notify on absence
- `sendLateNotifications` - Notify on late arrival
- `parentNotifications` - Notify parents

**Enums:**

```typescript
enum AttendanceStatus {
  PRESENT
  ABSENT
  LATE
  EXCUSED
  HALF_DAY
}

enum SessionType {
  REGULAR
  DOUBT_CLEARING
  REVISION
  TEST
  PRACTICAL
  WORKSHOP
  SEMINAR
  GUEST_LECTURE
  EXTRA_CLASS
}

enum SessionStatus {
  SCHEDULED
  ONGOING
  COMPLETED
  CANCELLED
  RESCHEDULED
}
```

---

## API Endpoints

### Student APIs

#### GET `/api/student/attendance`

Fetch student's attendance records.

**Query Parameters:**

- `status` - Filter by status (PRESENT, ABSENT, LATE, EXCUSED, HALF_DAY, ALL)
- `sessionType` - Filter by session type
- `dateFrom` - Start date filter
- `dateTo` - End date filter
- `courseId` - Filter by course

**Response:**

```typescript
{
  success: true,
  data: {
    attendance: StudentAttendance[],
    statistics: {
      totalSessions: number,
      present: number,
      absent: number,
      late: number,
      excused: number,
      attendancePercentage: number
    }
  }
}
```

#### GET `/api/student/attendance/statistics`

Fetch detailed attendance statistics.

**Query Parameters:**

- `courseId` - Filter by course
- `enrollmentId` - Filter by enrollment

**Response:**

```typescript
{
  success: true,
  data: {
    statistics: {
      totalSessions: number,
      attendedSessions: number,
      absentSessions: number,
      lateSessions: number,
      excusedSessions: number,
      attendancePercentage: number,
      onTimePercentage: number,
      averageParticipationScore: number | null,
      totalHoursAttended: number,
      currentStreak: number,
      longestStreak: number,
      recentTrend: 'improving' | 'declining' | 'stable',
      warningLevel: 'none' | 'low' | 'medium' | 'high'
    },
    monthlyBreakdown: Array<{
      month: string,
      year: number,
      totalSessions: number,
      present: number,
      absent: number,
      late: number,
      excused: number,
      percentage: number
    }>
  }
}
```

#### GET `/api/student/sessions`

Fetch class sessions (upcoming/past/today).

**Query Parameters:**

- `type` - Session type: `upcoming`, `past`, `today`
- `courseId` - Filter by course

**Response:**

```typescript
{
  success: true,
  data: {
    sessions: ClassSession[],
    upcoming: ClassSession[], // Next 5 sessions
    today: ClassSession[]     // Today's sessions
  }
}
```

---

## Components

### Student Components

#### 1. `AttendanceStatusBadge.tsx`

Displays attendance status with color-coded badges.

**Props:**

```typescript
{
  status: AttendanceStatus
  className?: string
  showIcon?: boolean
  size?: 'sm' | 'md' | 'lg'
}
```

**Status Colors:**

- PRESENT: Green
- ABSENT: Red
- LATE: Orange
- EXCUSED: Blue
- HALF_DAY: Yellow

#### 2. `AttendanceStatisticsWidget.tsx`

Comprehensive attendance statistics widget with visual metrics.

**Props:**

```typescript
{
  className?: string
  courseId?: string
  enrollmentId?: string
}
```

**Features:**

- Main attendance percentage with trend indicator
- Warning/success messages based on attendance level
- Key statistics cards (total, attended, late, streak)
- Additional metrics (on-time rate, hours attended, participation)

**Warning Levels:**

- **High** (< 65%): Critical warning in red
- **Medium** (65-74%): Warning in orange
- **Low** (75-84%): Caution in yellow
- **None** (≥ 85%): Success in green

#### 3. `UpcomingSessionsWidget.tsx`

Displays upcoming class sessions with meeting links.

**Props:**

```typescript
{
  className?: string
  maxItems?: number
  showViewAll?: boolean
}
```

**Features:**

- Shows next 3-5 upcoming sessions
- "Today" badge for sessions scheduled today
- Time until session counter
- Quick access to meeting links
- Session details (topic, location, time)

#### 4. `AttendancePage.tsx` (`/student/attendance`)

Main attendance tracking page with full features.

**Features:**

- Statistics overview
- Upcoming sessions sidebar
- Attendance records list
- Filter options (status, session type, date range)
- Detailed session information
- Participation scores
- Teacher notes

---

## Type Definitions

Located in `/src/types/attendance.ts`:

```typescript
export interface ClassSession {
  id: string
  courseId: string
  title: string
  sessionType: SessionType
  scheduledDate: Date | string
  startTime: Date | string
  endTime: Date | string
  duration: number
  status: SessionStatus
  meetingLink?: string | null
  course?: { id: string; name: string }
  teacher?: { id: string; name: string }
  attendance?: StudentAttendance[]
}

export interface StudentAttendance {
  id: string
  sessionId: string
  studentId: string
  status: AttendanceStatus
  markedAt: Date | string
  checkInTime?: Date | string | null
  isLate: boolean
  lateBy?: number | null
  notes?: string | null
  participationScore?: number | null
  session?: ClassSession
}

export interface AttendanceStatistics {
  totalSessions: number
  attendedSessions: number
  attendancePercentage: number
  onTimePercentage: number
  currentStreak: number
  longestStreak: number
  recentTrend: 'improving' | 'declining' | 'stable'
  warningLevel: 'none' | 'low' | 'medium' | 'high'
}
```

---

## Usage Examples

### Display Attendance Statistics

```tsx
import { AttendanceStatisticsWidget } from '@/components/student/AttendanceStatisticsWidget'

export function StudentDashboard() {
  return (
    <div>
      <AttendanceStatisticsWidget />
    </div>
  )
}
```

### Show Upcoming Sessions

```tsx
import { UpcomingSessionsWidget } from '@/components/student/UpcomingSessionsWidget'

export function Dashboard() {
  return <UpcomingSessionsWidget maxItems={5} showViewAll={true} />
}
```

### Display Attendance Status

```tsx
import { AttendanceStatusBadge } from '@/components/student/AttendanceStatusBadge'

export function AttendanceRecord({ status }) {
  return <AttendanceStatusBadge status={status} size="md" showIcon={true} />
}
```

---

## Statistics Calculations

### Attendance Percentage

```
Attendance % = ((Present + Late + Half Day) / Total Sessions) × 100
```

### On-Time Percentage

```
On-Time % = (Present / Total Sessions) × 100
```

### Current Streak

Number of consecutive days with PRESENT or LATE status, excluding EXCUSED.

### Longest Streak

Maximum consecutive days with PRESENT or LATE status in the entire attendance history.

### Recent Trend

Compares recent 5 sessions to previous 5 sessions:

- **Improving**: Recent attendance > Previous + 10%
- **Declining**: Recent attendance < Previous - 10%
- **Stable**: Within ±10%

### Warning Levels

Based on attendance percentage:

- **None**: ≥ 85%
- **Low**: 75-84%
- **Medium**: 65-74%
- **High**: < 65%

---

## Future Enhancements

### Phase 2 (Teacher Dashboard)

- [ ] Mark attendance interface
- [ ] Bulk attendance marking
- [ ] Generate attendance reports
- [ ] Export to Excel/CSV
- [ ] Attendance analytics dashboard

### Phase 3 (Admin Dashboard)

- [ ] Create/schedule class sessions
- [ ] Manage attendance settings
- [ ] Configure auto-marking rules
- [ ] Set up geofencing
- [ ] Parent notification system

### Phase 4 (Advanced Features)

- [ ] QR code based check-in
- [ ] Face recognition attendance
- [ ] Biometric integration
- [ ] Real-time attendance tracking
- [ ] Mobile app integration
- [ ] WhatsApp attendance notifications
- [ ] Parent portal access

---

## Migration Instructions

To apply the attendance system to your database:

```bash
# Generate Prisma client
npx prisma generate

# Create migration
npx prisma migrate dev --name add_attendance_system

# Apply migration to production
npx prisma migrate deploy
```

---

## Testing

### Manual Testing Checklist

**Student Dashboard:**

- [ ] View attendance statistics
- [ ] Check attendance percentage calculation
- [ ] Verify warning levels display correctly
- [ ] View upcoming sessions
- [ ] Click meeting links
- [ ] Filter attendance records
- [ ] Check monthly breakdown

**API Testing:**

- [ ] Fetch attendance with filters
- [ ] Fetch statistics
- [ ] Fetch sessions (upcoming/past/today)
- [ ] Test authentication and authorization
- [ ] Verify error handling

---

## File Structure

```
src/
├── app/
│   ├── api/
│   │   └── student/
│   │       ├── attendance/
│   │       │   ├── route.ts
│   │       │   └── statistics/
│   │       │       └── route.ts
│   │       └── sessions/
│   │           └── route.ts
│   └── student/
│       └── attendance/
│           └── page.tsx
├── components/
│   └── student/
│       ├── AttendanceStatusBadge.tsx
│       ├── AttendanceStatisticsWidget.tsx
│       └── UpcomingSessionsWidget.tsx
└── types/
    └── attendance.ts

prisma/
└── schema.prisma (updated with attendance tables)
```

---

## Support and Maintenance

For issues or feature requests related to the Attendance System, please contact the development team or create an issue in the project repository.

**Version:** 1.0.0
**Last Updated:** November 2025
**Author:** CRM Development Team
