/**
 * /brain-bee-coaching
 *
 * Vertical landing page for Brain Bee / neuroscience-competition coaching.
 * New cross-vertical entry (Jun 2026) — positions Cerebrum's AIIMS-trained
 * biology faculty for the USA / International Brain Bee neuroscience
 * competition (high-schoolers 13-19). Mirrors /best-biology-tutor-global
 * structure (server component, metadata + Course/Org/FAQ/Person schema,
 * WhatsApp CTAs to 918826444334).
 *
 * Claims are grounded in verified research (deep-research, Jun 2026):
 *  - 3-tier ladder: local chapter → USA National → IBB World Championship
 *  - ages 13-19, official source = free "Brain Facts" book (SfN)
 *  - 2023 USA scoring: neuroanatomy practical 25% + live oral 25% +
 *    patient diagnosis 20% = 70% of score; written exam only ~10%
 *  - patient diagnosis covers ~20 NLM-listed neurological disorders
 * HONESTY: the official IBB disowns paid prep and IYNA's bootcamp is free —
 * this page positions Cerebrum as INDEPENDENT competition coaching, not an
 * official/affiliated program. Prestige is framed conservatively (no
 * unverified USABO/ISEF-equivalence).
 */

import type { Metadata } from 'next'
import Link from 'next/link'
import {
  Activity,
  Award,
  BookOpen,
  Brain,
  ChevronRight,
  ClipboardList,
  Home,
  MessageCircle,
  Microscope,
  Phone,
  Stethoscope,
  Target,
  Timer,
  Users,
} from 'lucide-react'
import { CerebrumPersonSchema } from '@/components/seo/CerebrumPersonSchema'
import { BRAIN_BEE_CITIES } from '@/data/brain-bee/brainBeeCities'

const SITE_URL = 'https://cerebrumbiologyacademy.com'
const CANONICAL = '/brain-bee-coaching'
const PAGE_URL = `${SITE_URL}${CANONICAL}`

export const metadata: Metadata = {
  title: 'Brain Bee Coaching — Neuroscience Competition Prep (USA & International)',
  description:
    'Live, small-batch Brain Bee coaching for high-schoolers (13-19). AIIMS Delhi-trained faculty train the rounds that decide the result — human neuroanatomy practical, neurohistology, MRI ID, patient diagnosis, and the live oral elimination — not just the free Brain Facts written exam. Mock-exam-heavy, time-zone-calibrated for US, NRI & international IBB aspirants. Free assessment.',
  keywords: [
    'brain bee coaching',
    'brain bee preparation',
    'brain bee tutor',
    'usa brain bee coaching',
    'international brain bee prep',
    'neuroscience competition coaching',
    'brain bee neuroanatomy practice',
    'brain bee patient diagnosis prep',
    'brain bee online course',
    'brain facts book coaching',
    'neuroscience olympiad coaching',
    'brain bee bootcamp',
    'brain bee mock exam',
    'brain bee coaching for NRI students',
    'AIIMS faculty neuroscience coaching',
    'brain bee coaching usa',
    'brain bee coaching new york',
    'brain bee coaching california',
    'brain bee coaching bay area',
    'brain bee tutor near me',
    'how to prepare for brain bee',
    'brain bee local chapter preparation',
    'brain facts book study guide',
    'is brain bee worth it',
    'brain bee regional competition prep',
  ],
  alternates: {
    canonical: PAGE_URL,
    languages: {
      en: PAGE_URL,
      'en-US': PAGE_URL,
      'en-GB': PAGE_URL,
      'en-CA': PAGE_URL,
      'en-AU': PAGE_URL,
      'en-IN': PAGE_URL,
      'x-default': PAGE_URL,
    },
  },
  openGraph: {
    title: 'Brain Bee Coaching — Neuroscience Competition Prep · Cerebrum Biology Academy',
    description:
      'Live small-batch coaching for the USA & International Brain Bee — neuroanatomy, neurohistology, MRI ID, patient diagnosis & live-oral simulation by AIIMS-trained faculty.',
    url: PAGE_URL,
    locale: 'en',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image' as const,
    title: 'Brain Bee Coaching — Neuroscience Competition Prep (USA & International)',
    description:
      'AIIMS-trained faculty coach the high-weight Brain Bee rounds (neuroanatomy, patient diagnosis, live oral) the free Brain Facts book never trains. Free assessment.',
  },
  robots: 'index, follow, max-image-preview:large',
}

