'use client'

import { motion } from 'framer-motion'
import {
  UserCheck,
  Users,
  Video,
  BarChart,
  MessageCircle,
  Book,
  PlayCircle,
  MessageSquare,
  Calendar,
  Target,
  RefreshCw,
  Award,
  GraduationCap,
  BookOpen,
  Star,
  Clock,
  Heart,
  Smartphone,
  FileText,
  Headphones,
  Zap,
  Layers,
  TrendingUp,
  Shield,
  Image,
  List,
  Link,
  CheckCircle,
  type LucideIcon,
} from 'lucide-react'
import { SEOLandingContent } from '@/data/seo-landing/types'

const iconMap: Record<string, LucideIcon> = {
  'user-check': UserCheck,
  users: Users,
  video: Video,
  'bar-chart': BarChart,
  'message-circle': MessageCircle,
  book: Book,
  'play-circle': PlayCircle,
  'message-square': MessageSquare,
  calendar: Calendar,
  target: Target,
  'refresh-cw': RefreshCw,
  award: Award,
  'graduation-cap': GraduationCap,
  'book-open': BookOpen,
  star: Star,
  clock: Clock,
  heart: Heart,
  smartphone: Smartphone,
  'file-text': FileText,
  headphones: Headphones,
  zap: Zap,
  layers: Layers,
  'trending-up': TrendingUp,
  shield: Shield,
  image: Image,
  list: List,
  link: Link,
  'check-circle': CheckCircle,
  repeat: RefreshCw,
}

interface BenefitsSectionProps {
  benefits: SEOLandingContent['benefits']
}

export function BenefitsSection({ benefits }: BenefitsSectionProps) {
  return (
    <section className="bg-white py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">{benefits.title}</h2>
          {benefits.subtitle && (
            <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600">{benefits.subtitle}</p>
          )}
        </motion.div>

        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {benefits.items.map((item, index) => {
            const Icon = iconMap[item.icon] || CheckCircle

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative overflow-hidden rounded-2xl border border-gray-100 bg-white p-6 transition-all hover:border-blue-200 hover:shadow-lg"
              >
                {/* Gradient Background on Hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-purple-50 opacity-0 transition-opacity group-hover:opacity-100" />

                <div className="relative">
                  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 text-white shadow-lg">
                    <Icon className="h-6 w-6" />
                  </div>

                  <h3 className="text-xl font-semibold text-gray-900">{item.title}</h3>
                  <p className="mt-2 text-gray-600">{item.description}</p>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
