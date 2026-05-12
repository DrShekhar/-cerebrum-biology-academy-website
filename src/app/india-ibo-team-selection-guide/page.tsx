import type { Metadata } from 'next'
import Link from 'next/link'
import {
  ArrowRight,
  Award,
  BookOpen,
  Calendar,
  CheckCircle2,
  Compass,
  Target,
  XCircle,
} from 'lucide-react'
import { FAQSchema } from '@/components/seo/FAQSchema'
import { BreadcrumbSchema } from '@/components/seo/BreadcrumbSchema'
import { SpeakableSchema } from '@/components/seo/SpeakableSchema'
import { olympiadCourseSchema } from '@/data/olympiads/schema-helpers'

const PAGE_URL = 'https://cerebrumbiologyacademy.com/india-ibo-team-selection-guide'

export const metadata: Metadata = {
  title: 'India IBO Team Selection Guide | NSEB to IBO Pathway',
  description:
    'How India selects its biology olympiad team. The 4-stage funnel: NSEB ~75K to INBO 500 to OCSC 35 to IBO team of 4. Timeline, attrition, what wins at each stage.',
  keywords: [
    'India IBO team selection',
    'how to qualify India biology olympiad team',
    'India biology olympiad pathway NSEB to IBO',
    'HBCSE biology olympiad funnel',
    'India IBO team selection process',
    'India biology olympiad stages',
    'NSEB INBO OCSC IBO timeline',
    'HBCSE IBO selection',
    'how India selects biology olympiad team',
    'India biology olympiad cutoffs',
    'biology olympiad attrition India',
    'India IBO team criteria',
    'India biology olympiad guide',
    'IAPT HBCSE pathway',
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
    title: 'India IBO Team Selection Guide — NSEB to IBO Pathway',
    description:
      'The complete funnel: NSEB ~75K to INBO 500 to OCSC 35 to India IBO team of 4. What separates winners at each stage.',
    type: 'article',
    url: PAGE_URL,
    siteName: 'Cerebrum Biology Academy',
    locale: 'en_IN',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'India IBO Team Selection Guide — Cerebrum Biology Academy',
    description:
      'How India selects 4 students for the International Biology Olympiad — the full NSEB to IBO pathway explained.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
}

const stages = [
  {
    label: 'Stage 1',
    name: 'NSEB',
    window: 'November',
    organiser: 'IAPT',
    pool: '~75,000 register',
    qualify: 'Top 300-500 qualify',
    body: 'NSEB (National Standard Examination in Biology) is the broad funnel. It is conducted by IAPT (Indian Association of Physics Teachers, which runs all the national standard exams for the science olympiad pathway) every November. The paper is 80 multiple-choice questions to be solved in 2 hours. Difficulty is closer to first-year university biology than to NCERT Class 12 — questions test conceptual depth and reasoning, not just recall. Negative marking applies. Students in Class 12 or below in Indian schools are eligible. Roughly the top 1 percent of registered candidates (approximately 300-500 students nationally) qualify for INBO.',
  },
  {
    label: 'Stage 2',
    name: 'INBO',
    window: 'January or February',
    organiser: 'HBCSE',
    pool: '~300-500 attempt',
    qualify: 'Top ~35 qualify',
    body: 'INBO (Indian National Biology Olympiad) is the second filter, conducted by HBCSE (Homi Bhabha Centre for Science Education) at the end of January or in February. INBO is a theory-only paper at university-introductory-biology level. Questions are passage-style, multi-part, and reward integrative thinking — the ability to connect cell biology with genetics, or to apply enzyme kinetics inside a metabolism question. From the INBO field of approximately 300-500 students, HBCSE selects roughly the top 35 for OCSC.',
  },
  {
    label: 'Stage 3',
    name: 'OCSC',
    window: 'May to June',
    organiser: 'HBCSE Mumbai',
    pool: '~35 attend',
    qualify: 'Top 4 selected',
    body: 'OCSC (Orientation cum Selection Camp) is the residential selection camp held at the HBCSE Mumbai campus, typically across 2 to 3 weeks in May or June. The camp is intensive — theory in the mornings, practical work in the afternoons, problem-solving in the evenings. Practical biology (microscopy, biochemical assays, dissection, molecular biology techniques, ecology field-data analysis) carries significant weight, mirroring the IBO format. Final selection is based on combined theory and practical scores. The four highest combined-score students become the India IBO team.',
  },
  {
    label: 'Finals',
    name: 'IBO',
    window: 'July',
    organiser: 'IBO Host Country',
    pool: '~80 countries',
    qualify: '4 India representatives',
    body: 'The International Biology Olympiad (IBO) is the global finals, held in July. The IBO involves approximately 80 country teams of 4 students each. The competition runs over a week and includes a theory paper and an extensive practical examination across biochemistry, plant biology, animal biology, and bioinformatics or ecology. Medals (Gold, Silver, Bronze, and Honourable Mentions) are awarded based on combined scores. Per publicly reported HBCSE annual results, India typically returns from IBO with 2 to 4 medals annually across the Gold-Silver-Bronze spectrum.',
  },
]

const timeline = [
  {
    month: 'June (Class 11 start)',
    event: 'Begin Campbell Biology foundation sweep, Cerebrum NSEB stream',
  },
  { month: 'July to October', event: 'Past-paper drills, topic-wise depth, weekly mock MCQs' },
  { month: 'November', event: 'NSEB exam (IAPT)' },
  { month: 'December to January', event: 'NSEB results, INBO-stream coaching for qualifiers' },
  { month: 'January or February', event: 'INBO exam (HBCSE)' },
  {
    month: 'March to April',
    event: 'INBO results, OCSC invitations, pre-camp coaching window opens',
  },
  { month: 'May to June', event: 'OCSC residential camp at HBCSE Mumbai' },
  { month: 'June to July', event: 'India IBO team prep under HBCSE supervision (top 4 only)' },
  { month: 'July', event: 'IBO international finals' },
]

const winners = [
  {
    stage: 'NSEB to INBO',
    icon: BookOpen,
    title: 'Campbell Biology depth plus past-paper familiarity',
    body: 'NSEB rewards students who have actually read Campbell Biology cover to cover — not just NCERT. It also rewards past-paper familiarity. Students who have drilled 10+ years of NSEB past papers can usually answer 60+ of the 80 MCQs from pattern recognition alone, freeing time to think hard about the remaining 20.',
  },
  {
    stage: 'INBO to OCSC',
    icon: Compass,
    title: 'Application and integration ability',
    body: 'INBO theory is passage-style and integrative. The students who advance from INBO to OCSC are not the ones with the best recall — they are the ones who can take a biology passage they have never seen before, identify the experimental setup, recognise the implicit hypothesis, and reason through follow-up questions. This is closer to a real scientist workflow than to a school exam.',
  },
  {
    stage: 'OCSC to IBO team',
    icon: Award,
    title: 'Practical skills plus IBO-level theory plus composure',
    body: 'OCSC is where the four top performers are separated. Theory at OCSC is at IBO level (markedly harder than INBO), and practical work carries roughly half the weight. The four selected students are those who can perform clean microscopy under time pressure, design biochemical assays, dissect cleanly, interpret novel research-paper data, AND hold composure across 2-3 weeks of intense examination. The mental stamina component is real.',
  },
]

const mistakes = [
  {
    icon: XCircle,
    title: 'Starting NSEB prep too late',
    body: 'Many students attempt NSEB only in Class 12, treating it as a stretch goal alongside NEET. This is risky — Campbell Biology depth takes 12-18 months to build properly. The ideal arc is Class 11 (foundation + first NSEB attempt) and Class 12 (revision + second NSEB attempt with INBO targeting). Class 9 to 10 starters have a real advantage.',
  },
  {
    icon: XCircle,
    title: 'Underestimating practical at OCSC',
    body: 'Most Indian schools do not provide consistent microscope access, real biochemistry lab time, or dissection experience beyond NCERT charts. Students arrive at OCSC theory-strong but practical-weak — and OCSC weights practical heavily. Without targeted pre-camp practical-skills training in the 3-month INBO to OCSC window, theory students typically miss the top 4.',
  },
  {
    icon: XCircle,
    title: 'Treating it like NEET preparation',
    body: 'NEET is MCQ-only. NSEB is also MCQ — but the resemblance ends there. INBO is theory-only, passage-style, and integrative. OCSC has heavy practical. IBO is half practical. A NEET-style prep approach (timed MCQ drilling, formula memorisation, factual recall) will get a student through NSEB but stalls hard at INBO and OCSC. The two pathways diverge after the NSEB stage.',
  },
  {
    icon: XCircle,
    title: 'Switching faculty between stages',
    body: 'Many generalist coaching providers handle NSEB through one set of teachers and then hand off INBO and beyond to a different team — or worse, fold biology olympiad prep into a general physics-chemistry-math-biology olympiad track. Continuity matters. The mentor who knows your weak topics at NSEB is the one best positioned to coach you through INBO and OCSC.',
  },
]

const noTeamBenefits = [
  {
    title: 'Top 35 at OCSC — HBCSE certificate of merit',
    body: 'Receiving an HBCSE certificate of merit from OCSC is itself a national-level credential. Of the approximately 35 OCSC attendees each year, 31 do not make the India team — but every one of them carries a meaningful signal for college applications.',
  },
  {
    title: 'Indian college applications',
    body: 'For Indian undergraduate biology programmes — IISER, IISc Bangalore, the integrated M.Sc. programmes at IITs, top Central Universities, and TIFR-affiliated institutions — an OCSC credential functions in a similar role to a KVPY-equivalent profile signal. It tells admission committees that this student has been benchmarked nationally against the strongest biology pool of their cohort.',
  },
  {
    title: 'International college applications',
    body: 'For US, UK, Singapore, and Canada undergraduate applications, an OCSC or India IBO team credential is an exceptional signal. Top-tier US universities (Stanford, Harvard, MIT, the Ivy League schools, Johns Hopkins) and UK universities (Oxford, Cambridge, Imperial, UCL) all recognise the IBO pathway as one of the strongest demonstrators of subject mastery for an undergraduate biology or biomedical applicant.',
  },
  {
    title: 'NEET separate, but Biology score advantage',
    body: 'IBO participation does not count for NEET seat reservation — they are separate examination systems. However, students who have prepared through the olympiad pathway typically score 340+ in NEET Biology (out of 360) versus a 320 average for NEET-only students, because Campbell Biology depth translates directly to the harder NEET Biology questions.',
  },
]

const faqs = [
  {
    question: 'How many years should I plan for India IBO team selection?',
    answer:
      'The ideal arc is 4 years — Class 9 through Class 12. A Class 9 or Class 10 start gives the longest runway to build Campbell Biology depth before the first NSEB attempt. A Class 11 start is realistic and the most common starting point for our Complete Olympiad Year programme. A Class 12 start is possible but tight — typically requires a focused 6-8 month sprint with strong existing NCERT preparation as a base.',
  },
  {
    question: 'Can I start in Class 12?',
    answer:
      'Yes, but it is tight. Class 12 starters have one shot at NSEB (the November exam in their Class 12 year). If they qualify NSEB, the INBO is in January or February of the same academic year, and OCSC follows in May or June. The path is technically intact but the runway is short. Class 12 starters who succeed are usually students with very strong NCERT foundations and self-driven Campbell Biology reading already in progress.',
  },
  {
    question: 'What is the cumulative attrition from NSEB to the India IBO team?',
    answer:
      'Approximately 75,000 students register for NSEB. Of those, roughly the top 300-500 (about 1 percent) qualify for INBO. Of the INBO field, the top approximately 35 qualify for OCSC. Of the OCSC attendees, only 4 are selected for the India IBO team. The cumulative attrition is therefore roughly 1 in 19,000 — that is the funnel that produces each year cohort of India IBO representatives.',
  },
  {
    question: 'Does India IBO team participation help with US college admissions?',
    answer:
      'Yes — it is an exceptionally strong signal. Top US universities (Stanford, Harvard, MIT, Princeton, Yale, Columbia, the rest of the Ivy League, Johns Hopkins, Caltech) and top US biology and biomedical programmes recognise the IBO pathway as one of the strongest demonstrators of pre-undergraduate biology mastery worldwide. An OCSC credential (top 35 nationally) without making the India team is also a strong signal for these institutions.',
  },
  {
    question: 'Does India IBO team participation count for NEET seat reservation?',
    answer:
      'No. NEET and the biology olympiad pathway are separate examination systems with separate eligibility criteria. There is no NEET quota or seat reservation for IBO participants. That said, olympiad-pathway students typically score 340 or higher in NEET Biology (out of 360) because Campbell Biology depth covers the harder NEET questions thoroughly.',
  },
  {
    question: 'What is the difference between IAPT and HBCSE in the olympiad pathway?',
    answer:
      'IAPT (Indian Association of Physics Teachers) conducts Stage 1 of every science olympiad pathway in India, including NSEB. HBCSE (Homi Bhabha Centre for Science Education, Mumbai) conducts Stage 2 (INBO), Stage 3 (OCSC), and the training of the final team that represents India at the international olympiad (IBO). HBCSE is the national resource centre for science and mathematics olympiads in India.',
  },
  {
    question: 'How many medals does India typically win at IBO?',
    answer:
      'Per publicly reported HBCSE annual results, the India IBO team typically returns with 2 to 4 medals annually, spread across the Gold, Silver, and Bronze categories. India has consistently been among the top-performing country teams at IBO. Year-on-year medal counts are published by HBCSE in its annual reports.',
  },
  {
    question: 'Can students from outside India apply to the India IBO team?',
    answer:
      'No. The India IBO team is restricted to Indian citizens or students of Indian origin who meet the IAPT and HBCSE eligibility criteria for the national olympiad pathway. Students from other countries apply to their own national olympiad federations. Cerebrum coaches students preparing for their own country national biology olympiads — see our country-specific pages.',
  },
]

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((faq) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: { '@type': 'Answer', text: faq.answer },
  })),
}

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'India IBO Team Selection — The Complete NSEB to IBO Pathway',
  description:
    'How India selects its International Biology Olympiad team. The 4-stage funnel: NSEB to INBO to OCSC to IBO. Stage-by-stage criteria, attrition, timeline, what separates winners.',
  url: PAGE_URL,
  mainEntityOfPage: PAGE_URL,
  inLanguage: 'en-IN',
  availableLanguage: ['English', 'Hindi'],
  author: {
    '@type': 'Person',
    '@id': 'https://cerebrumbiologyacademy.com/dr-shekhar-singh#nseb',
    name: 'Dr. Shekhar C Singh',
    jobTitle: 'Founder & Lead Olympiad Coach',
    worksFor: {
      '@type': 'EducationalOrganization',
      name: 'Cerebrum Biology Academy',
      url: 'https://cerebrumbiologyacademy.com',
    },
  },
  publisher: {
    '@type': 'EducationalOrganization',
    name: 'Cerebrum Biology Academy',
    url: 'https://cerebrumbiologyacademy.com',
  },
  about: 'India IBO team selection - NSEB to IBO biology olympiad pathway',
}

