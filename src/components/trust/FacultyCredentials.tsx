'use client'

import React, { useState } from 'react'
import {
  Award,
  BookOpen,
  Users,
  CheckCircle,
  Star,
  GraduationCap,
  Stethoscope,
  Trophy,
  Target,
  Clock,
} from 'lucide-react'
import { useTranslations } from '@/lib/i18n/translations'
import { OptimizedImage } from '@/components/mobile/OptimizedImage'

interface FacultyMember {
  id: string
  name: string
  title: string
  specialization: string[]
  qualification: string[]
  experience: number
  aimsRank?: number
  currentPosition: string
  teachingExperience: number
  studentsGuidedToAIIMS: number
  averageStudentImprovement: number
  photoUrl: string
  achievements: string[]
  verified: boolean
  languages: string[]
  expertise: string[]
  researchPapers?: number
  awards: string[]
  previousInstitutions: string[]
}

const facultyData: FacultyMember[] = [
  {
    id: '1',
    name: 'Dr. Rajesh Kumar',
    title: 'Head of Biology Department',
    specialization: ['Cell Biology', 'Genetics', 'Evolution'],
    qualification: ['MBBS - AIIMS Delhi', 'MD - Internal Medicine', 'PhD - Cell Biology'],
    experience: 15,
    aimsRank: 45,
    currentPosition: 'Senior Consultant, AIIMS Delhi',
    teachingExperience: 12,
    studentsGuidedToAIIMS: 234,
    averageStudentImprovement: 68,
    photoUrl: '/faculty/dr-rajesh-kumar.jpg',
    achievements: [
      'Guided 500+ students to medical colleges',
      'Published 25+ research papers',
      'NEET Biology syllabus expert',
      'Former AIIMS faculty member',
    ],
    verified: true,
    languages: ['Hindi', 'English'],
    expertise: ['NEET Biology', 'Medical Entrance Coaching', 'Genetics Simplified'],
    researchPapers: 25,
    awards: ['Best Teacher Award 2023', 'Excellence in Medical Education'],
    previousInstitutions: ['AIIMS Delhi', 'Maulana Azad Medical College'],
  },
  {
    id: '2',
    name: 'Dr. Priya Sharma',
    title: 'Senior Biology Faculty',
    specialization: ['Plant Biology', 'Ecology', 'Biotechnology'],
    qualification: ['MBBS - MAMC Delhi', 'MD - Pathology', 'MSc - Biotechnology'],
    experience: 12,
    aimsRank: 67,
    currentPosition: 'Associate Professor, MAMC',
    teachingExperience: 10,
    studentsGuidedToAIIMS: 189,
    averageStudentImprovement: 72,
    photoUrl: '/faculty/dr-priya-sharma.jpg',
    achievements: [
      'Expert in Plant Biology and Ecology',
      'Simplified Biotechnology for NEET students',
      'Authored Biology preparation books',
      '95% student success rate',
    ],
    verified: true,
    languages: ['Hindi', 'English'],
    expertise: ['Plant Biology', 'Biotechnology', 'Ecology Concepts'],
    researchPapers: 18,
    awards: ['Outstanding Faculty Award', 'Student Choice Award 2023'],
    previousInstitutions: ['MAMC Delhi', 'University of Delhi'],
  },
  {
    id: '3',
    name: 'Dr. Vikram Singh',
    title: 'Human Physiology Expert',
    specialization: ['Human Physiology', 'Anatomy', 'Biochemistry'],
    qualification: ['MBBS - AIIMS Jodhpur', 'MS - General Surgery', 'Fellowship - Cardiology'],
    experience: 10,
    aimsRank: 23,
    currentPosition: 'Senior Resident, AIIMS Jodhpur',
    teachingExperience: 8,
    studentsGuidedToAIIMS: 156,
    averageStudentImprovement: 65,
    photoUrl: '/faculty/dr-vikram-singh.jpg',
    achievements: [
      'Specialized in Human Physiology teaching',
      'Simplified complex medical concepts',
      'Student mentor for 8+ years',
      'High-yield topic expert',
    ],
    verified: true,
    languages: ['Hindi', 'English'],
    expertise: ['Human Physiology', 'Anatomy', 'Medical Concepts Simplification'],
    researchPapers: 12,
    awards: ['Young Faculty Excellence Award'],
    previousInstitutions: ['AIIMS Jodhpur', 'SMS Medical College'],
  },
]

