'use client'

import { useState } from 'react'
import { CourseProgram } from '@/types/courseSystem'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { Input } from '@/components/ui/Input'
import { Label } from '@/components/ui/Label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/Select'
import { Textarea } from '@/components/ui/Textarea'
import { X, Calendar, Clock, User, Phone, Mail, CheckCircle } from 'lucide-react'

interface DemoClassModalProps {
  course: CourseProgram
  onClose: () => void
}

export function DemoClassModal({ course, onClose }: DemoClassModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    parentPhone: '',
    currentClass: '',
    preferredTime: '',
    questions: ''
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    setIsSubmitting(false)
    setIsSuccess(true)
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  if (isSuccess) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
        <Card className="w-full max-w-md mx-4 p-6 text-center">
          <div className="mb-4">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-green-700 mb-2">Demo Class Booked!</h3>
            <p className="text-gray-600">
              Thank you for your interest! Our counselor will contact you within 24 hours to schedule your free demo class.
            </p>
          </div>
          <Button onClick={onClose} className="w-full">
            Close
          </Button>
        </Card>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          {/* Header */}
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Book Free Demo Class
              </h2>
              <p className="text-gray-600">
                Experience our teaching methodology with a complimentary demo session for {course.name}
              </p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Course Info */}
          <Card className="bg-gradient-to-r from-blue-50 to-blue-100 p-4 mb-6 border-blue-200">
            <div className="flex items-center gap-4">
              <div className="bg-blue-500 text-white p-2 rounded-lg">
                <Calendar className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-semibold text-blue-900">{course.name}</h3>
                <p className="text-sm text-blue-700">
                  Class {course.targetClass} • {course.duration} • {course.teachingHours} hours/week
                </p>
              </div>
            </div>
          </Card>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name" className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  Student Name *
                </Label>
                <Input
                  id="name"
                  placeholder="Enter student's full name"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="email" className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  Email Address *
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter email address"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="phone" className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  Student Phone *
                </Label>
                <Input
                  id="phone"
                  placeholder="Enter phone number"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="parentPhone">Parent Phone *</Label>
                <Input
                  id="parentPhone"
                  placeholder="Enter parent's phone number"
                  value={formData.parentPhone}
                  onChange={(e) => handleInputChange('parentPhone', e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="currentClass">Current Class/Status *</Label>
                <Select onValueChange={(value) => handleInputChange('currentClass', value)} required>
                  <SelectTrigger>
                    <SelectValue placeholder="Select current class" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="9th">Class 9th</SelectItem>
                    <SelectItem value="10th">Class 10th</SelectItem>
                    <SelectItem value="11th">Class 11th</SelectItem>
                    <SelectItem value="12th">Class 12th</SelectItem>
                    <SelectItem value="dropper">Dropper</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="preferredTime" className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  Preferred Demo Time
                </Label>
                <Select onValueChange={(value) => handleInputChange('preferredTime', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select preferred time" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="morning">Morning (9 AM - 12 PM)</SelectItem>
                    <SelectItem value="afternoon">Afternoon (2 PM - 5 PM)</SelectItem>
                    <SelectItem value="evening">Evening (6 PM - 8 PM)</SelectItem>
                    <SelectItem value="weekend">Weekend</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="questions">Any Specific Questions or Requirements?</Label>
              <Textarea
                id="questions"
                placeholder="Tell us about any specific topics you'd like to focus on or questions about the course..."
                value={formData.questions}
                onChange={(e) => handleInputChange('questions', e.target.value)}
                rows={3}
              />
            </div>

            {/* Benefits */}
            <Card className="bg-green-50 border-green-200 p-4">
              <h4 className="font-semibold text-green-800 mb-2">What to Expect in Your Demo Class:</h4>
              <ul className="text-sm text-green-700 space-y-1">
                <li>• Live interactive session with expert faculty</li>
                <li>• Sample of our teaching methodology</li>
                <li>• Course overview and career guidance</li>
                <li>• Q&A session with faculty and counselor</li>
                <li>• Detailed study plan discussion</li>
              </ul>
            </Card>

            {/* Submit Button */}
            <div className="flex gap-3 pt-4">
              <Button
                type="submit"
                className="flex-1"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Booking Demo...' : 'Book Free Demo Class'}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
            </div>
          </form>

          {/* Footer Note */}
          <p className="text-xs text-gray-500 mt-4 text-center">
            By booking a demo class, you agree to our terms and conditions. No payment required for demo session.
          </p>
        </div>
      </Card>
    </div>
  )
}