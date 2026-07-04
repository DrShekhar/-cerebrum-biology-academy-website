/**
 * /brain-bee-study-guide
 *
 * Informational guide page (Jun 2026) — "how to study for the Brain Bee".
 * Absorbs the "how do I prepare" intent: a chapter-by-chapter Brain Facts
 * study plan, the high-weight practical/clinical rounds and how to prepare
 * each, a study timeline, and resources. Educational reference, not a sales
 * page (soft CTA only). Cross-links /brain-bee-coaching.
 *
 * HONESTY: round weights vary year to year — every weight reference is
 * caveated, not stated as a fixed rule. Independent prep; not affiliated with
 * the official Brain Bee / IBB / Society for Neuroscience. The Brain Facts
 * book and the IYNA bootcamp are free.
 */

import type { Metadata } from 'next'
import Link from 'next/link'
import {
  Activity,
  BookOpen,
  Brain,
  ChevronRight,
  Clock,
  Home,
  Lightbulb,
  MessageCircle,
  Microscope,
  Stethoscope,
  Target,
  Timer,
} from 'lucide-react'
import { CerebrumPersonSchema } from '@/components/seo/CerebrumPersonSchema'

const SITE_URL = 'https://cerebrumbiologyacademy.com'
const CANONICAL = '/brain-bee-study-guide'
const PAGE_URL = `${SITE_URL}${CANONICAL}`

export const metadata: Metadata = {
  title: 'Brain Bee Study Guide — How to Study for the Brain Bee (Round by Round)',
  description:
    'A practical Brain Bee study guide for students aged 13-19: a chapter-by-chapter plan for the free Brain Facts book, plus how to prepare the high-weight practical and clinical rounds — human neuroanatomy, neurohistology, MRI identification, patient diagnosis, and the live oral. Includes a study timeline and resources. Independent prep, not affiliated with the official Brain Bee.',
  keywords: [
    'brain bee study guide',
    'how to study for the brain bee',
    'how to prepare for brain bee',
    'brain facts book study plan',
    'brain bee study schedule',
    'brain bee neuroanatomy preparation',
    'brain bee patient diagnosis prep',
    'brain bee neurohistology',
    'brain bee MRI identification',
    'brain bee oral round preparation',
    'brain bee timeline',
    'brain bee resources',
    'brain bee written exam prep',
    'study for usa brain bee',
  ],
  alternates: {
    canonical: PAGE_URL,
    languages: {
      en: PAGE_URL,
      'en-US': PAGE_URL,
      'x-default': PAGE_URL,
    },
  },
  openGraph: {
    title: 'Brain Bee Study Guide — How to Study for the Brain Bee, Round by Round',
    description:
      'A chapter-by-chapter Brain Facts plan plus how to prepare every high-weight round — neuroanatomy, histology, MRI, patient diagnosis and the live oral. With a study timeline and resources.',
    url: PAGE_URL,
    type: 'article',
    locale: 'en_US',
    siteName: 'Cerebrum Biology Academy',
  },
  twitter: {
    card: 'summary_large_image' as const,
    title: 'Brain Bee Study Guide — How to Study for the Brain Bee (Round by Round)',
    description:
      'A chapter-by-chapter Brain Facts plan plus how to prepare neuroanatomy, histology, MRI, patient diagnosis and the live oral — with a study timeline and free resources.',
  },
  robots: 'index, follow, max-image-preview:large',
}

