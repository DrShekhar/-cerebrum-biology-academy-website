/**
 * NCERT Biology Content Database for NEET Test Generator
 * Comprehensive mapping of Class 11 & 12 Biology curriculum with question banks
 *
 * Content Strategy:
 * - Phase 1: 1000 questions covering high-weightage topics
 * - Phase 2: 2000+ questions for complete NCERT coverage
 * - Question Distribution: Easy 40%, Medium 40%, Hard 20%
 * - Question Types: Single Correct 80%, Assertion-Reason 10%, Match Following 5%, Diagram-based 5%
 */

export interface NCERTChapter {
  id: string
  name: string
  class: '11' | '12'
  unit: string
  ncertReference: string
  weightageInNEET: number // percentage of total NEET questions
  difficultyLevel: 'Foundation' | 'Intermediate' | 'Advanced'
  estimatedStudyHours: number
  prerequisiteChapters?: string[]
  relatedChapters?: string[]
}

export interface BiologyTopic {
  id: string
  name: string
  chapterId: string
  subtopics: string[]
  keyTerms: string[]
  importantDiagrams: string[]
  commonMisconceptions: string[]
  neetFrequency: 'Very High' | 'High' | 'Medium' | 'Low'
  questionTypes: QuestionTypeDistribution
}

export interface QuestionTypeDistribution {
  singleCorrect: number // percentage
  assertionReason: number
  matchFollowing: number
  diagramBased: number
  multipleCorrect?: number
  numerical?: number
  statementBased?: number
}

export interface QuestionMetadata {
  id: string
  chapterId: string
  topicId: string
  questionText: string
  questionType:
    | 'single-correct'
    | 'assertion-reason'
    | 'match-following'
    | 'diagram-based'
    | 'multiple-correct'
    | 'numerical'
    | 'statement-based'
  difficulty: 'easy' | 'medium' | 'hard'
  options?: string[]
  correctAnswer: string | string[] | number
  explanation: string
  diagramRequired?: boolean
  ncertReference: string
  previousYearFrequency: number
  estimatedTimeSeconds: number
  tags: string[]
  relatedConcepts: string[]
}

