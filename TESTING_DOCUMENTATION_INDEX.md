# Testing Documentation Index

**Cerebrum Biology Academy - Complete Testing Guide**

Version: 1.0
Last Updated: 2025-10-29

---

## Overview

This index provides a comprehensive overview of all testing documentation for the Cerebrum Biology Academy website. Use this as your starting point for understanding the testing strategy and finding specific testing guides.

---

## Quick Links

| Document                                                                 | Purpose                                      | When to Use                              |
| ------------------------------------------------------------------------ | -------------------------------------------- | ---------------------------------------- |
| [TESTING_CHECKLIST.md](./TESTING_CHECKLIST.md)                           | Manual test cases for critical user journeys | Before each release, during QA           |
| [AUTOMATED_TEST_RECOMMENDATIONS.md](./AUTOMATED_TEST_RECOMMENDATIONS.md) | Guide for implementing automated tests       | When setting up CI/CD, writing new tests |
| [ENVIRONMENT_TESTING_GUIDE.md](./ENVIRONMENT_TESTING_GUIDE.md)           | Testing across dev, staging, and production  | For environment-specific testing         |
| [ERROR_SCENARIO_TESTING.md](./ERROR_SCENARIO_TESTING.md)                 | Testing error handling and edge cases        | During QA, when debugging issues         |
| [PAYMENT_TESTING_CHECKLIST.md](./PAYMENT_TESTING_CHECKLIST.md)           | Detailed payment flow testing                | Before payment feature releases          |
| [RAZORPAY_SETUP_GUIDE.md](./RAZORPAY_SETUP_GUIDE.md)                     | Razorpay integration setup and testing       | Initial setup, troubleshooting payments  |

---

## Testing Documentation Structure

```
Testing Documentation/
│
├── TESTING_DOCUMENTATION_INDEX.md (This file)
│   └── Overview and navigation
│
├── TESTING_CHECKLIST.md
│   ├── Manual test cases
│   ├── Step-by-step procedures
│   ├── Expected results
│   └── Database verification queries
│
├── AUTOMATED_TEST_RECOMMENDATIONS.md
│   ├── Testing pyramid strategy
│   ├── Unit test examples
│   ├── Integration test examples
│   ├── E2E test examples
│   └── CI/CD setup guide
│
├── ENVIRONMENT_TESTING_GUIDE.md
│   ├── Development testing
│   ├── Staging testing
│   ├── Production testing
│   └── Environment setup instructions
│
├── ERROR_SCENARIO_TESTING.md
│   ├── Payment error scenarios
│   ├── Network failure scenarios
│   ├── Database error scenarios
│   ├── Authentication errors
│   └── Input validation errors
│
├── PAYMENT_TESTING_CHECKLIST.md
│   ├── Razorpay integration testing
│   ├── Test card numbers
│   ├── Payment verification
│   └── Troubleshooting guide
│
└── RAZORPAY_SETUP_GUIDE.md
    ├── Razorpay account setup
    ├── Environment configuration
    ├── Webhook setup
    └── Testing with test keys
```

---

## Critical User Journeys

### Journey 1: Homepage → Course Selection

