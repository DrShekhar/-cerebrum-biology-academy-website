'use client'

import { motion } from 'framer-motion'
import {
  Award,
  Users,
  BookOpen,
  Target,
  Clock,
  MapPin,
  TrendingUp,
  Video,
  CheckCircle2,
  Star,
} from 'lucide-react'

export interface USP {
  icon: string
  title: string
  description: string
}

interface USPsSectionProps {
  title?: string
  subtitle?: string
  usps: USP[]
}

const iconMap: Record<string, any> = {
  award: Award,
  users: Users,
  book: BookOpen,
  target: Target,
  clock: Clock,
  map: MapPin,
  trending: TrendingUp,
  video: Video,
  check: CheckCircle2,
  star: Star,
}

export function USPsSection({
  title = 'Why Choose Cerebrum Biology Academy',
  subtitle = 'We provide comprehensive NEET Biology preparation with proven results',
  usps,
}: USPsSectionProps) {
  return (
    <section className="bg-gradient-to-b from-gray-50 to-white py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-block border-b-4 border-[#4a5d4a] pb-2 text-3xl font-bold text-slate-900 md:text-4xl lg:text-5xl"
          >
            {title}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mx-auto mt-4 max-w-2xl text-lg text-slate-600"
          >
            {subtitle}
          </motion.p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {usps.map((usp, index) => {
            const Icon = iconMap[usp.icon] || CheckCircle2
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group rounded-2xl border border-slate-200 bg-white p-8 shadow-lg transition-all hover:scale-105 hover:shadow-xl"
              >
                <div className="inline-flex rounded-xl bg-gradient-to-br from-blue-50 to-purple-50 p-4">
                  <Icon className="h-8 w-8 text-teal-600" />
                </div>
                <h3 className="mt-6 text-xl font-semibold text-slate-900">{usp.title}</h3>
                <p className="mt-3 text-slate-600">{usp.description}</p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