// Curriculum modules mapped to the actual competition rounds. Weights are the
// verified 2023 USA National scoring breakdown (University of Maryland host).
const ROUNDS = [
  {
    icon: Brain,
    title: 'Brain Facts mastery — written exam',
    weight: '~10% of score',
    detail:
      'Structured pacing through the full free "Brain Facts" book (Society for Neuroscience) — the official source. We add concept depth, MCQ drilling, and weekly retrieval tests so the breadth is genuinely retained, not skimmed.',
  },
  {
    icon: Microscope,
    title: 'Human neuroanatomy practical',
    weight: '25% of score — highest weight',
    detail:
      'Identify structures on whole/half human brains and atlas/3D models across timed stations. This is the single biggest-weighted round and the one self-study cannot replicate — we run live, repeated identification drills.',
  },
  {
    icon: Microscope,
    title: 'Neurohistology + MRI/imaging ID',
    weight: '~20% of score',
    detail:
      'Microscope-slide and photo-matching for histology, plus structure identification on MRI/imaging. Pattern-recognition skills built through graded slide and scan sets with expert feedback.',
  },
  {
    icon: Stethoscope,
    title: 'Patient diagnosis — clinical reasoning',
    weight: '20% of score',
    detail:
      'Diagnose from patient video/case across the ~20 official neurological disorders (Parkinson’s, Alzheimer’s, Epilepsy, Stroke, MS, ALS, Schizophrenia, OCD, PTSD, and more). This is where AIIMS clinical training is a genuine edge over test-prep generalists.',
  },
  {
    icon: Timer,
    title: 'Live oral elimination — finals',
    weight: '25% of score',
    detail:
      'Rapid-fire Q&A with two-strike knockout for the top finalists. We simulate the exact timed, high-pressure format weekly so students perform under the conditions that actually separate winners.',
  },
  {
    icon: ClipboardList,
    title: 'Full mock championships',
    weight: 'every cohort',
    detail:
      'End-to-end graded mocks mirroring the national round structure, with per-student feedback and a personalised gap plan after each one.',
  },
]

const TIERS = [
  {
    name: 'Foundation Cohort',
    students: '12-16 weeks · small-batch live',
    price: '$4,900',
    angle:
      'Full Brain Facts content + every round, built week-by-week. Live classes, slide/practical drills, and graded mocks. For students starting their first Brain Bee season or building from scratch.',
    includes:
      'Includes 2 full mock championships, weekly live oral drills, an AIIMS-faculty patient-diagnosis clinic, a printed study pack, and between-class doubt support — more than the content-only cohorts most providers run.',
    bestFor: 'First-time chapter entrants, early starters (Grade 8-11)',
  },
  {
    name: 'Finals & Practical Intensive',
    students: '4-6 weeks · high-weight rounds',
    price: '$2,900',
    angle:
      'Focused on the high-weight rounds (~90% of the score) — human neuroanatomy practical, neurohistology, MRI ID, patient diagnosis, and timed two-strike oral simulation. For students who have qualified a chapter and are heading to nationals.',
    includes:
      'Daily timed oral simulation, repeated practical/slide drills, and patient-diagnosis clinics over the full ~20 official disorders, with a graded mock final.',
    bestFor: 'Chapter winners, national & IBB qualifiers',
  },
  {
    name: '1:1 Mentorship',
    students: '1 student · fully bespoke',
    price: '$6,900',
    angle:
      'Dedicated faculty mentor, custom plan, weekly clinical-reasoning and oral coaching with direct AIIMS-faculty review. For serious national-champion-track and World-Championship aspirants.',
    includes:
      'Fully personalised plan, unlimited doubt access, weekly 1:1 with AIIMS-trained faculty, and parent progress updates.',
    bestFor: 'National-title & International Brain Bee (IBB) aspirants',
  },
]