// Class 11 NCERT Biology Chapters
export const class11Chapters: NCERTChapter[] = [
  {
    id: 'ch11-1',
    name: 'The Living World',
    class: '11',
    unit: 'Diversity in Living World',
    ncertReference: 'Chapter 1',
    weightageInNEET: 2.5,
    difficultyLevel: 'Foundation',
    estimatedStudyHours: 15,
    relatedChapters: ['ch11-2'],
  },
  {
    id: 'ch11-2',
    name: 'Biological Classification',
    class: '11',
    unit: 'Diversity in Living World',
    ncertReference: 'Chapter 2',
    weightageInNEET: 4.0,
    difficultyLevel: 'Foundation',
    estimatedStudyHours: 25,
    prerequisiteChapters: ['ch11-1'],
  },
  {
    id: 'ch11-3',
    name: 'Plant Kingdom',
    class: '11',
    unit: 'Diversity in Living World',
    ncertReference: 'Chapter 3',
    weightageInNEET: 3.5,
    difficultyLevel: 'Intermediate',
    estimatedStudyHours: 30,
    prerequisiteChapters: ['ch11-2'],
  },
  {
    id: 'ch11-4',
    name: 'Animal Kingdom',
    class: '11',
    unit: 'Diversity in Living World',
    ncertReference: 'Chapter 4',
    weightageInNEET: 4.5,
    difficultyLevel: 'Intermediate',
    estimatedStudyHours: 35,
    prerequisiteChapters: ['ch11-2'],
  },
  {
    id: 'ch11-5',
    name: 'Morphology of Flowering Plants',
    class: '11',
    unit: 'Structural Organization in Plants and Animals',
    ncertReference: 'Chapter 5',
    weightageInNEET: 5.0,
    difficultyLevel: 'Intermediate',
    estimatedStudyHours: 25,
    relatedChapters: ['ch11-6'],
  },
  {
    id: 'ch11-6',
    name: 'Anatomy of Flowering Plants',
    class: '11',
    unit: 'Structural Organization in Plants and Animals',
    ncertReference: 'Chapter 6',
    weightageInNEET: 4.0,
    difficultyLevel: 'Intermediate',
    estimatedStudyHours: 30,
    prerequisiteChapters: ['ch11-5'],
  },
  {
    id: 'ch11-7',
    name: 'Structural Organisation in Animals',
    class: '11',
    unit: 'Structural Organization in Plants and Animals',
    ncertReference: 'Chapter 7',
    weightageInNEET: 3.5,
    difficultyLevel: 'Intermediate',
    estimatedStudyHours: 25,
    relatedChapters: ['ch11-4'],
  },
  {
    id: 'ch11-8',
    name: 'Cell: The Unit of Life',
    class: '11',
    unit: 'Cell Structure and Function',
    ncertReference: 'Chapter 8',
    weightageInNEET: 8.0,
    difficultyLevel: 'Advanced',
    estimatedStudyHours: 40,
    relatedChapters: ['ch11-9', 'ch11-10'],
  },
  {
    id: 'ch11-9',
    name: 'Biomolecules',
    class: '11',
    unit: 'Cell Structure and Function',
    ncertReference: 'Chapter 9',
    weightageInNEET: 6.5,
    difficultyLevel: 'Advanced',
    estimatedStudyHours: 35,
    prerequisiteChapters: ['ch11-8'],
  },
  {
    id: 'ch11-10',
    name: 'Cell Cycle and Cell Division',
    class: '11',
    unit: 'Cell Structure and Function',
    ncertReference: 'Chapter 10',
    weightageInNEET: 5.5,
    difficultyLevel: 'Advanced',
    estimatedStudyHours: 30,
    prerequisiteChapters: ['ch11-8'],
  },
  {
    id: 'ch11-11',
    name: 'Transport in Plants',
    class: '11',
    unit: 'Plant Physiology',
    ncertReference: 'Chapter 11',
    weightageInNEET: 4.5,
    difficultyLevel: 'Intermediate',
    estimatedStudyHours: 25,
    prerequisiteChapters: ['ch11-5', 'ch11-6'],
  },
  {
    id: 'ch11-12',
    name: 'Mineral Nutrition',
    class: '11',
    unit: 'Plant Physiology',
    ncertReference: 'Chapter 12',
    weightageInNEET: 3.0,
    difficultyLevel: 'Intermediate',
    estimatedStudyHours: 20,
    relatedChapters: ['ch11-11'],
  },
  {
    id: 'ch11-13',
    name: 'Photosynthesis in Higher Plants',
    class: '11',
    unit: 'Plant Physiology',
    ncertReference: 'Chapter 13',
    weightageInNEET: 7.0,
    difficultyLevel: 'Advanced',
    estimatedStudyHours: 35,
    prerequisiteChapters: ['ch11-9'],
  },
  {
    id: 'ch11-14',
    name: 'Respiration in Plants',
    class: '11',
    unit: 'Plant Physiology',
    ncertReference: 'Chapter 14',
    weightageInNEET: 5.0,
    difficultyLevel: 'Advanced',
    estimatedStudyHours: 30,
    prerequisiteChapters: ['ch11-9'],
  },
  {
    id: 'ch11-15',
    name: 'Plant Growth and Development',
    class: '11',
    unit: 'Plant Physiology',
    ncertReference: 'Chapter 15',
    weightageInNEET: 4.0,
    difficultyLevel: 'Intermediate',
    estimatedStudyHours: 25,
  },
  {
    id: 'ch11-16',
    name: 'Digestion and Absorption',
    class: '11',
    unit: 'Human Physiology',
    ncertReference: 'Chapter 16',
    weightageInNEET: 4.5,
    difficultyLevel: 'Intermediate',
    estimatedStudyHours: 25,
  },
  {
    id: 'ch11-17',
    name: 'Breathing and Exchange of Gases',
    class: '11',
    unit: 'Human Physiology',
    ncertReference: 'Chapter 17',
    weightageInNEET: 4.0,
    difficultyLevel: 'Intermediate',
    estimatedStudyHours: 25,
  },
  {
    id: 'ch11-18',
    name: 'Body Fluids and Circulation',
    class: '11',
    unit: 'Human Physiology',
    ncertReference: 'Chapter 18',
    weightageInNEET: 5.0,
    difficultyLevel: 'Intermediate',
    estimatedStudyHours: 30,
  },
  {
    id: 'ch11-19',
    name: 'Excretory Products and their Elimination',
    class: '11',
    unit: 'Human Physiology',
    ncertReference: 'Chapter 19',
    weightageInNEET: 4.5,
    difficultyLevel: 'Intermediate',
    estimatedStudyHours: 25,
  },
  {
    id: 'ch11-20',
    name: 'Locomotion and Movement',
    class: '11',
    unit: 'Human Physiology',
    ncertReference: 'Chapter 20',
    weightageInNEET: 3.0,
    difficultyLevel: 'Foundation',
    estimatedStudyHours: 20,
  },
  {
    id: 'ch11-21',
    name: 'Neural Control and Coordination',
    class: '11',
    unit: 'Human Physiology',
    ncertReference: 'Chapter 21',
    weightageInNEET: 6.0,
    difficultyLevel: 'Advanced',
    estimatedStudyHours: 35,
  },
  {
    id: 'ch11-22',
    name: 'Chemical Coordination and Integration',
    class: '11',
    unit: 'Human Physiology',
    ncertReference: 'Chapter 22',
    weightageInNEET: 5.5,
    difficultyLevel: 'Advanced',
    estimatedStudyHours: 30,
  },
]

