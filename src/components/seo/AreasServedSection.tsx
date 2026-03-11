import Link from 'next/link'
import { MapPin, School, Train } from 'lucide-react'

interface AreaInfo {
  name: string
  schools: string[]
  nearbyMetro: string[]
  landmarks?: string[]
}

interface AreasServedSectionProps {
  cityName: string
  citySlug: string
  areas: AreaInfo[]
}

export function AreasServedSection({ cityName, citySlug, areas }: AreasServedSectionProps) {
  if (areas.length === 0) return null

  return (
    <section className="bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        <div className="mb-10 text-center">
          <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">
            Areas We Serve in {cityName}
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-600">
            Cerebrum Biology Academy serves students from {areas.length}+ areas across {cityName}.
            Find your locality below.
          </p>
        </div>

        <div className="mx-auto grid max-w-6xl gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {areas.map((area) => (
            <div
              key={area.name}
              className="rounded-xl border border-gray-200 bg-white p-5 transition hover:shadow-md"
            >
              <div className="mb-3 flex items-center gap-2">
                <MapPin className="h-5 w-5 text-green-600" />
                <h3 className="font-semibold text-gray-900">{area.name}</h3>
              </div>
              {area.schools.length > 0 && (
                <div className="mb-2 flex items-start gap-2 text-sm text-gray-600">
                  <School className="mt-0.5 h-4 w-4 flex-shrink-0 text-gray-400" />
                  <span>{area.schools.slice(0, 3).join(', ')}</span>
                </div>
              )}
              {area.nearbyMetro.length > 0 && (
                <div className="flex items-start gap-2 text-sm text-gray-600">
                  <Train className="mt-0.5 h-4 w-4 flex-shrink-0 text-gray-400" />
                  <span>{area.nearbyMetro.slice(0, 2).join(', ')}</span>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Link
            href="/all-locations"
            className="inline-flex items-center gap-2 text-green-600 hover:text-green-700 font-medium"
          >
            View All Locations We Serve →
          </Link>
        </div>
      </div>
    </section>
  )
}
