import { Metadata } from 'next'
import Link from 'next/link'
import { SEOLandingPage } from '@/components/seo-landing'
import { class11SEOPages } from '@/data/seo-landing'

const content = class11SEOPages.class11NeetPreparationOnline

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

export default function Class11NeetPreparationOnlinePage() {
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
        <article className="max-w-4xl mx-auto px-4 prose prose-lg prose-green">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Why Class 11 Is the Foundation Year for NEET Success
          </h2>
          <p className="text-gray-700 leading-relaxed">
            Class 11 Biology contributes approximately 50% of the NEET Biology syllabus — around 45 questions (180 marks) come from Class 11 chapters. Yet most students underestimate Class 11, focusing heavily on Class 12 and cramming Class 11 topics during revision. This is the biggest strategic mistake in NEET preparation because chapters like Plant Physiology, Human Physiology, and Cell Biology require deep conceptual understanding that cannot be built in a few weeks.
          </p>

          <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
            Month-by-Month Class 11 NEET Biology Timeline
          </h3>
          <p className="text-gray-700 leading-relaxed">
            <strong>April-June:</strong> The Living World, Biological Classification, Plant Kingdom, and Animal Kingdom. These chapters build the taxonomic foundation. Focus on memorizing classification hierarchies, salient features of each phylum and division, and key differences between groups.
          </p>
          <p className="text-gray-700 leading-relaxed">
            <strong>July-September:</strong> Cell Biology (Cell: The Unit of Life, Biomolecules, Cell Cycle and Division) and Plant Anatomy (Morphology and Anatomy of Flowering Plants). Cell Biology alone contributes 8-10 NEET questions. Master cell organelle functions, biomolecule structures, and the differences between mitosis and meiosis.
          </p>
          <p className="text-gray-700 leading-relaxed">
            <strong>October-December:</strong> Plant Physiology (Transport in Plants, Mineral Nutrition, Photosynthesis, Respiration, Plant Growth) — the most conceptually challenging unit. Photosynthesis and Respiration require understanding biochemical pathways like the Calvin cycle, C3/C4 pathways, glycolysis, and Krebs cycle.
          </p>
          <p className="text-gray-700 leading-relaxed">
            <strong>January-March:</strong> Human Physiology (Digestion, Breathing, Body Fluids, Excretion, Locomotion, Neural Control, Chemical Coordination). This is the highest-scoring unit with 15-20 questions in NEET. Complete NCERT diagrams and flowcharts are essential.
          </p>

          <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
            Online vs Offline: Why Online Works Better for Class 11
          </h3>
          <p className="text-gray-700 leading-relaxed">
            Class 11 students juggle school, coaching, and self-study. Online NEET preparation eliminates travel time (2-3 hours daily for Delhi NCR students), allows flexible scheduling around school exams, and provides recorded lectures for revision. At Cerebrum Biology Academy, our online Class 11 batches maintain the same 10-15 student batch size as offline, ensuring personal attention through live interactive sessions with Dr. Shekhar Singh.
          </p>

          <div className="mt-8 flex flex-wrap gap-4 not-prose">
            <Link href="/courses/class-11-neet" className="text-green-700 hover:text-green-900 font-medium">
              Class 11 NEET Course →
            </Link>
            <Link href="/ncert-biology-notes-class-11" className="text-green-700 hover:text-green-900 font-medium">
              Class 11 NCERT Notes →
            </Link>
            <Link href="/blog/class-11-biology-neet-chapter-wise-guide" className="text-green-700 hover:text-green-900 font-medium">
              Chapter-Wise Guide →
            </Link>
          </div>
        </article>
      </section>
    </>
  )
}