// Class 12 NCERT Biology Chapters
export const class12Chapters: NCERTChapter[] = [
  {
    id: 'ch12-1',
    name: 'Reproduction in Organisms',
    class: '12',
    unit: 'Reproduction',
    ncertReference: 'Chapter 1',
    weightageInNEET: 3.5,
    difficultyLevel: 'Foundation',
    estimatedStudyHours: 20,
  },
  {
    id: 'ch12-2',
    name: 'Sexual Reproduction in Flowering Plants',
    class: '12',
    unit: 'Reproduction',
    ncertReference: 'Chapter 2',
    weightageInNEET: 5.0,
    difficultyLevel: 'Intermediate',
    estimatedStudyHours: 30,
    prerequisiteChapters: ['ch11-5', 'ch12-1'],
  },
  {
    id: 'ch12-3',
    name: 'Human Reproduction',
    class: '12',
    unit: 'Reproduction',
    ncertReference: 'Chapter 3',
    weightageInNEET: 6.5,
    difficultyLevel: 'Advanced',
    estimatedStudyHours: 35,
    prerequisiteChapters: ['ch12-1'],
  },
  {
    id: 'ch12-4',
    name: 'Reproductive Health',
    class: '12',
    unit: 'Reproduction',
    ncertReference: 'Chapter 4',
    weightageInNEET: 3.0,
    difficultyLevel: 'Foundation',
    estimatedStudyHours: 20,
    prerequisiteChapters: ['ch12-3'],
  },
  {
    id: 'ch12-5',
    name: 'Principles of Inheritance and Variation',
    class: '12',
    unit: 'Genetics and Evolution',
    ncertReference: 'Chapter 5',
    weightageInNEET: 8.5,
    difficultyLevel: 'Advanced',
    estimatedStudyHours: 40,
    prerequisiteChapters: ['ch11-10'],
  },
  {
    id: 'ch12-6',
    name: 'Molecular Basis of Inheritance',
    class: '12',
    unit: 'Genetics and Evolution',
    ncertReference: 'Chapter 6',
    weightageInNEET: 7.5,
    difficultyLevel: 'Advanced',
    estimatedStudyHours: 35,
    prerequisiteChapters: ['ch11-9', 'ch12-5'],
  },
  {
    id: 'ch12-7',
    name: 'Evolution',
    class: '12',
    unit: 'Genetics and Evolution',
    ncertReference: 'Chapter 7',
    weightageInNEET: 4.5,
    difficultyLevel: 'Intermediate',
    estimatedStudyHours: 25,
    prerequisiteChapters: ['ch12-5'],
  },
  {
    id: 'ch12-8',
    name: 'Human Health and Disease',
    class: '12',
    unit: 'Biology and Human Welfare',
    ncertReference: 'Chapter 8',
    weightageInNEET: 5.5,
    difficultyLevel: 'Intermediate',
    estimatedStudyHours: 30,
  },
  {
    id: 'ch12-9',
    name: 'Strategies for Enhancement in Food Production',
    class: '12',
    unit: 'Biology and Human Welfare',
    ncertReference: 'Chapter 9',
    weightageInNEET: 3.5,
    difficultyLevel: 'Foundation',
    estimatedStudyHours: 20,
  },
  {
    id: 'ch12-10',
    name: 'Microbes in Human Welfare',
    class: '12',
    unit: 'Biology and Human Welfare',
    ncertReference: 'Chapter 10',
    weightageInNEET: 4.0,
    difficultyLevel: 'Intermediate',
    estimatedStudyHours: 25,
  },
  {
    id: 'ch12-11',
    name: 'Biotechnology: Principles and Processes',
    class: '12',
    unit: 'Biotechnology and its Applications',
    ncertReference: 'Chapter 11',
    weightageInNEET: 4.5,
    difficultyLevel: 'Advanced',
    estimatedStudyHours: 30,
    prerequisiteChapters: ['ch12-6'],
  },
  {
    id: 'ch12-12',
    name: 'Biotechnology and its Applications',
    class: '12',
    unit: 'Biotechnology and its Applications',
    ncertReference: 'Chapter 12',
    weightageInNEET: 3.5,
    difficultyLevel: 'Intermediate',
    estimatedStudyHours: 25,
    prerequisiteChapters: ['ch12-11'],
  },
  {
    id: 'ch12-13',
    name: 'Organisms and Populations',
    class: '12',
    unit: 'Ecology and Environment',
    ncertReference: 'Chapter 13',
    weightageInNEET: 4.0,
    difficultyLevel: 'Intermediate',
    estimatedStudyHours: 25,
  },
  {
    id: 'ch12-14',
    name: 'Ecosystem',
    class: '12',
    unit: 'Ecology and Environment',
    ncertReference: 'Chapter 14',
    weightageInNEET: 5.0,
    difficultyLevel: 'Intermediate',
    estimatedStudyHours: 30,
    prerequisiteChapters: ['ch12-13'],
  },
  {
    id: 'ch12-15',
    name: 'Biodiversity and Conservation',
    class: '12',
    unit: 'Ecology and Environment',
    ncertReference: 'Chapter 15',
    weightageInNEET: 3.5,
    difficultyLevel: 'Foundation',
    estimatedStudyHours: 20,
  },
  {
    id: 'ch12-16',
    name: 'Environmental Issues',
    class: '12',
    unit: 'Ecology and Environment',
    ncertReference: 'Chapter 16',
    weightageInNEET: 3.0,
    difficultyLevel: 'Foundation',
    estimatedStudyHours: 20,
  },
]

