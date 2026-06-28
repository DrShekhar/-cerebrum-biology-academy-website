import { Metadata } from 'next'
import PageContent from './PageContent'
import { LocalitySchema } from '@/components/seo/LocalitySchema'

const BASE_URL = 'https://cerebrumbiologyacademy.com'

export const metadata: Metadata = {
  title: 'AP Biology to NEET Biology Bridge',
  description:
    'Bridge course for AP Biology students moving to NEET-UG: maps College Board AP units onto the NCERT-based NEET syllabus, closes India-specific content gaps, and drills NCERT-line-precise answer accuracy. Live online, biology-only specialist faculty.',
  openGraph: {
    title: 'AP Biology to NEET Biology Bridge',
    description:
      'Bridge course for AP Biology students moving to NEET-UG: maps College Board AP units onto the NCERT-based NEET syllabus, closes India-specific content gaps, and drills NCERT-line-precise answer accuracy. Live online, biology-only specialist faculty.',
    url: `${BASE_URL}/ap-biology-to-neet-preparation`,
    siteName: 'Cerebrum Biology Academy',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AP Biology to NEET Biology Bridge',
    description:
      'Bridge course for AP Biology students moving to NEET-UG: maps College Board AP units onto the NCERT-based NEET syllabus, closes India-specific content gaps, and drills NCERT-line-precise answer accuracy. Live online, biology-only specialist faculty.',
  },
  alternates: {
    canonical: `${BASE_URL}/ap-biology-to-neet-preparation`,
  },
}

const faqs = [
  {
    q: 'Can an AP Biology student realistically prepare for NEET?',
    a: 'Yes. AP Biology and NEET share roughly 70% of their core concepts — cell biology, genetics, human physiology, and ecology transfer directly. The bridge course re-anchors that knowledge onto the NCERT framework NEET is built from and closes the India-specific gaps, so AP students rarely start from zero.',
  },
  {
    q: 'Which topics need the most focus when moving from AP Biology to NEET?',
    a: "The biggest gaps are the NCERT-specific, breadth-heavy units that AP under-weights: Biological Classification, Plant and Animal Kingdom, Morphology and Anatomy of Flowering Plants, Human Reproduction and Reproductive Health, Biotechnology applications, and Ecology at NCERT depth. AP's molecular and cell focus carries over well; NEET adds exhaustive NCERT-line recall.",
  },
  {
    q: 'How is NEET Biology different from the AP Biology exam?',
    a: 'NEET Biology is 360 of 720 marks — half the exam — tested as 90 single-correct MCQs drawn almost line-by-line from NCERT Class 11 and 12. AP Biology is scored on the College Board CED with free-response questions and data analysis. NEET rewards precise NCERT recall over experimental reasoning, which is the main adjustment for AP students.',
  },
  {
    q: 'How long does the bridge program take?',
    a: 'Typically 6-8 months, depending on how strong your NCERT foundation is and your target score. Students already comfortable with AP-level molecular and cell biology can move faster through the overlapping units and spend the time on the NEET-specific breadth.',
  },
  {
    q: 'Do you support international students?',
    a: 'Yes. Classes are live online in time-zone-friendly slots with recordings available, so students can prepare for NEET while finishing AP or after their AP exams. We work with students across multiple countries.',
  },
  {
    q: 'What does the program cost?',
    a: 'Plans start from ₹32,000. Message us on WhatsApp for a plan matched to your timeline, current level, and target score.',
  },
]

export default function Page() {
  return (
    <>
      <LocalitySchema
        locality="Online"
        slug="ap-biology-to-neet-preparation"
        pageTitle="AP Biology to NEET Biology Bridge"
        pageDescription="Bridge course for AP Biology students moving to NEET-UG: maps College Board AP units onto the NCERT-based NEET syllabus, closes India-specific content gaps, and drills NCERT-line-precise answer accuracy."
        pageType="coaching"
        faqs={faqs}
      />
      <PageContent />
    </>
  )
}
