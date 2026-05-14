/**
 * /neet-foundation-class-9-hyderabad
 *
 * NEET Foundation Class 9 city page — Hyderabad. Pan-India online live.
 */

import type { Metadata } from 'next'
import Link from 'next/link'

const PAGE_URL = 'https://cerebrumbiologyacademy.com/neet-foundation-class-9-hyderabad'

export const metadata: Metadata = {
  title: 'NEET Foundation Class 9 in Hyderabad | AIIMS-Trained Online Live',
  description:
    'NEET Foundation Class 9 in Hyderabad at Cerebrum Biology Academy — pan-India online live with AIIMS-trained faculty. CBSE / ICSE / Telangana Board + NEET parallel. Ameerpet, Kukatpally, HITEC City, Banjara Hills, Jubilee Hills catchments. ₹35K-90K/year.',
  keywords: [
    'neet foundation class 9 hyderabad',
    'class 9 neet preparation hyderabad',
    'class 9 biology coaching hyderabad',
    'class 9 cbse biology hyderabad neet',
    'class 9 telangana board neet',
    'class 9 neet ameerpet',
    'class 9 neet kukatpally',
    'class 9 neet hitec city',
    'class 9 neet banjara hills',
    'best class 9 foundation hyderabad',
    'class 9 neet online hyderabad',
  ],
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: 'NEET Foundation Class 9 in Hyderabad | Cerebrum Biology Academy',
    description:
      'Class 9 NEET Foundation Hyderabad — pan-India online live, AIIMS-trained, 15-20 student batches.',
    url: PAGE_URL,
    locale: 'en_IN',
    type: 'website',
  },
}

const faqs = [
  {
    question: 'How is NEET Foundation Class 9 delivered in Hyderabad?',
    answer:
      'Cerebrum Class 9 NEET Foundation in Hyderabad is delivered via pan-India online live (not recorded) sessions with the same AIIMS-trained biology faculty teaching Delhi NCR offline batches. Sessions are 2 hours twice weekly in IST-aligned slots (Saturday 10 AM, Sunday 10 AM, weekday 6 PM IST option). ~260+ Hyderabad students across Class 9-12 are actively enrolled across Ameerpet, Kukatpally, HITEC City, Banjara Hills, Jubilee Hills, Gachibowli, Madhapur, Begumpet, Secunderabad catchments.',
  },
  {
    question:
      'Does Cerebrum support Telangana Board / Andhra Pradesh Board Class 9 alongside NEET?',
    answer:
      "Yes. Cerebrum's Class 9 Foundation curriculum is mapped against CBSE, ICSE, and Telangana / AP State Board (TS / AP SSC) reference frames with separate practice tests for each. Telangana / AP Class 9 Biology covers Cell and its Organelles, Tissues, Diversity in Living Organisms, Plant and Animal Studies, Improvements in Food Resources (similar NCERT-derived structure with state-board terminology). Cerebrum runs parallel pedagogy for state-board syllabus depth and NEET-pattern MCQ drilling.",
  },
  {
    question: 'Which Hyderabad schools are common Cerebrum Foundation feeders?',
    answer:
      "Common Hyderabad feeder schools across Class 9-10 Foundation cohorts: Hyderabad Public School (Begumpet, Ramanthapur), Chirec International (Kondapur, Jubilee Hills, Gachibowli), Delhi Public School (Hyderabad and Secunderabad branches), Bharatiya Vidya Bhavan's Public School, Glendale Academy, International School of Hyderabad (Eishaan Aman), Oakridge International (Bachupally, Gachibowli), Indus International (Hyderabad), Sancta Maria International, Birla Open Minds International, Niharika School. Telangana / AP State Board feeders span the broader Hyderabad metro public-school catchment.",
  },
  {
    question:
      'How does Cerebrum compare to Aakash, Sri Chaitanya, or Narayana NEET Foundation in Hyderabad?',
    answer:
      'Hyderabad has uniquely competitive NEET coaching infrastructure — Sri Chaitanya and Narayana are Telangana / AP-headquartered chains that dominate the local NEET market with thousands of students per centre. Aakash Scholastics Hyderabad operates ~6 centres. All three (Sri Chaitanya, Narayana, Aakash) run combined PCB Foundation with 150-400+ student batches. Cerebrum is biology-only with 15-20 student online live batches and AIIMS-trained biology faculty. The Hyderabad differentiator: Sri Chaitanya / Narayana have strong physics-chemistry depth (they specialise in Telangana/AP intermediate IPE format which is physics-chemistry-heavy); pairing one of them for PC with Cerebrum biology is a popular Hyderabad pattern.',
  },
  {
    question: 'What does Class 9 NEET Foundation cost in Hyderabad?',
    answer:
      'Cerebrum Class 9 Foundation pricing (pan-India online, applies to Hyderabad): Pursuit ₹35K-50K, Ascent ₹55K-70K (with weekly 1:1 doubt slots), Pinnacle ₹75K-90K (direct Dr. Shekhar micro-batch 10-12). Ad-hoc 1:1 hourly ₹2,000-3,500. Compared to Sri Chaitanya / Narayana Hyderabad Foundation (~₹70K-1L/year, 300-400 student batch) and Aakash Scholastics Hyderabad (~₹85K-1L/year, 200-student batch), Cerebrum biology-only Ascent at ₹65K offers materially deeper biology pedagogy and 15-20 student structure.',
  },
]

