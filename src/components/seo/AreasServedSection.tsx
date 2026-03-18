'use client'

import { useState } from 'react'
import { MapPin, School, Train, ChevronDown, Building2, Ruler } from 'lucide-react'

export interface AreaCardData {
  name: string
  description: string
  schools: string[]
  nearbyMetro: string[]
  distanceFromCenter: string
  metroLine?: string
  type?: string
}

interface AreasServedSectionProps {
  cityName: string
  areas: AreaCardData[]
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

export function AreasServedSection({ cityName, areas }: AreasServedSectionProps) {
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
            NEET Biology coaching accessible from every corner of {cityName}. Click any area to see
            nearby schools, metro connectivity, and more.
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

        <div className="mt-10 rounded-xl bg-green-50 border border-green-200 p-6 text-center max-w-3xl mx-auto">
          <p className="text-green-800 font-medium">
            Our online NEET Biology classes are accessible from all {areas.length} areas of{' '}
            {cityName}. Live interactive sessions, recorded lectures, and WhatsApp doubt support —
            study from home without commute.
          </p>
        </div>
      </div>
    </section>
  )
}