// The free Brain Facts book (Society for Neuroscience) is the official
// written-exam source. Topics below follow the public chapter structure of the
// book; they are the content backbone every competitor must internalise.
const BRAIN_FACTS_PLAN = [
  {
    phase: 'Block 1 — The cell & signalling',
    chapters: 'The neuron · the action potential · synaptic transmission',
    focus:
      'Master the neuron at the level you could draw and label it: resting potential, the all-or-nothing action potential, saltatory conduction, the synapse, and the major neurotransmitter systems (glutamate, GABA, dopamine, serotonin, acetylcholine). This is the foundation every later topic builds on.',
  },
  {
    phase: 'Block 2 — Building & sensing the brain',
    chapters: 'Brain development · the senses (vision, hearing, taste, smell, touch, pain)',
    focus:
      'Neural development across the lifespan, neuroplasticity, and the sensory systems end-to-end — receptor to cortex. Vision and the auditory pathway are perennial favourites; know the pathways, not just the organs.',
  },
  {
    phase: 'Block 3 — Movement & higher function',
    chapters: 'Movement (motor cortex, basal ganglia, cerebellum) · learning, memory & language',
    focus:
      'Motor control circuits and the cognitive systems — working vs long-term memory, hippocampal consolidation, the language areas. Connect each function to the anatomy that supports it; this pays off directly in the neuroanatomy round.',
  },
  {
    phase: 'Block 4 — States, emotion & disorders',
    chapters:
      'Emotion, stress & reward · sleep & the body clock · neurological & psychiatric disorders',
    focus:
      'The limbic and reward circuitry, sleep architecture and circadian rhythm, and the disorders chapter — which feeds straight into the patient-diagnosis round. Read the disorders chapter twice.',
  },
  {
    phase: 'Block 5 — Frontiers & consolidation',
    chapters: 'New frontiers (neuroethics, brain-computer interfaces, neurotech) · full review',
    focus:
      'The forward-looking material is short but examinable. Finish the block with a cover-to-cover review and self-quizzing, then move from reading into round-specific practice.',
  },
]

// The rounds that decide the result. Weights vary year to year, so we describe
// each round qualitatively and how to prepare it — not with fixed percentages.
const ROUND_PREP = [
  {
    icon: Microscope,
    title: 'Human neuroanatomy practical',
    note: 'Typically one of the most heavily weighted rounds — and the hardest to self-study.',
    how: [
      'Learn structures by sight, not just by name — use a labelled brain atlas and 3D models (free interactive atlases exist online) to identify lobes, deep nuclei, brainstem, cerebellum, ventricles and the vasculature.',
      'Drill under time pressure across "stations": give yourself 20-30 seconds per structure, then check.',
      'Pair every structure with its function and the disorder that follows when it fails — that cross-wiring is what fixes it in memory.',
      'See our companion neuroanatomy reference for the full list of structures to know.',
    ],
  },
  {
    icon: Microscope,
    title: 'Neurohistology',
    note: 'Microscope-slide and photomicrograph identification.',
    how: [
      'Learn the cell types and tissues: neuron classes, the glia (astrocytes, oligodendrocytes, microglia, ependymal, Schwann cells), myelin, grey vs white matter.',
      'Recognise landmark slides — cerebellar cortex layers, the hippocampus, peripheral nerve cross-section, Purkinje cells.',
      'Build pattern recognition by reviewing graded slide sets and quizzing yourself on unlabelled images.',
    ],
  },
  {
    icon: Brain,
    title: 'MRI / imaging identification',
    note: 'Identify structures on brain scans in standard planes.',
    how: [
      'Learn to orient yourself on axial, coronal and sagittal MRI — what is up, what is midline, which way is anterior.',
      'Identify the ventricles, corpus callosum, basal ganglia, thalamus, brainstem and cerebellum on scans, not just on the dissected brain.',
      'Practise with public neuroimaging atlases; the skill is translating the 3D anatomy you already know onto a 2D slice.',
    ],
  },
  {
    icon: Stethoscope,
    title: 'Patient diagnosis',
    note: 'Clinical reasoning over roughly 20 neurological and psychiatric disorders.',
    how: [
      'Build a one-page card per disorder: hallmark signs, the structure or system affected, and the single feature that distinguishes it from look-alikes.',
      'Cover the major families: neurodegenerative (Parkinson’s, Alzheimer’s, Huntington’s, ALS), demyelinating (multiple sclerosis), cerebrovascular (stroke), the epilepsies, movement/tic disorders, and psychiatric conditions (schizophrenia, OCD, PTSD, depression).',
      'Practise from a presentation, not a label: watch how a condition presents and reason backwards to the diagnosis, the way the round actually works.',
    ],
  },
  {
    icon: Timer,
    title: 'Live oral round',
    note: 'Rapid spoken Q&A, often an elimination format in the later stages.',
    how: [
      'Rehearse answering out loud and fast — written knowledge does not automatically transfer to a timed spoken answer.',
      'Practise with a partner or coach firing questions at you under a clock; get comfortable committing to an answer quickly.',
      'Drill the highest-frequency facts (neurotransmitters, major pathways, classic disorders) until recall is instant.',
    ],
  },
]

