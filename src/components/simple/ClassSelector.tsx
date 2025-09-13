'use client'

import { useState, useEffect } from 'react'

export type ClassType = 'class-11' | 'class-12' | 'dropper'

interface ClassSelectorProps {
  onClassSelect: (classType: ClassType) => void
  selectedClass?: ClassType | null
  showTitle?: boolean
}

export function ClassSelector({ onClassSelect, selectedClass, showTitle = true }: ClassSelectorProps) {
  const [selected, setSelected] = useState<ClassType | null>(selectedClass || null)

  useEffect(() => {
    // Load from localStorage if available
    const stored = localStorage.getItem('selectedClass') as ClassType | null
    if (stored && !selectedClass) {
      setSelected(stored)
    }
  }, [selectedClass])

  const handleSelect = (classType: ClassType) => {
    setSelected(classType)
    localStorage.setItem('selectedClass', classType)
    onClassSelect(classType)
  }

  const classOptions = [
    {
      id: 'class-11',
      title: 'Class 11',
      description: 'Foundation concepts and NCERT syllabus',
      icon: '📚',
      color: 'blue',
      stats: 'Perfect for beginners'
    },
    {
      id: 'class-12', 
      title: 'Class 12',
      description: 'Advanced topics and NEET preparation',
      icon: '🎯',
      color: 'green',
      stats: 'NEET focused approach'
    },
    {
      id: 'dropper',
      title: 'Dropper',
      description: 'Intensive revision and practice',
      icon: '🚀',
      color: 'purple', 
      stats: 'Complete preparation'
    }
  ]

  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      {showTitle && (
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Choose Your Class</h2>
          <p className="text-gray-600">Select your current class to get personalized tests and difficulty levels</p>
        </div>
      )}

      <div className="grid md:grid-cols-3 gap-6">
        {classOptions.map((option) => (
          <div
            key={option.id}
            onClick={() => handleSelect(option.id as ClassType)}
            className={`relative p-6 rounded-3xl border-2 cursor-pointer transition-all duration-300 hover:shadow-lg ${
              selected === option.id
                ? option.color === 'blue' ? 'border-blue-500 bg-blue-50' :
                  option.color === 'green' ? 'border-green-500 bg-green-50' :
                  'border-purple-500 bg-purple-50'
                : 'border-gray-200 bg-white hover:border-gray-300'
            }`}
          >
            {/* Selection indicator */}
            {selected === option.id && (
              <div className={`absolute top-4 right-4 w-6 h-6 rounded-full flex items-center justify-center ${
                option.color === 'blue' ? 'bg-blue-500' :
                option.color === 'green' ? 'bg-green-500' :
                'bg-purple-500'
              }`}>
                <span className="text-white text-sm">✓</span>
              </div>
            )}

            {/* Icon */}
            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-4 mx-auto ${
              selected === option.id
                ? option.color === 'blue' ? 'bg-blue-100' :
                  option.color === 'green' ? 'bg-green-100' :
                  'bg-purple-100'
                : 'bg-gray-100'
            }`}>
              <span className="text-2xl">{option.icon}</span>
            </div>

            {/* Content */}
            <div className="text-center">
              <h3 className="text-xl font-bold text-gray-900 mb-2">{option.title}</h3>
              <p className="text-gray-600 mb-3 text-sm">{option.description}</p>
              <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                selected === option.id
                  ? option.color === 'blue' ? 'bg-blue-100 text-blue-800' :
                    option.color === 'green' ? 'bg-green-100 text-green-800' :
                    'bg-purple-100 text-purple-800'
                  : 'bg-gray-100 text-gray-600'
              }`}>
                {option.stats}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Continue button */}
      {selected && (
        <div className="text-center mt-8">
          <div className="inline-flex items-center space-x-2 text-sm text-gray-600">
            <span>Selected:</span>
            <span className="font-semibold">
              {classOptions.find(opt => opt.id === selected)?.title}
            </span>
            <span className="text-green-600">✓</span>
          </div>
        </div>
      )}
    </div>
  )
}