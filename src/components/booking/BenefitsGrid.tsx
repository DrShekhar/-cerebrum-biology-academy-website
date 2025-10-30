'use client'

import { motion } from 'framer-motion'
import { Video, BookOpen, Target, Award } from 'lucide-react'

interface Benefit {
  icon: React.ReactNode
  title: string
  description: string
  color: string
}

const benefits: Benefit[] = [
  {
    icon: <Video className="w-6 h-6" />,
    title: '45-Min Live Demo',
    description: 'One-on-one with AIIMS expert',
    color: 'from-blue-500 to-blue-600',
  },
  {
    icon: <BookOpen className="w-6 h-6" />,
    title: 'Free Study Materials',
    description: 'Chapter notes worth ₹2,000',
    color: 'from-purple-500 to-purple-600',
  },
  {
    icon: <Target className="w-6 h-6" />,
    title: 'NEET Strategy Session',
    description: 'Personalized roadmap',
    color: 'from-green-500 to-green-600',
  },
  {
    icon: <Award className="w-6 h-6" />,
    title: '100% Satisfaction',
    description: 'Money-back guarantee',
    color: 'from-orange-500 to-orange-600',
  },
]

export function BenefitsGrid() {
  return (
    <div className="mb-6">
      <h3 className="text-lg font-bold text-gray-900 mb-4 text-center">
        What You Get in Your Free Demo
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {benefits.map((benefit, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.05, y: -5 }}
            className="bg-white rounded-lg p-4 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100"
          >
            <div
              className={`w-12 h-12 rounded-lg bg-gradient-to-br ${benefit.color} flex items-center justify-center text-white mb-3`}
            >
              {benefit.icon}
            </div>
            <h4 className="font-semibold text-gray-900 mb-1">{benefit.title}</h4>
            <p className="text-sm text-gray-600">{benefit.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
