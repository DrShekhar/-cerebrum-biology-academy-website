'use client'

import { useState } from 'react'
import { CourseProgram } from '@/types/courseSystem'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { Input } from '@/components/ui/Input'
import { Label } from '@/components/ui/Label'
import { X, Download, FileText, CheckCircle, User, Mail, Phone } from 'lucide-react'

interface SyllabusDownloadModalProps {
  course: CourseProgram
  onClose: () => void
}

export function SyllabusDownloadModal({ course, onClose }: SyllabusDownloadModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call and file generation
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Simulate file download
    const link = document.createElement('a')
    link.href = '/pdfs/sample-syllabus.pdf' // This would be dynamically generated
    link.download = `${course.name.replace(/\s+/g, '-').toLowerCase()}-syllabus.pdf`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)

    setIsSubmitting(false)
    setIsSuccess(true)
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  if (isSuccess) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
        <Card className="w-full max-w-md mx-4 p-6 text-center">
          <div className="mb-4">
            <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-green-700 mb-2">Syllabus Downloaded!</h3>
            <p className="text-gray-600 mb-4">
              The detailed syllabus has been sent to your email and downloaded to your device.
            </p>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
              <p className="text-sm text-blue-700">
                Our counselor will contact you soon with additional course materials and enrollment
                details.
              </p>
            </div>
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
      <Card className="w-full max-w-lg">
        <div className="p-6">
          {/* Header */}
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2 flex items-center gap-2">
                <FileText className="h-6 w-6 text-blue-600" />
                Download Detailed Syllabus
              </h2>
              <p className="text-gray-600">
                Get the complete curriculum breakdown for {course.name}
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
          <Card className="bg-gradient-to-r from-green-50 to-green-100 p-4 mb-6 border-green-200">
            <div className="flex items-center gap-4">
              <div className="bg-green-600 text-white p-2 rounded-lg">
                <Download className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-semibold text-green-900">{course.name}</h3>
                <p className="text-sm text-green-700">
                  {course.curriculum.totalModules} modules • {course.curriculum.totalHours} hours
                  total
                </p>
              </div>
            </div>
          </Card>

          {/* What's Included */}
          <Card className="bg-blue-50 border-blue-200 p-4 mb-6">
            <h4 className="font-semibold text-blue-800 mb-3">What's included in the syllabus:</h4>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• Complete module-wise breakdown</li>
              <li>• Learning objectives for each topic</li>
              <li>• Practical work and assignments</li>
              <li>• Assessment pattern and marking scheme</li>
              <li>• Recommended reference books</li>
              <li>• Sample question papers and solutions</li>
            </ul>
          </Card>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="name" className="flex items-center gap-2">
                <User className="h-4 w-4" />
                Full Name *
              </Label>
              <Input
                id="name"
                placeholder="Enter your full name"
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
                placeholder="Enter your email address"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                required
              />
              <p className="text-xs text-gray-500 mt-1">
                Syllabus will be sent to this email address
              </p>
            </div>

            <div>
              <Label htmlFor="phone" className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                Phone Number *
              </Label>
              <Input
                id="phone"
                placeholder="Enter your phone number"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                required
              />
            </div>

            {/* Submit Button */}
            <div className="flex gap-3 pt-4">
              <Button
                type="submit"
                className="flex-1 bg-green-600 hover:bg-green-700"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full mr-2"></div>
                    Generating PDF...
                  </>
                ) : (
                  <>
                    <Download className="h-4 w-4 mr-2" />
                    Download Syllabus
                  </>
                )}
              </Button>
              <Button type="button" variant="outline" onClick={onClose} disabled={isSubmitting}>
                Cancel
              </Button>
            </div>
          </form>

          {/* Footer Note */}
          <p className="text-xs text-gray-500 mt-4 text-center">
            By downloading, you agree to receive course updates and counseling calls from our team.
          </p>
        </div>
      </Card>
    </div>
  )
}