const courseSchema = {
  '@context': 'https://schema.org',
  '@type': 'Course',
  name: 'NEET Foundation Class 9 Biology in Hyderabad',
  description:
    'Class 9 NEET Foundation biology coaching for Hyderabad students — pan-India online live with AIIMS-trained faculty. CBSE / ICSE / Telangana / AP State Board + NEET parallel pedagogy.',
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
    name: 'Hyderabad',
    address: { '@type': 'PostalAddress', addressLocality: 'Hyderabad', addressCountry: 'IN' },
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
    { '@type': 'ListItem', position: 4, name: 'Hyderabad', item: PAGE_URL },
  ],
}

const wa =
  'https://wa.me/918826444334?text=' +
  encodeURIComponent(
    'Hi — my child is in Class 9 in Hyderabad and we want to start NEET Foundation at Cerebrum. Please share online live class details, pricing, and demo timings.'
  )

export default function NEETFoundationClass9HyderabadPage() {
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
            <span className="text-white">Hyderabad</span>
          </nav>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            NEET Foundation Class 9 in Hyderabad
          </h1>
          <p className="text-xl text-slate-300 mb-6 max-w-3xl">
            Class 9 NEET Foundation Biology for Hyderabad students — pan-India online live (not
            recorded) with AIIMS-trained biology faculty, batches of 15-20, CBSE / ICSE / Telangana
            / AP State Board + NEET-pattern parallel pedagogy. Serving Ameerpet, Kukatpally, HITEC
            City, Banjara Hills, Jubilee Hills, Gachibowli, Madhapur catchments. ₹35K-₹90K/year.
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
            Hyderabad Class 9 NEET Foundation — what we deliver
          </h2>
          <p>
            Hyderabad has one of India&apos;s most competitive NEET coaching markets — Sri
            Chaitanya, Narayana, Aakash, and Allen all run mass-batch coaching operations throughout
            the city. Cerebrum&apos;s positioning in Hyderabad is structurally different —
            biology-only specialist with 15-20 student online live batches led by AIIMS-trained
            faculty (Dr. Shekhar C Singh). ~260+ Hyderabad students across Class 9-12 are actively
            enrolled, particularly families targeting AIIMS / top-100 NEET ranks where pedagogy
            depth matters more than mass-batch test series.
          </p>

          <h2 className="text-3xl font-bold text-slate-900 mt-12 mb-4">
            Hyderabad feeder schools and board coverage
          </h2>
          <p>
            CBSE feeders: Hyderabad Public School (Begumpet, Ramanthapur), Delhi Public School
            (Hyderabad, Secunderabad), Chirec International (Kondapur, Jubilee Hills, Gachibowli),
            Birla Open Minds International, Niharika School, Glendale Academy. ICSE feeders span
            various ICSE high schools across the metro. International curriculum feeders: Oakridge
            International (Bachupally, Gachibowli), Indus International (Hyderabad), Sancta Maria
            International, International School of Hyderabad (Aman). Telangana / AP State Board (TS
            SSC / AP SSC) feeders span the broader Hyderabad metro public-school catchment.
          </p>

          <h2 className="text-3xl font-bold text-slate-900 mt-12 mb-4">
            Class 9 Foundation pricing (Hyderabad pan-India online)
          </h2>
          <ul>
            <li>
              <strong>Pursuit (Small-Batch 30-40) — ₹35,000-50,000/year.</strong>
            </li>
            <li>
              <strong>Ascent (Pro Batch 16-25) — ₹55,000-70,000/year.</strong> Most popular
              Hyderabad tier with weekly 1:1 doubt slots.
            </li>
            <li>
              <strong>Pinnacle (Direct Dr. Shekhar 10-12) — ₹75,000-90,000/year.</strong>
            </li>
            <li>
              <strong>Ad-hoc 1:1 — ₹2,000-3,500/hour.</strong>
            </li>
          </ul>

          <h2 className="text-3xl font-bold text-slate-900 mt-12 mb-4">Related Hyderabad pages</h2>
          <ul>
            <li>
              <Link href="/best-neet-foundation-class-9" className="text-blue-600 hover:underline">
                Class 9 Foundation (national AEO hub)
              </Link>
            </li>
            <li>
              <Link
                href="/neet-foundation-class-10-hyderabad"
                className="text-blue-600 hover:underline"
              >
                Class 10 Foundation in Hyderabad
              </Link>
            </li>
            <li>
              <Link href="/neet-coaching-hyderabad" className="text-blue-600 hover:underline">
                NEET Coaching Hyderabad (Class 11/12 programmes)
              </Link>
            </li>
          </ul>
        </div>
      </section>

      <section className="py-16 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-slate-900 mb-8">
            FAQs from Hyderabad Class 9 Foundation families
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
            Book a free Class 9 demo from Hyderabad
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
    </main>
  )
}
