'use client'

import { useState, use } from 'react'
import Link from 'next/link'
import {
  BookOpen,
  Clock,
  Users,
  Video,
  CheckCircle,
  Star,
  ArrowRight,
  Calendar,
  Target,
  Award,
  GraduationCap,
  Sparkles,
  Phone,
  MessageSquare,
  IndianRupee,
  Zap,
  Brain,
  TrendingUp,
  FileText,
  PlayCircle,
} from 'lucide-react'

interface ProgramData {
  name: string
  slug: string
  tagline: string
  description: string
  price: number
  originalPrice: number
  duration: string
  mode: string
  batchSize: string
  startDate: string
  features: string[]
  highlights: string[]
  curriculum: Array<{ title: string; topics: string[] }>
  testimonials: Array<{ name: string; score: string; quote: string }>
  faqs: Array<{ question: string; answer: string }>
  gradient: string
  icon: string
}

const programsData: Record<string, ProgramData> = {
  'neet-crash-course': {
    name: 'NEET Crash Course',
    slug: 'neet-crash-course',
    tagline: 'Intensive 90-Day NEET Preparation',
    description:
      'Fast-track your NEET preparation with our intensive crash course designed for students who need quick revision and maximum results in minimum time.',
    price: 35000,
    originalPrice: 50000,
    duration: '90 Days',
    mode: 'Online Live + Recorded',
    batchSize: '50 Students',
    startDate: 'Rolling Admission',
    features: [
      'Complete syllabus coverage in 90 days',
      'Daily 4-hour live sessions',
      '50+ chapter-wise tests',
      '10 full-length mock tests',
      'PYQ analysis and solving',
      'Doubt clearing sessions',
      'Study material and notes',
      'Revision classes before exam',
    ],
    highlights: [
      'Best for last-minute preparation',
      'Focus on high-weightage topics',
      'Quick revision techniques',
      'Exam strategy sessions',
    ],
    curriculum: [
      {
        title: 'Week 1-4: Botany',
        topics: ['Plant Diversity', 'Plant Anatomy', 'Plant Physiology', 'Plant Reproduction'],
      },
      {
        title: 'Week 5-8: Zoology',
        topics: ['Animal Diversity', 'Human Physiology', 'Animal Reproduction', 'Evolution'],
      },
      {
        title: 'Week 9-12: Genetics & Ecology',
        topics: ['Genetics', 'Biotechnology', 'Ecology', 'Environment'],
      },
      { title: 'Week 13: Revision', topics: ['Full syllabus revision', 'Mock tests', 'Strategy'] },
    ],
    testimonials: [
      {
        name: 'Priya S.',
        score: '620/720',
        quote:
          'Joined the crash course 3 months before NEET. The focused approach helped me improve 80 marks.',
      },
      {
        name: 'Rahul M.',
        score: '650/720',
        quote: 'Perfect for revision. Covered entire syllabus with PYQ focus.',
      },
    ],
    faqs: [
      {
        question: 'Is 90 days enough for NEET preparation?',
        answer:
          'Yes, for students with basic concepts clear, our crash course is designed to maximize results in limited time through focused revision and practice.',
      },
      {
        question: 'Will I get recorded sessions?',
        answer:
          'Yes, all live sessions are recorded and available for 6 months from your joining date.',
      },
    ],
    gradient: 'from-orange-500 to-red-500',
    icon: '🚀',
  },
  'neet-repeater': {
    name: 'NEET Repeater Program',
    slug: 'neet-repeater',
    tagline: 'Transform Your Score in One Year',
    description:
      'Specially designed for droppers and repeaters who want to improve their NEET score significantly. Learn from your mistakes and achieve your dream score.',
    price: 55000,
    originalPrice: 75000,
    duration: '12 Months',
    mode: 'Online Live + Offline Support',
    batchSize: '40 Students',
    startDate: 'March 2025',
    features: [
      'Complete NEET syllabus from basics',
      'Daily 5-hour live sessions',
      '100+ chapter-wise tests',
      '25 full-length mock tests',
      'Personal mentor assigned',
      '1-on-1 doubt sessions',
      'Comprehensive study material',
      'Weekly performance analysis',
      'Parent-teacher meetings',
    ],
    highlights: [
      'Average 150+ marks improvement',
      'Analysis of previous attempt',
      'Personalized weak area focus',
      'Proven track record',
    ],
    curriculum: [
      {
        title: 'Phase 1 (4 months): Foundation',
        topics: ['Complete NCERT revision', 'Concept building', 'Basic problem solving'],
      },
      {
        title: 'Phase 2 (4 months): Advanced',
        topics: ['Advanced concepts', 'Application-based learning', 'Competition level problems'],
      },
      {
        title: 'Phase 3 (4 months): Mastery',
        topics: ['Full mock tests', 'PYQ analysis', 'Exam strategy', 'Time management'],
      },
    ],
    testimonials: [
      {
        name: 'Ankit K.',
        score: '680/720 (Improved from 520)',
        quote: 'Went from 520 to 680. The personalized approach made all the difference.',
      },
      {
        name: 'Sneha R.',
        score: '660/720 (Improved from 490)',
        quote:
          'Finally cracked NEET after 2 attempts. Dr. Shekhar sir helped me identify my weak areas.',
      },
    ],
    faqs: [
      {
        question: 'How is this different from regular coaching?',
        answer:
          'We analyze your previous attempts, identify weak areas, and create a personalized study plan focusing on improvement areas.',
      },
      {
        question: 'What if I already have basic concepts clear?',
        answer:
          'We offer a fast-track batch for students with strong fundamentals, focusing more on advanced concepts and practice.',
      },
    ],
    gradient: 'from-purple-500 to-indigo-600',
    icon: '🎯',
  },
  'class-11-foundation': {
    name: 'Class 11 Foundation',
    slug: 'class-11-foundation',
    tagline: 'Build Strong Foundations for NEET',
    description:
      'Start your NEET journey early with our Class 11 Foundation course. Build strong conceptual foundations that will help you excel in both boards and competitive exams.',
    price: 25000,
    originalPrice: 40000,
    duration: '12 Months',
    mode: 'Online Live',
    batchSize: '60 Students',
    startDate: 'April 2025',
    features: [
      'Complete Class 11 Biology',
      '3 live sessions per week',
      'NCERT + competitive level',
      'Monthly tests',
      'Doubt clearing sessions',
      'Board exam preparation',
      'Study material provided',
    ],
    highlights: [
      'Early start advantage',
      'Board + NEET combined prep',
      'Strong concept building',
      'Regular assessments',
    ],
    curriculum: [
      {
        title: 'Term 1: Living World to Cell',
        topics: [
          'Living World',
          'Biological Classification',
          'Plant Kingdom',
          'Animal Kingdom',
          'Cell Structure',
        ],
      },
      {
        title: 'Term 2: Cell to Plant Physiology',
        topics: ['Cell Cycle', 'Biomolecules', 'Transport in Plants', 'Mineral Nutrition'],
      },
    ],
    testimonials: [
      {
        name: 'Arjun P.',
        score: 'Class 11: 95%',
        quote: 'Started early with foundation course. Now Class 12 feels much easier.',
      },
    ],
    faqs: [
      {
        question: 'Can I manage board exam and NEET prep together?',
        answer:
          'Our course is designed to cover both. NCERT is the base for NEET Biology, so you prepare for both simultaneously.',
      },
    ],
    gradient: 'bg-green-600',
    icon: '🌱',
  },
  'class-12-intensive': {
    name: 'Class 12 Intensive',
    slug: 'class-12-intensive',
    tagline: 'Master Class 12 Biology for NEET',
    description:
      'Comprehensive Class 12 Biology course with focus on high-weightage topics. Perfect for students preparing for boards and NEET simultaneously.',
    price: 35000,
    originalPrice: 50000,
    duration: '12 Months',
    mode: 'Online Live',
    batchSize: '50 Students',
    startDate: 'April 2025',
    features: [
      'Complete Class 12 Biology',
      '4 live sessions per week',
      'NEET-focused teaching',
      'Bi-weekly tests',
      '1-on-1 doubt sessions',
      'Board + NEET preparation',
      'Comprehensive notes',
    ],
    highlights: [
      'High-weightage topics focus',
      '60% NEET Biology from Class 12',
      'Board topper strategy',
      'Regular mock tests',
    ],
    curriculum: [
      {
        title: 'Unit 1-3: Reproduction & Genetics',
        topics: [
          'Reproduction in Organisms',
          'Human Reproduction',
          'Genetics',
          'Molecular Biology',
        ],
      },
      {
        title: 'Unit 4-5: Biotechnology & Ecology',
        topics: [
          'Biotechnology Principles',
          'Applications',
          'Organisms & Environment',
          'Biodiversity',
        ],
      },
    ],
    testimonials: [
      {
        name: 'Kavya S.',
        score: 'Boards: 97%, NEET: 650',
        quote: 'Managed to score well in both boards and NEET with this course.',
      },
    ],
    faqs: [
      {
        question: 'How much of NEET Biology is from Class 12?',
        answer: 'Approximately 60% of NEET Biology questions come from Class 12 syllabus.',
      },
    ],
    gradient: 'from-blue-500 to-cyan-600',
    icon: '📚',
  },
  'dropper-batch': {
    name: 'Dropper Batch',
    slug: 'dropper-batch',
    tagline: 'Your Year to Crack NEET',
    description:
      'Dedicated batch for students taking a year off for NEET preparation. Intensive coaching with personalized attention to help you achieve your medical college dream.',
    price: 55000,
    originalPrice: 75000,
    duration: '12 Months',
    mode: 'Online Live + Hybrid',
    batchSize: '35 Students',
    startDate: 'March 2025',
    features: [
      'Complete NEET syllabus coverage',
      '6 hours daily sessions',
      '150+ tests throughout the year',
      'Personal mentor program',
      'Weekly 1-on-1 sessions',
      'Parent progress meetings',
      'Comprehensive study material',
      'All India mock tests',
      'Interview preparation',
    ],
    highlights: [
      'Limited batch size',
      '95% selection rate',
      'Personal mentorship',
      'Proven methodology',
    ],
    curriculum: [
      {
        title: 'Phase 1: Foundation (3 months)',
        topics: ['NCERT mastery', 'Concept clarity', 'Basic problem solving'],
      },
      {
        title: 'Phase 2: Building (4 months)',
        topics: ['Advanced concepts', 'Application learning', 'Competition problems'],
      },
      {
        title: 'Phase 3: Perfection (5 months)',
        topics: ['Full syllabus revision', 'Mock test series', 'Strategy & time management'],
      },
    ],
    testimonials: [
      {
        name: 'Rohan T.',
        score: '695/720',
        quote: 'The personalized attention in dropper batch was key to my success.',
      },
      {
        name: 'Aisha M.',
        score: '670/720',
        quote: 'Best decision to join this batch. Got into AIIMS Delhi!',
      },
    ],
    faqs: [
      {
        question: 'What makes your dropper batch different?',
        answer:
          'Limited batch size, personal mentor, weekly 1-on-1 sessions, and a proven track record of 95% selections.',
      },
      {
        question: 'Is there any offline component?',
        answer: 'We offer hybrid mode with optional offline sessions for students in Delhi-NCR.',
      },
    ],
    gradient: 'from-indigo-600 to-purple-700',
    icon: '💪',
  },
  'online-live': {
    name: 'Online Live Classes',
    slug: 'online-live',
    tagline: 'Learn Live from Anywhere',
    description:
      'High-quality live interactive classes from the comfort of your home. Same quality of teaching as offline with added convenience.',
    price: 45000,
    originalPrice: 60000,
    duration: '12 Months',
    mode: '100% Online Live',
    batchSize: '80 Students',
    startDate: 'Rolling Admission',
    features: [
      'Live interactive sessions',
      '4 hours daily classes',
      'Real-time doubt solving',
      'Digital study material',
      'Recorded backup available',
      'Online test series',
      'Mobile app access',
    ],
    highlights: [
      'Learn from anywhere',
      'Interactive whiteboard',
      'Doubt clearing in chat',
      'Recordings for revision',
    ],
    curriculum: [
      {
        title: 'Complete NEET Biology',
        topics: ['Class 11 topics', 'Class 12 topics', 'PYQ practice', 'Mock tests'],
      },
    ],
    testimonials: [
      {
        name: 'Nisha K.',
        score: '640/720',
        quote: 'Online classes worked perfectly for me. Saved travel time for more study.',
      },
    ],
    faqs: [
      {
        question: 'What if I miss a class?',
        answer: 'All live sessions are recorded and available within 2 hours of the class ending.',
      },
      {
        question: 'How do I ask doubts?',
        answer:
          'You can ask doubts in real-time during class or through our dedicated doubt resolution channels.',
      },
    ],
    gradient: 'from-cyan-500 to-blue-600',
    icon: '💻',
  },
  hybrid: {
    name: 'Hybrid Learning Program',
    slug: 'hybrid',
    tagline: 'Best of Both Worlds',
    description:
      'Combine the flexibility of online learning with the effectiveness of offline sessions. Perfect for students who want a balanced approach.',
    price: 60000,
    originalPrice: 80000,
    duration: '12 Months',
    mode: 'Online + Weekend Offline',
    batchSize: '40 Students',
    startDate: 'March 2025',
    features: [
      'Daily online live classes',
      'Weekend offline sessions',
      'In-person doubt clearing',
      'Lab sessions included',
      'Personal mentor support',
      'Complete study material',
      'Test series access',
    ],
    highlights: [
      'Flexible yet structured',
      'Face-to-face interaction',
      'Best for Delhi-NCR students',
      'Hands-on lab experience',
    ],
    curriculum: [
      {
        title: 'Weekly Schedule',
        topics: [
          'Mon-Fri: Online live classes',
          'Saturday: Offline doubt sessions',
          'Sunday: Tests',
        ],
      },
    ],
    testimonials: [
      {
        name: 'Vikram S.',
        score: '665/720',
        quote: 'The hybrid model gave me flexibility while keeping me disciplined.',
      },
    ],
    faqs: [
      {
        question: 'Where are the offline sessions?',
        answer: 'Currently available in Delhi-NCR region. Contact us for center location.',
      },
    ],
    gradient: 'from-violet-500 to-purple-600',
    icon: '🔄',
  },
  weekend: {
    name: 'Weekend Batch',
    slug: 'weekend',
    tagline: 'For Working Students',
    description:
      'Perfect for students who have school or other commitments during weekdays. Intensive weekend sessions to keep your NEET preparation on track.',
    price: 30000,
    originalPrice: 45000,
    duration: '12 Months',
    mode: 'Online Weekend Classes',
    batchSize: '50 Students',
    startDate: 'Rolling Admission',
    features: [
      '8 hours Saturday classes',
      '6 hours Sunday classes',
      'Complete syllabus coverage',
      'Weekly tests',
      'Doubt sessions included',
      'Study material provided',
      'Recorded backup',
    ],
    highlights: [
      'Perfect for school students',
      'Intensive weekend sessions',
      'Self-study guidance',
      'Flexible timing',
    ],
    curriculum: [
      {
        title: 'Weekend Schedule',
        topics: ['Saturday: Theory + concepts', 'Sunday: Practice + tests'],
      },
    ],
    testimonials: [
      {
        name: 'Meera R.',
        score: '625/720',
        quote: 'Managed school and NEET prep thanks to weekend batch.',
      },
    ],
    faqs: [
      {
        question: 'Can I manage with only weekend classes?',
        answer:
          'Yes, but you need to dedicate 3-4 hours daily for self-study following our provided schedule.',
      },
    ],
    gradient: 'from-amber-500 to-orange-600',
    icon: '📅',
  },
  'test-series': {
    name: 'Test Series',
    slug: 'test-series',
    tagline: 'Practice Makes Perfect',
    description:
      'Comprehensive test series designed to simulate actual NEET exam conditions. Regular assessment to track your progress and identify weak areas.',
    price: 5000,
    originalPrice: 10000,
    duration: '6 Months',
    mode: 'Online',
    batchSize: 'Unlimited',
    startDate: 'Immediate Access',
    features: [
      '30 full-length mock tests',
      '100+ chapter-wise tests',
      'All India ranking',
      'Detailed analytics',
      'Solution videos',
      'Performance tracking',
      'Mobile app access',
    ],
    highlights: [
      'NEET pattern tests',
      'Accurate difficulty level',
      'All India comparison',
      'Weak area analysis',
    ],
    curriculum: [
      {
        title: 'Test Schedule',
        topics: ['Chapter tests: Weekly', 'Subject tests: Bi-weekly', 'Full mock: Monthly'],
      },
    ],
    testimonials: [
      {
        name: 'Karan D.',
        score: '660/720',
        quote: 'The test series helped me practice under exam conditions.',
      },
    ],
    faqs: [
      {
        question: 'How similar are the tests to actual NEET?',
        answer:
          'Our tests follow the exact NEET pattern with similar difficulty level and question types.',
      },
    ],
    gradient: 'from-rose-500 to-red-600',
    icon: '📝',
  },
  'doubt-clearing': {
    name: 'Doubt Clearing Sessions',
    slug: 'doubt-clearing',
    tagline: 'Clear Every Doubt',
    description:
      'Dedicated doubt clearing sessions for students who need extra help. Get your questions answered by expert faculty.',
    price: 3000,
    originalPrice: 5000,
    duration: '3 Months',
    mode: 'Online 1-on-1',
    batchSize: '1-on-1',
    startDate: 'Immediate',
    features: [
      '12 sessions (1 hour each)',
      '1-on-1 with faculty',
      'Screen sharing',
      'Any topic doubt',
      'Flexible scheduling',
      'Recording available',
    ],
    highlights: ['Personalized attention', 'Clear any doubt', 'Book as needed', 'Expert faculty'],
    curriculum: [
      { title: 'Flexible', topics: ['Book sessions as per your need', 'Any topic coverage'] },
    ],
    testimonials: [
      {
        name: 'Prerna M.',
        score: 'Concept clarity improved',
        quote: 'These sessions helped me clear my toughest doubts.',
      },
    ],
    faqs: [
      {
        question: 'How do I book a session?',
        answer:
          'You can book sessions through our app or WhatsApp. Slots available throughout the week.',
      },
    ],
    gradient: 'from-green-600 to-cyan-600',
    icon: '❓',
  },
}