const courseSchema = olympiadCourseSchema({
  name: 'India Biology Olympiad Full-Funnel Programme',
  description:
    'The Complete Olympiad Year programme covering all four stages of the India IBO pathway: NSEB (Stage 1, IAPT), INBO (Stage 2, HBCSE), OCSC (Stage 3, HBCSE Mumbai), and India IBO team representation.',
  url: PAGE_URL,
  about: 'India IBO team selection - biology olympiad pathway',
  areaServed: { type: 'Country', name: 'India' },
  inLanguage: 'en-IN',
  audienceDescription:
    'Indian students in Class 9 to Class 12 targeting the India biology olympiad pathway',
  teaches: [
    'Campbell Biology depth at NSEB level',
    'INBO passage-style integration',
    'OCSC practical biology techniques',
    'Past-paper analysis across all four stages',
    'IBO-level theory and practical preparation',
    'Research-paper data interpretation',
  ],
})

const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  '@id': 'https://cerebrumbiologyacademy.com/dr-shekhar-singh#nseb',
  name: 'Dr. Shekhar C Singh',
  jobTitle: 'Founder & Lead India Biology Olympiad Coach',
  description:
    'AIIMS Delhi alumnus and founder of Cerebrum Biology Academy. Lead curriculum architect for the full India biology olympiad funnel — NSEB (Stage 1), INBO (Stage 2), OCSC (Stage 3), and India IBO team selection.',
  alumniOf: {
    '@type': 'CollegeOrUniversity',
    name: 'All India Institute of Medical Sciences (AIIMS Delhi)',
  },
  worksFor: {
    '@type': 'EducationalOrganization',
    name: 'Cerebrum Biology Academy',
    url: 'https://cerebrumbiologyacademy.com',
  },
  knowsAbout: [
    'India IBO team selection',
    'India biology olympiad pathway',
    'NSEB to IBO funnel',
    'HBCSE biology olympiad',
    'IAPT NSEB',
    'INBO theory examination',
    'OCSC selection camp',
    'IBO India team preparation',
    'Campbell Biology for Indian olympiad',
    'biology olympiad attrition India',
    'India IBO medal performance',
  ],
  sameAs: [
    'https://cerebrumbiologyacademy.com/dr-shekhar-singh',
    'https://www.youtube.com/@drshekharcsingh',
    'https://www.linkedin.com/in/drshekharsingh',
  ],
}

