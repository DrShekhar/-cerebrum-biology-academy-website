/**
 * /neet-foundation-class-9-chennai
 *
 * NEET Foundation Class 9 city page — Chennai. Pan-India online live.
 */

import type { Metadata } from 'next'
import Link from 'next/link'
import { StickyMobileCTABar } from '@/components/seo/StickyMobileCTABar'

const PAGE_URL = 'https://cerebrumbiologyacademy.com/neet-foundation-class-9-chennai'

export const metadata: Metadata = {
  title: 'NEET Foundation Class 9 in Chennai | AIIMS-Trained Online Live',
  description:
    'NEET Foundation Class 9 in Chennai at Cerebrum Biology Academy — pan-India online live with AIIMS-trained faculty. CBSE / ICSE / Tamil Nadu Samacheer Kalvi + NEET parallel. T. Nagar, Adyar, Anna Nagar, Velachery, OMR catchments. ₹35K-90K/year.',
  keywords: [
    'neet foundation class 9 chennai',
    'class 9 neet preparation chennai',
    'class 9 biology coaching chennai',
    'class 9 samacheer kalvi neet',
    'class 9 cbse biology chennai',
    'class 9 neet t nagar',
    'class 9 neet adyar',
    'class 9 neet anna nagar',
    'class 9 neet velachery',
    'class 9 neet omr',
    'best class 9 foundation chennai',
  ],
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: 'NEET Foundation Class 9 in Chennai | Cerebrum Biology Academy',
    description:
      'Class 9 NEET Foundation Chennai — pan-India online live, AIIMS-trained, 15-20 student batches.',
    url: PAGE_URL,
    locale: 'en_IN',
    type: 'website',
  },
}

const faqs = [
  {
    question: 'How is NEET Foundation Class 9 delivered in Chennai?',
    answer:
      'Cerebrum Class 9 NEET Foundation in Chennai is delivered via pan-India online live (not recorded) sessions with the same AIIMS-trained biology faculty teaching Delhi NCR offline batches. Sessions are 2 hours twice weekly in IST-aligned slots (Saturday 10 AM, Sunday 10 AM, weekday 6 PM IST option). ~210+ Chennai students across Class 9-12 are actively enrolled across T. Nagar, Adyar, Anna Nagar, Velachery, OMR (IT corridor), ECR, Nungambakkam, Mylapore, Mogappair, Porur catchments.',
  },
  {
    question: 'Does Cerebrum support Tamil Nadu Samacheer Kalvi Class 9 alongside NEET?',
    answer:
      "Yes. Cerebrum's Class 9 Foundation curriculum is mapped against CBSE, ICSE, AND Tamil Nadu Samacheer Kalvi (Equitable Education) reference frames with separate practice tests for each. Tamil Nadu State Board Class 9 Biology covers Cell — The Basic Unit of Life, Plant World, Animal World, Plant Physiology, Reaching the Age of Adolescence, Microorganisms. Cerebrum runs parallel pedagogy for state-board syllabus depth and NEET-pattern MCQ drilling. Sessions are conducted in English; English/Tamil bilingual doubt support available via WhatsApp.",
  },
  {
    question: 'Which Chennai schools are common Cerebrum Foundation feeders?',
    answer:
      "Common Chennai feeder schools across Class 9-10 Foundation cohorts: Padma Seshadri Bala Bhavan (PSBB) Nungambakkam/KK Nagar/T. Nagar, DAV Boys/Girls Schools, Velammal Vidyalaya (CBSE branches across Chennai), Vidya Mandir Mylapore, Sishya School, Chettinad Vidyashram, Sankara Senior Secondary, Bala Vidya Mandir, MGR Janaki College Senior Secondary, KFI (Krishnamurti Foundation India) — The School, Lady Andal Venkatasubba Rao Matriculation, Bhavan's Rajaji Vidyashram, The Hindu Senior Secondary. International curriculum feeders: AISC (American International School Chennai), British International School Chennai. Tamil Nadu State Board feeders span the wider Greater Chennai education ecosystem.",
  },
  {
    question:
      'How does Cerebrum compare to Velammal, Aakash Chennai, or local NEET coaching for Class 9?',
    answer:
      'Chennai has uniquely strong local NEET infrastructure — Velammal Group runs integrated school + NEET coaching from Class 9 onwards (claims 2,800+ NEET selections annually). Aakash Chennai operates ~5 centres with 200-300 student PCB Foundation batches. P. Obul Reddy Hall, T.I.M.E., Career Point Chennai are smaller local players. Cerebrum is biology-only with 15-20 student online live batches and AIIMS-trained faculty — structurally different positioning. Many Chennai families pair Velammal/Aakash for PC with Cerebrum biology specifically for AIIMS/JIPMER-target depth. Note: Tamil Nadu has its own state government medical college quota system (TNMSC) which weights Tamil Nadu Class 12 board marks alongside NEET — making Tamil Nadu board parallel pedagogy uniquely important.',
  },
  {
    question: 'What does Class 9 NEET Foundation cost in Chennai?',
    answer:
      'Cerebrum Class 9 Foundation pricing (pan-India online, applies to Chennai): Pursuit ₹35K-50K, Ascent ₹55K-70K (with weekly 1:1 doubt slots), Pinnacle ₹75K-90K (direct Dr. Shekhar micro-batch 10-12). Ad-hoc 1:1 hourly ₹2,000-3,500. Compared to Velammal integrated NEET coaching (~₹1.2L-1.5L/year combined PCB) and Aakash Scholastics Chennai (~₹85K-1L/year, 200-student batch), Cerebrum biology-only Ascent at ₹65K offers materially deeper biology pedagogy and 15-20 student structure.',
  },
]

