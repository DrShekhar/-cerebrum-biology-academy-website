import Link from 'next/link'
import {
  MapPin,
  GraduationCap,
  Trophy,
  Users,
  ChevronRight,
  Globe,
  Star,
  Building2,
  Wifi,
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Card, CardContent } from '@/components/ui/Card'

const offlineCenters = [
  {
    name: 'South Extension',
    tag: 'Flagship',
    address: 'D 35, South Ext Part 2',
    landmark: 'Near South Extension Metro',
    href: '/locations/south-extension',
  },
  {
    name: 'Rohini DC Chowk',
    tag: null,
    address: 'DC Chowk, Sector 9',
    landmark: 'Near Rohini West Metro',
    href: '/locations/rohini',
  },
  {
    name: 'Gurugram',
    tag: null,
    address: 'M2K Corporate Park, Sector 51',
    landmark: 'Near HUDA City Centre',
    href: '/locations/gurugram',
  },
  {
    name: 'Faridabad',
    tag: null,
    address: 'HUDA Market, Sector 17',
    landmark: 'Near Bata Chowk Metro',
    href: '/locations/faridabad',
  },
  {
    name: 'Noida',
    tag: null,
    address: 'Sector 62',
    landmark: 'Near Sector 62 Metro',
    href: '/locations/noida',
  },
  {
    name: 'Ghaziabad',
    tag: null,
    address: 'Online + Hybrid',
    landmark: 'Nearest: Rohini / Noida',
    href: '/locations/ghaziabad',
  },
  {
    name: 'Green Park',
    tag: null,
    address: 'Green Park Area',
    landmark: 'Near Green Park Metro',
    href: '/locations/green-park',
  },
  {
    name: 'Delhi (All Areas)',
    tag: null,
    address: 'Serving All Delhi Areas',
    landmark: 'Multiple Locations',
    href: '/locations/delhi',
  },
]

const onlineRegions = [
  {
    name: 'North India',
    href: '/neet-coaching-north-india',
    icon: Globe,
  },
  {
    name: 'South India',
    href: '/neet-coaching-south-india',
    icon: Globe,
  },
  {
    name: 'East India',
    href: '/neet-coaching-east-india',
    icon: Globe,
  },
  {
    name: 'West India',
    href: '/neet-coaching-west-india',
    icon: Globe,
  },
  {
    name: 'NRI Students (14+ Countries)',
    href: '/nri-students',
    icon: Wifi,
  },
]

const features = [
  {
    icon: GraduationCap,
    title: 'AIIMS Faculty',
    description: 'Learn from doctors and researchers who graduated from AIIMS Delhi',
  },
  {
    icon: Users,
    title: 'Small Batches of 15',
    description: 'Personalized attention with a maximum of 15 students per batch',
  },
  {
    icon: Trophy,
    title: '98% Success Rate',
    description: 'Consistently high selection rate across all our centers',
  },
  {
    icon: Star,
    title: '24/7 Doubt Support',
    description: 'Round-the-clock doubt resolution via app, WhatsApp, and live sessions',
  },
]

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Home',
      item: 'https://cerebrumbiologyacademy.com',
    },
    {
      '@type': 'ListItem',
      position: 2,
      name: 'All Locations',
      item: 'https://cerebrumbiologyacademy.com/all-locations',
    },
  ],
}

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'EducationalOrganization',
  name: 'Cerebrum Biology Academy',
  url: 'https://cerebrumbiologyacademy.com',
  description:
    'Premier NEET Biology coaching with 6 offline centers in Delhi NCR and online classes across India.',
  location: [
    {
      '@type': 'Place',
      name: 'Cerebrum Biology Academy - South Extension',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'D 35, South Ext Part 2',
        addressLocality: 'New Delhi',
        addressRegion: 'Delhi',
        addressCountry: 'IN',
      },
    },
    {
      '@type': 'Place',
      name: 'Cerebrum Biology Academy - Rohini',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'DC Chowk, Sector 9',
        addressLocality: 'Rohini',
        addressRegion: 'Delhi',
        addressCountry: 'IN',
      },
    },
    {
      '@type': 'Place',
      name: 'Cerebrum Biology Academy - Gurugram',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'M2K Corporate Park, Sector 51',
        addressLocality: 'Gurugram',
        addressRegion: 'Haryana',
        addressCountry: 'IN',
      },
    },
    {
      '@type': 'Place',
      name: 'Cerebrum Biology Academy - Faridabad',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'HUDA Market, Sector 17',
        addressLocality: 'Faridabad',
        addressRegion: 'Haryana',
        addressCountry: 'IN',
      },
    },
    {
      '@type': 'Place',
      name: 'Cerebrum Biology Academy - Noida',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Sector 62',
        addressLocality: 'Noida',
        addressRegion: 'Uttar Pradesh',
        addressCountry: 'IN',
      },
    },
    {
      '@type': 'Place',
      name: 'Cerebrum Biology Academy - Ghaziabad',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Ghaziabad',
        addressRegion: 'Uttar Pradesh',
        addressCountry: 'IN',
      },
    },
  ],
}

