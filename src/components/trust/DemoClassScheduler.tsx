'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Calendar,
  Clock,
  User,
  Users,
  Video,
  MapPin,
  CheckCircle,
  AlertCircle,
  ArrowRight,
  Play,
  Star,
  Award,
  BookOpen,
  Zap,
  Gift,
  Phone,
  Mail,
  ChevronLeft,
  ChevronRight,
  Globe,
  Monitor,
} from 'lucide-react'
import { getPlaceholderAvatar } from '@/lib/images/imageUtils'

interface DemoClass {
  id: string
  title: string
  description: string
  subject: 'Biology' | 'Botany' | 'Zoology' | 'Genetics'
  faculty: {
    name: string
    photo: string
    qualification: string
    experience: number
    rating: number
  }
  duration: number // in minutes
  capacity: number
  enrolledCount: number
  format: 'online' | 'offline' | 'hybrid'
  level: 'beginner' | 'intermediate' | 'advanced'
  highlights: string[]
  whatYouLearn: string[]
  prerequisites?: string[]
}

interface TimeSlot {
  id: string
  date: string
  time: string
  isAvailable: boolean
  spotsLeft: number
  isPopular?: boolean
  discount?: number
}

interface DemoClassSchedulerProps {
  preSelectedSeries?: 'pinnacle' | 'ascent' | 'pursuit'
  showTestimonials?: boolean
  className?: string
}

// Mock demo classes data
const DEMO_CLASSES: DemoClass[] = [
  {
    id: '1',
    title: 'NEET Biology Masterclass: Cell Biology Simplified',
    description:
      'Understand the fundamentals of cell structure and functions with interactive diagrams and real NEET questions',
    subject: 'Biology',
    faculty: {
      name: 'Dr. Rajesh Kumar Singh',
      photo: getPlaceholderAvatar('Dr. Rajesh Kumar Singh', 100, '1E40AF', 'fff'),
      qualification: 'Ph.D. Molecular Biology, AIIMS',
      experience: 12,
      rating: 4.9,
    },
    duration: 90,
    capacity: 30,
    enrolledCount: 23,
    format: 'online',
    level: 'intermediate',
    highlights: [
      'Live interactive session with Q&A',
      'NEET-specific problem solving techniques',
      'Digital notes and diagrams included',
      'Recording available for 7 days',
    ],
    whatYouLearn: [
      'Cell membrane structure and transport',
      'Organelles and their functions',
      'Cell cycle and division',
      'NEET question patterns and strategies',
    ],
  },
  {
    id: '2',
    title: 'Plant Physiology Deep Dive: Photosynthesis Mastery',
    description:
      'Master photosynthesis concepts with visual animations and solve complex NEET problems',
    subject: 'Botany',
    faculty: {
      name: 'Dr. Priya Mehta',
      photo: getPlaceholderAvatar('Dr. Priya Mehta', 100, '059669', 'fff'),
      qualification: 'Ph.D. Plant Physiology, JNU',
      experience: 14,
      rating: 4.8,
    },
    duration: 75,
    capacity: 25,
    enrolledCount: 18,
    format: 'hybrid',
    level: 'advanced',
    highlights: [
      'Visual animations of photosynthesis',
      'Light and dark reactions explained',
      'C3, C4, CAM pathways comparison',
      'Previous year NEET questions solved',
    ],
    whatYouLearn: [
      'Photosynthesis mechanism in detail',
      'Factors affecting photosynthesis',
      'Comparative study of pathways',
      'NEET exam strategy for plant physiology',
    ],
  },
  {
    id: '3',
    title: 'Human Physiology: Nervous System & Coordination',
    description: 'Explore the complexities of human nervous system with 3D models and case studies',
    subject: 'Zoology',
    faculty: {
      name: 'Dr. Amit Sharma',
      photo: getPlaceholderAvatar('Dr. Amit Sharma', 100, '7C3AED', 'fff'),
      qualification: 'Ph.D. Zoology, University of Delhi',
      experience: 15,
      rating: 4.9,
    },
    duration: 100,
    capacity: 20,
    enrolledCount: 17,
    format: 'online',
    level: 'intermediate',
    highlights: [
      '3D nervous system models',
      'Reflex action demonstrations',
      'Brain anatomy visualization',
      'Medical case study discussions',
    ],
    whatYouLearn: [
      'Structure of nervous system',
      'Neuron structure and function',
      'Reflex actions and coordination',
      'Common NEET questions and solutions',
    ],
  },
]

