import { AuthenticQuestion } from './types'

// ============================================================================
// CLASS 10 QUESTIONS - LIFE PROCESSES
// ============================================================================

export const class10Questions: AuthenticQuestion[] = [
  // Chapter: Life Processes - Nutrition
  {
    id: 'q10-001',
    topicId: 'topic-10-1-1',
    chapterId: 'ch-10-1',
    classId: 'class-10',
    question: 'In which part of the alimentary canal is protein digestion initiated?',
    options: ['Mouth', 'Stomach', 'Small intestine', 'Large intestine'],
    correctAnswer: 'Stomach',
    explanation:
      'Protein digestion begins in the stomach where pepsin enzyme breaks down proteins into peptones and proteoses. Pepsin is secreted by gastric glands and works optimally in acidic medium provided by HCl.',
    difficulty: 'Medium',
    ncertPageReference: 'Class 10, Chapter 6, Page 97',
    previousYearFrequency: 14,
    conceptualLinks: ['pepsin', 'gastric juice', 'HCl', 'proteases'],
    timeEstimate: 45,
    bloomsLevel: 'Understand',
    weightage: 4.0,
  },
  {
    id: 'q10-002',
    topicId: 'topic-10-1-2',
    chapterId: 'ch-10-1',
    classId: 'class-10',
    question: 'The end products of anaerobic respiration in yeast are:',
    options: [
      'Lactic acid and water',
      'Ethyl alcohol and carbon dioxide',
      'Carbon dioxide and water',
      'Pyruvic acid and oxygen',
    ],
    correctAnswer: 'Ethyl alcohol and carbon dioxide',
    explanation:
      'In yeast (alcoholic fermentation), anaerobic respiration produces ethyl alcohol and carbon dioxide from glucose. This process is used in brewing and baking industries. The equation is: C₆H₁₂O₆ → 2C₂H₅OH + 2CO₂',
    difficulty: 'Medium',
    ncertPageReference: 'Class 10, Chapter 6, Page 103',
    previousYearFrequency: 11,
    conceptualLinks: ['fermentation', 'glycolysis', 'pyruvic acid'],
    timeEstimate: 50,
    bloomsLevel: 'Apply',
    weightage: 3.5,
  },
  // Chapter: Control and Coordination
  {
    id: 'q10-003',
    topicId: 'topic-10-2-1',
    chapterId: 'ch-10-2',
    classId: 'class-10',
    question: 'Which part of the brain controls involuntary actions like heartbeat and breathing?',
    options: ['Cerebrum', 'Cerebellum', 'Medulla oblongata', 'Hypothalamus'],
    correctAnswer: 'Medulla oblongata',
    explanation:
      'Medulla oblongata is part of the brain stem and controls involuntary actions such as heartbeat, breathing, blood pressure, and swallowing. These are vital functions that occur without conscious thought.',
    difficulty: 'Easy',
    ncertPageReference: 'Class 10, Chapter 7, Page 115',
    previousYearFrequency: 13,
    conceptualLinks: ['brain stem', 'autonomic nervous system', 'reflex actions'],
    timeEstimate: 35,
    bloomsLevel: 'Remember',
    weightage: 4.5,
  },
  // Chapter: Heredity and Evolution
  {
    id: 'q10-004',
    topicId: 'topic-10-3-1',
    chapterId: 'ch-10-3',
    classId: 'class-10',
    question: "In Mendel's monohybrid cross, the phenotypic ratio in F2 generation is:",
    options: ['1:1', '1:2:1', '3:1', '9:3:3:1'],
    correctAnswer: '3:1',
    explanation:
      'In a monohybrid cross between homozygous dominant (TT) and homozygous recessive (tt) individuals, the F2 generation shows a phenotypic ratio of 3:1 (3 dominant : 1 recessive). The genotypic ratio is 1:2:1.',
    difficulty: 'Medium',
    ncertPageReference: 'Class 10, Chapter 8, Page 143',
    previousYearFrequency: 16,
    conceptualLinks: ['F1 generation', 'dominant traits', 'recessive traits', 'genotype'],
    timeEstimate: 55,
    bloomsLevel: 'Apply',
    weightage: 5.0,
  },
  // Additional Class 10 Questions - Transportation and Excretion
  {
    id: 'q10-005',
    topicId: 'topic-10-1-3',
    chapterId: 'ch-10-1',
    classId: 'class-10',
    question: 'Which of the following carries deoxygenated blood in humans?',
    options: [
      'Pulmonary artery and vena cava',
      'Pulmonary vein and aorta',
      'Aorta and pulmonary artery',
      'Vena cava and pulmonary vein',
    ],
    correctAnswer: 'Pulmonary artery and vena cava',
    explanation:
      'Pulmonary artery carries deoxygenated blood from right ventricle to lungs, and vena cava carries deoxygenated blood from body parts to right atrium. Pulmonary veins carry oxygenated blood from lungs to left atrium, and aorta carries oxygenated blood from left ventricle to body parts.',
    difficulty: 'Medium',
    ncertPageReference: 'Class 10, Chapter 6, Page 108',
    previousYearFrequency: 12,
    conceptualLinks: ['heart chambers', 'blood circulation', 'pulmonary circulation'],
    timeEstimate: 50,
    bloomsLevel: 'Understand',
    weightage: 3.0,
  },
  {
    id: 'q10-006',
    topicId: 'topic-10-1-4',
    chapterId: 'ch-10-1',
    classId: 'class-10',
    question: 'The functional unit of kidney is:',
    options: ['Neuron', 'Nephron', 'Alveoli', 'Villus'],
    correctAnswer: 'Nephron',
    explanation:
      "Nephron is the functional unit of kidney. Each kidney contains about 1 million nephrons. Each nephron consists of a glomerulus, Bowman's capsule, and renal tubule, which filter blood and form urine.",
    difficulty: 'Easy',
    ncertPageReference: 'Class 10, Chapter 6, Page 111',
    previousYearFrequency: 14,
    conceptualLinks: ['glomerulus', 'Bowmans capsule', 'urine formation'],
    timeEstimate: 25,
    bloomsLevel: 'Remember',
    weightage: 2.5,
  },
  // Plant Hormones and Growth
  {
    id: 'q10-007',
    topicId: 'topic-10-2-2',
    chapterId: 'ch-10-2',
    classId: 'class-10',
    question: 'Which plant hormone is responsible for cell elongation and apical dominance?',
    options: ['Cytokinin', 'Gibberellin', 'Auxin', 'Abscisic acid'],
    correctAnswer: 'Auxin',
    explanation:
      'Auxin promotes cell elongation, apical dominance (suppression of lateral buds), and phototropism. It is produced in the apical meristem and moves downward through the plant. Cytokinins promote cell division, gibberellins promote stem elongation, and abscisic acid inhibits growth.',
    difficulty: 'Medium',
    ncertPageReference: 'Class 10, Chapter 7, Page 121',
    previousYearFrequency: 10,
    conceptualLinks: ['phototropism', 'geotropism', 'apical dominance'],
    timeEstimate: 45,
    bloomsLevel: 'Understand',
    weightage: 3.5,
  },
]

// ============================================================================
// CLASS 11 QUESTIONS - STRUCTURAL ORGANIZATION
// ============================================================================
