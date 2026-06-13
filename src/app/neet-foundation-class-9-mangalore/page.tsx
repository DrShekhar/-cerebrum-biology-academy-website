import type { Metadata } from 'next'
import Link from 'next/link'
import { CerebrumPersonSchema } from '@/components/seo/CerebrumPersonSchema'
import { LocalBusinessSchema } from '@/components/seo/StructuredData'
import { FAQSchema } from '@/components/seo/FAQSchema'

const PAGE_URL = 'https://cerebrumbiologyacademy.com/neet-foundation-class-9-mangalore'
export const metadata: Metadata = {
  title: 'NEET Foundation Class 9 in Mangalore | AIIMS-Trained Online Live',
  description:
    'NEET Foundation Class 9 in Mangalore — AIIMS-trained faculty, online live. Serving Balmatta, Hampankatta, Bejai, Kadri, Surathkal, Manipal Road. From Rs 35,000/year.',
  keywords: [
    'neet foundation class 9 mangalore',
    'class 9 biology coaching mangalore',
    'class 9 neet mangalore',
  ],
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: 'NEET Foundation Class 9 Mangalore',
    url: PAGE_URL,
    locale: 'en_IN',
    type: 'website',
  },

  twitter: {
    card: 'summary_large_image' as const,
    title: 'NEET Foundation Class 9 in Mangalore | AIIMS-Trained Online Live',
    description:
      'NEET Foundation Class 9 in Mangalore — AIIMS-trained faculty, online live. Serving Balmatta, Hampankatta, Bejai, Kadri, Surathkal, Manipal Road. From Rs 35,000/year.',
  },
}
const wa =
  'https://wa.me/918826444334?text=' +
  encodeURIComponent('Hi — Class 9 student in Mangalore, want NEET Foundation details.')
const faqs = [
  {
    question: 'Is Class 9 too early for NEET in Mangalore?',
    answer: 'No — ideal start. NCERT Class 9 Biology maps directly to NEET.',
  },
  {
    question: 'Cost?',
    answer: 'Foundation Pursuit Rs 35,000/yr. Ascent Rs 50,000/yr. Pinnacle Rs 70,000/yr.',
  },
]
export default function Page() {
  return (
    <main className="min-h-screen bg-white">
      <CerebrumPersonSchema
        knowsAbout={['NEET Foundation Mangalore', 'Class 9 Biology Karnataka']}
      />
      <LocalBusinessSchema />
      <FAQSchema questions={faqs} pageUrl={PAGE_URL} />
      <section className="bg-gradient-to-br from-emerald-900 to-green-800 py-16 md:py-24">
        <div className="max-w-5xl mx-auto px-4">
          <nav className="text-sm text-emerald-300 mb-6" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-white">
              Home
            </Link>
            <span className="mx-2">/</span>
            <Link href="/neet-coaching-mangalore" className="hover:text-white">
              NEET Mangalore
            </Link>
            <span className="mx-2">/</span>
            <span className="text-white">Foundation Class 9</span>
          </nav>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            NEET Foundation Class 9 in Mangalore
          </h1>
          <p className="text-xl text-emerald-200 mb-6 max-w-3xl">
            NEET Foundation from Mangalore (Karnataka). AIIMS-trained faculty. Serving Balmatta,
            Hampankatta, Bejai, Kadri, Surathkal, Manipal Road. From Rs 35,000/year.
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
      <section className="py-16 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-slate-900 mb-8">FAQs</h2>
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
      <section className="py-16 bg-gradient-to-br from-emerald-600 to-green-600">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Start Foundation from Mangalore</h2>
          <a
            href={wa}
            className="inline-flex items-center gap-2 bg-white text-emerald-700 px-8 py-4 rounded-xl font-semibold text-lg"
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