// High-Weightage Topics for Phase 1 Implementation (1000 questions)
export const phase1PriorityTopics: BiologyTopic[] = [
  {
    id: 'topic-cell-biology',
    name: 'Cell Biology',
    chapterId: 'ch11-8',
    subtopics: [
      'Cell Theory',
      'Prokaryotic vs Eukaryotic Cells',
      'Cell Membrane Structure and Function',
      'Cell Organelles',
      'Nucleus and Chromosomes',
      'Cell Wall and Cell Inclusions',
    ],
    keyTerms: ['cell theory', 'plasma membrane', 'organelles', 'nucleus', 'cytoplasm', 'cell wall'],
    importantDiagrams: ['Cell Structure', 'Membrane Structure', 'Organelle Organization'],
    commonMisconceptions: [
      'Confusing prokaryotic and eukaryotic features',
      'Misunderstanding membrane permeability',
    ],
    neetFrequency: 'Very High',
    questionTypes: {
      singleCorrect: 75,
      assertionReason: 15,
      matchFollowing: 5,
      diagramBased: 5,
    },
  },
  {
    id: 'topic-biomolecules',
    name: 'Biomolecules',
    chapterId: 'ch11-9',
    subtopics: [
      'Carbohydrates - Structure and Types',
      'Proteins - Amino Acids and Protein Structure',
      'Lipids - Classification and Functions',
      'Nucleic Acids - DNA and RNA',
      'Enzymes - Structure and Function',
    ],
    keyTerms: ['carbohydrates', 'proteins', 'lipids', 'nucleic acids', 'enzymes', 'biomolecules'],
    importantDiagrams: ['Protein Structure', 'DNA Structure', 'Enzyme Action'],
    commonMisconceptions: [
      'Confusing different levels of protein structure',
      'Misunderstanding enzyme specificity',
    ],
    neetFrequency: 'Very High',
    questionTypes: {
      singleCorrect: 70,
      assertionReason: 20,
      matchFollowing: 5,
      diagramBased: 5,
    },
  },
  {
    id: 'topic-photosynthesis',
    name: 'Photosynthesis',
    chapterId: 'ch11-13',
    subtopics: [
      'Light Reactions - Photophosphorylation',
      'Calvin Cycle - CO2 Fixation',
      'C3, C4 and CAM Plants',
      'Factors Affecting Photosynthesis',
      'Photorespiration',
    ],
    keyTerms: ['photosynthesis', 'chlorophyll', 'light reactions', 'calvin cycle', 'C4 plants'],
    importantDiagrams: ['Chloroplast Structure', 'Light Reactions', 'Calvin Cycle'],
    commonMisconceptions: [
      'Confusing light and dark reactions',
      'Misunderstanding C3 vs C4 pathways',
    ],
    neetFrequency: 'Very High',
    questionTypes: {
      singleCorrect: 65,
      assertionReason: 20,
      matchFollowing: 10,
      diagramBased: 5,
    },
  },
  {
    id: 'topic-genetics',
    name: 'Principles of Inheritance',
    chapterId: 'ch12-5',
    subtopics: [
      "Mendel's Laws of Inheritance",
      'Monohybrid and Dihybrid Crosses',
      'Incomplete Dominance and Codominance',
      'Multiple Alleles',
      'Sex-linked Inheritance',
      'Linkage and Recombination',
    ],
    keyTerms: ['genetics', 'heredity', 'alleles', 'dominance', 'linkage', 'crossover'],
    importantDiagrams: ['Punnett Squares', 'Genetic Crosses', 'Chromosome Mapping'],
    commonMisconceptions: [
      'Confusing incomplete dominance with codominance',
      'Misunderstanding sex-linked inheritance',
    ],
    neetFrequency: 'Very High',
    questionTypes: {
      singleCorrect: 60,
      assertionReason: 15,
      matchFollowing: 10,
      diagramBased: 15,
    },
  },
  {
    id: 'topic-molecular-genetics',
    name: 'Molecular Basis of Inheritance',
    chapterId: 'ch12-6',
    subtopics: [
      'DNA Structure and Replication',
      'RNA Types and Functions',
      'Protein Synthesis - Transcription and Translation',
      'Genetic Code',
      'Gene Expression and Regulation',
      'DNA Fingerprinting',
    ],
    keyTerms: ['DNA', 'RNA', 'replication', 'transcription', 'translation', 'genetic code'],
    importantDiagrams: ['DNA Structure', 'Replication Process', 'Protein Synthesis'],
    commonMisconceptions: [
      'Confusing transcription and translation',
      'Misunderstanding genetic code properties',
    ],
    neetFrequency: 'Very High',
    questionTypes: {
      singleCorrect: 70,
      assertionReason: 20,
      matchFollowing: 5,
      diagramBased: 5,
    },
  },
  {
    id: 'topic-human-reproduction',
    name: 'Human Reproduction',
    chapterId: 'ch12-3',
    subtopics: [
      'Male Reproductive System',
      'Female Reproductive System',
      'Menstrual Cycle',
      'Fertilization and Embryonic Development',
      'Pregnancy and Parturition',
      'Lactation',
    ],
    keyTerms: ['reproduction', 'gametes', 'fertilization', 'pregnancy', 'hormones'],
    importantDiagrams: ['Reproductive Systems', 'Menstrual Cycle', 'Embryonic Development'],
    commonMisconceptions: [
      'Confusing menstrual cycle phases',
      'Misunderstanding fertilization process',
    ],
    neetFrequency: 'Very High',
    questionTypes: {
      singleCorrect: 75,
      assertionReason: 15,
      matchFollowing: 5,
      diagramBased: 5,
    },
  },
]

