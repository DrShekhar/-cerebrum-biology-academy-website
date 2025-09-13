import { SimpleTest, SimpleQuestion } from '@/types/simpleTest'

// Sample questions for testing
const sampleQuestions: SimpleQuestion[] = [
  {
    id: 'q1',
    question: 'Which of the following is known as the powerhouse of the cell?',
    options: ['Nucleus', 'Mitochondria', 'Ribosome', 'Endoplasmic Reticulum'],
    correctAnswer: 1,
    explanation: 'Mitochondria are called the powerhouse of the cell because they produce ATP through cellular respiration.',
    subject: 'Biology',
    topic: 'Cell Biology',
    difficulty: 'easy',
    marks: 4
  },
  {
    id: 'q2',
    question: 'In which phase of mitosis do chromosomes align at the metaphase plate?',
    options: ['Prophase', 'Metaphase', 'Anaphase', 'Telophase'],
    correctAnswer: 1,
    explanation: 'During metaphase, chromosomes align at the metaphase plate (cell equator) before separation.',
    subject: 'Biology',
    topic: 'Cell Division',
    difficulty: 'medium',
    marks: 4
  },
  {
    id: 'q3',
    question: 'Which process converts glucose into pyruvate?',
    options: ['Krebs cycle', 'Glycolysis', 'Electron transport', 'Calvin cycle'],
    correctAnswer: 1,
    explanation: 'Glycolysis is the metabolic pathway that breaks down glucose into pyruvate, producing ATP.',
    subject: 'Biology',
    topic: 'Respiration',
    difficulty: 'medium',
    marks: 4
  },
  {
    id: 'q4',
    question: 'What is the basic unit of life?',
    options: ['Atom', 'Molecule', 'Cell', 'Tissue'],
    correctAnswer: 2,
    explanation: 'The cell is the basic structural and functional unit of all living organisms.',
    subject: 'Biology',
    topic: 'Cell Biology',
    difficulty: 'easy',
    marks: 4
  },
  {
    id: 'q5',
    question: 'Which organelle is responsible for protein synthesis?',
    options: ['Lysosome', 'Golgi apparatus', 'Ribosome', 'Vacuole'],
    correctAnswer: 2,
    explanation: 'Ribosomes are the cellular organelles responsible for protein synthesis (translation).',
    subject: 'Biology',
    topic: 'Cell Biology',
    difficulty: 'easy',
    marks: 4
  },
  {
    id: 'q6',
    question: 'What is the site of photosynthesis in plant cells?',
    options: ['Nucleus', 'Mitochondria', 'Chloroplast', 'Ribosome'],
    correctAnswer: 2,
    explanation: 'Chloroplasts contain chlorophyll and are the sites of photosynthesis in plant cells.',
    subject: 'Biology',
    topic: 'Photosynthesis',
    difficulty: 'easy',
    marks: 4
  },
  {
    id: 'q7',
    question: 'Which type of RNA carries amino acids to the ribosome?',
    options: ['mRNA', 'tRNA', 'rRNA', 'siRNA'],
    correctAnswer: 1,
    explanation: 'Transfer RNA (tRNA) carries specific amino acids to the ribosome during protein synthesis.',
    subject: 'Biology',
    topic: 'Protein Synthesis',
    difficulty: 'medium',
    marks: 4
  },
  {
    id: 'q8',
    question: 'What is the function of the cell wall in plants?',
    options: ['Energy production', 'Protein synthesis', 'Structural support', 'DNA storage'],
    correctAnswer: 2,
    explanation: 'The cell wall provides structural support and protection to plant cells.',
    subject: 'Biology',
    topic: 'Plant Cell',
    difficulty: 'easy',
    marks: 4
  },
  {
    id: 'q9',
    question: 'Which process produces oxygen as a byproduct?',
    options: ['Respiration', 'Photosynthesis', 'Fermentation', 'Glycolysis'],
    correctAnswer: 1,
    explanation: 'Photosynthesis produces oxygen as a byproduct when water is split during the light reactions.',
    subject: 'Biology',
    topic: 'Photosynthesis',
    difficulty: 'easy',
    marks: 4
  },
  {
    id: 'q10',
    question: 'What is the genetic material in most organisms?',
    options: ['RNA', 'DNA', 'Protein', 'Carbohydrate'],
    correctAnswer: 1,
    explanation: 'DNA (Deoxyribonucleic acid) is the genetic material that stores hereditary information in most organisms.',
    subject: 'Biology',
    topic: 'Genetics',
    difficulty: 'easy',
    marks: 4
  }
]

// Sample tests
export const simpleTests: SimpleTest[] = [
  {
    id: 'test-1',
    title: 'Cell Biology Basics',
    description: 'Test your understanding of basic cell biology concepts including cell organelles, their functions, and cellular processes.',
    duration: 30,
    totalQuestions: 10,
    questions: sampleQuestions,
    subject: 'Biology',
    difficulty: 'easy',
    category: 'topic-test',
    isPublished: true
  },
  {
    id: 'test-2',
    title: 'NEET Biology - Cell & Molecular Biology',
    description: 'Comprehensive test covering cell structure, molecular biology, and cellular processes for NEET preparation.',
    duration: 45,
    totalQuestions: 10,
    questions: sampleQuestions,
    subject: 'Biology',
    difficulty: 'medium',
    category: 'full-test',
    isPublished: true
  },
  {
    id: 'test-3',
    title: 'Quick Practice - Cell Organelles',
    description: 'Quick practice test focusing on cell organelles and their functions. Perfect for revision.',
    duration: 15,
    totalQuestions: 5,
    questions: sampleQuestions.slice(0, 5),
    subject: 'Biology',
    difficulty: 'easy',
    category: 'topic-test',
    isPublished: true
  }
]

// Helper functions
export const getTestById = (id: string): SimpleTest | undefined => {
  return simpleTests.find(test => test.id === id)
}

export const getPublishedTests = (): SimpleTest[] => {
  return simpleTests.filter(test => test.isPublished)
}

export const getTestsByCategory = (category: string): SimpleTest[] => {
  return simpleTests.filter(test => test.category === category && test.isPublished)
}

export const getTestsByDifficulty = (difficulty: string): SimpleTest[] => {
  return simpleTests.filter(test => test.difficulty === difficulty && test.isPublished)
}