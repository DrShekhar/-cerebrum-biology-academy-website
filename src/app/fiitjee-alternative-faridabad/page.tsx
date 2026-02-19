import { Metadata } from 'next'
import Link from 'next/link'
import {
  Phone,
  MapPin,
  CheckCircle,
  Users,
  Clock,
  IndianRupee,
  Award,
  ArrowRight,
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'Best FIITJEE Alternative in Faridabad 2026 | Better Results, Lower Fees | Cerebrum',
  description:
    'Looking for FIITJEE alternative in Faridabad? Cerebrum Biology Academy: Same quality, 60% lower fees. AIIMS faculty, 98% success rate. Compare before you join. Call 88264-44334!',
  keywords: [
    'fiitjee alternative faridabad',
    'better than fiitjee faridabad',
    'fiitjee vs cerebrum faridabad',
    'neet coaching cheaper than fiitjee',
    'fiitjee faridabad fees comparison',
    'switch from fiitjee faridabad',
    'fiitjee competitor faridabad',
    'affordable neet coaching faridabad',
    'small batch neet coaching faridabad',
    'neet biology coaching faridabad',
    'biology coaching sector 17 faridabad',
  ],
  openGraph: {
    title: 'Best FIITJEE Alternative in Faridabad 2026 | Cerebrum Biology Academy',
    description:
      'Looking for FIITJEE alternative? Cerebrum offers 60% lower fees with 98% success rate.',
    url: 'https://cerebrumbiologyacademy.com/fiitjee-alternative-faridabad',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/fiitjee-alternative-faridabad',
  },
}

const comparisonData = [
  {
    feature: 'Annual Fee',
    fiitjee: '₹1.8-2.5 Lakh',
    cerebrum: '₹45,000-75,000',
    winner: 'cerebrum',
  },
  {
    feature: 'Batch Size',
    fiitjee: '50-80 students',
    cerebrum: '25 students max',
    winner: 'cerebrum',
  },
  {
    feature: 'Biology Focus',
    fiitjee: 'Secondary (JEE-focused)',
    cerebrum: 'Primary Specialization',
    winner: 'cerebrum',
  },
  {
    feature: 'Faculty',
    fiitjee: 'Mixed background',
    cerebrum: 'AIIMS-trained',
    winner: 'cerebrum',
  },
  {
    feature: 'Doubt Resolution',
    fiitjee: 'Queue-based',
    cerebrum: 'Same-day WhatsApp',
    winner: 'cerebrum',
  },
  {
    feature: 'Study Material',
    fiitjee: 'Generic all-subjects',
    cerebrum: 'NEET-specific biology',
    winner: 'cerebrum',
  },
  {
    feature: 'Success Rate (Biology)',
    fiitjee: 'Not published',
    cerebrum: '98%',
    winner: 'cerebrum',
  },
  {
    feature: 'Brand Recognition',
    fiitjee: 'National brand',
    cerebrum: 'Regional specialist',
    winner: 'fiitjee',
  },
]

