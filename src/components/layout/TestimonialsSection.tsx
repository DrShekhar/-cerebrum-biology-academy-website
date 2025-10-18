'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { testimonials, successStats, videoTestimonials } from '@/data/testimonials'
import {
  Star,
  Play,
  Quote,
  MapPin,
  Award,
  Users,
  ChevronLeft,
  ChevronRight,
  Youtube,
  Clock,
  Trophy,
  BookOpen,
} from 'lucide-react'
import { motion } from 'framer-motion'

export function TestimonialsSection() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  const [showVideoModal, setShowVideoModal] = useState(false)
  const [selectedVideo, setSelectedVideo] = useState('')

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  const openVideoModal = (videoId: string) => {
    setSelectedVideo(videoId)
    setShowVideoModal(true)
  }

  const closeVideoModal = () => {
    setShowVideoModal(false)
    setSelectedVideo('')
  }

  return (
    <section className="py-20 bg-navy-50">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center bg-blue-100 text-blue-600 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Award className="w-4 h-4 mr-2" />
            Student Success Stories
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Hear From Our <span className="text-blue-600">NEET Achievers</span>
          </h2>

          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Real stories from students who transformed their dreams into reality. From struggling
            with basics to cracking NEET with flying colors.
          </p>
        </motion.div>

        {/* Success Statistics */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          {successStats.map((stat, index) => (
            <motion.div
              key={stat.label}
              className="text-center p-6 bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="text-3xl font-bold text-blue-600 mb-2">{stat.number}</div>
              <div className="font-semibold text-gray-900 mb-1">{stat.label}</div>
              <div className="text-sm text-gray-600">{stat.description}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Featured Testimonial Carousel */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-100 rounded-full -translate-y-16 translate-x-16 opacity-50"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-purple-100 rounded-full translate-y-12 -translate-x-12 opacity-50"></div>

            <div className="relative">
              {/* Quote Icon */}
              <Quote className="w-16 h-16 text-blue-200 mb-6" />

              <div className="grid md:grid-cols-3 gap-8 items-center">
                {/* Testimonial Content */}
                <div className="md:col-span-2">
                  <blockquote className="text-xl md:text-2xl text-gray-800 leading-relaxed mb-6">
                    &ldquo;{testimonials[currentTestimonial].comment}&rdquo;
                  </blockquote>

                  <div className="flex items-center mb-4">
                    <div className="flex text-yellow-400 mr-3">
                      {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 fill-current" />
                      ))}
                    </div>
                    <span className="text-gray-600 text-sm">5.0 out of 5</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-xl text-gray-900">
                        {testimonials[currentTestimonial].name}
                      </h4>
                      <p className="text-blue-600 font-medium">
                        {testimonials[currentTestimonial].course}
                      </p>
                      <div className="flex items-center text-gray-500 text-sm mt-1">
                        <MapPin className="w-4 h-4 mr-1" />
                        {testimonials[currentTestimonial].location}
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="bg-gradient-to-r from-green-500 to-blue-500 text-white px-4 py-2 rounded-xl text-sm font-bold shadow-lg">
                        {testimonials[currentTestimonial].result}
                      </div>
                      <div className="text-xs text-gray-500 mt-1">NEET 2024 Result</div>
                    </div>
                  </div>
                </div>

                {/* Student Image & Video */}
                <div className="text-center">
                  <div className="relative inline-block">
                    <div className="w-48 h-48 mx-auto bg-navy-900 rounded-full flex items-center justify-center text-white relative overflow-hidden">
                      {/* Placeholder for student image */}
                      <Users className="w-24 h-24 opacity-80" />
                      {testimonials[currentTestimonial].videoId && (
                        <button
                          onClick={() => openVideoModal(testimonials[currentTestimonial].videoId!)}
                          className="absolute inset-0 bg-black/30 flex items-center justify-center hover:bg-black/40 transition-colors group"
                        >
                          <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                            <Play className="w-8 h-8 text-blue-600 ml-1" />
                          </div>
                        </button>
                      )}
                    </div>
                    <div className="absolute -bottom-2 -right-2 w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                      <Award className="w-6 h-6 text-white" />
                    </div>
                  </div>

                  {testimonials[currentTestimonial].videoId && (
                    <Button
                      variant="outline"
                      size="sm"
                      className="mt-4"
                      onClick={() => openVideoModal(testimonials[currentTestimonial].videoId!)}
                    >
                      <Play className="w-4 h-4 mr-2" />
                      Watch Video
                    </Button>
                  )}
                </div>
              </div>

              {/* Navigation Arrows */}
              <div className="flex justify-center mt-8 space-x-4">
                <button
                  onClick={prevTestimonial}
                  className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
                >
                  <ChevronLeft className="w-6 h-6 text-gray-600" />
                </button>
                <button
                  onClick={nextTestimonial}
                  className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors"
                >
                  <ChevronRight className="w-6 h-6 text-white" />
                </button>
              </div>

              {/* Dots Indicator */}
              <div className="flex justify-center mt-4 space-x-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentTestimonial(index)}
                    className={`w-3 h-3 rounded-full transition-colors ${
                      index === currentTestimonial ? 'bg-blue-600' : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Video Testimonials Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <h3 className="text-3xl font-bold text-center text-gray-900 mb-8">
            Video Success Stories
          </h3>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {videoTestimonials.map((video, index) => (
              <motion.div
                key={video.id}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow cursor-pointer group"
                onClick={() => openVideoModal(video.videoId)}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.7 + index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="relative aspect-video bg-navy-900">
                  {/* Placeholder thumbnail */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Youtube className="w-16 h-16 text-white opacity-80" />
                  </div>

                  {/* Play Button Overlay */}
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center group-hover:bg-black/40 transition-colors">
                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Play className="w-8 h-8 text-blue-600 ml-1" />
                    </div>
                  </div>

                  {/* Video Stats */}
                  <div className="absolute bottom-3 left-3 flex items-center space-x-2">
                    <span className="bg-black/70 text-white text-xs px-2 py-1 rounded">
                      {video.duration}
                    </span>
                    <span className="bg-black/70 text-white text-xs px-2 py-1 rounded">
                      {video.views} views
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <h4 className="font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                    {video.title}
                  </h4>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600 text-sm">{video.studentName}</span>
                    <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                      {video.result}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* NEET Rank Achievements Showcase */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              Specific NEET Ranks Achieved by Our Students
            </h3>
            <p className="text-xl text-gray-600">
              Real ranks, real students, real success stories from NEET 2024
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <motion.div
              className="bg-gradient-to-br from-yellow-50 to-orange-50 border-2 border-yellow-200 rounded-3xl p-8 text-center relative overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-yellow-200 rounded-full -translate-y-8 translate-x-8 opacity-30"></div>
              <div className="relative z-10">
                <div className="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="w-8 h-8 text-white" />
                </div>
                <div className="text-4xl font-bold text-yellow-900 mb-2">AIR 127</div>
                <div className="text-lg font-semibold text-yellow-800 mb-2">Arjun Sharma</div>
                <div className="text-sm text-yellow-700 mb-2">AIIMS New Delhi</div>
                <div className="text-xs text-yellow-600 font-medium bg-yellow-100 px-3 py-1 rounded-full inline-block">
                  Biology: 356/360 | Total: 695/720
                </div>
              </div>
            </motion.div>

            <motion.div
              className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 rounded-3xl p-8 text-center relative overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.9 }}
              viewport={{ once: true }}
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-green-200 rounded-full -translate-y-8 translate-x-8 opacity-30"></div>
              <div className="relative z-10">
                <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Star className="w-8 h-8 text-white" />
                </div>
                <div className="text-4xl font-bold text-green-900 mb-2">AIR 892</div>
                <div className="text-lg font-semibold text-green-800 mb-2">Ishita Verma</div>
                <div className="text-sm text-green-700 mb-2">AIIMS Rishikesh</div>
                <div className="text-xs text-green-600 font-medium bg-green-100 px-3 py-1 rounded-full inline-block">
                  Biology: 352/360 | Total: 672/720
                </div>
              </div>
            </motion.div>

            <motion.div
              className="bg-white border-2 border-navy-200 rounded-3xl p-8 text-center relative overflow-hidden shadow-sm"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.0 }}
              viewport={{ once: true }}
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-blue-200 rounded-full -translate-y-8 translate-x-8 opacity-30"></div>
              <div className="relative z-10">
                <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <div className="text-4xl font-bold text-blue-900 mb-2">AIR 1247</div>
                <div className="text-lg font-semibold text-blue-800 mb-2">Priya Agarwal</div>
                <div className="text-sm text-blue-700 mb-2">Lady Hardinge Medical</div>
                <div className="text-xs text-blue-600 font-medium bg-blue-100 px-3 py-1 rounded-full inline-block">
                  Biology: 348/360 | Total: 658/720
                </div>
              </div>
            </motion.div>
          </div>

          <div className="text-center mt-8">
            <p className="text-gray-600 mb-4">And many more success stories...</p>
            <div className="flex flex-wrap justify-center gap-2 text-sm">
              <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full">AIR 234</span>
              <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full">AIR 456</span>
              <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full">AIR 678</span>
              <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full">AIR 789</span>
              <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full">AIR 1023</span>
              <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full">AIR 1456</span>
              <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full">+241 more</span>
            </div>
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          className="text-center bg-navy-900 rounded-3xl p-12 text-white"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          viewport={{ once: true }}
        >
          <h3 className="text-4xl font-bold mb-4">Your NEET Success Story Awaits!</h3>
          <p className="text-xl mb-6 opacity-90">
            Join 2,847+ students who transformed from struggling to medical college success. Your
            rank could be next on our achievement board!
          </p>

          {/* Urgency Elements */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 mb-8 max-w-2xl mx-auto">
            <div className="flex items-center justify-center mb-4">
              <Clock className="w-5 h-5 mr-2" />
              <span className="font-semibold">Limited Seats for NEET 2025 Batch</span>
            </div>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold">67</div>
                <div className="text-sm opacity-80">Seats Left</div>
              </div>
              <div>
                <div className="text-2xl font-bold">₹50K</div>
                <div className="text-sm opacity-80">Early Bird Discount</div>
              </div>
              <div>
                <div className="text-2xl font-bold">15</div>
                <div className="text-sm opacity-80">Days Left</div>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Button
              variant="secondary_cta"
              size="xl"
              className="bg-white text-blue-600 hover:bg-gray-100 shadow-xl"
            >
              <Award className="w-5 h-5 mr-2" />
              Claim Your Seat Now
            </Button>
            <Button
              variant="outline"
              size="xl"
              className="border-white text-white hover:bg-white hover:text-blue-600"
            >
              <Play className="w-5 h-5 mr-2" />
              Watch More Success Stories
            </Button>
          </div>

          {/* Final Trust Indicators */}
          <div className="grid md:grid-cols-4 gap-6 text-center text-sm">
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mb-2">
                <Trophy className="w-6 h-6" />
              </div>
              <div className="font-semibold">Money Back</div>
              <div className="opacity-80">Guarantee</div>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mb-2">
                <Users className="w-6 h-6" />
              </div>
              <div className="font-semibold">1:1 Mentoring</div>
              <div className="opacity-80">Included Free</div>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mb-2">
                <BookOpen className="w-6 h-6" />
              </div>
              <div className="font-semibold">Study Material</div>
              <div className="opacity-80">Latest Edition</div>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mb-2">
                <Clock className="w-6 h-6" />
              </div>
              <div className="font-semibold">24/7 Support</div>
              <div className="opacity-80">Doubt Clearing</div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Video Modal */}
      {showVideoModal && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-4xl w-full aspect-video relative">
            <button
              onClick={closeVideoModal}
              className="absolute -top-12 right-0 text-white hover:text-gray-300 text-2xl font-bold"
            >
              ×
            </button>
            <div className="w-full h-full rounded-2xl overflow-hidden">
              <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${selectedVideo}?autoplay=1`}
                title="Student Testimonial"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="rounded-2xl"
              />
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
