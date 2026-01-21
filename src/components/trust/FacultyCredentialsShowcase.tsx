'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  GraduationCap,
  Award,
  BookOpen,
  Users,
  Star,
  Calendar,
  MapPin,
  ExternalLink,
  Play,
  ChevronDown,
  ChevronUp,
  Medal,
  Trophy,
  Target,
  Briefcase,
  Clock,
  TrendingUp,
  User,
} from 'lucide-react'
import { getPlaceholderAvatar } from '@/lib/images/imageUtils'

interface FacultyMember {
  id: string
  name: string
  photo: string
  designation: string
  specialization: string[]

  education: {
    degree: string
    institution: string
    year: number
    rank?: number
  }[]

  experience: {
    totalYears: number
    teachingYears: number
    researchYears?: number
    industryYears?: number
  }

  achievements: {
    publicationsCount?: number
    awardsCount: number
    studentsGuided: number
    successRate: number
    topRanksProduced: number
  }

  expertise: {
    subjects: string[]
    examBoards: string[]
    specialAreas: string[]
  }

  credentials: {
    certifications: string[]
    memberships: string[]
    patents?: string[]
  }

  testimonials: {
    studentQuote: string
    studentName: string
    studentRank: number
  }[]

  socialProof: {
    linkedIn?: string
    researchGate?: string
    googleScholar?: string
    videoIntroUrl?: string
  }

  currentRole: {
    department: string
    responsibilities: string[]
    coursesHandling: string[]
  }

  bio: string
  personalQuote: string
  availability: 'full-time' | 'part-time' | 'guest'
}

interface FacultyCredentialsShowcaseProps {
  showVideoIntros?: boolean
  filterBySubject?: string
  className?: string
}

