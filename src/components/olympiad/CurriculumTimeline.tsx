/**
 * CurriculumTimeline — server component, static.
 * Three-stage curriculum scaffold: NBO foundation → IBO syllabus → Pre-Med bridge.
 * Same content shown on the global hub and every country page.
 */

import { Beaker, BookOpen, Microscope, Stethoscope, Trophy } from 'lucide-react'

const stages = [
  {
    title: 'Stage 1 — NBO Foundation',
    duration: 'Months 1–4',
    icon: BookOpen,
    description:
      'Campbell Biology end-to-end, calibrated to NBO-tier depth. NCERT-line-by-line discipline (the same 99%+ NCERT-aligned methodology that produces Indian top-rankers) gives students a textbook-perfect base before olympiad complications.',
    bullets: [
      'Campbell Biology (12th ed) — 56 chapters at olympiad depth',
      'NCERT-line-by-line revision discipline (Cerebrum signature method)',
      'Weekly diagnostic MCQs to map weak areas',
      'Diagram-from-memory drills — a NBO-tier requirement',
    ],
  },
  {
    title: 'Stage 2 — IBO Syllabus + Past Papers',
    duration: 'Months 5–8',
    icon: Microscope,
    description:
      'Direct mapping to the official IBO theory + practical syllabus. Layered Alberts (molecular biology), Lehninger (biochemistry), and Raven & Johnson (biosystematics + plant biology) reading. Past-paper saturation across 10+ years of IBO-affiliated national exams.',
    bullets: [
      'IBO syllabus mapping with weight per topic',
      'Alberts MBoC + Lehninger + Raven supplementary reading',
      '10+ years of past-paper drills — USABO / BBO / SBO / IBO',
      'Free-response writing with weekly written feedback',
    ],
  },
  {
    title: 'Stage 3 — Pre-Med Foundation Bridge',
    duration: 'Months 9–12',
    icon: Stethoscope,
    description:
      'Olympiad-grade biology depth converted into Pre-Med readiness. Curriculum prepares students for UCAT (UK), MCAT (USA / Canada), BMAT-equivalents, NEET (India / NRI), and direct-entry medicine essays. Strong olympiad standing is also a national-tier credential for Ivy / Oxbridge / NUS / Imperial / UofT applications.',
    bullets: [
      'UCAT / MCAT / BMAT mapping — biology section coverage',
      'Pre-med essay & interview prep (BS / MD pathway)',
      'Practical-round simulation (cell biology, plant + animal anatomy, biostats)',
      'College-application support: olympiad credential framing',
    ],
  },
]

export function CurriculumTimeline() {
  return (
    <section className="bg-white py-16 md:py-24">
      <div className="mx-auto max-w-5xl px-4">
        <div className="mb-10 flex items-start gap-3">
          <Beaker className="mt-1 h-7 w-7 flex-shrink-0 text-[#6B5DC6]" />
          <div>
            <h2 className="text-2xl font-bold text-[#2C2C2C] md:text-4xl">
              Curriculum — NBO depth, IBO syllabus, Pre-Med bridge
            </h2>
            <p className="mt-3 max-w-3xl text-base text-slate-600 md:text-lg">
              A 12-month programme built backwards from the IBO syllabus. The same depth that
              produces national-team olympiad standing also produces an exceptionally strong Pre-Med
              foundation — students don&apos;t need to choose between &quot;olympiad track&quot; and
              &quot;medical-school track.&quot;
            </p>
          </div>
        </div>

        <div className="space-y-5">
          {stages.map((stage) => (
            <div
              key={stage.title}
              className="rounded-2xl border border-slate-200 bg-[#EDE9FF]/30 p-6 md:p-8"
            >
              <div className="flex flex-col gap-4 md:flex-row md:items-baseline md:justify-between">
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-[#6B5DC6]">
                    <stage.icon className="h-5 w-5 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-[#2C2C2C] md:text-xl">{stage.title}</h3>
                </div>
                <span className="ml-13 inline-block w-fit rounded-full bg-white px-3 py-1 text-xs font-semibold text-[#6B5DC6] md:ml-0">
                  {stage.duration}
                </span>
              </div>
              <p className="mt-4 text-sm text-slate-700 md:text-base">{stage.description}</p>
              <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                {stage.bullets.map((b) => (
                  <li key={b} className="flex items-start gap-2 text-sm text-slate-700">
                    <Trophy className="mt-0.5 h-4 w-4 flex-shrink-0 text-[#6B5DC6]" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
