/**
 * Question Seeder Types
 * Types for NCERT-aligned biology questions
 */

export type QuestionType =
  | 'MCQ'
  | 'TRUE_FALSE'
  | 'FILL_BLANK'
  | 'MATCH_FOLLOWING'
  | 'DIAGRAM'
  | 'MULTIPLE_SELECT'

export type DifficultyLevel = 'EASY' | 'MEDIUM' | 'HARD' | 'EXPERT'

export type QuestionCategory =
  | 'PRACTICE'
  | 'MOCK_TEST'
  | 'PREVIOUS_YEAR'
  | 'CONCEPT_BUILDER'
  | 'COMPETITIVE'

export interface QuestionSeed {
  // Content
  question: string
  type: QuestionType
  options: string[]
  correctAnswer: string
  explanation: string

  // Classification
  difficulty: DifficultyLevel
  category: QuestionCategory
  topic: string
  subtopic?: string
  tags: string[]

  // NCERT Mapping
  ncertClass: 11 | 12
  ncertChapter: number
  ncertChapterName: string
  ncertFigure?: string // e.g., "8.4"
  ncertPage?: number

  // NEET specific
  neetYear?: number // For PYQ questions
  isNEETImportant: boolean
  neetWeightage: 'HIGH' | 'MEDIUM' | 'LOW'

  // Hints
  hint?: string
  conceptNote?: string

  // Diagram reference (if applicable)
  diagramRequired?: boolean
  diagramId?: string // Reference to diagram_assets
}

export interface ChapterQuestionSet {
  ncertClass: 11 | 12
  chapterNo: number
  chapterName: string
  unitNo: number
  unitName: string
  totalQuestions: number
  questions: QuestionSeed[]
}

// Topic constants for Biology
export const BIOLOGY_UNITS = {
  class11: [
    { unit: 1, name: 'Diversity in the Living World', chapters: [1, 2, 3, 4] },
    { unit: 2, name: 'Structural Organisation in Plants and Animals', chapters: [5, 6, 7] },
    { unit: 3, name: 'Cell: Structure and Function', chapters: [8, 9, 10] },
    { unit: 4, name: 'Plant Physiology', chapters: [11, 12, 13, 14, 15] },
    { unit: 5, name: 'Human Physiology', chapters: [16, 17, 18, 19, 20, 21, 22] },
  ],
  class12: [
    { unit: 6, name: 'Reproduction', chapters: [1, 2, 3, 4] },
    { unit: 7, name: 'Genetics and Evolution', chapters: [5, 6, 7] },
    { unit: 8, name: 'Biology and Human Welfare', chapters: [8, 9, 10] },
    { unit: 9, name: 'Biotechnology and its Applications', chapters: [11, 12] },
    { unit: 10, name: 'Ecology and Environment', chapters: [13, 14, 15, 16] },
  ],
}

export const NEET_TOPIC_WEIGHTAGE: Record<string, number> = {
  // Class 11
  'biological-classification': 2,
  'plant-kingdom': 3,
  'animal-kingdom': 4,
  'morphology-of-flowering-plants': 3,
  'anatomy-of-flowering-plants': 4,
  'structural-organisation-in-animals': 2,
  'cell-structure': 5,
  'biomolecules': 4,
  'cell-cycle': 4,
  'transport-in-plants': 2,
  'mineral-nutrition': 2,
  'photosynthesis': 4,
  'respiration-in-plants': 3,
  'plant-growth': 2,
  'digestion-and-absorption': 3,
  'breathing': 3,
  'body-fluids-circulation': 4,
  'excretory-products': 3,
  'locomotion-movement': 3,
  'neural-control': 4,
  'chemical-coordination': 3,
  // Class 12
  'reproduction-in-organisms': 2,
  'sexual-reproduction-plants': 4,
  'human-reproduction': 5,
  'reproductive-health': 2,
  'inheritance-variation': 6,
  'molecular-basis-inheritance': 6,
  'evolution': 3,
  'human-health-disease': 4,
  'food-production': 2,
  'microbes-human-welfare': 2,
  'biotechnology-principles': 4,
  'biotechnology-applications': 3,
  'organisms-populations': 3,
  'ecosystem': 3,
  'biodiversity-conservation': 2,
  'environmental-issues': 2,
}
