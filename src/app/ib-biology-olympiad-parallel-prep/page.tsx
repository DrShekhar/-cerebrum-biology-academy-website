import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Layers, Target, Award, Calendar } from 'lucide-react'
import { FAQSchema } from '@/components/seo/FAQSchema'
import { BreadcrumbSchema } from '@/components/seo/BreadcrumbSchema'
import { LeadCaptureForm } from '@/components/landing/LeadCaptureForm'
import { FloatingWhatsAppButton } from '@/components/landing/FloatingWhatsAppButton'

const PAGE_URL = 'https://cerebrumbiologyacademy.com/ib-biology-olympiad-parallel-prep'
const CAMPAIGN = 'ib-olympiad-parallel'

export const metadata: Metadata = {
  title: 'IB HL Biology + Biology Olympiad Parallel Prep Guide | Dual Track for IB Students',
  description:
    'How IB HL Biology students run Biology Olympiad preparation (IBO, USABO, BBO, NSEB, INBO) alongside HL coursework without burning out. Topic overlap, weekly time, selection eligibility.',
  keywords: [
    'IB HL biology olympiad',
    'IB biology IBO preparation',
    'IB to NSEB INBO',
    'IB olympiad dual track',
    'IB biology Campbell bridge',
    'IB HL olympiad parallel prep',
    'biology olympiad for IB students',
    'IBO from IB biology',
  ],
  alternates: {
    canonical: PAGE_URL,
    languages: {
      en: PAGE_URL,
      'en-IN': PAGE_URL,
      'en-US': PAGE_URL,
      'en-GB': PAGE_URL,
      'en-SG': PAGE_URL,
      'x-default': PAGE_URL,
    },
  },
  openGraph: {
    title: 'IB + Biology Olympiad — Parallel Prep Guide',
    description:
      'Topic overlap, weekly time commitment, and selection eligibility for IB HL students running olympiad prep in parallel.',
    type: 'article',
    url: PAGE_URL,
    siteName: 'Cerebrum Biology Academy',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'IB + Biology Olympiad Parallel Prep Guide',
    description:
      'How IB HL students layer olympiad prep onto HL coursework without burnout. Topic overlap, timeline, eligibility.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
}

const topicOverlap = [
  {
    ibTheme: 'Theme A — Unity and Diversity',
    olympiadUnits: 'Campbell Units 1-2 (Chemistry of Life, Cell)',
    overlap: '95%',
    note: 'IB HL covers cell structure, membranes, water properties at near-olympiad depth. Add enzyme kinetics from Campbell for NSEB-level questions.',
  },
  {
    ibTheme: 'Theme B — Form and Function',
    olympiadUnits: 'Campbell Units 6-7 (Plant, Animal Form + Function)',
    overlap: '80%',
    note: 'IB covers gas exchange, transport, digestion. Olympiads add quantitative physiology, homeostatic feedback circuits, and comparative anatomy.',
  },
  {
    ibTheme: 'Theme C — Interaction and Interdependence',
    olympiadUnits: 'Campbell Unit 8 (Ecology)',
    overlap: '75%',
    note: 'IB ecology reaches population-level thinking. Olympiads add biostatistics, quantitative ecology, and data-interpretation on field experiments.',
  },
  {
    ibTheme: 'Theme D — Continuity and Change',
    olympiadUnits: 'Campbell Units 3-4 (Genetics, Evolution)',
    overlap: '85%',
    note: 'IB HL genetics depth is strong. Olympiads add population genetics, molecular phylogenetics, and experimental genetics questions NSEB regularly tests.',
  },
]

const weeklyPlan = [
  {
    phase: 'IBDP Year 1 Q1-Q2 (Sep-Dec)',
    hl: '6 hours / week HL classes + 4 hours self-study',
    olympiad: '+3 hours / week olympiad Campbell reading',
    total: '~13 hours / week biology',
    note: 'Start Campbell Units 1-2 alongside Theme A. Shared content — not extra material.',
  },
  {
    phase: 'IBDP Year 1 Q3 (Jan-Mar)',
    hl: '6 hours / week HL + IA data-collection',
    olympiad: '+4 hours / week Campbell + past papers',
    total: '~14-16 hours / week biology',
    note: 'IB IA and olympiad past papers run in parallel. Both require experimental design thinking.',
  },
  {
    phase: 'IBDP Year 1 Q4 (Apr-Jun)',
    hl: '4 hours / week HL + IA draft',
    olympiad: '+5 hours / week full past-paper drills',
    total: '~14-15 hours / week biology',
    note: 'If targeting India NSEB (November) or USABO (late-winter), this is the serious ramp-up phase.',
  },
  {
    phase: 'IBDP Year 2 Q1 (Jul-Nov)',
    hl: '6 hours / week HL + mocks',
    olympiad: 'NSEB attempt (India) OR USABO prep',
    total: '~15-18 hours / week biology',
    note: 'NSEB students sit the November paper. USABO students start Open exam prep. BBO students prep March-April paper.',
  },
  {
    phase: 'IBDP Year 2 Q2-Q3 (Dec-Apr)',
    hl: '6-8 hours / week HL + IB mocks',
    olympiad: 'INBO (Feb, Indian qualifiers) / Advanced prep',
    total: '~15-20 hours / week biology',
    note: 'Indian qualifiers attend INBO theory + practical. IB mocks also run this window — heaviest period.',
  },
  {
    phase: 'IBDP Year 2 Q4 (May-Jul)',
    hl: 'IB exams (May), results (Jul)',
    olympiad: 'OCSC camp (India, Apr-May) / IBO (Jul)',
    total: 'Exam season',
    note: 'If you reach OCSC or IBO, it overlaps with IB exam completion. Our programme schedules around both.',
  },
]

const eligibilityByCountry = [
  {
    country: 'India',
    olympiad: 'NSEB → INBO → OCSC → IBO',
    eligibility:
      'Any Indian school student (IB, CBSE, ICSE, Cambridge) can register for NSEB through school. IB students compete in the same pipeline as CBSE.',
    href: '/nseb-coaching',
  },
  {
    country: 'USA',
    olympiad: 'USABO (Open → Semifinals → Finals → IBO)',
    eligibility:
      'US high school students (including IB students at US IB schools) register through USABO.org. IB HL Biology directly prepares for USABO depth.',
    href: '/usabo-coaching',
  },
  {
    country: 'UK',
    olympiad: 'BBO (British Biology Olympiad)',
    eligibility:
      'UK sixth-form students (Year 12-13) register via the Royal Society of Biology. IB students at UK IB schools are eligible.',
    href: '/bbo-preparation',
  },
  {
    country: 'Singapore',
    olympiad: 'SBO (Singapore Biology Olympiad)',
    eligibility:
      'Singapore JC / IB Year 11-12 students register through school. IB students are commonly top SBO scorers due to curriculum depth.',
    href: '/sbo-coaching',
  },
  {
    country: 'International (any country)',
    olympiad: 'IBO (via your country olympiad selection)',
    eligibility:
      'IBO allows 4 representatives per country, selected via the national olympiad. IB students do not have a separate IB-specific olympiad — they compete via their school country.',
    href: '/ibo-preparation',
  },
]

const faqs = [
  {
    question: 'Is IB HL Biology enough to attempt a biology olympiad?',
    answer:
      'IB HL covers 75-85% of olympiad conceptual depth depending on the olympiad. The gaps are typically in biostatistics, experimental design, molecular phylogenetics, and quantitative ecology — all of which Campbell Biology fills. IB HL students start with a stronger foundation than CBSE or A-Level students.',
  },
  {
    question: 'Will olympiad prep hurt my IB grade?',
    answer:
      'No — if scheduled correctly. Because IB HL and olympiad overlap 75-95% by theme, the incremental commitment is 3-5 hours per week in IBDP Year 1, scaling to 6-10 in Year 2. Olympiad past-paper practice also strengthens IB HL Paper 2 data-interpretation skills. Our programme is specifically designed to run alongside IB without conflict.',
  },
  {
    question: 'When should an IB student start olympiad prep?',
    answer:
      'IBDP Year 1 Q1 (September) is ideal — aligns with starting HL coursework. Late Year 1 (April onward) is viable for focused students. Year 2 start is only possible for USABO/BBO tracks (spring exam windows), too late for NSEB (November exam).',
  },
  {
    question: 'Can IB students qualify for IBO (the world finals)?',
    answer:
      'Yes. IBO selects 4 students per country via the national olympiad. IB students at, for example, Indian IB schools compete in the NSEB-INBO pipeline with CBSE/ICSE students. Students at US IB schools go through USABO. The olympiad does not distinguish by school curriculum — only by country of schooling.',
  },
  {
    question: 'How does olympiad certification help with university admissions?',
    answer:
      'Strong IB score plus olympiad credentials is a powerful combination for competitive university applications. NSEB top 1%, INBO qualification, BBO Gold, USABO Semifinalist, or IBO representation are recognised achievements on Ivy League, Oxbridge, NUS, and top medical school applications.',
  },
  {
    question: 'What does parallel-prep coaching cost?',
    answer:
      'Our Complete Olympiad Year programme (9-12 months, layered onto IB HL coursework): $4,500 reference with local currency auto-displayed. 1:1 Elite Mentoring: $90 per hour. Small-Batch Weekend: $50 per hour. See /biology-olympiads for the full matrix and your country currency.',
  },
  {
    question: 'Do you coach IB HL Biology and olympiad from the same curriculum?',
    answer:
      'Yes. Campbell Biology is the canonical reference for both IB HL and most olympiads. Our curriculum runs Campbell-first, then maps sections to IB Themes A-D for exam-specific practice, and to NSEB/BBO/USABO past-paper patterns. One mentor, one textbook, two exam outcomes.',
  },
  {
    question: 'What if I am in an IB school in a country without a major olympiad?',
    answer:
      'You can still compete in IBO via your national selection if one exists, or apply to open international competitions (some olympiads accept international applicants). Contact us with your country and school — we will confirm olympiad eligibility and map the closest pathway.',
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

export default function IBOlympiadParallelPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <BreadcrumbSchema
        items={[
          { label: 'IB Biology', href: '/ib-biology' },
          { label: 'Olympiad Parallel Prep', isCurrentPage: true },
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
                  <Layers className="h-3.5 w-3.5 text-green-400" />
                  For IB HL Biology students · Dual track with NSEB, USABO, BBO, SBO, IBO
                </div>

                <h1 className="text-4xl font-semibold leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-6xl">
                  IB HL + olympiad,
                  <br />
                  <span className="text-green-400">one curriculum, two exams.</span>
                </h1>

                <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate-300">
                  Theme-by-theme overlap with Campbell Biology, week-by-week time commitment, and
                  country-specific olympiad eligibility for IB school students.
                </p>

                <dl className="mt-10 grid max-w-xl grid-cols-3 gap-6 border-t border-white/10 pt-8">
                  <div>
                    <dt className="text-xs uppercase tracking-wider text-slate-400">
                      Curriculum overlap
                    </dt>
                    <dd className="mt-1 text-2xl font-semibold text-white">75-95%</dd>
                  </div>
                  <div>
                    <dt className="text-xs uppercase tracking-wider text-slate-400">
                      Extra hours / week
                    </dt>
                    <dd className="mt-1 text-2xl font-semibold text-white">3-6</dd>
                  </div>
                  <div>
                    <dt className="text-xs uppercase tracking-wider text-slate-400">
                      Olympiads covered
                    </dt>
                    <dd className="mt-1 text-2xl font-semibold text-white">5+</dd>
                  </div>
                </dl>
              </div>

              <div className="order-1 lg:order-2 lg:col-span-2">
                <LeadCaptureForm
                  source="hero"
                  campaign={CAMPAIGN}
                  heading="Book an IB + olympiad demo"
                  subheading="Tell us your IB school and country. We confirm olympiad eligibility and return a week-by-week plan."
                  showFaculty
                />
              </div>
            </div>
          </div>
        </section>

        {/* Theme overlap */}
        <section className="border-b border-slate-200 py-14 md:py-20">
          <div className="mx-auto max-w-6xl px-6">
            <div className="max-w-2xl">
              <h2 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
                The 4 IB themes map directly to Campbell.
              </h2>
              <p className="mt-3 text-lg text-slate-600">
                Your IB HL Biology textbook (or the 2025 4-theme syllabus structure) already covers
                most olympiad content. Here is the exact overlap and where to go deeper for
                olympiad-specific depth.
              </p>
            </div>

            <div className="mt-10 space-y-4">
              {topicOverlap.map((t) => (
                <div
                  key={t.ibTheme}
                  className="grid gap-4 rounded-2xl border border-slate-200 bg-white p-5 lg:grid-cols-5"
                >
                  <div className="lg:col-span-2">
                    <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                      IB HL Theme
                    </p>
                    <p className="mt-1 text-base font-semibold text-slate-900">{t.ibTheme}</p>
                  </div>
                  <div className="lg:col-span-2">
                    <p className="text-xs font-semibold uppercase tracking-wider text-green-700">
                      Campbell mapping
                    </p>
                    <p className="mt-1 text-sm font-semibold text-slate-900">{t.olympiadUnits}</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Overlap
                    </p>
                    <p className="mt-1 text-2xl font-bold text-green-700">{t.overlap}</p>
                  </div>
                  <div className="lg:col-span-5">
                    <p className="text-xs leading-relaxed text-slate-600">{t.note}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Weekly plan */}
        <section className="border-b border-slate-200 bg-slate-50 py-14 md:py-20">
          <div className="mx-auto max-w-6xl px-6">
            <h2 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
              Week-by-week plan across IBDP.
            </h2>
            <p className="mt-3 max-w-2xl text-lg text-slate-600">
              Average biology time commitment by phase — IB HL commitments plus incremental olympiad
              work. Designed to avoid the burnout trap of stacking two separate curricula.
            </p>

            <div className="mt-10 space-y-4">
              {weeklyPlan.map((w, i) => (
                <div
                  key={w.phase}
                  className="flex gap-5 rounded-2xl border border-slate-200 bg-white p-6"
                >
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-green-100 text-sm font-bold text-green-700">
                    {i + 1}
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-semibold uppercase tracking-wider text-green-700">
                      {w.phase}
                    </p>
                    <div className="mt-2 grid gap-2 text-sm sm:grid-cols-3">
                      <div>
                        <p className="text-xs uppercase tracking-wider text-slate-500">IB HL</p>
                        <p className="mt-0.5 font-semibold text-slate-900">{w.hl}</p>
                      </div>
                      <div>
                        <p className="text-xs uppercase tracking-wider text-slate-500">Olympiad</p>
                        <p className="mt-0.5 font-semibold text-slate-900">{w.olympiad}</p>
                      </div>
                      <div>
                        <p className="text-xs uppercase tracking-wider text-slate-500">Total</p>
                        <p className="mt-0.5 font-semibold text-slate-900">{w.total}</p>
                      </div>
                    </div>
                    <p className="mt-3 text-xs leading-relaxed text-slate-600">{w.note}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Eligibility */}
        <section className="border-b border-slate-200 py-14 md:py-20">
          <div className="mx-auto max-w-6xl px-6">
            <h2 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
              Which olympiad can I enter?
            </h2>
            <p className="mt-3 max-w-2xl text-lg text-slate-600">
              Olympiad eligibility is by country of schooling, not curriculum. IB students at a
              given country IB school enter that country&rsquo;s national olympiad.
            </p>

            <div className="mt-10 space-y-4">
              {eligibilityByCountry.map((e) => (
                <div
                  key={e.country}
                  className="grid gap-4 rounded-2xl border border-slate-200 bg-white p-6 md:grid-cols-4 md:items-center"
                >
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Country
                    </p>
                    <p className="mt-1 text-lg font-bold text-slate-900">{e.country}</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-green-700">
                      Olympiad
                    </p>
                    <p className="mt-1 text-sm font-semibold text-slate-900">{e.olympiad}</p>
                  </div>
                  <div className="md:col-span-2">
                    <p className="text-xs leading-relaxed text-slate-600">{e.eligibility}</p>
                    <Link
                      href={e.href}
                      className="mt-2 inline-flex items-center gap-1.5 text-xs font-semibold text-green-700 hover:text-green-800"
                    >
                      {e.olympiad.split(' ')[0]} coaching
                      <ArrowRight className="h-3 w-3" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why pair them */}
        <section className="border-b border-slate-200 bg-slate-50 py-14 md:py-20">
          <div className="mx-auto max-w-6xl px-6">
            <h2 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
              Why IB HL students gain from olympiad pairing.
            </h2>
            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {[
                {
                  icon: Target,
                  title: 'Paper 2 data-interpretation uplift',
                  body: 'Olympiad past-paper practice (especially biostatistics and experimental design questions) directly strengthens IB HL Paper 2 data-interpretation sections where many HL students plateau.',
                },
                {
                  icon: Award,
                  title: 'University application edge',
                  body: 'IB Diploma 40+ plus olympiad medals is a recognisable profile for Ivy League, Oxbridge, NUS, and top medical schools. Olympiad qualification signals research-calibre science aptitude.',
                },
                {
                  icon: Calendar,
                  title: 'Efficient shared study',
                  body: 'Campbell Biology is the canonical text for both IB HL and olympiads. Incremental time for olympiad prep is 3-6 hours/week — the reading itself also deepens HL understanding.',
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

        {/* FAQs */}
        <section className="border-b border-slate-200 py-14 md:py-20">
          <div className="mx-auto max-w-3xl px-6">
            <h2 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
              IB + olympiad, answered.
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
              Next steps.
            </h2>
            <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {[
                { label: 'IB Biology Hub', href: '/ib-biology' },
                { label: 'All Biology Olympiads', href: '/biology-olympiads' },
                { label: 'NSEB (India Stage 1)', href: '/nseb-coaching' },
                { label: 'USABO (USA)', href: '/usabo-coaching' },
                { label: 'BBO (UK)', href: '/bbo-preparation' },
                { label: 'IBO (Finals)', href: '/ibo-preparation' },
                { label: 'IB Biology IA Guide', href: '/ib-biology-ia-guide' },
                { label: 'CBSE → Olympiad Transition', href: '/cbse-to-olympiad-transition' },
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
                  Start IB + olympiad prep.
                </h2>
                <p className="mt-4 text-base leading-relaxed text-slate-300">
                  Free demo. Tell us your IBDP year, country, and target olympiad — we return a
                  week-by-week plan and confirm eligibility within 15 minutes.
                </p>
              </div>
              <div className="lg:col-span-3">
                <LeadCaptureForm
                  source="final-cta"
                  campaign={CAMPAIGN}
                  heading="Book your parallel-prep demo"
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
          message="Hi Cerebrum, I am an IB HL Biology student and want to run olympiad prep alongside HL. Please share a parallel plan for my country and IBDP year."
          campaign={CAMPAIGN}
          tooltip="IB + olympiad? Plan with us"
        />
      </main>
    </>
  )
}
