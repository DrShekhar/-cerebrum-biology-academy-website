/**
 * Test Data Fixtures for Student Dashboard
 *
 * Provides consistent test data for all testing layers:
 * - Unit tests
 * - Integration tests
 * - E2E tests
 */

export interface TestAttempt {
  id: string
  score: number
  percentage: number
  timeSpent: number
  strengthAreas: string[]
  weaknessAreas: string[]
  rank: number
  testTemplate: {
    id: string
    title: string
    type: 'MOCK_TEST' | 'PRACTICE_TEST' | 'CHAPTER_TEST'
  }
  createdAt: string
}

export interface User {
  id: string
  name: string | null
  email: string
  role?: string
  createdAt?: string
}

export interface DashboardFixture {
  user: User
  testAttempts: TestAttempt[]
  testSessions?: any[]
  enrollments?: any[]
}

// ============================================================================
// Fixture 1: New User (0 tests taken)
// ============================================================================
export const newUserFixture: DashboardFixture = {
  user: {
    id: 'new-user-1',
    name: 'New Student',
    email: 'new@test.com',
    role: 'STUDENT',
    createdAt: new Date().toISOString(),
  },
  testAttempts: [],
  testSessions: [],
  enrollments: [
    {
      id: 'enrollment-1',
      userId: 'new-user-1',
      courseId: 'neet-biology-12',
      status: 'ACTIVE',
      enrolledAt: new Date().toISOString(),
    },
  ],
}

// ============================================================================
// Fixture 2: Active User (10 tests, 70% average)
// ============================================================================
export const activeUserFixture: DashboardFixture = {
  user: {
    id: 'active-user-1',
    name: 'Active Student',
    email: 'active@test.com',
    role: 'STUDENT',
  },
  testAttempts: [
    {
      id: 'attempt-1',
      score: 450,
      percentage: 75,
      timeSpent: 3600,
      strengthAreas: ['Cell Biology', 'Genetics'],
      weaknessAreas: ['Ecology', 'Evolution'],
      rank: 1500,
      testTemplate: {
        id: 'template-1',
        title: 'NEET Mock Test 1',
        type: 'MOCK_TEST',
      },
      createdAt: '2025-10-28T10:00:00Z',
    },
    {
      id: 'attempt-2',
      score: 432,
      percentage: 72,
      timeSpent: 3500,
      strengthAreas: ['Cell Biology', 'Molecular Biology'],
      weaknessAreas: ['Ecology', 'Plant Physiology'],
      rank: 1800,
      testTemplate: {
        id: 'template-2',
        title: 'NEET Practice Test 2',
        type: 'PRACTICE_TEST',
      },
      createdAt: '2025-10-27T10:00:00Z',
    },
    {
      id: 'attempt-3',
      score: 408,
      percentage: 68,
      timeSpent: 3400,
      strengthAreas: ['Genetics', 'Molecular Biology'],
      weaknessAreas: ['Evolution', 'Ecology'],
      rank: 2200,
      testTemplate: {
        id: 'template-3',
        title: 'NEET Practice Test 3',
        type: 'PRACTICE_TEST',
      },
      createdAt: '2025-10-26T10:00:00Z',
    },
    {
      id: 'attempt-4',
      score: 420,
      percentage: 70,
      timeSpent: 3600,
      strengthAreas: ['Cell Biology', 'Genetics'],
      weaknessAreas: ['Ecology'],
      rank: 1900,
      testTemplate: {
        id: 'template-4',
        title: 'NEET Mock Test 2',
        type: 'MOCK_TEST',
      },
      createdAt: '2025-10-25T10:00:00Z',
    },
    {
      id: 'attempt-5',
      score: 444,
      percentage: 74,
      timeSpent: 3700,
      strengthAreas: ['Cell Biology', 'Genetics', 'Physiology'],
      weaknessAreas: ['Plant Physiology'],
      rank: 1600,
      testTemplate: {
        id: 'template-5',
        title: 'NEET Practice Test 4',
        type: 'PRACTICE_TEST',
      },
      createdAt: '2025-10-24T10:00:00Z',
    },
    {
      id: 'attempt-6',
      score: 396,
      percentage: 66,
      timeSpent: 3300,
      strengthAreas: ['Molecular Biology'],
      weaknessAreas: ['Ecology', 'Evolution', 'Plant Physiology'],
      rank: 2500,
      testTemplate: {
        id: 'template-6',
        title: 'Chapter Test: Cell Biology',
        type: 'CHAPTER_TEST',
      },
      createdAt: '2025-10-23T10:00:00Z',
    },
    {
      id: 'attempt-7',
      score: 426,
      percentage: 71,
      timeSpent: 3550,
      strengthAreas: ['Cell Biology', 'Genetics'],
      weaknessAreas: ['Evolution'],
      rank: 1850,
      testTemplate: {
        id: 'template-7',
        title: 'NEET Practice Test 5',
        type: 'PRACTICE_TEST',
      },
      createdAt: '2025-10-22T10:00:00Z',
    },
    {
      id: 'attempt-8',
      score: 414,
      percentage: 69,
      timeSpent: 3450,
      strengthAreas: ['Genetics', 'Molecular Biology'],
      weaknessAreas: ['Ecology', 'Plant Physiology'],
      rank: 2000,
      testTemplate: {
        id: 'template-8',
        title: 'NEET Mock Test 3',
        type: 'MOCK_TEST',
      },
      createdAt: '2025-10-21T10:00:00Z',
    },
    {
      id: 'attempt-9',
      score: 438,
      percentage: 73,
      timeSpent: 3650,
      strengthAreas: ['Cell Biology', 'Physiology'],
      weaknessAreas: ['Evolution'],
      rank: 1700,
      testTemplate: {
        id: 'template-9',
        title: 'NEET Practice Test 6',
        type: 'PRACTICE_TEST',
      },
      createdAt: '2025-10-20T10:00:00Z',
    },
    {
      id: 'attempt-10',
      score: 402,
      percentage: 67,
      timeSpent: 3350,
      strengthAreas: ['Molecular Biology'],
      weaknessAreas: ['Ecology', 'Plant Physiology'],
      rank: 2300,
      testTemplate: {
        id: 'template-10',
        title: 'Chapter Test: Genetics',
        type: 'CHAPTER_TEST',
      },
      createdAt: '2025-10-19T10:00:00Z',
    },
  ],
  enrollments: [
    {
      id: 'enrollment-1',
      userId: 'active-user-1',
      courseId: 'neet-biology-12',
      status: 'ACTIVE',
    },
  ],
}

