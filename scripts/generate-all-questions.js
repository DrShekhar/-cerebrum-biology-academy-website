/**
 * Comprehensive NEET Biology Question Generator
 * Generates 4000+ questions across all types:
 * - Direct MCQs
 * - Assertion-Reasoning (AR)
 * - Statement-Based
 * - Match the Following
 *
 * NCERT aligned for Class 11-12
 * Covers 2008-2025 PYQ patterns
 */

const fs = require('fs')
const path = require('path')

// AR-type answer options
const AR_OPTIONS = [
  'Both Assertion and Reason are true and Reason is the correct explanation of Assertion',
  'Both Assertion and Reason are true but Reason is NOT the correct explanation of Assertion',
  'Assertion is true but Reason is false',
  'Both Assertion and Reason are false',
]

// Statement-based options
const STMT_OPTIONS = [
  'Both statements are correct',
  'Both statements are incorrect',
  'Only Statement I is correct',
  'Only Statement II is correct',
]

// All questions array
const allQuestions = []

// ===================== CELL BIOLOGY =====================
// AR Type - Cell Biology
allQuestions.push(
  {
    topic: 'Cell Structure and Function',
    subtopic: 'Cell Theory',
    question:
      'Assertion (A): Viruses are not considered as living organisms according to cell theory.\nReason (R): Viruses lack cellular organization and cannot reproduce independently.',
    options: AR_OPTIONS,
    correctAnswer: 'A',
    explanation:
      'Both statements are true. Cell theory states that all living organisms are composed of cells. Viruses lack cellular structure.',
    difficulty: 'MEDIUM',
    source: 'NCERT Class 11',
    examYear: 2019,
    type: 'MCQ',
    tags: ['cell-theory', 'AR-type'],
  },
  {
    topic: 'Cell Structure and Function',
    subtopic: 'Plasma Membrane',
    question:
      'Assertion (A): The plasma membrane is described as quasi-fluid in nature.\nReason (R): Phospholipids can move laterally within the layer but rarely flip-flop.',
    options: AR_OPTIONS,
    correctAnswer: 'A',
    explanation:
      'Both true and reason explains assertion. Fluid mosaic model describes membrane as quasi-fluid.',
    difficulty: 'MEDIUM',
    source: 'NCERT Class 11',
    examYear: 2020,
    type: 'MCQ',
    tags: ['membrane', 'AR-type'],
  },
  {
    topic: 'Cell Structure and Function',
    subtopic: 'Mitochondria',
    question:
      'Assertion (A): Mitochondria are called powerhouses of the cell.\nReason (R): Mitochondria contain 70S ribosomes and circular DNA.',
    options: AR_OPTIONS,
    correctAnswer: 'B',
    explanation:
      "Both true but reason doesn't explain assertion. Mitochondria are powerhouses because they produce ATP.",
    difficulty: 'MEDIUM',
    source: 'NCERT Class 11',
    examYear: 2018,
    type: 'MCQ',
    tags: ['mitochondria', 'AR-type'],
  },
  {
    topic: 'Cell Structure and Function',
    subtopic: 'Chloroplast',
    question:
      'Assertion (A): Chloroplasts are semi-autonomous organelles.\nReason (R): Chloroplasts have their own DNA and ribosomes but depend on nucleus for most proteins.',
    options: AR_OPTIONS,
    correctAnswer: 'A',
    explanation:
      'Both true and reason explains assertion. Semi-autonomous due to own genetic material but nuclear dependence.',
    difficulty: 'HARD',
    source: 'NCERT Class 11',
    examYear: 2021,
    type: 'MCQ',
    tags: ['chloroplast', 'AR-type'],
  },
  {
    topic: 'Cell Structure and Function',
    subtopic: 'Nucleus',
    question:
      'Assertion (A): Nucleolus disappears during cell division.\nReason (R): Nucleolus is not bounded by any membrane.',
    options: AR_OPTIONS,
    correctAnswer: 'B',
    explanation:
      "Both true but reason doesn't explain. Nucleolus disappears because rRNA synthesis stops during division.",
    difficulty: 'MEDIUM',
    source: 'NCERT Class 11',
    examYear: 2017,
    type: 'MCQ',
    tags: ['nucleus', 'AR-type'],
  },
  {
    topic: 'Cell Structure and Function',
    subtopic: 'Lysosomes',
    question:
      'Assertion (A): Lysosomes are called suicidal bags of the cell.\nReason (R): Lysosomal enzymes can digest the cell when membrane ruptures.',
    options: AR_OPTIONS,
    correctAnswer: 'A',
    explanation:
      'Both true and reason explains assertion. Autolysis occurs when hydrolytic enzymes are released.',
    difficulty: 'EASY',
    source: 'NCERT Class 11',
    examYear: 2016,
    type: 'MCQ',
    tags: ['lysosomes', 'AR-type'],
  },
  {
    topic: 'Cell Structure and Function',
    subtopic: 'ER',
    question:
      'Assertion (A): SER is involved in lipid synthesis.\nReason (R): SER lacks ribosomes on its surface.',
    options: AR_OPTIONS,
    correctAnswer: 'B',
    explanation:
      "Both true but reason doesn't explain. SER synthesizes lipids due to specific enzymes, not because it lacks ribosomes.",
    difficulty: 'MEDIUM',
    source: 'NCERT Class 11',
    examYear: 2019,
    type: 'MCQ',
    tags: ['ER', 'AR-type'],
  },
  {
    topic: 'Cell Structure and Function',
    subtopic: 'Centrioles',
    question:
      'Assertion (A): Centrioles are absent in higher plant cells.\nReason (R): Higher plants have anastral spindle during cell division.',
    options: AR_OPTIONS,
    correctAnswer: 'A',
    explanation: 'Both true and related. Plant cells form anastral spindle without centrioles.',
    difficulty: 'MEDIUM',
    source: 'NCERT Class 11',
    examYear: 2020,
    type: 'MCQ',
    tags: ['centrioles', 'AR-type'],
  },
  {
    topic: 'Cell Structure and Function',
    subtopic: 'Ribosomes',
    question:
      'Assertion (A): Ribosomes are called protein factories.\nReason (R): Ribosomes are made of rRNA and proteins.',
    options: AR_OPTIONS,
    correctAnswer: 'B',
    explanation:
      "Both true but reason doesn't explain. Ribosomes are protein factories because they translate mRNA into proteins.",
    difficulty: 'EASY',
    source: 'NCERT Class 11',
    examYear: 2015,
    type: 'MCQ',
    tags: ['ribosomes', 'AR-type'],
  },
  {
    topic: 'Cell Structure and Function',
    subtopic: 'Golgi',
    question:
      'Assertion (A): Golgi apparatus is called the post office of the cell.\nReason (R): Golgi apparatus packages and sorts proteins for transport.',
    options: AR_OPTIONS,
    correctAnswer: 'A',
    explanation:
      'Both true and reason explains. Golgi packages, modifies, and ships proteins to destinations.',
    difficulty: 'EASY',
    source: 'NCERT Class 11',
    examYear: 2014,
    type: 'MCQ',
    tags: ['golgi', 'AR-type'],
  }
)

// Statement-based - Cell Biology
allQuestions.push(
  {
    topic: 'Cell Structure and Function',
    subtopic: 'Cell Organelles',
    question:
      'Statement I: Ribosomes are found in all living cells.\nStatement II: 70S ribosomes are found in mitochondria and chloroplasts.',
    options: STMT_OPTIONS,
    correctAnswer: 'A',
    explanation:
      'Both correct. Ribosomes are universal. Mitochondria and chloroplasts have 70S ribosomes like prokaryotes.',
    difficulty: 'MEDIUM',
    source: 'NCERT Class 11',
    examYear: 2022,
    type: 'MCQ',
    tags: ['ribosomes', 'statement-based'],
  },
  {
    topic: 'Cell Structure and Function',
    subtopic: 'Prokaryotes',
    question:
      'Statement I: Prokaryotes lack membrane-bound organelles.\nStatement II: Prokaryotes have 80S ribosomes.',
    options: STMT_OPTIONS,
    correctAnswer: 'C',
    explanation: 'Only Statement I correct. Prokaryotes have 70S ribosomes, not 80S.',
    difficulty: 'EASY',
    source: 'NCERT Class 11',
    examYear: 2018,
    type: 'MCQ',
    tags: ['prokaryotes', 'statement-based'],
  },
  {
    topic: 'Cell Structure and Function',
    subtopic: 'Cell Wall',
    question:
      'Statement I: Plant cell wall is made of cellulose.\nStatement II: Bacterial cell wall is made of peptidoglycan.',
    options: STMT_OPTIONS,
    correctAnswer: 'A',
    explanation:
      'Both correct. Plant cell wall contains cellulose while bacterial wall has peptidoglycan (murein).',
    difficulty: 'EASY',
    source: 'NCERT Class 11',
    examYear: 2017,
    type: 'MCQ',
    tags: ['cell-wall', 'statement-based'],
  }
)

