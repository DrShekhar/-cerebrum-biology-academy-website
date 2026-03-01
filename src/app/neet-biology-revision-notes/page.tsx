import { Metadata } from 'next'
import Link from 'next/link'
import { SEOLandingPage } from '@/components/seo-landing'
import { resourcesSEOPages } from '@/data/seo-landing'

const content = resourcesSEOPages['neet-biology-revision-notes']

export const metadata: Metadata = {
  title: content.title,
  description: content.metaDescription,
  keywords: content.keywords,
  openGraph: {
    title: content.title,
    description: content.metaDescription,
    type: 'website',
    url: `https://cerebrumbiologyacademy.com/${content.slug}`,
  },
  twitter: {
    card: 'summary_large_image',
    title: content.title,
    description: content.metaDescription,
  },
  alternates: {
    canonical: `https://cerebrumbiologyacademy.com/${content.slug}`,
  },
}

const revisionPlan = [
  { phase: 'Phase 1: High-Yield Units', days: 'Day 1-15', chapters: 'Human Physiology (6 ch) + Plant Physiology (5 ch)', strategy: 'NCERT re-read + diagram practice + PYQ solving. These 11 chapters cover 25-30 NEET questions.' },
  { phase: 'Phase 2: Genetics & Reproduction', days: 'Day 16-25', chapters: 'Genetics (2 ch) + Reproduction (3 ch) + Biotechnology (2 ch)', strategy: 'Focus on genetic crosses, pedigree problems, and rDNA technology steps. Solve 100+ practice problems.' },
  { phase: 'Phase 3: Diversity & Ecology', days: 'Day 26-35', chapters: 'Animal Kingdom + Plant Kingdom + Ecology (4 ch)', strategy: 'Memorize classification tables, phylum characteristics, and ecological concepts using mnemonics.' },
  { phase: 'Phase 4: Remaining + Full Revision', days: 'Day 36-45', chapters: 'Cell Biology (3 ch) + Morphology + Anatomy + remaining chapters', strategy: 'Complete remaining chapters, then do 2 full NCERT read-throughs focusing only on highlighted portions.' },
]

export default function NeetBiologyRevisionNotesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(content.schema),
        }}
      />
      <SEOLandingPage content={content} />

      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            45-Day NEET Biology Revision Plan: Chapter-Wise Strategy
          </h2>
          <p className="text-gray-700 leading-relaxed mb-8 text-lg">
            Effective NEET Biology revision is not about reading everything again — it is about strategically reviewing high-weightage topics, strengthening weak areas, and practicing under exam conditions. The 38 chapters of NEET Biology (22 from Class 11 + 16 from Class 12) can be revised in 45 days using the phased approach below, prioritizing chapters by NEET question frequency.
          </p>

          <div className="space-y-4 mb-12">
            {revisionPlan.map((phase) => (
              <div key={phase.phase} className="border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-3">
                  <h3 className="text-lg font-bold text-gray-900">{phase.phase}</h3>
                  <span className="text-sm font-bold text-green-700 bg-green-50 px-3 py-1 rounded-full mt-2 md:mt-0">
                    {phase.days}
                  </span>
                </div>
                <p className="text-gray-800 font-medium mb-2">{phase.chapters}</p>
                <p className="text-gray-600 text-sm">{phase.strategy}</p>
              </div>
            ))}
          </div>

          <article className="prose prose-lg prose-green max-w-none">
            <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
              How to Make Revision Notes That Work for NEET
            </h3>
            <p className="text-gray-700 leading-relaxed">
              NEET revision notes should be concise, visual, and exam-focused. For each chapter, your notes should contain: (1) a one-page summary with key facts and definitions, (2) all comparison tables (e.g., arteries vs veins, xylem vs phloem, mitosis vs meiosis), (3) labelled diagrams redrawn from NCERT — NEET tests diagram recognition frequently, (4) flowcharts for biological processes (photosynthesis pathway, urine formation, DNA replication), and (5) a list of NCERT-specific statements that are commonly converted into MCQ options.
            </p>

            <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
              Chapter-Wise Time Allocation for Revision
            </h3>
            <p className="text-gray-700 leading-relaxed">
              Not all chapters deserve equal revision time. Human Physiology needs 5-6 days because it has 7 chapters contributing 15-18 questions. Genetics needs 3-4 days for its 12-15 questions. Plant Physiology needs 4-5 days for 10-12 questions. In contrast, chapters like Morphology of Flowering Plants and Structural Organisation need only 1 day each. Allocating time proportional to NEET weightage — not chapter length — is the key to efficient revision.
            </p>

            <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
              Last 15 Days: Rapid Revision Strategy
            </h3>
            <p className="text-gray-700 leading-relaxed">
              In the final 15 days before NEET, shift entirely to recall-based revision. Read your condensed notes (not NCERT) for 3-4 hours daily. Solve 2 full-length Biology mock tests per week under timed conditions. Review mistakes from mocks the same day. Focus on your weak chapters identified from mock test analysis. Practice 50 MCQs daily covering random topics to build speed and accuracy. The goal in the last 15 days is not to learn new concepts but to strengthen retention and build exam-day confidence.
            </p>
            <p className="text-gray-700 leading-relaxed">
              At Cerebrum Biology Academy, our revision batches follow this exact structure. Students receive pre-made chapter summaries, comparison charts, and diagram sheets aligned with NCERT. Every revision session ends with a 30-question rapid test covering the day&apos;s topics, ensuring active recall instead of passive reading.
            </p>

            <div className="mt-8 flex flex-wrap gap-4 not-prose">
              <Link href="/neet-biology-important-questions" className="text-green-700 hover:text-green-900 font-medium">
                Important Questions →
              </Link>
              <Link href="/ncert-biology-notes-class-11" className="text-green-700 hover:text-green-900 font-medium">
                Class 11 NCERT Notes →
              </Link>
              <Link href="/mcq" className="text-green-700 hover:text-green-900 font-medium">
                Practice MCQs →
              </Link>
            </div>
          </article>
        </div>
      </section>
    </>
  )
}
