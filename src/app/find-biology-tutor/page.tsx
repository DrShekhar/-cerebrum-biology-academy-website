import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Find a Biology Tutor | Online & Offline | NEET, A-Level, IB, IGCSE',
  description:
    'Find the perfect Biology tutor for your needs. AIIMS-trained faculty for NEET, Board exams, A-Level, IB, IGCSE, AP. Online classes worldwide. 4 centers in Delhi NCR.',
  keywords: [
    'find biology tutor',
    'biology tutor',
    'find a biology teacher',
    'biology tutor for my child',
    'best biology tutor',
  ],
  openGraph: {
    title: 'Find a Biology Tutor | Online & Offline | NEET, A-Level, IB, IGCSE',
    description:
      'Find the perfect Biology tutor for your needs. AIIMS-trained faculty for NEET, Board exams, A-Level, IB, IGCSE, AP. Online classes worldwide. 4 centers in Delhi NCR.',
    url: 'https://cerebrumbiologyacademy.com/find-biology-tutor',
    locale: 'en',
    type: 'website',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/find-biology-tutor',
  },
}

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html:
            '{"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"How do I find the right Biology tutor?","acceptedAnswer":{"@type":"Answer","text":"Tell us your curriculum (NEET/CBSE/IB/A-Level/IGCSE/AP), class level, and goals. We will match you with the right batch and faculty. WhatsApp us at +91 88264 44334."}},{"@type":"Question","name":"Do you offer 1-on-1 tutoring?","acceptedAnswer":{"@type":"Answer","text":"We specialize in small-batch coaching (15-20 students) which provides personal attention at a fraction of 1-on-1 cost. For premium 1-on-1 mentorship, ask about our Pinnacle program."}},{"@type":"Question","name":"Can I find a tutor for international curricula?","acceptedAnswer":{"@type":"Answer","text":"Yes! We have expert tutors for A-Level (Cambridge, Edexcel, AQA), IB Biology (HL/SL), IGCSE, AP Biology, and GCSE. 92% A*/A rate."}}]}',
        }}
      />
      <div className="min-h-screen bg-gray-50">
        <section className="bg-gradient-to-br from-indigo-700 to-purple-800 text-white py-16">
          <div className="max-w-5xl mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Find a Biology Tutor</h1>
            <p className="text-xl text-purple-100 max-w-3xl mx-auto mb-8">
              Whether you need NEET coaching, Board exam help, or international curriculum support —
              find your ideal Biology tutor here.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="https://wa.me/918826444334?text=I%20am%20looking%20for%20a%20Biology%20tutor.%20Can%20you%20help%20me%20find%20the%20right%20program%3F"
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
                How do I find the right Biology tutor?
                <span className="text-indigo-600 group-open:rotate-180 transition-transform">
                  ▼
                </span>
              </summary>
              <p className="px-6 pb-4 text-gray-600">
                Tell us your curriculum (NEET/CBSE/IB/A-Level/IGCSE/AP), class level, and goals. We
                will match you with the right batch and faculty. WhatsApp us at +91 88264 44334.
              </p>
            </details>
            <details className="bg-white rounded-xl shadow-md group">
              <summary className="px-6 py-4 cursor-pointer font-semibold text-gray-900 flex items-center justify-between">
                Do you offer 1-on-1 tutoring?
                <span className="text-indigo-600 group-open:rotate-180 transition-transform">
                  ▼
                </span>
              </summary>
              <p className="px-6 pb-4 text-gray-600">
                We specialize in small-batch coaching (15-20 students) which provides personal
                attention at a fraction of 1-on-1 cost. For premium 1-on-1 mentorship, ask about our
                Pinnacle program.
              </p>
            </details>
            <details className="bg-white rounded-xl shadow-md group">
              <summary className="px-6 py-4 cursor-pointer font-semibold text-gray-900 flex items-center justify-between">
                Can I find a tutor for international curricula?
                <span className="text-indigo-600 group-open:rotate-180 transition-transform">
                  ▼
                </span>
              </summary>
              <p className="px-6 pb-4 text-gray-600">
                Yes! We have expert tutors for A-Level (Cambridge, Edexcel, AQA), IB Biology
                (HL/SL), IGCSE, AP Biology, and GCSE. 92% A*/A rate.
              </p>
            </details>
          </div>
        </section>

        <section className="py-16 bg-gradient-to-r from-indigo-700 to-purple-700 text-white">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">Get Started Today</h2>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="https://wa.me/918826444334?text=I%20am%20looking%20for%20a%20Biology%20tutor.%20Can%20you%20help%20me%20find%20the%20right%20program%3F"
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
