import Link from 'next/link'
import {
  Calculator,
  Building2,
  Calendar,
  Timer,
  ClipboardCheck,
  ArrowRight,
  Sparkles,
} from 'lucide-react'

const tools = [
  {
    title: 'NEET Exam Countdown',
    description: 'Track days left for NEET 2026 with live countdown',
    href: '/neet-exam-countdown',
    icon: Timer,
    bgColor: 'bg-violet-100',
    iconColor: 'text-violet-600',
  },
  {
    title: 'NEET Rank Predictor',
    description: 'Predict your All India Rank based on expected score',
    href: '/neet-rank-predictor',
    icon: Calculator,
    bgColor: 'bg-orange-100',
    iconColor: 'text-orange-600',
  },
  {
    title: 'NEET College Predictor',
    description: 'Find medical colleges based on your NEET rank',
    href: '/neet-college-predictor',
    icon: Building2,
    bgColor: 'bg-blue-100',
    iconColor: 'text-blue-600',
  },
  {
    title: 'Study Plan Generator',
    description: 'Get personalized week-by-week study schedule',
    href: '/neet-study-plan-generator',
    icon: Calendar,
    bgColor: 'bg-green-100',
    iconColor: 'text-green-600',
  },
  {
    title: 'OMR Evaluation Tool',
    description: 'Check answers with section-wise analysis',
    href: '/neet-tools/omr-checker',
    icon: ClipboardCheck,
    bgColor: 'bg-purple-100',
    iconColor: 'text-purple-600',
  },
]

interface NEETToolsWidgetProps {
  title?: string
  subtitle?: string
  showAllLink?: boolean
  compact?: boolean
}

export function NEETToolsWidget({
  title = 'Free NEET Preparation Tools',
  subtitle = 'Boost your preparation with our AI-powered tools - 100% Free',
  showAllLink = true,
  compact = false,
}: NEETToolsWidgetProps) {
  const displayTools = compact ? tools.slice(0, 4) : tools

  return (
    <section className="py-12 bg-gradient-to-br from-indigo-50 to-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-8 animate-[fadeInUp_0.5s_ease-out_both]">
          <div className="inline-flex items-center gap-2 bg-indigo-100 text-indigo-700 px-4 py-2 rounded-full text-sm font-semibold mb-4">
            <Sparkles className="w-4 h-4" />
            100% Free Tools
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">{title}</h2>
          <p className="text-gray-600 mt-2">{subtitle}</p>
        </div>

        <div
          className={`grid gap-4 ${compact ? 'grid-cols-2 md:grid-cols-4' : 'grid-cols-2 md:grid-cols-3 lg:grid-cols-5'}`}
        >
          {displayTools.map((tool, index) => (
            <div
              key={tool.title}
              className="animate-[fadeInUp_0.4s_ease-out_both]"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <Link
                href={tool.href}
                className="group block bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-lg hover:border-indigo-200 transition-all h-full"
              >
                <div
                  className={`w-10 h-10 ${tool.bgColor} rounded-lg flex items-center justify-center mb-3`}
                >
                  <tool.icon className={`w-5 h-5 ${tool.iconColor}`} />
                </div>
                <h3 className="font-semibold text-gray-900 text-sm group-hover:text-indigo-600 transition-colors">
                  {tool.title}
                </h3>
                <p className="text-xs text-gray-500 mt-1 line-clamp-2">{tool.description}</p>
                <span className="inline-flex items-center gap-1 text-xs font-medium text-indigo-600 mt-2 group-hover:gap-2 transition-all">
                  Try Free <ArrowRight className="w-3 h-3" />
                </span>
              </Link>
            </div>
          ))}
        </div>

        {showAllLink && (
          <div className="text-center mt-6">
            <Link
              href="/neet-tools"
              className="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-700 font-medium"
            >
              View All Free NEET Tools
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        )}
      </div>
    </section>
  )
}
