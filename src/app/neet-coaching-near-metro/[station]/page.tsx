import { Metadata } from 'next'
import Link from 'next/link'
import { Phone, MapPin, Monitor, Users, Trophy, Train, MessageCircle, Clock } from 'lucide-react'
import { NoidaPageSchemas } from '@/components/seo/NoidaSchemas'
import { notFound } from 'next/navigation'

interface MetroStationData {
  name: string
  slug: string
  line: string
  lineColor: string
  area: string
  description: string
  studentCount: string
  coordinates: { lat: string; lng: string }
  nearbyAreas: string[]
  travelTime: string
  faqs: Array<{ question: string; answer: string }>
}

const metroStationData: Record<string, MetroStationData> = {
  'botanical-garden': {
    name: 'Botanical Garden Metro',
    slug: 'botanical-garden',
    line: 'Blue Line',
    lineColor: 'blue',
    area: 'Noida',
    description:
      'Botanical Garden is a major interchange station connecting Blue Line and Magenta Line. Perfect connectivity for students from Noida, Greater Noida, and Faridabad.',
    studentCount: '150+',
    coordinates: { lat: '28.5639', lng: '77.3340' },
    nearbyAreas: ['Sector 38', 'Sector 37', 'Sector 39', 'Okhla Bird Sanctuary', 'Kalindi Kunj'],
    travelTime: '40 min to South Extension',
    faqs: [
      {
        question: 'Is there NEET coaching near Botanical Garden Metro?',
        answer:
          'Yes! We offer online NEET Biology classes for students near Botanical Garden Metro. For hybrid mode, our South Extension center is 40 minutes away via Blue Line.',
      },
      {
        question: 'How do students from Botanical Garden area attend classes?',
        answer:
          '150+ students from Botanical Garden area prefer our online mode. For hybrid students, weekend offline classes at South Extension are easily accessible via Blue Line metro.',
      },
      {
        question: 'What is the fee for NEET coaching for Botanical Garden area students?',
        answer:
          'Online Biology classes: Rs 48,000/year. Hybrid mode (online + weekend offline): Rs 58,000/year. Save commute time with online mode.',
      },
    ],
  },
  'noida-city-centre': {
    name: 'Noida City Centre Metro',
    slug: 'noida-city-centre',
    line: 'Blue Line',
    lineColor: 'blue',
    area: 'Noida',
    description:
      'Noida City Centre is the commercial hub of Noida with excellent metro connectivity. Close to Sector 32, 33, and the business district.',
    studentCount: '120+',
    coordinates: { lat: '28.5746', lng: '77.3564' },
    nearbyAreas: ['Sector 32', 'Sector 33', 'Sector 34', 'Sector 35', 'Sector 25'],
    travelTime: '35 min to South Extension',
    faqs: [
      {
        question: 'Is there NEET coaching near Noida City Centre Metro?',
        answer:
          'We offer online NEET Biology classes for students near Noida City Centre. Our South Extension center is 35 minutes via Blue Line for hybrid mode.',
      },
      {
        question: 'How many students from Noida City Centre area are enrolled?',
        answer:
          '120+ students from Noida City Centre area (Sector 32-35) are enrolled in our NEET Biology program.',
      },
      {
        question: 'What is the travel time to South Extension from Noida City Centre?',
        answer:
          'South Extension is approximately 35 minutes via Blue Line metro. Many students prefer our online mode to save this commute time.',
      },
    ],
  },
  'sector-18-metro': {
    name: 'Sector 18 Metro',
    slug: 'sector-18-metro',
    line: 'Blue Line',
    lineColor: 'blue',
    area: 'Noida',
    description:
      'Sector 18 Metro serves the shopping and commercial hub of Noida including GIP Mall, Atta Market, and nearby residential areas.',
    studentCount: '100+',
    coordinates: { lat: '28.5684', lng: '77.3226' },
    nearbyAreas: ['Sector 18', 'Sector 16', 'Sector 17', 'GIP Mall', 'Atta Market'],
    travelTime: '30 min to South Extension',
    faqs: [
      {
        question: 'Is there NEET coaching near Sector 18 Metro Noida?',
        answer:
          'We offer online NEET Biology classes for students near Sector 18 Metro. South Extension center is 30 minutes via Blue Line for hybrid mode.',
      },
      {
        question: 'Can students from GIP Mall area join online classes?',
        answer:
          'Yes! 100+ students from Sector 18 area near GIP Mall are enrolled in our online NEET Biology program. Study from home without traffic hassles.',
      },
      {
        question: 'What modes are available for Sector 18 students?',
        answer:
          'Online (Rs 48,000/year), Hybrid with weekend offline (Rs 58,000/year), or Full offline at South Extension (Rs 68,000/year).',
      },
    ],
  },
  'sector-137-metro': {
    name: 'Sector 137 Metro',
    slug: 'sector-137-metro',
    line: 'Aqua Line',
    lineColor: 'cyan',
    area: 'Noida',
    description:
      'Sector 137 Metro on the Aqua Line serves the IT and Film City area of Noida. Popular among students from Sector 137-144 and nearby areas.',
    studentCount: '85+',
    coordinates: { lat: '28.4880', lng: '77.3395' },
    nearbyAreas: ['Sector 137', 'Sector 142', 'Sector 143', 'Film City', 'Knowledge Park'],
    travelTime: '45 min to South Extension',
    faqs: [
      {
        question: 'Is there NEET coaching near Sector 137 Metro?',
        answer:
          'We offer online NEET Biology classes for students near Sector 137 Metro. Online mode is most popular due to the longer commute to Delhi.',
      },
      {
        question: 'How many students from Film City area are enrolled?',
        answer:
          '85+ students from Sector 137 and Film City area are enrolled. Most prefer online mode due to excellent focus environment at home.',
      },
      {
        question: 'Is Aqua Line connected to South Extension?',
        answer:
          'Aqua Line connects at Noida Sector 52 to Blue Line, then South Extension is accessible. Total travel time is ~45 minutes. Online mode saves this commute.',
      },
    ],
  },
  'pari-chowk-metro': {
    name: 'Pari Chowk Metro',
    slug: 'pari-chowk-metro',
    line: 'Aqua Line',
    lineColor: 'cyan',
    area: 'Greater Noida',
    description:
      'Pari Chowk Metro serves Greater Noida including Knowledge Park, Alpha, Beta, Gamma sectors, and nearby areas.',
    studentCount: '110+',
    coordinates: { lat: '28.4692', lng: '77.5035' },
    nearbyAreas: ['Pari Chowk', 'Knowledge Park', 'Alpha 1 & 2', 'Beta 1 & 2', 'Gamma 1 & 2'],
    travelTime: '60 min to South Extension',
    faqs: [
      {
        question: 'Is there NEET coaching near Pari Chowk Metro Greater Noida?',
        answer:
          'We offer online NEET Biology classes for Greater Noida students near Pari Chowk. Online mode is highly recommended due to distance from Delhi.',
      },
      {
        question: 'Do you have students from Greater Noida Knowledge Park?',
        answer:
          '110+ students from Pari Chowk area including Knowledge Park, Alpha, Beta, Gamma sectors are enrolled in our online NEET program.',
      },
      {
        question: 'Is online coaching effective for Greater Noida students?',
        answer:
          'Absolutely! 90% of our Greater Noida students prefer online mode. Save 2-3 hours daily on commute and focus entirely on studies.',
      },
    ],
  },

  // ============================================
  // South Delhi Metro Stations — All near South Extension / Green Park center
  // ============================================
  'green-park-metro': {
    name: 'Green Park Metro',
    slug: 'green-park-metro',
    line: 'Yellow Line',
    lineColor: 'yellow',
    area: 'South Delhi',
    description:
      'Green Park Metro on the Yellow Line offers easy access to premium residential areas. Our South Extension center is just 10-15 minutes away. Students from Green Park, Hauz Khas, Safdarjung, and Andrews Ganj areas can reach us quickly.',
    studentCount: '200+',
    coordinates: { lat: '28.5597', lng: '77.2068' },
    nearbyAreas: [
      'Green Park',
      'Hauz Khas',
      'Safdarjung Enclave',
      'Andrews Ganj',
      'Aurobindo Market',
    ],
    travelTime: '10 min to South Extension',
    faqs: [
      {
        question: 'Is there NEET coaching near Green Park Metro?',
        answer:
          'Yes! Our South Extension center (D 35, South Extension Part 2) is just 10 minutes from Green Park Metro via Yellow Line or auto. 200+ students from Green Park area are enrolled. Both offline and online classes available.',
      },
      {
        question: 'How do I reach Cerebrum from Green Park Metro?',
        answer:
          'From Green Park Metro, take an auto or cab to South Extension Part 2 (10 min, Rs 30-50). Or take Yellow Line one stop towards Rajiv Chowk and walk 5 minutes from South Extension Metro (Violet Line interchange at Central Secretariat).',
      },
      {
        question: 'What is the fee for NEET coaching near Green Park?',
        answer:
          'NEET Biology coaching: Offline at South Extension - Rs 48,000-98,000/year. Online - Rs 48,000/year. Hybrid (online + weekend offline) - Rs 58,000/year. EMI options available.',
      },
    ],
  },
  'iit-delhi-metro': {
    name: 'IIT Delhi Metro',
    slug: 'iit-delhi-metro',
    line: 'Magenta Line',
    lineColor: 'magenta',
    area: 'South Delhi',
    description:
      'IIT Delhi Metro station on the Magenta Line is closest to the famous Kalu Sarai coaching hub. Students from IIT campus, JNU, Ber Sarai, and Katwaria Sarai can reach our South Extension center easily.',
    studentCount: '150+',
    coordinates: { lat: '28.5467', lng: '77.1855' },
    nearbyAreas: ['IIT Delhi', 'Kalu Sarai', 'Ber Sarai', 'Katwaria Sarai', 'SDA', 'JNU'],
    travelTime: '15 min to South Extension',
    faqs: [
      {
        question: 'Is there NEET coaching near IIT Delhi Metro?',
        answer:
          'Yes! Our South Extension center is 15 minutes from IIT Delhi Metro. 150+ students from IIT Delhi area, Kalu Sarai, and JNU campus families are enrolled. We offer special flexible timings for campus students.',
      },
      {
        question: 'How do students from Kalu Sarai reach your center?',
        answer:
          'From IIT Delhi Metro, take Magenta Line to Hauz Khas, then Yellow Line one stop to Green Park. Auto from there to South Extension (5 min). Or direct auto from Kalu Sarai (15 min).',
      },
      {
        question: 'Do you offer coaching for IIT/JNU faculty children?',
        answer:
          'Yes! We have many students whose parents are at IIT Delhi and JNU. We offer flexible batch timings and special academic discounts for campus families. Contact us for details.',
      },
    ],
  },
  'aiims-metro': {
    name: 'AIIMS Metro',
    slug: 'aiims-metro',
    line: 'Yellow Line',
    lineColor: 'yellow',
    area: 'South Delhi',
    description:
      "AIIMS Metro connects to India's premier medical institution. Our founder Dr. Shekhar is an AIIMS alumnus. Students from AIIMS campus, Kidwai Nagar, Andrews Ganj, and Safdarjung area can easily reach our South Extension center.",
    studentCount: '180+',
    coordinates: { lat: '28.5689', lng: '77.2078' },
    nearbyAreas: ['AIIMS', 'Kidwai Nagar', 'Andrews Ganj', 'Safdarjung Enclave', 'INA Market'],
    travelTime: '8 min to South Extension',
    faqs: [
      {
        question: 'Is there NEET coaching near AIIMS Metro?',
        answer:
          'Yes! Our South Extension center is just 8 minutes from AIIMS Metro. Our founder Dr. Shekhar C Singh is an AIIMS alumnus himself. 180+ students from AIIMS area enrolled.',
      },
      {
        question: 'How do I reach Cerebrum from AIIMS Metro?',
        answer:
          'From AIIMS Metro, take a short auto ride (8 min, Rs 30) to South Extension Part 2. Our center at D 35 is well-known. Alternatively, walk to Safdarjung and take a shared auto.',
      },
      {
        question: 'Is your faculty from AIIMS?',
        answer:
          "Yes! Our founder Dr. Shekhar C Singh trained at AIIMS. Our Biology coaching is designed by AIIMS-trained faculty with 15+ years experience. That's why students near AIIMS prefer us.",
      },
    ],
  },
  'greater-kailash-metro': {
    name: 'Greater Kailash Metro',
    slug: 'greater-kailash-metro',
    line: 'Magenta Line',
    lineColor: 'magenta',
    area: 'South Delhi',
    description:
      'Greater Kailash Metro on the Magenta Line serves the affluent GK area. Students from GK-I, GK-II, CR Park, East of Kailash, and Kalkaji can reach our South Extension center quickly.',
    studentCount: '170+',
    coordinates: { lat: '28.5472', lng: '77.2390' },
    nearbyAreas: [
      'Greater Kailash I & II',
      'CR Park',
      'East of Kailash',
      'Kalkaji',
      'Archana Complex',
    ],
    travelTime: '15 min to South Extension',
    faqs: [
      {
        question: 'Is there NEET coaching near Greater Kailash Metro?',
        answer:
          'Yes! Our South Extension center is 15 minutes from GK Metro. 170+ students from GK-I, GK-II, CR Park, and East of Kailash are enrolled in our NEET Biology program.',
      },
      {
        question: 'How do GK students reach South Extension center?',
        answer:
          'From Greater Kailash Metro, take an auto or cab directly to South Extension Part 2 (15 min, Rs 50-80). The center is at D 35, South Extension Part 2.',
      },
      {
        question: 'Which schools from GK area send students to Cerebrum?',
        answer:
          'Students from DPS East of Kailash, GD Goenka GK-II, Apeejay School, and many CR Park schools attend our NEET Biology coaching. We serve all top schools in the GK belt.',
      },
    ],
  },
  'saket-metro': {
    name: 'Saket Metro',
    slug: 'saket-metro',
    line: 'Yellow Line',
    lineColor: 'yellow',
    area: 'South Delhi',
    description:
      'Saket Metro on the Yellow Line serves the bustling Saket area with Select City Walk, DLF Place, and surrounding residential colonies. Our South Extension center is easily accessible.',
    studentCount: '130+',
    coordinates: { lat: '28.5226', lng: '77.2101' },
    nearbyAreas: ['Saket', 'Malviya Nagar', 'Panchsheel Park', 'Hauz Khas', 'Select City Walk'],
    travelTime: '12 min to South Extension',
    faqs: [
      {
        question: 'Is there NEET coaching near Saket Metro?',
        answer:
          'Yes! Our South Extension center is 12 minutes from Saket Metro via Yellow Line. 130+ students from Saket, Malviya Nagar, and Panchsheel Park are enrolled.',
      },
      {
        question: 'How do I reach Cerebrum from Saket Metro?',
        answer:
          'From Saket Metro, take Yellow Line towards Rajiv Chowk (3 stops to Green Park area). Or take a direct auto to South Extension Part 2 (12 min, Rs 40-60).',
      },
      {
        question: 'Is there NEET coaching near Select City Walk Saket?',
        answer:
          'Yes! Students near Select City Walk can reach our South Extension center in just 12 minutes. We have 130+ students from Saket area. Both offline and online modes available.',
      },
    ],
  },
  'malviya-nagar-metro': {
    name: 'Malviya Nagar Metro',
    slug: 'malviya-nagar-metro',
    line: 'Yellow Line',
    lineColor: 'yellow',
    area: 'South Delhi',
    description:
      'Malviya Nagar Metro serves the student-friendly Malviya Nagar area with affordable PGs and hostels. Many NEET aspirants from this area attend our South Extension center.',
    studentCount: '140+',
    coordinates: { lat: '28.5285', lng: '77.2095' },
    nearbyAreas: ['Malviya Nagar', 'Saket', 'Panchsheel Park', 'Sheikh Sarai', 'Shivalik'],
    travelTime: '12 min to South Extension',
    faqs: [
      {
        question: 'Is there NEET coaching near Malviya Nagar Metro?',
        answer:
          'Yes! Our South Extension center is 12 minutes from Malviya Nagar Metro. 140+ students from Malviya Nagar, Sheikh Sarai, and Shivalik are enrolled in our NEET Biology program.',
      },
      {
        question: 'Is Malviya Nagar good for NEET preparation?',
        answer:
          'Malviya Nagar is one of the best areas for NEET students — affordable PGs, proximity to coaching centers, and excellent metro connectivity. Our South Extension center is just 12 minutes away.',
      },
      {
        question: 'Do you offer hostel recommendations for Malviya Nagar students?',
        answer:
          "While we don't run hostels, we can recommend trusted PGs near Malviya Nagar and South Extension for outstation NEET students. Contact our counselors for guidance.",
      },
    ],
  },
  'rk-puram-metro': {
    name: 'RK Puram Metro',
    slug: 'rk-puram-metro',
    line: 'Magenta Line',
    lineColor: 'magenta',
    area: 'South Delhi',
    description:
      'RK Puram Metro connects the large government residential colony with coaching centers. Students from DPS RK Puram, Vasant Vihar, Moti Bagh, and Munirka area attend our classes.',
    studentCount: '120+',
    coordinates: { lat: '28.5681', lng: '77.1769' },
    nearbyAreas: ['RK Puram', 'Munirka', 'Vasant Vihar', 'Moti Bagh', 'Bhikaji Cama Place'],
    travelTime: '15 min to South Extension',
    faqs: [
      {
        question: 'Is there NEET coaching near RK Puram Metro?',
        answer:
          'Yes! Our South Extension center is 15 minutes from RK Puram Metro. 120+ students from RK Puram, DPS RK Puram, Vasant Vihar are enrolled in our NEET Biology program.',
      },
      {
        question: 'Do DPS RK Puram students attend Cerebrum?',
        answer:
          'Yes! DPS RK Puram is one of our feeder schools. Students from DPS RK Puram consistently score 650+ in NEET Biology with our coaching.',
      },
      {
        question: 'How do I reach South Extension from RK Puram?',
        answer:
          'From RK Puram Metro, take Magenta Line to Hauz Khas, then Yellow Line or auto to South Extension (15 min total). Or direct auto via Africa Avenue (12-15 min).',
      },
    ],
  },
  'munirka-metro': {
    name: 'Munirka Metro',
    slug: 'munirka-metro',
    line: 'Magenta Line',
    lineColor: 'magenta',
    area: 'South Delhi',
    description:
      'Munirka Metro serves the vibrant student hub near JNU. Many outstation NEET aspirants stay in Munirka PGs and attend our coaching classes.',
    studentCount: '100+',
    coordinates: { lat: '28.5580', lng: '77.1672' },
    nearbyAreas: ['Munirka', 'JNU', 'Vasant Vihar', 'RK Puram', 'Nelson Mandela Marg'],
    travelTime: '18 min to South Extension',
    faqs: [
      {
        question: 'Is there NEET coaching near Munirka Metro?',
        answer:
          'Yes! Our South Extension center is 18 minutes from Munirka Metro. 100+ students from Munirka, JNU area, and Vasant Vihar are enrolled. Online classes also available.',
      },
      {
        question: 'Is Munirka good for NEET dropper students?',
        answer:
          'Munirka is popular among NEET droppers — affordable PGs, proximity to JNU, and easy metro access to coaching centers. Our South Extension center is 18 minutes by metro.',
      },
      {
        question: 'Do JNU area students join your coaching?',
        answer:
          'Yes! Students from JNU campus families, Munirka PGs, and nearby hostels attend our NEET Biology classes. Flexible timings available for dropper batches.',
      },
    ],
  },
  'kalkaji-mandir-metro': {
    name: 'Kalkaji Mandir Metro',
    slug: 'kalkaji-mandir-metro',
    line: 'Violet Line',
    lineColor: 'purple',
    area: 'South Delhi',
    description:
      'Kalkaji Mandir Metro is a Violet-Magenta interchange station serving students from Kalkaji, CR Park, Govind Puri, and Nehru Place. Close to Lotus Temple and multiple residential areas.',
    studentCount: '110+',
    coordinates: { lat: '28.5436', lng: '77.2596' },
    nearbyAreas: ['Kalkaji', 'CR Park', 'Govind Puri', 'Nehru Place', 'Lotus Temple'],
    travelTime: '20 min to South Extension',
    faqs: [
      {
        question: 'Is there NEET coaching near Kalkaji Mandir Metro?',
        answer:
          'Yes! Our South Extension center is 20 minutes from Kalkaji Mandir Metro via Violet Line. 110+ students from Kalkaji, CR Park, and Govind Puri are enrolled.',
      },
      {
        question: 'How do CR Park students reach your center?',
        answer:
          'From Kalkaji Mandir Metro, take Violet Line towards Central Secretariat (4 stops). Auto from there to South Extension Part 2 (5 min). Total: 20 minutes.',
      },
      {
        question: 'Do you have students from Kalkaji area schools?',
        answer:
          'Yes! Students from Apeejay School Kalkaji, CRPF Public School, and Lotus Valley attend our NEET Biology coaching. We serve the entire Kalkaji-CR Park belt.',
      },
    ],
  },
  'nehru-place-metro': {
    name: 'Nehru Place Metro',
    slug: 'nehru-place-metro',
    line: 'Violet Line',
    lineColor: 'purple',
    area: 'South Delhi',
    description:
      'Nehru Place Metro serves the IT hub area and nearby residential colonies. Students from Nehru Place, East of Kailash, Alaknanda, and Kalkaji attend our coaching.',
    studentCount: '90+',
    coordinates: { lat: '28.5498', lng: '77.2526' },
    nearbyAreas: ['Nehru Place', 'East of Kailash', 'Kalkaji', 'Alaknanda', 'CR Park'],
    travelTime: '20 min to South Extension',
    faqs: [
      {
        question: 'Is there NEET coaching near Nehru Place Metro?',
        answer:
          'Yes! Our South Extension center is 20 minutes from Nehru Place Metro. 90+ students from Nehru Place, East of Kailash, and Alaknanda are enrolled.',
      },
      {
        question: 'How do I reach South Extension from Nehru Place?',
        answer:
          'From Nehru Place Metro, take Violet Line towards Central Secretariat (5 stops). Auto to South Extension Part 2 (5 min). Or direct auto (20 min, Rs 60-80).',
      },
      {
        question: 'Do you offer evening batches for Nehru Place area students?',
        answer:
          "Yes! We have evening batches (5-8 PM) ideal for students who finish school by 3-4 PM. Weekend batches also available for working parents' convenience.",
      },
    ],
  },
  'lajpat-nagar-metro': {
    name: 'Lajpat Nagar Metro',
    slug: 'lajpat-nagar-metro',
    line: 'Violet Line',
    lineColor: 'purple',
    area: 'South Delhi',
    description:
      'Lajpat Nagar Metro is the closest metro station to our South Extension center. Students from Lajpat Nagar, Defence Colony, and South Extension can walk to our center in minutes.',
    studentCount: '250+',
    coordinates: { lat: '28.5699', lng: '77.2434' },
    nearbyAreas: ['Lajpat Nagar', 'Defence Colony', 'South Extension', 'Jangpura', 'GK'],
    travelTime: '5 min walk to South Extension',
    faqs: [
      {
        question: 'Is there NEET coaching near Lajpat Nagar Metro?',
        answer:
          'Yes! Our flagship South Extension center is just a 5-minute walk from Lajpat Nagar Metro. 250+ students from Lajpat Nagar, Defence Colony, and South Extension are enrolled. This is our closest metro station!',
      },
      {
        question: 'How do I walk from Lajpat Nagar Metro to Cerebrum?',
        answer:
          'Exit Lajpat Nagar Metro from Gate 1. Walk towards South Extension market (5 min). Our center is at D 35, South Extension Part 2. Landmark: Near Ring Road crossing.',
      },
      {
        question: 'Why is South Extension the best location for NEET coaching?',
        answer:
          "South Extension is central Delhi's coaching hub — connected by Violet Line (Lajpat Nagar Metro), Yellow Line (Green Park), and multiple bus routes. 250+ students from 30+ areas attend here. Our flagship center has the most experienced faculty.",
      },
    ],
  },

  // ============================================
  // Gurugram Metro Stations — All near Sector 51 center
  // ============================================
  'huda-city-centre-metro': {
    name: 'HUDA City Centre Metro',
    slug: 'huda-city-centre-metro',
    line: 'Yellow Line',
    lineColor: 'yellow',
    area: 'Gurugram',
    description:
      'HUDA City Centre is the terminal station of Delhi Metro Yellow Line in Gurugram. Direct connection from Delhi. Our Sector 51 center is just 15 minutes away via Rapid Metro or auto.',
    studentCount: '220+',
    coordinates: { lat: '28.4595', lng: '77.0724' },
    nearbyAreas: ['Sector 43', 'Sector 44', 'Sector 56', 'Sushant Lok', 'South City 1'],
    travelTime: '15 min to Sector 51 center',
    faqs: [
      {
        question: 'Is there NEET coaching near HUDA City Centre Metro?',
        answer:
          'Yes! Our Gurugram center at M2K Corporate Park, Sector 51 is 15 minutes from HUDA City Centre Metro. Take Rapid Metro to Sector 55-56 station (10 min) then 5 min walk. 220+ Gurugram students enrolled.',
      },
      {
        question: 'How do Delhi students reach Gurugram center via HUDA City Centre?',
        answer:
          'Take Yellow Line to HUDA City Centre (terminal). Then Rapid Metro towards Sector 55-56 (10 min). Our center is 5 min walk from Sector 55-56 Rapid Metro. Total from Rajiv Chowk: 45 min.',
      },
      {
        question: 'Is Gurugram center better than South Extension for HUDA area students?',
        answer:
          'Yes! Gurugram center saves you 1-2 hours daily commute. Same AIIMS faculty, same curriculum, smaller batches. 220+ students from Sushant Lok, Sector 43-56 attend here.',
      },
    ],
  },
  'iffco-chowk-metro': {
    name: 'IFFCO Chowk Metro',
    slug: 'iffco-chowk-metro',
    line: 'Yellow Line',
    lineColor: 'yellow',
    area: 'Gurugram',
    description:
      'IFFCO Chowk is a major Gurugram junction connecting Yellow Line with Rapid Metro. Students from Sector 14, 29, MG Road, DLF Phase 1, and Old Gurugram can reach our Sector 51 center quickly.',
    studentCount: '180+',
    coordinates: { lat: '28.4724', lng: '77.0724' },
    nearbyAreas: ['Sector 14', 'Sector 29', 'MG Road', 'DLF Phase 1', 'Old Gurugram'],
    travelTime: '20 min to Sector 51 center',
    faqs: [
      {
        question: 'Is there NEET coaching near IFFCO Chowk Metro?',
        answer:
          'Yes! Our Gurugram center at Sector 51 is 20 minutes from IFFCO Chowk. Take Rapid Metro connection to Sector 55-56 station. 180+ students from IFFCO Chowk area enrolled.',
      },
      {
        question: 'Which areas near IFFCO Chowk do you serve?',
        answer:
          'We serve Sector 14, 29, MG Road, DLF Phase 1, Old Gurugram, and Udyog Vihar. All accessible within 20 minutes of our Sector 51 center.',
      },
      {
        question: 'What fee options for IFFCO Chowk area students?',
        answer:
          'Offline at Sector 51: Rs 48,000-98,000/year. Online: Rs 48,000/year. Hybrid (online + weekend offline): Rs 58,000/year. EMI available.',
      },
    ],
  },
  'mg-road-metro': {
    name: 'MG Road Metro',
    slug: 'mg-road-metro',
    line: 'Yellow Line',
    lineColor: 'yellow',
    area: 'Gurugram',
    description:
      "MG Road Metro connects Gurugram's main commercial corridor. Students from MG Road, DLF Phase 1-2, and Sikanderpur area attend our Sector 51 center via Rapid Metro.",
    studentCount: '140+',
    coordinates: { lat: '28.4796', lng: '77.0826' },
    nearbyAreas: ['MG Road', 'DLF Phase 1', 'DLF Phase 2', 'Sikanderpur', 'Sahara Mall'],
    travelTime: '25 min to Sector 51 center',
    faqs: [
      {
        question: 'Is there NEET coaching near MG Road Metro Gurugram?',
        answer:
          'Yes! Our Sector 51 center is 25 minutes from MG Road Metro via Rapid Metro. 140+ students from MG Road, DLF Phase 1-2 area are enrolled.',
      },
      {
        question: 'How do I reach Sector 51 from MG Road Metro?',
        answer:
          'Take Rapid Metro from MG Road towards Sector 55-56 (15 min). Our center at M2K Corporate Park is a 5 min walk from Sector 55-56 station.',
      },
      {
        question: 'Do you have students from DLF Phase 1 area?',
        answer:
          'Yes! 165+ students from DLF Phase 1 alone attend our coaching. DLF Phase 1 is well connected via MG Road Metro and Rapid Metro to our center.',
      },
    ],
  },
  'sikanderpur-metro': {
    name: 'Sikanderpur Metro',
    slug: 'sikanderpur-metro',
    line: 'Yellow Line',
    lineColor: 'yellow',
    area: 'Gurugram',
    description:
      'Sikanderpur Metro serves DLF Cyber City and connects to Rapid Metro. Students from Cyber Hub, DLF Phase 2-3, and Golf Course Road tech families attend our coaching.',
    studentCount: '160+',
    coordinates: { lat: '28.4824', lng: '77.0896' },
    nearbyAreas: ['DLF Cyber City', 'DLF Phase 2', 'DLF Phase 3', 'Golf Course Road', 'Cyber Hub'],
    travelTime: '25 min to Sector 51 center',
    faqs: [
      {
        question: 'Is there NEET coaching near Sikanderpur Metro?',
        answer:
          'Yes! Our Sector 51 center is 25 minutes from Sikanderpur Metro. 160+ students from Cyber City, DLF Phase 2-3, and Golf Course Road families are enrolled.',
      },
      {
        question: 'Do you serve students from Cyber City families?',
        answer:
          'Absolutely! Many students whose parents work at DLF Cyber Hub Fortune 500 companies attend our coaching. We offer flexible timings and premium small batches of 15 students.',
      },
      {
        question: 'How do I reach your center from Sikanderpur?',
        answer:
          'Take Rapid Metro from Sikanderpur to Sector 55-56 (15 min). Walk 5 min to M2K Corporate Park, Sector 51. Or direct auto via Golf Course Road (20 min).',
      },
    ],
  },
  'guru-dronacharya-metro': {
    name: 'Guru Dronacharya Metro',
    slug: 'guru-dronacharya-metro',
    line: 'Yellow Line',
    lineColor: 'yellow',
    area: 'Gurugram',
    description:
      "Guru Dronacharya Metro serves DLF Phase 1 and 2 — Gurugram's most established residential areas with families from top schools like The Shri Ram School and DPS Gurugram.",
    studentCount: '130+',
    coordinates: { lat: '28.4825', lng: '77.0962' },
    nearbyAreas: ['DLF Phase 1', 'DLF Phase 2', 'Udyog Vihar', 'Bristol Chowk', 'Qutab Plaza'],
    travelTime: '30 min to Sector 51 center',
    faqs: [
      {
        question: 'Is there NEET coaching near Guru Dronacharya Metro?',
        answer:
          'Yes! Our Sector 51 center is 30 minutes from Guru Dronacharya Metro. 130+ students from DLF Phase 1-2 attend. Also available: 100% online classes from home.',
      },
      {
        question: 'Which schools near Guru Dronacharya send students?',
        answer:
          'The Shri Ram School DLF Phase 3, DPS Gurugram, GD Goenka, and Heritage School students attend our NEET Biology coaching. We serve all top Gurugram schools.',
      },
      {
        question: 'Is online mode better for DLF Phase 1 students?',
        answer:
          'Many DLF Phase 1 students choose hybrid mode — online weekdays + offline weekends at Sector 51. Saves commute and gives best of both worlds.',
      },
    ],
  },
  'sector-54-chowk-rapid-metro': {
    name: 'Sector 54 Chowk Rapid Metro',
    slug: 'sector-54-chowk-rapid-metro',
    line: 'Rapid Metro',
    lineColor: 'orange',
    area: 'Gurugram',
    description:
      'Sector 54 Chowk Rapid Metro serves the ultra-premium Golf Course Road area. Just 10 minutes from our Sector 51 center — one of the closest metro stations.',
    studentCount: '95+',
    coordinates: { lat: '28.4475', lng: '77.0670' },
    nearbyAreas: ['Sector 54', 'Golf Course Road', 'DLF Phase 5', 'DLF Magnolias', 'DLF Camellias'],
    travelTime: '10 min to Sector 51 center',
    faqs: [
      {
        question: 'Is there NEET coaching near Sector 54 Chowk?',
        answer:
          'Yes! Our center at M2K Corporate Park, Sector 51 is just 10 minutes from Sector 54 Chowk Rapid Metro. Walk or quick auto ride. 95+ students from Golf Course Road area enrolled.',
      },
      {
        question: 'Do students from DLF Magnolias/Camellias attend?',
        answer:
          'Yes! Students from DLF Magnolias, Camellias, Aralias (Golf Course Road ultra-premium towers) attend our premium Pinnacle batch with just 10-12 students per batch.',
      },
      {
        question: 'What batch sizes do you offer for Golf Course Road students?',
        answer:
          'Pinnacle batch: 10-12 students (Rs 98,000/year). Most Golf Course Road families prefer this for maximum personal attention from AIIMS faculty.',
      },
    ],
  },
  'sector-55-56-rapid-metro': {
    name: 'Sector 55-56 Rapid Metro',
    slug: 'sector-55-56-rapid-metro',
    line: 'Rapid Metro',
    lineColor: 'orange',
    area: 'Gurugram',
    description:
      'Sector 55-56 Rapid Metro is the CLOSEST metro station to our center — just a 5-minute walk to M2K Corporate Park, Sector 51. The most convenient station for our students.',
    studentCount: '250+',
    coordinates: { lat: '28.4389', lng: '77.0573' },
    nearbyAreas: ['Sector 55', 'Sector 56', 'Sector 57', 'South City 2', 'Sector 49', 'Sector 51'],
    travelTime: '5 min walk to center',
    faqs: [
      {
        question: 'Which metro station is closest to Cerebrum Gurugram center?',
        answer:
          'Sector 55-56 Rapid Metro station is the closest — just a 5-minute walk to our center at M2K Corporate Park, Sector 51. 250+ students use this station daily.',
      },
      {
        question: 'How do I reach Cerebrum from Sector 55-56 Metro?',
        answer:
          'Exit Sector 55-56 Rapid Metro. Walk towards Sector 51 (5 min). M2K Corporate Park is on the main road. Landmark: Opposite Mayfield Garden entrance. Easiest route to our center!',
      },
      {
        question: 'Can I come from Delhi via Rapid Metro?',
        answer:
          'Yes! Take Yellow Line to HUDA City Centre, switch to Rapid Metro towards Sector 55-56 (10 min). Walk 5 min to our center. Total from Rajiv Chowk: ~45 min.',
      },
    ],
  },
  'sector-42-43-rapid-metro': {
    name: 'Sector 42-43 Rapid Metro',
    slug: 'sector-42-43-rapid-metro',
    line: 'Rapid Metro',
    lineColor: 'orange',
    area: 'Gurugram',
    description:
      'Sector 42-43 Rapid Metro connects to HUDA City Centre Yellow Line, providing seamless Delhi-Gurugram access for students coming to our Sector 51 center.',
    studentCount: '110+',
    coordinates: { lat: '28.4524', lng: '77.0701' },
    nearbyAreas: ['Sector 42', 'Sector 43', 'Sushant Lok', 'HUDA City Centre'],
    travelTime: '12 min to Sector 51 center',
    faqs: [
      {
        question: 'Is there NEET coaching near Sector 42-43 Metro?',
        answer:
          'Yes! Our Sector 51 center is 12 minutes from Sector 42-43 Rapid Metro. 110+ students from Sushant Lok and Sector 42-43 area are enrolled.',
      },
      {
        question: 'Do Sushant Lok students attend your coaching?',
        answer:
          'Yes! 220+ students from Sushant Lok attend our NEET Biology coaching. It is 12 minutes from Sector 42-43 Rapid Metro to our center.',
      },
      {
        question: 'What is nearby Sector 42-43 Metro station?',
        answer:
          'Galaxy Hotel, Sector 43 Market, and Sushant Lok are nearby. Our center at M2K Corporate Park, Sector 51 is a short Rapid Metro ride away.',
      },
    ],
  },
  'phase-1-rapid-metro': {
    name: 'Phase 1 Rapid Metro',
    slug: 'phase-1-rapid-metro',
    line: 'Rapid Metro',
    lineColor: 'orange',
    area: 'Gurugram',
    description:
      "Phase 1 Rapid Metro serves DLF Phase 1 — Gurugram's oldest premium residential area. Students from Phase 1, Galleria Market, and Qutab Plaza area attend our coaching.",
    studentCount: '165+',
    coordinates: { lat: '28.4744', lng: '77.0856' },
    nearbyAreas: ['DLF Phase 1', 'MG Road', 'DLF Galleria', 'Qutab Plaza', 'Sikanderpur'],
    travelTime: '20 min to Sector 51 center',
    faqs: [
      {
        question: 'Is there NEET coaching near Phase 1 Rapid Metro?',
        answer:
          'Yes! Our Sector 51 center is 20 minutes from Phase 1 Rapid Metro. 165+ students from DLF Phase 1 are enrolled in our NEET Biology program.',
      },
      {
        question: 'Which schools from DLF Phase 1 send students?',
        answer:
          'Students from The Shri Ram School, DPS Gurugram, Heritage School, and GD Goenka attend. DLF Phase 1 is one of our biggest feeder areas.',
      },
      {
        question: 'Is there parking at your Sector 51 center?',
        answer:
          'Yes! M2K Corporate Park has ample paid parking. Most DLF Phase 1 families drive (15 min) or take Rapid Metro (20 min). Both work well.',
      },
    ],
  },
  'phase-2-rapid-metro': {
    name: 'Phase 2 Rapid Metro',
    slug: 'phase-2-rapid-metro',
    line: 'Rapid Metro',
    lineColor: 'orange',
    area: 'Gurugram',
    description:
      'Phase 2 Rapid Metro connects DLF Phase 2 and Cyber City. Students from IT professional families in this area attend our premium NEET coaching batches.',
    studentCount: '120+',
    coordinates: { lat: '28.4786', lng: '77.0896' },
    nearbyAreas: ['DLF Phase 2', 'DLF Phase 3', 'Cyber Hub', 'Sikanderpur'],
    travelTime: '22 min to Sector 51 center',
    faqs: [
      {
        question: 'Is there NEET coaching near Phase 2 Rapid Metro?',
        answer:
          'Yes! Our Sector 51 center is 22 minutes via Rapid Metro. 120+ students from DLF Phase 2 and Cyber City families are enrolled.',
      },
      {
        question: 'Do you serve Cyber Hub area families?',
        answer:
          'Yes! Many students whose parents work at DLF Cyber Hub attend our coaching. We offer flexible evening batches (5-8 PM) and weekend batches for working families.',
      },
      {
        question: 'What makes Cerebrum better than Delhi coaching for Phase 2 students?',
        answer:
          'Save 2-3 hours daily commute! Same AIIMS faculty, same curriculum as our Delhi center. Smaller batches (15 students). Most Phase 2 families prefer local coaching.',
      },
    ],
  },
  'phase-3-rapid-metro': {
    name: 'Phase 3 Rapid Metro',
    slug: 'phase-3-rapid-metro',
    line: 'Rapid Metro',
    lineColor: 'orange',
    area: 'Gurugram',
    description:
      'Phase 3 Rapid Metro serves DLF Phase 3 and 4 with Galleria Market and premium residential areas. Families from The Shri Ram School catchment area attend our coaching.',
    studentCount: '135+',
    coordinates: { lat: '28.4683', lng: '77.0823' },
    nearbyAreas: [
      'DLF Phase 3',
      'DLF Phase 4',
      'Galleria Market',
      'Nathupur',
      'The Shri Ram School',
    ],
    travelTime: '18 min to Sector 51 center',
    faqs: [
      {
        question: 'Is there NEET coaching near Phase 3 Rapid Metro?',
        answer:
          'Yes! Our Sector 51 center is 18 minutes from Phase 3 Rapid Metro. 135+ students from DLF Phase 3-4 and Galleria Market area are enrolled.',
      },
      {
        question: 'Do The Shri Ram School students attend Cerebrum?',
        answer:
          'Yes! The Shri Ram School DLF Phase 3 is one of our top feeder schools. We offer Board + NEET combined preparation that complements their curriculum perfectly.',
      },
      {
        question: 'What is the fee for DLF Phase 3 students?',
        answer:
          'Pinnacle batch (10-12 students): Rs 98,000/year. Ascent batch (16-25 students): Rs 76,000/year. Pursuit batch (30-40 students): Rs 48,000/year. EMI available.',
      },
    ],
  },
  'cyber-city-rapid-metro': {
    name: 'Cyber City Rapid Metro',
    slug: 'cyber-city-rapid-metro',
    line: 'Rapid Metro',
    lineColor: 'orange',
    area: 'Gurugram',
    description:
      "Cyber City Rapid Metro serves Gurugram's IT hub. Students from families working at Google, Microsoft, Deloitte, and other Fortune 500 companies attend our NEET coaching.",
    studentCount: '100+',
    coordinates: { lat: '28.4948', lng: '77.0889' },
    nearbyAreas: ['DLF Cyber City', 'DLF Phase 2', 'Sikanderpur', 'Golf Course Road', 'Cyber Hub'],
    travelTime: '25 min to Sector 51 center',
    faqs: [
      {
        question: 'Is there NEET coaching near Cyber City Metro?',
        answer:
          'Yes! Our Sector 51 center is 25 minutes from Cyber City Rapid Metro. 100+ students from IT professional families in Cyber City area are enrolled.',
      },
      {
        question: 'Do you offer flexible timings for Cyber City families?',
        answer:
          'Yes! We have morning (8-11 AM), afternoon (2-5 PM), and evening (5-8 PM) batches. Weekend batches for families who prefer Saturday/Sunday coaching.',
      },
      {
        question: 'Why do Cyber City families choose Cerebrum?',
        answer:
          'Premium small batches (10-15 students), AIIMS faculty, and proximity (25 min metro). No need to send children to Delhi. 98% success rate speaks for itself.',
      },
    ],
  },
  'belvedere-towers-rapid-metro': {
    name: 'Belvedere Towers Rapid Metro',
    slug: 'belvedere-towers-rapid-metro',
    line: 'Rapid Metro',
    lineColor: 'orange',
    area: 'Gurugram',
    description:
      'Belvedere Towers Rapid Metro serves the ultra-premium Golf Course Road segment. Luxury tower residents from Belvedere Park, DLF Phase 5, and Magnolias attend our coaching.',
    studentCount: '80+',
    coordinates: { lat: '28.4617', lng: '77.0756' },
    nearbyAreas: ['Belvedere Towers', 'Golf Course Road', 'DLF Phase 5', 'DLF Aralias'],
    travelTime: '15 min to Sector 51 center',
    faqs: [
      {
        question: 'Is there NEET coaching near Belvedere Towers?',
        answer:
          'Yes! Our Sector 51 center is 15 minutes from Belvedere Towers Rapid Metro. 80+ students from Golf Course Road luxury towers are enrolled in our premium Pinnacle batch.',
      },
      {
        question: 'What batch do Golf Course Road families prefer?',
        answer:
          'Most families from Belvedere, Magnolias, Camellias choose our Pinnacle batch — just 10-12 students with personal attention from AIIMS faculty. Rs 98,000/year.',
      },
      {
        question: 'Do you offer home tuition for Golf Course Road?',
        answer:
          'We recommend our center-based coaching for best results (peer learning, mock tests). However, online classes are available for students who prefer studying from home.',
      },
    ],
  },
  'moulsari-avenue-rapid-metro': {
    name: 'Moulsari Avenue Rapid Metro',
    slug: 'moulsari-avenue-rapid-metro',
    line: 'Rapid Metro',
    lineColor: 'orange',
    area: 'Gurugram',
    description:
      'Moulsari Avenue Rapid Metro serves the DLF corporate area. Students whose parents work in Gateway Tower and Building 5 Cyber City attend our NEET coaching.',
    studentCount: '75+',
    coordinates: { lat: '28.4755', lng: '77.0886' },
    nearbyAreas: ['DLF Phase 3', 'DLF Cyber City', 'Sikanderpur', 'Moulsari Avenue'],
    travelTime: '20 min to Sector 51 center',
    faqs: [
      {
        question: 'Is there NEET coaching near Moulsari Avenue Metro?',
        answer:
          'Yes! Our Sector 51 center is 20 minutes from Moulsari Avenue Rapid Metro. 75+ students from DLF corporate area families are enrolled.',
      },
      {
        question: 'How do I reach Sector 51 from Moulsari Avenue?',
        answer:
          'Take Rapid Metro from Moulsari Avenue towards Sector 55-56 (12 min). Walk 5 min to M2K Corporate Park. Or direct auto via Golf Course Road (15 min).',
      },
      {
        question: 'Do you have evening batches for Moulsari area?',
        answer:
          "Yes! Evening batch (5-8 PM) is popular with Moulsari area students. Weekend batch also available. Online option for days you can't commute.",
      },
    ],
  },
}

