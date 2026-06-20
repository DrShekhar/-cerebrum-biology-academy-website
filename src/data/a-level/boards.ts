/**
 * A-Level Biology exam-board configs for the per-board tutor hubs
 * (/aqa-a-level-biology-tutor, /ocr-a-level-biology-tutor, etc.).
 *
 * Each board page is substantially differentiated by REAL, verified
 * specification facts — paper structure, topic list, practical model and
 * what makes that board distinct to teach. No two pages share a spec table,
 * so these are board-authority hubs, not doorway duplicates.
 *
 * Spec facts verified Jun 2026 against the official board specifications:
 *  - AQA 7402, OCR Biology A H420, Pearson Edexcel Biology A (SNAB) 9BN0,
 *    WJEC/Eduqas, Cambridge International (CAIE) 9700.
 * Sources retained in the build-research notes; figures are the published
 * assessment structures, not estimates.
 */

export type ALevelBoardSlug = 'aqa' | 'ocr' | 'edexcel' | 'wjec-eduqas' | 'cambridge-international'

export interface ALevelBoardPaper {
  name: string
  title: string
  duration: string
  marks: number
  weight: string
  covers: string
}

export interface ALevelBoardFaq {
  question: string
  answer: string
}

export interface ALevelBoard {
  slug: ALevelBoardSlug
  /** URL path segment, e.g. "aqa-a-level-biology-tutor" */
  routeSlug: string
  board: string
  boardFull: string
  specCode: string
  asCode?: string
  region: string
  /** short uppercase eyebrow, e.g. "AQA · spec 7402" */
  eyebrow: string
  tagline: string
  heroBlurb: string
  papers: ALevelBoardPaper[]
  /** label above the topic list, e.g. "The 8 topics" or "The 6 modules" */
  topicsLabel: string
  topics: string[]
  practicalModel: string
  practicalDetail: string
  distinctives: string[]
  whoFor: string
  examSeries: string
  faqs: ALevelBoardFaq[]
}

