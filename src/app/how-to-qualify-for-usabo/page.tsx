import type { Metadata } from 'next'
import Link from 'next/link'
import {
  Award,
  Calendar,
  CheckCircle2,
  ChevronRight,
  ClipboardList,
  FlaskConical,
  GraduationCap,
  MessageCircle,
  Target,
  Trophy,
  Users,
} from 'lucide-react'
import { ContextualWhatsAppLink } from '@/components/common/ContextualWhatsAppLink'
import { CerebrumPersonSchema } from '@/components/seo/CerebrumPersonSchema'

const URL = 'https://cerebrumbiologyacademy.com/how-to-qualify-for-usabo'

export const metadata: Metadata = {
  title: 'How to Qualify for USABO | Open → Semifinal → National Finals → Team USA',
  description:
    'The definitive guide to qualifying for the USA Biology Olympiad (USABO): the full Open Exam, Semifinal, and National Finals pathway, what each round tests, how advancement works, how to register through your school, and a realistic prep timeline.',
  keywords: [
    'how to qualify for USABO',
    'USABO qualification',
    'USABO Open Exam',
    'USABO Semifinal',
    'USABO National Finals',
    'USABO Team USA',
    'how to register for USABO',
    'USABO eligibility',
    'USABO pathway',
    'USABO rounds explained',
    'USABO advancement',
    'USABO IBO selection',
    'qualify for USA Biology Olympiad',
  ],
  alternates: {
    canonical: URL,
    languages: { en: URL, 'en-US': URL },
  },
  openGraph: {
    title: 'How to Qualify for USABO | The Full Open → Finals → Team USA Pathway',
    description:
      'Every round of the USA Biology Olympiad explained: Open Exam, Semifinal, National Finals, and IBO selection — plus how to register and how long to prepare.',
    url: URL,
    type: 'article',
    locale: 'en_US',
    siteName: 'Cerebrum Biology Academy',
  },
  twitter: {
    card: 'summary_large_image' as const,
    title: 'How to Qualify for USABO | Open → Semifinal → National Finals → Team USA',
    description:
      'The full USA Biology Olympiad qualification pathway: what each round tests, how advancement works, how to register, and a realistic prep timeline.',
  },
}

interface Round {
  n: number
  name: string
  when: string
  who: string
  format: string
  tests: string
  advance: string
  icon: typeof ClipboardList
}

const rounds: Round[] = [
  {
    n: 1,
    name: 'Open Exam',
    when: 'Typically February, online',
    who: 'All registered students at participating US high schools',
    format:
      'A timed, online multiple-choice exam sat at your school under teacher proctoring. It is the entry point — every registered student takes it.',
    tests:
      'Broad coverage across the whole USABO scope: cell and molecular biology, genetics and evolution, plant and animal anatomy and physiology, ethology, ecology, and biosystematics. Questions reward genuine understanding, not just recall.',
    advance:
      'Roughly the top ~10% of Open Exam scorers nationally are invited to the Semifinal. Exact cutoffs vary year to year and are set after scoring, so treat "top ~10%" as a planning figure rather than a fixed line.',
    icon: ClipboardList,
  },
  {
    n: 2,
    name: 'Semifinal Exam',
    when: 'A few weeks after the Open Exam, online',
    who: 'Students who clear the Open Exam cutoff',
    format:
      'A harder, longer online exam, again proctored at your school. It mixes multiple-choice with more analytical, free-response-style reasoning that demands deeper mastery.',
    tests:
      'The same subject areas as the Open Exam but at greater depth — interpreting experimental data, reading figures and statistics, and reasoning through mechanisms rather than recognizing facts.',
    advance:
      'The top performers on the Semifinal — on the order of ~20 students nationally — are invited to the residential National Finals. As with the Open Exam, the precise number and cutoff are set each year.',
    icon: Target,
  },
  {
    n: 3,
    name: 'National Finals',
    when: 'Late spring, residential (multi-day camp)',
    who: 'The ~20 Semifinal qualifiers',
    format:
      'A multi-day residential event combining rigorous written theory papers with hands-on practical laboratory exams — molecular biology, anatomy/physiology, plant biology, and more. This is where the competition starts to resemble the International Biology Olympiad.',
    tests:
      'Both theoretical depth and real wet-lab skill: dissection, microscopy, gel electrophoresis, data analysis, and careful experimental technique under time pressure.',
    advance:
      'The top 4 finishers at National Finals are selected to form Team USA for the International Biology Olympiad (IBO).',
    icon: FlaskConical,
  },
  {
    n: 4,
    name: 'Team USA at the IBO',
    when: 'Summer, host country varies each year',
    who: 'The 4 National Finals top scorers',
    format:
      'Team USA represents the United States at the International Biology Olympiad against teams from 70+ countries. The IBO itself consists of demanding theory papers and extended practical laboratory exams.',
    tests:
      'World-class theoretical breadth and laboratory precision. Preparation at this level draws on university-level references well beyond any high-school course.',
    advance:
      'Individual medals (gold, silver, bronze) are awarded at the IBO. Reaching Team USA is itself the pinnacle of the US pathway.',
    icon: Trophy,
  },
]

