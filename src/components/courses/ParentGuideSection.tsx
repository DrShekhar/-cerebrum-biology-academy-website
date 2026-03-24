'use client'

import { ShieldCheck, Clock, BarChart3, RefreshCcw, Monitor, IndianRupee } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { trackAndOpenWhatsApp } from '@/lib/whatsapp/tracking'

const concerns = [
  {
    icon: Clock,
    question: 'Will it affect school studies?',
    answer:
      'Only 6 hours/week — designed around school schedule. Our Class 9 students consistently score 90%+ in school exams too.',
  },
  {
    icon: ShieldCheck,
    question: 'Is my child too young for NEET prep?',
    answer:
      "We don't teach NEET at Class 9. We build biology fundamentals that make NEET natural later. Think of it as learning to walk before running.",
  },
  {
    icon: BarChart3,
    question: 'How will I track progress?',
    answer:
      'Monthly progress reports sent to parents via WhatsApp. Parent-teacher meetings every month. Real-time analytics dashboard access.',
  },
  {
    icon: RefreshCcw,
    question: "What if my child doesn't like it?",
    answer:
      "15-day money-back guarantee. No questions asked. Book a free demo class first to see if it's the right fit.",
  },
  {
    icon: Monitor,
    question: 'Is online coaching effective?',
    answer:
      'Hybrid model — attend from any location. Same AIIMS faculty, same curriculum. 98% success rate includes online students.',
  },
  {
    icon: IndianRupee,
    question: "What's the total investment?",
    answer:
      "Starting at \u20B945,000/year (\u20B93,750/month). Compare with Kota coaching: \u20B93-5 Lakh/year + hostel. We're 10x more affordable with better results.",
  },
]

export default function ParentGuideSection() {
  return (
    <section className="bg-blue-50 py-12 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="animate-fadeInUp mb-3 text-center text-2xl font-bold text-slate-900 sm:text-3xl lg:text-4xl">
          A Parent&apos;s Guide to Early NEET Preparation
        </h2>
        <p className="mx-auto mb-10 max-w-2xl text-center text-base text-slate-600 sm:mb-12 sm:text-lg">
          We understand your concerns. Here&apos;s how we ensure your child thrives.
        </p>

        <div className="mb-10 grid grid-cols-1 gap-6 sm:mb-12 md:grid-cols-2 lg:gap-8">
          {concerns.map((concern) => {
            const Icon = concern.icon
            return (
              <div
                key={concern.question}
                className="animate-fadeInUp rounded-xl border border-slate-200 bg-white p-6 shadow-xl transition-shadow duration-300 hover:shadow-2xl"
              >
                <div className="mb-4 flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-600 text-white">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900">{concern.question}</h3>
                </div>
                <p className="text-sm leading-relaxed text-slate-700 sm:text-base">
                  {concern.answer}
                </p>
              </div>
            )
          })}
        </div>

        <div className="animate-fadeInUp text-center">
          <Button
            size="lg"
            className="bg-[#facc15] text-slate-900 hover:bg-[#fde047]"
            onClick={() =>
              trackAndOpenWhatsApp({
                source: 'parent-guide-section',
                message:
                  "Hi, I'm a parent interested in early NEET preparation for my child. Can you share more details?",
              })
            }
          >
            Chat as Parent on WhatsApp
          </Button>
        </div>
      </div>
    </section>
  )
}
