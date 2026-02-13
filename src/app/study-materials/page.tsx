'use client'

import React from 'react'
import { BookOpen, Download, FileText, Video, Search, Star, Users, Zap, Eye } from 'lucide-react'
import { Button } from '@/components/ui/Button'

const studyMaterials = [
  {
    id: 'class-11-notes',
    title: 'Class 11th Biology Notes',
    description: 'Comprehensive notes covering all Class 11th Biology topics with NEET focus',
    type: 'PDF',
    size: '45 MB',
    downloads: 12450,
    rating: 4.8,
    subjects: ['Botany', 'Zoology'],
    chapters: 22,
    lastUpdated: '2024-01-15',
    difficulty: 'Foundation',
    price: 'FREE',
    thumbnail: '/images/study-materials/class-11-notes.jpg',
  },
  {
    id: 'class-12-notes',
    title: 'Class 12th Biology Notes',
    description: 'Complete Class 12th Biology notes with diagrams and important points',
    type: 'PDF',
    size: '52 MB',
    downloads: 15890,
    rating: 4.9,
    subjects: ['Botany', 'Zoology'],
    chapters: 16,
    lastUpdated: '2024-01-20',
    difficulty: 'Advanced',
    price: 'FREE',
    thumbnail: '/images/study-materials/class-12-notes.jpg',
  },
  {
    id: 'neet-previous-papers',
    title: 'NEET Previous Year Papers',
    description: 'Last 10 years NEET Biology papers with detailed solutions',
    type: 'PDF',
    size: '38 MB',
    downloads: 8950,
    rating: 4.7,
    subjects: ['Biology'],
    chapters: 10,
    lastUpdated: '2024-01-10',
    difficulty: 'Expert',
    price: 'FREE',
    thumbnail: '/images/study-materials/previous-papers.jpg',
  },
  {
    id: 'ncert-solutions',
    title: 'NCERT Biology Solutions',
    description: 'Complete NCERT solutions for Class 11th and 12th Biology',
    type: 'PDF',
    size: '28 MB',
    downloads: 18750,
    rating: 4.9,
    subjects: ['Botany', 'Zoology'],
    chapters: 38,
    lastUpdated: '2024-01-25',
    difficulty: 'Foundation',
    price: 'FREE',
    thumbnail: '/images/study-materials/ncert-solutions.jpg',
  },
  {
    id: 'diagram-bank',
    title: 'Biology Diagram Bank',
    description: 'Collection of important biology diagrams with labeling practice',
    type: 'PDF',
    size: '85 MB',
    downloads: 7650,
    rating: 4.6,
    subjects: ['Botany', 'Zoology'],
    chapters: 150,
    lastUpdated: '2024-01-12',
    difficulty: 'Intermediate',
    price: 'FREE',
    thumbnail: '/images/study-materials/diagram-bank.jpg',
  },
  {
    id: 'quick-revision',
    title: 'Quick Revision Notes',
    description: 'Last minute revision notes for NEET Biology with key points',
    type: 'PDF',
    size: '15 MB',
    downloads: 23450,
    rating: 4.8,
    subjects: ['Biology'],
    chapters: 35,
    lastUpdated: '2024-01-18',
    difficulty: 'All Levels',
    price: 'FREE',
    thumbnail: '/images/study-materials/quick-revision.jpg',
  },
]

const categories = [
  { id: 'all', name: 'All Materials', count: studyMaterials.length },
  { id: 'notes', name: 'Notes', count: 4 },
  { id: 'papers', name: 'Practice Papers', count: 2 },
  { id: 'solutions', name: 'Solutions', count: 2 },
  { id: 'diagrams', name: 'Diagrams', count: 1 },
  { id: 'revision', name: 'Revision', count: 1 },
]

