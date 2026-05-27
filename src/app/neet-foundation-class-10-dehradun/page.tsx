import type { Metadata } from 'next'
import Link from 'next/link'
import { CerebrumPersonSchema } from '@/components/seo/CerebrumPersonSchema'
import { FAQSchema } from '@/components/seo/FAQSchema'

const PAGE_URL = 'https://cerebrumbiologyacademy.com/neet-foundation-class-10-dehradun'

export const metadata: Metadata = {
  title: 'NEET Foundation Class 10 in Dehradun | AIIMS-Trained Online Live',
  description:
    'NEET Foundation Class 10 in Dehradun — AIIMS-trained faculty, online live. CBSE / ICSE / State Board + NEET parallel. Serving Rajpur Road, Clement Town, ISBT area. From Rs 35,000/year.',
  keywords: [
    'neet foundation class 10 dehradun',
    'class 10 biology coaching dehradun',
    'class 10 neet preparation dehradun',
    'best class 10 foundation dehradun',
    'online class 10 neet dehradun',
  ],
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: 'NEET Foundation Class 10 Dehradun | Cerebrum',
    description: 'NEET Foundation Class 10 in Dehradun. AIIMS-trained faculty, online live.',
    url: PAGE_URL, locale: 'en_IN', type: 'website',
  },
}

const wa = 'https://wa.me/918826444334?text=' + encodeURIComponent("Hi — I want to enroll my child (Class 10) in NEET Foundation from Dehradun. Please share batch details and demo timings.")

const faqs = [
  { question: 'Is Class 10 too early to start NEET preparation in Dehradun?', answer: 'No — Class 10 is the ideal time to build the Biology foundation that NEET demands. NCERT Class 10 Biology (cell biology, tissues, diversity in organisms) directly maps to NEET syllabus. Starting early gives Dehradun students a 2-3 year advantage over those who start in Class 11.' },
  { question: 'How does NEET Foundation work alongside CBSE / ICSE / State Board?', answer: 'Our Foundation programme runs parallel to school. Live online sessions in IST evening slots (5-7 PM weekdays, 10 AM-12 PM weekends). Content covers CBSE / ICSE / State Board Biology syllabus plus NEET-specific extensions. No conflict with school schedule.' },
  { question: 'What does NEET Foundation Class 10 cost in Dehradun?', answer: 'Foundation Pursuit: Rs 35,000/year. Foundation Ascent: Rs 50,000/year (bi-weekly 1:1). Foundation Pinnacle: Rs 70,000/year (weekly 1:1). Same pricing pan-India for online live.' },
  { question: 'Which Dehradun schools send students to Cerebrum Foundation?', answer: 'Students from CBSE, ICSE, and state board schools across Rajpur Road, Clement Town, ISBT area. The Foundation programme bridges school biology to NEET-level depth.' },
]

export default function Page() {
  return (
    <main className="min-h-screen bg-white">
      <CerebrumPersonSchema knowsAbout={['NEET Foundation Dehradun', 'Class 10 Biology Dehradun', 'Early NEET preparation Uttarakhand']} />
      <FAQSchema questions={faqs} pageUrl={PAGE_URL} />

      <section className="bg-gradient-to-br from-emerald-900 to-green-800 py-16 md:py-24">
        <div className="max-w-5xl mx-auto px-4">
          <nav className="text-sm text-emerald-300 mb-6" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-white">Home</Link><span className="mx-2">/</span>
            <Link href="/best-neet-foundation-tutor" className="hover:text-white">NEET Foundation</Link><span className="mx-2">/</span>
            <span className="text-white">Class 10 Dehradun</span>
          </nav>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">NEET Foundation Class 10 in Dehradun</h1>
          <p className="text-xl text-emerald-200 mb-6 max-w-3xl">
            Start NEET preparation early from Dehradun. AIIMS-trained faculty, CBSE / ICSE / State Board + NEET parallel, online live sessions. Serving Rajpur Road, Clement Town, ISBT area. Foundation from Rs 35,000/year.
          </p>
          <a href={wa} className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-xl font-semibold" target="_blank" rel="noopener noreferrer">WhatsApp +91 88264-44334</a>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 prose prose-slate max-w-none">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Why start NEET Foundation in Class 10 from Dehradun?</h2>
          <p>Class 10 is the ideal entry point for NEET preparation. NCERT Class 10 Biology covers foundational concepts (cell biology, tissues, diversity in living organisms, motion, force) that directly map to high-weightage NEET chapters. Students in Dehradun who start in Class 10 have a 2-3 year head start over those who begin in Class 11 — this compounds into 50-100 marks of advantage on exam day.</p>
          <p>Our Foundation programme runs parallel to CBSE / ICSE / State Board school curriculum. No conflict — we cover school syllabus plus NEET-specific extensions (MCQ technique, assertion-reason, diagram-based questions) in evening/weekend online live sessions.</p>

          <h2 className="text-3xl font-bold text-slate-900 mt-12 mb-4">Foundation pricing</h2>
          <ul>
            <li><strong>Foundation — Pursuit: Rs 35,000/year.</strong> Group batch, monthly 1:1 check-in.</li>
            <li><strong>Foundation — Ascent: Rs 50,000/year.</strong> Smaller batch, bi-weekly 1:1.</li>
            <li><strong>Foundation — Pinnacle: Rs 70,000/year.</strong> Premium, weekly 1:1 mentor.</li>
          </ul>

          <h2 className="text-3xl font-bold text-slate-900 mt-12 mb-4">Related pages</h2>
          <ul>
            <li><Link href="/neet-coaching-dehradun" className="text-blue-600 hover:underline">NEET Coaching Dehradun</Link></li>
            <li><Link href="/neet-foundation-class-9-dehradun" className="text-blue-600 hover:underline">Foundation Class 9 Dehradun</Link></li>
            <li><Link href="/best-neet-foundation-tutor" className="text-blue-600 hover:underline">Best NEET Foundation Tutor</Link></li>
          </ul>
        </div>
      </section>

      <section className="py-16 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-slate-900 mb-8">FAQs from Dehradun families</h2>
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

      <section className="py-16 bg-gradient-to-br from-emerald-600 to-green-600">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Start NEET Foundation from Dehradun</h2>
          <a href={wa} className="inline-flex items-center gap-2 bg-white text-emerald-700 px-8 py-4 rounded-xl font-semibold text-lg" target="_blank" rel="noopener noreferrer">WhatsApp +91 88264-44334</a>
        </div>
      </section>
    </main>
  )
}
