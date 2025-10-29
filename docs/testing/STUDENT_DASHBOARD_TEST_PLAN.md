# Student Dashboard - Comprehensive Test Plan

**Project:** Cerebrum Biology Academy - Student Dashboard
**Version:** 1.0
**Date:** 2025-10-29
**Status:** Production-Ready Testing Strategy
**Owner:** QA Engineering Team

---

## Executive Summary

This document outlines a comprehensive testing strategy for the Student Dashboard main page to ensure it is production-ready, bug-free, and provides an exceptional user experience. The dashboard is a critical component that students interact with daily, making reliability and performance paramount.

### Testing Scope

- **Component Under Test:** `/src/components/dashboard/PersonalizedStudentDashboard.tsx`
- **API Endpoints:** `/api/test-attempts`, `/api/test-sessions`, `/api/analytics/performance`
- **User Flows:** First-time user, returning user, high-performer, struggling student
- **Platforms:** Web (Desktop, Tablet, Mobile), All major browsers
- **Test Types:** Unit, Integration, E2E, Performance, Accessibility, Security

### Success Metrics

- 80%+ code coverage
- All critical E2E tests passing
- 0 critical bugs, <5 high-priority bugs
- Lighthouse score >85 (Performance, Accessibility, Best Practices, SEO)
- Load time <3s on 3G network
- Support for 1000+ concurrent users

---

## 1. Unit Testing Strategy

### 1.1 Components to Test

#### 1.1.1 Welcome Header Component

**File:** Extracted from PersonalizedStudentDashboard
**Test Cases:**

- Renders user name correctly when authenticated
- Shows "Student" as fallback when name not available
- Displays current score and rank
- Shows notification bell with correct styling
- Settings button renders and is clickable

#### 1.1.2 NEET Score Prediction Card

**Test Cases:**

- Displays current score out of 720
- Shows target score (540/720)
- Calculates progress percentage correctly
- Shows improvement indicator (arrow up/down)
- Progress bar width matches percentage
- Handles edge cases: 0 score, max score, negative improvement

#### 1.1.3 Quick Stats Cards (4 cards)

**Test Cases:**

- Total Study Time card calculates hours correctly
- Average Score card shows percentage with improvement delta
- Tests Completed card counts sessions accurately
- National Rank card displays rank and percentile
- All icons render correctly
- Responsive layout on mobile (stacks vertically)

#### 1.1.4 Strong/Weak Areas Sections

**Test Cases:**

- Strong areas list renders with checkmarks
- Weak areas show difficulty badges (low/medium/high)
- Recommended study time calculated correctly
- "Start Practice" button triggers session start
- Empty state when no data available
- Limits to top 3-5 items

#### 1.1.5 Recent Activity Feed

**Test Cases:**

- Sessions sorted by date (most recent first)
- Correct icon for session type (study/practice/test)
- Duration converted to minutes correctly
- Score displayed with percentage
- Date formatted in readable format
- Empty state for new users

#### 1.1.6 Study Timer Component

**Test Cases:**

- Timer starts at 00:00:00
- Timer increments every second when playing
- Pause button stops timer without resetting
- Stop button resets timer to zero
- Time format displays correctly (HH:MM:SS)
- Current session name displays
- Buttons disabled/enabled based on state

#### 1.1.7 Navigation Tabs

**Test Cases:**

- All 6 tabs render correctly
- Active tab highlighted with blue border
- Tab switch updates content (AnimatePresence)
- Icons display next to labels
- Mobile: tabs scroll horizontally or collapse

#### 1.1.8 Loading Skeleton

**Test Cases:**

- Shows pulsing brain icon
- "Loading your dashboard data..." text visible
- Displays while isLoading is true
- Transitions smoothly to content

#### 1.1.9 Empty State (No Tests Taken)

**Test Cases:**

- Shows target icon and welcome message
- Displays two CTA buttons (Take Test, Browse Questions)
- Links direct to correct pages
- Responsive layout on mobile
- Triggers when recentSessions.length === 0

### 1.2 Utility Functions

#### formatTime(seconds)

```typescript
describe('formatTime', () => {
  it('formats 0 seconds as 00:00:00', () => {
    expect(formatTime(0)).toBe('00:00:00')
  })

  it('formats 61 seconds as 00:01:01', () => {
    expect(formatTime(61)).toBe('00:01:01')
  })

  it('formats 3661 seconds as 01:01:01', () => {
    expect(formatTime(3661)).toBe('01:01:01')
  })

  it('handles large values (10 hours)', () => {
    expect(formatTime(36000)).toBe('10:00:00')
  })
})
```

#### Data Transformation Logic

**Test Cases:**

- Test attempts correctly mapped to study sessions
- Scores aggregated and averaged correctly
- Strong/weak areas extracted from attempts
- Null/undefined values handled gracefully
- Empty arrays don't crash component

### 1.3 State Management

**Test Cases:**

- `activeTab` state switches correctly
- `studyTimer` increments properly
- `isStudying` toggles on play/pause
- `currentSession` updates when starting session
- `isLoading` transitions to false after fetch
- `freeUserId` generated and stored in localStorage
- `neetProgress` updates when data fetched
- `recentSessions` populated from API

### 1.4 Side Effects (useEffect hooks)

#### freeUserId Generation

```typescript
it('generates freeUserId for guest users', () => {
  const { result } = renderHook(() => useAuth())
  result.current.isAuthenticated = false

  // Trigger useEffect
  act(() => {
    // Component mounts
  })

  const storedId = localStorage.getItem('freeUserId')
  expect(storedId).toMatch(/^free_\d+_[a-z0-9]+$/)
})
```

#### Data Fetching

```typescript
it('fetches test attempts on mount', async () => {
  global.fetch = jest.fn().mockResolvedValue({
    json: async () => ({ success: true, data: { attempts: [] } })
  })

  render(<PersonalizedStudentDashboard />)

  await waitFor(() => {
    expect(fetch).toHaveBeenCalledWith('/api/test-attempts?freeUserId=...')
  })
})
```

#### Study Timer Interval

```typescript
it('increments timer every second when studying', () => {
  jest.useFakeTimers()
  const { getByText } = render(<PersonalizedStudentDashboard />)

  fireEvent.click(getByText('Start'))

  act(() => {
    jest.advanceTimersByTime(3000)
  })

  expect(getByText('00:00:03')).toBeInTheDocument()

  jest.useRealTimers()
})
```

### 1.5 Mock Strategy

#### API Mocks

