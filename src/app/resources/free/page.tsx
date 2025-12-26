'use client'

import Link from 'next/link'
import {
  Download,
  FileText,
  BookOpen,
  Video,
  CheckCircle,
  Star,
  ArrowRight,
  Clock,
  Users,
  Award,
  Brain,
  Microscope,
  Dna,
  Leaf,
  HeartPulse,
  Beaker,
  FlaskConical,
  GraduationCap,
  Play,
  Lock,
  Unlock,
} from 'lucide-react'

export default function FreeResourcesPage() {
  const resourceCategories = [
    {
      name: 'NCERT Notes',
      icon: BookOpen,
      description: 'Chapter-wise notes aligned with NCERT Biology textbook',
      color: 'blue',
      resources: [
        { name: 'Class 11 Biology - Complete Notes', type: 'PDF', pages: 156, downloads: 12500 },
        { name: 'Class 12 Biology - Complete Notes', type: 'PDF', pages: 148, downloads: 15200 },
        { name: 'NCERT Exemplar Solutions', type: 'PDF', pages: 92, downloads: 8700 },
        { name: 'Previous Year NCERT Questions', type: 'PDF', pages: 64, downloads: 9300 },
      ],
    },
    {
      name: 'Topic-wise PYQs',
      icon: FileText,
      description: 'Last 10 years NEET questions organized by topic',
      color: 'green',
      resources: [
        { name: 'Botany PYQs (2014-2024)', type: 'PDF', pages: 128, downloads: 11200 },
        { name: 'Zoology PYQs (2014-2024)', type: 'PDF', pages: 134, downloads: 10800 },
        { name: 'Human Physiology PYQs', type: 'PDF', pages: 76, downloads: 8900 },
        { name: 'Genetics & Evolution PYQs', type: 'PDF', pages: 68, downloads: 9500 },
      ],
    },
    {
      name: 'Quick Revision Sheets',
      icon: Dna,
      description: 'One-page summaries for last-minute revision',
      color: 'purple',
      resources: [
        { name: 'Cell Biology - Quick Sheet', type: 'PDF', pages: 4, downloads: 6500 },
        { name: 'Plant Kingdom - Quick Sheet', type: 'PDF', pages: 6, downloads: 5800 },
        { name: 'Animal Kingdom - Quick Sheet', type: 'PDF', pages: 8, downloads: 6200 },
        { name: 'Human Physiology - Quick Sheet', type: 'PDF', pages: 12, downloads: 7400 },
      ],
    },
    {
      name: 'Diagrams & Flowcharts',
      icon: Microscope,
      description: 'High-quality labeled diagrams for Biology',
      color: 'orange',
      resources: [
        { name: 'Cell Organelles Diagrams', type: 'PDF', pages: 24, downloads: 5400 },
        { name: 'Human Anatomy Diagrams', type: 'PDF', pages: 42, downloads: 6800 },
        { name: 'Plant Anatomy Diagrams', type: 'PDF', pages: 32, downloads: 5100 },
        { name: 'Genetics Flowcharts', type: 'PDF', pages: 18, downloads: 4900 },
      ],
    },
  ]

  const freeVideos = [
    {
      title: 'Cell Structure & Function',
      duration: '45 min',
      views: '25K',
      level: 'Class 11',
      thumbnail: 'cell',
    },
    {
      title: 'Photosynthesis Masterclass',
      duration: '52 min',
      views: '18K',
      level: 'Class 11',
      thumbnail: 'plant',
    },
    {
      title: 'Human Heart & Circulation',
      duration: '38 min',
      views: '32K',
      level: 'Class 11',
      thumbnail: 'heart',
    },
    {
      title: 'Genetics - Mendel Laws',
      duration: '48 min',
      views: '28K',
      level: 'Class 12',
      thumbnail: 'dna',
    },
    {
      title: 'Molecular Biology of Gene',
      duration: '55 min',
      views: '21K',
      level: 'Class 12',
      thumbnail: 'molecule',
    },
    {
      title: 'Evolution & Origin of Life',
      duration: '42 min',
      views: '19K',
      level: 'Class 12',
      thumbnail: 'evolution',
    },
  ]

  const practiceTests = [
    {
      name: 'Cell Biology Mini Test',
      questions: 30,
      time: '30 min',
      difficulty: 'Easy',
      attempts: 4500,
      free: true,
    },
    {
      name: 'Plant Physiology Test',
      questions: 40,
      time: '40 min',
      difficulty: 'Medium',
      attempts: 3200,
      free: true,
    },
    {
      name: 'Human Physiology Test',
      questions: 50,
      time: '50 min',
      difficulty: 'Medium',
      attempts: 4100,
      free: true,
    },
    {
      name: 'Genetics & Evolution Test',
      questions: 45,
      time: '45 min',
      difficulty: 'Hard',
      attempts: 2800,
      free: false,
    },
    {
      name: 'Full NEET Biology Mock',
      questions: 100,
      time: '100 min',
      difficulty: 'NEET Level',
      attempts: 5600,
      free: false,
    },
  ]

  const importantTopics = [
    { name: 'Cell Biology', icon: Microscope, chapters: 4, weightage: '12%' },
    { name: 'Plant Physiology', icon: Leaf, chapters: 5, weightage: '14%' },
    { name: 'Human Physiology', icon: HeartPulse, chapters: 7, weightage: '20%' },
    { name: 'Genetics', icon: Dna, chapters: 4, weightage: '18%' },
    { name: 'Ecology', icon: Leaf, chapters: 4, weightage: '10%' },
    { name: 'Biotechnology', icon: FlaskConical, chapters: 3, weightage: '8%' },
  ]

  const stats = [
    { number: '50+', label: 'Free PDFs', description: 'Study materials' },
    { number: '100+', label: 'Video Lessons', description: 'Free to watch' },
    { number: '500+', label: 'Practice Questions', description: 'With solutions' },
    { number: '50,000+', label: 'Students', description: 'Benefited' },
  ]

  const getColorClasses = (color: string) => {
    const colorMap: Record<string, { bg: string; text: string; light: string; border: string }> = {
      blue: {
        bg: 'bg-blue-500',
        text: 'text-blue-600',
        light: 'bg-blue-50',
        border: 'border-blue-500',
      },
      green: {
        bg: 'bg-green-600',
        text: 'text-green-600',
        light: 'bg-green-50',
        border: 'border-green-600',
      },
      purple: {
        bg: 'bg-purple-500',
        text: 'text-purple-600',
        light: 'bg-purple-50',
        border: 'border-purple-500',
      },
      orange: {
        bg: 'bg-orange-500',
        text: 'text-orange-600',
        light: 'bg-orange-50',
        border: 'border-orange-500',
      },
    }
    return colorMap[color] || colorMap.blue
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-12 sm:py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="mb-6 sm:mb-8 flex justify-center">
            <div className="bg-white/20 backdrop-blur-md rounded-full px-4 sm:px-6 py-2 sm:py-3 inline-flex items-center gap-2 sm:gap-3 border border-white/30">
              <Download className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-300" />
              <span className="text-xs sm:text-sm font-medium">
                <span className="font-bold">50,000+ students</span> have downloaded our free
                resources
              </span>
            </div>
          </div>

          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 leading-tight">
              Free NEET Biology Resources
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-blue-100 mb-6 sm:mb-8">
              Quality study materials, previous year questions, video lectures, and practice tests -
              all <span className="font-bold text-yellow-300">completely FREE</span>. Start your
              NEET preparation journey today.
            </p>

            <div className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-6 sm:mb-8 text-xs sm:text-sm">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-300" />
                <span>No registration required</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-300" />
                <span>Instant download</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-300" />
                <span>Updated for NEET 2025</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <Link
                href="#resources"
                className="bg-white text-blue-600 px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-bold hover:bg-blue-50 transition-all hover:scale-105 inline-flex items-center justify-center text-base sm:text-lg shadow-lg min-h-[44px]"
              >
                <Download className="w-5 h-5 mr-2" />
                Browse Free Resources
              </Link>
              <Link
                href="/courses"
                className="border-2 border-white text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors inline-flex items-center justify-center min-h-[44px]"
              >
                View Full Courses
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-4 sm:p-6 text-center shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="text-2xl sm:text-3xl font-bold text-blue-600 mb-1 sm:mb-2">
                  {stat.number}
                </div>
                <div className="text-sm sm:text-lg font-semibold text-gray-900 mb-1">
                  {stat.label}
                </div>
                <div className="text-xs sm:text-sm text-gray-600">{stat.description}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Important Topics Overview */}
      <section className="py-8 sm:py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-8 sm:mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
              NEET Biology Topic-wise Weightage
            </h2>
            <p className="text-sm sm:text-base text-gray-600">
              Focus on high-weightage topics for maximum marks
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {importantTopics.map((topic, index) => {
              const Icon = topic.icon
              return (
                <div
                  key={index}
                  className="bg-gray-50 rounded-xl p-4 text-center hover:shadow-md transition-shadow"
                >
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2 sm:mb-3">
                    <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
                  </div>
                  <h3 className="text-sm sm:text-base font-semibold text-gray-900 mb-1">
                    {topic.name}
                  </h3>
                  <p className="text-xs text-gray-600">{topic.chapters} chapters</p>
                  <div className="mt-2 bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded-full inline-block">
                    {topic.weightage}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Free Study Materials */}
      <section id="resources" className="py-8 sm:py-12 md:py-16 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-8 sm:mb-10 md:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
              Free Study Materials
            </h2>
            <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto">
              Download comprehensive study materials prepared by expert faculty
            </p>
          </div>

          <div className="space-y-8 sm:space-y-10">
            {resourceCategories.map((category, index) => {
              const colors = getColorClasses(category.color)
              const Icon = category.icon
              return (
                <div
                  key={index}
                  className={`bg-white rounded-xl p-6 sm:p-8 shadow-lg border-l-4 ${colors.border}`}
                >
                  <div className="flex items-start gap-4 mb-6">
                    <div className={`p-3 ${colors.light} rounded-lg`}>
                      <Icon className={`w-6 h-6 sm:w-8 sm:h-8 ${colors.text}`} />
                    </div>
                    <div>
                      <h3 className="text-lg sm:text-xl font-bold text-gray-900">
                        {category.name}
                      </h3>
                      <p className="text-sm text-gray-600">{category.description}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {category.resources.map((resource, i) => (
                      <div
                        key={i}
                        className="bg-gray-50 rounded-lg p-4 hover:shadow-md transition-shadow"
                      >
                        <div className="flex items-start justify-between mb-2">
                          <FileText className={`w-5 h-5 ${colors.text}`} />
                          <span className="text-xs bg-gray-200 px-2 py-0.5 rounded">
                            {resource.type}
                          </span>
                        </div>
                        <h4 className="text-sm font-semibold text-gray-900 mb-2">
                          {resource.name}
                        </h4>
                        <div className="flex justify-between text-xs text-gray-600 mb-3">
                          <span>{resource.pages} pages</span>
                          <span>{resource.downloads.toLocaleString()} downloads</span>
                        </div>
                        <button
                          className={`w-full ${colors.bg} text-white py-2 rounded-lg text-sm font-semibold hover:opacity-90 transition-opacity flex items-center justify-center gap-1`}
                        >
                          <Download className="w-4 h-4" />
                          Download Free
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Free Video Lectures */}
      <section className="py-8 sm:py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-8 sm:mb-10 md:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
              Free Video Lectures
            </h2>
            <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto">
              Watch expert-taught video lessons on key Biology topics
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {freeVideos.map((video, index) => (
              <div
                key={index}
                className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow group"
              >
                <div className="relative bg-gradient-to-br from-blue-500 to-indigo-600 h-40 sm:h-48 flex items-center justify-center">
                  <div className="absolute inset-0 bg-black/20" />
                  <div className="relative z-10 w-14 h-14 sm:w-16 sm:h-16 bg-white rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform cursor-pointer">
                    <Play className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600 ml-1" />
                  </div>
                  <div className="absolute top-3 right-3 bg-black/60 text-white px-2 py-1 rounded text-xs font-medium">
                    {video.duration}
                  </div>
                  <div className="absolute bottom-3 left-3 bg-white/90 text-gray-900 px-2 py-1 rounded text-xs font-medium">
                    {video.level}
                  </div>
                </div>

                <div className="p-4 sm:p-5">
                  <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-2">
                    {video.title}
                  </h3>
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <span className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      {video.views} views
                    </span>
                    <span className="flex items-center gap-1 text-green-600 font-medium">
                      <Unlock className="w-4 h-4" />
                      Free
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <Link
              href="/courses"
              className="inline-flex items-center gap-2 text-blue-600 font-semibold hover:text-blue-700"
            >
              View all video lectures
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Practice Tests */}
      <section className="py-8 sm:py-12 md:py-16 bg-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-8 sm:mb-10 md:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
              Practice Tests
            </h2>
            <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto">
              Test your knowledge with our curated practice tests
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {practiceTests.map((test, index) => (
              <div
                key={index}
                className={`bg-white rounded-xl p-5 sm:p-6 shadow-lg hover:shadow-xl transition-shadow ${
                  !test.free ? 'opacity-90' : ''
                }`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div
                    className={`px-3 py-1 rounded-full text-xs font-bold ${
                      test.difficulty === 'Easy'
                        ? 'bg-green-100 text-green-700'
                        : test.difficulty === 'Medium'
                          ? 'bg-yellow-100 text-yellow-700'
                          : test.difficulty === 'Hard'
                            ? 'bg-orange-100 text-orange-700'
                            : 'bg-red-100 text-red-700'
                    }`}
                  >
                    {test.difficulty}
                  </div>
                  {test.free ? (
                    <span className="flex items-center gap-1 text-green-600 text-sm font-semibold">
                      <Unlock className="w-4 h-4" />
                      Free
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 text-gray-500 text-sm">
                      <Lock className="w-4 h-4" />
                      Premium
                    </span>
                  )}
                </div>

                <h3 className="text-lg font-bold text-gray-900 mb-3">{test.name}</h3>

                <div className="grid grid-cols-2 gap-3 mb-4 text-sm">
                  <div className="flex items-center gap-2 text-gray-600">
                    <FileText className="w-4 h-4" />
                    <span>{test.questions} Questions</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Clock className="w-4 h-4" />
                    <span>{test.time}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs text-gray-500">
                    {test.attempts.toLocaleString()} attempts
                  </span>
                </div>

                {test.free ? (
                  <button className="w-full bg-blue-600 text-white py-2.5 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                    Start Test
                  </button>
                ) : (
                  <Link
                    href="/courses"
                    className="block w-full text-center border-2 border-blue-600 text-blue-600 py-2.5 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
                  >
                    Unlock with Course
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-8 sm:py-12 md:py-16 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <GraduationCap className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-4 sm:mb-6 text-yellow-300" />
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6">
            Want More Comprehensive Resources?
          </h2>
          <p className="text-base sm:text-lg text-blue-100 mb-6 sm:mb-8 max-w-2xl mx-auto">
            These free resources are just the beginning. Join our courses for complete NEET Biology
            preparation with expert guidance, live classes, and personalized mentorship.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6 sm:mb-8">
            <Link
              href="/courses"
              className="bg-white text-blue-600 px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-bold hover:bg-blue-50 transition-colors inline-flex items-center justify-center min-h-[44px]"
            >
              Explore Full Courses
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
            <Link
              href="/demo-booking"
              className="border-2 border-white text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors inline-flex items-center justify-center min-h-[44px]"
            >
              <Play className="w-5 h-5 mr-2" />
              Book Free Demo
            </Link>
          </div>

          <div className="flex flex-wrap justify-center gap-4 sm:gap-6 text-sm">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4" />
              <span>500+ video lessons</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4" />
              <span>Live doubt resolution</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4" />
              <span>Personal mentorship</span>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-8 sm:py-12 md:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-8 sm:mb-10 md:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-4 sm:space-y-6">
            <div className="bg-white rounded-xl p-4 sm:p-6 shadow-lg">
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">
                Are these resources really free?
              </h3>
              <p className="text-sm sm:text-base text-gray-600">
                Yes! All materials marked as free can be downloaded without any registration or
                payment. We believe in providing quality education accessible to all students.
              </p>
            </div>

            <div className="bg-white rounded-xl p-4 sm:p-6 shadow-lg">
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">
                Are these materials sufficient for NEET preparation?
              </h3>
              <p className="text-sm sm:text-base text-gray-600">
                These free resources provide a solid foundation. For comprehensive preparation with
                structured learning, live classes, and personalized mentorship, we recommend
                enrolling in our full courses.
              </p>
            </div>

            <div className="bg-white rounded-xl p-4 sm:p-6 shadow-lg">
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">
                How often are the materials updated?
              </h3>
              <p className="text-sm sm:text-base text-gray-600">
                We update our materials annually based on the latest NEET syllabus and exam
                patterns. All resources are current for NEET 2025 preparation.
              </p>
            </div>

            <div className="bg-white rounded-xl p-4 sm:p-6 shadow-lg">
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">
                Can I get doubt support for free resources?
              </h3>
              <p className="text-sm sm:text-base text-gray-600">
                Limited doubt support is available through our community forums. For instant, expert
                doubt resolution, our paid courses include 24/7 WhatsApp support and video call
                sessions.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
