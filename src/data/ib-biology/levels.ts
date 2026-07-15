/**
 * IB Biology HL vs SL level data — drives the dedicated /ib-biology-hl-tutor and
 * /ib-biology-sl-tutor landing pages. Content reflects the CURRENT IB Biology
 * syllabus (first assessment May 2025): four themes (A Unity & diversity,
 * B Form & function, C Interaction & interdependence, D Continuity & change)
 * studied across four levels of organisation (molecules, cells, organisms,
 * ecosystems); external assessment = Paper 1 (1A multiple choice + 1B data-based)
 * and Paper 2 (short + extended response); internal assessment = the individual
 * Scientific Investigation (20%). NOTE: the pre-2025 Options / Paper 3 no longer
 * exist — do not reference them. Only well-established facts are stated here.
 */

export type IBLevel = 'HL' | 'SL'

export interface IBLevelConfig {
  level: IBLevel
  path: string
  otherLevelPath: string
  otherLevel: IBLevel
  fullName: string
  teachingHours: number
  metaTitle: string
  metaDescription: string
  keywords: string[]
  heroTagline: string
  heroSubtitle: string
  /** Who this level suits — honest guidance, not a hard sell. */
  whoIsItFor: string[]
  /** Level-specific tutoring focus — what makes HL vs SL coaching different. */
  differentiators: { title: string; body: string }[]
  faqs: { question: string; answer: string }[]
}

// Shared across both pages (the syllabus + assessment structure is common; only
// HL adds depth and AHL content on top).
export const IB_THEMES = [
  { key: 'A', name: 'Unity and diversity', hl: false },
  { key: 'B', name: 'Form and function', hl: false },
  { key: 'C', name: 'Interaction and interdependence', hl: false },
  { key: 'D', name: 'Continuity and change', hl: false },
] as const

export const IB_ASSESSMENT = [
  {
    name: 'Paper 1',
    detail: '1A multiple-choice + 1B data-based questions on unseen material',
  },
  { name: 'Paper 2', detail: 'Short-answer and extended-response questions' },
  {
    name: 'Scientific Investigation (IA)',
    detail: 'Your individual internally-assessed investigation — 20% of the final grade',
  },
] as const