```typescript
// Mock successful response
const mockTestAttemptsSuccess = {
  success: true,
  data: {
    attempts: [
      {
        id: 'attempt-1',
        score: 450,
        percentage: 75,
        timeSpent: 3600,
        strengthAreas: ['Cell Biology', 'Genetics'],
        weaknessAreas: ['Ecology', 'Evolution'],
        testTemplate: {
          title: 'NEET Mock Test 1',
          type: 'MOCK_TEST',
        },
        createdAt: '2025-10-28T10:00:00Z',
      },
    ],
  },
}

// Mock error response
const mockTestAttemptsError = {
  success: false,
  error: 'Failed to fetch test attempts',
}

// Mock empty response
const mockTestAttemptsEmpty = {
  success: true,
  data: { attempts: [] },
}
```

#### Auth Mock

```typescript
jest.mock('@/hooks/useAuth', () => ({
  useAuth: jest.fn(() => ({
    user: {
      id: 'user-123',
      name: 'John Doe',
      email: 'john@example.com',
    },
    isAuthenticated: true,
  })),
}))
```

#### Framer Motion Mock (avoid animation delays)

```typescript
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children }) => <div>{children}</div>
  },
  AnimatePresence: ({ children }) => <>{children}</>
}))
```

---

## 2. Integration Testing Strategy

### 2.1 User Journey: First-Time User

**Scenario:** New student lands on dashboard after signup
**Expected Behavior:** Empty state with onboarding prompts

**Test Flow:**

```typescript
describe('First-time user journey', () => {
  it('shows empty state when no tests taken', async () => {
    // Mock empty API response
    mockFetch('/api/test-attempts', { attempts: [] })
    mockFetch('/api/test-sessions', { sessions: [] })

    const { getByText } = render(<PersonalizedStudentDashboard />)

    // Wait for loading to complete
    await waitFor(() => {
      expect(getByText('Ready to Start Your Journey?')).toBeInTheDocument()
    })

    // Verify CTAs present
    expect(getByText('Take Your First Test')).toBeInTheDocument()
    expect(getByText('Browse Practice Questions')).toBeInTheDocument()
  })

  it('navigates to mock tests when CTA clicked', async () => {
    const { getByText } = render(<PersonalizedStudentDashboard />)

    await waitFor(() => {
      expect(getByText('Take Your First Test')).toBeInTheDocument()
    })

    fireEvent.click(getByText('Take Your First Test'))

    expect(window.location.href).toContain('/mock-tests')
  })
})
```

### 2.2 User Journey: Returning User

**Scenario:** Student with 10+ test attempts
**Expected Behavior:** Full dashboard with data

**Test Flow:**

```typescript
describe('Returning user journey', () => {
  beforeEach(() => {
    mockFetch('/api/test-attempts', mockDataReturningUser)
  })

  it('displays full dashboard with stats', async () => {
    const { getByText } = render(<PersonalizedStudentDashboard />)

    await waitFor(() => {
      expect(getByText('Welcome back, John Doe!')).toBeInTheDocument()
    })

    // Verify stats cards
    expect(getByText('Total Study Time')).toBeInTheDocument()
    expect(getByText('15h')).toBeInTheDocument()

    // Verify score prediction
    expect(getByText('450/720')).toBeInTheDocument()
  })

  it('shows recent activity feed', async () => {
    const { getAllByText } = render(<PersonalizedStudentDashboard />)

    await waitFor(() => {
      const sessions = getAllByText(/NEET Mock Test/)
      expect(sessions).toHaveLength(5) // Shows last 5
    })
  })
})
```

### 2.3 User Journey: High-Performing Student

**Scenario:** Student with 85%+ average score
**Expected Behavior:** Motivational messages, achievements highlighted

**Test Flow:**

```typescript
describe('High-performing student', () => {
  it('displays achievements and strong areas prominently', async () => {
    mockFetch('/api/test-attempts', mockDataHighPerformer)

    const { getByText } = render(<PersonalizedStudentDashboard />)

    await waitFor(() => {
      expect(getByText('Strong Areas')).toBeInTheDocument()
    })

    // Verify strong areas
    expect(getByText('Cell Biology')).toBeInTheDocument()
    expect(getByText('85%+')).toBeInTheDocument()

    // Verify positive improvement
    expect(getByText(/\+25 from last test/)).toBeInTheDocument()
  })
})
```

### 2.4 User Journey: Struggling Student

**Scenario:** Student with <50% average score
**Expected Behavior:** Supportive messaging, weak areas emphasized

**Test Flow:**

```typescript
describe('Struggling student', () => {
  it('emphasizes areas for improvement with support', async () => {
    mockFetch('/api/test-attempts', mockDataStrugglingStudent)

    const { getByText, getAllByText } = render(<PersonalizedStudentDashboard />)

    await waitFor(() => {
      expect(getByText('Areas for Improvement')).toBeInTheDocument()
    })

    // Verify weak areas
    const weakAreas = getAllByText(/Recommended: \d+ min\/day/)
    expect(weakAreas.length).toBeGreaterThan(0)

    // Verify start practice buttons
    const startButtons = getAllByText('Start Practice →')
    expect(startButtons.length).toBeGreaterThan(0)
  })
})
```

### 2.5 API Integration Tests

#### Test Attempts API

```typescript
describe('/api/test-attempts', () => {
  it('returns test attempts for authenticated user', async () => {
    const response = await fetch('/api/test-attempts?freeUserId=user-123')
    const data = await response.json()

    expect(response.status).toBe(200)
    expect(data.success).toBe(true)
    expect(Array.isArray(data.data.attempts)).toBe(true)
  })

  it('handles missing userId parameter', async () => {
    const response = await fetch('/api/test-attempts')
    expect(response.status).toBe(400)
  })

  it('handles database errors gracefully', async () => {
    // Simulate DB failure
    mockPrismaError()

    const response = await fetch('/api/test-attempts?freeUserId=user-123')
    const data = await response.json()

    expect(response.status).toBe(500)
    expect(data.success).toBe(false)
    expect(data.error).toBeDefined()
  })
})
```

#### Test Sessions API

```typescript
describe('/api/test-sessions', () => {
  it('returns paginated results', async () => {
    const response = await fetch('/api/test-sessions?freeUserId=user-123&limit=10')
    const data = await response.json()

    expect(data.data.sessions.length).toBeLessThanOrEqual(10)
  })

  it('filters by date range', async () => {
    const startDate = '2025-10-01'
    const endDate = '2025-10-31'
    const response = await fetch(
      `/api/test-sessions?freeUserId=user-123&startDate=${startDate}&endDate=${endDate}`
    )
    const data = await response.json()

    data.data.sessions.forEach((session) => {
      expect(new Date(session.createdAt)).toBeGreaterThanOrEqual(new Date(startDate))
      expect(new Date(session.createdAt)).toBeLessThanOrEqual(new Date(endDate))
    })
  })
})
```

### 2.6 Error Handling Integration