export default function AllLocationsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />

      <main className="pt-20">
        <section className="bg-gradient-to-r from-slate-900 to-slate-800 text-white py-16 sm:py-20 lg:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
              <MapPin className="w-5 h-5 text-yellow-400" />
              <span className="text-sm font-medium">Find Your Nearest Center</span>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              Biology Classes <span className="text-yellow-400">Near You</span>
            </h1>
            <p className="text-lg sm:text-xl text-slate-300 max-w-3xl mx-auto mb-10">
              6 offline coaching centers across Delhi NCR plus live online classes for students
              across India and 14+ countries worldwide
            </p>
            <div className="grid grid-cols-3 gap-4 sm:gap-8 max-w-xl mx-auto">
              <div>
                <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-yellow-400">6</div>
                <div className="text-xs sm:text-sm text-slate-400 mt-1">Centers</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-yellow-400">
                  98%
                </div>
                <div className="text-xs sm:text-sm text-slate-400 mt-1">Success</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-yellow-400">
                  15,000+
                </div>
                <div className="text-xs sm:text-sm text-slate-400 mt-1">Students</div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 sm:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 text-slate-600 mb-3">
                <Building2 className="w-5 h-5" />
                <span className="text-sm font-semibold uppercase tracking-wider">
                  Offline Centers
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900">
                Our Coaching Centers in Delhi NCR
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {offlineCenters.map((center) => (
                <Link key={center.href} href={center.href} className="group block">
                  <Card className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 h-full border-0">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-3">
                        <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center group-hover:bg-blue-50 transition-colors">
                          <MapPin className="w-5 h-5 text-slate-600 group-hover:text-blue-600 transition-colors" />
                        </div>
                        {center.tag && (
                          <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200 text-xs">
                            {center.tag}
                          </Badge>
                        )}
                      </div>
                      <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors mb-1">
                        {center.name}
                      </h3>
                      <p className="text-sm text-slate-600 mb-1">{center.address}</p>
                      <p className="text-xs text-slate-400 mb-4">{center.landmark}</p>
                      <div className="flex items-center text-blue-600 text-sm font-medium">
                        <span>View Details</span>
                        <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 sm:py-20 bg-gradient-to-br from-blue-600 to-indigo-700">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 text-blue-200 mb-3">
                <Wifi className="w-5 h-5" />
                <span className="text-sm font-semibold uppercase tracking-wider">
                  Online Classes
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4">
                Serving Students Online Across India & Globally
              </h2>
              <p className="text-blue-200 text-lg max-w-2xl mx-auto">
                Live interactive classes with the same AIIMS faculty, accessible from anywhere
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {onlineRegions.map((region) => {
                const RegionIcon = region.icon
                return (
                  <Link key={region.href} href={region.href} className="group block">
                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300 text-center h-full">
                      <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-4">
                        <RegionIcon className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="text-white font-semibold text-base mb-2">{region.name}</h3>
                      <div className="flex items-center justify-center text-blue-200 text-sm font-medium">
                        <span>Explore</span>
                        <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>
        </section>

        <section className="py-16 sm:py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                Why Choose Cerebrum Biology Academy
              </h2>
              <p className="text-slate-600 text-lg max-w-2xl mx-auto">
                Trusted by 15,000+ students and parents for NEET Biology preparation
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feature) => {
                const FeatureIcon = feature.icon
                return (
                  <Card
                    key={feature.title}
                    className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border-0"
                  >
                    <CardContent className="p-6 text-center">
                      <div className="w-14 h-14 rounded-xl bg-blue-50 flex items-center justify-center mx-auto mb-4">
                        <FeatureIcon className="w-7 h-7 text-blue-600" />
                      </div>
                      <h3 className="text-lg font-bold text-slate-900 mb-2">{feature.title}</h3>
                      <p className="text-sm text-slate-600">{feature.description}</p>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        </section>

        <section className="py-16 sm:py-20 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Start Your NEET Journey Today
            </h2>
            <p className="text-slate-600 text-lg max-w-2xl mx-auto mb-8">
              Book a free demo class and experience our teaching methodology firsthand
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                asChild
                size="lg"
                className="bg-yellow-500 hover:bg-yellow-600 text-slate-900 font-semibold min-h-[44px] px-8 rounded-xl shadow-lg hover:shadow-xl"
              >
                <Link href="/demo-booking">Book a Free Demo Class</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="min-h-[44px] px-8 rounded-xl">
                <Link href="/courses">Explore All Courses</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
