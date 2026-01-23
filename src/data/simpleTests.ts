import { SimpleTest, SimpleQuestion } from '@/types/simpleTest'
import {
  AuthenticQuestion,
  authenticQuestionBank,
  class9Questions,
  class10Questions,
  class11Questions,
  class12Questions,
  getQuestionsByChapter,
  getQuestionsByDifficulty,
} from './authenticQuestions'

// ============================================================================
// QUESTION ADAPTER - Convert AuthenticQuestion to SimpleQuestion
// ============================================================================

const convertToSimpleQuestion = (q: AuthenticQuestion): SimpleQuestion => {
  const correctAnswerIndex = q.options.findIndex((opt) => opt === q.correctAnswer)
  return {
    id: q.id,
    question: q.question,
    options: [...q.options],
    correctAnswer: correctAnswerIndex >= 0 ? correctAnswerIndex : 0,
    explanation: q.explanation,
    subject: 'Biology',
    topic: q.topicId.replace('topic-', '').replace(/-/g, ' '),
    difficulty: q.difficulty.toLowerCase() as 'easy' | 'medium' | 'hard',
    marks: 4,
  }
}

// ============================================================================
// CHAPTER MAPPING - Human-readable topic names
// ============================================================================

const chapterNames: Record<string, string> = {
  'ch-9-1': 'The Fundamental Unit of Life',
  'ch-9-2': 'Tissues',
  'ch-10-1': 'Life Processes',
  'ch-10-2': 'Control and Coordination',
  'ch-10-3': 'How do Organisms Reproduce',
  'ch-10-4': 'Heredity and Evolution',
  'ch-11-1': 'The Living World',
  'ch-11-2': 'Biological Classification',
  'ch-11-3': 'Plant Kingdom',
  'ch-11-4': 'Animal Kingdom',
  'ch-11-5': 'Morphology of Flowering Plants',
  'ch-11-6': 'Anatomy of Flowering Plants',
  'ch-11-7': 'Structural Organisation in Animals',
  'ch-11-8': 'Cell: The Unit of Life',
  'ch-11-9': 'Biomolecules',
  'ch-11-10': 'Cell Cycle and Cell Division',
  'ch-11-11': 'Transport in Plants',
  'ch-11-12': 'Mineral Nutrition',
  'ch-11-13': 'Photosynthesis in Higher Plants',
  'ch-11-14': 'Respiration in Plants',
  'ch-11-15': 'Plant Growth and Development',
  'ch-11-16': 'Digestion and Absorption',
  'ch-11-17': 'Breathing and Exchange of Gases',
  'ch-11-18': 'Body Fluids and Circulation',
  'ch-11-19': 'Excretory Products and their Elimination',
  'ch-11-20': 'Locomotion and Movement',
  'ch-11-21': 'Neural Control and Coordination',
  'ch-11-22': 'Chemical Coordination and Integration',
  'ch-12-1': 'Reproduction in Organisms',
  'ch-12-2': 'Sexual Reproduction in Flowering Plants',
  'ch-12-3': 'Human Reproduction',
  'ch-12-4': 'Reproductive Health',
  'ch-12-5': 'Principles of Inheritance and Variation',
  'ch-12-6': 'Molecular Basis of Inheritance',
  'ch-12-7': 'Evolution',
  'ch-12-8': 'Human Health and Disease',
  'ch-12-9': 'Strategies for Enhancement in Food Production',
  'ch-12-10': 'Microbes in Human Welfare',
  'ch-12-11': 'Biotechnology: Principles and Processes',
  'ch-12-12': 'Biotechnology and its Applications',
  'ch-12-13': 'Organisms and Populations',
  'ch-12-14': 'Ecosystem',
  'ch-12-15': 'Biodiversity and Conservation',
  'ch-12-16': 'Environmental Issues',
}

// ============================================================================
// DYNAMIC TEST GENERATORS
// ============================================================================

