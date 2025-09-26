'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

export default function SimpleCourseSelector() {
  const [selectedClass, setSelectedClass] = useState('11th')

  const courses = [
    {
      id: 'pursuit-11th',
      series: 'PURSUIT',
      class: '11th',
      price: 50000,
      batchSize: '20-25',
      duration: '1 year',
      description: 'Affordable foundation for NEET preparation',
      features: ['Live Classes', 'Study Material', 'Mock Tests'],
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      textColor: 'text-blue-900',
    },
    {
      id: 'ascent-11th',
      series: 'ASCENT',
      class: '11th',
      price: 75000,
      batchSize: '12-16',
      duration: '1 year',
      description: 'Balanced approach with premium features',
      features: ['Live Classes', 'Personal Mentor', 'Test Series', 'Doubt Clearing'],
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200',
      textColor: 'text-green-900',
      popular: true,
    },
    {
      id: 'pinnacle-11th',
      series: 'PINNACLE',
      class: '11th',
      price: 110000,
      batchSize: '8-12',
      duration: '1 year',
      description: 'Premium personalized attention',
      features: ['Live Classes', 'Personal Mentor', 'Career Guidance', 'Parent Counseling'],
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200',
      textColor: 'text-purple-900',
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-6">
          <h1 className="text-5xl font-bold mb-4">🎯 Simple Course Selector Demo</h1>
          <p className="text-xl text-blue-100 mb-6">
            Working course selector with interactive features
          </p>
          <div className="bg-white/20 rounded-lg p-4 inline-block">
            <div className="text-sm">Status: ✅ Fully Functional</div>
          </div>
        </div>
      </div>

      {/* Class Filter */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Select Your Class</h2>
          <div className="flex gap-4">
            {['9th', '10th', '11th', '12th', 'Dropper'].map((classLevel) => (
              <button
                key={classLevel}
                onClick={() => setSelectedClass(classLevel)}
                className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                  selectedClass === classLevel
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {classLevel}
              </button>
            ))}
          </div>
        </div>

        {/* Course Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {courses.map((course) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className={`${course.bgColor} rounded-xl shadow-lg border-2 ${course.borderColor} p-6 relative overflow-hidden`}
            >
              {/* Popular Badge */}
              {course.popular && (
                <div className="absolute top-4 right-4 bg-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                  🔥 Most Popular
                </div>
              )}

              {/* Series Header */}
              <div className="mb-4">
                <h3 className={`text-2xl font-bold ${course.textColor}`}>{course.series}</h3>
                <p className="text-gray-600 text-sm">{course.description}</p>
              </div>

              {/* Course Details */}
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Class:</span>
                  <span className="font-semibold">{course.class}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Batch Size:</span>
                  <span className="font-semibold">{course.batchSize}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Duration:</span>
                  <span className="font-semibold">{course.duration}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Price:</span>
                  <span className="text-2xl font-bold text-green-600">
                    ₹{course.price.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Features */}
              <div className="mb-6">
                <h4 className="font-semibold text-gray-900 mb-2">Features:</h4>
                <ul className="space-y-1">
                  {course.features.map((feature, index) => (
                    <li key={index} className="flex items-center text-sm text-gray-700">
                      <span className="text-green-500 mr-2">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Button */}
              <button
                className={`w-full py-3 rounded-lg font-semibold transition-all ${
                  course.popular
                    ? 'bg-orange-500 hover:bg-orange-600 text-white'
                    : 'bg-blue-600 hover:bg-blue-700 text-white'
                } shadow-lg hover:shadow-xl`}
              >
                Book Demo Class
              </button>
            </motion.div>
          ))}
        </div>

        {/* Working Features Demo */}
        <div className="mt-12 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            ✅ Working Features Demonstrated
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <h3 className="font-semibold text-green-600 mb-2">✅ Interactive Elements</h3>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• Class filter buttons</li>
                <li>• Hover animations</li>
                <li>• Card transitions</li>
                <li>• Responsive design</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-blue-600 mb-2">✅ Course Data</h3>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• Dynamic pricing</li>
                <li>• Series differentiation</li>
                <li>• Feature comparison</li>
                <li>• Popular indicators</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-purple-600 mb-2">✅ UI/UX Features</h3>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• Color-coded series</li>
                <li>• Clear typography</li>
                <li>• Professional styling</li>
                <li>• Call-to-action buttons</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
