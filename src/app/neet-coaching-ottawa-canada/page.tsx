import { Metadata } from 'next'
import Link from 'next/link'
import { CerebrumPersonSchema } from '@/components/seo/CerebrumPersonSchema'
import { NEETNRIPricingTiers } from '@/components/neet-nri/NEETNRIPricingTiers'

const PAGE_URL = 'https://cerebrumbiologyacademy.com/neet-coaching-ottawa-canada'

export const metadata: Metadata = {
  title: 'NEET Coaching Ottawa, Canada | Online Biology for NRI Students',
  description:
    'Online NEET Biology coaching for Indian-origin students in Ottawa. Diplomatic community + tech-sector NRI families. AIIMS-trained faculty, ET evening slots.',
  keywords: [
    'NEET coaching Ottawa',
    'NEET coaching Ottawa Canada',
    'NEET biology Ottawa',
    'Indian students Ottawa NEET',
    'NRI NEET coaching Ontario',
    'online NEET coaching Ottawa',
    'NEET coaching Kanata Ottawa',
  ],
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: 'NEET Coaching Ottawa Canada | Cerebrum Biology Academy',
    description: 'Online NEET Biology coaching for Ottawa NRI students. AIIMS-trained faculty.',
    url: PAGE_URL,
    locale: 'en_CA',
    type: 'website',
  },

  twitter: {
    card: 'summary_large_image' as const,
    title: 'NEET Coaching Ottawa, Canada | Online Biology for NRI Students',
    description:
      'Online NEET Biology coaching for Indian-origin students in Ottawa. Diplomatic community + tech-sector NRI families. AIIMS-trained faculty, ET evening slots.',
  },
}

const wa =
  'https://wa.me/918826444334?text=' +
  encodeURIComponent(
    "Hi — I'm in Ottawa (Canada) and interested in NEET Biology coaching for my child. Please share programme details, ET slot timings, and pricing."
  )

const faqs = [
  {
    question: 'How does NEET coaching work for Ottawa students?',
    answer:
      'All sessions are live online, timed for Eastern Time (ET) evenings — typically 7:30–9:30 PM ET on weekdays. AIIMS-trained faculty deliver NCERT-aligned Biology coaching with NEET-pattern drilling. Ottawa students join alongside Toronto and other Ontario families.',
  },
  {
    question: 'My child is in Ontario Grade 11-12 — can they prepare for NEET simultaneously?',
    answer:
      "Yes. Ontario curriculum Biology shares ~55% content overlap with NEET Biology. Our coaching bridges the gap with NEET-specific MCQ patterns, high-yield chapter drilling (Human Physiology, Genetics, Ecology), and assertion-reason question practice that Ontario exams don't cover.",
  },
  {
    question: 'Which Ottawa schools send students to Cerebrum?',
    answer:
      'Families from Kanata, Barrhaven, Nepean, and the Centretown/Glebe corridor. Students attend Lisgar Collegiate, Colonel By, Earl of March, Merivale, and Ashbury College. Many diplomatic and tech-sector families (Shopify, Nokia, Ciena) keep Indian medical-college options open.',
  },
  {
    question: 'Ottawa has a diplomatic community — do you support mobile families?',
    answer:
      'Yes — several Ottawa families are diplomats who may relocate. Our online coaching continues seamlessly regardless of relocation. The NEET curriculum is the same worldwide.',
  },
  {
    question: 'What does it cost?',
    answer:
      'NEET NRI pricing for Ontario (high zone): Pursuit $2,500/yr, Ascent $4,000/yr, Pinnacle $6,000/yr. CAD payment accepted.',
  },
]

