import { Metadata } from 'next'
import Link from 'next/link'
import { Phone, MapPin, CheckCircle, Clock, Award, ArrowRight, UserCheck } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Best Narayana Alternative in Gurugram 2026 | Small Batch Personal Attention',
  description:
    "Looking for Narayana alternative in Gurugram? Cerebrum: 25-student batches vs Narayana's 100+. AIIMS faculty, 98% success rate. Personal attention guaranteed. Call 88264-44334!",
  keywords: [
    'narayana alternative gurugram',
    'narayana alternative gurgaon',
    'better than narayana gurugram',
    'narayana vs cerebrum gurugram',
    'small batch neet coaching',
    'narayana gurgaon fees comparison',
    'switch from narayana gurugram',
    'narayana competitor gurugram',
    'personal attention neet coaching',
    'neet biology coaching gurugram',
    'biology coaching sector 51 gurgaon',
  ],
  openGraph: {
    title: 'Best Narayana Alternative in Gurugram 2026',
    description: 'Tired of crowded Narayana batches? Get personal attention with 25-student batches.',
    url: 'https://cerebrumbiologyacademy.com/narayana-alternative-gurugram',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/narayana-alternative-gurugram',
  },
}

const comparisonData = [
  { feature: 'Batch Size', narayana: '100-150 students', cerebrum: '25 students max', winner: 'cerebrum' },
  { feature: 'Annual Fee', narayana: '₹1.2-1.8 Lakh', cerebrum: '₹45,000-75,000', winner: 'cerebrum' },
  { feature: 'Doubt Resolution', narayana: 'Days/weeks wait', cerebrum: 'Same-day WhatsApp', winner: 'cerebrum' },
  { feature: 'Faculty Access', narayana: 'Limited/queue', cerebrum: 'Direct contact', winner: 'cerebrum' },
  { feature: 'Biology Focus', narayana: 'One of 3 subjects', cerebrum: 'Primary Specialization', winner: 'cerebrum' },
  { feature: 'Personal Attention', narayana: 'Minimal', cerebrum: '4x more time', winner: 'cerebrum' },
  { feature: 'Faculty Stability', narayana: 'High turnover', cerebrum: 'Consistent team', winner: 'cerebrum' },
  { feature: 'Brand Network', narayana: 'Pan-India', cerebrum: 'Regional focus', winner: 'narayana' },
]

const faqs = [
  {
    question: 'Why switch from Narayana to Cerebrum?',
    answer: "Top reasons students switch: 1) Batch size - Narayana has 100-150 students, Cerebrum has 25, 2) Personal attention - doubts answered same day vs weeks later, 3) Faculty access - direct WhatsApp for doubts, 4) Specialized biology focus vs general coaching, 5) Better success rate in biology (98%).",
  },
  {
    question: 'How do Narayana and Cerebrum fees compare?',
    answer: 'Narayana Gurugram: ₹1.2-1.8 Lakh/year for NEET programs. Cerebrum: ₹45,000-75,000/year for comprehensive NEET biology coaching. Save ₹75K-1L while getting 4x more personal attention per student.',
  },
  {
    question: 'Is Narayana good for NEET in Gurugram?',
    answer: "Narayana has a strong brand but Gurugram branches are known for very large batches (100-150 students). Good for self-motivated students who don't need much personal guidance. If you need doubt resolution and personal attention, smaller batches work better.",
  },
  {
    question: 'What is the main problem with Narayana Gurugram?',
    answer: "Common complaints from ex-Narayana students: 1) Too crowded - can't ask doubts in class, 2) Faculty turnover - teachers change mid-session, 3) Focus on quantity over quality, 4) Generic study material, 5) Long wait for doubt resolution. Cerebrum solves all these with small batches.",
  },
  {
    question: 'Can I join Cerebrum after leaving Narayana mid-year?',
    answer: 'Yes! We have flexible joining options: 1) Mid-session joining with catch-up support, 2) Backlog clearing batches for specific chapters, 3) Fast-track revision for already-covered syllabus, 4) No penalty or extra fees for mid-year joiners.',
  },
  {
    question: 'What makes Cerebrum better for biology specifically?',
    answer: "Cerebrum is a biology-specialized institute: 1) All faculty are biology experts (AIIMS/medical background), 2) Daily biology classes (not alternate days), 3) NEET biology pattern expertise, 4) Diagram-focused teaching, 5) NCERT line-by-line coverage. Narayana treats biology as just one of 3 subjects.",
  },
  {
    question: 'Do Narayana students join for supplementary biology?',
    answer: 'Yes, many Narayana students take our: 1) Biology-only batch (weekends, ₹35,000/year), 2) Test series membership (₹8,000/year), 3) Crash courses before exams (₹15,000-25,000). Timings designed to complement Narayana schedule.',
  },
  {
    question: 'How to decide between Narayana and Cerebrum?',
    answer: "Choose Narayana if: You want all-subjects coaching, you are highly self-motivated, you don't need personal attention. Choose Cerebrum if: Biology is your weak subject, you need doubt resolution, you want small batches, you are serious about biology score in NEET.",
  },
]

