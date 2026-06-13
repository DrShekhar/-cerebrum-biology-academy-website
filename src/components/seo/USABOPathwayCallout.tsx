/**
 * USABOPathwayCallout
 *
 * Drop-in section for NEET-USA city pages and NRI-USA hubs. Surfaces the USABO/IBO
 * pathway for students who landed on a NEET page but are also strong candidates
 * for the USA Biology Olympiad track (typically Indian-American students at
 * competitive US high schools).
 */

import Link from 'next/link'
import { Award, ChevronRight, Trophy } from 'lucide-react'

interface USABOPathwayCalloutProps {
  /** City or region name to show in the callout copy. */
  cityName?: string
  /** Optional list of nearby high-USABO-density schools to mention. */
  schools?: string[]
}

export function USABOPathwayCallout({ cityName, schools }: USABOPathwayCalloutProps) {
  const cityClause = cityName ? ` in ${cityName}` : ''
  const schoolClause =
    schools && schools.length > 0
      ? `If your student attends ${schools.slice(0, -1).join(', ')}${
          schools.length > 1 ? ' or ' : ''
        }${schools[schools.length - 1]}, the USABO pathway is worth a serious look — these schools regularly produce Semifinalists and Finalists.`
      : 'Indian-American families at competitive US high schools — TJHSST, Stuyvesant, Monta Vista, Lynbrook, Bellevue, Lexington, Clements, BASIS, Plano West and others — already train with us for both NEET and USABO.'

  return (
    <section className="py-12 md:py-16 bg-gradient-to-br from-amber-50 to-orange-50">
      <div className="max-w-5xl mx-auto px-4">
        <div className="rounded-2xl border border-amber-300 bg-white p-6 md:p-8 shadow-md">
          <div className="flex items-center gap-2 mb-3">
            <Award className="h-6 w-6 text-amber-600" />
            <span className="text-xs font-bold tracking-wide text-amber-700 uppercase">
              For Indian-American families
            </span>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-3">
            Considering the USABO + IBO pathway too?
          </h2>
          <p className="text-slate-700 mb-4">
            Many NEET aspirants{cityClause} are also strong USA Biology Olympiad (USABO) candidates.
            AP-5 students sit roughly six weeks of focused prep away from a USABO Semifinalist score
            — a national-tier credential that materially strengthens college applications to Ivy /
            MIT / Stanford / JHU STEM programmes.
          </p>
          <p className="text-slate-700 mb-6">
            {schoolClause} Our coaching is taught by AIIMS-trained faculty using the same
            depth-first, biology-only methodology that produces Indian top performers — adapted to
            US time zones and the USABO Open Exam (February) and Semifinal (March) format.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/usabo-coaching"
              className="inline-flex items-center gap-2 rounded-lg bg-amber-500 hover:bg-amber-600 text-slate-900 px-5 py-2.5 font-semibold transition"
            >
              <Trophy className="w-4 h-4" />
              Explore USABO programme
              <ChevronRight className="w-4 h-4" />
            </Link>
            <Link
              href="/ap-biology-vs-usabo"
              className="inline-flex items-center gap-2 rounded-lg border border-amber-400 bg-white hover:bg-amber-50 text-amber-800 px-5 py-2.5 font-medium transition"
            >
              AP Biology → USABO bridge
            </Link>
            <Link
              href="/ibo-preparation"
              className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 px-5 py-2.5 font-medium transition"
            >
              IBO preparation
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
