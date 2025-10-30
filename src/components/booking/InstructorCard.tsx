'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { Star, Award, Users, BookOpen } from 'lucide-react'

export interface InstructorProfile {
  name: string
  fullName: string
  qualification: string
  experience: string
  rating: number
  reviews: number
  specialization: string[]
  photo: string
}

export const instructors: Record<string, InstructorProfile> = {
  'Dr. Priya': {
    name: 'Dr. Priya',
    fullName: 'Dr. Priya Sharma',
    qualification: 'MBBS, MD (AIIMS Delhi)',
    experience: '8+ years teaching NEET Biology',
    rating: 4.9,
    reviews: 234,
    specialization: ['Human Physiology', 'Genetics', 'Cell Biology'],
    photo: '/instructors/dr-priya.jpg',
  },
  'Dr. Rahul': {
    name: 'Dr. Rahul',
    fullName: 'Dr. Rahul Verma',
    qualification: 'MBBS (AIIMS), MD',
    experience: '10+ years NEET coaching',
    rating: 4.9,
    reviews: 312,
    specialization: ['Plant Biology', 'Ecology', 'Evolution'],
    photo: '/instructors/dr-rahul.jpg',
  },
  'Dr. Kavya': {
    name: 'Dr. Kavya',
    fullName: 'Dr. Kavya Nair',
    qualification: 'MBBS, MS (Surgery)',
    experience: '7+ years teaching experience',
    rating: 4.8,
    reviews: 189,
    specialization: ['Human Anatomy', 'Reproduction', 'Biotechnology'],
    photo: '/instructors/dr-kavya.jpg',
  },
  'Dr. Ankit': {
    name: 'Dr. Ankit',
    fullName: 'Dr. Ankit Gupta',
    qualification: 'MBBS (JIPMER), PhD',
    experience: '9+ years NEET Biology expert',
    rating: 4.9,
    reviews: 267,
    specialization: ['Molecular Biology', 'Genetics', 'Immunology'],
    photo: '/instructors/dr-ankit.jpg',
  },
}

interface InstructorCardProps {
  instructorName: string
  isVisible: boolean
}

export function InstructorCard({ instructorName, isVisible }: InstructorCardProps) {
  const instructor = instructors[instructorName]

  if (!instructor) return null

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 10, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 10, scale: 0.95 }}
          transition={{ duration: 0.2 }}
          className="absolute z-50 mt-2 w-80 bg-white rounded-lg shadow-2xl border border-gray-200 p-4"
        >
          <div className="flex gap-4">
            <div className="flex-shrink-0">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-400 to-purple-400 flex items-center justify-center text-white font-bold text-xl">
                {instructor.fullName.split(' ')[1].charAt(0)}
              </div>
            </div>

            <div className="flex-1 min-w-0">
              <h4 className="font-bold text-gray-900 text-base mb-1">{instructor.fullName}</h4>
              <p className="text-xs text-gray-600 mb-2">{instructor.qualification}</p>

              <div className="flex items-center gap-1 mb-2">
                <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                <span className="text-sm font-semibold text-gray-900">{instructor.rating}</span>
                <span className="text-xs text-gray-500">({instructor.reviews} reviews)</span>
              </div>

              <div className="flex items-center gap-1 text-xs text-gray-600 mb-3">
                <Award className="w-3 h-3" />
                <span>{instructor.experience}</span>
              </div>

              <div className="mb-3">
                <div className="flex items-center gap-1 text-xs font-medium text-gray-700 mb-1">
                  <BookOpen className="w-3 h-3" />
                  <span>Specialization:</span>
                </div>
                <div className="flex flex-wrap gap-1">
                  {instructor.specialization.map((spec, index) => (
                    <span
                      key={index}
                      className="px-2 py-0.5 bg-blue-100 text-blue-800 text-xs rounded-full"
                    >
                      {spec}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-1 text-xs text-green-700 bg-green-50 px-2 py-1 rounded">
                <Users className="w-3 h-3" />
                <span>Available for one-on-one session</span>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
