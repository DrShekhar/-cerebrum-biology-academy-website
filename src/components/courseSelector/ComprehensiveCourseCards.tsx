'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Check,
  Star,
  Award,
  Clock,
  Users,
  Target,
  BookOpen,
  Zap,
  Crown,
  Gem,
  TrendingUp,
} from 'lucide-react'

interface CourseCard {
  id: string
  title: string
  description: string
  classLevel: string
  duration: string
  hoursPerWeek: string
  batchSize: string
  isPopular?: boolean
  isRecommended?: boolean
  series: 'pursuit' | 'ascent' | 'pinnacle' | 'intensive'
  plans: {
    [key: string]: {
      name: string
      price: number
      originalPrice?: number
      description: string
      features: string[]
      hours: string
      focus: string
    }
  }
  specialFeatures: string[]
  paymentOptions: {
    single: number
    twoInstall: number
    threeInstall: number
  }
  guarantee: string
  icon: string
  bgColor: string
  textColor: string
}

const courseData: CourseCard[] = [
  // Class 9th Foundation
  {
    id: 'class-9-foundation',
    title: 'Class 9th Foundation Biology',
    description:
      'Strong foundation building with conceptual clarity for future NEET preparation. Focus on scientific temperament and analytical thinking.',
    classLevel: 'Class IX',
    duration: '1 year',
    hoursPerWeek: '3-6h',
    batchSize: '12-25',
    isPopular: true,
    series: 'pursuit',
    plans: {
      pursuit_academic: {
        name: 'Academic Focus',
        price: 36000,
        description: 'School curriculum focused',
        features: ['School board alignment', 'Term exam preparation', 'Concept building'],
        hours: '3-4 hrs/week',
        focus: 'Academic Excellence',
      },
      pursuit_neet: {
        name: 'NEET + Olympiad',
        price: 30000,
        description: 'Early NEET foundation',
        features: ['NEET pattern introduction', 'Olympiad preparation', 'Advanced concepts'],
        hours: '3-4 hrs/week',
        focus: 'NEET Foundation',
      },
      pursuit_combined: {
        name: 'Combined Program',
        price: 66000,
        description: 'Complete preparation',
        features: ['Academic + NEET', 'Olympiad training', 'Comprehensive coverage'],
        hours: '6-8 hrs/week',
        focus: 'Complete Program',
      },
      ascent_academic: {
        name: 'Ascent Academic',
        price: 50000,
        description: 'Premium academic focus',
        features: ['Smaller batches (16 max)', 'Personalized attention', 'Advanced teaching'],
        hours: '4-5 hrs/week',
        focus: 'Premium Academic',
      },
      ascent_combined: {
        name: 'Ascent Combined',
        price: 110000,
        description: 'Premium complete program',
        features: ['Academic + NEET premium', 'Small batch size', 'Expert faculty'],
        hours: '8-10 hrs/week',
        focus: 'Premium Complete',
      },
      pinnacle_academic: {
        name: 'Pinnacle Academic',
        price: 65000,
        description: 'Ultra-premium academic',
        features: ['Max 12 students', 'Highest personalization', 'Elite preparation'],
        hours: '5-6 hrs/week',
        focus: 'Elite Academic',
      },
      pinnacle_combined: {
        name: 'Pinnacle Combined',
        price: 125000,
        description: 'Ultra-premium complete',
        features: ['Elite small batches', 'Maximum attention', 'Complete excellence'],
        hours: '10-12 hrs/week',
        focus: 'Elite Complete',
      },
    },
    specialFeatures: ['Foundation building', 'Scientific temperament', 'Analytical thinking'],
    paymentOptions: { single: 0, twoInstall: 2000, threeInstall: 4000 },
    guarantee: 'Foundation Excellence Guarantee',
    icon: '🌱',
    bgColor: 'bg-green-50',
    textColor: 'text-green-700',
  },

  // Class 10th Foundation
  {
    id: 'class-10-foundation',
    title: 'Class 10th Foundation Biology',
    description:
      'Advanced foundation course preparing for Class 11th NEET journey. Bridging concepts with pre-medical preparation.',
    classLevel: 'Class X',
    duration: '1 year',
    hoursPerWeek: '3-6h',
    batchSize: '12-25',
    series: 'ascent',
    plans: {
      pursuit_academic: {
        name: 'Academic Focus',
        price: 36000,
        description: 'Board exam excellence',
        features: ['Board pattern mastery', 'High scoring techniques', 'Concept reinforcement'],
        hours: '3-4 hrs/week',
        focus: 'Board Excellence',
      },
      pursuit_neet: {
        name: 'NEET Foundation',
        price: 30000,
        description: 'NEET readiness',
        features: ['NEET foundation concepts', 'Medical entrance prep', 'Advanced problem solving'],
        hours: '3-4 hrs/week',
        focus: 'NEET Ready',
      },
      ascent_academic: {
        name: 'Ascent Academic',
        price: 50000,
        description: 'Premium board prep',
        features: ['Small batch advantage', 'Personalized guidance', 'Excellence focus'],
        hours: '4-5 hrs/week',
        focus: 'Premium Board',
      },
      pinnacle_academic: {
        name: 'Pinnacle Elite',
        price: 65000,
        description: 'Elite preparation',
        features: ['Ultra-small batches', 'Maximum personalization', 'Elite outcomes'],
        hours: '5-6 hrs/week',
        focus: 'Elite Preparation',
      },
    },
    specialFeatures: [
      'NEET bridge concepts',
      'Advanced problem solving',
      'Medical entrance readiness',
    ],
    paymentOptions: { single: 0, twoInstall: 2000, threeInstall: 4000 },
    guarantee: 'NEET Readiness Guarantee',
    icon: '🌿',
    bgColor: 'bg-blue-50',
    textColor: 'text-blue-700',
  },

  // Class 11th Programs
  {
    id: 'class-11-programs',
    title: 'Class 11th NEET Programs',
    description:
      'Comprehensive NEET preparation starting point. Choose between 1-year or 2-year strategic preparation paths.',
    classLevel: 'Class XI',
    duration: '1-2 years',
    hoursPerWeek: '3-12h',
    batchSize: '12-25',
    isPopular: true,
    isRecommended: true,
    series: 'pinnacle',
    plans: {
      // 1-Year Programs
      pursuit_plan_a: {
        name: 'Pursuit Plan A (1Y)',
        price: 48000,
        description: 'NEET + Academic combined',
        features: ['Complete syllabus', 'Board + NEET prep', 'Regular testing'],
        hours: '3-4 hrs/week',
        focus: 'Complete 1-Year',
      },
      pursuit_plan_b: {
        name: 'Pursuit Plan B (1Y)',
        price: 40000,
        description: 'NEET focused only',
        features: ['Pure NEET preparation', 'Intensive practice', 'Concept mastery'],
        hours: '3-4 hrs/week',
        focus: 'NEET Only',
      },
      ascent_plan_a: {
        name: 'Ascent Plan A (1Y)',
        price: 76000,
        description: 'Premium NEET + Academic',
        features: ['Small batch (16 max)', 'Expert faculty', 'Personalized attention'],
        hours: '4-5 hrs/week',
        focus: 'Premium Complete',
      },
      ascent_plan_b: {
        name: 'Ascent Plan B (1Y)',
        price: 58000,
        description: 'Premium NEET only',
        features: ['Focused NEET prep', 'Quality teaching', 'Small batches'],
        hours: '3-4 hrs/week',
        focus: 'Premium NEET',
      },
      pinnacle_plan_a: {
        name: 'Pinnacle Plan A (1Y)',
        price: 98000,
        description: 'Elite NEET + Academic',
        features: ['Max 12 students', 'Highest quality', 'Maximum attention'],
        hours: '5.5-6 hrs/week',
        focus: 'Elite Complete',
      },
      pinnacle_plan_b: {
        name: 'Pinnacle Plan B (1Y)',
        price: 65000,
        description: 'Elite NEET only',
        features: ['Ultra-premium quality', 'Elite small batches', 'Top faculty'],
        hours: '3-4 hrs/week',
        focus: 'Elite NEET',
      },
      // 2-Year Programs (A-Z)
      pinnacle_2y_plan_a: {
        name: 'Pinnacle A-Z Plan A',
        price: 180000,
        originalPrice: 186000,
        description: '2-Year complete journey',
        features: ['XI: 5.5-6 hrs/week', 'XII: 11-12 hrs/week', 'Complete mastery'],
        hours: '5.5-12 hrs/week',
        focus: '2-Year Elite Complete',
      },
      pinnacle_2y_plan_b: {
        name: 'Pinnacle A-Z Plan B',
        price: 128000,
        originalPrice: 136000,
        description: '2-Year NEET focused',
        features: ['XI: 3-4 hrs/week', 'XII: 5-6 hrs/week', 'NEET mastery'],
        hours: '3-6 hrs/week',
        focus: '2-Year NEET',
      },
    },
    specialFeatures: ['NEET foundation', 'Strategic preparation', 'Long-term planning'],
    paymentOptions: { single: 0, twoInstall: 3000, threeInstall: 6000 },
    guarantee: 'NEET Success Pathway Guarantee',
    icon: '🎯',
    bgColor: 'bg-purple-50',
    textColor: 'text-purple-700',
  },

  // Class 12th Programs
  {
    id: 'class-12-programs',
    title: 'Class 12th NEET Programs',
    description:
      'Final year intensive NEET preparation with board exam coordination. Critical year for NEET success.',
    classLevel: 'Class XII',
    duration: '1 year',
    hoursPerWeek: '3-12h',
    batchSize: '12-25',
    isPopular: true,
    series: 'ascent',
    plans: {
      pursuit_plan_a: {
        name: 'Pursuit Plan A',
        price: 49900,
        description: 'NEET + Board balance',
        features: ['Board exam preparation', 'NEET intensive training', 'Time management'],
        hours: '3-4 hrs/week',
        focus: 'Balanced Approach',
      },
      pursuit_plan_b: {
        name: 'Pursuit Plan B',
        price: 42000,
        description: 'Pure NEET focus',
        features: ['Intensive NEET prep', 'Previous year analysis', 'Mock test series'],
        hours: '3-4 hrs/week',
        focus: 'NEET Intensive',
      },
      ascent_plan_a: {
        name: 'Ascent Plan A',
        price: 78000,
        description: 'Premium final year',
        features: ['Expert guidance', 'Small batch benefits', 'Success focused'],
        hours: '4-5 hrs/week',
        focus: 'Premium Final',
      },
      ascent_plan_b: {
        name: 'Ascent Plan B',
        price: 60000,
        description: 'Premium NEET only',
        features: ['Quality NEET prep', 'Expert faculty', 'Result oriented'],
        hours: '3-4 hrs/week',
        focus: 'Premium NEET',
      },
      pinnacle_plan_a: {
        name: 'Pinnacle Plan A',
        price: 106000,
        description: 'Elite final preparation',
        features: ['Maximum attention', 'Elite faculty', 'Success guarantee'],
        hours: '5.5-6 hrs/week',
        focus: 'Elite Final',
      },
      pinnacle_plan_b: {
        name: 'Pinnacle Plan B',
        price: 68000,
        description: 'Elite NEET focus',
        features: ['Ultra-premium prep', 'Top results', 'Elite guidance'],
        hours: '3-4 hrs/week',
        focus: 'Elite NEET',
      },
    },
    specialFeatures: ['Final year strategy', 'Board coordination', 'NEET mastery'],
    paymentOptions: { single: 0, twoInstall: 4000, threeInstall: 8000 },
    guarantee: 'NEET Final Year Success Guarantee',
    icon: '🏆',
    bgColor: 'bg-orange-50',
    textColor: 'text-orange-700',
  },

  // Dropper Programs
  {
    id: 'dropper-programs',
    title: 'NEET Dropper Programs',
    description:
      'Comprehensive revision and intensive preparation for NEET repeat aspirants. Complete XI & XII revision with strategy.',
    classLevel: 'Dropper',
    duration: '1 year',
    hoursPerWeek: '6-12h',
    batchSize: '12-25',
    isRecommended: true,
    series: 'intensive',
    plans: {
      pursuit_az_plan_a: {
        name: 'Pursuit A-Z Plan A',
        price: 88000,
        originalPrice: 93000,
        description: 'Complete revision program',
        features: ['XI + XII revision', 'Intensive practice', 'Strategy focus'],
        hours: '6-9 hrs/week',
        focus: 'Complete Revision',
      },
      pursuit_az_plan_b: {
        name: 'Pursuit A-Z Plan B',
        price: 86000,
        originalPrice: 90000,
        description: 'NEET focused revision',
        features: ['Pure NEET preparation', 'Intensive drilling', 'Result oriented'],
        hours: '6-9 hrs/week',
        focus: 'NEET Intensive',
      },
      pursuit_az_plan_c: {
        name: 'Pursuit A-Z Plan C',
        price: 55000,
        originalPrice: 56000,
        description: 'Focused NEET prep',
        features: ['Targeted preparation', 'Efficient learning', 'Cost effective'],
        hours: '6-9 hrs/week',
        focus: 'Targeted NEET',
      },
      pinnacle_za_plan: {
        name: 'Pinnacle Z-A Plan',
        price: 150000,
        originalPrice: 156000,
        description: 'Elite dropper program',
        features: ['Complete XI + XII revision', 'Maximum attention', 'Success focused'],
        hours: '11-12 hrs/week',
        focus: 'Elite Dropper',
      },
      intensive_sgp: {
        name: 'Intensive SGP',
        price: 0, // Discussion based
        description: 'Special Group Program',
        features: ['Rigorous training', 'Personalized attention', 'Elite outcomes'],
        hours: '12+ hrs/week',
        focus: 'Elite Intensive',
      },
    },
    specialFeatures: ['Complete revision', 'Intensive practice', 'Strategy refinement'],
    paymentOptions: { single: 0, twoInstall: 5000, threeInstall: 8000 },
    guarantee: 'Dropper Success Guarantee',
    icon: '💪',
    bgColor: 'bg-red-50',
    textColor: 'text-red-700',
  },
]

