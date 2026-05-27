import type { Metadata } from 'next'
import Link from 'next/link'
import { CerebrumPersonSchema } from '@/components/seo/CerebrumPersonSchema'
import { FAQSchema } from '@/components/seo/FAQSchema'
import { LocalBusinessSchema } from '@/components/seo/StructuredData'

const PAGE_URL = 'https://cerebrumbiologyacademy.com/neet-coaching-woodstock-mussoorie'

export const metadata: Metadata = {
  title: 'NEET Coaching for Woodstock School Students | Cerebrum Biology',
  description: 'NEET Biology coaching for Woodstock School (Mussoorie) boarding students. AIIMS-trained faculty, hostel-friendly evening sessions. IB Diploma / AP to NEET bridge.',
  keywords: ['NEET coaching woodstock', 'NEET coaching woodstock school', 'woodstock NEET preparation', 'biology coaching woodstock students', 'boarding school NEET coaching mussoorie'],
  other: { 'article:modified_time': '2026-05-27' },
  alternates: { canonical: PAGE_URL },
  openGraph: { title: 'NEET Coaching for Woodstock School | Cerebrum', description: 'NEET Biology for Woodstock School boarding students.', url: PAGE_URL, locale: 'en_IN', type: 'website' },

  twitter: { card: 'summary_large_image' as const },
}

const wa = 'https://wa.me/918826444334?text=' + encodeURIComponent("Hi — my child is at Woodstock School (Mussoorie) and I want NEET Biology coaching. Please share batch details and hostel-friendly timings.")

const faqs = [
  { question: "Woodstock is IB/AP — does Cerebrum offer IB Biology coaching?", answer: "Yes — Cerebrum is one of the most established IB Biology tutors globally (86 cities, 78 school feeders). For Woodstock students, we offer IB Biology HL & SL coaching with IA mentorship, plus AP Biology FRQ rubric mastery. The Mussoorie location makes online coaching essential — no local IB tutors exist." },
  { question: "Can Woodstock students do NEET alongside IB/AP?", answer: "Some families keep NEET as a backup. IB Biology HL overlaps ~60% with NEET syllabus. We can run a dual-track: IB HL primary + NEET bridge coaching. This requires 2 additional sessions per week on top of IB prep." },
  { question: "Landour connectivity — will online sessions work?", answer: "Woodstock has institutional WiFi that handles Zoom adequately. We recommend wired ethernet for session stability. If connectivity drops, recorded sessions are available within 2 hours for catch-up. Most Woodstock families report stable 90-min sessions." },
  { question: "What does it cost?", answer: "IB Biology: Pinnacle $8,000/yr, Ascent $6,000/yr, Pursuit $3,500/yr. NEET bridge (if dual-track): additional Rs 48,000-98,000/yr depending on tier." },
]

export default function Page() {
  return (
    <main className="min-h-screen bg-white">
      <CerebrumPersonSchema knowsAbout={['NEET Woodstock School', 'NEET coaching boarding school Mussoorie', 'IB Diploma / AP to NEET bridge']} />
      <LocalBusinessSchema />
      <FAQSchema questions={faqs} pageUrl={PAGE_URL} />

      <section className="bg-gradient-to-br from-amber-900 to-yellow-800 py-16 md:py-24">
        <div className="max-w-5xl mx-auto px-4">
          <nav className="text-sm text-amber-300 mb-6" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-white">Home</Link><span className="mx-2">/</span>
            <Link href="/neet-coaching-dehradun" className="hover:text-white">NEET Dehradun</Link><span className="mx-2">/</span>
            <span className="text-white">Woodstock</span>
          </nav>
          <div className="flex items-center gap-3 mb-4">
            <span className="inline-flex items-center rounded-full bg-amber-500/20 px-3 py-1 text-sm font-medium text-amber-200">Est. 1854</span>
            <span className="inline-flex items-center rounded-full bg-green-500/20 px-3 py-1 text-sm font-medium text-green-200">Co-Ed International Boarding</span>
            <span className="inline-flex items-center rounded-full bg-blue-500/20 px-3 py-1 text-sm font-medium text-blue-200">IB Diploma / AP</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">NEET Coaching for Woodstock School Students</h1>
          <p className="text-xl text-amber-200 mb-6 max-w-3xl">
            Woodstock School (founded 1854) is Asia's oldest international boarding school, located in Landour, Mussoorie at 7,500 feet altitude. Woodstock offers the IB Diploma and AP courses — not ICSE/ISC. Thi...
          </p>
          <div className="flex flex-wrap gap-4">
            <a href={wa} className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-xl font-semibold" target="_blank" rel="noopener noreferrer">WhatsApp +91 88264-44334</a>
            <a href="tel:+918826444334" className="inline-flex items-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-slate-900 px-6 py-3 rounded-xl font-semibold">Call +91 88264-44334</a>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 prose prose-slate max-w-none">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">About Woodstock School and NEET preparation</h2>
          <p>Woodstock School (founded 1854) is Asia's oldest international boarding school, located in Landour, Mussoorie at 7,500 feet altitude. Woodstock offers the IB Diploma and AP courses — not ICSE/ISC. This makes Woodstock students unique in the Dehradun boarding school ecosystem: they need IB Biology HL/AP Biology coaching, not ISC-to-NEET bridging. Some Woodstock families also keep NEET as a backup for India medical admission alongside IB/AP applications to US/UK universities. The remote Landour location (30 km from Dehradun, poor mobile connectivity) makes online coaching the only viable option beyond school teaching.</p>

          <h2 className="text-3xl font-bold text-slate-900 mt-12 mb-4">Why boarding students need specialist NEET coaching</h2>
          <p>Boarding school students face a unique challenge: their school provides excellent all-round education, but NEET demands specific MCQ technique, high-yield chapter depth, and exam-pattern familiarity that school curricula (IB Diploma / AP) don&apos;t cover. Cerebrum&apos;s biology-only specialist model fills this gap — 100% focused on Biology (360/720 NEET marks), delivered in hostel-friendly online sessions.</p>
          <p>The boarding schedule is actually an advantage: structured evening study time (7-9 PM IST) provides consistent coaching windows. No commute, no travel — sessions happen from the hostel study room or library.</p>

          <h2 className="text-3xl font-bold text-slate-900 mt-12 mb-4">Related pages</h2>
          <ul>
            <li><Link href="/neet-coaching-dehradun" className="text-blue-600 hover:underline">NEET Coaching Dehradun</Link></li>
            <li><Link href="/neet-coaching-mussoorie" className="text-blue-600 hover:underline">NEET Coaching Mussoorie</Link></li>
            <li><Link href="/neet-dropper-batch-dehradun" className="text-blue-600 hover:underline">Dropper Batch Dehradun</Link></li>
            <li><Link href="/best-neet-biology-tutor" className="text-blue-600 hover:underline">Best NEET Biology Tutor</Link></li>
          </ul>
        </div>
      </section>

      <section className="py-16 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-slate-900 mb-8">FAQs from Woodstock families</h2>
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

      <section className="py-16 bg-gradient-to-br from-amber-600 to-yellow-600">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Book a free demo for Woodstock students</h2>
          <p className="text-amber-100 mb-8">Hostel-friendly evening session. Free 30-minute diagnostic.</p>
          <a href={wa} className="inline-flex items-center gap-2 bg-white text-amber-700 px-8 py-4 rounded-xl font-semibold text-lg" target="_blank" rel="noopener noreferrer">WhatsApp +91 88264-44334</a>
        </div>
      </section>
    </main>
  )
}
