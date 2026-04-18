/**
 * IB Biology vs. other curricula — comparison configs powering
 * /ib-biology-vs/[curriculum] dynamic pages.
 *
 * Every config drives the page title, metadata, comparison table,
 * decision framework, and internal cross-links. Add a new curriculum
 * here to ship a new comparison page.
 */

export type CurriculumSlug = 'a-level' | 'ap-biology' | 'igcse' | 'cbse' | 'neet-biology'

export interface ComparisonRow {
  aspect: string
  ib: string
  other: string
}

export interface ComparisonConfig {
  slug: CurriculumSlug
  name: string
  shortName: string
  region: string
  headline: string
  intro: string
  rows: ComparisonRow[]
  decisionFramework: Array<{ forWhom: string; recommendation: 'IB' | 'Other' | 'Either' }>
  faqs: Array<{ question: string; answer: string }>
  crosslinks?: Array<{ title: string; href: string }>
}

const commonCrosslinks: Array<{ title: string; href: string }> = [
  { title: 'IB Biology Hub', href: '/ib-biology' },
  { title: '2025 Syllabus', href: '/ib-biology-2025-syllabus' },
  { title: 'IB Biology HL vs SL', href: '/ib-biology-hl-vs-sl' },
]

export const comparisons: Record<CurriculumSlug, ComparisonConfig> = {
  'a-level': {
    slug: 'a-level',
    name: 'A-Level Biology',
    shortName: 'A-Level',
    region: 'UK, Commonwealth',
    headline: 'IB Biology vs A-Level Biology — Which Is Better for University?',
    intro:
      'IB Biology and A-Level Biology are the two most widely accepted pre-university science qualifications. Both are respected by UK, US, Canadian, Australian, and Singaporean universities. The choice usually comes down to your academic style, the institutions you are applying to, and the broader curriculum framework you prefer.',
    rows: [
      {
        aspect: 'Awarding body',
        ib: 'International Baccalaureate Organization (IBO)',
        other: 'AQA, OCR, Edexcel, CIE (A-Level boards)',
      },
      {
        aspect: 'Duration',
        ib: '2 years (DP1 + DP2)',
        other: '2 years (AS + A2) — some boards offer single-year A-Level',
      },
      {
        aspect: 'Depth of content',
        ib: 'Broad — 4 themes plus IA and EE research',
        other: 'Narrower but deeper — 2 papers, specific content focus per board',
      },
      {
        aspect: 'Teaching hours',
        ib: '150h (SL) or 240h (HL)',
        other: '~360 hours across AS + A2',
      },
      {
        aspect: 'Internal assessment',
        ib: 'Mandatory IA (20% of Biology grade)',
        other: 'Practical Endorsement (pass/fail, not graded) on most boards',
      },
      {
        aspect: 'Extended essay',
        ib: 'Required Diploma component (up to 3 bonus points)',
        other: 'No equivalent — EPQ is separate, optional, not subject-specific',
      },
      {
        aspect: 'Grading',
        ib: '1–7 (7 = highest)',
        other: 'A*–E (A* = highest)',
      },
      {
        aspect: 'Top-tier equivalence',
        ib: 'IB Biology HL 7 ≈ A-Level Biology A*',
        other: 'A-Level Biology A* ≈ IB Biology HL 7',
      },
      {
        aspect: 'University recognition',
        ib: 'Universally accepted; strong for US liberal arts and European universities',
        other: 'Gold standard for UK and Commonwealth admissions',
      },
      {
        aspect: 'Breadth requirement',
        ib: '6 subjects including 3 HL — must take a humanity, a language, and TOK',
        other: 'Usually 3 A-Levels — no breadth requirement',
      },
    ],
    decisionFramework: [
      {
        forWhom: 'Student planning to study in the UK only',
        recommendation: 'Other',
      },
      {
        forWhom: 'Student applying to US undergraduate programmes',
        recommendation: 'IB',
      },
      {
        forWhom: 'Student who wants breadth across 6 subjects',
        recommendation: 'IB',
      },
      {
        forWhom: 'Student who wants to specialise deeply in 3 sciences',
        recommendation: 'Other',
      },
      {
        forWhom: 'Student aiming for medicine at UK universities',
        recommendation: 'Either',
      },
    ],
    faqs: [
      {
        question: 'Is IB Biology harder than A-Level Biology?',
        answer:
          'Different kinds of difficulty. IB Biology is broader — you must engage with research skills (IA, EE) alongside content. A-Level Biology is deeper — more content to memorise per topic but a narrower syllabus. Students who prefer research and writing find IB easier; students who prefer structured problem-solving find A-Level easier.',
      },
      {
        question: 'Do UK universities accept IB Biology for medicine?',
        answer:
          "Yes. All UK medical schools accept IB Biology HL (usually requiring a 6 or 7) as the biology qualification for entry. Some schools specify Biology HL alongside Chemistry HL. Confirm the exact numeric requirement on each medical school's admissions page.",
      },
      {
        question: 'Which scores higher for US college admissions?',
        answer:
          'Top US universities recognise both, but full-IB Diploma candidates tend to be weighted favourably because the Diploma demonstrates breadth and research skills. A-Level students who also complete an EPQ close some of that gap.',
      },
    ],
  },
  'ap-biology': {
    slug: 'ap-biology',
    name: 'AP Biology',
    shortName: 'AP Biology',
    region: 'USA, International Schools',
    headline: 'IB Biology vs AP Biology — Which Should a US-Bound Student Take?',
    intro:
      'IB Biology and AP Biology are the two most common advanced biology courses for college-bound high school students in the US. AP is modular (take one or many); IB Biology is part of the full IB Diploma programme. For US college admissions, both offer college-credit potential.',
    rows: [
      {
        aspect: 'Awarding body',
        ib: 'International Baccalaureate Organization (IBO)',
        other: 'College Board (Advanced Placement)',
      },
      {
        aspect: 'Course duration',
        ib: '2 years (DP1 + DP2)',
        other: '1 academic year',
      },
      {
        aspect: 'Exam structure',
        ib: 'Paper 1A (MCQ) + Paper 1B (data) + Paper 2 (extended response)',
        other: 'Single 3-hour exam (MCQ + free response)',
      },
      {
        aspect: 'Grading',
        ib: '1–7',
        other: '1–5 (5 = highest)',
      },
      {
        aspect: 'College credit',
        ib: 'HL 5+ often earns 6–8 US college credits',
        other: 'AP score 4–5 typically earns 4–8 US college credits',
      },
      {
        aspect: 'Research project',
        ib: 'IA + optional EE (substantial research)',
        other: 'No research requirement; lab activities only',
      },
      {
        aspect: 'Breadth vs depth',
        ib: 'More breadth, integrated across 4 themes',
        other: 'Moderate depth, focused on 8 big ideas',
      },
      {
        aspect: 'Programme structure',
        ib: 'One of 6 subjects in the IB Diploma',
        other: 'Standalone — take 1 AP or 14 APs',
      },
    ],
    decisionFramework: [
      {
        forWhom: 'Student at a US high school pursuing individual AP courses',
        recommendation: 'Other',
      },
      { forWhom: 'Student at an IB World School', recommendation: 'IB' },
      {
        forWhom: 'Student applying to Ivy-League or top-25 US universities',
        recommendation: 'Either',
      },
      {
        forWhom: 'Student targeting pre-med with minimal research experience',
        recommendation: 'Other',
      },
      { forWhom: 'Student who wants research + subject breadth', recommendation: 'IB' },
    ],
    faqs: [
      {
        question: 'Can I take both IB Biology and AP Biology?',
        answer:
          'It is possible but rarely recommended. Most IB World Schools discourage adding APs to the Diploma because the workload becomes excessive. Some schools allow IB DP plus 1–2 extra APs for college application strategy.',
      },
      {
        question: 'Do US colleges give credit for IB Biology HL?',
        answer:
          "Most colleges accept IB Biology HL 5+ for elective credit; some award credit for 6+. Check each college's AP/IB credit page. Ivy-League schools often grant credit only for 6 or 7 scores.",
      },
      {
        question: 'Which is better for pre-med?',
        answer:
          'Both are accepted. AP Biology is more focused on the content directly tested in the MCAT. IB Biology is broader and includes research skills that are useful for pre-med research opportunities. Neither is a gatekeeper.',
      },
    ],
  },
  igcse: {
    slug: 'igcse',
    name: 'IGCSE Biology',
    shortName: 'IGCSE',
    region: 'International (pre-IB, pre-A-Level)',
    headline: 'IB Biology vs IGCSE Biology — The Progression Path',
    intro:
      'IGCSE Biology and IB Biology are not usually alternatives — they are typically sequential. IGCSE Biology is the standard pre-16 international qualification (typically Years 10–11 / Grades 9–10). IB Biology comes after, in the final 2 years of high school. The key question: does IGCSE Biology prepare you adequately for IB Biology HL?',
    rows: [
      {
        aspect: 'Awarding body',
        ib: 'International Baccalaureate Organization (IBO)',
        other: 'Cambridge Assessment International Education (CAIE) or Pearson Edexcel',
      },
      {
        aspect: 'Typical year',
        ib: 'Years 12–13 / Grades 11–12',
        other: 'Years 10–11 / Grades 9–10',
      },
      {
        aspect: 'Duration',
        ib: '2 years',
        other: '2 years',
      },
      {
        aspect: 'Purpose',
        ib: 'Pre-university preparation',
        other: 'Pre-IB / pre-A-Level foundation',
      },
      {
        aspect: 'Grading',
        ib: '1–7',
        other: 'A*–G (CAIE 9–1 for newer entries)',
      },
      {
        aspect: 'Internal assessment',
        ib: 'IA worth 20% of grade',
        other: 'Optional practical papers or alternative-to-practical',
      },
      {
        aspect: 'University value',
        ib: 'Direct pre-university qualification',
        other: 'Secondary qualification — does not directly earn university credit',
      },
      {
        aspect: 'Topic overlap',
        ib: 'Cell biology, genetics, ecology, human physiology all appear deeper',
        other: 'Same topics at introductory depth',
      },
    ],
    decisionFramework: [
      { forWhom: 'Student currently choosing pre-16 course', recommendation: 'Other' },
      { forWhom: 'Student completing IGCSE and choosing post-16', recommendation: 'IB' },
      { forWhom: 'Student who found IGCSE Biology too easy', recommendation: 'IB' },
      { forWhom: 'Student who struggled with IGCSE Biology', recommendation: 'Either' },
    ],
    faqs: [
      {
        question: 'Does IGCSE Biology prepare me for IB Biology HL?',
        answer:
          'Mostly yes — IGCSE covers the core topics (cell biology, genetics, ecology, human physiology) that reappear in IB Biology. Gaps to fill: biochemistry, statistical analysis of data, and depth of AHL content (enzyme kinetics, chemiosmosis). Our IB Biology bridge programme covers those gaps.',
      },
      {
        question: 'Can I skip IGCSE Biology and go straight to IB Biology?',
        answer:
          'You can if your pre-IB school provides equivalent preparation, but students without any Grade 9–10 biology typically struggle in DP1. At minimum, you need comfortable literacy with cell biology, genetics vocabulary, and the scientific method.',
      },
      {
        question: 'Is an IGCSE A* the same as IB Biology 7?',
        answer:
          'No — different scales and different depth. IGCSE A* shows you mastered the pre-16 curriculum; IB Biology 7 demonstrates university-ready depth including independent research. A student typically needs IGCSE A*-level rigour plus 2 years of IB depth to score a 7.',
      },
    ],
  },
  cbse: {
    slug: 'cbse',
    name: 'CBSE Biology',
    shortName: 'CBSE',
    region: 'India',
    headline: 'IB Biology vs CBSE Biology — Which for the Indian Student?',
    intro:
      'For an Indian student choosing between the IB Diploma and the CBSE Class 11–12 programme, Biology is often a deciding subject. Both are respected, but they differ in teaching style, university pathways, and how well they prepare you for NEET (Indian medical entrance exam).',
    rows: [
      {
        aspect: 'Awarding body',
        ib: 'IBO (international)',
        other: 'Central Board of Secondary Education (India)',
      },
      {
        aspect: 'Teaching philosophy',
        ib: 'Concept-driven, research-oriented (IA + EE)',
        other: 'Content-driven, exam-focused',
      },
      {
        aspect: 'Class-12 board equivalent',
        ib: 'Full 2-year IB Diploma',
        other: 'CBSE Class 11–12 Biology',
      },
      {
        aspect: 'NEET readiness',
        ib: '60% syllabus overlap, but NCERT-level depth on human physiology needs extra coverage',
        other: 'Directly aligned to NEET (same NCERT textbooks are basis)',
      },
      {
        aspect: 'International university preference',
        ib: 'Preferred for US, UK, Canada, Singapore undergraduate applications',
        other: 'Accepted but often requires additional tests (SAT, SAT II)',
      },
      {
        aspect: 'Grading',
        ib: '1–7',
        other: 'Percentage (0–100)',
      },
      {
        aspect: 'Coursework component',
        ib: 'IA 20% + EE bonus',
        other: 'Practical 30% + theory 70%',
      },
      {
        aspect: 'Typical exam style',
        ib: 'MCQ + data + extended response',
        other: 'Long-form descriptive answers',
      },
    ],
    decisionFramework: [
      { forWhom: 'Student targeting only Indian medical colleges (NEET)', recommendation: 'Other' },
      { forWhom: 'Student targeting US/UK/Canada undergrad', recommendation: 'IB' },
      { forWhom: 'Student wanting both NEET + international options', recommendation: 'Either' },
      { forWhom: 'Student who prefers exam-focused, structured learning', recommendation: 'Other' },
      { forWhom: 'Student who prefers research + concept learning', recommendation: 'IB' },
    ],
    faqs: [
      {
        question: 'Can an IB Biology student also appear for NEET?',
        answer:
          'Yes. IB Biology shares about 60% of its content with the NEET syllabus, so IB students can sit NEET with targeted supplementary coaching. Cerebrum runs a dedicated IB-to-NEET bridge programme to fill the gap.',
      },
      {
        question: 'Is IB Biology harder than CBSE Biology?',
        answer:
          'Different. IB is harder in terms of skills (research, data analysis, essay writing). CBSE is harder in terms of content volume to memorise. An IB Biology 7 and a CBSE 95% both represent genuine Biology mastery.',
      },
      {
        question: 'Do Indian universities accept IB Biology?',
        answer:
          'Yes. Indian universities recognise the full IB Diploma. Some may ask for AIU equivalence certification. For medical college admissions, NEET is still the gateway — IB scores alone are not accepted for medical colleges in India.',
      },
    ],
  },
  'neet-biology': {
    slug: 'neet-biology',
    name: 'NEET Biology',
    shortName: 'NEET',
    region: 'India',
    headline: 'IB Biology vs NEET Biology — Transition, Overlap, Gap',
    intro:
      'IB Biology and NEET Biology are not academic alternatives — they are different endpoints. IB Biology is a school qualification; NEET Biology is a medical-entrance exam (360 marks out of 720 in NEET). If you are an IB student targeting Indian medical college, you need both.',
    rows: [
      {
        aspect: 'What it is',
        ib: 'School qualification (HL or SL)',
        other: 'Indian medical entrance test',
      },
      {
        aspect: 'Used for',
        ib: 'University admission globally',
        other: 'MBBS, BDS, AYUSH admission in India',
      },
      {
        aspect: 'Exam body',
        ib: 'IBO',
        other: 'National Testing Agency (NTA), India',
      },
      {
        aspect: 'Exam format',
        ib: 'Paper 1A + 1B + Paper 2 (MCQ, data, extended response)',
        other: 'Single 3-hour MCQ paper (with negative marking)',
      },
      {
        aspect: 'Syllabus overlap with IB',
        ib: '—',
        other: '~60% overlap with IB Biology HL',
      },
      {
        aspect: 'Content depth',
        ib: 'Breadth + research skills',
        other: 'NCERT-level memorisation of Indian medical curriculum',
      },
      {
        aspect: 'Scoring',
        ib: '1–7',
        other: '0–360 for Biology (720 total)',
      },
      {
        aspect: 'Negative marking',
        ib: 'None',
        other: 'Yes (-1 per wrong answer)',
      },
    ],
    decisionFramework: [
      { forWhom: 'Full IB student targeting Indian medical college', recommendation: 'Either' },
      { forWhom: 'Student choosing IB OR NEET as primary endpoint', recommendation: 'IB' },
      { forWhom: 'Student targeting AIIMS / top Indian medical college', recommendation: 'Other' },
    ],
    faqs: [
      {
        question: 'Can I prepare for NEET while doing IB Biology?',
        answer:
          'Yes, but you need structured bridge coaching. The IB syllabus covers about 60% of NEET content but misses NCERT-specific content on human physiology, plant physiology, and Indian biodiversity. Typical bridge programmes run 6–12 months in parallel with IB Biology HL.',
      },
      {
        question: 'Which is harder — IB Biology HL or NEET Biology?',
        answer:
          'Different difficulties. IB Biology HL requires research skills and extended writing; NEET Biology requires speed, accuracy, and memorisation under negative marking pressure. Students who scored 7 in IB Biology HL still need 6–12 months of NEET-specific practice to score 330+ in NEET.',
      },
      {
        question: 'Does Cerebrum offer IB-to-NEET bridge coaching?',
        answer:
          'Yes. Our IB to NEET Biology Preparation programme is designed exactly for IB students targeting Indian medical colleges. See /ib-to-neet-biology-preparation for details.',
      },
    ],
    crosslinks: [{ title: 'IB to NEET Biology Bridge', href: '/ib-to-neet-biology-preparation' }],
  },
}

export function comparisonSlugs(): CurriculumSlug[] {
  return Object.keys(comparisons) as CurriculumSlug[]
}

export function getComparison(slug: string): ComparisonConfig | null {
  if (!Object.prototype.hasOwnProperty.call(comparisons, slug)) return null
  return comparisons[slug as CurriculumSlug]
}

export function allCrosslinksFor(config: ComparisonConfig) {
  return [...(config.crosslinks ?? []), ...commonCrosslinks]
}
