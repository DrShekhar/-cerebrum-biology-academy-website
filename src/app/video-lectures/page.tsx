'use client'

import { VideoLectureShowcase } from '@/components/layout/VideoLectureShowcase'
import { Metadata } from 'next'

export default function VideoLecturesPage() {
  return (
    <div className="min-h-screen">
      {/* Header Section */}
      <section className="bg-gradient-to-br from-indigo-600 via-blue-600 to-purple-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Cerebrum Video Lectures</h1>
          <p className="text-xl md:text-2xl opacity-90 max-w-3xl mx-auto mb-8">
            Complete NEET Biology video lecture series by Dr. Shekhar Singh - AIIMS Faculty
          </p>

          {/* Quick Access */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <div className="text-3xl font-bold mb-2">200+</div>
              <div className="text-sm opacity-90">Video Lectures</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <div className="text-3xl font-bold mb-2">100+</div>
              <div className="text-sm opacity-90">Hours Content</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <div className="text-3xl font-bold mb-2">2,847+</div>
              <div className="text-sm opacity-90">Success Stories</div>
            </div>
          </div>
        </div>
      </section>

      {/* Video Lecture Showcase */}
      <VideoLectureShowcase />

      {/* Additional Information */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Why Choose Cerebrum Video Lectures?
              </h2>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="w-6 h-6 bg-indigo-600 rounded-full flex items-center justify-center mr-4 mt-1">
                    <span className="text-white text-sm font-bold">✓</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">AIIMS Faculty Expertise</h3>
                    <p className="text-gray-600">
                      Learn from Dr. Shekhar Singh, qualified AIIMS faculty with proven track record
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-6 h-6 bg-indigo-600 rounded-full flex items-center justify-center mr-4 mt-1">
                    <span className="text-white text-sm font-bold">✓</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Complete NEET Syllabus</h3>
                    <p className="text-gray-600">
                      Comprehensive coverage of all NEET Biology topics with exam-focused approach
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-6 h-6 bg-indigo-600 rounded-full flex items-center justify-center mr-4 mt-1">
                    <span className="text-white text-sm font-bold">✓</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">HD Quality Content</h3>
                    <p className="text-gray-600">
                      Crystal clear video and audio quality for optimal learning experience
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-6 h-6 bg-indigo-600 rounded-full flex items-center justify-center mr-4 mt-1">
                    <span className="text-white text-sm font-bold">✓</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">24/7 Access</h3>
                    <p className="text-gray-600">
                      Study anytime, anywhere with unlimited video access
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Success Statistics</h3>
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">NEET Qualification Rate</span>
                  <span className="text-2xl font-bold text-green-600">98%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">AIIMS Selections</span>
                  <span className="text-2xl font-bold text-blue-600">247</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Medical Seats Secured</span>
                  <span className="text-2xl font-bold text-purple-600">2,847+</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Student Rating</span>
                  <div className="flex items-center">
                    <span className="text-2xl font-bold text-yellow-600 mr-2">4.9</span>
                    <div className="flex text-yellow-400">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <span key={i}>★</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
