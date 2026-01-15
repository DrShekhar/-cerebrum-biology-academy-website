import { MockTest, Question, TestSeries, QuestionBank } from '@/types/mockTest'

export const sampleQuestions: Question[] = [
  {
    id: 'q1',
    questionText: 'Which of the following is the powerhouse of the cell?',
    options: [
      { id: 'a', text: 'Nucleus' },
      { id: 'b', text: 'Mitochondria' },
      { id: 'c', text: 'Ribosome' },
      { id: 'd', text: 'Endoplasmic Reticulum' },
    ],
    correctAnswer: 'b',
    explanation:
      'Mitochondria are called the powerhouse of the cell because they produce ATP through cellular respiration, providing energy for cellular processes.',
    difficulty: 'easy',
    topic: 'Cell Biology',
    subtopic: 'Cell Organelles',
    subject: 'biology',
    examYear: '2023',
    source: 'NEET',
    marks: 4,
    timeAllocated: 60,
    keywords: ['mitochondria', 'powerhouse', 'ATP', 'cellular respiration'],
    relatedConcepts: ['ATP synthesis', 'Cellular respiration', 'Cell organelles'],
  },
  {
    id: 'q2',
    questionText: 'In which phase of mitosis do chromosomes align at the metaphase plate?',
    options: [
      { id: 'a', text: 'Prophase' },
      { id: 'b', text: 'Metaphase' },
      { id: 'c', text: 'Anaphase' },
      { id: 'd', text: 'Telophase' },
    ],
    correctAnswer: 'b',
    explanation:
      "During metaphase, chromosomes align at the cell's equatorial plane called the metaphase plate, ensuring equal distribution of genetic material.",
    difficulty: 'medium',
    topic: 'Cell Division',
    subtopic: 'Mitosis',
    subject: 'biology',
    examYear: '2022',
    source: 'NEET',
    marks: 4,
    timeAllocated: 90,
    keywords: ['metaphase', 'chromosomes', 'metaphase plate', 'mitosis'],
    relatedConcepts: ['Cell division', 'Chromosome movement', 'Spindle fibers'],
  },
  {
    id: 'q3',
    questionText:
      'Which enzyme is responsible for joining Okazaki fragments during DNA replication?',
    options: [
      { id: 'a', text: 'DNA Polymerase' },
      { id: 'b', text: 'DNA Ligase' },
      { id: 'c', text: 'DNA Helicase' },
      { id: 'd', text: 'DNA Primase' },
    ],
    correctAnswer: 'b',
    explanation:
      'DNA Ligase joins Okazaki fragments on the lagging strand by forming phosphodiester bonds between adjacent nucleotides.',
    difficulty: 'hard',
    topic: 'Molecular Biology',
    subtopic: 'DNA Replication',
    subject: 'biology',
    examYear: '2023',
    source: 'NEET',
    marks: 4,
    timeAllocated: 120,
    keywords: ['DNA ligase', 'Okazaki fragments', 'DNA replication', 'lagging strand'],
    relatedConcepts: ['DNA replication', 'Enzymes', 'Molecular biology'],
  },
  {
    id: 'q4',
    questionText: 'What is the primary function of stomata in plants?',
    options: [
      { id: 'a', text: 'Water absorption' },
      { id: 'b', text: 'Gas exchange and transpiration' },
      { id: 'c', text: 'Nutrient storage' },
      { id: 'd', text: 'Photosynthesis' },
    ],
    correctAnswer: 'b',
    explanation:
      'Stomata are pores in plant leaves that regulate gas exchange (CO2 in, O2 out) and control water loss through transpiration.',
    difficulty: 'easy',
    topic: 'Plant Physiology',
    subtopic: 'Transpiration',
    subject: 'botany',
    examYear: '2023',
    source: 'NEET',
    marks: 4,
    timeAllocated: 60,
    keywords: ['stomata', 'gas exchange', 'transpiration', 'plant physiology'],
    relatedConcepts: ['Plant anatomy', 'Photosynthesis', 'Water transport'],
  },
  {
    id: 'q5',
    questionText: 'Which hormone regulates the heartbeat in humans?',
    options: [
      { id: 'a', text: 'Insulin' },
      { id: 'b', text: 'Adrenaline' },
      { id: 'c', text: 'Thyroxine' },
      { id: 'd', text: 'Growth hormone' },
    ],
    correctAnswer: 'b',
    explanation:
      'Adrenaline (epinephrine) is released during stress and increases heart rate, blood pressure, and breathing rate as part of the fight-or-flight response.',
    difficulty: 'medium',
    topic: 'Human Physiology',
    subtopic: 'Endocrine System',
    subject: 'zoology',
    examYear: '2022',
    source: 'NEET',
    marks: 4,
    timeAllocated: 90,
    keywords: ['adrenaline', 'heartbeat', 'hormone', 'endocrine system'],
    relatedConcepts: ['Hormones', 'Cardiovascular system', 'Stress response'],
  },
]

