import type { Metadata } from 'next'
import Link from 'next/link'
import { CerebrumPersonSchema } from '@/components/seo/CerebrumPersonSchema'
import { FAQSchema } from '@/components/seo/FAQSchema'
import { LocalBusinessSchema } from '@/components/seo/StructuredData'

const PAGE_URL = 'https://cerebrumbiologyacademy.com/neet-coaching-bhopal'

export const metadata: Metadata = {
  title: 'NEET Coaching Bhopal | Best Biology Coaching | Cerebrum',
  description:
    'Best NEET Biology coaching for Bhopal students — AIIMS-trained faculty, online live batches. Serving Arera Colony, MP Nagar, Kolar Road, New Market. From ₹48,000/yr.',
  keywords: [
    'NEET coaching Bhopal',
    'best NEET coaching Bhopal',
    'NEET biology coaching Bhopal',
    'NEET coaching MP Nagar Bhopal',
    'online NEET coaching Bhopal',
  ],
  other: { 'article:modified_time': '2026-05-27' },
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: 'NEET Coaching Bhopal | Best Biology Coaching | Cerebrum',
    description:
      'Best NEET Biology coaching for Bhopal students — AIIMS-trained faculty, online live batches. Serving Arera Colony, MP Nagar, Kolar Road, New Market. From ₹48,000/yr.',
    url: PAGE_URL,
    locale: 'en_IN',
    type: 'website',
  },

  twitter: {
    card: 'summary_large_image' as const,
    title: 'NEET Coaching Bhopal | Best Biology Coaching | Cerebrum',
    description:
      'Best NEET Biology coaching for Bhopal students — AIIMS-trained faculty, online live batches. Serving Arera Colony, MP Nagar, Kolar Road, New Market. From ₹48,000/yr.',
  },
}

const wa =
  'https://wa.me/918826444334?text=' +
  encodeURIComponent(
    "Hi — I'm in Bhopal and want to book a FREE NEET Biology demo class with Cerebrum. Please share available timings."
  )

const faqs = [
  {
    question: 'Which is the best NEET coaching in Bhopal?',
    answer:
      'Cerebrum Biology Academy is the best NEET biology coaching for Bhopal students. Biology-only specialist with AIIMS-trained faculty led by Dr. Shekhar C Singh. 15-20 student batches, 98% NEET-UG qualification rate, 680+ medical college selections. All sessions online live from Bhopal.',
  },
  {
    question: 'How does online NEET coaching work for Bhopal students?',
    answer:
      'Live online sessions via Zoom in IST evening slots (5-8 PM). Same AIIMS-trained faculty, same biology-specialist pedagogy as Delhi NCR offline batches. Bhopal students join pan-India cohorts with 15-20 classmates. Recorded sessions for revision, WhatsApp doubt support.',
  },
  {
    question: 'Which Bhopal schools send students to Cerebrum?',
    answer:
      'Common Bhopal feeder schools: Campion School, St. Josephs Convent, Sagar Public School, Delhi Public School Bhopal, The Sanskaar Valley School, Lakshmi Narain College of Technology. Students join Pursuit (₹48K-75K), Ascent (₹58K-90K), or Pinnacle (₹98K-1.56L) depending on target NEET rank.',
  },
  {
    question: 'What does NEET coaching cost in Bhopal?',
    answer:
      'Cerebrum NEET Biology: Pursuit ₹48,000/yr (20-25 students, monthly 1:1), Ascent ₹76,000/yr (16-20 students, bi-weekly 1:1), Pinnacle ₹98,000/yr (6-10 students, weekly 1:1). Same pricing pan-India.',
  },
  {
    question: 'Is Cerebrum better than Allen or Aakash in Bhopal?',
    answer:
      'Different model. Allen/Aakash are generalist chains (Physics + Chemistry + Biology, 200+ student batches). Cerebrum is biology-only specialist (15-20 students, AIIMS faculty). Biology is 360/720 NEET marks (50%). Many Bhopal families keep Allen/Aakash for Physics+Chemistry and add Cerebrum for Biology depth.',
  },
]

