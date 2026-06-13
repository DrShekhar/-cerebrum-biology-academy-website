import { Metadata } from 'next'
import { BestVerticalLanding, type BestVerticalConfig } from '@/components/seo/BestVerticalLanding'

export const metadata: Metadata = {
  title: 'NEET Exam Centres Abroad 2026 | 14 Overseas NTA Centres + Travel Guide',
  description:
    'NEET-UG exam centres outside India — 14 NTA-designated overseas centres in Dubai, Sharjah, Abu Dhabi, Doha, Kuwait City, Riyadh, Muscat, Manama, Singapore, Bangkok, Kuala Lumpur, Lagos, Colombo and Kathmandu. Travel logistics, registration timeline, NRI guidance.',
  keywords: [
    'neet exam centres abroad',
    'neet exam centre outside india',
    'neet overseas exam centres',
    'neet exam centre dubai',
    'neet exam centre uae',
    'neet exam centre singapore',
    'neet exam centre kuala lumpur',
    'neet exam centre riyadh saudi arabia',
    'neet exam centre kathmandu nepal',
    'neet exam centre bangkok thailand',
    'neet exam centre lagos nigeria',
    'neet exam centre colombo sri lanka',
    'nta neet international exam centres',
    'where to take neet abroad',
  ],
  openGraph: {
    title: 'NEET Exam Centres Abroad | 14 Overseas NTA Centres',
    description:
      '14 NTA-designated NEET exam centres outside India. Complete travel + registration guide.',
    url: 'https://cerebrumbiologyacademy.com/neet-exam-centres-abroad',
    type: 'website',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/neet-exam-centres-abroad',
  },

  twitter: {
    card: 'summary_large_image' as const,
    title: 'NEET Exam Centres Abroad 2026 | 14 Overseas NTA Centres + Travel Guide',
    description:
      'NEET-UG exam centres outside India — 14 NTA-designated overseas centres in Dubai, Sharjah, Abu Dhabi, Doha, Kuwait City, Riyadh, Muscat, Manama, Singapore, Bangkok, Kuala Lumpur, Lagos, Colombo and...',
  },
}