export const dynamicParams = false

export async function generateStaticParams() {
  return Object.keys(metroStationData).map((station) => ({
    station,
  }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ station: string }>
}): Promise<Metadata> {
  const { station } = await params
  const data = metroStationData[station]

  if (!data) {
    return {
      title: 'Metro Station Not Found',
    }
  }

  return {
    title: `NEET Coaching Near ${data.name} ${data.area} | Online & Hybrid`,
    description: `NEET Biology coaching for students near ${data.name}. Online classes from home + hybrid mode. ${data.studentCount} students enrolled. ${data.travelTime}. AIIMS faculty.`,
    keywords: [
      `neet coaching near ${data.name.toLowerCase()}`,
      `biology coaching ${data.name.toLowerCase()}`,
      `neet classes ${data.area.toLowerCase()} metro`,
      `online neet coaching ${data.area.toLowerCase()}`,
    ],
    openGraph: {
      title: `NEET Coaching Near ${data.name}`,
      description: `Online NEET Biology classes for students near ${data.name}. ${data.studentCount} students enrolled.`,
      url: `https://cerebrumbiologyacademy.com/neet-coaching-near-metro/${data.slug}`,
    },
    alternates: {
      canonical: `https://cerebrumbiologyacademy.com/neet-coaching-near-metro/${data.slug}`,
    },
    robots: {
      index: true,
      follow: true,
    },
  }
}

