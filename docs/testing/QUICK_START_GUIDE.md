# Student Dashboard Testing - Quick Start Guide

**For:** Developers and QA Engineers
**Purpose:** Get started with testing the Student Dashboard in 5 minutes

---

## TL;DR - Run All Tests

```bash
# Run unit tests
npm test -- --testPathPattern=dashboard

# Run E2E tests
npm run test:e2e -- tests/e2e/student-dashboard

# Run accessibility tests
npm run test:accessibility

# Run all tests
npm run test:all
```

---

## File Locations

### Source Code

- **Dashboard Component:** `/src/components/dashboard/PersonalizedStudentDashboard.tsx`
- **Dashboard Page:** `/src/app/student/dashboard/page.tsx` (if exists)

### Test Files

- **Unit Tests:** `/src/__tests__/components/dashboard/PersonalizedStudentDashboard.test.tsx`
- **E2E Tests:** `/tests/e2e/student-dashboard/dashboard.spec.ts`
- **Test Fixtures:** `/tests/fixtures/dashboard-data.ts`

### Documentation

- **Full Test Plan:** `/docs/testing/STUDENT_DASHBOARD_TEST_PLAN.md` (60+ pages)
- **Test Cases:** `/docs/testing/TEST_CASES_STUDENT_DASHBOARD.csv` (150 cases)
- **Summary:** `/docs/testing/TESTING_SUMMARY.md`
- **This Guide:** `/docs/testing/QUICK_START_GUIDE.md`

### Configuration

- **Jest Config:** `/jest.config.cjs`
- **Playwright Config:** `/playwright.config.ts`
- **Lighthouse Config:** `/lighthouserc.json`
- **CI Pipeline:** `/.github/workflows/test-student-dashboard.yml`

---

## Quick Test Commands

### Unit Testing

```bash
# Run all dashboard unit tests
npm test -- PersonalizedStudentDashboard

# Watch mode (re-runs on file changes)
npm run test:watch -- PersonalizedStudentDashboard

# With coverage
npm test -- PersonalizedStudentDashboard --coverage

# Single test by name
npm test -- PersonalizedStudentDashboard -t "user name displays correctly"
```

### E2E Testing

```bash
# Run all dashboard E2E tests
npm run test:e2e -- tests/e2e/student-dashboard

# Run on specific browser
npm run test:e2e -- --project=chromium tests/e2e/student-dashboard
npm run test:e2e -- --project=firefox tests/e2e/student-dashboard
npm run test:e2e -- --project=webkit tests/e2e/student-dashboard

# Debug mode (headed browser)
npm run test:e2e -- --debug tests/e2e/student-dashboard

# Single test
npm run test:e2e -- tests/e2e/student-dashboard/dashboard.spec.ts -g "user can access dashboard"
```

### Accessibility Testing

```bash
# Run accessibility audit
npm run test:accessibility

# Check specific page
npm run test:e2e -- --project=accessibility tests/e2e/student-dashboard
```

### Performance Testing

```bash
# Run Lighthouse audit
npx lhci autorun

# Full performance suite
npm run test:performance:full
```

---

## Writing Your First Test

### Unit Test Example

```typescript
// src/__tests__/components/dashboard/YourTest.test.tsx
import { render, screen, waitFor } from '@testing-library/react'
import { PersonalizedStudentDashboard } from '@/components/dashboard/PersonalizedStudentDashboard'
import { useAuth } from '@/hooks/useAuth'

jest.mock('@/hooks/useAuth')

describe('My Dashboard Test', () => {
  it('should display welcome message', async () => {
    // Mock auth
    (useAuth as jest.Mock).mockReturnValue({
      user: { id: '1', name: 'Test User' },
      isAuthenticated: true
    })

    // Mock fetch
    global.fetch = jest.fn().mockResolvedValue({
      json: async () => ({ success: true, data: { attempts: [] } })
    })

    // Render
    render(<PersonalizedStudentDashboard />)

    // Assert
    await waitFor(() => {
      expect(screen.getByText(/Welcome back, Test User/)).toBeInTheDocument()
    })
  })
})
```

### E2E Test Example

