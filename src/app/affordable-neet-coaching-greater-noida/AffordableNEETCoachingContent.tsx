'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  CheckCircle,
  ChevronRight,
  ChevronDown,
  MapPin,
  Phone,
  Play,
  Home,
  Users,
  Award,
  Clock,
  Star,
  CreditCard,
  Percent,
  Gift,
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { VideoTestimonialsSection } from '@/components/testimonials/VideoTestimonialsSection'
import { NEETToolsWidget } from '@/components/seo/NEETToolsWidget'
import { trackAndOpenWhatsApp } from '@/lib/whatsapp/tracking'
import { CONTACT_INFO } from '@/lib/constants/contactInfo'

interface FAQ {
  question: string
  answer: string
}

const pricingTiers = [
  {
    name: 'Pursuit',
    price: '₹45,000 - ₹70,000',
    perMonth: '₹3,750 - ₹5,833/month',
    batchSize: '30-40 students',
    features: [
      'Complete Biology syllabus',
      'Weekly tests',
      'Group doubt sessions',
      'Study materials included',
      'Online access',
    ],
    ideal: 'Self-motivated students who learn well in groups',
    color: 'green',
  },
  {
    name: 'Ascent',
    price: '₹60,000 - ₹90,000',
    perMonth: '₹5,000 - ₹7,500/month',
    batchSize: '16-18 students',
    features: [
      'Everything in Pursuit',
      'Smaller batch size',
      'Bi-weekly parent updates',
      'Extra practice sessions',
      'Priority doubt clearing',
    ],
    ideal: 'Students who benefit from more personal attention',
    color: 'blue',
    popular: true,
  },
  {
    name: 'Pinnacle',
    price: '₹90,000 - ₹1,56,000',
    perMonth: '₹7,500 - ₹13,000/month',
    batchSize: '10-12 students',
    features: [
      'Everything in Ascent',
      'Personal mentorship',
      'Daily doubt sessions',
      'Performance tracking',
      'Direct access to Dr. Shekhar',
    ],
    ideal: 'High-achievers targeting top medical colleges',
    color: 'purple',
  },
]

const comparison = [
  {
    feature: 'Annual Fee (Class 11-12)',
    cerebrum: '₹45K - ₹1.56L',
    allen: '₹1.2L - ₹2L',
    aakash: '₹1.36L+ (Greater Noida)',
  },
  {
    feature: 'Batch Size',
    cerebrum: '10-40 students',
    allen: '80-100+ students',
    aakash: '60-80 students',
  },
  {
    feature: 'Subject Coverage',
    cerebrum: 'Biology Only',
    allen: 'All Subjects',
    aakash: 'All Subjects',
  },
  { feature: 'Faculty', cerebrum: 'AIIMS Alumnus', allen: 'Various', aakash: 'Various' },
  { feature: 'EMI Available', cerebrum: 'Yes, 0% for 3 months', allen: 'Yes', aakash: 'Yes' },
  { feature: 'Scholarship', cerebrum: 'Up to 50%', allen: 'Up to 90%', aakash: 'Up to 75%' },
]

const scholarships = [
  {
    name: 'Merit Scholarship',
    discount: 'Up to 50%',
    criteria: '90%+ in Class 10/12 boards',
    icon: Award,
  },
  {
    name: 'Financial Aid',
    discount: 'Up to 75%',
    criteria: 'Need-based, document verification',
    icon: Gift,
  },
  { name: 'Sibling Discount', discount: '10%', criteria: 'If sibling is enrolled', icon: Users },
  { name: 'Early Bird', discount: '15%', criteria: 'Enroll before April 30', icon: Clock },
]

const valueProps = [
  { stat: '30-40%', label: 'Lower than Aakash Greater Noida fees' },
  { stat: '98%', label: 'Success rate (Biology)' },
  { stat: '10-40', label: 'Students per batch (vs 100+)' },
  { stat: '0%', label: 'EMI interest (3 months)' },
]

