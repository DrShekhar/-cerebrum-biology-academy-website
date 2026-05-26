import type { Metadata } from 'next'
import Link from 'next/link'

const PAGE_URL = 'https://cerebrumbiologyacademy.com/ib-biology-pricing'

export const metadata: Metadata = {
  title: 'IB Biology Pricing | HL & SL Tutoring Packages | Cerebrum',
  description: 'IB Biology tutoring pricing — $6,000/year Complete Programme, $8,000/year 1:1 Elite, $3,500/year Group Batch. 55 cities, local-currency options. 2025 syllabus, IA + EE coaching included.',
  keywords: [
    'IB biology pricing',
    'IB biology tutor cost',
    'IB biology coaching fees',
    'IB HL biology tutor price',
    'cerebrum IB biology pricing',
  ],
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: 'IB Biology Pricing | HL & SL Tutoring Packages | Cerebrum Biology Academy',
    description: 'IB Biology tutoring pricing — $6,000/year Complete Programme, $8,000/year 1:1 Elite, $3,500/year Group Batch. 55 cities, local-currency options. 2025 syllabus, IA + EE coaching included.',
    url: PAGE_URL,
    type: 'website',
  },
}

const wa = 'https://wa.me/918826444334?text=' + encodeURIComponent('Hi — I want to discuss IB Biology pricing and which tier fits my goals. Please share programme details.')

export default function Page() {
  return (
    <main className="min-h-screen bg-white">
      <section className="bg-gradient-to-br from-slate-900 to-slate-800 py-16 md:py-24">
        <div className="max-w-5xl mx-auto px-4">
          <nav className="text-sm text-slate-400 mb-6" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-white">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/ib-biology" className="hover:text-white">IB Biology</Link>
            <span className="mx-2">/</span>
            <span className="text-white">Pricing</span>
          </nav>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">IB Biology Pricing | HL & SL Tutoring Packages</h1>
          <p className="text-xl text-slate-300 mb-6 max-w-3xl">IB Biology tutoring pricing — $6,000/year Complete Programme, $8,000/year 1:1 Elite, $3,500/year Group Batch. 55 cities, local-currency options. 2025 syllabus, IA + EE coaching included.</p>
          <a href={wa} className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-xl font-semibold" target="_blank" rel="noopener noreferrer">
            WhatsApp +91 88264-44334
          </a>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-slate-900 mb-8">Cerebrum IB Biology Pricing</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-slate-50">
                  <th className="py-3 px-4 text-left text-sm font-semibold text-slate-700">Programme</th>
                  <th className="py-3 px-4 text-left text-sm font-semibold text-slate-700">Price</th>
                  <th className="py-3 px-4 text-left text-sm font-semibold text-slate-700">What You Get</th>
                </tr>
              </thead>
              <tbody>
            <tr className="border-b border-slate-100">
              <td className="py-3 px-4 font-medium text-slate-900">IB Biology — Ascent (2-year)</td>
              <td className="py-3 px-4 text-green-700 font-bold">$6,000/year</td>
              <td className="py-3 px-4 text-slate-600 text-sm">HL + SL, 150+ hours, small batch 4–8, IA guidance, past-paper bank</td>
            </tr>
            <tr className="border-b border-slate-100">
              <td className="py-3 px-4 font-medium text-slate-900">IB Biology — Pinnacle (1:1)</td>
              <td className="py-3 px-4 text-green-700 font-bold">$8,000/year</td>
              <td className="py-3 px-4 text-slate-600 text-sm">Examiner-led, fully customised, IA moderation-level feedback</td>
            </tr>
            <tr className="border-b border-slate-100">
              <td className="py-3 px-4 font-medium text-slate-900">IB Biology — Pursuit (group)</td>
              <td className="py-3 px-4 text-green-700 font-bold">$3,500/year</td>
              <td className="py-3 px-4 text-slate-600 text-sm">Fixed weekly schedule, peer discussion, most affordable route</td>
            </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="py-16 bg-slate-50">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-slate-900 mb-8">How Cerebrum Compares</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-slate-100">
                  <th className="py-3 px-4 text-left text-sm font-semibold text-slate-700">Provider</th>
                  <th className="py-3 px-4 text-left text-sm font-semibold text-slate-700">Price</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-slate-100 bg-green-50">
                  <td className="py-3 px-4 font-bold text-green-800">Cerebrum Biology Academy (biology section only)</td>
                  <td className="py-3 px-4 font-bold text-green-700">$6,000/year – $8,000/year</td>
                </tr>
            <tr className="border-b border-slate-100">
              <td className="py-3 px-4 text-slate-700">Local IB tutors (Singapore/Dubai/London)</td>
              <td className="py-3 px-4 text-slate-500">$50–$150/hour</td>
            </tr>
            <tr className="border-b border-slate-100">
              <td className="py-3 px-4 text-slate-700">Online IB platforms</td>
              <td className="py-3 px-4 text-slate-500">$30–$80/hour</td>
            </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-sm text-slate-500">Cerebrum is a biology-section specialist. Competitors listed are generalist providers covering all sections/disciplines. Many students pair Cerebrum with a generalist for non-biology components.</p>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-br from-blue-600 to-purple-600">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Get a Personalised Quote</h2>
          <p className="text-blue-100 mb-8">Free 30-minute diagnostic to determine which tier fits your goals.</p>
          <a href={wa} className="inline-flex items-center gap-2 bg-white text-blue-700 px-8 py-4 rounded-xl font-semibold text-lg" target="_blank" rel="noopener noreferrer">
            WhatsApp +91 88264-44334
          </a>
        </div>
      </section>
    </main>
  )
}