```typescript
// tests/e2e/student-dashboard/my-test.spec.ts
import { test, expect } from '@playwright/test'

test('student can view dashboard', async ({ page }) => {
  // Login
  await page.goto('/login')
  await page.fill('input[name="email"]', 'test@example.com')
  await page.fill('input[name="password"]', 'password')
  await page.click('button[type="submit"]')

  // Navigate to dashboard
  await page.waitForURL(/\/student\/dashboard/)

  // Verify content
  await expect(page.locator('text=Welcome back')).toBeVisible()
  await expect(page.locator('text=Total Study Time')).toBeVisible()
})
```

---

## Using Test Fixtures

```typescript
import { activeUserFixture, getTestAttemptsResponse } from '@/tests/fixtures/dashboard-data'

// In unit test
global.fetch = jest.fn().mockResolvedValue({
  json: async () => getTestAttemptsResponse(activeUserFixture),
})

// In E2E test
await page.route('**/api/test-attempts*', (route) => {
  route.fulfill({
    status: 200,
    body: JSON.stringify(getTestAttemptsResponse(activeUserFixture)),
  })
})
```

### Available Fixtures

- `newUserFixture` - 0 tests taken
- `activeUserFixture` - 10 tests, 70% avg
- `highPerformerFixture` - 50 tests, 90% avg
- `strugglingUserFixture` - 20 tests, 40% avg
- `inactiveUserFixture` - 1 test, 30 days ago

---

## Debugging Failed Tests

### Unit Test Failures

```bash
# Run with more verbose output
npm test -- PersonalizedStudentDashboard --verbose

# Debug single test
npm test -- PersonalizedStudentDashboard -t "test name" --no-coverage

# Print component HTML
npm test -- PersonalizedStudentDashboard --debug
```

**Common Issues:**

- **"Cannot find module"** → Check import paths
- **"Not wrapped in act()"** → Use `waitFor()` for async operations
- **"Element not found"** → Component may still be loading, use `waitFor()`
- **"Mock not called"** → Check mock is set up before render

### E2E Test Failures

```bash
# Run in headed mode to see browser
npm run test:e2e -- --headed tests/e2e/student-dashboard

# Run in debug mode (pauses execution)
npm run test:e2e -- --debug tests/e2e/student-dashboard

# Slow down execution
npm run test:e2e -- --slow-mo=1000 tests/e2e/student-dashboard
```

**Check Test Results:**

- Screenshots: `/test-results/**/*.png`
- Videos: `/test-results/**/*.webm`
- Traces: `/test-results/**/*.zip` (open with `npx playwright show-trace`)

**Common Issues:**

- **Timeout errors** → Increase timeout or check if element exists
- **Element not visible** → Wait for animations to complete
- **Flaky tests** → Add explicit waits, avoid `waitForTimeout`

---

## Checking Coverage

```bash
# Generate coverage report
npm test -- --coverage

# View HTML report (opens in browser)
open coverage/lcov-report/index.html

# Check if coverage meets threshold (80%)
npm test -- --coverage --coverageThreshold='{"global":{"lines":80}}'
```

**Coverage Targets:**

- Overall: 85%+
- Critical functions: 100%
- UI components: 80%+

---

## CI/CD Pipeline

### Triggering Tests

Tests run automatically on:

- Every push to `main` or `develop`
- Every pull request
- Nightly (scheduled at 2 AM)

### Manual Trigger

```bash
# Push changes to trigger CI
git add .
git commit -m "test: add dashboard tests"
git push

# Or use GitHub Actions UI:
# 1. Go to Actions tab
# 2. Select "Student Dashboard Testing"
# 3. Click "Run workflow"
```

### Viewing Results

1. Go to GitHub repository
2. Click "Actions" tab
3. Click on latest workflow run
4. View test results by job:
   - Unit Tests
   - Integration Tests
   - E2E Tests (Chromium, Firefox, WebKit)
   - Accessibility Tests
   - Performance Tests
   - Mobile Tests
   - Security Tests

### Downloading Artifacts

Failed tests produce artifacts:

- Screenshots
- Videos
- Test reports
- Coverage reports

Download from workflow run page → Artifacts section

---

## Test Data Management

### Creating Test Users

```typescript
// In test
const testUser = {
  email: 'test@example.com',
  password: 'Test123!@#',
  name: 'Test Student',
}

// Use in E2E test
await page.fill('input[name="email"]', testUser.email)
await page.fill('input[name="password"]', testUser.password)
```

### Mocking API Responses

