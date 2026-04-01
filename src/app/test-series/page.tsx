import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'NEET Biology Test Series 2026 | 31+ Tests | Online + Offline | Free MCQ Tool',
  description:
    'Comprehensive NEET Biology test series with 31+ tests, detailed analytics, rank prediction. Free MCQ practice with 19,619 questions. Weekly tests at all centers.',
  keywords: [
    'neet biology test series',
    'neet mock test biology',
    'neet biology practice test',
    'free neet biology mcq',
    'neet test series 2026',
    'biology mock test online',
  ],
  openGraph: {
    title: 'NEET Biology Test Series 2026 | 31+ Tests | Online + Offline | Free MCQ Tool',
    description:
      'Comprehensive NEET Biology test series with 31+ tests, detailed analytics, rank prediction. Free MCQ practice with 19,619 questions. Weekly tests at all centers.',
    url: 'https://cerebrumbiologyacademy.com/test-series',
    locale: 'en_IN',
    type: 'website',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/test-series',
  },
}

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html:
            '{"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"How many tests are in the series?","acceptedAnswer":{"@type":"Answer","text":"31+ tests including chapter-wise tests, unit tests, and full-length NEET mock tests. Tests are conducted weekly at all 4 centers and online."}},{"@type":"Question","name":"Is the MCQ practice tool free?","acceptedAnswer":{"@type":"Answer","text":"Yes! Our MCQ practice tool with 19,619 questions is completely free at cerebrumbiologyacademy.com/neet-biology-mcq. No login required."}},{"@type":"Question","name":"Can I join the test series without coaching?","acceptedAnswer":{"@type":"Answer","text":"Yes! Test series is available as a standalone product. Also available: full coaching (Pursuit/Ascent/Pinnacle batches) which includes the test series."}}]}',
        }}
      />
      <div className="min-h-screen bg-gray-50">
        <section className="bg-gradient-to-br from-indigo-700 to-purple-800 text-white py-16">
          <div className="max-w-5xl mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">NEET Biology Test Series 2026</h1>
            <p className="text-xl text-purple-100 max-w-3xl mx-auto mb-8">
              31+ chapter-wise and full-length mock tests with detailed performance analytics. Plus
              19,619 free MCQ questions for daily practice.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="https://wa.me/918826444334?text=I%20want%20to%20join%20the%20NEET%20Biology%20Test%20Series.%20Please%20share%20details%20and%20pricing."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-green-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-600 transition"
              >
                WhatsApp Us
              </Link>
              <a
                href="tel:+918826444334"
                className="inline-flex items-center gap-2 bg-yellow-400 text-gray-900 px-8 py-3 rounded-lg font-semibold hover:bg-yellow-300 transition"
              >
                Call: +91 88264 44334
              </a>
            </div>
          </div>
        </section>

        <section className="py-16 max-w-3xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <details open className="bg-white rounded-xl shadow-md group">
              <summary className="px-6 py-4 cursor-pointer font-semibold text-gray-900 flex items-center justify-between">
                How many tests are in the series?
                <span className="text-indigo-600 group-open:rotate-180 transition-transform">
                  ▼
                </span>
              </summary>
              <p className="px-6 pb-4 text-gray-600">
                31+ tests including chapter-wise tests, unit tests, and full-length NEET mock tests.
                Tests are conducted weekly at all 4 centers and online.
              </p>
            </details>
            <details className="bg-white rounded-xl shadow-md group">
              <summary className="px-6 py-4 cursor-pointer font-semibold text-gray-900 flex items-center justify-between">
                Is the MCQ practice tool free?
                <span className="text-indigo-600 group-open:rotate-180 transition-transform">
                  ▼
                </span>
              </summary>
              <p className="px-6 pb-4 text-gray-600">
                Yes! Our MCQ practice tool with 19,619 questions is completely free at
                cerebrumbiologyacademy.com/neet-biology-mcq. No login required.
              </p>
            </details>
            <details className="bg-white rounded-xl shadow-md group">
              <summary className="px-6 py-4 cursor-pointer font-semibold text-gray-900 flex items-center justify-between">
                Can I join the test series without coaching?
                <span className="text-indigo-600 group-open:rotate-180 transition-transform">
                  ▼
                </span>
              </summary>
              <p className="px-6 pb-4 text-gray-600">
                Yes! Test series is available as a standalone product. Also available: full coaching
                (Pursuit/Ascent/Pinnacle batches) which includes the test series.
              </p>
            </details>
          </div>
        </section>

        <section className="py-16 bg-gradient-to-r from-indigo-700 to-purple-700 text-white">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">Get Started Today</h2>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="https://wa.me/918826444334?text=I%20want%20to%20join%20the%20NEET%20Biology%20Test%20Series.%20Please%20share%20details%20and%20pricing."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-green-500 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-green-600 transition"
              >
                WhatsApp Now
              </Link>
              <a
                href="tel:+918826444334"
                className="inline-flex items-center gap-2 bg-yellow-400 text-gray-900 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-yellow-300 transition"
              >
                Call: +91 88264 44334
              </a>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}
