/**
 * Authentic NCERT-aligned Biology Question Bank
 * High-quality MCQs with proper NEET format and scientific accuracy
 */

export interface AuthenticQuestion {
  id: string
  topicId: string
  chapterId: string
  classId: string
  question: string
  options: [string, string, string, string]
  correctAnswer: string
  explanation: string
  difficulty: 'Easy' | 'Medium' | 'Hard'
  ncertPageReference: string
  previousYearFrequency: number
  conceptualLinks: string[]
  timeEstimate: number // seconds
  bloomsLevel: 'Remember' | 'Understand' | 'Apply' | 'Analyze' | 'Evaluate'
  weightage: number
}

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

export const class11Questions: AuthenticQuestion[] = [
  // Chapter: Cell - The Unit of Life
  {
    id: 'q11-001',
    topicId: 'topic-11-8-1',
    chapterId: 'ch-11-8',
    classId: 'class-11',
    question: 'Which of the following is NOT a characteristic feature of prokaryotic cells?',
    options: [
      'Absence of membrane-bound nucleus',
      'Presence of 70S ribosomes',
      'Absence of histone proteins',
      'Presence of membrane-bound organelles',
    ],
    correctAnswer: 'Presence of membrane-bound organelles',
    explanation:
      'Prokaryotic cells lack membrane-bound organelles like mitochondria, chloroplasts, ER, and Golgi apparatus. They have nucleoid region (not membrane-bound nucleus), 70S ribosomes, and DNA without histone proteins.',
    difficulty: 'Medium',
    ncertPageReference: 'Class 11, Chapter 8, Page 134',
    previousYearFrequency: 18,
    conceptualLinks: ['eukaryotic cells', 'nucleoid', 'plasmids'],
    timeEstimate: 40,
    bloomsLevel: 'Understand',
    weightage: 4.0,
  },
  {
    id: 'q11-002',
    topicId: 'topic-11-8-2',
    chapterId: 'ch-11-8',
    classId: 'class-11',
    question: 'The fluid mosaic model of plasma membrane was proposed by:',
    options: [
      'Watson and Crick',
      'Singer and Nicolson',
      'Schleiden and Schwann',
      'Darwin and Wallace',
    ],
    correctAnswer: 'Singer and Nicolson',
    explanation:
      'The fluid mosaic model was proposed by Singer and Nicolson in 1972. It describes the plasma membrane as a fluid lipid bilayer with proteins embedded in it, both of which can move laterally within the membrane.',
    difficulty: 'Easy',
    ncertPageReference: 'Class 11, Chapter 8, Page 137',
    previousYearFrequency: 9,
    conceptualLinks: ['phospholipid bilayer', 'membrane proteins', 'membrane fluidity'],
    timeEstimate: 30,
    bloomsLevel: 'Remember',
    weightage: 3.5,
  },
  // Chapter: Biomolecules
  {
    id: 'q11-003',
    topicId: 'topic-11-9-2',
    chapterId: 'ch-11-9',
    classId: 'class-11',
    question: 'The secondary structure of proteins is maintained by:',
    options: ['Peptide bonds', 'Hydrogen bonds', 'Ionic bonds', 'Van der Waals forces'],
    correctAnswer: 'Hydrogen bonds',
    explanation:
      'Secondary structure of proteins (α-helix and β-pleated sheet) is maintained by hydrogen bonds between the backbone atoms of amino acids. Primary structure is maintained by peptide bonds.',
    difficulty: 'Medium',
    ncertPageReference: 'Class 11, Chapter 9, Page 157',
    previousYearFrequency: 12,
    conceptualLinks: ['α-helix', 'β-pleated sheet', 'tertiary structure', 'amino acids'],
    timeEstimate: 50,
    bloomsLevel: 'Understand',
    weightage: 5.0,
  },
  // Chapter: Photosynthesis
  {
    id: 'q11-004',
    topicId: 'topic-11-13-1',
    chapterId: 'ch-11-13',
    classId: 'class-11',
    question: 'In cyclic photophosphorylation, the electron transport chain involves:',
    options: [
      'Only Photosystem I',
      'Only Photosystem II',
      'Both Photosystem I and II',
      'Neither Photosystem I nor II',
    ],
    correctAnswer: 'Only Photosystem I',
    explanation:
      'Cyclic photophosphorylation involves only Photosystem I (PS I). Electrons from P700 pass through electron carriers and return to PS I, generating ATP but not NADPH. No water splitting or oxygen evolution occurs.',
    difficulty: 'Hard',
    ncertPageReference: 'Class 11, Chapter 13, Page 225',
    previousYearFrequency: 7,
    conceptualLinks: ['non-cyclic photophosphorylation', 'PS I', 'P700', 'ATP synthesis'],
    timeEstimate: 60,
    bloomsLevel: 'Analyze',
    weightage: 5.0,
  },
  // Additional Class 11 Questions - Plant Kingdom and Animal Kingdom
  {
    id: 'q11-005',
    topicId: 'topic-11-3-5',
    chapterId: 'ch-11-3',
    classId: 'class-11',
    question: 'Which of the following is the largest group among angiosperms?',
    options: ['Monocotyledons', 'Dicotyledons', 'Gymnosperms', 'Pteridophytes'],
    correctAnswer: 'Dicotyledons',
    explanation:
      'Dicotyledons (eudicots) form the largest group among angiosperms with about 200,000 species. They are characterized by two cotyledons, reticulate venation, pentamerous flowers, and secondary growth. Monocots have about 60,000 species.',
    difficulty: 'Easy',
    ncertPageReference: 'Class 11, Chapter 3, Page 55',
    previousYearFrequency: 6,
    conceptualLinks: ['monocots', 'flower structure', 'venation patterns'],
    timeEstimate: 30,
    bloomsLevel: 'Remember',
    weightage: 3.0,
  },
  {
    id: 'q11-006',
    topicId: 'topic-11-4-2',
    chapterId: 'ch-11-4',
    classId: 'class-11',
    question: 'Which of the following is a characteristic feature of class Mammalia?',
    options: [
      'Scales on body surface',
      'Mammary glands and hair',
      'Feathers and wings',
      'Moist skin without scales',
    ],
    correctAnswer: 'Mammary glands and hair',
    explanation:
      'Mammary glands and hair are characteristic features of class Mammalia. Mammary glands produce milk for nourishing young ones, and hair provides insulation. Other features include four-chambered heart, warm-blooded nature, and live birth (except monotremes).',
    difficulty: 'Easy',
    ncertPageReference: 'Class 11, Chapter 4, Page 72',
    previousYearFrequency: 8,
    conceptualLinks: ['vertebrates', 'chordates', 'warm-blooded animals'],
    timeEstimate: 35,
    bloomsLevel: 'Remember',
    weightage: 4.5,
  },
  // Respiratory Pigments and Transport
  {
    id: 'q11-007',
    topicId: 'topic-11-8-3',
    chapterId: 'ch-11-8',
    classId: 'class-11',
    question: 'Which type of transport does NOT require energy expenditure by the cell?',
    options: ['Active transport', 'Facilitated diffusion', 'Endocytosis', 'Exocytosis'],
    correctAnswer: 'Facilitated diffusion',
    explanation:
      'Facilitated diffusion is a passive transport process that does not require energy (ATP). It uses specific transport proteins to move substances along their concentration gradient. Active transport, endocytosis, and exocytosis all require energy expenditure.',
    difficulty: 'Medium',
    ncertPageReference: 'Class 11, Chapter 8, Page 140',
    previousYearFrequency: 11,
    conceptualLinks: ['passive transport', 'transport proteins', 'concentration gradient'],
    timeEstimate: 45,
    bloomsLevel: 'Understand',
    weightage: 4.5,
  },
  // Enzyme Function and Regulation
  {
    id: 'q11-008',
    topicId: 'topic-11-9-2',
    chapterId: 'ch-11-9',
    classId: 'class-11',
    question: 'The active site of an enzyme is:',
    options: [
      'The entire enzyme molecule',
      'The specific region where substrate binds',
      'The product formation site only',
      'The allosteric site',
    ],
    correctAnswer: 'The specific region where substrate binds',
    explanation:
      'The active site is a specific region of the enzyme where the substrate binds and the catalytic reaction occurs. It has a complementary shape to the substrate (lock-and-key model) or induces fit upon substrate binding (induced fit model).',
    difficulty: 'Medium',
    ncertPageReference: 'Class 11, Chapter 9, Page 160',
    previousYearFrequency: 13,
    conceptualLinks: ['enzyme-substrate complex', 'lock-and-key model', 'induced fit model'],
    timeEstimate: 40,
    bloomsLevel: 'Understand',
    weightage: 5.0,
  },
]

