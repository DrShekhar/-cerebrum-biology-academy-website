import Link from 'next/link'
import { MapPin, GraduationCap, Building2, ArrowRight } from 'lucide-react'

/**
 * Renders city-specific locality cues (feeder schools, metro stations,
 * sub-areas, local competitors) on hub pages — the content Google needs
 * to distinguish Cerebrum from generic boilerplate-template pages.
 *
 * Drop into city hub pages just under the hero to surface real local
 * context that improves both E-E-A-T and natural keyword inclusion.
 */

export interface LocalityCuesProps {
  cityName: string
  cityShortName?: string
  feederSchools: { name: string; href?: string; area?: string }[]
  subAreas: { name: string; description?: string }[]
  metroStations: { name: string; line: string }[]
  localCompetitors: { brand: string; note?: string }[]
  introCopy: string
}

export function LocalityCues({
  cityName,
  cityShortName,
  feederSchools,
  subAreas,
  metroStations,
  localCompetitors,
  introCopy,
}: LocalityCuesProps) {
  const display = cityShortName ?? cityName
  return (
    <section className="py-12 bg-slate-50 border-y border-slate-200">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-3">
              Inside Cerebrum&apos;s {display} NEET Coaching
            </h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">{introCopy}</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
              <div className="flex items-center gap-2 mb-4">
                <GraduationCap className="w-5 h-5 text-green-700" />
                <h3 className="font-bold text-slate-900">Feeder Schools</h3>
              </div>
              <ul className="space-y-2 text-sm text-slate-700">
                {feederSchools.map((s) => (
                  <li key={s.name}>
                    {s.href ? (
                      <Link href={s.href} className="hover:text-green-700 hover:underline">
                        {s.name}
                      </Link>
                    ) : (
                      s.name
                    )}
                    {s.area ? <span className="text-slate-500"> · {s.area}</span> : null}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
              <div className="flex items-center gap-2 mb-4">
                <MapPin className="w-5 h-5 text-green-700" />
                <h3 className="font-bold text-slate-900">Sub-Areas Covered</h3>
              </div>
              <ul className="space-y-2 text-sm text-slate-700">
                {subAreas.map((a) => (
                  <li key={a.name}>
                    <span className="font-semibold">{a.name}</span>
                    {a.description ? (
                      <span className="text-slate-500"> · {a.description}</span>
                    ) : null}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
              <div className="flex items-center gap-2 mb-4">
                <ArrowRight className="w-5 h-5 text-green-700" />
                <h3 className="font-bold text-slate-900">Metro Access</h3>
              </div>
              <ul className="space-y-2 text-sm text-slate-700">
                {metroStations.map((m) => (
                  <li key={m.name}>
                    <span className="font-semibold">{m.name}</span>
                    <span className="text-slate-500"> · {m.line}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
              <div className="flex items-center gap-2 mb-4">
                <Building2 className="w-5 h-5 text-green-700" />
                <h3 className="font-bold text-slate-900">Local Alternatives</h3>
              </div>
              <ul className="space-y-2 text-sm text-slate-700">
                {localCompetitors.map((c) => (
                  <li key={c.brand}>
                    <span className="font-semibold">{c.brand}</span>
                    {c.note ? <span className="text-slate-500"> · {c.note}</span> : null}
                  </li>
                ))}
              </ul>
              <p className="text-xs text-slate-500 mt-4 italic">
                Most serious aspirants pair Cerebrum (Biology) with one of these (Physics +
                Chemistry).
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
