import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Biology Homework Help Online | Expert Tutors | All Levels',
  description:
    'Get expert Biology homework help online. AIIMS-trained tutors for NEET, CBSE, ICSE, A-Level, IB, IGCSE, AP. Step-by-step explanations. WhatsApp for instant help.',
  keywords: [
    'biology homework help',
    'biology homework help online',
    'biology assignment help',
    'biology help online',
    'help with biology homework',
  ],
  openGraph: {
    title: 'Biology Homework Help Online | Expert Tutors | All Levels',
    description:
      'Get expert Biology homework help online. AIIMS-trained tutors for NEET, CBSE, ICSE, A-Level, IB, IGCSE, AP. Step-by-step explanations. WhatsApp for instant help.',
    url: 'https://cerebrumbiologyacademy.com/biology-homework-help',
    locale: 'en',
    type: 'website',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/biology-homework-help',
  },
}

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html:
            '{"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"How do I get Biology homework help?","acceptedAnswer":{"@type":"Answer","text":"WhatsApp us at +91 88264 44334 with your question or photo of the problem. Our AIIMS-trained faculty responds within hours. For regular help, join our coaching program with 24/7 doubt support."}},{"@type":"Question","name":"What topics do you cover for homework help?","acceptedAnswer":{"@type":"Answer","text":"All Biology topics: Cell Biology, Genetics, Human Physiology, Plant Physiology, Ecology, Evolution, Biotechnology, Microbiology. For NEET, CBSE, ICSE, A-Level, IB, IGCSE, AP curricula."}},{"@type":"Question","name":"Is homework help free?","acceptedAnswer":{"@type":"Answer","text":"Quick doubt resolution is available for enrolled students via WhatsApp 24/7. For non-students, try our free MCQ practice tool with 19,619 questions and detailed explanations at cerebrumbiologyacademy.com/neet-biology-mcq"}}]}',
        }}
      />
      <div className="min-h-screen bg-gray-50">
        <section className="bg-gradient-to-br from-indigo-700 to-purple-800 text-white py-16">
          <div className="max-w-5xl mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Biology Homework Help Online</h1>
            <p className="text-xl text-purple-100 max-w-3xl mx-auto mb-8">
              Stuck on Biology homework? Get expert help from AIIMS-trained faculty. All levels —
              Class 9-12, NEET, A-Level, IB, IGCSE, AP.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="https://wa.me/918826444334?text=I%20need%20help%20with%20my%20Biology%20homework.%20Can%20you%20assist%3F"
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
                How do I get Biology homework help?
                <span className="text-indigo-600 group-open:rotate-180 transition-transform">
                  ▼
                </span>
              </summary>
              <p className="px-6 pb-4 text-gray-600">
                WhatsApp us at +91 88264 44334 with your question or photo of the problem. Our
                AIIMS-trained faculty responds within hours. For regular help, join our coaching
                program with 24/7 doubt support.
              </p>
            </details>
            <details className="bg-white rounded-xl shadow-md group">
              <summary className="px-6 py-4 cursor-pointer font-semibold text-gray-900 flex items-center justify-between">
                What topics do you cover for homework help?
                <span className="text-indigo-600 group-open:rotate-180 transition-transform">
                  ▼
                </span>
              </summary>
              <p className="px-6 pb-4 text-gray-600">
                All Biology topics: Cell Biology, Genetics, Human Physiology, Plant Physiology,
                Ecology, Evolution, Biotechnology, Microbiology. For NEET, CBSE, ICSE, A-Level, IB,
                IGCSE, AP curricula.
              </p>
            </details>
            <details className="bg-white rounded-xl shadow-md group">
              <summary className="px-6 py-4 cursor-pointer font-semibold text-gray-900 flex items-center justify-between">
                Is homework help free?
                <span className="text-indigo-600 group-open:rotate-180 transition-transform">
                  ▼
                </span>
              </summary>
              <p className="px-6 pb-4 text-gray-600">
                Quick doubt resolution is available for enrolled students via WhatsApp 24/7. For
                non-students, try our free MCQ practice tool with 19,619 questions and detailed
                explanations at cerebrumbiologyacademy.com/neet-biology-mcq
              </p>
            </details>
          </div>
        </section>

        <section className="py-16 bg-gradient-to-r from-indigo-700 to-purple-700 text-white">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">Get Started Today</h2>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="https://wa.me/918826444334?text=I%20need%20help%20with%20my%20Biology%20homework.%20Can%20you%20assist%3F"
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
