'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import {
  CheckCircle,
  Clock,
  FileText,
  Calendar,
  CreditCard,
  Users,
  Award,
  ArrowRight,
  Download,
  Phone,
  MessageSquare,
  Target,
  BookOpen,
  GraduationCap,
  Star,
  Zap,
  Shield,
  Heart,
  Play,
  ChevronDown,
  ChevronUp,
  AlertCircle,
  Info,
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'

export default function AdmissionsPage() {
  const [activeStep, setActiveStep] = useState(0)
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null)

  const admissionSteps = [
    {
      step: 1,
      title: 'Application Submission',
      duration: '5-10 minutes',
      description:
        'Fill out our comprehensive application form with your academic details and NEET goals.',
      details: [
        'Complete online application form',
        'Upload academic transcripts (10th & 12th)',
        'Provide previous NEET scores (if applicable)',
        'Select preferred batch and course',
        'Submit application fee payment',
      ],
      documents: [
        'Class 10th Marksheet',
        'Class 12th Marksheet',
        'Previous NEET Scorecard',
        'Passport Size Photos',
      ],
      icon: FileText,
      color: 'bg-blue-500',
    },
    {
      step: 2,
      title: 'Counselor Interaction',
      duration: '30-45 minutes',
      description:
        'One-on-one session with our expert counselors to understand your goals and recommend the best course.',
      details: [
        'Personalized counseling session',
        'Academic background assessment',
        'Goal setting and course recommendation',
        'Doubt clarification about our programs',
        'Fee structure and scholarship discussion',
      ],
      documents: [
        'Bring all original documents',
        'List of questions/doubts',
        'Parent/Guardian presence (if minor)',
      ],
      icon: MessageSquare,
      color: 'bg-green-500',
    },
    {
      step: 3,
      title: 'Diagnostic Test',
      duration: '2-3 hours',
      description:
        'Comprehensive assessment to evaluate your current knowledge level and identify improvement areas.',
      details: [
        'NEET-pattern diagnostic test',
        'Subject-wise performance analysis',
        'Strength and weakness identification',
        'Personalized study plan creation',
        'Learning style assessment',
      ],
      documents: ['Calculator', 'Pen/Pencil', 'Valid ID proof'],
      icon: Target,
      color: 'bg-purple-500',
    },
    {
      step: 4,
      title: 'Course Selection & Enrollment',
      duration: '15-20 minutes',
      description:
        'Finalize your course selection based on diagnostic results and complete the enrollment process.',
      details: [
        'Review diagnostic test results',
        'Finalize course and batch selection',
        'Complete fee payment process',
        'Receive study materials and schedule',
        'Join student WhatsApp group',
      ],
      documents: ['Fee payment receipt', 'Signed enrollment agreement'],
      icon: GraduationCap,
      color: 'bg-orange-500',
    },
    {
      step: 5,
      title: 'Orientation & Class Start',
      duration: '2-3 hours',
      description:
        'Comprehensive orientation session followed by your first biology class to kickstart your NEET journey.',
      details: [
        'Campus and facility tour',
        'Faculty introduction session',
        'Study methodology orientation',
        'Resource and material distribution',
        'First biology class attendance',
      ],
      documents: ['Study materials', 'Notebook and stationery'],
      icon: BookOpen,
      color: 'bg-red-500',
    },
  ]

  const requirements = [
    {
      category: 'Academic Requirements',
      items: [
        'Completed Class 12th with PCB (Physics, Chemistry, Biology)',
        'Minimum 50% aggregate in PCB subjects',
        'Valid NEET registration (for current year aspirants)',
        'English proficiency for course materials',
      ],
      icon: BookOpen,
      color: 'bg-blue-100 text-blue-600',
    },
    {
      category: 'Documents Required',
      items: [
        'Class 10th and 12th mark sheets',
        'Previous NEET score card (if applicable)',
        'Transfer certificate from previous institution',
        'Passport size photographs (6 copies)',
        'Valid ID proof (Aadhar/Passport)',
        'Medical fitness certificate',
      ],
      icon: FileText,
      color: 'bg-green-100 text-green-600',
    },
    {
      category: 'Age & Eligibility',
      items: [
        'Minimum age: 16 years (as on admission date)',
        'Maximum age: 25 years for general category',
        'No upper age limit for SC/ST candidates',
        'Must be eligible for NEET examination',
      ],
      icon: Calendar,
      color: 'bg-purple-100 text-purple-600',
    },
  ]

  const batchOptions = [
    {
      name: 'Foundation Batch (Class 11th)',
      duration: '2 Years',
      description: 'Comprehensive foundation building for early starters',
      features: [
        'Complete syllabus coverage',
        'Regular tests',
        'Doubt sessions',
        'Study materials',
      ],
      price: '₹1,20,000',
      discount: '20% Early Bird Discount',
      popular: false,
    },
    {
      name: 'Target Batch (Class 12th)',
      duration: '1 Year',
      description: 'Intensive preparation for Class 12th students',
      features: ['Accelerated learning', 'Mock tests', 'Revision sessions', 'Performance tracking'],
      price: '₹85,000',
      discount: '15% Scholarship Available',
      popular: true,
    },
    {
      name: 'Dropper Batch',
      duration: '1 Year',
      description: 'Specialized program for NEET repeaters',
      features: [
        'Concept revision',
        'Advanced problems',
        'Motivation sessions',
        'Individual attention',
      ],
      price: '₹75,000',
      discount: '10% Previous Student Discount',
      popular: false,
    },
    {
      name: 'Crash Course',
      duration: '6 Months',
      description: 'High-intensity last-minute preparation',
      features: ['Quick revision', 'Important topics', 'Test series', 'Strategy sessions'],
      price: '₹45,000',
      discount: 'Limited Time Offer',
      popular: false,
    },
  ]

  const faqs = [
    {
      question: 'What is the admission process timeline?',
      answer:
        'The complete admission process typically takes 3-5 days from application submission to class commencement. We ensure quick processing to minimize any delay in your preparation.',
    },
    {
      question: 'Are there any entrance tests for admission?',
      answer:
        'We conduct a diagnostic test to assess your current knowledge level and create a personalized study plan. This is not an elimination test but a tool to help us serve you better.',
    },
    {
      question: 'What are the payment options available?',
      answer:
        'We offer flexible payment options including one-time payment, EMI options, and installment plans. Scholarships are available for meritorious students.',
    },
    {
      question: 'Can I change my batch after enrollment?',
      answer:
        'Yes, you can change your batch within the first 15 days of enrollment, subject to availability and approval from the academic team.',
    },
    {
      question: 'What if I miss the diagnostic test?',
      answer:
        'We conduct diagnostic tests multiple times a week. You can reschedule your test date, and we also offer online diagnostic tests for outstation students.',
    },
    {
      question: 'Are there any scholarships available?',
      answer:
        'We offer merit-based scholarships of up to 50% for top performers in our diagnostic test. Special discounts are available for students from economically weaker sections.',
    },
    {
      question: 'What is included in the course fees?',
      answer:
        'Course fees include all study materials, test series, doubt sessions, online resources, and access to our digital learning platform. No hidden charges.',
    },
    {
      question: 'Can parents attend the counseling session?',
      answer:
        'Absolutely! We encourage parent participation in counseling sessions. It helps us understand family expectations and create better support systems.',
    },
  ]

  const scholarships = [
    {
      type: 'Merit Scholarship',
      criteria: 'Top 10% in diagnostic test',
      benefit: 'Up to 50% fee waiver',
      icon: Award,
      color: 'bg-yellow-500',
    },
    {
      type: 'Need-based Support',
      criteria: 'Family income < ₹3 lakhs/year',
      benefit: 'Up to 30% fee waiver',
      icon: Heart,
      color: 'bg-red-500',
    },
    {
      type: 'Early Bird Discount',
      criteria: 'Admission before deadline',
      benefit: '20% discount on course fees',
      icon: Clock,
      color: 'bg-blue-500',
    },
    {
      type: 'Referral Bonus',
      criteria: 'Refer a friend who enrolls',
      benefit: '₹5,000 cashback',
      icon: Users,
      color: 'bg-green-500',
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-12 sm:py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center">
            <motion.h1
              className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              Admission Process
            </motion.h1>
            <motion.p
              className="text-base sm:text-lg md:text-xl text-blue-100 max-w-3xl mx-auto mb-6 sm:mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Your journey to medical college admission starts here. Follow our simple 5-step
              admission process and join thousands of successful NEET aspirants.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Button
                variant="outline"
                size="lg"
                className="border-white text-white hover:bg-white hover:text-blue-600 w-full sm:w-auto"
              >
                <Download className="w-5 h-5 mr-2" />
                Download Brochure
              </Button>
              <Button
                variant="primary"
                size="lg"
                className="bg-white text-blue-600 hover:bg-gray-100 w-full sm:w-auto"
              >
                <Phone className="w-5 h-5 mr-2" />
                Start Application
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Step-by-Step Process */}
      <section className="py-12 sm:py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10 sm:mb-12 md:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
              5-Step Admission Process
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600">
              Simple, transparent, and student-friendly admission process
            </p>
          </div>

          <div className="space-y-4 sm:space-y-6 md:space-y-8">
            {admissionSteps.map((step, index) => (
              <motion.div
                key={index}
                className={`relative ${
                  activeStep === index ? 'bg-blue-50' : 'bg-white'
                } rounded-2xl sm:rounded-3xl shadow-lg overflow-hidden cursor-pointer transition-all`}
                onClick={() => setActiveStep(activeStep === index ? -1 : index)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="p-4 sm:p-6 md:p-8">
                  <div className="flex items-start sm:items-center">
                    <div
                      className={`w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 ${step.color} rounded-xl sm:rounded-2xl flex items-center justify-center mr-3 sm:mr-4 md:mr-6 flex-shrink-0`}
                    >
                      <step.icon className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-white" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <span className="text-xs sm:text-sm font-semibold text-blue-600">
                          STEP {step.step}
                        </span>
                        <div className="flex items-center text-gray-500">
                          <Clock className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                          <span className="text-xs sm:text-sm">{step.duration}</span>
                        </div>
                      </div>
                      <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-1 sm:mb-2">
                        {step.title}
                      </h3>
                      <p className="text-sm sm:text-base text-gray-600 pr-8 sm:pr-0">
                        {step.description}
                      </p>
                    </div>

                    <div className="ml-2 sm:ml-6 flex-shrink-0 absolute top-4 right-4 sm:relative sm:top-auto sm:right-auto">
                      {activeStep === index ? (
                        <ChevronUp className="w-5 h-5 sm:w-6 sm:h-6 text-gray-400" />
                      ) : (
                        <ChevronDown className="w-5 h-5 sm:w-6 sm:h-6 text-gray-400" />
                      )}
                    </div>
                  </div>

                  <AnimatePresence>
                    {activeStep === index && (
                      <motion.div
                        className="mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-gray-200"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                          <div>
                            <h4 className="text-base sm:text-lg font-bold text-gray-900 mb-3 sm:mb-4">
                              Process Details
                            </h4>
                            <ul className="space-y-2 sm:space-y-3">
                              {step.details.map((detail, idx) => (
                                <li key={idx} className="flex items-start">
                                  <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 mr-2 sm:mr-3 mt-0.5 flex-shrink-0" />
                                  <span className="text-sm sm:text-base text-gray-700">
                                    {detail}
                                  </span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          <div>
                            <h4 className="text-base sm:text-lg font-bold text-gray-900 mb-3 sm:mb-4">
                              Required Documents
                            </h4>
                            <ul className="space-y-2 sm:space-y-3">
                              {step.documents.map((doc, idx) => (
                                <li key={idx} className="flex items-start">
                                  <FileText className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500 mr-2 sm:mr-3 mt-0.5 flex-shrink-0" />
                                  <span className="text-sm sm:text-base text-gray-700">{doc}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>

                        <div className="mt-4 sm:mt-6 flex flex-col sm:flex-row gap-3 sm:gap-4">
                          {index === 0 && (
                            <Button variant="primary" size="lg" className="w-full sm:w-auto">
                              <FileText className="w-5 h-5 mr-2" />
                              Start Application
                            </Button>
                          )}
                          <Button variant="outline" size="lg" className="w-full sm:w-auto">
                            <Phone className="w-5 h-5 mr-2" />
                            Get Help
                          </Button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Requirements */}
      <section className="py-12 sm:py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10 sm:mb-12 md:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
              Admission Requirements
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600">
              Essential criteria and documents for enrollment
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {requirements.map((req, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-2xl sm:rounded-3xl shadow-lg p-6 sm:p-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div
                  className={`w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 ${req.color} rounded-xl sm:rounded-2xl flex items-center justify-center mb-4 sm:mb-6`}
                >
                  <req.icon className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 sm:mb-6">
                  {req.category}
                </h3>
                <ul className="space-y-2 sm:space-y-3">
                  {req.items.map((item, idx) => (
                    <li key={idx} className="flex items-start">
                      <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 mr-2 sm:mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-sm sm:text-base text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Batch Options */}
      <section className="py-12 sm:py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10 sm:mb-12 md:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
              Choose Your Batch
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600">
              Tailored programs for different student needs
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {batchOptions.map((batch, index) => (
              <motion.div
                key={index}
                className={`relative bg-white rounded-2xl sm:rounded-3xl shadow-lg p-6 sm:p-8 ${
                  batch.popular ? 'ring-2 ring-blue-500' : ''
                }`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                {batch.popular && (
                  <div className="absolute -top-3 sm:-top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-blue-500 text-white px-3 py-1 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-semibold whitespace-nowrap">
                      Most Popular
                    </span>
                  </div>
                )}

                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 mt-2 sm:mt-0">
                  {batch.name}
                </h3>
                <p className="text-blue-600 font-medium mb-3 sm:mb-4 text-sm sm:text-base">
                  {batch.duration}
                </p>
                <p className="text-gray-600 mb-4 sm:mb-6 text-sm sm:text-base">
                  {batch.description}
                </p>

                <div className="mb-4 sm:mb-6">
                  <div className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">
                    {batch.price}
                  </div>
                  <div className="text-xs sm:text-sm text-green-600 font-medium">
                    {batch.discount}
                  </div>
                </div>

                <ul className="space-y-2 mb-6 sm:mb-8">
                  {batch.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-xs sm:text-sm text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  variant={batch.popular ? 'primary' : 'outline'}
                  className="w-full text-sm sm:text-base"
                >
                  Choose This Batch
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Scholarships */}
      <section className="py-12 sm:py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10 sm:mb-12 md:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
              Scholarships & Discounts
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600">
              Making quality education accessible for all
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {scholarships.map((scholarship, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-2xl sm:rounded-3xl shadow-lg p-6 sm:p-8 text-center hover:shadow-xl transition-shadow"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div
                  className={`w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 ${scholarship.color} rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6`}
                >
                  <scholarship.icon className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-white" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4">
                  {scholarship.type}
                </h3>
                <p className="text-sm sm:text-base text-gray-600 mb-3 sm:mb-4">
                  {scholarship.criteria}
                </p>
                <div className="text-xl sm:text-2xl font-bold text-green-600">
                  {scholarship.benefit}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12 sm:py-16 md:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10 sm:mb-12 md:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600">
              Get answers to common admission queries
            </p>
          </div>

          <div className="space-y-3 sm:space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                className="bg-gray-50 rounded-xl sm:rounded-2xl overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
              >
                <button
                  className="w-full p-4 sm:p-6 text-left flex items-start sm:items-center justify-between hover:bg-gray-100 transition-colors gap-3"
                  onClick={() => setExpandedFAQ(expandedFAQ === index ? null : index)}
                >
                  <span className="font-semibold text-gray-900 text-sm sm:text-base flex-1 pr-2">
                    {faq.question}
                  </span>
                  <div className="flex-shrink-0 mt-0.5 sm:mt-0">
                    {expandedFAQ === index ? (
                      <ChevronUp className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500" />
                    ) : (
                      <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500" />
                    )}
                  </div>
                </button>

                <AnimatePresence>
                  {expandedFAQ === index && (
                    <motion.div
                      className="px-4 pb-4 sm:px-6 sm:pb-6"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <p className="text-sm sm:text-base text-gray-700">{faq.answer}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-r from-green-600 to-blue-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6">
            Ready to Start Your NEET Journey?
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-green-100 mb-6 sm:mb-8">
            Join thousands of successful students and secure your medical college admission with our
            expert guidance and proven methodology.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <Button
              variant="outline"
              size="xl"
              className="border-white text-white hover:bg-white hover:text-green-600 w-full sm:w-auto"
            >
              <Download className="w-5 h-5 mr-2" />
              Download Application
            </Button>
            <Link href="/contact" className="w-full sm:w-auto">
              <Button
                variant="primary"
                size="xl"
                className="bg-white text-green-600 hover:bg-gray-100 w-full"
              >
                Apply Now
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>

          <div className="mt-10 sm:mt-12 grid grid-cols-3 gap-4 sm:gap-6 md:gap-8 text-center">
            <div>
              <div className="text-2xl sm:text-3xl font-bold mb-1 sm:mb-2">Free</div>
              <div className="text-xs sm:text-sm md:text-base text-green-100">
                Counseling Session
              </div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-bold mb-1 sm:mb-2">5 Days</div>
              <div className="text-xs sm:text-sm md:text-base text-green-100">Quick Processing</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-bold mb-1 sm:mb-2">94%</div>
              <div className="text-xs sm:text-sm md:text-base text-green-100">Success Rate</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
