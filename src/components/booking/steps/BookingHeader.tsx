'use client'

import React from 'react'
import { Users, Star, TrendingUp } from 'lucide-react'

interface BookingHeaderProps {
  currentStep: number
  stepTitles: string[]
  liveBookings: number
}

export function BookingHeader({ currentStep, stepTitles, liveBookings }: BookingHeaderProps) {
  return (
    <div className="bg-indigo-500 p-4 md:p-6 text-white">
      <h1 className="text-xl md:text-2xl font-bold mb-2">Book Your Free NEET Biology Demo Class</h1>
      <p className="text-blue-100">
        Experience our teaching methodology and get personalized guidance from AIIMS experts
      </p>

      {/* Social Proof Counter */}
      <div className="mt-4 flex flex-wrap items-center justify-center gap-4 text-sm text-blue-100">
        <div className="flex items-center gap-2">
          <Users className="w-4 h-4" />
          <span>{liveBookings}+ students booked this month</span>
        </div>
        <div className="flex items-center gap-2">
          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
          <span>4.9/5 rating from demos</span>
        </div>
        <div className="flex items-center gap-2">
          <TrendingUp className="w-4 h-4" />
          <span>98% NEET success rate</span>
        </div>
      </div>

      {/* Step Indicator */}
      <div className="flex items-center justify-between mt-6">
        {stepTitles.map((title, index) => (
          <div key={index} className="flex items-center">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                currentStep > index + 1
                  ? 'bg-green-600 text-white'
                  : currentStep === index + 1
                    ? 'bg-white text-blue-600'
                    : 'bg-blue-500 text-blue-200'
              }`}
            >
              {currentStep > index + 1 ? '✓' : index + 1}
            </div>
            {index < stepTitles.length - 1 && (
              <div
                className={`w-12 h-0.5 mx-2 ${
                  currentStep > index + 1 ? 'bg-green-600' : 'bg-blue-500'
                }`}
              />
            )}
          </div>
        ))}
      </div>

      <div className="text-center mt-2">
        <span className="text-sm text-blue-100">{stepTitles[currentStep - 1]}</span>
      </div>
    </div>
  )
}
