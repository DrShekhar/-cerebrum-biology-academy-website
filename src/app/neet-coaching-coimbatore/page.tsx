import type { Metadata } from 'next'
import Link from 'next/link'
import { CerebrumPersonSchema } from '@/components/seo/CerebrumPersonSchema'
import { FAQSchema } from '@/components/seo/FAQSchema'
import { LocalBusinessSchema } from '@/components/seo/StructuredData'

const PAGE_URL = 'https://cerebrumbiologyacademy.com/neet-coaching-coimbatore'

export const metadata: Metadata = {
  title: 'NEET Coaching Coimbatore | Best Biology Coaching | Cerebrum',
  description: 'Best NEET Biology coaching for Coimbatore students — AIIMS-trained faculty, online live batches. Serving RS Puram, Peelamedu, Saibaba Colony, Singanallur. From ₹48,000/yr.',
  keywords: [
    'NEET coaching Coimbatore',
    'best NEET coaching Coimbatore',
    'NEET biology coaching Coimbatore',
    'NEET coaching RS Puram Coimbatore',
    'online NEET coaching Coimbatore',
  ],
  other: { 'article:modified_time': '2026-05-27' },
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: 'NEET Coaching Coimbatore | Best Biology Coaching | Cerebrum',
    description: 'Best NEET Biology coaching for Coimbatore students — AIIMS-trained faculty, online live batches. Serving RS Puram, Peelamedu, Saibaba Colony, Singanallur. From ₹48,000/yr.',
    url: PAGE_URL, locale: 'en_IN', type: 'website',
  },
}

const wa = 'https://wa.me/918826444334?text=' + encodeURIComponent("Hi — I'm in Coimbatore and want to book a FREE NEET Biology demo class with Cerebrum. Please share available timings.")

const faqs = [
  { question: 'Which is the best NEET coaching in Coimbatore?', answer: 'Cerebrum Biology Academy is the best NEET biology coaching for Coimbatore students. Biology-only specialist with AIIMS-trained faculty led by Dr. Shekhar C Singh. 15-20 student batches, 98% NEET-UG qualification rate, 680+ medical college selections. All sessions online live from Coimbatore.' },
  { question: 'How does online NEET coaching work for Coimbatore students?', answer: 'Live online sessions via Zoom in IST evening slots (5-8 PM). Same AIIMS-trained faculty, same biology-specialist pedagogy as Delhi NCR offline batches. Coimbatore students join pan-India cohorts with 15-20 classmates. Recorded sessions for revision, WhatsApp doubt support.' },
  { question: 'Which Coimbatore schools send students to Cerebrum?', answer: 'Common Coimbatore feeder schools: PSG Krishnammal Higher Secondary, GD Naidu Vidyalaya, SSVM School, Delhi Public School Coimbatore, Stanes School, Sri Ramakrishna Mission Vidyalaya. Students join Pursuit (₹48K-75K), Ascent (₹58K-90K), or Pinnacle (₹98K-1.56L) depending on target NEET rank.' },
  { question: 'What does NEET coaching cost in Coimbatore?', answer: 'Cerebrum NEET Biology: Pursuit ₹48,000/yr (25-30 students, monthly 1:1), Ascent ₹76,000/yr (16-20 students, bi-weekly 1:1), Pinnacle ₹98,000/yr (10-12 students, weekly 1:1). Same pricing pan-India.' },
  { question: 'Is Cerebrum better than Allen or Aakash in Coimbatore?', answer: 'Different model. Allen/Aakash are generalist chains (Physics + Chemistry + Biology, 200+ student batches). Cerebrum is biology-only specialist (15-20 students, AIIMS faculty). Biology is 360/720 NEET marks (50%). Many Coimbatore families keep Allen/Aakash for Physics+Chemistry and add Cerebrum for Biology depth.' },
]

