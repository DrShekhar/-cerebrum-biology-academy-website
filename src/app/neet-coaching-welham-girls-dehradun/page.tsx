import type { Metadata } from 'next'
import Link from 'next/link'
import { CerebrumPersonSchema } from '@/components/seo/CerebrumPersonSchema'
import { FAQSchema } from '@/components/seo/FAQSchema'
import { LocalBusinessSchema } from '@/components/seo/StructuredData'

const PAGE_URL = 'https://cerebrumbiologyacademy.com/neet-coaching-welham-girls-dehradun'

export const metadata: Metadata = {
  title: 'NEET Coaching for Welham Girls School Students | Cerebrum Biology',
  description: 'NEET Biology coaching for Welham Girls School (Dehradun) boarding students. AIIMS-trained faculty, hostel-friendly evening sessions. ICSE / ISC to NEET bridge.',
  keywords: ['NEET coaching welham girls', 'NEET coaching welham girls school', 'welham girls NEET preparation', 'biology coaching welham girls students', 'boarding school NEET coaching dehradun'],
  other: { 'article:modified_time': '2026-05-27' },
  alternates: { canonical: PAGE_URL },
  openGraph: { title: 'NEET Coaching for Welham Girls School | Cerebrum', description: 'NEET Biology for Welham Girls School boarding students.', url: PAGE_URL, locale: 'en_IN', type: 'website' },

  twitter: { card: 'summary_large_image' as const },
}

const wa = 'https://wa.me/918826444334?text=' + encodeURIComponent("Hi — my child is at Welham Girls School (Dehradun) and I want NEET Biology coaching. Please share batch details and hostel-friendly timings.")

const faqs = [
  { question: "How does Cerebrum support Welham Girls NEET aspirants?", answer: "Welham Girls' pre-medical culture is strong. We complement the school's ISC Biology with NEET-specific MCQ technique, high-yield chapter drilling, and monthly mocks. The all-girls online batch provides a comfortable peer group for Biology discussions." },
  { question: "Evening session timings for Welham Girls?", answer: "Prep time: 7-9 PM IST. We schedule 90-min sessions within this window. Weekend mornings for mock tests. Welham Girls' Saturday activities end by 1 PM — afternoon sessions are also possible." },
  { question: "Do Welham Girls students target AIIMS specifically?", answer: "Many do — AIIMS Delhi is the aspirational target for Welham Girls pre-med students. We coach for the 680+ NEET score band that makes AIIMS competitive, with special focus on Biology 340+ (out of 360)." },
]

export default function Page() {
  return (
    <main className="min-h-screen bg-white">
      <CerebrumPersonSchema knowsAbout={['NEET Welham Girls School', 'NEET coaching boarding school Dehradun', 'ICSE / ISC to NEET bridge']} />
      <LocalBusinessSchema />
      <FAQSchema questions={faqs} pageUrl={PAGE_URL} />

      <section className="bg-gradient-to-br from-amber-900 to-yellow-800 py-16 md:py-24">
        <div className="max-w-5xl mx-auto px-4">
          <nav className="text-sm text-amber-300 mb-6" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-white">Home</Link><span className="mx-2">/</span>
            <Link href="/neet-coaching-dehradun" className="hover:text-white">NEET Dehradun</Link><span className="mx-2">/</span>
            <span className="text-white">Welham Girls</span>
          </nav>
          <div className="flex items-center gap-3 mb-4">
            <span className="inline-flex items-center rounded-full bg-amber-500/20 px-3 py-1 text-sm font-medium text-amber-200">Est. 1957</span>
            <span className="inline-flex items-center rounded-full bg-green-500/20 px-3 py-1 text-sm font-medium text-green-200">Girls Boarding</span>
            <span className="inline-flex items-center rounded-full bg-blue-500/20 px-3 py-1 text-sm font-medium text-blue-200">ICSE / ISC</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">NEET Coaching for Welham Girls School Students</h1>
          <p className="text-xl text-amber-200 mb-6 max-w-3xl">
            Welham Girls School (founded 1957) is India's most prestigious girls' boarding school, located on Municipal Road in Dehradun. The school is known for producing confident, independent-minded young wome...
          </p>
          <div className="flex flex-wrap gap-4">
            <a href={wa} className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-xl font-semibold" target="_blank" rel="noopener noreferrer">WhatsApp +91 88264-44334</a>
            <a href="tel:+918826444334" className="inline-flex items-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-slate-900 px-6 py-3 rounded-xl font-semibold">Call +91 88264-44334</a>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 prose prose-slate max-w-none">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">About Welham Girls School and NEET preparation</h2>
          <p>Welham Girls School (founded 1957) is India's most prestigious girls' boarding school, located on Municipal Road in Dehradun. The school is known for producing confident, independent-minded young women. Welham Girls has a stronger pre-medical culture than many boarding schools — several alumnae have gone on to become doctors at AIIMS, PGI Chandigarh, and armed forces medical colleges. The all-girls environment and structured boarding schedule make online coaching particularly effective.</p>

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
          <h2 className="text-3xl font-bold text-slate-900 mb-8">FAQs from Welham Girls families</h2>
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
          <h2 className="text-3xl font-bold text-white mb-4">Book a free demo for Welham Girls students</h2>
          <p className="text-amber-100 mb-8">Hostel-friendly evening session. Free 30-minute diagnostic.</p>
          <a href={wa} className="inline-flex items-center gap-2 bg-white text-amber-700 px-8 py-4 rounded-xl font-semibold text-lg" target="_blank" rel="noopener noreferrer">WhatsApp +91 88264-44334</a>
        </div>
      </section>
    </main>
  )
}
