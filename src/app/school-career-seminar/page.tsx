'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import {
  GraduationCap,
  Users,
  School,
  Award,
  CheckCircle,
  Calendar,
  MapPin,
  Phone,
  MessageCircle,
  Star,
  Target,
  BookOpen,
  Heart,
  Building,
  FileText,
  Sparkles,
  Shield,
  Camera,
  Send,
  Clock,
  Users2,
  ClipboardList,
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { CONTACT_INFO, getWhatsAppLink } from '@/lib/constants/contactInfo'
import Script from 'next/script'

export default function SchoolCareerSeminarPage() {
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 },
  }

  const [formData, setFormData] = useState({
    schoolName: '',
    principalName: '',
    designation: '',
    email: '',
    phone: '',
    city: '',
    studentCount: '',
    preferredDate: '',
    preferredTime: '',
    seminarType: 'NEET Career Guidance',
    additionalInfo: '',
    expectations: '',
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    const message = `🏫 *NEW SCHOOL SEMINAR BOOKING REQUEST*

*School Details:*
• School Name: ${formData.schoolName}
• City: ${formData.city}

*Contact Person:*
• Name: ${formData.principalName}
• Designation: ${formData.designation}
• Email: ${formData.email}
• Phone: ${formData.phone}

*Seminar Requirements:*
• Expected Students: ${formData.studentCount}
• Preferred Date: ${formData.preferredDate}
• Preferred Time: ${formData.preferredTime}
• Seminar Type: ${formData.seminarType}

*Expectations:*
${formData.expectations || 'Not specified'}

*Additional Information:*
${formData.additionalInfo || 'None'}

---
Submitted via School Seminar Booking Form`

    const whatsappUrl = getWhatsAppLink(message)
    window.open(whatsappUrl, '_blank')
    setIsSubmitting(false)
  }

  const seminarTypes = [
    {
      title: 'NEET Career Guidance Seminar',
      duration: '2-3 Hours',
      audience: 'Class 9-12 Students & Parents',
      description:
        'Comprehensive overview of NEET exam, preparation strategies, and career paths in medicine.',
      topics: [
        'NEET exam pattern & syllabus',
        'Medical career opportunities',
        'Class-wise preparation roadmap',
        'Time management strategies',
      ],
      icon: Target,
      color: 'green',
    },
    {
      title: 'Biology Olympiad Awareness',
      duration: '1.5-2 Hours',
      audience: 'Class 9-11 Students',
      description: 'Introduction to NSEB, INBO, IBO, and international biology olympiads.',
      topics: [
        'Olympiad examination structure',
        'Benefits for college admissions',
        'Preparation resources',
        'Success stories',
      ],
      icon: Award,
      color: 'purple',
    },
    {
      title: 'Parent Orientation Program',
      duration: '2 Hours',
      audience: 'Parents of Class 9-12',
      description: "Helping parents understand and support their child's medical entrance journey.",
      topics: [
        'Understanding NEET ecosystem',
        'Supporting without pressuring',
        'Financial planning for medical education',
        'Mental health awareness',
      ],
      icon: Heart,
      color: 'red',
    },
    {
      title: 'Board + NEET Integration Workshop',
      duration: '2-3 Hours',
      audience: 'Class 11-12 Students',
      description: 'How to balance board exam preparation with NEET without compromising either.',
      topics: [
        'Overlapping syllabus analysis',
        'Dual preparation strategy',
        'Time allocation techniques',
        'Resource optimization',
      ],
      icon: BookOpen,
      color: 'blue',
    },
  ]

  const whyChooseUs = [
    {
      title: 'AIIMS Faculty Led',
      description:
        'Sessions conducted by Dr. Shekhar Singh (AIIMS Delhi alumnus) with 15+ years experience',
      icon: GraduationCap,
    },
    {
      title: '98% Success Rate',
      description: '1,50,000+ students mentored, thousands in top medical colleges across India',
      icon: Award,
    },
    {
      title: 'CBSE & NEP Compliant',
      description:
        'Our programs align with CBSE career counselling mandate and NEP 2020 guidelines',
      icon: Shield,
    },
    {
      title: 'Completely FREE',
      description:
        'No charges for schools - our mission is to spread quality guidance to every student',
      icon: Sparkles,
    },
    {
      title: 'Interactive Format',
      description: 'Q&A sessions, live doubt clearing, and personalized guidance for students',
      icon: Users,
    },
    {
      title: 'Pan-India Coverage',
      description: 'Serving schools across Delhi NCR, North India, and available online nationwide',
      icon: MapPin,
    },
  ]

  const seminarGalleryImages = [
    {
      src: '/images/seminars/euro-school-seminar-1.jpg',
      alt: 'Dr. Shekhar addressing students at Euro International School, Gurugram',
      school: 'Euro International School, Gurugram',
    },
    {
      src: '/images/seminars/euro-students-crowd.jpg',
      alt: 'Students in auditorium listening to NEET career guidance at Euro International School',
      school: 'Euro International School - Students',
    },
    {
      src: '/images/seminars/parents-seminar-crowd.jpg',
      alt: 'Parents attending NEET career guidance seminar for their children',
      school: 'Parent Orientation Session',
    },
    {
      src: '/images/seminars/students-parents-notes.jpg',
      alt: 'Students and parents taking notes during NEET career counselling session',
      school: 'Students & Parents Session',
    },
    {
      src: '/images/seminars/dr-shekhar-speaking.jpg',
      alt: 'Dr. Shekhar Singh speaking about preparing future medical professionals',
      school: 'Expert Guidance Session',
    },
    {
      src: '/images/seminars/euro-auditorium-wide.jpg',
      alt: 'Wide view of Euro International School auditorium during career seminar',
      school: 'Euro International School Auditorium',
    },
    {
      src: '/images/seminars/gvm-sonipat-seminar.jpg',
      alt: 'Students listening to NEET career guidance at GVM Sonipat, Haryana',
      school: 'GVM School, Sonipat',
    },
    {
      src: '/images/seminars/neet-aspirants-seminar.jpg',
      alt: 'NEET aspirants attending career seminar session',
      school: 'NEET Aspirants Session',
    },
    {
      src: '/images/seminars/south-city-seminar.jpg',
      alt: 'Dr. Shekhar with audience at South City seminar',
      school: 'South City Seminar',
    },
    {
      src: 'https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=768,h=454,fit=crop/meP3n6VKelS9LnOn/shekhar-sir-dean-south-city-meP1PKZLe3Hr9XWl.png',
      alt: 'Dr. Shekhar Sir at Narayana E-Techno School South City',
      school: 'Narayana E-Techno School, South City',
    },
    {
      src: 'https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=768,h=454,fit=crop/meP3n6VKelS9LnOn/untitled-design-10-Yle6eBZzWoUXG23m.png',
      alt: "Dr. Shekhar with Sharani Narayana Ma'am - Director Narayana Group",
      school: 'With Narayana Group Director',
    },
    {
      src: 'https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=768,h=431,fit=crop/meP3n6VKelS9LnOn/untitled-design-8-A0xWxZQg7NibJqQ6.png',
      alt: "Sharani Narayana Ma'am addressing students at Pariksha Pe Charcha",
      school: 'Pariksha Pe Charcha - Narayana Group',
    },
    {
      src: 'https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=768,h=492,fit=crop/meP3n6VKelS9LnOn/warm-welcome-by-mgr-staff-YBg8EJ3w40SNWe0G.png',
      alt: 'Warm welcome at Narayana E-Techno School MG Road',
      school: 'Narayana E-Techno School, MG Road',
    },
    {
      src: 'https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=768,h=431,fit=crop/meP3n6VKelS9LnOn/untitled-design-11-YanMnwj3k6hKxk4G.png',
      alt: 'Expert Seminar Session featuring Sharani Narayana',
      school: 'Expert Educational Seminar',
    },
    {
      src: 'https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=768,h=431,fit=crop/meP3n6VKelS9LnOn/untitled-design-7-A3QPQ1WKnysGg1qr.png',
      alt: 'Dr. Shekhar with Shabana Arora - Principal South City 2',
      school: 'Narayana JR College, South City 2',
    },
    {
      src: 'https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=768,h=431,fit=crop/meP3n6VKelS9LnOn/warm-welcome-by-mgr-staff-1-A1aQe64xlbTX5o0y.png',
      alt: 'Dr. Shekhar as Dean at MG Road School',
      school: 'Narayana E-Techno School, MG Road',
    },
    {
      src: 'https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=768,h=431,fit=crop/meP3n6VKelS9LnOn/shekhar-sir-s-welcome-to-mgr-m2Wl1yvaN8U5E4Bo.png',
      alt: 'Dr. Shekhar being welcomed at MG Road Campus',
      school: 'Welcome Ceremony - MG Road',
    },
    {
      src: 'https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=768,h=431,fit=crop/meP3n6VKelS9LnOn/untitled-design-9-ALpOpZl03Bha1Bnj.png',
      alt: 'Pariksha Pe Charcha - Dr. Shekhar addressing students',
      school: 'Pariksha Pe Charcha Event',
    },
    {
      src: 'https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=768,h=431,fit=crop/meP3n6VKelS9LnOn/untitled-design-15-YyvPyabOV5t7OQGb.png',
      alt: 'MG Road NEET Batch - Sadhna, Prisha, Wamika, Ishika',
      school: 'MG Road Gurugram NEET Batch',
    },
    {
      src: 'https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=768,h=431,fit=crop/meP3n6VKelS9LnOn/untitled-design-14-YKbaP7kXewiZKarz.png',
      alt: 'Students with Dr. Shekhar at Career Guidance Session',
      school: 'Career Guidance Session',
    },
    {
      src: 'https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=1440,h=756,fit=crop,f=jpeg/meP3n6VKelS9LnOn/img_2854-YD0v2gX7w8TZqBql.jpg',
      alt: 'Cerebrum Academy Modern Classroom Facility',
      school: 'Cerebrum Academy Facilities',
    },
    {
      src: 'https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=768,h=1226,fit=crop/meP3n6VKelS9LnOn/untitled-design-16-YZ97M50Rq4sJVv2b.png',
      alt: 'Dr. Shekhar in News - GVM Sonipat Haryana',
      school: 'GVM School, Sonipat, Haryana',
    },
    {
      src: 'https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=768,h=1226,fit=crop/meP3n6VKelS9LnOn/untitled-design-17-Yg2a7xKM1Ws1w5B9.png',
      alt: 'Dr. Shekhar greeting Principal at South City 2',
      school: 'Principal Welcome Ceremony',
    },
    {
      src: 'https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=768,h=1226,fit=crop/meP3n6VKelS9LnOn/untitled-design-18-AwvJOG3MwMIPX0l5.png',
      alt: 'Dr. Shekhar addressing NEET UG Aspirants',
      school: 'NEET Guidance Session',
    },
    {
      src: 'https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=768,h=431,fit=crop/meP3n6VKelS9LnOn/teachers-day-mgr-YZ97MLJx15TGoJOO.png',
      alt: 'Teachers Day Celebration',
      school: 'Teachers Day Program',
    },
    {
      src: 'https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=768,h=431,fit=crop/meP3n6VKelS9LnOn/untitled-design-5-A1a14Zwz5rUPR2Np.png',
      alt: 'Group Photo with NEET Achievers',
      school: 'NEET Toppers Meet',
    },
  ]

  const testimonials = [
    {
      quote:
        "Dr. Shekhar's seminar at Euro International School was exceptional. His experience as an AIIMS faculty really showed. Students gained clarity about NEET preparation and career paths in medicine.",
      author: 'School Administration',
      role: 'Euro International School, Gurugram',
      rating: 5,
      featured: true,
    },
    {
      quote:
        'The career guidance session was extremely informative and well-structured. Dr. Shekhar addressed all queries from students and parents with great patience. A must-have program for every school.',
      author: 'School Management',
      role: 'Tagore International School, Vasant Kunj, Delhi',
      rating: 5,
      featured: true,
    },
    {
      quote:
        "The NEET guidance seminar by Cerebrum was eye-opening for our students. Dr. Shekhar's insights helped many students make informed career decisions.",
      author: 'Mrs. Sunita Sharma',
      role: 'Principal, DPS Dwarka',
      rating: 5,
    },
    {
      quote:
        'Parents especially appreciated the session. It addressed their concerns about medical education costs and preparation timeline.',
      author: 'Dr. Rakesh Verma',
      role: 'Director, Modern Public School, Gurugram',
      rating: 5,
    },
    {
      quote:
        "We've invited Cerebrum for 3 consecutive years. The quality of content and engagement is unmatched. Highly recommended for all CBSE schools.",
      author: 'Mrs. Priya Agarwal',
      role: 'Vice Principal, Amity International School',
      rating: 5,
    },
  ]

  const faqs = [
    {
      question: 'Is the seminar really free for schools?',
      answer:
        'Yes, absolutely! We conduct these seminars as part of our educational outreach mission. There are no hidden charges or mandatory enrollments. Schools only need to provide a venue and ensure student/parent participation.',
    },
    {
      question: 'What is the ideal batch size for the seminar?',
      answer:
        'We can accommodate anywhere from 50 to 500+ students. For larger gatherings, we recommend an auditorium setup. Smaller batches allow for more interactive Q&A sessions.',
    },
    {
      question: 'Can you conduct online seminars?',
      answer:
        'Yes! We offer both in-person and virtual seminars via Zoom/Google Meet. Online sessions are perfect for schools in remote locations or those preferring digital formats.',
    },
    {
      question: 'How far in advance should we book?',
      answer:
        'We recommend booking at least 2-3 weeks in advance to ensure availability. For academic year planning, schools can schedule multiple sessions at the start of the year.',
    },
    {
      question: 'Do you provide any materials to students?',
      answer:
        "Yes! Every attendee receives a free NEET preparation guidebook, study planner, and access to sample study materials. Parents receive a detailed parent's guide to medical entrance preparation.",
    },
    {
      question: 'Is this compliant with CBSE career counselling requirements?',
      answer:
        'Absolutely. Our programs are designed to fulfill CBSE Affiliation Bye-Laws clause 2.4.12 which mandates career counselling in schools. We can provide documentation for compliance records.',
    },
    {
      question: 'Can you customize the session for our school?',
      answer:
        "Yes, we tailor content based on your student demographics, whether it's CBSE, ICSE, IB, or state boards. We can also focus on specific topics your school prioritizes.",
    },
    {
      question: 'Do you cover medical careers beyond MBBS?',
      answer:
        'Yes! We cover BDS, BAMS, BHMS, veterinary science, nursing, pharmacy, and allied health sciences. Students get a complete picture of healthcare career options.',
    },
  ]

  const sampleAgenda = [
    { time: '9:00 AM', activity: 'Registration & Welcome', duration: '15 min' },
    { time: '9:15 AM', activity: 'Introduction to Medical Careers', duration: '20 min' },
    { time: '9:35 AM', activity: 'NEET Exam Overview & Recent Changes', duration: '25 min' },
    { time: '10:00 AM', activity: 'Class-wise Preparation Strategy', duration: '30 min' },
    { time: '10:30 AM', activity: 'Break', duration: '10 min' },
    { time: '10:40 AM', activity: 'Success Stories & Expert Tips', duration: '20 min' },
    { time: '11:00 AM', activity: 'Parent Session: Supporting Your Child', duration: '25 min' },
    { time: '11:25 AM', activity: 'Q&A Session', duration: '25 min' },
    { time: '11:50 AM', activity: 'Distribution of Materials & Closing', duration: '10 min' },
  ]

  const stats = [
    { value: '500+', label: 'Schools Partnered' },
    { value: '1,50,000+', label: 'Students Guided' },
    { value: '15+', label: 'Years Experience' },
    { value: '98%', label: 'Parent Satisfaction' },
  ]

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Free Career Guidance Seminar for Schools',
    provider: {
      '@type': 'EducationalOrganization',
      name: 'Cerebrum Biology Academy',
      url: 'https://cerebrumbiologyacademy.com',
      telephone: CONTACT_INFO.phone.primary,
    },
    description:
      'Free NEET career guidance seminars for schools. CBSE compliant career counselling by AIIMS faculty.',
    areaServed: { '@type': 'Country', name: 'India' },
    serviceType: 'Career Guidance Seminar',
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

  return (
    <>
      <Script id="service-schema" type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify(serviceSchema)}
      </Script>
      <Script id="faq-schema" type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify(faqSchema)}
      </Script>

      <main className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-slate-900 to-slate-800 text-white overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-20 left-10 w-72 h-72 bg-green-500 rounded-full blur-3xl" />
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500 rounded-full blur-3xl" />
          </div>

          <div className="relative max-w-7xl mx-auto px-4 py-16 md:py-24">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div {...fadeInUp}>
                <div className="inline-flex items-center px-4 py-2 bg-green-500/20 rounded-full text-green-400 text-sm font-medium mb-6">
                  <Sparkles className="w-4 h-4 mr-2" />
                  100% Free for Schools
                </div>

                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
                  Free NEET Career Guidance{' '}
                  <span className="text-yellow-400">Seminar for Schools</span>
                </h1>

                <p className="text-lg md:text-xl text-gray-300 mb-8 leading-relaxed">
                  Empower your students with expert guidance from AIIMS faculty. CBSE & NEP 2020
                  compliant career counselling that helps students make informed decisions about
                  their medical career journey.
                </p>

                <div className="flex flex-col sm:flex-row gap-4">
                  <a
                    href={getWhatsAppLink(
                      'Hi, I want to book a free career guidance seminar for our school.'
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button variant="primary" size="lg" className="w-full sm:w-auto">
                      <Calendar className="w-5 h-5 mr-2" />
                      Book Free Seminar
                    </Button>
                  </a>
                  <a href={`tel:${CONTACT_INFO.phone.primary}`}>
                    <Button
                      variant="outline"
                      size="lg"
                      className="w-full sm:w-auto border-white/30 text-white hover:bg-white/10"
                    >
                      <Phone className="w-5 h-5 mr-2" />
                      Call: {CONTACT_INFO.phone.display.primary}
                    </Button>
                  </a>
                </div>

                <div className="mt-8 flex flex-wrap gap-6 text-sm text-gray-400">
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2 text-green-400" />
                    No Hidden Charges
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2 text-green-400" />
                    CBSE Compliant
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2 text-green-400" />
                    Pan-India Available
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="relative hidden lg:block"
              >
                <div className="relative bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                  <div className="grid grid-cols-2 gap-4">
                    {stats.map((stat, index) => (
                      <div key={index} className="text-center p-4">
                        <div className="text-3xl font-bold text-yellow-400">{stat.value}</div>
                        <div className="text-sm text-gray-300">{stat.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Why Schools Need Career Seminars */}
        <section className="py-16 md:py-20 bg-gradient-to-b from-gray-50 to-white">
          <div className="max-w-7xl mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                Why Schools Need Career Guidance Seminars
              </h2>
              <p className="text-gray-600 max-w-3xl mx-auto">
                Career counselling is no longer optional - it&apos;s mandated by education boards
                and essential for student success.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl p-6 shadow-lg border border-green-100"
              >
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-4">
                    <FileText className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">CBSE Mandate</h3>
                    <p className="text-sm text-gray-500">Affiliation Bye-Laws 2.4.12</p>
                  </div>
                </div>
                <p className="text-gray-600">
                  CBSE Affiliation Bye-Laws clause 2.4.12 mandates that all affiliated schools must
                  provide career counselling services to students. Our seminars help schools fulfill
                  this compliance requirement.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl p-6 shadow-lg border border-blue-100"
              >
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                    <Building className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">NEP 2020 Guidelines</h3>
                    <p className="text-sm text-gray-500">National Education Policy</p>
                  </div>
                </div>
                <p className="text-gray-600">
                  NEP 2020 emphasizes career guidance from Class 6 onwards. The policy mandates
                  schools to provide exposure to various career paths including medical sciences for
                  informed decision-making.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Seminar Types */}
        <section className="py-16 md:py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                Our Seminar Programs
              </h2>
              <p className="text-gray-600 max-w-3xl mx-auto">
                Choose from our range of tailored programs designed for different audiences and
                objectives.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-6">
              {seminarTypes.map((seminar, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div
                      className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                        seminar.color === 'green'
                          ? 'bg-green-100'
                          : seminar.color === 'purple'
                            ? 'bg-purple-100'
                            : seminar.color === 'red'
                              ? 'bg-red-100'
                              : 'bg-blue-100'
                      }`}
                    >
                      <seminar.icon
                        className={`w-6 h-6 ${
                          seminar.color === 'green'
                            ? 'text-green-600'
                            : seminar.color === 'purple'
                              ? 'text-purple-600'
                              : seminar.color === 'red'
                                ? 'text-red-600'
                                : 'text-blue-600'
                        }`}
                      />
                    </div>
                    <span className="px-3 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                      {seminar.duration}
                    </span>
                  </div>

                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{seminar.title}</h3>
                  <p className="text-sm text-green-600 font-medium mb-3">{seminar.audience}</p>
                  <p className="text-gray-600 text-sm mb-4">{seminar.description}</p>

                  <div className="space-y-2">
                    {seminar.topics.map((topic, topicIndex) => (
                      <div key={topicIndex} className="flex items-center text-sm text-gray-600">
                        <CheckCircle className="w-4 h-4 mr-2 text-green-500 flex-shrink-0" />
                        {topic}
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Cerebrum */}
        <section className="py-16 md:py-20 bg-gradient-to-b from-gray-50 to-white">
          <div className="max-w-7xl mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                Why Schools Choose Cerebrum
              </h2>
              <p className="text-gray-600 max-w-3xl mx-auto">
                Trusted by 500+ schools across India for quality career guidance
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {whyChooseUs.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-xl p-6 shadow-md border border-gray-100"
                >
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                    <item.icon className="w-6 h-6 text-green-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-gray-600 text-sm">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Seminar Gallery - Optimized for LCP */}
        <section className="py-16 md:py-20 bg-white overflow-hidden">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <div className="inline-flex items-center px-4 py-2 bg-green-100 rounded-full text-green-700 text-sm font-medium mb-4">
                <Camera className="w-4 h-4 mr-2" />
                Photo Gallery
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                Our Seminars in Action
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                See Dr. Shekhar guiding students at various schools across India
              </p>
            </div>
          </div>

          <div className="relative">
            <div className="flex animate-scroll">
              {/* Only show first 12 images for performance (duplicated for seamless scroll) */}
              {[...seminarGalleryImages.slice(0, 12), ...seminarGalleryImages.slice(0, 12)].map((image, index) => (
                <div key={index} className="flex-shrink-0 w-72 md:w-80 mx-3 group">
                  <div className="relative h-48 md:h-56 rounded-xl overflow-hidden shadow-lg">
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      sizes="(max-width: 768px) 288px, 320px"
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                      loading="lazy"
                      unoptimized={image.src.startsWith('http')}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <p className="text-white text-sm font-medium">{image.school}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <style jsx>{`
            @keyframes scroll {
              0% {
                transform: translateX(0);
              }
              100% {
                transform: translateX(-50%);
              }
            }
            .animate-scroll {
              animation: scroll 50s linear infinite;
            }
            .animate-scroll:hover {
              animation-play-state: paused;
            }
          `}</style>
        </section>

        {/* Sample Agenda */}
        <section className="py-16 md:py-20 bg-gradient-to-b from-gray-50 to-white">
          <div className="max-w-4xl mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Sample Agenda</h2>
              <p className="text-gray-600">A typical 3-hour comprehensive session structure</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="bg-gray-50 rounded-2xl p-6 md:p-8"
            >
              <div className="space-y-4">
                {sampleAgenda.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-4 p-4 bg-white rounded-lg border border-gray-100"
                  >
                    <div className="w-20 text-center flex-shrink-0">
                      <span className="text-sm font-semibold text-green-600">{item.time}</span>
                    </div>
                    <div className="flex-1">
                      <span className="text-gray-900 font-medium">{item.activity}</span>
                    </div>
                    <div className="text-sm text-gray-500">{item.duration}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-16 md:py-20 bg-gradient-to-b from-gray-50 to-white">
          <div className="max-w-7xl mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                What Schools Say About Us
              </h2>
              <p className="text-gray-600">Feedback from principals and educators</p>
            </motion.div>

            {/* Featured Testimonials - Optimized */}
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              {testimonials
                .filter((t) => t.featured)
                .map((testimonial, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-xl p-6 shadow-xl border-2 border-green-200 relative"
                  >
                    <div className="absolute -top-3 left-4 px-3 py-1 bg-green-500 text-white text-xs font-semibold rounded-full">
                      Partner School
                    </div>
                    <div className="flex mb-4 mt-2">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    <p className="text-gray-700 italic mb-4 text-base">
                      &quot;{testimonial.quote}&quot;
                    </p>
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-3">
                        <School className="w-5 h-5 text-green-600" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">{testimonial.author}</p>
                        <p className="text-sm text-green-600 font-medium">{testimonial.role}</p>
                      </div>
                    </div>
                  </div>
                ))}
            </div>

            {/* Other Testimonials - Optimized */}
            <div className="grid md:grid-cols-3 gap-6">
              {testimonials
                .filter((t) => !t.featured)
                .map((testimonial, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-xl p-6 shadow-lg border border-gray-100"
                  >
                    <div className="flex mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    <p className="text-gray-600 italic mb-4">&quot;{testimonial.quote}&quot;</p>
                    <div>
                      <p className="font-semibold text-gray-900">{testimonial.author}</p>
                      <p className="text-sm text-gray-500">{testimonial.role}</p>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </section>

        {/* FAQs - Optimized: Removed per-item animations */}
        <section className="py-16 md:py-20 bg-white">
          <div className="max-w-4xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-gray-600">Everything schools need to know about our seminars</p>
            </div>

            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <details
                  key={index}
                  className="group bg-gray-50 rounded-xl border border-gray-100"
                >
                  <summary className="flex items-center justify-between p-5 cursor-pointer list-none">
                    <span className="font-medium text-gray-900 pr-4">{faq.question}</span>
                    <span className="flex-shrink-0 text-gray-400 group-open:rotate-180 transition-transform">
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </span>
                  </summary>
                  <div className="px-5 pb-5 text-gray-600">{faq.answer}</div>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* Booking Form Section */}
        <section id="booking-form" className="py-16 md:py-20 bg-white">
          <div className="max-w-4xl mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <div className="inline-flex items-center px-4 py-2 bg-green-100 rounded-full text-green-700 text-sm font-medium mb-4">
                <ClipboardList className="w-4 h-4 mr-2" />
                For Principals & School Management
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                Book Your Free Seminar
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Fill in the details below and we&apos;ll get in touch to confirm your seminar date.
                All fields marked with * are required.
              </p>
            </motion.div>

            <motion.form
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              onSubmit={handleFormSubmit}
              className="bg-gray-50 rounded-2xl p-6 md:p-8 border border-gray-200"
            >
              {/* School Information */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <School className="w-5 h-5 mr-2 text-green-600" />
                  School Information
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="schoolName"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      School Name *
                    </label>
                    <input
                      type="text"
                      id="schoolName"
                      name="schoolName"
                      required
                      value={formData.schoolName}
                      onChange={handleInputChange}
                      placeholder="e.g., Delhi Public School"
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                    />
                  </div>
                  <div>
                    <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                      City *
                    </label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      required
                      value={formData.city}
                      onChange={handleInputChange}
                      placeholder="e.g., New Delhi"
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                    />
                  </div>
                </div>
              </div>

              {/* Contact Person */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <Users className="w-5 h-5 mr-2 text-green-600" />
                  Contact Person Details
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="principalName"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Name *
                    </label>
                    <input
                      type="text"
                      id="principalName"
                      name="principalName"
                      required
                      value={formData.principalName}
                      onChange={handleInputChange}
                      placeholder="e.g., Mrs. Sunita Sharma"
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="designation"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Designation *
                    </label>
                    <select
                      id="designation"
                      name="designation"
                      required
                      value={formData.designation}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all bg-white"
                    >
                      <option value="">Select designation</option>
                      <option value="Principal">Principal</option>
                      <option value="Vice Principal">Vice Principal</option>
                      <option value="Director">Director</option>
                      <option value="Coordinator">Academic Coordinator</option>
                      <option value="Career Counsellor">Career Counsellor</option>
                      <option value="HOD Science">HOD - Science</option>
                      <option value="Teacher">Teacher</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="e.g., principal@school.edu"
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="e.g., 9876543210"
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                    />
                  </div>
                </div>
              </div>

              {/* Seminar Details */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <Calendar className="w-5 h-5 mr-2 text-green-600" />
                  Seminar Requirements
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="studentCount"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Expected Number of Attendees *
                    </label>
                    <div className="relative">
                      <Users2 className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <select
                        id="studentCount"
                        name="studentCount"
                        required
                        value={formData.studentCount}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all bg-white"
                      >
                        <option value="">Select expected count</option>
                        <option value="50-100">50-100 students</option>
                        <option value="100-200">100-200 students</option>
                        <option value="200-300">200-300 students</option>
                        <option value="300-500">300-500 students</option>
                        <option value="500+">500+ students</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="seminarType"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Seminar Type *
                    </label>
                    <select
                      id="seminarType"
                      name="seminarType"
                      required
                      value={formData.seminarType}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all bg-white"
                    >
                      <option value="NEET Career Guidance">NEET Career Guidance Seminar</option>
                      <option value="Biology Olympiad">Biology Olympiad Awareness</option>
                      <option value="Parent Orientation">Parent Orientation Program</option>
                      <option value="Board + NEET Integration">
                        Board + NEET Integration Workshop
                      </option>
                      <option value="Combined Session">Combined Session (Multiple Programs)</option>
                    </select>
                  </div>
                  <div>
                    <label
                      htmlFor="preferredDate"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Preferred Date *
                    </label>
                    <input
                      type="date"
                      id="preferredDate"
                      name="preferredDate"
                      required
                      value={formData.preferredDate}
                      onChange={handleInputChange}
                      min={new Date().toISOString().split('T')[0]}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="preferredTime"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Preferred Time Slot *
                    </label>
                    <div className="relative">
                      <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <select
                        id="preferredTime"
                        name="preferredTime"
                        required
                        value={formData.preferredTime}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all bg-white"
                      >
                        <option value="">Select time slot</option>
                        <option value="8:00 AM - 10:00 AM">8:00 AM - 10:00 AM</option>
                        <option value="10:00 AM - 12:00 PM">10:00 AM - 12:00 PM</option>
                        <option value="12:00 PM - 2:00 PM">12:00 PM - 2:00 PM</option>
                        <option value="2:00 PM - 4:00 PM">2:00 PM - 4:00 PM</option>
                        <option value="Flexible">Flexible - Will coordinate</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              {/* Expectations */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <Target className="w-5 h-5 mr-2 text-green-600" />
                  Your Expectations
                </h3>
                <div className="space-y-4">
                  <div>
                    <label
                      htmlFor="expectations"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      What do you expect from this seminar? *
                    </label>
                    <textarea
                      id="expectations"
                      name="expectations"
                      required
                      rows={3}
                      value={formData.expectations}
                      onChange={handleInputChange}
                      placeholder="e.g., We want students to understand NEET preparation strategy, career options in medical field, and tips for balancing board exams with NEET..."
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all resize-none"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="additionalInfo"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Any Additional Information (Optional)
                    </label>
                    <textarea
                      id="additionalInfo"
                      name="additionalInfo"
                      rows={2}
                      value={formData.additionalInfo}
                      onChange={handleInputChange}
                      placeholder="e.g., We have both science and non-science students, audio-visual setup available, etc."
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all resize-none"
                    />
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex flex-col sm:flex-row gap-4 items-center justify-between pt-4 border-t border-gray-200">
                <p className="text-sm text-gray-500">
                  Your request will be sent via WhatsApp for quick response
                </p>
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto"
                >
                  {isSubmitting ? (
                    'Submitting...'
                  ) : (
                    <>
                      <Send className="w-5 h-5 mr-2" />
                      Submit Booking Request
                    </>
                  )}
                </Button>
              </div>
            </motion.form>

            {/* Trust Indicators */}
            <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div className="p-4">
                <CheckCircle className="w-6 h-6 mx-auto text-green-500 mb-2" />
                <p className="text-sm text-gray-600">100% Free</p>
              </div>
              <div className="p-4">
                <CheckCircle className="w-6 h-6 mx-auto text-green-500 mb-2" />
                <p className="text-sm text-gray-600">No Obligations</p>
              </div>
              <div className="p-4">
                <CheckCircle className="w-6 h-6 mx-auto text-green-500 mb-2" />
                <p className="text-sm text-gray-600">Quick Response</p>
              </div>
              <div className="p-4">
                <CheckCircle className="w-6 h-6 mx-auto text-green-500 mb-2" />
                <p className="text-sm text-gray-600">CBSE Compliant</p>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-16 md:py-20 bg-gradient-to-br from-slate-900 to-slate-800 text-white">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <School className="w-16 h-16 mx-auto mb-6 text-yellow-400" />
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                Ready to Empower Your Students?
              </h2>
              <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
                Book a free career guidance seminar for your school today. No charges, no
                obligations - just pure educational value for your students and parents.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href={getWhatsAppLink(
                    'Hi, I want to book a free career guidance seminar for our school.'
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button variant="primary" size="lg" className="w-full sm:w-auto">
                    <MessageCircle className="w-5 h-5 mr-2" />
                    WhatsApp Us Now
                  </Button>
                </a>
                <a href={`tel:${CONTACT_INFO.phone.primary}`}>
                  <Button
                    variant="outline"
                    size="lg"
                    className="w-full sm:w-auto border-white/30 text-white hover:bg-white/10"
                  >
                    <Phone className="w-5 h-5 mr-2" />
                    Call: {CONTACT_INFO.phone.display.primary}
                  </Button>
                </a>
              </div>

              <p className="mt-6 text-sm text-gray-400">
                Available for schools across Delhi NCR and Pan-India (Online)
              </p>
            </motion.div>
          </div>
        </section>
      </main>
    </>
  )
}
