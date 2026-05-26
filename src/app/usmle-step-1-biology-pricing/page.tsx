import type { Metadata } from 'next'
import Link from 'next/link'

const PAGE_URL = 'https://cerebrumbiologyacademy.com/usmle-step-1-biology-pricing'

export const metadata: Metadata = {
  title: 'USMLE Step 1 Biology Pricing | Foundations Packages | Cerebrum',
  description: 'USMLE Step 1 biology-foundations pricing — $799/₹39,999 Self-Paced to $2,499/₹1,24,999 1:1. US medical students + Indian IMGs. First Aid mapped, UWorld integration.',
  keywords: [
    'USMLE step 1 biology pricing',
    'USMLE step 1 tutor cost',
    'USMLE biology coaching fees',
    'USMLE IMG preparation cost',
    'cerebrum USMLE pricing',
  ],
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: 'USMLE Step 1 Biology Pricing | Foundations Packages | Cerebrum Biology Academy',
    description: 'USMLE Step 1 biology-foundations pricing — $799/₹39,999 Self-Paced to $2,499/₹1,24,999 1:1. US medical students + Indian IMGs. First Aid mapped, UWorld integration.',
    url: PAGE_URL,
    type: 'website',
  },
}

const wa = 'https://wa.me/918826444334?text=' + encodeURIComponent('Hi — I want to discuss USMLE Biology pricing and which tier fits my goals. Please share programme details.')

export default function Page() {
  return (
    <main className="min-h-screen bg-white">
      <section className="bg-gradient-to-br from-slate-900 to-slate-800 py-16 md:py-24">
        <div className="max-w-5xl mx-auto px-4">
          <nav className="text-sm text-slate-400 mb-6" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-white">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/usmle-step-1-biology-preparation" className="hover:text-white">USMLE Biology</Link>
            <span className="mx-2">/</span>
            <span className="text-white">Pricing</span>
          </nav>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">USMLE Step 1 Biology Pricing | Foundations Packages</h1>
          <p className="text-xl text-slate-300 mb-6 max-w-3xl">USMLE Step 1 biology-foundations pricing — $799/₹39,999 Self-Paced to $2,499/₹1,24,999 1:1. US medical students + Indian IMGs. First Aid mapped, UWorld integration.</p>
          <a href={wa} className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-xl font-semibold" target="_blank" rel="noopener noreferrer">
            WhatsApp +91 88264-44334
          </a>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-slate-900 mb-8">Cerebrum USMLE Biology Pricing</h2>
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
              <td className="py-3 px-4 font-medium text-slate-900">Step 1 Biology Self-Paced (US)</td>
              <td className="py-3 px-4 text-green-700 font-bold">$799</td>
              <td className="py-3 px-4 text-slate-600 text-sm">First Aid-mapped foundations, recorded library, WhatsApp support</td>
            </tr>
            <tr className="border-b border-slate-100">
              <td className="py-3 px-4 font-medium text-slate-900">Step 1 Biology Small-Batch (US)</td>
              <td className="py-3 px-4 text-green-700 font-bold">$1,599</td>
              <td className="py-3 px-4 text-slate-600 text-sm">Weekly 2-hour live sessions + monthly biology mocks</td>
            </tr>
            <tr className="border-b border-slate-100">
              <td className="py-3 px-4 font-medium text-slate-900">Step 1 Biology 1:1 Senior (US)</td>
              <td className="py-3 px-4 text-green-700 font-bold">$2,499</td>
              <td className="py-3 px-4 text-slate-600 text-sm">Weekly 90-min 1:1 + personalised plan + unlimited access</td>
            </tr>
            <tr className="border-b border-slate-100">
              <td className="py-3 px-4 font-medium text-slate-900">Ad-hoc 1:1 (US)</td>
              <td className="py-3 px-4 text-green-700 font-bold">$175/hour</td>
              <td className="py-3 px-4 text-slate-600 text-sm">Targeted gap-fill on weak biology topics</td>
            </tr>
            <tr className="border-b border-slate-100">
              <td className="py-3 px-4 font-medium text-slate-900">India IMG pricing (INR)</td>
              <td className="py-3 px-4 text-green-700 font-bold">₹39,999 / ₹79,999 / ₹1,24,999</td>
              <td className="py-3 px-4 text-slate-600 text-sm">Same tiers for AIIMS/MAMC/Grant/KEM graduates preparing for ECFMG</td>
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
                  <td className="py-3 px-4 font-bold text-green-700">$799 – $175/hour</td>
                </tr>
            <tr className="border-b border-slate-100">
              <td className="py-3 px-4 text-slate-700">Kaplan Step 1 (all disciplines)</td>
              <td className="py-3 px-4 text-slate-500">~$3,499</td>
            </tr>
            <tr className="border-b border-slate-100">
              <td className="py-3 px-4 text-slate-700">UWorld QBank (no teaching)</td>
              <td className="py-3 px-4 text-slate-500">$499–$799</td>
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