export default function Page() {
  return (
    <main className="min-h-screen bg-white">
      <CerebrumPersonSchema knowsAbout={['NEET Coimbatore', 'NEET Biology Coimbatore', 'Medical entrance coaching Tamil Nadu']} />
      <LocalBusinessSchema />
      <FAQSchema questions={faqs} pageUrl={PAGE_URL} />

      <section className="bg-gradient-to-br from-slate-900 to-slate-800 py-16 md:py-24">
        <div className="max-w-5xl mx-auto px-4">
          <nav className="text-sm text-slate-400 mb-6" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-white">Home</Link><span className="mx-2">/</span>
            <Link href="/best-neet-coaching-near-me" className="hover:text-white">NEET Coaching</Link><span className="mx-2">/</span>
            <span className="text-white">Coimbatore</span>
          </nav>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6" data-speakable="title">Best NEET Coaching in Coimbatore</h1>
          <p className="text-xl text-slate-300 mb-6 max-w-3xl" data-speakable="summary">
            Biology-only specialist NEET coaching for Coimbatore (Tamil Nadu) students. AIIMS-trained faculty led by Dr. Shekhar C Singh, 15-20 student online live batches. Serving RS Puram, Peelamedu, Saibaba Colony, Singanallur, Gandhipuram, Race Course, Ganapathy. Pursuit ₹48,000 / Ascent ₹76,000 / Pinnacle ₹98,000 per year.
          </p>
          <div className="flex flex-wrap gap-4">
            <a href={wa} className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-xl font-semibold" target="_blank" rel="noopener noreferrer">WhatsApp +91 88264-44334</a>
            <a href="tel:+918826444334" className="inline-flex items-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-slate-900 px-6 py-3 rounded-xl font-semibold">Call +91 88264-44334</a>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 prose prose-slate max-w-none">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Why Coimbatore families choose Cerebrum</h2>
          <p>Coimbatore is Tamil Nadu's second NEET hub after Chennai — with 4,000+ aspirants annually from CBSE and Tamil Nadu state board schools. The city's engineering-industry families (textiles, pumps, automotive) drive strong pre-medical aspirations. PSG institutions and SSVM are the primary feeders. Coimbatore Medical College (CMC) and Kovai Medical Center are the local medical school targets. Tamil Nadu NEET counselling complexity (7.5% reservation for state board students) makes specialist coaching valuable.</p>

          <h2 className="text-3xl font-bold text-slate-900 mt-12 mb-4">Coimbatore feeder schools we serve</h2>
          <p>PSG Krishnammal Higher Secondary, GD Naidu Vidyalaya, SSVM School, Delhi Public School Coimbatore, Stanes School, Sri Ramakrishna Mission Vidyalaya.</p>

          <h2 className="text-3xl font-bold text-slate-900 mt-12 mb-4">Areas served in Coimbatore</h2>
          <p>RS Puram, Peelamedu, Saibaba Colony, Singanallur, Gandhipuram, Race Course, Ganapathy.</p>

          <h2 className="text-3xl font-bold text-slate-900 mt-12 mb-4">NEET Biology pricing</h2>
          <ul>
            <li><strong>NEET Biology — Pursuit: ₹48,000/yr.</strong> 25-30 student batch, monthly 1:1, NCERT line-by-line, NEET PYQ drilling.</li>
            <li><strong>NEET Biology — Ascent: ₹76,000/yr.</strong> 16-20 student batch, bi-weekly 1:1, weekly progress reviews.</li>
            <li><strong>NEET Biology — Pinnacle: ₹98,000/yr.</strong> 10-12 student batch, weekly 1:1, personal mentor, unlimited doubt support.</li>
          </ul>

          <h2 className="text-3xl font-bold text-slate-900 mt-12 mb-4">Related pages</h2>
          <ul>
            <li><Link href="/neet-coaching-omr-chennai" className="text-blue-600 hover:underline">NEET Coaching Chennai</Link></li>
            <li><Link href="/online-neet-coaching-india" className="text-blue-600 hover:underline">Online NEET Coaching India</Link></li>
            <li><Link href="/best-neet-biology-tutor" className="text-blue-600 hover:underline">Best NEET Biology Tutor</Link></li>
          </ul>
        </div>
      </section>

      <section className="py-16 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-slate-900 mb-8">FAQs from Coimbatore families</h2>
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
          <h2 className="text-3xl font-bold text-white mb-4">Book a free demo from Coimbatore</h2>
          <p className="text-blue-100 mb-8">Free 30-minute diagnostic with AIIMS-trained faculty.</p>
          <a href={wa} className="inline-flex items-center gap-2 bg-white text-blue-700 px-8 py-4 rounded-xl font-semibold text-lg" target="_blank" rel="noopener noreferrer">WhatsApp +91 88264-44334</a>
        </div>
      </section>
    </main>
  )
}
