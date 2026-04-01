import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'ICSE/ISC Biology Coaching | Class 9-12 | Board + NEET Preparation',
  description:
    'Expert ICSE and ISC Biology coaching for Class 9-12. CISCE syllabus with NEET bridge. AIIMS faculty, small batches. Score 95%+ in Biology boards.',
  keywords: [
    'icse biology coaching',
    'isc biology coaching',
    'icse biology tuition',
    'isc biology tuition',
    'cisce biology coaching',
  ],
  openGraph: {
    title: 'ICSE/ISC Biology Coaching | Class 9-12 | Board + NEET Preparation',
    description:
      'Expert ICSE and ISC Biology coaching for Class 9-12. CISCE syllabus with NEET bridge. AIIMS faculty, small batches. Score 95%+ in Biology boards.',
    url: 'https://cerebrumbiologyacademy.com/icse-biology-coaching',
    locale: 'en_IN',
    type: 'website',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/icse-biology-coaching',
  },
}

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html:
            '{"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"Do you cover the ICSE/ISC Biology syllabus?","acceptedAnswer":{"@type":"Answer","text":"Yes! We cover the complete CISCE syllabus for ICSE (Class 9-10) and ISC (Class 11-12). Our faculty understands the differences between ICSE and CBSE approaches to Biology."}},{"@type":"Question","name":"Can ICSE students prepare for NEET?","acceptedAnswer":{"@type":"Answer","text":"Yes! ICSE Biology has 85% overlap with NEET. We bridge the remaining 15% gap (NCERT-specific terminology and topics not in ICSE) through our NEET bridge module."}},{"@type":"Question","name":"What about practical exam preparation?","acceptedAnswer":{"@type":"Answer","text":"ISC practical exam preparation is included. We cover lab procedures, diagram drawing, and viva questions specific to the CISCE pattern."}}]}',
        }}
      />
      <div className="min-h-screen bg-gray-50">
        <section className="bg-gradient-to-br from-indigo-700 to-purple-800 text-white py-16">
          <div className="max-w-5xl mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">ICSE & ISC Biology Coaching</h1>
            <p className="text-xl text-purple-100 max-w-3xl mx-auto mb-8">
              Specialized coaching for ICSE (Class 9-10) and ISC (Class 11-12) Biology with NEET
              preparation bridge.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="https://wa.me/918826444334?text=I%20need%20ICSE%2FISC%20Biology%20coaching.%20Please%20share%20batch%20details."
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
                Do you cover the ICSE/ISC Biology syllabus?
                <span className="text-indigo-600 group-open:rotate-180 transition-transform">
                  ▼
                </span>
              </summary>
              <p className="px-6 pb-4 text-gray-600">
                Yes! We cover the complete CISCE syllabus for ICSE (Class 9-10) and ISC (Class
                11-12). Our faculty understands the differences between ICSE and CBSE approaches to
                Biology.
              </p>
            </details>
            <details className="bg-white rounded-xl shadow-md group">
              <summary className="px-6 py-4 cursor-pointer font-semibold text-gray-900 flex items-center justify-between">
                Can ICSE students prepare for NEET?
                <span className="text-indigo-600 group-open:rotate-180 transition-transform">
                  ▼
                </span>
              </summary>
              <p className="px-6 pb-4 text-gray-600">
                Yes! ICSE Biology has 85% overlap with NEET. We bridge the remaining 15% gap
                (NCERT-specific terminology and topics not in ICSE) through our NEET bridge module.
              </p>
            </details>
            <details className="bg-white rounded-xl shadow-md group">
              <summary className="px-6 py-4 cursor-pointer font-semibold text-gray-900 flex items-center justify-between">
                What about practical exam preparation?
                <span className="text-indigo-600 group-open:rotate-180 transition-transform">
                  ▼
                </span>
              </summary>
              <p className="px-6 pb-4 text-gray-600">
                ISC practical exam preparation is included. We cover lab procedures, diagram
                drawing, and viva questions specific to the CISCE pattern.
              </p>
            </details>
          </div>
        </section>

        <section className="py-16 bg-gradient-to-r from-indigo-700 to-purple-700 text-white">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">Get Started Today</h2>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="https://wa.me/918826444334?text=I%20need%20ICSE%2FISC%20Biology%20coaching.%20Please%20share%20batch%20details."
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
