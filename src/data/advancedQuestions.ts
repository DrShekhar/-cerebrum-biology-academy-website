/**
 * Advanced NEET Biology Questions - Comprehensive Sample Set
 * Includes all 6 question types with proper Biology content
 */

import {
  AssertionReasonQuestion,
  MatchFollowingQuestion,
  DiagramBasedQuestion,
  MultipleCorrectQuestion,
  NumericalQuestion,
  StatementBasedQuestion
} from './neetQuestionBank'

// ========== ASSERTION-REASON QUESTIONS ==========
export const advancedAssertionReasonQuestions: AssertionReasonQuestion[] = [
  {
    id: 'ar-bio-001',
    chapterId: 'ch11-8',
    topicId: 'topic-cell-biology',
    questionText: 'Analyze the following assertion and reason about mitochondria:',
    questionType: 'assertion-reason',
    difficulty: 'medium',
    assertion: 'Mitochondria are known as the powerhouse of the cell.',
    reason: 'Mitochondria produce ATP through cellular respiration in their cristae.',
    options: [
      'Both A and R are true and R is the correct explanation of A',
      'Both A and R are true but R is not the correct explanation of A',
      'A is true but R is false',
      'A is false but R is true'
    ],
    correctAnswer: 'Both A and R are true and R is the correct explanation of A',
    explanation: 'Mitochondria are indeed called the powerhouse of the cell because they generate most of the ATP required for cellular processes. The cristae (inner membrane folds) contain the electron transport chain where ATP is produced through oxidative phosphorylation.',
    ncertReference: 'Class XI, Chapter 8, Page 142',
    previousYearFrequency: 8,
    estimatedTimeSeconds: 90,
    tags: ['mitochondria', 'ATP production', 'cellular respiration'],
    relatedConcepts: ['cristae', 'electron transport chain', 'oxidative phosphorylation'],
    bloomsLevel: 'Analyze',
    neetYearSource: 'NEET 2023',
    conceptualLinks: ['ch11-14', 'ch11-15'],
    timeManagementTip: 'First verify if both statements are factually correct, then check causal relationship'
  },
  {
    id: 'ar-bio-002',
    chapterId: 'ch11-19',
    topicId: 'topic-genetics',
    questionText: 'Evaluate the assertion and reason about DNA replication:',
    questionType: 'assertion-reason',
    difficulty: 'hard',
    assertion: 'DNA replication is bidirectional in prokaryotes.',
    reason: 'Prokaryotes have multiple origins of replication.',
    options: [
      'Both A and R are true and R is the correct explanation of A',
      'Both A and R are true but R is not the correct explanation of A',
      'A is true but R is false',
      'A is false but R is true'
    ],
    correctAnswer: 'A is true but R is false',
    explanation: 'DNA replication in prokaryotes is indeed bidirectional, proceeding in both directions from the origin. However, prokaryotes typically have only one origin of replication (oriC), unlike eukaryotes which have multiple origins.',
    ncertReference: 'Class XII, Chapter 6, Page 102',
    previousYearFrequency: 4,
    estimatedTimeSeconds: 120,
    tags: ['DNA replication', 'prokaryotes', 'origin of replication'],
    relatedConcepts: ['bidirectional replication', 'oriC', 'eukaryotic replication'],
    bloomsLevel: 'Evaluate',
    neetYearSource: 'NEET 2022',
    conceptualLinks: ['ch12-6', 'ch12-7'],
    timeManagementTip: 'Distinguish between prokaryotic and eukaryotic replication mechanisms'
  }
]

