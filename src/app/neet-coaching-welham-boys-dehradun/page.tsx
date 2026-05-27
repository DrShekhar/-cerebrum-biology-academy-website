import type { Metadata } from 'next'
import Link from 'next/link'
import { CerebrumPersonSchema } from '@/components/seo/CerebrumPersonSchema'
import { FAQSchema } from '@/components/seo/FAQSchema'
import { LocalBusinessSchema } from '@/components/seo/StructuredData'

const PAGE_URL = 'https://cerebrumbiologyacademy.com/neet-coaching-welham-boys-dehradun'

export const metadata: Metadata = {
  title: 'NEET Coaching for Welham Boys School Students | Cerebrum Biology',
  description: 'NEET Biology coaching for Welham Boys School (Dehradun) boarding students. AIIMS-trained faculty, hostel-friendly evening sessions. ICSE / ISC to NEET bridge.',
  keywords: ['NEET coaching welham boys', 'NEET coaching welham boys school', 'welham boys NEET preparation', 'biology coaching welham boys students', 'boarding school NEET coaching dehradun'],
  other: { 'article:modified_time': '2026-05-27' },
  alternates: { canonical: PAGE_URL },
  openGraph: { title: 'NEET Coaching for Welham Boys School | Cerebrum', description: 'NEET Biology for Welham Boys School boarding students.', url: PAGE_URL, locale: 'en_IN', type: 'website' },
}

const wa = 'https://wa.me/918826444334?text=' + encodeURIComponent("Hi — my child is at Welham Boys School (Dehradun) and I want NEET Biology coaching. Please share batch details and hostel-friendly timings.")

const faqs = [
  { question: "How does Cerebrum complement Welham Boys ISC Biology?", answer: "Welham Boys' ISC Biology is solid for board exams but not sufficient for NEET's MCQ format. We add: NEET-specific MCQ drilling (assertion-reason, match-the-following), high-yield chapter deep-dives (Human Physiology, Genetics — 40% of NEET marks), and monthly full-length NEET mocks that ISC exams don't simulate." },
  { question: "Welham Boys boarding schedule — when are sessions?", answer: "Evening study: 7-9 PM IST (ideal for 90-min sessions). Weekend mornings: 10 AM-12 PM for mock tests and doubt-clearing. We coordinate around Welham's activity schedule (sports 4-5:30 PM, prep 7-9 PM)." },
  { question: "What does it cost?", answer: "Pursuit Rs 48,000/yr (group, monthly 1:1). Ascent Rs 76,000/yr (bi-weekly 1:1). Pinnacle Rs 98,000/yr (weekly 1:1). Most Welham families choose Ascent or Pinnacle." },
]

export default function Page() {
  return (
    <main className="min-h-screen bg-white">
      <CerebrumPersonSchema knowsAbout={['NEET Welham Boys School', 'NEET coaching boarding school Dehradun', 'ICSE / ISC to NEET bridge']} />
      <LocalBusinessSchema />
      <FAQSchema questions={faqs} pageUrl={PAGE_URL} />

      <section className="bg-gradient-to-br from-amber-900 to-yellow-800 py-16 md:py-24">
        <div className="max-w-5xl mx-auto px-4">
          <nav className="text-sm text-amber-300 mb-6" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-white">Home</Link><span className="mx-2">/</span>
            <Link href="/neet-coaching-dehradun" className="hover:text-white">NEET Dehradun</Link><span className="mx-2">/</span>
            <span className="text-white">Welham Boys</span>
          </nav>
          <div className="flex items-center gap-3 mb-4">
            <span className="inline-flex items-center rounded-full bg-amber-500/20 px-3 py-1 text-sm font-medium text-amber-200">Est. 1937</span>
            <span className="inline-flex items-center rounded-full bg-green-500/20 px-3 py-1 text-sm font-medium text-green-200">Boys Boarding</span>
            <span className="inline-flex items-center rounded-full bg-blue-500/20 px-3 py-1 text-sm font-medium text-blue-200">ICSE / ISC</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">NEET Coaching for Welham Boys School Students</h1>
          <p className="text-xl text-amber-200 mb-6 max-w-3xl">
            Welham Boys School (founded 1937) is one of India's top boarding schools, located on Circular Road in Dehradun. The school has produced notable alumni including Rajiv Gandhi and several IAS toppers. W...
          </p>
          <div className="flex flex-wrap gap-4">
            <a href={wa} className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-xl font-semibold" target="_blank" rel="noopener noreferrer">WhatsApp +91 88264-44334</a>
            <a href="tel:+918826444334" className="inline-flex items-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-slate-900 px-6 py-3 rounded-xl font-semibold">Call +91 88264-44334</a>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 prose prose-slate max-w-none">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">About Welham Boys School and NEET preparation</h2>
          <p>Welham Boys School (founded 1937) is one of India's top boarding schools, located on Circular Road in Dehradun. The school has produced notable alumni including Rajiv Gandhi and several IAS toppers. Welham Boys' ISC Science stream is strong, but NEET-specific preparation requires additional coaching. The school's smaller class sizes (30-35 per section) mean teachers know each student — but NEET coaching needs the specialist biology depth that school teaching doesn't provide. Boarding students have predictable schedules that work well with online coaching.</p>

          <h2 className="text-3xl font-bold text-slate-900 mt-12 mb-4">Why boarding students need specialist NEET coaching</h2>
          <p>Boarding school students face a unique challenge: their school provides excellent all-round education, but NEET demands specific MCQ technique, high-yield chapter depth, and exam-pattern familiarity that school curricula (ICSE / ISC) don&apos;t cover. Cerebrum&apos;s biology-only specialist model fills this gap — 100% focused on Biology (360/720 NEET marks), delivered in hostel-friendly online sessions.</p>
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
          <h2 className="text-3xl font-bold text-slate-900 mb-8">FAQs from Welham Boys families</h2>
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
          <h2 className="text-3xl font-bold text-white mb-4">Book a free demo for Welham Boys students</h2>
          <p className="text-amber-100 mb-8">Hostel-friendly evening session. Free 30-minute diagnostic.</p>
          <a href={wa} className="inline-flex items-center gap-2 bg-white text-amber-700 px-8 py-4 rounded-xl font-semibold text-lg" target="_blank" rel="noopener noreferrer">WhatsApp +91 88264-44334</a>
        </div>
      </section>
    </main>
  )
}
