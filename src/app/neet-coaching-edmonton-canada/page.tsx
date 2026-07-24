import { Metadata } from 'next'
import Link from 'next/link'
import { CerebrumPersonSchema } from '@/components/seo/CerebrumPersonSchema'
import { NEETNRIPricingTiers } from '@/components/neet-nri/NEETNRIPricingTiers'
import { NRI_INTERNATIONAL_CITIES } from '@/data/locality-content/nri-international-cities'

const PAGE_URL = 'https://cerebrumbiologyacademy.com/neet-coaching-edmonton-canada'
const city = NRI_INTERNATIONAL_CITIES['edmonton-canada']!

export const metadata: Metadata = {
  title: `NEET Biology Coaching in Edmonton, Canada | Cerebrum (Live Online)`,
  description: `Live online NEET Biology coaching for Edmonton Indian-origin Class 11-12 students — 80K Indian community (Alberta\'s 2nd largest after Calgary), Mill Woods / Castle Downs / Beverly / Riverbend / Whitemud / U of A campus area. Significant Sikh/Punjabi + Gujarati communities. Schools we serve: Old Scona Academic, Strathcona HS, Ross Sheppard, Lillian Osborne, Harry Ainlay, Jasper Place. MST 5-7:30 AM batch + Saturday morning live. NRI quota + U of Alberta Medicine alternative. MCAT B/B track. 98% success rate.`,
  keywords: [
    'NEET coaching Edmonton',
    'NEET coaching Edmonton Canada',
    'NEET biology Edmonton',
    'Indian students Edmonton NEET',
    'NRI NEET coaching Alberta',
    'online NEET coaching Edmonton',
    'NEET coaching Mill Woods Edmonton',
  ],
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: 'NEET Coaching Edmonton Canada | Cerebrum Biology Academy',
    description: 'Online NEET Biology coaching for Edmonton NRI students. AIIMS-trained faculty.',
    url: PAGE_URL,
    locale: 'en_CA',
    type: 'website',
  },

  twitter: {
    card: 'summary_large_image' as const,
    title: 'NEET Biology Coaching in Edmonton, Canada | Cerebrum',
    description:
      'Live online NEET Biology coaching for Edmonton Indian-origin Class 11-12 students. Mill Woods feeders, MST batch, NRI quota.',
  },
}

const wa =
  'https://wa.me/918826444334?text=' +
  encodeURIComponent(
    "Hi — I'm in Edmonton (Canada) and interested in NEET Biology coaching for my child. Please share programme details, MST slot timings, and pricing."
  )

const faqs = [
  {
    question: 'How does NEET coaching work for Edmonton students?',
    answer:
      'All sessions are live online, timed for Mountain Standard Time (MST) evenings — typically 7:00–9:00 PM MST on weekdays. AIIMS-trained faculty deliver NCERT-aligned Biology coaching with NEET-pattern drilling. Edmonton students join alongside Calgary and other Alberta families.',
  },
  {
    question: 'My child is in Alberta Grade 11-12 — can they prepare for NEET simultaneously?',
    answer:
      "Yes. Alberta curriculum Biology 30 shares ~60% content overlap with NEET Biology. Our coaching bridges the gap — NEET-specific MCQ patterns, assertion-reason questions, and diagram-based problems that Alberta exams don't test.",
  },
  {
    question: 'Which Edmonton schools send students to Cerebrum?',
    answer:
      'Families from Mill Woods, Terwillegar, Windermere, and the South Edmonton Indian-Canadian corridor. Students attend Ross Sheppard, Strathcona, Old Scona, Harry Ainlay, and Jasper Place. Many are keeping Indian medical-college options open alongside Canadian university applications.',
  },
  {
    question: 'Do you offer the NRI 15% quota counselling?',
    answer:
      'Yes — all NEET NRI programmes include NRI-quota counselling. We guide families on deemed university options, private medical colleges accepting NRI quota, and the NEET score thresholds for each.',
  },
  {
    question: 'What does it cost?',
    answer:
      'NEET NRI pricing for Alberta (high zone): Pursuit $2,500/yr, Ascent $4,000/yr, Pinnacle $6,000/yr. CAD payment via Canadian bank transfer accepted.',
  },
]

export default function Page() {
  return (
    <main className="min-h-screen bg-white">
      <CerebrumPersonSchema
        knowsAbout={['NEET Edmonton', 'NEET Biology Alberta', 'NRI NEET coaching Canada']}
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
            <span className="text-white">Edmonton</span>
          </nav>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            NEET Coaching for Edmonton Students
          </h1>
          <p className="text-xl text-slate-300 mb-6 max-w-3xl">
            Online NEET Biology coaching for Indian-origin families in Edmonton. AIIMS-trained
            faculty, NCERT + NEET-pattern drilling, MST evening sessions. Alberta Grade 11-12 + NEET
            dual-prep supported. Pursuit $2,500/yr to Pinnacle $6,000/yr.
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
            Why Edmonton families choose NEET coaching
          </h2>
          <p>
            Edmonton has a growing Indian-Canadian community concentrated in Mill Woods,
            Terwillegar, Windermere, and South Edmonton. Many families maintain dual-track
            aspirations: Canadian university (University of Alberta, U of C) alongside Indian
            medical college via NEET. The University of Alberta pre-med pipeline is strong, but
            families keeping AIIMS/state medical options open need NEET-specific Biology coaching
            that Alberta schools don't provide.
          </p>
          <p>
            Edmonton's MST timezone means evening sessions (7–9 PM MST) align with late-night IST
            (6:30–8:30 AM IST next day) — our faculty schedules accommodate this. Edmonton students
            join the same Alberta cohort as Calgary families.
          </p>

          <h2 className="text-3xl font-bold text-slate-900 mt-12 mb-4">Edmonton schools</h2>
          <p>
            Ross Sheppard High School, Strathcona High School, Old Scona Academic, Harry Ainlay High
            School, Jasper Place High School, Lillian Osborne High School, and McNally High School.
            Students from these schools pursuing NEET alongside Alberta diploma need our
            NEET-pattern bridge coaching.
          </p>

          <h2 className="text-3xl font-bold text-slate-900 mt-12 mb-4">Related pages</h2>
          <ul>
            <li>
              <Link href="/neet-coaching-nri-canada" className="text-blue-600 hover:underline">
                NEET NRI Canada Hub
              </Link>
            </li>
            <li>
              <Link href="/neet-coaching-calgary-canada" className="text-blue-600 hover:underline">
                NEET Coaching Calgary
              </Link>
            </li>
            <li>
              <Link href="/mcat-biology-tutor-toronto" className="text-blue-600 hover:underline">
                MCAT Biology Toronto
              </Link>
            </li>
          </ul>
        </div>
      </section>

      <section className="py-16 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-slate-900 mb-8">FAQs from Edmonton families</h2>
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
          <h2 className="text-3xl font-bold text-white mb-4">Book a free demo from Edmonton</h2>
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
