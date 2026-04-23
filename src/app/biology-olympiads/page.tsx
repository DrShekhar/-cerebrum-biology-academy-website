import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Award, Globe, Trophy, Target } from 'lucide-react'
import { FAQSchema } from '@/components/seo/FAQSchema'
import { BreadcrumbSchema } from '@/components/seo/BreadcrumbSchema'
import { GeoAwareSharedPricingMatrix } from '@/components/shared/GeoAwarePricingMatrix'
import { olympiadPricingProducts } from '@/data/olympiads/pricing-matrix'
import { LeadCaptureForm } from '@/components/landing/LeadCaptureForm'
import { FloatingWhatsAppButton } from '@/components/landing/FloatingWhatsAppButton'

const PAGE_URL = 'https://cerebrumbiologyacademy.com/biology-olympiads'
const CAMPAIGN = 'biology-olympiads'

export const metadata: Metadata = {
  title: 'Biology Olympiads Coaching | IBO, USABO, BBO, INBO, NSEB, SBO, CNBO, KBO | Cerebrum',
  description:
    'Coaching for every major Biology Olympiad: International (IBO), USA (USABO), UK (BBO), India (NSEB + INBO), Singapore (SBO), China (CNBO), Korea (KBO), and more. Campbell Biology coverage, past-paper drills, IBO-medallist mentors.',
  keywords: [
    'biology olympiad coaching',
    'biology olympiad preparation',
    'IBO preparation',
    'USABO coaching',
    'BBO coaching',
    'INBO coaching',
    'NSEB coaching',
    'SBO coaching',
    'CNBO coaching',
    'KBO coaching',
    'international biology olympiad',
    'biology olympiad online coaching',
    'biology olympiad mentor',
    'biology olympiad past papers',
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
    title: 'Biology Olympiads Coaching — IBO, USABO, BBO, INBO, SBO and more',
    description:
      'Olympiad coaching in 10+ countries. IBO-medallist mentors, Campbell Biology coverage, past-paper drills.',
    type: 'website',
    url: PAGE_URL,
    siteName: 'Cerebrum Biology Academy',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Biology Olympiads Coaching — Cerebrum',
    description: 'IBO, USABO, BBO, INBO, SBO, CNBO, KBO, NSEB — coached by medallists.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
}

interface OlympiadEntry {
  id: string
  flag: string
  name: string
  shortName: string
  country: string
  href: string
  note: string
  tier: 'international' | 'country' | 'india'
}

const olympiads: OlympiadEntry[] = [
  {
    id: 'ibo',
    flag: '🌍',
    name: 'International Biology Olympiad',
    shortName: 'IBO',
    country: 'International',
    href: '/ibo-preparation',
    note: 'The global final. 80+ countries compete. Selection via your national olympiad.',
    tier: 'international',
  },
  {
    id: 'usabo',
    flag: '🇺🇸',
    name: 'USA Biology Olympiad',
    shortName: 'USABO',
    country: 'United States',
    href: '/usabo-coaching',
    note: 'Open Exam → Semifinals → National Finals. Top 20 train at the summer camp.',
    tier: 'country',
  },
  {
    id: 'bbo',
    flag: '🇬🇧',
    name: 'British Biology Olympiad',
    shortName: 'BBO',
    country: 'United Kingdom',
    href: '/bbo-preparation',
    note: 'Run by the Royal Society of Biology. Gold/Silver/Bronze awards.',
    tier: 'country',
  },
  {
    id: 'inbo',
    flag: '🇮🇳',
    name: 'Indian National Biology Olympiad',
    shortName: 'INBO',
    country: 'India',
    href: '/inbo-coaching',
    note: 'Stage 2 of the Indian HBCSE route. Top ~30 move to OCSC.',
    tier: 'india',
  },
  {
    id: 'nseb',
    flag: '🇮🇳',
    name: 'National Standard Examination in Biology',
    shortName: 'NSEB',
    country: 'India',
    href: '/nseb-coaching-gurugram',
    note: 'Stage 1 Indian olympiad prelim. Qualifier for INBO.',
    tier: 'india',
  },
  {
    id: 'sbo',
    flag: '🇸🇬',
    name: 'Singapore Biology Olympiad',
    shortName: 'SBO',
    country: 'Singapore',
    href: '/sbo-coaching',
    note: 'Run by NUS. Selects Singapore team for IBO.',
    tier: 'country',
  },
  {
    id: 'cnbo',
    flag: '🇨🇳',
    name: 'Chinese National Biology Olympiad',
    shortName: 'CNBO',
    country: 'China',
    href: '/cnbo-coaching',
    note: 'Highly competitive. Provincial rounds → National.',
    tier: 'country',
  },
  {
    id: 'kbo',
    flag: '🇰🇷',
    name: 'Korean Biology Olympiad',
    shortName: 'KBO',
    country: 'South Korea',
    href: '/kbo-coaching',
    note: 'Run by KBIO. Selects Korean team for IBO.',
    tier: 'country',
  },
  {
    id: 'nzibo',
    flag: '🇳🇿',
    name: 'New Zealand International Biology Olympiad',
    shortName: 'NZIBO',
    country: 'New Zealand',
    href: '/biology-olympiad/new-zealand',
    note: 'August screening + January camp. Selects NZ team for IBO.',
    tier: 'country',
  },
  {
    id: 'irbo',
    flag: '🇮🇪',
    name: 'Irish Biology Olympiad',
    shortName: 'IrBO',
    country: 'Ireland',
    href: '/biology-olympiad/ireland',
    note: 'February paper plus April UCD training weekend.',
    tier: 'country',
  },
  {
    id: 'sabo',
    flag: '🇿🇦',
    name: 'South African Biology Olympiad',
    shortName: 'SABO',
    country: 'South Africa',
    href: '/biology-olympiad/south-africa',
    note: 'SAASTA-run. March-April screening, June camp.',
    tier: 'country',
  },
  {
    id: 'nbo',
    flag: '🇳🇬',
    name: 'Nigerian Biology Olympiad',
    shortName: 'NBO',
    country: 'Nigeria',
    href: '/biology-olympiad/nigeria',
    note: 'STAN + Nigerian Mathematical Centre. March screening.',
    tier: 'country',
  },
  {
    id: 'pbo',
    flag: '🇵🇭',
    name: 'Philippine Biology Olympiad',
    shortName: 'PBO',
    country: 'Philippines',
    href: '/biology-olympiad/philippines',
    note: 'PSBMB + DOST-SEI. November screening, February camp.',
    tier: 'country',
  },
  {
    id: 'mbo',
    flag: '🇲🇾',
    name: 'Malaysian Biology Olympiad',
    shortName: 'MBO',
    country: 'Malaysia',
    href: '/biology-olympiad/malaysia',
    note: 'MoE Malaysia + UKM. April screening, August camp.',
    tier: 'country',
  },
]

const faqs = [
  {
    question: 'Which biology olympiads do you coach for?',
    answer:
      'We coach for the International Biology Olympiad (IBO), USA Biology Olympiad (USABO), British Biology Olympiad (BBO), Indian National Biology Olympiad (INBO) and its prelim NSEB, Singapore Biology Olympiad (SBO), Chinese National Biology Olympiad (CNBO), and Korean Biology Olympiad (KBO). New country olympiads (Australia ABO, Canada CBO, New Zealand NZIBO, Ireland IrBO, South Africa SABO) are added regularly.',
  },
  {
    question: 'What is the right starting point for olympiad preparation?',
    answer:
      'Campbell Biology (11th-12th edition) is the canonical textbook across most olympiads. Our olympiad programmes start with a full Campbell sweep in Year 1 and move to past-paper drills and national-paper practice in the pre-exam phase. If you are an absolute beginner, we recommend the Complete Olympiad Year programme (9-12 months).',
  },
  {
    question: 'Do you have IBO-medallist mentors?',
    answer:
      'Yes. Our senior olympiad coaches include IBO medallists and national team trainers from India, Singapore, UK, and other markets. 1:1 Elite mentoring is delivered by this tier.',
  },
  {
    question: 'How do olympiad selections differ by country?',
    answer:
      'USA uses USABO Open → Semifinals → Finals. UK uses BBO as a single paper awarding medals. India uses a two-stage NSEB → INBO → OCSC camp. Singapore uses SBO. China has provincial → national rounds. Every country olympiad has a national selection that feeds into IBO where 4 students per country compete internationally.',
  },
  {
    question: 'Can you help with past papers and mock exams?',
    answer:
      'Yes. Our Complete Olympiad Year programme includes weekly past-paper drills and monthly mock exams with examiner-style feedback. Past paper coverage includes IBO, USABO, BBO, INBO, SBO archives going back 10+ years.',
  },
  {
    question: 'Do you teach practical and lab skills?',
    answer:
      'Yes. IBO and USABO include a practical round worth up to 50% of the total. Our curriculum covers the 4 standard IBO practical categories (Biochemistry, Plant Anatomy, Animal Anatomy and Physiology, and Bioinformatics/Ecology) with equipment-adjusted lab skills training.',
  },
  {
    question: 'What does olympiad coaching cost?',
    answer:
      'Complete Olympiad Year: $4,500 per year (reference; local currency equivalents shown in the pricing section). 1:1 Elite Mentoring: $90 per hour. Small-Batch Weekend: $50 per hour. Geo-detected pricing on each per-country olympiad page.',
  },
  {
    question: 'I am not sure which olympiad I qualify for. How do I choose?',
    answer:
      'Your national biology olympiad is determined by where you are enrolled in school. Most English-speaking countries also allow applying to open international competitions. Tell us your country and school on the form and we will suggest the exact route (USABO Open, BBO, NSEB, etc.).',
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

const collectionSchema = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: 'Biology Olympiad Coaching Hub',
  description:
    'Central resource for coaching across every major national and international Biology Olympiad. IBO, USABO, BBO, INBO, NSEB, SBO, CNBO, KBO and growing.',
  url: PAGE_URL,
  provider: {
    '@type': 'EducationalOrganization',
    name: 'Cerebrum Biology Academy',
    url: 'https://cerebrumbiologyacademy.com',
  },
  hasPart: olympiads.map((o) => ({
    '@type': 'WebPage',
    url: `https://cerebrumbiologyacademy.com${o.href}`,
    name: `${o.name} (${o.shortName})`,
  })),
}

const regionalLinks = [
  { region: 'India', href: '/inbo-coaching' },
  { region: 'USA', href: '/usabo-coaching' },
  { region: 'UK', href: '/bbo-preparation' },
  { region: 'Singapore', href: '/sbo-coaching' },
  { region: 'China', href: '/cnbo-coaching' },
  { region: 'South Korea', href: '/kbo-coaching' },
  { region: 'International', href: '/ibo-preparation' },
]

export default function BiologyOlympiadsHubPage() {
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
        items={[{ label: 'Biology Olympiads', isCurrentPage: true }]}
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
                  <Trophy className="h-3.5 w-3.5 text-green-400" />
                  IBO · USABO · BBO · INBO · NSEB · SBO · CNBO · KBO
                </div>

                <h1 className="text-4xl font-semibold leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-6xl">
                  Biology Olympiad coaching,
                  <br />
                  <span className="text-green-400">country by country.</span>
                </h1>

                <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate-300">
                  Complete Campbell Biology coverage, past-paper drills, and 1:1 mentoring by IBO
                  medallists. Coaching for 8+ national olympiads plus the IBO itself.
                </p>

                <dl className="mt-10 grid max-w-xl grid-cols-3 gap-6 border-t border-white/10 pt-8">
                  <div>
                    <dt className="text-xs uppercase tracking-wider text-slate-400">Olympiads</dt>
                    <dd className="mt-1 text-2xl font-semibold text-white">{olympiads.length}+</dd>
                  </div>
                  <div>
                    <dt className="text-xs uppercase tracking-wider text-slate-400">
                      IBO medallist mentors
                    </dt>
                    <dd className="mt-1 text-2xl font-semibold text-white">Yes</dd>
                  </div>
                  <div>
                    <dt className="text-xs uppercase tracking-wider text-slate-400">
                      Past papers covered
                    </dt>
                    <dd className="mt-1 text-2xl font-semibold text-white">10+ years</dd>
                  </div>
                </dl>
              </div>

              <div className="order-1 lg:order-2 lg:col-span-2">
                <LeadCaptureForm
                  source="hero"
                  campaign={CAMPAIGN}
                  heading="Book a free olympiad demo"
                  subheading="Tell us your country. We match you to the right olympiad + mentor in 15 minutes."
                  showFaculty
                />
              </div>
            </div>
          </div>
        </section>

        {/* Olympiads grid */}
        <section className="border-b border-slate-200 py-14 md:py-20">
          <div className="mx-auto max-w-6xl px-6">
            <div className="max-w-2xl">
              <h2 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
                Every major biology olympiad.
              </h2>
              <p className="mt-3 text-lg text-slate-600">
                Pick your country olympiad for the exact selection route, past papers, and fee
                structure. Or start with the International Biology Olympiad if you already know
                which team you want to make.
              </p>
            </div>

            <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {olympiads.map((o) => (
                <Link
                  key={o.id}
                  href={o.href}
                  className="group rounded-2xl border border-slate-200 bg-white p-6 transition-all hover:-translate-y-0.5 hover:border-green-300 hover:shadow-md"
                >
                  <div className="mb-3 flex items-center gap-3">
                    <span className="text-3xl" aria-hidden="true">
                      {o.flag}
                    </span>
                    <div>
                      <p className="text-xs font-medium uppercase tracking-wider text-slate-500">
                        {o.country}
                      </p>
                      <h3 className="text-lg font-semibold text-slate-900 group-hover:text-green-700">
                        {o.shortName}
                      </h3>
                    </div>
                  </div>
                  <p className="text-sm font-medium text-slate-700">{o.name}</p>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">{o.note}</p>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-green-700">
                    Coaching page
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Why us */}
        <section className="border-b border-slate-200 bg-slate-50 py-14 md:py-20">
          <div className="mx-auto max-w-6xl px-6">
            <h2 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
              Why students pick Cerebrum for olympiad prep.
            </h2>

            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {[
                {
                  icon: Award,
                  title: 'IBO medallist mentors',
                  body: 'Your 1:1 coach has stood on the IBO podium or trained a national team. The feedback is exam-paper specific, not theoretical.',
                },
                {
                  icon: Globe,
                  title: 'All major olympiads, one curriculum',
                  body: 'USABO, BBO, INBO, SBO share ~80% of the Campbell core. One programme prepares you for your national olympiad and IBO.',
                },
                {
                  icon: Target,
                  title: 'Past papers, weekly',
                  body: '10+ years of national paper drills, full timed mocks, and examiner-style feedback on every submission.',
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

        {/* Pricing — geo-aware */}
        <GeoAwareSharedPricingMatrix
          products={olympiadPricingProducts}
          heading="Olympiad pricing — pick your fit"
          subheading="All prices in USD. Local currency equivalents shown; currency auto-detected from your country where possible."
          regionalLinks={regionalLinks}
          equivalents={['USD', 'INR', 'GBP', 'SGD', 'EUR', 'AED']}
        />

        {/* FAQs */}
        <section className="border-b border-slate-200 py-14 md:py-20">
          <div className="mx-auto max-w-3xl px-6">
            <h2 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
              Frequently asked.
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
                      ▾
                    </span>
                  </summary>
                  <p className="mt-4 text-sm leading-relaxed text-slate-700">{faq.answer}</p>
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
                  Start with a free demo.
                </h2>
                <p className="mt-4 text-base leading-relaxed text-slate-300">
                  No commitment. We match you to the right olympiad track and mentor in 15 minutes
                  during working hours.
                </p>
              </div>
              <div className="lg:col-span-3">
                <LeadCaptureForm
                  source="final-cta"
                  campaign={CAMPAIGN}
                  heading="Book your olympiad demo"
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
          message="Hi Cerebrum, I saw your Biology Olympiads page and would like olympiad coaching. Please share details and country options."
          campaign={CAMPAIGN}
          tooltip="Not sure which olympiad? Chat with us"
        />
      </main>
    </>
  )
}