export default function AffordableNEETCoachingContent({ faqs }: { faqs: FAQ[] }) {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  const handleWhatsApp = () => {
    trackAndOpenWhatsApp({
      source: 'affordable-neet-coaching-greater-noida',
      message:
        'Hi! I am looking for affordable NEET coaching in Greater Noida. Please share the fee structure and scholarship options.',
      campaign: 'affordable-neet-greater-noida',
    })
  }

  return (
    <main className="min-h-screen bg-white">
      <nav className="bg-gray-100 py-3 px-4">
        <div className="max-w-7xl mx-auto">
          <ol className="flex items-center flex-wrap gap-1 text-sm">
            <li>
              <Link href="/" className="text-gray-600 hover:text-teal-600">
                <Home className="w-4 h-4" />
              </Link>
            </li>
            <li className="flex items-center">
              <ChevronRight className="w-4 h-4 text-gray-400 mx-1" />
              <Link
                href="/neet-coaching-greater-noida"
                className="text-gray-600 hover:text-teal-600"
              >
                NEET Coaching Greater Noida
              </Link>
            </li>
            <li className="flex items-center">
              <ChevronRight className="w-4 h-4 text-gray-400 mx-1" />
              <span className="text-teal-700 font-medium">Affordable NEET Coaching</span>
            </li>
          </ol>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative py-20 md:py-28 bg-gradient-to-br from-green-800 to-teal-700 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-green-500 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-teal-500 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4">
          <div className="max-w-4xl animate-fadeInUp">
            <div className="inline-flex items-center gap-2 bg-green-500/20 text-green-200 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Percent className="w-4 h-4" />
              30-40% Lower Than Aakash Greater Noida
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Quality NEET Coaching
              <span className="block text-yellow-400 mt-2">That Fits Your Budget</span>
            </h1>

            <p className="text-xl text-slate-300 mb-8 max-w-3xl">
              Premium Biology coaching with AIIMS faculty starting from ₹45,000/year. Better
              quality at lower fees than Aakash Greater Noida (₹1.36L+). Online + hybrid classes
              available for Greater Noida students. EMI and scholarships available.
            </p>

            <div className="flex flex-wrap items-center gap-4 mb-8">
              <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg text-white">
                <CreditCard className="w-5 h-5 text-yellow-400" />
                <span>0% EMI Available</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg text-white">
                <Award className="w-5 h-5 text-yellow-400" />
                <span>Scholarships up to 50%</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg text-white">
                <Star className="w-5 h-5 text-green-400" />
                <span>98% Success Rate</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/demo-booking">
                <Button
                  variant="secondary"
                  size="xl"
                  className="bg-yellow-500 text-slate-900 hover:bg-yellow-400 font-bold"
                >
                  <Play className="w-5 h-5 mr-2" />
                  Book Free Demo Class
                </Button>
              </Link>
              <button
                onClick={handleWhatsApp}
                className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white px-6 py-4 rounded-xl font-semibold border border-white/30 animate-fadeInUp"
              >
                <Phone className="w-5 h-5" />
                Get Fee Details
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Value Props */}
      <section className="py-12 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {valueProps.map((item, index) => (
              <div key={item.label} className="text-center animate-fadeInUp">
                <p className="text-3xl md:text-4xl font-bold text-green-600">{item.stat}</p>
                <p className="text-sm text-slate-600 mt-1">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Tiers */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12 animate-fadeInUp">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Choose Your Tier
            </h2>
            <p className="text-xl text-slate-600">
              Same quality teaching, different batch sizes and features
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {pricingTiers.map((tier, index) => (
              <div
                key={tier.name}
                className={`relative bg-white rounded-2xl p-6 shadow-lg ${tier.popular ? 'ring-2 ring-blue-500' : ''}`}
              >
                {tier.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                    Most Popular
                  </div>
                )}
                <h3 className="text-2xl font-bold text-slate-900 mb-2">{tier.name}</h3>
                <p className="text-3xl font-bold text-green-600 mb-1">{tier.price}</p>
                <p className="text-sm text-slate-500 mb-4">{tier.perMonth}</p>
                <div className="bg-gray-50 rounded-lg px-4 py-2 mb-4">
                  <p className="text-sm font-medium text-slate-700">{tier.batchSize}</p>
                </div>
                <ul className="space-y-3 mb-6">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2 text-sm text-slate-600">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <p className="text-xs text-slate-500 italic mb-4">{tier.ideal}</p>
                <button
                  onClick={handleWhatsApp}
                  className={`w-full py-3 rounded-xl font-semibold ${tier.popular ? 'bg-blue-600 text-white' : 'bg-gray-100 text-slate-700 hover:bg-gray-200'}`}
                >
                  Get Details
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Fee Comparison */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12 animate-fadeInUp">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Fee Comparison</h2>
            <p className="text-xl text-slate-600">
              See how we compare with Aakash Greater Noida and Allen
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full bg-white rounded-2xl shadow-xl overflow-hidden">
              <thead className="bg-slate-800 text-white">
                <tr>
                  <th className="px-6 py-4 text-left">Feature</th>
                  <th className="px-6 py-4 text-center bg-green-700">Cerebrum</th>
                  <th className="px-6 py-4 text-center">Allen</th>
                  <th className="px-6 py-4 text-center">Aakash (GN)</th>
                </tr>
              </thead>
              <tbody>
                {comparison.map((row, index) => (
                  <tr key={row.feature} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                    <td className="px-6 py-4 font-medium">{row.feature}</td>
                    <td className="px-6 py-4 text-center bg-green-50 font-semibold text-green-700">
                      {row.cerebrum}
                    </td>
                    <td className="px-6 py-4 text-center text-slate-600">{row.allen}</td>
                    <td className="px-6 py-4 text-center text-slate-600">{row.aakash}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Scholarships */}
      <section className="py-16 bg-gradient-to-br from-green-600 to-teal-600 text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12 animate-fadeInUp">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Scholarships & Discounts</h2>
            <p className="text-xl text-green-100">Multiple ways to reduce your fees</p>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {scholarships.map((scholarship, index) => (
              <div
                key={scholarship.name}
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center animate-fadeInUp"
              >
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <scholarship.icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold mb-1">{scholarship.name}</h3>
                <p className="text-2xl font-bold text-yellow-400 mb-2">{scholarship.discount}</p>
                <p className="text-sm text-green-100">{scholarship.criteria}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <button
              onClick={handleWhatsApp}
              className="inline-flex items-center gap-2 bg-white text-green-600 px-6 py-3 rounded-xl font-semibold animate-fadeInUp"
            >
              <Phone className="w-5 h-5" />
              Check Your Eligibility
            </button>
          </div>
        </div>
      </section>

      {/* EMI Options */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="animate-fadeInUp">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
                Flexible Payment Options
              </h2>
              <p className="text-xl text-slate-600 mb-6">
                Don&apos;t let fees be a barrier to quality education. We offer multiple payment
                options to make it easier.
              </p>
              <ul className="space-y-4 mb-8">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-1" />
                  <div>
                    <strong>0% EMI for 3 months</strong> - Pay in easy installments, no extra cost
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-1" />
                  <div>
                    <strong>6-12 month EMI</strong> - Low interest rates through partner banks
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-1" />
                  <div>
                    <strong>Split payment</strong> - Pay 50% now, rest in 2 installments
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-1" />
                  <div>
                    <strong>Monthly payment</strong> - Small convenience fee, maximum flexibility
                  </div>
                </li>
              </ul>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-lg animate-fadeInUp">
              <h3 className="text-xl font-bold text-slate-900 mb-6">Sample EMI Calculation</h3>
              <div className="space-y-4">
                <div className="bg-green-50 rounded-xl p-4">
                  <p className="text-sm text-slate-600 mb-1">Ascent Tier (₹75,000)</p>
                  <p className="text-2xl font-bold text-green-600">₹6,250/month</p>
                  <p className="text-xs text-slate-500">12 months, 0% interest for 3 months</p>
                </div>
                <div className="bg-blue-50 rounded-xl p-4">
                  <p className="text-sm text-slate-600 mb-1">Pinnacle Tier (₹1,20,000)</p>
                  <p className="text-2xl font-bold text-blue-600">₹10,000/month</p>
                  <p className="text-xs text-slate-500">12 months, 0% interest for 3 months</p>
                </div>
              </div>
              <button
                onClick={handleWhatsApp}
                className="w-full mt-6 bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-semibold animate-fadeInUp"
              >
                Get Your EMI Plan
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Location */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="bg-gradient-to-br from-green-50 to-teal-50 rounded-2xl p-8 md:p-12">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">
                  Visit Our Noida Center
                </h2>
                <p className="text-slate-600 mb-6">
                  Greater Noida students can visit our Sector 62 Noida center or attend online +
                  hybrid classes from home. Aqua Line Metro connects Greater Noida to Noida, then
                  Blue Line to Sector 62.
                </p>
                <div className="space-y-3 mb-6">
                  <p className="flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-green-600" />
                    {CONTACT_INFO.centers.noida.streetAddress}, Noida
                  </p>
                  <p className="flex items-center gap-2">
                    <Clock className="w-5 h-5 text-green-600" />
                    Open: Mon-Sat, 9 AM - 8 PM
                  </p>
                </div>
                <div className="flex gap-4">
                  <a href={`tel:+919953643938`}>
                    <Button variant="outline">
                      <Phone className="w-4 h-4 mr-2" />
                      Call Now
                    </Button>
                  </a>
                  <a
                    href={CONTACT_INFO.centers.noida.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button>
                      <MapPin className="w-4 h-4 mr-2" />
                      Get Directions
                    </Button>
                  </a>
                </div>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <h3 className="font-bold text-lg mb-4">Free Demo Includes</h3>
                <ul className="space-y-3">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    Live class experience (online or offline)
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    Meet Dr. Shekhar
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    Fee counseling
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    Scholarship assessment
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <VideoTestimonialsSection />
      <NEETToolsWidget
        title="Free NEET Preparation Tools"
        subtitle="Use our AI-powered tools to boost your preparation"
      />

      {/* FAQs */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white rounded-xl overflow-hidden shadow-sm">
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full flex items-center justify-between p-6 text-left"
                >
                  <span className="font-semibold text-slate-900 pr-4">{faq.question}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-slate-500 transition-transform ${openFaq === index ? 'rotate-180' : ''}`}
                  />
                </button>
                {openFaq === index && (
                  <div className="px-6 pb-6">
                    <p className="text-slate-600">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Related */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Related Pages</h2>
          <div className="grid md:grid-cols-4 gap-4">
            <Link
              href="/aakash-alternative-greater-noida"
              className="bg-gray-50 p-4 rounded-xl hover:shadow-md"
            >
              <h3 className="font-semibold text-teal-600">Aakash Alternative</h3>
              <p className="text-sm text-gray-600">Lower fees, better ratio</p>
            </Link>
            <Link
              href="/neet-scholarship-greater-noida"
              className="bg-gray-50 p-4 rounded-xl hover:shadow-md"
            >
              <h3 className="font-semibold text-teal-600">NEET Scholarship</h3>
              <p className="text-sm text-gray-600">Up to 100% fee waiver</p>
            </Link>
            <Link
              href="/neet-dropper-batch-greater-noida"
              className="bg-gray-50 p-4 rounded-xl hover:shadow-md"
            >
              <h3 className="font-semibold text-teal-600">Dropper Batch</h3>
              <p className="text-sm text-gray-600">Intensive repeater program</p>
            </Link>
            <Link
              href="/neet-coaching-greater-noida"
              className="bg-gray-50 p-4 rounded-xl hover:shadow-md"
            >
              <h3 className="font-semibold text-teal-600">NEET Coaching Hub</h3>
              <p className="text-sm text-gray-600">All programs</p>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-20 bg-gradient-to-r from-green-600 to-teal-600 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Quality Education Shouldn&apos;t Break the Bank
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Get 98% success rate coaching at 30-40% lower fees than Aakash Greater Noida
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/demo-booking">
              <Button
                variant="secondary"
                size="xl"
                className="bg-white text-green-600 hover:bg-gray-100 font-bold"
              >
                <Play className="w-5 h-5 mr-2" />
                Book Free Demo
              </Button>
            </Link>
            <a href={`tel:+919953643938`}>
              <Button
                variant="outline"
                size="xl"
                className="border-white text-white hover:bg-white hover:text-green-600"
              >
                <Phone className="w-5 h-5 mr-2" />
                Call Now
              </Button>
            </a>
          </div>
        </div>
      </section>
    </main>
  )
}