// ============================================================================
// CLASS 12 QUESTIONS - REPRODUCTION, GENETICS & EVOLUTION
// ============================================================================

export const class12Questions: AuthenticQuestion[] = [
  // Chapter: Sexual Reproduction in Flowering Plants
  {
    id: 'q12-001',
    topicId: 'topic-12-2-1',
    chapterId: 'ch-12-2',
    classId: 'class-12',
    question:
      'During microsporogenesis, how many microspores are formed from one microspore mother cell?',
    options: ['Two', 'Four', 'Six', 'Eight'],
    correctAnswer: 'Four',
    explanation:
      'During microsporogenesis, each microspore mother cell (diploid) undergoes meiotic division to produce four haploid microspores. Each microspore develops into a pollen grain containing male gametes.',
    difficulty: 'Medium',
    ncertPageReference: 'Class 12, Chapter 2, Page 23',
    previousYearFrequency: 11,
    conceptualLinks: ['megasporogenesis', 'meiosis', 'pollen formation'],
    timeEstimate: 45,
    bloomsLevel: 'Remember',
    weightage: 4.0,
  },
  {
    id: 'q12-002',
    topicId: 'topic-12-2-2',
    chapterId: 'ch-12-2',
    classId: 'class-12',
    question: 'Double fertilization in angiosperms results in the formation of:',
    options: [
      'Two diploid zygotes',
      'Diploid zygote and triploid endosperm',
      'Two triploid nuclei',
      'Diploid embryo and diploid endosperm',
    ],
    correctAnswer: 'Diploid zygote and triploid endosperm',
    explanation:
      'Double fertilization involves fusion of one male gamete with egg cell (forming diploid zygote) and another male gamete with secondary nucleus (forming triploid endosperm). This is unique to angiosperms.',
    difficulty: 'Hard',
    ncertPageReference: 'Class 12, Chapter 2, Page 32',
    previousYearFrequency: 14,
    conceptualLinks: ['triple fusion', 'embryo sac', 'male gametes'],
    timeEstimate: 65,
    bloomsLevel: 'Understand',
    weightage: 4.5,
  },
  // Chapter: Human Reproduction
  {
    id: 'q12-003',
    topicId: 'topic-12-3-2',
    chapterId: 'ch-12-3',
    classId: 'class-12',
    question: 'The hormone responsible for ovulation is:',
    options: [
      'FSH (Follicle Stimulating Hormone)',
      'LH (Luteinizing Hormone)',
      'Estrogen',
      'Progesterone',
    ],
    correctAnswer: 'LH (Luteinizing Hormone)',
    explanation:
      'LH surge (sudden increase in LH levels) triggers ovulation around day 14 of the menstrual cycle. LH causes the mature Graafian follicle to rupture and release the ovum from the ovary.',
    difficulty: 'Medium',
    ncertPageReference: 'Class 12, Chapter 3, Page 52',
    previousYearFrequency: 15,
    conceptualLinks: ['menstrual cycle', 'Graafian follicle', 'corpus luteum'],
    timeEstimate: 40,
    bloomsLevel: 'Remember',
    weightage: 5.0,
  },
  // Chapter: Principles of Inheritance and Variation
  {
    id: 'q12-004',
    topicId: 'topic-12-5-1',
    chapterId: 'ch-12-5',
    classId: 'class-12',
    question:
      'In a dihybrid cross between AaBb × AaBb, what is the phenotypic ratio in F2 generation?',
    options: ['3:1', '1:2:1', '9:3:3:1', '1:1:1:1'],
    correctAnswer: '9:3:3:1',
    explanation:
      'In a dihybrid cross (AaBb × AaBb), the F2 generation shows a phenotypic ratio of 9:3:3:1. This represents 9 individuals with both dominant traits, 3 with first dominant and second recessive, 3 with first recessive and second dominant, and 1 with both recessive traits.',
    difficulty: 'Hard',
    ncertPageReference: 'Class 12, Chapter 5, Page 85',
    previousYearFrequency: 17,
    conceptualLinks: ['independent assortment', 'test cross', 'monohybrid cross'],
    timeEstimate: 70,
    bloomsLevel: 'Apply',
    weightage: 5.5,
  },
  // Chapter: Molecular Basis of Inheritance
  {
    id: 'q12-005',
    topicId: 'topic-12-6-1',
    chapterId: 'ch-12-6',
    classId: 'class-12',
    question: 'In DNA replication, the enzyme that joins Okazaki fragments is:',
    options: ['DNA polymerase', 'DNA ligase', 'DNA helicase', 'DNA primase'],
    correctAnswer: 'DNA ligase',
    explanation:
      'DNA ligase joins the Okazaki fragments on the lagging strand during DNA replication. It forms phosphodiester bonds between adjacent nucleotides, creating a continuous DNA strand.',
    difficulty: 'Medium',
    ncertPageReference: 'Class 12, Chapter 6, Page 109',
    previousYearFrequency: 13,
    conceptualLinks: ['Okazaki fragments', 'lagging strand', 'DNA polymerase'],
    timeEstimate: 50,
    bloomsLevel: 'Understand',
    weightage: 5.0,
  },
  // Chapter: Evolution
  {
    id: 'q12-006',
    topicId: 'topic-12-7-2',
    chapterId: 'ch-12-7',
    classId: 'class-12',
    question: 'Which of the following provides the strongest evidence for evolution?',
    options: [
      'Comparative anatomy',
      'Comparative embryology',
      'Molecular evidence (DNA/protein similarities)',
      'Fossil records',
    ],
    correctAnswer: 'Molecular evidence (DNA/protein similarities)',
    explanation:
      'Molecular evidence provides the strongest support for evolution. DNA and protein sequence similarities between species directly reflect evolutionary relationships and common ancestry, offering precise quantitative data.',
    difficulty: 'Hard',
    ncertPageReference: 'Class 12, Chapter 7, Page 134',
    previousYearFrequency: 8,
    conceptualLinks: ['phylogeny', 'common ancestry', 'comparative biochemistry'],
    timeEstimate: 55,
    bloomsLevel: 'Evaluate',
    weightage: 4.0,
  },
  // Additional Class 12 Questions - Human Physiology
  {
    id: 'q12-007',
    topicId: 'topic-12-3-1',
    chapterId: 'ch-12-3',
    classId: 'class-12',
    question:
      'Which cells in the seminiferous tubules are responsible for nourishing developing sperms?',
    options: ['Leydig cells', 'Sertoli cells', 'Spermatogonia', 'Primary spermatocytes'],
    correctAnswer: 'Sertoli cells',
    explanation:
      'Sertoli cells (sustentacular cells) are located in the seminiferous tubules and provide nourishment and support to developing spermatozoa. They also form the blood-testis barrier and secrete inhibin hormone. Leydig cells secrete testosterone.',
    difficulty: 'Medium',
    ncertPageReference: 'Class 12, Chapter 3, Page 47',
    previousYearFrequency: 13,
    conceptualLinks: ['spermatogenesis', 'testosterone', 'seminiferous tubules'],
    timeEstimate: 45,
    bloomsLevel: 'Remember',
    weightage: 4.0,
  },
  // Biotechnology - PCR and DNA Technology
  {
    id: 'q12-008',
    topicId: 'topic-12-6-2',
    chapterId: 'ch-12-6',
    classId: 'class-12',
    question: 'In the lac operon, which molecule acts as an inducer?',
    options: ['Glucose', 'Lactose', 'Galactose', 'Fructose'],
    correctAnswer: 'Lactose',
    explanation:
      'In the lac operon, lactose acts as an inducer. When lactose is present, it binds to the lac repressor protein, causing conformational change that prevents the repressor from binding to the operator, allowing transcription of lac genes.',
    difficulty: 'Medium',
    ncertPageReference: 'Class 12, Chapter 6, Page 118',
    previousYearFrequency: 16,
    conceptualLinks: ['gene regulation', 'operator', 'repressor protein'],
    timeEstimate: 50,
    bloomsLevel: 'Understand',
    weightage: 4.0,
  },
  // Ecology - Ecosystem and Environmental Issues
  {
    id: 'q12-009',
    topicId: 'topic-12-13-1',
    chapterId: 'ch-12-13',
    classId: 'class-12',
    question: 'In an ecosystem, the 10% law refers to:',
    options: [
      'Only 10% of species survive environmental changes',
      'Only 10% of energy is transferred to the next trophic level',
      '10% of biomass is converted to energy',
      '10% of nutrients are recycled',
    ],
    correctAnswer: 'Only 10% of energy is transferred to the next trophic level',
    explanation:
      'The 10% law states that only about 10% of energy is transferred from one trophic level to the next in a food chain. The remaining 90% is lost as heat during metabolic processes. This limits the length of food chains.',
    difficulty: 'Easy',
    ncertPageReference: 'Class 12, Chapter 14, Page 248',
    previousYearFrequency: 11,
    conceptualLinks: ['trophic levels', 'energy pyramid', 'food chain'],
    timeEstimate: 35,
    bloomsLevel: 'Remember',
    weightage: 4.0,
  },
  // Human Physiology - Digestion
  {
    id: 'q12-011',
    topicId: 'topic-12-16-1',
    chapterId: 'ch-12-16',
    classId: 'class-12',
    question: 'Which enzyme is responsible for the digestion of proteins in the stomach?',
    options: ['Trypsin', 'Pepsin', 'Chymotrypsin', 'Amylase'],
    correctAnswer: 'Pepsin',
    explanation:
      'Pepsin is the primary proteolytic enzyme in the stomach. It is secreted as pepsinogen by chief cells and activated by HCl. Pepsin breaks down proteins into smaller peptides in the acidic environment (pH 1.5-2).',
    difficulty: 'Easy',
    ncertPageReference: 'Class 11, Chapter 16, Page 266',
    previousYearFrequency: 14,
    conceptualLinks: ['gastric juice', 'protein digestion', 'pepsinogen'],
    timeEstimate: 30,
    bloomsLevel: 'Remember',
    weightage: 3.5,
  },
  {
    id: 'q12-012',
    topicId: 'topic-12-16-2',
    chapterId: 'ch-12-16',
    classId: 'class-12',
    question: 'The emulsification of fats is carried out by:',
    options: ['Lipase', 'Bile salts', 'Pancreatic juice', 'Gastric juice'],
    correctAnswer: 'Bile salts',
    explanation:
      'Bile salts (sodium glycocholate and taurocholate) emulsify fats by breaking large fat globules into smaller droplets, increasing surface area for lipase action. Bile is produced by the liver and stored in the gallbladder.',
    difficulty: 'Medium',
    ncertPageReference: 'Class 11, Chapter 16, Page 268',
    previousYearFrequency: 10,
    conceptualLinks: ['bile', 'fat digestion', 'liver function'],
    timeEstimate: 45,
    bloomsLevel: 'Understand',
    weightage: 4.0,
  },
  {
    id: 'q12-013',
    topicId: 'topic-12-16-3',
    chapterId: 'ch-12-16',
    classId: 'class-12',
    question: 'Which part of the alimentary canal has the maximum absorption of nutrients?',
    options: ['Stomach', 'Duodenum', 'Jejunum and Ileum', 'Large intestine'],
    correctAnswer: 'Jejunum and Ileum',
    explanation:
      'The jejunum and ileum (parts of small intestine) are the primary sites of nutrient absorption. They have villi and microvilli which increase surface area by 600 times. Most digested carbohydrates, proteins, and fats are absorbed here.',
    difficulty: 'Medium',
    ncertPageReference: 'Class 11, Chapter 16, Page 269',
    previousYearFrequency: 12,
    conceptualLinks: ['villi', 'microvilli', 'small intestine'],
    timeEstimate: 40,
    bloomsLevel: 'Remember',
    weightage: 3.5,
  },
  {
    id: 'q12-014',
    topicId: 'topic-12-16-4',
    chapterId: 'ch-12-16',
    classId: 'class-12',
    question: 'The intrinsic factor required for vitamin B12 absorption is secreted by:',
    options: [
      'Parietal cells of stomach',
      'Chief cells of stomach',
      'Goblet cells of intestine',
      'Liver cells',
    ],
    correctAnswer: 'Parietal cells of stomach',
    explanation:
      'Intrinsic factor is a glycoprotein secreted by parietal cells in the stomach lining. It binds to vitamin B12 and facilitates its absorption in the ileum. Deficiency of intrinsic factor leads to pernicious anemia.',
    difficulty: 'Hard',
    ncertPageReference: 'Class 11, Chapter 16, Page 266',
    previousYearFrequency: 7,
    conceptualLinks: ['vitamin B12', 'parietal cells', 'pernicious anemia'],
    timeEstimate: 55,
    bloomsLevel: 'Understand',
    weightage: 4.5,
  },
  {
    id: 'q12-015',
    topicId: 'topic-12-16-5',
    chapterId: 'ch-12-16',
    classId: 'class-12',
    question: 'Jaundice is caused by the accumulation of:',
    options: ['Bilirubin', 'Bile salts', 'Urobilinogen', 'Hemoglobin'],
    correctAnswer: 'Bilirubin',
    explanation:
      'Jaundice is characterized by yellowing of skin and eyes due to accumulation of bilirubin in blood. Bilirubin is produced from breakdown of hemoglobin. Causes include liver disease, bile duct obstruction, or excessive RBC breakdown.',
    difficulty: 'Easy',
    ncertPageReference: 'Class 11, Chapter 16, Page 271',
    previousYearFrequency: 9,
    conceptualLinks: ['bilirubin', 'liver function', 'hemoglobin breakdown'],
    timeEstimate: 35,
    bloomsLevel: 'Remember',
    weightage: 3.0,
  },
  // Human Physiology - Breathing and Exchange of Gases
  {
    id: 'q12-016',
    topicId: 'topic-12-17-1',
    chapterId: 'ch-12-17',
    classId: 'class-12',
    question: 'The respiratory center in the brain is located in:',
    options: ['Cerebrum', 'Cerebellum', 'Medulla oblongata and pons', 'Hypothalamus'],
    correctAnswer: 'Medulla oblongata and pons',
    explanation:
      'The respiratory center is located in the medulla oblongata and pons of the brainstem. It controls the rate and depth of breathing by sending signals to the respiratory muscles. It responds to CO2, H+, and O2 levels in blood.',
    difficulty: 'Easy',
    ncertPageReference: 'Class 11, Chapter 17, Page 287',
    previousYearFrequency: 13,
    conceptualLinks: ['medulla', 'breathing control', 'respiratory rhythm'],
    timeEstimate: 30,
    bloomsLevel: 'Remember',
    weightage: 3.5,
  },
  {
    id: 'q12-017',
    topicId: 'topic-12-17-2',
    chapterId: 'ch-12-17',
    classId: 'class-12',
    question: 'The partial pressure of oxygen in alveoli is approximately:',
    options: ['40 mm Hg', '95 mm Hg', '104 mm Hg', '159 mm Hg'],
    correctAnswer: '104 mm Hg',
    explanation:
      'The partial pressure of oxygen (pO2) in alveoli is approximately 104 mm Hg, while in deoxygenated blood it is 40 mm Hg. This pressure gradient facilitates diffusion of oxygen from alveoli into blood. Atmospheric pO2 is 159 mm Hg.',
    difficulty: 'Medium',
    ncertPageReference: 'Class 11, Chapter 17, Page 284',
    previousYearFrequency: 8,
    conceptualLinks: ['partial pressure', 'gas exchange', 'alveolar gas composition'],
    timeEstimate: 50,
    bloomsLevel: 'Remember',
    weightage: 4.0,
  },
  {
    id: 'q12-018',
    topicId: 'topic-12-17-3',
    chapterId: 'ch-12-17',
    classId: 'class-12',
    question: 'Most of the carbon dioxide in blood is transported as:',
    options: ['Dissolved in plasma', 'Carbaminohaemoglobin', 'Bicarbonate ions', 'Carbonic acid'],
    correctAnswer: 'Bicarbonate ions',
    explanation:
      'About 70% of CO2 is transported as bicarbonate ions (HCO3-) in blood plasma. CO2 reacts with water in RBCs to form carbonic acid (H2CO3), which dissociates into H+ and HCO3-. About 23% is as carbaminohaemoglobin and 7% dissolved.',
    difficulty: 'Medium',
    ncertPageReference: 'Class 11, Chapter 17, Page 286',
    previousYearFrequency: 15,
    conceptualLinks: ['CO2 transport', 'carbonic anhydrase', 'chloride shift'],
    timeEstimate: 45,
    bloomsLevel: 'Understand',
    weightage: 4.5,
  },
  {
    id: 'q12-019',
    topicId: 'topic-12-17-4',
    chapterId: 'ch-12-17',
    classId: 'class-12',
    question: 'Emphysema is a chronic respiratory disorder characterized by:',
    options: [
      'Inflammation of bronchi',
      'Destruction of alveolar walls',
      'Accumulation of mucus in airways',
      'Infection of lungs',
    ],
    correctAnswer: 'Destruction of alveolar walls',
    explanation:
      'Emphysema involves progressive destruction of alveolar walls, leading to larger air spaces and reduced surface area for gas exchange. Main cause is cigarette smoking. Symptoms include shortness of breath and reduced exercise tolerance.',
    difficulty: 'Easy',
    ncertPageReference: 'Class 11, Chapter 17, Page 288',
    previousYearFrequency: 6,
    conceptualLinks: ['respiratory disorders', 'smoking effects', 'lung diseases'],
    timeEstimate: 35,
    bloomsLevel: 'Understand',
    weightage: 3.0,
  },
  // Human Physiology - Body Fluids and Circulation
  {
    id: 'q12-020',
    topicId: 'topic-12-18-1',
    chapterId: 'ch-12-18',
    classId: 'class-12',
    question: 'The pacemaker of the heart is:',
    options: [
      'Sinoatrial node (SAN)',
      'Atrioventricular node (AVN)',
      'Bundle of His',
      'Purkinje fibers',
    ],
    correctAnswer: 'Sinoatrial node (SAN)',
    explanation:
      'The sinoatrial node (SAN), located in the right atrium, is the natural pacemaker of the heart. It initiates electrical impulses that cause heart muscle contraction. It generates 70-75 impulses per minute in a healthy adult.',
    difficulty: 'Easy',
    ncertPageReference: 'Class 11, Chapter 18, Page 298',
    previousYearFrequency: 16,
    conceptualLinks: ['cardiac cycle', 'heart conduction', 'ECG'],
    timeEstimate: 30,
    bloomsLevel: 'Remember',
    weightage: 4.0,
  },
  {
    id: 'q12-021',
    topicId: 'topic-12-18-2',
    chapterId: 'ch-12-18',
    classId: 'class-12',
    question:
      'Blood pressure is measured as systolic/diastolic. Normal blood pressure is approximately:',
    options: ['80/120 mm Hg', '120/80 mm Hg', '140/90 mm Hg', '90/60 mm Hg'],
    correctAnswer: '120/80 mm Hg',
    explanation:
      'Normal blood pressure is 120/80 mm Hg. Systolic pressure (120) is measured during ventricular contraction, diastolic pressure (80) during ventricular relaxation. Blood pressure >140/90 indicates hypertension.',
    difficulty: 'Easy',
    ncertPageReference: 'Class 11, Chapter 18, Page 302',
    previousYearFrequency: 11,
    conceptualLinks: ['cardiac cycle', 'hypertension', 'blood vessels'],
    timeEstimate: 30,
    bloomsLevel: 'Remember',
    weightage: 3.5,
  },
  {
    id: 'q12-022',
    topicId: 'topic-12-18-3',
    chapterId: 'ch-12-18',
    classId: 'class-12',
    question: 'Which component of blood is responsible for blood clotting?',
    options: ['Red blood cells', 'White blood cells', 'Platelets', 'Plasma proteins'],
    correctAnswer: 'Platelets',
    explanation:
      'Platelets (thrombocytes) are cell fragments that play a crucial role in blood clotting. They release clotting factors and form a platelet plug at injury sites. Normal count is 150,000-400,000 per µL of blood.',
    difficulty: 'Easy',
    ncertPageReference: 'Class 11, Chapter 18, Page 295',
    previousYearFrequency: 14,
    conceptualLinks: ['hemostasis', 'coagulation', 'thrombocytes'],
    timeEstimate: 25,
    bloomsLevel: 'Remember',
    weightage: 3.0,
  },
  {
    id: 'q12-023',
    topicId: 'topic-12-18-4',
    chapterId: 'ch-12-18',
    classId: 'class-12',
    question: 'The universal blood donor group is:',
    options: ['A positive', 'B positive', 'AB positive', 'O negative'],
    correctAnswer: 'O negative',
    explanation:
      'O negative blood is the universal donor type because it lacks A, B, and Rh antigens. It can be given to recipients of any blood group without causing immune reaction. AB positive is the universal recipient.',
    difficulty: 'Easy',
    ncertPageReference: 'Class 11, Chapter 18, Page 297',
    previousYearFrequency: 10,
    conceptualLinks: ['blood groups', 'ABO system', 'Rh factor'],
    timeEstimate: 30,
    bloomsLevel: 'Remember',
    weightage: 3.0,
  },
  {
    id: 'q12-024',
    topicId: 'topic-12-18-5',
    chapterId: 'ch-12-18',
    classId: 'class-12',
    question: 'Double circulation in humans refers to:',
    options: [
      'Blood passing through heart twice in one complete cycle',
      'Presence of two atria and two ventricles',
      'Systemic and pulmonary circulation',
      'Arterial and venous circulation',
    ],
    correctAnswer: 'Systemic and pulmonary circulation',
    explanation:
      'Double circulation consists of pulmonary circulation (heart → lungs → heart) and systemic circulation (heart → body → heart). Blood passes through the heart twice in one complete cycle - once oxygenated and once deoxygenated.',
    difficulty: 'Medium',
    ncertPageReference: 'Class 11, Chapter 18, Page 299',
    previousYearFrequency: 12,
    conceptualLinks: ['pulmonary circulation', 'systemic circulation', 'heart chambers'],
    timeEstimate: 45,
    bloomsLevel: 'Understand',
    weightage: 4.0,
  },
  // Human Physiology - Excretory Products and Elimination
  {
    id: 'q12-025',
    topicId: 'topic-12-19-1',
    chapterId: 'ch-12-19',
    classId: 'class-12',
    question: 'The structural and functional unit of kidney is:',
    options: ['Neuron', 'Nephron', 'Alveolus', 'Hepatocyte'],
    correctAnswer: 'Nephron',
    explanation:
      "Nephron is the structural and functional unit of kidney. Each human kidney contains about 1 million nephrons. Each nephron consists of glomerulus, Bowman's capsule, proximal convoluted tubule, loop of Henle, distal convoluted tubule, and collecting duct.",
    difficulty: 'Easy',
    ncertPageReference: 'Class 11, Chapter 19, Page 306',
    previousYearFrequency: 15,
    conceptualLinks: ['glomerulus', 'urine formation', 'kidney structure'],
    timeEstimate: 25,
    bloomsLevel: 'Remember',
    weightage: 3.5,
  },
  {
    id: 'q12-026',
    topicId: 'topic-12-19-2',
    chapterId: 'ch-12-19',
    classId: 'class-12',
    question: 'The filtration of blood in kidney occurs at:',
    options: ['Loop of Henle', 'Glomerulus', 'Distal convoluted tubule', 'Collecting duct'],
    correctAnswer: 'Glomerulus',
    explanation:
      "Ultrafiltration occurs in the glomerulus (a network of capillaries) within Bowman's capsule. Blood pressure forces water and small molecules through the filtration membrane. About 180 liters of filtrate is formed daily.",
    difficulty: 'Easy',
    ncertPageReference: 'Class 11, Chapter 19, Page 308',
    previousYearFrequency: 13,
    conceptualLinks: ["Bowman's capsule", 'ultrafiltration', 'GFR'],
    timeEstimate: 30,
    bloomsLevel: 'Remember',
    weightage: 3.5,
  },
  {
    id: 'q12-027',
    topicId: 'topic-12-19-3',
    chapterId: 'ch-12-19',
    classId: 'class-12',
    question: 'The counter-current mechanism in loop of Henle helps in:',
    options: [
      'Filtration of blood',
      'Concentration of urine',
      'Secretion of toxins',
      'Reabsorption of glucose',
    ],
    correctAnswer: 'Concentration of urine',
    explanation:
      'The counter-current mechanism in the loop of Henle creates an osmotic gradient in the medullary interstitium, enabling the kidney to produce concentrated urine. This mechanism conserves water by reabsorbing it in the collecting duct.',
    difficulty: 'Medium',
    ncertPageReference: 'Class 11, Chapter 19, Page 310',
    previousYearFrequency: 9,
    conceptualLinks: ['loop of Henle', 'osmotic gradient', 'ADH action'],
    timeEstimate: 50,
    bloomsLevel: 'Understand',
    weightage: 4.5,
  },
  {
    id: 'q12-028',
    topicId: 'topic-12-19-4',
    chapterId: 'ch-12-19',
    classId: 'class-12',
    question: 'Which hormone increases water reabsorption in kidneys?',
    options: ['Insulin', 'Aldosterone', 'Antidiuretic hormone (ADH)', 'Thyroid hormone'],
    correctAnswer: 'Antidiuretic hormone (ADH)',
    explanation:
      'ADH (vasopressin) is secreted by the posterior pituitary and increases water reabsorption in collecting ducts by making them more permeable to water. Deficiency of ADH causes diabetes insipidus, characterized by excessive urination.',
    difficulty: 'Medium',
    ncertPageReference: 'Class 11, Chapter 19, Page 311',
    previousYearFrequency: 14,
    conceptualLinks: ['osmoregulation', 'posterior pituitary', 'diabetes insipidus'],
    timeEstimate: 40,
    bloomsLevel: 'Understand',
    weightage: 4.0,
  },
  {
    id: 'q12-029',
    topicId: 'topic-12-19-5',
    chapterId: 'ch-12-19',
    classId: 'class-12',
    question: 'Presence of glucose in urine (glycosuria) indicates:',
    options: [
      'Normal kidney function',
      'Diabetes mellitus',
      'Excessive water intake',
      'High protein diet',
    ],
    correctAnswer: 'Diabetes mellitus',
    explanation:
      'Glycosuria (glucose in urine) occurs when blood glucose exceeds renal threshold (~180 mg/dL). This is a hallmark of diabetes mellitus. Normally, all filtered glucose is reabsorbed in the proximal convoluted tubule.',
    difficulty: 'Easy',
    ncertPageReference: 'Class 11, Chapter 19, Page 312',
    previousYearFrequency: 8,
    conceptualLinks: ['diabetes mellitus', 'renal threshold', 'glucose reabsorption'],
    timeEstimate: 35,
    bloomsLevel: 'Understand',
    weightage: 3.0,
  },
  // Human Physiology - Neural Control and Coordination
  {
    id: 'q12-030',
    topicId: 'topic-12-21-1',
    chapterId: 'ch-12-21',
    classId: 'class-12',
    question: 'The gap between two neurons is called:',
    options: ['Axon terminal', 'Synapse', 'Dendrite', 'Node of Ranvier'],
    correctAnswer: 'Synapse',
    explanation:
      'A synapse is the junction between two neurons where nerve impulses are transmitted. It consists of presynaptic terminal, synaptic cleft (gap), and postsynaptic membrane. Transmission occurs via neurotransmitters.',
    difficulty: 'Easy',
    ncertPageReference: 'Class 11, Chapter 21, Page 319',
    previousYearFrequency: 12,
    conceptualLinks: ['neurotransmitters', 'nerve transmission', 'synaptic cleft'],
    timeEstimate: 25,
    bloomsLevel: 'Remember',
    weightage: 3.0,
  },
  {
    id: 'q12-031',
    topicId: 'topic-12-21-2',
    chapterId: 'ch-12-21',
    classId: 'class-12',
    question: 'The resting membrane potential of a neuron is approximately:',
    options: ['+70 mV', '-70 mV', '0 mV', '+35 mV'],
    correctAnswer: '-70 mV',
    explanation:
      'The resting membrane potential is approximately -70 mV, with the inside of the neuron being negative relative to outside. This is maintained by the sodium-potassium pump (3 Na+ out, 2 K+ in) and differential permeability.',
    difficulty: 'Medium',
    ncertPageReference: 'Class 11, Chapter 21, Page 316',
    previousYearFrequency: 10,
    conceptualLinks: ['action potential', 'sodium-potassium pump', 'membrane potential'],
    timeEstimate: 40,
    bloomsLevel: 'Remember',
    weightage: 4.0,
  },
  {
    id: 'q12-032',
    topicId: 'topic-12-21-3',
    chapterId: 'ch-12-21',
    classId: 'class-12',
    question: 'Which part of the brain controls body temperature, hunger, and thirst?',
    options: ['Cerebrum', 'Cerebellum', 'Hypothalamus', 'Pons'],
    correctAnswer: 'Hypothalamus',
    explanation:
      'The hypothalamus is a small region in the forebrain that regulates body temperature, hunger, thirst, sleep-wake cycles, and controls the pituitary gland. It is the center for homeostasis.',
    difficulty: 'Easy',
    ncertPageReference: 'Class 11, Chapter 21, Page 322',
    previousYearFrequency: 15,
    conceptualLinks: ['homeostasis', 'pituitary control', 'thermoregulation'],
    timeEstimate: 30,
    bloomsLevel: 'Remember',
    weightage: 3.5,
  },
  {
    id: 'q12-033',
    topicId: 'topic-12-21-4',
    chapterId: 'ch-12-21',
    classId: 'class-12',
    question: 'The neurotransmitter released at neuromuscular junction is:',
    options: ['Dopamine', 'Serotonin', 'Acetylcholine', 'GABA'],
    correctAnswer: 'Acetylcholine',
    explanation:
      'Acetylcholine (ACh) is the neurotransmitter released at the neuromuscular junction. It binds to receptors on muscle fiber membrane, causing depolarization and muscle contraction. It is broken down by acetylcholinesterase.',
    difficulty: 'Easy',
    ncertPageReference: 'Class 11, Chapter 21, Page 319',
    previousYearFrequency: 11,
    conceptualLinks: ['neuromuscular junction', 'muscle contraction', 'acetylcholinesterase'],
    timeEstimate: 30,
    bloomsLevel: 'Remember',
    weightage: 3.5,
  },
  // Mendelian Genetics - Advanced Concepts
  {
    id: 'q12-010',
    topicId: 'topic-12-5-2',
    chapterId: 'ch-12-5',
    classId: 'class-12',
    question: 'Linkage between two genes can be broken by:',
    options: [
      'Independent assortment',
      'Crossing over during meiosis',
      'Gene mutation',
      'Chromosomal aberration',
    ],
    correctAnswer: 'Crossing over during meiosis',
    explanation:
      'Linkage between genes on the same chromosome can be broken by crossing over (recombination) during meiosis. The frequency of crossing over is proportional to the distance between genes - closer genes show less recombination.',
    difficulty: 'Hard',
    ncertPageReference: 'Class 12, Chapter 5, Page 92',
    previousYearFrequency: 9,
    conceptualLinks: ['recombination', 'genetic mapping', 'chromosomal theory'],
    timeEstimate: 65,
    bloomsLevel: 'Analyze',
    weightage: 5.0,
  },
  // Additional Genetics - Molecular Basis
  {
    id: 'q12-034',
    topicId: 'topic-12-6-1',
    chapterId: 'ch-12-6',
    classId: 'class-12',
    question: 'The enzyme that synthesizes RNA primer during DNA replication is:',
    options: ['DNA polymerase I', 'DNA polymerase III', 'Primase', 'Helicase'],
    correctAnswer: 'Primase',
    explanation:
      "Primase is an RNA polymerase that synthesizes short RNA primers (about 10 nucleotides) needed to initiate DNA synthesis. DNA polymerase cannot start synthesis de novo and requires a 3'-OH group provided by the primer.",
    difficulty: 'Medium',
    ncertPageReference: 'Class 12, Chapter 6, Page 109',
    previousYearFrequency: 11,
    conceptualLinks: ['DNA replication', 'DNA polymerase', 'lagging strand'],
    timeEstimate: 45,
    bloomsLevel: 'Remember',
    weightage: 4.0,
  },
  {
    id: 'q12-035',
    topicId: 'topic-12-6-2',
    chapterId: 'ch-12-6',
    classId: 'class-12',
    question: 'The triplet codon AUG codes for:',
    options: ['Methionine (start codon)', 'Stop codon', 'Tryptophan', 'Leucine'],
    correctAnswer: 'Methionine (start codon)',
    explanation:
      'AUG is the start codon that codes for methionine in eukaryotes and N-formylmethionine in prokaryotes. It signals the beginning of translation. The three stop codons are UAA, UAG, and UGA.',
    difficulty: 'Easy',
    ncertPageReference: 'Class 12, Chapter 6, Page 116',
    previousYearFrequency: 13,
    conceptualLinks: ['genetic code', 'translation', 'codon'],
    timeEstimate: 30,
    bloomsLevel: 'Remember',
    weightage: 3.5,
  },
  {
    id: 'q12-036',
    topicId: 'topic-12-6-3',
    chapterId: 'ch-12-6',
    classId: 'class-12',
    question: "Which of the following processes occurs in the 5' to 3' direction?",
    options: [
      'DNA synthesis only',
      'RNA synthesis only',
      'Both DNA and RNA synthesis',
      'Neither DNA nor RNA synthesis',
    ],
    correctAnswer: 'Both DNA and RNA synthesis',
    explanation:
      "Both DNA polymerase and RNA polymerase synthesize nucleic acids in the 5' to 3' direction by adding nucleotides to the 3'-OH group of the growing strand. The template strand is read in 3' to 5' direction.",
    difficulty: 'Medium',
    ncertPageReference: 'Class 12, Chapter 6, Page 109',
    previousYearFrequency: 10,
    conceptualLinks: ['DNA replication', 'transcription', 'directionality'],
    timeEstimate: 45,
    bloomsLevel: 'Understand',
    weightage: 4.0,
  },
  {
    id: 'q12-037',
    topicId: 'topic-12-6-4',
    chapterId: 'ch-12-6',
    classId: 'class-12',
    question: 'During transcription in eukaryotes, introns are removed by a process called:',
    options: ['Translation', 'Splicing', 'Capping', 'Polyadenylation'],
    correctAnswer: 'Splicing',
    explanation:
      'Splicing is the process of removing introns (non-coding sequences) and joining exons (coding sequences) from primary RNA transcript. This occurs in the nucleus with the help of spliceosome complex.',
    difficulty: 'Easy',
    ncertPageReference: 'Class 12, Chapter 6, Page 114',
    previousYearFrequency: 12,
    conceptualLinks: ['introns', 'exons', 'RNA processing'],
    timeEstimate: 35,
    bloomsLevel: 'Remember',
    weightage: 3.5,
  },
  {
    id: 'q12-038',
    topicId: 'topic-12-6-5',
    chapterId: 'ch-12-6',
    classId: 'class-12',
    question: 'The human genome project was completed in:',
    options: ['1990', '2003', '2010', '2015'],
    correctAnswer: '2003',
    explanation:
      'The Human Genome Project was completed in 2003, mapping all ~3 billion base pairs and ~20,000-25,000 genes in human DNA. It was an international collaboration that began in 1990 and provided foundation for medical genetics.',
    difficulty: 'Easy',
    ncertPageReference: 'Class 12, Chapter 6, Page 121',
    previousYearFrequency: 7,
    conceptualLinks: ['genomics', 'DNA sequencing', 'bioinformatics'],
    timeEstimate: 30,
    bloomsLevel: 'Remember',
    weightage: 2.5,
  },
  // Reproduction in Flowering Plants
  {
    id: 'q12-039',
    topicId: 'topic-12-2-1',
    chapterId: 'ch-12-2',
    classId: 'class-12',
    question: 'The mature embryo sac in angiosperms is:',
    options: [
      '5-nucleate and 5-celled',
      '7-nucleate and 7-celled',
      '8-nucleate and 7-celled',
      '8-nucleate and 8-celled',
    ],
    correctAnswer: '8-nucleate and 7-celled',
    explanation:
      'The mature embryo sac (female gametophyte) is 8-nucleate and 7-celled: 3 antipodal cells, 1 central cell with 2 polar nuclei, 2 synergids, and 1 egg cell. This is the typical Polygonum type of embryo sac.',
    difficulty: 'Medium',
    ncertPageReference: 'Class 12, Chapter 2, Page 25',
    previousYearFrequency: 14,
    conceptualLinks: ['megasporogenesis', 'megagametogenesis', 'embryo sac development'],
    timeEstimate: 50,
    bloomsLevel: 'Remember',
    weightage: 4.5,
  },
  {
    id: 'q12-040',
    topicId: 'topic-12-2-2',
    chapterId: 'ch-12-2',
    classId: 'class-12',
    question: 'The transfer of pollen grains from anther to stigma of the same flower is called:',
    options: ['Geitonogamy', 'Xenogamy', 'Autogamy', 'Allogamy'],
    correctAnswer: 'Autogamy',
    explanation:
      'Autogamy is self-pollination where pollen from same flower lands on its stigma. Geitonogamy is transfer between flowers of same plant. Xenogamy is cross-pollination between different plants. Autogamy ensures genetic uniformity.',
    difficulty: 'Easy',
    ncertPageReference: 'Class 12, Chapter 2, Page 28',
    previousYearFrequency: 10,
    conceptualLinks: ['pollination', 'self-pollination', 'cross-pollination'],
    timeEstimate: 30,
    bloomsLevel: 'Remember',
    weightage: 3.0,
  },
  {
    id: 'q12-041',
    topicId: 'topic-12-2-3',
    chapterId: 'ch-12-2',
    classId: 'class-12',
    question: 'In double fertilization, the secondary nucleus fuses with:',
    options: [
      'One male gamete to form embryo',
      'One male gamete to form endosperm',
      'Two male gametes',
      'Egg cell',
    ],
    correctAnswer: 'One male gamete to form endosperm',
    explanation:
      'In double fertilization, one male gamete fuses with egg to form zygote (2n) and another fuses with secondary nucleus (2n) to form primary endosperm nucleus (3n). This triploid endosperm provides nutrition to the developing embryo.',
    difficulty: 'Medium',
    ncertPageReference: 'Class 12, Chapter 2, Page 32',
    previousYearFrequency: 15,
    conceptualLinks: ['triple fusion', 'endosperm', 'zygote formation'],
    timeEstimate: 45,
    bloomsLevel: 'Understand',
    weightage: 4.5,
  },
  {
    id: 'q12-042',
    topicId: 'topic-12-2-4',
    chapterId: 'ch-12-2',
    classId: 'class-12',
    question: 'Apomixis in plants refers to:',
    options: [
      'Self-pollination',
      'Cross-pollination',
      'Seed formation without fertilization',
      'Vegetative propagation',
    ],
    correctAnswer: 'Seed formation without fertilization',
    explanation:
      'Apomixis is asexual reproduction where seeds are formed without fertilization. The embryo develops from diploid cells without meiosis and syngamy. Common in grasses like *Poa*. Results in genetically identical offspring.',
    difficulty: 'Medium',
    ncertPageReference: 'Class 12, Chapter 1, Page 18',
    previousYearFrequency: 8,
    conceptualLinks: ['asexual reproduction', 'parthenogenesis', 'agamospermy'],
    timeEstimate: 50,
    bloomsLevel: 'Understand',
    weightage: 3.5,
  },
  // Plant Physiology - Photosynthesis
  {
    id: 'q12-043',
    topicId: 'topic-11-13-1',
    chapterId: 'ch-11-13',
    classId: 'class-11',
    question: 'The primary acceptor of CO2 in C3 plants is:',
    options: [
      'Phosphoenolpyruvate (PEP)',
      'Ribulose 1,5-bisphosphate (RuBP)',
      'Phosphoglyceric acid (PGA)',
      'Oxaloacetic acid (OAA)',
    ],
    correctAnswer: 'Ribulose 1,5-bisphosphate (RuBP)',
    explanation:
      'In C3 plants, CO2 combines with RuBP (5-carbon compound) catalyzed by RuBisCO enzyme to form two molecules of 3-phosphoglyceric acid (3-PGA), a 3-carbon compound. This occurs in the stroma of chloroplasts.',
    difficulty: 'Medium',
    ncertPageReference: 'Class 11, Chapter 13, Page 228',
    previousYearFrequency: 16,
    conceptualLinks: ['Calvin cycle', 'RuBisCO', 'CO2 fixation'],
    timeEstimate: 45,
    bloomsLevel: 'Remember',
    weightage: 4.5,
  },
  {
    id: 'q12-044',
    topicId: 'topic-11-13-2',
    chapterId: 'ch-11-13',
    classId: 'class-11',
    question: 'In C4 plants, the first stable product of CO2 fixation is:',
    options: [
      'Phosphoglyceric acid (3C)',
      'Oxaloacetic acid (4C)',
      'Malic acid (4C)',
      'Pyruvic acid (3C)',
    ],
    correctAnswer: 'Oxaloacetic acid (4C)',
    explanation:
      'C4 plants first fix CO2 into oxaloacetic acid (OAA), a 4-carbon compound, in mesophyll cells using PEP carboxylase. OAA is converted to malic acid, transported to bundle sheath cells where CO2 is released for Calvin cycle.',
    difficulty: 'Medium',
    ncertPageReference: 'Class 11, Chapter 13, Page 230',
    previousYearFrequency: 14,
    conceptualLinks: ['C4 pathway', 'Hatch-Slack pathway', 'PEP carboxylase'],
    timeEstimate: 50,
    bloomsLevel: 'Remember',
    weightage: 4.5,
  },
  {
    id: 'q12-045',
    topicId: 'topic-11-13-3',
    chapterId: 'ch-11-13',
    classId: 'class-11',
    question: 'The process of photorespiration is more common in:',
    options: ['C3 plants', 'C4 plants', 'CAM plants', 'All plants equally'],
    correctAnswer: 'C3 plants',
    explanation:
      'Photorespiration is common in C3 plants when RuBisCO binds O2 instead of CO2, forming phosphoglycolate. This wasteful process reduces photosynthetic efficiency. C4 and CAM plants have evolved mechanisms to minimize photorespiration.',
    difficulty: 'Easy',
    ncertPageReference: 'Class 11, Chapter 13, Page 231',
    previousYearFrequency: 12,
    conceptualLinks: ['RuBisCO oxygenase activity', 'photorespiration', 'C3 vs C4'],
    timeEstimate: 40,
    bloomsLevel: 'Understand',
    weightage: 4.0,
  },
  {
    id: 'q12-046',
    topicId: 'topic-11-13-4',
    chapterId: 'ch-11-13',
    classId: 'class-11',
    question: 'Photosystem II (PS II) is involved in:',
    options: ['Only ATP synthesis', 'Only NADPH synthesis', 'Photolysis of water', 'CO2 fixation'],
    correctAnswer: 'Photolysis of water',
    explanation:
      'Photosystem II (P680) splits water molecules into H+, electrons, and oxygen (photolysis). The electrons replace those lost by P680. This is the primary source of electrons for the photosynthetic electron transport chain.',
    difficulty: 'Medium',
    ncertPageReference: 'Class 11, Chapter 13, Page 226',
    previousYearFrequency: 13,
    conceptualLinks: ['Z-scheme', 'oxygen evolution', 'water splitting'],
    timeEstimate: 45,
    bloomsLevel: 'Understand',
    weightage: 4.5,
  },
  {
    id: 'q12-047',
    topicId: 'topic-11-13-5',
    chapterId: 'ch-11-13',
    classId: 'class-11',
    question: 'The law of limiting factors in photosynthesis was proposed by:',
    options: ['Blackman', 'Calvin', 'Hill', 'Engelmann'],
    correctAnswer: 'Blackman',
    explanation:
      "Blackman's law of limiting factors states that the rate of photosynthesis is limited by the factor present in lowest quantity. For example, if light is limiting, increasing CO2 won't increase rate until light is increased.",
    difficulty: 'Easy',
    ncertPageReference: 'Class 11, Chapter 13, Page 233',
    previousYearFrequency: 8,
    conceptualLinks: ['limiting factors', 'photosynthetic rate', 'environmental factors'],
    timeEstimate: 35,
    bloomsLevel: 'Remember',
    weightage: 3.0,
  },
  // Ecology and Environment
  {
    id: 'q12-048',
    topicId: 'topic-12-13-1',
    chapterId: 'ch-12-13',
    classId: 'class-12',
    question: 'Primary productivity in an ecosystem is measured as:',
    options: [
      'Energy consumed by herbivores',
      'Biomass produced by autotrophs',
      'Energy lost as heat',
      'Biomass of all organisms',
    ],
    correctAnswer: 'Biomass produced by autotrophs',
    explanation:
      'Primary productivity is the rate at which autotrophs (producers) convert solar energy into chemical energy (biomass) through photosynthesis. Gross Primary Productivity (GPP) minus respiration equals Net Primary Productivity (NPP).',
    difficulty: 'Easy',
    ncertPageReference: 'Class 12, Chapter 14, Page 246',
    previousYearFrequency: 11,
    conceptualLinks: ['GPP', 'NPP', 'ecosystem productivity'],
    timeEstimate: 35,
    bloomsLevel: 'Remember',
    weightage: 3.5,
  },
  {
    id: 'q12-049',
    topicId: 'topic-12-13-2',
    chapterId: 'ch-12-13',
    classId: 'class-12',
    question: 'The sequence of communities in ecological succession is called:',
    options: ['Sere', 'Pioneer community', 'Climax community', 'Ecotone'],
    correctAnswer: 'Sere',
    explanation:
      'A sere is the entire sequence of communities that develop during ecological succession from pioneer to climax stage. Each intermediate stage is called a seral community. Primary succession starts on bare rock, secondary on disturbed areas.',
    difficulty: 'Medium',
    ncertPageReference: 'Class 12, Chapter 14, Page 253',
    previousYearFrequency: 9,
    conceptualLinks: ['ecological succession', 'pioneer species', 'climax community'],
    timeEstimate: 45,
    bloomsLevel: 'Remember',
    weightage: 3.5,
  },
  {
    id: 'q12-050',
    topicId: 'topic-12-16-1',
    chapterId: 'ch-12-16',
    classId: 'class-12',
    question: 'The primary greenhouse gas contributing to global warming is:',
    options: ['Methane', 'Carbon dioxide', 'Nitrous oxide', 'CFCs'],
    correctAnswer: 'Carbon dioxide',
    explanation:
      'Carbon dioxide (CO2) is the primary greenhouse gas, contributing about 60% to global warming. It is released by fossil fuel combustion, deforestation, and industrial processes. CO2 traps infrared radiation, warming the atmosphere.',
    difficulty: 'Easy',
    ncertPageReference: 'Class 12, Chapter 16, Page 277',
    previousYearFrequency: 10,
    conceptualLinks: ['greenhouse effect', 'climate change', 'global warming'],
    timeEstimate: 30,
    bloomsLevel: 'Remember',
    weightage: 3.0,
  },
]