const FAQS = [
  {
    question: 'What is the Brain Bee, and who can compete?',
    answer:
      'The Brain Bee is a neuroscience competition for high-school students aged 13-19. It runs on three tiers: win a local chapter → advance to your country’s National Championship (e.g. the USA Brain Bee) → the national champion represents the country at the International Brain Bee (IBB) World Championship. The IBB spans 200+ chapters across 50+ countries with roughly 25,000+ competitors a year. Only one national champion per country advances to the World Championship — which is what makes a strong result stand out.',
  },
  {
    question: 'What does the competition actually test?',
    answer:
      'Several distinct skills, not just a written exam. In the 2023 USA National scoring, the human neuroanatomy practical was 25%, the live oral elimination 25%, patient diagnosis 20%, neurohistology 10%, MRI identification 10%, and the written exam only ~10%. So only about 10% is pure book recall — the other ~90% is practical, clinical and live-oral, and the three heaviest rounds alone (neuroanatomy, oral, patient diagnosis) are ~70%. (Exact rounds and weights vary year to year.)',
  },
  {
    question: 'Isn’t the official Brain Bee study material free? Why pay for coaching?',
    answer:
      'Yes — the "Brain Facts" book and the official IYNA bootcamp are free, and they’re genuinely good for the written/content layer. But the free material trains the ~10% written exam, not the ~90% that decides results: identifying structures on real human brains, reading histology slides and MRI, diagnosing patients from the ~20 official disorders, and performing in a timed two-strike oral. Those rounds need live drilling, expert feedback, and mock practice — which is exactly what Cerebrum adds on top of the free content.',
  },
  {
    question: 'Why AIIMS-trained biology faculty for a neuroscience competition?',
    answer:
      'The highest-leverage rounds are clinical and physiological — patient diagnosis over real neurological disorders, and rapid oral reasoning. Cerebrum’s faculty are trained at AIIMS Delhi (India’s apex medical institution) and teach neurophysiology and clinical correlations daily for NEET, AP, IB and MCAT students. That clinical depth maps directly onto the patient-diagnosis and oral rounds in a way general test-prep tutors cannot replicate.',
  },
  {
    question: 'Who is this for — US students, NRI families, or international competitors?',
    answer:
      'All three. We coach US high-schoolers preparing for the USA Brain Bee, NRI / international families based in the US and elsewhere, and students in other countries preparing for their own national tier and the IBB World Championship. Classes are live online and time-zone-calibrated (ET / PT / GMT / GST / IST and more).',
  },
  {
    question: 'Is Cerebrum affiliated with the official Brain Bee?',
    answer:
      'No. Cerebrum Biology Academy provides independent neuroscience-competition coaching. We are not affiliated with, authorised by, or endorsed by the International Brain Bee, the USA Brain Bee, or the Society for Neuroscience. "Brain Bee" is used here only to describe the competition our coaching prepares students for. The official bootcamp (IYNA) is free; our paid coaching is a separate, optional supplement.',
  },
  {
    question: 'Is the Brain Bee worth it for college applications?',
    answer:
      'Yes for a student genuinely interested in neuroscience or medicine. Placing at the local, national (USA Brain Bee) or International Brain Bee (IBB) tier is a distinctive, well-recognised enrichment signal, and the neuroanatomy, clinical-reasoning and patient-diagnosis skills transfer directly into pre-med and biology coursework. Because only one national champion per country advances to the World Championship, a strong result genuinely stands out. It is a stretch goal, so it is worth committing to when the student enjoys neuroscience beyond the school syllabus.',
  },
  {
    question: 'How do I win or place at the Brain Bee?',
    answer:
      'The written exam is only about 10% of the score — roughly 90% comes from the human neuroanatomy practical, the live two-strike oral elimination, and patient diagnosis over the official neurological disorders, plus neurohistology and MRI identification. So the free "Brain Facts" book is necessary but not sufficient: you place by drilling the practical, clinical and oral rounds live, with expert feedback and mock championships. Cerebrum’s AIIMS-trained faculty coach exactly those high-leverage rounds.',
  },
  {
    question: 'How do I start?',
    answer:
      'Book a free assessment. We gauge your child’s current level and target tier (chapter, national, or IBB), then recommend the right cohort or 1:1 track and share the schedule and fees in your local currency. WhatsApp +91 88264 44334 or use the buttons on this page.',
  },
]