const SeriesInfo = {
  pursuit: {
    name: 'PURSUIT SERIES',
    tagline: 'Budget-Conscious Excellence',
    batchSize: '20-25 students',
    color: 'bg-blue-600',
    icon: <Target className="w-5 h-5" />,
  },
  ascent: {
    name: 'ASCENT SERIES',
    tagline: 'Balanced Premium Approach',
    batchSize: 'Max 16 students',
    color: 'bg-purple-600',
    icon: <TrendingUp className="w-5 h-5" />,
  },
  pinnacle: {
    name: 'PINNACLE SERIES',
    tagline: 'Ultra-Premium Excellence',
    batchSize: 'Max 12 students',
    color: 'bg-gradient-to-r from-yellow-500 to-orange-500',
    icon: <Crown className="w-5 h-5" />,
  },
  intensive: {
    name: 'INTENSIVE/SGP',
    tagline: 'Elite Intensive Training',
    batchSize: 'Ultra-selective',
    color: 'bg-red-600',
    icon: <Zap className="w-5 h-5" />,
  },
}

const PlanCard = ({
  plan,
  planKey,
  course,
}: {
  plan: any
  planKey: string
  course: CourseCard
}) => {
  const [showAllFeatures, setShowAllFeatures] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl border border-gray-200 p-4 hover:shadow-md transition-all duration-300"
    >
      {/* Plan Header */}
      <div className="flex justify-between items-start mb-3">
        <div>
          <h4 className="font-semibold text-gray-900 text-sm">{plan.name}</h4>
          <p className="text-xs text-gray-500">{plan.description}</p>
        </div>
        {plan.originalPrice && (
          <div className="text-right">
            <div className="text-xs text-gray-400 line-through">
              ₹{(plan.originalPrice / 1000).toFixed(0)}K
            </div>
          </div>
        )}
      </div>

      {/* Price */}
      <div className="mb-3">
        {plan.price === 0 ? (
          <div className="text-lg font-bold text-purple-600">Fee on Discussion</div>
        ) : (
          <>
            <div className="text-2xl font-bold text-gray-900">
              ₹{(plan.price / 1000).toFixed(0)}K
            </div>
            <div className="text-xs text-gray-500">₹{plan.price.toLocaleString()} total</div>
          </>
        )}
      </div>

      {/* Key Info */}
      <div className="grid grid-cols-2 gap-2 mb-3 text-xs">
        <div>
          <span className="text-gray-500">Hours:</span>
          <div className="font-medium">{plan.hours}</div>
        </div>
        <div>
          <span className="text-gray-500">Focus:</span>
          <div className="font-medium">{plan.focus}</div>
        </div>
      </div>

      {/* Features */}
      <div className="mb-4">
        <ul className="space-y-1">
          {plan.features
            .slice(0, showAllFeatures ? plan.features.length : 2)
            .map((feature: string, index: number) => (
              <li key={index} className="flex items-start gap-2 text-xs">
                <Check className="w-3 h-3 text-green-600 mt-0.5 flex-shrink-0" />
                <span className="text-gray-700">{feature}</span>
              </li>
            ))}
        </ul>
        {plan.features.length > 2 && (
          <button
            onClick={() => setShowAllFeatures(!showAllFeatures)}
            className="text-blue-600 text-xs font-medium mt-1 hover:text-blue-700"
          >
            {showAllFeatures ? 'Show less' : `+${plan.features.length - 2} more features`}
          </button>
        )}
      </div>

      {/* Action Buttons */}
      <div className="space-y-2">
        <button className="w-full py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
          Enroll Now
        </button>
        <button className="w-full py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
          View Details
        </button>
      </div>
    </motion.div>
  )
}

