import { Metadata } from 'next'
import Link from 'next/link'
import { Phone, MapPin, CheckCircle, Clock, Award, ArrowRight, UserCheck } from 'lucide-react'

export const metadata: Metadata = {
  title: 'YVS Institute Alternative in Faridabad | AIIMS Faculty NEET Biology | Cerebrum',
  description:
    "Looking for YVS Institute alternative in Faridabad? Cerebrum: Biology-specialist coaching, AIIMS faculty, 15-20 student batches vs YVS's 40-60. 98% success rate. Call 88264-44334!",
  keywords: [
    'yvs alternative faridabad',
    'yvs institute faridabad review',
    'better than yvs faridabad',
    'yvs india alternative',
    'yvs institute alternative faridabad',
    'neet biology coaching faridabad',
    'small batch neet coaching faridabad',
    'biology coaching sector 17 faridabad',
    'yvs nit faridabad alternative',
    'best neet coaching faridabad',
  ],
  openGraph: {
    title: 'YVS Institute Alternative in Faridabad | Cerebrum Biology Academy',
    description:
      'Looking for biology-specialist alternative to YVS? Get AIIMS faculty and small batches.',
    url: 'https://cerebrumbiologyacademy.com/yvs-alternative-faridabad',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/yvs-alternative-faridabad',
  },
}

const comparisonData = [
  {
    feature: 'Batch Size',
    yvs: '40-60 students',
    cerebrum: '15-20 students max',
    winner: 'cerebrum',
  },
  {
    feature: 'Biology Approach',
    yvs: 'Generic PCB coaching',
    cerebrum: 'Biology-specialist',
    winner: 'cerebrum',
  },
  {
    feature: 'Faculty',
    yvs: 'General faculty',
    cerebrum: 'AIIMS-trained (Dr. Shekhar, 15+ yrs)',
    winner: 'cerebrum',
  },
  {
    feature: 'Doubt Resolution',
    yvs: 'Limited time after class',
    cerebrum: 'Same-day WhatsApp',
    winner: 'cerebrum',
  },
  {
    feature: 'Teaching Methods',
    yvs: 'Traditional approach',
    cerebrum: 'Modern + Online/Hybrid',
    winner: 'cerebrum',
  },
  {
    feature: 'MCQ Practice',
    yvs: 'Standard question bank',
    cerebrum: '19,600+ questions (6 types)',
    winner: 'cerebrum',
  },
  {
    feature: 'Personal Attention',
    yvs: 'Moderate',
    cerebrum: '3x more per student',
    winner: 'cerebrum',
  },
  {
    feature: 'Local Reputation',
    yvs: 'Established in NIT area',
    cerebrum: 'Growing specialist brand',
    winner: 'yvs',
  },
]

