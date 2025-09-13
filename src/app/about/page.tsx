'use client'

import { Button } from '@/components/ui/Button'
import {
  Award,
  Users,
  BookOpen,
  Target,
  Star,
  TrendingUp,
  Clock,
  Shield,
  Heart,
  Lightbulb,
  Zap,
  CheckCircle,
  ArrowRight,
  Play,
  Building,
  Calendar,
  Trophy,
} from 'lucide-react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { facultyStats, facultyHighlights } from '@/data/faculty'

export default function AboutPage() {
  const milestones = [
    {
      year: '2015',
      title: 'Academy Founded',
      description: 'Started with a vision to make quality NEET coaching accessible to all students',
      icon: Building,
    },
    {
      year: '2017',
      title: 'First 100 Selections',
      description: 'Achieved remarkable success with 100 medical college selections in just 2 years',
      icon: Trophy,
    },
    {
      year: '2019',
      title: 'Digital Learning Platform',
      description: 'Launched comprehensive online learning platform for remote students',
      icon: BookOpen,
    },
    {
      year: '2021',
      title: 'AI-Powered Analytics',
      description: 'Integrated AI technology for personalized learning and performance tracking',
      icon: Zap,
    },
    {
      year: '2023',
      title: '2500+ Success Stories',
      description: 'Crossed 2500 successful NEET qualifications with 94% success rate',
      icon: Star,
    },
    {
      year: '2024',
      title: 'Research Institute',
      description: 'Established research wing for advanced NEET preparation methodologies',
      icon: Lightbulb,
    },
  ]

  const values = [
    {
      icon: Heart,
      title: 'Student-Centric Approach',
      description: 'Every decision we make prioritizes student success and well-being above everything else.',
      color: 'bg-red-500',
    },
    {
      icon: Shield,
      title: 'Academic Integrity',
      description: 'We maintain the highest standards of ethical teaching and honest guidance.',
      color: 'bg-blue-500',
    },
    {
      icon: Lightbulb,
      title: 'Innovation in Learning',
      description: 'Constantly evolving our teaching methods with latest educational technologies.',
      color: 'bg-yellow-500',
    },
    {
      icon: Users,
      title: 'Collaborative Growth',
      description: 'Building a community where students, faculty, and parents grow together.',
      color: 'bg-green-500',
    },
  ]

  const achievements = [
    { number: '2847', label: 'Students Coached', icon: Users },
    { number: '94.2%', label: 'Success Rate', icon: Target },
    { number: '247', label: 'Top 1000 Ranks', icon: Award },
    { number: '9', label: 'Years of Excellence', icon: Calendar },
  ]

  const methodology = [
    {
      step: '01',
      title: 'Diagnostic Assessment',
      description: 'Comprehensive evaluation to identify strengths and improvement areas',
      features: ['NEET-pattern mock test', 'Subject-wise analysis', 'Learning style assessment'],
    },
    {
      step: '02', 
      title: 'Personalized Study Plan',
      description: 'Custom learning path designed specifically for each student\'s needs',
      features: ['Individual goals setting', 'Customized schedule', 'Resource allocation'],
    },
    {
      step: '03',
      title: 'Expert Teaching & Mentoring',
      description: 'World-class faculty providing conceptual clarity and strategic guidance',
      features: ['PhD & MBBS faculty', 'Small batch sizes', '1-on-1 mentoring'],
    },
    {
      step: '04',
      title: 'Continuous Monitoring',
      description: 'Regular assessments and feedback to ensure steady progress',
      features: ['Weekly progress reports', 'Parent communication', 'Performance analytics'],
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <motion.h1 
                className="text-5xl font-bold mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                About Cerebrum Biology Academy
              </motion.h1>
              <motion.p 
                className="text-xl text-blue-100 mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                Established in 2015, we are India's premier NEET Biology coaching institute 
                committed to nurturing future medical professionals through innovative teaching 
                methodologies and personalized mentoring.
              </motion.p>
              <motion.div 
                className="flex flex-col sm:flex-row gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-blue-600">
                  <Play className="w-5 h-5 mr-2" />
                  Watch Our Story
                </Button>
                <Link href="/contact">
                  <Button variant="primary" size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                    Get Started Today
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
              </motion.div>
            </div>

            <motion.div 
              className="relative"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8">
                <h3 className="text-2xl font-bold mb-6">Our Impact</h3>
                <div className="grid grid-cols-2 gap-6">
                  {achievements.map((achievement, index) => (
                    <div key={index} className="text-center">
                      <achievement.icon className="w-8 h-8 mx-auto mb-3" />
                      <div className="text-3xl font-bold mb-1">{achievement.number}</div>
                      <div className="text-blue-100 text-sm">{achievement.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="bg-blue-50 rounded-3xl p-8">
                <Target className="w-16 h-16 text-blue-600 mb-6" />
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Mission</h2>
                <p className="text-gray-700 text-lg leading-relaxed">
                  To democratize quality NEET preparation by providing world-class biology education 
                  that combines traditional teaching excellence with modern learning technologies, 
                  ensuring every student achieves their medical career aspirations.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="bg-purple-50 rounded-3xl p-8">
                <Lightbulb className="w-16 h-16 text-purple-600 mb-6" />
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Vision</h2>
                <p className="text-gray-700 text-lg leading-relaxed">
                  To become India's most trusted and innovative NEET coaching institute, 
                  recognized for producing confident, competent medical professionals who 
                  contribute meaningfully to healthcare and society.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Core Values</h2>
            <p className="text-xl text-gray-600">The principles that guide everything we do</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-3xl shadow-lg p-8 text-center hover:shadow-xl transition-shadow"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className={`w-16 h-16 ${value.color} rounded-full flex items-center justify-center mx-auto mb-6`}>
                  <value.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Journey */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Journey</h2>
            <p className="text-xl text-gray-600">Nine years of continuous innovation and growth</p>
          </div>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-blue-200"></div>

            <div className="space-y-16">
              {milestones.map((milestone, index) => (
                <motion.div
                  key={index}
                  className={`flex items-center ${
                    index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                  }`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <div className={`lg:w-1/2 ${index % 2 === 0 ? 'lg:pr-12' : 'lg:pl-12'}`}>
                    <div className="bg-white rounded-3xl shadow-lg p-8">
                      <div className={`flex items-center mb-4 ${
                        index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                      }`}>
                        <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                          <milestone.icon className="w-6 h-6 text-white" />
                        </div>
                        <div className={`${index % 2 === 0 ? 'lg:ml-4' : 'lg:mr-4'}`}>
                          <div className="text-2xl font-bold text-blue-600">{milestone.year}</div>
                        </div>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-3">{milestone.title}</h3>
                      <p className="text-gray-600">{milestone.description}</p>
                    </div>
                  </div>
                  
                  {/* Timeline Dot */}
                  <div className="relative lg:w-4 lg:h-4 lg:bg-blue-600 lg:rounded-full lg:z-10 lg:mx-auto"></div>
                  
                  <div className="lg:w-1/2"></div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Our Methodology */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Teaching Methodology</h2>
            <p className="text-xl text-gray-600">Scientifically designed approach for maximum results</p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            {methodology.map((method, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-3xl shadow-lg p-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="flex items-center mb-6">
                  <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center">
                    <span className="text-2xl font-bold text-white">{method.step}</span>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-xl font-bold text-gray-900">{method.title}</h3>
                  </div>
                </div>
                
                <p className="text-gray-600 mb-6">{method.description}</p>
                
                <div className="space-y-3">
                  {method.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Faculty Excellence */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Faculty Excellence</h2>
              <p className="text-xl text-gray-600 mb-8">
                Our teaching team comprises PhD holders, MBBS graduates from premier institutes, 
                and industry experts with decades of NEET coaching experience.
              </p>
              
              <div className="space-y-4 mb-8">
                {facultyHighlights.map((highlight, index) => (
                  <div key={index} className="flex items-center">
                    <CheckCircle className="w-6 h-6 text-green-500 mr-3" />
                    <span className="text-gray-700">{highlight}</span>
                  </div>
                ))}
              </div>

              <Link href="/faculty">
                <Button variant="primary" size="lg">
                  Meet Our Faculty
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-2 gap-6">
              {facultyStats.map((stat, index) => (
                <motion.div
                  key={index}
                  className="bg-blue-50 rounded-2xl p-6 text-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className="text-3xl font-bold text-blue-600 mb-2">{stat.number}</div>
                  <div className="text-gray-900 font-semibold mb-1">{stat.label}</div>
                  <div className="text-sm text-gray-600">{stat.description}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-green-600 to-blue-600 text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Join Our Success Story
          </h2>
          <p className="text-xl text-green-100 mb-8">
            Become part of our legacy of excellence and achieve your medical career dreams with 
            India's most trusted NEET coaching institute.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/courses">
              <Button variant="outline" size="xl" className="border-white text-white hover:bg-white hover:text-green-600">
                View Our Courses
              </Button>
            </Link>
            <Link href="/contact">
              <Button variant="primary" size="xl" className="bg-white text-green-600 hover:bg-gray-100">
                Book Free Consultation
              </Button>
            </Link>
          </div>

          <div className="mt-12 grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold mb-2">2847+</div>
              <div className="text-green-100">Students Coached</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">94.2%</div>
              <div className="text-green-100">Success Rate</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">247</div>
              <div className="text-green-100">Top 1000 Ranks</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">9</div>
              <div className="text-green-100">Years Excellence</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

