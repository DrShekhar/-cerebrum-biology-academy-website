/**
 * /hkbo-coaching
 *
 * Hong Kong Biology Olympiad (HKBO) coaching landing page.
 *
 * HKBO is administered by HKAGE (Hong Kong Academy for Gifted Education) +
 * CUHK Faculty of Science with a single MCQ screening round → Phase I + II
 * training → IBO Hong Kong national team selection (4 students per year).
 *
 * Market wedge: HKBO commercial coaching is small but UNCONTESTED in the
 * English-medium space — most HK olympiad prep happens through the
 * HKAGE programme itself or through Cantonese-medium local tutors. Cerebrum
 * is positioned for ambitious DSE / IB Form 5–6 students who want
 * IBO-feeder-level coaching in English alongside their main curriculum.
 *
 * Geo-gate: hidden from India IPs via hideFromCountries(['IN']) + middleware.
 */

import type { Metadata } from 'next'
import Link from 'next/link'
import { FAQSchema } from '@/components/seo/FAQSchema'
import { BreadcrumbSchema } from '@/components/seo/BreadcrumbSchema'
import { hideFromCountries } from '@/lib/geo/hideFromCountries'
import {
  MessageCircle,
  Trophy,
  Target,
  Award,
  CheckCircle2,
  Calendar,
  BookOpen,
} from 'lucide-react'

/**
 * Force runtime rendering so the India geo-gate fires on every request.
 * Middleware also gates this path as a second-line defence.
 */
export const dynamic = 'force-dynamic'

const CANONICAL = 'https://cerebrumbiologyacademy.com/hkbo-coaching'

export const metadata: Metadata = {
  title: 'HKBO Coaching Hong Kong | Hong Kong Biology Olympiad + IBO Team Prep | Cerebrum',
  description:
    'Expert HKBO (Hong Kong Biology Olympiad) coaching for Form 5 + Form 6 students. HKAGE + CUHK selection path, Phase I/II training, IBO Hong Kong national team funnel. English-medium specialist.',
  keywords: [
    'HKBO coaching',
    'Hong Kong Biology Olympiad',
    'HKBO tutor Hong Kong',
    'HKAGE biology olympiad',
    'CUHK biology olympiad',
    'IBO Hong Kong team',
    'HKBO Phase I training',
    'HKBO Phase II coaching',
    'biology olympiad Hong Kong',
    'best HKBO coach',
    'IBO HK national team',
    'biology olympiad tutor Form 5 Form 6',
  ],
  alternates: {
    canonical: CANONICAL,
    languages: { 'en-HK': CANONICAL, en: CANONICAL, 'x-default': CANONICAL },
  },
  openGraph: {
    title: 'HKBO Coaching Hong Kong | Hong Kong Biology Olympiad Prep | Cerebrum',
    description:
      'Expert HKBO coaching with IBO Hong Kong national team funnel. AIIMS-trained faculty, English-medium, Campbell + Lehninger + research-paper depth.',
    url: CANONICAL,
    siteName: 'Cerebrum Biology Academy',
    type: 'website',
    locale: 'en_HK',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'HKBO Coaching Hong Kong',
    description: 'Expert HKBO coaching with IBO Hong Kong team funnel preparation.',
  },
  robots: { index: true, follow: true },
}

const hkboPathway = [
  {
    stage: 'Stage 1',
    name: 'Screening Round',
    description: 'Single MCQ paper administered by HKAGE + CUHK at participating Form 5/6 schools',
    date: 'October–November',
    icon: Target,
  },
  {
    stage: 'Stage 2',
    name: 'Phase I Training',
    description: 'Top scorers join HKAGE + CUHK weekend training programme — theory + lab basics',
    date: 'January–March',
    icon: BookOpen,
  },
  {
    stage: 'Stage 3',
    name: 'Phase II + IBO Selection',
    description: 'Final selection round — top 4 selected for IBO Hong Kong national team',
    date: 'April–May',
    icon: Award,
  },
  {
    stage: 'Stage 4',
    name: 'IBO',
    description: 'International Biology Olympiad representing Hong Kong',
    date: 'July',
    icon: Trophy,
  },
]

