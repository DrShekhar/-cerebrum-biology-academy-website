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
}

export const locations: Location[] = [
  {
    id: 'rohini',
    name: 'Rohini Center',
    address: '211 Vikas Surya Tower, DC Chauk Sector 9',
    city: 'Rohini',
    pincode: '110085',
    phone: ['+918826444334', '+919999744334'],
    googleMapsUrl:
      'https://maps.google.com/?q=211+Vikas+Surya+Tower+DC+Chauk+Sector+9+Rohini+110085',
    googleMapsEmbed:
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3499.123!2d77.123!3d28.123!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjjCsDA3JzIzLjAiTiA3N8KwMDcnMjMuMCJF!5e0!3m2!1sen!2sin!4v1234567890',
    features: ['Fully Equipped Classrooms', 'Library', 'Test Series Center'],
    timing: 'Mon-Sat: 8:00 AM - 8:00 PM',
  },
  {
    id: 'gurugram',
    name: 'Gurugram Center',
    address: 'M2K Corporate Park, Sector 50',
    city: 'Gurugram',
    pincode: '122018',
    phone: ['+918826444334', '+919999744334'],
    googleMapsUrl: 'https://maps.google.com/?q=M2K+Corporate+Park+Sector+50+Gurugram+122018',
    googleMapsEmbed:
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3506.123!2d77.123!3d28.456!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjjCsDE3JzIzLjAiTiA3N8KwMDcnMjMuMCJF!5e0!3m2!1sen!2sin!4v1234567890',
    features: ['Modern Infrastructure', 'Digital Classrooms', 'Student Lounge'],
    timing: 'Mon-Sat: 8:00 AM - 8:00 PM',
  },
  {
    id: 'south-delhi',
    name: 'South Delhi Center',
    address: 'Block B, South Extension 2',
    city: 'South Delhi',
    pincode: '110049',
    phone: ['+918826444334', '+919999744334'],
    googleMapsUrl: 'https://maps.google.com/?q=Block+B+South+Extension+2+South+Delhi+110049',
    googleMapsEmbed:
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3504.123!2d77.223!3d28.566!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjjCsDMzJzU3LjAiTiA3N8KwMTMnMjMuMCJF!5e0!3m2!1sen!2sin!4v1234567890',
    features: ['Prime Location', 'Well-Connected', 'Spacious Classrooms'],
    timing: 'Mon-Sat: 8:00 AM - 8:00 PM',
  },
]

export const primaryContact = {
  phone: ['+918826444334', '+919999744334'],
  email: 'info@cerebrumbiologyacademy.com',
  whatsapp: '+918826444334',
}