const courseSchema = {
  '@context': 'https://schema.org',
  '@type': 'Course',
  name: 'NEET Foundation Class 9 Biology in Chennai',
  description:
    'Class 9 NEET Foundation biology coaching for Chennai students — pan-India online live with AIIMS-trained faculty. CBSE / ICSE / Tamil Nadu Samacheer Kalvi + NEET parallel pedagogy.',
  url: PAGE_URL,
  inLanguage: 'en-IN',
  educationalLevel: 'Class 9 Pre-NEET Foundation',
  provider: {
    '@type': 'EducationalOrganization',
    '@id': 'https://cerebrumbiologyacademy.com/#organization',
    name: 'Cerebrum Biology Academy',
    url: 'https://cerebrumbiologyacademy.com',
  },
  areaServed: {
    '@type': 'City',
    name: 'Chennai',
    address: { '@type': 'PostalAddress', addressLocality: 'Chennai', addressCountry: 'IN' },
  },
  hasCourseInstance: {
    '@type': 'CourseInstance',
    courseMode: 'Online',
    courseWorkload: 'PT4H',
    location: { '@type': 'VirtualLocation', url: PAGE_URL },
    offers: [
      {
        '@type': 'Offer',
        name: 'Foundation Pursuit Class 9',
        price: '35000',
        priceCurrency: 'INR',
        availability: 'https://schema.org/InStock',
        url: PAGE_URL,
      },
      {
        '@type': 'Offer',
        name: 'Foundation Ascent Class 9',
        price: '55000',
        priceCurrency: 'INR',
        availability: 'https://schema.org/InStock',
        url: PAGE_URL,
      },
      {
        '@type': 'Offer',
        name: 'Foundation Pinnacle Class 9',
        price: '75000',
        priceCurrency: 'INR',
        availability: 'https://schema.org/InStock',
        url: PAGE_URL,
      },
    ],
  },
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

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://cerebrumbiologyacademy.com' },
    {
      '@type': 'ListItem',
      position: 2,
      name: 'NEET Foundation',
      item: 'https://cerebrumbiologyacademy.com/best-neet-foundation-tutor',
    },
    {
      '@type': 'ListItem',
      position: 3,
      name: 'Class 9 Foundation',
      item: 'https://cerebrumbiologyacademy.com/best-neet-foundation-class-9',
    },
    { '@type': 'ListItem', position: 4, name: 'Chennai', item: PAGE_URL },
  ],
}

const wa =
  'https://wa.me/918826444334?text=' +
  encodeURIComponent(
    'Hi — my child is in Class 9 in Chennai and we want to start NEET Foundation at Cerebrum. Please share online live class details, pricing, and demo timings.'
  )