// Question Bank Structure for Implementation
export const questionBankStructure = {
  phase1: {
    totalQuestions: 1000,
    distribution: {
      class11: 400,
      class12: 600,
    },
    difficultyDistribution: {
      easy: 400,
      medium: 400,
      hard: 200,
    },
    typeDistribution: {
      singleCorrect: 800,
      assertionReason: 100,
      matchFollowing: 50,
      diagramBased: 50,
    },
    priorityTopics: [
      'Cell Biology (120 questions)',
      'Biomolecules (100 questions)',
      'Photosynthesis (90 questions)',
      'Genetics (150 questions)',
      'Molecular Genetics (120 questions)',
      'Human Reproduction (100 questions)',
      'Evolution (80 questions)',
      'Ecology (70 questions)',
      'Plant Physiology (70 questions)',
      'Human Physiology (100 questions)',
    ],
  },
  phase2: {
    totalQuestions: 2000,
    completeNCERTCoverage: true,
    advancedQuestionTypes: [
      'Multi-concept integration',
      'Application-based scenarios',
      'Research-based questions',
      'Case study analysis',
    ],
  },
}

// Content Quality Standards
export const contentQualityFramework = {
  neetAlignment: {
    syllabusCoverage: '100% NCERT alignment',
    questionPatterns: 'Previous year NEET analysis',
    difficultyProgression: 'Foundation to advanced',
    conceptualDepth: 'Beyond factual recall',
  },
  scientificAccuracy: {
    factualCorrectness: 'Expert-reviewed content',
    terminologyConsistency: 'Standard scientific terms',
    diagramAccuracy: 'Textbook-aligned illustrations',
    updatedContent: 'Latest scientific developments',
  },
  pedagogicalEffectiveness: {
    conceptualClarity: 'Step-by-step explanations',
    commonMistakeAddress: 'Misconception clarification',
    practicalRelevance: 'Real-world applications',
    memoryAids: 'Mnemonics and visual cues',
  },
}

export const allChapters = [...class11Chapters, ...class12Chapters]
export const totalNCERTChapters = allChapters.length
export const estimatedTotalStudyHours = allChapters.reduce(
  (sum, chapter) => sum + chapter.estimatedStudyHours,
  0
)
