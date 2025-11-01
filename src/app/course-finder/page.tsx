import { Metadata } from 'next'
import { EnhancedCourseFinderQuiz } from '@/components/conversion/EnhancedCourseFinderQuiz'
import { Breadcrumbs, BreadcrumbContainer } from '@/components/ui/Breadcrumbs'

export const metadata: Metadata = {
  title: 'Course Finder Quiz - Find Your Perfect NEET Biology Course | Cerebrum Biology Academy',
  description:
    'Take our smart quiz to find the perfect NEET Biology course based on your class, experience, and study schedule. Get personalized recommendations in 60 seconds.',
  keywords: [
    'course finder',
    'NEET course recommendation',
    'biology course quiz',
    'course selection quiz',
    'NEET preparation course',
    'personalized course recommendation',
  ],
}

export default function CourseFinderPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-8">
      {/* Breadcrumbs */}
      <BreadcrumbContainer className="pt-4">
        <Breadcrumbs />
      </BreadcrumbContainer>

      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Page Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Find Your Perfect Course
            </h1>
            <p className="text-xl text-gray-700 mb-2">
              Answer 3 simple questions to get a personalized course recommendation
            </p>
            <p className="text-sm text-gray-600">
              Based on your class, NEET experience, and available study time
            </p>
          </div>

          {/* Trust Indicators */}
          <div className="flex justify-center items-center gap-8 mb-8 text-sm text-gray-700">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse" />
              <span>5000+ Students Helped</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-purple-600 rounded-full animate-pulse" />
              <span>94.8% Success Rate</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
              <span>AIIMS Faculty</span>
            </div>
          </div>

          {/* Quiz Component */}
          <div className="flex justify-center">
            <EnhancedCourseFinderQuiz className="w-full max-w-2xl" />
          </div>

          {/* Additional Information */}
          <div className="mt-12 grid md:grid-cols-3 gap-6 text-center">
            <div className="bg-white rounded-xl p-6 shadow-lg border border-blue-100">
              <div className="text-2xl font-bold text-blue-600 mb-2">60 Seconds</div>
              <div className="text-gray-900 font-medium mb-1">Quick Assessment</div>
              <div className="text-gray-600 text-sm">
                Get your recommendation in just 3 questions
              </div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg border border-purple-100">
              <div className="text-2xl font-bold text-purple-600 mb-2">Smart Algorithm</div>
              <div className="text-gray-900 font-medium mb-1">AI-Powered Matching</div>
              <div className="text-gray-600 text-sm">Based on 5000+ successful student data</div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg border border-blue-100">
              <div className="text-2xl font-bold text-blue-600 mb-2">100% Free</div>
              <div className="text-gray-900 font-medium mb-1">No Hidden Costs</div>
              <div className="text-gray-600 text-sm">
                Complete course recommendations at no cost
              </div>
            </div>
          </div>

          {/* Why Take This Quiz */}
          <div className="mt-12 bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-8 border border-blue-100 shadow-lg">
            <h2 className="text-2xl font-bold text-gray-900 text-center mb-6">
              Why Take Our Course Finder Quiz?
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-blue-600 mb-3">
                  Personalized Recommendations
                </h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• Courses matched to your current class and goals</li>
                  <li>• Study schedule aligned with your availability</li>
                  <li>• Previous NEET experience considered</li>
                  <li>• Success rate data for each recommendation</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-purple-600 mb-3">Data-Driven Insights</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• Algorithm based on 5000+ student outcomes</li>
                  <li>• Success patterns from AIIMS selections</li>
                  <li>• Optimized for different learning styles</li>
                  <li>• Regularly updated with latest results</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