// Default program data for unknown slugs
const defaultProgram: ProgramData = {
  name: 'NEET Biology Program',
  slug: 'default',
  tagline: 'Your Path to Medical College',
  description:
    'Comprehensive NEET Biology preparation program designed by Dr. Shekhar C Singh, AIIMS alumnus.',
  price: 45000,
  originalPrice: 60000,
  duration: '12 Months',
  mode: 'Online Live',
  batchSize: '50 Students',
  startDate: 'Contact for Details',
  features: [
    'Complete NEET Biology coverage',
    'Live interactive sessions',
    'Expert faculty',
    'Doubt resolution',
    'Test series',
    'Study material',
  ],
  highlights: ['AIIMS faculty', 'Proven results', 'Personalized attention'],
  curriculum: [{ title: 'Complete Biology', topics: ['Class 11 + Class 12', 'NCERT + Advanced'] }],
  testimonials: [],
  faqs: [
    {
      question: 'How can I learn more?',
      answer: 'Contact us on WhatsApp at +91 88264-44334 for detailed information.',
    },
  ],
  gradient: 'from-indigo-500 to-indigo-600',
  icon: '🎓',
}

export default function ProgramPage({ params }: { params: Promise<{ slug: string[] }> }) {
  const { slug } = use(params)
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  const programSlug = slug?.[0] || 'default'
  const program = programsData[programSlug] || defaultProgram

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section
        className={`relative bg-gradient-to-br ${program.gradient} text-white overflow-hidden`}
      >
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-20 sm:py-28">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
                <span className="text-2xl mr-2">{program.icon}</span>
                <span className="text-sm font-medium">{program.tagline}</span>
              </div>

              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">{program.name}</h1>

              <p className="text-lg sm:text-xl text-white/90 mb-8">{program.description}</p>

              <div className="flex flex-wrap gap-4 mb-8">
                <div className="flex items-center bg-white/20 rounded-lg px-4 py-2">
                  <Clock className="w-5 h-5 mr-2" />
                  <span>{program.duration}</span>
                </div>
                <div className="flex items-center bg-white/20 rounded-lg px-4 py-2">
                  <Video className="w-5 h-5 mr-2" />
                  <span>{program.mode}</span>
                </div>
                <div className="flex items-center bg-white/20 rounded-lg px-4 py-2">
                  <Users className="w-5 h-5 mr-2" />
                  <span>{program.batchSize}</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/demo-booking"
                  className="inline-flex items-center justify-center bg-white text-gray-900 px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition-all"
                >
                  Book Free Demo
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
                <a
                  href="https://wa.me/918826444334"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center bg-green-600 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-green-600 transition-all"
                >
                  <MessageSquare className="w-5 h-5 mr-2" />
                  WhatsApp
                </a>
              </div>
            </div>

            {/* Pricing Card */}
            <div className="bg-white rounded-2xl p-8 text-gray-900 shadow-2xl">
              <div className="text-center mb-6">
                <p className="text-gray-600 mb-2">Program Fee</p>
                <div className="flex items-center justify-center gap-3">
                  <span className="text-4xl font-bold text-gray-900">
                    ₹{program.price.toLocaleString()}
                  </span>
                  <span className="text-xl text-gray-400 line-through">
                    ₹{program.originalPrice.toLocaleString()}
                  </span>
                </div>
                <p className="text-green-600 font-semibold mt-2">
                  Save ₹{(program.originalPrice - program.price).toLocaleString()}
                </p>
              </div>

              <div className="space-y-4 mb-6">
                <div className="flex items-center justify-between py-3 border-b border-gray-100">
                  <span className="text-gray-600">Duration</span>
                  <span className="font-semibold">{program.duration}</span>
                </div>
                <div className="flex items-center justify-between py-3 border-b border-gray-100">
                  <span className="text-gray-600">Mode</span>
                  <span className="font-semibold">{program.mode}</span>
                </div>
                <div className="flex items-center justify-between py-3 border-b border-gray-100">
                  <span className="text-gray-600">Batch Start</span>
                  <span className="font-semibold">{program.startDate}</span>
                </div>
                <div className="flex items-center justify-between py-3">
                  <span className="text-gray-600">Batch Size</span>
                  <span className="font-semibold">{program.batchSize}</span>
                </div>
              </div>

              <Link
                href={`/payment?program=${program.slug}&amount=${program.price}`}
                className={`w-full inline-flex items-center justify-center bg-gradient-to-r ${program.gradient} text-white px-8 py-4 rounded-xl font-bold text-lg hover:shadow-lg transition-all`}
              >
                Enroll Now
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>

              <p className="text-center text-sm text-gray-500 mt-4">
                EMI options available | 100% Secure Payment
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">What You'll Get</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Everything you need to crack NEET Biology
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {program.features.map((feature, index) => (
              <div
                key={index}
                className="flex items-start p-4 bg-gray-50 rounded-xl hover:shadow-md transition-all"
              >
                <CheckCircle className="w-5 h-5 text-green-600 mr-3 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Highlights Section */}
      <section className="py-16 sm:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
                Why Choose This Program?
              </h2>
              <div className="space-y-4">
                {program.highlights.map((highlight, index) => (
                  <div key={index} className="flex items-center p-4 bg-white rounded-xl shadow-sm">
                    <div
                      className={`w-10 h-10 bg-gradient-to-r ${program.gradient} rounded-lg flex items-center justify-center text-white mr-4`}
                    >
                      <Sparkles className="w-5 h-5" />
                    </div>
                    <span className="text-lg font-medium text-gray-900">{highlight}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-xl">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Program Curriculum</h3>
              <div className="space-y-6">
                {program.curriculum.map((section, index) => (
                  <div key={index}>
                    <h4 className="font-semibold text-gray-900 mb-2">{section.title}</h4>
                    <ul className="space-y-2">
                      {section.topics.map((topic, i) => (
                        <li key={i} className="flex items-center text-gray-600">
                          <BookOpen className="w-4 h-4 mr-2 text-blue-500" />
                          {topic}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      {program.testimonials.length > 0 && (
        <section className="py-16 sm:py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                Student Success Stories
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {program.testimonials.map((testimonial, index) => (
                <div key={index} className="bg-gray-50 rounded-2xl p-8">
                  <div className="flex items-center mb-4">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-700 mb-6 text-lg">"{testimonial.quote}"</p>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-gray-900">{testimonial.name}</p>
                      <p className="text-green-600 font-medium">{testimonial.score}</p>
                    </div>
                    <Award className="w-8 h-8 text-yellow-500" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FAQ Section */}
      <section className="py-16 sm:py-20 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-4">
            {program.faqs.map((faq, index) => (
              <div key={index} className="bg-white rounded-xl overflow-hidden shadow-sm">
                <button
                  className="w-full px-6 py-4 text-left flex items-center justify-between"
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                >
                  <span className="font-semibold text-gray-900 pr-4">{faq.question}</span>
                  <ArrowRight
                    className={`w-5 h-5 text-gray-400 transition-transform ${
                      openFaq === index ? 'rotate-90' : ''
                    }`}
                  />
                </button>
                {openFaq === index && (
                  <div className="px-6 pb-4">
                    <p className="text-gray-600">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={`py-16 sm:py-20 bg-gradient-to-r ${program.gradient}`}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Ready to Start Your NEET Journey?
          </h2>
          <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
            Join thousands of successful students who cracked NEET with Cerebrum Biology Academy
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/demo-booking"
              className="w-full sm:w-auto inline-flex items-center justify-center bg-white text-gray-900 px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition-all"
            >
              Book Free Demo Class
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
            <a
              href="tel:+918826444334"
              className="w-full sm:w-auto inline-flex items-center justify-center bg-transparent border-2 border-white text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white/10 transition-all"
            >
              <Phone className="w-5 h-5 mr-2" />
              Call: +91 88264-44334
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
