import { Metadata } from 'next'
import { Phone, MapPin, Users, Trophy, Zap, Award } from 'lucide-react'
import { CONTACT_INFO } from '@/lib/constants/contactInfo'
import { LocalBusinessSchema } from '@/components/seo/LocalBusinessSchema'
import { FAQSchema } from '@/components/seo/FAQSchema'

export const revalidate = 3600

export const metadata: Metadata = {
  title: 'NEET Biology Coaching in Surajkund, Faridabad | Expert Classes',
  description:
    'Best NEET biology coaching in Surajkund, Faridabad. Expert AIIMS faculty, 98% success rate, live classes & test series. 550+ students trained. Call 88264-44334.',
  keywords: [
    'neet coaching surajkund faridabad',
    'biology coaching surajkund',
    'best neet classes faridabad',
    'neet tuition near surajkund',
    'biology teacher faridabad',
    'neet preparation surajkund',
    'class 11 12 biology faridabad',
  ],
  openGraph: {
    title: 'NEET Biology Coaching in Surajkund, Faridabad | Expert Classes',
    description: 'Best NEET biology coaching near Surajkund. AIIMS faculty, 98% success rate, expert guidance.',
    url: 'https://cerebrumbiologyacademy.com/neet-coaching-surajkund',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/neet-coaching-surajkund',
  },
}

const faqItems = [
  {
    question: 'Which is the nearest Cerebrum center for Surajkund students?',
    answer:
      'Our Faridabad center at Sector 17 is the closest to Surajkund, just 25 km away. Many Surajkund students commute to our Faridabad center as it is well-connected via NH-44 and has ample parking facility.',
  },
  {
    question: 'Are there hostel facilities available for Surajkund students?',
    answer:
      'We have tie-ups with nearby hostel providers for students requiring accommodation. Our center also arranges group sharing options. Call ' +
      CONTACT_INFO.phone.primary +
      ' for hostel information and assistance.',
  },
  {
    question: 'What makes Cerebrum different from local coaching centers?',
    answer:
      'We offer AIIMS-trained faculty, small batches (10-12 students), comprehensive study material, live doubt sessions, weekly tests, and 24/7 online support. Our 98% success rate speaks for itself.',
  },
  {
    question: 'Can I attend online classes from Surajkund?',
    answer:
      'Yes! We offer hybrid classes. You can attend live sessions online while having the same curriculum and test series as offline students. Join from Surajkund itself or visit our Faridabad center.',
  },
  {
    question: 'How far is Surajkund from Cerebrum Faridabad center?',
    answer:
      'Surajkund is approximately 25-30 km from our Sector 17 center in Faridabad. It takes about 45-60 minutes depending on traffic. Many students find the travel worthwhile for quality education.',
  },
  {
    question: 'Are there special batches for Surajkund area students?',
    answer:
      'We customize batch timings based on demand. Students from Surajkund and surrounding areas are welcome to discuss dedicated batch timings. Contact us to explore options.',
  },
]

export default function NEETCoachingSurajkundPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-slate-900 to-slate-800 text-white py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Best NEET Biology Coaching Near Surajkund, Faridabad
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl">
            Expert NEET preparation for Surajkund students. 98% success rate, AIIMS faculty, live classes & comprehensive guidance.
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

      {/* Location Info */}
      <section className="py-12 bg-gray-50 border-b">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-6">For Surajkund Students</h2>
              <div className="space-y-4">
                <div className="flex gap-3">
                  <MapPin className="w-6 h-6 text-green-500 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-gray-900">Nearest Center</p>
                    <p className="text-gray-700">Sector 17, Faridabad, Haryana</p>
                    <p className="text-sm text-gray-600">25-30 km from Surajkund (45-60 min commute)</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Phone className="w-6 h-6 text-green-500 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-gray-900">Contact</p>
                    <a href={`tel:${CONTACT_INFO.phone.primary}`} className="text-green-600 hover:text-green-700 font-semibold">
                      {CONTACT_INFO.phone.primary}
                    </a>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Users className="w-6 h-6 text-green-500 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-gray-900">Students from Surajkund</p>
                    <p className="text-gray-700">Join our Faridabad or online batches</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md border-l-4 border-green-500">
              <h3 className="text-xl font-bold text-slate-900 mb-4">Surajkund Area Facts</h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex gap-2">
                  <span className="text-green-500">✓</span>
                  <span>Historic Surajkund Lake area</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-green-500">✓</span>
                  <span>Growing educational hub in NCR</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-green-500">✓</span>
                  <span>Many NEET aspirants from nearby towns</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-green-500">✓</span>
                  <span>Well-connected via NH-44 highway</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Cerebrum */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-slate-900 mb-12 text-center">Why Surajkund Students Choose Cerebrum</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: Trophy,
                title: '98% Success Rate',
                desc: 'Proven track record with NEET results',
              },
              {
                icon: Award,
                title: 'AIIMS Faculty',
                desc: 'Doctors who cleared NEET teach you',
              },
              {
                icon: Zap,
                title: 'Hybrid Learning',
                desc: 'Attend offline or online from Surajkund',
              },
              {
                icon: Users,
                title: '550+ Success Stories',
                desc: 'Faridabad center has transformed lives',
              },
              {
                icon: Phone,
                title: '24/7 Support',
                desc: 'WhatsApp doubt resolution anytime',
              },
              {
                icon: MapPin,
                title: 'Highway Access',
                desc: 'Easy commute via NH-44 highway',
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

      {/* Course Information */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-slate-900 mb-12 text-center">Courses for Surajkund Students</h2>

          <div className="space-y-4">
            {[
              {
                name: 'Class 11 Foundation',
                duration: '1 Year',
                price: '₹72,200',
                features: ['NCERT + NEET', 'Weekly Tests', 'Live Doubt Sessions'],
              },
              {
                name: 'Class 12 Intensive',
                duration: '1 Year',
                price: '₹72,200',
                features: ['Board + NEET', 'PYQ Analysis', '100+ Mock Tests'],
              },
              {
                name: 'NEET Dropper Batch',
                duration: '1 Year',
                price: '₹85,500',
                features: ['Crash Course', 'Daily Practice', 'Score Improvement Focus'],
              },
              {
                name: 'Online from Home',
                duration: 'Flexible',
                price: 'Starting ₹55,000',
                features: ['Live Interactive', 'Same Faculty', 'Recorded Access'],
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

          <div className="mt-8 bg-yellow-50 border border-yellow-200 p-6 rounded-lg">
            <p className="text-gray-800 mb-4">
              <strong>Special Offer for Surajkund:</strong> Flexible EMI options, scholarship for merit, hostel assistance available.
            </p>
            <a
              href={`tel:${CONTACT_INFO.phone.primary}`}
              className="bg-yellow-800 text-white px-6 py-2 rounded-lg font-semibold hover:bg-yellow-900 transition inline-block"
            >
              Get Course Details
            </a>
          </div>
        </div>
      </section>

      {/* Nearby Towns */}
      <section className="py-12 bg-white border-y">
        <div className="max-w-4xl mx-auto px-4">
          <h3 className="text-2xl font-bold text-slate-900 mb-6">Students from These Areas Also Join Us</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {['Surajkund', 'Ballabgarh', 'Palwal', 'NIT Faridabad', 'Sec 15-21', 'Bptp Parklands', 'Greater Faridabad', 'Old Faridabad'].map(
              (area) => (
                <div key={area} className="bg-gray-50 p-3 rounded border border-gray-200 text-center">
                  <p className="text-gray-700 font-medium text-sm">{area}</p>
                </div>
              ),
            )}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-slate-900 mb-12 text-center">FAQs - Surajkund Students</h2>

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
          <h2 className="text-3xl font-bold mb-4">Start Your NEET Success Story from Surajkund</h2>
          <p className="text-lg mb-8">Join 550+ Faridabad students. Book your FREE demo class now!</p>
          <a
            href={`tel:${CONTACT_INFO.phone.primary}`}
            className="bg-yellow-800 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-yellow-900 transition inline-block"
          >
            Call {CONTACT_INFO.phone.primary}
          </a>
        </div>
      </section>

      {/* Schema Markup */}
      <LocalBusinessSchema locationId="faridabad" />
      <FAQSchema questions={faqItems} pageUrl="https://cerebrumbiologyacademy.com/neet-coaching-surajkund" />
    </>
  )
}