const CourseCard = ({ course }: { course: CourseCard }) => {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null)
  const seriesInfo = SeriesInfo[course.series]

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      className={`${course.bgColor} rounded-2xl p-6 border border-gray-200 relative overflow-hidden`}
    >
      {/* Badges */}
      <div className="flex gap-2 mb-4">
        {course.isPopular && (
          <span className="bg-blue-600 text-white text-xs font-medium px-2 py-1 rounded-full flex items-center gap-1">
            <Star className="w-3 h-3 fill-current" />
            Popular
          </span>
        )}
        {course.isRecommended && (
          <span className="bg-green-600 text-white text-xs font-medium px-2 py-1 rounded-full flex items-center gap-1">
            <Award className="w-3 h-3 fill-current" />
            Recommended
          </span>
        )}
      </div>

      {/* Series Badge */}
      <div
        className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-white text-xs font-medium mb-4 ${seriesInfo.color}`}
      >
        {seriesInfo.icon}
        {seriesInfo.name}
      </div>

      {/* Course Header */}
      <div className="flex items-start gap-4 mb-4">
        <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-3xl shadow-sm">
          {course.icon}
        </div>
        <div className="flex-1">
          <h3 className="text-xl font-bold text-gray-900 mb-1">{course.title}</h3>
          <p className="text-sm text-gray-600 mb-2">{course.description}</p>
          <div className="flex items-center gap-4 text-xs text-gray-500">
            <span>{course.classLevel}</span>
            <span>{course.duration}</span>
            <span>{seriesInfo.batchSize}</span>
          </div>
        </div>
      </div>

      {/* Special Features */}
      <div className="mb-6">
        <h4 className="font-semibold text-gray-900 mb-2 text-sm">Key Highlights:</h4>
        <div className="flex flex-wrap gap-2">
          {course.specialFeatures.map((feature, index) => (
            <span key={index} className="bg-white/70 px-2 py-1 rounded-full text-xs text-gray-700">
              {feature}
            </span>
          ))}
        </div>
      </div>

      {/* Plans Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        {Object.entries(course.plans).map(([planKey, plan]) => (
          <PlanCard key={planKey} plan={plan} planKey={planKey} course={course} />
        ))}
      </div>

      {/* Payment Options */}
      <div className="bg-white/70 rounded-xl p-4 mb-4">
        <h4 className="font-semibold text-gray-900 mb-2 text-sm">Payment Options:</h4>
        <div className="grid grid-cols-3 gap-4 text-xs">
          <div>
            <div className="font-medium">Single Payment</div>
            <div className="text-green-600">Best Value</div>
          </div>
          <div>
            <div className="font-medium">Two Installments</div>
            <div className="text-gray-600">
              +₹{course.paymentOptions.twoInstall.toLocaleString()}
            </div>
          </div>
          <div>
            <div className="font-medium">Three Installments</div>
            <div className="text-gray-600">
              +₹{course.paymentOptions.threeInstall.toLocaleString()}
            </div>
          </div>
        </div>
      </div>

      {/* Guarantee */}
      <div className="bg-gray-50 rounded-xl p-4">
        <div className="flex items-center gap-2 mb-1">
          <Award className="w-4 h-4 text-blue-600" />
          <span className="font-medium text-blue-900 text-sm">{course.guarantee}</span>
        </div>
        <p className="text-xs text-blue-700">
          50% Biology weightage in NEET • Expert faculty • Proven track record
        </p>
      </div>
    </motion.div>
  )
}

export default function ComprehensiveCourseCards() {
  const [selectedClass, setSelectedClass] = useState<string>('all')

  const classLevels = [
    { value: 'all', label: 'All Classes' },
    { value: 'Class IX', label: 'Class 9th' },
    { value: 'Class X', label: 'Class 10th' },
    { value: 'Class XI', label: 'Class 11th' },
    { value: 'Class XII', label: 'Class 12th' },
    { value: 'Dropper', label: 'Droppers' },
  ]

  const filteredCourses =
    selectedClass === 'all'
      ? courseData
      : courseData.filter((course) => course.classLevel === selectedClass)

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Complete NEET Biology Course Structure
        </h1>
        <p className="text-gray-600 mb-6">
          Comprehensive programs across all class levels with flexible pricing and payment options
        </p>

        {/* Class Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-6">
          {classLevels.map((cls) => (
            <button
              key={cls.value}
              onClick={() => setSelectedClass(cls.value)}
              className={`px-4 py-2 rounded-full font-medium transition-all ${
                selectedClass === cls.value
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {cls.label}
            </button>
          ))}
        </div>

        {/* Series Overview */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          {Object.entries(SeriesInfo).map(([key, series]) => (
            <div key={key} className="bg-white rounded-xl p-4 border border-gray-200">
              <div
                className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-white text-xs font-medium mb-2 ${series.color}`}
              >
                {series.icon}
                {series.name}
              </div>
              <div className="text-sm text-gray-600">{series.tagline}</div>
              <div className="text-xs text-gray-500">{series.batchSize}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Course Cards */}
      <div className="space-y-8">
        {filteredCourses.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>

      {/* Biology Premium Note */}
      <div className="mt-12 bg-orange-50 rounded-2xl p-8 text-center">
        <h3 className="text-2xl font-bold text-gray-900 mb-4">
          Why Biology Gets Premium Attention?
        </h3>
        <div className="grid md:grid-cols-3 gap-6 text-sm">
          <div>
            <div className="text-3xl font-bold text-orange-600 mb-2">50%</div>
            <div className="text-gray-700">NEET weightage (360/720 marks)</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-red-600 mb-2">2x</div>
            <div className="text-gray-700">Teaching time vs other subjects</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-purple-600 mb-2">100%</div>
            <div className="text-gray-700">Covers Zoology + Botany</div>
          </div>
        </div>
      </div>
    </div>
  )
}
