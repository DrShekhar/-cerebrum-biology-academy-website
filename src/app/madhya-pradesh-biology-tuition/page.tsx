import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Madhya Pradesh Biology Tuition Online | MPBSE Board + NEET | AIIMS Faculty',
  description:
    'Best Biology tuition for Madhya Pradesh students. MPBSE Board + NEET preparation. AIIMS faculty, online classes. Serving Bhopal, Indore, Jabalpur, Gwalior. 98% success rate.',
  keywords: [
    'madhya pradesh biology tuition',
    'mpbse biology coaching',
    'neet coaching madhya pradesh',
    'biology tutor bhopal',
    'online biology classes madhya pradesh',
  ],
  openGraph: {
    title: 'Madhya Pradesh Biology Tuition Online | MPBSE Board + NEET | AIIMS Faculty',
    description:
      'Best Biology tuition for Madhya Pradesh students. MPBSE Board + NEET preparation. AIIMS faculty, online classes. Serving Bhopal, Indore, Jabalpur, Gwalior. 98% success rate.',
    url: 'https://cerebrumbiologyacademy.com/madhya-pradesh-biology-tuition',
    locale: 'en_IN',
    type: 'website',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/madhya-pradesh-biology-tuition',
  },
}

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html:
            '{"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"Do you cover the MPBSE Biology syllabus?","acceptedAnswer":{"@type":"Answer","text":"Yes! Our curriculum covers both MPBSE Board Biology and NEET. MPBSE syllabus has significant overlap with NCERT/NEET. We bridge any gaps specific to Madhya Pradesh state board."}},{"@type":"Question","name":"Are online classes available for Madhya Pradesh students?","acceptedAnswer":{"@type":"Answer","text":"Yes! All our classes are available online with live interactive sessions. Students from Bhopal, Indore, Jabalpur, Gwalior attend our online batches. Classes are recorded for revision."}},{"@type":"Question","name":"What about DMAT/NEET preparation?","acceptedAnswer":{"@type":"Answer","text":"Our NEET preparation automatically covers DMAT/NEET as well, since both test similar Biology concepts. We ensure state-specific topics are covered."}}]}',
        }}
      />
      <div className="min-h-screen bg-gray-50">
        <section className="bg-gradient-to-br from-indigo-700 to-purple-800 text-white py-16">
          <div className="max-w-5xl mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Madhya Pradesh Biology Tuition</h1>
            <p className="text-xl text-purple-100 max-w-3xl mx-auto mb-8">
              Expert Biology coaching for Madhya Pradesh students. MPBSE Board + NEET dual
              preparation. Online classes from AIIMS-trained faculty.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="https://wa.me/918826444334?text=I%20am%20from%20Madhya%20Pradesh.%20I%20need%20Biology%20coaching%20for%20MPBSE%20Board%20%2B%20NEET.%20Please%20share%20details."
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
                Do you cover the MPBSE Biology syllabus?
                <span className="text-indigo-600 group-open:rotate-180 transition-transform">
                  ▼
                </span>
              </summary>
              <p className="px-6 pb-4 text-gray-600">
                Yes! Our curriculum covers both MPBSE Board Biology and NEET. MPBSE syllabus has
                significant overlap with NCERT/NEET. We bridge any gaps specific to Madhya Pradesh
                state board.
              </p>
            </details>
            <details className="bg-white rounded-xl shadow-md group">
              <summary className="px-6 py-4 cursor-pointer font-semibold text-gray-900 flex items-center justify-between">
                Are online classes available for Madhya Pradesh students?
                <span className="text-indigo-600 group-open:rotate-180 transition-transform">
                  ▼
                </span>
              </summary>
              <p className="px-6 pb-4 text-gray-600">
                Yes! All our classes are available online with live interactive sessions. Students
                from Bhopal, Indore, Jabalpur, Gwalior attend our online batches. Classes are
                recorded for revision.
              </p>
            </details>
            <details className="bg-white rounded-xl shadow-md group">
              <summary className="px-6 py-4 cursor-pointer font-semibold text-gray-900 flex items-center justify-between">
                What about DMAT/NEET preparation?
                <span className="text-indigo-600 group-open:rotate-180 transition-transform">
                  ▼
                </span>
              </summary>
              <p className="px-6 pb-4 text-gray-600">
                Our NEET preparation automatically covers DMAT/NEET as well, since both test similar
                Biology concepts. We ensure state-specific topics are covered.
              </p>
            </details>
          </div>
        </section>

        <section className="py-16 bg-gradient-to-r from-indigo-700 to-purple-700 text-white">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">Get Started Today</h2>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="https://wa.me/918826444334?text=I%20am%20from%20Madhya%20Pradesh.%20I%20need%20Biology%20coaching%20for%20MPBSE%20Board%20%2B%20NEET.%20Please%20share%20details."
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
