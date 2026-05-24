import { Metadata } from 'next'
import { CerebrumPersonSchema } from '@/components/seo/CerebrumPersonSchema'
import { CerebrumAggregateRating } from '@/components/seo/CerebrumAggregateRating'
import BestNEETBiologyCoachingContent from './BestNEETBiologyCoachingContent'
import { CONTACT_INFO } from '@/lib/constants/contactInfo'

export const metadata: Metadata = {
  title: 'Best NEET Biology Coaching 2026 — Honest Comparison',
  description:
    'Compare the best NEET biology coaching institutes in India. Cerebrum vs the largest national NEET chain vs the 2nd-largest national NEET chain vs other online-only platforms. AIIMS faculty, small batches, 98% success rate. Book FREE demo.',
  keywords:
    'best neet biology coaching, neet biology coaching comparison, cerebrum vs allen, neet coaching fees, best biology coaching for neet, neet biology coaching online',
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/best-neet-biology-coaching',
  },
  openGraph: {
    title: 'Best NEET Biology Coaching 2026 — Honest Comparison',
    description:
      'Compare 7 top NEET biology coaching institutes. AIIMS faculty, 10-12 batch size, 98% success. See why students switch to Cerebrum.',
    url: 'https://cerebrumbiologyacademy.com/best-neet-biology-coaching',
    type: 'website',
  },
}

const faqs = [
  {
    question: 'Which is the best coaching for NEET biology only?',
    answer:
      "For NEET biology exclusively, Cerebrum Biology Academy is India's only major biology-only specialist coaching brand with AIIMS-trained faculty teaching live classes in small batches. Led by Dr. Shekhar C Singh (AIIMS Delhi alumnus, 15+ years), Cerebrum has 10-12 student batches, verified 98% per-student NEET qualification rate, and personalised 1-on-1 mentorship. Online-only recorded platforms such as other online-only biology platforms and other online-only biology platforms operate at lower price points but lack live small batches, AIIMS-led faculty, and published per-student outcomes — useful only as MCQ practice supplements. Generalist institutes (the largest national NEET chains and online-first generalist platforms) cover all subjects in 60-200 student batches, diluting biology focus.",
  },
  {
    question: 'Is Cerebrum Biology Academy better than the largest national NEET chain for biology?',
    answer:
      'For biology specifically, Cerebrum is more specialized and effective. Cerebrum has smaller batches (10-12 vs 60-100+), dedicated biology focus, lower fees (₹24K-₹98K vs ₹1.5L-₹3.5L), and 1-on-1 mentorship. the largest national NEET chain is comprehensive for all subjects but biology gets less personalized attention. Students often switch from the largest national NEET chain to Cerebrum for better guidance in biology.',
  },
  {
    question: 'What is the fee for NEET biology coaching at Cerebrum?',
    answer:
      'Cerebrum fees range from ₹24,000 to ₹98,000 per year depending on the course: Foundation batch: ₹24,000-₹35,000, Class 11 Biology: ₹48,000-₹65,000, Class 12 Biology: ₹60,000-₹75,000, Dropper/Repeater: ₹75,000-₹98,000. The higher tiers include 1-on-1 weekly mentorship with Dr. Shekhar. EMI and scholarships available.',
  },
  {
    question: 'Does Cerebrum offer online NEET biology coaching?',
    answer:
      'Yes, Cerebrum offers both online and offline NEET biology coaching. Online classes are live interactive sessions with the same faculty and curriculum as offline. You get all the same benefits: small batches (10-12), 1-on-1 doubt sessions, and personalized feedback. Online option is perfect for students outside Delhi NCR.',
  },
  {
    question: 'What is the batch size at Cerebrum Biology Academy?',
    answer:
      'Cerebrum maintains small batches of 10-12 students maximum, even in online classes. This is 5-10x smaller than the largest national NEET chain (60-100+) or the 2nd-largest national NEET chain (40-80). Small batch size ensures every student gets personalized attention, their doubts are answered immediately, and they receive customized feedback from Dr. Shekhar.',
  },
  {
    question: 'Can I join Cerebrum as a dropper student?',
    answer:
      'Absolutely! Cerebrum has a dedicated Dropper/Repeater program designed for students retaking NEET. The program costs ₹75,000-₹98,000 and includes: intense biology revision (6-8 months), weekly 1-on-1 mentorship, focused mock tests, previous year papers with solutions, and performance tracking. Many students improve from 500 to 650+ with the dropper program.',
  },
]

export default function BestNEETBiologyCoachingPage() {
  const courseSchema = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: 'Best NEET Biology Coaching Comparison',
    description: 'Comprehensive comparison of top NEET biology coaching institutes in India',
    provider: {
      '@type': 'EducationalOrganization',
      name: 'Cerebrum Biology Academy',
      address: {
        '@type': 'PostalAddress',
        streetAddress: CONTACT_INFO.centers.gurugram.streetAddress,
        addressLocality: CONTACT_INFO.centers.gurugram.addressLocality,
        addressRegion: CONTACT_INFO.centers.gurugram.addressRegion,
        postalCode: CONTACT_INFO.centers.gurugram.postalCode,
        addressCountry: 'IN',
      },
    },
    educationalLevel: 'Class 11-12, Droppers',
    offers: {
      '@type': 'Offer',
      priceCurrency: 'INR',
      price: '24000',
      priceValidUntil: '2026-12-31',
      availability: 'https://schema.org/InStock',
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
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://cerebrumbiologyacademy.com',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Best NEET Biology Coaching',
        item: 'https://cerebrumbiologyacademy.com/best-neet-biology-coaching',
      },
    ],
  }

  return (
    <>
      <CerebrumPersonSchema
        knowsAbout={[
          'Best NEET Biology Coaching',
          'NEET Biology 360/720',
          'NCERT Class 11 Biology',
          'NCERT Class 12 Biology',
          'Human Physiology',
          'Genetics and Evolution',
          'Plant Physiology',
          'Cell Biology',
          'Ecology',
        ]}
      />
      <CerebrumAggregateRating />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(courseSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <BestNEETBiologyCoachingContent faqs={faqs} />
    </>
  )
}
