import type { Metadata } from 'next'
import Link from 'next/link'
import { CerebrumPersonSchema } from '@/components/seo/CerebrumPersonSchema'
import { FAQSchema } from '@/components/seo/FAQSchema'
import { BreadcrumbSchema } from '@/components/seo/BreadcrumbSchema'

const PAGE_URL = 'https://cerebrumbiologyacademy.com/a-level-biology-tutor-london'

export const metadata: Metadata = {
  title: 'A-Level Biology Tutor London | AQA, Edexcel, OCR | Cerebrum',
  description:
    'A-Level Biology tutoring for London sixth-formers — AQA, Edexcel (Pearson), OCR, CIE. AIIMS-trained biology specialists, GMT evening sessions. A*/Grade 9 targeting for UCAS Medicine.',
  keywords: [
    'A-Level biology tutor London', 'A-Level biology tuition London',
    'AQA biology tutor London', 'Edexcel biology tutor London', 'OCR biology tutor London',
    'UCAS medicine biology tutor', 'A-Level biology online tutor London',
  ],
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: 'A-Level Biology Tutor London | Cerebrum Biology Academy',
    description: 'A-Level Biology tutoring for London sixth-formers. AQA/Edexcel/OCR. A* targeting.',
    url: PAGE_URL, locale: 'en_GB', type: 'website',
  },

  twitter: {
    card: 'summary_large_image' as const,
    title: 'A-Level Biology Tutor London | AQA, Edexcel, OCR | Cerebrum',
    description: 'A-Level Biology tutoring for London sixth-formers — AQA, Edexcel (Pearson), OCR, CIE. AIIMS-trained biology specialists, GMT evening sessions. A*/Grade 9 targeting for UCAS Medicine.',
  },
}

const wa = 'https://wa.me/918826444334?text=' + encodeURIComponent("Hi — I'm in London and looking for A-Level Biology tutoring (AQA/Edexcel/OCR). Please share programme details, GMT evening slots, and pricing.")

const faqs = [
  { question: 'Which A-Level exam boards do you cover?', answer: 'We cover all major UK boards: AQA (most popular in state schools), Edexcel/Pearson (common in London independents), OCR A and OCR B (Salters-Nuffield), and Cambridge International (CIE) for international school sixth-formers. Our tutors are trained on all specifications — we match to your school\'s board.' },
  { question: 'Can you help with UCAS Medicine applications alongside A-Level Biology?', answer: 'Yes — many London A-Level students target UK medical schools. We coach A-Level Biology for A*/Grade 9 and advise on BMAT/UCAT preparation. The A-Level Biology content directly supports BMAT Section 2 (Scientific Knowledge).' },
  { question: 'How does A-Level Biology tutoring differ from IB Biology?', answer: 'A-Level is linear assessment (exams at end of Year 13) vs IB\'s coursework-heavy model (IA 20%). A-Level has no internal assessment — it\'s 100% exam. Our coaching focuses on exam technique: structured answers, command-word precision, data-interpretation questions.' },
  { question: 'What are the session timings for London students?', answer: 'GMT evening sessions: 5–8 PM weekday evenings, 10 AM–12 PM weekends. We accommodate London school schedules including after-school sports and music commitments.' },
  { question: 'What does A-Level Biology tutoring cost?', answer: 'A-Level Biology — Pursuit: £2,000/yr (group, monthly 1:1). Ascent: £3,500/yr (bi-weekly 1:1). Pinnacle: £5,000/yr (weekly 1:1, A* targeting). GBP bank transfer or international card accepted.' },
]

