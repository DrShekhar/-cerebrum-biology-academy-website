import { Metadata } from 'next'
import { EnhancedCourseFinderQuiz } from '@/components/conversion/EnhancedCourseFinderQuiz'
import { Breadcrumbs, BreadcrumbContainer } from '@/components/ui/Breadcrumbs'

export const metadata: Metadata = {
  title: 'Course Finder Quiz - Find Your Perfect NEET Biology Course',
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-slate-50 py-8">
      {/* Breadcrumbs */}
      <BreadcrumbContainer className="pt-4">
        <Breadcrumbs />
      </BreadcrumbContainer>

      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Page Header */}
          <div className="text-center mb-6 sm:mb-8 px-4">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 mb-3 sm:mb-4">
              Find Your Perfect Course
            </h1>
            <p className="text-lg sm:text-xl text-gray-700 mb-2">
              Answer 3 simple questions to get a personalized course recommendation
            </p>
            <p className="text-xs sm:text-sm text-gray-600">
              Based on your class, NEET experience, and available study time
            </p>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-wrap justify-center items-center gap-3 sm:gap-4 md:gap-6 mb-8 sm:mb-10 px-4">
            <div className="flex items-center gap-2 bg-white rounded-full px-3 sm:px-4 md:px-5 py-2 sm:py-2.5 shadow-sm border border-gray-200">
              <div className="w-2 h-2 bg-green-600 rounded-full animate-pulse flex-shrink-0" />
              <span className="text-xs sm:text-sm font-medium text-gray-700 whitespace-nowrap">
                5000+ Students
              </span>
            </div>
            <div className="flex items-center gap-2 bg-white rounded-full px-3 sm:px-4 md:px-5 py-2 sm:py-2.5 shadow-sm border border-gray-200">
              <div className="w-2 h-2 bg-indigo-500 rounded-full animate-pulse flex-shrink-0" />
              <span className="text-xs sm:text-sm font-medium text-gray-700 whitespace-nowrap">
                94.8% Success
              </span>
            </div>
            <div className="flex items-center gap-2 bg-white rounded-full px-3 sm:px-4 md:px-5 py-2 sm:py-2.5 shadow-sm border border-gray-200">
              <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse flex-shrink-0" />
              <span className="text-xs sm:text-sm font-medium text-gray-700 whitespace-nowrap">
                AIIMS Faculty
              </span>
            </div>
          </div>

          {/* Quiz Component */}
          <div className="flex justify-center">
            <EnhancedCourseFinderQuiz className="w-full max-w-2xl" />
          </div>

          {/* Additional Information */}
          <div className="mt-10 sm:mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 text-center px-4">
            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 border-t-4 border-t-yellow-500">
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center mx-auto mb-3 sm:mb-4 shadow-lg">
                <svg
                  className="w-6 h-6 sm:w-7 sm:h-7 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">60 Seconds</div>
              <div className="text-gray-800 font-semibold mb-2 text-sm sm:text-base">
                Quick Assessment
              </div>
              <div className="text-gray-600 text-xs sm:text-sm leading-relaxed">
                Get your recommendation in just 3 questions
              </div>
            </div>
            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 border-t-4 border-t-green-500">
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-[#4a5d4a] flex items-center justify-center mx-auto mb-3 sm:mb-4 shadow-lg">
                <svg
                  className="w-6 h-6 sm:w-7 sm:h-7 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                  />
                </svg>
              </div>
              <div className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                Smart Algorithm
              </div>
              <div className="text-gray-800 font-semibold mb-2 text-sm sm:text-base">
                AI-Powered Matching
              </div>
              <div className="text-gray-600 text-xs sm:text-sm leading-relaxed">
                Based on 5000+ successful student data
              </div>
            </div>
            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 border-t-4 border-t-indigo-500 sm:col-span-2 md:col-span-1">
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br from-indigo-400 to-indigo-600 flex items-center justify-center mx-auto mb-3 sm:mb-4 shadow-lg">
                <svg
                  className="w-6 h-6 sm:w-7 sm:h-7 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">100% Free</div>
              <div className="text-gray-800 font-semibold mb-2 text-sm sm:text-base">
                No Hidden Costs
              </div>
              <div className="text-gray-600 text-xs sm:text-sm leading-relaxed">
                Complete course recommendations at no cost
              </div>
            </div>
          </div>

          {/* Why Take This Quiz */}
          <div className="mt-10 sm:mt-12 bg-white rounded-2xl p-6 sm:p-8 shadow-lg border border-gray-200 mx-4">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 text-center mb-6">
              Why Take Our Course Finder Quiz?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
              <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl p-6 border border-yellow-200">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <span className="w-8 h-8 rounded-lg bg-yellow-500 flex items-center justify-center">
                    <svg
                      className="w-5 h-5 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </span>
                  Personalized Recommendations
                </h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-600 font-bold">•</span>
                    <span>Courses matched to your current class and goals</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-600 font-bold">•</span>
                    <span>Study schedule aligned with your availability</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-600 font-bold">•</span>
                    <span>Previous NEET experience considered</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-600 font-bold">•</span>
                    <span>Success rate data for each recommendation</span>
                  </li>
                </ul>
              </div>
              <div className="bg-green-50 rounded-xl p-6 border border-green-200">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <span className="w-8 h-8 rounded-lg bg-green-600 flex items-center justify-center">
                    <svg
                      className="w-5 h-5 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                      />
                    </svg>
                  </span>
                  Data-Driven Insights
                </h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">•</span>
                    <span>Algorithm based on 5000+ student outcomes</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">•</span>
                    <span>Success patterns from AIIMS selections</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">•</span>
                    <span>Optimized for different learning styles</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">•</span>
                    <span>Regularly updated with latest results</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