// ========== MATCH THE FOLLOWING QUESTIONS ==========
export const advancedMatchFollowingQuestions: MatchFollowingQuestion[] = [
  {
    id: 'mf-bio-001',
    chapterId: 'ch11-11',
    topicId: 'topic-transport',
    questionText: 'Match the following transport mechanisms with their characteristics:',
    questionType: 'match-following',
    difficulty: 'medium',
    columnA: [
      { id: 'a1', text: 'Simple diffusion' },
      { id: 'a2', text: 'Facilitated diffusion' },
      { id: 'a3', text: 'Active transport' },
      { id: 'a4', text: 'Osmosis' }
    ],
    columnB: [
      { id: 'b1', text: 'Requires energy and carrier proteins' },
      { id: 'b2', text: 'Movement of water through semi-permeable membrane' },
      { id: 'b3', text: 'Uses channel proteins, no energy required' },
      { id: 'b4', text: 'Direct movement through lipid bilayer' }
    ],
    correctMatches: [
      { aId: 'a1', bId: 'b4' },
      { aId: 'a2', bId: 'b3' },
      { aId: 'a3', bId: 'b1' },
      { aId: 'a4', bId: 'b2' }
    ],
    options: [
      'A-4, B-3, C-1, D-2',
      'A-3, B-4, C-2, D-1',
      'A-2, B-1, C-4, D-3',
      'A-1, B-2, C-3, D-4'
    ],
    correctAnswer: 'A-4, B-3, C-1, D-2',
    explanation: 'Simple diffusion occurs directly through the lipid bilayer. Facilitated diffusion uses channel/carrier proteins without energy. Active transport requires both energy (ATP) and carrier proteins. Osmosis is specifically water movement through semi-permeable membranes.',
    ncertReference: 'Class XI, Chapter 11, Pages 190-195',
    previousYearFrequency: 6,
    estimatedTimeSeconds: 150,
    tags: ['membrane transport', 'diffusion', 'osmosis', 'active transport'],
    relatedConcepts: ['membrane permeability', 'concentration gradient', 'ATP'],
    bloomsLevel: 'Apply',
    conceptualLinks: ['ch11-8', 'ch11-12'],
    timeManagementTip: 'Group energy-requiring vs energy-independent processes first'
  },
  {
    id: 'mf-bio-002',
    chapterId: 'ch12-4',
    topicId: 'topic-reproduction',
    questionText: 'Match the reproductive structures with their functions in flowering plants:',
    questionType: 'match-following',
    difficulty: 'easy',
    columnA: [
      { id: 'a1', text: 'Anther' },
      { id: 'a2', text: 'Stigma' },
      { id: 'a3', text: 'Ovary' },
      { id: 'a4', text: 'Pollen tube' }
    ],
    columnB: [
      { id: 'b1', text: 'Receives pollen grains' },
      { id: 'b2', text: 'Contains ovules' },
      { id: 'b3', text: 'Produces pollen grains' },
      { id: 'b4', text: 'Conducts male gametes' }
    ],
    correctMatches: [
      { aId: 'a1', bId: 'b3' },
      { aId: 'a2', bId: 'b1' },
      { aId: 'a3', bId: 'b2' },
      { aId: 'a4', bId: 'b4' }
    ],
    options: [
      'A-3, B-1, C-2, D-4',
      'A-1, B-2, C-3, D-4',
      'A-2, B-3, C-4, D-1',
      'A-4, B-1, C-3, D-2'
    ],
    correctAnswer: 'A-3, B-1, C-2, D-4',
    explanation: 'Anther produces pollen grains containing male gametes. Stigma is the receptive surface for pollen. Ovary contains ovules which develop into seeds. Pollen tube grows from pollen grain to conduct sperm cells to the ovule.',
    ncertReference: 'Class XII, Chapter 2, Pages 25-30',
    previousYearFrequency: 9,
    estimatedTimeSeconds: 120,
    tags: ['flower structure', 'reproduction', 'pollination'],
    relatedConcepts: ['fertilization', 'gametes', 'seed formation'],
    bloomsLevel: 'Remember',
    conceptualLinks: ['ch12-2', 'ch12-3'],
    timeManagementTip: 'Remember the sequence: anther → stigma → pollen tube → ovary'
  }
]