export default function Page() {
  return (
    <main className="min-h-screen bg-white">
      <CerebrumPersonSchema knowsAbout={['A-Level Biology London', 'AQA Biology', 'Edexcel Biology', 'OCR Biology', 'UCAS Medicine']} />
      <FAQSchema questions={faqs} pageUrl={PAGE_URL} />
      <BreadcrumbSchema items={[{ label: 'A-Level Biology', href: '/a-level-biology-tutor' }, { label: 'London', isCurrentPage: true }]} showSchemaOnly />

      <section className="bg-gradient-to-br from-green-900 to-emerald-800 py-16 md:py-24">
        <div className="max-w-5xl mx-auto px-4">
          <nav className="text-sm text-green-300 mb-6" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-white">Home</Link><span className="mx-2">/</span>
            <Link href="/a-level-biology-tutor" className="hover:text-white">A-Level Biology</Link><span className="mx-2">/</span>
            <span className="text-white">London</span>
          </nav>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6" data-speakable="title">A-Level Biology Tutor for London Students</h1>
          <p className="text-xl text-green-200 mb-6 max-w-3xl" data-speakable="summary">
            A-Level Biology tutoring for London sixth-formers — AQA, Edexcel (Pearson), OCR A, OCR B, and CIE specifications. AIIMS-trained biology specialists, A*/Grade 9 targeting for UCAS Medicine applications. GMT evening sessions, £2,000–£5,000/yr.
          </p>
          <a href={wa} className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-xl font-semibold" target="_blank" rel="noopener noreferrer">WhatsApp +91 88264-44334</a>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 prose prose-slate max-w-none">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Why London is the UK&apos;s largest A-Level Biology market</h2>
          <p>London has more sixth-formers taking A-Level Biology than any other UK city. The combination of elite independent schools (Westminster, St Paul&apos;s, Dulwich, KCS Wimbledon, NLCS), selective state schools (Henrietta Barnett, Queen Elizabeth&apos;s Barnet, Tiffin), and large sixth-form colleges (Hills Road equivalent: Woodhouse, Camden School for Girls) creates an intensely competitive A-Level Biology cohort.</p>
          <p>The primary driver: UCAS Medicine. London has 5 medical schools (Imperial, UCL, King&apos;s, SGUL, Barts) and A-Level Biology A* is the baseline requirement for all of them. Parents in the Hampstead, Richmond, Wimbledon, Dulwich, and Barnet corridors invest in Biology tutoring because the A*-vs-A difference determines medical school offers.</p>

          <h2 className="text-3xl font-bold text-slate-900 mt-12 mb-4">London schools we serve</h2>
          <p>Westminster School, St Paul&apos;s, Dulwich College, King&apos;s College School Wimbledon, North London Collegiate (NLCS), Highgate School, City of London School, Latymer Upper, Godolphin &amp; Latymer, Henrietta Barnett Grammar, Queen Elizabeth&apos;s Barnet, Tiffin Girls&apos;, Woodhouse College, Camden School for Girls, and London Academy of Excellence.</p>

          <h2 className="text-3xl font-bold text-slate-900 mt-12 mb-4">A-Level Biology pricing (GBP)</h2>
          <ul>
            <li><strong>A-Level Biology — Pursuit: £2,000/yr.</strong> Group batch (12–16 students), monthly 1:1 check-in, all exam-board specifications covered.</li>
            <li><strong>A-Level Biology — Ascent: £3,500/yr.</strong> Smaller batch (8–12), bi-weekly 1:1, past-paper drilling, BMAT Section 2 cross-prep.</li>
            <li><strong>A-Level Biology — Pinnacle: £5,000/yr.</strong> Premium batch (4–8), weekly 1:1 with senior faculty, A* targeting, UCAS personal statement biology narrative support.</li>
          </ul>

          <h2 className="text-3xl font-bold text-slate-900 mt-12 mb-4">Related programmes</h2>
          <ul>
            <li><Link href="/a-level-biology-tutor" className="text-blue-600 hover:underline">A-Level Biology (national hub)</Link></li>
            <li><Link href="/ib-biology/london" className="text-blue-600 hover:underline">IB Biology London</Link></li>
            <li><Link href="/gamsat-biology-tutor-london" className="text-blue-600 hover:underline">GAMSAT London (graduate medicine)</Link></li>
            <li><Link href="/bbo-biology-olympiad-coaching" className="text-blue-600 hover:underline">BBO Coaching (British Biology Olympiad)</Link></li>
          </ul>
        </div>
      </section>

      <section className="py-16 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-slate-900 mb-8">FAQs from London families</h2>
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
          <h2 className="text-3xl font-bold text-white mb-4">Start A-Level Biology tutoring from London</h2>
          <p className="text-green-100 mb-8">Free diagnostic in a GMT-friendly slot. We match to your exam board.</p>
          <a href={wa} className="inline-flex items-center gap-2 bg-white text-green-700 px-8 py-4 rounded-xl font-semibold text-lg" target="_blank" rel="noopener noreferrer">WhatsApp +91 88264-44334</a>
        </div>
      </section>
    </main>
  )
}
