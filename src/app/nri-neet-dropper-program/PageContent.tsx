import { SmartWhatsAppCTA } from '@/components/conversion/SmartWhatsAppCTA'
import { VideoTestimonialsSection } from '@/components/testimonials/VideoTestimonialsSection'
import { NEETNRIPricingTiers } from '@/components/neet-nri/NEETNRIPricingTiers'

const stats = [
  '98% NEET qualification rate',
  '67+ AIIMS selections',
  'Geo-priced in USD / AED / GBP',
  'Live classes across global time zones',
]

export function PageContent() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">NRI NEET Dropper Program</h1>
          <p className="text-xl mb-2 opacity-90">
            A focused 10-12 month second-attempt program for NRI &amp; OCI students who scored
            300-550 in NEET and need a higher score for the NRI quota.
          </p>
          <p className="text-lg mb-6 opacity-90">
            Study for NEET as a dropper from anywhere abroad — live classes are scheduled across
            Gulf (GST), SE-Asia (SGT/ICT), UK (GMT) and US/Canada (ET/PT) time zones, with
            recordings for any session you miss.
          </p>
          <div className="flex gap-4 flex-wrap">
            <SmartWhatsAppCTA
              message="Know more about NRI NEET Dropper Program"
              buttonText="Get Free Consultation"
              className="bg-green-500 hover:bg-green-600 px-8 py-3 rounded-lg font-bold"
            />
            <a
              href="https://wa.me/918826444334?text=Hi%2C%20I%20would%20like%20to%20schedule%20a%20call%20about%20the%20NRI%20NEET%20Dropper%20Program%20(studying%20for%20NEET%20from%20abroad)"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-bold hover:bg-gray-100 inline-block"
            >
              Schedule a Call
            </a>
          </div>
        </div>
      </section>

      <section className="py-12 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, idx) => (
              <div key={idx} className="text-center p-4 bg-blue-50 rounded-lg">
                <p className="text-lg font-bold text-blue-600">{stat}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-900">Who Should Join?</h2>
          <div className="bg-white rounded-lg shadow-md p-8">
            <p className="text-lg text-gray-700 mb-4">
              <strong>Target Audience:</strong> Students who scored 300-550 in NEET but need 600+
              for NRI quota
            </p>
            <p className="text-lg text-gray-700 mb-4">
              <strong>Program Duration:</strong> 10-12 months intensive
            </p>
            <h3 className="text-2xl font-bold text-gray-900 mt-6 mb-4">Key Features</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <span className="text-blue-600 font-bold mr-3">•</span>
                <span className="text-gray-700">Gap analysis based on previous NEET attempt</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 font-bold mr-3">•</span>
                <span className="text-gray-700">
                  Personalized study plan tailored to weak areas
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 font-bold mr-3">•</span>
                <span className="text-gray-700">2x daily doubt sessions with expert faculty</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 font-bold mr-3">•</span>
                <span className="text-gray-700">Weekly mock tests matching NEET pattern</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 font-bold mr-3">•</span>
                <span className="text-gray-700">
                  Live classes scheduled across Gulf (GST), SE-Asia (SGT/ICT), UK (GMT) and
                  US/Canada (ET/PT) time zones — recordings for every session
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 font-bold mr-3">•</span>
                <span className="text-gray-700">
                  NEET NRI/OCI quota guidance — cut-off targeting for AIIMS, JIPMER, Manipal, KMC
                  and deemed medical colleges
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 font-bold mr-3">•</span>
                <span className="text-gray-700">
                  Printed material shipped internationally, or instant digital access
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 font-bold mr-3">•</span>
                <span className="text-gray-700">One-on-one mentoring sessions</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Geo-aware pricing: renders USD/AED/CAD/GBP based on visitor's
          x-vercel-ip-country header. Replaces the previous hardcoded INR
          tiers that were leaking to overseas visitors. */}
      <NEETNRIPricingTiers />

      <section className="py-12 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="mt-8 text-center">
            <SmartWhatsAppCTA
              message="Compare NRI NEET Dropper Program plans"
              buttonText="Get Plan Comparison"
              className="bg-blue-600 hover:bg-blue-700 px-8 py-3 rounded-lg font-bold text-white"
            />
          </div>
        </div>
      </section>

      <section className="py-12 px-4 bg-gradient-to-r from-blue-50 to-green-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-900">
            Why Choose Cerebrum Biology Academy?
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="text-4xl font-bold text-blue-600 mb-2">98%</div>
              <p className="text-gray-700 font-bold">Success Rate</p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="text-4xl font-bold text-blue-600 mb-2">Dr. Shekhar C Singh</div>
              <p className="text-gray-700 font-bold">Expert Leadership</p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="text-4xl font-bold text-blue-600 mb-2">Your Time Zone</div>
              <p className="text-gray-700 font-bold">
                Live classes across Gulf, SE-Asia, UK &amp; US/Canada — plus recordings for any
                missed session
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 px-4 bg-white">
        <VideoTestimonialsSection />
      </section>

      <section className="py-12 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-900">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="font-bold text-gray-900 mb-3">
                How much improvement can I expect as a dropper student?
              </h3>
              <p className="text-gray-700 leading-relaxed">
                On average, our dropper students improve by 150-200 marks over their previous
                attempt, and 98% of Cerebrum students go on to qualify NEET.
              </p>
            </div>
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="font-bold text-gray-900 mb-3">
                I am studying abroad — does this work across time zones?
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Yes. You can study for NEET as a dropper from anywhere abroad. Live classes are
                scheduled across Gulf (GST), SE-Asia (SGT/ICT), UK (GMT) and US/Canada (ET/PT) time
                zones, and every session is recorded so you can catch up on anything you miss.
              </p>
            </div>
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="font-bold text-gray-900 mb-3">
                How does the NEET NRI/OCI quota work for dropper students?
              </h3>
              <p className="text-gray-700 leading-relaxed">
                NRI and OCI candidates can apply under the 15% NRI quota at AIIMS, JIPMER, Manipal,
                KMC and deemed medical colleges. Cut-offs vary by college and year, so we benchmark
                your target against the latest published cut-offs and build your plan to clear them.
              </p>
            </div>
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="font-bold text-gray-900 mb-3">
                How do you personalize the study plan for each student?
              </h3>
              <p className="text-gray-700 leading-relaxed">
                We conduct a comprehensive gap analysis of your previous NEET attempt and tailor the
                plan to your weak areas. Printed material can be shipped internationally, or you can
                use instant digital access.
              </p>
            </div>
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="font-bold text-gray-900 mb-3">
                What if I have limited time before the next NEET?
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Our flexible 10-12 month program can be compressed based on your timeline.
              </p>
            </div>
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="font-bold text-gray-900 mb-3">
                Are mock tests included, and how frequent are they?
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Yes, weekly mock tests matching the exact NEET pattern are included.
              </p>
            </div>
          </div>
          <div className="mt-8 text-center">
            <SmartWhatsAppCTA
              message="Questions about NRI NEET Dropper Program"
              buttonText="Ask Our Experts"
              className="bg-green-500 hover:bg-green-600 px-8 py-3 rounded-lg font-bold text-white"
            />
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-r from-blue-600 to-green-600 text-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Transform Your NEET Preparation?</h2>
          <p className="text-xl mb-8 opacity-90">
            Start your journey with Cerebrum Biology Academy today
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <SmartWhatsAppCTA
              message="Enroll in NRI NEET Dropper Program"
              buttonText="Enroll Now"
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-bold hover:bg-gray-100"
            />
            <a
              href="tel:+918826444334"
              className="bg-green-500 hover:bg-green-600 px-8 py-3 rounded-lg font-bold inline-block"
            >
              Call: +918826444334
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
