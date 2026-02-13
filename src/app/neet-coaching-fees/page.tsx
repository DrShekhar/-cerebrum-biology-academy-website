'use client'

import { Check, MessageCircle, Phone, HelpCircle, TrendingDown, Award, BookOpen } from 'lucide-react'
import { CONTACT_INFO, getWhatsAppLink, getPhoneLink } from '@/lib/constants/contactInfo'
import { TrustSignalsBanner } from '@/components/trust/TrustSignalsBanner'

interface PricingTier {
  name: string
  batchSize: string
  monthly: number
  annual: number
  features: string[]
  isPopular?: boolean
}

interface Program {
  name: string
  tiers: PricingTier[]
}

const programs: Program[] = [
  {
    name: 'Foundation (Class 9-10)',
    tiers: [
      {
        name: 'Pinnacle',
        batchSize: '10-12 students',
        monthly: 4500,
        annual: 48000,
        features: ['1-on-1 personalized attention', 'Daily doubt clearing', 'Premium study materials', 'Priority feedback'],
      },
      {
        name: 'Ascent',
        batchSize: '15-18 students',
        monthly: 3500,
        annual: 38000,
        features: ['Small group dynamics', 'Weekly doubt sessions', 'Complete study package', 'Regular assessments'],
        isPopular: true,
      },
      {
        name: 'Pursuit',
        batchSize: '20-25 students',
        monthly: 2500,
        annual: 28000,
        features: ['Structured curriculum', 'Mock tests included', 'Standard materials', 'Progress tracking'],
      },
    ],
  },
  {
    name: 'Class 11 NEET',
    tiers: [
      {
        name: 'Pinnacle',
        batchSize: '10-12 students',
        monthly: 8000,
        annual: 88000,
        features: ['1-on-1 mentoring', '24/7 doubt support', 'Advanced problem sets', 'Daily practice drills'],
      },
      {
        name: 'Ascent',
        batchSize: '15-18 students',
        monthly: 6500,
        annual: 72000,
        features: ['Interactive sessions', 'Bi-weekly doubt clearing', 'Topic-wise practice', 'Performance analytics'],
        isPopular: true,
      },
      {
        name: 'Pursuit',
        batchSize: '20-25 students',
        monthly: 4500,
        annual: 50000,
        features: ['Core curriculum focus', 'Concept clarity sessions', 'Chapter tests', 'Peer learning'],
      },
    ],
  },
  {
    name: 'Class 12 NEET',
    tiers: [
      {
        name: 'Pinnacle',
        batchSize: '10-12 students',
        monthly: 9000,
        annual: 98000,
        features: ['NEET-specific strategies', 'One-on-one sessions', 'Full-length mock tests', 'Question bank access'],
      },
      {
        name: 'Ascent',
        batchSize: '15-18 students',
        monthly: 7000,
        annual: 78000,
        features: ['NEET-focused curriculum', 'Regular full mocks', 'Speed & accuracy training', 'Revision support'],
        isPopular: true,
      },
      {
        name: 'Pursuit',
        batchSize: '20-25 students',
        monthly: 5000,
        annual: 55000,
        features: ['NEET exam prep', 'Concept-based tests', 'Answer analysis', 'Group study sessions'],
      },
    ],
  },
  {
    name: 'Dropper Batch',
    tiers: [
      {
        name: 'Pinnacle',
        batchSize: '10-12 students',
        monthly: 8500,
        annual: 92000,
        features: ['Intensive mentoring', 'Personalized study plan', 'Regular review sessions', 'Focused preparation'],
      },
      {
        name: 'Ascent',
        batchSize: '15-18 students',
        monthly: 6500,
        annual: 72000,
        features: ['Result-oriented teaching', 'Monthly progress review', 'Customized resources', 'Exam strategy'],
        isPopular: true,
      },
      {
        name: 'Pursuit',
        batchSize: '20-25 students',
        monthly: 4500,
        annual: 50000,
        features: ['Comprehensive coverage', 'Problem-solving focus', 'Concept revision', 'Full-length tests'],
      },
    ],
  },
  {
    name: '2-Year Integrated (Class 11+12)',
    tiers: [
      {
        name: 'Pinnacle',
        batchSize: '10-12 students',
        monthly: 7500,
        annual: 168000,
        features: ['Full 2-year mentoring', 'Continuous guidance', 'Advanced materials', 'Priority support'],
      },
      {
        name: 'Ascent',
        batchSize: '15-18 students',
        monthly: 6000,
        annual: 135000,
        features: ['Comprehensive 2-year plan', 'Regular assessments', 'Complete study package', 'Flexible learning'],
        isPopular: true,
      },
      {
        name: 'Pursuit',
        batchSize: '20-25 students',
        monthly: 4000,
        annual: 96000,
        features: ['Full curriculum coverage', 'Structured progression', 'Peer support system', 'Cost-effective option'],
      },
    ],
  },
]

