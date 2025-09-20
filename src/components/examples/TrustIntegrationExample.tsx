'use client'

import React from 'react'
import { TrustInjections, TrustWrapper } from '@/components/conversion/TrustInjections'
import { SmartButton } from '@/components/ui/LoadingStates'

/**
 * Example implementations showing how to integrate trust elements
 * into pricing pages, enrollment forms, and course cards
 */

// Example: Course pricing card with trust elements
export function CourseCardWithTrust() {
  return (
    <div className="bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden max-w-sm">
      {/* Course Image */}
      <div className="h-48 bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center">
        <h3 className="text-2xl font-bold text-white">NEET Biology Premium</h3>
      </div>

      {/* Course Content */}
      <div className="p-6">
        <h4 className="text-xl font-semibold text-slate-800 mb-2">Complete NEET Biology Course</h4>

        <p className="text-slate-600 mb-4">
          Comprehensive Biology course for NEET 2025 with live classes and doubt sessions.
        </p>

        {/* Pricing Section */}
        <div className="mb-4">
          <div className="flex items-baseline space-x-2 mb-2">
            <span className="text-3xl font-bold text-slate-800">₹15,999</span>
            <span className="text-lg text-slate-500 line-through">₹29,999</span>
            <span className="bg-emerald-100 text-emerald-800 px-2 py-1 rounded-full text-sm font-semibold">
              47% OFF
            </span>
          </div>

          {/* Trust Elements Near Price */}
          <TrustWrapper position="near-price" />
        </div>

        {/* Enrollment Section */}
        <div>
          {/* Social Proof Near CTA */}
          <TrustWrapper position="near-enroll" />

          {/* Enrollment Button */}
          <SmartButton
            variant="primary"
            className="w-full mb-4"
            onClick={() => console.log('Enroll clicked')}
          >
            Enroll Now
          </SmartButton>

          {/* Security Badges */}
          <TrustWrapper position="security" />
        </div>
      </div>
    </div>
  )
}

// Example: Pricing page with comprehensive trust elements
export function PricingPageWithTrust() {
  const plans = [
    {
      id: 'basic',
      name: 'Basic',
      price: '₹9,999',
      originalPrice: '₹19,999',
      features: ['Live Classes', 'Recorded Videos', 'Study Material'],
      popular: false,
    },
    {
      id: 'premium',
      name: 'Premium',
      price: '₹15,999',
      originalPrice: '₹29,999',
      features: ['Everything in Basic', 'Doubt Sessions', 'Mock Tests', 'Personal Mentor'],
      popular: true,
    },
    {
      id: 'ultimate',
      name: 'Ultimate',
      price: '₹25,999',
      originalPrice: '₹49,999',
      features: [
        'Everything in Premium',
        '1-on-1 Sessions',
        'Guaranteed Results',
        'Priority Support',
      ],
      popular: false,
    },
  ]

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-slate-800 mb-4">
          Choose Your NEET Biology Success Plan
        </h1>
        <p className="text-xl text-slate-600 mb-6">Join 10,000+ successful NEET aspirants</p>

        {/* Guarantee Banner */}
        <TrustWrapper position="guarantee" />
      </div>

      {/* Live Activity Feed */}
      <div className="mb-8">
        <TrustWrapper position="activity" />
      </div>

      {/* Pricing Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className={`relative bg-white rounded-xl shadow-lg border-2 p-8 ${
              plan.popular ? 'border-purple-500 ring-4 ring-purple-500/20' : 'border-slate-200'
            }`}
          >
            {plan.popular && (
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-purple-500 text-white px-4 py-2 rounded-full text-sm font-semibold">
                  Most Popular
                </span>
              </div>
            )}

            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-slate-800 mb-2">{plan.name}</h3>
              <div className="flex items-baseline justify-center space-x-2">
                <span className="text-4xl font-bold text-slate-800">{plan.price}</span>
                <span className="text-lg text-slate-500 line-through">{plan.originalPrice}</span>
              </div>
            </div>

            {/* Features */}
            <ul className="space-y-3 mb-8">
              {plan.features.map((feature, index) => (
                <li key={index} className="flex items-center space-x-2">
                  <svg className="w-5 h-5 text-emerald-500" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-slate-700">{feature}</span>
                </li>
              ))}
            </ul>

            {/* Trust Elements Near Price */}
            {plan.popular && <TrustWrapper position="near-price" />}

            {/* Social Proof Near CTA */}
            {plan.popular && <TrustWrapper position="near-enroll" />}

            {/* CTA Button */}
            <SmartButton
              variant={plan.popular ? 'primary' : 'secondary'}
              className="w-full"
              onClick={() => console.log(`${plan.name} selected`)}
            >
              Choose {plan.name}
            </SmartButton>
          </div>
        ))}
      </div>

      {/* Additional Trust Elements */}
      <div className="text-center">
        <TrustWrapper position="security" />
      </div>
    </div>
  )
}

