import { Metadata } from 'next'
import Link from 'next/link'
import { Phone, MessageCircle, CheckCircle, Star, Users, Trophy, Monitor, Building2, MapPin, ArrowRight, BookOpen, Target, Clock, Gift, User, Navigation } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Biology Teacher Near Me in Noida 2026 | NEET Expert | Cerebrum',
  description:
    'Looking for biology teacher near me in Noida? Find expert NEET Biology faculty near Gaur City, Sector 150, Greater Noida. AIIMS-trained, Rs 48,000-98,000/year.',
  keywords: [
    'biology teacher near me noida',
    'biology tutor near me noida',
    'neet biology teacher noida',
    'biology faculty near me',
    'best biology teacher noida',
    'biology teacher gaur city',
    'biology teacher sector 150',
  ],
  openGraph: {
    title: 'Biology Teacher Near Me Noida | NEET Expert Faculty',
    description: 'Find expert NEET Biology teachers near you in Noida. AIIMS faculty.',
    url: 'https://cerebrumbiologyacademy.com/biology-teacher-near-me-noida',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/biology-teacher-near-me-noida',
  },
}

const locations = [
  { area: 'Gaur City', distance: '0 km', students: '200+' },
  { area: 'Sector 150', distance: '2 km', students: '150+' },
  { area: 'Greater Noida West', distance: '3 km', students: '180+' },
  { area: 'Noida Extension', distance: '4 km', students: '120+' },
  { area: 'Pari Chowk', distance: '5 km', students: '80+' },
  { area: 'Knowledge Park', distance: '6 km', students: '60+' },
]

const teacherProfile = {
  name: 'Dr. Shekhar',
  qualification: 'AIIMS Graduate',
  experience: '8+ Years Teaching',
  students: '2,000+ Taught',
  toppers: '50+ Medical Selections',
}

const tuitionOptions = [
  {
    name: 'Pursuit',
    batchSize: '30-40 students',
    hours: '6 hrs/week',
    fee: '48,000 - 70,000',
    features: ['AIIMS faculty teaching', 'NEET + Board coverage', '3,000+ practice questions', 'AI doubt bot access'],
    popular: true,
  },
  {
    name: 'Ascent',
    batchSize: '16-18 students',
    hours: '8 hrs/week',
    fee: '76,000 - 90,000',
    features: ['Smaller batch attention', '5,000+ practice questions', 'Weekly doubt sessions', 'Performance tracking'],
    recommended: true,
  },
  {
    name: 'Pinnacle',
    batchSize: '10-12 students',
    hours: '10-12 hrs/week',
    fee: '98,000 - 1,56,000',
    features: ['Personal mentorship', '7,000+ practice questions', 'Weekly 1-on-1 doubts', 'Money-back guarantee'],
  },
]

const freeTools = [
  { name: 'NEET Rank Predictor', href: '/neet-rank-predictor', icon: Target },
  { name: 'College Predictor', href: '/neet-college-predictor', icon: Building2 },
  { name: 'Study Plan Generator', href: '/neet-study-plan-generator', icon: BookOpen },
]

const faqs = [
  {
    question: 'Where can I find a biology teacher near me in Noida?',
    answer: 'Cerebrum Biology Academy is located in Gaur City, Noida with easy access from Sector 150, Greater Noida West, and Noida Extension. We also offer online classes for students who prefer learning from home.',
  },
  {
    question: 'What qualifications does the biology teacher have?',
    answer: 'Dr. Shekhar, our lead faculty, is an AIIMS graduate with 8+ years of teaching experience. He has taught 2,000+ students with 50+ medical college selections. All our faculty are from premier medical colleges.',
  },
  {
    question: 'Is online tuition available if I cannot travel?',
    answer: 'Yes! 70% of our students prefer online mode. Live Zoom classes, recorded lectures, WhatsApp doubt support - all at the same fee. Perfect if you are far from our Gaur City center.',
  },
  {
    question: 'What is the fee for biology tuition in Noida?',
    answer: 'Fees range from Rs 48,000-1,56,000/year depending on batch size and class. Pursuit (30-40 students): Rs 48,000-70,000, Ascent (16-18): Rs 76,000-90,000, Pinnacle (10-12): Rs 98,000-1,56,000.',
  },
]

export default function BiologyTeacherNearMeNoidaPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-cyan-50 to-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-slate-900 to-slate-800 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <span className="inline-flex items-center gap-2 bg-cyan-500 text-white px-4 py-1 rounded-full text-sm font-semibold mb-4">
              <Navigation className="w-4 h-4" /> Find Teachers Near You
            </span>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Biology Teacher Near Me in Noida</h1>
            <p className="text-xl text-slate-300 mb-6">
              Expert NEET Biology faculty near Gaur City, Sector 150, Greater Noida. Online option available.
            </p>

            {/* Quick Stats */}
            <div className="flex flex-wrap justify-center gap-6 mb-8">
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-yellow-400" />
                <span>Gaur City Center</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 text-yellow-400" />
                <span>AIIMS Faculty</span>
              </div>
              <div className="flex items-center gap-2">
                <Monitor className="w-5 h-5 text-yellow-400" />
                <span>Online Available</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a
                href="https://wa.me/918826444334?text=Hi!%20I'm%20looking%20for%20a%20biology%20teacher%20near%20me%20in%20Noida.%20Please%20share%20details."
                className="inline-flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-lg font-semibold text-lg transition shadow-lg"
              >
                <MessageCircle className="w-6 h-6" />
                WhatsApp Now
              </a>
              <a
                href="tel:+918826444334"
                className="inline-flex items-center justify-center gap-2 bg-yellow-500 hover:bg-yellow-400 text-slate-900 px-8 py-4 rounded-lg font-semibold text-lg transition"
              >
                <Phone className="w-5 h-5" />
                Call: 88264-44334
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Free Tools Banner */}
      <section className="py-6 bg-gradient-to-r from-cyan-600 to-blue-600 text-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center justify-center gap-6">
            <div className="flex items-center gap-2">
              <Gift className="w-5 h-5" />
              <span className="font-semibold">Free NEET Tools:</span>
            </div>
            {freeTools.map((tool) => (
              <Link
                key={tool.name}
                href={tool.href}
                className="inline-flex items-center gap-2 bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg text-sm transition"
              >
                <tool.icon className="w-4 h-4" />
                {tool.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Teacher Profile */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Meet Your Biology Teacher</h2>
          <div className="max-w-4xl mx-auto bg-gradient-to-r from-cyan-50 to-blue-50 rounded-2xl p-8">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="w-48 h-48 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full flex items-center justify-center">
                <User className="w-24 h-24 text-white" />
              </div>
              <div className="flex-1 text-center md:text-left">
                <h3 className="text-3xl font-bold text-slate-900 mb-2">{teacherProfile.name}</h3>
                <p className="text-cyan-600 font-semibold text-lg mb-4">{teacherProfile.qualification}</p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-white rounded-lg p-4 shadow-sm">
                    <p className="text-2xl font-bold text-cyan-600">8+</p>
                    <p className="text-sm text-gray-600">Years Teaching</p>
                  </div>
                  <div className="bg-white rounded-lg p-4 shadow-sm">
                    <p className="text-2xl font-bold text-cyan-600">2,000+</p>
                    <p className="text-sm text-gray-600">Students Taught</p>
                  </div>
                  <div className="bg-white rounded-lg p-4 shadow-sm">
                    <p className="text-2xl font-bold text-cyan-600">50+</p>
                    <p className="text-sm text-gray-600">Medical Selections</p>
                  </div>
                  <div className="bg-white rounded-lg p-4 shadow-sm">
                    <p className="text-2xl font-bold text-cyan-600">98%</p>
                    <p className="text-sm text-gray-600">Success Rate</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Locations Coverage */}
      <section className="py-16 bg-cyan-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">Areas We Serve in Noida</h2>
          <p className="text-center text-gray-600 mb-12">Online classes available for all locations</p>

          <div className="grid md:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {locations.map((loc, index) => (
              <div key={index} className="bg-white rounded-lg p-4 flex items-center gap-4 shadow-sm">
                <MapPin className="w-8 h-8 text-cyan-600" />
                <div>
                  <h3 className="font-semibold">{loc.area}</h3>
                  <p className="text-sm text-gray-500">{loc.distance} from center | {loc.students} students</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tuition Options */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">Tuition Options</h2>
          <p className="text-center text-gray-600 mb-12">Choose based on your preference</p>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {tuitionOptions.map((plan, index) => (
              <div
                key={index}
                className={`rounded-2xl p-6 relative ${
                  plan.recommended
                    ? 'bg-yellow-400 shadow-xl scale-105'
                    : plan.popular
                    ? 'bg-cyan-50 border-2 border-cyan-300'
                    : 'bg-gray-50 border-2 border-gray-200'
                }`}
              >
                {plan.recommended && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-xs font-bold px-4 py-1 rounded-full">
                    RECOMMENDED
                  </span>
                )}
                {plan.popular && !plan.recommended && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-cyan-600 text-white text-xs font-bold px-4 py-1 rounded-full">
                    BUDGET FRIENDLY
                  </span>
                )}
                <Monitor className={`w-10 h-10 mb-4 ${plan.recommended ? 'text-slate-900' : 'text-cyan-600'}`} />
                <h3 className="text-xl font-bold mb-1">{plan.name}</h3>
                <p className={`text-sm ${plan.recommended ? 'text-slate-700' : 'text-gray-500'}`}>{plan.batchSize} | {plan.hours}</p>
                <p className="text-3xl font-bold my-4">
                  ₹{plan.fee}
                  <span className="text-sm font-normal">/year</span>
                </p>
                <ul className="space-y-2 mb-6">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm">
                      <CheckCircle className={`w-4 h-4 mt-0.5 ${plan.recommended ? 'text-slate-900' : 'text-green-600'}`} />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <a
                  href={`https://wa.me/918826444334?text=Hi!%20I'm%20interested%20in%20${encodeURIComponent(plan.name)}%20Biology%20tuition%20near%20me%20in%20Noida.`}
                  className={`block text-center py-3 rounded-lg font-semibold transition ${
                    plan.recommended
                      ? 'bg-slate-900 text-white hover:bg-slate-800'
                      : 'bg-green-500 text-white hover:bg-green-600'
                  }`}
                >
                  <MessageCircle className="w-4 h-4 inline mr-2" />
                  Enquire Now
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <details key={index} className="bg-white rounded-lg shadow-md group">
                <summary className="px-6 py-4 cursor-pointer font-semibold flex items-center justify-between hover:bg-gray-50">
                  {faq.question}
                  <span className="text-cyan-600 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="px-6 pb-4 text-gray-600">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 bg-gradient-to-br from-slate-900 to-slate-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Connect with Expert Biology Teacher Today!</h2>
          <p className="text-xl text-slate-300 mb-8">Start your NEET journey with AIIMS-trained faculty</p>

          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8">
            <a
              href="https://wa.me/918826444334?text=Hi!%20I%20found%20you%20searching%20for%20biology%20teacher%20near%20me%20in%20Noida.%20Please%20share%20demo%20class%20details."
              className="inline-flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-lg font-semibold text-lg transition shadow-lg"
            >
              <MessageCircle className="w-6 h-6" />
              Book Free Demo
            </a>
            <Link
              href="/biology-tuition-noida"
              className="inline-flex items-center justify-center gap-2 bg-yellow-500 hover:bg-yellow-400 text-slate-900 px-8 py-4 rounded-lg font-semibold text-lg transition"
            >
              View All Programs <ArrowRight className="w-5 h-5" />
            </Link>
          </div>

          <p className="text-slate-400 text-sm">
            <Clock className="w-4 h-4 inline mr-1" />
            Respond within 30 minutes during 9 AM - 9 PM
          </p>
        </div>
      </section>

      {/* Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'LocalBusiness',
            name: 'Cerebrum Biology Academy',
            description: 'Expert Biology teacher for NEET in Noida',
            address: {
              '@type': 'PostalAddress',
              addressLocality: 'Noida',
              addressRegion: 'UP',
              addressCountry: 'IN',
            },
            geo: {
              '@type': 'GeoCoordinates',
              latitude: '28.5355',
              longitude: '77.3910',
            },
            telephone: '+91-8826444334',
            priceRange: 'Rs 48,000 - Rs 1,56,000',
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: faqs.map((faq) => ({
              '@type': 'Question',
              name: faq.question,
              acceptedAnswer: { '@type': 'Answer', text: faq.answer },
            })),
          }),
        }}
      />
    </div>
  )
}