const competitionData = [
  { name: 'Allen', range: 'Rs 1.5 - 3.5 lakh/year' },
  { name: 'Aakash', range: 'Rs 1.2 - 2.8 lakh/year' },
  { name: 'Physics Wallah', range: 'Rs 3,000 - 15,000/year (online)' },
  { name: 'Cerebrum', range: 'Rs 24,000 - 98,000/year', highlight: true },
]

const whatIncluded = [
  { icon: Award, title: 'AIIMS-Trained Faculty', description: 'Led by Dr. Shekhar with 15+ years NEET teaching experience' },
  { icon: BookOpen, title: 'Comprehensive Materials', description: 'Custom-curated study materials and handwritten notes' },
  { icon: TrendingDown, title: 'Regular Assessments', description: 'Weekly mock tests and monthly comprehensive exams' },
  { icon: MessageCircle, title: 'Doubt Clearing', description: 'Weekly sessions plus on-demand support' },
  { icon: Phone, title: 'Online + Offline', description: 'Flexible learning — attend in-class or online' },
  { icon: Check, title: 'Progress Reports', description: 'Detailed parent reports every month' },
]

const faqs = [
  {
    question: 'What is the fee for NEET coaching at Cerebrum?',
    answer:
      'Our fees range from Rs 2,500/month to Rs 9,000/month depending on the program and tier you choose. Fees vary by batch size (Pinnacle: 10-12, Ascent: 15-18, Pursuit: 20-25 students) and complexity level.',
  },
  {
    question: 'Is there any registration or admission fee?',
    answer:
      'No. We charge only for tuition. There are no hidden registration, admission, or facility fees. Transparency is at the core of our pricing.',
  },
  {
    question: 'Can I pay in installments?',
    answer:
      'Yes! We offer flexible payment plans: full-year lump sum (10% discount), 2 installments, or 3-month EMI. Choose what works best for your budget.',
  },
  {
    question: 'Is there a scholarship available?',
    answer:
      'Yes, we offer merit-based scholarships up to 50% off for exceptional students. Contact us to discuss your eligibility.',
  },
  {
    question: "What's included in the fee?",
    answer:
      'Each fee includes: AIIMS-level teaching, comprehensive study materials, mock tests, doubt clearing sessions, online + offline access, progress reports, and NEET exam strategy sessions.',
  },
  {
    question: 'Can I switch tiers after joining?',
    answer:
      'Yes, you can upgrade to a higher tier at any time. Downgrades are processed after the current term ends.',
  },
  {
    question: 'Is there a refund policy?',
    answer:
      "We offer a 7-day money-back guarantee if you're not satisfied. After that, fees for completed months are non-refundable but can be adjusted toward future months.",
  },
  {
    question: 'How do fees compare to Allen and Aakash?',
    answer:
      'Allen charges Rs 1.5-3.5 lakh/year, Aakash Rs 1.2-2.8 lakh/year. We offer AIIMS-quality teaching at Rs 24k-98k/year — 3-10x more affordable while maintaining personalized small batches.',
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
}

export default function FeesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Hero Section */}
      <section className="py-16 md:py-20 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4">
          <div
            className="text-center animate-fadeInUp"
          >
            <div className="inline-block mb-4 px-4 py-2 bg-emerald-100 text-emerald-700 rounded-full text-sm font-medium">
              Starting at Rs 2,500/month
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
              NEET Biology Coaching Fees — Transparent Pricing (2026-27)
            </h1>
            <p className="text-lg md:text-xl text-slate-600 mb-8 max-w-3xl mx-auto">
              No hidden charges. No surprise fees. See exactly what you pay for at Cerebrum Biology Academy.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={getWhatsAppLink('I want to know about your NEET coaching fees and programs.')}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors"
              >
                <MessageCircle size={20} />
                Discuss Fees on WhatsApp
              </a>
              <a
                href={getPhoneLink()}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 border-2 border-slate-300 text-slate-700 rounded-lg font-semibold hover:border-slate-400 hover:bg-slate-50 transition-colors"
              >
                <Phone size={20} />
                Call for Fee Details
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Signals — Social Proof */}
      <TrustSignalsBanner variant="compact" />

      {/* Fee Comparison vs Competition */}
      <section className="py-16 md:py-20 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4">
          <div
           className="animate-fadeInUp">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 text-center">
              How We Compare
            </h2>
            <p className="text-lg text-slate-600 text-center mb-12 max-w-2xl mx-auto">
              AIIMS-quality teaching at a fraction of the cost of Allen/Aakash
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              {competitionData.map((item, index) => (
                <div
                  key={index}
                  className={`p-6 rounded-lg border-2 ${
                    item.highlight
                      ? 'border-emerald-500 bg-emerald-50'
                      : 'border-slate-200 bg-white'
                  }`}
                >
                  <h3 className={`text-xl font-bold mb-2 ${item.highlight ? 'text-emerald-700' : 'text-slate-900'}`}>
                    {item.name}
                  </h3>
                  <p className={`text-lg font-semibold ${item.highlight ? 'text-emerald-600' : 'text-slate-600'}`}>
                    {item.range}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Detailed Fee Cards */}
      <section className="py-16 md:py-20 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4">
          <div
            className="mb-12 animate-fadeInUp"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 text-center">
              Fee Structure by Program
            </h2>
            <p className="text-lg text-slate-600 text-center">
              Choose your program and tier. Each comes with full access to our teaching methodology.
            </p>
          </div>

          {programs.map((program, programIndex) => (
            <div
              key={programIndex}
              className="mb-16 animate-fadeInUp"
            >
              <h3 className="text-2xl font-bold text-slate-900 mb-8">{program.name}</h3>
              <div className="grid md:grid-cols-3 gap-6">
                {program.tiers.map((tier, tierIndex) => (
                  <div
                    key={tierIndex}
                    className={`relative rounded-xl border-2 overflow-hidden transition-all duration-300 ${
                      tier.isPopular
                        ? 'border-emerald-500 bg-gradient-to-br from-emerald-50 to-white shadow-lg scale-105 md:scale-100'
                        : 'border-slate-200 bg-white hover:border-slate-300 hover:shadow-md'
                    }`}
                  >
                    {tier.isPopular && (
                      <div className="absolute top-0 right-0 px-4 py-2 bg-emerald-500 text-white text-sm font-semibold rounded-bl-lg">
                        Most Popular
                      </div>
                    )}

                    <div className="p-6">
                      <h4 className="text-xl font-bold text-slate-900 mb-2">{tier.name}</h4>
                      <p className="text-sm text-slate-600 mb-6">{tier.batchSize}</p>

                      <div className="mb-6 space-y-2">
                        <p className="text-sm text-slate-600">Monthly Fee</p>
                        <p className="text-3xl font-bold text-emerald-600">Rs {tier.monthly.toLocaleString()}</p>
                        <p className="text-sm text-slate-500">/month</p>
                      </div>

                      <div className="mb-6 pb-6 border-b border-slate-200">
                        <p className="text-sm text-slate-600 mb-2">Annual/Total Fee</p>
                        <p className="text-2xl font-bold text-slate-900">Rs {tier.annual.toLocaleString()}</p>
                      </div>

                      <div className="mb-8">
                        <p className="text-sm font-semibold text-slate-900 mb-4">Includes:</p>
                        <ul className="space-y-3">
                          {tier.features.map((feature, featureIndex) => (
                            <li key={featureIndex} className="flex items-start gap-3">
                              <Check size={18} className="text-emerald-600 flex-shrink-0 mt-0.5" />
                              <span className="text-sm text-slate-700">{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <a
                        href={getWhatsAppLink(`I'm interested in the ${tier.name} tier for ${program.name}.`)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`w-full block text-center py-3 rounded-lg font-semibold transition-colors ${
                          tier.isPopular
                            ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                            : 'border-2 border-emerald-600 text-emerald-600 hover:bg-emerald-50'
                        }`}
                      >
                        Enroll Now on WhatsApp
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* What's Included */}
      <section className="py-16 md:py-20 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4">
          <div
            className="mb-12 animate-fadeInUp"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 text-center">
              What's Included in Every Plan
            </h2>
            <p className="text-lg text-slate-600 text-center">
              From Pursuit to Pinnacle, you get the same quality — just different batch sizes.
            </p>
          </div>

          <div
            initial="hidden"
            whileInView="visible"
            className="grid md:grid-cols-3 gap-8 animate-fadeInUp"
          >
            {whatIncluded.map((item, index) => {
              const IconComponent = item.icon
              return (
                <div
                  key={index}
                  className="flex flex-col items-start gap-4 p-6 rounded-lg bg-gradient-to-br from-slate-50 to-white border border-slate-200 hover:shadow-md transition-shadow animate-fadeInUp"
                >
                  <div className="p-3 bg-emerald-100 rounded-lg">
                    <IconComponent size={24} className="text-emerald-600" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900">{item.title}</h3>
                  <p className="text-slate-600">{item.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Payment Options */}
      <section className="py-16 md:py-20 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4">
          <div
           className="animate-fadeInUp">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-12 text-center">
              Flexible Payment Options
            </h2>

            <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
              {[
                { title: 'Lump Sum', description: 'Pay full annual fee upfront and save 10%' },
                { title: '2 Installments', description: 'Split into 2 equal payments (semester-wise)' },
                { title: '3-Month EMI', description: 'Spread payments every 3 months (no extra charge)' },
                {
                  title: 'Merit Scholarship',
                  description: 'Eligible students get up to 50% off on yearly fees',
                },
              ].map((option, index) => (
                <div
                  key={index}
                  className="p-6 rounded-lg border-2 border-emerald-200 bg-emerald-50 animate-fadeInUp"
                >
                  <h3 className="text-lg font-bold text-slate-900 mb-2">{option.title}</h3>
                  <p className="text-slate-600">{option.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 md:py-20 border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4">
          <div
            className="mb-12 animate-fadeInUp"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 text-center">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-slate-600 text-center">
              Have questions about our fees? We've got answers.
            </p>
          </div>

          <div
            initial="hidden"
            whileInView="visible"
            className="space-y-6 animate-fadeInUp"
          >
            {faqs.map((faq, index) => (
              <motion.details
                key={index}
                className="group p-6 rounded-lg border border-slate-200 bg-white hover:border-emerald-300 hover:shadow-md transition-all cursor-pointer"
              >
                <summary className="flex items-start justify-between font-semibold text-slate-900 cursor-pointer">
                  <span className="flex items-start gap-3">
                    <HelpCircle size={20} className="text-emerald-600 flex-shrink-0 mt-1" />
                    {faq.question}
                  </span>
                </summary>
                <p className="mt-4 ml-8 text-slate-600 leading-relaxed">{faq.answer}</p>
              </motion.details>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-4">
          <div
            className="text-center animate-fadeInUp"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
              Have Questions About Fees?
            </h2>
            <p className="text-lg text-slate-600 mb-10 max-w-2xl mx-auto">
              Our team is here to help. Get fee details, discuss payment plans, or book a free demo class.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={getWhatsAppLink('I have questions about NEET coaching fees and would like more details.')}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-green-600 text-white rounded-lg font-semibold text-lg hover:bg-green-700 transition-colors"
              >
                <MessageCircle size={22} />
                Message on WhatsApp
              </a>
              <a
                href={getPhoneLink()}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-blue-600 text-white rounded-lg font-semibold text-lg hover:bg-blue-700 transition-colors"
              >
                <Phone size={22} />
                Call {CONTACT_INFO.phone.display.primary}
              </a>
              <a
                href="/demo-booking"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-slate-300 text-slate-700 rounded-lg font-semibold text-lg hover:border-slate-400 hover:bg-slate-50 transition-colors"
              >
                Book Free Demo
              </a>
            </div>

            <p className="mt-8 text-sm text-slate-500">
              Available Monday to Saturday, 9 AM - 7 PM IST
            </p>
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              {
                '@type': 'ListItem',
                position: 1,
                name: 'Home',
                item: 'https://cerebrumbiologyacademy.com',
              },
              {
                '@type': 'ListItem',
                position: 2,
                name: 'NEET Coaching Fees',
                item: 'https://cerebrumbiologyacademy.com/neet-coaching-fees',
              },
            ],
          }),
        }}
      />
    </div>
  )
}