// ========== DIAGRAM-BASED QUESTIONS ==========
export const advancedDiagramBasedQuestions: DiagramBasedQuestion[] = [
  {
    id: 'db-bio-001',
    chapterId: 'ch11-17',
    topicId: 'topic-breathing',
    questionText: 'The diagram shows the structure of human respiratory system. Identify the part labeled X and its primary function:',
    questionType: 'diagram-based',
    difficulty: 'medium',
    diagramUrl: '/images/respiratory-system-diagram.png',
    diagramDescription: 'Human respiratory system showing trachea, bronchi, bronchioles, and alveoli with X pointing to alveolar sacs',
    labelledParts: [
      { id: 'x', name: 'Alveoli', position: { x: 70, y: 65 } },
      { id: 'y', name: 'Bronchiole', position: { x: 45, y: 55 } },
      { id: 'z', name: 'Trachea', position: { x: 50, y: 25 } }
    ],
    options: [
      'Gas exchange between blood and air',
      'Filtering and warming of incoming air',
      'Production of surfactant only',
      'Conduction of air to lungs'
    ],
    correctAnswer: 'Gas exchange between blood and air',
    explanation: 'X represents the alveoli, which are tiny air sacs surrounded by dense capillary networks. This is where actual gas exchange occurs - oxygen enters the blood and carbon dioxide is removed. The thin alveolar wall facilitates efficient diffusion.',
    ncertReference: 'Class XI, Chapter 17, Page 290',
    previousYearFrequency: 12,
    estimatedTimeSeconds: 90,
    tags: ['respiratory system', 'alveoli', 'gas exchange'],
    relatedConcepts: ['diffusion', 'capillaries', 'hemoglobin'],
    bloomsLevel: 'Apply',
    neetYearSource: 'NEET 2023',
    conceptualLinks: ['ch11-18', 'ch11-19'],
    timeManagementTip: 'Identify the structure first, then match with its specific function'
  },
  {
    id: 'db-bio-002',
    chapterId: 'ch11-8',
    topicId: 'topic-cell-biology',
    questionText: 'The electron micrograph shows a cell organelle. What is the function of the structure indicated by the arrow?',
    questionType: 'diagram-based',
    difficulty: 'hard',
    diagramUrl: '/images/chloroplast-structure.png',
    diagramDescription: 'Chloroplast ultrastructure showing outer membrane, inner membrane, stroma, and thylakoids with arrow pointing to grana',
    labelledParts: [
      { id: 'grana', name: 'Grana', position: { x: 60, y: 40 } },
      { id: 'stroma', name: 'Stroma', position: { x: 30, y: 60 } },
      { id: 'envelope', name: 'Chloroplast envelope', position: { x: 20, y: 20 } }
    ],
    options: [
      'Calvin cycle reactions',
      'Light-dependent reactions',
      'Protein synthesis',
      'Lipid storage'
    ],
    correctAnswer: 'Light-dependent reactions',
    explanation: 'The arrow points to grana, which are stacks of thylakoids. Grana contain chlorophyll and other photosynthetic pigments, and this is where light-dependent reactions (photosystem I and II) occur during photosynthesis.',
    ncertReference: 'Class XI, Chapter 13, Page 225',
    previousYearFrequency: 7,
    estimatedTimeSeconds: 105,
    tags: ['chloroplast', 'grana', 'photosynthesis'],
    relatedConcepts: ['thylakoids', 'light reactions', 'photosystems'],
    bloomsLevel: 'Analyze',
    neetYearSource: 'NEET 2022',
    conceptualLinks: ['ch11-13', 'ch11-14'],
    timeManagementTip: 'Distinguish between grana (light reactions) and stroma (dark reactions)'
  }
]

