/**
 * /usabo-online-bootcamp
 *
 * NEW cohort/enrollment landing page (additive — does not touch the evergreen
 * /usabo-coaching hub or /biology-olympiads cluster). Targets time-bound
 * enrollment intent: "USABO bootcamp", "USABO prep online", "USABO coaching",
 * "USA Biology Olympiad preparation course".
 *
 * Competitive context: Biolympiads is the main US olympiad-prep shop — its advanced
 * camp is ~$1,900 for 60 hours, taught by IBO alumni, bank-transfer-only and
 * non-refundable. No competitor packages all three stages (Open → Semifinal →
 * National Finals/IBO) as a continuous coached journey. Cerebrum's edge:
 * AIIMS-trained faculty with degree-level physiology, biochemistry and molecular
 * biology depth (exactly what the Semifinal and IBO test) rather than recent-alumni
 * tutors; a structured multi-stage cohort; US time-zone slots (ET/CT/PT); and
 * transparent USD pricing.
 */

import type { Metadata } from 'next'
import Link from 'next/link'
import { FAQSchema } from '@/components/seo/FAQSchema'
import { BreadcrumbSchema } from '@/components/seo/BreadcrumbSchema'
import { CerebrumPersonSchema } from '@/components/seo/CerebrumPersonSchema'
import { GlobalEnquiryForm } from '@/components/seo/GlobalEnquiryForm'
import {
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  Clock,
  FlaskConical,
  GraduationCap,
  MessageCircle,
  Target,
  Trophy,
  Users,
} from 'lucide-react'

const SITE_URL = 'https://cerebrumbiologyacademy.com'
const PAGE_PATH = '/usabo-online-bootcamp'
const PAGE_URL = `${SITE_URL}${PAGE_PATH}`
const WA = '918826444334'
const waLink = (text: string) => `https://wa.me/${WA}?text=${encodeURIComponent(text)}`

export const metadata: Metadata = {
  title: 'USABO Online Bootcamp — Live Cohorts 2026–27 | Cerebrum',
  description:
    'Live USABO prep led by AIIMS-trained biology faculty. Open Exam Foundation cohort from Oct 2026, Semifinal Intensive Jan–Mar 2027, and rolling 1:1 Finals/IBO track. Campbell + Alberts/Lehninger depth, past-paper walkthroughs, free diagnostic.',
  keywords: [
    'USABO bootcamp',
    'USABO prep online',
    'USA Biology Olympiad coaching',
    'USABO online course',
    'USABO semifinal preparation',
    'USABO open exam prep',
    'biology olympiad coaching online',
    'IBO preparation course',
  ],
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: 'USABO Online Bootcamp — Live Cohorts 2026–27',
    description:
      'Live USABO coaching with AIIMS-trained biology specialists. Open Exam Foundation Oct 2026, Semifinal Intensive Jan–Mar 2027, 1:1 Finals/IBO track. Campbell + Alberts depth, US time-zone slots.',
    url: PAGE_URL,
    siteName: 'Cerebrum Biology Academy',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'USABO Online Bootcamp — Live Cohorts 2026–27 | Cerebrum',
    description:
      'Live USABO prep with AIIMS-trained faculty. Open Exam Foundation Oct 2026 + Semifinal Intensive Jan–Mar 2027. US time-zone slots, free diagnostic.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
}

