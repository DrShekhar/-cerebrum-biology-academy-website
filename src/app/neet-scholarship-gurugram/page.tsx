import { Metadata } from 'next'
import Link from 'next/link'
import {
  Phone,
  CheckCircle,
  Award,
  Calculator,
  FileText,
  ArrowRight,
  Gift,
  Users,
  Trophy,
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'NEET Scholarship Gurugram 2026 | Up to 100% Fee Waiver | Cerebrum Academy',
  description:
    'Apply for NEET scholarship in Gurugram. Merit-based scholarships up to 100% fee waiver. Based on 10th/12th marks or scholarship test. Limited seats. Apply now at Cerebrum Biology Academy!',
  keywords: [
    'neet scholarship gurugram',
    'neet coaching scholarship gurgaon',
    'free neet coaching scholarship',
    'merit scholarship neet gurugram',
    'neet fee concession gurugram',
    'scholarship test neet gurgaon',
    'neet coaching financial aid',
    'biology scholarship gurugram',
  ],
  openGraph: {
    title: 'NEET Scholarship Gurugram 2026 | Cerebrum Biology Academy',
    description: 'Merit-based NEET scholarships up to 100% fee waiver. Apply now!',
    url: 'https://cerebrumbiologyacademy.com/neet-scholarship-gurugram',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/neet-scholarship-gurugram',
  },
}

const scholarshipSlabs = [
  {
    percentage: '100%',
    criteria: '95%+ in 10th/12th OR Top 1 in Scholarship Test',
    seats: '2 seats',
    color: 'from-yellow-500 to-orange-500',
  },
  {
    percentage: '75%',
    criteria: '90-95% in 10th/12th OR Top 5 in Scholarship Test',
    seats: '5 seats',
    color: 'from-green-500 to-teal-500',
  },
  {
    percentage: '50%',
    criteria: '85-90% in 10th/12th OR Top 10 in Scholarship Test',
    seats: '10 seats',
    color: 'from-blue-500 to-indigo-500',
  },
  {
    percentage: '25%',
    criteria: '80-85% in 10th/12th OR Top 20 in Scholarship Test',
    seats: '20 seats',
    color: 'from-purple-500 to-pink-500',
  },
]

const eligibility = [
  'Students appearing for NEET 2026 or 2027',
  'Class 11, 12, or Dropper students',
  'Minimum 75% in Class 10 (for Class 11 students)',
  'Minimum 75% in Class 11/12 (for Class 12/Droppers)',
  'Gurugram / NCR residents preferred (online available for others)',
]

const scholarshipProcess = [
  {
    step: 1,
    title: 'Apply Online',
    description: 'Fill scholarship application form with your academic details',
    icon: FileText,
  },
  {
    step: 2,
    title: 'Document Verification',
    description: 'Submit marksheet copies for verification (10th/11th/12th)',
    icon: CheckCircle,
  },
  {
    step: 3,
    title: 'Scholarship Test (Optional)',
    description: 'Appear for 1-hour Biology test to improve scholarship slab',
    icon: Calculator,
  },
  {
    step: 4,
    title: 'Result & Enrollment',
    description: 'Scholarship decision within 48 hours. Enroll with discounted fee',
    icon: Award,
  },
]

const faqs = [
  {
    question: 'Who is eligible for the NEET scholarship?',
    answer:
      'Students with 75%+ marks in Class 10/11/12 are eligible. Both Gurugram residents and online students can apply. Scholarship is based on academic merit or performance in our scholarship test.',
  },
  {
    question: 'How is scholarship percentage determined?',
    answer:
      'Scholarship is determined by: (1) Your Class 10/11/12 marks - higher marks = higher scholarship, OR (2) Your rank in our Scholarship Test. You get the better of the two options.',
  },
  {
    question: 'Is the scholarship test mandatory?',
    answer:
      'No, scholarship test is optional. If your board marks already qualify for a good slab, you can skip the test. The test is for students who want to improve their scholarship percentage.',
  },
  {
    question: 'Can scholarship be combined with other discounts?',
    answer:
      'Scholarship can be combined with sibling discount (10% extra) and early bird discount (5% extra, if applicable). Maximum combined discount is capped at 100%.',
  },
  {
    question: 'Is scholarship available for online students?',
    answer:
      'Yes! Online students from anywhere in India can apply for scholarship. Same eligibility criteria apply. The scholarship test can be taken online via proctored mode.',
  },
  {
    question: 'When is the deadline to apply?',
    answer:
      'Scholarship applications are accepted year-round, but seats are limited. We recommend applying 2-3 months before your intended batch start date. Early applicants get priority.',
  },
]