export function FacultyCredentials() {
  const [selectedFaculty, setSelectedFaculty] = useState<FacultyMember | null>(null)
  const [filter, setFilter] = useState<'all' | 'aiims' | 'senior'>('all')
  const { language } = useTranslations()

  const filteredFaculty = facultyData.filter((faculty) => {
    if (filter === 'aiims') return faculty.qualification.some((q) => q.includes('AIIMS'))
    if (filter === 'senior') return faculty.experience >= 12
    return true
  })

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <h2
            className="text-3xl font-bold text-gray-900 mb-4 animate-fadeInUp"
          >
            {language === 'hi' ? 'हमारे विशेषज्ञ संकाय' : 'Our Expert Faculty'}
          </h2>
          <p
            className="text-xl text-gray-600 mb-8 animate-fadeInUp"
          >
            {language === 'hi'
              ? 'AIIMS डॉक्टरों और अनुभवी शिक्षकों से सीखें'
              : 'Learn from AIIMS doctors and experienced educators'}
          </p>

          {/* Filters */}
          <div className="flex justify-center space-x-4 mb-8">
            {[
              { key: 'all', label: language === 'hi' ? 'सभी संकाय' : 'All Faculty' },
              { key: 'aiims', label: language === 'hi' ? 'AIIMS संकाय' : 'AIIMS Faculty' },
              { key: 'senior', label: language === 'hi' ? 'सीनियर संकाय' : 'Senior Faculty' },
            ].map((filterOption) => (
              <button
                key={filterOption.key}
                onClick={() => setFilter(filterOption.key as any)}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
                  filter === filterOption.key
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {filterOption.label}
              </button>
            ))}
          </div>
        </div>

        {/* Faculty Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {filteredFaculty.map((faculty, index) => (
            <div
              key={faculty.id}
              className="bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-xl transition-shadow cursor-pointer animate-fadeInUp"
              onClick={() => setSelectedFaculty(faculty)}
            >
              {/* Faculty Photo */}
              <div className="relative mb-4">
                <OptimizedImage
                  src={faculty.photoUrl}
                  alt={faculty.name}
                  width={120}
                  height={120}
                  className="w-24 h-24 rounded-full mx-auto object-cover"
                />
                {faculty.verified && (
                  <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2">
                    <div className="bg-blue-500 text-white rounded-full p-1">
                      <CheckCircle className="w-4 h-4" />
                    </div>
                  </div>
                )}
              </div>

              {/* Faculty Info */}
              <div className="text-center mb-4">
                <h3 className="text-xl font-bold text-gray-900 mb-1">{faculty.name}</h3>
                <p className="text-blue-600 font-medium mb-2">{faculty.title}</p>
                <p className="text-sm text-gray-600">{faculty.currentPosition}</p>
              </div>

              {/* Key Stats */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">{faculty.experience}</div>
                  <div className="text-xs text-gray-600">
                    {language === 'hi' ? 'वर्ष अनुभव' : 'Years Exp.'}
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">
                    {faculty.studentsGuidedToAIIMS}
                  </div>
                  <div className="text-xs text-gray-600">
                    {language === 'hi' ? 'AIIMS में गाइड' : 'Guided to AIIMS'}
                  </div>
                </div>
              </div>

              {/* Specializations */}
              <div className="mb-4">
                <div className="flex flex-wrap gap-1">
                  {faculty.specialization.slice(0, 2).map((spec) => (
                    <span
                      key={spec}
                      className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                    >
                      {spec}
                    </span>
                  ))}
                  {faculty.specialization.length > 2 && (
                    <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                      +{faculty.specialization.length - 2} more
                    </span>
                  )}
                </div>
              </div>

              {/* View Profile Button */}
              <button className="w-full bg-blue-50 text-blue-600 py-2 rounded-lg hover:bg-blue-100 transition-colors text-sm font-medium">
                {language === 'hi' ? 'प्रोफाइल देखें' : 'View Profile'}
              </button>
            </div>
          ))}
        </div>

        {/* Faculty Stats Summary */}
        <FacultyStatsSection />
      </div>

      {/* Faculty Detail Modal */}
{selectedFaculty && (
          <FacultyDetailModal faculty={selectedFaculty} onClose={() => setSelectedFaculty(null)} />
        )}
</section>
  )
}