// A timeline expressed in relative blocks, not calendar months — the Brain Bee
// calendar varies by chapter and country, so we avoid claiming fixed dates.
const TIMELINE = [
  {
    label: 'Weeks 1-4 — Read & build the base',
    hours: '5-7 hrs/week',
    detail:
      'Work through Brain Facts blocks 1-3. Take handwritten notes focused on diagrams. Start a labelled-anatomy deck early — anatomy takes the longest to stick.',
  },
  {
    label: 'Weeks 5-8 — Finish content, start anatomy drills',
    hours: '7-9 hrs/week',
    detail:
      'Complete Brain Facts blocks 4-5. Begin daily neuroanatomy identification on an atlas/3D model and start your per-disorder diagnosis cards.',
  },
  {
    label: 'Weeks 9-12 — Round-specific practice',
    hours: '8-10 hrs/week',
    detail:
      'Shift the balance from reading to doing: timed anatomy stations, histology slide sets, MRI orientation, and out-loud oral drills. Quiz across, not within, topics.',
  },
  {
    label: 'Final 2-3 weeks — Simulate & taper',
    hours: '6-8 hrs/week',
    detail:
      'Run full mixed-format mocks under time pressure. Spend the last days on retrieval and weak-spot review, not new material. Arrive rested.',
  },
]

const RESOURCES = [
  {
    name: 'Brain Facts (Society for Neuroscience)',
    role: 'The official, free written-exam source — read it cover to cover',
    use: 'All weeks',
  },
  {
    name: 'IYNA Brain Bee bootcamp / study materials',
    role: 'Free student-run content aligned to the competition',
    use: 'Content + drilling',
  },
  {
    name: 'Free interactive 3D brain atlas',
    role: 'Identify structures by sight for the neuroanatomy and MRI rounds',
    use: 'Weeks 5 onward',
  },
  {
    name: 'A neuroanatomy / neuroscience textbook',
    role: 'Depth beyond Brain Facts when a topic needs more (e.g. Purves Neuroscience)',
    use: 'As needed',
  },
  {
    name: 'Public neuroimaging atlases',
    role: 'MRI orientation and structure identification on scans',
    use: 'Weeks 9 onward',
  },
  {
    name: 'A study partner or coach',
    role: 'Essential for the live oral — you cannot rehearse a spoken round alone',
    use: 'Weeks 9 onward',
  },
]