// Mock faculty data with realistic credentials
const FACULTY_MEMBERS: FacultyMember[] = [
  {
    id: '1',
    name: 'Dr. Rajesh Kumar Singh',
    photo: getPlaceholderAvatar('Dr. Rajesh Kumar Singh', 200, '1E40AF', 'fff'),
    designation: 'Head of Biology Department',
    specialization: ['Molecular Biology', 'Genetics', 'Cell Biology'],

    education: [
      {
        degree: 'Ph.D. in Molecular Biology',
        institution: 'AIIMS New Delhi',
        year: 2008,
        rank: 2,
      },
      {
        degree: 'M.Sc. Biology',
        institution: 'Delhi University',
        year: 2004,
        rank: 1,
      },
      {
        degree: 'B.Sc. (Hons) Biology',
        institution: "St. Stephen's College",
        year: 2002,
        rank: 3,
      },
    ],

    experience: {
      totalYears: 16,
      teachingYears: 12,
      researchYears: 8,
      industryYears: 4,
    },

    achievements: {
      publicationsCount: 45,
      awardsCount: 8,
      studentsGuided: 2500,
      successRate: 96.8,
      topRanksProduced: 156,
    },

    expertise: {
      subjects: ['Biology', 'Molecular Biology', 'Genetics', 'Cell Biology', 'Biotechnology'],
      examBoards: ['NEET', 'AIIMS', 'JIPMER', 'CBSE', 'State Boards'],
      specialAreas: ['NEET Biology Strategy', 'Genetics Problem Solving', 'Cell Biology Concepts'],
    },

    credentials: {
      certifications: [
        'Certified NEET Biology Expert',
        'Advanced Teaching Methodology',
        'Research Methodology Certification',
      ],
      memberships: [
        'Indian Association of Biomedical Scientists',
        'Association of Biology Teachers',
        'International Society for Molecular Biology',
      ],
      patents: ['Method for Enhanced Biology Learning', 'Interactive Genetics Teaching Tool'],
    },

    testimonials: [
      {
        studentQuote:
          "Dr. Singh's genetics classes were game-changing. His problem-solving approach helped me score 98% in Biology.",
        studentName: 'Priya Sharma',
        studentRank: 42,
      },
      {
        studentQuote:
          'The way he explains molecular biology concepts is unmatched. Made complex topics seem simple.',
        studentName: 'Arjun Patel',
        studentRank: 156,
      },
    ],

    socialProof: {
      linkedIn: 'https://linkedin.com/in/drrajeshsingh',
      googleScholar: 'https://scholar.google.com/citations?user=example',
      videoIntroUrl: 'https://youtube.com/watch?v=faculty1',
    },

    currentRole: {
      department: 'Molecular Biology & Genetics',
      responsibilities: [
        'NEET Biology curriculum design',
        'Advanced genetics problem solving',
        'Research-based teaching methodology',
      ],
      coursesHandling: ['Pinnacle Biology', 'Ascent Genetics', 'Advanced Molecular Biology'],
    },

    bio: 'Dr. Rajesh Kumar Singh is a renowned molecular biologist with extensive research and teaching experience. Having guided over 2,500 NEET aspirants, he specializes in making complex biological concepts accessible and exam-oriented.',
    personalQuote:
      "Biology is not just about memorization, it's about understanding the beautiful complexity of life and applying that knowledge strategically.",
    availability: 'full-time',
  },

  {
    id: '2',
    name: 'Dr. Priya Mehta',
    photo: getPlaceholderAvatar('Dr. Priya Mehta', 200, '059669', 'fff'),
    designation: 'Senior Botany Faculty',
    specialization: ['Plant Physiology', 'Plant Anatomy', 'Ecology'],

    education: [
      {
        degree: 'Ph.D. in Plant Physiology',
        institution: 'JNU New Delhi',
        year: 2010,
      },
      {
        degree: 'M.Sc. Botany',
        institution: 'Delhi University',
        year: 2006,
        rank: 2,
      },
    ],

    experience: {
      totalYears: 14,
      teachingYears: 14,
      researchYears: 6,
    },

    achievements: {
      publicationsCount: 32,
      awardsCount: 5,
      studentsGuided: 1800,
      successRate: 94.5,
      topRanksProduced: 89,
    },

    expertise: {
      subjects: ['Botany', 'Plant Physiology', 'Ecology', 'Environmental Biology'],
      examBoards: ['NEET', 'CBSE', 'State Boards'],
      specialAreas: ['NEET Botany Strategy', 'Plant Anatomy Visualization', 'Ecology Concepts'],
    },

    credentials: {
      certifications: [
        'Advanced Botany Teaching',
        'Environmental Education Specialist',
        'NEET Biology Expert',
      ],
      memberships: [
        'Indian Botanical Society',
        'Association of Plant Biology Teachers',
        'Environmental Biology Council',
      ],
    },

    testimonials: [
      {
        studentQuote:
          'Dr. Mehta made botany my strongest subject. Her visual teaching methods are exceptional.',
        studentName: 'Sneha Reddy',
        studentRank: 289,
      },
    ],

    socialProof: {
      linkedIn: 'https://linkedin.com/in/drpriyamehta',
      videoIntroUrl: 'https://youtube.com/watch?v=faculty2',
    },

    currentRole: {
      department: 'Botany & Plant Sciences',
      responsibilities: [
        'NEET Botany curriculum development',
        'Plant anatomy visualization',
        'Ecology concept simplification',
      ],
      coursesHandling: ['Ascent Botany', 'Pursuit Plant Biology', 'Advanced Ecology'],
    },

    bio: 'Dr. Priya Mehta brings 14 years of dedicated botany teaching experience, specializing in making plant sciences engaging and memorable for NEET aspirants through innovative visual methods.',
    personalQuote:
      'Plants teach us the fundamentals of life - understanding them deeply unlocks the secrets of biology.',
    availability: 'full-time',
  },

  {
    id: '3',
    name: 'Dr. Amit Sharma',
    photo: getPlaceholderAvatar('Dr. Amit Sharma', 200, '7C3AED', 'fff'),
    designation: 'Zoology & Human Physiology Expert',
    specialization: ['Human Physiology', 'Animal Behavior', 'Evolution'],

    education: [
      {
        degree: 'Ph.D. in Zoology',
        institution: 'University of Delhi',
        year: 2009,
      },
      {
        degree: 'M.Sc. Zoology',
        institution: 'Hindu College, DU',
        year: 2005,
        rank: 1,
      },
    ],

    experience: {
      totalYears: 15,
      teachingYears: 13,
      researchYears: 5,
    },

    achievements: {
      publicationsCount: 28,
      awardsCount: 6,
      studentsGuided: 2200,
      successRate: 95.2,
      topRanksProduced: 134,
    },

    expertise: {
      subjects: [
        'Zoology',
        'Human Physiology',
        'Animal Behavior',
        'Evolution',
        'Comparative Anatomy',
      ],
      examBoards: ['NEET', 'AIIMS', 'CBSE'],
      specialAreas: [
        'NEET Zoology Mastery',
        'Human Physiology Systems',
        'Evolution Problem Solving',
      ],
    },

    credentials: {
      certifications: [
        'Advanced Zoology Teaching',
        'Human Physiology Specialist',
        'Evolution Education Expert',
      ],
      memberships: [
        'Zoological Society of India',
        'Indian Society of Evolutionary Biologists',
        'Association of Physiology Teachers',
      ],
    },

    testimonials: [
      {
        studentQuote:
          "Dr. Sharma's human physiology classes were incredibly detailed yet easy to understand. Helped me score full marks.",
        studentName: 'Rahul Kumar',
        studentRank: 523,
      },
    ],

    socialProof: {
      linkedIn: 'https://linkedin.com/in/dramitsharma',
      researchGate: 'https://researchgate.net/profile/amit-sharma',
      videoIntroUrl: 'https://youtube.com/watch?v=faculty3',
    },

    currentRole: {
      department: 'Zoology & Animal Sciences',
      responsibilities: [
        'NEET Zoology strategy development',
        'Human physiology system integration',
        'Evolution concept clarity',
      ],
      coursesHandling: ['Pinnacle Zoology', 'Ascent Human Physiology', 'Evolution Mastery'],
    },

    bio: 'Dr. Amit Sharma is a distinguished zoology expert with over 15 years of teaching experience. He excels in making human physiology and evolutionary concepts crystal clear for NEET success.',
    personalQuote:
      'Understanding animal life, especially human physiology, is the key to unlocking high scores in NEET Biology.',
    availability: 'full-time',
  },
]

