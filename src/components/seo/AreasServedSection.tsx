'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  MapPin,
  School,
  Train,
  ChevronDown,
  Building2,
  Ruler,
  Phone,
  Monitor,
  BookOpen,
  Trophy,
  GraduationCap,
} from 'lucide-react'

export interface AreaCardData {
  name: string
  description: string
  schools: string[]
  nearbyMetro: string[]
  distanceFromCenter: string
  metroLine?: string
  type?: string
}

export interface CenterInfo {
  name: string
  address: string
  phone: string
  mapUrl: string
  nearbyLandmark: string
}

interface AreasServedSectionProps {
  cityName: string
  areas: AreaCardData[]
  hasOfflineCenter?: boolean
  centerInfo?: CenterInfo
}

function AreaAccordionCard({ area }: { area: AreaCardData }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="rounded-xl border border-gray-200 bg-white transition hover:shadow-md">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between p-5 text-left"
        aria-expanded={isOpen}
      >
        <div className="flex items-center gap-2">
          <MapPin className="h-5 w-5 flex-shrink-0 text-green-600" />
          <h3 className="font-semibold text-gray-900">{area.name}</h3>
          {area.metroLine && (
            <span className="rounded-full bg-blue-100 px-2 py-0.5 text-xs font-medium text-blue-700">
              {area.metroLine}
            </span>
          )}
        </div>
        <ChevronDown
          className={`h-5 w-5 flex-shrink-0 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {isOpen && (
        <div className="border-t border-gray-100 px-5 pb-5 pt-3">
          <p className="mb-3 text-sm text-gray-600">{area.description}</p>
          <div className="space-y-2">
            {area.distanceFromCenter && (
              <div className="flex items-start gap-2 text-sm text-gray-600">
                <Ruler className="mt-0.5 h-4 w-4 flex-shrink-0 text-gray-400" />
                <span>{area.distanceFromCenter} from center</span>
              </div>
            )}
            {area.nearbyMetro.length > 0 && (
              <div className="flex items-start gap-2 text-sm text-gray-600">
                <Train className="mt-0.5 h-4 w-4 flex-shrink-0 text-gray-400" />
                <span>{area.nearbyMetro.slice(0, 3).join(', ')}</span>
              </div>
            )}
            {area.schools.length > 0 && (
              <div className="flex items-start gap-2 text-sm text-gray-600">
                <School className="mt-0.5 h-4 w-4 flex-shrink-0 text-gray-400" />
                <span>{area.schools.slice(0, 4).join(', ')}</span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

function OfflineCenterBanner({ centerInfo, cityName }: { centerInfo: CenterInfo; cityName: string }) {
  return (
    <div className="mt-10 rounded-xl bg-blue-50 border-2 border-blue-300 p-6 max-w-4xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-start gap-6">
        <div className="flex-1">
          <h3 className="text-lg font-bold text-blue-900 mb-2 flex items-center gap-2">
            <Building2 className="h-5 w-5" />
            Visit Our {cityName} Center
          </h3>
          <p className="text-blue-800 font-medium mb-1">{centerInfo.name}</p>
          <p className="text-blue-700 text-sm mb-1">{centerInfo.address}</p>
          <p className="text-blue-600 text-sm mb-3">Near {centerInfo.nearbyLandmark}</p>
          <div className="flex flex-wrap gap-3">
            <Link
              href={`tel:${centerInfo.phone}`}
              className="inline-flex items-center gap-2 rounded-full bg-green-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-green-700 transition"
            >
              <Phone className="h-4 w-4" />
              Call: +91 88264 44334
            </Link>
            <Link
              href={centerInfo.mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-blue-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-700 transition"
            >
              <MapPin className="h-4 w-4" />
              Get Directions
            </Link>
          </div>
        </div>
        <div className="md:text-right">
          <p className="text-sm text-blue-700 font-medium">Available Modes:</p>
          <ul className="text-sm text-blue-600 mt-1 space-y-1">
            <li>Offline Classes (Mon-Sat)</li>
            <li>Hybrid: Online + Weekend Offline</li>
            <li>Pure Online (Live Interactive)</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

function OnlineAdvantagesBanner({ cityName }: { cityName: string }) {
  return (
    <div className="mt-10 rounded-xl bg-green-50 border-2 border-green-300 p-6 max-w-4xl mx-auto">
      <h3 className="text-lg font-bold text-green-900 mb-3 flex items-center gap-2">
        <Monitor className="h-5 w-5" />
        Why {cityName} Students Prefer Cerebrum Online Classes
      </h3>
      <div className="grid sm:grid-cols-2 gap-4 mb-4">
        <div className="flex items-start gap-2">
          <div className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-green-600 text-white text-xs font-bold">1</div>
          <p className="text-sm text-gray-700"><span className="font-medium">Same AIIMS faculty</span> — Dr. Shekhar Singh teaches every batch, whether online or offline. No compromise on quality.</p>
        </div>
        <div className="flex items-start gap-2">
          <div className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-green-600 text-white text-xs font-bold">2</div>
          <p className="text-sm text-gray-700"><span className="font-medium">Save 2-3 hours daily</span> — zero commute means more study time. Our toppers credit this as their #1 advantage.</p>
        </div>
        <div className="flex items-start gap-2">
          <div className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-green-600 text-white text-xs font-bold">3</div>
          <p className="text-sm text-gray-700"><span className="font-medium">Recorded lectures</span> — rewatch any class anytime. Pause, rewind, replay difficult topics until mastered.</p>
        </div>
        <div className="flex items-start gap-2">
          <div className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-green-600 text-white text-xs font-bold">4</div>
          <p className="text-sm text-gray-700"><span className="font-medium">Better than offline</span> — small batch (15 students), instant doubt solving via WhatsApp, AI-powered study tools included.</p>
        </div>
      </div>
      <div className="flex flex-wrap gap-3">
        <Link
          href="/book-free-demo"
          className="inline-flex items-center gap-2 rounded-full bg-green-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-green-700 transition"
        >
          Book FREE Online Demo Class
        </Link>
        <Link
          href="tel:+918826444334"
          className="inline-flex items-center gap-2 rounded-full bg-white border border-green-600 px-5 py-2.5 text-sm font-medium text-green-700 hover:bg-green-50 transition"
        >
          <Phone className="h-4 w-4" />
          Call: +91 88264 44334
        </Link>
      </div>
    </div>
  )
}

function CourseOfferingsBanner() {
  const courses = [
    { label: 'NEET Biology', icon: Trophy },
    { label: 'Board/CBSE Biology', icon: BookOpen },
    { label: 'Class 11 & 12', icon: GraduationCap },
    { label: 'Foundation (9 & 10)', icon: School },
    { label: 'NBO / IBO / Olympiad', icon: Trophy },
    { label: 'MCQ Practice (19,000+)', icon: BookOpen },
  ]

  return (
    <div className="mt-6 rounded-xl bg-purple-50 border border-purple-200 p-6 max-w-4xl mx-auto">
      <h3 className="text-center text-lg font-bold text-purple-900 mb-4">
        Courses We Offer
      </h3>
      <div className="flex flex-wrap justify-center gap-3">
        {courses.map((c) => (
          <span
            key={c.label}
            className="inline-flex items-center gap-1.5 rounded-full bg-white border border-purple-200 px-4 py-2 text-sm font-medium text-purple-800"
          >
            <c.icon className="h-4 w-4 text-purple-600" />
            {c.label}
          </span>
        ))}
      </div>
    </div>
  )
}

export function AreasServedSection({
  cityName,
  areas,
  hasOfflineCenter,
  centerInfo,
}: AreasServedSectionProps) {
  const [showAll, setShowAll] = useState(false)
  if (areas.length === 0) return null

  const visibleAreas = showAll ? areas : areas.slice(0, 12)

  return (
    <section className="bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        <div className="mb-10 text-center">
          <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">
            {areas.length} Areas We Serve in {cityName}
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-600">
            NEET Biology, Board Biology, Foundation & Olympiad coaching accessible from every corner
            of {cityName}. Click any area for details.
          </p>
        </div>

        <div className="mx-auto grid max-w-6xl gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {visibleAreas.map((area) => (
            <AreaAccordionCard key={area.name} area={area} />
          ))}
        </div>

        {areas.length > 12 && !showAll && (
          <div className="mt-8 text-center">
            <button
              onClick={() => setShowAll(true)}
              className="inline-flex items-center gap-2 rounded-full bg-green-600 px-6 py-3 font-medium text-white hover:bg-green-700 transition"
            >
              <Building2 className="h-4 w-4" />
              Show All {areas.length} Areas
            </button>
          </div>
        )}

        {hasOfflineCenter && centerInfo ? (
          <OfflineCenterBanner centerInfo={centerInfo} cityName={cityName} />
        ) : (
          <OnlineAdvantagesBanner cityName={cityName} />
        )}

        <CourseOfferingsBanner />
      </div>
    </section>
  )
}
