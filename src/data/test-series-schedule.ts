export type TestType = 'UNIT' | 'CUM' | 'MOCK'

export interface Test {
  id: number
  date: string // ISO date string
  day: string
  classXITopics: string[]
  classXIITopics: string[]
  type: TestType
  phase: 'Foundation' | 'Advanced' | 'Revision' | 'Mock'
}

export const testSeriesSchedule: Test[] = [
  // Foundation Phase - Nov-Dec 2026
  {
    id: 1,
    date: '2026-11-24',
    day: 'Mon',
    classXITopics: ['The Living World', 'Biological Classification'],
    classXIITopics: ['Reproduction in Organisms'],
    type: 'UNIT',
    phase: 'Foundation',
  },
  {
    id: 2,
    date: '2026-12-01',
    day: 'Mon',
    classXITopics: ['Plant Kingdom'],
    classXIITopics: ['Sexual Reproduction in Flowering Plants'],
    type: 'UNIT',
    phase: 'Foundation',
  },
  {
    id: 3,
    date: '2026-12-08',
    day: 'Mon',
    classXITopics: ['Animal Kingdom'],
    classXIITopics: ['Human Reproduction'],
    type: 'UNIT',
    phase: 'Foundation',
  },
  {
    id: 4,
    date: '2026-12-15',
    day: 'Mon',
    classXITopics: ['CUMULATIVE TEST-1', 'Coverage: Tests 1-3'],
    classXIITopics: ['CUMULATIVE TEST-1', 'Coverage: Tests 1-3'],
    type: 'CUM',
    phase: 'Foundation',
  },
  {
    id: 5,
    date: '2026-12-22',
    day: 'Mon',
    classXITopics: ['Morphology of Flowering Plants'],
    classXIITopics: ['Reproductive Health'],
    type: 'UNIT',
    phase: 'Foundation',
  },
  {
    id: 6,
    date: '2026-12-29',
    day: 'Mon',
    classXITopics: ['Anatomy of Flowering Plants'],
    classXIITopics: ['Principles of Inheritance and Variation'],
    type: 'UNIT',
    phase: 'Foundation',
  },
  {
    id: 7,
    date: '2027-01-05',
    day: 'Mon',
    classXITopics: ['Structural Organisation in Animals'],
    classXIITopics: ['Molecular Basis of Inheritance'],
    type: 'UNIT',
    phase: 'Foundation',
  },
  // Advanced Phase - Jan-Feb 2027
  {
    id: 8,
    date: '2027-01-12',
    day: 'Mon',
    classXITopics: ['CUMULATIVE TEST-2', 'Coverage: Tests 1-7'],
    classXIITopics: ['CUMULATIVE TEST-2', 'Coverage: Tests 1-7'],
    type: 'CUM',
    phase: 'Advanced',
  },
  {
    id: 9,
    date: '2027-01-19',
    day: 'Mon',
    classXITopics: ['Cell: The Unit of Life'],
    classXIITopics: ['Evolution'],
    type: 'UNIT',
    phase: 'Advanced',
  },
  {
    id: 10,
    date: '2027-01-26',
    day: 'Mon',
    classXITopics: ['Biomolecules'],
    classXIITopics: ['Human Health and Disease'],
    type: 'UNIT',
    phase: 'Advanced',
  },
  {
    id: 11,
    date: '2027-02-02',
    day: 'Mon',
    classXITopics: ['Cell Cycle and Cell Division'],
    classXIITopics: ['Strategies for Enhancement in Food Production'],
    type: 'UNIT',
    phase: 'Advanced',
  },
  {
    id: 12,
    date: '2027-02-09',
    day: 'Mon',
    classXITopics: ['CUMULATIVE TEST-3', 'Coverage: Tests 1-11'],
    classXIITopics: ['CUMULATIVE TEST-3', 'Coverage: Tests 1-11'],
    type: 'CUM',
    phase: 'Advanced',
  },
  {
    id: 13,
    date: '2027-02-16',
    day: 'Mon',
    classXITopics: ['Transport in Plants', 'Mineral Nutrition'],
    classXIITopics: ['Microbes in Human Welfare'],
    type: 'UNIT',
    phase: 'Advanced',
  },
  {
    id: 14,
    date: '2027-02-23',
    day: 'Mon',
    classXITopics: ['Photosynthesis', 'Respiration in Plants'],
    classXIITopics: ['Biotechnology: Principles & Processes'],
    type: 'UNIT',
    phase: 'Advanced',
  },
  {
    id: 15,
    date: '2027-03-02',
    day: 'Mon',
    classXITopics: ['Plant Growth and Development'],
    classXIITopics: ['Biotechnology and its Applications'],
    type: 'UNIT',
    phase: 'Advanced',
  },
  // Revision Phase - Mar 2027
  {
    id: 16,
    date: '2027-03-09',
    day: 'Mon',
    classXITopics: ['CUMULATIVE TEST-4', 'Coverage: Tests 1-15'],
    classXIITopics: ['CUMULATIVE TEST-4', 'Coverage: Tests 1-15'],
    type: 'CUM',
    phase: 'Revision',
  },
  {
    id: 17,
    date: '2027-03-16',
    day: 'Mon',
    classXITopics: ['Digestion & Absorption', 'Breathing & Gas Exchange'],
    classXIITopics: ['Organisms and Populations'],
    type: 'UNIT',
    phase: 'Revision',
  },
  {
    id: 18,
    date: '2027-03-23',
    day: 'Mon',
    classXITopics: ['Body Fluids & Circulation', 'Excretory Products'],
    classXIITopics: ['Ecosystem'],
    type: 'UNIT',
    phase: 'Revision',
  },
  {
    id: 19,
    date: '2027-03-30',
    day: 'Mon',
    classXITopics: ['Locomotion & Movement', 'Neural Control', 'Chemical Coordination'],
    classXIITopics: ['Biodiversity & Conservation', 'Environmental Issues'],
    type: 'UNIT',
    phase: 'Revision',
  },
  // Mock Test Phase - April 2027
  {
    id: 20,
    date: '2027-04-01',
    day: 'Wed',
    classXITopics: ['GRAND MOCK TEST - 1'],
    classXIITopics: ['Full NEET Biology Syllabus'],
    type: 'MOCK',
    phase: 'Mock',
  },
  {
    id: 21,
    date: '2027-04-03',
    day: 'Fri',
    classXITopics: ['GRAND MOCK TEST - 2'],
    classXIITopics: ['Full NEET Biology Syllabus'],
    type: 'MOCK',
    phase: 'Mock',
  },
  {
    id: 22,
    date: '2027-04-06',
    day: 'Mon',
    classXITopics: ['GRAND MOCK TEST - 3'],
    classXIITopics: ['Full NEET Biology Syllabus'],
    type: 'MOCK',
    phase: 'Mock',
  },
  {
    id: 23,
    date: '2027-04-08',
    day: 'Wed',
    classXITopics: ['GRAND MOCK TEST - 4'],
    classXIITopics: ['Full NEET Biology Syllabus'],
    type: 'MOCK',
    phase: 'Mock',
  },
  {
    id: 24,
    date: '2027-04-10',
    day: 'Fri',
    classXITopics: ['GRAND MOCK TEST - 5'],
    classXIITopics: ['Full NEET Biology Syllabus'],
    type: 'MOCK',
    phase: 'Mock',
  },
  {
    id: 25,
    date: '2027-04-13',
    day: 'Mon',
    classXITopics: ['GRAND MOCK TEST - 6'],
    classXIITopics: ['Full NEET Biology Syllabus'],
    type: 'MOCK',
    phase: 'Mock',
  },
  {
    id: 26,
    date: '2027-04-15',
    day: 'Wed',
    classXITopics: ['GRAND MOCK TEST - 7'],
    classXIITopics: ['Full NEET Biology Syllabus'],
    type: 'MOCK',
    phase: 'Mock',
  },
  {
    id: 27,
    date: '2027-04-17',
    day: 'Fri',
    classXITopics: ['GRAND MOCK TEST - 8'],
    classXIITopics: ['Full NEET Biology Syllabus'],
    type: 'MOCK',
    phase: 'Mock',
  },
  {
    id: 28,
    date: '2027-04-20',
    day: 'Mon',
    classXITopics: ['GRAND MOCK TEST - 9'],
    classXIITopics: ['Full NEET Biology Syllabus'],
    type: 'MOCK',
    phase: 'Mock',
  },
  {
    id: 29,
    date: '2027-04-22',
    day: 'Wed',
    classXITopics: ['GRAND MOCK TEST - 10'],
    classXIITopics: ['Full NEET Biology Syllabus'],
    type: 'MOCK',
    phase: 'Mock',
  },
  {
    id: 30,
    date: '2027-04-24',
    day: 'Fri',
    classXITopics: ['GRAND MOCK TEST - 11'],
    classXIITopics: ['Full NEET Biology Syllabus'],
    type: 'MOCK',
    phase: 'Mock',
  },
  {
    id: 31,
    date: '2027-04-27',
    day: 'Mon',
    classXITopics: ['GRAND MOCK TEST - 12'],
    classXIITopics: ['Full NEET Biology Syllabus'],
    type: 'MOCK',
    phase: 'Mock',
  },
]

export const testInfo = {
  duration: 'Nov 2026 - Apr 2027',
  totalTests: 31,
  regularTests: 19,
  mockTests: 12,
  testTime: '8:30 PM - 10:30 PM',
  testDays: 'Monday (Regular), Mon/Wed/Fri (April)',
  totalQuestions: 90,
  totalMarks: 360,
  markingScheme: '+4 for correct, -1 for incorrect',
  testDuration: '2 Hours',
}

export function getNextUpcomingTest(): Test | null {
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  for (const test of testSeriesSchedule) {
    const testDate = new Date(test.date)
    testDate.setHours(0, 0, 0, 0)
    if (testDate >= today) {
      return test
    }
  }
  return null
}

export function getTestStatus(test: Test): 'completed' | 'upcoming' | 'next' {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const testDate = new Date(test.date)
  testDate.setHours(0, 0, 0, 0)

  const nextTest = getNextUpcomingTest()

  if (nextTest && test.id === nextTest.id) {
    return 'next'
  }
  if (testDate < today) {
    return 'completed'
  }
  return 'upcoming'
}