function FacultyCard({ faculty }: { faculty: FacultyMember }) {
  const [showFullBio, setShowFullBio] = useState(false)
  const [activeTab, setActiveTab] = useState<'overview' | 'credentials' | 'testimonials'>(
    'overview'
  )

  const getAvailabilityColor = (availability: string) => {
    switch (availability) {
      case 'full-time':
        return 'bg-green-100 text-green-800'
      case 'part-time':
        return 'bg-blue-100 text-blue-800'
      case 'guest':
        return 'bg-purple-100 text-purple-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden"
    >
      {/* Header */}
      <div className="bg-indigo-500 text-white p-6 relative">
        {/* Video intro button */}
        {faculty.socialProof.videoIntroUrl && (
          <button className="absolute top-4 right-4 bg-red-600 text-white p-2 rounded-full hover:bg-red-700 transition-colors">
            <Play className="w-4 h-4 fill-current" />
          </button>
        )}

        <div className="flex items-start space-x-4">
          <img
            src={faculty.photo}
            alt={faculty.name}
            className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-lg"
          />

          <div className="flex-grow">
            <h3 className="text-2xl font-bold mb-1">{faculty.name}</h3>
            <p className="text-blue-100 font-medium">{faculty.designation}</p>

            <div className="flex flex-wrap gap-2 mt-2">
              {faculty.specialization.slice(0, 2).map((spec, index) => (
                <span
                  key={index}
                  className="bg-white/20 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-medium"
                >
                  {spec}
                </span>
              ))}
              {faculty.specialization.length > 2 && (
                <span className="bg-white/20 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-medium">
                  +{faculty.specialization.length - 2} more
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Quick stats */}
        <div className="grid grid-cols-3 gap-4 mt-4">
          <div className="text-center">
            <div className="text-lg font-bold">{faculty.experience.teachingYears}+</div>
            <div className="text-xs text-blue-100">Years Teaching</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold">{faculty.achievements.studentsGuided}+</div>
            <div className="text-xs text-blue-100">Students Guided</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold">{faculty.achievements.successRate}%</div>
            <div className="text-xs text-blue-100">Success Rate</div>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex border-b border-gray-200">
        {[
          { key: 'overview', label: 'Overview', icon: User },
          { key: 'credentials', label: 'Credentials', icon: Award },
          { key: 'testimonials', label: 'Reviews', icon: Star },
        ].map((tab) => {
          const IconComponent = tab.icon
          return (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as any)}
              className={`flex-1 py-3 px-4 text-sm font-medium border-b-2 transition-colors ${
                activeTab === tab.key
                  ? 'border-blue-500 text-blue-600 bg-blue-50'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              <IconComponent className="w-4 h-4 inline mr-2" />
              {tab.label}
            </button>
          )
        })}
      </div>

      {/* Tab Content */}
      <div className="p-6">
        <AnimatePresence mode="wait">
          {activeTab === 'overview' && (
            <motion.div
              key="overview"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-4"
            >
              {/* Bio */}
              <div>
                <p className={`text-gray-700 ${showFullBio ? '' : 'line-clamp-3'}`}>
                  {faculty.bio}
                </p>
                <button
                  onClick={() => setShowFullBio(!showFullBio)}
                  className="text-blue-600 hover:text-blue-700 text-sm mt-2 font-medium"
                >
                  {showFullBio ? 'Show less' : 'Read more'}
                </button>
              </div>

              {/* Personal Quote */}
              <div className="bg-blue-50 border-l-4 border-blue-500 p-4 italic">
                <p className="text-gray-700">"{faculty.personalQuote}"</p>
              </div>

              {/* Key Achievements Grid */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-green-50 rounded-lg p-4 text-center">
                  <TrendingUp className="w-6 h-6 text-green-600 mx-auto mb-2" />
                  <div className="text-lg font-bold text-green-900">
                    {faculty.achievements.topRanksProduced}
                  </div>
                  <div className="text-sm text-green-700">Top Ranks Produced</div>
                </div>

                {faculty.achievements.publicationsCount && (
                  <div className="bg-blue-50 rounded-lg p-4 text-center">
                    <BookOpen className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                    <div className="text-lg font-bold text-blue-900">
                      {faculty.achievements.publicationsCount}
                    </div>
                    <div className="text-sm text-blue-700">Research Publications</div>
                  </div>
                )}

                <div className="bg-purple-50 rounded-lg p-4 text-center">
                  <Award className="w-6 h-6 text-purple-600 mx-auto mb-2" />
                  <div className="text-lg font-bold text-purple-900">
                    {faculty.achievements.awardsCount}
                  </div>
                  <div className="text-sm text-purple-700">Awards Received</div>
                </div>

                <div className="bg-orange-50 rounded-lg p-4 text-center">
                  <Clock className="w-6 h-6 text-orange-600 mx-auto mb-2" />
                  <div className="text-lg font-bold text-orange-900">
                    {faculty.experience.totalYears}
                  </div>
                  <div className="text-sm text-orange-700">Years Experience</div>
                </div>
              </div>

              {/* Current Role */}
              <div>
                <h4 className="font-semibold text-gray-900 mb-2 flex items-center">
                  <Briefcase className="w-4 h-4 mr-2" />
                  Current Responsibilities
                </h4>
                <ul className="space-y-1">
                  {faculty.currentRole.responsibilities.map((responsibility, index) => (
                    <li key={index} className="text-sm text-gray-700 flex items-start">
                      <span className="text-blue-600 mr-2">•</span>
                      {responsibility}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          )}

          {activeTab === 'credentials' && (
            <motion.div
              key="credentials"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              {/* Education */}
              <div>
                <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                  <GraduationCap className="w-4 h-4 mr-2" />
                  Education
                </h4>
                <div className="space-y-3">
                  {faculty.education.map((edu, index) => (
                    <div key={index} className="border rounded-lg p-3">
                      <div className="font-medium text-gray-900">{edu.degree}</div>
                      <div className="text-sm text-gray-600">{edu.institution}</div>
                      <div className="flex justify-between items-center mt-1">
                        <span className="text-sm text-gray-500">{edu.year}</span>
                        {edu.rank && (
                          <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs font-medium">
                            Rank {edu.rank}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Certifications */}
              <div>
                <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                  <Medal className="w-4 h-4 mr-2" />
                  Certifications
                </h4>
                <div className="flex flex-wrap gap-2">
                  {faculty.credentials.certifications.map((cert, index) => (
                    <span
                      key={index}
                      className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium"
                    >
                      {cert}
                    </span>
                  ))}
                </div>
              </div>

              {/* Professional Memberships */}
              <div>
                <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                  <Users className="w-4 h-4 mr-2" />
                  Professional Memberships
                </h4>
                <ul className="space-y-1">
                  {faculty.credentials.memberships.map((membership, index) => (
                    <li key={index} className="text-sm text-gray-700 flex items-center">
                      <span className="w-2 h-2 bg-green-600 rounded-full mr-2"></span>
                      {membership}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Patents (if any) */}
              {faculty.credentials.patents && (
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                    <Trophy className="w-4 h-4 mr-2" />
                    Patents & Innovations
                  </h4>
                  <ul className="space-y-1">
                    {faculty.credentials.patents.map((patent, index) => (
                      <li key={index} className="text-sm text-gray-700 flex items-center">
                        <span className="text-purple-600 mr-2">🔬</span>
                        {patent}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Social Links */}
              <div className="flex space-x-3">
                {faculty.socialProof.linkedIn && (
                  <a
                    href={faculty.socialProof.linkedIn}
                    target="_blank" rel="noopener noreferrer"
                    rel="noopener noreferrer"
                    className="flex items-center text-blue-600 hover:text-blue-700 text-sm font-medium"
                  >
                    <ExternalLink className="w-4 h-4 mr-1" />
                    LinkedIn
                  </a>
                )}
                {faculty.socialProof.googleScholar && (
                  <a
                    href={faculty.socialProof.googleScholar}
                    target="_blank" rel="noopener noreferrer"
                    rel="noopener noreferrer"
                    className="flex items-center text-green-600 hover:text-green-700 text-sm font-medium"
                  >
                    <ExternalLink className="w-4 h-4 mr-1" />
                    Google Scholar
                  </a>
                )}
              </div>
            </motion.div>
          )}

          {activeTab === 'testimonials' && (
            <motion.div
              key="testimonials"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-4"
            >
              {faculty.testimonials.map((testimonial, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-4">
                  <p className="text-gray-700 italic mb-3">"{testimonial.studentQuote}"</p>
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="font-medium text-gray-900">{testimonial.studentName}</div>
                      <div className="text-sm text-gray-600">NEET Student</div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-blue-600">
                        #{testimonial.studentRank}
                      </div>
                      <div className="text-sm text-gray-600">NEET Rank</div>
                    </div>
                  </div>
                </div>
              ))}

              {/* Overall student feedback */}
              <div className="bg-blue-50 rounded-lg p-4 text-center">
                <Star className="w-8 h-8 text-yellow-500 mx-auto mb-2 fill-current" />
                <div className="text-2xl font-bold text-gray-900">
                  {faculty.achievements.successRate}%
                </div>
                <div className="text-sm text-gray-600">Student Success Rate</div>
                <div className="text-xs text-gray-500 mt-1">
                  Based on {faculty.achievements.studentsGuided}+ students guided
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Footer */}
      <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <span
              className={`px-3 py-1 rounded-full text-xs font-medium ${getAvailabilityColor(faculty.availability)}`}
            >
              {faculty.availability.replace('-', ' ').toUpperCase()}
            </span>
            <span className="text-sm text-gray-600">
              Handling {faculty.currentRole.coursesHandling.length} course(s)
            </span>
          </div>

          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
            Schedule 1-on-1 Session
          </button>
        </div>
      </div>
    </motion.div>
  )
}

export default function FacultyCredentialsShowcase({
  showVideoIntros = true,
  filterBySubject,
  className = '',
}: FacultyCredentialsShowcaseProps) {
  const [selectedDepartment, setSelectedDepartment] = useState<string>('all')

  const departments = ['all', 'Molecular Biology', 'Botany', 'Zoology', 'Genetics', 'Physiology']

  const filteredFaculty =
    selectedDepartment === 'all'
      ? FACULTY_MEMBERS
      : FACULTY_MEMBERS.filter((faculty) =>
          faculty.specialization.some((spec) =>
            spec.toLowerCase().includes(selectedDepartment.toLowerCase())
          )
        )

  const totalExperience = FACULTY_MEMBERS.reduce(
    (sum, faculty) => sum + faculty.experience.teachingYears,
    0
  )
  const totalStudents = FACULTY_MEMBERS.reduce(
    (sum, faculty) => sum + faculty.achievements.studentsGuided,
    0
  )
  const averageSuccessRate =
    FACULTY_MEMBERS.reduce((sum, faculty) => sum + faculty.achievements.successRate, 0) /
    FACULTY_MEMBERS.length

  return (
    <div
      className={`bg-gradient-to-br from-slate-50 to-blue-50 rounded-2xl overflow-hidden ${className}`}
    >
      {/* Header */}
      <div className="bg-indigo-500 text-white p-8">
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold mb-2">🎓 Meet Our Expert Faculty</h2>
          <p className="text-blue-100 text-lg">
            Learn from India's finest biology educators with proven track records
          </p>
        </div>

        {/* Faculty Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
          <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 text-center">
            <div className="text-2xl font-bold">{FACULTY_MEMBERS.length}+</div>
            <div className="text-sm text-blue-100">Expert Faculty</div>
          </div>
          <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 text-center">
            <div className="text-2xl font-bold">{totalExperience}+</div>
            <div className="text-sm text-blue-100">Years Combined Exp.</div>
          </div>
          <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 text-center">
            <div className="text-2xl font-bold">{totalStudents.toLocaleString()}+</div>
            <div className="text-sm text-blue-100">Students Guided</div>
          </div>
          <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 text-center">
            <div className="text-2xl font-bold">{averageSuccessRate.toFixed(1)}%</div>
            <div className="text-sm text-blue-100">Avg Success Rate</div>
          </div>
        </div>
      </div>

      {/* Department Filter */}
      <div className="p-6 bg-white border-b border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Filter by Specialization</h3>
          <span className="text-sm text-gray-600">
            Showing {filteredFaculty.length} of {FACULTY_MEMBERS.length} faculty members
          </span>
        </div>

        <div className="flex flex-wrap gap-2">
          {departments.map((dept) => (
            <button
              key={dept}
              onClick={() => setSelectedDepartment(dept)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                selectedDepartment === dept
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {dept === 'all' ? 'All Faculty' : dept}
            </button>
          ))}
        </div>
      </div>

      {/* Faculty Grid */}
      <div className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {filteredFaculty.map((faculty) => (
            <FacultyCard key={faculty.id} faculty={faculty} />
          ))}
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white p-8 text-center">
        <h3 className="text-2xl font-bold mb-2">Learn from the Best</h3>
        <p className="text-green-100 mb-6 max-w-2xl mx-auto">
          Our faculty combines years of teaching experience with cutting-edge research to deliver
          unparalleled NEET preparation.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="bg-white text-green-600 px-8 py-3 rounded-xl font-bold hover:bg-gray-100 transition-colors">
            🎯 Book Faculty Interaction Session
          </button>
          <button className="bg-green-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-green-400 transition-colors">
            📚 View Complete Faculty Profiles
          </button>
        </div>
      </div>
    </div>
  )
}
