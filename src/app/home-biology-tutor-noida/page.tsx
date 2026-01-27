import { Metadata } from 'next'
import Link from 'next/link'
import { Phone, MessageCircle, CheckCircle, Star, Users, Trophy, Building2, MapPin, ArrowRight, BookOpen, Target, Clock, Gift, Home, Wifi, Video } from 'lucide-react'
import { NoidaPageSchemas } from '@/components/seo/NoidaSchemas'

export const metadata: Metadata = {
  title: 'Home Biology Tutor in Noida 2026 | Online Home Tuition | Rs 45,000/year',
  description:
    'Home Biology tutor in Noida. Learn from home via online classes. AIIMS faculty, Class 9-12 & NEET. Rs 45,000/year. Gaur City, Sector 150, Greater Noida. Free demo!',
  keywords: [
    'home biology tutor noida',
    'home tuition biology noida',
    'biology home tutor noida',
    'home tutor for biology noida',
    'online home tuition biology noida',
    'biology tutor at home noida',
    'private home tutor biology noida',
  ],
  openGraph: {
    title: 'Home Biology Tutor Noida | Learn from Home | AIIMS Faculty',
    description: 'Best home Biology tutor in Noida. Online classes from your home with AIIMS faculty.',
    url: 'https://cerebrumbiologyacademy.com/home-biology-tutor-noida',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/home-biology-tutor-noida',
  },
}

const homeTuitionModes = [
  {
    mode: 'Pursuit Tier (Online)',
    description: '30-40 students | 6 hrs/week',
    fee: '48,000 - 70,000',
    features: ['Live interactive classes', 'Learn from your room', 'AI doubt bot access', 'Recorded lectures'],
    icon: Wifi,
    popular: true,
  },
  {
    mode: 'Ascent Tier (Online)',
    description: '16-18 students | 8 hrs/week',
    fee: '76,000',
    features: ['Weekly group doubt sessions', 'Performance tracking', 'Better attention', 'Standard mock tests'],
    icon: Building2,
    recommended: true,
  },
  {
    mode: 'Pinnacle Tier (Online)',
    description: '10-12 students | 10-12 hrs/week',
    fee: '98,000 - 1,56,000',
    features: ['Personal mentorship from Dr. Shekhar', 'Weekly 1-on-1 doubt sessions', 'Money-back guarantee', 'Priority support'],
    icon: Video,
  },
]

const benefits = [
  { title: 'No Travel Time', description: 'Save 2-3 hours daily commuting in Noida traffic', icon: Clock },
  { title: 'Safe Learning', description: 'Study in your comfortable home environment', icon: Home },
  { title: 'Same Quality', description: 'AIIMS faculty, same as offline coaching', icon: Star },
  { title: 'Parent Supervision', description: 'Parents can monitor classes from home', icon: Users },
  { title: 'Cost Effective', description: 'Save transport + food costs', icon: Target },
  { title: 'Flexible Timing', description: 'Morning, afternoon, or evening batches', icon: Clock },
]

const freeTools = [
  { name: 'NEET Rank Predictor', href: '/neet-rank-predictor', icon: Target },
  { name: 'College Predictor', href: '/neet-college-predictor', icon: Building2 },
  { name: 'Study Plan Generator', href: '/neet-study-plan-generator', icon: BookOpen },
]

const faqs = [
  {
    question: 'Do you provide home visit tuition in Noida?',
    answer: 'We provide online home tuition - you learn from your Noida home via live video classes. This is better than physical home visits: same quality, lower cost (Rs 45,000 vs Rs 2-3 lakhs), and access to AIIMS faculty who don\'t do home visits.',
  },
  {
    question: 'What is the fee for home Biology tutor in Noida?',
    answer: 'Online home tuition fees by tier: Pursuit (30-40 students): Rs 48,000-70,000/year, Ascent (16-18 students): Rs 76,000/year, Pinnacle (10-12 students): Rs 98,000-1,56,000/year. All tiers include AIIMS faculty and recorded lectures. Much better value than home tutors charging Rs 1,000-2,000/hour.',
  },
  {
    question: 'How does online home tuition work?',
    answer: 'Live classes via Zoom from your home. AIIMS faculty teaches just like classroom. You can ask questions, share screen for doubts. Classes are recorded for revision. WhatsApp support for doubts between classes.',
  },
  {
    question: 'Can parents monitor online home tuition?',
    answer: 'Yes! Parents can sit in the same room during classes. We also provide weekly progress reports, test scores, and monthly parent meetings. Much more transparent than traditional home tutors.',
  },
]

const areas = [
  'Gaur City 1 & 2', 'Sector 150', 'Greater Noida West', 'Sector 128', 'Jaypee Greens',
  'ATS Pristine', 'Sector 62', 'Sector 18', 'Noida Extension', 'Sector 137',
  'Alpha Beta Gamma', 'Knowledge Park', 'Sector 76', 'Sector 50', 'Pari Chowk'
]

export default function HomeBiologyTutorNoidaPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50 to-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-slate-900 to-slate-800 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <span className="inline-flex items-center gap-2 bg-rose-500 text-white px-4 py-1 rounded-full text-sm font-semibold mb-4">
              <Home className="w-4 h-4" /> Learn from Home
            </span>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Home Biology Tutor in Noida</h1>
            <p className="text-xl text-slate-300 mb-6">
              Get AIIMS-faculty coaching from your Noida home. Online home tuition at Rs 45,000/year.
            </p>

            {/* Quick Stats */}
            <div className="flex flex-wrap justify-center gap-6 mb-8">
              <div className="flex items-center gap-2">
                <Home className="w-5 h-5 text-yellow-400" />
                <span>Learn from Home</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 text-yellow-400" />
                <span>AIIMS Faculty</span>
              </div>
              <div className="flex items-center gap-2">
                <Trophy className="w-5 h-5 text-yellow-400" />
                <span>500+ Selections</span>
              </div>
            </div>

            {/* CTA Buttons - WhatsApp Priority */}
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a
                href="https://wa.me/918826444334?text=Hi!%20I'm%20looking%20for%20home%20Biology%20tutor%20in%20Noida.%20Please%20share%20online%20home%20tuition%20details."
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
      <section className="py-6 bg-gradient-to-r from-rose-600 to-pink-600 text-white">
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

      {/* Home Tuition Modes */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">Home Tuition Options for Noida</h2>
          <p className="text-center text-gray-600 mb-12">Choose how you want to learn from home</p>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {homeTuitionModes.map((item, index) => (
              <div
                key={index}
                className={`rounded-2xl p-6 relative ${
                  item.recommended
                    ? 'bg-yellow-400 shadow-xl scale-105'
                    : item.popular
                    ? 'bg-rose-50 border-2 border-rose-300'
                    : 'bg-gray-50 border-2 border-gray-200'
                }`}
              >
                {item.recommended && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-xs font-bold px-4 py-1 rounded-full">
                    RECOMMENDED
                  </span>
                )}
                {item.popular && !item.recommended && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-rose-600 text-white text-xs font-bold px-4 py-1 rounded-full">
                    MOST POPULAR
                  </span>
                )}
                <item.icon className={`w-10 h-10 mb-4 ${item.recommended ? 'text-slate-900' : 'text-rose-600'}`} />
                <h3 className="text-xl font-bold mb-2">{item.mode}</h3>
                <p className={`text-sm mb-2 ${item.recommended ? 'text-slate-700' : 'text-gray-500'}`}>{item.description}</p>
                <p className="text-3xl font-bold mb-4">
                  ₹{item.fee}
                  {item.fee.includes('hour') ? '' : <span className="text-sm font-normal">/year</span>}
                </p>
                <ul className="space-y-2 mb-6">
                  {item.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm">
                      <CheckCircle className={`w-4 h-4 mt-0.5 ${item.recommended ? 'text-slate-900' : 'text-green-600'}`} />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <a
                  href={`https://wa.me/918826444334?text=Hi!%20I'm%20interested%20in%20${encodeURIComponent(item.mode)}%20Biology%20tuition%20in%20Noida.`}
                  className={`block text-center py-3 rounded-lg font-semibold transition ${
                    item.recommended
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

      {/* Benefits */}
      <section className="py-16 bg-rose-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">Why Online Home Tuition is Better</h2>
          <p className="text-center text-gray-600 mb-12">Benefits for Noida students and parents</p>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {benefits.map((item, index) => (
              <div key={index} className="bg-white rounded-xl p-6 text-center shadow-md">
                <item.icon className="w-12 h-12 text-rose-600 mx-auto mb-4" />
                <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Areas Served */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">Home Tuition Available Across Noida</h2>
          <p className="text-center text-gray-600 mb-8">Online home tuition for all localities</p>

          <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
            {areas.map((area) => (
              <span key={area} className="bg-rose-100 text-rose-800 px-4 py-2 rounded-full text-sm font-medium">
                <MapPin className="w-3 h-3 inline mr-1" />
                {area}
              </span>
            ))}
          </div>

          <div className="mt-8 text-center">
            <p className="text-gray-600">
              <Home className="w-4 h-4 inline mr-1" />
              No matter where you live in Noida - online home tuition reaches your doorstep!
            </p>
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
                  <span className="text-rose-600 group-open:rotate-180 transition-transform">▼</span>
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
          <h2 className="text-3xl font-bold mb-4">Start Home Biology Tuition Today!</h2>
          <p className="text-xl text-slate-300 mb-8">AIIMS-quality coaching from your Noida home</p>

          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8">
            <a
              href="https://wa.me/918826444334?text=Hi!%20I%20want%20to%20start%20home%20Biology%20tuition%20in%20Noida.%20Please%20share%20demo%20class%20details."
              className="inline-flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-lg font-semibold text-lg transition shadow-lg"
            >
              <MessageCircle className="w-6 h-6" />
              Chat on WhatsApp
            </a>
            <Link
              href="/free-neet-demo-class-gurugram"
              className="inline-flex items-center justify-center gap-2 bg-yellow-500 hover:bg-yellow-400 text-slate-900 px-8 py-4 rounded-lg font-semibold text-lg transition"
            >
              Book Free Demo <ArrowRight className="w-5 h-5" />
            </Link>
          </div>

          <p className="text-slate-400 text-sm">
            <Clock className="w-4 h-4 inline mr-1" />
            Respond within 30 minutes during 9 AM - 9 PM
          </p>
        </div>
      </section>

      {/* Comprehensive Schema Markup */}
      <NoidaPageSchemas
        area="Noida"
        pageName="Home Biology Tutor in Noida"
        pageDescription="Home Biology tutor in Noida. Online home tuition with AIIMS faculty for Class 9-12 & NEET."
        pageUrl="https://cerebrumbiologyacademy.com/home-biology-tutor-noida"
        breadcrumbs={[
          { name: 'Home', url: 'https://cerebrumbiologyacademy.com' },
          { name: 'Noida', url: 'https://cerebrumbiologyacademy.com/locations/noida' },
          { name: 'Home Biology Tutor', url: 'https://cerebrumbiologyacademy.com/home-biology-tutor-noida' },
        ]}
        customFAQs={faqs}
      />
    </div>
  )
}
