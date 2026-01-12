'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CONTACT_INFO, getPhoneLink, getDisplayPhone } from '@/lib/constants/contactInfo'
import {
  X,
  Shield,
  Award,
  Star,
  Phone,
  MapPin,
  CreditCard,
  Users,
  Clock,
  BookOpen,
  Heart,
  Calculator,
} from 'lucide-react'

interface ParentFlowProps {
  isOpen: boolean
  onClose: () => void
  onComplete?: (action: string) => void
}

interface ContentBlock {
  icon: React.ElementType
  title: string
  description: string
  stat: string
  emphasis?: boolean
}

export function ParentFlow({ isOpen, onClose, onComplete }: ParentFlowProps) {
  const [currentStep, setCurrentStep] = useState(0)

  const safetyAndSuccessStats: ContentBlock[] = [
    {
      icon: Shield,
      title: 'Child Safety First',
      description:
        'Dedicated parent-teacher meetings, progress tracking, and secure learning environment',
      stat: '100% Safe Environment',
      emphasis: true,
    },
    {
      icon: Award,
      title: 'Proven Success Rate',
      description: '94.2% of our students qualify NEET with significant score improvements',
      stat: '247 AIIMS Selections',
      emphasis: true,
    },
    {
      icon: Star,
      title: 'Parent Satisfaction',
      description: 'Regular updates, transparent communication, and visible progress reports',
      stat: '4.9/5 Parent Rating',
    },
  ]

  const facultyCredentials: ContentBlock[] = [
    {
      icon: BookOpen,
      title: 'AIIMS Faculty',
      description: 'All our teachers are AIIMS graduates and practicing doctors',
      stat: '15+ Years Experience',
    },
    {
      icon: Users,
      title: 'Personal Attention',
      description: 'Maximum 25 students per batch ensures individual focus on your child',
      stat: '1:25 Teacher Ratio',
    },
    {
      icon: Heart,
      title: 'Emotional Support',
      description: "Counseling sessions and stress management for your child's well-being",
      stat: 'Regular Counseling',
    },
  ]

  const feeTransparency = {
    totalFee: '₹65,000',
    components: [
      { item: 'Tuition Fees', amount: '₹45,000' },
      { item: 'Study Materials', amount: '₹8,000' },
      { item: 'Test Series', amount: '₹7,000' },
      { item: 'Doubt Sessions', amount: '₹5,000' },
    ],
    savings: '₹20,000 (vs competitors)',
  }

  const emiOptions = [
    { duration: '6 months', amount: '₹11,500/month', processing: 'No processing fee' },
    { duration: '12 months', amount: '₹6,000/month', processing: '1% processing fee' },
    { duration: '18 months', amount: '₹4,200/month', processing: '2% processing fee' },
  ]

  const steps = [
    'Safety & Success Statistics',
    'Faculty Credentials',
    'Fee Transparency',
    'EMI Options',
    'Direct Contact',
    'Visit Center Invitation',
  ]

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1)
    }
  }

  const handleAction = (action: string) => {
    onComplete?.(action)
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Parent Flow Modal */}
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="bg-slate-900 rounded-2xl shadow-2xl max-w-full sm:max-w-2xl lg:max-w-4xl xl:max-w-5xl w-full max-h-[90vh] overflow-hidden border border-slate-700"
        >
          {/* Header */}
          <div className="flex justify-between items-center p-6 border-b border-slate-700">
            <div>
              <h2 className="text-2xl font-bold text-white">For Parents & Guardians</h2>
              <p className="text-gray-400 text-sm">
                Complete information for informed decision-making
              </p>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white transition-colors p-2"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Progress Bar */}
          <div className="px-6 py-4 bg-slate-800/50">
            <div className="flex items-center justify-between text-sm text-gray-400 mb-2">
              <span>
                Step {currentStep + 1} of {steps.length}
              </span>
              <span>{steps[currentStep]}</span>
            </div>
            <div className="w-full bg-slate-700 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-green-600 to-blue-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
              />
            </div>
          </div>

          <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
            <AnimatePresence mode="wait">
              {/* Step 0: Safety & Success Statistics */}
              {currentStep === 0 && (
                <motion.div
                  key="safety-stats"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <div className="text-center mb-8">
                    <h3 className="text-xl font-bold text-white mb-2">
                      Your Child's Safety & Success
                    </h3>
                    <p className="text-gray-400">Our commitment to your child's future</p>
                  </div>

                  <div className="grid gap-6">
                    {safetyAndSuccessStats.map((item, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className={`bg-slate-800 rounded-xl p-6 border ${item.emphasis ? 'border-green-600/50 bg-green-800/20' : 'border-slate-700'}`}
                      >
                        <div className="flex items-start gap-4">
                          <div
                            className={`p-3 rounded-lg ${item.emphasis ? 'bg-green-600/20' : 'bg-blue-600/20'}`}
                          >
                            <item.icon
                              className={`w-6 h-6 ${item.emphasis ? 'text-green-500' : 'text-blue-400'}`}
                            />
                          </div>
                          <div className="flex-1">
                            <h4 className="text-lg font-semibold text-white mb-2">{item.title}</h4>
                            <p className="text-gray-300 mb-3">{item.description}</p>
                            <div
                              className={`text-lg font-bold ${item.emphasis ? 'text-green-500' : 'text-blue-400'}`}
                            >
                              {item.stat}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Step 1: Faculty Credentials */}
              {currentStep === 1 && (
                <motion.div
                  key="faculty-credentials"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <div className="text-center mb-8">
                    <h3 className="text-xl font-bold text-white mb-2">World-Class Faculty</h3>
                    <p className="text-gray-400">
                      Your child learns from the best medical professionals
                    </p>
                  </div>

                  <div className="grid gap-6">
                    {facultyCredentials.map((item, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-slate-800 rounded-xl p-6 border border-slate-700"
                      >
                        <div className="flex items-start gap-4">
                          <div className="bg-purple-600/20 p-3 rounded-lg">
                            <item.icon className="w-6 h-6 text-purple-400" />
                          </div>
                          <div className="flex-1">
                            <h4 className="text-lg font-semibold text-white mb-2">{item.title}</h4>
                            <p className="text-gray-300 mb-3">{item.description}</p>
                            <div className="text-lg font-bold text-purple-400">{item.stat}</div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  <div className="bg-purple-600/20 rounded-xl p-6 border border-purple-600/30">
                    <h4 className="text-lg font-semibold text-white mb-3">Faculty Meet & Greet</h4>
                    <p className="text-gray-300 mb-4">
                      Meet our faculty personally during the admission process. We believe
                      transparency builds trust.
                    </p>
                    <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors">
                      Schedule Faculty Meeting
                    </button>
                  </div>
                </motion.div>
              )}

              {/* Step 2: Fee Transparency */}
              {currentStep === 2 && (
                <motion.div
                  key="fee-transparency"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <div className="text-center mb-8">
                    <h3 className="text-xl font-bold text-white mb-2">Complete Fee Transparency</h3>
                    <p className="text-gray-400">No hidden charges, no surprises</p>
                  </div>

                  <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
                    <div className="flex justify-between items-start mb-6">
                      <div>
                        <h4 className="text-xl font-bold text-white">Total Course Fee</h4>
                        <p className="text-gray-400">Complete NEET Biology Program</p>
                      </div>
                      <div className="text-right">
                        <div className="text-3xl font-bold text-green-500">
                          {feeTransparency.totalFee}
                        </div>
                        <div className="text-sm text-gray-400">For 12 months</div>
                      </div>
                    </div>

                    <div className="space-y-3 mb-6">
                      {feeTransparency.components.map((component, index) => (
                        <div key={index} className="flex justify-between items-center py-2">
                          <span className="text-gray-300">{component.item}</span>
                          <span className="text-white font-semibold">{component.amount}</span>
                        </div>
                      ))}
                    </div>

                    <div className="border-t border-slate-600 pt-4">
                      <div className="flex justify-between items-center">
                        <span className="text-green-500 font-semibold">You Save</span>
                        <span className="text-green-500 font-bold">
                          {feeTransparency.savings}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-blue-600/20 rounded-xl p-6 border border-blue-600/30">
                    <h4 className="text-lg font-semibold text-white mb-3">What's Included?</h4>
                    <div className="grid md:grid-cols-2 gap-4 text-gray-300">
                      <div>• Live classes (3x/week)</div>
                      <div>• Recorded lectures access</div>
                      <div>• Complete study materials</div>
                      <div>• Weekly mock tests</div>
                      <div>• Doubt resolution sessions</div>
                      <div>• Parent-teacher meetings</div>
                      <div>• Progress tracking app</div>
                      <div>• Examination strategy</div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Step 3: EMI Options */}
              {currentStep === 3 && (
                <motion.div
                  key="emi-options"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <div className="text-center mb-8">
                    <h3 className="text-xl font-bold text-white mb-2">Flexible Payment Options</h3>
                    <p className="text-gray-400">Choose what works best for your budget</p>
                  </div>

                  <div className="grid gap-4">
                    {emiOptions.map((option, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className={`bg-slate-800 rounded-xl p-6 border ${index === 1 ? 'border-green-600 bg-green-800/20' : 'border-slate-700'} cursor-pointer hover:border-green-600/50 transition-colors`}
                      >
                        <div className="flex justify-between items-center">
                          <div>
                            <div className="text-lg font-semibold text-white mb-1">
                              {option.duration} EMI
                              {index === 1 && (
                                <span className="ml-2 text-xs bg-green-600 text-white px-2 py-1 rounded-full">
                                  POPULAR
                                </span>
                              )}
                            </div>
                            <div className="text-2xl font-bold text-green-500 mb-1">
                              {option.amount}
                            </div>
                            <div className="text-sm text-gray-400">{option.processing}</div>
                          </div>
                          <div className="text-right">
                            <CreditCard className="w-8 h-8 text-gray-400 mb-2" />
                            <div className="text-xs text-gray-400">Bank approved</div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  <div className="bg-yellow-600/20 rounded-xl p-6 border border-yellow-600/30">
                    <div className="flex items-start gap-3">
                      <Calculator className="w-6 h-6 text-yellow-400 mt-1" />
                      <div>
                        <h4 className="text-lg font-semibold text-white mb-2">EMI Calculator</h4>
                        <p className="text-gray-300 mb-3">
                          Use our EMI calculator to find the perfect payment plan for your family
                          budget.
                        </p>
                        <button className="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors">
                          Calculate EMI
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Step 4: Direct Contact */}
              {currentStep === 4 && (
                <motion.div
                  key="direct-contact"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <div className="text-center mb-8">
                    <h3 className="text-xl font-bold text-white mb-2">Direct Communication</h3>
                    <p className="text-gray-400">Speak directly with our admission counselors</p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
                      <div className="flex items-center gap-3 mb-4">
                        <Phone className="w-6 h-6 text-green-400" />
                        <h4 className="text-lg font-semibold text-white">Direct Phone</h4>
                      </div>
                      <p className="text-gray-300 mb-4">
                        Speak with our parent counselors who understand your concerns and can
                        provide detailed information.
                      </p>
                      <div className="space-y-3">
                        <a
                          href={getPhoneLink()}
                          className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors w-full"
                        >
                          <Phone className="w-5 h-5" />
                          {getDisplayPhone()}
                        </a>
                        <div className="text-center text-sm text-gray-400">
                          Available: Mon-Sat, 9 AM - 7 PM
                        </div>
                      </div>
                    </div>

                    <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
                      <div className="flex items-center gap-3 mb-4">
                        <Clock className="w-6 h-6 text-blue-400" />
                        <h4 className="text-lg font-semibold text-white">Scheduled Call</h4>
                      </div>
                      <p className="text-gray-300 mb-4">
                        Book a convenient time for a detailed discussion about your child's academic
                        goals and our programs.
                      </p>
                      <button
                        onClick={() => handleAction('schedule-parent-call')}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
                      >
                        Schedule Parent Call
                      </button>
                      <div className="text-center text-sm text-gray-400 mt-2">
                        Choose your preferred time
                      </div>
                    </div>
                  </div>

                  <div className="bg-blue-600/20 rounded-xl p-6 border border-blue-600/30">
                    <h4 className="text-lg font-semibold text-white mb-3">What Parents Ask Us</h4>
                    <div className="grid md:grid-cols-2 gap-4 text-gray-300">
                      <div>• "How do you ensure my child's progress?"</div>
                      <div>• "What if my child doesn't understand a topic?"</div>
                      <div>• "How much time should my child study daily?"</div>
                      <div>• "Can we track progress from home?"</div>
                      <div>• "What's your success rate?"</div>
                      <div>• "Are there any additional costs?"</div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Step 5: Visit Center Invitation */}
              {currentStep === 5 && (
                <motion.div
                  key="visit-center"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <div className="text-center mb-8">
                    <h3 className="text-xl font-bold text-white mb-2">Visit Our Center</h3>
                    <p className="text-gray-400">See our facilities and meet the team in person</p>
                  </div>

                  <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
                    <div className="flex items-start gap-4">
                      <MapPin className="w-6 h-6 text-red-400 mt-1" />
                      <div className="flex-1">
                        <h4 className="text-lg font-semibold text-white mb-2">
                          Cerebrum Biology Academy
                        </h4>
                        <p className="text-gray-300 mb-4">
                          Visit our state-of-the-art facility, interact with faculty, and see our
                          learning environment firsthand.
                        </p>
                        <div className="grid md:grid-cols-3 gap-4 mb-6">
                          <div className="text-center">
                            <div className="text-2xl font-bold text-green-500">3</div>
                            <div className="text-sm text-gray-400">Centers in Delhi NCR</div>
                          </div>
                          <div className="text-center">
                            <div className="text-2xl font-bold text-blue-400">15+</div>
                            <div className="text-sm text-gray-400">Faculty Members</div>
                          </div>
                          <div className="text-center">
                            <div className="text-2xl font-bold text-yellow-400">500+</div>
                            <div className="text-sm text-gray-400">Students Currently</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-green-600/20 rounded-xl p-6 border border-green-600/30">
                      <h4 className="text-lg font-semibold text-white mb-3">What You'll See</h4>
                      <ul className="space-y-2 text-gray-300">
                        <li>• Modern classrooms with smart boards</li>
                        <li>• Well-equipped laboratory</li>
                        <li>• Library with extensive biology resources</li>
                        <li>• Faculty interaction area</li>
                        <li>• Student comfort zones</li>
                        <li>• Safety and security measures</li>
                      </ul>
                    </div>

                    <div className="bg-blue-600/20 rounded-xl p-6 border border-blue-600/30">
                      <h4 className="text-lg font-semibold text-white mb-3">Meet the Team</h4>
                      <ul className="space-y-2 text-gray-300">
                        <li>• AIIMS faculty introduction</li>
                        <li>• Academic counselor meeting</li>
                        <li>• Center administrator discussion</li>
                        <li>• Current student interaction</li>
                        <li>• Parent testimonials</li>
                        <li>• Course material preview</li>
                      </ul>
                    </div>
                  </div>

                  <div className="text-center">
                    <button
                      onClick={() => handleAction('schedule-center-visit')}
                      className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white px-8 py-4 rounded-lg font-bold text-lg transition-colors inline-flex items-center gap-3"
                    >
                      <MapPin className="w-6 h-6" />
                      Schedule Center Visit
                    </button>
                    <p className="text-sm text-gray-400 mt-3">
                      Free consultation and facility tour • No obligations
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Footer with Navigation */}
          <div className="border-t border-slate-700 p-6">
            <div className="flex justify-between items-center">
              <button
                onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
                disabled={currentStep === 0}
                className="px-6 py-2 text-gray-400 hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>

              {currentStep < steps.length - 1 ? (
                <button
                  onClick={handleNext}
                  className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
                >
                  Next Step
                </button>
              ) : (
                <button
                  onClick={() => handleAction('schedule-parent-meeting')}
                  className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white px-8 py-3 rounded-lg font-bold transition-colors"
                >
                  Schedule Parent Meeting
                </button>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
