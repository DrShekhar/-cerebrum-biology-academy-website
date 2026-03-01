import { Metadata } from 'next'
import Link from 'next/link'
import { SEOLandingPage } from '@/components/seo-landing'
import { resourcesSEOPages } from '@/data/seo-landing'

const content = resourcesSEOPages['neet-biology-important-questions']

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

const highYieldChapters = [
  { chapter: 'Human Physiology (Class 11)', questions: '15-18', marks: '60-72', focus: 'Cardiac cycle, nephron, synapse, hormones — NCERT diagrams are directly tested' },
  { chapter: 'Plant Physiology (Class 11)', questions: '10-12', marks: '40-48', focus: 'Calvin cycle, C3 vs C4, Krebs cycle, phytohormones, mineral deficiency symptoms' },
  { chapter: 'Genetics & Evolution (Class 12)', questions: '12-15', marks: '48-60', focus: 'Mendelian crosses, pedigree analysis, DNA replication, lac operon, Hardy-Weinberg' },
  { chapter: 'Cell Biology (Class 11)', questions: '8-10', marks: '32-40', focus: 'Cell organelles, biomolecule properties, mitosis vs meiosis stages' },
  { chapter: 'Ecology & Environment (Class 12)', questions: '8-10', marks: '32-40', focus: 'Population interactions, ecological succession, biodiversity hotspots, environmental issues' },
  { chapter: 'Human Reproduction (Class 12)', questions: '5-7', marks: '20-28', focus: 'Gametogenesis, menstrual cycle, embryonic development, ART techniques' },
  { chapter: 'Biotechnology (Class 12)', questions: '5-7', marks: '20-28', focus: 'rDNA technology steps, PCR, gel electrophoresis, Bt cotton, gene therapy' },
]

export default function NeetBiologyImportantQuestionsPage() {
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
            Chapter-Wise Important Questions and Weightage for NEET Biology
          </h2>
          <p className="text-gray-700 leading-relaxed mb-8 text-lg">
            NEET Biology has 90 questions worth 360 marks — approximately 45 from Botany and 45 from Zoology. Analysis of NEET papers from 2019-2025 reveals a consistent pattern: 7 high-yield units contribute over 70% of all questions. Focusing on these units first is the most efficient strategy for maximizing your Biology score.
          </p>

          <div className="overflow-x-auto mb-12">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-green-50">
                  <th className="border border-gray-200 px-4 py-3 text-left font-bold text-gray-900">Chapter / Unit</th>
                  <th className="border border-gray-200 px-3 py-3 text-center font-bold text-gray-900">Avg Questions</th>
                  <th className="border border-gray-200 px-3 py-3 text-center font-bold text-gray-900">Marks Range</th>
                  <th className="border border-gray-200 px-4 py-3 text-left font-bold text-gray-900">What to Focus On</th>
                </tr>
              </thead>
              <tbody>
                {highYieldChapters.map((ch, i) => (
                  <tr key={ch.chapter} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="border border-gray-200 px-4 py-3 font-medium text-gray-900">{ch.chapter}</td>
                    <td className="border border-gray-200 px-3 py-3 text-center">{ch.questions}</td>
                    <td className="border border-gray-200 px-3 py-3 text-center font-medium text-green-700">{ch.marks}</td>
                    <td className="border border-gray-200 px-4 py-3 text-gray-600">{ch.focus}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <article className="prose prose-lg prose-green max-w-none">
            <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
              How to Identify Important Questions from NCERT
            </h3>
            <p className="text-gray-700 leading-relaxed">
              Over 85% of NEET Biology questions are directly from NCERT or test NCERT-specific language. Important questions typically come from: (1) definitions and terminology — NEET often tests whether you know the exact NCERT definition vs a textbook paraphrase, (2) comparison tables — differences between mitosis and meiosis, C3 and C4 plants, DNA and RNA are tested every year, (3) labelled diagrams — cross-sections of heart, nephron, neuron, flower parts, and (4) specific facts buried in NCERT paragraphs that students usually skip during casual reading.
            </p>

            <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
              Previous Year Question (PYQ) Pattern Analysis
            </h3>
            <p className="text-gray-700 leading-relaxed">
              NEET repeats concepts with slightly modified options. From our analysis of 2019-2025 papers: the cardiac cycle has been asked 4 times, nephron structure 5 times, Mendelian ratios 6 times, DNA replication 4 times, and ecological pyramids 3 times. The question framing changes but the underlying concept remains the same. Students who solve all PYQs chapter-wise and understand why each option is correct or incorrect consistently score above 340 in Biology.
            </p>
            <p className="text-gray-700 leading-relaxed">
              At Cerebrum Biology Academy, we maintain a PYQ database mapped to each NCERT paragraph. After completing a chapter, students immediately solve all PYQs from that chapter and receive detailed explanations linking each answer back to the specific NCERT line. This paragraph-level mapping ensures no important concept is missed during preparation.
            </p>

            <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
              Most-Repeated NEET Biology Topics (2019-2025)
            </h3>
            <p className="text-gray-700 leading-relaxed">
              Based on frequency analysis, the top 10 most-repeated topics are: (1) Mendelian genetics and inheritance patterns, (2) Human circulatory system and cardiac cycle, (3) Excretory system and urine formation, (4) Neural control — neuron structure and synapse, (5) Plant hormones and photoperiodism, (6) Photosynthesis — light and dark reactions, (7) DNA replication and transcription, (8) Ecological succession and nutrient cycling, (9) Human reproduction and gametogenesis, (10) Biotechnology — rDNA technology and applications. These 10 topics alone contribute 40-50 questions annually.
            </p>

            <div className="mt-8 flex flex-wrap gap-4 not-prose">
              <Link href="/neet-biology-revision-notes" className="text-green-700 hover:text-green-900 font-medium">
                Revision Notes →
              </Link>
              <Link href="/neet-zoology-syllabus" className="text-green-700 hover:text-green-900 font-medium">
                Zoology Syllabus →
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
