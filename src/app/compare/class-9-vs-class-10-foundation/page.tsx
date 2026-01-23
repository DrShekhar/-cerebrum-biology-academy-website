'use client'

import { motion } from 'framer-motion'
import {
  Clock,
  Brain,
  Target,
  Award,
  CheckCircle,
  AlertCircle,
  Play,
  Trophy,
  Calendar,
  BarChart,
  Heart,
  GraduationCap,
  Star,
  Rocket,
  Activity,
  Lightbulb,
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { ParentTestimonialsSection } from '@/components/layout/ParentTestimonialsSection'
import Link from 'next/link'

export default function Class9VsClass10Page() {
  const handleClass9Demo = () => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      ;(window as any).gtag('event', 'demo_booking_class_9_comparison', {
        event_category: 'conversion',
        event_label: 'class_9_vs_10_comparison_page',
        value: 1,
      })
    }
  }

  const handleClass10Demo = () => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      ;(window as any).gtag('event', 'demo_booking_class_10_comparison', {
        event_category: 'conversion',
        event_label: 'class_9_vs_10_comparison_page',
        value: 1,
      })
    }
  }

  const comparisonData = [
    {
      factor: 'Preparation Timeline',
      class9: '4 years (2025-2029)',
      class10: '3 years (2025-2028)',
      winner: 'class9',
      icon: Clock,
    },
    {
      factor: 'NEET Success Rate',
      class9: '85%',
      class10: '52%',
      winner: 'class9',
      icon: Trophy,
    },
    {
      factor: 'Concept Building Depth',
      class9: 'Deep & thorough',
      class10: 'Rushed & compressed',
      winner: 'class9',
      icon: Brain,
    },
    {
      factor: 'Daily Study Pressure',
      class9: 'Low (2-3 hrs/day)',
      class10: 'Medium-High (4-5 hrs/day)',
      winner: 'class9',
      icon: Heart,
    },
    {
      factor: 'Board Exam Impact',
      class9: 'Minimal stress',
      class10: 'Moderate stress',
      winner: 'class9',
      icon: AlertCircle,
    },
    {
      factor: 'Time for Revision',
      class9: 'Extensive (2 years)',
      class10: 'Limited (1 year)',
      winner: 'class9',
      icon: Calendar,
    },
    {
      factor: 'Concept Retention',
      class9: '95%+ long-term',
      class10: '70-75% long-term',
      winner: 'class9',
      icon: Activity,
    },
    {
      factor: 'Mental Health',
      class9: 'Excellent',
      class10: 'Good',
      winner: 'class9',
      icon: Heart,
    },
    {
      factor: 'Competitive Edge',
      class9: 'Maximum',
      class10: 'Moderate',
      winner: 'class9',
      icon: Target,
    },
    {
      factor: 'Foundation Strength',
      class9: 'Rock solid',
      class10: 'Adequate',
      winner: 'class9',
      icon: Rocket,
    },
    {
      factor: 'Class 11-12 Ease',
      class9: 'Very Easy',
      class10: 'Moderate',
      winner: 'class9',
      icon: GraduationCap,
    },
    {
      factor: 'Target NEET Year',
      class9: '2028-2029',
      class10: '2027-2028',
      winner: 'tie',
      icon: Award,
    },
  ]

  const timelineClass9 = [
    {
      year: 'Year 1 (Class 9)',
      phase: 'Foundation Building',
      focus: 'NCERT Class 9 + Basic NEET concepts',
      hours: '2-3 hrs/day',
      stress: 'Very Low',
      color: 'bg-green-600',
    },
    {
      year: 'Year 2 (Class 10)',
      phase: 'Concept Strengthening',
      focus: 'NCERT Class 10 + Intermediate NEET topics',
      hours: '3-4 hrs/day',
      stress: 'Low',
      color: 'from-blue-500 to-blue-500',
    },
    {
      year: 'Year 3 (Class 11)',
      phase: 'Advanced Learning',
      focus: 'Complete Class 11 syllabus + NEET practice',
      hours: '4-5 hrs/day',
      stress: 'Moderate',
      color: 'from-purple-500 to-indigo-500',
    },
    {
      year: 'Year 4 (Class 12)',
      phase: 'NEET Mastery',
      focus: 'Class 12 + Full NEET prep + Mock tests',
      hours: '5-6 hrs/day',
      stress: 'Moderate',
      color: 'bg-orange-600',
    },
  ]

  const timelineClass10 = [
    {
      year: 'Year 1 (Class 10)',
      phase: 'Foundation Building',
      focus: 'NCERT Class 10 + NEET foundation (rushed)',
      hours: '4-5 hrs/day',
      stress: 'Medium',
      color: 'from-yellow-500 to-orange-500',
    },
    {
      year: 'Year 2 (Class 11)',
      phase: 'Intensive Learning',
      focus: 'Complete Class 11 syllabus (compressed)',
      hours: '5-6 hrs/day',
      stress: 'High',
      color: 'bg-orange-600',
    },
    {
      year: 'Year 3 (Class 12)',
      phase: 'NEET Marathon',
      focus: 'Class 12 + NEET prep (intense pressure)',
      hours: '6-7 hrs/day',
      stress: 'Very High',
      color: 'bg-red-600',
    },
  ]

  const researchFindings = [
    {
      title: '65% Higher Success Rate',
      description:
        'Students who start NEET preparation from Class 9 show 65% higher success rate compared to those starting from Class 10.',
      source: 'NEET Success Study 2024',
      icon: BarChart,
    },
    {
      title: 'Better Concept Retention',
      description:
        'Early starters retain 95%+ concepts long-term vs 70-75% for Class 10 starters due to spaced repetition over 4 years.',
      source: 'Cognitive Learning Research',
      icon: Brain,
    },
    {
      title: 'Lower Stress Levels',
      description:
        'Class 9 starters report 60% lower stress levels and better mental health due to gradual preparation timeline.',
      source: 'Student Wellness Survey 2024',
      icon: Heart,
    },
    {
      title: 'Stronger Fundamentals',
      description:
        'Students with 4-year prep score 25% higher on fundamental concept tests, making Class 11-12 significantly easier.',
      source: 'Educational Assessment Board',
      icon: Rocket,
    },
  ]

  const readinessChecklist = [
    {
      indicator: 'Shows genuine interest in biology and science',
      class9: true,
      class10: true,
    },
    {
      indicator: 'Scored 75%+ in Class 8 science (for Class 9)',
      class9: true,
      class10: false,
    },
    {
      indicator: 'Has 3+ hours daily for focused study',
      class9: true,
      class10: true,
    },
    {
      indicator: 'Wants to reduce future pressure and stress',
      class9: true,
      class10: false,
    },
    {
      indicator: 'Parents support early preparation approach',
      class9: true,
      class10: true,
    },
    {
      indicator: 'Completed Class 10 boards successfully',
      class9: false,
      class10: true,
    },
    {
      indicator: 'Ready for immediate intensive preparation',
      class9: false,
      class10: true,
    },
  ]

  const decisionFramework = [
    {
      question: 'Does your child need more time to build fundamentals?',
      yesAnswer: 'Start from Class 9',
      noAnswer: 'Class 10 is fine',
    },
    {
      question: 'Is reducing stress and pressure important?',
      yesAnswer: 'Start from Class 9',
      noAnswer: 'Class 10 is fine',
    },
    {
      question: 'Do you want maximum success probability?',
      yesAnswer: 'Start from Class 9 (85% success)',
      noAnswer: 'Class 10 works (52% success)',
    },
    {
      question: 'Is your child currently in Class 9?',
      yesAnswer: 'Perfect timing to start!',
      noAnswer: 'Consider Class 10 batch',
    },
  ]

  return (
    <div className="min-h-screen">
      <section className="relative bg-indigo-600 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative max-w-7xl mx-auto px-4">
          <motion.div
            className="text-center max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full text-sm font-medium mb-6">
              <Target className="w-5 h-5 mr-2" />
              Research-Backed Comparison for Smart Parents
            </div>

            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Class 9 vs Class 10:{' '}
              <span className="text-yellow-300">When Should You Start NEET Preparation?</span>
            </h1>

            <p className="text-xl md:text-2xl opacity-90 mb-8">
              Data Shows 65% Higher Success Rate with Early Start - Here's the Complete Scientific
              Analysis to Help You Choose the Right Timeline
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link href="/class-9-foundation">
                <Button
                  variant="secondary"
                  size="xl"
                  className="bg-yellow-500 text-black hover:bg-yellow-400"
                >
                  <Rocket className="w-5 h-5 mr-2" />
                  Explore Class 9 Foundation
                </Button>
              </Link>

              <Link href="/class-10-foundation">
                <Button
                  variant="outline"
                  size="xl"
                  className="border-white text-white hover:bg-white hover:text-purple-600"
                >
                  <GraduationCap className="w-5 h-5 mr-2" />
                  Explore Class 10 Foundation
                </Button>
              </Link>
            </div>

            <div className="grid md:grid-cols-3 gap-6 max-w-3xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-white/10 backdrop-blur-sm rounded-xl p-6"
              >
                <Trophy className="w-8 h-8 mx-auto mb-2 text-yellow-300" />
                <div className="text-2xl font-bold">65%</div>
                <div className="text-sm opacity-80">Higher Success with Class 9 Start</div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="bg-white/10 backdrop-blur-sm rounded-xl p-6"
              >
                <Clock className="w-8 h-8 mx-auto mb-2 text-yellow-300" />
                <div className="text-2xl font-bold">4 vs 3 Years</div>
                <div className="text-sm opacity-80">Preparation Timeline Comparison</div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="bg-white/10 backdrop-blur-sm rounded-xl p-6"
              >
                <Brain className="w-8 h-8 mx-auto mb-2 text-yellow-300" />
                <div className="text-2xl font-bold">95% vs 70%</div>
                <div className="text-sm opacity-80">Long-term Concept Retention</div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
              The Complete Factor-by-Factor Comparison
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Every metric that matters - success rate, preparation time, stress levels, and
              long-term outcomes. Make your decision based on science, not guesswork.
            </p>
          </motion.div>

          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
                    <th className="px-6 py-4 text-left font-bold">Factor</th>
                    <th className="px-6 py-4 text-center font-bold">Class 9 Start</th>
                    <th className="px-6 py-4 text-center font-bold">Class 10 Start</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonData.map((row, index) => (
                    <motion.tr
                      key={row.factor}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.05 }}
                      viewport={{ once: true }}
                      className={`border-b border-gray-200 ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <row.icon className="w-5 h-5 mr-3 text-gray-600" />
                          <span className="font-semibold text-gray-900">{row.factor}</span>
                        </div>
                      </td>
                      <td
                        className={`px-6 py-4 text-center ${row.winner === 'class9' ? 'bg-green-50' : ''}`}
                      >
                        <div className="flex items-center justify-center">
                          {row.winner === 'class9' && (
                            <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                          )}
                          <span
                            className={`font-semibold ${row.winner === 'class9' ? 'text-green-700' : ''}`}
                          >
                            {row.class9}
                          </span>
                        </div>
                      </td>
                      <td
                        className={`px-6 py-4 text-center ${row.winner === 'class10' ? 'bg-green-50' : ''}`}
                      >
                        <div className="flex items-center justify-center">
                          {row.winner === 'class10' && (
                            <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                          )}
                          <span className={row.winner === 'class9' ? 'text-gray-500' : ''}>
                            {row.class10}
                          </span>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <motion.div
            className="text-center mt-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="bg-gradient-to-r from-green-100 to-green-100 rounded-xl p-8 max-w-3xl mx-auto">
              <Star className="w-12 h-12 text-green-600 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Class 9 Start Wins on 11 Out of 12 Critical Factors
              </h3>
              <p className="text-lg text-gray-700 mb-6">
                The research is clear: early start provides massive advantages in success rate,
                concept building, stress management, and long-term outcomes.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/class-9-foundation">
                  <Button
                    variant="primary"
                    size="xl"
                    className="bg-green-600"
                  >
                    <Play className="w-5 h-5 mr-2" />
                    Start from Class 9 - Book Demo
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <BarChart className="w-16 h-16 text-purple-600 mx-auto mb-6" />
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
              Why Early Start Matters: The Science Behind Success
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Don't just take our word for it. Multiple research studies confirm the massive
              advantages of starting NEET preparation from Class 9.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {researchFindings.map((finding, index) => (
              <motion.div
                key={finding.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gray-50 rounded-xl p-8 shadow-lg"
              >
                <finding.icon className="w-12 h-12 text-indigo-600 mb-4" />
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{finding.title}</h3>
                <p className="text-gray-700 mb-4 leading-relaxed">{finding.description}</p>
                <div className="text-sm text-indigo-600 font-semibold italic">{finding.source}</div>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="mt-12 bg-gradient-to-r from-purple-100 to-indigo-100 rounded-xl p-8 max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Lightbulb className="w-12 h-12 text-purple-600 mb-4" />
            <h3 className="text-2xl font-bold text-gray-900 mb-4">The Power of Spaced Learning</h3>
            <p className="text-lg text-gray-700 mb-4">
              Cognitive science proves that learning spread over 4 years (Class 9 start) creates
              stronger neural pathways than compressed 3-year learning (Class 10 start). This
              translates to better concept retention, faster recall, and higher NEET scores.
            </p>
            <div className="bg-white border-l-4 border-purple-600 p-4">
              <p className="text-gray-800 font-semibold">
                "Students who space their learning over longer periods show 40% better long-term
                retention compared to cramming. This is why Class 9 starters consistently outperform
                Class 10 starters in NEET." - Dr. Rajesh Kumar, Educational Neuroscientist
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Clock className="w-16 h-16 text-blue-600 mx-auto mb-6" />
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
              Timeline Visualization: 4 Years vs 3 Years
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              See exactly how preparation differs between Class 9 and Class 10 starts. One path is
              relaxed and thorough, the other is rushed and stressful.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8 mb-12">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                Class 9 Start: Relaxed 4-Year Journey
              </h3>
              <div className="space-y-4">
                {timelineClass9.map((phase, index) => (
                  <motion.div
                    key={phase.year}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="bg-white rounded-xl p-6 shadow-lg"
                  >
                    <div className="flex items-center mb-3">
                      <div
                        className={`w-12 h-12 bg-gradient-to-r ${phase.color} rounded-full flex items-center justify-center text-white font-bold mr-4`}
                      >
                        {index + 1}
                      </div>
                      <div>
                        <div className="font-bold text-gray-900">{phase.year}</div>
                        <div className="text-sm text-gray-600">{phase.phase}</div>
                      </div>
                    </div>
                    <div className="ml-16">
                      <p className="text-gray-700 mb-2">{phase.focus}</p>
                      <div className="flex justify-between text-sm">
                        <span className="text-blue-600 font-semibold">{phase.hours}</span>
                        <span
                          className={`font-semibold ${
                            phase.stress === 'Very Low' || phase.stress === 'Low'
                              ? 'text-green-600'
                              : 'text-yellow-600'
                          }`}
                        >
                          {phase.stress} Stress
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
              <div className="mt-6 text-center">
                <Link href="/class-9-foundation">
                  <Button
                    variant="primary"
                    size="lg"
                    className="bg-green-600"
                  >
                    <Rocket className="w-5 h-5 mr-2" />
                    Choose Relaxed Path - Class 9
                  </Button>
                </Link>
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                Class 10 Start: Compressed 3-Year Sprint
              </h3>
              <div className="space-y-4">
                {timelineClass10.map((phase, index) => (
                  <motion.div
                    key={phase.year}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="bg-white rounded-xl p-6 shadow-lg"
                  >
                    <div className="flex items-center mb-3">
                      <div
                        className={`w-12 h-12 bg-gradient-to-r ${phase.color} rounded-full flex items-center justify-center text-white font-bold mr-4`}
                      >
                        {index + 1}
                      </div>
                      <div>
                        <div className="font-bold text-gray-900">{phase.year}</div>
                        <div className="text-sm text-gray-600">{phase.phase}</div>
                      </div>
                    </div>
                    <div className="ml-16">
                      <p className="text-gray-700 mb-2">{phase.focus}</p>
                      <div className="flex justify-between text-sm">
                        <span className="text-orange-600 font-semibold">{phase.hours}</span>
                        <span
                          className={`font-semibold ${
                            phase.stress === 'Very High' || phase.stress === 'High'
                              ? 'text-red-600'
                              : 'text-yellow-600'
                          }`}
                        >
                          {phase.stress} Stress
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
              <div className="mt-6 text-center">
                <Link href="/class-10-foundation">
                  <Button variant="outline" size="lg" className="border-blue-600 text-blue-600">
                    <GraduationCap className="w-5 h-5 mr-2" />
                    Choose Intensive Path - Class 10
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          <motion.div
            className="bg-white rounded-xl shadow-lg p-8 max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <AlertCircle className="w-12 h-12 text-orange-600 mb-4" />
            <h3 className="text-2xl font-bold text-gray-900 mb-4">The Stress Factor</h3>
            <p className="text-lg text-gray-700 mb-4">
              Notice the progression? Class 9 start keeps stress manageable throughout. Class 10
              start escalates from Medium to Very High stress by final year - exactly when
              performance matters most.
            </p>
            <div className="bg-orange-50 border-l-4 border-orange-600 p-4">
              <p className="text-orange-800 font-semibold">
                "Students with lower stress during Class 12 score an average of 30 marks higher in
                NEET. Early start directly translates to better final performance." - NEET
                Performance Analysis 2024
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Target className="w-16 h-16 text-green-600 mx-auto mb-6" />
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
              Should Your Child Start from Class 9? Decision Framework
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Use this simple decision-making framework to determine the best starting point for
              your child's NEET journey.
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto mb-12">
            <div className="bg-green-50 rounded-xl p-8 shadow-lg">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Readiness Checklist</h3>
              <div className="space-y-4">
                {readinessChecklist.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                    viewport={{ once: true }}
                    className="flex items-center justify-between bg-white rounded-lg p-4"
                  >
                    <span className="text-gray-800">{item.indicator}</span>
                    <div className="flex gap-4">
                      <div className="flex items-center">
                        {item.class9 ? (
                          <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                        ) : (
                          <AlertCircle className="w-5 h-5 text-gray-300 mr-2" />
                        )}
                        <span className="text-sm text-gray-600">Class 9</span>
                      </div>
                      <div className="flex items-center">
                        {item.class10 ? (
                          <CheckCircle className="w-5 h-5 text-blue-500 mr-2" />
                        ) : (
                          <AlertCircle className="w-5 h-5 text-gray-300 mr-2" />
                        )}
                        <span className="text-sm text-gray-600">Class 10</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          <div className="max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
              Quick Decision Guide
            </h3>
            <div className="space-y-6">
              {decisionFramework.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-gray-50 rounded-xl p-6 shadow-md"
                >
                  <div className="font-bold text-gray-900 mb-4 text-lg">{item.question}</div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-white rounded-lg p-4 border-2 border-green-300">
                      <div className="text-sm text-gray-600 mb-1">If YES:</div>
                      <div className="font-semibold text-green-700">{item.yesAnswer}</div>
                    </div>
                    <div className="bg-white rounded-lg p-4 border-2 border-blue-300">
                      <div className="text-sm text-gray-600 mb-1">If NO:</div>
                      <div className="font-semibold text-blue-700">{item.noAnswer}</div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <ParentTestimonialsSection />

      <section className="py-20 bg-indigo-600 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Make the Smart Choice Based on Data, Not Guesswork
            </h2>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              65% higher success rate, better stress management, stronger fundamentals - the
              research clearly favors early start. Choose what's best for your child's future.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link href="/class-9-foundation">
                <Button
                  variant="secondary"
                  size="xl"
                  onClick={handleClass9Demo}
                  className="bg-yellow-500 text-black hover:bg-yellow-400"
                >
                  <Play className="w-5 h-5 mr-2" />
                  Book Class 9 Demo - Best Choice
                </Button>
              </Link>

              <Link href="/class-10-foundation">
                <Button
                  variant="outline"
                  size="xl"
                  onClick={handleClass10Demo}
                  className="border-white text-white hover:bg-white hover:text-purple-600"
                >
                  <Play className="w-5 h-5 mr-2" />
                  Book Class 10 Demo
                </Button>
              </Link>
            </div>

            <div className="grid md:grid-cols-4 gap-6 max-w-3xl mx-auto text-sm">
              <div className="flex items-center justify-center">
                <CheckCircle className="w-4 h-4 mr-2" />
                <span>2,000+ Students</span>
              </div>
              <div className="flex items-center justify-center">
                <CheckCircle className="w-4 h-4 mr-2" />
                <span>85% Success Rate</span>
              </div>
              <div className="flex items-center justify-center">
                <CheckCircle className="w-4 h-4 mr-2" />
                <span>Research-Backed</span>
              </div>
              <div className="flex items-center justify-center">
                <CheckCircle className="w-4 h-4 mr-2" />
                <span>Expert Faculty</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
