import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, BookOpen, Target, Award, Clock } from 'lucide-react'
import { FAQSchema } from '@/components/seo/FAQSchema'
import { BreadcrumbSchema } from '@/components/seo/BreadcrumbSchema'
import { LeadCaptureForm } from '@/components/landing/LeadCaptureForm'
import { FloatingWhatsAppButton } from '@/components/landing/FloatingWhatsAppButton'

const PAGE_URL = 'https://cerebrumbiologyacademy.com/cbse-to-olympiad-transition'
const CAMPAIGN = 'cbse-olympiad-transition'

export const metadata: Metadata = {
  title: 'CBSE Biology to Biology Olympiad Transition Guide | NCERT → NSEB → IBO',
  description:
    'Step-by-step guide for CBSE Class 9-12 students transitioning from NCERT biology to Biology Olympiad preparation. NCERT → Campbell → NSEB → INBO → IBO roadmap with timeline, books, and parallel-prep strategy.',
  keywords: [
    'CBSE to biology olympiad',
    'NCERT to NSEB transition',
    'biology olympiad for CBSE students',
    'NCERT Campbell bridge',
    'NSEB preparation CBSE',
    'CBSE class 11 olympiad prep',
    'parallel prep CBSE olympiad',
    'biology olympiad India roadmap',
  ],
  alternates: {
    canonical: PAGE_URL,
    languages: {
      'en-IN': PAGE_URL,
      en: PAGE_URL,
      'x-default': PAGE_URL,
    },
  },
  openGraph: {
    title: 'CBSE → Biology Olympiad Transition — Complete Roadmap',
    description:
      'How CBSE Biology students move from NCERT to NSEB, INBO, and IBO. Timeline, books, and the parallel-prep playbook Indian students use to qualify.',
    type: 'article',
    url: PAGE_URL,
    siteName: 'Cerebrum Biology Academy',
    locale: 'en_IN',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CBSE → Biology Olympiad Transition Guide',
    description:
      'Complete roadmap for CBSE Class 9-12 students to transition into NSEB, INBO, and IBO preparation.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
}

const timeline = [
  {
    stage: 'Class 9-10',
    title: 'Build the NCERT foundation',
    body: 'Finish NCERT Class 9-10 Science with extra depth on biology chapters. Start reading Campbell Biology Unit 1 (Chemistry of Life) alongside school syllabus. Target 15-20 minutes of olympiad reading per day.',
    tool: 'NCERT 9-10 Science + Campbell Unit 1',
  },
  {
    stage: 'Class 11 Q1 (Jul-Sep)',
    title: 'Start Campbell in parallel with Class 11 NCERT',
    body: 'NCERT Class 11 Biology runs on the right; Campbell Biology Units 2-4 (Cell, Genetics, Evolution) on the left. Take 3-4 hours of olympiad-focused work per week.',
    tool: 'NCERT Class 11 + Campbell Units 2-4',
  },
  {
    stage: 'Class 11 Q2 (Oct-Nov)',
    title: 'First NSEB attempt',
    body: 'Register via IAPT through your school in September. Sit the November NSEB paper. Even without a qualifying score, this first attempt calibrates question patterns for the Class 12 serious attempt.',
    tool: 'NSEB past papers 2015-2024',
  },
  {
    stage: 'Class 11 Q3 (Dec-Mar)',
    title: 'Campbell complete + past papers',
    body: 'Finish Campbell Units 5-8 (Diversity, Plant, Animal, Ecology). Start timed NSEB past-paper drills — 1 paper per week. Layer in data-interpretation practice on experimental design questions.',
    tool: 'Campbell Units 5-8 + past-paper drills',
  },
  {
    stage: 'Class 11 Q4 (Apr-Jun)',
    title: 'Raven + advanced topics',
    body: 'Supplement with Raven Biology for genetics deep-dive and Taylor for ecology. This is also when NEET aspirants continue parallel NCERT revision. NSEB-focused students start mock exams at full NSEB difficulty.',
    tool: 'Raven + Taylor + weekly mock exams',
  },
  {
    stage: 'Class 12 Q1-Q2',
    title: 'Second NSEB + INBO preparation',
    body: 'Second NSEB attempt in November (serious attempt). If you clear the ~300-student cutoff, INBO (February) is next — theory + practical. Our Elite 1:1 programme layers NEET Biology prep underneath.',
    tool: 'NSEB mocks + INBO practical-skills module',
  },
  {
    stage: 'Post-INBO',
    title: 'OCSC training camp + IBO selection',
    body: 'Top ~30 INBO scorers attend HBCSE OCSC (April-May). Final 4 represent India at IBO (July). At this stage, students combine NEET revision with IBO-specific lab-skills training.',
    tool: 'HBCSE OCSC curriculum + IBO practical mocks',
  },
]

const bookBridge = [
  {
    ncert: 'NCERT Class 11 — The Living World, Biological Classification',
    campbell: 'Campbell Biology Unit 5 (Diversity) — Chapters 25-34',
    gap: 'Campbell adds molecular phylogenetics, cladistics, and evolutionary relationships that NCERT omits.',
  },
  {
    ncert: 'NCERT Class 11 — Cell: The Unit of Life, Biomolecules',
    campbell: 'Campbell Biology Unit 1-2 (Chemistry + Cell) — Chapters 1-12',
    gap: 'Campbell covers enzyme kinetics, membrane transport depth, and cell signaling — olympiad questions pull heavily from these topics.',
  },
  {
    ncert: 'NCERT Class 12 — Genetics and Evolution',
    campbell: 'Campbell Biology Unit 3 (Genetics) — Chapters 14-21',
    gap: 'Campbell goes to population genetics, molecular genetics, and experimental design questions that NSEB tests but NCERT does not.',
  },
  {
    ncert: 'NCERT Class 12 — Ecology and Environment',
    campbell: 'Campbell Biology Unit 8 (Ecology) — Chapters 52-56',
    gap: 'Campbell and Taylor both add quantitative ecology, biostatistics basics, and data-interpretation — the core of NSEB ecology section.',
  },
  {
    ncert: 'NCERT Class 12 — Human Physiology',
    campbell: 'Campbell Biology Unit 7 (Animal Form + Function) — Chapters 40-50',
    gap: 'Campbell adds comparative physiology, homeostatic feedback circuits, and organ-system integration at a level NSEB regularly tests.',
  },
]

const faqs = [
  {
    question: 'Can CBSE students qualify for NSEB without special coaching?',
    answer:
      'Yes, but it is rare. NCERT Class 11-12 biology alone covers 50-60% of NSEB question depth. The gap is in molecular biology, experimental design, and data interpretation — all of which Campbell Biology and past-paper practice fill. CBSE students who self-study typically need 6-9 months of focused olympiad prep beyond school work.',
  },
  {
    question: 'Is olympiad prep possible alongside NEET preparation?',
    answer:
      'Yes — this is the most common path for Indian students. NSEB and NEET overlap roughly 70% at the NCERT level; Campbell Biology adds depth that also strengthens NEET conceptual understanding. The additional commitment is 3-6 hours per week in Class 11, scaling to 8-10 in Class 12 Q1 before NSEB in November.',
  },
  {
    question: 'When should a CBSE student start olympiad prep?',
    answer:
      'Ideally Class 9-10 for the strongest results (5 years of runway). Class 11 start is the most common and fits our Complete Olympiad Year programme (9-12 months). Late Class 11 or Class 12 start is viable but requires an intensive 6-8 month sprint with daily commitment.',
  },
  {
    question: 'Which is harder: NEET Biology or NSEB?',
    answer:
      'NSEB is harder conceptually but tests fewer topics. NEET covers the full Class 11-12 syllabus at NCERT depth; NSEB goes deeper into Campbell-level concepts on a subset of topics. A student targeting NEET 650+ is usually within reach of NSEB top 1% with an additional 6 months of structured prep.',
  },
  {
    question: 'How does INBO selection work for CBSE students?',
    answer:
      'All Indian students regardless of board (CBSE, ICSE, IB, Cambridge) compete in the same NSEB/INBO pipeline. NSEB happens in November, open to Class 11-12 students. The top ~300 nationally (roughly top 1% of registrations) qualify for INBO in February. Top ~30 INBO performers attend HBCSE OCSC camp; final 4 represent India at IBO.',
  },
  {
    question: 'Does olympiad prep help with college admissions abroad?',
    answer:
      'Yes. NSEB qualification (top 1% nationally) is a recognised academic achievement for US, UK, Canada, and Singapore university applications. INBO qualification is stronger — medallists and OCSC participants are flagged on Ivy League admissions. IBO representation is elite-tier.',
  },
  {
    question: 'What does CBSE → Olympiad coaching cost?',
    answer:
      'Our Complete Olympiad Year programme covering the full 9-12 month journey (Campbell sweep + past papers + mocks + INBO prep) is approximately ₹3.8 lakh or equivalent. 1:1 Elite Mentoring with a senior tutor: ~₹7,500 per hour. Small-Batch Weekend: ~₹4,200 per hour. See /nseb-coaching for detailed pricing.',
  },
  {
    question: 'Can I continue olympiad prep if I do not clear NSEB the first time?',
    answer:
      'Yes. Many students use the Class 11 NSEB attempt as calibration and clear it in Class 12. The same Campbell foundation also strengthens NEET by 20-40 marks typically. Our programme continues through Class 12 NEET prep for students who pivot from olympiad to NEET focus.',
  },
]

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((f) => ({
    '@type': 'Question',
    name: f.question,
    acceptedAnswer: { '@type': 'Answer', text: f.answer },
  })),
}

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How a CBSE Biology student transitions to Biology Olympiad',
  description:
    'A 2-3 year stepwise plan for CBSE Class 9-12 students to progress from NCERT Biology to NSEB, INBO, OCSC, and IBO.',
  totalTime: 'P3Y',
  inLanguage: 'en-IN',
  step: timeline.map((t, i) => ({
    '@type': 'HowToStep',
    position: i + 1,
    name: `${t.stage}: ${t.title}`,
    text: t.body,
  })),
  tool: [
    { '@type': 'HowToTool', name: 'NCERT Class 9-12 Biology' },
    { '@type': 'HowToTool', name: 'Campbell Biology 11th or 12th edition' },
    { '@type': 'HowToTool', name: 'NSEB past papers archive (2010+)' },
    { '@type': 'HowToTool', name: 'Raven Biology (supplementary)' },
  ],
}

export default function CBSEToOlympiadTransitionPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
      <BreadcrumbSchema
        items={[
          { label: 'Biology Olympiads', href: '/biology-olympiads' },
          { label: 'CBSE to Olympiad Transition', isCurrentPage: true },
        ]}
        showSchemaOnly
      />
      <FAQSchema questions={faqs} pageUrl={PAGE_URL} />

      <main className="min-h-screen bg-white">
        {/* Hero */}
        <section className="relative overflow-hidden bg-slate-950 text-white">
          <div className="absolute inset-0">
            <div className="absolute -top-24 -left-24 h-[28rem] w-[28rem] rounded-full bg-green-500/10 blur-3xl" />
            <div className="absolute bottom-0 right-0 h-[32rem] w-[32rem] rounded-full bg-blue-500/10 blur-3xl" />
          </div>

          <div className="relative mx-auto max-w-7xl px-6 py-14 md:py-24">
            <div className="grid gap-10 lg:grid-cols-5 lg:items-start lg:gap-12">
              <div className="order-2 lg:order-1 lg:col-span-3">
                <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-medium text-slate-200">
                  <BookOpen className="h-3.5 w-3.5 text-green-400" />
                  For CBSE Class 9-12 students · Parallel NEET + Olympiad prep
                </div>

                <h1 className="text-4xl font-semibold leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-6xl">
                  NCERT to IBO,
                  <br />
                  <span className="text-green-400">the CBSE student&rsquo;s roadmap.</span>
                </h1>

                <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate-300">
                  7-stage transition plan, the Campbell ↔ NCERT bridge, and how to run olympiad
                  prep alongside NEET preparation without burning out.
                </p>

                <dl className="mt-10 grid max-w-xl grid-cols-3 gap-6 border-t border-white/10 pt-8">
                  <div>
                    <dt className="text-xs uppercase tracking-wider text-slate-400">Timeline</dt>
                    <dd className="mt-1 text-2xl font-semibold text-white">2-3 yrs</dd>
                  </div>
                  <div>
                    <dt className="text-xs uppercase tracking-wider text-slate-400">
                      Weekly effort
                    </dt>
                    <dd className="mt-1 text-2xl font-semibold text-white">3-10 hrs</dd>
                  </div>
                  <div>
                    <dt className="text-xs uppercase tracking-wider text-slate-400">
                      NEET overlap
                    </dt>
                    <dd className="mt-1 text-2xl font-semibold text-white">~70%</dd>
                  </div>
                </dl>
              </div>

              <div className="order-1 lg:order-2 lg:col-span-2">
                <LeadCaptureForm
                  source="hero"
                  campaign={CAMPAIGN}
                  heading="Start CBSE → olympiad prep"
                  subheading="Free demo. We map a timeline to your class, school, and NEET goal in 15 minutes."
                  showFaculty
                />
              </div>
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section className="border-b border-slate-200 py-14 md:py-20">
          <div className="mx-auto max-w-5xl px-6">
            <div className="max-w-2xl">
              <h2 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
                The 7-stage transition.
              </h2>
              <p className="mt-3 text-lg text-slate-600">
                From Class 9 NCERT reading to representing India at IBO — what to read, when to sit
                which exam, and how much time per week.
              </p>
            </div>

            <div className="mt-10 space-y-4">
              {timeline.map((t, i) => (
                <div
                  key={t.stage}
                  className="flex gap-5 rounded-2xl border border-slate-200 bg-white p-6"
                >
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-green-100 text-sm font-bold text-green-700">
                    {i + 1}
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-semibold uppercase tracking-wider text-green-700">
                      {t.stage}
                    </p>
                    <h3 className="mt-1 text-lg font-semibold text-slate-900">{t.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-600">{t.body}</p>
                    <p className="mt-3 inline-flex items-center gap-1.5 text-xs font-medium text-slate-500">
                      <BookOpen className="h-3 w-3" />
                      {t.tool}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* NCERT ↔ Campbell bridge */}
        <section className="border-b border-slate-200 bg-slate-50 py-14 md:py-20">
          <div className="mx-auto max-w-6xl px-6">
            <h2 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
              The NCERT ↔ Campbell bridge.
            </h2>
            <p className="mt-3 max-w-2xl text-lg text-slate-600">
              Where your school chapter maps to olympiad depth — and exactly which gaps NSEB tests
              that NCERT omits.
            </p>

            <div className="mt-10 space-y-4">
              {bookBridge.map((b) => (
                <div
                  key={b.ncert}
                  className="grid gap-4 rounded-2xl border border-slate-200 bg-white p-5 md:grid-cols-5"
                >
                  <div className="md:col-span-2">
                    <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                      NCERT chapter
                    </p>
                    <p className="mt-1 text-sm font-semibold text-slate-900">{b.ncert}</p>
                  </div>
                  <div className="md:col-span-2">
                    <p className="text-xs font-semibold uppercase tracking-wider text-green-700">
                      Campbell mapping
                    </p>
                    <p className="mt-1 text-sm font-semibold text-slate-900">{b.campbell}</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Gap NSEB tests
                    </p>
                    <p className="mt-1 text-xs leading-relaxed text-slate-600">{b.gap}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why this transition pays off */}
        <section className="border-b border-slate-200 py-14 md:py-20">
          <div className="mx-auto max-w-6xl px-6">
            <h2 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
              Why CBSE students who do olympiad win NEET too.
            </h2>
            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {[
                {
                  icon: Target,
                  title: 'NEET conceptual lift',
                  body: 'Campbell depth on genetics, molecular biology, and physiology typically adds 20-40 marks to NEET Biology. Our NEET-only students reach 340/360; olympiad-track students often hit 350-360.',
                },
                {
                  icon: Award,
                  title: 'College application edge',
                  body: 'NSEB top 1% plus INBO qualification is a recognised academic credential for US, UK, Singapore, and Canada university applications. IBO representation is elite-tier on Ivy profiles.',
                },
                {
                  icon: Clock,
                  title: 'Parallel-prep efficient',
                  body: 'Because olympiad and NEET overlap ~70% at the NCERT level, incremental effort for olympiad is 3-6 hrs/wk in Class 11. The work pays back on both exams.',
                },
              ].map((item) => (
                <div key={item.title} className="rounded-2xl border border-slate-200 bg-white p-6">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-100">
                    <item.icon className="h-5 w-5 text-green-700" />
                  </div>
                  <h3 className="mt-4 text-lg font-semibold text-slate-900">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">{item.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="border-b border-slate-200 bg-slate-50 py-14 md:py-20">
          <div className="mx-auto max-w-3xl px-6">
            <h2 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
              CBSE parent and student questions.
            </h2>
            <div className="mt-8 space-y-3">
              {faqs.map((f) => (
                <details
                  key={f.question}
                  className="group rounded-xl border border-slate-200 bg-white p-5 open:border-green-300"
                >
                  <summary className="flex cursor-pointer list-none items-start justify-between gap-4">
                    <span className="text-sm font-semibold text-slate-900">{f.question}</span>
                    <span className="mt-0.5 text-slate-400 group-open:rotate-180 transition-transform">
                      ▾
                    </span>
                  </summary>
                  <p className="mt-4 text-sm leading-relaxed text-slate-700">{f.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* Cross-links */}
        <section className="border-b border-slate-200 py-14 md:py-20">
          <div className="mx-auto max-w-5xl px-6">
            <h2 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
              Where to go next.
            </h2>
            <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {[
                { label: 'NSEB Coaching (Stage 1)', href: '/nseb-coaching' },
                { label: 'INBO Coaching (Stage 2)', href: '/inbo-coaching' },
                { label: 'IBO Preparation (Finals)', href: '/ibo-preparation' },
                { label: 'All Biology Olympiads', href: '/biology-olympiads' },
                { label: 'Olympiad by City (India)', href: '/biology-olympiads/india/delhi' },
                {
                  label: 'IB + Olympiad Parallel Prep',
                  href: '/ib-biology-olympiad-parallel-prep',
                },
              ].map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="group flex items-center justify-between rounded-xl border border-slate-200 bg-white p-4 transition-all hover:border-green-300 hover:shadow-sm"
                >
                  <span className="text-sm font-semibold text-slate-900 group-hover:text-green-700">
                    {l.label}
                  </span>
                  <ArrowRight className="h-4 w-4 text-slate-400 transition-transform group-hover:translate-x-0.5 group-hover:text-green-600" />
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Closing form */}
        <section className="bg-slate-950 py-14 md:py-20 text-white">
          <div className="mx-auto max-w-4xl px-6">
            <div className="grid gap-10 lg:grid-cols-5 lg:items-center">
              <div className="lg:col-span-2">
                <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                  Start your CBSE → olympiad plan.
                </h2>
                <p className="mt-4 text-base leading-relaxed text-slate-300">
                  Free demo class. We confirm your class, school board, and target (NEET / NSEB /
                  both) and return a week-by-week plan within 15 minutes.
                </p>
              </div>
              <div className="lg:col-span-3">
                <LeadCaptureForm
                  source="final-cta"
                  campaign={CAMPAIGN}
                  heading="Book your planning call"
                  subheading="Same form, same promise."
                />
              </div>
            </div>
          </div>
        </section>

        {/* Legal footer */}
        <section className="bg-white py-6">
          <div className="mx-auto max-w-4xl px-6 text-center">
            <div className="flex flex-wrap justify-center gap-4 text-xs text-slate-500">
              <a href="/privacy-policy" className="underline hover:text-slate-900">
                Privacy
              </a>
              <a href="/terms-of-service" className="underline hover:text-slate-900">
                Terms
              </a>
              <a href="/contact" className="underline hover:text-slate-900">
                Contact
              </a>
            </div>
          </div>
        </section>

        <FloatingWhatsAppButton
          message="Hi Cerebrum, I am a CBSE student and want to understand how to transition into olympiad prep alongside NEET. Please share a plan for my class."
          campaign={CAMPAIGN}
          tooltip="Plan your CBSE → olympiad transition"
        />
      </main>
    </>
  )
}
