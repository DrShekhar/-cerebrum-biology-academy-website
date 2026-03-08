'use client'

import { CourseProgram } from '@/types/courseSystem'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { X, Calendar, Phone, MessageCircle, CheckCircle } from 'lucide-react'
import { trackAndOpenWhatsApp } from '@/lib/whatsapp/tracking'

interface DemoClassModalProps {
  course: CourseProgram
  onClose: () => void
}

export function DemoClassModal({ course, onClose }: DemoClassModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-2 sm:p-4">
      <Card className="w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="p-4 sm:p-6">
          <div className="flex justify-between items-start mb-4 sm:mb-6">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
                Book Free Demo Class
              </h2>
              <p className="text-gray-600">
                Experience our teaching methodology with a complimentary demo session
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

          <Card className="bg-gradient-to-r from-blue-50 to-blue-100 p-3 sm:p-4 mb-6 border-blue-200">
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

          <div className="space-y-4">
            <button
              type="button"
              onClick={() =>
                trackAndOpenWhatsApp({
                  source: `demo-modal-${course.id}`,
                  message: `Hi! I want to book a FREE Demo Class for ${course.name}. Please confirm my demo slot!`,
                  campaign: 'demo-booking',
                })
              }
              className="w-full flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-6 rounded-lg shadow-lg transition-all text-lg"
            >
              <MessageCircle className="h-6 w-6" />
              WhatsApp Us Now
            </button>

            <a
              href="tel:+918826444334"
              className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-6 rounded-lg shadow-lg transition-all text-lg"
            >
              <Phone className="h-6 w-6" />
              Call: +91 88264 44334
            </a>
          </div>

          <Card className="bg-green-50 border-green-200 p-4 mt-6">
            <h4 className="font-semibold text-green-800 mb-2">What to Expect in Your Demo:</h4>
            <ul className="text-sm text-green-700 space-y-1">
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 flex-shrink-0" /> Live interactive session with
                expert faculty
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 flex-shrink-0" /> Sample of our teaching methodology
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 flex-shrink-0" /> Course overview and career
                guidance
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 flex-shrink-0" /> Q&A session with faculty
              </li>
            </ul>
          </Card>

          <div className="flex justify-center mt-4">
            <Button type="button" variant="ghost" onClick={onClose}>
              Close
            </Button>
          </div>
        </div>
      </Card>
    </div>
  )
}