// ============================================================================
// DROPPER QUESTIONS - HIGH WEIGHTAGE TOPICS
// ============================================================================

export const dropperQuestions: AuthenticQuestion[] = [
  // Human Physiology - Nervous System
  {
    id: 'qd-001',
    topicId: 'topic-dropper-1-1',
    chapterId: 'ch-dropper-1',
    classId: 'dropper',
    question: 'During the depolarization phase of action potential, which ion channels open first?',
    options: ['Potassium channels', 'Sodium channels', 'Calcium channels', 'Chloride channels'],
    correctAnswer: 'Sodium channels',
    explanation:
      'During depolarization, voltage-gated sodium channels open first, allowing Na⁺ influx which makes the membrane potential positive. K⁺ channels open later during repolarization phase.',
    difficulty: 'Hard',
    ncertPageReference: 'Class 11, Chapter 21, Page 315',
    previousYearFrequency: 12,
    conceptualLinks: ['action potential', 'resting potential', 'nerve transmission'],
    timeEstimate: 60,
    bloomsLevel: 'Analyze',
    weightage: 6.0,
  },
  // Genetics - Molecular Genetics
  {
    id: 'qd-002',
    topicId: 'topic-dropper-1-2',
    chapterId: 'ch-dropper-1',
    classId: 'dropper',
    question: 'In prokaryotes, transcription and translation occur:',
    options: [
      'Sequentially in the nucleus',
      'Simultaneously in the cytoplasm',
      'Transcription in nucleus, translation in cytoplasm',
      'Both in the nucleus',
    ],
    correctAnswer: 'Simultaneously in the cytoplasm',
    explanation:
      'In prokaryotes, both transcription and translation occur in the cytoplasm and can happen simultaneously since there is no nuclear membrane. mRNA can be translated while still being transcribed.',
    difficulty: 'Medium',
    ncertPageReference: 'Class 12, Chapter 6, Page 115',
    previousYearFrequency: 15,
    conceptualLinks: ['gene expression', 'mRNA processing', 'ribosomes'],
    timeEstimate: 50,
    bloomsLevel: 'Understand',
    weightage: 7.0,
  },
]

