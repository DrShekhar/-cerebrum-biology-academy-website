'use client'

import { motion } from 'framer-motion'
import { ArrowRight, TrendingUp, Clock, Target, Quote, GraduationCap } from 'lucide-react'
import { successStories, type SuccessStory } from '@/data/realTestimonials'
import { useState } from 'react'
import Link from 'next/link'

interface SuccessStoriesSectionProps {
  stories?: SuccessStory[]
  title?: string
  subtitle?: string
  showViewAll?: boolean
  maxStories?: number
}

function StoryCard({ story, index }: { story: SuccessStory; index: number }) {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <motion.div
      className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      {/* Score Improvement Header */}
      <div className="bg-green-600 p-6 text-white relative overflow-hidden">
        <motion.div
          className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 4, repeat: Infinity }}
        />

        <div className="relative z-10">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-xl font-bold">{story.studentName}</h3>
              <p className="text-green-100 text-sm">{story.college}</p>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-full px-3 py-1 text-sm">
              {story.year}
            </div>
          </div>

          {/* Score Transformation */}
          <div className="flex items-center justify-between bg-white/10 rounded-xl p-4">
            <div className="text-center">
              <div className="text-2xl font-bold">{story.beforeScore}</div>
              <div className="text-xs text-green-200">Before</div>
            </div>
            <div className="flex flex-col items-center">
              <motion.div animate={{ x: [0, 5, 0] }} transition={{ duration: 1, repeat: Infinity }}>
                <ArrowRight className="w-6 h-6" />
              </motion.div>
              <div className="text-xs mt-1 bg-yellow-400 text-yellow-900 px-2 py-0.5 rounded-full font-bold">
                +{story.improvement}
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">{story.afterScore}</div>
              <div className="text-xs text-green-200">After</div>
            </div>
          </div>
        </div>
      </div>

      {/* Story Content */}
      <div className="p-6">
        {/* Duration */}
        <div className="flex items-center text-sm text-gray-600 mb-4">
          <Clock className="w-4 h-4 mr-2 text-blue-500" />
          <span>Transformation in {story.duration}</span>
        </div>

        {/* Challenges */}
        <div className="mb-4">
          <h4 className="text-sm font-semibold text-gray-700 mb-2 flex items-center">
            <Target className="w-4 h-4 mr-2 text-red-500" />
            Challenges Overcome
          </h4>
          <div className="flex flex-wrap gap-2">
            {story.challenges.slice(0, isExpanded ? undefined : 2).map((challenge, i) => (
              <span key={i} className="text-xs bg-red-50 text-red-700 px-2 py-1 rounded-full">
                {challenge}
              </span>
            ))}
            {!isExpanded && story.challenges.length > 2 && (
              <button
                onClick={() => setIsExpanded(true)}
                className="text-xs text-blue-600 hover:text-blue-700"
              >
                +{story.challenges.length - 2} more
              </button>
            )}
          </div>
        </div>

        {/* Strategy */}
        <div className="mb-4">
          <h4 className="text-sm font-semibold text-gray-700 mb-2 flex items-center">
            <TrendingUp className="w-4 h-4 mr-2 text-green-600" />
            Winning Strategy
          </h4>
          <p className="text-sm text-gray-600">{story.strategy}</p>
        </div>

        {/* Quote */}
        <div className="bg-gray-50 rounded-xl p-4 relative">
          <Quote className="absolute top-2 left-2 w-6 h-6 text-blue-200" />
          <p className="text-sm text-gray-700 italic pl-6">"{story.quote}"</p>
        </div>
      </div>
    </motion.div>
  )
}

export function SuccessStoriesSection({
  stories = successStories,
  title = 'Transformation Stories',
  subtitle = 'Real students, real improvements, real success',
  showViewAll = true,
  maxStories = 3,
}: SuccessStoriesSectionProps) {
  const displayedStories = stories.slice(0, maxStories)

  return (
    <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <TrendingUp className="w-4 h-4 mr-2" />
            Score Improvements
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{title}</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">{subtitle}</p>
        </motion.div>

        {/* Stats Bar */}
        <motion.div
          className="grid grid-cols-3 gap-4 max-w-2xl mx-auto mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <div className="text-center bg-white rounded-xl p-4 shadow-md">
            <div className="text-2xl md:text-3xl font-bold text-green-600">156+</div>
            <div className="text-xs md:text-sm text-gray-600">Avg. Improvement</div>
          </div>
          <div className="text-center bg-white rounded-xl p-4 shadow-md">
            <div className="text-2xl md:text-3xl font-bold text-blue-600">98%</div>
            <div className="text-xs md:text-sm text-gray-600">Success Rate</div>
          </div>
          <div className="text-center bg-white rounded-xl p-4 shadow-md">
            <div className="text-2xl md:text-3xl font-bold text-purple-600">2,500+</div>
            <div className="text-xs md:text-sm text-gray-600">Selections</div>
          </div>
        </motion.div>

        {/* Stories Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {displayedStories.map((story, index) => (
            <StoryCard key={story.id} story={story} index={index} />
          ))}
        </div>

        {/* View All Button */}
        {showViewAll && (
          <motion.div
            className="text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <Link
              href="/success-stories"
              className="inline-flex items-center bg-blue-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-blue-700 transition-all shadow-lg hover:shadow-xl"
            >
              <GraduationCap className="w-5 h-5 mr-2" />
              View All Success Stories
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </motion.div>
        )}
      </div>
    </section>
  )
}