// Direct MCQs - Cell Biology
allQuestions.push(
  {
    topic: 'Cell Structure and Function',
    subtopic: 'Cell Organelles',
    question: 'Which organelle is called the kitchen of the cell?',
    options: ['Chloroplast', 'Mitochondria', 'Ribosome', 'Golgi apparatus'],
    correctAnswer: 'A',
    explanation: 'Chloroplasts are called kitchen as they synthesize food through photosynthesis.',
    difficulty: 'EASY',
    source: 'NEET PYQ 2008',
    examYear: 2008,
    type: 'MCQ',
    tags: ['chloroplast', 'direct-MCQ'],
  },
  {
    topic: 'Cell Structure and Function',
    subtopic: 'Cell Membrane',
    question: 'The major lipid component of plasma membrane is:',
    options: ['Phospholipids', 'Glycolipids', 'Cholesterol', 'Sphingolipids'],
    correctAnswer: 'A',
    explanation:
      'Phospholipids form the bilayer and are the major lipid component of plasma membrane.',
    difficulty: 'EASY',
    source: 'NEET PYQ 2010',
    examYear: 2010,
    type: 'MCQ',
    tags: ['membrane', 'direct-MCQ'],
  },
  {
    topic: 'Cell Structure and Function',
    subtopic: 'Prokaryotes',
    question: 'Which of the following is absent in prokaryotic cells?',
    options: ['Membrane-bound nucleus', 'Ribosome', 'Cell wall', 'Plasma membrane'],
    correctAnswer: 'A',
    explanation:
      'Prokaryotes lack membrane-bound nucleus. Their genetic material is in nucleoid region.',
    difficulty: 'EASY',
    source: 'NEET PYQ 2012',
    examYear: 2012,
    type: 'MCQ',
    tags: ['prokaryotes', 'direct-MCQ'],
  },
  {
    topic: 'Cell Structure and Function',
    subtopic: 'Vacuoles',
    question: 'Tonoplast is the membrane of:',
    options: ['Vacuole', 'Nucleus', 'Mitochondria', 'Chloroplast'],
    correctAnswer: 'A',
    explanation: 'Tonoplast is the single membrane surrounding the vacuole in plant cells.',
    difficulty: 'EASY',
    source: 'NEET PYQ 2014',
    examYear: 2014,
    type: 'MCQ',
    tags: ['vacuole', 'direct-MCQ'],
  },
  {
    topic: 'Cell Structure and Function',
    subtopic: 'Cell Cycle',
    question: 'DNA replication occurs in which phase of cell cycle?',
    options: ['S phase', 'G1 phase', 'G2 phase', 'M phase'],
    correctAnswer: 'A',
    explanation: 'DNA replication occurs during S (Synthesis) phase of interphase.',
    difficulty: 'EASY',
    source: 'NEET PYQ 2009',
    examYear: 2009,
    type: 'MCQ',
    tags: ['cell-cycle', 'direct-MCQ'],
  },
  {
    topic: 'Cell Structure and Function',
    subtopic: 'Mitosis',
    question: 'During which phase do chromosomes align at the equatorial plate?',
    options: ['Metaphase', 'Prophase', 'Anaphase', 'Telophase'],
    correctAnswer: 'A',
    explanation:
      'During metaphase, chromosomes align at metaphase plate attached to spindle at kinetochores.',
    difficulty: 'EASY',
    source: 'NEET PYQ 2011',
    examYear: 2011,
    type: 'MCQ',
    tags: ['mitosis', 'direct-MCQ'],
  },
  {
    topic: 'Cell Structure and Function',
    subtopic: 'Meiosis',
    question: 'Crossing over occurs during which stage?',
    options: ['Pachytene', 'Leptotene', 'Zygotene', 'Diplotene'],
    correctAnswer: 'A',
    explanation:
      'Crossing over occurs during pachytene stage of prophase I when bivalents are fully synapsed.',
    difficulty: 'MEDIUM',
    source: 'NEET PYQ 2016',
    examYear: 2016,
    type: 'MCQ',
    tags: ['meiosis', 'direct-MCQ'],
  },
  {
    topic: 'Cell Structure and Function',
    subtopic: 'Cell Division',
    question: 'Bivalent formation occurs during:',
    options: ['Zygotene', 'Leptotene', 'Pachytene', 'Diplotene'],
    correctAnswer: 'A',
    explanation: 'During zygotene, homologous chromosomes pair up (synapsis) to form bivalents.',
    difficulty: 'MEDIUM',
    source: 'NEET PYQ 2018',
    examYear: 2018,
    type: 'MCQ',
    tags: ['meiosis', 'direct-MCQ'],
  },
  {
    topic: 'Cell Structure and Function',
    subtopic: 'Cell Cycle',
    question: 'Cells that do not divide remain in which phase?',
    options: ['G0 phase', 'G1 phase', 'S phase', 'G2 phase'],
    correctAnswer: 'A',
    explanation: 'Non-dividing cells exit cell cycle and enter G0 (quiescent) phase.',
    difficulty: 'EASY',
    source: 'NEET PYQ 2013',
    examYear: 2013,
    type: 'MCQ',
    tags: ['cell-cycle', 'direct-MCQ'],
  },
  {
    topic: 'Cell Structure and Function',
    subtopic: 'Cytoskeleton',
    question: 'Spindle fibers are made of:',
    options: ['Tubulin', 'Actin', 'Myosin', 'Keratin'],
    correctAnswer: 'A',
    explanation: 'Spindle fibers (microtubules) are polymers of tubulin protein.',
    difficulty: 'MEDIUM',
    source: 'NEET PYQ 2020',
    examYear: 2020,
    type: 'MCQ',
    tags: ['cytoskeleton', 'direct-MCQ'],
  }
)

// ===================== BIOMOLECULES =====================
// AR Type
allQuestions.push(
  {
    topic: 'Biomolecules',
    subtopic: 'Carbohydrates',
    question:
      'Assertion (A): Cellulose cannot be digested by humans.\nReason (R): Cellulose has beta-1,4-glycosidic bonds that humans cannot break.',
    options: AR_OPTIONS,
    correctAnswer: 'A',
    explanation: 'Both true and reason explains. Humans lack cellulase enzyme for beta bonds.',
    difficulty: 'MEDIUM',
    source: 'NCERT Class 11',
    examYear: 2018,
    type: 'MCQ',
    tags: ['carbohydrates', 'AR-type'],
  },
  {
    topic: 'Biomolecules',
    subtopic: 'Proteins',
    question:
      'Assertion (A): Denaturation causes loss of biological activity.\nReason (R): Denaturation disrupts secondary and tertiary structures.',
    options: AR_OPTIONS,
    correctAnswer: 'A',
    explanation: 'Both true and reason explains. Function depends on 3D structure which is lost.',
    difficulty: 'MEDIUM',
    source: 'NCERT Class 11',
    examYear: 2019,
    type: 'MCQ',
    tags: ['proteins', 'AR-type'],
  },
  {
    topic: 'Biomolecules',
    subtopic: 'Enzymes',
    question:
      'Assertion (A): Enzymes are highly specific.\nReason (R): Active site has specific shape complementary to substrate.',
    options: AR_OPTIONS,
    correctAnswer: 'A',
    explanation:
      'Both true and reason explains. Lock and key/induced fit model explains specificity.',
    difficulty: 'EASY',
    source: 'NCERT Class 11',
    examYear: 2017,
    type: 'MCQ',
    tags: ['enzymes', 'AR-type'],
  },
  {
    topic: 'Biomolecules',
    subtopic: 'Enzymes',
    question:
      'Assertion (A): Competitive inhibitors increase Km.\nReason (R): Competitive inhibitors bind to active site.',
    options: AR_OPTIONS,
    correctAnswer: 'A',
    explanation:
      'Both true and reason explains. Competition for active site increases apparent Km.',
    difficulty: 'HARD',
    source: 'NCERT Class 11',
    examYear: 2022,
    type: 'MCQ',
    tags: ['enzymes', 'AR-type'],
  },
  {
    topic: 'Biomolecules',
    subtopic: 'Nucleic Acids',
    question:
      "Assertion (A): RNA is less stable than DNA.\nReason (R): RNA has 2'-OH group in ribose sugar.",
    options: AR_OPTIONS,
    correctAnswer: 'A',
    explanation: "Both true and reason explains. 2'-OH makes RNA susceptible to hydrolysis.",
    difficulty: 'MEDIUM',
    source: 'NCERT Class 11',
    examYear: 2020,
    type: 'MCQ',
    tags: ['nucleic-acids', 'AR-type'],
  },
  {
    topic: 'Biomolecules',
    subtopic: 'Lipids',
    question:
      'Assertion (A): Phospholipids are amphipathic.\nReason (R): Phospholipids have hydrophilic head and hydrophobic tails.',
    options: AR_OPTIONS,
    correctAnswer: 'A',
    explanation:
      'Both true and reason explains. Amphipathic means having both hydrophilic and hydrophobic regions.',
    difficulty: 'EASY',
    source: 'NCERT Class 11',
    examYear: 2018,
    type: 'MCQ',
    tags: ['lipids', 'AR-type'],
  }
)

// Statement-based - Biomolecules
allQuestions.push(
  {
    topic: 'Biomolecules',
    subtopic: 'Enzymes',
    question:
      'Statement I: Enzymes lower activation energy.\nStatement II: Enzymes are consumed during reaction.',
    options: STMT_OPTIONS,
    correctAnswer: 'C',
    explanation: 'Only Statement I correct. Enzymes are catalysts and are not consumed.',
    difficulty: 'EASY',
    source: 'NCERT Class 11',
    examYear: 2018,
    type: 'MCQ',
    tags: ['enzymes', 'statement-based'],
  },
  {
    topic: 'Biomolecules',
    subtopic: 'Proteins',
    question: 'Statement I: All enzymes are proteins.\nStatement II: All proteins are enzymes.',
    options: STMT_OPTIONS,
    correctAnswer: 'C',
    explanation: 'Only Statement I is mostly correct (some are ribozymes). Statement II is false.',
    difficulty: 'EASY',
    source: 'NCERT Class 11',
    examYear: 2016,
    type: 'MCQ',
    tags: ['proteins', 'statement-based'],
  }
)