const FAQS = [
  {
    question: 'How long does it take to study for the Brain Bee?',
    answer:
      'A motivated student with a reasonable biology background can build a solid base in roughly 10-12 weeks of consistent work (5-10 hours a week), shifting from reading the Brain Facts book early on to round-specific drilling later. Starting from little neuroscience background, give yourself longer. The single thing that takes the most time to internalise is neuroanatomy, so begin that early rather than leaving it to the end.',
  },
  {
    question: 'What should I study first?',
    answer:
      'Start with the free Brain Facts book, working through it block by block — the neuron and signalling first, then the senses, movement, higher functions, and the disorders chapter. Begin labelled-anatomy practice as early as week 2 in parallel, because identifying structures by sight is a slow skill to build. Leave the round-specific drilling (timed anatomy stations, histology slides, MRI, out-loud oral) for once the content base is in place.',
  },
  {
    question: 'Is the written exam the main thing to study?',
    answer:
      'No. The written exam is only one part of the competition, and in most years it is not the largest. A typical Brain Bee also includes a human neuroanatomy practical, neurohistology, MRI/imaging identification, a patient-diagnosis round over roughly 20 neurological disorders, and a live oral. The exact rounds and their weighting vary from year to year and between the national and international levels, so do not over-invest in the book at the expense of the practical and clinical rounds.',
  },
  {
    question: 'How do I prepare for the neuroanatomy practical without a real brain?',
    answer:
      'Use a good labelled atlas and a free interactive 3D brain model to learn structures by sight, then drill identification under time pressure. Pair each structure with its function and the disorder that appears when it fails, and practise translating the same anatomy onto MRI slices. A live coach or study partner who can quiz you on unlabelled images accelerates this a lot, because the round tests instant recognition, not description.',
  },
  {
    question: 'Where does the patient-diagnosis content come from?',
    answer:
      'It draws on roughly 20 neurological and psychiatric disorders — neurodegenerative conditions (Parkinson’s, Alzheimer’s, Huntington’s, ALS), demyelinating disease (multiple sclerosis), stroke, the epilepsies, movement and tic disorders, and psychiatric conditions such as schizophrenia, OCD and PTSD. The most effective preparation is a one-page card per disorder and practising from a presentation back to the diagnosis, rather than memorising labels. The exact disorder list can vary year to year.',
  },
  {
    question: 'Are the official study materials really free?',
    answer:
      'Yes. The Brain Facts book from the Society for Neuroscience is free, and the student-run IYNA Brain Bee bootcamp and its materials are free too. They are genuinely good for the content layer. Paid coaching — including ours — is an optional supplement that adds live drilling, expert feedback and mock practice on the practical, clinical and oral rounds that free materials cannot replicate. You do not need to spend money to compete.',
  },
  {
    question: 'Is this guide affiliated with the official Brain Bee?',
    answer:
      'No. Cerebrum Biology Academy is independent. We are not affiliated with, authorised by, or endorsed by the International Brain Bee (IBB), the USA Brain Bee, or the Society for Neuroscience. "Brain Bee" is used here only to describe the competition this guide helps you prepare for.',
  },
]

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
    {
      '@type': 'ListItem',
      position: 2,
      name: 'Brain Bee Coaching',
      item: `${SITE_URL}/brain-bee-coaching`,
    },
    { '@type': 'ListItem', position: 3, name: 'Brain Bee Study Guide', item: PAGE_URL },
  ],
}

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to study for the Brain Bee',
  description:
    'A round-by-round study guide for the Brain Bee neuroscience competition (ages 13-19): a Brain Facts reading plan plus how to prepare the neuroanatomy, neurohistology, MRI, patient-diagnosis and live-oral rounds.',
  url: PAGE_URL,
  inLanguage: 'en-US',
  step: TIMELINE.map((t, i) => ({
    '@type': 'HowToStep',
    position: i + 1,
    name: t.label,
    text: t.detail,
  })),
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

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Brain Bee Study Guide: How to Study for the Brain Bee, Round by Round',
  url: PAGE_URL,
  inLanguage: 'en-US',
  datePublished: '2026-06-26',
  dateModified: '2026-06-26',
  author: { '@type': 'Organization', name: 'Cerebrum Biology Academy' },
  publisher: {
    '@type': 'Organization',
    name: 'Cerebrum Biology Academy',
    logo: { '@type': 'ImageObject', url: `${SITE_URL}/logo.png` },
  },
  audience: {
    '@type': 'EducationalAudience',
    educationalRole: 'student',
    audienceType:
      'High-school students (ages 13-19) preparing for the Brain Bee neuroscience competition',
  },
  speakable: {
    '@type': 'SpeakableSpecification',
    cssSelector: ['h1', 'details p'],
  },
  areaServed: { '@type': 'Country', name: 'United States' },
}

