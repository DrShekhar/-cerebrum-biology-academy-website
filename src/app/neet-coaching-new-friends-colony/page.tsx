import { Metadata } from 'next'
import { Phone, MapPin, Users, Trophy, Zap, Award } from 'lucide-react'
import { CONTACT_INFO } from '@/lib/constants/contactInfo'
import { LocalBusinessSchema } from '@/components/seo/LocalBusinessSchema'
import { FAQSchema } from '@/components/seo/FAQSchema'

export const revalidate = 3600

export const metadata: Metadata = {
  title: 'Best NEET Biology Coaching in New Friends Colony, Delhi',
  description:
    'Top NEET biology coaching in New Friends Colony, Delhi. Expert AIIMS faculty, 98% success rate, live classes & comprehensive test series. 780+ students. Call 88264-44334.',
  keywords: [
    'neet coaching new friends colony',
    'biology tuition new friends colony',
    'best neet classes nfc delhi',
    'neet preparation new friends colony',
    'biology teacher new friends colony',
    'class 11 12 coaching nfc',
    'neet coaching near maharani bagh',
  ],
  openGraph: {
    title: 'Best NEET Biology Coaching in New Friends Colony, Delhi',
    description: 'Expert NEET biology coaching at New Friends Colony. AIIMS faculty, 98% success rate, small batches.',
    url: 'https://cerebrumbiologyacademy.com/neet-coaching-new-friends-colony',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/neet-coaching-new-friends-colony',
  },
}

const faqItems = [
  {
    question: 'Where is the closest Cerebrum center to New Friends Colony?',
    answer:
      'Our South Extension center at Block D, South Extension Part 2 is just 5 minutes walk from New Friends Colony. This central location makes it perfect for NFC, Maharani Bagh, and surrounding areas.',
  },
  {
    question: 'What makes NFC a great location for NEET coaching?',
    answer:
      'New Friends Colony is part of premium South Delhi educational hub. Close to AIIMS Delhi, surrounded by top schools, excellent metro connectivity, and a studious environment ideal for NEET preparation.',
  },
  {
    question: 'Are there morning and evening batches available?',
    answer:
      'Yes! We have batches from 7 AM to 9 PM. New Friends Colony students can choose based on their school hours and preferences. We customize timings based on demand.',
  },
  {
    question: 'Is parking available at the South Extension center?',
    answer:
      'Yes, our center has dedicated parking. However, New Friends Colony is very well connected by metro (South Extension Market metro). Many students prefer metro for convenience.',
  },
  {
    question: 'Can I visit our center before enrolling?',
    answer:
      'Absolutely! We welcome students and parents to visit our South Extension center. Free demo classes are offered daily. Call ' +
      CONTACT_INFO.phone.primary +
      ' to book a demo.',
  },
  {
    question: 'What is the environment like at the South Extension center?',
    answer:
      'We maintain a professional, focused learning environment with AC classrooms, digital boards, library, computer lab, and common areas. Small batch sizes ensure every student gets attention.',
  },
]

export default function NEETCoachingNewFriendsColonyPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-slate-900 to-slate-800 text-white py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Best NEET Biology Coaching in New Friends Colony, Delhi
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl">
            Premier NEET coaching for NFC & South Delhi students. AIIMS faculty, 98% success rate, live classes, and personalized guidance.
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
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Cerebrum South Extension - NFC Location</h2>
              <div className="space-y-4">
                <div className="flex gap-3">
                  <MapPin className="w-6 h-6 text-green-500 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-gray-900">Location</p>
                    <p className="text-gray-700">Block D, South Extension Part 2, New Delhi - 110049</p>
                    <p className="text-sm text-gray-600">5 min walk from New Friends Colony</p>
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
                    <p className="text-gray-700">10-12 students per batch</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md border-l-4 border-green-500">
              <h3 className="text-xl font-bold text-slate-900 mb-4">South Extension Stats</h3>
              <div className="space-y-3">
                <p className="flex justify-between">
                  <span className="text-gray-700">Success Rate:</span>
                  <strong className="text-green-600">98%</strong>
                </p>
                <p className="flex justify-between">
                  <span className="text-gray-700">Students Trained:</span>
                  <strong className="text-green-600">780+</strong>
                </p>
                <p className="flex justify-between">
                  <span className="text-gray-700">Avg Biology Score:</span>
                  <strong className="text-green-600">330+/360</strong>
                </p>
                <p className="flex justify-between">
                  <span className="text-gray-700">Metro Access:</span>
                  <strong className="text-green-600">5 min walk</strong>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Cerebrum */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-slate-900 mb-12 text-center">Why NFC Students Choose Cerebrum</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: Trophy,
                title: '98% Success Rate',
                desc: 'Highest success rate in South Delhi',
              },
              {
                icon: Award,
                title: 'AIIMS Faculty',
                desc: 'Learn from top medical professionals',
              },
              {
                icon: Zap,
                title: 'Ultra Small Batches',
                desc: '10-12 students per batch for 1-on-1 attention',
              },
              {
                icon: Users,
                title: '780+ Success Stories',
                desc: 'South Extension center has 4.9/5 rating',
              },
              {
                icon: Phone,
                title: '24/7 WhatsApp Support',
                desc: 'Instant doubt resolution anytime',
              },
              {
                icon: MapPin,
                title: 'Premium Location',
                desc: 'Walking distance from NFC & metro',
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
          <h2 className="text-3xl font-bold text-slate-900 mb-12 text-center">Courses Available for NFC Students</h2>

          <div className="space-y-4">
            {[
              {
                name: 'Class 11 NEET Foundation',
                duration: '1 Year',
                price: '₹72,200',
                features: ['NCERT Mastery', 'Concept Building', 'Weekly Tests'],
              },
              {
                name: 'Class 12 NEET Intensive',
                duration: '1 Year',
                price: '₹72,200',
                features: ['Board + NEET', 'PYQ Analysis', '100+ Mock Tests'],
              },
              {
                name: 'NEET Dropper Batch',
                duration: '1 Year',
                price: '₹85,500',
                features: ['Crash Course', 'Daily Practice', 'Score Improvement'],
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
            <p className="text-gray-600 mb-4">
              Flexible payment plans. Scholarships for meritorious students. Special discounts available.
            </p>
            <a
              href={`tel:${CONTACT_INFO.phone.primary}`}
              className="bg-yellow-800 text-white px-8 py-3 rounded-lg font-semibold hover:bg-yellow-900 transition inline-block"
            >
              Get Full Course Details
            </a>
          </div>
        </div>
      </section>

      {/* Nearby Areas */}
      <section className="py-12 bg-white border-y">
        <div className="max-w-4xl mx-auto px-4">
          <h3 className="text-2xl font-bold text-slate-900 mb-6">We Serve These South Delhi Areas</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {['New Friends Colony', 'Maharani Bagh', 'South Extension', 'Greater Kailash', 'Defence Colony', 'Lajpat Nagar', 'Saket', 'Malviya Nagar'].map(
              (area) => (
                <div key={area} className="bg-gray-50 p-3 rounded border border-gray-200 text-center">
                  <p className="text-gray-700 font-medium text-sm">{area}</p>
                </div>
              ),
            )}
          </div>
        </div>
      </section>

      {/* Premium Facilities */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">Premium Facilities at South Extension</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              'Air-Conditioned Classrooms',
              'Digital Interactive Boards',
              'Well-Stocked Library',
              'Computer Lab with Online Tests',
              'Common Area for Group Study',
              'Parking Available',
              'Metro Connected',
              'Student Cafeteria',
            ].map((facility, idx) => (
              <div key={idx} className="flex gap-3 p-4 bg-gray-50 rounded-lg">
                <span className="text-green-500 text-xl">✓</span>
                <p className="text-gray-700 font-medium">{facility}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-slate-900 mb-12 text-center">FAQs - New Friends Colony</h2>

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
          <h2 className="text-3xl font-bold mb-4">Join 780+ Successful NFC Students!</h2>
          <p className="text-lg mb-8">
            Visit our South Extension center. Just 5 minutes from New Friends Colony. Book your FREE demo class today!
          </p>
          <a
            href={`tel:${CONTACT_INFO.phone.primary}`}
            className="bg-yellow-800 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-yellow-900 transition inline-block"
          >
            Call {CONTACT_INFO.phone.primary}
          </a>
        </div>
      </section>

      {/* Schema Markup */}
      <LocalBusinessSchema locationId="south-extension" />
      <FAQSchema questions={faqItems} pageUrl="https://cerebrumbiologyacademy.com/neet-coaching-new-friends-colony" />
    </>
  )
}
