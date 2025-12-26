'use client'

import React from 'react'
import Link from 'next/link'

export default function TestingDemoLandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Cerebrum Biology Academy</h1>
          <h2 className="text-2xl font-semibold text-gray-700 mb-6">
            Testing & Analytics Demo Suite
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Explore our comprehensive testing and optimization framework built for the NEET course
            selector. This demo showcases all the analytics, feedback collection, and optimization
            tools working together.
          </p>
        </div>

        {/* Demo Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          <DemoCard
            title="Complete Testing Suite"
            description="View all testing and analytics components in one comprehensive dashboard"
            icon="🧪"
            href="/demo/testing-suite"
            features={[
              'Conversion Funnel Analysis',
              'Heatmap & Behavior Tracking',
              'Feedback Collection System',
              'Optimization Dashboard',
              'A/B Testing Framework',
              'User Testing Scenarios',
            ]}
            isPrimary={true}
          />

          <DemoCard
            title="Funnel Analytics"
            description="Deep dive into conversion funnel analysis with real-time tracking"
            icon="🔄"
            href="/demo/testing-suite?tab=funnel"
            features={[
              '17-step funnel tracking',
              'Real-time drop-off analysis',
              'Bottleneck identification',
              'Cohort analysis',
              'Performance metrics',
            ]}
          />

          <DemoCard
            title="Heatmap Analytics"
            description="Visual user interaction tracking and behavior analysis"
            icon="🔥"
            href="/demo/testing-suite?tab=heatmap"
            features={[
              'Click pattern analysis',
              'Scroll behavior tracking',
              'Mouse movement heatmaps',
              'Element interaction stats',
              'User journey visualization',
            ]}
          />

          <DemoCard
            title="Feedback System"
            description="Smart feedback collection with contextual surveys"
            icon="💬"
            href="/demo/testing-suite?tab=feedback"
            features={[
              '5 survey types',
              'Smart triggering system',
              'Multiple question formats',
              'Sentiment analysis',
              'Critical issue alerts',
            ]}
          />

          <DemoCard
            title="Optimization Engine"
            description="AI-powered insights and systematic improvement cycles"
            icon="🚀"
            href="/demo/testing-suite?tab=optimization"
            features={[
              'AI-generated insights',
              'Improvement recommendations',
              'Action plan generation',
              'Progress tracking',
              'ROI measurement',
            ]}
          />

          <DemoCard
            title="System Overview"
            description="High-level overview of all components and their integration"
            icon="📊"
            href="/demo/testing-suite?tab=overview"
            features={[
              'Component status',
              'Key metrics dashboard',
              'Implementation progress',
              'Feature highlights',
              'Integration status',
            ]}
          />
        </div>

        {/* Quick Stats */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-12">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            What You'll See in the Demo
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold text-blue-600">100+</div>
              <div className="text-gray-600">Demo Users</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-600">17</div>
              <div className="text-gray-600">Funnel Steps</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-600">500+</div>
              <div className="text-gray-600">Interactions</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-orange-600">50+</div>
              <div className="text-gray-600">Feedback Responses</div>
            </div>
          </div>
        </div>

        {/* Technical Details */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Technical Implementation</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h4 className="text-lg font-semibold text-gray-800 mb-4">Frontend Technologies</h4>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                  Next.js 15.5.3 with App Router
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                  TypeScript for type safety
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                  Tailwind CSS for styling
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                  React hooks for state management
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                  Canvas-based heatmap visualization
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-gray-800 mb-4">Analytics & Data</h4>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-green-600 rounded-full mr-3"></span>
                  Real-time event tracking
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-green-600 rounded-full mr-3"></span>
                  Statistical analysis algorithms
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-green-600 rounded-full mr-3"></span>
                  Machine learning insights
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-green-600 rounded-full mr-3"></span>
                  Cross-data pattern recognition
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-green-600 rounded-full mr-3"></span>
                  Automated optimization recommendations
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <Link
            href="/demo/testing-suite"
            className="inline-flex items-center px-8 py-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors shadow-lg"
          >
            <span className="text-2xl mr-3">🚀</span>
            Explore the Complete Demo
          </Link>
          <p className="text-gray-600 mt-4">
            No setup required • Fully interactive • Real demo data
          </p>
        </div>
      </div>
    </div>
  )
}

interface DemoCardProps {
  title: string
  description: string
  icon: string
  href: string
  features: string[]
  isPrimary?: boolean
}

function DemoCard({ title, description, icon, href, features, isPrimary = false }: DemoCardProps) {
  return (
    <Link href={href} className="block group">
      <div
        className={`h-full bg-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 p-6 ${
          isPrimary
            ? 'ring-2 ring-blue-500 transform hover:scale-105'
            : 'hover:transform hover:scale-102'
        }`}
      >
        {isPrimary && (
          <div className="bg-blue-500 text-white text-xs font-bold px-3 py-1 rounded-full inline-block mb-4">
            COMPLETE SUITE
          </div>
        )}

        <div className="text-4xl mb-4">{icon}</div>

        <h3 className={`text-xl font-bold mb-3 ${isPrimary ? 'text-blue-700' : 'text-gray-900'}`}>
          {title}
        </h3>

        <p className="text-gray-600 mb-4 text-sm">{description}</p>

        <ul className="space-y-1 text-sm text-gray-500">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center">
              <span
                className={`w-1.5 h-1.5 rounded-full mr-2 ${
                  isPrimary ? 'bg-blue-500' : 'bg-gray-400'
                }`}
              ></span>
              {feature}
            </li>
          ))}
        </ul>

        <div
          className={`mt-4 text-sm font-medium ${
            isPrimary ? 'text-blue-600' : 'text-gray-700'
          } group-hover:underline`}
        >
          Explore →
        </div>
      </div>
    </Link>
  )
}