export default function BrainBeeStudyGuidePage() {
  const waUrl =
    'https://wa.me/918826444334?text=' +
    encodeURIComponent(
      "Hi — I'm studying for the Brain Bee (Grade/Year ___, based in [city, country]) and would like help with the practical and clinical rounds. Please share how your coaching works."
    )

  return (
    <>
      <CerebrumPersonSchema
        knowsAbout={[
          'Brain Bee Study Guide',
          'Brain Bee Preparation',
          'Neuroscience Competition Coaching',
          'Neuroanatomy',
          'Clinical Neurology / Patient Diagnosis',
          'International Brain Bee (IBB)',
        ]}
        jobTitle="Neuroscience Competition Coach — Brain Bee Preparation"
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
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
              <Link href="/brain-bee-coaching" className="hover:text-blue-700">
                Brain Bee Coaching
              </Link>
            </li>
            <ChevronRight className="h-3.5 w-3.5" />
            <li className="text-slate-700">Study Guide</li>
          </ol>
        </nav>

        {/* Hero */}
        <section className="mx-auto max-w-6xl px-4 pt-10 pb-12">
          <span className="inline-flex items-center gap-2 rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-blue-900">
            <BookOpen className="h-3.5 w-3.5" />
            Study Guide · Ages 13-19
          </span>
          <h1 className="mt-4 max-w-4xl text-3xl font-bold leading-tight text-slate-900 md:text-5xl">
            Brain Bee study guide:{' '}
            <span className="text-blue-700">how to study for every round.</span>
          </h1>
          <p className="mt-5 max-w-4xl text-lg leading-relaxed text-slate-600">
            Most students read the free Brain Facts book and stop there &mdash; but the Brain Bee is
            decided across several rounds, and in most years the written exam is not the largest of
            them. This guide gives you a chapter-by-chapter Brain Facts plan and, just as
            importantly, how to prepare the practical and clinical rounds the book never trains: the
            human neuroanatomy practical, neurohistology, MRI identification, patient diagnosis, and
            the live oral. (Round mix and weighting vary year to year and between the national and
            international levels.)
          </p>

          <div className="mt-7 flex flex-col gap-3 md:flex-row">
            <Link
              href="/brain-bee-coaching"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-700 px-5 py-3 text-base font-semibold text-white shadow hover:bg-blue-800"
            >
              <Target className="h-5 w-5" />
              See Brain Bee coaching
            </Link>
            <Link
              href="/brain-bee-neuroanatomy-guide"
              className="inline-flex items-center justify-center gap-2 rounded-lg border-2 border-blue-600 px-5 py-3 text-base font-semibold text-blue-700 hover:bg-blue-50"
            >
              <Microscope className="h-5 w-5" />
              Neuroanatomy reference
            </Link>
          </div>

          <p className="mt-4 text-xs text-slate-400">
            Independent study guide. Not affiliated with or endorsed by the International Brain Bee
            or the Society for Neuroscience. The official Brain Facts book and IYNA bootcamp are
            free.
          </p>
        </section>

        {/* Brain Facts plan */}
        <section className="bg-slate-50">
          <div className="mx-auto max-w-5xl px-4 py-14">
            <h2 className="text-2xl font-bold text-slate-900 md:text-3xl">
              Step 1 &mdash; A chapter-by-chapter Brain Facts plan
            </h2>
            <p className="mt-3 max-w-3xl text-slate-600">
              The free Brain Facts book (Society for Neuroscience) is the official written-exam
              source. Read it for retention, not skimming &mdash; in five focused blocks, with
              handwritten notes on the diagrams.
            </p>
            <div className="mt-8 space-y-5">
              {BRAIN_FACTS_PLAN.map((b) => (
                <div key={b.phase} className="rounded-2xl bg-white p-6 ring-1 ring-slate-200">
                  <h3 className="text-lg font-bold text-slate-900">{b.phase}</h3>
                  <p className="mt-1 text-sm font-semibold text-blue-700">{b.chapters}</p>
                  <p className="mt-2 text-sm leading-relaxed text-slate-700">{b.focus}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Round prep */}
        <section>
          <div className="mx-auto max-w-6xl px-4 py-14">
            <h2 className="text-2xl font-bold text-slate-900 md:text-3xl">
              Step 2 &mdash; Prepare the rounds the book doesn&rsquo;t train
            </h2>
            <p className="mt-3 max-w-3xl text-slate-600">
              The practical and clinical rounds are where most of the result is decided, and they
              cannot be learned by reading. Here is how to prepare each one. (Exact weighting varies
              year to year &mdash; treat the notes below as relative emphasis, not fixed
              percentages.)
            </p>
            <div className="mt-8 grid gap-5 md:grid-cols-2">
              {ROUND_PREP.map((r) => (
                <div key={r.title} className="rounded-2xl bg-white p-6 ring-1 ring-slate-200">
                  <r.icon className="h-6 w-6 text-blue-600" />
                  <h3 className="mt-3 text-lg font-bold text-slate-900">{r.title}</h3>
                  <p className="text-sm font-medium text-blue-700">{r.note}</p>
                  <ul className="mt-3 space-y-2">
                    {r.how.map((h) => (
                      <li key={h} className="flex gap-2 text-sm leading-relaxed text-slate-700">
                        <ChevronRight className="mt-1 h-3.5 w-3.5 shrink-0 text-blue-500" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section className="bg-slate-50">
          <div className="mx-auto max-w-5xl px-4 py-14">
            <h2 className="text-2xl font-bold text-slate-900 md:text-3xl">
              Step 3 &mdash; A study timeline
            </h2>
            <p className="mt-3 max-w-3xl text-slate-600">
              The Brain Bee calendar varies by chapter and country, so this is a relative arc
              &mdash; count backwards from your competition date. Roughly a quarter on first-pass
              reading, half on round-specific drilling, and the last stretch on simulation and
              taper.
            </p>
            <div className="mt-8 space-y-4">
              {TIMELINE.map((t) => (
                <div key={t.label} className="rounded-xl border border-slate-200 bg-white p-6">
                  <div className="flex flex-col md:flex-row md:items-baseline md:justify-between">
                    <h3 className="text-lg font-bold text-slate-900">{t.label}</h3>
                    <span className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-700 md:mt-0">
                      <Clock className="h-4 w-4" /> {t.hours}
                    </span>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-slate-700">{t.detail}</p>
                </div>
              ))}
            </div>
            <div className="mt-6 flex gap-2 rounded-lg border border-amber-200 bg-amber-50 p-4">
              <Lightbulb className="h-5 w-5 shrink-0 text-amber-600" />
              <p className="text-sm leading-relaxed text-slate-700">
                <strong>The most common mistake: </strong>spending almost all the time on the Brain
                Facts book because it is the easiest part to study, then meeting the neuroanatomy
                practical and live oral cold. Start anatomy drills early and rehearse the oral out
                loud &mdash; those are the rounds that separate finalists.
              </p>
            </div>
          </div>
        </section>

        {/* Resources */}
        <section>
          <div className="mx-auto max-w-5xl px-4 py-14">
            <div className="flex items-center gap-3">
              <BookOpen className="h-7 w-7 text-blue-600" />
              <h2 className="text-2xl font-bold text-slate-900 md:text-3xl">Resources</h2>
            </div>
            <p className="mt-3 max-w-3xl text-slate-600">
              You can prepare for the Brain Bee entirely with free and low-cost resources. The
              official materials are free &mdash; start there.
            </p>
            <div className="mt-8 grid gap-4 md:grid-cols-2">
              {RESOURCES.map((r) => (
                <div key={r.name} className="rounded-xl border border-slate-200 bg-white p-5">
                  <h3 className="font-semibold text-slate-900">{r.name}</h3>
                  <p className="mt-1 text-sm text-slate-600">{r.role}</p>
                  <span className="mt-2 inline-block rounded bg-blue-100 px-2 py-0.5 text-xs font-medium text-blue-700">
                    {r.use}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="bg-slate-50">
          <div className="mx-auto max-w-4xl px-4 py-16">
            <h2 className="text-2xl font-bold text-slate-900 md:text-3xl">
              Brain Bee study &mdash; common questions
            </h2>
            <div className="mt-7 divide-y divide-slate-200">
              {FAQS.map((f, idx) => (
                <details key={idx} className="group py-5">
                  <summary className="flex cursor-pointer items-center justify-between gap-4 text-base font-semibold text-slate-900">
                    <span>{f.question}</span>
                    <ChevronRight className="h-5 w-5 shrink-0 text-slate-400 transition-transform group-open:rotate-90" />
                  </summary>
                  <p className="mt-3 text-sm leading-relaxed text-slate-700">{f.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* Soft CTA */}
        <section className="bg-slate-900 py-14 text-white">
          <div className="mx-auto max-w-3xl px-4 text-center">
            <Activity className="mx-auto h-10 w-10 text-amber-300" />
            <h2 className="mt-4 text-2xl font-bold md:text-3xl">
              Want the practical rounds drilled live?
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-slate-300">
              This guide gets you a long way on your own. If you want a coach to run timed
              neuroanatomy stations, patient-diagnosis clinics with AIIMS-trained faculty (AIIMS is
              India&rsquo;s apex medical institution), and live two-strike oral practice, we coach
              the Brain Bee in all US time zones (ET / CT / MT / PT).
            </p>
            <div className="mt-7 flex flex-col justify-center gap-3 md:flex-row">
              <Link
                href="/brain-bee-coaching"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-6 py-3 text-base font-semibold hover:bg-blue-700"
              >
                <Target className="h-5 w-5" />
                See the coaching programme
              </Link>
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-lg border-2 border-white px-6 py-3 text-base font-semibold hover:bg-white hover:text-slate-900"
              >
                <MessageCircle className="h-5 w-5" />
                WhatsApp a question
              </a>
            </div>
            <p className="mt-4 text-sm text-slate-300">
              WhatsApp works free from the US &mdash; no international call needed.
            </p>
          </div>
        </section>

        {/* Related */}
        <section className="py-12 bg-white">
          <div className="mx-auto max-w-5xl px-4">
            <h2 className="mb-6 text-center text-xl font-bold text-slate-900">Related guides</h2>
            <div className="grid gap-4 md:grid-cols-3">
              <Link
                href="/brain-bee-coaching"
                className="rounded-xl border border-slate-200 bg-slate-50 p-4 transition hover:border-blue-300 hover:shadow-md"
              >
                <h3 className="font-semibold text-blue-700">Brain Bee Coaching</h3>
                <p className="mt-1 text-xs text-slate-600">Live small-batch competition coaching</p>
              </Link>
              <Link
                href="/brain-bee-neuroanatomy-guide"
                className="rounded-xl border border-slate-200 bg-slate-50 p-4 transition hover:border-blue-300 hover:shadow-md"
              >
                <h3 className="font-semibold text-blue-700">Neuroanatomy Reference</h3>
                <p className="mt-1 text-xs text-slate-600">
                  Every structure you must know by sight
                </p>
              </Link>
              <Link
                href="/how-to-make-us-ibo-team"
                className="rounded-xl border border-slate-200 bg-slate-50 p-4 transition hover:border-blue-300 hover:shadow-md"
              >
                <h3 className="font-semibold text-blue-700">USA Biology Olympiad pathway</h3>
                <p className="mt-1 text-xs text-slate-600">
                  Another route for biology-minded students
                </p>
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