**Test Cases:**

- Network offline: Show retry button
- API timeout (>30s): Show timeout message
- 500 server error: Show generic error message
- 404 not found: Redirect or show not found state
- Invalid JSON response: Handle parsing error
- Partial data (some fields missing): Use fallback values

---

## 3. End-to-End (E2E) Testing Strategy

### 3.1 Test Environment Setup

**Tools:** Playwright
**Configuration:** Already set up in `playwright.config.ts`
**Test Location:** `/tests/e2e/student-dashboard/`

### 3.2 Critical User Paths

#### Path 1: Student Login to Dashboard

```typescript
// tests/e2e/student-dashboard/login-to-dashboard.spec.ts
import { test, expect } from '@playwright/test'

test.describe('Student Login to Dashboard', () => {
  test('complete login flow and view dashboard', async ({ page }) => {
    // 1. Navigate to login
    await page.goto('/login')

    // 2. Enter credentials
    await page.fill('input[name="email"]', 'student@test.com')
    await page.fill('input[name="password"]', 'password123')

    // 3. Submit form
    await page.click('button[type="submit"]')

    // 4. Verify redirect to dashboard
    await expect(page).toHaveURL(/\/student\/dashboard/)

    // 5. Verify dashboard loads
    await expect(page.locator('text=Welcome back')).toBeVisible()

    // 6. Verify user name displayed
    await expect(page.locator('text=John Doe')).toBeVisible()

    // 7. Verify stats cards populated
    await expect(page.locator('text=Total Study Time')).toBeVisible()
    await expect(page.locator('text=Average Score')).toBeVisible()
    await expect(page.locator('text=Tests Completed')).toBeVisible()
    await expect(page.locator('text=National Rank')).toBeVisible()
  })

  test('handles unauthenticated access', async ({ page }) => {
    await page.goto('/student/dashboard')

    // Should redirect to login
    await expect(page).toHaveURL(/\/login/)
  })
})
```

#### Path 2: Take Action from Dashboard

```typescript
test.describe('Dashboard Actions', () => {
  test.beforeEach(async ({ page }) => {
    // Login first
    await page.goto('/login')
    await page.fill('input[name="email"]', 'student@test.com')
    await page.fill('input[name="password"]', 'password123')
    await page.click('button[type="submit"]')
    await page.waitForURL(/\/student\/dashboard/)
  })

  test('click "Take Practice Test" redirects correctly', async ({ page }) => {
    await page.click('a[href="/mock-tests"]')
    await expect(page).toHaveURL(/\/mock-tests/)
  })

  test('click weak area "Start Practice" button', async ({ page }) => {
    await page.click('button:has-text("Start Practice →")')

    // Should start study session (timer visible)
    await expect(page.locator('text=Focus Study Session')).toBeVisible()
  })

  test('switch between tabs', async ({ page }) => {
    // Click Progress Tracking tab
    await page.click('button:has-text("Progress Tracking")')
    await expect(page.locator('[data-tab="progress"]')).toBeVisible()

    // Click Study Session tab
    await page.click('button:has-text("Study Session")')
    await expect(page.locator('text=Focus Study Session')).toBeVisible()
  })
})
```

#### Path 3: Study Timer Interaction

```typescript
test.describe('Study Timer', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/student/dashboard')
    await page.click('button:has-text("Study Session")')
  })

  test('start, pause, and stop timer', async ({ page }) => {
    // Start timer
    await page.click('button:has-text("Start")')

    // Wait 3 seconds
    await page.waitForTimeout(3000)

    // Timer should show 00:00:03
    await expect(page.locator('text=00:00:03')).toBeVisible()

    // Pause timer
    await page.click('button:has-text("Pause")')

    // Wait 2 more seconds
    await page.waitForTimeout(2000)

    // Timer should still show 00:00:03 (paused)
    await expect(page.locator('text=00:00:03')).toBeVisible()

    // Reset timer
    await page.click('button:has-text("Reset")')

    // Timer should reset to 00:00:00
    await expect(page.locator('text=00:00:00')).toBeVisible()
  })
})
```

### 3.3 Visual Regression Tests

**Tool:** Playwright screenshots + Percy.io or Chromatic

```typescript
test.describe('Visual Regression', () => {
  test('dashboard overview - desktop', async ({ page }) => {
    await page.goto('/student/dashboard')
    await page.waitForLoadState('networkidle')

    await expect(page).toHaveScreenshot('dashboard-overview-desktop.png', {
      fullPage: true,
      maxDiffPixels: 100,
    })
  })

  test('dashboard overview - mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 })
    await page.goto('/student/dashboard')
    await page.waitForLoadState('networkidle')

    await expect(page).toHaveScreenshot('dashboard-overview-mobile.png', {
      fullPage: true,
    })
  })

  test('empty state', async ({ page }) => {
    // Mock empty API response
    await page.route('/api/test-attempts*', (route) => {
      route.fulfill({
        status: 200,
        body: JSON.stringify({ success: true, data: { attempts: [] } }),
      })
    })

    await page.goto('/student/dashboard')
    await page.waitForLoadState('networkidle')

    await expect(page).toHaveScreenshot('dashboard-empty-state.png')
  })
})
```

---

## 4. Performance Testing Strategy

### 4.1 Performance Metrics

**Target Metrics:**

- First Contentful Paint (FCP): <1.5s
- Largest Contentful Paint (LCP): <2.5s
- Time to Interactive (TTI): <3.5s
- Total Blocking Time (TBT): <200ms
- Cumulative Layout Shift (CLS): <0.1
- First Input Delay (FID): <100ms

### 4.2 Lighthouse Audit

```typescript
// tests/e2e/student-dashboard/performance.spec.ts
import { test } from '@playwright/test'
import { playAudit } from 'playwright-lighthouse'

test.describe('Performance Audit', () => {
  test('lighthouse scores above threshold', async ({ page, context }) => {
    await page.goto('/student/dashboard')

    await playAudit({
      page,
      thresholds: {
        performance: 85,
        accessibility: 90,
        'best-practices': 85,
        seo: 85,
        pwa: 50,
      },
      port: 9222,
    })
  })
})
```

### 4.3 Load Time Testing

```typescript
test('dashboard loads in <3s on 3G network', async ({ page }) => {
  // Throttle network to 3G
  await page.route('**/*', (route) => {
    route.continue({
      // 3G speeds: ~1.5 Mbps
    })
  })

  const startTime = Date.now()
  await page.goto('/student/dashboard')
  await page.waitForLoadState('networkidle')
  const loadTime = Date.now() - startTime

  expect(loadTime).toBeLessThan(3000)
})
```

### 4.4 Bundle Size Analysis

**Command:** `npm run build:analyze`

**Targets:**

