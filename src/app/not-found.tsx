/**
 * Custom 404 Not Found Page
 * Server component with beautiful UX and SEO-optimized error handling
 *
 * Features:
 * - Schema markup for better search result appearance
 * - Helpful suggestions and navigation links
 * - Search functionality for users to find content
 * - Cerebrum branding with blue theme
 * - Mobile-optimized responsive design
 *
 * SEO Impact: Reduces bounce rate by providing user-friendly recovery options
 */

import type { Metadata } from 'next'
import Link from 'next/link'
import { Search, ArrowRight, Home, BookOpen, Phone, Gift } from 'lucide-react'

export const metadata: Metadata = {
  title: '404 - Page Not Found',
  description:
    'The page you are looking for could not be found. Explore our NEET coaching, courses, and biology resources.',
  robots: 'noindex, follow',
}

export default function NotFound() {
  const suggestedLinks = [
    {
      title: 'Home',
      href: '/',
      icon: Home,
      description: 'Back to main page',
    },
    {
      title: 'NEET Coaching',
      href: '/neet-coaching',
      icon: BookOpen,
      description: 'Find coaching near you',
    },
    {
      title: 'Courses',
      href: '/courses',
      icon: BookOpen,
      description: 'Browse all courses',
    },
    {
      title: 'Contact Us',
      href: '/contact',
      icon: Phone,
      description: 'Get in touch with us',
    },
    {
      title: 'Book Free Demo',
      href: '/book-demo',
      icon: Gift,
      description: 'Schedule a session',
    },
  ]

  return (
    <>
      {/* Schema Markup for 404 Error Page */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebPage',
            name: '404 - Page Not Found',
            description: 'The requested page could not be found.',
            url: 'https://cerebrumbiologyacademy.com/404',
            isPartOf: {
              '@type': 'WebSite',
              name: 'Cerebrum Biology Academy',
              url: 'https://cerebrumbiologyacademy.com',
            },
            mainEntity: {
              '@type': 'Thing',
              name: '404 Error',
              description: 'Page not found error',
            },
          }),
        }}
      />

      {/* Organization Schema for 404 context */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'EducationalOrganization',
            name: 'Cerebrum Biology Academy',
            url: 'https://cerebrumbiologyacademy.com',
            logo: 'https://cerebrumbiologyacademy.com/logo.png',
            sameAs: [
              'https://www.facebook.com/cerebrumbiologyacademy',
              'https://www.instagram.com/cerebrumbiologyacademy',
              'https://www.youtube.com/cerebrumbiologyacademy',
            ],
            contactPoint: {
              '@type': 'ContactPoint',
              contactType: 'Customer Support',
              telephone: '+91-88264-44334',
              email: 'support@cerebrumbiologyacademy.com',
            },
          }),
        }}
      />

      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
          {/* Header Section */}
          <div className="mb-16 text-center">
            <div className="mb-8 inline-flex h-24 w-24 items-center justify-center rounded-full bg-blue-100">
              <span className="text-5xl font-bold text-blue-600">404</span>
            </div>

            <h1 className="mb-4 text-4xl font-bold text-slate-900 sm:text-5xl">
              Page Not Found
            </h1>

            <p className="mb-2 text-xl text-slate-600">
              Sorry, the page you are looking for does not exist.
            </p>

            <p className="text-base text-slate-500">
              But don't worry, we have plenty of biology resources and NEET coaching options
              available below.
            </p>
          </div>

          {/* Search Section */}
          <div className="mb-16 flex justify-center">
            <div className="w-full max-w-2xl">
              <form
                className="relative"
                action="/search"
                method="get"
              >
                <div className="relative flex items-center">
                  <Search className="absolute left-4 h-5 w-5 text-slate-400" />
                  <input
                    type="search"
                    name="q"
                    placeholder="Search NEET coaching, courses, biology notes..."
                    className="w-full rounded-lg border border-blue-200 bg-white py-3 pl-12 pr-4 shadow-sm transition-all focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-20"
                    aria-label="Search Cerebrum Biology Academy"
                  />
                  <button
                    type="submit"
                    className="absolute right-2 inline-flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 font-medium text-white transition-all hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  >
                    <span className="hidden sm:inline">Search</span>
                    <Search className="h-4 w-4 sm:hidden" />
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Suggested Links Section */}
          <div className="mb-16">
            <h2 className="mb-8 text-center text-2xl font-semibold text-slate-800">
              Explore Our Resources
            </h2>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
              {suggestedLinks.map((link) => {
                const Icon = link.icon
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="group rounded-lg border border-blue-100 bg-white p-6 shadow-sm transition-all hover:border-blue-300 hover:shadow-md"
                  >
                    <div className="mb-3 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-blue-50 text-blue-600 transition-all group-hover:bg-blue-100">
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="mb-1 font-semibold text-slate-900">{link.title}</h3>
                    <p className="mb-4 text-sm text-slate-500">{link.description}</p>
                    <div className="inline-flex items-center gap-2 text-sm font-medium text-blue-600 transition-all group-hover:gap-3">
                      Visit
                      <ArrowRight className="h-4 w-4" />
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>

          {/* Info Section */}
          <div className="rounded-lg border border-blue-200 bg-blue-50 p-8 text-center">
            <h3 className="mb-2 text-lg font-semibold text-blue-900">
              Still can't find what you're looking for?
            </h3>
            <p className="mb-4 text-blue-700">
              Our support team is here to help you navigate our NEET coaching programs and courses.
            </p>
            <div className="flex flex-col justify-center gap-3 sm:flex-row">
              <a
                href="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-6 py-3 font-medium text-white transition-all hover:bg-blue-700"
              >
                <Phone className="h-4 w-4" />
                Contact Us
              </a>
              <a
                href="/book-demo"
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-blue-300 bg-white px-6 py-3 font-medium text-blue-600 transition-all hover:bg-blue-50"
              >
                <Gift className="h-4 w-4" />
                Book Free Demo
              </a>
            </div>
          </div>

          {/* Breadcrumb for better structure */}
          <nav
            aria-label="Breadcrumb"
            className="mt-16 flex items-center justify-center gap-2 text-sm text-slate-500"
          >
            <Link href="/" className="hover:text-slate-700">
              Home
            </Link>
            <span>/</span>
            <span className="text-slate-700">404 Not Found</span>
          </nav>
        </div>
      </div>
    </>
  )
}