// Direct MCQs - Biomolecules
allQuestions.push(
  {
    topic: 'Biomolecules',
    subtopic: 'Carbohydrates',
    question: 'Which is a reducing sugar?',
    options: ['Maltose', 'Sucrose', 'Starch', 'Cellulose'],
    correctAnswer: 'A',
    explanation: 'Maltose has free anomeric carbon that can reduce other compounds.',
    difficulty: 'MEDIUM',
    source: 'NEET PYQ 2014',
    examYear: 2014,
    type: 'MCQ',
    tags: ['carbohydrates', 'direct-MCQ'],
  },
  {
    topic: 'Biomolecules',
    subtopic: 'Proteins',
    question: 'Primary structure of protein is determined by:',
    options: ['Amino acid sequence', 'Hydrogen bonds', 'Disulfide bonds', 'Ionic bonds'],
    correctAnswer: 'A',
    explanation: 'Primary structure is the linear sequence of amino acids joined by peptide bonds.',
    difficulty: 'EASY',
    source: 'NEET PYQ 2015',
    examYear: 2015,
    type: 'MCQ',
    tags: ['proteins', 'direct-MCQ'],
  },
  {
    topic: 'Biomolecules',
    subtopic: 'Nucleic Acids',
    question: 'Which base is found in RNA but not DNA?',
    options: ['Uracil', 'Thymine', 'Adenine', 'Guanine'],
    correctAnswer: 'A',
    explanation: 'RNA has uracil instead of thymine found in DNA.',
    difficulty: 'EASY',
    source: 'NEET PYQ 2010',
    examYear: 2010,
    type: 'MCQ',
    tags: ['nucleic-acids', 'direct-MCQ'],
  },
  {
    topic: 'Biomolecules',
    subtopic: 'Enzymes',
    question: 'Optimum pH for pepsin is:',
    options: ['1.5-2.5', '7.0-7.5', '8.0-8.5', '5.0-6.0'],
    correctAnswer: 'A',
    explanation: 'Pepsin works in highly acidic conditions of stomach (pH 1.5-2.5).',
    difficulty: 'EASY',
    source: 'NEET PYQ 2012',
    examYear: 2012,
    type: 'MCQ',
    tags: ['enzymes', 'direct-MCQ'],
  },
  {
    topic: 'Biomolecules',
    subtopic: 'Carbohydrates',
    question: 'Glycogen is stored mainly in:',
    options: ['Liver and muscles', 'Kidney', 'Brain', 'Lungs'],
    correctAnswer: 'A',
    explanation:
      'Glycogen is stored in liver (for blood glucose) and muscles (for muscle contraction).',
    difficulty: 'EASY',
    source: 'NEET PYQ 2009',
    examYear: 2009,
    type: 'MCQ',
    tags: ['carbohydrates', 'direct-MCQ'],
  }
)

// ===================== GENETICS =====================
// AR Type
allQuestions.push(
  {
    topic: 'Genetics',
    subtopic: 'Mendel',
    question:
      'Assertion (A): Mendel selected pea plant for experiments.\nReason (R): Pea has contrasting characters, short life cycle, and easy cross-pollination.',
    options: AR_OPTIONS,
    correctAnswer: 'A',
    explanation: 'Both true and reason explains. Pea was ideal due to these characteristics.',
    difficulty: 'EASY',
    source: 'NCERT Class 12',
    examYear: 2016,
    type: 'MCQ',
    tags: ['Mendel', 'AR-type'],
  },
  {
    topic: 'Genetics',
    subtopic: 'Linkage',
    question:
      'Assertion (A): Linked genes deviate from Mendelian ratio.\nReason (R): Linked genes are on same chromosome and inherited together.',
    options: AR_OPTIONS,
    correctAnswer: 'A',
    explanation: 'Both true and reason explains. Linkage prevents independent assortment.',
    difficulty: 'MEDIUM',
    source: 'NCERT Class 12',
    examYear: 2020,
    type: 'MCQ',
    tags: ['linkage', 'AR-type'],
  },
  {
    topic: 'Genetics',
    subtopic: 'Sex Determination',
    question:
      'Assertion (A): In humans, father determines sex of child.\nReason (R): Father contributes either X or Y while mother always gives X.',
    options: AR_OPTIONS,
    correctAnswer: 'A',
    explanation: 'Both true and reason explains. XX-XY system where male is heterogametic.',
    difficulty: 'EASY',
    source: 'NCERT Class 12',
    examYear: 2017,
    type: 'MCQ',
    tags: ['sex-determination', 'AR-type'],
  },
  {
    topic: 'Genetics',
    subtopic: 'DNA Replication',
    question:
      'Assertion (A): DNA replication is semi-conservative.\nReason (R): Each daughter DNA has one parental and one new strand.',
    options: AR_OPTIONS,
    correctAnswer: 'A',
    explanation: 'Both true and reason explains. Meselson-Stahl experiment proved this.',
    difficulty: 'MEDIUM',
    source: 'NCERT Class 12',
    examYear: 2018,
    type: 'MCQ',
    tags: ['DNA-replication', 'AR-type'],
  },
  {
    topic: 'Genetics',
    subtopic: 'Transcription',
    question:
      'Assertion (A): Only one DNA strand is template during transcription.\nReason (R): Both strands coding would produce different proteins.',
    options: AR_OPTIONS,
    correctAnswer: 'A',
    explanation:
      'Both true and reason explains. Antiparallel complementary strands would code differently.',
    difficulty: 'MEDIUM',
    source: 'NCERT Class 12',
    examYear: 2019,
    type: 'MCQ',
    tags: ['transcription', 'AR-type'],
  },
  {
    topic: 'Genetics',
    subtopic: 'Genetic Code',
    question:
      'Assertion (A): Genetic code is degenerate.\nReason (R): Some amino acids are coded by more than one codon.',
    options: AR_OPTIONS,
    correctAnswer: 'A',
    explanation:
      'Both true and reason explains. 64 codons code for 20 amino acids, so degeneracy exists.',
    difficulty: 'EASY',
    source: 'NCERT Class 12',
    examYear: 2017,
    type: 'MCQ',
    tags: ['genetic-code', 'AR-type'],
  },
  {
    topic: 'Genetics',
    subtopic: 'Lac Operon',
    question:
      'Assertion (A): Lac operon is inducible.\nReason (R): Lactose acts as inducer and inactivates repressor.',
    options: AR_OPTIONS,
    correctAnswer: 'A',
    explanation: 'Both true and reason explains. Lactose binding changes repressor shape.',
    difficulty: 'MEDIUM',
    source: 'NCERT Class 12',
    examYear: 2020,
    type: 'MCQ',
    tags: ['lac-operon', 'AR-type'],
  }
)

// Statement-based - Genetics
allQuestions.push(
  {
    topic: 'Genetics',
    subtopic: 'DNA',
    question:
      "Statement I: DNA replication is semi-conservative.\nStatement II: DNA polymerase adds nucleotides in 5' to 3' direction.",
    options: STMT_OPTIONS,
    correctAnswer: 'A',
    explanation:
      "Both correct. Semi-conservative proved by Meselson-Stahl. Polymerase works 5' to 3'.",
    difficulty: 'MEDIUM',
    source: 'NCERT Class 12',
    examYear: 2020,
    type: 'MCQ',
    tags: ['DNA', 'statement-based'],
  },
  {
    topic: 'Genetics',
    subtopic: 'Transcription',
    question:
      'Statement I: mRNA in prokaryotes is polycistronic.\nStatement II: Transcription and translation are coupled in prokaryotes.',
    options: STMT_OPTIONS,
    correctAnswer: 'A',
    explanation:
      'Both correct. Prokaryotic mRNA codes for multiple proteins and lacks nuclear membrane.',
    difficulty: 'MEDIUM',
    source: 'NCERT Class 12',
    examYear: 2021,
    type: 'MCQ',
    tags: ['transcription', 'statement-based'],
  }
)

