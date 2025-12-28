import type { TestLifecycle, DraftVersion } from './types'

export const generateMockTests = (): TestLifecycle[] => [
  {
    id: 'test_1',
    title: 'NEET Biology Mock Test 1',
    status: 'published',
    version: '2.1',
    createdAt: '2024-01-15T10:00:00Z',
    lastModified: '2024-01-16T14:30:00Z',
    publishedAt: '2024-01-16T15:00:00Z',
    createdBy: 'Dr. Smith',
    totalQuestions: 50,
    totalMarks: 200,
    duration: 180,
    participants: 245,
    completionRate: 87.3,
    averageScore: 68.5,
  },
  {
    id: 'test_2',
    title: 'Cell Biology Quiz',
    status: 'draft',
    version: '1.0',
    createdAt: '2024-01-18T09:00:00Z',
    lastModified: '2024-01-18T16:45:00Z',
    createdBy: 'Prof. Johnson',
    totalQuestions: 25,
    totalMarks: 100,
    duration: 60,
    participants: 0,
    completionRate: 0,
    averageScore: 0,
  },
  {
    id: 'test_3',
    title: 'Genetics Assessment',
    status: 'scheduled',
    version: '1.5',
    createdAt: '2024-01-10T11:00:00Z',
    lastModified: '2024-01-17T13:20:00Z',
    scheduledFor: '2024-01-25T09:00:00Z',
    createdBy: 'Dr. Patel',
    totalQuestions: 40,
    totalMarks: 160,
    duration: 120,
    participants: 0,
    completionRate: 0,
    averageScore: 0,
  },
]

export const generateMockVersions = (): DraftVersion[] => [
  {
    id: 'v1',
    version: '2.1',
    timestamp: '2024-01-16T14:30:00Z',
    changes: 'Updated question 15, fixed typo in question 22',
    author: 'Dr. Smith',
  },
  {
    id: 'v2',
    version: '2.0',
    timestamp: '2024-01-16T10:15:00Z',
    changes: 'Added 5 new questions, revised difficulty distribution',
    author: 'Dr. Smith',
  },
  {
    id: 'v3',
    version: '1.9',
    timestamp: '2024-01-15T16:45:00Z',
    changes: 'Initial draft completion',
    author: 'Dr. Smith',
  },
]

export const mockRegradeHistory = [
  {
    id: 'r1',
    date: '2024-01-17',
    type: 'Partial Regrade',
    questions: ['Q15', 'Q22'],
    studentsAffected: 23,
    averageChange: '+2.1',
    reason: 'Ambiguous wording in questions',
    status: 'Completed',
  },
  {
    id: 'r2',
    date: '2024-01-16',
    type: 'Complete Regrade',
    questions: ['All'],
    studentsAffected: 245,
    averageChange: '+0.8',
    reason: 'Marking scheme update',
    status: 'Completed',
  },
]

export const timezones = [
  { value: 'Asia/Kolkata', label: 'IST (India Standard Time)' },
  { value: 'UTC', label: 'UTC' },
  { value: 'America/New_York', label: 'EST (Eastern Standard Time)' },
  { value: 'Europe/London', label: 'GMT (Greenwich Mean Time)' },
]
