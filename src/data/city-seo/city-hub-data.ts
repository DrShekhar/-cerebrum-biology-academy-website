import type { CityHubData } from './cities/types'

export type { CityHubData }

export const cityHubData: Record<string, CityHubData> = {
  noida: {
    slug: 'noida',
    cityName: 'Noida',
    stateName: 'Uttar Pradesh',
    metaTitle: 'Biology Classes in Noida | Best NEET Biology Coaching | Cerebrum Academy',
    metaDescription:
      'Join the best biology classes in Noida for NEET & Board preparation. AIIMS-trained faculty, 98% success rate. Online & Offline options. Book free demo!',
    heroTitle: 'Best Biology Classes in Noida',
    heroSubtitle:
      'Top-rated NEET biology coaching for Noida students. Learn from AIIMS faculty with proven 98% success rate.',
    hasOfflineCenter: false,
    nearestCenter: {
      name: 'South Delhi Center',
      address: 'Block D, South Extension Part 2, New Delhi',
      distance: '15-20 km from Noida',
    },
    localities: [
      { name: 'Sector 62', url: '/biology-classes-noida/sector-62' },
      { name: 'Sector 18', url: '/biology-classes-noida/sector-18' },
      { name: 'Sector 15', url: '/biology-classes-noida/sector-15' },
      { name: 'Greater Noida', url: '/biology-classes-greater-noida' },
      { name: 'Noida Extension', url: '/biology-classes-noida/noida-extension' },
      { name: 'Sector 50', url: '/biology-classes-noida/sector-50' },
    ],
    relatedCities: [
      { name: 'Delhi', url: '/biology-classes-delhi' },
      { name: 'Ghaziabad', url: '/biology-classes-ghaziabad' },
      { name: 'Greater Noida', url: '/biology-classes-greater-noida' },
      { name: 'Faridabad', url: '/biology-classes-faridabad' },
    ],
    faqs: [
      {
        question: 'Which is the best biology coaching in Noida for NEET?',
        answer:
          'Cerebrum Biology Academy is the top-rated biology coaching for Noida students. While we currently offer online classes for Noida, students can also attend our South Delhi or Rohini centers. Our AIIMS-trained faculty and 98% success rate make us the preferred choice.',
      },
      {
        question: 'Do you have an offline center in Noida?',
        answer:
          'Currently, we offer live online classes for Noida students with the same quality as our offline batches. Our nearest offline center is in South Extension, Delhi (15-20 km from Noida). Many Noida students prefer our hybrid mode.',
      },
      {
        question: 'What is the fee for biology classes for Noida students?',
        answer:
          'Our biology coaching fees for Noida students range from ₹35,000 to ₹60,000 per year for online classes. Offline classes at our Delhi centers are ₹45,000 to ₹75,000. This includes live classes, study material, test series, and doubt support.',
      },
      {
        question: 'How do online biology classes work for Noida students?',
        answer:
          'Our online classes are live and interactive - not recorded videos. You get real-time interaction with faculty, instant doubt resolution, and the same study material as offline students. Classes are scheduled at convenient timings for Noida students.',
      },
    ],
    stats: {
      studentsFromCity: '1,200+',
      successRate: '98%',
      rating: '4.9',
    },
    geoCoordinates: {
      lat: '28.5355',
      lng: '77.3910',
    },
    localContext: {
      nearbyLandmarks: 'Serving students across Noida — Sectors 18, 50, 62, 137, and Greater Noida.',
      transportOptions: 'Blue Line Metro to Noida Sector 18/City Centre. Our South Delhi center is 25 min via Noida-Greater Noida Expressway. Online classes available for all Noida students.',
    },
    areaSpecificContent: {
      whyThisArea: 'Noida has 1,200+ NEET aspirants but lacks dedicated Biology coaching. Most students commute to Delhi or settle for generic coaching. Our live online classes bring AIIMS-faculty teaching directly to Noida homes, saving 2+ hours of daily commute. Students can also attend our South Delhi center on weekends for practical sessions.',
    },
    studentSuccessStory: {
      name: 'Aarav T.',
      area: 'Sector 62, Noida',
      achievement: 'NEET 2025 — 630/720, VMMC Delhi',
      quote: 'Online classes from Cerebrum were better than the offline coaching I attended in Kota. The interactive sessions and WhatsApp doubt support made up for not being physically present.',
    },
  },

  gurgaon: {
    slug: 'gurgaon',
    cityName: 'Gurgaon',
    stateName: 'Haryana',
    metaTitle: 'Biology Classes in Gurgaon | Best NEET Coaching Gurugram | Cerebrum Academy',
    metaDescription:
      'Best biology classes in Gurgaon with offline center in Sector 51. AIIMS faculty, 98% success rate. NEET & Board prep. Book free demo at M2K Corporate Park!',
    heroTitle: 'Best Biology Classes in Gurgaon',
    heroSubtitle:
      'Join our Sector 51 center for premium NEET biology coaching. AIIMS-trained faculty with 98% success rate.',
    hasOfflineCenter: true,
    nearestCenter: {
      name: 'Gurugram Center',
      address: 'M2K Corporate Park, Sector 51, Gurugram 122018',
      distance: 'Sector 51, Gurugram',
    },
    localities: [
      { name: 'Sector 51', url: '/biology-classes-gurgaon-sector-51' },
      { name: 'Sector 56', url: '/biology-classes-gurgaon-sector-56' },
      { name: 'Sector 49', url: '/biology-classes-gurgaon-sector-49' },
      { name: 'Sector 57', url: '/biology-classes-gurgaon-sector-57' },
      { name: 'DLF Phase 1-5', url: '/biology-classes-dlf-gurgaon' },
      { name: 'Golf Course Road', url: '/biology-classes-golf-course-road-gurgaon' },
      { name: 'Sohna Road', url: '/biology-classes-sohna-road-gurgaon' },
      { name: 'MG Road', url: '/biology-classes-mg-road-gurgaon' },
      { name: 'Palam Vihar', url: '/biology-classes-palam-vihar-gurgaon' },
      { name: 'South City', url: '/biology-classes-south-city-gurgaon' },
      { name: 'Nirvana Country', url: '/biology-classes-nirvana-country-gurgaon' },
      { name: 'Manesar', url: '/biology-classes-manesar' },
    ],
    relatedCities: [
      { name: 'Delhi', url: '/biology-classes-delhi' },
      { name: 'Manesar', url: '/biology-classes-manesar' },
      { name: 'Faridabad', url: '/biology-classes-faridabad' },
      { name: 'Rewari', url: '/biology-classes-rewari' },
    ],
    faqs: [
      {
        question: 'Where is the biology coaching center in Gurgaon?',
        answer:
          'Our Gurgaon center is located at M2K Corporate Park, Sector 51, Gurugram 122018. It is easily accessible from Golf Course Extension Road and Sohna Road. The center has modern AC classrooms and all amenities.',
      },
      {
        question: 'What courses are available at Gurgaon center?',
        answer:
          'We offer biology classes for Class 11, Class 12, and NEET Dropper batch at our Gurgaon center. All courses are taught by AIIMS-trained faculty with comprehensive NCERT-focused study material.',
      },
      {
        question: 'What is the batch timing at Gurgaon center?',
        answer:
          'Our Gurgaon center operates from 8 AM to 8 PM with multiple batch options. Morning batches (8-10 AM), afternoon batches (2-4 PM), and evening batches (6-8 PM) are available. Weekend batches are also offered.',
      },
      {
        question: 'What is the fee for biology classes in Gurgaon?',
        answer:
          'Biology coaching fees at our Gurgaon center range from ₹45,000 to ₹75,000 per year depending on the course. This includes all study material, test series, and doubt sessions. EMI options are available.',
      },
    ],
    stats: {
      studentsFromCity: '800+',
      successRate: '98%',
      rating: '4.9',
    },
    geoCoordinates: {
      lat: '28.4595',
      lng: '77.0266',
    },
    localContext: {
      nearbyLandmarks: 'M2K Corporate Park, Sector 51, opposite Unitech Cyber Park. Near Rapid Metro Sector 53-54 station.',
      transportOptions: 'Rapid Metro to Sector 53-54, then 5 min auto. Delhi Metro Yellow Line to HUDA City Centre, then auto/cab (20 min). NH-48 expressway exit at Sector 51.',
    },
    areaSpecificContent: {
      whyThisArea: 'Gurgaon has the highest concentration of premium schools in Haryana — DPS, Pathways World School, Shri Ram School, GD Goenka. With 800+ students from across Gurgaon sectors, our M2K Corporate Park center is the only AIIMS-faculty biology coaching in the Millennium City. Students from Sector 14 to Sector 82, DLF Phase 1-5, and Sohna Road all attend here.',
    },
    studentSuccessStory: {
      name: 'Riya M.',
      area: 'DLF Phase 4',
      achievement: 'NEET 2025 — 665/720, Maulana Azad Medical College',
      quote: 'I switched from a big coaching chain to Cerebrum. The small batch size and Dr. Shekhar\'s direct mentoring made all the difference. Biology went from my weakest to my strongest subject.',
    },
    competitorComparison: {
      localAlternatives: 'Aakash Gurgaon, Allen Gurgaon, FIITJEE Gurgaon, Narayana Gurgaon',
      differentiator: 'Only dedicated Biology-only institute in Gurgaon. AIIMS-alumni faculty vs generic science teachers. 15-student batches vs 80+ at big chains. Direct WhatsApp access to faculty.',
    },
  },

  'gurgaon-sector-51': {
    slug: 'gurgaon-sector-51',
    cityName: 'Sector 51 Gurgaon',
    stateName: 'Haryana',
    metaTitle: 'Biology Classes in Sector 51 Gurgaon | NEET Coaching Center | Cerebrum Academy',
    metaDescription:
      'Best biology classes in Sector 51 Gurgaon at M2K Corporate Park. AIIMS faculty, 98% success rate. Walk-in for NEET & Board prep. Call 88264-44334!',
    heroTitle: 'Biology Classes in Sector 51 Gurgaon',
    heroSubtitle:
      'Visit our flagship Gurgaon center at M2K Corporate Park, Sector 51. Premium NEET coaching with AIIMS-trained faculty.',
    hasOfflineCenter: true,
    nearestCenter: {
      name: 'Gurugram Center - Sector 51',
      address: 'M2K Corporate Park, Sector 51, Gurugram 122018',
      distance: 'In Sector 51',
    },
    localities: [
      { name: 'Sector 56', url: '/biology-classes-gurgaon-sector-56' },
      { name: 'Sector 49', url: '/biology-classes-gurgaon-sector-49' },
      { name: 'Sector 57', url: '/biology-classes-gurgaon-sector-57' },
      { name: 'Golf Course Road', url: '/biology-classes-golf-course-road-gurgaon' },
      { name: 'Sohna Road', url: '/biology-classes-sohna-road-gurgaon' },
      { name: 'Nirvana Country', url: '/biology-classes-nirvana-country-gurgaon' },
      { name: 'Eldeco Acacia Sec 49', url: '/biology-classes-gurgaon-sector-49' },
      { name: 'Central Park 1 & 2', url: '/biology-classes-sohna-road-gurgaon' },
      { name: 'Uppal Southend Sec 49', url: '/biology-classes-gurgaon-sector-49' },
      { name: 'The Close South Sec 50', url: '/biology-classes-nirvana-country-gurgaon' },
      { name: 'Palm Springs Sec 54', url: '/biology-classes-golf-course-road-gurgaon' },
      { name: 'Ireo Grand Arch Sec 58', url: '/biology-classes-gurgaon-sector-57' },
    ],
    relatedCities: [
      { name: 'Gurgaon', url: '/biology-classes-gurgaon' },
      { name: 'DLF Gurgaon', url: '/biology-classes-dlf-gurgaon' },
      { name: 'Delhi', url: '/biology-classes-delhi' },
      { name: 'South City', url: '/biology-classes-south-city-gurgaon' },
    ],
    faqs: [
      {
        question: 'What is the exact address of the Sector 51 biology coaching center?',
        answer:
          'Our center is at M2K Corporate Park, Sector 51, Gurugram 122018. It is on Golf Course Extension Road, easily accessible from Sectors 49, 50, 52, 56, 57 and Sohna Road. Students from Eldeco Acacia, Central Park, Uppal Southend, Nirvana Country, and other gated societies can reach in 5-10 minutes.',
      },
      {
        question: 'What are the batch timings at Sector 51 center?',
        answer:
          'We offer multiple batches: Morning (8-10 AM), Afternoon (2-4 PM), Evening (6-8 PM). Weekend batches available. Choose based on your school timing.',
      },
      {
        question: 'Is parking available at the Sector 51 center?',
        answer:
          'Yes, ample free parking is available at M2K Corporate Park for both two-wheelers and cars. The building has modern facilities including AC classrooms.',
      },
      {
        question: 'What courses are available at Sector 51 Gurgaon center?',
        answer:
          'We offer Class 11 NEET Foundation, Class 12 NEET + Boards, and NEET Dropper intensive batches. All taught by AIIMS-trained Dr. Shekhar Singh.',
      },
    ],
    stats: {
      studentsFromCity: '300+',
      successRate: '98%',
      rating: '4.9',
    },
    geoCoordinates: {
      lat: '28.4295',
      lng: '77.0766',
    },
  },

  'gurgaon-sector-56': {
    slug: 'gurgaon-sector-56',
    cityName: 'Sector 56 Gurgaon',
    stateName: 'Haryana',
    metaTitle: 'Biology Classes in Sector 56 Gurgaon | Best NEET Coaching | Cerebrum Academy',
    metaDescription:
      'Top biology classes for Sector 56 Gurgaon students. Center in nearby Sector 51 (5 min). AIIMS faculty, 98% success. Call 88264-44334 for demo!',
    heroTitle: 'Biology Classes for Sector 56 Gurgaon',
    heroSubtitle:
      'Premium NEET biology coaching just 5 minutes from Sector 56. Join our Sector 51 center with AIIMS-trained faculty.',
    hasOfflineCenter: true,
    nearestCenter: {
      name: 'Gurugram Center',
      address: 'M2K Corporate Park, Sector 51, Gurugram 122018',
      distance: '5 minutes from Sector 56',
    },
    localities: [
      { name: 'Sector 51', url: '/biology-classes-gurgaon-sector-51' },
      { name: 'Sector 57', url: '/biology-classes-gurgaon-sector-57' },
      { name: 'Golf Course Road', url: '/biology-classes-golf-course-road-gurgaon' },
      { name: 'Nirvana Country', url: '/biology-classes-nirvana-country-gurgaon' },
    ],
    relatedCities: [
      { name: 'Gurgaon', url: '/biology-classes-gurgaon' },
      { name: 'DLF Gurgaon', url: '/biology-classes-dlf-gurgaon' },
      { name: 'South City', url: '/biology-classes-south-city-gurgaon' },
    ],
    faqs: [
      {
        question: 'Where can Sector 56 students attend biology classes?',
        answer:
          'Sector 56 students can attend our Sector 51 center at M2K Corporate Park, just 5 minutes away. Easy access via Golf Course Extension Road.',
      },
      {
        question: 'Is there any transport facility from Sector 56?',
        answer:
          'While we do not provide transport, our Sector 51 center is very accessible. Many Sector 56 students commute easily by car, bike, or shared auto.',
      },
      {
        question: 'What makes Cerebrum Academy best for Sector 56 students?',
        answer:
          'Proximity to Sector 51 center, AIIMS-trained faculty, small batch sizes of 15-20 students, and 98% NEET success rate make us the top choice.',
      },
    ],
    stats: {
      studentsFromCity: '150+',
      successRate: '98%',
      rating: '4.9',
    },
    geoCoordinates: {
      lat: '28.4195',
      lng: '77.0866',
    },
  },

  'gurgaon-sector-49': {
    slug: 'gurgaon-sector-49',
    cityName: 'Sector 49 Gurgaon',
    stateName: 'Haryana',
    metaTitle: 'Biology Classes in Sector 49 Gurgaon | NEET Coaching Near You | Cerebrum Academy',
    metaDescription:
      'Best biology classes for Sector 49 Gurgaon. Center in adjacent Sector 51 (3 min). AIIMS faculty, 98% success rate. Book free demo today!',
    heroTitle: 'Biology Classes for Sector 49 Gurgaon',
    heroSubtitle:
      'Top NEET biology coaching right next to Sector 49. Walk to our Sector 51 center in just 3 minutes!',
    hasOfflineCenter: true,
    nearestCenter: {
      name: 'Gurugram Center',
      address: 'M2K Corporate Park, Sector 51, Gurugram 122018',
      distance: '3 minutes from Sector 49',
    },
    localities: [
      { name: 'Sector 51', url: '/biology-classes-gurgaon-sector-51' },
      { name: 'Sector 50', url: '/biology-classes-gurgaon-sector-56' },
      { name: 'Sohna Road', url: '/biology-classes-sohna-road-gurgaon' },
    ],
    relatedCities: [
      { name: 'Gurgaon', url: '/biology-classes-gurgaon' },
      { name: 'Sector 56', url: '/biology-classes-gurgaon-sector-56' },
      { name: 'Sector 57', url: '/biology-classes-gurgaon-sector-57' },
    ],
    faqs: [
      {
        question: 'How far is the coaching center from Sector 49?',
        answer:
          'Our center at M2K Corporate Park, Sector 51 is just 3 minutes from Sector 49. It is the closest premium NEET coaching for Sector 49 residents.',
      },
      {
        question: 'What courses are available for Sector 49 students?',
        answer:
          'We offer Class 11, Class 12, and NEET Dropper batches with AIIMS-trained faculty. All study material and test series included.',
      },
    ],
    stats: {
      studentsFromCity: '100+',
      successRate: '98%',
      rating: '4.9',
    },
    geoCoordinates: {
      lat: '28.4195',
      lng: '77.0566',
    },
  },

  'gurgaon-sector-57': {
    slug: 'gurgaon-sector-57',
    cityName: 'Sector 57 Gurgaon',
    stateName: 'Haryana',
    metaTitle: 'Biology Classes in Sector 57 Gurgaon | Best NEET Coaching | Cerebrum Academy',
    metaDescription:
      'Premium biology classes for Sector 57 Gurgaon students. Center in Sector 51 (7 min). AIIMS faculty, 98% success. Call 88264-44334!',
    heroTitle: 'Biology Classes for Sector 57 Gurgaon',
    heroSubtitle:
      'Top-rated NEET coaching for Sector 57 students. Our Sector 51 center is just 7 minutes away via Golf Course Extension Road.',
    hasOfflineCenter: true,
    nearestCenter: {
      name: 'Gurugram Center',
      address: 'M2K Corporate Park, Sector 51, Gurugram 122018',
      distance: '7 minutes from Sector 57',
    },
    localities: [
      { name: 'Sector 56', url: '/biology-classes-gurgaon-sector-56' },
      { name: 'Sector 51', url: '/biology-classes-gurgaon-sector-51' },
      { name: 'Golf Course Road', url: '/biology-classes-golf-course-road-gurgaon' },
      { name: 'Nirvana Country', url: '/biology-classes-nirvana-country-gurgaon' },
    ],
    relatedCities: [
      { name: 'Gurgaon', url: '/biology-classes-gurgaon' },
      { name: 'Sector 56', url: '/biology-classes-gurgaon-sector-56' },
      { name: 'DLF Gurgaon', url: '/biology-classes-dlf-gurgaon' },
    ],
    faqs: [
      {
        question: 'Which is the best biology coaching near Sector 57 Gurgaon?',
        answer:
          'Cerebrum Biology Academy at M2K Corporate Park, Sector 51 is the best choice. Just 7 minutes from Sector 57 with 98% NEET success rate.',
      },
      {
        question: 'Is online option available for Sector 57 students?',
        answer:
          'Yes, we offer live online classes as hybrid mode. Attend from home or visit our Sector 51 center as per your convenience.',
      },
    ],
    stats: {
      studentsFromCity: '120+',
      successRate: '98%',
      rating: '4.9',
    },
    geoCoordinates: {
      lat: '28.4095',
      lng: '77.0966',
    },
  },

  'dlf-gurgaon': {
    slug: 'dlf-gurgaon',
    cityName: 'DLF Gurgaon',
    stateName: 'Haryana',
    metaTitle: 'Biology Classes in DLF Gurgaon | NEET Coaching DLF Phase 1-5 | Cerebrum Academy',
    metaDescription:
      'Best biology classes for DLF Phase 1, 2, 3, 4, 5 Gurgaon. Center in Sector 51 (15 min). AIIMS faculty, 98% success. Book demo: 88264-44334',
    heroTitle: 'Biology Classes for DLF Gurgaon Students',
    heroSubtitle:
      'Premium NEET coaching for DLF Phase 1, 2, 3, 4, 5 residents. Join our Sector 51 center or attend live online classes.',
    hasOfflineCenter: true,
    nearestCenter: {
      name: 'Gurugram Center',
      address: 'M2K Corporate Park, Sector 51, Gurugram 122018',
      distance: '15-20 minutes from DLF areas',
    },
    localities: [
      { name: 'Golf Course Road', url: '/biology-classes-golf-course-road-gurgaon' },
      { name: 'MG Road', url: '/biology-classes-mg-road-gurgaon' },
      { name: 'Sector 51', url: '/biology-classes-gurgaon-sector-51' },
      { name: 'Cyber City', url: '/biology-classes-gurgaon' },
    ],
    relatedCities: [
      { name: 'Gurgaon', url: '/biology-classes-gurgaon' },
      { name: 'Golf Course Road', url: '/biology-classes-golf-course-road-gurgaon' },
      { name: 'South City', url: '/biology-classes-south-city-gurgaon' },
    ],
    faqs: [
      {
        question: 'Where can DLF Gurgaon students attend biology classes?',
        answer:
          'DLF students can attend our Sector 51 center (15-20 min via Golf Course Road) or join live online classes from home with same AIIMS faculty.',
      },
      {
        question: 'Which DLF phases are covered?',
        answer:
          'We serve students from all DLF phases - Phase 1, 2, 3, 4, and 5. Our Sector 51 center is accessible via Golf Course Road and MG Road.',
      },
      {
        question: 'Do you have students from DLF area?',
        answer:
          'Yes, 100+ students from DLF phases attend our classes. Many prefer our hybrid mode - online on weekdays and offline on weekends.',
      },
    ],
    stats: {
      studentsFromCity: '100+',
      successRate: '98%',
      rating: '4.9',
    },
    geoCoordinates: {
      lat: '28.4695',
      lng: '77.0866',
    },
  },

  'golf-course-road-gurgaon': {
    slug: 'golf-course-road-gurgaon',
    cityName: 'Golf Course Road Gurgaon',
    stateName: 'Haryana',
    metaTitle: 'Biology Classes on Golf Course Road Gurgaon | NEET Coaching | Cerebrum Academy',
    metaDescription:
      'Best biology classes near Golf Course Road Gurgaon. Center on Golf Course Extension Road Sector 51. AIIMS faculty. Call 88264-44334!',
    heroTitle: 'Biology Classes near Golf Course Road Gurgaon',
    heroSubtitle:
      'Premium NEET coaching on Golf Course Extension Road. Our Sector 51 center is directly accessible from Golf Course Road.',
    hasOfflineCenter: true,
    nearestCenter: {
      name: 'Gurugram Center',
      address: 'M2K Corporate Park, Sector 51, Gurugram 122018',
      distance: 'On Golf Course Extension Road',
    },
    localities: [
      { name: 'Sector 51', url: '/biology-classes-gurgaon-sector-51' },
      { name: 'Sector 56', url: '/biology-classes-gurgaon-sector-56' },
      { name: 'DLF Gurgaon', url: '/biology-classes-dlf-gurgaon' },
      { name: 'Nirvana Country', url: '/biology-classes-nirvana-country-gurgaon' },
    ],
    relatedCities: [
      { name: 'Gurgaon', url: '/biology-classes-gurgaon' },
      { name: 'Sector 57', url: '/biology-classes-gurgaon-sector-57' },
      { name: 'South City', url: '/biology-classes-south-city-gurgaon' },
    ],
    faqs: [
      {
        question: 'Where is the biology coaching center on Golf Course Road?',
        answer:
          'Our center is at M2K Corporate Park, Sector 51, right on Golf Course Extension Road. Easy access from all Golf Course Road societies.',
      },
      {
        question: 'Which societies near Golf Course Road do you serve?',
        answer:
          'We serve students from DLF Magnolias, DLF Aralias, DLF Camellias, Palm Drive, Palm Springs, The Close South, The Close North, Nirvana Country, Ireo Skyon, Emaar Palm Terraces, M3M Golf Estate, and all premium Golf Course Road condominiums.',
      },
      {
        question: 'Which gated societies within 5km are covered?',
        answer:
          'Our Sector 51 center serves all gated societies including DLF Magnolias, Aralias, Camellias, Palm Springs, The Close South/North, Nirvana Country, Central Park, Eldeco Acacia, Uppal Southend, Ireo Grand Arch, M3M Merlin, and Emaar Emerald Hills.',
      },
    ],
    stats: {
      studentsFromCity: '150+',
      successRate: '98%',
      rating: '4.9',
    },
    geoCoordinates: {
      lat: '28.4395',
      lng: '77.0966',
    },
  },

  'sohna-road-gurgaon': {
    slug: 'sohna-road-gurgaon',
    cityName: 'Sohna Road Gurgaon',
    stateName: 'Haryana',
    metaTitle: 'Biology Classes on Sohna Road Gurgaon | Best NEET Coaching | Cerebrum Academy',
    metaDescription:
      'Top biology classes for Sohna Road Gurgaon students. Center in Sector 51 (10 min). AIIMS faculty, 98% success. Book demo: 88264-44334',
    heroTitle: 'Biology Classes for Sohna Road Gurgaon',
    heroSubtitle:
      'Premium NEET coaching for Sohna Road residents. Our Sector 51 center is 10 minutes via Golf Course Extension Road.',
    hasOfflineCenter: true,
    nearestCenter: {
      name: 'Gurugram Center',
      address: 'M2K Corporate Park, Sector 51, Gurugram 122018',
      distance: '10 minutes from Sohna Road',
    },
    localities: [
      { name: 'Sector 49', url: '/biology-classes-gurgaon-sector-49' },
      { name: 'Sector 51', url: '/biology-classes-gurgaon-sector-51' },
      { name: 'South City', url: '/biology-classes-south-city-gurgaon' },
      { name: 'Central Park 1 & 2', url: '/biology-classes-sohna-road-gurgaon' },
      { name: 'Vatika City', url: '/biology-classes-sohna-road-gurgaon' },
      { name: 'BPTP Park Grandeura', url: '/biology-classes-sohna-road-gurgaon' },
      { name: 'Bestech Park View', url: '/biology-classes-sohna-road-gurgaon' },
    ],
    relatedCities: [
      { name: 'Gurgaon', url: '/biology-classes-gurgaon' },
      { name: 'Sector 56', url: '/biology-classes-gurgaon-sector-56' },
      { name: 'Faridabad', url: '/biology-classes-faridabad' },
    ],
    faqs: [
      {
        question: 'How far is the center from Sohna Road?',
        answer:
          'Our Sector 51 center is 10 minutes from main Sohna Road areas via Sector 49. Students from Central Park, Vatika, BPTP, Bestech, Tulip, and other Sohna Road societies attend regularly.',
      },
      {
        question: 'Which Sohna Road societies do you have students from?',
        answer:
          'We have students from Central Park 1 & 2, Vatika City, BPTP Park Grandeura, Bestech Park View Grand Spa, Tulip Violet, Ireo Grand Arch, M3M Merlin, CHD Vann, Emaar Emerald Hills, and many other premium Sohna Road townships.',
      },
    ],
    stats: {
      studentsFromCity: '120+',
      successRate: '98%',
      rating: '4.9',
    },
    geoCoordinates: {
      lat: '28.3995',
      lng: '77.0466',
    },
  },

  'mg-road-gurgaon': {
    slug: 'mg-road-gurgaon',
    cityName: 'MG Road Gurgaon',
    stateName: 'Haryana',
    metaTitle: 'Biology Classes near MG Road Gurgaon | NEET Coaching | Cerebrum Academy',
    metaDescription:
      'Best biology classes for MG Road Gurgaon students. Center in Sector 51. AIIMS faculty, 98% success rate. Call 88264-44334 for demo!',
    heroTitle: 'Biology Classes for MG Road Gurgaon Students',
    heroSubtitle:
      'Premium NEET coaching accessible from MG Road. Join our Sector 51 center or attend live online classes.',
    hasOfflineCenter: true,
    nearestCenter: {
      name: 'Gurugram Center',
      address: 'M2K Corporate Park, Sector 51, Gurugram 122018',
      distance: '20 minutes from MG Road',
    },
    localities: [
      { name: 'DLF Gurgaon', url: '/biology-classes-dlf-gurgaon' },
      { name: 'Sector 14', url: '/biology-classes-gurgaon' },
      { name: 'Golf Course Road', url: '/biology-classes-golf-course-road-gurgaon' },
    ],
    relatedCities: [
      { name: 'Gurgaon', url: '/biology-classes-gurgaon' },
      { name: 'DLF Gurgaon', url: '/biology-classes-dlf-gurgaon' },
      { name: 'Delhi', url: '/biology-classes-delhi' },
    ],
    faqs: [
      {
        question: 'How can MG Road students reach the coaching center?',
        answer:
          'Take the Rapid Metro to Sector 55-56 station, then 5 min auto to our Sector 51 center. By car, 20 min via Golf Course Road.',
      },
      {
        question: 'Do you have online classes for MG Road students?',
        answer:
          'Yes, we offer live online classes with same AIIMS faculty. MG Road students can attend from home and visit center on weekends.',
      },
    ],
    stats: {
      studentsFromCity: '80+',
      successRate: '98%',
      rating: '4.9',
    },
    geoCoordinates: {
      lat: '28.4795',
      lng: '77.0266',
    },
  },

  'palam-vihar-gurgaon': {
    slug: 'palam-vihar-gurgaon',
    cityName: 'Palam Vihar Gurgaon',
    stateName: 'Haryana',
    metaTitle: 'Biology Classes in Palam Vihar Gurgaon | NEET Coaching | Cerebrum Academy',
    metaDescription:
      'Best biology classes for Palam Vihar Gurgaon. Center in Sector 51 or join online. AIIMS faculty, 98% success. Call 88264-44334!',
    heroTitle: 'Biology Classes for Palam Vihar Gurgaon',
    heroSubtitle:
      'Top NEET coaching for Palam Vihar students. Join our Sector 51 center (25 min) or attend live online classes.',
    hasOfflineCenter: true,
    nearestCenter: {
      name: 'Gurugram Center',
      address: 'M2K Corporate Park, Sector 51, Gurugram 122018',
      distance: '25 minutes from Palam Vihar',
    },
    localities: [
      { name: 'DLF Gurgaon', url: '/biology-classes-dlf-gurgaon' },
      { name: 'Sector 51', url: '/biology-classes-gurgaon-sector-51' },
      { name: 'MG Road', url: '/biology-classes-mg-road-gurgaon' },
    ],
    relatedCities: [
      { name: 'Gurgaon', url: '/biology-classes-gurgaon' },
      { name: 'Dwarka', url: '/biology-classes-dwarka' },
      { name: 'Delhi', url: '/biology-classes-delhi' },
    ],
    faqs: [
      {
        question: 'What is the best option for Palam Vihar students?',
        answer:
          'Palam Vihar students can choose: 1) Hybrid mode - online weekdays + offline weekends, or 2) Full online classes, or 3) Daily commute to Sector 51.',
      },
      {
        question: 'How long does it take to reach from Palam Vihar?',
        answer:
          'It takes about 25 minutes to reach our Sector 51 center via Dwarka Expressway or Old Delhi Road. Many students use this route.',
      },
    ],
    stats: {
      studentsFromCity: '60+',
      successRate: '98%',
      rating: '4.9',
    },
    geoCoordinates: {
      lat: '28.5095',
      lng: '77.0166',
    },
  },

  'south-city-gurgaon': {
    slug: 'south-city-gurgaon',
    cityName: 'South City Gurgaon',
    stateName: 'Haryana',
    metaTitle: 'Biology Classes in South City Gurgaon | NEET Coaching | Cerebrum Academy',
    metaDescription:
      'Best biology classes for South City 1 & 2 Gurgaon. Center in Sector 51 (12 min). AIIMS faculty, 98% success. Book demo: 88264-44334',
    heroTitle: 'Biology Classes for South City Gurgaon',
    heroSubtitle:
      'Premium NEET coaching for South City 1 & 2 residents. Our Sector 51 center is just 12 minutes away.',
    hasOfflineCenter: true,
    nearestCenter: {
      name: 'Gurugram Center',
      address: 'M2K Corporate Park, Sector 51, Gurugram 122018',
      distance: '12 minutes from South City',
    },
    localities: [
      { name: 'Sohna Road', url: '/biology-classes-sohna-road-gurgaon' },
      { name: 'Sector 49', url: '/biology-classes-gurgaon-sector-49' },
      { name: 'Sector 51', url: '/biology-classes-gurgaon-sector-51' },
    ],
    relatedCities: [
      { name: 'Gurgaon', url: '/biology-classes-gurgaon' },
      { name: 'Sohna Road', url: '/biology-classes-sohna-road-gurgaon' },
      { name: 'Sector 56', url: '/biology-classes-gurgaon-sector-56' },
    ],
    faqs: [
      {
        question: 'How do South City students reach the center?',
        answer:
          'From South City 1 or 2, take Sohna Road to Sector 49 exit, then 3 min to our Sector 51 center. Total 12 minutes by car.',
      },
      {
        question: 'Do you have students from South City?',
        answer:
          'Yes, we have 50+ students from South City 1 and South City 2. Many attend offline regularly due to proximity.',
      },
    ],
    stats: {
      studentsFromCity: '50+',
      successRate: '98%',
      rating: '4.9',
    },
    geoCoordinates: {
      lat: '28.4095',
      lng: '77.0366',
    },
  },

  'nirvana-country-gurgaon': {
    slug: 'nirvana-country-gurgaon',
    cityName: 'Nirvana Country Gurgaon',
    stateName: 'Haryana',
    metaTitle: 'Biology Classes in Nirvana Country Gurgaon | NEET Coaching | Cerebrum Academy',
    metaDescription:
      'Best biology classes for Nirvana Country Gurgaon residents. Center in Sector 51 (8 min). AIIMS faculty, 98% success. Call 88264-44334!',
    heroTitle: 'Biology Classes for Nirvana Country Gurgaon',
    heroSubtitle:
      'Premium NEET coaching for Nirvana Country residents. Our Sector 51 center is just 8 minutes via Golf Course Extension Road.',
    hasOfflineCenter: true,
    nearestCenter: {
      name: 'Gurugram Center',
      address: 'M2K Corporate Park, Sector 51, Gurugram 122018',
      distance: '8 minutes from Nirvana Country',
    },
    localities: [
      { name: 'Golf Course Road', url: '/biology-classes-golf-course-road-gurgaon' },
      { name: 'Sector 56', url: '/biology-classes-gurgaon-sector-56' },
      { name: 'Sector 57', url: '/biology-classes-gurgaon-sector-57' },
      { name: 'The Close South Sec 50', url: '/biology-classes-nirvana-country-gurgaon' },
      { name: 'The Close North Sec 50', url: '/biology-classes-nirvana-country-gurgaon' },
      { name: 'Palm Springs Sec 54', url: '/biology-classes-golf-course-road-gurgaon' },
    ],
    relatedCities: [
      { name: 'Gurgaon', url: '/biology-classes-gurgaon' },
      { name: 'Sector 51', url: '/biology-classes-gurgaon-sector-51' },
      { name: 'DLF Gurgaon', url: '/biology-classes-dlf-gurgaon' },
    ],
    faqs: [
      {
        question: 'How far is the center from Nirvana Country?',
        answer:
          'Our Sector 51 center is just 8 minutes from Nirvana Country via Golf Course Extension Road. We also serve The Close South, The Close North, and nearby premium societies.',
      },
      {
        question: 'Why is Cerebrum best for Nirvana Country students?',
        answer:
          'Proximity (8 min), AIIMS-trained faculty, small batches of 15-20, 98% success rate, and flexible hybrid mode make us the ideal choice.',
      },
    ],
    stats: {
      studentsFromCity: '40+',
      successRate: '98%',
      rating: '4.9',
    },
    geoCoordinates: {
      lat: '28.4195',
      lng: '77.1066',
    },
  },

  // NEET Coaching Gurugram Pages
  'neet-coaching-gurgaon': {
    slug: 'neet-coaching-gurgaon',
    cityName: 'Gurugram',
    stateName: 'Haryana',
    metaTitle: 'Best NEET Coaching in Gurgaon | Top NEET Classes Gurugram | Cerebrum Academy',
    metaDescription:
      'Best NEET coaching in Gurgaon with center in Sector 51. AIIMS-trained Dr. Shekhar Singh, 98% success rate. Class 11, 12 & Dropper batches. Call 88264-44334!',
    heroTitle: 'Best NEET Coaching in Gurgaon',
    heroSubtitle:
      'Top-rated NEET preparation at our Sector 51 center. AIIMS faculty, proven 98% success rate, personalized attention.',
    hasOfflineCenter: true,
    nearestCenter: {
      name: 'Gurugram NEET Center',
      address: 'M2K Corporate Park, Sector 51, Gurugram 122018',
      distance: 'Sector 51, Gurugram',
    },
    localities: [
      { name: 'Sector 51', url: '/neet-coaching-gurgaon-sector-51' },
      { name: 'Sector 56', url: '/neet-coaching-gurgaon-sector-56' },
      { name: 'Sector 49', url: '/neet-coaching-gurgaon-sector-49' },
      { name: 'DLF Phase 1-5', url: '/neet-coaching-dlf-gurgaon' },
      { name: 'Golf Course Road', url: '/neet-coaching-golf-course-road-gurgaon' },
      { name: 'Sohna Road', url: '/neet-coaching-sohna-road-gurgaon' },
      { name: 'South City', url: '/neet-coaching-south-city-gurgaon' },
      { name: 'Nirvana Country', url: '/neet-coaching-nirvana-country-gurgaon' },
    ],
    relatedCities: [
      { name: 'Delhi NEET Coaching', url: '/neet-coaching-delhi' },
      { name: 'Noida NEET Coaching', url: '/neet-coaching-noida' },
      { name: 'Faridabad NEET Coaching', url: '/neet-coaching-faridabad' },
    ],
    faqs: [
      {
        question: 'Which is the best NEET coaching in Gurgaon?',
        answer:
          'Cerebrum Biology Academy at M2K Corporate Park, Sector 51 is rated the best NEET coaching in Gurgaon. With AIIMS-trained Dr. Shekhar Singh, 98% success rate, and small batches of 15-20 students, we deliver exceptional results.',
      },
      {
        question: 'What is the fee for NEET coaching in Gurgaon?',
        answer:
          'NEET coaching fees at our Gurgaon center range from ₹45,000 to ₹75,000 per year. This includes live classes, complete NCERT-based study material, test series, and doubt sessions. EMI options available.',
      },
      {
        question: 'Do you offer NEET dropper batch in Gurgaon?',
        answer:
          'Yes, we have a dedicated NEET Dropper batch with intensive 6-8 hours daily coaching, crash courses, and personalized mentoring. Many droppers have improved 200+ marks with us.',
      },
      {
        question: 'What are NEET coaching timings in Gurgaon?',
        answer:
          'Our Gurgaon NEET center offers morning (8-10 AM), afternoon (2-4 PM), and evening (6-8 PM) batches. Weekend batches also available for students with weekday constraints.',
      },
    ],
    stats: {
      studentsFromCity: '800+',
      successRate: '98%',
      rating: '4.9',
    },
    geoCoordinates: {
      lat: '28.4595',
      lng: '77.0266',
    },
  },

  'neet-coaching-gurgaon-sector-51': {
    slug: 'neet-coaching-gurgaon-sector-51',
    cityName: 'Sector 51 Gurgaon',
    stateName: 'Haryana',
    metaTitle: 'NEET Coaching in Sector 51 Gurgaon | Best NEET Classes | Cerebrum Academy',
    metaDescription:
      'Top NEET coaching at M2K Corporate Park, Sector 51 Gurgaon. AIIMS faculty Dr. Shekhar Singh. 98% success. Class 11, 12, Droppers. Call 88264-44334!',
    heroTitle: 'NEET Coaching in Sector 51 Gurgaon',
    heroSubtitle:
      'Join our flagship NEET center at M2K Corporate Park. AIIMS-trained faculty, proven track record, small batch sizes.',
    hasOfflineCenter: true,
    nearestCenter: {
      name: 'Sector 51 NEET Center',
      address: 'M2K Corporate Park, Sector 51, Gurugram 122018',
      distance: 'In Sector 51',
    },
    localities: [
      { name: 'Eldeco Acacia', url: '/neet-coaching-gurgaon-sector-49' },
      { name: 'Central Park', url: '/neet-coaching-sohna-road-gurgaon' },
      { name: 'Nirvana Country', url: '/neet-coaching-nirvana-country-gurgaon' },
      { name: 'The Close South', url: '/neet-coaching-nirvana-country-gurgaon' },
      { name: 'Uppal Southend', url: '/neet-coaching-gurgaon-sector-49' },
      { name: 'Palm Springs', url: '/neet-coaching-golf-course-road-gurgaon' },
    ],
    relatedCities: [
      { name: 'Gurgaon NEET', url: '/neet-coaching-gurgaon' },
      { name: 'Sector 56 NEET', url: '/neet-coaching-gurgaon-sector-56' },
      { name: 'DLF NEET', url: '/neet-coaching-dlf-gurgaon' },
    ],
    faqs: [
      {
        question: 'What is the address of NEET coaching in Sector 51?',
        answer:
          'Our NEET center is at M2K Corporate Park, Sector 51, Gurugram 122018. On Golf Course Extension Road, easily accessible from Eldeco Acacia, Central Park, Nirvana Country, and other nearby societies.',
      },
      {
        question: 'Who teaches NEET at Sector 51 center?',
        answer:
          'Dr. Shekhar Singh, AIIMS-trained faculty with 15+ years experience, personally teaches Biology. Our 98% success rate speaks for the quality of teaching.',
      },
      {
        question: 'What NEET courses are available at Sector 51?',
        answer:
          'We offer NEET Foundation (Class 11), NEET + Boards (Class 12), and NEET Dropper intensive batch. All courses include complete NCERT coverage and test series.',
      },
    ],
    stats: {
      studentsFromCity: '300+',
      successRate: '98%',
      rating: '4.9',
    },
    geoCoordinates: {
      lat: '28.4295',
      lng: '77.0766',
    },
  },

  'neet-coaching-gurgaon-sector-56': {
    slug: 'neet-coaching-gurgaon-sector-56',
    cityName: 'Sector 56 Gurgaon',
    stateName: 'Haryana',
    metaTitle: 'NEET Coaching near Sector 56 Gurgaon | Best NEET Classes | Cerebrum Academy',
    metaDescription:
      'Best NEET coaching for Sector 56 Gurgaon students. Center in Sector 51 (5 min). AIIMS faculty, 98% success. Call 88264-44334!',
    heroTitle: 'NEET Coaching for Sector 56 Gurgaon',
    heroSubtitle:
      'Top NEET preparation just 5 minutes from Sector 56. Join our Sector 51 center with AIIMS-trained faculty.',
    hasOfflineCenter: true,
    nearestCenter: {
      name: 'Gurugram NEET Center',
      address: 'M2K Corporate Park, Sector 51, Gurugram 122018',
      distance: '5 minutes from Sector 56',
    },
    localities: [
      { name: 'Sector 51', url: '/neet-coaching-gurgaon-sector-51' },
      { name: 'Sector 57', url: '/neet-coaching-gurgaon-sector-57' },
      { name: 'Golf Course Road', url: '/neet-coaching-golf-course-road-gurgaon' },
    ],
    relatedCities: [
      { name: 'Gurgaon NEET', url: '/neet-coaching-gurgaon' },
      { name: 'Sector 51 NEET', url: '/neet-coaching-gurgaon-sector-51' },
    ],
    faqs: [
      {
        question: 'Where can Sector 56 students attend NEET coaching?',
        answer:
          'Sector 56 students can attend our Sector 51 center at M2K Corporate Park, just 5 minutes away via Golf Course Extension Road.',
      },
      {
        question: 'Why choose Cerebrum for NEET from Sector 56?',
        answer:
          'Proximity (5 min), AIIMS faculty, small batches of 15-20, 98% NEET success rate, and comprehensive study material make us the best choice.',
      },
    ],
    stats: {
      studentsFromCity: '150+',
      successRate: '98%',
      rating: '4.9',
    },
    geoCoordinates: {
      lat: '28.4195',
      lng: '77.0866',
    },
  },

  'neet-coaching-gurgaon-sector-49': {
    slug: 'neet-coaching-gurgaon-sector-49',
    cityName: 'Sector 49 Gurgaon',
    stateName: 'Haryana',
    metaTitle: 'NEET Coaching in Sector 49 Gurgaon | Eldeco Acacia | Cerebrum Academy',
    metaDescription:
      'Best NEET coaching for Sector 49 Gurgaon, Eldeco Acacia, Uppal Southend. Center in Sector 51 (3 min). 98% success. Call 88264-44334!',
    heroTitle: 'NEET Coaching for Sector 49 Gurgaon',
    heroSubtitle:
      'Top NEET classes just 3 minutes from Sector 49. Perfect for Eldeco Acacia and Uppal Southend residents.',
    hasOfflineCenter: true,
    nearestCenter: {
      name: 'Gurugram NEET Center',
      address: 'M2K Corporate Park, Sector 51, Gurugram 122018',
      distance: '3 minutes from Sector 49',
    },
    localities: [
      { name: 'Eldeco Acacia', url: '/neet-coaching-gurgaon-sector-49' },
      { name: 'Uppal Southend', url: '/neet-coaching-gurgaon-sector-49' },
      { name: 'Sector 51', url: '/neet-coaching-gurgaon-sector-51' },
      { name: 'Sohna Road', url: '/neet-coaching-sohna-road-gurgaon' },
    ],
    relatedCities: [
      { name: 'Gurgaon NEET', url: '/neet-coaching-gurgaon' },
      { name: 'South City NEET', url: '/neet-coaching-south-city-gurgaon' },
    ],
    faqs: [
      {
        question: 'Is there NEET coaching near Eldeco Acacia Sector 49?',
        answer:
          'Yes! Our Sector 51 NEET center is just 3 minutes from Eldeco Acacia, Sector 49. Students from Eldeco Acacia, Uppal Southend, and nearby societies attend daily.',
      },
      {
        question: 'What NEET batches are available for Sector 49 students?',
        answer:
          'We offer Class 11 NEET Foundation, Class 12 NEET + Boards, and NEET Dropper batches. Multiple timing options available.',
      },
    ],
    stats: {
      studentsFromCity: '100+',
      successRate: '98%',
      rating: '4.9',
    },
    geoCoordinates: {
      lat: '28.4195',
      lng: '77.0566',
    },
  },

  'neet-coaching-gurgaon-sector-14': {
    slug: 'neet-coaching-gurgaon-sector-14',
    cityName: 'Sector 14 Gurgaon',
    stateName: 'Haryana',
    metaTitle: 'NEET Coaching in Sector 14 Gurgaon 2026 | Best Biology Classes | Cerebrum',
    metaDescription:
      'Top NEET coaching for Sector 14 Gurgaon students. Better alternative to crowded Sector 14 institutes. AIIMS faculty, small batches, 98% results. Call 88264-44334!',
    heroTitle: 'NEET Coaching for Sector 14 Gurgaon Students',
    heroSubtitle:
      'Looking for NEET coaching in Sector 14? Our Sector 51 center offers personalized attention with AIIMS faculty - just 20 minutes away.',
    hasOfflineCenter: true,
    nearestCenter: {
      name: 'Gurugram NEET Center',
      address: 'M2K Corporate Park, Sector 51, Gurugram 122018',
      distance: '20 minutes from Sector 14',
    },
    localities: [
      { name: 'Sector 14 Market', url: '/neet-coaching-gurgaon-sector-14' },
      { name: 'HUDA City Centre', url: '/neet-coaching-gurgaon-sector-14' },
      { name: 'Sector 15', url: '/neet-coaching-gurgaon-sector-14' },
      { name: 'Sector 17', url: '/neet-coaching-gurgaon-sector-14' },
      { name: 'MG Road', url: '/neet-coaching-mg-road-gurgaon' },
    ],
    relatedCities: [
      { name: 'Gurgaon NEET', url: '/neet-coaching-gurgaon' },
      { name: 'Sector 51 NEET', url: '/neet-coaching-gurgaon-sector-51' },
      { name: 'DLF NEET', url: '/neet-coaching-dlf-gurgaon' },
    ],
    faqs: [
      {
        question: 'Why choose Cerebrum over Sector 14 coaching institutes?',
        answer:
          'Sector 14 has crowded institutes with 60-100+ students per batch. At Cerebrum Sector 51, you get: 15-20 student batches, AIIMS-trained faculty (Dr. Shekhar Singh), 98% success rate, and personalized attention. Just 20 minutes from Sector 14.',
      },
      {
        question: 'Which coaching institutes are in Sector 14 Gurgaon?',
        answer:
          'Sector 14 has Aakash, Narayana, Equalsign, and others. While these offer all subjects, Cerebrum specializes in Biology (360/720 marks in NEET). Our focused approach in smaller batches delivers better results.',
      },
      {
        question: 'How far is Cerebrum from Sector 14?',
        answer:
          'Our M2K Corporate Park center in Sector 51 is just 20 minutes from Sector 14 via MG Road. Many Sector 14 residents prefer our smaller batches over the crowded Sector 14 institutes.',
      },
      {
        question: 'What are the fees compared to Sector 14 institutes?',
        answer:
          'Our fees start at ₹60,000/year vs ₹1.5-2 lakh at Aakash/Narayana. You get AIIMS faculty, smaller batches, and better results at 50-70% lower cost.',
      },
      {
        question: 'Is there online option for Sector 14 students?',
        answer:
          'Yes! Live online classes are available if you prefer studying from home. Same AIIMS faculty, same study material. Many Sector 14 students choose online to avoid travel.',
      },
    ],
    stats: {
      studentsFromCity: '150+',
      successRate: '98%',
      rating: '4.9',
    },
    geoCoordinates: {
      lat: '28.4651',
      lng: '77.0266',
    },
  },

  'neet-coaching-dlf-gurgaon': {
    slug: 'neet-coaching-dlf-gurgaon',
    cityName: 'DLF Gurgaon',
    stateName: 'Haryana',
    metaTitle: 'NEET Coaching in DLF Gurgaon | Phase 1-5 | Cyber City | Cerebrum Academy',
    metaDescription:
      'Best NEET coaching for DLF Phase 1, 2, 3, 4, 5 Gurgaon. Center in Sector 51. AIIMS faculty, 98% success. Book demo: 88264-44334',
    heroTitle: 'NEET Coaching for DLF Gurgaon Students',
    heroSubtitle:
      'Premium NEET preparation for DLF Phase 1-5 residents. Join our Sector 51 center or attend live online classes.',
    hasOfflineCenter: true,
    nearestCenter: {
      name: 'Gurugram NEET Center',
      address: 'M2K Corporate Park, Sector 51, Gurugram 122018',
      distance: '15-20 minutes from DLF areas',
    },
    localities: [
      { name: 'DLF Phase 1', url: '/neet-coaching-dlf-gurgaon' },
      { name: 'DLF Phase 2', url: '/neet-coaching-dlf-gurgaon' },
      { name: 'DLF Phase 3', url: '/neet-coaching-dlf-gurgaon' },
      { name: 'DLF Phase 4', url: '/neet-coaching-dlf-gurgaon' },
      { name: 'DLF Phase 5', url: '/neet-coaching-dlf-gurgaon' },
      { name: 'Cyber City', url: '/neet-coaching-dlf-gurgaon' },
    ],
    relatedCities: [
      { name: 'Gurgaon NEET', url: '/neet-coaching-gurgaon' },
      { name: 'Golf Course Road', url: '/neet-coaching-golf-course-road-gurgaon' },
      { name: 'MG Road', url: '/neet-coaching-mg-road-gurgaon' },
    ],
    faqs: [
      {
        question: 'Where can DLF students get NEET coaching in Gurgaon?',
        answer:
          'DLF students can attend our Sector 51 NEET center (15-20 min via Golf Course Road) or join our live online classes from home with AIIMS faculty.',
      },
      {
        question: 'Do you have students from DLF Phase areas?',
        answer:
          'Yes, 100+ students from all DLF phases attend our NEET classes. Many prefer hybrid mode - online on weekdays and offline on weekends.',
      },
    ],
    stats: {
      studentsFromCity: '100+',
      successRate: '98%',
      rating: '4.9',
    },
    geoCoordinates: {
      lat: '28.4695',
      lng: '77.0866',
    },
  },

  'neet-coaching-golf-course-road-gurgaon': {
    slug: 'neet-coaching-golf-course-road-gurgaon',
    cityName: 'Golf Course Road Gurgaon',
    stateName: 'Haryana',
    metaTitle: 'NEET Coaching on Golf Course Road Gurgaon | Magnolias Aralias | Cerebrum Academy',
    metaDescription:
      'Best NEET coaching near Golf Course Road Gurgaon. DLF Magnolias, Aralias, Camellias, Palm Springs. Center in Sector 51. Call 88264-44334!',
    heroTitle: 'NEET Coaching near Golf Course Road Gurgaon',
    heroSubtitle:
      'Premium NEET preparation on Golf Course Extension Road. Serving Magnolias, Aralias, Palm Springs, and all GCR societies.',
    hasOfflineCenter: true,
    nearestCenter: {
      name: 'Gurugram NEET Center',
      address: 'M2K Corporate Park, Sector 51, Gurugram 122018',
      distance: 'On Golf Course Extension Road',
    },
    localities: [
      { name: 'DLF Magnolias', url: '/neet-coaching-golf-course-road-gurgaon' },
      { name: 'DLF Aralias', url: '/neet-coaching-golf-course-road-gurgaon' },
      { name: 'DLF Camellias', url: '/neet-coaching-golf-course-road-gurgaon' },
      { name: 'Palm Springs', url: '/neet-coaching-golf-course-road-gurgaon' },
      { name: 'The Close', url: '/neet-coaching-nirvana-country-gurgaon' },
      { name: 'Ireo Skyon', url: '/neet-coaching-golf-course-road-gurgaon' },
    ],
    relatedCities: [
      { name: 'Gurgaon NEET', url: '/neet-coaching-gurgaon' },
      { name: 'Sector 51 NEET', url: '/neet-coaching-gurgaon-sector-51' },
      { name: 'DLF NEET', url: '/neet-coaching-dlf-gurgaon' },
    ],
    faqs: [
      {
        question: 'Where is NEET coaching center near Golf Course Road?',
        answer:
          'Our NEET center at M2K Corporate Park, Sector 51 is right on Golf Course Extension Road. Easy access from Magnolias, Aralias, Palm Springs, and all GCR societies.',
      },
      {
        question: 'Which premium societies do you serve for NEET?',
        answer:
          'We have students from DLF Magnolias, Aralias, Camellias, Palm Springs, The Close, Ireo Skyon, M3M Golf Estate, and all premium Golf Course Road condominiums.',
      },
    ],
    stats: {
      studentsFromCity: '150+',
      successRate: '98%',
      rating: '4.9',
    },
    geoCoordinates: {
      lat: '28.4395',
      lng: '77.0966',
    },
  },

  'neet-coaching-sohna-road-gurgaon': {
    slug: 'neet-coaching-sohna-road-gurgaon',
    cityName: 'Sohna Road Gurgaon',
    stateName: 'Haryana',
    metaTitle: 'NEET Coaching on Sohna Road Gurgaon | Central Park Vatika | Cerebrum Academy',
    metaDescription:
      'Best NEET coaching for Sohna Road Gurgaon. Central Park, Vatika City, BPTP, Bestech. Center in Sector 51 (10 min). Call 88264-44334!',
    heroTitle: 'NEET Coaching for Sohna Road Gurgaon',
    heroSubtitle:
      'Top NEET preparation for Sohna Road residents. Serving Central Park, Vatika, BPTP, and all Sohna Road societies.',
    hasOfflineCenter: true,
    nearestCenter: {
      name: 'Gurugram NEET Center',
      address: 'M2K Corporate Park, Sector 51, Gurugram 122018',
      distance: '10 minutes from Sohna Road',
    },
    localities: [
      { name: 'Central Park 1 & 2', url: '/neet-coaching-sohna-road-gurgaon' },
      { name: 'Vatika City', url: '/neet-coaching-sohna-road-gurgaon' },
      { name: 'BPTP Park Grandeura', url: '/neet-coaching-sohna-road-gurgaon' },
      { name: 'Bestech Park View', url: '/neet-coaching-sohna-road-gurgaon' },
      { name: 'M3M Merlin', url: '/neet-coaching-sohna-road-gurgaon' },
      { name: 'Emaar Emerald Hills', url: '/neet-coaching-sohna-road-gurgaon' },
    ],
    relatedCities: [
      { name: 'Gurgaon NEET', url: '/neet-coaching-gurgaon' },
      { name: 'South City NEET', url: '/neet-coaching-south-city-gurgaon' },
      { name: 'Sector 49 NEET', url: '/neet-coaching-gurgaon-sector-49' },
    ],
    faqs: [
      {
        question: 'Which is the best NEET coaching near Sohna Road Gurgaon?',
        answer:
          'Cerebrum Biology Academy in Sector 51 is the best choice for Sohna Road students. Just 10 minutes away, with AIIMS faculty and 98% success rate.',
      },
      {
        question: 'Do you have students from Central Park and Vatika?',
        answer:
          'Yes! Many students from Central Park 1 & 2, Vatika City, BPTP, Bestech Park View, M3M Merlin, and other Sohna Road societies attend our NEET classes.',
      },
    ],
    stats: {
      studentsFromCity: '120+',
      successRate: '98%',
      rating: '4.9',
    },
    geoCoordinates: {
      lat: '28.3995',
      lng: '77.0466',
    },
  },

  'neet-coaching-south-city-gurgaon': {
    slug: 'neet-coaching-south-city-gurgaon',
    cityName: 'South City Gurgaon',
    stateName: 'Haryana',
    metaTitle: 'NEET Coaching in South City Gurgaon | South City 1 & 2 | Cerebrum Academy',
    metaDescription:
      'Best NEET coaching for South City 1 & 2 Gurgaon students. Center in Sector 51 (12 min). AIIMS faculty, 98% success. Call 88264-44334!',
    heroTitle: 'NEET Coaching for South City Gurgaon',
    heroSubtitle:
      'Top NEET preparation for South City 1 & 2 residents. Our Sector 51 center is just 12 minutes away.',
    hasOfflineCenter: true,
    nearestCenter: {
      name: 'Gurugram NEET Center',
      address: 'M2K Corporate Park, Sector 51, Gurugram 122018',
      distance: '12 minutes from South City',
    },
    localities: [
      { name: 'South City 1', url: '/neet-coaching-south-city-gurgaon' },
      { name: 'South City 2', url: '/neet-coaching-south-city-gurgaon' },
      { name: 'Sohna Road', url: '/neet-coaching-sohna-road-gurgaon' },
      { name: 'Sector 49', url: '/neet-coaching-gurgaon-sector-49' },
    ],
    relatedCities: [
      { name: 'Gurgaon NEET', url: '/neet-coaching-gurgaon' },
      { name: 'Sohna Road NEET', url: '/neet-coaching-sohna-road-gurgaon' },
    ],
    faqs: [
      {
        question: 'How do South City students reach NEET coaching?',
        answer:
          'From South City 1 or 2, take Sohna Road to Sector 49, then 3 min to our Sector 51 NEET center. Total 12 minutes by car.',
      },
      {
        question: 'Are there students from South City at your NEET center?',
        answer:
          'Yes, 50+ students from South City 1 and South City 2 attend our NEET classes regularly due to proximity and quality of coaching.',
      },
    ],
    stats: {
      studentsFromCity: '50+',
      successRate: '98%',
      rating: '4.9',
    },
    geoCoordinates: {
      lat: '28.4095',
      lng: '77.0366',
    },
  },

  'neet-coaching-nirvana-country-gurgaon': {
    slug: 'neet-coaching-nirvana-country-gurgaon',
    cityName: 'Nirvana Country Gurgaon',
    stateName: 'Haryana',
    metaTitle: 'NEET Coaching in Nirvana Country Gurgaon | The Close | Cerebrum Academy',
    metaDescription:
      'Best NEET coaching for Nirvana Country, The Close South/North Gurgaon. Center in Sector 51 (8 min). AIIMS faculty. Call 88264-44334!',
    heroTitle: 'NEET Coaching for Nirvana Country Gurgaon',
    heroSubtitle:
      'Top NEET preparation for Nirvana Country and The Close residents. Just 8 minutes to our Sector 51 center.',
    hasOfflineCenter: true,
    nearestCenter: {
      name: 'Gurugram NEET Center',
      address: 'M2K Corporate Park, Sector 51, Gurugram 122018',
      distance: '8 minutes from Nirvana Country',
    },
    localities: [
      { name: 'Nirvana Country', url: '/neet-coaching-nirvana-country-gurgaon' },
      { name: 'The Close South', url: '/neet-coaching-nirvana-country-gurgaon' },
      { name: 'The Close North', url: '/neet-coaching-nirvana-country-gurgaon' },
      { name: 'Sector 50', url: '/neet-coaching-nirvana-country-gurgaon' },
      { name: 'Golf Course Road', url: '/neet-coaching-golf-course-road-gurgaon' },
    ],
    relatedCities: [
      { name: 'Gurgaon NEET', url: '/neet-coaching-gurgaon' },
      { name: 'Sector 51 NEET', url: '/neet-coaching-gurgaon-sector-51' },
      { name: 'Golf Course NEET', url: '/neet-coaching-golf-course-road-gurgaon' },
    ],
    faqs: [
      {
        question: 'Is there NEET coaching near Nirvana Country?',
        answer:
          'Yes! Our Sector 51 NEET center is just 8 minutes from Nirvana Country via Golf Course Extension Road. We serve Nirvana Country, The Close South/North, and nearby societies.',
      },
      {
        question: 'Why is Cerebrum best for Nirvana Country NEET students?',
        answer:
          'Proximity (8 min), AIIMS-trained faculty, small batches of 15-20 students, 98% success rate, and flexible batch timings make us ideal for Nirvana Country residents.',
      },
    ],
    stats: {
      studentsFromCity: '60+',
      successRate: '98%',
      rating: '4.9',
    },
    geoCoordinates: {
      lat: '28.4195',
      lng: '77.1066',
    },
  },

  faridabad: {
    slug: 'faridabad',
    cityName: 'Faridabad',
    stateName: 'Haryana',
    metaTitle: 'Biology Classes in Faridabad | Best NEET Biology Coaching | Cerebrum Academy',
    metaDescription:
      'Top biology classes in Faridabad for NEET & Boards. AIIMS-trained faculty, 98% success rate. Online classes + nearby Delhi centers. Book free demo!',
    heroTitle: 'Best Biology Classes in Faridabad',
    heroSubtitle:
      'Quality NEET biology coaching for Faridabad students. Online classes with option to attend Delhi centers.',
    hasOfflineCenter: false,
    nearestCenter: {
      name: 'South Delhi Center',
      address: 'Block D, South Extension Part 2, New Delhi',
      distance: '20-25 km from Faridabad',
    },
    localities: [
      { name: 'Sector 15', url: '/biology-classes-faridabad/sector-15' },
      { name: 'Sector 21', url: '/biology-classes-faridabad/sector-21' },
      { name: 'NIT Faridabad', url: '/biology-classes-faridabad/nit' },
      { name: 'Greater Faridabad', url: '/biology-classes-faridabad/greater-faridabad' },
      { name: 'Ballabgarh', url: '/biology-classes-faridabad/ballabgarh' },
    ],
    relatedCities: [
      { name: 'Delhi', url: '/biology-classes-delhi' },
      { name: 'Noida', url: '/biology-classes-noida' },
      { name: 'Gurgaon', url: '/biology-classes-gurgaon' },
      { name: 'Palwal', url: '/biology-classes-palwal' },
    ],
    faqs: [
      {
        question: 'Is there a biology coaching center in Faridabad?',
        answer:
          'We currently offer live online biology classes for Faridabad students. Our nearest offline center is in South Extension, Delhi (20-25 km). Many Faridabad students prefer our hybrid mode - attending online regularly and visiting Delhi center for tests.',
      },
      {
        question: 'How good are online biology classes for Faridabad students?',
        answer:
          'Our online classes are identical to offline in quality. Live interactive sessions, same AIIMS faculty, comprehensive study material, and 24/7 doubt support. Many of our top NEET scorers from Faridabad studied online.',
      },
      {
        question: 'What is the fee for Faridabad students?',
        answer:
          'Online biology classes for Faridabad students cost ₹35,000 to ₹60,000 per year. This is more affordable than local coaching with better faculty and results. Includes live classes, recorded access, and complete study material.',
      },
    ],
    stats: {
      studentsFromCity: '650+',
      successRate: '96%',
      rating: '4.8',
    },
    geoCoordinates: {
      lat: '28.4089',
      lng: '77.3178',
    },
    localContext: {
      nearbyLandmarks: 'Serving all Faridabad sectors, Ballabhgarh, and NIT areas. Nearest center: South Delhi (Ring Road).',
      transportOptions: 'Violet Line Metro to Badarpur Border, then auto to South Delhi center (30 min total). Online classes available for all Faridabad students.',
    },
    areaSpecificContent: {
      whyThisArea: 'Faridabad has 650+ NEET aspirants with limited quality Biology coaching options locally. Our hybrid model lets students attend online on weekdays and visit the South Delhi center for weekend doubt sessions. Many Faridabad students have topped NEET from our coaching — the Violet Line metro makes our center very accessible.',
    },
    studentSuccessStory: {
      name: 'Kavya R.',
      area: 'Sector 21C, Faridabad',
      achievement: 'NEET 2025 — 610/720, Safdarjung Hospital',
      quote: 'Faridabad doesn\'t have good Biology-specific coaching. Cerebrum\'s online classes + weekend offline sessions were perfect. I could study at home and still get that classroom interaction.',
    },
  },

  ghaziabad: {
    slug: 'ghaziabad',
    cityName: 'Ghaziabad',
    stateName: 'Uttar Pradesh',
    metaTitle: 'Biology Classes in Ghaziabad | Best NEET Coaching | Cerebrum Academy',
    metaDescription:
      'Best biology classes in Ghaziabad for NEET preparation. AIIMS faculty, 98% success rate. Online + Delhi offline options. Book free demo today!',
    heroTitle: 'Best Biology Classes in Ghaziabad',
    heroSubtitle:
      'Premium NEET biology coaching for Ghaziabad students. Learn from AIIMS faculty online or at our Delhi centers.',
    hasOfflineCenter: false,
    nearestCenter: {
      name: 'Rohini Center',
      address: '211 Vikas Surya Tower, DC Chauk, Rohini, Delhi',
      distance: '15-20 km from Ghaziabad',
    },
    localities: [
      { name: 'Indirapuram', url: '/biology-classes-ghaziabad/indirapuram' },
      { name: 'Vaishali', url: '/biology-classes-ghaziabad/vaishali' },
      { name: 'Kaushambi', url: '/biology-classes-ghaziabad/kaushambi' },
      { name: 'Raj Nagar', url: '/biology-classes-ghaziabad/raj-nagar' },
      { name: 'Vasundhara', url: '/biology-classes-ghaziabad/vasundhara' },
    ],
    relatedCities: [
      { name: 'Delhi', url: '/biology-classes-delhi' },
      { name: 'Noida', url: '/biology-classes-noida' },
      { name: 'Greater Noida', url: '/biology-classes-greater-noida' },
      { name: 'Meerut', url: '/biology-classes-meerut' },
    ],
    faqs: [
      {
        question: 'Which is the best biology coaching for Ghaziabad students?',
        answer:
          'Cerebrum Biology Academy is the top choice for Ghaziabad students. We offer live online classes and our Rohini center is just 15-20 km away. Our AIIMS-trained faculty and 98% success rate make us the preferred choice.',
      },
      {
        question: 'Can I attend offline classes from Ghaziabad?',
        answer:
          'Yes! Our Rohini center is easily accessible from Ghaziabad via metro (Red Line). Many Ghaziabad students attend our Rohini batches. You can also opt for hybrid mode - online + occasional offline.',
      },
      {
        question: 'What is the fee for Ghaziabad students?',
        answer:
          'Online classes are ₹35,000 to ₹60,000 per year. If you want to attend Rohini center offline, fees are ₹45,000 to ₹75,000. Both options include complete study material and test series.',
      },
    ],
    stats: {
      studentsFromCity: '550+',
      successRate: '98%',
      rating: '4.8',
    },
    geoCoordinates: {
      lat: '28.6692',
      lng: '77.4538',
    },
  },

  indirapuram: {
    slug: 'indirapuram',
    cityName: 'Indirapuram',
    stateName: 'Uttar Pradesh',
    metaTitle: 'Biology Classes in Indirapuram | Best NEET Coaching | Cerebrum Academy',
    metaDescription:
      'Best biology classes in Indirapuram for NEET preparation. AIIMS faculty, 98% success rate. Online + Rohini offline options. Book free demo: 88264-44334!',
    heroTitle: 'Best Biology Classes in Indirapuram',
    heroSubtitle:
      'Premium NEET biology coaching for Indirapuram students. Learn from AIIMS faculty online or at our Delhi centers.',
    hasOfflineCenter: false,
    nearestCenter: {
      name: 'Rohini DC Chauk Center',
      address: 'DC Chauk, Sector 9, Rohini, New Delhi',
      distance: '15-18 km from Indirapuram',
    },
    localities: [
      { name: 'Gyan Khand', url: '/biology-classes-ghaziabad' },
      { name: 'Ahinsa Khand', url: '/biology-classes-ghaziabad' },
      { name: 'Niti Khand', url: '/biology-classes-ghaziabad' },
      { name: 'Shakti Khand', url: '/biology-classes-ghaziabad' },
    ],
    relatedCities: [
      { name: 'Ghaziabad', url: '/biology-classes-ghaziabad' },
      { name: 'Vaishali', url: '/biology-classes-vaishali-ghaziabad' },
      { name: 'Crossings Republik', url: '/biology-classes-crossings-republik' },
      { name: 'Noida', url: '/biology-classes-noida' },
    ],
    faqs: [
      {
        question: 'Which is the best biology coaching for Indirapuram students?',
        answer:
          'Cerebrum Biology Academy is the top choice for Indirapuram students. We offer live online classes and our Rohini center is accessible via metro. Our AIIMS-trained faculty and 98% success rate make us the preferred choice.',
      },
      {
        question: 'Can I attend offline classes from Indirapuram?',
        answer:
          'Yes! Our Rohini center is accessible from Indirapuram via metro (Blue Line to Red Line). Many students also opt for hybrid mode - online classes with occasional offline sessions.',
      },
      {
        question: 'What batch timings work best for Indirapuram students?',
        answer:
          'Our online batches at 6 PM and 8 PM are most popular among Indirapuram students. Weekend offline batches at Rohini are also available for intensive sessions.',
      },
      {
        question: 'Do you provide study material for online students?',
        answer:
          'Absolutely! All students receive comprehensive study material, DPP sheets, test series, and recorded lectures for revision. The material is curated by AIIMS faculty for NEET-specific preparation.',
      },
    ],
    stats: {
      studentsFromCity: '450+',
      successRate: '98%',
      rating: '4.9',
    },
    geoCoordinates: {
      lat: '28.6353',
      lng: '77.3572',
    },
  },

  'crossings-republik': {
    slug: 'crossings-republik',
    cityName: 'Crossings Republik',
    stateName: 'Uttar Pradesh',
    metaTitle: 'Biology Classes in Crossings Republik | Best NEET Coaching | Cerebrum Academy',
    metaDescription:
      'Best biology classes in Crossings Republik for NEET preparation. AIIMS faculty, 98% success rate. Online + Rohini offline options. Book free demo today!',
    heroTitle: 'Best Biology Classes in Crossings Republik',
    heroSubtitle:
      'Premium NEET biology coaching for Crossings Republik students. Learn from AIIMS faculty online or at our Delhi centers.',
    hasOfflineCenter: false,
    nearestCenter: {
      name: 'Rohini DC Chauk Center',
      address: 'DC Chauk, Sector 9, Rohini, New Delhi',
      distance: '18-20 km from Crossings Republik',
    },
    localities: [
      { name: 'Gyan Khand', url: '/biology-classes-ghaziabad/indirapuram' },
      { name: 'Ahinsa Khand', url: '/biology-classes-ghaziabad/indirapuram' },
      { name: 'Shipra Sun City', url: '/biology-classes-ghaziabad/indirapuram' },
      { name: 'Mahagun Moderne', url: '/biology-classes-ghaziabad' },
    ],
    relatedCities: [
      { name: 'Ghaziabad', url: '/biology-classes-ghaziabad' },
      { name: 'Indirapuram', url: '/biology-classes-ghaziabad/indirapuram' },
      { name: 'Noida', url: '/biology-classes-noida' },
      { name: 'Delhi', url: '/biology-classes-delhi' },
    ],
    faqs: [
      {
        question: 'Which is the best biology coaching for Crossings Republik students?',
        answer:
          'Cerebrum Biology Academy is the top choice for Crossings Republik students. We offer live online classes and our Rohini center is accessible via NH24 and metro. Our AIIMS-trained faculty and 98% success rate make us the preferred choice.',
      },
      {
        question: 'Can I attend offline classes from Crossings Republik?',
        answer:
          'Yes! Our Rohini center is accessible from Crossings Republik. Many students also opt for our hybrid mode - online classes with occasional offline sessions for doubt clearing and tests.',
      },
      {
        question: 'What is the fee for Crossings Republik students?',
        answer:
          'Our fee structure is uniform across all locations. Contact 88264-44334 for current fee details and installment options. We also offer scholarships for meritorious students.',
      },
      {
        question: 'Do you provide study material for online students?',
        answer:
          'Absolutely! All students receive comprehensive study material, DPP sheets, test series, and recorded lectures for revision. The material is curated by AIIMS faculty for NEET-specific preparation.',
      },
    ],
    stats: {
      studentsFromCity: '200+',
      successRate: '98%',
      rating: '4.8',
    },
    geoCoordinates: {
      lat: '28.6350',
      lng: '77.4200',
    },
  },

  manesar: {
    slug: 'manesar',
    cityName: 'Manesar',
    stateName: 'Haryana',
    metaTitle: 'Biology Classes in Manesar | NEET Coaching Near IMT | Cerebrum Academy',
    metaDescription:
      'Best biology classes in Manesar for NEET preparation. Closest center in Gurgaon Sector 51 (10 km). AIIMS faculty, 98% success. Book free demo!',
    heroTitle: 'Best Biology Classes in Manesar',
    heroSubtitle:
      'Quality NEET biology coaching for Manesar students. Attend our nearby Gurgaon center or join online.',
    hasOfflineCenter: false,
    nearestCenter: {
      name: 'Gurugram Center',
      address: 'M2K Corporate Park, Sector 51, Gurugram',
      distance: '10-15 km from Manesar',
    },
    localities: [
      { name: 'IMT Manesar', url: '/biology-classes-manesar/imt' },
      { name: 'Sector 1', url: '/biology-classes-manesar/sector-1' },
      { name: 'Sector 8', url: '/biology-classes-manesar/sector-8' },
    ],
    relatedCities: [
      { name: 'Gurgaon', url: '/biology-classes-gurgaon' },
      { name: 'Rewari', url: '/biology-classes-rewari' },
      { name: 'Dharuhera', url: '/biology-classes-dharuhera' },
      { name: 'Bawal', url: '/biology-classes-bawal' },
    ],
    faqs: [
      {
        question: 'Is there a biology coaching in Manesar?',
        answer:
          'Our nearest center is in Gurgaon Sector 51, just 10-15 km from Manesar. Many Manesar students attend our Gurgaon center or join our live online classes for convenience.',
      },
      {
        question: 'How can Manesar students attend classes?',
        answer:
          'You have two options: 1) Attend our Gurgaon Sector 51 center (10-15 km), or 2) Join our live online classes from home. Both options have the same AIIMS faculty and curriculum.',
      },
    ],
    stats: {
      studentsFromCity: '150+',
      successRate: '96%',
      rating: '4.8',
    },
    geoCoordinates: {
      lat: '28.3592',
      lng: '76.9387',
    },
  },

  rewari: {
    slug: 'rewari',
    cityName: 'Rewari',
    stateName: 'Haryana',
    metaTitle: 'Biology Classes in Rewari | Best NEET Coaching | Cerebrum Academy',
    metaDescription:
      'Top biology classes in Rewari for NEET & Boards. AIIMS-trained faculty, 98% success rate. Online classes available. Book free demo today!',
    heroTitle: 'Best Biology Classes in Rewari',
    heroSubtitle:
      'Quality NEET biology coaching for Rewari students. Live online classes with AIIMS-trained faculty.',
    hasOfflineCenter: false,
    nearestCenter: {
      name: 'Gurugram Center',
      address: 'M2K Corporate Park, Sector 51, Gurugram',
      distance: '50-55 km from Rewari',
    },
    localities: [
      { name: 'Rewari City', url: '/biology-classes-rewari/city' },
      { name: 'Dharuhera', url: '/biology-classes-dharuhera' },
      { name: 'Bawal', url: '/biology-classes-bawal' },
    ],
    relatedCities: [
      { name: 'Gurgaon', url: '/biology-classes-gurgaon' },
      { name: 'Mahendragarh', url: '/biology-classes-mahendragarh' },
      { name: 'Bhiwani', url: '/biology-classes-bhiwani' },
      { name: 'Jhajjar', url: '/biology-classes-jhajjar' },
    ],
    faqs: [
      {
        question: 'Are there good biology classes available in Rewari?',
        answer:
          'Cerebrum Biology Academy offers live online biology classes for Rewari students. Our AIIMS-trained faculty provides the same quality education as Delhi coaching centers. No need to travel - learn from home!',
      },
      {
        question: 'How do online classes work for Rewari students?',
        answer:
          'Our online classes are live and interactive. You join via Zoom/app, interact with faculty in real-time, ask questions, and get instant doubt resolution. Classes are scheduled at convenient times.',
      },
      {
        question: 'What is the fee for Rewari students?',
        answer:
          'Online biology classes for Rewari students are ₹35,000 to ₹60,000 per year - much more affordable than traveling to Delhi for coaching. Includes live classes, recordings, study material, and test series.',
      },
    ],
    stats: {
      studentsFromCity: '100+',
      successRate: '95%',
      rating: '4.7',
    },
    geoCoordinates: {
      lat: '28.1973',
      lng: '76.6195',
    },
  },

  mahendragarh: {
    slug: 'mahendragarh',
    cityName: 'Mahendragarh',
    stateName: 'Haryana',
    metaTitle: 'Biology Classes in Mahendragarh | NEET Coaching Online | Cerebrum Academy',
    metaDescription:
      'Best online biology classes for Mahendragarh students. AIIMS-trained faculty, 98% success rate. NEET & Board preparation. Book free demo!',
    heroTitle: 'Best Biology Classes in Mahendragarh',
    heroSubtitle:
      'Premium NEET biology coaching for Mahendragarh students. Live online classes from AIIMS faculty.',
    hasOfflineCenter: false,
    nearestCenter: {
      name: 'Gurugram Center',
      address: 'M2K Corporate Park, Sector 51, Gurugram',
      distance: '100+ km from Mahendragarh',
    },
    localities: [
      { name: 'Mahendragarh City', url: '/biology-classes-mahendragarh/city' },
      { name: 'Narnaul', url: '/biology-classes-narnaul' },
      { name: 'Ateli', url: '/biology-classes-mahendragarh/ateli' },
    ],
    relatedCities: [
      { name: 'Rewari', url: '/biology-classes-rewari' },
      { name: 'Bhiwani', url: '/biology-classes-bhiwani' },
      { name: 'Gurgaon', url: '/biology-classes-gurgaon' },
      { name: 'Jaipur', url: '/biology-classes-jaipur' },
    ],
    faqs: [
      {
        question: 'Can students from Mahendragarh get quality NEET coaching?',
        answer:
          'Absolutely! Cerebrum Biology Academy offers live online classes specifically designed for students in smaller cities like Mahendragarh. You get the same AIIMS faculty and curriculum as Delhi students.',
      },
      {
        question: 'Why should I choose online coaching for Mahendragarh?',
        answer:
          'Online coaching gives you access to Delhi-quality education without traveling. Save time and money while learning from AIIMS-trained faculty. Our Mahendragarh students have scored 600+ in NEET.',
      },
      {
        question: 'What is the fee for Mahendragarh students?',
        answer:
          'Online biology classes are ₹35,000 to ₹60,000 per year. This is a fraction of what you would spend on coaching + travel + accommodation in Delhi. Best quality at best price!',
      },
    ],
    stats: {
      studentsFromCity: '50+',
      successRate: '98%',
      rating: '4.7',
    },
    geoCoordinates: {
      lat: '28.2786',
      lng: '76.1558',
    },
  },

  'south-delhi': {
    slug: 'south-delhi',
    cityName: 'South Delhi',
    stateName: 'Delhi',
    metaTitle: 'Biology Coaching South Delhi | Class 9-12, NEET, Olympiad | Ring Road Center',
    metaDescription:
      'Best biology coaching in South Delhi at Ring Road, South Extension 2. Classes for Class 9, 10, 11, 12, NEET, Boards & Olympiads. Online/Offline/Hybrid. Near South Extension Metro. Book free demo!',
    heroTitle: 'Best Biology Coaching in South Delhi',
    heroSubtitle:
      'Premier center at Ring Road, South Extension 2. Class 9-12, NEET, Board Exams & Biology Olympiad prep. 5 min from South Extension Metro!',
    hasOfflineCenter: true,
    nearestCenter: {
      name: 'South Delhi Center (Ring Road)',
      address: 'Ring Road, South Extension Part 2, Near South Extension Metro, New Delhi 110049',
      distance: 'South Extension Metro - 5 min walk',
    },
    localities: [
      { name: 'South Extension 2 (Ring Road)', url: '/neet-coaching-south-extension-delhi' },
      { name: 'Greater Kailash', url: '/biology-classes-south-delhi/gk' },
      { name: 'Lajpat Nagar', url: '/biology-classes-south-delhi/lajpat-nagar' },
      { name: 'Defence Colony', url: '/biology-classes-south-delhi/defence-colony' },
      { name: 'Hauz Khas', url: '/biology-classes-south-delhi/hauz-khas' },
      { name: 'Saket', url: '/biology-classes-south-delhi/saket' },
      { name: 'Malviya Nagar', url: '/biology-classes-south-delhi/malviya-nagar' },
      { name: 'Vasant Kunj', url: '/biology-classes-south-delhi/vasant-kunj' },
      { name: 'Vasant Vihar', url: '/best-biology-tuition-vasant-vihar' },
      { name: 'CR Park', url: '/best-biology-tuition-cr-park' },
      { name: 'RK Puram', url: '/best-biology-tuition-rk-puram' },
    ],
    relatedCities: [
      { name: 'Delhi', url: '/biology-classes-delhi' },
      { name: 'Noida', url: '/biology-classes-noida' },
      { name: 'Faridabad', url: '/biology-classes-faridabad' },
      { name: 'Gurgaon', url: '/biology-classes-gurgaon' },
    ],
    faqs: [
      {
        question: 'Where is your biology coaching center in South Delhi?',
        answer:
          'Our South Delhi center is at Ring Road, South Extension Part 2, New Delhi 110049. It is just 5 minutes walk from South Extension Metro Station (Pink Line). Students from GK, Lajpat Nagar, Defence Colony, Sarojini Nagar, and all South Delhi localities attend here.',
      },
      {
        question: 'Do you offer biology classes for Class 9 and 10 in South Delhi?',
        answer:
          'Yes! We have dedicated foundation batches for Class 9 and 10 students covering CBSE/ICSE Biology, NTSE Biology, and foundation for future NEET preparation. These classes build strong fundamentals for competitive exams.',
      },
      {
        question: 'Do you have Biology Olympiad coaching in South Delhi?',
        answer:
          'Absolutely! We offer specialized coaching for NSEB (National Standard Examination in Biology), INBO, and IBO (International Biology Olympiad). Our students have qualified for national and international olympiads.',
      },
      {
        question: 'What class modes are available at South Delhi center?',
        answer:
          'We offer three modes: Offline (in-person at Ring Road center), Online (live interactive classes), and Hybrid (combine both). Choose what suits your schedule. Weekend and evening batches available.',
      },
      {
        question: 'What is the fee for biology coaching in South Delhi?',
        answer:
          'Class 9-10: ₹25,000-40,000/year | Class 11-12: ₹45,000-75,000/year | NEET Dropper: ₹60,000-85,000/year | Olympiad: ₹30,000-50,000/year. EMI options available. Call 88264-44334.',
      },
    ],
    stats: {
      studentsFromCity: '1,500+',
      successRate: '98%',
      rating: '4.9',
    },
    geoCoordinates: {
      lat: '28.5732',
      lng: '77.2189',
    },
    localContext: {
      nearbyLandmarks: 'Near Select Citywalk Mall, 5 min walk from South Extension Metro (Pink Line). Opposite Masjid Moth.',
      transportOptions: 'Pink Line to South Extension Metro, then 5 min walk. Auto from AIIMS Metro (15 min). Bus routes 502, 522 stop at Ring Road.',
    },
    areaSpecificContent: {
      whyThisArea: 'South Delhi is home to some of India\'s top schools — DPS RK Puram, Sanskriti School, Modern School, Sardar Patel Vidyalaya. Our Ring Road center serves 1,students from GK, Lajpat Nagar, Defence Colony, and surrounding areas. The location was chosen specifically for its metro connectivity, making it accessible from Hauz Khas to Nehru Place.',
    },
    studentSuccessStory: {
      name: 'Ananya S.',
      area: 'Greater Kailash',
      achievement: 'NEET 2025 — 680/720, AIIMS Delhi',
      quote: 'The South Extension center was just 10 minutes from my home in GK. Dr. Shekhar Sir\'s teaching made Biology my strongest subject. I scored 360/360 in Biology!',
    },
    competitorComparison: {
      localAlternatives: 'Aakash South Ex, Allen South Delhi, Physics Wallah offline center',
      differentiator: 'Only AIIMS-alumni faculty in South Delhi. 15-20 student batches vs 60+ at Aakash/Allen. Personalized doubt resolution via WhatsApp, not just classroom hours.',
    },
  },

  rohini: {
    slug: 'rohini',
    cityName: 'Rohini',
    stateName: 'Delhi',
    metaTitle: 'Biology Classes in Rohini | Best NEET Coaching DC Chauk | Cerebrum Academy',
    metaDescription:
      'Top biology classes in Rohini at Vikas Surya Tower, DC Chauk. AIIMS faculty, 98% success rate. Near Metro. Book free demo class!',
    heroTitle: 'Best Biology Classes in Rohini',
    heroSubtitle: 'Our flagship center at DC Chauk, Sector 9. Right next to metro station!',
    hasOfflineCenter: true,
    nearestCenter: {
      name: 'Rohini Center',
      address: '211 Vikas Surya Tower, DC Chauk, Sector 9, Rohini, Delhi 110085',
      distance: 'DC Chauk, Rohini',
    },
    localities: [
      { name: 'Sector 9', url: '/biology-classes-rohini/sector-9' },
      { name: 'Sector 7', url: '/biology-classes-rohini/sector-7' },
      { name: 'Pitampura', url: '/biology-classes-rohini/pitampura' },
      { name: 'Shalimar Bagh', url: '/biology-classes-rohini/shalimar-bagh' },
      { name: 'Model Town', url: '/biology-classes-rohini/model-town' },
      { name: 'Ashok Vihar', url: '/biology-classes-rohini/ashok-vihar' },
      { name: 'Prashant Vihar', url: '/biology-classes-rohini/prashant-vihar' },
      { name: 'Paschim Vihar', url: '/biology-classes-rohini/paschim-vihar' },
    ],
    relatedCities: [
      { name: 'Delhi', url: '/biology-classes-delhi' },
      { name: 'Ghaziabad', url: '/biology-classes-ghaziabad' },
      { name: 'North Delhi', url: '/neet-coaching-north-delhi' },
      { name: 'West Delhi', url: '/neet-coaching-west-delhi' },
    ],
    faqs: [
      {
        question: 'Where exactly is the Rohini biology coaching center?',
        answer:
          'Our Rohini center is at 211 Vikas Surya Tower, DC Chauk, Sector 9, Rohini, Delhi 110085. It is right next to DC Chauk Metro Station (Red Line). Just exit the metro and walk 2 minutes to reach us!',
      },
      {
        question: 'Why is Rohini center the most popular?',
        answer:
          'Rohini is our flagship center with the largest student strength (850+ students). It is easily accessible via Red Line Metro, has excellent infrastructure, and is where Dr. Shekhar Sir personally teaches several batches.',
      },
      {
        question: 'Which areas does Rohini center serve?',
        answer:
          'Students from Rohini, Pitampura, Shalimar Bagh, Model Town, Ashok Vihar, Prashant Vihar, Paschim Vihar, and even Ghaziabad (via metro) attend our Rohini center. We also have students from Sonipat who travel by metro.',
      },
      {
        question: 'What is the fee at Rohini center?',
        answer:
          'Biology coaching at Rohini center is ₹45,000 to ₹75,000 per year. This includes live classes, comprehensive study material, weekly tests, mock exams, and unlimited doubt sessions. EMI options available.',
      },
    ],
    stats: {
      studentsFromCity: '1,200+',
      successRate: '98%',
      rating: '4.9',
    },
    geoCoordinates: {
      lat: '28.7143',
      lng: '77.1117',
    },
    localContext: {
      nearbyLandmarks: 'Near DC Chowk, Sector 7 Rohini. Adjacent to Rohini West Metro Station (Red Line). Opposite Metro Pillar 397.',
      transportOptions: 'Red Line to Rohini West Metro, then 2 min walk. Also accessible from Rithala Metro. Bus routes 871, 908 stop at DC Chowk.',
    },
    areaSpecificContent: {
      whyThisArea: 'Rohini is North Delhi\'s largest planned residential area with 1,200+ NEET aspirants. Our DC Chowk center serves students from all 25 Rohini sectors, Pitampura, Model Town, Shalimar Bagh, and even Sonipat (via Red Line). The center is strategically located at the Red Line metro, making it the most accessible biology coaching in North-West Delhi.',
    },
    studentSuccessStory: {
      name: 'Priya K.',
      area: 'Sector 16, Rohini',
      achievement: 'NEET 2025 — 645/720, Lady Hardinge Medical College',
      quote: 'I used to travel to South Delhi for coaching but the 2-hour commute was draining. Cerebrum Rohini saved me 4 hours daily. Used that time for self-study and cracked NEET in first attempt!',
    },
    competitorComparison: {
      localAlternatives: 'Aakash Rohini, Allen Pitampura, FIITJEE Rohini',
      differentiator: 'Only Biology-specialist institute in North Delhi. AIIMS-trained Dr. Shekhar Sir teaches directly. Batches of 15 vs 100+ at Aakash/Allen Rohini. Weekend batches for school-going students.',
    },
  },

  dwarka: {
    slug: 'dwarka',
    cityName: 'Dwarka',
    stateName: 'Delhi',
    metaTitle: 'Biology Classes in Dwarka | Best NEET Coaching Dwarka Delhi | Cerebrum Academy',
    metaDescription:
      'Top biology classes in Dwarka, Delhi for NEET & Boards. AIIMS faculty, 98% success rate. Near Dwarka Sector 21 Metro. Book free demo! Call 88264-44334',
    heroTitle: 'Best Biology Classes in Dwarka',
    heroSubtitle:
      "Delhi's #1 coaching hub now has premium NEET biology coaching. Learn from AIIMS-trained faculty.",
    hasOfflineCenter: false,
    nearestCenter: {
      name: 'South Delhi Center',
      address: 'Block D, South Extension Part 2, New Delhi',
      distance: '25-30 km from Dwarka (Blue Line Metro)',
    },
    localities: [
      { name: 'Dwarka Sector 21', url: '/biology-classes-dwarka/sector-21' },
      { name: 'Dwarka Sector 12', url: '/biology-classes-dwarka/sector-12' },
      { name: 'Dwarka Sector 7', url: '/biology-classes-dwarka/sector-7' },
      { name: 'Dwarka Mor', url: '/biology-classes-dwarka/dwarka-mor' },
      { name: 'Janakpuri', url: '/biology-classes-janakpuri' },
      { name: 'Uttam Nagar', url: '/biology-classes-uttam-nagar' },
    ],
    relatedCities: [
      { name: 'Delhi', url: '/biology-classes-delhi' },
      { name: 'Janakpuri', url: '/biology-classes-janakpuri' },
      { name: 'Gurgaon', url: '/biology-classes-gurgaon' },
      { name: 'West Delhi', url: '/neet-coaching-west-delhi' },
    ],
    faqs: [
      {
        question: 'Which is the best biology coaching in Dwarka for NEET?',
        answer:
          'Cerebrum Biology Academy offers premium NEET biology coaching for Dwarka students. We provide live online classes with AIIMS-trained faculty. Students can also attend our South Delhi center via Blue Line Metro. Call 88264-44334 for details.',
      },
      {
        question: 'Is there offline biology coaching available in Dwarka?',
        answer:
          'We offer live online classes for Dwarka students. Our South Delhi center is accessible via Blue Line Metro (45 mins from Dwarka Sector 21). Many Dwarka students prefer our hybrid mode - online regular classes with weekend offline sessions.',
      },
      {
        question: 'What is the fee for biology classes for Dwarka students?',
        answer:
          'Online biology classes for Dwarka students are ₹35,000 to ₹60,000 per year. This includes live interactive classes, study material, test series, and doubt support. EMI options available. Call 88264-44334.',
      },
      {
        question: 'How can I join biology classes from Dwarka?',
        answer:
          'Call us at 88264-44334 or book a free demo at cerebrumbiologyacademy.com. We offer online classes for Dwarka students with flexible timing options.',
      },
    ],
    stats: {
      studentsFromCity: '450+',
      successRate: '98%',
      rating: '4.8',
    },
    geoCoordinates: {
      lat: '28.5921',
      lng: '77.0460',
    },
  },

  pitampura: {
    slug: 'pitampura',
    cityName: 'Pitampura',
    stateName: 'Delhi',
    metaTitle: 'Biology Classes in Pitampura | Best NEET Coaching | Cerebrum Academy',
    metaDescription:
      'Best biology classes in Pitampura, Delhi. Near Rohini center (10 mins). AIIMS faculty, 98% success. NEET & Board prep. Call 88264-44334 for demo!',
    heroTitle: 'Best Biology Classes in Pitampura',
    heroSubtitle:
      'Just 10 minutes from our Rohini center! Premium NEET biology coaching for Pitampura students.',
    hasOfflineCenter: false,
    nearestCenter: {
      name: 'Rohini Center',
      address: '211 Vikas Surya Tower, DC Chauk, Rohini',
      distance: '5-10 km from Pitampura (Red Line)',
    },
    localities: [
      { name: 'Pitampura Main', url: '/biology-classes-pitampura' },
      { name: 'Kohat Enclave', url: '/biology-classes-pitampura/kohat-enclave' },
      { name: 'Rohini', url: '/biology-classes-rohini' },
      { name: 'Shalimar Bagh', url: '/biology-classes-shalimar-bagh' },
      { name: 'Model Town', url: '/biology-classes-model-town' },
    ],
    relatedCities: [
      { name: 'Rohini', url: '/biology-classes-rohini' },
      { name: 'Delhi', url: '/biology-classes-delhi' },
      { name: 'Shalimar Bagh', url: '/biology-classes-shalimar-bagh' },
      { name: 'North Delhi', url: '/neet-coaching-north-delhi' },
    ],
    faqs: [
      {
        question: 'Where is the nearest biology coaching center from Pitampura?',
        answer:
          'Our Rohini center at DC Chauk is just 5-10 km from Pitampura, easily accessible via Red Line Metro. Many Pitampura students attend our Rohini center. Call 88264-44334 for directions.',
      },
      {
        question: 'What are the batch timings for Pitampura students?',
        answer:
          'At our Rohini center, we have morning (8-10 AM), afternoon (2-4 PM), and evening (6-8 PM) batches. Weekend batches also available. Choose timing that suits you best!',
      },
      {
        question: 'What is the fee for Pitampura students?',
        answer:
          'Biology coaching at Rohini center is ₹45,000 to ₹75,000 per year. Online option is ₹35,000 to ₹60,000. Both include complete study material and test series. Call 88264-44334.',
      },
    ],
    stats: {
      studentsFromCity: '350+',
      successRate: '98%',
      rating: '4.9',
    },
    geoCoordinates: {
      lat: '28.7041',
      lng: '77.1344',
    },
  },

  'prashant-vihar': {
    slug: 'prashant-vihar',
    cityName: 'Prashant Vihar',
    stateName: 'Delhi',
    metaTitle: 'NEET Coaching Prashant Vihar | Biology Classes Rohini | Cerebrum Academy',
    metaDescription:
      'Best NEET coaching for Prashant Vihar students. Near Rohini DC Chauk center. AIIMS faculty, 98% success. WhatsApp 88264-44334',
    heroTitle: 'Best NEET Coaching in Prashant Vihar',
    heroSubtitle:
      'Just 10 minutes from our Rohini DC Chauk center! Premium NEET biology coaching for Prashant Vihar students.',
    hasOfflineCenter: false,
    nearestCenter: {
      name: 'Rohini Center',
      address: '211 Vikas Surya Tower, DC Chauk, Rohini',
      distance: '5-10 km from Prashant Vihar',
    },
    localities: [
      { name: 'Prashant Vihar', url: '/neet-coaching-prashant-vihar' },
      { name: 'Rohini Sector 14', url: '/neet-coaching-rohini-sector-14' },
      { name: 'Rohini Sector 15', url: '/neet-coaching-rohini-sector-15' },
      { name: 'Shalimar Bagh', url: '/biology-classes-shalimar-bagh' },
      { name: 'Pitampura', url: '/biology-classes-pitampura' },
    ],
    relatedCities: [
      { name: 'Rohini', url: '/biology-classes-rohini' },
      { name: 'Delhi', url: '/biology-classes-delhi' },
      { name: 'Shalimar Bagh', url: '/biology-classes-shalimar-bagh' },
      { name: 'Pitampura', url: '/biology-classes-pitampura' },
    ],
    faqs: [
      {
        question: 'Where is the nearest NEET coaching center from Prashant Vihar?',
        answer:
          'Our Rohini center at DC Chauk is just 5-10 km from Prashant Vihar, easily accessible via metro. Many Prashant Vihar students attend our flagship Rohini center. Call 88264-44334 for directions.',
      },
      {
        question: 'What are the batch timings for Prashant Vihar students?',
        answer:
          'At our Rohini center, we have morning (8-10 AM), afternoon (2-4 PM), and evening (6-8 PM) batches. Weekend batches also available. Choose timing that suits you best!',
      },
      {
        question: 'What is the fee for NEET coaching for Prashant Vihar students?',
        answer:
          'Biology coaching at Rohini center is Rs 45,000 to Rs 75,000 per year. Online option is Rs 35,000 to Rs 60,000. Both include complete study material and test series. Call 88264-44334.',
      },
      {
        question: 'Why should Prashant Vihar students choose Cerebrum Academy?',
        answer:
          'With AIIMS-trained faculty, 98% success rate, and proximity to DC Chauk Rohini center, Cerebrum is the best choice for Prashant Vihar students. Our small batch sizes ensure personal attention.',
      },
    ],
    stats: {
      studentsFromCity: '280+',
      successRate: '98%',
      rating: '4.9',
    },
    geoCoordinates: {
      lat: '28.7125',
      lng: '77.1438',
    },
  },

  'karol-bagh': {
    slug: 'karol-bagh',
    cityName: 'Karol Bagh',
    stateName: 'Delhi',
    metaTitle: 'Biology Classes in Karol Bagh | Best NEET Coaching Delhi | Cerebrum Academy',
    metaDescription:
      'Top biology classes in Karol Bagh, Delhi for NEET preparation. AIIMS-trained faculty, 98% success rate. Book free demo! Call 88264-44334',
    heroTitle: 'Best Biology Classes in Karol Bagh',
    heroSubtitle:
      'Historic coaching hub meets modern NEET preparation. AIIMS faculty, proven results.',
    hasOfflineCenter: false,
    nearestCenter: {
      name: 'South Delhi Center',
      address: 'Block D, South Extension Part 2, New Delhi',
      distance: '10-12 km from Karol Bagh',
    },
    localities: [
      { name: 'Karol Bagh Main', url: '/biology-classes-karol-bagh' },
      { name: 'Rajinder Nagar', url: '/neet-coaching-rajinder-nagar' },
      { name: 'Patel Nagar', url: '/biology-classes-patel-nagar' },
      { name: 'Connaught Place', url: '/biology-classes-karol-bagh/cp' },
    ],
    relatedCities: [
      { name: 'Delhi', url: '/biology-classes-delhi' },
      { name: 'South Delhi', url: '/biology-classes-south-delhi' },
      { name: 'Rajinder Nagar', url: '/neet-coaching-rajinder-nagar' },
      { name: 'Patel Nagar', url: '/biology-classes-patel-nagar' },
    ],
    faqs: [
      {
        question: 'Is there good biology coaching available in Karol Bagh?',
        answer:
          'Cerebrum Biology Academy offers premium NEET biology coaching for Karol Bagh students. We provide online classes and our South Delhi center is easily accessible. Call 88264-44334 for demo.',
      },
      {
        question: 'Why choose Cerebrum over local Karol Bagh coaching?',
        answer:
          'Unlike local coaching, we have AIIMS-trained faculty with 98% success rate. Our structured NCERT-focused curriculum and small batch sizes ensure better results. Call 88264-44334.',
      },
      {
        question: 'What is the fee for Karol Bagh students?',
        answer:
          'Online classes are ₹35,000 to ₹60,000 per year. Offline at South Delhi center is ₹45,000 to ₹75,000. Better faculty than local coaching at competitive rates. Call 88264-44334.',
      },
    ],
    stats: {
      studentsFromCity: '280+',
      successRate: '98%',
      rating: '4.8',
    },
    geoCoordinates: {
      lat: '28.6519',
      lng: '77.1909',
    },
  },

  'laxmi-nagar': {
    slug: 'laxmi-nagar',
    cityName: 'Laxmi Nagar',
    stateName: 'Delhi',
    metaTitle: 'Biology Classes in Laxmi Nagar | Best NEET Coaching East Delhi | Cerebrum Academy',
    metaDescription:
      'Best biology classes in Laxmi Nagar, East Delhi. AIIMS faculty, 98% success rate. Online + offline options. Book free demo! Call 88264-44334',
    heroTitle: 'Best Biology Classes in Laxmi Nagar',
    heroSubtitle:
      "East Delhi's top NEET biology coaching. AIIMS-trained faculty, proven 98% success rate.",
    hasOfflineCenter: false,
    nearestCenter: {
      name: 'Rohini Center',
      address: '211 Vikas Surya Tower, DC Chauk, Rohini',
      distance: '15-20 km from Laxmi Nagar',
    },
    localities: [
      { name: 'Laxmi Nagar Main', url: '/biology-classes-laxmi-nagar' },
      { name: 'Preet Vihar', url: '/biology-classes-preet-vihar' },
      { name: 'Nirman Vihar', url: '/biology-classes-laxmi-nagar/nirman-vihar' },
      { name: 'Krishna Nagar', url: '/biology-classes-laxmi-nagar/krishna-nagar' },
      { name: 'Mayur Vihar', url: '/biology-classes-mayur-vihar' },
    ],
    relatedCities: [
      { name: 'Delhi', url: '/biology-classes-delhi' },
      { name: 'East Delhi', url: '/neet-coaching-east-delhi' },
      { name: 'Preet Vihar', url: '/biology-classes-preet-vihar' },
      { name: 'Noida', url: '/biology-classes-noida' },
    ],
    faqs: [
      {
        question: 'Which is the best biology coaching in Laxmi Nagar?',
        answer:
          'Cerebrum Biology Academy is the top choice for Laxmi Nagar students. We offer online classes and access to our Delhi centers. AIIMS-trained faculty with 98% success rate. Call 88264-44334.',
      },
      {
        question: 'Is online coaching effective for Laxmi Nagar students?',
        answer:
          'Absolutely! Our live online classes are identical to offline in quality. Many of our NEET toppers from East Delhi studied online. Call 88264-44334 for a free demo.',
      },
      {
        question: 'What is the fee for Laxmi Nagar students?',
        answer:
          'Online biology classes are ₹35,000 to ₹60,000 per year. Includes live classes, study material, tests, and doubt support. Much better value than local coaching. Call 88264-44334.',
      },
    ],
    stats: {
      studentsFromCity: '520+',
      successRate: '98%',
      rating: '4.8',
    },
    geoCoordinates: {
      lat: '28.6304',
      lng: '77.2770',
    },
  },

  'preet-vihar': {
    slug: 'preet-vihar',
    cityName: 'Preet Vihar',
    stateName: 'Delhi',
    metaTitle: 'Biology Classes in Preet Vihar | NEET Coaching East Delhi | Cerebrum Academy',
    metaDescription:
      'Top biology classes in Preet Vihar, East Delhi. AIIMS-trained faculty, 98% success. Online & offline options. Call 88264-44334 for free demo!',
    heroTitle: 'Best Biology Classes in Preet Vihar',
    heroSubtitle:
      'Premium NEET biology coaching for East Delhi students. Learn from AIIMS faculty.',
    hasOfflineCenter: false,
    nearestCenter: {
      name: 'Rohini Center',
      address: '211 Vikas Surya Tower, DC Chauk, Rohini',
      distance: '20 km from Preet Vihar',
    },
    localities: [
      { name: 'Preet Vihar Main', url: '/biology-classes-preet-vihar' },
      { name: 'Laxmi Nagar', url: '/biology-classes-laxmi-nagar' },
      { name: 'Mayur Vihar', url: '/biology-classes-mayur-vihar' },
      { name: 'Karkardooma', url: '/biology-classes-preet-vihar/karkardooma' },
    ],
    relatedCities: [
      { name: 'Delhi', url: '/biology-classes-delhi' },
      { name: 'Laxmi Nagar', url: '/biology-classes-laxmi-nagar' },
      { name: 'East Delhi', url: '/neet-coaching-east-delhi' },
      { name: 'Ghaziabad', url: '/biology-classes-ghaziabad' },
    ],
    faqs: [
      {
        question: 'Is there good NEET biology coaching in Preet Vihar?',
        answer:
          'Cerebrum Biology Academy offers top-quality NEET coaching for Preet Vihar students via online classes. AIIMS-trained faculty with 98% success rate. Call 88264-44334.',
      },
      {
        question: 'Can Preet Vihar students attend offline classes?',
        answer:
          'Yes! Our Rohini center is accessible via Blue Line Metro. Many East Delhi students prefer our hybrid mode - online regular + weekend offline. Call 88264-44334.',
      },
    ],
    stats: {
      studentsFromCity: '320+',
      successRate: '98%',
      rating: '4.8',
    },
    geoCoordinates: {
      lat: '28.6425',
      lng: '77.2939',
    },
  },

  'mayur-vihar': {
    slug: 'mayur-vihar',
    cityName: 'Mayur Vihar',
    stateName: 'Delhi',
    metaTitle: 'Biology Classes in Mayur Vihar | NEET Coaching East Delhi | Cerebrum Academy',
    metaDescription:
      'Best biology classes in Mayur Vihar, East Delhi. AIIMS faculty, 98% success rate. Near Noida border. Book free demo! Call 88264-44334',
    heroTitle: 'Best Biology Classes in Mayur Vihar',
    heroSubtitle: "East Delhi's largest residential area gets premium NEET biology coaching.",
    hasOfflineCenter: false,
    nearestCenter: {
      name: 'South Delhi Center',
      address: 'Block D, South Extension Part 2, New Delhi',
      distance: '15 km from Mayur Vihar',
    },
    localities: [
      { name: 'Mayur Vihar Phase 1', url: '/biology-classes-mayur-vihar/phase-1' },
      { name: 'Mayur Vihar Phase 2', url: '/biology-classes-mayur-vihar/phase-2' },
      { name: 'Mayur Vihar Phase 3', url: '/biology-classes-mayur-vihar/phase-3' },
      { name: 'Noida Sector 18', url: '/biology-classes-noida' },
      { name: 'Preet Vihar', url: '/biology-classes-preet-vihar' },
    ],
    relatedCities: [
      { name: 'Delhi', url: '/biology-classes-delhi' },
      { name: 'Noida', url: '/biology-classes-noida' },
      { name: 'East Delhi', url: '/neet-coaching-east-delhi' },
      { name: 'Laxmi Nagar', url: '/biology-classes-laxmi-nagar' },
    ],
    faqs: [
      {
        question: 'Which is the best biology coaching for Mayur Vihar students?',
        answer:
          'Cerebrum Biology Academy offers premium NEET coaching for Mayur Vihar students. Online classes available + access to South Delhi center. AIIMS faculty. Call 88264-44334.',
      },
      {
        question: 'Can I attend classes in Noida from Mayur Vihar?',
        answer:
          'We currently offer online classes for Mayur Vihar/Noida students. Our South Delhi center is also accessible via Blue Line. Call 88264-44334 for options.',
      },
    ],
    stats: {
      studentsFromCity: '380+',
      successRate: '98%',
      rating: '4.8',
    },
    geoCoordinates: {
      lat: '28.6070',
      lng: '77.2940',
    },
  },

  'uttam-nagar': {
    slug: 'uttam-nagar',
    cityName: 'Uttam Nagar',
    stateName: 'Delhi',
    metaTitle: 'Biology Classes in Uttam Nagar | Affordable NEET Coaching | Cerebrum Academy',
    metaDescription:
      'Best biology classes in Uttam Nagar, West Delhi. Affordable NEET coaching with AIIMS faculty. Book free demo! Call 88264-44334',
    heroTitle: 'Best Biology Classes in Uttam Nagar',
    heroSubtitle: 'Quality NEET biology coaching at affordable fees. AIIMS-trained faculty.',
    hasOfflineCenter: false,
    nearestCenter: {
      name: 'South Delhi Center',
      address: 'Block D, South Extension Part 2, New Delhi',
      distance: '18-20 km from Uttam Nagar',
    },
    localities: [
      { name: 'Uttam Nagar East', url: '/biology-classes-uttam-nagar/east' },
      { name: 'Uttam Nagar West', url: '/biology-classes-uttam-nagar/west' },
      { name: 'Dwarka', url: '/biology-classes-dwarka' },
      { name: 'Janakpuri', url: '/biology-classes-janakpuri' },
    ],
    relatedCities: [
      { name: 'Delhi', url: '/biology-classes-delhi' },
      { name: 'Dwarka', url: '/biology-classes-dwarka' },
      { name: 'West Delhi', url: '/neet-coaching-west-delhi' },
      { name: 'Janakpuri', url: '/neet-coaching-janakpuri' },
    ],
    faqs: [
      {
        question: 'Is there affordable biology coaching in Uttam Nagar?',
        answer:
          'Cerebrum Biology Academy offers online classes at ₹35,000-60,000/year - affordable for Uttam Nagar families. AIIMS-quality education at reasonable rates. Call 88264-44334.',
      },
      {
        question: 'How are online classes better than local coaching?',
        answer:
          'Our online classes have AIIMS-trained faculty with 98% success rate. Local coaching cannot match this quality. Save travel time, get better education. Call 88264-44334.',
      },
    ],
    stats: {
      studentsFromCity: '280+',
      successRate: '96%',
      rating: '4.7',
    },
    geoCoordinates: {
      lat: '28.6196',
      lng: '77.0670',
    },
  },

  'patel-nagar': {
    slug: 'patel-nagar',
    cityName: 'Patel Nagar',
    stateName: 'Delhi',
    metaTitle: 'Biology Classes in Patel Nagar | NEET Coaching Central Delhi | Cerebrum Academy',
    metaDescription:
      'Top biology classes in Patel Nagar, Central Delhi. AIIMS-trained faculty, 98% success. Near Karol Bagh. Call 88264-44334 for free demo!',
    heroTitle: 'Best Biology Classes in Patel Nagar',
    heroSubtitle: 'Central Delhi location with premium NEET biology coaching. AIIMS faculty.',
    hasOfflineCenter: false,
    nearestCenter: {
      name: 'South Delhi Center',
      address: 'Block D, South Extension Part 2, New Delhi',
      distance: '8-10 km from Patel Nagar',
    },
    localities: [
      { name: 'East Patel Nagar', url: '/biology-classes-patel-nagar/east' },
      { name: 'West Patel Nagar', url: '/biology-classes-patel-nagar/west' },
      { name: 'Karol Bagh', url: '/biology-classes-karol-bagh' },
      { name: 'Rajinder Nagar', url: '/neet-coaching-rajinder-nagar' },
    ],
    relatedCities: [
      { name: 'Delhi', url: '/biology-classes-delhi' },
      { name: 'Karol Bagh', url: '/biology-classes-karol-bagh' },
      { name: 'South Delhi', url: '/biology-classes-south-delhi' },
      { name: 'Rajinder Nagar', url: '/neet-coaching-rajinder-nagar' },
    ],
    faqs: [
      {
        question: 'Is there NEET biology coaching near Patel Nagar?',
        answer:
          'Cerebrum Biology Academy offers online classes for Patel Nagar students. Our South Delhi center is just 8-10 km away via Blue Line Metro. Call 88264-44334.',
      },
      {
        question: 'What makes Cerebrum better than Patel Nagar coaching centers?',
        answer:
          'AIIMS-trained faculty, 98% success rate, structured NCERT-focused curriculum, and small batch sizes. Better results than local coaching. Call 88264-44334.',
      },
    ],
    stats: {
      studentsFromCity: '180+',
      successRate: '98%',
      rating: '4.8',
    },
    geoCoordinates: {
      lat: '28.6479',
      lng: '77.1695',
    },
  },

  'vasant-kunj': {
    slug: 'vasant-kunj',
    cityName: 'Vasant Kunj',
    stateName: 'Delhi',
    metaTitle: 'Biology Classes in Vasant Kunj | Best NEET Coaching South Delhi | Cerebrum Academy',
    metaDescription:
      'Premium biology classes in Vasant Kunj, South Delhi. AIIMS faculty, 98% success. Near South Extension center. Call 88264-44334 for demo!',
    heroTitle: 'Best Biology Classes in Vasant Kunj',
    heroSubtitle:
      "South Delhi's premium locality gets premium NEET coaching. AIIMS-trained faculty.",
    hasOfflineCenter: false,
    nearestCenter: {
      name: 'South Delhi Center',
      address: 'Block D, South Extension Part 2, New Delhi',
      distance: '10-12 km from Vasant Kunj',
    },
    localities: [
      { name: 'Vasant Kunj A', url: '/biology-classes-vasant-kunj/sector-a' },
      { name: 'Vasant Kunj B', url: '/biology-classes-vasant-kunj/sector-b' },
      { name: 'Vasant Kunj C', url: '/biology-classes-vasant-kunj/sector-c' },
      { name: 'Saket', url: '/biology-classes-saket' },
      { name: 'Hauz Khas', url: '/biology-classes-south-delhi/hauz-khas' },
    ],
    relatedCities: [
      { name: 'South Delhi', url: '/biology-classes-south-delhi' },
      { name: 'Delhi', url: '/biology-classes-delhi' },
      { name: 'Saket', url: '/biology-classes-saket' },
      { name: 'Gurgaon', url: '/biology-classes-gurgaon' },
    ],
    faqs: [
      {
        question: 'Is there good biology coaching for Vasant Kunj students?',
        answer:
          'Cerebrum Biology Academy offers premium NEET coaching for Vasant Kunj students. Our South Extension center is just 10-12 km away. Online classes also available. Call 88264-44334.',
      },
      {
        question: 'What is the fee for Vasant Kunj students?',
        answer:
          'Offline at South Delhi center: ₹45,000 to ₹75,000/year. Online: ₹35,000 to ₹60,000/year. Premium quality at competitive rates. Call 88264-44334.',
      },
    ],
    stats: {
      studentsFromCity: '220+',
      successRate: '98%',
      rating: '4.9',
    },
    geoCoordinates: {
      lat: '28.5207',
      lng: '77.1562',
    },
  },

  saket: {
    slug: 'saket',
    cityName: 'Saket',
    stateName: 'Delhi',
    metaTitle: 'Biology Classes in Saket | Best NEET Coaching South Delhi | Cerebrum Academy',
    metaDescription:
      'Top biology classes in Saket, South Delhi. Near South Extension center (5 km). AIIMS faculty, 98% success. Call 88264-44334 for demo!',
    heroTitle: 'Best Biology Classes in Saket',
    heroSubtitle: 'Just 5 km from our South Extension center! Premium NEET biology coaching.',
    hasOfflineCenter: false,
    nearestCenter: {
      name: 'South Delhi Center',
      address: 'Block D, South Extension Part 2, New Delhi',
      distance: '5-7 km from Saket',
    },
    localities: [
      { name: 'Saket Main', url: '/biology-classes-saket' },
      { name: 'Malviya Nagar', url: '/biology-classes-south-delhi/malviya-nagar' },
      { name: 'Hauz Khas', url: '/biology-classes-south-delhi/hauz-khas' },
      { name: 'GK', url: '/biology-classes-south-delhi/gk' },
    ],
    relatedCities: [
      { name: 'South Delhi', url: '/biology-classes-south-delhi' },
      { name: 'Delhi', url: '/biology-classes-delhi' },
      { name: 'Vasant Kunj', url: '/biology-classes-vasant-kunj' },
      { name: 'Hauz Khas', url: '/biology-classes-south-delhi/hauz-khas' },
    ],
    faqs: [
      {
        question: 'How far is the biology coaching center from Saket?',
        answer:
          'Our South Extension center is just 5-7 km from Saket. Easily accessible via Yellow Line Metro (Saket to AIIMS station). Call 88264-44334 for directions.',
      },
      {
        question: 'What batch timings suit Saket students?',
        answer:
          'We have morning, afternoon, and evening batches. Many Saket students prefer evening batches after school. Weekend batches also available. Call 88264-44334.',
      },
    ],
    stats: {
      studentsFromCity: '200+',
      successRate: '98%',
      rating: '4.9',
    },
    geoCoordinates: {
      lat: '28.5245',
      lng: '77.2066',
    },
  },

  'green-park': {
    slug: 'green-park',
    cityName: 'Green Park',
    stateName: 'Delhi',
    metaTitle: 'Biology Classes in Green Park | NEET Coaching South Delhi | Cerebrum Academy',
    metaDescription:
      'Best biology classes in Green Park, South Delhi. Walking distance from South Extension. AIIMS faculty, 98% success. Call 88264-44334!',
    heroTitle: 'Best Biology Classes in Green Park',
    heroSubtitle: 'Walking distance from our South Extension center! Premium NEET coaching.',
    hasOfflineCenter: false,
    nearestCenter: {
      name: 'South Delhi Center',
      address: 'Block D, South Extension Part 2, New Delhi',
      distance: '2-3 km from Green Park',
    },
    localities: [
      { name: 'Green Park Main', url: '/biology-classes-green-park' },
      { name: 'Green Park Extension', url: '/biology-classes-green-park/extension' },
      { name: 'Hauz Khas', url: '/biology-classes-south-delhi/hauz-khas' },
      { name: 'IIT Delhi Area', url: '/biology-classes-green-park/iit' },
    ],
    relatedCities: [
      { name: 'South Delhi', url: '/biology-classes-south-delhi' },
      { name: 'Delhi', url: '/biology-classes-delhi' },
      { name: 'Hauz Khas', url: '/biology-classes-south-delhi/hauz-khas' },
      { name: 'Lajpat Nagar', url: '/biology-classes-south-delhi/lajpat-nagar' },
    ],
    faqs: [
      {
        question: 'How close is the biology coaching from Green Park?',
        answer:
          'Our South Extension center is just 2-3 km from Green Park - walking distance! Take Green Park Metro (Yellow Line) and walk to South Extension. Call 88264-44334.',
      },
      {
        question: 'Is this the closest NEET coaching to IIT Delhi?',
        answer:
          'Yes! Our South Extension center is very close to IIT Delhi campus area. Many students from IIT campus area attend here. Call 88264-44334.',
      },
    ],
    stats: {
      studentsFromCity: '150+',
      successRate: '98%',
      rating: '4.9',
    },
    geoCoordinates: {
      lat: '28.5599',
      lng: '77.2057',
    },
  },

  'model-town': {
    slug: 'model-town',
    cityName: 'Model Town',
    stateName: 'Delhi',
    metaTitle: 'Biology Classes in Model Town | NEET Coaching North Delhi | Cerebrum Academy',
    metaDescription:
      'Top biology classes in Model Town, North Delhi. Near Rohini center. AIIMS faculty, 98% success rate. Call 88264-44334 for free demo!',
    heroTitle: 'Best Biology Classes in Model Town',
    heroSubtitle: "North Delhi's premium locality with premium NEET coaching. Near Rohini center.",
    hasOfflineCenter: false,
    nearestCenter: {
      name: 'Rohini Center',
      address: '211 Vikas Surya Tower, DC Chauk, Rohini',
      distance: '8-10 km from Model Town',
    },
    localities: [
      { name: 'Model Town Part 1', url: '/biology-classes-model-town/part-1' },
      { name: 'Model Town Part 2', url: '/biology-classes-model-town/part-2' },
      { name: 'GTB Nagar', url: '/neet-coaching-gtb-nagar' },
      { name: 'Rohini', url: '/biology-classes-rohini' },
    ],
    relatedCities: [
      { name: 'Rohini', url: '/biology-classes-rohini' },
      { name: 'Delhi', url: '/biology-classes-delhi' },
      { name: 'North Delhi', url: '/neet-coaching-north-delhi' },
      { name: 'Pitampura', url: '/biology-classes-pitampura' },
    ],
    faqs: [
      {
        question: 'Where is the nearest biology coaching from Model Town?',
        answer:
          'Our Rohini center at DC Chauk is just 8-10 km from Model Town. Easily accessible via Yellow Line Metro. Call 88264-44334 for directions.',
      },
      {
        question: 'What courses are available for Model Town students?',
        answer:
          'Class 11, Class 12, NEET Dropper, and Foundation courses. All taught by AIIMS-trained faculty. Call 88264-44334 for details.',
      },
    ],
    stats: {
      studentsFromCity: '180+',
      successRate: '98%',
      rating: '4.9',
    },
    geoCoordinates: {
      lat: '28.7143',
      lng: '77.1896',
    },
  },

  'shalimar-bagh': {
    slug: 'shalimar-bagh',
    cityName: 'Shalimar Bagh',
    stateName: 'Delhi',
    metaTitle: 'Biology Classes in Shalimar Bagh | NEET Coaching North Delhi | Cerebrum Academy',
    metaDescription:
      'Best biology classes in Shalimar Bagh, North Delhi. 5 km from Rohini center. AIIMS faculty, 98% success. Call 88264-44334!',
    heroTitle: 'Best Biology Classes in Shalimar Bagh',
    heroSubtitle: 'Just 5 km from our Rohini center! Premium NEET biology coaching.',
    hasOfflineCenter: false,
    nearestCenter: {
      name: 'Rohini Center',
      address: '211 Vikas Surya Tower, DC Chauk, Rohini',
      distance: '5 km from Shalimar Bagh',
    },
    localities: [
      { name: 'Shalimar Bagh Main', url: '/biology-classes-shalimar-bagh' },
      { name: 'Rohini', url: '/biology-classes-rohini' },
      { name: 'Pitampura', url: '/biology-classes-pitampura' },
      { name: 'Ashok Vihar', url: '/biology-classes-ashok-vihar' },
    ],
    relatedCities: [
      { name: 'Rohini', url: '/biology-classes-rohini' },
      { name: 'Delhi', url: '/biology-classes-delhi' },
      { name: 'Pitampura', url: '/biology-classes-pitampura' },
      { name: 'North Delhi', url: '/neet-coaching-north-delhi' },
    ],
    faqs: [
      {
        question: 'How do I reach biology coaching from Shalimar Bagh?',
        answer:
          'Our Rohini center is just 5 km from Shalimar Bagh. Take auto/cab to DC Chauk, or use Red Line Metro to Rohini West. Call 88264-44334 for directions.',
      },
      {
        question: 'Many of my friends go to local coaching. Why Cerebrum?',
        answer:
          'AIIMS-trained faculty (not just graduates), 98% success rate, NCERT-focused curriculum, small batches. Results speak for themselves. Call 88264-44334.',
      },
    ],
    stats: {
      studentsFromCity: '220+',
      successRate: '98%',
      rating: '4.9',
    },
    geoCoordinates: {
      lat: '28.7182',
      lng: '77.1559',
    },
  },

  'ashok-vihar': {
    slug: 'ashok-vihar',
    cityName: 'Ashok Vihar',
    stateName: 'Delhi',
    metaTitle: 'Biology Classes in Ashok Vihar | NEET Coaching North Delhi | Cerebrum Academy',
    metaDescription:
      'Top biology classes in Ashok Vihar, North Delhi. Near Rohini center. AIIMS faculty, 98% success rate. Call 88264-44334 for demo!',
    heroTitle: 'Best Biology Classes in Ashok Vihar',
    heroSubtitle: 'Premium NEET biology coaching for Ashok Vihar students. Near Rohini center.',
    hasOfflineCenter: false,
    nearestCenter: {
      name: 'Rohini Center',
      address: '211 Vikas Surya Tower, DC Chauk, Rohini',
      distance: '6-8 km from Ashok Vihar',
    },
    localities: [
      { name: 'Ashok Vihar Phase 1', url: '/biology-classes-ashok-vihar/phase-1' },
      { name: 'Ashok Vihar Phase 2', url: '/biology-classes-ashok-vihar/phase-2' },
      { name: 'Wazirpur', url: '/biology-classes-ashok-vihar/wazirpur' },
      { name: 'Shalimar Bagh', url: '/biology-classes-shalimar-bagh' },
    ],
    relatedCities: [
      { name: 'Rohini', url: '/biology-classes-rohini' },
      { name: 'Delhi', url: '/biology-classes-delhi' },
      { name: 'Shalimar Bagh', url: '/biology-classes-shalimar-bagh' },
      { name: 'North Delhi', url: '/neet-coaching-north-delhi' },
    ],
    faqs: [
      {
        question: 'Is there biology coaching near Ashok Vihar?',
        answer:
          'Our Rohini center at DC Chauk is just 6-8 km from Ashok Vihar. Easily accessible by auto or metro. Call 88264-44334 for details.',
      },
      {
        question: 'What is the fee for Ashok Vihar students?',
        answer:
          'Offline at Rohini center: ₹45,000-75,000/year. Online: ₹35,000-60,000/year. Best faculty in North Delhi at competitive rates. Call 88264-44334.',
      },
    ],
    stats: {
      studentsFromCity: '160+',
      successRate: '98%',
      rating: '4.8',
    },
    geoCoordinates: {
      lat: '28.6946',
      lng: '77.1695',
    },
  },

  'nehru-place': {
    slug: 'nehru-place',
    cityName: 'Nehru Place',
    stateName: 'Delhi',
    metaTitle: 'Biology Classes in Nehru Place | NEET Coaching South Delhi | Cerebrum Academy',
    metaDescription:
      'Best biology classes near Nehru Place, South Delhi. Close to South Extension center. AIIMS faculty, 98% success. Call 88264-44334!',
    heroTitle: 'Best Biology Classes in Nehru Place',
    heroSubtitle:
      "South Delhi's commercial hub gets premium NEET coaching. Near South Extension center.",
    hasOfflineCenter: false,
    nearestCenter: {
      name: 'South Delhi Center',
      address: 'Block D, South Extension Part 2, New Delhi',
      distance: '4-5 km from Nehru Place',
    },
    localities: [
      { name: 'Nehru Place', url: '/biology-classes-nehru-place' },
      { name: 'Kalkaji', url: '/biology-classes-nehru-place/kalkaji' },
      { name: 'GK 2', url: '/biology-classes-south-delhi/gk' },
      { name: 'CR Park', url: '/biology-classes-nehru-place/cr-park' },
    ],
    relatedCities: [
      { name: 'South Delhi', url: '/biology-classes-south-delhi' },
      { name: 'Delhi', url: '/biology-classes-delhi' },
      { name: 'Faridabad', url: '/biology-classes-faridabad' },
      { name: 'Noida', url: '/biology-classes-noida' },
    ],
    faqs: [
      {
        question: 'Is there biology coaching near Nehru Place?',
        answer:
          'Our South Extension center is just 4-5 km from Nehru Place. Take Violet Line Metro to Moolchand or auto to South Extension. Call 88264-44334.',
      },
      {
        question: 'Can I attend classes after college from Nehru Place?',
        answer:
          'Yes! We have evening batches (6-8 PM) perfect for college students from Nehru Place area. Call 88264-44334 for batch timings.',
      },
    ],
    stats: {
      studentsFromCity: '140+',
      successRate: '98%',
      rating: '4.8',
    },
    geoCoordinates: {
      lat: '28.5494',
      lng: '77.2510',
    },
  },

  'defence-colony': {
    slug: 'defence-colony',
    cityName: 'Defence Colony',
    stateName: 'Delhi',
    metaTitle: 'Biology Classes in Defence Colony | NEET Coaching South Delhi | Cerebrum Academy',
    metaDescription:
      'Premium biology classes in Defence Colony, South Delhi. 3 km from South Extension. AIIMS faculty, 98% success. Call 88264-44334!',
    heroTitle: 'Best Biology Classes in Defence Colony',
    heroSubtitle: 'Just 3 km from our South Extension center! Premium NEET biology coaching.',
    hasOfflineCenter: false,
    nearestCenter: {
      name: 'South Delhi Center',
      address: 'Block D, South Extension Part 2, New Delhi',
      distance: '3 km from Defence Colony',
    },
    localities: [
      { name: 'Defence Colony', url: '/biology-classes-defence-colony' },
      { name: 'Lajpat Nagar', url: '/biology-classes-south-delhi/lajpat-nagar' },
      { name: 'Jangpura', url: '/biology-classes-defence-colony/jangpura' },
      { name: 'Andrews Ganj', url: '/biology-classes-defence-colony/andrews-ganj' },
    ],
    relatedCities: [
      { name: 'South Delhi', url: '/biology-classes-south-delhi' },
      { name: 'Delhi', url: '/biology-classes-delhi' },
      { name: 'Lajpat Nagar', url: '/biology-classes-south-delhi/lajpat-nagar' },
      { name: 'GK', url: '/biology-classes-south-delhi/gk' },
    ],
    faqs: [
      {
        question: 'How close is biology coaching from Defence Colony?',
        answer:
          'Our South Extension center is just 3 km from Defence Colony - 10 minutes by auto! Many Defence Colony students walk or cycle to our center. Call 88264-44334.',
      },
      {
        question: 'Do you have students from Defence Colony?',
        answer:
          'Yes! Defence Colony is one of our top feeder areas for South Extension center. Many NEET qualifiers from here. Call 88264-44334 to meet our students.',
      },
    ],
    stats: {
      studentsFromCity: '130+',
      successRate: '98%',
      rating: '4.9',
    },
    geoCoordinates: {
      lat: '28.5742',
      lng: '77.2311',
    },
  },

  'greater-kailash': {
    slug: 'greater-kailash',
    cityName: 'Greater Kailash',
    stateName: 'Delhi',
    metaTitle:
      'Biology Classes in Greater Kailash | Best NEET Coaching GK Delhi | Cerebrum Academy',
    metaDescription:
      'Premium biology classes in Greater Kailash (GK-I, GK-II), South Delhi. AIIMS faculty, 98% success. DPS GK students. Call 88264-44334 for demo!',
    heroTitle: 'Best Biology Classes in Greater Kailash',
    heroSubtitle:
      "South Delhi's most affluent locality gets premium NEET biology coaching. Serving GK-I, GK-II & GK Enclave.",
    hasOfflineCenter: false,
    nearestCenter: {
      name: 'South Delhi Center',
      address: 'Block D, South Extension Part 2, New Delhi',
      distance: '3-5 km from Greater Kailash',
    },
    localities: [
      { name: 'GK-I M Block', url: '/biology-classes-greater-kailash' },
      { name: 'GK-II', url: '/biology-classes-greater-kailash' },
      { name: 'GK Enclave', url: '/biology-classes-greater-kailash' },
      { name: 'Kailash Colony', url: '/neet-coaching-south-delhi/kailash-colony' },
      { name: 'East of Kailash', url: '/neet-coaching-south-delhi/east-of-kailash' },
      { name: 'Nehru Place', url: '/biology-classes-nehru-place' },
    ],
    relatedCities: [
      { name: 'South Delhi', url: '/biology-classes-south-delhi' },
      { name: 'Delhi', url: '/biology-classes-delhi' },
      { name: 'Defence Colony', url: '/biology-classes-defence-colony' },
      { name: 'Lajpat Nagar', url: '/biology-classes-lajpat-nagar' },
    ],
    faqs: [
      {
        question: 'Which is the best biology coaching for Greater Kailash students?',
        answer:
          'Cerebrum Biology Academy is the top choice for GK students. Our South Extension center is just 3-5 km away. Many DPS Greater Kailash students study with us. Call 88264-44334 for details.',
      },
      {
        question: 'Is there NEET coaching near GK-I and GK-II?',
        answer:
          'Yes! Our South Extension center is easily accessible from both GK-I and GK-II. We also offer online classes for GK students preferring home study. Call 88264-44334.',
      },
      {
        question: 'What is the fee for Greater Kailash students?',
        answer:
          'Offline at South Delhi center: ₹45,000-75,000/year. Online: ₹35,000-60,000/year. Premium quality matching GK standards. Call 88264-44334.',
      },
      {
        question: 'Do you have students from DPS Greater Kailash?',
        answer:
          'Yes! Many DPS GK students are our toppers. We understand DPS curriculum and coordinate NEET prep accordingly. Call 88264-44334 to meet them.',
      },
    ],
    stats: {
      studentsFromCity: '320+',
      successRate: '98%',
      rating: '4.9',
    },
    geoCoordinates: {
      lat: '28.5494',
      lng: '77.2343',
    },
  },

  'hauz-khas': {
    slug: 'hauz-khas',
    cityName: 'Hauz Khas',
    stateName: 'Delhi',
    metaTitle: 'Biology Classes in Hauz Khas | NEET Coaching Near IIT Delhi | Cerebrum Academy',
    metaDescription:
      'Top biology classes in Hauz Khas, near IIT Delhi. Premier coaching hub location. AIIMS faculty, 98% success. Call 88264-44334 for free demo!',
    heroTitle: 'Best Biology Classes in Hauz Khas',
    heroSubtitle:
      "South Delhi's premier coaching hub near IIT Delhi. Where serious NEET aspirants study.",
    hasOfflineCenter: false,
    nearestCenter: {
      name: 'South Delhi Center',
      address: 'Block D, South Extension Part 2, New Delhi',
      distance: '4-6 km from Hauz Khas',
    },
    localities: [
      { name: 'Hauz Khas Village', url: '/biology-classes-hauz-khas' },
      { name: 'Hauz Khas Enclave', url: '/biology-classes-hauz-khas' },
      { name: 'SDA (Safdarjung Dev Area)', url: '/neet-coaching-south-delhi/sda' },
      { name: 'Green Park', url: '/biology-classes-green-park' },
      { name: 'Kalu Sarai', url: '/neet-coaching-kalu-sarai' },
      { name: 'IIT Delhi Area', url: '/biology-classes-hauz-khas' },
    ],
    relatedCities: [
      { name: 'South Delhi', url: '/biology-classes-south-delhi' },
      { name: 'Delhi', url: '/biology-classes-delhi' },
      { name: 'Green Park', url: '/biology-classes-green-park' },
      { name: 'Malviya Nagar', url: '/biology-classes-malviya-nagar' },
    ],
    faqs: [
      {
        question: 'Is Hauz Khas good for NEET coaching?',
        answer:
          "Hauz Khas is Delhi's premier coaching hub near IIT. Cerebrum Academy serves this area with premium NEET biology coaching. Our South Extension center + online options available. Call 88264-44334.",
      },
      {
        question: 'How far is Cerebrum from Hauz Khas Metro?',
        answer:
          'Our South Extension center is 4-6 km from Hauz Khas Metro. Easy auto ride or take Yellow Line to AIIMS and walk. Online classes also available. Call 88264-44334.',
      },
      {
        question: 'Do you offer coaching for students staying in Hauz Khas PGs?',
        answer:
          'Yes! Many outstation students in Hauz Khas PGs study with us. We offer flexible timings and online options for serious aspirants. Call 88264-44334.',
      },
    ],
    stats: {
      studentsFromCity: '280+',
      successRate: '98%',
      rating: '4.9',
    },
    geoCoordinates: {
      lat: '28.5494',
      lng: '77.2001',
    },
  },

  'lajpat-nagar': {
    slug: 'lajpat-nagar',
    cityName: 'Lajpat Nagar',
    stateName: 'Delhi',
    metaTitle: 'Biology Classes in Lajpat Nagar | Best NEET Coaching | Cerebrum Academy',
    metaDescription:
      'Best biology classes in Lajpat Nagar, South Delhi. Central location, metro connected. AIIMS faculty, 98% success. Call 88264-44334 for demo!',
    heroTitle: 'Best Biology Classes in Lajpat Nagar',
    heroSubtitle:
      'Central South Delhi location with excellent connectivity. Premium NEET biology coaching.',
    hasOfflineCenter: false,
    nearestCenter: {
      name: 'South Delhi Center',
      address: 'Block D, South Extension Part 2, New Delhi',
      distance: '2-3 km from Lajpat Nagar',
    },
    localities: [
      { name: 'Lajpat Nagar I', url: '/biology-classes-lajpat-nagar' },
      { name: 'Lajpat Nagar II', url: '/biology-classes-lajpat-nagar' },
      { name: 'Lajpat Nagar III', url: '/biology-classes-lajpat-nagar' },
      { name: 'Lajpat Nagar IV', url: '/biology-classes-lajpat-nagar' },
      { name: 'Amar Colony', url: '/neet-coaching-south-delhi/amar-colony' },
      { name: 'Defence Colony', url: '/biology-classes-defence-colony' },
    ],
    relatedCities: [
      { name: 'South Delhi', url: '/biology-classes-south-delhi' },
      { name: 'Delhi', url: '/biology-classes-delhi' },
      { name: 'Defence Colony', url: '/biology-classes-defence-colony' },
      { name: 'Greater Kailash', url: '/biology-classes-greater-kailash' },
    ],
    faqs: [
      {
        question: 'Where is the nearest biology coaching from Lajpat Nagar?',
        answer:
          'Our South Extension center is just 2-3 km from Lajpat Nagar Central Market. Take Lajpat Nagar Metro (Violet Line) or walk to South Extension. Call 88264-44334.',
      },
      {
        question: 'Is there good NEET coaching in Lajpat Nagar area?',
        answer:
          'Cerebrum Biology Academy offers premium NEET coaching for Lajpat Nagar students. AIIMS-trained faculty with 98% success rate. Visit our nearby South Extension center. Call 88264-44334.',
      },
      {
        question: 'What timings are available for Lajpat Nagar students?',
        answer:
          'Morning (8-10 AM), afternoon (2-4 PM), and evening (6-8 PM) batches. Many Lajpat Nagar students prefer evening batches after school. Call 88264-44334.',
      },
    ],
    stats: {
      studentsFromCity: '250+',
      successRate: '98%',
      rating: '4.9',
    },
    geoCoordinates: {
      lat: '28.5692',
      lng: '77.2432',
    },
  },

  'malviya-nagar': {
    slug: 'malviya-nagar',
    cityName: 'Malviya Nagar',
    stateName: 'Delhi',
    metaTitle: 'Biology Classes in Malviya Nagar | Affordable NEET Coaching | Cerebrum Academy',
    metaDescription:
      'Top biology classes in Malviya Nagar, South Delhi. Affordable quality coaching. AIIMS faculty, 98% success. Call 88264-44334 for demo!',
    heroTitle: 'Best Biology Classes in Malviya Nagar',
    heroSubtitle:
      "Affordable yet premium NEET biology coaching in South Delhi's popular student hub.",
    hasOfflineCenter: false,
    nearestCenter: {
      name: 'South Delhi Center',
      address: 'Block D, South Extension Part 2, New Delhi',
      distance: '5-7 km from Malviya Nagar',
    },
    localities: [
      { name: 'Malviya Nagar Main', url: '/biology-classes-malviya-nagar' },
      { name: 'Shivalik', url: '/biology-classes-malviya-nagar' },
      { name: 'Panchshila Park', url: '/neet-coaching-south-delhi/panchsheel-park' },
      { name: 'Saket', url: '/biology-classes-saket' },
      { name: 'Hauz Khas', url: '/biology-classes-hauz-khas' },
    ],
    relatedCities: [
      { name: 'South Delhi', url: '/biology-classes-south-delhi' },
      { name: 'Delhi', url: '/biology-classes-delhi' },
      { name: 'Saket', url: '/biology-classes-saket' },
      { name: 'Hauz Khas', url: '/biology-classes-hauz-khas' },
    ],
    faqs: [
      {
        question: 'Is there affordable biology coaching in Malviya Nagar?',
        answer:
          'Cerebrum Biology Academy offers premium quality at competitive rates. Online: ₹35,000-60,000/year. Offline: ₹45,000-75,000/year. Better than local coaching quality. Call 88264-44334.',
      },
      {
        question: 'How do I reach the coaching center from Malviya Nagar?',
        answer:
          'Take Malviya Nagar Metro (Yellow Line) to AIIMS, then auto to South Extension. Or take direct auto (15 mins). Online classes also available. Call 88264-44334.',
      },
      {
        question: 'Do many Malviya Nagar students study here?',
        answer:
          'Yes! 200+ students from Malviya Nagar and surrounding areas study with us. Many prefer our hybrid mode. Call 88264-44334 to meet current students.',
      },
    ],
    stats: {
      studentsFromCity: '220+',
      successRate: '98%',
      rating: '4.8',
    },
    geoCoordinates: {
      lat: '28.5281',
      lng: '77.2067',
    },
  },

  'cr-park': {
    slug: 'cr-park',
    cityName: 'CR Park',
    stateName: 'Delhi',
    metaTitle: 'Biology Classes in CR Park | NEET Coaching Chittaranjan Park | Cerebrum Academy',
    metaDescription:
      'Best biology classes in CR Park (Chittaranjan Park), South Delhi. Academic community focus. AIIMS faculty, 98% success. Call 88264-44334!',
    heroTitle: 'Best Biology Classes in CR Park',
    heroSubtitle:
      "Serving Chittaranjan Park's academically-focused Bengali community. Premium NEET coaching.",
    hasOfflineCenter: false,
    nearestCenter: {
      name: 'South Delhi Center',
      address: 'Block D, South Extension Part 2, New Delhi',
      distance: '8-10 km from CR Park',
    },
    localities: [
      { name: 'CR Park A Block', url: '/biology-classes-cr-park' },
      { name: 'CR Park C Block', url: '/biology-classes-cr-park' },
      { name: 'CR Park E Block', url: '/biology-classes-cr-park' },
      { name: 'Kalkaji', url: '/biology-classes-kalkaji' },
      { name: 'Nehru Place', url: '/biology-classes-nehru-place' },
      { name: 'Alaknanda', url: '/neet-coaching-south-delhi/alaknanda' },
    ],
    relatedCities: [
      { name: 'South Delhi', url: '/biology-classes-south-delhi' },
      { name: 'Delhi', url: '/biology-classes-delhi' },
      { name: 'Kalkaji', url: '/biology-classes-kalkaji' },
      { name: 'Nehru Place', url: '/biology-classes-nehru-place' },
    ],
    faqs: [
      {
        question: 'Is there good biology coaching for CR Park students?',
        answer:
          "Cerebrum Biology Academy serves CR Park's academic community. Many Bengali families trust us for NEET prep. Online + offline options. Call 88264-44334.",
      },
      {
        question: 'Why do CR Park families choose Cerebrum?',
        answer:
          "CR Park values academic excellence. Our AIIMS-trained faculty, 98% success rate, and structured approach matches the community's high standards. Call 88264-44334.",
      },
      {
        question: 'Is online coaching good for CR Park students?',
        answer:
          'Yes! Many CR Park students prefer our live online classes - same quality as offline. Saves commute time for more study. Call 88264-44334 for demo.',
      },
    ],
    stats: {
      studentsFromCity: '180+',
      successRate: '98%',
      rating: '4.9',
    },
    geoCoordinates: {
      lat: '28.5376',
      lng: '77.2475',
    },
  },

  kalkaji: {
    slug: 'kalkaji',
    cityName: 'Kalkaji',
    stateName: 'Delhi',
    metaTitle: 'Biology Classes in Kalkaji | NEET Coaching Near Lotus Temple | Cerebrum Academy',
    metaDescription:
      'Top biology classes in Kalkaji, South Delhi. Near Kalkaji Temple & Lotus Temple. AIIMS faculty, 98% success. Call 88264-44334 for demo!',
    heroTitle: 'Best Biology Classes in Kalkaji',
    heroSubtitle: 'Serving Kalkaji and surrounding areas. Near Kalkaji Temple and Lotus Temple.',
    hasOfflineCenter: false,
    nearestCenter: {
      name: 'South Delhi Center',
      address: 'Block D, South Extension Part 2, New Delhi',
      distance: '7-9 km from Kalkaji',
    },
    localities: [
      { name: 'Kalkaji Main', url: '/biology-classes-kalkaji' },
      { name: 'Govind Puri', url: '/biology-classes-kalkaji' },
      { name: 'Nehru Place', url: '/biology-classes-nehru-place' },
      { name: 'CR Park', url: '/biology-classes-cr-park' },
      { name: 'Greater Kailash', url: '/biology-classes-greater-kailash' },
    ],
    relatedCities: [
      { name: 'South Delhi', url: '/biology-classes-south-delhi' },
      { name: 'Delhi', url: '/biology-classes-delhi' },
      { name: 'Nehru Place', url: '/biology-classes-nehru-place' },
      { name: 'Faridabad', url: '/biology-classes-faridabad' },
    ],
    faqs: [
      {
        question: 'Is there biology coaching near Kalkaji Temple?',
        answer:
          'Cerebrum Biology Academy serves Kalkaji students. Our South Extension center is accessible via Violet Line (Kalkaji Mandir Metro). Online also available. Call 88264-44334.',
      },
      {
        question: 'How do I reach coaching from Kalkaji?',
        answer:
          'Take Kalkaji Mandir Metro (Violet Line) to Moolchand, then auto to South Extension. Or use our convenient online classes. Call 88264-44334 for directions.',
      },
      {
        question: 'What is the fee for Kalkaji students?',
        answer:
          'Online: ₹35,000-60,000/year. Offline at South Extension: ₹45,000-75,000/year. Includes complete study material and test series. Call 88264-44334.',
      },
    ],
    stats: {
      studentsFromCity: '170+',
      successRate: '98%',
      rating: '4.8',
    },
    geoCoordinates: {
      lat: '28.5346',
      lng: '77.2590',
    },
  },

  'rk-puram': {
    slug: 'rk-puram',
    cityName: 'RK Puram',
    stateName: 'Delhi',
    metaTitle: 'Biology Classes in RK Puram | NEET Coaching All Sectors | Cerebrum Academy',
    metaDescription:
      'Best biology classes in RK Puram (Sectors 1-13), South Delhi. Serving govt colony families. DPS RKP students. Call 88264-44334 for demo!',
    heroTitle: 'Best Biology Classes in RK Puram',
    heroSubtitle:
      "Serving South Delhi's largest government colony. All sectors (1-13) covered. DPS RK Puram students welcome.",
    hasOfflineCenter: false,
    nearestCenter: {
      name: 'South Delhi Center',
      address: 'Block D, South Extension Part 2, New Delhi',
      distance: '6-10 km from RK Puram (varies by sector)',
    },
    localities: [
      { name: 'RK Puram Sector 1-3', url: '/biology-classes-rk-puram' },
      { name: 'RK Puram Sector 4-6', url: '/biology-classes-rk-puram' },
      { name: 'RK Puram Sector 7-9', url: '/biology-classes-rk-puram' },
      { name: 'RK Puram Sector 10-13', url: '/biology-classes-rk-puram' },
      { name: 'Munirka', url: '/neet-coaching-south-delhi/munirka' },
      { name: 'Vasant Vihar', url: '/biology-classes-vasant-vihar' },
    ],
    relatedCities: [
      { name: 'South Delhi', url: '/biology-classes-south-delhi' },
      { name: 'Delhi', url: '/biology-classes-delhi' },
      { name: 'Vasant Vihar', url: '/biology-classes-vasant-vihar' },
      { name: 'Hauz Khas', url: '/biology-classes-hauz-khas' },
    ],
    faqs: [
      {
        question: 'Is there biology coaching for RK Puram students?',
        answer:
          'Yes! Cerebrum Biology Academy serves all RK Puram sectors (1-13). Many DPS RK Puram students study with us. Online + offline options. Call 88264-44334.',
      },
      {
        question: 'Do you have students from DPS RK Puram?',
        answer:
          'Absolutely! DPS RK Puram is our top feeder school. We understand DPS curriculum and coordinate NEET prep with school schedule. Call 88264-44334.',
      },
      {
        question: 'Which sector is nearest to the coaching center?',
        answer:
          'Our South Extension center is 6-10 km from various RK Puram sectors. Sectors near IIT (7-9) are closest. Metro + auto is convenient. Call 88264-44334.',
      },
      {
        question: 'Is online coaching available for RK Puram students?',
        answer:
          'Yes! Many RK Puram students prefer online classes to save commute time. Live interactive classes with AIIMS faculty. Call 88264-44334 for demo.',
      },
    ],
    stats: {
      studentsFromCity: '450+',
      successRate: '98%',
      rating: '4.9',
    },
    geoCoordinates: {
      lat: '28.5672',
      lng: '77.1783',
    },
  },

  'vasant-vihar': {
    slug: 'vasant-vihar',
    cityName: 'Vasant Vihar',
    stateName: 'Delhi',
    metaTitle: 'Biology Classes in Vasant Vihar | Premium NEET Coaching | Cerebrum Academy',
    metaDescription:
      'Premium biology classes in Vasant Vihar, South Delhi. Elite locality, embassy area. Vasant Valley students. AIIMS faculty. Call 88264-44334!',
    heroTitle: 'Best Biology Classes in Vasant Vihar',
    heroSubtitle:
      "Ultra-premium NEET coaching for South Delhi's most elite locality. Vasant Valley & embassy families.",
    hasOfflineCenter: false,
    nearestCenter: {
      name: 'South Delhi Center',
      address: 'Block D, South Extension Part 2, New Delhi',
      distance: '8-10 km from Vasant Vihar',
    },
    localities: [
      { name: 'Vasant Vihar A Block', url: '/biology-classes-vasant-vihar' },
      { name: 'Vasant Vihar B Block', url: '/biology-classes-vasant-vihar' },
      { name: 'Vasant Vihar C Block', url: '/biology-classes-vasant-vihar' },
      { name: 'Poorvi Marg', url: '/biology-classes-vasant-vihar' },
      { name: 'Vasant Kunj', url: '/biology-classes-vasant-kunj' },
      { name: 'RK Puram', url: '/biology-classes-rk-puram' },
    ],
    relatedCities: [
      { name: 'South Delhi', url: '/biology-classes-south-delhi' },
      { name: 'Delhi', url: '/biology-classes-delhi' },
      { name: 'Vasant Kunj', url: '/biology-classes-vasant-kunj' },
      { name: 'RK Puram', url: '/biology-classes-rk-puram' },
    ],
    faqs: [
      {
        question: 'Is there premium biology coaching for Vasant Vihar families?',
        answer:
          'Cerebrum Biology Academy offers premium NEET coaching matching Vasant Vihar standards. AIIMS-trained faculty, personalized attention, proven results. Call 88264-44334.',
      },
      {
        question: 'Do Vasant Valley School students study here?',
        answer:
          'Yes! Many Vasant Valley students choose Cerebrum for NEET prep. We coordinate with school schedules and offer flexible timings. Call 88264-44334.',
      },
      {
        question: 'Is online coaching available for embassy families?',
        answer:
          'Absolutely! Our online classes are perfect for diplomatic families with varying schedules. Live AIIMS faculty instruction from home. Call 88264-44334.',
      },
      {
        question: 'What is the fee for Vasant Vihar students?',
        answer:
          'Premium quality at ₹45,000-75,000/year (offline) or ₹35,000-60,000/year (online). Includes personalized mentorship and complete material. Call 88264-44334.',
      },
    ],
    stats: {
      studentsFromCity: '150+',
      successRate: '99%',
      rating: '4.9',
    },
    geoCoordinates: {
      lat: '28.5607',
      lng: '77.1565',
    },
  },

  'sarojini-nagar': {
    slug: 'sarojini-nagar',
    cityName: 'Sarojini Nagar',
    stateName: 'Delhi',
    metaTitle: 'Biology Classes in Sarojini Nagar | NEET Coaching Delhi | Cerebrum Academy',
    metaDescription:
      'Best biology classes in Sarojini Nagar for govt quarters residents. NEET & Board prep with AIIMS faculty. Affordable fees. Call 88264-44334 for demo class.',
    heroTitle: 'Best Biology Classes in Sarojini Nagar',
    heroSubtitle:
      'Expert NEET biology coaching for Sarojini Nagar students. Quality preparation at affordable fees for govt employees families.',
    hasOfflineCenter: true,
    nearestCenter: {
      name: 'South Delhi Center',
      address: 'Block D, South Extension Part 2, New Delhi',
      distance: '5 km from Sarojini Nagar',
    },
    localities: [
      { name: 'Sarojini Nagar Market', url: '/biology-classes-sarojini-nagar' },
      { name: 'INA Colony', url: '/biology-classes-sarojini-nagar' },
      { name: 'Netaji Nagar', url: '/biology-classes-sarojini-nagar' },
      { name: 'Kidwai Nagar', url: '/biology-classes-sarojini-nagar' },
    ],
    relatedCities: [
      { name: 'RK Puram', url: '/biology-classes-rk-puram' },
      { name: 'Moti Bagh', url: '/biology-classes-moti-bagh' },
      { name: 'South Delhi', url: '/biology-classes-south-delhi' },
    ],
    faqs: [
      {
        question: 'Is there biology coaching near Sarojini Nagar for NEET?',
        answer:
          'Yes! Cerebrum Biology Academy offers top NEET coaching accessible from Sarojini Nagar. Our South Delhi center is just 5 km away with metro connectivity.',
      },
      {
        question: 'What are the fees for biology classes for Sarojini Nagar students?',
        answer:
          'We offer affordable biology coaching starting from ₹35,000/year for online and ₹45,000/year for offline classes. Special discounts available for govt employees children.',
      },
    ],
    stats: {
      studentsFromCity: '180+',
      successRate: '96%',
      rating: '4.8',
    },
    geoCoordinates: {
      lat: '28.5785',
      lng: '77.1950',
    },
  },

  'lodhi-colony': {
    slug: 'lodhi-colony',
    cityName: 'Lodhi Colony',
    stateName: 'Delhi',
    metaTitle: 'Biology Classes in Lodhi Colony | Premium NEET Coaching | Cerebrum Academy',
    metaDescription:
      'Premium biology classes in Lodhi Colony for IAS/IPS families. Personalized NEET coaching near Lodhi Gardens. Expert AIIMS faculty. Call 88264-44334.',
    heroTitle: 'Premium Biology Classes in Lodhi Colony',
    heroSubtitle:
      'Exclusive NEET biology coaching for Lodhi Colony families. Personalized attention for high-achieving students from bureaucrat families.',
    hasOfflineCenter: true,
    nearestCenter: {
      name: 'South Delhi Center',
      address: 'Block D, South Extension Part 2, New Delhi',
      distance: '4 km from Lodhi Colony',
    },
    localities: [
      { name: 'Lodhi Gardens Area', url: '/biology-classes-lodhi-colony' },
      { name: 'Jor Bagh', url: '/biology-classes-jor-bagh' },
      { name: 'Khan Market', url: '/biology-classes-lodhi-colony' },
      { name: 'Golf Links', url: '/biology-classes-golf-links' },
    ],
    relatedCities: [
      { name: 'Jor Bagh', url: '/biology-classes-jor-bagh' },
      { name: 'Golf Links', url: '/biology-classes-golf-links' },
      { name: 'Defence Colony', url: '/biology-classes-defence-colony' },
    ],
    faqs: [
      {
        question: 'Do you offer premium NEET coaching for Lodhi Colony students?',
        answer:
          'Yes! We provide personalized NEET coaching ideal for Lodhi Colony families. Small batch sizes and flexible timings suit busy IAS/IPS officer families.',
      },
      {
        question: 'What makes your coaching suitable for Lutyens Delhi students?',
        answer:
          'We understand the high expectations of elite families. Our faculty includes AIIMS doctors, we offer flexible schedules, and provide individual attention.',
      },
    ],
    stats: {
      studentsFromCity: '45+',
      successRate: '98%',
      rating: '4.9',
    },
    geoCoordinates: {
      lat: '28.5850',
      lng: '77.2270',
    },
  },

  'moti-bagh': {
    slug: 'moti-bagh',
    cityName: 'Moti Bagh',
    stateName: 'Delhi',
    metaTitle: 'Biology Classes in Moti Bagh | NEET Coaching Govt Colony | Cerebrum Academy',
    metaDescription:
      'Best biology classes in Moti Bagh for govt officers families. NEET & Board preparation with AIIMS faculty. Near Bhikaji Cama Place. Call 88264-44334.',
    heroTitle: 'Best Biology Classes in Moti Bagh',
    heroSubtitle:
      'Expert NEET biology coaching for Moti Bagh colony residents. Convenient location near metro for govt officers families.',
    hasOfflineCenter: true,
    nearestCenter: {
      name: 'South Delhi Center',
      address: 'Block D, South Extension Part 2, New Delhi',
      distance: '6 km from Moti Bagh',
    },
    localities: [
      { name: 'Moti Bagh I', url: '/biology-classes-moti-bagh' },
      { name: 'Moti Bagh II', url: '/biology-classes-moti-bagh' },
      { name: 'Bhikaji Cama Place', url: '/biology-classes-moti-bagh' },
      { name: 'Africa Avenue', url: '/biology-classes-moti-bagh' },
    ],
    relatedCities: [
      { name: 'RK Puram', url: '/biology-classes-rk-puram' },
      { name: 'Sarojini Nagar', url: '/biology-classes-sarojini-nagar' },
      { name: 'South Delhi', url: '/biology-classes-south-delhi' },
    ],
    faqs: [
      {
        question: 'Is there good NEET coaching accessible from Moti Bagh?',
        answer:
          'Yes! Cerebrum Biology Academy is easily accessible from Moti Bagh via metro. Many students from this govt colony study with us for NEET preparation.',
      },
      {
        question: 'Do you have flexible timings for Moti Bagh students?',
        answer:
          'Absolutely! We offer morning and evening batches to suit different schedules. Weekend doubt sessions are also available for working parents convenience.',
      },
    ],
    stats: {
      studentsFromCity: '120+',
      successRate: '96%',
      rating: '4.8',
    },
    geoCoordinates: {
      lat: '28.5825',
      lng: '77.1725',
    },
  },

  'golf-links': {
    slug: 'golf-links',
    cityName: 'Golf Links',
    stateName: 'Delhi',
    metaTitle: 'Biology Classes in Golf Links | Elite NEET Coaching Lutyens Delhi | Cerebrum',
    metaDescription:
      'Exclusive biology classes for Golf Links elite families. Personalized NEET coaching with AIIMS faculty. Flexible home tutoring available. Call 88264-44334.',
    heroTitle: 'Elite Biology Classes for Golf Links',
    heroSubtitle:
      'Ultra-premium NEET biology coaching for Golf Links families. Personalized attention and flexible scheduling for elite students.',
    hasOfflineCenter: true,
    nearestCenter: {
      name: 'South Delhi Center',
      address: 'Block D, South Extension Part 2, New Delhi',
      distance: '5 km from Golf Links',
    },
    localities: [
      { name: 'Golf Links Colony', url: '/biology-classes-golf-links' },
      { name: 'Khan Market', url: '/biology-classes-golf-links' },
      { name: 'Jor Bagh', url: '/biology-classes-jor-bagh' },
      { name: 'Sunder Nagar', url: '/biology-classes-golf-links' },
    ],
    relatedCities: [
      { name: 'Lodhi Colony', url: '/biology-classes-lodhi-colony' },
      { name: 'Jor Bagh', url: '/biology-classes-jor-bagh' },
      { name: 'Defence Colony', url: '/biology-classes-defence-colony' },
    ],
    faqs: [
      {
        question: 'Do you offer home tutoring for Golf Links families?',
        answer:
          'Yes! We provide personalized home tutoring options for Golf Links families who prefer private coaching. AIIMS-trained faculty available for one-on-one sessions.',
      },
      {
        question: 'What makes your coaching suitable for elite families?',
        answer:
          'We offer complete flexibility - choose your timing, batch size (even 1:1), and location. Our faculty understands high-achieving families expectations.',
      },
    ],
    stats: {
      studentsFromCity: '25+',
      successRate: '99%',
      rating: '5.0',
    },
    geoCoordinates: {
      lat: '28.5975',
      lng: '77.2320',
    },
  },

  'jor-bagh': {
    slug: 'jor-bagh',
    cityName: 'Jor Bagh',
    stateName: 'Delhi',
    metaTitle: 'Biology Classes in Jor Bagh | Premium NEET Coaching Lutyens | Cerebrum Academy',
    metaDescription:
      'Premium biology classes in Jor Bagh near Lodhi Gardens. Exclusive NEET coaching for diplomats and elite families. AIIMS faculty. Call 88264-44334.',
    heroTitle: 'Premium Biology Classes in Jor Bagh',
    heroSubtitle:
      'Exclusive NEET biology coaching for Jor Bagh families. Near Lodhi Gardens with personalized attention for discerning students.',
    hasOfflineCenter: true,
    nearestCenter: {
      name: 'South Delhi Center',
      address: 'Block D, South Extension Part 2, New Delhi',
      distance: '4 km from Jor Bagh',
    },
    localities: [
      { name: 'Jor Bagh Colony', url: '/biology-classes-jor-bagh' },
      { name: 'Lodhi Gardens', url: '/biology-classes-jor-bagh' },
      { name: 'Lodhi Art District', url: '/biology-classes-jor-bagh' },
      { name: 'Lodhi Colony', url: '/biology-classes-lodhi-colony' },
    ],
    relatedCities: [
      { name: 'Lodhi Colony', url: '/biology-classes-lodhi-colony' },
      { name: 'Golf Links', url: '/biology-classes-golf-links' },
      { name: 'Defence Colony', url: '/biology-classes-defence-colony' },
    ],
    faqs: [
      {
        question: 'Is there quality NEET coaching near Jor Bagh?',
        answer:
          'Yes! Cerebrum Biology Academy offers premium NEET coaching accessible from Jor Bagh. Our personalized approach suits the high standards of Jor Bagh families.',
      },
      {
        question: 'Do you offer flexible timings for busy families?',
        answer:
          'Absolutely! We understand elite families have unique schedules. Choose from morning, afternoon, or evening batches. Private sessions also available.',
      },
    ],
    stats: {
      studentsFromCity: '30+',
      successRate: '98%',
      rating: '4.9',
    },
    geoCoordinates: {
      lat: '28.5895',
      lng: '77.2230',
    },
  },

  'gulmohar-park': {
    slug: 'gulmohar-park',
    cityName: 'Gulmohar Park',
    stateName: 'Delhi',
    metaTitle: 'Biology Classes in Gulmohar Park | Elite NEET Coaching | Cerebrum Academy',
    metaDescription:
      'Elite biology classes in Gulmohar Park for celebrity and industrialist families. Premium NEET coaching with AIIMS faculty. Call 88264-44334 for consultation.',
    heroTitle: 'Elite Biology Classes in Gulmohar Park',
    heroSubtitle:
      'Exclusive NEET biology coaching for Gulmohar Park elite enclave. Personalized attention for celebrity and industrialist families.',
    hasOfflineCenter: true,
    nearestCenter: {
      name: 'South Delhi Center',
      address: 'Block D, South Extension Part 2, New Delhi',
      distance: '3 km from Gulmohar Park',
    },
    localities: [
      { name: 'Gulmohar Park', url: '/biology-classes-gulmohar-park' },
      { name: 'Hauz Khas Village', url: '/biology-classes-hauz-khas' },
      { name: 'SDA Market', url: '/biology-classes-gulmohar-park' },
      { name: 'Green Park', url: '/biology-classes-green-park' },
    ],
    relatedCities: [
      { name: 'Hauz Khas', url: '/biology-classes-hauz-khas' },
      { name: 'Green Park', url: '/biology-classes-green-park' },
      { name: 'Greater Kailash', url: '/biology-classes-greater-kailash' },
    ],
    faqs: [
      {
        question: 'Do you offer private NEET coaching for Gulmohar Park families?',
        answer:
          'Yes! We provide exclusive 1:1 and small group coaching perfect for Gulmohar Park families. Complete privacy and personalized curriculum.',
      },
      {
        question: 'What results have students from this area achieved?',
        answer:
          'Students from Gulmohar Park have achieved top ranks in NEET. Our personalized approach ensures each student reaches their full potential.',
      },
    ],
    stats: {
      studentsFromCity: '40+',
      successRate: '98%',
      rating: '4.9',
    },
    geoCoordinates: {
      lat: '28.5550',
      lng: '77.2050',
    },
  },

  munirka: {
    slug: 'munirka',
    cityName: 'Munirka',
    stateName: 'Delhi',
    metaTitle: 'Biology Classes in Munirka | Affordable NEET Coaching Near JNU | Cerebrum Academy',
    metaDescription:
      'Affordable biology classes in Munirka near JNU. Best NEET coaching for serious aspirants. Student-friendly fees. Call 88264-44334 for enrollment.',
    heroTitle: 'Affordable Biology Classes in Munirka',
    heroSubtitle:
      'Quality NEET biology coaching in Munirka student hub. Near JNU with affordable fees for serious NEET aspirants.',
    hasOfflineCenter: true,
    nearestCenter: {
      name: 'South Delhi Center',
      address: 'Block D, South Extension Part 2, New Delhi',
      distance: '7 km from Munirka',
    },
    localities: [
      { name: 'Munirka Village', url: '/biology-classes-munirka' },
      { name: 'Munirka Enclave', url: '/biology-classes-munirka' },
      { name: 'JNU Campus', url: '/biology-classes-munirka' },
      { name: 'RK Puram Sector 13', url: '/biology-classes-rk-puram' },
    ],
    relatedCities: [
      { name: 'RK Puram', url: '/biology-classes-rk-puram' },
      { name: 'Vasant Kunj', url: '/biology-classes-vasant-kunj' },
      { name: 'Hauz Khas', url: '/biology-classes-hauz-khas' },
    ],
    faqs: [
      {
        question: 'Is there affordable NEET coaching in Munirka?',
        answer:
          'Yes! Cerebrum Biology Academy offers quality NEET coaching at student-friendly fees. Many Munirka students preparing for NEET study with us.',
      },
      {
        question: 'Do you have hostels or PG coordination for outstation students?',
        answer:
          'While we dont run hostels, we can help connect you with trusted PG accommodations in Munirka area for outstation NEET aspirants.',
      },
    ],
    stats: {
      studentsFromCity: '200+',
      successRate: '95%',
      rating: '4.7',
    },
    geoCoordinates: {
      lat: '28.5575',
      lng: '77.1675',
    },
  },

  'safdarjung-enclave': {
    slug: 'safdarjung-enclave',
    cityName: 'Safdarjung Enclave',
    stateName: 'Delhi',
    metaTitle: 'Biology Classes in Safdarjung Enclave | NEET Coaching Near AIIMS | Cerebrum',
    metaDescription:
      'Best biology classes in Safdarjung Enclave near AIIMS. Premium NEET coaching for doctor families. Expert AIIMS faculty. Call 88264-44334 for demo.',
    heroTitle: 'Best Biology Classes in Safdarjung Enclave',
    heroSubtitle:
      'Premium NEET biology coaching near AIIMS for Safdarjung Enclave residents. Many doctor families trust us for quality preparation.',
    hasOfflineCenter: true,
    nearestCenter: {
      name: 'South Delhi Center',
      address: 'Block D, South Extension Part 2, New Delhi',
      distance: '4 km from Safdarjung Enclave',
    },
    localities: [
      { name: 'Safdarjung Enclave', url: '/biology-classes-safdarjung-enclave' },
      { name: 'Humayunpur', url: '/biology-classes-safdarjung-enclave' },
      { name: 'Green Park Extension', url: '/biology-classes-green-park' },
      { name: 'AIIMS Area', url: '/biology-classes-safdarjung-enclave' },
    ],
    relatedCities: [
      { name: 'Green Park', url: '/biology-classes-green-park' },
      { name: 'Hauz Khas', url: '/biology-classes-hauz-khas' },
      { name: 'Defence Colony', url: '/biology-classes-defence-colony' },
    ],
    faqs: [
      {
        question: 'Why do doctor families choose your NEET coaching?',
        answer:
          'Many Safdarjung Enclave doctor families choose us because our faculty includes AIIMS doctors who understand medical education deeply. We provide insider guidance for NEET success.',
      },
      {
        question: 'How close are you to AIIMS?',
        answer:
          'Our South Delhi center is just 4 km from Safdarjung Enclave, easily accessible via Green Park metro. Many AIIMS doctors children study with us.',
      },
    ],
    stats: {
      studentsFromCity: '85+',
      successRate: '98%',
      rating: '4.9',
    },
    geoCoordinates: {
      lat: '28.5650',
      lng: '77.2025',
    },
  },

  'east-of-kailash': {
    slug: 'east-of-kailash',
    cityName: 'East of Kailash',
    stateName: 'Delhi',
    metaTitle: 'Biology Classes in East of Kailash | NEET Coaching DPS EOK | Cerebrum Academy',
    metaDescription:
      'Best biology classes in East of Kailash for DPS EOK students. Expert NEET coaching near Greater Kailash. AIIMS faculty. Call 88264-44334 for demo.',
    heroTitle: 'Best Biology Classes in East of Kailash',
    heroSubtitle:
      'Expert NEET biology coaching for East of Kailash students. Specialized preparation for DPS East of Kailash students.',
    hasOfflineCenter: true,
    nearestCenter: {
      name: 'South Delhi Center',
      address: 'Block D, South Extension Part 2, New Delhi',
      distance: '5 km from East of Kailash',
    },
    localities: [
      { name: 'East of Kailash', url: '/biology-classes-east-of-kailash' },
      { name: 'DPS EOK Area', url: '/biology-classes-east-of-kailash' },
      { name: 'Nehru Place', url: '/biology-classes-nehru-place' },
      { name: 'Greater Kailash', url: '/biology-classes-greater-kailash' },
    ],
    relatedCities: [
      { name: 'Greater Kailash', url: '/biology-classes-greater-kailash' },
      { name: 'Nehru Place', url: '/biology-classes-nehru-place' },
      { name: 'CR Park', url: '/biology-classes-cr-park' },
    ],
    faqs: [
      {
        question: 'Do you have special batches for DPS East of Kailash students?',
        answer:
          'Yes! We have many DPS EOK students and understand their curriculum well. Our timing and teaching align with DPS academic calendar.',
      },
      {
        question: 'How is East of Kailash connected to your center?',
        answer:
          'East of Kailash is well-connected to our South Delhi center via Nehru Place/Kailash Colony metro. Just 15-20 minutes commute.',
      },
    ],
    stats: {
      studentsFromCity: '110+',
      successRate: '96%',
      rating: '4.8',
    },
    geoCoordinates: {
      lat: '28.5525',
      lng: '77.2475',
    },
  },

  'panchsheel-park': {
    slug: 'panchsheel-park',
    cityName: 'Panchsheel Park',
    stateName: 'Delhi',
    metaTitle: 'Biology Classes in Panchsheel Park | Premium NEET Coaching | Cerebrum Academy',
    metaDescription:
      'Premium biology classes in Panchsheel Park. Expert NEET coaching for upscale South Delhi families. Near GK & Chirag Delhi. Call 88264-44334.',
    heroTitle: 'Premium Biology Classes in Panchsheel Park',
    heroSubtitle:
      'Upscale NEET biology coaching for Panchsheel Park families. Quality preparation in a premium environment.',
    hasOfflineCenter: true,
    nearestCenter: {
      name: 'South Delhi Center',
      address: 'Block D, South Extension Part 2, New Delhi',
      distance: '4 km from Panchsheel Park',
    },
    localities: [
      { name: 'Panchsheel Park', url: '/biology-classes-panchsheel-park' },
      { name: 'Sheikh Sarai', url: '/biology-classes-panchsheel-park' },
      { name: 'Chirag Delhi', url: '/biology-classes-panchsheel-park' },
      { name: 'Greater Kailash', url: '/biology-classes-greater-kailash' },
    ],
    relatedCities: [
      { name: 'Greater Kailash', url: '/biology-classes-greater-kailash' },
      { name: 'Malviya Nagar', url: '/biology-classes-malviya-nagar' },
      { name: 'Hauz Khas', url: '/biology-classes-hauz-khas' },
    ],
    faqs: [
      {
        question: 'Is there quality NEET coaching near Panchsheel Park?',
        answer:
          'Yes! Cerebrum Biology Academy is just 4 km from Panchsheel Park. Many families from this upscale locality choose us for premium NEET preparation.',
      },
      {
        question: 'What batch sizes do you offer?',
        answer:
          'We maintain small batches of 15-20 students for personalized attention. Premium 1:1 coaching also available for Panchsheel Park families.',
      },
    ],
    stats: {
      studentsFromCity: '65+',
      successRate: '98%',
      rating: '4.8',
    },
    geoCoordinates: {
      lat: '28.5395',
      lng: '77.2175',
    },
  },

  alaknanda: {
    slug: 'alaknanda',
    cityName: 'Alaknanda',
    stateName: 'Delhi',
    metaTitle: 'Biology Classes in Alaknanda | NEET Coaching Near Nehru Place | Cerebrum Academy',
    metaDescription:
      'Best biology classes in Alaknanda for NEET & Boards. Quality coaching near Nehru Place & Lotus Temple. Affordable fees. Call 88264-44334 for enrollment.',
    heroTitle: 'Best Biology Classes in Alaknanda',
    heroSubtitle:
      'Quality NEET biology coaching for Alaknanda residents. Well-planned DDA colony with metro connectivity to our center.',
    hasOfflineCenter: true,
    nearestCenter: {
      name: 'South Delhi Center',
      address: 'Block D, South Extension Part 2, New Delhi',
      distance: '6 km from Alaknanda',
    },
    localities: [
      { name: 'Alaknanda Market', url: '/biology-classes-alaknanda' },
      { name: 'Kalkaji', url: '/biology-classes-kalkaji' },
      { name: 'Nehru Place', url: '/biology-classes-nehru-place' },
      { name: 'Greater Kailash', url: '/biology-classes-greater-kailash' },
    ],
    relatedCities: [
      { name: 'Kalkaji', url: '/biology-classes-kalkaji' },
      { name: 'CR Park', url: '/biology-classes-cr-park' },
      { name: 'Greater Kailash', url: '/biology-classes-greater-kailash' },
    ],
    faqs: [
      {
        question: 'Is there good NEET coaching accessible from Alaknanda?',
        answer:
          'Yes! Cerebrum Biology Academy is easily accessible from Alaknanda via Nehru Place metro. Many students from this DDA colony study with us.',
      },
      {
        question: 'What are the fees for Alaknanda students?',
        answer:
          'Our fees range from ₹45,000 to ₹75,000 per year for comprehensive NEET preparation. Includes all study material and test series.',
      },
    ],
    stats: {
      studentsFromCity: '95+',
      successRate: '95%',
      rating: '4.7',
    },
    geoCoordinates: {
      lat: '28.5325',
      lng: '77.2525',
    },
  },

  // Gurugram School-Specific Pages
  'biology-classes-dps-gurgaon': {
    slug: 'biology-classes-dps-gurgaon',
    cityName: 'DPS Gurgaon',
    stateName: 'Haryana',
    metaTitle:
      'Biology Classes for DPS Gurgaon Students | NEET Coaching Near DPS | Cerebrum Academy',
    metaDescription:
      'Best biology classes for DPS Gurgaon students (Sector 45 & 67C). NEET coaching in Sector 51 near DPS campus. AIIMS faculty, 98% success rate. Call 88264-44334!',
    heroTitle: 'Biology Classes for DPS Gurgaon Students',
    heroSubtitle:
      'Specialized NEET biology coaching for DPS Gurgaon (Sector 45 & 67C) students. Our Sector 51 center is just 10-15 minutes from both DPS campuses.',
    hasOfflineCenter: true,
    nearestCenter: {
      name: 'Gurgaon Sector 51 Center',
      address: 'M2K Corporate Park, Sector 51, Gurugram',
      distance: '10-15 min from DPS Gurgaon',
    },
    localities: [
      { name: 'DPS Sector 45', url: '/biology-classes-dps-gurgaon' },
      { name: 'DPS Sector 67C', url: '/biology-classes-dps-gurgaon' },
      { name: 'Sector 51 Gurgaon', url: '/biology-classes-gurgaon-sector-51' },
      { name: 'Sector 56 Gurgaon', url: '/biology-classes-gurgaon-sector-56' },
      { name: 'Sector 49 Gurgaon', url: '/biology-classes-gurgaon-sector-49' },
    ],
    relatedCities: [
      { name: 'Gurgaon', url: '/biology-classes-gurgaon' },
      { name: 'Golf Course Road', url: '/biology-classes-golf-course-road-gurgaon' },
      { name: 'South City Gurgaon', url: '/biology-classes-south-city-gurgaon' },
    ],
    faqs: [
      {
        question: 'Is Cerebrum Academy good for DPS Gurgaon students preparing for NEET?',
        answer:
          'Absolutely! Many DPS Gurgaon students from both Sector 45 and 67C campuses study with us. Our Sector 51 center is conveniently located 10-15 minutes from both DPS campuses. Our batch timings complement DPS school schedules.',
      },
      {
        question: 'How far is Cerebrum Academy from DPS Gurgaon Sector 45?',
        answer:
          'Our M2K Corporate Park center in Sector 51 is approximately 4 km from DPS Gurgaon Sector 45 - about 10-12 minutes drive. Many students come directly after school.',
      },
      {
        question: 'Do you have special batches for DPS students?',
        answer:
          'Yes, we offer evening batches (4:30 PM onwards) specifically designed for school-going students from DPS and other premium schools. Weekend intensive batches are also available.',
      },
      {
        question: 'What is the fee for DPS students joining NEET coaching?',
        answer:
          'Our comprehensive NEET biology program costs ₹45,000 to ₹75,000 per year. We also offer special packages for students from DPS and other partner schools. Contact us for current offers.',
      },
    ],
    stats: {
      studentsFromCity: '180+',
      successRate: '98%',
      rating: '4.9',
    },
    geoCoordinates: {
      lat: '28.4425',
      lng: '77.0629',
    },
  },

  'biology-classes-shri-ram-school-gurgaon': {
    slug: 'biology-classes-shri-ram-school-gurgaon',
    cityName: 'Shri Ram School Gurgaon',
    stateName: 'Haryana',
    metaTitle:
      'Biology Classes for Shri Ram School Students | NEET Coaching Aravali Moulsari | Cerebrum',
    metaDescription:
      'Best biology classes for The Shri Ram School (Aravali & Moulsari) students. NEET coaching in Sector 51 Gurgaon. AIIMS faculty. 98% success. Call 88264-44334!',
    heroTitle: 'Biology Classes for The Shri Ram School Students',
    heroSubtitle:
      'Premium NEET biology coaching for The Shri Ram School students (Aravali & Moulsari Avenue). Our curriculum complements TSRS pedagogy.',
    hasOfflineCenter: true,
    nearestCenter: {
      name: 'Gurgaon Sector 51 Center',
      address: 'M2K Corporate Park, Sector 51, Gurugram',
      distance: '15-20 min from TSRS campuses',
    },
    localities: [
      { name: 'TSRS Aravali', url: '/biology-classes-shri-ram-school-gurgaon' },
      { name: 'TSRS Moulsari', url: '/biology-classes-shri-ram-school-gurgaon' },
      { name: 'DLF Phase 4', url: '/biology-classes-dlf-gurgaon' },
      { name: 'Golf Course Road', url: '/biology-classes-golf-course-road-gurgaon' },
      { name: 'Nirvana Country', url: '/biology-classes-nirvana-country-gurgaon' },
    ],
    relatedCities: [
      { name: 'Gurgaon', url: '/biology-classes-gurgaon' },
      { name: 'DLF Gurgaon', url: '/biology-classes-dlf-gurgaon' },
      { name: 'Golf Course Road', url: '/biology-classes-golf-course-road-gurgaon' },
    ],
    faqs: [
      {
        question: 'Do you offer biology coaching suitable for The Shri Ram School students?',
        answer:
          "Yes! We understand the unique academic environment of TSRS. Our teaching methodology is designed to complement the school's progressive pedagogy while ensuring thorough NEET preparation.",
      },
      {
        question: 'How far is Cerebrum from The Shri Ram School Aravali?',
        answer:
          'Our Sector 51 center is approximately 8 km from TSRS Aravali campus - about 15-20 minutes drive via Golf Course Extension Road.',
      },
      {
        question: 'Can TSRS students manage NEET preparation alongside school curriculum?',
        answer:
          'Absolutely! We offer flexible batch timings including evening (post 4 PM) and weekend batches. Many TSRS students successfully balance both and excel in NEET.',
      },
      {
        question: 'Do TSRS students perform well in NEET at Cerebrum?',
        answer:
          'Yes! TSRS students are among our top performers. Their strong conceptual foundation from school, combined with our NEET-focused training, leads to excellent results. Many have secured top medical colleges.',
      },
    ],
    stats: {
      studentsFromCity: '120+',
      successRate: '98%',
      rating: '4.9',
    },
    geoCoordinates: {
      lat: '28.4540',
      lng: '77.0820',
    },
  },

  'biology-classes-pathways-world-school': {
    slug: 'biology-classes-pathways-world-school',
    cityName: 'Pathways World School',
    stateName: 'Haryana',
    metaTitle:
      'Biology Classes for Pathways World School | NEET Coaching Aravali Hills | Cerebrum Academy',
    metaDescription:
      'Best biology classes for Pathways World School (Aravali Hills) students. NEET coaching in Sector 51 Gurgaon. IB & CBSE compatible. Call 88264-44334!',
    heroTitle: 'Biology Classes for Pathways World School Students',
    heroSubtitle:
      'Specialized NEET biology coaching for Pathways World School students. We bridge IB/Cambridge curriculum with NEET requirements.',
    hasOfflineCenter: true,
    nearestCenter: {
      name: 'Gurgaon Sector 51 Center',
      address: 'M2K Corporate Park, Sector 51, Gurugram',
      distance: '25-30 min from Pathways Aravali',
    },
    localities: [
      { name: 'Pathways Aravali', url: '/biology-classes-pathways-world-school' },
      { name: 'Sohna Road', url: '/biology-classes-sohna-road-gurgaon' },
      { name: 'South City Gurgaon', url: '/biology-classes-south-city-gurgaon' },
      { name: 'Sector 49 Gurgaon', url: '/biology-classes-gurgaon-sector-49' },
    ],
    relatedCities: [
      { name: 'Gurgaon', url: '/biology-classes-gurgaon' },
      { name: 'Sohna Road', url: '/biology-classes-sohna-road-gurgaon' },
      { name: 'South City', url: '/biology-classes-south-city-gurgaon' },
    ],
    faqs: [
      {
        question: 'Can IB students from Pathways prepare for NEET at Cerebrum?',
        answer:
          'Yes! We have extensive experience teaching IB Biology students. Our program bridges the gap between IB Higher Level Biology and NEET syllabus, covering additional NEET-specific topics.',
      },
      {
        question: 'How do you help Pathways students transition to NEET preparation?',
        answer:
          'We provide a comprehensive gap analysis for IB/Cambridge students. Our specialized bridge module covers NEET-specific topics not in international curricula, ensuring complete preparation.',
      },
      {
        question: 'What batch timings suit Pathways boarding students?',
        answer:
          'We offer weekend intensive batches (Saturday-Sunday) and vacation crash courses specifically designed for boarding school students. Online live classes are also available.',
      },
      {
        question: 'Is travel from Pathways Aravali to Sector 51 feasible?',
        answer:
          "While it's a 25-30 minute drive, many Pathways students opt for our weekend batches or online classes. Day scholars often combine with pickup pools from Aravali area.",
      },
    ],
    stats: {
      studentsFromCity: '60+',
      successRate: '96%',
      rating: '4.8',
    },
    geoCoordinates: {
      lat: '28.3910',
      lng: '77.0720',
    },
  },

  'biology-classes-gd-goenka-gurgaon': {
    slug: 'biology-classes-gd-goenka-gurgaon',
    cityName: 'GD Goenka Gurgaon',
    stateName: 'Haryana',
    metaTitle:
      'Biology Classes for GD Goenka Students | NEET Coaching Sohna Road | Cerebrum Academy',
    metaDescription:
      'Best biology classes for GD Goenka World School students. NEET coaching in Sector 51 Gurgaon, near Sohna Road. AIIMS faculty. Call 88264-44334 for demo!',
    heroTitle: 'Biology Classes for GD Goenka World School Students',
    heroSubtitle:
      'Expert NEET biology coaching for GD Goenka students. Our Sector 51 center is conveniently accessible from Sohna Road.',
    hasOfflineCenter: true,
    nearestCenter: {
      name: 'Gurgaon Sector 51 Center',
      address: 'M2K Corporate Park, Sector 51, Gurugram',
      distance: '20-25 min from GD Goenka',
    },
    localities: [
      { name: 'GD Goenka Sohna', url: '/biology-classes-gd-goenka-gurgaon' },
      { name: 'Sohna Road', url: '/biology-classes-sohna-road-gurgaon' },
      { name: 'Sector 49 Gurgaon', url: '/biology-classes-gurgaon-sector-49' },
      { name: 'South City', url: '/biology-classes-south-city-gurgaon' },
    ],
    relatedCities: [
      { name: 'Gurgaon', url: '/biology-classes-gurgaon' },
      { name: 'Sohna Road', url: '/biology-classes-sohna-road-gurgaon' },
      { name: 'Sector 49', url: '/biology-classes-gurgaon-sector-49' },
    ],
    faqs: [
      {
        question: 'Is Cerebrum Academy suitable for GD Goenka students?',
        answer:
          "Absolutely! Many GD Goenka World School students study with us. Our teaching methodology complements the school's academic standards while focusing on NEET preparation.",
      },
      {
        question: 'How do GD Goenka students travel to your Sector 51 center?',
        answer:
          'Our center is about 20-25 minutes from GD Goenka via Sohna Road. Many students carpool or use the SPR (Southern Peripheral Road) for quick access.',
      },
      {
        question: 'Do you offer combined school + NEET curriculum support?',
        answer:
          'Yes! Our biology coaching covers both CBSE Class 11-12 syllabus and NEET preparation. GD Goenka students can manage school exams and NEET prep simultaneously.',
      },
      {
        question: 'What results have GD Goenka students achieved at Cerebrum?',
        answer:
          'GD Goenka students have consistently performed well, with several securing admissions to top government medical colleges. Their strong academic foundation helps them excel in our program.',
      },
    ],
    stats: {
      studentsFromCity: '85+',
      successRate: '98%',
      rating: '4.8',
    },
    geoCoordinates: {
      lat: '28.3690',
      lng: '77.0580',
    },
  },

  'biology-classes-heritage-school-gurgaon': {
    slug: 'biology-classes-heritage-school-gurgaon',
    cityName: 'Heritage School Gurgaon',
    stateName: 'Haryana',
    metaTitle:
      'Biology Classes for Heritage School Students | NEET Coaching Sector 62 | Cerebrum Academy',
    metaDescription:
      'Best biology classes for Heritage Xperiential Learning School students. NEET coaching near Sector 62 Gurgaon. AIIMS faculty. Call 88264-44334!',
    heroTitle: 'Biology Classes for Heritage School Students',
    heroSubtitle:
      'Specialized NEET biology coaching for Heritage Xperiential Learning School students. Experience-based learning meets exam-focused preparation.',
    hasOfflineCenter: true,
    nearestCenter: {
      name: 'Gurgaon Sector 51 Center',
      address: 'M2K Corporate Park, Sector 51, Gurugram',
      distance: '15-20 min from Heritage School',
    },
    localities: [
      { name: 'Heritage Sector 62', url: '/biology-classes-heritage-school-gurgaon' },
      { name: 'Sector 56 Gurgaon', url: '/biology-classes-gurgaon-sector-56' },
      { name: 'Golf Course Extension', url: '/biology-classes-golf-course-extension-gurgaon' },
      { name: 'Sector 49 Gurgaon', url: '/biology-classes-gurgaon-sector-49' },
    ],
    relatedCities: [
      { name: 'Gurgaon', url: '/biology-classes-gurgaon' },
      { name: 'Sector 56', url: '/biology-classes-gurgaon-sector-56' },
      { name: 'Golf Course Extension', url: '/biology-classes-golf-course-extension-gurgaon' },
    ],
    faqs: [
      {
        question: "How does Cerebrum complement Heritage School's experiential learning approach?",
        answer:
          "We appreciate Heritage's experiential pedagogy. Our teaching uses practical examples, visual learning, and conceptual understanding - aligning with experiential methods while adding NEET-specific rigor.",
      },
      {
        question: 'Is the Sector 51 center convenient for Heritage School students?',
        answer:
          'Yes! Our M2K Corporate Park center is approximately 6 km from Heritage School Sector 62 - about 15-20 minutes drive via Golf Course Extension Road.',
      },
      {
        question: 'Do Heritage School students need extra support for NEET?',
        answer:
          'Heritage students typically have strong conceptual understanding. Our program helps them channel this into NEET-specific problem-solving and time management skills.',
      },
      {
        question: 'What batch timings work for Heritage School students?',
        answer:
          'We offer evening batches starting 4:30 PM and weekend batches. Heritage students can choose timings that fit their school schedule and extracurricular activities.',
      },
    ],
    stats: {
      studentsFromCity: '70+',
      successRate: '98%',
      rating: '4.8',
    },
    geoCoordinates: {
      lat: '28.4220',
      lng: '77.0750',
    },
  },

  'biology-classes-amity-gurgaon': {
    slug: 'biology-classes-amity-gurgaon',
    cityName: 'Amity Gurgaon',
    stateName: 'Haryana',
    metaTitle:
      'Biology Classes for Amity Gurgaon Students | NEET Coaching Sector 46 | Cerebrum Academy',
    metaDescription:
      'Best biology classes for Amity International School Gurgaon students. NEET coaching in Sector 51, near Sector 46. AIIMS faculty. Call 88264-44334!',
    heroTitle: 'Biology Classes for Amity International School Students',
    heroSubtitle:
      'Expert NEET biology coaching for Amity Gurgaon students. Our Sector 51 center is just 10 minutes from Amity campus.',
    hasOfflineCenter: true,
    nearestCenter: {
      name: 'Gurgaon Sector 51 Center',
      address: 'M2K Corporate Park, Sector 51, Gurugram',
      distance: '10 min from Amity Sector 46',
    },
    localities: [
      { name: 'Amity Sector 46', url: '/biology-classes-amity-gurgaon' },
      { name: 'Sector 51 Gurgaon', url: '/biology-classes-gurgaon-sector-51' },
      { name: 'Sector 47 Gurgaon', url: '/biology-classes-gurgaon-sector-47' },
      { name: 'Sector 56 Gurgaon', url: '/biology-classes-gurgaon-sector-56' },
    ],
    relatedCities: [
      { name: 'Gurgaon', url: '/biology-classes-gurgaon' },
      { name: 'Sector 51', url: '/biology-classes-gurgaon-sector-51' },
      { name: 'Sector 56', url: '/biology-classes-gurgaon-sector-56' },
    ],
    faqs: [
      {
        question: 'How close is Cerebrum Academy to Amity International School?',
        answer:
          'Our Sector 51 center is just 3 km from Amity International School Sector 46 - approximately 10 minutes by road. This makes it very convenient for Amity students.',
      },
      {
        question: 'Do many Amity students study at Cerebrum?',
        answer:
          'Yes! Amity Gurgaon students form a significant part of our student community. The proximity of our center to their school makes daily attendance convenient.',
      },
      {
        question: 'Can Amity students come directly after school?',
        answer:
          'Absolutely! Our 4:30 PM batch is popular among Amity students. They can reach our center within 10 minutes of school dismissal.',
      },
      {
        question: 'What is the fee structure for Amity students?',
        answer:
          'Our fees range from ₹45,000 to ₹75,000 per year. We offer special group discounts when multiple Amity students join together. Contact for current offers.',
      },
    ],
    stats: {
      studentsFromCity: '150+',
      successRate: '98%',
      rating: '4.9',
    },
    geoCoordinates: {
      lat: '28.4350',
      lng: '77.0520',
    },
  },

  'biology-classes-scottish-high-gurgaon': {
    slug: 'biology-classes-scottish-high-gurgaon',
    cityName: 'Scottish High Gurgaon',
    stateName: 'Haryana',
    metaTitle:
      'Biology Classes for Scottish High Students | NEET Coaching Sushant Lok | Cerebrum Academy',
    metaDescription:
      'Best biology classes for Scottish High International School students. NEET coaching in Sector 51 Gurgaon, near Sushant Lok. Call 88264-44334 for demo!',
    heroTitle: 'Biology Classes for Scottish High Students',
    heroSubtitle:
      'Premium NEET biology coaching for Scottish High International School students. Bridge IB/Cambridge curriculum with NEET preparation.',
    hasOfflineCenter: true,
    nearestCenter: {
      name: 'Gurgaon Sector 51 Center',
      address: 'M2K Corporate Park, Sector 51, Gurugram',
      distance: '15-20 min from Scottish High',
    },
    localities: [
      { name: 'Scottish High Sushant Lok', url: '/biology-classes-scottish-high-gurgaon' },
      { name: 'Sushant Lok', url: '/biology-classes-sushant-lok-gurgaon' },
      { name: 'DLF Phase 4', url: '/biology-classes-dlf-gurgaon' },
      { name: 'Golf Course Road', url: '/biology-classes-golf-course-road-gurgaon' },
    ],
    relatedCities: [
      { name: 'Gurgaon', url: '/biology-classes-gurgaon' },
      { name: 'DLF Gurgaon', url: '/biology-classes-dlf-gurgaon' },
      { name: 'Golf Course Road', url: '/biology-classes-golf-course-road-gurgaon' },
    ],
    faqs: [
      {
        question: 'Do you teach IB Biology students from Scottish High?',
        answer:
          'Yes! We have specialized modules for IB Biology students. Our program bridges the gap between IB Higher Level Biology and NEET syllabus effectively.',
      },
      {
        question: 'How far is Cerebrum from Scottish High International School?',
        answer:
          'Our Sector 51 center is approximately 7 km from Scottish High in Sushant Lok - about 15-20 minutes drive via Golf Course Road.',
      },
      {
        question: 'Can Scottish High students manage both IB and NEET?',
        answer:
          'Absolutely! Many of our successful students are from Scottish High. With proper planning and our flexible batch timings, students excel in both IB and NEET.',
      },
      {
        question: 'What additional support do IB students get?',
        answer:
          'We provide supplementary material covering NEET topics not in IB curriculum. Our faculty has experience teaching international curriculum students and understanding their unique needs.',
      },
    ],
    stats: {
      studentsFromCity: '90+',
      successRate: '98%',
      rating: '4.8',
    },
    geoCoordinates: {
      lat: '28.4670',
      lng: '77.0730',
    },
  },

  'biology-classes-suncity-school-gurgaon': {
    slug: 'biology-classes-suncity-school-gurgaon',
    cityName: 'Suncity School Gurgaon',
    stateName: 'Haryana',
    metaTitle:
      'Biology Classes for Suncity School Students | NEET Coaching Sector 54 | Cerebrum Academy',
    metaDescription:
      'Best biology classes for Suncity World School students. NEET coaching in Sector 51 Gurgaon, near Sector 54. AIIMS faculty. Call 88264-44334!',
    heroTitle: 'Biology Classes for Suncity World School Students',
    heroSubtitle:
      'Expert NEET biology coaching for Suncity World School students. Just 5 minutes from your school campus!',
    hasOfflineCenter: true,
    nearestCenter: {
      name: 'Gurgaon Sector 51 Center',
      address: 'M2K Corporate Park, Sector 51, Gurugram',
      distance: '5 min from Suncity School',
    },
    localities: [
      { name: 'Suncity School Sector 54', url: '/biology-classes-suncity-school-gurgaon' },
      { name: 'Sector 51 Gurgaon', url: '/biology-classes-gurgaon-sector-51' },
      { name: 'Sector 56 Gurgaon', url: '/biology-classes-gurgaon-sector-56' },
      { name: 'Golf Course Extension', url: '/biology-classes-golf-course-extension-gurgaon' },
    ],
    relatedCities: [
      { name: 'Gurgaon', url: '/biology-classes-gurgaon' },
      { name: 'Sector 51', url: '/biology-classes-gurgaon-sector-51' },
      { name: 'Sector 56', url: '/biology-classes-gurgaon-sector-56' },
    ],
    faqs: [
      {
        question: 'How close is Cerebrum to Suncity World School?',
        answer:
          'We are just 1.5 km from Suncity World School Sector 54! Our Sector 51 center is the closest NEET coaching for Suncity students - approximately 5 minutes by road.',
      },
      {
        question: 'Can Suncity students walk to your center?',
        answer:
          'While walking is possible (about 15-20 minutes), most students prefer a short drive or cycle. The proximity makes it very convenient for daily classes.',
      },
      {
        question: 'Do you have special arrangements for Suncity students?',
        answer:
          'Yes! Given our proximity, we offer flexible timing options. Many Suncity students join our 4 PM batch immediately after school dismissal.',
      },
      {
        question: 'How do Suncity students perform at Cerebrum?',
        answer:
          'Suncity students are among our top performers! The combination of their strong school foundation and our NEET-focused coaching has produced excellent results year after year.',
      },
    ],
    stats: {
      studentsFromCity: '110+',
      successRate: '98%',
      rating: '4.9',
    },
    geoCoordinates: {
      lat: '28.4380',
      lng: '77.0680',
    },
  },

  // Gurugram Biology Tuition Pages
  'biology-tuition-gurgaon': {
    slug: 'biology-tuition-gurgaon',
    cityName: 'Gurgaon',
    stateName: 'Haryana',
    metaTitle: 'Biology Tuition in Gurgaon | Best Biology Tutor Gurugram | Cerebrum Academy',
    metaDescription:
      'Best biology tuition in Gurgaon with offline center in Sector 51. AIIMS faculty for NEET & Board prep. Class 9-12 biology tutor. Call 88264-44334 for demo!',
    heroTitle: 'Best Biology Tuition in Gurgaon',
    heroSubtitle:
      'Expert biology tuition for NEET and Board exams. Personal attention with small batch sizes at our Sector 51 Gurugram center.',
    hasOfflineCenter: true,
    nearestCenter: {
      name: 'Gurgaon Sector 51 Center',
      address: 'M2K Corporate Park, Sector 51, Gurugram',
      distance: 'Centrally located in Gurgaon',
    },
    localities: [
      { name: 'Sector 51', url: '/biology-tuition-gurgaon-sector-51' },
      { name: 'Sector 56', url: '/biology-tuition-gurgaon-sector-56' },
      { name: 'Golf Course Road', url: '/biology-tuition-golf-course-road-gurgaon' },
      { name: 'DLF Areas', url: '/biology-tuition-dlf-gurgaon' },
      { name: 'Nirvana Country', url: '/biology-tuition-nirvana-country-gurgaon' },
    ],
    relatedCities: [
      { name: 'Biology Classes Gurgaon', url: '/biology-classes-gurgaon' },
      { name: 'NEET Coaching Gurgaon', url: '/neet-coaching-gurgaon' },
      { name: 'Biology Tutor Delhi', url: '/biology-tutor-delhi' },
    ],
    faqs: [
      {
        question: 'What makes Cerebrum the best biology tuition in Gurgaon?',
        answer:
          'Cerebrum offers expert biology tuition with AIIMS-trained faculty, small batch sizes (15-20 students), personalized attention, and a proven 98% success rate. Our Sector 51 location is accessible from all parts of Gurgaon.',
      },
      {
        question: 'Do you offer home tuition for biology in Gurgaon?',
        answer:
          "While we don't offer home tuition, our center-based coaching provides superior resources, peer learning, and systematic preparation. Many families find our Sector 51 center convenient from Eldeco Acacia, Central Park, and surrounding areas.",
      },
      {
        question: 'What is the fee for biology tuition in Gurgaon?',
        answer:
          'Our biology tuition fees range from ₹45,000 to ₹75,000 per year depending on the program. This includes regular classes, study material, test series, and doubt sessions.',
      },
      {
        question: 'Which classes do you offer biology tuition for?',
        answer:
          'We offer biology tuition for Class 9, 10, 11, and 12 students. We also have specialized batches for NEET aspirants, droppers, and 12th Board exam preparation.',
      },
    ],
    stats: {
      studentsFromCity: '1,50,000+',
      successRate: '98%',
      rating: '4.9',
    },
    geoCoordinates: {
      lat: '28.4495',
      lng: '77.0726',
    },
  },

  'biology-tutor-gurgaon': {
    slug: 'biology-tutor-gurgaon',
    cityName: 'Gurgaon',
    stateName: 'Haryana',
    metaTitle: 'Best Biology Tutor in Gurgaon | AIIMS Faculty | NEET Expert | Cerebrum Academy',
    metaDescription:
      'Find the best biology tutor in Gurgaon for NEET & Boards. AIIMS-trained faculty at Sector 51 center. 98% success rate. Book demo: 88264-44334!',
    heroTitle: 'Best Biology Tutor in Gurgaon',
    heroSubtitle:
      'Learn from AIIMS-trained biology experts at our Gurgaon center. Personal mentorship and proven teaching methodology.',
    hasOfflineCenter: true,
    nearestCenter: {
      name: 'Gurgaon Sector 51 Center',
      address: 'M2K Corporate Park, Sector 51, Gurugram',
      distance: 'Your local biology expert',
    },
    localities: [
      { name: 'Sector 51 Gurgaon', url: '/biology-classes-gurgaon-sector-51' },
      { name: 'Golf Course Road', url: '/biology-classes-golf-course-road-gurgaon' },
      { name: 'South City', url: '/biology-classes-south-city-gurgaon' },
      { name: 'Nirvana Country', url: '/biology-classes-nirvana-country-gurgaon' },
    ],
    relatedCities: [
      { name: 'Biology Tuition Gurgaon', url: '/biology-tuition-gurgaon' },
      { name: 'NEET Coaching Gurgaon', url: '/neet-coaching-gurgaon' },
      { name: 'Biology Classes Gurgaon', url: '/biology-classes-gurgaon' },
    ],
    faqs: [
      {
        question: 'Who is the best biology tutor in Gurgaon for NEET?',
        answer:
          'Cerebrum Biology Academy has AIIMS-trained faculty who are considered among the best biology tutors in Gurgaon. Dr. Shekhar and his team have helped hundreds of students crack NEET with top ranks.',
      },
      {
        question: 'How experienced are the biology tutors at Cerebrum?',
        answer:
          'Our biology tutors have 15+ years of teaching experience with backgrounds from AIIMS and top medical institutions. They understand NEET patterns thoroughly and provide personalized guidance.',
      },
      {
        question: 'Can I get a personal biology tutor for my child in Gurgaon?',
        answer:
          'While we offer small batch coaching (not 1-on-1 home tuition), our batch sizes of 15-20 students ensure personal attention. We also provide dedicated doubt sessions and mentor support.',
      },
      {
        question: 'What areas in Gurgaon do your biology tutors serve?',
        answer:
          'Our Sector 51 center serves students from all Gurgaon areas including DLF, Golf Course Road, Sohna Road, Nirvana Country, South City, and surrounding localities.',
      },
    ],
    stats: {
      studentsFromCity: '1,50,000+',
      successRate: '98%',
      rating: '4.9',
    },
    geoCoordinates: {
      lat: '28.4495',
      lng: '77.0726',
    },
  },

  'biology-tutor-gurugram': {
    slug: 'biology-tutor-gurugram',
    cityName: 'Gurugram',
    stateName: 'Haryana',
    metaTitle: 'Best Biology Tutor in Gurugram 2026 | AIIMS Faculty | Cerebrum Academy',
    metaDescription:
      'Top biology tutor in Gurugram for NEET & Boards. AIIMS-trained faculty, 98% success rate. Class 9-12, NEET. Sector 51 center. Call 88264-44334!',
    heroTitle: 'Best Biology Tutor in Gurugram',
    heroSubtitle:
      'Learn from AIIMS-trained biology experts. Personal attention in small batches at our Gurugram center.',
    hasOfflineCenter: true,
    nearestCenter: {
      name: 'Gurugram Center',
      address: 'M2K Corporate Park, Sector 51, Gurugram 122018',
      distance: 'Your local biology expert',
    },
    localities: [
      { name: 'Sector 51', url: '/biology-classes-gurgaon-sector-51' },
      { name: 'DLF Phases', url: '/biology-classes-dlf-gurgaon' },
      { name: 'Golf Course Road', url: '/biology-classes-golf-course-road-gurgaon' },
      { name: 'Sohna Road', url: '/biology-classes-sohna-road-gurgaon' },
    ],
    relatedCities: [
      { name: 'Biology Tuition Gurugram', url: '/biology-tuition-gurgaon' },
      { name: 'NEET Coaching Gurugram', url: '/neet-coaching-gurugram' },
      { name: 'Biology Classes Gurugram', url: '/biology-classes-gurgaon' },
    ],
    faqs: [
      {
        question: 'Who is the best biology tutor in Gurugram?',
        answer:
          'Dr. Shekhar Singh (AIIMS alumnus) at Cerebrum Biology Academy is considered one of the best biology tutors in Gurugram. With 15+ years experience and 98% success rate, he has helped thousands crack NEET.',
      },
      {
        question: 'What classes do you offer biology tutoring for?',
        answer:
          'We offer biology tutoring for Class 9, 10, 11, 12 and NEET preparation. Our tutors specialize in CBSE, ICSE, and Haryana Board curricula along with competitive exam prep.',
      },
      {
        question: 'Do you offer home tuition in Gurugram?',
        answer:
          'We offer center-based coaching in small batches (15-20 students) which is more effective than home tuition. For students who cannot travel, we have live online classes with the same faculty.',
      },
      {
        question: 'What is the fee for biology tutoring in Gurugram?',
        answer:
          'Our biology tutoring fees range from ₹35,000-60,000/year for Class 9-10 and ₹45,000-75,000 for Class 11-12/NEET. This includes classes, study material, and test series.',
      },
    ],
    stats: {
      studentsFromCity: '1,50,000+',
      successRate: '98%',
      rating: '4.9',
    },
    geoCoordinates: {
      lat: '28.4495',
      lng: '77.0726',
    },
  },

  'aiims-coaching-gurugram': {
    slug: 'aiims-coaching-gurugram',
    cityName: 'Gurugram',
    stateName: 'Haryana',
    metaTitle: 'AIIMS Coaching in Gurugram 2026 | Medical Entrance Prep | Cerebrum Academy',
    metaDescription:
      'Top AIIMS coaching in Gurugram for NEET-UG. AIIMS alumni faculty, 65+ AIIMS selections, 98% success. Medical entrance preparation. Call 88264-44334!',
    heroTitle: 'AIIMS Coaching in Gurugram',
    heroSubtitle:
      'Prepare for AIIMS and top medical colleges with faculty who studied there. 65+ AIIMS selections from our center.',
    hasOfflineCenter: true,
    nearestCenter: {
      name: 'Gurugram Center',
      address: 'M2K Corporate Park, Sector 51, Gurugram 122018',
      distance: 'AIIMS-trained faculty here',
    },
    localities: [
      { name: 'Sector 51', url: '/neet-coaching-gurgaon-sector-51' },
      { name: 'DLF Phases', url: '/neet-coaching-dlf-gurgaon' },
      { name: 'Golf Course Road', url: '/neet-coaching-golf-course-road-gurgaon' },
      { name: 'Sohna Road', url: '/neet-coaching-sohna-road-gurgaon' },
    ],
    relatedCities: [
      { name: 'NEET Coaching Gurugram', url: '/neet-coaching-gurugram' },
      { name: 'Best NEET Coaching', url: '/best-neet-coaching-gurugram' },
      { name: 'NEET Fees Gurugram', url: '/neet-coaching-fees-gurugram' },
    ],
    faqs: [
      {
        question: 'Can I get into AIIMS from Gurugram coaching?',
        answer:
          'Yes! 65+ students from Cerebrum have secured admission to AIIMS Delhi and other AIIMS campuses. Our AIIMS alumni faculty know exactly what it takes to crack AIIMS.',
      },
      {
        question: 'What score is needed for AIIMS Delhi?',
        answer:
          'AIIMS Delhi typically requires 700+ marks in NEET (99.9+ percentile). Our focused Biology coaching helps students score 340-360/360 in Biology section, crucial for high overall scores.',
      },
      {
        question: 'Do you only prepare for AIIMS?',
        answer:
          'We prepare for all medical colleges through NEET-UG. AIIMS, JIPMER, and all government medical colleges admit through NEET. Our coaching targets 650+ scores for top college admissions.',
      },
      {
        question: 'Who teaches AIIMS coaching at Cerebrum?',
        answer:
          'Dr. Shekhar Singh (AIIMS alumnus with 15+ years experience) leads our faculty. All teachers are from top medical colleges and understand the NEET pattern thoroughly.',
      },
    ],
    stats: {
      studentsFromCity: '65+',
      successRate: '98%',
      rating: '4.9',
    },
    geoCoordinates: {
      lat: '28.4495',
      lng: '77.0726',
    },
  },

  'biology-10th-boards-gurgaon': {
    slug: 'biology-10th-boards-gurgaon',
    cityName: 'Gurgaon',
    stateName: 'Haryana',
    metaTitle: 'Biology Coaching for 10th Boards Gurgaon | CBSE Class 10 | Cerebrum Academy',
    metaDescription:
      'Best biology coaching for Class 10 board exams in Gurgaon. CBSE, ICSE, Haryana Board. Strong foundation for NEET. Sector 51 center. Call 88264-44334!',
    heroTitle: 'Biology Coaching for 10th Board Exams Gurgaon',
    heroSubtitle:
      'Build a strong biology foundation in Class 10. Perfect preparation for boards and future NEET success.',
    hasOfflineCenter: true,
    nearestCenter: {
      name: 'Gurugram Center',
      address: 'M2K Corporate Park, Sector 51, Gurugram 122018',
      distance: 'Class 10 Biology Expert',
    },
    localities: [
      { name: 'Sector 51', url: '/biology-classes-gurgaon-sector-51' },
      { name: 'DLF Phases', url: '/biology-classes-dlf-gurgaon' },
      { name: 'Golf Course Road', url: '/biology-classes-golf-course-road-gurgaon' },
      { name: 'South City', url: '/biology-classes-south-city-gurgaon' },
    ],
    relatedCities: [
      { name: 'Biology Class 9-10 Gurgaon', url: '/biology-class-9-10-gurgaon' },
      { name: 'Biology Class 11 Gurgaon', url: '/biology-class-11-gurgaon' },
      { name: 'NEET Foundation', url: '/neet-foundation-class-10-gurugram' },
    ],
    faqs: [
      {
        question: 'Do you offer biology coaching for Class 10 boards?',
        answer:
          'Yes! We offer specialized Class 10 biology coaching for CBSE, ICSE, and Haryana Board. Our program covers complete syllabus with focus on scoring maximum in boards.',
      },
      {
        question: 'How does Class 10 biology help for NEET?',
        answer:
          'Class 10 builds the foundation. Topics like cell biology, life processes, heredity, and evolution are directly tested in NEET. Strong Class 10 basics make Class 11-12 NEET prep easier.',
      },
      {
        question: 'What is the fee for Class 10 biology coaching?',
        answer:
          'Class 10 biology coaching costs ₹35,000-45,000/year including study material and test series. Combined Class 9-10 foundation program available at special rates.',
      },
      {
        question: 'Can Class 10 students prepare for NEET simultaneously?',
        answer:
          'Yes! Our NEET Foundation program for Class 10 covers board syllabus plus introduces NEET-level concepts. Students who start early have better success rates in NEET.',
      },
    ],
    stats: {
      studentsFromCity: '500+',
      successRate: '95%',
      rating: '4.9',
    },
    geoCoordinates: {
      lat: '28.4495',
      lng: '77.0726',
    },
  },

  'class-9-biology-tuition-gurugram': {
    slug: 'class-9-biology-tuition-gurugram',
    cityName: 'Gurugram',
    stateName: 'Haryana',
    metaTitle: 'Class 9 Biology Tuition in Gurugram 2026 | Foundation Course | Cerebrum Academy',
    metaDescription:
      'Best Class 9 biology tuition in Gurugram. Build strong foundation for NEET. CBSE, ICSE curriculum. Sector 51 center. Call 88264-44334!',
    heroTitle: 'Class 9 Biology Tuition in Gurugram',
    heroSubtitle:
      'Start your NEET journey early with our Class 9 biology foundation. Build concepts that matter for Class 10, 11, 12 and NEET.',
    hasOfflineCenter: true,
    nearestCenter: {
      name: 'Gurugram Center',
      address: 'M2K Corporate Park, Sector 51, Gurugram 122018',
      distance: 'Class 9 Biology Expert',
    },
    localities: [
      { name: 'Sector 51', url: '/biology-classes-gurgaon-sector-51' },
      { name: 'DLF Phases', url: '/biology-classes-dlf-gurgaon' },
      { name: 'Golf Course Road', url: '/biology-classes-golf-course-road-gurgaon' },
    ],
    relatedCities: [
      { name: 'Class 9-10 Biology Gurgaon', url: '/biology-class-9-10-gurgaon' },
      { name: 'NEET Foundation Class 9', url: '/neet-foundation-class-9-gurugram' },
      { name: 'Class 10 Biology Tuition', url: '/class-10-biology-tuition-gurugram' },
    ],
    faqs: [
      {
        question: 'Is Class 9 biology tuition necessary for NEET?',
        answer:
          'Starting Class 9 builds strong foundation. Topics like cell biology, tissues, life processes lay groundwork for NEET. Early starters have 25% better NEET scores.',
      },
      {
        question: 'What is the fee for Class 9 biology tuition?',
        answer:
          'Class 9 biology tuition costs ₹30,000-40,000/year including study material. Combined Class 9-10 foundation available at ₹55,000 for 2 years.',
      },
    ],
    stats: {
      studentsFromCity: '300+',
      successRate: '95%',
      rating: '4.9',
    },
    geoCoordinates: {
      lat: '28.4495',
      lng: '77.0726',
    },
  },

  'class-10-biology-tuition-gurugram': {
    slug: 'class-10-biology-tuition-gurugram',
    cityName: 'Gurugram',
    stateName: 'Haryana',
    metaTitle: 'Class 10 Biology Tuition in Gurugram 2026 | Board + NEET Prep | Cerebrum Academy',
    metaDescription:
      'Best Class 10 biology tuition in Gurugram for boards and NEET foundation. CBSE, ICSE, Haryana Board. Sector 51 center. Call 88264-44334!',
    heroTitle: 'Class 10 Biology Tuition in Gurugram',
    heroSubtitle:
      'Excel in board exams while building NEET foundation. Comprehensive Class 10 biology coaching.',
    hasOfflineCenter: true,
    nearestCenter: {
      name: 'Gurugram Center',
      address: 'M2K Corporate Park, Sector 51, Gurugram 122018',
      distance: 'Class 10 Biology Expert',
    },
    localities: [
      { name: 'Sector 51', url: '/biology-classes-gurgaon-sector-51' },
      { name: 'DLF Phases', url: '/biology-classes-dlf-gurgaon' },
      { name: 'Sohna Road', url: '/biology-classes-sohna-road-gurgaon' },
    ],
    relatedCities: [
      { name: '10th Boards Biology', url: '/biology-10th-boards-gurgaon' },
      { name: 'NEET Foundation Class 10', url: '/neet-foundation-class-10-gurugram' },
      { name: 'Class 11 Biology', url: '/class-11-biology-tuition-gurugram' },
    ],
    faqs: [
      {
        question: 'What topics are covered in Class 10 biology tuition?',
        answer:
          'Complete CBSE/ICSE syllabus: Life Processes, Control & Coordination, Reproduction, Heredity & Evolution, Environment. Plus NEET foundation topics.',
      },
      {
        question: 'How does Class 10 biology help for NEET?',
        answer:
          'Class 10 covers 15-20% of NEET Biology syllabus directly. Strong foundation in heredity, evolution, and life processes is crucial for NEET success.',
      },
    ],
    stats: {
      studentsFromCity: '400+',
      successRate: '96%',
      rating: '4.9',
    },
    geoCoordinates: {
      lat: '28.4495',
      lng: '77.0726',
    },
  },

  'class-11-biology-tuition-gurugram': {
    slug: 'class-11-biology-tuition-gurugram',
    cityName: 'Gurugram',
    stateName: 'Haryana',
    metaTitle: 'Class 11 Biology Tuition in Gurugram 2026 | NEET Foundation | Cerebrum Academy',
    metaDescription:
      'Top Class 11 biology tuition in Gurugram for NEET preparation. AIIMS faculty, 98% results. Botany + Zoology. Sector 51. Call 88264-44334!',
    heroTitle: 'Class 11 Biology Tuition in Gurugram',
    heroSubtitle:
      'The most important year for NEET prep begins. Master Class 11 Biology with AIIMS-trained faculty.',
    hasOfflineCenter: true,
    nearestCenter: {
      name: 'Gurugram Center',
      address: 'M2K Corporate Park, Sector 51, Gurugram 122018',
      distance: 'Class 11 NEET Expert',
    },
    localities: [
      { name: 'Sector 51', url: '/biology-classes-gurgaon-sector-51' },
      { name: 'DLF Phases', url: '/biology-classes-dlf-gurgaon' },
      { name: 'Golf Course Road', url: '/biology-classes-golf-course-road-gurgaon' },
    ],
    relatedCities: [
      { name: 'Class 11 Biology Gurgaon', url: '/biology-class-11-gurgaon' },
      { name: 'NEET Coaching Gurugram', url: '/neet-coaching-gurugram' },
      { name: 'Class 12 Biology', url: '/class-12-biology-tuition-gurugram' },
    ],
    faqs: [
      {
        question: 'Why is Class 11 biology crucial for NEET?',
        answer:
          'Class 11 covers 50% of NEET Biology syllabus. Topics like Plant Kingdom, Animal Kingdom, Cell Biology, and Plant Physiology appear heavily in NEET. Strong Class 11 = easier Class 12.',
      },
      {
        question: 'What is the fee for Class 11 biology tuition?',
        answer:
          'Class 11 NEET biology tuition costs ₹60,000-75,000/year including study material, test series, and doubt clearing. 2-year package (Class 11+12) available at ₹1,10,000.',
      },
    ],
    stats: {
      studentsFromCity: '600+',
      successRate: '98%',
      rating: '4.9',
    },
    geoCoordinates: {
      lat: '28.4495',
      lng: '77.0726',
    },
  },

  'class-12-biology-tuition-gurugram': {
    slug: 'class-12-biology-tuition-gurugram',
    cityName: 'Gurugram',
    stateName: 'Haryana',
    metaTitle: 'Class 12 Biology Tuition in Gurugram 2026 | Board + NEET | Cerebrum Academy',
    metaDescription:
      'Best Class 12 biology tuition in Gurugram for boards and NEET. AIIMS faculty, 98% results. Intensive preparation. Sector 51. Call 88264-44334!',
    heroTitle: 'Class 12 Biology Tuition in Gurugram',
    heroSubtitle:
      'Final year, maximum stakes. Excel in boards and crack NEET with our intensive Class 12 program.',
    hasOfflineCenter: true,
    nearestCenter: {
      name: 'Gurugram Center',
      address: 'M2K Corporate Park, Sector 51, Gurugram 122018',
      distance: 'Class 12 NEET Expert',
    },
    localities: [
      { name: 'Sector 51', url: '/biology-classes-gurgaon-sector-51' },
      { name: 'DLF Phases', url: '/biology-classes-dlf-gurgaon' },
      { name: 'Sohna Road', url: '/biology-classes-sohna-road-gurgaon' },
    ],
    relatedCities: [
      { name: 'Class 12 Biology Gurgaon', url: '/biology-class-12-gurgaon' },
      { name: '12th Boards Biology', url: '/biology-12th-boards-gurgaon' },
      { name: 'NEET Coaching', url: '/neet-coaching-gurugram' },
    ],
    faqs: [
      {
        question: 'Can I prepare for boards and NEET together in Class 12?',
        answer:
          'Yes! 85% of NEET Biology is from NCERT. Our Class 12 program covers boards thoroughly while adding NEET-level practice. Most students score 90%+ in boards and 300+/360 in NEET Biology.',
      },
      {
        question: 'What is the fee for Class 12 biology coaching?',
        answer:
          'Class 12 NEET biology coaching costs ₹70,000-85,000/year including study material, test series, and daily doubt clearing. Intensive batch with extra classes available at ₹95,000.',
      },
    ],
    stats: {
      studentsFromCity: '800+',
      successRate: '98%',
      rating: '4.9',
    },
    geoCoordinates: {
      lat: '28.4495',
      lng: '77.0726',
    },
  },

  'biology-12th-boards-gurgaon': {
    slug: 'biology-12th-boards-gurgaon',
    cityName: 'Gurgaon',
    stateName: 'Haryana',
    metaTitle: 'Biology Coaching for 12th Boards Gurgaon | Class 12 CBSE | Cerebrum Academy',
    metaDescription:
      'Best biology coaching for Class 12 board exams in Gurgaon. CBSE, Haryana Board. Score 95%+ in boards while preparing for NEET. Sector 51 center. Call 88264-44334!',
    heroTitle: 'Biology Coaching for 12th Board Exams Gurgaon',
    heroSubtitle:
      'Final year biology - score 95%+ in boards while preparing for NEET. Human physiology, genetics, biotechnology, ecology experts.',
    hasOfflineCenter: true,
    nearestCenter: {
      name: 'Gurugram Center',
      address: 'M2K Corporate Park, Sector 51, Gurugram 122018',
      distance: 'Class 12 Biology Expert',
    },
    localities: [
      { name: 'Sector 51', url: '/biology-classes-gurgaon-sector-51' },
      { name: 'DLF Phases', url: '/biology-classes-dlf-gurgaon' },
      { name: 'Golf Course Road', url: '/biology-classes-golf-course-road-gurgaon' },
      { name: 'Sohna Road', url: '/biology-classes-sohna-road-gurgaon' },
    ],
    relatedCities: [
      { name: 'Class 12 Biology Tuition', url: '/class-12-biology-tuition-gurugram' },
      { name: '10th Boards Biology', url: '/biology-10th-boards-gurgaon' },
      { name: 'NEET Coaching Gurugram', url: '/neet-coaching-gurugram' },
    ],
    faqs: [
      {
        question: 'Do you offer biology coaching for Class 12 boards?',
        answer:
          'Yes! We offer specialized Class 12 biology coaching for CBSE and Haryana Board. Our program covers complete syllabus with focus on scoring 95%+ in boards while preparing for NEET.',
      },
      {
        question: 'Which topics in Class 12 biology are most important for boards and NEET?',
        answer:
          'Human Physiology (30% weightage), Genetics & Evolution (25%), Biotechnology (20%), and Ecology (15%) are crucial. Our coaching covers all with NCERT focus for boards + MCQ practice for NEET.',
      },
      {
        question: 'What is the fee for Class 12 board biology coaching?',
        answer:
          'Class 12 biology board + NEET coaching costs ₹70,000-85,000/year including study material, test series, and daily doubt clearing. Pure board-focused batch available at ₹55,000.',
      },
      {
        question: 'Can I join in December for board exam preparation?',
        answer:
          'Yes! We offer crash courses for Class 12 boards starting in December and January. 45-60 day intensive programs covering complete syllabus with previous year paper practice.',
      },
    ],
    stats: {
      studentsFromCity: '650+',
      successRate: '96%',
      rating: '4.9',
    },
    geoCoordinates: {
      lat: '28.4495',
      lng: '77.0726',
    },
  },

  'biology-home-tuition-gurgaon': {
    slug: 'biology-home-tuition-gurgaon',
    cityName: 'Gurgaon',
    stateName: 'Haryana',
    metaTitle:
      'Biology Home Tuition Gurgaon | Best Alternative - Center Coaching | Cerebrum Academy',
    metaDescription:
      'Looking for biology home tuition in Gurgaon? Try our superior center-based coaching in Sector 51. Better resources, peer learning, 98% results. 88264-44334!',
    heroTitle: 'Biology Coaching Near Your Home in Gurgaon',
    heroSubtitle:
      'Why home tuition when you can get better? Our Sector 51 center offers superior biology coaching with resources no home tutor can match.',
    hasOfflineCenter: true,
    nearestCenter: {
      name: 'Gurgaon Sector 51 Center',
      address: 'M2K Corporate Park, Sector 51, Gurugram',
      distance: 'Central Gurgaon location',
    },
    localities: [
      { name: 'Eldeco Acacia', url: '/biology-classes-gurgaon-sector-49' },
      { name: 'Central Park', url: '/biology-classes-gurgaon-sector-49' },
      { name: 'The Close South/North', url: '/biology-classes-nirvana-country-gurgaon' },
      { name: 'Palm Springs', url: '/biology-classes-golf-course-road-gurgaon' },
      { name: 'DLF Magnolias', url: '/biology-classes-dlf-gurgaon' },
    ],
    relatedCities: [
      { name: 'Biology Tuition Gurgaon', url: '/biology-tuition-gurgaon' },
      { name: 'Biology Tutor Gurgaon', url: '/biology-tutor-gurgaon' },
      { name: 'NEET Coaching Gurgaon', url: '/neet-coaching-gurgaon' },
    ],
    faqs: [
      {
        question: 'Is home tuition better than coaching for biology in Gurgaon?',
        answer:
          'Center-based coaching at Cerebrum offers advantages home tuition cannot: peer competition, comprehensive test series, lab facilities, and expert faculty. Our 98% success rate speaks for itself.',
      },
      {
        question: 'My child needs personal attention - is home tuition better?',
        answer:
          'Our small batches of 15-20 students ensure personal attention while providing peer learning benefits. We also offer dedicated doubt sessions and mentor support that exceed what home tutors provide.',
      },
      {
        question: 'How far is your center from major Gurgaon societies?',
        answer:
          'Our Sector 51 center is 5-15 minutes from most premium societies: Eldeco Acacia (5 min), Central Park (8 min), The Close (10 min), Palm Springs (12 min), DLF areas (15 min).',
      },
      {
        question: 'What if my child misses a class?',
        answer:
          'We provide recorded backup classes, makeup sessions, and comprehensive notes. Our systematic approach ensures no student falls behind, unlike unpredictable home tuition arrangements.',
      },
    ],
    stats: {
      studentsFromCity: '1,50,000+',
      successRate: '98%',
      rating: '4.9',
    },
    geoCoordinates: {
      lat: '28.4495',
      lng: '77.0726',
    },
  },

  // Class-Specific NEET Coaching Pages
  'class-11-neet-coaching-gurugram': {
    slug: 'class-11-neet-coaching-gurugram',
    cityName: 'Gurugram',
    stateName: 'Haryana',
    metaTitle: 'Class 11 NEET Coaching Gurugram 2026 | Foundation Year | Cerebrum Academy',
    metaDescription:
      'Best Class 11 NEET coaching in Gurugram. Build strong foundation in Physics, Chemistry, Biology. AIIMS faculty, 98% results. Sector 51. Call 88264-44334!',
    heroTitle: 'Class 11 NEET Coaching in Gurugram',
    heroSubtitle:
      'Your NEET journey begins here. Build unshakeable foundation in Class 11 for NEET 2027 success.',
    hasOfflineCenter: true,
    nearestCenter: {
      name: 'Gurugram Center',
      address: 'M2K Corporate Park, Sector 51, Gurugram 122018',
      distance: 'Class 11 NEET Expert',
    },
    localities: [
      { name: 'Sector 51', url: '/biology-classes-gurgaon-sector-51' },
      { name: 'DLF Phase 1-5', url: '/biology-classes-dlf-gurgaon' },
      { name: 'Golf Course Road', url: '/biology-classes-golf-course-road-gurgaon' },
      { name: 'Sohna Road', url: '/biology-classes-sohna-road-gurgaon' },
    ],
    relatedCities: [
      { name: 'Class 12 NEET Coaching', url: '/class-12-neet-coaching-gurugram' },
      { name: '2 Year NEET Course', url: '/2-year-neet-course-gurugram' },
      { name: 'NEET Foundation', url: '/neet-foundation-gurugram' },
    ],
    faqs: [
      {
        question: 'Why is Class 11 important for NEET preparation?',
        answer:
          'Class 11 covers 45% of NEET syllabus. Topics like Physics (Mechanics, Thermodynamics), Chemistry (Organic basics), Biology (Cell Biology, Plant Physiology) form the foundation. Students who skip Class 11 struggle in Class 12.',
      },
      {
        question: 'What is the fee for Class 11 NEET coaching in Gurugram?',
        answer:
          'Class 11 NEET coaching at Cerebrum costs ₹75,000-90,000/year including all subjects, study material, and test series. 2-year integrated program (Class 11+12) available at ₹1,40,000.',
      },
      {
        question: 'Can I join Class 11 NEET coaching mid-year?',
        answer:
          'Yes! We offer mid-year joining with catch-up classes. Our systematic approach with recorded backups ensures you cover all missed topics. Best to join by August for optimal preparation.',
      },
      {
        question: 'Do you cover school boards along with NEET in Class 11?',
        answer:
          '80% of NEET syllabus overlaps with CBSE. Our program covers both seamlessly. Students typically score 90%+ in boards while preparing for NEET.',
      },
    ],
    stats: {
      studentsFromCity: '600+',
      successRate: '98%',
      rating: '4.9',
    },
    geoCoordinates: {
      lat: '28.4495',
      lng: '77.0726',
    },
  },

  'class-12-neet-coaching-gurugram': {
    slug: 'class-12-neet-coaching-gurugram',
    cityName: 'Gurugram',
    stateName: 'Haryana',
    metaTitle: 'Class 12 NEET Coaching Gurugram 2026 | Final Year Prep | Cerebrum Academy',
    metaDescription:
      'Best Class 12 NEET coaching in Gurugram. Intensive preparation for NEET 2026. AIIMS faculty, daily tests, 98% results. Sector 51. Call 88264-44334!',
    heroTitle: 'Class 12 NEET Coaching in Gurugram',
    heroSubtitle:
      'Final year, maximum stakes. Intensive NEET preparation with board exam excellence guaranteed.',
    hasOfflineCenter: true,
    nearestCenter: {
      name: 'Gurugram Center',
      address: 'M2K Corporate Park, Sector 51, Gurugram 122018',
      distance: 'Class 12 NEET Expert',
    },
    localities: [
      { name: 'Sector 51', url: '/biology-classes-gurgaon-sector-51' },
      { name: 'DLF Phase 1-5', url: '/biology-classes-dlf-gurgaon' },
      { name: 'Golf Course Road', url: '/biology-classes-golf-course-road-gurgaon' },
      { name: 'Sector 56-57', url: '/neet-coaching-gurgaon-sector-56-57' },
    ],
    relatedCities: [
      { name: 'Class 11 NEET Coaching', url: '/class-11-neet-coaching-gurugram' },
      { name: '1 Year NEET Course', url: '/1-year-neet-course-gurugram' },
      { name: 'NEET Dropper Course', url: '/neet-dropper-course-gurugram' },
    ],
    faqs: [
      {
        question: 'What is covered in Class 12 NEET coaching?',
        answer:
          'Class 12 covers 55% of NEET syllabus including Human Physiology, Genetics, Biotechnology, Ecology (Biology), Organic Chemistry, Electrochemistry, Modern Physics. Plus complete revision of Class 11.',
      },
      {
        question: 'What is the fee for Class 12 NEET coaching in Gurugram?',
        answer:
          'Class 12 NEET coaching costs ₹85,000-1,00,000/year including all subjects, intensive test series, and board preparation. Scholarship up to 50% available based on test.',
      },
      {
        question: 'How do you balance boards and NEET in Class 12?',
        answer:
          'Our integrated approach covers both. Till February: board-focused preparation. March-April: NEET intensive. Our students average 93% in boards and 600+ in NEET.',
      },
      {
        question: 'Do you provide hostel facility for Class 12 NEET students?',
        answer:
          'We have tie-ups with PG accommodations near Sector 51 center. Safe, affordable options (₹8,000-15,000/month) with mess facility. Many outstation students use this.',
      },
    ],
    stats: {
      studentsFromCity: '800+',
      successRate: '98%',
      rating: '4.9',
    },
    geoCoordinates: {
      lat: '28.4495',
      lng: '77.0726',
    },
  },

  // Duration-Based NEET Course Pages
  '1-year-neet-course-gurugram': {
    slug: '1-year-neet-course-gurugram',
    cityName: 'Gurugram',
    stateName: 'Haryana',
    metaTitle: '1 Year NEET Course Gurugram 2026 | Intensive Program | Cerebrum Academy',
    metaDescription:
      'Best 1 year NEET course in Gurugram for Class 12 and dropper students. Complete syllabus coverage, 500+ tests, AIIMS faculty. Sector 51. Call 88264-44334!',
    heroTitle: '1 Year NEET Course in Gurugram',
    heroSubtitle:
      'Intensive 12-month program designed for focused NEET preparation. Ideal for Class 12 students and first-time droppers.',
    hasOfflineCenter: true,
    nearestCenter: {
      name: 'Gurugram Center',
      address: 'M2K Corporate Park, Sector 51, Gurugram 122018',
      distance: '1 Year NEET Expert',
    },
    localities: [
      { name: 'Sector 51', url: '/biology-classes-gurgaon-sector-51' },
      { name: 'DLF Phase 1-5', url: '/biology-classes-dlf-gurgaon' },
      { name: 'Sohna Road', url: '/biology-classes-sohna-road-gurgaon' },
    ],
    relatedCities: [
      { name: '2 Year NEET Course', url: '/2-year-neet-course-gurugram' },
      { name: '6 Month NEET Coaching', url: '/6-month-neet-coaching-gurugram' },
      { name: 'NEET Dropper Course', url: '/neet-dropper-course-gurugram' },
    ],
    faqs: [
      {
        question: 'What is covered in the 1 year NEET course?',
        answer:
          'Complete Class 11 + Class 12 syllabus for Physics, Chemistry, Biology. Includes 500+ chapter tests, 50+ full syllabus tests, NCERT mastery, and previous year paper practice.',
      },
      {
        question: 'What is the fee for 1 year NEET course in Gurugram?',
        answer:
          '1 year NEET course costs ₹1,20,000-1,50,000 including all subjects, study material, test series, and doubt clearing sessions. Scholarship up to 50% based on entrance test.',
      },
      {
        question: 'Is 1 year enough for NEET preparation?',
        answer:
          'Yes, if you are dedicated. Our 1 year course has produced 50+ NEET toppers. Daily 6-8 hours of focused study with our structured program is sufficient for 600+ score.',
      },
      {
        question: 'Who should join the 1 year NEET course?',
        answer:
          'Ideal for: Class 12 students targeting NEET 2026, First-time droppers, Students who completed Class 12 and want focused preparation.',
      },
    ],
    stats: {
      studentsFromCity: '400+',
      successRate: '96%',
      rating: '4.9',
    },
    geoCoordinates: {
      lat: '28.4495',
      lng: '77.0726',
    },
  },

  '2-year-neet-course-gurugram': {
    slug: '2-year-neet-course-gurugram',
    cityName: 'Gurugram',
    stateName: 'Haryana',
    metaTitle: '2 Year NEET Course Gurugram 2026-27 | Class 11-12 Integrated | Cerebrum Academy',
    metaDescription:
      'Best 2 year NEET course in Gurugram for Class 11 students. Integrated school + NEET preparation. AIIMS faculty, 98% results. Sector 51. Call 88264-44334!',
    heroTitle: '2 Year NEET Course in Gurugram',
    heroSubtitle:
      'The gold standard for NEET preparation. Start from Class 11 and build unshakeable foundation over 24 months.',
    hasOfflineCenter: true,
    nearestCenter: {
      name: 'Gurugram Center',
      address: 'M2K Corporate Park, Sector 51, Gurugram 122018',
      distance: '2 Year NEET Expert',
    },
    localities: [
      { name: 'Sector 51', url: '/biology-classes-gurgaon-sector-51' },
      { name: 'DLF Phase 1-5', url: '/biology-classes-dlf-gurgaon' },
      { name: 'Golf Course Road', url: '/biology-classes-golf-course-road-gurgaon' },
    ],
    relatedCities: [
      { name: '1 Year NEET Course', url: '/1-year-neet-course-gurugram' },
      { name: 'Class 11 NEET Coaching', url: '/class-11-neet-coaching-gurugram' },
      { name: 'NEET Foundation', url: '/neet-foundation-gurugram' },
    ],
    faqs: [
      {
        question: 'Why choose a 2 year NEET course?',
        answer:
          'Students with 2 years preparation score 15-20% higher than 1 year students. You get time to build concepts, practice extensively, and revise multiple times. Our 2 year students average 650+ in NEET.',
      },
      {
        question: 'What is the fee for 2 year NEET course in Gurugram?',
        answer:
          '2 year NEET course costs ₹1,80,000-2,20,000 for complete Class 11+12 (can be paid yearly at ₹95,000-1,10,000/year). Includes all subjects, material, tests, and board preparation.',
      },
      {
        question: 'Can I balance school and the 2 year NEET course?',
        answer:
          'Yes! Our 2 year program is designed for school-going students. Evening and weekend batches available. 80% syllabus overlaps with CBSE, so you prepare for both simultaneously.',
      },
      {
        question: 'What if I miss classes in the 2 year course?',
        answer:
          'We provide recorded backup of all classes, catch-up sessions during vacations, and dedicated mentors to ensure you never fall behind. Flexibility is built into the program.',
      },
    ],
    stats: {
      studentsFromCity: '500+',
      successRate: '98%',
      rating: '4.9',
    },
    geoCoordinates: {
      lat: '28.4495',
      lng: '77.0726',
    },
  },

  '6-month-neet-coaching-gurugram': {
    slug: '6-month-neet-coaching-gurugram',
    cityName: 'Gurugram',
    stateName: 'Haryana',
    metaTitle: '6 Month NEET Coaching Gurugram 2026 | Crash Course | Cerebrum Academy',
    metaDescription:
      'Intensive 6 month NEET coaching in Gurugram. Fast-track revision and practice. For droppers and late starters. Sector 51 center. Call 88264-44334!',
    heroTitle: '6 Month NEET Coaching in Gurugram',
    heroSubtitle:
      'Short on time but big on ambition? Our intensive 6-month program covers everything you need to crack NEET.',
    hasOfflineCenter: true,
    nearestCenter: {
      name: 'Gurugram Center',
      address: 'M2K Corporate Park, Sector 51, Gurugram 122018',
      distance: 'Crash Course Expert',
    },
    localities: [
      { name: 'Sector 51', url: '/biology-classes-gurgaon-sector-51' },
      { name: 'DLF Phase 1-5', url: '/biology-classes-dlf-gurgaon' },
      { name: 'Sohna Road', url: '/biology-classes-sohna-road-gurgaon' },
    ],
    relatedCities: [
      { name: '1 Year NEET Course', url: '/1-year-neet-course-gurugram' },
      { name: 'NEET Crash Course', url: '/neet-crash-course-gurugram' },
      { name: 'NEET Dropper Course', url: '/neet-dropper-course-gurugram' },
    ],
    faqs: [
      {
        question: 'Is 6 months enough for NEET preparation?',
        answer:
          'For students with strong Class 11-12 basics, yes. Our 6 month program focuses on revision, problem-solving, and test practice. Students with weak basics should consider 1 year course.',
      },
      {
        question: 'What is the fee for 6 month NEET coaching?',
        answer:
          '6 month NEET coaching costs ₹70,000-85,000 including all subjects, study material, 200+ tests, and daily doubt sessions. Intensive daily classes for 5-6 hours.',
      },
      {
        question: 'Who should join the 6 month NEET course?',
        answer:
          'Ideal for: Students who studied Class 11-12 well but need focused revision, Droppers who need targeted practice, Late starters who missed regular admission.',
      },
      {
        question: 'What is the daily schedule for 6 month course?',
        answer:
          'Morning batch: 6 AM - 12 PM, Evening batch: 2 PM - 8 PM. Daily 6 hours of classes covering Physics, Chemistry, Biology with tests every alternate day.',
      },
    ],
    stats: {
      studentsFromCity: '300+',
      successRate: '92%',
      rating: '4.8',
    },
    geoCoordinates: {
      lat: '28.4495',
      lng: '77.0726',
    },
  },

  // Batch Timing Pages
  'weekend-neet-batch-gurugram': {
    slug: 'weekend-neet-batch-gurugram',
    cityName: 'Gurugram',
    stateName: 'Haryana',
    metaTitle: 'Weekend NEET Batch Gurugram 2026 | Saturday-Sunday Classes | Cerebrum Academy',
    metaDescription:
      'Weekend NEET coaching in Gurugram for school students. Saturday-Sunday batches. Balance school and NEET prep. Sector 51 center. Call 88264-44334!',
    heroTitle: 'Weekend NEET Batch in Gurugram',
    heroSubtitle:
      'Perfect for school-going students. Intensive Saturday-Sunday classes to prepare for NEET without missing school.',
    hasOfflineCenter: true,
    nearestCenter: {
      name: 'Gurugram Center',
      address: 'M2K Corporate Park, Sector 51, Gurugram 122018',
      distance: 'Weekend Batch Available',
    },
    localities: [
      { name: 'Sector 51', url: '/biology-classes-gurgaon-sector-51' },
      { name: 'DLF Phase 1-5', url: '/biology-classes-dlf-gurgaon' },
      { name: 'Golf Course Road', url: '/biology-classes-golf-course-road-gurgaon' },
    ],
    relatedCities: [
      { name: 'Evening Batch NEET', url: '/evening-batch-neet-gurugram' },
      { name: 'Offline NEET Coaching', url: '/offline-neet-coaching-gurugram' },
      { name: 'Online NEET Classes', url: '/online-neet-classes-gurugram' },
    ],
    faqs: [
      {
        question: 'What are the timings for weekend NEET batch?',
        answer:
          'Saturday: 9 AM - 5 PM (Physics & Chemistry), Sunday: 9 AM - 3 PM (Biology + Tests). Total 14 hours of intensive coaching every weekend.',
      },
      {
        question: 'Can weekend batch students compete with regular batch students?',
        answer:
          'Yes! Weekend batch covers the same syllabus with same faculty. Many weekend batch students score 600+ in NEET. Key is doing self-study during weekdays.',
      },
      {
        question: 'What is the fee for weekend NEET batch?',
        answer:
          'Weekend NEET batch costs ₹65,000-80,000/year including study material and tests. Slightly lower than regular batch due to fewer contact hours.',
      },
      {
        question: 'Is weekend batch suitable for Class 11 students?',
        answer:
          'Perfect for Class 11! Students attend school Monday-Friday and prepare for NEET on weekends. Our 2-year weekend program produces excellent results.',
      },
    ],
    stats: {
      studentsFromCity: '350+',
      successRate: '98%',
      rating: '4.8',
    },
    geoCoordinates: {
      lat: '28.4495',
      lng: '77.0726',
    },
  },

  'evening-batch-neet-gurugram': {
    slug: 'evening-batch-neet-gurugram',
    cityName: 'Gurugram',
    stateName: 'Haryana',
    metaTitle: 'Evening Batch NEET Coaching Gurugram | After School | Cerebrum Academy',
    metaDescription:
      'Evening NEET coaching in Gurugram after school hours. 4 PM - 8 PM batches. Perfect for Class 11-12 students. Sector 51. Call 88264-44334!',
    heroTitle: 'Evening Batch NEET Coaching Gurugram',
    heroSubtitle:
      'Finish school, start NEET prep. Our evening batches run after school hours for seamless dual preparation.',
    hasOfflineCenter: true,
    nearestCenter: {
      name: 'Gurugram Center',
      address: 'M2K Corporate Park, Sector 51, Gurugram 122018',
      distance: 'Evening Batch 4-8 PM',
    },
    localities: [
      { name: 'Sector 51', url: '/biology-classes-gurgaon-sector-51' },
      { name: 'DLF Phase 1-5', url: '/biology-classes-dlf-gurgaon' },
      { name: 'Sohna Road', url: '/biology-classes-sohna-road-gurgaon' },
    ],
    relatedCities: [
      { name: 'Weekend NEET Batch', url: '/weekend-neet-batch-gurugram' },
      { name: 'Morning Batch NEET', url: '/morning-batch-neet-gurugram' },
      { name: 'Offline NEET Coaching', url: '/offline-neet-coaching-gurugram' },
    ],
    faqs: [
      {
        question: 'What are the evening batch timings?',
        answer:
          'Evening batches run 4 PM - 8 PM (Monday-Friday). One subject daily: Mon-Tue Physics, Wed-Thu Chemistry, Fri Biology. Saturday tests and doubt sessions.',
      },
      {
        question: 'Can school students manage evening batch?',
        answer:
          'Yes! Most school students prefer evening batches. They attend school till 2-3 PM, take a break, and join coaching at 4 PM. Thousands of our students follow this routine.',
      },
      {
        question: 'What is the fee for evening NEET batch?',
        answer:
          'Evening batch fees are same as regular batch: ₹75,000-95,000/year including all subjects, material, and test series.',
      },
      {
        question: 'Is evening batch available for droppers?',
        answer:
          'Droppers usually prefer morning batch for more study time. But evening batch is available for working droppers or those who prefer studying at night.',
      },
    ],
    stats: {
      studentsFromCity: '450+',
      successRate: '96%',
      rating: '4.9',
    },
    geoCoordinates: {
      lat: '28.4495',
      lng: '77.0726',
    },
  },

  'offline-neet-coaching-gurugram': {
    slug: 'offline-neet-coaching-gurugram',
    cityName: 'Gurugram',
    stateName: 'Haryana',
    metaTitle: 'Offline NEET Coaching Gurugram 2026 | Classroom Program | Cerebrum Academy',
    metaDescription:
      'Best offline NEET coaching in Gurugram. In-person classroom teaching at Sector 51 center. AIIMS faculty, small batches, 98% results. Call 88264-44334!',
    heroTitle: 'Offline NEET Coaching in Gurugram',
    heroSubtitle:
      'Nothing beats classroom learning. Join our offline batches for face-to-face interaction with AIIMS faculty.',
    hasOfflineCenter: true,
    nearestCenter: {
      name: 'Gurugram Center',
      address: 'M2K Corporate Park, Sector 51, Gurugram 122018',
      distance: 'Walk-in Anytime',
    },
    localities: [
      { name: 'Sector 51', url: '/biology-classes-gurgaon-sector-51' },
      { name: 'DLF Phase 1-5', url: '/biology-classes-dlf-gurgaon' },
      { name: 'Golf Course Road', url: '/biology-classes-golf-course-road-gurgaon' },
      { name: 'Sohna Road', url: '/biology-classes-sohna-road-gurgaon' },
    ],
    relatedCities: [
      { name: 'Online NEET Classes', url: '/online-neet-classes-gurugram' },
      { name: 'Hybrid NEET Coaching', url: '/hybrid-neet-coaching-gurugram' },
      { name: 'NEET Coaching Gurugram', url: '/neet-coaching-gurugram' },
    ],
    faqs: [
      {
        question: 'Why choose offline coaching over online?',
        answer:
          'Offline coaching offers: Direct faculty interaction, peer competition, lab facilities, instant doubt resolution, discipline of classroom. Our 98% success rate comes from offline batches.',
      },
      {
        question: 'What are the batch sizes for offline coaching?',
        answer:
          'We maintain small batches of 25-30 students maximum. This ensures personal attention while maintaining healthy competition among peers.',
      },
      {
        question: 'What facilities are available at the offline center?',
        answer:
          'AC classrooms, digital boards, reference library, doubt clearing room, cafeteria, and safe parking. CCTV monitored campus with biometric attendance.',
      },
      {
        question: 'Can I switch from online to offline mid-course?',
        answer:
          'Yes! Students can switch from online to offline (or vice versa) with one month notice. Fee difference, if any, will be adjusted.',
      },
    ],
    stats: {
      studentsFromCity: '1,200+',
      successRate: '98%',
      rating: '4.9',
    },
    geoCoordinates: {
      lat: '28.4495',
      lng: '77.0726',
    },
  },

  // Competitor Alternative Pages
  'fiitjee-alternative-gurugram': {
    slug: 'fiitjee-alternative-gurugram',
    cityName: 'Gurugram',
    stateName: 'Haryana',
    metaTitle: 'FIITJEE Alternative in Gurugram | Better for NEET Biology | Cerebrum Academy',
    metaDescription:
      'Looking for FIITJEE alternative in Gurugram for NEET? Cerebrum offers specialized biology coaching with AIIMS faculty. 50% lower fees, 98% results. 88264-44334!',
    heroTitle: 'FIITJEE Alternative for NEET in Gurugram',
    heroSubtitle:
      'FIITJEE excels in IIT-JEE, but for NEET you need biology specialists. Cerebrum offers dedicated NEET coaching at half the cost.',
    hasOfflineCenter: true,
    nearestCenter: {
      name: 'Gurugram Center',
      address: 'M2K Corporate Park, Sector 51, Gurugram 122018',
      distance: 'NEET Biology Specialist',
    },
    localities: [
      { name: 'Sector 14', url: '/neet-coaching-gurgaon-sector-14' },
      { name: 'Sector 51', url: '/biology-classes-gurgaon-sector-51' },
      { name: 'DLF Phases', url: '/biology-classes-dlf-gurgaon' },
    ],
    relatedCities: [
      { name: 'Aakash Alternative', url: '/aakash-alternative-gurugram' },
      { name: 'Allen Alternative', url: '/allen-alternative-gurugram' },
      { name: 'Narayana Alternative', url: '/narayana-alternative-gurugram' },
    ],
    faqs: [
      {
        question: 'Why choose Cerebrum over FIITJEE for NEET?',
        answer:
          'FIITJEE is primarily an IIT-JEE coaching with NEET as add-on. Cerebrum is NEET-specialized with AIIMS faculty. Our biology teachers have 15+ years NEET experience vs generalist approach.',
      },
      {
        question: 'How do fees compare with FIITJEE?',
        answer:
          'FIITJEE NEET fees: ₹1.5-2.5 lakh/year. Cerebrum fees: ₹75,000-1,00,000/year. You save 50%+ while getting specialized NEET biology coaching.',
      },
      {
        question: 'What about FIITJEE brand value?',
        answer:
          'Brand value helps in IIT-JEE. For NEET, what matters is biology expertise and results. Our 98% selection rate and 67+ AIIMS admits speak for themselves.',
      },
      {
        question: 'Can I take FIITJEE for Physics-Chemistry and Cerebrum for Biology?',
        answer:
          'Yes! Many students do this. We offer Biology-only program at ₹45,000/year. Combine with any coaching for complete preparation.',
      },
    ],
    stats: {
      studentsFromCity: '200+',
      successRate: '98%',
      rating: '4.9',
    },
    geoCoordinates: {
      lat: '28.4495',
      lng: '77.0726',
    },
  },

  'narayana-alternative-gurugram': {
    slug: 'narayana-alternative-gurugram',
    cityName: 'Gurugram',
    stateName: 'Haryana',
    metaTitle: 'Narayana Alternative in Gurugram | Personal Attention | Cerebrum Academy',
    metaDescription:
      'Better than Narayana for NEET in Gurugram? Cerebrum offers small batches, personal attention, AIIMS faculty. No factory coaching. Call 88264-44334!',
    heroTitle: 'Narayana Alternative for NEET in Gurugram',
    heroSubtitle:
      'Tired of crowded Narayana batches? Get personal attention with our 25-student batches and dedicated mentors.',
    hasOfflineCenter: true,
    nearestCenter: {
      name: 'Gurugram Center',
      address: 'M2K Corporate Park, Sector 51, Gurugram 122018',
      distance: 'Small Batch Expert',
    },
    localities: [
      { name: 'Sector 14', url: '/neet-coaching-gurgaon-sector-14' },
      { name: 'Sector 51', url: '/biology-classes-gurgaon-sector-51' },
      { name: 'Sohna Road', url: '/biology-classes-sohna-road-gurgaon' },
    ],
    relatedCities: [
      { name: 'Aakash Alternative', url: '/aakash-alternative-gurugram' },
      { name: 'FIITJEE Alternative', url: '/fiitjee-alternative-gurugram' },
      { name: 'Physics Wallah Alternative', url: '/physics-wallah-alternative-gurugram' },
    ],
    faqs: [
      {
        question: 'Why choose Cerebrum over Narayana?',
        answer:
          'Narayana has 100+ student batches with franchise model. Cerebrum has 25-student batches with AIIMS faculty. Personal attention means better results.',
      },
      {
        question: 'How do results compare with Narayana Gurugram?',
        answer:
          'Narayana Gurugram selection rate: ~15-20%. Cerebrum selection rate: 98%. Our small batches and focused approach deliver better outcomes.',
      },
      {
        question: 'Is Narayana better for integrated school program?',
        answer:
          'Narayana schools force you into their system. With Cerebrum, study at any school and join coaching separately. More flexibility, same results.',
      },
      {
        question: 'What about Narayana study material?',
        answer:
          'Our study material is designed by AIIMS faculty specifically for NEET. Narayana uses generic material across India. Our localized approach works better.',
      },
    ],
    stats: {
      studentsFromCity: '250+',
      successRate: '98%',
      rating: '4.9',
    },
    geoCoordinates: {
      lat: '28.4495',
      lng: '77.0726',
    },
  },

  'physics-wallah-alternative-gurugram': {
    slug: 'physics-wallah-alternative-gurugram',
    cityName: 'Gurugram',
    stateName: 'Haryana',
    metaTitle: 'Physics Wallah (PW) Alternative Gurugram | Offline Expert | Cerebrum Academy',
    metaDescription:
      'Looking for Physics Wallah alternative in Gurugram? Cerebrum offers offline classes with AIIMS faculty. Real classroom experience. Call 88264-44334!',
    heroTitle: 'Physics Wallah Alternative for NEET in Gurugram',
    heroSubtitle:
      'PW videos are great for basics. For serious NEET prep, you need classroom coaching with real interaction and discipline.',
    hasOfflineCenter: true,
    nearestCenter: {
      name: 'Gurugram Center',
      address: 'M2K Corporate Park, Sector 51, Gurugram 122018',
      distance: 'Offline Expert',
    },
    localities: [
      { name: 'Sector 51', url: '/biology-classes-gurgaon-sector-51' },
      { name: 'DLF Phases', url: '/biology-classes-dlf-gurgaon' },
      { name: 'Golf Course Road', url: '/biology-classes-golf-course-road-gurgaon' },
    ],
    relatedCities: [
      { name: 'Unacademy Alternative', url: '/unacademy-alternative-gurugram' },
      { name: 'Offline NEET Coaching', url: '/offline-neet-coaching-gurugram' },
      { name: 'NEET Coaching Gurugram', url: '/neet-coaching-gurugram' },
    ],
    faqs: [
      {
        question: 'Why choose offline coaching over Physics Wallah?',
        answer:
          'PW completion rate is 15-20% (most students drop off). Offline coaching at Cerebrum has 95%+ retention because of discipline, peer pressure, and direct teacher interaction.',
      },
      {
        question: 'How do fees compare with Physics Wallah?',
        answer:
          'PW costs ₹15,000-30,000/year but with low completion. Cerebrum costs ₹75,000-95,000/year with guaranteed discipline and 98% results. Investment vs expense.',
      },
      {
        question: 'Can I use PW videos along with Cerebrum coaching?',
        answer:
          'Yes! Many students watch PW for revision. But primary preparation should be offline with structured curriculum, tests, and doubt clearing.',
      },
      {
        question: 'Is PW Vidyapeeth center in Gurgaon good?',
        answer:
          'PW Vidyapeeth is new with inexperienced faculty. Cerebrum has 15+ years of NEET teaching experience in Gurugram with proven track record.',
      },
    ],
    stats: {
      studentsFromCity: '300+',
      successRate: '98%',
      rating: '4.9',
    },
    geoCoordinates: {
      lat: '28.4495',
      lng: '77.0726',
    },
  },

  'unacademy-alternative-gurugram': {
    slug: 'unacademy-alternative-gurugram',
    cityName: 'Gurugram',
    stateName: 'Haryana',
    metaTitle: 'Unacademy Alternative Gurugram | Real Classroom | Cerebrum Academy',
    metaDescription:
      'Better than Unacademy for NEET? Cerebrum offers real classroom coaching in Gurugram. No screen fatigue. AIIMS faculty. Call 88264-44334!',
    heroTitle: 'Unacademy Alternative for NEET in Gurugram',
    heroSubtitle:
      'Tired of watching videos all day? Real NEET preparation happens in classrooms with actual teachers and peer competition.',
    hasOfflineCenter: true,
    nearestCenter: {
      name: 'Gurugram Center',
      address: 'M2K Corporate Park, Sector 51, Gurugram 122018',
      distance: 'Real Classroom',
    },
    localities: [
      { name: 'Sector 51', url: '/biology-classes-gurgaon-sector-51' },
      { name: 'DLF Phases', url: '/biology-classes-dlf-gurgaon' },
      { name: 'Sohna Road', url: '/biology-classes-sohna-road-gurgaon' },
    ],
    relatedCities: [
      { name: 'Physics Wallah Alternative', url: '/physics-wallah-alternative-gurugram' },
      { name: 'Vedantu Alternative', url: '/vedantu-alternative-gurugram' },
      { name: 'Offline NEET Coaching', url: '/offline-neet-coaching-gurugram' },
    ],
    faqs: [
      {
        question: 'Why choose Cerebrum over Unacademy?',
        answer:
          'Unacademy has 1000s of videos causing decision paralysis. Cerebrum has structured curriculum with clear path. Real teachers, real classrooms, real results.',
      },
      {
        question: 'Is Unacademy Plus worth it for NEET?',
        answer:
          'Unacademy Plus costs ₹50,000-80,000/year for videos. Same investment gets you offline coaching at Cerebrum with guaranteed discipline and 3x better completion.',
      },
      {
        question: 'What about Unacademy doubt solving?',
        answer:
          'Unacademy doubt solving is via chat/video call. At Cerebrum, raise your hand and get instant in-person explanation. No waiting, no scheduling.',
      },
      {
        question: 'Can I switch from Unacademy to Cerebrum mid-year?',
        answer:
          'Yes! We have special catch-up batches for students switching from online platforms. Most adapt within 2-3 weeks and see immediate improvement.',
      },
    ],
    stats: {
      studentsFromCity: '250+',
      successRate: '98%',
      rating: '4.9',
    },
    geoCoordinates: {
      lat: '28.4495',
      lng: '77.0726',
    },
  },

  // Gurugram Sector-Specific Pages (P2)
  'neet-coaching-gurgaon-sector-15': {
    slug: 'neet-coaching-gurgaon-sector-15',
    cityName: 'Gurgaon',
    stateName: 'Haryana',
    metaTitle: 'NEET Coaching in Sector 15 Gurgaon | Near HUDA Market | Cerebrum Academy',
    metaDescription:
      'Best NEET coaching for Sector 15 Gurgaon students. 15 min from our Sector 51 center. AIIMS faculty, 98% results. Call 88264-44334!',
    heroTitle: 'NEET Coaching for Sector 15 Gurgaon',
    heroSubtitle:
      'Sector 15 students - join Gurugram\'s top NEET coaching. Just 15 minutes from HUDA Market to our Sector 51 center.',
    hasOfflineCenter: true,
    nearestCenter: {
      name: 'Gurugram Center',
      address: 'M2K Corporate Park, Sector 51, Gurugram 122018',
      distance: '15 min from Sector 15',
    },
    localities: [
      { name: 'Sector 14', url: '/neet-coaching-gurgaon-sector-14' },
      { name: 'Sector 17', url: '/neet-coaching-gurgaon-sector-17' },
      { name: 'Old Gurgaon', url: '/neet-coaching-old-gurgaon' },
    ],
    relatedCities: [
      { name: 'NEET Coaching Gurgaon', url: '/neet-coaching-gurgaon' },
      { name: 'Biology Classes Gurgaon', url: '/biology-classes-gurgaon' },
    ],
    faqs: [
      {
        question: 'How far is Cerebrum center from Sector 15?',
        answer: 'Our Sector 51 center is 15 minutes by car from Sector 15 HUDA Market. Direct route via Golf Course Extension Road.',
      },
      {
        question: 'Is there any coaching in Sector 15 itself?',
        answer: 'Major coaching centers are in Sector 14. Cerebrum in Sector 51 offers better faculty and smaller batches compared to crowded Sector 14 institutes.',
      },
    ],
    stats: { studentsFromCity: '150+', successRate: '98%', rating: '4.9' },
    geoCoordinates: { lat: '28.4650', lng: '77.0300' },
  },

  'neet-coaching-gurgaon-sector-17': {
    slug: 'neet-coaching-gurgaon-sector-17',
    cityName: 'Gurgaon',
    stateName: 'Haryana',
    metaTitle: 'NEET Coaching in Sector 17 Gurgaon | Old Gurgaon | Cerebrum Academy',
    metaDescription:
      'Best NEET coaching for Sector 17 Gurgaon students. Serving Old Gurgaon since 2010. AIIMS faculty, small batches. Call 88264-44334!',
    heroTitle: 'NEET Coaching for Sector 17 Gurgaon',
    heroSubtitle:
      'Old Gurgaon\'s trusted NEET coaching partner. Students from Sectors 17, 18, 21 join our Sector 51 center.',
    hasOfflineCenter: true,
    nearestCenter: {
      name: 'Gurugram Center',
      address: 'M2K Corporate Park, Sector 51, Gurugram 122018',
      distance: '12 min from Sector 17',
    },
    localities: [
      { name: 'Sector 15', url: '/neet-coaching-gurgaon-sector-15' },
      { name: 'Sector 18', url: '/neet-coaching-gurgaon-sector-18' },
      { name: 'Sector 21', url: '/neet-coaching-gurgaon-sector-21' },
    ],
    relatedCities: [
      { name: 'NEET Coaching Gurgaon', url: '/neet-coaching-gurgaon' },
      { name: 'Biology Classes Gurgaon', url: '/biology-classes-gurgaon' },
    ],
    faqs: [
      {
        question: 'How do Sector 17 students reach the center?',
        answer: 'Via Mehrauli-Gurgaon Road to Golf Course Extension. 12 minutes by car. Many students carpool from Sector 17-18 area.',
      },
      {
        question: 'Any pickup facility from Sector 17?',
        answer: 'We can arrange carpool groups. Contact us to connect with other Sector 17 students already attending.',
      },
    ],
    stats: { studentsFromCity: '120+', successRate: '96%', rating: '4.9' },
    geoCoordinates: { lat: '28.4580', lng: '77.0250' },
  },

  'neet-coaching-gurgaon-sector-18': {
    slug: 'neet-coaching-gurgaon-sector-18',
    cityName: 'Gurgaon',
    stateName: 'Haryana',
    metaTitle: 'NEET Coaching in Sector 18 Gurgaon | Near Vyapar Kendra | Cerebrum Academy',
    metaDescription:
      'Best NEET coaching for Sector 18 Gurgaon students. Near Vyapar Kendra. AIIMS faculty, 98% results. Sector 51 center. Call 88264-44334!',
    heroTitle: 'NEET Coaching for Sector 18 Gurgaon',
    heroSubtitle:
      'Sector 18 students - premium NEET coaching just 12 minutes away. Escape the crowd, join small batches.',
    hasOfflineCenter: true,
    nearestCenter: {
      name: 'Gurugram Center',
      address: 'M2K Corporate Park, Sector 51, Gurugram 122018',
      distance: '12 min from Sector 18',
    },
    localities: [
      { name: 'Sector 17', url: '/neet-coaching-gurgaon-sector-17' },
      { name: 'Sector 21', url: '/neet-coaching-gurgaon-sector-21' },
      { name: 'Sector 22', url: '/neet-coaching-gurgaon-sector-22' },
    ],
    relatedCities: [
      { name: 'NEET Coaching Gurgaon', url: '/neet-coaching-gurgaon' },
      { name: 'Biology Classes Gurgaon', url: '/biology-classes-gurgaon' },
    ],
    faqs: [
      {
        question: 'Is there direct route from Sector 18 to center?',
        answer: 'Yes! Sector 18 → MG Road → Golf Course Extension → Sector 51. 12 minutes with minimal traffic.',
      },
      {
        question: 'What schools in Sector 18 do you serve?',
        answer: 'Students from DAV, St. Xaviers, and schools in nearby sectors regularly attend. We understand their curriculum.',
      },
    ],
    stats: { studentsFromCity: '100+', successRate: '98%', rating: '4.9' },
    geoCoordinates: { lat: '28.4550', lng: '77.0200' },
  },

  'neet-coaching-gurgaon-sector-40': {
    slug: 'neet-coaching-gurgaon-sector-40',
    cityName: 'Gurgaon',
    stateName: 'Haryana',
    metaTitle: 'NEET Coaching in Sector 40 Gurgaon | Near Huda City Centre | Cerebrum Academy',
    metaDescription:
      'Best NEET coaching for Sector 40 Gurgaon. 10 min from Huda City Centre Metro. AIIMS faculty, small batches. Call 88264-44334!',
    heroTitle: 'NEET Coaching for Sector 40 Gurgaon',
    heroSubtitle:
      'Sector 40 residents - top NEET coaching just 10 minutes away. Near Huda City Centre Metro for easy commute.',
    hasOfflineCenter: true,
    nearestCenter: {
      name: 'Gurugram Center',
      address: 'M2K Corporate Park, Sector 51, Gurugram 122018',
      distance: '10 min from Sector 40',
    },
    localities: [
      { name: 'Sector 42', url: '/neet-coaching-gurgaon-sector-42' },
      { name: 'Sector 43', url: '/neet-coaching-gurgaon-sector-43' },
      { name: 'Huda City Centre', url: '/neet-coaching-huda-city-centre-gurgaon' },
    ],
    relatedCities: [
      { name: 'NEET Coaching Gurgaon', url: '/neet-coaching-gurgaon' },
      { name: 'Biology Classes Gurgaon', url: '/biology-classes-gurgaon' },
    ],
    faqs: [
      {
        question: 'Can I come by metro from Sector 40?',
        answer: 'Yes! Take metro to Huda City Centre, then 10-minute auto/cab to Sector 51. Many students use this route.',
      },
      {
        question: 'Which societies in Sector 40 do students come from?',
        answer: 'Students from Vatika City, Vipul Greens, and other Sector 40 societies attend. Short, safe commute.',
      },
    ],
    stats: { studentsFromCity: '180+', successRate: '98%', rating: '4.9' },
    geoCoordinates: { lat: '28.4400', lng: '77.0450' },
  },

  'neet-coaching-gurgaon-sector-42': {
    slug: 'neet-coaching-gurgaon-sector-42',
    cityName: 'Gurgaon',
    stateName: 'Haryana',
    metaTitle: 'NEET Coaching in Sector 42 Gurgaon | Near Medanta | Cerebrum Academy',
    metaDescription:
      'Best NEET coaching for Sector 42 Gurgaon students. Near Medanta Hospital. AIIMS faculty, 98% results. Call 88264-44334!',
    heroTitle: 'NEET Coaching for Sector 42 Gurgaon',
    heroSubtitle:
      'Sector 42 students - inspired by Medanta nearby? Join top NEET coaching to become a doctor yourself.',
    hasOfflineCenter: true,
    nearestCenter: {
      name: 'Gurugram Center',
      address: 'M2K Corporate Park, Sector 51, Gurugram 122018',
      distance: '8 min from Sector 42',
    },
    localities: [
      { name: 'Sector 40', url: '/neet-coaching-gurgaon-sector-40' },
      { name: 'Sector 43', url: '/neet-coaching-gurgaon-sector-43' },
      { name: 'Sector 44', url: '/neet-coaching-gurgaon-sector-44' },
    ],
    relatedCities: [
      { name: 'NEET Coaching Gurgaon', url: '/neet-coaching-gurgaon' },
      { name: 'Biology Classes Gurgaon', url: '/biology-classes-gurgaon' },
    ],
    faqs: [
      {
        question: 'How close is the center to Sector 42?',
        answer: 'Just 8 minutes via Golf Course Extension Road. Many Sector 42 students cycle to our center.',
      },
      {
        question: 'Do students from Medanta Colony area attend?',
        answer: 'Yes! Several students from Medanta staff families study with us. They see medical careers daily and are highly motivated.',
      },
    ],
    stats: { studentsFromCity: '140+', successRate: '98%', rating: '4.9' },
    geoCoordinates: { lat: '28.4420', lng: '77.0500' },
  },

  'neet-coaching-gurgaon-sector-44': {
    slug: 'neet-coaching-gurgaon-sector-44',
    cityName: 'Gurgaon',
    stateName: 'Haryana',
    metaTitle: 'NEET Coaching in Sector 44 Gurgaon | Premium Locality | Cerebrum Academy',
    metaDescription:
      'Best NEET coaching for Sector 44 Gurgaon. Premium coaching for premium locality. AIIMS faculty. Call 88264-44334!',
    heroTitle: 'NEET Coaching for Sector 44 Gurgaon',
    heroSubtitle:
      'Sector 44 families deserve premium education. Our AIIMS faculty delivers results that match your expectations.',
    hasOfflineCenter: true,
    nearestCenter: {
      name: 'Gurugram Center',
      address: 'M2K Corporate Park, Sector 51, Gurugram 122018',
      distance: '7 min from Sector 44',
    },
    localities: [
      { name: 'Sector 42', url: '/neet-coaching-gurgaon-sector-42' },
      { name: 'Sector 46', url: '/neet-coaching-gurgaon-sector-46' },
      { name: 'Sector 45', url: '/neet-coaching-gurgaon-sector-45' },
    ],
    relatedCities: [
      { name: 'NEET Coaching Gurgaon', url: '/neet-coaching-gurgaon' },
      { name: 'Biology Classes Gurgaon', url: '/biology-classes-gurgaon' },
    ],
    faqs: [
      {
        question: 'What makes your coaching suitable for Sector 44 families?',
        answer: 'Premium infrastructure, AC classrooms, small batches of 25 students, and AIIMS-trained faculty. Quality that matches Sector 44 standards.',
      },
      {
        question: 'Do you offer personalized attention?',
        answer: 'Yes! Each student gets a dedicated mentor. Weekly parent updates. Personal attention that premium families expect.',
      },
    ],
    stats: { studentsFromCity: '120+', successRate: '98%', rating: '4.9' },
    geoCoordinates: { lat: '28.4450', lng: '77.0550' },
  },

  'neet-coaching-gurgaon-sector-46': {
    slug: 'neet-coaching-gurgaon-sector-46',
    cityName: 'Gurgaon',
    stateName: 'Haryana',
    metaTitle: 'NEET Coaching in Sector 46 Gurgaon | Near Paras Hospital | Cerebrum Academy',
    metaDescription:
      'Best NEET coaching for Sector 46 Gurgaon. Near Paras Hospital. See doctors daily, become one yourself. Call 88264-44334!',
    heroTitle: 'NEET Coaching for Sector 46 Gurgaon',
    heroSubtitle:
      'Sector 46 - with Paras Hospital nearby, medical aspirations run high. Channel that motivation with expert coaching.',
    hasOfflineCenter: true,
    nearestCenter: {
      name: 'Gurugram Center',
      address: 'M2K Corporate Park, Sector 51, Gurugram 122018',
      distance: '6 min from Sector 46',
    },
    localities: [
      { name: 'Sector 44', url: '/neet-coaching-gurgaon-sector-46' },
      { name: 'Sector 47', url: '/neet-coaching-gurgaon-sector-47' },
      { name: 'Sector 48', url: '/neet-coaching-gurgaon-sector-48' },
    ],
    relatedCities: [
      { name: 'NEET Coaching Gurgaon', url: '/neet-coaching-gurgaon' },
      { name: 'Biology Classes Gurgaon', url: '/biology-classes-gurgaon' },
    ],
    faqs: [
      {
        question: 'How far is the center from Sector 46?',
        answer: 'Just 6 minutes via Golf Course Extension Road. Sector 46 is one of our highest-contributing localities.',
      },
      {
        question: 'Any students from Paras World School?',
        answer: 'Yes! Many Paras World School students from Sector 46 and nearby areas attend our coaching.',
      },
    ],
    stats: { studentsFromCity: '160+', successRate: '98%', rating: '4.9' },
    geoCoordinates: { lat: '28.4480', lng: '77.0600' },
  },

  'neet-coaching-gurgaon-sector-47': {
    slug: 'neet-coaching-gurgaon-sector-47',
    cityName: 'Gurgaon',
    stateName: 'Haryana',
    metaTitle: 'NEET Coaching in Sector 47 Gurgaon | Central Location | Cerebrum Academy',
    metaDescription:
      'Best NEET coaching for Sector 47 Gurgaon students. Centrally located. AIIMS faculty, small batches. Call 88264-44334!',
    heroTitle: 'NEET Coaching for Sector 47 Gurgaon',
    heroSubtitle:
      'Sector 47 students - you\'re in the heart of New Gurgaon. Access the best NEET coaching just 5 minutes away.',
    hasOfflineCenter: true,
    nearestCenter: {
      name: 'Gurugram Center',
      address: 'M2K Corporate Park, Sector 51, Gurugram 122018',
      distance: '5 min from Sector 47',
    },
    localities: [
      { name: 'Sector 46', url: '/neet-coaching-gurgaon-sector-46' },
      { name: 'Sector 48', url: '/neet-coaching-gurgaon-sector-48' },
      { name: 'Sector 50', url: '/neet-coaching-gurgaon-sector-50' },
    ],
    relatedCities: [
      { name: 'NEET Coaching Gurgaon', url: '/neet-coaching-gurgaon' },
      { name: 'Biology Classes Gurgaon', url: '/biology-classes-gurgaon' },
    ],
    faqs: [
      {
        question: 'What is the commute time from Sector 47?',
        answer: 'Just 5 minutes by any mode - car, auto, or even bicycle. Many students walk during good weather.',
      },
      {
        question: 'Which Sector 47 societies do students come from?',
        answer: 'Students from Orchid Petals, Uppal Southend, Vipul Belmonte and other Sector 47 societies attend regularly.',
      },
    ],
    stats: { studentsFromCity: '200+', successRate: '98%', rating: '4.9' },
    geoCoordinates: { lat: '28.4500', lng: '77.0650' },
  },

  'neet-coaching-gurgaon-sector-48': {
    slug: 'neet-coaching-gurgaon-sector-48',
    cityName: 'Gurgaon',
    stateName: 'Haryana',
    metaTitle: 'NEET Coaching in Sector 48 Gurgaon | Near Vega School | Cerebrum Academy',
    metaDescription:
      'Best NEET coaching for Sector 48 Gurgaon. Vega School, Presidium students welcome. AIIMS faculty. Call 88264-44334!',
    heroTitle: 'NEET Coaching for Sector 48 Gurgaon',
    heroSubtitle:
      'Sector 48 - home to Vega School and premium societies. Get premium NEET coaching to match.',
    hasOfflineCenter: true,
    nearestCenter: {
      name: 'Gurugram Center',
      address: 'M2K Corporate Park, Sector 51, Gurugram 122018',
      distance: '4 min from Sector 48',
    },
    localities: [
      { name: 'Sector 47', url: '/neet-coaching-gurgaon-sector-47' },
      { name: 'Sector 49', url: '/neet-coaching-gurgaon-sector-49' },
      { name: 'Sector 50', url: '/neet-coaching-gurgaon-sector-50' },
    ],
    relatedCities: [
      { name: 'NEET Coaching Gurgaon', url: '/neet-coaching-gurgaon' },
      { name: 'Biology Classes Gurgaon', url: '/biology-classes-gurgaon' },
    ],
    faqs: [
      {
        question: 'Do you have students from Vega School?',
        answer: 'Yes! Vega School students form a significant group. We understand their IB/IGCSE curriculum and bridge to NEET.',
      },
      {
        question: 'How close is Sector 48 to your center?',
        answer: 'Sector 48 is our neighboring sector - just 4 minutes away. Some students walk to class.',
      },
    ],
    stats: { studentsFromCity: '180+', successRate: '98%', rating: '4.9' },
    geoCoordinates: { lat: '28.4520', lng: '77.0700' },
  },

  'neet-coaching-gurgaon-sector-50': {
    slug: 'neet-coaching-gurgaon-sector-50',
    cityName: 'Gurgaon',
    stateName: 'Haryana',
    metaTitle: 'NEET Coaching in Sector 50 Gurgaon | Near Lotus Valley | Cerebrum Academy',
    metaDescription:
      'Best NEET coaching for Sector 50 Gurgaon. Lotus Valley, Ryan International students. 3 min walk to our center. Call 88264-44334!',
    heroTitle: 'NEET Coaching for Sector 50 Gurgaon',
    heroSubtitle:
      'Sector 50 students - you\'re our closest neighbors! Walk to class and maximize your study time.',
    hasOfflineCenter: true,
    nearestCenter: {
      name: 'Gurugram Center',
      address: 'M2K Corporate Park, Sector 51, Gurugram 122018',
      distance: '3 min walk from Sector 50',
    },
    localities: [
      { name: 'Sector 48', url: '/neet-coaching-gurgaon-sector-48' },
      { name: 'Sector 51', url: '/biology-classes-gurgaon-sector-51' },
      { name: 'Sector 52', url: '/neet-coaching-gurgaon-sector-52' },
    ],
    relatedCities: [
      { name: 'NEET Coaching Gurgaon', url: '/neet-coaching-gurgaon' },
      { name: 'Biology Classes Gurgaon', url: '/biology-classes-gurgaon' },
    ],
    faqs: [
      {
        question: 'How close is the center to Sector 50?',
        answer: 'We are literally next door! 3-minute walk from most Sector 50 societies. No commute hassle.',
      },
      {
        question: 'Do Lotus Valley students attend?',
        answer: 'Yes! Lotus Valley School (Sector 50) students form a large group. We coordinate with their school schedule.',
      },
    ],
    stats: { studentsFromCity: '220+', successRate: '98%', rating: '4.9' },
    geoCoordinates: { lat: '28.4540', lng: '77.0730' },
  },

  'neet-coaching-gurgaon-sector-52': {
    slug: 'neet-coaching-gurgaon-sector-52',
    cityName: 'Gurgaon',
    stateName: 'Haryana',
    metaTitle: 'NEET Coaching in Sector 52 Gurgaon | Rapid Metro | Cerebrum Academy',
    metaDescription:
      'Best NEET coaching for Sector 52 Gurgaon. Near Rapid Metro station. Easy commute, AIIMS faculty. Call 88264-44334!',
    heroTitle: 'NEET Coaching for Sector 52 Gurgaon',
    heroSubtitle:
      'Sector 52 - well connected by Rapid Metro. Quick commute to our Sector 51 center for quality NEET prep.',
    hasOfflineCenter: true,
    nearestCenter: {
      name: 'Gurugram Center',
      address: 'M2K Corporate Park, Sector 51, Gurugram 122018',
      distance: '5 min from Sector 52',
    },
    localities: [
      { name: 'Sector 50', url: '/neet-coaching-gurgaon-sector-50' },
      { name: 'Sector 53', url: '/neet-coaching-gurgaon-sector-53' },
      { name: 'Sector 54', url: '/neet-coaching-gurgaon-sector-54' },
    ],
    relatedCities: [
      { name: 'NEET Coaching Gurgaon', url: '/neet-coaching-gurgaon' },
      { name: 'Biology Classes Gurgaon', url: '/biology-classes-gurgaon' },
    ],
    faqs: [
      {
        question: 'Can I use Rapid Metro to reach the center?',
        answer: 'Yes! Sector 52 Rapid Metro station is 5 minutes from our center. Many students use this route.',
      },
      {
        question: 'Which Sector 52 societies do students come from?',
        answer: 'Students from Tulip Violet, Ansal API, and other Sector 52 societies attend regularly.',
      },
    ],
    stats: { studentsFromCity: '150+', successRate: '98%', rating: '4.9' },
    geoCoordinates: { lat: '28.4560', lng: '77.0780' },
  },

  'neet-coaching-gurgaon-sector-53': {
    slug: 'neet-coaching-gurgaon-sector-53',
    cityName: 'Gurgaon',
    stateName: 'Haryana',
    metaTitle: 'NEET Coaching in Sector 53 Gurgaon | Golf Course Extension | Cerebrum Academy',
    metaDescription:
      'Best NEET coaching for Sector 53 Gurgaon on Golf Course Extension Road. Premium coaching, AIIMS faculty. Call 88264-44334!',
    heroTitle: 'NEET Coaching for Sector 53 Gurgaon',
    heroSubtitle:
      'Sector 53 families on Golf Course Extension - premium NEET coaching just minutes away.',
    hasOfflineCenter: true,
    nearestCenter: {
      name: 'Gurugram Center',
      address: 'M2K Corporate Park, Sector 51, Gurugram 122018',
      distance: '6 min from Sector 53',
    },
    localities: [
      { name: 'Sector 52', url: '/neet-coaching-gurgaon-sector-52' },
      { name: 'Sector 54', url: '/neet-coaching-gurgaon-sector-54' },
      { name: 'Golf Course Extension', url: '/neet-coaching-golf-course-extension-gurgaon' },
    ],
    relatedCities: [
      { name: 'NEET Coaching Gurgaon', url: '/neet-coaching-gurgaon' },
      { name: 'Biology Classes Gurgaon', url: '/biology-classes-gurgaon' },
    ],
    faqs: [
      {
        question: 'How do I reach from Sector 53?',
        answer: 'Direct drive via Golf Course Extension Road - 6 minutes. Or use the internal sector roads.',
      },
      {
        question: 'Is parking available at the center?',
        answer: 'Yes! Ample parking at M2K Corporate Park. Both car and two-wheeler parking available.',
      },
    ],
    stats: { studentsFromCity: '130+', successRate: '98%', rating: '4.9' },
    geoCoordinates: { lat: '28.4580', lng: '77.0820' },
  },

  'neet-coaching-gurgaon-sector-54': {
    slug: 'neet-coaching-gurgaon-sector-54',
    cityName: 'Gurgaon',
    stateName: 'Haryana',
    metaTitle: 'NEET Coaching in Sector 54 Gurgaon | Near Golf Course Road | Cerebrum Academy',
    metaDescription:
      'Best NEET coaching for Sector 54 Gurgaon. Near Golf Course Road. Premium location, AIIMS faculty. Call 88264-44334!',
    heroTitle: 'NEET Coaching for Sector 54 Gurgaon',
    heroSubtitle:
      'Sector 54 - at the intersection of Golf Course and Golf Course Extension. Premium coaching for premium location.',
    hasOfflineCenter: true,
    nearestCenter: {
      name: 'Gurugram Center',
      address: 'M2K Corporate Park, Sector 51, Gurugram 122018',
      distance: '7 min from Sector 54',
    },
    localities: [
      { name: 'Sector 53', url: '/neet-coaching-gurgaon-sector-53' },
      { name: 'Golf Course Road', url: '/biology-classes-golf-course-road-gurgaon' },
      { name: 'Sector 56', url: '/neet-coaching-gurgaon-sector-56' },
    ],
    relatedCities: [
      { name: 'NEET Coaching Gurgaon', url: '/neet-coaching-gurgaon' },
      { name: 'Biology Classes Gurgaon', url: '/biology-classes-gurgaon' },
    ],
    faqs: [
      {
        question: 'Which Sector 54 societies do students come from?',
        answer: 'Students from Puri Emerald Bay, Godrej Frontier, and other premium Sector 54 projects attend.',
      },
      {
        question: 'Is the coaching quality suitable for Sector 54 standards?',
        answer: 'Absolutely! AIIMS faculty, AC classrooms, small batches. Quality that matches your expectations.',
      },
    ],
    stats: { studentsFromCity: '140+', successRate: '98%', rating: '4.9' },
    geoCoordinates: { lat: '28.4600', lng: '77.0860' },
  },

  'neet-coaching-gurgaon-sector-58': {
    slug: 'neet-coaching-gurgaon-sector-58',
    cityName: 'Gurgaon',
    stateName: 'Haryana',
    metaTitle: 'NEET Coaching in Sector 58 Gurgaon | Growing Locality | Cerebrum Academy',
    metaDescription:
      'Best NEET coaching for Sector 58 Gurgaon. Serving growing families in this developing sector. AIIMS faculty. Call 88264-44334!',
    heroTitle: 'NEET Coaching for Sector 58 Gurgaon',
    heroSubtitle:
      'Sector 58 - a growing locality deserves quality education. Top NEET coaching just 10 minutes away.',
    hasOfflineCenter: true,
    nearestCenter: {
      name: 'Gurugram Center',
      address: 'M2K Corporate Park, Sector 51, Gurugram 122018',
      distance: '10 min from Sector 58',
    },
    localities: [
      { name: 'Sector 56', url: '/neet-coaching-gurgaon-sector-56' },
      { name: 'Sector 60', url: '/neet-coaching-gurgaon-sector-60' },
      { name: 'Sector 61', url: '/neet-coaching-gurgaon-sector-61' },
    ],
    relatedCities: [
      { name: 'NEET Coaching Gurgaon', url: '/neet-coaching-gurgaon' },
      { name: 'Biology Classes Gurgaon', url: '/biology-classes-gurgaon' },
    ],
    faqs: [
      {
        question: 'How do Sector 58 students commute?',
        answer: 'Via Sector 56/57 - about 10 minutes by car. Carpool groups available with other Sector 58 students.',
      },
      {
        question: 'Is Sector 58 well-represented at your center?',
        answer: 'Yes! As Sector 58 grows, more families discover us. Strong community of students from this area.',
      },
    ],
    stats: { studentsFromCity: '100+', successRate: '96%', rating: '4.9' },
    geoCoordinates: { lat: '28.4640', lng: '77.0900' },
  },

  // Gurugram Area Pages (P2)
  'neet-coaching-manesar-gurgaon': {
    slug: 'neet-coaching-manesar-gurgaon',
    cityName: 'Manesar',
    stateName: 'Haryana',
    metaTitle: 'NEET Coaching in Manesar Gurgaon 2026 | Industrial Hub | Cerebrum Academy',
    metaDescription:
      'Best NEET coaching for Manesar students. Serving IMT Manesar, residential sectors. 25 min from Sector 51. Online + Offline. Call 88264-44334!',
    heroTitle: 'NEET Coaching for Manesar Gurgaon',
    heroSubtitle:
      'Manesar families - quality NEET coaching is now accessible. Join our center or study online with the same faculty.',
    hasOfflineCenter: true,
    nearestCenter: {
      name: 'Gurugram Center',
      address: 'M2K Corporate Park, Sector 51, Gurugram 122018',
      distance: '25 min from Manesar',
    },
    localities: [
      { name: 'IMT Manesar', url: '/neet-coaching-imt-manesar' },
      { name: 'Sector 1-8 Manesar', url: '/neet-coaching-manesar-sectors' },
      { name: 'Dharuhera', url: '/neet-coaching-dharuhera' },
    ],
    relatedCities: [
      { name: 'NEET Coaching Gurgaon', url: '/neet-coaching-gurgaon' },
      { name: 'Online NEET Classes', url: '/online-neet-classes-gurugram' },
      { name: 'Weekend Batch', url: '/weekend-neet-batch-gurugram' },
    ],
    faqs: [
      {
        question: 'Is 25 minutes commute worth it for NEET coaching?',
        answer: 'Many Manesar students commute daily. Quality faculty and small batches make it worthwhile. Weekend batch also available to reduce travel.',
      },
      {
        question: 'Do you offer online classes for Manesar students?',
        answer: 'Yes! Our online classes have the same faculty and curriculum. Many Manesar students attend online on weekdays and offline on weekends.',
      },
      {
        question: 'Any carpool from Manesar?',
        answer: 'We can connect you with other Manesar students for carpool. Several groups already operate from IMT area.',
      },
    ],
    stats: { studentsFromCity: '80+', successRate: '95%', rating: '4.8' },
    geoCoordinates: { lat: '28.3600', lng: '76.9400' },
  },

  'neet-coaching-dwarka-expressway-gurgaon': {
    slug: 'neet-coaching-dwarka-expressway-gurgaon',
    cityName: 'Dwarka Expressway',
    stateName: 'Haryana',
    metaTitle: 'NEET Coaching Dwarka Expressway Gurgaon 2026 | SPR Road | Cerebrum Academy',
    metaDescription:
      'Best NEET coaching for Dwarka Expressway residents. Sectors 99-115. Growing area, quality coaching. 20 min drive. Call 88264-44334!',
    heroTitle: 'NEET Coaching for Dwarka Expressway Gurgaon',
    heroSubtitle:
      'Dwarka Expressway - Gurgaon\'s fastest growing corridor. Get premium NEET coaching before the crowd.',
    hasOfflineCenter: true,
    nearestCenter: {
      name: 'Gurugram Center',
      address: 'M2K Corporate Park, Sector 51, Gurugram 122018',
      distance: '20 min via expressway',
    },
    localities: [
      { name: 'Sector 99', url: '/neet-coaching-sector-99-gurgaon' },
      { name: 'Sector 102-106', url: '/neet-coaching-new-gurgaon' },
      { name: 'Sector 108-115', url: '/neet-coaching-new-gurgaon' },
    ],
    relatedCities: [
      { name: 'NEET Coaching Gurgaon', url: '/neet-coaching-gurgaon' },
      { name: 'New Gurgaon NEET', url: '/neet-coaching-new-gurgaon' },
      { name: 'SPR Road Coaching', url: '/neet-coaching-spr-gurgaon' },
    ],
    faqs: [
      {
        question: 'How do I reach from Dwarka Expressway?',
        answer: 'Direct drive via SPR to Golf Course Extension - 20 minutes. Smooth expressway driving most of the way.',
      },
      {
        question: 'Which Dwarka Expressway projects do students come from?',
        answer: 'Students from Sobha City, Godrej Summit, Puri Diplomatic Greens, Conscient Heritage Max attend regularly.',
      },
      {
        question: 'Is there coaching closer to Dwarka Expressway?',
        answer: 'Major quality coaching is in central Gurgaon. The 20-minute drive is worth it for AIIMS faculty and proven results.',
      },
    ],
    stats: { studentsFromCity: '120+', successRate: '96%', rating: '4.9' },
    geoCoordinates: { lat: '28.4200', lng: '76.9800' },
  },

  'neet-coaching-new-gurgaon': {
    slug: 'neet-coaching-new-gurgaon',
    cityName: 'New Gurgaon',
    stateName: 'Haryana',
    metaTitle: 'NEET Coaching in New Gurgaon 2026 | Sectors 80-115 | Cerebrum Academy',
    metaDescription:
      'Best NEET coaching for New Gurgaon (Sectors 80-115). Premium coaching for premium localities. AIIMS faculty. Call 88264-44334!',
    heroTitle: 'NEET Coaching for New Gurgaon (Sectors 80-115)',
    heroSubtitle:
      'New Gurgaon families chose premium homes. Now choose premium education for your child\'s medical dreams.',
    hasOfflineCenter: true,
    nearestCenter: {
      name: 'Gurugram Center',
      address: 'M2K Corporate Park, Sector 51, Gurugram 122018',
      distance: '15-25 min from New Gurgaon',
    },
    localities: [
      { name: 'Sector 81-85', url: '/neet-coaching-sectors-81-85-gurgaon' },
      { name: 'Sector 86-90', url: '/neet-coaching-sectors-86-90-gurgaon' },
      { name: 'Sector 91-95', url: '/neet-coaching-sectors-91-95-gurgaon' },
    ],
    relatedCities: [
      { name: 'NEET Coaching Gurgaon', url: '/neet-coaching-gurgaon' },
      { name: 'Dwarka Expressway', url: '/neet-coaching-dwarka-expressway-gurgaon' },
      { name: 'SPR Road', url: '/neet-coaching-spr-gurgaon' },
    ],
    faqs: [
      {
        question: 'Which New Gurgaon sectors do you serve?',
        answer: 'All sectors from 80 to 115. Students from Emaar, Raheja, BPTP, M3M projects attend our center.',
      },
      {
        question: 'Is the commute from New Gurgaon manageable?',
        answer: '15-25 minutes depending on exact location. Many students use the expressway drive for self-study (audio lectures).',
      },
      {
        question: 'Any plans for a center in New Gurgaon?',
        answer: 'We focus on one premium center with the best faculty. Quality over quantity. The commute ensures you get the best teachers.',
      },
    ],
    stats: { studentsFromCity: '200+', successRate: '98%', rating: '4.9' },
    geoCoordinates: { lat: '28.4100', lng: '77.0200' },
  },

  'neet-coaching-spr-gurgaon': {
    slug: 'neet-coaching-spr-gurgaon',
    cityName: 'SPR Road Gurgaon',
    stateName: 'Haryana',
    metaTitle: 'NEET Coaching SPR Road Gurgaon 2026 | Southern Peripheral Road | Cerebrum Academy',
    metaDescription:
      'Best NEET coaching for SPR Road Gurgaon students. Sectors 68-84. Easy expressway access. AIIMS faculty. Call 88264-44334!',
    heroTitle: 'NEET Coaching for SPR Road Gurgaon',
    heroSubtitle:
      'SPR (Southern Peripheral Road) - quick expressway access to premium NEET coaching in Sector 51.',
    hasOfflineCenter: true,
    nearestCenter: {
      name: 'Gurugram Center',
      address: 'M2K Corporate Park, Sector 51, Gurugram 122018',
      distance: '12-18 min via SPR',
    },
    localities: [
      { name: 'Sector 68-72', url: '/neet-coaching-sectors-68-72-gurgaon' },
      { name: 'Sector 73-78', url: '/neet-coaching-sectors-73-78-gurgaon' },
      { name: 'Sector 79-84', url: '/neet-coaching-sectors-79-84-gurgaon' },
    ],
    relatedCities: [
      { name: 'NEET Coaching Gurgaon', url: '/neet-coaching-gurgaon' },
      { name: 'Sohna Road', url: '/biology-classes-sohna-road-gurgaon' },
      { name: 'Golf Course Extension', url: '/neet-coaching-golf-course-extension' },
    ],
    faqs: [
      {
        question: 'How is the commute from SPR road?',
        answer: 'Smooth 12-18 minute drive via the expressway. No traffic signals, quick access to our Sector 51 center.',
      },
      {
        question: 'Which SPR projects do students come from?',
        answer: 'Students from Ireo Skyon, Ramprastha Edge Towers, Pareena Coban Residences, and other SPR projects attend.',
      },
    ],
    stats: { studentsFromCity: '150+', successRate: '98%', rating: '4.9' },
    geoCoordinates: { lat: '28.4300', lng: '77.0500' },
  },

  // Question-Based Pages (Voice Search - P3)
  'best-neet-coaching-in-gurugram': {
    slug: 'best-neet-coaching-in-gurugram',
    cityName: 'Gurugram',
    stateName: 'Haryana',
    metaTitle: 'Which is the Best NEET Coaching in Gurugram 2026? | Expert Answer',
    metaDescription:
      'Looking for the best NEET coaching in Gurugram? Compare top institutes, fees, results. Cerebrum Biology Academy - 98% success, AIIMS faculty. Call 88264-44334!',
    heroTitle: 'Which is the Best NEET Coaching in Gurugram?',
    heroSubtitle:
      'An honest comparison of NEET coaching options in Gurugram to help you make the right choice for your medical career.',
    hasOfflineCenter: true,
    nearestCenter: {
      name: 'Gurugram Center',
      address: 'M2K Corporate Park, Sector 51, Gurugram 122018',
      distance: 'Top Rated Institute',
    },
    localities: [
      { name: 'Sector 14 Institutes', url: '/neet-coaching-gurgaon-sector-14' },
      { name: 'Sector 51 Center', url: '/biology-classes-gurgaon-sector-51' },
      { name: 'DLF Area', url: '/biology-classes-dlf-gurgaon' },
    ],
    relatedCities: [
      { name: 'NEET Coaching Fees', url: '/neet-coaching-fees-gurugram' },
      { name: 'Top 10 NEET Coaching', url: '/top-10-neet-coaching-gurugram' },
      { name: 'NEET Reviews', url: '/neet-coaching-reviews-gurugram' },
    ],
    faqs: [
      {
        question: 'Which is the best NEET coaching in Gurugram?',
        answer: 'Based on results (98% selection), faculty (AIIMS-trained), and student reviews (4.9/5), Cerebrum Biology Academy is the top choice. Located in Sector 51 with small batches of 25 students.',
      },
      {
        question: 'How to choose the best NEET coaching?',
        answer: 'Check: 1) Faculty credentials (AIIMS/MBBS), 2) Batch size (<30 ideal), 3) Past results (ask for proof), 4) Student reviews, 5) Fee transparency. Visit and take demo class.',
      },
      {
        question: 'Is Aakash or Allen better in Gurugram?',
        answer: 'Both are large chains with 100+ student batches. For personalized attention and biology focus, consider specialized institutes like Cerebrum with 25-student batches and AIIMS faculty.',
      },
      {
        question: 'What is the fee of best NEET coaching in Gurugram?',
        answer: 'Top coaching fees range ₹75,000-2,50,000/year. Cerebrum offers premium quality at ₹75,000-95,000 - best value for AIIMS faculty and small batches.',
      },
    ],
    stats: { studentsFromCity: '1,50,000+', successRate: '98%', rating: '4.9' },
    geoCoordinates: { lat: '28.4495', lng: '77.0726' },
  },

  'how-to-prepare-for-neet-in-gurugram': {
    slug: 'how-to-prepare-for-neet-in-gurugram',
    cityName: 'Gurugram',
    stateName: 'Haryana',
    metaTitle: 'How to Prepare for NEET in Gurugram 2026 | Complete Guide | Cerebrum Academy',
    metaDescription:
      'Complete guide on how to prepare for NEET in Gurugram. Study plan, coaching options, tips from toppers. Expert guidance from AIIMS faculty. 88264-44334!',
    heroTitle: 'How to Prepare for NEET in Gurugram - Complete Guide',
    heroSubtitle:
      'A comprehensive roadmap for Gurugram students preparing for NEET 2026. From choosing coaching to cracking the exam.',
    hasOfflineCenter: true,
    nearestCenter: {
      name: 'Gurugram Center',
      address: 'M2K Corporate Park, Sector 51, Gurugram 122018',
      distance: 'Expert Guidance Center',
    },
    localities: [
      { name: 'NEET Coaching Options', url: '/neet-coaching-gurugram' },
      { name: 'Study Material', url: '/neet-study-material-gurugram' },
      { name: 'Test Series', url: '/neet-test-series-gurugram' },
    ],
    relatedCities: [
      { name: 'Best NEET Coaching', url: '/best-neet-coaching-in-gurugram' },
      { name: 'NEET 2026 Preparation', url: '/neet-2026-preparation-gurugram' },
      { name: '2 Year NEET Course', url: '/2-year-neet-course-gurugram' },
    ],
    faqs: [
      {
        question: 'How to start NEET preparation in Gurugram?',
        answer: 'Step 1: Join quality coaching (check faculty, batch size). Step 2: Follow NCERT thoroughly. Step 3: Practice 100+ MCQs daily. Step 4: Take weekly tests. Cerebrum provides all this in one place.',
      },
      {
        question: 'Is self-study enough for NEET in Gurugram?',
        answer: 'Self-study success rate is 5-10%. With coaching, it rises to 40-50%. With quality coaching like Cerebrum (98% success), your chances multiply significantly.',
      },
      {
        question: 'How many hours to study for NEET daily?',
        answer: 'Class 11: 4-5 hours. Class 12: 6-8 hours. Dropper: 10-12 hours. Quality matters more than quantity. Our structured program optimizes your study time.',
      },
      {
        question: 'What books are best for NEET preparation?',
        answer: 'NCERT is 85% of NEET. Add: MTG for Biology, HC Verma for Physics, MS Chouhan for Chemistry. Our study material covers everything with NEET-focused approach.',
      },
    ],
    stats: { studentsFromCity: '1,50,000+', successRate: '98%', rating: '4.9' },
    geoCoordinates: { lat: '28.4495', lng: '77.0726' },
  },

  'neet-coaching-fees-in-gurugram': {
    slug: 'neet-coaching-fees-in-gurugram',
    cityName: 'Gurugram',
    stateName: 'Haryana',
    metaTitle: 'What is NEET Coaching Fee in Gurugram 2026? | Fee Comparison | Cerebrum',
    metaDescription:
      'Complete NEET coaching fees comparison in Gurugram. Aakash, Allen, Cerebrum fees compared. Best value coaching at ₹75K-95K. Call 88264-44334!',
    heroTitle: 'What is NEET Coaching Fee in Gurugram?',
    heroSubtitle:
      'Transparent fee comparison of all major NEET coaching institutes in Gurugram. Find the best value for your investment.',
    hasOfflineCenter: true,
    nearestCenter: {
      name: 'Gurugram Center',
      address: 'M2K Corporate Park, Sector 51, Gurugram 122018',
      distance: 'Best Value Coaching',
    },
    localities: [
      { name: 'Fee Comparison', url: '/neet-coaching-fees-gurugram' },
      { name: 'Scholarship', url: '/neet-scholarship-gurugram' },
      { name: 'EMI Options', url: '/neet-coaching-emi-gurugram' },
    ],
    relatedCities: [
      { name: 'Best NEET Coaching', url: '/best-neet-coaching-in-gurugram' },
      { name: 'Affordable Coaching', url: '/affordable-neet-coaching-gurugram' },
      { name: 'Scholarship Test', url: '/neet-scholarship-test-gurugram' },
    ],
    faqs: [
      {
        question: 'What is the fee for NEET coaching in Gurugram?',
        answer: 'Fees range: Aakash ₹1.5-2.5L, Allen ₹1.2-2L, FIITJEE ₹1.8-2.5L, Cerebrum ₹75K-95K. Cerebrum offers best value with AIIMS faculty and small batches.',
      },
      {
        question: 'Which is the cheapest NEET coaching in Gurugram?',
        answer: 'Local tutors: ₹30-50K (low results). Quality coaching: ₹75K-95K (Cerebrum - 98% results). Big brands: ₹1.5-2.5L. Cerebrum offers best quality-price ratio.',
      },
      {
        question: 'Is EMI available for NEET coaching fees?',
        answer: 'Yes! Cerebrum offers 0% EMI for 6-12 months. Pay ₹8,000-15,000/month instead of lump sum. No financial barrier to quality education.',
      },
      {
        question: 'Are there scholarships for NEET coaching?',
        answer: 'Cerebrum offers up to 50% scholarship based on entrance test. Toppers from Class 10/12 boards get additional discounts. Merit rewarded.',
      },
    ],
    stats: { studentsFromCity: '1,50,000+', successRate: '98%', rating: '4.9' },
    geoCoordinates: { lat: '28.4495', lng: '77.0726' },
  },

  // Review & Comparison Pages (P3)
  'top-10-neet-coaching-gurugram': {
    slug: 'top-10-neet-coaching-gurugram',
    cityName: 'Gurugram',
    stateName: 'Haryana',
    metaTitle: 'Top 10 NEET Coaching in Gurugram 2026 | Ranking & Comparison | Cerebrum',
    metaDescription:
      'Honest ranking of top 10 NEET coaching institutes in Gurugram 2026. Based on results, faculty, fees, reviews. Find your perfect fit. 88264-44334!',
    heroTitle: 'Top 10 NEET Coaching Institutes in Gurugram 2026',
    heroSubtitle:
      'Unbiased ranking based on results, faculty credentials, student reviews, and value for money.',
    hasOfflineCenter: true,
    nearestCenter: {
      name: 'Gurugram Center',
      address: 'M2K Corporate Park, Sector 51, Gurugram 122018',
      distance: '#1 Rated Institute',
    },
    localities: [
      { name: 'Sector 14 Coaching Hub', url: '/neet-coaching-gurgaon-sector-14' },
      { name: 'Sector 51 Center', url: '/biology-classes-gurgaon-sector-51' },
      { name: 'Online Options', url: '/online-neet-classes-gurugram' },
    ],
    relatedCities: [
      { name: 'Best NEET Coaching', url: '/best-neet-coaching-in-gurugram' },
      { name: 'NEET Reviews', url: '/neet-coaching-reviews-gurugram' },
      { name: 'Fee Comparison', url: '/neet-coaching-fees-gurugram' },
    ],
    faqs: [
      {
        question: 'What are the top 10 NEET coaching in Gurugram?',
        answer: '1. Cerebrum (98% results, AIIMS faculty), 2. Aakash (brand, large batches), 3. Allen (Kota-style), 4. FIITJEE (IIT focus), 5. Narayana, 6. VMC, 7. Career Point, 8. Resonance, 9. Physics Wallah, 10. Local institutes.',
      },
      {
        question: 'How is Cerebrum ranked #1?',
        answer: 'Criteria: Results (98% - highest), Faculty (AIIMS-trained), Batch size (25 - smallest), Reviews (4.9/5 - highest), Value (₹75-95K - best ratio).',
      },
      {
        question: 'Should I join a ranked institute or local tutor?',
        answer: 'Ranked institutes have proven systems, experienced faculty, and peer competition. Local tutors lack resources for comprehensive NEET prep. Invest in quality.',
      },
    ],
    stats: { studentsFromCity: '1,50,000+', successRate: '98%', rating: '4.9' },
    geoCoordinates: { lat: '28.4495', lng: '77.0726' },
  },

  'neet-coaching-reviews-gurugram': {
    slug: 'neet-coaching-reviews-gurugram',
    cityName: 'Gurugram',
    stateName: 'Haryana',
    metaTitle: 'NEET Coaching Reviews Gurugram 2026 | Student Testimonials | Cerebrum',
    metaDescription:
      'Real student reviews of NEET coaching in Gurugram. Read experiences, results, faculty feedback. Cerebrum - 4.9/5 rating. Make informed choice. 88264-44334!',
    heroTitle: 'NEET Coaching Reviews in Gurugram',
    heroSubtitle:
      'Real feedback from real students. Read verified reviews before choosing your NEET coaching.',
    hasOfflineCenter: true,
    nearestCenter: {
      name: 'Gurugram Center',
      address: 'M2K Corporate Park, Sector 51, Gurugram 122018',
      distance: '4.9/5 Student Rating',
    },
    localities: [
      { name: 'Google Reviews', url: 'https://g.page/cerebrum-biology-academy' },
      { name: 'Student Testimonials', url: '/testimonials' },
      { name: 'Success Stories', url: '/success-stories-gurugram' },
    ],
    relatedCities: [
      { name: 'Top 10 Coaching', url: '/top-10-neet-coaching-gurugram' },
      { name: 'Best Coaching', url: '/best-neet-coaching-in-gurugram' },
      { name: 'Coaching Comparison', url: '/neet-coaching-comparison-gurugram' },
    ],
    faqs: [
      {
        question: 'What do students say about Cerebrum?',
        answer: 'Common themes: "Best biology teaching", "Personal attention", "Small batches helped", "Faculty actually cares", "Worth every rupee". 4.9/5 average on Google with 500+ reviews.',
      },
      {
        question: 'How to verify coaching reviews?',
        answer: 'Check Google reviews (verified), ask for student contacts, visit and talk to current students, check social media for organic feedback. We welcome your due diligence.',
      },
      {
        question: 'Are online reviews reliable?',
        answer: 'Look for detailed reviews with specific experiences, not just star ratings. Cerebrum reviews mention specific faculty, topics, and experiences - indicating authenticity.',
      },
    ],
    stats: { studentsFromCity: '1,50,000+', successRate: '98%', rating: '4.9' },
    geoCoordinates: { lat: '28.4495', lng: '77.0726' },
  },

  // Specialized Keyword Pages (P3)
  'girls-neet-coaching-gurugram': {
    slug: 'girls-neet-coaching-gurugram',
    cityName: 'Gurugram',
    stateName: 'Haryana',
    metaTitle: 'Girls NEET Coaching Gurugram 2026 | Safe Environment | Cerebrum Academy',
    metaDescription:
      'Safe and supportive NEET coaching for girls in Gurugram. Female faculty available, women-friendly environment. 60% female students. Call 88264-44334!',
    heroTitle: 'NEET Coaching for Girls in Gurugram',
    heroSubtitle:
      'A safe, supportive environment where female medical aspirants thrive. 60% of our toppers are girls.',
    hasOfflineCenter: true,
    nearestCenter: {
      name: 'Gurugram Center',
      address: 'M2K Corporate Park, Sector 51, Gurugram 122018',
      distance: 'Safe Campus',
    },
    localities: [
      { name: 'Sector 51 Center', url: '/biology-classes-gurgaon-sector-51' },
      { name: 'DLF Area', url: '/biology-classes-dlf-gurgaon' },
      { name: 'Golf Course Road', url: '/biology-classes-golf-course-road-gurgaon' },
    ],
    relatedCities: [
      { name: 'NEET Coaching Gurugram', url: '/neet-coaching-gurugram' },
      { name: 'Evening Batch', url: '/evening-batch-neet-gurugram' },
      { name: 'Weekend Batch', url: '/weekend-neet-batch-gurugram' },
    ],
    faqs: [
      {
        question: 'Is the coaching environment safe for girls?',
        answer: 'Absolutely. CCTV monitored campus, female staff, strict anti-harassment policy, well-lit premises, and 60% female student population creates comfortable environment.',
      },
      {
        question: 'Are there female faculty members?',
        answer: 'Yes! We have female biology and chemistry faculty. Students can request female mentors if preferred.',
      },
      {
        question: 'What are batch timings suitable for girls?',
        answer: 'We offer morning (8 AM-12 PM) and afternoon (2 PM-6 PM) batches ensuring girls reach home before dark. Weekend batches also available.',
      },
      {
        question: 'Any special facilities for female students?',
        answer: 'Separate washrooms, rest room, dedicated female counselor, parent communication for safety, and girls study groups for peer support.',
      },
    ],
    stats: { studentsFromCity: '1,500+', successRate: '98%', rating: '4.9' },
    geoCoordinates: { lat: '28.4495', lng: '77.0726' },
  },

  'english-medium-neet-coaching-gurugram': {
    slug: 'english-medium-neet-coaching-gurugram',
    cityName: 'Gurugram',
    stateName: 'Haryana',
    metaTitle: 'English Medium NEET Coaching Gurugram 2026 | Premium Quality | Cerebrum',
    metaDescription:
      'English medium NEET coaching in Gurugram. Perfect for CBSE, ICSE, international school students. AIIMS faculty, premium teaching. Call 88264-44334!',
    heroTitle: 'English Medium NEET Coaching in Gurugram',
    heroSubtitle:
      'Premium English-medium coaching for students from CBSE, ICSE, IB, IGCSE backgrounds.',
    hasOfflineCenter: true,
    nearestCenter: {
      name: 'Gurugram Center',
      address: 'M2K Corporate Park, Sector 51, Gurugram 122018',
      distance: 'English Medium Expert',
    },
    localities: [
      { name: 'DPS Students', url: '/biology-classes-dps-gurgaon' },
      { name: 'Shri Ram School', url: '/biology-classes-shri-ram-school-gurgaon' },
      { name: 'International Schools', url: '/neet-coaching-international-school-gurgaon' },
    ],
    relatedCities: [
      { name: 'NEET Coaching Gurugram', url: '/neet-coaching-gurugram' },
      { name: 'CBSE NEET Prep', url: '/cbse-neet-coaching-gurugram' },
      { name: 'IB to NEET', url: '/ib-to-neet-coaching-gurugram' },
    ],
    faqs: [
      {
        question: 'Is coaching only in English?',
        answer: 'Yes! All teaching, study material, and tests are in English. Faculty are fluent English speakers from top medical colleges.',
      },
      {
        question: 'Is NEET easier in English or Hindi?',
        answer: 'NCERT (85% of NEET) is originally in English. English medium students have slight advantage. Our English coaching aligns perfectly with NCERT.',
      },
      {
        question: 'Do you teach IB/IGCSE students?',
        answer: 'Yes! We bridge IB/IGCSE curriculum to NEET. Special batches help international school students adapt to NCERT-based competitive exam pattern.',
      },
    ],
    stats: { studentsFromCity: '1,800+', successRate: '98%', rating: '4.9' },
    geoCoordinates: { lat: '28.4495', lng: '77.0726' },
  },

  'small-batch-neet-coaching-gurugram': {
    slug: 'small-batch-neet-coaching-gurugram',
    cityName: 'Gurugram',
    stateName: 'Haryana',
    metaTitle: 'Small Batch NEET Coaching Gurugram 2026 | 25 Students Only | Cerebrum',
    metaDescription:
      'Small batch NEET coaching in Gurugram with only 25 students per batch. Personal attention, better results. Not a factory. Call 88264-44334!',
    heroTitle: 'Small Batch NEET Coaching in Gurugram',
    heroSubtitle:
      'Maximum 25 students per batch. Because personal attention creates doctors, not assembly lines.',
    hasOfflineCenter: true,
    nearestCenter: {
      name: 'Gurugram Center',
      address: 'M2K Corporate Park, Sector 51, Gurugram 122018',
      distance: '25 Students Max',
    },
    localities: [
      { name: 'Sector 51', url: '/biology-classes-gurgaon-sector-51' },
      { name: 'Premium Coaching', url: '/premium-neet-coaching-gurugram' },
      { name: 'Personalized Learning', url: '/personalized-neet-coaching-gurugram' },
    ],
    relatedCities: [
      { name: 'Best NEET Coaching', url: '/best-neet-coaching-in-gurugram' },
      { name: 'Aakash Alternative', url: '/aakash-alternative-gurugram' },
      { name: 'Personal Attention', url: '/personal-attention-neet-gurugram' },
    ],
    faqs: [
      {
        question: 'Why small batch size matters?',
        answer: 'In 100+ student batches, teachers cannot track individual progress. In our 25-student batches, faculty knows each student by name, understands their weaknesses, and provides targeted help.',
      },
      {
        question: 'How does small batch improve results?',
        answer: 'More questions answered, more doubt sessions, more test feedback, more personal motivation. Our 98% success rate vs industry average 20% proves the impact.',
      },
      {
        question: 'Is small batch more expensive?',
        answer: 'Surprisingly, no! We charge ₹75-95K/year while big institutes with 100+ batches charge ₹1.5-2.5L. Better quality at lower cost.',
      },
      {
        question: 'Do you have limited seats?',
        answer: 'Yes! Only 4 batches × 25 students = 100 students per program. Book early to secure your seat. Quality over quantity.',
      },
    ],
    stats: { studentsFromCity: '1,50,000+', successRate: '98%', rating: '4.9' },
    geoCoordinates: { lat: '28.4495', lng: '77.0726' },
  },

  'pcb-coaching-gurugram': {
    slug: 'pcb-coaching-gurugram',
    cityName: 'Gurugram',
    stateName: 'Haryana',
    metaTitle: 'PCB Coaching Gurugram 2026 | Physics Chemistry Biology | Cerebrum Academy',
    metaDescription:
      'Complete PCB coaching in Gurugram for NEET. Physics, Chemistry, Biology by expert faculty. Integrated preparation. Sector 51. Call 88264-44334!',
    heroTitle: 'PCB Coaching for NEET in Gurugram',
    heroSubtitle:
      'Complete Physics, Chemistry, Biology coaching under one roof. Integrated NEET preparation with subject experts.',
    hasOfflineCenter: true,
    nearestCenter: {
      name: 'Gurugram Center',
      address: 'M2K Corporate Park, Sector 51, Gurugram 122018',
      distance: 'Complete PCB Center',
    },
    localities: [
      { name: 'Sector 51', url: '/biology-classes-gurgaon-sector-51' },
      { name: 'Biology Coaching', url: '/biology-coaching-gurugram' },
      { name: 'Chemistry Coaching', url: '/chemistry-coaching-gurugram' },
    ],
    relatedCities: [
      { name: 'NEET Coaching', url: '/neet-coaching-gurugram' },
      { name: 'Science Coaching', url: '/science-coaching-gurugram' },
      { name: 'Medical Coaching', url: '/medical-coaching-gurugram' },
    ],
    faqs: [
      {
        question: 'Do you teach all three subjects?',
        answer: 'Yes! Complete PCB coaching with: Biology (AIIMS faculty), Physics (IIT-trained), Chemistry (PhD holders). All subjects under one roof.',
      },
      {
        question: 'What is weightage of each subject in NEET?',
        answer: 'Biology: 360/720 (50%), Chemistry: 180/720 (25%), Physics: 180/720 (25%). We allocate teaching time proportionally with biology focus.',
      },
      {
        question: 'Can I join only for Biology?',
        answer: 'Yes! We offer Biology-only program at ₹45,000/year. Many students take Physics/Chemistry elsewhere and Biology from us.',
      },
      {
        question: 'How is the schedule organized?',
        answer: 'Typically: Mon-Tue Physics, Wed-Thu Chemistry, Fri-Sat Biology. Sunday tests and doubt sessions. Balanced coverage of all subjects.',
      },
    ],
    stats: { studentsFromCity: '1,50,000+', successRate: '98%', rating: '4.9' },
    geoCoordinates: { lat: '28.4495', lng: '77.0726' },
  },

  // Gurugram Class-Specific Pages
  'biology-class-11-gurgaon': {
    slug: 'biology-class-11-gurgaon',
    cityName: 'Gurgaon',
    stateName: 'Haryana',
    metaTitle: 'Class 11 Biology Coaching Gurgaon | NEET Foundation | Cerebrum Academy',
    metaDescription:
      'Best Class 11 biology coaching in Gurgaon. Build strong NEET foundation with AIIMS faculty. School + NEET integrated program. Sector 51 center. 88264-44334!',
    heroTitle: 'Class 11 Biology Coaching in Gurgaon',
    heroSubtitle:
      'Build your NEET foundation early! Our Class 11 program integrates school curriculum with competitive exam preparation.',
    hasOfflineCenter: true,
    nearestCenter: {
      name: 'Gurgaon Sector 51 Center',
      address: 'M2K Corporate Park, Sector 51, Gurugram',
      distance: 'Your Class 11 Biology Hub',
    },
    localities: [
      { name: 'DPS Gurgaon Students', url: '/biology-classes-dps-gurgaon' },
      { name: 'Shri Ram School Students', url: '/biology-classes-shri-ram-school-gurgaon' },
      { name: 'Amity Students', url: '/biology-classes-amity-gurgaon' },
      { name: 'Suncity Students', url: '/biology-classes-suncity-school-gurgaon' },
    ],
    relatedCities: [
      { name: 'Class 12 Biology Gurgaon', url: '/biology-class-12-gurgaon' },
      { name: 'NEET Coaching Gurgaon', url: '/neet-coaching-gurgaon' },
      { name: 'Biology Classes Gurgaon', url: '/biology-classes-gurgaon' },
    ],
    faqs: [
      {
        question: 'When should Class 11 students start NEET preparation?',
        answer:
          'The best time is NOW! Starting NEET preparation alongside Class 11 gives you 2 years for comprehensive coverage. Our integrated program helps you excel in both school exams and NEET.',
      },
      {
        question: 'Can Class 11 students manage school and NEET coaching together?',
        answer:
          'Absolutely! Our Class 11 program is designed to complement school schedules. We offer evening and weekend batches, and our curriculum covers both CBSE syllabus and NEET topics simultaneously.',
      },
      {
        question: 'What topics are covered in Class 11 biology for NEET?',
        answer:
          'We cover Diversity in Living World, Plant & Animal Kingdoms, Cell Biology, Plant Physiology, Human Physiology fundamentals - all aligned with NCERT and NEET requirements.',
      },
      {
        question: 'What is the fee for Class 11 biology coaching?',
        answer:
          'Our Class 11 NEET foundation program costs ₹45,000 to ₹60,000 per year. This includes regular classes, study material, test series, and doubt support.',
      },
    ],
    stats: {
      studentsFromCity: '800+',
      successRate: '98%',
      rating: '4.9',
    },
    geoCoordinates: {
      lat: '28.4495',
      lng: '77.0726',
    },
  },

  'biology-class-12-gurgaon': {
    slug: 'biology-class-12-gurgaon',
    cityName: 'Gurgaon',
    stateName: 'Haryana',
    metaTitle: 'Class 12 Biology Coaching Gurgaon | Board + NEET Prep | Cerebrum Academy',
    metaDescription:
      'Best Class 12 biology coaching in Gurgaon for Boards and NEET. Dual focus program. AIIMS faculty at Sector 51. 98% success rate. Call 88264-44334!',
    heroTitle: 'Class 12 Biology Coaching in Gurgaon',
    heroSubtitle:
      'Master Class 12 Biology for both Board exams and NEET. Our dual-focus program ensures excellence in both.',
    hasOfflineCenter: true,
    nearestCenter: {
      name: 'Gurgaon Sector 51 Center',
      address: 'M2K Corporate Park, Sector 51, Gurugram',
      distance: 'Your Class 12 Success Center',
    },
    localities: [
      { name: 'DPS Gurgaon Class 12', url: '/biology-classes-dps-gurgaon' },
      { name: 'Scottish High IB Students', url: '/biology-classes-scottish-high-gurgaon' },
      { name: 'Heritage School', url: '/biology-classes-heritage-school-gurgaon' },
      { name: 'Pathways World School', url: '/biology-classes-pathways-world-school' },
    ],
    relatedCities: [
      { name: 'Class 11 Biology Gurgaon', url: '/biology-class-11-gurgaon' },
      { name: '12th Boards Biology Gurgaon', url: '/biology-12th-boards-gurgaon' },
      { name: 'NEET Coaching Gurgaon', url: '/neet-coaching-gurgaon' },
    ],
    faqs: [
      {
        question: 'How do you balance Board and NEET preparation in Class 12?',
        answer:
          'Our curriculum is structured to cover both simultaneously. The good news: 90% of Class 12 biology is common to Boards and NEET. We add NEET-specific practice and application-based questions on top.',
      },
      {
        question: 'What is covered in Class 12 biology coaching?',
        answer:
          'We cover Reproduction, Genetics & Evolution, Biology in Human Welfare, Biotechnology, and Ecology - all chapters crucial for both Board exams and NEET.',
      },
      {
        question: 'Can students joining in Class 12 still crack NEET?',
        answer:
          'Yes! While early start is better, dedicated Class 12 students can absolutely crack NEET. We offer crash courses covering Class 11 basics alongside regular Class 12 curriculum.',
      },
      {
        question: 'What batch timings are available for Class 12 students?',
        answer:
          'We offer morning batches (before school for early dismissals), evening batches (4:30 PM onwards), and weekend intensive batches for Class 12 students.',
      },
    ],
    stats: {
      studentsFromCity: '900+',
      successRate: '98%',
      rating: '4.9',
    },
    geoCoordinates: {
      lat: '28.4495',
      lng: '77.0726',
    },
  },

  'biology-class-9-10-gurgaon': {
    slug: 'biology-class-9-10-gurgaon',
    cityName: 'Gurgaon',
    stateName: 'Haryana',
    metaTitle: 'Class 9 & 10 Biology Coaching Gurgaon | Foundation Program | Cerebrum Academy',
    metaDescription:
      'Build strong biology foundation in Class 9-10 for future NEET success. School curriculum + competitive exam prep in Gurgaon Sector 51. Call 88264-44334!',
    heroTitle: 'Class 9 & 10 Biology Foundation in Gurgaon',
    heroSubtitle:
      'Start early, win big! Our Class 9-10 program builds strong biology concepts for school success and future NEET preparation.',
    hasOfflineCenter: true,
    nearestCenter: {
      name: 'Gurgaon Sector 51 Center',
      address: 'M2K Corporate Park, Sector 51, Gurugram',
      distance: 'Foundation Building Center',
    },
    localities: [
      { name: 'Class 9 Biology Gurgaon', url: '/biology-class-9-10-gurgaon' },
      { name: 'Class 10 Biology Gurgaon', url: '/biology-class-9-10-gurgaon' },
      { name: 'School Students Gurgaon', url: '/biology-classes-gurgaon' },
    ],
    relatedCities: [
      { name: 'Class 11 Biology Gurgaon', url: '/biology-class-11-gurgaon' },
      { name: 'Biology Tuition Gurgaon', url: '/biology-tuition-gurgaon' },
      { name: 'Biology Classes Gurgaon', url: '/biology-classes-gurgaon' },
    ],
    faqs: [
      {
        question: 'Is Class 9-10 too early for NEET-focused biology coaching?',
        answer:
          'Not at all! Class 9-10 biology forms the foundation for advanced concepts. Students who build strong basics in these classes find Class 11-12 and NEET preparation much easier.',
      },
      {
        question: 'What topics are covered in Class 9-10 biology?',
        answer:
          'We cover Cell Biology, Tissues, Life Processes, Control & Coordination, Reproduction, Heredity & Evolution - all essential foundation topics for future NEET preparation.',
      },
      {
        question: 'Do you help with school exams too?',
        answer:
          'Absolutely! Our Class 9-10 program ensures excellent school exam performance while subtly introducing competitive exam concepts and analytical thinking skills.',
      },
      {
        question: 'What is the fee for Class 9-10 biology coaching?',
        answer:
          'Our foundation program for Class 9-10 costs ₹25,000 to ₹35,000 per year. This includes regular classes, worksheets, tests, and doubt support.',
      },
    ],
    stats: {
      studentsFromCity: '400+',
      successRate: '95%',
      rating: '4.8',
    },
    geoCoordinates: {
      lat: '28.4495',
      lng: '77.0726',
    },
  },

  'biology-classes-manav-rachna-gurgaon': {
    slug: 'biology-classes-manav-rachna-gurgaon',
    cityName: 'Manav Rachna Gurgaon',
    stateName: 'Haryana',
    metaTitle:
      'Biology Classes for Manav Rachna Students | NEET Coaching Faridabad | Cerebrum Academy',
    metaDescription:
      'Best biology classes for Manav Rachna School students. NEET coaching accessible from Faridabad & Gurgaon. AIIMS faculty. Call 88264-44334 for demo!',
    heroTitle: 'Biology Classes for Manav Rachna Students',
    heroSubtitle:
      'Quality NEET biology coaching for Manav Rachna International School students. Accessible from both Faridabad and South Gurgaon locations.',
    hasOfflineCenter: true,
    nearestCenter: {
      name: 'Gurgaon Sector 51 Center',
      address: 'M2K Corporate Park, Sector 51, Gurugram',
      distance: '25-30 min from Manav Rachna',
    },
    localities: [
      { name: 'Manav Rachna Faridabad', url: '/biology-classes-manav-rachna-gurgaon' },
      { name: 'Manav Rachna Gurgaon', url: '/biology-classes-manav-rachna-gurgaon' },
      { name: 'Sohna Road', url: '/biology-classes-sohna-road-gurgaon' },
      { name: 'South City', url: '/biology-classes-south-city-gurgaon' },
    ],
    relatedCities: [
      { name: 'Gurgaon', url: '/biology-classes-gurgaon' },
      { name: 'Faridabad', url: '/biology-classes-faridabad' },
      { name: 'NEET Coaching Gurgaon', url: '/neet-coaching-gurgaon' },
    ],
    faqs: [
      {
        question: 'Do Manav Rachna students travel to your Gurgaon center?',
        answer:
          'Yes! Many Manav Rachna students from both Faridabad and Gurgaon campuses travel to our Sector 51 center. Weekend batches are particularly popular among these students.',
      },
      {
        question: 'What is the travel time from Manav Rachna Faridabad?',
        answer:
          'Our Sector 51 center is approximately 25-30 minutes from Manav Rachna Faridabad campus via Sohna Road. Many students find this convenient for weekend classes.',
      },
      {
        question: 'Do you offer online classes for distant students?',
        answer:
          'Yes! Students who find travel difficult can opt for our live online classes with the same quality teaching. Many Manav Rachna students use our hybrid mode.',
      },
      {
        question: 'How do Manav Rachna students perform at Cerebrum?',
        answer:
          'Manav Rachna students have consistently performed well. Their disciplined academic background combined with our NEET-focused coaching produces excellent results.',
      },
    ],
    stats: {
      studentsFromCity: '65+',
      successRate: '96%',
      rating: '4.8',
    },
    geoCoordinates: {
      lat: '28.4180',
      lng: '77.0450',
    },
  },

  'biology-classes-shikshanter-gurgaon': {
    slug: 'biology-classes-shikshanter-gurgaon',
    cityName: 'Shikshanter Gurgaon',
    stateName: 'Haryana',
    metaTitle:
      'Biology Classes for Shikshanter Students | NEET Coaching Sector 40 | Cerebrum Academy',
    metaDescription:
      'Best biology classes for Shikshanter School Gurgaon students. NEET coaching in Sector 51, near Sector 40. AIIMS faculty. Call 88264-44334!',
    heroTitle: 'Biology Classes for Shikshanter School Students',
    heroSubtitle:
      "Expert NEET biology coaching for Shikshanter students. Our progressive teaching complements your school's experiential approach.",
    hasOfflineCenter: true,
    nearestCenter: {
      name: 'Gurgaon Sector 51 Center',
      address: 'M2K Corporate Park, Sector 51, Gurugram',
      distance: '12-15 min from Shikshanter',
    },
    localities: [
      { name: 'Shikshanter Sector 40', url: '/biology-classes-shikshanter-gurgaon' },
      { name: 'Sector 51 Gurgaon', url: '/biology-classes-gurgaon-sector-51' },
      { name: 'Sector 56 Gurgaon', url: '/biology-classes-gurgaon-sector-56' },
      { name: 'Golf Course Road', url: '/biology-classes-golf-course-road-gurgaon' },
    ],
    relatedCities: [
      { name: 'Gurgaon', url: '/biology-classes-gurgaon' },
      { name: 'NEET Coaching Gurgaon', url: '/neet-coaching-gurgaon' },
      { name: 'Biology Tuition Gurgaon', url: '/biology-tuition-gurgaon' },
    ],
    faqs: [
      {
        question: 'Is Cerebrum good for Shikshanter students who prefer experiential learning?',
        answer:
          "Absolutely! We use practical examples, visual learning, and hands-on understanding that aligns with Shikshanter's progressive pedagogy while adding NEET-specific exam strategies.",
      },
      {
        question: 'How far is Cerebrum from Shikshanter School?',
        answer:
          'Our Sector 51 center is approximately 5 km from Shikshanter in Sector 40 - about 12-15 minutes drive. Very convenient for after-school classes.',
      },
      {
        question: 'Do Shikshanter students adapt well to NEET coaching style?',
        answer:
          'Yes! Shikshanter students typically have strong conceptual understanding and curiosity. Our teaching helps them apply this foundation to competitive exam requirements effectively.',
      },
      {
        question: 'What batch timings suit Shikshanter students?',
        answer:
          'We offer 4:30 PM evening batches perfect for Shikshanter students, plus weekend intensive options for those with busy school schedules.',
      },
    ],
    stats: {
      studentsFromCity: '55+',
      successRate: '98%',
      rating: '4.8',
    },
    geoCoordinates: {
      lat: '28.4420',
      lng: '77.0380',
    },
  },

  // Additional Gurgaon Schools
  'biology-classes-rps-gurgaon': {
    slug: 'biology-classes-rps-gurgaon',
    cityName: 'RPS International Gurgaon',
    stateName: 'Haryana',
    metaTitle: 'Biology Classes for RPS International Students | NEET Coaching | Cerebrum Academy',
    metaDescription:
      'Best biology classes for RPS International School Gurgaon students. NEET coaching in Sector 51. AIIMS faculty, 98% success. Call 88264-44334 for demo!',
    heroTitle: 'Biology Classes for RPS International School Students',
    heroSubtitle:
      'Expert NEET biology coaching for RPS International School students. Quality education with proven results.',
    hasOfflineCenter: true,
    nearestCenter: {
      name: 'Gurgaon Sector 51 Center',
      address: 'M2K Corporate Park, Sector 51, Gurugram',
      distance: '15-20 min from RPS International',
    },
    localities: [
      { name: 'RPS International School', url: '/biology-classes-rps-gurgaon' },
      { name: 'Sector 51 Gurgaon', url: '/biology-classes-gurgaon-sector-51' },
      { name: 'Sector 56 Gurgaon', url: '/biology-classes-gurgaon-sector-56' },
      { name: 'Sector 49 Gurgaon', url: '/biology-classes-gurgaon-sector-49' },
    ],
    relatedCities: [
      { name: 'Gurgaon', url: '/biology-classes-gurgaon' },
      { name: 'Sector 51', url: '/biology-classes-gurgaon-sector-51' },
      { name: 'NEET Coaching Gurgaon', url: '/neet-coaching-gurgaon' },
    ],
    faqs: [
      {
        question: 'How far is Cerebrum from RPS International School?',
        answer:
          'Our Sector 51 center is conveniently located for RPS International students - approximately 15-20 minutes by road.',
      },
      {
        question: 'Do RPS students join Cerebrum for NEET?',
        answer:
          'Yes! Many RPS International students are part of our NEET preparation batches. Their strong academic foundation combines well with our focused NEET coaching.',
      },
      {
        question: 'What batch timings work for RPS students?',
        answer:
          'Our 4:30 PM evening batches are popular among RPS students. Weekend batches are also available for those with busy schedules.',
      },
      {
        question: 'What is the fee for RPS students?',
        answer:
          'Our fees range from ₹45,000 to ₹75,000 per year. We offer group discounts when multiple students from RPS join together.',
      },
    ],
    stats: {
      studentsFromCity: '70+',
      successRate: '98%',
      rating: '4.8',
    },
    geoCoordinates: {
      lat: '28.4450',
      lng: '77.0650',
    },
  },

  'biology-classes-euro-international-gurgaon': {
    slug: 'biology-classes-euro-international-gurgaon',
    cityName: 'Euro International Gurgaon',
    stateName: 'Haryana',
    metaTitle:
      'Biology Classes for Euro International Students | NEET Coaching Gurgaon | Cerebrum Academy',
    metaDescription:
      'Best biology classes for Euro International School students. NEET coaching in Sector 51 Gurgaon. AIIMS faculty. Call 88264-44334 for demo!',
    heroTitle: 'Biology Classes for Euro International School Students',
    heroSubtitle:
      'Premium NEET biology coaching for Euro International School students. Bridge your school curriculum with competitive exam preparation.',
    hasOfflineCenter: true,
    nearestCenter: {
      name: 'Gurgaon Sector 51 Center',
      address: 'M2K Corporate Park, Sector 51, Gurugram',
      distance: '15-20 min from Euro International',
    },
    localities: [
      { name: 'Euro International School', url: '/biology-classes-euro-international-gurgaon' },
      { name: 'Sector 51 Gurgaon', url: '/biology-classes-gurgaon-sector-51' },
      { name: 'South City', url: '/biology-classes-south-city-gurgaon' },
      { name: 'Sector 56 Gurgaon', url: '/biology-classes-gurgaon-sector-56' },
    ],
    relatedCities: [
      { name: 'Gurgaon', url: '/biology-classes-gurgaon' },
      { name: 'Sector 51', url: '/biology-classes-gurgaon-sector-51' },
      { name: 'NEET Coaching Gurgaon', url: '/neet-coaching-gurgaon' },
    ],
    faqs: [
      {
        question: 'Do you have students from Euro International School?',
        answer:
          'Yes! Euro International students are among our regular students. We understand their curriculum and help bridge the gap with NEET requirements.',
      },
      {
        question: 'How close is Cerebrum to Euro International?',
        answer:
          'Our Sector 51 center is about 15-20 minutes from Euro International School branches - easily accessible for after-school classes.',
      },
      {
        question: 'Can Euro students manage school and NEET together?',
        answer:
          'Absolutely! With our flexible batch timings and structured approach, Euro International students successfully balance both. Many have excelled in NEET while maintaining school grades.',
      },
      {
        question: 'What results have Euro students achieved?',
        answer:
          'Euro International students at Cerebrum have consistently scored 600+ in NEET. Several have secured admissions in top government medical colleges.',
      },
    ],
    stats: {
      studentsFromCity: '60+',
      successRate: '96%',
      rating: '4.8',
    },
    geoCoordinates: {
      lat: '28.4480',
      lng: '77.0580',
    },
  },

  'biology-classes-ryan-gurgaon': {
    slug: 'biology-classes-ryan-gurgaon',
    cityName: 'Ryan International Gurgaon',
    stateName: 'Haryana',
    metaTitle: 'Biology Classes for Ryan International Students | NEET Coaching | Cerebrum Academy',
    metaDescription:
      'Best biology classes for Ryan International School Gurgaon. NEET coaching in Sector 51 with AIIMS faculty. Call 88264-44334 for free demo!',
    heroTitle: 'Biology Classes for Ryan International School Students',
    heroSubtitle:
      'Expert NEET biology coaching for Ryan International School students. Strong foundation meets competitive exam excellence.',
    hasOfflineCenter: true,
    nearestCenter: {
      name: 'Gurgaon Sector 51 Center',
      address: 'M2K Corporate Park, Sector 51, Gurugram',
      distance: '15-20 min from Ryan International',
    },
    localities: [
      { name: 'Ryan International School', url: '/biology-classes-ryan-gurgaon' },
      { name: 'Sector 51 Gurgaon', url: '/biology-classes-gurgaon-sector-51' },
      { name: 'Sector 31 Gurgaon', url: '/biology-classes-gurgaon-sector-31' },
      { name: 'Mayfield Garden', url: '/biology-classes-mayfield-garden-gurgaon' },
    ],
    relatedCities: [
      { name: 'Gurgaon', url: '/biology-classes-gurgaon' },
      { name: 'Sector 51', url: '/biology-classes-gurgaon-sector-51' },
      { name: 'NEET Coaching Gurgaon', url: '/neet-coaching-gurgaon' },
    ],
    faqs: [
      {
        question: 'Which Ryan International branch students come to Cerebrum?',
        answer:
          'We have students from multiple Ryan International branches in Gurgaon including Sector 31 and other locations. All benefit from our proximity and quality teaching.',
      },
      {
        question: 'How far is Cerebrum from Ryan International School?',
        answer:
          'Our Sector 51 center is centrally located - approximately 15-20 minutes from most Ryan International branches in Gurgaon.',
      },
      {
        question: 'Do Ryan students perform well in NEET?',
        answer:
          'Yes! Ryan International students at Cerebrum have shown excellent results. The school strong academics combined with our NEET focus creates top performers.',
      },
      {
        question: 'What is the best batch for Ryan students?',
        answer:
          'Our 4:30 PM evening batch is popular among Ryan students. We also have weekend intensive batches for comprehensive preparation.',
      },
    ],
    stats: {
      studentsFromCity: '85+',
      successRate: '98%',
      rating: '4.8',
    },
    geoCoordinates: {
      lat: '28.4380',
      lng: '77.0450',
    },
  },

  'biology-classes-dav-gurgaon': {
    slug: 'biology-classes-dav-gurgaon',
    cityName: 'DAV Public School Gurgaon',
    stateName: 'Haryana',
    metaTitle: 'Biology Classes for DAV Public School Students | NEET Coaching | Cerebrum Academy',
    metaDescription:
      'Best biology classes for DAV Public School Gurgaon students. NEET coaching in Sector 51. AIIMS faculty, proven results. Call 88264-44334!',
    heroTitle: 'Biology Classes for DAV Public School Students',
    heroSubtitle:
      'Expert NEET biology coaching for DAV students. Build on your strong CBSE foundation with targeted NEET preparation.',
    hasOfflineCenter: true,
    nearestCenter: {
      name: 'Gurgaon Sector 51 Center',
      address: 'M2K Corporate Park, Sector 51, Gurugram',
      distance: '10-15 min from DAV Schools',
    },
    localities: [
      { name: 'DAV Public School Gurgaon', url: '/biology-classes-dav-gurgaon' },
      { name: 'Sector 51 Gurgaon', url: '/biology-classes-gurgaon-sector-51' },
      { name: 'Sector 14 Gurgaon', url: '/biology-classes-gurgaon-sector-14' },
      { name: 'Sector 49 Gurgaon', url: '/biology-classes-gurgaon-sector-49' },
    ],
    relatedCities: [
      { name: 'Gurgaon', url: '/biology-classes-gurgaon' },
      { name: 'Sector 51', url: '/biology-classes-gurgaon-sector-51' },
      { name: 'NEET Coaching Gurgaon', url: '/neet-coaching-gurgaon' },
    ],
    faqs: [
      {
        question: 'Why is Cerebrum good for DAV students?',
        answer:
          'DAV students have strong CBSE foundation which aligns perfectly with NEET syllabus. Our coaching builds on this foundation with competitive exam strategies and practice.',
      },
      {
        question: 'How close is Cerebrum to DAV Public School?',
        answer:
          'Our Sector 51 center is centrally located - about 10-15 minutes from DAV branches in Gurgaon. Convenient for after-school classes.',
      },
      {
        question: 'Do DAV students need extra preparation for NEET?',
        answer:
          'While DAV provides excellent CBSE foundation, NEET requires additional competitive exam practice, advanced problems, and time management skills - which we provide.',
      },
      {
        question: 'What batch timings suit DAV students?',
        answer:
          'Our 4:30 PM batches work well for DAV students. Early morning batches before school are also popular for dedicated NEET aspirants.',
      },
    ],
    stats: {
      studentsFromCity: '95+',
      successRate: '98%',
      rating: '4.8',
    },
    geoCoordinates: {
      lat: '28.4500',
      lng: '77.0400',
    },
  },

  'biology-classes-lotus-valley-gurgaon': {
    slug: 'biology-classes-lotus-valley-gurgaon',
    cityName: 'Lotus Valley Gurgaon',
    stateName: 'Haryana',
    metaTitle: 'Biology Classes for Lotus Valley Students | NEET Coaching | Cerebrum Academy',
    metaDescription:
      'Best biology classes for Lotus Valley International School students. NEET coaching in Sector 51 Gurgaon. AIIMS faculty. Call 88264-44334!',
    heroTitle: 'Biology Classes for Lotus Valley International School Students',
    heroSubtitle:
      'Premium NEET biology coaching for Lotus Valley students. Complement your international curriculum with competitive exam mastery.',
    hasOfflineCenter: true,
    nearestCenter: {
      name: 'Gurgaon Sector 51 Center',
      address: 'M2K Corporate Park, Sector 51, Gurugram',
      distance: '15-20 min from Lotus Valley',
    },
    localities: [
      { name: 'Lotus Valley International', url: '/biology-classes-lotus-valley-gurgaon' },
      { name: 'Sector 51 Gurgaon', url: '/biology-classes-gurgaon-sector-51' },
      { name: 'Sector 50 Gurgaon', url: '/biology-classes-gurgaon-sector-50' },
      { name: 'Nirvana Country', url: '/biology-classes-nirvana-country-gurgaon' },
    ],
    relatedCities: [
      { name: 'Gurgaon', url: '/biology-classes-gurgaon' },
      { name: 'Sector 51', url: '/biology-classes-gurgaon-sector-51' },
      { name: 'NEET Coaching Gurgaon', url: '/neet-coaching-gurgaon' },
    ],
    faqs: [
      {
        question: 'Do Lotus Valley students study at Cerebrum?',
        answer:
          'Yes! Lotus Valley International School students are among our successful NEET aspirants. We help them bridge their international curriculum with NEET requirements.',
      },
      {
        question: 'How far is Cerebrum from Lotus Valley School?',
        answer:
          'Our Sector 51 center is approximately 15-20 minutes from Lotus Valley International School - convenient for after-school classes.',
      },
      {
        question: 'Can Lotus Valley students handle both IB/Cambridge and NEET?',
        answer:
          'Absolutely! Many Lotus Valley students successfully manage both. Our flexible schedules and targeted approach help them excel in school and NEET simultaneously.',
      },
      {
        question: 'What extra support do international curriculum students get?',
        answer:
          'We provide supplementary material covering NEET-specific topics. Our faculty understands international curriculum patterns and addresses the gaps effectively.',
      },
    ],
    stats: {
      studentsFromCity: '65+',
      successRate: '98%',
      rating: '4.9',
    },
    geoCoordinates: {
      lat: '28.4520',
      lng: '77.0700',
    },
  },

  'biology-classes-blue-bells-gurgaon': {
    slug: 'biology-classes-blue-bells-gurgaon',
    cityName: 'Blue Bells Gurgaon',
    stateName: 'Haryana',
    metaTitle: 'Biology Classes for Blue Bells School Students | NEET Coaching | Cerebrum Academy',
    metaDescription:
      'Best biology classes for Blue Bells Model School students. NEET coaching in Sector 51 Gurgaon. AIIMS faculty. Call 88264-44334 for demo!',
    heroTitle: 'Biology Classes for Blue Bells School Students',
    heroSubtitle:
      'Expert NEET biology coaching for Blue Bells Model School students. Quality coaching at our convenient Sector 51 center.',
    hasOfflineCenter: true,
    nearestCenter: {
      name: 'Gurgaon Sector 51 Center',
      address: 'M2K Corporate Park, Sector 51, Gurugram',
      distance: '10-15 min from Blue Bells',
    },
    localities: [
      { name: 'Blue Bells Model School', url: '/biology-classes-blue-bells-gurgaon' },
      { name: 'Sector 51 Gurgaon', url: '/biology-classes-gurgaon-sector-51' },
      { name: 'Sector 4 Gurgaon', url: '/biology-classes-gurgaon-sector-4' },
      { name: 'Sector 50 Gurgaon', url: '/biology-classes-gurgaon-sector-50' },
    ],
    relatedCities: [
      { name: 'Gurgaon', url: '/biology-classes-gurgaon' },
      { name: 'Sector 51', url: '/biology-classes-gurgaon-sector-51' },
      { name: 'NEET Coaching Gurgaon', url: '/neet-coaching-gurgaon' },
    ],
    faqs: [
      {
        question: 'How close is Cerebrum to Blue Bells Model School?',
        answer:
          'Our Sector 51 center is approximately 10-15 minutes from Blue Bells Model School - one of the most convenient NEET coaching options for Blue Bells students.',
      },
      {
        question: 'Do Blue Bells students perform well at Cerebrum?',
        answer:
          'Yes! Blue Bells students have a strong academic foundation. Combined with our focused NEET coaching, they consistently achieve excellent results.',
      },
      {
        question: 'What batch timings work for Blue Bells students?',
        answer:
          'Our 4:30 PM evening batches are popular among Blue Bells students. Weekend batches provide additional intensive preparation options.',
      },
      {
        question: 'Is there any group discount for Blue Bells students?',
        answer:
          'Yes! When multiple Blue Bells students join together, we offer attractive group discounts. Contact us for current offers.',
      },
    ],
    stats: {
      studentsFromCity: '75+',
      successRate: '98%',
      rating: '4.8',
    },
    geoCoordinates: {
      lat: '28.4600',
      lng: '77.0350',
    },
  },

  'neet-droppers-batch-gurgaon': {
    slug: 'neet-droppers-batch-gurgaon',
    cityName: 'Gurgaon',
    stateName: 'Haryana',
    metaTitle: 'NEET Droppers Batch Gurgaon | Repeater Coaching | Cerebrum Academy',
    metaDescription:
      'Dedicated NEET droppers batch in Gurgaon. Gap year coaching with intensive preparation. Proven results for repeaters. Sector 51 center. Call 88264-44334!',
    heroTitle: 'NEET Droppers Batch in Gurgaon',
    heroSubtitle:
      'Your second chance, our full commitment. Dedicated full-year program for NEET repeaters with proven success strategies.',
    hasOfflineCenter: true,
    nearestCenter: {
      name: 'Gurgaon Sector 51 Center',
      address: 'M2K Corporate Park, Sector 51, Gurugram',
      distance: 'Dropper Success Center',
    },
    localities: [
      { name: 'Gap Year Students Gurgaon', url: '/neet-droppers-batch-gurgaon' },
      { name: 'NEET Repeaters Gurugram', url: '/neet-droppers-batch-gurgaon' },
      { name: 'Sector 51 Gurgaon', url: '/neet-coaching-gurgaon-sector-51' },
    ],
    relatedCities: [
      { name: 'NEET Coaching Gurgaon', url: '/neet-coaching-gurgaon' },
      { name: 'Biology Classes Gurgaon', url: '/biology-classes-gurgaon' },
      { name: 'NEET Droppers Delhi', url: '/neet-droppers-batch-delhi' },
    ],
    faqs: [
      {
        question: 'Is taking a drop year for NEET worth it?',
        answer:
          'Absolutely! Many AIIMS and top medical college students are droppers. With focused preparation and right guidance, a gap year can transform your NEET score significantly.',
      },
      {
        question: 'What is different about your droppers batch?',
        answer:
          'Our droppers batch offers full-day classes (6-8 hours), extensive test series, personalized improvement plans, weak topic focus, and mental health support. We analyze your previous attempt to create a tailored strategy.',
      },
      {
        question: 'Can I improve my NEET score significantly in one year?',
        answer:
          'Yes! Our droppers have shown average improvements of 100-150 marks. Many have jumped from below 500 to 600+ scores with dedicated preparation.',
      },
      {
        question: 'What is the schedule for droppers batch?',
        answer:
          'Our droppers batch runs full-day from 9 AM to 5 PM with breaks. This includes classes, self-study, doubt sessions, and daily tests. Weekend mock tests complete the intensive preparation.',
      },
    ],
    stats: {
      studentsFromCity: '200+',
      successRate: '98%',
      rating: '4.9',
    },
    geoCoordinates: {
      lat: '28.4495',
      lng: '77.0726',
    },
  },

  'neet-coaching-dps-vasant-kunj-students': {
    slug: 'neet-coaching-dps-vasant-kunj-students',
    cityName: 'DPS Vasant Kunj Students',
    stateName: 'Delhi',
    metaTitle: 'NEET Coaching for DPS Vasant Kunj Students | Cerebrum Biology Academy',
    metaDescription:
      'Expert NEET biology coaching for DPS Vasant Kunj students. Flexible timings after school hours. 15+ years experience. Call 88264-44334.',
    heroTitle: 'NEET Coaching for DPS Vasant Kunj Students',
    heroSubtitle:
      'Specialized NEET preparation designed for DPS Vasant Kunj students. After-school batches with AIIMS-trained faculty.',
    hasOfflineCenter: true,
    nearestCenter: {
      name: 'Green Park Center',
      address: 'Green Park Main, New Delhi',
      distance: '8-10 km from DPS Vasant Kunj',
    },
    localities: [
      { name: 'Vasant Kunj', url: '/biology-classes-vasant-kunj' },
      { name: 'Green Park', url: '/biology-classes-green-park' },
      { name: 'South Extension', url: '/biology-classes-south-extension' },
      { name: 'Saket', url: '/biology-classes-saket' },
    ],
    relatedCities: [
      { name: 'NEET Coaching Delhi', url: '/neet-coaching-delhi' },
      { name: 'Biology Classes South Delhi', url: '/biology-classes-south-delhi' },
      { name: 'NEET Coaching Gurgaon', url: '/neet-coaching-gurgaon' },
    ],
    faqs: [
      {
        question: 'What batch timings are available for DPS Vasant Kunj students?',
        answer:
          'We offer after-school batches starting at 4:30 PM and 6:00 PM, perfect for DPS Vasant Kunj students. Weekend batches on Saturday and Sunday mornings are also available for intensive preparation.',
      },
      {
        question: 'How far is the nearest center from DPS Vasant Kunj?',
        answer:
          'Our Green Park center is 8-10 km from DPS Vasant Kunj, approximately 20-25 minutes by car. Many DPS students also prefer our South Extension center which is equally accessible.',
      },
      {
        question: 'Do you coordinate with DPS Vasant Kunj school curriculum?',
        answer:
          'Yes! We align our NEET coaching with NCERT and CBSE board syllabus, so it complements your school studies perfectly. Our faculty ensures concepts taught in school are reinforced and expanded for NEET.',
      },
      {
        question: 'How many DPS Vasant Kunj students study at Cerebrum?',
        answer:
          'Over 1,50,000+ students have trained with us across all centers over 15+ years. We have a strong community of DPS Vasant Kunj students who benefit from our focused NEET preparation.',
      },
    ],
    stats: {
      studentsFromCity: '1,50,000+',
      successRate: '98%',
      rating: '4.9',
    },
    geoCoordinates: {
      lat: '28.5244',
      lng: '77.1580',
    },
  },

  'neet-coaching-dps-rohini-students': {
    slug: 'neet-coaching-dps-rohini-students',
    cityName: 'DPS Rohini Students',
    stateName: 'Delhi',
    metaTitle: 'NEET Coaching for DPS Rohini Students | Cerebrum Biology Academy',
    metaDescription:
      'Best NEET biology coaching for DPS Rohini students. Rohini center with after-school batches. 65+ AIIMS selections. Call 88264-44334.',
    heroTitle: 'NEET Coaching for DPS Rohini Students',
    heroSubtitle:
      'Join hundreds of DPS Rohini students at our Rohini center. Convenient location with proven NEET success.',
    hasOfflineCenter: true,
    nearestCenter: {
      name: 'Rohini Center',
      address: 'Sector 7, Rohini, New Delhi',
      distance: '3-5 km from DPS Rohini',
    },
    localities: [
      { name: 'Rohini', url: '/biology-classes-rohini' },
      { name: 'Pitampura', url: '/biology-classes-pitampura' },
      { name: 'Shalimar Bagh', url: '/biology-classes-shalimar-bagh' },
      { name: 'Sector 7 Rohini', url: '/biology-classes-rohini-sector-7' },
    ],
    relatedCities: [
      { name: 'NEET Coaching Delhi', url: '/neet-coaching-delhi' },
      { name: 'Biology Classes Rohini', url: '/biology-classes-rohini' },
      { name: 'NEET Coaching North Delhi', url: '/neet-coaching-north-delhi' },
    ],
    faqs: [
      {
        question: 'Is there a center near DPS Rohini?',
        answer:
          'Yes! Our Rohini center is just 3-5 km from DPS Rohini, making it extremely convenient for students. The center is well-connected by metro and bus routes.',
      },
      {
        question: 'What timings work best for DPS Rohini students?',
        answer:
          'Our 4:30 PM and 6:00 PM batches are most popular with DPS Rohini students, allowing them to attend coaching after school. We also offer early morning batches at 6:00 AM for dedicated students.',
      },
      {
        question: 'Can I manage school and NEET coaching together?',
        answer:
          'Absolutely! Our curriculum is designed to complement your CBSE board studies. Many DPS Rohini students successfully manage both school and our NEET coaching, excelling in both boards and NEET.',
      },
      {
        question: 'What results have DPS Rohini students achieved?',
        answer:
          'DPS Rohini students at Cerebrum have achieved excellent results with 65+ AIIMS selections and hundreds of NEET qualifications over our 15+ years. Our track record speaks for itself.',
      },
    ],
    stats: {
      studentsFromCity: '1,50,000+',
      successRate: '98%',
      rating: '4.9',
    },
    geoCoordinates: {
      lat: '28.7328',
      lng: '77.1169',
    },
  },

  'biology-classes-sanskriti-school': {
    slug: 'biology-classes-sanskriti-school',
    cityName: 'Sanskriti School Students',
    stateName: 'Delhi',
    metaTitle: 'Biology Classes for Sanskriti School Students | NEET Coaching',
    metaDescription:
      'NEET biology coaching for Sanskriti School students. South Delhi centers near Chanakyapuri. Expert faculty, flexible timings. Call 88264-44334.',
    heroTitle: 'Biology Classes for Sanskriti School Students',
    heroSubtitle:
      'Premium NEET coaching tailored for Sanskriti School students. Build on your strong foundation with our expert guidance.',
    hasOfflineCenter: true,
    nearestCenter: {
      name: 'South Extension Center',
      address: 'Block D, South Extension Part 2, New Delhi',
      distance: '6-8 km from Sanskriti School',
    },
    localities: [
      { name: 'Chanakyapuri', url: '/biology-classes-chanakyapuri' },
      { name: 'South Extension', url: '/biology-classes-south-extension' },
      { name: 'Green Park', url: '/biology-classes-green-park' },
      { name: 'Vasant Vihar', url: '/biology-classes-vasant-vihar' },
    ],
    relatedCities: [
      { name: 'Biology Classes Delhi', url: '/biology-classes-delhi' },
      { name: 'NEET Coaching South Delhi', url: '/neet-coaching-south-delhi' },
      { name: 'Biology Tuition Chanakyapuri', url: '/biology-tuition-chanakyapuri' },
    ],
    faqs: [
      {
        question: 'Which center is closest to Sanskriti School?',
        answer:
          'Our South Extension center is 6-8 km from Sanskriti School, easily accessible via Outer Ring Road. Green Park center is also a convenient option for Sanskriti students.',
      },
      {
        question: 'Do you offer weekend batches for Sanskriti students?',
        answer:
          'Yes! We understand Sanskriti School has a demanding curriculum. Our weekend intensive batches on Saturday and Sunday are perfect for comprehensive NEET preparation without compromising school studies.',
      },
      {
        question: 'How does your coaching complement Sanskriti curriculum?',
        answer:
          'Sanskriti School provides excellent academic foundation. Our NEET coaching builds on this by focusing on competitive exam strategies, time management, and NEET-specific problem-solving techniques.',
      },
      {
        question: 'What success rate do Sanskriti students have?',
        answer:
          'Sanskriti students bring strong academic backgrounds and perform exceptionally well. Our 15+ years of experience and 65+ AIIMS selections demonstrate our proven track record with top school students.',
      },
    ],
    stats: {
      studentsFromCity: '1,50,000+',
      successRate: '98%',
      rating: '4.9',
    },
    geoCoordinates: {
      lat: '28.5831',
      lng: '77.1774',
    },
  },

  'neet-coaching-modern-school-students': {
    slug: 'neet-coaching-modern-school-students',
    cityName: 'Modern School Students',
    stateName: 'Delhi',
    metaTitle: 'NEET Coaching for Modern School Students | Cerebrum Biology Academy',
    metaDescription:
      'NEET biology coaching for Modern School students across Delhi. Multiple centers, after-school batches. 15+ years experience. Call 88264-44334.',
    heroTitle: 'NEET Coaching for Modern School Students',
    heroSubtitle:
      'Specialized NEET preparation for Modern School students. Choose from our 4 Delhi centers for maximum convenience.',
    hasOfflineCenter: true,
    nearestCenter: {
      name: 'South Extension Center',
      address: 'Block D, South Extension Part 2, New Delhi',
      distance: 'Multiple centers across Delhi',
    },
    localities: [
      { name: 'Barakhamba Road', url: '/biology-classes-connaught-place' },
      { name: 'Vasant Vihar', url: '/biology-classes-vasant-vihar' },
      { name: 'South Extension', url: '/biology-classes-south-extension' },
      { name: 'Greater Kailash', url: '/biology-classes-greater-kailash' },
    ],
    relatedCities: [
      { name: 'NEET Coaching Delhi', url: '/neet-coaching-delhi' },
      { name: 'Biology Classes Delhi', url: '/biology-classes-delhi' },
      { name: 'NEET Coaching Central Delhi', url: '/neet-coaching-central-delhi' },
    ],
    faqs: [
      {
        question: 'Which centers are convenient for Modern School students?',
        answer:
          'Depending on your Modern School branch, our South Extension, Green Park, Rohini, and Gurgaon centers are all easily accessible. We can recommend the best center based on your location.',
      },
      {
        question: 'What batch timings suit Modern School schedules?',
        answer:
          'Modern School typically ends by 3:30 PM, so our 4:30 PM and 6:00 PM batches work perfectly. We also offer weekend batches for students who prefer intensive weekend preparation.',
      },
      {
        question: 'How do you integrate with Modern School curriculum?',
        answer:
          'Modern School follows rigorous CBSE standards. Our NEET coaching enhances this foundation with competitive exam techniques, ensuring students excel in both board exams and NEET simultaneously.',
      },
      {
        question: 'What is your success rate with Modern School students?',
        answer:
          'Modern School students have consistently performed excellently at Cerebrum. Over 15+ years and 1,50,000+ students, we have maintained a 98% success rate with 65+ AIIMS selections.',
      },
    ],
    stats: {
      studentsFromCity: '1,50,000+',
      successRate: '98%',
      rating: '4.9',
    },
    geoCoordinates: {
      lat: '28.6139',
      lng: '77.2090',
    },
  },

  'neet-coaching-dps-gurgaon-students': {
    slug: 'neet-coaching-dps-gurgaon-students',
    cityName: 'DPS Gurgaon Students',
    stateName: 'Haryana',
    metaTitle: 'NEET Coaching for DPS Gurgaon Students | Cerebrum Biology Academy',
    metaDescription:
      'NEET biology coaching for DPS Gurgaon students. Sector 51 Gurgaon center, after-school batches. Expert AIIMS faculty. Call 88264-44334.',
    heroTitle: 'NEET Coaching for DPS Gurgaon Students',
    heroSubtitle:
      'Convenient NEET coaching for DPS Gurgaon students at our Sector 51 center. After-school batches designed for your schedule.',
    hasOfflineCenter: true,
    nearestCenter: {
      name: 'Gurgaon Sector 51 Center',
      address: 'M2K Corporate Park, Sector 51, Gurugram 122018',
      distance: '5-7 km from DPS Gurgaon',
    },
    localities: [
      { name: 'DPS Road Gurgaon', url: '/biology-classes-dps-road-gurgaon' },
      { name: 'Sector 45 Gurgaon', url: '/biology-classes-gurgaon-sector-45' },
      { name: 'Golf Course Road', url: '/biology-classes-golf-course-road-gurgaon' },
      { name: 'Sector 51 Gurgaon', url: '/biology-classes-gurgaon-sector-51' },
    ],
    relatedCities: [
      { name: 'NEET Coaching Gurgaon', url: '/neet-coaching-gurgaon' },
      { name: 'Biology Classes Gurgaon', url: '/biology-classes-gurgaon' },
      { name: 'NEET Coaching Sector 51', url: '/neet-coaching-gurgaon-sector-51' },
    ],
    faqs: [
      {
        question: 'How far is Cerebrum from DPS Gurgaon?',
        answer:
          'Our Sector 51 center is just 5-7 km from DPS Gurgaon, approximately 15-20 minutes by car. The location is very convenient for DPS students to attend after school.',
      },
      {
        question: 'What are the batch timings for DPS Gurgaon students?',
        answer:
          'We offer after-school batches at 4:30 PM and 6:00 PM specifically designed for DPS students. Weekend batches on Saturday and Sunday provide additional intensive preparation time.',
      },
      {
        question: 'Can I balance DPS academics with NEET preparation?',
        answer:
          'Absolutely! Our coaching complements the strong DPS curriculum. We focus on NEET-specific strategies while reinforcing CBSE concepts, ensuring students excel in both boards and competitive exams.',
      },
      {
        question: 'What results have DPS Gurgaon students achieved?',
        answer:
          'DPS Gurgaon students at Cerebrum have achieved outstanding results. Our 15+ years of experience with 65+ AIIMS selections and 98% success rate demonstrates our commitment to excellence.',
      },
    ],
    stats: {
      studentsFromCity: '1,50,000+',
      successRate: '98%',
      rating: '4.9',
    },
    geoCoordinates: {
      lat: '28.4670',
      lng: '77.0270',
    },
  },

  'neet-coaching-pathways-school': {
    slug: 'neet-coaching-pathways-school',
    cityName: 'Pathways School Students',
    stateName: 'Haryana',
    metaTitle: 'NEET Coaching for Pathways School Students | Cerebrum Biology Academy',
    metaDescription:
      'NEET biology coaching for Pathways School Gurgaon students. IB & CBSE curriculum support. Sector 51 center. Call 88264-44334.',
    heroTitle: 'NEET Coaching for Pathways School Students',
    heroSubtitle:
      'Specialized NEET preparation for Pathways students. Expert guidance for both IB and CBSE curricula.',
    hasOfflineCenter: true,
    nearestCenter: {
      name: 'Gurgaon Sector 51 Center',
      address: 'M2K Corporate Park, Sector 51, Gurugram 122018',
      distance: '6-8 km from Pathways School',
    },
    localities: [
      { name: 'Aravali Retreat Gurgaon', url: '/biology-classes-gurgaon-aravali' },
      { name: 'Sector 51 Gurgaon', url: '/biology-classes-gurgaon-sector-51' },
      { name: 'Badshapur Gurgaon', url: '/biology-classes-gurgaon-badshapur' },
      { name: 'South City Gurgaon', url: '/biology-classes-south-city-gurgaon' },
    ],
    relatedCities: [
      { name: 'NEET Coaching Gurgaon', url: '/neet-coaching-gurgaon' },
      { name: 'Biology Classes Gurgaon', url: '/biology-classes-gurgaon' },
      { name: 'IB Biology Coaching', url: '/ib-biology-coaching-gurgaon' },
    ],
    faqs: [
      {
        question: 'Do you support both IB and CBSE curricula?',
        answer:
          'Yes! Pathways offers both IB and CBSE streams. Our faculty is experienced in aligning NEET preparation with both curricula, ensuring students from either stream can excel in NEET.',
      },
      {
        question: 'How far is the center from Pathways School?',
        answer:
          'Our Sector 51 center is 6-8 km from Pathways School Aravali campus, approximately 20 minutes by car. The location is convenient for after-school coaching.',
      },
      {
        question: 'What timings work for Pathways students?',
        answer:
          'We offer flexible timings including 4:30 PM and 6:00 PM batches for after-school coaching. Weekend intensive batches are also popular with Pathways students for comprehensive preparation.',
      },
      {
        question: 'Can IB students prepare for NEET alongside their curriculum?',
        answer:
          'Absolutely! Many IB students from Pathways successfully prepare for NEET. We bridge the curriculum differences and focus on NEET-specific topics, ensuring comprehensive preparation alongside IB studies.',
      },
    ],
    stats: {
      studentsFromCity: '1,50,000+',
      successRate: '98%',
      rating: '4.9',
    },
    geoCoordinates: {
      lat: '28.4017',
      lng: '77.0630',
    },
  },

  'biology-tuition-ryan-international': {
    slug: 'biology-tuition-ryan-international',
    cityName: 'Ryan International Students',
    stateName: 'Delhi NCR',
    metaTitle: 'Biology Tuition for Ryan International Students | NEET Coaching',
    metaDescription:
      'NEET biology coaching for Ryan International students across Delhi NCR. Multiple centers, flexible batches. 15+ years experience. Call 88264-44334.',
    heroTitle: 'Biology Tuition for Ryan International Students',
    heroSubtitle:
      'NEET coaching for Ryan International students across all branches. Choose from our 4 convenient centers in Delhi NCR.',
    hasOfflineCenter: true,
    nearestCenter: {
      name: 'Multiple Centers',
      address: 'Rohini, South Extension, Green Park, Gurgaon Sector 51',
      distance: 'Centers near all Ryan branches',
    },
    localities: [
      { name: 'Rohini', url: '/biology-classes-rohini' },
      { name: 'Vasant Kunj', url: '/biology-classes-vasant-kunj' },
      { name: 'Gurgaon', url: '/biology-classes-gurgaon' },
      { name: 'Greater Noida', url: '/biology-classes-greater-noida' },
    ],
    relatedCities: [
      { name: 'NEET Coaching Delhi', url: '/neet-coaching-delhi' },
      { name: 'Biology Classes Gurgaon', url: '/biology-classes-gurgaon' },
      { name: 'NEET Coaching Rohini', url: '/neet-coaching-rohini' },
    ],
    faqs: [
      {
        question: 'Which center is nearest to my Ryan International branch?',
        answer:
          'Ryan International has multiple branches across Delhi NCR. Our Rohini center serves North Delhi branches, South Extension/Green Park for South Delhi, and Gurgaon Sector 51 for Haryana branches. Contact us to find your nearest center.',
      },
      {
        question: 'What batch timings suit Ryan International schedules?',
        answer:
          'Ryan International typically has afternoon dismissals. Our 4:30 PM and 6:00 PM batches are designed for after-school coaching. Weekend batches provide additional intensive preparation time.',
      },
      {
        question: 'How do you support Ryan CBSE curriculum?',
        answer:
          'Ryan International follows CBSE curriculum. Our NEET coaching complements this perfectly by reinforcing board concepts while adding competitive exam strategies and NEET-specific problem-solving.',
      },
      {
        question: 'What results have Ryan students achieved?',
        answer:
          'Ryan International students across our centers have achieved excellent results. Our 15+ years experience with 1,50,000+ students, 65+ AIIMS selections, and 98% success rate speaks for itself.',
      },
    ],
    stats: {
      studentsFromCity: '1,50,000+',
      successRate: '98%',
      rating: '4.9',
    },
    geoCoordinates: {
      lat: '28.6517',
      lng: '77.1389',
    },
  },

  'neet-coaching-presidium-school': {
    slug: 'neet-coaching-presidium-school',
    cityName: 'Presidium School Students',
    stateName: 'Delhi NCR',
    metaTitle: 'NEET Coaching for Presidium School Students | Cerebrum Biology Academy',
    metaDescription:
      'NEET biology coaching for Presidium School students. Centers across Delhi NCR, after-school batches. Expert faculty. Call 88264-44334.',
    heroTitle: 'NEET Coaching for Presidium School Students',
    heroSubtitle:
      'Comprehensive NEET preparation for Presidium students. Multiple centers across Delhi NCR for your convenience.',
    hasOfflineCenter: true,
    nearestCenter: {
      name: 'Multiple Centers',
      address: 'Rohini, Gurgaon Sector 51, South Extension, Green Park',
      distance: 'Near all major Presidium branches',
    },
    localities: [
      { name: 'Indirapuram', url: '/biology-classes-indirapuram' },
      { name: 'Dwarka', url: '/biology-classes-dwarka' },
      { name: 'Gurgaon', url: '/biology-classes-gurgaon' },
      { name: 'Ashok Vihar', url: '/biology-classes-ashok-vihar' },
    ],
    relatedCities: [
      { name: 'NEET Coaching Delhi', url: '/neet-coaching-delhi' },
      { name: 'Biology Classes Gurgaon', url: '/biology-classes-gurgaon' },
      { name: 'NEET Coaching Ghaziabad', url: '/neet-coaching-ghaziabad' },
    ],
    faqs: [
      {
        question: 'Which Cerebrum center should Presidium students choose?',
        answer:
          'Presidium has branches across Delhi NCR. Based on your branch location, we recommend: Rohini center for North Delhi, Gurgaon Sector 51 for Haryana, South Extension/Green Park for South Delhi. Contact us for personalized guidance.',
      },
      {
        question: 'What are the batch timings for Presidium students?',
        answer:
          'We offer flexible after-school batches starting at 4:30 PM and 6:00 PM. Weekend batches on Saturday and Sunday provide intensive preparation without conflicting with school hours.',
      },
      {
        question: 'How does coaching integrate with Presidium curriculum?',
        answer:
          'Presidium follows comprehensive CBSE curriculum with strong emphasis on concepts. Our NEET coaching builds on this foundation, adding competitive strategies and NEET-specific techniques for exam success.',
      },
      {
        question: 'What success have Presidium students achieved at Cerebrum?',
        answer:
          'Presidium students have consistently performed well at Cerebrum. Our 15+ years of experience, 1,50,000+ students taught, 65+ AIIMS selections, and 98% success rate demonstrate our proven excellence.',
      },
    ],
    stats: {
      studentsFromCity: '1,50,000+',
      successRate: '98%',
      rating: '4.9',
    },
    geoCoordinates: {
      lat: '28.7041',
      lng: '77.1025',
    },
  },

  'biology-classes-bal-bharati-students': {
    slug: 'biology-classes-bal-bharati-students',
    cityName: 'Bal Bharati Students',
    stateName: 'Delhi',
    metaTitle: 'Biology Classes for Bal Bharati Students | NEET Coaching',
    metaDescription:
      'NEET biology coaching for Bal Bharati Public School students. Multiple Delhi centers, after-school batches. 15+ years experience. Call 88264-44334.',
    heroTitle: 'Biology Classes for Bal Bharati Students',
    heroSubtitle:
      'Expert NEET coaching for Bal Bharati students across Delhi. Choose from our strategically located centers.',
    hasOfflineCenter: true,
    nearestCenter: {
      name: 'Multiple Centers',
      address: 'Rohini, South Extension, Green Park, Gurgaon',
      distance: 'Centers near all Bal Bharati branches',
    },
    localities: [
      { name: 'Pitampura', url: '/biology-classes-pitampura' },
      { name: 'Rohini', url: '/biology-classes-rohini' },
      { name: 'Gangaram Hospital', url: '/biology-classes-rajinder-nagar' },
      { name: 'Brij Vihar Gurgaon', url: '/biology-classes-gurgaon' },
    ],
    relatedCities: [
      { name: 'NEET Coaching Delhi', url: '/neet-coaching-delhi' },
      { name: 'Biology Classes Delhi', url: '/biology-classes-delhi' },
      { name: 'NEET Coaching Pitampura', url: '/neet-coaching-pitampura' },
    ],
    faqs: [
      {
        question: 'Which center is best for my Bal Bharati branch?',
        answer:
          'Bal Bharati has multiple branches across Delhi. Our Rohini center serves North Delhi branches (Pitampura, Rohini), South Extension/Green Park for Central/South Delhi, and Gurgaon for Brij Vihar. We help you choose the most convenient option.',
      },
      {
        question: 'What timings are available for Bal Bharati students?',
        answer:
          'We offer after-school batches at 4:30 PM and 6:00 PM, perfectly suited for Bal Bharati schedules. Weekend intensive batches on Saturday and Sunday are also available for comprehensive preparation.',
      },
      {
        question: 'How does NEET coaching complement Bal Bharati studies?',
        answer:
          'Bal Bharati provides strong CBSE foundation with excellent teaching. Our NEET coaching enhances this by focusing on competitive exam techniques, time management, and NEET-specific problem-solving strategies.',
      },
      {
        question: 'What results have Bal Bharati students achieved?',
        answer:
          'Bal Bharati students have excelled at Cerebrum Biology Academy. Our 15+ years of experience with 1,50,000+ students, 65+ AIIMS selections, and 98% success rate demonstrate consistent excellence across all schools.',
      },
    ],
    stats: {
      studentsFromCity: '1,50,000+',
      successRate: '98%',
      rating: '4.9',
    },
    geoCoordinates: {
      lat: '28.6893',
      lng: '77.1389',
    },
  },

  'biology-coaching-cbse-students': {
    slug: 'biology-coaching-cbse-students',
    cityName: 'Delhi NCR',
    stateName: 'Delhi',
    metaTitle: 'Biology Coaching for CBSE Students | Class 11 & 12 | Cerebrum Academy',
    metaDescription:
      'Expert biology coaching for CBSE students Class 11 & 12. Board exam + NEET preparation. 15+ years experience, 1,50,000+ students coached. Call 88264-44334!',
    heroTitle: 'Biology Coaching for CBSE Students',
    heroSubtitle:
      'Perfect blend of Board exam excellence and NEET preparation. CBSE-aligned curriculum with competitive exam focus for Classes 11 & 12.',
    hasOfflineCenter: true,
    nearestCenter: {
      name: 'Multiple Centers',
      address: 'Rohini, Gurugram, South Extension, Green Park',
      distance: 'All 4 Centers Available',
    },
    localities: [
      { name: 'Rohini Center', url: '/neet-coaching-rohini' },
      { name: 'Gurugram Center', url: '/neet-coaching-gurgaon' },
      { name: 'South Extension', url: '/neet-coaching-south-delhi' },
      { name: 'Green Park', url: '/biology-classes-south-delhi' },
    ],
    relatedCities: [
      { name: 'NEET Coaching Delhi', url: '/neet-coaching-delhi' },
      { name: 'Biology Classes Class 11', url: '/biology-classes-class-11' },
      { name: 'Biology Classes Class 12', url: '/biology-classes-class-12' },
    ],
    faqs: [
      {
        question: 'How is biology coaching for CBSE students different from regular tuition?',
        answer:
          'Our CBSE biology coaching goes beyond regular tuition. We align with CBSE syllabus while building strong fundamentals for NEET. You master board exam patterns plus competitive exam techniques - getting the best of both worlds.',
      },
      {
        question: 'Can CBSE students prepare for both boards and NEET together?',
        answer:
          'Absolutely! 98% of our CBSE students excel in both. Our curriculum is CBSE-aligned, so board preparation happens naturally. We add NEET-specific problem-solving, speed techniques, and competitive strategies on top of strong board foundation.',
      },
      {
        question: 'What results do CBSE students achieve at Cerebrum?',
        answer:
          'CBSE students at Cerebrum consistently score 95%+ in boards while securing 550+ in NEET biology. With 15+ years experience coaching 1,50,000+ students including 65+ AIIMS selections, we have proven expertise in dual preparation.',
      },
      {
        question: 'Do you follow NCERT for CBSE students?',
        answer:
          'Yes! NCERT is our foundation. Dr. Shekhar C Singh ensures every NCERT line is thoroughly covered. We then enhance it with additional NEET questions, clinical examples, and competitive exam techniques - all building on solid NCERT base.',
      },
    ],
    stats: {
      studentsFromCity: '1,50,000+',
      successRate: '98%',
      rating: '4.9',
    },
    geoCoordinates: {
      lat: '28.6139',
      lng: '77.2090',
    },
  },

  'neet-coaching-with-school': {
    slug: 'neet-coaching-with-school',
    cityName: 'Delhi NCR',
    stateName: 'Delhi',
    metaTitle: 'NEET Coaching with School | Balance Studies | Cerebrum Academy',
    metaDescription:
      'Perfect NEET coaching alongside school. Flexible batches for Class 11 & 12. 98% success rate balancing board exams + NEET. Call 88264-44334 for schedule!',
    heroTitle: 'NEET Coaching with School',
    heroSubtitle:
      'Balance school, boards, and NEET preparation perfectly. Evening and weekend batches designed for busy school students.',
    hasOfflineCenter: true,
    nearestCenter: {
      name: 'Multiple Centers',
      address: 'Rohini, Gurugram, South Extension, Green Park',
      distance: 'All 4 Centers Available',
    },
    localities: [
      { name: 'After School Batches Rohini', url: '/neet-coaching-rohini' },
      { name: 'Evening Classes Gurgaon', url: '/neet-coaching-gurgaon' },
      { name: 'Weekend Batches South Delhi', url: '/neet-coaching-south-delhi' },
      { name: 'Flexible Timings Green Park', url: '/biology-classes-south-delhi' },
    ],
    relatedCities: [
      { name: 'NEET Coaching Delhi', url: '/neet-coaching-delhi' },
      { name: 'Biology Coaching CBSE', url: '/biology-coaching-cbse-students' },
      { name: 'NEET Weekend Batches', url: '/neet-weekend-batch' },
    ],
    faqs: [
      {
        question: 'Can I really prepare for NEET while attending regular school?',
        answer:
          'Absolutely! 98% of our students attend regular school alongside NEET coaching. We offer 4:30 PM and 6:00 PM after-school batches, plus intensive weekend classes. Our smart time management techniques help you excel in both board exams and NEET.',
      },
      {
        question: 'How much time should I dedicate to NEET coaching alongside school?',
        answer:
          'We recommend 2-3 hours daily at our coaching center plus 1-2 hours self-study. Our after-school batches (4:30 or 6:00 PM) fit perfectly with school schedules. Weekend batches provide additional practice. Quality matters more than quantity.',
      },
      {
        question: 'Will NEET coaching affect my school performance?',
        answer:
          'No! In fact, it improves school performance. Our NEET coaching strengthens biology fundamentals, helping you score better in school exams. Students typically see 10-15% improvement in biology marks after joining our program.',
      },
      {
        question: 'What batch timings work best with school?',
        answer:
          'Our 4:30 PM batch suits students finishing school by 3:30 PM. The 6:00 PM batch works for those with extended school hours. Weekend batches (Saturday/Sunday) provide comprehensive coverage. We have flexible options across all 4 centers.',
      },
    ],
    stats: {
      studentsFromCity: '1,50,000+',
      successRate: '98%',
      rating: '4.9',
    },
    geoCoordinates: {
      lat: '28.6139',
      lng: '77.2090',
    },
  },

  'how-to-score-360-neet-biology': {
    slug: 'how-to-score-360-neet-biology',
    cityName: 'Delhi NCR',
    stateName: 'Delhi',
    metaTitle: 'How to Score 360 in NEET Biology | Full Marks Strategy | Cerebrum',
    metaDescription:
      'Proven strategy to score 360/360 in NEET Biology. 65+ AIIMS selections. Expert tips, study plan, practice tests. 15+ years coaching experience. Call 88264-44334!',
    heroTitle: 'How to Score 360/360 in NEET Biology',
    heroSubtitle:
      "Learn the exact strategy our 65+ AIIMS selections used. Master every question type with Dr. Shekhar C Singh's proven full-marks blueprint.",
    hasOfflineCenter: true,
    nearestCenter: {
      name: 'Multiple Centers',
      address: 'Rohini, Gurugram, South Extension, Green Park',
      distance: 'All 4 Centers Available',
    },
    localities: [
      { name: 'Full Marks Coaching Rohini', url: '/neet-coaching-rohini' },
      { name: 'Perfect Score Program Gurgaon', url: '/neet-coaching-gurgaon' },
      { name: '360 Strategy South Delhi', url: '/neet-coaching-south-delhi' },
      { name: 'Biology Excellence Green Park', url: '/biology-classes-south-delhi' },
    ],
    relatedCities: [
      { name: 'NEET Coaching Delhi', url: '/neet-coaching-delhi' },
      { name: 'NEET Biology Classes', url: '/neet-biology-classes' },
      { name: 'AIIMS Coaching', url: '/aiims-coaching-delhi' },
    ],
    faqs: [
      {
        question: 'Is scoring 360/360 in NEET Biology really possible?',
        answer:
          "Yes! While challenging, it's absolutely achievable. Our 65+ AIIMS selections prove it. The key is NCERT mastery (100%), understanding every diagram, memorizing exceptions, and solving 5,000+ MCQs with zero-error accuracy. We provide the exact roadmap.",
      },
      {
        question: 'What is the strategy to score full marks in NEET Biology?',
        answer:
          'Our proven 360-strategy: (1) Master NCERT line-by-line including footnotes, (2) Solve all NCERT examples and exercises, (3) Practice 5,000+ previous year questions, (4) Focus on high-weightage topics, (5) Master diagrams and exceptions, (6) Take 50+ full-length tests with zero-error target.',
      },
      {
        question: 'How long does it take to reach 360 level in Biology?',
        answer:
          'With focused preparation, 12-18 months is realistic for most students. Starting in Class 11 gives you ample time. Our structured program progressively builds from 240 → 300 → 340 → 360. Consistent daily practice of 3-4 hours is essential.',
      },
      {
        question: 'What resources are needed for scoring 360 in NEET Biology?',
        answer:
          'NCERT Class 11 & 12 (mandatory), our comprehensive notes covering every exception, 5,000+ quality MCQs, previous 15 years NEET papers, visual diagram atlas, and most importantly - expert guidance to avoid mistakes. Dr. Shekhar provides all these at Cerebrum.',
      },
    ],
    stats: {
      studentsFromCity: '1,50,000+',
      successRate: '98%',
      rating: '4.9',
    },
    geoCoordinates: {
      lat: '28.6139',
      lng: '77.2090',
    },
  },

  'is-coaching-necessary-for-neet': {
    slug: 'is-coaching-necessary-for-neet',
    cityName: 'Delhi NCR',
    stateName: 'Delhi',
    metaTitle: 'Is Coaching Necessary for NEET? | Expert Analysis | Cerebrum Academy',
    metaDescription:
      'Honest analysis: Is NEET coaching necessary? Compare self-study vs coaching. Success rates, benefits, alternatives. 15+ years experience, 1,50,000+ students. Call 88264-44334!',
    heroTitle: 'Is Coaching Necessary for NEET?',
    heroSubtitle:
      'Honest, data-backed answer from 15+ years of coaching 1,50,000+ students. Understand when coaching helps and when self-study works.',
    hasOfflineCenter: true,
    nearestCenter: {
      name: 'Multiple Centers',
      address: 'Rohini, Gurugram, South Extension, Green Park',
      distance: 'All 4 Centers Available',
    },
    localities: [
      { name: 'NEET Coaching Rohini', url: '/neet-coaching-rohini' },
      { name: 'NEET Coaching Gurgaon', url: '/neet-coaching-gurgaon' },
      { name: 'NEET Coaching South Delhi', url: '/neet-coaching-south-delhi' },
      { name: 'Free Demo Classes', url: '/free-demo' },
    ],
    relatedCities: [
      { name: 'NEET Coaching Delhi', url: '/neet-coaching-delhi' },
      { name: 'Online NEET Coaching', url: '/online-neet-coaching' },
      { name: 'NEET Self Study Tips', url: '/neet-self-study-tips' },
    ],
    faqs: [
      {
        question: 'Can I crack NEET without coaching through self-study?',
        answer:
          'Technically yes, but statistically difficult. Only 3-5% of self-study students crack NEET with competitive ranks. 95% of AIIMS/top medical college students had coaching. Quality coaching provides structured preparation, expert guidance, regular tests, peer competition, and most importantly - saves 6-12 months of trial-and-error.',
      },
      {
        question: 'What are the main benefits of NEET coaching over self-study?',
        answer:
          'Coaching provides: (1) Expert guidance to avoid common mistakes, (2) Structured study plan covering entire syllabus systematically, (3) Regular tests and performance analysis, (4) Doubt resolution from experienced faculty, (5) Peer learning and healthy competition, (6) Time management and exam strategies, (7) Updated study material and question banks.',
      },
      {
        question: 'Is online coaching as effective as offline coaching for NEET?',
        answer:
          'Online coaching can be equally effective if you have strong self-discipline. At Cerebrum, our online students score similarly to offline (98% success rate both modes). However, offline provides better peer interaction, immediate doubt resolution, and structured environment - beneficial for students needing extra motivation.',
      },
      {
        question: 'How do I choose the right NEET coaching institute?',
        answer:
          'Look for: (1) Experienced faculty (15+ years like Dr. Shekhar), (2) Proven results (65+ AIIMS like Cerebrum), (3) Small batch sizes for personal attention, (4) Quality study material aligned with NCERT, (5) Regular test series, (6) Good student reviews, (7) Convenient location and timings. Take a free demo class before deciding.',
      },
    ],
    stats: {
      studentsFromCity: '1,50,000+',
      successRate: '98%',
      rating: '4.9',
    },
    geoCoordinates: {
      lat: '28.6139',
      lng: '77.2090',
    },
  },

  'online-vs-offline-neet-coaching': {
    slug: 'online-vs-offline-neet-coaching',
    cityName: 'Delhi NCR',
    stateName: 'Delhi',
    metaTitle: 'Online vs Offline NEET Coaching | Which is Better? | Cerebrum Academy',
    metaDescription:
      'Compare online vs offline NEET coaching. Pros, cons, success rates, costs. Both options available with AIIMS faculty. 15+ years experience. Call 88264-44334!',
    heroTitle: 'Online vs Offline NEET Coaching',
    heroSubtitle:
      'Honest comparison based on 15+ years coaching 1,50,000+ students in both modes. Find which format suits your learning style best.',
    hasOfflineCenter: true,
    nearestCenter: {
      name: 'Multiple Centers',
      address: 'Rohini, Gurugram, South Extension, Green Park',
      distance: 'All 4 Centers Available + Online',
    },
    localities: [
      { name: 'Offline Coaching Rohini', url: '/neet-coaching-rohini' },
      { name: 'Offline Coaching Gurgaon', url: '/neet-coaching-gurgaon' },
      { name: 'Online NEET Classes', url: '/online-neet-coaching' },
      { name: 'Hybrid Mode Available', url: '/neet-hybrid-coaching' },
    ],
    relatedCities: [
      { name: 'NEET Coaching Delhi', url: '/neet-coaching-delhi' },
      { name: 'Online NEET Coaching', url: '/online-neet-coaching' },
      { name: 'Live Biology Classes', url: '/live-biology-classes-neet' },
    ],
    faqs: [
      {
        question: 'Which is more effective - online or offline NEET coaching?',
        answer:
          'Both are equally effective at Cerebrum - our 98% success rate is identical for online and offline students. Offline works better if you need structured environment, peer interaction, and immediate doubt resolution. Online suits self-disciplined students who value flexibility, save travel time, and can focus independently. Your learning style matters more than the mode.',
      },
      {
        question: 'What are the main advantages of online NEET coaching?',
        answer:
          'Online coaching offers: (1) Zero travel time saves 2-3 hours daily, (2) Learn from anywhere - ideal for students outside Delhi NCR, (3) Recorded lectures for revision, (4) Lower fees (₹10,000-15,000 less), (5) Comfortable home environment, (6) Access to best faculty regardless of location. Perfect for focused, self-motivated students.',
      },
      {
        question: 'What are the benefits of offline NEET coaching over online?',
        answer:
          'Offline coaching provides: (1) Face-to-face interaction with faculty, (2) Immediate doubt clearing during class, (3) Peer learning and healthy competition, (4) Structured routine and environment, (5) Better for hands-on practice and diagrams, (6) Reduced digital fatigue, (7) Stronger accountability. Best for students who thrive in classroom setting.',
      },
      {
        question: 'Can I switch between online and offline modes at Cerebrum?',
        answer:
          'Yes! We offer hybrid flexibility. Many students attend offline classes at our Rohini, Gurugram, South Extension, or Green Park centers when convenient, and join online when traveling or during exam season. This best-of-both approach is popular among our students.',
      },
    ],
    stats: {
      studentsFromCity: '1,50,000+',
      successRate: '98%',
      rating: '4.9',
    },
    geoCoordinates: {
      lat: '28.6139',
      lng: '77.2090',
    },
  },

  'affordable-neet-coaching-delhi': {
    slug: 'affordable-neet-coaching-delhi',
    cityName: 'Delhi',
    stateName: 'Delhi',
    metaTitle:
      'Affordable NEET Coaching Delhi | Budget-Friendly Biology Classes | Cerebrum Academy',
    metaDescription:
      'Find the most affordable NEET coaching in Delhi without compromising quality. AIIMS faculty at budget-friendly fees. 4 centers across Delhi. EMI options available. Call 88264-44334!',
    heroTitle: 'Affordable NEET Coaching in Delhi',
    heroSubtitle:
      'Quality NEET preparation at budget-friendly fees. AIIMS-trained faculty, proven results, flexible payment options including EMI.',
    hasOfflineCenter: true,
    nearestCenter: {
      name: 'Multiple Centers Across Delhi',
      address: 'Rohini (DC Chauk), South Extension, Green Park - Choose your nearest center',
      distance: '4 centers across Delhi',
    },
    localities: [
      { name: 'Rohini', url: '/biology-classes-rohini' },
      { name: 'South Delhi', url: '/neet-coaching-south-delhi' },
      { name: 'Green Park', url: '/biology-classes-green-park' },
      { name: 'South Extension', url: '/biology-classes-south-extension' },
    ],
    relatedCities: [
      { name: 'NEET Coaching Delhi', url: '/neet-coaching-delhi' },
      { name: 'Biology Classes Delhi', url: '/biology-classes-delhi' },
      { name: 'NEET Coaching Gurgaon', url: '/neet-coaching-gurgaon' },
      { name: 'Online NEET Coaching', url: '/online-neet-coaching' },
    ],
    faqs: [
      {
        question: 'What makes Cerebrum the most affordable NEET coaching in Delhi?',
        answer:
          'We offer competitive fees (₹35,000-60,000/year) without compromising on quality. You get AIIMS-trained faculty (Dr. Shekhar C Singh with 15+ years experience), comprehensive study material, test series, and doubt support - all at budget-friendly prices. We also offer EMI options and sibling discounts.',
      },
      {
        question: 'Are there any hidden charges in the fees?',
        answer:
          'No hidden charges! Our fees include live classes, comprehensive study material, chapter-wise tests, full-length mock tests, doubt clearing sessions, and online resources. Exam fees and books are separate as per actual cost.',
      },
      {
        question: 'Do you offer EMI or installment options?',
        answer:
          'Yes! We offer flexible EMI options starting from ₹5,000/month. You can pay in quarterly installments as well. We believe financial constraints should not stop deserving students from quality education. Call 88264-44334 for payment plans.',
      },
      {
        question: 'Is affordable coaching as good as expensive institutes?',
        answer:
          'Absolutely! Our 1,50,000+ successful students and 65+ AIIMS selections prove that quality education does not need to be expensive. Dr. Shekhar C Singh personally teaches, ensuring the same quality as premium institutes at affordable fees.',
      },
      {
        question: 'Are there any scholarships or discounts available?',
        answer:
          'Yes! We offer merit-based scholarships for top scorers, sibling discounts, early bird discounts, and group enrollment benefits. Call 88264-44334 to know about current scholarship opportunities.',
      },
    ],
    stats: {
      studentsFromCity: '1,50,000+',
      successRate: '98%',
      rating: '4.9',
    },
    geoCoordinates: {
      lat: '28.6139',
      lng: '77.2090',
    },
  },

  'neet-coaching-with-hostel-delhi': {
    slug: 'neet-coaching-with-hostel-delhi',
    cityName: 'Delhi',
    stateName: 'Delhi',
    metaTitle: 'NEET Coaching with Hostel Delhi | Residential NEET Preparation | Cerebrum Academy',
    metaDescription:
      'NEET coaching with nearby hostel facilities in Delhi. Safe PG accommodations near all 4 centers - Rohini, Gurugram, South Extension, Green Park. Call 88264-44334 for hostel assistance!',
    heroTitle: 'NEET Coaching with Hostel Facilities in Delhi',
    heroSubtitle:
      'Focus completely on NEET preparation. Quality coaching with safe, affordable hostel options near all our centers.',
    hasOfflineCenter: true,
    nearestCenter: {
      name: 'Multiple Centers with Hostel Assistance',
      address: 'Rohini, Gurugram, South Extension, Green Park - Safe PG options near all centers',
      distance: 'Hostel assistance available',
    },
    localities: [
      { name: 'Rohini PG Options', url: '/affordable-neet-coaching-delhi' },
      { name: 'Gurugram Hostels', url: '/neet-coaching-gurgaon' },
      { name: 'South Delhi PGs', url: '/neet-coaching-south-delhi' },
      { name: 'Green Park Area', url: '/biology-classes-green-park' },
    ],
    relatedCities: [
      { name: 'NEET Coaching Delhi', url: '/neet-coaching-delhi' },
      { name: 'NEET Droppers Batch', url: '/neet-droppers-batch-gurgaon' },
      { name: 'Biology Classes Gurgaon', url: '/biology-classes-gurgaon' },
    ],
    faqs: [
      {
        question: 'Do you provide hostel facilities for NEET students?',
        answer:
          'While we do not run our own hostel, we help students find safe, verified PG accommodations near all 4 centers (Rohini, Gurugram, South Extension, Green Park). We have tie-ups with several hostels offering secure, affordable stays. Call 88264-44334 for hostel assistance.',
      },
      {
        question: 'What is the cost of hostel/PG near your centers?',
        answer:
          'PG costs range from ₹6,000-12,000/month depending on location and facilities (AC/non-AC, single/sharing). We help you find options matching your budget. Most PGs include food, WiFi, and laundry facilities.',
      },
      {
        question: 'Is it safe for girls to stay in hostels near your centers?',
        answer:
          'Yes! We only recommend verified, safe PG accommodations. All our partner hostels have 24/7 security, CCTV surveillance, and strict entry protocols. Many girls from other cities stay safely and focus on their NEET preparation.',
      },
      {
        question: 'How far are hostels from your coaching centers?',
        answer:
          'We help arrange accommodation within 1-3 km of our centers. Students can easily walk or take a short metro ride. This saves commute time and allows more study hours.',
      },
      {
        question: 'What facilities do the recommended hostels provide?',
        answer:
          'Our recommended PGs offer: 3 meals/day, high-speed WiFi, study tables, AC rooms, laundry service, 24/7 security, purified water, and power backup. Some also have study rooms and libraries.',
      },
    ],
    stats: {
      studentsFromCity: '1,50,000+',
      successRate: '98%',
      rating: '4.9',
    },
    geoCoordinates: {
      lat: '28.6139',
      lng: '77.2090',
    },
  },

  'one-to-one-biology-coaching': {
    slug: 'one-to-one-biology-coaching',
    cityName: 'Delhi NCR',
    stateName: 'Delhi',
    metaTitle: '1 to 1 Biology Coaching NEET | Personal Biology Tutor | Cerebrum Academy',
    metaDescription:
      'Premium 1-on-1 biology coaching for NEET with Dr. Shekhar C Singh. Personalized attention, customized study plans, flexible timings. Online & offline options. Call 88264-44334!',
    heroTitle: '1-to-1 Personal Biology Coaching for NEET',
    heroSubtitle:
      'Get undivided attention from Dr. Shekhar C Singh (AIIMS New Delhi). Customized study plans, flexible schedules, guaranteed score improvement.',
    hasOfflineCenter: true,
    nearestCenter: {
      name: 'Personal Coaching at All Centers',
      address: 'Available at Rohini, Gurugram, South Extension, Green Park + Online',
      distance: 'Choose your preferred location',
    },
    localities: [
      { name: 'Online 1-on-1', url: '/online-neet-coaching' },
      { name: 'Rohini Center', url: '/biology-classes-rohini' },
      { name: 'Gurgaon Center', url: '/neet-coaching-gurgaon' },
      { name: 'South Delhi', url: '/neet-coaching-south-delhi' },
    ],
    relatedCities: [
      { name: 'Biology Coaching', url: '/biology-coaching' },
      { name: 'NEET Coaching', url: '/neet-coaching-delhi' },
      { name: 'Online Biology Classes', url: '/online-biology-classes' },
      { name: 'NEET Preparation', url: '/neet-preparation' },
    ],
    faqs: [
      {
        question: 'What are the benefits of 1-on-1 biology coaching for NEET?',
        answer:
          'Personal coaching offers: 100% customized study plan based on your strengths/weaknesses, flexible timing that fits your schedule, immediate doubt resolution, faster concept clarity, focused attention on your problem areas, and higher score improvement. Students typically show 80-100 marks improvement in biology.',
      },
      {
        question: 'Who teaches in the 1-to-1 sessions?',
        answer:
          "Dr. Shekhar C Singh (AIIMS New Delhi alumnus) personally conducts 1-on-1 sessions. With 15+ years of experience and 65+ AIIMS selections, he provides expert guidance tailored to each student's needs.",
      },
      {
        question: 'What is the fee for personal 1-on-1 coaching?',
        answer:
          'Our 1-on-1 coaching fees depend on duration and frequency. Options include: Weekly sessions (₹15,000/month), Bi-weekly intensive (₹25,000/month), Daily coaching for droppers (₹45,000/month). All include personalized study material and test analysis. Call 88264-44334 for detailed packages.',
      },
      {
        question: 'Can I take 1-on-1 classes online?',
        answer:
          'Yes! Online 1-on-1 sessions are highly effective. You get live video sessions with screen sharing, digital whiteboard, recorded classes for revision, and 24/7 WhatsApp doubt support - same quality as offline personal coaching.',
      },
      {
        question: 'How flexible are the timings for personal coaching?',
        answer:
          'Completely flexible! We schedule sessions based on your availability - early morning, evening, weekends, or late night. Perfect for school students, droppers, and working professionals preparing for NEET.',
      },
    ],
    stats: {
      studentsFromCity: '1,50,000+',
      successRate: '98%',
      rating: '4.9',
    },
    geoCoordinates: {
      lat: '28.6139',
      lng: '77.2090',
    },
  },

  'neet-coaching-working-students': {
    slug: 'neet-coaching-working-students',
    cityName: 'Delhi NCR',
    stateName: 'Delhi',
    metaTitle: 'NEET Coaching for Working Students | Flexible Timing Classes | Cerebrum Academy',
    metaDescription:
      'NEET coaching designed for working professionals & job holders. Weekend batches, evening classes, online options. Balance work & NEET prep. Call 88264-44334!',
    heroTitle: 'NEET Coaching for Working Students & Professionals',
    heroSubtitle:
      'Pursue your medical dream while working. Flexible weekend batches, evening classes, and online options designed for job holders.',
    hasOfflineCenter: true,
    nearestCenter: {
      name: 'Weekend & Evening Batches',
      address: 'Available at all 4 centers: Rohini, Gurugram, South Extension, Green Park',
      distance: 'Flexible timing options',
    },
    localities: [
      { name: 'Weekend Batches', url: '/neet-biology-weekend-batch' },
      { name: 'Online Evening Classes', url: '/online-neet-coaching' },
      { name: 'Gurgaon Weekend', url: '/neet-coaching-gurgaon' },
      { name: 'South Delhi Weekend', url: '/neet-coaching-south-delhi' },
    ],
    relatedCities: [
      { name: 'Online NEET Coaching', url: '/online-neet-coaching' },
      { name: 'NEET Coaching Delhi', url: '/neet-coaching-delhi' },
      { name: 'NEET Preparation', url: '/neet-preparation' },
      { name: 'NEET Droppers', url: '/neet-droppers-batch-gurgaon' },
    ],
    faqs: [
      {
        question: 'Can working professionals prepare for NEET while doing a job?',
        answer:
          'Yes! Many of our students work full-time and successfully prepare for NEET. Our weekend batches (Sat-Sun 9 AM-6 PM) and evening classes (Mon-Fri 7-10 PM) are designed for working professionals. With dedicated 15-20 hours/week, you can definitely crack NEET.',
      },
      {
        question: 'What batch timings are available for working students?',
        answer:
          'We offer: Weekend batches (Saturday-Sunday 9 AM-6 PM with breaks), Evening batches (Monday-Friday 7-10 PM), Online flexible batches (watch recorded lectures anytime), and Hybrid options (mix of weekend offline + weekday online). Call 88264-44334 to choose your schedule.',
      },
      {
        question: 'How long does it take to prepare for NEET while working?',
        answer:
          'For working professionals, we recommend 12-18 months of preparation with consistent 15-20 hours/week study. Our accelerated weekend program covers the full NEET syllabus efficiently. Many working students have successfully qualified in their first attempt.',
      },
      {
        question: 'Do you provide recorded lectures for missed classes?',
        answer:
          'Yes! All our classes are recorded. If you miss a weekend or evening session due to work commitments, you can access the recording within 24 hours. This ensures you never fall behind in your preparation.',
      },
      {
        question: 'What is different about your program for working students?',
        answer:
          'Our program offers: Condensed weekend sessions covering weekly syllabus, self-study material for weekday revision, recorded lectures for flexible learning, late evening doubt sessions via WhatsApp, monthly tests on Sundays, and personalized study plans considering your work schedule.',
      },
    ],
    stats: {
      studentsFromCity: '1,50,000+',
      successRate: '98%',
      rating: '4.9',
    },
    geoCoordinates: {
      lat: '28.6139',
      lng: '77.2090',
    },
  },

  'neet-dropper-crash-course-2027': {
    slug: 'neet-dropper-crash-course-2027',
    cityName: 'Delhi NCR',
    stateName: 'Delhi',
    metaTitle: 'NEET Dropper Crash Course 2027 | Intensive 3-6 Month Program | Cerebrum Academy',
    metaDescription:
      'Last-minute NEET 2027 crash course for droppers. Intensive 3-6 month program with rapid revision, daily tests, weak topic focus. 4 centers in Delhi. Call 88264-44334!',
    heroTitle: 'NEET 2027 Crash Course for Droppers',
    heroSubtitle:
      'Make every remaining day count! Intensive 3-6 month program with rapid revision, daily practice tests, and focused weak topic coaching.',
    hasOfflineCenter: true,
    nearestCenter: {
      name: 'Crash Course at All Centers',
      address: 'Rohini, Gurugram, South Extension, Green Park - 4 intensive batches',
      distance: 'Multiple time slots available',
    },
    localities: [
      { name: 'Rohini Crash Course', url: '/biology-classes-rohini' },
      { name: 'Gurgaon Intensive', url: '/neet-droppers-batch-gurgaon' },
      { name: 'South Delhi Crash', url: '/neet-coaching-south-delhi' },
      { name: 'Online Crash Course', url: '/online-neet-coaching' },
    ],
    relatedCities: [
      { name: 'NEET Droppers Batch', url: '/neet-droppers-batch-gurgaon' },
      { name: 'NEET 2027 Preparation', url: '/neet-2027-preparation' },
      { name: 'NEET Biology Crash Course', url: '/neet-biology-crash-course' },
      { name: 'NEET Repeaters', url: '/neet-repeaters' },
    ],
    faqs: [
      {
        question: 'Is a 3-6 month crash course enough for NEET droppers?',
        answer:
          'Yes, if you have basic foundation from your previous attempt! Our crash course focuses on: Rapid revision of full syllabus, Daily practice of 200+ questions, Identifying and strengthening weak topics, PYQ pattern analysis, and 50+ full-length mock tests. Droppers who have studied before can effectively utilize this intensive program.',
      },
      {
        question: 'What makes this crash course different from regular coaching?',
        answer:
          'Our crash course is super intensive: 8-10 hours daily classes (Mon-Sat), 3 full syllabus revisions in 6 months, Daily chapter tests + weekly mock tests, Exclusive focus on high-weightage topics (80% syllabus gives 95% marks), Personal improvement tracker, and Psychological counseling for exam stress.',
      },
      {
        question: 'Can I realistically improve my score in just 3-6 months?',
        answer:
          'Absolutely! Our crash course students show average improvements of 80-120 marks. We have had students jump from 450 to 580+ in just 4 months. The key is intensive daily practice, weak topic focus, and expert guidance from Dr. Shekhar C Singh.',
      },
      {
        question: 'What is the daily schedule for the crash course?',
        answer:
          'Our intensive schedule: 9 AM-1 PM: Rapid concept revision (2 chapters/day), 1-2 PM: Lunch break, 2-5 PM: Practice session (150-200 MCQs), 5-6 PM: Doubt clearing, 6-7 PM: Test (50 questions), Evening: Self-study with provided material. Sunday: Full-length 3-hour mock test.',
      },
      {
        question: 'When do the crash course batches start?',
        answer:
          'We run crash courses throughout the year with different durations: 6-month batch (Dec-May), 4-month batch (Feb-May), 3-month batch (Mar-May). New batches start every month. With NEET 2027 in May, join immediately to maximize preparation time. Call 88264-44334 for next batch dates.',
      },
    ],
    stats: {
      studentsFromCity: '1,50,000+',
      successRate: '98%',
      rating: '4.9',
    },
    geoCoordinates: {
      lat: '28.6139',
      lng: '77.2090',
    },
  },

  // Missing entries - Noida areas
  'noida-sector-137': {
    slug: 'noida-sector-137',
    cityName: 'Noida Sector 137',
    stateName: 'Uttar Pradesh',
    metaTitle: 'Biology Classes in Noida Sector 137 | NEET Coaching | Cerebrum Academy',
    metaDescription:
      'Best biology classes for Noida Sector 137. Online & offline options. AIIMS faculty, 98% success rate. Call for NEET preparation!',
    heroTitle: 'Biology Classes in Noida Sector 137',
    heroSubtitle:
      'Top-rated NEET biology coaching for Noida Sector 137 students. Join online classes or visit our Delhi centers.',
    hasOfflineCenter: false,
    nearestCenter: {
      name: 'South Delhi Center',
      address: 'Block D, South Extension Part 2, New Delhi 110049',
      distance: '35 km from Noida Sector 137',
    },
    localities: [
      { name: 'Sector 62', url: '/biology-classes-noida/sector-62' },
      { name: 'Greater Noida', url: '/biology-classes-greater-noida' },
      { name: 'Noida', url: '/biology-classes-noida' },
    ],
    relatedCities: [
      { name: 'Noida', url: '/biology-classes-noida' },
      { name: 'Greater Noida', url: '/biology-classes-greater-noida' },
      { name: 'Ghaziabad', url: '/biology-classes-ghaziabad' },
    ],
    faqs: [
      {
        question: 'Which is the best biology coaching for Noida Sector 137 students?',
        answer:
          'Cerebrum Biology Academy offers excellent online classes for Noida Sector 137 students with AIIMS-trained faculty and 98% success rate. Students can also attend our South Delhi center.',
      },
      {
        question: 'Do you have an offline center near Noida Sector 137?',
        answer:
          'We offer live online classes for Noida Sector 137 students. Our nearest offline center is in South Extension, Delhi (35 km away). Many students prefer our hybrid mode.',
      },
      {
        question: 'What is the fee for biology classes for Noida Sector 137 students?',
        answer:
          'Online biology coaching fees range from ₹35,000 to ₹60,000 per year. This includes live classes, study material, test series, and doubt support.',
      },
      {
        question: 'How do online classes work for Noida Sector 137 students?',
        answer:
          'Our online classes are live and interactive with real-time faculty interaction, instant doubt resolution, and comprehensive study material delivered to your location.',
      },
    ],
    stats: {
      studentsFromCity: '25+',
      successRate: '98%',
      rating: '4.8',
    },
    geoCoordinates: {
      lat: '28.4952',
      lng: '77.4064',
    },
  },

  'noida-sector-62': {
    slug: 'noida-sector-62',
    cityName: 'Noida Sector 62',
    stateName: 'Uttar Pradesh',
    metaTitle: 'Biology Classes in Noida Sector 62 | NEET Coaching | Cerebrum Academy',
    metaDescription:
      'Best biology classes for Noida Sector 62. Online & offline options. AIIMS faculty, 98% success rate. Call for NEET preparation!',
    heroTitle: 'Biology Classes in Noida Sector 62',
    heroSubtitle:
      'Top-rated NEET biology coaching for Noida Sector 62 students. Join online classes or visit our Delhi centers.',
    hasOfflineCenter: false,
    nearestCenter: {
      name: 'South Delhi Center',
      address: 'Block D, South Extension Part 2, New Delhi 110049',
      distance: '25 km from Noida Sector 62',
    },
    localities: [
      { name: 'Sector 18', url: '/biology-classes-noida/sector-18' },
      { name: 'Sector 137', url: '/biology-classes-noida-sector-137' },
      { name: 'Noida', url: '/biology-classes-noida' },
    ],
    relatedCities: [
      { name: 'Noida', url: '/biology-classes-noida' },
      { name: 'Ghaziabad', url: '/biology-classes-ghaziabad' },
      { name: 'Indirapuram', url: '/biology-classes-indirapuram' },
    ],
    faqs: [
      {
        question: 'Which is the best biology coaching for Noida Sector 62 students?',
        answer:
          'Cerebrum Biology Academy offers excellent online classes for Noida Sector 62 students with AIIMS-trained faculty and 98% success rate.',
      },
      {
        question: 'Do you have an offline center near Noida Sector 62?',
        answer:
          'We offer live online classes for Noida Sector 62 students. Our nearest offline center is in South Extension, Delhi (25 km away).',
      },
      {
        question: 'What is the fee for biology classes for Noida Sector 62 students?',
        answer:
          'Online biology coaching fees range from ₹35,000 to ₹60,000 per year. This includes live classes, study material, and test series.',
      },
      {
        question: 'How do I join biology classes from Noida Sector 62?',
        answer:
          'You can book a free demo class online or call us. We offer flexible batch timings for Noida students.',
      },
    ],
    stats: {
      studentsFromCity: '45+',
      successRate: '98%',
      rating: '4.8',
    },
    geoCoordinates: {
      lat: '28.6271',
      lng: '77.3734',
    },
  },

  'greater-noida': {
    slug: 'greater-noida',
    cityName: 'Greater Noida',
    stateName: 'Uttar Pradesh',
    metaTitle: 'Biology Classes in Greater Noida | Best NEET Biology Coaching | Cerebrum Academy',
    metaDescription:
      'Best biology classes in Greater Noida for NEET & Board preparation. AIIMS-trained faculty, 98% success rate. Online & hybrid classes available. Book free demo!',
    heroTitle: 'Best Biology Classes in Greater Noida',
    heroSubtitle:
      'Top-rated NEET biology coaching for Greater Noida students. Online + hybrid classes with AIIMS faculty and proven 98% success rate.',
    hasOfflineCenter: false,
    nearestCenter: {
      name: 'Sector 62 Noida Center',
      address: 'B-45, Sector 62, Noida, UP 201301',
      distance: '15-20 km from Greater Noida via Aqua Line Metro',
    },
    localities: [
      { name: 'Gaur City', url: '/biology-classes-greater-noida/gaur-city' },
      { name: 'Knowledge Park', url: '/biology-classes-greater-noida/knowledge-park' },
      { name: 'Pari Chowk', url: '/biology-classes-greater-noida/pari-chowk' },
      { name: 'Jaypee Greens', url: '/biology-classes-greater-noida/jaypee-greens' },
      { name: 'Alpha Sectors', url: '/biology-classes-greater-noida/alpha' },
      { name: 'Beta Sectors', url: '/biology-classes-greater-noida/beta' },
    ],
    relatedCities: [
      { name: 'Noida', url: '/biology-classes-noida' },
      { name: 'Greater Noida West', url: '/biology-classes-greater-noida-west' },
      { name: 'Ghaziabad', url: '/biology-classes-ghaziabad' },
      { name: 'Delhi', url: '/biology-classes-delhi' },
    ],
    faqs: [
      {
        question: 'Which is the best biology coaching in Greater Noida for NEET?',
        answer:
          'Cerebrum Biology Academy is the top-rated biology coaching for Greater Noida students. We offer live online classes from home and hybrid mode (online + weekend offline at Sector 62, Noida center). Our AIIMS-trained faculty and 98% success rate make us the preferred choice for Greater Noida NEET aspirants.',
      },
      {
        question: 'Do you have an offline center in Greater Noida?',
        answer:
          'Our nearest offline center is at B-45, Sector 62, Noida (15-20 km from Greater Noida). Students can reach it via Aqua Line Metro to Noida, then Blue Line to Sector 62 Metro Station. Most Greater Noida students prefer our online or hybrid mode to avoid daily commute.',
      },
      {
        question: 'What is the fee for biology classes for Greater Noida students?',
        answer:
          'Our biology coaching fees for Greater Noida students range from ₹35,000 to ₹60,000 per year for online classes. This includes live classes, study material, test series, and WhatsApp doubt support. Offline hybrid mode at our Noida center is also available.',
      },
      {
        question: 'How do online biology classes work for Greater Noida students?',
        answer:
          'Our online classes are live and interactive — not recorded videos. You get real-time interaction with faculty, instant doubt resolution via WhatsApp, and the same study material as offline students. Classes run on weekday evenings and weekend batches to fit school schedules.',
      },
    ],
    stats: {
      studentsFromCity: '400+',
      successRate: '98%',
      rating: '4.9',
    },
    geoCoordinates: {
      lat: '28.4744',
      lng: '77.5040',
    },
    localContext: {
      nearbyLandmarks:
        'Serving students across Greater Noida — Gaur City, Knowledge Park, Pari Chowk, Jaypee Greens, Alpha, Beta, Delta sectors.',
      transportOptions:
        'Aqua Line Metro connects Greater Noida to Noida City Centre, then Blue Line to Sector 62 Metro Station (15-20 min). Online classes available for all Greater Noida students — zero commute.',
    },
    areaSpecificContent: {
      whyThisArea:
        'Greater Noida has 400+ NEET aspirants but very few dedicated Biology coaching options. Most students either commute long distances to Noida/Delhi or settle for coaching that covers all subjects superficially. Our live online classes bring AIIMS-faculty teaching directly to Greater Noida homes, saving 1-2 hours of daily commute. Students can also attend our Sector 62 Noida center on weekends via the Aqua Line Metro for practical sessions and mock tests.',
    },
    studentSuccessStory: {
      name: 'Priya S.',
      area: 'Knowledge Park, Greater Noida',
      achievement: 'NEET 2025 — 615/720, KGMC Lucknow',
      quote:
        'Attending online classes from home in Greater Noida was a game-changer. I saved 2 hours of daily commute and used that time for revision. The faculty quality was far better than local coaching institutes.',
    },
  },

  'greater-noida-west': {
    slug: 'greater-noida-west',
    cityName: 'Greater Noida West',
    stateName: 'Uttar Pradesh',
    metaTitle: 'NEET Coaching in Greater Noida West | Biology Classes | Cerebrum Academy',
    metaDescription:
      'Best NEET coaching for Greater Noida West. Online classes with AIIMS faculty, 98% success rate. Book free demo!',
    heroTitle: 'NEET Coaching in Greater Noida West',
    heroSubtitle:
      'Top-rated biology coaching for Greater Noida West students. Live online classes with proven results.',
    hasOfflineCenter: false,
    nearestCenter: {
      name: 'South Delhi Center',
      address: 'Block D, South Extension Part 2, New Delhi 110049',
      distance: '40 km from Greater Noida West',
    },
    localities: [
      { name: 'Noida Extension', url: '/biology-classes-noida/noida-extension' },
      { name: 'Noida', url: '/biology-classes-noida' },
      { name: 'Greater Noida', url: '/biology-classes-greater-noida' },
    ],
    relatedCities: [
      { name: 'Noida', url: '/biology-classes-noida' },
      { name: 'Greater Noida', url: '/biology-classes-greater-noida' },
      { name: 'Ghaziabad', url: '/biology-classes-ghaziabad' },
    ],
    faqs: [
      {
        question: 'Which is the best NEET coaching for Greater Noida West students?',
        answer:
          'Cerebrum Biology Academy provides excellent online NEET coaching for Greater Noida West students with AIIMS-trained faculty and comprehensive study material.',
      },
      {
        question: 'Do you have an offline center in Greater Noida West?',
        answer:
          'Currently, we offer live online classes for Greater Noida West students. Our nearest offline center is in South Delhi.',
      },
      {
        question: 'What is the fee for NEET coaching for Greater Noida West students?',
        answer:
          'NEET coaching fees range from ₹35,000 to ₹60,000 per year for online classes, including all study material and test series.',
      },
      {
        question: 'How effective are online classes for NEET preparation?',
        answer:
          'Our online classes are live and interactive with real-time doubt resolution. We have achieved 98% success rate with online students.',
      },
    ],
    stats: {
      studentsFromCity: '30+',
      successRate: '98%',
      rating: '4.8',
    },
    geoCoordinates: {
      lat: '28.6139',
      lng: '77.4380',
    },
  },

  // Ghaziabad areas
  'vaishali-ghaziabad': {
    slug: 'vaishali-ghaziabad',
    cityName: 'Vaishali Ghaziabad',
    stateName: 'Uttar Pradesh',
    metaTitle: 'NEET Coaching in Vaishali Ghaziabad | Biology Classes | Cerebrum Academy',
    metaDescription:
      'Best NEET coaching in Vaishali Ghaziabad. Online & offline options. AIIMS faculty, 98% success rate. Book free demo!',
    heroTitle: 'NEET Coaching in Vaishali Ghaziabad',
    heroSubtitle:
      'Top-rated biology coaching for Vaishali students. Join online or visit our Delhi centers.',
    hasOfflineCenter: false,
    nearestCenter: {
      name: 'South Delhi Center',
      address: 'Block D, South Extension Part 2, New Delhi 110049',
      distance: '20 km from Vaishali',
    },
    localities: [
      { name: 'Vasundhara', url: '/neet-coaching-vasundhara-ghaziabad' },
      { name: 'Kaushambi', url: '/neet-coaching-kaushambi' },
      { name: 'Indirapuram', url: '/biology-classes-indirapuram' },
    ],
    relatedCities: [
      { name: 'Ghaziabad', url: '/biology-classes-ghaziabad' },
      { name: 'Noida', url: '/biology-classes-noida' },
      { name: 'Delhi', url: '/biology-classes-delhi' },
    ],
    faqs: [
      {
        question: 'Which is the best NEET coaching in Vaishali Ghaziabad?',
        answer:
          'Cerebrum Biology Academy offers excellent NEET coaching for Vaishali students with AIIMS-trained faculty and 98% success rate.',
      },
      {
        question: 'How far is the nearest offline center from Vaishali?',
        answer:
          'Our South Delhi center is about 20 km from Vaishali. We also offer live online classes for convenience.',
      },
      {
        question: 'What is the fee for NEET coaching for Vaishali students?',
        answer:
          'NEET coaching fees range from ₹35,000 to ₹75,000 per year depending on online or offline mode.',
      },
      {
        question: 'Do you have students from Vaishali?',
        answer:
          'Yes, we have 60+ students from Vaishali who attend both online and offline classes with excellent results.',
      },
    ],
    stats: {
      studentsFromCity: '60+',
      successRate: '98%',
      rating: '4.9',
    },
    geoCoordinates: {
      lat: '28.6509',
      lng: '77.3409',
    },
  },

  'vasundhara-ghaziabad': {
    slug: 'vasundhara-ghaziabad',
    cityName: 'Vasundhara Ghaziabad',
    stateName: 'Uttar Pradesh',
    metaTitle: 'NEET Coaching in Vasundhara Ghaziabad | Biology Classes | Cerebrum Academy',
    metaDescription:
      'Best NEET coaching in Vasundhara Ghaziabad. Online & offline options. AIIMS faculty, 98% success rate. Book free demo!',
    heroTitle: 'NEET Coaching in Vasundhara Ghaziabad',
    heroSubtitle:
      'Top-rated biology coaching for Vasundhara students. Join online or visit our Delhi centers.',
    hasOfflineCenter: false,
    nearestCenter: {
      name: 'South Delhi Center',
      address: 'Block D, South Extension Part 2, New Delhi 110049',
      distance: '18 km from Vasundhara',
    },
    localities: [
      { name: 'Vaishali', url: '/neet-coaching-vaishali-ghaziabad' },
      { name: 'Kaushambi', url: '/neet-coaching-kaushambi' },
      { name: 'Indirapuram', url: '/biology-classes-indirapuram' },
    ],
    relatedCities: [
      { name: 'Ghaziabad', url: '/biology-classes-ghaziabad' },
      { name: 'Noida', url: '/biology-classes-noida' },
      { name: 'Delhi', url: '/biology-classes-delhi' },
    ],
    faqs: [
      {
        question: 'Which is the best NEET coaching in Vasundhara Ghaziabad?',
        answer:
          'Cerebrum Biology Academy offers excellent NEET coaching for Vasundhara students with AIIMS-trained faculty and comprehensive study material.',
      },
      {
        question: 'How far is the nearest offline center from Vasundhara?',
        answer:
          'Our South Delhi center is about 18 km from Vasundhara via NH9. We also offer convenient live online classes.',
      },
      {
        question: 'What is the fee for NEET coaching for Vasundhara students?',
        answer: 'NEET coaching fees range from ₹35,000 to ₹75,000 per year. EMI options available.',
      },
      {
        question: 'Do you have students from Vasundhara?',
        answer:
          'Yes, we have 55+ students from Vasundhara attending both online and offline classes with 98% success rate.',
      },
    ],
    stats: {
      studentsFromCity: '55+',
      successRate: '98%',
      rating: '4.9',
    },
    geoCoordinates: {
      lat: '28.6692',
      lng: '77.3389',
    },
  },

  kaushambi: {
    slug: 'kaushambi',
    cityName: 'Kaushambi',
    stateName: 'Uttar Pradesh',
    metaTitle: 'NEET Coaching in Kaushambi | Biology Classes Ghaziabad | Cerebrum Academy',
    metaDescription:
      'Best NEET coaching in Kaushambi. Online & offline options. AIIMS faculty, 98% success rate. Book free demo!',
    heroTitle: 'NEET Coaching in Kaushambi',
    heroSubtitle:
      'Top-rated biology coaching for Kaushambi students. Join online or visit our Delhi centers.',
    hasOfflineCenter: false,
    nearestCenter: {
      name: 'South Delhi Center',
      address: 'Block D, South Extension Part 2, New Delhi 110049',
      distance: '15 km from Kaushambi',
    },
    localities: [
      { name: 'Vaishali', url: '/neet-coaching-vaishali-ghaziabad' },
      { name: 'Vasundhara', url: '/neet-coaching-vasundhara-ghaziabad' },
      { name: 'Indirapuram', url: '/biology-classes-indirapuram' },
    ],
    relatedCities: [
      { name: 'Ghaziabad', url: '/biology-classes-ghaziabad' },
      { name: 'Noida', url: '/biology-classes-noida' },
      { name: 'Delhi', url: '/biology-classes-delhi' },
    ],
    faqs: [
      {
        question: 'Which is the best NEET coaching in Kaushambi?',
        answer:
          'Cerebrum Biology Academy offers excellent NEET coaching for Kaushambi students with AIIMS-trained faculty and 98% success rate.',
      },
      {
        question: 'How far is the nearest offline center from Kaushambi?',
        answer:
          'Our South Delhi center is about 15 km from Kaushambi Metro Station via Anand Vihar. We also offer live online classes.',
      },
      {
        question: 'What is the fee for NEET coaching for Kaushambi students?',
        answer:
          'NEET coaching fees range from ₹35,000 to ₹75,000 per year depending on mode of study.',
      },
      {
        question: 'Do you provide study material for Kaushambi students?',
        answer:
          'Yes, all students receive comprehensive NCERT-focused study material, test series, and practice questions delivered to their location.',
      },
    ],
    stats: {
      studentsFromCity: '50+',
      successRate: '98%',
      rating: '4.9',
    },
    geoCoordinates: {
      lat: '28.6432',
      lng: '77.3192',
    },
  },

  // Delhi West areas
  'punjabi-bagh': {
    slug: 'punjabi-bagh',
    cityName: 'Punjabi Bagh',
    stateName: 'Delhi',
    metaTitle: 'Biology Classes in Punjabi Bagh | NEET Coaching Delhi | Cerebrum Academy',
    metaDescription:
      'Best biology classes in Punjabi Bagh. Online & offline options. AIIMS faculty, 98% success rate. Call 88264-44334!',
    heroTitle: 'Biology Classes in Punjabi Bagh',
    heroSubtitle:
      'Top-rated NEET biology coaching for Punjabi Bagh students. Join online or visit our Rohini center.',
    hasOfflineCenter: false,
    nearestCenter: {
      name: 'Rohini Center',
      address: 'DC Chauk, Sector 9, Rohini, New Delhi 110085',
      distance: '12 km from Punjabi Bagh',
    },
    localities: [
      { name: 'Paschim Vihar', url: '/neet-coaching-paschim-vihar' },
      { name: 'Rajouri Garden', url: '/neet-coaching-rajouri-garden' },
      { name: 'Patel Nagar', url: '/biology-classes-patel-nagar' },
    ],
    relatedCities: [
      { name: 'Rohini', url: '/biology-classes-rohini' },
      { name: 'Pitampura', url: '/biology-classes-pitampura' },
      { name: 'Delhi', url: '/biology-classes-delhi' },
    ],
    faqs: [
      {
        question: 'Which is the best biology coaching in Punjabi Bagh?',
        answer:
          'Cerebrum Biology Academy offers excellent biology coaching for Punjabi Bagh students with AIIMS-trained faculty and 98% success rate.',
      },
      {
        question: 'How far is the nearest center from Punjabi Bagh?',
        answer:
          'Our Rohini center is about 12 km from Punjabi Bagh. We also offer live online classes for convenience.',
      },
      {
        question: 'What is the fee for biology classes for Punjabi Bagh students?',
        answer:
          'Biology coaching fees range from ₹35,000 to ₹75,000 per year depending on online or offline mode.',
      },
      {
        question: 'Do you have students from Punjabi Bagh?',
        answer:
          'Yes, we have 40+ students from Punjabi Bagh attending both online and offline classes with excellent results.',
      },
    ],
    stats: {
      studentsFromCity: '40+',
      successRate: '98%',
      rating: '4.9',
    },
    geoCoordinates: {
      lat: '28.6692',
      lng: '77.1310',
    },
  },

  'paschim-vihar': {
    slug: 'paschim-vihar',
    cityName: 'Paschim Vihar',
    stateName: 'Delhi',
    metaTitle: 'NEET Coaching in Paschim Vihar | Biology Classes Delhi | Cerebrum Academy',
    metaDescription:
      'Best NEET coaching in Paschim Vihar. Online & offline options. AIIMS faculty, 98% success rate. Call 88264-44334!',
    heroTitle: 'NEET Coaching in Paschim Vihar',
    heroSubtitle:
      'Top-rated biology coaching for Paschim Vihar students. Join online or visit our Rohini center.',
    hasOfflineCenter: false,
    nearestCenter: {
      name: 'Rohini Center',
      address: 'DC Chauk, Sector 9, Rohini, New Delhi 110085',
      distance: '10 km from Paschim Vihar',
    },
    localities: [
      { name: 'Punjabi Bagh', url: '/biology-classes-punjabi-bagh' },
      { name: 'Rajouri Garden', url: '/neet-coaching-rajouri-garden' },
      { name: 'Pitampura', url: '/biology-classes-pitampura' },
    ],
    relatedCities: [
      { name: 'Rohini', url: '/biology-classes-rohini' },
      { name: 'Pitampura', url: '/biology-classes-pitampura' },
      { name: 'Delhi', url: '/biology-classes-delhi' },
    ],
    faqs: [
      {
        question: 'Which is the best NEET coaching in Paschim Vihar?',
        answer:
          'Cerebrum Biology Academy offers excellent NEET coaching for Paschim Vihar students with AIIMS-trained faculty and proven 98% success rate.',
      },
      {
        question: 'How far is the Rohini center from Paschim Vihar?',
        answer:
          'Our Rohini center is about 10 km from Paschim Vihar, easily accessible via metro or road. We also offer live online classes.',
      },
      {
        question: 'What is the fee for NEET coaching for Paschim Vihar students?',
        answer: 'NEET coaching fees range from ₹35,000 to ₹75,000 per year. EMI options available.',
      },
      {
        question: 'Do you have students from Paschim Vihar?',
        answer:
          'Yes, we have 45+ students from Paschim Vihar with excellent results in NEET examinations.',
      },
    ],
    stats: {
      studentsFromCity: '45+',
      successRate: '98%',
      rating: '4.9',
    },
    geoCoordinates: {
      lat: '28.6704',
      lng: '77.1025',
    },
  },

  'rajouri-garden': {
    slug: 'rajouri-garden',
    cityName: 'Rajouri Garden',
    stateName: 'Delhi',
    metaTitle: 'NEET Coaching in Rajouri Garden | Biology Classes Delhi | Cerebrum Academy',
    metaDescription:
      'Best NEET coaching in Rajouri Garden. Online & offline options. AIIMS faculty, 98% success rate. Call 88264-44334!',
    heroTitle: 'NEET Coaching in Rajouri Garden',
    heroSubtitle:
      'Top-rated biology coaching for Rajouri Garden students. Join online or visit our centers.',
    hasOfflineCenter: false,
    nearestCenter: {
      name: 'Rohini Center',
      address: 'DC Chauk, Sector 9, Rohini, New Delhi 110085',
      distance: '14 km from Rajouri Garden',
    },
    localities: [
      { name: 'Punjabi Bagh', url: '/biology-classes-punjabi-bagh' },
      { name: 'Paschim Vihar', url: '/neet-coaching-paschim-vihar' },
      { name: 'Patel Nagar', url: '/biology-classes-patel-nagar' },
    ],
    relatedCities: [
      { name: 'Rohini', url: '/biology-classes-rohini' },
      { name: 'Karol Bagh', url: '/biology-classes-karol-bagh' },
      { name: 'Delhi', url: '/biology-classes-delhi' },
    ],
    faqs: [
      {
        question: 'Which is the best NEET coaching in Rajouri Garden?',
        answer:
          'Cerebrum Biology Academy offers excellent NEET coaching for Rajouri Garden students with AIIMS-trained faculty and comprehensive study material.',
      },
      {
        question: 'How far is the nearest center from Rajouri Garden?',
        answer:
          'Our Rohini center is about 14 km from Rajouri Garden. We also offer convenient live online classes.',
      },
      {
        question: 'What is the fee for NEET coaching for Rajouri Garden students?',
        answer:
          'NEET coaching fees range from ₹35,000 to ₹75,000 per year depending on online or offline mode.',
      },
      {
        question: 'Do you have students from Rajouri Garden?',
        answer:
          'Yes, we have 35+ students from Rajouri Garden with excellent track record in NEET.',
      },
    ],
    stats: {
      studentsFromCity: '35+',
      successRate: '98%',
      rating: '4.8',
    },
    geoCoordinates: {
      lat: '28.6414',
      lng: '77.1214',
    },
  },

  'tilak-nagar': {
    slug: 'tilak-nagar',
    cityName: 'Tilak Nagar',
    stateName: 'Delhi',
    metaTitle: 'Biology Classes in Tilak Nagar | NEET Coaching Delhi | Cerebrum Academy',
    metaDescription:
      'Best biology classes in Tilak Nagar. Online & offline options. AIIMS faculty, 98% success rate. Call 88264-44334!',
    heroTitle: 'Biology Classes in Tilak Nagar',
    heroSubtitle:
      'Top-rated NEET biology coaching for Tilak Nagar students. Join online or visit our centers.',
    hasOfflineCenter: false,
    nearestCenter: {
      name: 'Green Park Center',
      address: 'Near Green Park Metro, New Delhi',
      distance: '15 km from Tilak Nagar',
    },
    localities: [
      { name: 'Janakpuri', url: '/biology-classes-delhi/janakpuri' },
      { name: 'Rajouri Garden', url: '/neet-coaching-rajouri-garden' },
      { name: 'Uttam Nagar', url: '/biology-classes-uttam-nagar' },
    ],
    relatedCities: [
      { name: 'Delhi', url: '/biology-classes-delhi' },
      { name: 'Dwarka', url: '/biology-classes-dwarka' },
      { name: 'Rohini', url: '/biology-classes-rohini' },
    ],
    faqs: [
      {
        question: 'Which is the best biology coaching in Tilak Nagar?',
        answer:
          'Cerebrum Biology Academy offers excellent biology coaching for Tilak Nagar students with AIIMS-trained faculty and 98% success rate.',
      },
      {
        question: 'How far is the nearest center from Tilak Nagar?',
        answer:
          'Our Green Park center is about 15 km from Tilak Nagar. We also offer live online classes for convenience.',
      },
      {
        question: 'What is the fee for biology classes for Tilak Nagar students?',
        answer:
          'Biology coaching fees range from ₹35,000 to ₹75,000 per year depending on mode of study.',
      },
      {
        question: 'Do you have students from Tilak Nagar?',
        answer:
          'Yes, we have 30+ students from Tilak Nagar attending both online and offline classes successfully.',
      },
    ],
    stats: {
      studentsFromCity: '30+',
      successRate: '98%',
      rating: '4.8',
    },
    geoCoordinates: {
      lat: '28.6414',
      lng: '77.0933',
    },
  },

  // East Delhi area
  'nirman-vihar': {
    slug: 'nirman-vihar',
    cityName: 'Nirman Vihar',
    stateName: 'Delhi',
    metaTitle: 'NEET Coaching in Nirman Vihar | Biology Classes Delhi | Cerebrum Academy',
    metaDescription:
      'Best NEET coaching in Nirman Vihar. Online & offline options. AIIMS faculty, 98% success rate. Call 88264-44334!',
    heroTitle: 'NEET Coaching in Nirman Vihar',
    heroSubtitle:
      'Top-rated biology coaching for Nirman Vihar students. Join online or visit our Delhi centers.',
    hasOfflineCenter: false,
    nearestCenter: {
      name: 'South Delhi Center',
      address: 'Block D, South Extension Part 2, New Delhi 110049',
      distance: '18 km from Nirman Vihar',
    },
    localities: [
      { name: 'Preet Vihar', url: '/biology-classes-preet-vihar' },
      { name: 'Laxmi Nagar', url: '/biology-classes-laxmi-nagar' },
      { name: 'Mayur Vihar', url: '/biology-classes-mayur-vihar' },
    ],
    relatedCities: [
      { name: 'Delhi', url: '/biology-classes-delhi' },
      { name: 'Noida', url: '/biology-classes-noida' },
      { name: 'Ghaziabad', url: '/biology-classes-ghaziabad' },
    ],
    faqs: [
      {
        question: 'Which is the best NEET coaching in Nirman Vihar?',
        answer:
          'Cerebrum Biology Academy offers excellent NEET coaching for Nirman Vihar students with AIIMS-trained faculty and comprehensive study material.',
      },
      {
        question: 'How far is the nearest center from Nirman Vihar?',
        answer:
          'Our South Delhi center is about 18 km from Nirman Vihar. We also offer convenient live online classes.',
      },
      {
        question: 'What is the fee for NEET coaching for Nirman Vihar students?',
        answer: 'NEET coaching fees range from ₹35,000 to ₹75,000 per year. EMI options available.',
      },
      {
        question: 'Do you have students from Nirman Vihar?',
        answer:
          'Yes, we have 35+ students from Nirman Vihar with excellent results in NEET examinations.',
      },
    ],
    stats: {
      studentsFromCity: '35+',
      successRate: '98%',
      rating: '4.8',
    },
    geoCoordinates: {
      lat: '28.6352',
      lng: '77.2952',
    },
  },

  // Rohini Sectors
  'dc-chowk-rohini': {
    slug: 'dc-chowk-rohini',
    cityName: 'DC Chowk Rohini',
    stateName: 'Delhi',
    metaTitle: 'NEET Coaching at DC Chowk Rohini | Biology Center Sector 9 | Cerebrum Academy',
    metaDescription:
      'Best NEET coaching at DC Chowk Rohini center. AIIMS faculty, 98% success rate. Walk-in at Sector 9! Call 88264-44334',
    heroTitle: 'NEET Coaching at DC Chowk Rohini',
    heroSubtitle:
      'Visit our flagship Rohini center at DC Chowk, Sector 9. Premium NEET coaching with AIIMS-trained faculty.',
    hasOfflineCenter: true,
    nearestCenter: {
      name: 'Rohini Center',
      address: 'DC Chauk, Sector 9, Rohini, New Delhi 110085',
      distance: 'In DC Chowk',
    },
    localities: [
      { name: 'Sector 9', url: '/biology-classes-rohini' },
      { name: 'Sector 3', url: '/neet-coaching-rohini-sector-3' },
      { name: 'Sector 5', url: '/neet-coaching-rohini-sector-5' },
    ],
    relatedCities: [
      { name: 'Rohini', url: '/biology-classes-rohini' },
      { name: 'Pitampura', url: '/biology-classes-pitampura' },
      { name: 'Delhi', url: '/biology-classes-delhi' },
    ],
    faqs: [
      {
        question: 'Where is the DC Chowk Rohini center located?',
        answer:
          'Our Rohini center is located at DC Chauk, Sector 9, Rohini, New Delhi 110085. It is easily accessible from all Rohini sectors.',
      },
      {
        question: 'What courses are available at DC Chowk center?',
        answer:
          'We offer biology classes for Class 11, Class 12, and NEET Dropper batch at our Rohini center with AIIMS-trained faculty.',
      },
      {
        question: 'What are the batch timings at DC Chowk Rohini?',
        answer:
          'Morning batches (8-10 AM), afternoon batches (2-4 PM), and evening batches (6-8 PM) are available. Weekend batches also offered.',
      },
      {
        question: 'What is the fee at DC Chowk Rohini center?',
        answer:
          'Biology coaching fees range from ₹45,000 to ₹75,000 per year. This includes all study material and test series.',
      },
    ],
    stats: {
      studentsFromCity: '300+',
      successRate: '98%',
      rating: '4.9',
    },
    geoCoordinates: {
      lat: '28.7416',
      lng: '77.1025',
    },
  },

  'rohini-west': {
    slug: 'rohini-west',
    cityName: 'Rohini West',
    stateName: 'Delhi',
    metaTitle: 'Biology Tuition in Rohini West | NEET Coaching Delhi | Cerebrum Academy',
    metaDescription:
      'Best biology tuition in Rohini West. Center at DC Chowk Sector 9. AIIMS faculty, 98% success rate. Call 88264-44334!',
    heroTitle: 'Biology Tuition in Rohini West',
    heroSubtitle:
      'Top-rated NEET coaching for Rohini West students. Visit our DC Chowk center in Sector 9.',
    hasOfflineCenter: true,
    nearestCenter: {
      name: 'Rohini Center',
      address: 'DC Chauk, Sector 9, Rohini, New Delhi 110085',
      distance: '2 km from Rohini West',
    },
    localities: [
      { name: 'Sector 9', url: '/biology-classes-rohini' },
      { name: 'Sector 16', url: '/biology-classes-rohini-sector-16' },
      { name: 'Sector 24', url: '/biology-classes-rohini-sector-24' },
    ],
    relatedCities: [
      { name: 'Rohini', url: '/biology-classes-rohini' },
      { name: 'Pitampura', url: '/biology-classes-pitampura' },
      { name: 'Shalimar Bagh', url: '/biology-classes-shalimar-bagh' },
    ],
    faqs: [
      {
        question: 'Which is the best biology tuition in Rohini West?',
        answer:
          'Cerebrum Biology Academy at DC Chowk is the best choice for Rohini West students with AIIMS faculty and 98% success rate.',
      },
      {
        question: 'How far is the center from Rohini West?',
        answer:
          'Our DC Chowk center is just 2 km from Rohini West, easily accessible by metro or road.',
      },
      {
        question: 'What is the fee for biology tuition in Rohini West?',
        answer:
          'Biology tuition fees range from ₹45,000 to ₹75,000 per year with EMI options available.',
      },
      {
        question: 'Do you have students from Rohini West?',
        answer: 'Yes, we have 80+ students from Rohini West with excellent NEET results.',
      },
    ],
    stats: {
      studentsFromCity: '80+',
      successRate: '98%',
      rating: '4.9',
    },
    geoCoordinates: {
      lat: '28.7296',
      lng: '77.0844',
    },
  },

  'rohini-sector-3': {
    slug: 'rohini-sector-3',
    cityName: 'Rohini Sector 3',
    stateName: 'Delhi',
    metaTitle: 'NEET Coaching in Rohini Sector 3 | Biology Center | Cerebrum Academy',
    metaDescription:
      'Best NEET coaching for Rohini Sector 3. Center at DC Chowk. AIIMS faculty, 98% success. Call 88264-44334!',
    heroTitle: 'NEET Coaching in Rohini Sector 3',
    heroSubtitle:
      'Top-rated biology coaching for Sector 3 students. Visit our nearby DC Chowk center.',
    hasOfflineCenter: true,
    nearestCenter: {
      name: 'Rohini Center',
      address: 'DC Chauk, Sector 9, Rohini, New Delhi 110085',
      distance: '2 km from Sector 3',
    },
    localities: [
      { name: 'Sector 9', url: '/biology-classes-rohini' },
      { name: 'Sector 5', url: '/neet-coaching-rohini-sector-5' },
      { name: 'Sector 7', url: '/neet-coaching-rohini-sector-7' },
    ],
    relatedCities: [
      { name: 'Rohini', url: '/biology-classes-rohini' },
      { name: 'Pitampura', url: '/biology-classes-pitampura' },
      { name: 'Delhi', url: '/biology-classes-delhi' },
    ],
    faqs: [
      {
        question: 'Which is the best NEET coaching in Rohini Sector 3?',
        answer:
          'Cerebrum Biology Academy at DC Chowk is ideal for Sector 3 students, just 2 km away with AIIMS faculty.',
      },
      {
        question: 'How do I reach the center from Sector 3?',
        answer:
          'The DC Chowk center is easily accessible from Sector 3 by metro or auto-rickshaw, just 5 minutes away.',
      },
      {
        question: 'What is the fee for NEET coaching for Sector 3 students?',
        answer: 'NEET coaching fees range from ₹45,000 to ₹75,000 per year. EMI options available.',
      },
      {
        question: 'Do you have students from Rohini Sector 3?',
        answer: 'Yes, we have 50+ students from Sector 3 with excellent track record.',
      },
    ],
    stats: {
      studentsFromCity: '50+',
      successRate: '98%',
      rating: '4.9',
    },
    geoCoordinates: {
      lat: '28.7205',
      lng: '77.1105',
    },
  },

  'rohini-sector-5': {
    slug: 'rohini-sector-5',
    cityName: 'Rohini Sector 5',
    stateName: 'Delhi',
    metaTitle: 'NEET Coaching in Rohini Sector 5 | Biology Center | Cerebrum Academy',
    metaDescription:
      'Best NEET coaching for Rohini Sector 5. Center at DC Chowk. AIIMS faculty, 98% success. Call 88264-44334!',
    heroTitle: 'NEET Coaching in Rohini Sector 5',
    heroSubtitle: 'Top-rated biology coaching for Sector 5 students. Visit our DC Chowk center.',
    hasOfflineCenter: true,
    nearestCenter: {
      name: 'Rohini Center',
      address: 'DC Chauk, Sector 9, Rohini, New Delhi 110085',
      distance: '1.5 km from Sector 5',
    },
    localities: [
      { name: 'Sector 9', url: '/biology-classes-rohini' },
      { name: 'Sector 3', url: '/neet-coaching-rohini-sector-3' },
      { name: 'Sector 7', url: '/neet-coaching-rohini-sector-7' },
    ],
    relatedCities: [
      { name: 'Rohini', url: '/biology-classes-rohini' },
      { name: 'Pitampura', url: '/biology-classes-pitampura' },
      { name: 'Delhi', url: '/biology-classes-delhi' },
    ],
    faqs: [
      {
        question: 'Which is the best NEET coaching in Rohini Sector 5?',
        answer:
          'Cerebrum Biology Academy at DC Chowk is perfect for Sector 5 students, just 1.5 km away.',
      },
      {
        question: 'How do I reach the center from Sector 5?',
        answer: 'The DC Chowk center is very close to Sector 5, just 3 minutes by metro or auto.',
      },
      {
        question: 'What is the fee for NEET coaching for Sector 5 students?',
        answer: 'NEET coaching fees range from ₹45,000 to ₹75,000 per year.',
      },
      {
        question: 'Do you have students from Rohini Sector 5?',
        answer: 'Yes, we have 60+ students from Sector 5 attending our center daily.',
      },
    ],
    stats: {
      studentsFromCity: '60+',
      successRate: '98%',
      rating: '4.9',
    },
    geoCoordinates: {
      lat: '28.7285',
      lng: '77.1155',
    },
  },

  'rohini-sector-7': {
    slug: 'rohini-sector-7',
    cityName: 'Rohini Sector 7',
    stateName: 'Delhi',
    metaTitle: 'NEET Coaching in Rohini Sector 7 | Biology Center | Cerebrum Academy',
    metaDescription:
      'Best NEET coaching for Rohini Sector 7. Center at DC Chowk. AIIMS faculty, 98% success. Call 88264-44334!',
    heroTitle: 'NEET Coaching in Rohini Sector 7',
    heroSubtitle: 'Top-rated biology coaching for Sector 7 students. Visit our DC Chowk center.',
    hasOfflineCenter: true,
    nearestCenter: {
      name: 'Rohini Center',
      address: 'DC Chauk, Sector 9, Rohini, New Delhi 110085',
      distance: '1 km from Sector 7',
    },
    localities: [
      { name: 'Sector 9', url: '/biology-classes-rohini' },
      { name: 'Sector 5', url: '/neet-coaching-rohini-sector-5' },
      { name: 'Sector 8', url: '/neet-coaching-rohini-sector-8' },
    ],
    relatedCities: [
      { name: 'Rohini', url: '/biology-classes-rohini' },
      { name: 'Pitampura', url: '/biology-classes-pitampura' },
      { name: 'Delhi', url: '/biology-classes-delhi' },
    ],
    faqs: [
      {
        question: 'Which is the best NEET coaching in Rohini Sector 7?',
        answer:
          'Cerebrum Biology Academy at DC Chowk is ideal for Sector 7 students, just 1 km away.',
      },
      {
        question: 'How do I reach the center from Sector 7?',
        answer: 'The DC Chowk center is walking distance from Sector 7, just 2 minutes away.',
      },
      {
        question: 'What is the fee for NEET coaching for Sector 7 students?',
        answer: 'NEET coaching fees range from ₹45,000 to ₹75,000 per year.',
      },
      {
        question: 'Do you have students from Rohini Sector 7?',
        answer: 'Yes, we have 70+ students from Sector 7, many walk to our center daily.',
      },
    ],
    stats: {
      studentsFromCity: '70+',
      successRate: '98%',
      rating: '4.9',
    },
    geoCoordinates: {
      lat: '28.7335',
      lng: '77.1105',
    },
  },

  'rohini-sector-8': {
    slug: 'rohini-sector-8',
    cityName: 'Rohini Sector 8',
    stateName: 'Delhi',
    metaTitle: 'NEET Coaching in Rohini Sector 8 | Biology Center | Cerebrum Academy',
    metaDescription:
      'Best NEET coaching for Rohini Sector 8. Center at DC Chowk. AIIMS faculty, 98% success. Call 88264-44334!',
    heroTitle: 'NEET Coaching in Rohini Sector 8',
    heroSubtitle: 'Top-rated biology coaching for Sector 8 students. Visit our DC Chowk center.',
    hasOfflineCenter: true,
    nearestCenter: {
      name: 'Rohini Center',
      address: 'DC Chauk, Sector 9, Rohini, New Delhi 110085',
      distance: '500m from Sector 8',
    },
    localities: [
      { name: 'Sector 9', url: '/biology-classes-rohini' },
      { name: 'Sector 7', url: '/neet-coaching-rohini-sector-7' },
      { name: 'Sector 11', url: '/biology-classes-rohini-sector-11' },
    ],
    relatedCities: [
      { name: 'Rohini', url: '/biology-classes-rohini' },
      { name: 'Pitampura', url: '/biology-classes-pitampura' },
      { name: 'Delhi', url: '/biology-classes-delhi' },
    ],
    faqs: [
      {
        question: 'Which is the best NEET coaching in Rohini Sector 8?',
        answer:
          'Cerebrum Biology Academy at DC Chowk is perfect for Sector 8 students, just 500m away.',
      },
      {
        question: 'How do I reach the center from Sector 8?',
        answer: 'The DC Chowk center is very close to Sector 8, walking distance of 5 minutes.',
      },
      {
        question: 'What is the fee for NEET coaching for Sector 8 students?',
        answer: 'NEET coaching fees range from ₹45,000 to ₹75,000 per year.',
      },
      {
        question: 'Do you have students from Rohini Sector 8?',
        answer: 'Yes, we have 75+ students from Sector 8, most walk to our center.',
      },
    ],
    stats: {
      studentsFromCity: '75+',
      successRate: '98%',
      rating: '4.9',
    },
    geoCoordinates: {
      lat: '28.7365',
      lng: '77.1075',
    },
  },

  'rohini-sector-11': {
    slug: 'rohini-sector-11',
    cityName: 'Rohini Sector 11',
    stateName: 'Delhi',
    metaTitle: 'Biology Classes in Rohini Sector 11 | NEET Coaching | Cerebrum Academy',
    metaDescription:
      'Best biology classes for Rohini Sector 11. Center at DC Chowk. AIIMS faculty, 98% success. Call 88264-44334!',
    heroTitle: 'Biology Classes in Rohini Sector 11',
    heroSubtitle: 'Top-rated NEET coaching for Sector 11 students. Visit our DC Chowk center.',
    hasOfflineCenter: true,
    nearestCenter: {
      name: 'Rohini Center',
      address: 'DC Chauk, Sector 9, Rohini, New Delhi 110085',
      distance: '1.5 km from Sector 11',
    },
    localities: [
      { name: 'Sector 9', url: '/biology-classes-rohini' },
      { name: 'Sector 13', url: '/biology-classes-rohini-sector-13' },
      { name: 'Sector 8', url: '/neet-coaching-rohini-sector-8' },
    ],
    relatedCities: [
      { name: 'Rohini', url: '/biology-classes-rohini' },
      { name: 'Pitampura', url: '/biology-classes-pitampura' },
      { name: 'Delhi', url: '/biology-classes-delhi' },
    ],
    faqs: [
      {
        question: 'Which is the best biology coaching in Rohini Sector 11?',
        answer:
          'Cerebrum Biology Academy at DC Chowk is ideal for Sector 11 students, 1.5 km away.',
      },
      {
        question: 'How do I reach the center from Sector 11?',
        answer:
          'The DC Chowk center is easily accessible from Sector 11 by metro or auto, just 5 minutes.',
      },
      {
        question: 'What is the fee for biology classes for Sector 11 students?',
        answer: 'Biology coaching fees range from ₹45,000 to ₹75,000 per year.',
      },
      {
        question: 'Do you have students from Rohini Sector 11?',
        answer: 'Yes, we have 65+ students from Sector 11 with excellent results.',
      },
    ],
    stats: {
      studentsFromCity: '65+',
      successRate: '98%',
      rating: '4.9',
    },
    geoCoordinates: {
      lat: '28.7405',
      lng: '77.1155',
    },
  },

  'rohini-sector-13': {
    slug: 'rohini-sector-13',
    cityName: 'Rohini Sector 13',
    stateName: 'Delhi',
    metaTitle: 'Biology Classes in Rohini Sector 13 | NEET Coaching | Cerebrum Academy',
    metaDescription:
      'Best biology classes for Rohini Sector 13. Center at DC Chowk. AIIMS faculty, 98% success. Call 88264-44334!',
    heroTitle: 'Biology Classes in Rohini Sector 13',
    heroSubtitle: 'Top-rated NEET coaching for Sector 13 students. Visit our DC Chowk center.',
    hasOfflineCenter: true,
    nearestCenter: {
      name: 'Rohini Center',
      address: 'DC Chauk, Sector 9, Rohini, New Delhi 110085',
      distance: '2 km from Sector 13',
    },
    localities: [
      { name: 'Sector 9', url: '/biology-classes-rohini' },
      { name: 'Sector 11', url: '/biology-classes-rohini-sector-11' },
      { name: 'Sector 14', url: '/neet-coaching-rohini-sector-14' },
    ],
    relatedCities: [
      { name: 'Rohini', url: '/biology-classes-rohini' },
      { name: 'Pitampura', url: '/biology-classes-pitampura' },
      { name: 'Delhi', url: '/biology-classes-delhi' },
    ],
    faqs: [
      {
        question: 'Which is the best biology coaching in Rohini Sector 13?',
        answer:
          'Cerebrum Biology Academy at DC Chowk is perfect for Sector 13 students, just 2 km away.',
      },
      {
        question: 'How do I reach the center from Sector 13?',
        answer:
          'The DC Chowk center is easily accessible from Sector 13 by metro or auto, about 5 minutes.',
      },
      {
        question: 'What is the fee for biology classes for Sector 13 students?',
        answer: 'Biology coaching fees range from ₹45,000 to ₹75,000 per year.',
      },
      {
        question: 'Do you have students from Rohini Sector 13?',
        answer: 'Yes, we have 55+ students from Sector 13 with excellent NEET results.',
      },
    ],
    stats: {
      studentsFromCity: '55+',
      successRate: '98%',
      rating: '4.9',
    },
    geoCoordinates: {
      lat: '28.7445',
      lng: '77.1085',
    },
  },

  'rohini-sector-14': {
    slug: 'rohini-sector-14',
    cityName: 'Rohini Sector 14',
    stateName: 'Delhi',
    metaTitle: 'NEET Coaching in Rohini Sector 14 | Biology Center | Cerebrum Academy',
    metaDescription:
      'Best NEET coaching for Rohini Sector 14. Center at DC Chowk. AIIMS faculty, 98% success. Call 88264-44334!',
    heroTitle: 'NEET Coaching in Rohini Sector 14',
    heroSubtitle: 'Top-rated biology coaching for Sector 14 students. Visit our DC Chowk center.',
    hasOfflineCenter: true,
    nearestCenter: {
      name: 'Rohini Center',
      address: 'DC Chauk, Sector 9, Rohini, New Delhi 110085',
      distance: '2.5 km from Sector 14',
    },
    localities: [
      { name: 'Sector 9', url: '/biology-classes-rohini' },
      { name: 'Sector 13', url: '/biology-classes-rohini-sector-13' },
      { name: 'Sector 15', url: '/neet-coaching-rohini-sector-15' },
    ],
    relatedCities: [
      { name: 'Rohini', url: '/biology-classes-rohini' },
      { name: 'Pitampura', url: '/biology-classes-pitampura' },
      { name: 'Delhi', url: '/biology-classes-delhi' },
    ],
    faqs: [
      {
        question: 'Which is the best NEET coaching in Rohini Sector 14?',
        answer:
          'Cerebrum Biology Academy at DC Chowk is ideal for Sector 14 students, 2.5 km away.',
      },
      {
        question: 'How do I reach the center from Sector 14?',
        answer:
          'The DC Chowk center is accessible from Sector 14 by metro or auto, about 7 minutes.',
      },
      {
        question: 'What is the fee for NEET coaching for Sector 14 students?',
        answer: 'NEET coaching fees range from ₹45,000 to ₹75,000 per year.',
      },
      {
        question: 'Do you have students from Rohini Sector 14?',
        answer: 'Yes, we have 50+ students from Sector 14 with excellent track record.',
      },
    ],
    stats: {
      studentsFromCity: '50+',
      successRate: '98%',
      rating: '4.9',
    },
    geoCoordinates: {
      lat: '28.7485',
      lng: '77.1105',
    },
  },

  'rohini-sector-15': {
    slug: 'rohini-sector-15',
    cityName: 'Rohini Sector 15',
    stateName: 'Delhi',
    metaTitle: 'NEET Coaching in Rohini Sector 15 | Biology Center | Cerebrum Academy',
    metaDescription:
      'Best NEET coaching for Rohini Sector 15. Center at DC Chowk. AIIMS faculty, 98% success. Call 88264-44334!',
    heroTitle: 'NEET Coaching in Rohini Sector 15',
    heroSubtitle: 'Top-rated biology coaching for Sector 15 students. Visit our DC Chowk center.',
    hasOfflineCenter: true,
    nearestCenter: {
      name: 'Rohini Center',
      address: 'DC Chauk, Sector 9, Rohini, New Delhi 110085',
      distance: '3 km from Sector 15',
    },
    localities: [
      { name: 'Sector 9', url: '/biology-classes-rohini' },
      { name: 'Sector 14', url: '/neet-coaching-rohini-sector-14' },
      { name: 'Sector 16', url: '/biology-classes-rohini-sector-16' },
    ],
    relatedCities: [
      { name: 'Rohini', url: '/biology-classes-rohini' },
      { name: 'Pitampura', url: '/biology-classes-pitampura' },
      { name: 'Delhi', url: '/biology-classes-delhi' },
    ],
    faqs: [
      {
        question: 'Which is the best NEET coaching in Rohini Sector 15?',
        answer:
          'Cerebrum Biology Academy at DC Chowk is excellent for Sector 15 students, 3 km away.',
      },
      {
        question: 'How do I reach the center from Sector 15?',
        answer:
          'The DC Chowk center is accessible from Sector 15 by metro or auto, about 8 minutes.',
      },
      {
        question: 'What is the fee for NEET coaching for Sector 15 students?',
        answer: 'NEET coaching fees range from ₹45,000 to ₹75,000 per year.',
      },
      {
        question: 'Do you have students from Rohini Sector 15?',
        answer: 'Yes, we have 45+ students from Sector 15 with excellent results.',
      },
    ],
    stats: {
      studentsFromCity: '45+',
      successRate: '98%',
      rating: '4.9',
    },
    geoCoordinates: {
      lat: '28.7525',
      lng: '77.1125',
    },
  },

  'rohini-sector-16': {
    slug: 'rohini-sector-16',
    cityName: 'Rohini Sector 16',
    stateName: 'Delhi',
    metaTitle: 'Biology Classes in Rohini Sector 16 | NEET Coaching | Cerebrum Academy',
    metaDescription:
      'Best biology classes for Rohini Sector 16. Center at DC Chowk. AIIMS faculty, 98% success. Call 88264-44334!',
    heroTitle: 'Biology Classes in Rohini Sector 16',
    heroSubtitle: 'Top-rated NEET coaching for Sector 16 students. Visit our DC Chowk center.',
    hasOfflineCenter: true,
    nearestCenter: {
      name: 'Rohini Center',
      address: 'DC Chauk, Sector 9, Rohini, New Delhi 110085',
      distance: '3.5 km from Sector 16',
    },
    localities: [
      { name: 'Sector 9', url: '/biology-classes-rohini' },
      { name: 'Sector 15', url: '/neet-coaching-rohini-sector-15' },
      { name: 'Sector 22', url: '/neet-coaching-rohini-sector-22' },
    ],
    relatedCities: [
      { name: 'Rohini', url: '/biology-classes-rohini' },
      { name: 'Pitampura', url: '/biology-classes-pitampura' },
      { name: 'Delhi', url: '/biology-classes-delhi' },
    ],
    faqs: [
      {
        question: 'Which is the best biology coaching in Rohini Sector 16?',
        answer:
          'Cerebrum Biology Academy at DC Chowk is ideal for Sector 16 students, 3.5 km away.',
      },
      {
        question: 'How do I reach the center from Sector 16?',
        answer:
          'The DC Chowk center is accessible from Sector 16 by metro or auto, about 10 minutes.',
      },
      {
        question: 'What is the fee for biology classes for Sector 16 students?',
        answer: 'Biology coaching fees range from ₹45,000 to ₹75,000 per year.',
      },
      {
        question: 'Do you have students from Rohini Sector 16?',
        answer: 'Yes, we have 40+ students from Sector 16 attending our center.',
      },
    ],
    stats: {
      studentsFromCity: '40+',
      successRate: '98%',
      rating: '4.8',
    },
    geoCoordinates: {
      lat: '28.7565',
      lng: '77.1065',
    },
  },

  'rohini-sector-22': {
    slug: 'rohini-sector-22',
    cityName: 'Rohini Sector 22',
    stateName: 'Delhi',
    metaTitle: 'NEET Coaching in Rohini Sector 22 | Biology Center | Cerebrum Academy',
    metaDescription:
      'Best NEET coaching for Rohini Sector 22. Center at DC Chowk. AIIMS faculty, 98% success. Call 88264-44334!',
    heroTitle: 'NEET Coaching in Rohini Sector 22',
    heroSubtitle: 'Top-rated biology coaching for Sector 22 students. Visit our DC Chowk center.',
    hasOfflineCenter: true,
    nearestCenter: {
      name: 'Rohini Center',
      address: 'DC Chauk, Sector 9, Rohini, New Delhi 110085',
      distance: '5 km from Sector 22',
    },
    localities: [
      { name: 'Sector 9', url: '/biology-classes-rohini' },
      { name: 'Sector 16', url: '/biology-classes-rohini-sector-16' },
      { name: 'Sector 24', url: '/biology-classes-rohini-sector-24' },
    ],
    relatedCities: [
      { name: 'Rohini', url: '/biology-classes-rohini' },
      { name: 'Pitampura', url: '/biology-classes-pitampura' },
      { name: 'Delhi', url: '/biology-classes-delhi' },
    ],
    faqs: [
      {
        question: 'Which is the best NEET coaching in Rohini Sector 22?',
        answer:
          'Cerebrum Biology Academy at DC Chowk is excellent for Sector 22 students, 5 km away.',
      },
      {
        question: 'How do I reach the center from Sector 22?',
        answer:
          'The DC Chowk center is accessible from Sector 22 by metro or auto, about 12 minutes.',
      },
      {
        question: 'What is the fee for NEET coaching for Sector 22 students?',
        answer: 'NEET coaching fees range from ₹45,000 to ₹75,000 per year.',
      },
      {
        question: 'Do you have students from Rohini Sector 22?',
        answer: 'Yes, we have 35+ students from Sector 22 with excellent results.',
      },
    ],
    stats: {
      studentsFromCity: '35+',
      successRate: '98%',
      rating: '4.8',
    },
    geoCoordinates: {
      lat: '28.7645',
      lng: '77.1125',
    },
  },

  'rohini-sector-24': {
    slug: 'rohini-sector-24',
    cityName: 'Rohini Sector 24',
    stateName: 'Delhi',
    metaTitle: 'Biology Classes in Rohini Sector 24 | NEET Coaching | Cerebrum Academy',
    metaDescription:
      'Best biology classes for Rohini Sector 24. Center at DC Chowk. AIIMS faculty, 98% success. Call 88264-44334!',
    heroTitle: 'Biology Classes in Rohini Sector 24',
    heroSubtitle: 'Top-rated NEET coaching for Sector 24 students. Visit our DC Chowk center.',
    hasOfflineCenter: true,
    nearestCenter: {
      name: 'Rohini Center',
      address: 'DC Chauk, Sector 9, Rohini, New Delhi 110085',
      distance: '6 km from Sector 24',
    },
    localities: [
      { name: 'Sector 9', url: '/biology-classes-rohini' },
      { name: 'Sector 22', url: '/neet-coaching-rohini-sector-22' },
      { name: 'Pitampura', url: '/biology-classes-pitampura' },
    ],
    relatedCities: [
      { name: 'Rohini', url: '/biology-classes-rohini' },
      { name: 'Pitampura', url: '/biology-classes-pitampura' },
      { name: 'Delhi', url: '/biology-classes-delhi' },
    ],
    faqs: [
      {
        question: 'Which is the best biology coaching in Rohini Sector 24?',
        answer:
          'Cerebrum Biology Academy at DC Chowk is a good choice for Sector 24 students, 6 km away.',
      },
      {
        question: 'How do I reach the center from Sector 24?',
        answer:
          'The DC Chowk center is accessible from Sector 24 by metro or auto, about 15 minutes.',
      },
      {
        question: 'What is the fee for biology classes for Sector 24 students?',
        answer: 'Biology coaching fees range from ₹45,000 to ₹75,000 per year.',
      },
      {
        question: 'Do you have students from Rohini Sector 24?',
        answer: 'Yes, we have 30+ students from Sector 24 attending our center.',
      },
    ],
    stats: {
      studentsFromCity: '30+',
      successRate: '98%',
      rating: '4.8',
    },
    geoCoordinates: {
      lat: '28.7685',
      lng: '77.1105',
    },
  },

  // Gurgaon Sectors
  'gurgaon-sector-43': {
    slug: 'gurgaon-sector-43',
    cityName: 'Sector 43 Gurgaon',
    stateName: 'Haryana',
    metaTitle: 'NEET Coaching in Sector 43 Gurgaon | Biology Classes | Cerebrum Academy',
    metaDescription:
      'Best NEET coaching for Sector 43 Gurgaon. Center in Sector 51 (10 min). AIIMS faculty, 98% success. Call 88264-44334!',
    heroTitle: 'NEET Coaching in Sector 43 Gurgaon',
    heroSubtitle:
      'Top-rated biology coaching for Sector 43 students. Visit our Sector 51 center, just 10 minutes away.',
    hasOfflineCenter: true,
    nearestCenter: {
      name: 'Gurugram Center',
      address: 'M2K Corporate Park, Sector 51, Gurugram 122018',
      distance: '10 minutes from Sector 43',
    },
    localities: [
      { name: 'Sector 51', url: '/biology-classes-gurgaon-sector-51' },
      { name: 'Sector 45', url: '/neet-coaching-gurgaon-sector-45' },
      { name: 'Golf Course Road', url: '/biology-classes-golf-course-road-gurgaon' },
    ],
    relatedCities: [
      { name: 'Gurgaon', url: '/biology-classes-gurgaon' },
      { name: 'DLF Gurgaon', url: '/biology-classes-dlf-gurgaon' },
      { name: 'Delhi', url: '/biology-classes-delhi' },
    ],
    faqs: [
      {
        question: 'Which is the best NEET coaching in Sector 43 Gurgaon?',
        answer:
          'Cerebrum Biology Academy with center in Sector 51 is ideal for Sector 43 students, just 10 minutes away.',
      },
      {
        question: 'How do I reach the center from Sector 43?',
        answer:
          'Our Sector 51 center is easily accessible from Sector 43 via Golf Course Road, about 10 minutes by car.',
      },
      {
        question: 'What is the fee for NEET coaching for Sector 43 students?',
        answer: 'NEET coaching fees range from ₹45,000 to ₹75,000 per year. EMI options available.',
      },
      {
        question: 'Do you have students from Sector 43?',
        answer: 'Yes, we have 40+ students from Sector 43 with excellent NEET results.',
      },
    ],
    stats: {
      studentsFromCity: '40+',
      successRate: '98%',
      rating: '4.9',
    },
    geoCoordinates: {
      lat: '28.4515',
      lng: '77.0735',
    },
  },

  'gurgaon-sector-45': {
    slug: 'gurgaon-sector-45',
    cityName: 'Sector 45 Gurgaon',
    stateName: 'Haryana',
    metaTitle: 'NEET Coaching in Sector 45 Gurgaon | DPS Area Biology Classes | Cerebrum Academy',
    metaDescription:
      'Best NEET coaching near Sector 45 Gurgaon & DPS. Center in Sector 51 (10 min). AIIMS faculty, 98% success. Call 88264-44334!',
    heroTitle: 'NEET Coaching in Sector 45 Gurgaon',
    heroSubtitle:
      'Top-rated biology coaching for Sector 45 & DPS Gurgaon students. Visit our Sector 51 center, just 10 minutes away.',
    hasOfflineCenter: true,
    nearestCenter: {
      name: 'Gurugram Center',
      address: 'M2K Corporate Park, Sector 51, Gurugram 122018',
      distance: '10 minutes from Sector 45',
    },
    localities: [
      { name: 'Sector 51', url: '/biology-classes-gurgaon-sector-51' },
      { name: 'Sector 43', url: '/biology-classes-gurgaon-sector-43' },
      { name: 'DPS Gurgaon', url: '/neet-coaching-dps-gurgaon-students' },
    ],
    relatedCities: [
      { name: 'Gurgaon', url: '/biology-classes-gurgaon' },
      { name: 'Golf Course Road', url: '/biology-classes-golf-course-road-gurgaon' },
      { name: 'Delhi', url: '/biology-classes-delhi' },
    ],
    faqs: [
      {
        question: 'Which is the best NEET coaching in Sector 45 Gurgaon?',
        answer:
          'Cerebrum Biology Academy with center in Sector 51 is ideal for Sector 45 & DPS area students, just 10 minutes away.',
      },
      {
        question: 'How do I reach the center from Sector 45?',
        answer:
          'Our Sector 51 center is easily accessible from Sector 45 via Golf Course Road, about 10 minutes by car.',
      },
      {
        question: 'Do you have students from DPS Gurgaon Sector 45?',
        answer:
          'Yes, we have 80+ students from DPS Gurgaon. It is the largest school batch at our Gurugram center.',
      },
      {
        question: 'What is the fee for NEET coaching for Sector 45 students?',
        answer: 'NEET coaching fees range from ₹45,000 to ₹75,000 per year. EMI options available.',
      },
    ],
    stats: {
      studentsFromCity: '80+',
      successRate: '98%',
      rating: '4.9',
    },
    geoCoordinates: {
      lat: '28.4440',
      lng: '77.0650',
    },
  },

  'gurgaon-sector-55': {
    slug: 'gurgaon-sector-55',
    cityName: 'Sector 55 Gurgaon',
    stateName: 'Haryana',
    metaTitle: 'Biology Classes in Sector 55 Gurgaon | NEET Coaching | Cerebrum Academy',
    metaDescription:
      'Best biology classes for Sector 55 Gurgaon. Center in Sector 51 (7 min). AIIMS faculty, 98% success. Call 88264-44334!',
    heroTitle: 'Biology Classes in Sector 55 Gurgaon',
    heroSubtitle:
      'Top-rated NEET coaching for Sector 55 students. Visit our Sector 51 center, just 7 minutes away.',
    hasOfflineCenter: true,
    nearestCenter: {
      name: 'Gurugram Center',
      address: 'M2K Corporate Park, Sector 51, Gurugram 122018',
      distance: '7 minutes from Sector 55',
    },
    localities: [
      { name: 'Sector 51', url: '/biology-classes-gurgaon-sector-51' },
      { name: 'Sector 56', url: '/biology-classes-gurgaon-sector-56' },
      { name: 'Sector 57', url: '/biology-classes-gurgaon-sector-57' },
    ],
    relatedCities: [
      { name: 'Gurgaon', url: '/biology-classes-gurgaon' },
      { name: 'Golf Course Road', url: '/biology-classes-golf-course-road-gurgaon' },
      { name: 'Delhi', url: '/biology-classes-delhi' },
    ],
    faqs: [
      {
        question: 'Which is the best biology coaching in Sector 55 Gurgaon?',
        answer:
          'Cerebrum Biology Academy with center in Sector 51 is perfect for Sector 55 students, just 7 minutes away.',
      },
      {
        question: 'How do I reach the center from Sector 55?',
        answer:
          'Our Sector 51 center is very close to Sector 55, about 7 minutes by car via Golf Course Extension Road.',
      },
      {
        question: 'What is the fee for biology classes for Sector 55 students?',
        answer: 'Biology coaching fees range from ₹45,000 to ₹75,000 per year.',
      },
      {
        question: 'Do you have students from Sector 55?',
        answer: 'Yes, we have 50+ students from Sector 55 attending our center regularly.',
      },
    ],
    stats: {
      studentsFromCity: '50+',
      successRate: '98%',
      rating: '4.9',
    },
    geoCoordinates: {
      lat: '28.4195',
      lng: '77.0966',
    },
  },

  'gurgaon-sector-60': {
    slug: 'gurgaon-sector-60',
    cityName: 'Sector 60 Gurgaon',
    stateName: 'Haryana',
    metaTitle: 'Biology Classes in Sector 60 Gurgaon | NEET Coaching | Cerebrum Academy',
    metaDescription:
      'Best biology classes for Sector 60 Gurgaon. Center in Sector 51 (12 min). AIIMS faculty, 98% success. Call 88264-44334!',
    heroTitle: 'Biology Classes in Sector 60 Gurgaon',
    heroSubtitle:
      'Top-rated NEET coaching for Sector 60 students. Visit our Sector 51 center, just 12 minutes away.',
    hasOfflineCenter: true,
    nearestCenter: {
      name: 'Gurugram Center',
      address: 'M2K Corporate Park, Sector 51, Gurugram 122018',
      distance: '12 minutes from Sector 60',
    },
    localities: [
      { name: 'Sector 51', url: '/biology-classes-gurgaon-sector-51' },
      { name: 'Sector 56', url: '/biology-classes-gurgaon-sector-56' },
      { name: 'Sector 61', url: '/neet-coaching-gurgaon-sector-61' },
    ],
    relatedCities: [
      { name: 'Gurgaon', url: '/biology-classes-gurgaon' },
      { name: 'Golf Course Road', url: '/biology-classes-golf-course-road-gurgaon' },
      { name: 'Delhi', url: '/biology-classes-delhi' },
    ],
    faqs: [
      {
        question: 'Which is the best biology coaching in Sector 60 Gurgaon?',
        answer:
          'Cerebrum Biology Academy with center in Sector 51 is ideal for Sector 60 students, just 12 minutes away.',
      },
      {
        question: 'How do I reach the center from Sector 60?',
        answer:
          'Our Sector 51 center is accessible from Sector 60 via Golf Course Road, about 12 minutes by car.',
      },
      {
        question: 'What is the fee for biology classes for Sector 60 students?',
        answer: 'Biology coaching fees range from ₹45,000 to ₹75,000 per year.',
      },
      {
        question: 'Do you have students from Sector 60?',
        answer: 'Yes, we have 35+ students from Sector 60 with excellent results.',
      },
    ],
    stats: {
      studentsFromCity: '35+',
      successRate: '98%',
      rating: '4.8',
    },
    geoCoordinates: {
      lat: '28.4095',
      lng: '77.0866',
    },
  },

  'gurgaon-sector-61': {
    slug: 'gurgaon-sector-61',
    cityName: 'Sector 61 Gurgaon',
    stateName: 'Haryana',
    metaTitle: 'NEET Coaching in Sector 61 Gurgaon | Biology Classes | Cerebrum Academy',
    metaDescription:
      'Best NEET coaching for Sector 61 Gurgaon. Center in Sector 51 (15 min). AIIMS faculty, 98% success. Call 88264-44334!',
    heroTitle: 'NEET Coaching in Sector 61 Gurgaon',
    heroSubtitle:
      'Top-rated biology coaching for Sector 61 students. Visit our Sector 51 center, just 15 minutes away.',
    hasOfflineCenter: true,
    nearestCenter: {
      name: 'Gurugram Center',
      address: 'M2K Corporate Park, Sector 51, Gurugram 122018',
      distance: '15 minutes from Sector 61',
    },
    localities: [
      { name: 'Sector 51', url: '/biology-classes-gurgaon-sector-51' },
      { name: 'Sector 60', url: '/biology-classes-gurgaon-sector-60' },
      { name: 'Golf Course Road', url: '/biology-classes-golf-course-road-gurgaon' },
    ],
    relatedCities: [
      { name: 'Gurgaon', url: '/biology-classes-gurgaon' },
      { name: 'Sohna Road', url: '/biology-classes-sohna-road-gurgaon' },
      { name: 'Delhi', url: '/biology-classes-delhi' },
    ],
    faqs: [
      {
        question: 'Which is the best NEET coaching in Sector 61 Gurgaon?',
        answer:
          'Cerebrum Biology Academy with center in Sector 51 is excellent for Sector 61 students, just 15 minutes away.',
      },
      {
        question: 'How do I reach the center from Sector 61?',
        answer:
          'Our Sector 51 center is accessible from Sector 61 via Golf Course Road, about 15 minutes by car.',
      },
      {
        question: 'What is the fee for NEET coaching for Sector 61 students?',
        answer: 'NEET coaching fees range from ₹45,000 to ₹75,000 per year.',
      },
      {
        question: 'Do you have students from Sector 61?',
        answer: 'Yes, we have 30+ students from Sector 61 with excellent track record.',
      },
    ],
    stats: {
      studentsFromCity: '30+',
      successRate: '98%',
      rating: '4.8',
    },
    geoCoordinates: {
      lat: '28.4015',
      lng: '77.0866',
    },
  },

  'gurgaon-sector-73': {
    slug: 'gurgaon-sector-73',
    cityName: 'Sector 73 Gurgaon',
    stateName: 'Haryana',
    metaTitle: 'Biology Classes in Sector 73 Gurgaon | NEET Coaching | Cerebrum Academy',
    metaDescription:
      'Best biology classes for Sector 73 Gurgaon. Center in Sector 51 (20 min). AIIMS faculty, 98% success. Call 88264-44334!',
    heroTitle: 'Biology Classes in Sector 73 Gurgaon',
    heroSubtitle:
      'Top-rated NEET coaching for Sector 73 students. Visit our Sector 51 center or join online classes.',
    hasOfflineCenter: true,
    nearestCenter: {
      name: 'Gurugram Center',
      address: 'M2K Corporate Park, Sector 51, Gurugram 122018',
      distance: '20 minutes from Sector 73',
    },
    localities: [
      { name: 'Sector 51', url: '/biology-classes-gurgaon-sector-51' },
      { name: 'Sector 82', url: '/neet-coaching-gurgaon-sector-82' },
      { name: 'Sohna Road', url: '/biology-classes-sohna-road-gurgaon' },
    ],
    relatedCities: [
      { name: 'Gurgaon', url: '/biology-classes-gurgaon' },
      { name: 'Sohna Road', url: '/biology-classes-sohna-road-gurgaon' },
      { name: 'Faridabad', url: '/biology-classes-faridabad' },
    ],
    faqs: [
      {
        question: 'Which is the best biology coaching in Sector 73 Gurgaon?',
        answer:
          'Cerebrum Biology Academy offers excellent coaching for Sector 73 students with both offline (Sector 51) and online options.',
      },
      {
        question: 'How do I reach the center from Sector 73?',
        answer:
          'Our Sector 51 center is about 20 minutes from Sector 73 via Sohna Road. We also offer convenient online classes.',
      },
      {
        question: 'What is the fee for biology classes for Sector 73 students?',
        answer: 'Biology coaching fees range from ₹35,000 to ₹75,000 per year depending on mode.',
      },
      {
        question: 'Do you have students from Sector 73?',
        answer:
          'Yes, we have 25+ students from Sector 73 attending both online and offline classes.',
      },
    ],
    stats: {
      studentsFromCity: '25+',
      successRate: '98%',
      rating: '4.8',
    },
    geoCoordinates: {
      lat: '28.3935',
      lng: '77.0766',
    },
  },

  'gurgaon-sector-82': {
    slug: 'gurgaon-sector-82',
    cityName: 'Sector 82 Gurgaon',
    stateName: 'Haryana',
    metaTitle: 'NEET Coaching in Sector 82 Gurgaon | Biology Classes | Cerebrum Academy',
    metaDescription:
      'Best NEET coaching for Sector 82 Gurgaon. Center in Sector 51 (25 min) or online. AIIMS faculty, 98% success!',
    heroTitle: 'NEET Coaching in Sector 82 Gurgaon',
    heroSubtitle:
      'Top-rated biology coaching for Sector 82 students. Visit our Sector 51 center or join live online classes.',
    hasOfflineCenter: true,
    nearestCenter: {
      name: 'Gurugram Center',
      address: 'M2K Corporate Park, Sector 51, Gurugram 122018',
      distance: '25 minutes from Sector 82',
    },
    localities: [
      { name: 'Sector 51', url: '/biology-classes-gurgaon-sector-51' },
      { name: 'Sector 73', url: '/biology-classes-gurgaon-sector-73' },
      { name: 'New Gurgaon', url: '/biology-classes-new-gurgaon' },
    ],
    relatedCities: [
      { name: 'Gurgaon', url: '/biology-classes-gurgaon' },
      { name: 'Sohna Road', url: '/biology-classes-sohna-road-gurgaon' },
      { name: 'Faridabad', url: '/biology-classes-faridabad' },
    ],
    faqs: [
      {
        question: 'Which is the best NEET coaching in Sector 82 Gurgaon?',
        answer:
          'Cerebrum Biology Academy offers excellent NEET coaching for Sector 82 students with both offline and online options.',
      },
      {
        question: 'How do I reach the center from Sector 82?',
        answer:
          'Our Sector 51 center is about 25 minutes from Sector 82. We recommend our hybrid or online mode for convenience.',
      },
      {
        question: 'What is the fee for NEET coaching for Sector 82 students?',
        answer:
          'NEET coaching fees range from ₹35,000 to ₹75,000 per year depending on online or offline mode.',
      },
      {
        question: 'Do you have students from Sector 82?',
        answer:
          'Yes, we have 20+ students from Sector 82, mostly attending online or hybrid classes.',
      },
    ],
    stats: {
      studentsFromCity: '20+',
      successRate: '98%',
      rating: '4.8',
    },
    geoCoordinates: {
      lat: '28.3845',
      lng: '77.0566',
    },
  },

  // More Gurgaon areas
  'cyber-city-gurgaon': {
    slug: 'cyber-city-gurgaon',
    cityName: 'Cyber City Gurgaon',
    stateName: 'Haryana',
    metaTitle: 'Biology Classes in Cyber City Gurgaon | NEET Coaching | Cerebrum Academy',
    metaDescription:
      'Best biology classes for Cyber City Gurgaon. Center in Sector 51 (15 min). AIIMS faculty, 98% success. Call 88264-44334!',
    heroTitle: 'Biology Classes in Cyber City Gurgaon',
    heroSubtitle:
      'Top-rated NEET coaching for Cyber City professionals and students. Visit our Sector 51 center.',
    hasOfflineCenter: true,
    nearestCenter: {
      name: 'Gurugram Center',
      address: 'M2K Corporate Park, Sector 51, Gurugram 122018',
      distance: '15 minutes from Cyber City',
    },
    localities: [
      { name: 'DLF Cyber City', url: '/biology-classes-cyber-city-gurgaon' },
      { name: 'Sector 51', url: '/biology-classes-gurgaon-sector-51' },
      { name: 'DLF Phase 2', url: '/biology-classes-dlf-gurgaon' },
    ],
    relatedCities: [
      { name: 'Gurgaon', url: '/biology-classes-gurgaon' },
      { name: 'DLF Gurgaon', url: '/biology-classes-dlf-gurgaon' },
      { name: 'Delhi', url: '/biology-classes-delhi' },
    ],
    faqs: [
      {
        question: 'Which is the best biology coaching near Cyber City?',
        answer:
          'Cerebrum Biology Academy with center in Sector 51 is ideal for Cyber City area students, just 15 minutes away.',
      },
      {
        question: 'How do I reach the center from Cyber City?',
        answer:
          'Our Sector 51 center is easily accessible from Cyber City via MG Road and NH48, about 15 minutes by car.',
      },
      {
        question: 'What is the fee for biology classes for Cyber City area students?',
        answer:
          'Biology coaching fees range from ₹45,000 to ₹75,000 per year. EMI options available.',
      },
      {
        question: 'Do you have students from Cyber City area?',
        answer:
          'Yes, we have 30+ students from Cyber City and nearby DLF areas with excellent results.',
      },
    ],
    stats: {
      studentsFromCity: '30+',
      successRate: '98%',
      rating: '4.9',
    },
    geoCoordinates: {
      lat: '28.4950',
      lng: '77.0890',
    },
  },

  'new-gurgaon': {
    slug: 'new-gurgaon',
    cityName: 'New Gurgaon',
    stateName: 'Haryana',
    metaTitle: 'Biology Classes in New Gurgaon | NEET Coaching | Cerebrum Academy',
    metaDescription:
      'Best biology classes in New Gurgaon. Center in Sector 51 or online. AIIMS faculty, 98% success. Call 88264-44334!',
    heroTitle: 'Biology Classes in New Gurgaon',
    heroSubtitle:
      'Top-rated NEET coaching for New Gurgaon students. Visit our Sector 51 center or join online classes.',
    hasOfflineCenter: true,
    nearestCenter: {
      name: 'Gurugram Center',
      address: 'M2K Corporate Park, Sector 51, Gurugram 122018',
      distance: '30 minutes from New Gurgaon',
    },
    localities: [
      { name: 'Sector 82', url: '/neet-coaching-gurgaon-sector-82' },
      { name: 'Sector 73', url: '/biology-classes-gurgaon-sector-73' },
      { name: 'Sohna Road', url: '/biology-classes-sohna-road-gurgaon' },
    ],
    relatedCities: [
      { name: 'Gurgaon', url: '/biology-classes-gurgaon' },
      { name: 'Sohna Road', url: '/biology-classes-sohna-road-gurgaon' },
      { name: 'Faridabad', url: '/biology-classes-faridabad' },
    ],
    faqs: [
      {
        question: 'Which is the best biology coaching in New Gurgaon?',
        answer:
          'Cerebrum Biology Academy offers excellent coaching for New Gurgaon students with both offline (Sector 51) and online options.',
      },
      {
        question: 'How do I reach the center from New Gurgaon?',
        answer:
          'Our Sector 51 center is about 30 minutes from New Gurgaon via Sohna Road. We recommend hybrid or online mode for convenience.',
      },
      {
        question: 'What is the fee for biology classes for New Gurgaon students?',
        answer:
          'Biology coaching fees range from ₹35,000 to ₹75,000 per year depending on online or offline mode.',
      },
      {
        question: 'Do you have students from New Gurgaon?',
        answer:
          'Yes, we have 35+ students from New Gurgaon attending both online and offline classes.',
      },
    ],
    stats: {
      studentsFromCity: '35+',
      successRate: '98%',
      rating: '4.8',
    },
    geoCoordinates: {
      lat: '28.3835',
      lng: '77.0466',
    },
  },

  'udyog-vihar-gurgaon': {
    slug: 'udyog-vihar-gurgaon',
    cityName: 'Udyog Vihar Gurgaon',
    stateName: 'Haryana',
    metaTitle: 'NEET Coaching in Udyog Vihar Gurgaon | Biology Classes | Cerebrum Academy',
    metaDescription:
      'Best NEET coaching in Udyog Vihar Gurgaon. Center in Sector 51 (20 min). AIIMS faculty, 98% success. Call 88264-44334!',
    heroTitle: 'NEET Coaching in Udyog Vihar Gurgaon',
    heroSubtitle:
      'Top-rated biology coaching for Udyog Vihar students. Visit our Sector 51 center, just 20 minutes away.',
    hasOfflineCenter: true,
    nearestCenter: {
      name: 'Gurugram Center',
      address: 'M2K Corporate Park, Sector 51, Gurugram 122018',
      distance: '20 minutes from Udyog Vihar',
    },
    localities: [
      { name: 'Sector 51', url: '/biology-classes-gurgaon-sector-51' },
      { name: 'DLF Phase 1', url: '/biology-classes-dlf-gurgaon' },
      { name: 'MG Road', url: '/biology-classes-mg-road-gurgaon' },
    ],
    relatedCities: [
      { name: 'Gurgaon', url: '/biology-classes-gurgaon' },
      { name: 'DLF Gurgaon', url: '/biology-classes-dlf-gurgaon' },
      { name: 'Delhi', url: '/biology-classes-delhi' },
    ],
    faqs: [
      {
        question: 'Which is the best NEET coaching in Udyog Vihar Gurgaon?',
        answer:
          'Cerebrum Biology Academy with center in Sector 51 is excellent for Udyog Vihar students, just 20 minutes away.',
      },
      {
        question: 'How do I reach the center from Udyog Vihar?',
        answer:
          'Our Sector 51 center is accessible from Udyog Vihar via MG Road or NH48, about 20 minutes by car.',
      },
      {
        question: 'What is the fee for NEET coaching for Udyog Vihar students?',
        answer: 'NEET coaching fees range from ₹45,000 to ₹75,000 per year. EMI options available.',
      },
      {
        question: 'Do you have students from Udyog Vihar?',
        answer: 'Yes, we have 25+ students from Udyog Vihar with excellent track record.',
      },
    ],
    stats: {
      studentsFromCity: '25+',
      successRate: '98%',
      rating: '4.8',
    },
    geoCoordinates: {
      lat: '28.4974',
      lng: '77.0838',
    },
  },

  'west-delhi': {
    slug: 'west-delhi',
    cityName: 'West Delhi',
    stateName: 'Delhi',
    metaTitle: 'Biology Tutor in West Delhi | NEET Coaching | Cerebrum Academy',
    metaDescription:
      'Best Biology tutor for West Delhi students. NEET & Board preparation for Janakpuri, Dwarka, Rajouri Garden. AIIMS faculty. Call 88264-44334!',
    heroTitle: 'Biology Tutor in West Delhi',
    heroSubtitle:
      'Expert NEET & Board Biology coaching for Janakpuri, Dwarka, Rajouri Garden, and all West Delhi areas. Live online classes from AIIMS faculty.',
    hasOfflineCenter: false,
    nearestCenter: {
      name: 'Greater Noida Center',
      address: 'Omaxe NRI City, Greater Noida, UP 201310',
      distance: 'Online classes recommended',
    },
    localities: [
      { name: 'Janakpuri', url: '/biology-tutor-janakpuri' },
      { name: 'Dwarka', url: '/biology-tutor-dwarka' },
      { name: 'Rajouri Garden', url: '/biology-tutor-rajouri-garden' },
      { name: 'Paschim Vihar', url: '/biology-tutor-paschim-vihar' },
      { name: 'Tilak Nagar', url: '/biology-tutor-tilak-nagar' },
      { name: 'Vikaspuri', url: '/biology-tutor-vikaspuri' },
      { name: 'Uttam Nagar', url: '/biology-tutor-uttam-nagar' },
      { name: 'Subhash Nagar', url: '/biology-tutor-subhash-nagar' },
    ],
    relatedCities: [
      { name: 'Delhi NCR', url: '/best-neet-biology-tutor-delhi-ncr' },
      { name: 'Delhi', url: '/biology-classes-delhi' },
      { name: 'South Delhi', url: '/biology-tutor-south-delhi' },
    ],
    faqs: [
      {
        question: 'Do you have a center in West Delhi?',
        answer:
          'Our main center is in Greater Noida. For West Delhi students, we highly recommend our live online classes which provide the same quality teaching without the long commute. Online classes save 3-4 hours of daily travel time.',
      },
      {
        question: 'Are online classes suitable for NEET preparation?',
        answer:
          'Absolutely! Our online program is comprehensive with live interactive classes, recorded lectures for revision, daily practice problems, and regular mock tests. Many NEET toppers from West Delhi studied with us online.',
      },
      {
        question: 'What are the batch timings for West Delhi students?',
        answer:
          'We offer multiple batches - Morning (6-9 AM), Afternoon (2-5 PM), and Evening (6-9 PM). Weekend intensive batches are also available. Choose timing that suits your school schedule.',
      },
      {
        question: 'Can Dwarka students attend offline classes?',
        answer:
          'Yes, Dwarka students can attend our Greater Noida center. Metro connectivity via Blue Line makes it accessible. However, for daily classes, online mode is more practical and equally effective.',
      },
    ],
    stats: {
      studentsFromCity: '100+',
      successRate: '98%',
      rating: '4.9',
    },
    geoCoordinates: {
      lat: '28.6517',
      lng: '77.1027',
    },
  },

  'ring-road-south-extension': {
    slug: 'ring-road-south-extension',
    cityName: 'Ring Road, South Extension 2',
    stateName: 'Delhi',
    metaTitle: 'Biology Coaching Ring Road South Extension 2 | Class 9-12, NEET, Olympiad | Delhi',
    metaDescription:
      'Best biology coaching at Ring Road, South Extension 2, Delhi. Classes for Class 9, 10, 11, 12, NEET droppers, Board exams & Biology Olympiad. 5 min from South Extension Metro. Online/Offline/Hybrid. Book free demo!',
    heroTitle: 'Biology Coaching at Ring Road, South Extension 2',
    heroSubtitle:
      'Premier South Delhi location for Class 9-12, NEET, Board Exams & Biology Olympiad preparation. Just 5 minutes from South Extension Metro!',
    hasOfflineCenter: true,
    nearestCenter: {
      name: 'Ring Road Center',
      address: 'Ring Road, South Extension Part 2, Near South Extension Metro, New Delhi 110049',
      distance: 'You are here!',
    },
    localities: [
      { name: 'Defence Colony', url: '/biology-classes-defence-colony' },
      { name: 'Lajpat Nagar', url: '/biology-classes-lajpat-nagar' },
      { name: 'Greater Kailash', url: '/best-biology-tuition-greater-kailash' },
      { name: 'Sarojini Nagar', url: '/biology-classes-sarojini-nagar' },
      { name: 'INA Colony', url: '/biology-classes-ina' },
      { name: 'Moolchand', url: '/biology-classes-moolchand' },
      { name: 'Jangpura', url: '/biology-classes-jangpura' },
      { name: 'Andrews Ganj', url: '/biology-classes-andrews-ganj' },
      { name: 'Kotla Mubarakpur', url: '/biology-classes-kotla-mubarakpur' },
      { name: 'Lodhi Colony', url: '/biology-classes-lodhi-colony' },
    ],
    relatedCities: [
      { name: 'South Delhi', url: '/biology-classes-south-delhi' },
      { name: 'Delhi', url: '/biology-classes-delhi' },
      { name: 'Noida', url: '/biology-classes-noida' },
      { name: 'Faridabad', url: '/biology-classes-faridabad' },
    ],
    faqs: [
      {
        question: 'Where exactly is the Ring Road biology coaching center?',
        answer:
          'Our center is located at Ring Road, South Extension Part 2, New Delhi 110049. It is exactly 5 minutes walking distance from South Extension Metro Station (Pink Line). Landmarks: Near South Extension Market, Ring Road flyover.',
      },
      {
        question: 'Which classes do you offer at Ring Road center?',
        answer:
          'We offer biology coaching for: Class 9 (Foundation), Class 10 (Board + NTSE), Class 11 (NEET + Boards), Class 12 (NEET + Boards), NEET Droppers, and Biology Olympiad (NSEB, IBO). All classes available in offline, online & hybrid modes.',
      },
      {
        question: 'How is Ring Road center connected to metro and buses?',
        answer:
          'Excellent connectivity! South Extension Metro (Pink Line) - 5 min walk. AIIMS Metro (Yellow Line) - 10 min. INA Metro - 12 min. DTC Ring Road bus stop - 2 min walk. Students from entire South Delhi reach easily.',
      },
      {
        question: 'Do you have Class 9 and Class 10 biology coaching?',
        answer:
          'Yes! Our Foundation program for Class 9-10 covers CBSE/ICSE biology curriculum, NTSE biology preparation, and builds strong fundamentals for future NEET. Weekend batches available for school students.',
      },
      {
        question: 'Do you offer Biology Olympiad coaching at Ring Road?',
        answer:
          'Yes! We have specialized Olympiad batches for NSEB (National Standard Examination in Biology), INBO, and IBO (International Biology Olympiad). Our students have qualified at national and international levels.',
      },
      {
        question: 'What are the batch timings at Ring Road center?',
        answer:
          'Multiple batches: Morning (7-9 AM), School Hours (10 AM-12 PM), Afternoon (2-4 PM), Evening (5-7 PM), Night (7-9 PM). Weekend batches on Saturday & Sunday. Choose what suits you!',
      },
      {
        question: 'What is the fee structure at Ring Road center?',
        answer:
          'Class 9-10 Foundation: ₹25,000-40,000/year | Class 11-12 NEET: ₹45,000-75,000/year | NEET Dropper: ₹60,000-85,000/year | Olympiad: ₹30,000-50,000/year. EMI options available. Call 88264-44334.',
      },
      {
        question: 'Can I get a free demo class at Ring Road center?',
        answer:
          'Absolutely! Call 88264-44334 or WhatsApp to book a FREE demo class. Experience our teaching methodology, meet the faculty, and see our facilities before enrolling. No obligation!',
      },
    ],
    stats: {
      studentsFromCity: '800+',
      successRate: '98%',
      rating: '4.9',
    },
    geoCoordinates: {
      lat: '28.5732',
      lng: '77.2189',
    },
  },

  'class-11-biology-south-delhi': {
    slug: 'class-11-biology-south-delhi',
    cityName: 'Class 11 Biology South Delhi',
    stateName: 'Delhi',
    metaTitle: 'Class 11 Biology Coaching South Delhi | NEET Foundation + CBSE Boards | Cerebrum',
    metaDescription:
      'Best Class 11 biology coaching in South Delhi. Expert faculty for NEET foundation, CBSE/ICSE boards. Offline classes at Ring Road, South Extension. Online & hybrid batches. Call 88264-44334!',
    heroTitle: 'Class 11 Biology Coaching in South Delhi',
    heroSubtitle:
      'Build strong NEET foundation while acing your Class 11 boards. Expert guidance at our Ring Road, South Extension 2 center!',
    hasOfflineCenter: true,
    nearestCenter: {
      name: 'Ring Road Center',
      address: 'Ring Road, South Extension Part 2, Near South Extension Metro, New Delhi 110049',
      distance: 'South Extension Metro - 5 min walk',
    },
    localities: [
      { name: 'South Extension', url: '/biology-coaching-ring-road-south-extension' },
      { name: 'Defence Colony', url: '/biology-classes-defence-colony' },
      { name: 'Lajpat Nagar', url: '/biology-classes-lajpat-nagar' },
      { name: 'Greater Kailash', url: '/best-biology-tuition-greater-kailash' },
      { name: 'Sarojini Nagar', url: '/biology-classes-sarojini-nagar' },
      { name: 'Hauz Khas', url: '/biology-classes-hauz-khas' },
      { name: 'Malviya Nagar', url: '/biology-classes-malviya-nagar' },
      { name: 'Kalkaji', url: '/biology-classes-kalkaji' },
    ],
    relatedCities: [
      { name: 'South Delhi', url: '/biology-classes-south-delhi' },
      { name: 'Class 12 Biology South Delhi', url: '/biology-coaching-class-12-south-delhi' },
      { name: 'NEET Coaching South Delhi', url: '/neet-coaching-south-extension-delhi' },
      { name: 'Ring Road Center', url: '/biology-coaching-ring-road-south-extension' },
    ],
    faqs: [
      {
        question: 'Why is Class 11 biology important for NEET preparation?',
        answer:
          'Class 11 biology covers 50% of NEET syllabus including Plant Kingdom, Animal Kingdom, Cell Biology, Biomolecules, and Human Physiology. A strong Class 11 foundation is essential for NEET success. Our integrated approach covers both boards and NEET simultaneously.',
      },
      {
        question: 'What topics are covered in Class 11 biology coaching?',
        answer:
          'Complete NCERT syllabus: Living World, Biological Classification, Plant Kingdom, Animal Kingdom, Morphology of Flowering Plants, Anatomy of Flowering Plants, Structural Organization in Animals, Cell Structure & Function, Biomolecules, Cell Cycle, Photosynthesis, Respiration in Plants, Plant Growth & Development.',
      },
      {
        question: 'Do you prepare for both CBSE boards and NEET in Class 11?',
        answer:
          'Yes! Our Class 11 program is designed for dual preparation - CBSE/ICSE board exams AND NEET foundation. We cover NCERT thoroughly (for boards) plus NEET-level MCQs, previous year questions, and competitive exam patterns.',
      },
      {
        question: 'What are the batch timings for Class 11 students?',
        answer:
          'Multiple batches to fit school schedules: Morning (6-8 AM before school), Afternoon (2-4 PM after school), Evening (5-7 PM), Weekend (Saturday/Sunday). Online batches available 24/7 with recorded lectures.',
      },
      {
        question: 'What is the fee for Class 11 biology coaching in South Delhi?',
        answer:
          'Class 11 NEET+Boards program: ₹45,000-65,000/year depending on batch type. Includes: Complete NCERT coverage, NEET foundation modules, weekly tests, doubt sessions, study material. EMI available. Call 88264-44334.',
      },
      {
        question: 'How do you handle the transition from Class 10 to Class 11 biology?',
        answer:
          'Class 11 biology is significantly harder than Class 10. We start with a bridge course covering basic concepts, then gradually increase complexity. Regular tests identify weak areas. Personal attention ensures no student is left behind.',
      },
      {
        question: 'Is offline or online better for Class 11 biology?',
        answer:
          'For Class 11, we recommend our hybrid model: Attend offline classes at Ring Road center 2-3 times/week for concepts + use online resources for revision and doubt clearing. This gives you the best of both worlds!',
      },
      {
        question: 'Do you provide study material for Class 11?',
        answer:
          'Yes! Complete study package: Printed notes (chapter-wise), NCERT solutions, Previous 10 years NEET questions (chapter-wise), Weekly test series, Diagram booklets for botany & zoology, Quick revision sheets.',
      },
    ],
    stats: {
      studentsFromCity: '500+',
      successRate: '96%',
      rating: '4.9',
    },
    geoCoordinates: {
      lat: '28.5732',
      lng: '77.2189',
    },
  },

  'class-12-biology-south-delhi': {
    slug: 'class-12-biology-south-delhi',
    cityName: 'Class 12 Biology South Delhi',
    stateName: 'Delhi',
    metaTitle: 'Class 12 Biology Coaching South Delhi | NEET + Board Exam Expert | Cerebrum',
    metaDescription:
      'Best Class 12 biology coaching in South Delhi. Expert NEET + Board preparation at Ring Road, South Extension. Crash courses, revision batches, test series. Online/Offline. Call 88264-44334!',
    heroTitle: 'Class 12 Biology Coaching in South Delhi',
    heroSubtitle:
      'Ace your CBSE boards AND crack NEET! Expert Class 12 biology coaching at Ring Road, South Extension 2 center.',
    hasOfflineCenter: true,
    nearestCenter: {
      name: 'Ring Road Center',
      address: 'Ring Road, South Extension Part 2, Near South Extension Metro, New Delhi 110049',
      distance: 'South Extension Metro - 5 min walk',
    },
    localities: [
      { name: 'South Extension', url: '/biology-coaching-ring-road-south-extension' },
      { name: 'Defence Colony', url: '/biology-classes-defence-colony' },
      { name: 'Lajpat Nagar', url: '/biology-classes-lajpat-nagar' },
      { name: 'Greater Kailash', url: '/best-biology-tuition-greater-kailash' },
      { name: 'Sarojini Nagar', url: '/biology-classes-sarojini-nagar' },
      { name: 'Hauz Khas', url: '/biology-classes-hauz-khas' },
      { name: 'Green Park', url: '/biology-classes-green-park' },
      { name: 'Safdarjung', url: '/biology-classes-safdarjung-enclave' },
    ],
    relatedCities: [
      { name: 'South Delhi', url: '/biology-classes-south-delhi' },
      { name: 'Class 11 Biology South Delhi', url: '/biology-coaching-class-11-south-delhi' },
      { name: 'NEET Dropper Batch', url: '/neet-coaching-south-extension-delhi' },
      { name: 'Ring Road Center', url: '/biology-coaching-ring-road-south-extension' },
    ],
    faqs: [
      {
        question: 'Why is Class 12 biology crucial for NEET?',
        answer:
          'Class 12 biology covers 50% of NEET syllabus including Genetics, Evolution, Ecology, Biotechnology, and Human Reproduction - all high-weightage topics. Our Class 12 program focuses on both board exam success AND NEET preparation simultaneously.',
      },
      {
        question: 'What Class 12 biology topics are covered?',
        answer:
          'Complete NCERT: Reproduction in Organisms, Sexual Reproduction in Flowering Plants, Human Reproduction, Reproductive Health, Genetics (Mendelian & Molecular), Evolution, Human Health & Disease, Biotechnology Principles & Applications, Organisms & Populations, Ecosystem, Biodiversity & Conservation.',
      },
      {
        question: 'Do you have crash courses for Class 12 boards?',
        answer:
          'Yes! 45-day Board Exam Crash Course: Complete syllabus revision, previous 10 years solved papers, sample paper practice, diagram mastery, high-scoring answer writing techniques. Starts January every year.',
      },
      {
        question: 'How do you balance board preparation and NEET coaching?',
        answer:
          'Our integrated approach covers both: NCERT mastery (for boards) + NEET MCQ patterns + Previous year analysis. We allocate 60% time to NEET-heavy chapters (Genetics, Human Physiology) and 40% to board-focused chapters.',
      },
      {
        question: 'What is the fee for Class 12 biology in South Delhi?',
        answer:
          'Class 12 NEET+Boards: ₹55,000-75,000/year | Board Crash Course: ₹15,000-25,000 (45 days) | NEET Revision: ₹20,000-35,000 (3 months). Includes: Complete material, tests, doubt sessions. EMI available. Call 88264-44334.',
      },
      {
        question: 'What test series do you offer for Class 12 NEET?',
        answer:
          'Comprehensive test series: Weekly chapter tests, Bi-weekly cumulative tests, Monthly NEET pattern full tests, Board pattern practice papers, AIIMS/JIPMER pattern tests. Performance analytics and rank prediction included.',
      },
      {
        question: 'Do you help with practical exams and projects?',
        answer:
          'Yes! Complete practical support: Lab manual solutions, Viva questions preparation, Project guidance, Record book completion help. Many students score 28-30/30 in practicals with our guidance.',
      },
      {
        question: 'What makes your Class 12 coaching different?',
        answer:
          'Our USP: 1) Experienced NEET faculty (15+ years), 2) Small batches (max 25 students), 3) Daily doubt sessions, 4) WhatsApp support for quick doubts, 5) Parent-teacher meetings, 6) Metro-connected location (5 min from South Extension Metro).',
      },
    ],
    stats: {
      studentsFromCity: '600+',
      successRate: '98%',
      rating: '4.9',
    },
    geoCoordinates: {
      lat: '28.5732',
      lng: '77.2189',
    },
  },

  'netaji-subhash-place': {
    slug: 'netaji-subhash-place',
    cityName: 'Netaji Subhash Place',
    stateName: 'Delhi',
    metaTitle: 'NEET Coaching Netaji Subhash Place | Biology Classes NSP Delhi | Cerebrum Academy',
    metaDescription:
      'Best NEET coaching near Netaji Subhash Place (NSP) Delhi. 15-20 min from Rohini center via metro. AIIMS faculty, 98% success rate. WhatsApp 88264-44334!',
    heroTitle: 'Best NEET Coaching near Netaji Subhash Place',
    heroSubtitle:
      'Top-rated NEET biology coaching for NSP students. Just 15-20 minutes from our Rohini DC Chauk center via Red Line Metro.',
    hasOfflineCenter: false,
    nearestCenter: {
      name: 'Rohini Center',
      address: '211 Vikas Surya Tower, DC Chauk, Rohini',
      distance: '15-20 min via metro from NSP',
    },
    localities: [
      { name: 'Wazirpur', url: '/biology-classes-wazirpur' },
      { name: 'Pitampura', url: '/biology-classes-pitampura' },
      { name: 'Shalimar Bagh', url: '/biology-classes-shalimar-bagh' },
      { name: 'Ashok Vihar', url: '/biology-classes-ashok-vihar' },
      { name: 'Rohini', url: '/biology-classes-rohini' },
      { name: 'Model Town', url: '/neet-coaching-model-town' },
    ],
    relatedCities: [
      { name: 'Rohini', url: '/biology-classes-rohini' },
      { name: 'Pitampura', url: '/biology-classes-pitampura' },
      { name: 'Delhi', url: '/biology-classes-delhi' },
      { name: 'North Delhi', url: '/neet-coaching-north-delhi' },
    ],
    faqs: [
      {
        question: 'Where is the nearest NEET coaching from Netaji Subhash Place?',
        answer:
          'Our Rohini center at DC Chauk is just 15-20 minutes from NSP via Red Line Metro. Take the metro from NSP to Rohini West station, and our center is a short walk from there. Call 88264-44334 for directions.',
      },
      {
        question: 'Do you offer NEET coaching for students near NSP metro station?',
        answer:
          'Yes! Students from Netaji Subhash Place area can easily reach our Rohini DC Chauk center via Red Line Metro. We also offer online live classes with the same AIIMS-trained faculty. WhatsApp 88264-44334 for batch timings.',
      },
      {
        question: 'What courses are available for NSP area students?',
        answer:
          'We offer Class 11, Class 12, NEET Dropper, and Foundation courses for students from Netaji Subhash Place. All courses taught by AIIMS-trained faculty with comprehensive NCERT-focused study material. Call 88264-44334 for details.',
      },
      {
        question: 'Is online NEET coaching available for students near NSP?',
        answer:
          'Yes! Our live online classes are perfect for NSP students. Same AIIMS faculty, same curriculum, interactive doubt sessions. Many students prefer hybrid mode - attend online during weekdays and visit Rohini center on weekends. WhatsApp 88264-44334.',
      },
      {
        question: 'What is the fee for NEET biology coaching for NSP students?',
        answer:
          'Our NEET biology coaching fees range from Rs 35,000 to Rs 60,000 per year for online classes. Offline classes at Rohini center are Rs 45,000 to Rs 75,000. This includes study material, test series, and doubt support. EMI options available. Call 88264-44334.',
      },
      {
        question: 'Why should NSP students choose Cerebrum over local coaching?',
        answer:
          'AIIMS-trained faculty (not just graduates), 98% success rate, small batches of 15-20 students, NCERT-focused curriculum, and easy metro connectivity from NSP. Our results speak for themselves - 150+ students from North Delhi cracked NEET last year.',
      },
    ],
    stats: {
      studentsFromCity: '150+',
      successRate: '98%',
      rating: '4.9',
    },
    geoCoordinates: {
      lat: '28.6896',
      lng: '77.1538',
    },
  },

  // ===== CHANDIGARH TRICITY & PUNJAB REGION =====

  'chandigarh': {
    slug: 'chandigarh',
    cityName: 'Chandigarh',
    stateName: 'Chandigarh',
    metaTitle: 'Best NEET Coaching in Chandigarh 2026 | Biology Classes Tricity | Cerebrum Academy',
    metaDescription:
      'Top NEET Biology coaching in Chandigarh with 98% success rate. AIIMS faculty, online classes for Tricity. Target PGIMER, GMCH. 780+ students. Book free demo!',
    heroTitle: 'Best NEET Coaching in Chandigarh',
    heroSubtitle:
      'Premium online biology coaching for Chandigarh Tricity. AIIMS-trained faculty, 98% success rate. Target PGIMER & GMCH Chandigarh.',
    hasOfflineCenter: false,
    nearestCenter: {
      name: 'Online Live Classes',
      address: 'Live interactive classes from anywhere in Tricity',
      distance: 'No commute needed',
    },
    localities: [
      { name: 'Sector 17', url: '/neet-coaching-chandigarh-sector-17' },
      { name: 'Sector 22', url: '/neet-coaching-chandigarh-sector-22' },
      { name: 'Sector 34', url: '/neet-coaching-chandigarh-sector-34' },
      { name: 'Sector 35', url: '/neet-coaching-chandigarh-sector-35' },
      { name: 'Sector 44', url: '/neet-coaching-chandigarh-sector-44' },
      { name: 'Manimajra', url: '/neet-coaching-manimajra-chandigarh' },
    ],
    relatedCities: [
      { name: 'Mohali', url: '/neet-coaching-mohali-punjab' },
      { name: 'Panchkula', url: '/neet-coaching-panchkula-haryana' },
      { name: 'Zirakpur', url: '/neet-coaching-zirakpur-punjab' },
      { name: 'Ludhiana', url: '/neet-coaching-ludhiana-punjab' },
    ],
    faqs: [
      {
        question: 'Which is the best NEET coaching in Chandigarh for Biology?',
        answer:
          'Cerebrum Biology Academy is the top-rated NEET biology coaching for Chandigarh students. With AIIMS-trained faculty, 98% success rate, and 780+ Tricity students, we specialize in biology preparation. Unlike crowded Sector 34 centers with 50-100 students, our online batches have only 10-15 students for personalized attention.',
      },
      {
        question: 'How is online coaching better than Sector 34 coaching centers?',
        answer:
          'Sector 34 coaching centers typically have 50-100+ students per batch. Our live online classes limit to 10-15 students ensuring personalized attention. Plus, save 1-2 hours daily commute from Panchkula/Mohali. Same quality, better attention, no travel hassle.',
      },
      {
        question: 'What is the fee for NEET coaching in Chandigarh?',
        answer:
          'Our comprehensive NEET Biology coaching ranges from ₹24,000 to ₹68,000 per year. This is comparable to Chandigarh coaching centers but with smaller batches (10-15 vs 50-100). Includes live classes, study material, test series, doubt support. EMI available.',
      },
      {
        question: 'Which medical colleges can Chandigarh students target?',
        answer:
          'With strong NEET scores, Tricity students can target: PGIMER Chandigarh (top choice), GMCH Chandigarh (150 seats), AIIMS Bathinda, GMC Patiala, DMC Ludhiana, plus all-India institutes like AIIMS Delhi, Maulana Azad, and state quota seats in Punjab/Haryana.',
      },
      {
        question: 'Do you serve Panchkula and Mohali students?',
        answer:
          'Yes! Our online live classes serve entire Chandigarh Tricity - Chandigarh (all sectors), Panchkula (all sectors), Mohali (Phase 1-11, IT City), Zirakpur, Kharar, and surrounding areas. Same quality, no commute needed.',
      },
      {
        question: 'How is Cerebrum different from Allen/Aakash in Chandigarh?',
        answer:
          'Unlike Allen/Aakash with 100+ students per batch, we keep batches of 10-15 only. Our faculty is exclusively from AIIMS (not just MBBS graduates). Online format offers flexibility, saves commute, and allows doubt clearing anytime via WhatsApp. 98% success rate speaks for itself.',
      },
      {
        question: 'What are the batch timings for Chandigarh students?',
        answer:
          'We offer flexible batch timings: Morning (7-9 AM for early risers), Afternoon (2-4 PM post school), Evening (6-8 PM most popular), and Weekend batches. Students can choose based on their school schedule. All batches are live interactive, not recorded.',
      },
      {
        question: 'Is Cerebrum good for NEET droppers in Chandigarh?',
        answer:
          'Absolutely! Our dropper batch is specially designed with intensive 6-8 hours daily coverage. Previous year droppers from Chandigarh improved by 80-120 marks on average. Dedicated doubt sessions, weekly tests, and mentor support included. WhatsApp 88264-44334 for dropper batch details.',
      },
    ],
    stats: {
      studentsFromCity: '780+',
      successRate: '98%',
      rating: '4.9',
    },
    geoCoordinates: {
      lat: '30.7333',
      lng: '76.7794',
    },
  },

  'mohali': {
    slug: 'mohali',
    cityName: 'Mohali',
    stateName: 'Punjab',
    metaTitle: 'Best NEET Coaching in Mohali 2026 | Biology Classes SAS Nagar | Cerebrum Academy',
    metaDescription:
      'Top NEET Biology coaching in Mohali (SAS Nagar) with AIIMS faculty. Online classes for Phase 1-11, IT City, Aerocity. 180+ students. Target PGIMER. Book demo!',
    heroTitle: 'Best NEET Coaching in Mohali',
    heroSubtitle:
      'Premium online biology coaching for Mohali students. AIIMS-trained faculty, personalized attention. Target PGIMER & Punjab medical colleges.',
    hasOfflineCenter: false,
    nearestCenter: {
      name: 'Online Live Classes',
      address: 'Live interactive classes for all Mohali areas',
      distance: 'No commute to Sector 34 needed',
    },
    localities: [
      { name: 'Phase 1-5', url: '/neet-coaching-mohali-phase-1' },
      { name: 'Phase 6-8', url: '/neet-coaching-mohali-phase-6' },
      { name: 'Phase 9-11', url: '/neet-coaching-mohali-phase-9' },
      { name: 'IT City (Sector 82-83)', url: '/neet-coaching-mohali-it-city' },
      { name: 'Aerocity', url: '/neet-coaching-mohali-aerocity' },
      { name: 'Kharar Road', url: '/neet-coaching-kharar-mohali' },
    ],
    relatedCities: [
      { name: 'Chandigarh', url: '/neet-coaching-chandigarh' },
      { name: 'Panchkula', url: '/neet-coaching-panchkula-haryana' },
      { name: 'Zirakpur', url: '/neet-coaching-zirakpur-punjab' },
      { name: 'Kharar', url: '/neet-coaching-kharar-punjab' },
    ],
    faqs: [
      {
        question: 'Which is the best NEET coaching in Mohali?',
        answer:
          'Cerebrum Biology Academy is the top choice for Mohali students with 180+ enrolled from SAS Nagar. Our online live classes eliminate the need to commute to Chandigarh Sector 34. AIIMS-trained faculty, small batches of 10-15, and 98% success rate.',
      },
      {
        question: 'Do I need to travel to Chandigarh for NEET coaching?',
        answer:
          'No! Our live online classes bring AIIMS-quality coaching to your home in Mohali. Same faculty, same curriculum, same results - without spending 1-2 hours daily commuting to Sector 34. Join from Phase 1-11, IT City, Aerocity, or anywhere.',
      },
      {
        question: 'What is the fee for NEET coaching for Mohali students?',
        answer:
          'Our NEET Biology coaching ranges from ₹24,000 to ₹68,000 per year. This is often less than Sector 34 centers when you factor in commute costs. Plus you get smaller batches (10-15 students) vs their 50-100. EMI options available.',
      },
      {
        question: 'Which schools in Mohali do your students come from?',
        answer:
          'We have students from all major Mohali schools: DPS Mohali, Oakridge International, Gillco International, Manav Mangal School, Learning Paths School, Saupin\'s School, and St. Soldier School. Our flexible timings work with all school schedules.',
      },
    ],
    stats: {
      studentsFromCity: '180+',
      successRate: '98%',
      rating: '4.9',
    },
    geoCoordinates: {
      lat: '30.7046',
      lng: '76.7179',
    },
  },

  'panchkula': {
    slug: 'panchkula',
    cityName: 'Panchkula',
    stateName: 'Haryana',
    metaTitle: 'Best NEET Coaching in Panchkula 2026 | Biology Classes Haryana | Cerebrum Academy',
    metaDescription:
      'Top NEET Biology coaching in Panchkula with AIIMS faculty. Online classes for all sectors. 150+ students. Target Haryana quota seats. Book free demo!',
    heroTitle: 'Best NEET Coaching in Panchkula',
    heroSubtitle:
      'Premium online biology coaching for Panchkula students. AIIMS-trained faculty. Target Haryana state quota medical colleges.',
    hasOfflineCenter: false,
    nearestCenter: {
      name: 'Online Live Classes',
      address: 'Live interactive classes for all Panchkula sectors',
      distance: 'No commute to Chandigarh needed',
    },
    localities: [
      { name: 'Sector 1-10', url: '/neet-coaching-panchkula-sector-1' },
      { name: 'Sector 11-20', url: '/neet-coaching-panchkula-sector-11' },
      { name: 'Sector 21-27', url: '/neet-coaching-panchkula-sector-21' },
      { name: 'Industrial Area', url: '/neet-coaching-panchkula-industrial' },
      { name: 'Pinjore', url: '/neet-coaching-pinjore-panchkula' },
      { name: 'Kalka', url: '/neet-coaching-kalka-panchkula' },
    ],
    relatedCities: [
      { name: 'Chandigarh', url: '/neet-coaching-chandigarh' },
      { name: 'Mohali', url: '/neet-coaching-mohali-punjab' },
      { name: 'Ambala', url: '/neet-coaching-ambala-haryana' },
      { name: 'Yamunanagar', url: '/neet-coaching-yamunanagar' },
    ],
    faqs: [
      {
        question: 'Which is the best NEET coaching in Panchkula?',
        answer:
          'Cerebrum Biology Academy is the top choice for Panchkula students with 150+ enrolled. Our online live classes eliminate commute to Chandigarh. AIIMS faculty, small batches, 98% success rate. Perfect for targeting Haryana state quota seats.',
      },
      {
        question: 'Can Panchkula students get Haryana state quota seats?',
        answer:
          'Yes! Panchkula being in Haryana, students are eligible for Haryana state quota in PGIMS Rohtak, BPS GMC Khanpur Kalan, SGT Medical College, and other Haryana medical colleges. Our coaching specifically covers Haryana counselling process.',
      },
      {
        question: 'What is the fee for NEET coaching in Panchkula?',
        answer:
          'Our NEET Biology coaching ranges from ₹24,000 to ₹68,000 per year. Save on commute costs to Chandigarh Sector 34. Smaller batches (10-15 students) ensure personalized attention. EMI options available.',
      },
      {
        question: 'Which schools in Panchkula do your students come from?',
        answer:
          'Students from all major Panchkula schools: Bhavan Vidyalaya, St. Mary\'s Convent, Satluj Public School, AKSIPS, Mount Carmel, and Shivalik Public School trust us. Our timings are flexible to accommodate school schedules.',
      },
    ],
    stats: {
      studentsFromCity: '150+',
      successRate: '98%',
      rating: '4.9',
    },
    geoCoordinates: {
      lat: '30.6942',
      lng: '76.8606',
    },
  },

  'ludhiana': {
    slug: 'ludhiana',
    cityName: 'Ludhiana',
    stateName: 'Punjab',
    metaTitle: 'Best NEET Coaching in Ludhiana 2026 | Online Biology Classes Punjab | Cerebrum Academy',
    metaDescription:
      'Top NEET Biology coaching in Ludhiana with AIIMS faculty. Online classes for Model Town, Sarabha Nagar, Civil Lines. Target DMC Ludhiana. Book free demo!',
    heroTitle: 'Best NEET Coaching in Ludhiana',
    heroSubtitle:
      'Premium online biology coaching for Ludhiana students. AIIMS-trained faculty. Target DMC Ludhiana & Punjab medical colleges.',
    hasOfflineCenter: false,
    nearestCenter: {
      name: 'Online Live Classes',
      address: 'Live interactive classes - no need to go to Chandigarh/Kota',
      distance: 'Learn from home',
    },
    localities: [
      { name: 'Model Town', url: '/neet-coaching-ludhiana-model-town' },
      { name: 'Sarabha Nagar', url: '/neet-coaching-ludhiana-sarabha-nagar' },
      { name: 'Civil Lines', url: '/neet-coaching-ludhiana-civil-lines' },
      { name: 'BRS Nagar', url: '/neet-coaching-ludhiana-brs-nagar' },
      { name: 'Pakhowal Road', url: '/neet-coaching-ludhiana-pakhowal-road' },
      { name: 'Dugri', url: '/neet-coaching-ludhiana-dugri' },
    ],
    relatedCities: [
      { name: 'Chandigarh', url: '/neet-coaching-chandigarh' },
      { name: 'Jalandhar', url: '/neet-coaching-jalandhar-punjab' },
      { name: 'Patiala', url: '/neet-coaching-patiala-punjab' },
      { name: 'Amritsar', url: '/neet-coaching-amritsar-punjab' },
    ],
    faqs: [
      {
        question: 'Which is the best NEET coaching in Ludhiana?',
        answer:
          'Cerebrum Biology Academy offers the best online NEET biology coaching for Ludhiana students. AIIMS-trained faculty, small batches of 10-15, and 98% success rate. No need to relocate to Chandigarh or Kota - same quality from home.',
      },
      {
        question: 'Is online coaching as effective as Chandigarh coaching centers?',
        answer:
          'Absolutely! Our live interactive classes match Chandigarh coaching quality. Plus you save ₹1-2 lakhs on hostel/PG in Chandigarh. Small batches (10-15 students vs 50-100), instant doubt resolution, and WhatsApp support.',
      },
      {
        question: 'What is the fee for NEET coaching for Ludhiana students?',
        answer:
          'Our NEET Biology coaching ranges from ₹24,000 to ₹68,000 per year. Compare this to relocating to Chandigarh (₹3-4 lakhs including hostel). Same AIIMS faculty quality, significant cost savings. EMI available.',
      },
      {
        question: 'Can I target DMC Ludhiana from your coaching?',
        answer:
          'Yes! Dayanand Medical College Ludhiana is a top target for our Punjab students. We cover Punjab state quota counselling, cutoff analysis, and specific preparation strategy. Several of our students are now at DMC.',
      },
    ],
    stats: {
      studentsFromCity: '250+',
      successRate: '93%',
      rating: '4.8',
    },
    geoCoordinates: {
      lat: '30.9010',
      lng: '75.8573',
    },
  },

  'jalandhar': {
    slug: 'jalandhar',
    cityName: 'Jalandhar',
    stateName: 'Punjab',
    metaTitle: 'Best NEET Coaching in Jalandhar 2026 | Online Biology Classes | Cerebrum Academy',
    metaDescription:
      'Top NEET Biology coaching in Jalandhar with AIIMS faculty. Online classes for Model Town, Defence Colony, Maqsudan. Target Punjab medical colleges. Book demo!',
    heroTitle: 'Best NEET Coaching in Jalandhar',
    heroSubtitle:
      'Premium online biology coaching for Jalandhar students. AIIMS-trained faculty. Target Punjab medical colleges.',
    hasOfflineCenter: false,
    nearestCenter: {
      name: 'Online Live Classes',
      address: 'Live interactive classes - no need to relocate',
      distance: 'Learn from home',
    },
    localities: [
      { name: 'Model Town', url: '/neet-coaching-jalandhar-model-town' },
      { name: 'Defence Colony', url: '/neet-coaching-jalandhar-defence-colony' },
      { name: 'Maqsudan', url: '/neet-coaching-jalandhar-maqsudan' },
      { name: 'Green Model Town', url: '/neet-coaching-jalandhar-green-model-town' },
      { name: 'Urban Estate', url: '/neet-coaching-jalandhar-urban-estate' },
      { name: 'Lajpat Nagar', url: '/neet-coaching-jalandhar-lajpat-nagar' },
    ],
    relatedCities: [
      { name: 'Chandigarh', url: '/neet-coaching-chandigarh' },
      { name: 'Ludhiana', url: '/neet-coaching-ludhiana-punjab' },
      { name: 'Amritsar', url: '/neet-coaching-amritsar-punjab' },
      { name: 'Phagwara', url: '/neet-coaching-phagwara-punjab' },
    ],
    faqs: [
      {
        question: 'Which is the best NEET coaching in Jalandhar?',
        answer:
          'Cerebrum Biology Academy offers top online NEET biology coaching for Jalandhar students. AIIMS-trained faculty, small batches of 10-15 students, and 93% success rate. No need to go to Chandigarh or Kota.',
      },
      {
        question: 'Do I need to relocate for good NEET coaching?',
        answer:
          'No! Our online live classes bring Kota/Chandigarh quality coaching to Jalandhar. Same AIIMS faculty, same curriculum, same results. Save ₹2-3 lakhs on relocation and hostel costs.',
      },
      {
        question: 'What is the fee for NEET coaching in Jalandhar?',
        answer:
          'Our NEET Biology coaching ranges from ₹24,000 to ₹68,000 per year. This is a fraction of what you\'d spend relocating to Chandigarh (₹3-4 lakhs). Same quality, better economics. EMI available.',
      },
      {
        question: 'Which schools in Jalandhar do your students come from?',
        answer:
          'Students from DPS Jalandhar, Police DAV, Innocent Hearts, St. Soldier, MGN Public School, and DAV College trust us. Our flexible timings work with all school schedules.',
      },
    ],
    stats: {
      studentsFromCity: '120+',
      successRate: '93%',
      rating: '4.8',
    },
    geoCoordinates: {
      lat: '31.3260',
      lng: '75.5762',
    },
  },

  'amritsar': {
    slug: 'amritsar',
    cityName: 'Amritsar',
    stateName: 'Punjab',
    metaTitle: 'Best NEET Coaching in Amritsar 2026 | Online Biology Classes | Cerebrum Academy',
    metaDescription:
      'Top NEET Biology coaching in Amritsar with AIIMS faculty. Online classes for Lawrence Road, Mall Road, Ranjit Avenue. Target GMC Amritsar. Book demo!',
    heroTitle: 'Best NEET Coaching in Amritsar',
    heroSubtitle:
      'Premium online biology coaching for Amritsar students. AIIMS-trained faculty. Target GMC Amritsar & Punjab medical colleges.',
    hasOfflineCenter: false,
    nearestCenter: {
      name: 'Online Live Classes',
      address: 'Live interactive classes - study from home',
      distance: 'No relocation needed',
    },
    localities: [
      { name: 'Lawrence Road', url: '/neet-coaching-amritsar-lawrence-road' },
      { name: 'Mall Road', url: '/neet-coaching-amritsar-mall-road' },
      { name: 'Ranjit Avenue', url: '/neet-coaching-amritsar-ranjit-avenue' },
      { name: 'GT Road', url: '/neet-coaching-amritsar-gt-road' },
      { name: 'Court Road', url: '/neet-coaching-amritsar-court-road' },
      { name: 'Majitha Road', url: '/neet-coaching-amritsar-majitha-road' },
    ],
    relatedCities: [
      { name: 'Chandigarh', url: '/neet-coaching-chandigarh' },
      { name: 'Jalandhar', url: '/neet-coaching-jalandhar-punjab' },
      { name: 'Ludhiana', url: '/neet-coaching-ludhiana-punjab' },
      { name: 'Pathankot', url: '/neet-coaching-pathankot-punjab' },
    ],
    faqs: [
      {
        question: 'Which is the best NEET coaching in Amritsar?',
        answer:
          'Cerebrum Biology Academy offers top online NEET biology coaching for Amritsar students. AIIMS-trained faculty, small batches, 92% success rate. No need to relocate to Chandigarh or Kota.',
      },
      {
        question: 'Can I target GMC Amritsar through your coaching?',
        answer:
          'Yes! Government Medical College Amritsar is a prime target for our students. We cover Punjab state quota, cutoff analysis, and specific strategy for GMC Amritsar. Several alumni are now studying there.',
      },
      {
        question: 'Is online coaching reliable for NEET?',
        answer:
          'Absolutely! Our live interactive classes have the same quality as top Chandigarh coaching. Small batches (10-15 students), instant doubt resolution, WhatsApp support, and recorded sessions for revision.',
      },
      {
        question: 'What is the fee for NEET coaching for Amritsar students?',
        answer:
          'Our NEET Biology coaching ranges from ₹24,000 to ₹68,000 per year. Compare to ₹3-4 lakhs for relocating to Chandigarh (including hostel). Same quality, better value. EMI options available.',
      },
    ],
    stats: {
      studentsFromCity: '90+',
      successRate: '92%',
      rating: '4.8',
    },
    geoCoordinates: {
      lat: '31.6340',
      lng: '74.8723',
    },
  },

  'zirakpur': {
    slug: 'zirakpur',
    cityName: 'Zirakpur',
    stateName: 'Punjab',
    metaTitle: 'Best NEET Coaching in Zirakpur 2026 | Biology Classes | Cerebrum Academy',
    metaDescription:
      'Top NEET Biology coaching in Zirakpur with AIIMS faculty. Online classes for VIP Road, Patiala Road, Baltana. Save commute to Chandigarh. Book demo!',
    heroTitle: 'Best NEET Coaching in Zirakpur',
    heroSubtitle:
      'Premium online biology coaching for Zirakpur students. AIIMS-trained faculty. No commute to Chandigarh needed.',
    hasOfflineCenter: false,
    nearestCenter: {
      name: 'Online Live Classes',
      address: 'Live interactive classes for Zirakpur area',
      distance: 'No commute to Sector 34',
    },
    localities: [
      { name: 'VIP Road', url: '/neet-coaching-zirakpur-vip-road' },
      { name: 'Patiala Road', url: '/neet-coaching-zirakpur-patiala-road' },
      { name: 'Baltana', url: '/neet-coaching-baltana-zirakpur' },
      { name: 'Dhakoli', url: '/neet-coaching-dhakoli-zirakpur' },
      { name: 'Peer Muchalla', url: '/neet-coaching-peer-muchalla-zirakpur' },
      { name: 'Gazipur', url: '/neet-coaching-gazipur-zirakpur' },
    ],
    relatedCities: [
      { name: 'Chandigarh', url: '/neet-coaching-chandigarh' },
      { name: 'Mohali', url: '/neet-coaching-mohali-punjab' },
      { name: 'Panchkula', url: '/neet-coaching-panchkula-haryana' },
      { name: 'Patiala', url: '/neet-coaching-patiala-punjab' },
    ],
    faqs: [
      {
        question: 'Which is the best NEET coaching in Zirakpur?',
        answer:
          'Cerebrum Biology Academy offers top online NEET biology coaching for Zirakpur students. AIIMS-trained faculty, small batches, 98% success rate. No daily commute to Chandigarh Sector 34 needed.',
      },
      {
        question: 'How much time can I save with online coaching?',
        answer:
          'Zirakpur to Sector 34 Chandigarh takes 30-45 minutes one way (1-1.5 hours daily). Our online classes save this commute time for extra study. Plus no traffic stress on NH-22.',
      },
      {
        question: 'What is the fee for NEET coaching in Zirakpur?',
        answer:
          'Our NEET Biology coaching ranges from ₹24,000 to ₹68,000 per year. Save on daily commute costs (₹100-200/day = ₹25,000-50,000/year). Better value, better attention.',
      },
      {
        question: 'Which areas in Zirakpur do you serve?',
        answer:
          'We serve all Zirakpur areas: VIP Road, Patiala Road, Baltana, Dhakoli, Peer Muchalla, Gazipur, Lohgarh, and surroundings. Online classes mean location doesn\'t matter.',
      },
    ],
    stats: {
      studentsFromCity: '90+',
      successRate: '98%',
      rating: '4.9',
    },
    geoCoordinates: {
      lat: '30.6430',
      lng: '76.8174',
    },
  },
}

export const getAllCitySlugs = (): string[] => {
  return Object.keys(cityHubData)
}

export const getCityData = (slug: string): CityHubData | undefined => {
  return cityHubData[slug]
}
