/**
 * /ibo-coaching-china
 *
 * China-specific IBO (International Biology Olympiad) coaching page.
 *
 * China dominates IBO — typically 4 gold medals annually, team #1 worldwide
 * in 2025. The selection funnel runs CNBO Provincial → CNBO National Theory →
 * CNBO National Finals → IBO China team (4 students/year). This page targets
 * the apex layer above CNBO for ambitious students at international schools
 * (SAS, SHSID, WAB, ISB) and tier-2-city public-school families locked out
 * of flagship 奥赛班.
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
  Globe,
} from 'lucide-react'

export const dynamic = 'force-dynamic'

const CANONICAL = 'https://cerebrumbiologyacademy.com/ibo-coaching-china'

export const metadata: Metadata = {
  title: 'IBO Coaching China | International Biology Olympiad Team China Prep | Cerebrum',
  description:
    'Specialist IBO coaching for Chinese students targeting the IBO China national team. CNBO → IBO funnel preparation, English-medium, Campbell + Lehninger + research-paper depth. AIIMS-trained faculty.',
  keywords: [
    'IBO coaching China',
    'IBO China team coaching',
    'International Biology Olympiad China',
    'CNBO to IBO funnel',
    'IBO national team selection China',
    'biology olympiad China IBO',
    'CNBO finalist coaching',
    'IBO China gold medal coaching',
    'IBO theory practical China',
    'best IBO coach for Chinese students',
    'biology olympiad team China',
    'IBO prep international school China',
  ],
  alternates: {
    canonical: CANONICAL,
    languages: { 'en-CN': CANONICAL, en: CANONICAL, 'x-default': CANONICAL },
  },
  openGraph: {
    title: 'IBO Coaching China | National Team Selection Prep | Cerebrum',
    description:
      'Specialist IBO coaching for Chinese students. CNBO → IBO funnel. AIIMS-trained faculty, Campbell + Lehninger + research-paper depth.',
    url: CANONICAL,
    siteName: 'Cerebrum Biology Academy',
    type: 'website',
    locale: 'en_CN',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'IBO Coaching China',
    description: 'Specialist IBO coaching for Chinese students targeting national team.',
  },
  robots: { index: true, follow: true },
}

const iboPathway = [
  {
    stage: 'Stage 1',
    name: 'CNBO Provincial',
    description: 'Provincial Biology Olympiad qualifying round',
    date: 'April–May',
    icon: Target,
  },
  {
    stage: 'Stage 2',
    name: 'CNBO National Theory',
    description: 'National-level written theory examination',
    date: 'August',
    icon: BookOpen,
  },
  {
    stage: 'Stage 3',
    name: 'CNBO National Finals (Camp)',
    description: 'Top ~30 candidates — theory + practical at camp, IBO team selection',
    date: 'August',
    icon: Award,
  },
  {
    stage: 'Stage 4',
    name: 'IBO',
    description: 'International Biology Olympiad — top 4 represent China',
    date: 'July',
    icon: Globe,
  },
]

const iboTopics = [
  {
    category: 'Theory (≥50% of IBO marks)',
    topics: [
      'Cell biology (membrane biophysics, signalling, cytoskeleton)',
      'Molecular biology + biochemistry (Lehninger-level depth)',
      'Plant physiology (transport, photosynthesis, hormones)',
      'Animal physiology (neural, endocrine, cardiovascular, renal)',
      'Ethology + animal behaviour',
      'Genetics + evolution (population genetics, phylogenetics)',
      'Ecology + biosystematics',
      'Biotechnology + bioinformatics',
    ],
  },
  {
    category: 'Practical (≥50% of IBO marks)',
    topics: [
      'Cell biology microscopy + staining',
      'Biochemistry techniques (electrophoresis, chromatography, enzyme assays)',
      'Plant anatomy + physiology experiments',
      'Animal anatomy + dissection (invertebrate + vertebrate)',
      'Bioinformatics + computational biology',
      'Field ecology + biostatistics',
    ],
  },
]

const faqs = [
  {
    question: 'How does the CNBO → IBO China team selection actually work?',
    answer:
      'The pathway runs through four stages: (1) CNBO Provincial Round in April–May at provincial science associations — top scorers qualify for the national level; (2) CNBO National Theory Exam in August — written paper covering university-level cell, molecular, physiology, ecology, biotechnology, bioinformatics; (3) CNBO National Finals at a residential summer camp in August — top ~30 candidates compete on both theory and practical; (4) Final IBO team selection — top 4 represent China at IBO the following July. China typically wins 4 gold medals each year (sometimes 3 gold + 1 silver), placing #1 or #2 worldwide.',
  },
  {
    question:
      'Top flagship schools (人大附中, 上海中学, 杭州二中, 成都七中) have their own 奥赛班 — when does Cerebrum add value?',
    answer:
      "Renmin University High School (人大附中), Shanghai Middle School (上海中学), Hangzhou No.2 (杭州二中), Chengdu No.7 (成都七中), and a handful of other elite flagship schools run extraordinarily strong internal 奥赛班 (Olympiad classes). If your child is in one of these, the school programme is excellent and Cerebrum is unlikely to add much. Cerebrum's wedge is for: (1) tier-2 city public-school students (Wuxi, Hefei, Zhengzhou, Xi'an, Nanchang, Kunming, Fuzhou, etc.) without access to flagship 奥赛班, (2) international-school students at SAS Shanghai, SHSID, WAB Beijing, ISB, Dulwich Shanghai/Beijing, Concordia who want CNBO + IBO-level depth in English-medium alongside their primary curriculum (IB / AP / A-Level), and (3) Chinese-passport students at private bilingual schools who want a parallel CNBO track outside the local public-school olympiad pipeline.",
  },
  {
    question: 'What is the realistic chance of making the 4-person IBO China team?',
    answer:
      'Brutally honest: very low. CNBO Provincial draws 40,000+ entrants annually. The 4-person IBO China team is selected from the top ~30 CNBO National Finals candidates. That is roughly a 1-in-10,000 selection rate. However, intermediate goals are realistic for serious students: CNBO Provincial Gold/Silver (top 5% per province) is achievable with 6–12 months of structured preparation; CNBO National Theory qualification (top ~200 nationally) is achievable for students at strong-curriculum schools with consistent olympiad-level training. Both are highly valued by top Chinese universities (THU, PKU, Fudan, ZJU) and overseas universities (Ivy League, Oxbridge, UC system) as olympiad credentials.',
  },
  {
    question:
      'My child is at an international school (SAS Shanghai, SHSID, WAB) — can they realistically compete in CNBO/IBO at all?',
    answer:
      'Yes, but it requires Chinese-language fluency for the CNBO papers — CNBO Provincial and National Theory exams are administered in Mandarin Chinese. International-school students with Chinese-passport heritage and home-language Mandarin proficiency typically have no issue. Western-passport expat students at SAS, SHSID, WAB without fluent Mandarin face a barrier at the CNBO level (papers are not translated to English). For these students, the better olympiad pathway is USABO (if doing AP) or IBO via direct school-nominated participation through international-school olympiad networks — both English-medium. Cerebrum coaches both pathways and helps families assess which fit makes sense given language background, school curriculum, and university target.',
  },
  {
    question:
      'How does Cerebrum compare to Chinese-language CNBO coaching agencies (Hanlin 翰林, 渊学通) at the IBO funnel level?',
    answer:
      'Local Chinese-language agencies (Hanlin 翰林国际教育, 渊学通, 国际教育优选) coach in Mandarin and excel at CNBO past-paper drills + Chinese curriculum alignment. They are well-suited to Chinese-passport students at local public schools running the full CNBO Provincial → National path in Mandarin. Cerebrum is structurally different at the IBO funnel level: (1) English-medium coaching aligned with international-school AP / IB curricula, (2) AIIMS-trained biology specialist faculty (Dr. Shekhar C Singh) with documented IBO national-team prep experience across India, USA, UK, Canada, Singapore — bringing cross-country IBO theory + practical pedagogy, (3) Campbell + Lehninger + research-paper depth that maps directly to IBO Theory rounds, (4) practical lab technique walkthroughs (microscopy, biochemistry, anatomy) for the IBO Practical component. Best fit: international-school or bilingual-school students for whom English-medium is preferred. Local public-school CNBO-only candidates are usually better served by Chinese-language agencies.',
  },
  {
    question: 'What does Cerebrum IBO coaching cost in China?',
    answer:
      'Cerebrum IBO coaching for Chinese students is priced USD 1,499–2,999 for the full IBO funnel cycle (12 months covering CNBO Provincial through IBO selection). Very small batches (6–8 olympiad-track students), live online classes in CST evening slots, research-paper modules, practical coaching, direct WhatsApp faculty access. Payment via cross-border Alipay / WeChat Pay (Stripe-routed, USD 5,000 single-payment / USD 50,000 annual cap per 2025 PBOC rules) or USD on international Visa / Mastercard / Amex.',
  },
  {
    question:
      'Does Cerebrum coach the IBO Practical component (microscopy, biochemistry, anatomy)?',
    answer:
      'Yes. The IBO Practical component is ≥50% of total IBO marks and is often the deciding factor in gold-medal-vs-silver-medal outcomes. Cerebrum covers: (1) Cell biology microscopy with sample preparation, staining, and identification protocols; (2) Biochemistry techniques — electrophoresis, chromatography, enzyme assays, spectrophotometry; (3) Plant anatomy + physiology experiments — Sachs experiment, transpiration, photosynthesis measurements; (4) Animal anatomy + dissection — invertebrate (cockroach, earthworm, frog) and vertebrate basics; (5) Bioinformatics + computational biology problems (sequence analysis, phylogenetics); (6) Field ecology + biostatistics. We use virtual lab simulations where physical lab access is limited, plus video walkthroughs of each technique.',
  },
  {
    question: 'When should a Chinese student start IBO funnel preparation to be realistic?',
    answer:
      "For a serious shot at CNBO Provincial Gold (the first credible milestone), start at Year 10 / Form 4 / 高一 with 4–6 hours/week of structured olympiad-extension coaching. For CNBO National Theory qualification (top ~200), add another year at the same intensity, beginning by 高一 spring. For realistic IBO China team contention, students typically need to start by 高一 and sustain 8–10 hours/week through 高二 and into 高三. Late starters (高二 spring or later) can still target CNBO Provincial but realistic IBO team selection becomes very difficult. We assess each student's starting baseline + university target in the first consultation and set honest milestone expectations.",
  },
]

const courseSchema = {
  '@context': 'https://schema.org',
  '@type': 'Course',
  name: 'IBO Coaching Programme — China',
  description:
    'International Biology Olympiad (IBO) preparation for Chinese students. CNBO Provincial → National Theory → National Finals → IBO China team funnel. AIIMS-trained faculty, English-medium, Campbell + Lehninger + research-paper depth, IBO Practical lab coverage.',
  provider: {
    '@type': 'EducationalOrganization',
    name: 'Cerebrum Biology Academy',
    url: 'https://cerebrumbiologyacademy.com',
  },
  courseCode: 'IBO-CN',
  educationalLevel: 'Senior Secondary (高一 / 高二 / 高三)',
  teaches: 'CNBO Provincial + National Theory + National Finals + IBO Theory + IBO Practical',
  inLanguage: 'en-CN',
  availableLanguage: ['English'],
  audience: {
    '@type': 'EducationalAudience',
    audienceType: 'Chinese senior secondary olympiad-track students',
    geographicArea: { '@type': 'Country', name: 'China' },
  },
  offers: {
    '@type': 'Offer',
    priceCurrency: 'USD',
    price: '1499',
    priceSpecification: {
      '@type': 'UnitPriceSpecification',
      priceCurrency: 'USD',
      price: 1499,
      unitText: 'ANN',
      minPrice: 1499,
      maxPrice: 2999,
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

export default async function IBOCoachingChinaPage() {
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
          { label: 'IBO Coaching China', isCurrentPage: true },
        ]}
        showSchemaOnly
      />

      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        <section className="bg-gradient-to-r from-blue-700 to-indigo-800 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <div className="inline-flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full text-sm mb-6">
                <Trophy className="w-4 h-4" />
                China = IBO #1 worldwide · 4 gold medals annually
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                IBO Coaching China — CNBO → IBO Team Funnel
              </h1>
              <p className="text-lg md:text-xl text-blue-100 max-w-3xl mx-auto mb-6">
                Specialist English-medium IBO coaching for Chinese students at international schools
                (SAS Shanghai, SHSID, WAB Beijing, ISB, Dulwich), bilingual schools, and tier-2-city
                public-school families locked out of flagship 奥赛班. Full pathway preparation from
                CNBO Provincial through IBO China team selection.
              </p>
              <div className="flex flex-wrap justify-center gap-4 text-sm">
                <span className="bg-white/20 px-4 py-2 rounded-full flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4" />
                  USD 1,499–2,999 / year
                </span>
                <span className="bg-white/20 px-4 py-2 rounded-full flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  CNBO + IBO 12-month cycle
                </span>
                <span className="bg-white/20 px-4 py-2 rounded-full flex items-center gap-2">
                  <Award className="w-4 h-4" />
                  Theory + Practical coverage
                </span>
              </div>
            </div>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <section className="mb-12 bg-amber-50 border-l-4 border-amber-500 rounded-r-xl p-6">
            <h2 className="text-xl font-bold text-amber-900 mb-3">The Short Answer</h2>
            <p className="text-amber-950 leading-relaxed">
              <strong>China dominates the International Biology Olympiad (IBO)</strong> — typically
              4 gold medals annually, ranked #1 worldwide in 2025. The selection funnel runs CNBO
              Provincial → CNBO National Theory → CNBO National Finals → IBO China team. Cerebrum
              offers <strong>English-medium IBO coaching</strong> covering the full CNBO → IBO
              pathway including IBO Theory (cell, molecular, plant + animal physiology, genetics,
              ecology) and IBO Practical (microscopy, biochemistry techniques, anatomy dissection).
              Best fit for international-school + bilingual-school students; local public-school
              students wanting Mandarin-medium coaching are better served by Chinese-language
              agencies. USD 1,499–2,999/year, live online CST evening sessions, very small batches
              (6–8 students).
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Target className="w-6 h-6 text-blue-600" />
              CNBO → IBO China Team Selection Pathway
            </h2>
            <div className="grid md:grid-cols-4 gap-4">
              {iboPathway.map((stage) => (
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
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <BookOpen className="w-6 h-6 text-blue-600" />
              IBO Theory + Practical Coverage
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {iboTopics.map((block) => (
                <div
                  key={block.category}
                  className="bg-white p-6 rounded-xl border border-gray-200"
                >
                  <h3 className="font-bold text-gray-900 mb-3">{block.category}</h3>
                  <ul className="space-y-2">
                    {block.topics.map((topic) => (
                      <li key={topic} className="text-sm text-gray-600 flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                        {topic}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          <section className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 mb-12 text-white">
            <div className="max-w-3xl mx-auto text-center">
              <Award className="w-12 h-12 mx-auto mb-4 text-amber-300" />
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                Book a Free IBO Funnel Assessment
              </h2>
              <p className="text-blue-100 mb-6">
                60-minute live consultation. We assess your child\'s current baseline (CNBO past
                paper diagnostic + Campbell Biology familiarity), university target (Tsinghua /
                Peking / Ivy League / Oxbridge), and language preference (Mandarin-medium vs
                English-medium pathway). Honest milestone-setting — no false promises.
              </p>
              <div className="flex flex-col md:flex-row gap-4 justify-center">
                <a
                  href="https://wa.me/918826444334?text=Hi%20Cerebrum%2C%20I%27m%20a%20Chinese%20student%2Fparent%20interested%20in%20IBO%20coaching%20and%20would%20like%20to%20book%20a%20free%20assessment."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-green-500 hover:bg-green-400 text-white font-semibold px-8 py-4 rounded-xl transition-colors"
                >
                  <MessageCircle className="w-5 h-5" />
                  WhatsApp for Assessment
                </a>
                <Link
                  href="/cnbo-coaching"
                  className="inline-flex items-center justify-center gap-2 bg-white text-blue-600 hover:bg-blue-50 font-semibold px-8 py-4 rounded-xl transition-colors"
                >
                  CNBO Provincial Track →
                </Link>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <BookOpen className="w-6 h-6 text-blue-600" />
              Frequently Asked Questions — IBO China
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
            <h2 className="text-xl font-bold text-gray-900 mb-4">Related China Pages</h2>
            <div className="flex flex-wrap gap-3">
              {[
                { label: 'CNBO Coaching (Provincial + National)', href: '/cnbo-coaching' },
                { label: 'IB Biology Shanghai', href: '/ib-biology/shanghai' },
                { label: 'IB Biology Beijing', href: '/ib-biology/beijing' },
                { label: 'AP Biology Shanghai', href: '/ap-biology-tutor-shanghai' },
                { label: 'Top IBO Coaching Global', href: '/top-ibo-coaching' },
                { label: 'HKBO Coaching (Hong Kong)', href: '/hkbo-coaching' },
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