**Document:** [TESTING_CHECKLIST.md](./TESTING_CHECKLIST.md#critical-path-1-homepage--course-selection)

- Homepage loads without errors
- Course cards display correctly
- Navigation works
- CTA buttons functional

### Journey 2: Course Selection → Purchase Page

**Document:** [TESTING_CHECKLIST.md](./TESTING_CHECKLIST.md#critical-path-2-course-selection--purchase-page)

- Purchase page loads for all course IDs
- Pricing displays correctly
- Payment plans show (FULL, QUARTERLY, MONTHLY)
- Guest checkout form renders

### Journey 3: Purchase → Payment

**Documents:**

- [TESTING_CHECKLIST.md](./TESTING_CHECKLIST.md#critical-path-3-purchase--payment)
- [PAYMENT_TESTING_CHECKLIST.md](./PAYMENT_TESTING_CHECKLIST.md)

**Key Tests:**

- Form validation works
- API call to `/api/purchase` succeeds
- Razorpay modal opens
- Test payments succeed/fail as expected

### Journey 4: Payment → Enrollment

**Document:** [TESTING_CHECKLIST.md](./TESTING_CHECKLIST.md#critical-path-4-payment--enrollment)

- Payment verification endpoint works
- Enrollment creation logic present
- Material access granting implemented
- Success state handled

### Journey 5: Authentication Flow

**Document:** [TESTING_CHECKLIST.md](./TESTING_CHECKLIST.md#critical-path-5-authentication-flow)

- Login page accessible
- Registration works
- Session management
- Protected routes redirect correctly

---

## Testing by Type

### Manual Testing

**Primary Document:** [TESTING_CHECKLIST.md](./TESTING_CHECKLIST.md)

**Use Cases:**

- Pre-release QA
- Feature validation
- User acceptance testing
- Exploratory testing

**Time Estimates:**

- Quick smoke test: 10-15 minutes
- Comprehensive test: 1-2 hours
- Full regression: 3-4 hours

---

### Automated Testing

**Primary Document:** [AUTOMATED_TEST_RECOMMENDATIONS.md](./AUTOMATED_TEST_RECOMMENDATIONS.md)

**Test Types:**

#### 1. Unit Tests (50-60% coverage)

```bash
npm test
```

- Business logic
- Utility functions
- Form validation
- Price calculations

**Example Files:**

- `src/lib/__tests__/pricing.test.ts`
- `src/lib/__tests__/validation.test.ts`

#### 2. Integration Tests (30-40% coverage)

```bash
npm run test:integration
```

- API routes
- Database operations
- Payment verification
- Enrollment creation

**Example Files:**

- `src/app/api/purchase/__tests__/route.test.ts`
- `src/app/api/payments/verify/__tests__/route.test.ts`

#### 3. E2E Tests (10-20% coverage)

```bash
npm run test:e2e
```

- Complete user journeys
- Cross-browser testing
- Critical path verification

**Example Files:**

- `tests/e2e/purchase-flow.spec.ts`
- `tests/e2e/auth-flow.spec.ts`

---

### Error Scenario Testing

**Primary Document:** [ERROR_SCENARIO_TESTING.md](./ERROR_SCENARIO_TESTING.md)

**Categories:**

#### Payment Errors

- Payment declined
- Verification failed
- SDK load failure
- User cancellation
- Duplicate payment

#### Network Errors

- API timeout
- Network loss
- Server unreachable (500)
- Slow connection

#### Database Errors

- Connection lost
- Transaction rollback
- Constraint violation

#### Authentication Errors

- Invalid credentials
- OTP expired
- Rate limiting
- Session expired

#### Validation Errors

- Invalid email/phone
- SQL injection attempts
- XSS attempts
- Invalid amounts

---

## Testing by Environment

### Development Environment

**Document:** [ENVIRONMENT_TESTING_GUIDE.md](./ENVIRONMENT_TESTING_GUIDE.md#development-environment-testing)

**Setup:**

```bash
cd /Users/drshekhar/cerebrum-biology-academy-website
npm install
npm run db:migrate:dev
npm run db:seed
npm run dev
```

**Testing Scope:** Full testing, all features, all scenarios

**Key Points:**

- Use test Razorpay keys
- Test data can be reset anytime
- Console logs for debugging
- DevTools for inspection

---

### Staging Environment

**Document:** [ENVIRONMENT_TESTING_GUIDE.md](./ENVIRONMENT_TESTING_GUIDE.md#staging-environment-testing)

**URL:** `https://staging.cerebrumbioacademy.com`

**Testing Scope:** Full regression, UAT, performance testing

**Key Points:**

- Still uses test Razorpay keys
- Mirrors production environment
- Used for pre-release validation
- Performance benchmarking

---

### Production Environment

**Document:** [ENVIRONMENT_TESTING_GUIDE.md](./ENVIRONMENT_TESTING_GUIDE.md#production-environment-testing)

**URL:** `https://www.cerebrumbioacademy.com`

**Testing Scope:** Smoke tests only, health checks

**Key Points:**

- Uses live Razorpay keys
- Real user data
- Minimal testing
- Monitor, don't test

---

## Test Data Reference

### Test User Accounts

**Development/Staging:**

```
Email: test@example.com
Password: TestPassword123
Phone: 9876543210
```

**Production:**
⚠️ Use real accounts only with permission

---

### Test Payment Methods

#### Test Cards (Razorpay Test Mode)

| Card Number         | Result    | Use Case           |
| ------------------- | --------- | ------------------ |
| 4111 1111 1111 1111 | Success   | Happy path testing |
| 4000 0000 0000 0002 | Failure   | Error handling     |
| 4000 0027 6000 3184 | 3D Secure | OTP flow testing   |

**CVV:** Any 3 digits (e.g., 123)
**Expiry:** Any future date (e.g., 12/26)

#### Test UPI IDs

| UPI ID           | Result           |
| ---------------- | ---------------- |
| success@razorpay | Payment succeeds |
| failure@razorpay | Payment fails    |

---

### Test Courses

| Course ID | Name               | Price Range      |
| --------- | ------------------ | ---------------- |
| class-11  | Class 11th Biology | ₹3,500 - ₹35,000 |
| class-12  | Class 12th Biology | ₹5,000 - ₹50,000 |
| dropper   | Dropper Batch      | TBD              |

---

## Common Testing Workflows

### Workflow 1: Pre-Release QA

**Time:** 2-3 hours

1. **Run Automated Tests**

   ```bash
   npm test
   npm run test:integration
   npm run test:e2e
   ```

2. **Manual Smoke Tests** (Staging)
   - Follow [TESTING_CHECKLIST.md](./TESTING_CHECKLIST.md)
   - Test all critical paths (5 journeys)
   - Verify error handling

3. **Database Verification**

   ```bash
   npm run db:studio
   # Check: Enrollment, Payment, MaterialAccess tables
   ```

4. **Sign-off**
   - All tests passed
   - No critical bugs
   - Performance acceptable
   - Ready for production

---

### Workflow 2: Payment Feature Testing

**Time:** 1 hour

1. **Setup**
   - Verify Razorpay test keys configured
   - Clear test data: `npm run db:migrate:reset`
   - Seed fresh data: `npm run db:seed`

2. **Follow Payment Checklist**
   - See [PAYMENT_TESTING_CHECKLIST.md](./PAYMENT_TESTING_CHECKLIST.md)
   - Test all payment methods (Card, UPI, Net Banking)
   - Test error scenarios
   - Verify database updates

3. **Error Scenario Testing**
   - See [ERROR_SCENARIO_TESTING.md](./ERROR_SCENARIO_TESTING.md)
   - Test payment failures
   - Test network issues
   - Test cancellation

4. **Verification**
   - Check payment records in database
   - Check enrollment activation
   - Check material access granted

---

### Workflow 3: Deployment Verification

**Time:** 15-30 minutes

**After Staging Deployment:**

1. Run smoke tests (10 minutes)
2. Test critical path (purchase flow)
3. Check error logs in Vercel
4. Verify environment variables

**After Production Deployment:**

1. Run production smoke tests (5 minutes)
2. Monitor error logs
3. Check health endpoint
4. Monitor user activity

See: [ENVIRONMENT_TESTING_GUIDE.md](./ENVIRONMENT_TESTING_GUIDE.md#production-smoke-tests)

---

## Test Execution Tracking

### Test Run Template

```markdown
## Test Execution Report

**Date:** 2025-10-29
**Tester:** [Name]
**Environment:** Development / Staging / Production
**Build/Commit:** [Git commit hash]

### Test Summary

| Category         | Total  | Passed | Failed | Blocked |
| ---------------- | ------ | ------ | ------ | ------- |
| Homepage         | 4      | 4      | 0      | 0       |
| Course Selection | 4      | 3      | 1      | 0       |
| Purchase Flow    | 7      | 6      | 1      | 0       |
| Payment          | 7      | 7      | 0      | 0       |
| Enrollment       | 6      | 6      | 0      | 0       |
| Authentication   | 7      | 7      | 0      | 0       |
| **Total**        | **35** | **33** | **2**  | **0**   |

### Failed Tests

1. **Test Case 2.3:** Plan selection visual feedback
   - **Status:** FAIL
   - **Issue:** Selected plan doesn't highlight
   - **Severity:** P2 (Medium)
   - **Repro Steps:** [Link to test case]
   - **Bug Ticket:** #123

2. **Test Case 3.2:** Purchase API timeout handling
   - **Status:** FAIL
   - **Issue:** No loading indicator shown
   - **Severity:** P3 (Low)
   - **Repro Steps:** [Link to test case]
   - **Bug Ticket:** #124

### Recommendations

- [ ] Fix P2 bug before release
- [ ] P3 bug can be addressed in next iteration
- [ ] Add automated test for plan selection

**Sign-off:** Ready for release / Not ready
```

---

## Useful Commands

### Development

```bash
# Start dev server
npm run dev

# Run tests
npm test
npm run test:watch
npm run test:coverage

# Database
npm run db:studio
npm run db:migrate:dev
npm run db:seed
```

### Testing

```bash
# Automated tests
npm test                    # Unit tests
npm run test:integration    # Integration tests
npm run test:e2e           # E2E tests
npm run test:all           # All tests

# Type checking
npm run type-check

# Linting
npm run lint
npm run lint:fix
```

### Environment

```bash
# Vercel deployment
vercel deploy              # Deploy to preview
vercel deploy --prod       # Deploy to production
vercel logs                # View logs
vercel env ls              # List environment variables
```

---

## Contact and Support

### For Testing Questions

- **QA Lead:** [Name]
- **Slack Channel:** #testing
- **Email:** qa@cerebrumbioacademy.com

### For Technical Issues

- **Developer Contact:** [Name]
- **Slack Channel:** #development
- **Email:** dev@cerebrumbioacademy.com

### For Razorpay Issues

- **Razorpay Dashboard:** https://dashboard.razorpay.com
- **Support:** support@razorpay.com
- **Internal Contact:** [Payment Integration Lead]

---

## Additional Resources

### External Documentation

- [Next.js Testing Documentation](https://nextjs.org/docs/testing)
- [Playwright Documentation](https://playwright.dev/)
- [Jest Documentation](https://jestjs.io/)
- [Razorpay Testing Guide](https://razorpay.com/docs/payments/payments/test-card-details/)

### Internal Documentation

- [COMPREHENSIVE_PROJECT_AUDIT_REPORT.md](./COMPREHENSIVE_PROJECT_AUDIT_REPORT.md)
- [DEVELOPMENT_WORKFLOW.md](./DEVELOPMENT_WORKFLOW.md)
- [VERCEL_ENVIRONMENT_SETUP.md](./VERCEL_ENVIRONMENT_SETUP.md)

---

## Version History

| Version | Date       | Changes                                     | Author |
| ------- | ---------- | ------------------------------------------- | ------ |
| 1.0     | 2025-10-29 | Initial comprehensive testing documentation | Claude |

---

## Next Steps

### Immediate Actions (Week 1)

1. Review all testing documentation
2. Set up test environment variables
3. Run initial smoke tests
4. Document any gaps or issues

### Short Term (Weeks 2-4)

1. Implement priority automated tests
2. Establish testing routine
3. Train team on testing procedures
4. Set up CI/CD pipeline

### Long Term (Month 2+)

1. Achieve 80% automated test coverage
2. Integrate with monitoring tools
3. Establish QA metrics dashboard
4. Continuous improvement of test suite

---

**Remember:** Good testing is not just about finding bugs—it's about building confidence in your system and ensuring a great user experience.

---

**End of Testing Documentation Index**
