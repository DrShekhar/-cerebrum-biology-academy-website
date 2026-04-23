import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, BookOpen, GraduationCap, Globe } from 'lucide-react'
import { FAQSchema } from '@/components/seo/FAQSchema'
import { BreadcrumbSchema } from '@/components/seo/BreadcrumbSchema'
import { LeadCaptureForm } from '@/components/landing/LeadCaptureForm'
import { FloatingWhatsAppButton } from '@/components/landing/FloatingWhatsAppButton'

const PAGE_URL = 'https://cerebrumbiologyacademy.com/class-11-biology-by-curriculum'
const CAMPAIGN = 'class-11-biology-hub'

export const metadata: Metadata = {
  title: 'Class 11 Biology Coaching — CBSE, ICSE, IGCSE, IB, AP | Cerebrum Biology Academy',
  description:
    'Class 11 Biology coaching across all major curricula — CBSE, ICSE, IGCSE, IB (DP Year 1), and AP Biology (Grade 11). Board-specific syllabus coverage, practicals, and exam preparation by AIIMS-trained faculty.',
  keywords: [
    'Class 11 Biology coaching',
    'Class 11 Biology tutor',
    'Class 11 Biology classes',
    'Class 11 Biology online',
    'Class 11 Biology by curriculum',
    'CBSE Class 11 Biology',
    'ICSE Class 11 Biology',
    'IGCSE Biology Class 11',
    'IB Biology DP Year 1',
    'AP Biology Grade 11',
    'Class 11 Biology tuition',
  ],
  alternates: {
    canonical: PAGE_URL,
    languages: {
      en: PAGE_URL,
      'en-IN': PAGE_URL,
      'en-US': PAGE_URL,
      'en-GB': PAGE_URL,
      'x-default': PAGE_URL,
    },
  },
  openGraph: {
    title: 'Class 11 Biology Coaching — CBSE, ICSE, IGCSE, IB, AP',
    description:
      'Find your Class 11 Biology curriculum. CBSE, ICSE, IGCSE, IB DP1, or AP Biology — board-specific coaching with unified teaching pedagogy.',
    type: 'article',
    url: PAGE_URL,
    siteName: 'Cerebrum Biology Academy',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Class 11 Biology Coaching — All Boards',
    description:
      'Class 11 Biology for CBSE, ICSE, IGCSE, IB, and AP. Find your curriculum and start prep.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
}

const curricula = [
  {
    board: 'CBSE',
    tagline: 'Indian National Board · NEET foundation',
    href: '/courses/class-11',
    students: 'Most Class 11 students in India',
    syllabus:
      'NCERT Class 11 Biology in 22 chapters across 5 units — Diversity of Living World, Structural Organisation, Cell Structure and Function, Plant Physiology, and Human Physiology. 70 marks theory + 30 marks practical.',
    exam: 'CBSE Class 11 board exam (March) — 3 hours, 70 marks theory; practical assessment 30 marks.',
    bridgeNote:
      'Direct feeder to NEET (India medical entrance). Our programme integrates CBSE Class 11 + NEET Biology foundations in parallel.',
  },
  {
    board: 'ICSE',
    tagline: 'Indian Private Board · Rigorous depth',
    href: '/biology-tutor-class-11-icse',
    students: 'ISC Class 11 students at elite Indian private schools',
    syllabus:
      'ICSE Class 11 Biology in 4 sections: Section A (Basic Biology — cell, molecular biology, genetics), Section B (Plant Physiology — transport, chemical coordination, ecosystem), Section C (Human Anatomy — circulatory, excretory, nervous, endocrine), Section D (Plant and Human Reproduction).',
    exam: 'ICSE Class 11 internal + ISC Class 12 external. Paper I theory (70 marks, 3 hrs) + Paper II practical (20 marks).',
    bridgeNote:
      'ISC depth is strong enough that most ISC students transition to NEET with 3-4 month sprint. Dual ISC + NEET tracks available.',
  },
  {
    board: 'IGCSE',
    tagline: 'International Cambridge / Edexcel · Pre-IB foundation',
    href: '/igcse-biology-tutor',
    students:
      'International school students age 14-16 (typically Class 9-10 in India, Grade 10-11 in UK/US)',
    syllabus:
      'Cambridge IGCSE 0610 Biology or Edexcel IGCSE 4BI1 Biology — Core vs Extended tier. Topics include cell biology, biochemistry, genetics, evolution, physiology, and ecology. Practical assessment is ~30% of the grade.',
    exam: 'IGCSE external exams in May/June or November. 2-3 papers depending on tier. Grade 9 (highest) to G / 1.',
    bridgeNote:
      'IGCSE is typically the stepping-stone into IB DP (Year 1). Most Cerebrum IGCSE students continue with our IB DP Year 1 programme after completing IGCSE.',
  },
  {
    board: 'IB (DP Year 1)',
    tagline: 'International Baccalaureate · First year of 2-year Diploma',
    href: '/ib-biology',
    students: 'Class 11 / Year 12 equivalent at international schools — DP1',
    syllabus:
      '2025 IB Biology syllabus is organised into 4 themes: Theme A (Unity and Diversity), Theme B (Form and Function), Theme C (Interaction and Interdependence), Theme D (Continuity and Change). HL students cover additional content in each theme. IA (Internal Assessment) runs through Year 1 and Year 2.',
    exam: 'External exams are in Year 2 (May of DP2). Year 1 students focus on foundational concept coverage, IA research question selection, and first IA data collection.',
    bridgeNote:
      'IB HL Biology overlaps 75-85% with Biology Olympiad prep. Students often pursue NSEB / IBO alongside IB DP1. See /ib-biology-olympiad-parallel-prep.',
  },
  {
    board: 'AP Biology',
    tagline: 'US College Board · Grade 11 equivalent',
    href: '/ap-biology-class-11',
    students:
      'US high school students typically Grade 11 (Junior year); occasionally Grade 10 or Grade 12',
    syllabus:
      'AP Biology is organised into 8 College Board units — Chemistry of Life, Cell Structure and Function, Cellular Energetics, Cell Communication and Cell Cycle, Heredity, Gene Expression and Regulation, Natural Selection, and Ecology. Weight per unit ranges 8-20%.',
    exam: 'AP Biology exam in early May. 60 MCQs (90 min, 50%) + 6 FRQs (90 min, 50%). Scored 1-5; most US colleges accept score 4+ for credit.',
    bridgeNote:
      'Indian students returning after Grade 12 use our AP-to-NEET bridge (6-8 months) to retool AP knowledge for NEET. See /ap-biology-to-neet-preparation.',
  },
]

const comparisonRows = [
  {
    dimension: 'Exam format',
    cbse: 'Theory + practical (70+30)',
    icse: 'Theory + practical (70+20)',
    igcse: 'Theory + practical (~60+30 tier-dependent)',
    ib: 'External papers in Year 2; IA runs across Year 1-2',
    ap: 'MCQ + FRQ (50+50), 3 hrs total',
  },
  {
    dimension: 'Focus',
    cbse: 'Recall + understanding',
    icse: 'Depth + recall',
    igcse: 'Concept + practical',
    ib: 'Inquiry + critical analysis',
    ap: 'Experimental design + data interpretation',
  },
  {
    dimension: 'Practical weight',
    cbse: '30% (practical exam + viva)',
    icse: '20% (practical exam)',
    igcse: '~30% (paper 6 or coursework)',
    ib: 'IA = 20% of final grade; practical skills essential',
    ap: '~25% of FRQs reference practicals / experiments',
  },
  {
    dimension: 'Post-Class 11 pathway',
    cbse: 'Class 12 board + NEET',
    icse: 'ISC Class 12 + NEET / JEE',
    igcse: 'IB DP / A-Levels (age 16-18)',
    ib: 'DP Year 2 → University',
    ap: 'Grade 12 + college admissions (AP credit)',
  },
  {
    dimension: 'Common student goal',
    cbse: 'NEET / AIIMS',
    icse: 'NEET / medical college',
    igcse: 'Transition to IB or A-Levels',
    ib: 'US/UK/Singapore university + optional NEET bridge',
    ap: 'US college admissions + credit',
  },
]

const faqs = [
  {
    question: 'What board should I choose for Class 11 Biology?',
    answer:
      "Board choice depends on your target university and exam. If you are applying to Indian medical colleges (NEET-UG), CBSE is the standard feeder; ICSE works too but has fewer students nationally. If you plan to study abroad, IB or AP are recognised by US/UK universities; IGCSE is typically a pre-IB stepping stone. Most families choose the board that their child's school offers and layer competitive exam prep (NEET) on top if needed.",
  },
  {
    question: 'How does Class 11 Biology differ across CBSE, ICSE, IGCSE, IB, and AP?',
    answer:
      'Content overlap is ~70% across all 5 boards (all cover cell biology, genetics, physiology, ecology at some depth). Differences are in depth and assessment style. AP and IB emphasise experimental design and data interpretation; CBSE and ICSE emphasise recall and theory; IGCSE blends concepts with practicals. Practical exam weight varies: ICSE 20%, CBSE 30%, IGCSE ~30%, IB IA 20%, AP ~25% via FRQs.',
  },
  {
    question: 'Can one coaching programme cover Class 11 Biology + NEET together?',
    answer:
      'Yes — this is the dominant Indian pattern. CBSE and ICSE Class 11 Biology covers ~80% of NEET Biology content at NCERT depth; the remaining 20% (advanced mechanisms, calculation-based questions) is NEET-specific and added through past-paper practice. Our Class 11 programmes all offer a "board + NEET" integrated track for Indian students. IB and AP students typically need a separate 6-8 month NEET bridge if they plan to take NEET.',
  },
  {
    question: 'What is the typical Class 11 Biology coaching schedule?',
    answer:
      'A full-year Class 11 programme runs 9-12 months (April-March for CBSE / ICSE; August-May for AP; September-May for IB DP1). Weekly commitment is 4-6 hours of live classes plus 3-5 hours of self-study, assignments, and practice tests. Practical sessions are scheduled separately — either in-centre for Delhi NCR students or remote-simulated with lab-kit supply for online students.',
  },
  {
    question: 'Do you offer Class 11 Biology coaching online globally?',
    answer:
      'Yes. Our Class 11 programmes run online for students across India, UAE, Singapore, UK, USA, Canada, Australia, and more. Live classes are scheduled in per-region timezone batches — IST evenings for India, ET evenings for USA, GMT evenings for UK. All sessions are recorded for timezone flexibility. In-centre options are available only in Delhi NCR (South Extension Delhi, Rohini, Gurugram Sector 51, Faridabad Sector 17).',
  },
  {
    question: 'What does Class 11 Biology coaching cost across boards?',
    answer:
      'CBSE Complete Year: starts ~₹24,000 / year (online group cohort). ICSE similar. AP Biology Complete Year: $1,800 flat. IB Biology (HL/SL): 9-12 month programme ~$2,500-$4,000 depending on tier. IGCSE Biology: ~£400-£600 for a full-year programme. All boards support 1:1 elite mentoring at $90/hour and small-batch weekend cohorts at $50/hour.',
  },
  {
    question: 'Are AIIMS-trained faculty consistent across all boards?',
    answer:
      'Our core biology faculty is unified across all boards — AIIMS-trained mentors who teach the same conceptual content but adapt exam patterns per board. This means IB, AP, CBSE, and ICSE students all learn from the same teacher tier; only the assessment practice differs (FRQs for AP, IA for IB, theory + practical for CBSE/ICSE). Students benefit from strong fundamentals that transfer across exams.',
  },
  {
    question: "Can my school's board change my Class 11 Biology strategy?",
    answer:
      "Yes, significantly. Your school's board determines which external exam you sit and therefore which practice style we emphasise. However, Campbell Biology (11th-12th edition) is a shared reference across all 5 boards, so the underlying study material has 70% overlap. The other 30% is board-specific — NCERT chapters for CBSE, Section A-D structure for ICSE, Cambridge/Edexcel specification for IGCSE, 4-theme structure for IB, and CED 8-unit structure for AP.",
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

const collectionSchema = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: 'Class 11 Biology Coaching — All Curricula',
  description:
    'Board-by-board Class 11 Biology coaching programmes covering CBSE, ICSE, IGCSE, IB DP Year 1, and AP Biology Grade 11.',
  url: PAGE_URL,
  inLanguage: 'en',
  provider: {
    '@type': 'EducationalOrganization',
    name: 'Cerebrum Biology Academy',
    url: 'https://cerebrumbiologyacademy.com',
  },
  hasPart: curricula.map((c) => ({
    '@type': 'WebPage',
    url: `https://cerebrumbiologyacademy.com${c.href}`,
    name: `${c.board} Class 11 Biology`,
  })),
}

export default function Class11BiologyByCurriculumHub() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
      />
      <BreadcrumbSchema
        items={[{ label: 'Class 11 Biology by Curriculum', isCurrentPage: true }]}
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
                  <BookOpen className="h-3.5 w-3.5 text-green-400" />5 curricula · CBSE · ICSE ·
                  IGCSE · IB DP1 · AP
                </div>

                <h1 className="text-4xl font-semibold leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-6xl">
                  Class 11 Biology,
                  <br />
                  <span className="text-green-400">whichever curriculum you are on.</span>
                </h1>

                <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate-300">
                  One faculty team across CBSE, ICSE, IGCSE, IB DP Year 1, and AP Biology Grade 11 —
                  board-specific exam preparation with unified conceptual teaching from Campbell
                  Biology.
                </p>

                <dl className="mt-10 grid max-w-xl grid-cols-3 gap-6 border-t border-white/10 pt-8">
                  <div>
                    <dt className="text-xs uppercase tracking-wider text-slate-400">Curricula</dt>
                    <dd className="mt-1 text-2xl font-semibold text-white">5</dd>
                  </div>
                  <div>
                    <dt className="text-xs uppercase tracking-wider text-slate-400">
                      Shared textbook
                    </dt>
                    <dd className="mt-1 text-2xl font-semibold text-white">Campbell</dd>
                  </div>
                  <div>
                    <dt className="text-xs uppercase tracking-wider text-slate-400">
                      Content overlap
                    </dt>
                    <dd className="mt-1 text-2xl font-semibold text-white">~70%</dd>
                  </div>
                </dl>
              </div>

              <div className="order-1 lg:order-2 lg:col-span-2">
                <LeadCaptureForm
                  source="hero"
                  campaign={CAMPAIGN}
                  heading="Pick your Class 11 board"
                  subheading="Tell us your school board and curriculum. We match you to the right programme in 15 minutes."
                  showFaculty
                />
              </div>
            </div>
          </div>
        </section>

        {/* Curriculum cards */}
        <section className="border-b border-slate-200 py-14 md:py-20">
          <div className="mx-auto max-w-6xl px-6">
            <div className="max-w-2xl">
              <h2 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
                Pick your curriculum.
              </h2>
              <p className="mt-3 text-lg text-slate-600">
                Each link takes you to the board-specific programme with syllabus, exam format, and
                enrolment details.
              </p>
            </div>

            <div className="mt-10 grid gap-6 md:grid-cols-2">
              {curricula.map((c) => (
                <Link
                  key={c.board}
                  href={c.href}
                  className="group rounded-2xl border border-slate-200 bg-white p-6 transition-all hover:-translate-y-0.5 hover:border-green-300 hover:shadow-md"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-green-700">
                        {c.tagline}
                      </p>
                      <h3 className="mt-1 text-2xl font-semibold text-slate-900 group-hover:text-green-700">
                        {c.board}
                      </h3>
                    </div>
                    <ArrowRight className="h-5 w-5 flex-shrink-0 text-slate-400 transition-transform group-hover:translate-x-0.5 group-hover:text-green-600" />
                  </div>
                  <p className="mt-3 text-xs uppercase tracking-wider text-slate-500">
                    {c.students}
                  </p>
                  <p className="mt-4 text-sm leading-relaxed text-slate-700">{c.syllabus}</p>
                  <p className="mt-3 text-sm font-medium text-slate-800">Exam: {c.exam}</p>
                  <p className="mt-3 text-xs leading-relaxed text-slate-600">{c.bridgeNote}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Side-by-side comparison */}
        <section className="border-b border-slate-200 bg-slate-50 py-14 md:py-20">
          <div className="mx-auto max-w-6xl px-6">
            <h2 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
              Class 11 Biology — side-by-side by board.
            </h2>
            <p className="mt-3 max-w-2xl text-lg text-slate-600">
              Exam format, practical weight, and student goals differ significantly. Use this table
              to choose your strategy.
            </p>

            <div className="mt-10 overflow-x-auto">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="border-b border-slate-300">
                    <th className="px-3 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Dimension
                    </th>
                    <th className="px-3 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                      CBSE
                    </th>
                    <th className="px-3 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                      ICSE
                    </th>
                    <th className="px-3 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                      IGCSE
                    </th>
                    <th className="px-3 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                      IB DP1
                    </th>
                    <th className="px-3 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                      AP
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonRows.map((r) => (
                    <tr key={r.dimension} className="border-b border-slate-200">
                      <td className="px-3 py-4 font-semibold text-slate-900">{r.dimension}</td>
                      <td className="px-3 py-4 text-slate-700">{r.cbse}</td>
                      <td className="px-3 py-4 text-slate-700">{r.icse}</td>
                      <td className="px-3 py-4 text-slate-700">{r.igcse}</td>
                      <td className="px-3 py-4 text-slate-700">{r.ib}</td>
                      <td className="px-3 py-4 text-slate-700">{r.ap}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Why one academy */}
        <section className="border-b border-slate-200 py-14 md:py-20">
          <div className="mx-auto max-w-6xl px-6">
            <h2 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
              Why one academy for 5 curricula.
            </h2>
            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {[
                {
                  icon: GraduationCap,
                  title: 'Unified faculty team',
                  body: 'AIIMS-trained mentors teach the shared Campbell Biology core to all students regardless of board. Exam-specific practice (NCERT, FRQ, IA, ISC theory) is layered on top.',
                },
                {
                  icon: BookOpen,
                  title: '70% content overlap',
                  body: 'All 5 boards cover cell biology, genetics, physiology, and ecology at some depth. Our programme is designed so students who switch boards mid-way (e.g., CBSE to IB) do not lose foundational coverage.',
                },
                {
                  icon: Globe,
                  title: 'Cross-curriculum bridges',
                  body: 'NEET is accessible from CBSE, ICSE, IB, and AP via dedicated bridge programmes. AP → NEET, IB → NEET, and IGCSE → IB pathways are pre-built for smooth transitions.',
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
        <section className="border-b border-slate-200 bg-slate-50 py-14 md:py-20">
          <div className="mx-auto max-w-3xl px-6">
            <h2 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
              Class 11 Biology questions, answered.
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

        {/* Closing form */}
        <section className="bg-slate-950 py-14 md:py-20 text-white">
          <div className="mx-auto max-w-4xl px-6">
            <div className="grid gap-10 lg:grid-cols-5 lg:items-center">
              <div className="lg:col-span-2">
                <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                  Start Class 11 Biology.
                </h2>
                <p className="mt-4 text-base leading-relaxed text-slate-300">
                  Free demo across all 5 boards. Tell us your school and curriculum; we match you to
                  the right programme in 15 minutes (working hours).
                </p>
              </div>
              <div className="lg:col-span-3">
                <LeadCaptureForm
                  source="final-cta"
                  campaign={CAMPAIGN}
                  heading="Book a Class 11 Biology demo"
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
          message="Hi Cerebrum, I am in Class 11 and want to start Biology coaching. Please share the programme for my board."
          campaign={CAMPAIGN}
          tooltip="Class 11 Biology? Pick your board"
        />
      </main>
    </>
  )
}
