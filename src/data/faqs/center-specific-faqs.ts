import { CONTACT_INFO } from '@/lib/constants/contactInfo';

export interface CenterFAQ {
  centerId: string;
  centerName: string;
  city: string;
  address: string;
  faqs: Array<{
    question: string;
    answer: string;
    keywords: string[];
  }>;
}

export const centerSpecificFAQs: CenterFAQ[] = [
  {
    centerId: 'rohini',
    centerName: 'Rohini Center',
    city: 'New Delhi',
    address: '211, Vikas Surya Tower, DC Chauk, Rohini Sector 9, New Delhi 110085',
    faqs: [
      {
        question: 'Where is the best NEET coaching in Rohini, New Delhi?',
        answer: 'Cerebrum Biology Academy Rohini is one of the premier NEET coaching centers in Rohini, located in Vikas Surya Tower at DC Chauk, Rohini Sector 9. We provide expert faculty, personalized mentorship, and a proven track record of student success. Our curriculum is specifically designed to help students crack NEET with top scores.',
        keywords: ['NEET coaching', 'Rohini', 'biology coaching', 'best coaching']
      },
      {
        question: 'How do I reach Cerebrum Rohini from Rohini Sector 9 Metro?',
        answer: 'Our Rohini center is just 5-7 minutes walk from Rohini Sector 9 Metro Station. Exit from the metro, head towards DC Chauk area, and you\'ll find Vikas Surya Tower. Detailed direction maps and transport guides are available on our website cerebrumbiologyacademy.com. You can also call us at +91-8826444334 for precise directions.',
        keywords: ['directions', 'metro', 'location', 'reach', 'transport']
      },
      {
        question: 'What are the batch timings at Cerebrum Rohini Center?',
        answer: 'We offer flexible batch timings from Monday to Saturday: Morning Batch (8:00 AM - 11:00 AM), Afternoon Batch (2:00 PM - 5:00 PM), and Evening Batch (5:00 PM - 8:00 PM). Classes are held 6 days a week with small batches of 15-20 students ensuring personalized attention.',
        keywords: ['timings', 'batch', 'schedule', 'hours', 'classes']
      },
      {
        question: 'Is there parking and metro access near the Rohini center?',
        answer: 'Yes, our Rohini center is conveniently located just 5-7 minutes walk from Rohini Sector 9 Metro Station (Blue Line). Parking facilities are available in the Vikas Surya Tower complex with dedicated spaces. The area is well-connected by public transport with multiple bus routes available as well.',
        keywords: ['parking', 'metro', 'transportation', 'accessibility', 'commute']
      },
      {
        question: 'What facilities does Cerebrum Rohini Center provide?',
        answer: 'Our Rohini center is equipped with air-conditioned classrooms, modern learning aids, well-equipped laboratories, regular doubt-clearing sessions, comprehensive study materials, mock tests, and dedicated mentorship programs. We maintain a healthy student-teacher ratio to ensure quality education and individual attention to each student.',
        keywords: ['facilities', 'classrooms', 'lab', 'AC', 'amenities']
      },
      {
        question: 'What is the fee structure at Cerebrum Rohini Center?',
        answer: 'For Class 11 & 12 students: ₹72,200 per year. For Foundation courses: ₹57,000 per year. Flexible payment options are available. Scholarships are offered based on merit and need. Contact us at +91-9311946297 for more details on fees, discounts, and payment plans.',
        keywords: ['fees', 'cost', 'payment', 'scholarship', 'charges']
      },
      {
        question: 'Can I take a demo class at Cerebrum Rohini before joining?',
        answer: 'Absolutely! We encourage all prospective students to attend a free demo class before enrolling. This helps you understand our teaching methodology, interact with our faculty, and experience the learning environment. You can book your demo class by visiting cerebrumbiologyacademy.com or calling +91-8826444334.',
        keywords: ['demo class', 'free trial', 'sample class', 'visit', 'trial']
      },
      {
        question: 'What areas does Cerebrum Rohini Center serve?',
        answer: 'Our Rohini center primarily serves students from Rohini (Sectors 1-25), Pitampura, Shalimar Bagh, Rani Bagh, Prashant Vihar, and nearby localities. Many students from West Delhi prefer our Rohini center due to its strategic location and excellent connectivity. We welcome students from all areas to experience quality NEET coaching.',
        keywords: ['areas', 'coverage', 'nearby', 'localities', 'neighborhoods']
      }
    ]
  },
  {
    centerId: 'gurugram',
    centerName: 'Gurugram Center',
    city: 'Gurugram',
    address: 'Unit 17, M2K Corporate Park, Sector 51 (Mayfield Garden), Gurugram 122018',
    faqs: [
      {
        question: 'Where is the best NEET coaching in Gurugram, Haryana?',
        answer: 'Cerebrum Biology Academy Gurugram is the leading NEET coaching center in Gurugram, located in M2K Corporate Park at Sector 51. We combine expert faculty, proven teaching methodologies, and state-of-the-art infrastructure to deliver exceptional results. Our success rate makes us the preferred choice for NEET aspirants in Gurugram.',
        keywords: ['NEET coaching', 'Gurugram', 'biology coaching', 'best coaching']
      },
      {
        question: 'How can I reach Cerebrum Gurugram from Sector 51 (Mayfield Garden)?',
        answer: 'Our Gurugram center is located directly in M2K Corporate Park, Sector 51. It\'s easily accessible via the Golf Course Road and very close to Mayfield Garden. You can reach us by personal vehicle, taxi, or local autos. Detailed location and navigation links are available at cerebrumbiologyacademy.com. Call +91-8826444334 for directions.',
        keywords: ['directions', 'location', 'reach', 'transport', 'address']
      },
      {
        question: 'What are the batch timings at Cerebrum Gurugram?',
        answer: 'We provide comprehensive coaching with flexible batch timings: Morning Batch (8:00 AM - 11:00 AM), Afternoon Batch (2:00 PM - 5:00 PM), and Evening Batch (5:00 PM - 8:00 PM). Classes operate Monday to Saturday with small batches of 15-20 students per class for maximum learning efficiency.',
        keywords: ['timings', 'batch', 'schedule', 'hours', 'classes']
      },
      {
        question: 'Is there parking and accessibility at the Gurugram center?',
        answer: 'Yes, our Gurugram center in M2K Corporate Park offers ample parking facilities within the complex. The location is highly accessible via Golf Course Road and is well-connected to major areas in Gurugram. Public transportation options including auto-rickshaws and cabs are readily available.',
        keywords: ['parking', 'accessibility', 'transportation', 'commute', 'facilities']
      },
      {
        question: 'What facilities are available at Cerebrum Gurugram Center?',
        answer: 'Our Gurugram center features air-conditioned classrooms, premium learning infrastructure, well-stocked biology labs, online test portals, regular doubt-clearing sessions, comprehensive study materials, and expert mentorship programs. We maintain a supportive learning environment with a low student-teacher ratio to ensure personalized attention.',
        keywords: ['facilities', 'classrooms', 'lab', 'AC', 'amenities']
      },
      {
        question: 'What is the fee structure at Cerebrum Gurugram Center?',
        answer: 'Annual fees for Class 11 & 12 students: ₹72,200. Foundation course fees: ₹57,000 per year. We offer flexible payment plans, scholarships for meritorious students, and special discounts for early enrollment. Contact us at +91-9311946297 for personalized fee information and available offers.',
        keywords: ['fees', 'cost', 'charges', 'payment', 'scholarship']
      },
      {
        question: 'Can I attend a demo class at Cerebrum Gurugram?',
        answer: 'Yes! We warmly welcome prospective students to attend free demo classes. This gives you an opportunity to experience our teaching style, meet our faculty, and understand our curriculum approach. Book your demo session at cerebrumbiologyacademy.com or contact us at +91-8826444334 to schedule your visit.',
        keywords: ['demo class', 'free trial', 'sample class', 'experience', 'visit']
      },
      {
        question: 'Which areas around Gurugram does the center serve?',
        answer: 'Our Gurugram center caters to students from Sector 43-57, Golf Course Road, Sohna Road, DLF phases, Mayfield Garden, and surrounding areas. We welcome students from across Gurugram and nearby NCR regions looking for quality NEET preparation with proven track records.',
        keywords: ['areas', 'coverage', 'sectors', 'localities', 'neighborhoods']
      }
    ]
  },
  {
    centerId: 'south-extension',
    centerName: 'South Extension Center',
    city: 'New Delhi',
    address: 'Block D, Near McD, South Extension Part 2, New Delhi 110049',
    faqs: [
      {
        question: 'Where can I find the best NEET coaching in South Extension, Delhi?',
        answer: 'Cerebrum Biology Academy South Extension is a premier NEET coaching institute located in Block D, South Extension Part 2. We offer expert faculty, personalized learning strategies, and an excellent success record. Our South Delhi center is particularly popular among students from South Extension, Greater Kailash, and surrounding premium localities.',
        keywords: ['NEET coaching', 'South Extension', 'Delhi', 'biology coaching']
      },
      {
        question: 'How do I reach Cerebrum South Extension from South Extension Metro?',
        answer: 'Our South Extension center is just 3-5 minutes walk from South Extension Metro Station (Blue Line). Exit the metro and head towards Block D, near McDonald\'s. You\'ll find our center easily. For detailed navigation, visit cerebrumbiologyacademy.com or call +91-8826444334 for step-by-step directions.',
        keywords: ['directions', 'metro', 'reach', 'transport', 'location']
      },
      {
        question: 'What are the batch timings available at South Extension Center?',
        answer: 'We offer flexible batch timings Monday to Saturday: Morning Batch (8:00 AM - 11:00 AM), Afternoon Batch (2:00 PM - 5:00 PM), and Evening Batch (5:00 PM - 8:00 PM). Each batch has only 15-20 students ensuring focused attention and superior learning outcomes for every student.',
        keywords: ['timings', 'batch', 'schedule', 'hours', 'morning', 'evening']
      },
      {
        question: 'Is there metro access and parking near the South Extension center?',
        answer: 'Excellent connectivity is a key advantage! Our center is just 3-5 minutes from South Extension Metro Station (Blue Line), and the area has abundant paid parking options in nearby markets and complexes. The neighborhood is pedestrian-friendly with multiple transport options including autos, cabs, and buses.',
        keywords: ['metro', 'parking', 'accessibility', 'transportation', 'commute']
      },
      {
        question: 'What amenities and facilities does the South Extension center offer?',
        answer: 'Our South Extension center is equipped with premium air-conditioned classrooms, advanced biology labs, online learning portals, regular doubt-clearing sessions, comprehensive printed and digital study materials, mock test series, and expert one-on-one mentorship. We focus on creating a conducive environment for serious NEET aspirants.',
        keywords: ['facilities', 'amenities', 'classrooms', 'lab', 'AC']
      },
      {
        question: 'What are the fee details for South Extension Center?',
        answer: 'Class 11 & 12 Coaching: ₹72,200 per year. Foundation courses: ₹57,000 per year. Multiple payment options available including installment plans. Scholarship programs for merit-based and need-based cases. For personalized quotes and current offers, contact us at +91-9311946297.',
        keywords: ['fees', 'cost', 'charges', 'payment', 'scholarship']
      },
      {
        question: 'Do you offer free demo classes at the South Extension center?',
        answer: 'Absolutely! We encourage all prospective students to experience a free demo class. This gives you a firsthand feel of our teaching methodology, faculty expertise, and overall learning environment. Register for your free demo at cerebrumbiologyacademy.com or call +91-8826444334 to book your session.',
        keywords: ['demo', 'free class', 'trial', 'sample', 'visit']
      },
      {
        question: 'Which residential areas does the South Extension center serve?',
        answer: 'Our South Extension center serves premium South Delhi localities including Defence Colony, Lajpat Nagar (I, II, III), Greater Kailash (GK-I, GK-II), Hauz Khas, and surrounding areas. Students from these areas prefer our center for its convenient location and accessibility via metro.',
        keywords: ['areas', 'coverage', 'localities', 'neighborhoods', 'service area']
      }
    ]
  },
  {
    centerId: 'faridabad',
    centerName: 'Faridabad Center',
    city: 'Faridabad',
    address: 'Sector 17, Faridabad 121002',
    faqs: [
      {
        question: 'Where can I find the best NEET coaching in Faridabad?',
        answer: 'Cerebrum Biology Academy Faridabad is the leading NEET coaching center in Faridabad, conveniently located in Sector 17. We offer comprehensive NEET preparation with experienced faculty, proven methodology, and excellent student results. Our center is trusted by hundreds of students across Faridabad and nearby areas.',
        keywords: ['NEET coaching', 'Faridabad', 'biology coaching', 'best coaching']
      },
      {
        question: 'How can I reach Cerebrum Faridabad from Sector 17?',
        answer: 'Our Faridabad center is located directly in Sector 17, a prime commercial and educational hub in Faridabad. It\'s easily accessible by personal vehicles and public transportation. Detailed directions and maps are available at cerebrumbiologyacademy.com. For specific directions, call us at +91-8826444334.',
        keywords: ['directions', 'location', 'reach', 'address', 'transport']
      },
      {
        question: 'What are the batch timings at Cerebrum Faridabad Center?',
        answer: 'We offer comprehensive coaching with multiple batch options available Monday to Saturday: Morning Batch (8:00 AM - 11:00 AM), Afternoon Batch (2:00 PM - 5:00 PM), and Evening Batch (5:00 PM - 8:00 PM). Small batch sizes (15-20 students) ensure each student gets individual attention.',
        keywords: ['timings', 'batch', 'schedule', 'hours', 'classes']
      },
      {
        question: 'Is there parking and good accessibility at the Faridabad center?',
        answer: 'Yes, our Faridabad center in Sector 17 offers dedicated parking facilities within the premises. The location is well-connected by road and public transportation. Local transportation options like autos and cabs are readily available, making commute convenient for students from all parts of Faridabad.',
        keywords: ['parking', 'accessibility', 'transportation', 'commute', 'facilities']
      },
      {
        question: 'What facilities are available at Cerebrum Faridabad?',
        answer: 'Our Faridabad center is equipped with air-conditioned classrooms, fully operational biology labs, digital learning platforms, online mock tests, regular doubt-clearing sessions, comprehensive study materials, and personalized mentorship programs. We maintain high standards of education with emphasis on conceptual clarity.',
        keywords: ['facilities', 'classrooms', 'lab', 'AC', 'amenities']
      },
      {
        question: 'What is the fee structure at Faridabad Center?',
        answer: 'Annual fees for Class 11 & 12 students: ₹72,200. Foundation course fees: ₹57,000 per year. Flexible payment plans available. Scholarships offered for meritorious students. For detailed fee information and available discounts, contact us at +91-9311946297.',
        keywords: ['fees', 'cost', 'charges', 'payment', 'scholarship']
      },
      {
        question: 'Can I take a free demo class at Cerebrum Faridabad?',
        answer: 'Yes, we provide free demo classes for all prospective students interested in joining us. This allows you to experience our teaching approach, meet our faculty, and understand our curriculum. Book your free demo at cerebrumbiologyacademy.com or call +91-8826444334 to schedule your visit.',
        keywords: ['demo class', 'free trial', 'sample class', 'visit', 'experience']
      },
      {
        question: 'Which areas of Faridabad does the center serve?',
        answer: 'Our Faridabad center serves students from Old Faridabad, New Industrial Township, Sectors 1-28, Ballabgarh, and surrounding areas. We welcome students from across Faridabad and neighboring regions seeking quality NEET preparation with proven success track record.',
        keywords: ['areas', 'coverage', 'sectors', 'localities', 'neighborhoods']
      }
    ]
  },
  {
    centerId: 'green-park',
    centerName: 'Green Park Center',
    city: 'New Delhi',
    address: 'M-12, First Floor, Green Park Main Market, New Delhi 110016',
    faqs: [
      {
        question: 'Where is the best NEET coaching in Green Park, South Delhi?',
        answer: 'Cerebrum Biology Academy Green Park is a premier NEET coaching center located in the heart of Green Park Main Market. We provide world-class coaching with expert faculty, modern teaching aids, and a proven track record of excellent results. Our center is the preferred choice for serious NEET aspirants in South Delhi.',
        keywords: ['NEET coaching', 'Green Park', 'Delhi', 'biology coaching', 'best']
      },
      {
        question: 'How do I reach Cerebrum Green Park from Green Park Metro Station?',
        answer: 'Our Green Park center is just 2-3 minutes walk from Green Park Metro Station (Yellow Line). Exit the metro towards Green Park Main Market, and you\'ll find our center at M-12, First Floor. Alternatively, visit cerebrumbiologyacademy.com for detailed directions or call +91-8826444334 for navigation assistance.',
        keywords: ['directions', 'metro', 'reach', 'transport', 'location']
      },
      {
        question: 'What are the batch timings at the Green Park center?',
        answer: 'We offer flexible batch timings Monday to Saturday: Morning Batch (8:00 AM - 11:00 AM), Afternoon Batch (2:00 PM - 5:00 PM), and Evening Batch (5:00 PM - 8:00 PM). Each batch accommodates 15-20 students for personalized mentoring and focused learning outcomes.',
        keywords: ['timings', 'batch', 'schedule', 'hours', 'classes']
      },
      {
        question: 'Is there metro access and parking near Green Park center?',
        answer: 'Excellent connectivity is our strength! Green Park center is just 2-3 minutes from Green Park Metro Station (Yellow Line). Parking is available in the Green Park Main Market complex and nearby parking zones. The area is well-connected by public transport with multiple auto and cab services.',
        keywords: ['metro', 'parking', 'accessibility', 'transportation', 'commute']
      },
      {
        question: 'What facilities does Cerebrum Green Park offer?',
        answer: 'Our Green Park center features air-conditioned classrooms, advanced biology laboratories, online learning platform, regular doubt-clearing sessions, comprehensive study materials, mock test series, and dedicated mentorship. We prioritize creating a premium learning environment for NEET preparation.',
        keywords: ['facilities', 'classrooms', 'lab', 'AC', 'amenities']
      },
      {
        question: 'What is the fee structure at Green Park Center?',
        answer: 'Class 11 & 12 Coaching: ₹72,200 per year. Foundation courses: ₹57,000 per year. Flexible payment options including installment plans. Merit-based scholarships available. For personalized fee consultation and current offers, contact us at +91-9311946297.',
        keywords: ['fees', 'cost', 'charges', 'payment', 'scholarship']
      },
      {
        question: 'Do you offer free demo classes at Green Park?',
        answer: 'Absolutely! We encourage all prospective students to attend a free demo class. Experience our teaching methodology, interact with our expert faculty, and explore our learning facilities. Register for your free demo at cerebrumbiologyacademy.com or call +91-8826444334 to book a session.',
        keywords: ['demo', 'free class', 'trial', 'sample', 'experience']
      },
      {
        question: 'Which areas does the Green Park center serve?',
        answer: 'Our Green Park center primarily serves students from Hauz Khas, Safdarjung, SDA, IIT Delhi area, and surrounding South Delhi neighborhoods. Students from these premium localities prefer our center for its strategic location, excellent metro connectivity, and proven academic excellence.',
        keywords: ['areas', 'coverage', 'localities', 'neighborhoods', 'service area']
      }
    ]
  },
  {
    centerId: 'noida',
    centerName: 'Noida Center',
    city: 'Noida',
    address: 'Sector 62, Noida, UP 201301',
    faqs: [
      {
        question: 'Where can I find the best NEET coaching in Noida?',
        answer: 'Cerebrum Biology Academy Noida is one of the finest NEET coaching centers in Noida, located in Sector 62. We offer comprehensive NEET preparation with experienced faculty, advanced infrastructure, and consistently excellent results. Our center is trusted by hundreds of students from Noida and nearby regions.',
        keywords: ['NEET coaching', 'Noida', 'biology coaching', 'best coaching']
      },
      {
        question: 'How do I reach Cerebrum Noida from Sector 62?',
        answer: 'Our Noida center is strategically located in Sector 62, easily accessible by personal vehicles, autos, and taxis. The location is well-connected via major roads in Noida. Detailed directions and maps are available at cerebrumbiologyacademy.com. Contact us at +91-8826444334 for specific navigation assistance.',
        keywords: ['directions', 'location', 'reach', 'address', 'transport']
      },
      {
        question: 'What are the batch timings at Cerebrum Noida?',
        answer: 'We provide flexible coaching with multiple batch options available Monday to Saturday: Morning Batch (8:00 AM - 11:00 AM), Afternoon Batch (2:00 PM - 5:00 PM), and Evening Batch (5:00 PM - 8:00 PM). Batches are kept small at 15-20 students for individualized attention.',
        keywords: ['timings', 'batch', 'schedule', 'hours', 'classes']
      },
      {
        question: 'Is there parking and good connectivity at Noida center?',
        answer: 'Yes, our Noida center in Sector 62 offers dedicated parking facilities. The location is well-connected by road with easy access via local transportation including autos and cabs. Sector 62 is strategically positioned in Noida, making it accessible from multiple surrounding areas.',
        keywords: ['parking', 'accessibility', 'transportation', 'connectivity', 'commute']
      },
      {
        question: 'What facilities are provided at Cerebrum Noida?',
        answer: 'Our Noida center is equipped with air-conditioned classrooms, fully functional biology labs, online test platforms, regular doubt-clearing sessions, comprehensive study materials, mock test series, and expert mentorship programs. We maintain high academic standards with emphasis on conceptual understanding.',
        keywords: ['facilities', 'classrooms', 'lab', 'AC', 'amenities']
      },
      {
        question: 'What is the fee structure at Noida Center?',
        answer: 'Annual fees for Class 11 & 12 students: ₹72,200. Foundation course fees: ₹57,000 per year. Flexible payment plans available to suit student needs. Scholarships for meritorious students. For detailed fee information and applicable discounts, contact us at +91-9311946297.',
        keywords: ['fees', 'cost', 'charges', 'payment', 'scholarship']
      },
      {
        question: 'Can I attend a free demo class at Cerebrum Noida?',
        answer: 'Yes! We offer free demo classes for all interested prospective students. This gives you an opportunity to experience our teaching style, meet our faculty, and understand our comprehensive NEET curriculum. Book your free demo at cerebrumbiologyacademy.com or call +91-8826444334.',
        keywords: ['demo class', 'free trial', 'sample class', 'visit', 'experience']
      },
      {
        question: 'Which areas around Noida does the center serve?',
        answer: 'Our Noida center serves students from Sectors 50-70, Indirapuram, Vaishali, and parts of Ghaziabad. Students from across Noida and Eastern NCR region choose our center for quality NEET preparation and proven success track record.',
        keywords: ['areas', 'coverage', 'sectors', 'localities', 'neighborhoods']
      }
    ]
  }
];

