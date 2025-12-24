export interface CityHubData {
  slug: string
  cityName: string
  stateName: string
  metaTitle: string
  metaDescription: string
  heroTitle: string
  heroSubtitle: string
  hasOfflineCenter: boolean
  nearestCenter?: {
    name: string
    address: string
    distance: string
  }
  localities: Array<{ name: string; url: string }>
  relatedCities: Array<{ name: string; url: string }>
  faqs: Array<{ question: string; answer: string }>
  stats: {
    studentsFromCity: string
    successRate: string
    rating: string
  }
  geoCoordinates: {
    lat: string
    lng: string
  }
}

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
      successRate: '97%',
      rating: '4.9',
    },
    geoCoordinates: {
      lat: '28.5355',
      lng: '77.3910',
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
      { name: 'Sector 51', url: '/biology-classes-gurgaon/sector-51' },
      { name: 'Sector 56', url: '/biology-classes-gurgaon/sector-56' },
      { name: 'DLF Phase 4', url: '/biology-classes-gurgaon/dlf' },
      { name: 'Golf Course Road', url: '/biology-classes-gurgaon/golf-course-road' },
      { name: 'Sohna Road', url: '/biology-classes-gurgaon/sohna-road' },
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
      successRate: '97%',
      rating: '4.8',
    },
    geoCoordinates: {
      lat: '28.6692',
      lng: '77.4538',
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
      successRate: '94%',
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
    metaTitle: 'Biology Classes in South Delhi | Best NEET Coaching South Extension | Cerebrum',
    metaDescription:
      'Top biology classes in South Delhi with center in South Extension. AIIMS faculty, 98% success rate. Near AIIMS, GK, Lajpat Nagar. Book free demo!',
    heroTitle: 'Best Biology Classes in South Delhi',
    heroSubtitle:
      'Premium NEET coaching at our South Extension center. Just 10 minutes from AIIMS Delhi!',
    hasOfflineCenter: true,
    nearestCenter: {
      name: 'South Delhi Center',
      address: 'Block D, South Extension Part 2, New Delhi 110049',
      distance: 'South Extension',
    },
    localities: [
      { name: 'South Extension', url: '/biology-tuition-south-delhi' },
      { name: 'Greater Kailash', url: '/biology-classes-south-delhi/gk' },
      { name: 'Lajpat Nagar', url: '/biology-classes-south-delhi/lajpat-nagar' },
      { name: 'Defence Colony', url: '/biology-classes-south-delhi/defence-colony' },
      { name: 'Hauz Khas', url: '/biology-classes-south-delhi/hauz-khas' },
      { name: 'Saket', url: '/biology-classes-south-delhi/saket' },
      { name: 'Malviya Nagar', url: '/biology-classes-south-delhi/malviya-nagar' },
      { name: 'Vasant Kunj', url: '/biology-classes-south-delhi/vasant-kunj' },
    ],
    relatedCities: [
      { name: 'Delhi', url: '/biology-classes-delhi' },
      { name: 'Noida', url: '/biology-classes-noida' },
      { name: 'Faridabad', url: '/biology-classes-faridabad' },
      { name: 'Gurgaon', url: '/biology-classes-gurgaon' },
    ],
    faqs: [
      {
        question: 'Where is the biology coaching center in South Delhi?',
        answer:
          'Our South Delhi center is at Block D, South Extension Part 2, New Delhi 110049. It is walking distance from South Extension market and easily accessible from AIIMS Metro Station (Yellow Line). Students from GK, Lajpat Nagar, Defence Colony, and nearby areas attend here.',
      },
      {
        question: 'Why is South Extension location ideal for NEET aspirants?',
        answer:
          'Our South Extension center is just 10 minutes from AIIMS Delhi - the dream destination for our students! This proximity to AIIMS motivates students daily. The area is well-connected by metro and has excellent infrastructure.',
      },
      {
        question: 'What are the batch timings at South Delhi center?',
        answer:
          'We have morning batches (8-10 AM), afternoon batches (2-4 PM), and evening batches (6-8 PM). Weekend batches are available for students who have school on weekdays. Multiple options to suit your schedule.',
      },
      {
        question: 'What is the fee at South Delhi center?',
        answer:
          'Biology coaching at our South Delhi center is ₹45,000 to ₹75,000 per year depending on the course. This is competitive with South Delhi market rates but with superior AIIMS-trained faculty.',
      },
    ],
    stats: {
      studentsFromCity: '1,000+',
      successRate: '98%',
      rating: '4.9',
    },
    geoCoordinates: {
      lat: '28.5725',
      lng: '77.2217',
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
    heroSubtitle:
      'Our flagship center at DC Chauk, Sector 9. Right next to metro station!',
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
  },
}

export const getAllCitySlugs = (): string[] => {
  return Object.keys(cityHubData)
}

export const getCityData = (slug: string): CityHubData | undefined => {
  return cityHubData[slug]
}
