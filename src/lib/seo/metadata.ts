export interface PageMetadata {
  title: string
  description: string
  keywords: string[]
  ogImage?: string
  canonical?: string
  noindex?: boolean
}

export const seoConfig = {
  siteName: 'Cerebrum Biology Academy',
  siteUrl: 'https://www.cerebrumbiologyacademy.com',
  defaultTitle:
    'Best NEET Biology Coaching in Delhi NCR | Laxmi Nagar, Dwarka, Noida | Cerebrum Academy',
  defaultDescription:
    'Top NEET biology coaching in Delhi NCR - Laxmi Nagar, Dwarka, Noida, Gurgaon. Expert AIIMS faculty, 98% success rate, small batches. Best medical entrance preparation. Book free demo!',
  defaultOgImage: '/images/og-default.jpg',
  twitterHandle: '@CerebrumBio',
  locale: 'en_IN',
  type: 'website',
}

export const pageMetadata: Record<string, PageMetadata> = {
  home: {
    title:
      'Best NEET Biology Coaching in Delhi NCR | Laxmi Nagar, Dwarka, Noida, Gurgaon | Cerebrum Academy',
    description:
      'Top NEET coaching in Delhi NCR - Laxmi Nagar, Dwarka, Noida, Gurgaon, Rohini, Pitampura. Expert AIIMS faculty, 98% success rate, small batches. Best biology coaching for Class 11, 12 & droppers. Book free demo!',
    keywords: [
      'NEET coaching in Delhi',
      'NEET coaching Delhi NCR',
      'Best NEET coaching Delhi',
      'Biology coaching Delhi NCR',
      'NEET preparation classes Delhi',
      'Medical entrance coaching Delhi',
      'NEET coaching Laxmi Nagar',
      'NEET coaching Dwarka',
      'NEET coaching Noida',
      'NEET coaching Gurgaon',
      'NEET coaching Rohini',
      'NEET coaching Pitampura',
      'Biology coaching Laxmi Nagar',
      'Biology coaching Dwarka',
      'Biology tuition Delhi',
      'NEET 2025 coaching Delhi',
      'NEET 2026 coaching Delhi',
      'Online NEET coaching Delhi',
      'Best biology teacher NEET Delhi',
      'Affordable NEET coaching Delhi NCR',
      'NEET dropper batch Delhi',
      'Small batch NEET coaching',
      'Class 11 biology coaching Delhi',
      'Class 12 biology coaching Delhi',
      'NEET mock tests Delhi',
      'NEET crash course Delhi',
      'Biology coaching institute Delhi',
      'NEET biology classes Delhi NCR',
      'Medical coaching Delhi',
      'NEET preparation Noida',
      'NEET preparation Gurgaon',
      'NEET coaching Faridabad',
      'NEET coaching Ghaziabad',
      'NEET coaching Greater Noida',
      'Biology classes East Delhi',
      'Biology classes West Delhi',
      'NEET coaching near me Delhi',
      'Best NEET institute Delhi NCR',
      'Top NEET coaching Delhi',
      'NEET biology expert Delhi',
      'Personalized NEET coaching Delhi',
    ],
    canonical: '/',
  },
  aiEducation: {
    title: 'AI-Powered NEET Biology Learning | Personalized Study Plans',
    description:
      'Experience AI-powered personalized NEET biology learning. Adaptive assessments, instant doubt resolution, topic-wise analysis. Try free demo now!',
    keywords: [
      'AI biology learning',
      'personalized NEET preparation',
      'adaptive learning',
      'AI tutor',
      'intelligent assessment',
      'smart learning platform',
      'AI-powered education',
    ],
    canonical: '/ai-education-demo',
  },
  courses: {
    title: 'NEET Biology Courses Delhi NCR | Class 11, 12, Dropper Batches | Cerebrum Academy',
    description:
      'Complete NEET biology courses in Delhi NCR - Class 11, Class 12, Dropper batches. Expert AIIMS faculty in Laxmi Nagar, Dwarka, Noida, Gurgaon. Best NEET preparation with small batches. Enroll now!',
    keywords: [
      'NEET biology courses Delhi',
      'NEET biology syllabus',
      'biology course Delhi NCR',
      'NEET curriculum',
      'Class 11 NEET course Delhi',
      'Class 12 NEET course Delhi',
      'NEET dropper course Delhi',
      'biology chapters NEET',
      'botany course Delhi',
      'zoology course Delhi',
      'NEET class 11 biology Delhi',
      'NEET class 12 biology Delhi',
      'NEET crash course Delhi NCR',
      'NEET intensive course Delhi',
      'Biology coaching classes Delhi',
    ],
    canonical: '/courses',
  },
  about: {
    title: 'About Us - Best NEET Biology Coaching Institute Delhi NCR | Cerebrum Academy',
    description:
      'About Cerebrum Biology Academy - 10+ years of NEET coaching excellence in Delhi NCR. Expert AIIMS faculty, 98% success rate, 10,000+ students from Laxmi Nagar, Dwarka, Noida, Gurgaon.',
    keywords: [
      'about cerebrum academy',
      'NEET coaching institute Delhi',
      'biology faculty Delhi NCR',
      'NEET teachers Delhi',
      'best coaching center Delhi',
      'NEET institute history',
      'top NEET coaching Delhi NCR',
      'AIIMS faculty Delhi',
    ],
    canonical: '/about',
  },
  contact: {
    title: 'Contact Us - NEET Coaching in Delhi NCR | Cerebrum Academy Admissions',
    description:
      'Contact Cerebrum Biology Academy for NEET coaching admissions in Delhi NCR. Centers in Laxmi Nagar, Dwarka, Noida, Gurgaon. Call for free demo class. 24/7 support.',
    keywords: [
      'contact NEET coaching Delhi',
      'NEET admission Delhi NCR',
      'biology coaching inquiry',
      'NEET course details Delhi',
      'coaching center address Delhi',
      'NEET institute contact',
      'book demo class Delhi',
      'NEET coaching phone number',
    ],
    canonical: '/contact',
  },
  enrollment: {
    title: 'Enroll Now - NEET Biology Coaching Delhi NCR | Cerebrum Academy Admission',
    description:
      'Enroll in best NEET biology coaching in Delhi NCR. Affordable fees, EMI options. Join students from Laxmi Nagar, Dwarka, Noida, Gurgaon. Limited seats for 2025-26 batch!',
    keywords: [
      'NEET enrollment Delhi',
      'biology course admission Delhi NCR',
      'NEET coaching registration Delhi',
      'NEET course fees Delhi',
      'admission process NEET coaching',
      'enroll NEET Delhi',
      'join NEET coaching Delhi NCR',
      'NEET batch admission',
    ],
    canonical: '/enrollment',
  },
  pricing: {
    title: 'NEET Coaching Fees Delhi NCR | Affordable Biology Coaching | Cerebrum Academy',
    description:
      'Affordable NEET coaching fees in Delhi NCR. Compare pricing with Laxmi Nagar, Dwarka, Noida institutes. EMI options available. Best value NEET preparation.',
    keywords: [
      'NEET course fees Delhi',
      'biology coaching cost Delhi NCR',
      'affordable NEET coaching Delhi',
      'NEET coaching fees comparison',
      'cheap NEET coaching Delhi',
      'EMI NEET course Delhi',
      'NEET fees Laxmi Nagar',
      'NEET fees Dwarka',
    ],
    canonical: '/pricing',
  },
  resources: {
    title: 'Free NEET Biology Study Materials Delhi NCR | Notes, PDFs | Cerebrum Academy',
    description:
      'Free NEET biology study materials for Delhi NCR students. Download notes, PDFs, practice questions. Best free resources from top NEET coaching in Laxmi Nagar, Dwarka.',
    keywords: [
      'NEET study material Delhi',
      'biology notes free download',
      'free NEET resources Delhi NCR',
      'NEET practice questions Delhi',
      'NEET PDF notes',
      'biology study guides Delhi',
      'free NEET material',
      'NEET preparation resources Delhi',
    ],
    canonical: '/resources',
  },
  mockTests: {
    title: 'NEET Biology Mock Tests Delhi NCR | Free Practice Test Series | Cerebrum Academy',
    description:
      'Take NEET biology mock tests in Delhi NCR pattern. 5000+ questions, instant results, detailed analysis. Best mock test series from top NEET coaching Delhi.',
    keywords: [
      'NEET mock tests Delhi',
      'biology test series Delhi NCR',
      'NEET practice tests Delhi',
      'NEET mock exam Delhi',
      'online NEET test Delhi',
      'free mock test NEET Delhi',
      'NEET question paper practice',
      'NEET test series 2025 Delhi',
    ],
    canonical: '/mock-tests',
  },
  testimonials: {
    title: 'NEET Toppers Delhi NCR | Student Success Stories | Cerebrum Academy Results',
    description:
      'NEET toppers from Delhi NCR - Laxmi Nagar, Dwarka, Noida, Gurgaon students. 98% success rate. Read real testimonials from AIIMS, JIPMER selections.',
    keywords: [
      'NEET success stories Delhi',
      'NEET toppers Delhi NCR',
      'student testimonials Delhi',
      'NEET results Delhi',
      'AIIMS selections Delhi',
      'NEET coaching results Delhi NCR',
      'student reviews Delhi',
      'NEET success rate Delhi',
    ],
    canonical: '/testimonials',
  },
  faculty: {
    title: 'Expert NEET Biology Faculty Delhi NCR | AIIMS Qualified Teachers | Cerebrum Academy',
    description:
      'Meet our expert NEET biology faculty in Delhi NCR. AIIMS qualified, 10+ years experience, teaching in Laxmi Nagar, Dwarka, Noida, Gurgaon centers.',
    keywords: [
      'NEET faculty Delhi',
      'biology teachers Delhi NCR',
      'AIIMS faculty Delhi',
      'best NEET teachers Delhi',
      'expert biology teachers Delhi',
      'NEET coaching faculty Delhi NCR',
      'top biology faculty Delhi',
      'experienced NEET teachers Delhi',
    ],
    canonical: '/faculty',
  },
  class9Foundation: {
    title: 'Class 9 Biology Foundation Course Delhi NCR | NEET 2028-2029 | Cerebrum Academy',
    description:
      'Class 9 NEET foundation course in Delhi NCR. Start early for 65% higher success. Best foundation coaching in Laxmi Nagar, Dwarka, Noida, Gurgaon. 4-year NEET preparation.',
    keywords: [
      'class 9 biology foundation Delhi',
      'early NEET preparation Delhi NCR',
      'foundation biology course Delhi',
      'class 9 NEET coaching Delhi',
      'biology coaching class 9 Delhi',
      'NEET 2028 preparation Delhi',
      'class 9 medical entrance Delhi NCR',
      'early bird NEET Delhi',
      'foundation course Delhi NCR',
      'class 9 biology tuition Delhi',
    ],
    canonical: '/class-9-foundation',
  },
  class10Foundation: {
    title: 'Class 10 Biology Foundation Course Delhi NCR | NEET 2027 | Cerebrum Academy',
    description:
      'Class 10 NEET foundation course in Delhi NCR. Perfect head start for NEET 2027. Best coaching in Laxmi Nagar, Dwarka, Noida, Gurgaon. Board + NEET preparation.',
    keywords: [
      'class 10 NEET preparation Delhi',
      'class 10 biology foundation Delhi NCR',
      'NEET foundation batch Delhi',
      'class 10 biology coaching Delhi',
      'early bird NEET Delhi',
      'class 10 NEET course Delhi NCR',
      'board exam NEET prep Delhi',
      'class 10 medical entrance Delhi',
      'NEET 2027 preparation Delhi',
      'foundation batch Delhi NCR',
    ],
    canonical: '/class-10-foundation',
  },
  earlyNeetPrep: {
    title: 'Why Start NEET Preparation from Class 9-10? | Early NEET Coaching',
    description:
      'Discover why early NEET preparation from Class 9-10 gives 65% higher success rate. Research-backed benefits, parent FAQs, program comparison. Smart parents choose foundation courses.',
    keywords: [
      'early NEET preparation',
      'when to start NEET preparation',
      'foundation course for NEET',
      'early bird NEET coaching',
      'NEET from class 9',
      'NEET preparation class 9 10',
      'early start NEET',
      'NEET foundation program',
      'best time to start NEET',
      'early NEET coaching benefits',
    ],
    canonical: '/early-neet-preparation',
  },
  neetFoundation: {
    title: 'NEET Foundation Course - Class 9 & 10 Biology Foundation Program',
    description:
      'Comprehensive NEET biology foundation program for Class 9-10. Compare programs, choose your timeline, 65% higher success rate. Expert faculty, age-appropriate teaching, research-backed approach.',
    keywords: [
      'NEET foundation course',
      'biology foundation program',
      'foundation batch for NEET',
      'early NEET coaching',
      'foundation classes NEET',
      'NEET preparation foundation',
      'class 9 10 NEET foundation',
      'medical entrance foundation',
      'biology foundation coaching',
      'NEET early preparation course',
    ],
    canonical: '/neet-foundation-course',
  },
  kotaVsOnline: {
    title: 'Kota vs Online NEET Coaching 2025: Complete Comparison | Save ₹2.5L',
    description:
      'Kota vs Online NEET coaching comparison: 85% vs 60% success rate, ₹2.5L+ savings, stay home safely. Data-driven analysis every parent must read before choosing. Mental health matters.',
    keywords: [
      'kota vs online coaching',
      'kota online comparison',
      'NEET coaching kota vs online',
      'online coaching better than kota',
      'kota coaching cost vs online',
      'kota alternative',
      'online NEET coaching vs kota',
      'stay home beat kota',
      'kota vs home coaching',
      'is online coaching good for NEET',
      'kota coaching fees comparison',
      'online vs offline NEET coaching',
    ],
    canonical: '/compare/kota-vs-online',
  },
  class9VsClass10: {
    title: 'Class 9 vs Class 10: When to Start NEET Preparation? | 65% Higher Success',
    description:
      'Class 9 vs Class 10 NEET preparation start: Research shows 65% higher success rate with Class 9 start. Complete comparison of timeline, stress, results. Make informed decision.',
    keywords: [
      'class 9 vs class 10 neet',
      'when to start NEET preparation',
      'class 9 or class 10 for NEET',
      'best time to start NEET',
      'early NEET preparation class 9 vs 10',
      'neet preparation timeline',
      'class 9 vs 10 foundation',
      'should i start neet from class 9',
      'when to begin NEET coaching',
      'class 9 10 comparison NEET',
      'early start vs late start NEET',
      'NEET preparation age',
    ],
    canonical: '/compare/class-9-vs-class-10-foundation',
  },
  // PAN-INDIA SEO PAGES
  onlineNeetCoachingIndia: {
    title: 'Best Online NEET Coaching in India 2025 | Pan-India Live Classes | Cerebrum Academy',
    description:
      'Best online NEET coaching in India. Live interactive classes, AIIMS trained faculty, 98% success rate. Join students from all states - Rajasthan, UP, Maharashtra, Karnataka, Tamil Nadu, Gujarat, Kerala. Book free demo!',
    keywords: [
      'online neet coaching india',
      'best online neet coaching india',
      'neet online classes india',
      'neet coaching india online',
      'pan india neet coaching',
      'online neet preparation india',
      'neet live classes india',
      'india neet coaching',
      'national neet coaching',
      'online medical coaching india',
      'neet coaching all india',
      'best neet coaching online',
      'neet coaching from home',
      'neet biology online india',
    ],
    canonical: '/online-neet-coaching-india',
  },
  bestNeetCoachingIndia: {
    title:
      'Best NEET Coaching in India 2025 | Top Institutes | 98% Success Rate | Cerebrum Academy',
    description:
      'Best NEET coaching institute in India. Expert AIIMS faculty, 98% success rate, small batches. Compare with Kota, Allen, Aakash. Online + offline classes for Delhi NCR, Kota, Hyderabad, Bangalore, Mumbai. Book free demo!',
    keywords: [
      'best neet coaching india',
      'top neet coaching india',
      'best neet institute india',
      'neet coaching institutes india',
      'top 10 neet coaching india',
      'best biology coaching india',
      'neet coaching india ranking',
      'best neet preparation india',
      'neet 2025 coaching india',
      'neet 2026 coaching india',
      'affordable neet coaching india',
      'neet coaching fees india',
    ],
    canonical: '/best-neet-coaching-india',
  },
  neetBiologyCoachingIndia: {
    title:
      'Best NEET Biology Coaching in India | Expert Faculty | 360/360 Toppers | Cerebrum Academy',
    description:
      'Best NEET Biology coaching in India. AIIMS trained faculty, 360/360 Biology toppers, comprehensive study material. Zoology, Botany, Human Physiology expert teaching. Online classes for all Indian states. Enroll now!',
    keywords: [
      'neet biology coaching india',
      'best biology coaching neet india',
      'biology coaching for neet india',
      'neet biology classes india',
      'biology tuition neet india',
      'zoology coaching india',
      'botany coaching india',
      'neet biology online india',
      'biology expert coaching india',
      'neet biology preparation india',
      'biology coaching institute india',
    ],
    canonical: '/neet-biology-coaching-india',
  },
  onlineMedicalCoachingIndia: {
    title: 'Online Medical Entrance Coaching India | NEET, AIIMS, JIPMER | Cerebrum Academy',
    description:
      'Best online medical entrance coaching in India. Prepare for NEET, AIIMS, JIPMER from home. Expert AIIMS trained faculty, 98% success rate. Live classes for students across India. Book free demo today!',
    keywords: [
      'online medical coaching india',
      'medical entrance coaching india',
      'neet medical coaching online',
      'aiims coaching online india',
      'jipmer coaching online',
      'medical entrance online classes',
      'doctor coaching india',
      'mbbs entrance coaching india',
      'medical coaching from home india',
      'best medical coaching online',
    ],
    canonical: '/online-medical-coaching-india',
  },
}

