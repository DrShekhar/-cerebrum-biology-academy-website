import type { Metadata } from 'next'
import Link from 'next/link'

const PAGE_URL = 'https://cerebrumbiologyacademy.com/gamsat-biology-pricing'

export const metadata: Metadata = {
  title: 'GAMSAT Section III Pricing | Biology Coaching Packages | Cerebrum',
  description: 'GAMSAT Section III biology pricing — £399/€449/A$599 Self-Paced to £1,249/€1,399/A$1,799 1:1. UK, Ireland, Australia. Biology-section specialist for graduate medicine.',
  keywords: [
    'GAMSAT biology pricing',
    'GAMSAT section 3 cost',
    'GAMSAT biology tutor fees',
    'GAMSAT coaching price UK',
    'GAMSAT coaching price Australia',
  ],
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: 'GAMSAT Section III Pricing | Biology Coaching Packages | Cerebrum Biology Academy',
    description: 'GAMSAT Section III biology pricing — £399/€449/A$599 Self-Paced to £1,249/€1,399/A$1,799 1:1. UK, Ireland, Australia. Biology-section specialist for graduate medicine.',
    url: PAGE_URL,
    type: 'website',
  },
}

const wa = 'https://wa.me/918826444334?text=' + encodeURIComponent('Hi — I want to discuss GAMSAT Biology pricing and which tier fits my goals. Please share programme details.')

export default function Page() {
  return (
    <main className="min-h-screen bg-white">
      <section className="bg-gradient-to-br from-slate-900 to-slate-800 py-16 md:py-24">
        <div className="max-w-5xl mx-auto px-4">
          <nav className="text-sm text-slate-400 mb-6" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-white">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/gamsat-section-3-biology-prep" className="hover:text-white">GAMSAT Biology</Link>
            <span className="mx-2">/</span>
            <span className="text-white">Pricing</span>
          </nav>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">GAMSAT Section III Pricing | Biology Coaching Packages</h1>
          <p className="text-xl text-slate-300 mb-6 max-w-3xl">GAMSAT Section III biology pricing — £399/€449/A$599 Self-Paced to £1,249/€1,399/A$1,799 1:1. UK, Ireland, Australia. Biology-section specialist for graduate medicine.</p>
          <a href={wa} className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-xl font-semibold" target="_blank" rel="noopener noreferrer">
            WhatsApp +91 88264-44334
          </a>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-slate-900 mb-8">Cerebrum GAMSAT Biology Pricing</h2>
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
              <td className="py-3 px-4 font-medium text-slate-900">Section III Self-Paced (UK)</td>
              <td className="py-3 px-4 text-green-700 font-bold">£399</td>
              <td className="py-3 px-4 text-slate-600 text-sm">4–6 months, biology content + ACER passages + recorded library</td>
            </tr>
            <tr className="border-b border-slate-100">
              <td className="py-3 px-4 font-medium text-slate-900">Section III Small-Batch (UK)</td>
              <td className="py-3 px-4 text-green-700 font-bold">£899</td>
              <td className="py-3 px-4 text-slate-600 text-sm">Weekly 2-hour live sessions + monthly mocks</td>
            </tr>
            <tr className="border-b border-slate-100">
              <td className="py-3 px-4 font-medium text-slate-900">Section III 1:1 Senior Faculty (UK)</td>
              <td className="py-3 px-4 text-green-700 font-bold">£1,249</td>
              <td className="py-3 px-4 text-slate-600 text-sm">Weekly 90-min 1:1 + personalised plan</td>
            </tr>
            <tr className="border-b border-slate-100">
              <td className="py-3 px-4 font-medium text-slate-900">Ireland (EUR)</td>
              <td className="py-3 px-4 text-green-700 font-bold">€449 / €999 / €1,399</td>
              <td className="py-3 px-4 text-slate-600 text-sm">Same tiers in EUR for RCSI/UCC/UL applicants</td>
            </tr>
            <tr className="border-b border-slate-100">
              <td className="py-3 px-4 font-medium text-slate-900">Australia (AUD)</td>
              <td className="py-3 px-4 text-green-700 font-bold">A$599 / A$1,299 / A$1,799</td>
              <td className="py-3 px-4 text-slate-600 text-sm">Same tiers in AUD for Deakin/Melbourne/UQ/Griffith</td>
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
                  <td className="py-3 px-4 font-bold text-green-700">£399 – €449 / €999 / €1,399</td>
                </tr>
            <tr className="border-b border-slate-100">
              <td className="py-3 px-4 text-slate-700">Gold Standard GAMSAT (all sections, UK)</td>
              <td className="py-3 px-4 text-slate-500">£600–£1,500</td>
            </tr>
            <tr className="border-b border-slate-100">
              <td className="py-3 px-4 text-slate-700">AU GAMSAT providers (all sections)</td>
              <td className="py-3 px-4 text-slate-500">A$1,000–A$3,000</td>
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