- Main bundle: <300KB gzipped
- Dashboard page chunk: <150KB gzipped
- No duplicate dependencies
- Code splitting for heavy components

### 4.5 Load Testing

**Tool:** Artillery or K6
**Configuration File:** `/scripts/load-test.yml`

```yaml
# scripts/load-test-dashboard.yml
config:
  target: 'http://localhost:3000'
  phases:
    - duration: 60
      arrivalRate: 10
      name: 'Warm up'
    - duration: 120
      arrivalRate: 50
      name: 'Ramp up'
    - duration: 300
      arrivalRate: 100
      name: 'Sustained load'

scenarios:
  - name: 'View Dashboard'
    flow:
      - get:
          url: '/api/test-attempts?freeUserId={{ $randomString() }}'
      - get:
          url: '/api/test-sessions?freeUserId={{ $randomString() }}'
      - think: 5
      - get:
          url: '/student/dashboard'
```

**Run Command:** `npm run test:load`

**Success Criteria:**

- 1000 concurrent users supported
- 95th percentile response time <1s
- Error rate <1%
- CPU usage <80%
- Memory usage stable (no leaks)

---

## 5. Accessibility Testing Strategy

### 5.1 WCAG 2.1 AA Compliance

**Standards to Test:**

- Perceivable: Text alternatives, adaptable, distinguishable
- Operable: Keyboard accessible, enough time, navigable
- Understandable: Readable, predictable, input assistance
- Robust: Compatible with assistive technologies

### 5.2 Automated Accessibility Tests

```typescript
// tests/e2e/student-dashboard/accessibility.spec.ts
import { test, expect } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'

test.describe('Accessibility', () => {
  test('dashboard passes aXe scan', async ({ page }) => {
    await page.goto('/student/dashboard')
    await page.waitForLoadState('networkidle')

    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .analyze()

    expect(accessibilityScanResults.violations).toEqual([])
  })

  test('color contrast ratios meet 4.5:1 minimum', async ({ page }) => {
    await page.goto('/student/dashboard')

    const contrastResults = await new AxeBuilder({ page }).withTags(['cat.color']).analyze()

    expect(contrastResults.violations).toEqual([])
  })
})
```

### 5.3 Keyboard Navigation Tests

```typescript
test.describe('Keyboard Navigation', () => {
  test('can navigate dashboard using only keyboard', async ({ page }) => {
    await page.goto('/student/dashboard')

    // Tab through navigation
    await page.keyboard.press('Tab')
    await expect(page.locator(':focus')).toHaveAttribute('data-testid', 'overview-tab')

    await page.keyboard.press('Tab')
    await expect(page.locator(':focus')).toHaveAttribute('data-testid', 'progress-tab')

    // Enter to activate tab
    await page.keyboard.press('Enter')
    await expect(page.locator('[data-tab="progress"]')).toBeVisible()

    // Tab to action button
    await page.keyboard.press('Tab')
    await expect(page.locator(':focus')).toHaveText(/Take Practice Test/)

    // Enter to click
    await page.keyboard.press('Enter')
    await expect(page).toHaveURL(/\/mock-tests/)
  })

  test('focus indicators visible', async ({ page }) => {
    await page.goto('/student/dashboard')
    await page.keyboard.press('Tab')

    const focusedElement = page.locator(':focus')
    const outlineWidth = await focusedElement.evaluate((el) => getComputedStyle(el).outlineWidth)

    expect(outlineWidth).not.toBe('0px')
  })
})
```

### 5.4 Screen Reader Tests

**Manual Testing Checklist:**

- [ ] NVDA (Windows): All content readable
- [ ] JAWS (Windows): Navigation landmarks announced
- [ ] VoiceOver (macOS): Tab labels and buttons described
- [ ] TalkBack (Android): Touch exploration works
- [ ] VoiceOver (iOS): Swipe navigation logical

**ARIA Labels to Verify:**

```typescript
test('ARIA labels present and descriptive', async ({ page }) => {
  await page.goto('/student/dashboard')

  // Main navigation
  await expect(page.locator('nav')).toHaveAttribute('aria-label', 'Dashboard navigation')

  // Stats cards
  await expect(page.locator('[aria-label="Total study time"]')).toBeVisible()
  await expect(page.locator('[aria-label="Average score"]')).toBeVisible()

  // Action buttons
  await expect(page.locator('button[aria-label="Start practice session"]')).toBeVisible()

  // Progress bars
  await expect(page.locator('[role="progressbar"]')).toHaveAttribute('aria-valuenow')
})
```

### 5.5 Alt Text Verification

```typescript
test('images have alt text', async ({ page }) => {
  await page.goto('/student/dashboard')

  const images = await page.locator('img').all()

  for (const img of images) {
    const alt = await img.getAttribute('alt')
    expect(alt).toBeTruthy()
    expect(alt.length).toBeGreaterThan(3)
  }
})
```

---

## 6. Mobile & Responsive Testing Strategy

### 6.1 Device Matrix

**Mobile Devices:**

- iPhone SE (375x667) - Small phone
- iPhone 12 Pro (390x844) - Standard phone
- Samsung Galaxy S21 (360x800) - Android
- Google Pixel 5 (393x851) - Modern Android

**Tablets:**

- iPad (768x1024) - Portrait
- iPad Pro (1024x1366) - Landscape
- Samsung Galaxy Tab (800x1280)

**Desktop:**

- 1920x1080 (Full HD)
- 1366x768 (Common laptop)
- 2560x1440 (QHD)

### 6.2 Responsive Layout Tests