// The neuroscience content itself — the syllabus moat. Three pillars mapped to
// the rounds: the Brain Facts written foundation, the neuroanatomy/imaging
// students must identify, and the clinical disorders the patient-diagnosis
// round draws on. Brain Facts chapter topics are from the public Society for
// Neuroscience book; the disorder set is framed as representative (the exact
// official list and weights vary year to year), not an authoritative roster.
const SYLLABUS = [
  {
    icon: BookOpen,
    title: 'The Brain Facts foundation',
    blurb:
      'The free Society-for-Neuroscience "Brain Facts" book is the official written-exam source. We teach every chapter for retention, not skimming:',
    items: [
      'The neuron — structure, the action potential, synapses & neurotransmitters',
      'Brain development across the lifespan (and the aging brain)',
      'The senses — vision, hearing, taste, smell, touch and pain',
      'Movement — motor cortex, basal ganglia, cerebellum',
      'Learning, memory, language and the higher cortical functions',
      'Emotion, stress, the reward system, sleep and the body clock',
      'Neurological & psychiatric disorders',
      'New frontiers — neuroethics, brain-computer interfaces, neurotech',
    ],
  },
  {
    icon: Microscope,
    title: 'Neuroanatomy & imaging you must identify',
    blurb:
      'The highest-weighted rounds are practical — identifying structures on real brains, slides and scans. We drill the full map live:',
    items: [
      'Cerebral lobes & key cortical areas; white-matter tracts',
      'Limbic system — hippocampus, amygdala, cingulate',
      'Basal ganglia, thalamus and hypothalamus',
      'Brainstem (midbrain, pons, medulla) and the cerebellum',
      'Ventricles, meninges and the Circle of Willis (blood supply)',
      'Spinal cord cross-section and the 12 cranial nerves',
      'Neurohistology — neuron types, glia, myelin under the microscope',
      'Structure identification on MRI / CT in standard planes',
    ],
  },
  {
    icon: Activity,
    title: 'Clinical neurology for patient diagnosis',
    blurb:
      'The patient-diagnosis round tests reasoning over real neurological & psychiatric disorders — where AIIMS clinical training is the edge. We cover the major families:',
    items: [
      'Neurodegenerative — Parkinson’s, Alzheimer’s, Huntington’s, ALS',
      'Demyelinating — multiple sclerosis',
      'Cerebrovascular — stroke & TIA',
      'Seizure disorders — the epilepsies',
      'Movement & tic disorders — Tourette’s, dystonia',
      'Psychiatric — schizophrenia, depression, bipolar, OCD, PTSD, anxiety',
      'Neurodevelopmental — autism spectrum, ADHD',
      'Headache & other — migraine, brain tumours, sleep disorders',
    ],
  },
]