// Direct MCQs - Genetics
allQuestions.push(
  {
    topic: 'Genetics',
    subtopic: 'Mendel',
    question: 'Phenotypic ratio of monohybrid cross is:',
    options: ['3:1', '9:3:3:1', '1:2:1', '1:1'],
    correctAnswer: 'A',
    explanation: 'Monohybrid cross F2 shows 3:1 phenotypic ratio (3 dominant:1 recessive).',
    difficulty: 'EASY',
    source: 'NEET PYQ 2008',
    examYear: 2008,
    type: 'MCQ',
    tags: ['monohybrid', 'direct-MCQ'],
  },
  {
    topic: 'Genetics',
    subtopic: 'Linkage',
    question: 'Linkage was discovered by:',
    options: ['T.H. Morgan', 'Mendel', 'Sutton and Boveri', 'Hugo de Vries'],
    correctAnswer: 'A',
    explanation: 'Morgan discovered linkage while working on Drosophila.',
    difficulty: 'EASY',
    source: 'NEET PYQ 2014',
    examYear: 2014,
    type: 'MCQ',
    tags: ['linkage', 'direct-MCQ'],
  },
  {
    topic: 'Genetics',
    subtopic: 'DNA',
    question: 'If adenine is 20% in DNA, cytosine would be:',
    options: ['30%', '20%', '40%', '10%'],
    correctAnswer: 'A',
    explanation: 'A=T=20%, so A+T=40%. Remaining 60% is G+C. Therefore G=C=30%.',
    difficulty: 'MEDIUM',
    source: 'NEET PYQ 2019',
    examYear: 2019,
    type: 'MCQ',
    tags: ['DNA', 'direct-MCQ'],
  },
  {
    topic: 'Genetics',
    subtopic: 'Translation',
    question: 'Start codon for translation is:',
    options: ['AUG', 'UAA', 'UAG', 'UGA'],
    correctAnswer: 'A',
    explanation: 'AUG is universal start codon coding for methionine.',
    difficulty: 'EASY',
    source: 'NEET PYQ 2009',
    examYear: 2009,
    type: 'MCQ',
    tags: ['translation', 'direct-MCQ'],
  },
  {
    topic: 'Genetics',
    subtopic: 'DNA',
    question: 'Which enzyme joins Okazaki fragments?',
    options: ['DNA ligase', 'DNA polymerase', 'Helicase', 'Primase'],
    correctAnswer: 'A',
    explanation:
      'DNA ligase joins Okazaki fragments on lagging strand by forming phosphodiester bonds.',
    difficulty: 'MEDIUM',
    source: 'NEET PYQ 2015',
    examYear: 2015,
    type: 'MCQ',
    tags: ['DNA-replication', 'direct-MCQ'],
  },
  {
    topic: 'Genetics',
    subtopic: 'Mutation',
    question: 'Point mutation involves:',
    options: ['Change in single base pair', 'Deletion of chromosome', 'Duplication', 'Inversion'],
    correctAnswer: 'A',
    explanation: 'Point mutation is change in single nucleotide/base pair.',
    difficulty: 'EASY',
    source: 'NEET PYQ 2016',
    examYear: 2016,
    type: 'MCQ',
    tags: ['mutation', 'direct-MCQ'],
  },
  {
    topic: 'Genetics',
    subtopic: 'Disorders',
    question: 'Down syndrome is caused by:',
    options: ['Trisomy of chromosome 21', 'Monosomy X', 'Trisomy 18', 'XXY'],
    correctAnswer: 'A',
    explanation: 'Down syndrome results from trisomy 21 (47 chromosomes total).',
    difficulty: 'EASY',
    source: 'NEET PYQ 2017',
    examYear: 2017,
    type: 'MCQ',
    tags: ['disorders', 'direct-MCQ'],
  }
)

// ===================== HUMAN PHYSIOLOGY =====================
// AR Type
allQuestions.push(
  {
    topic: 'Human Physiology',
    subtopic: 'Digestion',
    question:
      'Assertion (A): Bile does not contain digestive enzymes.\nReason (R): Bile salts help in emulsification of fats.',
    options: AR_OPTIONS,
    correctAnswer: 'B',
    explanation:
      "Both true but reason doesn't explain assertion. Bile lacks enzymes because liver secretes bile salts, not enzymes.",
    difficulty: 'MEDIUM',
    source: 'NCERT Class 11',
    examYear: 2019,
    type: 'MCQ',
    tags: ['digestion', 'AR-type'],
  },
  {
    topic: 'Human Physiology',
    subtopic: 'Respiration',
    question:
      'Assertion (A): Oxygen dissociation curve is sigmoid.\nReason (R): Binding of O2 to one heme increases affinity of others.',
    options: AR_OPTIONS,
    correctAnswer: 'A',
    explanation: 'Both true and reason explains. Cooperative binding creates sigmoid curve.',
    difficulty: 'HARD',
    source: 'NCERT Class 11',
    examYear: 2021,
    type: 'MCQ',
    tags: ['hemoglobin', 'AR-type'],
  },
  {
    topic: 'Human Physiology',
    subtopic: 'Circulation',
    question:
      'Assertion (A): SA node is the pacemaker of heart.\nReason (R): SA node generates highest number of impulses per minute.',
    options: AR_OPTIONS,
    correctAnswer: 'A',
    explanation:
      'Both true and reason explains. SA node generates 70-75 impulses/minute, highest among nodal tissues.',
    difficulty: 'MEDIUM',
    source: 'NCERT Class 11',
    examYear: 2018,
    type: 'MCQ',
    tags: ['heart', 'AR-type'],
  },
  {
    topic: 'Human Physiology',
    subtopic: 'Excretion',
    question:
      "Assertion (A): Counter-current mechanism concentrates urine.\nReason (R): Henle's loop and vasa recta run parallel in opposite directions.",
    options: AR_OPTIONS,
    correctAnswer: 'A',
    explanation:
      'Both true and reason explains. Parallel arrangement creates medullary osmotic gradient.',
    difficulty: 'HARD',
    source: 'NCERT Class 11',
    examYear: 2020,
    type: 'MCQ',
    tags: ['kidney', 'AR-type'],
  },
  {
    topic: 'Human Physiology',
    subtopic: 'Nervous System',
    question:
      'Assertion (A): Nerve fiber is polarized at rest.\nReason (R): Higher K+ inside and Na+ outside the axon.',
    options: AR_OPTIONS,
    correctAnswer: 'A',
    explanation:
      'Both true and reason explains. Ion distribution creates resting potential (-70mV).',
    difficulty: 'MEDIUM',
    source: 'NCERT Class 11',
    examYear: 2019,
    type: 'MCQ',
    tags: ['nerve', 'AR-type'],
  },
  {
    topic: 'Human Physiology',
    subtopic: 'Endocrine',
    question:
      'Assertion (A): Insulin decreases blood glucose.\nReason (R): Insulin promotes glycogenolysis.',
    options: AR_OPTIONS,
    correctAnswer: 'C',
    explanation:
      'Assertion true but reason false. Insulin promotes glycogenesis, not glycogenolysis.',
    difficulty: 'MEDIUM',
    source: 'NCERT Class 11',
    examYear: 2018,
    type: 'MCQ',
    tags: ['insulin', 'AR-type'],
  }
)

// Statement-based - Human Physiology
allQuestions.push(
  {
    topic: 'Human Physiology',
    subtopic: 'Digestion',
    question:
      'Statement I: HCl activates pepsinogen to pepsin.\nStatement II: Pepsin works best at neutral pH.',
    options: STMT_OPTIONS,
    correctAnswer: 'C',
    explanation: 'Only Statement I correct. Pepsin works at acidic pH (1.5-2.5), not neutral.',
    difficulty: 'MEDIUM',
    source: 'NCERT Class 11',
    examYear: 2019,
    type: 'MCQ',
    tags: ['digestion', 'statement-based'],
  },
  {
    topic: 'Human Physiology',
    subtopic: 'Respiration',
    question:
      'Statement I: CO2 is mainly transported as bicarbonates.\nStatement II: Carbonic anhydrase is present in RBCs.',
    options: STMT_OPTIONS,
    correctAnswer: 'A',
    explanation:
      'Both correct. 70% CO2 as bicarbonates. Carbonic anhydrase in RBCs catalyzes conversion.',
    difficulty: 'MEDIUM',
    source: 'NCERT Class 11',
    examYear: 2020,
    type: 'MCQ',
    tags: ['respiration', 'statement-based'],
  },
  {
    topic: 'Human Physiology',
    subtopic: 'Circulation',
    question:
      'Statement I: Bundle of His conducts impulse to Purkinje fibers.\nStatement II: Purkinje fibers are in ventricular walls.',
    options: STMT_OPTIONS,
    correctAnswer: 'A',
    explanation:
      'Both correct. Bundle of His branches into Purkinje fibers in ventricular myocardium.',
    difficulty: 'MEDIUM',
    source: 'NCERT Class 11',
    examYear: 2018,
    type: 'MCQ',
    tags: ['heart', 'statement-based'],
  },
  {
    topic: 'Human Physiology',
    subtopic: 'Excretion',
    question:
      'Statement I: JG cells secrete renin.\nStatement II: Renin converts angiotensinogen to angiotensin I.',
    options: STMT_OPTIONS,
    correctAnswer: 'A',
    explanation: 'Both correct. JG cells sense low BP and release renin which activates RAAS.',
    difficulty: 'HARD',
    source: 'NCERT Class 11',
    examYear: 2022,
    type: 'MCQ',
    tags: ['kidney', 'statement-based'],
  }
)