export function generateMetadata(pageKey: string): PageMetadata {
  return (
    pageMetadata[pageKey] || {
      title: seoConfig.defaultTitle,
      description: seoConfig.defaultDescription,
      keywords: [],
      canonical: '/',
    }
  )
}

export function generatePageMetadata(pageKey: string) {
  const meta = generateMetadata(pageKey)

  return {
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: `${seoConfig.siteUrl}${meta.canonical}`,
      siteName: seoConfig.siteName,
      images: [
        {
          url: `${seoConfig.siteUrl}${meta.ogImage || seoConfig.defaultOgImage}`,
          width: 1200,
          height: 630,
          alt: meta.title,
        },
      ],
      locale: seoConfig.locale,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: meta.title,
      description: meta.description,
      site: seoConfig.twitterHandle,
      images: [`${seoConfig.siteUrl}${meta.ogImage || seoConfig.defaultOgImage}`],
    },
    robots: {
      index: !meta.noindex,
      follow: !meta.noindex,
      googleBot: {
        index: !meta.noindex,
        follow: !meta.noindex,
        'max-video-preview': -1,
        'max-image-preview': 'large' as const,
        'max-snippet': -1,
      },
    },
    alternates: {
      canonical: `${seoConfig.siteUrl}${meta.canonical}`,
    },
  }
}
