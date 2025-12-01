'use client'

import { Phone, MessageCircle, CheckCircle } from 'lucide-react'
import { cn } from '@/lib/utils'

interface CounselorPreferenceProps {
  wantsCounselor: boolean | null
  onSelect: (wantsCounselor: boolean) => void
}

export function CounselorPreference({ wantsCounselor, onSelect }: CounselorPreferenceProps) {
  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-semibold text-gray-900">
          Would you like to speak with a counselor?
        </h3>
        <p className="mt-1 text-sm text-gray-600">
          Our expert counselors can help you choose the right batch and answer any questions.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <button
          type="button"
          onClick={() => onSelect(true)}
          className={cn(
            'rounded-xl border-2 p-5 text-left transition-all duration-200',
            wantsCounselor === true
              ? 'border-blue-600 bg-blue-50 ring-2 ring-blue-600 ring-offset-2'
              : 'border-gray-200 bg-white hover:border-blue-300 hover:bg-blue-50/50'
          )}
        >
          <div className="flex items-start gap-3">
            <div
              className={cn(
                'flex h-10 w-10 items-center justify-center rounded-lg',
                wantsCounselor === true ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600'
              )}
            >
              <Phone className="h-5 w-5" />
            </div>
            <div className="flex-1">
              <h4 className="font-semibold text-gray-900">Yes, I'd like guidance</h4>
              <p className="mt-1 text-sm text-gray-600">
                A counselor will call you within 2 hours to help you choose the right batch.
              </p>
            </div>
            {wantsCounselor === true && <CheckCircle className="h-6 w-6 text-blue-600" />}
          </div>

          <div className="mt-4 rounded-lg bg-blue-100/50 p-3">
            <p className="text-xs text-blue-800">
              <strong>What to expect:</strong> 10-15 minute call covering course details, batch
              timings, and personalized recommendations.
            </p>
          </div>
        </button>

        <button
          type="button"
          onClick={() => onSelect(false)}
          className={cn(
            'rounded-xl border-2 p-5 text-left transition-all duration-200',
            wantsCounselor === false
              ? 'border-blue-600 bg-blue-50 ring-2 ring-blue-600 ring-offset-2'
              : 'border-gray-200 bg-white hover:border-blue-300 hover:bg-blue-50/50'
          )}
        >
          <div className="flex items-start gap-3">
            <div
              className={cn(
                'flex h-10 w-10 items-center justify-center rounded-lg',
                wantsCounselor === false ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600'
              )}
            >
              <MessageCircle className="h-5 w-5" />
            </div>
            <div className="flex-1">
              <h4 className="font-semibold text-gray-900">No, I'm ready to enroll</h4>
              <p className="mt-1 text-sm text-gray-600">
                I've reviewed the details and want to proceed directly to payment.
              </p>
            </div>
            {wantsCounselor === false && <CheckCircle className="h-6 w-6 text-blue-600" />}
          </div>

          <div className="mt-4 rounded-lg bg-green-100/50 p-3">
            <p className="text-xs text-green-800">
              <strong>Fast track:</strong> Complete enrollment in minutes and get instant access to
              study materials.
            </p>
          </div>
        </button>
      </div>

      {wantsCounselor === true && (
        <div className="rounded-lg border border-amber-200 bg-amber-50 p-4">
          <p className="text-sm text-amber-800">
            <strong>Note:</strong> After submitting, your application will be saved and a counselor
            will contact you. You can complete the payment after your consultation.
          </p>
        </div>
      )}
    </div>
  )
}
