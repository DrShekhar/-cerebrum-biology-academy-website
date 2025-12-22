'use client'

import { motion } from 'framer-motion'
import { Clock, Users, Check, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { SEOLandingContent, tierPageLinks, ClassLevel } from '@/data/seo-landing/types'

interface CourseSummaryCardProps {
  courseSummary: SEOLandingContent['courseSummary']
  classLevel: ClassLevel
  ctaLink: string
}

export function CourseSummaryCard({ courseSummary, classLevel, ctaLink }: CourseSummaryCardProps) {
  const tierLink = tierPageLinks[classLevel]

  return (
    <section className="bg-white py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
          {/* Course Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">{courseSummary.title}</h2>

            <div className="mt-6 flex flex-wrap gap-4">
              <div className="inline-flex items-center gap-2 rounded-full bg-blue-100 px-4 py-2 text-sm font-medium text-blue-800">
                <Clock className="h-4 w-4" />
                {courseSummary.duration}
              </div>
              <div className="inline-flex items-center gap-2 rounded-full bg-purple-100 px-4 py-2 text-sm font-medium text-purple-800">
                <Users className="h-4 w-4" />
                {courseSummary.batchSize}
              </div>
            </div>

            <div className="mt-8 space-y-3">
              {courseSummary.features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="flex items-start gap-3"
                >
                  <div className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-green-500 text-white">
                    <Check className="h-3 w-3" />
                  </div>
                  <span className="text-gray-700">{feature}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Pricing Card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-600 to-purple-600 p-8 text-white shadow-2xl"
          >
            {/* Decorative Elements */}
            <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/10" />
            <div className="absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-white/10" />

            <div className="relative">
              <p className="text-lg font-medium text-white/80">Starting at</p>

              <div className="mt-2 flex items-baseline gap-2">
                {courseSummary.price.discounted ? (
                  <>
                    <span className="text-lg text-white/60 line-through">
                      ₹{courseSummary.price.original.toLocaleString()}
                    </span>
                    <span className="text-4xl font-bold sm:text-5xl">
                      ₹{courseSummary.price.discounted.toLocaleString()}
                    </span>
                  </>
                ) : (
                  <span className="text-4xl font-bold sm:text-5xl">
                    ₹{courseSummary.price.original.toLocaleString()}
                  </span>
                )}
                <span className="text-white/70">/year</span>
              </div>

              {courseSummary.price.emi && (
                <p className="mt-2 text-white/80">
                  or EMI starting at{' '}
                  <span className="font-semibold">{courseSummary.price.emi}</span>
                </p>
              )}

              <div className="mt-8 space-y-4">
                <Link
                  href={ctaLink}
                  className="group flex w-full items-center justify-center gap-2 rounded-xl bg-white px-6 py-4 text-lg font-semibold text-blue-600 transition-all hover:bg-gray-100 hover:shadow-lg"
                >
                  View Complete Details
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Link>

                <Link
                  href={tierLink}
                  className="flex w-full items-center justify-center gap-2 rounded-xl border-2 border-white/30 bg-white/10 px-6 py-4 text-lg font-semibold text-white transition-all hover:border-white/50 hover:bg-white/20"
                >
                  Compare All Tiers
                </Link>
              </div>

              <p className="mt-6 text-center text-sm text-white/70">
                3 pricing tiers available to match your budget
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
