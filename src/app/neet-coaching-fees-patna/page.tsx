import type { Metadata } from 'next'
import Link from 'next/link'
import { CerebrumPersonSchema } from '@/components/seo/CerebrumPersonSchema'
import { FAQSchema } from '@/components/seo/FAQSchema'
import { LocalBusinessSchema } from '@/components/seo/StructuredData'

const PAGE_URL = 'https://cerebrumbiologyacademy.com/neet-coaching-fees-patna'

export const metadata: Metadata = {
  title: 'NEET Coaching Fees in Patna 2026 | Fee Comparison | Cerebrum',
  description: 'NEET coaching fee comparison in Patna 2026. Cerebrum Biology: Pursuit Rs 48,000 / Ascent Rs 76,000 / Pinnacle Rs 98,000. Compare with Allen, Aakash fees in Patna.',
  keywords: [
    'NEET coaching fees patna',
    'NEET coaching fee patna 2026',
    'best NEET coaching fees patna',
    'affordable NEET coaching patna',
  ],
  other: { 'article:modified_time': '2026-05-27' },
  alternates: { canonical: PAGE_URL },
  openGraph: { title: 'NEET Coaching Fees in Patna 2026 | Fee Comparison', description: 'NEET coaching fee comparison in Patna 2026. Cerebrum Biology: Pursuit Rs 48,000 / Ascent Rs 76,000 / Pinnacle Rs 98,000. Compare with Allen, Aakash fees in Patna.', url: PAGE_URL, locale: 'en_IN', type: 'website' },
}

const wa = 'https://wa.me/918826444334?text=' + encodeURIComponent("Hi — I am in Patna and interested in NEET Biology coaching. Please share details.")

const faqs = [
  { question: 'How does NEET coaching work for Patna students?', answer: 'All sessions are live online via Zoom, IST evening slots (5-8 PM weekdays). AIIMS-trained biology-specialist faculty. Patna students join pan-India cohorts of 15-20. Recorded sessions + WhatsApp doubt support included.' },
  { question: 'What does NEET coaching cost in Patna?', answer: 'Pursuit Rs 48,000/yr (25-30 students). Ascent Rs 76,000/yr (16-20). Pinnacle Rs 98,000/yr (10-12 with weekly 1:1). Same pricing pan-India.' },
  { question: 'Is Cerebrum better than Allen/Aakash in Patna?', answer: 'Different model. Allen/Aakash: generalist (P+C+Bio, 200+ batches). Cerebrum: biology-only specialist (15-20 students, AIIMS faculty). Biology = 360/720 NEET marks. Many families keep generalist for P+C and add Cerebrum for Biology.' },
]

export default function Page() {
  return (
    <main className="min-h-screen bg-white">
      <CerebrumPersonSchema knowsAbout={['NEET Patna', 'NEET Biology Bihar']} />
      <LocalBusinessSchema />
      <FAQSchema questions={faqs} pageUrl={PAGE_URL} />

      <section className="bg-gradient-to-br from-slate-900 to-slate-800 py-16 md:py-24">
        <div className="max-w-5xl mx-auto px-4">
          <nav className="text-sm text-slate-400 mb-6" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-white">Home</Link><span className="mx-2">/</span>
            <Link href="/neet-coaching-patna" className="hover:text-white">NEET Patna</Link><span className="mx-2">/</span>
            <span className="text-white">NEET Coaching Fees</span>
          </nav>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">NEET Coaching Fees in Patna 2026</h1>
          <p className="text-xl text-slate-300 mb-6 max-w-3xl">Complete NEET coaching fee comparison for Patna (Bihar) families. Cerebrum Biology Academy offers three tiers: Pursuit Rs 48,000/yr (25-30 students, monthly 1:1), Ascent Rs 76,000/yr (16-20 students, bi-weekly 1:1), Pinnacle Rs 98,000/yr (10-12 students, weekly 1:1 with Dr. Shekhar C Singh). Compared to generalist chains in Patna (Rs 1.4L-1.8L/yr for Physics + Chemistry + Biology combined), Cerebrum's biology-only model at Rs 48K-98K delivers deeper biology pedagogy at lower total cost.</p>
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
          <h2 className="text-3xl font-bold text-white mb-4">Book a free demo from Patna</h2>
          <a href={wa} className="inline-flex items-center gap-2 bg-white text-blue-700 px-8 py-4 rounded-xl font-semibold text-lg" target="_blank" rel="noopener noreferrer">WhatsApp +91 88264-44334</a>
        </div>
      </section>
    </main>
  )
}
