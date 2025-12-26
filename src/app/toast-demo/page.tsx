'use client'

import React from 'react'
import { useToast } from '@/components/ui/Toast'
import { CheckCircle2, AlertCircle, Info, AlertTriangle } from 'lucide-react'

export default function ToastDemoPage() {
  const { showToast } = useToast()

  const toastExamples = [
    {
      variant: 'success' as const,
      title: 'Success!',
      message: 'Your action was completed successfully.',
      icon: CheckCircle2,
      color: 'bg-green-600',
    },
    {
      variant: 'error' as const,
      title: 'Error',
      message: 'Something went wrong. Please try again.',
      icon: AlertCircle,
      color: 'bg-red-500',
    },
    {
      variant: 'warning' as const,
      title: 'Warning',
      message: 'Please review your input before continuing.',
      icon: AlertTriangle,
      color: 'bg-yellow-500',
    },
    {
      variant: 'info' as const,
      title: 'Information',
      message: 'Here is some helpful information for you.',
      icon: Info,
      color: 'bg-blue-500',
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Toast Notification System</h1>
          <p className="text-lg text-gray-600">
            Click the buttons below to test all toast variants
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Toast Variants</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {toastExamples.map((example) => (
              <div key={example.variant} className="space-y-3">
                <div className="flex items-center space-x-2">
                  <div className={`${example.color} p-2 rounded-lg`}>
                    <example.icon className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800 capitalize">
                    {example.variant}
                  </h3>
                </div>
                <button
                  onClick={() => showToast(example.variant, example.title, example.message)}
                  className={`w-full ${example.color} text-white py-3 px-6 rounded-lg font-medium hover:opacity-90 transition-opacity focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-${example.variant === 'success' ? 'green' : example.variant === 'error' ? 'red' : example.variant === 'warning' ? 'yellow' : 'blue'}-500`}
                >
                  Show {example.variant} Toast
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            Duration & Auto-dismiss Tests
          </h2>
          <div className="space-y-4">
            <button
              onClick={() =>
                showToast('info', 'Short Duration', 'This toast dismisses in 2s', 2000)
              }
              className="w-full bg-blue-500 text-white py-3 px-6 rounded-lg font-medium hover:opacity-90 transition-opacity"
            >
              Toast (2 seconds)
            </button>
            <button
              onClick={() =>
                showToast(
                  'success',
                  'Standard Duration',
                  'This toast dismisses in 5s (default)',
                  5000
                )
              }
              className="w-full bg-green-600 text-white py-3 px-6 rounded-lg font-medium hover:opacity-90 transition-opacity"
            >
              Toast (5 seconds - Default)
            </button>
            <button
              onClick={() =>
                showToast('warning', 'Long Duration', 'This toast dismisses in 10s', 10000)
              }
              className="w-full bg-yellow-500 text-white py-3 px-6 rounded-lg font-medium hover:opacity-90 transition-opacity"
            >
              Toast (10 seconds)
            </button>
            <button
              onClick={() =>
                showToast('info', 'No Auto-dismiss', 'This toast stays until manually dismissed', 0)
              }
              className="w-full bg-purple-500 text-white py-3 px-6 rounded-lg font-medium hover:opacity-90 transition-opacity"
            >
              Toast (No auto-dismiss)
            </button>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Stacking Test</h2>
          <p className="text-gray-600 mb-4">
            Click this button multiple times to test toast stacking behavior
          </p>
          <button
            onClick={() => {
              showToast(
                'success',
                `Toast ${Date.now()}`,
                `This is toast number ${Math.random().toFixed(3)}`
              )
            }}
            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 px-6 rounded-lg font-medium hover:opacity-90 transition-opacity"
          >
            Create Multiple Toasts
          </button>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Accessibility Features</h2>
          <div className="space-y-4 text-gray-700">
            <div className="flex items-start space-x-3">
              <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="font-semibold">ARIA Live Regions</h3>
                <p className="text-sm text-gray-600">
                  Toasts are announced to screen readers using proper aria-live attributes
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="font-semibold">Keyboard Navigation</h3>
                <p className="text-sm text-gray-600">
                  Close buttons are focusable and can be activated with keyboard
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="font-semibold">Semantic Roles</h3>
                <p className="text-sm text-gray-600">
                  Each toast has proper role="alert" for important messages
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="font-semibold">Focus Management</h3>
                <p className="text-sm text-gray-600">
                  Focus rings visible on interactive elements for keyboard users
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 p-6 bg-blue-50 rounded-xl border border-blue-200">
          <h3 className="text-lg font-semibold text-blue-900 mb-2">Implementation Status</h3>
          <ul className="space-y-2 text-sm text-blue-800">
            <li>✅ Toast context and hook working</li>
            <li>✅ Toast container displays animations</li>
            <li>✅ All 4 variants (success/error/warning/info) work</li>
            <li>✅ Auto-dismiss functionality works</li>
            <li>✅ Manual dismiss works</li>
            <li>✅ Integrated into root layout</li>
            <li>✅ Dashboard components using new system</li>
            <li>✅ ARIA live regions for accessibility</li>
            <li>✅ Keyboard navigation support</li>
            <li>✅ Proper focus management</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