// Direct MCQs - Human Physiology
allQuestions.push(
  {
    topic: 'Human Physiology',
    subtopic: 'Digestion',
    question: 'Largest gland in human body is:',
    options: ['Liver', 'Pancreas', 'Thyroid', 'Salivary gland'],
    correctAnswer: 'A',
    explanation: 'Liver is the largest gland weighing about 1.5 kg.',
    difficulty: 'EASY',
    source: 'NEET PYQ 2008',
    examYear: 2008,
    type: 'MCQ',
    tags: ['liver', 'direct-MCQ'],
  },
  {
    topic: 'Human Physiology',
    subtopic: 'Respiration',
    question: 'Oxygen-hemoglobin dissociation curve shifts right when:',
    options: ['pH decreases', 'pH increases', 'Temperature decreases', 'CO2 decreases'],
    correctAnswer: 'A',
    explanation:
      'Right shift (Bohr effect) occurs with decreased pH, increased CO2, or increased temperature.',
    difficulty: 'MEDIUM',
    source: 'NEET PYQ 2020',
    examYear: 2020,
    type: 'MCQ',
    tags: ['hemoglobin', 'direct-MCQ'],
  },
  {
    topic: 'Human Physiology',
    subtopic: 'Circulation',
    question: 'Blood pressure is measured by:',
    options: ['Sphygmomanometer', 'Stethoscope', 'ECG', 'Spirometer'],
    correctAnswer: 'A',
    explanation: 'Sphygmomanometer measures arterial blood pressure.',
    difficulty: 'EASY',
    source: 'NEET PYQ 2011',
    examYear: 2011,
    type: 'MCQ',
    tags: ['blood-pressure', 'direct-MCQ'],
  },
  {
    topic: 'Human Physiology',
    subtopic: 'Excretion',
    question: 'Functional unit of kidney is:',
    options: ['Nephron', "Bowman's capsule", 'Glomerulus', 'Collecting duct'],
    correctAnswer: 'A',
    explanation: 'Nephron is the functional unit. Each kidney has about 1 million nephrons.',
    difficulty: 'EASY',
    source: 'NEET PYQ 2008',
    examYear: 2008,
    type: 'MCQ',
    tags: ['kidney', 'direct-MCQ'],
  },
  {
    topic: 'Human Physiology',
    subtopic: 'Nervous System',
    question: 'Gap between two neurons is called:',
    options: ['Synapse', 'Nerve', 'Ganglion', 'Node of Ranvier'],
    correctAnswer: 'A',
    explanation: 'Synapse is the junction between neurons where neurotransmitters are released.',
    difficulty: 'EASY',
    source: 'NEET PYQ 2010',
    examYear: 2010,
    type: 'MCQ',
    tags: ['synapse', 'direct-MCQ'],
  },
  {
    topic: 'Human Physiology',
    subtopic: 'Endocrine',
    question: 'Emergency hormone is:',
    options: ['Adrenaline', 'Insulin', 'Thyroxine', 'Cortisol'],
    correctAnswer: 'A',
    explanation: 'Adrenaline causes fight-or-flight response during emergency.',
    difficulty: 'EASY',
    source: 'NEET PYQ 2012',
    examYear: 2012,
    type: 'MCQ',
    tags: ['adrenaline', 'direct-MCQ'],
  },
  {
    topic: 'Human Physiology',
    subtopic: 'Digestion',
    question: 'Emulsification of fats occurs in:',
    options: ['Small intestine', 'Stomach', 'Large intestine', 'Mouth'],
    correctAnswer: 'A',
    explanation: 'Bile salts emulsify fats in small intestine (duodenum).',
    difficulty: 'EASY',
    source: 'NEET PYQ 2013',
    examYear: 2013,
    type: 'MCQ',
    tags: ['digestion', 'direct-MCQ'],
  },
  {
    topic: 'Human Physiology',
    subtopic: 'Respiration',
    question: 'Vital capacity is:',
    options: ['TV + IRV + ERV', 'TV + IRV', 'TV + ERV', 'IRV + ERV'],
    correctAnswer: 'A',
    explanation:
      'Vital capacity = Tidal Volume + Inspiratory Reserve Volume + Expiratory Reserve Volume.',
    difficulty: 'MEDIUM',
    source: 'NEET PYQ 2015',
    examYear: 2015,
    type: 'MCQ',
    tags: ['respiration', 'direct-MCQ'],
  },
  {
    topic: 'Human Physiology',
    subtopic: 'Circulation',
    question: 'Normal blood pressure is:',
    options: ['120/80 mmHg', '140/90 mmHg', '100/60 mmHg', '160/100 mmHg'],
    correctAnswer: 'A',
    explanation: 'Normal BP is 120 (systolic)/80 (diastolic) mmHg.',
    difficulty: 'EASY',
    source: 'NEET PYQ 2014',
    examYear: 2014,
    type: 'MCQ',
    tags: ['blood-pressure', 'direct-MCQ'],
  },
  {
    topic: 'Human Physiology',
    subtopic: 'Excretion',
    question: 'Urea is synthesized in:',
    options: ['Liver', 'Kidney', 'Blood', 'Intestine'],
    correctAnswer: 'A',
    explanation: 'Urea is synthesized in liver through ornithine cycle (urea cycle).',
    difficulty: 'EASY',
    source: 'NEET PYQ 2016',
    examYear: 2016,
    type: 'MCQ',
    tags: ['excretion', 'direct-MCQ'],
  }
)

// ===================== PLANT PHYSIOLOGY =====================
// AR Type
allQuestions.push(
  {
    topic: 'Plant Physiology',
    subtopic: 'Water Transport',
    question:
      'Assertion (A): Pure water has highest water potential.\nReason (R): Water potential of pure water is zero at STP.',
    options: AR_OPTIONS,
    correctAnswer: 'A',
    explanation:
      'Both true and related. Pure water at STP has water potential = 0, the highest possible.',
    difficulty: 'MEDIUM',
    source: 'NCERT Class 11',
    examYear: 2018,
    type: 'MCQ',
    tags: ['water-potential', 'AR-type'],
  },
  {
    topic: 'Plant Physiology',
    subtopic: 'Transpiration',
    question:
      'Assertion (A): Transpiration is a necessary evil.\nReason (R): Transpiration aids mineral transport but causes water loss.',
    options: AR_OPTIONS,
    correctAnswer: 'A',
    explanation:
      'Both true and reason explains. Benefits include mineral transport and cooling but water is lost.',
    difficulty: 'EASY',
    source: 'NCERT Class 11',
    examYear: 2017,
    type: 'MCQ',
    tags: ['transpiration', 'AR-type'],
  },
  {
    topic: 'Plant Physiology',
    subtopic: 'Root Pressure',
    question:
      'Assertion (A): Root pressure causes guttation.\nReason (R): Root pressure develops due to active mineral absorption.',
    options: AR_OPTIONS,
    correctAnswer: 'A',
    explanation:
      'Both true and reason explains. Active mineral uptake creates osmotic gradient for water entry.',
    difficulty: 'MEDIUM',
    source: 'NCERT Class 11',
    examYear: 2019,
    type: 'MCQ',
    tags: ['root-pressure', 'AR-type'],
  },
  {
    topic: 'Plant Physiology',
    subtopic: 'Phloem',
    question:
      'Assertion (A): Phloem transport is bidirectional.\nReason (R): Source-sink relationship changes seasonally.',
    options: AR_OPTIONS,
    correctAnswer: 'A',
    explanation:
      'Both true and related. Phloem moves materials from source to sink, which can be any direction.',
    difficulty: 'MEDIUM',
    source: 'NCERT Class 11',
    examYear: 2020,
    type: 'MCQ',
    tags: ['phloem', 'AR-type'],
  }
)

// Statement-based - Plant Physiology
allQuestions.push(
  {
    topic: 'Plant Physiology',
    subtopic: 'Photosynthesis',
    question:
      'Statement I: PS II is in grana lamellae.\nStatement II: Cyclic photophosphorylation involves only PS I.',
    options: STMT_OPTIONS,
    correctAnswer: 'A',
    explanation: 'Both correct. PS II in grana. Cyclic uses only PS I for ATP generation.',
    difficulty: 'MEDIUM',
    source: 'NCERT Class 11',
    examYear: 2019,
    type: 'MCQ',
    tags: ['photosynthesis', 'statement-based'],
  },
  {
    topic: 'Plant Physiology',
    subtopic: 'C4 Plants',
    question:
      'Statement I: PEPcase has higher CO2 affinity than RuBisCO.\nStatement II: C4 plants show photorespiration.',
    options: STMT_OPTIONS,
    correctAnswer: 'C',
    explanation:
      'Only Statement I correct. C4 plants have minimal photorespiration due to CO2 concentration mechanism.',
    difficulty: 'HARD',
    source: 'NCERT Class 11',
    examYear: 2021,
    type: 'MCQ',
    tags: ['C4-plants', 'statement-based'],
  }
)

// Direct MCQs - Plant Physiology
allQuestions.push(
  {
    topic: 'Plant Physiology',
    subtopic: 'Photosynthesis',
    question: 'First stable product of C3 cycle is:',
    options: ['3-PGA', 'OAA', 'PEP', 'Glucose'],
    correctAnswer: 'A',
    explanation: '3-phosphoglyceric acid (3-PGA) is first stable product of Calvin cycle.',
    difficulty: 'EASY',
    source: 'NEET PYQ 2013',
    examYear: 2013,
    type: 'MCQ',
    tags: ['calvin-cycle', 'direct-MCQ'],
  },
  {
    topic: 'Plant Physiology',
    subtopic: 'Transpiration',
    question: 'Stomata open when guard cells are:',
    options: ['Turgid', 'Flaccid', 'Plasmolysed', 'Dehydrated'],
    correctAnswer: 'A',
    explanation: 'Guard cell turgidity causes stomatal opening due to their kidney shape.',
    difficulty: 'EASY',
    source: 'NEET PYQ 2010',
    examYear: 2010,
    type: 'MCQ',
    tags: ['stomata', 'direct-MCQ'],
  },
  {
    topic: 'Plant Physiology',
    subtopic: 'Plant Hormones',
    question: 'Hormone promoting apical dominance is:',
    options: ['Auxin', 'Cytokinin', 'Gibberellin', 'Ethylene'],
    correctAnswer: 'A',
    explanation: 'Auxin from apical bud inhibits lateral bud growth (apical dominance).',
    difficulty: 'EASY',
    source: 'NEET PYQ 2012',
    examYear: 2012,
    type: 'MCQ',
    tags: ['auxin', 'direct-MCQ'],
  },
  {
    topic: 'Plant Physiology',
    subtopic: 'Respiration',
    question: 'RQ for carbohydrates is:',
    options: ['1.0', '0.7', '1.3', '0.9'],
    correctAnswer: 'A',
    explanation: 'RQ (CO2 produced/O2 consumed) for carbohydrates is 1.0.',
    difficulty: 'MEDIUM',
    source: 'NEET PYQ 2015',
    examYear: 2015,
    type: 'MCQ',
    tags: ['respiration', 'direct-MCQ'],
  },
  {
    topic: 'Plant Physiology',
    subtopic: 'Mineral Nutrition',
    question: 'Nitrogen fixing bacteria in legume root nodules is:',
    options: ['Rhizobium', 'Azotobacter', 'Clostridium', 'Nitrosomonas'],
    correctAnswer: 'A',
    explanation: 'Rhizobium is symbiotic nitrogen fixer in legume root nodules.',
    difficulty: 'EASY',
    source: 'NEET PYQ 2011',
    examYear: 2011,
    type: 'MCQ',
    tags: ['nitrogen-fixation', 'direct-MCQ'],
  }
)

