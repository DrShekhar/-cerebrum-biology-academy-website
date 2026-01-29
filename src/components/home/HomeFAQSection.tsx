import { ChevronDown, HelpCircle, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { FAQSchema } from '@/components/seo/FAQSchema'
import { CONTACT_INFO } from '@/lib/constants/contactInfo'

interface FAQ {
  question: string
  answer: string
}

const homepageFAQs: FAQ[] = [
  {
    question: 'What is the success rate of Cerebrum Biology Academy?',
    answer:
      'We have a 98% success rate with 500+ students qualifying NEET annually. Our toppers have secured ranks under 1000 AIR, with many getting into AIIMS, JIPMER, and other top medical colleges. Our star achiever Sadhna Sirin scored 695 marks in NEET 2023 with 100 percentile in Biology.',
  },
  {
    question: 'What are the course fees for NEET coaching?',
    answer:
      'We offer three tiers - Pinnacle (small batch, personal mentoring), Ascent (balanced features), and Pursuit (affordable quality). Fees range from ₹45,000 to ₹180,000 based on course and tier. Class 9-10: ₹45,000-₹90,000, Class 11: ₹48,000-₹98,000, Class 12: ₹70,000-₹156,000. EMI options and scholarships up to 50% available.',
  },
  {
    question: 'Is there a free demo class available?',
    answer: `Yes! We offer a FREE 45-minute demo class with our AIIMS Trained faculty. You can experience our teaching methodology and receive free study materials worth ₹2,000. Book your demo on our website or call ${CONTACT_INFO.phone.display.primary}.`,
  },
  {
    question: 'Where are Cerebrum Biology Academy centers located?',
    answer: `We have physical centers in Delhi NCR including Rohini, Gurugram, and South Delhi. We also offer pan-India online classes with the same faculty and curriculum. Contact ${CONTACT_INFO.phone.display.primary} to find the center nearest to you.`,
  },
  {
    question: 'Do you offer online NEET Biology coaching?',
    answer:
      'Yes, we offer live interactive online classes with the same quality as offline classes. Our online program includes live sessions, recorded lectures, digital study materials, online tests, and 24/7 doubt support through WhatsApp and our student portal.',
  },
  {
    question: 'What is the batch size at Cerebrum Biology Academy?',
    answer:
      "We maintain small batches of maximum 15 students per class to ensure personalized attention for every student. This optimal batch size allows our AIIMS Trained faculty to focus on individual learning needs, provide detailed doubt clarification, and track each student's progress effectively.",
  },
]

export function HomeFAQSection() {
  return (
    <section className="py-16 bg-gradient-to-b from-white to-gray-50">
      <FAQSchema questions={homepageFAQs} pageUrl="https://cerebrumbiologyacademy.com" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 animate-fade-in-up">
          <div className="inline-flex items-center bg-blue-100 text-blue-600 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <HelpCircle className="w-4 h-4 mr-2" />
            FAQs
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Frequently Asked <span className="text-blue-600">Questions</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Get answers to the most common questions about our NEET Biology coaching programs
          </p>
        </div>

        <div className="space-y-4">
          {homepageFAQs.map((faq, index) => (
            <details
              key={index}
              className="group bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow animate-fade-in-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <summary className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-gray-50 transition-colors cursor-pointer list-none [&::-webkit-details-marker]:hidden">
                <span className="font-medium text-gray-900 pr-4">{faq.question}</span>
                <div className="flex-shrink-0 transition-transform duration-200 group-open:rotate-180">
                  <ChevronDown className="w-5 h-5 text-blue-500" />
                </div>
              </summary>
              <div className="px-6 pb-5 text-gray-600 leading-relaxed border-t border-gray-100 pt-4">
                {faq.answer}
              </div>
            </details>
          ))}
        </div>

        <div className="text-center mt-10 animate-fade-in-up" style={{ animationDelay: '600ms' }}>
          <Link
            href="/faq"
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-4 rounded-xl transition-colors shadow-lg hover:shadow-xl"
          >
            View All FAQs
            <ArrowRight className="w-5 h-5" />
          </Link>
          <p className="mt-3 text-sm text-gray-500">Browse 30+ questions across 8 categories</p>
        </div>
      </div>
    </section>
  )
}