export const mockTests: MockTest[] = [
  {
    id: 'test-1',
    title: 'NEET Biology Full Test - Cell Biology & Genetics',
    description:
      'Comprehensive test covering cell biology fundamentals and genetic principles. Perfect for NEET 2025 preparation with detailed explanations.',
    slug: 'neet-biology-cell-biology-genetics',
    category: 'full-test',
    subject: 'biology',
    duration: 45,
    totalQuestions: 15,
    totalMarks: 60,
    questions: sampleQuestions.slice(0, 3),
    difficulty: 'medium',
    topics: ['Cell Biology', 'Molecular Biology', 'Genetics'],
    instructions: [
      'Each question carries 4 marks',
      'There is negative marking of 1 mark for wrong answers',
      'You can mark questions for review',
      'Calculator is not allowed',
      'Keep your ID proof ready',
    ],
    isActive: true,
    isPremium: false,
    attemptCount: 1247,
    averageScore: 67.5,
    targetClass: 'class-12',
    classRequirements: {
      minimumClass: 'class-11',
      recommendedFor: ['class-12', 'dropper'],
      difficultyByClass: {
        'class-11': 'hard',
        'class-12': 'medium',
        dropper: 'easy',
      },
    },
    adaptiveSettings: {
      enableAdaptive: true,
      questionPoolByClass: {
        'class-11': ['q1'],
        'class-12': ['q1', 'q2'],
        dropper: ['q1', 'q2', 'q3'],
      },
      progressionRules: {
        easyToMediumThreshold: 70,
        mediumToHardThreshold: 85,
      },
    },
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-20T15:30:00Z',
    seoMetadata: {
      title: 'Free NEET Biology Mock Test - Cell Biology & Genetics | Cerebrum Academy',
      description:
        'Take free NEET Biology practice test on Cell Biology & Genetics. 15 questions, detailed solutions, performance analysis. Improve your NEET 2025 score.',
      keywords: [
        'NEET biology mock test',
        'cell biology test',
        'genetics practice test',
        'free NEET test',
        'biology questions NEET',
      ],
      canonicalUrl: '/mock-tests/biology/neet-biology-cell-biology-genetics',
    },
  },
  {
    id: 'test-2',
    title: 'Plant Physiology Rapid Fire Test',
    description:
      'Quick 20-minute test focusing on plant physiology concepts. Test your knowledge of photosynthesis, respiration, and transport in plants.',
    slug: 'plant-physiology-rapid-fire',
    category: 'topic-test',
    subject: 'botany',
    duration: 20,
    totalQuestions: 10,
    totalMarks: 40,
    questions: [sampleQuestions[3]],
    difficulty: 'easy',
    topics: ['Plant Physiology', 'Photosynthesis', 'Transpiration'],
    instructions: [
      'Quick 20-minute test',
      'Each question carries 4 marks',
      'No negative marking',
      'Focus on plant physiology concepts',
    ],
    isActive: true,
    isPremium: false,
    attemptCount: 892,
    averageScore: 72.3,
    targetClass: 'all',
    classRequirements: {
      minimumClass: 'class-11',
      recommendedFor: ['class-11', 'class-12', 'dropper'],
      difficultyByClass: {
        'class-11': 'easy',
        'class-12': 'easy',
        dropper: 'easy',
      },
    },
    adaptiveSettings: {
      enableAdaptive: false,
      questionPoolByClass: {
        'class-11': ['q4'],
        'class-12': ['q4'],
        dropper: ['q4'],
      },
      progressionRules: {
        easyToMediumThreshold: 70,
        mediumToHardThreshold: 85,
      },
    },
    createdAt: '2024-01-10T14:00:00Z',
    updatedAt: '2024-01-18T09:15:00Z',
    seoMetadata: {
      title: 'Plant Physiology Mock Test | Free Botany Practice Test | NEET Preparation',
      description:
        'Free plant physiology practice test for NEET. 10 questions on photosynthesis, respiration, transport. Quick 20-minute test with instant results.',
      keywords: [
        'plant physiology test',
        'botany mock test',
        'photosynthesis questions',
        'NEET botany practice',
        'plant biology test',
      ],
      canonicalUrl: '/mock-tests/botany/plant-physiology-rapid-fire',
    },
  },
  {
    id: 'test-3',
    title: 'Human Physiology - Previous Year Questions',
    description:
      'Collection of actual NEET questions from 2020-2023 focusing on human physiology. Excellent for understanding exam patterns.',
    slug: 'human-physiology-previous-year',
    category: 'previous-year',
    subject: 'zoology',
    duration: 60,
    totalQuestions: 20,
    totalMarks: 80,
    questions: [sampleQuestions[4]],
    difficulty: 'hard',
    topics: ['Human Physiology', 'Endocrine System', 'Nervous System', 'Circulatory System'],
    instructions: [
      'Previous year NEET questions (2020-2023)',
      'Each question carries 4 marks',
      'Negative marking of 1 mark',
      'Time management is crucial',
      'Review explanations carefully',
    ],
    isActive: true,
    isPremium: true,
    attemptCount: 2156,
    averageScore: 58.7,
    targetClass: 'class-12',
    classRequirements: {
      minimumClass: 'class-12',
      recommendedFor: ['class-12', 'dropper'],
      difficultyByClass: {
        'class-11': 'hard',
        'class-12': 'medium',
        dropper: 'medium',
      },
    },
    adaptiveSettings: {
      enableAdaptive: false,
      questionPoolByClass: {
        'class-11': ['q5'],
        'class-12': ['q5'],
        dropper: ['q5'],
      },
      progressionRules: {
        easyToMediumThreshold: 70,
        mediumToHardThreshold: 85,
      },
    },
    createdAt: '2024-01-05T11:30:00Z',
    updatedAt: '2024-01-22T16:45:00Z',
    seoMetadata: {
      title: 'NEET Human Physiology Previous Year Questions | 2020-2023 Papers',
      description:
        'Practice actual NEET human physiology questions from 2020-2023. 20 previous year questions with detailed solutions and exam pattern analysis.',
      keywords: [
        'NEET previous year questions',
        'human physiology NEET',
        'zoology previous papers',
        'NEET 2020-2023 questions',
      ],
      canonicalUrl: '/mock-tests/zoology/human-physiology-previous-year',
    },
  },
]

