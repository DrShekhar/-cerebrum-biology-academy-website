import { AuthenticQuestion } from './types'

// ============================================================================
// CLASS 9 QUESTIONS - FOUNDATION BIOLOGY
// ============================================================================

export const class9Questions: AuthenticQuestion[] = [
  // Chapter: The Fundamental Unit of Life
  {
    id: 'q9-001',
    topicId: 'topic-9-1-1',
    chapterId: 'ch-9-1',
    classId: 'class-9',
    question: 'According to cell theory, which of the following statements is correct?',
    options: [
      'All living organisms are composed of cells and cell products',
      'Only plants and animals are made up of cells',
      'Viruses are considered as cells',
      'Cells can arise from non-living matter',
    ],
    correctAnswer: 'All living organisms are composed of cells and cell products',
    explanation:
      'Cell theory states that: (1) All living organisms are composed of one or more cells, (2) Cell is the basic unit of life, and (3) All cells arise from pre-existing cells. This fundamental principle was proposed by Schleiden, Schwann, and Virchow.',
    difficulty: 'Easy',
    ncertPageReference: 'Class 9, Chapter 5, Page 61',
    previousYearFrequency: 12,
    conceptualLinks: ['prokaryotes', 'eukaryotes', 'unicellular organisms'],
    timeEstimate: 30,
    bloomsLevel: 'Remember',
    weightage: 2.5,
  },
  {
    id: 'q9-002',
    topicId: 'topic-9-1-2',
    chapterId: 'ch-9-1',
    classId: 'class-9',
    question: 'Which of the following organelles is known as the "powerhouse of the cell"?',
    options: ['Nucleus', 'Mitochondria', 'Ribosomes', 'Endoplasmic reticulum'],
    correctAnswer: 'Mitochondria',
    explanation:
      'Mitochondria are called the "powerhouse of the cell" because they produce ATP (adenosine triphosphate) through cellular respiration. ATP is the energy currency of the cell, making mitochondria essential for cellular energy production.',
    difficulty: 'Easy',
    ncertPageReference: 'Class 9, Chapter 5, Page 67',
    previousYearFrequency: 15,
    conceptualLinks: ['cellular respiration', 'ATP', 'cristae'],
    timeEstimate: 25,
    bloomsLevel: 'Remember',
    weightage: 3.0,
  },
  // Chapter: Tissues
  {
    id: 'q9-003',
    topicId: 'topic-9-2-1',
    chapterId: 'ch-9-2',
    classId: 'class-9',
    question: 'Apical meristem is responsible for:',
    options: [
      'Increase in girth of the plant',
      'Increase in length of the plant',
      'Formation of cork',
      'Secondary growth',
    ],
    correctAnswer: 'Increase in length of the plant',
    explanation:
      'Apical meristem is present at the tips of roots and shoots. It is responsible for the primary growth of plants, which results in an increase in length. Secondary growth (increase in girth) is due to lateral meristem.',
    difficulty: 'Medium',
    ncertPageReference: 'Class 9, Chapter 6, Page 82',
    previousYearFrequency: 8,
    conceptualLinks: ['lateral meristem', 'primary growth', 'secondary growth'],
    timeEstimate: 40,
    bloomsLevel: 'Understand',
    weightage: 2.8,
  },
  {
    id: 'q9-004',
    topicId: 'topic-9-2-2',
    chapterId: 'ch-9-2',
    classId: 'class-9',
    question: 'Which type of animal tissue connects different tissues and organs?',
    options: ['Epithelial tissue', 'Muscular tissue', 'Nervous tissue', 'Connective tissue'],
    correctAnswer: 'Connective tissue',
    explanation:
      'Connective tissue connects different tissues and organs of the body. It includes blood, bone, cartilage, adipose tissue, and areolar tissue. It provides support, protection, and fills spaces between organs.',
    difficulty: 'Easy',
    ncertPageReference: 'Class 9, Chapter 6, Page 87',
    previousYearFrequency: 10,
    conceptualLinks: ['blood', 'bone', 'cartilage', 'ligaments'],
    timeEstimate: 35,
    bloomsLevel: 'Remember',
    weightage: 3.2,
  },
  // Additional Class 9 Questions - Life Processes Foundation
  {
    id: 'q9-005',
    topicId: 'topic-9-1-3',
    chapterId: 'ch-9-1',
    classId: 'class-9',
    question: 'The selectively permeable membrane allows:',
    options: [
      'All substances to pass through freely',
      'Only water molecules to pass through',
      'Some substances to pass through while restricting others',
      'No substances to pass through',
    ],
    correctAnswer: 'Some substances to pass through while restricting others',
    explanation:
      'A selectively permeable membrane, also called semi-permeable membrane, allows certain substances to pass through while restricting others based on size, charge, or other properties. This is essential for maintaining cellular homeostasis.',
    difficulty: 'Easy',
    ncertPageReference: 'Class 9, Chapter 5, Page 65',
    previousYearFrequency: 9,
    conceptualLinks: ['osmosis', 'diffusion', 'cell membrane transport'],
    timeEstimate: 30,
    bloomsLevel: 'Understand',
    weightage: 2.0,
  },
  {
    id: 'q9-006',
    topicId: 'topic-9-2-1',
    chapterId: 'ch-9-2',
    classId: 'class-9',
    question: 'Which of the following is NOT a permanent tissue?',
    options: ['Parenchyma', 'Collenchyma', 'Cambium', 'Sclerenchyma'],
    correctAnswer: 'Cambium',
    explanation:
      'Cambium is a meristematic tissue (actively dividing tissue), not a permanent tissue. Parenchyma, collenchyma, and sclerenchyma are permanent tissues that have lost their ability to divide and have specific functions.',
    difficulty: 'Medium',
    ncertPageReference: 'Class 9, Chapter 6, Page 84',
    previousYearFrequency: 7,
    conceptualLinks: ['meristematic tissue', 'simple permanent tissue', 'plant anatomy'],
    timeEstimate: 40,
    bloomsLevel: 'Remember',
    weightage: 2.8,
  },
]