const timeline = [
  {
    phase: 'Autumn (registration window)',
    text: 'Confirm your school is registered with the Center for Excellence in Education (CEE). Speak to your AP Biology or honors-biology teacher early — they coordinate registration and proctoring.',
  },
  {
    phase: '9–6 months before the Open Exam',
    text: 'Build the foundation. Work through Campbell Biology cover to cover and start sitting past Open Exams to learn the format and pacing.',
  },
  {
    phase: '6–3 months before',
    text: 'Add depth where Campbell runs out: molecular mechanisms, biochemistry, plant and animal physiology, ethology. Track weak topics from past-paper drills.',
  },
  {
    phase: '3–0 months before',
    text: 'Past-paper saturation and timed simulations. Stop adding new material in the final month — focus on retrieval, pacing, and weak-area surgery.',
  },
  {
    phase: 'If you clear the Open Exam',
    text: 'Pivot immediately to Semifinal-style analytical and data-interpretation practice. The jump in difficulty is real, and the window between rounds is short.',
  },
]

const faqs = [
  {
    question: 'How many students advance at each round of USABO?',
    answer:
      'Advancement is by national ranking, not a fixed pass mark. Roughly the top ~10% of Open Exam scorers are invited to the Semifinal; from there, on the order of ~20 students reach the residential National Finals; and the top 4 at National Finals form Team USA for the International Biology Olympiad. Because cutoffs are set each year after scoring, treat these figures as planning estimates, not guaranteed thresholds.',
  },
  {
    question: 'When is the USABO Open Exam?',
    answer:
      'The Open Exam is typically held in February and is administered online at your school under teacher proctoring. The Semifinal follows a few weeks later, with National Finals in late spring and the International Biology Olympiad in summer. Confirm exact dates each year with your teacher and the official CEE / USABO portal, as they shift slightly year to year.',
  },
  {
    question: 'Can homeschoolers or individual students enter USABO?',
    answer:
      'USABO is administered through schools and teachers who register with the Center for Excellence in Education (CEE) and proctor the exams. Homeschooled students typically participate by arranging proctoring through an approved school, co-op, or other eligible institution. If you are homeschooled or your school is not yet registered, contact CEE directly to confirm the current arrangement for your situation before assuming you can register as a lone individual.',
  },
  {
    question: 'How long does it take to prepare to qualify for USABO?',
    answer:
      'For a strong honors-biology student, a focused 6–9 month plan is realistic to be competitive for the Open Exam and a Semifinal invitation. Students starting from a weaker base, or aiming at National Finals, generally need a longer multi-year arc that layers in university-level references and serious laboratory practice. There is no shortcut to the Semifinal and Finals — they reward depth that takes time to build.',
  },
  {
    question: 'Does my school have to already participate, or can it register?',
    answer:
      'Any eligible US high school can register annually with CEE; it does not need a prior history with USABO. Registration is generally inexpensive. The practical first step is to ask your AP or honors-biology teacher to coordinate it — once a teacher is willing to proctor, the path is straightforward.',
  },
  {
    question: 'How is USABO different from AP Biology?',
    answer:
      'AP Biology is a strong foundation but stops well short of USABO depth. USABO probes mechanisms, experimental design, data and statistics interpretation, and breadth across plant biology, ethology, and biosystematics that AP barely touches. Most successful USABO candidates use Campbell Biology plus reference texts and years of past papers — far beyond the AP curriculum.',
  },
]

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://cerebrumbiologyacademy.com' },
    {
      '@type': 'ListItem',
      position: 2,
      name: 'USABO Coaching',
      item: 'https://cerebrumbiologyacademy.com/usabo-coaching',
    },
    { '@type': 'ListItem', position: 3, name: 'How to Qualify for USABO', item: URL },
  ],
}

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to qualify for the USA Biology Olympiad (USABO)',
  description:
    'The step-by-step USABO qualification pathway: the Open Exam, Semifinal Exam, National Finals, and selection for Team USA at the International Biology Olympiad.',
  url: URL,
  inLanguage: 'en-US',
  step: rounds.map((r) => ({
    '@type': 'HowToStep',
    position: r.n,
    name: r.name,
    text: `${r.format} ${r.advance}`,
  })),
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((f) => ({
    '@type': 'Question',
    name: f.question,
    acceptedAnswer: { '@type': 'Answer', text: f.answer },
  })),
}

const webPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': URL,
  url: URL,
  name: 'How to Qualify for USABO',
  inLanguage: 'en-US',
  datePublished: '2026-06-25',
  dateModified: '2026-06-25',
  isPartOf: {
    '@type': 'WebSite',
    name: 'Cerebrum Biology Academy',
    url: 'https://cerebrumbiologyacademy.com',
  },
  about: [
    { '@type': 'Thing', name: 'USA Biology Olympiad' },
    { '@type': 'Thing', name: 'USABO qualification pathway' },
  ],
  audience: {
    '@type': 'EducationalAudience',
    educationalRole: 'student',
    audienceType: 'USA-based high school students aiming to qualify for the USA Biology Olympiad',
  },
  areaServed: { '@type': 'Country', name: 'United States' },
  speakable: {
    '@type': 'SpeakableSpecification',
    cssSelector: ['h1', 'details p'],
  },
}

export default function HowToQualifyForUSABOPage() {
  return (
    <>
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }}
      />
      <CerebrumPersonSchema
        knowsAbout={[
          'USA Biology Olympiad (USABO)',
          'USABO Open Exam preparation',
          'USABO Semifinal Exam preparation',
          'USABO National Finals',
          'International Biology Olympiad (IBO)',
          'Biology Olympiad coaching',
        ]}
        jobTitle="Founder & Lead Biology Olympiad Coach"
      />

      <main className="min-h-screen bg-white">
        <nav className="bg-gray-100 py-3 px-4">
          <div className="max-w-7xl mx-auto">
            <ol className="flex items-center flex-wrap gap-1 text-sm">
              <li>
                <Link href="/" className="text-gray-600 hover:text-teal-600">
                  Home
                </Link>
              </li>
              <li className="flex items-center">
                <ChevronRight className="w-4 h-4 text-gray-400 mx-1" />
                <Link href="/usabo-coaching" className="text-gray-600 hover:text-teal-600">
                  USABO Coaching
                </Link>
              </li>
              <li className="flex items-center">
                <ChevronRight className="w-4 h-4 text-gray-400 mx-1" />
                <span className="text-teal-700 font-medium">How to Qualify</span>
              </li>
            </ol>
          </div>
        </nav>

        {/* Hero */}
        <section className="relative py-16 md:py-24 bg-gradient-to-br from-slate-900 to-slate-800 overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-20 left-10 w-72 h-72 bg-yellow-500 rounded-full blur-3xl" />
            <div className="absolute bottom-10 right-10 w-96 h-96 bg-blue-500 rounded-full blur-3xl" />
          </div>
          <div className="relative max-w-5xl mx-auto px-4">
            <div className="inline-flex items-center gap-2 bg-yellow-500/20 text-yellow-300 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Award className="w-4 h-4" />
              The full qualification pathway
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-6">
              How to Qualify for USABO
              <span className="block text-yellow-400 mt-2">
                Open → Semifinal → National Finals → Team USA
              </span>
            </h1>
            <p className="text-lg md:text-xl text-slate-300 mb-6 max-w-3xl">
              The USA Biology Olympiad (USABO), run by the Center for Excellence in Education (CEE),
              is a four-stage ladder. Every registered student starts at the Open Exam; the top
              performers climb through the Semifinal and residential National Finals; and the very
              best four students earn a place on Team USA at the International Biology Olympiad.
              Here is exactly what each round tests, how advancement works, how to register, and how
              long to prepare.
            </p>
            <p className="text-sm text-slate-400 mb-6 max-w-3xl">
              Live online in your US time zone (ET/CT/MT/PT); pricing in USD.
            </p>
            <div className="flex flex-col md:flex-row gap-4">
              <Link
                href="/usabo-coaching#free-assessment"
                className="inline-flex items-center justify-center gap-2 bg-yellow-500 hover:bg-yellow-400 text-slate-900 px-6 py-3 rounded-lg font-semibold transition"
              >
                <Target className="w-5 h-5" />
                Book a free assessment
              </Link>
              <Link
                href="/usabo-coaching"
                className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-lg font-medium border border-white/30 transition"
              >
                <Trophy className="w-5 h-5" />
                See full programme
              </Link>
            </div>
          </div>
        </section>

        {/* The ladder */}
        <section className="py-12 md:py-16 bg-white">
          <div className="max-w-5xl mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-3">
              The four rounds, in order
            </h2>
            <p className="text-slate-600 mb-8 max-w-3xl">
              USABO advancement is by national ranking, not a fixed pass mark. The figures below are
              planning estimates — exact cutoffs are set each year after the papers are scored.
            </p>
            <div className="space-y-5">
              {rounds.map((r) => {
                const Icon = r.icon
                return (
                  <div key={r.n} className="bg-slate-50 rounded-xl p-6 border border-slate-200">
                    <div className="flex items-start gap-4 mb-4">
                      <span className="flex-shrink-0 w-11 h-11 rounded-full bg-teal-600 text-white flex items-center justify-center">
                        <Icon className="w-6 h-6" />
                      </span>
                      <div>
                        <h3 className="text-xl font-bold text-slate-900">
                          Round {r.n}: {r.name}
                        </h3>
                        <p className="text-sm text-teal-700 font-medium">{r.when}</p>
                      </div>
                    </div>
                    <dl className="grid md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <dt className="font-semibold text-slate-900 mb-1">Who takes it</dt>
                        <dd className="text-slate-700">{r.who}</dd>
                      </div>
                      <div>
                        <dt className="font-semibold text-slate-900 mb-1">Format</dt>
                        <dd className="text-slate-700">{r.format}</dd>
                      </div>
                      <div>
                        <dt className="font-semibold text-slate-900 mb-1">What it tests</dt>
                        <dd className="text-slate-700">{r.tests}</dd>
                      </div>
                      <div>
                        <dt className="font-semibold text-slate-900 mb-1">How you advance</dt>
                        <dd className="text-slate-700">{r.advance}</dd>
                      </div>
                    </dl>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* How to register */}
        <section className="py-12 md:py-16 bg-slate-50">
          <div className="max-w-5xl mx-auto px-4">
            <div className="flex items-center gap-3 mb-2">
              <Users className="w-7 h-7 text-teal-600" />
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
                How to register for USABO
              </h2>
            </div>
            <p className="text-slate-600 mb-8 max-w-3xl">
              You do not register as a lone individual online. USABO is administered through schools
              and teachers, so the path runs through your teacher.
            </p>
            <ol className="space-y-4">
              {[
                'Talk to your AP Biology or honors-biology teacher early in the school year — they are the person who coordinates registration and proctoring.',
                'Your school registers annually with the Center for Excellence in Education (CEE), which administers USABO. Any eligible US high school can register; a prior history with USABO is not required, and the fee is generally modest.',
                'If your school is not yet registered, ask whether a teacher is willing to set it up. If you are homeschooled, contact CEE to confirm the current proctoring arrangement before assuming you can enter individually.',
                'Once registered, you sit the Open Exam (typically February) at your school under teacher proctoring. From there, advancement is automatic by ranking — there is no separate application to the Semifinal or Finals.',
              ].map((step, idx) => (
                <li
                  key={idx}
                  className="flex gap-3 bg-white p-5 rounded-xl border border-slate-200"
                >
                  <span className="flex-shrink-0 w-7 h-7 rounded-full bg-teal-600 text-white text-sm font-bold flex items-center justify-center">
                    {idx + 1}
                  </span>
                  <span className="text-slate-700 text-sm">{step}</span>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Prep timeline */}
        <section className="py-12 md:py-16 bg-white">
          <div className="max-w-5xl mx-auto px-4">
            <div className="flex items-center gap-3 mb-2">
              <Calendar className="w-7 h-7 text-purple-600" />
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
                A realistic prep timeline
              </h2>
            </div>
            <p className="text-slate-600 mb-8 max-w-3xl">
              Qualifying is a depth game. For a strong honors-biology student, a focused 6–9 month
              arc is realistic for the Open Exam and a Semifinal invitation; National Finals demands
              a longer, lab-inclusive build.
            </p>
            <ul className="space-y-3">
              {timeline.map((t) => (
                <li
                  key={t.phase}
                  className="flex gap-3 bg-slate-50 p-4 rounded-xl border border-slate-200"
                >
                  <CheckCircle2 className="w-5 h-5 text-teal-600 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-700 text-sm">
                    <strong>{t.phase}: </strong>
                    {t.text}
                  </span>
                </li>
              ))}
            </ul>
            <p className="text-sm text-slate-500 mt-6 max-w-3xl">
              For a month-by-month version, see our{' '}
              <Link
                href="/usabo-6-month-prep-plan"
                className="text-teal-700 underline hover:text-teal-800"
              >
                USABO 6-month prep plan
              </Link>
              , and use the{' '}
              <Link
                href="/usabo-past-papers"
                className="text-teal-700 underline hover:text-teal-800"
              >
                past-papers archive
              </Link>{' '}
              as your primary drill resource.
            </p>
          </div>
        </section>

        {/* FAQs */}
        <section className="py-12 md:py-16 bg-slate-50">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-8 text-center">
              Frequently Asked Questions
            </h2>
            <div className="space-y-3">
              {faqs.map((faq) => (
                <details
                  key={faq.question}
                  className="group bg-white rounded-xl border border-slate-200 open:shadow-md"
                >
                  <summary className="flex items-center justify-between p-5 cursor-pointer">
                    <span className="font-semibold text-slate-900 pr-4">{faq.question}</span>
                    <ChevronRight className="w-5 h-5 text-slate-500 group-open:rotate-90 transition-transform flex-shrink-0" />
                  </summary>
                  <div className="px-5 pb-5 text-sm text-slate-700 leading-relaxed">
                    {faq.answer}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 md:py-20 bg-gradient-to-r from-slate-900 to-slate-800 text-white">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <GraduationCap className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Find out where you stand — free assessment
            </h2>
            <p className="text-xl mb-8 opacity-90">
              A short diagnostic shows whether you are on track for the Open Exam cutoff and what to
              fix first. We coach the full pathway in US time zones, from foundation reading to
              National Finals lab prep.
            </p>
            <div className="flex flex-col md:flex-row gap-4 justify-center">
              <Link
                href="/usabo-coaching#free-assessment"
                className="inline-flex items-center justify-center gap-2 bg-yellow-500 hover:bg-yellow-400 text-slate-900 px-8 py-4 rounded-xl font-bold text-lg transition"
              >
                <Target className="w-5 h-5" />
                Book a free assessment
              </Link>
              <ContextualWhatsAppLink className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white px-8 py-4 rounded-xl font-medium text-lg border border-white/30 transition">
                <MessageCircle className="w-5 h-5" />
                Ask a question on WhatsApp
              </ContextualWhatsAppLink>
            </div>
          </div>
        </section>

        {/* Related */}
        <section className="py-12 bg-white">
          <div className="max-w-5xl mx-auto px-4">
            <h2 className="text-xl font-bold text-slate-900 mb-6 text-center">Related guides</h2>
            <div className="grid md:grid-cols-4 gap-4">
              <Link
                href="/usabo-coaching"
                className="bg-slate-50 p-4 rounded-xl border border-slate-200 hover:border-teal-300 hover:shadow-md transition"
              >
                <h3 className="font-semibold text-teal-700">USABO Coaching</h3>
                <p className="text-xs text-slate-600 mt-1">Full Open + Semifinal pathway</p>
              </Link>
              <Link
                href="/best-usabo-coach"
                className="bg-slate-50 p-4 rounded-xl border border-slate-200 hover:border-teal-300 hover:shadow-md transition"
              >
                <h3 className="font-semibold text-teal-700">Best USABO Coach</h3>
                <p className="text-xs text-slate-600 mt-1">Why students pick us</p>
              </Link>
              <Link
                href="/usabo-syllabus"
                className="bg-slate-50 p-4 rounded-xl border border-slate-200 hover:border-teal-300 hover:shadow-md transition"
              >
                <h3 className="font-semibold text-teal-700">USABO Syllabus</h3>
                <p className="text-xs text-slate-600 mt-1">What is on the exam</p>
              </Link>
              <Link
                href="/usabo-6-month-prep-plan"
                className="bg-slate-50 p-4 rounded-xl border border-slate-200 hover:border-teal-300 hover:shadow-md transition"
              >
                <h3 className="font-semibold text-teal-700">6-Month Prep Plan</h3>
                <p className="text-xs text-slate-600 mt-1">Month-by-month schedule</p>
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
