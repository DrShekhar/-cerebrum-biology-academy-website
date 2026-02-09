import { Metadata } from 'next'
import Link from 'next/link'
import { Phone, MapPin, Users, Trophy, Zap, Award } from 'lucide-react'
import { CONTACT_INFO } from '@/lib/constants/contactInfo'
import { LocalBusinessSchema } from '@/components/seo/LocalBusinessSchema'
import { FAQSchema } from '@/components/seo/FAQSchema'

export const revalidate = 3600

export const metadata: Metadata = {
  title: 'NEET Coaching in Sector 62 Noida | Best Biology Classes Near You',
  description:
    'Top-rated NEET biology coaching in Sector 62, Noida. Expert AIIMS faculty, 98% success rate, live classes & test series. Join 480+ successful students. Call 88264-44334.',
  keywords: [
    'neet coaching sector 62 noida',
    'biology coaching sector 62',
    'best neet classes noida',
    'neet tuition near sector 62',
    'biology teacher sector 62 noida',
    'neet preparation sector 62',
    'class 11 12 biology noida',
  ],
  openGraph: {
    title: 'NEET Coaching in Sector 62 Noida | Best Biology Classes',
    description: 'Expert NEET biology coaching at Sector 62, Noida. 98% success rate, AIIMS faculty.',
    url: 'https://cerebrumbiologyacademy.com/neet-coaching-sector-62-noida',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/neet-coaching-sector-62-noida',
  },
}

const faqItems = [
  {
    question: 'Where is Cerebrum Noida center located?',
    answer:
      'Our Noida center is located at B-45, Sector 62, Noida, UP - 201301. It is just 200 meters from Sector 62 Metro Station, making it highly accessible for students across Noida and Greater Noida.',
  },
  {
    question: 'What courses are available for Sector 62 students?',
    answer:
      'We offer Class 11, Class 12, Dropper/Repeater batches, and specialized NEET preparation. All courses include live classes, comprehensive study material, weekly tests, doubt sessions, and online recorded lectures.',
  },
  {
    question: 'Are there batch timings suitable for working professionals?',
    answer:
      'Yes! We have morning, afternoon, and evening batch options from 7 AM to 9 PM. Students from Sector 62, Indirapuram, Vaishali, and Crossing Republik can choose timings that suit them best.',
  },
  {
    question: 'Is there free demo class available?',
    answer:
      'Absolutely! We offer free demo classes at our Sector 62 center. Call ' +
      CONTACT_INFO.phone.primary +
      ' to book your demo and experience our teaching methodology directly.',
  },
  {
    question: 'What is the average success rate at Cerebrum Noida?',
    answer:
      'We maintain a 98% NEET success rate with average biology scores of 330+/360. Our students have scored AIR ranks from various medical colleges including AIIMS, MAMC, and top government medical colleges.',
  },
  {
    question: 'Are there scholarships available for Sector 62 students?',
    answer:
      'Yes, we offer merit-based scholarships and flexible EMI options. Call our center to discuss scholarship eligibility and payment plans tailored to your needs.',
  },
]