export default function NEETFoundationClass9ChennaiPage() {
  return (
    <main className="min-h-screen bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(courseSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <section className="bg-gradient-to-br from-slate-900 to-slate-800 py-16">
        <div className="max-w-5xl mx-auto px-4">
          <nav className="text-sm text-slate-400 mb-6" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-white">
              Home
            </Link>
            <span className="mx-2">/</span>
            <Link href="/best-neet-foundation-tutor" className="hover:text-white">
              NEET Foundation
            </Link>
            <span className="mx-2">/</span>
            <Link href="/best-neet-foundation-class-9" className="hover:text-white">
              Class 9
            </Link>
            <span className="mx-2">/</span>
            <span className="text-white">Chennai</span>
          </nav>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            NEET Foundation Class 9 in Chennai
          </h1>
          <p className="text-xl text-slate-300 mb-6 max-w-3xl">
            Class 9 NEET Foundation Biology for Chennai students — pan-India online live (not
            recorded) with AIIMS-trained biology faculty, batches of 15-20, CBSE / ICSE / Tamil Nadu
            Samacheer Kalvi + NEET-pattern parallel pedagogy. Serving T. Nagar, Adyar, Anna Nagar,
            Velachery, OMR (IT corridor), ECR, Nungambakkam, Mylapore catchments. ₹35K-₹90K/year.
          </p>
          <a
            href={wa}
            className="inline-flex bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-xl font-semibold"
            target="_blank"
            rel="noopener noreferrer"
          >
            WhatsApp +91 88264-44334
          </a>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 prose prose-slate max-w-none">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">
            Chennai Class 9 NEET Foundation — what we deliver
          </h2>
          <p>
            Chennai has uniquely strong local NEET infrastructure — Velammal Group runs integrated
            school-plus-NEET coaching from Class 9 onwards, claiming 2,800+ NEET selections
            annually. Aakash Chennai operates ~5 centres. Local players P. Obul Reddy Hall, T.I.M.E.
            (NEET division), Career Point Chennai round out the market. Cerebrum&apos;s positioning
            in Chennai is biology-only specialist with 15-20 student online live batches led by
            AIIMS-trained faculty — structurally different from local mass-batch coaching. The
            Chennai differentiator: Tamil Nadu&apos;s state government medical college quota system
            (TNMSC) weights Tamil Nadu Class 12 board marks alongside NEET, making state board
            parallel pedagogy uniquely important here.
          </p>

          <h2 className="text-3xl font-bold text-slate-900 mt-12 mb-4">
            Chennai feeder schools and board coverage
          </h2>
          <p>
            CBSE feeders: PSBB Nungambakkam / KK Nagar / T. Nagar, DAV Boys / Girls (multiple
            campuses), Velammal Vidyalaya CBSE branches, Vidya Mandir Mylapore, Sishya School,
            Chettinad Vidyashram, Sankara Senior Secondary, Bhavan&apos;s Rajaji Vidyashram, The
            Hindu Senior Secondary. ICSE feeders: Don Bosco Egmore, Lady Andal Venkatasubba Rao, St.
            Bede&apos;s Anglo-Indian. International curriculum feeders: AISC (American International
            School Chennai), British International School Chennai, KC High International. Tamil Nadu
            State Board (Samacheer Kalvi) feeders span the broader Greater Chennai school catchment.
          </p>

          <h2 className="text-3xl font-bold text-slate-900 mt-12 mb-4">
            Class 9 Foundation pricing (Chennai pan-India online)
          </h2>
          <ul>
            <li>
              <strong>Pursuit (Small-Batch 30-40) — ₹35,000-50,000/year.</strong>
            </li>
            <li>
              <strong>Ascent (Pro Batch 16-25) — ₹55,000-70,000/year.</strong> Most popular Chennai
              tier with weekly 1:1 doubt slots.
            </li>
            <li>
              <strong>Pinnacle (Direct Dr. Shekhar 10-12) — ₹75,000-90,000/year.</strong>
            </li>
            <li>
              <strong>Ad-hoc 1:1 — ₹2,000-3,500/hour.</strong>
            </li>
          </ul>

          <h2 className="text-3xl font-bold text-slate-900 mt-12 mb-4">Related Chennai pages</h2>
          <ul>
            <li>
              <Link href="/best-neet-foundation-class-9" className="text-blue-600 hover:underline">
                Class 9 Foundation (national AEO hub)
              </Link>
            </li>
            <li>
              <Link
                href="/neet-foundation-class-10-chennai"
                className="text-blue-600 hover:underline"
              >
                Class 10 Foundation in Chennai
              </Link>
            </li>
          </ul>
        </div>
      </section>

      <section className="py-16 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-slate-900 mb-8">
            FAQs from Chennai Class 9 Foundation families
          </h2>
          <div className="space-y-6">
            {faqs.map((f, i) => (
              <details key={i} className="bg-white rounded-xl p-6 border border-slate-200">
                <summary className="text-lg font-semibold text-slate-900 cursor-pointer">
                  {f.question}
                </summary>
                <p className="mt-4 text-slate-700 leading-relaxed faq-answer">{f.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-br from-blue-600 to-purple-600">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Book a free Class 9 demo from Chennai
          </h2>
          <a
            href={wa}
            className="inline-flex bg-white text-blue-700 px-8 py-4 rounded-xl font-semibold text-lg"
            target="_blank"
            rel="noopener noreferrer"
          >
            WhatsApp +91 88264-44334
          </a>
        </div>
      </section>
      <StickyMobileCTABar waUrl={wa} />
    </main>
  )
}