```typescript
// tests/e2e/student-dashboard/responsive.spec.ts
test.describe('Responsive Layout', () => {
  const devices = [
    { name: 'iPhone SE', width: 375, height: 667 },
    { name: 'iPad', width: 768, height: 1024 },
    { name: 'Desktop', width: 1920, height: 1080 },
  ]

  devices.forEach((device) => {
    test(`layout doesn't break on ${device.name}`, async ({ page }) => {
      await page.setViewportSize({ width: device.width, height: device.height })
      await page.goto('/student/dashboard')

      // No horizontal scrolling
      const scrollWidth = await page.evaluate(() => document.body.scrollWidth)
      const clientWidth = await page.evaluate(() => document.body.clientWidth)
      expect(scrollWidth).toBeLessThanOrEqual(clientWidth + 1) // +1 for rounding

      // All stats cards visible
      await expect(page.locator('text=Total Study Time')).toBeVisible()
      await expect(page.locator('text=Average Score')).toBeVisible()

      // Screenshot
      await expect(page).toHaveScreenshot(`dashboard-${device.name}.png`)
    })
  })
})
```

### 6.3 Touch Target Size

```typescript
test('touch targets meet 44x44px minimum', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 667 })
  await page.goto('/student/dashboard')

  const buttons = await page.locator('button, a[href]').all()

  for (const button of buttons) {
    const box = await button.boundingBox()
    if (box) {
      expect(box.width).toBeGreaterThanOrEqual(44)
      expect(box.height).toBeGreaterThanOrEqual(44)
    }
  }
})
```

### 6.4 Font Readability

```typescript
test('fonts meet minimum 16px body text', async ({ page }) => {
  await page.goto('/student/dashboard')

  const bodyText = page.locator('p, span').first()
  const fontSize = await bodyText.evaluate((el) => getComputedStyle(el).fontSize)

  const fontSizeNumber = parseFloat(fontSize)
  expect(fontSizeNumber).toBeGreaterThanOrEqual(16)
})
```

---

## 7. Browser Compatibility Testing

### 7.1 Browser Matrix

| Browser          | Versions           | Priority |
| ---------------- | ------------------ | -------- |
| Chrome           | Latest, Latest-1   | High     |
| Safari           | Latest, iOS Safari | High     |
| Firefox          | Latest             | Medium   |
| Edge             | Latest             | Medium   |
| Samsung Internet | Latest             | Low      |

### 7.2 Compatibility Tests

```typescript
// Runs on all browser projects defined in playwright.config.ts
test.describe('Cross-Browser Compatibility', () => {
  test('dashboard renders correctly', async ({ page, browserName }) => {
    await page.goto('/student/dashboard')

    // Visual consistency
    await expect(page.locator('text=Welcome back')).toBeVisible()

    // JavaScript functionality
    await page.click('button:has-text("Study Session")')
    await expect(page.locator('text=Focus Study Session')).toBeVisible()

    // CSS rendering
    const bgColor = await page
      .locator('.bg-gradient-to-br')
      .evaluate((el) => getComputedStyle(el).background)
    expect(bgColor).toContain('gradient')

    console.log(`✅ ${browserName}: All tests passed`)
  })
})
```

### 7.3 Polyfill Verification

**Check for:**

- ES6+ features (Promise, async/await, spread operator)
- CSS Grid/Flexbox support
- Fetch API availability
- IntersectionObserver for lazy loading
- localStorage/sessionStorage

---

## 8. Security Testing Strategy

### 8.1 Authentication Security

```typescript
test.describe('Authentication Security', () => {
  test('unauthorized access blocked', async ({ page }) => {
    // Clear all cookies/storage
    await page.context().clearCookies()
    await page.goto('/student/dashboard')

    // Should redirect to login
    await expect(page).toHaveURL(/\/login/)
  })

  test('session expiry handled', async ({ page, context }) => {
    // Login
    await page.goto('/login')
    await page.fill('input[name="email"]', 'student@test.com')
    await page.fill('input[name="password"]', 'password123')
    await page.click('button[type="submit"]')

    // Manually expire session cookie
    const cookies = await context.cookies()
    const sessionCookie = cookies.find((c) => c.name === 'next-auth.session-token')
    if (sessionCookie) {
      await context.addCookies([
        {
          ...sessionCookie,
          expires: Date.now() / 1000 - 3600, // Expired 1 hour ago
        },
      ])
    }

    // Refresh page
    await page.reload()

    // Should redirect to login
    await expect(page).toHaveURL(/\/login/)
  })
})
```

### 8.2 XSS Prevention

```typescript
test('handles malicious input safely', async ({ page }) => {
  // Mock API response with XSS attempt
  await page.route('/api/test-attempts*', (route) => {
    route.fulfill({
      status: 200,
      body: JSON.stringify({
        success: true,
        data: {
          attempts: [
            {
              id: 'xss-test',
              testTemplate: {
                title: '<script>alert("XSS")</script>NEET Test',
              },
            },
          ],
        },
      }),
    })
  })

  await page.goto('/student/dashboard')

  // Script should be escaped, not executed
  await expect(page.locator('text=<script>alert("XSS")</script>NEET Test')).toBeVisible()

  // Verify no alert appeared
  page.on('dialog', () => {
    throw new Error('Unexpected alert dialog (XSS vulnerability)')
  })
})
```

### 8.3 CSRF Protection

```typescript
test('API calls include CSRF token', async ({ page }) => {
  await page.goto('/student/dashboard')

  // Intercept API calls
  await page.route('/api/**', (route) => {
    const headers = route.request().headers()
    expect(headers['x-csrf-token']).toBeDefined()
    route.continue()
  })

  // Trigger API call
  await page.click('button:has-text("Start Practice →")')
})
```

### 8.4 Data Privacy

```typescript
test('sensitive data not leaked in console', async ({ page }) => {
  const consoleMessages = []
  page.on('console', (msg) => consoleMessages.push(msg.text()))

  await page.goto('/student/dashboard')
  await page.waitForLoadState('networkidle')

  // Check console logs don't contain sensitive data
  const sensitivePatterns = [/password/i, /api[_-]?key/i, /secret/i, /token/i]

  consoleMessages.forEach((msg) => {
    sensitivePatterns.forEach((pattern) => {
      expect(msg).not.toMatch(pattern)
    })
  })
})