/**
 * Helper function to get FAQs for a specific center
 * @param centerId - The unique identifier of the center
 * @returns CenterFAQ object for the specified center, or undefined if not found
 */
export function getCenterFAQs(centerId: string): CenterFAQ | undefined {
  return centerSpecificFAQs.find(center => center.centerId === centerId);
}

/**
 * Helper function to get all center FAQs in a structured format for schema
 * @returns Structured FAQ data from all centers
 */
export function getAllCenterFAQsForSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: centerSpecificFAQs.map((center, index) => ({
      '@type': 'Question',
      position: index + 1,
      mainEntity: {
        '@type': 'Organization',
        name: center.centerName,
        address: {
          '@type': 'PostalAddress',
          streetAddress: center.address,
          addressLocality: center.city,
          addressCountry: 'IN'
        }
      },
      acceptedAnswer: center.faqs.map(faq => ({
        '@type': 'Answer',
        text: faq.answer,
        author: {
          '@type': 'Organization',
          name: 'Cerebrum Biology Academy',
          url: 'https://cerebrumbiologyacademy.com',
          contactPoint: {
            '@type': 'ContactPoint',
            telephone: ['+91-8826444334', '+91-9311946297'],
            contactType: 'Customer Service'
          }
        }
      }))
    }))
  };
}

/**
 * Export contact information for use across FAQs
 */
export const faqContactInfo = {
  phone1: '+91-8826444334',
  phone2: '+91-9311946297',
  website: 'cerebrumbiologyacademy.com'
};
