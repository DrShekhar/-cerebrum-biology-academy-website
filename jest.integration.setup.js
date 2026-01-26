// Integration test setup for Cerebrum Biology Academy
import '@testing-library/jest-dom'

// Mock environment variables for integration tests
process.env.NODE_ENV = 'test'
process.env.NEXT_PUBLIC_ENV = 'test'
process.env.DATABASE_URL =
  process.env.TEST_DATABASE_URL || 'postgresql://test:test@localhost:5432/cerebrum_test'

// Mock external services for integration tests
jest.mock('@/lib/payments/razorpay', () => ({
  createOrder: jest.fn().mockResolvedValue({
    id: 'test_order_123',
    amount: 42000,
    currency: 'INR',
    status: 'created',
  }),
  verifyPayment: jest.fn().mockResolvedValue({
    success: true,
    paymentId: 'test_payment_123',
  }),
}))

jest.mock('@/lib/whatsapp/whatsappService', () => ({
  sendMessage: jest.fn().mockResolvedValue({
    success: true,
    messageId: 'test_msg_123',
  }),
  sendTemplateMessage: jest.fn().mockResolvedValue({
    success: true,
    messageId: 'test_template_123',
  }),
}))

jest.mock('@/lib/ai/anthropic', () => ({
  generateResponse: jest.fn().mockResolvedValue({
    content: 'This is a test AI response for biology education.',
    usage: { input_tokens: 50, output_tokens: 100 },
    model: 'claude-3-haiku-20240307',
  }),
  generateQuestions: jest.fn().mockResolvedValue([
    {
      question: 'What is photosynthesis?',
      options: ['A process', 'A chemical', 'A reaction', 'All of the above'],
      correct: 3,
      explanation: 'Photosynthesis is a process involving chemical reactions.',
    },
  ]),
}))

jest.mock('@/lib/email/emailService', () => ({
  sendEnrollmentConfirmation: jest.fn().mockResolvedValue({
    success: true,
    messageId: 'test_email_123',
  }),
  sendDemoConfirmation: jest.fn().mockResolvedValue({
    success: true,
    messageId: 'test_demo_email_123',
  }),
}))

// Global test utilities
global.createTestUser = () => ({
  id: 'test_user_123',
  name: 'Test Student',
  email: 'test@cerebrumbiologyacademy.com',
  phone: '+918826444334',
  class: 'class-11',
  enrolledCourses: [],
})

global.createTestCourse = () => ({
  id: 'test_course_123',
  name: 'NEET Biology Pinnacle',
  class: 'class-11',
  series: 'pinnacle',
  plan: 'plan-a',
  price: 42000,
  features: ['Live Classes', 'Recorded Videos', 'Test Series'],
})

global.createTestEnrollment = () => ({
  id: 'test_enrollment_123',
  userId: 'test_user_123',
  courseId: 'test_course_123',
  status: 'active',
  paymentStatus: 'completed',
  enrolledAt: new Date(),
})

// Database setup utilities for integration tests
global.setupTestDatabase = async () => {
  // This would typically reset and seed the test database
  console.log('Setting up test database...')
  // Implementation would depend on your database setup
}

global.cleanupTestDatabase = async () => {
  // Clean up test data after tests
  console.log('Cleaning up test database...')
  // Implementation would depend on your database setup
}

// API testing utilities
global.makeAPIRequest = async (endpoint, options = {}) => {
  const baseURL = 'http://localhost:3000'
  const url = `${baseURL}${endpoint}`

  const defaultOptions = {
    headers: {
      'Content-Type': 'application/json',
      'X-Test-Request': 'true',
    },
  }

  return fetch(url, { ...defaultOptions, ...options })
}

// Performance testing utilities
global.measurePerformance = async (fn) => {
  const start = performance.now()
  const result = await fn()
  const end = performance.now()

  return {
    result,
    duration: end - start,
    timestamp: new Date().toISOString(),
  }
}

// AI testing utilities
global.validateAIResponse = (response) => {
  return {
    hasContent: Boolean(response.content),
    isEducational:
      response.content.toLowerCase().includes('biology') ||
      response.content.toLowerCase().includes('neet') ||
      response.content.toLowerCase().includes('medical'),
    isAppropriate: !response.content.includes('inappropriate'),
    hasValidUsage: Boolean(response.usage?.input_tokens && response.usage?.output_tokens),
  }
}

// Security testing utilities
global.testSecurityVectors = {
  xss: ['<script>alert("xss")</script>', '"><svg onload=alert(1)>'],
  sqlInjection: ["'; DROP TABLE users; --", "1' OR '1'='1"],
  pathTraversal: ['../../../etc/passwd', '..\\..\\..\\windows\\system32'],
  commandInjection: ['$(whoami)', '`ls -la`', '| cat /etc/passwd'],
}

// Accessibility testing utilities
global.checkAccessibility = (element) => {
  return {
    hasAltText: element.querySelector('img')?.hasAttribute('alt'),
    hasAriaLabels: element.querySelectorAll('[aria-label]').length > 0,
    hasProperHeadings: element.querySelector('h1, h2, h3, h4, h5, h6') !== null,
    hasTabIndex:
      element.hasAttribute('tabindex') ||
      element.tagName.toLowerCase() === 'button' ||
      element.tagName.toLowerCase() === 'a',
  }
}

// Test data factories
global.TestDataFactory = {
  user: (overrides = {}) => ({
    id: 'test_user_' + Math.random().toString(36).substr(2, 9),
    name: 'Test Student',
    email: 'test+' + Math.random().toString(36).substr(2, 5) + '@cerebrumbiologyacademy.com',
    phone: '+918826444334',
    class: 'class-11',
    ...overrides,
  }),

  course: (overrides = {}) => ({
    id: 'test_course_' + Math.random().toString(36).substr(2, 9),
    name: 'Test Biology Course',
    class: 'class-11',
    series: 'pinnacle',
    plan: 'plan-a',
    price: 42000,
    ...overrides,
  }),

  enrollment: (userId, courseId, overrides = {}) => ({
    id: 'test_enrollment_' + Math.random().toString(36).substr(2, 9),
    userId,
    courseId,
    status: 'active',
    paymentStatus: 'completed',
    enrolledAt: new Date(),
    ...overrides,
  }),
}

// Console override for cleaner test output
const originalConsoleError = console.error
console.error = (...args) => {
  // Suppress known React warnings in tests
  const message = args[0]
  if (
    typeof message === 'string' &&
    (message.includes('Warning: ReactDOM.render is deprecated') ||
      message.includes('Warning: componentWillReceiveProps has been renamed'))
  ) {
    return
  }
  originalConsoleError(...args)
}
