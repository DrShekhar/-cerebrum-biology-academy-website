export interface InternationalCurriculumData {
  name: string
  slug: string
  fullName: string
  studentCount: string
  countries: string[]
  examBoard: string
  syllabusFocus: string[]
  neetAlignment: string
  uniqueFeatures: string[]
  topics: { unit: string; topics: string[] }[]
  metaTitle: string
  metaDescription: string
  heroSubtitle: string
}

export const internationalCurricula: InternationalCurriculumData[] = [
  {
    name: 'A-Level',
    slug: 'a-level',
    fullName: 'Cambridge A-Level Biology',
    studentCount: '3,500+',
    countries: ['UK', 'UAE', 'Singapore', 'Hong Kong', 'Malaysia'],
    examBoard: 'Cambridge Assessment International Education (CAIE)',
    syllabusFocus: [
      'AS Level + A2 Level complete coverage',
      'Cambridge past paper practice (10+ years)',
      'Practical skills and lab report writing',
      'Extended response question techniques',
      'Synoptic assessment preparation',
    ],
    neetAlignment:
      'A-Level Biology covers 60% of NEET syllabus. Additional NCERT modules bridge the gap for Indian medical entrance.',
    uniqueFeatures: [
      'Cambridge examiner insights and marking schemes',
      'AS to A2 progression pathway',
      'Practical endorsement support',
      'Grade boundary analysis and prediction',
      'UK university preparation (UCAS support)',
    ],
    topics: [
      {
        unit: 'AS Level',
        topics: [
          'Cell Structure & Organization',
          'Biological Molecules',
          'Enzymes & Cell Membranes',
          'Cell Division & Genetic Information',
          'Transport in Plants & Animals',
          'Gas Exchange & Infectious Disease',
        ],
      },
      {
        unit: 'A2 Level',
        topics: [
          'Energy & Respiration',
          'Photosynthesis',
          'Homeostasis',
          'Control & Coordination',
          'Inherited Change',
          'Selection & Evolution',
          'Biodiversity & Classification',
          'Genetic Technology',
        ],
      },
    ],
    metaTitle: 'A-Level Biology Online Classes | Cambridge CAIE | Cerebrum Academy',
    metaDescription:
      'Expert A-Level Biology tutoring online. Cambridge CAIE syllabus, past paper practice, practical skills. 3,500+ students. AS & A2 complete coverage.',
    heroSubtitle:
      'Cambridge A-Level Biology mastery with examiner insights. AS to A* journey made simple.',
  },
  {
    name: 'IB',
    slug: 'ib',
    fullName: 'IB Diploma Biology (HL & SL)',
    studentCount: '2,800+',
    countries: ['Worldwide', 'International Schools in India', 'USA', 'Europe', 'Middle East'],
    examBoard: 'International Baccalaureate Organization',
    syllabusFocus: [
      'IB Biology SL + HL complete syllabus',
      'Internal Assessment (IA) guidance',
      'Extended Essay (EE) support for Biology',
      'Data-based questions mastery',
      'Paper 1, 2, and 3 exam strategies',
    ],
    neetAlignment:
      'IB Biology (HL) covers 65% of NEET syllabus. Our NCERT bridge modules help IB students prepare for Indian medical entrance.',
    uniqueFeatures: [
      'IA design, data collection, and analysis support',
      'TOK (Theory of Knowledge) integration',
      'CAS activity ideas for Biology',
      'IB examiner marking insights',
      'University application support (worldwide)',
    ],
    topics: [
      {
        unit: 'SL & HL Core',
        topics: [
          'Cell Biology',
          'Molecular Biology',
          'Genetics',
          'Ecology',
          'Evolution & Biodiversity',
          'Human Physiology',
        ],
      },
      {
        unit: 'HL Additional',
        topics: [
          'Nucleic Acids',
          'Metabolism, Cell Respiration & Photosynthesis',
          'Plant Biology',
          'Genetics & Evolution',
          'Animal Physiology',
        ],
      },
    ],
    metaTitle: 'IB Biology Online Classes | HL & SL | IA Support | Cerebrum Academy',
    metaDescription:
      'Expert IB Biology tutoring online. Complete SL & HL coverage, IA guidance, EE support. 2,800+ IB students. Score 7 in Biology.',
    heroSubtitle:
      'From IA design to Paper 3 mastery. Complete IB Biology support for that perfect 7.',
  },
  {
    name: 'AP',
    slug: 'ap',
    fullName: 'AP Biology (Advanced Placement)',
    studentCount: '1,500+',
    countries: ['USA', 'Canada', 'International Schools'],
    examBoard: 'College Board',
    syllabusFocus: [
      'All 8 AP Biology units covered',
      'Free Response Question (FRQ) practice',
      'Multiple Choice Question strategies',
      'Lab investigation skills',
      'Science Practices integration',
    ],
    neetAlignment:
      'AP Biology covers 55% of NEET syllabus. Strong in evolution and ecology, needs NCERT bridge for human physiology.',
    uniqueFeatures: [
      'College Board-aligned curriculum',
      '13 required lab investigations covered',
      'FRQ rubric analysis and scoring tips',
      'AP score prediction assessments',
      'US college credit preparation',
    ],
    topics: [
      {
        unit: 'Units 1-4',
        topics: [
          'Unit 1: Chemistry of Life',
          'Unit 2: Cell Structure & Function',
          'Unit 3: Cellular Energetics',
          'Unit 4: Cell Communication & Cell Cycle',
        ],
      },
      {
        unit: 'Units 5-8',
        topics: [
          'Unit 5: Heredity',
          'Unit 6: Gene Expression & Regulation',
          'Unit 7: Natural Selection',
          'Unit 8: Ecology',
        ],
      },
    ],
    metaTitle: 'AP Biology Online Classes | College Board | FRQ Practice | Cerebrum Academy',
    metaDescription:
      'Expert AP Biology tutoring online. All 8 units, FRQ mastery, lab investigations. 1,500+ students. Score 5 on AP Biology exam.',
    heroSubtitle:
      'Master AP Biology with College Board-aligned teaching. From Unit 1 to a perfect 5.',
  },
  {
    name: 'IGCSE',
    slug: 'igcse',
    fullName: 'Cambridge IGCSE Biology',
    studentCount: '4,200+',
    countries: ['India', 'UAE', 'UK', 'Singapore', 'Middle East', 'Africa'],
    examBoard: 'Cambridge Assessment International Education (CAIE)',
    syllabusFocus: [
      'Core + Extended curriculum coverage',
      'Alternative to Practical (ATP) preparation',
      'Past paper practice (15+ years)',
      'Diagram drawing and labeling skills',
      'Application-based question techniques',
    ],
    neetAlignment:
      'IGCSE Biology is foundational (Class 9-10 level). Excellent preparation for A-Level or IB, needs significant additions for NEET.',
    uniqueFeatures: [
      'Core and Extended syllabus pathways',
      'ATP exam format mastery',
      'Transition to A-Level preparation',
      'Cambridge checkpoint support',
      'Grade A* focused teaching',
    ],
    topics: [
      {
        unit: 'Core Topics',
        topics: [
          'Characteristics of Living Organisms',
          'Cells',
          'Enzymes',
          'Nutrition',
          'Transportation',
          'Respiration',
          'Excretion',
          'Coordination & Response',
        ],
      },
      {
        unit: 'Extended Topics',
        topics: [
          'Reproduction',
          'Inheritance',
          'Organisms & Environment',
          'Human Influences on Ecosystems',
          'Biotechnology & Genetic Engineering',
        ],
      },
    ],
    metaTitle: 'IGCSE Biology Online Classes | Cambridge Core & Extended | Cerebrum Academy',
    metaDescription:
      'Expert IGCSE Biology tutoring online. Core + Extended syllabus, ATP prep, past papers. 4,200+ students. Achieve Grade A* in Biology.',
    heroSubtitle:
      'Cambridge IGCSE Biology mastery. Core to Extended, ATP to A* - complete coverage.',
  },
]

export function getInternationalBySlug(
  slug: string
): InternationalCurriculumData | undefined {
  return internationalCurricula.find((curriculum) => curriculum.slug === slug)
}

export function getAllInternationalSlugs(): string[] {
  return internationalCurricula.map((curriculum) => curriculum.slug)
}
