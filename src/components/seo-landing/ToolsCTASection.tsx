'use client'

import Link from 'next/link'
import {
  ArrowRight,
  ClipboardList,
  TrendingUp,
  GraduationCap,
  FileText,
  HelpCircle,
} from 'lucide-react'
import { SEOLandingContent } from '@/data/seo-landing/types'

interface ToolsCTASectionProps {
  toolsCTA: NonNullable<SEOLandingContent['toolsCTA']>
}

const iconMap = {
  mcq: ClipboardList,
  rank: TrendingUp,
  college: GraduationCap,
  notes: FileText,
  quiz: HelpCircle,
}

const colorMap = {
  mcq: 'from-blue-500 to-blue-600',
  rank: 'from-purple-500 to-purple-600',
  college: 'bg-green-600',
  notes: 'from-orange-500 to-orange-600',
  quiz: 'from-indigo-500 to-indigo-600',
}

const bgColorMap = {
  mcq: 'bg-blue-50 hover:bg-blue-100',
  rank: 'bg-purple-50 hover:bg-purple-100',
  college: 'bg-green-50 hover:bg-green-100',
  notes: 'bg-orange-50 hover:bg-orange-100',
  quiz: 'bg-pink-50 hover:bg-pink-100',
}

export function ToolsCTASection({ toolsCTA }: ToolsCTASectionProps) {
  return (
    <section className="bg-gradient-to-br from-gray-50 to-white py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div
          className="text-center animate-fadeInUp"
        >
          <span className="inline-block rounded-full bg-blue-100 px-4 py-1.5 text-sm font-semibold text-blue-700">
            Free Tools
          </span>
          <h2 className="mt-4 text-3xl font-bold text-gray-900 sm:text-4xl">{toolsCTA.title}</h2>
          <p className="mx-auto mt-3 max-w-2xl text-lg text-gray-600">
            Boost your NEET preparation with our free interactive tools
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {toolsCTA.tools.map((tool, index) => {
            const Icon = iconMap[tool.icon]
            const gradientColor = colorMap[tool.icon]
            const bgColor = bgColorMap[tool.icon]

            return (
              <div
                key={index}
               className="animate-fadeInUp">
                <Link
                  href={tool.link}
                  className={`group flex flex-col items-center rounded-2xl border border-gray-100 ${bgColor} p-8 text-center shadow-sm transition-all hover:shadow-lg`}
                >
                  <div
                    className={`inline-flex rounded-xl bg-gradient-to-br ${gradientColor} p-4 shadow-lg`}
                  >
                    <Icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="mt-5 text-xl font-bold text-gray-900">{tool.name}</h3>
                  <p className="mt-2 text-sm text-gray-600">{tool.description}</p>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-blue-600 group-hover:gap-2 transition-all">
                    Try Now Free
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </Link>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
