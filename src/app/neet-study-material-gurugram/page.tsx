import { Metadata } from 'next'
import NEETStudyMaterialContent from './NEETStudyMaterialContent'
import { CONTACT_INFO } from '@/lib/constants/contactInfo'

const gurugramLocation = CONTACT_INFO.location.gurugram

export const metadata: Metadata = {
  title: 'NEET Study Material in Gurugram | Biology Notes, MCQs, Test Papers',
  description:
    'Get comprehensive NEET Biology study material in Gurugram. NCERT-based notes, 5000+ MCQs, chapter-wise tests, PYQ analysis. Free sample available. Download or collect from Sector 51.',
  keywords: [
    'neet study material gurugram',
    'neet biology notes gurgaon',
    'neet study material pdf gurugram',
    'best neet material gurugram',
    'neet biology mcq gurugram',
    'neet practice papers gurugram',
    'ncert notes neet gurugram',
    'neet coaching material gurgaon',
    'biology study material gurugram',
    'neet preparation material gurugram',
  ],
  openGraph: {
    title: 'NEET Study Material in Gurugram | Notes, MCQs & Tests',
    description: 'Comprehensive NEET Biology study material. NCERT-based, 5000+ MCQs, chapter tests.',
    url: 'https://cerebrumbiologyacademy.com/neet-study-material-gurugram',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/neet-study-material-gurugram',
  },
}

const faqs = [
  {
    question: 'What does your NEET study material include?',
    answer:
      'Our comprehensive package includes: NCERT-based theory notes (500+ pages), 5000+ MCQs (chapter-wise), Previous Year Questions (2010-2024 with solutions), 100+ chapter tests, 20 full-length mock tests, quick revision sheets, and diagram banks.',
  },
  {
    question: 'Is the study material NCERT-based?',
    answer:
      'Yes, 100% NCERT-aligned. Every line of NCERT Biology is covered with explanations. We also highlight which NCERT lines have appeared in previous NEET exams. Perfect for students who want to master NCERT for NEET.',
  },
  {
    question: 'Can I buy study material without joining coaching?',
    answer:
      'Yes! Our study material is available separately. Physical material: ₹5,000, Digital (PDF): ₹3,000, Physical + Digital: ₹6,500. Students enrolled in coaching get material included in their fee.',
  },
  {
    question: 'Is there a free sample available?',
    answer:
      'Yes, we provide free sample chapters (Human Physiology and Genetics). You can download PDFs from our website or collect printed samples from our Sector 51 center. This helps you evaluate quality before purchasing.',
  },
  {
    question: 'How do I get the study material?',
    answer:
      'Multiple options: 1) Collect from Sector 51 center, 2) Courier delivery (₹200 extra for Gurugram), 3) Digital download (instant access). Digital material includes the same content in PDF format.',
  },
  {
    question: 'Is the material updated for NEET 2026?',
    answer:
      'Yes, our 2026 edition includes all syllabus changes, updated PYQs till 2024, and new pattern questions. We update material every year based on NTA changes and exam trends.',
  },
  {
    question: 'Do you provide chapter-wise tests with the material?',
    answer:
      'Yes! Each chapter has 50-100 MCQs with detailed solutions. We also provide OMR sheets for practice. Online tests with instant scoring are available for digital purchasers.',
  },
]

export default function NEETStudyMaterialGurugramPage() {
  const productSchema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: 'NEET Biology Study Material - Gurugram Edition 2026',
    description: 'Comprehensive NEET Biology study material with NCERT notes, 5000+ MCQs, PYQs, and mock tests',
    brand: {
      '@type': 'Organization',
      name: 'Cerebrum Biology Academy',
    },
    offers: {
      '@type': 'AggregateOffer',
      lowPrice: '3000',
      highPrice: '6500',
      priceCurrency: 'INR',
      availability: 'https://schema.org/InStock',
      offerCount: '3',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      reviewCount: '342',
    },
  }

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://cerebrumbiologyacademy.com' },
      { '@type': 'ListItem', position: 2, name: 'NEET Coaching Gurugram', item: 'https://cerebrumbiologyacademy.com/neet-coaching-gurugram' },
      { '@type': 'ListItem', position: 3, name: 'Study Material', item: 'https://cerebrumbiologyacademy.com/neet-study-material-gurugram' },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <NEETStudyMaterialContent faqs={faqs} />
    </>
  )
}
