'use client'

import { TestimonialGallery } from '@/components/testimonials/TestimonialGallery'
import { SuccessAnalytics } from '@/components/testimonials/SuccessAnalytics'
import { successStoriesData, successAnalyticsData, getFeaturedStories } from '@/data/successStories'
import { VideoTestimonial } from '@/components/testimonials/VideoTestimonial'
import { Button } from '@/components/ui/Button'
import { Award, TrendingUp, Users, Target, Play, BarChart3, Star } from 'lucide-react'
import Link from 'next/link'

export default function SuccessStoriesPage() {
  const featuredStories = getFeaturedStories()
  const videoStories = successStoriesData.filter((story) => story.type === 'video').slice(0, 3)

  return (
    <div className="min-h-screen bg-gray-50 overflow-x-hidden">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-600 to-blue-600 text-white py-12 sm:py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              Student Success Stories
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-green-100 max-w-3xl mx-auto mb-8">
              Discover inspiring journeys of our students who achieved their medical dreams. Real
              stories, real results, real transformations.
            </p>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 mt-8 sm:mt-12">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 sm:p-6">
                <Award className="w-6 h-6 sm:w-8 sm:h-8 mx-auto mb-3" />
                <div className="text-xl sm:text-2xl md:text-3xl font-bold">
                  {successAnalyticsData.topRanks}
                </div>
                <div className="text-xs sm:text-sm text-green-100">Top 1000 Ranks</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 sm:p-6">
                <TrendingUp className="w-6 h-6 sm:w-8 sm:h-8 mx-auto mb-3" />
                <div className="text-xl sm:text-2xl md:text-3xl font-bold">
                  {successAnalyticsData.averageImprovement}+
                </div>
                <div className="text-xs sm:text-sm text-green-100">Avg. Improvement</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 sm:p-6">
                <Users className="w-6 h-6 sm:w-8 sm:h-8 mx-auto mb-3" />
                <div className="text-xl sm:text-2xl md:text-3xl font-bold">
                  {successAnalyticsData.successRate}%
                </div>
                <div className="text-xs sm:text-sm text-green-100">Success Rate</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 sm:p-6">
                <Target className="w-6 h-6 sm:w-8 sm:h-8 mx-auto mb-3" />
                <div className="text-xl sm:text-2xl md:text-3xl font-bold">
                  {successStoriesData.length}
                </div>
                <div className="text-xs sm:text-sm text-green-100">Success Stories</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Video Testimonials */}
      <section className="py-8 sm:py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12 md:mb-16">
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Featured Video Stories
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600">
              Watch our top achievers share their journey to NEET success
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {videoStories.map((story) => (
              <VideoTestimonial
                key={story.id}
                id={story.id}
                studentName={story.studentName}
                college={story.college}
                neetScore={story.neetScore}
                improvement={story.improvement}
                videoUrl={story.videoUrl || '/videos/demo-testimonial.mp4'}
                thumbnailUrl={story.thumbnailUrl || '/images/testimonials/placeholder.jpg'}
                duration={story.duration || '3:45'}
                achievement={story.achievement}
                quote={story.quote}
              />
            ))}
          </div>

          <div className="text-center mt-8 sm:mt-12">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="primary" size="lg" className="w-full sm:w-auto min-h-[44px]">
                <Play className="w-5 h-5 mr-2" />
                Watch All Videos
              </Button>
              <Button variant="outline" size="lg" className="w-full sm:w-auto min-h-[44px]">
                <BarChart3 className="w-5 h-5 mr-2" />
                View Analytics
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Success Analytics Dashboard */}
      <section className="py-8 sm:py-12 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SuccessAnalytics data={successAnalyticsData} />
        </div>
      </section>

      {/* Interactive Gallery */}
      <section className="py-8 sm:py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <TestimonialGallery
            testimonials={successStoriesData}
            title="Complete Success Stories Collection"
            subtitle="Filter and explore all our student success stories by category, type, and achievements"
          />
        </div>
      </section>

      {/* Achievement Highlights */}
      <section className="py-8 sm:py-12 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12 md:mb-16">
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Amazing Achievements
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600">
              Celebrating the remarkable accomplishments of our students
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            <div className="bg-yellow-50 rounded-3xl p-8 text-center">
              <div className="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-yellow-900 mb-2">AIR 127</h3>
              <p className="text-yellow-700">Highest Rank Achieved</p>
              <p className="text-sm text-yellow-600 mt-2">Arjun Sharma - AIIMS Delhi</p>
            </div>

            <div className="bg-green-50 rounded-3xl p-8 text-center">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-green-900 mb-2">+212 Marks</h3>
              <p className="text-green-700">Highest Improvement</p>
              <p className="text-sm text-green-600 mt-2">Repeater Success Story</p>
            </div>

            <div className="bg-blue-50 rounded-3xl p-8 text-center">
              <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-blue-900 mb-2">178/180</h3>
              <p className="text-blue-700">Biology Top Score</p>
              <p className="text-sm text-blue-600 mt-2">Ishita Verma - AIIMS Rishikesh</p>
            </div>

            <div className="bg-purple-50 rounded-3xl p-8 text-center">
              <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-purple-900 mb-2">67 Students</h3>
              <p className="text-purple-700">AIIMS Selections</p>
              <p className="text-sm text-purple-600 mt-2">Across all campuses</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-8 sm:py-12 md:py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-6">
            Ready to Write Your Success Story?
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-blue-100 mb-8">
            Join thousands of successful students who achieved their medical dreams with our expert
            guidance. Your NEET success story could be next!
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/courses">
              <Button
                variant="outline"
                size="xl"
                className="border-white text-white hover:bg-white hover:text-blue-600 w-full sm:w-auto min-h-[44px]"
              >
                Explore Courses
              </Button>
            </Link>
            <Link href="/contact">
              <Button
                variant="primary"
                size="xl"
                className="bg-white text-blue-600 hover:bg-gray-100 w-full sm:w-auto min-h-[44px]"
              >
                Book Free Demo
              </Button>
            </Link>
          </div>

          <div className="mt-8 sm:mt-12 grid grid-cols-3 gap-4 sm:gap-8 text-center">
            <div>
              <div className="text-3xl font-bold mb-2">Free</div>
              <div className="text-blue-100">Demo Classes</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">1:1</div>
              <div className="text-blue-100">Mentorship</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">24/7</div>
              <div className="text-blue-100">Doubt Support</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
