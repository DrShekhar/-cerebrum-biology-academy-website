/**
 * Global exam-hub configs — universal, all-nationalities landing pages
 * (/ap-biology-tutor-global, /mcat-biology-tutor-global, etc.).
 *
 * WHY THESE EXIST: the existing exam/city pages lean diaspora/NRI-framed
 * (intentional, kept untouched). These NEW hubs address EVERY student of any
 * nationality — leading with the exam + universal value, AIIMS glossed for a
 * non-Indian reader — at distinct /…-global slugs so they never cannibalise the
 * NRI pages. Linked from the USA/UK country hubs.
 *
 * Additive only. No existing page is modified. No fabricated stats.
 */

export interface GlobalExamFaq {
  question: string
  answer: string
}

export interface GlobalExam {
  slug: string
  /** URL path, e.g. "ap-biology-tutor-global" */
  routeSlug: string
  exam: string
  eyebrow: string
  tagline: string
  heroBlurb: string
  /** who this is for — universal framing */
  whoFor: string
  coversLabel: string
  covers: string[]
  /** why a biology specialist, glossed for non-Indians */
  whyPoints: { title: string; text: string }[]
  faqs: GlobalExamFaq[]
  /** verified internal links to related existing pages */
  related: { label: string; href: string }[]
  keywords: string[]
  metaTitle: string
  metaDescription: string
}

const AIIMS_GLOSS =
  'AIIMS New Delhi — India’s apex medical school, ranked among the most selective in the world (peer to Harvard Medical School, Johns Hopkins and Oxford)'

