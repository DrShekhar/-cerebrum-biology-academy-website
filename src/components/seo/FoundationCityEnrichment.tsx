import { NEAR_ME_CITY_BY_SLUG } from '@/data/locality-content/near-me-cities'

interface FoundationCityEnrichmentProps {
  /** City slug matching a NearMeCityData entry, e.g. "kota" */
  slug: string
  /** Foundation class level */
  classLevel: 9 | 10
  /**
   * Render the "Why start early" intro block. Set false on pages that already
   * have their own why-start section to avoid a duplicate heading; the
   * schools / colleges / roadmap blocks still render.
   */
  showIntro?: boolean
}

/**
 * Rich, city-unique content block for the thin NEET-foundation-class-9/10-<city>
 * pages. Sources ONLY factual structured fields from NearMeCityData (feeder
 * schools, state medical colleges, localities) and frames them for a foundation
 * (Class 9/10) audience — deliberately NOT reusing the dropper-toned cityContext
 * prose, which would read wrong for early-stage students. Renders null if the
 * city has no data entry, so callers can drop it in safely.
 */
export function FoundationCityEnrichment({
  slug,
  classLevel,
  showIntro = true,
}: FoundationCityEnrichmentProps) {
  const city = NEAR_ME_CITY_BY_SLUG[slug]
  if (!city) return null

  // Class 9 in 2026 → Class 12 in 2029-30 → NEET 2030; Class 10 → NEET 2029.
  const neetYear = classLevel === 9 ? 2030 : 2029
  const boardYear = classLevel === 9 ? '2027' : '2028'
  const yearsRunway = classLevel === 9 ? 'four' : 'three'

  const colleges = [city.stateQuotaCollege, ...(city.otherStateMedicalColleges ?? [])].filter(
    Boolean
  )

  return (
    <section className="py-16 bg-white">
      <div className="max-w-4xl mx-auto px-4 space-y-12">
        {/* Why start early, here */}
        {showIntro ? (
          <div>
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              Why start NEET Foundation in Class {classLevel} from {city.displayName}?
            </h2>
            <p className="text-slate-700 leading-relaxed mb-4">
              A Class {classLevel} student in {city.displayName}, {city.state} has a {yearsRunway}
              -year runway to NEET {neetYear} — the single biggest advantage in medical-entrance
              preparation. NCERT Class {classLevel} Biology maps directly onto the NEET syllabus, so
              building depth now means Class 11 and 12 are spent mastering application and MCQ speed
              rather than catching up on fundamentals. Cerebrum runs live online, biology-specialist
              foundation batches for {city.displayName} families, so early starters get
              AIIMS-trained faculty and small-batch attention without a daily commute across the
              city.
            </p>
            <p className="text-slate-700 leading-relaxed">
              The plan is deliberate: strengthen Class {classLevel} boards (targeting {boardYear}),
              keep NCERT Biology airtight, and enter Class 11 already ahead. Students across{' '}
              {city.majorAreas.slice(0, 4).join(', ')} and the wider {city.displayName} region
              attend the same live evening batches.
            </p>
          </div>
        ) : null}

        {/* Feeder schools */}
        {city.feederSchools?.length ? (
          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              {city.displayName} schools our foundation students come from
            </h2>
            <p className="text-slate-700 leading-relaxed mb-4">
              We work alongside the strongest NEET-feeder schools in {city.displayName}, adding a
              biology-specialist layer to a student&apos;s regular schooling:
            </p>
            <ul className="grid sm:grid-cols-2 gap-2">
              {city.feederSchools.map((s) => (
                <li key={s} className="flex items-start gap-2 text-slate-700">
                  <span className="text-emerald-600 mt-1">•</span>
                  <span>{s}</span>
                </li>
              ))}
            </ul>
          </div>
        ) : null}

        {/* The long-term goal — local colleges */}
        {colleges.length ? (
          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              The goal a {city.displayName} foundation builds toward
            </h2>
            <p className="text-slate-700 leading-relaxed mb-4">
              Starting in Class {classLevel} keeps the strongest state-quota medical seats within
              reach. For {city.state} aspirants, the target colleges include:
            </p>
            <ul className="space-y-2">
              {colleges.map((c) => (
                <li key={c} className="flex items-start gap-2 text-slate-700">
                  <span className="text-emerald-600 mt-1">•</span>
                  <span>{c}</span>
                </li>
              ))}
            </ul>
            <p className="text-slate-700 leading-relaxed mt-4">
              85% of NEET seats in {city.state} are reserved for state-domicile candidates — an
              early, biology-strong foundation from {city.displayName} is how families convert that
              home-state advantage into an admission.
            </p>
          </div>
        ) : null}

        {/* Roadmap */}
        <div>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">
            Your {city.displayName} foundation roadmap
          </h2>
          <ol className="space-y-3">
            <li className="flex gap-3 text-slate-700">
              <span className="font-bold text-emerald-700">Class {classLevel} (now)</span>
              <span>
                NCERT Biology depth + Class {classLevel} board strength (boards {boardYear}).
              </span>
            </li>
            <li className="flex gap-3 text-slate-700">
              <span className="font-bold text-emerald-700">Class 11–12</span>
              <span>Full NEET Biology syllabus, weekly MCQ practice, mock-test cadence.</span>
            </li>
            <li className="flex gap-3 text-slate-700">
              <span className="font-bold text-emerald-700">NEET {neetYear}</span>
              <span>Target a top state-quota medical seat with {yearsRunway} years of runway.</span>
            </li>
          </ol>
        </div>
      </div>
    </section>
  )
}