const faqs = [
  {
    question: 'Why consider Cerebrum over YVS Institute?',
    answer:
      'Top reasons students switch: 1) Biology specialization - YVS teaches PCB together while Cerebrum focuses solely on biology, 2) AIIMS-trained faculty vs general teachers, 3) Smaller batches (15-20 vs 40-60 students), 4) Modern teaching methods + online/hybrid options, 5) 19,600+ MCQ practice bank with 6 question types.',
  },
  {
    question: 'How do YVS and Cerebrum compare for NEET biology?',
    answer:
      'YVS is a general PCB coaching institute - biology is just one of three subjects. Cerebrum is biology-specialist: 1) All faculty are biology experts with AIIMS/medical background, 2) Daily biology classes (not alternate days), 3) NEET biology pattern expertise, 4) Diagram-focused teaching, 5) NCERT line-by-line coverage.',
  },
  {
    question: 'Is YVS Institute good for NEET?',
    answer:
      "YVS is one of Faridabad's established coaching institutes with a decent track record. However, for serious NEET aspirants: 1) Their generic PCB approach means biology doesn't get specialized attention, 2) Batch sizes of 40-60 limit personal interaction, 3) No AIIMS-trained biology faculty. For biology-focused prep, a specialist institute delivers better results.",
  },
  {
    question: 'What if I am already enrolled in YVS?',
    answer:
      'Many YVS students join Cerebrum for supplementary biology coaching. Options: 1) Biology-only weekend batch (₹35,000/year), 2) Test series membership (₹8,000/year), 3) Crash courses before exams (₹15,000-25,000). Timings designed to complement YVS schedule.',
  },
  {
    question: 'How do batch sizes compare?',
    answer:
      'YVS typically has 40-60 students per batch. Cerebrum maintains strict 15-20 student limit. This means 2-3x more doubt-resolution time per student, better faculty-student interaction, and truly personalized attention for every student.',
  },
  {
    question: 'What about location convenience?',
    answer:
      'YVS is in NIT area. Cerebrum is in Sector 17, near Bata Chowk Metro (5 min walk). Sector 17 is centrally located and easily accessible from NIT Faridabad, Sector 15-17, Old Faridabad, Greater Faridabad, and Ballabgarh areas.',
  },
  {
    question: 'Does Cerebrum offer scholarship like YVS?',
    answer:
      'Yes! Cerebrum offers scholarship up to 100% fee waiver based on merit. Options: 1) Score-based scholarship (previous exam marks), 2) Financial need-based concession, 3) Sibling discount. Many students pay significantly less than the listed fee.',
  },
  {
    question: 'How to decide between YVS and Cerebrum?',
    answer:
      'Choose YVS if: You want all-subjects coaching under one roof, you prefer the NIT area location. Choose Cerebrum if: Biology is your weak subject or you want to score 300+ in biology, you need AIIMS faculty guidance, you prefer smaller batches with personal attention, you want modern teaching + online/hybrid options.',
  },
]

const painPoints = [
  {
    problem: 'Generic PCB Approach',
    yvs: 'Biology taught alongside Physics & Chemistry - no specialization',
    solution: 'Biology-specialist institute with AIIMS faculty',
  },
  {
    problem: 'Medium-Large Batches',
    yvs: '40-60 students per batch',
    solution: '15-20 students max - personal attention guaranteed',
  },
  {
    problem: 'Traditional Methods',
    yvs: 'Older teaching approach, limited online options',
    solution: 'Modern methods + online/hybrid flexibility',
  },
  {
    problem: 'Limited MCQ Practice',
    yvs: 'Standard question bank',
    solution: '19,600+ MCQs across 6 question types including data interpretation',
  },
]

