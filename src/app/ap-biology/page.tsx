import type { Metadata } from 'next'
import Link from 'next/link'
import { FAQSchema } from '@/components/seo/FAQSchema'
import { BreadcrumbSchema } from '@/components/seo/BreadcrumbSchema'
import { CerebrumPersonSchema } from '@/components/seo/CerebrumPersonSchema'
import {
  ArrowRight,
  BookOpen,
  Globe,
  Target,
  Users,
  Award,
  MessageCircle,
  GraduationCap,
  DollarSign,
  Sparkles,
} from 'lucide-react'

const PAGE_URL = 'https://cerebrumbiologyacademy.com/ap-biology'

export const metadata: Metadata = {
  title: 'AP Biology Tutoring Hub | Score-5 Coaching, FRQ Mastery | Cerebrum',
  description:
    'Biology-only specialist AP Biology tutors — beat other generalist test-prep brands/Princeton on per-section depth. Score-5 study guide, FRQ rubric mastery, AAMC-to-NCERT crosswalk, US metros + APAC + UAE + India coverage.',
  keywords: [
    'AP Biology',
    'AP Biology tutor',
    'AP Biology tutoring',
    'AP Biology score 5',
    'AP Biology FRQ',
    'AP Biology online tutor',
    'AP Biology CED',
    'College Board AP Biology',
    'AP Biology Units 1-8',
    'AP Biology MCAT prep',
  ],
  openGraph: {
    title: 'AP Biology Tutoring Hub | Score-5 Coaching, FRQ Mastery',
    description:
      'Biology-only specialist AP Biology tutors. Score-5 study guide, FRQ rubric mastery, AAMC-to-NCERT crosswalk. US + APAC + UAE + India coverage.',
    type: 'website',
    url: PAGE_URL,
    siteName: 'Cerebrum Biology Academy',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AP Biology Tutoring Hub | Cerebrum',
    description:
      'Biology-only specialist AP Biology tutors. Score-5 coaching, FRQ mastery, AAMC-to-NCERT crosswalk.',
  },
  alternates: {
    canonical: PAGE_URL,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
}

const hubFAQs = [
  {
    question: 'What is AP Biology and what does the College Board CED cover?',
    answer:
      'AP Biology is a College-Board administered, college-level introductory biology course taken by US high-school students (typically Grade 11 or 12). The Course and Exam Description (CED) organizes content into 8 units — Unit 1: Chemistry of Life; Unit 2: Cell Structure and Function; Unit 3: Cellular Energetics; Unit 4: Cell Communication and Cell Cycle; Unit 5: Heredity; Unit 6: Gene Expression and Regulation; Unit 7: Natural Selection; Unit 8: Ecology. The exam is 3 hours long — 60 multiple-choice questions (50% of score) and 6 free-response questions (50% of score). Scores range from 1 to 5; a 4 or 5 typically earns college credit.',
  },
  {
    question: 'Why pick a biology-only specialist tutor over other generalist MCAT brands?',
    answer:
      'Generalist test-prep companies like other generalist test-prep brands and other generalist test-prep brands staff tutors who teach Biology, Chemistry, Physics, English, and Maths interchangeably — they are exam-format experts, not subject experts. Cerebrum tutors only teach Biology, every day, across NEET, IB HL, AP Biology, MCAT B/B, USABO, and IBO. That depth shows up in three places: (1) FRQ scoring — we know exactly which Big-Idea language anchors a rubric point; (2) misconception repair — we have seen the same wrong mental model thousands of times; (3) cross-curriculum bridging — for Indian-American students we can map AP CED topics directly to NCERT chapter equivalents. The trade-off: we cost less per hour than other generalist test-prep brands ($120-150 vs their $200+) because we do not subsidize departments we do not run.',
  },
  {
    question: 'What does AP Biology tutoring cost at Cerebrum?',
    answer:
      'We offer four tiers. Senior Faculty 1:1 (taught by Dr. Shekhar Singh or equivalent lead faculty): $120-$150 per hour. Junior Faculty 1:1 (vetted associate tutors, fully supervised): $60-$75 per hour. Small-batch group classes (4-8 students, same cohort, fixed schedule): $40 per hour per student. Packaged programs: $499 for an 8-session targeted unit pack, $999 for a full-semester score-5 program, $1,499 for the year-long premium track including FRQ workshops, mock exams, and unlimited WhatsApp support. Pricing is in USD; INR-equivalent pricing is shown automatically for visitors from India.',
  },
  {
    question: 'How does Cerebrum approach AP Biology FRQ strategy?',
    answer:
      'Free-response questions are where most 4s drop to 3s. We train students against the official College Board rubric — every released FRQ from 2013 to 2024, scored line by line. Our FRQ method is: (1) deconstruct the prompt verbs (justify, predict, calculate, identify, describe) — each demands a different answer structure; (2) write to the rubric point, not to general "biology knowledge" — graders reward specific Big-Idea language; (3) use the experimental-design template (independent variable, dependent variable, control, replication, prediction with reasoning) for any data-analysis FRQ; (4) practice timed FRQs weekly with red-pen feedback from a senior tutor. Students typically gain 1-2 rubric points per FRQ after 6-8 weeks.',
  },
  {
    question: 'How does the AAMC-to-NCERT crosswalk help Indian-American or NRI students?',
    answer:
      'Indian-American students often arrive at AP Biology already familiar with NCERT Class 11 and Class 12 biology — but the topic order, depth, and naming conventions differ. The AAMC framework (used in MCAT Biology/Biochemistry) sits one level higher than AP Biology but uses similar concepts. We provide a side-by-side crosswalk: for every AP CED unit, the matching NCERT chapter, the matching AAMC content category, and the depth-delta (what AP adds vs NCERT, what NCERT covers in more detail). This helps families who plan a Biology track that goes from CBSE Class 11-12 → AP Biology in junior year → MCAT B/B for US medical school applications — a path roughly 15% of our students follow.',
  },
  {
    question: 'Where does Cerebrum offer AP Biology tutoring — only in the US?',
    answer:
      'No — AP Biology is offered worldwide and so are we. Our largest student bases are: US metros (Bay Area, Boston, Houston-Dallas, Atlanta, Los Angeles, Chicago, NYC, Northern Virginia, New Jersey, Seattle); APAC (Singapore, Hong Kong); UAE (Dubai, Abu Dhabi); India (Mumbai, Delhi NCR, Gurugram, Bangalore, Hyderabad — many students take AP through online providers like Pamoja or for US college admissions); Canada (Vancouver, Toronto-GTA, Brampton-Mississauga). All classes are timezone-aware — same senior faculty teach Bay Area students in PST and Dubai students in GST.',
  },
  {
    question: 'When should an AP Biology student start with a tutor?',
    answer:
      'Three windows work best. (1) Summer before AP Biology — pre-read Units 1-3 and build the foundational chemistry-of-life vocabulary; this is the highest-leverage window and we run intensive summer bootcamps. (2) During the school year, weekly 1.5-2 hour sessions tracking the school syllabus — best for students aiming to go from a B/3 to an A/5. (3) The 8-12 week pre-exam crash window (Feb-May) — focused on FRQ mastery, full-length mocks, and unit-weakness repair. Students who start in summer and continue weekly through the year hit score-5 at the highest rate (~78% in our 2024-25 cohort).',
  },
  {
    question: 'How do I book a free demo with an AP Biology tutor?',
    answer:
      "Book a free 30-minute demo at /book-free-demo or message us on WhatsApp at +91 88264 44334. In the demo, a senior tutor diagnoses the student's current AP Biology level using a 10-minute placement quiz, walks through one FRQ together, identifies the top two unit weaknesses, and recommends the right tier (1:1 senior, 1:1 junior, small batch, or one of the $499/$999/$1,499 packages). No payment is taken at the demo. If the family wants to enrol, the first paid session is scheduled within 48 hours.",
  },
]

const serviceHubs = [
  {
    title: 'AP Biology Tutor (Service Hub)',
    href: '/ap-biology-tutor',
    description:
      'Canonical service page — meet the faculty, see the four tier matrix, browse student outcomes by metro.',
    icon: Users,
    accent: 'text-blue-600',
  },
  {
    title: 'AP Biology Online Tutor',
    href: '/ap-biology-online-tutor',
    description:
      'Live online AP Biology classes across PST, EST, GMT, GST, IST, SGT. Interactive whiteboard, recorded sessions.',
    icon: Globe,
    accent: 'text-green-600',
  },
  {
    title: 'Best AP Biology Tutor (USA)',
    href: '/best-ap-biology-tutor-usa',
    description:
      'Why specialist-tutor outcomes beat the other generalist test-prep brands/Princeton/Khan generic-test-prep model — head-to-head comparison.',
    icon: Award,
    accent: 'text-purple-600',
  },
  {
    title: 'AP Biology for Class 11 (India)',
    href: '/ap-biology-class-11',
    description:
      'For Indian-American and NRI students stacking AP Biology on top of CBSE Class 11 — the dual-track playbook.',
    icon: GraduationCap,
    accent: 'text-orange-600',
  },
]

const topicalResources = [
  {
    title: 'Score-5 Study Guide',
    href: '/ap-biology-score-5-study-guide',
    description:
      'The exact 12-week study plan we use with score-5 cohorts — unit-by-unit milestone schedule, FRQ practice cadence, mock-exam targets.',
  },
  {
    title: 'FRQ Rubric Mastery',
    href: '/ap-biology-frq-rubric-mastery',
    description:
      'Deconstruct every College Board FRQ scoring rubric from 2013 to 2024. Verb-by-verb breakdown of justify, predict, calculate, identify, describe.',
  },
  {
    title: 'AP Biology Anki Deck',
    href: '/ap-biology-anki-deck',
    description:
      'Spaced-repetition deck covering all 8 CED units. Card design tested with 1,000+ students; image-occlusion for membrane transport, signal cascades, gene regulation.',
  },
  {
    title: 'AP Biology → NEET Preparation',
    href: '/ap-biology-to-neet-preparation',
    description:
      'For Indian-American students returning to India for medical school — bridge AP Biology into NEET-UG prep. Syllabus crosswalk + depth-delta guide.',
  },
  {
    title: 'AP Bio vs College Bio / MCAT Bridge',
    href: '/ap-biology-vs-college-bio-mcat-bridge',
    description:
      'How AP Biology maps onto first-year undergraduate biology and the MCAT B/B section. The 3-year track from AP to MCAT scoring 515+.',
  },
]

const usMetros = [
  { label: 'Bay Area', href: '/ap-biology-tutor-bay-area' },
  { label: 'Boston', href: '/ap-biology-tutor-boston' },
  { label: 'Houston / Dallas', href: '/ap-biology-tutor-houston-dallas' },
  { label: 'Atlanta', href: '/ap-biology-tutor-atlanta' },
  { label: 'Los Angeles', href: '/ap-biology-tutor-los-angeles' },
  { label: 'Chicago', href: '/ap-biology-tutor-chicago' },
]

const apacUaeMetros = [
  { label: 'Singapore', href: '/ap-biology-tutor-singapore' },
  { label: 'Hong Kong', href: '/ap-biology-tutor-hong-kong' },
  { label: 'Dubai', href: '/ap-biology-tutor-dubai' },
  { label: 'Abu Dhabi', href: '/ap-biology-tutor-abu-dhabi' },
]

const indiaCities = [
  {
    label: 'India for US College Admissions',
    href: '/ap-biology-tutor-india-for-us-college-admissions',
  },
  { label: 'Delhi NCR', href: '/ap-biology-tutor-delhi-ncr' },
  { label: 'Mumbai', href: '/ap-biology-tutor-mumbai' },
]

const canadaCities = [
  { label: 'Brampton / Mississauga', href: '/ap-biology-tutor-brampton-mississauga' },
  { label: 'Vancouver', href: '/ap-biology-tutor-vancouver' },
]

const pricingTiers = [
  {
    title: 'Senior Faculty 1:1',
    price: '$120 – $150 / hour',
    bestFor:
      'Score-5 targets, FRQ deep-work, MCAT-bridge students, AP scholar/national-AP-scholar push.',
    features: [
      'Dr. Shekhar Singh or equivalent lead faculty',
      '15+ years AP / NEET / MCAT teaching',
      'Full FRQ rubric mastery feedback',
      'Direct WhatsApp access',
    ],
    accent: 'border-purple-300 bg-purple-50',
    badge: 'Premium',
  },
  {
    title: 'Junior Faculty 1:1',
    price: '$60 – $75 / hour',
    bestFor:
      'Students moving from a 3 to a 4, ongoing weekly support, post-class concept reinforcement.',
    features: [
      'Vetted associate tutors',
      'All sessions supervised by senior faculty',
      'Standard FRQ feedback included',
      'Email + WhatsApp support',
    ],
    accent: 'border-blue-300 bg-blue-50',
    badge: 'Most Popular',
  },
  {
    title: 'Small Batch (4-8)',
    price: '$40 / hour per student',
    bestFor: 'Cost-conscious families, classroom-format learners, social-learning motivated kids.',
    features: [
      'Same cohort, fixed schedule',
      '4-8 students per batch',
      'Group FRQ workshops',
      'Recorded sessions for review',
    ],
    accent: 'border-green-300 bg-green-50',
    badge: 'Best Value',
  },
  {
    title: 'Packaged Programs',
    price: '$499 / $999 / $1,499',
    bestFor:
      'Unit packs ($499 / 8 sessions), full-semester score-5 ($999), year-long premium ($1,499).',
    features: [
      '$499 — Targeted 8-session unit pack',
      '$999 — Full-semester score-5 program',
      '$1,499 — Year-long premium track',
      'Mock exams + FRQ workshops bundled',
    ],
    accent: 'border-orange-300 bg-orange-50',
    badge: 'Bundle',
  },
]

const cedUnits = [
  { unit: 'Unit 1', title: 'Chemistry of Life', weight: '8-11%' },
  { unit: 'Unit 2', title: 'Cell Structure and Function', weight: '10-13%' },
  { unit: 'Unit 3', title: 'Cellular Energetics', weight: '12-16%' },
  { unit: 'Unit 4', title: 'Cell Communication and Cell Cycle', weight: '10-15%' },
  { unit: 'Unit 5', title: 'Heredity', weight: '8-11%' },
  { unit: 'Unit 6', title: 'Gene Expression and Regulation', weight: '12-16%' },
  { unit: 'Unit 7', title: 'Natural Selection', weight: '13-20%' },
  { unit: 'Unit 8', title: 'Ecology', weight: '10-15%' },
]

function HubCollectionSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'AP Biology Tutoring Hub',
    description:
      'Biology-only specialist AP Biology tutoring — score-5 coaching, FRQ rubric mastery, AAMC-to-NCERT crosswalk, College Board CED-aligned classes across US, APAC, UAE, India, and Canada.',
    url: PAGE_URL,
    isPartOf: {
      '@type': 'WebSite',
      name: 'Cerebrum Biology Academy',
      url: 'https://cerebrumbiologyacademy.com',
    },
    provider: {
      '@type': 'EducationalOrganization',
      name: 'Cerebrum Biology Academy',
      url: 'https://cerebrumbiologyacademy.com',
    },
    about: {
      '@type': 'Thing',
      name: 'AP Biology (Advanced Placement Biology)',
      description:
        'College Board Advanced Placement Biology — college-level introductory biology, 8 units, FRQ + MCQ exam, scored 1-5.',
    },
    hasPart: [
      {
        '@type': 'WebPage',
        url: 'https://cerebrumbiologyacademy.com/ap-biology-tutor',
        name: 'AP Biology Tutor',
      },
      {
        '@type': 'WebPage',
        url: 'https://cerebrumbiologyacademy.com/ap-biology-online-tutor',
        name: 'AP Biology Online Tutor',
      },
      {
        '@type': 'WebPage',
        url: 'https://cerebrumbiologyacademy.com/ap-biology-score-5-study-guide',
        name: 'AP Biology Score-5 Study Guide',
      },
      {
        '@type': 'WebPage',
        url: 'https://cerebrumbiologyacademy.com/ap-biology-frq-rubric-mastery',
        name: 'AP Biology FRQ Rubric Mastery',
      },
      {
        '@type': 'WebPage',
        url: 'https://cerebrumbiologyacademy.com/ap-biology-vs-college-bio-mcat-bridge',
        name: 'AP Biology vs College Bio / MCAT Bridge',
      },
    ],
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

export default function APBiologyHubPage() {
  return (
    <>
      <HubCollectionSchema />
      <FAQSchema questions={hubFAQs} pageUrl={PAGE_URL} />
      <BreadcrumbSchema items={[{ label: 'AP Biology', isCurrentPage: true }]} showSchemaOnly />
      <CerebrumPersonSchema
        knowsAbout={[
          'AP Biology Tutoring',
          'AP Biology FRQ Strategy',
          'AP Biology Score-5 Outcomes',
          'AAMC to NCERT Crosswalk',
          'College Board AP Biology CED',
        ]}
      />

      <main className="min-h-screen bg-white">
        {/* Hero */}
        <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800 text-white">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-20 left-10 h-72 w-72 rounded-full bg-blue-500 blur-3xl" />
            <div className="absolute bottom-20 right-10 h-96 w-96 rounded-full bg-purple-500 blur-3xl" />
          </div>
          <div className="relative mx-auto max-w-5xl px-4 py-16 sm:px-6 sm:py-24">
            <nav aria-label="Breadcrumb" className="mb-6 text-sm text-slate-300">
              <ol className="flex flex-wrap items-center gap-2">
                <li>
                  <Link href="/" className="hover:text-white">
                    Home
                  </Link>
                </li>
                <li>/</li>
                <li aria-current="page" className="font-medium text-white">
                  AP Biology
                </li>
              </ol>
            </nav>

            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-blue-500/20 px-4 py-2 text-sm font-medium text-blue-300">
              <Sparkles className="h-4 w-4" />
              Biology-Only Specialists · CED 2020+ Aligned · Score-5 Outcomes
            </div>

            <h1 className="mb-6 text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
              AP Biology Tutoring Hub
              <span className="mt-2 block text-blue-400">— Cerebrum Biology Academy</span>
            </h1>

            <p className="mb-8 max-w-3xl text-lg text-gray-300 sm:text-xl">
              Biology-only specialist tutors beat generalist test-prep on every metric that matters
              — FRQ rubric depth, misconception repair, and AAMC-to-NCERT bridge for Indian-American
              and NRI students. Live online classes across US, APAC, UAE, India, and Canada.
            </p>

            <div className="flex flex-col gap-4 sm:flex-row">
              <Link
                href="/book-free-demo"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-500 px-8 py-4 text-lg font-semibold text-white shadow-lg shadow-blue-500/25 transition-all hover:bg-blue-600"
              >
                Book Free Demo
                <ArrowRight className="h-5 w-5" />
              </Link>
              <a
                href={`https://wa.me/918826444334?text=${encodeURIComponent("Hi! I'm interested in AP Biology tutoring. Please share program details.")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-xl border-2 border-white/30 px-8 py-4 text-lg font-semibold text-white transition-all hover:border-white/60"
              >
                <MessageCircle className="h-5 w-5" />
                WhatsApp a Counsellor
              </a>
            </div>
          </div>
        </section>

        {/* Service hubs */}
        <section className="py-16 sm:py-20">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="mb-12 text-center">
              <h2 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl">
                AP Biology Programs
              </h2>
              <p className="mx-auto max-w-2xl text-lg text-gray-600">
                Four service hubs — pick the format that matches your goal, your timezone, and your
                background.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {serviceHubs.map((resource) => (
                <Link
                  key={resource.href}
                  href={resource.href}
                  className="group rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:border-blue-300 hover:shadow-md sm:p-8"
                >
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gray-50">
                    <resource.icon className={`h-6 w-6 ${resource.accent}`} />
                  </div>
                  <h3 className="mb-2 text-xl font-bold text-gray-900 group-hover:text-blue-700">
                    {resource.title}
                  </h3>
                  <p className="mb-4 text-gray-600">{resource.description}</p>
                  <span className="inline-flex items-center gap-1 text-sm font-semibold text-blue-600 transition-all group-hover:gap-2">
                    Learn more
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* What AP Biology is — CED units */}
        <section className="bg-gray-50 py-16 sm:py-20">
          <div className="mx-auto max-w-5xl px-4 sm:px-6">
            <div className="mb-10 text-center">
              <h2 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl">
                What AP Biology Is — The College Board CED
              </h2>
              <p className="mx-auto max-w-3xl text-lg text-gray-600">
                The Course and Exam Description (CED) organizes AP Biology into 8 units. The exam is
                3 hours — 60 MCQs (50%) and 6 FRQs (50%). Scores: 1–5; a 4 or 5 typically earns
                college credit.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {cedUnits.map((u) => (
                <div
                  key={u.unit}
                  className="flex items-start justify-between gap-4 rounded-xl border border-gray-200 bg-white p-5"
                >
                  <div>
                    <div className="text-sm font-semibold text-blue-700">{u.unit}</div>
                    <div className="text-lg font-bold text-gray-900">{u.title}</div>
                  </div>
                  <div className="shrink-0 rounded-full bg-blue-50 px-3 py-1 text-sm font-semibold text-blue-800">
                    {u.weight}
                  </div>
                </div>
              ))}
            </div>

            <p className="mt-8 text-sm text-gray-600">
              Source: College Board AP Biology Course and Exam Description (current edition).
              Cerebrum classes are aligned to the published CED, with internal unit-mastery
              checkpoints every 2–3 weeks.
            </p>
          </div>
        </section>

        {/* Why specialist beats generalist */}
        <section className="py-16 sm:py-20">
          <div className="mx-auto max-w-4xl px-4 sm:px-6">
            <h2 className="mb-6 text-3xl font-bold text-gray-900 sm:text-4xl">
              Why a Biology-Only Specialist Beats other generalist MCAT brands
            </h2>
            <div className="prose prose-lg max-w-none text-gray-700">
              <p>
                Generalist test-prep companies staff tutors who teach Biology, Chemistry, Physics,
                English, and Maths interchangeably. They are <strong>exam-format experts</strong>,
                not subject experts. Cerebrum tutors only teach Biology — every day, across NEET, IB
                HL, AP Biology, MCAT B/B, USABO, and IBO.
              </p>
              <p>That depth shows up in three concrete places:</p>
              <ol>
                <li>
                  <strong>FRQ scoring.</strong> We know exactly which Big-Idea language anchors a
                  rubric point. A generalist tutor sees "describe the mechanism" — we see "this is a
                  Big Idea 3 / Topic 3.4 cell-signaling question, the rubric awards specifically for
                  ligand-receptor specificity and downstream cascade order."
                </li>
                <li>
                  <strong>Misconception repair.</strong> We have seen the same wrong mental model
                  thousands of times — chromosomes vs chromatids, transcription vs translation
                  directionality, allopatric vs sympatric. Pattern-matching to root cause is faster
                  than re-teaching from scratch.
                </li>
                <li>
                  <strong>Cross-curriculum bridging.</strong> For Indian-American students we map AP
                  CED topics directly to NCERT chapter equivalents — saving 30–40% of study time for
                  the topics already covered in CBSE Class 11–12.
                </li>
              </ol>
              <p>
                The trade-off is honest: we cost less per hour than other generalist test-prep brands ($120–$150 vs their
                $200+) because we do not subsidize departments we do not run. other generalist test-prep brands needs to fund
                LSAT, MCAT, GRE, GMAT, USMLE, NCLEX, and SAT teams from the same fee base. Cerebrum
                only teaches Biology.
              </p>
            </div>
          </div>
        </section>

        {/* Pricing matrix */}
        <section className="bg-gradient-to-br from-slate-50 to-blue-50 py-16 sm:py-20">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="mb-10 text-center">
              <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-blue-100 px-3 py-1 text-sm font-semibold text-blue-800">
                <DollarSign className="h-4 w-4" />
                Transparent USD Pricing
              </div>
              <h2 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl">
                AP Biology Tutoring — Pricing Matrix
              </h2>
              <p className="mx-auto max-w-2xl text-lg text-gray-600">
                Four tiers. No hidden fees, no upsell pressure. Pricing in USD; INR-equivalent shown
                to visitors from India.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {pricingTiers.map((tier) => (
                <div key={tier.title} className={`rounded-2xl border-2 p-6 sm:p-8 ${tier.accent}`}>
                  <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 text-xs font-semibold uppercase tracking-wide text-gray-700 shadow-sm">
                    {tier.badge}
                  </div>
                  <h3 className="mb-2 text-xl font-bold text-gray-900">{tier.title}</h3>
                  <div className="mb-3 text-2xl font-bold text-gray-900">{tier.price}</div>
                  <p className="mb-4 text-sm text-gray-700">
                    <strong>Best for:</strong> {tier.bestFor}
                  </p>
                  <ul className="space-y-2 text-sm text-gray-700">
                    {tier.features.map((f) => (
                      <li key={f} className="flex items-start gap-2">
                        <span className="mt-1 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-gray-600" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="mt-10 text-center">
              <Link
                href="/book-free-demo"
                className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-8 py-4 text-lg font-semibold text-white shadow-lg hover:bg-blue-700"
              >
                Book a Free Demo to Pick a Tier
                <ArrowRight className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </section>

        {/* FRQ strategy */}
        <section className="py-16 sm:py-20">
          <div className="mx-auto max-w-4xl px-4 sm:px-6">
            <h2 className="mb-6 text-3xl font-bold text-gray-900 sm:text-4xl">
              FRQ Strategy — Where Most 4s Drop to 3s
            </h2>
            <div className="prose prose-lg max-w-none text-gray-700">
              <p>
                Free-response questions are 50% of your AP Biology score and the place where most
                students with strong MCQ scores still drop a grade. The reason is almost always the
                same — students write what they <em>know</em>, not what the <em>rubric</em> asks
                for. Our FRQ method is four steps:
              </p>
              <ol>
                <li>
                  <strong>Deconstruct the prompt verbs.</strong> "Justify" demands a claim with
                  evidence; "predict" demands a directional outcome with mechanism; "calculate"
                  demands a numerical answer with the formula shown; "identify" demands a one-word
                  or one-phrase answer (do not over-write); "describe" demands a structural or
                  process account in order.
                </li>
                <li>
                  <strong>Write to the rubric point, not to general biology knowledge.</strong>{' '}
                  Graders are looking for specific Big-Idea language. Generic biology answers miss
                  specific rubric anchors.
                </li>
                <li>
                  <strong>Use the experimental-design template.</strong> For any data-analysis FRQ —
                  state the independent variable, the dependent variable, the control, replication
                  strategy, and the prediction with reasoning. This template covers 60%+ of the
                  points on any data FRQ.
                </li>
                <li>
                  <strong>Practice timed FRQs weekly with red-pen feedback.</strong> Volume alone
                  doesn't work — graded feedback from a senior tutor closes the gap. Our students
                  typically gain 1–2 rubric points per FRQ after 6–8 weeks.
                </li>
              </ol>
            </div>

            <div className="mt-8">
              <Link
                href="/ap-biology-frq-rubric-mastery"
                className="inline-flex items-center gap-2 text-base font-semibold text-blue-700 hover:text-blue-800"
              >
                Read the full FRQ rubric mastery guide
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* AAMC ↔ NCERT crosswalk */}
        <section className="bg-gradient-to-br from-orange-50 via-white to-blue-50 py-16 sm:py-20">
          <div className="mx-auto max-w-4xl px-4 sm:px-6">
            <h2 className="mb-6 text-3xl font-bold text-gray-900 sm:text-4xl">
              AAMC ↔ NCERT Crosswalk — For Indian-American and NRI Students
            </h2>
            <div className="prose prose-lg max-w-none text-gray-700">
              <p>
                Roughly one-in-three of our AP Biology students grew up partly in India or attend
                Indian-curriculum schools abroad. They arrive at AP Biology already familiar with{' '}
                <strong>NCERT Class 11 and Class 12 biology</strong> — but the topic order, depth,
                and naming conventions differ. The AAMC framework (used in MCAT Biology and
                Biochemistry) sits one level higher than AP but uses similar concepts.
              </p>
              <p>For every AP CED unit, our crosswalk shows:</p>
              <ul>
                <li>The matching NCERT chapter — saving 30–40% of study time</li>
                <li>The matching AAMC content category — for students planning MCAT next</li>
                <li>
                  The depth-delta — what AP adds vs NCERT (e.g., AP adds population-genetics
                  modeling in Unit 7 that NCERT only mentions in passing)
                </li>
                <li>
                  The reverse depth-delta — where NCERT goes deeper than AP (e.g., NCERT plant
                  reproduction depth is well above AP Unit 4)
                </li>
              </ul>
              <p>
                This serves the roughly 15% of our students who plan a Biology track that goes from
                CBSE Class 11–12 → AP Biology in junior year → MCAT B/B for US medical school
                applications. The crosswalk turns three overlapping curricula into a single
                connected study plan.
              </p>
            </div>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/ap-biology-class-11"
                className="inline-flex items-center gap-2 rounded-xl bg-orange-500 px-6 py-3 text-base font-semibold text-white shadow hover:bg-orange-600"
              >
                AP Biology + CBSE Class 11 Playbook
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/ap-biology-vs-college-bio-mcat-bridge"
                className="inline-flex items-center gap-2 rounded-xl border-2 border-orange-400 px-6 py-3 text-base font-semibold text-orange-700 hover:bg-orange-50"
              >
                AP → College Bio → MCAT 515+ Bridge
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* Topical resources */}
        <section className="py-16 sm:py-20">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="mb-10 text-center">
              <h2 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl">
                Topical Resources
              </h2>
              <p className="mx-auto max-w-2xl text-lg text-gray-600">
                Score-5 plans, FRQ rubric mastery, Anki decks, and pathway bridges — all written by
                senior faculty.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {topicalResources.map((resource) => (
                <Link
                  key={resource.href}
                  href={resource.href}
                  className="group rounded-xl border border-gray-200 bg-white p-6 transition-all hover:border-blue-300 hover:shadow-md"
                >
                  <h3 className="mb-2 text-lg font-bold text-gray-900 group-hover:text-blue-700">
                    {resource.title}
                  </h3>
                  <p className="text-sm text-gray-600">{resource.description}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* US metros */}
        <section className="bg-gradient-to-br from-blue-50 via-white to-slate-50 py-16 sm:py-20">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="mb-10 text-center">
              <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-blue-100 px-3 py-1 text-sm font-semibold text-blue-800">
                Largest student base · USD pricing · Local timezones
              </div>
              <h2 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl">
                AP Biology Tutoring in US Metros
              </h2>
              <p className="mx-auto max-w-2xl text-lg text-gray-600">
                City-specific pages with real high-school names, neighbourhood landmarks, and PST /
                EST / CST timezone class options.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {usMetros.map((m) => (
                <Link
                  key={m.href}
                  href={m.href}
                  className="rounded-lg border border-blue-200 bg-white px-4 py-3 text-center text-sm font-medium text-gray-800 transition-all hover:border-blue-400 hover:bg-blue-50 hover:text-blue-800"
                >
                  {m.label}
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* APAC + UAE */}
        <section className="py-16 sm:py-20">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="mb-10 text-center">
              <h2 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl">
                APAC &amp; UAE — AP Biology Coverage
              </h2>
              <p className="mx-auto max-w-2xl text-lg text-gray-600">
                Singapore, Hong Kong, Dubai, Abu Dhabi — large international-school populations
                running College Board AP. Local-currency pricing, SGT / GST-aligned scheduling.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {apacUaeMetros.map((m) => (
                <Link
                  key={m.href}
                  href={m.href}
                  className="rounded-lg border border-gray-200 bg-white px-4 py-3 text-center text-sm font-medium text-gray-700 transition-all hover:border-blue-300 hover:text-blue-700"
                >
                  {m.label}
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* India + Canada */}
        <section className="bg-gradient-to-br from-orange-50 via-white to-green-50 py-16 sm:py-20">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="mb-10 text-center">
              <h2 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl">
                India &amp; Canada — AP Biology for College Admissions
              </h2>
              <p className="mx-auto max-w-2xl text-lg text-gray-600">
                Indian students using AP Biology for US college applications, and Canadian metros
                with large South Asian populations. INR / CAD pricing displayed locally.
              </p>
            </div>

            <div className="mb-8">
              <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-orange-800">
                India
              </h3>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                {indiaCities.map((c) => (
                  <Link
                    key={c.href}
                    href={c.href}
                    className="rounded-lg border border-orange-200 bg-white px-4 py-3 text-center text-sm font-medium text-gray-800 transition-all hover:border-orange-400 hover:bg-orange-50 hover:text-orange-800"
                  >
                    {c.label}
                  </Link>
                ))}
              </div>
            </div>

            <div>
              <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-green-800">
                Canada
              </h3>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {canadaCities.map((c) => (
                  <Link
                    key={c.href}
                    href={c.href}
                    className="rounded-lg border border-green-200 bg-white px-4 py-3 text-center text-sm font-medium text-gray-800 transition-all hover:border-green-400 hover:bg-green-50 hover:text-green-800"
                  >
                    {c.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Faculty */}
        <section className="py-16 sm:py-20">
          <div className="mx-auto max-w-5xl px-4 sm:px-6">
            <div className="mb-10 text-center">
              <h2 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl">
                Meet the Faculty
              </h2>
              <p className="mx-auto max-w-2xl text-lg text-gray-600">
                Senior faculty teach AP Biology personally. No subcontracting, no rotating tutor
                pool, no surprise substitutions.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <Link
                href="/dr-shekhar-singh-biology-faculty-india"
                className="group rounded-2xl border border-gray-200 bg-white p-8 transition-all hover:border-blue-300 hover:shadow-md"
              >
                <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-purple-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-purple-800">
                  Founder &amp; Lead Faculty
                </div>
                <h3 className="mb-2 text-xl font-bold text-gray-900 group-hover:text-blue-700">
                  Dr. Shekhar C Singh
                </h3>
                <p className="mb-4 text-gray-600">
                  15+ years teaching Biology across NEET, IB HL, AP Biology, MCAT B/B, USABO, and
                  IBO. Authority entity for biology coaching in India and the diaspora.
                </p>
                <span className="inline-flex items-center gap-1 text-sm font-semibold text-blue-600 transition-all group-hover:gap-2">
                  Read full profile
                  <ArrowRight className="h-4 w-4" />
                </span>
              </Link>

              <Link
                href="/faculty"
                className="group rounded-2xl border border-gray-200 bg-white p-8 transition-all hover:border-blue-300 hover:shadow-md"
              >
                <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-blue-800">
                  Full Faculty Team
                </div>
                <h3 className="mb-2 text-xl font-bold text-gray-900 group-hover:text-blue-700">
                  All Cerebrum Faculty
                </h3>
                <p className="mb-4 text-gray-600">
                  Senior and associate faculty across NEET, IB, AP, MCAT, and Olympiad tracks. All
                  associate tutors are supervised by senior faculty on every session.
                </p>
                <span className="inline-flex items-center gap-1 text-sm font-semibold text-blue-600 transition-all group-hover:gap-2">
                  See the team
                  <ArrowRight className="h-4 w-4" />
                </span>
              </Link>
            </div>
          </div>
        </section>

        {/* FAQs — visible content must exactly match FAQSchema */}
        <section className="bg-gray-50 py-16 sm:py-20">
          <div className="mx-auto max-w-3xl px-4 sm:px-6">
            <div className="mb-12 text-center">
              <h2 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl">
                AP Biology — Frequently Asked Questions
              </h2>
              <p className="mx-auto max-w-2xl text-lg text-gray-600">
                The same eight answers that power our FAQ schema — written by senior faculty, not
                marketing.
              </p>
            </div>

            <div className="space-y-4">
              {hubFAQs.map((faq) => (
                <details
                  key={faq.question}
                  className="group rounded-xl border border-gray-200 bg-white p-6 open:shadow-sm"
                >
                  <summary className="cursor-pointer list-none">
                    <h3 className="flex items-center justify-between text-lg font-semibold text-gray-900">
                      <span className="pr-4">{faq.question}</span>
                      <span className="text-blue-600 transition-transform group-open:rotate-180">
                        ▾
                      </span>
                    </h3>
                  </summary>
                  <p className="mt-4 leading-relaxed text-gray-600">{faq.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-700 py-16 text-white sm:py-20">
          <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-2 text-sm font-medium text-white">
              <Target className="h-4 w-4" />
              Free 30-Minute Demo · No Payment Taken
            </div>
            <h2 className="mb-4 text-3xl font-bold sm:text-4xl">Ready to score 5 on AP Biology?</h2>
            <p className="mb-8 text-lg text-blue-100">
              Book a free demo. A senior tutor diagnoses the student's current AP Biology level,
              walks through one FRQ together, identifies the top two unit weaknesses, and recommends
              the right tier — all in 30 minutes.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Link
                href="/book-free-demo"
                className="inline-flex items-center justify-center gap-3 rounded-xl bg-white px-8 py-4 text-lg font-semibold text-blue-700 shadow-lg hover:bg-blue-50"
              >
                <BookOpen className="h-6 w-6" />
                Book Free Demo
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-xl border-2 border-white px-8 py-4 text-lg font-semibold text-white hover:bg-white/10"
              >
                Contact Cerebrum
                <ArrowRight className="h-5 w-5" />
              </Link>
            </div>
            <p className="mt-6 text-sm text-blue-100">
              Prefer WhatsApp?{' '}
              <a
                href={`https://wa.me/918826444334?text=${encodeURIComponent('Hi! I want to book a free AP Biology demo.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold underline hover:text-white"
              >
                Message us on WhatsApp
              </a>{' '}
              — +91 88264 44334.
            </p>
          </div>
        </section>
      </main>
    </>
  )
}