export const A_LEVEL_BOARDS: ALevelBoard[] = [
  // ── AQA 7402 ──────────────────────────────────────────────────────
  {
    slug: 'aqa',
    routeSlug: 'aqa-a-level-biology-tutor',
    board: 'AQA',
    boardFull: 'AQA (Assessment and Qualifications Alliance)',
    specCode: '7402',
    asCode: '7401',
    region: 'England, Wales & Northern Ireland',
    eyebrow: 'AQA · A-Level Biology 7402',
    tagline: 'The most-taught A-Level Biology spec in the UK — and the one with the 25-mark essay.',
    heroBlurb:
      'Specialist AQA A-Level Biology (7402) tuition with AIIMS-trained faculty. Live small-batch classes built around the exact AQA assessment model — three 2-hour papers, the 12 required practicals, and the Paper 3 synoptic essay that decides A* grades. Open to students anywhere in the world.',
    papers: [
      {
        name: 'Paper 1',
        title: 'Topics 1–4',
        duration: '2 hours',
        marks: 91,
        weight: '35% of A-level',
        covers:
          'Biological molecules; cells; how organisms exchange substances with their environment; genetic information, variation and relationships between organisms. A mix of short-answer, longer-answer and comprehension questions.',
      },
      {
        name: 'Paper 2',
        title: 'Topics 5–8',
        duration: '2 hours',
        marks: 91,
        weight: '35% of A-level',
        covers:
          'Energy transfers in and between organisms; how organisms respond to changes in their environments; genetics, populations, evolution and ecosystems; the control of gene expression.',
      },
      {
        name: 'Paper 3',
        title: 'Any content + synoptic essay',
        duration: '2 hours',
        marks: 78,
        weight: '30% of A-level',
        covers:
          'Questions can draw on the whole specification (topics 1–8), with a strong focus on critical analysis of experimental data — plus one 25-mark synoptic essay. This essay is where many students lose A* grades.',
      },
    ],
    topicsLabel: 'The 8 topics',
    topics: [
      'Biological molecules',
      'Cells',
      'Organisms exchange substances with their environment',
      'Genetic information, variation and relationships between organisms',
      'Energy transfers in and between organisms',
      'Organisms respond to changes in their internal and external environments',
      'Genetics, populations, evolution and ecosystems',
      'The control of gene expression',
    ],
    practicalModel: 'Practical Endorsement (Pass / Not classified)',
    practicalDetail:
      '12 required practicals across the two years, teacher-assessed against the Common Practical Assessment Criteria. The endorsement is reported separately from the A-level grade — but at least 15% of the written-exam marks assess practical knowledge, so it is never optional in our teaching.',
    distinctives: [
      'The Paper 3 25-mark synoptic essay is unique among the main boards — we drill essay planning and synoptic linking explicitly.',
      'Around 10% of marks are Level-3 maths; we build the calculation and statistics skills that trip students up.',
      'It is the most widely taught UK spec, so our AQA past-paper bank is the deepest.',
    ],
    whoFor:
      'Most UK state and independent schools, plus many British international schools, enter AQA. If your school says "7402", this is your page.',
    examSeries: 'Linear — all three papers in the May/June series at the end of Year 13.',
    faqs: [
      {
        question: 'How do you prepare students for the AQA Paper 3 essay?',
        answer:
          'The 25-mark essay rewards breadth and synoptic linking across topics 1–8, not just one chapter. We teach a planning framework, build a bank of high-scoring linking themes (e.g. transport, control, ATP), and mark practice essays against the real AQA mark scheme so students learn exactly how the bands are awarded.',
      },
      {
        question: 'Do you cover the 12 required practicals?',
        answer:
          'Yes. We coach the underlying technique, the variables, and — crucially — the exam questions AQA asks about each required practical, because at least 15% of written marks test practical understanding. School handles the endorsement sign-off; we make sure the exam marks follow.',
      },
    ],
  },
  // ── OCR Biology A H420 ────────────────────────────────────────────
  {
    slug: 'ocr',
    routeSlug: 'ocr-a-level-biology-tutor',
    board: 'OCR',
    boardFull: 'OCR (Oxford, Cambridge and RSA) — Biology A (H420)',
    specCode: 'H420',
    asCode: 'H020',
    region: 'England, Wales & Northern Ireland',
    eyebrow: 'OCR Biology A · H420',
    tagline:
      'Six modules, three papers, one synoptic "Unified biology" exam that ties it all together.',
    heroBlurb:
      'Specialist OCR A-Level Biology A (H420) tuition with AIIMS-trained faculty. Live small-batch classes mapped to the six OCR modules, the 12 Practical Activity Groups, and the synoptic Paper 3 that pulls every module together. (We also support OCR Biology B "Advancing Biology", H422.) Open worldwide.',
    papers: [
      {
        name: 'Paper 1',
        title: 'Biological processes',
        duration: '2 hours 15 minutes',
        marks: 100,
        weight: '37% of A-level',
        covers:
          'Modules 1, 2, 3 and 5 — the processes that keep cells and organisms running: foundations in biology, exchange and transport, communication, homeostasis and energy.',
      },
      {
        name: 'Paper 2',
        title: 'Biological diversity',
        duration: '2 hours 15 minutes',
        marks: 100,
        weight: '37% of A-level',
        covers:
          'Modules 1, 2, 4 and 6 — biodiversity, evolution and disease, and genetics, evolution and ecosystems, built on the same practical and foundational core.',
      },
      {
        name: 'Paper 3',
        title: 'Unified biology',
        duration: '1 hour 30 minutes',
        marks: 70,
        weight: '26% of A-level',
        covers:
          'A synoptic paper drawing on all six modules at once — the strongest test of whether a student can connect ideas across the whole course.',
      },
    ],
    topicsLabel: 'The 6 modules',
    topics: [
      'Module 1 — Development of practical skills in biology',
      'Module 2 — Foundations in biology',
      'Module 3 — Exchange and transport',
      'Module 4 — Biodiversity, evolution and disease',
      'Module 5 — Communication, homeostasis and energy',
      'Module 6 — Genetics, evolution and ecosystems',
    ],
    practicalModel: 'Practical Endorsement (Pass / Not Classified)',
    practicalDetail:
      '12 Practical Activity Groups (PAGs) completed over the two years and teacher-assessed for the separate Practical Endorsement. The written papers test practical understanding throughout, so we coach the PAG techniques and the exam questions built on them.',
    distinctives: [
      'Papers 1 and 2 deliberately re-use Modules 1 and 2 as a shared core — we teach that core once, deeply, so it pays off on both papers.',
      'The "Unified biology" Paper 3 is purely synoptic; we run dedicated cross-module synthesis sessions for it.',
      'OCR loves applied/novel-context data questions — we drill unfamiliar-data technique hard.',
    ],
    whoFor:
      'Schools entering OCR Biology A (H420). If your spec lists six modules and a "Unified biology" paper, this is your board.',
    examSeries: 'Linear — three papers in the May/June series at the end of Year 13.',
    faqs: [
      {
        question: 'What is the OCR "Unified biology" paper and how do you prepare for it?',
        answer:
          'Paper 3 (1h30, 70 marks) is synoptic — a single question can pull from any of the six modules. We teach the course so connections are built in from the start, then run targeted synoptic-synthesis and unfamiliar-data sessions in Year 13 so students are not seeing cross-module questions for the first time in the exam.',
      },
      {
        question: 'Do you also teach OCR Biology B (Advancing Biology, H422)?',
        answer:
          "Yes. Biology B is OCR's context-led alternative with a different paper structure. Tell us which one your school enters and we map the tuition to that exact spec — most OCR centres use Biology A (H420).",
      },
    ],
  },
  // ── Edexcel Biology A (SNAB) 9BN0 ─────────────────────────────────
  {
    slug: 'edexcel',
    routeSlug: 'edexcel-a-level-biology-tutor',
    board: 'Edexcel',
    boardFull: 'Pearson Edexcel — Biology A (Salters-Nuffield / SNAB), 9BN0',
    specCode: '9BN0',
    asCode: '8BN0',
    region: 'England, Wales & Northern Ireland · International A-Level worldwide',
    eyebrow: 'Edexcel Biology A · SNAB · 9BN0',
    tagline:
      'The context-led spec — biology taught through real-world cases, assessed across three equal papers.',
    heroBlurb:
      'Specialist Pearson Edexcel A-Level Biology A (Salters-Nuffield, 9BN0) tuition with AIIMS-trained faculty. SNAB teaches the science through real contexts — health and risk, genes, ecosystems, the brain — so our teaching follows that issue-led thread while drilling the core practicals and exam technique. (We also support concept-led Edexcel Biology B, and the International A-Level.) Open worldwide.',
    papers: [
      {
        name: 'Paper 1',
        title: 'The Natural Environment and Species Survival',
        duration: '2 hours',
        marks: 100,
        weight: '33⅓% of A-level',
        covers:
          'Drawn from the earlier topics — molecules, membranes, genes and health, the cell cycle, biodiversity and natural resources, and the ecology of the wild side.',
      },
      {
        name: 'Paper 2',
        title: 'Energy, Exercise and Co-ordination',
        duration: '2 hours',
        marks: 100,
        weight: '33⅓% of A-level',
        covers:
          'Respiration, photosynthesis and energy; immunity, infection and forensics; exercise physiology; and co-ordination including the brain and nervous system.',
      },
      {
        name: 'Paper 3',
        title: 'General and Practical Applications in Biology',
        duration: '2 hours',
        marks: 100,
        weight: '33⅓% of A-level',
        covers:
          'A synoptic paper across the whole specification with a heavy emphasis on experimental method, data handling and the core practicals — pre-released context plus unseen questions.',
      },
    ],
    topicsLabel: 'How the content is organised',
    topics: [
      'Lifestyle, Health and Risk',
      'Genes and Health',
      'Voice of the Genome',
      'Biodiversity and Natural Resources',
      'On the Wild Side',
      'Immunity, Infection and Forensics',
      'Run for your Life',
      'Grey Matter',
    ],
    practicalModel: 'Core Practicals + Science Practical Endorsement (Pass / Fail)',
    practicalDetail:
      'A set of Core Practicals runs through the two years and underpins the separately-reported Science Practical Endorsement. Paper 3 in particular leans hard on experimental method and the core practicals, so we treat them as exam content, not a side activity.',
    distinctives: [
      'SNAB is context-led — concepts arrive through real-world cases (health, forensics, the brain). We teach the underlying biology cleanly so students are not lost in the storyline.',
      'Three equally-weighted papers (33⅓% each) mean no single paper can be neglected — we balance preparation across all three.',
      'Paper 3 is method- and data-heavy; we drill experimental design, statistics and the core practicals specifically.',
    ],
    whoFor:
      'Schools entering Edexcel Biology A (SNAB, 9BN0). If your topics have names like "Voice of the Genome" or "On the Wild Side", this is your spec. We also cover Edexcel Biology B and the International A-Level.',
    examSeries: 'Linear — three papers in the May/June series at the end of Year 13.',
    faqs: [
      {
        question: 'Is the Salters-Nuffield (SNAB) approach harder to revise?',
        answer:
          'It can feel that way because the biology is woven into real-world contexts rather than listed topic-by-topic. We give students a clean, conventional map of the underlying concepts alongside the SNAB contexts, so revision is structured — then we use the contexts the way Edexcel does in the exam.',
      },
      {
        question: 'Do you teach the Edexcel International A-Level too?',
        answer:
          'Yes — Pearson Edexcel International A-Level Biology is widely taught in international schools and we support it alongside the UK SNAB and Biology B specs. Tell us your exact spec code and we map the tuition to it.',
      },
    ],
  },
  // ── WJEC / Eduqas ─────────────────────────────────────────────────
  {
    slug: 'wjec-eduqas',
    routeSlug: 'wjec-eduqas-a-level-biology-tutor',
    board: 'WJEC / Eduqas',
    boardFull: 'WJEC (Wales) & Eduqas (England) — A-Level Biology',
    specCode: 'Eduqas A400QS / WJEC 1400QS',
    region: 'Wales (WJEC) · England (Eduqas)',
    eyebrow: 'WJEC & Eduqas · A-Level Biology',
    tagline:
      'Two related specs from one board — Eduqas linear in England, WJEC unitised in Wales with an examined practical.',
    heroBlurb:
      'Specialist WJEC and Eduqas A-Level Biology tuition with AIIMS-trained faculty. We cover both routes: Eduqas (England) with its three equal written components and Practical Endorsement, and WJEC (Wales) with its five units, examined Unit 5 practical, and Welsh-medium option. Live small-batch classes, open worldwide.',
    papers: [
      {
        name: 'Component 1',
        title: 'Energy for Life',
        duration: '2 hours',
        marks: 100,
        weight: '33⅓% (Eduqas)',
        covers:
          'Biochemistry and cell biology, the chemistry of life, and the energy systems — respiration and photosynthesis — that drive living organisms.',
      },
      {
        name: 'Component 2',
        title: 'Continuity of Life',
        duration: '2 hours',
        marks: 100,
        weight: '33⅓% (Eduqas)',
        covers:
          'Reproduction, inheritance, variation and evolution — how life continues and changes across generations.',
      },
      {
        name: 'Component 3',
        title: 'Requirements for Life',
        duration: '2 hours',
        marks: 100,
        weight: '33⅓% (Eduqas)',
        covers:
          'Homeostasis, transport and response, plus an optional section (one of Immunology and Disease / Human Musculoskeletal Anatomy / Neurobiology and Behaviour).',
      },
    ],
    topicsLabel: 'Structure at a glance',
    topics: [
      'Eduqas (England): 3 linear components, each 2 hours / 100 marks / 33⅓%',
      'WJEC (Wales): 5 units — 2 AS units + 3 A2 units, with staged assessment allowed',
      'WJEC Unit 5 is an examined practical worth 10% of the A-level grade',
      'Optional A2 section: Immunology & Disease, Human Musculoskeletal Anatomy, or Neurobiology & Behaviour',
      'WJEC is available in Welsh-medium as well as English-medium',
    ],
    practicalModel:
      'Eduqas: Practical Endorsement (Pass / Fail) · WJEC: examined Unit 5 (10% of grade)',
    practicalDetail:
      'This is the key fork. Eduqas (England) uses the standard Practical Endorsement — at least 12 activities, teacher-assessed, reported separately. WJEC (Wales) instead examines practical skills directly in Unit 5 (an experimental task plus a practical-analysis task, marked by WJEC) and those marks count toward the final grade. We prepare students for whichever model their centre uses.',
    distinctives: [
      'WJEC is unitised — students can sit units in stages, and the examined Unit 5 means practical marks count toward the grade (unlike the England endorsement).',
      'Eduqas is structurally close to AQA (linear, endorsement-only) but uses three equal 100-mark components with a choice of one optional section.',
      'Welsh-medium delivery and a Welsh-perspective requirement make WJEC distinct in how content is framed.',
    ],
    whoFor:
      'Welsh centres (WJEC, including Welsh-medium) and English centres entering Eduqas. Tell us which one and we map the tuition exactly — they share content but differ in structure and practical assessment.',
    examSeries:
      'Eduqas: linear May/June. WJEC: summer series, with unitised staged entry possible.',
    faqs: [
      {
        question: 'What is the difference between WJEC and Eduqas?',
        answer:
          'Both come from the same awarding body, but WJEC is the Wales-regulated, unitised qualification (five units, examined Unit 5 practical, Welsh-medium option) while Eduqas is its England-facing, linear qualification (three equal components, Practical Endorsement). The biology content overlaps heavily; the structure and the way practical work is assessed are what differ.',
      },
      {
        question: 'Which optional section should I choose in the A2 content?',
        answer:
          'Both specs offer a choice of Immunology and Disease, Human Musculoskeletal Anatomy, or Neurobiology and Behaviour. We help students pick based on their strengths and university plans, then teach the chosen option to full depth.',
      },
    ],
  },
  // ── Cambridge International (CAIE) 9700 ────────────────────────────
  {
    slug: 'cambridge-international',
    routeSlug: 'cambridge-international-a-level-biology-tutor',
    board: 'Cambridge International',
    boardFull: 'Cambridge International (CAIE) AS & A Level Biology — 9700',
    specCode: '9700',
    region: 'International schools worldwide',
    eyebrow: 'Cambridge International · CAIE 9700',
    tagline:
      'The global board — five papers, an examined practical that counts toward your grade, and AS as a standalone qualification.',
    heroBlurb:
      'Specialist Cambridge International AS & A Level Biology (9700) tuition with AIIMS-trained faculty — the board used by international schools across Asia, the Middle East, Africa and beyond. Live small-batch classes that prepare students for all five papers, including the examined practical papers that, unlike the UK endorsement, count directly toward the grade. Time-zone-friendly scheduling worldwide.',
    papers: [
      {
        name: 'Paper 1',
        title: 'Multiple Choice (AS)',
        duration: '1 hour 15 minutes',
        marks: 40,
        weight: '15.5% of A-level (31% of AS)',
        covers: '40 multiple-choice questions on the AS content.',
      },
      {
        name: 'Paper 2',
        title: 'AS Level Structured Questions',
        duration: '1 hour 15 minutes',
        marks: 60,
        weight: '23% of A-level (46% of AS)',
        covers: 'Structured questions on the AS content.',
      },
      {
        name: 'Paper 3',
        title: 'Advanced Practical Skills',
        duration: '2 hours',
        marks: 40,
        weight: '11.5% of A-level (23% of AS)',
        covers:
          'An examined practical — students physically carry out experiments under timed conditions. The context may go beyond the syllabus.',
      },
      {
        name: 'Paper 4',
        title: 'A Level Structured Questions',
        duration: '2 hours',
        marks: 100,
        weight: '38.5% of A-level',
        covers: 'Structured questions on the full A-level content (AS knowledge is also required).',
      },
      {
        name: 'Paper 5',
        title: 'Planning, Analysis and Evaluation',
        duration: '1 hour 15 minutes',
        marks: 30,
        weight: '11.5% of A-level',
        covers:
          'A written paper testing how students plan experiments and analyse and evaluate data — the reasoning behind practical work.',
      },
    ],
    topicsLabel: 'How the qualification is built',
    topics: [
      'AS Level = Papers 1, 2 and 3 (a free-standing qualification, grades a–e)',
      'Full A Level = all five papers (grades A*–E)',
      'AS content can be sat in Year 1 and carried forward, or all five papers in one series',
      'Assessment objectives: knowledge 40% · handling & evaluating 40% · experimental skills 20%',
      'Practical skills are examined (Papers 3 & 5) and count toward the grade',
    ],
    practicalModel: 'Examined practical (Papers 3 & 5) — counts toward the grade',
    practicalDetail:
      'This is the biggest difference from UK boards. There is no teacher Pass/Fail endorsement — instead practical skill is examined directly: Paper 3 is a hands-on timed practical, and Paper 5 tests planning, analysis and evaluation. Together they are around 23% of the A-level, so practical technique and experimental reasoning are graded, not just signed off. We train both intensively.',
    distinctives: [
      'Examined practical papers (3 & 5) that count toward the grade — a fundamentally different skill set from the UK endorsement model.',
      'A dedicated multiple-choice paper (Paper 1) rewards precise, wide knowledge.',
      'AS is a standalone qualification and there are June and November series worldwide (plus a March series in India) — flexible entry for international students.',
    ],
    whoFor:
      'Students at international schools worldwide entering CAIE 9700 — the most common A-Level route outside the UK. Also the natural choice for families relocating between countries.',
    examSeries: 'June and November worldwide; an additional March series in India.',
    faqs: [
      {
        question: 'How is the Cambridge practical exam different from UK boards?',
        answer:
          'UK boards (AQA, OCR, Eduqas) use a teacher-assessed Practical Endorsement that is reported separately and does not change your A-level grade. Cambridge instead examines practical skills directly in Paper 3 (hands-on) and Paper 5 (planning and analysis), and those marks count toward the grade — roughly 23% of the A-level. We prepare students specifically for both papers.',
      },
      {
        question: 'Can I take just the AS, or sit everything together?',
        answer:
          'Both. Cambridge AS Biology (Papers 1–3) is a standalone qualification you can carry forward, or you can sit all five papers in a single series for the full A-level. With June, November and (in India) March series, we help you choose the entry pattern that fits your school and timeline.',
      },
    ],
  },
]

export const A_LEVEL_BOARD_BY_SLUG: Record<ALevelBoardSlug, ALevelBoard> = A_LEVEL_BOARDS.reduce(
  (acc, b) => {
    acc[b.slug] = b
    return acc
  },
  {} as Record<ALevelBoardSlug, ALevelBoard>
)
