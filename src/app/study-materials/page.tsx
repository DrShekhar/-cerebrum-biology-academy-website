'use client'

import React from 'react'
import { motion } from 'framer-motion'
import {
  BookOpen,
  Download,
  FileText,
  Video,
  Search,
  Filter,
  Star,
  Clock,
  Users,
  Zap,
  Eye,
} from 'lucide-react'
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
      <section className="bg-gradient-to-br from-primary-600 to-primary-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Study Materials</h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90 max-w-3xl mx-auto">
              Access comprehensive NEET Biology study materials, notes, practice papers, and
              resources to boost your preparation
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary">
                <Download className="w-5 h-5 mr-2" />
                Download All Materials
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-primary-600"
              >
                <Video className="w-5 h-5 mr-2" />
                Watch Study Guide
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary-600 mb-2">500+</div>
              <div className="text-gray-600">Study Materials</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary-600 mb-2">50K+</div>
              <div className="text-gray-600">Downloads</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary-600 mb-2">100%</div>
              <div className="text-gray-600">Free Access</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary-600 mb-2">4.8★</div>
              <div className="text-gray-600">Student Rating</div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Filters and Search */}
          <div className="mb-12">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-8">
              <div className="flex-1 max-w-md">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search study materials..."
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {studyMaterials.map((material, index) => (
              <motion.div
                key={material.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300"
              >
                <div className="h-48 bg-gradient-to-br from-primary-100 to-primary-200 flex items-center justify-center">
                  <FileText className="w-16 h-16 text-primary-600" />
                </div>

                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-xl font-semibold text-gray-900 line-clamp-2">
                      {material.title}
                    </h3>
                    <div className="flex items-center space-x-1 text-sm text-yellow-500">
                      <Star className="w-4 h-4 fill-current" />
                      <span className="font-medium">{material.rating}</span>
                    </div>
                  </div>

                  <p className="text-gray-600 mb-4 line-clamp-2">{material.description}</p>

                  <div className="space-y-3 mb-6">
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <span>
                        {material.type} • {material.size}
                      </span>
                      <span className="flex items-center space-x-1">
                        <Users className="w-4 h-4" />
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

                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500">{material.chapters} Chapters</span>
                      <span className="text-primary-600 font-medium">{material.price}</span>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Button className="flex-1" size="sm">
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </Button>
                    <Button variant="outline" size="sm">
                      <Eye className="w-4 h-4 mr-2" />
                      Preview
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Call to Action */}
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl shadow-lg p-8 max-w-4xl mx-auto"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Need More Personalized Study Materials?
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                Join our courses to get access to exclusive study materials, personalized notes, and
                direct faculty support
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg">
                  <BookOpen className="w-5 h-5 mr-2" />
                  Explore Courses
                </Button>
                <Button size="lg" variant="outline">
                  <Zap className="w-5 h-5 mr-2" />
                  Book Free Demo
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}