const cohorts = [
  {
    name: 'Open Exam Foundation',
    window: 'Starts October 2026 (ahead of the ~Feb 2027 Open Exam)',
    detail:
      'A structured build-up to the USABO Open Exam (50 MCQ, 50 minutes). We work systematically through all five biology domains at Campbell-Biology depth, with weekly live small-batch sessions, topic quizzes, and timed 50-question mock exams. School registration for the 2027 cycle typically opens around November 2026 — this cohort puts you fully prepared well before then.',
    best: 'Best for students entering the USABO cycle for the first or second time who want a thorough domain foundation.',
    icon: CalendarDays,
  },
  {
    name: 'Semifinal Intensive',
    window: 'January – March/April 2027 (Open results → Semifinal window)',
    detail:
      'For students who qualify through the Open and advance to the USABO Semifinal. The Semifinal is a 170-minute free-response exam that demands Alberts (Molecular Biology of the Cell) and Lehninger (Biochemistry) depth — a significant step beyond Campbell. Sessions focus on experimental design, data interpretation, long-form free-response writing, and the molecular and physiological detail that separates semifinalists from Open qualifiers.',
    best: 'Best for Open qualifiers who have placed but need Alberts/Lehninger depth and free-response coaching to advance.',
    icon: Target,
  },
  {
    name: '1:1 Finals & IBO Track',
    window: 'Rolling enrollment — first session within 48 hours',
    detail:
      'Fully personalised private coaching for advanced candidates aiming for the National Finals (top ~20, residential, ~May–June 2027) or the International Biology Olympiad (IBO 2027 in Warsaw, Poland). Pace, depth, and focus — including practical lab theory, comparative physiology, and IBO-specific problem types — are set to your diagnostic. Scheduled in your US time zone (ET/CT/PT).',
    best: 'Best for Semifinal qualifiers, returning finalists, and students preparing for IBO team selection.',
    icon: Users,
  },
]

const curriculum = [
  'All five USABO biology domains at Campbell-Biology depth: Cell Biology & Biochemistry, Genetics & Evolution, Organismal Biology, Ecology, and Animal Physiology',
  'Open Exam strategy: 50 MCQ in 50 minutes — breadth-first domain triage, elimination technique, and pacing drills using past USABO Open papers',
  'Alberts (Molecular Biology of the Cell) depth for the Semifinal: signal transduction, gene regulation, cell cycle, protein trafficking, and experimental methods',
  'Lehninger Biochemistry for the Semifinal: metabolic pathways, enzyme kinetics, thermodynamics, and membrane biochemistry at exam depth',
  'Semifinal free-response coaching: experimental design, data analysis, and long-form written answers scored to the USABO rubric by a live faculty member',
  'Genetics calculations: Hardy–Weinberg, population genetics, quantitative genetics, and linkage mapping — the most frequently missed Semifinal questions',
  'Comparative animal physiology: nervous, endocrine, cardiovascular, respiratory, and immune systems at the depth the Semifinal and IBO require',
  'Plant biology and ecology: photosynthetic pathways, plant hormones, population dynamics, ecosystem energetics, and evolutionary biology',
  'IBO-level practical theory (Finals/IBO track): microscopy, electrophoresis, PCR, enzyme assays, and experimental interpretation',
  'Past-paper walkthroughs for USABO Open and Semifinal, plus selected IBO papers, with detailed answer explanations',
]

