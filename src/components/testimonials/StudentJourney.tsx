'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import {
  TrendingUp,
  Calendar,
  BookOpen,
  Target,
  Award,
  Clock,
  CheckCircle,
  ArrowRight,
  Play,
  Download,
  Star,
  BarChart3,
} from 'lucide-react'
import { motion } from 'framer-motion'

interface StudentJourneyProps {
  student: {
    id: string
    name: string
    image: string
    school: string
    class: string
    startDate: string
    endDate: string
    college: string
    neetRank: number
    previousAttempts?: {
      year: string
      score: number
      rank?: number
    }[]
    finalScore: {
      biology: number
      chemistry: number
      physics: number
      total: number
    }
    improvement: {
      biology: number
      total: number
    }
    journey: {
      phase: string
      duration: string
      description: string
      achievements: string[]
      challenges: string[]
      strategies: string[]
      scoreProgress?: number
    }[]
    testimonialVideo?: string
    studyMaterials: {
      title: string
      type: 'notes' | 'practice' | 'video'
      downloads: number
    }[]
    mentorQuote: string
    parentQuote: string
    advice: string[]
  }
}

export function StudentJourney({ student }: StudentJourneyProps) {
  const [activePhase, setActivePhase] = useState(0)
  const [showScoreChart, setShowScoreChart] = useState(false)

  const scoreData = [
    { month: 'Start', score: student.previousAttempts?.[0]?.score || 300 },
    { month: '3 months', score: 400 },
    { month: '6 months', score: 480 },
    { month: '9 months', score: 550 },
    { month: '12 months', score: student.finalScore.total },
  ]

  return (
    <div className="max-w-6xl mx-auto">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl text-white p-8 mb-8">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h1 className="text-4xl font-bold mb-4">
              {student.name}&apos;s NEET Success Journey
            </h1>
            <div className="space-y-2 text-blue-100">
              <p className="text-lg">{student.school} → {student.college}</p>
              <p>NEET Rank: #{student.neetRank.toLocaleString()}</p>
              <p>Journey Duration: {student.startDate} to {student.endDate}</p>
            </div>
            
            <div className="flex items-center mt-6 space-x-4">
              {student.testimonialVideo && (
                <Button variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
                  <Play className="w-4 h-4 mr-2" />
                  Watch Story
                </Button>
              )}
              <Button 
                onClick={() => setShowScoreChart(!showScoreChart)}
                variant="outline" 
                className="border-white text-white hover:bg-white hover:text-blue-600"
              >
                <BarChart3 className="w-4 h-4 mr-2" />
                Score Progress
              </Button>
            </div>
          </div>

          <div className="relative">
            <div className="aspect-square rounded-full overflow-hidden border-4 border-white/20 bg-white/10 backdrop-blur-sm">
              <img
                src={student.image}
                alt={student.name}
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Achievement Badges */}
            <div className="absolute -top-2 -right-2 bg-yellow-400 text-yellow-900 rounded-full w-16 h-16 flex items-center justify-center font-bold text-sm">
              AIIMS
            </div>
            <div className="absolute -bottom-2 -left-2 bg-green-400 text-green-900 rounded-full w-20 h-20 flex items-center justify-center font-bold text-xs text-center">
              +{student.improvement.total}<br/>Marks
            </div>
          </div>
        </div>
      </div>

      {/* Score Progress Chart */}
      {showScoreChart && (
        <motion.div
          className="bg-white rounded-3xl shadow-lg p-8 mb-8"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
        >
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Score Improvement Timeline</h3>
          
          <div className="relative">
            {/* Chart Background */}
            <div className="bg-gray-50 rounded-2xl p-6">
              <div className="flex items-end justify-between h-64">
                {scoreData.map((data, index) => (
                  <div key={index} className="flex flex-col items-center flex-1">
                    <div 
                      className="bg-gradient-to-t from-blue-600 to-blue-400 rounded-t-lg w-12 transition-all duration-1000 ease-out"
                      style={{ 
                        height: `${(data.score / 720) * 100}%`,
                        animationDelay: `${index * 200}ms`
                      }}
                    >
                      <div className="text-white text-xs font-semibold p-1 text-center">
                        {data.score}
                      </div>
                    </div>
                    <div className="text-sm text-gray-600 mt-2 text-center">
                      {data.month}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Score Breakdown */}
            <div className="grid md:grid-cols-3 gap-6 mt-6">
              <div className="bg-green-50 rounded-2xl p-4">
                <h4 className="font-semibold text-green-900 mb-2">Biology</h4>
                <div className="text-3xl font-bold text-green-600">{student.finalScore.biology}/360</div>
                <div className="text-green-700 text-sm">+{student.improvement.biology} improvement</div>
              </div>
              <div className="bg-blue-50 rounded-2xl p-4">
                <h4 className="font-semibold text-blue-900 mb-2">Chemistry</h4>
                <div className="text-3xl font-bold text-blue-600">{student.finalScore.chemistry}/180</div>
              </div>
              <div className="bg-purple-50 rounded-2xl p-4">
                <h4 className="font-semibold text-purple-900 mb-2">Physics</h4>
                <div className="text-3xl font-bold text-purple-600">{student.finalScore.physics}/180</div>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Journey Timeline */}
      <div className="bg-white rounded-3xl shadow-lg p-8 mb-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-8">Preparation Journey</h3>

        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-8 top-0 bottom-0 w-1 bg-gray-200"></div>

          {/* Journey Phases */}
          <div className="space-y-8">
            {student.journey.map((phase, index) => (
              <motion.div
                key={index}
                className={`relative cursor-pointer transition-all duration-300 ${
                  activePhase === index ? 'transform scale-105' : ''
                }`}
                onClick={() => setActivePhase(activePhase === index ? -1 : index)}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                {/* Timeline Dot */}
                <div className={`absolute left-6 w-4 h-4 rounded-full border-4 ${
                  activePhase === index ? 'bg-blue-600 border-blue-600' : 'bg-white border-gray-300'
                }`}></div>

                {/* Phase Content */}
                <div className="ml-16 bg-gray-50 rounded-2xl p-6 hover:bg-gray-100 transition-colors">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h4 className="text-xl font-bold text-gray-900">{phase.phase}</h4>
                      <p className="text-blue-600 font-medium">{phase.duration}</p>
                    </div>
                    <div className="flex items-center">
                      {phase.scoreProgress && (
                        <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold mr-3">
                          {phase.scoreProgress} marks
                        </div>
                      )}
                      <ArrowRight className={`w-5 h-5 text-gray-400 transition-transform ${
                        activePhase === index ? 'rotate-90' : ''
                      }`} />
                    </div>
                  </div>

                  <p className="text-gray-700 mb-4">{phase.description}</p>

                  {/* Expanded Details */}
                  {activePhase === index && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="grid md:grid-cols-3 gap-6 mt-6 pt-6 border-t border-gray-200"
                    >
                      <div>
                        <h5 className="font-semibold text-green-900 mb-3 flex items-center">
                          <CheckCircle className="w-4 h-4 mr-2" />
                          Achievements
                        </h5>
                        <ul className="space-y-2">
                          {phase.achievements.map((achievement, i) => (
                            <li key={i} className="text-sm text-gray-700 flex items-start">
                              <Star className="w-3 h-3 text-yellow-500 mr-2 mt-1 flex-shrink-0" />
                              {achievement}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h5 className="font-semibold text-red-900 mb-3 flex items-center">
                          <Target className="w-4 h-4 mr-2" />
                          Challenges
                        </h5>
                        <ul className="space-y-2">
                          {phase.challenges.map((challenge, i) => (
                            <li key={i} className="text-sm text-gray-700 flex items-start">
                              <div className="w-3 h-3 bg-red-400 rounded-full mr-2 mt-1 flex-shrink-0"></div>
                              {challenge}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h5 className="font-semibold text-blue-900 mb-3 flex items-center">
                          <BookOpen className="w-4 h-4 mr-2" />
                          Strategies
                        </h5>
                        <ul className="space-y-2">
                          {phase.strategies.map((strategy, i) => (
                            <li key={i} className="text-sm text-gray-700 flex items-start">
                              <ArrowRight className="w-3 h-3 text-blue-500 mr-2 mt-1 flex-shrink-0" />
                              {strategy}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Study Materials Used */}
      <div className="bg-white rounded-3xl shadow-lg p-8 mb-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-6">Study Materials & Resources</h3>
        
        <div className="grid md:grid-cols-3 gap-6">
          {student.studyMaterials.map((material, index) => (
            <div key={index} className="bg-gray-50 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  {material.type === 'notes' && <BookOpen className="w-5 h-5 text-blue-600 mr-2" />}
                  {material.type === 'practice' && <Target className="w-5 h-5 text-green-600 mr-2" />}
                  {material.type === 'video' && <Play className="w-5 h-5 text-purple-600 mr-2" />}
                  <span className="font-medium text-gray-900">{material.title}</span>
                </div>
                <Button variant="outline" size="sm">
                  <Download className="w-4 h-4" />
                </Button>
              </div>
              <div className="text-sm text-gray-600">
                {material.downloads.toLocaleString()} downloads
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quotes & Advice */}
      <div className="grid md:grid-cols-2 gap-8 mb-8">
        {/* Mentor Quote */}
        <div className="bg-blue-50 rounded-3xl p-8">
          <h3 className="text-xl font-bold text-blue-900 mb-4">From the Mentor</h3>
          <blockquote className="text-blue-800 italic mb-4">
            &ldquo;{student.mentorQuote}&rdquo;
          </blockquote>
          <div className="text-blue-700 font-medium">- Dr. Rajesh Kumar, Senior Faculty</div>
        </div>

        {/* Parent Quote */}
        <div className="bg-green-50 rounded-3xl p-8">
          <h3 className="text-xl font-bold text-green-900 mb-4">Parent&apos;s Perspective</h3>
          <blockquote className="text-green-800 italic mb-4">
            &ldquo;{student.parentQuote}&rdquo;
          </blockquote>
          <div className="text-green-700 font-medium">- {student.name}&apos;s Parent</div>
        </div>
      </div>

      {/* Student's Advice */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl text-white p-8">
        <h3 className="text-2xl font-bold mb-6">{student.name}&apos;s Advice for Future NEET Aspirants</h3>
        <div className="grid md:grid-cols-2 gap-6">
          {student.advice.map((advice, index) => (
            <div key={index} className="flex items-start">
              <div className="bg-white/20 rounded-full p-2 mr-4 flex-shrink-0">
                <CheckCircle className="w-5 h-5" />
              </div>
              <p className="text-purple-100">{advice}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}