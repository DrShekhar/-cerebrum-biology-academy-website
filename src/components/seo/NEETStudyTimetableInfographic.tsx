'use client'

import { motion } from 'framer-motion'
import { Calendar, Clock, BookOpen, Brain, Target, Trophy, CheckCircle2 } from 'lucide-react'

interface MonthPlan {
  month: string
  weeks: string
  focus: string
  topics: string[]
  hours: string
  milestone: string
}

const fiveMonthPlan: MonthPlan[] = [
  {
    month: 'Month 1',
    weeks: 'Weeks 1-4',
    focus: 'Foundation & Class 11 Revision',
    topics: ['Cell Biology', 'Biomolecules', 'Plant Kingdom', 'Animal Kingdom'],
    hours: '6-8 hrs/day',
    milestone: 'Complete Class 11 NCERT',
  },
  {
    month: 'Month 2',
    weeks: 'Weeks 5-8',
    focus: 'Class 12 Core Chapters',
    topics: ['Genetics', 'Molecular Biology', 'Evolution', 'Human Reproduction'],
    hours: '7-9 hrs/day',
    milestone: '1000+ MCQs solved',
  },
  {
    month: 'Month 3',
    weeks: 'Weeks 9-12',
    focus: 'High-Weightage Topics',
    topics: ['Human Physiology', 'Plant Physiology', 'Ecology', 'Biotechnology'],
    hours: '8-10 hrs/day',
    milestone: 'Full syllabus covered',
  },
  {
    month: 'Month 4',
    weeks: 'Weeks 13-16',
    focus: 'Revision & Practice',
    topics: ['Full syllabus revision', 'Previous year papers', 'Mock tests', 'Weak area focus'],
    hours: '8-10 hrs/day',
    milestone: '5000+ MCQs, 10 mocks',
  },
  {
    month: 'Month 5',
    weeks: 'Weeks 17-20',
    focus: 'Final Sprint',
    topics: ['High-yield revision', 'NCERT re-read', 'Diagram practice', 'Time management'],
    hours: '6-8 hrs/day',
    milestone: 'Exam ready!',
  },
]

const dailySchedule = [
  { time: '6:00 - 8:00 AM', activity: 'Morning Revision', subject: 'Previous day topics', color: 'bg-green-100 text-green-700' },
  { time: '8:00 - 9:00 AM', activity: 'Break', subject: 'Breakfast & light exercise', color: 'bg-gray-100 text-gray-600' },
  { time: '9:00 - 12:00 PM', activity: 'New Concepts', subject: 'Biology Chapter Study', color: 'bg-blue-100 text-blue-700' },
  { time: '12:00 - 2:00 PM', activity: 'Break', subject: 'Lunch & short nap', color: 'bg-gray-100 text-gray-600' },
  { time: '2:00 - 5:00 PM', activity: 'Practice', subject: 'MCQs & Problem Solving', color: 'bg-purple-100 text-purple-700' },
  { time: '5:00 - 6:00 PM', activity: 'Break', subject: 'Snacks & relax', color: 'bg-gray-100 text-gray-600' },
  { time: '6:00 - 9:00 PM', activity: 'Physics/Chemistry', subject: 'Other subjects', color: 'bg-orange-100 text-orange-700' },
  { time: '9:00 - 10:00 PM', activity: 'Night Revision', subject: 'Day summary & formulas', color: 'bg-teal-100 text-teal-700' },
]

interface NEETStudyTimetableInfographicProps {
  variant?: 'compact' | 'full'
  className?: string
}

