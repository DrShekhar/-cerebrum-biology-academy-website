# Automated Test Recommendations

**Cerebrum Biology Academy - Test Automation Strategy**

Version: 1.0
Last Updated: 2025-10-29

---

## Table of Contents

1. [Overview](#overview)
2. [Testing Pyramid Strategy](#testing-pyramid-strategy)
3. [Recommended Testing Frameworks](#recommended-testing-frameworks)
4. [Unit Tests](#unit-tests)
5. [Integration Tests](#integration-tests)
6. [End-to-End Tests](#end-to-end-tests)
7. [API Tests](#api-tests)
8. [Implementation Roadmap](#implementation-roadmap)
9. [Sample Test Code](#sample-test-code)

---

## Overview

This document outlines the automated testing strategy for critical user journeys in the Cerebrum Biology Academy website. The goal is to:

- Automate repetitive manual tests
- Catch regressions early in development
- Enable continuous integration/deployment
- Reduce time-to-market for new features
- Improve overall code quality and reliability

**Current Test Coverage:**

- Existing: Playwright E2E tests (performance, security)
- Existing: Jest unit tests (configured)
- **Needed: Payment flow tests, enrollment tests, auth tests**

---

## Testing Pyramid Strategy

```
               /\
              /  \
            /  E2E  \         10-20% coverage
          /----------\
         /            \
       / Integration   \     30-40% coverage
     /------------------\
    /                    \
   /    Unit Tests        \  50-60% coverage
  /________________________\
```

**Recommended Distribution:**

- **Unit Tests:** 50-60% (fast, isolated, many tests)
- **Integration Tests:** 30-40% (API + database, moderate speed)
- **E2E Tests:** 10-20% (full user journeys, slower, critical paths only)

---

## Recommended Testing Frameworks

### Current Stack (Already Configured)

1. **Jest** - Unit & Integration Testing
   - Already configured in project
   - Config: `jest.config.cjs`, `jest.integration.config.js`
   - Use for: Component tests, utility functions, API route handlers

2. **Playwright** - End-to-End Testing
   - Already configured in project
   - Config: `playwright.config.ts`
   - Use for: Full user journey tests, cross-browser testing

3. **React Testing Library** - Component Testing
   - Already installed
   - Use for: React component unit tests with user interaction

### Additional Recommended Tools

4. **MSW (Mock Service Worker)** - API Mocking

   ```bash
   npm install --save-dev msw
   ```

   - Use for: Mocking Razorpay API, external services
   - Intercept network requests in tests

5. **Testing Library User Event** - User Simulation

   ```bash
   npm install --save-dev @testing-library/user-event
   ```

   - Already installed
   - Use for: Realistic user interactions (typing, clicking)

6. **Supertest** - API Testing
   ```bash
   npm install --save-dev supertest @types/supertest
   ```

   - Use for: Testing Next.js API routes directly

---

## Unit Tests

### What to Test

**Priority 1: Business Logic**

- [ ] Payment amount calculations
- [ ] Pricing plan logic
- [ ] Enrollment status determination
- [ ] User validation functions

**Priority 2: Utilities**

- [ ] Date formatting
- [ ] Currency conversion (rupees to paise)
- [ ] Form validation helpers
- [ ] Error message formatters

**Priority 3: Components**

- [ ] PricingSelector component
- [ ] Payment summary component
- [ ] Authentication forms
- [ ] Error boundaries

### Example: Test Purchase Amount Calculation

**File:** `src/lib/__tests__/pricing.test.ts`

```typescript
import { describe, it, expect } from '@jest/globals'

// Function to test
function calculatePriceInPaise(rupees: number): number {
  return Math.round(rupees * 100)
}

describe('Pricing Calculations', () => {
  it('should convert rupees to paise correctly', () => {
    expect(calculatePriceInPaise(35000)).toBe(3500000)
    expect(calculatePriceInPaise(9999)).toBe(999900)
  })

  it('should handle decimal amounts', () => {
    expect(calculatePriceInPaise(99.99)).toBe(9999)
  })

  it('should round to nearest paise', () => {
    expect(calculatePriceInPaise(100.005)).toBe(10001)
    expect(calculatePriceInPaise(100.004)).toBe(10000)
  })
})
```

### Example: Test Form Validation

**File:** `src/lib/__tests__/validation.test.ts`

```typescript
import { describe, it, expect } from '@jest/globals'

function validatePurchaseForm(data: {
  email?: string
  phone?: string
  name?: string
  amount?: number
}) {
  const errors: Record<string, string> = {}

  if (!data.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = 'Valid email is required'
  }

  if (!data.phone || !/^[6-9]\d{9}$/.test(data.phone)) {
    errors.phone = 'Valid 10-digit phone number is required'
  }

  if (!data.name || data.name.length < 2) {
    errors.name = 'Name must be at least 2 characters'
  }

  if (!data.amount || data.amount <= 0) {
    errors.amount = 'Amount must be positive'
  }

  return { valid: Object.keys(errors).length === 0, errors }
}

describe('Purchase Form Validation', () => {
  it('should validate correct form data', () => {
    const result = validatePurchaseForm({
      email: 'test@example.com',
      phone: '9876543210',
      name: 'Test Student',
      amount: 35000,
    })

    expect(result.valid).toBe(true)
    expect(result.errors).toEqual({})
  })

  it('should reject invalid email', () => {
    const result = validatePurchaseForm({
      email: 'invalid-email',
      phone: '9876543210',
      name: 'Test Student',
      amount: 35000,
    })

    expect(result.valid).toBe(false)
    expect(result.errors.email).toBeDefined()
  })

  it('should reject invalid phone number', () => {
    const result = validatePurchaseForm({
      email: 'test@example.com',
      phone: '12345',
      name: 'Test Student',
      amount: 35000,
    })

    expect(result.valid).toBe(false)
    expect(result.errors.phone).toBeDefined()
  })

  it('should reject short name', () => {
    const result = validatePurchaseForm({
      email: 'test@example.com',
      phone: '9876543210',
      name: 'A',
      amount: 35000,
    })

    expect(result.valid).toBe(false)
    expect(result.errors.name).toBeDefined()
  })

  it('should reject zero or negative amount', () => {
    const result = validatePurchaseForm({
      email: 'test@example.com',
      phone: '9876543210',
      name: 'Test Student',
      amount: 0,
    })

    expect(result.valid).toBe(false)
    expect(result.errors.amount).toBeDefined()
  })
})
```

**Run Unit Tests:**

```bash
npm test -- pricing.test.ts
npm test -- validation.test.ts
```

---

## Integration Tests

### What to Test

**Priority 1: API Routes**

- [ ] `/api/purchase` - POST (create enrollment)
- [ ] `/api/payments/verify` - POST (verify payment)
- [ ] `/api/auth/send-otp` - POST (send OTP)
- [ ] `/api/auth/verify-otp` - POST (verify OTP)
- [ ] `/api/auth/signin` - POST (email/password login)

**Priority 2: Database Operations**

- [ ] Enrollment creation
- [ ] Payment record creation
- [ ] Material access granting
- [ ] User creation

**Priority 3: External Service Integration**

- [ ] Razorpay order creation (mocked)
- [ ] Payment signature verification

### Example: Test Purchase API Route

**File:** `src/app/api/purchase/__tests__/route.test.ts`

```typescript
import { describe, it, expect, beforeEach, afterEach } from '@jest/globals'
import { POST } from '../route'
import { prisma } from '@/lib/prisma'

// Mock Razorpay
jest.mock('razorpay', () => {
  return jest.fn().mockImplementation(() => ({
    orders: {
      create: jest.fn().mockResolvedValue({
        id: 'order_test_123',
        entity: 'order',
        amount: 3500000,
        currency: 'INR',
        receipt: 'receipt_test',
        status: 'created',
        created_at: Date.now(),
      }),
    },
  }))
})

// Mock auth
jest.mock('@/lib/auth', () => ({
  auth: jest.fn().mockResolvedValue(null), // Guest checkout
  hashPassword: jest.fn().mockResolvedValue('hashed_password'),
}))

describe('POST /api/purchase', () => {
  let testCourse: any

  beforeEach(async () => {
    // Create test course
    testCourse = await prisma.course.create({
      data: {
        id: 'test-course-1',
        name: 'Test Course',
        description: 'Test Description',
        type: 'ONLINE',
        class: 'CLASS_11',
        duration: 12,
        totalFees: 3500000,
        isActive: true,
      },
    })
  })

  afterEach(async () => {
    // Cleanup
    await prisma.payment.deleteMany({})
    await prisma.enrollment.deleteMany({})
    await prisma.user.deleteMany({
      where: { email: 'test@example.com' },
    })
    await prisma.course.deleteMany({
      where: { id: 'test-course-1' },
    })
  })

  it('should create enrollment and order for guest checkout', async () => {
    const request = new Request('http://localhost:3001/api/purchase', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        courseId: 'test-course-1',
        planType: 'FULL',
        amount: 35000,
        email: 'test@example.com',
        phone: '9876543210',
        name: 'Test Student',
      }),
    })

    const response = await POST(request)
    const data = await response.json()

    expect(response.status).toBe(200)
    expect(data.success).toBe(true)
    expect(data.enrollmentId).toBeDefined()
    expect(data.paymentId).toBeDefined()
    expect(data.order.id).toMatch(/^order_/)
    expect(data.order.amount).toBe(3500000)

    // Verify database records created
    const enrollment = await prisma.enrollment.findUnique({
      where: { id: data.enrollmentId },
    })
    expect(enrollment).toBeDefined()
    expect(enrollment?.status).toBe('PENDING')

    const payment = await prisma.payment.findUnique({
      where: { id: data.paymentId },
    })
    expect(payment).toBeDefined()
    expect(payment?.status).toBe('PENDING')
  })

  it('should reject purchase with missing email', async () => {
    const request = new Request('http://localhost:3001/api/purchase', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        courseId: 'test-course-1',
        planType: 'FULL',
        amount: 35000,
        phone: '9876543210',
        name: 'Test Student',
        // email missing
      }),
    })

    const response = await POST(request)
    const data = await response.json()

    expect(response.status).toBe(400)
    expect(data.success).toBe(false)
    expect(data.error).toContain('Email')
  })

  it('should prevent duplicate enrollment', async () => {
    // First purchase
    const request1 = new Request('http://localhost:3001/api/purchase', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        courseId: 'test-course-1',
        planType: 'FULL',
        amount: 35000,
        email: 'test@example.com',
        phone: '9876543210',
        name: 'Test Student',
      }),
    })

    const response1 = await POST(request1)
    const data1 = await response1.json()

    // Activate enrollment
    await prisma.enrollment.update({
      where: { id: data1.enrollmentId },
      data: { status: 'ACTIVE' },
    })

    // Try to purchase again
    const request2 = new Request('http://localhost:3001/api/purchase', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        courseId: 'test-course-1',
        planType: 'FULL',
        amount: 35000,
        email: 'test@example.com',
        phone: '9876543210',
        name: 'Test Student',
      }),
    })

    const response2 = await POST(request2)
    const data2 = await response2.json()

    expect(response2.status).toBe(400)
    expect(data2.success).toBe(false)
    expect(data2.error).toContain('already enrolled')
  })
})
```

**Run Integration Tests:**

```bash
npm run test:integration -- route.test.ts
```

### Example: Test Payment Verification

**File:** `src/app/api/payments/verify/__tests__/route.test.ts`

```typescript
import { describe, it, expect, beforeEach, afterEach } from '@jest/globals'
import { POST } from '../route'
import { prisma } from '@/lib/prisma'
import crypto from 'crypto'

describe('POST /api/payments/verify', () => {
  let testUser: any
  let testCourse: any
  let testEnrollment: any
  let testPayment: any

  const RAZORPAY_KEY_SECRET = process.env.RAZORPAY_KEY_SECRET || 'test_secret'

  beforeEach(async () => {
    // Setup test data
    testUser = await prisma.user.create({
      data: {
        email: 'verify-test@example.com',
        name: 'Verify Test User',
        phone: '9111111111',
        passwordHash: 'hash',
        role: 'STUDENT',
      },
    })

    testCourse = await prisma.course.create({
      data: {
        id: 'verify-test-course',
        name: 'Verify Test Course',
        type: 'ONLINE',
        class: 'CLASS_11',
        duration: 12,
        totalFees: 3500000,
        isActive: true,
      },
    })

    testEnrollment = await prisma.enrollment.create({
      data: {
        userId: testUser.id,
        courseId: testCourse.id,
        status: 'PENDING',
        totalFees: 3500000,
        paidAmount: 0,
        pendingAmount: 3500000,
        paymentPlan: 'FULL',
      },
    })

    testPayment = await prisma.payment.create({
      data: {
        userId: testUser.id,
        enrollmentId: testEnrollment.id,
        amount: 3500000,
        currency: 'INR',
        status: 'PENDING',
        razorpayOrderId: 'order_test_verify_123',
      },
    })

    // Create some test materials
    await prisma.studyMaterial.createMany({
      data: [
        {
          courseId: testCourse.id,
          title: 'Material 1',
          type: 'PDF',
          isPublished: true,
        },
        {
          courseId: testCourse.id,
          title: 'Material 2',
          type: 'VIDEO',
          isPublished: true,
        },
      ],
    })
  })

  afterEach(async () => {
    await prisma.materialAccess.deleteMany({})
    await prisma.studyMaterial.deleteMany({})
    await prisma.payment.deleteMany({})
    await prisma.enrollment.deleteMany({})
    await prisma.course.deleteMany({ where: { id: 'verify-test-course' } })
    await prisma.user.deleteMany({ where: { email: 'verify-test@example.com' } })
  })

  it('should verify payment and activate enrollment', async () => {
    const orderId = 'order_test_verify_123'
    const paymentId = 'pay_test_verify_456'
    const body = `${orderId}|${paymentId}`
    const signature = crypto.createHmac('sha256', RAZORPAY_KEY_SECRET).update(body).digest('hex')

    const request = new Request('http://localhost:3001/api/payments/verify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        razorpay_order_id: orderId,
        razorpay_payment_id: paymentId,
        razorpay_signature: signature,
      }),
    })

    const response = await POST(request)
    const data = await response.json()

    expect(response.status).toBe(200)
    expect(data.verified).toBe(true)

    // Check payment updated
    const updatedPayment = await prisma.payment.findFirst({
      where: { razorpayOrderId: orderId },
    })
    expect(updatedPayment?.status).toBe('COMPLETED')
    expect(updatedPayment?.razorpayPaymentId).toBe(paymentId)
    expect(updatedPayment?.completedAt).toBeDefined()

    // Check enrollment activated
    const updatedEnrollment = await prisma.enrollment.findUnique({
      where: { id: testEnrollment.id },
    })
    expect(updatedEnrollment?.status).toBe('ACTIVE')
    expect(updatedEnrollment?.paidAmount).toBe(3500000)
    expect(updatedEnrollment?.startDate).toBeDefined()

    // Check material access granted
    const materialAccess = await prisma.materialAccess.findMany({
      where: { userId: testUser.id },
    })
    expect(materialAccess.length).toBeGreaterThan(0)
  })

  it('should reject invalid signature', async () => {
    const orderId = 'order_test_verify_123'
    const paymentId = 'pay_test_verify_456'
    const invalidSignature = 'invalid_signature_hash'

    const request = new Request('http://localhost:3001/api/payments/verify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        razorpay_order_id: orderId,
        razorpay_payment_id: paymentId,
        razorpay_signature: invalidSignature,
      }),
    })

    const response = await POST(request)
    const data = await response.json()

    expect(response.status).toBe(200)
    expect(data.verified).toBe(false)

    // Check payment still pending
    const payment = await prisma.payment.findFirst({
      where: { razorpayOrderId: orderId },
    })
    expect(payment?.status).toBe('PENDING')
  })
})
```

---

## End-to-End Tests

### What to Test

**Priority 1: Critical User Journeys**

- [ ] Complete purchase flow (guest checkout)
- [ ] Login → Browse → Purchase flow
- [ ] Mobile OTP authentication flow

**Priority 2: Important Features**

- [ ] Course browsing and filtering
- [ ] Dashboard access after enrollment
- [ ] Material access after payment

### Example: E2E Purchase Flow Test

**File:** `tests/e2e/purchase-flow.spec.ts`

```typescript
import { test, expect } from '@playwright/test'

test.describe('Complete Purchase Flow', () => {
  test('should complete guest checkout purchase successfully', async ({ page }) => {
    // Step 1: Navigate to homepage
    await page.goto('http://localhost:3001/')
    await expect(page).toHaveTitle(/Cerebrum Biology Academy/)

    // Step 2: Navigate to courses
    await page.click('text=View Courses')
    await expect(page).toHaveURL(/\/courses/)

    // Step 3: Select Class 11 course
    await page.click('text=Class 11')
    await page.click('text=Enroll Now')

    // Step 4: Verify redirect to purchase page
    await expect(page).toHaveURL(/\/purchase\/class-11/)

    // Step 5: Select pricing plan
    await page.click('[data-testid="plan-annual"]')
    await expect(page.locator('[data-testid="plan-annual"]')).toHaveClass(/selected/)

    // Step 6: Proceed to payment
    await page.click('button:has-text("Proceed to Payment")')

    // Step 7: Fill guest checkout form
    await page.fill('input[name="name"]', 'E2E Test Student')
    await page.fill('input[name="email"]', `e2e-test-${Date.now()}@example.com`)
    await page.fill('input[name="phone"]', '9876543210')
    await page.click('button:has-text("Continue")')

    // Step 8: Wait for Razorpay modal (in test mode, may need to mock)
    // NOTE: For full E2E, you'll need to handle Razorpay modal
    // This is challenging as Razorpay loads in an iframe

    // For test purposes, you might:
    // 1. Mock Razorpay in test environment
    // 2. Use test API endpoints to simulate payment
    // 3. Verify order creation happened

    // Check that API call was made
    const apiResponse = await page.waitForResponse(
      (response) => response.url().includes('/api/purchase') && response.status() === 200
    )

    const responseData = await apiResponse.json()
    expect(responseData.success).toBe(true)
    expect(responseData.order.id).toMatch(/^order_/)

    // In a real test, you'd continue to verify payment
    // For now, we've verified the flow up to payment initiation
  })

  test('should show error for invalid email', async ({ page }) => {
    await page.goto('http://localhost:3001/purchase/class-11')

    // Select plan
    await page.click('[data-testid="plan-monthly"]')
    await page.click('button:has-text("Proceed to Payment")')

    // Enter invalid email
    await page.fill('input[name="name"]', 'Test Student')
    await page.fill('input[name="email"]', 'invalid-email')
    await page.fill('input[name="phone"]', '9876543210')
    await page.click('button:has-text("Continue")')

    // Should show validation error
    await expect(page.locator('text=/valid email/i')).toBeVisible()
  })
})
```

**Run E2E Tests:**

```bash
npm run test:e2e -- purchase-flow.spec.ts
```

### Example: E2E Authentication Flow Test

**File:** `tests/e2e/auth-flow.spec.ts`

```typescript
import { test, expect } from '@playwright/test'

test.describe('Authentication Flow', () => {
  test('should login with email and password', async ({ page }) => {
    await page.goto('http://localhost:3001/auth/signin')

    // Select email auth method
    await page.click('button:has-text("Email")')

    // Enter credentials
    await page.fill('input[type="email"]', 'test@example.com')
    await page.fill('input[type="password"]', 'TestPassword123')

    // Submit
    await page.click('button:has-text("Sign In")')

    // Should redirect to dashboard
    await expect(page).toHaveURL(/\/dashboard/, { timeout: 10000 })
  })

  test('should handle mobile OTP flow', async ({ page }) => {
    await page.goto('http://localhost:3001/auth/signin')

    // Select mobile OTP method
    await page.click('button:has-text("Mobile OTP")')

    // Enter mobile number
    await page.fill('input[type="tel"]', '9876543210')

    // Click Send OTP
    await page.click('button:has-text("Send OTP")')

    // Wait for OTP screen
    await expect(page.locator('text=Verify OTP')).toBeVisible({ timeout: 5000 })

    // In test mode, you'd need to either:
    // 1. Mock the OTP service
    // 2. Use a fixed test OTP
    // 3. Retrieve OTP from test database

    // For demo purposes:
    await page.fill('input[placeholder*="OTP"]', '123456')
    await page.click('button:has-text("Verify")')

    // Depending on test setup, verify success or error
  })

  test('should redirect unauthenticated user from protected route', async ({ page }) => {
    await page.goto('http://localhost:3001/dashboard')

    // Should redirect to login
    await expect(page).toHaveURL(/\/auth\/signin/)
  })
})
```

---

## API Tests

### What to Test

**All API Routes with:**

- [ ] Valid inputs
- [ ] Invalid inputs
- [ ] Missing required fields
- [ ] Unauthorized access
- [ ] Edge cases (boundary values)

### Example: API Test Suite with Supertest

**File:** `tests/api/purchase.api.test.ts`

```typescript
import request from 'supertest'
import { describe, it, expect, beforeAll, afterAll } from '@jest/globals'

const BASE_URL = process.env.TEST_API_URL || 'http://localhost:3001'

describe('Purchase API', () => {
  let testCourseId = 'class-11'

  describe('POST /api/purchase', () => {
    it('should create order with valid data', async () => {
      const response = await request(BASE_URL)
        .post('/api/purchase')
        .send({
          courseId: testCourseId,
          planType: 'FULL',
          amount: 35000,
          email: `test-${Date.now()}@example.com`,
          phone: '9876543210',
          name: 'API Test Student',
        })
        .expect(200)

      expect(response.body.success).toBe(true)
      expect(response.body.enrollmentId).toBeDefined()
      expect(response.body.order.id).toMatch(/^order_/)
    })

    it('should return 400 for missing email', async () => {
      const response = await request(BASE_URL)
        .post('/api/purchase')
        .send({
          courseId: testCourseId,
          planType: 'FULL',
          amount: 35000,
          phone: '9876543210',
          name: 'API Test Student',
          // email missing
        })
        .expect(400)

      expect(response.body.success).toBe(false)
    })

    it('should return 404 for invalid course', async () => {
      const response = await request(BASE_URL)
        .post('/api/purchase')
        .send({
          courseId: 'invalid-course-id',
          planType: 'FULL',
          amount: 35000,
          email: 'test@example.com',
          phone: '9876543210',
          name: 'API Test Student',
        })
        .expect(404)

      expect(response.body.success).toBe(false)
    })
  })

  describe('GET /api/purchase', () => {
    it('should check eligibility for guest user', async () => {
      const response = await request(BASE_URL)
        .get(`/api/purchase?courseId=${testCourseId}`)
        .expect(200)

      expect(response.body.eligible).toBe(true)
      expect(response.body.requiresAuth).toBe(false)
    })
  })
})
```

---

## Implementation Roadmap

### Phase 1: Foundation (Week 1-2)

- [ ] Set up test database (separate from dev)
- [ ] Configure test environment variables
- [ ] Create test data seeding scripts
- [ ] Set up MSW for API mocking
- [ ] Write first 5 unit tests (pricing, validation)

### Phase 2: API Tests (Week 3-4)

- [ ] Test all critical API routes
- [ ] Test database operations
- [ ] Test error handling
- [ ] Achieve 70% API coverage

### Phase 3: E2E Tests (Week 5-6)

- [ ] Test complete purchase flow
- [ ] Test authentication flows
- [ ] Test protected routes
- [ ] Add visual regression tests (optional)

### Phase 4: CI/CD Integration (Week 7-8)

- [ ] Set up GitHub Actions workflow
- [ ] Run tests on every PR
- [ ] Run tests before deployment
- [ ] Add test coverage reporting

### Phase 5: Maintenance & Expansion

- [ ] Add tests for new features
- [ ] Refactor existing tests
- [ ] Improve test performance
- [ ] Increase coverage to 80%+

---

## Sample Test Code

### Complete Component Test Example

**File:** `src/components/purchase/__tests__/PricingSelector.test.tsx`

```typescript
import { render, screen, fireEvent } from '@testing-library/react'
import { PricingSelector, PricingPlan } from '../PricingSelector'
import '@testing-library/jest-dom'

const mockPlans: PricingPlan[] = [
  {
    id: 'monthly',
    name: 'Monthly Plan',
    price: 3500,
    duration: 'Per Month',
    paymentType: 'MONTHLY',
    features: ['Feature 1', 'Feature 2'],
  },
  {
    id: 'annual',
    name: 'Annual Plan',
    price: 35000,
    duration: '12 Months',
    paymentType: 'FULL',
    popular: true,
    savings: 'Save ₹7,000',
    features: ['Feature 1', 'Feature 2', 'Feature 3'],
  },
]

describe('PricingSelector', () => {
  it('should render all pricing plans', () => {
    const onSelect = jest.fn()
    render(<PricingSelector plans={mockPlans} onSelectPlan={onSelect} />)

    expect(screen.getByText('Monthly Plan')).toBeInTheDocument()
    expect(screen.getByText('Annual Plan')).toBeInTheDocument()
  })

  it('should show popular badge on popular plan', () => {
    const onSelect = jest.fn()
    render(<PricingSelector plans={mockPlans} onSelectPlan={onSelect} />)

    expect(screen.getByText(/popular/i)).toBeInTheDocument()
  })

  it('should call onSelectPlan when plan is clicked', () => {
    const onSelect = jest.fn()
    render(<PricingSelector plans={mockPlans} onSelectPlan={onSelect} />)

    const annualPlan = screen.getByText('Annual Plan').closest('div')
    fireEvent.click(annualPlan!)

    expect(onSelect).toHaveBeenCalledWith(mockPlans[1])
  })

  it('should highlight selected plan', () => {
    const onSelect = jest.fn()
    render(<PricingSelector plans={mockPlans} onSelectPlan={onSelect} selectedPlanId="annual" />)

    const annualPlan = screen.getByText('Annual Plan').closest('div')
    expect(annualPlan).toHaveClass('selected')
  })

  it('should display savings badge', () => {
    const onSelect = jest.fn()
    render(<PricingSelector plans={mockPlans} onSelectPlan={onSelect} />)

    expect(screen.getByText('Save ₹7,000')).toBeInTheDocument()
  })
})
```

**Run Component Tests:**

```bash
npm test -- PricingSelector.test.tsx
```

---

## Test Coverage Goals

### Current Coverage Target by Module

| Module         | Target Coverage | Priority |
| -------------- | --------------- | -------- |
| API Routes     | 80%             | P0       |
| Business Logic | 90%             | P0       |
| Components     | 70%             | P1       |
| Utilities      | 95%             | P1       |
| Pages          | 50%             | P2       |

### Running Coverage Reports

```bash
# Run all tests with coverage
npm run test:coverage

# View coverage report
open coverage/lcov-report/index.html
```

---

## Continuous Integration Setup

### GitHub Actions Workflow

**File:** `.github/workflows/test.yml`

```yaml
name: Run Tests

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main, develop]

jobs:
  test:
    runs-on: ubuntu-latest

    services:
      postgres:
        image: postgres:14
        env:
          POSTGRES_PASSWORD: postgres
          POSTGRES_DB: test_db
        options: >-
          --health-cmd pg_isready
          --health-interval 10s
          --health-timeout 5s
          --health-retries 5
        ports:
          - 5432:5432

    steps:
      - uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '20'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Run database migrations
        run: npm run db:migrate
        env:
          DATABASE_URL: postgresql://postgres:postgres@localhost:5432/test_db

      - name: Run unit tests
        run: npm test

      - name: Run integration tests
        run: npm run test:integration
        env:
          DATABASE_URL: postgresql://postgres:postgres@localhost:5432/test_db
          RAZORPAY_KEY_SECRET: test_secret
          NEXT_PUBLIC_RAZORPAY_KEY_ID: rzp_test_dummy

      - name: Upload coverage reports
        uses: codecov/codecov-action@v3
        with:
          files: ./coverage/lcov.info
```

---

## Best Practices

### 1. Test Naming Conventions

```typescript
// Good
it('should create enrollment with valid data')
it('should reject payment with invalid signature')
it('should redirect unauthenticated user to login')

// Bad
it('test1')
it('works')
it('enrollment')
```

### 2. Test Organization

```
tests/
├── unit/
│   ├── lib/
│   │   ├── pricing.test.ts
│   │   └── validation.test.ts
│   └── components/
│       └── PricingSelector.test.tsx
├── integration/
│   └── api/
│       ├── purchase.test.ts
│       └── payments.test.ts
└── e2e/
    ├── purchase-flow.spec.ts
    └── auth-flow.spec.ts
```

### 3. Test Data Management

```typescript
// Use factories or fixtures
export const createTestUser = (overrides = {}) => ({
  email: 'test@example.com',
  name: 'Test User',
  phone: '9876543210',
  role: 'STUDENT',
  ...overrides,
})

export const createTestCourse = (overrides = {}) => ({
  id: 'test-course',
  name: 'Test Course',
  type: 'ONLINE',
  class: 'CLASS_11',
  duration: 12,
  totalFees: 3500000,
  ...overrides,
})
```

### 4. Cleanup After Tests

```typescript
afterEach(async () => {
  // Clean up test data
  await prisma.payment.deleteMany({
    where: { userId: testUser.id },
  })
  await prisma.enrollment.deleteMany({
    where: { userId: testUser.id },
  })
  await prisma.user.delete({
    where: { id: testUser.id },
  })
})
```

### 5. Mock External Services

```typescript
// Mock Razorpay
jest.mock('razorpay', () => {
  return jest.fn().mockImplementation(() => ({
    orders: {
      create: jest.fn().mockResolvedValue({
        id: 'order_test_123',
        amount: 3500000,
        currency: 'INR',
        status: 'created',
      }),
    },
  }))
})
```

---

## Monitoring Test Results

### Metrics to Track

1. **Test Pass Rate:** Should be > 95%
2. **Test Execution Time:** Unit tests < 5s, Integration < 30s, E2E < 5 min
3. **Code Coverage:** Overall > 80%
4. **Flaky Tests:** Should be 0%
5. **Test Maintenance Time:** < 10% of development time

### Tools for Monitoring

- **Jest Coverage Report:** Built-in
- **Codecov:** For coverage tracking over time
- **GitHub Actions:** For CI/CD test runs
- **Playwright Test Report:** For E2E test results

---

## Next Steps

1. **Start Small:** Begin with 5-10 critical unit tests
2. **Add API Tests:** Test purchase and payment verification APIs
3. **Add E2E Tests:** Test complete purchase flow
4. **Integrate CI/CD:** Run tests on every commit
5. **Iterate:** Add more tests as you build new features

---

## Useful Commands Reference

```bash
# Run all unit tests
npm test

# Run specific test file
npm test -- pricing.test.ts

# Run tests in watch mode
npm run test:watch

# Run integration tests
npm run test:integration

# Run E2E tests
npm run test:e2e

# Run all tests with coverage
npm run test:coverage

# Run tests for specific module
npm test -- src/lib/__tests__

# Update snapshots
npm test -- -u

# Run tests in debug mode
node --inspect-brk node_modules/.bin/jest --runInBand
```

---

**End of Automated Test Recommendations**