export const testSeries: TestSeries[] = [
  {
    id: 'series-1',
    title: 'NEET 2025 Complete Biology Test Series',
    description:
      'Comprehensive 12-week test series covering entire NEET Biology syllabus with weekly tests and detailed performance analysis.',
    slug: 'neet-2025-complete-biology-series',
    tests: ['test-1', 'test-2', 'test-3'],
    totalTests: 24,
    duration: '12 weeks',
    price: 2499,
    isPremium: true,
    difficulty: 'intermediate',
    targetAudience: ['NEET 2025 aspirants', 'Class 12 students', 'Droppers'],
    features: [
      '24 comprehensive tests',
      'Weekly performance reports',
      'Detailed solution videos',
      'Rank prediction analysis',
      'Doubt clearing sessions',
      'Mobile app access',
    ],
    schedule: {
      frequency: 'weekly',
      duration: 180,
      startDate: '2025-02-01T10:00:00Z',
      endDate: '2025-04-30T18:00:00Z',
    },
    enrollmentCount: 3247,
    rating: 4.7,
    testimonials: ['testimonial-1', 'testimonial-2'],
    seoMetadata: {
      title: 'NEET 2025 Biology Test Series | 24 Mock Tests | Complete Preparation',
      description:
        'Join NEET 2025 Biology Test Series. 24 comprehensive mock tests, weekly reports, video solutions. 3000+ students enrolled. Book now!',
      keywords: [
        'NEET 2025 test series',
        'biology test series',
        'NEET mock tests',
        'biology preparation',
        'test series online',
      ],
    },
  },
  {
    id: 'series-2',
    title: 'Topic-wise Biology Mastery Series',
    description:
      'Focused test series targeting specific biology topics. Perfect for strengthening weak areas and concept building.',
    slug: 'topic-wise-biology-mastery',
    tests: ['test-1', 'test-2'],
    totalTests: 15,
    duration: '8 weeks',
    price: 1499,
    isPremium: true,
    difficulty: 'beginner',
    targetAudience: ['Class 11 students', 'Beginners', 'Concept builders'],
    features: [
      '15 topic-specific tests',
      'Concept building approach',
      'Adaptive difficulty',
      'Performance tracking',
      'Study material included',
    ],
    schedule: {
      frequency: 'bi-weekly',
      duration: 120,
      startDate: '2025-02-15T14:00:00Z',
      endDate: '2025-04-15T18:00:00Z',
    },
    enrollmentCount: 1856,
    rating: 4.5,
    testimonials: ['testimonial-3'],
    seoMetadata: {
      title: 'Biology Topic-wise Test Series | Concept Building | NEET Preparation',
      description:
        'Master biology topics with focused test series. 15 topic-specific tests, adaptive difficulty, concept building approach. Start free trial!',
      keywords: [
        'topic wise biology tests',
        'biology concept tests',
        'NEET topic tests',
        'biology mastery series',
      ],
    },
  },
]

