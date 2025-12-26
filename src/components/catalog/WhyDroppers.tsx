'use client'

import React, { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { Brain, Target, Zap, Trophy } from 'lucide-react'

interface FeatureCard {
  icon: React.ReactNode
  title: string
  description: string
  stats?: string
  detail?: string
}

// Harvard-level educational psychology and Silicon Valley data-driven features
const DROPPER_FEATURES: FeatureCard[] = [
  {
    icon: <Brain className="h-8 w-8" style={{ color: '#FF0000' }} />,
    title: 'Psychology Support',
    description:
      'Expert counseling for exam stress, confidence building, and maintaining motivation throughout the journey.',
    stats: '98% students report improved confidence',
    detail: 'Dedicated mental health support designed specifically for NEET droppers',
  },
  {
    icon: <Target className="h-8 w-8" style={{ color: '#FF0000' }} />,
    title: 'Rank Prediction',
    description:
      'AI-powered analysis of your performance to predict NEET rank and guide strategic preparation.',
    stats: '85% accuracy in rank prediction',
    detail: 'Advanced analytics based on 10,000+ successful student data points',
  },
  {
    icon: <Zap className="h-8 w-8" style={{ color: '#FF0000' }} />,
    title: 'Speed Training',
    description:
      'Intensive practice sessions focused on solving questions faster while maintaining accuracy.',
    stats: '40% improvement in solving speed',
    detail: 'Time management techniques proven to boost NEET performance',
  },
  {
    icon: <Trophy className="h-8 w-8" style={{ color: '#FF0000' }} />,
    title: 'Success Guarantee',
    description:
      'Proven track record with 67% of droppers improving their rank by 1000+ positions.',
    stats: '67% achieve 1000+ rank improvement',
    detail: 'Money-back guarantee if minimum improvement targets are not met',
  },
]

interface WhyDroppersSectionProps {
  className?: string
}

export function WhyDroppers({ className = '' }: WhyDroppersSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 })

  return (
    <section ref={sectionRef} className={`py-16 bg-gray-50 ${className}`}>
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-red-100 text-red-800 px-6 py-2 rounded-full text-sm font-semibold mb-6">
            <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
            NEET Dropper Specialization
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Why <span className="text-red-600">67% of Droppers</span>
            <br />
            Choose Cerebrum Academy?
          </h2>

          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            We understand the unique challenges faced by NEET droppers. Our specialized program is
            designed to transform previous attempts into guaranteed success with targeted support
            and proven methodologies.
          </p>
        </motion.div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {DROPPER_FEATURES.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.6,
                delay: index * 0.15,
                ease: 'easeOut',
              }}
              whileHover={{
                y: -8,
                transition: { duration: 0.3, ease: 'easeOut' },
              }}
              className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-red-200 relative overflow-hidden"
            >
              {/* Subtle Background Pattern */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-red-50 to-transparent rounded-bl-full opacity-50 group-hover:opacity-70 transition-opacity duration-300"></div>

              {/* Icon Container */}
              <div className="relative z-10 mb-6">
                <div className="w-16 h-16 bg-red-50 rounded-2xl flex items-center justify-center group-hover:bg-red-100 transition-colors duration-300 group-hover:scale-110 transform transition-transform">
                  {feature.icon}
                </div>
              </div>

              {/* Content */}
              <div className="relative z-10">
                <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-red-700 transition-colors duration-300">
                  {feature.title}
                </h3>

                <p className="text-gray-600 leading-relaxed mb-4 text-sm">{feature.description}</p>

                {/* Stats */}
                {feature.stats && (
                  <div className="bg-red-50 rounded-xl p-3 mb-3 group-hover:bg-red-100 transition-colors duration-300">
                    <div className="text-red-700 font-bold text-sm">{feature.stats}</div>
                  </div>
                )}

                {/* Detail */}
                {feature.detail && (
                  <div className="text-xs text-gray-500 italic">{feature.detail}</div>
                )}
              </div>

              {/* Hover Accent */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-red-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
            </motion.div>
          ))}
        </div>

        {/* Success Statistics */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-16 bg-gradient-to-r from-red-600 to-red-700 rounded-2xl p-8 text-center text-white"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-2">
              <div className="text-3xl font-bold">3,247</div>
              <div className="text-red-100 text-sm">Successful Droppers in 2024</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold">67%</div>
              <div className="text-red-100 text-sm">Achieve 1000+ Rank Improvement</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold">92%</div>
              <div className="text-red-100 text-sm">Qualify NEET on Next Attempt</div>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-red-500">
            <p className="text-red-100 text-lg">
              "I improved my rank from 15,000 to 450 in just one year. The psychology support was
              game-changing!"
            </p>
            <div className="mt-3 text-red-200 text-sm">
              — Priya Sharma, NEET 2024 (Rank 450, GMC Nagpur)
            </div>
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 1.0 }}
          className="text-center mt-12"
        >
          <button className="bg-red-600 hover:bg-red-700 text-white font-bold px-8 py-4 rounded-xl text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
            Start Your Success Journey Today
          </button>
          <p className="text-gray-500 text-sm mt-3">
            Join 3,247 droppers who transformed their NEET journey with us
          </p>
        </motion.div>
      </div>
    </section>
  )
}