// ============================================================================
// COMPILED QUESTION BANKS BY CLASS
// ============================================================================

export const authenticQuestionBank = {
  'class-9': class9Questions,
  'class-10': class10Questions,
  'class-11': class11Questions,
  'class-12': class12Questions,
  dropper: dropperQuestions,
}

// ============================================================================
// TOPIC-WISE QUESTION RETRIEVAL FUNCTIONS
// ============================================================================

export const getQuestionsByTopic = (topicIds: string[], classId: string): AuthenticQuestion[] => {
  const classQuestions = authenticQuestionBank[classId as keyof typeof authenticQuestionBank] || []
  return classQuestions.filter((q) => topicIds.includes(q.topicId))
}

export const getQuestionsByDifficulty = (
  difficulty: 'Easy' | 'Medium' | 'Hard',
  classId: string
): AuthenticQuestion[] => {
  const classQuestions = authenticQuestionBank[classId as keyof typeof authenticQuestionBank] || []
  return classQuestions.filter((q) => q.difficulty === difficulty)
}

export const getQuestionsByChapter = (
  chapterIds: string[],
  classId: string
): AuthenticQuestion[] => {
  const classQuestions = authenticQuestionBank[classId as keyof typeof authenticQuestionBank] || []
  return classQuestions.filter((q) => chapterIds.includes(q.chapterId))
}