export const IB_LEVELS: Record<IBLevel, IBLevelConfig> = {
  HL: {
    level: 'HL',
    path: '/ib-biology-hl-tutor',
    otherLevelPath: '/ib-biology-sl-tutor',
    otherLevel: 'SL',
    fullName: 'IB Biology Higher Level',
    teachingHours: 240,
    metaTitle: 'IB Biology HL Tutor | Higher Level 7 Specialist | Cerebrum Biology Academy',
    metaDescription:
      'Dedicated IB Biology HL (Higher Level) tutoring for the 2025 syllabus — mastering the additional higher-level (AHL) depth, Paper 2 extended response, Paper 1B data analysis, and a distinction-grade Scientific Investigation. Examiner-informed, AIIMS-trained faculty. Ideal for medicine and life-science applicants aiming for a 7.',
    keywords: [
      'IB Biology HL tutor',
      'IB Biology Higher Level tutor',
      'IB Biology HL 7',
      'IB Biology HL 2025 syllabus',
      'IB Biology HL online tutor',
      'IB Biology HL exam preparation',
      'IB Biology HL IA help',
      'IB HL Biology for medicine',
    ],
    heroTagline: 'IB Biology HL Tutor — built for the 7 you need',
    heroSubtitle:
      'Higher Level Biology is the depth-heavy 240-hour course most medical and life-science degrees expect. We tutor the additional higher-level (AHL) content, the extended-response demands of Paper 2, and the data-analysis edge of Paper 1B — end to end.',
    whoIsItFor: [
      'Students taking Biology at Higher Level and targeting a 6 or 7',
      'Applicants to Medicine, Dentistry, Biomedical, or Life Sciences (where HL Biology is usually required)',
      'HL students finding the additional higher-level (AHL) depth a step up from SL',
      'Anyone needing structured support on the Scientific Investigation (IA) at HL complexity',
    ],
    differentiators: [
      {
        title: 'Mastering the additional higher-level (AHL) content',
        body: 'HL goes beyond the SL core with extra depth across all four themes. We build that additional material into a single coherent map rather than treating it as bolt-on facts — so the harder Paper 2 questions become answerable, not intimidating.',
      },
      {
        title: 'Paper 2 extended-response technique',
        body: 'The marks that separate a 6 from a 7 sit in the extended-response questions. We drill command terms, mark-scheme phrasing, and how to structure a full-marks answer under time pressure.',
      },
      {
        title: 'Paper 1B data-analysis edge',
        body: 'HL data-based questions reward students who can read an unfamiliar graph, spot the trend, and quantify it fast. We train that specific skill with past-paper and novel datasets.',
      },
      {
        title: 'A distinction-grade Scientific Investigation',
        body: 'The IA is 20% of your grade and where HL students most often leave marks on the table. We supervise from research question to analysis and evaluation, at the depth HL examiners expect.',
      },
    ],
    faqs: [
      {
        question: 'What is the difference between IB Biology HL and SL?',
        answer:
          'Both HL and SL cover the same four themes (Unity and diversity, Form and function, Interaction and interdependence, Continuity and change). HL is a larger course — around 240 teaching hours versus 150 at SL — and adds additional higher-level (AHL) content with greater depth. HL exam papers are longer and demand more extended-response analysis. Most Medicine and Life-Science degrees ask for Biology at HL.',
      },
      {
        question: 'Do I need IB Biology HL for medicine?',
        answer:
          'Most medical and dental schools that require Biology expect it at Higher Level. Always check your specific university and country requirements, but if Medicine is your goal, HL Biology is the safe choice — and it is exactly the profile we coach.',
      },
      {
        question: 'Can you help with the HL Scientific Investigation (IA)?',
        answer:
          'Yes. The individual Scientific Investigation is 20% of your final grade. We supervise it end to end — sharpening the research question, tightening the method and data, and strengthening the analysis and evaluation to the standard HL examiners reward.',
      },
      {
        question: 'Do you teach the 2025 IB Biology syllabus?',
        answer:
          'Yes — all our HL tutoring follows the current syllabus (first assessment May 2025), including its four-theme structure and the Paper 1 / Paper 2 assessment model. We do not teach the retired Options or Paper 3, which no longer exist.',
      },
    ],
  },
  SL: {
    level: 'SL',
    path: '/ib-biology-sl-tutor',
    otherLevelPath: '/ib-biology-hl-tutor',
    otherLevel: 'HL',
    fullName: 'IB Biology Standard Level',
    teachingHours: 150,
    metaTitle: 'IB Biology SL Tutor | Standard Level 7 Specialist | Cerebrum Biology Academy',
    metaDescription:
      'Dedicated IB Biology SL (Standard Level) tutoring for the 2025 syllabus — building rock-solid understanding of the four core themes, exam technique for Paper 1 and Paper 2, and confident support on the Scientific Investigation. Examiner-informed, AIIMS-trained faculty. Aim for a 7 without HL overload.',
    keywords: [
      'IB Biology SL tutor',
      'IB Biology Standard Level tutor',
      'IB Biology SL 7',
      'IB Biology SL 2025 syllabus',
      'IB Biology SL online tutor',
      'IB Biology SL exam preparation',
      'IB Biology SL IA help',
    ],
    heroTagline: 'IB Biology SL Tutor — a clean path to a 7',
    heroSubtitle:
      'Standard Level Biology is the focused 150-hour course covering the four core themes. We make the concepts click, sharpen your Paper 1 and Paper 2 technique, and support your Scientific Investigation — so SL becomes one of your strongest grades.',
    whoIsItFor: [
      'Students taking Biology at Standard Level and aiming for a 6 or 7',
      'Students whose target degree does not require HL Biology but who want a strong science grade',
      'Anyone who wants solid conceptual understanding without the additional HL workload',
      'SL students who need clear, structured help with exam technique or the IA',
    ],
    differentiators: [
      {
        title: 'Making the four core themes actually click',
        body: 'SL rewards genuine understanding over memorisation. We connect the four themes across the levels of organisation so the syllabus becomes one joined-up picture instead of disconnected topics.',
      },
      {
        title: 'Efficient exam technique for Paper 1 and Paper 2',
        body: 'SL is a focused course, so exam technique is where quick gains live. We train command-term precision, multiple-choice speed, and how to write concise, full-marks short and extended responses.',
      },
      {
        title: 'Confident support on the Scientific Investigation (IA)',
        body: 'The IA is 20% of your grade and very achievable at SL with the right structure. We guide you from a workable research question through to a clean analysis and evaluation.',
      },
      {
        title: 'A realistic route to a 7 — without HL overload',
        body: 'You do not need Higher Level to score a 7 at Standard Level. We keep the workload proportionate and focused entirely on what the SL papers actually test.',
      },
    ],
    faqs: [
      {
        question: 'What is the difference between IB Biology SL and HL?',
        answer:
          'SL and HL share the same four themes (Unity and diversity, Form and function, Interaction and interdependence, Continuity and change). SL is a focused course of around 150 teaching hours, while HL is larger (around 240 hours) and adds additional higher-level content and longer, more analytical exams. If your degree does not require HL Biology, a strong SL grade is an excellent outcome.',
      },
      {
        question: 'Can I score a 7 in IB Biology SL?',
        answer:
          'Absolutely. SL is a focused syllabus, so with genuine conceptual understanding and sharp exam technique a 7 is very achievable — that is exactly what our SL tutoring is built around.',
      },
      {
        question: 'Do I need HL Biology, or is SL enough?',
        answer:
          'It depends on your target degree. Medicine and most life-science courses expect HL Biology; many other degrees accept or do not require Biology at all. If SL fits your plan, we help you make it one of your strongest grades. If you are unsure, we are happy to advise.',
      },
      {
        question: 'Do you teach the 2025 IB Biology syllabus at SL?',
        answer:
          'Yes — our SL tutoring follows the current syllabus (first assessment May 2025), with its four-theme structure and the Paper 1 / Paper 2 assessment model plus the Scientific Investigation. The retired Options and Paper 3 are no longer part of the course.',
      },
    ],
  },
}
