'use client'

import { TrendingUp, Trophy, Brain, GraduationCap } from 'lucide-react'

const reasons = [
  {
    icon: TrendingUp,
    title: '2 Extra Years of Practice',
    description:
      'While others start in Class 11, you get 2 additional years to build concepts, solve 10,000+ practice questions, and develop exam temperament.',
  },
  {
    icon: Trophy,
    title: '65% of Toppers Started Early',
    description:
      'Data shows the majority of NEET toppers (AIR under 1000) began their preparation in Class 9 or earlier. Early start = competitive advantage.',
  },
  {
    icon: Brain,
    title: 'Stronger Conceptual Foundation',
    description:
      'Class 9-10 biology directly maps to 30% of NEET syllabus. Master these now and Class 11-12 becomes revision, not learning from scratch.',
  },
  {
    icon: GraduationCap,
    title: 'Olympiad Qualification',
    description:
      'Our Class 9 students qualify for NSEB (National Standard Examination in Biology) and represent India at IBO. A unique opportunity only available to early starters.',
  },
]

const timeline = [
  { label: 'Class 9', sublabel: 'Foundation' },
  { label: 'Class 10', sublabel: 'Advanced Foundation' },
  { label: 'Class 11', sublabel: 'NEET Core' },
  { label: 'Class 12', sublabel: 'NEET Intensive' },
  { label: 'NEET Exam', sublabel: '' },
]

export default function WhyStartEarlySection() {
  return (
    <section className="bg-white py-12 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="animate-fadeInUp mb-4 text-center text-2xl font-bold text-slate-900 sm:text-3xl lg:text-4xl">
          Why Start NEET Preparation in Class 9?
        </h2>
        <p className="mx-auto mb-10 max-w-2xl text-center text-base text-slate-600 sm:mb-12 sm:text-lg">
          The earlier you begin, the stronger your foundation becomes.
        </p>

        <div className="mb-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:mb-16 lg:gap-8">
          {reasons.map((reason) => {
            const Icon = reason.icon
            return (
              <div
                key={reason.title}
                className="animate-fadeInUp rounded-xl border border-slate-200 bg-green-50 p-6 shadow-xl transition-shadow duration-300 hover:shadow-2xl sm:p-8"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-teal-600 text-white">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mb-2 text-lg font-bold text-slate-900 sm:text-xl">{reason.title}</h3>
                <p className="text-sm leading-relaxed text-slate-700 sm:text-base">
                  {reason.description}
                </p>
              </div>
            )
          })}
        </div>

        <div className="animate-fadeInUp rounded-xl border border-slate-200 bg-green-50 p-6 shadow-xl sm:p-8">
          <h3 className="mb-6 text-center text-lg font-bold text-slate-900 sm:mb-8 sm:text-xl">
            Your NEET Journey Timeline
          </h3>
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-between sm:gap-0">
            {timeline.map((step, idx) => (
              <div key={step.label} className="flex items-center gap-3 sm:flex-col sm:gap-2">
                <div className="flex items-center gap-3 sm:flex-col sm:gap-2">
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-full text-sm font-bold text-white sm:h-14 sm:w-14 ${
                      idx === timeline.length - 1 ? 'bg-green-500' : 'bg-teal-600'
                    }`}
                  >
                    {idx < timeline.length - 1 ? idx + 9 : '!'}
                  </div>
                  <div className="text-left sm:text-center">
                    <p className="text-sm font-semibold text-slate-900 sm:text-base">
                      {step.label}
                    </p>
                    {step.sublabel && (
                      <p className="text-xs text-slate-600 sm:text-sm">{step.sublabel}</p>
                    )}
                  </div>
                </div>
                {idx < timeline.length - 1 && (
                  <span
                    className="hidden text-2xl text-teal-400 sm:inline-block"
                    aria-hidden="true"
                  >
                    →
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
