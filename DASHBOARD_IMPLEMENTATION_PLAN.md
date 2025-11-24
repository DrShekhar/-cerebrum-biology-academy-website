# Dashboard Implementation Plan

**Cerebrum Biology Academy CRM - Remaining Features**

## Overview

This document outlines the implementation plan for the remaining dashboard features across Counselor, Teacher, and Admin dashboards. The Student Dashboard is 100% complete with all 5 features implemented.

---

## Current Status

### ✅ Student Dashboard - 100% Complete (5/5)

1. ✅ Payment history & invoices module
2. ✅ Doubt resolution/messaging system
3. ✅ Assignment submission module
4. ✅ Certificates generation system
5. ✅ Attendance tracking feature

### 📊 Counselor Dashboard - 0% Complete (0/6)

### 👨‍🏫 Teacher Dashboard - ~20% Complete (1.2/6)

### 🔧 Admin Dashboard - 0% Complete (0/6)

---

## Priority-Based Implementation Order

### **TIER 1: Essential Features** (Must-Have for MVP)

#### 1. Teacher Dashboard: Live Class Scheduling Module ⭐⭐⭐

**Priority**: CRITICAL
**Estimated Complexity**: Medium
**Dependencies**: Attendance system (already built)

**Why First**: Teachers need to schedule sessions for the attendance system to work.

**Components**:

- Session creation form
- Calendar view for scheduling
- Recurring session support
- Meeting link integration (Zoom/Google Meet)
- Session editing and cancellation
- Student notification system

**Database**: Uses existing `class_sessions` table

**Files to Create**:

- `/src/app/teacher/sessions/page.tsx` - Main sessions management
- `/src/app/teacher/sessions/create/page.tsx` - Create session form
- `/src/app/teacher/sessions/[id]/page.tsx` - Edit session
- `/src/components/teacher/SessionCalendar.tsx`
- `/src/components/teacher/SessionForm.tsx`
- `/src/components/teacher/RecurringSessionModal.tsx`
- `/src/app/api/teacher/sessions/route.ts` - CRUD operations

---

#### 2. Teacher Dashboard: Attendance Marking Interface ⭐⭐⭐

**Priority**: CRITICAL
**Estimated Complexity**: Low
**Dependencies**: Attendance system, Class scheduling

**Why Second**: Completes the attendance workflow (student view exists, teacher marking needed).

**Components**:

- Mark attendance by session
- Bulk mark all students
- QR code scanning (future)
- Participation scoring interface
- Late/excused marking with notes
- Export attendance reports

**Database**: Uses existing `student_attendance` table

**Files to Create**:

- `/src/app/teacher/attendance/page.tsx` - Attendance overview
- `/src/app/teacher/attendance/[sessionId]/page.tsx` - Mark attendance for session
- `/src/components/teacher/AttendanceMarkingGrid.tsx`
- `/src/components/teacher/BulkAttendanceModal.tsx`
- `/src/app/api/teacher/attendance/[sessionId]/mark/route.ts`
- `/src/app/api/teacher/attendance/bulk/route.ts`

---

#### 3. Counselor Dashboard: Personal KPI Dashboard ⭐⭐⭐

**Priority**: HIGH
**Estimated Complexity**: Medium
**Dependencies**: Existing leads/tasks system

**Why Third**: Counselors need performance metrics to track their work.

**Components**:

- Personal performance metrics
- Lead conversion funnel
- Revenue attribution
- Activity timeline
- Goal tracking
- Leaderboard comparison

**Metrics to Track**:

- Total leads assigned/created
- Conversion rate (lead → demo → enrollment)
- Average response time
- Calls/meetings conducted
- Revenue generated
- Tasks completed
- Follow-up adherence rate

**Files to Create**:

- `/src/app/counselor/kpi/page.tsx` - KPI dashboard
- `/src/components/counselor/KPIMetricCard.tsx`
- `/src/components/counselor/ConversionFunnel.tsx`
- `/src/components/counselor/ActivityTimeline.tsx`
- `/src/components/counselor/RevenueChart.tsx`
- `/src/app/api/counselor/kpi/route.ts`
- `/src/app/api/counselor/kpi/leaderboard/route.ts`

---

### **TIER 2: Important Enhancements** (High Value)

#### 4. Teacher Dashboard: Assignment Creation/Grading System ⭐⭐

