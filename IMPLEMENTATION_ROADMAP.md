# Student Dashboard Implementation Roadmap

## Phase 1: Quick Wins (1 Week - 9-15 hours)

### Task 1.1: Connect Community Component to Real Data

**Effort:** 2-3 hours
**Priority:** HIGH
**File:** `/src/components/student/StudentCommunity.tsx`

**Current State:** Using hardcoded mock data
**Required Changes:**

1. Create API endpoints: `/api/community/posts` (GET, POST)
2. Create API endpoint: `/api/community/posts/:id/replies` (GET, POST)
3. Update component to fetch real data instead of mock
4. Add real leaderboard data from Achievement/FreeUser models

**Acceptance Criteria:**

- Posts are fetched from database
- New posts can be created
- Replies work with real data
- Leaderboard shows actual users

---

### Task 1.2: Fix Course Progress to Real Calculation

**Effort:** 4-6 hours
**Priority:** CRITICAL
**File:** `/src/components/student/MyEnrollments.tsx` (line 218)

**Current State:** Hardcoded to "15% Complete"
**Required Changes:**

1. Create API endpoint: `/api/progress/:enrollmentId`
2. Calculate progress from:
   - Materials viewed/downloaded (MaterialProgress)
   - Tests completed per chapter
   - Study sessions completed
3. Fetch real data in MyEnrollments component
4. Update progress bar with real value

**Implementation:**

```typescript
// Calculate progress as:
progress =
  ((materialsViewed / totalMaterials) * 0.3 +
    (testsCompleted / totalTests) * 0.4 +
    (studyHours / targetStudyHours) * 0.3) *
  100
```

**Acceptance Criteria:**

- Progress reflects actual student activity
- Updates when new materials are accessed
- Different for each enrollment

---

### Task 1.3: Display Gamification Data on Dashboard

**Effort:** 3-4 hours
**Priority:** HIGH
**Files:** `/src/components/dashboard/PersonalizedStudentDashboard.tsx`

**Current State:** Achievements table exists but not displayed
**Required Changes:**

1. Create API endpoint: `/api/gamification/achievements/:userId`
2. Add achievements section to dashboard
3. Display badges, points, streaks
4. Show progress to next achievement

**Implementation:**

```typescript
// New section after "Areas for Improvement"
<div className="grid md:grid-cols-3 gap-6">
  <AchievementsDisplay achievements={userAchievements} />
  <XPProgressCard currentXP={user.totalPoints} nextLevel={...} />
  <StreakWidget streakDays={user.studyStreak} />
</div>
```

**Acceptance Criteria:**

- Achievements visible on dashboard
- XP progress shown
- Current streak displayed

---

## Phase 2: Core Features (2 Weeks - 20-28 hours)

### Task 2.1: Build Study Plan Generator System

**Effort:** 8-12 hours
**Priority:** CRITICAL
**Files:** New endpoints needed

**Implementation Steps:**

#### 2.1.1: Backend API - Plan Generation

**File:** `/src/app/api/study-plans/route.ts`

```typescript
// POST /api/study-plans
{
  userId: string
  goalScore: number (target score)
  startDate: Date
  endDate: Date
  availableHours: number (per week)
}

// Returns:
{
  planId: string
  weeklySchedule: {
    monday: { topic: string, hours: 2, difficulty: 'medium' }
    ...
  }
  milestones: [
    { week: 2, targetScore: 300 }
  ]
  focusAreas: string[]
}
```

#### 2.1.2: Algorithm

1. Identify weak areas (from test attempts)
2. Calculate time needed per topic (based on difficulty)
3. Distribute across available study hours
4. Create weekly milestone targets

#### 2.1.3: Frontend UI

- Study plan display component
- Weekly schedule view
- Milestone tracking
- Plan progress indicators

**Acceptance Criteria:**

- Study plans generated based on user goals
- Weekly schedule is realistic
- Progress tracked against milestones

---

### Task 2.2: Community Feature Backend APIs

**Effort:** 6-8 hours
**Priority:** HIGH
**Files:** New API endpoints

**Endpoints to Create:**

```
POST   /api/community/posts
GET    /api/community/posts
POST   /api/community/posts/:id/replies
GET    /api/community/posts/:id/replies
POST   /api/community/posts/:id/like
POST   /api/community/posts/:id/bookmark
GET    /api/community/leaderboard
POST   /api/community/study-groups
```

**Database Operations:**

- ForumPost CRUD
- ForumReply CRUD
- Like/Bookmark tracking
- Leaderboard calculation from Achievement points

**Acceptance Criteria:**

