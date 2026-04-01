import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Cambridge Biology Tutor Online | IGCSE, AS, A Level, Pre-U | 92% A*/A Rate',
  description:
    'Expert Cambridge Biology tutor for IGCSE (0610), AS Level, A Level (9700), and Pre-U. 92% A*/A rate. AIIMS-trained faculty. Online classes worldwide.',
  keywords: [
    'cambridge biology tutor',
    'cambridge biology tuition',
    'cambridge igcse biology tutor',
    'cambridge a level biology tutor',
    'cie biology tutor',
  ],
  openGraph: {
    title: 'Cambridge Biology Tutor Online | IGCSE, AS, A Level, Pre-U | 92% A*/A Rate',
    description:
      'Expert Cambridge Biology tutor for IGCSE (0610), AS Level, A Level (9700), and Pre-U. 92% A*/A rate. AIIMS-trained faculty. Online classes worldwide.',
    url: 'https://cerebrumbiologyacademy.com/cambridge-biology-tutor',
    locale: 'en_GB',
    type: 'website',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/cambridge-biology-tutor',
  },
}

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html:
            '{"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"Which Cambridge qualifications do you cover?","acceptedAnswer":{"@type":"Answer","text":"IGCSE Biology (0610/0970), AS Level Biology, A Level Biology (9700), and Cambridge Pre-U. Our faculty understands Cambridge mark schemes and assessment criteria."}},{"@type":"Question","name":"What is your success rate for Cambridge Biology?","acceptedAnswer":{"@type":"Answer","text":"92% of our Cambridge Biology students achieve A*/A grades. We focus on exam technique, data analysis skills, and practical reasoning — all key for Cambridge exams."}},{"@type":"Question","name":"Do you offer NEET preparation alongside Cambridge?","acceptedAnswer":{"@type":"Answer","text":"Yes! Many Cambridge students in India also prepare for NEET. We offer a Cambridge + NEET bridge that covers the 50% syllabus gap efficiently."}}]}',
        }}
      />
      <div className="min-h-screen bg-gray-50">
        <section className="bg-gradient-to-br from-indigo-700 to-purple-800 text-white py-16">
          <div className="max-w-5xl mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Cambridge Biology Tutor</h1>
            <p className="text-xl text-purple-100 max-w-3xl mx-auto mb-8">
              Specialist tutoring for all Cambridge International Biology qualifications — IGCSE, AS
              Level, A Level, and Pre-U.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="https://wa.me/918826444334?text=I%20need%20a%20Cambridge%20Biology%20tutor.%20Please%20share%20details%20for%20my%20level%20(IGCSE%2FAS%2FA%20Level)."
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
                Which Cambridge qualifications do you cover?
                <span className="text-indigo-600 group-open:rotate-180 transition-transform">
                  ▼
                </span>
              </summary>
              <p className="px-6 pb-4 text-gray-600">
                IGCSE Biology (0610/0970), AS Level Biology, A Level Biology (9700), and Cambridge
                Pre-U. Our faculty understands Cambridge mark schemes and assessment criteria.
              </p>
            </details>
            <details className="bg-white rounded-xl shadow-md group">
              <summary className="px-6 py-4 cursor-pointer font-semibold text-gray-900 flex items-center justify-between">
                What is your success rate for Cambridge Biology?
                <span className="text-indigo-600 group-open:rotate-180 transition-transform">
                  ▼
                </span>
              </summary>
              <p className="px-6 pb-4 text-gray-600">
                92% of our Cambridge Biology students achieve A*/A grades. We focus on exam
                technique, data analysis skills, and practical reasoning — all key for Cambridge
                exams.
              </p>
            </details>
            <details className="bg-white rounded-xl shadow-md group">
              <summary className="px-6 py-4 cursor-pointer font-semibold text-gray-900 flex items-center justify-between">
                Do you offer NEET preparation alongside Cambridge?
                <span className="text-indigo-600 group-open:rotate-180 transition-transform">
                  ▼
                </span>
              </summary>
              <p className="px-6 pb-4 text-gray-600">
                Yes! Many Cambridge students in India also prepare for NEET. We offer a Cambridge +
                NEET bridge that covers the 50% syllabus gap efficiently.
              </p>
            </details>
          </div>
        </section>

        <section className="py-16 bg-gradient-to-r from-indigo-700 to-purple-700 text-white">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">Get Started Today</h2>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="https://wa.me/918826444334?text=I%20need%20a%20Cambridge%20Biology%20tutor.%20Please%20share%20details%20for%20my%20level%20(IGCSE%2FAS%2FA%20Level)."
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