export default async function MetroStationPage({
  params,
}: {
  params: Promise<{ station: string }>
}) {
  const { station } = await params
  const data = metroStationData[station]

  if (!data) {
    notFound()
  }

  const colorMap: Record<string, { badge: string; hero: string; bg: string; text: string }> = {
    blue: {
      badge: 'bg-blue-600',
      hero: 'from-blue-800 to-blue-600',
      bg: 'bg-blue-50',
      text: 'text-blue-600',
    },
    cyan: {
      badge: 'bg-cyan-500',
      hero: 'from-cyan-700 to-teal-600',
      bg: 'bg-cyan-50',
      text: 'text-cyan-600',
    },
    yellow: {
      badge: 'bg-yellow-500',
      hero: 'from-yellow-700 to-amber-600',
      bg: 'bg-yellow-50',
      text: 'text-yellow-700',
    },
    magenta: {
      badge: 'bg-pink-600',
      hero: 'from-pink-800 to-pink-600',
      bg: 'bg-pink-50',
      text: 'text-pink-600',
    },
    purple: {
      badge: 'bg-purple-600',
      hero: 'from-purple-800 to-purple-600',
      bg: 'bg-purple-50',
      text: 'text-purple-600',
    },
    orange: {
      badge: 'bg-orange-500',
      hero: 'from-orange-700 to-amber-600',
      bg: 'bg-orange-50',
      text: 'text-orange-600',
    },
  }
  const colors = colorMap[data.lineColor] || colorMap.blue
  const lineColorClass = colors.badge
  const heroGradient = colors.hero
  const accentBg = colors.bg
  const accentText = colors.text

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero */}
      <section className={`bg-gradient-to-br ${heroGradient} text-white py-16`}>
        <div className="container mx-auto px-4 text-center">
          <span
            className={`inline-flex items-center gap-2 ${lineColorClass} text-white px-4 py-1 rounded-full text-sm font-semibold mb-4`}
          >
            <Train className="w-4 h-4" />
            {data.line} - {data.area}
          </span>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">NEET Coaching Near {data.name}</h1>
          <p className="text-xl text-white/90 mb-6 max-w-2xl mx-auto">
            Online Biology classes for students near {data.name}. {data.studentCount} students
            enrolled.
            {data.travelTime} to our{' '}
            {data.area === 'Gurugram' ? 'Sector 51 center' : 'South Extension center'} for hybrid
            mode.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href={`https://wa.me/918826444334?text=Hi!%20I'm%20near%20${encodeURIComponent(data.name)}.%20I'm%20interested%20in%20NEET%20coaching.`}
              className="inline-flex items-center gap-2 bg-green-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-600 transition"
            >
              <MessageCircle className="w-5 h-5" />
              WhatsApp Us
            </a>
            <a
              href="tel:+918826444334"
              className="inline-flex items-center gap-2 bg-yellow-500 text-gray-900 px-6 py-3 rounded-lg font-semibold hover:bg-yellow-400 transition"
            >
              <Phone className="w-5 h-5" />
              Call 88264-44334
            </a>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-8 bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            <div className={`text-center p-4 ${accentBg} rounded-xl`}>
              <Users className={`w-8 h-8 ${accentText} mx-auto mb-2`} />
              <p className="text-2xl font-bold">{data.studentCount}</p>
              <p className="text-sm text-gray-600">Students Enrolled</p>
            </div>
            <div className={`text-center p-4 ${accentBg} rounded-xl`}>
              <Clock className={`w-8 h-8 ${accentText} mx-auto mb-2`} />
              <p className="text-2xl font-bold">{data.travelTime.split(' ')[0]}</p>
              <p className="text-sm text-gray-600">
                {data.area === 'Gurugram' ? 'To Sector 51 Center' : 'To South Extension'}
              </p>
            </div>
            <div className={`text-center p-4 ${accentBg} rounded-xl`}>
              <Trophy className={`w-8 h-8 ${accentText} mx-auto mb-2`} />
              <p className="text-2xl font-bold">98%</p>
              <p className="text-sm text-gray-600">Success Rate</p>
            </div>
            <div className={`text-center p-4 ${accentBg} rounded-xl`}>
              <Monitor className={`w-8 h-8 ${accentText} mx-auto mb-2`} />
              <p className="text-2xl font-bold">Live</p>
              <p className="text-sm text-gray-600">Online Classes</p>
            </div>
          </div>
        </div>
      </section>

      {/* About Metro Station */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-4">About {data.name}</h2>
          <p className="text-gray-600 mb-6">{data.description}</p>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-2 flex items-center gap-2">
                <MapPin className={`w-5 h-5 ${accentText}`} />
                Areas Served
              </h3>
              <div className="flex flex-wrap gap-2">
                {data.nearbyAreas.map((area, i) => (
                  <span
                    key={i}
                    className={`${accentBg} ${accentText} px-3 py-1 rounded-full text-sm`}
                  >
                    {area}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-2 flex items-center gap-2">
                <Train className={`w-5 h-5 ${accentText}`} />
                Metro Line
              </h3>
              <p className="text-gray-600">
                {data.line} - {data.travelTime} to{' '}
                {data.area === 'Gurugram' ? 'Sector 51 center' : 'South Extension center'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Learning Modes */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">Choose Your Learning Mode</h2>
          <p className="text-center text-gray-600 mb-12">
            Most {data.area} students prefer online - save commute time!
          </p>
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <div className="bg-white rounded-2xl p-6 border-2 border-green-200 shadow-md relative">
              <span className="absolute top-0 right-0 bg-green-600 text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
                MOST POPULAR
              </span>
              <Monitor className="w-10 h-10 text-green-600 mb-4" />
              <h3 className="text-xl font-bold mb-2">100% Online</h3>
              <p className="text-gray-600 mb-4">Live classes from home. No commute needed.</p>
              <p className="text-2xl font-bold text-green-700">Rs 48,000/year</p>
            </div>
            <div className={`${accentBg} rounded-2xl p-6 border-2 border-current/20 shadow-md`}>
              <Train className={`w-10 h-10 ${accentText} mb-4`} />
              <h3 className="text-xl font-bold mb-2">Hybrid Mode</h3>
              <p className="text-gray-600 mb-4">Online + Weekend offline. Metro accessible.</p>
              <p className={`text-2xl font-bold ${accentText}`}>Rs 58,000/year</p>
            </div>
            <div className="bg-white rounded-2xl p-6 border-2 border-gray-200 shadow-md">
              <MapPin className="w-10 h-10 text-gray-600 mb-4" />
              <h3 className="text-xl font-bold mb-2">Full Offline</h3>
              <p className="text-gray-600 mb-4">
                Daily at {data.area === 'Gurugram' ? 'Sector 51 center' : 'South Extension'} (
                {data.travelTime}).
              </p>
              <p className="text-2xl font-bold text-gray-700">Rs 68,000/year</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
          <div className="max-w-3xl mx-auto space-y-4">
            {data.faqs.map((faq, index) => (
              <details key={index} className="bg-gray-50 rounded-lg shadow-md group">
                <summary className="px-6 py-4 cursor-pointer font-semibold flex items-center justify-between hover:bg-gray-100">
                  {faq.question}
                  <span className={`${accentText} group-open:rotate-180 transition-transform`}>
                    ▼
                  </span>
                </summary>
                <p className="px-6 pb-4 text-gray-600">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className={`py-16 bg-gradient-to-br ${heroGradient} text-white`}>
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Join {data.studentCount} Students from {data.name} Area
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Start your medical journey with expert guidance from AIIMS faculty
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href={`https://wa.me/918826444334?text=Hi!%20I'm%20near%20${encodeURIComponent(data.name)}.%20I%20want%20to%20join%20NEET%20coaching.`}
              className="inline-flex items-center gap-2 bg-green-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-600 transition"
            >
              <MessageCircle className="w-5 h-5" />
              WhatsApp Now
            </a>
            <Link
              href="/free-neet-demo-class-gurugram"
              className="inline-flex items-center gap-2 bg-yellow-500 text-gray-900 px-8 py-3 rounded-lg font-semibold hover:bg-yellow-400 transition"
            >
              Book Free Demo
            </Link>
          </div>
        </div>
      </section>

      {/* Schema Markup */}
      <NoidaPageSchemas
        area={data.area}
        pageName={`NEET Coaching Near ${data.name}`}
        pageDescription={`NEET Biology coaching for students near ${data.name}, ${data.area}. Online classes with AIIMS faculty.`}
        pageUrl={`https://cerebrumbiologyacademy.com/neet-coaching-near-metro/${data.slug}`}
        breadcrumbs={[
          { name: 'Home', url: 'https://cerebrumbiologyacademy.com' },
          {
            name: data.area,
            url: `https://cerebrumbiologyacademy.com/locations/${data.area === 'Gurugram' ? 'gurugram' : data.area === 'South Delhi' ? 'south-delhi' : 'noida'}`,
          },
          {
            name: data.name,
            url: `https://cerebrumbiologyacademy.com/neet-coaching-near-metro/${data.slug}`,
          },
        ]}
        customFAQs={data.faqs}
        coordinates={data.coordinates}
      />
    </div>
  )
}