export default function Page() {
  return (
    <main className="min-h-screen bg-white">
      <CerebrumPersonSchema
        knowsAbout={['NEET Ottawa', 'NEET Biology Ontario', 'NRI NEET coaching Canada']}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: faqs.map((f) => ({
              '@type': 'Question',
              name: f.question,
              acceptedAnswer: { '@type': 'Answer', text: f.answer },
            })),
          }),
        }}
      />

      <section className="bg-gradient-to-br from-slate-900 to-slate-800 py-16 md:py-24">
        <div className="max-w-5xl mx-auto px-4">
          <nav className="text-sm text-slate-400 mb-6" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-white">
              Home
            </Link>
            <span className="mx-2">/</span>
            <Link href="/neet-coaching-nri-canada" className="hover:text-white">
              NEET NRI Canada
            </Link>
            <span className="mx-2">/</span>
            <span className="text-white">Ottawa</span>
          </nav>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            NEET Coaching for Ottawa Students
          </h1>
          <p className="text-xl text-slate-300 mb-6 max-w-3xl">
            Online NEET Biology coaching for Indian-origin families in Ottawa — Canada's capital.
            Diplomatic + tech-sector NRI community (Kanata, Barrhaven, Nepean). AIIMS-trained
            faculty, ET evening sessions. Pursuit $2,500/yr to Pinnacle $6,000/yr.
          </p>
          <a
            href={wa}
            className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-xl font-semibold"
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
            Why Ottawa families choose NEET coaching
          </h2>
          <p>
            Ottawa has a distinctive Indian-Canadian community shaped by two forces: the diplomatic
            corps (Indian High Commission, multilateral organisations) and the tech sector (Shopify,
            Nokia, Ciena, Blackberry QNX). Both groups maintain strong connections to India and
            often keep NEET as an option for their children alongside Canadian university
            applications.
          </p>
          <p>
            The Kanata tech corridor and Barrhaven residential communities have the highest South
            Asian household density in Ottawa. Families here are well-educated and research coaching
            quality carefully — the AIIMS-trained faculty credential resonates strongly.
          </p>
          <p>
            Ottawa is in the same ET timezone as Toronto — students join the Ontario cohort for live
            sessions. The University of Ottawa Faculty of Medicine and Queen's University (Kingston,
            2 hours east) are the primary local Canadian medical targets.
          </p>

          <h2 className="text-3xl font-bold text-slate-900 mt-12 mb-4">Ottawa schools</h2>
          <p>
            Lisgar Collegiate Institute, Colonel By Secondary School, Earl of March Secondary
            School, Merivale High School, Ashbury College (IB Diploma), and Elmwood School. Students
            from these schools who pursue NEET alongside Ontario diploma need our NEET-pattern
            bridge coaching — Ontario Biology exams test different skills than NEET MCQs.
          </p>

          <h2 className="text-3xl font-bold text-slate-900 mt-12 mb-4">Related pages</h2>
          <ul>
            <li>
              <Link href="/neet-coaching-nri-canada" className="text-blue-600 hover:underline">
                NEET NRI Canada Hub
              </Link>
            </li>
            <li>
              <Link href="/neet-coaching-toronto-canada" className="text-blue-600 hover:underline">
                NEET Coaching Toronto
              </Link>
            </li>
            <li>
              <Link
                href="/ib-biology-tutor-ashbury-college-ottawa"
                className="text-blue-600 hover:underline"
              >
                IB Biology at Ashbury College Ottawa
              </Link>
            </li>
            <li>
              <Link href="/mcat-biology-tutor-montreal" className="text-blue-600 hover:underline">
                MCAT Biology Montreal (nearest)
              </Link>
            </li>
          </ul>
        </div>
      </section>

      <section className="py-16 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-slate-900 mb-8">FAQs from Ottawa families</h2>
          <div className="space-y-6">
            {faqs.map((f, i) => (
              <details key={i} className="bg-white rounded-xl p-6 border border-slate-200">
                <summary className="text-lg font-semibold text-slate-900 cursor-pointer">
                  {f.question}
                </summary>
                <p className="mt-4 text-slate-700 leading-relaxed">{f.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <NEETNRIPricingTiers />

      <section className="py-16 bg-gradient-to-br from-blue-600 to-purple-600">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Book a free demo from Ottawa</h2>
          <a
            href={wa}
            className="inline-flex items-center gap-2 bg-white text-blue-700 px-8 py-4 rounded-xl font-semibold text-lg"
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
