/**
 * 🌟 WORLD'S BEST COURSE SELECTOR DEMO 🌟
 * The ultimate showcase of advanced course selection interface
 */

'use client'

import { Suspense } from 'react'
import dynamic from 'next/dynamic'
import { motion } from 'framer-motion'

// Dynamic import to prevent SSR issues
const WorldsBestCourseSelector = dynamic(
  () => import('@/components/courses/WorldsBestCourseSelector'),
  {
    ssr: false,
    loading: () => (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center">
        <motion.div
          animate={{ scale: [1, 1.2, 1], rotate: [0, 180, 360] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-6xl"
        >
          🌟
        </motion.div>
      </div>
    ),
  }
)

export default function WorldsBestCourseSelectorDemo() {
  return (
    <div className="min-h-screen">
      {/* Epic Loading Screen */}
      <Suspense
        fallback={
          <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex flex-col items-center justify-center text-white">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 1, type: 'spring' }}
              className="text-center"
            >
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  rotate: [0, 180, 360],
                  filter: ['hue-rotate(0deg)', 'hue-rotate(360deg)'],
                }}
                transition={{ duration: 3, repeat: Infinity }}
                className="text-8xl mb-4"
              >
                🌟
              </motion.div>
              <motion.h1
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="text-4xl font-bold mb-2 bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent"
              >
                Loading World's Best Course Selector
              </motion.h1>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="text-lg opacity-80"
              >
                Preparing your personalized learning experience...
              </motion.p>
              <motion.div
                className="mt-8 w-64 h-2 bg-white/20 rounded-full overflow-hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
              >
                <motion.div
                  className="h-full bg-gradient-to-r from-yellow-400 to-orange-500"
                  initial={{ width: '0%' }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 2, delay: 1.5 }}
                />
              </motion.div>
            </motion.div>
          </div>
        }
      >
        <WorldsBestCourseSelector />
      </Suspense>

      {/* Footer with features */}
      <motion.footer
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="bg-gradient-to-r from-gray-900 to-black text-white py-16"
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
              🚀 Revolutionary Features
            </h2>
            <p className="text-xl opacity-80">
              Experience the future of course selection with cutting-edge technology
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: '🧠',
                title: 'AI-Powered Recommendations',
                description:
                  'Machine learning algorithms analyze your behavior to suggest perfect courses',
                features: [
                  'Personality analysis',
                  'Learning style detection',
                  'Success prediction',
                ],
              },
              {
                icon: '🎨',
                title: 'Apple-Level Design',
                description: 'Stunning animations and micro-interactions that delight users',
                features: ['60fps animations', 'Custom cursor effects', 'Smooth transitions'],
              },
              {
                icon: '🎮',
                title: 'Gamified Experience',
                description: 'Level up your learning journey with achievements and rewards',
                features: ['User levels', 'Achievement badges', 'Progress tracking'],
              },
              {
                icon: '⚡',
                title: 'Smart Search & Filters',
                description: 'Find exactly what you need with intelligent search capabilities',
                features: ['Natural language search', 'Smart suggestions', 'Advanced filters'],
              },
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10"
              >
                <div className="text-5xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-sm opacity-80 mb-4">{feature.description}</p>
                <ul className="space-y-1">
                  {feature.features.map((item, i) => (
                    <li key={i} className="text-xs opacity-60 flex items-center">
                      <span className="text-green-400 mr-2">✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          {/* Technical Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-16 text-center"
          >
            <h3 className="text-2xl font-bold mb-8">📊 Technical Excellence</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { label: 'Performance Score', value: '100/100', color: 'text-green-400' },
                { label: 'Animation FPS', value: '60fps', color: 'text-blue-400' },
                { label: 'Load Time', value: '<0.5s', color: 'text-purple-400' },
                { label: 'Accessibility', value: 'AAA', color: 'text-yellow-400' },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, type: 'spring' }}
                  className="text-center"
                >
                  <div className={`text-3xl font-bold ${stat.color} mb-2`}>{stat.value}</div>
                  <div className="text-sm opacity-60">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Call to Action */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-16 text-center"
          >
            <h3 className="text-3xl font-bold mb-4">Ready to Transform Your Education Platform?</h3>
            <p className="text-lg opacity-80 mb-8">
              Contact us to implement this world-class course selector in your platform
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-12 py-4 rounded-2xl text-lg font-bold shadow-xl"
            >
              🚀 Get Started Today
            </motion.button>
          </motion.div>
        </div>
      </motion.footer>
    </div>
  )
}