export default function YVSAlternativeFaridabad() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-800 to-green-600 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <span className="inline-block bg-yellow-500 text-green-900 px-4 py-1 rounded-full text-sm font-semibold mb-4">
              YVS Institute Alternative in Faridabad
            </span>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Best YVS Institute Alternative in Faridabad
            </h1>
            <p className="text-xl text-green-100 mb-8">
              Want biology-specialist coaching instead of generic PCB? Get AIIMS faculty and 15-20
              student batches at Cerebrum.
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
              <div className="text-3xl font-bold text-green-600">3x</div>
              <div className="text-gray-600">More Attention</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">15-20</div>
              <div className="text-gray-600">Max Batch Size</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">98%</div>
              <div className="text-gray-600">Success Rate</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">19,600+</div>
              <div className="text-gray-600">Practice MCQs</div>
            </div>
          </div>
        </div>
      </section>

      {/* Pain Points */}
      <section className="py-16 bg-red-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">
            Why Students Look for YVS Alternatives
          </h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Common reasons students seek biology-specialist coaching over generic PCB institutes
          </p>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {painPoints.map((point, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-xl font-bold text-red-600 mb-4">{point.problem}</h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3 text-gray-500">
                    <span className="text-red-400">✗</span>
                    <span>YVS: {point.yvs}</span>
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
          <h2 className="text-3xl font-bold text-center mb-12">
            YVS Institute vs Cerebrum: Head-to-Head
          </h2>
          <div className="max-w-4xl mx-auto overflow-x-auto">
            <table className="w-full bg-white rounded-lg shadow-lg overflow-hidden">
              <thead className="bg-green-800 text-white">
                <tr>
                  <th className="px-6 py-4 text-left">Feature</th>
                  <th className="px-6 py-4 text-center">YVS Institute</th>
                  <th className="px-6 py-4 text-center">Cerebrum</th>
                </tr>
              </thead>
              <tbody>
                {comparisonData.map((row, index) => (
                  <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                    <td className="px-6 py-4 font-medium">{row.feature}</td>
                    <td
                      className={`px-6 py-4 text-center ${row.winner === 'yvs' ? 'text-green-600 font-semibold' : ''}`}
                    >
                      {row.yvs}
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
      <section className="py-16 bg-green-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Why Students Choose Cerebrum Over YVS
          </h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <UserCheck className="w-12 h-12 text-green-600 mb-4" />
              <h3 className="text-xl font-bold mb-3">Biology Specialist</h3>
              <p className="text-gray-600">
                YVS teaches Physics, Chemistry, and Biology together generically. Cerebrum is
                exclusively a biology coaching institute with AIIMS-trained faculty (Dr. Shekhar
                Singh, 15+ years experience).
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <Clock className="w-12 h-12 text-green-600 mb-4" />
              <h3 className="text-xl font-bold mb-3">Modern + Hybrid</h3>
              <p className="text-gray-600">
                While YVS uses traditional methods, Cerebrum combines modern teaching with
                online/hybrid options. Plus 19,600+ MCQs across 6 question types for comprehensive
                practice.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <Award className="w-12 h-12 text-green-600 mb-4" />
              <h3 className="text-xl font-bold mb-3">Smaller Batches</h3>
              <p className="text-gray-600">
                YVS has 40-60 students per batch. Cerebrum limits to 15-20 students for genuine
                personal attention. Every student gets individual focus and doubt resolution.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Supplementary Options */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">Already in YVS?</h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Many YVS students take our supplementary biology coaching alongside
          </p>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="bg-green-50 border border-green-200 rounded-xl p-6 text-center">
              <div className="text-2xl font-bold text-green-600 mb-2">₹35,000/year</div>
              <div className="font-semibold mb-2">Weekend Biology Batch</div>
              <p className="text-sm text-gray-600">
                Sat-Sun classes that complement YVS weekday schedule
              </p>
            </div>
            <div className="bg-green-50 border border-green-200 rounded-xl p-6 text-center">
              <div className="text-2xl font-bold text-green-600 mb-2">₹8,000/year</div>
              <div className="font-semibold mb-2">Test Series Only</div>
              <p className="text-sm text-gray-600">
                Weekly tests + analysis without regular classes
              </p>
            </div>
            <div className="bg-green-50 border border-green-200 rounded-xl p-6 text-center">
              <div className="text-2xl font-bold text-green-600 mb-2">₹15-25,000</div>
              <div className="font-semibold mb-2">Crash Courses</div>
              <p className="text-sm text-gray-600">
                Pre-exam intensive revision for specific topics
              </p>
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
                <h2 className="text-2xl font-bold mb-4">Our Faridabad Center</h2>
                <div className="flex items-start gap-3 mb-4">
                  <MapPin className="w-5 h-5 text-green-600 mt-1" />
                  <div>
                    <p className="font-semibold">Sector 17</p>
                    <p className="text-gray-600">Faridabad 121002</p>
                    <p className="text-sm text-gray-500 mt-1">Near Bata Chowk Metro (5 min walk)</p>
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
                  <span className="text-green-600 group-open:rotate-180 transition-transform">
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
      <section className="py-16 bg-green-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready for Biology-Specialist Coaching?</h2>
          <p className="text-xl text-green-100 mb-8">
            Book a free 3-day trial. Experience AIIMS faculty teaching in small batches.
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