const faqs = [
  {
    question: 'Why consider Cerebrum over FIITJEE Faridabad?',
    answer:
      'Key differences: 1) Specialized in NEET biology (FIITJEE focuses on JEE), 2) 60% lower fees (₹75K vs ₹2L+), 3) Smaller batches (25 vs 50+ students), 4) AIIMS-trained faculty, 5) 98% success rate in NEET biology. For NEET aspirants, biology specialist coaching gives better results.',
  },
  {
    question: 'How do fees compare: FIITJEE vs Cerebrum?',
    answer:
      'FIITJEE Faridabad: ₹1.8-2.5 Lakh/year for integrated programs. Cerebrum: ₹45,000-75,000/year for complete NEET biology coaching. You save ₹1.2-1.75 Lakh while getting specialized biology coaching with better student-teacher ratio.',
  },
  {
    question: 'Is FIITJEE good for NEET preparation?',
    answer:
      'FIITJEE is excellent for JEE/Engineering preparation but treats NEET as secondary. Their biology faculty often handles 100+ students. For serious NEET aspirants, biology-focused coaching like Cerebrum (25-student batches, AIIMS faculty) delivers better NEET biology results.',
  },
  {
    question: 'What if I am already enrolled in FIITJEE Faridabad?',
    answer:
      'Many FIITJEE students join Cerebrum for supplementary biology coaching. Options: 1) Complete biology-only batch (₹35,000/year), 2) NEET biology crash course (₹25,000), 3) Test series only (₹8,000). Timings adjusted to not clash with FIITJEE classes.',
  },
  {
    question: 'Which coaching has better results: FIITJEE or Cerebrum?',
    answer:
      "For NEET biology specifically: Cerebrum has 98% success rate with 50+ students scoring 350+/360 in biology annually. FIITJEE publishes overall results but doesn't break down biology scores. Our specialization means deeper coverage of NEET biology patterns.",
  },
  {
    question: 'Is batch size really smaller at Cerebrum?',
    answer:
      'Yes, verified difference: FIITJEE Faridabad has 50-80 students per batch. Cerebrum maintains strict 25-student limit for personal attention. This means 3x more doubt-resolution time per student and better faculty-student interaction.',
  },
  {
    question: 'Do you offer demo classes before switching?',
    answer:
      'Absolutely! Free 3-day trial: Attend classes, compare teaching quality, meet faculty, see infrastructure. No payment required. Many FIITJEE students switched after experiencing our focused teaching methodology. Book trial at 88264-44334.',
  },
  {
    question: 'What about study material comparison?',
    answer:
      'FIITJEE provides generic material for all subjects. Cerebrum provides: NEET-specific biology modules, NCERT line-by-line analysis, 10-year PYQ bank, chapter-wise mock tests, diagram practice sheets. Our material is updated after every NEET exam for latest patterns.',
  },
]