// Example: Enrollment form with trust elements
export function EnrollmentFormWithTrust() {
  return (
    <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-8">
      <h2 className="text-3xl font-bold text-center text-slate-800 mb-8">
        Complete Your Enrollment
      </h2>

      {/* Progress Indicator */}
      <div className="mb-8">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center text-white font-semibold">
              ✓
            </div>
            <span className="text-sm font-medium text-emerald-600">Course Selected</span>
          </div>
          <div className="flex-1 h-px bg-emerald-500"></div>
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white font-semibold">
              2
            </div>
            <span className="text-sm font-medium text-purple-600">Payment</span>
          </div>
        </div>
      </div>

      {/* Selected Course Summary */}
      <div className="bg-slate-50 rounded-lg p-6 mb-6">
        <h3 className="font-semibold text-slate-800 mb-2">NEET Biology Premium</h3>
        <div className="flex justify-between items-center">
          <span className="text-slate-600">Course Fee</span>
          <span className="text-2xl font-bold text-slate-800">₹15,999</span>
        </div>

        {/* Trust Elements Near Price */}
        <TrustWrapper position="near-price" />
      </div>

      {/* Live Activity */}
      <TrustWrapper position="activity" />

      {/* Payment Form */}
      <form className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Full Name</label>
          <input
            type="text"
            className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            placeholder="Enter your full name"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Email Address</label>
          <input
            type="email"
            className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            placeholder="Enter your email"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Mobile Number</label>
          <input
            type="tel"
            className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            placeholder="Enter 10-digit mobile number"
          />
        </div>

        {/* Social Proof Near Payment Button */}
        <TrustWrapper position="near-enroll" />

        {/* Payment Button */}
        <SmartButton
          variant="primary"
          className="w-full"
          size="lg"
          onClick={() => console.log('Payment initiated')}
        >
          Proceed to Payment ₹15,999
        </SmartButton>

        {/* Security Badges */}
        <TrustWrapper position="security" />
      </form>
    </div>
  )
}

// Example: Homepage hero with trust elements
export function HeroWithTrust() {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 flex items-center">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-black/20"></div>

      <div className="relative max-w-6xl mx-auto px-6 text-center text-white">
        <h1 className="text-5xl md:text-7xl font-bold mb-6">
          Master NEET Biology with
          <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
            {' '}
            AIIMS Faculty
          </span>
        </h1>

        <p className="text-xl md:text-2xl mb-8 text-slate-200">
          98% Success Rate • 2000+ Selections • Trusted by 10,000+ Students
        </p>

        {/* Live Activity Near Hero CTA */}
        <div className="mb-8">
          <TrustWrapper position="activity" />
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
          <SmartButton
            variant="primary"
            size="lg"
            className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600"
            onClick={() => console.log('Start free trial')}
          >
            Start Free Trial
          </SmartButton>

          <SmartButton
            variant="secondary"
            size="lg"
            className="bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20"
            onClick={() => console.log('Book demo')}
          >
            Book Demo Class
          </SmartButton>
        </div>

        {/* Trust Elements */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          <div className="text-center">
            <div className="text-4xl font-bold text-yellow-400 mb-2">98%</div>
            <div className="text-slate-300">Success Rate</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-emerald-400 mb-2">2000+</div>
            <div className="text-slate-300">NEET Selections</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-blue-400 mb-2">10K+</div>
            <div className="text-slate-300">Happy Students</div>
          </div>
        </div>

        {/* Guarantee Banner */}
        <div className="mt-12">
          <TrustWrapper position="guarantee" />
        </div>
      </div>
    </div>
  )
}

export default {
  CourseCardWithTrust,
  PricingPageWithTrust,
  EnrollmentFormWithTrust,
  HeroWithTrust,
}
