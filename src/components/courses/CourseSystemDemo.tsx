'use client'

import { useState } from 'react'
import { ClassFilterNav } from './ClassFilterNav'
import { CourseCard } from './CourseCard'
import { TierComparison } from './TierComparison'
import { PaymentOptionsDisplay } from './PaymentOptionsDisplay'
import { coursePrograms } from '@/data/courseSystemData'
import { ClassLevel, CourseSeries } from '@/types/courseSystem'
import { getCoursesByClass } from '@/utils/courseUtils'
import { Button } from '@/components/ui/Button'
import { motion } from 'framer-motion'
import { 
  BookOpen, 
  CreditCard, 
  Grid3x3, 
  BarChart3,
  ChevronDown,
  CheckCircle,
} from 'lucide-react'

export function CourseSystemDemo() {
  const [selectedClass, setSelectedClass] = useState<ClassLevel | 'all'>('11th')
  const [selectedTier, setSelectedTier] = useState<CourseSeries>('ascent')
  const [activeComponent, setActiveComponent] = useState<'filter' | 'cards' | 'comparison' | 'payment'>('filter')

  const filteredCourses = selectedClass === 'all' 
    ? coursePrograms 
    : getCoursesByClass(selectedClass)

  const sampleCourse = coursePrograms[2] // Class 11th course

  const components = [
    {
      id: 'filter',
      name: 'Class Filter Navigation',
      description: 'Interactive class-wise filtering with course counts',
      icon: BarChart3,
      color: 'from-blue-500 to-blue-600',
    },
    {
      id: 'cards',
      name: 'Course Cards',
      description: 'Tier-based course cards with pricing and features',
      icon: Grid3x3,
      color: 'from-green-500 to-green-600',
    },
    {
      id: 'comparison',
      name: 'Tier Comparison',
      description: 'Side-by-side feature and pricing comparison',
      icon: BookOpen,
      color: 'from-purple-500 to-purple-600',
    },
    {
      id: 'payment',
      name: 'Payment Options',
      description: 'Flexible payment plans with discount calculations',
      icon: CreditCard,
      color: 'from-orange-500 to-orange-600',
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium mb-6">
              <BookOpen className="w-4 h-4 mr-2" />
              Course System Components Demo
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Interactive Course System
            </h1>
            <p className="text-xl opacity-90 max-w-3xl mx-auto">
              Comprehensive class-wise course navigation with 3-tier pricing system
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Component Navigation */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Explore Components
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {components.map((component) => {
              const Icon = component.icon
              const isActive = activeComponent === component.id
              
              return (
                <motion.button
                  key={component.id}
                  onClick={() => setActiveComponent(component.id as any)}
                  className={`
                    p-6 rounded-2xl border-2 transition-all duration-300 text-left
                    ${isActive 
                      ? 'border-blue-500 bg-blue-50 shadow-lg scale-105' 
                      : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-md'
                    }
                  `}
                  whileHover={!isActive ? { y: -2 } : {}}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className={`
                    w-12 h-12 rounded-xl mb-4 flex items-center justify-center
                    ${isActive 
                      ? `bg-gradient-to-r ${component.color} text-white` 
                      : 'bg-gray-100 text-gray-600'
                    }
                  `}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className={`font-bold mb-2 ${isActive ? 'text-blue-900' : 'text-gray-900'}`}>
                    {component.name}
                  </h3>
                  <p className={`text-sm ${isActive ? 'text-blue-700' : 'text-gray-600'}`}>
                    {component.description}
                  </p>
                  {isActive && (
                    <div className="mt-3 flex items-center text-blue-600 text-sm font-medium">
                      <CheckCircle className="w-4 h-4 mr-1" />
                      Active
                    </div>
                  )}
                </motion.button>
              )
            })}
          </div>
        </div>

        {/* Component Display */}
        <motion.div
          key={activeComponent}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-3xl shadow-xl overflow-hidden"
        >
          {/* Component Header */}
          <div className={`
            px-8 py-6 bg-gradient-to-r text-white
            ${components.find(c => c.id === activeComponent)?.color || 'from-gray-500 to-gray-600'}
          `}>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-bold mb-2">
                  {components.find(c => c.id === activeComponent)?.name}
                </h3>
                <p className="opacity-90">
                  {components.find(c => c.id === activeComponent)?.description}
                </p>
              </div>
              <div className="text-right">
                <div className="text-sm opacity-80">Status</div>
                <div className="font-bold">Interactive</div>
              </div>
            </div>
          </div>

          {/* Component Content */}
          <div className="p-8">
            {activeComponent === 'filter' && (
              <ClassFilterNav
                selectedClass={selectedClass}
                onClassSelect={setSelectedClass}
              />
            )}

            {activeComponent === 'cards' && (
              <div className="space-y-8">
                <div className="text-center mb-8">
                  <p className="text-gray-600">
                    Interactive course cards showing tier selection and pricing
                  </p>
                </div>
                <div className="grid lg:grid-cols-2 gap-8">
                  {filteredCourses.slice(0, 2).map((course) => (
                    <CourseCard
                      key={course.id}
                      course={course}
                      selectedTier={selectedTier}
                      onTierChange={setSelectedTier}
                      onEnroll={(courseId, tier) => 
                        alert(`Enrollment demo: ${courseId} - ${tier} tier`)
                      }
                      showComparison={true}
                    />
                  ))}
                </div>
              </div>
            )}

            {activeComponent === 'comparison' && sampleCourse && (
              <TierComparison
                course={sampleCourse}
                selectedTier={selectedTier}
                onSelectTier={setSelectedTier}
              />
            )}

            {activeComponent === 'payment' && sampleCourse && (
              <PaymentOptionsDisplay
                paymentOptions={sampleCourse.tiers[selectedTier].payment}
                courseName={sampleCourse.name}
                onSelectPaymentPlan={(plan) => 
                  alert(`Payment plan selected: ${plan}`)
                }
              />
            )}
          </div>
        </motion.div>

        {/* Features Summary */}
        <div className="mt-16 grid md:grid-cols-3 gap-8">
          <div className="text-center p-6">
            <div className="w-16 h-16 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center">
              <BarChart3 className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="font-bold text-gray-900 mb-2">Class-wise Filtering</h3>
            <p className="text-gray-600 text-sm">
              Smart navigation with course counts and smooth animations
            </p>
          </div>
          <div className="text-center p-6">
            <div className="w-16 h-16 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
              <Grid3x3 className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="font-bold text-gray-900 mb-2">3-Tier System</h3>
            <p className="text-gray-600 text-sm">
              Pinnacle, Ascent, and Pursuit tiers with transparent pricing
            </p>
          </div>
          <div className="text-center p-6">
            <div className="w-16 h-16 mx-auto mb-4 bg-purple-100 rounded-full flex items-center justify-center">
              <CreditCard className="w-8 h-8 text-purple-600" />
            </div>
            <h3 className="font-bold text-gray-900 mb-2">Flexible Payments</h3>
            <p className="text-gray-600 text-sm">
              One-time discounts and installment plans for every budget
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}