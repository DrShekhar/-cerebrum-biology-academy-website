'use client'

import { useState, useEffect } from 'react'
import {
  User,
  Mail,
  Phone,
  Calendar,
  MapPin,
  GraduationCap,
  Award,
  Upload,
  CheckCircle,
  ArrowRight,
  ArrowLeft,
  FileText,
  AlertCircle,
  BookOpen,
  Home,
  Clock,
  Users,
  Flame,
  Star,
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import toast from 'react-hot-toast'
import { trackFormStep, trackFormSubmission, trackBatchSelection } from '@/lib/analytics'
import { Input } from '@/components/ui/Input'
import { getPhoneLink, getDisplayPhone } from '@/lib/constants/contactInfo'
import { Label } from '@/components/ui/Label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/Select'

interface FormData {
  personalInfo: {
    firstName: string
    lastName: string
    email: string
    phone: string
    dateOfBirth: string
    address: string
    city: string
    state: string
    pincode: string
  }
  academicDetails: {
    class10Marks: string
    class10Board: string
    class12Marks: string
    class12Board: string
    previousNEETScore: string
    previousNEETYear: string
  }
  courseSelection: {
    selectedBatch: string
    preferredTiming: string
    paymentPlan: string
  }
  documents: {
    class10Marksheet: File | null
    class12Marksheet: File | null
    photo: File | null
    idProof: File | null
  }
}

interface ValidationErrors {
  [key: string]: string
}

const batchOptions = [
  {
    name: 'Foundation Batch (Class 11th)',
    duration: '2 Years',
    price: '₹1,20,000',
    discount: '20% Early Bird Discount',
    value: 'foundation',
    seatsLeft: 8,
    popular: false,
  },
  {
    name: 'Target Batch (Class 12th)',
    duration: '1 Year',
    price: '₹85,000',
    discount: '15% Scholarship Available',
    value: 'target',
    seatsLeft: 5,
    popular: true,
  },
  {
    name: 'Dropper Batch',
    duration: '1 Year',
    price: '₹75,000',
    discount: '10% Previous Student Discount',
    value: 'dropper',
    seatsLeft: 12,
    popular: false,
  },
  {
    name: 'Crash Course',
    duration: '6 Months',
    price: '₹45,000',
    discount: 'Limited Time Offer',
    value: 'crash',
    seatsLeft: 3,
    popular: false,
  },
]

export default function ApplicationForm() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState<FormData>({
    personalInfo: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      dateOfBirth: '',
      address: '',
      city: '',
      state: '',
      pincode: '',
    },
    academicDetails: {
      class10Marks: '',
      class10Board: '',
      class12Marks: '',
      class12Board: '',
      previousNEETScore: '',
      previousNEETYear: '',
    },
    courseSelection: {
      selectedBatch: '',
      preferredTiming: '',
      paymentPlan: '',
    },
    documents: {
      class10Marksheet: null,
      class12Marksheet: null,
      photo: null,
      idProof: null,
    },
  })
  const [errors, setErrors] = useState<ValidationErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const totalSteps = 5

  useEffect(() => {
    const savedData = localStorage.getItem('applicationFormData')
    if (savedData) {
      const parsed = JSON.parse(savedData)
      setFormData({
        ...parsed,
        documents: {
          class10Marksheet: null,
          class12Marksheet: null,
          photo: null,
          idProof: null,
        },
      })
    }
  }, [])

  const [lastSaved, setLastSaved] = useState<Date | null>(null)
  const [isSaving, setIsSaving] = useState(false)
  const [pincodeLoading, setPincodeLoading] = useState(false)

  // Pincode autofill function
  const handlePincodeChange = async (pincode: string) => {
    setFormData({
      ...formData,
      personalInfo: { ...formData.personalInfo, pincode },
    })

    // Only fetch if pincode is 6 digits
    if (pincode.length === 6 && /^\d{6}$/.test(pincode)) {
      setPincodeLoading(true)
      try {
        const response = await fetch(`https://api.postalpincode.in/pincode/${pincode}`)
        const data = await response.json()

        if (data[0]?.Status === 'Success' && data[0]?.PostOffice?.length > 0) {
          const postOffice = data[0].PostOffice[0]
          setFormData((prev) => ({
            ...prev,
            personalInfo: {
              ...prev.personalInfo,
              pincode,
              city: postOffice.District || prev.personalInfo.city,
              state: postOffice.State || prev.personalInfo.state,
            },
          }))
          toast.success(`Found: ${postOffice.District}, ${postOffice.State}`)
        }
      } catch (error) {
        console.error('Pincode lookup failed:', error)
      } finally {
        setPincodeLoading(false)
      }
    }
  }

  useEffect(() => {
    const dataToSave = {
      ...formData,
      documents: {
        class10Marksheet: null,
        class12Marksheet: null,
        photo: null,
        idProof: null,
      },
    }

    const hasData = formData.personalInfo.firstName || formData.personalInfo.phone

    if (hasData) {
      setIsSaving(true)
      const debounceTimer = setTimeout(() => {
        localStorage.setItem('applicationFormData', JSON.stringify(dataToSave))
        setLastSaved(new Date())
        setIsSaving(false)
      }, 500)

      return () => clearTimeout(debounceTimer)
    }
  }, [formData])

  const validateStep = (step: number): boolean => {
    const newErrors: ValidationErrors = {}

    if (step === 1) {
      if (!formData.personalInfo.firstName.trim()) {
        newErrors.firstName = 'First name is required'
      }
      if (!formData.personalInfo.lastName.trim()) {
        newErrors.lastName = 'Last name is required'
      }
      if (!formData.personalInfo.email.trim()) {
        newErrors.email = 'Email is required'
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.personalInfo.email)) {
        newErrors.email = 'Invalid email format'
      }
      if (!formData.personalInfo.phone.trim()) {
        newErrors.phone = 'Phone number is required'
      } else if (!/^[0-9]{10}$/.test(formData.personalInfo.phone)) {
        newErrors.phone = 'Phone number must be 10 digits'
      }
      if (!formData.personalInfo.dateOfBirth) {
        newErrors.dateOfBirth = 'Date of birth is required'
      }
      if (!formData.personalInfo.address.trim()) {
        newErrors.address = 'Address is required'
      }
      if (!formData.personalInfo.city.trim()) {
        newErrors.city = 'City is required'
      }
      if (!formData.personalInfo.state.trim()) {
        newErrors.state = 'State is required'
      }
      if (!formData.personalInfo.pincode.trim()) {
        newErrors.pincode = 'Pincode is required'
      } else if (!/^[0-9]{6}$/.test(formData.personalInfo.pincode)) {
        newErrors.pincode = 'Pincode must be 6 digits'
      }
    }

    if (step === 2) {
      if (!formData.academicDetails.class10Marks.trim()) {
        newErrors.class10Marks = '10th marks are required'
      } else if (
        parseFloat(formData.academicDetails.class10Marks) < 0 ||
        parseFloat(formData.academicDetails.class10Marks) > 100
      ) {
        newErrors.class10Marks = 'Marks must be between 0 and 100'
      }
      if (!formData.academicDetails.class10Board.trim()) {
        newErrors.class10Board = '10th board is required'
      }
      if (!formData.academicDetails.class12Marks.trim()) {
        newErrors.class12Marks = '12th marks are required'
      } else if (
        parseFloat(formData.academicDetails.class12Marks) < 0 ||
        parseFloat(formData.academicDetails.class12Marks) > 100
      ) {
        newErrors.class12Marks = 'Marks must be between 0 and 100'
      }
      if (!formData.academicDetails.class12Board.trim()) {
        newErrors.class12Board = '12th board is required'
      }
    }

    if (step === 3) {
      if (!formData.courseSelection.selectedBatch) {
        newErrors.selectedBatch = 'Please select a batch'
      }
      if (!formData.courseSelection.preferredTiming) {
        newErrors.preferredTiming = 'Please select preferred timing'
      }
      if (!formData.courseSelection.paymentPlan) {
        newErrors.paymentPlan = 'Please select a payment plan'
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNext = () => {
    if (validateStep(currentStep)) {
      trackFormStep(currentStep)
      setCurrentStep((prev) => Math.min(prev + 1, totalSteps))
    }
  }

  const handlePrevious = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1))
  }

  const handleFileUpload = (field: keyof FormData['documents'], file: File | null) => {
    setFormData((prev) => ({
      ...prev,
      documents: {
        ...prev.documents,
        [field]: file,
      },
    }))
  }

  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [submitError, setSubmitError] = useState('')

  const handleSubmit = async () => {
    setIsSubmitting(true)
    setSubmitError('')

    try {
      const response = await fetch('/api/admission-application', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          personalInfo: formData.personalInfo,
          academicDetails: formData.academicDetails,
          courseSelection: formData.courseSelection,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit application')
      }

      localStorage.removeItem('applicationFormData')
      setSubmitSuccess(true)
      trackFormSubmission.success()
    } catch (err: any) {
      const errorMessage = err.message || 'Failed to submit application. Please try again.'
      setSubmitError(errorMessage)
      trackFormSubmission.error(errorMessage)
    } finally {
      setIsSubmitting(false)
    }
  }

  const stepVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -50 },
  }

  const selectedBatchDetails = batchOptions.find(
    (batch) => batch.value === formData.courseSelection.selectedBatch
  )

  if (submitSuccess) {
    return (
      <div className="min-h-screen bg-gray-50 py-8 sm:py-12 px-4 sm:px-6">
        <div className="max-w-2xl mx-auto">
          <div
            className="bg-white rounded-2xl sm:rounded-3xl shadow-xl overflow-hidden text-center p-8 sm:p-12 animate-fadeInUp"
          >
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-green-600" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
              Application Submitted Successfully!
            </h1>
            <p className="text-gray-600 mb-6">
              Thank you, {formData.personalInfo.firstName}! Your application has been received.
            </p>
            <div className="bg-blue-50 rounded-xl p-6 mb-6 text-left">
              <h3 className="font-semibold text-gray-900 mb-3">What happens next?</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>You will receive a WhatsApp confirmation shortly</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>Our counselor will call you within 2 hours</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>Free diagnostic test will be scheduled</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>Payment link will be sent after counseling</span>
                </li>
              </ul>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href={getPhoneLink()}
                className="inline-flex items-center justify-center gap-2 bg-green-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-700 transition-colors"
              >
                <Phone className="w-5 h-5" />
                Call Us Now
              </a>
              <a
                href="/"
                className="inline-flex items-center justify-center gap-2 bg-gray-100 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-200 transition-colors"
              >
                Back to Home
              </a>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 sm:py-12 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl sm:rounded-3xl shadow-xl overflow-hidden">
          <div className="bg-indigo-500 px-6 sm:px-8 py-6 sm:py-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
              NEET Admission Application
            </h1>
            <div className="flex items-center justify-between">
              <p className="text-blue-100 text-sm sm:text-base">
                Step {currentStep} of {totalSteps}
              </p>
              {(lastSaved || isSaving) && (
                <div className="flex items-center gap-2 text-sm text-blue-100">
                  {isSaving ? (
                    <>
                      <div className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Saving...</span>
                    </>
                  ) : (
                    <>
                      <CheckCircle className="w-4 h-4 text-green-300" />
                      <span>Draft saved</span>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>

          <div className="px-4 sm:px-8 py-6">
            <div className="flex justify-between mb-8 sm:mb-12">
              {[1, 2, 3, 4, 5].map((step) => (
                <div key={step} className="flex flex-col items-center flex-1">
                  <div
                    className={`w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 rounded-full flex items-center justify-center text-xs sm:text-sm font-semibold transition-all ${
                      step < currentStep
                        ? 'bg-green-600 text-white'
                        : step === currentStep
                          ? 'bg-blue-600 text-white ring-4 ring-blue-200'
                          : 'bg-gray-200 text-gray-500'
                    }`}
                  >
                    {step < currentStep ? <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5" /> : step}
                  </div>
                  {step < totalSteps && (
                    <div
                      className={`hidden sm:block h-1 w-full mt-5 -ml-full ${
                        step < currentStep ? 'bg-green-600' : 'bg-gray-200'
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
{currentStep === 1 && (
                <div
                  key="step1"
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                 className="animate-fadeInUp">
                  <div className="mb-6 sm:mb-8">
                    <div className="flex items-center mb-4 sm:mb-6">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-xl flex items-center justify-center mr-3 sm:mr-4">
                        <User className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
                      </div>
                      <div>
                        <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
                          Personal Information
                        </h2>
                        <p className="text-sm text-gray-600">Please provide your basic details</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                      <div>
                        <Label htmlFor="firstName" className="text-gray-700 mb-2 block">
                          First Name *
                        </Label>
                        <Input
                          id="firstName"
                          value={formData.personalInfo.firstName}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              personalInfo: { ...formData.personalInfo, firstName: e.target.value },
                            })
                          }
                          placeholder="Enter first name"
                          className={errors.firstName ? 'border-red-500' : ''}
                        />
                        {errors.firstName && (
                          <p className="text-red-500 text-xs mt-1 flex items-center">
                            <AlertCircle className="w-3 h-3 mr-1" />
                            {errors.firstName}
                          </p>
                        )}
                      </div>

                      <div>
                        <Label htmlFor="lastName" className="text-gray-700 mb-2 block">
                          Last Name *
                        </Label>
                        <Input
                          id="lastName"
                          value={formData.personalInfo.lastName}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              personalInfo: { ...formData.personalInfo, lastName: e.target.value },
                            })
                          }
                          placeholder="Enter last name"
                          className={errors.lastName ? 'border-red-500' : ''}
                        />
                        {errors.lastName && (
                          <p className="text-red-500 text-xs mt-1 flex items-center">
                            <AlertCircle className="w-3 h-3 mr-1" />
                            {errors.lastName}
                          </p>
                        )}
                      </div>

                      <div>
                        <Label htmlFor="email" className="text-gray-700 mb-2 block">
                          Email Address *
                        </Label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <Input
                            id="email"
                            type="email"
                            value={formData.personalInfo.email}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                personalInfo: { ...formData.personalInfo, email: e.target.value },
                              })
                            }
                            placeholder="your.email@example.com"
                            className={`pl-10 ${errors.email ? 'border-red-500' : ''}`}
                          />
                        </div>
                        {errors.email && (
                          <p className="text-red-500 text-xs mt-1 flex items-center">
                            <AlertCircle className="w-3 h-3 mr-1" />
                            {errors.email}
                          </p>
                        )}
                      </div>

                      <div>
                        <Label htmlFor="phone" className="text-gray-700 mb-2 block">
                          Phone Number *
                        </Label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <Input
                            id="phone"
                            type="tel"
                            value={formData.personalInfo.phone}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                personalInfo: { ...formData.personalInfo, phone: e.target.value },
                              })
                            }
                            placeholder="10-digit mobile number"
                            className={`pl-10 ${errors.phone ? 'border-red-500' : ''}`}
                          />
                        </div>
                        {errors.phone && (
                          <p className="text-red-500 text-xs mt-1 flex items-center">
                            <AlertCircle className="w-3 h-3 mr-1" />
                            {errors.phone}
                          </p>
                        )}
                      </div>

                      <div className="sm:col-span-2">
                        <Label htmlFor="dateOfBirth" className="text-gray-700 mb-2 block">
                          Date of Birth *
                        </Label>
                        <div className="relative">
                          <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <Input
                            id="dateOfBirth"
                            type="date"
                            value={formData.personalInfo.dateOfBirth}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                personalInfo: {
                                  ...formData.personalInfo,
                                  dateOfBirth: e.target.value,
                                },
                              })
                            }
                            className={`pl-10 ${errors.dateOfBirth ? 'border-red-500' : ''}`}
                          />
                        </div>
                        {errors.dateOfBirth && (
                          <p className="text-red-500 text-xs mt-1 flex items-center">
                            <AlertCircle className="w-3 h-3 mr-1" />
                            {errors.dateOfBirth}
                          </p>
                        )}
                      </div>

                      <div className="sm:col-span-2">
                        <Label htmlFor="address" className="text-gray-700 mb-2 block">
                          Address *
                        </Label>
                        <div className="relative">
                          <Home className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <Input
                            id="address"
                            value={formData.personalInfo.address}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                personalInfo: { ...formData.personalInfo, address: e.target.value },
                              })
                            }
                            placeholder="House/Flat No., Street Name"
                            className={`pl-10 ${errors.address ? 'border-red-500' : ''}`}
                          />
                        </div>
                        {errors.address && (
                          <p className="text-red-500 text-xs mt-1 flex items-center">
                            <AlertCircle className="w-3 h-3 mr-1" />
                            {errors.address}
                          </p>
                        )}
                      </div>

                      <div>
                        <Label htmlFor="city" className="text-gray-700 mb-2 block">
                          City *
                        </Label>
                        <div className="relative">
                          <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <Input
                            id="city"
                            value={formData.personalInfo.city}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                personalInfo: { ...formData.personalInfo, city: e.target.value },
                              })
                            }
                            placeholder="Enter city"
                            className={`pl-10 ${errors.city ? 'border-red-500' : ''}`}
                          />
                        </div>
                        {errors.city && (
                          <p className="text-red-500 text-xs mt-1 flex items-center">
                            <AlertCircle className="w-3 h-3 mr-1" />
                            {errors.city}
                          </p>
                        )}
                      </div>

                      <div>
                        <Label htmlFor="state" className="text-gray-700 mb-2 block">
                          State *
                        </Label>
                        <Input
                          id="state"
                          value={formData.personalInfo.state}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              personalInfo: { ...formData.personalInfo, state: e.target.value },
                            })
                          }
                          placeholder="Enter state"
                          className={errors.state ? 'border-red-500' : ''}
                        />
                        {errors.state && (
                          <p className="text-red-500 text-xs mt-1 flex items-center">
                            <AlertCircle className="w-3 h-3 mr-1" />
                            {errors.state}
                          </p>
                        )}
                      </div>

                      <div>
                        <Label htmlFor="pincode" className="text-gray-700 mb-2 block">
                          Pincode *{' '}
                          <span className="text-xs text-blue-600 font-normal">
                            (Auto-fills city & state)
                          </span>
                        </Label>
                        <div className="relative">
                          <Input
                            id="pincode"
                            value={formData.personalInfo.pincode}
                            onChange={(e) => handlePincodeChange(e.target.value)}
                            placeholder="6-digit pincode"
                            className={errors.pincode ? 'border-red-500' : ''}
                            maxLength={6}
                          />
                          {pincodeLoading && (
                            <div className="absolute right-3 top-1/2 -translate-y-1/2">
                              <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
                            </div>
                          )}
                        </div>
                        {errors.pincode && (
                          <p className="text-red-500 text-xs mt-1 flex items-center">
                            <AlertCircle className="w-3 h-3 mr-1" />
                            {errors.pincode}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {currentStep === 2 && (
                <div
                  key="step2"
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                 className="animate-fadeInUp">
                  <div className="mb-6 sm:mb-8">
                    <div className="flex items-center mb-4 sm:mb-6">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 bg-purple-100 rounded-xl flex items-center justify-center mr-3 sm:mr-4">
                        <GraduationCap className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600" />
                      </div>
                      <div>
                        <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
                          Academic Details
                        </h2>
                        <p className="text-sm text-gray-600">Your educational background</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                      <div>
                        <Label htmlFor="class10Marks" className="text-gray-700 mb-2 block">
                          Class 10th Marks (%) *
                        </Label>
                        <div className="relative">
                          <Award className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <Input
                            id="class10Marks"
                            type="number"
                            step="0.01"
                            value={formData.academicDetails.class10Marks}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                academicDetails: {
                                  ...formData.academicDetails,
                                  class10Marks: e.target.value,
                                },
                              })
                            }
                            placeholder="Enter percentage"
                            className={`pl-10 ${errors.class10Marks ? 'border-red-500' : ''}`}
                          />
                        </div>
                        {errors.class10Marks && (
                          <p className="text-red-500 text-xs mt-1 flex items-center">
                            <AlertCircle className="w-3 h-3 mr-1" />
                            {errors.class10Marks}
                          </p>
                        )}
                      </div>

                      <div>
                        <Label htmlFor="class10Board" className="text-gray-700 mb-2 block">
                          Class 10th Board *
                        </Label>
                        <Select
                          value={formData.academicDetails.class10Board}
                          onValueChange={(value) =>
                            setFormData({
                              ...formData,
                              academicDetails: { ...formData.academicDetails, class10Board: value },
                            })
                          }
                        >
                          <SelectTrigger className={errors.class10Board ? 'border-red-500' : ''}>
                            <SelectValue placeholder="Select board" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="cbse">CBSE</SelectItem>
                            <SelectItem value="icse">ICSE</SelectItem>
                            <SelectItem value="state">State Board</SelectItem>
                            <SelectItem value="igcse">IGCSE</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                        {errors.class10Board && (
                          <p className="text-red-500 text-xs mt-1 flex items-center">
                            <AlertCircle className="w-3 h-3 mr-1" />
                            {errors.class10Board}
                          </p>
                        )}
                      </div>

                      <div>
                        <Label htmlFor="class12Marks" className="text-gray-700 mb-2 block">
                          Class 12th Marks (%) *
                        </Label>
                        <div className="relative">
                          <Award className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <Input
                            id="class12Marks"
                            type="number"
                            step="0.01"
                            value={formData.academicDetails.class12Marks}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                academicDetails: {
                                  ...formData.academicDetails,
                                  class12Marks: e.target.value,
                                },
                              })
                            }
                            placeholder="Enter percentage"
                            className={`pl-10 ${errors.class12Marks ? 'border-red-500' : ''}`}
                          />
                        </div>
                        {errors.class12Marks && (
                          <p className="text-red-500 text-xs mt-1 flex items-center">
                            <AlertCircle className="w-3 h-3 mr-1" />
                            {errors.class12Marks}
                          </p>
                        )}
                      </div>

                      <div>
                        <Label htmlFor="class12Board" className="text-gray-700 mb-2 block">
                          Class 12th Board *
                        </Label>
                        <Select
                          value={formData.academicDetails.class12Board}
                          onValueChange={(value) =>
                            setFormData({
                              ...formData,
                              academicDetails: { ...formData.academicDetails, class12Board: value },
                            })
                          }
                        >
                          <SelectTrigger className={errors.class12Board ? 'border-red-500' : ''}>
                            <SelectValue placeholder="Select board" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="cbse">CBSE</SelectItem>
                            <SelectItem value="icse">ICSE</SelectItem>
                            <SelectItem value="state">State Board</SelectItem>
                            <SelectItem value="igcse">IGCSE</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                        {errors.class12Board && (
                          <p className="text-red-500 text-xs mt-1 flex items-center">
                            <AlertCircle className="w-3 h-3 mr-1" />
                            {errors.class12Board}
                          </p>
                        )}
                      </div>

                      <div>
                        <Label htmlFor="previousNEETScore" className="text-gray-700 mb-2 block">
                          Previous NEET Score (Optional)
                        </Label>
                        <Input
                          id="previousNEETScore"
                          type="number"
                          value={formData.academicDetails.previousNEETScore}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              academicDetails: {
                                ...formData.academicDetails,
                                previousNEETScore: e.target.value,
                              },
                            })
                          }
                          placeholder="Enter NEET score"
                        />
                      </div>

                      <div>
                        <Label htmlFor="previousNEETYear" className="text-gray-700 mb-2 block">
                          NEET Year (Optional)
                        </Label>
                        <Select
                          value={formData.academicDetails.previousNEETYear}
                          onValueChange={(value) =>
                            setFormData({
                              ...formData,
                              academicDetails: {
                                ...formData.academicDetails,
                                previousNEETYear: value,
                              },
                            })
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select year" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="2024">2024</SelectItem>
                            <SelectItem value="2023">2023</SelectItem>
                            <SelectItem value="2022">2022</SelectItem>
                            <SelectItem value="2021">2021</SelectItem>
                            <SelectItem value="2020">2020</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {currentStep === 3 && (
                <div
                  key="step3"
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                 className="animate-fadeInUp">
                  <div className="mb-6 sm:mb-8">
                    <div className="flex items-center mb-4 sm:mb-6">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-100 rounded-xl flex items-center justify-center mr-3 sm:mr-4">
                        <BookOpen className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" />
                      </div>
                      <div>
                        <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
                          Course Selection
                        </h2>
                        <p className="text-sm text-gray-600">
                          Choose your preferred batch and payment plan
                        </p>
                      </div>
                    </div>

                    <div className="space-y-6">
                      <div>
                        <Label className="text-gray-700 mb-3 block font-semibold">
                          Select Batch *
                        </Label>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          {batchOptions.map((batch) => (
                            <div
                              key={batch.value}
                              onClick={() => {
                                setFormData({
                                  ...formData,
                                  courseSelection: {
                                    ...formData.courseSelection,
                                    selectedBatch: batch.value,
                                  },
                                })
                                trackBatchSelection(batch.name, batch.price)
                              }}
                              className={`relative p-4 sm:p-6 rounded-xl border-2 cursor-pointer transition-all ${
                                formData.courseSelection.selectedBatch === batch.value
                                  ? 'border-blue-500 bg-blue-50 ring-2 ring-blue-200'
                                  : 'border-gray-200 hover:border-blue-300'
                              } ${batch.popular ? 'ring-2 ring-orange-300' : ''}`}
                            >
                              {/* Popular Badge */}
                              {batch.popular && (
                                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-orange-600 text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1 shadow-lg">
                                  <Star className="w-3 h-3" />
                                  Most Popular
                                </div>
                              )}

                              <div className="flex items-start justify-between mb-2">
                                <h3 className="font-bold text-gray-900 text-sm sm:text-base">
                                  {batch.name}
                                </h3>
                                {formData.courseSelection.selectedBatch === batch.value && (
                                  <CheckCircle className="w-5 h-5 text-blue-600" />
                                )}
                              </div>
                              <p className="text-xs sm:text-sm text-blue-600 font-medium mb-2">
                                {batch.duration}
                              </p>
                              <div className="text-lg sm:text-xl font-bold text-gray-900 mb-1">
                                {batch.price}
                              </div>
                              <div className="text-xs text-green-600 font-medium mb-3">
                                {batch.discount}
                              </div>

                              {/* Seats Left Urgency Indicator */}
                              <div
                                className={`flex items-center gap-1.5 text-xs font-semibold ${
                                  batch.seatsLeft <= 5
                                    ? 'text-red-600'
                                    : batch.seatsLeft <= 10
                                      ? 'text-orange-600'
                                      : 'text-gray-600'
                                }`}
                              >
                                {batch.seatsLeft <= 5 ? (
                                  <Flame className="w-3.5 h-3.5 animate-pulse" />
                                ) : (
                                  <Users className="w-3.5 h-3.5" />
                                )}
                                <span>
                                  {batch.seatsLeft <= 5
                                    ? `Only ${batch.seatsLeft} seats left!`
                                    : `${batch.seatsLeft} seats available`}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                        {errors.selectedBatch && (
                          <p className="text-red-500 text-xs mt-2 flex items-center">
                            <AlertCircle className="w-3 h-3 mr-1" />
                            {errors.selectedBatch}
                          </p>
                        )}
                      </div>

                      <div>
                        <Label htmlFor="preferredTiming" className="text-gray-700 mb-2 block">
                          Preferred Timing *
                        </Label>
                        <Select
                          value={formData.courseSelection.preferredTiming}
                          onValueChange={(value) =>
                            setFormData({
                              ...formData,
                              courseSelection: {
                                ...formData.courseSelection,
                                preferredTiming: value,
                              },
                            })
                          }
                        >
                          <SelectTrigger className={errors.preferredTiming ? 'border-red-500' : ''}>
                            <SelectValue placeholder="Select preferred timing" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="morning">Morning (6:00 AM - 12:00 PM)</SelectItem>
                            <SelectItem value="afternoon">
                              Afternoon (12:00 PM - 6:00 PM)
                            </SelectItem>
                            <SelectItem value="evening">Evening (6:00 PM - 10:00 PM)</SelectItem>
                          </SelectContent>
                        </Select>
                        {errors.preferredTiming && (
                          <p className="text-red-500 text-xs mt-1 flex items-center">
                            <AlertCircle className="w-3 h-3 mr-1" />
                            {errors.preferredTiming}
                          </p>
                        )}
                      </div>

                      <div>
                        <Label htmlFor="paymentPlan" className="text-gray-700 mb-2 block">
                          Payment Plan *
                        </Label>
                        <Select
                          value={formData.courseSelection.paymentPlan}
                          onValueChange={(value) =>
                            setFormData({
                              ...formData,
                              courseSelection: {
                                ...formData.courseSelection,
                                paymentPlan: value,
                              },
                            })
                          }
                        >
                          <SelectTrigger className={errors.paymentPlan ? 'border-red-500' : ''}>
                            <SelectValue placeholder="Select payment plan" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="full">Full Payment (5% discount)</SelectItem>
                            <SelectItem value="two-installments">
                              Two Installments (2% discount)
                            </SelectItem>
                            <SelectItem value="quarterly">Quarterly Payments</SelectItem>
                            <SelectItem value="emi">EMI (6-12 months)</SelectItem>
                          </SelectContent>
                        </Select>
                        {errors.paymentPlan && (
                          <p className="text-red-500 text-xs mt-1 flex items-center">
                            <AlertCircle className="w-3 h-3 mr-1" />
                            {errors.paymentPlan}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {currentStep === 4 && (
                <div
                  key="step4"
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                 className="animate-fadeInUp">
                  <div className="mb-6 sm:mb-8">
                    <div className="flex items-center mb-4 sm:mb-6">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 bg-orange-100 rounded-xl flex items-center justify-center mr-3 sm:mr-4">
                        <Upload className="w-5 h-5 sm:w-6 sm:h-6 text-orange-600" />
                      </div>
                      <div>
                        <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
                          Document Upload
                        </h2>
                        <p className="text-sm text-gray-600">
                          Upload documents now or submit later during counseling
                        </p>
                      </div>
                    </div>

                    {/* Skip Option */}
                    <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <Clock className="w-4 h-4 text-blue-600" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">
                            Don't have documents ready?
                          </p>
                          <p className="text-xs text-gray-600 mt-1">
                            You can skip this step and submit documents during your counseling
                            session. Our team will guide you through the process.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4 sm:space-y-6">
                      {[
                        {
                          field: 'class10Marksheet' as keyof FormData['documents'],
                          label: 'Class 10th Marksheet',
                          required: false,
                        },
                        {
                          field: 'class12Marksheet' as keyof FormData['documents'],
                          label: 'Class 12th Marksheet',
                          required: false,
                        },
                        {
                          field: 'photo' as keyof FormData['documents'],
                          label: 'Passport Size Photo',
                          required: false,
                        },
                        {
                          field: 'idProof' as keyof FormData['documents'],
                          label: 'ID Proof (Aadhar/Passport)',
                          required: false,
                        },
                      ].map((doc) => (
                        <div key={doc.field}>
                          <Label className="text-gray-700 mb-2 block">
                            {doc.label}{' '}
                            <span className="text-xs text-gray-500 font-normal">(Optional)</span>
                          </Label>
                          <div
                            className={`border-2 border-dashed rounded-xl p-6 sm:p-8 text-center transition-all ${
                              formData.documents[doc.field]
                                ? 'border-green-600 bg-green-50'
                                : 'border-gray-300 hover:border-blue-400'
                            }`}
                          >
                            <input
                              type="file"
                              id={doc.field}
                              accept=".pdf,.jpg,.jpeg,.png"
                              onChange={(e) =>
                                handleFileUpload(doc.field, e.target.files?.[0] || null)
                              }
                              className="hidden"
                            />
                            <label
                              htmlFor={doc.field}
                              className="cursor-pointer flex flex-col items-center"
                            >
                              {formData.documents[doc.field] ? (
                                <>
                                  <CheckCircle className="w-10 h-10 sm:w-12 sm:h-12 text-green-600 mb-2" />
                                  <p className="text-sm font-medium text-green-700">
                                    {formData.documents[doc.field]?.name}
                                  </p>
                                  <p className="text-xs text-gray-600 mt-1">Click to change</p>
                                </>
                              ) : (
                                <>
                                  <Upload className="w-10 h-10 sm:w-12 sm:h-12 text-gray-400 mb-2" />
                                  <p className="text-sm font-medium text-gray-700">
                                    Click to upload or drag and drop
                                  </p>
                                  <p className="text-xs text-gray-500 mt-1">
                                    PDF, JPG, PNG (Max 5MB)
                                  </p>
                                </>
                              )}
                            </label>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                      <div className="flex items-start">
                        <AlertCircle className="w-5 h-5 text-blue-600 mr-3 mt-0.5 flex-shrink-0" />
                        <div className="text-sm text-blue-800">
                          <p className="font-semibold mb-1">Document Guidelines:</p>
                          <ul className="list-disc list-inside space-y-1 text-xs">
                            <li>Ensure all documents are clear and readable</li>
                            <li>File size should not exceed 5MB per document</li>
                            <li>Accepted formats: PDF, JPG, JPEG, PNG</li>
                            <li>Original documents will be verified during counseling</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {currentStep === 5 && (
                <div
                  key="step5"
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                 className="animate-fadeInUp">
                  <div className="mb-6 sm:mb-8">
                    <div className="flex items-center mb-4 sm:mb-6">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-100 rounded-xl flex items-center justify-center mr-3 sm:mr-4">
                        <FileText className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" />
                      </div>
                      <div>
                        <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
                          Review & Submit
                        </h2>
                        <p className="text-sm text-gray-600">
                          Please review your application before submitting
                        </p>
                      </div>
                    </div>

                    <div className="space-y-4 sm:space-y-6">
                      <div className="bg-gray-50 rounded-xl p-4 sm:p-6">
                        <h3 className="font-bold text-gray-900 mb-4 flex items-center">
                          <User className="w-5 h-5 mr-2 text-blue-600" />
                          Personal Information
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                          <div>
                            <span className="text-gray-600">Name:</span>
                            <p className="font-medium text-gray-900">
                              {formData.personalInfo.firstName} {formData.personalInfo.lastName}
                            </p>
                          </div>
                          <div>
                            <span className="text-gray-600">Email:</span>
                            <p className="font-medium text-gray-900">
                              {formData.personalInfo.email}
                            </p>
                          </div>
                          <div>
                            <span className="text-gray-600">Phone:</span>
                            <p className="font-medium text-gray-900">
                              {formData.personalInfo.phone}
                            </p>
                          </div>
                          <div>
                            <span className="text-gray-600">Date of Birth:</span>
                            <p className="font-medium text-gray-900">
                              {formData.personalInfo.dateOfBirth}
                            </p>
                          </div>
                          <div className="sm:col-span-2">
                            <span className="text-gray-600">Address:</span>
                            <p className="font-medium text-gray-900">
                              {formData.personalInfo.address}, {formData.personalInfo.city},{' '}
                              {formData.personalInfo.state} - {formData.personalInfo.pincode}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="bg-gray-50 rounded-xl p-4 sm:p-6">
                        <h3 className="font-bold text-gray-900 mb-4 flex items-center">
                          <GraduationCap className="w-5 h-5 mr-2 text-purple-600" />
                          Academic Details
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                          <div>
                            <span className="text-gray-600">Class 10th:</span>
                            <p className="font-medium text-gray-900">
                              {formData.academicDetails.class10Marks}% (
                              {formData.academicDetails.class10Board.toUpperCase()})
                            </p>
                          </div>
                          <div>
                            <span className="text-gray-600">Class 12th:</span>
                            <p className="font-medium text-gray-900">
                              {formData.academicDetails.class12Marks}% (
                              {formData.academicDetails.class12Board.toUpperCase()})
                            </p>
                          </div>
                          {formData.academicDetails.previousNEETScore && (
                            <div>
                              <span className="text-gray-600">Previous NEET Score:</span>
                              <p className="font-medium text-gray-900">
                                {formData.academicDetails.previousNEETScore} (
                                {formData.academicDetails.previousNEETYear})
                              </p>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="bg-gray-50 rounded-xl p-4 sm:p-6">
                        <h3 className="font-bold text-gray-900 mb-4 flex items-center">
                          <BookOpen className="w-5 h-5 mr-2 text-green-600" />
                          Course Selection
                        </h3>
                        <div className="space-y-3 text-sm">
                          {selectedBatchDetails && (
                            <div>
                              <span className="text-gray-600">Selected Batch:</span>
                              <p className="font-medium text-gray-900">
                                {selectedBatchDetails.name}
                              </p>
                              <p className="text-blue-600 font-semibold">
                                {selectedBatchDetails.price} - {selectedBatchDetails.discount}
                              </p>
                            </div>
                          )}
                          <div>
                            <span className="text-gray-600">Preferred Timing:</span>
                            <p className="font-medium text-gray-900 capitalize">
                              {formData.courseSelection.preferredTiming}
                            </p>
                          </div>
                          <div>
                            <span className="text-gray-600">Payment Plan:</span>
                            <p className="font-medium text-gray-900 capitalize">
                              {formData.courseSelection.paymentPlan.replace('-', ' ')}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="bg-gray-50 rounded-xl p-4 sm:p-6">
                        <h3 className="font-bold text-gray-900 mb-4 flex items-center">
                          <Upload className="w-5 h-5 mr-2 text-orange-600" />
                          Uploaded Documents
                        </h3>
                        <div className="space-y-2 text-sm">
                          {Object.entries(formData.documents).map(([key, file]) => (
                            <div key={key} className="flex items-center justify-between">
                              <span className="text-gray-600 capitalize">
                                {key.replace(/([A-Z])/g, ' $1').trim()}:
                              </span>
                              {file ? (
                                <span className="flex items-center text-green-600">
                                  <CheckCircle className="w-4 h-4 mr-1" />
                                  {file.name}
                                </span>
                              ) : (
                                <span className="text-gray-400">Not uploaded</span>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                        <div className="flex items-start">
                          <AlertCircle className="w-5 h-5 text-blue-600 mr-3 mt-0.5 flex-shrink-0" />
                          <div className="text-sm text-blue-800">
                            <p className="font-semibold mb-1">Next Steps:</p>
                            <ul className="list-disc list-inside space-y-1 text-xs">
                              <li>Your application will be reviewed within 24 hours</li>
                              <li>You will receive a confirmation email shortly</li>
                              <li>
                                Our counselor will contact you to schedule your diagnostic test
                              </li>
                              <li>Payment link will be sent after counseling session</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
<div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-8 border-t pt-6">
              {currentStep > 1 && (
                <Button
                  variant="outline"
                  onClick={handlePrevious}
                  className="w-full sm:w-auto order-2 sm:order-1"
                >
                  <ArrowLeft className="w-5 h-5 mr-2" />
                  Previous
                </Button>
              )}

              {currentStep < totalSteps ? (
                <Button
                  variant="primary"
                  onClick={handleNext}
                  className="w-full sm:flex-1 order-1 sm:order-2"
                >
                  Next Step
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              ) : (
                <Button
                  variant="primary"
                  onClick={handleSubmit}
                  loading={isSubmitting}
                  className="w-full sm:flex-1 order-1 sm:order-2"
                >
                  <CheckCircle className="w-5 h-5 mr-2" />
                  Submit Application
                </Button>
              )}
            </div>

            <div className="mt-6 text-center text-sm text-gray-600">
              <p>
                Need help? Contact us at{' '}
                <a href={getPhoneLink()} className="text-blue-600 font-medium hover:underline">
                  {getDisplayPhone()}
                </a>{' '}
                or{' '}
                <a
                  href="mailto:admissions@cerebrumbiologyacademy.com"
                  className="text-blue-600 font-medium hover:underline"
                >
                  admissions@cerebrumbiologyacademy.com
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
