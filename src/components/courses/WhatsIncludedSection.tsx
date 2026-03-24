'use client'

import {
  Video,
  PlayCircle,
  FileText,
  Target,
  BarChart3,
  MessageCircle,
  Users,
  Award,
} from 'lucide-react'

const items = [
  {
    icon: Video,
    title: 'Live Classes',
    description: '6 hours/week with AIIMS faculty',
  },
  {
    icon: PlayCircle,
    title: 'Recorded Lectures',
    description: 'Lifetime access to all class recordings',
  },
  {
    icon: FileText,
    title: 'Study Materials',
    description: 'Comprehensive notes and worksheets',
  },
  {
    icon: Target,
    title: 'MCQ Practice',
    description: '19,000+ questions with instant feedback',
  },
  {
    icon: BarChart3,
    title: 'Performance Analytics',
    description: 'Detailed reports after every test',
  },
  {
    icon: MessageCircle,
    title: 'Doubt Support',
    description: 'WhatsApp doubt resolution within 2 hours',
  },
  {
    icon: Users,
    title: 'Parent Reports',
    description: 'Monthly progress updates for parents',
  },
  {
    icon: Award,
    title: 'Olympiad Prep',
    description: 'NSEB & IBO preparation included',
  },
]

export default function WhatsIncludedSection() {
  return (
    <section className="bg-green-50 py-12 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="animate-fadeInUp mb-10 text-center text-2xl font-bold text-slate-900 sm:mb-12 sm:text-3xl lg:text-4xl">
          Everything Your Child Gets
        </h2>

        <div className="mb-10 grid grid-cols-1 gap-5 sm:mb-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {items.map((item) => {
            const Icon = item.icon
            return (
              <div
                key={item.title}
                className="animate-fadeInUp rounded-xl border border-slate-200 bg-white p-5 shadow-xl transition-shadow duration-300 hover:shadow-2xl sm:p-6"
              >
                <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-lg bg-green-100 text-green-600">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mb-1 text-base font-bold text-slate-900 sm:text-lg">{item.title}</h3>
                <p className="text-sm leading-relaxed text-slate-600">{item.description}</p>
              </div>
            )
          })}
        </div>

        <div className="animate-fadeInUp rounded-xl border-2 border-green-300 bg-white p-5 text-center shadow-xl sm:p-6">
          <p className="text-base font-semibold text-green-700 sm:text-lg">
            <Award className="mr-2 inline-block h-5 w-5 text-green-600" />
            Pinnacle tier bonus: Free biology lab kit + microscope set
          </p>
        </div>
      </div>
    </section>
  )
}
