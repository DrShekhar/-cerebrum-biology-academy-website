'use client'

import { useState } from 'react'
import {
  GraduationCap,
  FileText,
  CheckCircle,
  Clock,
  Users,
  Phone,
  Mail,
  Calendar,
  BookOpen,
  ArrowRight,
  Download,
  Upload,
  CreditCard,
  MessageCircle,
} from 'lucide-react'
import { trackAndOpenWhatsApp } from '@/lib/whatsapp/tracking'
export default function AdmissionPage() {
  const [selectedCourse, setSelectedCourse] = useState('')
  const [currentStep, setCurrentStep] = useState(1)

  const admissionSteps = [
    {
      step: 1,
      title: 'Choose Course',
      description: 'Select your preferred course and batch',
      icon: BookOpen,
    },
    {
      step: 2,
      title: 'Fill Application',
      description: 'Complete your personal and academic details',
      icon: FileText,
    },
    {
      step: 3,
      title: 'Document Upload',
      description: 'Upload required documents for verification',
      icon: Upload,
    },
    {
      step: 4,
      title: 'Counseling',
      description: 'Attend counseling session with our experts',
      icon: Users,
    },
    {
      step: 5,
      title: 'Fee Payment',
      description: 'Complete the fee payment to confirm admission',
      icon: CreditCard,
    },
  ]

  const courses = [
    {
      id: 'class-11',
      name: 'Class 11th Foundation',
      duration: '2 Years',
      fee: '₹24,999',
      description: 'Complete NEET preparation starting from Class 11',
      features: ['Strong foundation building', 'Early NEET preparation', 'Regular assessments'],
    },
    {
      id: 'class-12',
      name: 'Class 12th Intensive',
      duration: '1 Year',
      fee: '₹34,999',
      description: 'Intensive NEET preparation for Class 12 students',
      features: [
        'Comprehensive syllabus coverage',
        'Regular mock tests',
        'Doubt clearing sessions',
      ],
    },
    {
      id: 'dropper',
      name: 'Dropper Batch',
      duration: '1 Year',
      fee: '₹44,999',
      description: 'Specialized program for NEET repeaters',
      features: ['Gap analysis', 'Focused preparation', 'Psychological support'],
    },
    {
      id: 'foundation',
      name: 'Foundation Course',
      duration: '6 Months',
      fee: '₹19,999',
      description: 'Foundation building for aspiring medical students',
      features: ['Basic concepts', 'Early preparation', 'Study habit development'],
    },
  ]

  const eligibilityCriteria = [
    {
      course: 'Class 11th Foundation',
      criteria: [
        'Completed Class 10th with minimum 60% marks',
        'Science stream with PCB subjects',
        'Age: 15-17 years',
      ],
    },
    {
      course: 'Class 12th Intensive',
      criteria: [
        'Currently in Class 12th or completed',
        'PCB subjects with minimum 50% marks',
        'Age: 16-19 years',
      ],
    },
    {
      course: 'Dropper Batch',
      criteria: [
        'Completed Class 12th with PCB',
        'Previous NEET attempt (optional)',
        'Age: 17-22 years',
      ],
    },
  ]

  const requiredDocuments = [
    { name: 'Class 10th Mark Sheet', required: true, format: 'PDF/JPG' },
    { name: 'Class 12th Mark Sheet (if applicable)', required: false, format: 'PDF/JPG' },
    { name: 'Passport Size Photographs (2)', required: true, format: 'JPG' },
    { name: 'Aadhar Card Copy', required: true, format: 'PDF/JPG' },
    { name: 'Income Certificate (for scholarships)', required: false, format: 'PDF' },
    { name: 'Caste Certificate (if applicable)', required: false, format: 'PDF' },
  ]

  const admissionTimeline = [
    { phase: 'Early Bird Registration', dates: 'January - March', discount: '20% OFF' },
    { phase: 'Regular Admission', dates: 'April - June', discount: '10% OFF' },
    { phase: 'Late Admission', dates: 'July - August', discount: 'No Discount' },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-blue-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center animate-fadeInUp">
            <div className="inline-flex items-center space-x-2 bg-green-400 text-green-900 px-4 py-2 rounded-full font-semibold mb-6">
              <CheckCircle className="w-5 h-5" />
              <span>Admissions Open 2026-27</span>
            </div>
            <h1 className="text-5xl font-bold mb-6">
              Start Your Journey to
              <span className="block text-yellow-300">Medical Excellence</span>
            </h1>
            <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
              Join thousands of successful students who have achieved their NEET dreams with
              Cerebrum Biology Academy. Simple admission process with comprehensive support.
            </p>
            <div className="flex flex-wrap justify-center gap-8 text-center">
              <div>
                <div className="text-3xl font-bold text-yellow-300">5 Steps</div>
                <div className="text-blue-200">Simple Process</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-yellow-300">24 Hours</div>
                <div className="text-blue-200">Quick Response</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-yellow-300">98%</div>
                <div className="text-blue-200">Success Rate</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Admission Process */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16 animate-fadeInUp">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Admission Process</h2>
            <p className="text-xl text-gray-600">
              Simple 5-step process to secure your seat at Cerebrum Biology Academy
            </p>
          </div>

          <div className="relative">
            {/* Progress Line */}
            <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-200 transform -translate-y-1/2 hidden lg:block"></div>

            <div className="grid lg:grid-cols-5 gap-8">
              {admissionSteps.map((step, index) => (
                <div key={step.step} className="text-center relative animate-fadeInUp">
                  <div className="relative z-10 bg-white">
                    <div
                      className={`w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4 ${
                        step.step <= currentStep
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-200 text-gray-600'
                      }`}
                    >
                      <step.icon className="w-8 h-8" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{step.title}</h3>
                    <p className="text-gray-600 text-sm">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Course Selection */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16 animate-fadeInUp">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Choose Your Course</h2>
            <p className="text-xl text-gray-600">
              Select the course that best fits your current academic level and goals
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {courses.map((course, index) => (
              <div
                key={course.id}
                className={`bg-white rounded-2xl p-6 border-2 transition-all duration-300 cursor-pointer ${
                  selectedCourse === course.id
                    ? 'border-blue-600 shadow-lg'
                    : 'border-gray-200 hover:border-blue-300'
                }`}
                onClick={() => setSelectedCourse(course.id)}
              >
                <div className="text-center mb-4">
                  <GraduationCap className="w-12 h-12 text-blue-600 mx-auto mb-3" />
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{course.name}</h3>
                  <p className="text-gray-600 text-sm mb-3">{course.description}</p>
                  <div className="text-2xl font-bold text-blue-600">{course.fee}</div>
                  <div className="text-gray-500 text-sm">{course.duration}</div>
                </div>

                <div className="space-y-2">
                  {course.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center space-x-2 text-sm text-gray-600">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Eligibility Criteria */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16 animate-fadeInUp">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Eligibility Criteria</h2>
            <p className="text-xl text-gray-600">
              Check if you meet the requirements for your preferred course
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
            {eligibilityCriteria.map((item, index) => (
              <div
                key={index}
                className="bg-gray-50 rounded-2xl p-6 border border-blue-100 animate-fadeInUp"
              >
                <h3 className="text-xl font-bold text-gray-900 mb-4">{item.course}</h3>
                <div className="space-y-3">
                  {item.criteria.map((criterion, idx) => (
                    <div key={idx} className="flex items-start space-x-2">
                      <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{criterion}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Required Documents */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16 animate-fadeInUp">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Required Documents</h2>
            <p className="text-xl text-gray-600">
              Prepare these documents for a smooth admission process
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8 animate-fadeInUp">
            <div className="space-y-4">
              {requiredDocuments.map((doc, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 border border-gray-200 rounded-xl"
                >
                  <div className="flex items-center space-x-3">
                    <FileText className="w-6 h-6 text-blue-600" />
                    <div>
                      <div className="font-semibold text-gray-900">
                        {doc.name}
                        {doc.required && <span className="text-red-500 ml-1">*</span>}
                      </div>
                      <div className="text-sm text-gray-600">Format: {doc.format}</div>
                    </div>
                  </div>
                  <div
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      doc.required ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-gray-600'
                    }`}
                  >
                    {doc.required ? 'Required' : 'Optional'}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Admission Timeline */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16 animate-fadeInUp">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Admission Timeline</h2>
            <p className="text-xl text-gray-600">
              Apply early to avail maximum discounts and secure your preferred batch
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
            {admissionTimeline.map((phase, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-green-50 to-blue-50 rounded-2xl p-6 border border-green-100 text-center animate-fadeInUp"
              >
                <Calendar className="w-12 h-12 text-green-600 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">{phase.phase}</h3>
                <p className="text-gray-600 mb-3">{phase.dates}</p>
                <div
                  className={`inline-block px-4 py-2 rounded-full font-semibold ${
                    index === 0
                      ? 'bg-green-100 text-green-700'
                      : index === 1
                        ? 'bg-yellow-100 text-yellow-700'
                        : 'bg-red-100 text-red-700'
                  }`}
                >
                  {phase.discount}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Apply Now CTA */}
      <section className="py-20 bg-blue-600 text-white">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <div className="animate-fadeInUp">
            <h2 className="text-4xl font-bold mb-4">Ready to Apply?</h2>
            <p className="text-xl text-blue-100 mb-8">
              Start your admission process — connect with our counselors instantly
            </p>
            <div className="space-y-4 max-w-md mx-auto">
              <button
                type="button"
                onClick={() =>
                  trackAndOpenWhatsApp({
                    source: 'admission-page',
                    message: `Hi! I want to apply for admission${selectedCourse ? ` to the ${selectedCourse} program` : ''}. Please guide me through the process.`,
                    campaign: 'admission',
                  })
                }
                className="w-full flex items-center justify-center gap-2 py-4 bg-green-600 hover:bg-green-700 text-white font-bold text-lg rounded-xl shadow-lg transition-all min-h-[56px] touch-manipulation"
              >
                <MessageCircle className="w-6 h-6" />
                Apply via WhatsApp
              </button>

              <a
                href="tel:+918826444334"
                className="w-full flex items-center justify-center gap-2 py-4 bg-white text-blue-600 hover:bg-blue-50 font-bold text-lg rounded-xl shadow-lg transition-all min-h-[56px] touch-manipulation"
              >
                <Phone className="w-6 h-6" />
                Call: +91 88264 44334
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
