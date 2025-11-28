'use client'

import Link from 'next/link'
import {
  Briefcase,
  Users,
  GraduationCap,
  Heart,
  Clock,
  MapPin,
  CheckCircle,
  ArrowRight,
  Star,
  Award,
  BookOpen,
  TrendingUp,
  Phone,
  Mail,
  Building,
  IndianRupee,
  Coffee,
  Laptop,
  Calendar,
} from 'lucide-react'

export default function CareersPage() {
  const openPositions = [
    {
      title: 'Senior Biology Faculty',
      type: 'Full-time',
      location: 'Patna / Remote',
      experience: '3-5 years',
      salary: '₹8-15 LPA',
      description:
        'Looking for experienced NEET Biology teachers with proven track record of student success. AIIMS/JIPMER graduates preferred.',
      requirements: [
        'MBBS/MD or M.Sc Biology with NEET coaching experience',
        'Excellent communication skills in Hindi and English',
        'Ability to create engaging video content',
        'Understanding of NEET exam patterns',
      ],
      benefits: ['Performance bonus', 'Flexible schedule', 'Professional development'],
      urgent: true,
    },
    {
      title: 'Junior Biology Faculty',
      type: 'Full-time',
      location: 'Patna',
      experience: '1-3 years',
      salary: '₹4-8 LPA',
      description:
        'Join our teaching team to help students master Biology concepts. Great opportunity for passionate educators.',
      requirements: [
        'M.Sc Biology or equivalent',
        'Strong grasp of NCERT Biology',
        'Enthusiasm for teaching',
        'Basic presentation skills',
      ],
      benefits: ['Mentorship from seniors', 'Training provided', 'Growth opportunities'],
      urgent: false,
    },
    {
      title: 'Content Developer - Biology',
      type: 'Full-time / Part-time',
      location: 'Remote',
      experience: '2+ years',
      salary: '₹5-10 LPA',
      description:
        'Create high-quality study materials, question banks, and video scripts for NEET Biology preparation.',
      requirements: [
        'Deep understanding of NEET Biology syllabus',
        'Excellent writing skills',
        'Experience with educational content',
        'Familiarity with NCERT and reference books',
      ],
      benefits: ['Work from home', 'Flexible hours', 'Creative freedom'],
      urgent: false,
    },
    {
      title: 'Academic Counselor',
      type: 'Full-time',
      location: 'Patna',
      experience: '1-2 years',
      salary: '₹3-5 LPA + Incentives',
      description:
        'Guide students and parents in choosing the right courses and support them throughout their NEET journey.',
      requirements: [
        'Graduate in any discipline',
        'Excellent communication skills',
        'Empathetic and patient approach',
        'Understanding of NEET ecosystem',
      ],
      benefits: ['Performance incentives', 'Student impact', 'Career growth'],
      urgent: true,
    },
    {
      title: 'Video Editor',
      type: 'Full-time',
      location: 'Patna / Remote',
      experience: '1-3 years',
      salary: '₹3-6 LPA',
      description:
        'Edit educational videos, add animations, and create engaging content for our online platform.',
      requirements: [
        'Proficiency in Adobe Premiere/Final Cut',
        'Experience with motion graphics',
        'Understanding of educational content',
        'Portfolio of previous work',
      ],
      benefits: ['Creative projects', 'Latest tools', 'Flexible work'],
      urgent: false,
    },
  ]

  const benefits = [
    {
      icon: IndianRupee,
      title: 'Competitive Salary',
      description: 'Industry-leading compensation with performance bonuses',
    },
    {
      icon: TrendingUp,
      title: 'Growth Opportunities',
      description: 'Clear career progression path and leadership roles',
    },
    {
      icon: BookOpen,
      title: 'Learning & Development',
      description: 'Regular training and professional development programs',
    },
    {
      icon: Heart,
      title: 'Health Benefits',
      description: 'Health insurance coverage for you and your family',
    },
    {
      icon: Coffee,
      title: 'Work-Life Balance',
      description: 'Flexible working hours and leave policies',
    },
    {
      icon: Laptop,
      title: 'Modern Workspace',
      description: 'Well-equipped office with latest teaching technology',
    },
    {
      icon: Users,
      title: 'Collaborative Culture',
      description: 'Work with passionate educators and innovative team',
    },
    {
      icon: Award,
      title: 'Recognition & Rewards',
      description: 'Regular appreciation for outstanding performance',
    },
  ]

  const values = [
    {
      title: 'Student First',
      description: 'Every decision we make prioritizes student success and learning outcomes.',
    },
    {
      title: 'Excellence in Teaching',
      description: 'We strive to deliver the highest quality education with innovative methods.',
    },
    {
      title: 'Continuous Learning',
      description: 'We believe in growing together - both students and educators.',
    },
    {
      title: 'Integrity',
      description: 'Honest communication and ethical practices in everything we do.',
    },
  ]

  const stats = [
    { number: '50+', label: 'Team Members', description: 'Across all departments' },
    { number: '5000+', label: 'Students Taught', description: 'Every year' },
    { number: '94%', label: 'Success Rate', description: 'NEET qualifications' },
    { number: '4.8/5', label: 'Employee Rating', description: 'On Glassdoor' },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-12 sm:py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="mb-6 sm:mb-8 flex justify-center">
            <div className="bg-white/20 backdrop-blur-md rounded-full px-4 sm:px-6 py-2 sm:py-3 inline-flex items-center gap-2 sm:gap-3 border border-white/30">
              <Briefcase className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-300" />
              <span className="text-xs sm:text-sm font-medium">We&apos;re Hiring!</span>
            </div>
          </div>

          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 leading-tight">
              Join Our Mission to Create <span className="text-yellow-300">Future Doctors</span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-indigo-100 mb-6 sm:mb-8">
              Be part of Bihar&apos;s leading NEET Biology coaching institute. Help students achieve
              their medical dreams while building your career in education.
            </p>

            <div className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-6 sm:mb-8 text-xs sm:text-sm">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-300" />
                <span>Competitive pay</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-300" />
                <span>Growth opportunities</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-300" />
                <span>Impactful work</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <Link
                href="#positions"
                className="bg-white text-indigo-600 px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-bold hover:bg-indigo-50 transition-all hover:scale-105 inline-flex items-center justify-center text-base sm:text-lg shadow-lg min-h-[44px]"
              >
                View Open Positions
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
              <a
                href="mailto:careers@cerebrumbiologyacademy.com"
                className="border-2 border-white text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold hover:bg-white hover:text-indigo-600 transition-colors inline-flex items-center justify-center min-h-[44px]"
              >
                <Mail className="w-5 h-5 mr-2" />
                Send Your Resume
              </a>
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
                <div className="text-2xl sm:text-3xl font-bold text-indigo-600 mb-1 sm:mb-2">
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

      {/* Why Join Us */}
      <section className="py-8 sm:py-12 md:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-8 sm:mb-10 md:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
              Why Join Cerebrum Biology Academy?
            </h2>
            <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto">
              We believe in investing in our team as much as our students
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon
              return (
                <div
                  key={index}
                  className="bg-gray-50 rounded-xl p-4 sm:p-6 text-center hover:shadow-md transition-shadow"
                >
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-indigo-100 rounded-lg flex items-center justify-center mx-auto mb-3 sm:mb-4">
                    <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-indigo-600" />
                  </div>
                  <h3 className="text-sm sm:text-base font-semibold text-gray-900 mb-1 sm:mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600">{benefit.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-8 sm:py-12 md:py-16 bg-indigo-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-8 sm:mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">Our Core Values</h2>
            <p className="text-sm sm:text-base text-gray-600">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-4 sm:gap-6">
            {values.map((value, index) => (
              <div key={index} className="bg-white rounded-xl p-5 sm:p-6 shadow-md">
                <div className="w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold mb-3">
                  {index + 1}
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{value.title}</h3>
                <p className="text-sm text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section id="positions" className="py-8 sm:py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-8 sm:mb-10 md:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
              Open Positions
            </h2>
            <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto">
              Find your perfect role and start making an impact
            </p>
          </div>

          <div className="space-y-6">
            {openPositions.map((position, index) => (
              <div
                key={index}
                className={`bg-white rounded-xl p-6 sm:p-8 shadow-lg hover:shadow-xl transition-shadow ${
                  position.urgent ? 'border-l-4 border-red-500' : ''
                }`}
              >
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 mb-4">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg sm:text-xl font-bold text-gray-900">
                        {position.title}
                      </h3>
                      {position.urgent && (
                        <span className="bg-red-100 text-red-700 text-xs font-semibold px-2 py-1 rounded-full">
                          Urgent Hiring
                        </span>
                      )}
                    </div>
                    <p className="text-sm sm:text-base text-gray-600 mb-3">
                      {position.description}
                    </p>
                    <div className="flex flex-wrap gap-3 text-sm text-gray-600">
                      <span className="flex items-center gap-1">
                        <Briefcase className="w-4 h-4" />
                        {position.type}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {position.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {position.experience}
                      </span>
                      <span className="flex items-center gap-1 text-green-600 font-medium">
                        <IndianRupee className="w-4 h-4" />
                        {position.salary}
                      </span>
                    </div>
                  </div>
                  <a
                    href={`mailto:careers@cerebrumbiologyacademy.com?subject=Application for ${position.title}`}
                    className="bg-indigo-600 text-white px-6 py-2.5 rounded-lg font-semibold hover:bg-indigo-700 transition-colors whitespace-nowrap inline-flex items-center justify-center min-h-[44px]"
                  >
                    Apply Now
                  </a>
                </div>

                <div className="grid md:grid-cols-2 gap-6 pt-4 border-t border-gray-100">
                  <div>
                    <h4 className="text-sm font-semibold text-gray-900 mb-2">Requirements</h4>
                    <ul className="space-y-1.5">
                      {position.requirements.map((req, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                          <CheckCircle className="w-4 h-4 text-indigo-600 mt-0.5 flex-shrink-0" />
                          {req}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-gray-900 mb-2">Benefits</h4>
                    <div className="flex flex-wrap gap-2">
                      {position.benefits.map((benefit, i) => (
                        <span
                          key={i}
                          className="bg-indigo-50 text-indigo-700 text-xs font-medium px-3 py-1 rounded-full"
                        >
                          {benefit}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Application Process */}
      <section className="py-8 sm:py-12 md:py-16 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-8 sm:mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
              Application Process
            </h2>
            <p className="text-sm sm:text-base text-gray-600">Simple 4-step hiring process</p>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            <div className="bg-white rounded-xl p-6 text-center shadow-md relative">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 w-6 h-6 bg-indigo-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                1
              </div>
              <Mail className="w-10 h-10 text-indigo-600 mx-auto mb-3" />
              <h3 className="font-bold text-gray-900 mb-2">Submit Resume</h3>
              <p className="text-sm text-gray-600">Send your CV to our careers email</p>
            </div>
            <div className="bg-white rounded-xl p-6 text-center shadow-md relative">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 w-6 h-6 bg-indigo-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                2
              </div>
              <Phone className="w-10 h-10 text-indigo-600 mx-auto mb-3" />
              <h3 className="font-bold text-gray-900 mb-2">Phone Screen</h3>
              <p className="text-sm text-gray-600">Initial discussion about your background</p>
            </div>
            <div className="bg-white rounded-xl p-6 text-center shadow-md relative">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 w-6 h-6 bg-indigo-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                3
              </div>
              <GraduationCap className="w-10 h-10 text-indigo-600 mx-auto mb-3" />
              <h3 className="font-bold text-gray-900 mb-2">Demo Class</h3>
              <p className="text-sm text-gray-600">Teaching demonstration (for faculty)</p>
            </div>
            <div className="bg-white rounded-xl p-6 text-center shadow-md relative">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 w-6 h-6 bg-indigo-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                4
              </div>
              <Award className="w-10 h-10 text-indigo-600 mx-auto mb-3" />
              <h3 className="font-bold text-gray-900 mb-2">Offer</h3>
              <p className="text-sm text-gray-600">Receive and accept your offer letter</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-8 sm:py-12 md:py-16 bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <Users className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-4 sm:mb-6 text-yellow-300" />
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6">
            Don&apos;t See a Suitable Position?
          </h2>
          <p className="text-base sm:text-lg text-indigo-100 mb-6 sm:mb-8 max-w-2xl mx-auto">
            We&apos;re always looking for talented individuals. Send us your resume and we&apos;ll
            reach out when a suitable opportunity arises.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6 sm:mb-8">
            <a
              href="mailto:careers@cerebrumbiologyacademy.com"
              className="bg-white text-indigo-600 px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-bold hover:bg-indigo-50 transition-colors inline-flex items-center justify-center min-h-[44px]"
            >
              <Mail className="w-5 h-5 mr-2" />
              careers@cerebrumbiologyacademy.com
            </a>
            <a
              href="tel:+918826444334"
              className="border-2 border-white text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold hover:bg-white hover:text-indigo-600 transition-colors inline-flex items-center justify-center min-h-[44px]"
            >
              <Phone className="w-5 h-5 mr-2" />
              +91 88264 44334
            </a>
          </div>

          <div className="flex items-center justify-center gap-2 text-sm">
            <MapPin className="w-4 h-4" />
            <span>Office: Patna, Bihar</span>
          </div>
        </div>
      </section>
    </div>
  )
}