const faqs = [
  {
    question: 'What is the Hong Kong Biology Olympiad (HKBO)?',
    answer:
      'HKBO is the Hong Kong-level qualifying competition for the International Biology Olympiad (IBO). It is jointly administered by HKAGE (Hong Kong Academy for Gifted Education) and the Chinese University of Hong Kong (CUHK) Faculty of Science. Form 4–6 secondary school students compete via an initial MCQ screening round (October–November), then top scorers progress through Phase I training (theory + basic lab) and Phase II selection to form the 4-person Hong Kong team that competes at IBO each July.',
  },
  {
    question: 'Who is eligible for HKBO and when does the selection process happen?',
    answer:
      "HKBO is open to Hong Kong secondary school students (Form 4 to Form 6) at participating schools. The screening round runs in October–November each year — typically held at the student's own school during a regular class period. Top scorers (around 30–50 students annually) are invited to Phase I training run by HKAGE + CUHK over weekends in January–March. Phase II + final IBO team selection happens in April–May. The IBO itself takes place in July at varying host countries.",
  },
  {
    question: 'How does HKBO content differ from HKDSE Biology?',
    answer:
      'HKBO content is significantly deeper than HKDSE Biology. HKDSE covers Hong Kong senior secondary curriculum (Form 5–6 syllabus) with Paper 1 + Paper 2 in MC + structured format. HKBO Phase I content extends well into university-level cell biology, biochemistry (Lehninger-style depth), molecular biology, plant + animal physiology, ethology, ecology, and biosystematics — drawing on Campbell Biology, Molecular Biology of the Cell (Alberts), and primary research literature. Phase II adds practical lab skills (microscopy, biochemistry techniques, basic anatomy). The two exams overlap maybe 30–40% on content but the depth difference is substantial.',
  },
  {
    question: 'Should I do HKBO alongside HKDSE or IB Biology — is it worth the extra workload?',
    answer:
      'It depends on your university target. HKBO success is strongly valued by HKU MBBS, CUHK MBBS, HKU Dentistry, and any HKU / CUHK biology-related programme — both directly (as a JUPAS portfolio item) and indirectly (HKAGE Phase I+ qualification is a strong signal of university-level biology readiness). For overseas applications, an IBO international medal is a Tier-1 credential that even Ivy League adcoms recognise immediately. The workload is meaningful: expect 3–5 extra hours per week through October–April. We recommend HKBO for Form 5–6 students with a clear path to medicine, biology research, or top-overseas-university applications — not as a casual extracurricular.',
  },
  {
    question: 'What does Cerebrum HKBO coaching cover that HKAGE Phase I training does not?',
    answer:
      'HKAGE Phase I training is excellent but runs as a 6–8 weekend programme with shared cohort sessions — limited 1:1 attention, no personalised weak-area diagnosis, and no follow-up support outside scheduled sessions. Cerebrum adds: (1) pre-screening preparation (October MCQ practice with HKBO + HKDSE past papers), (2) 1:1 weekly sessions in parallel with HKAGE Phase I to deepen Phase II topics, (3) practical lab technique walkthroughs (microscopy, biochemistry, anatomy) where HKAGE coverage is light, (4) research-paper analysis for Phase II + IBO theory, (5) direct WhatsApp faculty access for doubt-clearing across the full October–July cycle. We do not replace HKAGE — we layer alongside it for students targeting top-4 IBO team selection.',
  },
  {
    question:
      'Cerebrum is India-based — how does English-medium HKBO coaching work for Hong Kong students?',
    answer:
      "HKBO is administered in English (HKAGE + CUHK use English as the working language for both screening and Phase I/II training), and HKU MBBS / CUHK MBBS interviews are conducted in English. Cerebrum's English-medium IBO-feeder coaching aligns directly with this format. AIIMS-trained core faculty (Dr. Shekhar C Singh) has documented IBO national-team prep experience across India (INBO + Indian IBO team selection) — the same Campbell + Lehninger + research-paper pedagogy directly transfers to HKBO Phase I/II content. Live online classes in HKT evening slots (7–10 PM) fit Form 5/6 students who are already running heavy HKDSE / IB workloads.",
  },
  {
    question: 'What does HKBO coaching cost with Cerebrum?',
    answer:
      'Cerebrum HKBO coaching is priced HK$3,500–8,000 per month depending on track: (1) Pre-screening + Phase I prep small batch (4–6 students, 90 min × 2 sessions/week) — HK$3,500/month from October through April; (2) Combined HKDSE + HKBO track (full HKDSE Biology coaching + olympiad-extension module) — HK$5,500/month; (3) 1:1 Phase II + IBO funnel intensive (Form 6 students post-screening, targeting national team selection) — HK$8,000/month. Compare: HKAGE Phase I training is free for selected students but limited in scope; private HK biology olympiad tutors charge HK$800–1,500/hr for individual sessions with no structured programme.',
  },
  {
    question: 'Can my child prepare for HKBO and IBO from a non-HKAGE Phase I background?',
    answer:
      "Yes, though it is harder. Students who did not pass the initial HKBO screening or did not reach HKAGE Phase I can still progress to IBO-level mastery by self-studying Campbell Biology + Molecular Biology of the Cell + primary research literature, then attempting the next year's HKBO cycle in Form 6 with a strong foundation. Cerebrum coaches this pathway — typically Form 5 students who missed the first screening round but want to ace the Form 6 cycle. The structured 9-month programme (October to April) covers full Phase I theory + Phase II practical preparation independent of HKAGE eligibility.",
  },
]

