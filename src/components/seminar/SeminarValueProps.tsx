'use client'

import { Target, Users, BookOpen, Heart, Award } from 'lucide-react'
import { SEMINAR_VALUE_PROPS, PARENT_PAIN_POINTS } from '@/lib/seminar/config'

const iconMap: Record<string, React.ElementType> = {
  Target,
  Users,
  BookOpen,
  Heart,
  Award,
}

export function SeminarValueProps() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        {/* Pain Points */}
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">
            Are These Questions Keeping You Up at Night?
          </h2>
          <div className="flex flex-wrap justify-center gap-3 max-w-3xl mx-auto">
            {PARENT_PAIN_POINTS.map((point, index) => (
              <span
                key={index}
                className="inline-flex items-center gap-2 bg-red-50 text-red-700 px-4 py-2 rounded-full text-sm font-medium"
              >
                <span>❓</span>
                {point}
              </span>
            ))}
          </div>
        </div>

        {/* Value Props */}
        <div className="text-center mb-10">
          <p className="text-lg text-green-600 font-semibold mb-2">GET ANSWERS IN THIS SEMINAR</p>
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">
            What You'll Learn in 60 Minutes
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Practical, actionable strategies that you can implement immediately to support your
            child's NEET journey.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SEMINAR_VALUE_PROPS.map((prop, index) => {
            const IconComponent = iconMap[prop.icon] || Target
            return (
              <div
                key={index}
                className="bg-gradient-to-br from-green-50 to-teal-50 rounded-xl p-6 hover:shadow-lg transition-shadow"
              >
                <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center mb-4">
                  <IconComponent className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">{prop.title}</h3>
                <p className="text-slate-600 text-sm">{prop.description}</p>
              </div>
            )
          })}
        </div>

        {/* Bonus Section */}
        <div className="mt-12 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-2xl p-6 md:p-8 text-center">
          <span className="text-3xl mb-4 block">🎁</span>
          <h3 className="text-xl font-bold text-slate-900 mb-2">
            BONUS: Free Resources Worth ₹999
          </h3>
          <p className="text-slate-600 max-w-xl mx-auto mb-4">
            All attendees receive our exclusive "NEET Parent's Handbook" + Biology Revision
            Checklist + 12-Month Study Planner template.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <span className="bg-white px-4 py-2 rounded-full text-sm font-medium text-slate-700 shadow-sm">
              📚 Parent's Handbook PDF
            </span>
            <span className="bg-white px-4 py-2 rounded-full text-sm font-medium text-slate-700 shadow-sm">
              ✅ Biology Checklist
            </span>
            <span className="bg-white px-4 py-2 rounded-full text-sm font-medium text-slate-700 shadow-sm">
              📅 12-Month Planner
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}

export default SeminarValueProps
