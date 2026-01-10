'use client'

import { motion } from 'framer-motion'
import {
  CheckCircle,
  Target,
  TrendingUp,
  Award,
  BookOpen,
  Users,
  Clock,
  Trophy,
} from 'lucide-react'
import Link from 'next/link'
import { useI18n } from '@/contexts/I18nContext'

export function ValuePropositionSection() {
  const { t } = useI18n()
  const successFramework = [
    {
      step: '01',
      title: 'Diagnostic Assessment',
      description: 'Comprehensive evaluation of your current Biology knowledge and NEET readiness',
      icon: Target,
      color: 'from-blue-500 to-blue-600',
      benefits: ['Personalized learning path', 'Identify weak areas', 'Set realistic goals'],
    },
    {
      step: '02',
      title: 'Strategic Learning',
      description:
        'AIIMS faculty-designed curriculum with proven methodology for maximum retention',
      icon: BookOpen,
      color: 'bg-green-600',
      benefits: ['Expert faculty guidance', 'High-yield topics focus', 'Regular assessments'],
    },
    {
      step: '03',
      title: 'Performance Optimization',
      description: 'Continuous monitoring and strategy refinement for consistent improvement',
      icon: TrendingUp,
      color: 'bg-green-600',
      benefits: ['Real-time progress tracking', 'Strategy adjustments', 'Guaranteed results'],
    },
  ]

  const comparisonMetrics = [
    {
      metric: 'Average Score Improvement',
      traditional: '+45 points',
      cerebrum: '+127 points',
      improvement: '+182% better',
    },
    {
      metric: 'Time to Target Score',
      traditional: '18 months',
      cerebrum: '8 months',
      improvement: '56% faster',
    },
    {
      metric: 'Success Rate',
      traditional: '23%',
      cerebrum: '94.2%',
      improvement: '+309% higher',
    },
    {
      metric: 'Medical College Admissions',
      traditional: '1 in 5 students',
      cerebrum: '9 in 10 students',
      improvement: '4.5x more likely',
    },
  ]

  const guarantees = [
    {
      icon: Trophy,
      title: '94.2% Success Guarantee',
      description: 'Or get 100% refund + additional coaching until you succeed',
    },
    {
      icon: Clock,
      title: '8-Month Fast Track',
      description: 'Achieve your target NEET score in record time with our proven system',
    },
    {
      icon: Award,
      title: 'AIIMS Faculty Promise',
      description: 'Learn directly from doctors who cleared NEET with top ranks',
    },
  ]

  return (
    <section className="py-20 bg-navy-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            {t('neetSuccessFramework')}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">{t('frameworkDescription')}</p>
        </motion.div>

        {/* Success Framework Steps */}
        <div className="mb-20">
          <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
            {successFramework.map((step, index) => {
              const Icon = step.icon
              return (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                  className="relative"
                >
                  {/* Connection Line */}
                  {index < successFramework.length - 1 && (
                    <div className="hidden lg:block absolute top-20 left-full w-full h-0.5 bg-gradient-to-r from-blue-200 to-green-200 z-10">
                      <div className="absolute right-0 top-1/2 transform -translate-y-1/2">
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      </div>
                    </div>
                  )}

                  <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 relative z-20">
                    {/* Step Number */}
                    <div className="flex items-center mb-6">
                      <div
                        className={`w-16 h-16 bg-gradient-to-r ${step.color} rounded-xl flex items-center justify-center mr-4`}
                      >
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                      <div className="text-6xl font-bold text-gray-100">{step.step}</div>
                    </div>

                    <h3 className="text-2xl font-bold text-gray-900 mb-4">{step.title}</h3>
                    <p className="text-gray-600 mb-6 leading-relaxed">{step.description}</p>

                    {/* Benefits */}
                    <div className="space-y-3">
                      {step.benefits.map((benefit, benefitIndex) => (
                        <div key={benefitIndex} className="flex items-center text-sm">
                          <CheckCircle className="w-4 h-4 text-green-600 mr-3 flex-shrink-0" />
                          <span className="text-gray-700">{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>

        {/* Comparison Table */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              {t('whyChooseOverTraditional')}
            </h3>
            <p className="text-lg text-gray-600">{t('seeDramaticDifference')}</p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-navy-900 text-white">
                    <th className="text-left py-6 px-6 font-semibold">Success Metrics</th>
                    <th className="text-center py-6 px-6 font-semibold">Traditional Coaching</th>
                    <th className="text-center py-6 px-6 font-semibold">Our Academy</th>
                    <th className="text-center py-6 px-6 font-semibold">Improvement</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonMetrics.map((row, index) => (
                    <tr
                      key={index}
                      className={`${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} hover:bg-blue-50 transition-colors`}
                    >
                      <td className="py-6 px-6 font-medium text-gray-900">{row.metric}</td>
                      <td className="py-6 px-6 text-center text-gray-600">{row.traditional}</td>
                      <td className="py-6 px-6 text-center">
                        <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full font-semibold">
                          {row.cerebrum}
                        </span>
                      </td>
                      <td className="py-6 px-6 text-center">
                        <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full font-semibold">
                          {row.improvement}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </motion.div>

        {/* Guarantees */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">{t('ourCommitment')}</h3>
            <p className="text-lg text-gray-600">{t('confidentInMethodology')}</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {guarantees.map((guarantee, index) => {
              const Icon = guarantee.icon
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 text-center hover:shadow-xl transition-all duration-300"
                >
                  <div className="w-16 h-16 bg-gradient-to-r from-green-600 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h4 className="text-xl font-bold text-gray-900 mb-3">{guarantee.title}</h4>
                  <p className="text-gray-600 leading-relaxed">{guarantee.description}</p>
                </motion.div>
              )
            })}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="bg-navy-900 rounded-2xl p-8 text-white">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              {t('readyExperienceDifference')}
            </h3>
            <p className="text-blue-100 mb-6 text-lg">{t('joinThousands')}</p>
            <Link
              href="/demo-booking"
              className="inline-block bg-green-600 text-white px-4 sm:px-8 py-3 sm:py-4 rounded-full font-semibold hover:bg-green-700 transition-all duration-300 transform hover:-translate-y-1 shadow-lg text-sm sm:text-base"
            >
              {t('bookFreeStrategy')}
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