// Generate time slots for the next 7 days
const generateTimeSlots = (): TimeSlot[] => {
  const slots: TimeSlot[] = []
  const today = new Date()

  for (let i = 1; i <= 7; i++) {
    const date = new Date(today)
    date.setDate(today.getDate() + i)

    const timeSlots = [
      { time: '10:00 AM', popular: i === 1 || i === 2 },
      { time: '2:00 PM', popular: false },
      { time: '6:00 PM', popular: i <= 3 },
      { time: '8:00 PM', popular: true },
    ]

    timeSlots.forEach((timeSlot, index) => {
      slots.push({
        id: `${i}-${index}`,
        date: date.toLocaleDateString('en-IN', {
          day: '2-digit',
          month: 'short',
          year: 'numeric',
        }),
        time: timeSlot.time,
        isAvailable: Math.random() > 0.2, // 80% slots available
        spotsLeft: Math.floor(Math.random() * 15) + 5,
        isPopular: timeSlot.popular,
        discount: timeSlot.popular ? 0 : Math.random() > 0.7 ? 20 : undefined,
      })
    })
  }

  return slots
}

function DemoClassCard({ demoClass }: { demoClass: DemoClass }) {
  const [showDetails, setShowDetails] = useState(false)

  const getFormatIcon = (format: string) => {
    switch (format) {
      case 'online':
        return Globe
      case 'offline':
        return MapPin
      case 'hybrid':
        return Monitor
      default:
        return Video
    }
  }

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'beginner':
        return 'bg-green-100 text-green-800'
      case 'intermediate':
        return 'bg-blue-100 text-blue-800'
      case 'advanced':
        return 'bg-purple-100 text-purple-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const FormatIcon = getFormatIcon(demoClass.format)

  return (
    <motion.div
      layout
      className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden"
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4">
        <div className="flex items-start justify-between">
          <div className="flex-grow">
            <h3 className="text-lg font-bold mb-2 line-clamp-2">{demoClass.title}</h3>
            <p className="text-blue-100 text-sm line-clamp-2">{demoClass.description}</p>
          </div>
          <span
            className={`px-2 py-1 rounded-full text-xs font-medium ${getLevelColor(demoClass.level)} ml-2`}
          >
            {demoClass.level}
          </span>
        </div>

        {/* Faculty Info */}
        <div className="flex items-center mt-3 space-x-3">
          <img
            src={demoClass.faculty.photo}
            alt={demoClass.faculty.name}
            className="w-10 h-10 rounded-full border-2 border-white"
          />
          <div>
            <div className="font-semibold text-sm">{demoClass.faculty.name}</div>
            <div className="text-xs text-blue-200">{demoClass.faculty.experience} years exp.</div>
          </div>
          <div className="ml-auto flex items-center">
            <Star className="w-4 h-4 text-yellow-400 fill-current" />
            <span className="text-sm font-medium ml-1">{demoClass.faculty.rating}</span>
          </div>
        </div>
      </div>

      {/* Class Details */}
      <div className="p-4">
        {/* Quick Info */}
        <div className="flex items-center justify-between mb-4 text-sm text-gray-600">
          <div className="flex items-center">
            <Clock className="w-4 h-4 mr-1" />
            {demoClass.duration} mins
          </div>
          <div className="flex items-center">
            <FormatIcon className="w-4 h-4 mr-1" />
            {demoClass.format}
          </div>
          <div className="flex items-center">
            <Users className="w-4 h-4 mr-1" />
            {demoClass.enrolledCount}/{demoClass.capacity}
          </div>
        </div>

        {/* Highlights */}
        <div className="mb-4">
          <h4 className="font-semibold text-gray-900 mb-2 text-sm">Class Highlights:</h4>
          <ul className="space-y-1">
            {demoClass.highlights.slice(0, showDetails ? undefined : 2).map((highlight, index) => (
              <li key={index} className="text-sm text-gray-700 flex items-start">
                <Zap className="w-3 h-3 text-yellow-500 mr-2 mt-0.5 flex-shrink-0" />
                {highlight}
              </li>
            ))}
          </ul>
          {demoClass.highlights.length > 2 && (
            <button
              onClick={() => setShowDetails(!showDetails)}
              className="text-blue-600 hover:text-blue-700 text-sm font-medium mt-2"
            >
              {showDetails ? 'Show less' : `+${demoClass.highlights.length - 2} more highlights`}
            </button>
          )}
        </div>

        {/* What You'll Learn (Expanded View) */}
        <AnimatePresence>
          {showDetails && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-4"
            >
              <h4 className="font-semibold text-gray-900 mb-2 text-sm">What You'll Learn:</h4>
              <ul className="space-y-1">
                {demoClass.whatYouLearn.map((item, index) => (
                  <li key={index} className="text-sm text-gray-700 flex items-start">
                    <BookOpen className="w-3 h-3 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Enrollment Status */}
        <div className="flex items-center justify-between">
          <div className="text-sm">
            {demoClass.capacity - demoClass.enrolledCount <= 5 ? (
              <span className="text-red-600 font-medium flex items-center">
                <AlertCircle className="w-4 h-4 mr-1" />
                Only {demoClass.capacity - demoClass.enrolledCount} spots left!
              </span>
            ) : (
              <span className="text-green-600 flex items-center">
                <CheckCircle className="w-4 h-4 mr-1" />
                Available
              </span>
            )}
          </div>
          <div className="text-sm font-bold text-blue-600">FREE</div>
        </div>
      </div>
    </motion.div>
  )
}

function TimeSlotGrid({
  selectedClass,
  onSlotSelect,
}: {
  selectedClass: DemoClass | null
  onSlotSelect: (slot: TimeSlot) => void
}) {
  const [timeSlots] = useState(generateTimeSlots())
  const [selectedDate, setSelectedDate] = useState<string>('')

  const uniqueDates = [...new Set(timeSlots.map((slot) => slot.date))]

  const filteredSlots = selectedDate
    ? timeSlots.filter((slot) => slot.date === selectedDate)
    : timeSlots

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
      <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
        <Calendar className="w-5 h-5 mr-2 text-blue-600" />
        Select Your Preferred Time
      </h3>

      {!selectedClass && (
        <div className="text-center py-8 text-gray-500">
          <Calendar className="w-12 h-12 mx-auto mb-3 opacity-50" />
          <p>Please select a demo class first to view available time slots</p>
        </div>
      )}

      {selectedClass && (
        <>
          {/* Date Filter */}
          <div className="mb-6">
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedDate('')}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedDate === ''
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                All Dates
              </button>
              {uniqueDates.map((date) => (
                <button
                  key={date}
                  onClick={() => setSelectedDate(date)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    selectedDate === date
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {date}
                </button>
              ))}
            </div>
          </div>

          {/* Time Slots Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {filteredSlots.map((slot) => (
              <motion.button
                key={slot.id}
                onClick={() => slot.isAvailable && onSlotSelect(slot)}
                whileHover={slot.isAvailable ? { scale: 1.02 } : {}}
                whileTap={slot.isAvailable ? { scale: 0.98 } : {}}
                disabled={!slot.isAvailable}
                className={`p-4 rounded-lg border-2 text-left transition-all relative ${
                  slot.isAvailable
                    ? 'border-gray-200 hover:border-blue-500 hover:bg-blue-50 cursor-pointer'
                    : 'border-gray-100 bg-gray-50 cursor-not-allowed opacity-60'
                }`}
              >
                {/* Popular Badge */}
                {slot.isPopular && slot.isAvailable && (
                  <div className="absolute top-2 right-2 bg-orange-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                    🔥 Popular
                  </div>
                )}

                {/* Discount Badge */}
                {slot.discount && slot.isAvailable && (
                  <div className="absolute top-2 right-2 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                    {slot.discount}% OFF
                  </div>
                )}

                <div className="font-semibold text-gray-900">{slot.date}</div>
                <div className="text-blue-600 font-medium">{slot.time}</div>
                <div className="text-sm text-gray-600 mt-1">
                  {slot.isAvailable ? `${slot.spotsLeft} spots left` : 'Fully booked'}
                </div>
              </motion.button>
            ))}
          </div>
        </>
      )}
    </div>
  )
}