**Priority**: HIGH
**Estimated Complexity**: Low (70% already done)
**Dependencies**: None

**What's Missing**:

- Teacher assignment creation page
- Full assignment detail page with submissions list
- Enhanced grading interface
- Rubric-based grading
- Feedback templates

**Files to Create/Update**:

- `/src/app/teacher/assignments/create/page.tsx` - Create assignment
- `/src/app/teacher/assignments/[id]/page.tsx` - Assignment detail with submissions
- `/src/components/teacher/AssignmentCreationForm.tsx`
- `/src/components/teacher/SubmissionsTable.tsx`
- `/src/components/teacher/GradingModal.tsx`
- `/src/components/teacher/RubricBuilder.tsx`

---

#### 5. Counselor Dashboard: Lead Scoring Algorithm ⭐⭐

**Priority**: HIGH
**Estimated Complexity**: Medium
**Dependencies**: Leads system

**Scoring Factors**:

- Engagement level (calls answered, messages replied)
- Demo attendance
- Budget indicators
- Timeline urgency
- Course interest alignment
- Referral source quality
- Parent involvement

**Features**:

- Automatic score calculation
- Manual score adjustment
- Score decay over time
- Priority tagging (Hot/Warm/Cold)
- Smart lead routing

**Files to Create**:

- `/src/lib/leadScoring/scoringEngine.ts` - Core algorithm
- `/src/lib/leadScoring/scoringRules.ts` - Configurable rules
- `/src/app/api/leads/[id]/score/route.ts`
- `/src/components/counselor/LeadScoreIndicator.tsx`
- `/src/components/counselor/ScoreBreakdownModal.tsx`

---

#### 6. Teacher Dashboard: Question Bank Access Interface ⭐⭐

**Priority**: MEDIUM
**Estimated Complexity**: Medium
**Dependencies**: Existing questions table

**Features**:

- Browse questions by subject/chapter/difficulty
- Advanced filters (type, marks, tags)
- Search functionality
- Question preview
- Add to test/assignment
- Favorite questions
- Recent questions

**Files to Create**:

- `/src/app/teacher/question-bank/page.tsx`
- `/src/components/teacher/QuestionBrowser.tsx`
- `/src/components/teacher/QuestionFilters.tsx`
- `/src/components/teacher/QuestionCard.tsx`
- `/src/components/teacher/QuestionPreviewModal.tsx`
- `/src/app/api/teacher/questions/route.ts`

---

### **TIER 3: Advanced Features** (Nice to Have)

#### 7. Counselor Dashboard: AI Recommendations Engine ⭐

**Priority**: MEDIUM
**Estimated Complexity**: High
**Dependencies**: Lead scoring, activity history

**Recommendations**:

- Best time to call leads
- Next best action suggestions
- Lead prioritization
- Upsell opportunities
- At-risk student identification
- Follow-up reminders
- Message templates

**Files to Create**:

- `/src/lib/ai/recommendationsEngine.ts`
- `/src/components/counselor/AIRecommendationsWidget.tsx`
- `/src/components/counselor/NextBestActionCard.tsx`
- `/src/app/api/counselor/recommendations/route.ts`

---

#### 8. Teacher Dashboard: Test Creation Tools ⭐

**Priority**: MEDIUM
**Estimated Complexity**: High
**Dependencies**: Question bank

**Features**:

- Custom test builder
- Auto-generate from question bank
- Section-wise organization
- Time limits per section
- Negative marking configuration
- Answer key generation
- Test templates
- Preview mode

**Files to Create**:

- `/src/app/teacher/tests/create/page.tsx`
- `/src/components/teacher/TestBuilder.tsx`
- `/src/components/teacher/QuestionSelector.tsx`
- `/src/components/teacher/TestConfigForm.tsx`
- `/src/components/teacher/TestPreview.tsx`

---

#### 9. Teacher Dashboard: Student Messaging Feature ⭐

**Priority**: MEDIUM
**Estimated Complexity**: Medium
**Dependencies**: None

**Features**:

- Direct messaging with students
- Bulk messaging to class/batch
- Announcements
- Read receipts
- File attachments
- Message templates
- Parent CC option

**Files to Create**:

- `/src/app/teacher/messages/page.tsx`
- `/src/components/teacher/MessageComposer.tsx`
- `/src/components/teacher/StudentSelector.tsx`
- `/src/components/teacher/MessageThread.tsx`
- `/src/app/api/teacher/messages/route.ts`

---

#### 10. Counselor Dashboard: Mobile Optimization ⭐

**Priority**: LOW
**Estimated Complexity**: Low
**Dependencies**: None

**Tasks**:

- Responsive design improvements
- Touch-friendly interfaces
- Mobile-specific navigation
- Offline mode support
- PWA configuration
- Mobile notifications

**Files to Update**:

- All counselor dashboard components
- Layout files
- Navigation components

---

#### 11. Counselor Dashboard: Team Collaboration ⭐

**Priority**: LOW
**Estimated Complexity**: Medium
**Dependencies**: None

**Features**:

- Shared lead pool
- Lead transfer functionality
- Internal chat/comments
- Team announcements
- Shared tasks
- Handoff notes

**Files to Create**:

- `/src/components/counselor/LeadTransferModal.tsx`
- `/src/components/counselor/TeamChat.tsx`
- `/src/components/counselor/HandoffNotes.tsx`
- `/src/app/api/counselor/team/route.ts`

---

#### 12. Counselor Dashboard: Calendar Sync ⭐

**Priority**: LOW
**Estimated Complexity**: High
**Dependencies**: Third-party APIs

**Features**:

- Google Calendar integration
- Outlook Calendar integration
- Two-way sync
- Meeting scheduling
- Automatic reminders
- Conflict detection

**Files to Create**:

- `/src/lib/calendar/googleCalendar.ts`
- `/src/lib/calendar/outlookCalendar.ts`
- `/src/components/counselor/CalendarSyncSettings.tsx`
- `/src/app/api/calendar/sync/route.ts`

---

## Admin Dashboard Features (Not Prioritized Yet)

1. **Staff Management Module** - CRUD for all user types
2. **Custom Report Builder** - Dynamic report generation
3. **Advanced User Segmentation** - Cohort analysis
4. **Support Ticket System** - Internal helpdesk
5. **Marketing Campaign Management** - Email/SMS campaigns
6. **API/Webhook Management** - Integrations dashboard

---

## Recommended Implementation Sequence

### Phase 1: Complete Core Teacher Features (1-2 days)

1. Live class scheduling module
2. Attendance marking interface
3. Complete assignment creation/grading

### Phase 2: Counselor Performance Tools (1 day)

4. Personal KPI dashboard
5. Lead scoring algorithm

### Phase 3: Content Management (1 day)

6. Question bank access interface
7. Test creation tools (if time permits)

### Phase 4: Advanced Features (Future)

8. AI recommendations engine
9. Student messaging
10. Mobile optimization
11. Team collaboration
12. Calendar sync

---

## Technical Considerations

### Database

- Most features use existing tables
- Some may require new fields (migrations needed)
- Lead scoring needs a new `lead_scores` table

### APIs

- Teacher attendance marking: POST `/api/teacher/attendance/[sessionId]/mark`
- KPI metrics: GET `/api/counselor/kpi`
- Lead scoring: POST `/api/leads/[id]/calculate-score`

### Components

- Reuse existing UI components (Card, Button, Badge, etc.)
- Create shared widgets for common patterns
- Maintain consistent styling

### Performance

- Optimize database queries with proper indexes
- Implement caching for KPI calculations
- Use pagination for large lists
- Lazy load heavy components

---

## Success Metrics

### Teacher Dashboard Completion

- ✅ Can schedule and manage class sessions
- ✅ Can mark attendance for sessions
- ✅ Can create, assign, and grade assignments
- ✅ Can browse and use question bank
- ✅ Can create custom tests

### Counselor Dashboard Completion

- ✅ Can view personal performance metrics
- ✅ Leads are auto-scored with priority
- ✅ Receives smart recommendations
- ✅ Can collaborate with team
- ✅ Calendar is synced with external tools

---

## Next Steps

**Immediate Action**: Start with **Teacher Dashboard: Live Class Scheduling Module** as it's critical for the attendance system and has no complex dependencies.

**After That**: Complete **Teacher Attendance Marking** to close the attendance workflow loop.

**Then**: Build **Counselor KPI Dashboard** to provide value to counselors immediately.

---

**Version**: 1.0.0
**Last Updated**: November 2025
**Author**: CRM Development Team
