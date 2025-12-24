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

  dwarka: {
    slug: 'dwarka',
    cityName: 'Dwarka',
    stateName: 'Delhi',
    metaTitle: 'Biology Classes in Dwarka | Best NEET Coaching Dwarka Delhi | Cerebrum Academy',
    metaDescription:
      'Top biology classes in Dwarka, Delhi for NEET & Boards. AIIMS faculty, 98% success rate. Near Dwarka Sector 21 Metro. Book free demo! Call 88264-44334',
    heroTitle: 'Best Biology Classes in Dwarka',
    heroSubtitle:
      'Delhi\'s #1 coaching hub now has premium NEET biology coaching. Learn from AIIMS-trained faculty.',
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
      successRate: '97%',
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
      successRate: '97%',
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
      'East Delhi\'s top NEET biology coaching. AIIMS-trained faculty, proven 98% success rate.',
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
      successRate: '97%',
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
      successRate: '97%',
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
    heroSubtitle:
      'East Delhi\'s largest residential area gets premium NEET biology coaching.',
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
      successRate: '97%',
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
    heroSubtitle:
      'Quality NEET biology coaching at affordable fees. AIIMS-trained faculty.',
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
    heroSubtitle:
      'Central Delhi location with premium NEET biology coaching. AIIMS faculty.',
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
      successRate: '97%',
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
      'South Delhi\'s premium locality gets premium NEET coaching. AIIMS-trained faculty.',
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
    heroSubtitle:
      'Just 5 km from our South Extension center! Premium NEET biology coaching.',
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
    heroSubtitle:
      'Walking distance from our South Extension center! Premium NEET coaching.',
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
    heroSubtitle:
      'North Delhi\'s premium locality with premium NEET coaching. Near Rohini center.',
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
    heroSubtitle:
      'Just 5 km from our Rohini center! Premium NEET biology coaching.',
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
    heroSubtitle:
      'Premium NEET biology coaching for Ashok Vihar students. Near Rohini center.',
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
      successRate: '97%',
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
      'South Delhi\'s commercial hub gets premium NEET coaching. Near South Extension center.',
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
      successRate: '97%',
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
    heroSubtitle:
      'Just 3 km from our South Extension center! Premium NEET biology coaching.',
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
}

export const getAllCitySlugs = (): string[] => {
  return Object.keys(cityHubData)
}

export const getCityData = (slug: string): CityHubData | undefined => {
  return cityHubData[slug]
}
