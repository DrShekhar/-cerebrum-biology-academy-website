'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import {
  BookOpen,
  Target,
  Clock,
  Users,
  Award,
  TrendingUp,
  CheckCircle,
  ArrowRight,
  Star,
  BarChart3,
} from 'lucide-react'
import { motion } from 'framer-motion'

interface ClassOption {
  id: 'class-11' | 'class-12' | 'dropper'
  title: string
  subtitle: string
  description: string
  features: string[]
  recommendedTests: number
  averageDuration: string
  successRate: string
  difficulty: string
  color: string
  bgGradient: string
  icon: any
  popular?: boolean
}

interface ClassSelectionProps {
  onClassSelect: (classType: 'class-11' | 'class-12' | 'dropper') => void
  selectedClass?: 'class-11' | 'class-12' | 'dropper' | null
}

export function ClassSelection({ onClassSelect, selectedClass }: ClassSelectionProps) {
  const [hoveredClass, setHoveredClass] = useState<string | null>(null)

  const classOptions: ClassOption[] = [
    {
      id: 'class-11',
      title: 'Class 11 Foundation',
      subtitle: 'Building Strong Basics',
      description: 'Perfect for Class 11 students starting their NEET journey. Focus on foundation building with conceptual clarity.',
      features: [
        'NCERT-based questions',
        'Concept building approach',
        'Gradual difficulty progression',
        'Visual learning aids',
        'Extra time allocation'
      ],
      recommendedTests: 12,
      averageDuration: '30 min',
      successRate: '78%',
      difficulty: 'Beginner to Intermediate',
      color: 'text-green-600',
      bgGradient: 'from-green-50 to-green-50',
      icon: BookOpen,
      popular: false
    },
    {
      id: 'class-12',
      title: 'Class 12 Intensive',
      subtitle: 'Exam Preparation Mode',
      description: 'Comprehensive preparation for Class 12 students appearing for NEET 2024. Advanced concepts with exam strategies.',
      features: [
        'NEET-pattern questions',
        'Advanced problem solving',
        'Time management skills',
        'Previous year analysis',
        'Rank prediction'
      ],
      recommendedTests: 20,
      averageDuration: '45 min',
      successRate: '85%',
      difficulty: 'Intermediate to Advanced',
      color: 'text-blue-600',
      bgGradient: 'bg-gray-50',
      icon: Target,
      popular: true
    },
    {
      id: 'dropper',
      title: 'Dropper Batch',
      subtitle: 'Second Attempt Success',
      description: 'Specialized for students taking a gap year. Intensive revision with focus on weak areas and exam temperament.',
      features: [
        'Complete syllabus revision',
        'Weak area identification',
        'Intensive practice sessions',
        'Motivation & counseling',
        'Success guarantee'
      ],
      recommendedTests: 25,
      averageDuration: '60 min',
      successRate: '92%',
      difficulty: 'All Levels Adaptive',
      color: 'text-purple-600',
      bgGradient: 'from-purple-50 to-violet-50',
      icon: Award,
      popular: false
    }
  ]

  const benefits = [
    {
      icon: BarChart3,
      title: 'Personalized Analytics',
      description: 'Get class-specific performance insights and improvement suggestions'
    },
    {
      icon: Clock,
      title: 'Adaptive Timing',
      description: 'Test duration adjusts based on your class and preparation level'
    },
    {
      icon: TrendingUp,
      title: 'Progressive Difficulty',
      description: 'Questions become harder as you improve, ensuring optimal challenge'
    },
    {
      icon: Users,
      title: 'Peer Comparison',
      description: 'Compare your performance with students from the same class nationwide'
    }
  ]

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      {/* Header */}
      <div className="text-center mb-16">
        <motion.h2 
          className="text-4xl font-bold text-gray-900 mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Choose Your Learning Path
        </motion.h2>
        <motion.p 
          className="text-xl text-gray-600 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          We customize test difficulty, question selection, and analytics based on your current class. 
          This ensures optimal learning experience and better results.
        </motion.p>
      </div>

      {/* Class Options */}
      <div className="grid lg:grid-cols-3 gap-8 mb-16">
        {classOptions.map((option, index) => (
          <motion.div
            key={option.id}
            className={`relative cursor-pointer transition-all duration-300 ${
              selectedClass === option.id 
                ? 'ring-4 ring-blue-500 scale-105' 
                : hoveredClass === option.id 
                ? 'scale-105 shadow-xl' 
                : 'hover:shadow-lg'
            }`}
            onMouseEnter={() => setHoveredClass(option.id)}
            onMouseLeave={() => setHoveredClass(null)}
            onClick={() => onClassSelect(option.id)}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ y: -5 }}
          >
            {option.popular && (
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                <span className="bg-blue-500 text-white px-4 py-2 rounded-full text-sm font-semibold flex items-center">
                  <Star className="w-4 h-4 mr-1" />
                  Most Popular
                </span>
              </div>
            )}

            <div className={`bg-gradient-to-br ${option.bgGradient} rounded-3xl p-8 h-full border-2 ${
              selectedClass === option.id ? 'border-blue-500' : 'border-transparent'
            }`}>
              {/* Header */}
              <div className="text-center mb-6">
                <div className={`w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg`}>
                  <option.icon className={`w-8 h-8 ${option.color}`} />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{option.title}</h3>
                <p className={`font-medium ${option.color}`}>{option.subtitle}</p>
              </div>

              {/* Description */}
              <p className="text-gray-700 mb-6 text-center">{option.description}</p>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">{option.recommendedTests}</div>
                  <div className="text-sm text-gray-600">Recommended Tests</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">{option.averageDuration}</div>
                  <div className="text-sm text-gray-600">Average Duration</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">{option.successRate}</div>
                  <div className="text-sm text-gray-600">Success Rate</div>
                </div>
                <div className="text-center">
                  <div className="text-sm font-semibold text-gray-900">{option.difficulty}</div>
                  <div className="text-sm text-gray-600">Difficulty Level</div>
                </div>
              </div>

              {/* Features */}
              <div className="space-y-3 mb-8">
                {option.features.map((feature, idx) => (
                  <div key={idx} className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-600 mr-3 flex-shrink-0" />
                    <span className="text-gray-700 text-sm">{feature}</span>
                  </div>
                ))}
              </div>

              {/* Select Button */}
              <Button 
                variant={selectedClass === option.id ? "primary" : "outline"}
                className="w-full"
              >
                {selectedClass === option.id ? (
                  <>
                    <CheckCircle className="w-5 h-5 mr-2" />
                    Selected
                  </>
                ) : (
                  <>
                    Select This Path
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </>
                )}
              </Button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Benefits Section */}
      <motion.div
        className="bg-white rounded-3xl shadow-lg p-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
          Why Class-Based Learning Works Better
        </h3>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
            >
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <benefit.icon className="w-6 h-6 text-blue-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">{benefit.title}</h4>
              <p className="text-gray-600 text-sm">{benefit.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Continue Button */}
      {selectedClass && (
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Button 
            variant="primary" 
            size="xl"
            onClick={() => {
              // This would typically navigate to the test selection page
              console.log('Continuing with class:', selectedClass)
            }}
          >
            Continue with {classOptions.find(opt => opt.id === selectedClass)?.title}
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
          <p className="text-gray-600 mt-4">
            You can change this selection anytime from your profile settings
          </p>
        </motion.div>
      )}
    </div>
  )
}