function FacultyDetailModal({ faculty, onClose }: { faculty: FacultyMember; onClose: () => void }) {
  const { language } = useTranslations()

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 animate-fadeInUp"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto animate-fadeInUp"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="relative bg-indigo-500 text-white p-8 rounded-t-2xl">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white hover:text-gray-200"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          <div className="flex items-center space-x-6">
            <div className="relative">
              <OptimizedImage
                src={faculty.photoUrl}
                alt={faculty.name}
                width={120}
                height={120}
                className="w-24 h-24 rounded-full object-cover border-4 border-white"
              />
              {faculty.verified && (
                <div className="absolute -bottom-1 -right-1 bg-green-600 text-white rounded-full p-1">
                  <CheckCircle className="w-5 h-5" />
                </div>
              )}
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-2">{faculty.name}</h2>
              <p className="text-blue-100 text-lg mb-2">{faculty.title}</p>
              <p className="text-blue-200">{faculty.currentPosition}</p>

              {faculty.aimsRank && (
                <div className="mt-2 bg-yellow-500 text-yellow-900 px-3 py-1 rounded-full text-sm font-medium inline-block">
                  AIIMS Rank: {faculty.aimsRank}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="p-8">
          {/* Key Statistics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
            <div className="text-center bg-green-50 rounded-xl p-4">
              <Clock className="w-6 h-6 text-green-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-green-800">{faculty.experience}</div>
              <div className="text-sm text-green-600">
                {language === 'hi' ? 'वर्ष अनुभव' : 'Years Experience'}
              </div>
            </div>
            <div className="text-center bg-blue-50 rounded-xl p-4">
              <Users className="w-6 h-6 text-blue-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-blue-800">
                {faculty.studentsGuidedToAIIMS}
              </div>
              <div className="text-sm text-blue-600">
                {language === 'hi' ? 'AIIMS में गाइड' : 'Guided to AIIMS'}
              </div>
            </div>
            <div className="text-center bg-purple-50 rounded-xl p-4">
              <Target className="w-6 h-6 text-purple-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-purple-800">
                +{faculty.averageStudentImprovement}
              </div>
              <div className="text-sm text-purple-600">
                {language === 'hi' ? 'औसत सुधार' : 'Avg. Improvement'}
              </div>
            </div>
            <div className="text-center bg-yellow-50 rounded-xl p-4">
              <BookOpen className="w-6 h-6 text-yellow-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-yellow-800">
                {faculty.researchPapers || 0}
              </div>
              <div className="text-sm text-yellow-600">
                {language === 'hi' ? 'रिसर्च पेपर' : 'Research Papers'}
              </div>
            </div>
          </div>

          {/* Qualifications */}
          <div className="mb-6">
            <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center">
              <GraduationCap className="w-5 h-5 mr-2" />
              {language === 'hi' ? 'योग्यता' : 'Qualifications'}
            </h3>
            <div className="space-y-2">
              {faculty.qualification.map((qual, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span className="text-gray-700">{qual}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Specializations */}
          <div className="mb-6">
            <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center">
              <Stethoscope className="w-5 h-5 mr-2" />
              {language === 'hi' ? 'विशेषज्ञता' : 'Specializations'}
            </h3>
            <div className="flex flex-wrap gap-2">
              {faculty.specialization.map((spec) => (
                <span
                  key={spec}
                  className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium"
                >
                  {spec}
                </span>
              ))}
            </div>
          </div>

          {/* Achievements */}
          <div className="mb-6">
            <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center">
              <Trophy className="w-5 h-5 mr-2" />
              {language === 'hi' ? 'उपलब्धियां' : 'Achievements'}
            </h3>
            <div className="space-y-2">
              {faculty.achievements.map((achievement, index) => (
                <div key={index} className="flex items-start space-x-2">
                  <Star className="w-4 h-4 text-yellow-500 mt-0.5" />
                  <span className="text-gray-700">{achievement}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Awards */}
          {faculty.awards.length > 0 && (
            <div className="mb-6">
              <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center">
                <Award className="w-5 h-5 mr-2" />
                {language === 'hi' ? 'पुरस्कार' : 'Awards'}
              </h3>
              <div className="space-y-2">
                {faculty.awards.map((award, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <Award className="w-4 h-4 text-purple-500" />
                    <span className="text-gray-700">{award}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Teaching Expertise */}
          <div className="mb-6">
            <h3 className="text-lg font-bold text-gray-900 mb-3">
              {language === 'hi' ? 'शिक्षण विशेषज्ञता' : 'Teaching Expertise'}
            </h3>
            <div className="flex flex-wrap gap-2">
              {faculty.expertise.map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Languages */}
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-3">
              {language === 'hi' ? 'भाषाएं' : 'Languages'}
            </h3>
            <div className="flex flex-wrap gap-2">
              {faculty.languages.map((lang) => (
                <span
                  key={lang}
                  className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm"
                >
                  {lang}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function FacultyStatsSection() {
  const { language } = useTranslations()

  const stats = [
    {
      value: '100%',
      label: language === 'hi' ? 'AIIMS/MAMC योग्य' : 'AIIMS/MAMC Qualified',
      icon: Award,
      color: 'text-yellow-600',
    },
    {
      value: '12+',
      label: language === 'hi' ? 'औसत अनुभव' : 'Average Experience',
      icon: Clock,
      color: 'text-blue-600',
    },
    {
      value: '579',
      label: language === 'hi' ? 'AIIMS में गाइड' : 'Guided to AIIMS',
      icon: Users,
      color: 'text-green-600',
    },
    {
      value: '95%',
      label: language === 'hi' ? 'छात्र संतुष्टि' : 'Student Satisfaction',
      icon: Star,
      color: 'text-purple-600',
    },
  ]

  return (
    <div className="bg-gray-50 rounded-2xl p-8">
      <h3 className="text-xl font-bold text-gray-900 text-center mb-8">
        {language === 'hi' ? 'संकाय आंकड़े' : 'Faculty Statistics'}
      </h3>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div
            key={stat.label}
            className="text-center animate-fadeInUp"
          >
            <stat.icon className={`w-8 h-8 ${stat.color} mx-auto mb-2`} />
            <div className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
            <div className="text-sm text-gray-600">{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