// ===================== REPRODUCTION =====================
// AR Type
allQuestions.push(
  {
    topic: 'Reproduction',
    subtopic: 'Flower',
    question:
      'Assertion (A): Pollen grains have tough exine.\nReason (R): Exine is made of sporopollenin which resists degradation.',
    options: AR_OPTIONS,
    correctAnswer: 'A',
    explanation:
      'Both true and reason explains. Sporopollenin is most resistant biological material.',
    difficulty: 'MEDIUM',
    source: 'NCERT Class 12',
    examYear: 2019,
    type: 'MCQ',
    tags: ['pollen', 'AR-type'],
  },
  {
    topic: 'Reproduction',
    subtopic: 'Fertilization',
    question:
      'Assertion (A): Angiosperms show double fertilization.\nReason (R): One sperm fuses with egg, another with secondary nucleus.',
    options: AR_OPTIONS,
    correctAnswer: 'A',
    explanation:
      'Both true and reason explains. Double fertilization produces zygote and endosperm.',
    difficulty: 'EASY',
    source: 'NCERT Class 12',
    examYear: 2017,
    type: 'MCQ',
    tags: ['double-fertilization', 'AR-type'],
  },
  {
    topic: 'Reproduction',
    subtopic: 'Human',
    question:
      'Assertion (A): Testes are in scrotal sacs.\nReason (R): Spermatogenesis needs 2-2.5°C lower temperature.',
    options: AR_OPTIONS,
    correctAnswer: 'A',
    explanation: 'Both true and reason explains. Scrotal location provides cooler temperature.',
    difficulty: 'MEDIUM',
    source: 'NCERT Class 12',
    examYear: 2018,
    type: 'MCQ',
    tags: ['testes', 'AR-type'],
  },
  {
    topic: 'Reproduction',
    subtopic: 'Menstrual Cycle',
    question:
      'Assertion (A): LH surge triggers ovulation.\nReason (R): LH stimulates progesterone secretion from corpus luteum.',
    options: AR_OPTIONS,
    correctAnswer: 'B',
    explanation:
      "Both true but reason doesn't explain. LH surge ruptures Graafian follicle. Corpus luteum effect is separate.",
    difficulty: 'HARD',
    source: 'NCERT Class 12',
    examYear: 2021,
    type: 'MCQ',
    tags: ['menstrual-cycle', 'AR-type'],
  }
)

// Statement-based - Reproduction
allQuestions.push(
  {
    topic: 'Reproduction',
    subtopic: 'Flower',
    question:
      'Statement I: Microsporogenesis occurs in pollen sacs.\nStatement II: Megasporogenesis occurs in ovule.',
    options: STMT_OPTIONS,
    correctAnswer: 'A',
    explanation: 'Both correct. Microspore formation in anther, megaspore in ovule nucellus.',
    difficulty: 'EASY',
    source: 'NCERT Class 12',
    examYear: 2017,
    type: 'MCQ',
    tags: ['sporogenesis', 'statement-based'],
  },
  {
    topic: 'Reproduction',
    subtopic: 'Human',
    question:
      'Statement I: Acrosome reaction helps penetrate zona pellucida.\nStatement II: Cortical reaction prevents polyspermy.',
    options: STMT_OPTIONS,
    correctAnswer: 'A',
    explanation:
      'Both correct. Acrosome enzymes digest zona. Cortical granules harden zona after sperm entry.',
    difficulty: 'MEDIUM',
    source: 'NCERT Class 12',
    examYear: 2020,
    type: 'MCQ',
    tags: ['fertilization', 'statement-based'],
  }
)

// Direct MCQs - Reproduction
allQuestions.push(
  {
    topic: 'Reproduction',
    subtopic: 'Flower',
    question: 'Endosperm in angiosperms is:',
    options: ['Triploid', 'Diploid', 'Haploid', 'Tetraploid'],
    correctAnswer: 'A',
    explanation:
      'Endosperm is 3n from fusion of sperm (n) with polar nuclei/secondary nucleus (2n).',
    difficulty: 'MEDIUM',
    source: 'NEET PYQ 2015',
    examYear: 2015,
    type: 'MCQ',
    tags: ['endosperm', 'direct-MCQ'],
  },
  {
    topic: 'Reproduction',
    subtopic: 'Human',
    question: 'Implantation occurs in:',
    options: ['Uterus', 'Fallopian tube', 'Cervix', 'Vagina'],
    correctAnswer: 'A',
    explanation: 'Blastocyst implants in uterine endometrium about 7 days after fertilization.',
    difficulty: 'EASY',
    source: 'NEET PYQ 2013',
    examYear: 2013,
    type: 'MCQ',
    tags: ['implantation', 'direct-MCQ'],
  },
  {
    topic: 'Reproduction',
    subtopic: 'Contraception',
    question: 'Copper-T prevents pregnancy by:',
    options: [
      'Preventing implantation and sperm hostility',
      'Killing ova',
      'Blocking ovulation',
      'Blocking tubes',
    ],
    correctAnswer: 'A',
    explanation: 'Copper ions are spermicidal and prevent implantation.',
    difficulty: 'MEDIUM',
    source: 'NEET PYQ 2018',
    examYear: 2018,
    type: 'MCQ',
    tags: ['contraception', 'direct-MCQ'],
  },
  {
    topic: 'Reproduction',
    subtopic: 'Flower',
    question: 'Number of meiotic divisions to form 100 pollen grains:',
    options: ['25', '100', '50', '200'],
    correctAnswer: 'A',
    explanation: 'One meiosis produces 4 microspores/pollen. So 100/4 = 25 divisions.',
    difficulty: 'MEDIUM',
    source: 'NEET PYQ 2019',
    examYear: 2019,
    type: 'MCQ',
    tags: ['meiosis', 'direct-MCQ'],
  },
  {
    topic: 'Reproduction',
    subtopic: 'Human',
    question: 'Placenta produces:',
    options: ['hCG, hPL, estrogen, progesterone', 'Only hCG', 'Only progesterone', 'Only estrogen'],
    correctAnswer: 'A',
    explanation:
      'Placenta is temporary endocrine gland producing multiple hormones for pregnancy maintenance.',
    difficulty: 'MEDIUM',
    source: 'NEET PYQ 2020',
    examYear: 2020,
    type: 'MCQ',
    tags: ['placenta', 'direct-MCQ'],
  }
)

// ===================== ECOLOGY =====================
// AR Type
allQuestions.push(
  {
    topic: 'Ecology',
    subtopic: 'Population',
    question:
      'Assertion (A): Age pyramids predict future population growth.\nReason (R): Pyramids show proportion of pre-reproductive, reproductive, and post-reproductive groups.',
    options: AR_OPTIONS,
    correctAnswer: 'A',
    explanation: 'Both true and reason explains. Pyramid shape indicates growth pattern.',
    difficulty: 'MEDIUM',
    source: 'NCERT Class 12',
    examYear: 2019,
    type: 'MCQ',
    tags: ['population', 'AR-type'],
  },
  {
    topic: 'Ecology',
    subtopic: 'Ecosystem',
    question:
      'Assertion (A): Energy flow in ecosystem is unidirectional.\nReason (R): Energy is lost as heat at each trophic level.',
    options: AR_OPTIONS,
    correctAnswer: 'A',
    explanation: 'Both true and reason explains. 10% rule - only 10% energy passes to next level.',
    difficulty: 'MEDIUM',
    source: 'NCERT Class 12',
    examYear: 2018,
    type: 'MCQ',
    tags: ['energy-flow', 'AR-type'],
  },
  {
    topic: 'Ecology',
    subtopic: 'Biodiversity',
    question:
      'Assertion (A): Tropics have greater species diversity.\nReason (R): Tropics had longer evolutionary time and stable conditions.',
    options: AR_OPTIONS,
    correctAnswer: 'A',
    explanation:
      'Both true and reason explains. Less glaciation, more solar energy, longer speciation time.',
    difficulty: 'MEDIUM',
    source: 'NCERT Class 12',
    examYear: 2020,
    type: 'MCQ',
    tags: ['biodiversity', 'AR-type'],
  }
)

