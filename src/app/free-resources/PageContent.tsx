'use client'

import { Download, FileText, Phone } from 'lucide-react'
import Link from 'next/link'

interface LeadMagnet {
  id: string
  title: string
  description: string
  pages: number
  fileName: string
  category: 'biology' | 'study-plan' | 'reference' | 'mock-test'
}

const leadMagnets: LeadMagnet[] = [
  {
    id: '1',
    title: 'NCERT Biology Quick Revision',
    description: 'Comprehensive quick revision guide covering all NCERT biology chapters with key concepts and definitions.',
    pages: 38,
    fileName: 'ncert-biology-quick-revision',
    category: 'biology',
  },
  {
    id: '2',
    title: 'NEET Biology Study Planner 2026',
    description: 'Structured 12-month study plan for NEET 2026 with chapter-wise timeline and daily targets.',
    pages: 14,
    fileName: 'neet-study-planner-2026',
    category: 'study-plan',
  },
  {
    id: '3',
    title: 'Human Physiology Reference',
    description: 'Detailed reference guide for human physiology with diagrams and key points for NEET.',
    pages: 11,
    fileName: 'human-physiology-reference',
    category: 'reference',
  },
  {
    id: '4',
    title: 'Genetics & Heredity Guide',
    description: 'Complete guide on genetics and heredity with solved examples and important problem types.',
    pages: 16,
    fileName: 'genetics-heredity-guide',
    category: 'biology',
  },
  {
    id: '5',
    title: 'Biology Mnemonics for NEET 2026',
    description: 'Easy-to-remember mnemonics for complex biological terms and concepts.',
    pages: 12,
    fileName: 'biology-mnemonics-neet',
    category: 'biology',
  },
  {
    id: '6',
    title: 'NEET PYQ Analysis 2020-2025',
    description: 'Topic-wise analysis of previous year questions with solutions and explanations.',
    pages: 42,
    fileName: 'neet-pyq-analysis',
    category: 'reference',
  },
  {
    id: '7',
    title: 'NEET Biology Weightage 2026',
    description: 'Chapter-wise weightage analysis based on NEET 2025 and historical trends.',
    pages: 8,
    fileName: 'neet-biology-weightage',
    category: 'biology',
  },
  {
    id: '8',
    title: 'Plant Biology Complete Guide',
    description: 'In-depth guide on plant biology, morphology, anatomy, and physiology with diagrams.',
    pages: 24,
    fileName: 'plant-biology-guide',
    category: 'biology',
  },
  {
    id: '9',
    title: 'Ecology and Biodiversity',
    description: 'Comprehensive coverage of ecology, ecosystems, and biodiversity with case studies.',
    pages: 20,
    fileName: 'ecology-biodiversity-guide',
    category: 'biology',
  },
  {
    id: '10',
    title: 'NEET Biology Mock Test Paper',
    description: 'Full-length mock test with 180 questions in NEET pattern with answer key and solutions.',
    pages: 28,
    fileName: 'neet-biology-mock-test',
    category: 'mock-test',
  },
]

const getCategoryColor = (category: string) => {
  switch (category) {
    case 'biology':
      return 'bg-blue-50 border-blue-200'
    case 'study-plan':
      return 'bg-purple-50 border-purple-200'
    case 'reference':
      return 'bg-orange-50 border-orange-200'
    case 'mock-test':
      return 'bg-red-50 border-red-200'
    default:
      return 'bg-gray-50 border-gray-200'
  }
}