const painPoints = [
  {
    problem: 'Too Crowded',
    narayana: '100-150 students per batch',
    solution: '25 students max - 4x more attention',
  },
  {
    problem: 'Doubt Resolution',
    narayana: 'Wait days or weeks for answers',
    solution: 'Same-day resolution via WhatsApp',
  },
  {
    problem: 'Faculty Turnover',
    narayana: 'Teachers change mid-session',
    solution: 'Consistent faculty throughout',
  },
  {
    problem: 'Generic Teaching',
    narayana: 'Biology treated as just another subject',
    solution: 'Biology specialists with AIIMS background',
  },
]

export default function NarayanaAlternativeGurugram() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-800 to-green-600 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <span className="inline-block bg-yellow-500 text-green-900 px-4 py-1 rounded-full text-sm font-semibold mb-4">
              Narayana Alternative in Gurugram
            </span>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Best Narayana Alternative in Gurugram
            </h1>
            <p className="text-xl text-green-100 mb-8">
              Tired of crowded Narayana batches? Get personal attention with 25-student batches at Cerebrum.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="tel:+918826444334"
                className="bg-yellow-500 text-green-900 px-8 py-3 rounded-lg font-semibold flex items-center gap-2 hover:bg-yellow-400 transition"
              >
                <Phone className="w-5 h-5" />
                Call 88264-44334
              </a>
              <Link
                href="/neet-coaching-gurugram"
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
              <div className="text-3xl font-bold text-green-600">4x</div>
              <div className="text-gray-600">More Attention</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">25</div>
              <div className="text-gray-600">Max Batch Size</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">98%</div>
              <div className="text-gray-600">Success Rate</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">200+</div>
              <div className="text-gray-600">Narayana Switchers</div>
            </div>
          </div>
        </div>
      </section>

      {/* Pain Points */}
      <section className="py-16 bg-red-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">Common Narayana Problems We Solve</h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Hear what ex-Narayana students said about why they switched
          </p>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {painPoints.map((point, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-xl font-bold text-red-600 mb-4">{point.problem}</h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3 text-gray-500">
                    <span className="text-red-400">✗</span>
                    <span>Narayana: {point.narayana}</span>
                  </div>
                  <div className="flex items-start gap-3 text-green-700 font-medium">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                    <span>Cerebrum: {point.solution}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Narayana vs Cerebrum: Head-to-Head</h2>
          <div className="max-w-4xl mx-auto overflow-x-auto">
            <table className="w-full bg-white rounded-lg shadow-lg overflow-hidden">
              <thead className="bg-green-800 text-white">
                <tr>
                  <th className="px-6 py-4 text-left">Feature</th>
                  <th className="px-6 py-4 text-center">Narayana</th>
                  <th className="px-6 py-4 text-center">Cerebrum</th>
                </tr>
              </thead>
              <tbody>
                {comparisonData.map((row, index) => (
                  <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                    <td className="px-6 py-4 font-medium">{row.feature}</td>
                    <td className={`px-6 py-4 text-center ${row.winner === 'narayana' ? 'text-green-600 font-semibold' : ''}`}>
                      {row.narayana}
                    </td>
                    <td className={`px-6 py-4 text-center ${row.winner === 'cerebrum' ? 'text-green-600 font-semibold' : ''}`}>
                      {row.cerebrum}
                      {row.winner === 'cerebrum' && <CheckCircle className="w-4 h-4 inline ml-2 text-green-600" />}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Why Switch */}
      <section className="py-16 bg-green-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Students Switch from Narayana</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <UserCheck className="w-12 h-12 text-green-600 mb-4" />
              <h3 className="text-xl font-bold mb-3">Personal Attention</h3>
              <p className="text-gray-600">
                Narayana batches have 100-150 students. You become just a number. Our 25-student limit ensures every student gets individual focus.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <Clock className="w-12 h-12 text-green-600 mb-4" />
              <h3 className="text-xl font-bold mb-3">Instant Doubt Resolution</h3>
              <p className="text-gray-600">
                At Narayana, doubts pile up for days. At Cerebrum, WhatsApp your doubt and get answers the same day. No waiting, no queues.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <Award className="w-12 h-12 text-green-600 mb-4" />
              <h3 className="text-xl font-bold mb-3">Biology Specialists</h3>
              <p className="text-gray-600">
                Narayana treats biology as one of many subjects. We specialize in NEET biology with AIIMS-trained faculty who live and breathe biology.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Supplementary Options */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">Already in Narayana?</h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Many Narayana students take our supplementary biology coaching alongside
          </p>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="bg-green-50 border border-green-200 rounded-xl p-6 text-center">
              <div className="text-2xl font-bold text-green-600 mb-2">₹35,000/year</div>
              <div className="font-semibold mb-2">Weekend Biology Batch</div>
              <p className="text-sm text-gray-600">Sat-Sun classes that complement Narayana weekday schedule</p>
            </div>
            <div className="bg-green-50 border border-green-200 rounded-xl p-6 text-center">
              <div className="text-2xl font-bold text-green-600 mb-2">₹8,000/year</div>
              <div className="font-semibold mb-2">Test Series Only</div>
              <p className="text-sm text-gray-600">Weekly tests + analysis without regular classes</p>
            </div>
            <div className="bg-green-50 border border-green-200 rounded-xl p-6 text-center">
              <div className="text-2xl font-bold text-green-600 mb-2">₹15-25,000</div>
              <div className="font-semibold mb-2">Crash Courses</div>
              <p className="text-sm text-gray-600">Pre-exam intensive revision for specific topics</p>
            </div>
          </div>
        </div>
      </section>

      {/* Center Location */}
      <section className="py-16 bg-green-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="md:flex">
              <div className="md:w-1/2 p-8">
                <h2 className="text-2xl font-bold mb-4">Our Gurugram Center</h2>
                <div className="flex items-start gap-3 mb-4">
                  <MapPin className="w-5 h-5 text-green-600 mt-1" />
                  <div>
                    <p className="font-semibold">M2K Corporate Park</p>
                    <p className="text-gray-600">Sector 51, Gurugram 122018</p>
                    <p className="text-sm text-gray-500 mt-1">Narayana is in Sector 14 (8 km away)</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 mb-4">
                  <Clock className="w-5 h-5 text-green-600 mt-1" />
                  <div>
                    <p className="font-semibold">Batch Timings</p>
                    <p className="text-gray-600">Morning: 8 AM - 12 PM</p>
                    <p className="text-gray-600">Evening: 5 PM - 8 PM</p>
                    <p className="text-gray-600">Weekend: Sat-Sun 9 AM - 1 PM</p>
                  </div>
                </div>
                <a
                  href="tel:+918826444334"
                  className="inline-flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition"
                >
                  <Phone className="w-5 h-5" />
                  Book Free Trial
                </a>
              </div>
              <div className="md:w-1/2">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3509.1234567890123!2d77.0712345!3d28.4123456!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sM2K%20Corporate%20Park%2C%20Sector%2051%2C%20Gurugram!5e0!3m2!1sen!2sin!4v1234567890"
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
                  <span className="text-green-600 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="px-6 pb-4 text-gray-600">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-green-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Switch from Narayana?</h2>
          <p className="text-xl text-green-100 mb-8">
            Book a free 3-day trial. Experience personal attention in small batches.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="tel:+918826444334"
              className="bg-yellow-500 text-green-900 px-8 py-3 rounded-lg font-semibold flex items-center gap-2 hover:bg-yellow-400 transition"
            >
              <Phone className="w-5 h-5" />
              Call Now: 88264-44334
            </a>
            <Link
              href="/neet-coaching-fees-gurugram"
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
