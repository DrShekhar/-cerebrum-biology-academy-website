import { Metadata } from 'next'
import NEETFoundationClass10GhaziabadContent from './NEETFoundationClass10GhaziabadContent'

const ghaziabadAddress =
  'B-45, Sector 62, Noida, UP 201301 (20-25 min via Blue Line Metro from Vaishali/Kaushambi Ghaziabad)'

export const metadata: Metadata = {
  title: 'NEET Foundation Class 10 in Ghaziabad | 2-Year Head Start',
  description:
    'NEET Foundation for Class 10 students in Ghaziabad. 2-year head start, 40% NEET syllabus overlap with boards. Expert faculty at Sector 62 Noida center, accessible via Blue Line Metro.',
  keywords: [
    'neet foundation class 10 ghaziabad',
    'class 10 neet preparation ghaziabad',
    '2 year neet prep ghaziabad',
    'neet foundation course class 10 ghaziabad',
    'class 10 biology for neet ghaziabad',
    'foundation neet biology class 10 ghaziabad',
  ],
  openGraph: {
    title: 'NEET Foundation Class 10 in Ghaziabad | 2-Year Head Start',
    description: 'Get 2-year head start for NEET from Class 10 in Ghaziabad.',
    url: 'https://cerebrumbiologyacademy.com/neet-foundation-class-10-ghaziabad',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/neet-foundation-class-10-ghaziabad',
  },
}

const faqs = [
  {
    question: 'Why is Class 10 ideal for starting NEET preparation in Ghaziabad?',
    answer:
      'Class 10 is the perfect time as 40% of NEET Biology concepts are introduced here. You get a 2-year head start while the syllabus load is manageable. This builds strong fundamentals for Class 11-12. Ghaziabad students from Indirapuram, Vaishali, and Kaushambi can easily attend via Blue Line Metro to Sector 62 Noida.',
  },
  {
    question: 'What is the overlap between Class 10 and NEET syllabus?',
    answer:
      'About 40% of NEET Biology basics are covered in Class 10 - Life Processes, Control & Coordination, Reproduction, Heredity & Evolution. These form the foundation for Class 11-12 NEET topics.',
  },
  {
    question: 'How does this course help in board exams?',
    answer:
      'Our foundation course ensures you excel in Class 10 boards while building NEET fundamentals. The deeper understanding helps you score higher in both exams.',
  },
  {
    question: 'What is the fee structure?',
    answer:
      'Class X Foundation (NEET) fees range from ₹45,000 to ₹90,000/year depending on the tier: Pursuit (₹45,000, 30-40 students), Ascent (₹60,000-90,000, 16-18 students), or Pinnacle (₹90,000, 10-12 students with personal mentorship from Dr. Shekhar).',
  },
  {
    question: 'Where is the center and how do Ghaziabad students reach?',
    answer: `Located at ${ghaziabadAddress}. Ghaziabad students take the Blue Line Metro from Vaishali or Kaushambi station directly to Sector 62 station (20-25 minutes). The center is 5 min walk from the metro. Serves all Ghaziabad areas: Indirapuram, Vasundhara, Raj Nagar Extension, Crossings Republik.`,
  },
]

export default function NEETFoundationClass10GhaziabadPage() {
  const courseSchema = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: 'NEET Foundation Class 10 - Ghaziabad',
    description: '2-year NEET preparation program for Class 10 students from Ghaziabad',
    provider: {
      '@type': 'EducationalOrganization',
      name: 'Cerebrum Biology Academy',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'B-45, Sector 62',
        addressLocality: 'Noida',
        addressRegion: 'UP',
        postalCode: '201301',
        addressCountry: 'IN',
      },
    },
    educationalLevel: 'Class 10',
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
        name: 'Biology Classes Ghaziabad',
        item: 'https://cerebrumbiologyacademy.com/biology-classes-ghaziabad',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'Foundation Class 10',
        item: 'https://cerebrumbiologyacademy.com/neet-foundation-class-10-ghaziabad',
      },
    ],
  }

  return (
    <>
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
      <NEETFoundationClass10GhaziabadContent faqs={faqs} />
    </>
  )
}