export function NEETStudyTimetableInfographic({ variant = 'full', className = '' }: NEETStudyTimetableInfographicProps) {
  return (
    <section className={`py-12 md:py-16 ${className}`}>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Calendar className="w-4 h-4" />
            Study Planner
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
            5-Month NEET Biology Study Timetable
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Comprehensive study plan designed by AIIMS faculty for NEET Biology aspirants.
            Follow this schedule for optimal preparation.
          </p>
        </motion.div>

        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-5 gap-4 mb-12">
            {fiveMonthPlan.map((plan, idx) => (
              <motion.div
                key={plan.month}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden"
              >
                <div className={`py-3 px-4 ${
                  idx === 0 ? 'bg-green-500' :
                  idx === 1 ? 'bg-blue-500' :
                  idx === 2 ? 'bg-purple-500' :
                  idx === 3 ? 'bg-orange-500' :
                  'bg-red-500'
                } text-white`}>
                  <h3 className="font-bold text-lg">{plan.month}</h3>
                  <p className="text-sm opacity-90">{plan.weeks}</p>
                </div>
                <div className="p-4 space-y-3">
                  <div className="flex items-center gap-2 text-sm">
                    <Target className="w-4 h-4 text-gray-500" />
                    <span className="font-medium text-gray-900">{plan.focus}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Clock className="w-4 h-4" />
                    {plan.hours}
                  </div>
                  <div className="pt-2 border-t">
                    <p className="text-xs text-gray-500 mb-2">Key Topics:</p>
                    <ul className="space-y-1">
                      {plan.topics.map((topic, i) => (
                        <li key={i} className="flex items-start gap-1 text-xs text-gray-700">
                          <CheckCircle2 className="w-3 h-3 text-green-500 mt-0.5 flex-shrink-0" />
                          {topic}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="pt-2 border-t">
                    <div className="flex items-center gap-2 text-xs">
                      <Trophy className="w-4 h-4 text-yellow-500" />
                      <span className="font-medium text-gray-900">{plan.milestone}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {variant === 'full' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-6 md:p-8 text-white"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center">
                  <BookOpen className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-xl">Daily Study Schedule</h3>
                  <p className="text-gray-400 text-sm">Ideal routine for serious NEET aspirants</p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-3">
                {dailySchedule.map((slot, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.05 }}
                    className="bg-white/5 rounded-lg p-3 border border-white/10"
                  >
                    <div className="text-xs text-gray-400 mb-1">{slot.time}</div>
                    <div className={`inline-block px-2 py-0.5 rounded text-xs font-medium mb-1 ${slot.color}`}>
                      {slot.activity}
                    </div>
                    <div className="text-sm text-gray-300">{slot.subject}</div>
                  </motion.div>
                ))}
              </div>

              <div className="mt-6 pt-6 border-t border-white/10">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-yellow-400">8-10</div>
                      <div className="text-xs text-gray-400">Hours/Day</div>
                    </div>
                    <div className="w-px h-10 bg-white/20" />
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-400">6</div>
                      <div className="text-xs text-gray-400">Study Blocks</div>
                    </div>
                    <div className="w-px h-10 bg-white/20" />
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-400">3</div>
                      <div className="text-xs text-gray-400">Breaks</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 bg-green-500/20 text-green-400 px-4 py-2 rounded-lg text-sm">
                    <Brain className="w-4 h-4" />
                    Optimized for focus & retention
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          <div className="mt-8 text-center">
            <p className="text-sm text-gray-500">
              This study plan is designed by Dr. Shekhar Singh and the Cerebrum Biology Academy faculty
              based on 15+ years of NEET coaching experience.
            </p>
          </div>
        </div>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'HowTo',
            name: '5-Month NEET Biology Study Plan',
            description: 'A comprehensive 5-month study timetable for NEET Biology preparation designed by AIIMS faculty.',
            totalTime: 'P150D',
            supply: [
              { '@type': 'HowToSupply', name: 'NCERT Biology Class 11 & 12' },
              { '@type': 'HowToSupply', name: 'Previous Year NEET Papers' },
              { '@type': 'HowToSupply', name: 'Quality MCQ Bank' },
            ],
            step: fiveMonthPlan.map((plan, idx) => ({
              '@type': 'HowToStep',
              position: idx + 1,
              name: `${plan.month}: ${plan.focus}`,
              text: `Focus on ${plan.topics.join(', ')}. Study ${plan.hours}. Goal: ${plan.milestone}`,
            })),
          }),
        }}
      />
    </section>
  )
}
