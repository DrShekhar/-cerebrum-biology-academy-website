import { SEOLandingContent } from './types'

/**
 * Class 8 foundation biology content — greenfield early-NEET segment.
 * Cerebrum is a Biology specialist, so these pages own the biology-specific
 * "start early for a future medical/research career" intent rather than the
 * full PCM+M foundation that Aakash/Allen/Vedantu sell. No fabricated
 * testimonials or ratings; all-boards; NRI-aware.
 */

const foundationBase = {
  stats: [
    { value: '50%', label: 'of NEET is Biology', icon: 'target' },
    { value: '38', label: 'NCERT chapters ahead', icon: 'book' },
    { value: '6-25', label: 'Students per batch (by tier)', icon: 'users' },
    { value: 'Since 2014', label: 'Biology specialists', icon: 'clock' },
  ],
  testimonials: [],
  contactButtons: {
    whatsapp: {
      number: '918826444334',
      message:
        "Hi Cerebrum! I'm interested in early NEET biology foundation for my child. Please share details.",
    },
    phone: '+918826444334',
  },
}

export const neetFoundationClass8: SEOLandingContent = {
  ...foundationBase,
  slug: 'neet-foundation-class-8',
  classLevel: 'class-8',

  title: 'NEET Foundation Course Class 8 Biology | Early Medical Prep Online',
  metaDescription:
    'NEET Foundation biology for Class 8 — build the base for a future medical or research career, the right way and without pressure. Live online, all boards (CBSE/ICSE/IB/state), AIIMS-trained faculty, olympiad-ready. For students in India and abroad.',
  keywords: [
    'neet foundation course class 8',
    'neet foundation class 8',
    'class 8 biology for neet',
    'foundation course class 8 biology',
    'early neet preparation class 8',
    'class 8 biology olympiad foundation',
    'how to start neet from class 8',
    'class 8 science foundation neet online',
  ],

  hero: {
    headline: 'NEET Foundation Biology — Class 8',
    subheadline:
      'Class 8 is the sweet spot to start: old enough for real concepts, early enough to build them without pressure. We turn a curious 13-year-old into a confident biology thinker — the foundation every future doctor and researcher needs.',
    highlightedText: 'Start Early, the Calm Way — Not the Cramming Way',
    ctaText: 'Book a Free Demo Class',
    ctaLink: '/book-free-demo',
    backgroundGradient: 'from-green-800 via-green-900 to-green-800',
  },

  painPoints: {
    title: 'What Worries Parents of an Aspiring-Doctor Child',
    points: [
      {
        icon: 'clock',
        question: 'Is Class 8 too early to think about NEET?',
        solution:
          'No — but the goal is understanding, not exam pressure. 1-2 focused biology hours a week now saves frantic Class 11-12 cramming later.',
      },
      {
        icon: 'target',
        question: 'Will early coaching kill the joy of learning?',
        solution:
          'Ours does the opposite. Class 8 sessions are curiosity-led — real biology, experiments and visuals — so the love of the subject grows, not fear of an exam.',
      },
      {
        icon: 'book-open',
        question: 'Different board (CBSE / ICSE / IB) — does that matter?',
        solution:
          'No. We teach biology concepts that sit under every board and feed straight into NEET, and we align to your child’s school syllabus so school marks improve too.',
      },
      {
        icon: 'award',
        question: 'What if my child wants research or biotech, not just MBBS?',
        solution:
          'Same strong biology base serves both. We fold in biology-olympiad thinking (NSO / NTSE / biotech) so a future scientist is prepared too.',
      },
    ],
  },

  benefits: {
    title: 'Why a Class 8 Biology Foundation Pays Off',
    subtitle: 'Biology is 50% of NEET — the one subject worth starting early',
    items: [
      {
        icon: 'brain',
        title: 'Concepts, Not Cramming',
        description:
          'We build understanding of how life works, so later NEET topics feel familiar instead of frightening.',
      },
      {
        icon: 'book',
        title: 'School Marks Rise Too',
        description:
          'Aligned to your child’s board syllabus, so Class 8 science grades improve alongside the NEET base.',
      },
      {
        icon: 'award',
        title: 'Olympiad-Ready',
        description:
          'Early exposure to NSO / NTSE and biology-olympiad style questions builds confidence and a strong profile.',
      },
      {
        icon: 'microscope',
        title: 'Learning by Seeing',
        description:
          'Diagrams, models and simple experiments make biology visual and memorable at this age.',
      },
      {
        icon: 'users',
        title: 'Small Live Batches',
        description:
          '10-12 students per live online batch means real attention, not a passive recorded lecture.',
      },
      {
        icon: 'globe',
        title: 'India & Abroad',
        description:
          'Timezone-friendly online classes for students in India and NRI families in the Gulf, US, UK and beyond.',
      },
    ],
  },

  faqs: [
    {
      question: 'Is Class 8 a good time to start preparing for NEET?',
      answer:
        'Yes, for biology especially. Class 8 is early enough to build concepts calmly over several years and late enough for a child to grasp real biology. The aim at this stage is understanding and curiosity — roughly 1-2 focused hours a week — not intense exam drilling. Starting now spreads the learning out and removes the Class 11-12 pressure that overwhelms students who begin late.',
    },
    {
      question: 'How much NEET-level study should a Class 8 student actually do?',
      answer:
        'Little and often. A single weekly live biology class plus light practice is plenty. We deliberately keep it low-pressure: the point is to make biology a subject your child enjoys and understands, build good study habits, and stay comfortably ahead of the school syllabus — not to sacrifice childhood to early cramming.',
    },
    {
      question: 'My child is in ICSE / IB, not CBSE. Does this still work?',
      answer:
        'Absolutely. NEET is built on NCERT, but the underlying biology concepts are the same across CBSE, ICSE, IB and state boards. We teach those core concepts, align sessions to your child’s actual school syllabus so their board marks improve, and gradually introduce the NCERT framing NEET will later require.',
    },
    {
      question:
        'What if my child is interested in research or biotechnology, not just becoming a doctor?',
      answer:
        'The same biology foundation serves both paths. A future researcher, biotechnologist or biologist needs exactly the deep conceptual base we build — and we add biology-olympiad and science-olympiad (NSO, NTSE, biotech) thinking that suits a research-minded child. Many students keep both the NEET and the research door open through school; a strong biology base does not close either.',
    },
    {
      question: 'Are the classes live or recorded?',
      answer:
        'Live and interactive, in small batches of 10-12 students, so your child can ask questions in real time — which matters a lot at this age. Recordings are provided for revision, but the core learning happens in the live session with an AIIMS-trained biology teacher.',
    },
    {
      question: 'Can NRI students abroad join the Class 8 biology foundation?',
      answer:
        'Yes. We run timezone-friendly online batches for Indian-origin students in the Gulf, USA, UK, Canada, Singapore and elsewhere, whether they follow CBSE, IB, IGCSE or an American curriculum. Starting the NEET biology base early is especially valuable for NRI families, since school abroad is not aligned to the NCERT framework NEET uses.',
    },
    {
      question: 'Do you also help with school exams, or only NEET?',
      answer:
        'Both, from the same class. We align to your child’s Class 8 board syllabus so school science marks improve, while quietly building the NEET-relevant biology depth underneath. Parents see immediate school results and long-term NEET readiness together.',
    },
  ],

  cta: {
    title: 'Give Your Child a Head Start in Biology',
    subtitle:
      'Calm, curiosity-led NEET biology foundation for Class 8 — live online, small batches, AIIMS faculty. For future doctors and future researchers alike.',
    primaryButton: { text: 'Book a Free Demo Class', link: '/book-free-demo' },
    secondaryButton: {
      text: 'See the Foundation Programme',
      link: '/neet-biology-foundation-class-6-to-8',
    },
    tertiaryButton: { text: 'Explore Class 9 Foundation', link: '/neet-foundation-class-9' },
  },

  toolsCTA: {
    title: 'Explore Free Biology Resources',
    tools: [
      {
        name: 'Free NEET Biology Notes',
        description: 'NCERT-based notes and diagrams to explore biology early.',
        link: '/free-neet-biology-ncert-notes',
        icon: 'notes',
      },
      {
        name: 'Biology Olympiads',
        description:
          'How early biology olympiads (NSO, NTSE, INBO) build a medical/research profile.',
        link: '/biology-olympiads',
        icon: 'quiz',
      },
    ],
  },

  relatedPages: [
    { title: 'Class 6-8 Foundation Programme', link: '/neet-biology-foundation-class-6-to-8' },
    { title: 'NEET Foundation Class 7', link: '/neet-foundation-class-7' },
    { title: 'NEET Foundation Class 9', link: '/neet-foundation-class-9' },
    { title: 'Biology Olympiads', link: '/biology-olympiads' },
    { title: 'NEET Coaching for NRI Students', link: '/nri-students' },
  ],

  deepContent: {
    paragraphs: [
      {
        heading: 'Why Class 8 Is the Right Time to Start Biology for NEET',
        body: 'Parents of a future-doctor child often ask whether Class 8 is too early. For biology, it is close to ideal. A Class 8 student is old enough to genuinely understand cells, tissues, digestion and the living world, yet years away from board and NEET pressure — which means concepts can be built slowly, revisited, and enjoyed. Because biology makes up 50 percent of NEET (360 of 720 marks), it is the single subject where an early, unhurried start compounds the most. The students who struggle in Class 11 and 12 are almost always the ones who met these ideas for the first time under exam pressure. Starting in Class 8 flips that: by the time NEET preparation formally begins, the biology already feels like an old friend.',
      },
      {
        heading: 'Foundation, Not Pressure — How We Teach 13-Year-Olds',
        body: 'Early preparation done wrong creates burnout; done right it creates curiosity. Our Class 8 biology sessions are deliberately light in load and rich in wonder — roughly one focused live class a week, taught with diagrams, models and simple experiments rather than rote memorisation. We connect what a child learns in school to the bigger picture of how living things work, so the subject feels alive. The measurable outcome is twofold: school science marks rise because we align to the board syllabus, and a durable NEET-relevant base forms underneath without the child ever feeling they are "doing NEET" at 13.',
      },
      {
        heading: 'For Future Doctors and Future Researchers Both',
        body: 'Not every biology-loving child wants MBBS — some are drawn to research, biotechnology, genetics or the biological sciences. The good news is that the foundation is identical. A deep, conceptual grasp of biology is exactly what a future medical student and a future scientist both need, and it keeps every door open through the school years. For research-minded students we lean into biology-olympiad and science-olympiad thinking (NSO, NTSE, and the national biology-olympiad ladder that leads to INBO and the International Biology Olympiad), which stretches able students and builds a standout academic profile. Because Cerebrum is a biology specialist rather than a general PCM+M coaching chain, this is the depth we are built to deliver.',
      },
    ],
    checklist: [
      {
        item: 'Keep it to one focused biology class a week',
        explanation: 'At Class 8 the goal is understanding and habit, not hours logged.',
      },
      {
        item: 'Prioritise concepts and curiosity over memorisation',
        explanation: 'Diagrams, experiments and real-world links build durable understanding.',
      },
      {
        item: 'Align early work to the school board syllabus',
        explanation: 'School marks improve now while the NEET base forms underneath.',
      },
      {
        item: 'Add an age-appropriate olympiad (NSO / NTSE)',
        explanation: 'Stretches an able child and builds a strong medical/research profile.',
      },
    ],
  },

  courseSummary: {
    title: 'Class 8 Biology Foundation',
    duration: 'Yearly Programme',
    batchSize: '6-25 Students (by tier)',
    features: [
      'One live interactive biology class per week',
      'Aligned to CBSE / ICSE / IB / state board syllabus',
      'Concept-first teaching with diagrams and experiments',
      'Olympiad (NSO / NTSE) orientation for able students',
      'Recordings and notes for revision',
      'AIIMS-trained biology faculty',
    ],
    price: { original: 45000, emi: 'Flexible plans' },
  },

  schema: {
    '@type': 'Course',
    courseName: 'NEET Foundation Biology — Class 8',
    provider: 'Cerebrum Biology Academy',
    description:
      'Early NEET biology foundation for Class 8: concept-first, low-pressure, all-boards, olympiad-ready. Live online for students in India and abroad.',
    duration: 'P1Y',
    price: 45000,
    priceCurrency: 'INR',
    educationalLevel: 'Class 8 (Foundation)',
  },
}

export const class8SEOPages = {
  'neet-foundation-class-8': neetFoundationClass8,
}
