'use client'

import { Lightbulb, CheckCircle2 } from 'lucide-react'

interface KeyTakeawaysProps {
  takeaways: string[]
  title?: string
}

export function KeyTakeaways({ takeaways, title = 'Key Takeaways' }: KeyTakeawaysProps) {
  if (!takeaways || takeaways.length === 0) return null

  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 border border-blue-200 p-6 mb-8 animate-fade-in-up">
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full blur-3xl opacity-50 -translate-y-1/2 translate-x-1/2" />

      <div className="relative">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 text-white">
            <Lightbulb className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-gray-900">{title}</h3>
        </div>

        <ul className="space-y-3">
          {takeaways.map((takeaway, index) => (
            <li key={index} className="flex items-start gap-3 animate-fade-in">
              <span className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-green-100 text-green-600 text-xs font-bold mt-0.5">
                {index + 1}
              </span>
              <span className="text-gray-700 leading-relaxed">{takeaway}</span>
            </li>
          ))}
        </ul>

        <div className="mt-5 pt-4 border-t border-blue-200/50">
          <p className="text-xs text-gray-500 flex items-center gap-1">
            <CheckCircle2 className="w-4 h-4 text-green-500" />
            <span>Remember these points for your NEET preparation</span>
          </p>
        </div>
      </div>
    </div>
  )
}