export default function BrainBeeCoachingPage() {
  const waUrl =
    'https://wa.me/918826444334?text=' +
    encodeURIComponent(
      "Hi — I'm interested in Brain Bee / neuroscience competition coaching for my child (Grade/Year ___, based in [city, country]). Please share the cohort dates, tiers, and a free assessment slot."
    )

  const courseSchema = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    '@id': `${PAGE_URL}#course`,
    name: 'Brain Bee Coaching — Neuroscience Competition Preparation',
    description:
      'Live small-batch coaching for the USA & International Brain Bee neuroscience competition (ages 13-19). Covers Brain Facts content, human neuroanatomy practical, neurohistology, MRI identification, patient diagnosis, and live-oral simulation. AIIMS-trained faculty.',
    url: PAGE_URL,
    inLanguage: 'en',
    educationalLevel: 'High school (ages 13-19) — neuroscience competition track',
    about: 'Neuroscience, Brain Bee competition, neuroanatomy, neurophysiology',
    provider: { '@id': `${SITE_URL}/#organization` },
    areaServed: [
      { '@type': 'Country', name: 'United States' },
      { '@type': 'Place', name: 'Worldwide' },
    ],
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: ['h1', 'details p'],
    },
  }

  // The canonical Organization node is emitted site-wide by CerebrumOrgSchema
  // (root layout); courseSchema.provider references it by @id, so this page no
  // longer re-declares an EducationalOrganization #organization node.

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'Global', item: `${SITE_URL}/global` },
      { '@type': 'ListItem', position: 3, name: 'Brain Bee Coaching', item: PAGE_URL },
    ],
  }

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQS.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer },
    })),
  }

  return (
    <>
      <CerebrumPersonSchema
        knowsAbout={[
          'Brain Bee Coaching',
          'Neuroscience Competition Coaching',
          'Neuroanatomy',
          'Neurophysiology',
          'Clinical Neurology / Patient Diagnosis',
          'International Brain Bee (IBB)',
        ]}
        jobTitle="Neuroscience Competition Coach — Brain Bee Preparation"
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(courseSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <main className="min-h-screen bg-white">
        <nav className="mx-auto max-w-6xl px-4 pt-6 text-sm text-slate-500">
          <ol className="flex items-center gap-1">
            <li>
              <Link href="/" className="hover:text-blue-700 flex items-center gap-1">
                <Home className="h-3.5 w-3.5" /> Home
              </Link>
            </li>
            <ChevronRight className="h-3.5 w-3.5" />
            <li>
              <Link href="/global" className="hover:text-blue-700">
                Global Programs
              </Link>
            </li>
            <ChevronRight className="h-3.5 w-3.5" />
            <li className="text-slate-700">Brain Bee Coaching</li>
          </ol>
        </nav>

        {/* Hero */}
        <section className="mx-auto max-w-6xl px-4 pt-10 pb-14">
          <span className="inline-flex items-center gap-2 rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-blue-900">
            <Brain className="h-3.5 w-3.5" />
            USA &amp; International Brain Bee · Ages 13-19
          </span>
          <h1 className="mt-4 max-w-4xl text-3xl font-bold leading-tight text-slate-900 md:text-5xl">
            Brain Bee coaching that trains the rounds that{' '}
            <span className="text-blue-700">actually decide the result.</span>
          </h1>
          <p className="mt-5 max-w-4xl text-lg leading-relaxed text-slate-600">
            The free Brain Facts book prepares the written exam &mdash; but that&rsquo;s only about
            10% of the score. Roughly 90% comes from the practical and clinical rounds &mdash; human
            neuroanatomy, neurohistology and MRI identification, patient diagnosis, and the live
            two-strike oral elimination (the three heaviest alone &mdash; neuroanatomy, diagnosis
            and oral &mdash; are ~70%). Cerebrum&rsquo;s AIIMS Delhi-trained faculty coach exactly
            those rounds &mdash; live, small-batch, mock-exam-heavy, and time-zone-calibrated for
            US, NRI and international IBB aspirants.
          </p>

          <div className="mt-7 flex flex-col gap-3 md:flex-row">
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-green-600 px-5 py-3 text-base font-semibold text-white shadow hover:bg-green-700"
            >
              <MessageCircle className="h-5 w-5" />
              WhatsApp for a free assessment
            </a>
            <a
              href="tel:+918826444334"
              className="inline-flex items-center justify-center gap-2 rounded-lg border-2 border-blue-600 px-5 py-3 text-base font-semibold text-blue-700 hover:bg-blue-50"
            >
              <Phone className="h-5 w-5" />
              Call +91 88264 44334
            </a>
          </div>

          <p className="mt-3 text-sm font-medium text-slate-600">
            WhatsApp works free from the US — no international call needed; live classes in ET / CT
            / MT / PT.
          </p>

          <p className="mt-4 text-xs text-slate-400">
            Independent neuroscience-competition coaching. Not affiliated with or endorsed by the
            International Brain Bee or the Society for Neuroscience. The official Brain Facts book
            and IYNA bootcamp are free.
          </p>
        </section>

        {/* Rounds-mapped curriculum */}
        <section className="bg-slate-50">
          <div className="mx-auto max-w-6xl px-4 py-14">
            <h2 className="text-2xl font-bold text-slate-900 md:text-3xl">
              A curriculum mapped to every round &mdash; not just the book
            </h2>
            <p className="mt-3 max-w-3xl text-slate-600">
              Most prep stops at the written exam. We weight our teaching to the way the competition
              is actually scored, so students train where the marks are. (Round mix and weights vary
              year to year; figures shown are the verified 2023 USA National breakdown.)
            </p>
            <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {ROUNDS.map((r) => (
                <div key={r.title} className="rounded-2xl bg-white p-6 ring-1 ring-slate-200">
                  <r.icon className="h-6 w-6 text-blue-600" />
                  <h3 className="mt-3 text-lg font-bold text-slate-900">{r.title}</h3>
                  <p className="text-sm font-semibold text-blue-700">{r.weight}</p>
                  <p className="mt-2 text-sm leading-relaxed text-slate-700">{r.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Tiers */}
        <section>
          <div className="mx-auto max-w-5xl px-4 py-14">
            <h2 className="text-2xl font-bold text-slate-900 md:text-3xl">
              Three tracks &mdash; pick by where you are in the season
            </h2>
            <div className="mt-8 grid gap-5 md:grid-cols-3">
              {TIERS.map((t, idx) => (
                <div
                  key={t.name}
                  className={`rounded-2xl p-6 ${
                    idx === 1
                      ? 'bg-blue-700 text-white shadow-xl'
                      : 'bg-white ring-1 ring-slate-200'
                  }`}
                >
                  {idx === 1 && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-amber-300 px-2 py-0.5 text-xs font-semibold uppercase tracking-wide text-blue-900">
                      <Target className="h-3 w-3" />
                      Most popular
                    </span>
                  )}
                  <h3
                    className={`mt-3 text-lg font-bold ${idx === 1 ? 'text-white' : 'text-slate-900'}`}
                  >
                    {t.name}
                  </h3>
                  <p
                    className={`text-sm font-semibold ${idx === 1 ? 'text-amber-300' : 'text-blue-700'}`}
                  >
                    {t.students}
                  </p>
                  <p
                    className={`mt-2 text-2xl font-bold ${idx === 1 ? 'text-white' : 'text-slate-900'}`}
                  >
                    {t.price}
                    <span
                      className={`ml-1 text-xs font-normal ${idx === 1 ? 'text-blue-200' : 'text-slate-400'}`}
                    >
                      all-in
                    </span>
                  </p>
                  <p
                    className={`mt-3 text-sm leading-relaxed ${
                      idx === 1 ? 'text-blue-100' : 'text-slate-700'
                    }`}
                  >
                    {t.angle}
                  </p>
                  <p
                    className={`mt-3 text-xs leading-relaxed ${
                      idx === 1 ? 'text-blue-100' : 'text-slate-600'
                    }`}
                  >
                    {t.includes}
                  </p>
                  <p
                    className={`mt-4 text-xs font-semibold uppercase tracking-wide ${
                      idx === 1 ? 'text-amber-300' : 'text-slate-500'
                    }`}
                  >
                    Best for
                  </p>
                  <p className={`mt-1 text-sm ${idx === 1 ? 'text-blue-100' : 'text-slate-700'}`}>
                    {t.bestFor}
                  </p>
                </div>
              ))}
            </div>
            <p className="mt-6 text-sm text-slate-500">
              Cohorts are timed to the competition calendar (the USA National runs ~April-May; the
              IBB World Championship later in the year). Prices shown are all-in in USD and sit
              below comparable Brain Bee programmes &mdash; with more live practical, clinical and
              oral coaching included. Local-currency billing (GBP / EUR / CAD / AUD / INR) and
              sibling discounts confirmed at your free assessment.
            </p>
          </div>
        </section>

        {/* Why us */}
        <section className="bg-slate-50">
          <div className="mx-auto max-w-4xl px-4 py-14">
            <h2 className="text-2xl font-bold text-slate-900 md:text-3xl">
              Why Cerebrum for Brain Bee
            </h2>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {[
                {
                  icon: <Stethoscope className="h-5 w-5 text-blue-600" />,
                  title: 'Clinical depth for patient diagnosis',
                  text: 'AIIMS-trained faculty teach the real neurology behind the ~20 official disorders — the moat in the 20%-weighted diagnosis round.',
                },
                {
                  icon: <Microscope className="h-5 w-5 text-blue-600" />,
                  title: 'Live practicals, not just reading',
                  text: 'Neuroanatomy, histology and MRI identification drilled live with feedback — the ~45% of the score self-study cannot build.',
                },
                {
                  icon: <Timer className="h-5 w-5 text-blue-600" />,
                  title: 'Two-strike oral simulation',
                  text: 'Weekly timed, high-pressure oral rounds so the live finals format is familiar, not a shock.',
                },
                {
                  icon: <Users className="h-5 w-5 text-blue-600" />,
                  title: 'Small batches, global time zones',
                  text: 'Live online in ET / PT / GMT / GST / IST and more — built for US, NRI and international IBB aspirants.',
                },
              ].map((c) => (
                <div key={c.title} className="rounded-xl border border-slate-200 bg-white p-5">
                  {c.icon}
                  <h3 className="mt-3 text-sm font-semibold text-slate-900">{c.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">{c.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Cities */}
        <section>
          <div className="mx-auto max-w-5xl px-4 py-12">
            <h2 className="text-2xl font-bold text-slate-900 md:text-3xl">
              Brain Bee coaching by US metro
            </h2>
            <p className="mt-3 max-w-3xl text-slate-600">
              Live in your time zone, with local context. Don&rsquo;t see your city? We coach
              students anywhere in the US and worldwide &mdash; just ask.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              {BRAIN_BEE_CITIES.map((c) => (
                <Link
                  key={c.slug}
                  href={`/brain-bee-coaching/${c.slug}`}
                  className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-blue-700 hover:bg-blue-50"
                >
                  {c.cityName}
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Syllabus — the neuroscience content moat */}
        <section className="bg-slate-50">
          <div className="mx-auto max-w-6xl px-4 py-14">
            <h2 className="text-2xl font-bold text-slate-900 md:text-3xl">
              The neuroscience that decides the rounds
            </h2>
            <p className="mt-3 max-w-3xl text-slate-600">
              Three pillars, mapped to how the competition is scored: the Brain Facts written
              foundation, the neuroanatomy and imaging you must identify by sight, and the clinical
              disorders behind patient diagnosis. (The exact official topics and weights vary year
              to year; this is the ground we teach across a season.)
            </p>
            <div className="mt-8 grid gap-5 md:grid-cols-3">
              {SYLLABUS.map((p) => (
                <div key={p.title} className="rounded-2xl bg-white p-6 ring-1 ring-slate-200">
                  <p.icon className="h-6 w-6 text-blue-600" />
                  <h3 className="mt-3 text-lg font-bold text-slate-900">{p.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">{p.blurb}</p>
                  <ul className="mt-4 space-y-2">
                    {p.items.map((it) => (
                      <li key={it} className="flex gap-2 text-sm leading-relaxed text-slate-700">
                        <ChevronRight className="mt-1 h-3.5 w-3.5 shrink-0 text-blue-500" />
                        <span>{it}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Free Brain Bee guides */}
        <section className="bg-slate-50">
          <div className="mx-auto max-w-6xl px-4 py-12">
            <h2 className="text-2xl font-bold text-slate-900 md:text-3xl">Free Brain Bee guides</h2>
            <p className="mt-3 max-w-3xl text-slate-600">
              Start here &mdash; our open study resources for the competition.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              {[
                { name: 'Brain Bee study guide', href: '/brain-bee-study-guide' },
                { name: 'Neuroanatomy guide', href: '/brain-bee-neuroanatomy-guide' },
                {
                  name: 'US Biology Competitions hub',
                  href: '/us-biology-competitions-hub',
                },
              ].map((g) => (
                <Link
                  key={g.href}
                  href={g.href}
                  className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-blue-700 hover:bg-blue-50"
                >
                  {g.name}
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section>
          <div className="mx-auto max-w-4xl px-4 py-16">
            <h2 className="text-2xl font-bold text-slate-900 md:text-3xl">
              Brain Bee coaching &mdash; common questions
            </h2>
            <div className="mt-7 divide-y divide-slate-200">
              {FAQS.map((f, idx) => (
                <details key={idx} className="group py-5">
                  <summary className="flex cursor-pointer items-center justify-between gap-4 text-base font-semibold text-slate-900">
                    <span>{f.question}</span>
                    <ChevronRight className="h-5 w-5 shrink-0 text-slate-400 transition-transform group-open:rotate-90" />
                  </summary>
                  <p className="mt-3 whitespace-pre-line text-sm leading-relaxed text-slate-700">
                    {f.answer}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-slate-900 py-14 text-white">
          <div className="mx-auto max-w-3xl px-4 text-center">
            <Award className="mx-auto h-10 w-10 text-amber-300" />
            <h2 className="mt-4 text-2xl font-bold md:text-3xl">
              Book a free Brain Bee assessment
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-slate-300">
              A short live session to gauge your child&rsquo;s level, map the right track (chapter,
              national, or IBB), and show how we coach the high-weight rounds. Available across all
              global time zones.
            </p>
            <div className="mt-7 flex flex-col justify-center gap-3 md:flex-row">
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-green-600 px-6 py-3 text-base font-semibold hover:bg-green-700"
              >
                <MessageCircle className="h-5 w-5" />
                WhatsApp Cerebrum
              </a>
              <a
                href="tel:+918826444334"
                className="inline-flex items-center justify-center gap-2 rounded-lg border-2 border-white px-6 py-3 text-base font-semibold hover:bg-white hover:text-slate-900"
              >
                <Phone className="h-5 w-5" />
                Call +91 88264 44334
              </a>
            </div>
            <p className="mt-4 text-sm text-slate-300">
              WhatsApp works free from the US — no international call needed; live classes in ET /
              CT / MT / PT.
            </p>
          </div>
        </section>
      </main>
    </>
  )
}
