import { Metadata } from 'next'
import NEETFoundationClass9GhaziabadContent from './NEETFoundationClass9GhaziabadContent'

const ghaziabadAddress = 'B-45, Sector 62, Noida, UP 201301 (20-25 min via Blue Line Metro from Vaishali/Kaushambi Ghaziabad)'

export const metadata: Metadata = {
  title: 'NEET Foundation Class 9 in Ghaziabad | Early NEET Preparation',
  description:
    'Start NEET preparation from Class 9 in Ghaziabad. 4-year head start, NCERT foundation, board + NEET dual prep. Expert faculty at Sector 62 Noida center. Book free demo.',
  keywords: [
    'neet foundation class 9 ghaziabad',
    'class 9 neet preparation ghaziabad',
    'early neet coaching ghaziabad',
    'neet foundation course class 9 ghaziabad',
    'class 9 biology for neet ghaziabad',
    'neet preparation from class 9 ghaziabad',
    '4 year neet preparation ghaziabad',
    'foundation neet biology class 9 ghaziabad',
  ],
  openGraph: {
    title: 'NEET Foundation Class 9 in Ghaziabad | 4-Year Head Start',
    description:
      'Start your NEET journey from Class 9 in Ghaziabad. Build strong foundation with our expert faculty.',
    url: 'https://cerebrumbiologyacademy.com/neet-foundation-class-9-ghaziabad',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/neet-foundation-class-9-ghaziabad',
  },
}

const faqs = [
  {
    question: 'Why should I start NEET preparation from Class 9 in Ghaziabad?',
    answer:
      'Starting in Class 9 gives you a 4-year head start. You can build strong fundamentals, cover syllabus without rushing, reduce stress in Class 11-12, and have more time for revision and practice. Ghaziabad students who start early consistently score 50-100 marks higher. Our center at Sector 62 Noida is easily accessible via Blue Line Metro from Vaishali and Kaushambi.',
  },
  {
    question: 'What is covered in NEET Foundation Class 9?',
    answer:
      'We cover Class 9 NCERT Biology thoroughly while introducing NEET-relevant concepts. Topics include Cell Biology, Tissues, Diversity in Living Organisms, and basic Life Processes. We also build scientific thinking and problem-solving skills.',
  },
  {
    question: 'Will this affect my board exam preparation?',
    answer:
      'No, our foundation course is designed for dual preparation. Class 9 biology has 100% overlap with NEET basics. We ensure you excel in school exams while building NEET foundation simultaneously.',
  },
  {
    question: 'What is the fee structure?',
    answer:
      'Class IX Foundation (NEET) fees range from ₹45,000 to ₹90,000/year depending on the tier: Pursuit (₹45,000, 30-40 students), Ascent (₹60,000, 16-18 students), or Pinnacle (₹90,000, 10-12 students with personal mentorship from Dr. Shekhar).',
  },
  {
    question: 'What is the batch size and timing?',
    answer:
      'Batch sizes vary by tier: Pinnacle (10-12 students), Ascent (16-18 students), Pursuit (30-40 students). Weekend batches (Sat-Sun) and weekday evening batches are available to accommodate school schedules of Ghaziabad students.',
  },
  {
    question: 'How is this different from regular tuition?',
    answer:
      'Unlike regular tuition that focuses only on board exams, our foundation course builds conceptual depth required for NEET. We use NCERT as base but go beyond with application-based learning and early introduction to MCQ patterns.',
  },
  {
    question: 'Where is the center located and how do Ghaziabad students reach?',
    answer: `Our center is at ${ghaziabadAddress}. Ghaziabad students from Indirapuram, Vaishali, Kaushambi, Raj Nagar Extension, and Vasundhara can take the Blue Line Metro to Sector 62 station. The center is 5 min walk from the metro station.`,
  },
]

export default function NEETFoundationClass9GhaziabadPage() {
  const courseSchema = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: 'NEET Foundation Class 9 - Ghaziabad',
    description:
      'Early NEET preparation program for Class 9 students from Ghaziabad. 4-year head start with strong conceptual foundation.',
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
    educationalLevel: 'Class 9',
    teaches: [
      'Cell Biology',
      'Tissues',
      'Diversity in Living Organisms',
      'Life Processes Basics',
      'Scientific Methodology',
    ],
    timeRequired: 'P1Y',
    hasCourseInstance: {
      '@type': 'CourseInstance',
      courseMode: 'Blended',
      courseWorkload: 'Weekend classes + Weekday doubt sessions',
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
        name: 'Biology Classes Ghaziabad',
        item: 'https://cerebrumbiologyacademy.com/biology-classes-ghaziabad',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'NEET Foundation Class 9',
        item: 'https://cerebrumbiologyacademy.com/neet-foundation-class-9-ghaziabad',
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
      <NEETFoundationClass9GhaziabadContent faqs={faqs} />
    </>
  )
}
