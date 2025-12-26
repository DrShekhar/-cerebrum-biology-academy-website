import Link from 'next/link'
import Image from 'next/image'

/**
 * Server-rendered header shell for instant LCP
 * Interactive elements are loaded via client components
 */
export function HeaderServer() {
  return (
    <header
      className="bg-white/95 backdrop-blur-sm shadow-md sticky top-0 z-50 border-b border-gray-100"
      role="banner"
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Left Section - Logo (Server rendered for instant LCP) */}
          <div className="flex items-center space-x-4">
            {/* Burger Menu Placeholder - replaced by client component */}
            <div className="w-10 h-10" aria-hidden="true" />

            {/* Logo - Critical for LCP, server rendered */}
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="relative">
                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-md border border-green-100 overflow-hidden">
                  <Image
                    src="/brain-logo.webp"
                    alt="Cerebrum Biology Academy Logo"
                    width={40}
                    height={40}
                    sizes="(max-width: 640px) 32px, 40px"
                    className="object-contain"
                    priority
                  />
                </div>
              </div>

              {/* Mobile: Compact brand display */}
              <div className="block sm:hidden">
                <div className="flex flex-col justify-center">
                  <span className="text-xl font-bold text-slate-900 leading-none tracking-[-0.02em] antialiased">
                    Cerebrum
                  </span>
                  <span className="text-xs text-slate-600 font-medium leading-tight tracking-wide">
                    Biology Academy
                  </span>
                </div>
              </div>

              {/* Desktop: Full brand display */}
              <div className="hidden sm:block">
                <div className="flex flex-col justify-center">
                  <span className="text-2xl font-bold text-slate-900 leading-none tracking-[-0.02em] antialiased">
                    Cerebrum
                  </span>
                  <span className="text-sm text-slate-600 font-medium leading-tight tracking-wide">
                    Biology Academy
                  </span>
                </div>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation - Static links, server rendered */}
          <nav
            className="hidden lg:flex items-center space-x-8"
            role="navigation"
            aria-label="Main navigation"
          >
            <Link
              href="/results"
              className="flex items-center gap-2 font-medium px-3 py-2 rounded-lg text-gray-700 hover:text-blue-600 hover:bg-gray-50 transition-all duration-200"
            >
              <span>Results</span>
              <span className="bg-gradient-to-r from-green-600 to-green-700 text-white text-xs font-bold px-2.5 py-1 rounded-full shadow-sm">
                98%
              </span>
            </Link>
            <Link
              href="/courses"
              className="flex items-center gap-2 font-medium px-3 py-2 rounded-lg text-gray-700 hover:text-blue-600 hover:bg-gray-50 transition-all duration-200"
            >
              Courses
            </Link>
            <Link
              href="/faculty"
              className="flex items-center gap-2 font-medium px-3 py-2 rounded-lg text-gray-700 hover:text-blue-600 hover:bg-gray-50 transition-all duration-200"
            >
              Faculty
            </Link>
          </nav>

          {/* Right Section - CTA buttons (Server rendered placeholders) */}
          <div className="flex items-center gap-4">
            {/* Search Placeholder */}
            <div className="w-9 h-9" aria-hidden="true" />

            {/* Desktop CTA - Server rendered for SEO */}
            <div className="hidden lg:flex items-center gap-6">
              <Link
                href="/demo-booking"
                className="flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold border-2 border-green-600 text-green-600 hover:bg-green-50 transition-all duration-300"
              >
                Free Demo
              </Link>
              <Link
                href="/admissions"
                className="flex items-center gap-1.5 px-5 py-2 rounded-full text-sm font-semibold bg-gradient-to-r from-green-600 to-green-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Enroll Now
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