test('API calls use HTTPS in production', async ({ page }) => {
  // Only run in production build
  if (process.env.NODE_ENV === 'production') {
    await page.goto('/student/dashboard')

    await page.route('**', (route) => {
      const url = route.request().url()
      expect(url).toMatch(/^https:\/\//)
      route.continue()
    })
  }
})
```

---

## 9. Error Handling Testing

### 9.1 Network Error Scenarios

```typescript
test.describe('Error Handling', () => {
  test('handles offline network', async ({ page, context }) => {
    // Set offline
    await context.setOffline(true)

    await page.goto('/student/dashboard')

    // Should show error message
    await expect(page.locator('text=Unable to load dashboard data')).toBeVisible()
    await expect(page.locator('button:has-text("Retry")')).toBeVisible()
  })

  test('handles 500 server error', async ({ page }) => {
    await page.route('/api/test-attempts*', (route) => {
      route.fulfill({ status: 500, body: 'Internal Server Error' })
    })

    await page.goto('/student/dashboard')

    await expect(page.locator('text=Something went wrong')).toBeVisible()
    await expect(page.locator('button:has-text("Retry")')).toBeVisible()
  })

  test('handles 404 not found', async ({ page }) => {
    await page.route('/api/test-attempts*', (route) => {
      route.fulfill({ status: 404, body: 'Not Found' })
    })

    await page.goto('/student/dashboard')

    // Should show empty state (no data found)
    await expect(page.locator('text=Ready to Start Your Journey?')).toBeVisible()
  })

  test('handles API timeout', async ({ page }) => {
    await page.route('/api/test-attempts*', (route) => {
      // Never resolve (simulate timeout)
      return new Promise(() => {})
    })

    await page.goto('/student/dashboard')

    // Should timeout after 30s and show error
    await expect(page.locator('text=Request timed out')).toBeVisible({
      timeout: 35000,
    })
  })
})
```

### 9.2 Invalid Data Handling

```typescript
test('handles malformed API response', async ({ page }) => {
  await page.route('/api/test-attempts*', (route) => {
    route.fulfill({
      status: 200,
      body: 'Invalid JSON{{{', // Not valid JSON
    })
  })

  await page.goto('/student/dashboard')

  await expect(page.locator('text=Failed to load data')).toBeVisible()
})

test('handles missing required fields', async ({ page }) => {
  await page.route('/api/test-attempts*', (route) => {
    route.fulfill({
      status: 200,
      body: JSON.stringify({
        success: true,
        data: {
          attempts: [
            {
              id: 'test-1',
              // Missing score, percentage, etc.
            },
          ],
        },
      }),
    })
  })

  await page.goto('/student/dashboard')

  // Should use fallback values, not crash
  await expect(page.locator('text=Welcome back')).toBeVisible()
})
```

---

## 10. Test Data & Fixtures

### 10.1 Test Data Fixtures

**File:** `/tests/fixtures/dashboard-data.ts`

```typescript
export const newUserFixture = {
  user: {
    id: 'new-user-1',
    name: 'New Student',
    email: 'new@test.com',
    createdAt: new Date().toISOString(),
  },
  testAttempts: [],
  testSessions: [],
  enrollments: [],
}

export const activeUserFixture = {
  user: {
    id: 'active-user-1',
    name: 'Active Student',
    email: 'active@test.com',
  },
  testAttempts: [
    {
      id: 'attempt-1',
      score: 420,
      percentage: 70,
      timeSpent: 5400,
      strengthAreas: ['Cell Biology', 'Genetics'],
      weaknessAreas: ['Ecology', 'Evolution'],
      rank: 1500,
      testTemplate: {
        id: 'template-1',
        title: 'NEET Mock Test 1',
        type: 'MOCK_TEST',
      },
      createdAt: '2025-10-27T10:00:00Z',
    },
    // ... 9 more attempts
  ],
  testSessions: [
    {
      id: 'session-1',
      duration: 3600,
      questionsAttempted: 90,
      correctAnswers: 63,
      createdAt: '2025-10-27T10:00:00Z',
    },
    // ... 4 more sessions
  ],
  enrollments: [
    {
      id: 'enrollment-1',
      courseId: 'neet-biology-12',
      status: 'ACTIVE',
    },
  ],
}

export const highPerformerFixture = {
  user: {
    id: 'high-performer-1',
    name: 'Top Student',
    email: 'topstudent@test.com',
  },
  testAttempts: [
    {
      id: 'attempt-1',
      score: 648,
      percentage: 90,
      timeSpent: 6000,
      strengthAreas: ['Cell Biology', 'Genetics', 'Physiology', 'Ecology', 'Evolution'],
      weaknessAreas: [],
      rank: 50,
      testTemplate: {
        id: 'template-1',
        title: 'NEET Mock Test 1',
        type: 'MOCK_TEST',
      },
      createdAt: '2025-10-28T10:00:00Z',
    },
    // ... 49 more attempts with high scores
  ],
}

export const strugglingUserFixture = {
  user: {
    id: 'struggling-user-1',
    name: 'Struggling Student',
    email: 'struggling@test.com',
  },
  testAttempts: [
    {
      id: 'attempt-1',
      score: 288,
      percentage: 40,
      timeSpent: 5400,
      strengthAreas: ['Cell Structure'],
      weaknessAreas: ['Ecology', 'Evolution', 'Genetics', 'Physiology', 'Plant Physiology'],
      rank: 15000,
      testTemplate: {
        id: 'template-1',
        title: 'NEET Mock Test 1',
        type: 'MOCK_TEST',
      },
      createdAt: '2025-10-28T10:00:00Z',
    },
    // ... 19 more attempts with low scores
  ],
}

export const inactiveUserFixture = {
  user: {
    id: 'inactive-user-1',
    name: 'Inactive Student',
    email: 'inactive@test.com',
  },
  testAttempts: [
    {
      id: 'attempt-1',
      score: 420,
      percentage: 70,
      timeSpent: 5400,
      strengthAreas: ['Cell Biology'],
      weaknessAreas: ['Ecology'],
      rank: 5000,
      testTemplate: {
        id: 'template-1',
        title: 'NEET Mock Test 1',
        type: 'MOCK_TEST',
      },
      createdAt: '2025-09-28T10:00:00Z', // 30 days ago
    },
  ],
}
```

### 10.2 Fixture Usage

```typescript
import { activeUserFixture } from '@/tests/fixtures/dashboard-data'

test('displays data for active user', async ({ page }) => {
  await page.route('/api/test-attempts*', (route) => {
    route.fulfill({
      status: 200,
      body: JSON.stringify({
        success: true,
        data: { attempts: activeUserFixture.testAttempts },
      }),
    })
  })

  await page.goto('/student/dashboard')

  await expect(page.locator('text=10 sessions')).toBeVisible()
})
```

---

## 11. Continuous Integration Strategy

### 11.1 CI/CD Pipeline Configuration

**File:** `.github/workflows/test-dashboard.yml`

```yaml
name: Dashboard Testing

on:
  push:
    branches: [main, develop]
    paths:
      - 'src/components/dashboard/**'
      - 'src/app/student/dashboard/**'
      - 'src/app/api/test-attempts/**'
      - 'src/app/api/test-sessions/**'
  pull_request:
    branches: [main, develop]

jobs:
  unit-tests:
    name: Unit Tests
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Run unit tests
        run: npm run test -- --coverage

      - name: Upload coverage
        uses: codecov/codecov-action@v3
        with:
          files: ./coverage/lcov.info
          flags: unit

  integration-tests:
    name: Integration Tests
    runs-on: ubuntu-latest
    services:
      postgres:
        image: postgres:15
        env:
          POSTGRES_PASSWORD: postgres
        options: >-
          --health-cmd pg_isready
          --health-interval 10s
          --health-timeout 5s
          --health-retries 5
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Setup database
        run: npm run db:test:setup

      - name: Run integration tests
        run: npm run test:integration

  e2e-tests:
    name: E2E Tests
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Install Playwright
        run: npx playwright install --with-deps

      - name: Run E2E tests
        run: npm run test:e2e

      - name: Upload test results
        if: always()
        uses: actions/upload-artifact@v3
        with:
          name: playwright-report
          path: test-results/

  accessibility-tests:
    name: Accessibility Tests
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Install Playwright
        run: npx playwright install --with-deps

      - name: Run accessibility tests
        run: npm run test:accessibility

  performance-tests:
    name: Performance Tests
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Build production
        run: npm run build

      - name: Run Lighthouse CI
        run: |
          npm install -g @lhci/cli
          lhci autorun

      - name: Upload performance report
        uses: actions/upload-artifact@v3
        with:
          name: lighthouse-report
          path: .lighthouseci/

  security-tests:
    name: Security Tests
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Run security scan
        run: npm run test:security:scan

      - name: Run npm audit
        run: npm audit --audit-level=moderate
```

### 11.2 Test Execution Strategy

**On Every Commit:**

- Unit tests (fast, <2 min)
- Linting and type checking

**On Pull Request:**

- Unit tests
- Integration tests
- E2E tests (critical paths only)
- Accessibility tests

**Nightly/Scheduled:**

- Full E2E test suite
- Performance tests
- Load tests
- Security scans
- Visual regression tests

**Pre-Release:**

- All tests (complete suite)
- Manual exploratory testing
- UAT with real users

### 11.3 Coverage Requirements

**Minimum Thresholds:**

```json
{
  "coverage": {
    "branches": 80,
    "functions": 80,
    "lines": 80,
    "statements": 80
  }
}
```

**Files Must Have 100% Coverage:**

- Utility functions (formatTime, etc.)
- Data transformation logic
- Error handlers

**Files Can Have Lower Coverage:**

- UI components with complex animations
- Third-party integrations
- Platform-specific code

---

## 12. Bug Reporting & Tracking

### 12.1 Bug Report Template

**GitHub Issue Template:** `.github/ISSUE_TEMPLATE/bug_report.md`

```markdown
---
name: Bug Report - Student Dashboard
about: Report a bug in the student dashboard
title: '[DASHBOARD] '
labels: 'bug, dashboard, needs-triage'
assignees: ''
---

## Bug Description

<!-- A clear and concise description of what the bug is -->

## Severity

<!-- Select one: Critical / High / Medium / Low -->

- [ ] Critical - Blocks core functionality
- [ ] High - Major feature broken
- [ ] Medium - Minor issue, workaround available
- [ ] Low - Cosmetic or edge case

## Environment

- **Browser:** [e.g., Chrome 120.0]
- **OS:** [e.g., macOS 14.1, Windows 11]
- **Device:** [e.g., Desktop, iPhone 12 Pro]
- **Screen Resolution:** [e.g., 1920x1080]
- **User Type:** [e.g., new user, high performer]

## Steps to Reproduce

1. Go to '...'
2. Click on '...'
3. Scroll down to '...'
4. See error

## Expected Result

<!-- What should happen -->

## Actual Result

<!-- What actually happens -->

## Screenshots

<!-- If applicable, add screenshots to help explain your problem -->

## Console Errors

<!-- Open browser DevTools > Console, paste any errors here -->
```

const error = ...

```

## Network Tab
<!-- Open DevTools > Network, check for failed requests -->
- [ ] Failed API calls: ...
- [ ] Slow requests (>2s): ...

## Additional Context
<!-- Any other context about the problem -->

## Possible Fix
<!-- If you have suggestions on how to fix -->
```

### 12.2 Bug Severity Definitions

#### Critical (P0)

- Dashboard completely inaccessible
- Data loss or corruption
- Security vulnerability
- Authentication bypass
- App crashes on load

**SLA:** Fix within 4 hours

#### High (P1)

- Major feature broken (e.g., study timer not working)
- Incorrect data displayed (e.g., wrong scores)
- Poor performance (>10s load time)
- Affects >50% of users

**SLA:** Fix within 24 hours

#### Medium (P2)

- Minor feature broken (e.g., tab animation glitch)
- UI rendering issue
- Non-critical error messages
- Affects <50% of users

**SLA:** Fix within 1 week

#### Low (P3)

- Cosmetic issue
- Edge case scenario
- Minor inconvenience
- Affects <10% of users

**SLA:** Fix in next sprint

### 12.3 Bug Triage Process

**Daily Standup:**

1. Review new bugs from last 24 hours
2. Assign severity levels
3. Assign to developers
4. Prioritize in sprint backlog

**Weekly Review:**

1. Review open bugs
2. Re-prioritize based on impact
3. Identify patterns/root causes
4. Update test coverage to prevent regression

---

## 13. Test Automation Guidelines

### 13.1 What to Automate

**High Priority (Must Automate):**

- Unit tests for all utility functions
- API integration tests
- E2E tests for critical user paths
- Regression tests for previously fixed bugs
- Performance benchmarks

**Medium Priority (Should Automate):**

- Visual regression tests
- Accessibility scans
- Cross-browser tests
- Mobile responsive tests

**Low Priority (Manual OK):**

- Complex user interactions requiring judgment
- Exploratory testing
- Usability testing
- Visual design review

### 13.2 Test Maintenance

**Keep Tests:**

- Fast (<30s per test)
- Isolated (no dependencies between tests)
- Deterministic (same result every time)
- Clear (descriptive names and assertions)
- Maintainable (DRY, use helpers)

**Avoid:**

- Flaky tests (intermittent failures)
- Slow tests (>1 min per test)
- Brittle tests (break on minor UI changes)
- Overly complex tests (hard to understand)

### 13.3 Test Code Review Checklist

- [ ] Test covers stated requirement
- [ ] Test has clear arrange/act/assert structure
- [ ] Test uses appropriate mocks/fixtures
- [ ] Test cleans up after itself
- [ ] Test has descriptive name
- [ ] Test assertions are specific (not just "toBeTruthy")
- [ ] Test handles async operations correctly
- [ ] Test doesn't have hardcoded waits (use waitFor)

---

## 14. Production Readiness Checklist

### 14.1 Functional Testing

- [ ] All unit tests passing (100%)
- [ ] All integration tests passing (100%)
- [ ] All E2E critical paths passing (100%)
- [ ] No known critical bugs (P0/P1)
- [ ] All user stories completed and tested

### 14.2 Performance Testing

- [ ] Lighthouse score >85 on all metrics
- [ ] Load time <3s on 3G network
- [ ] Time to Interactive <3.5s
- [ ] No memory leaks (tested over 1 hour)
- [ ] Load tested with 1000 concurrent users
- [ ] Database queries optimized (<100ms average)

### 14.3 Accessibility Testing

- [ ] aXe scan passes with 0 violations
- [ ] Keyboard navigation works completely
- [ ] Screen reader tested (NVDA, VoiceOver)
- [ ] Color contrast ratios meet WCAG AA
- [ ] All images have alt text
- [ ] Form labels properly associated

### 14.4 Security Testing

- [ ] Authentication required for all protected routes
- [ ] Session management secure (httpOnly, secure flags)
- [ ] XSS prevention verified
- [ ] CSRF tokens implemented
- [ ] No sensitive data in console/network tab
- [ ] HTTPS enforced in production
- [ ] npm audit shows no high/critical vulnerabilities

### 14.5 Cross-Platform Testing

- [ ] Tested on Chrome (latest, latest-1)
- [ ] Tested on Safari (latest, iOS)
- [ ] Tested on Firefox (latest)
- [ ] Tested on Edge (latest)
- [ ] Tested on mobile (iOS, Android)
- [ ] Tested on tablet (iPad, Android)
- [ ] Responsive layout verified (320px to 1920px)

### 14.6 Error Handling

- [ ] Network errors handled gracefully
- [ ] Server errors show user-friendly messages
- [ ] Timeout scenarios handled
- [ ] Invalid data doesn't crash app
- [ ] Retry mechanisms in place
- [ ] Error logging to monitoring service

### 14.7 Documentation

- [ ] Test plan documented (this document)
- [ ] Test cases written and reviewed
- [ ] Bug reports follow template
- [ ] User documentation updated
- [ ] API documentation current
- [ ] Release notes prepared

### 14.8 Monitoring & Analytics

- [ ] Error tracking configured (e.g., Sentry)
- [ ] Performance monitoring enabled (e.g., Vercel Analytics)
- [ ] User analytics tracking (e.g., Google Analytics)
- [ ] Logging configured (structured logs)
- [ ] Alerts set up for critical errors

---

## 15. Test Execution Schedule

### 15.1 Development Phase (Ongoing)

**Daily:**

- Unit tests on every commit
- Linting and type checking

**Weekly:**

- Integration tests (full suite)
- E2E tests (critical paths)
- Code coverage review

### 15.2 Pre-Release Phase (1 week before launch)

**Day 1-2:**

- Complete E2E test suite
- Performance testing
- Accessibility audit

**Day 3-4:**

- Security scanning
- Load testing
- Cross-browser testing

**Day 5:**

- Manual exploratory testing
- UAT with beta users
- Bug fixing

**Day 6:**

- Regression testing
- Final performance check
- Sign-off from QA lead

**Day 7:**

- Production deployment
- Smoke testing in production
- Monitoring for 24 hours

### 15.3 Post-Release Phase

**Week 1:**

- Monitor error rates
- Track user feedback
- Hot-fix critical bugs

**Month 1:**

- Review analytics
- Collect user feedback
- Plan improvements

**Ongoing:**

- Regression tests in CI/CD
- Nightly performance tests
- Monthly accessibility audits

---

## 16. Success Metrics & KPIs

### 16.1 Testing Metrics

- **Code Coverage:** Target 85%+, Critical paths 100%
- **Test Pass Rate:** >99% (flaky tests <1%)
- **Test Execution Time:** <15 minutes for full suite
- **Bug Escape Rate:** <5 bugs per release found in production
- **Mean Time to Detect (MTTD):** <1 hour for critical bugs
- **Mean Time to Resolve (MTTR):** <4 hours for P0, <24 hours for P1

### 16.2 Quality Metrics

- **Defect Density:** <0.5 bugs per KLOC (thousand lines of code)
- **Customer-Reported Bugs:** <10 per month
- **Severity Distribution:** 0% P0, <10% P1, <30% P2, rest P3
- **Regression Rate:** <5% (new bugs in areas with existing tests)

### 16.3 Performance Metrics

- **Dashboard Load Time (p50):** <2s
- **Dashboard Load Time (p95):** <3s
- **API Response Time (p95):** <500ms
- **Error Rate:** <0.1%
- **Uptime:** >99.9%

### 16.4 User Experience Metrics

- **Lighthouse Performance Score:** >85
- **Lighthouse Accessibility Score:** >90
- **Core Web Vitals:**
  - LCP: <2.5s (Good)
  - FID: <100ms (Good)
  - CLS: <0.1 (Good)
- **User Satisfaction (CSAT):** >4.5/5

---

## 17. Test Tools & Infrastructure

### 17.1 Testing Stack

- **Unit Testing:** Jest + React Testing Library
- **E2E Testing:** Playwright
- **API Testing:** Jest + Supertest
- **Performance Testing:** Lighthouse CI + Artillery
- **Accessibility Testing:** axe-core + Pa11y
- **Visual Testing:** Percy.io or Chromatic
- **Security Testing:** npm audit + OWASP ZAP
- **Load Testing:** Artillery + K6

### 17.2 CI/CD Tools

- **CI Platform:** GitHub Actions
- **Code Coverage:** Codecov
- **Test Reporting:** Allure or TestRail
- **Bug Tracking:** GitHub Issues
- **Monitoring:** Sentry + Vercel Analytics

### 17.3 Test Environments

- **Local:** Developer machines
- **CI:** GitHub Actions runners
- **Staging:** Vercel preview deployments
- **Production:** Vercel production

---

## 18. Risk Assessment

### 18.1 High-Risk Areas

1. **Authentication System:** Critical for security
2. **Data Fetching Logic:** Core functionality
3. **Score Calculations:** Accuracy essential
4. **Study Timer:** Real-time updates
5. **Mobile Responsiveness:** Large mobile user base

### 18.2 Mitigation Strategies

- **Authentication:** Extra security tests, penetration testing
- **Data Fetching:** Extensive error handling tests, retry logic
- **Calculations:** Unit tests with edge cases, manual verification
- **Timer:** Integration tests, visual QA
- **Mobile:** Device lab testing, responsive design checks

---

## Appendices

### Appendix A: Glossary

- **E2E:** End-to-End testing
- **P0/P1/P2/P3:** Bug priority levels (0=critical, 3=low)
- **WCAG:** Web Content Accessibility Guidelines
- **LCP:** Largest Contentful Paint
- **FID:** First Input Delay
- **CLS:** Cumulative Layout Shift
- **MTTD:** Mean Time to Detect
- **MTTR:** Mean Time to Resolve
- **UAT:** User Acceptance Testing

### Appendix B: References

- [Jest Documentation](https://jestjs.io/)
- [Playwright Documentation](https://playwright.dev/)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [Web Vitals](https://web.dev/vitals/)
- [OWASP Testing Guide](https://owasp.org/www-project-web-security-testing-guide/)

### Appendix C: Contact Information

- **QA Lead:** [Name] - [email]
- **Dev Lead:** [Name] - [email]
- **Product Owner:** [Name] - [email]
- **Security Team:** [email]

---

**Document Version:** 1.0
**Last Updated:** 2025-10-29
**Next Review:** 2025-11-29
**Approved By:** QA Engineering Team