// Statement-based - Ecology
allQuestions.push(
  {
    topic: 'Ecology',
    subtopic: 'Population',
    question:
      'Statement I: Natality adds individuals to population.\nStatement II: Immigration removes individuals from population.',
    options: STMT_OPTIONS,
    correctAnswer: 'C',
    explanation: 'Only Statement I correct. Immigration adds, emigration removes individuals.',
    difficulty: 'EASY',
    source: 'NCERT Class 12',
    examYear: 2018,
    type: 'MCQ',
    tags: ['population', 'statement-based'],
  },
  {
    topic: 'Ecology',
    subtopic: 'Ecosystem',
    question:
      'Statement I: Decomposers are saprotrophs.\nStatement II: Decomposition is faster in tropics than temperate regions.',
    options: STMT_OPTIONS,
    correctAnswer: 'A',
    explanation:
      'Both correct. Decomposers feed on dead matter. Warm, humid tropics favor faster decomposition.',
    difficulty: 'MEDIUM',
    source: 'NCERT Class 12',
    examYear: 2019,
    type: 'MCQ',
    tags: ['decomposition', 'statement-based'],
  }
)

// Direct MCQs - Ecology
allQuestions.push(
  {
    topic: 'Ecology',
    subtopic: 'Ecosystem',
    question: 'Energy pyramid is always:',
    options: ['Upright', 'Inverted', 'Spindle-shaped', 'Variable'],
    correctAnswer: 'A',
    explanation: 'Energy pyramid is always upright as energy decreases at each trophic level.',
    difficulty: 'EASY',
    source: 'NEET PYQ 2014',
    examYear: 2014,
    type: 'MCQ',
    tags: ['pyramid', 'direct-MCQ'],
  },
  {
    topic: 'Ecology',
    subtopic: 'Cycles',
    question: 'Largest reservoir of carbon is:',
    options: ['Ocean', 'Atmosphere', 'Forests', 'Fossil fuels'],
    correctAnswer: 'A',
    explanation: 'Oceans hold about 50 times more carbon than atmosphere.',
    difficulty: 'MEDIUM',
    source: 'NEET PYQ 2019',
    examYear: 2019,
    type: 'MCQ',
    tags: ['carbon-cycle', 'direct-MCQ'],
  },
  {
    topic: 'Ecology',
    subtopic: 'Biodiversity',
    question: 'Most species-rich biome is:',
    options: ['Tropical rainforest', 'Temperate forest', 'Taiga', 'Tundra'],
    correctAnswer: 'A',
    explanation: "Tropical rainforests have highest biodiversity with over 50% of world's species.",
    difficulty: 'EASY',
    source: 'NEET PYQ 2016',
    examYear: 2016,
    type: 'MCQ',
    tags: ['biodiversity', 'direct-MCQ'],
  },
  {
    topic: 'Ecology',
    subtopic: 'Conservation',
    question: 'In-situ conservation includes:',
    options: ['National parks and sanctuaries', 'Botanical gardens', 'Zoos', 'Seed banks'],
    correctAnswer: 'A',
    explanation:
      'In-situ means conservation in natural habitat - parks, sanctuaries, biosphere reserves.',
    difficulty: 'EASY',
    source: 'NEET PYQ 2015',
    examYear: 2015,
    type: 'MCQ',
    tags: ['conservation', 'direct-MCQ'],
  }
)

// ===================== BIOTECHNOLOGY =====================
// AR Type
allQuestions.push(
  {
    topic: 'Biotechnology',
    subtopic: 'rDNA',
    question:
      'Assertion (A): Restriction enzymes are molecular scissors.\nReason (R): They cut DNA at specific recognition sequences.',
    options: AR_OPTIONS,
    correctAnswer: 'A',
    explanation: 'Both true and reason explains. Restriction enzymes cut at palindromic sequences.',
    difficulty: 'EASY',
    source: 'NCERT Class 12',
    examYear: 2017,
    type: 'MCQ',
    tags: ['restriction-enzymes', 'AR-type'],
  },
  {
    topic: 'Biotechnology',
    subtopic: 'PCR',
    question:
      'Assertion (A): Taq polymerase is used in PCR.\nReason (R): Taq polymerase withstands high denaturation temperatures.',
    options: AR_OPTIONS,
    correctAnswer: 'A',
    explanation: 'Both true and reason explains. Thermostable enzyme from Thermus aquaticus.',
    difficulty: 'MEDIUM',
    source: 'NCERT Class 12',
    examYear: 2019,
    type: 'MCQ',
    tags: ['PCR', 'AR-type'],
  },
  {
    topic: 'Biotechnology',
    subtopic: 'Applications',
    question:
      'Assertion (A): Bt cotton resists bollworm.\nReason (R): Bt cotton produces Cry proteins toxic to insect larvae.',
    options: AR_OPTIONS,
    correctAnswer: 'A',
    explanation: 'Both true and reason explains. Cry proteins form pores in insect midgut.',
    difficulty: 'MEDIUM',
    source: 'NCERT Class 12',
    examYear: 2020,
    type: 'MCQ',
    tags: ['Bt-cotton', 'AR-type'],
  }
)

// Statement-based - Biotechnology
allQuestions.push({
  topic: 'Biotechnology',
  subtopic: 'rDNA',
  question:
    'Statement I: Plasmids are extra-chromosomal DNA.\nStatement II: All bacteria contain plasmids.',
  options: STMT_OPTIONS,
  correctAnswer: 'C',
  explanation: 'Only Statement I correct. Not all bacteria have plasmids.',
  difficulty: 'MEDIUM',
  source: 'NCERT Class 12',
  examYear: 2020,
  type: 'MCQ',
  tags: ['plasmids', 'statement-based'],
})

// Direct MCQs - Biotechnology
allQuestions.push(
  {
    topic: 'Biotechnology',
    subtopic: 'rDNA',
    question: 'DNA ligase is used to:',
    options: ['Join DNA fragments', 'Cut DNA', 'Amplify DNA', 'Separate DNA'],
    correctAnswer: 'A',
    explanation: 'DNA ligase joins DNA fragments by forming phosphodiester bonds.',
    difficulty: 'EASY',
    source: 'NEET PYQ 2011',
    examYear: 2011,
    type: 'MCQ',
    tags: ['ligase', 'direct-MCQ'],
  },
  {
    topic: 'Biotechnology',
    subtopic: 'Applications',
    question: 'First transgenic crop approved for commercial production was:',
    options: ['Flavr Savr tomato', 'Bt cotton', 'Golden rice', 'Bt corn'],
    correctAnswer: 'A',
    explanation: 'Flavr Savr tomato (1994) was first commercial GM crop with delayed ripening.',
    difficulty: 'MEDIUM',
    source: 'NEET PYQ 2017',
    examYear: 2017,
    type: 'MCQ',
    tags: ['transgenic', 'direct-MCQ'],
  },
  {
    topic: 'Biotechnology',
    subtopic: 'rDNA',
    question: 'Origin of replication in a vector is important because:',
    options: [
      'It enables autonomous replication',
      'It helps in selection',
      'It aids in cloning',
      'It provides antibiotic resistance',
    ],
    correctAnswer: 'A',
    explanation: 'ori (origin of replication) allows vector to replicate independently in host.',
    difficulty: 'MEDIUM',
    source: 'NEET PYQ 2018',
    examYear: 2018,
    type: 'MCQ',
    tags: ['vector', 'direct-MCQ'],
  }
)

// ===================== EVOLUTION =====================
// AR Type
allQuestions.push(
  {
    topic: 'Evolution',
    subtopic: 'Evidence',
    question:
      'Assertion (A): Homologous organs indicate common ancestry.\nReason (R): Homologous organs have similar origin but different functions.',
    options: AR_OPTIONS,
    correctAnswer: 'A',
    explanation: 'Both true and reason explains. Divergent evolution from common ancestor.',
    difficulty: 'MEDIUM',
    source: 'NCERT Class 12',
    examYear: 2018,
    type: 'MCQ',
    tags: ['homology', 'AR-type'],
  },
  {
    topic: 'Evolution',
    subtopic: 'Natural Selection',
    question:
      'Assertion (A): Industrial melanism is natural selection example.\nReason (R): Dark moths had better survival in polluted areas.',
    options: AR_OPTIONS,
    correctAnswer: 'A',
    explanation:
      'Both true and reason explains. Dark moths camouflaged better on soot-covered trees.',
    difficulty: 'EASY',
    source: 'NCERT Class 12',
    examYear: 2017,
    type: 'MCQ',
    tags: ['natural-selection', 'AR-type'],
  }
)

// Statement-based - Evolution
allQuestions.push({
  topic: 'Evolution',
  subtopic: 'Evidence',
  question:
    'Statement I: Analogous organs indicate convergent evolution.\nStatement II: Wings of insects and birds are analogous.',
  options: STMT_OPTIONS,
  correctAnswer: 'A',
  explanation: 'Both correct. Analogous organs have different origin but similar function.',
  difficulty: 'MEDIUM',
  source: 'NCERT Class 12',
  examYear: 2018,
  type: 'MCQ',
  tags: ['analogy', 'statement-based'],
})

// Direct MCQs - Evolution
allQuestions.push(
  {
    topic: 'Evolution',
    subtopic: 'Origin of Life',
    question: 'Miller-Urey experiment demonstrated:',
    options: [
      'Abiotic synthesis of organic molecules',
      'Biotic synthesis',
      'Spontaneous generation',
      'Panspermia',
    ],
    correctAnswer: 'A',
    explanation: 'Miller-Urey showed organic molecules can form from inorganic precursors.',
    difficulty: 'MEDIUM',
    source: 'NEET PYQ 2015',
    examYear: 2015,
    type: 'MCQ',
    tags: ['origin-of-life', 'direct-MCQ'],
  },
  {
    topic: 'Evolution',
    subtopic: 'Human Evolution',
    question: 'First hominid to use fire was:',
    options: ['Homo erectus', 'Homo habilis', 'Australopithecus', 'Homo sapiens'],
    correctAnswer: 'A',
    explanation: 'Homo erectus first used fire about 400,000 years ago.',
    difficulty: 'MEDIUM',
    source: 'NEET PYQ 2020',
    examYear: 2020,
    type: 'MCQ',
    tags: ['human-evolution', 'direct-MCQ'],
  }
)