const getCategoryBadgeColor = (category: string) => {
  switch (category) {
    case 'biology':
      return 'bg-blue-100 text-blue-800'
    case 'study-plan':
      return 'bg-purple-100 text-purple-800'
    case 'reference':
      return 'bg-orange-100 text-orange-800'
    case 'mock-test':
      return 'bg-red-100 text-red-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}

const getCategoryLabel = (category: string) => {
  switch (category) {
    case 'biology':
      return 'Biology Guide'
    case 'study-plan':
      return 'Study Plan'
    case 'reference':
      return 'Reference'
    case 'mock-test':
      return 'Mock Test'
    default:
      return 'Resource'
  }
}

export default function PageContent() {
  const handleDownload = (fileName: string) => {
    const link = document.createElement('a')
    link.href = `/lead-magnets/${fileName}.pdf`
    link.download = `${fileName}.pdf`
    link.click()
  }

  return (
    <>
      {/* Lead Magnets Section */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-5xl mx-auto">
          <div className="mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Download Free NEET Biology Resources
            </h2>
            <p className="text-lg text-gray-600">
              Get access to 10 premium PDFs covering NEET biology preparation, study plans, and
              mock tests. All resources are created by expert educators at Cerebrum Biology
              Academy.
            </p>
          </div>

          {/* Resources Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {leadMagnets.map((resource) => (
              <div
                key={resource.id}
                className={`rounded-lg p-6 border-2 transition-all hover:shadow-lg hover:scale-[1.02] ${getCategoryColor(resource.category)}`}
              >
                <div className="flex items-start gap-4">
                  <div className="bg-white rounded-lg p-3 border border-gray-200">
                    <FileText className="w-8 h-8 text-gray-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h3 className="font-bold text-gray-900 text-lg flex-1">
                        {resource.title}
                      </h3>
                    </div>
                    <p className="text-gray-700 text-sm mb-4">{resource.description}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className={`text-xs font-semibold px-3 py-1 rounded-full ${getCategoryBadgeColor(resource.category)}`}>
                          {getCategoryLabel(resource.category)}
                        </span>
                        <span className="text-sm text-gray-600 font-medium">
                          {resource.pages} pages
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => handleDownload(resource.fileName)}
                  className="w-full mt-4 inline-flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg transition-colors"
                >
                  <Download className="w-5 h-5" />
                  Download PDF
                </button>
              </div>
            ))}
          </div>

          {/* WhatsApp CTA */}
          <div className="bg-gradient-to-r from-green-50 to-green-100 border-2 border-green-300 rounded-lg p-8 text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              Need More Resources or Have Questions?
            </h3>
            <p className="text-gray-700 mb-6">
              Connect with our NEET biology experts on WhatsApp for personalized guidance and
              custom study materials.
            </p>
            <a
              href="https://wa.me/918826444334"
              className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-lg font-semibold transition-colors shadow-lg hover:shadow-xl"
            >
              <Phone className="w-5 h-5" />
              Message Us on WhatsApp
            </a>
          </div>

          {/* Info Section */}
          <div className="mt-12 bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h3 className="font-bold text-gray-900 mb-3">Why Download These Resources?</h3>
            <ul className="text-gray-700 space-y-2">
              <li>
                <strong>Expert-Created:</strong> All materials are designed by experienced NEET
                biology educators
              </li>
              <li>
                <strong>Latest NEET Pattern:</strong> Updated with current NEET examination format
                and syllabus
              </li>
              <li>
                <strong>Easy to Use:</strong> Simple, organized layouts perfect for quick
                revision and study
              </li>
              <li>
                <strong>100% Free:</strong> No hidden charges, no subscription required
              </li>
              <li>
                <strong>Printable:</strong> Download, save, and print for offline study
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Related Resources Section */}
      <div className="bg-gray-100 py-12 mt-8">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
              More Ways to Prepare for NEET
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Link
                href="/neet-biology-mcq"
                className="bg-white rounded-lg p-6 border border-gray-200 hover:border-green-500 hover:shadow-md transition-all"
              >
                <h4 className="font-bold text-gray-900 mb-2">Free MCQ Practice</h4>
                <p className="text-gray-600 text-sm mb-4">
                  Solve topic-wise and full-length mock tests with instant feedback
                </p>
                <span className="text-green-600 font-semibold text-sm">Start Practicing →</span>
              </Link>
              <Link
                href="/all-locations"
                className="bg-white rounded-lg p-6 border border-gray-200 hover:border-green-500 hover:shadow-md transition-all"
              >
                <h4 className="font-bold text-gray-900 mb-2">Find Coaching Center</h4>
                <p className="text-gray-600 text-sm mb-4">
                  Join Cerebrum Biology Academy in your city for expert guidance
                </p>
                <span className="text-green-600 font-semibold text-sm">View Centers →</span>
              </Link>
              <Link
                href="/about-cerebrum-biology-academy"
                className="bg-white rounded-lg p-6 border border-gray-200 hover:border-green-500 hover:shadow-md transition-all"
              >
                <h4 className="font-bold text-gray-900 mb-2">Learn About Us</h4>
                <p className="text-gray-600 text-sm mb-4">
                  Discover our teaching methodology and success with NEET students
                </p>
                <span className="text-green-600 font-semibold text-sm">Read More →</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
