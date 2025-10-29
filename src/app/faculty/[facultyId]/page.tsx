import { notFound } from 'next/navigation'
import { Button } from '@/components/ui/Button'
import { facultyMembers } from '@/data/faculty'
import {
  Award,
  BookOpen,
  Star,
  Calendar,
  MessageSquare,
  ArrowLeft,
  CheckCircle,
  TrendingUp,
  Users,
  Clock,
  Target,
  Phone,
  Mail,
  Video,
  GraduationCap,
  Lightbulb,
  Quote,
} from 'lucide-react'
import { motion } from 'framer-motion'
import Link from 'next/link'

interface Props {
  params: Promise<{ facultyId: string }>
}

export async function generateMetadata({ params }: Props) {
  const { facultyId } = await params
  const faculty = facultyMembers.find((f) => f.id === facultyId)

  if (!faculty) {
    return {
      title: 'Faculty Not Found',
    }
  }

  return {
    title: `${faculty.name} - ${faculty.designation} | Cerebrum Biology Academy`,
    description: `Meet ${faculty.name}, ${faculty.qualification} with ${faculty.experience} experience. Expert in ${faculty.specialization.join(', ')}. ${faculty.bio}`,
    keywords: `${faculty.name}, ${faculty.designation}, biology faculty, NEET teacher, ${faculty.specialization.join(', ')}, medical coaching`,
  }
}

