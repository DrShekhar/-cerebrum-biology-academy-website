import type { Metadata } from 'next'
import Link from 'next/link'
import { CerebrumPersonSchema } from '@/components/seo/CerebrumPersonSchema'
import { FAQSchema } from '@/components/seo/FAQSchema'
import { LocalBusinessSchema } from '@/components/seo/StructuredData'

const PAGE_URL = 'https://cerebrumbiologyacademy.com/neet-coaching-thrissur'
export const metadata: Metadata = {
  title: 'NEET Coaching Thrissur | Best Biology Coaching | Cerebrum',
  description: 'Best NEET Biology coaching for Thrissur students — AIIMS-trained faculty, online live, 15-20 student batches. Serving Round, Swaraj, Ayyanthole, Punkunnam, Ollur, Wadakkanchery. From Rs 48,000/yr.',
  keywords: ['NEET coaching thrissur', 'best NEET coaching thrissur', 'NEET biology thrissur', 'online NEET coaching thrissur'],
  other: { 'article:modified_time': '2026-05-27' },
  alternates: { canonical: PAGE_URL },
  openGraph: { title: 'NEET Coaching Thrissur | Cerebrum', description: 'Best NEET Biology coaching Thrissur.', url: PAGE_URL, locale: 'en_IN', type: 'website' },

  twitter: { card: 'summary_large_image' as const },
}
const wa = 'https://wa.me/918826444334?text=' + encodeURIComponent("Hi — I am in Thrissur and want a FREE NEET Biology demo. Please share timings.")
const faqs = [
  { question: 'Which is the best NEET coaching in Thrissur?', answer: 'Cerebrum Biology Academy — biology-only specialist with AIIMS-trained faculty. 15-20 student online live batches. Pursuit Rs 48,000 / Ascent Rs 76,000 / Pinnacle Rs 98,000 per year.' },
  { question: 'How does online NEET coaching work from Thrissur?', answer: 'Live Zoom sessions in IST evening slots (5-8 PM). Same faculty as Delhi NCR. Recorded sessions + WhatsApp doubt support. Thrissur students join pan-India cohorts.' },
  { question: 'What does NEET coaching cost in Thrissur?', answer: 'Pursuit Rs 48,000/yr. Ascent Rs 76,000/yr. Pinnacle Rs 98,000/yr (weekly 1:1 with Dr. Shekhar C Singh).' },
  { question: 'Is Cerebrum better than Narayana/Sri Chaitanya in Thrissur?', answer: 'Different model. Generalist chains run Physics+Chemistry+Biology in 200+ student batches. Cerebrum is biology-only (15-20 students, AIIMS faculty). Biology = 360/720 NEET marks (50%). Many families keep generalist for P+C and add Cerebrum for Biology depth.' },
  { question: 'Which Thrissur schools send students to Cerebrum?', answer: 'Students from CBSE, ICSE, and Kerala state board schools across Round, Swaraj, Ayyanthole, Punkunnam, Ollur, Wadakkanchery.' },
]
export default function Page() {
  return (
    <main className="min-h-screen bg-white">
      <CerebrumPersonSchema knowsAbout={['NEET Thrissur', 'NEET Biology Kerala', 'Medical entrance coaching Thrissur']} />
      <LocalBusinessSchema />
      <FAQSchema questions={faqs} pageUrl={PAGE_URL} />
      <section className="bg-gradient-to-br from-slate-900 to-slate-800 py-16 md:py-24">
        <div className="max-w-5xl mx-auto px-4">
          <nav className="text-sm text-slate-400 mb-6" aria-label="Breadcrumb"><Link href="/" className="hover:text-white">Home</Link><span className="mx-2">/</span><Link href="/best-neet-coaching-near-me" className="hover:text-white">NEET Coaching</Link><span className="mx-2">/</span><span className="text-white">Thrissur</span></nav>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6" data-speakable="title">Best NEET Coaching in Thrissur</h1>
          <p className="text-xl text-slate-300 mb-6 max-w-3xl" data-speakable="summary">Biology-only NEET coaching for Thrissur (Kerala). AIIMS-trained faculty, 15-20 student online live batches. Serving Round, Swaraj, Ayyanthole, Punkunnam, Ollur, Wadakkanchery. Pursuit Rs 48,000 / Ascent Rs 76,000 / Pinnacle Rs 98,000 per year.</p>
          <div className="flex flex-wrap gap-4">
            <a href={wa} className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-xl font-semibold" target="_blank" rel="noopener noreferrer">WhatsApp +91 88264-44334</a>
            <a href="tel:+918826444334" className="inline-flex items-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-slate-900 px-6 py-3 rounded-xl font-semibold">Call +91 88264-44334</a>
          </div>
        </div>
      </section>
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 prose prose-slate max-w-none">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">NEET Biology pricing</h2>
          <ul>
            <li><strong>NEET Biology — Pursuit: Rs 48,000/yr.</strong> 25-30 student batch, monthly 1:1.</li>
            <li><strong>NEET Biology — Ascent: Rs 76,000/yr.</strong> 16-20 students, bi-weekly 1:1.</li>
            <li><strong>NEET Biology — Pinnacle: Rs 98,000/yr.</strong> 10-12 students, weekly 1:1.</li>
          </ul>
          <h2 className="text-3xl font-bold text-slate-900 mt-12 mb-4">Related pages</h2>
          <ul>
            <li><Link href="/neet-dropper-batch-thrissur" className="text-blue-600 hover:underline">Dropper Batch Thrissur</Link></li>
            <li><Link href="/neet-foundation-class-9-thrissur" className="text-blue-600 hover:underline">Foundation Class 9 Thrissur</Link></li>
            <li><Link href="/online-neet-coaching-thrissur" className="text-blue-600 hover:underline">Online NEET Thrissur</Link></li>
            <li><Link href="/best-neet-biology-tutor" className="text-blue-600 hover:underline">Best NEET Biology Tutor</Link></li>
          </ul>
        </div>
      </section>
      <section className="py-16 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-slate-900 mb-8">FAQs from Thrissur families</h2>
          <div className="space-y-6">{faqs.map((f, i) => (<details key={i} className="bg-white rounded-xl p-6 border border-slate-200"><summary className="text-lg font-semibold text-slate-900 cursor-pointer">{f.question}</summary><p className="mt-4 text-slate-700 leading-relaxed">{f.answer}</p></details>))}</div>
        </div>
      </section>
      <section className="py-16 bg-gradient-to-br from-blue-600 to-purple-600">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Book a free demo from Thrissur</h2>
          <a href={wa} className="inline-flex items-center gap-2 bg-white text-blue-700 px-8 py-4 rounded-xl font-semibold text-lg" target="_blank" rel="noopener noreferrer">WhatsApp +91 88264-44334</a>
        </div>
      </section>
    </main>
  )
}
