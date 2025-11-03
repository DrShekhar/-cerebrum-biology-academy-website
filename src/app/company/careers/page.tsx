'use client'

import { useState } from 'react'
import {
  Briefcase,
  MapPin,
  Clock,
  Users,
  GraduationCap,
  Heart,
  Lightbulb,
  Target,
  ChevronRight,
  Send,
  CheckCircle,
  Calendar,
  Building,
  TrendingUp,
  Award,
  Coffee,
  Gamepad2,
  Car,
  Stethoscope,
  BookOpen,
  Star,
  Globe,
  Shield,
  Zap,
} from 'lucide-react'
import { motion } from 'framer-motion'

export default function CareersPage() {
  const [selectedDepartment, setSelectedDepartment] = useState('all')
  const [applicationForm, setApplicationForm] = useState({
    name: '',
    email: '',
    phone: '',
    position: '',
    experience: '',
    resume: null as File | null,
    coverLetter: '',
  })

  const departments = [
    {
      id: 'all',
      name: 'All Positions',
      icon: Building,
      openings: 12,
    },
    {
      id: 'teaching',
      name: 'Teaching Faculty',
      icon: GraduationCap,
      openings: 6,
    },
    {
      id: 'management',
      name: 'Management',
      icon: Briefcase,
      openings: 3,
    },
    {
      id: 'technology',
      name: 'Technology',
      icon: Zap,
      openings: 2,
    },
    {
      id: 'support',
      name: 'Student Support',
      icon: Heart,
      openings: 1,
    },
  ]

  const openPositions = [
    {
      id: 1,
      title: 'Senior Biology Faculty',
      department: 'teaching',
      location: 'Delhi NCR (Multiple Locations)',
      type: 'Full-time',
      experience: '5+ years',
      salary: '₹8-15 LPA',
      urgent: true,
      description:
        'Looking for passionate Biology educators with proven track record in NEET coaching',
      requirements: [
        'M.Sc./Ph.D. in Biology/Life Sciences',
        '5+ years NEET coaching experience',
        'Excellent communication skills',
        'Proven student success rate',
      ],
      responsibilities: [
        'Conduct engaging biology classes for NEET aspirants',
        'Develop innovative teaching methodologies',
        'Mentoring and counseling students',
        'Creating study materials and test papers',
      ],
      benefits: [
        'Competitive salary with performance bonuses',
        'Health insurance for family',
        'Professional development opportunities',
        'Flexible working hours',
      ],
    },
    {
      id: 2,
      title: 'Junior Biology Faculty',
      department: 'teaching',
      location: 'Gurgaon, Noida',
      type: 'Full-time',
      experience: '2-4 years',
      salary: '₹5-8 LPA',
      urgent: false,
      description: 'Seeking energetic biology teachers to join our growing team',
      requirements: [
        'M.Sc. in Biology/Botany/Zoology',
        '2+ years teaching experience',
        'NEET coaching background preferred',
        'Strong subject knowledge',
      ],
      responsibilities: [
        'Teaching biology to Class 11, 12, and dropper students',
        'Conducting doubt clearing sessions',
        'Assisting in curriculum development',
        'Student performance tracking',
      ],
      benefits: [
        'Growth opportunities to senior positions',
        'Training and skill development programs',
        'Performance-based incentives',
        'Supportive work environment',
      ],
    },
    {
      id: 3,
      title: 'Academic Coordinator',
      department: 'management',
      location: 'Central Delhi',
      type: 'Full-time',
      experience: '3-5 years',
      salary: '₹6-10 LPA',
      urgent: false,
      description: 'Coordinate academic activities and ensure smooth operations',
      requirements: [
        'Graduate in any discipline, preferably Science',
        'Experience in educational institute management',
        'Strong organizational skills',
        'Leadership qualities',
      ],
      responsibilities: [
        'Coordinating academic schedules and activities',
        'Faculty management and support',
        'Student progress monitoring',
        'Liaison with parents and stakeholders',
      ],
      benefits: [
        'Leadership role with growth potential',
        'Comprehensive benefits package',
        'Work-life balance',
        'Professional recognition',
      ],
    },
    {
      id: 4,
      title: 'Student Counselor',
      department: 'support',
      location: 'Faridabad',
      type: 'Full-time',
      experience: '2-3 years',
      salary: '₹4-6 LPA',
      urgent: true,
      description: 'Provide psychological and academic support to NEET aspirants',
      requirements: [
        'Psychology/Counseling degree preferred',
        'Experience with teenage counseling',
        'Empathetic and patient personality',
        'Strong communication skills',
      ],
      responsibilities: [
        'One-on-one counseling sessions',
        'Group therapy and motivation sessions',
        'Stress management workshops',
        'Career guidance and planning',
      ],
      benefits: [
        'Meaningful work impacting student lives',
        'Flexible counseling hours',
        'Continuous training opportunities',
        'Supportive team environment',
      ],
    },
    {
      id: 5,
      title: 'Content Developer',
      department: 'technology',
      location: 'Remote/Ghaziabad',
      type: 'Full-time',
      experience: '3-5 years',
      salary: '₹7-12 LPA',
      urgent: false,
      description: 'Create digital content and learning materials for NEET preparation',
      requirements: [
        'Experience in educational content creation',
        'Knowledge of NEET syllabus and patterns',
        'Video production and editing skills',
        'Creative writing abilities',
      ],
      responsibilities: [
        'Developing online course content',
        'Creating video lectures and animations',
        'Designing interactive learning modules',
        'Quality assurance of educational materials',
      ],
      benefits: [
        'Remote work flexibility',
        'Creative freedom in content development',
        'Latest technology and tools',
        'Innovation-friendly environment',
      ],
    },
    {
      id: 6,
      title: 'Center Manager',
      department: 'management',
      location: 'Greater Noida',
      type: 'Full-time',
      experience: '5+ years',
      salary: '₹8-12 LPA',
      urgent: false,
      description: 'Manage overall operations of our Greater Noida center',
      requirements: [
        'MBA or equivalent management qualification',
        'Experience in educational center management',
        'Strong leadership and people skills',
        'Business development experience',
      ],
      responsibilities: [
        'Overall center operations management',
        'Staff recruitment and training',
        'Student admission and retention',
        'Financial planning and budgeting',
      ],
      benefits: [
        'Leadership position with autonomy',
        'Performance-based bonuses',
        'Career progression opportunities',
        'Comprehensive benefits package',
      ],
    },
  ]

  const companyValues = [
    {
      icon: Heart,
      title: 'Student First',
      description: 'Every decision we make prioritizes student success and well-being',
    },
    {
      icon: Lightbulb,
      title: 'Innovation',
      description: 'We constantly evolve our teaching methods and embrace new technologies',
    },
    {
      icon: Target,
      title: 'Excellence',
      description: 'We strive for the highest standards in education and professional growth',
    },
    {
      icon: Users,
      title: 'Collaboration',
      description: 'We work together as a team to achieve extraordinary results',
    },
  ]

  const benefits = [
    {
      icon: Stethoscope,
      title: 'Health Insurance',
      description: 'Comprehensive medical coverage for you and your family',
    },
    {
      icon: TrendingUp,
      title: 'Career Growth',
      description: 'Clear career progression paths and skill development programs',
    },
    {
      icon: Coffee,
      title: 'Work-Life Balance',
      description: 'Flexible hours and time off to maintain personal well-being',
    },
    {
      icon: BookOpen,
      title: 'Learning Budget',
      description: 'Annual budget for courses, conferences, and skill enhancement',
    },
    {
      icon: Award,
      title: 'Recognition',
      description: 'Regular appreciation and rewards for outstanding performance',
    },
    {
      icon: Car,
      title: 'Transportation',
      description: 'Cab facility for late working hours and convenient commute',
    },
  ]

  const workCulture = [
    {
      title: 'Open Communication',
      description: 'We believe in transparent, honest communication at all levels',
      stats: '95% employee satisfaction',
    },
    {
      title: 'Continuous Learning',
      description: 'Regular training sessions and professional development opportunities',
      stats: '40+ training hours annually',
    },
    {
      title: 'Innovation Freedom',
      description: 'Encourage new ideas and creative approaches to teaching',
      stats: '20+ innovations implemented',
    },
    {
      title: 'Work Flexibility',
      description: 'Hybrid work options and flexible scheduling where possible',
      stats: '4.7/5 work-life balance rating',
    },
  ]

  const filteredPositions =
    selectedDepartment === 'all'
      ? openPositions
      : openPositions.filter((position) => position.department === selectedDepartment)

  const handleApplicationSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    alert('Application submitted successfully! We will get back to you within 48 hours.')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl font-bold mb-6">
              Join Our Mission to Shape
              <span className="block text-yellow-300">Future Doctors</span>
            </h1>
            <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
              Be part of a passionate team dedicated to helping students achieve their medical
              dreams. We're looking for educators, innovators, and leaders who share our commitment
              to excellence.
            </p>
            <div className="flex flex-wrap justify-center gap-8 text-center">
              <div>
                <div className="text-3xl font-bold text-yellow-300">12</div>
                <div className="text-blue-200">Open Positions</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-yellow-300">6</div>
                <div className="text-blue-200">Center Locations</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-yellow-300">150+</div>
                <div className="text-blue-200">Team Members</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-yellow-300">98%</div>
                <div className="text-blue-200">Success Rate</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Company Values */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Values & Culture</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We foster an environment where passion meets purpose, and every team member
              contributes to student success.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-16">
            {companyValues.map((value, index) => (
              <motion.div
                key={index}
                className="text-center p-6 bg-gray-50 rounded-2xl hover:bg-blue-50 transition-colors duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <value.icon className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </motion.div>
            ))}
          </div>

          {/* Work Culture Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {workCulture.map((culture, index) => (
              <motion.div
                key={index}
                className="bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-2xl border border-blue-100"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <h3 className="text-lg font-bold text-gray-900 mb-2">{culture.title}</h3>
                <p className="text-gray-600 text-sm mb-3">{culture.description}</p>
                <div className="text-blue-600 font-semibold text-sm">{culture.stats}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Open Positions</h2>
            <p className="text-xl text-gray-600">
              Find the perfect role to advance your career and make a meaningful impact
            </p>
          </motion.div>

          {/* Department Filter */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {departments.map((dept) => (
              <button
                key={dept.id}
                onClick={() => setSelectedDepartment(dept.id)}
                className={`flex items-center space-x-2 px-6 py-3 rounded-full transition-all duration-300 ${
                  selectedDepartment === dept.id
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-white text-gray-700 hover:bg-blue-50 border border-gray-200'
                }`}
              >
                <dept.icon className="w-5 h-5" />
                <span className="font-medium">{dept.name}</span>
                <span
                  className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    selectedDepartment === dept.id
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-200 text-gray-600'
                  }`}
                >
                  {dept.openings}
                </span>
              </button>
            ))}
          </div>

          {/* Job Listings */}
          <div className="grid lg:grid-cols-2 gap-8">
            {filteredPositions.map((position, index) => (
              <motion.div
                key={position.id}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="p-8">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">{position.title}</h3>
                      <div className="flex items-center space-x-4 text-gray-600 mb-4">
                        <div className="flex items-center space-x-1">
                          <MapPin className="w-4 h-4" />
                          <span className="text-sm">{position.location}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="w-4 h-4" />
                          <span className="text-sm">{position.type}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Briefcase className="w-4 h-4" />
                          <span className="text-sm">{position.experience}</span>
                        </div>
                      </div>
                    </div>
                    {position.urgent && (
                      <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm font-semibold">
                        Urgent
                      </span>
                    )}
                  </div>

                  <p className="text-gray-600 mb-6">{position.description}</p>

                  <div className="space-y-4 mb-6">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Key Requirements:</h4>
                      <ul className="space-y-1">
                        {position.requirements.slice(0, 2).map((req, idx) => (
                          <li
                            key={idx}
                            className="flex items-center space-x-2 text-sm text-gray-600"
                          >
                            <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                            <span>{req}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="text-lg font-bold text-blue-600">{position.salary}</div>
                    <button className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition-colors duration-300 flex items-center space-x-2">
                      <span>Apply Now</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits & Perks */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Benefits & Perks</h2>
            <p className="text-xl text-gray-600">
              We invest in our team's growth, well-being, and happiness
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                className="bg-gradient-to-br from-blue-50 to-purple-50 p-8 rounded-2xl border border-blue-100 hover:shadow-lg transition-shadow duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <benefit.icon className="w-12 h-12 text-blue-600 mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Ready to Join Us?</h2>
            <p className="text-xl text-gray-600">
              Submit your application and take the first step towards a rewarding career
            </p>
          </motion.div>

          <motion.div
            className="bg-white rounded-3xl shadow-lg p-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <form onSubmit={handleApplicationSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter your full name"
                    value={applicationForm.name}
                    onChange={(e) =>
                      setApplicationForm({ ...applicationForm, name: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter your email"
                    value={applicationForm.email}
                    onChange={(e) =>
                      setApplicationForm({ ...applicationForm, email: e.target.value })
                    }
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter your phone number"
                    value={applicationForm.phone}
                    onChange={(e) =>
                      setApplicationForm({ ...applicationForm, phone: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Position Applied For *
                  </label>
                  <select
                    required
                    className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={applicationForm.position}
                    onChange={(e) =>
                      setApplicationForm({ ...applicationForm, position: e.target.value })
                    }
                  >
                    <option value="">Select a position</option>
                    {openPositions.map((position) => (
                      <option key={position.id} value={position.title}>
                        {position.title}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Years of Experience *
                </label>
                <select
                  required
                  className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={applicationForm.experience}
                  onChange={(e) =>
                    setApplicationForm({ ...applicationForm, experience: e.target.value })
                  }
                >
                  <option value="">Select experience level</option>
                  <option value="0-1">0-1 years</option>
                  <option value="1-3">1-3 years</option>
                  <option value="3-5">3-5 years</option>
                  <option value="5-10">5-10 years</option>
                  <option value="10+">10+ years</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Cover Letter
                </label>
                <textarea
                  rows={4}
                  className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Tell us why you're interested in this position and what makes you a great fit..."
                  value={applicationForm.coverLetter}
                  onChange={(e) =>
                    setApplicationForm({ ...applicationForm, coverLetter: e.target.value })
                  }
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Resume/CV *
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-blue-400 transition-colors duration-300">
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    required
                    className="hidden"
                    id="resume-upload"
                    onChange={(e) =>
                      setApplicationForm({
                        ...applicationForm,
                        resume: e.target.files?.[0] || null,
                      })
                    }
                  />
                  <label htmlFor="resume-upload" className="cursor-pointer">
                    <div className="text-gray-600">
                      <div className="mb-2">📄</div>
                      <div className="font-medium">Click to upload your resume</div>
                      <div className="text-sm">PDF, DOC, or DOCX (max 5MB)</div>
                    </div>
                  </label>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 flex items-center justify-center space-x-2 font-semibold"
              >
                <Send className="w-5 h-5" />
                <span>Submit Application</span>
              </button>
            </form>
          </motion.div>
        </div>
      </section>

      {/* Contact Info */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">Questions About Careers?</h2>
          <p className="text-xl text-blue-100 mb-8">
            Our HR team is here to help you with any questions about opportunities at Cerebrum
            Biology Academy
          </p>
          <div className="flex flex-wrap justify-center gap-8">
            <div className="flex items-center space-x-2">
              <Calendar className="w-5 h-5" />
              <span>Quick Response (24-48 hours)</span>
            </div>
            <div className="flex items-center space-x-2">
              <Building className="w-5 h-5" />
              <span>Multiple Locations Available</span>
            </div>
            <div className="flex items-center space-x-2">
              <Users className="w-5 h-5" />
              <span>Growing Team of 150+ Members</span>
            </div>
          </div>
          <div className="mt-8">
            <a
              href="mailto:careers@cerebrumbiologyacademy.com"
              className="inline-flex items-center space-x-2 bg-white text-blue-600 px-8 py-4 rounded-xl hover:bg-blue-50 transition-colors duration-300 font-semibold"
            >
              <Send className="w-5 h-5" />
              <span>careers@cerebrumbiologyacademy.com</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
