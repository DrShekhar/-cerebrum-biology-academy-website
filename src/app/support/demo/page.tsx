'use client'

import { useState } from 'react'
import {
  Calendar,
  Clock,
  Users,
  Video,
  CheckCircle,
  Star,
  BookOpen,
  Award,
  Phone,
  Mail,
  MapPin,
  ArrowRight,
  Play,
  Microscope,
  GraduationCap,
} from 'lucide-react'
import { motion } from 'framer-motion'

export default function DemoPage() {
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('')
  const [selectedCourse, setSelectedCourse] = useState('')
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    class: '',
    preferredDate: '',
    preferredTime: '',
  })

  const timeSlots = [
    { id: '10am', time: '10:00 AM - 11:00 AM', available: true },
    { id: '2pm', time: '2:00 PM - 3:00 PM', available: true },
    { id: '4pm', time: '4:00 PM - 5:00 PM', available: false },
    { id: '6pm', time: '6:00 PM - 7:00 PM', available: true },
    { id: '8pm', time: '8:00 PM - 9:00 PM', available: true },
  ]

  const courses = [
    { id: 'class-11', name: 'Class 11th Foundation', duration: '2 Years' },
    { id: 'class-12', name: 'Class 12th Intensive', duration: '1 Year' },
    { id: 'dropper', name: 'Dropper Batch', duration: '1 Year' },
    { id: 'foundation', name: 'Foundation Course', duration: '6 Months' },
  ]

  const demoFeatures = [
    {
      icon: Video,
      title: 'Live Interactive Session',
      description: 'Experience our unique teaching methodology with real-time doubt clearing',
    },
    {
      icon: Microscope,
      title: 'NEET-Focused Content',
      description: 'Get a preview of our NEET-specific biology curriculum and exam strategies',
    },
    {
      icon: Users,
      title: 'Meet Our Faculty',
      description: 'Interact with our experienced biology teachers and understand their approach',
    },
    {
      icon: BookOpen,
      title: 'Study Materials Preview',
      description: 'Access sample study materials, notes, and practice questions',
    },
  ]

  const facultyPreview = [
    {
      name: 'Dr. Priya Sharma',
      qualification: 'Ph.D. Botany, 15+ years experience',
      specialization: 'Plant Physiology & Ecology',
      image: '/faculty/dr-priya-sharma.jpg',
    },
    {
      name: 'Dr. Rajesh Kumar',
      qualification: 'M.Sc. Zoology, 12+ years experience',
      specialization: 'Human Physiology & Genetics',
      image: '/faculty/dr-rajesh-kumar.jpg',
    },
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle demo booking
    console.log('Demo booking:', {
      ...formData,
      course: selectedCourse,
      timeSlot: selectedTimeSlot,
    })
    alert('Demo class booked successfully! We will contact you shortly.')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-blue-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center space-x-2 bg-yellow-400 text-blue-900 px-4 py-2 rounded-full font-semibold mb-6">
              <Star className="w-5 h-5" />
              <span>Free Demo Class Available</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6">
              Experience Our Teaching
              <span className="block text-yellow-300">Before You Enroll</span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-blue-100 mb-6 sm:mb-8 max-w-3xl mx-auto">
              Join our free demo class and discover why 98% of our students crack NEET. Experience
              our unique teaching methodology and meet our expert faculty.
            </p>
            <div className="flex flex-wrap justify-center gap-8 text-center">
              <div>
                <div className="text-3xl font-bold text-yellow-300">1 Hour</div>
                <div className="text-blue-200">Live Demo Class</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-yellow-300">Free</div>
                <div className="text-blue-200">No Hidden Charges</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-yellow-300">Expert</div>
                <div className="text-blue-200">Faculty Teaching</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Demo Features */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">What You'll Experience</h2>
            <p className="text-xl text-gray-600">
              Get a comprehensive preview of our teaching methodology and course structure
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {demoFeatures.map((feature, index) => (
              <motion.div
                key={index}
                className="text-center p-6 bg-gray-50 rounded-2xl hover:shadow-lg transition-shadow duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <feature.icon className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Booking Form Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Book Your Free Demo Class</h2>
            <p className="text-xl text-gray-600">
              Choose your preferred time slot and get started with your NEET preparation journey
            </p>
          </motion.div>

          <motion.div
            className="bg-white rounded-3xl shadow-lg p-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Course Selection */}
              <div>
                <label className="block text-lg font-semibold text-gray-900 mb-4">
                  Select Course
                </label>
                <div className="grid md:grid-cols-2 gap-4">
                  {courses.map((course) => (
                    <button
                      key={course.id}
                      type="button"
                      onClick={() => setSelectedCourse(course.id)}
                      className={`p-4 border-2 rounded-xl text-left transition-all duration-300 ${
                        selectedCourse === course.id
                          ? 'border-blue-600 bg-blue-50'
                          : 'border-gray-200 hover:border-blue-300'
                      }`}
                    >
                      <div className="font-semibold text-gray-900">{course.name}</div>
                      <div className="text-sm text-gray-600">{course.duration}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Time Slot Selection */}
              <div>
                <label className="block text-lg font-semibold text-gray-900 mb-4">
                  Available Time Slots
                </label>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {timeSlots.map((slot) => (
                    <button
                      key={slot.id}
                      type="button"
                      disabled={!slot.available}
                      onClick={() => setSelectedTimeSlot(slot.id)}
                      className={`p-4 border-2 rounded-xl text-center transition-all duration-300 ${
                        !slot.available
                          ? 'border-gray-200 bg-gray-100 text-gray-400 cursor-not-allowed'
                          : selectedTimeSlot === slot.id
                            ? 'border-blue-600 bg-blue-50'
                            : 'border-gray-200 hover:border-blue-300'
                      }`}
                    >
                      <Clock className="w-5 h-5 mx-auto mb-2" />
                      <div className="font-semibold">{slot.time}</div>
                      {!slot.available && <div className="text-xs text-red-500 mt-1">Booked</div>}
                    </button>
                  ))}
                </div>
              </div>

              {/* Personal Information */}
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
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
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
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
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
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Current Class
                  </label>
                  <select
                    className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={formData.class}
                    onChange={(e) => setFormData({ ...formData, class: e.target.value })}
                  >
                    <option value="">Select your class</option>
                    <option value="10th">Class 10th</option>
                    <option value="11th">Class 11th</option>
                    <option value="12th">Class 12th</option>
                    <option value="12th-pass">12th Pass</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                disabled={!selectedCourse || !selectedTimeSlot}
                className="w-full bg-indigo-500 text-white py-4 rounded-xl hover:bg-indigo-600 transition-all duration-300 flex items-center justify-center space-x-2 font-semibold text-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Calendar className="w-5 h-5" />
                <span>Book Free Demo Class</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </form>
          </motion.div>
        </div>
      </section>

      {/* Faculty Preview */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Meet Our Expert Faculty</h2>
            <p className="text-xl text-gray-600">
              Learn from experienced educators who have helped thousands crack NEET
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-4xl mx-auto">
            {facultyPreview.map((faculty, index) => (
              <motion.div
                key={index}
                className="bg-gray-50 rounded-2xl p-8 text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                <div className="w-24 h-24 bg-blue-600 rounded-full mx-auto mb-6 flex items-center justify-center">
                  <GraduationCap className="w-12 h-12 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{faculty.name}</h3>
                <p className="text-blue-600 font-semibold mb-2">{faculty.qualification}</p>
                <p className="text-gray-600">{faculty.specialization}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">Have Questions?</h2>
          <p className="text-xl text-blue-100 mb-8">
            Our counseling team is here to help you choose the right course and demo session
          </p>
          <div className="flex flex-wrap justify-center gap-8">
            <div className="flex items-center space-x-2">
              <Phone className="w-5 h-5" />
              <span>+91 88264 44334</span>
            </div>
            <div className="flex items-center space-x-2">
              <Mail className="w-5 h-5" />
              <span>info@cerebrumbiologyacademy.com</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