export default function StudyMaterialsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-600 to-primary-800 text-white py-12 sm:py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className="text-center animate-fadeInUp"
          >
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">
              Study Materials
            </h1>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl mb-6 sm:mb-8 opacity-90 max-w-3xl mx-auto">
              Access comprehensive NEET Biology study materials, notes, practice papers, and
              resources to boost your preparation
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <Button size="lg" variant="secondary" className="w-full sm:w-auto min-h-[44px]">
                <Download className="w-5 h-5 sm:w-6 sm:h-6 mr-2 flex-shrink-0" />
                Download All Materials
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto min-h-[44px] border-white text-white hover:bg-white hover:text-primary-600"
              >
                <Video className="w-5 h-5 sm:w-6 sm:h-6 mr-2 flex-shrink-0" />
                Watch Study Guide
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-8 sm:py-10 md:py-12 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
            <div className="text-center">
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary-600 mb-1 sm:mb-2">
                500+
              </div>
              <div className="text-sm sm:text-base text-gray-600">Study Materials</div>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary-600 mb-1 sm:mb-2">
                50K+
              </div>
              <div className="text-sm sm:text-base text-gray-600">Downloads</div>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary-600 mb-1 sm:mb-2">
                100%
              </div>
              <div className="text-sm sm:text-base text-gray-600">Free Access</div>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary-600 mb-1 sm:mb-2">
                4.8★
              </div>
              <div className="text-sm sm:text-base text-gray-600">Student Rating</div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-8 sm:py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Filters and Search */}
          <div className="mb-8 sm:mb-10 md:mb-12">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 sm:gap-6 mb-6 sm:mb-8">
              <div className="flex-1 max-w-md">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 flex-shrink-0" />
                  <input
                    type="text"
                    placeholder="Search study materials..."
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent min-h-[44px] text-base"
                  />
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    className={`px-3 sm:px-4 py-2 rounded-lg font-medium transition-colors text-sm sm:text-base min-h-[44px] ${
                      category.id === 'all'
                        ? 'bg-primary-600 text-white'
                        : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                    }`}
                  >
                    {category.name} ({category.count})
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Materials Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 mb-10 sm:mb-12 md:mb-16">
            {studyMaterials.map((material, index) => (
              <div
                key={material.id}
                className="bg-white rounded-xl sm:rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300 animate-fadeInUp"
              >
                <div className="h-40 sm:h-48 bg-gradient-to-br from-primary-100 to-primary-200 flex items-center justify-center">
                  <FileText className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 text-primary-600 flex-shrink-0" />
                </div>

                <div className="p-4 sm:p-5 md:p-6">
                  <div className="flex items-start justify-between mb-2 sm:mb-3">
                    <h3 className="text-lg sm:text-xl font-semibold text-gray-900 line-clamp-2">
                      {material.title}
                    </h3>
                    <div className="flex items-center space-x-1 text-sm text-yellow-500 flex-shrink-0 ml-2">
                      <Star className="w-4 h-4 fill-current flex-shrink-0" />
                      <span className="font-medium">{material.rating}</span>
                    </div>
                  </div>

                  <p className="text-sm sm:text-base text-gray-600 mb-3 sm:mb-4 line-clamp-2">
                    {material.description}
                  </p>

                  <div className="space-y-2 sm:space-y-3 mb-4 sm:mb-5 md:mb-6">
                    <div className="flex items-center justify-between text-xs sm:text-sm text-gray-500">
                      <span>
                        {material.type} • {material.size}
                      </span>
                      <span className="flex items-center space-x-1">
                        <Users className="w-4 h-4 flex-shrink-0" />
                        <span>{material.downloads.toLocaleString()}</span>
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {material.subjects.map((subject) => (
                        <span
                          key={subject}
                          className="px-2 py-1 bg-primary-50 text-primary-600 text-xs rounded-lg font-medium"
                        >
                          {subject}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center justify-between text-xs sm:text-sm">
                      <span className="text-gray-500">{material.chapters} Chapters</span>
                      <span className="text-primary-600 font-medium">{material.price}</span>
                    </div>
                  </div>

                  <div className="flex gap-2 sm:gap-3">
                    <Button className="flex-1 min-h-[44px]" size="sm">
                      <Download className="w-4 h-4 mr-2 flex-shrink-0" />
                      Download
                    </Button>
                    <Button variant="outline" size="sm" className="min-h-[44px]">
                      <Eye className="w-4 h-4 mr-2 flex-shrink-0" />
                      Preview
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Call to Action */}
          <div className="text-center">
            <div
              className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-6 sm:p-8 max-w-4xl mx-auto animate-fadeInUp"
            >
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">
                Need More Personalized Study Materials?
              </h2>
              <p className="text-base sm:text-lg md:text-xl text-gray-600 mb-6 sm:mb-8">
                Join our courses to get access to exclusive study materials, personalized notes, and
                direct faculty support
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                <Button size="lg" className="w-full sm:w-auto min-h-[44px]">
                  <BookOpen className="w-5 h-5 sm:w-6 sm:h-6 mr-2 flex-shrink-0" />
                  Explore Courses
                </Button>
                <Button size="lg" variant="outline" className="w-full sm:w-auto min-h-[44px]">
                  <Zap className="w-5 h-5 sm:w-6 sm:h-6 mr-2 flex-shrink-0" />
                  Book Free Demo
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