// ========== MULTIPLE CORRECT QUESTIONS ==========
export const advancedMultipleCorrectQuestions: MultipleCorrectQuestion[] = [
  {
    id: 'mc-bio-001',
    chapterId: 'ch11-9',
    topicId: 'topic-biomolecules',
    questionText: 'Which of the following statements about enzymes are correct?',
    questionType: 'multiple-correct',
    difficulty: 'medium',
    options: [
      'Enzymes lower the activation energy of reactions',
      'All enzymes are proteins in nature',
      'Enzymes are consumed in the reactions they catalyze',
      'Enzyme activity can be affected by temperature and pH',
      'Enzymes are specific for their substrates'
    ],
    correctAnswers: [
      'Enzymes lower the activation energy of reactions',
      'Enzyme activity can be affected by temperature and pH',
      'Enzymes are specific for their substrates'
    ],
    maxSelections: 4,
    partialMarking: {
      fullMarks: 4,
      partialMarks: 2,
      negativeMarks: -1
    },
    explanation: 'Enzymes lower activation energy (correct), are affected by temperature and pH (correct), and show substrate specificity (correct). However, not all enzymes are proteins (ribozymes are RNA), and enzymes are not consumed - they are regenerated after the reaction.',
    ncertReference: 'Class XI, Chapter 9, Pages 165-170',
    previousYearFrequency: 8,
    estimatedTimeSeconds: 120,
    tags: ['enzymes', 'catalysis', 'protein structure'],
    relatedConcepts: ['activation energy', 'enzyme kinetics', 'ribozymes'],
    bloomsLevel: 'Analyze',
    conceptualLinks: ['ch11-10', 'ch12-8'],
    timeManagementTip: 'Consider each statement independently; avoid common misconceptions'
  },
  {
    id: 'mc-bio-002',
    chapterId: 'ch12-5',
    topicId: 'topic-inheritance',
    questionText: 'In Mendel\'s experiments with pea plants, which of the following observations led to his laws of inheritance?',
    questionType: 'multiple-correct',
    difficulty: 'easy',
    options: [
      'Traits exist in alternative forms (alleles)',
      'One trait can mask the expression of another (dominance)',
      'Traits assort independently during gamete formation',
      'Acquired characteristics are inherited',
      'F2 generation shows 3:1 ratio in monohybrid cross'
    ],
    correctAnswers: [
      'Traits exist in alternative forms (alleles)',
      'One trait can mask the expression of another (dominance)',
      'Traits assort independently during gamete formation',
      'F2 generation shows 3:1 ratio in monohybrid cross'
    ],
    maxSelections: 4,
    partialMarking: {
      fullMarks: 4,
      partialMarks: 2,
      negativeMarks: -1
    },
    explanation: 'Mendel\'s observations included: existence of alleles, dominance relationships, independent assortment, and the 3:1 ratio in F2. However, inheritance of acquired characteristics was proposed by Lamarck, not Mendel.',
    ncertReference: 'Class XII, Chapter 5, Pages 75-85',
    previousYearFrequency: 10,
    estimatedTimeSeconds: 90,
    tags: ['Mendel', 'inheritance', 'genetics'],
    relatedConcepts: ['alleles', 'dominance', 'independent assortment'],
    bloomsLevel: 'Remember',
    conceptualLinks: ['ch12-5', 'ch12-6'],
    timeManagementTip: 'Focus on Mendel\'s specific contributions, not general inheritance theories'
  }
]

