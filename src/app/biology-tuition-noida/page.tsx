import { Metadata } from 'next'
import Link from 'next/link'
import { Phone, MessageCircle, CheckCircle, Star, Users, Trophy, Building2, MapPin, ArrowRight, BookOpen, Target, Clock, Gift, User, IndianRupee } from 'lucide-react'
import { NoidaPageSchemas } from '@/components/seo/NoidaSchemas'

export const metadata: Metadata = {
  title: 'Biology Tuition in Noida 2026 | Class 9-12 & NEET | Rs 45,000/year | Cerebrum',
  description:
    'Best Biology tuition in Noida. Class 9, 10, 11, 12 & NEET. AIIMS faculty, small batches. Online Rs 45,000/year. Gaur City, Sector 150, Greater Noida. Free demo class!',
  keywords: [
    'biology tuition noida',
    'biology tuition in noida',
    'biology tuition classes noida',
    'private biology tuition noida',
    'biology tuition near me noida',
    'biology tuition greater noida',
    'biology tuition gaur city',
    'biology tuition sector 150',
  ],
  openGraph: {
    title: 'Biology Tuition Noida | Class 9-12 & NEET Preparation',
    description: 'Expert Biology tuition with AIIMS faculty. Small batches, personalized attention.',
    url: 'https://cerebrumbiologyacademy.com/biology-tuition-noida',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/biology-tuition-noida',
  },
}

const tuitionOptions = [
  {
    level: 'Class 9-10 Foundation',
    fee: '45,000 - 90,000',
    perMonth: '3,750 - 7,500',
    features: ['NCERT + competitive edge', 'NEET foundation prep', 'Multiple tier options', 'AIIMS faculty'],
    link: '/biology-coaching-class-10',
  },
  {
    level: 'Class 11 NEET',
    fee: '48,000 - 98,000',
    perMonth: '4,000 - 8,167',
    features: ['Pursuit/Ascent/Pinnacle tiers', '3,000-7,000+ questions', 'Board + NEET', 'AI doubt bot'],
    link: '/biology-class-11-noida',
    popular: true,
  },
  {
    level: 'Class 12 NEET',
    fee: '70,000 - 98,000',
    perMonth: '5,833 - 8,167',
    features: ['Board + NEET integrated', '5,000-15,000+ questions', '20-50+ mock tests', 'Personal mentoring'],
    link: '/biology-class-12-noida',
    recommended: true,
  },
  {
    level: 'Dropper/Repeater Batch',
    fee: '70,000 - 1,56,000',
    perMonth: '5,833 - 13,000',
    features: ['Complete 11+12 revision', 'Pinnacle ZA Program available', '50+ mock tests', 'Counseling support'],
    link: '/neet-dropper-batch-online',
  },
]

const freeTools = [
  { name: 'NEET Rank Predictor', href: '/neet-rank-predictor', icon: Target },
  { name: 'College Predictor', href: '/neet-college-predictor', icon: Building2 },
  { name: 'Study Plan Generator', href: '/neet-study-plan-generator', icon: BookOpen },
]

const whyChooseUs = [
  { title: 'AIIMS Faculty', description: 'Learn from Dr. Shekhar C Singh, AIIMS alumnus with 15+ years experience', icon: User },
  { title: 'Small Batches', description: 'Only 15 students per batch for personalized attention', icon: Users },
  { title: '500+ Selections', description: 'Proven track record with students from all Noida sectors', icon: Trophy },
  { title: 'Affordable Fees', description: 'Quality coaching at Rs 45,000/year - best value in Noida', icon: IndianRupee },
]