```typescript
// Mock successful response
global.fetch = jest.fn().mockResolvedValue({
  json: async () => ({
    success: true,
    data: { attempts: [...] }
  })
})

// Mock error
global.fetch = jest.fn().mockRejectedValue(new Error('API Error'))

// Mock 500 error
global.fetch = jest.fn().mockResolvedValue({
  status: 500,
  json: async () => ({ success: false, error: 'Server Error' })
})
```

### Cleaning Up Test Data

```bash
# Reset test database
npm run db:test:reset

# Seed with fresh data
npm run db:test:seed

# Clean up test files
rm -rf test-results/
rm -rf coverage/
```

---

## Common Test Patterns

### Testing Loading States

```typescript
it('shows loading skeleton', () => {
  render(<PersonalizedStudentDashboard />)
  expect(screen.getByText('Loading your dashboard data...')).toBeInTheDocument()
})
```

### Testing Empty States

```typescript
it('shows empty state for new users', async () => {
  global.fetch = jest.fn().mockResolvedValue({
    json: async () => ({ success: true, data: { attempts: [] } })
  })

  render(<PersonalizedStudentDashboard />)

  await waitFor(() => {
    expect(screen.getByText('Ready to Start Your Journey?')).toBeInTheDocument()
  })
})
```

### Testing User Interactions

```typescript
it('switches tabs on click', async () => {
  render(<PersonalizedStudentDashboard />)

  const studyTab = screen.getByText('Study Session')
  fireEvent.click(studyTab)

  await waitFor(() => {
    expect(screen.getByText('Focus Study Session')).toBeInTheDocument()
  })
})
```

### Testing API Errors

```typescript
it('handles API errors gracefully', async () => {
  global.fetch = jest.fn().mockRejectedValue(new Error('Network error'))

  render(<PersonalizedStudentDashboard />)

  await waitFor(() => {
    expect(screen.getByText(/error|try again/i)).toBeInTheDocument()
  })
})
```

---

## Performance Tips

### Speed Up Unit Tests

```bash
# Run in parallel (default)
npm test -- --maxWorkers=4

# Run sequentially (for debugging)
npm test -- --runInBand

# Only changed files
npm test -- --onlyChanged

# Skip coverage (faster)
npm test -- --no-coverage
```

### Speed Up E2E Tests

```typescript
// Use fast network conditions
use: {
  networkProfile: 'Fast 3G' // or 'No throttling'
}

// Reuse browser context
test.use({ storageState: 'auth.json' })

// Run tests in parallel
fullyParallel: true
```

---

## Getting Help

### Documentation

- **Full Test Plan:** `/docs/testing/STUDENT_DASHBOARD_TEST_PLAN.md`
- **Test Cases:** `/docs/testing/TEST_CASES_STUDENT_DASHBOARD.csv`
- **Summary:** `/docs/testing/TESTING_SUMMARY.md`

### External Resources

- [Jest Docs](https://jestjs.io/docs/getting-started)
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
- [Playwright Docs](https://playwright.dev/docs/intro)
- [Lighthouse CI](https://github.com/GoogleChrome/lighthouse-ci)

### Troubleshooting

- Check existing test files for examples
- Look at test fixtures in `/tests/fixtures/`
- Review CI logs for detailed error messages
- Ask QA team for help

---

## Checklist for New Features

When adding new dashboard features:

- [ ] Write unit tests for new components/functions
- [ ] Add integration tests for API changes
- [ ] Update E2E tests if user flow changes
- [ ] Add test fixtures for new data types
- [ ] Update test documentation
- [ ] Run full test suite locally
- [ ] Verify CI pipeline passes
- [ ] Check coverage stays above 85%
- [ ] Add visual regression tests if UI changes
- [ ] Update this quick start guide if needed

---

## Quick Reference Table

| Task                 | Command                                |
| -------------------- | -------------------------------------- |
| Run all tests        | `npm run test:all`                     |
| Run unit tests       | `npm test`                             |
| Run E2E tests        | `npm run test:e2e`                     |
| Run with coverage    | `npm test -- --coverage`               |
| Run single test file | `npm test -- fileName`                 |
| Run in watch mode    | `npm run test:watch`                   |
| Debug E2E test       | `npm run test:e2e -- --debug`          |
| View coverage report | `open coverage/lcov-report/index.html` |
| Run Lighthouse       | `npx lhci autorun`                     |
| Check accessibility  | `npm run test:accessibility`           |
| Reset test DB        | `npm run db:test:reset`                |

---

**Last Updated:** 2025-10-29
**Maintainer:** QA Team
**Questions?** Contact QA Lead or check full documentation