// ============================================================================
// Fixture 3: High Performer (50 tests, 90% average)
// ============================================================================
export const highPerformerFixture: DashboardFixture = {
  user: {
    id: 'high-performer-1',
    name: 'Top Student',
    email: 'topstudent@test.com',
    role: 'STUDENT',
  },
  testAttempts: [
    {
      id: 'attempt-hp-1',
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
    {
      id: 'attempt-hp-2',
      score: 644,
      percentage: 89,
      timeSpent: 5900,
      strengthAreas: ['Cell Biology', 'Genetics', 'Molecular Biology', 'Physiology'],
      weaknessAreas: ['Plant Physiology'],
      rank: 55,
      testTemplate: {
        id: 'template-2',
        title: 'NEET Mock Test 2',
        type: 'MOCK_TEST',
      },
      createdAt: '2025-10-27T10:00:00Z',
    },
    {
      id: 'attempt-hp-3',
      score: 652,
      percentage: 91,
      timeSpent: 6100,
      strengthAreas: ['Cell Biology', 'Genetics', 'Physiology', 'Ecology', 'Molecular Biology'],
      weaknessAreas: [],
      rank: 45,
      testTemplate: {
        id: 'template-3',
        title: 'NEET Mock Test 3',
        type: 'MOCK_TEST',
      },
      createdAt: '2025-10-26T10:00:00Z',
    },
    // ... (47 more attempts with similar high scores)
  ],
  enrollments: [
    {
      id: 'enrollment-1',
      userId: 'high-performer-1',
      courseId: 'neet-biology-12',
      status: 'ACTIVE',
    },
  ],
}

// ============================================================================
// Fixture 4: Struggling Student (20 tests, 40% average)
// ============================================================================
export const strugglingUserFixture: DashboardFixture = {
  user: {
    id: 'struggling-user-1',
    name: 'Struggling Student',
    email: 'struggling@test.com',
    role: 'STUDENT',
  },
  testAttempts: [
    {
      id: 'attempt-s-1',
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
    {
      id: 'attempt-s-2',
      score: 276,
      percentage: 38,
      timeSpent: 5200,
      strengthAreas: [],
      weaknessAreas: ['Ecology', 'Evolution', 'Genetics', 'Physiology', 'Cell Biology'],
      rank: 16000,
      testTemplate: {
        id: 'template-2',
        title: 'NEET Practice Test 2',
        type: 'PRACTICE_TEST',
      },
      createdAt: '2025-10-27T10:00:00Z',
    },
    {
      id: 'attempt-s-3',
      score: 294,
      percentage: 41,
      timeSpent: 5500,
      strengthAreas: ['Cell Structure'],
      weaknessAreas: ['Ecology', 'Evolution', 'Physiology', 'Plant Physiology'],
      rank: 14500,
      testTemplate: {
        id: 'template-3',
        title: 'NEET Practice Test 3',
        type: 'PRACTICE_TEST',
      },
      createdAt: '2025-10-26T10:00:00Z',
    },
    // ... (17 more attempts with similar low scores)
  ],
  enrollments: [
    {
      id: 'enrollment-1',
      userId: 'struggling-user-1',
      courseId: 'neet-biology-12',
      status: 'ACTIVE',
    },
  ],
}

// ============================================================================
// Fixture 5: Inactive User (1 test, 30 days ago)
// ============================================================================
export const inactiveUserFixture: DashboardFixture = {
  user: {
    id: 'inactive-user-1',
    name: 'Inactive Student',
    email: 'inactive@test.com',
    role: 'STUDENT',
  },
  testAttempts: [
    {
      id: 'attempt-i-1',
      score: 420,
      percentage: 70,
      timeSpent: 5400,
      strengthAreas: ['Cell Biology', 'Genetics'],
      weaknessAreas: ['Ecology', 'Evolution'],
      rank: 5000,
      testTemplate: {
        id: 'template-1',
        title: 'NEET Mock Test 1',
        type: 'MOCK_TEST',
      },
      createdAt: '2025-09-28T10:00:00Z', // 30 days ago
    },
  ],
  enrollments: [
    {
      id: 'enrollment-1',
      userId: 'inactive-user-1',
      courseId: 'neet-biology-12',
      status: 'ACTIVE',
    },
  ],
}

// ============================================================================
// API Response Wrappers
// ============================================================================

export const wrapSuccessResponse = (data: any) => ({
  success: true,
  data,
})

export const wrapErrorResponse = (error: string, status = 500) => ({
  success: false,
  error,
  status,
})

// ============================================================================
// Helper Functions
// ============================================================================

export const getTestAttemptsResponse = (fixture: DashboardFixture) => {
  return wrapSuccessResponse({
    attempts: fixture.testAttempts,
  })
}

export const getEmptyResponse = () => {
  return wrapSuccessResponse({
    attempts: [],
  })
}

export const get500ErrorResponse = () => {
  return wrapErrorResponse('Internal Server Error', 500)
}

export const get404ErrorResponse = () => {
  return wrapErrorResponse('Not Found', 404)
}

// ============================================================================
// Mock API Handlers (for MSW or similar)
// ============================================================================

export const createMockHandlers = (fixture: DashboardFixture) => {
  return {
    testAttempts: {
      url: '/api/test-attempts',
      response: getTestAttemptsResponse(fixture),
    },
    testSessions: {
      url: '/api/test-sessions',
      response: wrapSuccessResponse({
        sessions: fixture.testSessions || [],
      }),
    },
    enrollments: {
      url: '/api/enrollments',
      response: wrapSuccessResponse({
        enrollments: fixture.enrollments || [],
      }),
    },
  }
}

// ============================================================================
// Scenario-specific fixtures
// ============================================================================

export const scenarios = {
  newUser: newUserFixture,
  activeUser: activeUserFixture,
  highPerformer: highPerformerFixture,
  strugglingStudent: strugglingUserFixture,
  inactiveUser: inactiveUserFixture,
}

// ============================================================================
// Edge Case Fixtures
// ============================================================================

export const edgeCaseFixtures = {
  // User with null name
  nullName: {
    ...activeUserFixture,
    user: {
      ...activeUserFixture.user,
      name: null,
    },
  },

  // User with very long name
  longName: {
    ...activeUserFixture,
    user: {
      ...activeUserFixture.user,
      name: 'Very Long Student Name That Should Be Truncated Or Handled Properly In The UI',
    },
  },

  // User with special characters in name
  specialCharsName: {
    ...activeUserFixture,
    user: {
      ...activeUserFixture.user,
      name: 'Student 名前 🎓',
    },
  },

  // Perfect score (720/720)
  perfectScore: {
    ...activeUserFixture,
    testAttempts: [
      {
        ...activeUserFixture.testAttempts[0],
        score: 720,
        percentage: 100,
        rank: 1,
      },
    ],
  },

  // Zero score
  zeroScore: {
    ...activeUserFixture,
    testAttempts: [
      {
        ...activeUserFixture.testAttempts[0],
        score: 0,
        percentage: 0,
        rank: 50000,
      },
    ],
  },

  // Incomplete data
  incompleteData: {
    ...activeUserFixture,
    testAttempts: [
      {
        id: 'incomplete-1',
        score: null as any,
        percentage: null as any,
        timeSpent: 0,
        strengthAreas: null as any,
        weaknessAreas: null as any,
        rank: null as any,
        testTemplate: {
          id: 'template-1',
          title: 'Incomplete Test',
          type: 'MOCK_TEST',
        },
        createdAt: '2025-10-28T10:00:00Z',
      },
    ],
  },

  // Large dataset (1000+ attempts)
  largeDataset: {
    ...activeUserFixture,
    testAttempts: Array.from({ length: 1000 }, (_, i) => ({
      id: `attempt-${i}`,
      score: 300 + Math.floor(Math.random() * 400),
      percentage: 50 + Math.floor(Math.random() * 50),
      timeSpent: 3000 + Math.floor(Math.random() * 3000),
      strengthAreas: ['Cell Biology'],
      weaknessAreas: ['Ecology'],
      rank: 1000 + i,
      testTemplate: {
        id: `template-${i}`,
        title: `Test ${i + 1}`,
        type: 'MOCK_TEST' as const,
      },
      createdAt: new Date(Date.now() - i * 86400000).toISOString(),
    })),
  },
}