const faqs = [
  {
    question: 'What is the fee for Biology tuition in Noida?',
    answer: 'Our Biology tuition fees by tier: Class 9-10: Rs 45,000-90,000/year, Class 11: Rs 48,000-98,000/year, Class 12: Rs 70,000-98,000/year, Droppers: Rs 70,000-1,56,000/year. Three tiers available: Pursuit (budget), Ascent (balanced), Pinnacle (premium). EMI options available.',
  },
  {
    question: 'Do you offer private Biology tuition?',
    answer: 'Yes! We offer small batch tuition (15 students max) which gives near-private attention. For 1-on-1 private tuition, we have premium slots at Rs 1,500/hour. Contact us for private tuition availability.',
  },
  {
    question: 'Can Noida students attend online Biology tuition?',
    answer: 'Absolutely! 70% of our Noida students prefer online tuition from home. Live interactive classes, recorded lectures for revision, WhatsApp doubt support. Same quality as offline at lower cost.',
  },
  {
    question: 'Which areas in Noida do you serve?',
    answer: 'We serve all Noida areas: Gaur City, Sector 150, Greater Noida West, Jaypee Greens, ATS Pristine, Sector 62, 18, 137, and more. Online classes available everywhere. Offline at South Extension, Delhi.',
  },
]

const areas = [
  'Gaur City 1 & 2', 'Sector 150', 'Greater Noida West', 'Sector 128', 'Jaypee Greens',
  'ATS Pristine', 'Sector 62', 'Sector 18', 'Noida Extension', 'Sector 137',
  'Sector 76', 'Sector 50', 'Sector 44', 'Knowledge Park', 'Alpha Beta Gamma'
]

const comparisons = [
  { feature: 'Annual Fee', cerebrum: 'Rs 45,000 - 85,000', others: 'Rs 1,50,000 - 3,50,000' },
  { feature: 'Batch Size', cerebrum: '15 students', others: '60-120 students' },
  { feature: 'Faculty', cerebrum: 'AIIMS Alumnus', others: 'Mixed' },
  { feature: 'Doubt Support', cerebrum: 'WhatsApp 24/7', others: 'Limited hours' },
  { feature: 'Online Option', cerebrum: 'Full online available', others: 'Mostly offline' },
]

export default function BiologyTuitionNoidaPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-teal-50 to-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-slate-900 to-slate-800 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <span className="inline-flex items-center gap-2 bg-teal-500 text-white px-4 py-1 rounded-full text-sm font-semibold mb-4">
              <Star className="w-4 h-4" /> Rated 4.9/5 by 500+ Students
            </span>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Biology Tuition in Noida</h1>
            <p className="text-xl text-slate-300 mb-6">
              Expert Biology tuition for Class 9-12 & NEET. AIIMS faculty, small batches, affordable fees.
            </p>

            {/* Quick Stats */}
            <div className="flex flex-wrap justify-center gap-6 mb-8">
              <div className="flex items-center gap-2">
                <IndianRupee className="w-5 h-5 text-yellow-400" />
                <span>From Rs 45,000/year</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-yellow-400" />
                <span>15-Student Batches</span>
              </div>
              <div className="flex items-center gap-2">
                <Trophy className="w-5 h-5 text-yellow-400" />
                <span>500+ Selections</span>
              </div>
            </div>

            {/* CTA Buttons - WhatsApp Priority */}
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a
                href="https://wa.me/918826444334?text=Hi!%20I'm%20looking%20for%20Biology%20tuition%20in%20Noida.%20Please%20share%20fee%20structure%20and%20batch%20timings."
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
      <section className="py-6 bg-gradient-to-r from-teal-600 to-cyan-600 text-white">
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

      {/* Tuition Options */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">Biology Tuition Fee Structure - Noida</h2>
          <p className="text-center text-gray-600 mb-12">Choose your class level and mode</p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {tuitionOptions.map((option, index) => (
              <div
                key={index}
                className={`rounded-2xl p-6 relative ${
                  option.recommended
                    ? 'bg-yellow-400 shadow-xl'
                    : option.popular
                    ? 'bg-teal-50 border-2 border-teal-300'
                    : 'bg-gray-50 border-2 border-gray-200'
                }`}
              >
                {option.recommended && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-xs font-bold px-3 py-1 rounded-full">
                    RECOMMENDED
                  </span>
                )}
                {option.popular && !option.recommended && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-teal-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                    POPULAR
                  </span>
                )}
                <h3 className="text-lg font-bold mb-2">{option.level}</h3>
                <p className="text-3xl font-bold mb-1">
                  ₹{option.fee}
                  <span className="text-sm font-normal">/year</span>
                </p>
                <p className={`text-sm mb-4 ${option.recommended ? 'text-slate-700' : 'text-gray-500'}`}>
                  ₹{option.perMonth}/month
                </p>
                <ul className="space-y-2 mb-6">
                  {option.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm">
                      <CheckCircle className={`w-4 h-4 mt-0.5 ${option.recommended ? 'text-slate-900' : 'text-green-600'}`} />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <a
                  href={`https://wa.me/918826444334?text=Hi!%20I'm%20interested%20in%20${encodeURIComponent(option.level)}%20Biology%20tuition%20in%20Noida.%20Fee:%20Rs%20${option.fee}/year`}
                  className={`block text-center py-3 rounded-lg font-semibold transition ${
                    option.recommended
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

      {/* Why Choose Us */}
      <section className="py-16 bg-teal-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Our Biology Tuition?</h2>

          <div className="grid md:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {whyChooseUs.map((item, index) => (
              <div key={index} className="bg-white rounded-xl p-6 text-center shadow-md">
                <item.icon className="w-12 h-12 text-teal-600 mx-auto mb-4" />
                <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Fee Comparison */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">Fee Comparison: Cerebrum vs Others</h2>
          <p className="text-center text-gray-600 mb-12">Get better value for your investment</p>

          <div className="max-w-3xl mx-auto overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-teal-600 text-white">
                  <th className="px-4 py-3 text-left">Feature</th>
                  <th className="px-4 py-3 text-center">Cerebrum Academy</th>
                  <th className="px-4 py-3 text-center">Big Chains (Aakash, Allen)</th>
                </tr>
              </thead>
              <tbody>
                {comparisons.map((item, index) => (
                  <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                    <td className="px-4 py-3 font-medium">{item.feature}</td>
                    <td className="px-4 py-3 text-center text-green-600 font-semibold">{item.cerebrum}</td>
                    <td className="px-4 py-3 text-center text-gray-500">{item.others}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Areas Served */}
      <section className="py-16 bg-teal-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">Biology Tuition for All Noida Areas</h2>
          <p className="text-center text-gray-600 mb-8">Online tuition available everywhere</p>

          <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
            {areas.map((area) => (
              <span key={area} className="bg-white text-teal-800 px-4 py-2 rounded-full text-sm font-medium shadow-sm">
                <MapPin className="w-3 h-3 inline mr-1" />
                {area}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <details key={index} className="bg-gray-50 rounded-lg shadow-md group">
                <summary className="px-6 py-4 cursor-pointer font-semibold flex items-center justify-between hover:bg-gray-100">
                  {faq.question}
                  <span className="text-teal-600 group-open:rotate-180 transition-transform">▼</span>
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
          <h2 className="text-3xl font-bold mb-4">Start Your Biology Tuition Today!</h2>
          <p className="text-xl text-slate-300 mb-8">Join 500+ successful students from Noida</p>

          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8">
            <a
              href="https://wa.me/918826444334?text=Hi!%20I%20want%20to%20join%20Biology%20tuition%20in%20Noida.%20Please%20share%20batch%20details%20and%20demo%20class%20schedule."
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
        pageName="Biology Tuition in Noida"
        pageDescription="Expert Biology tuition for Class 9-12 & NEET in Noida. AIIMS faculty, small batches, affordable fees starting Rs 45,000/year."
        pageUrl="https://cerebrumbiologyacademy.com/biology-tuition-noida"
        breadcrumbs={[
          { name: 'Home', url: 'https://cerebrumbiologyacademy.com' },
          { name: 'Noida', url: 'https://cerebrumbiologyacademy.com/locations/noida' },
          { name: 'Biology Tuition Noida', url: 'https://cerebrumbiologyacademy.com/biology-tuition-noida' },
        ]}
        customFAQs={faqs}
      />
    </div>
  )
}
