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
      'We have a 98% NEET-UG qualification rate with 680+ medical college selections since 2014 (including 67+ AIIMS, plus JIPMER, AFMC, and state government colleges). Our toppers have secured ranks under 1000 AIR. Star achiever Sadhna Sirin scored 695 marks in NEET 2023 with 100 percentile in Biology.',
  },
  {
    question: 'What are the course fees for NEET coaching?',
    answer:
      'We offer three tiers — Pinnacle (small batch, personal mentoring), Ascent (balanced features), and Pursuit (affordable quality). Fees range from ₹40,000 to ₹1,56,000 based on class and tier. Pursuit: ₹40,000–₹75,000, Ascent: ₹58,000–₹90,000, Pinnacle: ₹68,000–₹1,56,000. EMI options and scholarships available.',
  },
  {
    question: 'Is there a free demo class available?',
    answer: `Yes! We offer a FREE 45-minute demo class with our AIIMS-trained faculty. You can experience our teaching methodology and receive free study materials worth ₹2,000. Book your demo on our website or call ${CONTACT_INFO.phone.display.primary}.`,
  },
  {
    question: 'Where are Cerebrum Biology Academy centres located?',
    answer: `We operate 6 offline centres across Delhi NCR: South Extension Part II (flagship), Rohini, Green Park, Gurugram, Faridabad, and Noida. We also offer pan-India online classes with the same AIIMS-trained faculty and curriculum, serving students from Mumbai, Bangalore, Hyderabad, Chennai, Kolkata, Pune, plus 14+ international countries (USA, UAE, UK, Canada, Singapore, Australia, etc.). Contact ${CONTACT_INFO.phone.display.primary} to find the centre nearest to you.`,
  },
  {
    question: 'Do you offer online NEET Biology coaching?',
    answer:
      'Yes, we offer live interactive online classes with the same quality as offline classes. Our online program includes live sessions, recorded lectures, digital study materials, online tests, and 24/7 doubt support through WhatsApp and our student portal.',
  },
  {
    question: 'What is the batch size at Cerebrum Biology Academy?',
    answer:
      "We maintain small batches of 15-20 students per class to ensure personalised attention. This is materially smaller than generalist NEET chains (the largest national NEET chains / other online-only platforms typically run 150-400 students per batch) and lets our AIIMS-trained faculty track each student's chapter-level weaknesses and provide weekly 1:1 doubt slots in the Ascent and Pinnacle tiers.",
  },
  {
    question: 'Do you offer NEET Foundation coaching for Class 9 and Class 10 students?',
    answer:
      'Yes. The Cerebrum NEET Foundation track is built specifically for Class 9 and Class 10 students on a 4-year NEET pathway, with board (CBSE / ICSE / state board) and NEET-pattern MCQ drilling running in parallel. Foundation pricing runs ₹35K–₹95K/year across three tiers. Foundation runs offline at all 6 NCR centres plus pan-India online with the same AIIMS-trained faculty. See /best-neet-foundation-tutor for the full pathway.',
  },
  {
    question: 'Do you coach beyond NEET — MCAT, DAT, GAMSAT, USMLE Step 1, IB, AP, or Olympiads?',
    answer:
      'Yes. Cerebrum is a biology-only specialist across 9 verticals: NEET-UG, NEET Foundation Class 9-10, IB Biology (HL/SL), AP Biology, MCAT Bio/Biochem (US/Canada med school entrance), DAT Biology (US/Canada pre-dental), GAMSAT Section III (UK/Ireland/Australia graduate medicine), USMLE Step 1 biology-foundations (US licensing + IMG ECFMG pathway), and Biology Olympiads (NSEB, INBO, USABO, IBO, BBO, CBO, SBO). Same AIIMS-trained faculty (Dr. Shekhar C Singh and senior team) lead all verticals — biology pedagogy depth compounds across the stack.',
  },
  {
    question: 'What is the IB Biology Internal Assessment (IA) and how do you coach it?',
    answer:
      "The IB Biology IA is the 20%-weighted internal assessment piece in the IB Biology HL/SL programme — a single scientific investigation graded against 4 criteria (Personal Engagement, Exploration, Analysis, Evaluation + Communication). Cerebrum's IB Biology coaching includes IA mentorship: research-question scaffolding, methodology critique, statistical analysis support (chi-square, t-test, error propagation), and final-draft examiner-aligned review. See /ib-biology-ia-guide for the 4-criteria breakdown.",
  },
  {
    question: 'Do you offer Olympiad coaching for serious biology students in Class 9-12?',
    answer:
      'Yes. Cerebrum coaches across the full Biology Olympiad pathway: India (NSEB → INBO → OCSC → IBO team selection — ~75,000-student annual NSEB market), USA (USABO Open → Semifinal → National Finals), UK (BBO), Canada (CBO), Singapore (SBO), plus the International Biology Olympiad (IBO). Single biology-specialist faculty stack across all stages — distinct from generalist HBCSE-prep agencies that rotate physics-chemistry-biology coverage. See /biology-olympiads for the complete cluster.',
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