const config: BestVerticalConfig = {
  slug: 'neet-exam-centres-abroad',
  headline: 'NEET Exam Centres Abroad 2026',
  ribbon: '14 NTA-Designated Overseas Centres · Travel + Registration Guide',
  subheadline: 'The complete map of where NRI / overseas candidates sit NEET-UG.',
  intro:
    'There are 14 NTA-designated NEET-UG overseas exam centres. Choosing the right one matters — registration capacity is limited at popular centres (Dubai, Singapore) and travel logistics differ. This page documents all 14 centres with registration windows, travel notes, and which is closest from each major NRI hub.',
  clusterSummary:
    'Middle East: Dubai, Sharjah, Abu Dhabi, Doha, Kuwait City, Riyadh, Muscat, Manama · Asia-Pacific: Singapore, Bangkok, Kuala Lumpur, Kathmandu · Africa + South Asia: Lagos, Colombo',
  credentials: [
    { label: '14 NTA Centres Globally' },
    { label: 'Limited Capacity per Centre' },
    { label: 'February Registration Window' },
    { label: 'May Exam Date' },
    { label: 'Same NEET Paper Worldwide' },
    { label: 'NTA Travel Coordination' },
    { label: 'Centre Choice in Registration' },
    { label: 'Cerebrum Travel Guidance' },
  ],
  pages: [
    {
      title: 'NEET Coaching for NRI USA',
      href: '/neet-coaching-nri-usa',
      note: 'Fly to Dubai typically',
    },
    {
      title: 'NEET Coaching for NRI UAE',
      href: '/neet-coaching-nri-uae',
      note: 'Dubai / Sharjah / Abu Dhabi',
    },
    {
      title: 'NEET Coaching for NRI Canada',
      href: '/neet-coaching-nri-canada',
      note: 'Fly to Dubai or India',
    },
    {
      title: 'NEET Coaching for NRI UK',
      href: '/neet-coaching-nri-uk',
      note: 'Fly to Dubai typically',
    },
    {
      title: 'NEET Coaching for NRI Australia',
      href: '/neet-coaching-nri-australia',
      note: 'Singapore / KL / Bangkok',
    },
    {
      title: 'NEET Coaching for NRI Saudi',
      href: '/neet-coaching-nri-saudi-arabia',
      note: 'Riyadh centre',
    },
    { title: 'NEET Coaching for NRI Qatar', href: '/neet-coaching-nri-qatar', note: 'Doha centre' },
    { title: 'NEET Coaching for NRI Oman', href: '/neet-coaching-nri-oman', note: 'Muscat centre' },
    {
      title: 'NEET Coaching for NRI Kuwait',
      href: '/neet-coaching-nri-kuwait',
      note: 'Kuwait City centre',
    },
    {
      title: 'NEET Coaching for NRI Bahrain',
      href: '/neet-coaching-nri-bahrain',
      note: 'Manama centre',
    },
    {
      title: 'NEET Coaching for NRI Singapore',
      href: '/neet-coaching-nri-singapore',
      note: 'Singapore centre',
    },
    {
      title: 'NEET Coaching for NRI Malaysia',
      href: '/neet-coaching-nri-malaysia',
      note: 'KL centre',
    },
    {
      title: 'NEET Coaching for NRI Nepal',
      href: '/neet-coaching-nri-nepal',
      note: 'Kathmandu centre',
    },
    { title: 'NRI Quota MBBS', href: '/nri-quota-mbbs' },
  ],
  pricing: [
    {
      tier: 'NEET Coaching (Online for NRI)',
      price: 'USD-based',
      description:
        "Cerebrum's NEET NRI annual programmes ($300–$500/month range). Includes exam-centre selection guidance + travel logistics support.",
    },
    {
      tier: 'Travel Support',
      price: 'Included',
      description:
        'Coaching includes exam-city selection assistance + travel coordination for enrolled students. We do NOT book flights / hotels.',
    },
    {
      tier: 'NRI Quota Counselling',
      price: 'Included',
      description:
        'Post-NEET admission guidance to NRI quota MBBS seats at deemed + state-private medical colleges.',
    },
  ],
  whyBest: [
    {
      title: 'Middle East (8 Centres) — Most Popular for NRI',
      description:
        'Dubai, Sharjah, Abu Dhabi (UAE) — most popular collectively. Doha (Qatar), Kuwait City (Kuwait), Riyadh (Saudi Arabia), Muscat (Oman), Manama (Bahrain) — cover the entire GCC. USA / UK / Europe-based NRIs typically fly to Dubai (largest capacity + best flight connectivity).',
    },
    {
      title: 'Asia-Pacific (4 Centres) — Australia / South-East Asia',
      description:
        'Singapore — premium centre, excellent infrastructure. Kuala Lumpur (Malaysia) — popular for Malaysian-Indian + Australian students. Bangkok (Thailand) — alternative for Australia / Asia-Pacific candidates. Kathmandu (Nepal) — primarily for Nepali-Indian + Sikkim / North-East-based candidates.',
    },
    {
      title: 'Africa + South Asia (2 Centres) — Lagos and Colombo',
      description:
        'Lagos (Nigeria) — main centre for African-Indian + Indian-diaspora students in West Africa. Colombo (Sri Lanka) — primarily for Sri Lankan + South-Indian candidates with family ties.',
    },
    {
      title: 'Registration Window: February (Limited Capacity)',
      description:
        'NEET-UG overseas centres typically have limited capacity — 1,000–3,000 candidates per centre. Registration opens in February (along with India-domestic registration) and closes when capacity fills. Dubai and Singapore typically fill first; book on Day 1.',
    },
    {
      title: 'Same NEET Paper Worldwide',
      description:
        'NEET-UG is the same paper administered simultaneously at all 14 overseas centres + India domestic centres. No paper variation, no different syllabus. The choice is purely about travel logistics and family proximity.',
    },
    {
      title: 'Cerebrum Travel-Coordination Guidance',
      description:
        "Enrolled Cerebrum NRI students get exam-centre selection guidance, registration day support, and travel-coordination tips. We don't book flights / hotels, but we ensure no candidate misses the registration window.",
    },
  ],
  testimonials: [
    {
      name: 'Sara Khan (USA, Houston)',
      score: 'NEET 612/720',
      college: 'KMC Manipal',
      quote:
        "I flew from Houston to Dubai for NEET — Cerebrum's pre-departure briefing made it stress-free. Dubai was the right call vs flying back to India.",
    },
    {
      name: 'Arjun Patel (Canada, Toronto)',
      score: 'NEET 598/720',
      college: 'Christian Medical College',
      quote:
        'I considered Singapore vs Dubai. Cerebrum recommended Dubai — better flight connectivity from Toronto and registration capacity. Worked.',
    },
    {
      name: 'Aisha Reddy (Singapore)',
      score: 'NEET 645/720',
      college: 'KMC Manipal',
      quote:
        'Singapore centre is excellent — premium infrastructure, easy logistics. Local Cerebrum batch + Singapore centre = ideal NRI path.',
    },
  ],
  faqs: [
    {
      question: 'How many NEET exam centres are outside India?',
      answer:
        'There are 14 NTA-designated overseas NEET-UG exam centres: Dubai, Sharjah, Abu Dhabi (UAE), Doha (Qatar), Kuwait City (Kuwait), Riyadh (Saudi Arabia), Muscat (Oman), Manama (Bahrain), Singapore, Bangkok (Thailand), Kuala Lumpur (Malaysia), Lagos (Nigeria), Colombo (Sri Lanka) and Kathmandu (Nepal).',
    },
    {
      question: 'Which NEET exam centre should USA-based students choose?',
      answer:
        'Most USA-based NRI students fly to Dubai (largest capacity, best Middle East flight connectivity from NYC/Houston/Chicago/Bay Area). Some choose Singapore (better for Bay Area/West Coast students). Both work — the paper is identical. Avoid flying back to India unless you have family logistics there.',
    },
    {
      question: 'Which NEET exam centre should UAE-based students choose?',
      answer:
        'Dubai, Sharjah and Abu Dhabi are all available. Pick based on proximity: Dubai/Sharjah for residents in Dubai/Sharjah/Ajman/RAK, Abu Dhabi for residents in Abu Dhabi/Al Ain. All three are identical from an exam-quality perspective.',
    },
    {
      question: 'When does NEET overseas centre registration open?',
      answer:
        'NEET-UG registration typically opens in February (along with India-domestic registration) and closes in March or when overseas centre capacity fills. The exam is held in May. Dubai and Singapore typically fill within 7–10 days of registration opening — book on Day 1 to secure your preferred centre.',
    },
    {
      question: 'Is the NEET paper different at overseas centres?',
      answer:
        'No. NEET-UG is the same single paper administered simultaneously at all 14 overseas centres + India domestic centres. Same syllabus, same questions, same difficulty. The choice of centre is purely about travel logistics and family proximity.',
    },
    {
      question: 'Can I change my NEET exam centre after registration?',
      answer:
        "No — once you select an overseas centre during NEET registration, you cannot change it. Make the choice carefully. Cerebrum's NRI students get pre-registration guidance on centre selection to avoid this issue.",
    },
    {
      question: 'Which is the closest NEET centre from Australia?',
      answer:
        'Singapore (most popular for Sydney/Melbourne/Brisbane), Kuala Lumpur (next best, often cheaper flights) or Bangkok (alternative). Perth students sometimes choose Singapore (closest by flight time). Avoid flying back to India unless you have family logistics.',
    },
    {
      question: 'Which is the closest NEET centre from UK / Europe?',
      answer:
        'Dubai (UAE) is the most popular choice for UK / Europe-based NRI students — direct flights from London/Manchester/Birmingham + Manama/Doha as alternatives. Some students fly back to India directly, but Dubai is typically logistically simpler.',
    },
    {
      question: 'Does Cerebrum help with NEET exam-centre travel?',
      answer:
        'Yes — Cerebrum provides exam-centre selection guidance and pre-departure briefing for enrolled NRI students. We do NOT book flights or hotels (handled by family or travel agents). We help with: which centre to choose, registration timeline, document requirements at the centre, and last-mile logistics.',
    },
  ],
  knowsAbout: [
    'NEET Exam Centres Abroad',
    'NTA Overseas NEET Centres',
    'NEET Dubai Exam Centre',
    'NEET Singapore Exam Centre',
    'NEET Riyadh Exam Centre',
    'NEET Kathmandu Exam Centre',
    'NEET Bangkok Exam Centre',
    'NEET Kuala Lumpur Exam Centre',
    'NEET Manama Exam Centre',
    'NEET Lagos Exam Centre',
    'NEET Colombo Exam Centre',
    'NRI NEET Registration',
    'NEET Travel for NRI Students',
  ],
  whatsappMessage:
    'Hi! I want guidance on NEET exam centres abroad (which centre to choose, registration timeline). Please share details.',
}

export default function NEETExamCentresAbroadPage() {
  return <BestVerticalLanding config={config} />
}