const courseSchema = {
  '@context': 'https://schema.org',
  '@type': 'Course',
  name: 'HKBO Coaching Programme — Hong Kong Biology Olympiad',
  description:
    'Hong Kong Biology Olympiad preparation for Form 5 + Form 6 students. HKAGE + CUHK screening + Phase I/II training + IBO Hong Kong national team funnel. AIIMS-trained faculty, English-medium, Campbell + Lehninger + research-paper depth.',
  provider: {
    '@type': 'EducationalOrganization',
    name: 'Cerebrum Biology Academy',
    url: 'https://cerebrumbiologyacademy.com',
  },
  courseCode: 'HKBO',
  educationalLevel: 'Senior Secondary (Form 5 + Form 6)',
  teaches: 'HKBO screening + Phase I theory + Phase II practical + IBO Hong Kong team selection',
  inLanguage: 'en-HK',
  availableLanguage: ['English'],
  audience: {
    '@type': 'EducationalAudience',
    audienceType: 'Hong Kong Form 5 and Form 6 students',
    geographicArea: { '@type': 'Country', name: 'Hong Kong' },
  },
  offers: {
    '@type': 'Offer',
    priceCurrency: 'HKD',
    price: '3500',
    priceSpecification: {
      '@type': 'UnitPriceSpecification',
      priceCurrency: 'HKD',
      price: 3500,
      unitText: 'MONTH',
      minPrice: 3500,
      maxPrice: 8000,
    },
    availability: 'https://schema.org/InStock',
  },
  hasCourseInstance: [
    {
      '@type': 'CourseInstance',
      courseMode: 'Online',
      location: { '@type': 'VirtualLocation', url: CANONICAL },
    },
  ],
}

