'use client'

import { motion } from 'framer-motion'
import {
  BookOpen,
  GitBranch,
  Eye,
  Clock,
  MapPin,
  Users,
  Repeat,
  ZapOff,
  HelpCircle,
  CalendarX,
  FileX,
  UserX,
  Shuffle,
  ThumbsDown,
  XCircle,
  PieChart,
  TrendingDown,
  Target,
  DollarSign,
  Book,
  Search,
  CheckSquare,
  type LucideIcon,
} from 'lucide-react'
import { SEOLandingContent } from '@/data/seo-landing/types'

const iconMap: Record<string, LucideIcon> = {
  'book-open': BookOpen,
  'git-branch': GitBranch,
  eye: Eye,
  clock: Clock,
  'map-pin': MapPin,
  users: Users,
  repeat: Repeat,
  'zap-off': ZapOff,
  'help-circle': HelpCircle,
  'calendar-x': CalendarX,
  'file-x': FileX,
  'user-x': UserX,
  shuffle: Shuffle,
  'thumbs-down': ThumbsDown,
  'x-circle': XCircle,
  'pie-chart': PieChart,
  'trending-down': TrendingDown,
  target: Target,
  'dollar-sign': DollarSign,
  book: Book,
  search: Search,
  'check-square': CheckSquare,
}

interface PainPointsSectionProps {
  painPoints: SEOLandingContent['painPoints']
}

export function PainPointsSection({ painPoints }: PainPointsSectionProps) {
  return (
    <section className="bg-gray-50 py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">{painPoints.title}</h2>
        </motion.div>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {painPoints.points.map((point, index) => {
            const Icon = iconMap[point.icon] || HelpCircle

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group rounded-2xl bg-white p-6 shadow-sm transition-all hover:shadow-lg"
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-red-100 text-red-600 transition-colors group-hover:bg-green-100 group-hover:text-green-600">
                    <Icon className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-lg font-semibold text-gray-900">{point.question}</p>
                    <div className="mt-3 flex items-start gap-2">
                      <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-green-500 text-xs text-white">
                        ✓
                      </span>
                      <p className="text-gray-600">{point.solution}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