function BookingForm({
  selectedClass,
  selectedSlot,
  onSubmit,
}: {
  selectedClass: DemoClass | null
  selectedSlot: TimeSlot | null
  onSubmit: (formData: any) => void
}) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    class: '',
    currentPreparation: '',
    specificQuestions: '',
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    onSubmit({
      ...formData,
      selectedClass: selectedClass?.id,
      selectedSlot: selectedSlot?.id,
    })

    setIsSubmitting(false)
  }

  const updateFormData = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const isFormValid = formData.name && formData.email && formData.phone && formData.class

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
      <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
        <User className="w-5 h-5 mr-2 text-green-600" />
        Complete Your Registration
      </h3>

      {!selectedClass || !selectedSlot ? (
        <div className="text-center py-8 text-gray-500">
          <User className="w-12 h-12 mx-auto mb-3 opacity-50" />
          <p>Please select a demo class and time slot to continue</p>
        </div>
      ) : (
        <>
          {/* Selection Summary */}
          <div className="bg-blue-50 rounded-lg p-4 mb-6">
            <h4 className="font-semibold text-blue-900 mb-2">Your Selection:</h4>
            <div className="text-sm text-blue-800">
              <div className="font-medium">{selectedClass.title}</div>
              <div className="flex items-center mt-1">
                <Calendar className="w-4 h-4 mr-1" />
                {selectedSlot.date} at {selectedSlot.time}
              </div>
              <div className="flex items-center mt-1">
                <Clock className="w-4 h-4 mr-1" />
                {selectedClass.duration} minutes
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => updateFormData('name', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter your full name"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Current Class *
                </label>
                <select
                  value={formData.class}
                  onChange={(e) => updateFormData('class', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                >
                  <option value="">Select your class</option>
                  <option value="9th">Class 9th</option>
                  <option value="10th">Class 10th</option>
                  <option value="11th">Class 11th</option>
                  <option value="12th">Class 12th</option>
                  <option value="dropper">Dropper/Repeater</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => updateFormData('email', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="your.email@example.com"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => updateFormData('phone', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="+91 9876543210"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Current Preparation Status
              </label>
              <select
                value={formData.currentPreparation}
                onChange={(e) => updateFormData('currentPreparation', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select your status</option>
                <option value="just_started">Just started NEET preparation</option>
                <option value="ongoing">Ongoing preparation (self-study)</option>
                <option value="other_coaching">Currently in other coaching</option>
                <option value="dropper">Dropper looking for better guidance</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Specific Questions or Topics (Optional)
              </label>
              <textarea
                value={formData.specificQuestions}
                onChange={(e) => updateFormData('specificQuestions', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                rows={3}
                placeholder="Any specific topics you'd like the faculty to cover in the demo class?"
              />
            </div>

            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-start">
                <Gift className="w-5 h-5 text-green-600 mr-3 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-green-900">What You Get:</h4>
                  <ul className="text-sm text-green-800 mt-1 space-y-1">
                    <li>• Free 90-minute interactive demo class</li>
                    <li>• Personal doubt clearing session</li>
                    <li>• Digital study notes and materials</li>
                    <li>• NEET preparation strategy consultation</li>
                  </ul>
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={!isFormValid || isSubmitting}
              className="w-full bg-gradient-to-r from-green-600 to-blue-600 text-white py-3 px-6 rounded-lg font-bold text-lg hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Confirming Your Slot...
                </>
              ) : (
                <>
                  🎯 Book FREE Demo Class
                  <ArrowRight className="w-5 h-5 ml-2" />
                </>
              )}
            </button>
          </form>
        </>
      )}
    </div>
  )
}

export default function DemoClassScheduler({
  preSelectedSeries,
  showTestimonials = true,
  className = '',
}: DemoClassSchedulerProps) {
  const [currentStep, setCurrentStep] = useState<'select' | 'schedule' | 'book' | 'confirmed'>(
    'select'
  )
  const [selectedClass, setSelectedClass] = useState<DemoClass | null>(null)
  const [selectedSlot, setSelectedSlot] = useState<TimeSlot | null>(null)
  const [bookingData, setBookingData] = useState<any>(null)

  const steps = [
    { key: 'select', label: 'Choose Demo Class', icon: BookOpen },
    { key: 'schedule', label: 'Select Time', icon: Calendar },
    { key: 'book', label: 'Book Session', icon: User },
    { key: 'confirmed', label: 'Confirmed', icon: CheckCircle },
  ]

  const currentStepIndex = steps.findIndex((step) => step.key === currentStep)

  const handleClassSelect = (demoClass: DemoClass) => {
    setSelectedClass(demoClass)
    setCurrentStep('schedule')
  }

  const handleSlotSelect = (slot: TimeSlot) => {
    setSelectedSlot(slot)
    setCurrentStep('book')
  }

  const handleBookingSubmit = (formData: any) => {
    setBookingData(formData)
    setCurrentStep('confirmed')
  }

  const resetScheduler = () => {
    setCurrentStep('select')
    setSelectedClass(null)
    setSelectedSlot(null)
    setBookingData(null)
  }

  return (
    <div
      className={`bg-gradient-to-br from-slate-50 to-blue-50 rounded-2xl overflow-hidden ${className}`}
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white p-8">
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold mb-2">🎯 Book Your FREE Demo Class</h2>
          <p className="text-green-100 text-lg">
            Experience our teaching methodology firsthand - No cost, no commitment
          </p>
        </div>

        {/* Benefits Highlight */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
          <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 text-center">
            <Video className="w-6 h-6 mx-auto mb-2" />
            <div className="text-sm font-semibold">Live Interactive</div>
          </div>
          <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 text-center">
            <Award className="w-6 h-6 mx-auto mb-2" />
            <div className="text-sm font-semibold">Expert Faculty</div>
          </div>
          <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 text-center">
            <Gift className="w-6 h-6 mx-auto mb-2" />
            <div className="text-sm font-semibold">Completely FREE</div>
          </div>
          <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 text-center">
            <Star className="w-6 h-6 mx-auto mb-2" />
            <div className="text-sm font-semibold">No Obligation</div>
          </div>
        </div>
      </div>

      {/* Progress Steps */}
      <div className="bg-white border-b border-gray-200 px-8 py-4">
        <div className="flex items-center justify-between max-w-4xl mx-auto">
          {steps.map((step, index) => {
            const IconComponent = step.icon
            const isActive = index <= currentStepIndex
            const isCurrent = index === currentStepIndex

            return (
              <div key={step.key} className="flex items-center">
                <div className={`flex items-center ${index > 0 ? 'ml-4' : ''}`}>
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                      isActive
                        ? isCurrent
                          ? 'bg-blue-600 text-white'
                          : 'bg-green-600 text-white'
                        : 'bg-gray-200 text-gray-600'
                    }`}
                  >
                    <IconComponent className="w-5 h-5" />
                  </div>
                  <span
                    className={`ml-3 font-medium ${isActive ? 'text-gray-900' : 'text-gray-500'}`}
                  >
                    {step.label}
                  </span>
                </div>

                {index < steps.length - 1 && (
                  <div
                    className={`flex-1 h-0.5 mx-4 ${
                      index < currentStepIndex ? 'bg-green-600' : 'bg-gray-200'
                    }`}
                  />
                )}
              </div>
            )
          })}
        </div>
      </div>

      {/* Main Content */}
      <div className="p-8">
        <AnimatePresence mode="wait">
          {/* Step 1: Select Demo Class */}
          {currentStep === 'select' && (
            <motion.div
              key="select"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="space-y-6"
            >
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Choose Your Demo Class</h3>
                <p className="text-gray-600">
                  Select the subject area you're most interested in exploring
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {DEMO_CLASSES.map((demoClass) => (
                  <div key={demoClass.id} className="relative">
                    <DemoClassCard demoClass={demoClass} />
                    <div className="mt-4">
                      <button
                        onClick={() => handleClassSelect(demoClass)}
                        className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                      >
                        Select This Class
                        <ArrowRight className="w-4 h-4 inline ml-2" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Step 2: Schedule Time */}
          {currentStep === 'schedule' && (
            <motion.div
              key="schedule"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="space-y-6"
            >
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">Choose Your Time Slot</h3>
                  <p className="text-gray-600">Pick a convenient time for your demo class</p>
                </div>
                <button
                  onClick={() => setCurrentStep('select')}
                  className="flex items-center text-blue-600 hover:text-blue-700 font-medium"
                >
                  <ChevronLeft className="w-4 h-4 mr-1" />
                  Change Class
                </button>
              </div>

              {selectedClass && (
                <div className="bg-white rounded-lg border border-gray-200 p-4 mb-6">
                  <h4 className="font-semibold text-gray-900">Selected Demo Class:</h4>
                  <p className="text-gray-700 mt-1">{selectedClass.title}</p>
                  <div className="flex items-center mt-2 text-sm text-gray-600">
                    <User className="w-4 h-4 mr-1" />
                    {selectedClass.faculty.name}
                    <Clock className="w-4 h-4 ml-4 mr-1" />
                    {selectedClass.duration} minutes
                  </div>
                </div>
              )}

              <TimeSlotGrid selectedClass={selectedClass} onSlotSelect={handleSlotSelect} />
            </motion.div>
          )}

          {/* Step 3: Book Session */}
          {currentStep === 'book' && (
            <motion.div
              key="book"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="space-y-6"
            >
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">Complete Your Booking</h3>
                  <p className="text-gray-600">
                    Just a few details to confirm your free demo class
                  </p>
                </div>
                <button
                  onClick={() => setCurrentStep('schedule')}
                  className="flex items-center text-blue-600 hover:text-blue-700 font-medium"
                >
                  <ChevronLeft className="w-4 h-4 mr-1" />
                  Change Time
                </button>
              </div>

              <BookingForm
                selectedClass={selectedClass}
                selectedSlot={selectedSlot}
                onSubmit={handleBookingSubmit}
              />
            </motion.div>
          )}

          {/* Step 4: Confirmation */}
          {currentStep === 'confirmed' && (
            <motion.div
              key="confirmed"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-12"
            >
              <div className="max-w-2xl mx-auto">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="w-10 h-10 text-green-600" />
                </div>

                <h3 className="text-3xl font-bold text-gray-900 mb-4">
                  🎉 Demo Class Booked Successfully!
                </h3>

                <p className="text-lg text-gray-600 mb-8">
                  Your free demo class has been confirmed. We'll send you the joining details via
                  email and SMS.
                </p>

                {selectedClass && selectedSlot && (
                  <div className="bg-blue-50 rounded-xl p-6 mb-8 text-left">
                    <h4 className="font-bold text-blue-900 mb-4">Booking Details:</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <strong>Class:</strong> {selectedClass.title}
                      </div>
                      <div>
                        <strong>Faculty:</strong> {selectedClass.faculty.name}
                      </div>
                      <div>
                        <strong>Date & Time:</strong> {selectedSlot.date} at {selectedSlot.time}
                      </div>
                      <div>
                        <strong>Duration:</strong> {selectedClass.duration} minutes
                      </div>
                      <div>
                        <strong>Format:</strong> {selectedClass.format}
                      </div>
                      <div>
                        <strong>Student:</strong> {bookingData?.name}
                      </div>
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                  <div className="bg-white rounded-lg border border-gray-200 p-4">
                    <Mail className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                    <h4 className="font-semibold text-gray-900">Email Confirmation</h4>
                    <p className="text-sm text-gray-600">Check your inbox for joining details</p>
                  </div>
                  <div className="bg-white rounded-lg border border-gray-200 p-4">
                    <Phone className="w-8 h-8 text-green-600 mx-auto mb-2" />
                    <h4 className="font-semibold text-gray-900">SMS Reminder</h4>
                    <p className="text-sm text-gray-600">We'll remind you 30 mins before</p>
                  </div>
                  <div className="bg-white rounded-lg border border-gray-200 p-4">
                    <Video className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                    <h4 className="font-semibold text-gray-900">Join Link</h4>
                    <p className="text-sm text-gray-600">Direct access to the demo class</p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button
                    onClick={resetScheduler}
                    className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                  >
                    Book Another Demo
                  </button>
                  <button className="bg-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors">
                    Explore Full Courses
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
