import Link from 'next/link'
import { Home, Search, BookOpen, HelpCircle, Phone, FileText, MapPin, GraduationCap } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: '404 - Page Not Found | Cerebrum Biology Academy',
  description:
    'The page you are looking for could not be found. Browse our NEET biology courses, coaching centres, or study resources.',
  robots: {
    index: false,
    follow: true,
  },
}

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center px-4">
      <div className="max-w-4xl mx-auto text-center">
        <div className="mb-8">
          <div className="relative mb-8">
            <div className="text-[12rem] md:text-[16rem] font-bold text-gray-200 leading-none select-none">
              404
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-32 h-32 md:w-40 md:h-40 bg-blue-100 rounded-full flex items-center justify-center">
                <Search className="w-16 h-16 md:w-20 md:h-20 text-blue-600" />
              </div>
            </div>
          </div>

          <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">Page Not Found</h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-4">
            Oops! The page you&apos;re looking for doesn&apos;t exist.
          </p>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto mb-8">
            It might have been moved, deleted, or you entered the wrong URL. Don&apos;t worry,
            let&apos;s get you back on track to your medical dreams!
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-xl mx-auto mb-12">
          <form action="/blog" method="get" className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                name="search"
                placeholder="Search blog posts, courses, topics..."
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-gray-900"
              />
            </div>
            <button
              type="submit"
              className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
            >
              Search
            </button>
          </form>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
          <Link href="/">
            <Button size="lg" className="w-full sm:w-auto">
              <Home className="w-5 h-5 mr-2" />
              Go to Homepage
            </Button>
          </Link>
          <Link href="/courses">
            <Button size="lg" variant="outline" className="w-full sm:w-auto">
              <BookOpen className="w-5 h-5 mr-2" />
              Browse Courses
            </Button>
          </Link>
          <Link href="/contact">
            <Button size="lg" variant="outline" className="w-full sm:w-auto">
              <Phone className="w-5 h-5 mr-2" />
              Contact Support
            </Button>
          </Link>
        </div>

        {/* Popular Links */}
        <div className="bg-white rounded-2xl shadow-lg p-8 max-w-3xl mx-auto">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Popular Pages</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Link
              href="/courses/class-12"
              className="flex items-center p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors group"
            >
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-4 group-hover:bg-blue-200">
                <BookOpen className="w-5 h-5 text-blue-600" />
              </div>
              <div className="text-left">
                <div className="font-medium text-gray-900">Class 12 NEET Course</div>
                <div className="text-sm text-gray-500">Full NEET preparation</div>
              </div>
            </Link>

            <Link
              href="/courses/neet-dropper"
              className="flex items-center p-4 border border-gray-200 rounded-lg hover:border-green-300 hover:bg-green-50 transition-colors group"
            >
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mr-4 group-hover:bg-green-200">
                <GraduationCap className="w-5 h-5 text-green-600" />
              </div>
              <div className="text-left">
                <div className="font-medium text-gray-900">Dropper Batch</div>
                <div className="text-sm text-gray-500">Repeat year students</div>
              </div>
            </Link>

            <Link
              href="/neet-biology-mcq"
              className="flex items-center p-4 border border-gray-200 rounded-lg hover:border-teal-300 hover:bg-teal-50 transition-colors group"
            >
              <div className="w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center mr-4 group-hover:bg-teal-200">
                <FileText className="w-5 h-5 text-teal-600" />
              </div>
              <div className="text-left">
                <div className="font-medium text-gray-900">MCQ Practice</div>
                <div className="text-sm text-gray-500">Free practice questions</div>
              </div>
            </Link>

            <Link
              href="/blog"
              className="flex items-center p-4 border border-gray-200 rounded-lg hover:border-purple-300 hover:bg-purple-50 transition-colors group"
            >
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mr-4 group-hover:bg-purple-200">
                <BookOpen className="w-5 h-5 text-purple-600" />
              </div>
              <div className="text-left">
                <div className="font-medium text-gray-900">Study Blog</div>
                <div className="text-sm text-gray-500">Tips & strategies</div>
              </div>
            </Link>

            <Link
              href="/demo-booking"
              className="flex items-center p-4 border border-gray-200 rounded-lg hover:border-orange-300 hover:bg-orange-50 transition-colors group"
            >
              <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center mr-4 group-hover:bg-orange-200">
                <Search className="w-5 h-5 text-orange-600" />
              </div>
              <div className="text-left">
                <div className="font-medium text-gray-900">Book Free Demo</div>
                <div className="text-sm text-gray-500">Try our teaching</div>
              </div>
            </Link>

            <Link
              href="/neet-coaching-fees"
              className="flex items-center p-4 border border-gray-200 rounded-lg hover:border-yellow-400 hover:bg-yellow-50 transition-colors group"
            >
              <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center mr-4 group-hover:bg-yellow-200">
                <FileText className="w-5 h-5 text-yellow-700" />
              </div>
              <div className="text-left">
                <div className="font-medium text-gray-900">Fee Structure</div>
                <div className="text-sm text-gray-500">Course pricing</div>
              </div>
            </Link>

            <Link
              href="/neet-coaching-centre"
              className="flex items-center p-4 border border-gray-200 rounded-lg hover:border-red-300 hover:bg-red-50 transition-colors group"
            >
              <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center mr-4 group-hover:bg-red-200">
                <MapPin className="w-5 h-5 text-red-600" />
              </div>
              <div className="text-left">
                <div className="font-medium text-gray-900">Coaching Centres</div>
                <div className="text-sm text-gray-500">Find us near you</div>
              </div>
            </Link>

            <Link
              href="/help"
              className="flex items-center p-4 border border-gray-200 rounded-lg hover:border-slate-300 hover:bg-slate-50 transition-colors group"
            >
              <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center mr-4 group-hover:bg-slate-200">
                <HelpCircle className="w-5 h-5 text-slate-600" />
              </div>
              <div className="text-left">
                <div className="font-medium text-gray-900">Help Center</div>
                <div className="text-sm text-gray-500">Get support</div>
              </div>
            </Link>
          </div>
        </div>

        {/* Contact Information */}
        <div className="mt-16 text-center">
          <div className="text-gray-500 mb-2">
            Still can&apos;t find what you&apos;re looking for?
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 text-sm">
            <a
              href="tel:+918826444334"
              className="flex items-center space-x-2 text-blue-600 hover:text-blue-700"
            >
              <Phone className="w-4 h-4" />
              <span>+91 88264 44334</span>
            </a>
            <span className="hidden sm:inline text-gray-300">|</span>
            <a
              href="https://wa.me/918826444334"
              className="text-green-600 hover:text-green-700 font-medium"
              target="_blank"
              rel="noopener noreferrer"
            >
              WhatsApp Us
            </a>
            <span className="hidden sm:inline text-gray-300">|</span>
            <Link href="/contact" className="text-blue-600 hover:text-blue-700">
              Contact Page
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