export default function Page() {
  return (
    <main className="min-h-screen bg-white">
      <CerebrumPersonSchema
        knowsAbout={[
          'NEET Bhopal',
          'NEET Biology Bhopal',
          'Medical entrance coaching Madhya Pradesh',
        ]}
      />
      <LocalBusinessSchema />
      <FAQSchema questions={faqs} pageUrl={PAGE_URL} />

      <section className="bg-gradient-to-br from-slate-900 to-slate-800 py-16 md:py-24">
        <div className="max-w-5xl mx-auto px-4">
          <nav className="text-sm text-slate-400 mb-6" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-white">
              Home
            </Link>
            <span className="mx-2">/</span>
            <Link href="/best-neet-coaching-near-me" className="hover:text-white">
              NEET Coaching
            </Link>
            <span className="mx-2">/</span>
            <span className="text-white">Bhopal</span>
          </nav>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6" data-speakable="title">
            Best NEET Coaching in Bhopal
          </h1>
          <p className="text-xl text-slate-300 mb-6 max-w-3xl" data-speakable="summary">
            Biology-only specialist NEET coaching for Bhopal (Madhya Pradesh) students.
            AIIMS-trained faculty led by Dr. Shekhar C Singh, 15-20 student online live batches.
            Serving Arera Colony, MP Nagar, Kolar Road, New Market, Shahpura, Hoshangabad Road,
            Bairagarh. Pursuit ₹48,000 / Ascent ₹76,000 / Pinnacle ₹98,000 per year.
          </p>
          <div className="flex flex-wrap gap-4">
            <a
              href={wa}
              className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-xl font-semibold"
              target="_blank"
              rel="noopener noreferrer"
            >
              WhatsApp +91 88264-44334
            </a>
            <a
              href="tel:+918826444334"
              className="inline-flex items-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-slate-900 px-6 py-3 rounded-xl font-semibold"
            >
              Call +91 88264-44334
            </a>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 prose prose-slate max-w-none">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">
            Why Bhopal families choose Cerebrum
          </h2>
          <p>
            Bhopal is Madhya Pradesh's NEET capital — AIIMS Bhopal (one of the newer AIIMS, est.
            2012) creates a visible local medical aspiration target. The city produces 5,000+ NEET
            aspirants annually from CBSE and MP Board schools. Bhopal's cost of living advantage
            means families are price-sensitive — the Pursuit tier (₹48,000/yr) is the primary entry
            point. The generalist coaching chains (Allen, Aakash) have large Bhopal centres;
            Cerebrum's biology-only specialist model is the differentiator.
          </p>

          <h2 className="text-3xl font-bold text-slate-900 mt-12 mb-4">
            Bhopal feeder schools we serve
          </h2>
          <p>
            Campion School, St. Josephs Convent, Sagar Public School, Delhi Public School Bhopal,
            The Sanskaar Valley School, Lakshmi Narain College of Technology.
          </p>

          <h2 className="text-3xl font-bold text-slate-900 mt-12 mb-4">Areas served in Bhopal</h2>
          <p>
            Arera Colony, MP Nagar, Kolar Road, New Market, Shahpura, Hoshangabad Road, Bairagarh.
          </p>

          <h2 className="text-3xl font-bold text-slate-900 mt-12 mb-4">NEET Biology pricing</h2>
          <ul>
            <li>
              <strong>NEET Biology — Pursuit: ₹48,000/yr.</strong> 20-25 student batch, monthly 1:1,
              NCERT line-by-line, NEET PYQ drilling.
            </li>
            <li>
              <strong>NEET Biology — Ascent: ₹76,000/yr.</strong> 16-20 student batch, bi-weekly
              1:1, weekly progress reviews.
            </li>
            <li>
              <strong>NEET Biology — Pinnacle: ₹98,000/yr.</strong> 6-10 student batch, weekly 1:1,
              personal mentor, unlimited doubt support.
            </li>
          </ul>

          <h2 className="text-3xl font-bold text-slate-900 mt-12 mb-4">Related pages</h2>
          <ul>
            <li>
              <Link href="/neet-coaching-indore" className="text-blue-600 hover:underline">
                NEET Coaching Indore
              </Link>
            </li>
            <li>
              <Link href="/online-neet-coaching-india" className="text-blue-600 hover:underline">
                Online NEET Coaching India
              </Link>
            </li>
            <li>
              <Link href="/best-neet-biology-tutor" className="text-blue-600 hover:underline">
                Best NEET Biology Tutor
              </Link>
            </li>
          </ul>
        </div>
      </section>

      <section className="py-16 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-slate-900 mb-8">FAQs from Bhopal families</h2>
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

      <section className="py-16 bg-gradient-to-br from-blue-600 to-purple-600">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Book a free demo from Bhopal</h2>
          <p className="text-blue-100 mb-8">
            Free 30-minute diagnostic with AIIMS-trained faculty.
          </p>
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