// ========== NUMERICAL QUESTIONS ==========
export const advancedNumericalQuestions: NumericalQuestion[] = [
  {
    id: 'num-bio-001',
    chapterId: 'ch11-15',
    topicId: 'topic-respiration',
    questionText: 'During aerobic respiration, if 6 molecules of glucose are completely oxidized, how many molecules of ATP are produced through oxidative phosphorylation (assume 2.5 ATP per NADH and 1.5 ATP per FADH2)?',
    questionType: 'numerical',
    difficulty: 'hard',
    answerType: 'integer',
    correctAnswer: 180,
    unit: 'molecules',
    range: { min: 150, max: 200 },
    calculationSteps: [
      'Per glucose: Glycolysis produces 2 NADH, Krebs cycle produces 6 NADH + 2 FADH2',
      'Total per glucose: 8 NADH + 2 FADH2',
      'ATP from NADH: 8 × 2.5 = 20 ATP per glucose',
      'ATP from FADH2: 2 × 1.5 = 3 ATP per glucose',
      'Total per glucose: 20 + 3 = 23 ATP from oxidative phosphorylation',
      'For 6 glucose molecules: 6 × 23 = 138 ATP'
    ],
    explanation: 'Each glucose yields 8 NADH (2 from glycolysis + 6 from Krebs cycle) and 2 FADH2 (from Krebs cycle). In oxidative phosphorylation: 8 NADH × 2.5 ATP + 2 FADH2 × 1.5 ATP = 23 ATP per glucose. For 6 glucose: 6 × 23 = 138 ATP. Note: This excludes substrate-level phosphorylation.',
    ncertReference: 'Class XI, Chapter 14, Pages 250-255',
    previousYearFrequency: 3,
    estimatedTimeSeconds: 180,
    tags: ['cellular respiration', 'ATP production', 'oxidative phosphorylation'],
    relatedConcepts: ['electron transport chain', 'NADH', 'FADH2'],
    bloomsLevel: 'Apply',
    conceptualLinks: ['ch11-13', 'ch11-14'],
    timeManagementTip: 'Break down into steps: count NADH/FADH2, then calculate ATP yield'
  },
  {
    id: 'num-bio-002',
    chapterId: 'ch12-5',
    topicId: 'topic-genetics',
    questionText: 'In a dihybrid cross between two heterozygous parents (AaBb × AaBb), how many different genotypes are possible in the F2 generation?',
    questionType: 'numerical',
    difficulty: 'medium',
    answerType: 'integer',
    correctAnswer: 9,
    range: { min: 5, max: 15 },
    calculationSteps: [
      'Each gene has 3 possible genotypes: AA, Aa, aa (same for B gene)',
      'For gene A: AA, Aa, aa (3 genotypes)',
      'For gene B: BB, Bb, bb (3 genotypes)',
      'Total combinations: 3 × 3 = 9 different genotypes',
      'These are: AABB, AABb, AAbb, AaBB, AaBb, Aabb, aaBB, aaBb, aabb'
    ],
    explanation: 'In a dihybrid cross, each gene can have 3 genotypic forms (homozygous dominant, heterozygous, homozygous recessive). Since the genes assort independently, the total number of different genotypes is 3 × 3 = 9.',
    ncertReference: 'Class XII, Chapter 5, Page 88',
    previousYearFrequency: 4,
    estimatedTimeSeconds: 90,
    tags: ['dihybrid cross', 'genotypes', 'independent assortment'],
    relatedConcepts: ['Punnett square', 'heterozygous', 'inheritance patterns'],
    bloomsLevel: 'Apply',
    conceptualLinks: ['ch12-5'],
    timeManagementTip: 'Use the formula: (number of genotypes for gene 1) × (number of genotypes for gene 2)'
  }
]