export const GLOBAL_EXAMS: GlobalExam[] = [
  // ── AP Biology ────────────────────────────────────────────────────
  {
    slug: 'ap-biology',
    routeSlug: 'ap-biology-tutor-global',
    exam: 'AP Biology',
    eyebrow: 'AP Biology · College Board · worldwide',
    tagline: 'score-5 coaching for any AP Biology student, anywhere.',
    heroBlurb:
      'Specialist AP Biology tuition for students of any nationality, anywhere in the world — at US high schools, international/American schools abroad, or studying independently. We coach all 8 units of the College Board CED, the Free-Response rubric, and the science-practices that separate a 4 from a 5. Live online in your time zone.',
    whoFor:
      'Any student taking AP Biology — in the US, at an American/international school overseas, or homeschooled. No nationality or background assumed.',
    coversLabel: 'What we coach',
    covers: [
      'All 8 units of the College Board AP Biology CED',
      'Free-Response Question (FRQ) rubric mastery — where most points are lost',
      'The 6 AP science practices (data analysis, experimental design, modelling)',
      'Multiple-choice technique and timing for the May exam',
      'Unit-by-unit diagnostics → a personalised score-5 plan',
      'Lab/investigation understanding the exam actually tests',
    ],
    whyPoints: [
      {
        title: 'Taught by clinical-depth faculty',
        text: `Faculty trained at ${AIIMS_GLOSS}. That depth in molecular biology, genetics and physiology maps directly onto AP’s hardest units.`,
      },
      {
        title: 'Built around how AP scores',
        text: 'We coach to the FRQ rubric and science practices — where the marks actually are — not generic content review.',
      },
      {
        title: 'Your time zone, small batches',
        text: 'Live online classes scheduled around your school day, recorded for revision. 1:1 and micro-batch options.',
      },
    ],
    faqs: [
      {
        question: 'Do I need to be in the US to take AP Biology coaching here?',
        answer:
          'No. We coach AP Biology students of any nationality, anywhere — in the US, at American/international schools abroad, or studying independently. Classes are live online in your time zone.',
      },
      {
        question: 'How do you target a 5?',
        answer:
          'We start with a unit-by-unit diagnostic, then focus on the Free-Response rubric and the six science practices where most students lose points, with past-paper FRQ marking against the real College Board rubric.',
      },
      {
        question: 'What is AIIMS, for a family who hasn’t heard of it?',
        answer: `${AIIMS_GLOSS}. AIIMS-trained faculty bring clinical and research depth that directly strengthens AP Biology preparation.`,
      },
    ],
    related: [
      { label: 'AP Biology by US city', href: '/best-ap-biology-tutor-usa' },
      { label: 'AP Biology score-5 guide', href: '/ap-biology-score-5-study-guide' },
      { label: 'AP FRQ rubric mastery', href: '/ap-biology-frq-rubric-mastery' },
      { label: 'US biology hub', href: '/best-biology-tutor-usa' },
    ],
    keywords: [
      'AP Biology tutor',
      'AP Biology tutor online',
      'AP Biology score 5',
      'best AP Biology tutor',
      'AP Biology coaching online',
      'AP Biology FRQ help',
    ],
    metaTitle: 'AP Biology Tutor (Online, Worldwide) — Score-5 Coaching | Cerebrum',
    metaDescription:
      'Specialist AP Biology tuition for any student, anywhere — all 8 College Board units, FRQ rubric mastery, science practices, score-5 targeting. AIIMS-trained faculty, live online in your time zone. Free trial.',
  },
  // ── MCAT Bio/Biochem ──────────────────────────────────────────────
  {
    slug: 'mcat-biology',
    routeSlug: 'mcat-biology-tutor-global',
    exam: 'MCAT Biology & Biochemistry',
    eyebrow: 'MCAT Bio/Biochem · pre-med · worldwide',
    tagline: 'the Bio/Biochem section, taught by clinical-depth faculty.',
    heroBlurb:
      'Specialist MCAT Biology & Biochemistry coaching for pre-meds of any nationality — in the US, Canada, the Caribbean, or applying internationally. We focus on the Biological & Biochemical Foundations section and the biochem woven through Psych/Soc and Chem/Phys, with passage technique and content depth from faculty who trained in medicine. Live online in your time zone.',
    whoFor:
      'Any pre-medical student preparing for the MCAT — US/Canadian applicants, international medical aspirants, and career-changers. No background assumed.',
    coversLabel: 'What we coach',
    covers: [
      'Biological & Biochemical Foundations of Living Systems (the Bio/Biochem section)',
      'Amino acids, proteins, enzymes, metabolism — the high-yield biochem core',
      'Molecular biology, genetics, cell & systems physiology',
      'CARS-style passage technique applied to science passages',
      'Content-to-passage application (the MCAT tests reasoning, not recall)',
      'Diagnostic-led plan around your target score and test date',
    ],
    whyPoints: [
      {
        title: 'Faculty who trained in medicine',
        text: `Coaching from faculty trained at ${AIIMS_GLOSS} — the clinical and biochemical depth the Bio/Biochem section rewards.`,
      },
      {
        title: 'Passage reasoning, not cramming',
        text: 'The MCAT tests application. We drill content through MCAT-style passages and experimental data, not flashcard recall.',
      },
      {
        title: 'Flexible, your time zone',
        text: 'Live online 1:1 and small-batch sessions around your schedule, recorded for review.',
      },
    ],
    faqs: [
      {
        question: 'Is this only the Bio/Biochem section?',
        answer:
          'That is our specialism and the largest biology-heavy section, but biochemistry also appears in the Chem/Phys and Psych/Soc sections — we cover the biology and biochemistry wherever it shows up on the MCAT.',
      },
      {
        question: 'Can international / non-US students prepare with you?',
        answer:
          'Yes. We coach MCAT pre-meds of any nationality, anywhere, live online in your time zone — US and Canadian applicants, Caribbean med students, and international aspirants alike.',
      },
      {
        question: 'What is AIIMS?',
        answer: `${AIIMS_GLOSS}. Faculty with that medical training bring the depth the MCAT Bio/Biochem section rewards.`,
      },
    ],
    related: [
      { label: 'MCAT by US metro', href: '/best-mcat-biology-tutor' },
      { label: 'USMLE Step 1 biology', href: '/usmle-step-1-biology-preparation' },
      { label: 'US biology hub', href: '/best-biology-tutor-usa' },
    ],
    keywords: [
      'MCAT biology tutor',
      'MCAT biochemistry tutor',
      'MCAT Bio/Biochem coaching',
      'online MCAT biology tutor',
      'best MCAT biology tutor',
      'MCAT biological foundations',
    ],
    metaTitle: 'MCAT Biology & Biochemistry Tutor (Online, Worldwide) | Cerebrum',
    metaDescription:
      'Specialist MCAT Bio/Biochem coaching for pre-meds of any nationality — biological foundations, biochemistry, passage reasoning. Faculty trained in medicine (AIIMS), live online in your time zone. Free trial.',
  },
  // ── Biology Olympiad (USABO / IBO / national) ─────────────────────
  {
    slug: 'biology-olympiad',
    routeSlug: 'biology-olympiad-tutor-global',
    exam: 'Biology Olympiad (USABO · IBO · national)',
    eyebrow: 'Biology Olympiad · USABO · IBO · worldwide',
    tagline: 'olympiad-depth biology for aspirants in any country.',
    heroBlurb:
      'Specialist biology-olympiad coaching for students anywhere — the USA Biology Olympiad (USABO), the UK (BBO), India (INBO), and every national route to the International Biology Olympiad (IBO). Campbell-depth across molecular biology, physiology, genetics, ecology and evolution, plus practical-exam and past-paper drilling. IBO-syllabus mastery transfers across every national route.',
    whoFor:
      'Any student aiming at a national biology olympiad or the IBO — USABO (USA), BBO (UK), national olympiads worldwide. No nationality assumed.',
    coversLabel: 'What we coach',
    covers: [
      'Campbell-depth biology beyond any school syllabus',
      'USABO (Open → Semifinal → Nationals), BBO, and national-olympiad routes to the IBO',
      'The IBO practical/lab rounds most free material skips',
      'Past-paper saturation with per-question rationale',
      'Molecular & cell biology, genetics, physiology, ecology, evolution, ethology',
      'Diagnostic-led plan to your national selection timeline',
    ],
    whyPoints: [
      {
        title: 'Olympiad depth, specialist faculty',
        text: `Coaching from faculty trained at ${AIIMS_GLOSS} — research-grade biology depth at the level olympiads demand.`,
      },
      {
        title: 'One depth, every national route',
        text: 'IBO-syllabus mastery transfers across USABO, BBO and every national olympiad — we coach the depth, then the route.',
      },
      {
        title: 'Practical rounds covered',
        text: 'We prepare the practical/lab and data-analysis rounds that decide medals, not just the written theory.',
      },
    ],
    faqs: [
      {
        question: 'Which olympiads do you coach?',
        answer:
          'The USA Biology Olympiad (USABO) and its route to Team USA, the British Biology Olympiad (BBO), India’s INBO, and national olympiads worldwide — all leading to the International Biology Olympiad (IBO). The underlying biology depth is shared across all of them.',
      },
      {
        question: 'I’m not in the US or India — can you still help?',
        answer:
          'Yes. Biology-olympiad depth is universal; we coach students of any nationality, anywhere, live online in your time zone, and map preparation to your country’s selection route.',
      },
      {
        question: 'What is AIIMS?',
        answer: `${AIIMS_GLOSS}. That research-grade depth is exactly what olympiad biology rewards.`,
      },
    ],
    related: [
      { label: 'USABO coaching (USA)', href: '/usabo-coaching' },
      { label: 'IBO by country', href: '/ibo-preparation' },
      { label: 'All biology olympiads', href: '/biology-olympiads' },
      { label: 'US biology hub', href: '/best-biology-tutor-usa' },
    ],
    keywords: [
      'biology olympiad coaching',
      'USABO coaching online',
      'IBO preparation',
      'biology olympiad tutor',
      'international biology olympiad coaching',
      'BBO coaching',
    ],
    metaTitle: 'Biology Olympiad Tutor (USABO · IBO, Online Worldwide) | Cerebrum',
    metaDescription:
      'Specialist biology-olympiad coaching for any student, anywhere — USABO, BBO, national routes to the IBO. Campbell-depth + practical rounds, AIIMS-trained faculty, live online in your time zone. Free assessment.',
  },
  // ── IB Biology ────────────────────────────────────────────────────
  {
    slug: 'ib-biology',
    routeSlug: 'ib-biology-tutor-global',
    exam: 'IB Biology (HL & SL)',
    eyebrow: 'IB Biology HL/SL · worldwide',
    tagline: 'HL/SL coaching for IB students at any school, any country.',
    heroBlurb:
      'Specialist IB Biology (HL & SL) tuition for students at IB World Schools anywhere in the world. We coach the current syllabus, Paper 1/2/3 technique, and mentor the Internal Assessment and Extended Essay — the components that move final grades. Live online in your time zone, any nationality.',
    whoFor:
      'Any IB Diploma student taking Biology HL or SL, at any IB World School worldwide. No nationality or region assumed.',
    coversLabel: 'What we coach',
    covers: [
      'The full current IB Biology syllabus (HL and SL)',
      'Paper 1, Paper 2 and Paper 3 exam technique',
      'Internal Assessment (IA) mentorship — design, data, evaluation',
      'Extended Essay (EE) supervision for biology',
      'Command-term and mark-scheme precision',
      'Diagnostic-led plan to your exam session (May or November)',
    ],
    whyPoints: [
      {
        title: 'Specialist, clinical-depth faculty',
        text: `Faculty trained at ${AIIMS_GLOSS} — the depth IB HL Biology demands, taught for understanding not memorisation.`,
      },
      {
        title: 'IA & EE where grades are won',
        text: 'We mentor the Internal Assessment and Extended Essay against the real IB criteria — often the difference of a grade or two.',
      },
      {
        title: 'Any school, your time zone',
        text: 'Live online around your IB timetable (May or November session), recorded for revision.',
      },
    ],
    faqs: [
      {
        question: 'Do you teach the current IB Biology syllabus?',
        answer:
          'Yes — we coach the current IB Biology syllabus for both HL and SL, including Paper 1/2/3 technique and IA/EE mentorship, for the May and November sessions.',
      },
      {
        question: 'My IB school isn’t in India — does that matter?',
        answer:
          'Not at all. The IB is a global curriculum; we coach IB Biology students at IB World Schools anywhere, of any nationality, live online in your time zone.',
      },
      {
        question: 'What is AIIMS?',
        answer: `${AIIMS_GLOSS}. AIIMS-trained faculty bring the depth IB HL Biology rewards.`,
      },
    ],
    related: [
      { label: 'IB Biology by school', href: '/ib-biology-tuition' },
      { label: 'IB Biology IA help', href: '/ib-biology-ia-help' },
      { label: 'Global biology hub', href: '/best-biology-tutor-global' },
    ],
    keywords: [
      'IB Biology tutor',
      'IB Biology HL tutor',
      'IB Biology SL tutor',
      'IB Biology tutor online',
      'IB Biology IA help',
      'IB Biology Extended Essay',
    ],
    metaTitle: 'IB Biology Tutor HL/SL (Online, Worldwide) | Cerebrum',
    metaDescription:
      'Specialist IB Biology HL/SL tuition for students at any IB World School worldwide — full syllabus, Paper 1/2/3 technique, IA & EE mentorship. AIIMS-trained faculty, live online in your time zone. Free trial.',
  },
  // ── A-Level Biology ───────────────────────────────────────────────
  {
    slug: 'a-level-biology',
    routeSlug: 'a-level-biology-tutor-global',
    exam: 'A-Level Biology',
    eyebrow: 'A-Level Biology · every board · worldwide',
    tagline: 'every exam board, for A-Level students anywhere.',
    heroBlurb:
      'Specialist A-Level Biology tuition for students anywhere in the world — in the UK, or at British/international schools abroad following AQA, OCR, Edexcel, WJEC/Eduqas or Cambridge International (9700). We teach to your exact board’s papers, required practicals and exam technique. Live online in your time zone, any nationality.',
    whoFor:
      'Any A-Level Biology student — in the UK or at a British/international school overseas, on any exam board. No nationality assumed.',
    coversLabel: 'What we coach',
    covers: [
      'Every board: AQA (7402), OCR (H420), Edexcel (SNAB 9BN0), WJEC/Eduqas, Cambridge International (9700)',
      'Paper-by-paper coverage mapped to your exact specification',
      'Required practicals / PAGs / core practicals — and the Cambridge examined practical',
      'Synoptic technique (the AQA essay, the OCR Unified paper)',
      'Exam-technique and past-paper drilling to your board’s mark scheme',
      'Diagnostic-led plan to your exam series',
    ],
    whyPoints: [
      {
        title: 'Board-specific, not generic',
        text: 'We teach to your exact board — AQA, OCR, Edexcel, WJEC/Eduqas or Cambridge International — not a one-size syllabus.',
      },
      {
        title: 'Clinical-depth specialist faculty',
        text: `Faculty trained at ${AIIMS_GLOSS} — depth that strengthens A-Level synoptic and practical reasoning.`,
      },
      {
        title: 'Any country, your time zone',
        text: 'Live online around your school day, recorded for revision.',
      },
    ],
    faqs: [
      {
        question: 'Do you cover my A-Level exam board?',
        answer:
          'Yes — AQA, OCR (Biology A), Edexcel (Salters-Nuffield), WJEC/Eduqas and Cambridge International (9700), each taught to its exact papers and practical model. Cambridge International is the common board at international schools worldwide.',
      },
      {
        question: 'I’m at an international school outside the UK — can you help?',
        answer:
          'Yes. Many international schools follow Cambridge International or Edexcel International A-Level. We coach A-Level Biology students of any nationality, anywhere, live online in your time zone.',
      },
      {
        question: 'What is AIIMS?',
        answer: `${AIIMS_GLOSS}. AIIMS-trained faculty bring depth to A-Level synoptic and practical work.`,
      },
    ],
    related: [
      { label: 'A-Level by exam board', href: '/a-level-biology-tutor' },
      {
        label: 'Cambridge International (9700)',
        href: '/cambridge-international-a-level-biology-tutor',
      },
      { label: 'UK biology hub', href: '/best-biology-tutor-uk' },
    ],
    keywords: [
      'A-level biology tutor',
      'A-level biology tutor online',
      'A-level biology tutor international',
      'Cambridge International biology tutor',
      'best A-level biology tutor',
      'A-level biology revision',
    ],
    metaTitle: 'A-Level Biology Tutor (All Boards, Online Worldwide) | Cerebrum',
    metaDescription:
      'Specialist A-Level Biology tuition for students anywhere — AQA, OCR, Edexcel, WJEC/Eduqas, Cambridge International. Board-specific papers, required practicals, exam technique. AIIMS-trained faculty, live online. Free trial.',
  },
  // ── NEET Biology (global / online) ────────────────────────────────
  {
    slug: 'neet-biology',
    routeSlug: 'neet-biology-tutor-global',
    exam: 'NEET Biology (online, worldwide)',
    eyebrow: 'NEET Biology · online · any country',
    tagline: 'the 50% of NEET that decides ranks — from anywhere.',
    heroBlurb:
      'Specialist NEET Biology coaching delivered live online to students in any country — whether you are an Indian student abroad, an international applicant eligible for NEET, or preparing from within India online. Biology is 50% of NEET (360 of 720 marks); we coach Botany and Zoology to NCERT-line depth with a test-heavy regimen. Your time zone, small batches.',
    whoFor:
      'Any student preparing for NEET from anywhere — Indian students abroad, international applicants, and online learners in India. Time-zone-friendly worldwide.',
    coversLabel: 'What we coach',
    covers: [
      'Full Botany + Zoology to NCERT-line-by-line depth (Class 11 + 12)',
      'Biology is 50% of NEET (90 questions, 360 of 720 marks) — the decisive subject',
      'Test-heavy regimen with deep error analysis',
      'High-yield revision and spaced retrieval',
      'Diagnostic-led plan around your target NEET year',
      'Live online in your time zone, recorded sessions',
    ],
    whyPoints: [
      {
        title: 'AIIMS-trained biology specialists',
        text: `Faculty trained at ${AIIMS_GLOSS} — biology taught by people who topped the exam they teach.`,
      },
      {
        title: 'Biology is where ranks move',
        text: 'At 50% of the paper and the most NCERT-predictable subject, biology is the highest-leverage place to add marks — and our only subject.',
      },
      {
        title: 'From anywhere, your time zone',
        text: 'Live online classes scheduled around your time zone — no need to relocate to a coaching city.',
      },
    ],
    faqs: [
      {
        question: 'Can I prepare for NEET from outside India?',
        answer:
          'Yes. We coach NEET Biology live online to students anywhere — Indian students abroad and international applicants eligible for NEET — scheduled in your time zone, with recordings.',
      },
      {
        question: 'Why biology-focused for NEET?',
        answer:
          'Biology is 50% of NEET (360 of 720 marks) and the most NCERT-predictable, most scoring subject — the single biggest lever on your rank. It is our specialism.',
      },
      {
        question: 'What is AIIMS?',
        answer: `${AIIMS_GLOSS}. Our faculty trained there — they teach the biology that NEET rewards.`,
      },
    ],
    related: [
      { label: 'NEET coaching for NRIs (by country)', href: '/neet-coaching-nri-uk' },
      { label: 'NEET 2027 dropper biology', href: '/neet-dropper-biology-specialist-2027' },
      { label: 'Biology Scholarship Test', href: '/biology-scholarship-test' },
    ],
    keywords: [
      'NEET biology tutor online',
      'NEET biology coaching online',
      'online NEET biology classes',
      'NEET biology tutor abroad',
      'NEET coaching online worldwide',
      'NEET biology specialist',
    ],
    metaTitle: 'NEET Biology Tutor (Online, Any Country) | Cerebrum',
    metaDescription:
      'Specialist NEET Biology coaching delivered live online to students in any country — Botany + Zoology to NCERT depth, test-heavy, biology is 50% of NEET. AIIMS-trained faculty, your time zone. Free trial.',
  },
]

export const GLOBAL_EXAM_BY_SLUG: Record<string, GlobalExam> = GLOBAL_EXAMS.reduce(
  (acc, e) => {
    acc[e.slug] = e
    return acc
  },
  {} as Record<string, GlobalExam>
)
