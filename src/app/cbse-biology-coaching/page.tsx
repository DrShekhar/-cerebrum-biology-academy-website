import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'CBSE Biology Coaching | Class 11 & 12 | Board + NEET Dual Preparation',
  description:
    'Best CBSE Biology coaching for Class 11 and 12. NCERT-focused teaching, Board exam + NEET dual preparation. AIIMS faculty, small batches, 98% success. Online + offline.',
  keywords: [
    'cbse biology coaching',
    'cbse biology tuition',
    'cbse class 11 biology',
    'cbse class 12 biology',
    'ncert biology coaching',
    'board exam biology coaching',
  ],
  openGraph: {
    title: 'CBSE Biology Coaching | Class 11 & 12 | Board + NEET Dual Preparation',
    description:
      'Best CBSE Biology coaching for Class 11 and 12. NCERT-focused teaching, Board exam + NEET dual preparation. AIIMS faculty, small batches, 98% success. Online + offline.',
    url: 'https://cerebrumbiologyacademy.com/cbse-biology-coaching',
    locale: 'en_IN',
    type: 'website',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/cbse-biology-coaching',
  },
}

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html:
            '{"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"Do you cover the complete CBSE Biology syllabus?","acceptedAnswer":{"@type":"Answer","text":"Yes! We cover all 38 chapters of NCERT Class 11 + 12 Biology. Every NCERT line, diagram, and in-text question is covered. Our students score 90%+ in CBSE Biology boards."}},{"@type":"Question","name":"Can I prepare for both Board exams and NEET?","acceptedAnswer":{"@type":"Answer","text":"Absolutely! Our curriculum is designed for dual preparation. CBSE Board exam content overlaps 100% with NEET Biology. We add NEET-specific MCQ practice and mock tests on top of Board preparation."}},{"@type":"Question","name":"What are the fees for CBSE Biology coaching?","acceptedAnswer":{"@type":"Answer","text":"Pursuit batch: Rs 40,000-48,000/year. Ascent batch: Rs 58,000-78,000/year. Pinnacle batch: Rs 98,000-1,56,000/year. All include Board + NEET preparation."}}]}',
        }}
      />
      <div className="min-h-screen bg-gray-50">
        <section className="bg-gradient-to-br from-indigo-700 to-purple-800 text-white py-16">
          <div className="max-w-5xl mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">CBSE Biology Coaching</h1>
            <p className="text-xl text-purple-100 max-w-3xl mx-auto mb-8">
              Master CBSE Biology with AIIMS-trained faculty. Complete NCERT coverage with Board +
              NEET dual preparation strategy.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="https://wa.me/918826444334?text=I%20need%20CBSE%20Biology%20coaching.%20Please%20share%20batch%20details%20for%20my%20class."
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
                Do you cover the complete CBSE Biology syllabus?
                <span className="text-indigo-600 group-open:rotate-180 transition-transform">
                  ▼
                </span>
              </summary>
              <p className="px-6 pb-4 text-gray-600">
                Yes! We cover all 38 chapters of NCERT Class 11 + 12 Biology. Every NCERT line,
                diagram, and in-text question is covered. Our students score 90%+ in CBSE Biology
                boards.
              </p>
            </details>
            <details className="bg-white rounded-xl shadow-md group">
              <summary className="px-6 py-4 cursor-pointer font-semibold text-gray-900 flex items-center justify-between">
                Can I prepare for both Board exams and NEET?
                <span className="text-indigo-600 group-open:rotate-180 transition-transform">
                  ▼
                </span>
              </summary>
              <p className="px-6 pb-4 text-gray-600">
                Absolutely! Our curriculum is designed for dual preparation. CBSE Board exam content
                overlaps 100% with NEET Biology. We add NEET-specific MCQ practice and mock tests on
                top of Board preparation.
              </p>
            </details>
            <details className="bg-white rounded-xl shadow-md group">
              <summary className="px-6 py-4 cursor-pointer font-semibold text-gray-900 flex items-center justify-between">
                What are the fees for CBSE Biology coaching?
                <span className="text-indigo-600 group-open:rotate-180 transition-transform">
                  ▼
                </span>
              </summary>
              <p className="px-6 pb-4 text-gray-600">
                Pursuit batch: Rs 40,000-48,000/year. Ascent batch: Rs 58,000-78,000/year. Pinnacle
                batch: Rs 98,000-1,56,000/year. All include Board + NEET preparation.
              </p>
            </details>
          </div>
        </section>

        <section className="py-16 bg-gradient-to-r from-indigo-700 to-purple-700 text-white">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">Get Started Today</h2>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="https://wa.me/918826444334?text=I%20need%20CBSE%20Biology%20coaching.%20Please%20share%20batch%20details%20for%20my%20class."
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