const shuffleArray = <T>(array: T[]): T[] => {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

const getQuestionsForClass = (classId: string, count: number = 10): SimpleQuestion[] => {
  const questions = authenticQuestionBank[classId as keyof typeof authenticQuestionBank] || []
  const shuffled = shuffleArray(questions)
  return shuffled.slice(0, count).map(convertToSimpleQuestion)
}

const getMixedDifficultyQuestions = (
  classId: string,
  totalCount: number = 10
): SimpleQuestion[] => {
  const questions = authenticQuestionBank[classId as keyof typeof authenticQuestionBank] || []
  const easy = questions.filter((q) => q.difficulty === 'Easy')
  const medium = questions.filter((q) => q.difficulty === 'Medium')
  const hard = questions.filter((q) => q.difficulty === 'Hard')

  const easyCount = Math.floor(totalCount * 0.3)
  const hardCount = Math.floor(totalCount * 0.2)
  const mediumCount = totalCount - easyCount - hardCount

  const selected = [
    ...shuffleArray(easy).slice(0, easyCount),
    ...shuffleArray(medium).slice(0, mediumCount),
    ...shuffleArray(hard).slice(0, hardCount),
  ]

  return shuffleArray(selected).map(convertToSimpleQuestion)
}

const getChapterBasedQuestions = (
  classId: string,
  chapterId: string,
  count: number = 10
): SimpleQuestion[] => {
  const questions = getQuestionsByChapter([chapterId], classId)
  const shuffled = shuffleArray(questions)
  return shuffled.slice(0, count).map(convertToSimpleQuestion)
}

// ============================================================================
// PRE-BUILT TEST DEFINITIONS - Using Real Question Bank
// ============================================================================

// Class 9 Tests
const class9CellBiologyQuestions = getQuestionsForClass('class-9', 10)
const class9TissuesQuestions = getChapterBasedQuestions('class-9', 'ch-9-2', 10)

// Class 10 Tests
const class10LifeProcessesQuestions = getChapterBasedQuestions('class-10', 'ch-10-1', 10)
const class10GeneticsQuestions = getChapterBasedQuestions('class-10', 'ch-10-4', 10)

// Class 11 Tests - Cell Biology Focus
const class11CellBiologyQuestions = getChapterBasedQuestions('class-11', 'ch-11-8', 15)
const class11PlantPhysiologyQuestions = [
  ...getChapterBasedQuestions('class-11', 'ch-11-11', 5),
  ...getChapterBasedQuestions('class-11', 'ch-11-13', 5),
  ...getChapterBasedQuestions('class-11', 'ch-11-14', 5),
]
const class11HumanPhysiologyQuestions = [
  ...getChapterBasedQuestions('class-11', 'ch-11-16', 4),
  ...getChapterBasedQuestions('class-11', 'ch-11-17', 4),
  ...getChapterBasedQuestions('class-11', 'ch-11-18', 4),
  ...getChapterBasedQuestions('class-11', 'ch-11-19', 3),
]

// Class 12 Tests - NEET Focus
const class12GeneticsQuestions = [
  ...getChapterBasedQuestions('class-12', 'ch-12-5', 8),
  ...getChapterBasedQuestions('class-12', 'ch-12-6', 7),
]
const class12ReproductionQuestions = [
  ...getChapterBasedQuestions('class-12', 'ch-12-2', 8),
  ...getChapterBasedQuestions('class-12', 'ch-12-3', 7),
]
const class12EcologyQuestions = [
  ...getChapterBasedQuestions('class-12', 'ch-12-13', 5),
  ...getChapterBasedQuestions('class-12', 'ch-12-14', 5),
  ...getChapterBasedQuestions('class-12', 'ch-12-15', 5),
]
const class12BiotechnologyQuestions = [
  ...getChapterBasedQuestions('class-12', 'ch-12-11', 8),
  ...getChapterBasedQuestions('class-12', 'ch-12-12', 7),
]

// Full NEET Mock Test - 90 Questions Mixed from Class 11 & 12
const fullNEETMockQuestions = [
  ...getMixedDifficultyQuestions('class-11', 45),
  ...getMixedDifficultyQuestions('class-12', 45),
]

// Quick Practice Tests
const quickPractice10Questions = getMixedDifficultyQuestions('class-11', 10)
const quickPractice20Questions = getMixedDifficultyQuestions('class-12', 20)

// ============================================================================
// EXPORTED TESTS
// ============================================================================

export const simpleTests: SimpleTest[] = [
  // Class 9 Foundation Tests
  {
    id: 'class9-cell-biology',
    title: 'Class 9 - Cell Biology Basics',
    description:
      'Foundation test on cell structure, organelles, and cell theory from NCERT Class 9 Chapter 5.',
    duration: 15,
    totalQuestions: class9CellBiologyQuestions.length,
    questions: class9CellBiologyQuestions,
    subject: 'Biology',
    difficulty: 'easy',
    category: 'topic-test',
    isPublished: true,
  },
  {
    id: 'class9-tissues',
    title: 'Class 9 - Tissues',
    description: 'Test covering plant and animal tissues from NCERT Class 9 Chapter 6.',
    duration: 15,
    totalQuestions: class9TissuesQuestions.length,
    questions: class9TissuesQuestions,
    subject: 'Biology',
    difficulty: 'easy',
    category: 'topic-test',
    isPublished: true,
  },

  // Class 10 Foundation Tests
  {
    id: 'class10-life-processes',
    title: 'Class 10 - Life Processes',
    description:
      'Comprehensive test on nutrition, respiration, transportation, and excretion from NCERT Class 10.',
    duration: 20,
    totalQuestions: class10LifeProcessesQuestions.length,
    questions: class10LifeProcessesQuestions,
    subject: 'Biology',
    difficulty: 'medium',
    category: 'topic-test',
    isPublished: true,
  },
  {
    id: 'class10-genetics',
    title: 'Class 10 - Heredity & Evolution',
    description: 'Foundation genetics test covering inheritance and evolution concepts.',
    duration: 20,
    totalQuestions: class10GeneticsQuestions.length,
    questions: class10GeneticsQuestions,
    subject: 'Biology',
    difficulty: 'medium',
    category: 'topic-test',
    isPublished: true,
  },

  // Class 11 NEET Preparation Tests
  {
    id: 'class11-cell-biology',
    title: 'Class 11 - Cell: The Unit of Life',
    description:
      'Detailed test on cell structure, cell organelles, and their functions. NEET high-weightage chapter.',
    duration: 25,
    totalQuestions: class11CellBiologyQuestions.length,
    questions: class11CellBiologyQuestions,
    subject: 'Biology',
    difficulty: 'medium',
    category: 'topic-test',
    isPublished: true,
  },
  {
    id: 'class11-plant-physiology',
    title: 'Class 11 - Plant Physiology',
    description:
      'Test covering transport in plants, photosynthesis, and respiration. Essential NEET topics.',
    duration: 25,
    totalQuestions: class11PlantPhysiologyQuestions.length,
    questions: class11PlantPhysiologyQuestions,
    subject: 'Biology',
    difficulty: 'medium',
    category: 'topic-test',
    isPublished: true,
  },
  {
    id: 'class11-human-physiology',
    title: 'Class 11 - Human Physiology',
    description:
      'Comprehensive test on digestion, breathing, circulation, and excretion. NEET high-yield topics.',
    duration: 30,
    totalQuestions: class11HumanPhysiologyQuestions.length,
    questions: class11HumanPhysiologyQuestions,
    subject: 'Biology',
    difficulty: 'hard',
    category: 'topic-test',
    isPublished: true,
  },

  // Class 12 NEET Preparation Tests
  {
    id: 'class12-genetics',
    title: 'Class 12 - Genetics & Molecular Biology',
    description:
      'Advanced genetics test covering Mendelian inheritance and molecular basis of inheritance. NEET most important chapters.',
    duration: 30,
    totalQuestions: class12GeneticsQuestions.length,
    questions: class12GeneticsQuestions,
    subject: 'Biology',
    difficulty: 'hard',
    category: 'topic-test',
    isPublished: true,
  },
  {
    id: 'class12-reproduction',
    title: 'Class 12 - Reproduction',
    description:
      'Test on sexual reproduction in plants and human reproduction. High-weightage NEET topics.',
    duration: 30,
    totalQuestions: class12ReproductionQuestions.length,
    questions: class12ReproductionQuestions,
    subject: 'Biology',
    difficulty: 'medium',
    category: 'topic-test',
    isPublished: true,
  },
  {
    id: 'class12-ecology',
    title: 'Class 12 - Ecology & Environment',
    description:
      'Comprehensive ecology test covering organisms, populations, ecosystems, and biodiversity.',
    duration: 25,
    totalQuestions: class12EcologyQuestions.length,
    questions: class12EcologyQuestions,
    subject: 'Biology',
    difficulty: 'medium',
    category: 'topic-test',
    isPublished: true,
  },
  {
    id: 'class12-biotechnology',
    title: 'Class 12 - Biotechnology',
    description:
      'Test on biotechnology principles, processes, and applications. Important for NEET.',
    duration: 25,
    totalQuestions: class12BiotechnologyQuestions.length,
    questions: class12BiotechnologyQuestions,
    subject: 'Biology',
    difficulty: 'hard',
    category: 'topic-test',
    isPublished: true,
  },

  // Full Length Mock Tests
  {
    id: 'neet-full-mock-1',
    title: 'NEET Biology Full Mock Test',
    description:
      'Complete NEET-pattern biology test with 90 questions from Class 11 & 12. Time: 90 minutes.',
    duration: 90,
    totalQuestions: fullNEETMockQuestions.length,
    questions: fullNEETMockQuestions,
    subject: 'Biology',
    difficulty: 'hard',
    category: 'full-test',
    isPublished: true,
  },

  // Quick Practice Tests
  {
    id: 'quick-practice-10',
    title: 'Quick Practice - 10 Questions',
    description: 'Short practice session with 10 mixed-difficulty questions. Perfect for revision.',
    duration: 10,
    totalQuestions: quickPractice10Questions.length,
    questions: quickPractice10Questions,
    subject: 'Biology',
    difficulty: 'medium',
    category: 'topic-test',
    isPublished: true,
  },
  {
    id: 'quick-practice-20',
    title: 'Quick Practice - 20 Questions',
    description: 'Medium practice session with 20 questions covering various topics.',
    duration: 20,
    totalQuestions: quickPractice20Questions.length,
    questions: quickPractice20Questions,
    subject: 'Biology',
    difficulty: 'medium',
    category: 'topic-test',
    isPublished: true,
  },
]

// ============================================================================
// DYNAMIC TEST GENERATION FUNCTIONS
// ============================================================================

export const generateDynamicTest = (config: {
  classId: string
  chapterId?: string
  difficulty?: 'easy' | 'medium' | 'hard' | 'mixed'
  questionCount: number
  title?: string
}): SimpleTest => {
  let questions: SimpleQuestion[]

  if (config.chapterId) {
    questions = getChapterBasedQuestions(config.classId, config.chapterId, config.questionCount)
  } else if (config.difficulty && config.difficulty !== 'mixed') {
    const difficultyMap: Record<string, 'Easy' | 'Medium' | 'Hard'> = {
      easy: 'Easy',
      medium: 'Medium',
      hard: 'Hard',
    }
    const filtered = getQuestionsByDifficulty(difficultyMap[config.difficulty], config.classId)
    questions = shuffleArray(filtered).slice(0, config.questionCount).map(convertToSimpleQuestion)
  } else {
    questions = getMixedDifficultyQuestions(config.classId, config.questionCount)
  }

  const chapterName = config.chapterId ? chapterNames[config.chapterId] || config.chapterId : ''
  const className = config.classId.replace('class-', 'Class ')

  return {
    id: `dynamic-${Date.now()}`,
    title: config.title || `${className} - ${chapterName || 'Mixed Topics'}`,
    description: `Custom test with ${questions.length} questions from ${className}`,
    duration: Math.ceil(questions.length * 1.5),
    totalQuestions: questions.length,
    questions,
    subject: 'Biology',
    difficulty: (config.difficulty === 'mixed' ? 'medium' : config.difficulty) || 'medium',
    category: 'topic-test',
    isPublished: true,
  }
}

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

export const getTestById = (id: string): SimpleTest | undefined => {
  return simpleTests.find((test) => test.id === id)
}

export const getPublishedTests = (): SimpleTest[] => {
  return simpleTests.filter((test) => test.isPublished)
}

export const getTestsByCategory = (category: string): SimpleTest[] => {
  return simpleTests.filter((test) => test.category === category && test.isPublished)
}

export const getTestsByDifficulty = (difficulty: string): SimpleTest[] => {
  return simpleTests.filter((test) => test.difficulty === difficulty && test.isPublished)
}

export const getTestsByClass = (classId: string): SimpleTest[] => {
  const classPrefix = classId.replace('class-', 'class')
  return simpleTests.filter((test) => test.id.startsWith(classPrefix) && test.isPublished)
}

export const getQuestionBankSummary = () => {
  return {
    totalQuestions:
      class9Questions.length +
      class10Questions.length +
      class11Questions.length +
      class12Questions.length,
    class9: class9Questions.length,
    class10: class10Questions.length,
    class11: class11Questions.length,
    class12: class12Questions.length,
    totalTests: simpleTests.length,
    availableChapters: Object.keys(chapterNames),
  }
}