const whatsappMessage = encodeURIComponent(
  'Hi Cerebrum, I am interested in the India biology olympiad pathway (NSEB to INBO to OCSC to IBO). Please share the Complete Olympiad Year programme details and pricing.'
)

export default function IndiaIBOTeamSelectionGuidePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(courseSchema) }}
      />
      <BreadcrumbSchema
        items={[
          { label: 'Biology Olympiads', href: '/biology-olympiads' },
          { label: 'India IBO Team Selection Guide', isCurrentPage: true },
        ]}
        showSchemaOnly
      />
      <FAQSchema questions={faqs} pageUrl={PAGE_URL} />
      <SpeakableSchema
        headline="India IBO Team Selection — The Complete NSEB to IBO Pathway"
        description="How India selects 4 students for the International Biology Olympiad. The full funnel from NSEB through INBO and OCSC to the India IBO team."
        cssSelectors={['[data-speakable="intro"]', '[data-speakable="key-info"]']}
        url={PAGE_URL}
      />

      <main className="min-h-screen bg-white">
        {/* Hero */}
        <section className="relative overflow-hidden bg-slate-950 text-white">
          <div className="absolute inset-0">
            <div className="absolute -top-24 -left-24 h-[28rem] w-[28rem] rounded-full bg-green-500/10 blur-3xl" />
            <div className="absolute bottom-0 right-0 h-[32rem] w-[32rem] rounded-full bg-blue-500/10 blur-3xl" />
          </div>

          <div className="relative mx-auto max-w-7xl px-6 py-14 md:py-24">
            <div className="max-w-3xl">
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-medium text-slate-200">
                <Target className="h-3.5 w-3.5 text-green-400" />
                Full funnel guide · NSEB to IBO · IAPT and HBCSE pathway
              </div>

              <h1 className="text-4xl font-semibold leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-6xl">
                India IBO Team Selection — the Complete NSEB to IBO Pathway.
              </h1>

              <p
                data-speakable="intro"
                className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-300"
              >
                India sends 4 students each year to the International Biology Olympiad. Those 4 are
                selected through a 4-stage filter — NSEB (~75,000 register) to INBO (~300-500) to
                OCSC (~35) to the India IBO team (4). This is the complete guide to how the funnel
                works, what wins at each stage, and where most students fall off.
              </p>

              <div
                data-speakable="key-info"
                className="mt-10 grid max-w-2xl grid-cols-4 gap-4 border-t border-white/10 pt-8"
              >
                <div>
                  <p className="text-xs uppercase tracking-wider text-slate-400">NSEB</p>
                  <p className="mt-1 text-2xl font-semibold text-white">~75K</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wider text-slate-400">INBO</p>
                  <p className="mt-1 text-2xl font-semibold text-white">~500</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wider text-slate-400">OCSC</p>
                  <p className="mt-1 text-2xl font-semibold text-white">~35</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wider text-slate-400">IBO team</p>
                  <p className="mt-1 text-2xl font-semibold text-white">4</p>
                </div>
              </div>

              <div className="mt-10 flex flex-wrap gap-3">
                <a
                  href={`https://wa.me/918826444334?text=${whatsappMessage}`}
                  className="inline-flex items-center gap-2 rounded-lg bg-green-500 px-5 py-3 text-sm font-semibold text-white hover:bg-green-600"
                >
                  WhatsApp for full programme details
                  <ArrowRight className="h-4 w-4" />
                </a>
                <Link
                  href="/nseb-coaching"
                  className="inline-flex items-center gap-2 rounded-lg border border-white/20 bg-white/5 px-5 py-3 text-sm font-semibold text-white hover:bg-white/10"
                >
                  Start with NSEB Stage 1
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Stages */}
        <section className="border-b border-slate-200 py-14 md:py-20">
          <div className="mx-auto max-w-5xl px-6">
            <h2 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
              The four stages of the India IBO pathway.
            </h2>
            <p className="mt-4 text-lg text-slate-600">
              India follows a 4-stage filter to identify the 4 students who represent the country at
              the International Biology Olympiad each year. Stages 1 through 3 happen on Indian
              soil; Stage 4 is the international finals.
            </p>

            <div className="mt-10 space-y-5">
              {stages.map((s) => (
                <div key={s.name} className="rounded-2xl border border-slate-200 bg-white p-6">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-green-700">
                      {s.label}
                    </span>
                    <h3 className="text-xl font-semibold text-slate-900">{s.name}</h3>
                    <span className="text-xs text-slate-500">
                      {s.window} · {s.organiser}
                    </span>
                  </div>
                  <div className="mt-3 flex flex-wrap gap-3 text-xs text-slate-600">
                    <span className="rounded-full bg-slate-100 px-3 py-1">{s.pool}</span>
                    <span className="rounded-full bg-slate-100 px-3 py-1">{s.qualify}</span>
                  </div>
                  <p className="mt-4 text-sm leading-relaxed text-slate-700">{s.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Attrition */}
        <section className="border-b border-slate-200 bg-slate-50 py-14 md:py-20">
          <div className="mx-auto max-w-4xl px-6">
            <h2 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
              Cumulative attrition — what the numbers mean.
            </h2>
            <div className="mt-6 space-y-4 text-base leading-relaxed text-slate-700">
              <p>
                The funnel narrows aggressively. Roughly 75,000 students register for NSEB, of whom
                approximately 500 qualify for INBO, of whom approximately 35 are invited to OCSC, of
                whom 4 are selected for the India IBO team. That is a cumulative selection rate of
                about 1 in 19,000.
              </p>
              <p>What does this mean stage-by-stage?</p>
              <ul className="list-disc pl-6 space-y-3">
                <li>
                  <strong>NSEB is the broad national pool.</strong> 75,000 registrations is large
                  enough that the cutoff is set by raw national rank — there is no quota, no
                  reservation, and no soft filter. A student in Class 12 in any Indian school can
                  register.
                </li>
                <li>
                  <strong>NSEB to INBO is a 150x compression.</strong> ~75K to ~500 means only the
                  top approximately 0.7 percent of registrants advance. This is where most
                  NCERT-only students fall off — Campbell Biology depth matters here.
                </li>
                <li>
                  <strong>INBO to OCSC is a 14x compression.</strong> ~500 to ~35 — at this level,
                  every remaining student has serious biology depth. The filter is about integration
                  and application, not recall.
                </li>
                <li>
                  <strong>OCSC to IBO team is an 8.75x compression.</strong> 35 to 4 — this is where
                  exceptional biology depth, practical skills, and exam composure are required. The
                  four selected are objectively top-tier biology students for their national cohort.
                </li>
              </ul>
              <p>
                Practical implication: students preparing for this pathway should not over-index on
                NSEB alone. The NSEB filter is large but the INBO and OCSC filters demand
                qualitatively different preparation — passage-style integration at INBO, and lab
                practical skills at OCSC.
              </p>
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section className="border-b border-slate-200 py-14 md:py-20">
          <div className="mx-auto max-w-4xl px-6">
            <h2 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
              Month-by-month timeline.
            </h2>
            <p className="mt-4 text-lg text-slate-600">
              The pathway runs across roughly 12-14 months from Class 11 start to IBO finals. A
              representative annual cycle:
            </p>

            <div className="mt-10 space-y-3">
              {timeline.map((t) => (
                <div
                  key={t.month}
                  className="flex flex-col gap-2 rounded-xl border border-slate-200 bg-white p-4 md:flex-row md:items-center"
                >
                  <div className="flex items-center gap-2 md:w-56">
                    <Calendar className="h-4 w-4 text-green-700" />
                    <span className="text-sm font-semibold text-slate-900">{t.month}</span>
                  </div>
                  <p className="text-sm text-slate-700">{t.event}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* IBO performance */}
        <section className="border-b border-slate-200 bg-slate-50 py-14 md:py-20">
          <div className="mx-auto max-w-4xl px-6">
            <h2 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
              India at the International Biology Olympiad.
            </h2>
            <div className="mt-6 space-y-4 text-base leading-relaxed text-slate-700">
              <p>
                IBO is the global biology olympiad finals, held annually in July. Approximately 80
                country teams of 4 students each compete across a theory examination and an
                extensive practical examination. The practical round covers four major domains —
                biochemistry, plant biology, animal biology, and bioinformatics or ecology — and
                typically carries roughly half the total medal score.
              </p>
              <p>
                Medals at IBO are awarded in Gold, Silver, Bronze, and Honourable Mention tiers
                based on combined scores. Per publicly reported HBCSE annual results, India
                typically returns from IBO with 2 to 4 medals annually distributed across the
                Gold-Silver-Bronze categories. India has consistently been among the top-performing
                country teams at IBO over the past two decades.
              </p>
              <p>
                For students aspiring to the India IBO team, the international finals are the
                culmination of approximately 12-14 months of intensive preparation following INBO
                qualification, plus the 2-3 years of NSEB and INBO foundation work preceding that.
                The students who reach this stage have effectively completed an undergraduate-level
                biology preparation while still in school.
              </p>
            </div>
          </div>
        </section>

        {/* What separates winners */}
        <section className="border-b border-slate-200 py-14 md:py-20">
          <div className="mx-auto max-w-6xl px-6">
            <h2 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
              What separates winners at each stage.
            </h2>
            <p className="mt-4 max-w-3xl text-lg text-slate-600">
              The filter changes shape at each transition. The student profile that gets through
              NSEB is different from the one that makes OCSC top 4. Knowing the shift early lets you
              prepare for it.
            </p>
            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {winners.map((w) => (
                <div key={w.stage} className="rounded-2xl border border-slate-200 bg-white p-6">
                  <p className="text-xs font-semibold uppercase tracking-wider text-green-700">
                    {w.stage}
                  </p>
                  <div className="mt-3 flex h-10 w-10 items-center justify-center rounded-lg bg-green-100">
                    <w.icon className="h-5 w-5 text-green-700" />
                  </div>
                  <h3 className="mt-4 text-base font-semibold text-slate-900">{w.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-slate-600">{w.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Common mistakes */}
        <section className="border-b border-slate-200 bg-slate-50 py-14 md:py-20">
          <div className="mx-auto max-w-5xl px-6">
            <h2 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
              Common mistakes that derail the pathway.
            </h2>
            <p className="mt-4 max-w-3xl text-lg text-slate-600">
              Four recurring patterns we see across years of working with India IBO pathway
              students. Each is fixable with the right preparation strategy.
            </p>
            <div className="mt-10 grid gap-4 md:grid-cols-2">
              {mistakes.map((m) => (
                <div key={m.title} className="rounded-2xl border border-slate-200 bg-white p-6">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-100">
                    <m.icon className="h-5 w-5 text-red-700" />
                  </div>
                  <h3 className="mt-4 text-base font-semibold text-slate-900">{m.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-slate-600">{m.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How Cerebrum coaches the funnel */}
        <section className="border-b border-slate-200 py-14 md:py-20">
          <div className="mx-auto max-w-4xl px-6">
            <h2 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
              How Cerebrum coaches the full funnel.
            </h2>
            <div className="mt-6 space-y-4 text-base leading-relaxed text-slate-700">
              <p>
                Cerebrum is a biology-only specialist programme. The same faculty continues with the
                student across all four stages of the pathway — NSEB, INBO, OCSC, and (for the top
                4) India IBO team preparation. This continuity matters because each stage builds on
                the previous one. The mentor who knows where you struggled in NSEB cellular
                respiration questions is the one best positioned to coach you through the INBO
                passage-style integration of metabolism with cell signalling.
              </p>
              <p>
                Most generalist HBCSE-prep providers either switch faculty between stages or mix
                biology with physics, mathematics, and chemistry olympiad preparation under one
                roof. The result is curriculum dilution and inconsistent mentorship. Cerebrum runs
                biology only — across the full funnel, with senior olympiad tutors and 1:1
                mentorship from former INBO qualifiers.
              </p>
              <p>
                The Complete Olympiad Year programme covers NSEB and INBO with built-in OCSC stream
                upgrades for INBO qualifiers. The 1:1 Elite Mentoring option is most often used in
                the 3-month INBO to OCSC window where the most concentrated, personalised
                preparation pays the highest return. The Small-Batch Weekend programme is the most
                affordable entry point for Class 9 and Class 10 students starting their olympiad
                journey early.
              </p>
              <p>
                Faculty is led by Dr. Shekhar C Singh — AIIMS Delhi alumnus and founder of Cerebrum
                Biology Academy — who architects the curriculum across all four stages. Senior
                olympiad tutors with HBCSE training-camp experience deliver the day-to-day coaching,
                with biology specialists handling theory deep-dives and practical-skills instructors
                handling pre-OCSC lab preparation.
              </p>
            </div>
          </div>
        </section>

        {/* For students who don't make IBO team */}
        <section className="border-b border-slate-200 bg-slate-50 py-14 md:py-20">
          <div className="mx-auto max-w-5xl px-6">
            <h2 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
              What about students who don't make the India IBO team?
            </h2>
            <p className="mt-4 max-w-3xl text-lg text-slate-600">
              Only 4 students per year make the final team. The other roughly 31 OCSC attendees,
              plus the 250-465 INBO qualifiers who do not reach OCSC, still carry meaningful
              credentials from the pathway. Four directions the credential opens up:
            </p>
            <div className="mt-10 grid gap-4 md:grid-cols-2">
              {noTeamBenefits.map((b) => (
                <div key={b.title} className="rounded-2xl border border-slate-200 bg-white p-6">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-100">
                    <CheckCircle2 className="h-5 w-5 text-green-700" />
                  </div>
                  <h3 className="mt-4 text-base font-semibold text-slate-900">{b.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-slate-600">{b.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section id="pricing" className="border-b border-slate-200 py-14 md:py-20">
          <div className="mx-auto max-w-4xl px-6">
            <h2 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
              Full-funnel programme pricing.
            </h2>
            <p className="mt-4 text-lg text-slate-600">
              USD reference pricing. For students based in India, INR equivalents are quoted by the
              admissions team based on the current conversion rate. We do not publish a static INR
              figure because the rate fluctuates.
            </p>

            <div className="mt-10 grid gap-4 md:grid-cols-3">
              <div className="rounded-2xl border border-green-300 bg-white p-6">
                <p className="text-xs font-semibold uppercase tracking-wider text-green-700">
                  Recommended
                </p>
                <h3 className="mt-2 text-xl font-semibold text-slate-900">
                  Complete Olympiad Year
                </h3>
                <p className="mt-2 text-2xl font-bold text-slate-900">$4,500 / year</p>
                <p className="mt-2 text-xs text-slate-500">equivalent in INR for Indian students</p>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">
                  Covers NSEB Stage 1, INBO Stage 2, and OCSC Stage 3 preparation. Same biology
                  specialist mentor through all three stages.
                </p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-white p-6">
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Highest leverage
                </p>
                <h3 className="mt-2 text-xl font-semibold text-slate-900">1:1 Elite Mentoring</h3>
                <p className="mt-2 text-2xl font-bold text-slate-900">$90 / hour</p>
                <p className="mt-2 text-xs text-slate-500">senior olympiad tutor, 1:1</p>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">
                  Best for the 3-month INBO to OCSC pre-camp window, or for late-stage NSEB
                  qualifiers who need rapid INBO preparation.
                </p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-white p-6">
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Entry point
                </p>
                <h3 className="mt-2 text-xl font-semibold text-slate-900">Small-Batch Weekend</h3>
                <p className="mt-2 text-2xl font-bold text-slate-900">$50 / hour</p>
                <p className="mt-2 text-xs text-slate-500">4-6 students, weekends</p>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">
                  Weekend group programme for Class 9 and Class 10 students starting the olympiad
                  journey early alongside regular school.
                </p>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={`https://wa.me/918826444334?text=${whatsappMessage}`}
                className="inline-flex items-center gap-2 rounded-lg bg-green-500 px-5 py-3 text-sm font-semibold text-white hover:bg-green-600"
              >
                WhatsApp for INR pricing and demo booking
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="border-b border-slate-200 bg-slate-50 py-14 md:py-20">
          <div className="mx-auto max-w-3xl px-6">
            <h2 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
              India IBO pathway FAQ.
            </h2>
            <div className="mt-8 space-y-3">
              {faqs.map((faq) => (
                <details
                  key={faq.question}
                  className="group rounded-xl border border-slate-200 bg-white p-5 open:border-green-300"
                >
                  <summary className="flex cursor-pointer list-none items-start justify-between gap-4">
                    <span className="text-sm font-semibold text-slate-900">{faq.question}</span>
                    <span className="mt-0.5 text-slate-400 group-open:rotate-180 transition-transform">
                      &#9662;
                    </span>
                  </summary>
                  <p className="mt-4 text-sm leading-relaxed text-slate-700">{faq.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* Cross-link footer */}
        <section className="bg-slate-950 py-14 md:py-20 text-white">
          <div className="mx-auto max-w-4xl px-6">
            <h2 className="text-2xl font-semibold tracking-tight">
              Explore the India biology olympiad pathway.
            </h2>
            <p className="mt-3 text-base text-slate-300">
              Cerebrum coaches every stage of the funnel with the same biology-only specialist
              faculty.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/nseb-coaching"
                className="inline-flex items-center gap-2 rounded-lg border border-white/20 bg-white/5 px-4 py-2 text-sm font-semibold text-white hover:bg-white/10"
              >
                NSEB Stage 1 coaching
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/inbo-coaching"
                className="inline-flex items-center gap-2 rounded-lg border border-white/20 bg-white/5 px-4 py-2 text-sm font-semibold text-white hover:bg-white/10"
              >
                INBO Stage 2 coaching
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/ibo-preparation"
                className="inline-flex items-center gap-2 rounded-lg border border-white/20 bg-white/5 px-4 py-2 text-sm font-semibold text-white hover:bg-white/10"
              >
                International IBO stage
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