const faqs = [
  {
    question: 'What is the USABO and who is eligible to enter?',
    answer:
      "The USA Biology Olympiad (USABO) is administered by the Center for Excellence in Education (CEE) and selects four students each year to represent the United States at the International Biology Olympiad (IBO). The competition is open to US high-school students (grades 9–12) who are US citizens or permanent residents, enrolled in a US high school. International students or NRI students outside the US can use Cerebrum's USABO coaching to prepare for their own national biology olympiad — the content and skills overlap substantially.",
  },
  {
    question: 'What are the key USABO 2027 dates I should know?',
    answer:
      'For the 2027 cycle, school registration with CEE typically opens around November 2026. The Open Exam (50 MCQ, 50 minutes, multiple-choice) is administered at registered schools in approximately February 2027. Top scorers advance to the Semifinal (approximately March–April 2027), a 170-minute free-response exam sat at home. The top ~20 Semifinalists are invited to the residential National Finals (approximately May–June 2027), from which four students are named to the US IBO team. IBO 2027 is scheduled in Warsaw, Poland. Always confirm exact dates with CEE (cee.org) as the calendar is set annually.',
  },
  {
    question: 'How does Cerebrum compare to Biolympiads for USABO prep?',
    answer:
      "Biolympiads is the main US olympiad-prep platform — its advanced camp is approximately $1,900 for 60 hours, taught by IBO alumni, with bank-transfer-only payment and a non-refundable policy. It focuses on high-achievers already at IBO level. Cerebrum's difference: our faculty hold AIIMS degrees — a medical-school training that is uniquely deep in physiology, biochemistry, molecular biology, and cell biology, which is precisely what the USABO Semifinal and IBO test. We also package all three competition stages (Open → Semifinal → National Finals/IBO) as a continuous coached journey with structured cohorts, rather than a single intensive camp. Payment is transparent and available in USD.",
  },
  {
    question: 'Who teaches the USABO bootcamp?',
    answer:
      'Cohorts are led by Dr. Shekhar C Singh (AIIMS New Delhi alumnus, founder of Cerebrum Biology Academy) and senior biology specialists. AIIMS entrance preparation is among the most biology-intensive academic experiences available — faculty bring degree-level depth in molecular biology, biochemistry, physiology, and cell biology, disciplines that form the core of the USABO Semifinal and IBO exams. This is different from a recent-olympiad-alumnus tutor who may excel at competition strategy but has less formal depth in the graduate-level mechanistic biology the exam rewards.',
  },
  {
    question: 'Can students outside the US join the USABO bootcamp?',
    answer:
      'Yes. All sessions are live online and scheduled in US time zones (ET/CT/PT), with recordings available if you miss a session. Students outside the US often join to prepare for their own national biology olympiad (BBO, IBO-qualifying rounds, etc.) or for general IBO preparation — the content is identical. NRI families in the US, Canada, the UAE, Singapore, Hong Kong, and the UK are all welcome.',
  },
  {
    question: 'How much does the USABO bootcamp cost?',
    answer:
      'USABO programmes are priced in USD. Annual cohort programmes are approximately $4,500/yr for the small-batch structured track; 1:1 senior-faculty coaching is approximately $90/hr. Small-batch rates are lower per hour. Message us on WhatsApp for the current cohort rate, available seats, and whether the Open Exam Foundation or Semifinal Intensive cohort is open for enrollment. No payment is taken at the free trial.',
  },
  {
    question: 'Do you offer a free trial before I enroll?',
    answer:
      'Yes — a free 30-minute diagnostic session with a senior faculty member. We assess your current biology level, walk through one past USABO Open question together, identify your two strongest and two weakest domains, and recommend the right cohort and US time-zone slot. No commitment or payment is required at the diagnostic.',
  },
  {
    question: 'What is the IBO 2027 and how does it relate to USABO?',
    answer:
      'The International Biology Olympiad (IBO) is the world biology competition for pre-university students. Each country sends four team members. For the US, the four IBO representatives are chosen from the USABO National Finals. IBO 2027 is scheduled in Warsaw, Poland. The 1:1 Finals & IBO Track at Cerebrum is designed for students who have qualified to the USABO Semifinal or National Finals level and want coaching at the depth the IBO practical and theoretical rounds demand.',
  },
]

const courseSchema = {
  '@context': 'https://schema.org',
  '@type': 'Course',
  name: 'USABO Online Bootcamp',
  description:
    'Live USABO prep led by AIIMS-trained biology faculty. Covers all five USABO domains at Campbell depth for the Open Exam, Alberts/Lehninger depth for the Semifinal, and IBO-level coaching for the Finals track. Cohorts from October 2026.',
  url: PAGE_URL,
  inLanguage: 'en-US',
  educationalLevel: 'Advanced / Olympiad',
  educationalCredentialAwarded: 'USABO / IBO Preparation',
  teaches: [
    'USABO Open Exam preparation',
    'USABO Semifinal free-response',
    'Molecular biology at Alberts depth',
    'Biochemistry at Lehninger depth',
    'IBO biology olympiad preparation',
  ],
  provider: {
    '@type': 'EducationalOrganization',
    '@id': `${SITE_URL}/#organization`,
    name: 'Cerebrum Biology Academy',
    url: SITE_URL,
  },
  hasCourseInstance: [
    {
      '@type': 'CourseInstance',
      name: 'USABO Open Exam Foundation Cohort',
      courseMode: 'Online',
      courseWorkload: 'P5M',
    },
    {
      '@type': 'CourseInstance',
      name: 'USABO Semifinal Intensive',
      courseMode: 'Online',
      courseWorkload: 'P12W',
    },
    {
      '@type': 'CourseInstance',
      name: 'USABO Finals & IBO 1:1 Track',
      courseMode: 'Online',
      courseWorkload: 'P1Y',
    },
  ],
}