export const questionBank: QuestionBank = {
  totalQuestions: 2500,
  subjects: [
    {
      name: 'Biology (General)',
      questionCount: 800,
      topics: [
        {
          name: 'Cell Biology',
          questionCount: 150,
          subtopics: [
            { name: 'Cell Structure', questionCount: 50 },
            { name: 'Cell Organelles', questionCount: 60 },
            { name: 'Cell Division', questionCount: 40 },
          ],
        },
        {
          name: 'Molecular Biology',
          questionCount: 120,
          subtopics: [
            { name: 'DNA Replication', questionCount: 40 },
            { name: 'Transcription', questionCount: 35 },
            { name: 'Translation', questionCount: 45 },
          ],
        },
        {
          name: 'Genetics',
          questionCount: 100,
          subtopics: [
            { name: 'Mendelian Genetics', questionCount: 35 },
            { name: 'Molecular Genetics', questionCount: 40 },
            { name: 'Population Genetics', questionCount: 25 },
          ],
        },
      ],
    },
    {
      name: 'Botany',
      questionCount: 850,
      topics: [
        {
          name: 'Plant Physiology',
          questionCount: 200,
          subtopics: [
            { name: 'Photosynthesis', questionCount: 70 },
            { name: 'Respiration', questionCount: 50 },
            { name: 'Transport', questionCount: 80 },
          ],
        },
        {
          name: 'Plant Anatomy',
          questionCount: 150,
          subtopics: [
            { name: 'Root System', questionCount: 50 },
            { name: 'Shoot System', questionCount: 60 },
            { name: 'Reproductive Parts', questionCount: 40 },
          ],
        },
      ],
    },
    {
      name: 'Zoology',
      questionCount: 850,
      topics: [
        {
          name: 'Human Physiology',
          questionCount: 250,
          subtopics: [
            { name: 'Circulatory System', questionCount: 60 },
            { name: 'Respiratory System', questionCount: 55 },
            { name: 'Nervous System', questionCount: 70 },
            { name: 'Endocrine System', questionCount: 65 },
          ],
        },
        {
          name: 'Animal Diversity',
          questionCount: 180,
          subtopics: [
            { name: 'Invertebrates', questionCount: 80 },
            { name: 'Vertebrates', questionCount: 100 },
          ],
        },
      ],
    },
  ],
  difficulties: {
    easy: 800,
    medium: 1200,
    hard: 500,
  },
  sources: [{ previousYear: 600, custom: 1500, ncert: 400 }],
}

// Helper functions for test operations
export const getTestById = (id: string): MockTest | undefined => {
  return mockTests.find((test) => test.id === id)
}

export const getTestBySlug = (slug: string): MockTest | undefined => {
  return mockTests.find((test) => test.slug === slug)
}

export const getTestsBySubject = (subject: string): MockTest[] => {
  return mockTests.filter((test) => test.subject === subject || test.subject === 'mixed')
}

export const getTestsByCategory = (category: string): MockTest[] => {
  return mockTests.filter((test) => test.category === category)
}

export const getTestsByDifficulty = (difficulty: string): MockTest[] => {
  return mockTests.filter((test) => test.difficulty === difficulty)
}

export const getFreeTests = (): MockTest[] => {
  return mockTests.filter((test) => !test.isPremium)
}

export const getPremiumTests = (): MockTest[] => {
  return mockTests.filter((test) => test.isPremium)
}

export const getPopularTests = (): MockTest[] => {
  return mockTests.sort((a, b) => b.attemptCount - a.attemptCount).slice(0, 6)
}

export const getTestSeriesById = (id: string): TestSeries | undefined => {
  return testSeries.find((series) => series.id === id)
}

export const getTestSeriesBySlug = (slug: string): TestSeries | undefined => {
  return testSeries.find((series) => series.slug === slug)
}