- All endpoints functional
- Data persisted correctly
- Leaderboard reflects real rankings

---

### Task 2.3: Gamification System Implementation

**Effort:** 8-12 hours
**Priority:** HIGH
**Files:** New service + components

**Achievement Types to Implement:**

1. First Test (✅ already done)
2. Perfect Score - 100% on test
3. Topic Master - 5 tests >80% on same topic
4. Study Consistency - 7-day streak
5. Speed Demon - Complete test in <50% average time
6. Helpful Contributor - 10 helpful community posts
7. Top Performer - Rank in top 10 of leaderboard
8. Comeback Kid - Improve score by 50+ points

**Implementation:**

```typescript
// /src/lib/gamification/achievementService.ts
class AchievementService {
  async checkAchievements(userId: string, action: 'test_completed' | 'post_created' | etc)
  async awardXP(userId: string, amount: number)
  async updateStreak(userId: string)
}
```

**Acceptance Criteria:**

- Achievements unlock on correct conditions
- XP points awarded
- Streaks maintained
- UI displays progress

---

## Phase 3: Polish & Enhancement (1-2 Weeks - 15-25 hours)

### Task 3.1: Live Class Integration

**Effort:** 20-30 hours
**Priority:** MAJOR (defer if time-limited)
**Files:** New module

**Components Needed:**

1. Class scheduling system
2. Zoom/Google Meet API integration
3. Attendance tracking
4. Recording storage and playback
5. Live chat during class
6. Class notifications

**Phased Approach:**

- Phase 1: Basic class CRUD (4h)
- Phase 2: Zoom integration (8h)
- Phase 3: Recording management (6h)
- Phase 4: Attendance & notifications (6h)

---

### Task 3.2: Performance Analytics Chart Enhancements

**Effort:** 2-3 hours
**Priority:** MEDIUM
**Files:** `/src/components/analytics/*.tsx`

**Improvements:**

- Better chart rendering
- Real data validation
- Historical trend visualization
- Export functionality testing

---

### Task 3.3: AI Tutor Database Persistence

**Effort:** 2-3 hours
**Priority:** MEDIUM
**Files:** `/src/app/api/ai/tutor/route.ts`

**Changes:**

1. Save chat history to database
2. Load previous conversations
3. Personalize based on weak areas
4. Add MCP integration for NCERT content

---

## Implementation Checklist

### Phase 1 Checklist

- [ ] Community posts API (GET, POST)
- [ ] Community replies API (GET, POST)
- [ ] Course progress calculation API
- [ ] Update MyEnrollments component
- [ ] Gamification display component
- [ ] Achievements API endpoint

### Phase 2 Checklist

- [ ] Study plan generation algorithm
- [ ] Study plan API endpoints (GET, POST, PUT)
- [ ] Study plan UI component
- [ ] Milestone tracking logic
- [ ] Achievement unlock system
- [ ] XP calculation service
- [ ] Community like/bookmark APIs
- [ ] Leaderboard calculation
- [ ] Study group APIs

### Phase 3 Checklist

- [ ] Live class scheduling
- [ ] Zoom API integration
- [ ] Attendance tracking
- [ ] Recording management
- [ ] Class notifications
- [ ] Chart library implementation
- [ ] Chat history persistence
- [ ] MCP integration

---

## Testing Strategy

### Unit Tests

- Achievement unlock conditions
- Progress calculations
- Study plan generation algorithm
- XP calculations

### Integration Tests

- API endpoints with database
- Component data fetching
- User flow scenarios

### E2E Tests

- Complete study plan creation flow
- Community post and reply flow
- Achievement unlocking flow

---

## Performance Considerations

### Database Optimization

- Add indexes for frequently queried fields
- Cache leaderboard data (update hourly)
- Optimize progress calculation query

### Frontend Optimization

- Lazy load community posts
- Virtualize long lists
- Memoize expensive components

---

## Rollout Strategy

### Rollout Phase 1 (Quick Wins - Day 1-3)

- Deploy community APIs
- Enable real community data
- Add achievements display

### Rollout Phase 2 (Core Features - Day 4-10)

- Deploy study plan system
- Deploy gamification system
- Release to beta users

### Rollout Phase 3 (Live Classes - Day 11+)

- Gradual Zoom integration rollout
- Attendance tracking
- Recording system

---

## Success Metrics

### Feature Adoption

- % of users creating study plans
- % of users viewing community
- Avg achievements earned per user

### Performance

- API response time <200ms
- Page load time <2s
- Chart rendering <500ms

### User Satisfaction

- Feature completion rate >90%
- User feedback rating >4.5/5
- Bug-free operation >99%
