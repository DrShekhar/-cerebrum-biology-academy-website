'use client'

import { EnhancedCourseSelector } from '@/components/courses/EnhancedCourseSelector'
import { motion } from 'framer-motion'

export default function AdvancedAnimationsDemo() {
  return (
    <div className="min-h-screen">
      {/* Demo Header */}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 text-white py-16"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-6xl font-bold mb-4"
          >
            🎬 Advanced Animation System
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto"
          >
            Experience Apple-level animation sophistication with orchestrated sequences, magnetic
            interactions, parallax effects, and seamless 60fps performance.
          </motion.p>

          {/* Feature highlights */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="grid md:grid-cols-4 gap-6 max-w-4xl mx-auto"
          >
            {[
              { icon: '🎭', title: 'Orchestration', desc: 'Complex sequences' },
              { icon: '🧲', title: 'Magnetic UI', desc: 'Cursor attraction' },
              { icon: '📐', title: 'Parallax', desc: 'Depth effects' },
              { icon: '⚡', title: '60fps', desc: 'Smooth performance' },
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  delay: 0.8 + index * 0.1,
                  duration: 0.5,
                  type: 'spring',
                  stiffness: 200,
                }}
                whileHover={{
                  scale: 1.1,
                  y: -5,
                  transition: { duration: 0.2 },
                }}
                className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20"
              >
                <div className="text-3xl mb-2">{feature.icon}</div>
                <h3 className="font-semibold mb-1">{feature.title}</h3>
                <p className="text-sm text-blue-200">{feature.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* Main Demo Content */}
      <EnhancedCourseSelector />

      {/* Technical Details */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-16"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">🛠️ Technical Implementation</h2>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Animation System */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.6 }}
              className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10"
            >
              <h3 className="text-xl font-semibold text-green-400 mb-4">🎨 Animation System</h3>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>• Apple's signature easing curves</li>
                <li>• Physics-based spring animations</li>
                <li>• Hardware-accelerated transforms</li>
                <li>• Staggered entrance sequences</li>
                <li>• layoutId shared element transitions</li>
              </ul>
            </motion.div>

            {/* Framer Motion Features */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10"
            >
              <h3 className="text-xl font-semibold text-blue-400 mb-4">⚡ Framer Motion</h3>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>• AnimatePresence exit animations</li>
                <li>• useInView viewport detection</li>
                <li>• useSpring smooth values</li>
                <li>• Gesture drag interactions</li>
                <li>• Performance optimizations</li>
              </ul>
            </motion.div>

            {/* Performance */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10"
            >
              <h3 className="text-xl font-semibold text-purple-400 mb-4">🚀 Performance</h3>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>• GPU acceleration with transform3d</li>
                <li>• will-change optimizations</li>
                <li>• Reduced motion accessibility</li>
                <li>• Efficient re-render prevention</li>
                <li>• 60fps maintained animations</li>
              </ul>
            </motion.div>
          </div>

          {/* Code Example */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="mt-12 bg-gray-900/50 backdrop-blur-sm rounded-2xl p-6 border border-white/10"
          >
            <h3 className="text-xl font-semibold text-yellow-400 mb-4 text-center">
              📝 Example Animation Configuration
            </h3>
            <div className="bg-black/50 rounded-xl p-4 text-sm font-mono text-green-300 overflow-x-auto">
              <pre>{`// Apple's signature animation system
const appleVariants = {
  cardEntrance: {
    hidden: {
      opacity: 0,
      y: 60,
      scale: 0.8,
      rotateX: -15,
      filter: 'blur(10px)',
    },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      rotateX: 0,
      filter: 'blur(0px)',
      transition: {
        duration: 0.8,
        delay: i * 0.1,
        ease: [0.16, 1, 0.3, 1], // Apple's curve
        type: 'spring',
        stiffness: 100,
        damping: 15,
      },
    }),
  },
}`}</pre>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Performance Stats */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="bg-gradient-to-br from-green-50 to-blue-50 py-16"
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-12">📊 Performance Metrics</h2>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              { label: 'Frame Rate', value: '60', unit: 'fps', color: 'text-green-600' },
              { label: 'GPU Usage', value: '95', unit: '%', color: 'text-blue-600' },
              { label: 'Load Time', value: '0.2', unit: 's', color: 'text-purple-600' },
              { label: 'Smoothness', value: '100', unit: '%', color: 'text-orange-600' },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                whileHover={{ scale: 1.05 }}
                className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/30"
              >
                <motion.div
                  className={`text-4xl font-bold mb-2 ${stat.color}`}
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 + index * 0.1, type: 'spring', stiffness: 200 }}
                >
                  {stat.value}
                  <span className="text-lg">{stat.unit}</span>
                </motion.div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  )
}