export default async function FacultyProfilePage({ params }: Props) {
  const { facultyId } = await params
  const faculty = facultyMembers.find((f) => f.id === facultyId)

  if (!faculty) {
    notFound()
  }

  const relatedFaculty = facultyMembers.filter((f) => f.id !== faculty.id).slice(0, 3)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Navigation */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <Link href="/faculty">
            <Button variant="outline" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Faculty
            </Button>
          </Link>
        </div>
      </div>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 text-center lg:text-left">
                <div className="w-32 h-32 bg-white/20 rounded-full flex items-center justify-center mx-auto lg:mx-0 mb-6">
                  <GraduationCap className="w-16 h-16 text-white" />
                </div>

                <h1 className="text-4xl font-bold mb-3">{faculty.name}</h1>
                <p className="text-xl text-blue-100 mb-2">{faculty.designation}</p>
                <p className="text-lg text-blue-200 mb-6">{faculty.qualification}</p>

                <div className="flex flex-wrap gap-2 justify-center lg:justify-start mb-6">
                  {faculty.specialization.map((spec, index) => (
                    <span key={index} className="px-3 py-1 bg-white/20 rounded-full text-sm">
                      {spec}
                    </span>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-white text-white hover:bg-white hover:text-blue-600"
                  >
                    <Calendar className="w-5 h-5 mr-2" />
                    Schedule Meeting
                  </Button>
                  <Button
                    variant="primary"
                    size="lg"
                    className="bg-white text-blue-600 hover:bg-gray-100"
                  >
                    <MessageSquare className="w-5 h-5 mr-2" />
                    Ask Question
                  </Button>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                <div className="flex items-center mb-4">
                  <Clock className="w-6 h-6 mr-3" />
                  <span className="text-lg font-semibold">Experience</span>
                </div>
                <p className="text-2xl font-bold">{faculty.experience}</p>
                <p className="text-blue-100">in NEET Coaching</p>
              </div>

              {faculty.successRate && (
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                  <div className="flex items-center mb-4">
                    <Target className="w-6 h-6 mr-3" />
                    <span className="text-lg font-semibold">Success Rate</span>
                  </div>
                  <p className="text-2xl font-bold">{faculty.successRate}%</p>
                  <p className="text-blue-100">Student Success</p>
                </div>
              )}

              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                <div className="flex items-center mb-4">
                  <Users className="w-6 h-6 mr-3" />
                  <span className="text-lg font-semibold">Teaching Style</span>
                </div>
                <p className="text-blue-100">{faculty.teachingStyle}</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-12">
              {/* Biography */}
              <motion.section
                className="bg-white rounded-3xl shadow-lg p-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-3xl font-bold text-gray-900 mb-6">About {faculty.name}</h2>
                <p className="text-lg text-gray-700 leading-relaxed">{faculty.bio}</p>
              </motion.section>

              {/* Achievements */}
              {faculty.achievements && (
                <motion.section
                  className="bg-white rounded-3xl shadow-lg p-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                >
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">
                    Achievements & Qualifications
                  </h2>
                  <div className="space-y-4">
                    {faculty.achievements.map((achievement, index) => (
                      <div key={index} className="flex items-start">
                        <CheckCircle className="w-6 h-6 text-green-500 mr-4 mt-1 flex-shrink-0" />
                        <p className="text-gray-700">{achievement}</p>
                      </div>
                    ))}
                  </div>
                </motion.section>
              )}

              {/* Student Testimonial */}
              {faculty.studentTestimonial && (
                <motion.section
                  className="bg-blue-50 rounded-3xl p-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <div className="flex items-center mb-6">
                    <Quote className="w-8 h-8 text-blue-600 mr-3" />
                    <h2 className="text-2xl font-bold text-gray-900">What Students Say</h2>
                  </div>
                  <blockquote className="text-lg text-gray-700 italic">
                    "{faculty.studentTestimonial}"
                  </blockquote>
                  <div className="flex items-center mt-4">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    ))}
                    <span className="ml-3 text-gray-600">- Anonymous Student</span>
                  </div>
                </motion.section>
              )}

              {/* Subject Expertise */}
              <motion.section
                className="bg-white rounded-3xl shadow-lg p-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Subject Expertise</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  {faculty.specialization.map((subject, index) => (
                    <div
                      key={index}
                      className="bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-2xl p-6"
                    >
                      <BookOpen className="w-8 h-8 mb-3" />
                      <h3 className="text-xl font-bold mb-2">{subject}</h3>
                      <p className="text-blue-100">Expert level teaching and conceptual clarity</p>
                    </div>
                  ))}
                </div>
              </motion.section>
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* Quick Contact */}
              <motion.div
                className="bg-white rounded-3xl shadow-lg p-8"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Get In Touch</h3>
                <div className="space-y-4">
                  <Button variant="primary" size="lg" className="w-full">
                    <Calendar className="w-5 h-5 mr-2" />
                    Book Demo Class
                  </Button>
                  <Button variant="outline" size="lg" className="w-full">
                    <MessageSquare className="w-5 h-5 mr-2" />
                    Ask Doubts
                  </Button>
                  <Button variant="outline" size="lg" className="w-full">
                    <Video className="w-5 h-5 mr-2" />
                    Video Call
                  </Button>
                </div>
              </motion.div>

              {/* Faculty Stats */}
              <motion.div
                className="bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-3xl p-8"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <h3 className="text-2xl font-bold mb-6">Faculty Stats</h3>
                <div className="space-y-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold mb-1">{faculty.experience}</div>
                    <div className="text-green-100">Teaching Experience</div>
                  </div>
                  {faculty.successRate && (
                    <div className="text-center">
                      <div className="text-3xl font-bold mb-1">{faculty.successRate}%</div>
                      <div className="text-green-100">Success Rate</div>
                    </div>
                  )}
                  <div className="text-center">
                    <div className="text-3xl font-bold mb-1">{faculty.specialization.length}</div>
                    <div className="text-green-100">Subject Areas</div>
                  </div>
                </div>
              </motion.div>

              {/* Related Faculty */}
              <motion.div
                className="bg-white rounded-3xl shadow-lg p-8"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Other Faculty</h3>
                <div className="space-y-4">
                  {relatedFaculty.map((relatedFac, index) => (
                    <Link key={relatedFac.id} href={`/faculty/${relatedFac.id}`}>
                      <div className="flex items-center p-4 bg-gray-50 rounded-2xl hover:bg-blue-50 transition-colors group cursor-pointer">
                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                          <GraduationCap className="w-6 h-6 text-blue-600" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900 group-hover:text-blue-600">
                            {relatedFac.name}
                          </h4>
                          <p className="text-sm text-gray-600">{relatedFac.designation}</p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
                <div className="mt-6">
                  <Link href="/faculty">
                    <Button variant="outline" className="w-full">
                      View All Faculty
                    </Button>
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-purple-600 to-blue-600 text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Learn from {faculty.name}?</h2>
          <p className="text-xl text-purple-100 mb-8">
            Join our academy and get personalized guidance from expert faculty with proven track
            records in NEET coaching.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              variant="outline"
              size="xl"
              className="border-white text-white hover:bg-white hover:text-purple-600"
            >
              <Calendar className="w-5 h-5 mr-2" />
              Book Demo Class
            </Button>
            <Link href="/contact">
              <Button
                variant="primary"
                size="xl"
                className="bg-white text-purple-600 hover:bg-gray-100"
              >
                Get Admission Info
              </Button>
            </Link>
          </div>

          <div className="mt-12 grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold mb-2">Free</div>
              <div className="text-purple-100">Demo Classes</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">1:1</div>
              <div className="text-purple-100">Faculty Interaction</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">24/7</div>
              <div className="text-purple-100">Doubt Support</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
