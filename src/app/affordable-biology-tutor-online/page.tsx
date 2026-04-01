import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Affordable Biology Tutor Online | Quality Coaching from Rs 3,333/month',
  description:
    'Affordable online Biology tutoring starting Rs 3,333/month (Rs 40,000/year). AIIMS faculty, small batches, 98% success rate. Cheaper than Preply/Superprof with better results.',
  keywords: [
    'affordable biology tutor',
    'cheap biology tutor online',
    'budget biology coaching',
    'low cost biology classes',
    'affordable neet coaching',
  ],
  openGraph: {
    title: 'Affordable Biology Tutor Online | Quality Coaching from Rs 3,333/month',
    description:
      'Affordable online Biology tutoring starting Rs 3,333/month (Rs 40,000/year). AIIMS faculty, small batches, 98% success rate. Cheaper than Preply/Superprof with better results.',
    url: 'https://cerebrumbiologyacademy.com/affordable-biology-tutor-online',
    locale: 'en_IN',
    type: 'website',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/affordable-biology-tutor-online',
  },
}

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html:
            '{"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"How much does affordable Biology tutoring cost?","acceptedAnswer":{"@type":"Answer","text":"Our Pursuit batch starts at Rs 40,000/year (Rs 3,333/month). Includes live classes, recorded lectures, study material, weekly tests, and WhatsApp doubt support. EMI options available."}},{"@type":"Question","name":"Is affordable tutoring good quality?","acceptedAnswer":{"@type":"Answer","text":"Yes! All batches have the same AIIMS-trained faculty. The Pursuit batch has 30-40 students (vs 15 in Pinnacle) but covers the same curriculum with 98% success rate."}},{"@type":"Question","name":"How does this compare to Preply or Superprof?","acceptedAnswer":{"@type":"Answer","text":"Preply/Superprof charge Rs 2,000-4,000/hour for freelance tutors. Our annual batch (Rs 40,000/year) gives you 100+ hours of live classes + study material + tests — 10x more affordable with structured curriculum."}}]}',
        }}
      />
      <div className="min-h-screen bg-gray-50">
        <section className="bg-gradient-to-br from-indigo-700 to-purple-800 text-white py-16">
          <div className="max-w-5xl mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Affordable Biology Tutor Online</h1>
            <p className="text-xl text-purple-100 max-w-3xl mx-auto mb-8">
              Quality Biology coaching does not have to break the bank. AIIMS-trained faculty,
              15-student batches, starting Rs 3,333/month.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="https://wa.me/918826444334?text=I%20am%20looking%20for%20affordable%20Biology%20coaching.%20Please%20share%20your%20most%20budget-friendly%20options."
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
                How much does affordable Biology tutoring cost?
                <span className="text-indigo-600 group-open:rotate-180 transition-transform">
                  ▼
                </span>
              </summary>
              <p className="px-6 pb-4 text-gray-600">
                Our Pursuit batch starts at Rs 40,000/year (Rs 3,333/month). Includes live classes,
                recorded lectures, study material, weekly tests, and WhatsApp doubt support. EMI
                options available.
              </p>
            </details>
            <details className="bg-white rounded-xl shadow-md group">
              <summary className="px-6 py-4 cursor-pointer font-semibold text-gray-900 flex items-center justify-between">
                Is affordable tutoring good quality?
                <span className="text-indigo-600 group-open:rotate-180 transition-transform">
                  ▼
                </span>
              </summary>
              <p className="px-6 pb-4 text-gray-600">
                Yes! All batches have the same AIIMS-trained faculty. The Pursuit batch has 30-40
                students (vs 15 in Pinnacle) but covers the same curriculum with 98% success rate.
              </p>
            </details>
            <details className="bg-white rounded-xl shadow-md group">
              <summary className="px-6 py-4 cursor-pointer font-semibold text-gray-900 flex items-center justify-between">
                How does this compare to Preply or Superprof?
                <span className="text-indigo-600 group-open:rotate-180 transition-transform">
                  ▼
                </span>
              </summary>
              <p className="px-6 pb-4 text-gray-600">
                Preply/Superprof charge Rs 2,000-4,000/hour for freelance tutors. Our annual batch
                (Rs 40,000/year) gives you 100+ hours of live classes + study material + tests — 10x
                more affordable with structured curriculum.
              </p>
            </details>
          </div>
        </section>

        <section className="py-16 bg-gradient-to-r from-indigo-700 to-purple-700 text-white">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">Get Started Today</h2>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="https://wa.me/918826444334?text=I%20am%20looking%20for%20affordable%20Biology%20coaching.%20Please%20share%20your%20most%20budget-friendly%20options."
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
