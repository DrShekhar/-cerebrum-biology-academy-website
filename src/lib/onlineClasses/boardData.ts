export interface BoardData {
  name: string
  slug: string
  fullName: string
  studentCount: string
  classLevels: string[]
  syllabusFocus: string[]
  neetAlignment: string
  uniqueFeatures: string[]
  chapters: { class: string; topics: string[] }[]
  metaTitle: string
  metaDescription: string
  heroSubtitle: string
}

export const boards: BoardData[] = [
  {
    name: 'CBSE',
    slug: 'cbse',
    fullName: 'Central Board of Secondary Education',
    studentCount: '45,000+',
    classLevels: ['Class 9', 'Class 10', 'Class 11', 'Class 12'],
    syllabusFocus: [
      'NCERT textbook-based teaching (100% NEET syllabus)',
      'Chapter-wise NEET weightage analysis',
      'NCERT exemplar problem solving',
      'Previous year CBSE board questions',
      'NEET PYQ integration with each chapter',
    ],
    neetAlignment:
      '100% NEET syllabus is from NCERT. CBSE students have a natural advantage - we maximize it.',
    uniqueFeatures: [
      'NCERT line-by-line analysis',
      'Board + NEET integrated preparation',
      'Chapter importance for NEET ranking',
      'NCERT diagram mastery sessions',
      'Assertion-Reasoning question practice',
    ],
    chapters: [
      {
        class: 'Class 11',
        topics: [
          'The Living World (4% NEET)',
          'Biological Classification (6% NEET)',
          'Plant Kingdom (5% NEET)',
          'Animal Kingdom (6% NEET)',
          'Morphology of Flowering Plants (3% NEET)',
          'Anatomy of Flowering Plants (4% NEET)',
          'Structural Organisation in Animals (3% NEET)',
          'Cell: Unit of Life (8% NEET)',
          'Biomolecules (5% NEET)',
          'Cell Cycle and Division (4% NEET)',
          'Photosynthesis (6% NEET)',
          'Respiration in Plants (4% NEET)',
          'Plant Growth (3% NEET)',
          'Digestion and Absorption (4% NEET)',
          'Breathing and Exchange of Gases (4% NEET)',
          'Body Fluids and Circulation (5% NEET)',
          'Excretory Products (4% NEET)',
          'Locomotion and Movement (4% NEET)',
          'Neural Control (6% NEET)',
          'Chemical Coordination (4% NEET)',
        ],
      },
      {
        class: 'Class 12',
        topics: [
          'Reproduction in Organisms (2% NEET)',
          'Sexual Reproduction in Plants (5% NEET)',
          'Human Reproduction (6% NEET)',
          'Reproductive Health (2% NEET)',
          'Principles of Inheritance (8% NEET)',
          'Molecular Basis of Inheritance (8% NEET)',
          'Evolution (4% NEET)',
          'Human Health and Disease (5% NEET)',
          'Microbes in Human Welfare (3% NEET)',
          'Biotechnology Principles (4% NEET)',
          'Biotechnology Applications (3% NEET)',
          'Organisms and Populations (4% NEET)',
          'Ecosystem (4% NEET)',
          'Biodiversity (3% NEET)',
        ],
      },
    ],
    metaTitle: 'Online Biology Classes for CBSE Students | NEET Preparation | Cerebrum Academy',
    metaDescription:
      'Best online biology classes for CBSE students. NCERT-focused NEET preparation. 45,000+ CBSE students. Board + NEET integrated coaching. Start free trial!',
    heroSubtitle:
      "CBSE + NEET = Perfect Combo. We teach NCERT line-by-line because that's what NEET asks.",
  },
  {
    name: 'ICSE',
    slug: 'icse',
    fullName: 'Indian Certificate of Secondary Education',
    studentCount: '12,000+',
    classLevels: ['Class 9', 'Class 10', 'ISC Class 11', 'ISC Class 12'],
    syllabusFocus: [
      'ICSE/ISC to NCERT syllabus mapping',
      'Gap analysis for NEET-specific topics',
      'Concise Biology + NCERT integration',
      'Additional NCERT chapter coverage',
      'NEET-style MCQ practice from day one',
    ],
    neetAlignment:
      'ICSE syllabus covers 70% of NEET. We bridge the 30% gap with targeted NCERT modules.',
    uniqueFeatures: [
      'ICSE → NCERT bridge modules',
      'Selina Publishers to NCERT mapping',
      'Extra NCERT chapters not in ISC',
      'Different terminology clarification',
      'NEET-specific diagram training',
    ],
    chapters: [
      {
        class: 'Class 11 (ISC + NCERT Gap)',
        topics: [
          'Biological Classification (extra depth)',
          'Plant Anatomy (NCERT specific)',
          'Biomolecules (NCERT approach)',
          'Plant Physiology (additional topics)',
          'Human Physiology (NCERT terminology)',
          'Cell Biology (NEET focus areas)',
        ],
      },
      {
        class: 'Class 12 (ISC + NCERT Gap)',
        topics: [
          'Genetics (Mendelian to Molecular)',
          'Evolution (NCERT specific content)',
          'Ecology (additional NEET topics)',
          'Biotechnology (NCERT approach)',
          'Reproduction (terminology differences)',
          'Human Health (NCERT specific)',
        ],
      },
    ],
    metaTitle: 'Online Biology Classes for ICSE/ISC Students | NEET Prep | Cerebrum Academy',
    metaDescription:
      'Best online biology classes for ICSE & ISC students. NCERT bridge modules for NEET. 12,000+ ICSE students. Expert ICSE-to-NEET preparation.',
    heroSubtitle:
      'ICSE students need NCERT for NEET. We bridge the gap with specialized ICSE → NCERT modules.',
  },
]

export function getBoardBySlug(slug: string): BoardData | undefined {
  return boards.find((board) => board.slug === slug)
}

export function getAllBoardSlugs(): string[] {
  return boards.map((board) => board.slug)
}
