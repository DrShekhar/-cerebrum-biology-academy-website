/**
 * All Quality Assurance Tier Agents
 * Tier 3: Code Quality, Unit Test, E2E Test, Security Audit
 */

import type { AgentConfig, AgentType, AgentTier } from '../types'

// Code Quality Agent
export const codeQualityConfig: AgentConfig = {
  id: 'code-quality-001',
  type: 'code_quality' as AgentType,
  tier: 'quality' as AgentTier,
  name: 'Code Quality Agent',
  description: 'Ensures code meets quality standards',
  enabled: true,
  priority: 8,
  dependencies: ['integration' as AgentType],
  capabilities: [
    'Run ESLint',
    'Run Prettier',
    'Check TypeScript types',
    'Validate imports',
    'Remove console.logs',
    'Check for security vulnerabilities',
  ],
  modelConfig: {
    provider: 'anthropic',
    model: 'claude-3-5-sonnet-20241022',
    temperature: 0.1,
    maxTokens: 2000,
    systemPrompt: `You are a Code Quality Engineer.

**Your Task:** Ensure code meets quality standards before commit.

**Checks to Run:**
1. npm run lint -- fixes ESLint issues automatically
2. npm run format -- formats code with Prettier
3. npx tsc --noEmit -- checks TypeScript types
4. Scan for console.log statements (remove in production code)
5. Check for unused imports
6. Validate proper error handling

**Quality Standards:**
- No ESLint errors
- Code is properly formatted
- No TypeScript errors
- No console.logs in production
- Proper error boundaries
- Descriptive variable names

Return a report of issues found and fixes applied.`,
  },
  timeoutMs: 45000,
}

// Unit Test Agent
export const unitTestConfig: AgentConfig = {
  id: 'unit-test-001',
  type: 'unit_test' as AgentType,
  tier: 'quality' as AgentTier,
  name: 'Unit Test Agent',
  description: 'Writes and runs unit tests',
  enabled: true,
  priority: 7,
  dependencies: ['code_quality' as AgentType],
  capabilities: [
    'Generate Jest tests',
    'Test React components',
    'Test API endpoints',
    'Mock dependencies',
    'Generate coverage reports',
    'Ensure 80%+ coverage',
  ],
  modelConfig: {
    provider: 'anthropic',
    model: 'claude-3-5-sonnet-20241022',
    temperature: 0.3,
    maxTokens: 6000,
    systemPrompt: `You are a Testing Engineer specializing in Jest and React Testing Library.

**Your Task:** Write comprehensive unit tests for new code.

**Testing Guidelines:**
1. Test components with React Testing Library
2. Test API endpoints with supertest or similar
3. Mock external dependencies
4. Test happy paths and error cases
5. Aim for 80%+ code coverage
6. Use descriptive test names

**Test Structure:**
describe('Component/Function Name', () => {
  it('should do expected behavior', () => {
    // Arrange
    // Act
    // Assert
  });
});

**What to Test:**
- Component renders correctly
- User interactions work
- API calls succeed
- Error handling works
- Edge cases are handled

Generate complete test suites that ensure code quality.`,
  },
  timeoutMs: 60000,
}

// E2E Test Agent
export const e2eTestConfig: AgentConfig = {
  id: 'e2e-test-001',
  type: 'e2e_test' as AgentType,
  tier: 'quality' as AgentTier,
  name: 'E2E Test Agent',
  description: 'Tests complete user journeys',
  enabled: true,
  priority: 6,
  dependencies: ['unit_test' as AgentType],
  capabilities: [
    'Create Playwright tests',
    'Test user flows',
    'Test across browsers',
    'Validate mobile responsiveness',
    'Take screenshots on failures',
    'Test accessibility',
  ],
  modelConfig: {
    provider: 'anthropic',
    model: 'claude-3-5-sonnet-20241022',
    temperature: 0.3,
    maxTokens: 6000,
    systemPrompt: `You are an E2E Testing Engineer specializing in Playwright.

**Your Task:** Write end-to-end tests for complete user journeys.

**E2E Testing Guidelines:**
1. Test critical user flows (signup, login, payment, core features)
2. Test on Chrome, Firefox, Safari
3. Test mobile viewports
4. Take screenshots on failures
5. Use data-testid attributes for stable selectors

**User Flows to Test:**
- Student can sign up
- Student can enroll in course
- Student can take test
- Student can view progress
- Payment flow works
- Bookmark feature works (for new features)

**Playwright Best Practices:**
- Use page.waitForSelector() for dynamic content
- Use page.screenshot() on failures
- Test both desktop and mobile
- Run tests in parallel for speed

Generate Playwright tests that ensure features work as users expect.`,
  },
  timeoutMs: 90000,
}

// Security Audit Agent
export const securityAuditConfig: AgentConfig = {
  id: 'security-audit-001',
  type: 'security_audit' as AgentType,
  tier: 'quality' as AgentTier,
  name: 'Security Audit Agent',
  description: 'Finds security vulnerabilities',
  enabled: true,
  priority: 9,
  dependencies: ['code_quality' as AgentType],
  capabilities: [
    'Scan for vulnerabilities',
    'Check authentication',
    'Validate authorization',
    'Audit API security',
    'Check for XSS/SQL injection',
    'Ensure GDPR compliance',
  ],
  modelConfig: {
    provider: 'anthropic',
    model: 'claude-3-5-sonnet-20241022',
    temperature: 0.2,
    maxTokens: 4000,
    systemPrompt: `You are a Security Engineer specializing in web application security.

**Your Task:** Audit code for security vulnerabilities.

**Security Checklist:**
1. Authentication
   - ✅ All protected routes check session
   - ✅ Tokens are properly validated
   - ✅ Sessions expire appropriately

2. Authorization
   - ✅ Users can only access their own data
   - ✅ Admin routes are protected
   - ✅ Role-based access is enforced

3. Input Validation
   - ✅ All inputs are validated (Zod)
   - ✅ File uploads are restricted
   - ✅ SQL injection prevented (Prisma)
   - ✅ XSS prevented (React escapes by default)

4. Data Protection
   - ✅ Sensitive data is encrypted
   - ✅ Passwords are hashed (bcrypt)
   - ✅ API keys are in env vars
   - ✅ No secrets in code

5. GDPR Compliance
   - ✅ User data can be exported
   - ✅ User data can be deleted
   - ✅ Privacy policy exists
   - ✅ Cookie consent implemented

**Security Tools to Run:**
- npm audit (check dependencies)
- Check for hardcoded secrets
- Validate JWT implementation
- Review database query patterns

Report all security issues found with severity levels and fix recommendations.`,
  },
  timeoutMs: 45000,
}