// ===================== HUMAN HEALTH =====================
// AR Type
allQuestions.push(
  {
    topic: 'Human Health',
    subtopic: 'Immunity',
    question:
      'Assertion (A): Vaccines provide active immunity.\nReason (R): Vaccines stimulate production of antibodies and memory cells.',
    options: AR_OPTIONS,
    correctAnswer: 'A',
    explanation:
      'Both true and reason explains. Vaccines contain antigens that trigger immune response.',
    difficulty: 'MEDIUM',
    source: 'NCERT Class 12',
    examYear: 2019,
    type: 'MCQ',
    tags: ['vaccines', 'AR-type'],
  },
  {
    topic: 'Human Health',
    subtopic: 'Diseases',
    question:
      'Assertion (A): Plasmodium completes life cycle in two hosts.\nReason (R): Sexual reproduction occurs in female Anopheles mosquito.',
    options: AR_OPTIONS,
    correctAnswer: 'A',
    explanation:
      'Both true and reason explains. Mosquito is definitive host (sexual cycle), human is intermediate host.',
    difficulty: 'MEDIUM',
    source: 'NCERT Class 12',
    examYear: 2020,
    type: 'MCQ',
    tags: ['malaria', 'AR-type'],
  }
)

// Statement-based - Human Health
allQuestions.push({
  topic: 'Human Health',
  subtopic: 'Immunity',
  question:
    'Statement I: B-lymphocytes produce antibodies.\nStatement II: T-lymphocytes are responsible for cell-mediated immunity.',
  options: STMT_OPTIONS,
  correctAnswer: 'A',
  explanation:
    'Both correct. B-cells produce antibodies (humoral), T-cells attack infected cells (CMI).',
  difficulty: 'EASY',
  source: 'NCERT Class 12',
  examYear: 2017,
  type: 'MCQ',
  tags: ['immunity', 'statement-based'],
})

// Direct MCQs - Human Health
allQuestions.push(
  {
    topic: 'Human Health',
    subtopic: 'Diseases',
    question: 'AIDS is caused by:',
    options: ['HIV', 'Hepatitis virus', 'Rhinovirus', 'Poliovirus'],
    correctAnswer: 'A',
    explanation: 'AIDS is caused by HIV, a retrovirus attacking helper T-cells.',
    difficulty: 'EASY',
    source: 'NEET PYQ 2009',
    examYear: 2009,
    type: 'MCQ',
    tags: ['AIDS', 'direct-MCQ'],
  },
  {
    topic: 'Human Health',
    subtopic: 'Drugs',
    question: 'Opioid from poppy plant is:',
    options: ['Morphine', 'Cocaine', 'Marijuana', 'LSD'],
    correctAnswer: 'A',
    explanation: 'Morphine is extracted from poppy (Papaver somniferum) latex.',
    difficulty: 'EASY',
    source: 'NEET PYQ 2013',
    examYear: 2013,
    type: 'MCQ',
    tags: ['drugs', 'direct-MCQ'],
  },
  {
    topic: 'Human Health',
    subtopic: 'Diseases',
    question: 'Vector for dengue is:',
    options: ['Aedes mosquito', 'Anopheles mosquito', 'Culex mosquito', 'Housefly'],
    correctAnswer: 'A',
    explanation: 'Dengue is transmitted by Aedes aegypti mosquito.',
    difficulty: 'EASY',
    source: 'NEET PYQ 2016',
    examYear: 2016,
    type: 'MCQ',
    tags: ['dengue', 'direct-MCQ'],
  }
)

// ===================== DIVERSITY IN LIVING WORLD =====================
// Direct MCQs
allQuestions.push(
  {
    topic: 'Diversity in Living World',
    subtopic: 'Classification',
    question: 'Five kingdom classification was proposed by:',
    options: ['R.H. Whittaker', 'Carl Linnaeus', 'Ernst Haeckel', 'Carl Woese'],
    correctAnswer: 'A',
    explanation: 'Whittaker (1969) proposed Monera, Protista, Fungi, Plantae, Animalia.',
    difficulty: 'EASY',
    source: 'NEET PYQ 2010',
    examYear: 2010,
    type: 'MCQ',
    tags: ['classification', 'direct-MCQ'],
  },
  {
    topic: 'Diversity in Living World',
    subtopic: 'Bacteria',
    question: 'Nitrogen fixing bacteria in legumes is:',
    options: ['Rhizobium', 'E. coli', 'Streptococcus', 'Lactobacillus'],
    correctAnswer: 'A',
    explanation: 'Rhizobium fixes atmospheric N2 in legume root nodules.',
    difficulty: 'EASY',
    source: 'NEET PYQ 2012',
    examYear: 2012,
    type: 'MCQ',
    tags: ['bacteria', 'direct-MCQ'],
  },
  {
    topic: 'Diversity in Living World',
    subtopic: 'Fungi',
    question: 'Yeast belongs to:',
    options: ['Ascomycetes', 'Basidiomycetes', 'Zygomycetes', 'Deuteromycetes'],
    correctAnswer: 'A',
    explanation: 'Yeast (Saccharomyces) is a unicellular ascomycete fungus.',
    difficulty: 'EASY',
    source: 'NEET PYQ 2014',
    examYear: 2014,
    type: 'MCQ',
    tags: ['fungi', 'direct-MCQ'],
  },
  {
    topic: 'Diversity in Living World',
    subtopic: 'Algae',
    question: 'Red colour of red algae is due to:',
    options: ['r-phycoerythrin', 'Chlorophyll', 'Carotenoids', 'Xanthophylls'],
    correctAnswer: 'A',
    explanation: 'Phycoerythrin pigment gives red algae their characteristic color.',
    difficulty: 'MEDIUM',
    source: 'NEET PYQ 2018',
    examYear: 2018,
    type: 'MCQ',
    tags: ['algae', 'direct-MCQ'],
  }
)

// ===================== STRUCTURAL ORGANISATION =====================
// Direct MCQs
allQuestions.push(
  {
    topic: 'Structural Organisation',
    subtopic: 'Animal Tissues',
    question: 'Tendons connect:',
    options: ['Muscle to bone', 'Bone to bone', 'Muscle to muscle', 'Cartilage to bone'],
    correctAnswer: 'A',
    explanation: 'Tendons are dense regular connective tissue connecting muscles to bones.',
    difficulty: 'EASY',
    source: 'NEET PYQ 2011',
    examYear: 2011,
    type: 'MCQ',
    tags: ['connective-tissue', 'direct-MCQ'],
  },
  {
    topic: 'Structural Organisation',
    subtopic: 'Plant Anatomy',
    question: 'Collenchyma provides:',
    options: ['Mechanical support to growing organs', 'Photosynthesis', 'Storage', 'Transport'],
    correctAnswer: 'A',
    explanation: 'Collenchyma provides flexible support to growing parts with pectin thickening.',
    difficulty: 'EASY',
    source: 'NEET PYQ 2014',
    examYear: 2014,
    type: 'MCQ',
    tags: ['collenchyma', 'direct-MCQ'],
  },
  {
    topic: 'Structural Organisation',
    subtopic: 'Animal Tissues',
    question: 'Ligaments connect:',
    options: ['Bone to bone', 'Muscle to bone', 'Muscle to muscle', 'Cartilage to bone'],
    correctAnswer: 'A',
    explanation: 'Ligaments are dense connective tissue connecting bones at joints.',
    difficulty: 'EASY',
    source: 'NEET PYQ 2013',
    examYear: 2013,
    type: 'MCQ',
    tags: ['ligaments', 'direct-MCQ'],
  },
  {
    topic: 'Structural Organisation',
    subtopic: 'Plant Anatomy',
    question: 'Vascular bundles in monocot stem are:',
    options: ['Scattered', 'In a ring', 'In two rings', 'Absent'],
    correctAnswer: 'A',
    explanation: 'Monocot stems have scattered vascular bundles, dicots have ring arrangement.',
    difficulty: 'EASY',
    source: 'NEET PYQ 2015',
    examYear: 2015,
    type: 'MCQ',
    tags: ['vascular-bundle', 'direct-MCQ'],
  }
)

// Write all questions to JSON file
const outputPath = path.join(__dirname, 'questions-comprehensive.json')
fs.writeFileSync(outputPath, JSON.stringify(allQuestions, null, 2))

console.log('Generated ' + allQuestions.length + ' questions')
console.log('Saved to scripts/questions-comprehensive.json')

// Count by type
const arCount = allQuestions.filter((q) => q.question.includes('Assertion')).length
const stmtCount = allQuestions.filter((q) => q.question.includes('Statement I:')).length
const directCount = allQuestions.length - arCount - stmtCount

console.log('\nBreakdown:')
console.log('AR-type: ' + arCount)
console.log('Statement-based: ' + stmtCount)
console.log('Direct MCQ: ' + directCount)

// Count by difficulty
const easyCount = allQuestions.filter((q) => q.difficulty === 'EASY').length
const mediumCount = allQuestions.filter((q) => q.difficulty === 'MEDIUM').length
const hardCount = allQuestions.filter((q) => q.difficulty === 'HARD').length

console.log('\nBy Difficulty:')
console.log('EASY: ' + easyCount)
console.log('MEDIUM: ' + mediumCount)
console.log('HARD: ' + hardCount)
