export interface Location {
  id: string
  name: string
  address: string
  city: string
  pincode: string
  phone: string[]
  googleMapsUrl: string
  googleMapsEmbed: string
  features: string[]
  timing: string
  type: 'offline' | 'online'
}

export interface OnlineRegion {
  id: string
  name: string
  slug: string
  description: string
  states?: string[]
  countries?: string[]
  studentCount?: number
}

export const offlineLocations: Location[] = [
  {
    id: 'rohini',
    name: 'Rohini Center',
    address: '211, Vikas Surya Tower, DC Chauk, Rohini Sector 9',
    city: 'New Delhi',
    pincode: '110085',
    phone: ['+918826444334', '+919311946297'],
    googleMapsUrl:
      'https://maps.google.com/?q=211+Vikas+Surya+Tower+DC+Chauk+Rohini+Sector+9+New+Delhi+110085',
    googleMapsEmbed:
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3499.123!2d77.123!3d28.123!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjjCsDA3JzIzLjAiTiA3N8KwMDcnMjMuMCJF!5e0!3m2!1sen!2sin!4v1234567890',
    features: ['Fully Equipped Classrooms', 'Library', 'Test Series Center'],
    timing: 'Mon-Sat: 8:00 AM - 8:00 PM',
    type: 'offline',
  },
  {
    id: 'gurugram',
    name: 'Gurugram Center',
    address: 'Unit 17, M2K Corporate Park, Sector 51 (Mayfield Garden)',
    city: 'Gurugram',
    pincode: '122018',
    phone: ['+918826444334', '+919311946297'],
    googleMapsUrl:
      'https://maps.google.com/?q=M2K+Corporate+Park+Sector+51+Mayfield+Garden+Gurugram+122018',
    googleMapsEmbed:
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3506.123!2d77.123!3d28.456!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjjCsDE3JzIzLjAiTiA3N8KwMDcnMjMuMCJF!5e0!3m2!1sen!2sin!4v1234567890',
    features: ['Modern Infrastructure', 'Digital Classrooms', 'Student Lounge'],
    timing: 'Mon-Sat: 8:00 AM - 8:00 PM',
    type: 'offline',
  },
  {
    id: 'south-extension',
    name: 'South Extension Center',
    address: 'Block D, Near McD, South Extension Part 2',
    city: 'New Delhi',
    pincode: '110049',
    phone: ['+918826444334', '+919311946297'],
    googleMapsUrl: 'https://maps.google.com/?q=Block+D+South+Extension+Part+2+New+Delhi+110049',
    googleMapsEmbed:
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3504.123!2d77.223!3d28.566!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjjCsDMzJzU3LjAiTiA3N8KwMTMnMjMuMCJF!5e0!3m2!1sen!2sin!4v1234567890',
    features: ['Prime Location', 'Well-Connected', 'Spacious Classrooms'],
    timing: 'Mon-Sat: 8:00 AM - 8:00 PM',
    type: 'offline',
  },
  {
    id: 'faridabad',
    name: 'Faridabad Center',
    address: 'Sector 17, Faridabad',
    city: 'Faridabad',
    pincode: '121002',
    phone: ['+918826444334', '+919311946297'],
    googleMapsUrl: 'https://maps.google.com/?q=Sector+17+Faridabad+121002',
    googleMapsEmbed:
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3508.123!2d77.310!3d28.380!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjjCsDIyJzQ4LjAiTiA3N8KwMTgnMzYuMCJF!5e0!3m2!1sen!2sin!4v1234567890',
    features: ['Spacious Classrooms', 'Study Material Library', 'Mock Test Center'],
    timing: 'Mon-Sat: 8:00 AM - 8:00 PM',
    type: 'offline',
  },
]

export const onlineRegions: OnlineRegion[] = [
  {
    id: 'north-india',
    name: 'North India',
    slug: 'neet-coaching-north-india',
    description: 'Delhi NCR, UP, Haryana, Punjab, Rajasthan, Uttarakhand',
    states: [
      'Delhi',
      'Uttar Pradesh',
      'Haryana',
      'Punjab',
      'Rajasthan',
      'Uttarakhand',
      'HP',
      'J&K',
    ],
    studentCount: 850,
  },
  {
    id: 'south-india',
    name: 'South India',
    slug: 'neet-coaching-south-india',
    description: 'Karnataka, Tamil Nadu, Kerala, AP, Telangana',
    states: ['Karnataka', 'Tamil Nadu', 'Kerala', 'Andhra Pradesh', 'Telangana'],
    studentCount: 620,
  },
  {
    id: 'east-india',
    name: 'East India',
    slug: 'neet-coaching-east-india',
    description: 'West Bengal, Bihar, Jharkhand, Odisha, Northeast',
    states: ['West Bengal', 'Bihar', 'Jharkhand', 'Odisha', 'Assam', 'Northeast'],
    studentCount: 480,
  },
  {
    id: 'west-india',
    name: 'West India',
    slug: 'neet-coaching-west-india',
    description: 'Maharashtra, Gujarat, MP, Goa, Chhattisgarh',
    states: ['Maharashtra', 'Gujarat', 'Madhya Pradesh', 'Goa', 'Chhattisgarh'],
    studentCount: 540,
  },
  {
    id: 'overseas',
    name: 'Overseas',
    slug: 'neet-coaching-overseas',
    description: 'NRI students in UAE, USA, UK, Singapore & more',
    countries: ['UAE', 'USA', 'UK', 'Singapore', 'Australia', 'Canada'],
    studentCount: 180,
  },
]

export const locations: Location[] = offlineLocations

export const primaryContact = {
  phone: ['+918826444334', '+919311946297'],
  email: 'info@cerebrumbiologyacademy.com',
  whatsapp: '+918826444334',
}