const testimonials = [
  {
    name: 'Priya Sharma',
    scholarship: '75% Scholarship',
    batch: 'Class 12 - 2025',
    quote: 'Got 75% scholarship with my 92% Class 11 marks. Saved over ₹50,000 on fees!',
  },
  {
    name: 'Arjun Verma',
    scholarship: '50% Scholarship',
    batch: 'Dropper - 2025',
    quote:
      'Scholarship test helped me get 50% off. The test was fair and covered NCERT basics only.',
  },
  {
    name: 'Ananya Singh',
    scholarship: '100% Scholarship',
    batch: 'Class 11 - 2024',
    quote: 'Topped the scholarship test and got 100% fee waiver. Best decision of my life!',
  },
]

export default function NEETScholarshipGurugram() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-50 to-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-yellow-600 to-orange-500 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <span className="inline-flex items-center gap-2 bg-white text-yellow-700 px-4 py-1 rounded-full text-sm font-semibold mb-4">
              <Gift className="w-4 h-4" />
              Merit-Based Scholarships Available
            </span>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              NEET Scholarship Gurugram 2026
            </h1>
            <p className="text-xl text-yellow-100 mb-4">
              Up to 100% fee waiver based on merit! Dont let finances stop your medical dream.
            </p>
            <div className="flex items-center justify-center gap-4 text-white mb-8">
              <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full">
                <Award className="w-5 h-5" />
                <span>100% Max Scholarship</span>
              </div>
              <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full">
                <Users className="w-5 h-5" />
                <span>37 Seats Available</span>
              </div>
            </div>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="tel:+918826444334"
                className="bg-white text-yellow-700 px-8 py-3 rounded-lg font-bold flex items-center gap-2 hover:bg-yellow-50 transition"
              >
                <Phone className="w-5 h-5" />
                Apply Now: 88264-44334
              </a>
              <Link
                href="/demo-booking"
                className="bg-yellow-700 text-white px-8 py-3 rounded-lg font-semibold flex items-center gap-2 hover:bg-yellow-800 transition border-2 border-white/30"
              >
                Book Demo First
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Scholarship Slabs */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">Scholarship Slabs</h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Higher marks = Higher scholarship. Check which slab you qualify for!
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {scholarshipSlabs.map((slab, index) => (
              <div key={index} className="relative group">
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${slab.color} rounded-xl opacity-10 group-hover:opacity-20 transition`}
                />
                <div className="relative bg-white border-2 border-gray-100 rounded-xl p-6 text-center hover:shadow-xl transition">
                  <div
                    className={`text-5xl font-bold bg-gradient-to-br ${slab.color} bg-clip-text text-transparent mb-2`}
                  >
                    {slab.percentage}
                  </div>
                  <div className="text-gray-500 text-sm mb-4">Fee Waiver</div>
                  <p className="text-gray-700 text-sm mb-4">{slab.criteria}</p>
                  <div className="bg-gray-100 rounded-full py-1 px-3 text-xs font-semibold text-gray-600">
                    {slab.seats}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Scholarship Process */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">How to Apply</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {scholarshipProcess.map((step) => (
              <div key={step.step} className="relative">
                <div className="bg-white rounded-xl p-6 shadow-md h-full">
                  <div className="w-10 h-10 bg-yellow-500 text-white rounded-full flex items-center justify-center font-bold mb-4">
                    {step.step}
                  </div>
                  <step.icon className="w-8 h-8 text-yellow-600 mb-3" />
                  <h3 className="font-bold mb-2">{step.title}</h3>
                  <p className="text-gray-600 text-sm">{step.description}</p>
                </div>
                {step.step < 4 && (
                  <div className="hidden lg:block absolute top-1/2 -right-3 transform -translate-y-1/2">
                    <ArrowRight className="w-6 h-6 text-gray-300" />
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <a
              href="tel:+918826444334"
              className="inline-flex items-center gap-2 bg-yellow-500 text-white px-8 py-3 rounded-lg font-bold hover:bg-yellow-600 transition"
            >
              <Phone className="w-5 h-5" />
              Start Application: 88264-44334
            </a>
          </div>
        </div>
      </section>

      {/* Eligibility */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8">Eligibility Criteria</h2>
            <div className="bg-yellow-50 rounded-xl p-8 border-2 border-yellow-100">
              <ul className="space-y-4">
                {eligibility.map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Scholarship Recipients</h2>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-md">
                <div className="flex items-center gap-2 mb-4">
                  <Trophy className="w-6 h-6 text-yellow-500" />
                  <span className="font-bold text-yellow-700">{testimonial.scholarship}</span>
                </div>
                <p className="text-gray-600 italic mb-4">&quot;{testimonial.quote}&quot;</p>
                <div className="border-t pt-4">
                  <p className="font-semibold">{testimonial.name}</p>
                  <p className="text-sm text-gray-500">{testimonial.batch}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Calculator CTA */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <Calculator className="w-12 h-12 mx-auto mb-4" />
          <h2 className="text-3xl font-bold mb-4">Check Your Scholarship Eligibility</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Share your Class 10/11/12 marks and we will tell you your eligible scholarship slab
            within 2 hours!
          </p>
          <a
            href="tel:+918826444334"
            className="inline-flex items-center gap-2 bg-white text-blue-700 px-8 py-3 rounded-lg font-bold hover:bg-blue-50 transition"
          >
            <Phone className="w-5 h-5" />
            Check Eligibility: 88264-44334
          </a>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Scholarship FAQs</h2>
          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <details key={index} className="bg-gray-50 rounded-lg shadow-md group">
                <summary className="px-6 py-4 cursor-pointer font-semibold flex items-center justify-between hover:bg-gray-100">
                  {faq.question}
                  <span className="text-yellow-600 group-open:rotate-180 transition-transform">
                    ▼
                  </span>
                </summary>
                <p className="px-6 pb-4 text-gray-600">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 bg-gradient-to-r from-yellow-600 to-orange-500 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Dont Let Fees Stop Your Dream</h2>
          <p className="text-xl text-yellow-100 mb-8 max-w-2xl mx-auto">
            37 scholarship seats available for NEET 2026 batch. Apply before they are filled!
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="tel:+918826444334"
              className="bg-white text-yellow-700 px-8 py-4 rounded-lg font-bold text-lg flex items-center gap-2 hover:bg-yellow-50 transition"
            >
              <Phone className="w-5 h-5" />
              Apply for Scholarship
            </a>
          </div>
        </div>
      </section>

      {/* Schema */}
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Scholarship',
            name: 'Cerebrum NEET Biology Scholarship 2026',
            description: 'Merit-based scholarship for NEET Biology preparation, up to 100% fee waiver',
            provider: {
              '@type': 'EducationalOrganization',
              name: 'Cerebrum Biology Academy',
              url: 'https://cerebrumbiologyacademy.com',
            },
            eligibleRegion: {
              '@type': 'Place',
              name: 'Gurugram, Haryana, India',
            },
            amount: {
              '@type': 'MonetaryAmount',
              currency: 'INR',
              maxValue: 85000,
              minValue: 0,
            },
          }),
        }}
      />
    </div>
  )
}
