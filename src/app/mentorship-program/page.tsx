import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Biology Mentorship Program | 1-on-1 with Dr. Shekhar (AIIMS) | Premium Guidance',
  description:
    'Premium Biology mentorship by Dr. Shekhar C Singh (AIIMS Delhi). 1-on-1 guidance for NEET toppers, Olympiad aspirants, and medical career planning. Limited seats.',
  keywords: [
    'biology mentorship',
    'neet mentorship program',
    'aiims mentor',
    'biology career guidance',
    'medical career mentorship',
  ],
  openGraph: {
    title: 'Biology Mentorship Program | 1-on-1 with Dr. Shekhar (AIIMS) | Premium Guidance',
    description:
      'Premium Biology mentorship by Dr. Shekhar C Singh (AIIMS Delhi). 1-on-1 guidance for NEET toppers, Olympiad aspirants, and medical career planning. Limited seats.',
    url: 'https://cerebrumbiologyacademy.com/mentorship-program',
    locale: 'en_IN',
    type: 'website',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/mentorship-program',
  },
}

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html:
            '{"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"What is the Mentorship Program?","acceptedAnswer":{"@type":"Answer","text":"Direct 1-on-1 mentorship with Dr. Shekhar C Singh (AIIMS Delhi). Includes monthly strategy sessions, personalized study plan, college selection guidance, and career counseling. Limited to 20 students per year."}},{"@type":"Question","name":"Who should apply for mentorship?","acceptedAnswer":{"@type":"Answer","text":"Students targeting AIIMS Delhi/top 10 medical colleges, Biology Olympiad (NSEB/IBO) aspirants, and students needing personalized guidance beyond regular coaching."}},{"@type":"Question","name":"How much does mentorship cost?","acceptedAnswer":{"@type":"Answer","text":"Mentorship is included in our Pinnacle batch (Rs 98,000-1,80,000/year). Standalone mentorship is available on request. WhatsApp us for details."}}]}',
        }}
      />
      <div className="min-h-screen bg-gray-50">
        <section className="bg-gradient-to-br from-indigo-700 to-purple-800 text-white py-16">
          <div className="max-w-5xl mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Biology Mentorship Program</h1>
            <p className="text-xl text-purple-100 max-w-3xl mx-auto mb-8">
              Direct mentorship from Dr. Shekhar C Singh (AIIMS Delhi). For students aiming for
              AIIMS, top medical colleges, or Biology Olympiad medals.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="https://wa.me/918826444334?text=I%20am%20interested%20in%20the%20Mentorship%20Program%20with%20Dr.%20Shekhar.%20Please%20share%20details."
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
                What is the Mentorship Program?
                <span className="text-indigo-600 group-open:rotate-180 transition-transform">
                  ▼
                </span>
              </summary>
              <p className="px-6 pb-4 text-gray-600">
                Direct 1-on-1 mentorship with Dr. Shekhar C Singh (AIIMS Delhi). Includes monthly
                strategy sessions, personalized study plan, college selection guidance, and career
                counseling. Limited to 20 students per year.
              </p>
            </details>
            <details className="bg-white rounded-xl shadow-md group">
              <summary className="px-6 py-4 cursor-pointer font-semibold text-gray-900 flex items-center justify-between">
                Who should apply for mentorship?
                <span className="text-indigo-600 group-open:rotate-180 transition-transform">
                  ▼
                </span>
              </summary>
              <p className="px-6 pb-4 text-gray-600">
                Students targeting AIIMS Delhi/top 10 medical colleges, Biology Olympiad (NSEB/IBO)
                aspirants, and students needing personalized guidance beyond regular coaching.
              </p>
            </details>
            <details className="bg-white rounded-xl shadow-md group">
              <summary className="px-6 py-4 cursor-pointer font-semibold text-gray-900 flex items-center justify-between">
                How much does mentorship cost?
                <span className="text-indigo-600 group-open:rotate-180 transition-transform">
                  ▼
                </span>
              </summary>
              <p className="px-6 pb-4 text-gray-600">
                Mentorship is included in our Pinnacle batch (Rs 98,000-1,80,000/year). Standalone
                mentorship is available on request. WhatsApp us for details.
              </p>
            </details>
          </div>
        </section>

        <section className="py-16 bg-gradient-to-r from-indigo-700 to-purple-700 text-white">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">Get Started Today</h2>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="https://wa.me/918826444334?text=I%20am%20interested%20in%20the%20Mentorship%20Program%20with%20Dr.%20Shekhar.%20Please%20share%20details."
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
