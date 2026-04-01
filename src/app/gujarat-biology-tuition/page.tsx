import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Gujarat Biology Tuition Online | GSEB Board + NEET | AIIMS Faculty',
  description:
    'Best Biology tuition for Gujarat students. GSEB Board + NEET preparation. AIIMS faculty, online classes. Serving Ahmedabad, Surat, Vadodara, Rajkot. 98% success rate.',
  keywords: [
    'gujarat biology tuition',
    'gseb biology coaching',
    'neet coaching gujarat',
    'biology tutor ahmedabad',
    'online biology classes gujarat',
  ],
  openGraph: {
    title: 'Gujarat Biology Tuition Online | GSEB Board + NEET | AIIMS Faculty',
    description:
      'Best Biology tuition for Gujarat students. GSEB Board + NEET preparation. AIIMS faculty, online classes. Serving Ahmedabad, Surat, Vadodara, Rajkot. 98% success rate.',
    url: 'https://cerebrumbiologyacademy.com/gujarat-biology-tuition',
    locale: 'en_IN',
    type: 'website',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/gujarat-biology-tuition',
  },
}

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html:
            '{"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"Do you cover the GSEB Biology syllabus?","acceptedAnswer":{"@type":"Answer","text":"Yes! Our curriculum covers both GSEB Board Biology and NEET. GSEB syllabus has significant overlap with NCERT/NEET. We bridge any gaps specific to Gujarat state board."}},{"@type":"Question","name":"Are online classes available for Gujarat students?","acceptedAnswer":{"@type":"Answer","text":"Yes! All our classes are available online with live interactive sessions. Students from Ahmedabad, Surat, Vadodara, Rajkot attend our online batches. Classes are recorded for revision."}},{"@type":"Question","name":"What about GUJCET preparation?","acceptedAnswer":{"@type":"Answer","text":"Our NEET preparation automatically covers GUJCET as well, since both test similar Biology concepts. We ensure state-specific topics are covered."}}]}',
        }}
      />
      <div className="min-h-screen bg-gray-50">
        <section className="bg-gradient-to-br from-indigo-700 to-purple-800 text-white py-16">
          <div className="max-w-5xl mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Gujarat Biology Tuition</h1>
            <p className="text-xl text-purple-100 max-w-3xl mx-auto mb-8">
              Expert Biology coaching for Gujarat students. GSEB Board + NEET dual preparation.
              Online classes from AIIMS-trained faculty.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="https://wa.me/918826444334?text=I%20am%20from%20Gujarat.%20I%20need%20Biology%20coaching%20for%20GSEB%20Board%20%2B%20NEET.%20Please%20share%20details."
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
                Do you cover the GSEB Biology syllabus?
                <span className="text-indigo-600 group-open:rotate-180 transition-transform">
                  ▼
                </span>
              </summary>
              <p className="px-6 pb-4 text-gray-600">
                Yes! Our curriculum covers both GSEB Board Biology and NEET. GSEB syllabus has
                significant overlap with NCERT/NEET. We bridge any gaps specific to Gujarat state
                board.
              </p>
            </details>
            <details className="bg-white rounded-xl shadow-md group">
              <summary className="px-6 py-4 cursor-pointer font-semibold text-gray-900 flex items-center justify-between">
                Are online classes available for Gujarat students?
                <span className="text-indigo-600 group-open:rotate-180 transition-transform">
                  ▼
                </span>
              </summary>
              <p className="px-6 pb-4 text-gray-600">
                Yes! All our classes are available online with live interactive sessions. Students
                from Ahmedabad, Surat, Vadodara, Rajkot attend our online batches. Classes are
                recorded for revision.
              </p>
            </details>
            <details className="bg-white rounded-xl shadow-md group">
              <summary className="px-6 py-4 cursor-pointer font-semibold text-gray-900 flex items-center justify-between">
                What about GUJCET preparation?
                <span className="text-indigo-600 group-open:rotate-180 transition-transform">
                  ▼
                </span>
              </summary>
              <p className="px-6 pb-4 text-gray-600">
                Our NEET preparation automatically covers GUJCET as well, since both test similar
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
                href="https://wa.me/918826444334?text=I%20am%20from%20Gujarat.%20I%20need%20Biology%20coaching%20for%20GSEB%20Board%20%2B%20NEET.%20Please%20share%20details."
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