export default function USABOOnlineBootcampPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(courseSchema) }}
      />
      <FAQSchema questions={faqs} pageUrl={PAGE_URL} />
      <CerebrumPersonSchema
        knowsAbout={[
          'USABO Open Exam preparation',
          'USABO Semifinal biology',
          'IBO biology olympiad coaching',
          'Molecular biology at Alberts depth',
          'Biochemistry at Lehninger depth',
          'Animal physiology for biology olympiads',
          'Campbell Biology olympiad mastery',
        ]}
        jobTitle="Founder & Lead USABO Coach"
      />

      {/* Breadcrumb */}
      <div className="mx-auto max-w-6xl px-4 pt-6">
        <BreadcrumbSchema
          items={[
            { label: 'Biology Olympiads', href: '/biology-olympiads' },
            { label: 'USABO Online Bootcamp', isCurrentPage: true },
          ]}
        />
      </div>

      {/* Hero */}
      <section className="mx-auto max-w-6xl px-4 pb-10 pt-6">
        <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1 text-sm font-semibold text-blue-700">
              <Trophy className="h-4 w-4" /> Live cohorts · 2026–27 USABO cycle
            </span>
            <h1 className="mt-4 text-3xl font-bold leading-tight text-slate-900 sm:text-4xl">
              USABO Online Bootcamp
            </h1>
            <p className="mt-4 text-lg text-slate-700">
              A live, structured coaching programme covering all three stages of the USA Biology
              Olympiad — Open Exam, Semifinal, and National Finals/IBO. Led by AIIMS-trained faculty
              with degree-level depth in molecular biology, biochemistry, and physiology: the exact
              disciplines that decide who advances at the Semifinal and IBO levels.
            </p>
            <ul className="mt-5 space-y-2 text-slate-700">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-600" />
                Open Exam Foundation from Oct 2026 · Semifinal Intensive Jan–Mar 2027
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-600" />
                Campbell → Alberts/Lehninger depth · past-paper walkthroughs · free-response
                coaching
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-600" />
                US time-zone slots (ET/CT/PT) · rolling 1:1 Finals/IBO track · free 30-min
                diagnostic
              </li>
            </ul>
            <div className="mt-7 flex flex-wrap gap-3">
              <a
                href={waLink(
                  'Hi! I want to join the USABO Online Bootcamp. Please share the next cohort dates, seats and pricing.'
                )}
                className="inline-flex items-center gap-2 rounded-xl bg-green-600 px-5 py-3 text-base font-semibold text-white shadow-sm transition hover:bg-green-700"
              >
                <MessageCircle className="h-5 w-5" /> Chat on WhatsApp
              </a>
              <a
                href="#enquire"
                className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-base font-semibold text-white shadow-sm transition hover:bg-blue-700"
              >
                Book a free diagnostic <ArrowRight className="h-5 w-5" />
              </a>
            </div>
          </div>
          <div id="enquire" className="scroll-mt-24">
            <GlobalEnquiryForm
              title="Book your free USABO diagnostic"
              subtitle="Tell us your current USABO stage and target exam date — we'll match you to the right cohort and US time-zone slot, and reply within a day."
              source="usabo-bootcamp"
            />
          </div>
        </div>
      </section>

      {/* Cohorts / enrollment windows */}
      <section className="bg-slate-50 py-14">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">
            Three coached stages — one continuous journey
          </h2>
          <p className="mt-2 max-w-3xl text-slate-600">
            USABO is a multi-round competition: Open Exam in February, Semifinal in March/April,
            National Finals in May/June. Most prep services address only one round. Cerebrum coaches
            all three, so you can enter at your current stage and continue uninterrupted.
          </p>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {cohorts.map((c) => (
              <div
                key={c.name}
                className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200"
              >
                <c.icon className="h-7 w-7 text-blue-600" />
                <h3 className="mt-3 text-lg font-bold text-slate-900">{c.name}</h3>
                <p className="mt-1 text-sm font-semibold text-blue-700">{c.window}</p>
                <p className="mt-3 text-sm text-slate-700">{c.detail}</p>
                <p className="mt-3 text-sm font-medium text-slate-900">{c.best}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What you get */}
      <section className="py-14">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">
            What the bootcamp covers
          </h2>
          <p className="mt-2 max-w-3xl text-slate-600">
            Content is calibrated to the round you are preparing for — from Campbell breadth at the
            Open level to Alberts/Lehninger mechanistic depth at the Semifinal and IBO level.
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {curriculum.map((item) => (
              <div
                key={item}
                className="flex items-start gap-3 rounded-xl bg-slate-50 p-4 ring-1 ring-slate-200"
              >
                <FlaskConical className="mt-0.5 h-5 w-5 flex-shrink-0 text-blue-600" />
                <p className="text-sm text-slate-700">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Cerebrum */}
      <section className="bg-slate-50 py-14">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">
            Why AIIMS-trained faculty for biology olympiad prep
          </h2>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
              <GraduationCap className="h-7 w-7 text-blue-600" />
              <h3 className="mt-3 text-lg font-bold text-slate-900">Degree-level biology depth</h3>
              <p className="mt-2 text-sm text-slate-700">
                The USABO Semifinal and IBO test graduate-level mechanistic biology — signal
                transduction cascades, enzyme kinetics, physiological regulation. Faculty trained at
                AIIMS bring this depth as their baseline, not as a stretch. That is the difference
                between a coach who knows the answer and one who knows why it is the answer.
              </p>
            </div>
            <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
              <Target className="h-7 w-7 text-blue-600" />
              <h3 className="mt-3 text-lg font-bold text-slate-900">Live free-response coaching</h3>
              <p className="mt-2 text-sm text-slate-700">
                The Semifinal is free-response and cannot be cracked by MCQ drilling alone. A human
                expert reads your written answer, marks it against the rubric, and tells you
                precisely where you lost points and why — something a video course or an
                olympiad-alumnus peer tutor cannot replicate at this depth.
              </p>
            </div>
            <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
              <Clock className="h-7 w-7 text-blue-600" />
              <h3 className="mt-3 text-lg font-bold text-slate-900">
                Full-cycle structured support
              </h3>
              <p className="mt-2 text-sm text-slate-700">
                No competitor packages Open → Semifinal → Finals/IBO as a single continuous coached
                journey. Cohort timelines are set to the USABO calendar so your preparation peaks
                exactly when the exam window opens, with US time-zone slots and session recordings.
              </p>
            </div>
          </div>
          <p className="mt-6 max-w-3xl text-sm text-slate-600">
            Exploring other olympiad or advanced biology options? See the{' '}
            <Link href="/biology-olympiads" className="font-semibold text-blue-700 underline">
              Biology Olympiads overview
            </Link>
            , the{' '}
            <Link href="/usabo-coaching" className="font-semibold text-blue-700 underline">
              USABO coaching hub
            </Link>
            , or the step-by-step{' '}
            <Link
              href="/how-to-qualify-for-usabo"
              className="font-semibold text-blue-700 underline"
            >
              guide to qualifying for USABO
            </Link>
            .
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-14">
        <div className="mx-auto max-w-3xl px-4">
          <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">USABO bootcamp — FAQs</h2>
          <div className="mt-8 space-y-4">
            {faqs.map((f) => (
              <details
                key={f.question}
                className="group rounded-xl border border-slate-200 bg-white p-5"
              >
                <summary className="cursor-pointer list-none text-base font-semibold text-slate-900">
                  {f.question}
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-slate-700">{f.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-blue-600 py-14 text-white">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <h2 className="text-2xl font-bold sm:text-3xl">Ready to start your USABO journey?</h2>
          <p className="mx-auto mt-3 max-w-2xl text-blue-100">
            Book a free 30-minute diagnostic. We&apos;ll assess your current biology level, walk
            through a past USABO question together, identify your domain gaps, and recommend the
            right cohort and US time-zone slot — with no payment required at the trial.
          </p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <a
              href={waLink(
                'Hi! I want to book a free USABO diagnostic and join the USABO Online Bootcamp. Please share cohort dates and pricing.'
              )}
              className="inline-flex items-center gap-2 rounded-xl bg-green-500 px-6 py-3 text-base font-semibold text-white shadow-sm transition hover:bg-green-600"
            >
              <MessageCircle className="h-5 w-5" /> Chat on WhatsApp
            </a>
            <a
              href="#enquire"
              className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-base font-semibold text-blue-700 shadow-sm transition hover:bg-blue-50"
            >
              Book a free diagnostic <ArrowRight className="h-5 w-5" />
            </a>
          </div>
        </div>
      </section>
    </main>
  )
}