export default function FIITJEEAlternativeFaridabad() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-900 to-blue-700 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <span className="inline-block bg-yellow-500 text-blue-900 px-4 py-1 rounded-full text-sm font-semibold mb-4">
              FIITJEE Alternative in Faridabad
            </span>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Best FIITJEE Alternative in Faridabad
            </h1>
            <p className="text-xl text-blue-100 mb-8">
              Why pay ₹2+ Lakh when you can get better NEET results at ₹75K? Compare Cerebrum vs
              FIITJEE.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="tel:+918826444334"
                className="bg-yellow-500 text-blue-900 px-8 py-3 rounded-lg font-semibold flex items-center gap-2 hover:bg-yellow-400 transition"
              >
                <Phone className="w-5 h-5" />
                Call 88264-44334
              </a>
              <Link
                href="/neet-coaching-faridabad"
                className="bg-white/20 text-white px-8 py-3 rounded-lg font-semibold flex items-center gap-2 hover:bg-white/30 transition"
              >
                View All Courses
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Key Stats */}
      <section className="py-12 bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">60%</div>
              <div className="text-gray-600">Lower Fees</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">25</div>
              <div className="text-gray-600">Max Batch Size</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">98%</div>
              <div className="text-gray-600">Success Rate</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">150+</div>
              <div className="text-gray-600">FIITJEE Switchers</div>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            FIITJEE vs Cerebrum: Head-to-Head
          </h2>
          <div className="max-w-4xl mx-auto overflow-x-auto">
            <table className="w-full bg-white rounded-lg shadow-lg overflow-hidden">
              <thead className="bg-blue-900 text-white">
                <tr>
                  <th className="px-6 py-4 text-left">Feature</th>
                  <th className="px-6 py-4 text-center">FIITJEE</th>
                  <th className="px-6 py-4 text-center">Cerebrum</th>
                </tr>
              </thead>
              <tbody>
                {comparisonData.map((row, index) => (
                  <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                    <td className="px-6 py-4 font-medium">{row.feature}</td>
                    <td
                      className={`px-6 py-4 text-center ${row.winner === 'fiitjee' ? 'text-green-600 font-semibold' : ''}`}
                    >
                      {row.fiitjee}
                    </td>
                    <td
                      className={`px-6 py-4 text-center ${row.winner === 'cerebrum' ? 'text-green-600 font-semibold' : ''}`}
                    >
                      {row.cerebrum}
                      {row.winner === 'cerebrum' && (
                        <CheckCircle className="w-4 h-4 inline ml-2 text-green-600" />
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Why Switch */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Students Switch from FIITJEE</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <IndianRupee className="w-12 h-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-bold mb-3">Save ₹1.2+ Lakh</h3>
              <p className="text-gray-600">
                FIITJEE charges ₹2L+ for integrated programs. Cerebrum offers complete NEET biology
                coaching at ₹75K. Same quality, 60% savings.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <Users className="w-12 h-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-bold mb-3">3x More Attention</h3>
              <p className="text-gray-600">
                FIITJEE batches have 50-80 students. Our 25-student batches mean 3x more
                doubt-resolution time per student.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <Award className="w-12 h-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-bold mb-3">Biology Specialists</h3>
              <p className="text-gray-600">
                FIITJEE focuses on JEE. We specialize in NEET biology with AIIMS-trained faculty
                dedicated to biology excellence.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Center Location */}
      <section className="py-16 bg-blue-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="md:flex">
              <div className="md:w-1/2 p-8">
                <h2 className="text-2xl font-bold mb-4">Our Faridabad Center</h2>
                <div className="flex items-start gap-3 mb-4">
                  <MapPin className="w-5 h-5 text-blue-600 mt-1" />
                  <div>
                    <p className="font-semibold">Sector 17</p>
                    <p className="text-gray-600">Faridabad 121002</p>
                    <p className="text-sm text-gray-500 mt-1">Near Bata Chowk Metro (5 min walk)</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 mb-4">
                  <Clock className="w-5 h-5 text-blue-600 mt-1" />
                  <div>
                    <p className="font-semibold">Batch Timings</p>
                    <p className="text-gray-600">Morning: 8 AM - 12 PM</p>
                    <p className="text-gray-600">Evening: 5 PM - 8 PM</p>
                    <p className="text-gray-600">Weekend: Sat-Sun 9 AM - 1 PM</p>
                  </div>
                </div>
                <a
                  href="tel:+918826444334"
                  className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
                >
                  <Phone className="w-5 h-5" />
                  Book Free Trial
                </a>
              </div>
              <div className="md:w-1/2">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3509.1234567890123!2d77.3178!3d28.4089!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sSector%2017%2C%20Faridabad!5e0!3m2!1sen!2sin!4v1234567890"
                  width="100%"
                  height="300"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <details key={index} className="bg-white rounded-lg shadow-md group">
                <summary className="px-6 py-4 cursor-pointer font-semibold flex items-center justify-between hover:bg-gray-50">
                  {faq.question}
                  <span className="text-blue-600 group-open:rotate-180 transition-transform">
                    ▼
                  </span>
                </summary>
                <p className="px-6 pb-4 text-gray-600">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-blue-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Switch from FIITJEE?</h2>
          <p className="text-xl text-blue-100 mb-8">
            Book a free 3-day trial. Experience the Cerebrum difference.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="tel:+918826444334"
              className="bg-yellow-500 text-blue-900 px-8 py-3 rounded-lg font-semibold flex items-center gap-2 hover:bg-yellow-400 transition"
            >
              <Phone className="w-5 h-5" />
              Call Now: 88264-44334
            </a>
            <Link
              href="/neet-coaching-fees-faridabad"
              className="bg-white/20 text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/30 transition"
            >
              View Fee Comparison
            </Link>
          </div>
        </div>
      </section>

      {/* Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: faqs.map((faq) => ({
              '@type': 'Question',
              name: faq.question,
              acceptedAnswer: {
                '@type': 'Answer',
                text: faq.answer,
              },
            })),
          }),
        }}
      />
    </div>
  )
}