export const getHighWeightageQuestions = (
  classId: string,
  weightageThreshold: number = 4.0
): AuthenticQuestion[] => {
  const classQuestions = authenticQuestionBank[classId as keyof typeof authenticQuestionBank] || []
  return classQuestions.filter((q) => q.weightage >= weightageThreshold)
}

export const getQuestionsByBloomsLevel = (
  bloomsLevel: string,
  classId: string
): AuthenticQuestion[] => {
  const classQuestions = authenticQuestionBank[classId as keyof typeof authenticQuestionBank] || []
  return classQuestions.filter((q) => q.bloomsLevel === bloomsLevel)
}

// ============================================================================
// QUESTION STATISTICS
// ============================================================================

export const getQuestionBankStats = () => {
  const allQuestions = [
    ...class9Questions,
    ...class10Questions,
    ...class11Questions,
    ...class12Questions,
    ...dropperQuestions,
  ]

  return {
    totalQuestions: allQuestions.length,
    class9: class9Questions.length,
    class10: class10Questions.length,
    class11: class11Questions.length,
    class12: class12Questions.length,
    dropper: dropperQuestions.length,
    difficultyDistribution: {
      easy: allQuestions.filter((q) => q.difficulty === 'Easy').length,
      medium: allQuestions.filter((q) => q.difficulty === 'Medium').length,
      hard: allQuestions.filter((q) => q.difficulty === 'Hard').length,
    },
    bloomsDistribution: {
      remember: allQuestions.filter((q) => q.bloomsLevel === 'Remember').length,
      understand: allQuestions.filter((q) => q.bloomsLevel === 'Understand').length,
      apply: allQuestions.filter((q) => q.bloomsLevel === 'Apply').length,
      analyze: allQuestions.filter((q) => q.bloomsLevel === 'Analyze').length,
      evaluate: allQuestions.filter((q) => q.bloomsLevel === 'Evaluate').length,
    },
  }
}

// Quality Standards for Question Bank
export const qualityStandards = {
  minimumQuestionsPerTopic: 5,
  difficultyDistribution: {
    easy: 0.3, // 30% easy questions
    medium: 0.5, // 50% medium questions
    hard: 0.2, // 20% hard questions
  },
  bloomsDistribution: {
    remember: 0.25, // 25% factual recall
    understand: 0.35, // 35% conceptual understanding
    apply: 0.25, // 25% application
    analyze: 0.1, // 10% analysis
    evaluate: 0.05, // 5% evaluation
  },
  averageTimePerQuestion: 45, // seconds
  ncertAlignment: 1.0, // 100% questions must have NCERT reference
}
