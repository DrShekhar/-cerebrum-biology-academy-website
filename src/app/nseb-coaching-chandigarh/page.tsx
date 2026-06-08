import type { Metadata } from 'next'
import Link from 'next/link'
import { CerebrumPersonSchema } from '@/components/seo/CerebrumPersonSchema'
import { FAQSchema } from '@/components/seo/FAQSchema'

const PAGE_URL = 'https://cerebrumbiologyacademy.com/nseb-coaching-chandigarh'

export const metadata: Metadata = {
  title: 'NSEB Coaching Chandigarh | Biology Olympiad Preparation | Cerebrum',
  description: 'NSEB (National Standard Examination in Biology) coaching for Chandigarh students. NSEB → INBO → OCSC → IBO pathway. AIIMS-trained faculty, online live.',
  keywords: ['NSEB coaching chandigarh', 'biology olympiad chandigarh', 'NSEB preparation chandigarh', 'INBO coaching chandigarh', 'IBO preparation chandigarh'],
  alternates: { canonical: PAGE_URL },
  openGraph: { title: 'NSEB Coaching Chandigarh | Cerebrum', url: PAGE_URL, locale: 'en_IN', type: 'website' },

  twitter: {
    card: 'summary_large_image' as const,
    title: 'NSEB Coaching Chandigarh | Biology Olympiad Preparation | Cerebrum',
    description: 'NSEB (National Standard Examination in Biology) coaching for Chandigarh students. NSEB → INBO → OCSC → IBO pathway. AIIMS-trained faculty, online live.',
  },
}

const wa = 'https://wa.me/918826444334?text=' + encodeURIComponent("Hi — my child in Chandigarh is interested in NSEB/Biology Olympiad coaching. Please share programme details.")

const faqs = [
  { question: 'What is NSEB and how does it lead to IBO?', answer: 'NSEB (National Standard Examination in Biology) is the first stage of India\'s Biology Olympiad pathway: NSEB → INBO (Indian National Biology Olympiad) → OCSC (Orientation-cum-Selection Camp) → IBO (International Biology Olympiad). Top ~300 NSEB scorers qualify for INBO. Top 35 INBO students attend OCSC at HBCSE Mumbai. 4 students represent India at IBO.' },
  { question: 'How does NSEB coaching work from Chandigarh?', answer: 'Live online sessions via Zoom, IST evenings and weekends. Campbell Biology + Alberts Molecular Biology depth. Weekly past-paper drilling. Chandigarh students join pan-India NSEB cohort.' },
  { question: 'What does NSEB coaching cost?', answer: 'Biology Olympiad: Pursuit Rs 2,500/yr (group, weekend sessions). Ascent Rs 4,500/yr (bi-weekly 1:1). Pinnacle Rs 6,000/yr (weekly 1:1 elite mentoring).' },
  { question: 'Can NSEB coaching run alongside NEET preparation?', answer: 'Yes — NSEB syllabus overlaps ~70% with NEET Biology. The additional depth (molecular biology, genetics, ecology at university level) actually strengthens NEET scores. Many students do both.' },
]

export default function Page() {
  return (
    <main className="min-h-screen bg-white">
      <CerebrumPersonSchema knowsAbout={['NSEB Chandigarh', 'Biology Olympiad Chandigarh', 'INBO preparation', 'IBO coaching']} />
      <FAQSchema questions={faqs} pageUrl={PAGE_URL} />
      <section className="bg-gradient-to-br from-amber-900 to-yellow-800 py-16 md:py-24">
        <div className="max-w-5xl mx-auto px-4">
          <nav className="text-sm text-amber-300 mb-6" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-white">Home</Link><span className="mx-2">/</span>
            <Link href="/nseb-coaching" className="hover:text-white">NSEB Coaching</Link><span className="mx-2">/</span>
            <span className="text-white">Chandigarh</span>
          </nav>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">NSEB Coaching for Chandigarh Students</h1>
          <p className="text-xl text-amber-200 mb-6 max-w-3xl">Biology Olympiad coaching for Chandigarh (Chandigarh). NSEB → INBO → OCSC → IBO pathway. AIIMS-trained faculty, Campbell + Alberts depth. Online live. Pursuit Rs 2,500/yr to Pinnacle Rs 6,000/yr.</p>
          <a href={wa} className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-xl font-semibold" target="_blank" rel="noopener noreferrer">WhatsApp +91 88264-44334</a>
        </div>
      </section>
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 prose prose-slate max-w-none">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">NSEB → INBO → IBO pathway from Chandigarh</h2>
          <p>The Indian Biology Olympiad pathway starts with NSEB (typically November). Top ~300 national scorers qualify for INBO (February). Top 35 INBO students attend OCSC at HBCSE Mumbai. 4 students are selected for India&apos;s IBO team. Cerebrum coaches the full pathway with Campbell Biology (canonical), Alberts Molecular Biology of the Cell (Semifinal depth), and Lehninger Biochemistry.</p>
          <h2 className="text-3xl font-bold text-slate-900 mt-12 mb-4">Related pages</h2>
          <ul>
            <li><Link href="/nseb-coaching" className="text-blue-600 hover:underline">NSEB Coaching Hub</Link></li>
            <li><Link href="/inbo-coaching" className="text-blue-600 hover:underline">INBO Coaching</Link></li>
            <li><Link href="/ibo-preparation" className="text-blue-600 hover:underline">IBO Preparation</Link></li>
            <li><Link href="/neet-coaching-chandigarh" className="text-blue-600 hover:underline">NEET Coaching Chandigarh</Link></li>
          </ul>
        </div>
      </section>
      <section className="py-16 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-slate-900 mb-8">FAQs</h2>
          <div className="space-y-6">{faqs.map((f, i) => (<details key={i} className="bg-white rounded-xl p-6 border border-slate-200"><summary className="text-lg font-semibold text-slate-900 cursor-pointer">{f.question}</summary><p className="mt-4 text-slate-700 leading-relaxed">{f.answer}</p></details>))}</div>
        </div>
      </section>
      <section className="py-16 bg-gradient-to-br from-amber-600 to-yellow-600">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Start NSEB Coaching from Chandigarh</h2>
          <a href={wa} className="inline-flex items-center gap-2 bg-white text-amber-700 px-8 py-4 rounded-xl font-semibold text-lg" target="_blank" rel="noopener noreferrer">WhatsApp +91 88264-44334</a>
        </div>
      </section>
    </main>
  )
}