// ========== STATEMENT-BASED QUESTIONS ==========
export const advancedStatementBasedQuestions: StatementBasedQuestion[] = [
  {
    id: 'sb-bio-001',
    chapterId: 'ch11-13',
    topicId: 'topic-photosynthesis',
    questionText: 'Evaluate the following statements about photosynthesis:',
    questionType: 'statement-based',
    difficulty: 'medium',
    statements: [
      {
        id: 's1',
        text: 'Light reaction occurs in the stroma of chloroplasts',
        isCorrect: false
      },
      {
        id: 's2',
        text: 'Calvin cycle requires ATP and NADPH from light reactions',
        isCorrect: true
      },
      {
        id: 's3',
        text: 'Oxygen is released during the Calvin cycle',
        isCorrect: false
      },
      {
        id: 's4',
        text: 'Chlorophyll absorbs light most efficiently in red and blue regions',
        isCorrect: true
      }
    ],
    evaluationType: 'individual',
    options: [
      'Statements 2 and 4 are correct',
      'Statements 1, 2 and 4 are correct',
      'All statements are correct',
      'Only statement 2 is correct'
    ],
    correctAnswer: 'Statements 2 and 4 are correct',
    explanation: 'Statement 1 is incorrect - light reactions occur in thylakoids, not stroma. Statement 2 is correct - Calvin cycle uses ATP and NADPH from light reactions. Statement 3 is incorrect - oxygen is released during light reactions, not Calvin cycle. Statement 4 is correct - chlorophyll absorbs red and blue light efficiently, reflecting green.',
    ncertReference: 'Class XI, Chapter 13, Pages 225-235',
    previousYearFrequency: 6,
    estimatedTimeSeconds: 120,
    tags: ['photosynthesis', 'light reactions', 'Calvin cycle'],
    relatedConcepts: ['chloroplast structure', 'chlorophyll', 'ATP synthesis'],
    bloomsLevel: 'Evaluate',
    conceptualLinks: ['ch11-8', 'ch11-14'],
    timeManagementTip: 'Distinguish between events in thylakoids vs stroma'
  },
  {
    id: 'sb-bio-002',
    chapterId: 'ch12-7',
    topicId: 'topic-evolution',
    questionText: 'Analyze the following statements about evidence for evolution:',
    questionType: 'statement-based',
    difficulty: 'easy',
    statements: [
      {
        id: 's1',
        text: 'Homologous organs have similar structure but different functions',
        isCorrect: true
      },
      {
        id: 's2',
        text: 'Vestigial organs provide evidence for evolution',
        isCorrect: true
      },
      {
        id: 's3',
        text: 'Analogous organs indicate common ancestry',
        isCorrect: false
      },
      {
        id: 's4',
        text: 'Embryological similarities suggest evolutionary relationships',
        isCorrect: true
      }
    ],
    evaluationType: 'individual',
    options: [
      'Statements 1, 2 and 4 are correct',
      'All statements are correct',
      'Statements 2, 3 and 4 are correct',
      'Only statements 1 and 2 are correct'
    ],
    correctAnswer: 'Statements 1, 2 and 4 are correct',
    explanation: 'Statement 1 is correct - homologous organs show structural similarity due to common ancestry. Statement 2 is correct - vestigial organs are evolutionary remnants. Statement 3 is incorrect - analogous organs indicate convergent evolution, not common ancestry. Statement 4 is correct - embryological similarities reflect evolutionary relationships.',
    ncertReference: 'Class XII, Chapter 7, Pages 125-130',
    previousYearFrequency: 5,
    estimatedTimeSeconds: 100,
    tags: ['evolution', 'homologous organs', 'analogous organs'],
    relatedConcepts: ['common ancestry', 'convergent evolution', 'embryology'],
    bloomsLevel: 'Understand',
    conceptualLinks: ['ch12-7', 'ch12-8'],
    timeManagementTip: 'Remember: homologous = similar structure, analogous = similar function'
  }
]

// ========== EXPORT ALL ADVANCED QUESTIONS ==========
export const allAdvancedQuestions = {
  assertionReason: advancedAssertionReasonQuestions,
  matchFollowing: advancedMatchFollowingQuestions,
  diagramBased: advancedDiagramBasedQuestions,
  multipleCorrect: advancedMultipleCorrectQuestions,
  numerical: advancedNumericalQuestions,
  statementBased: advancedStatementBasedQuestions
}

// Question distribution summary
export const advancedQuestionStats = {
  total: Object.values(allAdvancedQuestions).reduce((sum, questions) => sum + questions.length, 0),
  byType: {
    'assertion-reason': advancedAssertionReasonQuestions.length,
    'match-following': advancedMatchFollowingQuestions.length,
    'diagram-based': advancedDiagramBasedQuestions.length,
    'multiple-correct': advancedMultipleCorrectQuestions.length,
    'numerical': advancedNumericalQuestions.length,
    'statement-based': advancedStatementBasedQuestions.length
  },
  byDifficulty: {
    easy: Object.values(allAdvancedQuestions).flat().filter(q => q.difficulty === 'easy').length,
    medium: Object.values(allAdvancedQuestions).flat().filter(q => q.difficulty === 'medium').length,
    hard: Object.values(allAdvancedQuestions).flat().filter(q => q.difficulty === 'hard').length
  },
  avgTimeSeconds: Math.round(
    Object.values(allAdvancedQuestions).flat()
      .reduce((sum, q) => sum + q.estimatedTimeSeconds, 0) /
    Object.values(allAdvancedQuestions).flat().length
  )
}