export default async function HKBOCoachingPage() {
  await hideFromCountries(['IN'])

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(courseSchema) }}
      />
      <FAQSchema questions={faqs} pageUrl={CANONICAL} />
      <BreadcrumbSchema
        items={[
          { label: 'Home', href: 'https://cerebrumbiologyacademy.com/' },
          {
            label: 'Biology Olympiads',
            href: 'https://cerebrumbiologyacademy.com/biology-olympiads',
          },
          { label: 'HKBO Coaching', isCurrentPage: true },
        ]}
        showSchemaOnly
      />

      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        <section className="bg-gradient-to-r from-blue-700 to-indigo-800 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <div className="inline-flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full text-sm mb-6">
                <Trophy className="w-4 h-4" />
                HKAGE + CUHK Selection Path · IBO Hong Kong Team Funnel
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                HKBO Coaching — Hong Kong Biology Olympiad
              </h1>
              <p className="text-lg md:text-xl text-blue-100 max-w-3xl mx-auto mb-6">
                Specialist English-medium HKBO (Hong Kong Biology Olympiad) coaching for Form 5 +
                Form 6 students. Pre-screening preparation, Phase I theory mastery, Phase II
                practical training, and IBO Hong Kong national team funnel — layered alongside HKAGE
                + CUHK\'s official programme.
              </p>
              <div className="flex flex-wrap justify-center gap-4 text-sm">
                <span className="bg-white/20 px-4 py-2 rounded-full flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4" />
                  HK$3,500–8,000 / month
                </span>
                <span className="bg-white/20 px-4 py-2 rounded-full flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  October–July cycle
                </span>
                <span className="bg-white/20 px-4 py-2 rounded-full flex items-center gap-2">
                  <Award className="w-4 h-4" />
                  AIIMS-trained faculty
                </span>
              </div>
            </div>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <section className="mb-12 bg-amber-50 border-l-4 border-amber-500 rounded-r-xl p-6">
            <h2 className="text-xl font-bold text-amber-900 mb-3">The Short Answer</h2>
            <p className="text-amber-950 leading-relaxed">
              <strong>HKBO (Hong Kong Biology Olympiad)</strong> is the HKAGE + CUHK-administered
              path to the IBO Hong Kong national team. Cerebrum offers{' '}
              <strong>English-medium HKBO coaching</strong> for Form 5 + Form 6 students —
              pre-screening prep, Phase I theory + Phase II practical mastery, and IBO funnel
              preparation. AIIMS-trained core faculty (Dr. Shekhar C Singh) with documented IBO
              national-team prep across multiple countries. Live online HKT evening sessions.
              HK$3,500–8,000/month depending on track.{' '}
              <strong>We layer alongside HKAGE\'s official programme, not replace it.</strong>
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Target className="w-6 h-6 text-blue-600" />
              HKBO Selection Pathway
            </h2>
            <div className="grid md:grid-cols-4 gap-4">
              {hkboPathway.map((stage) => (
                <div
                  key={stage.stage}
                  className="bg-white p-5 rounded-xl border border-gray-200 text-center"
                >
                  <stage.icon className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                  <div className="text-xs text-blue-600 font-semibold mb-1">{stage.stage}</div>
                  <div className="font-bold text-gray-900 mb-1">{stage.name}</div>
                  <div className="text-xs text-gray-500 mb-2">{stage.date}</div>
                  <p className="text-xs text-gray-600">{stage.description}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Why Hong Kong Form 5–6 Students Choose Cerebrum for HKBO
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-xl border border-gray-200">
                <h3 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-blue-600" />
                  Layers Alongside HKAGE Phase I
                </h3>
                <p className="text-gray-600 text-sm">
                  HKAGE Phase I training is excellent but runs as a shared cohort programme with
                  limited 1:1 attention. We add weekly 1:1 sessions to deepen Phase II topics, run
                  research-paper analysis for IBO theory, and provide direct WhatsApp faculty access
                  across the full October–July cycle.
                </p>
              </div>
              <div className="bg-white p-6 rounded-xl border border-gray-200">
                <h3 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-blue-600" />
                  Pre-Screening + Phase II Practical
                </h3>
                <p className="text-gray-600 text-sm">
                  We coach the October MCQ screening round (often a gap for first-time Form 5
                  candidates) AND the Phase II practical lab component (microscopy, biochemistry
                  techniques, anatomy dissection) where HKAGE coverage is necessarily light given
                  the weekend-cohort format.
                </p>
              </div>
              <div className="bg-white p-6 rounded-xl border border-gray-200">
                <h3 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                  <Award className="w-5 h-5 text-blue-600" />
                  Multi-Country IBO Funnel Experience
                </h3>
                <p className="text-gray-600 text-sm">
                  Dr. Shekhar C Singh has documented IBO national-team prep experience across India
                  (INBO + Indian IBO team), USA (USABO Open/Semifinal/Finals), UK (BBO), Canada
                  (CBO), Singapore (SBO). The same Campbell + Lehninger + research-paper pedagogy
                  directly transfers to HKBO Phase I/II content.
                </p>
              </div>
              <div className="bg-white p-6 rounded-xl border border-gray-200">
                <h3 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                  <MessageCircle className="w-5 h-5 text-blue-600" />
                  HKDSE + HKBO Combined Track
                </h3>
                <p className="text-gray-600 text-sm">
                  Many Form 5–6 students want HKBO depth WITHOUT sacrificing HKDSE grades. Our
                  combined HKDSE + HKBO track delivers both — shared core biology foundations cover
                  HKDSE Paper 1/2 mastery, with a separate olympiad-extension module for HKBO Phase
                  I/II content. HK$5,500/month for the combined programme.
                </p>
              </div>
            </div>
          </section>

          <section className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 mb-12 text-white">
            <div className="max-w-3xl mx-auto text-center">
              <Award className="w-12 h-12 mx-auto mb-4 text-amber-300" />
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Book a Free HKBO Demo Session</h2>
              <p className="text-blue-100 mb-6">
                30-minute live demo with our IBO-funnel faculty. Bring a HKBO past paper question or
                a topic you find difficult — we\'ll walk through the olympiad-level approach.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="https://wa.me/918826444334?text=Hi%20Cerebrum%2C%20I%27m%20a%20Hong%20Kong%20Form%205%2F6%20student%20interested%20in%20HKBO%20coaching%20and%20would%20like%20to%20book%20a%20free%20demo."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-green-500 hover:bg-green-400 text-white font-semibold px-8 py-4 rounded-xl transition-colors"
                >
                  <MessageCircle className="w-5 h-5" />
                  WhatsApp for Demo
                </a>
                <Link
                  href="/dse-biology-tutor-hong-kong"
                  className="inline-flex items-center justify-center gap-2 bg-white text-blue-600 hover:bg-blue-50 font-semibold px-8 py-4 rounded-xl transition-colors"
                >
                  Also Doing HKDSE? →
                </Link>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <BookOpen className="w-6 h-6 text-blue-600" />
              Frequently Asked Questions — HKBO Hong Kong
            </h2>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <details
                  key={index}
                  className="group bg-white border border-gray-200 rounded-xl overflow-hidden"
                >
                  <summary className="flex items-center justify-between cursor-pointer p-5 hover:bg-gray-50 transition-colors">
                    <h3 className="font-medium text-gray-900 pr-4">{faq.question}</h3>
                    <span className="text-gray-500 group-open:rotate-180 transition-transform">
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </span>
                  </summary>
                  <div className="px-5 pb-5 text-gray-600 border-t border-gray-100 pt-4">
                    {faq.answer}
                  </div>
                </details>
              ))}
            </div>
          </section>

          <section className="mt-12 pt-8 border-t border-gray-200">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Related Hong Kong Pages</h2>
            <div className="flex flex-wrap gap-3">
              {[
                { label: 'IB Biology Tutor Hong Kong', href: '/ib-biology/hong-kong' },
                { label: 'DSE Biology Tutor Hong Kong', href: '/dse-biology-tutor-hong-kong' },
                { label: 'AP Biology Tutor Hong Kong', href: '/ap-biology-tutor-hong-kong' },
                { label: 'Top IBO Coaching Global', href: '/top-ibo-coaching' },
                { label: 'CNBO Coaching (mainland China)', href: '/cnbo-coaching' },
                { label: 'Best IBO Preparation', href: '/best-ibo-preparation' },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="inline-flex items-center gap-1 text-sm text-blue-600 hover:text-blue-800 bg-blue-50 px-4 py-2 rounded-full hover:bg-blue-100 transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </section>
        </div>
      </div>
    </>
  )
}