export default function NEETCoachingSector62NoidaPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-slate-900 to-slate-800 text-white py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Best NEET Biology Coaching in Sector 62, Noida
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl">
            Expert coaching from AIIMS faculty. 98% success rate, 480+ students trained, live classes & comprehensive test series.
          </p>
          <div className="mt-8 flex gap-4 flex-wrap">
            <a
              href={`tel:${CONTACT_INFO.phone.primary}`}
              className="bg-yellow-800 text-white px-6 py-3 rounded-lg font-semibold hover:bg-yellow-900 transition inline-flex items-center gap-2"
            >
              <Phone className="w-5 h-5" />
              Call {CONTACT_INFO.phone.primary}
            </a>
            <a
              href="/find-center"
              className="bg-green-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-600 transition"
            >
              Book Demo Class
            </a>
          </div>
        </div>
      </section>

      {/* Center Info */}
      <section className="py-12 bg-gray-50 border-b">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Cerebrum Biology Academy - Noida</h2>
              <div className="space-y-4">
                <div className="flex gap-3">
                  <MapPin className="w-6 h-6 text-green-500 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-gray-900">Location</p>
                    <p className="text-gray-700">B-45, Sector 62, Noida, UP - 201301</p>
                    <p className="text-sm text-gray-600">200 meters from Sector 62 Metro Station</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Phone className="w-6 h-6 text-green-500 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-gray-900">Phone</p>
                    <a href={`tel:${CONTACT_INFO.phone.primary}`} className="text-green-600 hover:text-green-700 font-semibold">
                      {CONTACT_INFO.phone.primary}
                    </a>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Users className="w-6 h-6 text-green-500 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-gray-900">Batch Size</p>
                    <p className="text-gray-700">10-12 students per batch for personal attention</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md border-l-4 border-green-500">
              <h3 className="text-xl font-bold text-slate-900 mb-4">Quick Stats</h3>
              <div className="space-y-3">
                <p className="flex justify-between">
                  <span className="text-gray-700">Success Rate:</span>
                  <strong className="text-green-600">98%</strong>
                </p>
                <p className="flex justify-between">
                  <span className="text-gray-700">Students Trained:</span>
                  <strong className="text-green-600">480+</strong>
                </p>
                <p className="flex justify-between">
                  <span className="text-gray-700">Avg Biology Score:</span>
                  <strong className="text-green-600">330+/360</strong>
                </p>
                <p className="flex justify-between">
                  <span className="text-gray-700">Faculty:</span>
                  <strong className="text-green-600">AIIMS-trained</strong>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Cerebrum */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-slate-900 mb-12 text-center">Why Choose Cerebrum for Sector 62?</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: Trophy,
                title: '98% Success Rate',
                desc: 'Highest success rate in NEET biology coaching',
              },
              {
                icon: Award,
                title: 'AIIMS Faculty',
                desc: 'Learn from doctors who cracked NEET themselves',
              },
              {
                icon: Zap,
                title: 'Small Batches',
                desc: 'Only 10-12 students per class for personal attention',
              },
              {
                icon: Users,
                title: '480+ Success Stories',
                desc: 'Students scoring 330+ in NEET Biology',
              },
              {
                icon: Phone,
                title: '24/7 Doubt Resolution',
                desc: 'WhatsApp support for queries anytime',
              },
              {
                icon: MapPin,
                title: 'Metro Adjacent',
                desc: '200m from Sector 62 Metro for easy access',
              },
            ].map((item, idx) => (
              <div key={idx} className="p-6 bg-gray-50 rounded-lg border border-gray-200 hover:shadow-md transition">
                <item.icon className="w-10 h-10 text-green-500 mb-4" />
                <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Course Details */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-slate-900 mb-12 text-center">Courses Available in Sector 62, Noida</h2>

          <div className="space-y-4">
            {[
              {
                name: 'Class 11 NEET Foundation',
                duration: '1 Year',
                price: '₹72,200',
                features: ['NCERT Mastery', 'Weekly Tests', 'Doubt Sessions'],
              },
              {
                name: 'Class 12 NEET Intensive',
                duration: '1 Year',
                price: '₹72,200',
                features: ['Board + NEET', 'PYQ Analysis', '100+ Mocks'],
              },
              {
                name: 'NEET Dropper Batch',
                duration: '1 Year',
                price: '₹85,500',
                features: ['Complete Revision', 'Daily Practice', 'Score Guarantee'],
              },
            ].map((course, idx) => (
              <div key={idx} className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-green-500">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{course.name}</h3>
                    <p className="text-gray-600 text-sm">{course.duration}</p>
                  </div>
                  <span className="bg-green-100 text-green-700 px-3 py-1 rounded font-semibold">{course.price}</span>
                </div>
                <div className="flex gap-2 flex-wrap">
                  {course.features.map((feat, i) => (
                    <span key={i} className="bg-gray-100 text-gray-700 px-3 py-1 rounded text-sm">
                      {feat}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <p className="text-gray-600 mb-4">Flexible EMI options available. Scholarships for meritorious students.</p>
            <a
              href={`tel:${CONTACT_INFO.phone.primary}`}
              className="bg-yellow-800 text-white px-8 py-3 rounded-lg font-semibold hover:bg-yellow-900 transition inline-block"
            >
              Enquire About Fees
            </a>
          </div>
        </div>
      </section>

      {/* Nearby Areas */}
      <section className="py-12 bg-white border-y">
        <div className="max-w-4xl mx-auto px-4">
          <h3 className="text-2xl font-bold text-slate-900 mb-6">Serving These Areas</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {['Sector 62', 'Sector 18', 'Sector 44', 'Electronic City', 'Noida City Centre', 'Indirapuram', 'Vaishali', 'Crossing Republik'].map(
              (area) => (
                <div key={area} className="bg-gray-50 p-3 rounded border border-gray-200 text-center">
                  <p className="text-gray-700 font-medium">{area}</p>
                </div>
              ),
            )}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-slate-900 mb-12 text-center">FAQs - Sector 62 Noida</h2>

          <div className="space-y-4">
            {faqItems.map((item, idx) => (
              <details
                key={idx}
                className="group bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow"
              >
                <summary className="flex items-center justify-between cursor-pointer p-4 hover:bg-gray-50">
                  <h3 className="font-semibold text-gray-900 pr-4">{item.question}</h3>
                  <span className="text-gray-500 group-open:rotate-180 transition-transform flex-shrink-0">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </span>
                </summary>
                <div className="p-4 pt-0 text-gray-600 border-t border-gray-100">{item.answer}</div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-gradient-to-r from-green-500 to-green-600 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Excel in NEET Biology?</h2>
          <p className="text-lg mb-8">Join 480+ successful students at Cerebrum Noida. Book your FREE demo class today!</p>
          <a
            href={`tel:${CONTACT_INFO.phone.primary}`}
            className="bg-yellow-800 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-yellow-900 transition inline-block"
          >
            Call {CONTACT_INFO.phone.primary}
          </a>
        </div>
      </section>

      {/* Schema Markup */}
      <LocalBusinessSchema locationId="noida" />
      <FAQSchema questions={faqItems} pageUrl="https://cerebrumbiologyacademy.com/neet-coaching-sector-62-noida" />
    </>
  )
}
