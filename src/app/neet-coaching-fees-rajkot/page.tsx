import type { Metadata } from 'next'
import Link from 'next/link'
import { CerebrumPersonSchema } from '@/components/seo/CerebrumPersonSchema'
import { FAQSchema } from '@/components/seo/FAQSchema'
import { LocalBusinessSchema } from '@/components/seo/StructuredData'

const PAGE_URL = 'https://cerebrumbiologyacademy.com/neet-coaching-fees-rajkot'

export const metadata: Metadata = {
  title: 'NEET Coaching Fees Rajkot | Cerebrum',
  description: 'NEET Coaching Fees in Rajkot — AIIMS-trained faculty, online live. Serving Kalawad Road, University Road, Yagnik Road, 150 Feet Ring Road. From Rs 48,000/yr.',
  keywords: ['neet coaching fees rajkot', 'NEET biology rajkot', 'best NEET rajkot'],
  alternates: { canonical: PAGE_URL },
  openGraph: { title: 'NEET Coaching Fees Rajkot', url: PAGE_URL, locale: 'en_IN', type: 'website' },

  twitter: { card: 'summary_large_image' as const },
}

const wa = 'https://wa.me/918826444334?text=' + encodeURIComponent("Hi — I am in Rajkot and interested in NEET coaching. Please share details.")

const faqs = [
  { question: 'How does NEET coaching work for Rajkot students?', answer: 'Live online Zoom sessions, IST evenings. AIIMS-trained biology-specialist faculty. 15-20 student batches.' },
  { question: 'What does it cost?', answer: 'Pursuit Rs 48,000/yr. Ascent Rs 76,000/yr. Pinnacle Rs 98,000/yr.' },
]

export default function Page() {
  return (
    <main className="min-h-screen bg-white">
      <CerebrumPersonSchema knowsAbout={['NEET Rajkot', 'NEET Biology Gujarat']} />
      <LocalBusinessSchema />
      <FAQSchema questions={faqs} pageUrl={PAGE_URL} />
      <section className="bg-gradient-to-br from-slate-900 to-slate-800 py-16 md:py-24">
        <div className="max-w-5xl mx-auto px-4">
          <nav className="text-sm text-slate-400 mb-6" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-white">Home</Link><span className="mx-2">/</span>
            <Link href="/neet-coaching-rajkot" className="hover:text-white">NEET Rajkot</Link><span className="mx-2">/</span>
            <span className="text-white">Coaching Fees</span>
          </nav>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">NEET Coaching Fees in Rajkot</h1>
          <p className="text-xl text-slate-300 mb-6 max-w-3xl">NEET Biology coaching for Rajkot (Gujarat). AIIMS-trained faculty, online live. Serving Kalawad Road, University Road, Yagnik Road, 150 Feet Ring Road.</p>
          <a href={wa} className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-xl font-semibold" target="_blank" rel="noopener noreferrer">WhatsApp +91 88264-44334</a>
        </div>
      </section>
      <section className="py-16 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-slate-900 mb-8">FAQs</h2>
          <div className="space-y-6">
            {faqs.map((f, i) => (
              <details key={i} className="bg-white rounded-xl p-6 border border-slate-200">
                <summary className="text-lg font-semibold text-slate-900 cursor-pointer">{f.question}</summary>
                <p className="mt-4 text-slate-700 leading-relaxed">{f.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
      <section className="py-16 bg-gradient-to-br from-blue-600 to-purple-600">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Book a free demo from Rajkot</h2>
          <a href={wa} className="inline-flex items-center gap-2 bg-white text-blue-700 px-8 py-4 rounded-xl font-semibold text-lg" target="_blank" rel="noopener noreferrer">WhatsApp +91 88264-44334</a>
        </div>
      </section>
    </main>
  )
}
