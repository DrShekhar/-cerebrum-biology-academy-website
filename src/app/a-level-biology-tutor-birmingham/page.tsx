import type { Metadata } from 'next'
import Link from 'next/link'
import { CerebrumPersonSchema } from '@/components/seo/CerebrumPersonSchema'
import { FAQSchema } from '@/components/seo/FAQSchema'
import { BreadcrumbSchema } from '@/components/seo/BreadcrumbSchema'

const PAGE_URL = 'https://cerebrumbiologyacademy.com/a-level-biology-tutor-birmingham'

export const metadata: Metadata = {
  title: 'A-Level Biology Tutor Birmingham | AQA, Edexcel | Cerebrum',
  description: "A-Level Biology tutoring for Birmingham sixth-formers — AQA, Edexcel, OCR. AIIMS-trained faculty, GMT evenings. A* targeting for UCAS Medicine.",
  keywords: ['A-Level biology tutor Birmingham', 'AQA biology tutor Birmingham', 'Edexcel biology tutor Birmingham', 'UCAS medicine biology Birmingham'],
  alternates: { canonical: PAGE_URL },
  openGraph: { title: 'A-Level Biology Tutor Birmingham | AQA, Edexcel | Cerebrum | Cerebrum', description: "A-Level Biology tutoring for Birmingham sixth-formers — AQA, Edexcel, OCR. AIIMS-trained faculty, GMT evenings. A* targeting for UCAS Medicine.", url: PAGE_URL, locale: 'en_GB', type: 'website' },

  twitter: {
    card: 'summary_large_image' as const,
    title: 'A-Level Biology Tutor Birmingham | AQA, Edexcel | Cerebrum',
    description: 'A-Level Biology tutoring for Birmingham sixth-formers — AQA, Edexcel, OCR. AIIMS-trained faculty, GMT evenings. A* targeting for UCAS Medicine.',
  },
}

const wa = 'https://wa.me/918826444334?text=' + encodeURIComponent("Hi — I'm in Birmingham and looking for A-Level Biology tutoring. Please share programme details and pricing.")

const faqs = [
  { question: 'Which exam boards do you cover for Birmingham students?', answer: 'AQA (most common in Birmingham state schools), Edexcel/Pearson, OCR A, and OCR B. We match to your school\'s specification.' },
  { question: 'Can you help with UCAS Medicine alongside A-Level Biology?', answer: 'Yes — A* Biology is the baseline for UK medical schools. We coach for A*/Grade 9 and advise on BMAT/UCAT preparation.' },
  { question: 'What does A-Level Biology tutoring cost?', answer: 'Pursuit £2,000/yr (group, monthly 1:1). Ascent £3,500/yr (bi-weekly 1:1). Pinnacle £5,000/yr (weekly 1:1, A* targeting). GBP bank transfer accepted.' },
  { question: 'GMT evening sessions for Birmingham?', answer: 'Weekday 5–8 PM GMT. Weekend 10 AM–12 PM. Fits standard Birmingham sixth-form schedules.' },
]

export default function Page() {
  return (
    <main className="min-h-screen bg-white">
      <CerebrumPersonSchema knowsAbout={['A-Level Biology Birmingham', 'AQA Biology', 'UCAS Medicine']} />
      <FAQSchema questions={faqs} pageUrl={PAGE_URL} />
      <BreadcrumbSchema items={[{ label: 'A-Level Biology', href: '/a-level-biology-tutor' }, { label: 'Birmingham', isCurrentPage: true }]} showSchemaOnly />

      <section className="bg-gradient-to-br from-green-900 to-emerald-800 py-16 md:py-24">
        <div className="max-w-5xl mx-auto px-4">
          <nav className="text-sm text-green-300 mb-6" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-white">Home</Link><span className="mx-2">/</span>
            <Link href="/a-level-biology-tutor" className="hover:text-white">A-Level Biology</Link><span className="mx-2">/</span>
            <span className="text-white">Birmingham</span>
          </nav>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">A-Level Biology Tutor for Birmingham Students</h1>
          <p className="text-xl text-green-200 mb-6 max-w-3xl">A-Level Biology tutoring for Birmingham sixth-formers — AQA, Edexcel, OCR. AIIMS-trained faculty, GMT evenings. A* targeting for UCAS Medicine. £2,000–£5,000/yr.</p>
          <a href={wa} className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-xl font-semibold" target="_blank" rel="noopener noreferrer">WhatsApp +91 88264-44334</a>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 prose prose-slate max-w-none">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Why Birmingham families choose A-Level Biology coaching</h2>
          <p>Birmingham is the Midlands' largest A-Level Biology market. King Edward's School (one of the UK's top 10 boys' schools), the KE Foundation schools, and the strong Solihull/Sutton Coldfield grammar belt create a competitive A-Level Biology cohort. University of Birmingham Medical School and Warwick Medical School (graduate entry) are the primary targets. Handsworth, Sparkbrook, and Edgbaston have one of the UK's largest South Asian communities driving pre-medical demand.</p>

          <h2 className="text-3xl font-bold text-slate-900 mt-12 mb-4">Birmingham schools we serve</h2>
          <p>King Edward's School, King Edward VI High School for Girls, Solihull School, Edgbaston High School, Bishop Vesey's Grammar, Sutton Coldfield Grammar, Handsworth Grammar, Joseph Chamberlain Sixth Form, King Edward VI College Stourbridge.</p>

          <h2 className="text-3xl font-bold text-slate-900 mt-12 mb-4">A-Level Biology pricing (GBP)</h2>
          <ul>
            <li><strong>A-Level Biology — Pursuit: £2,000/yr.</strong> Group batch, monthly 1:1, all exam boards.</li>
            <li><strong>A-Level Biology — Ascent: £3,500/yr.</strong> Smaller batch, bi-weekly 1:1, past-paper drilling.</li>
            <li><strong>A-Level Biology — Pinnacle: £5,000/yr.</strong> Premium, weekly 1:1, A* targeting, UCAS support.</li>
          </ul>

          <h2 className="text-3xl font-bold text-slate-900 mt-12 mb-4">Related programmes</h2>
          <ul>
            <li><Link href="/gamsat-biology-tutor-birmingham" className="text-blue-600 hover:underline">GAMSAT Birmingham</Link></li>
            <li><Link href="/a-level-biology-tutor" className="text-blue-600 hover:underline">A-Level Biology Hub</Link></li>
            <li><Link href="/bbo-biology-olympiad-coaching" className="text-blue-600 hover:underline">BBO Coaching</Link></li>
          </ul>
        </div>
      </section>

      <section className="py-16 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-slate-900 mb-8">FAQs from Birmingham families</h2>
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

      <section className="py-16 bg-gradient-to-br from-green-600 to-emerald-600">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Start A-Level Biology tutoring from Birmingham</h2>
          <a href={wa} className="inline-flex items-center gap-2 bg-white text-green-700 px-8 py-4 rounded-xl font-semibold text-lg" target="_blank" rel="noopener noreferrer">WhatsApp +91 88264-44334</a>
        </div>
      </section>
    </main>
  )
}
